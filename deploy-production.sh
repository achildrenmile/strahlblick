#!/bin/bash

# Strahlblick Production Deployment Script
# Deploys to Synology NAS via SSH

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f .env.production ]; then
    set -a
    source .env.production
    set +a
else
    echo -e "${RED}Error: .env.production file not found${NC}"
    echo "Copy .env.production.example to .env.production and configure it"
    exit 1
fi

# Validate required variables
REQUIRED_VARS="SYNOLOGY_HOST SYNOLOGY_USER SYNOLOGY_PATH"
for var in $REQUIRED_VARS; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}Error: $var is not set in .env.production${NC}"
        exit 1
    fi
done

# Default values
CONTAINER_NAME=${CONTAINER_NAME:-strahlblick}
CONTAINER_PORT=${CONTAINER_PORT:-3403}
SITE_NAME=${SITE_NAME:-Strahlblick}
SITE_DESCRIPTION=${SITE_DESCRIPTION:-HF-Feldstärke & Sicherheitsabstands-Rechner}

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Strahlblick Production Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "Target: ${GREEN}${SYNOLOGY_USER}@${SYNOLOGY_HOST}:${SYNOLOGY_PATH}${NC}"
echo -e "Container: ${GREEN}${CONTAINER_NAME}${NC} on port ${GREEN}${CONTAINER_PORT}${NC}"
echo ""

# Check for --rebuild flag
REBUILD_FLAG=""
if [ "$1" == "--rebuild" ]; then
    REBUILD_FLAG="--no-cache"
    echo -e "${YELLOW}Rebuild mode: Building without cache${NC}"
fi

# Step 1: Sync code to Synology
echo -e "${YELLOW}Step 1: Syncing code to Synology...${NC}"

# Get the GitHub repo URL from local git config
GITHUB_REPO=$(git remote get-url origin | sed 's/.*github.com[:/]\([^.]*\).*/\1/')
GITHUB_URL="https://github.com/${GITHUB_REPO}.git"

ssh ${SYNOLOGY_USER}@${SYNOLOGY_HOST} "
    if [ ! -d ${SYNOLOGY_PATH} ] || [ ! -d ${SYNOLOGY_PATH}/.git ]; then
        echo 'Creating directory and cloning repository...'
        rm -rf ${SYNOLOGY_PATH}
        mkdir -p ${SYNOLOGY_PATH}
        cd ${SYNOLOGY_PATH}
        git clone ${GITHUB_URL} .
    else
        echo 'Updating existing repository...'
        cd ${SYNOLOGY_PATH}
        git fetch origin
        git reset --hard origin/main
    fi
"

echo -e "${GREEN}Code synced successfully${NC}"

# Step 2: Build Docker image on Synology
echo -e "${YELLOW}Step 2: Building Docker image...${NC}"

ssh ${SYNOLOGY_USER}@${SYNOLOGY_HOST} "
    cd ${SYNOLOGY_PATH}
    /usr/local/bin/docker build ${REBUILD_FLAG} -t ${CONTAINER_NAME}:latest .
"

echo -e "${GREEN}Docker image built successfully${NC}"

# Step 3: Restart container
echo -e "${YELLOW}Step 3: Restarting container...${NC}"

ssh ${SYNOLOGY_USER}@${SYNOLOGY_HOST} "
    # Stop and remove existing container if it exists
    /usr/local/bin/docker stop ${CONTAINER_NAME} 2>/dev/null || true
    /usr/local/bin/docker rm ${CONTAINER_NAME} 2>/dev/null || true

    # Start new container
    /usr/local/bin/docker run -d \
        --name ${CONTAINER_NAME} \
        --restart unless-stopped \
        -p 127.0.0.1:${CONTAINER_PORT}:80 \
        -e SITE_NAME='${SITE_NAME}' \
        -e SITE_DESCRIPTION='${SITE_DESCRIPTION}' \
        -e PARENT_SITE_NAME='${PARENT_SITE_NAME:-}' \
        -e PARENT_SITE_URL='${PARENT_SITE_URL:-}' \
        -e PARENT_SITE_LOGO='${PARENT_SITE_LOGO:-}' \
        --health-cmd='wget --no-verbose --tries=1 --spider http://localhost/ || exit 1' \
        --health-interval=30s \
        --health-timeout=10s \
        --health-retries=3 \
        ${CONTAINER_NAME}:latest
"

echo -e "${GREEN}Container started successfully${NC}"

# Step 4: Verify deployment
echo -e "${YELLOW}Step 4: Verifying deployment...${NC}"

sleep 3

# Check container health
CONTAINER_STATUS=$(ssh ${SYNOLOGY_USER}@${SYNOLOGY_HOST} "/usr/local/bin/docker inspect --format='{{.State.Status}}' ${CONTAINER_NAME}" 2>/dev/null)

if [ "$CONTAINER_STATUS" == "running" ]; then
    echo -e "${GREEN}Container is running${NC}"
else
    echo -e "${RED}Container status: ${CONTAINER_STATUS}${NC}"
    exit 1
fi

# Check if the application is responding locally
LOCAL_CHECK=$(ssh ${SYNOLOGY_USER}@${SYNOLOGY_HOST} "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:${CONTAINER_PORT}/" 2>/dev/null)

if [ "$LOCAL_CHECK" == "200" ]; then
    echo -e "${GREEN}Application is responding on localhost:${CONTAINER_PORT}${NC}"
else
    echo -e "${RED}Application returned HTTP ${LOCAL_CHECK}${NC}"
    exit 1
fi

# Check public URL if configured
if [ -n "$PUBLIC_URL" ]; then
    echo -e "${YELLOW}Checking public URL...${NC}"
    sleep 2
    PUBLIC_CHECK=$(curl -s -o /dev/null -w '%{http_code}' "$PUBLIC_URL" 2>/dev/null || echo "failed")

    if [ "$PUBLIC_CHECK" == "200" ]; then
        echo -e "${GREEN}Public URL is accessible: ${PUBLIC_URL}${NC}"
    else
        echo -e "${YELLOW}Warning: Public URL returned ${PUBLIC_CHECK} (may need time to propagate)${NC}"
    fi
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Local: ${BLUE}http://127.0.0.1:${CONTAINER_PORT}${NC}"
if [ -n "$PUBLIC_URL" ]; then
    echo -e "Public: ${BLUE}${PUBLIC_URL}${NC}"
fi

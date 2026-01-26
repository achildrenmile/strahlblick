#!/bin/sh

# Generate config.json from environment variables
cat > /usr/share/nginx/html/config.json << EOF
{
  "siteName": "${SITE_NAME:-Strahlblick}",
  "siteDescription": "${SITE_DESCRIPTION:-HF-Feldstärke & Sicherheitsabstands-Rechner}",
  "parentSite": {
    "name": "${PARENT_SITE_NAME:-}",
    "url": "${PARENT_SITE_URL:-}",
    "logo": "${PARENT_SITE_LOGO:-}"
  }
}
EOF

echo "Generated config.json:"
cat /usr/share/nginx/html/config.json

# Start nginx
exec nginx -g 'daemon off;'

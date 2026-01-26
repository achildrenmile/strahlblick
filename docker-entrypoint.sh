#!/bin/sh

# Generate config.json from environment variables at container startup
# If no env vars set, the default config.json from build is used

CONFIG_FILE="/usr/share/nginx/html/config.json"

# Only generate config if at least one env var is set
if [ -n "$PARENT_SITE_URL" ] || [ -n "$PARENT_SITE_LOGO" ] || [ -n "$PARENT_SITE_NAME" ]; then
  cat > "$CONFIG_FILE" << EOF
{
  "parentSiteUrl": "${PARENT_SITE_URL:-}",
  "parentSiteLogo": "${PARENT_SITE_LOGO:-}",
  "parentSiteName": "${PARENT_SITE_NAME:-}"
}
EOF

  echo "Generated config.json from environment variables:"
  cat "$CONFIG_FILE"
else
  echo "Using default config.json from build:"
  cat "$CONFIG_FILE"
fi

# Start nginx
exec nginx -g 'daemon off;'

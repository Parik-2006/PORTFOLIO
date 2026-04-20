#!/bin/bash
# Copy mobile portfolio to frontend/public for Vite to include in build

echo "📱 Preparing mobile portfolio for build..."

# Get the absolute path of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MOBILE_SOURCE="$SCRIPT_DIR/mobile-portfolio.html"
MOBILE_DEST="$SCRIPT_DIR/frontend/public/mobile-portfolio.html"

# Check if source exists
if [ ! -f "$MOBILE_SOURCE" ]; then
    echo "❌ Error: mobile-portfolio.html not found at $MOBILE_SOURCE"
    exit 1
fi

# Copy the file
cp "$MOBILE_SOURCE" "$MOBILE_DEST"

if [ $? -eq 0 ]; then
    echo "✅ Mobile portfolio copied to frontend/public/"
    echo "📦 Ready to build with 'npm run build'"
else
    echo "❌ Failed to copy mobile portfolio"
    exit 1
fi

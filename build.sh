#!/bin/bash

# AI Real Estate Playbook - Production Build Script
# This script optimizes the application for production deployment

echo "🚀 Starting production build process..."

# Create build directory
echo "📁 Creating build directory..."
rm -rf build
mkdir -p build
mkdir -p build/js
mkdir -p build/components
mkdir -p build/assets

# Copy core files
echo "📋 Copying core files..."
cp index.html build/
cp robots.txt build/
cp sitemap.xml build/
cp .htaccess build/
cp 404.html build/
cp 500.html build/
cp favicon.ico build/

# Copy and optimize CSS
echo "🎨 Processing CSS..."
cp styles.css build/
# TODO: Add CSS minification
# cssnano styles.css build/styles.min.css

# Copy and optimize JavaScript
echo "⚡ Processing JavaScript..."
cp -r js/* build/js/
# TODO: Add JS minification
# uglifyjs js/*.js --compress --mangle -o build/js/

# Copy and optimize components
echo "🔧 Processing components..."
cp -r components/* build/components/

# Copy and optimize assets
echo "🖼️ Processing assets..."
cp -r assets/* build/assets/
# TODO: Add image optimization
# imagemin assets/* --out-dir=build/assets/

# Update file references for minified versions
echo "🔄 Updating file references..."
# This would update index.html to reference minified files if they exist

# Generate build report
echo "📊 Generating build report..."
BUILD_SIZE=$(du -sh build | cut -f1)
ORIGINAL_SIZE=$(du -sh . --exclude=build --exclude=.git | cut -f1)

cat > build/BUILD_REPORT.md << EOF
# Build Report

**Build Date:** $(date)
**Original Size:** $ORIGINAL_SIZE
**Build Size:** $BUILD_SIZE

## Optimizations Applied
- ✅ Files copied to build directory
- ⚠️ CSS minification (TODO: Install cssnano)
- ⚠️ JavaScript minification (TODO: Install uglify-js)
- ⚠️ Image optimization (TODO: Install imagemin)

## Next Steps
1. Install optimization tools:
   \`\`\`bash
   npm install -g cssnano-cli uglify-js imagemin-cli
   \`\`\`

2. Test the build:
   \`\`\`bash
   cd build && python3 -m http.server 8000
   \`\`\`

3. Run Lighthouse audit:
   \`\`\`bash
   lighthouse http://localhost:8000 --view
   \`\`\`

## Production Checklist
- [ ] Update domain references in sitemap.xml and index.html
- [ ] Configure server with .htaccess settings
- [ ] Set up SSL certificate
- [ ] Configure monitoring and analytics
- [ ] Test all functionality in production environment
EOF

echo "✅ Build complete! Check build/ directory"
echo "📋 Build report: build/BUILD_REPORT.md"
echo ""
echo "🔍 To test the build:"
echo "   cd build && python3 -m http.server 8000"
echo ""
echo "📊 To run performance audit:"
echo "   lighthouse http://localhost:8000 --view"
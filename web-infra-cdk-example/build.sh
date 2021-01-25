webpack --config webpack.config.js
cp -r ../web/.nuxt ./dist
cp ./package.json ./dist/package.json
npm --prefix ./dist install --only=production

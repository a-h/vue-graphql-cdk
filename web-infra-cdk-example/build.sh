webpack --config webpack.config.js
#cp -r ../web/.nuxt .
cp ./package.json ./dist/package.json
npm --prefix ./dist install --only=production

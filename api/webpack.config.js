const glob = require('glob')
const path = require('path')

module.exports = {
  target: 'node12',
  entry: Object.fromEntries(glob.sync('./resolvers/**/*.ts').map((item) => [path.basename(item, '.ts'), item])),
  devtool: 'inline-source-map',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        ],
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: false,
  },
}

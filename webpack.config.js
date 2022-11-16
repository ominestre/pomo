const { resolve: pathResolve } = require('path')

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: NODE_ENV === 'production' ? false : 'source-map',
  entry: './src/index.ts',
  output: {
    path: pathResolve(__dirname, './dist/'),
    // clean: true,
  },
};

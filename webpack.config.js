const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/jtools.js',
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'jtools.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-maps'
};

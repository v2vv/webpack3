const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },

  resolve: {
    // 要解析的文件的扩展名
    extensions: [".js", ".jsx", ".json"],
    // 解析目录时要使用的文件名
    mainFiles: ["index"],
},
  mode: 'development',
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        },
        {
	        test: /\.html$/,
	        use: {
	          loader: 'html-loader'
	        }
	    }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      titel: 'react app',
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};

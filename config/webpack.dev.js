const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path')
const os = require("os");
const TerserPlugin = require("terser-webpack-plugin");
// 核数
const threads = os.cpus().length;
// 获取处理样式的loder
function getStyleLoder(pre) {
  return [ //执行顺序从下到上
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre
  ].filter(Boolean)
}
module.exports = {
  // 入口
  entry: './src/main.js',
  // 输出
  output: {
    // 输出路径
    // path: path.resolve(__dirname, 'dist'),
    // 开发环境没有输出
    path: undefined,
    // 文件名
    filename: 'static/js/[name].js',
    // 自动清空上传打包的资源
    // 开发环境没有输出打包资源
    // clean:true
    // 打包输出其他文件命名
    chunkFilename:'static/js/[name].chunk.js',
    // 图片 字体等通过type:asset处理资源命名方式
    assetModuleFilename:'static/image/[hash:10][ext][query]'
  },
  // 加载器
  module: {
    rules: [ //loder配置
      {
        oneOf: [{
            test: /\.css$/,
            use: getStyleLoder()
          },
          {
            test: /\.less$/,
            use: getStyleLoder("less-loader")
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoder("sass-loader")
          },
          {
            test: /\.styl$/,
            use: getStyleLoder("stylus-loader")
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 //小于10kb转base64 减少请求次数
              }
            },
            // generator: { //图片输出位置
            //   filename: 'static/image/[hash:10][ext][query]'
            // }
          },
          { //字体图标音视频等其他资源文件
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: "asset/resource",
            // generator: { //输出位置
            //   filename: 'static/media/[hash:10][ext][query]'
            // }
          },
          { //处理js文件  兼容 todo
            test: /\.m?js$/,
            // exclude: /(node_modules)/, //排除node_modules
            include: path.resolve(__dirname, '../src'), //只处理src文件夹下面的js文件
            use: [{
              loader: 'thread-loader', //开启多进程
              options: {
                works: threads //进程数量
              }
            },
            {
              loader: 'babel-loader',
              options: {
                //   presets: ['@babel/preset-env']
                cacheDirectory: true, //开启babel缓存
                cacheCompression: false, //关闭缓存文件压缩
                plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
              },
            }
          ]
          }
        ]
      }

    ]
  },
  // 插件
  plugins: [
    new ESLintPlugin({ //代码检测
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', //默认值
      cache:true, //开启缓存
      cacheLocation:path.resolve(__dirname,'../node_modules/.cache/eslintcache'),
      threads //开启多进程
    }),
    new HtmlWebpackPlugin({ //处理html文件 自动引入资源
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
    
    // new CssMinimizerPlugin(),
    // new TerserPlugin({
    //   parallel:threads//开启多进程
    // })
  ],
  optimization: { //压缩的操作也可以放着
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin({
        parallel: threads //开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: 'all'
    }
  },
  // 开发服务器: 内存中运行
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, //开启HDM
  },
  // 模式
  mode: 'development',
  devtool: "cheap-module-source-map",
}
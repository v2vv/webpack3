module.exports = {
  presets: [
    //智能预设，能够编译ES6语法
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }],

  ]
}
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  // 生产环境的map文件，暂不需要 加速编译
  productionSourceMap:false,
  // 默认生产路径
  outputDir:'dist',
  // 修改发布路径
  publicPath: process.env.NODE_ENV === 'production'
  ? './' // 使用相对路径
  : '/', // 使用绝对路径

  lintOnSave: false,
  css: {
    extract: false
  }
}

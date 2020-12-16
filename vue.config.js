module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap:false,
  outputDir:'AnimeSearcherUI',
  publicPath: process.env.NODE_ENV === 'production'
  ? './' // 使用相对路径
  : '/', // 使用绝对路径

  lintOnSave: false,
  css: {
    extract: false
  }
}

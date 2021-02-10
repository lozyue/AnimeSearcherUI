module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  productionSourceMap:false,
  outputDir:'AnimeSearcherUI',
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/',

  lintOnSave: false,
  css: {
    extract: false
  }
}

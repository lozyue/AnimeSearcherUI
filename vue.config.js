module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap:false,
  outputDir:'dist',
  publicPath: process.env.NODE_ENV === 'production'
  ? './' 
  : '/', 
  lintOnSave: false,
  css: {
    extract: false
  }
}

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
    ]
  ],
  ignore: ['./src/assets/js/mui.js'],
  plugins: plugins
};

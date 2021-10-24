module.exports = {
  title: '主题系统 - AnimeUI',
  description: 'Just playing around',

  base: '/',
  host: 'localhost',
  // port: '8090',
  dest: './dist',
  
  markdown: {
    lineNumbers: true,
    extractHeaders: [ 'h1', 'h2', 'h3', 'h4' ],
  },
  themeConfig: {
    logo: '/logo.png',
    // To enable the sidebar, there should be a list of Array of links
    sidebar: [
      // You can omit the .md extension, and paths ending with / are inferred as */README.md
      // '/',
      '/guide/',
      '/instruction/',
      '/features/',
      '/theme-dev/',  
    ], 
    sidebarDepth: 2,

    // Navigater Links
    nav: [
      { text: 'Home', link: '/' },
      { text: '导航', link: '/Guide' },
      { text: '使用指南', link: '/instruction/' },
      { text: '特性说明', link: '/features/' },
      { text: '主题开发', link: '/theme-dev/' }
    ],
    // display all header links for every page in sidebar.  
    displayAllHeaders: true // default: false
  }
}
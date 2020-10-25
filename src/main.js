import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import Hls from 'hls.js'
// import WebTorrent from 'webtorrent/webtorrent.min.js'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import VueInsProgressBar from 'vue-ins-progress-bar'

NProgress.configure({
  template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
});


window.Hls = Hls;
// window.WebTorrent = WebTorrent;
var mypath = window.location.pathname;

axios.defaults.baseURL = 'http://127.0.0.1:6001/';

axios.interceptors.request.use(function (lzyConfigs){
    if(lzyConfigs.method==='get'){lzyConfigs.data=true;}
    lzyConfigs.withCredentials = false;
    NProgress.start();
    return lzyConfigs;
});
axios.interceptors.response.use(function(config){
  NProgress.done();
  return config;
})

Vue.prototype.$http = axios;

router.beforeEach(function (to, from, next){
  if(to.path == from.path) return console.log('跳转了重复的路由');
  // 处理本地访问链接 修正后的链接
  var amendURL=to.path;
  if(amendURL ==='/') next('/index');
  if(mypath.length > 1 && amendURL.indexOf(mypath)===-1){
    amendURL = mypath + to.path;
    // 跳转引导到本地文件下 再检测一下末尾斜杠条件
    if(to.path.length>1 && amendURL.substr(-1)==='/') {
      return next(amendURL.substr(0,amendURL.length-1));
    }
  }
  // 限制直接访问或在result目录刷新（搜索为空）,但骨架装载器会一直呈现
  if(from.name==null && to.path.length<='/result/' && to.path.indexOf('/result')!==-1) return next('/index');
  // 跳转到去掉末尾斜杠的路径
  console.log([amendURL,to.path,from.name])
  if(to.path.length>1 && amendURL.substr(-1)==='/') {
    var a=amendURL.substr(0,amendURL.length-1);
    console.log(a)
    return next(a);
  }
  return next(); // 默认放行
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

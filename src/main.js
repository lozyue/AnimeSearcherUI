import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import Hls from 'hls.js'
import './assets/styles/global.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
});

window.Hls = Hls;
var mypath = window.location.pathname;
axios.defaults.baseURL = 'http://127.0.0.1:6001/';
Vue.prototype.$baseSocket = 'ws://127.0.0.1:6002/';

axios.interceptors.request.use(function (lzyConfigs){
    if(lzyConfigs.method==='get'){lzyConfigs.data=true;}
    lzyConfigs.withCredentials = false;
    NProgress.start();
    return lzyConfigs;  // 必要步骤，返回修改后的配置
});
axios.interceptors.response.use(function(config){
  NProgress.done();
  return config;
})

Vue.prototype.$http = axios;

router.beforeEach(function (to, from, next){
  if(to.path == from.path) return console.log('跳转了重复的路由');
  var amendURL=to.path;
  if(amendURL ==='/') next('/index');
  if(mypath.length > 1 && amendURL.indexOf(mypath)===-1){
    amendURL = mypath + to.path;
    if(to.path.length>1 && amendURL.substr(-1)==='/') {
      return next(amendURL.substr(0,amendURL.length-1));
    }
  }
  if(from.name==null && to.path.length<='/result/' && to.path.indexOf('/result')!==-1) return next('/index');
  if(to.path.length>1 && amendURL.substr(-1)==='/') {
    var a=amendURL.substr(0,amendURL.length-1);
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

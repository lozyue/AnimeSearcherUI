<template>
  <v-app>
    <v-app-bar app color="pink" dark>
      <div class="d-flex align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a class="lzylink" target="_self" @click="lzyForceUpdate()">
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="./assets/logo.png"
                transition="scale-transition"
                width="40"
                v-on="on,"
                v-bind="attrs"
              ></v-img>
            </a>
          </template>
          <span>在当前窗口加载主页</span>
        </v-tooltip>

        <a class="lzylink" :href="currentPath.length===1?'/#':currentPath+'#'" target="_blank">
          <h2>AnimeSercher</h2>
        </a>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click.stop="searchBox=!searchBox && $vuetify.goTo(-200,{offset:-200,duration:256,easing:'easeInOutCubic'});"
      >
        <span class="mr-2">Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        class="settingButton"
        @click.stop="showSettings=!showSettings && lzymessage('再次点击以关闭面板','info',0)" 
        text
      >
        <span class="mr-2">Custom</span>
        <v-icon class="spin" color="#fff">mdi-cog</v-icon>
        <v-expand-transition>
          <v-card class="settingPanel" light v-show="showSettings">
            <span class="enginesPanel">
              <h5 style="font-size:16px">Engines<v-icon color="red">mdi-hammer-screwdriver</v-icon></h5>
              <span v-for="(data,i) in switchEngines" :key="i">
                <v-switch dense
                  v-model="data.value"
                  :label="data.name"
                  @click.stop="saveEngines(data.name, i)"
                ></v-switch>
              </span>
            </span>
            <span class="enginesPanel">
              <h5 style="font-size:16px">弹幕源<v-icon color="red">mdi-layers-outline</v-icon></h5>
              <span v-for="(data,i) in switchDanmaku" :key="i">
                <v-switch dense
                  v-model="data.value"
                  :label="data.name"
                  @click.stop="saveEngines(data.name, i, 'danmaku')"
                ></v-switch>
              </span>
            </span>
            <span class="mb-2" style="display:inline-block" @click.stop="showAbout()">About<v-icon>mdi-link-variant</v-icon></span>
          </v-card>
        </v-expand-transition>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-row class="lzyalert" align="center" justify="center">
        <v-col>
          <transition name="lzymsg">
            <!-- 目前最多支持同时出现三个消息条，支持html，没找到更好且简洁的解决方案了 -->
            <v-alert class="msgbar" v-if="showMsg['info']" dense border="left" :type="type['info']" v-html="msg['info']"></v-alert>
          </transition>
          <transition name="lzymsg">
            <v-alert class="msgbar" v-if="showMsg['warning']" dense border="left" :type="type['warning']" v-html="msg['warning']"></v-alert>
          </transition>
          <transition name="lzymsg">
            <v-alert class="msgbar" v-if="showMsg['error']" dense border="left" :type="type['error']" v-html="msg['error']"></v-alert>
          </transition>
        </v-col>
      </v-row>
      <!-- 搜索区域 -->
      <transition name="lzysearch">
        <v-row v-show="searchBox" no-gutters align="center" justify="center" class="mt-12">
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-text-field
              label="输入动漫名称"
              outlined
              clearable
              autofocus
              small
              :hint="searchHint" style="position:relative"
              prepend-inner-icon="mdi-television-classic"
              v-model="searchStr"
              v-on:keyup.enter="($route.path.indexOf('/details')!==-1 && $route.path.replace('/details/','').lastIndexOf('/')!==-1 && onSearch(null,'new') ) ||  onSearch()"
            >
            </v-text-field>
            <v-card v-show="showHistory" class="searchFields">
              <ul>
                <transition-group name="lzysearchlist">
                <li v-for="(data,index) in searchHistory" :key="index"><v-icon>mdi-history</v-icon>{{data}}</li>
                </transition-group>
              </ul>
            </v-card>
          </v-col>
          <v-col cols="2" align="left" class="mb-6">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="primary"
                  @click="onSearch()"
                  dark
                  v-bind="attrs"
                  class="ml-2"
                  v-on="on"
                >
                  <v-icon large>mdi-magnify</v-icon>
                </v-btn>
              </template>
              <span>按回车键可发起搜索</span>
            </v-tooltip>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </transition>
      <!-- 滚动到顶部 -->
      <div id="lzyScroll" class="bounceInUp animated" @click="$vuetify.goTo(-200,{offset:999,duration:512,easing:'easeInOutCubic'})">
      </div>

      <router-view :key="lzyupdateComponent" :searchVal="searchVal" :history="searchHistory" :searching="searching" @message="lzymessage" @setHistory="lzysetSearchHistory" @search='onSearch'></router-view>
    </v-main>
  </v-app>
</template>

<script>
import _ from "lodash";

export default {
  name: "App",

  data: () => ({
    searchBox: true,
    searching: false,
    loading: true,
    searchStr: "",
    searchHint:"",
    searchVal: [],
    // 历史记录
    showHistory: false,
    searchHistory:[],
    msg: {'info':'','warning':'','error':''},
    showMsg: {'info':false,'warning':false,'error':false},
    type: {'info':'info','':'warning','error':'error'}, // 可选值：error warning success info
    msgQueue: [ [], [], [] ],
    barCounts: 2,
    currentPath: window.location.pathname,
    showSettings:false,
    switchEngines:{
      0:{name:"zzfun",value:true},
      1:{name:"agefans",value:false},
      2:{naem:"eyunzhu",value:true},
      3:{name:"yhdm",value:true},
    },
    switchDanmaku:{
      0:{name:'bilibili', value:true},
      1:{name:'bahamut', value:false},
    },
    inject: ["theme"],
    lzyupdateComponent:Math.random().toString(16).slice(-4)
  }),
  methods: {
    onSearch: function(str=null, newTable='') {
      if(str===null || !str){
        if(newTable==='new') return window.open( (this.currentPath.length===1?'/#':this.currentPath+'#')+'/result/'+this.searchStr);
        this.search();
      }
      else{
        this.searchStr = str;
        if(newTable==='new') return window.open( (this.currentPath.length===1?'/#':this.currentPath+'#')+'/result/'+this.searchStr);
        this.search(str);
      }
      if (this.$route.path.indexOf("/result") === -1)
        this.$router.push("/result/"+(str!==null?str:this.searchStr) );
      this.searching = Math.random()+1; // 传递更新状态
      // 关闭设置面板，如果打开了的话
      this.showSettings=false;
    },
    search: async function(str=null) {
      const res = await this.$http
        .get("/search/" + (str!==null?str:this.searchStr) )
        .catch(function(e) {
          console.log(e);
          this.lzymessage("获取搜素结果失败", "error");
          this.searchVal = [];
        });
      
      if (typeof (res.data) == "undefined" || _.isEmpty(res.data)) {
        
        this.lzymessage("获取搜索结果为空", "info");
        this.searchVal = [];
        return false;
      }
      this.searchVal = res.data;
      this.searchBox = false;
    },
    lzymessage: function(str, type = "success", id=0, duration=3999) {
      if(id>2){console.log("暂最多同时只支持三个消息条"); return false;}
      var _this = this;
      var msgControl = id===0?'info':id===1?'warning':id===2?'error':'info';
      this.msg[msgControl] = str;
      this.type[msgControl] = type;
      this.showMsg[msgControl] = true;
      this.msgQueue[id].forEach(function(handle) {
        clearTimeout(handle);
      });
      this.msgQueue[id].push(
        setTimeout(function() {
          _this.showMsg[msgControl] = false;
        }, duration)
      );
      return true;
      
    },
    lzyForceUpdate(){
      
      if(this.$route.path.indexOf('/index')===-1)
        this.$router.push('/');
      else{
        this.lzymessage('已经在主页了哦','warning');
      }
      
      
    },
    postEnginesSetting:async function(name, id){
      const res =await this.$http.post('/settings/engine',{name:'api.engines.'+name,enable: this.switchEngines[id].value}).catch(function(e){console.log(e);});
      
      if(res.status==200) this.lzymessage("已经成功"+(this.switchEngines[id].value?'开启':'关闭')+"了引擎"+name,"success",1);
      else{
        this.switchEngines[id].value=!this.switchEngines[id].value; // 撤销设置
        this.lzymessage("设置失败！已撤销设置","error",2);
      }
    },
    postDanmakuSetting:async function(name,id){
      const res = await this.$http.post('/settings/danmaku',{name:'api.danmaku.'+name,enable: this.switchDanmaku[id].value}).catch(function(v){console.log(v)});
      
      if(res.status==200) this.lzymessage("成功"+(this.switchDanmaku[id].value?'开启':'关闭')+"了弹幕源"+name,"success",1);
      else{
        this.switchDanmaku[id].value=!this.switchDanmaku[id].value; // 撤销设置
        this.lzymessage("设置失败！已撤销设置","error",2);
      }
    },
    saveEngines(name,id, type='engine'){
      this.lzymessage("正在应用设置……","info",0);
      if(type === 'engine') this.postEnginesSetting(name,id);
      else this.postDanmakuSetting(name,id);
    },
    showAbout(){
      // @2020-08-27 消息条设计完成
      var _this=this;
      this.lzymessage('<a href="https://github.com/zaxtyson/AnimeSearcher" target="_blank">Github地址(点我)</a>','success',0,4399);
      setTimeout(function(){_this.lzymessage('API接口解析：<span style="font-weight:600;color:#e97171">@Zaxtyson<span>','info',1,4699);},666);
      setTimeout(function(){_this.lzymessage('UI设计：<span style="font-weight:600;color:#e97171">  @Lozyue<span>','info',2,4999);},999);
    },
    lzysetSearchHistory(mode='new', appendStr=''){
      switch(mode){
        case 'new':{
          console.log(['case : new',this.searchStr]);
          let tempIndex=-1;
          if(!_.isEmpty(this.searchStr) ){
            tempIndex=_.indexOf(this.searchHistory,this.searchStr);
            if( tempIndex!==-1 ){
              this.lzysetSearchHistory('delete');
            }
            this.searchHistory.unshift(this.searchStr); 
          }else{
            console.log("记录历史失败;搜索为空或者记录已经存在")
          }
          break;
        }
        
        case 'read':{
          var temp = JSON.parse(window.localStorage.getItem('searchHistory') );
          this.searchHistory = temp===null?[]:temp;
          break;
        }
        
        case 'delete':{
          console.log(['调用了delete',this.searchHistory]);
          if(appendStr.length > 0){
            this.searchHistory = _.pull(this.searchHistory, appendStr);
            // 单点删除时 使用vue劫持的响应方法使数据立即响应
            this.searchHistory.reverse().reverse();
          }else this.searchHistory = _.pull(this.searchHistory, this.searchStr);
          break;
        }

        case 'storage':{
          console.log(["保存到了localstorage",this.searchHistory])
          window.localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory) );
          break;
        }
        
        case 'clear':{
          this.searchHistory = [];
          window.localStorage.clear('searchHistory');
          break;
        }
      }
    },
  },
  computed:{
    computedHistory:function(){
      var _this=this;
      return this.searchHistory.filter(function(item){
        return item.indexOf(_this.searchVal)!==-1;
      });
    }
  },
  watch:{
    searchStr(value){
      if(value.length<2) this.searchHint = "";
      if(value.length>2 && this.$route.path.indexOf('/details')!==-1){
        this.searchHint = "发起搜索后会在展示并覆盖当前页结果";
      }
      if(value.length>7){this.searchHint = "使用精简的关键词更容易搜索到目标内容哦！"}
      return value?value+'':'';
    }
  },
  created:async function(){
    
    const res=await this.$http.get('/settings').catch(function(e){console.log(e)});
    if(typeof(res)==='undefined' || _.isEmpty(res.data) || !res.data.hasOwnProperty("engines") || !res.data.hasOwnProperty('danmaku') ) return this.lzymessage("获取设置项失败,请确保服务端已运行!","error",2); 
    function transformObject(engines){
      var  i=0, mark=-1, ObjectData={};
      for(var k in engines){
        mark = k.lastIndexOf('.');
        if( mark !== -1){
          ObjectData[i] = {name: k.substr(mark+1,k.length), value: engines[k]};
        }else{
          ObjectData[i] = {name:k,value:engines[k]}
        }
        i++;
      }
      return ObjectData;
    }

    this.switchDanmaku=transformObject(res.data.danmaku);
    this.switchEngines=transformObject(res.data.engines);
  },
  mounted() {
    this.loading=false;
    try {
      this.lzysetSearchHistory('read');
    } catch (error) {
      console.log("读取历史记录失败，格式错误？");
      this.lzymessage("读取搜素历史记录失败");
    }
  }
};
</script>
<style>
.lzytop{z-index: 99999;}
.lzyalert {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 9999;
}
.msgbar {
  position: relative;
  top: 30px;
  display: inline-block;
  margin: 10px auto;
  opacity: 0.8;
  z-index: 9999;
}
.lzylink {
  display: inline-block;
  color: unset !important;
  text-decoration: none;
  cursor: pointer;
}
.settingButton{
  position: relative;
}
.settingPanel{
  position: absolute!important;
  top:36px;
  right:0px;
  width:136px!important;
  text-align: center;
  max-width: unset!important
}
.settingPanel .enginesPanel{
  display: inline-block;
  margin-top: 12px;
}
.enginesPanel > span{font-size:12px;}
#lzyScroll{
  position: fixed;
  bottom: 56px;right: 56px;
  height: 99px;
  width: 46px;
  background: transparent url('./assets/toTop.png') no-repeat scroll center center / cover;
  
  z-index: 999;
}
#lzyScroll:hover{
  animation: rubberBand .6s linear;
  animation-delay: 0;
}
.searchFields{
  position: absolute;
  max-height: 475px;
}
.searchFields ul{margin:0;padding: 8px 12px;}
.searchFields ul li{
  list-style: none;
  display:block;
}
.searchFields ul li:hover{background: #fff;border:1px solid gray}


code{font-size: 13px!important;}
.enginesPanel > span .v-input .v-input__control .v-messages{
  display: none!important;
}
.enginesPanel > span .v-input .v-input__control .v-input__slot .v-label{
  text-transform: none!important;
}
.v-application--wrap .v-progress-linear{background-color:#60ffa6!important;}

.lzysearch-enter-active {
  transition: all 0.4s ease;
}
.lzysearch-leave-active {
  transition: all 0.4s ease;
}
.lzysearch-enter {
  transform: translateY(-50px);
  opacity: 0;
}
.lzysearch-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
.lzysearchlist-leave-active,.lzysearchlist-enter-active{
  position: absolute;
}
.lzysearch-enter{
  opacity: 0;transform: translateX(-50px);
}
.lzysearch-leave-to{
  opacity: 0;
  transform:translateX(50px)
}
.lzymsg-enter-active {
  transition: all 0.4s ease;
}
.lzymsg-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.lzymsg-enter {
  transform: translateX(-200px);
  opacity: 0;
}
.lzymsg-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
div.bg-0{
  background: none!important;
}


a div .v-image__image--preload{
  -webkit-filter:unset!important; 
  filter:unset!important;
}

::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
  background-image: linear-gradient(135deg, rgb(106, 253, 192) 0%, rgba(154, 243, 255, 0.5) 72%, rgba(0, 182, 234, 0.3) 100%);
}
::-webkit-scrollbar-track {
  border-radius: 0;
}
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-image: linear-gradient(135deg, rgb(83, 250, 208) 0%, #08c4db 72%, #057494 100%);
  transition: all .2s;
  border-radius: 0.25rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(95, 95, 95, 0.7);
}
.spin{animation: lzySpin 8s linear 3s;}
/* lzyAnimation */
@keyframes lzySpin{
	100%{transform:rotate(360deg);}
}
.dropIn {
  animation: dropIn 0.3s ease-in;
}
@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes elastic {
  0% {
    transform: scale(0);
  }
  55% {
    transform: scale(1);
  }
  70% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes bounceInUp {
  0%,  60%,  75%,  90%,  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 400px, 0);
    transform: translate3d(0, 400px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
@keyframes bounceInUp {
  0%,  60%,  75%,  90%,  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 400px, 0);
    transform: translate3d(0, 400px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
.bounceInUp {
  -webkit-animation-name: bounceInUp;
  animation-name: bounceInUp;
}
.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.animated.delay-1s{-webkit-animation-delay:1s;animation-delay:1s}.animated.delay-2s{-webkit-animation-delay:2s;animation-delay:2s}.animated.delay-3s{-webkit-animation-delay:3s;animation-delay:3s}.animated.delay-4s{-webkit-animation-delay:4s;animation-delay:4s}.animated.delay-5s{-webkit-animation-delay:5s;animation-delay:5s}.animated.fast{-webkit-animation-duration:.8s;animation-duration:.8s}.animated.faster{-webkit-animation-duration:.5s;animation-duration:.5s}.animated.slow{-webkit-animation-duration:2s;animation-duration:2s}.animated.slower{-webkit-animation-duration:3s;animation-duration:3s}
@-webkit-keyframes rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.rubberBand{-webkit-animation-name:rubberBand;animation-name:rubberBand}
@-webkit-keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInDown{-webkit-animation-name:zoomInDown;animation-name:zoomInDown}
</style>

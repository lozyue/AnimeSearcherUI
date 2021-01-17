<template>
  <v-app :style="!lzyPublicSettingsStorage.theme?'':'background:transparent'">
    <!-- <v-progress-linear
      buffer-value="0"
      :stream="loading"
      :indeterminate="loading"
      class="lzytop"
      :style="'position:fixed;top:'+loading?'0':'-5px'"
      color="rgb(33, 150, 243)"
    ></v-progress-linear> -->
    <div @mouseenter="scrollBehavior.userFocus=true" style="position:fixed;top:0;height: 32px;margin-top: 0px;left: 0px;right: 0px;z-index:4;"></div>
    <transition name="fadeUp">
    <v-app-bar v-show="scrollBehavior.userFocus" class="dropIn" app color="pink" dark>
      <div class="d-flex align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a class="lzylink" target="_self" @click="lzyForceUpdate()">
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="./assets/images/logo.png"
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
          <h2>AnimeSearcher</h2>
        </a>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click.stop="lzycoreMsg.push('userFocus'),searchBox=!searchBox && $vuetify.goTo(-200,{offset:-200,duration:256,easing:'easeInOutCubic'});"
      >
        <span class="mr-2">Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        class="settingButton"
        @click.stop="lzycoreMsg.push('userFocus'),showSettings=!showSettings" 
        text
      >
        <v-badge v-show="pubInfo.needUpdate" bordered color="error" dot overlap>
          <span class="mr-2">
            Custom
          </span>
          <v-icon class="spin" color="#fff">mdi-cog</v-icon>
        </v-badge>
        <span v-show="!pubInfo.needUpdate" class="mr-2">
            Custom
        </span>
        <v-icon v-show="!pubInfo.needUpdate" class="spin" color="#fff">mdi-cog</v-icon>
        <v-expand-transition>
          <v-card class="settingPanel" light v-show="showSettings">
            <span class="mt-4"><h5 style="font-size:16px;cursor:default">Engines<v-icon color="red">mdi-hammer-screwdriver</v-icon></h5></span>
            <span class="enginesPanel">
              <span v-for="(data,i) in switchEngines" :key="i">
                <v-switch dense
                  color="primary"
                  v-model="data.value"
                  :label="data.name"
                  @click.stop="saveEngines(data.name, i)"
                ></v-switch>
              </span>
            </span>
            <span><h5 style="font-size:16px;cursor:default">弹幕源<v-icon color="red">mdi-layers-outline</v-icon></h5></span>
            <span class="enginesPanel">
              <span v-for="(data,i) in switchDanmaku" :key="i">
                <v-switch dense
                  color="#eab4f8"
                  v-model="data.value"
                  :label="data.name"
                  @click.stop="saveEngines(data.name, i, 'danmaku')"
                ></v-switch>
              </span>
            </span>
            <span>
              <span class="enginesPanel">
                <v-switch dense
                color="rgb(255, 148, 85)"
                v-model="lzyPublicSettingsStorage.immerse"
                @click.stop
                label="沉浸模式"
                ></v-switch>
              </span>
            </span>
            <v-divider></v-divider>
            <span class="ma-2 aboutBtn" style="" @click.stop="showAbout()"><a>About</a><v-icon>mdi-link-variant</v-icon></span>
            <span class="ma-2 mb-4 updateBtn" @click="checkUpdate()" style="">
              <v-badge v-show="pubInfo.needUpdate" bordered color="pink" icon="mdi-arrow-up-bold" overlap><a>Update</a><v-icon>mdi-arrow-up-bold-box-outline</v-icon></v-badge>
              <a v-show="!pubInfo.needUpdate">Update</a><v-icon v-show="!pubInfo.needUpdate">mdi-arrow-up-bold-box-outline</v-icon>
            </span>
          </v-card>
        </v-expand-transition>
      </v-btn>
    </v-app-bar>
    </transition>
    <v-main :class="''+(!lzyPublicSettingsStorage.theme?'':lzyPublicSettingsStorage.theme)">
      <v-row class="lzyalert" align="center" justify="center">
        <v-col>
          <transition name="lzymsg">
            <v-alert class="msgbar" v-if="lzymsgBar.showMsg['info']" @click="lzymessageCallback(lzymsgBar.showMsgCallback['info'])" :type="lzymsgBar.type['info']" v-html="lzymsgBar.msg['info']"  dense border="left"></v-alert>
          </transition>
          <transition name="lzymsg">
            <v-alert class="msgbar" v-if="lzymsgBar.showMsg['success']" @click="lzymessageCallback(lzymsgBar.showMsgCallback['success'])" :type="lzymsgBar.type['success']" v-html="lzymsgBar.msg['success']"  dense border="left"></v-alert>
          </transition>
          <transition name="lzymsg">
            <v-alert class="msgbar" v-if="lzymsgBar.showMsg['warning']" @click="lzymessageCallback(lzymsgBar.showMsgCallback['warning'])" :type="lzymsgBar.type['warning']" v-html="lzymsgBar.msg['warning']"  dense border="left"></v-alert>
          </transition>
          <transition name="lzymsg">
            <v-alert class="msgbar" v-if="lzymsgBar.showMsg['error']" @click="lzymessageCallback(lzymsgBar.showMsgCallback['error'])" :type="lzymsgBar.type['error']" v-html="lzymsgBar.msg['error']"  dense border="left"></v-alert>
          </transition>
        </v-col>
      </v-row>
      <transition name="lzysearch">
        <v-row v-show="searchBox" no-gutters align="center" justify="center" class="mt-12">
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-text-field
              label="输入影视名称"
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

      <div class="updateBox" transition="slide-y-reverse-transition">
        <v-snackbar
          v-model="showUpdateSnackbar"
          timeout="-1"
          vertical
          min-width="356px"
        >
          <p>
            <span>{{!pubInfo.needUpdate ? "当前版本":"发现新版本"}}：<a target="_blank" :href="pubInfo.version.url">v{{pubInfo.version.tag}} <i>(点我传送Github)</i></a></span>
            <span style="float:right"><time><i>{{pubInfo.version.time.slice(0,10)}}</i></time></span>
          </p>
          <div style="display:flex;justify-content: space-between;">
            <div style="white-space: nowrap;flex-shrink:0;">更新简介：</div>
            <pre style="flex-shrink:1;lex-grow: 1;" v-html="pubInfo.version.describe"></pre>
          </div>
          <div>下载{{!pubInfo.needUpdate?"链接":"更新"}}：<a href="https://zaxtyson.lanzous.com/b0f1ukafc" target="_blank">蓝奏云下载windows安装包</a></div>
          <template v-slot:action="{ attrs }">
              <v-btn
                color="indigo"
                text
                v-bind="attrs"
                @click="showUpdateSnackbar = false"
              >
                Close
              </v-btn>
          </template>
        </v-snackbar>
      </div>
      <transition>
      <div id="lzySettingPanel" v-show="scrollBehavior.userFocus" class="bounceInUp">
          <div class="gear"
            :style="`opacity:${lzyPublicSettingsStorage.theme=='fantasy'?'0.7':'1'}`"
            @click="lzyControlSettings('theme','lazySet',lzyPublicSettingsStorage.theme),lzysendMessage('userFocus')">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-on="on," v-bind="attrs" 
                  @click="(!lzyPublicSettingsStorage.theme?lzyPublicSettingsStorage.theme='fantasy':lzyPublicSettingsStorage.theme='')">
                  <span>{{!lzyPublicSettingsStorage.theme?"Default":"Fantasy"}}</span>
                  <span style="color:#ff9800">|</span>
                  <span :style="`color:${!!$vuetify.theme.dark?'#fff':'black'};`">THEME</span>
                </span>
              </template>
              <span>点击切换主题</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon 
                @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                v-on="on," v-bind="attrs" 
                class="spin" color="rgb(46, 46, 46)">
                  mdi-cog
                </v-icon>
              </template>
              <span>巴拉拉黑暗魔法</span>
            </v-tooltip>
          </div>
      </div>
      </transition>
      <transition>
      <div v-show="scrollBehavior.userFocus" id="lzyScroll" title="回顶" class="bounceInUp animated" @click="$vuetify.goTo(-200,{offset:999,duration:512,easing:'easeInOutCubic'})">
      </div>
      </transition>
      <router-view :key="lzyupdateComponent" :searchVal="searchVal" :history="searchHistory" :searching="searching" @setSearchHistory="lzysetSearchHistory" @search='onSearch' 
      @message="lzymessage" 
      @lzyglobalSettings="lzyControlSettings" 
      @addAction="lzysendMessage">
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import _ from "lodash";

export default {
  name: "App",

  data: () => ({
    lzyPublicSettingsStorage:{
      themeCabinet: ['default','fantasy'], // 所有主题选项，默认只能是第一个主题和第二个主题快速切换，子页面上会直接应用到根元素，主页其他全局元素需要单独设置样式
      theme: 'default', // 当前主题 主题切换
      darkMode: false, // 夜间模式的存储控制属性

      immerse: true, // 沉浸模式
      statistics: true, // 用户体验计划开关
      matchDanmaku: 2, // 第一次失败后再最多尝试的次数
      matchDeadline: 65, // 最低匹配率百分比。字符相似匹配 匹配成功的最低要求。
      matchSelectedBySequence: false, // 开启此项后手动选择弹幕的episode集序号会记录下来，下一集就自动应用下一个而不做匹配。针对弹幕集标题和视频集标题完全不匹配的情况 // 未考虑倒序？？？
    },
    pubInfo:{
      version:{
        tag:'1.1.8-fixed',
        url:'https://github.com/zaxtyson/AnimeSearcher/releases', // 默认使用总release更新
        describe:'修复搜索请求发送重复问题，增加夜间模式供全局切换',
        time:'2020-01-16',
      },
      needUpdate:false,
      
    },
    scrollBehavior:{
      offsetTop:0,
      direction:'none',
      same:0,
      hasScrolled:240, // 初始维持一分钟
      userFocus:true,
    },
    lzycoreMsg:[],
    lzyadditionImmerseAction:[],
    coreIntervalHandle:0,
    tempData:{scrollAnimationID:""},

    showUpdateSnackbar:false, // 消息条显示
    searchBox: true,
    searching: false,
    loading: true,
    searchStr: "",
    searchHint:"点击搜索开启追番追剧亦或追电影之旅",
    searchVal: [],
    showHistory: false,
    searchHistory:[],

    lzymsgBar:{
      msg: {info:'',success:'',warning:'',error:''}, // 消息内容存储
      showMsg: {info:false,success:false,warning:false,error:false}, // 控制消息条显示
      showMsgCallback: {info:[],success:[],warning:[],error:[]}, // 消息的事件响应函数(时间类型见定义)，暂时只支持一个函数
      type: {info:'info',success:'success',warning:'warning',error:'error'}, // 消息条类型,可选值：error warning success info
      snackMsgQueue: [ [], [], [], [] ], // 消息条计时器句柄分轨道记录
    },
    
    currentPath: window.location.pathname,
    showSettings:false,
    switchEngines:{
      0:{name:"zzfun",value:true},
      1:{name:"agefans",value:true},
      2:{naem:"eyunzhu",value:false},
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
    /**
     * 发起搜索的函数
     * 跳转路由到页面`/result`后 子组件会自动触发该方法
     */
    onSearch: function(str=null, newTable='') {

      this.searchStr =  str!==null ? str : !!this.searchStr ? this.searchStr : '异世界'; // 处理默认搜索词
      if (this.$route.path.indexOf("/result") === -1){
        if(newTable==='new'){
          window.open( (this.currentPath.length===1?'/#':this.currentPath+'#')+'/result/'+this.searchStr);
          return true;
        }
        this.$router.push("/result/"+ this.searchStr );
        return false;
      }
      if(newTable==='new'){
        window.open( (this.currentPath.length===1?'/#':this.currentPath+'#')+'/result/'+this.searchStr);
        return true;
      }// 发起搜索
      this.socket_search(this.searchStr);

      this.searching = Math.random()+1; // 更新或传递 搜索状态
      this.showSettings=false; // 关闭设置面板，如果打开了的话
      return true;
    },
    socket_search: function(str){
      const _this=this;
      
      _this.searchVal = [];
      try{
        var ws = new WebSocket(this.$baseSocket+"search");
        ws.onopen = function (evt) {
            ws.send(str);
        };
        ws.onmessage = function (evt) {
            _this.searchVal.push( JSON.parse(evt.data) );
            if(_this.$route.path.indexOf("/result/")===-1) _this.searchBox = false;
            _this.scrollBehavior.hasScrolled+=120;
            
            ws.send("ok");
        };
        ws.onclose = function (evt) {
            
            _this.searching = false; // 传递更新完成的状态
        };
      }catch(e){
      }
      
    },
    search: async function(str) {
      const _this=this;
      const res = await this.$http
        .get("/search/" + (str) )
        .catch(function(e) {
          _this.lzymessage("获取搜素结果失败", "error");
          _this.searchVal = [];
        });
      if (!res || _.isEmpty(res.data)) {
        this.lzymessage("获取搜索结果为空", "info");
        this.searchVal = [];
        return false;
      }
      this.searchVal = res.data;
      if(this.$route.path.indexOf("/result/")===-1) this.searchBox = false;
      this.scrollBehavior.hasScrolled+=120;
    },
    /**
     * 消息条显示函数
     * @param str {需要显示的消息文字}
     * @param type {消息条样式类型,支持`info`,`succese`,`warning`,`error`,`info`}
     * @param id {要显示消息条的轨道id，为提高复用性而设定。轨道最多支持4条(id=0,1,2,3)。应该按事件触发频率进行不同轨道分发}
     * @param duration {消息条显示的持续时间，单位毫秒；@if 设置为0，则默认永久，并在点击事件触发时隐藏消息条}
     * @param onClick 第四个参数加入回调函数，可自定义点击事件触发时的动作
     * */ 
    lzymessage: function(str, type = "success", id=0, duration=3999, onClick=function(){}) {
      if(id>3){console.warn("暂最多同时只支持四个消息条"); return false;}
      var _this = this;
      var msgControl = id===0?'info':id===1?'success':id==2?'warning':id===3?'error':'info';
      this.lzymsgBar.msg[msgControl] = str;
      this.lzymsgBar.type[msgControl] = type;
      this.lzymsgBar.showMsg[msgControl] = true;
      this.lzymsgBar.showMsgCallback[msgControl].push(onClick);
      this.lzymsgBar.snackMsgQueue[id].forEach(function(handle) {
        clearTimeout(handle);
      });
      if(duration>0){
        this.lzymsgBar.snackMsgQueue[id].push(
          setTimeout(function() {
            _this.lzymsgBar.showMsg[msgControl] = false;
            _this.lzymsgBar.showMsgCallback[msgControl] = []; // 清空数组
          }, duration)
        );
      }else{
        this.lzymsgBar.showMsgCallback[msgControl].push(function(){
          _this.lzymsgBar.showMsg[msgControl] = false;
          _this.lzymsgBar.showMsgCallback[msgControl] = []; // 清空数组
        });
      }
      return true;
    },
    lzymessageCallback(callbackQueue){
      var _self = this,
          _args = arguments;
      callbackQueue.forEach(function(v,i){
        v.apply(_self, _args);
      })
    },
    lzyForceUpdate(){
      if(this.$route.path.indexOf('/index')===-1)
        this.$router.push('/');
      else{
        this.lzymessage('已经在主页了哦','warning');
      }
    },
    getEngines:async function(update=false){
      var _this = this;
      this.$http.get('/settings').then(function(res){
        if(typeof(res)==='undefined' || _.isEmpty(res.data) || !res.data.hasOwnProperty("engines") || !res.data.hasOwnProperty('danmaku') ) return _this.lzymessage("获取设置项失败,请确保服务端已运行!","error",2);
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
        _this.switchDanmaku=transformObject(res.data.danmaku);
        _this.switchEngines=transformObject(res.data.engines);
      }).catch(function(e){console.log(e);});
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
      var _this=this;
      _this.lzymessage('API框架：<span style="font-weight:600;color:#e97171">@Zaxtyson<span>','info',0,4399);
      setTimeout(function(){_this.lzymessage('UI设计：<span style="font-weight:600;color:#e97171">  @Lozyue<span>','info',1,4699);},666);
      setTimeout(function(){_this.lzymessage('<a href="https://github.com/zaxtyson/AnimeSearcher" target="_blank">Github地址(点我)</a>','success',2,4999);},999);
      this.showUpdateSnackbar=true;
    },
    checkUpdate(){
      this.lzymessage("正在检查更新……","info",0);
      var _this = this,
          checkFlag = -1;
      this.$http.get('https://api.github.com/repos/zaxtyson/animesearcher/releases/latest').catch(function(e){
        _this.lzymessage(`唔，检查更新失败了，请检查网络`,"error",1);console.error(e)})
      .then(function(res){
        const data=res.data;
        var currentMark=getInsertedNumbers(_this.pubInfo.version.tag), cloudMark=getInsertedNumbers(data.tag_name);

        if(weightSum(cloudMark) > weightSum(currentMark) ) checkFlag++;
        else if(weightSum(cloudMark) === weightSum(currentMark)){
          if(getInsertedNumbers(data.tag_name,false,true) > getInsertedNumbers(_this.pubInfo.version.tag,false,true)) checkFlag++;
          if(cloudMark.length===currentMark.length) checkFlag--; // 连续数字提取长度相等
          if(getInsertedNumbers(_this.pubInfo.version.tag,false).length===getInsertedNumbers(data.tag_name,false).length) checkFlag++;// 全部纯数字长度相等，两种情况相等时数字长度比较抵消
          if(data.tag_name.length > _this.pubInfo.version.tag.length) checkFlag++; // 这种在全是字符串后缀时比较可能偏差
          else if(data.tag_name.length < _this.pubInfo.version.tag.length) checkFlag--;
        }
        if(checkFlag < 0){
          _this.pubInfo.version.describe=data.body; // 仍然将说明更新为云端的显示
          if(!!_this.pubInfo.needUpdate) return true; // 第二次检测更新正常返回
          return _this.lzymessage("当前已是最新版：v"+_this.pubInfo.version.tag,"success",1);
        }
        function weightSum(countStr){
          var mark = 0;
          countStr.replace(/·-\s/g,'').split('.').forEach(function(v,i,arr){
            mark += parseInt(v)*Math.pow(10,arr.length - i);
          });
          return mark;
        }
        function getInsertedNumbers(mixedStr, consistent=true, sum=false){
          var result;
          mixedStr=mixedStr.replace(/\s/g,''); // 删除空格
          if(sum) result=0;
          else result='';
          for(let i=0;i<mixedStr.length;i++){
            if(sum){
              result=result + (!isNaN(mixedStr[i]) ? parseInt(mixedStr[i]) : 0) ;
              continue;
            }
            if( !isNaN(mixedStr[i]) || mixedStr[i]==='·' || mixedStr[i]===".") result+=mixedStr[i];// 是 数字 . · 就加上去
            else if(consistent) break; // 
          }
          return result;
        };

        _this.pubInfo.version = {
          tag:data.tag_name,
          url:data.html_url,
          describe:(data.body), // .replace(/[\r\n]/g,'<br>)'
          time:data.created_at
        }
        _this.pubInfo.needUpdate = true;
        _this.showUpdateSnackbar = true;
        _this.lzymessage(`发现新版本：<a target="_blank" href="${data.html_url}">v${data.tag_name}</a> 快去更新吧！`,"success",1);
      });
    },
    lzysetSearchHistory(mode='new', appendStr=''){
      switch(mode){
        case 'new':{
          let tempIndex=-1;
          if(!_.isEmpty(this.searchStr) ){
            tempIndex=_.indexOf(this.searchHistory,this.searchStr);
            if( tempIndex!==-1 ){
              this.lzysetSearchHistory('delete');
            }
            this.searchHistory.unshift(_.trim(this.searchStr) ); // 先搜索后添加
          }else{
          }
          break;
        }
        
        case 'read':{
          var temp = JSON.parse(window.localStorage.getItem('searchHistory') );
          this.searchHistory = temp===null ? [] : temp;
          break;
        }
        
        case 'delete':{
          if(appendStr.length > 0){
            this.searchHistory = _.pull(this.searchHistory, appendStr);
            this.searchHistory.reverse().reverse();
          }else this.searchHistory = _.pull(this.searchHistory, this.searchStr);
          break;
        }

        case 'storage':{
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
    /**
     * 公共设置项存储控制API, 同步保存到localStorage; save load等操作可随便传入`key`
     * 使用`lazySet`模式可以5s内节流异步保存
     * @param callback 回调函数，跨组件读取存储数据需用其穿透定义域‘获取’返回值($emit不能获取返回值)
     **/
    lzyControlSettings(key, method="read", value=null, callback=function(v){return v}){
      let rtValue=null;
      switch (method) {
        case 'lazySet':
          this.lzyPublicSettingsStorage[key] = value;
          this.lzycoreMsg.push("lazySettingsSave");
          break;
        case 'set':
          this.lzyPublicSettingsStorage[key] = value;
          window.localStorage.setItem("lzysettings", JSON.stringify(this.lzyPublicSettingsStorage));
          break;
        case 'delete':
          this.lzyPublicSettingsStorage[key] = undefined; // 虽然不会立即删除，但是在JSON.stringify后再重新parse后会清除
          window.localStorage.setItem("lzysettings", JSON.stringify(this.lzyPublicSettingsStorage));
          break;
        case 'save':
          window.localStorage.setItem("lzysettings", JSON.stringify(this.lzyPublicSettingsStorage));
          break;
        case 'load':
          let temp = JSON.parse(window.localStorage.getItem("lzysettings"));
          if( temp && !_.isEmpty(temp) )
            Object.assign(this.lzyPublicSettingsStorage,temp);
          else console.error("设置项读取失败！");
          break;
        case 'clear':
          window.localStorage.removeItem("lzysettings");
          break;
        case 'read':
          rtValue = this.lzyPublicSettingsStorage[key] || null;// 防止出现undefined值
          break;
        default:
          rtValue = typeof(this.lzyPublicSettingsStorage[key])!=='undefined'?this.lzyPublicSettingsStorage[key]:null;
          break;
      }
      callback(rtValue);
      return rtValue;
    },
    onScroll:function(){
      var _this = this;
      if(!this.lzyPublicSettingsStorage.immerse){
        window.cancelAnimationFrame(this.tempData.scrollAnimationID);
        return false;
      }
      this.tempData.scrollAnimationID = window.requestAnimationFrame(function(){
        var last = _this.scrollBehavior.direction,
            offset = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        
        _this.scrollBehavior.hasScrolled++;
        if(_this.scrollBehavior.offsetTop < offset) _this.scrollBehavior.direction='down';
        else _this.scrollBehavior.direction='up';
        if('down' === _this.scrollBehavior.direction) _this.scrollBehavior.same>20?_this.scrollBehavior.same++:_this.scrollBehavior.same+=2;
        else if(_this.scrollBehavior.same >= 3) _this.scrollBehavior.same-=3,_this.scrollBehavior.userFocus = true;; // 三倍递减
        if(_this.scrollBehavior.same>36){
          _this.scrollBehavior.hasScrolled++; // 额外增加
          _this.scrollBehavior.userFocus = true;
        }
        _this.scrollBehavior.offsetTop = offset;
      });
    },
    /**
     * 增加到消息队列的方法
     * 支持`lzycoreActions`的 case 中的所有动作：checkUpdate userFocus等
     * 第二个参数为钩子函数体，后面的参数为调用钩子传递的变量
     */
    lzysendMessage:function(str, msgHook=function(){},...argum){
      switch(str){
        case 'immerseAction':{
          argum.unshift(msgHook);
          this.lzyadditionImmerseAction.push(argum); // arguments就是一个数组，直接传递过去即可
          break;
        }
        case 'immerseActionRemove':{
          this.lzyadditionImmerseAction = [];
          break;
        }
        default:
          this.lzycoreMsg.push(str);
      }
    },
    lzycoreActions:async function(){
      var _this=this;
      const DEADLINE = 23, // 沉浸状态分割指标
            END = 0; // 最低值
      var lzyEventsRecorder={
        did_queue: {},
        recordEvents: function (currentMsg){
          this.did_queue[currentMsg] = this.did_queue[currentMsg]>=0 ? ++this.did_queue[currentMsg] : 0;
        },
        isHappened: function (msg){
          return !!this.did_queue[msg];
        },
        debounce: function (msg,callback=function(){}){
          if(!this.isHappened(msg)) _this.lzycoreMsg.push(msg);
          return callback.apply(_this,arguments);
        }
      }
      let exeTime = this.lzycoreMsg.length;
      for(let i=0;i<exeTime;i++){
        let currentMsg = this.lzycoreMsg.shift();
        lzyEventsRecorder.recordEvents(currentMsg);
        switch(currentMsg){
          case 'checkUpdate':
            this.checkUpdate();
            break;
          case 'userFocus':
            this.scrollBehavior.hasScrolled+=30;
            break;
          case 'userNoFocus':
            this.scrollBehavior.hasScrolled>99?this.scrollBehavior.hasScrolled-=~~(this.scrollBehavior.hasScrolled/5*3):this.scrollBehavior.hasScrolled>23?this.scrollBehavior.hasScrolled=24:this.scrollBehavior.hasScrolled=0;
            break;
          case 'lazySettingsSave':
            if(!lzyEventsRecorder.isHappened('lazySettingsSave')){
              this.lzyControlSettings("lzysettings","save");
            };
            break;
          case 'settingUpdate': // 一轮仅触发一次
            if(!lzyEventsRecorder.isHappened('settingUpdate')){
              this.getEngines(true); // 更新弹幕设置
            }
            break;
          case 'clearMsgError':
            this.lzymsgBar.snackMsgQueue[3].forEach(function(handle) {
              clearTimeout(handle);
            });
            _this.lzymsgBar.showMsg['error'] = false;
            _this.lzymsgBar.showMsgCallback['error'] = []; // 清空方法区数组
            break;
          case 'clearMsgAll':
            this.lzymsgBar.snackMsgQueue.forEach(function(tunnel,id){
              tunnel.forEach(function(handle){
                clearTimeout(handle);
              })
              let msgControl = id===0?'info':id===1?'success':id==2?'warning':id===3?'error':'info';
              _this.lzymsgBar.showMsg[msgControl] = false;
              _this.lzymsgBar.showMsgCallback[msgControl] = []; // 清空方法区数组
            })
            break;
          default :
            break;
        }
      }
      var immerseAction=function(onImmerse = ()=>{}){
        if(_this.scrollBehavior.hasScrolled > DEADLINE) _this.scrollBehavior.userFocus=true,_this.scrollBehavior.hasScrolled -= ~~(_this.scrollBehavior.hasScrolled/2 - Math.log(_this.scrollBehavior.hasScrolled+1));
        else _this.scrollBehavior.userFocus=false,_this.showSettings=false;
        
        if(_this.scrollBehavior.hasScrolled > END) _this.scrollBehavior.hasScrolled--;
        else{
          _this.showUpdateSnackbar = false;
          _this.searchBox = false; // 沉浸模式自动隐藏搜索框
          onImmerse.apply(_this,arguments);
        };
      };

      if(this.lzyPublicSettingsStorage.immerse){
        immerseAction(()=>{
          var _self = this;
          this.lzyadditionImmerseAction.forEach(function(v,i){
            var hookFunction = v.shift(); // 数组v中，第一个数据传入函数体，后面的为参数
            hookFunction.apply(_self, v);
            v.unshift(hookFunction); // 否则需要深拷贝
          });
        });
      }
    },
    themeFastToggle(){
      this.theme = this.theme === themeCabinet[0]?themeCabinet[1]:'default';
      let temp = themeCabinet[0];
      themeCabinet[1] = themeCabinet[0];
      themeCabinet[0] = temp;
    }
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
      if(value.length<2) this.searchHint = "搜索动漫、电影、电视剧、韩剧、欧美大片";
      if(value.length>2 && this.$route.path.indexOf('/details')!==-1){
        this.searchHint = "发起搜索后会在展示并覆盖当前页结果";
      }
      if(value.length>7){this.searchHint = "使用精简的关键词更容易搜索到目标内容哦！"}
      return value?value+'':'';
    }
  },
  created:function(){
    var _this=this;
    try {
      this.lzyControlSettings("lzysettings","load");
      this.$vuetify.theme.dark = !!this.lzyPublicSettingsStorage.darkMode; // Dom加载前提前读取dark模式，防止干扰渲染重排
      
      this.lzysetSearchHistory('read');
      this.getEngines();
    } catch (error) {
      this.lzymessage("读取搜素历史记录失败");
    }
  },
  mounted() {
    var _this=this;
    this.loading=false;
    window.addEventListener("scroll",this.onScroll);
    if(process.env.NODE_ENV === 'production' && this.lzyControlSettings("statistics")){
      var statistics = function() {
        var hm = document.createElement("script");
        hm.src = `http://127.0.0.1:6001/statistics/hm.js?st=cba&u=${window.document.URL}&ft=aac`;
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      };
      statistics();
    }
    
    setTimeout(function(){
      _this.checkUpdate();
    },8*60*1000);
    this.coreIntervalHandle = setInterval(this.lzycoreActions, 5*1024);
  },
  destroyed(){
    clearInterval(this.coreIntervalHandle);
  }
};
</script>
<style>

.lzytop{z-index: 99999;}
.lzyalert {
  position: fixed;
  top: 78px;
  left: 30px;margin-top: 24px;
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
  padding: 0px;
  width:156px!important;
  text-align: left;
  overflow: hidden;
  max-width: unset!important
}
.settingPanel > span{
  display: inline-block;
  padding-left: 14px;
}
.settingPanel .enginesPanel{
  margin-bottom: 12px;
  max-height: 168px;
  overflow-y: scroll;
}
.enginesPanel > span{font-size:12px;}
.settingPanel span.aboutBtn ,.settingPanel span.updateBtn {
  display: block!important;
  margin: auto;
  padding: 2px 0;
  text-align: center;
  margin-left: 8px!important;
  border-radius: 5px;
}
.settingPanel span.aboutBtn a,.settingPanel span.updateBtn a{
  vertical-align: middle
}
.settingPanel span.aboutBtn:hover,.settingPanel span.updateBtn:hover{ 
  color: #ff3737;
  background: #c9c9c9;
  /* text-decoration: underline; */
}
/* 主题切换按钮 */
#lzySettingPanel{
  position: fixed;
  bottom: 16px;left: 26px;
  /* right: 5px; */
  padding:10px;
  white-space: nowrap;
  cursor: pointer;
  z-index: 99;
}
#lzySettingPanel .gear{
  font-size: 14px;
}
.gear span,.gear i{
  margin-right: 3px;
  vertical-align: middle;
}
#lzyScroll{
  position: fixed;
  bottom: 56px;right: 56px;
  height: 99px;
  width: 46px;
  background: transparent url('./assets/images/toTop.png') no-repeat scroll center center / cover;
  /* animation-delay: .3s; */
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

/* 覆盖默认样式 */
code{font-size: 13px!important;}
.li-textarea .v-input .v-input__control .v-text-field__details{display:none}
.enginesPanel > span .v-input .v-input__control .v-messages{
  display: none!important;
}
.enginesPanel > span .v-input .v-input__control .v-input__slot .v-label{
  text-transform: none!important;
}
.fastSettings .v-input .v-input__control .v-messages{
  display: none!important;
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
.fadeUp-enter{
  opacity: 0;
}
.fadeUp-leave-to{opacity: 0;transform: translateY(50px)}
.fadeUp-enter-active{transition:all 0.4s ease;}
.fadeUp-leave-active{transition:all 0.4s ease;}

/* 默认样式blur替换 */
a div .v-image__image--preload{
  -webkit-filter:unset!important; 
  filter:unset!important;
}

::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
  background-image: linear-gradient(135deg,#6afdc0,rgba(255, 154, 154, 0.5) 72%,rgba(0, 198, 234, 0.3));
}
::-webkit-scrollbar-track {
  border-radius: 0;
}
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-image: linear-gradient(135deg,#fa5363,#addb08 46%,#20e3ff);
  transition: all .2s;
  border-radius: 0.25rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(95, 95, 95, 0.7);
}
/* .spin{animation: lzySpin 8s linear 3s;} */
.spin{animation: lzySpin 8s infinite linear 3s;}
.spin:hover{
  animation-duration: 1s;
  animation-direction: reverse;
  animation-timing-function: ease-in-out;
  /* animation-iteration-count: 2; */
}
/* lzyAnimation */
@keyframes lzySpin{
	100%{transform:rotate(360deg);}
}
.dropIn {
  animation: dropIn 0.4s ease-in;
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
.dropUp{animation: dropIn 0.4s ease-in;}
@keyframes dropUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
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

/** 梦幻主题 fantasy */
.fantasy .v-main__wrap #lzyScroll{
  background-image: url(https://m.pixivic.com/img/girl.69e7e390.gif);
  width:86px;
  height:118px;
}
.fantasy .v-main__wrap .container{
  opacity: .9;
}
.fantasy .v-main__wrap .container .lzytransparent{
  opacity: 0.86;
}
.fantasy .episodeVer{
  background: rgba(53, 46, 46, 0.7);
  padding:0  0 10px 36px;
  border-radius: 15px;
}
.fantasy .episodeVer .lzytitle{color:#fff}
.fantasy{background: transparent;}
.fantasy::before{
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    will-change: transform;
    z-index: -1;
    /* background-image: url('https://tva1.sinaimg.cn/large/0072Vf1pgy1foxkf2ckn5j31hc0u0nkl.jpg'); */
    /* background-image: url('https://tva2.sinaimg.cn/large/87c01ec7gy1frkicqzcjtj21id0xz1kz.jpg'); */
    /* background-image: url('https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkfcikvsj31hc0u0ar1.jpg'); */
    
    /* https://5200.pro/wp-content/uploads/2020/03/50793245_p0.png */
    background-image: url('http://api.mtyqx.cn/api/random.php?91f275ab');
    background-repeat: no-repeat;
    background-position: top right;
    background-size: cover;
    -moz-filter: blur(10px) brightness(.88);
    -webkit-filter: blur(10px) brightness(.88);
    -o-filter: blur(10px) brightness(.88);
    -ms-filter: blur(10px) brightness(.88);
    filter: blur(10px) brightness(.88);
}
/* 播放器圆角 */
.fantasy div.container div#myplayer div.lzyplayerFooter{border-radius: 5px;}
div#myplayer{border-radius: 8px;}
.fantasy div.container div#myplayer{border-radius: 0;}
/*调整Nprogress加载进度条的样式*/
#nprogress .spinner{
  top:22px!important;
  right:33px!important;
}
</style>

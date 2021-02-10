<template>
  <v-app :style="!lzyPublicSettingsStorage.theme?'':'background:transparent'">
    <div @mouseenter="userActive=true" style="position:fixed;top:0;height: 32px;margin-top: 0px;left: 0px;right: 0px;z-index:4;"></div>
    <transition name="fadeUp">
    <v-app-bar app v-show="userActive" class="dropIn" color="pink" dark>
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
        @click.stop="lzysendMessage('userFocus'),lzysendMessage('toggle_searchBox'), $vuetify.goTo(-200,{offset:-200,duration:256,easing:'easeInOutCubic'});"
      >
        <span class="mr-2">Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        class="settingButton"
        @click.stop="lzysendMessage('userFocus'),showSettings=!showSettings" 
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
            <span class="ma-2 mb-4 updateBtn" @click="checkUpdate(false)" style="">
              <v-badge v-show="pubInfo.needUpdate" bordered color="pink" icon="mdi-arrow-up-bold" overlap><a>Update</a><v-icon>mdi-arrow-up-bold-box-outline</v-icon></v-badge>
              <a v-show="!pubInfo.needUpdate">Update</a><v-icon v-show="!pubInfo.needUpdate">mdi-arrow-up-bold-box-outline</v-icon>
            </span>
          </v-card>
        </v-expand-transition>
      </v-btn>
    </v-app-bar>
    </transition>
    <v-main :class="''+(!lzyPublicSettingsStorage.theme?'':lzyPublicSettingsStorage.theme)">
      <!-- 对话框组件 -->
      <lzydialog
        class="lzydialogComponent"
        ref="dialog"
      ></lzydialog>
      <!-- 消息条组件 -->
      <lzynotice
          class="lzyalert"
          ref="notice"
      ></lzynotice>
      
      <!-- 搜索区域 -->
      <transition name="lzysearch-box">
        <lzysearchbox ref="searchBox"
          v-show="showSearchBox"
          :searchControl="searchControl"
        >
        </lzysearchbox>
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
            <span style="float:right;margin-left: 14px"><time><i>{{pubInfo.version.time.slice(0,10)}}</i></time></span>
          </p>
          <div style="display:flex;justify-content: space-between;">
            <div style="white-space: nowrap;flex-shrink:0;">更新简介：</div>
            <pre style="word-break: break-word;white-space: break-spaces;flex-shrink:1;flex-grow:1;" v-html="pubInfo.version.describe"></pre>
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

      <!-- 主题切换 -->
      <transition name="themeToggle">
      <div id="lzySettingPanel" v-show="userActive" class="bounceInUp">
          <div class="gear"
            :style="`opacity:${lzyPublicSettingsStorage.theme=='fantasy'?'0.7':'1'}`"
            @click="lzyControlSettings('theme','lazySet',lzyPublicSettingsStorage.theme),lzysendMessage('userFocus')">
            <!-- 点击主题文字切换快速切换主题 -->
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="showTheme"
                  v-on="on," v-bind="attrs" 
                  @click="(!lzyPublicSettingsStorage.theme?lzyPublicSettingsStorage.theme='fantasy':lzyPublicSettingsStorage.theme='')">
                  <span>{{!lzyPublicSettingsStorage.theme?"Default":"Fantasy"}}</span>
                  <span style="color:#ff9800">|</span>
                  <span :style="`color:${!!$vuetify.theme.dark?'#fff':'black'};`">THEME</span>
                </span>
              </template>
              <span>点击切换主题</span>
            </v-tooltip>
            <!-- 点击齿轮切换日间和夜间模式 -->
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span class="lzycard-item"
                  v-on="on," v-bind="attrs"
                  @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                >
                  <div class="item-front">
                    <v-icon class="spin" color="rgb(46, 46, 46)">mdi-cog</v-icon>
                  </div>
                  <div class="item-backface">
                    <v-icon>{{!!$vuetify.theme.dark?"mdi-brightness-6":"mdi-brightness-4"}}</v-icon>
                  </div>
                </span>
              </template>
              <span>{{!!$vuetify.theme.dark?"点击立即种太阳":"巴拉拉黑暗魔法"}}</span>
            </v-tooltip>
          </div>
      </div>
      </transition>
      <!-- 滚动到顶部 -->
      <transition name="scrollTop">
      <div v-show="userActive" id="lzyScroll" title="回顶" class="bounceInUp animated" @click="$vuetify.goTo(-200,{offset:999,duration:1024,easing:'easeInOutCubic'})">
      </div>
      </transition>
      <keep-alive max="1" include="Home">
        <router-view :key="lzyupdateComponent"
        :searchVal="searchControl.searchVal" 
        :searching="searchControl.searching"
        @search="onSearch"
        @setSearchHistory="lzysetSearchHistory" 
        @message="lzymessage"
        @dialog="lzydialog"
        @lzyglobalSettings="lzyControlSettings" 
        @addAction="lzysendMessage">
        </router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import _ from "lodash";
import lzynotice from "./auxiliary/lzynotice"
import lzydialog from "./auxiliary/dialog"
import lzySearchBox from './Pages/SearchBox';

export default {
  name: "App",
  components:{
    "lzynotice":lzynotice,
    "lzydialog": lzydialog,
    "lzysearchbox": lzySearchBox,
  },
  data: () => ({
    // 全局设置项暂存 和 默认设置
    lzyPublicSettingsStorage:{
      themeCabinet: ['default','fantasy'],
      theme: 'default',
      darkMode: false,

      immerse: true,
      statistics: true,
      matchDanmaku: 2,
      matchDeadline: 65,
      matchSelectedBySequence: false,
      server:"http://127.0.0.1:6001/",
    },

    showSearchBox: true,
    searchControl:{
      searching: false,
      searchVal: [],
    },
    pubInfo:{
      version:{
        tag:'1.3.0',
        url:'https://github.com/zaxtyson/AnimeSearcher/releases',
        describe:'',
        time:'',
      },
      needUpdate:false,
      
    },
    // 行为消息
    userActive: true,

    // 全局消息队列
    lzycoreMsg:[],
    lzyadditionImmerseAction:[],
    coreIntervalHandle:0,
    // 无用的函数过程中的临时数据
    tempData:{scrollAnimationID:""},

    showUpdateSnackbar:false, // 消息条显示
    
    currentPath: window.location.pathname,
    showSettings: false,
    switchEngines:{
      0:{name:"yhdm",value:true},
      1:{name:"bimibimi",value:true},
      2:{name:"k1080",value:true},
      3:{name:"zzfun",value:true},
      4:{name:"agefans",value:true},
      5:{naem:"eyunzhu",value:false},
      6:{name:"meijuxia",value:false}
    },
    switchDanmaku:{
      0:{name:'bilibili', value:true},
      1:{name:"tencent", value:true},
      2:{name:"youku", value:true},
      3:{name:"bimibimi", value:false},
      4:{name:'bahamut', value:false},
    },
    inject: ["theme"],
    lzyupdateComponent:Math.random().toString(16).slice(-4)
  }),
  methods: {
    onSearch(str){
      str = str || '异世界';
      this.$refs.searchBox.onSearch(str);
    },
    // 开放式搜索历史保存
    lzysetSearchHistory(mode='new', appendStr=''){
      this.$refs.searchBox.lzysetSearchHistory(mode, appendStr);
    },
    /**
     * 消息条显示函数
     * @param str {需要显示的消息文字}
     * @param type {消息条样式类型,支持`info`,`succese`,`warning`,`error`,`info`}
     * @param id {要显示消息条的轨道id，为提高复用性而设定。轨道最多支持4条(id=0,1,2,3)。应该按事件触发频率进行不同轨道分发}
     * @param duration {消息条显示的持续时间，单位毫秒；@if 设置为0，则默认永久，并在点击事件触发时隐藏消息条}
     * @param onClick 第四个参数加入回调函数，可自定义点击事件触发时的动作
     * */ 
    lzymessage: function(str, type = "success", id=0, duration=3999, onClick=function(){}){
      if(!this.$refs.notice) return false;
      this.$refs.notice.lzynotice(str, type, id, duration, onClick);
    },/**
     * 对话框显示函数
     * @param confirm 点击OK后的回调函数 默认动作关闭弹窗
     * @param cancel  点击取消后的回调函数 默认动作关闭弹窗
     * @param options 设置弹窗内容和样式的对象
     */
    lzydialog: function({...options}){
      this.$refs.dialog.lzydialog( options.confirm, options.cancel, options);
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
      this.$http.get('system/modules').then(function(res){
        if(typeof(res)==='undefined' || _.isEmpty(res.data) || !res.data.hasOwnProperty("anime") || !res.data.hasOwnProperty('danmaku') ) return _this.lzymessage("获取设置项失败,请确保服务端已运行!","error",2);
        function transformObject(modules){
          let i=0, mark = -1, result = {};
          if(modules.length){
            modules.forEach((item)=>{
              result[i] = {
                name: item.module.slice(item.module.lastIndexOf('.') - item.module.length + 1),
                value: item.enable,  
              };
              i++;
            });
          }
          return result;
        }
        _this.switchDanmaku=transformObject(res.data.danmaku);
        _this.switchEngines=transformObject(res.data.anime);
      }).catch(function(e){console.log(e);});
    },
    postEnginesSetting:async function(name, id){
      const res =await this.$http.post('system/modules',[{module:'api.anime.'+name,enable: this.switchEngines[id].value}]).catch(function(e){console.log(e);});
      if(res.status==200) this.lzymessage("已经成功"+(this.switchEngines[id].value?'开启':'关闭')+"了引擎"+name,"success",1);
      else{
        this.switchEngines[id].value=!this.switchEngines[id].value;
        this.lzymessage("设置失败！已撤销设置","error",2);
      }
    },
    postDanmakuSetting:async function(name,id){
      const res = await this.$http.post('system/modules',[{module:'api.danmaku.'+name,enable: this.switchDanmaku[id].value}]).catch(function(v){console.log(v)});
      if(res.status==200) this.lzymessage("成功"+(this.switchDanmaku[id].value?'开启':'关闭')+"了弹幕源"+name,"success",1);
      else{
        this.switchDanmaku[id].value=!this.switchDanmaku[id].value;
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
    getSystemVersion(){
      var _this = this;
      this.$http.get("system/version").then((res)=>{
        this.pubInfo.version.tag = res.data.tag;
        this.pubInfo.version.describe = res.data.desc;
        this.pubInfo.version.time = res.data.time;
      }).catch((error)=>{throw new Error(error);});
    },
    checkUpdate(isSilent = true){
      var _this = this,
          checkFlag = -1;
      if(!isSilent || isSilent&&_this.lzyPublicSettingsStorage.immerse) this.lzymessage("正在检查更新……","info",0);
      const updateUrl = 'https://gitee.com/api/v5/repos/zaxtyson/AnimeSearcher/releases/latest';
      this.$http.get(updateUrl).catch(function(e){
        _this.lzymessage(`唔，检查更新失败了，请检查网络`,"error",1);console.error(e)})
      .then(function(res){
        const data=res.data;
        var currentMark=getInsertedNumbers(_this.pubInfo.version.tag), cloudMark=getInsertedNumbers(data.tag_name);

        if(weightSum(cloudMark) > weightSum(currentMark) ) checkFlag++;
        else if(weightSum(cloudMark) === weightSum(currentMark)){
          if(getInsertedNumbers(data.tag_name,false,true) > getInsertedNumbers(_this.pubInfo.version.tag,false,true)) checkFlag++;
          if(cloudMark.length===currentMark.length) checkFlag--;
          if(getInsertedNumbers(_this.pubInfo.version.tag,false).length===getInsertedNumbers(data.tag_name,false).length) checkFlag++;
          if(data.tag_name.length > _this.pubInfo.version.tag.length) checkFlag++;
          else if(data.tag_name.length < _this.pubInfo.version.tag.length) checkFlag--;
        }
        if(checkFlag < 0){
          _this.pubInfo.version.describe=data.body;
          if(!!_this.pubInfo.needUpdate) return true;
          if(!isSilent || isSilent&&_this.lzyPublicSettingsStorage.immerse)
            _this.lzymessage("当前已是最新版：v"+_this.pubInfo.version.tag,"success",1);
          return ;
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
          mixedStr=mixedStr.replace(/\s/g,'');
          if(sum) result=0;
          else result='';
          for(let i=0;i<mixedStr.length;i++){
            if(sum){
              result=result + (!isNaN(mixedStr[i]) ? parseInt(mixedStr[i]) : 0) ;
              continue;
            }
            if( !isNaN(mixedStr[i]) || mixedStr[i]==='·' || mixedStr[i]===".") result+=mixedStr[i];
            else if(consistent) break; // 
          }
          return result;
        };

        _this.pubInfo.version = {
          tag:data.tag_name,
          url: 'https://gitee.com/zaxtyson/AnimeSearcher/releases/' + data.tag_name,
          describe:(data.body),
          time:data.created_at
        }
        _this.pubInfo.needUpdate = true;
        _this.showUpdateSnackbar = true;
        if(!isSilent || isSilent&&_this.lzyPublicSettingsStorage.immerse) _this.lzymessage(`发现新版本：<a target="_blank" href="${data.html_url}">v${data.tag_name}</a> 快去更新吧！`,"success",1);
      });
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
          this.settingStorage.lazySet(key,value);
          break;
        case 'set':
          this.settingStorage.set(key,value);
          break;
        case 'delete':
          this.settingStorage.delete(key);
          break;
        case 'save':
          this.settingStorage.save();
          break;
        case 'load':
          this.settingStorage.load();
          break;
        case 'clear':
          this.settingStorage.clear();
          break;
        case 'read':
          rtValue = this.settingStorage.read(key) || null;
          break;
        default:
          rtValue = typeof(this.settingStorage.storage[key])!=='undefined'?this.settingStorage.storage[key]:null;
          break;
      }
      callback(rtValue);
      return rtValue;
    },
    // 发送消息到消息队列与即刻处理的特殊消息
    lzysendMessage:function(str, ...argum){
      switch(str){
        case 'immerse_addAction':{
          argum.unshift("immerse_addAction");
          this.$magic.actionQueue.addHook.apply(null, argum);
          break;
        }
        case 'immerse_removeAction':{
          argum.unshift("immerse_removeAction");
          this.$magic.actionQueue.addHook.apply(null, argum);
          break;
        }
        case 'toggle_searchBox':{
          if(argum.length>0)
            this.showSearchBox = argum[0];
          else
            this.showSearchBox = !this.showSearchBox;
          break;
        }
        case 'hide_settings':{
          this.showSettings=false;
          break;
        }
        default:
          if(argum.length>0)
            this.$magic.actionQueue.bubble( argum.unshift(str) );
          else
            this.$magic.actionQueue.bubble(str);
          break;
      }
    },
    themeFastToggle(){
      this.theme = this.theme === themeCabinet[0]?themeCabinet[1]:'default';
      let temp = themeCabinet[0];
      themeCabinet[1] = themeCabinet[0];
      themeCabinet[0] = temp;
    }
  },
  created:function(){
    this.getSystemVersion();
    const _this=this;
    try {
      this.$magic.initActionQueue({
        immerseModeOn:()=>{return !!_this.lzyPublicSettingsStorage.immerse},
        basic:function(){
          _this.userActive = this.isFocused();
        },
        nearImmerse:()=>{
          _this.showSettings = false
        },
        divorceImmerse:()=>{}, 
      });
      this.settingStorage = new this.$magic.lzystorage("lzysettings", _this.lzyPublicSettingsStorage);
      if( Object.keys(this.settingStorage.storage).length>0 ){
      }else{console.log("设置项数据为空 或者加载失败");}
      this.lzyControlSettings("lzysettings","load");

      this.$vuetify.theme.dark = !!this.lzyPublicSettingsStorage.darkMode;
      if(this.lzyPublicSettingsStorage.server){
        this.$http.defaults.baseURL = this.lzyPublicSettingsStorage.server;
        this.$http.defaults.$baseSocket = 'ws://' + this.lzyPublicSettingsStorage.server.replace(/(http(:?s)*:\/\/)/,'');
      }
      this.getEngines();
      messageRegister();

    } catch (error) {
      console.warn("读取历史记录失败，格式错误？",error);
    }
    /**
     * 注册核心消息钩子通道
     * 注册沉浸模式钩子方法
     * once控制一个消息周期内的节流控制
     * this作用域被置为原来的`actionQueue`对象，不使用箭头函数时直接使用this访问自身方法性能更优
     */
    function messageRegister(){
      _this.$magic.actionQueue.register(
        {
          message:"checkUpdate",
          once: true,
          actions: ()=>{_this.checkUpdate()}
        },{
          message: "indicatorAdjust",
          once: false,
          actions: function(value){
            this.indicatorAdjust(value);
          }
        },{
          message:"userFocus",
          once: false,
          actions: function(){
            this.indicatorAdjust(30);
          }
        },{
          message:"userImmerse",
          once: false,
          actions: function(){
            let indicator = this.getIndicator();
            let temp = indicator;
            indicator>99 ? indicator = - ~~(indicator/5*3) : indicator>23 ? indicator=24 : indicator=0;
            this.indicatorAdjust(indicator - temp);
          }
        },{
          message: "lazySettingsSave",
          once: true,
          actions: ()=>{
            window.localStorage.setItem("lzysettings", JSON.stringify(this.lzyPublicSettingsStorage));
          }
        },{
          message: "settingUpdate",
          once: true,
          actions: ()=>{_this.getEngines(true)}
        },{
          message: "clearMsgError",
          once: true,
          actions: ()=>{_this.$refs.notice.clearMsgError();}
        },{
          message: "clearMsgAll",
          once: true,
          actions: ()=>{_this.$refs.notice.clearMsgAll();}
        },
      );
      _this.$magic.actionQueue.addHook("immerse_addAction",{
        once: false,
        key: "init",
        action: ()=>{
          _this.showUpdateSnackbar = false;
          _this.showSearchBox = false;
        },
      });
    };
  },
  mounted() {
    const _this=this;
    if(process.env.NODE_ENV === 'production' && this.lzyControlSettings("statistics")){
      var statistics = function() {
        var hm = document.createElement("script");
        hm.src = `${_this.$http.defaults.baseURL}statistics/hm.js?st=cba&u=${window.document.URL}&ft=aac`;
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      };
      statistics();
    }
    
    setTimeout(function(){
      _this.checkUpdate();
    },8*60*1000);
  },
  destroyed(){
  }
};
</script>

<style>
.lzytop{z-index: 99999;}
.lzyalert {
  position: fixed;
  top: 78px;
  left: 30px;
  margin-top: 24px;
  z-index: 9999;
}
.lzydialogComponent{
  position: absolute;
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
}
#lzySettingPanel{
  position: fixed;
  bottom: 16px;left: 26px;
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
.gear>.lzycard-item, .gear>.showTheme{
  display: inline-block;
}
.gear .lzycard-item{
  width: 36px;
  height: 24px;
}
.gear .lzycard-item .spin{
  animation-direction: reverse;
}

#lzyScroll{
  position: fixed;
  bottom: 56px;right: 56px;
  height: 99px;
  width: 46px;
  background: transparent url('./assets/images/toTop.png') no-repeat scroll center center / cover;
  z-index: 99;
}
#lzyScroll:hover{
  animation: rubberBand .6s linear;
  animation-delay: 0;
}

@media screen and (max-width: 560px) {
  #lzyScroll{
    height: 66px;
    widows: 30px;
    bottom: 20px;
    right: 26px;
  }
  #lzyScroll:hover{
    animation: none;
  }
  #lzySettingPanel{
    bottom: 2px;left: 6px;
    padding:8px;
  }
}
.lzycard-item{
  perspective: 1200px;
  position: relative;
}
.item-front, .item-backface {
  position: absolute;
  transition: all .6s ease-out;
  backface-visibility: hidden;
}
.item-backface {
  transform: rotateY(-180deg);
}
.lzycard-item:hover .item-backface {
  transform: rotateY(-360deg);
}
.lzycard-item:hover .item-front {
  transform: rotateY(-180deg);
}
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

.lzysearch-box-enter-active {
  transition: all 0.4s ease;
}
.lzysearch-box-leave-active {
  transition: all 0.4s ease;
}
.lzysearch-box-enter {
  transform: translateY(-50px);
  opacity: 0;
}
.lzysearch-box-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.lzysearch-boxlist-leave-active,.lzysearch-boxlist-enter-active{
  position: absolute;
}
.lzysearch-box-enter{
  opacity: 0;transform: translateX(-50px);
}
.lzysearch-box-leave-to{
  opacity: 0;
  transform:translateX(50px)
}

.fadeUp-enter{
  opacity: 0;
  transform: translateY(-66px)!important;
}
.fadeUp-leave-to{opacity: 0;transform: translateY(-66px)}
.fadeUp-enter-active,.fadeUp-leave-active{transition:all 0.4s ease;}
.themeToggle-enter{opacity: 0;transform: translateY(50px);}
.themeToggle-leave-to{opacity: 0;transform: translateY(50px);}
.themeToggle-enter-active,.themeToggle-leave-active{transition: all 0.4s ease;}
.scrollTop-leave-to{transform: translateX(80px);}
.scrollTop-leave-active{transition: all 0.4s ease;}

div.bg-0{
  background: none!important;
}
a div .v-image__image--preload{
  -webkit-filter:unset!important; 
  filter:unset!important;
}
</style>

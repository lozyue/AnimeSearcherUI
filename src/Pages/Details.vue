<template>
  <v-container>
    <v-row class="mg dropIn">
      <v-col cols="12">
        <v-row></v-row>
        <v-row v-show="!onlyShowIntroduce" align="center" justify="center">
          <div style="max-width:100%;flex-grow: 1;">
            <div id="lzyplayer" transition="scroll-y-transition" @click="$refs.player.$el.click()">
              <h4 class="player-head"> {{title+' '+play_lists[version_index].name}} <span style="color:#ff9800">{{$route.params.episode}}</span></h4>
              <d-player
                ref="player"
                storageMode="outer"
                :screenshot="$magic.isFileProtocol()"
                :settingStorage="lzyplayerSettings.dplayerInner" 
                :lang="lzyplayerUI.lang"
                :theme="lzyplayerUI.theme"
                :contextmenu="lzyplayerUI.contextmenu"
                :video="video"
                :danmaku="danmaku"
                @error="lzyResponse()"
                @fullscreen="lzyFullScreen(true)"
                @fullscreen_cancel="lzyFullScreen(false)"
                @pause="lzyplaySetTempHistory(),lzyStorageHistory()"
                @beforeDestroy="lzyplaySetTempHistory(),lzyStorageHistory()"
                @settingchange="(needSave)=>{if(needSave) lzyplayer_settingStorage.lazySave()}"
                @lzyplay_hotkeyToggle="lzyplayNext"
                @onplaynext="lzyplayNext(false)"
              ></d-player>
              <div class="lzyplayerFooter">
                <span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small color="#fcbad3"
                        v-bind="attrs" v-on="on"
                        @click="lzyplayNext(false)"
                      >
                        <v-icon color="white">mdi-skip-next</v-icon>
                      </v-btn>
                    </template>
                    <span>播放下一集</span>
                  </v-tooltip>
                </span>
                <span>
                  宽屏
                  <v-switch light class="ml-2" inset dense
                    v-model="wideplayMode"
                    @click="lzyplayerSets('danmuShow')"
                  ></v-switch>
                </span>
                <span>
                  <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      small color="#fce2ce"
                      v-bind="attrs" v-on="on"
                      @click="lzyplay(playersettings.url,playersettings.name, playersettings.index,true,false,false)"
                    >
                      <v-icon color="white">mdi-sync</v-icon>
                    </v-btn>
                  </template>
                  <span>卡点重载</span>
                </v-tooltip>
                </span>
                <span>
                  <div class="lzyplayerMsg" :title="footerMsg.replace(/<span[^<>]*?>(.*?)<\/span>/g,'$1')" ><div class="rollBar" v-html="footerMsg"></div></div>
                </span>
                <span style="postion:relative">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon @click="danmuSelectPanel.showSelect=true,danmuSelectPanel.showAdditionSelect=false, selectTemp={danmakuEpisode:currentEpisodeDanmaku,danmaku_index:0,episode_index:-1}"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="info">mdi-message-bulleted</v-icon>
                      </v-btn>
                    </template>
                    <span>选择弹幕</span>
                  </v-tooltip>
                </span>

                <span style="postion:relative">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon @click="
                        danmuSelectPanel.showAdditionSelect=danmuSelectPanel.showSelect=true"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="#eab4f8" style="position:relative;top:-2px">mdi-text-box-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>外挂额外弹幕</span>
                  </v-tooltip>
                </span>

                <span>
                  自动切P
                  <v-switch
                    dense inset class="ml-2"
                    color="#eab4f8" light
                    v-model="lzyplayerSettings.autoNext"
                    @click="lzyplayerSets()"
                  ></v-switch>
                </span>
              </div>
              <v-stepper light v-show="danmuSelectPanel.showSelect" class="lzyselectDanmaku" v-model="danmuSelectPanel.onstep">
                <v-stepper-header>
                  <v-stepper-step  editable :complete="danmuSelectPanel.onstep > 1" step="1">
                    <span :style="danmuSelectPanel.showAdditionSelect?'color:#ff414d':''">{{!danmuSelectPanel.showAdditionSelect?"选择弹幕源":"选择外挂弹幕源"}}</span></v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="danmuSelectPanel.onstep > 2" step="2">当前番目弹幕</v-stepper-step>
                  <v-divider></v-divider>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                      class="mb-6 lzydanmaku-list"
                      color="#fff0d5"
                      height="300px"
                    >
                    <v-progress-linear
                      :active="danmuSelectPanel.loading"
                      :indeterminate="danmuSelectPanel.loading"
                      absolute top
                      color="deep-purple accent-4"
                    ></v-progress-linear>
                      <ul>
                        <li class="li-textarea">
                          <v-text-field v-on:keyup.enter="get_danmaku(userDanmakuSearch)" dense v-model="userDanmakuSearch">
                            <v-icon title="点击或回车发起搜索" @click="get_danmaku(userDanmakuSearch)" slot="prepend" color="gray">
                              mdi-text-box-search-outline
                            </v-icon>
                          </v-text-field>
                        </li>
                        <li><span class="mb-2 pink--text">共找到 {{rankedMark.length}} 个弹幕源</span>
                          <v-btn title="刷新" hide-details small style="float:right;position:relative;bottom:2px" icon @click="get_danmaku()"><v-icon>mdi-refresh</v-icon></v-btn>
                        </li>
                        <li  @click.stop="selectTemp.danmaku_index=index" :style="index===selectTemp.danmaku_index?'background:white':''" v-for="(item,index) in rankedMark" :key=index>
                          <span>{{item.data.title}}</span>
                          <code class="ml-2">{{item.data.module.substr(item.data.module.lastIndexOf('.')+1,item.data.module.length)}}</code>
                          <span class="ml-2">Mark:{{item.mark}}</span>
                        </li>
                      </ul>
                    </v-card>
                    <v-btn class="white--text" 
                      :disabled="!rankedMark.length"
                      :color="danmuSelectPanel.showAdditionSelect?'#d7385e':'primary'" small
                      @click="danmuSelectPanel.onstep = 2,lzyuserSelect(rankedMark[selectTemp.danmaku_index].data.url)"
                    >Continue</v-btn>
                    <v-btn small text style="float:right" @click="danmuSelectPanel.showSelect=false">Close</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-progress-linear
                      :active="danmuSelectPanel.loading"
                      :indeterminate="danmuSelectPanel.loading"
                      absolute top
                      color="deep-purple accent-4"
                    ></v-progress-linear>
                    <v-card class="mb-6 lzydanmaku-list" color="#fff0d5" height="300px"
                    >
                      <ul>
                        <li><span class="mb-2 pink--text">共找到 {{selectTemp.danmakuEpisode.length}} 条弹幕集</span></li>
                        <li @click="selectTemp.episode_index=index" :style="index===selectTemp.episode_index?'background:white':''" v-for="(item,index) in selectTemp.danmakuEpisode" :key="index">
                          <span class="mr-2" style="display:inline-block;color:#21acff">标题{{index+1}}：</span><span>{{item.name}}</span>
                        </li>
                      </ul>
                    </v-card>
                    <span><v-btn class="white--text" 
                      :color="danmuSelectPanel.showAdditionSelect?'#d7385e':'primary'" light small
                      @click="(danmuSelectPanel.showAdditionSelect?lzyuserAdditionSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url,selectTemp.danmakuEpisode[selectTemp.episode_index].name):lzyuserSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url, selectTemp.danmakuEpisode[selectTemp.episode_index].name)),danmuSelectPanel.showSelect=false"
                    >{{!danmuSelectPanel.showAdditionSelect&&"Done" || "合并"}}</v-btn></span>
                    <span><v-btn small text style="float:right" @click="danmuSelectPanel.showSelect=danmuSelectPanel.showAdditionSelect=false">Close</v-btn></span>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </div>
          <!-- 番目选择列表 -->
          <div v-show="!wideplayMode" transition="scroll-x-transition" class="lzytransparent section-module">
            <div class="section-title"><span>选集</span><v-icon color="#00a1d6">mdi-playlist-play</v-icon>
              <span @click="haveSorted>1?haveSorted=0:haveSorted++, haveSorted===1 ? lodash.lzysort(play_lists[version_index].video_list, 'name') : haveSorted===2? play_lists[version_index].video_list.reverse() :play_lists[version_index].video_list=lodash.sortBy(play_lists[version_index].video_list,['id'])" style="float:right;cursor:pointer">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs" v-on="on" 
                      tag-title="当前：升序排列" color="primary" v-if="haveSorted===1">
                      mdi-sort-descending
                    </v-icon>
                    <v-icon
                      v-bind="attrs" v-on="on"
                      tag-title="当前：降序排列" color="red lighten-3" v-else-if="haveSorted===2">
                      mdi-sort-ascending
                    </v-icon>
                    <v-icon
                      v-bind="attrs" v-on="on" 
                      tag-title="当前：默认排序" v-else>
                      mdi-sort-variant
                    </v-icon>
                  </template>
                  <span>{{haveSorted===1 ? "当前：升序排列" : haveSorted===2?"当前：降序排列" : "当前：默认排序" }}</span>
                </v-tooltip>
              </span>
            </div>
            <div ref="episodeBox" class="section-wrap" >
              <ul class="episodeBox" :style="'height:'+~~(210/6)*play_lists[version_index].video_list.length+'px'" >
                <li 
                :style="play.id===playersettings.index?'background-color:#fff;color:#21acff;'+'top:'+36*index+'px':'top:'+36*index+'px'"
                @click="lzyplay(play.info,play.name,play.id,false),($refs.episodeBox.scrollTop=36*index - ~~$refs.episodeBox.clientHeight*2/5)" 
                v-for="(play,index) in play_lists[version_index].video_list" :key="index">
                  <span v-if="play.id===playersettings.index">
                    <v-icon color="#00a1d6" style="display:inline-block;margin-top:-5px;">mdi-play</v-icon>
                  </span>
                  <span v-if="isNaN(play.name)">{{play.name}}</span><span v-else>{{'『 '+play.name+" 番目』"}}</span>
                </li>
                <!-- 垫片,防止最后一个视频无空隙 -->
                <span :style="'position:absolute;display:block;height:30px;width:1px;top:'+(36*(play_lists[version_index].video_list.length-1)+12)+'px'"></span>
              </ul>
            </div>
          </div>
        </v-row>

        <v-row
          class="episodeVer"
          align="center"
          justify="center"
          v-for="(data,index) in play_lists"
          :key="index"
        >
          <v-col md="2" class="cover-box">
            <v-img class="comic-cover" lazy-src="../assets/images/default-cover.png" :src="!!cover?cover:'../assets/images/default-cover.png'"></v-img>
          </v-col>
          <v-col>
            <div>
              <h4 class="lzytitle">{{title+' '+data.name}}</h4>
              <p class="description">{{description}}</p>
            </div>
            <v-spacer></v-spacer>
            <p>选集:</p>
            <div class="episodeContainer">
              <div class="episodeBtn" v-for="(play, num) in data.video_list" :key="num">
                <v-btn class="pa-2"
                  :style="index===version_index && play.id===playersettings.index?'background-color:rgb(247,178,202)!important;':''"
                  @click="(!onlyShowIntroduce?($refs.episodeBox.scrollTop=36*play.id - ~~$refs.episodeBox.clientHeight*2/5):lodash.timer(function(){$refs.episodeBox.scrollTop=36*play.id - ~~$refs.episodeBox.clientHeight*2/5})),$vuetify.goTo(-200,{offset:100,duration:256,easing:'easeInOutCubic'}), lzyplay(play.info,play.name,play.id,false,index)"
                  min-width="54px"
                  outlined
                  color="pink"
                >
                  {{play.name.length>15?lodash.truncate(play.name,{length:15,separator:' '}):play.name}}
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
import logoImg from "@/assets/images/logo.png";
import VueDPlayer from "../auxiliary/vue-dplayer-raw.vue";
import _ from 'lodash';

export default {
  inheritAttrs: false,
  name: "Details",
  components: {
    "d-player": VueDPlayer
  },
  data: () => ({
    lodash:{
      getTimeByFloat:function(currentTime){
        currentTime = parseInt(currentTime);
        let seconds = currentTime%60,
            minutes = ~~(currentTime/60)%60,
            hours = ~~(currentTime/3600);
        return `${currentTime>3600 ? (hours<10?('0'+hours):hours) + ':' : ''}${minutes<10?('0'+minutes):minutes}:${seconds<10?('0'+seconds):seconds}`;
      },
      console:function(a,b='',c=''){
      },
      timer:function(callback, delay=2999){
        var test=setTimeout(callback, delay);
      },
      truncate:_.truncate,
      reverse:function(arr){
        var temp;
        for(let i=0;i<~~(arr.length/2);i++){
          temp=arr[i];
          arr[i]=arr[arr.length-i-1];
          arr[arr.length-i-1] = temp;
        }
        return arr;
      },
      range_reverse:_.reverse,
      sortBy:_.sortBy,
      lzysort: (arrayObjects, byField, desc = false)=>{
        arrayObjects.sort((a, b)=>{
          a = a[byField].replace(/(.*?)第([^集话节画卷章]+?)[集话节画卷章]([^\d]*?)([\d]*?)(.*?)/g,'$2$1$4$3$5');
          b = b[byField].replace(/(.*?)第([^集话节画卷章]+?)[集话节画卷章]([^\d]*?)([\d]*?)(.*?)/g,'$2$1$4$3$5');
          if(desc) return parseInt(a) < parseInt(b); 
          return parseInt(a) > parseInt(b);
        });
      },
      simplecopy:function(v){return JSON.parse(JSON.stringify(v))},
    },
    lzyplayerMsg:[],
    lzyplayHistory: {
      record: true,
      historylist:[],
    },
    lzyplayerSettings:{
      autoNext: false,
      dplayerInner: {
        opacity: .9,
        volume: 0.5,
        danmaku: 1,
        autoplay: 1,

      },
    },
    lzyGlobalCounts:0,

    onlyShowIntroduce: true,
    title: "",
    cover: "",
    category: "",
    description: "",
    play_lists: [{name:'',video_list:[]}],
    
    version_index: 0,
    mytestStr: "",
    userDanmakuSearch: "",
    
    rankedMark:[{mark:0,data:{module:'',title:'弹幕库为空',raw_url:''}}],
    currentEpisodeDanmaku:[{mark:0,data:{name:'弹幕集为空'}}],

    footerMsg:'弹幕未加载,手动选择试试~',
    playersettings: {
      index:-1,
      url: "",
      proxy_url:'',
      name: '',
      danmaku: {
        id:"danmaku_cid",
        api:'',
        addition:[]
      },
      picture: "",
      isProxy: false,
    },
    video: {
      defaultQuality: 0,
      type: "auto",
      topbar:{
        title: true,
        meta: true,
      },
    },
    danmaku:{
      id:"danmaku_cid",
      api:'',
      addition:[]
    },
    lzyplayerUI:{
      theme:"#ffa3df",
      lang: "zh-cn",
      logo: false,
      autoplay: false,
      contextmenu: [
        {
          text: "AnimeSercher",
          link: "https://github.com/zaxtyson/AnimeSearcher/"
        },
        {
          text: "API:zaxtyson",
          link: "https://github.com/zaxtyson/"
        },
        {
          text: "UI:Lozyue",
          link: "https://github.com/lozyue/"
        }
      ]
    },
    wideplayMode: false,
    danmuSelectPanel:{
      showSelect: false,
      showAdditionSelect: false,
      onstep:1,
      loading: false,
    },
    
    haveSorted: 0,
    selectTemp:{
      danmaku_index:0,
      danmakuEpisode:[{mark:-1 ,data:{name:'加载ing...'}}],
      episode_index:0,
    },
  }),
  methods: {
    getDetail: async function(searchName = '') {
      var id;
      if(!searchName) id = this.$route.params.param;
      else id = searchName;
      const res = await this.$http.get("/anime/" + id).catch(function(e) {
      });
      if (typeof(res)==='undefined' || res.status != 200 || !res.data) {
        this.$emit("message", "加载视频出错了,请尝试更换路线或者引擎", "error",2,9999);
        return false;
      }
      this.cover = res.data.cover;
      this.description = res.data.description.replace(/&nbsp;/g, " ");
      this.title = res.data.title;
      this.category = res.data.category;
      this.cover = res.data.cover_url;
      var templist = res.data.play_lists;
      templist.forEach(function(list,index,arr){
        var res=list.video_list;
        arr[index].video_list = res;
      });
      if(!_.isEmpty(templist)){
        templist.forEach(function(eachList,i,a){
          a[i].video_list.forEach(function(v,index,arr){
            arr[index]['id'] = index;
          });
        })
        this.play_lists = templist;
      }else{
        this.$emit('message',"视频详情为空或者获取失败！",'error',-1);
      }
      var lastSlash = this.$route.path.substr(9).lastIndexOf("/");
      if (lastSlash === -1) {
        this.currentPath = this.$route.path;
      } else {
        this.currentPath = this.$route.path.substr(0, 9 + lastSlash);
      }

      this.get_danmaku();
      this.$emit("addAction","userFocus");
      var temp,_this = this,
          currentHistoryIndex = this.lzyplaySetTempHistory(true,true);
      var versionMatched = 0, haveMatched =false ;
      function versionMatchWether(historyVersion){
        for(let i=0;i<_this.play_lists.length;i++){
          if(historyVersion === _this.play_lists[i].name ) return i;
        }
        return false;
      }

      if(currentHistoryIndex === false){
      }else{
        for(let j=this.play_lists.length-1;j>=0;j--){
          if((versionMatched = versionMatchWether(this.lzyplayHistory.historylist[currentHistoryIndex].version) )!==false){
            break;
          }
        }
        let firstSearchFind=true;
        if(versionMatched===false) versionMatched = this.play_lists.length-1, firstSearchFind = false;
        for(;versionMatched>=0;versionMatched--){
          for(let episode=0;episode<this.play_lists[versionMatched].video_list.length;episode++){
            
            if(this.play_lists[versionMatched].video_list[episode].name === this.lzyplayHistory.historylist[currentHistoryIndex].episode){
              this.$emit('message',`上次观看『<span style="color:#eaf;cursor:pointer;font-weight:bold;">${this.lzyplayHistory.historylist[currentHistoryIndex].episode}</span>』至 <span style="color:#eaf;cursor:pointer;font-weight:bold;">${this.lodash.getTimeByFloat(this.lzyplayHistory.historylist[currentHistoryIndex].currentTime)}</span>`,'info',3,0,function(){
                if(!_this.$refs.player) return false;
                _this.lzyplay(_this.play_lists[versionMatched].video_list[episode].info, _this.play_lists[versionMatched].video_list[episode].name, episode, false, versionMatched);
                _this.$refs.episodeBox.scrollTop=36*episode - ~~_this.$refs.episodeBox.clientHeight*2/5;
              });
              haveMatched = true;
              break;
            }
          }
          if(haveMatched) break;
          if(firstSearchFind) versionMatched = this.play_lists.length-1,firstSearchFind = false;
        }
      }
      
    },
    /***
     * 对所有搜索到的弹幕库进行相似度排序
     * */ 
    get_danmaku:async function(searchName){
      this.danmuSelectPanel.loading = true;

      var danmakuName;
      if(!searchName) danmakuName = _.trim(this.title);
      else danmakuName=searchName;
      const res = await this.$http.get('/danmaku/search/'+ danmakuName).catch(function(e){console.log(e)});
      if(typeof(res)==="undefined" || _.isEmpty(res.data)){
        this.footerMsg = '<span style="color:pink">当前弹幕库为空或者加载弹幕库失败，请尝试修改弹幕搜索词后卡点重载试试</span>';
         this.rankedMark=[];
        return this.$emit('message','当前弹幕库为空或加载弹幕库失败！','error',1);
      }
      var temp=res.data,_this=this;
      var //chunkTitle=this.title.split(''), 
          mark = [], //拿id和对应分数做标记，高分的优先{id:i,mark:0,data:{}}
          currentIndex=-1;
      temp.forEach(function(v,index,arr){
        var tempIndex=-1, currentMark=0;
        for(let i=0;i<_this.title.length;i++){
          tempIndex=v.title.lastIndexOf(_this.title[i]); //本来搜索就是向右，为避免重复词的前段查找，当然使用右边开始搜索的模式。 
          if(tempIndex!==-1){
            if(currentIndex+1===tempIndex) currentMark+=4;
            else if(currentIndex<tempIndex) currentMark+=2;
            else if(currentIndex<tempIndex) currentMark+=1;
            currentIndex=tempIndex;
          }
        }
        if(v.num+''===_this.play_lists[_this.version_index].video_list.length+''){
          currentMark += ~~( (Math.log(_this.play_lists[_this.version_index].video_list.length)+1) * (_this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length)) );
        }else{
          currentMark += _this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length);
        }
        currentMark += ~~((_this.title.length-Math.abs(v.title.length-_this.title.length)*Math.log(_this.play_lists[_this.version_index].video_list.length+1)) );
        if(v.module.lastIndexOf('bilibili')!=-1){
          currentMark += ~~(Math.abs(currentMark)/24)+1;
        }
        mark.unshift({ mark:currentMark, id:index, data:arr[index]});
      });
      var rankedMark = _.reverse(_.sortBy(mark, ['mark']) );
      _this.rankedMark = rankedMark;
      
      this.danmuSelectPanel.loading = false;
      if(_this.footerMsg.indexOf('匹配弹幕失败')+1 + _this.footerMsg.indexOf("弹幕未加载")+1 > 0 ){
        await _this.getCurrentDanmu(rankedMark[0] ,0 ,true);
      }
    }, 
    getCurrentDanmu:async function(rankedDanmaku, secondary=0, clearAddition=true){
      const _this=this;
      function getInsertedNumbers(mixedStr){
        var result = '';
        
        mixedStr = mixedStr.replace(/\s/g,'');
        for(let i=0;i<mixedStr.length;i++){
          if( !isNaN(mixedStr[i]) ) result+=mixedStr[i];
        }
        return result;
      };
      if( !rankedDanmaku || !rankedDanmaku.hasOwnProperty("data") || !rankedDanmaku.data.hasOwnProperty('url') || _.isEmpty(rankedDanmaku.data.url)) return console.error('传入的弹幕库数据有误！on function getCurrentDanmu() Param : 1',rankedDanmaku),false;
      const res = await this.$http.get(rankedDanmaku.data.url).catch(function(e){console.log(e)});
      
      var matchedURL={}, copy = res.data;
      if(_.isEmpty(res.data)){
        this.footerMsg='<span style="color:#e91e63">'
        this.footerMsg+=`当前弹幕数据为空`;
        if(secondary+1 >= this.rankedMark.length){
          _this.footerMsg='<span style="color:#e91e63">';
          _this.footerMsg+="自动匹配弹幕失败，请手动选择或重新搜索 ≧﹏≦";
          _this.footerMsg+='</span>';
          _this.playersettings.danmaku = null;
          return false;
        }else{
          this.footerMsg+=`，正在获取第${secondary+1}个弹幕源……`;
          this.footerMsg+='</span>';
          var secondaryRes=await this.getCurrentDanmu(this.rankedMark[++secondary],secondary);
          if(secondaryRes){
            let temp=this.rankedMark[secondary];
            for(let k=secondary;k>0;k--){
              this.rankedMark[k]=this.rankedMark[k-1];
            }
            this.rankedMark[0] = temp;
          }else{
            return false;
          }
        }
      }
      if(typeof(this.playersettings.name)==='undefined'){
        this.footerMsg='<span style="color:red">[error]:获取的弹幕格式不正确';
      }
      var find=false, 
          currentPlayName = ''+parseInt(getInsertedNumbers(this.playersettings.name) ), 
          currentTargetName,
          regMatch = this.playersettings.name.match(/第([0-9一二三四五六七八九十]+?)[集话节画卷章]/),
          regMatchTwo = this.playersettings.name.match(/(OVA[0-9]*?)|(SP[0-9]*?)|(.*?PV[0-9]*?)/i);
      var copyTemp=[],currentIndex=-1;
      if(!_.isEmpty(currentPlayName) && !isNaN(currentPlayName)){
        let j=0;
        for(let i=0;i<copy.length;i++){
          currentTargetName = parseInt(getInsertedNumbers(copy[i].name) )+'';
          if(regMatch!==null && parseInt(regMatch[1])+''===currentTargetName){
            matchedURL = copy[i];
            find=true;
            j=i;
            break;
          }else if(regMatchTwo!==null && parseInt(regMatchTwo[1]+'')===currentTargetName){
            matchedURL = copy[i];
            find = true;
            j=i;
            break;
          }else if( currentPlayName === currentTargetName){
            matchedURL = copy[i];
            find=true;
            j=i;
            break;
          }
        }
        this.currentEpisodeDanmaku = copy;
      }
      if(!find){
        copy.forEach(function(v,index,arr){
          var tempIndex=-1, currentMark = 0;
          for(let i=0;i<_this.playersettings.name.length;i++){
            tempIndex=v.name.lastIndexOf(_this.playersettings.name[i]);
            if(tempIndex !== -1){
              if(currentIndex+1 === tempIndex) currentMark+=4;
              else if(currentIndex < tempIndex) currentMark+=2;
              else if(currentIndex < tempIndex) currentMark+=1;
              if(!isNaN(_this.playersettings.name[i]) ) currentMark+=2;
            }
            currentIndex = tempIndex;
          }
          copyTemp.unshift({mark:currentMark,data:v});
        });
        this.currentEpisodeDanmaku = copyTemp = _.reverse(_.sortBy(copyTemp,['mark']));
        if(copyTemp[0].mark > 56/100 * _this.playersettings.name.length*4 ){
          matchedURL = copyTemp[0].data;
        }else if(copyTemp[0].mark > 36/100 && copyTemp.length===_this.play_lists[_this.version_index].video_list.length){
          matchedURL = copyTemp[0].data;
        }else if(secondary < 3 && secondary+1 >= _this.rankedMark.length){
          var secondaryRes=await _this.getCurrentDanmu(_this.rankedMark[++secondary],secondary);
          if(secondaryRes){
            let temp=_this.rankedMark[secondary];
            for(let k=secondary;k>0;k--){
              _this.rankedMark[k]=_this.rankedMark[k-1];
            }
            _this.rankedMark[0] = temp;
          }
        }else{
          _this.footerMsg='<span style="color:#e91e63">';
          _this.footerMsg+="自动匹配弹幕失败，请手动选择或重新搜索≧ ﹏ ≦";
          _this.footerMsg+='</span>';
          _this.playersettings.danmaku = null;
          return false;
        }
      }
      if(matchedURL.hasOwnProperty('url') && !_.isEmpty(matchedURL.url)){
        if(!this.playersettings.danmaku){
          this.playersettings.danmaku={
            api:'',addition:[],
          };
        }
        if(clearAddition){
          this.playersettings.danmaku.addition = [];
          this.danmaku.addition = [];
        }
        this.playersettings.danmaku.api=matchedURL.url+'/';
        this.$refs.player.dp.pause();
        var nowseek=this.$refs.player.dp.video.currentTime;
        if(this.playersettings.isProxy)
          this.$refs.player.dp.switchVideo(this.video.quality[1], this.playersettings.danmaku, {topbar:this.video.topbar});
        else
          this.$refs.player.dp.switchVideo(this.video.quality[0], this.playersettings.danmaku, {topbar:this.video.topbar});
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.play();
        if(_this.danmaku.addition.length>0){
          let added=_this.footerMsg.lastIndexOf(`<span style="color:#00bf00"> & 弹幕集匹配:`);
          if(added>-1)
            _this.footerMsg = _this.footerMsg.substring(0,added);
          _this.footerMsg += `<span style="color:#00bf00"> & 弹幕集匹配:『${matchedURL.name}』</span>`
        }else
          _this.footerMsg = `<span style="color:#00bf00">成功匹配弹幕集:『${matchedURL.name}』</span>`;
        return matchedURL.url;
      }
    },
    lzyuserSelect:async function(url, index=-1){
      this.danmuSelectPanel.loading = true;
      this.selectTemp.danmakuEpisode = this.$options.data().selectTemp.danmakuEpisode;
      const res = await this.$http.get(url).catch(function(v){console.error(v)});
      if(typeof(res)==='undefined' || _.isEmpty(res.data)) return this.$emit('message',"请求弹幕库数据错误",'error',2);
      this.selectTemp.danmakuEpisode = res.data;
      this.selectTemp.episode_index = -1;
      this.danmuSelectPanel.loading = false;
    },
    lzyuserSelectDone(episode_danmaku_url, episode_danmaku_name){
      var _this=this;
      if(!this.playersettings || !this.playersettings.danmaku){
        this.playersettings.danmaku = {
          api:'',
          addition:[],
        };
      }
      if(!!episode_danmaku_url && _.isString(episode_danmaku_url)){
        this.playersettings.danmaku.api=episode_danmaku_url+'/';
        this.$refs.player.dp.notice("正在为您加载弹幕", 2999);
        this.$refs.player.dp.pause();
        var nowseek=this.$refs.player.dp.video.currentTime;
        if(this.playersettings.isProxy){
          _this.$refs.player.dp.switchVideo(_this.video.quality[1],_this.playersettings.danmaku, {topbar:_this.video.topbar});
        }else{
          _this.$refs.player.dp.switchVideo(_this.video.quality[0],_this.playersettings.danmaku, {topbar:_this.video.topbar});
        }
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.play();
        _this.footerMsg = `<span style="color:#eab4f8">手动选择已生效:『${episode_danmaku_name}』</span>`;
        let temp=_this.rankedMark[_this.selectTemp.danmaku_index];
        for(let k=_this.selectTemp.danmaku_index;k>0;k--){
          _this.rankedMark[k]=_this.rankedMark[k-1];
        }
        _this.rankedMark[0] = temp;
      }else if(_.isObject(episode_danmaku_url)){
        episode_danmaku_url.then(function(res){
          _this.playersettings.danmaku.api=res.data.url+'/';
          _this.$refs.player.dp.notice("正在为您加载弹幕", 2999);
          _this.$refs.player.dp.pause();
          var nowseek=_this.$refs.player.dp.video.currentTime;
          if(this.playersettings.isProxy){
            _this.$refs.player.dp.switchVideo(_this.video.quality[1],_this.playersettings.danmaku, {topbar:_this.video.topbar});
          }else{
            _this.$refs.player.dp.switchVideo(_this.video.quality[0],_this.playersettings.danmaku, {topbar:_this.video.topbar});
          }
          _this.$refs.player.dp.seek(nowseek);
          _this.$refs.player.dp.play();
          _this.footerMsg = `<span style="color:#56a6f9">手动选择已生效:『${episode_danmaku_name}』</span>`;
          let temp=_this.rankedMark[_this.selectTemp.danmaku_index];
          for(let k=_this.selectTemp.danmaku_index;k>0;k--){
            _this.rankedMark[k]=_this.rankedMark[k-1];
          }
          _this.rankedMark[0] = temp;
        })
      }else{
        this.$emit("message","数据格式有误或者操作过快");
        return false;
      }
    },
    lzyuserAdditionSelectDone:function(episode_danmaku_url, episode_danmaku_name=''){
      if(this.playersettings.danmaku.api===episode_danmaku_url) return this.$emit("message","重复选择弹幕集无效！","warning",1);
      this.danmaku.addition.push(`${episode_danmaku_url}/v3/?id=danmaku_cid`);
      this.playersettings.danmaku = this.danmaku;
      this.lzyplay(this.playersettings.url, this.playersettings.name, this.playersettings.index, true, false, false);
      this.footerMsg = `<span style="color:#56a6f9">已合并弹幕:『${episode_danmaku_name}』</span>(共合并${this.danmaku.addition.length}个)`;
    },
    firstHavePlayed:function(){
      var _this = this;
      this.userDanmakuSearch = this.title;
      
      this.lzyplaySetTempHistory(); 

      this.$emit('addAction','immerse_addAction',{key:"playerAutoFocus",once:false,action:()=>{
        if(!!_this.$refs.player) _this.$refs.player.dp.focus = true;
      }});

      this.$emit('setSearchHistory','new',this.title);
      this.$emit('setSearchHistory','storage');

      this.$emit('addAction', 'clearMsgError');
    },
    lzyplay: async function(episode_info, episode_name, episode_index, saveTime=false, version_index=false,clearAddition=true ) {
      this.playersettings.index = episode_index;
      var firstHavePlayed = false;
      if(this.onlyShowIntroduce) firstHavePlayed = true;
      this.onlyShowIntroduce = false;
      
      const res = await this.$http.get(episode_info).catch(function(e) {
      });
      if (!res || !res.hasOwnProperty('data') || !res.data || _.isEmpty(res.data) || res.data === "error") {
        this.$emit("message", "很抱歉,当前视频加载失败", "error");
        return false;
      }
      this.video = {
        quality: [
          { name: "1080P", url: res.data.raw_url, type: res.data.format },
          {name:'代理', url: res.data.proxy_url, type: res.data.format}
        ],
        defaultQuality: 0,
        
        type: "auto",

        currentPath: "",
        topbar:{
          title: episode_name,
          meta: `#${episode_index+1} / ${this.play_lists[this.version_index].video_list.length}`
        }
      };

      if(version_index!==false) this.version_index = version_index;
      this.playersettings = {
          index : episode_index,
          url: episode_info,
          danmaku :this.danmaku,
          name : episode_name,
          isProxy : this.playersettings.isProxy,
      };
      this.$refs.player.dp.play();
      if(saveTime) var nowseek=this.$refs.player.dp.video.currentTime;
      if(this.playersettings.isProxy)
        this.$refs.player.dp.switchVideo(this.video.quality[1], null, {topbar:this.video.topbar});
      else
        this.$refs.player.dp.switchVideo(this.video.quality[0], null, {topbar:this.video.topbar});
      if(saveTime){
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.notice(`已跳转至上次观看记录 ${this.lodash.getTimeByFloat(nowseek)}`,3000);
      }else{
        let havetime;
        havetime = this.lzyplaySetTempHistory(true);
        if(havetime){
          this.$refs.player.dp.seek(havetime);
          this.$refs.player.dp.notice(`已跳转至上次观看记录 ${this.lodash.getTimeByFloat(havetime)}`,3000);
          this.lzyplayerMsg.push("setHistory");
        }
        else{
          this.$refs.player.dp.seek(0);
          this.lzyGlobalCounts=0;
        }
      }
      window.document.title = episode_name+'·'+this.title+' '+this.play_lists[this.version_index].name;
      if (
        this.$route.path.substr(this.$route.path.lastIndexOf("/")) !==
        "/" + episode_name
      ) {
        this.$router.replace(this.currentPath + "/" + episode_name);
      }
      await this.getCurrentDanmu(this.rankedMark[0],0,clearAddition);
      this.$emit("addAction","userFocus");
      if(firstHavePlayed) this.firstHavePlayed();
      this.$refs.player.$el.click();
    },
    /**
     * @param previous ture时播放上一集
     * to do 修改成按id排序的下一集播放，修复逆序时下一集不正确的问题；Done! in 2021-01-09
     * 这里会出现一个获取更新上下一集不正确的bug
     **/ 
    lzyplayNext(preEpisode = false, passive=false){
      const _this = this;
      this.playersettings.isProxy = false;
      this.danmaku.addition=[];
      var currentIndex = -1, previous = -1, next = this.play_lists[this.version_index].video_list.length;
      for(let i=0;i<this.play_lists[this.version_index].video_list.length;i++){
        if(this.play_lists[this.version_index].video_list[i].id === this.playersettings.index){
          currentIndex = i;
          break;
        }
      }
      this.$refs.episodeBox.scrollTop = 36*currentIndex - ~~this.$refs.episodeBox.clientHeight*2/5;
      for(let i=0;i<this.play_lists[this.version_index].video_list.length;i++){
        if(i === currentIndex - 1){
          previous = currentIndex -1;
        }
        else if(i === currentIndex + 1){
          next = currentIndex +1;
        }
      }
      this.$nextTick(()=>{
        if(preEpisode){
          if(previous <= 0) this.$refs.player.dp.notice("已经在第一集了哦");
          else{
            this.$refs.player.dp.notice(`即将播放上一集:『${this.play_lists[this.version_index].video_list[previous].name}』`);
            return this.lzyplay(this.play_lists[this.version_index].video_list[previous].info, this.play_lists[this.version_index].video_list[previous].name, this.play_lists[this.version_index].video_list[previous].id , false);
          }
          return false;
        }
        if(this.play_lists[this.version_index].video_list.length <= next) this.$refs.player.dp.notice("已经是最终P了哦，将循环播放");
        else{
          if(!passive){
            this.$refs.player.dp.notice(`即将播放下一集:『${this.play_lists[this.version_index].video_list[next].name}』`);
            return _this.lzyplay(_this.play_lists[_this.version_index].video_list[next].info , _this.play_lists[_this.version_index].video_list[next].name, _this.play_lists[_this.version_index].video_list[next].id, false);
          }
          /**
           * 高能notice调用
           * 带上倒计时321，带上取消按钮，和默认事件
           **/ 
          let notice_countDown=3;
          let noticeMessage = `即将播放下一集:『${_this.play_lists[_this.version_index].video_list[next].name}』<span style="color:#21acff">(${notice_countDown}s)</span>`;
          let intervalHandler = 0;
          this.$refs.player.dp.notice(noticeMessage,3100,{
            action:function(container){
              let temp = ()=>{
                notice_countDown--;
                noticeMessage = `即将播放下一集:『${_this.play_lists[_this.version_index].video_list[next].name}』<span style="color:#21acff">(${notice_countDown}s)</span>`;
                container.innerHTML = noticeMessage;
                if(notice_countDown <= 0){
                  _this.lzyplay(_this.play_lists[_this.version_index].video_list[next].info , _this.play_lists[_this.version_index].video_list[next].name, _this.play_lists[_this.version_index].video_list[next].id, false);
                }
              }
              intervalHandler = setTimeout(temp, 1000);
              intervalHandler = setTimeout(temp, 2000);
              intervalHandler = setTimeout(temp, 3000);
            },
            cancel:()=>{
              clearInterval(intervalHandler);
            },
          });
          return true;
        }
        return false;
      });
      
    },
    lzyResponse: _.throttle(function(){
      const MaxRepeat = 5;
      if(!this.$refs.player || this.lzyGlobalCounts < -MaxRepeat) return false;
      this.lzyplayerMsg = this.lzyplayerMsg.filter((ele, index, arr)=>{
        if(ele === 'setHistory') return false;
        return true;
      });
      var nowseek=this.$refs.player.dp.video.currentTime;
      if(nowseek && nowseek > 0){
        if(this.playersettings.isProxy){
          this.$refs.player.dp.switchVideo(this.video.quality[1],this.playersettings.danmaku, {topbar:this.video.topbar});
        }else{
          this.$refs.player.dp.switchVideo(this.video.quality[0],this.playersettings.danmaku, {topbar:this.video.topbar});
        }
        this.$refs.player.dp.play();
      }
      if(!this.playersettings.isProxy){
        this.lzyGlobalCounts = -1;
        this.$emit('message','播放失败,正在尝试切换代理路线','info',2);
      }else if(this.lzyGlobalCounts<-4){
        this.$emit('message','非常抱歉,资源已经失效过期,请刷新或搜索重试≧﹏≦','error', 2 ,-1);
      }else{
        this.$emit('message','出错啦!正重新加载视频ing','error');
      }
      this.lzyGlobalCounts--;
      this.$refs.player.dp.notice("正在切换到代理路线",3000);
      this.$refs.player.dp.switchVideo(this.video.quality[1], this.playersettings.danmaku, {topbar:this.video.topbar});
      this.playersettings.isProxy = true;
      this.$refs.player.dp.play();
    }, 6999),
    lzyFullScreen(fullscreen){

    },
    lzyplayerSets(setSettings=null){
      
      this.lzyplayer_settingStorage.lazySet('autoNext',this.lzyplayerSettings.autoNext);
      if(!setSettings) return false;
      !!this.wideplayMode ? (document.getElementById("lzyplayer").style.width = "88%",this.$refs.player.dp.container.classList.add("dplayer-screen-widen")) : (document.getElementById("lzyplayer").style.width = "800px",this.$refs.player.dp.container.classList.remove("dplayer-screen-widen") );
    },
    lzyStorageHistory(){
      this.historyStorage.lazySave();
    },
    lzyplaySetTempHistory(getMode=false, manual=false){
      let temp,find=false;
      
      for(var i=0;i<this.lzyplayHistory.historylist.length;i++){
        if(this.lzyplayHistory.historylist[i].name === this.title){
          if(getMode){
            if(this.lzyplayHistory.historylist[i].episode===this.playersettings.name)
              return !!manual? i: this.lzyplayHistory.historylist[i].currentTime;
            else
              return !!manual? i: false;
          }
          find=true;
          if(!this.playersettings.name || !this.$refs.player.dp.video.currentTime) break;
          this.lzyplayHistory.historylist[i].episode = !!manual? manual.episode: this.playersettings.name;
          this.lzyplayHistory.historylist[i].currentTime = !!manual? manual.time: this.$refs.player.dp.video.currentTime;
          this.lzyplayHistory.historylist[i].engine = !!manual? manual.engine: this.play_lists[this.version_index].engine?this.play_lists[this.version_index].engine:'unknow';
          this.lzyplayHistory.historylist[i].version = !!manual? manual.versionName: this.play_lists[this.version_index].name;
          this.lzyplayHistory.historylist[i].date = (!!manual&&manual.date) ? manual.date: dateFormatter('y-M-d h:m:s', new Date());
          const currentPathValid = this.$route.path.indexOf('/details/');
          if(currentPathValid>-1)
            this.lzyplayHistory.historylist[i].url = (!!manual&&manual.url) ? manual.url : this.$route.path.substr(currentPathValid);
          
          if(i===0) break;
          let temp = this.lzyplayHistory.historylist[i];
          for(let l = i; l>0; l--){
            this.lzyplayHistory.historylist[l] = this.lzyplayHistory.historylist[l-1];
          }
          this.lzyplayHistory.historylist[0] = temp;
          break;
        }
      }
      if(!find){
        if(getMode || !this.playersettings.name ) return false;
        this.lzyplayHistory.historylist.unshift({
          name:this.title,
          episode:this.playersettings.name,
          currentTime:!!manual? manual.time: this.$refs.player.dp.video.currentTime, 
          engine:!!manual? manual.engine: "unkown", 
          version:this.version_index ,
          date: dateFormatter('y-M-d h:m:s', new Date()),
          url: this.$route.path.substr(this.$route.path.indexOf('/details/')),
        });
      }
      function dateFormatter(fmt, date) {
        var o = {
            "y+": date.getFullYear(),
            "M+": (date.getMonth() + 1).toString().length>1 ? (date.getMonth() + 1).toString() : '0'+(date.getMonth() + 1), //月份
            "d+": date.getDate().toString().length>1 ? date.getDate().toString() : '0'+date.getDate(), //日
            "h+": date.getHours().toString().length>1 ? date.getHours().toString() : '0'+date.getHours(), //小时
            "m+": date.getMinutes().toString().length>1 ? date.getMinutes().toString() : '0'+date.getMinutes(), //分
            "s+": date.getSeconds().toString().length>1 ? date.getSeconds().toString() : '0'+date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
      }
      if(this.lzyplayHistory.historylist.length>32)
        this.lzyplayHistory.historylist.pop();
      return true;
    },
  },
  computed:{
  },
  created: function() {
    const _this = this;
    try{
      this.historyStorage = new this.$magic.lzystorage('lzyplay-history', _this.lzyplayHistory);
      this.historyStorage.load();

      this.lzyplayer_settingStorage = new this.$magic.lzystorage("lzyplayer-settings", _this.lzyplayerSettings);
      this.lzyplayer_settingStorage.load();
      messageRegister();
    }catch(error){
    }
    this.getDetail();

    function messageRegister(){
      _this.$magic.actionQueue.register(
        {
          message: "storageSettings",
          once: true,
          actions: ()=>{_this.lzyplayerSets("playHistory")},
        },{
          message: "setHistory",
          once: true,
          actions: ()=>{
            if(typeof this.$refs.player ==='undefined') return;
            if(this.lzyplaySetTempHistory())
              _this.lzyplayerMsg.push("setHistory");
          }
        },{
          message: "storageHistory",
          once: true,
          action: ()=>{
            _this.lzyStorageHistory();
          }
        },{
          message: "loadHistory",
          once: true,
          action: ()=>{
            _this.lzyplayer_settingStorage.load();
          }
        }
      );
      _this.$magic.actionQueue.addHook("immersing_addHook",
        {
          hook:"basic",
          action:()=>{
            if(typeof _this.$refs.player ==='undefined'){return false;}
            if(_this.lzyGlobalCounts<0) return false;
            _this.lzyGlobalCounts++;
            if(_this.lzyGlobalCounts%12==0){
              _this.lzyplayerMsg.push("setHistory");
              _this.lzyGlobalCounts=0;
            }else if(_this.lzyGlobalCounts%2==0){
              _this.lzyStorageHistory();
            }
          }
        }
      );
    }
  },
  mounted() {
    const _this=this;
    this.$refs.player.dp.on("ended",function(){
      if(_this.lzyplayerSettings.autoNext){
          _this.lzyplayNext(false, true);
      }
      _this.lzyplayer_settingStorage.save();
    });
  },
  destroyed(){
    window.document.title='AnimeSearcher';
    this.$emit('addAction','immerse_removeAction',"playerAutoFocus");
    this.$emit('addAction','clearMsgAll');
  }
};
</script>

<style scoped>

.player-head{
  margin:7px auto 10px 12px;
  color:#21acff;
}
.player-head span{
  color: black;
}
.player-head span::before{
  content:'·';
  color: #000;
  font-size: 18px;
  display: inline-block;
  margin: auto 5px;
}
.lzyplayerFooter{
  display: flex;
  justify-content: space-around;
  align-items: baseline;

  padding:0 0 0 6px;
  font-size: 12px;
  background-color: #fff;
  user-select: none;
}
.lzyplayerFooter *{display: inline-block;vertical-align: middle;}
.lzyplayerFooter span{color:#000;}
.lzyplayerFooter span .lzyplayerMsg{
  display: inline-block;
  padding-top: 3px; padding-left: 8px;
  height: 28px;
  width: 288px;
  font-size: 12px;
  border:1px solid #ecf2f9;
  border-radius: 4px;
  background-color: #ecf2f9;
  box-shadow: 0px 0px 1px gray;
  overflow:hidden;
  overflow: -moz-hidden-unscrollable;
}
.lzyplayerFooter span .lzyplayerMsg .rollBar{
  overflow: visible;
  width: max-content;
}
.lzyplayerFooter span .lzyplayerMsg:hover .rollBar{
  animation: lzyXTransform 6s cubic-bezier(.3,.19,.73,1.21) infinite;
}

.lzyselectDanmaku{
  position: fixed;
  top: 50%;  left: 50%;
  transform: translate(-50%,-50%);
  width:336px;
  opacity: .95;
  z-index: 9;
}
.lzydanmaku-list{
  overflow-y: scroll;
  font-size: 14px;
}
.lzydanmaku-list ul{
  margin: 0;padding:8px 5px;
}
.lzydanmaku-list ul li{margin-bottom:6px;list-style: none;cursor: pointer;}
.lzydanmaku-list ul li:hover{background: lightblue;}
.lzydanmaku-list ul li code{
  background:#4b4b4b;color:rgb(255, 226, 70);
  user-select: none;
  -webkit-user-select: none;
}
.lzydanmaku-list ul li span:last-child{
  color:#21acff;
  user-select: none;
  -webkit-user-select: none;
}


.episodeContainer{
  overflow-y: scroll;
  max-height: 145px;
}
.episodeBtn{float: left;margin:6px 8px;}
.episodeBtn button{font-weight: 600;}
.section-module{
  position: relative;
  background-color: #f4f4f4;
  border-radius: 2px;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 300px;
  user-select: none;
}
.section-title{
  padding: 0 16px;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  color: #212121;
  font-weight: 400;
  border-bottom: 1px dashed gray;
}
.section-title i{
  text-indent: .4em!important;
}
.section-wrap{
  position: relative;
  padding: 10px 6px 18px;
  display: block;
  overflow: auto;
  max-height: 390px;
  box-sizing: content-box;
}
.section-wrap ul{
  box-sizing: border-box;
  position: relative;
  margin-bottom: 12px;
}
.section-wrap ul li{
  position: absolute;
  left:0;right:0;
  display: block;
  height: 30px;
  border-radius: 2px;
  padding: 6px 0 0 10px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-transition: background-color .3s ease;
  -o-transition: background-color .3s ease;
  transition: background-color .3s ease;
  color: #222;
  font-size: 12px;
  cursor: pointer;
  list-style: none;
}
.section-wrap ul li:hover{
  background:#fff;
}

#lzyplayer {
  margin: 5px auto 46px;
  width: 800px;
  border: 1px solid gray;
  box-shadow: 2px 3px 10px black;
  z-index:12;
}
.episodeVer {
  margin: 46px auto;
}
.lzytitle {
  display: inline-block;
  margin-bottom: 36px;
  margin-top: 20px;
}
.description {
  font-size: 12px;
  color: #99a2aa;
}
.description::before {
  content: "简介：";
  display: inline-block;
  font-size: 14px;
  margin-right: 5px;
  font-weight: 600;
  color: #21acff;
}
.cover-box {
  border: 1px solid gray;
  border-radius: 7px;
}
.comic-cover {
  box-shadow: 2px 3px 7px black;
  border-radius: 8px;
}
@keyframes lzyXTransform {
  0%,100%{
    transform: translateX(0);
  }
  50%{transform: translateX(calc(272px - 100%));}
}
</style>

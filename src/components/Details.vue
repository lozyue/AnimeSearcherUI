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
                @lzyplay_hotkeyToggle="lzyplayNext"
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
                      @click="lzyplay(playersettings.url,playersettings.proxy_url,playersettings.name, playersettings.index,true,false,false)"
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
                        icon @click="showSelect=true,showAdditionSelect=false, selectTemp={danmakuEpisode:currentEpisodeDanmaku,danmaku_index:0,episode_index:-1}"
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
                        showAdditionSelect=showSelect=true"
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
                    v-model="autoNext"
                    @click="lzyplayerSets()"
                  ></v-switch>
                </span>
              </div>
              <v-stepper light v-show="showSelect" class="lzyselectDanmaku" v-model="onstep">
                <v-stepper-header>
                  <v-stepper-step  editable :complete="onstep > 1" step="1">
                    <span :style="showAdditionSelect?'color:#ff414d':''">{{!showAdditionSelect?"选择弹幕源":"选择外挂弹幕源"}}</span></v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="onstep > 2" step="2">当前集弹幕</v-stepper-step>
                  <v-divider></v-divider>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                      class="mb-6 lzydanmaku-list"
                      color="#fff0d5"
                      height="300px"
                    >
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
                          <code class="ml-2">{{item.data.danmaku.substr(item.data.danmaku.lastIndexOf('.')+1,item.data.danmaku.length)}}</code>
                          <span class="ml-2">Mark:{{item.mark}}</span>
                        </li>
                      </ul>
                    </v-card>
                    <v-btn class="white--text" 
                      :disabled="!rankedMark.length"
                      :color="showAdditionSelect?'#d7385e':'primary'" small
                      @click="onstep = 2,lzyuserSelect(rankedMark[selectTemp.danmaku_index].data.url)"
                    >Continue</v-btn>
                    <v-btn small text style="float:right" @click="showSelect=false">Close</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="2">
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
                      :color="showAdditionSelect?'#d7385e':'primary'" light small
                      @click="(showAdditionSelect?lzyuserAdditionSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url,selectTemp.danmakuEpisode[selectTemp.episode_index].name):lzyuserSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url, selectTemp.danmakuEpisode[selectTemp.episode_index].name)),showSelect=false"
                    >Done</v-btn></span>
                    <span><v-btn small text style="float:right" @click="showSelect=showAdditionSelect=false">Close</v-btn></span>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </div>
          <div v-show="!wideplayMode" transition="scroll-x-transition" class="lzytransparent section-module">
            <div class="section-title"><span>选集</span><v-icon color="#00a1d6">mdi-playlist-play</v-icon>
              <span @click="haveSorted>1?haveSorted=0:haveSorted++, haveSorted===1 ? play_lists[version_index].video_list=lodash.sortBy(play_lists[version_index].video_list, ['name']) : haveSorted===2? lodash.reverse(play_lists[version_index].video_list) :play_lists[version_index].video_list=lodash.sortBy(play_lists[version_index].video_list,['id'])" style="float:right;cursor:pointer">
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
                <li :style="play.id===playersettings.index?'background-color:#fff;color:#21acff;'+'top:'+36*index+'px':'top:'+36*index+'px'" @click="lzyplay(play.url,play.proxy_url,play.name,play.id,false),($refs.episodeBox.scrollTop=36*index - ~~$refs.episodeBox.clientHeight*2/5)" v-for="(play,index) in play_lists[version_index].video_list" :key="index">
                  <span v-if="play.id===playersettings.index">
                    <v-icon color="#00a1d6" style="display:inline-block;margin-top:-5px;">mdi-play</v-icon>
                  </span>
                  <span v-if="isNaN(play.name)">{{play.name}}</span><span v-else>{{'『 '+play.name+" 番目』"}}</span>
                </li>
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
              <!-- <v-virtual-scroll
                bench="4"
                :items="data.video_list"
                height="160"
                item-height="64"
              > -->
              <div class="episodeBtn" v-for="(play, num) in data.video_list" :key="num">
                <v-btn class="pa-2"
                  :style="index===version_index && play.id===playersettings.index?'background-color:rgb(247,178,202)!important;':''"
                  @click="(!onlyShowIntroduce?($refs.episodeBox.scrollTop=36*play.id - ~~$refs.episodeBox.clientHeight*2/5):lodash.timer(function(){$refs.episodeBox.scrollTop=36*play.id - ~~$refs.episodeBox.clientHeight*2/5})),$vuetify.goTo(-200,{offset:100,duration:256,easing:'easeInOutCubic'}), lzyplay(play.url,play.proxy_url,play.name,play.id,false,index)"
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
import VueDPlayer from "./vue-dplayer-raw.vue";
import _ from 'lodash';

export default {
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
      simplecopy:function(v){return JSON.parse(JSON.stringify(v))},
    },
    lzyplayerMsg:[],
    lzyplayHistory:[],
    lzyGlobalCounts:0,

    onlyShowIntroduce: true, // 没有开始播放的标志
    title: "",
    cover: "",
    category: "",
    description: "",
    play_lists: [{name:'',video_list:[]}],
    
    version_index: 0, // 当前动漫的路线（动漫番目） 
    mytestStr: "",
    userDanmakuSearch: "",// 用户自定义弹幕搜索
    
    rankedMark:[{mark:0,data:{danmaku:'',title:'弹幕库为空',url:''}}], // 排序过的弹幕库
    currentEpisodeDanmaku:[{mark:0,data:{name:'弹幕集为空'}}], // 匹配当前选定弹幕集的array

    footerMsg:'弹幕未加载,手动选择试试~',
    playersettings: {
      index:-1,
      url: "",
      proxy_url:'',
      name: '',
      danmaku: {
        id:"danmaku_cid",
        api:'',
        addition:[] // 额外外挂弹幕
      },
      picture: "",
      isProxy: false,
    },
    video: {
      quality: [
        { name: "1080P",url: ""},
        { name: '代理', url: ''},
      ],
      pic: "",
      defaultQuality: 0,
      type: "auto"
    },
    danmaku:{
      id:"danmaku_cid",
      api:'',
      addition:[] // 额外外挂弹幕
    },
    lzyplayerUI:{
      theme:"#ffa3df", // 粉色
      lang: "zh-cn",
      logo: false,// logo: logoImg,
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
    autoNext: false,
    wideplayMode: false, // 宽屏播放模式 [增加宽屏播放 in v1.0.1]
    showSelect: false,
    showAdditionSelect: false,
    haveSorted: 0,
    selectTemp:{
      danmaku_index:0,
      danmakuEpisode:[{mark:0,data:{name:''}}],
      episode_index:0,
    },
    onstep:1,
    player: null,
  }),
  methods: {
    getDetail: async function(searchName = '') {
      var id;
      if(!searchName) id = this.$route.params.param;
      else id = searchName;
      const res = await this.$http.get("/detail/" + id).catch(function(e) {
      });
      if (typeof(res)==='undefined' || res.status != 200 || res.status.data === "error") {
        this.$emit("message", "加载视频出错了", "info");
        return false;
      }
      this.cover = res.data.cover;
      this.description = res.data.description.replace(/&nbsp;/g, " ");
      this.title = res.data.title;
      this.category = res.data.category;
      this.cover = res.data.cover_url;
      var templist = res.data.play_lists;
      templist.forEach(function(list,index,arr){
        var res=list.video_list; // 由于很多标题格式混乱，使用默认排序
        arr[index].video_list = res;
      });
      if(!_.isEmpty(templist)){
        templist.forEach(function(eachList,i,a){
          a[i].video_list.forEach(function(v,index,arr){
            arr[index]['id'] = index; // 挂载引索为Id属性
          });
        })
        this.play_lists = templist;
      }else{
        this.$emit('message',"视频详情获取失败！",'error',2);
      }
      var lastSlash = this.$route.path.substr(9).lastIndexOf("/");
      if (lastSlash === -1) {
        this.currentPath = this.$route.path;
      } else {
        this.currentPath = this.$route.path.substr(0, 9 + lastSlash);
      }

      this.get_danmaku(); // 异步加载需要接续进行, 不用await
      this.lzyplayerActions(false);
      this.$emit("addAction","userFocus");
      
      /**
       * 查找匹配的观看历史记录
       */
      var temp,_this = this,
          currentHistoryIndex = this.lzyplaySetTempHistory(true,true); // 找到对应当前的历史记录所在引索,未找到返回false
      var versionMatched = 0, haveMatched =false ; // 恢复历史查找，j:最匹配标题,k:最匹配路线名称
      function versionMatchWether(historyVersion){
        for(let i=0;i<_this.play_lists.length;i++){
          if(historyVersion === _this.play_lists[i].name ) return i;
        }
        return false;
      }

      if(currentHistoryIndex === false){
      }else{
        for(let j=this.play_lists.length-1;j>=0;j--){
          if((versionMatched = versionMatchWether(this.lzyplayHistory[currentHistoryIndex].version) )!==false){
            break;
          }
        }
        let firstSearchFind=true;
        if(versionMatched===false) versionMatched = this.play_lists.length-1, firstSearchFind = false; // 找不到匹配线路，当场寻找
        for(;versionMatched>=0;versionMatched--){
          for(let episode=0;episode<this.play_lists[versionMatched].video_list.length;episode++){
            
            if(this.play_lists[versionMatched].video_list[episode].name === this.lzyplayHistory[currentHistoryIndex].episode){
              this.$emit('message',`上次观看『<span style="color:#eaf;cursor:pointer;font-weight:bold;">${this.lzyplayHistory[currentHistoryIndex].episode}</span>』至 <span style="color:#eaf;cursor:pointer;font-weight:bold;">${this.lodash.getTimeByFloat(this.lzyplayHistory[currentHistoryIndex].currentTime)}</span>`,'info',3,0,function(){
                if(!_this.$refs.player) return false;// 切换到别的页面去了
                _this.lzyplay(_this.play_lists[versionMatched].video_list[episode].url, _this.play_lists[versionMatched].video_list[episode].proxy_url, _this.play_lists[versionMatched].video_list[episode].name, episode, false, versionMatched);
                _this.$refs.episodeBox.scrollTop=36*episode - ~~_this.$refs.episodeBox.clientHeight*2/5;
              });
              haveMatched = true;
              break;
            }
          } // inner for loop End.
          if(haveMatched) break;
          if(firstSearchFind) versionMatched = this.play_lists.length-1,firstSearchFind = false;
        }
      }
      
    },
    get_danmaku:async function(searchName){
      var danmakuName;
      if(!searchName) danmakuName = _.trim(this.title);
      else danmakuName=searchName;
      const res = await this.$http.get('/danmaku/search/'+ danmakuName).catch(function(e){console.log(e)});
      if(typeof(res)==="undefined" || _.isEmpty(res.data)){
        this.footerMsg = '<span style="color:pink">当前弹幕库为空或者加载弹幕库失败，请尝试修改弹幕搜索词后卡点重载试试</span>';
         this.rankedMark=[];
        return this.$emit('message','当前弹幕库为空或加载弹幕库失败！','error',2);
      }
      var temp=res.data,_this=this;
      var //chunkTitle=this.title.split(''), 
          mark = [], //拿id和对应分数做标记，高分的优先{id:i,mark:0,data:{}}
          currentIndex=-1; // 标记当前找到的title字符的位置，用于判断加上权值
      temp.forEach(function(v,index,arr){
        var tempIndex=-1, currentMark=0;
        for(let i=0;i<_this.title.length;i++){ // 应该对当前标题迭代排序每个弹幕库title,次序相同保证公正
          tempIndex=v.title.lastIndexOf(_this.title[i]); //本来搜索就是向右，为避免重复词的前段查找，当然使用右边开始搜索的模式。 
          if(tempIndex!==-1){// 找到标记后记录引索值 并加分;
            if(currentIndex+1===tempIndex) currentMark+=4; // 连续的话得4
            else if(currentIndex<tempIndex) currentMark+=2; // 引索值比前一个大得2分
            else if(currentIndex<tempIndex) currentMark+=1; // 小于得一分
            currentIndex=tempIndex;
          }
        }
        if(v.num+''===_this.play_lists[_this.version_index].video_list.length+''){
          currentMark += ~~( (Math.log(_this.play_lists[_this.version_index].video_list.length)+1) * (_this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length)) );
        }else{
          currentMark += _this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length);
        }
        currentMark += ~~((_this.title.length-Math.abs(v.title.length-_this.title.length)*Math.log(_this.play_lists[_this.version_index].video_list.length+1)) );
        if(v.danmaku.lastIndexOf('bilibili')!=-1){
          currentMark += ~~(Math.abs(currentMark)/24)+1;
        }
        mark.unshift({ mark:currentMark, id:index, data:arr[index]}); // 记录总得分,重复保存数据为了方便。
      });
      var rankedMark = _.reverse(_.sortBy(mark, ['mark']) );
      _this.rankedMark = rankedMark;
      if(_this.footerMsg.indexOf('匹配弹幕失败')+1 + _this.footerMsg.indexOf("弹幕未加载")+1 > 0 ){
        await _this.getCurrentDanmu(rankedMark[0] ,0 ,true);
      }
    },
    getCurrentDanmu:async function(rankedDanmaku, secondary=0, clearAddition=true){
      const _this=this;
      function getInsertedNumbers(mixedStr){
        var result = '';
        mixedStr=mixedStr.replace(/\s/g,''); // 删除空格
        for(let i=0;i<mixedStr.length;i++){
          if( !isNaN(mixedStr[i]) ) result+=mixedStr[i];// 是数字就加上去
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
          this.footerMsg+=`，正在获取第${secondary+1}个弹幕源……`; // 第一次失败
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
        this.footerMsg='获取的弹幕格式不正确';
      }
      var find=false, currentPlayName = ''+parseInt(getInsertedNumbers(this.playersettings.name) ), currentTargetName, regMatch = this.playersettings.name.match(/第([0-9]+?)[集话卷章]/); // 仅正则匹配一次
      var copyTemp=[],currentIndex=-1;
      if(!_.isEmpty(currentPlayName) && !isNaN(currentPlayName)){
        let j=0;
        for(let i=0;i<copy.length;i++){
          currentTargetName = parseInt(getInsertedNumbers(copy[i].name) )+'';
          if( currentPlayName === currentTargetName){
            matchedURL = copy[i];
            find=true;
            j=i;
            break;
          }else if(regMatch!==null && parseInt(regMatch[1])+''===currentTargetName){
            matchedURL = copy[i];
            find=true;
            j=i;
            break;
          }
        }
        this.currentEpisodeDanmaku = copy;
      }
      if(!find){ // 当前集数名为字符或 字符加数字的情况 相似匹配
        copy.forEach(function(v,index,arr){
          var tempIndex=-1, currentMark = 0;
          for(let i=0;i<_this.playersettings.name.length;i++){
            tempIndex=v.name.lastIndexOf(_this.playersettings.name[i]);
            if(tempIndex!==-1){
              if(currentIndex+1===tempIndex) currentMark+=4;
              else if(currentIndex<tempIndex) currentMark+=2;
              else if(currentIndex<tempIndex) currentMark+=1;
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
        this.$refs.player.dp.switchVideo(this.video.quality[0],this.playersettings.danmaku);
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
      const res = await this.$http.get(url).catch(function(v){console.error(v)});
      if(typeof(res)==='undefined' || _.isEmpty(res.data)) return this.$emit('message',"请求弹幕库数据错误",'error',2);
      this.selectTemp.danmakuEpisode = res.data;
      this.selectTemp.episode_index = -1;
    },
    lzyuserSelectDone(episode_danmaku_url, episode_danmaku_name){
      var _this=this;
      if(!this.playersettings.danmaku){
        this.playersettings.danmaku = {
          api:'',
          addition:[],
        };
      }
      if(!_.isEmpty(episode_danmaku_url) && _.isString(episode_danmaku_url)){
        this.playersettings.danmaku.api=episode_danmaku_url+'/';
        this.$refs.player.dp.notice("正在为您加载弹幕", 2999);
        this.$refs.player.dp.pause();
        var nowseek=this.$refs.player.dp.video.currentTime;
        if(this.playersettings.isProxy){
          _this.$refs.player.dp.switchVideo(_this.video.quality[1],_this.playersettings.danmaku);
        }else{
          _this.$refs.player.dp.switchVideo(_this.video.quality[0],_this.playersettings.danmaku);
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
            _this.$refs.player.dp.switchVideo(_this.video.quality[1],_this.playersettings.danmaku);
          }else{
            _this.$refs.player.dp.switchVideo(_this.video.quality[0],_this.playersettings.danmaku);
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
      this.lzyplay(this.playersettings.url,this.playersettings.proxy_url,this.playersettings.name, this.playersettings.index,true,false, false);
      this.footerMsg = `<span style="color:#56a6f9">已合并弹幕:『${episode_danmaku_name}』</span>(共合并${this.danmaku.addition.length}个)`;
    },
    firstHavePlayed:function(){
      var _this = this;
      this.userDanmakuSearch = this.title; // 如果是第一次点击 保存当前弹幕库搜索词
      this.$emit('addAction','immerseAction',function(){
        _this.$refs.player.dp.focus = true;
      }); // 加入自动聚焦事件
      this.$emit('addAction', 'clearMsgError'); // 清除消息条显示
    },
    lzyplay: async function(episode_url, episode_proxy_url,  episode_name, episode_index, saveTime=false, version_index=false,clearAddition=true ) {
      this.playersettings.index = episode_index; // 优先更新
      var firstHavePlayed = false;
      if(this.onlyShowIntroduce) firstHavePlayed = true;
      this.onlyShowIntroduce = false;
      const res = await this.$http.get(episode_url).catch(function(e) {
      });
      if (!res.hasOwnProperty("data") || !res.data || res.data === "error") {
        this.$emit("message", "很抱歉,当前视频加载失败", "error");
        return false;
      }
      this.video = {
        quality: [{ name: "1080P", url: res.data },{name:'代理', url: episode_proxy_url}],
        defaultQuality: 0,
        type: "auto",
        currentPath: ""
      };

      if(version_index!==false) this.version_index = version_index;
      this.playersettings = {
          index : episode_index,
          url : episode_url,
          proxy_url: episode_proxy_url,
          danmaku :this.danmaku, // 弹幕设置
          name : episode_name,
          isProxy : this.playersettings.isProxy,
      };
      this.$refs.player.dp.play();
      if(saveTime) var nowseek=this.$refs.player.dp.video.currentTime;
      if(this.playersettings.isProxy)
        this.$refs.player.dp.switchVideo(this.video.quality[1]);
      else
        this.$refs.player.dp.switchVideo(this.video.quality[0]); // 仅加载视频，暂不加载弹幕
      if(saveTime){
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.notice(`已跳转至上次观看记录 ${this.lodash.getTimeByFloat(nowseek)}`,3000);
      }else{
        let havetime;
        havetime = this.lzyplaySetTempHistory(true);
        if(havetime){
          this.$refs.player.dp.seek(havetime);
          this.$refs.player.dp.notice(`已跳转至上次观看记录 ${this.lodash.getTimeByFloat(havetime)}`,3000);
          this.lzyplayerMsg.push("setHistory"); // 匹配到上次观看历史立即更新记录
        }
        else{
          this.$refs.player.dp.seek(0);
          this.lzyGlobalCounts=0; // 看到番目（集）与上次不同，重置计时器，一分钟后记录进度
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
    lzyplayNext(preEpisode = false){
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
            return this.lzyplay(this.play_lists[this.version_index].video_list[previous].url, this.play_lists[this.version_index].video_list[previous].proxy_url, this.play_lists[this.version_index].video_list[previous].name, this.play_lists[this.version_index].video_list[previous].id , false);
          }
          return false;
        }
        if(this.play_lists[this.version_index].video_list.length <= next) this.$refs.player.dp.notice("已经是最终P了哦，将循环播放");
        else{
          this.$refs.player.dp.notice(`即将播放下一集:『${this.play_lists[this.version_index].video_list[next].name}』`);
          return this.lzyplay(this.play_lists[this.version_index].video_list[next].url, this.play_lists[this.version_index].video_list[next].proxy_url, this.play_lists[this.version_index].video_list[next].name, this.play_lists[this.version_index].video_list[next].id, false);
        }
        return false;
      });
      
    },
    lzyResponse: _.throttle(function(){
      var nowseek=this.$refs.player.dp.video.currentTime;
      if(nowseek && nowseek > 0){
        this.$emit("message","出错啦！正重新加载视频ing","error",2);
        if(this.playersettings.isProxy){
          this.$refs.player.dp.switchVideo(this.video.quality[1],this.playersettings.danmaku);
        return true;
        }else{
          this.$refs.player.dp.switchVideo(this.video.quality[0],this.playersettings.danmaku);
        }
        this.$refs.player.dp.play();
        return true;
      }
      if(!this.playersettings.isProxy)
        this.$emit('message','播放失败，正在切换到代理路线','error',2);
      else
        this.$emit('message','播放失败，请检查网络并刷新或者重新搜索试试','error');
      this.$refs.player.dp.notice("正在切换到代理路线",3000);
      this.$refs.player.dp.switchVideo(this.video.quality[1]);
      this.playersettings.isProxy = true;
      this.$refs.player.dp.play();
    }, 6999),
    lzyFullScreen(fullscreen){

    },
    lzyplayerSets(setSettings=null){
      this.$emit("lzyglobalSettings","lzyplaysettings","lazySet",{autoNext:this.autoNext,});
      if(!setSettings) return false;
      !!this.wideplayMode ? (document.getElementById("lzyplayer").style.width = "88%",this.$refs.player.dp.container.classList.add("dplayer-screen-widen")) : (document.getElementById("lzyplayer").style.width = "800px",this.$refs.player.dp.container.classList.remove("dplayer-screen-widen") ); // 此处设置应该与CSS中保持一致
    },
    lzyReadPlayerSets(readKey = "lzyplaysettings",rtKey=null){
      let rtValue = null;
      this.$emit("lzyglobalSettings",readKey,"read",null,val => { rtValue = val });
      if(!!rtKey) return rtValue[rtKey];
      return rtValue;
    },
    lzyStorageHistory(){
      this.$emit("lzyglobalSettings","playHistory","lazySet",JSON.stringify(this.lzyplayHistory));
    },
    /**
     * 记录观看点历史 和 匹配check并观看时间点记录!!! 包括`lzyStorageHistory`保存方法； 
     * getMode下设置返回记录时间点，否则为记录历史模式；
     * manual:为true时返回匹配的引索，默认用于获取匹配到的历史进度点,
     *        而在记录模式 (getMode=true) 可用于手动设置历史，格式为{episode:str, time: int, versionName:str, date:dateFormat,engine:str}
     */
     
    lzyplaySetTempHistory(getMode=false, manual=false){
      let temp,find=false; // 找到对应当前的历史记录
      
      for(var i=0;i<this.lzyplayHistory.length;i++){
        if(this.lzyplayHistory[i].name === this.title){
          if(getMode){
            if(this.lzyplayHistory[i].episode===this.playersettings.name)
              return !!manual? i: this.lzyplayHistory[i].currentTime;
            else // 不是匹配的历史观看的番目，返回匹配引索 
              return !!manual? i: false;
          }
          find=true;
          if(!this.playersettings.name || !this.$refs.player.dp.video.currentTime) break;
          this.lzyplayHistory[i].episode = !!manual? manual.episode: this.playersettings.name; // 保存集数
          this.lzyplayHistory[i].currentTime = !!manual? manual.time: this.$refs.player.dp.video.currentTime; // 保存观看进度
          this.lzyplayHistory[i].engine = !!manual? manual.engine: this.play_lists[this.version_index].engine?this.play_lists[this.version_index].engine:'unknow'; // 保存跳转过来的引擎
          this.lzyplayHistory[i].version = !!manual? manual.versionName: this.play_lists[this.version_index].name; // 保存观看的线路名称
          this.lzyplayHistory[i].date = (!!manual&&manual.date) ? manual.date: dateFormatter('y-M-d h:m:s', new Date());// 保存观看时间点
          const currentPathValid = this.$route.path.indexOf('/details/');
          if(currentPathValid>-1)
            this.lzyplayHistory[i].url = (!!manual&&manual.url) ? manual.url : this.$route.path.substr(currentPathValid);
          if(i===0) break;
          temp = this.lzyplayHistory[0]; 
          this.lzyplayHistory[0]=this.lzyplayHistory[i];
          this.lzyplayHistory[i]=temp;
          break;
        }
      }
      if(!find){
        if(getMode || !this.playersettings.name ) return false; // 增加加载出错时，保存无效空历史记录的检查
        this.lzyplayHistory.unshift({
          name:this.title,
          episode:this.playersettings.name,
          currentTime:!!manual? manual.time: this.$refs.player.dp.video.currentTime, 
          engine:!!manual? manual.engine: "unkown", 
          version:this.version_index ,
          date: dateFormatter('y-M-d h:m:s', new Date()),
          url: this.$route.path.substr(this.$route.path.indexOf('/details/')), // 仅此保存一次url，？url现永久有效
        });
      }
      function dateFormatter(fmt, date) {
        var o = {
            "y+": date.getFullYear(), // 2020
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
      if(this.lzyplayHistory.length>32)
        this.lzyplayHistory.pop();
      return true;
    },
    lzyplayerActions:async function(doeveryAction=true){
      var _this = this,
          haveSetHistory = false; // 简单的节流控制
      let exeTimes= this.lzyplayerMsg.length
      for(let i=0;i<exeTimes;i++){
        switch(this.lzyplayerMsg.shift()){ // 队列弹出
          case 'storageSettings':
            this.lzyplayerSets("playHistory");
            break;
          case 'setHistory':
            if(typeof this.$refs.player ==='undefined' || haveSetHistory) break;
            if(this.lzyplaySetTempHistory())
              _this.lzyplayerMsg.push("setHistory");
            haveSetHistory=true;
            break;
          case 'storageHistory':
            this.lzyStorageHistory();
            break;
          case 'loadHistory':
            this.lzyplayHistory = JSON.parse(this.lzyReadPlayerSets("playHistory")) || []; // load失败时保持自身类型不变（array），否则后面报错null无length属性
            break;
          default :
            break;
        }
        var everyAction = function(){
          if(typeof _this.$refs.player ==='undefined' || haveSetHistory){return false;} // 仅播放器加载完后执行
          _this.lzyGlobalCounts++;
          if(_this.lzyGlobalCounts%12==0){
            _this.lzyplayerMsg.push("setHistory");
            _this.lzyGlobalCounts=0;
          }else if(_this.lzyGlobalCounts%2==0){ // 每10秒执行一次的任务 保存进度
            _this.lzyStorageHistory();
          }
        };
        if(doeveryAction) everyAction();
      }
    }
  },
  computed:{
  },
  created: function() {
    this.lzyplayerMsg.push("loadHistory"); // 在这里推入加载设置事件
    this.getDetail();
    var settings =this.lzyReadPlayerSets(); // 默认读取设置项得到对象
    if(!!settings && settings.hasOwnProperty('autoNext')) this.autoNext=settings.autoNext;
    
  },
  mounted() {
    this.$emit('setSearchHistory','new'); // 增加当前的搜索历史记录
    this.$emit('setSearchHistory','storage');
    var _this=this;
    this.$refs.player.dp.on("ended",function(){
      if(_this.autoNext){
        _this.$refs.player.dp.notice("3s后开始接续播放");
        window.setTimeout(function(){
          _this.lzyplayNext();
        },2999);
      }
      window.localStorage.setItem('lzyplaysettings',JSON.stringify({autonext:this.autoNext,}) );
    });
    this.coreIntervalHandle = setInterval(this.lzyplayerActions, 5*1024);
  },
  destroyed(){
    window.document.title='AnimeSearcher';
    this.$emit('addAction','immerseActionRemove'); // 清除`immerseAction`钩子中的方法。
    this.$emit('addAction','clearMsgAll');
    clearInterval(this.coreIntervalHandle);console.log("销毁了中央计时器：",this.coreIntervalHandle);
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
/* padding: 0 auto 0 6px 会提示无效，padding不是margin，是不会auto的*/
.lzyplayerFooter{
  display: flex;
  justify-content: space-around;
  /* align-content: baseline; */
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
  border:1px solid gray;
  border-radius: 5px;
  background-color: #ecf2f9;
  overflow:hidden;
  overflow: -moz-hidden-unscrollable;
}
.lzyplayerFooter span .lzyplayerMsg .rollBar{
  /* transform: translateX(-81px); */
  overflow: visible;
  width: max-content;
}
.lzyplayerFooter span .lzyplayerMsg:hover .rollBar{
  animation: lzyXTransform 6s cubic-bezier(.3,.19,.73,1.21) infinite;
}
/* .lzyplayerFooter > span{
  margin:0 8px;
} */

.lzyselectDanmaku{
  position: fixed;
  top: 50%;  left: 50%;
  transform: translate(-50%,-50%);
  width:336px;
  opacity: .95;
  z-index: 9;
}
/* .lzyselectDanmaku *{display: block;} */
.lzydanmaku-list{
  overflow-y: scroll;
  font-size: 14px;
  /* overflow-x:  */
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
  /* clear:both; */
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
  left:0;right:0; /* 代替设置宽度 */
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
  /* margin: -16 auto 46px; */
  margin: 5px auto 46px;
  width: 800px; /* 前文JS宽屏设置需与此值保持一致 */
  /* max-height: 400px; */
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

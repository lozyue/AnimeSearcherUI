<template>
  <v-container>
    <v-row class="mg dropIn">
      <v-col cols="12">
        <v-row></v-row>
        <v-row v-show="!showIntroduce" align="center" justify="center">
          <div>
            <div id="myplayer">
              <h4 class="player-head"> {{title+' '+play_lists[version_index].name}} <span>{{$route.params.episode}}</span></h4>
              <d-player
                ref="player"
                :lang="lang"
                :video="video"
                :contextmenu="contextmenu"
                :danmaku="danmaku"
                @error="lzyResponse()"
                @fullscreen="lzyFullScreen(true)"
                @fullscreen_cancel="lzyFullScreen(false)"
              ></d-player>
              <div class="lzyplayerFooter">
                <span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small color="#fcbad3"
                        v-bind="attrs" v-on="on"
                        @click="lzyplayNext"
                      >
                        <v-icon color="white">mdi-skip-next</v-icon>
                      </v-btn>
                    </template>
                    <span>播放下一集</span>
                  </v-tooltip>
                </span>
                <span>
                  弹幕
                  <v-switch class="ml-2" inset dense
                    v-model="showDanmu"
                  ></v-switch>
                </span>
                <span>
                  <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      small color="#fce2ce"
                      v-bind="attrs" v-on="on"
                      @click="lzyplay(playersettings.url,playersettings.proxy_url,playersettings.name, playersettings.index,true)"
                    >
                      <v-icon color="white">mdi-sync</v-icon>
                    </v-btn>
                  </template>
                  <span>卡点重载</span>
                </v-tooltip>
                </span>
                <span>
                  <div class="lzyplayerMsg" :title="footerMsg" v-html="footerMsg"></div>
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
                    <span>额外弹幕外挂</span>
                  </v-tooltip>
                </span>

                <span>
                  自动切P
                  <v-switch
                    dense inset class="ml-2"
                    color="#eab4f8"
                    v-model="autoNext"
                  ></v-switch>
                </span>
              </div>
              
              <v-stepper v-show="showSelect" class="lzyselectDanmaku" v-model="onstep">
                <v-stepper-header>
                  <v-stepper-step  editable :complete="onstep > 1" step="1">
                    <span :style="showAdditionSelect?'color:#ff414d':''">{{!showAdditionSelect?"选择弹幕源":"额外弹幕外挂"}}</span></v-stepper-step>
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
                          <code class="ml-2" style="background:#4b4b4b;color:rgb(255, 226, 70)">{{item.data.danmaku.substr(item.data.danmaku.lastIndexOf('.')+1,item.data.danmaku.length)}}</code>
                          <span class="ml-2" style="color:#21acff">Mark:{{item.mark}}</span>
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
                          <span class="mr-2" style="display:inline-block;color:#21acff">标题:</span><span>{{item.name}}</span>
                          
                        </li>
                      </ul>
                    </v-card>
                    <span><v-btn class="white--text" 
                      :color="showAdditionSelect?'#d7385e':'primary'" light small
                      @click="(showAdditionSelect?lzyuserAdditionSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url):lzyuserSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url)),showSelect=false"
                    >Done</v-btn></span>
                    <span><v-btn small text style="float:right" @click="showSelect=showAdditionSelect=false">Close</v-btn></span>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
              
            </div>
          </div>
          <div class="section-module">
            <div class="section-title"><span>选集</span><v-icon color="#00a1d6">mdi-playlist-play</v-icon>
              <span @click="haveSorted>1?haveSorted=0:haveSorted++, haveSorted===1 ? play_lists[version_index].video_list=lodash.sortBy(play_lists[version_index].video_list, ['name']) : haveSorted===2? lodash.reverse(play_lists[version_index].video_list) :play_lists[version_index].video_list=lodash.sortBy(play_lists[version_index].video_list,['id'])" style="float:right;cursor:pointer">
                <v-icon title="当前：升序排列" color="primary" v-if="haveSorted===1">mdi-sort-descending</v-icon>
                <v-icon title="当前：降序排列" v-else-if="haveSorted===2">mdi-sort-ascending</v-icon>
                <v-icon title="当前：默认排序" v-else>mdi-sort-variant</v-icon>
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
            <v-img class="comic-cover" lazy-src="../assets/default-cover.png" :src="!!cover?cover:'../assets/default-cover.png'"></v-img>
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
                  @click="(!showIntroduce?($refs.episodeBox.scrollTop=36*play.id - ~~$refs.episodeBox.clientHeight*2/5):lodash.timer(function(){$refs.episodeBox.scrollTop=36*play.id - ~~$refs.episodeBox.clientHeight*2/5})),$vuetify.goTo(-200,{offset:100,duration:256,easing:'easeInOutCubic'}), lzyplay(play.url,play.proxy_url,play.name,play.id,false,index)"
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
import logoImg from "@/assets/logo.png";
import VueDPlayer from "./vue-dplayer-raw.vue";
import _ from 'lodash';

export default {
  name: "Details",
  components: {
    "d-player": VueDPlayer
  },
  data: () => ({
    // 挂载一份lodash方法
    lodash:{
      console:function(a,b='',c=''){
        console.log(a,b,c)
      },
      timer:function(callback, delay=2999){
        var test=setTimeout(callback, delay);
        console.log("执行了定时器 ",test);
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

    showIntroduce: true,
    title: "",
    cover: "",
    category: "",
    description: "",
    play_lists: [{name:'',video_list:[]}],
    
    version_index: 0,
    mytestStr: "",
    userDanmakuSearch: "",// 用户自定义弹幕搜索
    
    rankedMark:[{mark:0,data:{danmaku:'',title:'弹幕库为空',url:''}}], // 排序过的弹幕库
    // currentDanmaku:[], //  匹配到的当前视频的弹幕源array
    currentEpisodeDanmaku:[{mark:0,data:{name:'弹幕集为空'}}], // 匹配当前选定弹幕集的array

    footerMsg:'弹幕未加载',
    // iframeSrc:'',
    // 当前播放的视频的信息
    playersettings: {
      index:-1,
      url: "",
      proxy_url:'',
      name: '',
      danmaku: {
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
      // thumbnails: logoImg,
      type: "auto"
    },
    danmaku:{
      id:"danmaku_cid",
      api:'',
      addtion:['http://127.0.0.1:6001/danmaku/data/ec016344bd9949738aa68246b9123f6f','http://127.0.0.1:6001/danmaku/data/ee2fbad49a55eeec1fe926badaa4f47a'] // 额外外挂弹幕
    },
    lang: "zh-cn",
    logo: false,// logo: logoImg,
    autoplay: false,
    autoNext: false,
    showDanmaku: true,
    showSelect: false,
    showAdditionSelect: false,
    haveSorted: 0,
    selectTemp:{
      // danmaku:[{mark:0,data:{title:''}}], // 直接使用rankedMark
      danmaku_index:0,
      danmakuEpisode:[{mark:0,data:{name:''}}],
      episode_index:0,
    },
    onstep:1,
    player: null,
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
  }),
  methods: {
    getDetail: async function(searchName = '') {
      var id;
      if(!searchName) id = this.$route.params.param;
      else id = searchName;
      const res = await this.$http.get("/detail/" + id).catch(function(e) {
        console.log(e);
      });
      if (typeof(res)==='undefined' || res.status != 200 || res.status.data === "error") {
        console.log("出错啦");
        this.$emit("message", "加载视频出错了", "info");
        return false;
      }
      this.cover = res.data.cover;
      this.description = res.data.description.replace(/&nbsp;/g, " ");
      this.title = res.data.title;
      this.category = res.data.category;
      this.cover = res.data.cover_url;
      // 排序 按照{name：}
      var templist = res.data.play_lists;
      // var 
      // templist = _.reverse(_.sortBy(templist,['name','url','simple_player','proxy_url','proxy_player']));
      templist.forEach(function(list,index,arr){
        var res=list.video_list; // 由于很多标题格式混乱，使用默认排序
        // var res=_.sortBy(list.video_list,['name','url','simple_player','proxy_url','proxy_player']);
        arr[index].video_list = res;
      });
      if(!_.isEmpty(templist)){
        // 对Templist做一个引索挂载备份
        templist.forEach(function(eachList,i,a){
          a[i].video_list.forEach(function(v,index,arr){
            arr[index]['id'] = index; // 挂载引索为Id属性
          });
        })
        this.play_lists = templist;
      }else{
        this.$emit('message',"视频详情获取失败！",'error',2);
        console.log(this.play_lists);
      }
      // this.play_lists = res.data.play_lists
      var lastSlash = this.$route.path.substr(9).lastIndexOf("/");
      if (lastSlash === -1) {
        this.currentPath = this.$route.path;
      } else {
        // 直接访问播放页，剪裁出二级路径
        this.currentPath = this.$route.path.substr(0, 9 + lastSlash);
      }
      this.get_danmaku(); // 异步加载需要接续进行
      // 激活用户状态
      this.$emit("addAction","userFocus");
    },
    get_danmaku:async function(searchName){
      var danmakuName;
      if(!searchName) danmakuName = _.trim(this.title);
      else danmakuName=searchName;
      const res = await this.$http.get('/danmaku/search/'+ danmakuName).catch(function(e){console.log(e)});
      if(typeof(res)==="undefined" || _.isEmpty(res.data)){
        // this.$refs.player.dp.notice("加载弹幕失败",2000); Dplayer会自己提示
        this.footerMsg = '重进试试.当前弹幕库为空或加载弹幕库失败';
         this.rankedMark=[];
        return this.$emit('message','当前弹幕库为空或加载弹幕库失败！','error',2);
      }
      // this.danmaku = res.data;
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
          console.log("相同长度加权分值："+~~( (Math.log(_this.play_lists[_this.version_index].video_list.length)+1) * (_this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length)) ))
        }else{
          currentMark += _this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length);
          console.log({"v.num":v.num,"length": _this.play_lists[_this.version_index].video_list.length})
          console.log("对称差加权分值："+(_this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length)) )
        }
        // 同上，对标题长度做对称差加权
        currentMark += ~~((_this.title.length-Math.abs(v.title.length-_this.title.length)*Math.log(_this.play_lists[_this.version_index].video_list.length+1)) );
        console.log("标题长度对称加权为："+~~((_this.title.length-Math.abs(v.title.length-_this.title.length)*Math.log(_this.play_lists[_this.version_index].video_list.length+1)) ))

        // 可信赖源加权：bilibili额外增加1/32的分数
        if(v.danmaku.lastIndexOf('bilibili')!=-1){
          console.log("为bilibili助力分数："+~~(Math.abs(currentMark)/24)+1);
          currentMark += ~~(Math.abs(currentMark)/24)+1;
        }
        
        mark.unshift({ mark:currentMark, id:index, data:arr[index]}); // 记录总得分,重复保存数据为了方便。
      });
      var rankedMark = _.reverse(_.sortBy(mark, ['mark']) );
      // 是一个正序的数组，取得分高的为最后一个弹幕库，匹配弹幕集数
      _this.rankedMark = rankedMark;
    },
    getCurrentDanmaku:async function(rankOne, secondary=0){
      var _this=this;
      function getInsertedNumbers(mixedStr){
        var result = '';
        mixedStr=mixedStr.replace(/\s/g,''); // 删除空格
        for(let i=0;i<mixedStr.length;i++){
          if( !isNaN(mixedStr[i]) ) result+=mixedStr[i];// 是数字就加上去
        }
        return result;
      };
      if( typeof(rankOne)==='undefined' || !rankOne.hasOwnProperty("data") || !rankOne.data.hasOwnProperty('url') || _.isEmpty(rankOne.data.url)) return console.log('弹幕库数据有误！on function getCurrentDanmaku() Param : 1') && false;
      const res = await this.$http.get(rankOne.data.url).catch(function(e){console.log(e)});
      
      console.log(['getCurrentDanmaku',{resData:res.data,title:rankOne.data.title,num:rankOne.data.num,url:rankOne.data.url}, ]);
      
      var matchedURL={}, copy = res.data;
      if(_.isEmpty(res.data)){
        this.footerMsg='当前弹幕数据为空';
        this.$emit("message","当前弹幕数据为空","warning",1);
        return false;
      }
      if(typeof(this.playersettings.name)==='undefined'){
        this.footerMsg='获取的弹幕格式不正确';
        console.error("获取的弹幕格式不正确！on function getCurrentDanmaku()");return false;
      }
      // 开始匹配
      // 1.对数字episode做数字式indexOf搜索
      var find=false, currentPlayName = ''+parseInt(getInsertedNumbers(this.playersettings.name) ), currentTargetName, regMatch = this.playersettings.name.match(/第([0-9]+?)[集话卷章]/); // 仅正则匹配一次
      var copyTemp=[],currentIndex=-1;
      if(!_.isEmpty(currentPlayName) && !isNaN(currentPlayName)){
        // var find=false;
        let j=0;
        for(let i=0;i<copy.length;i++){
          currentTargetName = parseInt(getInsertedNumbers(copy[i].name) )+'';
          if( currentPlayName === currentTargetName){
            matchedURL = copy[i];
            find=true;
            j=i;
            console.log("数字搜索匹配成功");
            break;
          }else if(regMatch!==null && parseInt(regMatch[1])+''===currentTargetName){
            console.log(regMatch)
            matchedURL = copy[i];
            find=true;
            console.log("简单的正则搜索匹配");
            j=i;
            break;
          }
          // 集序对应时的互相的数字正序查找,准确度降低 加上了长度比对，好了准确度升高了 啊，突然反应过来现在这样就是真值匹配了，直接不要了
          // else if( i==this.playersettings.index && currentTargetName.length===currentPlayName.length && ( copy[i].name.indexOf(currentPlayName)!==-1 || this.playersettings.name.indexOf(currentTargetName)!==-1) ){
          //   matchedURL = copy[i];
          //   this.selectTemp.episode_index = i;
          //   find=true;
          //   j=i;
          //   break;
          // }
        }
        this.currentEpisodeDanmaku = copy;
        console.log(["获取弹幕执行完毕",matchedURL.url,copy[j].name,this.playersettings.name,]);
      }
      // if(!find) return this.$emit("message","未找到匹配弹幕，可手动选择","warning",1);
      if(!find){ // 当前集数名为字符或 字符加数字的情况 相似匹配
        copy.forEach(function(v,index,arr){
          var tempIndex=-1, currentMark = 0;
          for(let i=0;i<_this.playersettings.name.length;i++){
            tempIndex=v.name.lastIndexOf(_this.playersettings.name[i]);
            if(tempIndex!==-1){
              if(currentIndex+1===tempIndex) currentMark+=4;
              else if(currentIndex<tempIndex) currentMark+=2;
              else if(currentIndex<tempIndex) currentMark+=1;
              // 是数字相等额外加分
              if(!isNaN(_this.playersettings.name[i]) ) currentMark+=2;
            }
            currentIndex = tempIndex;
          }
          copyTemp.unshift({mark:currentMark,data:v});
        });
        this.currentEpisodeDanmaku = copyTemp = _.reverse(_.sortBy(copyTemp,['mark']));
        // 始终会输出一个最高结果 如果最高匹配的相似度达到46%;
        if(copyTemp[0].mark > 56/100 * _this.playersettings.name.length*4 ){
          console.log("满足分数要求的匹配")
          matchedURL = copyTemp[0].data;
          console.log(["获取弹幕执行完毕",matchedURL.url,copyTemp[_this.playersettings.index].data.name,_this.playersettings.name,]);
        // 分数达到最低要求36% 刚好danmaku数 和 集数相等也直接匹配
        }else if(copyTemp[0].mark > 36/100 && copyTemp.length===_this.play_lists[_this.version_index].video_list.length){
          console.log(["数量相等的匹配",copyTemp,"当前匹配分数为："+copyTemp[0].mark])
          matchedURL = copyTemp[0].data;
          console.log(["获取弹幕执行完毕。【匹配弹幕的url，匹配的名称】",matchedURL.url,_this.playersettings.name,]);
        // 匹配失败重试
        }else if(secondary < 2){
          // 未找到匹配结果或 结果匹配度过低，选择下一个弹幕源进行匹配。
          // 最多再执行 2 次
          var secondaryRes=await _this.getCurrentDanmaku(_this.rankedMark[++secondary],secondary);
          // 后续的第 secondary 次匹配成功的弹幕库将排名调到前面；
          if(secondaryRes){
            let temp=_this.rankedMark[secondary];
            for(let k=secondary;k>0;k--){
              _this.rankedMark[k]=_this.rankedMark[k-1];
            }
            _this.rankedMark[0] = temp;
          }
          console.error(`第${secondary+1}次出错，正在重新进行匹配`);
        }else{
          _this.footerMsg='<span style="color:#e91e63">'
          if(secondary===0) _this.footerMsg+="准确率过低，正在尝试第二次匹配……"; // 第一次失败
          else if(secondary===1) _this.footerMsg+="第二次匹配准确率过低，正在尝试第三次匹配……" // 第二次失败
          else{
            _this.footerMsg+="自动匹配弹幕失败，请手动选择或重新搜索→_→";
            _this.$emit("message","未找到匹配弹幕，可手动选择","warning",1);
            console.log(["获取弹幕执行完毕",matchedURL.url,_this.playersettings.name,'匹配得分为：'+copyTemp[0].mark])
          }
          _this.footerMsg+='</span>';
          return false;
        }
      }
      
      // 加载弹幕
      if(matchedURL.hasOwnProperty('url') && !_.isEmpty(matchedURL.url)){
        // 翠绿色成功匹配提示
        this.footerMsg = `<span style="color:#00bf00">成功匹配弹幕集：『${matchedURL.name}』</span>`;
        this.playersettings.danmaku.api=matchedURL.url+'/';
        this.$refs.player.dp.notice("正在为您加载弹幕…", 999);
        this.$refs.player.dp.pause();
        var nowseek=this.$refs.player.dp.video.currentTime;
        this.$refs.player.dp.switchVideo(this.video.quality[0],this.playersettings.danmaku);
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.play();
        return matchedURL.url;
      }
    },
    lzyuserSelect:async function(url, index=-1){
      const res = await this.$http.get(url).catch(function(v){console.error(v)});
      if(typeof(res)==='undefined' || _.isEmpty(res.data)) return this.$emit('message',"请求弹幕库数据错误",'error',2);
      // this.selectTemp.danmaku_index = index;
      this.selectTemp.danmakuEpisode = res.data;
      this.selectTemp.episode_index = -1;
    },
    lzyuserSelectDone(episode_danmaku_url){
      var _this=this;
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
        _this.footerMsg = '已应用手动弹幕选择';
        // 用户选定的弹幕源排名调到前面；
        let temp=_this.rankedMark[_this.selectTemp.danmaku_index];
        for(let k=_this.selectTemp.danmaku_index;k>0;k--){
          _this.rankedMark[k]=_this.rankedMark[k-1];
        }
        _this.rankedMark[0] = temp;
        console.log("进行了手动排序")
      }else if(_.isObject(episode_danmaku_url)){
        episode_danmaku_url.then(function(res){
          console.log(["Promise的Then方法：",res.data.url]);
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
          _this.footerMsg = '已应用手动弹幕选择';
          // 用户选定的弹幕源排名调到前面；
          let temp=_this.rankedMark[_this.selectTemp.danmaku_index];
          for(let k=_this.selectTemp.danmaku_index;k>0;k--){
            _this.rankedMark[k]=_this.rankedMark[k-1];
          }
          _this.rankedMark[0] = temp;
          console.log("进行了手动排序")
        })
      }else{
        this.$emit("message","数据格式有误或者操作过快");
        return false;
      }
    },
    lzyuserAdditionSelectDone:function(episode_danmaku_url){
      this.$emit("message","功能还在测试中，敬请期待！","warning",2);
      // this.$emit("message","已经合并额外弹幕选择","success",2);
    },
    lzyplay: async function(episode_url, episode_proxy_url,  episode_name, episode_index, saveTime=false, version_index=false) {
      this.playersettings.index = episode_index; // 优先更新
      if(this.showIntroduce) this.userDanmakuSearch = this.title; // 如果是第一次点击 保存当前弹幕库搜索词
      this.showIntroduce = false;
      const res = await this.$http.get(episode_url).catch(function(e) {
        console.error(e);
      });
      if (!res.hasOwnProperty("data") || !res.data || res.data === "error") {
        console.log("数据不存在或者为空");
        this.$emit("message", "很抱歉,当前视频加载失败", "error");
        return false;
      }
      // var danmaku=await this.getCurrentDanmaku(this.rankedMark[0]);
      this.video = {
        quality: [{ name: "1080P", url: res.data },{name:'代理', url: episode_proxy_url}],
        // pic: this.cover,
        defaultQuality: 0,
        // thumbnails: logoImg,
        type: "auto",
        currentPath: ""
      };
      // this.$refs.player.dp.switchVideo({
      //   name: "1080P",
      //   url: res.data,
        // pic: this.cover,
        // thumbnails: "second.jpg"
      // });
      if(saveTime) var nowseek=this.$refs.player.dp.video.currentTime;
      if(this.playersettings.isProxy)
        this.$refs.player.dp.switchVideo(this.video.quality[1]);
      else
        this.$refs.player.dp.switchVideo(this.video.quality[0]); // 仅加载视频，暂不加载弹幕
      if(saveTime)
        this.$refs.player.dp.seek(nowseek);
      else
        this.$refs.player.dp.seek(0);
      this.$refs.player.dp.play();
      if(version_index!==false) this.version_index = version_index;
      this.playersettings = {
          index : episode_index,
          url : episode_url,
          proxy_url: episode_proxy_url,
          danmaku : {
            id:"danmaku_cid",
            api:'',
            addtion:['http://127.0.0.1:6001/danmaku/data/ec016344bd9949738aa68246b9123f6f','http://127.0.0.1:6001/danmaku/data/ee2fbad49a55eeec1fe926badaa4f47a'] // 额外外挂弹幕
          },
          name : episode_name,
          isProxy : this.playersettings.isProxy,
      };
      window.document.title = episode_name+'·'+this.title+' '+this.play_lists[this.version_index].name;
      // this.iframeSrc = res.data;
      if (
        this.$route.path.substr(this.$route.path.lastIndexOf("/")) !==
        "/" + episode_name
      ) {
        this.$router.push(this.currentPath + "/" + episode_name);
        // return this.currentPath+'/'+episode_index;
      }
      await this.getCurrentDanmaku(this.rankedMark[0]);
      // 应用设置项
      if(!this.showDanmu) this.$refs.player.dp.danmaku.hide();
      else this.$refs.player.dp.danmaku.show();

      
      // 增加用户消息激活方法：
      this.$emit("addAction","userFocus");
      // const player = this.$refs.player.dp;
    },
    lzyplayNext(){
      if(this.play_lists[this.version_index].video_list.length <= this.playersettings.index+1) this.$refs.player.dp.notice("已经是最终P了，将循环播放")
      else this.$refs.player.dp.notice("正在播放："+this.play_lists[this.version_index].video_list[this.playersettings.index+1].name);
      return this.play_lists[this.version_index].video_list.length > this.playersettings.index+1 && this.lzyplay(this.play_lists[this.version_index].video_list[this.playersettings.index+1].url, this.play_lists[this.version_index].video_list[this.playersettings.index+1].proxy_url, this.play_lists[this.version_index].video_list[this.playersettings.index+1].name, this.playersettings.index+1, false);
    },
    // 报错节流
    lzyResponse: _.throttle(function(){
      var nowseek=this.$refs.player.dp.video.currentTime;
      console.log("当前的时间点是："+nowseek)
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
      this.$emit('message','播放失败，正在切换到代理路线','error',2);
      // this.$refs.player.dp.pause();
      this.$refs.player.dp.notice("正在切换到代理路线",3000);
      // this.$refs.player.dp.switchQuality(1);
      this.$refs.player.dp.switchVideo(this.video.quality[1]);
      this.playersettings.isProxy = true;
      console.log(this.video.quality);
      this.$refs.player.dp.play();
    }, 6999),
    lzyFullScreen(fullscreen){
      console.log(fullscreen?"全屏了":"退出全屏");
      // 沉浸模式取消掉 fantasy 主题的视频透明度
      // if(this.lzyPubSettingsStorage = window.localStorage.getItem("lzysettings")) 不判断了

    },
    // play() {
    // }
  },
  computed:{
    showDanmu:{
      get:function(){
        return this.showDanmaku;
      },
      set:function(newVal){
        this.showDanmaku = newVal;
        if(!this.$refs.hasOwnProperty('player') ) return newVal;
        if(!newVal){
          this.$refs.player.dp.danmaku.hide();
        }
        else{this.$refs.player.dp.danmaku.show();}
        window.localStorage.setItem('lzyplaysettings',JSON.stringify({autonext:this.autoNext,showdanmu:this.showDanmu}) );
      }
    }
  },
  created: function() {
    this.getDetail();
    // 读取并应用设置
    var settings =JSON.parse(window.localStorage.getItem('lzyplaysettings') );
    if(settings.hasOwnProperty('autonext')) this.autoNext=settings.autonext;
    if(settings.hasOwnProperty('showdanmu')){
      this.showDanmu=settings.showdanmu;
      console.log("应用了弹幕库设置：danmaku->"+settings.showDanmu);
      // if(!this.showDanmu) this.$refs.player.dp.danmaku.hide();
      // else this.$refs.player.dp.danmaku.show();
    }
  },
  mounted() {
    this.$emit('setHistory','new'); // 增加当前的历史记录
    this.$emit('setHistory','storage');
    var _this=this;
    this.$refs.player.dp.on("ended",function(){
      console.log("播放结束，调用ended钩子")
      if(_this.autoNext){
        _this.lzyplayNext();
        _this.$refs.player.dp.notice("3s后自动开始播放");
        window.setTimeout(function(){_this.$refs.player.dp.play()},2999);
      }
      // 播放完视频存储一次设置
      window.localStorage.setItem('lzyplaysettings',JSON.stringify({autonext:this.autoNext,showDanmu:this.showDanmu}) );
    });
  },
  destroyed(){
    window.document.title='AnimeSercher';
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
  font-size: 18px;
  display: inline-block;
  margin: auto 5px;
}
/* padding: 0 auto 0 6px 会提示无效，padding不是margin，是不会auto的*/
.lzyplayerFooter{
  padding:0 0 0 6px;
  font-size: 12px;
  background-color: #fff;
  user-select: none;
}
.lzyplayerFooter *{display: inline-block;vertical-align: middle;}
.lzyplayerFooter span .lzyplayerMsg{
  display: inline-block;
  padding-top: 5px; padding-left: 8px;
  height: 28px;
  width: 288px;
  font-size: 12px;
  border:1px solid gray;
  border-radius: 5px;
  background-color: #ecf2f9;
  overflow:hidden;
  overflow: -moz-hidden-unscrollable;
}
.lzyplayerFooter > span{
  margin:0 8px;
}

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

.episodeContainer{
  overflow-y: scroll;
  max-height: 145px;
  /* clear:both; */
}
.episodeBtn{float: left;margin:6px 8px;}

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

#myplayer {
  margin: 46px auto;
  width: 800px;
  /* max-height: 400px; */
  border: 1px solid gray;
  box-shadow: 2px 3px 10px black;
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
</style>

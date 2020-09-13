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
                  <div class="lzyplayerMsg" v-html="footerMsg"></div>
                </span>
                <span style="postion:relative">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon @click="showSelect=true, selectTemp={danmakuEpisode:currentEpisodeDanmaku,danmaku_index:0,episode_index:-1}"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="info">mdi-message-bulleted</v-icon>
                      </v-btn>
                    </template>
                    <span>选择弹幕</span>
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
              <!-- 选择弹幕面板 -->
              <v-stepper v-show="showSelect" class="lzyselectDanmaku" v-model="onstep">
                <v-stepper-header>
                  <v-stepper-step editable :complete="onstep > 1" step="1">选择弹幕源</v-stepper-step>
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
                        <li><span class="mb-2 pink--text">共找到 {{rankedMark.length}} 个弹幕源</span></li>
                        <li  @click.stop="selectTemp.danmaku_index=index" :style="index===selectTemp.danmaku_index?'background:white':''" v-for="(item,index) in rankedMark" :key=index>
                          <span>{{item.data.title}}</span><span class="ml-2" style="color:#21acff">Mark:{{item.mark}}</span>
                        </li>
                      </ul>
                    </v-card>
                    <v-btn
                      color="primary" small
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
                    <span><v-btn
                      color="primary" light small
                      @click="lzyuserSelectDone(selectTemp.danmakuEpisode[selectTemp.episode_index].url),showSelect=false"
                    >Done</v-btn></span>
                    <span><v-btn small text style="float:right" @click="showSelect=false">Close</v-btn></span>
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
            <div class="section-wrap" >
              <ul :style="'height:'+~~(210/6)*play_lists[version_index].video_list.length+'px'" >
                <li :style="play.id===playersettings.index?'background-color:#fff;color:#21acff;'+'top:'+36*index+'px':'top:'+36*index+'px'" @click="lzyplay(play.url,play.proxy_url,play.name,play.id,false)" v-for="(play,index) in play_lists[version_index].video_list" :key="index">
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
                <v-btn
                  :style="index===version_index && play.id===playersettings.index?'background-color:rgb(247,178,202)!important;':''"
                  @click="$vuetify.goTo(-200,{offset:100,duration:256,easing:'easeInOutCubic'}), lzyplay(play.url,play.proxy_url,play.name,play.id,false,index)"
                  
                  min-width="54px"
                  outlined
                  class="pa-2"
                  color="pink"
                >{{play.name.length>15?lodash.truncate(play.name,{length:15,separator:' '}):play.name}}</v-btn>
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
    
    lodash:{
      truncate:_.truncate,
      reverse:_.reverse,
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
    rankedMark:[{mark:0,data:{title:'',url:''}}], // 排序过的弹幕库

    currentEpisodeDanmaku:[{mark:0,data:{name:''}}], // 匹配当前选定弹幕集的array

    footerMsg:'',
    
    // 当前播放的视频的信息
    playersettings: {
      index:-1,
      url: "",
      proxy_url:'',
      name: '',
      danmaku: '',
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
    },
    lang: "zh-cn",
    logo: false,// logo: logoImg,
    autoplay: false,
    autoNext: false,
    showDanmaku: true,
    showSelect: false,
    haveSorted: 0,
    selectTemp:{
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
    getDetail: async function() {
      var id = this.$route.params.param;
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
      templist.forEach(function(list,index,arr){
        var res=list.video_list; // 由于很多标题格式混乱，使用默认排序
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
      var lastSlash = this.$route.path.substr(9).lastIndexOf("/");
      if (lastSlash === -1) {
        this.currentPath = this.$route.path;
      } else {
        // 直接访问播放页，剪裁出二级路径
        this.currentPath = this.$route.path.substr(0, 9 + lastSlash);
      }
      this.get_danmaku();
    },
    get_danmaku:async function(){
      const res = await this.$http.get('/danmaku/search/'+_.trim(this.title) ).catch(function(e){console.log(e)});
      if(typeof(res)==="undefined" || _.isEmpty(res.data)){
        this.footerMsg = '重进试试.当前弹幕库为空或加载弹幕库失败';
        return this.$emit('message','当前弹幕库为空或加载弹幕库失败！','error',2);
      }
      var temp=res.data,_this=this;
      
      var //chunkTitle=this.title.split(''), 
          mark = [], 
          currentIndex=-1; 
      temp.forEach(function(v,index,arr){
        var tempIndex=-1, currentMark=0;
        for(let i=0;i<_this.title.length;i++){ 
          tempIndex=v.title.lastIndexOf(_this.title[i]); //搜索向右，避免重复查找，当然用lastIndexOf。 
          if(tempIndex!==-1){
            if(currentIndex+1===tempIndex) currentMark+=4; // 连续的话得4
            else if(currentIndex<tempIndex) currentMark+=2; // 引索值比前一个大得2分
            else if(currentIndex<tempIndex) currentMark+=1; // 小于得一分
            currentIndex=tempIndex;
          }
        }
        
        // 对称差加权：a-|(a-b)|;如果当前集数和弹幕库对应num条数相等，加（）分，此时附加分最高 b / 2a-b;为了提高影响度，对刚好相等的乘以标题长的自然对数倍率。标题长度直接导致库中各个弹幕集的得分差距。
        if(v.num+''===_this.play_lists[_this.version_index].video_list.length+''){
          currentMark += ~~( (Math.log(_this.play_lists[_this.version_index].video_list.length)+1) * (_this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length)) );
        }else{
          currentMark += _this.play_lists[_this.version_index].video_list.length - Math.abs(v.num - _this.play_lists[_this.version_index].video_list.length);
        }
        currentMark += v.num * (~~(_this.title.length/12)+1);
        mark.unshift({ mark:currentMark, id:index, data:arr[index]}); // 记录总得分,重复保存数据为了方便。
      });
      var rankedMark = _.reverse(_.sortBy(mark, ['mark']) );
      
      // 是一个正序的数组，取得分高的为最后一个弹幕库，匹配弹幕集数
      _this.rankedMark = rankedMark;
      
    },
    getCurrentDanmaku:async function(rankOne){
      var _this=this;
      function getInsertedNumbers(mixedStr){
        var result = '';
        mixedStr=mixedStr.replace(/\s/g,''); // 删除空格
        for(let i=0;i<mixedStr.length;i++){
          if( !isNaN(mixedStr[i]) ) result+=mixedStr[i];// 是数字就加上去
        }
        return result;
      };
      if( typeof(rankOne)==='undefined' || !rankOne.data.hasOwnProperty('url') || typeof(rankOne.data.url)==='undefined' || _.isEmpty(rankOne.data.url)) return console.log('弹幕库数据有误！on function getCurrentDanmaku() Param : 1');
      const res = await this.$http.get(rankOne.data.url).catch(function(e){console.log(e)});
      
      console.log(['getCurrentDanmaku',{resData:res.data,title:rankOne.data.title,num:rankOne.data.num,url:rankOne.data.url}, ]);
      
      var matchedURL='', copy = res.data;
      if(_.isEmpty(res.data)){
        this.footerMsg='当前弹幕数据为空';
        return this.$emit("message","当前弹幕数据为空","warning",1);
      }
      if(typeof(this.playersettings.name)==='undefined'){
        this.footerMsg='获取的弹幕格式不正确';
        return console.error("获取的弹幕格式不正确！on function getCurrentDanmaku()");
      }
      
      // 1.对数字episode做数字式indexOf搜索
      var find=false, currentPlayName = ''+parseInt(getInsertedNumbers(this.playersettings.name) ), currentTargetName, regMatch = this.playersettings.name.match(/第([0-9]+?)[集话]/); // 仅正则匹配一次
      if(!_.isEmpty(currentPlayName) && !isNaN(currentPlayName)){
        
        let j=0;
        for(let i=0;i<copy.length;i++){
          
          console.log([getInsertedNumbers(copy[i].name),currentPlayName])
          currentTargetName = parseInt(getInsertedNumbers(copy[i].name) )+'';
          if( currentPlayName === currentTargetName){
            matchedURL = copy[i].url;
            find=true;
            j=i;
            console.log("数字搜索匹配成功");
            break;
          }else if(regMatch!==null && parseInt(regMatch[1])+''===currentTargetName){
            
            matchedURL = copy[i].url;
            find=true;
            console.log("简单的正则搜索匹配");
            j=i;
            break;
          }
          // 集序对应时的互相的数字正序查找,准确度降低
          else if( i==this.playersettings.index && ( copy[i].name.indexOf(currentPlayName)!==-1 || this.playersettings.name.indexOf(currentTargetName)!==-1) ){
            matchedURL = copy[i].url;
            find=true;
            console.log("准确度降低的数字搜索匹配");
            j=i;
            break;
          }
        }
        this.currentEpisodeDanmaku = copy;
        console.log(["获取弹幕执行完毕",matchedURL,copy[j].name,this.playersettings.name,]);
      }
      
      var copyTemp=[],currentIndex=-1;
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
        
        // 始终会输出一个最高结果 如果最高匹配的相似度达到40%;
        if(copyTemp[0].mark > 40/100 * _this.playersettings.name.length*4 ){
          console.log("满足分数要求的匹配")
          matchedURL = copyTemp[0].url;
          console.log(["获取弹幕执行完毕",matchedURL,copyTemp[_this.playersettings.index].data.name,_this.playersettings.name,]);
        }else if(copyTemp.length===_this.play_lists[_this.version_index].video_list.length){
          // 刚好danmaku数 和 集数相等也直接匹配
          console.log(["数量相等的匹配",copyTemp])
          matchedURL = copyTemp[_this.playersettings.index].data.url;
          console.log(["获取弹幕执行完毕",matchedURL,_this.playersettings.name,]);
        }else{
          _this.footerMsg="未找到匹配弹幕，点右边→_→按钮手动选择";
          _this.$emit("message","未找到匹配弹幕，可手动选择","warning",1);
          console.log(["获取弹幕执行完毕",matchedURL,_this.playersettings.name,])
          return false;
        }
      }
      
      // 加载弹幕
      if(!_.isEmpty(matchedURL)){
        this.footerMsg = '匹配弹幕成功!';
        this.playersettings.danmaku=matchedURL+'/';
        this.$refs.player.dp.notice("正在为您加载弹幕", 999);
        this.$refs.player.dp.pause();
        var nowseek=this.$refs.player.dp.video.currentTime;
        this.$refs.player.dp.switchVideo(this.video.quality[0],{id:'doNothing',api:this.playersettings.danmaku});
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.play();
      }
    },
    lzyuserSelect:async function(url, index=-1){
      const res = await this.$http.get(url).catch(function(v){console.error(v)});
      if(typeof(res)==='undefined' || _.isEmpty(res.data)) return this.$emit('message',"请求弹幕库数据错误",'error',2);
      
      this.selectTemp.danmakuEpisode = res.data;
      this.selectTemp.episode_index = -1;
    },
    lzyuserSelectDone(episode_danmaku_url){
      var _this=this;
      if(!_.isEmpty(episode_danmaku_url) && _.isString(episode_danmaku_url)){
        this.playersettings.danmaku=episode_danmaku_url+'/';
        this.$refs.player.dp.notice("正在为您加载弹幕", 2999);
        this.$refs.player.dp.pause();
        var nowseek=this.$refs.player.dp.video.currentTime;
        if(this.playersettings.isProxy){
          _this.$refs.player.dp.switchVideo(_this.video.quality[1],{id:'userselected',api:_this.playersettings.danmaku});
        }else{
          _this.$refs.player.dp.switchVideo(_this.video.quality[0],{id:'userselected',api:_this.playersettings.danmaku});
        }
        this.$refs.player.dp.seek(nowseek);
        this.$refs.player.dp.play();
        _this.footerMsg = '已应用手动弹幕选择';
      }else if(_.isObject(episode_danmaku_url)){
        episode_danmaku_url.then(function(res){
          console.log(["Promise的Then方法：",res.data.url]);
          _this.playersettings.danmaku=res.data.url+'/';
          _this.$refs.player.dp.notice("正在为您加载弹幕", 2999);
          _this.$refs.player.dp.pause();
          var nowseek=_this.$refs.player.dp.video.currentTime;
          if(this.playersettings.isProxy){
            _this.$refs.player.dp.switchVideo(_this.video.quality[1],{id:'userselected',api:_this.playersettings.danmaku});
          }else{
            _this.$refs.player.dp.switchVideo(_this.video.quality[0],{id:'userselected',api:_this.playersettings.danmaku});
          }
          _this.$refs.player.dp.seek(nowseek);
          _this.$refs.player.dp.play();
          _this.footerMsg = '已应用手动弹幕选择';
        })
      }else{
        this.$emit("message","数据格式有误或者操作过快");
        return false;
      }
    },
    lzyplay: async function(episode_url, episode_proxy_url,  episode_name, episode_index, saveTime=false, version_index=false) {
      const res = await this.$http.get(episode_url).catch(function(e) {
        console.error(e);
      });
      if (!res.hasOwnProperty("data") || !res.data || res.data === "error") {
        console.log("数据不存在或者为空");
        this.$emit("message", "很抱歉,当前视频加载失败", "error");
        return false;
      }
      
      
      this.showIntroduce = false;
      this.video = {
        quality: [{ name: "1080P", url: res.data },{name:'代理', url: episode_proxy_url}],
        // pic: this.cover,
        defaultQuality: 0,
        // thumbnails: logoImg,
        type: "auto",
        currentPath: ""
      };      
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
          danmaku : this.getCurrentDanmaku(this.rankedMark[0]),
          name : episode_name,
          isProxy : this.playersettings.isProxy,
      };
      window.document.title = episode_name+'·'+this.title+this.play_lists[this.version_index].name;
      
      
      if (
        this.$route.path.substr(this.$route.path.lastIndexOf("/")) !==
        "/" + episode_name
      ) {
        
        this.$router.push(this.currentPath + "/" + episode_name);
        
      }
    },
    lzyplayNext(){
      return this.play_lists[this.version_index].video_list.length > this.playersettings.index+1 && this.lzyplay(this.play_lists[this.version_index].video_list[this.playersettings.index+1].url, this.play_lists[this.version_index].video_list[this.playersettings.index+1].proxy_url, this.play_lists[this.version_index].video_list[this.playersettings.index+1].name, this.playersettings.index+1, false);
    },
    // 报错节流
    lzyResponse: _.throttle(function(){
      var nowseek=this.$refs.player.dp.video.currentTime;
      console.log("当前的时间点是："+nowseek)
      if(nowseek && nowseek > 0){
        this.$emit("message","出错啦！正重新加载视频ing","error",2);
        if(this.playersettings.isProxy){
          this.$refs.player.dp.switchVideo(this.video.quality[1],{id:'onerror',api:this.playersettings.danmaku});
        return true;
        }else{
          this.$refs.player.dp.switchVideo(this.video.quality[0],{id:'onerror',api:this.playersettings.danmaku});
        }
        this.$refs.player.dp.play();
        return true;
      }
      this.$emit('message','播放失败，正在切换到代理路线','error',2);
      this.$refs.player.dp.notice("正在切换到代理路线",3000);
      // this.$refs.player.dp.switchQuality(1);
      this.$refs.player.dp.switchVideo(this.video.quality[1]);
      this.playersettings.isProxy = true;
      console.log(this.video.quality);
      this.$refs.player.dp.play();
    }, 6999),
  },
  created: function() {
    this.getDetail();

    // 读取设置
    var settings =JSON.parse(window.localStorage.getItem('lzysettings') );
    if(settings.hasOwnProperty('autonext')) this.autoNext=settings.autoNext;
    if(settings.hasOwnProperty('showdanmu')) this.showDanmu=settings.showdanmu;
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
        window.localStorage.setItem('lzysettings',JSON.stringify({autonext:this.autoNext,showdanmu:this.showDanmu}) );
      }
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
        window.setTimeout(function(){_this.$refs.player.dp.play()},2999);
      }
      // 播放完视频存储一次设置
      window.localStorage.setItem('lzysettings',JSON.stringify({autonext:this.autoNext,showdanmu:this.showDanmu}) );
    });
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
  height: 30px;
  width: 288px;
  font-size: 12px;
  border:1px solid gray;
  border-radius: 5px;
  background-color: #ecf2f9;
}
.lzyplayerFooter span{
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
.lzydanmaku-list{
  overflow-y: scroll;
  font-size: 14px;
  
}
.lzydanmaku-list ul{
  margin: 0;padding:8px 5px;
}
.lzydanmaku-list ul li{margin-bottom:6px;list-style: none;cursor: pointer;}
.lzydanmaku-list ul li:hover{background: lightblue;}

.episodeContainer{clear:both}
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

#myplayer {
  margin: 46px auto;
  width: 800px;
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

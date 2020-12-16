<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row>
          <h1 class="welcomeHead zoomInDown">
            <span class="green--text">Welcome</span>
            <span class="orange--text"> To </span>
            <span class="blue--text">AnimeSearcher！</span>
          </h1>
        </v-row>
        <v-row class="lzytransparent">
          <!-- 左侧栏 icon="mdi-message-arrow-right-outline" -->
          <v-col cols="3">
            <v-timeline dense class="lightbule--text" style="user-select:none">
              <v-timeline-item
                icon-color="#fff"
                small
              >
                <span slot="opposite">Tus eu perfecto</span>
                <v-card
                  class="mx-auto"
                  max-width="360"
                >
                  <v-img
                    class="white--text align-end"
                    max-width="300px"
                    lazy-src="../assets/history.jpg"
                    :src="['','','https://img.xjh.me/desktop/bg/acg/53428466_p0.jpg','','','https://img.xjh.me/desktop/bg/acg/53428466_p0.jpg','https://img.xjh.me/desktop/bg/acg/64090690_p0.jpg','https://img.xjh.me/random_img.php?return=302&type=bg&ctype=acg'][~~(Math.random()*7)]"
                  >
                    <v-card-title>AnimeSercher动漫站</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pb-0">Made with ♡</v-card-subtitle>
                  <v-card-text class="text--primary">
                    <div>响应式路由导航</div>
                    <div>多重资源引擎 资源丰硕</div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <v-timeline-item icon="mdi-television-box" small>
                <v-card>
                  <v-card-subtitle>See See TV?</v-card-subtitle>
                  <v-card-subtitle max-width="120px"><v-img src="../assets/TVlogo.png"></v-img></v-card-subtitle>
                  <v-card-subtitle class="lzylink" @click="$router.push('/tvlive')"><v-icon>mdi-cctv</v-icon>点我看电视</v-card-subtitle>
                </v-card>
              </v-timeline-item>
                <!-- icon="mdi-message-arrow-right-outline" -->
              <v-timeline-item
                icon-color="#fff"
                color="#E91E63"
                small
                v-for="(data,index) in lzyUpdateMsg" :key="index"
              >
                <!-- <span slot="opposite">Tus eu perfecto</span> -->
                <v-card
                  class="mx-auto"
                  max-width="360"
                >
                  <v-card-subtitle class="pb-0">{{data.title}}</v-card-subtitle>
                  <v-card-text class="text--primary">
                    <div class="lzyalign-left" v-html="data.lineOne"></div>
                    <div v-html="data.lineTwo"></div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
          <!-- 新番表，本周 -->
          <v-col cols="3">
            <div>
              <span title="上一周" @click="bangumi.current>0?bangumi.current--:bangumi" style="float:left;cursor:pointer;"><v-icon :color="bangumi.current>0?'rgb(255, 82, 82)':'lightgray'">mdi-skip-previous</v-icon></span>
              <span style="font-weight:500;color:#de4077">新番表</span>
              <span title="下一周" @click="bangumi.current<bangumi.total.length-1?bangumi.current++:bangumi" style="float:right;cursor:pointer;"><v-icon :color="bangumi.current<bangumi.total.length-1?'rgb(255, 82, 82)':'lightgray'">mdi-skip-next</v-icon></span>
            </div>
            <!-- <v-timeline dense class=""> -->
              <!-- <v-timeline-item small> -->
                <v-card @click="$router.push('/result/'+data.title)" class="bangumi pb-4" v-for="(data,index) in bangumi.total[bangumi.current].updates" :key="index">
                  <v-img :src="data.cover" max-width="300px" class="mx-auto"></v-img>
                  <v-card-subtitle><span style="float:left;"><span>更新至:</span> {{data.update_to}}</span><span style="float:right;"><time>{{bangumi.today===bangumi.current?data.update_time.slice(10):data.update_time.slice(0,10)}}</time></span></v-card-subtitle>
                  <div class="" style="clear:both;font-size:14px">{{data.title}} </div>
                </v-card>
              <!-- </v-timeline-item> -->
            <!-- </v-timeline> -->
          </v-col>
          <!-- 右侧内容 -->
          <v-col cols="6">
            <!-- 走马灯 -->
            <v-carousel cycle interval="5000" class="mt-6 lzycarousel" hide-delimiters touchless height="286" width="360">
              <a
                v-for="(item,i) in lzycarousel"
                :key="i"
                :href="currentPath.length===1?'/#/result/'+item.url:currentPath+'#/result/'+item.url"
              >
                <v-carousel-item :src="item.src"></v-carousel-item>
              </a>
            </v-carousel>
            <!-- 快捷资源分类 -->
            <v-spacer></v-spacer>
            <div class="helloPanel">
              <v-card max-width="100%" class="helloPanelItem mb-8">
                <v-card-subtitle><p class="lzyHead">近期搜索：</p></v-card-subtitle>
                <v-card-text>
                  <div class="lzyalign-left mb-2 historyItem" v-for="(data,i) in history" :key="i">
                    <a @click="$emit('search',data)">{{data}}</a><span title="删除" @click="$emit('setSearchHistory','delete',data),$emit('setSearchHistory','storage')" >✖</span>
                  </div>
                  <div v-show="history.length>0"><v-btn @click="$emit('setSearchHistory','clear')" text><span style="color:red;font-size:16px">清空记录</span><v-icon color="gray">mdi-delete</v-icon></v-btn></div>
                  <div v-show="history.length==0">无</div>
                </v-card-text>
              </v-card>
              <v-card max-width="100%" class="helloPanelItem">
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(item,index) in showSwitchedCategorys"
                      :key="index"
                    >
                      <v-expansion-panel-header>
                        <!-- <v-card-subtitle> -->
                        <p class="lzyHead" :style="`border-color:${getRandomColor}`">
                          <span>{{item.name}}</span>
                        </p>
                        <!-- </v-card-subtitle> -->
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <span class="fastSettings" v-for="(data,i) in item.engines" :key="i">
                          <v-switch dense
                            class="ma-0"
                            color="primary"
                            v-model="data.value"
                            :label="data.name"
                            @click.stop="saveEngines(data.name, i, 'engines', index)"
                          ></v-switch>
                        </span>
                        <v-divider></v-divider>
                        <!-- 防止key重复 -->
                        <span class="fastSettings" v-for="(data,i) in item.danmaku" :key="-i">
                          <v-switch dense
                            color="#eab4f8"
                            class="ma-0"
                            v-model="data.value"
                            :label="data.name"
                            @click.stop="saveEngines(data.name, i, 'danmaku', index)"
                          ></v-switch>
                        </span>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
              </v-card>
              <!-- 观看历史展示 -->
              <v-card max-width="100%" class="helloPanelItem mt-8">
                <v-card-subtitle><p class="lzyHead" style="border-color:#ff6e9f">近期观看：</p></v-card-subtitle>
                <v-card-text>
                  <div class="lzyalign-left mb-2 historyItem" v-for="(data,i) in lzyplayHistory" :key="i">
                    <a @click="$emit('search',data.name)">『{{data.name}}』<b style="color:#eaf;">{{data.episode}}</b></a><span title="删除" @click='lzyplayHistory = lzyplayHistory.slice(0,i).concat(lzyplayHistory.slice(i+1,lzyplayHistory.length) ),$emit("lzyglobalSettings","playHistory","lazySet",JSON.stringify(lzyplayHistory))' >✖</span>
                  </div>
                  <div v-show="history.length>0"><v-btn @click='lzyplayHistory=[],$emit("lzyglobalSettings","playHistory","lazySet",null)' text><span style="color:red;font-size:16px">清空记录</span><v-icon color="gray">mdi-delete</v-icon></v-btn></div>
                  <div v-show="history.length==0">无</div>
                </v-card-text>
              </v-card>
              <v-card max-width="100%" class="mt-8 helloPanelItem">
                <v-card-subtitle><p class="lzyHead">动漫新番表：</p></v-card-subtitle>
                <v-card-text>
                  <div>访问下面的网址查看：</div>
                  <div><span>2020新番放送：</span><a target="_blank" href="http://bangumi.tv/anime/browser/airtime/2020">http://bangumi.tv/anime/browser/airtime/2020</a>
                  </div>
                  <div><span>Bangumi编年史：</span><a target="_blank" href="https://hmacg.cn/bangumi/">https://hmacg.cn/bangumi/</a></div>
                  <div><span>Miobt：</span><a target="_blank" href="http://www.miobt.com/">http://www.miobt.com/</a></div>
                  <div><span>MOON PHASE - アニメ予定表  ：</span><a target="_blank" href="http://m-p.sakura.ne.jp/">http://m-p.sakura.ne.jp/</a></div>
                </v-card-text>
              </v-card>
              <v-card max-width="100%" class="mt-8 helloPanelItem">
                <v-card-subtitle ><p class="lzyHead" :style="`border-color:${generateRandomColor()}`">食用小技巧：</p></v-card-subtitle>
                <v-card-text style="max-height:300px;overflow-y:scroll" class="lzyalign-left">
                  <div class="">搜索记录的产生仅当在播放页<b>点击动漫标题的方式</b>在当前页加载的成功搜索会产生记录（点击图片会在新标签页中打开详情）</div>
                  <div>点击顶栏小电视图标会直接返回主页，而点击AnimeSearcher大字标题会在新窗口打开</div>
                  <div style="margin-top:8px;border-left:3px gray solid;font-weight:bold;border-radius:5px;padding-left:5px;text-indent:0">播放器技巧：</div>
                  <div>在网络切换后等故障情况视频加载停顿时可以点击<code>卡点重载</code>按钮</div>
                  <div>播放页按<code>F</code>和<code>W</code>可以分别快速切换浏览器全屏和网页全屏</div>
                  <div>弹幕源匹配错误后切换的手动选择会被优调到前面</div>
                  <div time="2020-12-13">支持弹幕合并啦！可以按紫色的外挂额外弹幕按钮试试吧</div>
                </v-card-text>
              </v-card>
              <v-card max-width="100%" class="mt-8 helloPanelItem">
                <v-card-subtitle ><p class="lzyHead" :style="`border-color:${generateRandomColor()}`">温馨提示和一些其他说明：</p></v-card-subtitle>
                <v-card-text style="max-height:300px;overflow-y:scroll" class="lzyalign-left">
                  <div>关闭一些不常用的资源引擎可以加速搜索响应，但也会使获取的内容变少</div>
                  <div>弹幕源或者资源引擎<b>至少保留一个</b>，否则搜索总为空哦</div>
                  <div>视频观看历史采用网页数据保存，最多保存16个哦</div>
                  <div>进入视频详情页会预加载弹幕库数据，过快点击播放视频可能导致弹幕库加载失败，请手动辅助选择</div>
                  <div>视频观看的代理路线出错时会自动切换，暂时手动切换会卡住需要点击卡点重载</div>
                  <div>资源引擎<code>eyunzhu、meijuxia</code>视频常有不雅水印，建议关闭</div>
                  <div>弹幕源<code>bahamut</code>多为港澳台地区繁体弹幕，加载速度较慢，建议关闭</div>
                  <div>Firefox中视频播放页快捷键<code>F</code>偶尔失效？这源于一个<a target="_blank" href="https://www.imooc.com/wenda/detail/604596">古老的bug</a>，暂无好办法修复，一般等待视频加载完点击事件触发后全屏可生效</div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  props:['history'],
  data: () => ({
    currentPath: window.location.pathname,
    lzycarousel: [
      {src:"http://cdn.u1.huluxia.com/g4/M00/3A/42/rBAAdl9XQM6ATTfPAAFrMzHyq3Q241.jpg",url:"元龙"},
      {
        src: "http://css.njhzmxx.com/down/1/401210600851437.jpg",
        url: "从零开始"
      },
      {
        src: "http://css.njhzmxx.com/comic/image/j330785131874534.jpg",
        url: "异世界"
      },
      {src:'http://tu.166376.com:988/img/upload/vod/2020-09-17/202009171600327695.jpg',url:"姜子牙"},
    ],
    searchVal:{},
    randomStr:['异世界','小'],
    lzyUpdateMsg:[
      {title:'2020-12-13',lineOne:"发布v1.0.0正式版",lineTwo:"视频观看体验大优化<br>更多特色期待未来的版本重构吧"},
      {title:'2020-10-25',lineOne:"发布v0.9.9正式版,增加主题切换、沉浸模式,新增弹幕源、TVlive、新番表,优化多处细节",lineTwo:''},
      {title:'2020-09-11',lineOne:"发布v0.9.8,新增资源引擎,增加本地搜索记录",lineTwo:''},
      {title:'2020-09-02',lineOne:'发布体验版v0.96,视频弹幕完成,观看体验提升',lineTwo:'一年一度开学季,开发暂缓'},
      {title:'2020-08-27',lineOne:'前端UI基本完成，构建版本v0.90',lineTwo:'API核心结构改进，解析速度提升'},
      {title:'2020-08-24',lineOne:'lozyue参与项目重写前端UI',lineTwo:'引擎API核心不断改进，原项目<a href="https://github.com/zaxtyson/AnimeSearcherOld" target="_blank">AnimeSearcherOld</a>迁移至<a href="https://github.com/zaxtyson/AnimeSearcher" target="_blank">AnimeSearcher</a>'},
      {title:'2020-02-03',lineOne:'zaxtyson提交了FirstCommit',lineTwo:"项目AnimeSearcher诞生"}
    ],
    bangumi:{
      current: 0,
      today:0, // 本周的引索记录
      total:[{date:'',day_of_week:'',is_today:true,updates:[]}], // 总共数据
    },
    lzyplayHistory:[],
    switchEngines:[],
    switchDanmaku:[],
    randomColor:['lightgreen','lightblue','pink','#f44','wheat','rgb(255, 172, 122)'],
    switchCategorys:{  // 弹幕分类
      movie:['meijuxia','eyunzhu'],
      comic:['agefans','yhdm','bimibimi','zzfun','eyunzhu', 'bilibili'],
      soupOpera:['meijuxia', 'tencent','youku'],
      performance:['eyunzhu','meijuxia', 'bahamut'], // 最快的性能推荐（此选项放置建议关闭的拖慢性能和内容质量低下的引擎）
    },
    showSwitchedCategorys:[
      {name:'动漫分类整合：',type:'comic',danmaku:{},engines:{}},
      {name:'电影分类整合：',type:'movie',danmaku:{},engines:{}},
      {name:'电视剧分类整合：',type:'soupOpera',danmaku:{},engines:{}},
      {name:'性能开关：(建议关闭)',type:'performance',danmaku:{},engines:{}},
    ],
    categoryControls:{
      comic: true,
      movie: true,
      soupOpera: false,
      performance: false,
    }
  }),
  methods:{
    search: async function() {
      const res = await this.$http.get("/search/" + this.randomStr[~~(Math.random()*1000)%this.randomStr.length])
        .catch(function(e) {
        });
      if (typeof res == "undefined" || _.isEmpty(res.data)) {
        this.emit('message',"获取搜索结果为空", "info");
        return false;
      }
      this.searchVal = res.data;
    },
    get_bangumi: async function(){
      const {data:res} = await this.$http.get("/bangumi/timeline").catch(function(e){console.error(e)});
      if(_.isEmpty(res)){
        this.$emit("message","新番表为空","warning",1);
        return false;
      }
      var haveToday = false; 
      for(let i=res.length-1;i>=0;i--){
        if(res[i].is_today!=true) continue;
        else{
          this.bangumi.today=this.bangumi.current=i;
          haveToday = true;
          break;
        }
      }
      if(haveToday){
        this.bangumi.total = res;
        return true;
      }
    },
    getEngines:async function(){
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
        _this.showSwitchedCategorys.forEach(function(v,index,arr){
          arr[index].engines = _this.getCategoriedSwitches('engines',v.type);
          arr[index].danmaku = _this.getCategoriedSwitches('danmaku',v.type);
        });
      }).catch(function(e){console.log(e);});
    },
    lzyReadPlayerSets:function(readKey = "lzyplaysettings",rtKey=null){
      let rtValue = null;
      this.$emit("lzyglobalSettings",readKey,"read",null,val => { rtValue = val });
      if(!!rtKey) return rtValue[rtKey];
      return rtValue;
    },
    postEnginesSetting:async function(name, id){
      const res =await this.$http.post('/settings/engine',{name:'api.engines.'+name,enable: this.switchEngines[id].value}).catch(function(e){console.log(e);});
      if(res.status!=200){
        this.switchEngines[id].value=!this.switchEngines[id].value; // 撤销设置
        this.$emit("message","设置失败！已撤销设置","error",2);
        return false;
      }
    },
    postDanmakuSetting:async function(name,id){
      const res = await this.$http.post('/settings/danmaku',{name:'api.danmaku.'+name,enable: this.switchDanmaku[id].value}).catch(function(v){console.log(v)});
      if(res.status!=200){
        this.switchDanmaku[id].value=!this.switchDanmaku[id].value; // 撤销设置
        this.$emit("message","设置失败！已撤销设置","error",2);
      }
    },
    saveEngines(name,id, type='engines', index){
      const _this = this;
      if(type === 'engines'){
        this.switchEngines[id].value = this.showSwitchedCategorys[index].engines[id].value;
        this.postEnginesSetting(name,id);
      }else { // 弹幕库设置更新
        this.switchDanmaku[id].value = this.showSwitchedCategorys[index].danmaku[id].value;
        this.postDanmakuSetting(name,id);
      }
      _this.showSwitchedCategorys.forEach(function(v,index,arr){
        arr[index].engines = _this.getCategoriedSwitches('engines',v.type);
        arr[index].danmaku = _this.getCategoriedSwitches('danmaku',v.type);
      });
      
      this.$emit("addAction","settingUpdate"); // 添加 更新设置项 队列消息
    },
    getCategoriedSwitches:function(postType, categoryName){
      var currentCategory = {};
      if(postType==='danmaku'){
        for(let index in this.switchDanmaku){
          if( _.indexOf(this.switchCategorys[categoryName], this.switchDanmaku[index].name)===-1) continue;
          currentCategory[index] = {name:this.switchDanmaku[index].name,value:this.switchDanmaku[index].value,type:postType};
        };
      }else{
        for(let index in this.switchEngines){
          if( _.indexOf(this.switchCategorys[categoryName], this.switchEngines[index].name)===-1) continue;
          currentCategory[index] = {name:this.switchEngines[index].name,value:this.switchEngines[index].value,type:postType};
        };
      }
      return currentCategory;
    },
    generateRandomColor:function(){
      return this.randomColor[~~(this.randomColor.length*Math.random())];
    },
    queuePostOptions:async function(category, on = true){
      const _this=this;
      async function differencePost(categoryToShow, on = true){
        var danmakuDifference=_.assign(_.cloneDeep(categoryToShow.danmaku),_.cloneDeep(_this.switchDanmaku));
        danmakuDifferent.forEach(function(v,i,arr){
          if(v.hasOwnProperty('type') && v.value!==on){
            _this.postDanmakuSetting(v.name, i);
          }
        });
        var enginesDifference=_.assign(_.cloneDeep(categoryToShow.engines),_.cloneDeep(_this.switchEngines));
        danmakuDifferent.forEach(function(v,i,arr){
          if(v.hasOwnProperty('type') && v.value!==on){
            _this.postEnginesSetting(v.name, i);
          }
        });
      }
      for(let i=0;i<this.showSwitchedCategorys.length;i++){
        if(this.showSwitchedCategorys[i].type===category){
          differencePost(this.showSwitchedCategorys[i], on);
          break;
        }
      }
    }
  },
  computed:{
    getRandomColor:{
      get:function(){
        return this.randomColor[~~(this.randomColor.length*Math.random())];
      }
    }
  },
  created(){
    var _this = this;
    this.get_bangumi();
    setTimeout(function(){
      _this.getEngines();
      _this.lzyplayHistory = JSON.parse(_this.lzyReadPlayerSets("playHistory")) || []; // load失败时保持自身类型不变（array），否则后面报错null无length属性
    },999);
  }
};
</script>
<style scoped>
.lzycarousel{
  box-shadow: 3px 3px 10px black;
  border-radius: 15px;
}
.welcomeHead {
  position: relative;
  margin: 20px auto;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 8px solid pink;
  animation-duration: 2s;
  animation-timing-function: linear;
}
.helloPanel{
  display:block;
  margin-top: 36px; 
  text-align:left;
}
.helloPanelItem{
  display: inline-block;
  margin: auto 8px;
  vertical-align: top;
}
.historyItem{
  display:inline-block;
  padding: 3px 9px;
  text-indent:0!important;
  border-radius: 5px;
}
.historyItem span{
  display:inline-block;font-size:18px;vertical-align:top;margin-left:5px;padding:0 4px;cursor:pointer;color:#ff4e4e;
}
.historyItem:hover{background: #fce2e7;}
.lzyHead{font-size: 16px;margin-bottom: 0;padding-left: 14px;border-left: 4px solid pink;}

.lzyalign-left{
  text-align: left;
  text-indent: 2em;
}
.fastSettings{display: inline-block;margin: auto 2px;}

.bangumi{
  cursor: pointer;
}

/* 段落文字前的伪元素小标签 */
.engineP,.searchHistoryP{position: relative;}
.engineP::before{
  content: 'Engine';
  position: absolute;
  left:-2em;
  display: inline-block;
  padding: 2px 1px;
  text-align: center;
  font-size: 12px;
  background: #fa5363;
  color:#fff;
  border-radius: 4px;
}
.searchHistoryP::before{
  content: "history";
  position: absolute;
  left:-2em;
  display: inline-block;
  padding: 2px 1px;
  text-align: center;
  font-size: 12px;
  background: #fa5363;
  color:#fff;
  border-radius: 4px;
}
</style>

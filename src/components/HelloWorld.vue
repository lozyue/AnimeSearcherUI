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
                  <!-- <v-img
                    class="white--text align-end"
                    max-width="300px"
                    src="https://img.xjh.me/random_img.php?return=302&type=bg&ctype=acg"
                    https://5200.pro/wp-content/uploads/2020/02/IMG_151.jpg
                    https://5200.pro/wp-content/uploads/2020/03/79690646_p0-副本.jpg
                  > -->
                  <v-img
                    class="white--text align-end"
                    max-width="300px"
                    lazy-src="../assets/images/history.jpg"
                    :src="['','','https://img.xjh.me/desktop/bg/acg/53428466_p0.jpg','','','https://img.xjh.me/desktop/bg/acg/53428466_p0.jpg','https://img.xjh.me/desktop/bg/acg/64090690_p0.jpg','https://img.xjh.me/random_img.php?return=302&type=bg&ctype=acg'][~~(Math.random()*7)]"
                  >
                    <v-card-title>AnimeSercher动漫站</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pb-0">Made with ♡</v-card-subtitle>
                  <v-card-text class="text--primary">
                    <div>响应式路由导航</div>
                    <div>多重资源引擎 灵动交互</div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <v-timeline-item icon="mdi-television-box" small>
                <v-card>
                  <v-card-subtitle>See See TV?</v-card-subtitle>
                  <v-card-subtitle max-width="120px"><v-img src="../assets/images/TVlogo.png"></v-img></v-card-subtitle>
                  <v-card-subtitle class="lzylink" @click="$router.push('/tvlive')"><v-icon>mdi-cctv</v-icon>点我看电视</v-card-subtitle>
                </v-card>
              </v-timeline-item>
              <v-timeline-item
                icon-color="#fff"
                color="#E91E63"
                small
                v-for="(data,index) in lzyUpdateMsg" :key="index"
              >
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
          <v-col cols="3">
            <div>
              <span title="上一周" @click="bangumi.current>0?bangumi.current--:bangumi" style="float:left;cursor:pointer;"><v-icon :color="bangumi.current>0?'rgb(255, 82, 82)':'lightgray'">mdi-skip-previous</v-icon></span>
              <span style="font-weight:500;color:#de4077">新番表</span>
              <span title="下一周" @click="bangumi.current<bangumi.total.length-1?bangumi.current++:bangumi" style="float:right;cursor:pointer;"><v-icon :color="bangumi.current<bangumi.total.length-1?'rgb(255, 82, 82)':'lightgray'">mdi-skip-next</v-icon></span>
            </div>
                <v-card @click="$router.push('/result/'+data.title.trim().replaceAll('/',' '))" class="bangumi pb-4" v-for="(data,index) in bangumi.total[bangumi.current].updates" :key="index">
                  <v-img :src="data.cover" max-width="300px" class="mx-auto mt-2"></v-img>
                  <v-card-subtitle><span style="float:left;"><span>更新至:</span> {{data.update_to}}</span><span style="float:right;"><time>{{bangumi.today===bangumi.current?data.update_time.slice(10):data.update_time.slice(0,10)}}</time></span></v-card-subtitle>
                  <div class="" style="clear:both;font-size:14px">{{data.title}} </div>
                </v-card>
          </v-col>
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
                  <v-expansion-panels :value="0">
                    <v-expansion-panel
                      v-for="(item,index) in showSwitchedCategorys"
                      :key="index"
                    >
                      <v-expansion-panel-header>
                        <p class="lzyHead" :style="`border-color:${getRandomColor}`">
                          <span>{{item.name}}</span>
                          <!-- <span style="float:right">
                              <v-switch @click="categoryControls[item.type]=!categoryControls[item.type]"></v-switch>
                              <span>一键开关</span>
                          </span> -->
                        </p>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <span class="fastSettings" v-for="(data,i) in item.engines" :key="i">
                          <v-switch dense
                            class="ma-0"
                            color="primary"
                            v-model="data.value"
                            :label="data.name"
                            title="引擎开关"
                            @click.stop="saveEngines(data.name, i, 'engines', index)"
                          ></v-switch>
                        </span>
                        <v-divider></v-divider>
                        <span class="fastSettings" v-for="(data,i) in item.danmaku" :key="-i">
                          <v-switch dense
                            color="#eab4f8"
                            class="ma-0"
                            v-model="data.value"
                            :label="data.name"
                            title="弹幕开关"
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
                    <a :title="data.engine+' '+data.date" @click="!data.url?$emit('search',data.name):$router.push(data.url)">
                      『{{data.name}}』<b style="color:#eaf;">{{data.episode}}</b> <span style="color:pink">{{lodash.getTimeByFloat(data.currentTime)}}</span>
                    </a>
                    <span title="删除" @click='lzyplayHistory = lzyplayHistory.slice(0,i).concat(lzyplayHistory.slice(i+1,lzyplayHistory.length) ),$emit("lzyglobalSettings","playHistory","lazySet",JSON.stringify(lzyplayHistory))' >
                      ✖
                    </span>
                  </div>
                  <div v-show="history.length>0"><v-btn @click='lzyplayHistory=[],$emit("lzyglobalSettings","playHistory","lazySet",null)' text><span style="color:red;font-size:16px">清空记录</span><v-icon color="gray">mdi-delete</v-icon></v-btn></div>
                  <div v-show="history.length==0">无</div>
                </v-card-text>
              </v-card>
              <!-- 新番表 -->
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
              <!-- 食用小技巧 -->
              <v-card max-width="100%" class="mt-8 pb-3 helloPanelItem">
                <v-card-subtitle ><p class="lzyHead" :style="`border-color:${generateRandomColor()}`">食用小技巧：</p></v-card-subtitle>
                <v-card-text style="max-height:300px;overflow-y:scroll" class="lzyalign-left">
                  <div class="">『搜索记录』<i>为什么没有搜索记录？</i>只有在搜索结果页<b>点击动漫标题的方式</b>会产生记录(在当前页加载的成功搜索),而点击图片会在新标签页中打开，此时不会留下搜索记录</div>
                  <div>『页面跳转』点击顶栏小电视图标会直接返回主页，而点击AnimeSearcher大字标题会在新窗口打开</div>
                  <div style="margin-top:16px;border-left:3px gray solid;font-weight:bold;border-radius:5px;padding-left:5px;text-indent:0">播放器使用小提示：</div>
                  <div><code>卡点重载</code> 按钮：在网络故障或视频加载停顿时可以点击；重新搜索弹幕并选择弹幕库后点击可以触发自动匹配 </div>
                  <div>播放页按 <code>F</code> 和 <code>W</code> 可以分别快速切换浏览器全屏和网页全屏</div>
                  <div>手动选择的弹幕库会被调优到前面</div>
                  <div time="2020-12-13">支持弹幕合并啦！可以按紫色的<code>外挂额外弹幕</code>按钮试试吧</div>
                  <div>在 <kbd>宽屏模式</kbd> 和 <kbd>Full Mode</kbd> 下视频组件层中滚动鼠标可以调整音量</div>
                  <div>新增播放快捷键: <code>[</code> 多P切换上一集; <code>]</code> 多P切换下一集</div>
                </v-card-text>
              </v-card>
              <!-- 温馨提示 和其他说明 -->
              <v-card max-width="100%" class="mt-8 pb-3 helloPanelItem">
                <v-card-subtitle ><p class="lzyHead" :style="`border-color:${generateRandomColor()}`">温馨提示和一些其他说明：</p></v-card-subtitle>
                <v-card-text style="max-height:300px;overflow-y:scroll" class="lzyalign-left">
                  <div><code>夜间模式</code>:点击左下角切换主题组件中的小齿轮可以快速切换，而[其他设置项]面板中的按钮需要刷新后才见效</div>
                  <div>『引擎管理』关闭一些不常用的资源引擎可以加速搜索响应，但也会使获取的内容变少</div>
                  <div>『引擎管理』弹幕源或者资源引擎<b>至少保留一个</b>，否则搜索总为空哦</div>
                  <div>『代理路线』<s>视频观看的代理路线出错时会自动切换，暂时手动切换会卡住需要点击卡点重载</s> 目前删除了手动切换选项，播放错误时会自动应用代理路线</div>
                  <div>『历史记录』视频观看历史采用本地数据保存，最多保存32个哦</div>
                  <div>由于抓取数据的特殊性，<s><b>所有视频观看链接仅临时有效</b>，所以无法保存观看链接</s> 现已增强历史记录实现，观看链接可保存</div>
                  <div><s>进入视频详情页会预加载弹幕库数据，过快点击播放视频可能导致弹幕库加载失败，请手动辅助选择</s></div>
                  <div>资源引擎 <code>eyunzhu</code> 、 <code>meijuxia</code> 视频常有不雅水印，建议关闭</div>
                  <div>弹幕源 <code>bahamut</code> 多为港澳台地区繁体弹幕，加载速度较慢，建议关闭</div>
                  <div>Firefox中视频播放页快捷键 <code>F</code> 偶尔失效？这源于一个<a target="_blank" href="https://www.imooc.com/wenda/detail/604596">古老的bug</a>，<s>暂无妙招修复，一般等待视频加载完触发点击事件后全屏快捷键可生效</s> 已修复，没有聚焦视频时不会响应全屏快捷键，不过为此加入了沉浸状态下自动focus</div>
                  <div>由于视频层和弹幕列表的构造造成的固定事件响应顺序，当开启 <kbd>弹幕列表</kbd> 面板时，无法滚动调整音量</div>
                  <div>『用户体验改进计划』：使用的百度站长平台进行用户量检测，不会收集任何隐私数据。开启表示支持 让我们知道你在用~也能给我们继续维护的动力！</div>
                </v-card-text>
              </v-card>
              <!-- 其他设置项 -->
              <v-card max-width="100%" class="mt-8 helloPanelItem">
                <v-card-subtitle>
                  <p class="lzyHead" :style="`border-color:${getRandomColor}`">
                    <span>其他设置项</span>
                  </p>
                </v-card-subtitle>
                <v-card-text>
                  <span class="fastSettings">
                      <v-switch dense
                        class="ma-0"
                        color="rgb(255, 148, 85)"
                        v-model="someSettings.immerse"
                        label="沉浸模式"
                        @click.stop="lzyLazySets('immerse',someSettings.immerse)"
                      ></v-switch>
                      <v-switch dense
                        class="ma-0"
                        color="rgb(34,224,13)"
                        v-model="someSettings.darkMode"
                        label="夜间模式"
                        title="切换后刷新见效；建议点击左下角齿轮可以立即切换"
                        @click.stop="lzyLazySets('darkMode',someSettings.darkMode)"
                      ></v-switch>
                      <v-switch dense
                        class="ma-0"
                        color="primary"
                        v-model="someSettings.statistics"
                        label="用户体验改进计划"
                        @click.stop="lzyLazySets('statistics',someSettings.statistics)"
                      ></v-switch>
                  </span>
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
    lodash:{
      getTimeByFloat:function(currentTime){
        currentTime = parseInt(currentTime);
        let seconds = currentTime%60,
            minutes = ~~(currentTime/60)%60,
            hours = ~~(currentTime/3600);
        return `${currentTime>3600 ? (hours<10?('0'+hours):hours) + ':' : ''}${minutes<10?('0'+minutes):minutes}:${seconds<10?('0'+seconds):seconds}`;
      },
    },
    currentPath: window.location.pathname,
    lzycarousel: [
      {src:"https://ftp.bmp.ovh/imgs/2020/11/4f0a5fe8ca33a218.png",url:"全职高手"},
      {
        src: "https://puui.qpic.cn/vcover_hz_pic/0/324olz7ilvo2j5f1596864093269/498",
        url: "吞噬星空"
      },
      {
        src: "https://puui.qpic.cn/vcover_hz_pic/0/mzc00200fdthd811592992296818/498",
        url: "魔道祖师"
      },
      {src:'https://s3.ax1x.com/2020/11/21/D3EqTU.jpg',url:"姜子牙"},
    ],
    searchVal:{},
    randomStr:['异世界','小'],
    lzyUpdateMsg:[
      {title:'2021-01-12',lineOne:"发布v1.1.8版",lineTwo:"搜索结果异步显示；历史记录完整支持；修复部分问题；提升播放体验"},
      {title:'2021-01-06',lineOne:"内测v1.1.0体验版",lineTwo:"宽屏模式和弹幕列表来袭，播放器控制大修改，观番体验巨增！"},
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
    randomColor:['#adeecf','008891','#e8e9a1','#48426d','#ffc1b6','#ffcda3','#b088f9','#321f28','#a05344','#734046','#ffcbcb','#ff9a76','#ffeadb','lightblue','pink','#f44','wheat','rgb(255, 172, 122)','#ffc1b6',],
    switchCategorys:{  // 弹幕分类
      movie:['meijuxia','eyunzhu','k1080'],
      comic:['agefans','yhdm','bimibimi','zzfun','eyunzhu', 'bilibili','nieta',],
      soupOpera:['meijuxia', 'tencent','youku','k1080'],
      performance:['eyunzhu','meijuxia', 'bahamut'], // 关闭低的性能推荐（此选项放置建议关闭的拖慢性能和内容质量低下的引擎）
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
    },
    someSettings:{
      statistics: true,
      immerse: true,
      darkMode: false,
    }
  }),
  methods:{
    search: async function() {
      const res = await this.$http.get("/search/" + this.randomStr[~~(Math.random()*1000)%this.randomStr.length])
        .catch(function(e) {
          console.log(e);
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
    lzyLazySets:function(key, value){
      this.$emit("lzyglobalSettings",key,"lazySet",value);
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
      _this.someSettings.immerse = _this.lzyReadPlayerSets("immerse");
      _this.someSettings.statistics = _this.lzyReadPlayerSets("statistics");
      _this.someSettings.darkMode = _this.lzyReadPlayerSets("darkMode");
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
.historyItem > span{
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

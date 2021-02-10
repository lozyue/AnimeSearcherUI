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
          <v-col v-if="!$magic.isMobile()&&!$magic.isFlatPC()" cols="3">
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
          <!-- 新番表，本周 -->
          <v-col v-if="!$magic.isMobile()" cols="3">
            <div>
              <span title="上一周" @click="bangumi.current>0?bangumi.current--:bangumi" style="float:left;cursor:pointer;"><v-icon :color="bangumi.current>0?'rgb(255, 82, 82)':'lightgray'">mdi-skip-previous</v-icon></span>
              <span style="font-weight:500;color:#de4077">新番表</span>
              <span title="下一周" @click="bangumi.current<bangumi.total.length-1?bangumi.current++:bangumi" style="float:right;cursor:pointer;"><v-icon :color="bangumi.current<bangumi.total.length-1?'rgb(255, 82, 82)':'lightgray'">mdi-skip-next</v-icon></span>
            </div>
                <v-card @click="$router.push('/result/'+data.title.trim().replace(/[^\u4e00-\u9fa50-9a-zA-Z\-_]/g,' '))" class="bangumi pb-4" v-for="(data,index) in bangumi.total[bangumi.current].updates" :key="index">
                  <v-img :src="data.cover_url" max-width="300px" class="mx-auto mt-2"></v-img>
                  <v-card-subtitle><span style="float:left;"><span>更新至:</span> {{data.update_to}}</span><span style="float:right;"><time>{{bangumi.today===bangumi.current?data.update_time.slice(10):data.update_time.slice(0,10)}}</time></span></v-card-subtitle>
                  <div class="" style="clear:both;font-size:14px">{{data.title}} </div>
                </v-card>
          </v-col>
          <!-- 右侧内容 -->
          <v-col lg="6" md="9" sm="12">
            <!-- 走马灯 -->
            <v-carousel cycle interval="5000" class="mt-6 lzycarousel" hide-delimiters touchless :height="$magic.isMobile()?175:286" width="360">
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
              <!-- 搜索历史展示 -->
              <v-card max-width="100%" class="helloPanelItem mb-8">
                <v-card-subtitle><p class="lzyHead">近期搜索：<v-icon>mdi-history</v-icon></p></v-card-subtitle>
                <v-card-text>
                  <!-- 搜索历史控制组件封装 emit 事件传递给爷组件-->
                  <search-history
                    @dialog="(param)=>{$emit('dialog',param)}"
                    @notice="(...param)=>{param.unshift('message');$emit.apply(this, param)}"
                  ></search-history>
                </v-card-text>
              </v-card>
              <!-- 快捷弹幕引擎开关分类 -->
              <v-card max-width="100%" class="helloPanelItem">
                  <v-expansion-panels :value="0">
                    <v-expansion-panel
                      v-for="(item,index) in showSwitchedCategorys"
                      :key="index"
                    >
                      <v-expansion-panel-header>
                        <p class="lzyHead" :style="`border-color:${getRandomColor}`">
                          <span>{{item.name}}</span>
                        </p>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <span class="fastSettings" v-for="(data,i) in item.engines" :key="index.toString()+i.toString()">
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
                        <span class="fastSettings" v-for="(data,i) in item.danmaku" :key="index.toString()+(-1 - i).toString()">
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
                <v-card-subtitle><p class="lzyHead" style="border-color:#ff6e9f">近期观看：<v-icon>mdi-history</v-icon></p></v-card-subtitle>
                <v-card-text>
                  <!-- 观看历史控制组件封装 emit 事件传递给中央组件App-->
                  <play-history 
                    @dialog="(param)=>{$emit('dialog',param)}"
                    @notice="(...param)=>{param.unshift('message');$emit.apply(this, param)}"
                  ></play-history>
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
                  <div>『代理路线』<s>视频观看的代理路线出错时会自动切换，暂时手动切换会卡住需要点击卡点重载</s> 目前删除了手动切换选项，播放错误时会自动切换代理路线</div>
                  <div>『观看历史』视频观看历史采用本地数据保存，最多保存32个哦</div>
                  <div>『历史记录』更新后历史记录丢失？历史记录采用的是浏览器数据保存，更新时安装位置不同也会导致不同历史副本从而丢失，此外清空浏览器存储数据和换不同浏览器打开都会导致历史丢失</div>
                  <div>资源引擎 <code>eyunzhu</code> 、 <code>meijuxia</code> 视频常有不雅水印，建议关闭</div>
                  <div>弹幕源 <code>bahamut</code> 多为港澳台地区繁体弹幕，加载速度较慢，建议关闭</div>
                  <div>由于视频层和弹幕列表的构造造成的固定事件响应顺序，当开启 <kbd>弹幕列表</kbd> 面板时，无法滚动调整音量</div>
                  <div>『用户体验改进计划』：使用的百度站长平台进行用户量检测，不会收集任何隐私数据。开启表示支持 让我们知道你在用~也能给我们继续维护的动力！</div>
                  <div>『恢复历史按钮』:不是恢复当前被删除的历史记录，是恢复之前版本产生的历史记录</div>
                  <div> 本次更新由于部分核心重构的原因，历史数据与上次不互通。如果您的升级安装目录和之前一致且打开网页的浏览器相同，此段时间内又没有清理过浏览器存储数据的话，是可以通过历史记录卡片中提供的恢复历史按钮找回来的</div>
                  <div>『留言反馈』:<a href="https://github.com/zaxtyson/AnimeSearcher/issues" target="_blank">Github Issue[推荐]</a><span>、  </span><a href="https://gitee.com/zaxtyson/AnimeSearcher/issues" target="_blank">Gitee Issue</a><span>、  </span><a href="https://www.bilibili.com/read/cv9758415" target="_blank">小破站评论区[备选]</a></div>
                </v-card-text>
              </v-card>
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
                    <div>
                      <div>指定通信地址:</div>
                      <v-text-field
                        ref="server"
                        v-model="someSettings.server"
                        :rules="[
                        () => !!someSettings.server || '留空则使用默认地址' ,
                        () => /^http(?:s)?:\/\/(?:[^\W%]+?\.){1,3}[^\W%]+?(?:\:[0-9]{1,5})?\/?$/.test(someSettings.server) || '请输入完整的域名或服务器IP' ,
                        ]"
                        label="手动设置服务器地址"
                        placeholder="请以http或https开头"
                        counter="50"
                        required
                      ></v-text-field>
                      <v-btn
                        middle
                        title="保存服务器地址设置"
                        color="primary"
                        @click="setServer"
                      >
                        <v-icon left>mdi-target</v-icon>
                        Set
                      </v-btn>                  
                    </div>
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
import lzysearchHistory from '../auxiliary/blocks/manager/search-history.vue';
import lzyplayHistory from '../auxiliary/blocks/manager/play-history.vue'

export default {
  name: "HelloWorld",
  inheritAttrs: false,
  components:{
    "search-history": lzysearchHistory,
    "play-history": lzyplayHistory,
  },
  data: () => ({
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
      {title:'2021-02-10',lineOne:"发布v1.3.0正式版",lineTwo:"后端核心框架异步改造完成;前端播放器部分优化,即将进入UI重构"},
      {title:'2021-01-12',lineOne:"发布v1.1.8抢鲜版",lineTwo:"搜索结果异步显示；历史记录完整支持；修复部分问题；提升播放体验"},
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
      today:0,
      total:[{date:'',day_of_week:'',is_today:true,updates:[]}],
    },
    switchEngines:[],
    switchDanmaku:[],
    randomColor:['#adeecf','008891','#e8e9a1','#48426d','#ffc1b6','#ffcda3','#b088f9','#321f28','#a05344','#734046','#ffcbcb','#ff9a76','#ffeadb','lightblue','pink','#f44','wheat','rgb(255, 172, 122)','#ffc1b6',],
    switchCategorys:{
      movie:['k1080','eyunzhu','meijuxia'],
      comic:['yhdm','bimibimi','agefans','zzzfun', 'bilibili','tencent','nieta',],
      soupOpera:['k1080','meijuxia', 'tencent','youku',],
      performance:['eyunzhu','meijuxia', 'bahamut'],
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
    errorMessages:'替换个人默认服务器通信地址,用于服务器部署',
    someSettings:{
      statistics: true,
      immerse: true,
      darkMode: false,
      server: 'http://127.0.0.1:6001/',
    },
  }),
  methods:{
    setServer: function(){
      if(this.someSettings.server.length===0)
        this.someSettings.server = this.$options.data().someSettings.server;
      if(this.someSettings.server.charAt(this.someSettings.server.length - 1) !== '/'){
        this.someSettings.server += '/';
      }
      this.$http.defaults.baseURL = this.someSettings.server;
      this.$http.defaults.$baseSocket = 'ws://' + this.someSettings.server.replace(/(http(:?s)*:\/\/)/,'');
      this.$emit("lzyglobalSettings","server","set", this.someSettings.server);
      this.$emit("lzyglobalSettings","server","save");
      this.$emit("message","服务地址已保存,后续访问页面生效！","success",-1);
    },
    get_bangumi: async function(){
      const {data:res} = await this.$http.get("anime/bangumi/updates").catch(function(e){console.error(e)});
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
      this.$http.get('system/modules').then(function(res){
        if(typeof(res)==='undefined' || _.isEmpty(res.data) || !res.data.hasOwnProperty("anime") || !res.data.hasOwnProperty('danmaku') ) return _this.$emit("message","获取设置项失败,请确保服务端已运行!","error",2);
        
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
      const res =await this.$http.post('/system/modules',[{module:'api.anime.'+name,enable: this.switchEngines[id].value}]).catch(function(e){console.log(e);});
      if(res.status!=200){
        this.switchEngines[id].value=!this.switchEngines[id].value;
        this.$emit("message","设置失败！已撤销设置","error",2);
        return false;
      }
    },
    postDanmakuSetting:async function(name,id){
      const res = await this.$http.post('system/modules',[{module:'api.danmaku.'+name,enable: this.switchDanmaku[id].value}]).catch(function(v){console.log(v)});
      if(res.status!=200){
        this.switchDanmaku[id].value=!this.switchDanmaku[id].value;
        this.$emit("message","设置失败！已撤销设置","error",2);
      }
    },
    saveEngines(name,id, type='engines', index){
      const _this = this;
      if(type === 'engines'){
        this.switchEngines[id].value = this.showSwitchedCategorys[index].engines[id].value;
        this.postEnginesSetting(name,id);
      }else {
        this.switchDanmaku[id].value = this.showSwitchedCategorys[index].danmaku[id].value;
        this.postDanmakuSetting(name,id);
      }
      _this.showSwitchedCategorys.forEach(function(v,index,arr){
        arr[index].engines = _this.getCategoriedSwitches('engines',v.type);
        arr[index].danmaku = _this.getCategoriedSwitches('danmaku',v.type);
      });
      
      this.$emit("addAction","settingUpdate");
    },
    getCategoriedSwitches:function(postType, categoryName){
      var currentCategory = {};
      if(postType==='danmaku'){
        for(let index in this.switchDanmaku){
          if( _.indexOf(this.switchCategorys[categoryName], this.switchDanmaku[index].name)===-1) continue;
          currentCategory[index] = {
            name:this.switchDanmaku[index].name,
            value:this.switchDanmaku[index].value,
            type:postType
          };
        };
      }else{
        for(let index in this.switchEngines){
          if( _.indexOf(this.switchCategorys[categoryName], this.switchEngines[index].name)===-1) continue;
          currentCategory[index] = {
            name:this.switchEngines[index].name,
            value:this.switchEngines[index].value,
            type:postType
          };
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
    const _this = this;

    this.get_bangumi();
    setTimeout(function(){
      _this.getEngines();
      _this.someSettings.immerse = _this.lzyReadPlayerSets("immerse");
      _this.someSettings.statistics = _this.lzyReadPlayerSets("statistics");
      _this.someSettings.darkMode = _this.lzyReadPlayerSets("darkMode");
      _this.someSettings.server = _this.lzyReadPlayerSets("server") || _this.someSettings.server;
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
.lzyHead{font-size: 16px;margin-bottom: 0;padding-left: 14px;border-left: 4px solid pink;}

.lzyalign-left{
  text-align: left;
  text-indent: 2em;
}
.fastSettings{display: inline-block;margin: auto 2px;}

.bangumi, .bangumi .v-image__image{
  cursor: pointer;
  transition: all .5s linear;
}
.bangumi .v-image .v-image__image--cover:hover{
  transform: scale(1.05);
}
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
@media screen and (max-width: 500px){
  .welcomeHead{
    font-size:1.2em!important;
  }

}
</style>

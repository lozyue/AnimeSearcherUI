<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row>
          <h1 class="welcomeHead zoomInDown">
            <span class="green--text">Welcome</span>
            <span class="orange--text"> To </span>
            <span class="blue--text">AnimeSercher！</span>
          </h1>
        </v-row>
        <v-row>
          <!-- 左侧栏 -->
          <v-col cols="4">
            <v-timeline dense class="lightbule--text">
              <v-timeline-item
                icon="mdi-message-arrow-right-outline"
                icon-color="#fff"
                small
              >
                <span slot="opposite">Tus eu perfecto</span>
                <v-card
                  class="mx-auto"
                  max-width="400"
                >
                  <v-img
                    class="white--text align-end"
                    max-width="300px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  >
                    <v-card-title>AnimeSercher动漫站</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pb-0">Made with ♡</v-card-subtitle>
                  <v-card-text class="text--primary">
                    <div>响应式路由导航</div>
                    <div>四重资源引擎 资源丰硕</div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <v-timeline-item
                icon="mdi-message-arrow-right-outline"
                icon-color="#fff"
                small
                v-for="(data,index) in lzyUpdateMsg" :key="index"
              >
                <span slot="opposite">Tus eu perfecto</span>
                <v-card
                  class="mx-auto"
                  max-width="400"
                  
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
          <!-- 右侧内容 -->
          <v-col cols="8">
            <!-- 走马灯 -->
            <v-carousel cycle interval="5000" class="lzycarousel" hide-delimiters touchless height="386" width="420">
              <a
                v-for="(item,i) in lzycarousel"
                :key="i"
                :href="currentPath.length===1?'/#/result/'+item.url:currentPath+'#/result/'+item.url"
              >
                <v-carousel-item :src="item.src"></v-carousel-item>
              </a>
            </v-carousel>
            <!-- 说明信息 -->
            <v-spacer></v-spacer>
            <div class="helloPanel">
              <v-card max-width="46%" class="helloPanelItem">
                <v-card-subtitle ><p class="lzyHead">温馨提示：</p></v-card-subtitle>
                <v-card-text class="lzyalign-left">
                  <div>弹幕源或者资源引擎至少保留一个，否则搜索总为空哦</div>
                  <div>资源引擎<code>eyunzhu</code>视频常有不雅水印，默认关闭</div>
                  <div>弹幕源<code>bahamut</code>多为港澳台地区弹幕，加载速度较慢，可关闭</div>
                  <div>仅当在搜索结果页点击动漫标题在当前页加载的成功搜索会产生记录</div>
                  <div>点击顶栏小电视图标会直接返回主页，而点击大字标题会在新窗口打开</div>
                  <div>在切回浏览器继续视频观看时发现卡顿可以点击<code>卡点重载</code>按钮</div>
                </v-card-text>
              </v-card>
              <v-card max-width="46%" class="helloPanelItem">
                <v-card-subtitle><p class="lzyHead">近期搜索：</p></v-card-subtitle>
                <v-card-text>
                  <div class="lzyalign-left mb-2 historyItem" v-for="(data,i) in history" :key="i">
                    <a @click="$emit('search',data)">{{data}}</a><span title="删除" @click="$emit('setHistory','delete',data),$emit('setHistory','storage')" >x</span>
                  </div>
                  <div v-show="history.length>0"><v-btn @click="$emit('setHistory','clear')" text><span style="color:red;font-size:16px">清空记录</span><v-icon color="gray">mdi-delete</v-icon></v-btn></div>
                  <div v-show="history.length==0">无</div>
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
      {
        src: "http://css.njhzmxx.com/down/1/401210600851437.jpg",
        url: "从零开始"
      },
      {
        src:
          "https://puui.qpic.cn/vcover_vt_pic/0/m441e3rjq9kwpsc1575196882/0",
        url: "斗罗大陆"
      },
      {
        src: "http://css.njhzmxx.com/comic/image/j330785131874534.jpg",
        url: "异世界"
      },{
        src:"http://puui.qpic.cn/fans_admin/0/3_547607168_1578034589800/0",
        url:"东京食尸鬼"
      },{src:'http://pic.szjal.cn/img/661bc552fd3f1476dac9c49e95f374c3.jpg',url:"天气之子"}
      // {src:"",},
    ],
    searchVal:{},
    randomStr:['异世界','小'],
    lzyUpdateMsg:[
      {title:'2020-09-02',lineOne:'发布体验版v0.96,视频弹幕完成,观看体验提升',lineTwo:'开学临近,开发暂缓'},
      {title:'2020-08-27',lineOne:'前端UI基本完成，构建版本v0.90',lineTwo:'API核心结构改进，解析速度提升'},
      {title:'2020-08-24',lineOne:'lozyue参与项目重写前端UI',lineTwo:'引擎API核心不断改进，原项目<a href="https://github.com/zaxtyson/AnimeSearcherOld" target="_blank">AnimeSearcherOld</a>迁移至<a href="https://github.com/zaxtyson/AnimeSearcher" target="_blank">AnimeSearcher</a>'},
      {title:'2020-02-03',lineOne:'zaxtyson提交了FirstCommit',lineTwo:"项目AnimeSearcher诞生"}
    ],
  }),
  methods:{
    search: async function() {
      const res = await this.$http
        .get("/search/" + this.randomStr[~~(Math.random()*1000)%this.randomStr.length])
        .catch(function(e) {
          console.log(e);
        });
      // console.log(res);
      if (typeof res == "undefined" || _.isEmpty(res.data)) {
        // console.log('获取搜索结果失败！')
        this.emit('message',"获取搜索结果为空", "info");
        return false;
      }
      this.searchVal = res.data;
    },
  }
};
</script>
<style scoped>
.lzycarousel{
  box-shadow: 3px 3px 10px black;
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
</style>

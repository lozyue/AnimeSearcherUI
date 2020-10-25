<template>
  <v-container>
    <v-row justify="space-between">
      <!-- 侧边栏 -->
      <v-col cols="2">
          <section class="lzyLeftMenu">
            <div v-for="(data,index) in TVList" :key="index">
                <span class="listItem"><a @click="lzyplay(index)">{{data.name}}</a></span>
            </div>
          </section>
      </v-col>
      <v-col>
        <div id="tvplayer">
          <section style="margin: 0px auto;padding:10px 0px;"><section style="width: 100%;"><section style="width: 100%;display: flex;display: -webkit-flex;justify-content: center;-webkit-align-items: center; -webkit-justify-content: center;overflow: hidden;"><section style="border-bottom-left-radius: 6px;border-top-left-radius: 15px;text-align: center;flex:1;background:rgb(242, 101, 101);"><section style="border:10px solid transparent;border-right-width:48px;border-bottom-width:16px">
            <section style="border-radius:6px ;background:rgb(255,255,255);">
              <!-- 将Dplayer包裹到这个里面 -->
              <h4 class="player-head">{{playersettings.chanel}}</h4>
              <d-player
                ref="player"
                :lang="lang"
                :video="video"
                :contextmenu="contextmenu"
                :danmaku="danmaku"
                @error="lzyResponse()"
              ></d-player>
              <div class="lzyplayerFooter"></div>
            </section>
          </section></section><section style="width:25px;margin-left: -38px;margin-right:5px"><section style="width: 16px;height: 16px;border-radius:100%;background: #2e1d03;margin:7px auto;"></section><section style="width: 16px;height: 16px;border-radius:100%;background: #2e1d03;margin:7px auto;"></section><section style="width: 16px;height: 16px;border-radius:100%;background: #2e1d03;margin:7px auto;"></section><section style="width: 16px;height: 16px;border-radius:100%;background: #2e1d03;margin:10px auto;"></section><section style="width:90%;height: 2px;background: #2e1d03;margin: 10px auto 4px auto;"></section><section style="width:90%;height: 2px;background: #2e1d03;margin: 4px auto;"></section><section style="width:90%;height: 2px;background: #2e1d03;margin: 4px auto;"></section><section style="width:90%;height: 2px;background: #2e1d03;margin: 4px auto;"></section><section style="width:90%;height: 2px;background: #2e1d03;margin: 4px auto;"></section></section></section><section style="margin: 0px auto; display: flex;justify-content:center;margin-top: -1px;"><section style="width:1.5em;height:10px;background: #2e1d03;border-radius:2px;margin: auto;"></section><section style="width:1.5em;height:10px;background: #2e1d03;border-radius:2px;margin: auto;"></section></section></section></section>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logoImg from "@/assets/logo.png";
import VueDPlayer from "./vue-dplayer-raw.vue";
import _ from 'lodash';

export default {
  name: "TVLive",
  components: {
    "d-player": VueDPlayer
  },
  data: () => ({
    // 播放器参数
    video: {
      quality: [
        { name: "1080P", url: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'},
        { name: '代理', url: ''},
      ],
      pic: "",
      defaultQuality: 0,
      // thumbnails: logoImg,
      type: "auto"
    },
    lang: "zh-cn",
    logo: false,
    danmaku:{},
    contextmenu: [
      {
        text: "AnimeSercher",
        link: "https://github.com/zaxtyson/AnimeSearcher/",
      },
      {
        text: "API:zaxtyson",
        link: "https://github.com/zaxtyson/",
      },
      {
        text: "UI:Lozyue",
        link: "https://github.com/lozyue/",
      },
    ],
    // TV List 数据存储
    TVList:[],
    playersettings:{
        isProxy:false,
        chanel:'CCTV-1',
        video:{
            quality:[]
        },
    }
  }),
  methods:{
      getTVList(){
          const _this=this;
          this.$http.get("/live/list").then(function(res){
              if(res.status===200) _this.TVList = res.data;
          }).catch(function(e){console.error(e)});
      },
      lzyplay(index){
        this.playersettings.video={
            quality:[
                { name: "1080P", url: this.TVList[index].url},
                { name: '代理', url: this.TVList[index].proxy_player},
            ]
        };
        this.playersettings.chanel = this.TVList[index].name;
        if(this.playersettings.isProxy)
            this.$refs.player.dp.switchVideo(this.playersettings.video.quality[1]);
        else
            this.$refs.player.dp.switchVideo(this.playersettings.video.quality[0]); // 仅加载视频，暂不加载弹幕
        this.$refs.player.dp.seek(0);
        this.$refs.player.dp.play();
        // 展示当前播放信息
      },
      lzyResponse(){
          console.log("播放失败");
      }
  },
  created(){
      this.getTVList();
  }
};
</script>

<style scoped>
.lzyLeftMenu{
  max-height: 666px;
  overflow-y: scroll;
}
.listItem{
  display: inline-block;
  padding: 2px 4px;
  margin: 2px auto;
  border-radius: 5px;
}
.listItem:hover{
  background: #d5d5d5;
}

.player-head{
    margin: 5px auto;
    color: #21acff;
    padding-top: 6px;
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

</style>

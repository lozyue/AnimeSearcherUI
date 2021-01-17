<template>
  <d-player
    ref="player"
    @play="play"
    :logo="logo"
    :lang="lang"
    :video="video"
    :contextmenu="contextmenu"
  ></d-player>
</template>

<script>
import VueDPlayer from './vue-dplayer-raw.vue';
import logoImg from '@/assets/logo.jpg';

export default {
  name: "Dplayer",
  props:['playersettings','mytestStr'],
  components: {
    "d-player": VueDPlayer
  },
  data: () => ({

    playbackSpeed:[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    video: {
      quality: [
        {
          name: "720P",
          url: "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
        }
      ],
      pic: "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg",
      defaultQuality: 0,
      thumbnails: logoImg,
      type: "auto"
    },
    lang: "zh-cn",
    logo: logoImg,
    autoplay: false,
    player: null,
    danmaku:{
      bottom:'46px',
      addition:[], // 额外外挂弹幕，可以合并多个源
    },
    contextmenu: [
      {
        text: "AnimeSercher",
        link: "https://github.com/zaxtyson/AnimeSearcher/"
      },
      {
        text: "Zaxtyson",
        link: "https://github.com/zaxtyson/"
      },
      {
        text: "Lozyue",
        link: "https://github.com/lozyue/"
      }
    ]
  }),
  methods: {
    play() {
      console.log("play roll back");
      console.log(this.video.quality);
    }
  },
  mounted() {
    const player = this.$refs.player.dp;
  },
  watch:{
    mytestStr:function(newstr){console.log(newstr);},
    playersettings:function(set){
      console.log("设置发生了改变！")
      
      const player = this.$refs.player.dp;
      console.log(set);
      console.log(player)
      }
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
    width: 750px;
    margin: 0 auto 50px;
}
@media only screen and (max-width: 640px){
  .hello{
      width: 100%;
  }
}
</style>



<template>
  <div id="lzydplayer"></div>
</template>

<script>
import DPlayer from "dplayer"; // 直接安装dplayer

export default {
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "#FADFA3"
    },
    loop: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: "zh"
    },
    screenshot: {
      type: Boolean,
      default: false
    },
    hotkey: {
      type: Boolean,
      default: true
    },
    preload: {
      type: String,
      default: "auto"
    },
    contextmenu: {
      type: Array
    },
    logo: {
      type: String
    },
    danmaku:{
      type: Object
    },
    video: {
      type: Object
    }
  },
  data() {
    return {
      dp: null
    };
  },
  mounted() {
    if(player!==null) this.$forceUpdate();
    const player = (this.dp = new DPlayer({
      element: this.$el,
      autoplay: this.autoplay,
      theme: this.theme,
      loop: this.loop,
      lang: this.lang,
      screenshot: this.screenshot,
      hotkey: this.hotkey,
      preload: this.preload,
      contextmenu: this.contextmenu,
      logo: this.logo,
      danmaku:{
        id:this.danmaku.id,
        api:this.danmaku.api,
      },
      video: {
        pic: this.video.pic,
        defaultQuality: this.video.defaultQuality,
        quality: [
          {
            url: this.video.quality[0].url,
            name: this.video.quality[0].name
          },
          {
            url: this.video.quality[1].url,
            name: this.video.quality[1].name
          },
        ],
        thumbnails: this.video.thumbnails,
        type: this.video.type
      }
    }));
    player.on("play", () => {
      this.$emit("play");
    });
    player.on("quality_start", () => {
      this.$emit("quality_start");
      player.on("play");
    });
    player.on("pause", () => {
      this.$emit("pause");
    });
    player.on("canplay", () => {
      this.$emit("canplay");
    });
    player.on("fullscreen_cancel", () => {
      this.$emit("fullscreen_cancel");
    });
    player.on("fullscreen", () => {
      this.$emit("fullscreen");
    });
    player.on("playing", () => {
      this.$emit("playing");
    });
    player.on("ended", () => {
      this.$emit("ended");
    });
    player.on("error", (emsg) => {
      this.$emit("error",emsg);
    });
  },
  beforeDestroy(){
    this.$emit("beforeDestroy",false,this.dp.video.currentTime);
  },
};
</script>

<style>
</style>
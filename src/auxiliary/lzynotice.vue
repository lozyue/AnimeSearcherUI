<template>
  <div>
    <!-- 目前最多支持同时出现三个消息条，支持html，找不到更好的解决方案了；增加到支持四条 -->
    <div class="arrange">
      <transition name="lzynotice">
        <v-alert
          class="noticeBar"
          v-if="showNotice['info']"
          @click="lzynoticeCallback(showNoticeCallback['info'])"
          :type="type['info']"
          v-html="notice['info']"
          dense
          border="left"
        ></v-alert>
      </transition>
      <transition name="lzynotice">
        <v-alert
          class="noticeBar"
          v-if="showNotice['success']"
          @click="lzynoticeCallback(showNoticeCallback['success'])"
          :type="type['success']"
          v-html="notice['success']"
          dense
          border="left"
        ></v-alert>
      </transition>
      <transition name="lzynotice">
        <v-alert
          class="noticeBar"
          v-if="showNotice['warning']"
          @click="lzynoticeCallback(showNoticeCallback['warning'])"
          :type="type['warning']"
          v-html="notice['warning']"
          dense
          border="left"
        ></v-alert>
      </transition>
      <transition name="lzynotice">
        <v-alert
          class="noticeBar"
          v-if="showNotice['error']"
          @click="lzynoticeCallback(showNoticeCallback['error'])"
          :type="type['error']"
          v-html="notice['error']"
          dense
          border="left"
        ></v-alert>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "lzynotice",
  data: () => ({
    notice: { info: "", success: "", warning: "", error: "" },
    showNotice: { info: false, success: false, warning: false, error: false },
    showNoticeCallback: { info: [], success: [], warning: [], error: [] },
    type: {
      info: "info",
      success: "success",
      warning: "warning",
      error: "error",
    },
    snackMsgQueue: [[], [], [], []],
  }),
  methods: {
    /**
     * Notice 消息条显示函数
     * @param str {需要显示的消息文字}
     * @param type {消息条样式类型,支持`info`,`succese`,`warning`,`error`,`info`}
     * @param id {要显示消息条的轨道id，为提高复用性而设定。轨道最多支持4条(id=0,1,2,3)。应该按事件触发频率进行不同轨道分发，默认-1自动选择}
     * @param duration {消息条显示的持续时间，单位毫秒；@if 设置为0，则默认永久，并在点击事件触发时隐藏消息条}
     * @param onClick 第四个参数加入回调函数，可自定义点击事件触发时的动作(点击事件对整个消息条有效)
     * */
    lzynotice: function (
      str,
      type = "success",
      id = -1,
      duration = 3999,
      onClick = function () {}
    ) {
      var _this = this;
      var msgControl =
        id === 0 ? "info": 
        id === 1 ? "success": 
        id == 2 ? "warning": 
        id === 3 ? "error":
          "info";
      if (id > 3) {
        console.warn("暂最多同时只支持四个消息条");
      }else if(id<0){
        id = -1;
        for(let key in this.showNotice){
          if(this.showNotice[key]===false && key!=='error'){
            msgControl = key;
            break;
          }
          id++;
        }
        if( id<0 ){
          id = 0;msgControl = 'info';
        }
      }
      this.notice[msgControl] = str;
      this.type[msgControl] = type;
      this.showNotice[msgControl] = true;
      this.showNoticeCallback[msgControl].push(onClick);
      this.snackMsgQueue[id].forEach(function (handle) {
        clearTimeout(handle);
      });
      if (duration > 0) {
        this.snackMsgQueue[id].push(
          setTimeout(function () {
            _this.showNotice[msgControl] = false;
            _this.showNoticeCallback[msgControl] = [];
          }, duration)
        );
      } else {
        this.showNoticeCallback[msgControl].push(function () {
          _this.showNotice[msgControl] = false;
          _this.showNoticeCallback[msgControl] = [];
        });
      }
      return true;
    },
    lzynoticeCallback(callbackQueue) {
      var _self = this,
        _args = arguments;
      callbackQueue.forEach(function (v, i) {
        v.apply(_self, _args);
      });
    },
    clearMsgError(){
      this.snackMsgQueue[3].forEach(function(handle) {
        clearTimeout(handle);
      });
      this.showNotice['error'] = false;
      this.showNoticeCallback['error'] = [];
    },
    clearMsgAll(){
      var _this = this;
      this.snackMsgQueue.forEach(function(tunnel,id){
        tunnel.forEach(function(handle){
          clearTimeout(handle);
        })
        let msgControl = id===0?'info':id===1?'success':id==2?'warning':id===3?'error':'info';
        _this.showNotice[msgControl] = false;
        _this.showNoticeCallback[msgControl] = [];
      });
    }
  },
};
</script>

<style scoped>
.arrange{
  display:block;
}
.noticeBar {
  position: relative;
  top: 30px;
  display: block;
  margin: 10px auto;
  opacity: 0.8;
  z-index: 9999;
  user-select: none;
}
.lzynotice-enter-active {
  transition: all 0.4s ease;
}
.lzynotice-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.lzynotice-enter {
  transform: translateX(-200px);
  opacity: 0;
}
.lzynotice-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
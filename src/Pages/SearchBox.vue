<template>
  <v-row
    no-gutters
    align="center"
    justify="center"
    class="mt-12"
  >
    <v-col lg="5" md="8" sm="12" style="max-width:90%;margin:auto">
      <v-row>
        <v-col cols="11">
          <v-text-field
            label="输入影视名称"
            outlined
            clearable
            autofocus
            small
            :hint="searchHint"
            style="position: relative"
            prepend-inner-icon="mdi-television-classic"
            v-model="searchStr"
            v-on:keyup.enter="
              ($route.path.indexOf('/details') !== -1 &&
                $route.path.replace('/details/', '').lastIndexOf('/') !== -1 &&
                onSearch(null, 'new')) ||
                onSearch()
            "
          >
          </v-text-field>
          <!-- 搜索历史展示区域 -->
          <v-card v-show="showHistory" class="searchFields">
            <ul>
              <transition-group name="lzysearchlist">
                <li v-for="(data, index) in searchHistory.historylist" :key="index">
                  <v-icon>mdi-history</v-icon>{{ data }}
                </li>
              </transition-group>
            </ul>
          </v-card>
        </v-col>
        <v-col cols="1" align="left" class="mb-6">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                @click="onSearch()"
                dark
                v-bind="attrs"
                class="ml-2"
                v-on="on"
                large
                style="position:relative;top:10px;left:-25px"
              >
                <v-icon large>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>按回车键可发起搜索</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import _ from "lodash";

export default {
  name: "lzySearchBox",
  props:["searchControl"],
  data: () => ({
    searchStr: "",
    searchHint:"点击搜索开启追番追剧亦或追电影之旅",
    showHistory: false,
    searchHistory:{record:true, historylist:[]},
  }),
  methods: {
    onSearch: function(str=null, newTable='') {  
      this.searchStr =  str!==null ? str : !!this.searchStr ? this.searchStr : '异世界';
      if (this.$route.path.indexOf("/result") === -1){
        if(newTable==='new'){
          window.open( (this.currentPath.length===1?'/#':this.currentPath+'#')+'/result/'+this.searchStr);
          return true;
        }
        this.$router.push("/result/"+ this.searchStr );
        return false;
      }
      if(newTable==='new'){
        window.open( (this.currentPath.length===1?'/#':this.currentPath+'#')+'/result/'+this.searchStr);
        return true;
      }
      this.searchControl.searching = Math.random()+1;
      this.socket_search(this.searchStr);

      this.$emit("addAction","indicatorAdjust",120);
      this.$emit("addAction","hide_settings");
      return true;
    },
    socket_search: function(str){
      const _this=this;
      
      _this.searchControl.searchVal = [];
      try{
        var ws = new WebSocket(this.$http.defaults.$baseSocket+"anime/search");
        ws.onopen = function (evt) {
            ws.send(str);
        };
        ws.onmessage = function (evt) {
            _this.searchControl.searchVal.push( JSON.parse(evt.data) );
            _this.$emit("addAction","indicatorAdjust",120);
            ws.send("ok");
        };
        ws.onclose = function (evt) {
            _this.searchControl.searching = 0;
        };
      }catch(e){
        console.error(e);
      }
      
    },
    search: async function(str) {
      const _this=this;
      const res = await this.$http
        .get("anime/search/" + (str) )
        .catch(function(e) {
          _this.lzymessage("获取搜素结果失败", "error");
          _this.searchControl.searchVal = [];
        });
      if (!res || _.isEmpty(res.data)) {
        this.lzymessage("获取搜索结果为空", "info");
        this.searchControl.searchVal = [];
        return false;
      }
      this.searchControl.searchVal = res.data;
    },
    lzysetSearchHistory(mode='new', appendStr=''){
      switch(mode){
        case 'new':{
          let tempIndex=-1;
          this.searchStr = this.searchStr || appendStr;
          if(!this.searchStr || !_.isEmpty(this.searchStr) ){
            this.searchStr = _.trim(this.searchStr);
            tempIndex = _.indexOf(this.searchHistory.historylist, this.searchStr);
            if( tempIndex > -1 ){
              this.lzysetSearchHistory('delete');
            }
            this.searchHistory.historylist.unshift(this.searchStr );
          }else{
          }
          break;
        }
        case 'load':{
          this.historyStorage.load();
          break;
        }
        case 'delete':{
            this.searchHistory.historylist = _.pull(this.searchHistory.historylist, this.searchStr);
            this.searchHistory.historylist.reverse().reverse();
          break;
        }
        case 'storage':{
          this.historyStorage.save();
          break;
        }
        case 'clear':{
          this.historyStorage.clear();
          break;
        }
      }
    },
  },
  computed:{
    computedHistory:function(){
      var _this=this;
      return this.searchHistory.historylist.filter(function(item){
        return item.indexOf(_this.searchControl.searchVal)!==-1;
      });
    }
  },
  watch:{
    searchStr(value){
      if(!value) return false;
      if(value.length<2) this.searchHint = "搜索动漫、电影、电视剧、韩剧、欧美大片";
      if(value.length>2 && this.$route.path.indexOf('/details')!==-1){
        this.searchHint = "发起搜索后会在展示并覆盖当前页结果";
      }
      if(value.length>7){this.searchHint = "使用精简的关键词更容易搜索到目标内容哦！"}
      return value?value+'':'';
    }
  },
  beforeCreate(){
    this.currentPath = window.location.pathname;
  },
  created() {
    const _this = this;
    this.historyStorage = new this.$magic.lzystorage("lzysearch-history",_this.searchHistory);
    this.lzysetSearchHistory('load');
  },
  mounted() {},
};
</script>

<style scoped>

.searchFields{
  position: absolute;
  max-height: 475px;
}
.searchFields ul{margin:0;padding: 8px 12px;}
.searchFields ul li{
  list-style: none;
  display:block;
}
.searchFields ul li:hover{background: #fff;border:1px solid gray}
</style>

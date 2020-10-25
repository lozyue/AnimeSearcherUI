<template>
  <div class="home">

    <v-container>
      <v-row>
        <p class="results" v-html="searchStatu"></p>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="boxw">  
              <v-row v-if="loading" align="center" justify="space-around">
                <v-sheet
                  v-for="i in 12" :key=i
                  class="px-3 pt-3 pb-3 col col-3 bg-0"
                  color="lighten-4"
                >
                  <v-skeleton-loader class="mx-auto" max-width="300" type="image, article"></v-skeleton-loader>
                </v-sheet>
              </v-row>
              <v-row v-else align="center" justify="space-around">
              <v-card class="lzycontainer" transition="v-scale-transition" v-for="(item, i) in searchBack" :key="i">
                <a
                  class="lzylink"
                  target="_blank"
                  :href="currentPath.length===1?'/#/details'+item.url.substr(item.url.lastIndexOf('/')):currentPath+'#/details'+item.url.substr(item.url.lastIndexOf('/') )"
                >
                  <v-img
                    :src="!!item.cover_url?item.cover_url:null"
                    lazy-src="../assets/default-cover.png"
                    class="urlimg lzycardcover white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="270px"
                  >
                    <v-row
                      align="center"
                      justify="center"
                      class="lightbox white--text pa-4 pt-0 pb-0 fill-height"
                    >
                      <v-col class="lzydescription">
                        <div class="lzytext white--text" v-html="item.description?item.description:'简介走丢了，点进去看看'"></div>
                      </v-col>
                    </v-row>
                  </v-img>
                </a>
                <div class="lzytitle">
                  <a class="lzylink"
                    :href="currentPath.length===1?'/#/details'+item.url.substr(item.url.lastIndexOf('/')):currentPath+'#/details'+item.url.substr(item.url.lastIndexOf('/') )"
                    :title="item.title"
                  >《{{item.title}}》</a>
                </div>

                <v-card-actions class="mt-0 pt-0">
                  <v-spacer></v-spacer>
                  <v-row no-gutters align="center" justify="space-between" class="meta">
                    <v-col>
                      <span title="资源引擎">
                        <v-icon color="red">mdi-hammer-screwdriver</v-icon>
                        {{item.engine.substr(item.engine.lastIndexOf('.')+1,item.engine.length)}}
                      </span>
                    </v-col>
                    <v-col md="6">
                      <span title="分类">
                        <v-icon color="red">mdi-folder-heart-outline</v-icon>
                        {{item.category}}
                      </span>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
              </v-row>
            
            
          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  props: ["searchVal","searching"],
  // components: {
  //   HelloWorld
  // },
  data: () => ({
    myflex: 4,
    searchStatu: "",
    searched: false,
    searchBack: [],
    currentPath: window.location.pathname,
    
    loading : true,
    // Vuetify components provide
    // a theme variable that is
    // used to determine dark
    // inject: ["theme"],
  }),
  methods: {
    getDetail: function(url) {
      this.$router.push("/details" + url.substr(url.lastIndexOf("/")));
    }
  },
  created() {
    if (this.searched) this.searchStatu = "正在搜索……";
    else{
      if(this.$route.params.search!==null && this.$route.params.search){
        this.$emit('search',this.$route.params.search)
      }else{
        this.$router.push('/index');
      }
      this.searchStatu = "输入关键字然后 Go Search 吧！";
      // this.loading = false;
    }
    // 增加用户活动值
    this.$emit("addAction","userFocus");
  },
  watch: {
    searchVal: function(val) {
      this.searched = true;
      this.searchBack = val;
      this.searchStatu =
        '共找到搜索结果：<span style="color:blue">' + val.length + "</span> 条";
      this.loading = false;
    },
    searching: function(val){
      console.log('searching你变了很多'+val)
      if(val){
        this.loading = true;
        this.searched = true;
        this.searchStatu = "正在搜索……";
      }else{
        this.loading = false;
        this.searched = false;
      }
    }
  },
  destroyed(){
    this.$emit('addAction','userNoFocus');
  }
};
</script>
<style scoped>
.box {
  /* max-height: 400px; */
  min-width: 300px;
  margin: 10px auto;
  z-index: 1;
}
.box:hover .v-card {
  z-index: 9;
}
.results {
  margin: 20px 10px;
}
.urlimg {
  cursor: pointer;
}
.lzycontainer {
  margin: 10px 6px;
  width: 270px;
  border-radius: 15px;
  /* min-width: 300px; */
}
.meta {
  font-size: 12px;
  width: 100%;
}
.lzytext {
  opacity: 0;
  transition: all 0.6s;
  background: rgba(41, 41, 41, 0.56);
  border-radius: 8px;
}
.lzydescription{margin-bottom: 12px}
.lzydescription:hover .lzytext,
.lzycontainer:hover .lzydescription .lzytext {
  opacity: 1;
  animation: bounceInUp 0.6s linear;
}
.meta span,
.meta i {
  vertical-align: middle;
}
.t-indent {
  text-indent: 1em;
}
.paddingb-0 {
  padding-bottom: 3px !important;
}
.lzycardcover {
  transition: all 0.6s linear;
  border:1px solid gray;
  border-bottom: none;
  border-radius: 15px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.lzycardcover:hover div {
  transform: scale(1.05);
}
.lzytitle {
  padding: 6px;
  font-size: 16px;
  margin: 0 auto auto 10px;
  /* height: 30px; */
  overflow: hidden;
  text-overflow: ellipsis;
}
.lzytitle a.lzylink{
  font-size: 14px;
}
.lzytext {
  padding: 6px 12px;
  margin: auto 12px;
  vertical-align: middle;
  font-size: 14px;
  text-indent: 1em;
}
</style>

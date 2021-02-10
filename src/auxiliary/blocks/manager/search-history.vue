<template>
    <div>
        <div class="lzyalign-left mb-2 historyItem" v-for="(data,i) in searchHistory.historylist" :key="i">
            <a @click="$router.push('/result/'+data)">{{data}}</a><span title="删除" @click="deleteHistory(i)" >✖</span>
        </div>
        <div>
            <v-btn @click="historyMigration" text>
                <span style="color:lightgreen;font-size:14px">迁移本地搜索记录(临时)</span><v-icon color="green">mdi-backup-restore</v-icon>
            </v-btn>
        </div>
        <div v-show="searchHistory.historylist.length>0"><v-btn @click="clearSearchHistory()" text><span style="color:red;font-size:16px">清空记录</span><v-icon color="gray">mdi-delete</v-icon></v-btn></div>
        <div v-show="searchHistory.historylist.length==0">
            无（搜索后点击结果卡片标题的方式才产生搜索记录！）
        </div>
    </div>
</template>

<script>
export default {
    name:"lzysearch-history",
    data:()=>({
        searchHistory:{
            record: true,
            historylist:[]
        },
    }),
    methods:{
        deleteHistory(index){
            this.searchHistory.historylist.splice(index,1);
            this.historyStorage.lazySave();
        },
        clearSearchHistory(){
            const _this = this;
            this.$emit("dialog",{
                confirm:()=>{
                    _this.searchHistory.historylist = [];
                    _this.historyStorage.lazySave();
                },
                content:"确定要清空所有搜索历史记录？",
                confirmBtn:"确定",
                cancelBtn:"再想想"
            });
        },
        historyMigration(){
            const _this = this;
            var searchHistory = JSON.parse(window.localStorage.getItem("searchHistory") );
            if(!searchHistory){
                this.$emit("notice","没有找到可迁移的搜索历史记录！","warning",-1);
                return false;
            }
            this.$emit("dialog",{
                confirm:()=>{
                    _this.searchHistory.historylist = _this.searchHistory.historylist.concat(searchHistory);
                    _this.historyStorage.save();
                },
                content:`共找到原先搜索历史${searchHistory.length}条，是否需要执行搜索历史记录合并？<br>注意：不要重复合并操作`,
                confirmBtn:"合并",
                cancelBtn:"取消"
            });
        },
    },
    created(){
        const _this = this;
        this.historyStorage = new this.$magic.lzystorage("lzysearch-history",_this.searchHistory);
        this.historyStorage.load();
    },
    mounted(){

    },
}
</script>

<style scoped>

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
</style>

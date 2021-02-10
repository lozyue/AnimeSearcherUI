<template>
    <div>
        <div class="lzyalign-left mb-2 historyItem" v-for="(data,i) in lzyplayHistory.historylist" :key="i">
            <!-- <a :title="data.engine+' '+data.date" @click="$emit('search',data.name)"> -->
            <a :title="data.engine+' '+data.date" @click="!data.url?$router.push('/result/'+data):$router.push(data.url)">
                『{{data.name}}』<b style="color:#eaf;">{{data.episode}}</b> <span style="color:pink">{{$magic.formatDurationTimeByFloat(data.currentTime)}}</span>
            </a>
            <span title="删除" @click='deleteHistory(data)' >
                ✖
            </span>
        </div>
        <div>
            <v-btn @click="historyMigration" text>
                <span style="color:lightgreen;font-size:14px">迁移本地观看记录(临时)</span><v-icon color="green">mdi-backup-restore</v-icon>
            </v-btn>
        </div>
        <div v-show="lzyplayHistory.historylist.length>0"><v-btn @click='clearPlayHistory' text><span style="color:red;font-size:16px">清空记录</span><v-icon color="gray">mdi-delete</v-icon></v-btn></div>
        <div v-show="lzyplayHistory.historylist.length==0">无</div>
    </div>
</template>

<script>
export default {
    name:"lzyplay-history",
    data:()=>({
        lzyplayHistory:{
            record: true,
            historylist:[]
        },
    }),
    methods:{
        deleteHistory(index){
            this.lzyplayHistory.historylist.splice(index,1);
            this.historyStorage.lazySave();
        },
        clearPlayHistory(){
            const _this = this;
            this.$emit("dialog",{
                confirm:()=>{
                    _this.lzyplayHistory.historylist = [];
                    _this.historyStorage.lazySave();
                },
                content:"确定要清空所有播放记录？",
                confirmBtn:"确定",
                cancelBtn:"考虑一下"
            });
        },
        historyMigration(){
            const _this = this;
            var playSettings = JSON.parse(window.localStorage.getItem("lzysettings") );
            if(!!playSettings && !!playSettings.playHistory) playSettings = JSON.parse(playSettings.playHistory);
            else{
                _this.$emit("notice","没有找到可迁移的浏览器观看历史记录！","warning",-1);
                return;
            }
            this.$emit("dialog",{
                confirm:()=>{
                    playSettings = playSettings.map((item)=>{
                        item.url = '';
                        return item;
                    });
                    _this.lzyplayHistory.historylist = _this.lzyplayHistory.historylist.concat(playSettings);
                    _this.historyStorage.save();
                },
                content:`共找到原先观看历史${playSettings.length}条,链接不互通已经改为搜索,\r\n是否需要执行搜索历史记录合并？<br>注意：不要重复合并操作`,
                confirmBtn:"合并",
                cancelBtn:"取消"
            });
        },
    },
    created(){
        const _this = this;
        this.historyStorage = new this.$magic.lzystorage('lzyplay-history', _this.lzyplayHistory);
        this.historyStorage.load();
    },
    mounted(){},
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

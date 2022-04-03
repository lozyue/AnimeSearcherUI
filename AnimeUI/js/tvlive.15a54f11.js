(self["webpackChunkAnimeUI"]=self["webpackChunkAnimeUI"]||[]).push([[630],{60508:function(e,t,n){"use strict";n.a(e,(async function(e){var i=n(48534),a=n(95082),l=(n(35666),n(41539),n(54747),n(68309),n(56598)),s=n(47929),r=n(97117),c=n(33846),o=n(486),v=n(93644),p=n(93112),d=n(89745),u=e([c]);c=(u.then?await u:u)[0],t["Z"]=(0,l.defineComponent)({name:"TVLive",inheritAttrs:!1,props:["animeTemp"],components:{"animeui-home":r.Z,"tvlive-player":c.Z,"multi-list-editor":v.Z,"list-view":p.Z},setup:function(){var e=(0,l.getCurrentInstance)(),t=e.proxy,n=t.$magic,i=(0,l.reactive)({title:"",cover:"",description:"",category:[]}),r=(0,o.N)({$magic:n,AuiPage:t},{playingListHostName:"tvlive",cacheName:"tvlive"}),c=(0,d.once)((function(){this.addListData({title:"TVLive",list_title:"Chinese-IPTV",playList:s.C},!1)}));return(0,a.Z)({animeMeta:i,addInternalIPTV:c},r)},mounted:function(){var e=this;this.$magic.http.get("/iptv/list").then((function(t){var n=t.data;if(!(0,d.is_Array)(n)||!n[0].url)return console.error("Un-recognized IPTV List format!"),!1;var i={title:"Anime-API",list_title:"IPTV",playList:[]};n.forEach((function(e){i.playList.push({name:e.name,src:e.url,type:e.type})})),e.addListData(i,!0)}))},methods:{toggleVideo:function(e){var t=this;return(0,i.Z)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$refs.tvlive.playIt({index:e,preplay:new Function,postplay:new Function,alterOption:new Function});case 1:case"end":return n.stop()}}),n)})))()}},destroyed:function(){}})}))},65189:function(e,t,n){"use strict";n.a(e,(async function(e){var i=n(48534),a=(n(35666),n(40561),n(41539),n(54747),n(68309),n(89745)),l=n(56598),s=n(40541),r=n(23176),c=e([s]);s=(c.then?await c:c)[0],t["Z"]=(0,l.defineComponent)({name:"tvlive-player",inheritAttrs:!1,props:["animeTemp"],components:{"aui-lzyplayer":s.Z},setup:function(e){var t=(0,l.getCurrentInstance)(),n=t.proxy,i=(null===t||void 0===t||t.appContext.config.globalProperties.$magic,(0,l.reactive)({wideplay:!1,autoNext:!1,footerMsg:"Welcome to TVLive!"})),s=(0,l.reactive)({volume:.5,autoplay:1}),c=new n.$Lycabinet("tvlive-prefer",{initStorage:s});(0,l.watch)((function(){return s}),(function(e,t){r.DEBUG&&console.log("[player-region]: AuiPlayer Preference is changed!"),c.lazySave()}),{deep:!0});var o=null,v=null,p=null;(0,l.onMounted)((function(){p=n.$refs.lzyplayer,v=p.dlpWrap,o=p.dlpIns,r.DEBUG&&(window["lzyplayer"]=p),r.DEBUG&&(window["dlpWrap"]=v),r.DEBUG&&(window["dlpIns"]=o)})),(0,l.onMounted)((function(){(0,l.watchEffect)((function(){var e=o.container;i.wideplay?e.classList.add("dlp-screen-widen"):e.classList.remove("dlp-screen-widen"),(0,l.nextTick)((function(){o.resize()}))}))}));var d=(0,a.deepAssign)({video:{defaultQuality:0,type:"auto",topbar:{title:!0,meta:!0},currentPath:"",quality:[{name:"1080P",url:"",type:"auto"}]}},{danmaku:null,subtitle:null,storageMode:"outer",settingStorage:s,hotkeyProxy:!0}),u=(0,l.reactive)({title:"",cover:"",description:"",category:[]}),h=function(e){(0,a.objectRefresh)(u,e)},m=(0,l.reactive)([]),y=function(e){m.splice(0,m.length),e.forEach((function(e,t){e.id=t,m.push(e)}))},g=(0,l.reactive)({listTitle:"",episodeId:-1,name:"",isPrepared:!1});return{getDlpIns:function(){return o},getDlpWrap:function(){return v},getLzyplayer:function(){return p},dlplayerOptions:d,toolbar:i,playingList:m,initPlaylist:y,videoPlaying:g,initMetaData:h}},methods:{playIt:function(e){var t=this;return(0,i.Z)(regeneratorRuntime.mark((function n(){var i,a,l,s,r,c,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.index,a=e.preplay,l=e.postplay,s=e.alterOption,r=t.playingList[~~i],c=t.videoPlaying,c.episodeId=i,c.name=r.name,c.isPrepared=!0,o={title:r.name,name:null,src:r.src,type:r.type,topbar:{title:r.name,meta:null}},s(o,r),a&&(o.preplay=function(e,n){a(n,e,t.$refs.lzyplayer,t),t.toolbar.offsetTime=0}),l&&(o.postplay=function(e,n){l(n,e,t.$refs.lzyplayer,t)}),n.next=12,t.$refs.lzyplayer.lzyplay(o);case 12:case"end":return n.stop()}}),n)})))()},toPlaynext:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.playingList.length,i=(n+this.videoPlaying.episodeId+(t?-1:1))%n;this.$emit("toggleVideo",i)},toEnded:function(){}},mounted:function(){},destroyed:function(){}})}))},36013:function(e,t,n){"use strict";n.a(e,(async function(e){n.r(t);var i=n(26027),a=n(2167),l=(n(1417),n(83744)),s=e([a]);a=(s.then?await s:s)[0];const r=(0,l.Z)(a.Z,[["render",i.s]]);t["default"]=r}))},93644:function(e,t,n){"use strict";n.d(t,{Z:function(){return x}});var i=n(56598),a={class:"editor-body"},l={class:"list-headline"},s=(0,i.createElementVNode)("label",{for:"editor-name"},"剧标题：",-1),r=(0,i.createElementVNode)("label",{for:"editor-list_title"},"列表名：",-1),c={class:"list-playing"},o=(0,i.createElementVNode)("label",{for:"editor-danmaku-search"},"弹幕库搜索词：",-1),v={class:"list-info"},p=(0,i.createElementVNode)("label",{for:"editor-tags"},"标签：",-1),d=(0,i.createElementVNode)("label",{for:"editor-cover"},"封图：",-1),u=(0,i.createElementVNode)("label",{for:"editor-desc"},"简介：",-1),h=(0,i.createElementVNode)("div",null," to developing... ",-1);function m(e,t){return(0,i.openBlock)(),(0,i.createElementBlock)("div",a,[(0,i.createElementVNode)("div",l,[(0,i.createElementVNode)("span",null,[s,(0,i.withDirectives)((0,i.createElementVNode)("input",{"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.listMeta.title=t}),type:"text",id:"editor-name"},null,512),[[i.vModelText,e.listMeta.title]])]),(0,i.createElementVNode)("span",null,[r,(0,i.withDirectives)((0,i.createElementVNode)("input",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.listMeta.list_title=t}),type:"text",id:"editor-list_title"},null,512),[[i.vModelText,e.listMeta.list_title]])])]),(0,i.createElementVNode)("div",c,[(0,i.createElementVNode)("div",null,[o,(0,i.withDirectives)((0,i.createElementVNode)("input",{type:"text",id:"editor-danmaku-search","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.listMeta.playing.danmakuSearch=t})},null,512),[[i.vModelText,e.listMeta.playing.danmakuSearch]])])]),(0,i.createElementVNode)("div",v,[(0,i.createElementVNode)("div",null,[p,(0,i.withDirectives)((0,i.createElementVNode)("input",{"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.viewTags=t}),type:"text",id:"editor-tage",placeholder:"以空格或者逗号隔开"},null,512),[[i.vModelText,e.viewTags]])]),(0,i.createElementVNode)("div",null,[d,(0,i.withDirectives)((0,i.createElementVNode)("input",{"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.listMeta.infos.cover=t}),type:"text",id:"editor-cover",placeholder:"填写封面链接"},null,512),[[i.vModelText,e.listMeta.infos.cover]])]),(0,i.createElementVNode)("div",null,[u,(0,i.withDirectives)((0,i.createElementVNode)("textarea",{"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.listMeta.infos.desc=t}),id:"editor-desc",rows:"6",cols:"1000",maxlength:"2400",placeholder:"建议150-250字"},null,512),[[i.vModelText,e.listMeta.infos.desc]])])]),h])}n(69600),n(74916),n(23123),n(15306);var y=(0,i.defineComponent)({name:"multiListEditor",inheritAttrs:!1,props:{listMeta:{type:Object}},setup:function(e,t){var n=t.emit,a=(0,i.ref)(e.listMeta.infos.tags||[]),l=(0,i.computed)({get:function(){return a.value.join(" ")},set:function(t){a.value=(t+"").replace(/[,\s，]/g,",").split(","),e.listMeta.infos.tags=a.value,n("updata:listMeta",e.listMeta)}});return{viewTags:l}}}),g=(n(22748),n(83744));const f=(0,g.Z)(y,[["render",m]]);var x=f},33846:function(e,t,n){"use strict";n.a(e,(async function(e){var i=n(62954),a=n(60799),l=(n(85351),n(83744)),s=e([a]);a=(s.then?await s:s)[0];const r=(0,l.Z)(a.Z,[["render",i.s]]);t["Z"]=r}))},36299:function(e,t,n){"use strict";n.r(t);var i=n(8081),a=n.n(i),l=n(23645),s=n.n(l),r=s()(a());r.push([e.id,".tvlive-source>div.card{display:flex;flex-direction:column;justify-content:space-between}.tvlive-source>div.card .card-action{align-self:center;text-align:center}.tvlive-source .IPTV-Burning{max-width:23em;padding:.875em 1em}",""]),t["default"]=r},88615:function(e,t,n){"use strict";n.r(t);var i=n(8081),a=n.n(i),l=n(23645),s=n.n(l),r=s()(a());r.push([e.id,"#aui-player .editor-body input,#aui-player .editor-body textarea{width:-webkit-max-content;width:-moz-max-content;width:max-content;flex:1 1 auto;outline:none}#aui-player .editor-body input:active,#aui-player .editor-body input:focus,#aui-player .editor-body input:focus-visible,#aui-player .editor-body textarea:active,#aui-player .editor-body textarea:focus,#aui-player .editor-body textarea:focus-visible{outline:none}#aui-player .editor-body input{border-bottom:1px solid rgb(var(--v-theme-on-background))}#aui-player .editor-body textarea{resize:none;padding:.5em .75em;border:1px solid rgb(var(--v-theme-on-background));border-radius:var(--v-layer-radius)}#aui-player .editor-body label{flex:0 0 auto}#aui-player .editor-body .list-headline{display:flex;margin-bottom:.5em;justify-content:space-between;align-items:center;max-width:100%;overflow:hidden}#aui-player .editor-body .list-headline>span{display:flex;margin-right:.5em;flex:1 0 auto}#aui-player .editor-body .list-headline>span input{width:-webkit-max-content;width:-moz-max-content;width:max-content;flex:1 1 auto}#aui-player .editor-body .list-info{display:flex;flex-wrap:wrap;width:100%;justify-content:flex-start;align-content:flex-start;align-items:flex-start;margin-bottom:.75em}#aui-player .editor-body .list-info div{display:flex;margin-top:.5em;width:100%}#aui-player .editor-body .list-info div:last-child label{vertical-align:top}#aui-player .editor-body .list-playing{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75em}",""]),t["default"]=r},68545:function(e,t,n){"use strict";n.r(t);var i=n(8081),a=n.n(i),l=n(23645),s=n.n(l),r=s()(a());r.push([e.id,".channel-list{display:flex;justify-content:space-between;flex-wrap:wrap;align-content:center}.channel-list .channel-item{margin-right:.75em}",""]),t["default"]=r},47929:function(e,t,n){"use strict";n.d(t,{C:function(){return i}});var i=[{type:"hls",name:"CCTV-1 综合",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv1/HD-8000k-1080P-cctv1"},{type:"hls",name:"CCTV-2 财经",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv2/HD-8000k-1080P-cctv2"},{type:"hls",name:"CCTV-3 综艺",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv3/HD-8000k-1080P-cctv3"},{type:"hls",name:"CCTV-4 中文国际",src:"http://183.207.248.71:80/cntv/live1/cctv-4/cctv-4"},{type:"hls",name:"CCTV-5 体育",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv5/HD-8000k-1080P-cctv5"},{type:"hls",name:"CCTV-5+ 体育赛事",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv05plus/HD-8000k-1080P-cctv05plus"},{type:"hls",name:"CCTV-6 电影",src:"http://183.207.248.71:80/cntv/live1/cctv-6/cctv-6"},{type:"hls",name:"CCTV-7 国防军事",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv7/HD-8000k-1080P-cctv7"},{type:"hls",name:"CCTV-8 电视剧",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv8/HD-8000k-1080P-cctv8"},{type:"hls",name:"CCTV-9 纪录",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv9/HD-8000k-1080P-cctv9"},{type:"hls",name:"CCTV-10 科教",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv10/HD-8000k-1080P-cctv10"},{type:"hls",name:"CCTV-11 戏曲",src:"http://183.207.248.71:80/cntv/live1/n-cctv-11/n-cctv-11"},{type:"hls",name:"CCTV-12 社会与法",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv12/HD-8000k-1080P-cctv12"},{type:"hls",name:"CCTV-13 新闻",src:"http://183.207.248.71:80/cntv/live1/cctv-13/cctv-13"},{type:"hls",name:"CCTV-14 少儿",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv14/HD-8000k-1080P-cctv14"},{type:"hls",name:"CCTV-15 音乐",src:"http://183.207.248.71:80/cntv/live1/n-cctv-15/n-cctv-15"},{type:"hls",name:"CCTV-16 奥林匹克",src:"http://183.207.248.71/cntv/live1/HD-8000k-1080P-cctv16/HD-8000k-1080P-cctv16"},{type:"hls",name:"CCTV-17 农业农村",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-cctv17/HD-8000k-1080P-cctv17"},{type:"hls",name:"CETV-1",src:"http://183.207.248.71:80/cntv/live1/n-jiaoyutv/n-jiaoyutv"},{type:"hls",name:"CETV-2",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-jiaoyutv2/SD-4000k-576P-jiaoyutv2"},{type:"hls",name:"CETV-4",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-jiaoyutv4/SD-4000k-576P-jiaoyutv4"},{type:"hls",name:"广东卫视",src:"http://183.207.248.71:80/cntv/live1/n-guangdongstv/n-guangdongstv"},{type:"hls",name:"东南卫视",src:"http://183.207.248.71:80/cntv/live1/n-dongnanstv/n-dongnanstv"},{type:"hls",name:"东方卫视",src:"http://183.207.248.71:80/cntv/live1/n-dongfangstv/n-dongfangstv"},{type:"hls",name:"北京卫视",src:"http://183.207.248.71:80/cntv/live1/HD-2500k-1080P-beijingstv/HD-2500k-1080P-beijingstv"},{type:"hls",name:"北京纪实",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-beijingjishi/HD-8000k-1080P-beijingjishi"},{type:"hls",name:"南方卫视",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-nanfangstv/SD-4000k-576P-nanfangstv"},{type:"hls",name:"厦门卫视",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-xiamenstv/SD-4000k-576P-xiamenstv"},{type:"hls",name:"天津卫视",src:"http://183.207.248.71:80/cntv/live1/HD-2500k-1080P-tianjinstv/HD-2500k-1080P-tianjinstv"},{type:"hls",name:"安徽卫视",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-anhuistv/HD-8000k-1080P-anhuistv"},{type:"hls",name:"山东卫视",src:"http://183.207.248.71:80/cntv/live1/HD-2500k-1080P-shandongstv/HD-2500k-1080P-shandongstv"},{type:"hls",name:"江苏卫视",src:"http://183.207.248.71:80/cntv/live1/HD-2500k-1080P-jiangsustv/HD-2500k-1080P-jiangsustv"},{type:"hls",name:"江西卫视",src:"http://183.207.248.71:80/cntv/live1/jiangxistv/jiangxistv"},{type:"hls",name:"河北卫视",src:"http://183.207.248.71:80/cntv/live1/n-hebeistv/n-hebeistv"},{type:"hls",name:"浙江卫视",src:"http://183.207.248.71:80/cntv/live1/zhejiangstv/zhejiangstv"},{type:"hls",name:"深圳卫视",src:"http://183.207.248.71:80/cntv/live1/HD-2500k-1080P-shenzhenstv/HD-2500k-1080P-shenzhenstv"},{type:"hls",name:"湖北卫视",src:"http://183.207.248.71:80/cntv/live1/HD-2500k-1080P-hubeistv/HD-2500k-1080P-hubeistv"},{type:"hls",name:"湖南卫视",src:"http://183.207.248.71:80/cntv/live1/hunanstv/hunanstv"},{type:"hls",name:"重庆卫视",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-chongqingstv/HD-8000k-1080P-chongqingstv"},{type:"hls",name:"黑龙江卫视",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-heilongjiangstv/HD-8000k-1080P-heilongjiangstv"},{type:"hls",name:"四川卫视",src:"http://183.207.248.71:80/cntv/live1/n-sichuanstv/n-sichuanstv"},{type:"hls",name:"云南卫视",src:"http://183.207.248.71:80/cntv/live1/n-yntv1/n-yntv1"},{type:"hls",name:"宁夏卫视",src:"http://183.207.248.71:80/cntv/live1/n-ningxiastv/n-ningxiastv"},{type:"hls",name:"兵团卫视",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-bingtuanstv/SD-4000k-576P-bingtuanstv"},{type:"hls",name:"内蒙古卫视",src:"http://183.207.248.71:80/cntv/live1/n-neimenggustv/n-neimenggustv"},{type:"hls",name:"农林卫视",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-nonglinstv/SD-4000k-576P-nonglinstv"},{type:"hls",name:"山西卫视",src:"http://183.207.248.71:80/cntv/live1/n-shanxistv/n-shanxistv"},{type:"hls",name:"广西卫视",src:"http://183.207.248.71:80/cntv/live1/n-guangxistv/n-guangxistv"},{type:"hls",name:"康巴卫视",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-kambatv/SD-4000k-576P-kambatv"},{type:"hls",name:"延边卫视",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-yanbianstv/SD-4000k-576P-yanbianstv"},{type:"hls",name:"新疆卫视",src:"http://183.207.248.71:80/cntv/live1/n-xjtv1/n-xjtv1"},{type:"hls",name:"甘肃卫视",src:"http://183.207.248.71:80/cntv/live1/n-gansustv/n-gansustv"},{type:"hls",name:"安多卫视",src:"http://183.207.248.71:80/cntv/live1/anduostv/anduostv"},{type:"hls",name:"宁夏卫视",src:"http://183.207.248.71:80/cntv/live1/n-ningxiastv/n-ningxiastv"},{type:"hls",name:"西藏卫视",src:"http://183.207.248.71:80/cntv/live1/n-xizangstv/n-xizangstv"},{type:"hls",name:"贵州卫视",src:"http://183.207.248.71:80/cntv/live1/n-guizhoustv/n-guizhoustv"},{type:"hls",name:"河南卫视",src:"http://183.207.248.71:80/cntv/live1/henanstv/henanstv"},{type:"hls",name:"辽宁卫视",src:"http://183.207.248.71:80/cntv/live1/liaoningstv/liaoningstv"},{type:"hls",name:"陕西卫视",src:"http://183.207.248.71:80/cntv/live1/n-shanxi1stv/n-shanxi1stv"},{type:"hls",name:"青海卫视",src:"http://183.207.248.71:80/cntv/live1/n-qinghaistv/n-qinghaistv"},{type:"hls",name:"纪实人文",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-shanghaijishi/HD-8000k-1080P-shanghaijishi"},{type:"hls",name:"山东教育电视台",src:"http://183.207.248.71:80/cntv/live1/n-shandongjy/n-shandongjy"},{type:"hls",name:"NewTV世界搏击",src:"http://183.207.248.71:80/cntv/live1/n-bokesen/n-bokesen"},{type:"hls",name:"NewTV健康有约",src:"http://183.207.248.71:80/cntv/live1/n-ljiankangyouyue/n-ljiankangyouyue"},{type:"hls",name:"NewTV军事评论",src:"http://183.207.248.71:80/cntv/live1/n-junshipl/n-junshipl"},{type:"hls",name:"NewTV古装剧场",src:"http://183.207.248.71:80/cntv/live1/n-guzhuangjc/n-guzhuangjc"},{type:"hls",name:"NewTV军旅剧场",src:"http://183.207.248.71:80/cntv/live1/n-junlvjc/n-junlvjc"},{type:"hls",name:"NewTV农业致富",src:"http://183.207.248.71:80/cntv/live1/n-nongyezf/n-nongyezf"},{type:"hls",name:"NewTV动作电影",src:"http://183.207.248.71:80/cntv/live1/n-dongzuody/n-dongzuody"},{type:"hls",name:"NewTV家庭剧场",src:"http://183.207.248.71:80/cntv/live1/n-jiatingjc/n-jiatingjc"},{type:"hls",name:"NewTV惊悚电影",src:"http://183.207.248.71:80/cntv/live1/n-jingsongxy/n-jingsongxy"},{type:"hls",name:"NewTV潮妈辣婆",src:"http://183.207.248.71:80/cntv/live1/n-cmlapo/n-cmlapo"},{type:"hls",name:"NewTV炫舞未来",src:"http://183.207.248.71:80/cntv/live1/HD-4000k-1080P-xwwl/HD-4000k-1080P-xwwl"},{type:"hls",name:"NewTV爱情喜剧",src:"http://183.207.248.71:80/cntv/live1/n-aiqingxj/n-aiqingxj"},{type:"hls",name:"NewTV精品体育",src:"http://183.207.248.71:80/cntv/live1/n-jtiyu/n-jtiyu"},{type:"hls",name:"NewTV精品大剧",src:"http://183.207.248.71:80/cntv/live1/n-jdaju/n-jdaju"},{type:"hls",name:"NewTV精品纪录",src:"http://183.207.248.71:80/cntv/live1/n-jingpinjl/n-jingpinjl"},{type:"hls",name:"NewTV金牌综艺",src:"http://183.207.248.71:80/cntv/live1/n-saishijx/n-saishijx"},{type:"hls",name:"NewTV中国功夫",src:"http://183.207.248.71:80/cntv/live1/n-gzkongfu/n-gzkongfu"},{type:"hls",name:"NewTV热播精选",src:"http://183.207.248.71:80/cntv/live1/n-xiqumd/n-xiqumd"},{type:"hls",name:"NewTV精品综合",src:"http://183.207.248.71:80/cntv/live1/n-mingxingdp/n-mingxingdp"},{type:"hls",name:"NewTV黑莓电竞之夜",src:"http://183.207.248.71:80/cntv/live1/wmyx/wmyx"},{type:"hls",name:"NewTV黑莓电影",src:"http://183.207.248.71:80/cntv/live1/HD-8000k-1080P-Supermovie/HD-8000k-1080P-Supermovie"},{type:"hls",name:"NewTV黑莓动画",src:"http://183.207.248.71:80/cntv/live1/donghuawg/donghuawg"},{type:"hls",name:"卡酷少儿",src:"http://183.207.248.71:80/cntv/live1/n-kakukaton/n-kakukaton"},{type:"hls",name:"嘉佳卡通",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-jiajiakaton/SD-4000k-576P-jiajiakaton"},{type:"hls",name:"炫动卡通",src:"http://183.207.248.71:80/cntv/live1/n-xuandongkaton/n-xuandongkaton"},{type:"hls",name:"金鹰卡通",src:"http://183.207.248.71:80/cntv/live1/n-jinyingkaton/n-jinyingkaton"},{type:"hls",name:"优漫卡通",src:"http://183.207.248.71:80/cntv/live1/n-youmankaton/n-youmankaton"},{type:"hls",name:"中华美食",src:"http://183.207.248.71:80/cntv/live1/SD-4000k-576P-zhmeishi/SD-4000k-576P-zhmeishi"},{type:"hls",name:"纯享4K",src:"http://183.207.248.71:80/cntv/live1/HD-20M-2160P-chunxiang4k/HD-20M-2160P-chunxiang4k"}]},2167:function(e,t,n){"use strict";n.a(e,(async function(e){n.d(t,{Z:function(){return i.Z}});var i=n(60508),a=e([i]);i=(a.then?await a:a)[0]}))},60799:function(e,t,n){"use strict";n.a(e,(async function(e){n.d(t,{Z:function(){return i.Z}});var i=n(65189),a=e([i]);i=(a.then?await a:a)[0]}))},1417:function(e,t,n){"use strict";n(47418)},85351:function(e,t,n){"use strict";n(61068)},47418:function(e,t,n){var i=n(36299);i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals);var a=n(54402).Z;a("64c517c0",i,!0,{sourceMap:!1,shadowMode:!1})},22748:function(e,t,n){var i=n(88615);i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals);var a=n(54402).Z;a("db96b6dc",i,!0,{sourceMap:!1,shadowMode:!1})},61068:function(e,t,n){var i=n(68545);i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals);var a=n(54402).Z;a("4bff5980",i,!0,{sourceMap:!1,shadowMode:!1})},26027:function(e,t,n){"use strict";n.d(t,{s:function(){return y}});var i=n(56598),a=n(52653),l={id:"tvlive"},s=(0,i.createElementVNode)("h2",{class:"aui-player-header page-headline"},[(0,i.createElementVNode)("span",null,"TV Live")],-1),r={class:"main layout lycontainer vw-center resp-width resp-padding"},c={class:"tvlive-source mt-4 mb-6"},o=(0,i.createElementVNode)("h3",null,"内置源: ",-1),v={class:"card IPTV-Burning"},p=(0,i.createElementVNode)("h4",null,"BurningC4/Chinese-IPTV",-1),d=(0,i.createElementVNode)("div",{class:"card-infos"},[(0,i.createElementVNode)("p",{class:"indented"},[(0,i.createTextVNode)(" 该源质量较好但有无法避免的跨域限制，如需强行使用请 "),(0,i.createElementVNode)("a",{href:"https://lozyue.github.io/AnimeSearcherUI/instruction/helper.html#%E4%BF%AE%E6%94%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E8%B7%A8%E5%9F%9F%E8%B5%84%E6%BA%90%E5%85%B1%E4%BA%AB%E6%A3%80%E6%9F%A5-%E7%A6%81%E7%94%A8cors",target:"_blank"},"查阅帮助")])],-1),u={class:"card-action py-2"},h=(0,i.createTextVNode)("启用该源"),m=(0,i.createElementVNode)("div",{class:"card-footer"},[(0,i.createElementVNode)("span",null,[(0,i.createTextVNode)("Thanks For "),(0,i.createElementVNode)("a",{href:"https://github.com/BurningC4/Chinese-IPTV",target:"_blank"},[(0,i.createElementVNode)("span",null,"Github "),(0,i.createTextVNode)(" @BurningC4/Chinese-IPTV ")])])],-1);function y(e,t){var n=(0,i.resolveComponent)("animeui-home"),y=(0,i.resolveComponent)("tvlive-player"),g=(0,i.resolveComponent)("list-view");return(0,i.openBlock)(),(0,i.createElementBlock)("div",l,[(0,i.createVNode)(n,{animeTemp:e.animeTemp,class:"back-home"},null,8,["animeTemp"]),s,(0,i.createElementVNode)("div",r,[(0,i.createVNode)(y,{ref:"tvlive",class:"mb-4",animeTemp:e.animeTemp},null,8,["animeTemp"]),(0,i.createVNode)(g,{animeTemp:e.animeTemp,class:"",metaList:e.multiMeta,showing:e.showing,playing:e.playing,onDelegateClick:e.toggleToListVideo,onToAddList:t[0]||(t[0]=function(t){return e.showGuide=!0,e.$refs.tvlive.getLzyplayer().relocatePlayer()}),onToToggleList:t[1]||(t[1]=function(t){return e.toggleMetaList(t)})},null,8,["animeTemp","metaList","showing","playing","onDelegateClick"]),(0,i.createElementVNode)("div",c,[o,(0,i.createElementVNode)("div",v,[p,d,(0,i.createElementVNode)("div",u,[(0,i.createVNode)(a.T,{onClick:t[2]||(t[2]=function(t){return e.addInternalIPTV()}),color:""},{default:(0,i.withCtx)((function(){return[h]})),_:1})]),m])])])])}},62954:function(e,t,n){"use strict";n.d(t,{s:function(){return d}});var i=n(56598),a={class:"tvlive-player"},l={style:{width:"100%"}},s={style:{width:"100%",display:"-webkit-flex","justify-content":"center","-webkit-align-items":"center","-webkit-justify-content":"center",overflow:"hidden"}},r={style:{"border-bottom-left-radius":"6px","border-top-left-radius":"15px","text-align":"center",flex:"1",background:"rgb(242, 101, 101)"}},c={style:{border:"10px solid transparent","border-right-width":"48px","border-bottom-width":"16px"}},o={style:{"border-radius":"6px",background:"rgb(255,255,255)"}},v=(0,i.createStaticVNode)('<section style="width:25px;margin-left:-38px;margin-right:5px;"><div style="width:16px;height:16px;border-radius:100%;background:#2e1d03;margin:7px auto;"></div><div style="width:16px;height:16px;border-radius:100%;background:#2e1d03;margin:7px auto;"></div><div style="width:16px;height:16px;border-radius:100%;background:#2e1d03;margin:7px auto;"></div><div style="width:16px;height:16px;border-radius:100%;background:#2e1d03;margin:10px auto;"></div><div style="width:90%;height:2px;background:#2e1d03;margin:10px auto 4px auto;"></div><div style="width:90%;height:2px;background:#2e1d03;margin:4px auto;"></div><div style="width:90%;height:2px;background:#2e1d03;margin:4px auto;"></div><div style="width:90%;height:2px;background:#2e1d03;margin:4px auto;"></div><div style="width:90%;height:2px;background:#2e1d03;margin:4px auto;"></div></section>',1),p=(0,i.createElementVNode)("section",{style:{margin:"0px auto",display:"flex","justify-content":"center","margin-top":"-1px"}},[(0,i.createElementVNode)("div",{style:{width:"1.5em",height:"10px",background:"#2e1d03","border-radius":"2px",margin:"auto"}}),(0,i.createElementVNode)("div",{style:{width:"1.5em",height:"10px",background:"#2e1d03","border-radius":"2px",margin:"auto"}})],-1);function d(e,t){var n=(0,i.resolveComponent)("aui-lzyplayer");return(0,i.openBlock)(),(0,i.createElementBlock)("div",a,[(0,i.createElementVNode)("section",l,[(0,i.createElementVNode)("section",s,[(0,i.createElementVNode)("div",r,[(0,i.createElementVNode)("div",c,[(0,i.createElementVNode)("div",o,[(0,i.createVNode)(n,{ref:"lzyplayer",animeTemp:e.animeTemp,dlplayerConfigs:e.dlplayerOptions,toolbar:e.toolbar,onPlaynext:e.toPlaynext,onEnded:e.toEnded,onOpenSelect:t[0]||(t[0]=function(t){return e.$magic.utility.lzynotice({content:"暂无直播弹幕",semantic:"info"})}),onOpenAddition:t[1]||(t[1]=function(t){return e.$magic.utility.lzynotice({content:"暂无直播弹幕",semantic:"info"})})},null,8,["animeTemp","dlplayerConfigs","toolbar","onPlaynext","onEnded"])])])]),v]),p])])}}}]);
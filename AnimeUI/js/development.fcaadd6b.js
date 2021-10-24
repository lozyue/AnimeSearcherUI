(self["webpackChunkanimeui"]=self["webpackChunkanimeui"]||[]).push([[115],{3911:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return a}});var r=t(6252),l={id:"development"};function o(n,e,t,o,i,a){var u=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",l,[(0,r.Wm)(u)])}var i=(0,r.aZ)({name:"Development"});i.render=o;var a=i},6901:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return en}});t(8309),t(2526),t(1817);var r=t(6252),l=t(9963),o=t(3577),i={class:"layout lycontainer fullbox"},a={class:"main layout resp-width vw-center"},u={class:"title"},s=(0,r._)("span",null," Theme-Blending ",-1),c={"data-balloon":"导入JSON主题配色","data-balloon-pos":"down"},A={class:"iconfont icon-upload"},d=(0,r.Uk)("上传 "),p=(0,r._)("span",{class:"iconfont icon-download"},"保存",-1),f=[p],m=(0,r._)("hr",{class:"mb-4"},null,-1),g=(0,r._)("h4",null,"填充基本信息",-1),C={class:"blend-infos pa-4"},b={for:"name"},h=(0,r.Uk)(" 配色名 "),x={for:"alias"},y=(0,r.Uk)(" 配色昵称 "),w={for:"description"},v=(0,r.Uk)(" 描述 "),_={for:"author"},k=(0,r.Uk)(" 作者信息 "),B={for:"home"},E=(0,r.Uk)(" 主页 "),U=(0,r._)("h4",null,"是否为暗色主题:",-1),W={class:"dark-set px-4"},j={for:"dark"},V=(0,r.Uk)(" 暗系配色 "),S={class:"blending"},D=(0,r._)("h2",null,"配色混合变量",-1),L=(0,r._)("div",{class:"hint mx-4"},"配色混合变量是应用变换配色的主体部分，采用通量命名，如primary、secondary等",-1),M={class:"content pa-4"},z=["for"],Y=["onUpdate:modelValue"],F=(0,r._)("span",null,": ",-1),N=["onUpdate:modelValue"],Q={class:"colors"},T=(0,r._)("h2",null,"配色颜色变量",-1),J=(0,r._)("div",{class:"hint mx-4"},"配色颜色变量用于一些固定色彩的地方，通过配置基本的颜色的值来达到更改目的",-1),K={class:"content pa-4"},G=["for"],R=["onUpdate:modelValue"],O=(0,r._)("span",null,": ",-1),Z=["onUpdate:modelValue"];function q(n,e,t,p,q,H){var $=(0,r.up)("v-theme-provider"),I=(0,r.up)("v-container");return(0,r.wg)(),(0,r.j4)(I,{id:"blending",class:""},{default:(0,r.w5)((function(){return[(0,r.Wm)($,{theme:n.theme,"with-background":"",class:""},{default:(0,r.w5)((function(){return[(0,r._)("div",i,[(0,r._)("div",a,[(0,r._)("div",u,[s,(0,r._)("span",null,[(0,r._)("button",c,[(0,r._)("label",A,[(0,r._)("input",{onChange:e[0]||(e[0]=function(e){return n.fileInputs(e)}),type:"file",name:"upload",id:"upload",accept:".json",hidden:""},null,32),d])]),(0,r._)("button",{onClick:e[1]||(e[1]=function(){return n.saveJson&&n.saveJson.apply(n,arguments)}),"data-balloon":"导出当前主题配色","data-balloon-pos":"down"},f)])]),m,g,(0,r._)("div",C,[(0,r._)("label",b,[h,(0,r.wy)((0,r._)("input",{name:"name","onUpdate:modelValue":e[2]||(e[2]=function(e){return n.infos.name=e}),type:"text"},null,512),[[l.nr,n.infos.name]])]),(0,r._)("label",x,[y,(0,r.wy)((0,r._)("input",{name:"alias","onUpdate:modelValue":e[3]||(e[3]=function(e){return n.infos.alias=e}),type:"text"},null,512),[[l.nr,n.infos.alias]])]),(0,r._)("label",w,[v,(0,r.wy)((0,r._)("input",{name:"description","onUpdate:modelValue":e[4]||(e[4]=function(e){return n.infos.description=e}),type:"text"},null,512),[[l.nr,n.infos.description]])]),(0,r._)("label",_,[k,(0,r.wy)((0,r._)("input",{name:"author","onUpdate:modelValue":e[5]||(e[5]=function(e){return n.infos.author.nick=e}),type:"text"},null,512),[[l.nr,n.infos.author.nick]])]),(0,r._)("label",B,[E,(0,r.wy)((0,r._)("input",{name:"home","onUpdate:modelValue":e[6]||(e[6]=function(e){return n.infos.home=e}),type:"text"},null,512),[[l.nr,n.infos.home]])])]),U,(0,r._)("div",W,[(0,r._)("label",j,[(0,r.wy)((0,r._)("input",{name:"dark","onUpdate:modelValue":e[7]||(e[7]=function(e){return n.infos.isDark=e}),type:"checkbox"},null,512),[[l.e8,n.infos.isDark]]),V])]),(0,r._)("div",S,[D,L,(0,r._)("ul",M,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.readBlending,(function(e,t){return(0,r.wg)(),(0,r.iD)("li",{key:t},[(0,r._)("label",{for:e.key},[(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":function(n){return e.key=n}},null,8,Y),[[l.nr,e.key]]),F,(0,r._)("span",{class:(0,o.C_)(["lump",{opacity:n.$magic.utils.is_Number(e.value)}]),style:(0,o.j5)({"--bgcolor":e.value})},null,6),(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":function(n){return e.value=n}},null,8,N),[[l.nr,e.value]])],8,z)])})),128))])]),(0,r._)("div",Q,[T,J,(0,r._)("ul",K,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.readColors,(function(n,e){return(0,r.wg)(),(0,r.iD)("li",{key:e},[(0,r._)("label",{for:n.key},[(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":function(e){return n.key=e}},null,8,R),[[l.nr,n.key]]),O,(0,r._)("span",{class:"lump",style:(0,o.j5)({"--bgcolor":n.value})},null,4),(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":function(e){return n.value=e}},null,8,Z),[[l.nr,n.value]])],8,G)])})),128))])])])])]})),_:1},8,["theme"])]})),_:1})}var H=t(5082),$=(t(4747),t(7941),t(4916),t(5306),t(8157)),I=t(214),P=t(9388),X=[[],[]],nn=(0,r.aZ)({name:"Blending",components:{},directives:{"color-visual":{mounted:function(n){n.style.backgroundColor=n.innerHTML,n.style.color="white",n.classList.add("fastcopy")}}},setup:function(){var n=(0,$.AW)();return console.log(n),{display:n}},data:function(){return{theme:"light",infos:{name:"CustomBlending",alias:"自定义主题配色",description:"我的第一个自定义主题配色",author:{nick:"",avatar:"",link:""},home:"",thumbs:"",isDark:!1},blending:{},colors:{}}},computed:{readBlending:function(){var n=this;return Object.keys(this.blending).forEach((function(e){X[0].push({key:e,value:n.blending[e]})})),X[0]},readColors:function(){var n=this;return Object.keys(this.colors).forEach((function(e){X[1].push({key:e,value:n.colors[e]})})),X[1]}},methods:{fileInputs:function(n){var e=this,t=n.target;console.log(t);var r=t.files[0];if(!r)return console.log("There are no selected files"),!1;r.text().then((function(n){try{var t=n.replace(/\/\/.*?\n/g,""),r=JSON.parse(t);(0,P.IM)(e.infos,r,null,["blending","colors"]),e.blending=r.blending||e.blending,e.colors=r.colors||e.colors}catch(l){console.error("The selected file is not a valid json file.",l)}}))},saveJson:function(){var n=(0,H.Z)((0,H.Z)({},this.infos),{},{blending:this.blending,colors:this.colors});(0,I.fileExport)(JSON.stringify(n),"".concat(this.infos.name,".json"),"application/json")}},created:function(){var n=this.$magic.deposit.getThemeBlending("light");this.colors=n.colors,this.blending=n.variables},mounted:function(){}});t(8802);nn.render=q;var en=nn},3602:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return v}});var r=t(6252),l=t(9963),o=t(3577),i=(0,r._)("h1",null,"我的开发调色板",-1),a=(0,r._)("h2",null,"颜色可视化：",-1),u=(0,r._)("h3",{style:{},for:"inputtedStr"},"输入一个或一组CSS颜色值并立即获取展示(可能是从一些地方复制过来的)自动过滤特殊符号",-1),s=(0,r._)("label",{for:"splitor"},"选择分隔符模式",-1),c=(0,r._)("option",{value:","},"英文逗号",-1),A=(0,r._)("option",{value:"."},"小圆点",-1),d=(0,r._)("option",{value:" "},"空格",-1),p=[c,A,d],f=(0,r.Uk)("点击添加进入颜色列表"),m=(0,r.Uk)("颜色可视："),g={class:"default-colorlump colorlump"},C=(0,r._)("h2",null,"默认颜色",-1),b={class:"default-colorlump colorlump"};function h(n,e,t,c,A,d){var h=(0,r.up)("v-col"),x=(0,r.up)("v-row"),y=(0,r.up)("v-btn"),w=(0,r.up)("v-theme-provider"),v=(0,r.up)("v-container"),_=(0,r.Q2)("color-visual");return(0,r.wg)(),(0,r.j4)(v,{id:"main"},{default:(0,r.w5)((function(){return[(0,r.Wm)(w,{theme:n.theme,"with-background":"",class:"pa-10"},{default:(0,r.w5)((function(){return[(0,r.Wm)(x,{"no-gutters":"",class:"mb-12",justify:"center"},{default:(0,r.w5)((function(){return[(0,r.Wm)(h,null,{default:(0,r.w5)((function(){return[i]})),_:1})]})),_:1}),(0,r.Wm)(x,{"no-gutters":"",class:"mb-12",justify:"center"},{default:(0,r.w5)((function(){return[(0,r.Wm)(h,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[a]})),_:1}),(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(h,null,{default:(0,r.w5)((function(){return[u]})),_:1}),(0,r.Wm)(h,{cols:"4"},{default:(0,r.w5)((function(){return[s,(0,r.wy)((0,r._)("select",{name:"splitor","onUpdate:modelValue":e[0]||(e[0]=function(e){return n.splitor=e})},p,512),[[l.bM,n.splitor]])]})),_:1})]})),_:1}),(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[(0,r.wy)((0,r._)("textarea",{name:"inputtedStr",type:"text","onUpdate:modelValue":e[1]||(e[1]=function(e){return n.inputtedStr=e})},null,512),[[l.nr,n.inputtedStr]])]})),_:1}),(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(y,{onClick:n.addColor},{default:(0,r.w5)((function(){return[f]})),_:1},8,["onClick"])]})),_:1})]})),_:1})]})),_:1}),(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(h,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[m]})),_:1}),(0,r.Wm)(x,{justify:"center"},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.colorList,(function(n,e){return(0,r.wg)(),(0,r.j4)(h,{key:e,cols:"1"},{default:(0,r.w5)((function(){return[(0,r.wy)((0,r._)("div",g,[(0,r.Uk)((0,o.zw)(n),1)],512),[[_]])]})),_:2},1024)})),128))]})),_:1})]})),_:1})]})),_:1}),(0,r.Wm)(x,{"no-gutters":"",class:"mb-12",justify:"center"},{default:(0,r.w5)((function(){return[(0,r.Wm)(h,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(x,null,{default:(0,r.w5)((function(){return[C]})),_:1}),(0,r.Wm)(x,{justify:"center"},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.defaultColorList,(function(n,e){return(0,r.wg)(),(0,r.j4)(h,{key:e,cols:"1",md:"2",xs:"3"},{default:(0,r.w5)((function(){return[(0,r.wy)((0,r._)("div",b,[(0,r.Uk)((0,o.zw)(n),1)],512),[[_]])]})),_:2},1024)})),128))]})),_:1})]})),_:1})]})),_:1})]})),_:1},8,["theme"])]})),_:1})}t(4916),t(5306),t(4603),t(9714),t(3123),t(2222);var x=t(8157),y=t(214),w=(0,r.aZ)({name:"Pallet",directives:{"color-visual":{mounted:function(n){n.style.backgroundColor=n.innerHTML,n.style.color="white",n.classList.add("fastcopy")}}},data:function(){return{theme:"light",defaultColorList:["#cdfff5","#ffcdf0","#d7ffcd","#fff5cd","#cdf0ff","#ffdccd","#dccdff","#cdffdc","#ffcdd7"],inputtedColorList:[],splitor:",",inputtedStr:""}},computed:{colorList:function(){var n=this.inputtedStr.replace(new RegExp("/(".concat(this.splitor,")+/g")),"$1");return n=n.replaceAll(/["'“‘’”]/g,""),n.split(this.splitor)}},setup:function(){var n=(0,x.AW)();return console.log(n),{display:n}},methods:{addColor:function(){this.inputtedColorList.concat(this.colorList),this.inputtedStr=""}},created:function(){},mounted:function(){this.$el.addEventListener("click",(function(n){n.target.classList.contains("fastcopy")&&(0,y.copyTextToClipboard)(n.target.textContent||n.target.innerHTML)}))}});t(8167);w.render=h;var v=w},8158:function(n,e,t){"use strict";t.r(e);var r=t(4015),l=t.n(r),o=t(3645),i=t.n(o),a=i()(l());a.push([n.id,".colorlump{display:inline-block;margin:15px auto;padding:3px 5px;border-radius:3px;color:#fff;font-size:14px;font-weight:500;-webkit-user-select:all;-moz-user-select:all;user-select:all}.default-colorlump{border:1px solid gray}","",{version:3,sources:["webpack://./src/views/Development/Pallet.vue"],names:[],mappings:"AACA,WACE,oBAAqB,CACrB,gBAAiB,CACjB,eAAgB,CAChB,iBAAkB,CAClB,UAAW,CACX,cAAe,CACf,eAAgB,CAChB,uBAAgB,CAAhB,oBAAgB,CAAhB,eACF,CACA,mBACE,qBACF",sourcesContent:["\r\n.colorlump{\r\n  display: inline-block;\r\n  margin: 15px auto;\r\n  padding: 3px 5px;\r\n  border-radius: 3px;\r\n  color: #fff;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  user-select: all;\r\n}\r\n.default-colorlump{\r\n  border: 1px gray solid;\r\n}\r\n"],sourceRoot:""}]),e["default"]=a},9469:function(n,e,t){"use strict";t.r(e);var r=t(4015),l=t.n(r),o=t(3645),i=t.n(o),a=i()(l());a.push([n.id,".main .title{display:flex;justify-content:space-between;align-content:center;font-size:24px;margin-top:12px;margin-bottom:16px}.main .title span{margin:auto 12px}.main .title span button{margin-left:8px}.main .title span button label{cursor:pointer}.main .title span button span{font-size:16px;cursor:pointer}.main .blending>h2,.main .colors>h2,.main h4{margin:auto 12px}.main .blend-infos{margin-bottom:16px}.main .blend-infos label input{display:inline-block;border:1px solid rgb(var(--v-theme-on-surface));border-radius:3px}.main .blending,.main .colors,.main .dark-set{margin-bottom:16px}.main ul.content{display:flex;justify-content:space-between;align-content:center;align-items:center;flex-wrap:wrap}.main ul.content li{list-style:none}.main ul.content li input,.main ul.content li label .lump{display:inline-block;vertical-align:middle}.main ul.content li label .lump{width:20px;height:20px;margin-right:8px;background-color:var(--bgcolor);box-shadow:1px 1px 3px var(--bgcolor),-2px -1px 3px gray;cursor:pointer}.main ul.content li label .lump.opacity{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat;border-radius:50%;border:1px solid gray}.colorlump{display:inline-block;margin:15px auto;padding:3px 5px;border-radius:3px;color:#fff;font-size:14px;font-weight:500;-webkit-user-select:all;-moz-user-select:all;user-select:all}.default-colorlump{border:1px solid gray}","",{version:3,sources:["webpack://./src/views/Development/Blending.vue"],names:[],mappings:"AAEE,aACE,YAAA,CACA,6BAAA,CACA,oBAAA,CACA,cAAA,CACA,eAAA,CACA,kBAAA,CACA,kBACE,gBAAA,CACA,yBACE,eAAA,CACA,+BACE,cAAA,CAEF,8BACE,cAAA,CACA,cAAA,CAQR,6CACE,gBAAA,CAEF,mBACE,kBAAA,CAEE,+BACE,oBAAA,CACA,+CAAA,CACA,iBAAA,CAcN,8CACE,kBAAA,CAQF,iBACE,YAAA,CACA,6BAAA,CACA,oBAAA,CACA,kBAAA,CACA,cAAA,CACA,oBACE,eAAA,CAME,0DAJA,oBAAA,CACA,qBAWE,CARF,gCAEE,UAAA,CACA,WAAA,CACA,gBAAA,CAEA,+BAAA,CACA,wDAAA,CACA,cAAA,CAEA,wCAGE,yJAAA,CACA,iBAAA,CACA,qBAAA,CAOZ,WACE,oBAAA,CACA,gBAAA,CACA,eAAA,CACA,iBAAA,CACA,UAAA,CACA,cAAA,CACA,eAAA,CACA,uBAAA,CAAA,oBAAA,CAAA,eAAA,CAEF,mBACE,qBAAA",sourcesContent:["\r\n.main{\r\n  .title{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-content: center;\r\n    font-size: 24px;\r\n    margin-top: 12px;\r\n    margin-bottom: 16px;\r\n    span{\r\n      margin: auto 12px;\r\n      button{\r\n        margin-left: 8px;\r\n        label{\r\n          cursor: pointer;\r\n        }\r\n        span{\r\n          font-size: 16px;\r\n          cursor: pointer;\r\n        }\r\n      }\r\n    }\r\n  }\r\n  h4{\r\n    margin: auto 12px;\r\n  }\r\n  .blending>h2, .colors>h2{\r\n    margin: auto 12px;\r\n  }\r\n  .blend-infos{\r\n    margin-bottom: 16px;\r\n    label{\r\n      input{\r\n        display: inline-block;\r\n        border: 1px solid rgb(var(--v-theme-on-surface));\r\n        border-radius: 3px;\r\n      }\r\n    }\r\n  }\r\n  .dark-set{\r\n    margin-bottom: 16px;\r\n  }\r\n  .blending{\r\n    margin-bottom: 16px;\r\n    // ul.content{\r\n    //   li{\r\n    //   }\r\n    // }\r\n  }\r\n  .colors{\r\n    margin-bottom: 16px;\r\n    // ul.content{\r\n    //   li{\r\n\r\n    //   }\r\n    // }\r\n  }\r\n  // shared by blending and colors\r\n  ul.content{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-content: center;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    li{\r\n      list-style: none;\r\n      input{\r\n        display: inline-block;\r\n        vertical-align: middle;\r\n      }\r\n      label{\r\n        .lump{\r\n          display: inline-block;\r\n          width: 20px;\r\n          height: 20px;\r\n          margin-right: 8px;\r\n          vertical-align: middle;\r\n          background-color: var(--bgcolor);\r\n          box-shadow: 1px 1px 3px var(--bgcolor), -2px -1px 3px gray;\r\n          cursor: pointer;\r\n          // 透明度类型\r\n          &.opacity{\r\n            // width: 22px;\r\n            // height: 22px;\r\n            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat;\r\n            border-radius: 50%;\r\n            border: 1px solid gray;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n.colorlump{\r\n  display: inline-block;\r\n  margin: 15px auto;\r\n  padding: 3px 5px;\r\n  border-radius: 3px;\r\n  color: #fff;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  user-select: all;\r\n}\r\n.default-colorlump{\r\n  border: 1px gray solid;\r\n}\r\n"],sourceRoot:""}]),e["default"]=a},8167:function(n,e,t){var r=t(8158);r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[n.id,r,""]]),r.locals&&(n.exports=r.locals);var l=t(5346).Z;l("6ae7bbf6",r,!0,{sourceMap:!0,shadowMode:!1})},8802:function(n,e,t){var r=t(9469);r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[n.id,r,""]]),r.locals&&(n.exports=r.locals);var l=t(5346).Z;l("1cd177be",r,!0,{sourceMap:!0,shadowMode:!1})}}]);
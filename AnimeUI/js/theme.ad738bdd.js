(self["webpackChunkAnimeUI"]=self["webpackChunkAnimeUI"]||[]).push([[505],{72438:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var i=n(56598),l={id:"theme"},a={class:"main layout resp-width vw-center resp-padding"},m=(0,i.createElementVNode)("section",{class:"main-header"},[(0,i.createElementVNode)("div",{class:"theme-blending"},"主题配色"),(0,i.createElementVNode)("div",{class:"theme-style"},"主题风格")],-1);function o(e,t,n,o,s,r){var d=(0,i.resolveComponent)("animeui-home"),c=(0,i.resolveComponent)("router-view");return(0,i.openBlock)(),(0,i.createElementBlock)("div",l,[(0,i.createVNode)(d,{animeTemp:e.animeTemp,class:"back-home"},null,8,["animeTemp"]),(0,i.createElementVNode)("div",a,[m,(0,i.createVNode)(c,{animeTemp:e.animeTemp,BlendingsMeta:e.BlendingsMeta,StylesMeta:e.StylesMeta,relations:e.relations},null,8,["animeTemp","BlendingsMeta","StylesMeta","relations"])])])}var s=n(97117),r=(n(35583),(0,i.defineComponent)({name:"Theme",props:["animeTemp"],components:{"animeui-home":s.Z},setup:function(e){var t=(0,i.getCurrentInstance)();if(!t)throw new Error("Instance is not setted up. `internalInstance` is null");var n=t.appContext.config.globalProperties,l=n.$magic,a=l.__multiManager,m=(0,i.ref)({}),o=(0,i.ref)({});l._once("multiThemeLoaded",(function(){a.grabThemeMeta("",!1).then((function(e){m.value=e})),a.grabThemeMeta("",!0).then((function(e){o.value=e}))}),!0);var s=(0,i.reactive)({subThemeName:a.subThemeName});return{BlendingsMeta:m,StylesMeta:o,relations:s}},data:function(){return{}},computed:{},methods:{},created:function(){}})),d=(n(17059),n(83744));const c=(0,d.Z)(r,[["render",o]]);var h=c},68442:function(e,t,n){"use strict";function i(e,t,n,i,l,a){return null}n.r(t),n.d(t,{default:function(){return s}});var l=n(56598),a=(0,l.defineComponent)({name:"Infos",inheritAttrs:!1,props:["animeTemp","StylesMeta","BlendingsMeta"],setup:function(e){var t=(0,l.getCurrentInstance)();if(!t)throw new Error("Instance is not setted up. `internalInstance` is null");var n=t.appContext.config.globalProperties;n.$magic},mounted:function(){},unmounted:function(){}}),m=n(83744);const o=(0,m.Z)(a,[["render",i]]);var s=o},363:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return O}});n(68309),n(82526),n(41817);var i=n(56598),l=n(89234),a=n(46769),m=n(72595),o={class:"main-body"},s={class:"body-theme-blending"},r=(0,i.createElementVNode)("h2",null,"主题配色列表",-1),d=(0,i.createElementVNode)("i",null,"点击标题启用",-1),c={class:"blending-list"},h={class:"blending-list-box"},u={class:"theme-thumb-layer"},b=(0,i.createElementVNode)("div",{class:"theme-details"},[(0,i.createElementVNode)("button",{class:"fadeInUp"},"详情")],-1),y=["onClick"],p=["title"],f={style:{color:"rgb(var(--v-theme-on-surface))"}},g={style:{color:"rgba(var(--v-theme-on-surface), 0.7)"}},v={class:"theme-desc singleline-omit"},x={class:"theme-list-item add-theme add-theme-blending"},N={title:"添加新主题",target:"_blank",href:"https://lozyue.github.io/AnimeSearcherUI/theme-dev/blending/"},E=(0,i.createTextVNode)("mdi-plus-circle-outline"),V=(0,i.createElementVNode)("div",null,"添加主题配色",-1),k={class:"body-theme-style"},w=(0,i.createElementVNode)("h2",null,"主题风格列表",-1),B=(0,i.createElementVNode)("i",null,"点击标题启用",-1),C={class:"style-list"},M={class:"style-list-box"},T={class:"theme-thumb-layer"},S=(0,i.createElementVNode)("div",{class:"theme-details"},[(0,i.createElementVNode)("button",{class:"animated"},"详情")],-1),I=["onClick"],z=["title"],_={style:{color:"rgb(var(--v-theme-on-surface))"}},D={style:{color:"rgba(var(--v-theme-on-surface), 0.7)"}},Z={class:"theme-desc singleline-omit"},A={class:"theme-list-item add-theme add-theme-style"},U={title:"添加新主题",target:"_blank",href:"https://lozyue.github.io/AnimeSearcherUI/theme-dev/style/"},j=(0,i.createTextVNode)("mdi-plus-circle-outline"),$=(0,i.createElementVNode)("div",null,"添加主题风格",-1),L=(0,i.createStaticVNode)('<div class="body-development"><h2>主题开发配件</h2><div><a href="#">主题风格开发</a><a href="#/development/blending">主题配色开发</a><a href="#/development/pallet">调色板</a><a href="">按键名称映射</a></div></div>',1);function P(e,t,n,P,q,F){var H=(0,i.resolveDirective)("vertical-scroll");return(0,i.openBlock)(),(0,i.createElementBlock)("section",o,[(0,i.createElementVNode)("div",s,[r,d,(0,i.createElementVNode)("div",c,[(0,i.withDirectives)(((0,i.openBlock)(),(0,i.createElementBlock)("ul",h,[((0,i.openBlock)(!0),(0,i.createElementBlock)(i.Fragment,null,(0,i.renderList)(e.BlendingsMeta,(function(t,n){return(0,i.withDirectives)(((0,i.openBlock)(),(0,i.createElementBlock)("li",{key:n,class:(0,i.normalizeClass)(["blending-list-item theme-list-item card",{"style-sub subtheme":n===e.relations.subThemeName}])},[(0,i.createElementVNode)("div",{class:"theme-thumb",style:(0,i.normalizeStyle)(t.thumbs?"background-image:url(".concat(t.thumbs,")"):"")},null,4),(0,i.createElementVNode)("div",u,[(0,i.createVNode)(l.C),b,(0,i.createVNode)(l.C),(0,i.createElementVNode)("div",{class:"theme-header",onClick:function(n){return e.$magic.deposit.squeezeThemeBlending(t.name)}},[(0,i.createElementVNode)("button",{class:"theme-title",title:"点击应用主题配色".concat(t.alias||t.name)},[(0,i.createElementVNode)("span",f,(0,i.toDisplayString)(t.alias),1),(0,i.createElementVNode)("span",g,"("+(0,i.toDisplayString)(t.name)+")",1)],8,p),(0,i.createElementVNode)("div",v,(0,i.toDisplayString)(t.description),1)],8,y)])],2)),[[m.H]])})),128)),(0,i.createElementVNode)("li",x,[(0,i.createElementVNode)("a",N,[(0,i.createVNode)(a.t,{class:"add-theme-icon"},{default:(0,i.withCtx)((function(){return[E]})),_:1}),V])])])),[[H]])])]),(0,i.createElementVNode)("div",k,[w,B,(0,i.createElementVNode)("div",C,[(0,i.withDirectives)(((0,i.openBlock)(),(0,i.createElementBlock)("ul",M,[((0,i.openBlock)(!0),(0,i.createElementBlock)(i.Fragment,null,(0,i.renderList)(e.StylesMeta,(function(t,n){return(0,i.withDirectives)(((0,i.openBlock)(),(0,i.createElementBlock)("li",{key:n,class:(0,i.normalizeClass)(["style-list-item theme-list-item card",{"style-sub subtheme":n===e.relations.subThemeName}])},[(0,i.createElementVNode)("div",{class:"theme-thumb",style:(0,i.normalizeStyle)(t.thumbs?"background-image:url(".concat(t.thumbs,")"):"")},null,4),(0,i.createElementVNode)("div",T,[(0,i.createVNode)(l.C),S,(0,i.createVNode)(l.C),(0,i.createElementVNode)("div",{class:"theme-header",onClick:function(n){return e.$magic.deposit.squeezeThemeStyle(t.name)}},[(0,i.createElementVNode)("button",{class:"theme-title",title:"点击应用主题风格".concat(t.alias||t.name)},[(0,i.createElementVNode)("span",_,(0,i.toDisplayString)(t.alias),1),(0,i.createElementVNode)("span",D,"("+(0,i.toDisplayString)(t.name)+")",1)],8,z),(0,i.createElementVNode)("div",Z,(0,i.toDisplayString)(t.description),1)],8,I)])],2)),[[m.H]])})),128)),(0,i.createElementVNode)("li",A,[(0,i.createElementVNode)("a",U,[(0,i.createVNode)(a.t,{class:"add-theme-icon"},{default:(0,i.withCtx)((function(){return[j]})),_:1}),$])])])),[[H]])])]),L])}var q=(0,i.defineComponent)({name:"Index",inheritAttrs:!1,props:["animeTemp","StylesMeta","BlendingsMeta","relations"],setup:function(e){var t=(0,i.getCurrentInstance)();if(!t)throw new Error("Instance is not setted up. `internalInstance` is null");var n=t.appContext.config.globalProperties;n.$magic},mounted:function(){},unmounted:function(){}}),F=(n(53936),n(83744));const H=(0,F.Z)(q,[["render",P]]);var O=H},97117:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var i=n(56598),l={class:"animeui-home"},a={href:"#/",class:"animesearcher-icon",draggable:"false","data-balloon":"返回主页","data-balloon-pos":"down"},m={key:0,href:"#/",target:"_blank",draggable:"false",class:"animesearcher-title","data-balloon":"新窗口打开主页","data-balloon-pos":"down"},o=(0,i.createElementVNode)("div",{style:{"font-size":"1.25rem","line-height":"1rem"}},"Anime",-1),s=(0,i.createElementVNode)("div",{style:{"font-size":"1rem","line-height":"1rem"}},"Searcher",-1),r=[o,s];function d(e,t,n,o,s,d){var c=(0,i.resolveComponent)("svgicon");return(0,i.openBlock)(),(0,i.createElementBlock)("div",l,[(0,i.createElementVNode)("a",a,[(0,i.createElementVNode)("span",null,[(0,i.createVNode)(c,{name:"logo",color:"rgb(var(--v-theme-on-surface))"})])]),e.animeTemp.isMobile?(0,i.createCommentVNode)("",!0):((0,i.openBlock)(),(0,i.createElementBlock)("a",m,r))])}var c=(0,i.defineComponent)({name:"animeui-home",props:{animeTemp:{type:Object,default:{isMobile:!1}}},setup:function(){}}),h=(n(2235),n(83744));const u=(0,h.Z)(c,[["render",d]]);var b=u},15430:function(e,t,n){"use strict";n.r(t);var i=n(8081),l=n.n(i),a=n(23645),m=n.n(a),o=m()(l());o.push([e.id,"",""]),t["default"]=o},99216:function(e,t,n){"use strict";n.r(t);var i=n(8081),l=n.n(i),a=n(23645),m=n.n(a),o=m()(l());o.push([e.id,"#theme .main-body .blending-list-box,#theme .main-body .style-list-box{display:flex;flex-wrap:nowrap;overflow-x:scroll;flex-direction:row;padding:.75em .5em}#theme .main-body .blending-list-box .theme-list-item,#theme .main-body .style-list-box .theme-list-item{flex:0 0 16em;height:9em;list-style:none;order:1;margin:0 .5em;overflow:hidden}#theme .main-body .blending-list-box .theme-list-item.add-theme,#theme .main-body .style-list-box .theme-list-item.add-theme{display:flex;align-items:center;justify-content:space-around;cursor:pointer;border:5px dashed rgb(var(--v-grey));border-radius:var(--v-layer-lg-radius);order:5}#theme .main-body .blending-list-box .theme-list-item.add-theme .add-theme-icon,#theme .main-body .style-list-box .theme-list-item.add-theme .add-theme-icon{font-size:5em;color:rgb(var(--v-theme-on-surface))}#theme .main-body .blending-list-box .theme-list-item.add-theme a,#theme .main-body .style-list-box .theme-list-item.add-theme a{text-decoration:none;color:rgb(var(--v-theme-on-surface))}#theme .main-body .blending-list-box .theme-list-item.subtheme,#theme .main-body .style-list-box .theme-list-item.subtheme{order:2;cursor:not-allowed}#theme .main-body .blending-list-box .theme-list-item.subtheme .theme-thumb-layer .theme-header .theme-desc,#theme .main-body .blending-list-box .theme-list-item.subtheme .theme-thumb-layer .theme-header button,#theme .main-body .style-list-box .theme-list-item.subtheme .theme-thumb-layer .theme-header .theme-desc,#theme .main-body .style-list-box .theme-list-item.subtheme .theme-thumb-layer .theme-header button{cursor:not-allowed}#theme .main-body .blending-list-box .theme-list-item .theme-thumb,#theme .main-body .style-list-box .theme-list-item .theme-thumb{position:absolute;top:0;right:0;bottom:0;left:0;background-size:cover;z-index:0}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;display:flex;flex-direction:column;justify-content:space-between;align-items:center}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer:hover .theme-details button,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer:hover .theme-details button{display:block}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer .theme-details button,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer .theme-details button{display:none;padding:.5em 1.75em;border:1px solid rgb(var(--v-theme-on-surface));border-radius:2em;background:rgba(var(--v-theme-surface),.7);-webkit-animation:fadeInUp .4s ease-out;animation:fadeInUp .4s ease-out}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer .theme-header,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer .theme-header{width:100%;display:flex;flex-wrap:nowrap;justify-content:space-around;flex-direction:column;align-items:normal;background:rgba(var(--v-theme-surface),.86)}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer .theme-header button.theme-title,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer .theme-header button.theme-title{align-self:center}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer .theme-header button.theme-title span:first-child,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer .theme-header button.theme-title span:first-child{font-size:1.25rem}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer .theme-header button.theme-title span:last-child,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer .theme-header button.theme-title span:last-child{font-size:1rem}#theme .main-body .blending-list-box .theme-list-item .theme-thumb-layer .theme-header .theme-desc,#theme .main-body .style-list-box .theme-list-item .theme-thumb-layer .theme-header .theme-desc{align-self:normal;padding-left:.75em;cursor:pointer}",""]),t["default"]=o},46721:function(e,t,n){"use strict";n.r(t);var i=n(8081),l=n.n(i),a=n(23645),m=n.n(a),o=m()(l());o.push([e.id,".animeui-home{display:flex;align-items:center;justify-content:flex-start}.animeui-home a{text-decoration:none;color:inherit}.animeui-home a:visited{color:inherit}.animeui-home .animesearcher-icon{display:inline-block;padding:.375em .375em .25em .5em}.animeui-home .animesearcher-title{display:inline-block;padding:.375em .5em .375em .125em;text-align:center}",""]),t["default"]=o},17059:function(e,t,n){var i=n(15430);i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals);var l=n(54402).Z;l("be758418",i,!0,{sourceMap:!1,shadowMode:!1})},53936:function(e,t,n){var i=n(99216);i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals);var l=n(54402).Z;l("038d6798",i,!0,{sourceMap:!1,shadowMode:!1})},2235:function(e,t,n){var i=n(46721);i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals);var l=n(54402).Z;l("948cd04e",i,!0,{sourceMap:!1,shadowMode:!1})}}]);
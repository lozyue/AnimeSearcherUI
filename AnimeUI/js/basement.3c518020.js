(self["webpackChunkAnimeUI"]=self["webpackChunkAnimeUI"]||[]).push([[767],{98599:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return v}});var a=o(44359),r={id:"about",class:"layout"},n=(0,a.createElementVNode)("h1",{class:"page-headline"},[(0,a.createElementVNode)("span",null,"About")],-1),l={class:"main layout resp-width resp-padding vw-center"},i={class:"entrance"},c={class:"thx-star"},s=(0,a.createElementVNode)("p",null," 尽管很长的一段时间，白猫中的星星数都徘徊在这一区间。 ",-1),d=(0,a.createElementVNode)("p",null," 但这如火花般的跳跃闪烁数字，却化作了我们继续维护的力量。 ",-1),u=(0,a.createElementVNode)("p",null,null,-1),h={class:"card px-2 py-3",style:{"background-color":"rgb(246, 248, 250)"}},m=(0,a.createStaticVNode)('<section class="footer"><ul><li class="inspire"><span> Crafted with </span><div class="heart-fly-placeholder"><span class="heart-fly"></span></div><span> by Lozyue. </span></li><li class="grey--text"><span><span>© 2021</span> AnimeUI 2.x </span></li></ul></section>',1);function p(e,t,o,p,b,f){var g=(0,a.resolveComponent)("animeui-home"),v=(0,a.resolveComponent)("github-header");return(0,a.openBlock)(),(0,a.createElementBlock)("div",r,[n,(0,a.createVNode)(g,{class:"back-home"}),(0,a.createElementVNode)("div",l,[(0,a.createElementVNode)("section",i,[((0,a.openBlock)(),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)(100,(function(e){return(0,a.createElementVNode)("div",{class:"content",key:e},"This is about page")})),64)),(0,a.createElementVNode)("div",c,[s,d,u,(0,a.createElementVNode)("div",h,[(0,a.createVNode)(v)])])]),m])])}o(41539),o(78783),o(33948);var b=o(60052),f=function(){return o.e(767).then(o.bind(o,1229))},g=(0,a.defineComponent)({name:"About",components:{"github-header":(0,a.defineAsyncComponent)(f),"animeui-home":b.Z},setup:function(){}});o(96561);g.render=p;var v=g},25e3:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return s}});var a=o(44359),r={id:"BadGetAway"},n=(0,a.createElementVNode)("h1",null,"502 Bad Get Away",-1),l=[n];function i(e,t,o,n,i,c){return(0,a.openBlock)(),(0,a.createElementBlock)("div",r,l)}var c=(0,a.defineComponent)({name:"BadGetAway",mounted:function(){},destroyed:function(){}});c.render=i;var s=c},47852:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return i}});var a=o(44359),r={id:"forbidden"};function n(e,t,o,n,l,i){return(0,a.openBlock)(),(0,a.createElementBlock)("div",r)}var l=(0,a.defineComponent)({name:"Forbidden",setup:function(){},data:function(){return{}},computed:{},created:function(){},mounted:function(){},unmounted:function(){}});l.render=n;var i=l},91435:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return y}});var a=o(44359),r={ref:"notfound",id:"not-found",class:"layout boxfull lycontainer"},n={class:"main"},l=(0,a.createElementVNode)("h1",{class:"title"},[(0,a.createElementVNode)("span",null,"404")],-1),i=(0,a.createElementVNode)("h3",{class:"subtitle"},[(0,a.createElementVNode)("span",null,"Page"),(0,a.createElementVNode)("span",null,"Not"),(0,a.createElementVNode)("span",null,"Found")],-1),c=(0,a.createElementVNode)("div",{class:"actions"},[(0,a.createElementVNode)("a",{href:"javascript:history.back(-1)"},[(0,a.createElementVNode)("button",null,"Go Back")]),(0,a.createElementVNode)("a",{href:"#/"},[(0,a.createElementVNode)("button",null,"Home")])],-1);function s(e,t,o,s,d,u){var h=(0,a.resolveComponent)("ly-single-full");return(0,a.openBlock)(),(0,a.createElementBlock)("div",r,[(0,a.createElementVNode)("div",n,[(0,a.createVNode)(h,null,{default:(0,a.withCtx)((function(){return[l,i,c]})),_:1})])],512)}var d=o(78566),u=o(60536),h=o(32225),m={class:"stroke-btn"},p=(0,a.createTextVNode)(" hover button ");function b(e,t,o,r,n,l){return(0,a.openBlock)(),(0,a.createElementBlock)("button",m,[(0,a.renderSlot)(e.$slots,"default",{},(function(){return[p]}))])}var f=(0,a.defineComponent)({name:"stroked-btn"});o(31313);f.render=b;var g=o(23176),v={class:["custom-background","bg-anime"]},x=(0,a.defineComponent)({name:"NotFound",components:{"ly-single-full":h.Z},mounted:function(){var e=this;this.animamtion=(0,u.once)((function(){e.$refs.notfound.classList.add("notfound-anime"),e.$refs.notfound.addEventListener("animationend",(function(e){g.DEBUG&&console.log(e.target),e.target.classList.add("bg-anime-final")}))})),this.$magic.utility.setBackground(v,!1),(0,d.clickToAction)(this.animamtion)},unmounted:function(){this.$magic.utility.setBackground(v,!0),(0,d.clickToAction)(this.animamtion,!1)}});o(69101);x.render=s;var y=x},32225:function(e,t,o){"use strict";o.d(t,{Z:function(){return d}});var a=o(44359),r={class:"layout vw-center lycontainer boxfull"},n={class:"layout vh-center lycontainer boxfull"},l={class:"wrap"};function i(e,t,o,i,c,s){return(0,a.openBlock)(),(0,a.createElementBlock)("div",r,[(0,a.createElementVNode)("div",n,[(0,a.createElementVNode)("div",l,[(0,a.renderSlot)(e.$slots,"default")])])])}var c=o(78566),s=(0,a.defineComponent)({name:"singleFull",setup:function(){var e="body::-webkit-scrollbar{width: 0px;height: 0px;}html, body{scrollbar-width: 0;overflow: hidden;-ms-overflow-style:none;}";(0,c.inject_style)(e,"",{id:"hide-scroll"},!0),(0,a.onUnmounted)((function(){var e=document.querySelector("#hide-scroll");e&&e.remove()}))}});s.render=i;var d=s},1229:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return B}});var a=o(44359),r={class:"github-header d-flex mb-3 px-3 px-md-4 px-lg-5"},n=(0,a.createStaticVNode)('<div class="flex-auto min-width-0 width-fit mr-3"><h1 class="d-flex flex-wrap flex-items-center wb-break-word f3 text-normal"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo color-icon-secondary mr-2"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg><span class="author flex-self-stretch" itemprop="author"><a target="_blank" class="url fn" rel="author" data-hovercard-type="user" data-hovercard-url="/users/zaxtyson/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/zaxtyson">zaxtyson</a></span><span class="mx-1 flex-self-stretch color-fg-muted">/</span><strong itemprop="name" class="mr-2 flex-self-stretch"><a target="_blank" data-pjax="#js-repo-pjax-container" href="https://github.com/zaxtyson/AnimeSearcher">AnimeSearcher</a></strong><span></span><span class="Label Label--secondary v-align-middle mr-1">Public</span></h1></div>',1),l={class:"pagehead-actions flex-shrink-0 d-none d-md-inline",style:{padding:"2px 0"}},i=(0,a.createElementVNode)("li",null,[(0,a.createElementVNode)("a",{target:"_blank",href:"https://github.com/login?return_to=%2Fzaxtyson%2FAnimeSearcher",rel:"nofollow","data-hydro-click":'{"event_type":"authentication.click","payload":{"location_in_page":"notification subscription menu watch","repository_id":null,"auth_type":"LOG_IN","originating_url":"https://github.com/zaxtyson/AnimeSearcher","user_id":null}}',"data-hydro-click-hmac":"bd393ea83c8ab534dfad23d8464980c3f68d043b49ce41f881fdf7d2805ddd42","aria-label":"You must be signed in to change notification settings",role:"button","data-view-component":"true",class:"tooltipped tooltipped-s btn-sm btn"},[(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-bell"},[(0,a.createElementVNode)("path",{d:"M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"}),(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z"})]),(0,a.createTextVNode)(" Notifications ")])],-1),c=(0,a.createElementVNode)("a",{target:"_blank",href:"https://github.com/login?return_to=%2Fzaxtyson%2FAnimeSearcher",rel:"nofollow","data-hydro-click":'{"event_type":"authentication.click","payload":{"location_in_page":"star button","repository_id":290173136,"auth_type":"LOG_IN","originating_url":"https://github.com/zaxtyson/AnimeSearcher","user_id":null}}',"data-hydro-click-hmac":"80c34704b8e55e338c8dc565c65f4e1b729d9691464ee99cc1d8e2a4b4317096","aria-label":"You must be signed in to star a repository",role:"button","data-view-component":"true",class:"tooltipped tooltipped-s btn-with-count btn-sm btn"},[(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-star v-align-text-bottom mr-1"},[(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"})]),(0,a.createElementVNode)("span",{"data-view-component":"true"}," Star ")],-1),s={target:"_blank",class:"social-count js-social-count",href:"https://github.com/zaxtyson/AnimeSearcher/stargazers","aria-label":"362 users starred this repository","data-singular-suffix":"user starred this repository","data-plural-suffix":"users starred this repository"},d=(0,a.createElementVNode)("a",{target:"_blank",href:"https://github.com/login?return_to=%2Fzaxtyson%2FAnimeSearcher",rel:"nofollow","data-hydro-click":'{"event_type":"authentication.click","payload":{"location_in_page":"repo details fork button","repository_id":290173136,"auth_type":"LOG_IN","originating_url":"https://github.com/zaxtyson/AnimeSearcher","user_id":null}}',"data-hydro-click-hmac":"f97d3ba77e64bde67ee632b29919223e48661fe1ae45bc13de0fd6ca7a0e22bc","aria-label":"You must be signed in to fork a repository",role:"button","data-view-component":"true",class:"tooltipped tooltipped-s btn-with-count btn-sm btn"},[(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-repo-forked"},[(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"})]),(0,a.createTextVNode)(" Fork ")],-1),u={target:"_blank",href:"https://github.com/zaxtyson/AnimeSearcher/network/members",class:"social-count","aria-label":"39 users forked this repository"},h=(0,a.createElementVNode)("li",null,null,-1),m={class:"github-header",id:"responsive-meta-container","data-pjax-replace":""},p={class:"d-block d-md-none mb-2 px-3 px-md-4 px-lg-5"},b=(0,a.createStaticVNode)('<p class="f4 mb-3"> 整合第三方网站的视频和弹幕资源, 为白嫖党提供最佳看番追剧体验 </p><div class="mb-2"><a target="_blank" href="https://github.com/zaxtyson/AnimeSearcher/blob/master/LICENSE" class="Link--muted"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-law mr-1"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg> MIT License </a></div>',2),f={class:"mb-3"},g={target:"_blank",class:"Link--secondary no-underline mr-3",href:"https://github.com/zaxtyson/AnimeSearcher/stargazers"},v=(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-star mr-1"},[(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"})],-1),x={class:"text-bold"},y=(0,a.createTextVNode)(" stars "),w={target:"_blank",class:"Link--secondary no-underline",href:"https://github.com/zaxtyson/AnimeSearcher/network/members"},k=(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-repo-forked mr-1"},[(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"})],-1),V={class:"text-bold"},N=(0,a.createTextVNode)(" forks "),E=(0,a.createElementVNode)("div",{class:"d-flex"},[(0,a.createElementVNode)("div",{class:"flex-1 mr-2"},[(0,a.createElementVNode)("div",null,[(0,a.createElementVNode)("a",{target:"_blank",href:"https://github.com/login?return_to=%2Fzaxtyson%2FAnimeSearcher",rel:"nofollow","data-hydro-click":'{"event_type":"authentication.click","payload":{"location_in_page":"star button","repository_id":290173136,"auth_type":"LOG_IN","originating_url":"https://github.com/zaxtyson/AnimeSearcher","user_id":null}}',"data-hydro-click-hmac":"80c34704b8e55e338c8dc565c65f4e1b729d9691464ee99cc1d8e2a4b4317096","aria-label":"You must be signed in to star a repository",role:"button","data-view-component":"true",class:"tooltipped tooltipped-s btn-sm btn btn-block"},[(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-star v-align-text-bottom mr-1"},[(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"})]),(0,a.createElementVNode)("span",{"data-view-component":"true"}," Star ")])])]),(0,a.createElementVNode)("div",{class:"flex-1"},[(0,a.createElementVNode)("a",{target:"_blank",href:"https://github.com/login?return_to=%2Fzaxtyson%2FAnimeSearcher",rel:"nofollow","data-hydro-click":'{"event_type":"authentication.click","payload":{"location_in_page":"notification subscription menu watch","repository_id":null,"auth_type":"LOG_IN","originating_url":"https://github.com/zaxtyson/AnimeSearcher","user_id":null}}',"data-hydro-click-hmac":"bd393ea83c8ab534dfad23d8464980c3f68d043b49ce41f881fdf7d2805ddd42","aria-label":"You must be signed in to change notification settings",role:"button","data-view-component":"true",class:"tooltipped tooltipped-s btn-sm btn btn-block"},[(0,a.createElementVNode)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",class:"octicon octicon-bell"},[(0,a.createElementVNode)("path",{d:"M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"}),(0,a.createElementVNode)("path",{"fill-rule":"evenodd",d:"M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z"})]),(0,a.createTextVNode)(" Notifications ")])])],-1);function _(e,t,o,_,z,A){return(0,a.openBlock)(),(0,a.createElementBlock)(a.Fragment,null,[(0,a.createElementVNode)("div",r,[n,(0,a.createElementVNode)("ul",l,[i,(0,a.createElementVNode)("li",null,[(0,a.createElementVNode)("div",null,[c,(0,a.createElementVNode)("a",s,(0,a.toDisplayString)(e.GitRepository.stars),1)])]),(0,a.createElementVNode)("li",null,[d,(0,a.createElementVNode)("a",u,(0,a.toDisplayString)(e.GitRepository.forks),1)]),h])]),(0,a.createElementVNode)("div",m,[(0,a.createElementVNode)("div",p,[b,(0,a.createElementVNode)("div",f,[(0,a.createElementVNode)("a",g,[v,(0,a.createElementVNode)("span",x,(0,a.toDisplayString)(e.GitRepository.stars),1),y]),(0,a.createElementVNode)("a",w,[k,(0,a.createElementVNode)("span",V,(0,a.toDisplayString)(e.GitRepository.forks),1),N])]),E])])],64)}var z=o(66252),A=o(23176),L=(0,z.aZ)({setup:function(){return{GitRepository:A.GitRepository}}});o(68504);L.render=_;var B=L},60052:function(e,t,o){"use strict";o.d(t,{Z:function(){return h}});var a=o(44359),r={class:"animeui-home"},n={href:"#/",class:"animesearcher-icon mr-1",draggable:"false","data-balloon":"返回主页","data-balloon-pos":"down"},l={key:0,href:"#/",target:"_blank",draggable:"false",class:"animesearcher-title","data-balloon":"新窗口打开主页","data-balloon-pos":"down"},i=(0,a.createElementVNode)("div",{style:{"font-size":"1.25rem","line-height":"1rem"}},"Anime",-1),c=(0,a.createElementVNode)("div",{style:{"font-size":"1rem","line-height":"1rem"}},"Searcher",-1),s=[i,c];function d(e,t,o,i,c,d){var u=(0,a.resolveComponent)("svgicon");return(0,a.openBlock)(),(0,a.createElementBlock)("div",r,[(0,a.createElementVNode)("a",n,[(0,a.createElementVNode)("span",null,[(0,a.createVNode)(u,{name:"logo",color:"rgb(var(--v-theme-on-surface))"})])]),e.animeTemp.isMobile?(0,a.createCommentVNode)("",!0):((0,a.openBlock)(),(0,a.createElementBlock)("a",l,s))])}var u=(0,a.defineComponent)({name:"animeui-home",props:{animeTemp:{type:Object,default:{isMobile:!1}}},setup:function(){}});o(13543);u.render=d;var h=u},30653:function(e,t,o){"use strict";o.r(t);var a=o(23645),r=o.n(a),n=r()((function(e){return e[1]}));n.push([e.id,"#about .main{display:flex;min-height:100%;flex-direction:column;flex-wrap:nowrap;justify-content:space-between;align-items:stretch}#about .main .entrance{flex-grow:1;margin:20px 0}#about .main .entrance .thx-star{margin:1em .5em}#about .main .footer,#about .main .header{flex-grow:0;flex-shrink:0}#about .main .footer{margin-bottom:2em;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#about .main .footer ul{display:flex;flex-direction:column;flex-wrap:nowrap;align-items:center;margin:1em auto;text-align:center}#about .main .footer ul li{flex-grow:1;margin:0 auto .25em;list-style-type:none;text-align:left}#about .inspire{position:relative}#about .inspire .heart-fly-placeholder{display:inline-block;width:2em}#about .inspire .heart-fly-placeholder .heart-fly{width:5em;margin-left:-1.5em}",""]),t["default"]=n},7838:function(e,t,o){"use strict";o.r(t);var a=o(23645),r=o.n(a),n=o(61667),l=o.n(n),i=o(24646),c=r()((function(e){return e[1]})),s=l()(i.Z);c.push([e.id,"#not-found{overflow:hidden}#not-found .main .wrap{display:flex;flex-direction:column;justify-content:space-around;align-items:center;width:100%}#not-found .main .wrap .title{margin-bottom:6%;display:inline-block;font-size:66px}#not-found .main .wrap .subtitle{margin-bottom:4%;display:inline-block;font-size:20px}#not-found .main .wrap .subtitle span{display:inline-block;margin-right:8px}#not-found .main .wrap .actions{display:flex;justify-content:space-around}#not-found .main .wrap .actions a{text-decoration:none;color:rgb(var(--v-theme-surface))}#not-found .main .wrap .actions a button{margin:auto 8px;padding:10px 8px;border:2px solid rgb(var(--v-theme-surface));border-radius:var(--v-layer-lg-radius)}.lybackground{position:fixed;top:0;bottom:0;left:0;right:0;z-index:-1}.custom-background{background:url("+s+");background-size:cover;background-position:50%;background-repeat:no-repeat}.notfound-anime .bg-anime{-webkit-animation:bg-scale 15s linear;animation:bg-scale 15s linear;-webkit-animation-delay:3s;animation-delay:3s}.notfound-anime .bg-anime-final{transform:scale(1.25) translateX(100px)}@-webkit-keyframes bg-scale{30%,40%{transform:scale(1.15)}60%,70%{transform:scale(1.15) translateX(100px)}to{transform:scale(1.25) translateX(100px)}}@keyframes bg-scale{30%,40%{transform:scale(1.15)}60%,70%{transform:scale(1.15) translateX(100px)}to{transform:scale(1.25) translateX(100px)}}",""]),t["default"]=c},26803:function(e,t,o){"use strict";o.r(t);var a=o(23645),r=o.n(a),n=r()((function(e){return e[1]}));n.push([e.id,'.stroke-btn{position:relative;margin:auto;width:200px;height:100px;line-height:100px;text-align:center;overflow:hidden}.stroke-btn:after{content:"Hover Me";position:absolute;top:4px;bottom:4px;right:4px;left:4px;line-height:92px;font-size:24px;background:#fff;border:2px solid #9acd32;cursor:pointer;color:#9acd32}.stroke-btn:before{content:"";position:absolute;top:0;bottom:0;right:-20px;left:0;background:#fff;transform:rotate(-90deg) translate(-100%,-100%);transform-origin:top left;transition:transform .3s;transition-timing-function:linear}.stroke-btn:hover:before{transform:rotate(0deg) translate(0)}',""]),t["default"]=n},61966:function(e,t,o){"use strict";o.r(t);var a=o(23645),r=o.n(a),n=r()((function(e){return e[1]}));n.push([e.id,".github-header .d-flex{display:flex!important}.github-header .wb-break-word{word-break:break-word!important;word-wrap:break-word!important;overflow-wrap:break-word!important}.github-header .text-normal{font-weight:400!important}.github-header .f3{font-size:20px!important}.github-header .flex-items-center{align-items:center!important}.github-header .flex-wrap{flex-wrap:wrap!important}.github-header .flex-auto{flex:auto!important}.github-header .flex-shrink-0{flex-shrink:0!important}.github-header h1{font-size:32px;font-weight:600;font-size:2em;margin:.67em 0;margin-top:.67em;margin-bottom:.67em}.github-header h1,.github-header h2,.github-header h3,.github-header h4,.github-header h5,.github-header h6{margin-top:0;margin-bottom:0}.github-header ol,.github-header ul{padding-left:0;margin-top:0;margin-bottom:0}.github-header .label:hover,.github-header .Label:hover{text-decoration:none}.github-header .Label--secondary{color:var(--color-fg-muted);border-color:var(--color-border-default)}.github-header .label,.github-header .Label{display:inline-block;padding:0 7px;font-size:12px;font-weight:500;line-height:18px;border:1px solid transparent;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:2em;background-color:transparent!important;border-color:var(--color-border-default)}.github-header .mr-1{margin-right:4px!important}.github-header .v-align-middle{vertical-align:middle!important}.github-header .color-icon-secondary{color:var(--color-fg-muted)!important}.github-header .flex-self-stretch{align-self:stretch!important}.github-header .Link--muted,.github-header .Link--secondary{color:var(--color-fg-muted)!important}.github-header .btn{position:relative;display:inline-block;padding:5px 16px;font-size:14px;font-weight:500;line-height:20px;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;border:1px solid;border-top-color:currentcolor;border-right-color:currentcolor;border-bottom-color:currentcolor;border-left-color:currentcolor;border-radius:6px;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:var(--color-btn-text);background-color:var(--color-btn-bg);border-color:var(--color-btn-border);box-shadow:var(--color-btn-shadow),var(--color-btn-inset-shadow);transition:.2s cubic-bezier(.3,0,.5,1);transition-property:all;transition-property:color,background-color,border-color}.github-header a{color:var(--color-accent-fg);text-decoration:none;background-color:transparent}.github-header *{box-sizing:border-box}.github-header .btn.hover,.github-header .btn:hover,.github-header [open]>.btn{background-color:var(--color-btn-hover-bg);border-color:var(--color-btn-hover-border);transition-duration:.1s}.github-header .btn:hover{text-decoration:none}.github-header a:hover{text-decoration:underline}.github-header a:active,.github-header a:hover{outline-width:0}.github-header .pagehead-actions>li{float:left;margin:0 10px 0 0;font-size:11px;color:var(--color-fg-default);list-style-type:none}.github-header .tooltipped{position:relative}.github-header .btn-sm{padding:3px 12px;font-size:12px;line-height:20px}.github-header .btn-with-count{float:left;border-top-right-radius:0;border-bottom-right-radius:0}.github-header .octicon{display:inline-block;overflow:visible!important;vertical-align:text-bottom;fill:currentColor}.github-header .btn .octicon{margin-right:4px;color:var(--color-fg-muted);vertical-align:text-bottom}.github-header .btn .octicon:only-child{margin-right:0}.github-header .btn-sm .octicon{vertical-align:text-top}.github-header svg:not(:root){overflow:hidden}.github-header .social-count{position:relative;float:left;padding:3px 12px;font-size:12px;font-weight:600;line-height:20px;color:var(--color-fg-default);vertical-align:middle;background-color:var(--color-canvas-default);border:1px solid var(--color-btn-border);border-left:0;border-top-right-radius:6px;border-bottom-right-radius:6px;box-shadow:var(--color-shadow-small),var(--color-primer-shadow-highlight)}.github-header .social-count:hover{color:var(--color-accent-fg);cursor:pointer}.github-header .social-count:active,.github-header .social-count:hover{text-decoration:none}.github-header{box-sizing:border-box;--color-canvas-default-transparent:hsla(0,0%,100%,0);--color-marketing-icon-primary:#218bff;--color-marketing-icon-secondary:#54aeff;--color-search-keyword-hl:#fff8c5;--color-project-header-bg:#24292f;--color-project-sidebar-bg:#fff;--color-project-gradient-in:#fff;--color-project-gradient-out:hsla(0,0%,100%,0);--color-avatar-bg:#fff;--color-avatar-border:rgba(27,31,36,0.15);--color-avatar-stack-fade:#afb8c1;--color-avatar-stack-fade-more:#d0d7de;--color-avatar-child-shadow:-2px -2px 0 hsla(0,0%,100%,0.8);--color-topic-tag-border:transparent;--color-select-menu-backdrop-border:transparent;--color-select-menu-tap-highlight:rgba(175,184,193,0.5);--color-select-menu-tap-focus-bg:#b6e3ff;--color-overlay-shadow:0 1px 3px rgba(27,31,36,0.12),0 8px 24px rgba(66,74,83,0.12);--color-sidenav-selected-bg:#fff;--color-menu-bg-active:transparent;--color-input-disabled-bg:rgba(175,184,193,0.2);--color-timeline-badge-bg:#eaeef2;--color-btn-text:#24292f;--color-btn-bg:#f6f8fa;--color-btn-border:rgba(27,31,36,0.15);--color-btn-shadow:0 1px 0 rgba(27,31,36,0.04);--color-btn-inset-shadow:inset 0 1px 0 hsla(0,0%,100%,0.25);--color-btn-hover-bg:#f3f4f6;--color-btn-hover-border:rgba(27,31,36,0.15);--color-btn-active-bg:#ebecf0;--color-btn-active-border:rgba(27,31,36,0.15);--color-btn-selected-bg:#eeeff2;--color-btn-focus-bg:#f6f8fa;--color-btn-focus-border:rgba(27,31,36,0.15);--color-btn-focus-shadow:0 0 0 3px rgba(9,105,218,0.3);--color-btn-shadow-active:inset 0 0.15em 0.3em rgba(27,31,36,0.15);--color-btn-shadow-input-focus:0 0 0 0.2em rgba(9,105,218,0.3);--color-btn-counter-bg:rgba(27,31,36,0.08);--color-underlinenav-icon:#6e7781;--color-underlinenav-border-hover:rgba(175,184,193,0.2);--color-fg-default:#24292f;--color-fg-muted:#57606a;--color-fg-subtle:#6e7781;--color-fg-on-emphasis:#fff;--color-canvas-default:#fff;--color-canvas-overlay:#fff;--color-canvas-inset:#f6f8fa;--color-canvas-subtle:#f6f8fa;--color-border-default:#d0d7de;--color-border-muted:#d8dee4;--color-border-subtle:rgba(27,31,36,0.15);--color-shadow-small:0 1px 0 rgba(27,31,36,0.04);--color-shadow-medium:0 3px 6px hsla(212,9%,59%,0.15);--color-shadow-large:0 8px 24px hsla(212,9%,59%,0.2);--color-shadow-extra-large:0 12px 28px hsla(212,9%,59%,0.3);--color-neutral-emphasis-plus:#24292f;--color-neutral-emphasis:#6e7781;--color-neutral-muted:rgba(175,184,193,0.2);--color-neutral-subtle:rgba(234,238,242,0.5);--color-accent-fg:#0969da;--color-accent-emphasis:#0969da;--color-accent-muted:rgba(84,174,255,0.4);--color-accent-subtle:#ddf4ff;--color-success-fg:#1a7f37;--color-success-emphasis:#2da44e;--color-success-muted:rgba(74,194,107,0.4);--color-success-subtle:#dafbe1;--color-attention-fg:#9a6700;--color-attention-emphasis:#bf8700;--color-attention-muted:rgba(212,167,44,0.4);--color-attention-subtle:#fff8c5;--color-severe-fg:#bc4c00;--color-severe-emphasis:#bc4c00;--color-severe-muted:rgba(251,143,68,0.4);--color-severe-subtle:#fff1e5;--color-danger-fg:#cf222e;--color-danger-emphasis:#cf222e;--color-danger-muted:rgba(255,129,130,0.4);--color-danger-subtle:#ffebe9;--color-done-fg:#8250df;--color-done-emphasis:#8250df;--color-done-muted:rgba(194,151,255,0.4);--color-done-subtle:#fbefff;--color-sponsors-fg:#bf3989;--color-sponsors-emphasis:#bf3989;--color-sponsors-muted:rgba(255,128,200,0.4);--color-sponsors-subtle:#ffeff7;--color-primer-fg-disabled:#8c959f;--color-primer-canvas-backdrop:rgba(27,31,36,0.5);--color-primer-canvas-sticky:hsla(0,0%,100%,0.95);--color-primer-border-active:#fd8c73;--color-primer-border-contrast:rgba(27,31,36,0.1);--color-primer-shadow-highlight:inset 0 1px 0 hsla(0,0%,100%,0.25);--color-primer-shadow-inset:inset 0 1px 0 rgba(208,215,222,0.2);--color-primer-shadow-focus:0 0 0 3px rgba(9,105,218,0.3)}",""]),t["default"]=n},4321:function(e,t,o){"use strict";o.r(t);var a=o(23645),r=o.n(a),n=r()((function(e){return e[1]}));n.push([e.id,".animeui-home{display:flex;align-items:center;justify-content:start}.animeui-home a{text-decoration:none}.animeui-home a:visited{color:inherit}.animeui-home .animesearcher-title{text-align:center}",""]),t["default"]=n},24646:function(e,t,o){"use strict";t["Z"]=o.p+"img/404.89ca5aaa.png"},96561:function(e,t,o){var a=o(30653);a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals);var r=o(45346).Z;r("427436c8",a,!0,{sourceMap:!1,shadowMode:!1})},69101:function(e,t,o){var a=o(7838);a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals);var r=o(45346).Z;r("529887f6",a,!0,{sourceMap:!1,shadowMode:!1})},31313:function(e,t,o){var a=o(26803);a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals);var r=o(45346).Z;r("2275d710",a,!0,{sourceMap:!1,shadowMode:!1})},68504:function(e,t,o){var a=o(61966);a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals);var r=o(45346).Z;r("2a3decfd",a,!0,{sourceMap:!1,shadowMode:!1})},13543:function(e,t,o){var a=o(4321);a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals);var r=o(45346).Z;r("5c399b11",a,!0,{sourceMap:!1,shadowMode:!1})}}]);
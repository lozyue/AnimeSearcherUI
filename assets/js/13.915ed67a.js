(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{398:function(e,t,v){"use strict";v.r(t);var _=v(49),s=Object(_.a)({},(function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"开始使用"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#开始使用"}},[e._v("#")]),e._v(" 开始使用")]),e._v(" "),v("p",[e._v("AnimeUI是由 HTML、JavaScript、CSS 打造的Web应用程序，\n可以运行在所有支持现代浏览器的平台上。")]),e._v(" "),v("div",{staticClass:"custom-block warning"},[v("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),v("p",[e._v("即是程序的需要，也是为了更好的体验，均推荐使用较新版的Chrome或Firefox浏览器")]),e._v(" "),v("p",[e._v("浏览器兼容性参考: "),v("RouterLink",{attrs:{to:"/features/index.html#browser-compatibility"}},[e._v("浏览器兼容性参考")])],1)]),e._v(" "),v("p",[e._v("友情链接:")]),e._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"https://www.mozilla.org/zh-CN/firefox/all/#product-desktop-release",target:"_blank",rel:"noopener noreferrer"}},[e._v("Firefox最新国际版"),v("OutboundLink")],1)]),e._v(" "),v("li",[v("a",{attrs:{href:"https://www.google.cn/chrome/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Chrome浏览器"),v("OutboundLink")],1)])]),e._v(" "),v("h2",{attrs:{id:"运行模式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#运行模式"}},[e._v("#")]),e._v(" 运行模式")]),e._v(" "),v("h3",{attrs:{id:"部署http-https服务方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#部署http-https服务方式"}},[e._v("#")]),e._v(" 部署HTTP/HTTPS服务方式")]),e._v(" "),v("p",[e._v("Web应用程序自然是支持HTTP/HTTPS方式部署的，本身接口采用跨域请求设计，部署WebUI并无任何障碍。\n目前2.0默认采用HTTP方式部署。")]),e._v(" "),v("p",[e._v("如果WebUI使用HTTPS提供服务，那么Anime-API也最好要使用HTTPS协议*。")]),e._v(" "),v("p",[e._v("AnimeUI与后端通信目前使用了两个接口：")]),e._v(" "),v("ul",[v("li",[e._v("Web Socket 接口")]),e._v(" "),v("li",[e._v("Ajax HTTP/HTTPS 通信接口")])]),e._v(" "),v("details",{staticClass:"custom-block details"},[v("summary",[e._v("Tips")]),e._v(" "),v("p",[e._v("部署的方式可以是本地部署(127.0.0.1 / localhost*)也可以是服务器部署。")]),e._v(" "),v("p",[e._v("将WebUI部署至更安全的Https:协议服务能获得一些更多的权限.* 但你需要自行申请到证书。")]),e._v(" "),v("p",[e._v("需要注意的是，如果使用的Anime-API服务地址不是本地回环地址的（比如部署在服务器上的地址），\n并且你没有为Anime-API 配置反代或者别的方式的HTTPS支持的话，浏览器会拦截WebUI对Anime-API的请求。")]),e._v(" "),v("p",[e._v("任何一种部署工具均可:")]),e._v(" "),v("ul",[v("li",[e._v("Nginx")]),e._v(" "),v("li",[e._v("Apache")]),e._v(" "),v("li",[e._v("Tomcat")]),e._v(" "),v("li",[e._v("live-server(node)")]),e._v(" "),v("li",[e._v("Flask、Quart(python)")])])]),e._v(" "),v("p",[e._v("需要注意的是对若对API服务进行了服务器部署，\nAnimeUI与API默认的通信接口需要进行修改。")]),e._v(" "),v("p",[e._v("在AnimeUI应用的偏好选项页面"),v("code",[e._v("/preferences")]),e._v("中均支持进行配置。并进行浏览器本地储存与API端Storage接口双重存储。")]),e._v(" "),v("p",[e._v("用应用自带的设置项进行设置在通信地址易发生变更的情况下较为方便。\n但你也可以通过直接修改程序源码的方式直接覆盖默认配置。")]),e._v(" "),v("p",[e._v("配置方法如下：")]),e._v(" "),v("ol",[v("li",[e._v("进入Web端AnimeUI程序文件夹（取决于安装位置）")]),e._v(" "),v("li",[e._v('打开文件 "/js/config.*.js"')]),e._v(" "),v("li",[e._v("搜索找到 "),v("code",[e._v("baseURL")]),e._v(", "),v("code",[e._v("$baseSocket")]),e._v("; 其分别对应 HTTP/HTTPS 通信地址、WebSocket 通信地址")]),e._v(" "),v("li",[e._v("将冒号后面的值进行相应修改，注意不要忘了保留地址协议头。")])]),e._v(" "),v("p",[e._v("此外，不同的部署方式会导致浏览器跨域策略以及安全限制策略发生不同的变化，\n使用HTTP/HTTPS方式可能有更多的图片/视频资源需要走服务端代理\n但同时也可以获得导出视频截图等部分功能权限。")]),e._v(" "),v("h3",{attrs:{id:"本地文件协议file-方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#本地文件协议file-方式"}},[e._v("#")]),e._v(" 本地文件协议File:方式")]),e._v(" "),v("p",[e._v("为了减少走API代理的流量，默认使用浏览器本地文件协议"),v("code",[e._v("file:")]),e._v("可获得更稳定的跨站播放体验。这是过去WebUI默认的模式。")]),e._v(" "),v("p",[e._v("该模式下浏览器对其有特殊的同源政策，\n而2.0新增的主题系统等需要API的支持，故需要正确配置服务端对于WebUI主题配置文件代理。")]),e._v(" "),v("p",[e._v("对此，目前为了适配本地文件协议，在 file:协议运行下的WebUI需要 服务端Anime-API 对主题等目录的代理支持。\n而代理需要确保WebUI路径对于Anime-API已知，默认安装路径会自动计算正确的路径进行代理。\n但也就是说，您将不能像以往一样随意单独移动WebUI的程序位置。*(See below WARNING)")]),e._v(" "),v("p",[e._v("(目前Anime-API并未提供对主题程序的支持，所以上述无效...)")]),e._v(" "),v("div",{staticClass:"custom-block warning"},[v("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),v("p",[e._v("脱离了代理目前的 File:协议 方式下主题系统等将无法工作，\n原因是Chrome、Firefox 67+就已经默认启用的更严格的本地特殊同源选项。")]),e._v(" "),v("p",[e._v("你可以通过修改浏览器设定并对WebUI JS代码作很简单的修改 或者改用 "),v("a",{attrs:{href:"#%E9%83%A8%E7%BD%B2http-https%E6%9C%8D%E5%8A%A1%E6%96%B9%E5%BC%8F"}},[e._v("HTTP/HTTPS部署方式")]),e._v(" 进行运行。")]),e._v(" "),v("p",[e._v("WebUI JS代码部分修改:"),v("br"),e._v('\n打开UI全局载入配置文件 "/js/config.*.js" 并找到 '),v("code",[e._v("CHECKFILESOURCE")]),e._v(" 将其值修改为 "),v("code",[e._v("false")]),e._v("(冒号后)")]),e._v(" "),v("p",[e._v("修改浏览器设定可参考: "),v("RouterLink",{attrs:{to:"/instruction/helper.html#修改浏览器本地特殊同源设定"}},[e._v("修改浏览器本地特殊同源设定")])],1)])])}),[],!1,null,null,null);t.default=s.exports}}]);
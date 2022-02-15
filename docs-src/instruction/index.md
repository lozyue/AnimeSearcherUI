# 开始使用

AnimeUI是由 HTML、JavaScript、CSS 打造的Web应用程序，
可以运行在所有支持现代浏览器的平台上。

::: warning
即是程序的需要，也是为了更好的体验，均推荐使用较新版的Chrome或Firefox浏览器

浏览器兼容性参考: [浏览器兼容性参考](/features/index.html#browser-compatibility)
:::

友情链接:
- [Firefox最新国际版](https://www.mozilla.org/zh-CN/firefox/all/#product-desktop-release)
- [Chrome浏览器](https://www.google.cn/chrome/)


## 运行模式

### 部署HTTP/HTTPS服务方式

Web应用程序自然是支持HTTP/HTTPS方式部署的，本身接口采用跨域请求设计，部署WebUI并无任何障碍。
目前2.0默认采用HTTP方式部署。

如果WebUI使用HTTPS提供服务，那么Anime-API也最好要使用HTTPS协议*。

AnimeUI与后端通信目前使用了两个接口：

- Web Socket 接口
- Ajax HTTP/HTTPS 通信接口 

::: details Tips
部署的方式可以是本地部署(127.0.0.1 / localhost*)也可以是服务器部署。

将WebUI部署至更安全的Https:协议服务能获得一些更多的权限.* 但你需要自行申请到证书。

需要注意的是，如果使用的Anime-API服务地址不是本地回环地址的（比如部署在服务器上的地址），
并且你没有为Anime-API 配置反代或者别的方式的HTTPS支持的话，浏览器会拦截WebUI对Anime-API的请求。

任何一种部署工具均可:
- Nginx
- Apache
- Tomcat
- live-server(node)
- Flask、Quart(python)
:::

需要注意的是对若对API服务进行了服务器部署，
AnimeUI与API默认的通信接口需要进行修改。

在AnimeUI应用的偏好选项页面`/preferences`中均支持进行配置。并进行浏览器本地储存与API端Storage接口双重存储。

用应用自带的设置项进行设置在通信地址易发生变更的情况下较为方便。
但你也可以通过直接修改程序源码的方式直接覆盖默认配置。


配置方法如下：
1. 进入Web端AnimeUI程序文件夹（取决于安装位置）  
2. 打开文件 "/js/config.*.js"  
3. 搜索找到 `baseURL`, `$baseSocket`; 其分别对应 HTTP/HTTPS 通信地址、WebSocket 通信地址
4. 将冒号后面的值进行相应修改，注意不要忘了保留地址协议头。

此外，不同的部署方式会导致浏览器跨域策略以及安全限制策略发生不同的变化，
使用HTTP/HTTPS方式可能有更多的图片/视频资源需要走服务端代理
但同时也可以获得导出视频截图等部分功能权限。


### 本地文件协议File:方式

为了减少走API代理的流量，默认使用浏览器本地文件协议`file:`可获得更稳定的跨站播放体验。这是过去WebUI默认的模式。

该模式下浏览器对其有特殊的同源政策，
而2.0新增的主题系统等需要API的支持，故需要正确配置服务端对于WebUI主题配置文件代理。

对此，目前为了适配本地文件协议，在 file:协议运行下的WebUI需要 服务端Anime-API 对主题等目录的代理支持。
而代理需要确保WebUI路径对于Anime-API已知，默认安装路径会自动计算正确的路径进行代理。
但也就是说，您将不能像以往一样随意单独移动WebUI的程序位置。*(See below WARNING)

(目前Anime-API并未提供对主题程序的支持，所以上述无效...)

::: warning WARNING
脱离了代理目前的 File:协议 方式下主题系统等将无法工作，
原因是Chrome、Firefox 67+就已经默认启用的更严格的本地特殊同源选项。

你可以通过修改浏览器设定并对WebUI JS代码作很简单的修改 或者改用 [HTTP/HTTPS部署方式](#部署http-https服务方式) 进行运行。

WebUI JS代码部分修改:  
打开UI全局载入配置文件 "/js/config.*.js" 并找到 `CHECKFILESOURCE` 将其值修改为 `false`(冒号后)

修改浏览器设定可参考: [修改浏览器本地特殊同源设定](./helper.html#修改浏览器本地特殊同源设定)
:::


## 全局子主题

为了提高在频繁更新情况下主题的易用性和保持对一般用户的友好性，AnimeUI提供了一套内置全局子主题。

全局子主题分为 Global-SubTheme-Blending(全局子主题配色) 和 Global-SubTheme-Style(全局子主题风格)

其配置和开发方式基本同普通主题配色和主题风格一致，
详情查看：

- [主题开发介绍](/theme-dev/)教程

### 配置子主题

在主题根配置JSON文件中，有一个 `internal` 属性
```json
{
  "internal": {
    "title": "主题内嵌相关配置",
    "hint": "默认无需修改",
    "withCustom": "custom"
  }
}
```
在这个属性内有一个 `withCustom` 属性，它指定了一个全局的用户子主题名

同时这个主题名也是开发主题时取名的保留字段。这个属性并不建议修改。

全局子主题本质也是一个主题，你可以在 `themes/blendings`和`themes/styles` 看到一个 `custom` 的文件夹

这就是自带的全局子主题 `custom` 预设。

打开里面你大概会发现里面内容什么都没有。

**但在里面做的所有设定，都会以比其他主题更高的优先级呈现效果**

估计你已经猜到了，如果你并不想完整的做一个主题共享出来,
或是仅仅想对别人做的主题进行部分修改，
那么在这个预设全局子主题中实现将会是很好的方式。

在主题更新或者AnimeUI系统更新时，你便只需直接拷贝覆盖custom主题而无需做任何配置。

::: warning Tips
全局子主题 不具有继承特性，也即 `dark` 选项 在全局子主题中是无效的。

同时，全局子主题也不具有运行时上下文，即依赖于当前主题风格对象的API将无法工作，比如`resolvePath`
:::


### 禁用子主题

因为无论 预设子主题 中有没有填充内容，主题系统都会默认加载这个主题。

如果你想禁用它 (以便于省下那么一个网络请求的话)

将其配置为`false`即可.

```json
// 禁用全局子主题
{
  "internal": {
    "withCustom": false
  }
}
```

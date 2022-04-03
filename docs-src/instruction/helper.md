---
sidebar: auto
sidebarDepth: 2
---

# Helper(帮助)

这里是一些通用的帮助姿势合集。

## 修改浏览器本地特殊同源设定

用于开启本地文件协议更宽松的同源政策。
允许File:协议下Ajax的访问文件操作。

- Firefox 的修改设定方式如下：
> Firefox 新建标签页 地址栏输入 about:config  
> 点击接受风险并继续  
> 搜索栏输入并找到: `privacy.file_unique_origin`  
> 切换 值为 false 即可(无需刷新)  

- Chrome 修改改设定需要添加启动参数: (以windows为例) 
> 找到Chrome快捷方式编辑属性 (或者直接找到Chrome.exe安装路径创建一个快捷方式)   
> 在"快捷方式"选项下的"目标"路径末尾后面加启动参数 ` --allow-file-access-from-files`(需要添加空格)  
> 重启chrome以完成  

附图:  
<p>
  <img :src="$withBase('/assets/images/add-file-access.jpg')" alt="Chrome添加启动参数示例">
</p>
<!-- ![Chrome添加启动参数示例](/assets/images/add-file-access.jpg) -->

::: danger 注意:
**修改该设定需要自行承担微小可能的文件被碰撞窃取的风险！**
**请不要用该浏览器打开任何不信任的本地网页文件**  

风险提示: [CVE-2019-11730](https://www.mozilla.org/en-US/security/advisories/mfsa2019-21/#CVE-2019-11730)
:::


## 修改浏览器跨域资源共享检查(禁用CORS)

修改作用：
开放JavaScript权限，允许XHR请求加载任何可用的跨源请求。

修改方式：
<!-- Refer: https://stackoverflow.com/questions/41395583/how-to-disable-cors-in-mozilla-firefox -->
- Firefox:
> 在firefox中访问cors-everywhere插件页面: [https://addons.mozilla.org/zh-CN/firefox/addon/cors-everywhere/](https://addons.mozilla.org/zh-CN/firefox/addon/cors-everywhere/)  
> 点击安装，确认权限  
> 回到目标网页刷新 点击扩展图标待变绿（详见扩展说明）启用CORS规则禁用 此时跨域访问不受限制  
> 使用完毕建议再次点击图标变红恢复默认  
> 高级：扩展图标上点击 管理扩展-选项 在白名单中添加允许跨域访问的目标域名(可能比较麻烦)
>     此时开启拓展图标将显示半红半绿 只对白名单中的资源域有效

<!-- Refer: https://alfilatov.com/posts/run-chrome-without-cors/ -->
- Chrome 
> 新建一个快捷启动方式  
> 找到Chrome快捷方式编辑属性 （同上图）  
> 在"快捷方式"选项下的"目标"路径末尾后面加启动参数 ` --disable-web-security --user-data-dir=~/chromeTemp`(需要添加空格隔开)    
> 从该快捷方式启动的Chrome实例即可享有JavaScript任意跨域资源访问权限  
> 打开后看到欢迎界面以及提示安全性下降的横幅即启用成功  
> 注意该方式会产生一个新的Chrome用户配置（最好的方式也是去寻找一个具有该功能的浏览器插件或者干脆使用Firefox）

::: warning 注意:
该方式基本上只是解除了浏览器对JS的XHR请求的限制，并未直接带来安全风险(对于Firefox来说是, Chrome暂不清楚)。
但此模式下所有网页可以不受浏览器限制任意窃取互联网资源，由此可能造成的法律责任请用户考虑清楚。

此修改仅用于开发者进行调试。
:::


## 修改浏览器混合内容载入策略
<!-- Refer https://juemuren4449.com/archives/chrome-mixed-content-solution -->
该策略也属于浏览器安全策略中的一项，其表现为运行在 https 协议下的网页不能访问仅 http 的内容。

要避免该策略，一个方法是所有内容都使用 https 协议，或者全都使用 http 协议。
另一个方法是关闭浏览器的这个策略。

- Firefox
> Firefox 新建标签页 地址栏输入 about:config  
> 点击接受风险并继续  
> 搜索栏输入并找到: `security.mixed_content.block_active_content`  
> 切换 值为 false 即可(无需刷新)  
> 设置项全局生效  

- Chrome
<!-- Relative chrome://flags/#treat-unsafe-downloads-as-active-content -->
> 访问目标网页可以在控制台看到混合内置载入被阻止的提示  
> 单击导航栏网址左边的图标（通常是一把锁Lock）  
> 在弹出的菜单栏中选择 网站设置  
> 在新打开的选项页面中找到"不安全内容"(insecure content)  
> 右边选项改为允许即可  

> Chrome中该选项仅对该网页有效，对安全的影响暂不清楚

::: danger 注意:
该方式提供了一定的安全风险在于载入混合内容中的 http 内容有被劫持的风险从而影响当前工作在https的页面。
只有在充分信任的 http 内容提供者和互联网运营商的接入网络时才能保证内容安全。

此修改仅用于开发者进行调试。
:::

# Web UI

AnimeSearcher前端UI项目

适配 [AnimeSearcher](https://github.com/zaxtyson/AnimeSearcher/) 的Web前端

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

Year, Nothing need to do haha！

It's just a simple Vue3.0 project. Easy to Modify & Build.


## 技术依赖

- 核心基于非完全MVVM框架 `Vue`
- 前端路由`vue-router`
- Material Design Component `Vuetify`
- Promise 的 HTTP 通信组件库 `axios`
- H5弹幕播放器 `DPlayer`
- 加载条 `NProgress`


### Process

@2021-02-10 update 1.3.0
- √ 修改通信接口适配后端框架重构
- √ 完成了消息队列核心和高性能存储类核心的解耦重构
- √ 播放器增加顶条topbar以在全屏显示视频名称和时间信息等
- √ 播放器增加弹幕区域选项，防止弹幕过多遮挡字幕
- √ 增加手动设置全局服务器通信地址选项供自建服务使用
- √ 增加搜索结果页面缓存,前进后退更流畅
- √ 增加对话框组件，清空历史按钮弹出提示框确认
- √ 美化播放器控制组件的一些样式
- √ 美化了日/夜间模式的切换显示

@2021-01-16 update 1.1.8-fixed2
- √ 修复搜索请求发送重复导致结果重复等问题
- √ 增加夜间模式供全局切换
- √ 修复更新显示问题和第二次检测更新的误导性提示

@2021-01-13 update 1.1.8-fixed2
- √ 观看视频时点击小电视图标跳转主页导致历史记录失效的问题

@2021-01-13 update 1.1.8-fixed
- √ 修复弹幕自动匹配失败后手动选择弹幕集按钮点击无效的问题和部分浏览器按钮排列乱序问题

@2021-01-11 update 1.1.8
- √ 增加搜素结果异步显示的支持,拒绝漫长等待,搜索更丝滑
- √ 完善历史记录,增强后端支持的详情页解析,历史播放更便捷
- √ 修复弹幕库未加载完立即(过早？)点击视频时自动弹幕匹配失败的问题
- √ 历史记录的保存数量限制开放到32条最多

@2021-01-09 update 1.1.4
- √ 增加快捷键上一集`[`和下一集`]` 的事件接口
- √ 播放页支持快捷键上一集`[`和下一集`]`
- √ 主页其他设置模块增加[用户体验改进计划]和[沉浸模式]选项的快捷开关按钮
- √ 优化增强：上一集下一集的顺序主观跟随右侧[选集列表]排序

@2021-01-06 update 1.1.0
- √ 加入Half-virtual-scroll的弹幕列表Display面板
- √ 播放器暂停增加bili小图标
- √ 调整弹幕字体大小，默认20px，页面或网页全屏时自动调整至22px
- √ 增强了消息条模块和action消息队列的核心支持。
- √ 播放页增加宽屏模式支持
- √ 调整Dplayer的设置面板，增加自动播放按键，调整弹幕开关位置,清除初始化的空请求错误。
- √ 修复无效空历史保存的bug，匹配增加按线路匹配优先，为未来按引擎搜索适配铺平道路。

- v1.0.0 Updated @2020-12-15
	- √ 增加观看记录提示消息条回调点击事件，支持直接跳转
	- √ 增加快捷键F、W切换网页全屏和页面全屏，全屏时鼠标中键滚动可调整音量
	- √ 修复了增强了更新检测算法，可检测到子版本
	- √ 加入首页观看历史记录展示修改面板
	- √ 合并弹幕player消息条hover滚动
	- √ 修复读取存储播放设置为空时产生的中断

- v1.0.0-beta 
	- 优化了播放器设置项
	- 修改Dplayer样式，移除多余按钮，弹幕样式速度和UI显示优化，倍速移动到外部
	- 增加本地观看历史记录，最多保存16个
	- 自动检测跳转上次播放进度并提示;搜索结果组件home也结果卡片比例调整，强制等高（Description部分可能会部分遮挡,等待重构）

- fixed bugs 弹幕自动匹配去掉了每轮进行的准确度过低数字搜索匹配，修改了footerMsg错序的问题；修正排序或逆序时右侧选集框定位滞留问题；优化换集显示 @2020-10-21

- v0.9.9 更新！增加了TV板块，优化各种设置项，集成消息队列核心支持搜索弹幕源，增加沉浸模式，增加弹幕的分类开关，增加新番表 @2020-10-21

- 增加了主题切换美化界面，增加了点击定位，追海贼王等长剧不用再苦翻列表了；修复选择弹幕，工具栏设置不同步等一些bug，增强弹幕匹配规则 @2020-10-01

- fixed some bugs @2020-09-11

- v0.9.8优化了排序的实现方法。为搜索记录增加单条删除键。视频页回车搜索新窗口打开。重构了搜索结果路由，前后前进更流畅。

- v0.9.7增加简单搜索记录，更新了HelloWorld页，为Home页卡片增加默认图（手动PS的哦）,更改了排序方式,补充了弹幕引擎设置

- v0.9.6修复限流造成的切换代理失败及代理时手动选择弹幕卡住的bugs

- v0.9.5完成了工具栏的各小按钮功能，选择弹幕功能。优化细节，修复几个bugs

- v0.9.4再次增强了自动匹配，增加了nprogress加载条，选集按钮标题修改，Dplayer出错回调增加节流限制，增加视频底部工具栏，选择弹幕功能暂未完成。

- v0.9.3增加了视频弹幕，自动匹配当前弹幕。略优化了Dplayer错误处理（暂未做限流throttle处理）@2020-08-30

- v0.9.1增加了配置项，修复代理通道无法切换的bug，任存在切换卡住的dplayer内部bug，再次手动选集可缓解。


## 开源计划变更：

在v1.3.0版本发布后，前端UI将进行大的重构

重构后仍然保持单机版的应用支持模式，并做好移动端适配

但随着项目的日益发展，使用人数渐渐增多，搭建了我们项目的小伙伴也日益增多

从可持续发展和防止被恶意修改利用的角度考虑

暂时做出决定重构后的前端代码将闭源(也是想偷懒)

但无论走多远，我们都不会忘记当初为什么要出发

AnimeSearcher项目将永远保持整洁、灵活、一切为了用户考虑的初心

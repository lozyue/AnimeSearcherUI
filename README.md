# AnimeSearcherUI

AnimeSearcher的Web前端源码.
详见![AnimeSearcher](https://github.com/zaxtyson/AnimeSearcher/)

## Project setup
```

```

### Compiles and hot-reloads for development
```

```

### Compiles and minifies for production
```

```

### Lints and fixes files
```

```

Nothing to do hahaha!

Just a Vue-cli project, easy to run and build!


## 技术依赖

- 核心基于非完全MVVM框架 `Vue`
- 前端路由`vue-router`
- Material Design Component `Vuetify`
- Promise 的 HTTP 通信组件库 `axios`
- H5弹幕播放器 `DPlayer`
- 加载条 `NProgress`


## Process

- 增加了设置项，修复bug，增加细节 @08-28

- Ending 增强了弹幕自动匹配，增加了nprogress加载条，选集按钮标题修改，Dplayer出错回调增加节流限制，增加视频底部工具栏，选择弹幕功能暂未完成。

- v0.9.4再次增强了自动匹配，增加了nprogress加载条，选集按钮标题修改，Dplayer出错回调增加节流限制，增加视频底部工具栏，选择弹幕功能暂未完成。

- v0.9.5完成了工具栏的下一集，快捷弹幕开关，消息条，自动切P等功能，选择弹幕功能。优化细节，修复几个bugs @2020-09-01

- v0.9.6修复限流造成的切换代理失败及代理时手动选择弹幕卡住的bugs @2020-09-02

- 0.9.7增加一个简洁的历史记录，更新了Helloworld页，为Home页卡片增加默认图（手动PS的哦）,更改了排序方式,补充了弹幕引擎设置 @2020-09-08

- v0.9.8简化修改了排序的实现方法。为搜索记录增加单条删除键。视频页回车搜索新窗口打开。重构了搜索结果路由，前后前进更流畅。

- fixed bugs @2020-09-11

- 增加了主题切换美化界面，增加了点击定位，追海贼王等长剧不用再苦翻列表了；修复选择弹幕，工具栏设置不同步等一些bug，增强弹幕匹配规则 @2020-10-01

- v0.9.9 大更新！增加了TV板块，优化各种设置项，集成消息队列核心支持搜索弹幕源，增加沉浸模式，增加弹幕的分类开关，增加新番表，但均待美化 @2020-10-21

- fixed bugs 弹幕自动匹配去掉了每轮进行的准确度过低数字搜索匹配，修改了footerMsg错序的问题；修正排序或逆序时右侧选集框定位滞留问题；优化换集显示问题。 @2020-10-21


### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

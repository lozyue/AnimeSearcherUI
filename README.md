# AnimeSearcherUI

AnimeSearcher的Web前端源码.
详见![AnimeSearcher](https://github.com/zaxtyson/AnimeSearcher/)

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

## 技术依赖

- 核心基于非完全MVVM框架 `Vue`
- Material Design Component `Vuetify`
- Promise 的 HTTP 通信组件库 `axios`
- H5弹幕播放器 `DPlayer`
- 加载条 `NProgress`


## Process

- v0.9.1增加了配置项，修复代理通道无法切换的bug，任存在切换卡住的dplayer内部bug，再次手动选集可缓解。
- v0.9.3增加了视频弹幕，自动匹配当前弹幕。略优化了Dplayer错误处理（暂未做限流throttle处理）@2020-08-30
- 增加了设置项，修复bug，增加细节—08-28
- Ending 增强了弹幕自动匹配，增加了nprogress加载条，选集按钮标题修改，Dplayer出错回调增加节流限制，增加视频底部工具栏，选择弹幕功能暂未完成。
- v0.9.4再次增强了自动匹配，增加了nprogress加载条，选集按钮标题修改，Dplayer出错回调增加节流限制，增加视频底部工具栏，选择弹幕功能暂未完成。
- v0.9.5完成了工具栏的下一集，快捷弹幕开关，消息条，自动切P等功能，选择弹幕功能。优化细节，修复几个bugs 2020-09-01
- v0.9.6修复限流造成的切换代理失败及代理时手动选择弹幕卡住的bugs 2020-09-02
- 0.9.7增加一个简洁的历史记录，更新了Helloworld页，为Home页卡片增加默认图（手动PS的哦）,更改了排序方式,补充了弹幕引擎设置 2020-09-08
- v0.9.8简化修改了排序的实现方法。为搜索记录增加单条删除键。视频页回车搜索新窗口打开。重构了搜索结果路由，前后前进更流畅。
- fixed bugs @2020-09-11

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---
sidebar: auto
sidebarDepth: 2
---

# 配置与API参考

配置离不开API， API也要正确进行配置

这里是AnimeUI主题风格的API 和 配置参考页。


## $theme

主题风格添加功能的入口函数，
$theme 能保证你添加的功能函数在恰当的时机执行，
通过指定页面匹配规则，让主题风格的功能增强就像修改传统多页应用一样简单。
并在恰当的时机清除副作用。

不严谨的TS类型参考: 
```ts
// $theme 函数原型
type $theme(
  // First param to invoke (or say inject impact). Do your jobs here!
  invoke: Calling, 
  // Second param to revoke the side-effection of previously invoke.
  revoke?: CallBack, // 可缺省
  // Third param to configuration 
  options?: Options // 可缺省
): any;

// Type declares in ts.
type CallBack = (a: Utility, b: Utils, enhance: Enhance)=>unknown;
// "revoke" is refers to the prototype of revoke Function.
type Calling = (a: Utility, b: Utils, enhance: Enhance & { revoke:(typeof revoke) })=>unknown; 
interface Options {
  path?: string | string[] | RegExp | RegExp[], // default '', means match all.
  excludePath?: string | string[] | RegExp | RegExp[], // default [], means excludes none.
  onInvokeError?: CallBack, // 用于添加功能时出错的处理
  onRevokeError?: CallBack, // 用于消除副作用时出错的处理
};
type Enhance = {
  getVue: ()=>{ ..Vue }, // 获取Vue
  getRoute: ()=>Route, // 获取当前页面VueRouter的Route对象
  getRouter: ()=>VueRouter, // 获取VueRouter
  ...GlobalConstructors, // 更多的全局共享模块
}

type GlobalConstructors = {
  axios, Lycabinet, Laction, 
};
```

目前 `$theme` 函数的第二个、第三个参数都可缺省。

对于 `$theme` 回调函数的前两个参数 utility和utils 均为包含各种实用函数方法的对象，其内容详见：
- 第一个参数: [主题风格API功能库 Utility](#utility)
- 第二个参数: [静态函数共享 Utils](#utils)

第三个参数是后续所有拓展的内容，目前这里共享了有Vue(Vue3)，VueRouterInstance, 当前页面route对象，以及一些其他的全局构造类(如Axios、Lycabinet、Laction等)

其中Vue(Vue3)，VueRouterInstance, 当前页面route对象的获取方式均为函数返回值。

示例:
```js
$theme(function(utility, utils, Ehance){
  const { getVue, getRouter, getRoute } = Ehance;
  // 引入任何Vue3 Hook，支持Template编译
  const { createApp, ref, reactive } = getVue();
  const $router = getRouter();
  const $route = getRoute();

  // 打印route
  console.log($route);
  // 调用 $router.push 导航路由
  const waiting = $router.push("/navigator"); 
  
  // 预先创建节点
  const div = document.createElement("div");
  div.innerHTML=`
    <div id="counter">
      Counter: {{ counter }}
    </div>
  `;

  // 创建Vue实例
  const Counter = {
    data() {
      return {
        counter: 0
      }
    },
    mounted() {
      setInterval(() => {
        this.counter++
      }, 1000)
    }
  }
  waiting.then(()=>{
    document.querySelector(".main").appendChild(div);
    const myapp = createApp(Counter).mount('#counter');
  });
});
```

有了 $router 对象，你就能任意对页面进行导航、修改路由。

有了支持动态编译的全部Vue函数组件，你甚至能配合动态添加路由直接编写加入新页面！

Links:
- [Vue3](https://v3.cn.vuejs.org/guide/introduction.html)
- [VueRouter](https://router.vuejs.org/zh/guide/#javascript)
- [axios](https://axios-http.com/)

## Utility

Utility对象即是所谓的主题风格API功能库，其中包含了多个高度封装的函数接口供主题风格对应用进行定制。

其中有部分函数可能在运行时发生变化，主要部分是可能仅在其相应的路由页面下才存在。

可用方法列表：(Add Annotation / todo...)
```js
[
  "addQuotations",
  "setCategory",

  "isBlendingDark",
  "addThemeOptions",
  "resolvePath",
  "setBackground",
  "addAdorement",
  "removeAdorement",
  // Notification API
  "lzydialog",
  "lzynotice",
  "clearNotice",
  "addNotifycation",
  // For shortcut (namely hotkey)
  "alterShortcut",
  "registerShortcut",
  "unregisterShortcut",
  "resetShortcut",
  "lookupShortcut",
  // AuiPlayer Related
  "addPlayerHotkey",
  "auiplayer", "auiplayerDepthSet",
  // Events API
  "_on", "_off",
  "_once", "_isHappened",
]
```

### resolvePath

用于将路径字符串以当前激活的主题风格目录为根目录进行一次路径解析，得到可供浏览器正确识别的路径。

注意: 全局子主题中该API不能正常工作。


### lzynotice

显示一个消息条，
选项见TS定义:

```ts
type lzynotice = (options: Partial<Alert>)=>unkown;

type Alert = {
  // Behavior
  onHidden: Function, // Notice that click event will make notice auto hide.
  // layout
  position: 'side'|'center', // Position of display!
  // View
  content: string, // Support HTML-Text !
  semantic: Semantic, // Type of the display
  duration: number, // range(0,1-9); An integer multiplying power of 500 ms. Set 0 to wait until user touch it.
  // actions, For advace content Match like lzy.
  onMatched: (el: HTMLElement)=>unknown, // Match susscess 
  onMissed: (el: HTMLElement)=>unknown, // Match failed
  match: string, // Css Selector Pattern.
};
type Semantic = 'info'|'success'|'warning'|'error';
```

### lzydialog

显示一个对话框，
选项见TS定义:

```ts
type lzydialog = (options: Partial<PopUp>)=>unkown;

type PopUp = {
  // Behavior
  onHidden: Function,
  // show: Boolean,
  keepOuterClick: Boolean,
  // layout
  position:  `${('top'|'bottom'|'center')}.center` | 'center.center',
  // View
  title: string,
  content: string, // Support HTML-Text !
  semantic: Semantic, // Type of the display
  // actions
  actions: PopUpAction[],
};
type Semantic = 'info'|'success'|'warning'|'error'| 'none';
type PopUpAction = {
  text: string, // As a button content
  action: Function, // When choose the button
  semantic: Semantic, // button display type.
};
```

### registerShortcut

通过配置注册一个快捷键，注册的快捷键可通过指定名称供后续调用`alterShortcut`来达到快捷键自由更改的目的。

```ts
type ShortCut = {
  name: string, // Unique key name for keyboard shortcut changes.
  descriptions: string, // Add some description for us.
  invoke: (Event)=>any, // callback function.
  enable?: Boolean, // Whether the current shortcut parcel is actived
  eventType: 'keydown' | 'keyup' | 'keypress', // The first one is default; 
  commonKey: Array<BoardKey>, // A list of normal boardkey like `a`, `b`, `C`, `F1`...
  statuKey: Array<BoardstatuKey>, // A list of statu key Like `ctrl`,`alt`,`shift`
  caseSensitive: Boolean, // wheather distinguished alpha case. default false.
}
// Definition
function registerShortcut(options: Partial<ShortCut>){
  //...
} 
```

例如注册一个快捷键为 `ctrl`+`B` ，功能为滚动到底部。
```js
// `utility`为主题风格API功能库，`utils`为辅助函数库
const options = {
  name: "toBottom", // the name for index.
  descriptions: "滚到见底！",
  commonKey: 'B',
  statuKey: 'ctrl',
  invoke(eve){
    // 调用滚动控制函数 lyscrollTo
    utils.lyscrollTo({
      top: 9999,
    });
  }
};
// The impact of addPlayerHotkey will auto remove.
utility.registerShortcut(options);
```

由于注册的快捷键默认全局有效，如果你想限定范围，需要在消除副作用的函数中调用`unregisterShortcut`

### unregisterShortcut

通过注册的名称`name`禁用或者删除一个已激活的快捷键，如果该快捷键不存在将抛出一个错误。

要检查该快捷键是否存在，可以调用`lookupShortcut`传递该名称进行检查。

```ts
function unregisterShortcut(name: string, remain=true){}
// remain indicate the behavior is just disable this shortcut or delete all of its infos.
```

接上面的例子，要禁用注册的滚动到底部的快捷键：
```js
utility.registerShortcut("toBottom");
```


### lookupShortcut

通过名称检查快捷键是否存在，不存在则返回`null`, 存在返回该快捷键的描述对象。
```ts
function lookupShortcut(name: string=''){}
```

> 快捷键存在不一定为当前激活状态，当前激活状态可由查询出来的快捷键对象的`enable`属性描述。

如果缺省传递参数或者传递空参数，则返回包含所有注册的快捷键对象的数组。


### auiplayer

该方法接受一个回调，回调的第一个参数将传递当前AuiPlayer所包含的DLPlayer实例对象，
用于方便直接对播放器进行操作。

该方法仅在 Aui-Player 初始化后销毁前存在且可用。
请使用"auiplayer-mounted"事件来判断, 具体用法可到下面参考。

> DLPlayer由DPlayer创改而来，其实例大部分API仍然和DPlayer相同, 当前可参考[dplayer文档](http://dplayer.js.org/guide.html)

核心部分示例:
```js
function customPlayer(){
  utility.auiplayer(function(dlplayer)=>{
    dlplayer.seek(5*60); // 跳转至5分钟位置
    dlplayer.volume(0); // 静音 
    dlplayer.speed(2.5); // 2.5倍速播放
  });
}
if(utility._isHappened("auiplayer-mounted") ) customPlayer();
utility._on("auiplayer-mounted", customPlayer);
// remove the impact
revoke(()=>{
  utility._off("auiplayer-mounted", customPlayer);
});
```

### addPlayerHotkey

用于自定义添加Aui-Player播放器快捷键, 回调函数中的第一个参数将包含播放器对象实例供自定义操作。

> 该方法仅在 Aui-Player 初始化后销毁前存在且可用，无需手动消除影响，该方法添加的播放器快捷键会在播放器销毁时自动消除。

由于该方法依附于播放器存在的特殊性，我们需要借助事件系统来判断播放器是否初始化完成，AuiPlayer播放器初始化完成后会触发`auiplayer-mounted`事件。

可以使用 `_isHappened("auiplayer-mounted")` 来判定当前事件是否发生即播放器是否已经初始化完成。
如果已经初始化完成直接调用`addPlayerHotkey`添加快捷键即可，
如果没有则添加监听到该事件发生：`_on("auiplayer-mounted", callback)` ,同时也要记得取消监听 `_off("auiplayer-mounted")` 

一个来自Fantas主题的完整使用示例模板如下，其功能是按'A'视频播放向前空降90s :
```js
$theme(function(utility, utils, { revoke }){
  const options = {
    name: "jump90",
    descriptions: "Anime分区视频播放前进90s",
    commonKey: 'A',
    // dlplayer is the instance Object of DLPlayer
    invoke(dlplayer, eve){
      const nowTime = dlplayer.video.currentTime; // get current video playing time.
      if(nowTime+90 < dlplayer.video.duration){
        dlplayer.seek(nowTime + 90); // call 'seek' method to set the playing time
        // Given an dlplayer notice by calling 'notice' method 
        dlplayer.notice("向前速降了90s"); 
      }
    }
  };
  function addIt(){
    utility.addPlayerHotkey(options);
  }
  // Invoke on correct chance.
  if(utility._isHappened("auiplayer-mounted") ) addIt();
  utility._on("auiplayer-mounted", addIt);
  // remove the impact
  revoke(()=>{
    utility._off("auiplayer-mounted", addIt);
  });
}, function(){}, {
  path: ['/aui-player', '/anime/details/'], // Pages have supported player.
})
```


## Utils

这一部分是共享的常用静态函数，很多从名称上就可以猜出它们的功能。

在主题风格Script中试着灵活的运用它们，这能大大减小你的一些工作量。

暂时无法一一解释这些函数的功能和作用，你可以去查看这一部分的源码以具体了解其功能：[AnimeSearcherUI/Utils](https://github.com/lozyue/AnimeSearcherUI/tree/main/src/utils)

可用函数列表：
```js
[
  // 类型判断
  "is_Empty", "is_Defined", 
  "is_Number", "is_Array", "is_String", "is_Function", "is_RegExp", 
  "is_PlainObject", "is_Promise", "is_Primitive",
  // 对象操作
  "curveGet", "curveSet",
  "deepAssign",
  "objectSupplement", "deepSupplement",
  "deepClone",
  // 数组操作
  "creatArray", "mergeArray", "toTrueArray",
  "removeArrayItem", "moveArrayItem",
  "arrayShuffle", 
  // 其他
  "getExportMethod",
  "throttle", "debounce", "throttBounce",
  "once",
  "getSingleton",
  "arbitraryFree",
  "arbitraryWrap",
  "toggleClass",
  "clickToAction",
  "fileExport",
  "boundRectReset",
  "getHashPath",
  "getCurrentAddress",
  "isFileProtocol",
  "inject_style",
  "inject_script",
  "addScrollListener",
  "removeScrollListener",
  "toggle_fullscreen",
  "onceClassAnimation",
  "multiClassAnimation",
  "documentReady",
  "traceMultiTopMatch",
  "traceTopMatch",
  "getEventDelegate",
  "copyInterceptor",
  "copyTextToClipboard",
  "copyToClipboard",
  "copyToClipboard_compatible",
  "getPrettyTime",
  "CONSTS",
  "lyscrollTo",
]
```

## Events

### AnimeUI Events

使用`utility`中的事件API进行监听等操作。
```js
const EventsList = [
  'created','mounted',
  'storageCreated', 'storageMounted',
  // Preference
  "systemVersionLoaded", "preferSerieMounted", "preferenceRegistered",
  // Details
  "animeDataLoaded", "danmakuLoaded", "danmuMatch",
  // particular
  "multiThemeLoaded", "multiStyleApplied", "multiBlendingApplied",
]
``` 

### DLPlayer Events

可通过`utility.auiplayer()`传递一个回调，在回调参数中拿到dlplayer实例以操纵下列事件: 
```js
const EventsList = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'mozaudioavailable',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  'screenshot',
  'thumbnails_show', 'thumbnails_hide',
  'danmaku_show', 'danmaku_hide',
  'danmaku_clear', 'danmaku_loaded',
  'danmaku_send', 'danmaku_opacity',
  'danmaku_load_start', 'danmaku_load_end',
  'contextmenu_show', 'contextmenu_hide',
  'notice_show', 'notice_hide',
  'quality_start', 'quality_end',
  'destroy',
  'resize',
  'fullscreen', 'fullscreen_cancel',
  'webfullscreen', 'webfullscreen_cancel',
  'subtitle_show', 'subtitle_hide', 'subtitle_change',
  'settingchange', 
  "onplaynext",
]
```

## 文档不完全可靠

这一部分的内容随AnimeUI版本变化的可能性非常大，
因此文档可能不是最新的，要验证具体的内容建议自行打印出来查看。

```js
$theme(function(utility, utils, Enhance){
  console.log({
    utility, utils, Enhance
  });
});
```

对于一些用法上的参考，你仍然可以去参考示例 [示例主题Fantasy](https://github.com/lozyue/AnimeSearcherUI/tree/main/AnimeUI/themes/styles/fantasy)

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

```ts
// $theme 函数原型
function $theme(invoke: Calling, revoke: CallBack, options: Options = {}){
  // ...
};

// Type declares in ts.
type CallBack = (a: Utility, b: Utils, enhance: Enhance)=>unknown;
// \`revoke\` is refers to the prototype of revoke Function.
type Calling = (a: Utility, b: Utils, enhance: Enhance & { revoke:(typeof revoke) })=>unknown; 
interface Options {
  path?: string | string[] | RegExp | RegExp[], // default '', means match all.
  excludePath?: string | string[] | RegExp | RegExp[], // default [], means excludes none.
  onInvokeError?: CallBack,
  onRevokeError?: CallBack,
};
type Enhance = {
  getVue: ()=>{ ..Vue },
  getRoute: ()=>Route,
  getRouter: ()=>VueRouter,
  ...GlobalConstructors,
}
```

目前 `$theme` 函数的第二个、第三个参数都可缺省。

对于 `$theme` 回调函数的前两个参数内容，详见：
- 第一个参数: [主题风格API功能库 Utility](#utility)
- 第二个参数: [静态函数共享 Utils](#utils)

第三个参数是后续所有拓展的内容，目前这里共享了有Vue(Vue3)，VueRouterInstance, 当前页面route对象，以及一些其他的全局构造类(如Axios、Lycabinet、Laction等)

其中Vue(Vue3)，VueRouterInstance, 当前页面route对象的获取方式均为函数返回值。

示例:
```js
$theme(function(utility, utils, Extends){
  const { getVue, getRouter } = Extends;
  // 引入任何Vue3 Hook，支持Template编译
  const { createApp, ref, reactive } = getVue();
  const $router = getRouter();
});
```

有了 $router 对象，你就能任意对页面进行导航、修改路由。

有了支持动态编译的全部Vue函数组件，你甚至能配合动态添加路由直接编写加入新页面！

## Utility

Utility对象即是所谓的主题风格API功能库，其中包含了多个高度封装的函数接口供主题风格对应用进行定制。

其中有部分函数可能在运行时发生变化，主要部分是可能仅在其相应的路由页面下才存在。

可用方法列表：(Add Annotation / todo...)
```js
[
  "addAdorement​",
  "addThemeOptions",
  "addToInterface",
  "alterShortcut​",
  "isBlendingDark​",
  "lzydialog​",
  "lzynotice​",
  "registerShortcut",
  "removeAdorement​",
  "resetShortcut​",
  "resolvePath​",
  "setBackground​",
  "unregisterShortcut",
]
```

### lzynotice

显示一个消息条，
选项见TS定义:

```ts
type lzynotice = (options: Alert)=>unkown;

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
type lzydialog = (options: PopUp)=>unkown;

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


## Utils

这一部分是共享的常用静态函数，很多从名称上就可以猜出它们的功能。

这一部分的源码放在：[AnimeSearcherUI/Utils](https://github.com/lozyue/AnimeSearcherUI/tree/main/src/utils)
中，你可以看到其具体实现与功能。

可用函数列表：
```js
[
  "is_Number"​,
  "is_Empty"​,
  "is_Defined"​,
  "is_Array"​,
  "is_String"​,
  "is_Function"​,
  "is_PlainObject"​,
  "is_RegExp"​,
  "is_Promise"​,
  "toTrueArray"​,
  "curveGet"​,
  "curveSet"​,
  "getPrettyTime"​,
  "deepAssign"​,
  "objectSupplement"​,
  "deepSupplement"​,
  "getExportMethod"​,
  "getSingleton"​,
  "throttle"​,
  "debounce"​,
  "throttBounce"​,
  "once"​,
  "deepClone"​,
  "arbitraryFree"​,
  "arbitraryWrap"​,
  "creatArray"​,
  "removeArrayItem"​,
  "isPrimitive"​,
  "toggleClass"​,
  "clickToAction"​,
  "fileExport"​,
  "boundRectReset"​,
  "getHashPath"​,
  "getCurrentAddress"​,
  "isFileProtocol"​,
  "inject_style"​,
  "inject_script"​,
  "addScrollListener"​,
  "removeScrollListener"​,
  "toggle_fullscreen"​,
  "onceClassAnimation"​,
  "multiClassAnimation"​,
  "documentReady"​,
  "traceMultiTopMatch"​,
  "traceTopMatch"​,
  "getEventDelegate"​,
  "copyInterceptor"​,
  "copyTextToClipboard"​,
  "copyToClipboard"​,
  "copyToClipboard_compatible"​,
  "CONSTS"​,
  "lyscrollTo"​,
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

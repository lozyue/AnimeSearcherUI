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
就像修改传统多页应用一样指定页面进行匹配。
并在恰当的时机清除副作用。

```ts
// $theme 函数原型
function $theme(invoke: Calling, revoke: CallBack, options: Options = {}){
  ...
};
// Type declares in ts.
type CallBack = (a: Utilitys, b: Utils, enhance: Enhance)=>unknown;
// `revoke` is refers to the prototype of revoke Function.
type Calling = (a: Utilitys, b: Utils, enhance: Enhance & { revoke:(typeof revoke) })=>unknown; 
interface Options {
  path?: string | string[] | RegExp | RegExp[], // default '', means match all.
  excludePath?: string | string[] | RegExp | RegExp[], // default [], means match none.
  onInvokeError?: CallBack,
  onRevokeError?: CallBack,
};
type Enhance = {
  getVueComponent: ()=>{ Vue },
}


```

目前 `$theme` 函数的第二个、第三个参数都可缺省。

对于 `$theme` 回调函数的两个参数内容，详见：
- 第一个参数: [主题风格API功能库 Utilitys](#Utilitys)
- 第二个参数: [静态函数共享 Utils](#Utils)



## Utilitys

方法列表：(todo...)
```js
[
  "addToInterface",
  "resolvePath",
  "injectStyle",
  "unregisterShortcut",
  "registerShortcut",
  "alterShortcut",
  "resetShortcut",
  "setBackgroundClass",
  "addAdorement",
  "removeAdorement",
  "addNotifycation"
]
```

## Utils

```js
[
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
  "is_Number"​,
  "toTrueArray"​,
  "is_Defined"​,
  "is_Array"​,
  "is_String"​,
  "is_Function"​,
  "is_PlainObject"​,
  "is_RegExp"​,
  "is_Promise"​,
  "isPrimitive"​,
  "is_Empty"​,
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
  "lyscrollTo"​,
  "CONSTS"​,
  "addToInterface"​,
  "removeInInterface"​,
  "addToDeposit"​,
  "removeInDeposit"
]
```

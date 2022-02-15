---
sidebar: auto
sidebarDepth: 2
---

# Theme-Style Development

主题风格开发文档

## 介绍

Theme-Style(主题风格) 是主题系统很重要的另一部分。

Theme-Style 允许你使用JavaScript 和 CSS来对主题进行更改

并使用主题系统提供的API 高效的进行各种全局或局部的设定，达到高度定制的效果

这里将使用一些小示例，逐步带你探索主题风格系统的特性。


## 为什么需要主题风格

主题配色仅仅是对全局色彩进行调配，
而不能修改已有的色彩模式。

尽管其提供了数重的色彩方案，但在AnimeUI的设计上，为了提高开发效率并更好解构逻辑布局与装饰，
默认色彩模式都是风格配色均统一的单色模式，也即几乎没有使用色彩变量。

而如果使用主题风格对全局色彩模式进行修改，
就可以很容易的把主题配色所提供的各种色彩变量用在其中，达到高度的定制效果。

关于如何定制色彩模式以及定制色彩模式的复杂度问题，你不必过于担心
AnimeUI在开发时构思了一套微组件化设计，仅需编写很简单的几个 css 代码段，
便可对全局不同构成的同类微组件的进行同时修改覆盖。

你可以先从这里开始：
[色彩模式修改](####)


## Setup

让我们先从创建一个主题风格开始吧。

### 创建主题风格

一个主题风格就是一个位于 `/themes/styles/` 下的一个文件夹资源。
主题风格的入口是 `entry.json` 文件，该JSON文件的通常结构如下：

主题风格默认 JSON 模板: (实例中JSON不允许带注释，可以用AnimeUI的主题开发页面(/development/styles)去除)
```json
{
  "name": "", // 主题唯一标识名称 不宜过长 请尽可能保持与主题文件夹名称相同
  "alias": "", // 用于展示的主题名
  "description": "", // 简介，可选
  "author": {
    "nick": "", // 作者昵称，可选
    "avatar": "", // 头像链接，可选
    "link": "", // 可以留个主页链接，可选
  },
  "home": "", // 主题风格介绍页，可选
  "thumbs": "" , // 缩略图链接，可选 可以是路径字符串或者路径字符串数组，按顺序靠前的缩略图为主
  // 指定应用主题风格时配合食用的主题配色（如果存在）
  "blending": { 
    "onLight": "",
    "onDark": ""
  },
  "styles": [], // 主题css样式链接 可以是 路径字符串或者 路径字符串数组
  "scripts": [], // 主题script辅助，可选，可以是 路径字符串或者 路径字符串数组。
  "async_script": false // 可选，多个主题js文件时，同步加载（按顺序加载） 还是异步加载（取决于网络或储存）
}
```

> 说明：Blending 字段也可以不分亮暗总是指定一个配色：
```json
{
  "blending": "",
}
```


要创建一个主题风格，你应该先为你的主题风格起一个名称，
最好是用字母组成。我们将其标记为\[name]。

接下来:
1. 在主题风格目录 `\themes\styles` 下创建一个名为 \[name] 的目录
2. 新建一个入口文件 `entry.json`
3. 将上述JSON模板复制进去，将你起的风格名\[name]填入进这个JSON文件的 `name` 属性中
4. 最后打开主题配置文件 `\themes\config.json` 并在其中的 `styles/themes` 字段，中添加你的配色名
到了这一步以后，恭喜你，刷新就可以看到你的主题风格已经成功被识别了！ 

剩下要做的，就是完成该JSON文件的其他配置并编写样式或者脚本使用主题风格的API功能等了，接下来将会通过示例继续介绍这一部分。

接下来将给你介绍主题风格系统的组成以及使用了。


### 开发环境

由于暂时无力开发专用于主题风格编写的环境，故主题风格的开发调试直接在应用程序上进行。
开发效果的更新只能手动重载（目前来说...其实就是刷新）

在进行主题风格Script的编写前，可以将 AnimeUI 的全局配置文件中把 `AuiTheme.ThemeStyle.StrictScriptLoad` 选项改为`false`.
以便于开发时定位相应文件。

::: tip
全局配置文件为 config.*.js, 在`/js/`目录下。(\*代替hash值)

如果关闭了`AuiTheme.ThemeStyle.StrictScriptLoad`，请不要过快的切换主题风格，
有微小的可能导致一些诡异的现象。
:::


### 使用主题风格功能库

主题风格最强大的地方就是主题风格提供了的可适时嵌入的Javascript，
并专门提供了一系列强大或实用的API、函数等便于有任何开发基础的使用者进行定制。

要使用这一功能，仅需在创建的主题风格目录下创建有效的Javascript文件，
然后将其相对路径添加到主题配置文件的 `scripts` 属性中，应用中切换到该主题风格时便会加载这个script文件。

而最关键的就是如何编写这个Javascript文件了，其核心就在于AnimeUI提前向全局暴露的 `$theme` 函数。
要使用主题风格提供的强大功能均可以从这个函数出发。

`$theme`函数接收三个参数，第一个参数传递一个函数来说明要执行的功能，第二个参数也传递一个函数用于消除执行功能的副作用。
第三个参数为一个JS对象，用于前面的功能进行限定。如指定在哪些页面路径生效，排除哪些页面等。

详见： [API参考: $theme](api-config.html#theme)

这样讲起来可能非常令人困惑，让我们先看一个常见场景的示例：自定义快捷键

> 以下实例如果你想快速看到效果，可以直接将关键Script代码完整复制粘贴进入控制台执行，到相应页面查看效果。

#### 自定义快捷键

假设我们要将切换搜索框的快捷键由默认的 ctrl+s 切换成 ctrl+shift+s.

通过查看快捷键列表我们查到我们要更改的快捷键项的 标识 为: `goSearch`;

我们仅需很简单的调用**alterShortcut**方法即可:
```js
// shortcut.js
$theme(function(utility, utils){
  // Add effection. Alter the shortcut
  utility.alterShortcut('goSearch', 's', ['ctrl', 'shift']);
}, function(utility, utils){
  // Clear Effection. Restore its original shortcut.
  utility.resetShortcut('goSearch');
}, {
  path: ['/aui-player', '/anime/', '/tvlive'],
});
```

不要忘记在主题配置文件`entry.json`中引入新建的Javasript文件：
```json
// entry.json
{
  "scripts": ["/shortcut.js"],
}
```

记住 `$theme` 的第一个参数为作用执行的地方，第二个参数为消除副作用的回调。

设定当前页面位于Anime分区的路径 `/anime` 下才进行快捷键更改，因为目前这个切换搜索框的快捷键只有Anime分区支持。
事实上只有当前会话访问过Anime分区才会在快捷键列表中看到这个快捷键。

所以这里使用第三个参数传递`path`属性限定仅在`Anime分区`(路径为`/anime`)生效。

::: tip
限于篇幅原因，接下来的实例无特殊说明将省略对主题配置文件的修改（已经对`$theme`函数的说明），只展示核心源码示例。

更详细的关于**$theme**函数的说明: [API参考: $theme](api-config.html#theme)
:::

#### 定制背景

也许你可能认为仅通过主题风格嵌入 CSS Style 进行修改就可以达到设置背景的目的，
这的确是一种可行的办法，但这需要使用一些CSS tricks提高了复杂度并且在碰到其他带有背景的页面时可能会发生冲突。

为此在AnimeUI的背景实现中，已经提供了一个表现良好的背景layer层及相关设定API来设定背景：

假如你仅仅需要将背景替换成主题风格根目录下的图片 '/background.jpg',

那么可以先在你的主题风格根目录下新建一个风格样式表: "background.css" 
在其中写入样式: (假设你的主题风格名称为 'mystyle')
```css
/* background.css */
.mystyle .my-background{
  background-image: url("/themes/styles/mystyle/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
```

其中， 包含当前主题风格名称的URL的前缀 `"/themes/styles/mystyle"` 是必加部分，
尽管这样确实有失优雅，但也是AnimeUI目前[妥协考虑的无奈之举](/theme-dev/style/features)。

并在主题配置文件`entry.json`中引入它:
```json
// entry.json
{
  "styles": ["/background.css"],
}
```

接下来为了调用AnimeUI提供的API，我们新建一个 'background.js' (或者使用的主题js文件中)

我们在里面添加内容:

```js
// background.js
(function(){
  var handleObj = {
    class: 'my-background',
    style: {}, // An css style key-value Object.
  };
  // Primary entry function exposed on Window Object.
  // Three params.
  $theme(function(utility, utils){ // invoke function
    // Add effection. Alter the shortcut
    handleObj = utility.setBackground(handleObj); // Receive the return value to update handle.
  }, function(utility, utils){ // Revoke function
    // Clear Effection. Restore its original shortcut.
    utility.setBackground(handleObj, true);
  }, {
    // Do not override the background of 404 Page
    excludePath: ["/404"]
  });
})
```

然后同样在主题风格配置文件`entry.json`中引入它：
```json
// entry.json
{
  "scripts": ["/background.js"],
}
```

将上述改动保存，在AnimeUI中切换到当前主题风格，就可以看到我们设定的背景啦！

这里我们使用了`$theme`函数的第一个参数（回调函数）来对产生作用，
并在第二个参数（回调函数）来消除之前产生的副作用。

第三个参数（选项）则通过路径匹配限定上述作用和消除作用的页面，
这里使用`excludePath`属性来指定排除 "/404" 页面。


#### 添加主题风格选项

仅需要很简单的配置，就可以通过**addThemeOptions**来添加一个集设置存储与初始及更改应用于一体的主题风格用户选项。

添加好的选项将会出现在 `/preference` 页面的主题选项中。

我们接着上面修改背景的示例，使用主题选项为其添加一个自定义背景链接的选项。

```js
// handleObj 定义在前文，请放置到同一作用域
$theme(function(utility, utils){
  const customOption = {
    name: "back_url", // Recommend to be pure English Character and ASCII signs.
    // The view of the input controller.
    // Optional: "switchBox"|"textfieldBox"|"numbersBox" 
    //   |"textareaBox"|"selectsBox" (in developing); 
    viewType: "textfieldBox", 
    // Set the initial value. support the value-return function.
    rawValue: ()=>{
      return "https://tva1.sinaimg.cn/large/005BYqpgly1frn9445odej31hc0u0kjl.jpg";
    },
    // rawValue: "https://tva1.sinaimg.cn/large/005BYqpgly1frn9445odej31hc0u0kjl.jpg" // this also valid
    /**
      * The onChange options will be automaticly called when the settings change. 
      * @param {*} nVal The new value of changes.
      * @param {*} oVal The old value before changes.
      */
    onChange: (nVal, oVal)=>{
      handleObj.style["background-image"] = `url(${nVal})`;
      utility.setBackground(handleObj, true); // remove at first
      handleObj = utility.setBackground(handleObj); // re-apply
    },
    // Make the onChange method apply when inited
    onInitial: true,
    viewData: {
      title: "自定义背景图像链接: ",
      hint: "填写API链接或者固定图像链接",
    },
  };
  utility.addThemeOptions(customOption);
})
```

以上的配置将会添加一个修改后实时更新背景的主题选项。
主题启用时，你可以在`/preferences`页面看到这个被添加的选项。

其实时更新的关键在于配置中的`onChange`回调属性会在选项发生改动后自动调用。

关于主题选项，你还可以在示例主题Fantasy中找到一些其它的。

#### 添加首屏消息

很简单的调用addNotifycation方法，就可以在导航页的消息轮播组件中看到你添加的消息了！

```js
$theme(function(utility){
  utility.addNotifycation("欢迎使用mystyle主题风格!");
});
```
该方法产生的影响不必消除。

#### 装饰类方法

这里介绍几个除了装饰外没什么作用的方法……

**addAdorement**
添加视差装饰组件，可以跟随滚动，可以是图片、SVG等

在移除时需要调用**removeAdorement**传递添加时返回的handle

```js
let handle = null;
$theme(function(utility, utils){
  handle = utility.addAdorement({
    // Use `resolvePath` to support relative path.
    image: utility.resolvePath("/images/cloud.png" ),
    width: 72, height: 48,
  });
}, function(utility){
  // 需消除影响
  utility.removeAdorement(handle);
}); // 省略偏好选项
```

注意到导航页的随机一言了吗？为了不过多增大体积，AnimeUI仅内置了很少的一言库。也没有使用网络上的API库。
而是采取允许后续添加的方式。

仅需很简单配置并调用**addQuotations**即可导入你的一言:
```js
$theme(function(utility){
  const Quotations = [{
      content: "天子呼来不上船，自称臣是酒中仙",
      footer: "杜甫",
    },{
      content: "大行不顾细谨，大礼不辞小让",
  }];

  const action = ()=>{
    utility.addQuotations(Quotations);
  }
  // 特定事件载入，仅初始执行一次
  utility._once("quotationInited", action, false);
}, function(utility){
  // 因为只会执行一次无需消除影响
});
```
关于分类的显示这里就不赘述了，去查看[示例主题风格](#示例主题风格Fantasy)的具体写法吧！

---

#### 消息类函数

AnimeUI为主题系统共享了两种全局消息组件：对话框和消息条。
分别由 `lzydialog​`, `lzynotice​` 控制产生，调用后将在界面上分别显示一个对话框和消息条。

对话框和消息条的区别在于：通常消息条会自动消失、对话框视觉占用的强制性更高、对话框具有行为强迫性能强制使用者做出选择。

目前的实现中，对话框未设定的情况下点击外部自动消失，消息条收到点击后立即消失。

调用示例：
```js
$theme((utility, utils, { revoke })=>{
  // 显示一个消息条，部分不需要的选项可以省略
  utility.lzynotice({
    onHidden: ()=>{console.log("notice is Hidden")},
    position: 'center',
    content: 'Lzynotice is successfully installed.',
    semantic: utils.randomItem(['', 'warning', 'error', 'success', 'info']),
  });
  // 显示一个对话框，部分不需要的选项可以省略
  utility.lzydialog({
    onHidden: ()=>{console.log("Dialog is hidden")},
    keepOuterClick: true,
    position: 'center',
    // View
    title: "Test",
    content: 'This my dialog string content',
    semantic: utils.randomItem(['', 'warning', 'error', 'success', 'info']),
    // actions
    actions: [{
      text: "确定",
      action: ()=>{
        console.log("Confirm button is clicked!")
      },
      // semantic: ''
    },{
      text: "取消",
      action: ()=>{
        console.log("Cancel button is clicked!")
      }
    }],
  });
});
```

## 更多

了解了主题风格及其功能库的基本使用后，是不是还没过瘾，想自由发挥更多内容？

查看 [API参考](api-config) 自行创造更多功能吧！

Links:

- [API参考](api-config)
- [主题风格特性](features)
- [样式编写参考](style-ref)
- Helper 使用sass高效编写样式](helper)


## 示例主题风格Fantasy

`Fantasy`是伴随AnimeUI开发过程衍生的主题风格，也因此可能拥有最新的特性和稳定的表现。

由于文档更新速度的问题，在开发主题风格时一些用法和实践可以尽管参考主题风格`Fantasy`

如果你已经拷贝了WebUI，那么Fantasy主题位于WebUI的`themes/styles/fantasy`目录下.

对应于Git仓库中的位置为： [示例主题Fantasy](https://github.com/lozyue/AnimeSearcherUI/tree/main/AnimeUI/themes/styles/fantasy)


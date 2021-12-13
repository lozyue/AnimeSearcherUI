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
[色彩模式修改]()


## Setup

让我们先从创建一个主题风格开始吧。

### 创建主题风格

一个主题风格就是一个位于 `/themes/styles/` 下的一个文件夹资源。
主题风格的入口是 `entry.json` 文件，该JSON文件的通常结构如下：

主题风格默认 JSON 模板:
```json
{
  "name": "",
  "alias": "",
  "description": "",
  "author": {
    "nick": "",
    "avatar": "",
    "link": ""
  },
  "home": "",
  "thumbs": "" ,
  "blending": {
    "onLight": "",
    "onDark": ""
  },
  "styles": [],
  "scripts": [],
  "async_script": false
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

*主题风格功能库的API目前均位于风格入口函数 `$theme` 执行回调的参数中，对于接下来的应用，将省去这一说明。*

接下来将使用一些实例来展示如何进行一些常用的定制。

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
    style: '',
  };
  $theme(function(utility, utils){ // invoke function
    // Add effection. Alter the shortcut
    utility.setBackgroundClass(handleObj);
  }, function(utility, utils){ // Revoke function
    // Clear Effection. Restore its original shortcut.
    utility.setBackgroundClass(handleObj, false);
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


#### 自定义快捷键

假设我们要将切换搜索框的快捷键由默认的 ctrl+s 切换成 ctrl+shift+s.

通过查看快捷键列表我们查到我们要更改的快捷键项的 标识 为: `goSearch`;

我们在里面添加内容:
```js
// shortcut.js
$theme(function(utilitys, utils){
  // Add effection. Alter the shortcut
  utilitys.alterShortcut('goSearch', 's', ['ctrl', 'shift']);
}, function(utilitys, utils){
  // Clear Effection. Restore its original shortcut.
  utilitys.resetShortcut('goSearch');
}, {
  path: '/anime',
});
```

不要忘记在主题配置文件`entry.json`中引入新建的Javasript文件：
```json
// entry.json
{
  "scripts": ["/shortcut.js"],
}
```

设定当前页面位于Anime分区的路径 `/anime` 下才进行快捷键更改，因为目前这个切换搜索框的快捷键只有Anime分区支持。
事实上只有当前会话访问过Anime分区才会在快捷键列表中看到这个快捷键。

这里我们使用了`$theme`函数的第一个参数（回调函数）来对产生作用，
并在第二个参数（回调函数）来消除之前产生的副作用。

第三个参数（选项）则通过路径匹配限定上述作用和消除作用的页面，仅在Anime分区生效。

::: tip
限于篇幅原因，接下来的实例无特殊说明将省略对主题配置文件的修改，只展示核心源码示例。
:::


#### 添加主题风格选项

仅需要很简单的配置，就可以通过`addThemeOptions`来添加一个主题风格选项。

添加好的选项将会出现在 `/preference` 页面的主题选项中。

```js
$theme(function(utility, utils){
  const customOption = {
    name: "back_url", // Recommend to be combined with English Character and ASCII signs.
    // The view of the input controller.
    // Optional: "switchBox"|"textfieldBox" 
    //   |"textareaBox"|"selectsBox" (Some are in developing); 
    viewType: "textfieldBox", 
    // Set the initial value by call the value-return function.
    getValue: ()=>{
      return "https://tva1.sinaimg.cn/large/005BYqpgly1frn9445odej31hc0u0kjl.jpg";
    },
    /**
      * The onChange options will be automaticly called when the settings change. 
      * @param {*} nVal The new value of changes.
      * @param {*} oVal The old value before changes.
      */
    onChange: (nVal, oVal)=>{
      rmHandle.style["background-image"] = `url(${nVal})`;
      refresh the background; May cause backgroun confrontation.
      utility.setBackground(rmHandle, true); // remove at first
      utility.setBackground(rmHandle); // re-apply
    },
    // Make the onChange method apply on inited
    onInitial: true,
    viewData: {
      title: "自定义背景图像链接: ",
      hint: "填写API链接或者固定图像链接(立即见效版本，可能引起冲突)",
    },
  };
  utility.addThemeOptions(customOption);
})
```

以上的配置将会添加一个修改后实时更新背景的主题选项。
其关键在于配置中的`onChange`回调属性会在选项发生改动后自动调用。

但根据选项实时刷新背景会引起一个可能的冲突，因此示例主题Fantasy中并没有这么做。

关于主题选项，你还可以在示例主题Fantasy中找到一些其它的。

#### 添加首屏消息

很简单的调用addNotifycation方法，就可以在导航页的消息通知组件中看到你添加的消息了！

```js
$theme(function(utility){
  utility.addNotifycation("欢迎使用mystyle主题风格!");
})
```
由于开发紧迫以及影响不那么大的原因，该方法产生的影响无法也不必消除。

#### 装饰类方法

这里介绍几个好看但没什么用的方法……

添加一个视差装饰组件，可以跟随滚动（目前仅PC端），可以是图片、SVG等

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
}, {
  // 排除偏好选项页
  excludePath: '/preferences',
});
```

注意到导航页的随机一言了吗？为了不过多增大体积，AnimeUI仅内置了很少的一言库。也没有使用网络上的API库。
而是采取允许后续添加的方式。

仅需很简单配置即可导入你的一言:
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
}, {
  // 排除偏好选项页
  excludePath: '/preferences',
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

#### 示例主题风格Fantasy

`Fantasy`是伴随AnimeUI开发过程衍生的主题风格，也因此可能拥有最新的特性和稳定的表现。

还是由于文档更新速度的问题，在开发主题风格时一些用法和实践可以尽管参考主题风格`Fantasy`

如果你已经拷贝了WebUI，那么Fantasy主题位于WebUI的`themes/styles/fantasy`目录下

Git仓库中的地址： [示例主题Fantasy](https://github.com/lozyue/AnimeSearcherUI/tree/main/AnimeUI/themes/styles/fantasy)


## [API参考](api-config)

## [主题风格特性](features)

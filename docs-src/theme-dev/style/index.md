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

基于主题风格提供的可嵌入JavaScript，
可以利用提供的API和共享的方法进行可靠的设定。

*主题风格API功能库目前均位于风格入口函数 `$theme` 执行回调的第一个参数中，对于接下来的应用，将省去这一说明。*

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
$theme(function(utilitys, utils){
  // Add effection. Alter the shortcut
  utilitys.setBackgroundClass('my-background');
}, function(utilitys, utils){
  // Clear Effection. Restore its original shortcut.
  utilitys.setBackgroundClass('my-background', false);
});
```

然后同样在主题配置文件`entry.json`中引入它：
```json
// entry.json
{
  "scripts": ["/background.js"],
}
```


刷新一下，就可以看到我们设定的背景啦！


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

在主题配置文件`entry.json`中引入它：
```json
// entry.json
{
  "scripts": ["/shortcut.js"],
}
```

设定当前页面位于Anime分区的路径 `/anime` 下才进行快捷键更改，因为目前这个切换搜索框的快捷键只有Anime分区支持。
事实上只有当前会话访问过Anime分区才会在快捷键列表中看到这个快捷键。

这里我们使用了`$theme`函数的第一个参数（回调函数）来对特定页面进行干涉，
并在第二个参数（回调函数）来消除之前产生的副作用。

第三个参数（选项）指定了匹配页面的规则，仅在Anime分区生效。




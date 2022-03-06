---
sidebar: auto
sidebarDepth: 2
---

# Theme-Blending Development

主题配色用于进行全局色彩调配和提供一套色彩方案。  
遵循约定还可以通过色彩为UI提供一定的层级结构体现，语义化体现。

主题配色体系可以让你专注于进行全局的色彩调配，
并以最优的速度进行加载应用，并可与不同的主题风格进行搭配，创造独一无二的体验！


# 定制配色

仅需很简单的配置一个 JSON 文件即可打造属于你的配色！  
先来看一下如何创建一个主题配色

## 创建主题配色

一个主题配色的核心就是一个位于特定目录的 JSON 文件，JSON文件的通常配置结构如下：

主题配色默认 JSON 模板:
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
  "thumbs": "",
  "blending": { },
  "colors":{ },
  "dark": true
}
```

要创建一个主题配色，你应该先为你的主题配色起一个名称，
最好是用字母组成。我们将其标记为\[name]。

接下来:
1. 在主题配色目录 `\themes\blendings` 下创建一个名为 \[name] 的目录
2. 新建一个名称为\[name] 的JSON文件 \[name].json
3. 将上述JSON模板复制进去，将你起的配色名\[name]填入进这个JSON文件的 `name` 属性中
4. 最后打开主题配置文件 `\themes\config.json` 并在其中的 `blendings/themes` 字段中，添加你的配色名
到了这一步以后，恭喜你，刷新一下就可以看到你的主题配色已经成功被识别了！ 

剩下要做的，就是完成该JSON文件的其他配置了。

接下来将给你介绍配色系统的组成及规范以及如何填充这个JSON配置文件来定制自己的配色。


## 配色组成

AnimeUI的主题配色系统在全局上对配色做了划分

配色系统使用配色变量对全局色彩进行调控。

> 顺带提及：配色系统的原理就是利用配色变量生成相应的CSS变量和类。

在主题配色中包括 配色变量、颜色变量以及修饰变量 三部分。
不管是哪一部分，目前关于颜色的配置值只支持使用十六进制表示。

你可以使用浏览器自带的颜色值表达式转换将颜色值转换为HEX模式（按住shift点击色块）
或者使用主题配色调色板工具进行颜色选择或者颜色转换等。


### 配色变量

配色变量对应主题配色 JSON 文件中的 `blending` 属性部分：

```json
{
  "blending":{
    "background": "#add8e6",
    "surface": "#fff",
    
    "primary": "#eb73b9",
    "secondary": "#9bdef5",
    "tertiary": "#f0917e",
    "quaternary": "#dfb7d6",
    
    "success": "#12ee0f",
    "warning": "#129fad",
    "error": "#f05050",
    "info": "#58666e",
  }
}
```

这里主要包括三个部分：

#### 第一类别

由 `background`背景色 和 `surface`表面色 组成, 它们将占据画面的大多部分。

background 指示整体背景颜色， 而 surface 指示显示在背景上的背景，也就是内容背景色。

#### 第二类别

第二类别颜色又称 层次配色, 采用最多四种配色变量, 分为 
- primary(主配色)
- secondary(辅色)
- tertiary(次配色)
- quaternary(末配色)

在进行默认配色时，会按该层次结构进行默认应用配色，应用比率大体按照 *主>辅>次>末* 的优先级进行填色。
其能体现一定的应用层次结构关系。

#### 第三类别

一个是 状态色， 分为: `success`, `warning`, `error`, `info` 四种状态变量，用于颜色的语义化的提示。


#### 相对前景色

这三种类别的配色变量都可以对其添加 `on` 前缀指明相对其作为背景色时应用的前景色。

```json
{
  "blending":{
    "on-background": "#000",
    "on-surface": "#000",

    "on-primary": "#fff",
    "on-secondary": "#fff",
    "on-tertiary": "#f0917e",
    "on-quaternary": "#dfb7d6",
    
    "on-success": "#fff",
    "on-warning": "#fff",
    "on-error": "#fff",
    "on-info": "#fff"
  }
}
```

如果你没有对其指定，主题配色系统会自动给对应配色变量生成相应的前景色。


### 颜色变量

颜色变量的内容对应于Blending JSON 配置文件中的 "colors" 选项。

颜色变量在AnimeUI中被用于一些多色的场景，
因此颜色变量配置的推荐做法为在这个颜色域中挑选你喜欢的明度和饱和度即可。

颜色变量需要配置的有：

```json
{
  "colors":{
    "red": "#ff0808",
    "green": "#d5e751",
    "blue": "#9bdef5",
    "yellow" : "#fbe765",
    "pink": "#f294c6",
    "purple": "#dfb7d6",
    "orange": "#f0917e",
    "cream": "#fce2ce",
    "brown": "#a5362a",
    
    "grey": "#808080",
    "lightgrey": "#d3d3d3",
  },
}
```

## 修饰变量

修饰变量的内容也对应于Blending JSON 配置文件中的 "colors" 选项。

主要用于如透明度、边框等样式的修饰等。

```json
{
  "layer-opacity": 0.75, // for layer opacity
  "layer-darken": 0.75, // for lower down the brightness. // decide by light and darkmode.
  "layer-sm-radius": "3px", // border-radius
  "layer-md-radius": "5px", // for label
  "layer-lg-radius": "10px", // for card
  "disabled-opacity": 0.38,
  "activated-opacity": 0.16,
  "idle-opacity": 0.04,
  "hover-opacity": 0.12,
  "focus-opacity": 0.12,
  "border-color": "#000000",
  "border-opacity": 0.12,
}
```


### Dark 选项

配置文件中的"dark" 选项用于标明当前开发的主题配色是适用于暗光环境下的暗色主题配色。
还是明亮环境下的亮色主题配色。

但其作用并不仅仅与此，它也指定了主题的继承方式。

主题配色所有可配置的变量不少于20个，因此考虑到大多时候可能只是需要修改某些变量而不是全部配置（这可能需要花费很多时间）.
所以当指明了 dark 时，在所有需要配置的主题配色中，当前未配置的变量就会从 light/dark主题配色 中继承。

具体继承规则如下
```json
// 从 light 主题配色中继承
{
  "dark": false
}
// 从 dark 主题配色中继承
{
  "dark": true
}
```


## 配色规范

了解完配色组成后，相信你对如何定制配色变量有了一定的了解

为了不至于一种可能的情况，你的配色让应用看起来很糟糕，文字可读性非常差

为了保证文字的可读性，保证色调的舒适度，
配色需要一些模式设计上的规范，这也是 AnimeUI 在设计和应用配色系统的背后思想。

- 第一类别配色需要和第二类别形成对比，避免使用接近background/surface的颜色。

- 适用于暗色模式的 主题配色 背景`background`的明暗度`L` (以HSL色彩模式计量) 在不带透明度的情况下不应该大于20%，
表层色`surface`的明暗度仅应该比背景`background`的 高出部分。


## 默认主题配色

默认的主题配色为 `dark`, `light` 主题。

其作为所有主题配色的根级，为其余主题配色提供继承特性(全局子主题配色除外)

也因此其作为内置主题被内嵌在了AnimeUI中，你不会在主题文件夹中发现同默认主题一样名称的主题。

所以也很好理解， `dark`, `light` 对于主题配色命名来说是保留字段，
此外还有全局子主题配色名 `custom` 也是保留字段。

::: tip
默认全局子主题名称 `custom` 这个名称实际上上可以通过主题根配置进行修改, see: [全局子主题](/instruction/#全局子主题)
:::


# Links

看完了主题配色开发，想玩点更强大的？

see:
- [主题风格开发](../style/)

---
sidebar: auto
sidebarDepth: 2
---

# Helper with CSS Styles 

主题风格的样式开发尽管非常简单，并且开发主题的大多数时候，
在主题风格的样式表中所写的也只是对应用的部分修改。

但一旦样式表样式数量增长的足够多，很快一些CSS难以维护的弊端也会暴露出来。

主题风格的样式编写中要大量的重复主题名前缀，
一些特殊的属性仍然需要为不同浏览器添加不同前缀，
CSS的注释的书写也不是那么方便...

通常在集成开发环境下我们都会使用一系列的工具来辅助编写CSS，
但即便是编写主题风格的少许样式表，
我们也仍然推荐利用nodejs的能力来帮助我们提升开发效率。
~~可能大多数人认为小场景装一堆node-modules是一种浪费...~~

这里主要对使用Sass、Autoprefixer等CSS辅助工具作简单的介绍。

*(本篇主要面向还不熟悉工程化以及SCSS的业余开发者，大佬可以绕道了)*

## About

> Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. 

Sass 是这个世界上最成熟、稳定、强大且专业的CSS拓展语言。

Use Autoprefixer by PostCSS:
> PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. 
> It is recommended by Google and used in Twitter and Alibaba.

通过使用PostCSS，Autoprefixer能为 CSS 自动添加前缀来适配更多的浏览器环境。


## Environment Preparation

你需要先预装好 [NodeJS](https://nodejs.org/)

然后找好一个工作目录，在下面建立整个主题风格的开发目录。

如果已经建立了AnimeUI的主题风格开发目录：

不论你是否想要将你的主题提交PR到 AnimeSearcherUI 中与其他用户共享，
都推荐在已建立的目录外(开发目录同级)创建npm环境作为工作目录。

假设你的主题名称为 `helloworld`, 创建好的目录结构可能是这样的：

::: v-pre
<pre style="color:#fff;">
.
├── /  (Workspace)
│   ├── helloworld (主题风格开发目录)
│   │   ├── assets (资源目录)
│   │   ├── main.scss (主样式表)
|   |   ├── ...
│   │   └── entry.json (主题风格配置文件)
│   │ 
├── node_module (依赖模块)
└── package.json (环境配置文件)
</pre>
:::

### Init Workspace

选好了工作区我们就可以使用node所带包管理器npm来初始化工作区:
(在该目录下打开终端)

```shell
npm init -y
```

可以看到 npm 在工作目录下为我们生成了一个package.json,
接下来我们来安装所需依赖。

### Install Requirements

这里我们先安装所需的 sass 和 autoprefixer.

```shell
npm install -D sass
npm install -D postcss postcss-cli autoprefixer
```

等待至安装成功。

如果 npm 下载太慢可以试试替代包管理器 `yarn`或者`cnpm` 这里就不再展开。

### NPM Script

仍然假设你的主题名称为 `helloworld`, 待会儿需要将主题名需要配置到路径里面

打开 package.json 的`scripts`字段并配置为以下内容：

```json
{
  "scripts":{
    "gen:sass": "sass \"helloworld/\" --style=expanded --charset --no-source-map",
    "gen:prefix": "postcss \"helloworld/\" --use autoprefixer -d helloworld/",
    "build:style": "npm run gen:sass && npm run gen:prefix"
  }
}
```
这样在编写完成后就可以直接使用命令 `npm run build:style` 来生成CSS文件了。

## SCSS-Language

这里简单介绍一下scss最基础的语法特性：

### Nesting 嵌套

嵌套能很好的展现层级关系，同时节省一些代码量。
同时嵌套的每一级中也同时兼容各种选择器。

并且可以使用

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li { 
      display: inline-block;
      span a{
        text-decoration: none;
      } 
      &:hover{
        background: lightblue;
      }
    }
  }
  .shim {
    display: block;
    padding-bottom: 6px;
  }
}
```

### Variable 变量

Sass允许使用 `$` 来声明一个变量，并允许对其进行 加减乘除 等运算操作。

```scss
// @use "sass:math";
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

p {
  // Can also write here!
  $font-size: 14px;

  font: 100% $font-stack;
  color: $primary-color;
  padding-bottom: $font-size + 2px;
}
```

可以去官方文档 Sass-基础 查看更详细的介绍: [Links](#links)

::: tip 
这里的变量不是真正的变量，也和css变量完全不同，而更类似一种预编译阶段起作用的宏。
:::

> Some fragments are refer from document of Sass-language, see: [Links](#links)

### Annotation 注释

Sass允许单行注释 `//`，同时也保留原有css多行注释`/**/`，
但同样的，多行注释不允许嵌套。

如果你不想在Sass编译后的css里看到注释，请全部使用双斜杠注释: `//`。

而默认多行注释会被保留下来: `/**/`

因为Scss拓展的`//`这样的注释是在css里不是合法注释，
所以Sass-loader在将Scss转化为Css的时候会把//过滤掉。

而`/**/`这样的注释是css的合法注释，Sass-loader默认不会进行删除。

如果你一定需要删除这样的注释，
由于配置css-loader的minimize选项来启用压缩可以删除注释无法避免css被压缩，
建议自行手写一个简单的plugin来实现。


## Make Practices

### New File

假设我们要编写一个 main.css 的样式在我们的主题风格 helloworld 中，那么我们就新建一个 main.scss

其余需要新建的样式表也如此处理。

### Write the code

现在我们想要定制一个背景，再将卡片默认圆角效果调小，本来应该这么写：

```css
/* Set the custom background class */
.helloworld .my-background{
  background-image: url("/themes/styles/helloworld/bg.png");
  background-size: cover;
}
/* Minimize the radius of .card */
.helloworld .card{
  border-radius: var(--v-layer-md-radius);
}
```

按照主题风格样式编写规范，我们都应该为所有主题中的样式类 添加 主题类做父类以自适应优先级。

而这里可以看到`.helloworld`这个主题类重复了两次，并且之后要写多少个类就要重复多少次。
这样的样式编写体验很差。

我们利用 scss 嵌套来解决这一问题：

```scss
// main.scss
.helloworld {
  // Set the custom background class
  .my-background{
  background-image: url("/themes/styles/helloworld/bg.png");
  background-size: cover;
  // Minimize the radius of .card
  .card{
  border-radius: var(--v-layer-md-radius);
}
```
代码变得更简洁，结构变得更清晰了！

接下来就是愉快的样式编写了！ 


> 更多用法还请参考[官方文档](#links)和其他资料。


### Build&Check

`.scss` 文件并不能被浏览器识别，需要被编译成css文件后才可以被识别，所以使用scss非但能减小CSS生产代码体积（开压缩效果会好些）。

那我们就来把已编写好了的 scss 文件那就利用 Sass 编译一下吧。
之前已经配置好了 npm script, 只要目录正确，编译仅需简单一句命令:

在当前工作目录下打开终端: (或在终端中切换到当前工作目录下)

```shell
npm run build:style
```

相应名称的 css 文件就会生成在源文件旁边啦！

编译好后将`main.css`添加进入 `entry.json` 的样式列表中即可。

之后的每次修改`.scss`文件都需要重新执行上述命令进行编译才能刷新查看效果。

你也可以添加`--watch`选项开启 Sass 监控在保存文件时自动重新编译，
在 package.json 中的 scripts 字段添加如下命令：

```json
{
  "scripts": {
    "dev:style": "sass --watch \"/\" --style=expanded --charset --no-source-map && postcss *.css --use autoprefixer -d build/"
  }
}
```



## Links

Here is the relative links:

- [Sass 基础](https://sass-lang.com/guide)
- [Sass 文档](https://sass-lang.com/documentation/)



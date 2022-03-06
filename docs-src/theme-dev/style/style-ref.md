---
sidebar: auto
sidebarDepth: 2
---

# Style-Ref 样式参考

这里将介绍在主题风格开发中如何编写更优良高兼容的样式。

## 色彩模式修改

尽管其提供了数重的色彩方案，但在AnimeUI的设计上，为了提高开发效率并更好解构逻辑布局与装饰，
默认色彩模式都是风格配色均统一的单色模式，也即几乎没有使用色彩变量。

而如果使用主题风格对全局色彩模式进行修改，
就可以很容易的把主题配色所提供的各种色彩变量用在其中，达到高度的定制效果。

关于如何定制色彩模式以及定制色彩模式的复杂度问题，你不必过于担心
AnimeUI在开发时构思了一套微组件化设计，仅需编写很简单的几个 css 代码段，
便可对全局不同构成的同类微组件的进行同时修改覆盖。

色彩模式的基本构造是一些以主题配色为基础的样式类集合。
其与主题配色中配色和色彩变量是一一对应的。

下面列举一些常用来配置的属性：
```scss
.custom{
  // color
  color: rgb(var(--v-theme-on-background));
  color: rgb(var(--v-theme-on-surface));
  // border related
  border-radius: var(--v-layer-md-radius); // var(--v-layer-sm-radius) var(--v-layer-lg-radius)
  
  // color background
  background-color: rgba(var(--v-theme-primary), var(--v-layer-opacity));
  background-color: rgba(var(--v-theme-primary), var(--v-layer-opacity)); // apply primary / secondary / tertiary / quaternary

  // more 
  // todo...
}
```

比如在全局类 .card 中：
```css
.card{
  display: block;
  max-width: 100%;
  border-radius: 10px;
  border-width: thin;
  /* Color Pattern */
  color: rgb(var(--v-theme-on-background));
  border-radius: var(--v-layer-lg-radius);

  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
```
其中的颜色和边框就运用了配色变量来构建色彩模式。

通过构建配色模式，在不同的主题配色下展示不同的色彩搭配就变得非常简单！


## 全局CSS类架构

(待完善……)

下面给出CSS骨架类分布表，用以开发主题设定样式参考。

表中推荐的CSS类在未来的更新中将较少发生改变。

```markdown
- #app
  - #app-root
    - #app-main
      - #main-container
        - #[rootPageName]
         - .main ?  <!--页面内容入口-->
           - [inner...]
      - .aui-notice <!--消息条提示条总容器-->
        - .lynotice <!--对应每一个消息弹框-->
      - .aui-dialog <!--消息条弹框总容器-->
        - .lydialog <!--对应每一个消息弹框-->
```

如上图所示，AnimeUI对每个页面都做了特定的类结构规划。

从根级 #app-main 开始，对应浏览器URL中的路由，
每个页面都将有其特定的节点ID和类名结构（可能类名结构还比较混乱）。

比如: 对应页面路由：`/preferences` 有 id 为 `preferences` 的div节点作为页面根节点。
同时页面的主要内容将被放在类名为`main`的节点中(.main 可能与#preference 重合在页面根节点中)。
页面中的内容结构往往取决于页面，需要具体页面具体分析。


## 特殊类名

`.dark-token`用于指示当前是否为暗色模式，位于主题根类名下面。

例：
```css
/* Fantasy主题风格中暗色模式下使用暗色背景层 */
.fantasy .dark-token .main{
  background-color: rgba(0, 0, 0, .3);
}
```
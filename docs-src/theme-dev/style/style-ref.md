---
sidebar: auto
sidebarDepth: 2
---

# Style-Ref 样式参考

这里将介绍在主题风格开发中如何编写更优良高兼容的样式。


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
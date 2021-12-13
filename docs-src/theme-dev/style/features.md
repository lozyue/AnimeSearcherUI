---
sidebar: auto
sidebarDepth: 2
---

# Features

## 资源引用路径

AnimeUI对除Style加载外的主题风格资源的引用做了简化，无需从AnimeUI根目录开始包括一个由当前主题名称构成的路径前缀。

如你所见，不管是入口文件`entry.json`配置中加载的样式表、JS文件，
还是 `utility` API提供的包含加载资源的的各种路径参数
默认都将根目录设置成了当前主题名称方便以简洁的相对路径方式引入。

但在用户定义的Style文件中，考虑到性能开销，就没有继续对资源引用保持这种优雅了。

由于浏览器处于安全原因的限制，CSS不支持路径拼接。也没有使用JavaScript对样式表文件进行预取并做匹配修改。
第一版设计方案中的主题风格Style限定了CSS样式文件，为了不牺牲样式修改的直观性，AnimeUI的样式资源引入方式最终还是妥协于常规方式。

所以**样式表中的资源需要以AnimeUI根目录开始引用**，但仍然推荐以相对路径加载以适应子目录。

也就是说，（举个栗子）你有个位于主题风格"mytheme"文件夹下的"awesome.jpg"
::: v-pre
<pre style="color:#fff;">
.
├── /  (WebUI Root)
│   ├── themes (主题总目录)
│   │   ├── styles (主题风格目录)
|   |   |   ├── mytheme
|   |   |   |   ├── awesome.jpg
|   |   |   └── main.css
│   │   └── ...
│   └── ... 
</pre>
:::
在你的main.css中有一个background类，导入awesome.jpg就需要如下引用:
```css
.background{
  background-image:url(themes/styles/mytheme/awesome.jpg);
}
```

当然也可以使用Sass定义变量的方式做做编译工作弥补优雅度
（你甚至可以使用typescript配合提供的简陋ts模块声明文件`*.d.ts`来获得`utility`和`utils`的属性方法提示）
```scss
$ThemeRoot: themes/styles/mytheme;
.background{
  background-image:url(#{$ThemeRoot}/awesome.jpg);
}
```

## Error Tips (排错提示)

这里记录在使用主题风格API系统的过程中可能碰的不同的报错记录及原因：

> TypeError: source[methodName] is undefined

可能的原因：
- 主题导出API `utility` 下的方法不存在而调用失败


> Uncaught SyntaxError: redeclaration of [const/let] xxx

可能的原因：
- 在主题风格script编写中声明了全局 let 变量或者常量，这将在主题被重复切换到之时产生错误

解决方案：
- 使用 `var` 代替`const/let`进行声明变量
- 最好的办法是避免声明全局变量造成污染，可以使用一个函数将作用域封闭：

```js
// 1. 使用匿名立即执行函数(推荐)
(function(){
  // Draw codes here!
})();

// 2. 也可以套用 $theme 方法
$theme(function(){
  // Draw codes here!
});
```

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

> <font color="red">TypeError: source[methodName] is undefined</font>

可能的原因：
- 主题导出API `utility` 下的方法不存在而调用失败

---

> <font color="red">Uncaught SyntaxError: redeclaration of [const/let] xxx</font>

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

---


## 开发模式规范

尽管对于主题风格Script编写增强的开发模式事实上由开发者个人决定，
但其实也可见在API设计上对开发规范的要求。

首先是入口函数`$theme`似乎比较复杂的三参数模式，选项被放在了第三个参数上，
这就导致有时候无需处理Script的注入副作用时也必须写一个空函数放到第二个回调上，略显麻烦。
而且在第一个参数执行回调中的第三个参数context中其实已经提供了好用的hook函数可以完全替代用于消除副作用的第二个回调参数参数，
传递自不同的参数还因为作用域的问题可能导致要提升变量而增加一些工作量。
这样来看第二个参数完全没有存在的价值。你可能完全不明白为什么要给`$theme`整出三个参数来。

> 如上，因为`$theme`函数较复杂，这里还是先列出`$theme`函数及参数的类TS结构
> 并用结构里定义的名来代替上面出现的可能的易使人困惑的"第..参数"的表达形式。

```ts
// 不严谨的TS类型声明
type $theme(
  invoke: (utility, utils, context={ revoke, ... } )=>any,
  revoke: (utility, utils, context={ ... }) => any,
  options: Object
): any
```
> 事实上，文档中已经很多地方混用了这些称呼，第一版的文档较为混乱，有可能在以后全部统一，敬请谅解。
> 关于`$theme`函数的详细定义请参考[API参考-$theme](api-config#theme)

重复自上一段正文的表述：

首先是入口函数`$theme`似乎比较复杂的三参数模式，选项被放在了 options 上，
这就导致有时候无需处理Script的注入副作用时也必须写一个空函数作为revoke，略显麻烦。
而且在 invoke 中的第三个参数 context 中其实已经提供了好用的 hook函数`context.revoke` 来替代revoke，
传递自不同的参数还因为作用域的问题可能导致要提升变量而增加一些工作量。
这样来看`revoke`参数完全没有存在的价值。你可能完全不明白为什么要给`$theme`整出三个参数来。

> 这样结构是不是清楚多了 <(*￣▽￣*)/

但其实，这是充分考虑后的故意而为之，`$theme`函数的 revoke 参数能提醒甚至强迫你产生了影响
就要付出消除副作用的责任的好习惯。在 utility 提供的各种功能的API中也都有相应的消除影响的API。（如果没有则一般是自动消除或无需消除）

同时由于`$theme`函数的复杂度，也能尽可能让开发者减少对`$theme`的调用而转向抽象出更多的逻辑从而提高性能。

此外，这种方式也是属于最高效的方式（~~其实也只是省下了可忽略的几次函数调用开销~~）

对于作用域问题，如果你有需要大量复用的封装功能或者逻辑，推荐的做法在主题被应用时的 revoke 中直接挂在到
utility 或者 utils 对象上，一般推荐高度封装的API建议挂载到 utility, 较低度的静态模块挂载至 utils.

这样的好处是这些共享的功能逻辑不仅能在 invoke 和 revoke 之间传递，甚至能在不同JS文件中的所有`$theme`方法调用间传递。
但也请在主题被卸载时移除这些逻辑（请勿改动原有的方法）。

推荐在主入口js文件中执行该功能或者专门新建一个`utils.js`的文件来做共享模块封装。

然后在配置文件中将这个Script文件路径放入主题风格载入配置`scripts`数组的首位，在默认配置的情况下，
AnimeUI以及对Script加载执行做了顺序处理，请尽管根据依赖顺序填写路径数组。

::: tip
`async_script`选项现已失去其原先作用，不再用于控制较缓慢的同步加载顺序执行Script (设定为false) 
和 并发加载和异步执行 (设定为true) 了。

这得益于默认载入配置`AuiTheme.ThemeStyle.StrictScriptLoad`已经得到完整支持，配置位于
全局载入文件 "/js/config.*.js" 中, 默认值为 true 表示使用XHR请求加载主题风格的Script，
以达到控制Script执行顺序时又能并发高效加载Script，同时还对一种可能性很小的意外情况做了一致性检查。
如果不是为了兼容性目的，请始终保持该默认配置。

如果发现目标环境不支持该方式，可该载入配置设定为 `false` 使用原生的script加载方式
配合`async_script=false`来同步阻塞加载，以获得更高的兼容性。

同时，只要目标浏览器对`defer`的支持完整且符合标准，这种方式仍可并发加载顺序执行并保持非常高的性能。
:::

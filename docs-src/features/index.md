# 特性说明

这里是一些关于AnimeUI的特性以及开发方向等的说明。

## Browser Compatibility

请尽可能使用最新版本的现代浏览器。

具体不同内核浏览器版本要求参考如下：

| Browser     | Version Required | Note     |
| ----------- | ---------------- | -------- |
| Chrome      | 78+    | 嵌套组件拖拽提示样式显示异常 |
| Firefox     | 86+    | 滚动条样式定制无效; |
| Edge        | 86+    | 副作用同Chrome |
| IE          | 11+    | 或许大部分功能运作但体验缺失;限定严格模式的跨域策略; |
| Safari      | 15+    | 平滑滚动等细节部分缺失; 原生支持HEVC/h265媒体 |
| IOS_Safari  | 14.5+  | 限定严格模式的跨域策略; 原生支持HEVC/h265媒体 |
| Samsung     | 13+    | （缺乏测试） |
| Opera       | 77+    | （缺乏测试） |


## 沉浸模式

沉浸模式基于周期任务对各种预设的用户行为进行简单计算，
能自动的应用一些操作提升细节的用户体验。

AnimeUI的沉浸模式基于特定事件的全局监听，每个周期进行一次沉浸计算，因此不会带来多少性能开销。
周期任务基于 [Laction.js](https://github.com/lozyue/laction)

用户可以对沉浸计算进行辅助控制：

| Manipulation | Impact |
| ------------ | ------ |
| 双击空白处    | 加速进入沉浸状态 |
| 鼠标滚轮滚动  | 改变沉浸度 |

沉浸模式也是实验性的特性之一，许多功能仍待完善。


## 快捷键列表

在帮助关于页可以找到当前所有快捷键列表。
快捷键列表中的所有快捷键都可以定制更改。


## 播放器相关

### 播放器功能支持情况

AuiPlayer：（支持度由Lozyue按理想完成度 0-5 给出自评）
| 功能项 |   描述   | 支持度 |
| ------ | ---------------- | -------- |
| 视频播放 | 基本播放，MP4及各种流类型视频 | 4 |
| 弹幕多开载入 | 基本加载筹备，弹幕聚合重载 | 4.5 |
| 弹幕播放 | 对弹幕无遮挡播放 | 4.5 |
| 弹幕调控 | 显示区域、过滤、样式、速度、防遮挡层 | 1.5 |
| 快捷键 | 切P播放控制弹幕等快捷键 | 3.5 |
| 快捷键定制 | 对已有的大部分快捷键进行定制已经自行增删改 |4.9 |
| 高能进度条 | 通过弹幕数据密度进行高能进度绘制 | 0 |
| 触控操作适配 | 移动端触控调节适配 | 3 |

由于开发时间有限，播放器未有进行进一步的重构优化，未进行足够的移动端适配。

### MSE支持

除了浏览器本身支持的播放格式外，AuiPlayer导入了hls, dash, flv, webtorrent以尽可能的支持更多的媒体格式。

为保证播放器加载速度，其中只有hls进行了默认预加载以提供对常见的m3u8等流媒体格式的支持。
其余没有默认加载的MSE支持可在播放时手动指定type为相应格式以激活自动加载，否则将提示不支持。

已经加载的MSE类型媒体将自动添加进auto识别模式，后续播放媒体可指定type为auto。

如果需要修改默认额外MSE支持加载设定请到全局配置文件`config.*.js`中寻找`AuiConfig.AuiPlayer`配置项，默认配置如下
```js
// config.*.js
AuiConfig = {
  AuiPlayer: {
    hls: true, // Default
    flv: false,
    webtorrent: false,
    dash: false,
  }
  ...
}
```

### 播放器嵌入

从v2.0-alpha2版本开始，AuiPlayer支持被嵌入到其他网页作为网页播放器了。

嵌入方式为部署网站地址+AuiPlayer页面地址(`/aui-player`)。

进入AuiPlayer页面可以在底部的测试示例中展开找到相应的iframe测试代码。

```html
<iframe src="https://zaxtyson.github.io/AnimeSearcher/#/aui-player?src=https%3A%2F%2Fapi.dogecloud.com%2Fplayer%2Fget.mp4%3Fvcode%3D5ac682e6f8231991%26userId%3D17%26ext%3D.mp4&name=%E5%85%89%E3%82%8B%E3%81%AA%E3%82%89%20-%20Goose%20house&danmu=https%3A%2F%2Fs-sh-17-dplayercdn.oss.dogecdn.com%2F1678963.json?style=default" allow="fullscreen" width="720px" height="480px" frameborder="0"></iframe>
```
<p>
  <img :src="$withBase('/assets/images/iframe-test.png')" alt="Iframe测试效果">
</p>
<!-- ![Iframe测试效果](/assets/images/iframe-test.png) -->

支持的URL播放控制参数有: 

| 参数名 |   描述   | 补充 |
| ------ | ---------------- | -------- |
| name | 播放视频名称，用于显示以及弹幕匹配 | AuiPlayer初始化时有效 |
| src | 视频播放源链接 | AuiPlayer初始化时有效 |
| type | 视频播放类型, 同 AuiPlayer 支持的类型 | AuiPlayer初始化时有效 |
| danmu | 指定弹幕播放链接 | AuiPlayer初始化时有效 |
| title | 视频集标题， | AuiPlayer初始化时有效 |
| webfull | 设定为true以启用dlplayer初始占满页面 | AuiPlayer初始化时有效 |
| innerDanmaku | 是否启用内置弹幕，传递`false`以禁用自动弹幕匹配 | 多处有效 |
| order | 指定当前播放列表的播放排序: 0\|false=>原序, 1\|true=>顺序排序, 2=>逆序排序, 3=>原序逆序 | 多处有效 |

> *多处有效指用到以AuiPlayer核心组件为基础的播放器的页面初始化时有效，如Anime分区播放器*


## 配置相关

### 数据懒保存

应用中所有的数据存储都是基于之前提取封装的小型JSON存储库: [Lycabinet](https://github.com/lozyue/lycabinet)

默认数据保存采用节流防抖并行，但是仍然存在一个小于最小存储周期的数据丢失可能性。

目前这个最小周期是5s, 对于除特定场景外的大部分非关键性数据都是采用懒保存模式(Lazy Save)

最典型的例子有：

- 删除各种历史记录
- 修改设定主题
- 视频播放中的观看时间点记录的更新

但不必过于担心，做懒保存的目的主要是为了进行更好的性能优化，
并在特定场景都是实时保存的。  
比如：

- 增加历史记录立即保存
- 暂停视频时立即保存记录（同时该行为进行了节流防抖）

::: tip 修改最小周期
你可以在主题风格中使用API进行设定该最小存储周期
但其将会影响全局的性能！

see: [修改系统设定](./####)
:::


## 主题系统相关

主题的切换除了在应用内各处主题模块点击外，还可以在应用初始化时通过指定URL参数来指定一次主题。

```html
https://zaxtyson.github.io/AnimeSearcher/#/aui-player?style=default&blending=dew
```
如上URL中末尾参数使用`style=default`指定了主题风格为"default", 使用`blending=dew`指定了主题配色为"dew", 
其拼接规则遵循URL拼接规则，你可以使用`utils.addURLModifier`方法或者调用`encodeURIComponent`手动拼接路由参数。

| 参数名 |   描述   | 补充 |
| ------ | ---------------- | -------- |
| style | 通过主题风格名称指定启动时的主题风格 | 仅全局初始化有效 |
| blending | 通过主题风格名称指定启动时的主题风格 | 仅全局初始化时有效 |


目前的主题系统还非常不完善，处于初期阶段。

像主题更新、主题检查更新等功能均未完成，相关文档也不够完善（/逃）。

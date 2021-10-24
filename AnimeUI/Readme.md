# AnimeSearcherUI 2.0 重磅来袭

全新的体验，更优的界面. 更流畅的性能。

经过6个多月的重新创构，AnimeSearcherUI 2.0 终于和大家见面了！

自顶向下全新设计，高度自由和后续扩展性支持！


## 介绍

AnimeSearcherUI是 [AnimeSearcher](https://github.com/zaxtyson/AnimeSearcher/) 的Web前端部分.


## 关于 AnimeSearcher

AnimeSearcher 是一个基于python的多引擎管理配合聚合弹幕播放的测试案例
结合
对Web单页应用的易用性与可定制性间的最佳平衡关系探索的个人实践。


## 主题框架设计核心思想

将元素布局与装饰样式分离开来，在不给主题过多负担的情况下，达到界面样式定制大改观的效果。

主题尽可能无需考虑布局，仅仅考虑装饰即可！

故将装饰属性值预设成css变量，便可提供给主题进行修改！


### 主题类及其应用

```css
.bg-primary {
  --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}
.text-primary {
  color: rgb(var(--v-theme-primary));
}
.border-primary {
  --v-border-color: var(--v-theme-primary);
}
.bg-background {
  --v-theme-overlay-multiplier: var(--v-theme-background-overlay-multiplier);
  background: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-on-background));
}
.text-background {
  color: rgb(var(--v-theme-background));
}
.border-background {
  --v-border-color: var(--v-theme-background);
}
.bg-surface {
  --v-theme-overlay-multiplier: var(--v-theme-surface-overlay-multiplier);
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}
.text-surface {
  color: rgb(var(--v-theme-surface));
}
.border-surface {
  --v-border-color: var(--v-theme-surface);
}
.bg-primary-darken-1 {
  --v-theme-overlay-multiplier: var(--v-theme-primary-darken-1-overlay-multiplier);
  background: rgb(var(--v-theme-primary-darken-1));
  color: rgb(var(--v-theme-on-primary-darken-1));
}
.text-primary-darken-1 {
  color: rgb(var(--v-theme-primary-darken-1));
}
.border-primary-darken-1 {
  --v-border-color: var(--v-theme-primary-darken-1);
}
.bg-secondary {
  --v-theme-overlay-multiplier: var(--v-theme-secondary-overlay-multiplier);
  background: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
}
.text-secondary {
  color: rgb(var(--v-theme-secondary));
}
.border-secondary {
  --v-border-color: var(--v-theme-secondary);
}
.bg-secondary-darken-1 {
  --v-theme-overlay-multiplier: var(--v-theme-secondary-darken-1-overlay-multiplier);
  background: rgb(var(--v-theme-secondary-darken-1));
  color: rgb(var(--v-theme-on-secondary-darken-1));
}
.text-secondary-darken-1 {
  color: rgb(var(--v-theme-secondary-darken-1));
}
.border-secondary-darken-1 {
  --v-border-color: var(--v-theme-secondary-darken-1);
}
.bg-error {
  --v-theme-overlay-multiplier: var(--v-theme-error-overlay-multiplier);
  background: rgb(var(--v-theme-error));
  color: rgb(var(--v-theme-on-error));
}
.text-error {
  color: rgb(var(--v-theme-error));
}
.border-error {
  --v-border-color: var(--v-theme-error);
}
.bg-info {
  --v-theme-overlay-multiplier: var(--v-theme-info-overlay-multiplier);
  background: rgb(var(--v-theme-info));
  color: rgb(var(--v-theme-on-info));
}
.text-info {
  color: rgb(var(--v-theme-info));
}
.border-info {
  --v-border-color: var(--v-theme-info);
}
.bg-success {
  --v-theme-overlay-multiplier: var(--v-theme-success-overlay-multiplier);
  background: rgb(var(--v-theme-success));
  color: rgb(var(--v-theme-on-success));
}
.text-success {
  color: rgb(var(--v-theme-success));
}
.border-success {
  --v-border-color: var(--v-theme-success);
}
.bg-warning {
  --v-theme-overlay-multiplier: var(--v-theme-warning-overlay-multiplier);
  background: rgb(var(--v-theme-warning));
  color: rgb(var(--v-theme-on-warning));
}
.text-warning {
  color: rgb(var(--v-theme-warning));
}
.border-warning {
  --v-border-color: var(--v-theme-warning);
}
.on-background {
  color: rgb(var(--v-theme-on-background));
}
.on-surface {
  color: rgb(var(--v-theme-on-surface));
}
.on-primary {
  color: rgb(var(--v-theme-on-primary));
}
.on-primary-darken-1 {
  color: rgb(var(--v-theme-on-primary-darken-1));
}
.on-secondary {
  color: rgb(var(--v-theme-on-secondary));
}
.on-secondary-darken-1 {
  color: rgb(var(--v-theme-on-secondary-darken-1));
}
.on-error {
  color: rgb(var(--v-theme-on-error));
}
.on-info {
  color: rgb(var(--v-theme-on-info));
}
.on-success {
  color: rgb(var(--v-theme-on-success));
}
.on-warning {
  color: rgb(var(--v-theme-on-warning));
}
```


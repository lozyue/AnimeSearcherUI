(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{403:function(s,t,a){"use strict";a.r(t);var n=a(49),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"helper-with-css-styles"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#helper-with-css-styles"}},[s._v("#")]),s._v(" Helper with CSS Styles")]),s._v(" "),a("p",[s._v("主题风格的样式开发尽管非常简单，并且开发主题的大多数时候，\n在主题风格的样式表中所写的也只是对应用的部分修改。")]),s._v(" "),a("p",[s._v("但一旦样式表样式数量增长的足够多，很快一些CSS难以维护的弊端也会暴露出来。")]),s._v(" "),a("p",[s._v("主题风格的样式编写中要大量的重复主题名前缀，\n一些特殊的属性仍然需要为不同浏览器添加不同前缀，\nCSS的注释的书写也不是那么方便...")]),s._v(" "),a("p",[s._v("通常在集成开发环境下我们都会使用一系列的工具来辅助编写CSS，\n但即便是编写主题风格的少许样式表，\n我们也仍然推荐利用nodejs的能力来帮助我们提升开发效率。\n"),a("s",[s._v("可能大多数人认为小场景装一堆node-modules是一种浪费...")])]),s._v(" "),a("p",[s._v("这里主要对使用Sass、Autoprefixer等CSS辅助工具作简单的介绍。")]),s._v(" "),a("p",[a("em",[s._v("(本篇主要面向还不熟悉工程化以及SCSS的业余开发者，大佬可以绕道了)")])]),s._v(" "),a("h2",{attrs:{id:"about"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#about"}},[s._v("#")]),s._v(" About")]),s._v(" "),a("blockquote",[a("p",[s._v("Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.")])]),s._v(" "),a("p",[s._v("Sass 是这个世界上最成熟、稳定、强大且专业的CSS拓展语言。")]),s._v(" "),a("p",[s._v("Use Autoprefixer by PostCSS:")]),s._v(" "),a("blockquote",[a("p",[s._v("PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.\nIt is recommended by Google and used in Twitter and Alibaba.")])]),s._v(" "),a("p",[s._v("通过使用PostCSS，Autoprefixer能为 CSS 自动添加前缀来适配更多的浏览器环境。")]),s._v(" "),a("h2",{attrs:{id:"environment-preparation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#environment-preparation"}},[s._v("#")]),s._v(" Environment Preparation")]),s._v(" "),a("p",[s._v("你需要先预装好 "),a("a",{attrs:{href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("NodeJS"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("然后找好一个工作目录，在下面建立整个主题风格的开发目录。")]),s._v(" "),a("p",[s._v("如果已经建立了AnimeUI的主题风格开发目录：")]),s._v(" "),a("p",[s._v("不论你是否想要将你的主题提交PR到 AnimeSearcherUI 中与其他用户共享，\n都推荐在已建立的目录外(开发目录同级)创建npm环境作为工作目录。")]),s._v(" "),a("p",[s._v("假设你的主题名称为 "),a("code",[s._v("helloworld")]),s._v(", 创建好的目录结构可能是这样的：")]),s._v(" "),a("div",{pre:!0},[a("pre",{pre:!0,attrs:{style:"color:#fff;"}},[s._v(".\n├── /  (Workspace)\n│   ├── helloworld (主题风格开发目录)\n│   │   ├── assets (资源目录)\n│   │   ├── main.scss (主样式表)\n|   |   ├── ...\n│   │   └── entry.json (主题风格配置文件)\n│   │ \n├── node_module (依赖模块)\n└── package.json (环境配置文件)\n")])]),a("h3",{attrs:{id:"init-workspace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#init-workspace"}},[s._v("#")]),s._v(" Init Workspace")]),s._v(" "),a("p",[s._v("选好了工作区我们就可以使用node所带包管理器npm来初始化工作区:\n(在该目录下打开终端)")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" init -y\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("可以看到 npm 在工作目录下为我们生成了一个package.json,\n接下来我们来安装所需依赖。")]),s._v(" "),a("h3",{attrs:{id:"install-requirements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-requirements"}},[s._v("#")]),s._v(" Install Requirements")]),s._v(" "),a("p",[s._v("这里我们先安装所需的 sass 和 autoprefixer.")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -D sass\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -D postcss postcss-cli autoprefixer\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("等待至安装成功。")]),s._v(" "),a("p",[s._v("如果 npm 下载太慢可以试试替代包管理器 "),a("code",[s._v("yarn")]),s._v("或者"),a("code",[s._v("cnpm")]),s._v(" 这里就不再展开。")]),s._v(" "),a("h3",{attrs:{id:"npm-script"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm-script"}},[s._v("#")]),s._v(" NPM Script")]),s._v(" "),a("p",[s._v("仍然假设你的主题名称为 "),a("code",[s._v("helloworld")]),s._v(", 待会儿需要将主题名需要配置到路径里面")]),s._v(" "),a("p",[s._v("打开 package.json 的"),a("code",[s._v("scripts")]),s._v("字段并配置为以下内容：")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"gen:sass"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sass \\"helloworld/\\" --style=expanded --charset --no-source-map"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"gen:prefix"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"postcss \\"helloworld/\\" --use autoprefixer -d helloworld/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build:style"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"npm run gen:sass && npm run gen:prefix"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("这样在编写完成后就可以直接使用命令 "),a("code",[s._v("npm run build:style")]),s._v(" 来生成CSS文件了。")]),s._v(" "),a("h2",{attrs:{id:"scss-language"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scss-language"}},[s._v("#")]),s._v(" SCSS-Language")]),s._v(" "),a("p",[s._v("这里简单介绍一下scss最基础的语法特性：")]),s._v(" "),a("h3",{attrs:{id:"nesting-嵌套"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nesting-嵌套"}},[s._v("#")]),s._v(" Nesting 嵌套")]),s._v(" "),a("p",[s._v("嵌套能很好的展现层级关系，同时节省一些代码量。\n同时嵌套的每一级中也同时兼容各种选择器。")]),s._v(" "),a("p",[s._v("并且可以使用"),a("code",[s._v("&")]),s._v("来代替父节点自身选择器，以便于将一些需要嵌套铺平开来使样式更整洁等。")]),s._v(" "),a("div",{staticClass:"language-scss line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-scss"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("nav ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("ul ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("padding")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("list-style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" none"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("li ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("span a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("text-decoration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" none"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" \n      "),a("span",{pre:!0,attrs:{class:"token selector"}},[a("span",{pre:!0,attrs:{class:"token parent important"}},[s._v("&")]),s._v(":hover")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" lightblue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".shim ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" block"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("padding-bottom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 6px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("p",[s._v("上面的 "),a("code",[s._v("&:hover")]),s._v(" 就代替了 "),a("code",[s._v("li:hover")]),s._v("，将hover属性和子路径放在了"),a("code",[s._v("li")]),s._v("下的同一级。\n对于这条规则，scss解析后的结果为："),a("code",[s._v("nav ul li:hover{background: lightblue}")]),s._v("。")]),s._v(" "),a("h3",{attrs:{id:"variable-变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#variable-变量"}},[s._v("#")]),s._v(" Variable 变量")]),s._v(" "),a("p",[s._v("Sass允许使用 "),a("code",[s._v("$")]),s._v(" 来声明一个变量，并允许对其进行 加减乘除 等运算操作。")]),s._v(" "),a("div",{staticClass:"language-scss line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-scss"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// @use "sass:math";')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$font-stack")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Helvetica"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" sans-serif"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$primary-color")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" #333"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("p ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Can also write here!")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$font-size")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 14px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 100% "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$font-stack")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$primary-color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("padding-bottom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$font-size")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" 2px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("可以去官方文档 Sass-基础 查看更详细的介绍: "),a("a",{attrs:{href:"#links"}},[s._v("Links")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("这里的变量不是真正的变量，也和css变量完全不同，而更类似一种预编译阶段起作用的宏。")])]),s._v(" "),a("blockquote",[a("p",[s._v("Some fragments are refer from document of Sass-language, see: "),a("a",{attrs:{href:"#links"}},[s._v("Links")])])]),s._v(" "),a("h3",{attrs:{id:"annotation-注释"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#annotation-注释"}},[s._v("#")]),s._v(" Annotation 注释")]),s._v(" "),a("p",[s._v("Sass允许单行注释 "),a("code",[s._v("//")]),s._v("，同时也保留原有css多行注释"),a("code",[s._v("/**/")]),s._v("，\n但同样的，多行注释不允许嵌套。")]),s._v(" "),a("p",[s._v("如果你不想在Sass编译后的css里看到注释，请全部使用双斜杠注释: "),a("code",[s._v("//")]),s._v("。")]),s._v(" "),a("p",[s._v("而默认多行注释会被保留下来: "),a("code",[s._v("/**/")])]),s._v(" "),a("p",[s._v("因为Scss拓展的"),a("code",[s._v("//")]),s._v("这样的注释是在css里不是合法注释，\n所以Sass-loader在将Scss转化为Css的时候会把"),a("code",[s._v("//")]),s._v("过滤掉。")]),s._v(" "),a("p",[s._v("而"),a("code",[s._v("/**/")]),s._v("这样的注释是css的合法注释，Sass-loader默认不会进行删除。")]),s._v(" "),a("p",[s._v("如果你一定需要删除这样的注释，\n由于配置css-loader的minimize选项来启用压缩可以删除注释无法避免css被压缩，\n建议自行手写一个简单的plugin来实现。")]),s._v(" "),a("h2",{attrs:{id:"put-into-practices"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#put-into-practices"}},[s._v("#")]),s._v(" Put into Practices")]),s._v(" "),a("h3",{attrs:{id:"new-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#new-file"}},[s._v("#")]),s._v(" New File")]),s._v(" "),a("p",[s._v("假设我们要编写一个 main.css 的样式在我们的主题风格 helloworld 中，那么我们就新建一个 main.scss")]),s._v(" "),a("p",[s._v("其余需要新建的样式表也如此处理。")]),s._v(" "),a("h3",{attrs:{id:"write-the-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#write-the-code"}},[s._v("#")]),s._v(" Write the code")]),s._v(" "),a("p",[s._v("现在我们想要定制一个背景，再将卡片默认圆角效果调小，本来应该这么写：")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* Set the custom background class */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".helloworld .my-background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string url"}},[s._v('"/themes/styles/helloworld/bg.png"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" cover"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* Minimize the radius of .card */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".helloworld .card")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("var")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("--v-layer-md-radius"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("按照主题风格样式编写规范，我们都应该为所有主题中的样式类 添加 主题类做父类以自适应优先级。")]),s._v(" "),a("p",[s._v("而这里可以看到"),a("code",[s._v(".helloworld")]),s._v("这个主题类重复了两次，并且之后要写多少个类就要重复多少次。\n这样的样式编写体验很差。")]),s._v(" "),a("p",[s._v("我们利用 scss 嵌套来解决这一问题：")]),s._v(" "),a("div",{staticClass:"language-scss line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-scss"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// main.scss")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".helloworld ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Set the custom background class")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".my-background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[s._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/themes/styles/helloworld/bg.png"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" cover"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Minimize the radius of .card")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".card")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("var")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("--v-layer-md-radius"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[s._v("代码变得更简洁，结构变得更清晰了！")]),s._v(" "),a("p",[s._v("接下来就是愉快的样式编写了！")]),s._v(" "),a("blockquote",[a("p",[s._v("更多用法还请参考"),a("a",{attrs:{href:"#links"}},[s._v("官方文档")]),s._v("和其他资料。")])]),s._v(" "),a("h3",{attrs:{id:"build-check"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#build-check"}},[s._v("#")]),s._v(" Build&Check")]),s._v(" "),a("p",[a("code",[s._v(".scss")]),s._v(" 文件并不能被浏览器识别，需要被编译成css文件后才可以被识别，所以使用scss并非减小CSS生产代码体积（开压缩效果会好些）。")]),s._v(" "),a("p",[s._v("那我们就来把已编写好了的 scss 文件那就利用 Sass 编译一下吧。\n之前已经配置好了 npm script, 只要目录正确，编译仅需简单一句命令:")]),s._v(" "),a("p",[s._v("在当前工作目录下打开终端: (或在终端中切换到当前工作目录下)")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run build:style\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("相应名称的 css 文件就会生成在源文件旁边啦！")]),s._v(" "),a("p",[s._v("编译好后将"),a("code",[s._v("main.css")]),s._v("添加进入 "),a("code",[s._v("entry.json")]),s._v(" 的样式列表中即可。")]),s._v(" "),a("p",[s._v("之后的每次修改"),a("code",[s._v(".scss")]),s._v("文件都需要重新执行上述命令进行编译才能刷新查看效果。")]),s._v(" "),a("p",[s._v("你也可以添加"),a("code",[s._v("--watch")]),s._v("选项开启 Sass 监控在保存文件时自动重新编译，\n在 package.json 中的 scripts 字段添加如下命令：")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dev:style"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sass --watch \\"/\\" --style=expanded --charset --no-source-map && postcss *.css --use autoprefixer -d build/"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"links"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#links"}},[s._v("#")]),s._v(" Links")]),s._v(" "),a("p",[s._v("Here is the relative links:")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://sass-lang.com/guide",target:"_blank",rel:"noopener noreferrer"}},[s._v("Sass 基础"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://sass-lang.com/documentation/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Sass 文档"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=e.exports}}]);
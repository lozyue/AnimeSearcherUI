---
sidebar: auto
sidebarDepth: 2
---

# Helper(帮助)

这里是一些通用的帮助姿势合集。

## 修改浏览器本地特殊同源设定

用于开启本地文件协议更宽松的同源政策。
允许File:协议下Ajax的访问文件操作。

- Firefox 的修改设定方式如下：
> Firefox 新建标签页 地址栏输入 about:config  
> 点击接受风险并继续  
> 搜索栏输入并找到: `privacy.file_unique_origin`
> 切换 值为 false 即可(无需刷新)  

- Chrome 修改改设定需要添加启动参数: (以windows为例) 
> 找到Chrome快捷方式编辑属性 (或者直接找到Chrome.exe安装路径创建一个快捷方式)   
> 在"快捷方式"选项下的"目标"路径末尾后面加启动参数 ` --allow-file-access-from-files`(需要添加空格)  
> 重启chrome以完成  

附图:  
![Chrome添加启动参数示例](/assets/images/add-file-access.jpg "Chrome添加启动参数")

::: danger 注意:
**修改该设定需要自行承担可能的文件被窃取的风险！**
**请不要该浏览器打开任何不信任的本地网页文件**  

风险提示: [CVE-2019-11730](https://www.mozilla.org/en-US/security/advisories/mfsa2019-21/#CVE-2019-11730)
:::
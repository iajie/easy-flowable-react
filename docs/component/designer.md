---
title: 设计器案例
order: 1
group: demo
token:
    contentMaxWidth: 1580
---

<code src="./demos/designer.tsx"></code>

:::warning{title=tip}
在设计器中，可以传递data/request来给设计器传递数据，数据需要为bpmn2.0规范的xml数据。
在toolbar和panel自定义渲染中都会返回设计器实例，可以自定义实现很多功能。
如果您需要保存操作，那么您可以通过toolbar的save方法，方法会返回xml和缩略图以及模型信息！
:::

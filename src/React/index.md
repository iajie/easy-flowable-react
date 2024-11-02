---
title: 与React整合
order: 2
---

## 安装
```bash
npm install easy-flowable-react
```

## 代码示例
<code src="./demo/viewer.tsx">流程图组件</code>
<code src="./demo/designer.tsx">设计器组件</code>

## 配置
可通过toolbar和panel修改设计器顶部工具栏和侧边栏属性栏配置

- [工具栏配置](../Bpmn/index.md#toolbarprops) 自定义工具栏、保存操作、查看源码等
- [属性面板配置](../Bpmn/index.md#panelprops) 自定义属性面板操作，设置节点类型参数等

:::warning{title=tip}
在设计器中，可以传递data/request来给设计器传递数据，数据需要为bpmn2.0规范的xml数据。
在toolbar和panel自定义渲染中都会返回设计器实例，可以自定义实现很多功能。
如果您需要保存操作，那么您可以通过toolbar的save方法，方法会返回xml和缩略图以及模型信息！
:::

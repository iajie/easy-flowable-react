---
title: '流程图属性'
group: '属性'
order: 2
token:
    contentMaxWidth: 1280
---

## EasyFlowableViewer 流程图组件(流程动态)
> `EasyFlowableViewer`是基于 `Ant Design` + `bpmn.js` 而开发的流程图预览组件。

## API
| 属性名         | 描述                                          | 类型                                                                   | 默认值    |
|-------------|---------------------------------------------|----------------------------------------------------------------------|--------|
| data        | 画布字符串                                       | string                                                               | -      |
| request     | 异步方法，如果你的数据需要<br/>网络请求，那么你可以使用<br/>该方法，如果使用该方法会覆盖data | `() => Promise<string 丨 NodeType>`                                   | -      |
| height      | 设计器高度(屏幕可视高度)                               | `number`                                                             | `60`   |
| mode        | 显示模式，read为单显示为设计器<br/>样式，active为流程图模式            | `read`丨`active`                                                      | `read` |
| active      | 流程图模式                                       | [ActiveProps](#ActiveProps)                                          | -      |
| excludeType | 排除节点类型，如果添加<br/>点击节点将不会弹出框                       | `string[]`                                                           | -      |
| onClick     | 点击流程图节点触发事件                                 | `(id: string, type?: string, node?: any) => Promise<PopoverContent>` | -      |
| tipRender   | 点击流程图节点弹出框内容自定义                             | `(id: string, type?: string, node?: any) => ReactNode`               | -      |

### NodeType

:::warning{title=提示}
要使activeNode和executeNode生效，需要设置mode="active"
:::

| 属性名         | 描述        | 类型        | 默认值 |
|-------------|-----------|-----------|-----|
| data        | 设计器数据xml  | string    | -   |
| activeNode  | 激活节点      | string[]  | -   |
| executeNode | 执行节点      | string[]  | -   |

### ActiveProps
:::warning{title=提示}
注意activeNode和executeNode生效，需要设置mode="active"，且会被request异步返回的结果覆盖
:::

| 属性名          | 描述      | 类型                                    | 默认值       |
|--------------|---------|---------------------------------------|-----------|
| activeColor  | 激活节点颜色  | `success丨process丨danger丨warning丨cyan丨purple` | `process` |
| activeNode   | 激活节点    | string[] | -         |
| executeColor | 已执行节点   | `success丨process丨danger丨warning丨cyan丨purple` | `success` |
| executeNode  | 执行节点    | string[] | -         |

### PopoverContent

| 属性名       | 描述     | 类型         | 是否必须    | 默认值                         |
|-----------|--------|------------|---------|-----------------------------|
| title     | 弹出框标题  | `string`   | `false` | 流程图节点名称                     |
| users     | 节点执行人  | `string[]丨ReactNode` | `true`  | -                           |
| status    | 节点状态   | `string丨ReactNode` | `false` | 流程图executeNode和activeNode状态 |
| startTime | 任务开始时间 | `string丨Date` | `false` | -                           |
| endTime   | 任务结束时间 | `string丨Date` | `false` | -                           |
| duration  | 任务耗时   | `number` | `false` | -                           |

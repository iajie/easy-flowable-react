---
title: 流程任务
order: 5
group:
    title: UI相关接口
    order: 3
---

## 1、执行任务
:::code-group
```js [url]
POST `/easy-flowable/task/execute` 
```

```json [请求参数] {2}
{
    "taskId": "", // 任务ID
    "flowCommentType": "", // 可通过设计器拓展获取 审批类型
    "assignee": "", // 任务办理人
    "assigneeName": "", // 任务办理人姓名
    "userId": "", // 在转办和委派中使用 任务处理人
    "variables": {}, // 流程变量，在网关出决定流程走向/任务完成跳过条件
    "rejectToTaskId": "", // 当驳回指定节点时用到 回退任务ID
    "commentContent": "" // 审批意见
}
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功！", 
    "code": 200,
    "result": null   
}
```
:::

## 2、上传附件
:::code-group
```js [url]
// 1. formData.file
POST `/easy-flowable/task/addAttachment?taskId=${taskId}&processInstanceId=${processInstanceId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": "attachmentId" // 附件ID
}
```
:::

## 3、删除附件

:::code-group
```js [url]
GET `/easy-flowable/task/delAttachment/${attachmentId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": null
}
```
:::

## 4、获取附件

:::code-group
```js [url]
GET `/easy-flowable/task/getAttachment/${attachmentId}` // 同步
```
:::

## 5、获取当前任务节点执行人(包含候选人)

:::code-group
```js [url]
GET `/easy-flowable/task/executors/${taskId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [] 
}
```
:::

## 6、获取当前任务节点候选组

:::code-group
```js [url]
GET `/easy-flowable/task/executeOrgan/${taskId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [] 
}
```
:::

## 7、流程预测
> 获取下一节点信息、流程局部变量、操作方式

:::code-group
```js [url]
GET `/easy-flowable/task/nextNodeVariables/${taskId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": {
        "attributes": {
            "actions": [],
        },
        "sequenceFlow": [
            {
                "label": "", // 节点+类型
                "value": "" // 表达式
            }
        ]
    }
}
```
:::

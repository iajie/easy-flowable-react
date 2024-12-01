---
title: Task Path
order: 5
group:
    title: UI Console Path
    order: 3
---

## 1、Execute task
:::code-group
```js [url]
POST `/easy-flowable/task/execute` 
```

```json [param] {2}
{
    "taskId": "",
    "flowCommentType": "",
    "assignee": "",
    "assigneeName": "",
    "userId": "",
    "variables": {},
    "rejectToTaskId": "",
    "commentContent": ""
}
```

```json [return] {3}
{
    "success": true,
    "message": "成功！", 
    "code": 200,
    "result": null   
}
```
:::

## 2、Upload attachments
:::code-group
```js [url]
// 1. formData.file
POST `/easy-flowable/task/addAttachment?taskId=${taskId}&processInstanceId=${processInstanceId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": "attachmentId"
}
```
:::

## 3、Delete attachment

:::code-group
```js [url]
GET `/easy-flowable/task/delAttachment/${attachmentId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": null
}
```
:::

## 4、Get attachments

:::code-group
```js [url]
GET `/easy-flowable/task/getAttachment/${attachmentId}`
```
:::

## 5、Retrieve the current task node executor (including candidates)

:::code-group
```js [url]
GET `/easy-flowable/task/executors/${taskId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [] 
}
```
:::

## 6、Obtain the candidate group for the current task node

:::code-group
```js [url]
GET `/easy-flowable/task/executeOrgan/${taskId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [] 
}
```
:::

## 7、Process prediction
> Obtain the next node information, process local variables, and operation mode

:::code-group
```js [url]
GET `/easy-flowable/task/nextNodeVariables/${taskId}`
```

```json [return] {3}
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
                "label": "", 
                "value": "" 
            }
        ]
    }
}
```
:::

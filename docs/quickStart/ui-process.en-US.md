---
title: ProcessInstance Path
order: 4
group:
    title: UI Console Path
    order: 3
---

## 1、Start Process Instance
:::code-group
```js [url]
POST `/easy-flowable/processInstance/start` 
```

```json [param] {2}
{
    "flowKey": "", 
    "processDefinitionId": "",
    "businessKey": "",
    "startUserId": "",
    "startUsername": "",
    "variables": {},
    "skipFirstNode": false, 
    "processName": "", 
    "startFormData": false, 
    "formData": {}
}
```

```json [return] {3}
{
    "success": true,
    "message": "成功！", 
    "code": 200,
    "result": "processInstanceId"   
}
```
:::

## 2、Get the list of started process instances
:::code-group
```js [url]
GET `/easy-flowable/processInstance/list/${processDefinitionId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "processInstanceId": "",
            "processDefinitionId": "",
            "startTime": "", 
            "startUserId": "",
            "status": false,
            "businessKey": "", 
            "name": "",
            "businessKeyStatus": "",
            "tenantId": "",
            "deploymentId": "", 
            "processInstanceVersion": 0, 
            "taskId": "", 
            "taskIds": "", 
        }
    ] 
}
```
:::

## 3、Process instance status setting
> When the instance status is active, it will be set to terminate, and when the instance status is terminated, the status will be activated

:::code-group
```js [url]
GET `/easy-flowable/processInstance/stateSet/${processInstanceId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": true
}
```
:::

## 4、Edit process business status

:::code-group
```js [url]
GET `/easy-flowable/processInstance/businessStatus?processInstanceId=${processInstanceId}&status=${status}`
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

## 5、Retrieve the process execution history based on the process instance ID
- [comments](./api-process.en-US.md#Approval Opinion)

:::code-group
```js [url]
GET `/easy-flowable/processInstance/executionHistory/${processInstanceId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "historyId": "",
            "taskId": "",
            "executionId": "", 
            "taskName": "",
            "taskDefKey": "",
            "processDefinitionId": "",
            "procInsId": "",
            "duration": 0,
            "startTime": "",
            "endTime": "", 
            "assignee": "", 
            "candidateUsers": [],
            "candidateGroups": [],
            "comments": [
                {
                    "commentId": "",
                    "processInstanceId": "",
                    "taskId": "",
                    "flowCommentType": "",
                    "assignee": "",
                    "assigneeName": "",
                    "userId": "",
                    "commentContent": "",
                    "attachmentId": "",
                    "ext": "",
                    "variables": {},
                    "commentTime": {},
                }
            ],
        }
    ] 
}
```
:::

## 6、Obtain a list of nodes that can be rolled back based on the process instance ID

:::code-group
```js [url]
GET `/easy-flowable/processInstance/backUserTasks/${processInstanceId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "label": "",
            "value": ""
        }
    ] 
}
```
:::

## 7、Process dynamics

:::code-group
```js [url]
GET `/easy-flowable/processInstance/processDynamics?processInstanceId=${processInstanceId}&processDefinitionId=${processDefinitionId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": {
        "data": "",
        "activeNode": [],
        "executeNode": []
    }
}
```
:::

## 7、Process instance node information

:::code-group
```js [url]
GET `/easy-flowable/processInstance/nodeInfo?processInstanceId=${processInstanceId}&nodeId=${nodeId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": {
        "startTime": "",
        "endTime": "",
        "duration": 0,
        "users": [
            {
                "userId": "",
                "username": "",
                "avatar": "",
                "email": "",
                "originId": "",
            }
        ]
    }
}
```
:::

## 8、To do statistics on the number of completed tasks

:::code-group
```js [url]
GET `/easy-flowable/processInstance/statics`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": {
        "todo": 0,
        "done": 0,
        "meTodo": 0,
        "meDone": 0
    }
}
```
:::

## 9、Page based query of pending/completed tasks

:::code-group
```js [url]
POST `/easy-flowable/processInstance/todoTaskPage`
```

```json [param]
{
    "current": 1,
    "pageSize": 10,
    "params": {
        "type": "", //todo,done, meTodo, meDone
        "userId": "",
    }
}
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": {
        "total": 0,
        "records": [
            {
                "id": "",
                "status": 0,
                "processName": "",
                "nodeName": "",
                "startTime": "",
                "endTime": "",
                "assignee": "",
                "startUserId": "",
                "taskId": "",
                "processInstanceId": "",
                "comments": [
                    {
                        "commentId": "",
                        "processInstanceId": "",
                        "taskId": "",
                        "flowCommentType": "",
                        "assignee": "",
                        "assigneeName": "",
                        "userId": "",
                        "commentContent": "",
                        "attachmentId": "",
                        "ext": "",
                        "variables": {},
                        "commentTime": {},
                    }
                ]
            }
        ]
    }
}
```
:::

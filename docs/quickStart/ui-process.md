---
title: 流程实例
order: 4
group:
    title: UI相关接口
    order: 3
---

## 1、启动流程实例
:::code-group
```js [url]
POST `/easy-flowable/processInstance/start` 
```

```json [请求参数] {2}
{
    "flowKey": "", // 与processDefinitionId二选一
    "processDefinitionId": "", // 与flowKey二选一
    "businessKey": "", // 必填
    "startUserId": "",
    "startUsername": "",
    "variables": {}, // 流程变量 (全局)伴随流程开始到结束
    "skipFirstNode": false, 是否跳过开始节点执行第一节点，第一用户节点为用户发起人提交资料...
    "processName": "", // 流程名称
    "startFormData": false, // 是否记录流程表单值变化
    "formData": {}, // 表单值, 需要@EasyItem所注释
}
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功！", 
    "code": 200,
    "result": "processInstanceId"   
}
```
:::

## 2、获取启动的流程实例列表
:::code-group
```js [url]
GET `/easy-flowable/processInstance/list/${processDefinitionId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "processInstanceId": "",
            "processDefinitionId": "", // 流程定义ID
            "startTime": "", 
            "startUserId": "",
            "status": false, // false 激活 , true终止
            "businessKey": "", // 业务主键
            "name": "", // 流程名称
            "businessKeyStatus": "", // 业务状态
            "tenantId": "", // 租户id
            "deploymentId": "", 
            "processInstanceVersion": 0, 
            "taskId": "", // 当前运行的任务ID 
            "taskIds": "", // 当前运行的任务ID(多实例/排他网关) 
        }
    ] 
}
```
:::

## 3、流程实例状态设置
> 当实例状态为激活时会设置为终止，当实例状态为终止时状态会激活

:::code-group
```js [url]
GET `/easy-flowable/processInstance/stateSet/${processInstanceId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": true
}
```
:::

## 4、编辑流程业务状态

:::code-group
```js [url]
GET `/easy-flowable/processInstance/businessStatus?processInstanceId=${processInstanceId}&status=${status}`
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

## 5、根据流程实例Id获取流程执行历史
- [comments评论列表](./api-process.md#流程审批意见)

:::code-group
```js [url]
GET `/easy-flowable/processInstance/executionHistory/${processInstanceId}`
```

```json [返回参数] {3}
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

## 6、根据流程实例Id获取可回退的节点列表

:::code-group
```js [url]
GET `/easy-flowable/processInstance/backUserTasks/${processInstanceId}`
```

```json [返回参数] {3}
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

## 7、流程动态

:::code-group
```js [url]
GET `/easy-flowable/processInstance/processDynamics?processInstanceId=${processInstanceId}&processDefinitionId=${processDefinitionId}`
```

```json [返回参数] {3}
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

## 7、流程实例节点信息

:::code-group
```js [url]
GET `/easy-flowable/processInstance/nodeInfo?processInstanceId=${processInstanceId}&nodeId=${nodeId}`
```

```json [返回参数] {3}
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

## 8、待办已办统计数量

:::code-group
```js [url]
GET `/easy-flowable/processInstance/statics`
```

```json [返回参数] {3}
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

## 9、待办/已办 任务分页查询

:::code-group
```js [url]
POST `/easy-flowable/processInstance/todoTaskPage`
```

```json [请求参数]
{
    "current": 1,
    "pageSize": 10,
    "params": {
        "type": "", //todo 代办,done已办, meTodo我的待办, meDone我的已办
        "userId": "",
    }
}
```

```json [返回参数] {3}
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

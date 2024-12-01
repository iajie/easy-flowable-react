---
title: Deployment Path
order: 3
group:
    title: UI Console Path
    order: 3
---

## 1、Deploy process through ModelId
:::code-group
```js [url]
GET `/easy-flowable/deployment/${modelId}`
```

```json [return] {3}
{
    "success": true,
    "message": "流程部署成功！", 
    "code": 200,
    "result": "deploymentId"   
}
```
:::

## 2、Deployment definition pagination query
:::code-group
```js [url]
POST `/easy-flowable/deployment/pageQuery`
```

```json [param]
{
    "current": 1,
    "pageSize": 10,
    "params": {
        "modelType": "",
        "key": "",
        "name": ""
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
        records: [
            {
                "id": "",
                "processDefinitionId": "",
                "key": "",
                "name": "",
                "modelType": "",
                "version": 0,
                "deploymentTime": "",
                "updateTime": "",
                "tenantId": "",
                "suspensionState": true,
            }
        ]
    }  
}
```
:::

## 3、Define status settings
> Set process status (when the process is: 
> 1. Activated (default set as terminated process) 
> 2. Aborted (suspended) (default set as activated process)

:::code-group
```js [url]
GET `/easy-flowable/deployment/deploymentState/${processDefinitionId}`
```

```json [return] {3}
{
    "success": true,
    "message": "流程定义状态设置成功！", 
    "code": 200,
    "result": ""
}
```
:::

## 4、Define User Nodes
:::code-group
```js [url]
GET `/easy-flowable/deployment/flowUserList/${flowKey}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "id": "",
            "name": "",
            "assignee": "",
            "candidateGroups": [],
            "candidateUsers": [],
            "flowCustomProps": {}
        }
    ] 
}
```
:::

## 5、Deploy images
```js [url]
GET `/easy-flowable/deployment/deploymentImage/${processDefinitionId}`
```

## 6、Deploy XML
:::code-group
```js [url]
GET `/easy-flowable/deployment/deploymentXml/${processDefinitionId}`
```

```json [return] {3}
{
    "success": true,
    "message": "获取成功", 
    "code": 200,
    "result": "xml"
}
```
:::

## 7、Delete definition
The **cascade** parameter is of `Boolean` type. When true, 
it will delete the corresponding instance and activity information (history). 
When false, it will not delete the corresponding history

:::code-group
```js [url]
GET `/easy-flowable/deployment/deleteDeployment?deploymentId=${deploymentId}&cascade=${cascade}`
```

```json [return] {3}
{
    "success": true,
    "message": "流程定义删除成功", 
    "code": 200,
    "result": null
}
```
:::


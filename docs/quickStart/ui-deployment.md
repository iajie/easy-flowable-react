---
title: 流程部署管理
order: 3
group:
    title: UI相关接口
    order: 3
---

## 1、通过ModelId部署流程
:::code-group
```js [url]
GET `/easy-flowable/deployment/${modelId}` 
```

```json [返回参数] {3}
{
    "success": true,
    "message": "流程部署成功！", 
    "code": 200,
    "result": "deploymentId"   
}
```
:::

## 2、流程部署定义分页查询
:::code-group
```js [url]
POST `/easy-flowable/deployment/pageQuery`
```

```json [请求参数]
{
    "current": 1,
    "pageSize": 10,
    "params": {
        "modelType": "", // 模型类型
        "key": "", // 模型标识
        "name": "", // 模型名称 模糊查询
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
        records: [
            {
                "id": "", // deploymentId
                "processDefinitionId": "", // 流程定义ID
                "key": "", // 模型唯一标识
                "name": "", // 模型名称
                "modelType": "", // 模型分类
                "version": "", // 发布版本
                "deploymentTime": "", // 部署时间
                "updateTime": "", // 最后更新时间
                "tenantId": "", // 租户id
                "suspensionState": true, // false 激活 , true终止
            }
        ]
    }  
}
```
:::

## 3、流程定义状态设置
> 设置流程状态（当流程为：1激活（默认设置为终止流程）2：中止（挂起）（默认设置为激活流程））

:::code-group
```js [url]
GET `/easy-flowable/deployment/deploymentState/${processDefinitionId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "流程定义状态设置成功！", 
    "code": 200,
    "result": ""
}
```
:::

## 4、流程定义用户任务节点
:::code-group
```js [url]
GET `/easy-flowable/deployment/flowUserList/${flowKey}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "id": "", // 设计器中的节点标识
            "name": "", // 设计器中的节点名称
            "assignee": "", // 操作人
            "candidateGroups": [], // 候选组
            "candidateUsers": [], // 候选人
            "flowCustomProps": {} // 节点拓展属性, easy-flowable拓展了actions用户审批操作列表
        }
    ] 
}
```
:::

## 5、流程部署图片
```js [url]
GET `/easy-flowable/deployment/deploymentImage/${processDefinitionId}`
```

## 6、流程部署的XML
:::code-group
```js [url]
GET `/easy-flowable/deployment/deploymentXml/${processDefinitionId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "获取成功", 
    "code": 200,
    "result": "xml"
}
```
:::

## 7、删除流程定义
**cascade**参数为Boolean类型，true时会删除对应的实例以及活动信息(历史记录)，false时不会删除对应的历史记录

:::code-group
```js [url]
GET `/easy-flowable/deployment/deleteDeployment?deploymentId=${deploymentId}&cascade=${cascade}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "流程定义删除成功", 
    "code": 200,
    "result": null
}
```
:::


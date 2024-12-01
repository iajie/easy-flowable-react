---
title: 流程模型
order: 2
group:
    title: UI相关接口
    order: 3
---

## 1、新增模型
:::code-group
```js [url]
POST `/easy-flowable/model/save`
```

```json [请求参数]
{ 
    "key": "模型标识", 
    "name": "模型名称",
    "modelType": "模型类型",
    "remarks": "备注"
}
```

```json [返回参数] {3}
{
    "success": true,
    "message": "modelId", 
    "code": 200,
    "result": null   
}
```
:::

## 2、模型修改/模型设计
:::code-group
```js [url]
POST `/easy-flowable/model/save`
```

```json [请求参数]
{
    "id": "模型新增后返回的ID", // 必填
    "name": "模型名称", 
    "remarks": "", // 模型备注
    "modelType": "", // 类型自定义，系统中会自定义11个类型
    "modelEditorXml": "", // 设计器获取资源 bpmn2.0规范的xml字符串
    "picture": "" // 非必填 缩略图
}
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

## 3、模型分页查询
:::code-group
```js [url]
POST `/easy-flowable/model/pageQuery`
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
                "id": "", // modelId
                "key": "", // 模型唯一标识
                "name": "", // 模型名称
                "modelType": "", // 模型分类
                "publishVersion": "", // 发布版本
                "createTime": "", // 创建时间
                "updateTime": "", // 最后更新时间
                "tenantId": "", // 租户id
                "remarks": "", // 备注
                "picture": "" // 缩略图base64
            }
        ]
    }  
}
```
:::

## 3、模型详情查询
:::code-group
```js [url]
GET `/easy-flowable/model/info/${modelId}`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result":  {
        "id": "", // modelId
        "key": "", // 模型唯一标识
        "name": "", // 模型名称
        "modelType": "", // 模型分类
        "publishVersion": "", // 发布版本
        "createTime": "", // 创建时间
        "updateTime": "", // 最后更新时间
        "tenantId": "", // 租户id
        "remarks": "", // 备注
        "picture": "" // 缩略图base64
        "modelEditorXml": "" // 模型数据  bpmn2.0规范的xml字符串
    } 
}
```
:::

## 4、根据ID删除流程模型
:::code-group
```js [url]
GET `/easy-flowable/model/remove/${modelId}`
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

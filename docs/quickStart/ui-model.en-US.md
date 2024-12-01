---
title: Model Path
order: 2
group:
    title: UI Console Path
    order: 3
---


## 1、insert model
:::code-group
```js [url]
POST `/easy-flowable/model/save`
```

```json [param]
{ 
    "key": "", 
    "name": "",
    "modelType": "",
    "remarks": ""
}
```

```json [return] {3}
{
    "success": true,
    "message": "modelId", 
    "code": 200,
    "result": null   
}
```
:::

## 2、model update/model designer
:::code-group
```js [url]
POST `/easy-flowable/model/save`
```

```json [params]
{
    "id": "",
    "name": "", 
    "remarks": "", 
    "modelType": "",
    "modelEditorXml": "",
    "picture": ""
}
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

## 3、model page search
:::code-group
```js [url]
POST `/easy-flowable/model/pageQuery`
```

```json [params]
{
    "current": 1,
    "pageSize": 10,
    "params": {
        "modelType": "",
        "key": "",
        "name": "",
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
                "key": "",
                "name": "",
                "modelType": "",
                "publishVersion": 0,
                "createTime": "",
                "updateTime": "",
                "tenantId": "",
                "remarks": "",
                "picture": "" // base64
            }
        ]
    }  
}
```
:::

## 3、model info by modelId
:::code-group
```js [url]
GET `/easy-flowable/model/info/${modelId}`
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result":  {
        "id": "",
        "key": "",
        "name": "",
        "modelType": "",
        "publishVersion": "",
        "createTime": "",
        "updateTime": "",
        "tenantId": "",
        "remarks": "",
        "picture": "",
        "modelEditorXml": ""
    } 
}
```
:::

## 4、delete by modelId
:::code-group
```js [url]
GET `/easy-flowable/model/remove/${modelId}`
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

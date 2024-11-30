---
group:
    title: API
    order: 2
toc: content
title: Model
order: 2
---
:::info{title=Quick Tips}
Modal APIs：EasyModelService
:::

## 1、Insert Model
`insert(model)`，After adding, return the modelId. The new parameter model is as follows:

|     props      | description      | type        | required |
|--------------|---------|-----------|-----|
| key | Model identification (cannot be modified after adding) | `String`    | `true`   |
| name | Model name | `String`  | `true`   |
| modelType | The UI console provides [12 types](#Console provides model types) | `String`  | `true`   |
| remarks | - | `String`  | `false`   |

## 2、Modify Model/Model Design
`updateById(model)`，Modify model information, the console supports model thumbnail for modifying information

|     props      | description                                                                 | type        | required |
|--------------|-----------------------------------------------------------------------------|-----------|-----|
| id | modelId                                                                     | `String`    | `true`   |
| name | Model name                                                                  | `String`  | `false`   |
| modelType | The UI console provides [12 types](#Console provides model types)           | `String`  | `false`   |
| modelEditorXml | The model design content needs to comply with the **BPMN2.0** specification | `String`  | `false`   |
| picture | Process thumbnail (provided by designer)                                    | `String`  | `false`   |
| remarks | -                                                                           | `String`  | `false`   |

## 3、Query model details based on ID
### 3.1、`getById(String id, boolean existsError)`
- id: modelId
- existsError: Does the model throw an exception when it is empty
### 3.2、`getByKey(String key)` Query model details based on model identification
result：

|     props      | description                                                                 | type        |
|--------------|-----------------------------------------------------------------------------|----------|
| id | modelId                                                                     | `String` |
| key | model key                                                                   | `String` |
| name | model name                                                                  | `String` |
| modelType | The UI console provides [12 types](#Console provides model types)           | `String` |
| modelEditorXml | The model design content needs to comply with the **BPMN2.0** specification | `String` |
| picture | thumbnail(base64)                                                           | `String` |
| createTime | -                                                                           | `Date`   |
| updateTime | -                                                                           | `Date` |
| tenantId | -                                                                           | `Date` |
| remarks | -                                                                           | `String`  |

## 3、Delete Model
`removeById(String id)`，Will not affect deployed models, running instances, and execution history

## 4、Pagination Query
`Page<EasyModel> queryPage(current, size, param)`

|     props      | description                                                       | type        | required |
|-----------------|-------------------------------------------------------------------|----------|-----|
| current         | -                                                                 | `int`    | `true`   |
| size            | -                                                                 | `int` | `true`   |
| param.modelType | The UI console provides [12 types](#Console provides model types) | `String` | `false`   |
| param.key       | -                                                                 | `String` | `false`   |
| param.name      | -(Like Query)                                                     | `String` | `false`   |

## Console provides model types
| label | value |
|-------|-------|
| 战略规划  | `0`   |
| 组织设计  | `1`   |
| 人力资源  | `2`   |
| 产品开发  | `3`   |
| 市场营销  | `4`   | 
| 销售服务  | `5`   |
| 财务管理  | `6`   |
| IT支持  | `7`   |
| 法律事务  | `8`   |
| 政务审批  | `9`   |
| 其他    | `10`  |
| 假勤    | `11`  |

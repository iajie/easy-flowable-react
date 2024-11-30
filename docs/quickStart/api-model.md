---
group:
    title: API
    order: 2
toc: content
title: 流程模型(Model)
order: 2
---
:::info{title=小提示}
流程模型对应接口：EasyModelService
flowable本身接口仍然可以使用，正常注入即可使用原生API
:::

## easy-flowable提供的接口

### 1、新增模型
`insert(model)`，新增后返回modelId， 新增参数model如下:
|     属性名      | 描述      | 类型        | 是否必须 |
|--------------|---------|-----------|-----|
| key | 模型标识（新增后不可修改） | `String`    | `true`   |
| name | 模型名称 | `String`  | `true`   |
| modelType | 模型类型, ui控制台默认提供[12种类型](#控制台提供模型类型) | `String`  | `true`   |
| remarks | 模型备注 | `String`  | `false`   |

### 2、修改模型/模型设计
`updateById(model)`，修改模型信息，控制台修改信息支持了模型缩略图

|     属性名      | 描述      | 类型        | 是否必须 |
|--------------|---------|-----------|-----|
| id | 模型标识 | `String`    | `true`   |
| name | 模型名称 | `String`  | `false`   |
| modelType | 模型类型, ui控制台默认提供[12种类型](#控制台提供模型类型) | `String`  | `false`   |
| modelEditorXml | 模型设计内容，**需要符合bpmn2.0规范** | `String`  | `false`   |
| picture | 流程缩略图(设计器会提供) | `String`  | `false`   |
| remarks | 模型备注 | `String`  | `false`   |

### 3、根据ID查询模型详情
#### 3.1、`getById(String id, boolean existsError)`
- id: 模型ID
- existsError: 模型为空时是否抛出异常
#### 3.2、`getByKey(String key)` 根据模型标识查询模型详情
返回信息：

|     属性名      | 描述                                 | 类型       |
|--------------|------------------------------------|----------|
| id | 模型ID                               | `String` |
| key | 模型标识                               | `String` |
| name | 模型名称                               | `String` |
| modelType | 模型类型, ui控制台默认提供[12种类型](#控制台提供模型类型) | `String` |
| modelEditorXml | 模型设计内容，**需要符合bpmn2.0规范**           | `String` |
| picture | 缩略图(base64)                        | `String` |
| createTime | 创建时间                               | `Date`   |
| updateTime | 更新时间                               | `Date` |
| tenantId | 租户id                               | `Date` |
| remarks | 模型备注                               | `String`  |

### 3、删除模型
`removeById(String id)`，不会影响已部署的模型，正在运行的实例和执行历史

### 4、分页查询
`Page<EasyModel> queryPage(current, size, param)`

| 属性名             | 描述                                 | 类型       | 是否必须 |
|-----------------|------------------------------------|----------|-----|
| current         | 页码                                 | `int`    | `true`   |
| size            | 页大小                                | `int` | `true`   |
| param.modelType | 模型类型, ui控制台默认提供[12种类型](#控制台提供模型类型) | `String` | `false`   |
| param.key       | 模型标识                               | `String` | `false`   |
| param.name      | 模型名称(模糊查询)                         | `String` | `false`   |

### 控制台提供模型类型
| 名称   | 值    |
|------|------|
| 战略规划 | `0`  |
| 组织设计 | `1`  |
| 人力资源 | `2`  |
| 产品开发 | `3`  |
| 市场营销 | `4`  | 
| 销售服务 | `5`  |
| 财务管理 | `6`  |
| IT支持 | `7`  |
| 法律事务 | `8`  |
| 政务审批 | `9`  |
| 其他   | `10` |
| 假勤   | `11` |

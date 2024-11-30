---
group:
    title: API
    order: 2
title: 流程部署(Deployment)
order: 3
---
:::info{title=小提示}
流程实例对应接口：EasyDeploymentService
flowable本身接口仍然可以使用，正常注入即可使用原生API
:::

## 1、流程部署
`deploymentModel(modelId)`通过模型id部署流程，返回部署ID

## 2、流程部署(定义)查询
`Page<DeploymentProcessDef> page(current, size, params)`

| 属性名             | 描述                                 | 类型       | 是否必须 |
|-----------------|------------------------------------|----------|-----|
| current         | 页码                                 | `int`    | `true`   |
| size            | 页大小                                | `int` | `true`   |
| param.modelType | 模型类型, ui控制台默认提供[12种类型](#控制台提供模型类型) | `String` | `false`   |
| param.key       | 模型标识                               | `String` | `false`   |
| param.name      | 模型名称(模糊查询)                         | `String` | `false`   |

返回参数：

|     属性名      | 描述                                               | 类型       |
|--------------|--------------------------------------------------|----------|
| id | 部署ID(deploymentId)                               | `String` |
| processDefinitionId | 流程定义ID                                           | `String` |
| name | 模型名称                                             | `String` |
| modelType | 模型类型, ui控制台默认提供[12种类型](./api-model.md#控制台提供模型类型) | `String` |
| key | 流程标识                                             | `String` |
| version | 部署版本                                             | `Integer`   |
| suspensionState | 流程定义状态(激活、终止)                                    | `boolean` |
| tenantId | 租户id                                             | `String` |
| deploymentTime | 部署时间                                             | `Date` |

## 3、设置流程状态
`deploymentState(processDefinitionId)` processDefinitionId: 流程定义ID 设置流程状态，如果激活就终止，如果终止就激活

## 4、获取用户任务列表
`getAllFlowUserTask(flowKey)` flowKey: 流程定义标识
返回参数：

|     属性名      | 描述     | 类型             |
|--------------|--------|----------------|
| id | 流程节点id | `String`       |
| name | 节点名称   | `String`       |
| key | 流程标识   | `String`       |
| assignee | 执行人    | `String`       |
| candidateUsers | 候选人列表  | `List<String>` |
| candidateGroups | 候选组列表  | `List<String>`      |
| flowCustomProps | 流程自定义属性   | `Map<String, Object>`         |

## 5、获取流程部署图片
`getFlowImage(processDefinitionId)` processDefinitionId: 流程定义ID

## 6、获取流程部署XML
`getFlowXml(processDefinitionId)` processDefinitionId: 流程定义ID

## 7、删除流程定义
`deleteDeployment(deploymentId, cascade)` 
- deploymentId：流程部署ID
- cascade: 是否级联删除，如果为true，会删除对应的流程定义和流程实例，以及活动的历史

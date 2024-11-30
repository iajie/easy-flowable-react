---
group:
    title: API
    order: 2
title: Deployment
order: 3
---
:::info{title=Quick Tips}
Deployment APIs：EasyDeploymentService
:::

## 1、Model Deployment
`deploymentModel(modelId)`：Deploy process through model ID and return deployment ID

## 2、Process deployment (definition) query
`Page<DeploymentProcessDef> page(current, size, params)`

|     props      | description                                                                           | type        | required |
|-----------------|---------------------------------------------------------------------------------------|----------|-----|
| current         | -                                                                                     | `int`    | `true`   |
| size            | -                                                                                     | `int` | `true`   |
| param.modelType | The UI console provides [12 types](./api-model.en-US.md#Console provides model types) | `String` | `false`   |
| param.key       | -                                                                                     | `String` | `false`   |
| param.name      | -(Like Query)                                                                         | `String` | `false`   |

return result：

|     props      | description                                                                           | type        |
|--------------|---------------------------------------------------------------------------------------|----------|
| id | deploymentId                                                                          | `String` |
| processDefinitionId | -                                                                                     | `String` |
| name | -                                                                                     | `String` |
| modelType | The UI console provides [12 types](./api-model.en-US.md#Console provides model types) | `String` |
| key | -                                                                                     | `String` |
| version | -                                                                                     | `Integer`   |
| suspensionState | Process definition status (activated, terminated)                                     | `boolean` |
| tenantId | -                                                                                     | `Date` |
| deploymentTime | -                                                                                     | `Date` |

## 3、Set deployment status
`deploymentState(processDefinitionId)`: Set process status, terminate if activated, activate if terminated

## 4、Get user task list
`getAllFlowUserTask(flowKey)`
return result：

|     props      | description | type        |
|--------------|-------------|----------------|
| name | node name   | `String`       |
| key | node key    | `String`       |
| assignee | -           | `String`       |
| candidateUsers | -           | `List<String>` |
| candidateGroups | -           | `List<String>`      |
| flowCustomProps | -           | `Map<String, Object>`         |

## 5、Obtain process deployment images
`getFlowImage(processDefinitionId)`

## 6、Get process deployment XML
`getFlowXml(processDefinitionId)`

## 7、Delete process definition
`deleteDeployment(deploymentId, cascade)`
- cascade: Whether to cascade delete. If true, the corresponding process definition, process instance, and activity history will be deleted

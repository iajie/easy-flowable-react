---
group:
    title: API
    order: 2
toc: content
title: Task
order: 4
---
:::info{title=Tips}
Task APIs：EasyTaskService
:::


## 1、执行任务
`executeNextStep(param)`**Execution params**

|     props      | description                                     | type        | required |
|-----------------|-------------------------------------------------|--------------------------|---------|
| taskId          | -                                               | `String`                 | `true`  |
| flowCommentType | -                                               | [FlowCommentType](#FlowCommentType) | `true`  |
| assignee        | -                                               | `String`                 | `false` |
| assigneeName    | -                                               | `String`                 | `false` |
| variables       | -                                               | `Map<String, Object>`    | `false` |
| assigneeName    | -                                               | `String`                 | `false` |
| attachmentId    | -                                               | `String`                 | `false` |
| userId          | Delegate/Transferor                             | `String`                 | `false` |
| commentContent  | Approval comments, if **resubmitted** and using form records, will be compared with the information submitted last time and submitted after comparing the differences | `Object`                 | `true`  |
| comment         | Record approval comments, default to true                                 | `boolean`                 | `false` |
| commentId       | Approval Opinion ID, which can be used to delete the corresponding approval opinion                          | `String`                 | `false` |

## 2、Get task object
`getFlowTask(taskId, exception)`
- exception：Whether to throw an exception when the task is null

## 3、Retrieve the executor of the current task node
`getUserTaskExecutors(taskId, isMainer)`
- taskId：任务ID
- isMainer: True does not include candidates, false includes candidates

## 4、Obtain the candidate group for the current task node
`getUserTaskOrganIds(taskId)`

## 5、Process invalidation
`cancellationProcessInstance(...params)`： It can be in bulk

|     props      | description | type        | required |
|--------------------|-------------|------------|---------|
| taskId             | -           | `String`   | `true`  |
| processInstanceId  | -           | `String`   | `true`  |
| assignee           | -           | `String`   | `true`  |
| assigneeName       | -           | `String`   | `true`  |
| cancellationCause  | -           | `String`   | `true`  |

## 6、Retrieve the KEY of the previous user task node based on the task ID
`getUpNodeKey(taskId)`

## 7、流程变量预测
`nextNodeVariables(taskId)`:Obtain the process variables of the next node and the extension parameters of the current node based on the task node

| 属性名               | 描述                                                                                              | 类型         |
|-------------------|-------------------------------------------------------------------------------------------------|------------|
| attributes        | Process node expansion parameters(actions：User Approval Operations for Easy Flowable Expansion) | `Map<String, Object>`   |
| sequenceFlow | Process variable list (gateway direction, next task skip expression)                            | `String`   |

### FlowCommentType
> enum

| NAME           | description                                                                                             | value |
|----------------|---------------------------------------------------------------------------------------------------------|-------|
| START          | Enter the next node normally                                                                            | `0`   |
| AGREE          | Enter the next node normally                                                                            | `1`   |
| REBUT          | Return to the process initiation node                                                                   | `2`   |
| REVOCATION     | Return to the process initiation node                                                                   | `3`   |
| REJECT         | Return to the previous node                                                                             | `4`   |
| REJECT_TO_TASK | Return to the designated node                                                                           | `5`   |
| DELEGATE       | Delegate (assign tasks to others for execution, return to oneself after completion)                     | `6`   |
| ASSIGN         | Transfer the task to the candidate group for completion (handled by other departments/positions/roles)` | `7`   |
| STOP           | Delete the current task instance                                                                        | `8`   |
| BEFORE_SIGN    | Add one person for approval before the executor                                                         | `9`   |
| AFTER_SIGN     | Add one person for approval after the executor                                                          | `10`  |
| CANCELLATION   | -                                                                                                       | `11`  |
| ADD_COMMENT    | Only commenting on the current task, without understanding the operational process                      | `12`  |
| DEL_COMMENT    | Not proficient in operating procedures                                                                  | `13`  |
| RESUBMIT       | Return to the hands of the rejecter                                                                     | `14`  |

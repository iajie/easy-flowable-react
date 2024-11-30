---
group:
    title: API
    order: 2
toc: content
title: 流程任务(Task)
order: 4
---
:::info{title=小提示}
流程任务对应接口：EasyTaskService。
flowable本身接口仍然可以使用，正常注入即可使用原生API
:::

## 1、执行任务
`executeNextStep(param)`**执行参数**

| 属性名             | 描述                                              | 类型                       | 是否必须    |
|-----------------|-------------------------------------------------|--------------------------|---------|
| taskId          | 任务id                                            | `String`                 | `true`  |
| flowCommentType | 审批类型                                            | [FlowCommentType](#审批类型) | `true`  |
| assignee        | 审批人                                             | `String`                 | `false` |
| assigneeName    | 审批人姓名                                           | `String`                 | `false` |
| variables       | 流程变量                                            | `Map<String, Object>`    | `false` |
| assigneeName    | 审批人姓名                                           | `String`                 | `false` |
| attachmentId    | 附件ID                                            | `String`                 | `false` |
| userId          | 委派/转办人ID                                        | `String`                 | `false` |
| commentContent  | 审批意见, 如果是**重新提交**，且使用了表单记录，那么会对比上次提交的信息，比对差异后提交 | `Object`                 | `true`  |
| comment         | 是否记录审批意见，默认true                                 | `boolean`                 | `false` |
| commentId       | 审批意见ID，可通过该ID删除对应的审批意见                          | `String`                 | `false` |

## 2、获取任务对象
`getFlowTask(taskId, exception)`
- taskId：任务ID
- exception：任务为null时是否抛出异常

## 3、获取当前任务节点执行人
`getUserTaskExecutors(taskId, isMainer)`
- taskId：任务ID
- isMainer: true不包含候选人，false包含候选人

## 4、获取当前任务节点候选组
`getUserTaskOrganIds(taskId)`

## 5、流程作废
`cancellationProcessInstance(...params)`： 可以是批量的

| 属性名                | 描述     | 类型         | 是否必须    |
|--------------------|--------|------------|---------|
| taskId             | 任务id   | `String`   | `true`  |
| processInstanceId  | 流程实例ID | `String`   | `true`  |
| assignee           | 操作人    | `String`   | `true`  |
| assigneeName       | 操作人姓名  | `String`   | `true`  |
| cancellationCause  | 作废原因   | `String`   | `true`  |
 
## 6、根据任务ID获取上一个用户任务节点KEY
`getUpNodeKey(taskId)`: 获取上一任务节点id

## 7、流程变量预测
`nextNodeVariables(taskId)`:根据任务节点获取下一节点的流程变量和当前节点的拓展参数

| 属性名               | 描述                                       | 类型         |
|-------------------|------------------------------------------|------------|
| attributes        | 流程节点拓展参数(actions：easy-flowable拓展的用户审批操作) | `Map<String, Object>`   |
| sequenceFlow | 流程变量列表(网关走向、下下个任务跳过表达式)                  | `String`   |

### 审批类型
> 枚举值

| 枚举名称           | 描述                              | 值  |
|----------------|---------------------------------|----|
| START          | 启动流程(正常进入下一节点)                  | `0` |
| AGREE          | 同意(正常进入下一节点)                    | `1` |
| REBUT          | 拒绝(回到流程发起节点)                    | `2` |
| REVOCATION     | REVOCATION(回到流程发起节点)            | `3` |
| REJECT         | 驳回(回到 上一节点)                     | `4` |
| REJECT_TO_TASK | 驳回到指定节点                         | `5` |
| DELEGATE       | 委派(任务交给别人执行，执行完成后回到自己手上)        | `6` |
| ASSIGN         | 转办`[将任务转交给候选组完成(其他部门/岗位/角色处理)]` | `7` |
| STOP           | 终止(删除当前任务实例)                    | `8` |
| BEFORE_SIGN    | 前加签(在执行人之前增加一个人审批)              | `9` |
| AFTER_SIGN     | 后加签(在执行人之后增加一个人审批)              | `10` |
| CANCELLATION   | 作废                              | `11` |
| ADD_COMMENT    | 添加评论（只对当前任务评论，不会操作流程）           | `12` |
| DEL_COMMENT    | 删除评论(不会操作流程)                          | `13` |
| RESUBMIT       | 重新提交(回到驳回人手里)                   | `14` |

---
sidebar: false
toc: content
token:
    contentMaxWidth: 1480
nav:
    title: 更新日志
    order: 5
---

## 开发计划
- 租户支持
- 组件多实例支持
- 邮件服务-抄送..
- 待办通知
- 加签、加前签、加后签

## V1.0.1 2024-11-30

### ✨ 初始化功能
1. 常规流程办理
2. 自定义可视化控制台
3. 适配SpringBoot2和Solon
<details>
<summary><kbd>4. 模型操作API(EasyModelService流程模型接口)</kbd></summary>

4.1、**insert(EasyModel model)** 新增模型
```json
{ 
    "key": "模型标识", 
    "name": "模型名称",
    "modelType": "模型类型",
    "remarks": "备注"
}
```

4.2、**updateById(EasyModel model)** 模型编辑(设计)，如果开始设计那么需要传递bpmn2.0规范的xml数据
```json
{
    "id": "模型新增后返回的ID", // 必填
    "name": "模型名称", 
    "remarks": "备注", // 模型备注
    "modelType": "模型类型", // 类型自定义，系统中会自定义11个类型
    "modelEditorXml": "bpmn2.0规范的xml字符串", // 设计器获取资源
    "picture": "缩略图" // 非必填
}
```

4.3、**getById(String id, boolean existsError)** 根据ID查询模型详情
> id：模型ID，existsError没有模型是否抛出异常

4.4、**getByKey(String key)** 根据模型标识获取模型详情

4.5、**removeById(String id)** 根据ID删除模型，不会影响正在运行的实例

4.6、**queryPage(int current, int size, EasyModel model)** 分页查询
model
```json
{
    "modelType": "模型类型",
    "key": "模型标识",
    "name": "模型名称", // 模糊查询
}
```

</details>

<details>
<summary><kbd>5. 模型部署(定义EasyDeploymentService模型部署接口)API</kbd></summary>

5.1、**String deploymentModel(String modelId)** 模型部署

5.2、**page(int current, int size, DeploymentProcessDef params)** 模型定义分页查询
params
```json
{
    "modelType": "模型类型",
    "key": "模型标识",
    "name": "模型名称", // 模糊查询
}
```

5.3、**deleteDeployment(String deploymentId, Boolean cascade)** 删除部署信息，是否级联删除

5.4、**deploymentState(String processDefinitionId)** 设置流程定义状态(挂起、激活)

5.6、**getAllFlowUserTask(String flowKey)** 获取部署模型所有用户审批节点

5.7、**InputStream getFlowImage(String processDefinitionId)** 获取流程部署的图片资源

5.8、**String getFlowXml(String processDefinitionId)** 获取流程部署的xml资源

</details>

<details>
<summary><kbd>6. 流程实例API(EasyProcessInstanceService流程实例接口)</kbd></summary>

6.1、**getFlowInstanceList(String key, boolean isFlow, boolean isProcessDef)** 根据流程标识获取所有运行中的流程实例
- key 流程标识/流程主键
- isFlow 是否为流程主键
- isProcessDef 是否为流程定义

6.2、**startProcessInstanceByKey(FlowStartParam param)** 启动流程
> 当传递流程标识时，启动的实例为最新部署的模型，传递流程定义ID可以指定要启动的模型，二者二选一，必须传递其中一个
```json
{
    "flowKey": "流程标识",
    "processDefinitionId": "流程定义ID",
    "businessKey": "业务主键",
    "startUserId": "流程发起人ID",
    "startUsername": "流程发起人姓名",
    "variables": "流程变量", // 全局变量，会伴随流程结束(流程发起人...)
    "skipFirstNode": true, // 是否跳过第一(开始)节点 当你的流程模型设计开始节点为触发启动节点时，则需要跳过开始节点进入提交资料的节点
    "processName": "流程名称", // 必填
    "startFormData": "是否为表单流程",
    "formData": "表单信息", // 为JSON字符串/由@EasyItem注解的属性-后续会使用到
}
```

6.3、**updateProcessInstanceBusinessStatus(String processInstanceId, String status)** 更新流程实例中业务的状态

6.4、**getFlowBackUserTasks(String processInstanceId)** 执行流程可回退的用户任务节点

6.5、**getFlowExecutionHistoryList(String processInstanceId)** 获取流程执行历史记录

6.6、**updateProcessInstanceState(String processInstanceId)** 修改实例状态

6.7、**String getUpNodeKey(String processInstanceId)** 根据流程实例ID获取上一个用户任务节点KEY

6.8、**Map<String, Object> processDynamics(String processInstanceId, String processDefinitionId)** 流程动态
返回结果
```json
{
    "data": "xml",
    "activeNode": [], // 当前执行的节点
    "executeNode": [], // 已执行完成的节点
}
```

6.9、**Map<String, Object> nodeInfo(String nodeId)** 获取节点信息
```json
{
    "startTime": "任务开始时间",
    "endTime": "任务结束时间",
    "duration": "任务耗时",
    "users": [] // 任务执行用户信息
}
```

6.10、**Map<String, Object> statics()** 统计
```json
{
    "todo": "待办数量",
    "done": "已办数量",
    "meTodo": "我的待办",
    "meDone": "我的已办"
}
```

6.11、**todoTasks(String keywords, int current, int size, Boolean finished, boolean isMe)** 任务查询
> finished是否已办，isMe是否我的任务

</details>

<details>
<summary><kbd>7. 流程任务API(EasyTaskService流程任务接口)</kbd></summary>

7.1、**executeNextStep(FlowExecuteParam executeParam)** 执行任务
```json
{
    "taskId": "任务ID",
    "flowCommentType": "审批类型", // 可通过设计器拓展获取
    "assignee": "任务办理人",
    "assigneeName": "任务办理人姓名",
    "userId": "任务处理人", // 在转办和委派中使用
    "variables": {}, // 流程变量，在网关出决定流程走向/任务完成跳过条件
    "rejectToTaskId": "回退任务ID", // 当驳回指定节点时用到
    "commentContent": "审批意见"
}
```

7.2、**addComment(FlowComment flowComment)** 添加审批意见
```json
{
    "processInstanceId": "流程实例ID",
    "taskId": "流程任务ID",
    "flowCommentType": "意见类型",
    "assignee": "操作人",
    "commentContent": "审批意见",
    "ext": "拓展信息"
}
```

7.3、**Task getFlowTask(String taskId, boolean exception)** 获取任务对象

7.4、**List<String> getUserTaskExecutorList(String taskId, boolean isMainer, boolean isGroup)** 获取任务执行人
- taskId任务ID
- isMainer true为节点执行 false获取执行和候选人
- isGroup true为候选组，false候选人

7.5、**cancellationProcessInstance(cancellations)** 流程作废(批量)
```json
[{
    "assignee": "执行人",
    "assigneeName": "执行人名称",
    "taskId": "任务ID",
    "processInstanceId": "流程实例ID",
    "cancellationCause": "流程作废原因"
}]
```

7.6、**String getUpNodeKey(String taskId)** 根据任务ID获取上一个用户任务节点KEY

7.7、**Map<String, Object> nextNodeVariables(String taskId)** 流程变量预测
> 根据任务节点获取下一节点的流程变量和当前节点的拓展参数

</details>

<details>
<summary><kbd>8. 拓展API：自定义用户体系、配置化是否登陆(EasyUserService自定义用户体系接口)</kbd></summary>

8.1、**EasyFlowableUser getCurrentUser(Object userId)** 获取当前用户
> userId为ui控制台登录时的ID，如果前后端分离 没有使用控制台，那么可以自定义返回用户信息
> 用户信息如下
```json
{
    "userId": "用户ID",
    "username": "用户名称",
    "avatar": "用户头像", // 非必须
    "email": "用户邮箱", // 非必须
    "originId": "所属部门", // 非必须
}
```

8.2、**Object login(String username, String password)** 控制台自定义登录逻辑返回userId，通过easy-flowable.ui.is-login:true开启，默认没有开启

8.3、**List users()** 自定义用户列表获取，控制台可通过该列表拉取

8.4、**List groups()** 自定义用户组

</details>

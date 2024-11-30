/**
 * @Date: 2024-10-4 13:22:27
 * @Description: 中文翻译插件
 * @Author: MoJie
 */
const zhConfigs = {
    // 左侧工具栏
    'Activate hand tool': '激活抓手工具',
    'Activate lasso tool': '激活套索工具',
    'Activate global connect tool': '全局节点连接工具',
    'Activate create/remove space tool': '激活创建/删除空间工具',
    'Create start event': '创建开始事件',
    'Create end event': '创建结束事件',
    'Create gateway': '创建网关',
    'Create expanded sub-process': '创建可折叠子流程',
    'Create intermediate/boundary event': '创建中间抛出/边界事件',
    'Create pool/participant': '创建池/参与者',
    'Create task': '创建任务',
    'Create data object reference': '创建数据对象引用',
    'Create data store reference': '创建数据存储引用',
    'Create group': '创建组',

    // 点击提示栏
    'Append end event': '追加结束事件',
    'Append gateway': '追加网关',
    'Append task': '追加任务',
    'Append mail task': '追加邮件任务',
    'Add text annotation': '文本注释',
    'Connect to other element': '连接其他节点',
    'Change element': '切换节点',
    'Append intermediate/boundary event': '追加中间/边界事件',
    'Delete': '删除节点',

    // 提示栏具体信息-多实例
    'Parallel multi-instance': '并行多实例',
    'Sequential multi-instance': '串行多实例',
    'Loop': '循环',

    // 任务
    'Task': '任务',
    'Send task': '发送任务',
    'Mail task': '邮件任务',
    'Receive task': '接收任务',
    'User task': '用户任务',
    'Manual task': '手动任务',
    'Business rule task': '业务规则任务',
    'Service task': '服务任务',
    'Script task': '脚本任务',
    'Call activity': '引用流程',
    'Sub-process (collapsed)': '可折叠子流程',
    'Sub-process (expanded)': '可展开子流程',

    // 事件-开始
    'Intermediate throw event': '中间抛出事件',
    'End event': '结束事件',
    'Message start event': '消息启动事件',
    'Timer start event': '定时启动事件',
    'Conditional start event': '条件启动事件',
    'Signal start event': '信号启动事件',
    'Start event': '开始事件',
    // 事件-结束
    'Message end event': '结束消息事件',
    'Escalation end event': '结束升级事件',
    'Error end event': '结束错误事件',
    'Compensation end event': '结束补偿事件',
    'Signal end event': '结束信号事件',
    'Terminate end event': '终止边界事件',

    // 事件-中间抛出
    'Message intermediate catch event': '中间消息捕获事件',
    'Message intermediate throw event': '中间消息抛出事件',
    'Timer intermediate catch event': '中间定时捕获事件',
    'Escalation intermediate throw event': '中间升级抛出事件',
    'Conditional intermediate catch event': '中间条件捕获事件',
    'Link intermediate catch event': '中间链接捕获事件',
    'Link intermediate throw event': '中间链接抛出事件',
    'Compensation intermediate throw event': '中间补偿抛出事件',
    'Signal intermediate catch event': '中间信号捕获事件',
    'Signal intermediate throw event': '中间信号抛出事件',

    // 网关
    'Exclusive gateway': '串行网关',
    'Parallel gateway': '并行网关',
    'Inclusive gateway': '包容网关',
    'Complex gateway': '复杂网关',
    'Event-based gateway': '事件网关',

    // 事件网关后
    'Append receive task': '追加接收任务',
    'Append message intermediate catch event': '追加中间消息捕获事件',
    'Append timer intermediate catch event': '追加中间定时捕获事件',
    'Append conditional intermediate catch event': '追加中间条件捕获事件',
    'Append signal intermediate catch event': '追加中间信号捕获事件',

    // 数据源
    'Data store reference': '数据存储参考',
    'Data object reference': '数据对象参考',

    // 文本
    'Connect using association': '文本关联',
    'Connect using data input association': '连接到需要数据源的地方',

} as any;


const customTranslate = (template: string, replacements: any) => {
    replacements = replacements || {};
    // Translate
    template = zhConfigs[template] || template;
    // Replace
    return template.replace(/{([^}]+)}/g, function (_, key) {
        return replacements[key] || '{' + key + '}';
    });
}

export const zhTranslateModule = {
    translate: ['value', customTranslate]
};

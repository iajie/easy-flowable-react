/**
 * @Date: 2024-09-30 13:27
 * @Description: 侧边属性栏
 * @Author: MoJie
 */
import { Alert, Drawer, Form, Input, InputNumber, Popover, Radio, Select, Switch, Typography } from "antd";
import React from "react";
import { userType, defaultType, defaultUser, Option, MultiInstancesProperties, serviceType, scriptType } from "../props/userTask";
import { PanelProps, Element, BusinessObjectType, nodeType, ELValidtor, multiInstancesType, elEncoder, elDecoder, spELValidtor } from "../props/panel";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
type EventBus = import('diagram-js/lib/core/EventBus').default;
type Modeling = import('bpmn-js/lib/features/modeling/Modeling').default;
type BpmnFactory = import('bpmn-js/lib/features/modeling/BpmnFactory').default;

const { TextArea } = Input;
const { Paragraph } = Typography;

const PropertiesPanel: React.FC<PanelProps> = ({ modeler, defaultElement, style = { opacity: 0.7 }, attrPrefix = "flowable:", ...props }) => {

	const modeling: Modeling = modeler.get('modeling');

	const [form] = Form.useForm();
    const [bpmnData, setBpmnData] = React.useState<any>();
	const ignoreElementChanged = React.useRef(false);
	const [open, setOpen] = React.useState<boolean>(false);
	const nodeRef = React.useRef<BusinessObjectType>();
	const [currentElement, setCurrentElement] = React.useState<Element>(defaultElement);

	/**                        用户任务属性                                    **/
	const [taskType, setTaskType] = React.useState<string>();
	const [users, setUsers] = React.useState<Option[]>([]);
	const [usersLoading, setUsersLoading] = React.useState(false);
	const [groups, setGroups] = React.useState<Option[]>([]);
	const [groupsLoading, setGroupsLoading] = React.useState(false);
	/** 多实例属性 */
	const [multiInstances, setMultiInstances] = React.useState<MultiInstancesProperties>({
		text: '',
		show: false,
		isLoop: false,
	});

	const [script, setScript] = React.useState<string>('');
	/**                        用户任务属性                                    **/

	const changeCurrentElement = (element: Element) => {
		// 获取元素节点信息
		const node = element.businessObject;
		// 赋值当前节点
		nodeRef.current = node;
		const type = nodeType(node);
		// 弹出框--备注不需要属性设置
		if (type !== 'Association' && type !== 'TextAnnotation') {
			// 节点下多余属性
			const attrs = node.$attrs;
			const flowable: any = {};
			for (const key in attrs) {
				if (Object.prototype.hasOwnProperty.call(attrs, key)) {
					if (key.startsWith(attrPrefix)) {
						// 获取表单key
						const keyProps = key.substring(attrPrefix?.length);
						flowable[keyProps] = attrs[key];
					} else {
						flowable[key] = attrs[key];
					}
				}
			}
			if (node?.conditionExpression && node.conditionExpression?.body) {
				node.conditionExpression.body = elDecoder(node.conditionExpression.body);
			}
			// 多实例
			const loop = node.loopCharacteristics && node.loopCharacteristics.$attrs;
			if (loop) {
				flowable.loopCharacteristics = {
					collection: loop[`${attrPrefix}collection`],
					elementVariable: loop[`${attrPrefix}elementVariable`],
				}
			}
			if (node.script) {
				setScript(node.script);
			}

            // begin author: MoJie Date: 2024-10-27 16:37:11 for: 解决候选用户和候选组回显问题
            if (flowable.candidateUsers && !Array.isArray(flowable.candidateUsers)) {
                flowable.candidateUsers = flowable.candidateUsers.split(',');
            }
            if (flowable.candidateGroups && !Array.isArray(flowable.candidateGroups)) {
                flowable.candidateGroups = flowable.candidateGroups.split(',');
            }
            // end author: MoJie Date: 2024-10-27 16:38:05

            form.resetFields();
			form.setFieldsValue({ ...node, ...flowable });
			if (type.endsWith('Task')) {
				setTaskType(defaultType(node, attrPrefix));
			}
			//多实例，注意：StandardLoopCharacteristics 是循环实例
			if (node.loopCharacteristics) {
				setMultiInstances({
					text: multiInstancesType(node.loopCharacteristics),
					show: true,
					isLoop: nodeType(node.loopCharacteristics) === 'StandardLoopCharacteristics'
				});
			} else {
				setMultiInstances({ show: false });
			}
			setOpen(true);
		} else {
			setOpen(false);
		}
        // 设置当前选择元素
        setCurrentElement(element);
	}

	/**
	 * 画布实例监听器
	 */
	React.useEffect(() => {
		const eventBus: EventBus = modeler.get('eventBus');
		// 点击画布监听
		const clickListener = (e: { element: Element }) => {
			changeCurrentElement(e.element);
		}
		// 加载后绑定监听
		eventBus.on('element.click', clickListener)
		// 节点监听
		const changedListener = (e: { element: Element }) => {
			if (!ignoreElementChanged.current) {
				//忽略顺序流的修改
				if (e.element.businessObject?.$type.endsWith("SequenceFlow")) {
					return;
				}
				changeCurrentElement(e.element);
			}
		}
		eventBus.on('element.changed', changedListener);
		return () => {
			eventBus.off('element.click', clickListener);
			eventBus.off('element.changed', changedListener);
		}
	}, [modeler]);

	const onValuesChange = (changeValue: Partial<BusinessObjectType>) => {
		if (changeValue.id) {
			updateElementProperty('id', changeValue.id);
		}
		if (changeValue.name) {
			updateElementProperty('name', changeValue.name);
		}
		if (changeValue.description) {
			updateElementProperty(attrPrefix + 'description', changeValue.description);
		}
		if (changeValue.author) {
			updateElementProperty('author', changeValue.author);
		}
		if (changeValue.color) {
			modeling.setColor([currentElement], { stroke: changeValue?.color.toHexString() });
			updateElementProperty('color', changeValue?.color.toHexString());
		}
		// 条件
		const conditionExpression = changeValue.conditionExpression?.body;
		if (conditionExpression && spELValidtor(conditionExpression)) {
			const bpmnFactory: BpmnFactory = modeler.get("bpmnFactory");
			const expression = bpmnFactory.create("bpmn:FormalExpression")
			expression.body = elEncoder(conditionExpression);
			updateElementProperty("conditionExpression", expression);
		}
		// 用户
		if (changeValue.assignee) {
			updateElementProperty(attrPrefix + "assignee", changeValue.assignee);
		}
		// 候选用户
		if (changeValue.candidateUsers) {
			updateElementProperty(attrPrefix + "candidateUsers", changeValue.candidateUsers);
		}
		// 候选组
		if (changeValue.candidateGroups) {
			updateElementProperty(attrPrefix + "candidateGroups", changeValue.candidateGroups);
		}
		// 完成表达式
		const completionCondition = changeValue.loopCharacteristics?.completionCondition?.body;
		if (completionCondition && spELValidtor(completionCondition)) {
			const bpmnFactory: BpmnFactory = modeler.get("bpmnFactory");
			const expression = bpmnFactory.create("bpmn:Expression");
			expression.body = completionCondition;
			const loopCharacteristics = nodeRef.current?.loopCharacteristics;
			if (loopCharacteristics) {
				expression.$parent = loopCharacteristics;
				loopCharacteristics.completionCondition = expression;
			}
			updateElementProperty("loopCharacteristics", loopCharacteristics);
		}
		// 集合
		if (changeValue.loopCharacteristics?.collection) {
			const loopCharacteristics = nodeRef.current?.loopCharacteristics;
			if (loopCharacteristics) {
				loopCharacteristics.$attrs[`${attrPrefix}collection`] = changeValue.loopCharacteristics.collection;
				if (!changeValue.loopCharacteristics?.elementVariable) {
					loopCharacteristics.$attrs[`${attrPrefix}elementVariable`] = 'item';
				}
			}
			updateElementProperty("loopCharacteristics", loopCharacteristics);
		}
		// 集合元素
		if (changeValue.loopCharacteristics?.elementVariable) {
			const loopCharacteristics = nodeRef.current?.loopCharacteristics;
			if (loopCharacteristics) {
				loopCharacteristics.$attrs[`${attrPrefix}elementVariable`] = changeValue.loopCharacteristics.collection;
			}
			updateElementProperty("loopCharacteristics", loopCharacteristics);
		}
		// 循环次数指定
		if (changeValue.loopCharacteristics?.loopMaximun) {
			const loopCharacteristics = nodeRef.current?.loopCharacteristics;
			if (loopCharacteristics) {
				loopCharacteristics.$attrs[`${attrPrefix}loopMaximun`] = changeValue.loopCharacteristics.loopMaximun;
			}
			updateElementProperty("loopCharacteristics", loopCharacteristics);
		}
		// 服务类
		if (changeValue.class) {
			updateElementProperty(attrPrefix + "class", changeValue.class);
		}
		// 委托表达式
		const delegateExpression = changeValue.delegateExpression;
		if (delegateExpression && spELValidtor(delegateExpression)) {
			updateElementProperty(attrPrefix + "delegateExpression", delegateExpression);
		}
		// 服务表达式
		const expression = changeValue.expression;
		if (expression && spELValidtor(expression)) {
			updateElementProperty(attrPrefix + "expression", expression);
		}
		// 表达式返回结果
		if (changeValue.resultVariable) {
			updateElementProperty(attrPrefix + "resultVariable", changeValue.resultVariable);
		}
		// 脚本类型
		if (changeValue.scriptFormat) {
			updateElementProperty("scriptFormat", changeValue.scriptFormat);
		}
		// 是否保存脚本结果
		if (changeValue.autoStoreVariables === false) {
			updateElementProperty(attrPrefix + "autoStoreVariables", "false");
		}
		if (changeValue.autoStoreVariables === true) {
			updateElementProperty(attrPrefix + "autoStoreVariables", "true");
		}
		// 脚本结果接收参数
		if (changeValue.resultVariable) {
			updateElementProperty(attrPrefix + "resultVariable", changeValue.resultVariable);
		}
	}

	React.useEffect(() => {
		if (script) {
			updateElementProperty("script", script);
		}
	}, [script]);

	/**
	 * 元素属性赋值
	 * @param property 属性名称
	 * @param value 属性值
	 * @param forBusinessObjectAttrs 是否为$attrs属性
	 */
	const updateElementProperty = (property: string, value: any, forBusinessObjectAttrs: boolean = false) => {
		if (nodeRef.current && currentElement) {
			try {
				ignoreElementChanged.current = true;
				if (forBusinessObjectAttrs) {
					currentElement.businessObject.$attrs[attrPrefix + property] = value;
				} else {
                    if (nodeType(currentElement.businessObject) == 'Process') {
                        setBpmnData({ ...bpmnData, [property]: value });
                        // 返回信息
                        props.bpmnInfo({ ...bpmnData, [property]: value });
                    }
					if (property.endsWith('assignee')) {
						delete currentElement.businessObject.$attrs[`${attrPrefix}candidateUsers`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}candidateGroups`];
					} else if (property.endsWith('candidateUsers')) {
						delete currentElement.businessObject.$attrs[`${attrPrefix}assignee`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}candidateGroups`];
					} else if (property.endsWith('candidateGroups')) {
						delete currentElement.businessObject.$attrs[`${attrPrefix}assignee`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}candidateUsers`];
					} else if (property.endsWith('class')) {
						delete currentElement.businessObject.$attrs[`${attrPrefix}delegateExpression`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}expression`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}resultVariable`];
					} else if (property.endsWith('delegateExpression')) {
						delete currentElement.businessObject.$attrs[`${attrPrefix}class`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}expression`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}resultVariable`];
					} else if (property.endsWith('expression')) {
						delete currentElement.businessObject.$attrs[`${attrPrefix}class`];
						delete currentElement.businessObject.$attrs[`${attrPrefix}delegateExpression`];
					}
					modeling.updateProperties(currentElement, { [property]: value });
				}
			} finally {
				ignoreElementChanged.current = false;
			}
		}
	}

	React.useEffect(() => {
		if (props.users) {
			// 如果是数组
			if (props.users instanceof Array) {
				setUsers(defaultUser.concat(props.users));
			} else if (typeof props.users() === 'object' && typeof props.users().then === 'function') {
				setUsersLoading(true);
				props.users().then((res) => {
					setUsersLoading(false);
					if (res && res.length) {
						setUsers(defaultUser.concat(res));
					} else {
						setUsers(defaultUser);
					}
				});
			} else {
				setUsers(defaultUser);
			}
		} else {
			setUsers(defaultUser);
		}
	}, []);

	React.useEffect(() => {
		if (props.groups) {
			// 如果是数组
			if (props.groups instanceof Array) {
				setGroups(props.groups);
			} else if (typeof props.groups() === 'object' && typeof props.groups().then === 'function') {
				setGroupsLoading(true);
				props.groups().then((res) => {
					setGroupsLoading(false);
					if (res && res.length) {
						setGroups(res);
					}
				});
			}
		}
	}, []);

	return <Drawer
		style={style}
		width={props.width}
		open={open}
		mask={false}
		destroyOnClose
		maskClosable={false}
		getContainer={false}
		onClose={() => setOpen(false)}
		title={<Alert message={`当前对象: ${nodeType(nodeRef.current)}`} />}>
		<Form onValuesChange={onValuesChange} form={form} labelCol={{ span: 5 }}>
			<Form.Item label="标识" name="id">
				<Input readOnly />
			</Form.Item>
			<Form.Item label="名称" name="name">
				<Input />
			</Form.Item>
            {nodeType(nodeRef.current) === 'Process' && <Form.Item label="作者" name="author">
                <Input />
            </Form.Item>}
			{nodeType(nodeRef.current) === 'SequenceFlow' && <Form.Item
				label="表达式" name={['conditionExpression', 'body']} tooltip="条件表达式为EL表达式，结果需为true/false"
				rules={[{ validator: (_, value) => ELValidtor(value) }]}>
				<TextArea />
			</Form.Item>}
			{(nodeType(nodeRef.current) === 'UserTask' && !multiInstances.show) && <Form.Item label="分配用户">
				<Form.Item>
					<Radio.Group defaultValue={taskType} onChange={(e) => {
						const value = e.target.value;
						setTaskType(value);
						if (value == 'candidateGroups') {
							form.setFieldValue('candidateUsers', []);
							form.setFieldValue('assignee', null);
						} else if (value == 'candidateUsers') {
							form.setFieldValue('candidateGroups', []);
							form.setFieldValue('assignee', null);
						} else {
							form.setFieldValue('candidateGroups', []);
							form.setFieldValue('candidateUsers', []);
						}
					}} options={userType} />
				</Form.Item>
				<Form.Item name={taskType} noStyle>
					{taskType == 'candidateGroups' ?
						<Select options={groups} mode="multiple" loading={groupsLoading} /> : <Select
							mode={taskType === 'candidateUsers' ? "multiple" : undefined}
							options={taskType === 'candidateUsers' ? users.slice(1) : users}
							loading={usersLoading} />}
				</Form.Item>
			</Form.Item>}
			{(nodeType(nodeRef.current) === 'UserTask' && multiInstances.show) && <>
				<Form.Item><Alert message={`实例类型：${multiInstances.text}`} /></Form.Item>
				{multiInstances.isLoop ? <>
					<Form.Item label="分配用户" name="candidateUsers">
						<Select options={users.slice(1)} mode="multiple" loading={usersLoading} />
					</Form.Item>
					<Form.Item label="循环次数" name={['loopCharacteristics', 'loopMaximun']}>
						<InputNumber min={2} style={{ width: '100%' }} />
					</Form.Item>
				</> : <>
					<Form.Item label="集合" name={['loopCharacteristics', 'collection']} tooltip="此处集合为执行人列表，需要在流程启用或运行时设置流程变量。">
						<Input />
					</Form.Item>
					<Form.Item label="变量名" name={['loopCharacteristics', 'elementVariable']} tooltip="集合中的元素的变量名。">
						<Input />
					</Form.Item>
					<Form.Item label={<Popover placement="topRight" title="完成表达式" content={<div style={{ width: '330px' }}>
						评估是否结束多实例的表达式, 如果表达式结果为true, 则多实例中所有剩余的实例将被销毁, 并且多实例活动结束, 流程离开当前活动继续执行。<br />
						以下是一些<strong>完成表达式</strong>变量：
						<Paragraph copyable={{ text: 'nrOfInstances', tooltips: false }}>实例总数: nrOfInstances</Paragraph>
						<Paragraph copyable={{ text: 'nrOfCompletedInstances', tooltips: false }}>当前还没有完成的实例: nrOfCompletedInstances</Paragraph>
						<Paragraph copyable={{ text: 'loopCounter', tooltips: false }}>已经循环的次数: loopCounter</Paragraph>
						<Paragraph copyable={{ text: 'loonrOfActiveInstancespCounter', tooltips: false }}>已经完成的实例个数: nrOfActiveInstances</Paragraph>
					</div>}>
						表达式 <QuestionCircleOutlined />
					</Popover>} name={['loopCharacteristics', 'completionCondition', 'body']}
						rules={[{ validator: (_, value) => ELValidtor(value) }]}>
						<TextArea />
					</Form.Item>
				</>}
			</>}
			{(nodeType(nodeRef.current) === 'ServiceTask' && !multiInstances.show) && <Form.Item label="服务类型">
				<Form.Item>
					<Radio.Group defaultValue={taskType} onChange={(e) => {
						const value = e.target.value;
						setTaskType(value);
						if (value == 'delegateExpression') {
							form.setFieldValue('class', null);
							form.setFieldValue('expression', null);
						} else if (value == 'expression') {
							form.setFieldValue('delegateExpression', null);
							form.setFieldValue('class', null);
						} else {
							form.setFieldValue('delegateExpression', null);
							form.setFieldValue('expression', null);
						}
					}} options={serviceType} />
				</Form.Item>
				<Form.Item noStyle>
					<Form.Item name={taskType} rules={taskType != 'class' ? [{ validator: (_, value) => ELValidtor(value) }] : []}>
						<TextArea rows={4} />
					</Form.Item>
					{taskType == 'expression' && <Form.Item name="resultVariable">
						<Input addonAfter="返回值" />
					</Form.Item>}
				</Form.Item>
			</Form.Item>}
			{(nodeType(nodeRef.current) === 'SendTask' && !multiInstances.show) && <Form.Item label="服务类型" name="class">
				<Form.Item noStyle>
					<Form.Item name="class">
						<TextArea rows={4} />
					</Form.Item>
				</Form.Item>
			</Form.Item>}
			{(nodeType(nodeRef.current) === 'ScriptTask' && !multiInstances.show) && <Form.Item>
				<Form.Item label="脚本类型" name="scriptFormat">
					<Radio.Group defaultValue={taskType || 'JavaScript'} onChange={(e) => {
						const value = e.target.value;
						setTaskType(value);
						setScript('');
					}} options={scriptType} />
				</Form.Item>
				<Form.Item label="脚本">
					<Editor value={script} onValueChange={(value) => setScript(value)} highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'js')} padding={10}
						style={{ fontFamily: "monospace", height: '100px', border: '1px solid #d9d9d9', borderRadius: '10px' }} />
				</Form.Item>
				{taskType != 'juel' ? <Form.Item label="是否保留脚本结果" name="autoStoreVariables">
					<Switch defaultChecked={false} />
				</Form.Item> : <Form.Item label="脚本结果接收参数" name="resultVariable">
					<Input addonAfter="返回值" />
				</Form.Item>}
			</Form.Item>}
            <Form.Item label="描述" name="description">
                <TextArea />
            </Form.Item>
		</Form>
	</Drawer>
}

export default PropertiesPanel;

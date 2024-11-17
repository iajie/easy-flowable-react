/**
 * @Date: 2024-09-30 13:27
 * @Description: 侧边属性栏
 * @Author: MoJie
 */
import {
    Alert, Checkbox, Col, Collapse, CollapseProps, Form, Input, List,
    Popover, Radio, Row, Select, Switch, Tag, Typography
} from "antd";
import React, { Fragment } from "react";
import { userType, defaultType, defaultUser, Option, MultiInstancesProperties, serviceType, scriptType } from "../props/userTask";
import {
    PanelProps,
    Element,
    BusinessObjectType,
    nodeType,
    multiInstancesType,
    elValid,
    elCheck,
    ActionOptions,
    elValidAndNumber
} from "../props/panel";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { ItemType } from "rc-collapse/es/interface";
type EventBus = import('diagram-js/lib/core/EventBus').default;
type Modeling = import('bpmn-js/lib/features/modeling/Modeling').default;
type BpmnFactory = import('bpmn-js/lib/features/modeling/BpmnFactory').default;

const { TextArea } = Input;
const { Paragraph } = Typography;

const PropertiesPanel: React.FC<PanelProps> = ({ modeler, defaultElement, attrPrefix = "flowable:", ...props }) => {

	const modeling: Modeling = modeler.get('modeling');
	const [form] = Form.useForm();
	const ignoreElementChanged = React.useRef(false);
	const nodeRef = React.useRef<BusinessObjectType>();
	const [currentElement, setCurrentElement] = React.useState<Element>(defaultElement);

	/**                        用户任务属性                                    **/
	const [taskType, setTaskType] = React.useState<string>();
	const [userActionType, setUserActionType] = React.useState<'uel' | 'custom'>('custom');
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
				if (nodeType(e.element.businessObject) == "SequenceFlow") {
					return;
				}
                changeCurrentElement(e.element);
			}
		}
		eventBus.on('element.changed', changedListener);
        changeCurrentElement(defaultElement);
		return () => {
			eventBus.off('element.click', clickListener);
			eventBus.off('element.changed', changedListener);
		}
	}, [modeler]);

	const onValuesChange = (changeValue: Partial<BusinessObjectType> | any) => {
        const bpmnFactory: BpmnFactory = modeler.get("bpmnFactory");
        const completionCondition = changeValue.loopCharacteristics?.completionCondition?.body;
		if (changeValue.id || changeValue.name || changeValue.scriptFormat || changeValue.documentation) {
			updateElementProperty({ ...changeValue });
		} else if (changeValue.conditionExpression?.body && elCheck(changeValue.conditionExpression?.body)) {
            const expression = bpmnFactory.create("bpmn:FormalExpression")
            expression.body = changeValue.conditionExpression?.body;
            updateElementProperty({"conditionExpression": expression});
        } else if (changeValue.loopCharacteristics) {
            const loopCharacteristics = nodeRef.current?.loopCharacteristics;
            if (loopCharacteristics) {
                if (changeValue.loopCharacteristics?.collection) {
                    loopCharacteristics.$attrs[`${attrPrefix}collection`] = changeValue.loopCharacteristics.collection;
                    if (!changeValue.loopCharacteristics?.elementVariable) {
                        const assignee = '${item}';
                        form.setFieldValue('assignee', assignee);
                        form.setFieldValue('loopCharacteristics.elementVariable', 'item');
                        updateElementProperty({ [attrPrefix + "assignee"]: assignee });
                        loopCharacteristics.$attrs[`${attrPrefix}elementVariable`] = 'item';
                    }
                } else if (changeValue.loopCharacteristics?.elementVariable) {
                    const assignee = '${' + changeValue.loopCharacteristics?.elementVariable + '}';
                    form.setFieldValue('assignee', assignee);
                    updateElementProperty({ [attrPrefix + "assignee"]: assignee });
                    loopCharacteristics.$attrs[`${attrPrefix}elementVariable`] = changeValue.loopCharacteristics?.elementVariable;
                } else if (changeValue.loopCharacteristics?.loopCardinality) {
                    const expression = bpmnFactory.create("bpmn:Expression");
                    expression.body = changeValue.loopCharacteristics?.loopCardinality;
                    expression.$parent = loopCharacteristics;
                    loopCharacteristics.loopCardinality = expression;
                } else if (completionCondition && elCheck(completionCondition)) {
                    const expression = bpmnFactory.create("bpmn:Expression");
                    expression.body = completionCondition;
                    expression.$parent = loopCharacteristics;
                    loopCharacteristics.completionCondition = expression;
                }
                updateElementProperty({ "loopCharacteristics": loopCharacteristics });
            } else {
                updateElementProperty({ "loopCharacteristics": null });
            }
        } else {
            const keys = ['expression', 'delegateExpression'];
            for (let key in changeValue) {
                if (keys.includes(key)) {
                    if (!elCheck(changeValue[key])) {
                        break;
                    }
                }
                updateElementProperty({ [`${attrPrefix}${key}`]: changeValue[key] });
            }
        }
	}

	React.useEffect(() => {
		if (script) {
			updateElementProperty({ script });
		}
	}, [script]);

	/**
	 * 元素属性赋值
	 * @param data { property: string, value: any }
	 */
	const updateElementProperty = (data: {[key: string]: any}) => {
		if (nodeRef.current && currentElement) {
			try {
				ignoreElementChanged.current = true;
                modeling.updateProperties(currentElement, { ...data });
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

    const collapseItems = (): CollapseProps['items'] => {
        const arr: CollapseProps['items'] = [{
            key: 'base',
            label: '基础属性',
            children: <Fragment>
                <Form.Item label="标识" name="id">
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="名称" name="name">
                    <Input />
                </Form.Item>
                {(nodeType(nodeRef.current) == 'UserTask' || nodeType(nodeRef.current) == 'ScriptTask' ||
                    nodeType(nodeRef.current) == 'ServiceTask') && <Form.Item
                    label="跳过条件" name="skipExpression"
                    rules={[{ validator: (_, value) => elValid(value) }]}>
                    <Input />
                </Form.Item>}
            </Fragment>
        }];
        const children: ItemType = { key: 'special', label: '特有属性', children: null };
        if (nodeType(nodeRef.current) == 'SequenceFlow') {
            children.children = <Form.Item
                label="表达式" name={['conditionExpression', 'body']}
                tooltip="条件表达式为UEL表达式，结果需为true/false"
                rules={[{ validator: (_, value) => elValid(value) }]}>
                <TextArea />
            </Form.Item>
        } else if (nodeType(nodeRef.current) == 'UserTask' && !multiInstances.show) {
            children.children = <Fragment>
                <Form.Item label="用户类型">
                    <Radio.Group
                        defaultValue={userActionType}
                        onChange={(e) => setUserActionType(e.target.value)}
                        options={[{ label: '固定值', value: 'custom' }, { label: '自定义', value: 'uel' }, ]}/>
                </Form.Item>
                <Form.Item label="分配用户">
                    <Form.Item>
                        <Radio.Group defaultValue={taskType} onChange={(e) => setTaskType(e.target.value)} options={userType} />
                    </Form.Item>
                    <Form.Item name={taskType} noStyle>
                        {userActionType == 'uel' ? <Input/>  : taskType == 'candidateGroups' ?
                            <Select options={groups} mode="multiple" loading={groupsLoading} /> : <Select
                                mode={taskType === 'candidateUsers' ? "multiple" : undefined}
                                options={taskType === 'candidateUsers' ? users.slice(1) : users}
                                loading={usersLoading} />
                        }
                    </Form.Item>
                </Form.Item>
            </Fragment>
        } else if (nodeType(nodeRef.current) == 'UserTask' && multiInstances.show) {
            children.children = <Fragment>
                <Form.Item><Alert message={`实例类型：${multiInstances.text}`} /></Form.Item>
                <Form.Item label="分配用户" name="assignee">
                    <Input readOnly/>
                </Form.Item>
                <Form.Item
                    label="基数"
                    name={['loopCharacteristics', 'loopCardinality']}
                    rules={[{ validator: (_, value) => elValidAndNumber(value) }]}
                    tooltip="多实例的数量计算，注意如果使用el表达式结果也需要为整数。">
                    <Input />
                </Form.Item>
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
                           rules={[{ validator: (_, value) => elValid(value) }]}>
                    <TextArea />
                </Form.Item>
            </Fragment>
        } else if (nodeType(nodeRef.current) === 'ServiceTask') {
            children.children = <Fragment>
                <Form.Item label="服务类型">
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
                        <Form.Item name={taskType} rules={taskType != 'class' ? [{ validator: (_, value) => elValid(value) }] : []}>
                            <TextArea rows={4} />
                        </Form.Item>
                        {taskType == 'expression' && <Form.Item name="resultVariable">
                            <Input addonAfter="返回值" />
                        </Form.Item>}
                    </Form.Item>
                </Form.Item>
            </Fragment>
        } else if (nodeType(nodeRef.current) === 'SendTask') {
            children.children = <Fragment>
                <Form.Item label="服务类型" name="class">
                    <Form.Item name="class">
                        <TextArea rows={4} />
                    </Form.Item>
                </Form.Item>
            </Fragment>
        } else if (nodeType(nodeRef.current) === 'ScriptTask') {
            children.children = <Form.Item>
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
            </Form.Item>
        }
        if (children.children != null) {
            arr.push(children);
        }
        if (nodeType(nodeRef.current) == 'UserTask') {
            arr.push({
                key: 'action',
                label: '拓展操作',
                children: <Form.Item label="操作" name="actions">
                    <Checkbox.Group>
                        <Row>
                            { ActionOptions.map(i => <Col key={i.value} span={8}>
                                <Popover title={i.label} content={<List
                                    renderItem={(item, index) => <List.Item key={index}>
                                        <List.Item.Meta description={<span>
                                            {item.description}
                                            {i.note && <span style={{color: "#ff9c6e"}}><br/>注: {i.note}</span>}
                                        </span>}/>
                                    </List.Item>}
                                    size="small" bordered dataSource={[{ title: i.label, description: i.description }]}/>}>
                                    <Checkbox value={i.value} disabled={i.disabled}>
                                        <p>{i.label}</p>
                                    </Checkbox>
                                </Popover>
                            </Col>) }
                        </Row>
                    </Checkbox.Group>

                </Form.Item>
            });
        }
        arr.push({
            key: 'description',
            label: '文档',
            children: <Form.Item label="描述" name="documentation">
                <TextArea />
            </Form.Item>
        })
        return arr;
    }

	return <Form onValuesChange={onValuesChange} form={form} labelCol={{ span: 5 }}>
        <Alert message={`当前对象: ${nodeType(nodeRef.current)}`} />
        <Collapse
            style={{
                height: `${props.height}vh`,
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                marginTop: '1px'
            }} expandIconPosition="end" items={collapseItems()}
            defaultActiveKey={['base', 'special', 'description', 'action']}/>
    </Form>
}

export default PropertiesPanel;

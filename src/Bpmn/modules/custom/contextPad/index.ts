import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isExpanded, isHorizontal, isEventSubProcess } from 'bpmn-js/lib/util/DiUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { getChildLanes } from 'bpmn-js/lib/features/modeling/util/LaneUtil';
import {
    ContextPadConfig, Injector, EventBus, ContextPad, Element,
    ElementFactory, Connect, Create, PopupMenu, Canvas, Rules, Translate, AppendPreview, ModdleElement,
} from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

class EasyFlowableContextPadProvider {
    contextPad: any;
    modeling: any;
    elementFactory: ElementFactory;
    connect: any;
    create: any;
    popupMenu: any;
    rules: any;
    translate: any;
    appendPreview: any;
    autoPlace: any;

    constructor(config: ContextPadConfig, injector: Injector, eventBus: EventBus, contextPad: ContextPad, modeling: ContextPad, elementFactory: ElementFactory,
        connect: Connect, create: Create, popupMenu: PopupMenu, canvas: Canvas, rules: Rules, translate: Translate, appendPreview: AppendPreview) {
        // @ts-ignore
        contextPad.registerProvider(this);
        this.contextPad = contextPad;
        this.modeling = modeling;
        this.elementFactory = elementFactory;
        this.connect = connect;
        this.create = create;
        this.popupMenu = popupMenu;
        this.rules = rules;
        this.translate = translate;
        this.appendPreview = appendPreview;

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        eventBus.on('create.end', 250, (event: any & MouseEvent) => {
            // @ts-ignore
            const context = event.context, shape = context.shape;
            const hasPrimaryModifier = (event.originalEvent || event.srcEvent || event).button == 0;
            if (!hasPrimaryModifier || !contextPad.isOpen(shape)) {
                return;
            }
            const entries = contextPad.getEntries(shape);
            if (entries.replace) {
                // @ts-ignore
                entries.replace.action.click(event, shape);
            }
        });

        eventBus.on('contextPad.close', function () {
            appendPreview.cleanUp();
        });
    }

    /**
     * 追加删除节点
     * @param elements 节点集合
     * @returns
     */
    getMultiElementContextPadEntries = (elements: Element[]) => {
        const actions = {};
        if (this.isDeleteAllowed(elements)) {
            Object.assign(actions, {
                'delete': {
                    group: 'edit',
                    className: 'bpmn-icon-trash',
                    title: this.translate('Delete'),
                    action: {
                        click: (_: any, elements: Element[]) => {
                            this.modeling.removeElements(elements.slice());
                        }
                    }
                }
            });
        }
        return actions;
    }

    /**
     * 判断是否允许删除节点
     * @param elements 节点集合
     * @returns
     */
    isDeleteAllowed = (elements: Element[]) => {
        const baseAllowed = this.rules.allowed('elements.delete', {
            elements: elements
        });
        if (baseAllowed instanceof Array) {
            return elements.every((el: Element) => baseAllowed.includes(el));
        }
        return baseAllowed;
    }

    /**
     * 获取操作面板
     * @param element 得到modeler的节点
     * @returns
     */
    getContextPadEntries = (element: Element) => {
        // 面板操作
        const actions = {};

        // 连接操作
        const startConnect = (e: any, el: Element) => this.connect.start(e, el);

        // 删除节点
        const removeElement = (e: any, el: Element) => this.modeling.removeElements([el]);

        // 获取菜单选项 位置
        const getReplaceMenuPosition = (el: Element) => {
            const Y_OFFSET = 5;
            const pad = this.contextPad.getPad(el).html;
            const padRect = pad.getBoundingClientRect();
            const pos = {
                x: padRect.left,
                y: padRect.bottom + Y_OFFSET
            };
            return pos;
        }

        // 删除
        const deleteAction = () => ({
            'delete': {
                group: 'edit',
                className: 'bpmn-icon-trash',
                title: this.translate('Delete'),
                action: {
                    click: removeElement
                }
            }
        });

        // 如果节点类型为文字，就只显示删除
        if (element.type === 'label') {
            if (this.isDeleteAllowed([element])) {
                Object.assign(actions, deleteAction());
            }
            return actions;
        }

        /**
         * 显示可添加得节点
         * @param type 类型
         * @param className 图标
         * @param title 显示名称
         * @param options 配置(点击事件...)
         * @returns
         */
        const appendAction = (type: string, className: string, title: Translate, options?: any) => {
            const appendStart = (e: any, el: Element) => {
                const shape = this.elementFactory.createShape(Object.assign({ type: type }, options));
                this.create.start(e, shape, { source: el });
            }
            const append = this.autoPlace ? (e: any, el: Element) => {
                const shape = this.elementFactory.createShape(Object.assign({ type: type }, options));
                this.autoPlace.append(el, shape);
            } : appendStart;

            const previewAppend = this.autoPlace ? (e: any, el: Element) => {
                // mouseover
                this.appendPreview.create(el, type, options);
                return () => this.appendPreview.cleanUp();
            } : null;
            return {
                group: 'model',
                className: className,
                title: title,
                action: {
                    dragstart: appendStart,
                    click: append,
                    hover: previewAppend
                }
            };
        }

        const splitLaneHandler = (count: number) => {
            return (e: any, el: Element) => {
                // actual split
                this.modeling.splitLane(el, count);
                // refresh context pad after split to
                // get rid of split icons
                this.contextPad.open(el, true);
            };
        }

        // 节点属性
        const businessObject = element.businessObject;

        // 如果是创建池/参与者，那么需要获取池下面的所有节点
        if (isAny(businessObject, ['bpmn:Lane', 'bpmn:Participant']) && isExpanded(element)) {
            // @ts-ignore 获取子节点
            const childLanes = getChildLanes(element);
            Object.assign(actions, {
                'lane-insert-above': {
                    group: 'lane-insert-above',
                    className: 'bpmn-icon-lane-insert-above',
                    title: this.translate('Add lane above'),
                    action: {
                        click: (e: any, el: Element) => this.modeling.addLane(el, 'top')
                    }
                }
            });

            if (childLanes.length < 2) {
                if (isHorizontal(element) ? element.height >= 120 : element.width >= 120) {
                    Object.assign(actions, {
                        'lane-divide-two': {
                            group: 'lane-divide',
                            className: 'bpmn-icon-lane-divide-two',
                            title: this.translate('Divide into two lanes'),
                            action: {
                                click: splitLaneHandler(2)
                            }
                        }
                    });
                }
                if (isHorizontal(element) ? element.height >= 180 : element.width >= 180) {
                    Object.assign(actions, {
                        'lane-divide-three': {
                            group: 'lane-divide',
                            className: 'bpmn-icon-lane-divide-three',
                            title: this.translate('Divide into three lanes'),
                            action: {
                                click: splitLaneHandler(3)
                            }
                        }
                    });
                }
            }
            Object.assign(actions, {
                'lane-insert-below': {
                    group: 'lane-insert-below',
                    className: 'bpmn-icon-lane-insert-below',
                    title: this.translate('Add lane below'),
                    action: {
                        click: (e: any, el: Element) => this.modeling.addLane(el, 'bottom')
                    }
                }
            });

        }

        // 基础流程节点元素
        if (is(businessObject, 'bpmn:FlowNode')) {
            // 事件网关
            if (is(businessObject, 'bpmn:EventBasedGateway')) {
                Object.assign(actions, {
                    'append.receive-task': appendAction('bpmn:ReceiveTask', 'bpmn-icon-receive-task', this.translate('Append receive task')),
                    'append.message-intermediate-event': appendAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-catch-message',
                        this.translate('Append message intermediate catch event'), { eventDefinitionType: 'bpmn:MessageEventDefinition' }),
                    'append.timer-intermediate-event': appendAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-catch-timer',
                        this.translate('Append timer intermediate catch event'), { eventDefinitionType: 'bpmn:TimerEventDefinition' }),
                    'append.condition-intermediate-event': appendAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-catch-condition',
                        this.translate('Append conditional intermediate catch event'), { eventDefinitionType: 'bpmn:ConditionalEventDefinition' }),
                    'append.signal-intermediate-event': appendAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-catch-signal',
                        this.translate('Append signal intermediate catch event'), { eventDefinitionType: 'bpmn:SignalEventDefinition' })
                });
            } else if (this.isEventType(businessObject, 'bpmn:BoundaryEvent', 'bpmn:CompensateEventDefinition')) { // 边界事件/补偿事件
                Object.assign(actions, {
                    'append.compensation-activity': appendAction('bpmn:Task', 'bpmn-icon-task',
                        this.translate('Append compensation activity'), { isForCompensation: true })
                });
            } else if (!is(businessObject, 'bpmn:EndEvent') && !businessObject.isForCompensation &&
                !this.isEventType(businessObject, 'bpmn:IntermediateThrowEvent', 'bpmn:LinkEventDefinition') && !isEventSubProcess(businessObject)) {
                Object.assign(actions, {
                    'append.end-event': appendAction('bpmn:EndEvent', 'bpmn-icon-end-event-none', this.translate('Append end event')),
                    'append.gateway': appendAction('bpmn:ExclusiveGateway', 'bpmn-icon-gateway-none', this.translate('Append gateway')),
                    'append.append-task': appendAction('bpmn:Task', 'bpmn-icon-task', this.translate('Append task')),
                    // TODO 邮件
                    // 'append.append-mail-task': appendAction('bpmn:Task', 'bpmn-icon-send', this.translate('Append mail task')),
                    'append.intermediate-event': appendAction('bpmn:IntermediateThrowEvent',
                        'bpmn-icon-intermediate-event-none', this.translate('Append intermediate/boundary event'))
                });
            }
        }

        // 如果菜单不为空，则追加节点类型切换 扳手
        if (!this.popupMenu.isEmpty(element, 'bpmn-replace')) {
            // Replace menu entry
            Object.assign(actions, {
                'replace': {
                    group: 'edit',
                    className: 'bpmn-icon-screw-wrench',
                    title: this.translate('Change element'),
                    action: {
                        click: (e: any, el: Element) => {
                            const position = Object.assign(getReplaceMenuPosition(el), {
                                cursor: { x: e.x, y: e.y }
                            });
                            this.popupMenu.open(el, 'bpmn-replace', position, {
                                title: this.translate('Change element'),
                                width: 300,
                                search: true
                            });
                        }
                    }
                }
            });
        }

        // 如果是箭头，则给它添加文本说明
        if (is(businessObject, 'bpmn:SequenceFlow')) {
            Object.assign(actions, {
                'append.text-annotation': appendAction('bpmn:TextAnnotation',
                    'bpmn-icon-text-annotation', this.translate('Add text annotation'))
            });
        }

        // 如果是数据对象/数据引用对象
        if (isAny(businessObject, ['bpmn:FlowNode', 'bpmn:InteractionNode', 'bpmn:DataObjectReference', 'bpmn:DataStoreReference'])) {
            Object.assign(actions, {
                'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation', this.translate('Add text annotation')),
                'connect': {
                    group: 'connect',
                    className: 'bpmn-icon-connection-multi',
                    title: this.translate('Connect to other element'),
                    action: {
                        click: startConnect,
                        dragstart: startConnect,
                    },
                },
            });
        }

        // 如果是文本，没有什么设置的，就设置引用箭头了
        if (is(businessObject, 'bpmn:TextAnnotation')) {
            Object.assign(actions, {
                'connect': {
                    group: 'connect',
                    className: 'bpmn-icon-connection-multi',
                    title: this.translate('Connect using association'),
                    action: {
                        click: startConnect,
                        dragstart: startConnect,
                    },
                },
            });
        }

        // 数据源切换->连接到其他节点
        if (isAny(businessObject, ['bpmn:DataObjectReference', 'bpmn:DataStoreReference'])) {
            Object.assign(actions, {
                'connect': {
                    group: 'connect',
                    className: 'bpmn-icon-connection-multi',
                    title: this.translate('Connect using data input association'),
                    action: {
                        click: startConnect,
                        dragstart: startConnect
                    }
                }
            });
        }

        // 组
        if (is(businessObject, 'bpmn:Group')) {
            Object.assign(actions, {
                'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation', this.translate('Add text annotation'))
            });
        }

        // 最后添加删除
        if (this.isDeleteAllowed([element])) {
            Object.assign(actions, deleteAction());
        }

        return actions;
    }

    /**
     * 获取事件类型
     * @param businessObject 节点对象
     * @param type 类型
     * @param eventDefinitionType 目标类型
     * @returns
     */
    isEventType = (businessObject: ModdleElement, type: string, eventDefinitionType: string) => {
        const isType = businessObject.$instanceOf(type);
        let isDefinition = false;
        const definitions = businessObject.eventDefinitions || [];
        definitions.forEach((def: any) => {
            if (def.$type === eventDefinitionType) {
                isDefinition = true;
            }
        });
        return isType && isDefinition;
    }
}

export const EasyFlowableContextPad = {
    contextPadProvider: ['type', EasyFlowableContextPadProvider]
};

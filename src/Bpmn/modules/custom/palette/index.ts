import {
    Palette, Create, ElementFactory, SpaceTool, LassoTool,
    HandTool, GlobalConnect, Translate
} from 'bpmn-js/lib/features/palette/PaletteProvider';

class EasyFlowablePaletteProvider {
    palette: Palette;
    create: Create;
    elementFactory: ElementFactory;
    spaceTool: SpaceTool;
    lassoTool: LassoTool;
    handTool: HandTool;
    globalConnect: GlobalConnect;
    translate: Translate;
    constructor(
        palette: Palette, create: Create, elementFactory: ElementFactory,
        spaceTool: SpaceTool, lassoTool: LassoTool, handTool: HandTool,
        globalConnect: GlobalConnect, translate: Translate) {
        this.palette = palette;
        this.create = create;
        this.elementFactory = elementFactory;
        this.spaceTool = spaceTool;
        this.lassoTool = lassoTool;
        this.handTool = handTool;
        this.globalConnect = globalConnect;
        this.translate = translate;
        // @ts-ignore 不注冊
        // palette.registerProvider(this);
    }

    getPaletteEntries = (element: any) => {
        const actions: any = {};
        const createAction = (type: any, group: any, className: any, title: any, options?: any) => {
            const createListener = (event: any) => {
                const shape = this.elementFactory.createShape(Object.assign({ type: type }, options));
                if (options) {
                    shape.businessObject.di.isExpanded = options.isExpanded;
                }
                this.create.start(event, shape);
            }

            const shortType = type.replace(/^bpmn:/, '');

            return {
                group: group,
                className: className,
                title: title || this.translate('Create {type}', { type: shortType }),
                action: {
                    dragstart: createListener,
                    click: createListener,
                }
            };
        }
        const createSubprocess = (event: any) => {
            const subProcess = this.elementFactory.createShape({
                type: 'bpmn:SubProcess',
                x: 0,
                y: 0,
                isExpanded: true
            });

            const startEvent = this.elementFactory.createShape({
                type: 'bpmn:StartEvent',
                x: 40,
                y: 82,
                parent: subProcess
            });

            this.create.start(event, [ subProcess, startEvent ], {
                hints: {
                    autoSelect: [ startEvent ]
                }
            });
        }
        const createParticipant = (event: any) => {
            // @ts-ignore
            this.create.start(event, this.elementFactory.createParticipantShape());
        }
        Object.assign(actions, {
            'hand-tool': {//抓手工具
                group: 'tools',
                className: 'bpmn-icon-hand-tool',
                title: this.translate('Activate the hand tool'),
                action: {
                    click: (event: any) => {
                        this.handTool.activateHand(event);
                    }
                }
            },
            'space-tool': {//创建/删除空间工具
                group: 'tools',
                className: 'bpmn-icon-space-tool',
                title: this.translate('Activate the create/remove space tool'),
                action: {
                    click: (event: any) => {
                        // @ts-ignore
                        this.spaceTool.activateSelection(event);
                    }
                }
            },
            'lasso-tool': {//索套工具
                group: 'tools',
                className: 'bpmn-icon-lasso-tool',
                title: this.translate('Activate the lasso tool'),
                action: {
                    click: (event: any) => {
                        this.lassoTool.activateSelection(event);
                    }
                }
            },
            'global-connect-tool': {//全局连接工具
                group: 'tools',
                className: 'bpmn-icon-connection-multi',
                title: this.translate('Activate the global connect tool'),
                action: {
                    click: (event: any) => {
                        // @ts-ignore
                        this.globalConnect.toggle(event);
                    }
                }
            },
            'tool-separator': {//工具分割线
                group: 'tools',
                separator: true
            },
            'create.start-event': createAction(//开始事件
                'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none',
                this.translate('Create StartEvent')
            ),
            'create.end-event': createAction(//结束事件
                'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none',
                this.translate('Create EndEvent')
            ),
            'create.intermediate-event': createAction(//中间/边界事件
                'bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none',
                this.translate('Create Intermediate/Boundary Event')
            ),
            'event-separator': {//事件分割线
                group: 'events',
                separator: true
            },
            'create.exclusive-gateway': createAction(//互斥网关
                'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor',
                this.translate('Create ExclusiveGateway')
            ),
            'create.parallel-gateway': createAction(//并行网关
                'bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel',
                this.translate('Create ParallelGateway')
            ),
            'create.inclusive-gateway': createAction(//相容网关
                'bpmn:InclusiveGateway', 'gateway', 'bpmn-icon-gateway-or',
                this.translate('Create InclusiveGateway')
            ),
            'create.complex-gateway': createAction(//复杂网关
                'bpmn:ComplexGateway', 'gateway', 'bpmn-icon-gateway-complex',
                this.translate('Create ComplexGateway')
            ),
            'create.event-based-gateway': createAction(//事件网关
                'bpmn:EventBasedGateway', 'gateway', 'bpmn-icon-gateway-eventbased',
                this.translate('Create EventbasedGateway')
            ),
            'gateway-separator': {//网关分割线
                group: 'gateways',
                separator: true
            },
            'create.task': createAction(//空白任务
                'bpmn:Task', 'activity', 'bpmn-icon-task',
                this.translate('Create Task')
            ),
            'create.user-task': createAction(//用户任务
                'bpmn:UserTask', 'activity', 'bpmn-icon-user-task',
                this.translate('Create UserTask')
            ),
            'create.send-task': createAction(//发送任务
                'bpmn:SendTask', 'activity', 'bpmn-icon-send-task',
                this.translate('Create SendTask')
            ),
            'create.receive-task': createAction(//接收任务
                'bpmn:ReceiveTask', 'activity', 'bpmn-icon-receive-task',
                this.translate('Create ReceiveTask')
            ),
            'create.business-rule-task': createAction(//业务规则任务
                'bpmn:BusinessRuleTask', 'activity', 'bpmn-icon-business-rule-task',
                this.translate('Create BusinessRuleTask')
            ),
            'create.service-task': createAction(//服务任务
                'bpmn:ServiceTask', 'activity', 'bpmn-icon-service-task',
                this.translate('Create ServiceTask')
            ),
            'create.script-task': createAction(//脚本任务
                'bpmn:ScriptTask', 'activity', 'bpmn-icon-script-task',
                this.translate('Create ScriptTask')
            ),
            'create.manual-task': createAction(//手工任务
                'bpmn:ManualTask', 'activity', 'bpmn-icon-manual-task',
                this.translate('Create ManualTask')
            ),
            'create.call-activity': createAction(//调用活动
                'bpmn:CallActivity', 'activity', 'bpmn-icon-call-activity',
                this.translate('Create CallActivityTask')
            ),
            'create.subprocess-expanded': {//创建子流程（展开的）
                group: 'activity',
                className: 'bpmn-icon-subprocess-expanded',
                title: this.translate('Create SubProcessExpanded'),
                action: {
                    dragstart: createSubprocess,
                    click: createSubprocess
                }
            },
            'task-separator': {//任务分割线
                group: 'tasks',
                separator: true
            },
            'create.data-object': createAction(//数据对象
                'bpmn:DataObjectReference', 'data-object', 'bpmn-icon-data-object',
                this.translate('Create DataObjectReference')
            ),

            'create.data-store': createAction(//数据存储引用
                'bpmn:DataStoreReference', 'data-store', 'bpmn-icon-data-store',
                this.translate('Create DataStoreReference')
            ),

            'create.participant-expanded': {//池/参与者
                group: 'collaboration',
                className: 'bpmn-icon-participant',
                title: this.translate('Create Pool/Participant'),
                action: {
                    dragstart: createParticipant,
                    click: createParticipant
                }
            },
            'create.group': createAction(//组
                'bpmn:Group', 'artifact', 'bpmn-icon-group',
                this.translate('Create Group')
            ),
        });
        return actions;

    };
}

export const EasyFlowablePalette = {
    paletteProvider: ['type', EasyFlowablePaletteProvider]
};

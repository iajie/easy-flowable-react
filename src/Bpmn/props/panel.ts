/**
 * @Date: 2024-10-2 17:05:00
 * @Description: 侧边属性栏
 * @Author: MoJie
 */
import BpmnModeler from "bpmn-js/lib/Modeler";
import { Color } from "antd/es/color-picker";
import { Option } from './index';

export type BusinessObjectType = {
    id: string,
    name: string,
    description: string;
    documentation: string;
    /**
     * @description 作者
     */
    author: string;
    color: Color,
    /** 条件表达式 */
    conditionExpression: {
        body: string,
    },
    /** true:串行, false:并行 */
    isSequential: boolean,
    //多实例变量
    loopCharacteristics: {
        $attrs: {
            [key: string]: any;
        }
        /** true:串行, false:并行 */
        isSequential: boolean,
        /**
         * @description 循环基数
         */
        loopCardinality: number,
        collection: any,
        elementVariable: any,
        completionCondition: {
            body: string,
        },
    },
    $type: string,
    $attrs: any,
    /** 操作人 */
    assignee: string;
    /** 候选人 */
    candidateUsers: string[];
    /** 候选组 */
    candidateGroups: string;
    /**
     * @description 服务类全名，需要execute(DelegateExecution e)方法，也可以实现JavaDelegate
     */
    class: string;
    /**
     * @description 实现了 JavaDelegate 接口的 bean，表达式调用之前需要将它初始化到流程变量中，或者定义在实例的 spring 容器中
     */
    delegateExpression: string;
    /**
     * @description 表达式可以使用beanService.method(param)的方式
     */
    expression: string;
    /**
     * @description 脚本类型
     */
    scriptFormat: string;
    /**
     * @description 执行的脚本
     */
    script: string;
    /**
     * @description 是否保留脚本执行结果
     */
    autoStoreVariables: boolean;
    /**
     * @description 脚本运行结果接收参数
     */
    resultVariable: string;

}

export type Element = import('bpmn-js/lib/model/Types').Element & {
    businessObject: BusinessObjectType
};

export interface PanelProps {
    /** bpmn对象 */
    modeler: BpmnModeler;
    /** 当前选中节点 */
    defaultElement: Element;
    /** 节点前缀 */
    attrPrefix?: string;
    /**
     * @description 属性栏高度
     */
    height: number;
    /** 用户列表 */
    users?: Option[] | (() => Promise<Option[]>);
    /** 候选组列表，可以是角色、部门... */
    groups?: Option[] | (() => Promise<Option[]>);
}

/**
 * 获取节点类型
 * @returns
 * @param node
 */
export const nodeType = (node: any) => {
    if (node && node.$type) {
        if (node.$type.startsWith('bpmn:')) {
            return node.$type.substring(5);
        }
        return node.$type;
    }
    return false;
}

/**
 * 获取多实例类型
 * @returns
 * @param node
 */
export const multiInstancesType = (node: BusinessObjectType['loopCharacteristics']) => {
    const type = nodeType(node);
    if (type == 'StandardLoopCharacteristics') {
        return '循环'; // Loop
    }
    if (node?.isSequential) {
        return '串行'; // Sequential
    }
    return '并行'; // Parallel
}

/**
 * SpEl参数校验
 * @param value 校验
 */
export const elCheck = (value: string) => value && value.startsWith('${') && value.endsWith('}')

/**
 * SpEl参数校验
 * @param value 校验
 */
export const elValid = async (value?: string) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value && value.startsWith('${') && value.endsWith('}')) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('EL条件表达式错误'));
}

/**
 * SpEl参数校验
 * @param value 校验
 */
export const elValidAndNumber = async (value?: string) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value) {
        if (/^\+?[1-9][0-9]*$/.test(value)) {
            return Promise.resolve();
        }
        if (value.startsWith('${') && value.endsWith('}')) {
            return Promise.resolve();
        }
    }
    return Promise.reject(new Error('请填写数字或EL条件表达式'));
}

/**
 * 操作
 * @description
 */
export const ActionOptions: { label: string; value: string; disabled?: boolean; description?: string; note?: string; }[] = [
    { label: '评论', value: 'ADD_COMMENT', description: '不会对流程进行操作，只会对当前任务添加一条评论。' },
    { label: '同意', value: 'AGREE', description: '扭转到下一节点。' },
    { label: '拒绝', value: 'REBUT',
        note: '如果您需要判断走其他分支，那么您需要流程变量来帮助您完成！',
        description: '拒绝(回到流程发起节点)，如表单提交资料需要重新填写。' },
    { label: '驳回', value: 'REJECT', description: '回到上一用户任务执行节点。' },
    { label: '驳回节点', value: 'REJECT_TO_TASK', description: '指定回到当前流程已经执行的节点。' },
    { label: '委派', value: 'DELEGATE', description: '将当前任务委托给其他人执行，委托之后任务执行人为委托人，任务执行完成后会回到任务执行人手中。' },
    { label: '转办', value: 'ASSIGN', description: '将当前任务交给其他人执行，任务就和自己没有关系了。' },
    { label: '终止', value: 'STOP', description: '将当前任务结束。' },
    { label: '撤回', value: 'REVOCATION', description: '撤回指任务回到流程发起节点，如流程发起后，提交资料不符合流程，则可撤回流程。' },
    { label: '前加签', value: 'BEFORE_SIGN', disabled: true, description: '在当前任务前增加一个人审批，审批完成后才到当前节点执行。' },
    { label: '后加签', value: 'AFTER_SIGN', disabled: true, description: '在当前任务后增加一个人审批，审批完成后需要添加的人审批才会进入流程图节点。' },
];

/**
 * 操作
 * @description
 */
export const ActionType = ActionOptions.map(i => ({ label: i.label, value: i.value, disabled: i.disabled }));

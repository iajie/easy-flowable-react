/**
 * @Date: 2024-10-2 17:05:00
 * @Description: 侧边属性栏
 * @Author: MoJie
 */
import BpmnModeler from "bpmn-js/lib/Modeler";
import { Color } from "antd/es/color-picker";
import { CSSProperties } from "react";
import { Option } from './index';

export type BusinessObjectType = {
    id: string,
    name: string,
    description: string;
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
        loopMaximun: any,
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
    /** 抽屉样式 */
    style?: CSSProperties;
    /** 抽屉宽度  */
    width?: number;
    /** 用户列表 */
    users?: () => Promise<Option[]> | Option[];
    /** 候选组列表，可以是角色、部门... */
    groups?: () => Promise<Option[]> | Option[];
}

/**
 * 获取节点类型
 * @param type 节点type
 * @returns 
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
 * @param type 节点type
 * @returns 
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
 * @param _ 
 * @param value 校验
 */
export const spELValidtor = (value: string) => value && value.startsWith('${') && value.endsWith('}')

/**
 * SpEl参数校验
 * @param _ 
 * @param value 校验
 */
export const ELValidtor = async (value?: string) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value && value.startsWith('${') && value.endsWith('}')) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('EL条件表达式错误'));
}

const elEncoder = (value: string) => `<![CDATA[ ${value} ]]>`;
const elDecoder = (value: string) => value.startsWith('<![CDATA[') && value.substring(value.indexOf(' ') + 1, value.lastIndexOf(' '));

export {
    elEncoder, elDecoder
}
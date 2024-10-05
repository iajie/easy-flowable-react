import { nodeType } from "./panel";

export interface Option {
    value: any;
    label: string;
}

/**
 * 多实例属性
 */
export interface MultiInstancesProperties {
    /** 显示文字 */
    text?: string;
    /** 是否展示多实例 */
    show: boolean;
    /** 是否为循环实例 */
    isLoop?: boolean;
}

/**
 * 用户类型
 */
export const userType: Option[] = [
    { label: '单个用户', value: 'assignee' },
    { label: '候选用户', value: 'candidateUsers' },
    { label: '候选组', value: 'candidateGroups' },
]

/**
 * 用户类型
 */
export const serviceType: Option[] = [
    { label: '类', value: 'class' },
    { label: '委托表达式', value: 'delegateExpression' },
    { label: '表达式', value: 'expression' },
]

/**
 * 脚本类型
 */
export const scriptType: Option[] = [
    { label: 'javascript', value: 'JavaScript' },
    { label: 'Groovy', value: 'groovy' },
    { label: 'juel(EL)', value: 'juel' },
]

/**
 * 默认用户类型
 */
export const defaultType = (node: any, attrPrefix: string) => {
    if (node) {
        const type = nodeType(node);
        if (type == 'UserTask') {
            if (node.$attrs[`${attrPrefix}candidateUsers`]) {
                return 'candidateUsers';
            } else if (node.$attrs[`${attrPrefix}candidateGroups`]) {
                return 'candidateGroups';
            } else {
                return 'assignee';
            }
        } else if (type == 'ServiceTask') {
            if (node.$attrs[`${attrPrefix}delegateExpression`]) {
                return 'delegateExpression';
            } else if (node.$attrs[`${attrPrefix}expression`]) {
                return 'expression';
            } else {
                return 'class';
            }
        }

    }

};

export const defaultUser: Option[] = [{ label: '流程发起人', value: '${initiator}' }];

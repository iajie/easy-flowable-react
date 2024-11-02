import { ReactNode } from "react";

export type Color = 'success' | 'process' | 'danger' | 'warning' | 'cyan' | 'purple';

export const NodeColor = {
    success: {
        stroke: '#52c41a',
        fill: '#f6ffed'
    },
    process: {
        stroke: '#4096ff',
        fill: '#e6f4ff',
        strokeDasharray: '5, 5',
    },
    danger: {
        stroke: '#ff4d4f',
        fill: '#fff1f0'
    },
    warning: {
        stroke: '#ffa940',
        fill: '#fff7e6'
    },
    cyan: {
        stroke: '#36cfc9',
        fill: '#e6fffb'
    },
    purple: {
        stroke: '#9254de',
        fill: '#f9f0ff'
    },
};

export type NodeType = {
    /**
     * @description 设计器数据xml
     */
    data: string;
    /**
     * 激活节点
     */
    activeNode: string[];
    /**
     * 执行节点
     */
    executeNode: string[];
};

export interface EasyFlowableViewer {
    /**
     * @description 画布字符串
     * @default
     */
    data?: string;
    /**
     * @description 异步获取画布xml
     */
    request?: () => Promise<string | NodeType>;
    /**
     * @description 设计器高度(屏幕可视高度)
     * @default 60
     */
    height?: number;
    /**
     * @description 显示模式，read为单显示为设计器样式，active为流程动态
     * @default read
     */
    mode?: 'read' | 'active';
    /**
     * @description 流程模式
     */
    active?: {
        /**
         * @description 当前激活的节点
         */
        activeNode?: string[];
        /**
         * @description 激活节点样式
         */
        activeColor?: Color;
        /**
         * @description 已完成节点
         */
        executeNode?: string[];
        /**
         * @description 已完成节点样式
         */
        executeColor?: Color;
    }
    /**
     * @description 排除节点；类型，如果添加点击节点将不会弹出框
     */
    excludeType?: string[];
    /**
     * @description 点击事件
     * @param id 节点ID
     * @param type 节点类型
     * @param node 节点信息
     */
    onClick?: (id: string, type: string, node: any) => Promise<PopoverContent>;
    /**
     * @description 弹出框中间内容自定义渲染
     * @param id 节点ID
     * @param type 节点类型
     * @param node 节点信息
     */
    tipRender?: (id: string, type: string, node: any) => ReactNode;
}

export type PopoverContent = {
    /**
     * @description 标题
     */
    title?: string;
    /**
     * @description 执行用户
     */
    users?: string[] | ReactNode;
    /**
     * @description 任务开始时间
     */
    startTime?: string | Date;
    /**
     * @description 任务结束时间
     */
    endTime?: string | Date;
    /**
     * @description 任务状态
     */
    status?: string | ReactNode;
    /**
     * @description 耗时
     */
    duration?: number;
}

export interface PopoverProps {
    /**
     * @description 弹出框标题
     */
    title: string;
    /**
     * @description 状态
     */
    status: string;
    /**
     * @description 弹出框内容
     */
    content: string | ReactNode;
    /**
     * @description 弹出框所在元素高度
     */
    height: number;
    /**
     * @description 弹出框所在元素宽度
     */
    width: number;
    /**
     * @description 弹出框是否显示
     */
    display: 'none' | 'block';
    /**
     * @description 定位位置
     */
    top: number;
    /**
     * @description 定位位置
     */
    left: number;
    /**
     * @description 节点是否完成
     */
    noting?: boolean;
}

export const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions id="definitions" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
    xmlns:flowable="http://flowable.org/bpmn"
    typeLanguage="http://www.w3.org/2001/XMLSchema"
    expressionLanguage="http://www.w3.org/1999/XPath"
    targetNamespace="http://www.flowable.org/processdef">
<process id="easy-flowable" isExecutable="true">
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="easy-flowable">
    </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`;


export const formatDate = (date?: Date | string) => {
    if (date) {
        if (typeof date == 'string') {
            return date;
        }
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return '-';
}

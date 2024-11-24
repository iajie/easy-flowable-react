/**
 * @Date: 2024-10-2 14:22:08
 * @Description: 侧边属性栏
 * @Author: MoJie
 */
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { CSSProperties, ReactNode } from 'react';
import { BusinessObjectType } from './panel';

export interface Option {
    value: any;
    label: string;
}

export interface BpmnProps {
    /**
     * @description 国际化
     */
    locale?: 'zh-CN' | 'en-CN';
    /**
     * @description 画布字符串
     * @default
     */
    data?: string;
    /**
     * @description 异步获取画布xml
     */
    request?: () => Promise<string>;
    /**
     * @description 设计器高度(屏幕可视高度)
     * @default 60
     */
    height?: number;
    /**
     * @description 设计器样式
     * @default {@link bpmnDefaultStyle}
     */
    bpmnStyle?: CSSProperties;
    /**
     * @description 设计器位置
     * @default default
     */
    align?: 'center' | 'default';
    /**
     * @description 工具栏属性
     */
    toolbar?: {
        /**
         * @description 保存方法
         */
        save?: (data: SaveProps) => Promise<void>;
        /**
         * @description 样式
         */
        style?: CSSProperties;
        /**
         * @description 标题
         */
        title?: ReactNode | false;
        /**
         * @description 是否保存base64信息
         */
        isBase64?: boolean;
    };
    /**
     * @description 工具栏自定义渲染 @param modeler 设计器实例
     */
    toolbarRender?: ((modeler: BpmnModeler) => ReactNode) | false;
    /**
     * @description 属性面板属性
     */
    panel?: {
        /**
         * @description 节点前缀
         */
        attrPrefix?: string;
        /**
         * @description 抽屉样式
         */
        style?: CSSProperties;
        /**
         * @description 抽屉宽度
         */
        width?: number;
        /** 用户列表 */
        users?: Option[] | (() => Promise<Option[]>);
        /** 候选组列表，可以是角色、部门... */
        groups?: Option[] | (() => Promise<Option[]>);
    };
    /**
     * @description 自定义属性面板 @param modeler 设计器实例
     */
    panelRender?: ((modeler: BpmnModeler) => ReactNode) | false;
    /**
     * @description 流程key, flowable部署会用到，一般就是模型key
     */
    flowKey?: string;
    /**
     * @description 流程名称：流程部署后显示的信息
     */
    flowName?: string;
    /**
     * @description 设计器加载完成之后的事件
     * @param modeler 设计器对象
     */
    loadAfter?: (modeler: BpmnModeler) => void;
    /**
     * @description 设计器加载失败的事件
     * @param modeler 设计器对象
     * @param err 加载失败信息
     */
    loadError?: (modeler: BpmnModeler, err: any) => void;
}

interface SaveProps {
    /**
     * @description 设计器数据
     */
    xml: string;
    /**
     * @description 设计器缩略图
     */
    base64?: string;
    /**
     * @description 模型名称
     */
    name?: string;
    /**
     * @description 模型描述
     */
    description?: string;
}

export interface ToolbarProps {
    /**
     * @description 导入的xml
     */
    uploadXml: (xml: string) => void;
    /** bpmn对象 */
    modeler: BpmnModeler;
    /**
     * @description 是否保存base64信息
     */
    isBase64?: boolean;
    /** 保存方法 */
    save?: (data: SaveProps) => Promise<any>;
    /** 样式 */
    style?: CSSProperties;
    /** 标题 */
    title?: ReactNode | false;
    /**
     * bpmn模型信息
     */
    bpmnData?: SaveProps;
}

export type Element = import('bpmn-js/lib/model/Types').Element & {
    businessObject: BusinessObjectType;
};

/**
 * 默认画布样式
 */
export const bpmnDefaultStyle: CSSProperties = {
    border: '1px solid #eee',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
    background:
        'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+)',
};

/**
 * 顶部工具栏样式
 */
export const toolbarDefaultStyle: CSSProperties = {
    borderTop: '1px solid #eee',
    borderRight: '1px solid #eee',
    borderLeft: '1px solid #eee',
    paddingLeft: '10px',
    height: '40px',
    lineHeight: '30px',
    background:
        'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+)',
};

/**
 * bpmn默认字符串
 * 在flowable定义时存入库中，flowable会解析xml的id和name
 * @param flowKey 流程标识
 * @param flowName 流程名称
 * isExecutable：可执行的
 * @returns
 */
export const xmlStr = (flowKey = 'easy-flowable-custom', flowName = '流程设计器') =>
    `<?xml version="1.0" encoding="UTF-8"?>
<definitions id="definitions" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
    xmlns:flowable="http://flowable.org/bpmn"
    typeLanguage="http://www.w3.org/2001/XMLSchema"
    expressionLanguage="http://www.w3.org/1999/XPath"
    targetNamespace="http://www.flowable.org/processdef">
<process id="${flowKey}" name="${flowName}" isExecutable="true">
    <startEvent id="StartEvent_1y45yut" name="开始">
    <outgoing>SequenceFlow_0h21x7r</outgoing>
    </startEvent>
    <task id="Task_1hcentk">
    <incoming>SequenceFlow_0h21x7r</incoming>
    </task>
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="BpmnPlane">
    <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
        <omgdc:Bounds x="160" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
    </bpmndi:BPMNShape>
    <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
    </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`;

/**
 * 下载当前流程设计图片
 */
export const downloadSvg = async (modeler: any, isBase64?: (str: string) => void) => {
    // svg字符串
    const svgResult = await modeler.saveSVG();
    // 创建画布
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, 10000, 10000);
        const image = new Image();
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgResult.svg)}`;
        image.onload = () => {
            canvas.width = image.width + 100;
            canvas.height = image.height + 200;
            const x = (canvas.width - image.width) / 2;
            const y = (canvas.height - image.height) / 2;
            // 将图片渲染到画布
            context.drawImage(image, x, y);
            const logo = new Image();
            logo.src =
                'data:image/png;base64,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';
            logo.onload = () => {
                context.drawImage(logo, image.width + 20, image.height + 130);
                if (isBase64) {
                    isBase64(canvas.toDataURL('image/png'));
                } else {
                    const a = document.createElement('a');
                    a.download = `easy-flowable${new Date().getSeconds()}.png`;
                    // 画布转图片
                    a.href = canvas.toDataURL('image/png');
                    a.click();
                }
            };
        };
    }
};

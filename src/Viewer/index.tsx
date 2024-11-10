import React from "react";
import './index.less';
import { Descriptions, Popover, Spin, Tag } from "antd";
import BpmnModeler from "bpmn-js/lib/Modeler";
type Element = import('bpmn-js/lib/model/Types').Element;
import Modeling from "bpmn-js/lib/features/modeling/Modeling";
import {
    Color,
    defaultXml,
    EasyFlowableViewer,
    NodeColor,
    NodeType,
    PopoverProps,
    PopoverContent,
    formatDate
} from "./props";
import { Canvas, EventBus } from "bpmn-js/lib/features/context-pad/ContextPadProvider";
import { ElementRegistry } from "bpmn-js/lib/features/auto-place/BpmnAutoPlaceUtil";

/**
 * 设计器(流程图回显)
 * @param height
 * @param mode
 * @param props
 */
export default ({ height = 50, mode = 'read', ...props }: EasyFlowableViewer) => {

    const containerRef = React.useRef(null);
    const [xml, setXml] = React.useState<string | null | NodeType>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [node, setNode] = React.useState<Element>();
    const [popover, setPopover] = React.useState<PopoverProps>({
        title: '',
        status: '',
        content: '',
        height: 80,
        width: 100,
        display: 'none',
        top: 0,
        left: 0,
        noting: false,
    });
    const [popoverInfo, setPopoverInfo] = React.useState<PopoverContent>({});

    /**
     * 设置节点颜色
     * @param nodeIds 节点集合
     * @param bpmn 设计器
     * @param colorClass {@link NodeColor} 样式
     */
    const setNodeColor = (nodeIds: string[], bpmn: BpmnModeler, colorClass: Color) => {
        if (nodeIds && nodeIds.length) {
            const elementRegistry: ElementRegistry = bpmn.get('elementRegistry');
            const modeling: Modeling = bpmn.get('modeling');
            const canvas: Canvas = bpmn.get('canvas');
            nodeIds.forEach(id => {
                const element = elementRegistry.get(id) as Element;
                if (element.type.endsWith('SequenceFlow')) {
                    modeling.setColor([element], NodeColor[colorClass]);
                } else {
                    canvas.addMarker(id, colorClass);
                }
            });
        }
    }

    React.useEffect(() => {
        if (!!xml && containerRef.current) {
            const bpmn = new BpmnModeler({
                container: containerRef.current,
                height: `${height}vh`,
                additionalModules: [{
                    paletteProvider: ['value', ''],
                    // 禁止拖动线
                    bendpoints: ['value', ''],
                    // 禁止点击节点出现contextPad
                    contextPadProvider: ['value'],
                    // 禁止双击节点出现label编辑框
                    labelEditingProvider: ['value', ''],
                    // 禁止拖动节点
                    move: ['value', '']
                }],
                bpmnRenderer: mode === 'read' ? {
                    defaultLabelColor: "#000",
                    defaultFillColor: '#eef4ff',
                    defaultStrokeColor: '#349afa'
                } : {},
                textRenderer: {
                    defaultStyle: {
                        fontFamily: '"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"',
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "20px",
                    }
                },
            });
            // 定位到中间
            bpmn.on("import.done", () => {
                const canvas: any = bpmn.get('canvas');
                canvas.zoom('fit-viewport', 'auto');
            });
            let data, executeNode: string[] = [], activeNode: string[] = [];
            if (typeof xml !== 'string') {
                data = xml.data;
                executeNode = xml.executeNode;
                activeNode = xml.activeNode;
            } else {
                data = xml;
                if (props.active) {
                    activeNode = props.active.activeNode || [];
                    executeNode = props.active.executeNode || [];
                }
            }

            // 点击事件
            const eventBus: EventBus = bpmn.get('eventBus');
            // 加载后绑定监听
            eventBus.on('element.click', ({ element }: { element: Element }) => {
                let excludes = false;
                if (props.excludeType) {
                    excludes = props.excludeType.some(item => element.businessObject.$type.endsWith(item));
                }
                if (!element.businessObject.$type.endsWith('Process') && !excludes) {
                    setNode(element);
                    const canvas: Canvas = bpmn.get('canvas');
                    const position = canvas.getGraphics(element.id).getBoundingClientRect();
                    if (props.onClick) {
                        const status = activeNode.includes(element.id) ? '待办' : executeNode.includes(element.id) ? '已完成' : '未执行';
                        setPopover({
                            ...popover,
                            status,
                            display: 'block',
                            width: position.width,
                            height: position.height,
                            title: element.businessObject.name || element.id,
                            top: position.y,
                            left: position.x,
                            noting: executeNode.includes(element.id),
                        });
                        setLoading(true);
                        // 判断是否是异步方法
                        props.onClick(element.id, element.type, element.businessObject).then((res) => {
                            setLoading(false);
                            setPopoverInfo(res);
                        });
                    }
                }
            });

            // 装载xml
            bpmn.importXML(data).then(() => {
                // 加载完成，加载节点样式
                if (mode === 'active') {
                    setNodeColor(executeNode, bpmn, props.active?.executeColor || 'success');
                    setNodeColor(activeNode, bpmn, props.active?.activeColor || 'process')
                }
            }).catch((err) => console.log("import xml error: ", err))
            // 及时销毁画布
            return () => bpmn && bpmn.destroy();
        }
    }, [xml]);

    const durationRender = (duration?: number) => {
        if (duration || duration === 0) {
            if (duration < 1000) {
                return <Tag color='success'>耗时：{duration}毫秒</Tag>
            } else if (duration >= 1000 && duration < 60 * 1000) {
                return <Tag color='success'>耗时：{duration / 1000}秒</Tag>
            } else if (duration >= 60 * 1000 && duration < 60 * 60 * 1000) {
                return <Tag color='success'>耗时：{(duration / (60 * 1000)).toFixed(0)}分钟</Tag>
            } else if (duration >= 60 * 60 * 1000 && duration < 24 * 60 * 60 * 1000) {
                return <Tag color='success'>耗时：{(duration / (60 * 60 * 1000)).toFixed(2)}小时</Tag>
            } else if (duration >= 24 * 60 * 60 * 1000) {
                return <Tag color='warning'>耗时：{(duration / (24 * 60 * 60 * 1000)).toFixed(2)}天</Tag>
            }
        }
        return <Tag color='processing'>待办</Tag>
    }

    const loadRequest = () => {
        if (props.request) {
            props.request().then((res) => {
                if (res) {
                    if (typeof res == 'string') {
                        setXml(res);
                    } else {
                        setXml(res);
                    }
                } else {
                    setXml(defaultXml);
                }
            });
        }
    }

    React.useEffect(() => {
        if (props.data || props.request) {
            if (props.data && props.request) {
                loadRequest();
            } else {
                if (props.data) {
                    setXml(props.data);
                }
                if (props.request) {
                    loadRequest();
                }
            }
        } else {
            setXml(defaultXml);
        }
    }, []);

    return <div id="easy-flowable-viewer" ref={containerRef}>
        <Popover placement="top" title={popoverInfo.title || popover.title} content={<Spin spinning={loading}>
            {(node && props.tipRender && props.tipRender(node.id, node?.type, node)) || <Descriptions style={{ maxWidth: '15vw' }} column={1}>
                <Descriptions.Item label="执行人">{popoverInfo.users}</Descriptions.Item>
                <Descriptions.Item label="节点状态">{popoverInfo.status || popover.status}</Descriptions.Item>
                <Descriptions.Item label="耗时">{popover.noting ? durationRender(popoverInfo.duration) : '-'}</Descriptions.Item>
                <Descriptions.Item label="开始时间">{popover.noting ? formatDate(popoverInfo.startTime) : '-'}</Descriptions.Item>
                <Descriptions.Item label="结束时间">{popover.noting ? formatDate(popoverInfo.endTime) : '-'}</Descriptions.Item>
            </Descriptions>}
        </Spin>}>
            <div id="popover" style={{
                width: `${popover.width}px`,
                height: `${popover.height}px`,
                display: `${popover.display}`,
                position: 'absolute',
                zIndex: 1000,
                top: `${popover.top}px`,
                left: `${popover.left}px`,
            }}></div>
        </Popover>
    </div>

}

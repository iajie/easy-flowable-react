import React from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { EasyFlowableViewer, xmlStr } from "./props";
import { EasyFlowableContextPad } from './modules'

/**
 * 设计器(流程图回显)
 * @param height
 * @param props
 */
export default ({ height = 50, ...props }: EasyFlowableViewer) => {

    const containerRef = React.useRef(null);
    const [modeler, setModeler] = React.useState<BpmnModeler>();
    const [xml, setXml] = React.useState<string | null>(null);

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
                    contextPadProvider: ['value', ''],
                    // 禁止双击节点出现label编辑框
                    labelEditingProvider: ['value', ''],
                    // 禁止拖动节点
                    move: ['value', '']
                }],
                keyboard: {
                    bindTo: document
                },
                bpmnRenderer: {
                },
                textRenderer: {
                    defaultStyle: {
                        fontFamily: '"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"',
                        fontSize: "14px",
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
            // 装载xml
            bpmn.importXML(xml).then(() => {
            }).catch((err) => console.log("import xml error: ", err))
            setModeler(bpmn);
            // 及时销毁画布
            return () => bpmn && bpmn.destroy();
        }
    }, [xml]);

    const loadRequest = () => {
        if (props.request) {
            props.request().then((res) => {
                if (res) {
                    setXml(res);
                } else {
                    setXml(xmlStr);
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
            setXml(xmlStr);
        }
    }, []);

    return <div id="container" ref={containerRef} />

}

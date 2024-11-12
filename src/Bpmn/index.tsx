/**
 * @Date: 2024-10-2 14:22:25
 * @Description: 组件入口
 * @Author: MoJie
 */
import React from "react";
import './index.less';
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { bpmnDefaultStyle, BpmnProps, xmlStr, Element } from "./props";
import Toolbar from "./components/Toolbar";
import PropertiesPanel from "./components/PropertiesPanel";
import { zhTranslateModule, EasyFlowableContextPad, EasyFlowablePopupMenu, EasyFlowablePalette } from "./modules";
import { ConfigProvider, theme } from "antd";
import zhCN from 'antd/locale/zh_CN';
import enCN from 'antd/locale/en_US';

/**
 * 自定义画布组件
 */
export default ({ height = 60, locale = 'zh-CN', align = 'default', bpmnStyle = {}, ...props }: BpmnProps) => {

    const containerRef = React.useRef(null);
    const [bpmnData, setBpmnData] = React.useState<any>();
    const [modeler, setModeler] = React.useState<BpmnModeler>();
    const [xml, setXml] = React.useState<string | null>(null);
    const [defaultElement, setDefaultElement] = React.useState<Element>();

    React.useEffect(() => {
        if (!!xml && containerRef.current) {
            const bpmn = new BpmnModeler({
                container: containerRef.current,
                height: `${height}vh`,
                additionalModules: [
                    locale == 'zh-CN' ? zhTranslateModule : {},
                    EasyFlowablePopupMenu,
                    EasyFlowableContextPad,
                    EasyFlowablePalette
                ],
                keyboard: {
                    bindTo: document
                },
                bpmnRenderer: {
                    defaultLabelColor: '#000',
                    defaultFillColor: '#eef4ff',
                    defaultStrokeColor: '#349afa'
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
                if (align === 'center') {
                    canvas.zoom('fit-viewport', 'auto');
                }
                const el = canvas.getRootElement();
                setDefaultElement(el);
            });
            // 装载xml
            bpmn.importXML(xml).then(() => {
                console.log("import xml success!")
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
                    setXml(xmlStr(props.flowKey, props.flowName));
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
            setXml(xmlStr(props.flowKey, props.flowName));
        }
    }, []);

    return <ConfigProvider locale={locale == 'zh-CN' ? zhCN : enCN} theme={{ algorithm: theme.defaultAlgorithm }}>
        <div style={{ width: "100%", position: 'relative' }}>
            {(modeler && props.toolbarRender !== false) && ((props.panelRender && props.panelRender(modeler)) ||
                <Toolbar {...props.toolbar} modeler={modeler} bpmnData={bpmnData} uploadXml={(xml) => setXml(xml)} />)}
            <div id="container" ref={containerRef} style={{ ...bpmnDefaultStyle, ...bpmnStyle }} />
            {(modeler && defaultElement && props.panelRender !== false) && ((props.panelRender && props.panelRender(modeler)) ||
                <PropertiesPanel {...props.panel} modeler={modeler} defaultElement={defaultElement} bpmnInfo={(data) => setBpmnData(data)} />)}
        </div>
    </ConfigProvider>
}

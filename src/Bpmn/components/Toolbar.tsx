/**
 * @Date: 2024-09-30 13:27
 * @Description: 顶部工具栏
 * @Author: MoJie
 */
import {
    DownloadOutlined,
    EyeOutlined,
    ImportOutlined,
    KeyOutlined,
    RedoOutlined,
    ReloadOutlined,
    SaveOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Modal, Popover, Space, Typography, Upload } from 'antd';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { downloadSvg, toolbarDefaultStyle, ToolbarProps } from '../props';
import { useSaveHotKeyFunction } from './Hooks';

const { Paragraph } = Typography;

const Toolbar: React.FC<ToolbarProps> = ({ modeler, save, style = {}, ...props }) => {
    const currentZoomValueRef = React.useRef<number>(1);
    const selectItemsRef: React.MutableRefObject<Array<any> | undefined> = React.useRef();
    const [shortcutKeysOpen, setShortcutKeysOpen] = React.useState(false);

    React.useEffect(() => {
        if (modeler) {
            const eventBus: any = modeler.get('eventBus');
            const listener = (e: { newSelection: Array<any> }) => {
                selectItemsRef.current = e.newSelection;
            };
            eventBus.on('selection.changed', listener);
            return () => {
                eventBus.off('selection.changed', listener);
            };
        }
    }, []);

    /**
     * 保存事件
     */
    const xmlSave = async () => {
        if (save) {
            const xmlResult = await modeler.saveXML({ format: true });
            const data: any = { ...props.bpmnData };
            // 更新流程信息
            if (xmlResult.xml) {
                data.xml = xmlResult.xml;
                if (props.isBase64) {
                    await downloadSvg(modeler, (str) => data.base64 = str);
                }
                await save(data);
            }
        }
    };

    const viewXml = async () => {
        const xmlResult = await modeler.saveXML({ format: true });
        if (xmlResult.xml) {
            Modal.info({
                title: <Paragraph copyable={{ tooltips: false, text: xmlResult.xml }}>XML源码预览</Paragraph>,
                width: '60%',
                footer: false,
                closable: true,
                icon: null,
                centered: true,
                content: (
                    <Editor
                        value={xmlResult.xml}
                        disabled
                        style={{
                            maxHeight: '500px',
                            overflow: 'auto',
                            scrollbarWidth: 'thin',
                        }}
                        onValueChange={() => {}}
                        highlight={(code) => Prism.highlight(code, Prism.languages.xml, 'xml')}
                    />
                ),
            });
        }
    };

    /**
     * 放大
     */
    function zoomIn() {
        currentZoomValueRef.current += 0.05;
        (modeler.get('canvas') as any).zoom(currentZoomValueRef.current, 'auto');
    }

    /**
     * 缩小
     */
    function zoomOut() {
        currentZoomValueRef.current -= 0.05;
        (modeler.get('canvas') as any).zoom(currentZoomValueRef.current, 'auto');
    }

    /**
     * 撤销
     */
    function undo() {
        (modeler.get('commandStack') as any).undo();
    }

    /**
     * 重做
     */
    function redo() {
        (modeler.get('commandStack') as any).redo();
    }

    const items: MenuProps['items'] = [
        {
            label: '下载为XML',
            key: 'xml',
            onClick: async () => {
                const xmlResult = await modeler.saveXML({ format: true });
                if (xmlResult.xml) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlResult.xml, 'text/xml');
                    const xml = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    const a = document.createElement('a');
                    a.download = `${props.title || 'easy-flowable'}.xml`;
                    a.href = `data:text/xml;charset=utf-8,${encodeURIComponent(xml)}`;
                    a.click();
                }
            },
        },
        {
            label: '下载为PNG',
            key: 'png',
            onClick: () => downloadSvg(modeler),
        },
        // {
        // 	label: '下载为BPMNB',
        // 	key: 'bpmn',
        // },
    ];

    /**
     * 按键监听
     */
    useSaveHotKeyFunction(xmlSave);

    return (
        <div style={{ ...toolbarDefaultStyle, ...style }}>
            <Modal
                title="快捷键"
                open={shortcutKeysOpen}
                width={'25%'}
                centered
                footer={
                    <Button type={'primary'} key="back" onClick={() => setShortcutKeysOpen(false)}>
                        好的
                    </Button>
                }
                onCancel={() => setShortcutKeysOpen(false)}
            >
                <ul>
                    <li>撤销：⌘ (Ctrl) + Z</li>
                    <li>重做：⌘ (Ctrl) + ⇧ (Shift) + Z</li>
                    <li>全选：⌘ (Ctrl) + A</li>
                    <li>删除: Delete (删除键)</li>
                    <li>保存：⌘ (Ctrl) + S</li>
                    <li>编辑文字: E</li>
                    <li>抓手工具: H</li>
                    <li>套索工具: L</li>
                    <li>空间工具: S</li>
                </ul>
            </Modal>
            <Space>
                <Space.Compact block>
                    <Popover content="快捷键">
                        <Button onClick={() => setShortcutKeysOpen(true)} icon={<KeyOutlined />} />
                    </Popover>
                </Space.Compact>
                <Space.Compact block>
                    <Popover content="放大">
                        <Button onClick={zoomIn} icon={<ZoomInOutlined />} />
                    </Popover>
                    <Popover content="缩小">
                        <Button onClick={zoomOut} icon={<ZoomOutOutlined />} />
                    </Popover>
                </Space.Compact>
                <Space.Compact block>
                    <Popover content="重做">
                        <Button onClick={redo} icon={<ReloadOutlined />} />
                    </Popover>
                    <Popover content="撤销">
                        <Button onClick={undo} icon={<RedoOutlined />} />
                    </Popover>
                </Space.Compact>
                <Space.Compact block>
                    <Popover content="导入xml文件">
                        <Upload
                            accept=".xml"
                            showUploadList={false}
                            onChange={({ file }) => {
                                if (file.status === 'done') {
                                    if (file.type === 'text/xml') {
                                        const reader = new FileReader();
                                        reader.readAsText(file.originFileObj as Blob);
                                        reader.onload = (e) => {
                                            if (e.target?.result) {
                                                props.uploadXml(e.target.result.toString());
                                            }
                                        };
                                    }
                                }
                            }}
                        >
                            <Button icon={<ImportOutlined />} />
                        </Upload>
                    </Popover>
                    <Popover content="预览">
                        <Button icon={<EyeOutlined />} onClick={() => viewXml()} />
                    </Popover>
                    <Dropdown menu={{ items }}>
                        <Button icon={<DownloadOutlined />}></Button>
                    </Dropdown>
                </Space.Compact>
                {save && (
                    <Popover content="保存更新">
                        <Button icon={<SaveOutlined />} onClick={() => xmlSave()} />
                    </Popover>
                )}
                {props.title ? (
                    props.title
                ) : (
                    <Button type="link" style={{ color: 'GrayText' }} size="large">
                        Easy-Flowable流程设计器
                    </Button>
                )}
            </Space>
        </div>
    );
};

export default Toolbar;

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
        save?: (xml: string, base64?: string) => Promise<void>;
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
        users?: () => Promise<Option[]> | Option[];
        /** 候选组列表，可以是角色、部门... */
        groups?: () => Promise<Option[]> | Option[];
    };
    /**
     * @description 自定义属性面板 @param modeler 设计器实例
     */
    panelRender?: ((modeler: BpmnModeler) => ReactNode) | false;
    /**
     * @description 流程key, flowabl部署会用到，一般就是模型key
     */
    flowKey?: string;
    /**
     * @description 流程名称：流程部署后显示的信息
     */
    flowName?: string;
    /**
     * @description 流程作者
     * @default easy-flowable
     */
    author?: string;
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
    save?: (xml: string, base64?: string) => Promise<any>;
    /** 样式 */
    style?: CSSProperties;
    /** 标题 */
    title?: ReactNode | false;
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
 * @param author
 * @returns
 */
export const xmlStr = (flowKey = 'easy-flowable-custom', flowName = '流程设计器', author = 'easy-flowable') =>
    `<?xml version="1.0" encoding="UTF-8"?>
<definitions id="definitions" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
    xmlns:flowable="http://flowable.org/bpmn"
    typeLanguage="http://www.w3.org/2001/XMLSchema"
    expressionLanguage="http://www.w3.org/1999/XPath"
    targetNamespace="http://www.flowable.org/processdef">
<process id="${flowKey}" name="${flowName}" isExecutable="true" author="${author}">
    <startEvent id="StartEvent_1y45yut" name="开始">
    <outgoing>SequenceFlow_0h21x7r</outgoing>
    </startEvent>
    <task id="Task_1hcentk">
    <incoming>SequenceFlow_0h21x7r</incoming>
    </task>
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="${flowKey}">
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
export const downloadSvg = async (modeler: any, isBase64?: (str: string) => Promise<void>) => {
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
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAACXBIWXMAAC4jAAAuIwF4pT92AAAQSUlEQVR4nO2bCXgT1b7A/5Ot2ZemSZu2adOFUtrSVbBla1hEBWXTspTlPi9eFMtVEHhyr3opFxUEBa6KIoqi+ERakfWxiZAqUkpLm0LTvWm6l6RpszV7Zt438cJ16Tbep8/nN7/v6zczyTkz//Obc86ccyZFMAwDkpFDIV0RgxRGEFIYQUhhBCGFEYQURhBSGEFIYQQhhRGEFEYQUhhBSGEEIYURhBRGEFIYQUhhBCGFEYQURhBSGEFIYQQhhRGENtLkNpsjqqmxQ4GiGBodI+sRCLgNAEAFAMdvpTC/BsO+ZvN4vJJ3953aC4AsSEsfhWKoj1pX34FoNDqnJEhgeuTRyblxcXLV70XIcAwpDEVR6v79p8uW5s5I5vJY4HU7MZ/PS7lZ2QxiPorQ2GL01IkiikjIQ2+o25AluTOmiURcLDQsyMBmM6t/K4X832TIPuyjg+fenD51bAqPz0ZwuXZrH94EUYnAh4SEy8Fm7KQ8NDMeRsdHIpmZo7HTp66+wmYzf7eyYChh585e31xyVb06UhEC39VEFHH2m0Db2EZhMBDQ680g4FFBJA3H5KECND6SQZmYEZRVePjMFXu/Y5q935ltNtuyjUZz9q9aol+YQYUZjZbpS3LGg9dHwWsXeFwOYLB4UFfXBlYXG6uq1EBtsxNrqm9API4eqkQWijFFCre+z8s78tmll9TqhjyPxyflclmG34krP4M+Jbu7e6kzlanQ0tgIsWPiAO/qVN9ooeJmB2K12gH1oSjNqkfqahwYl0tHAnjiw5MnJf/XqlWz+3k8FnDYTFMAk1H56xbnl2dQYUIBy6ttsYDNbMGq643ACKDDxEnJyJQJEeCw9OBJKFeLm6C0tB7cwDC8tnPa9tCwoFu/HzUDM6iwbGX62uPHVOdQl1X6ZN48jCcKBgxFQd/a4f++vrEHKmosmEIRDM21NYEdnT2xPxbWW3R+g6uzjePWd0vcRn2iW98Fbn2XkiGV6RL3FUb9XxT432XYcdjzG/dgeU8ogRcYAnZrL9htDujq8WEV5fUQT/0KkfWchHO3BMCZ9FzhE+ufWPj9vKUzkjBXR+tPzhkgC4dxl6qRkcRu19bnuDpbgZuQ0kYPlFz7NeUMxLAjfY5Q0nLqXGMkP0ALdLsFeuvLsSOn65CN2xdCZmwsuHSZcD9SCmfL9uf09eUmiES8u0MKVkS03tXRKqWLJSDMUqoY0lATQypTB4SGjyg47fa/HOv8aO88fJ8SwISEt4/ME06YemKoPC3NxmyXywvyCJGOxWa0DJauoU6f/cG+b/OqNd2jMAyjL1k+rnDJinFbhotpWGGb/rIk47ncJT3mEg0sppmhPj0YyZZZAXW6wcEcDcI4KnjsJphir4OPDp5fuXbdo+vv5GXKo4qgWJXDDIuE0TsPTB3uWj+GHRPfMeqVd/LpgUGG2rUr9nZ//vHawYRV3ezM+cPCgwU6rdF/vCpvkmrb7vkDXtPnQ8NzHtqvamvpA2kwD3oMNrj6dVNibJzEMi5TsXuomIadfFMoFGNEmlITkk0DE40K4NAD02aHjq+KIVAiAWAFg2h0FoTIeHDr0rFl38/LjPium+pvrIGatSsuV+be11w6PQkrm5kyop89chNTvuy9dCan4a9P7UWdDkCd9kHTvr7ty824LOX0OPVbBxbnL/vjvfmDpdXc6srCZaWmh+uPnXty3jMbp+3Fe6aD+4vnDOtjJIHPWTT/cX0zAlKGD1LrGDAOpYH7phowhApAoQKVwQFO6ChgmiulTodLcicfMyK6EN+i9n4wnj+utFaUKPD+yNn5037tx6Bud3j16kXH+2tvJUY+80I+3u9R2JxB06emy8/j27ra26kuh5c/ekzIoLMNr8fn36rL26UT03Ye3/3qV3n4cWODQTlcXEM2yW9UpU/Zao/vpUQ8uJNCV5hu9VqF8VI3tHAp4NE5oKpaD4mhbugyuOFavRi4QjtsePYtfc6i6ZpRsWGFVFHI3XNJ5+UW8pLv0TCkMmAEy1QYikoQCmXQQa3lxtUs/Kkqvm+Oxt1zW+gx9QKVzR001ry12dsZDGrAvje+Xrp+zefPtrX1Rb+4ddb8gdKGR4j0/q1cCKvWTM4XB3HBanGmWswO4XDCBqxhfX3W8MMHPqnSlp7cW37LANNnZr0xZfnyPYxMCvTcRwO9jA4hNDd8fVULGIbCt2oTzJsVC39/QQnrHuyEotPH+MJA3ttBCYnn75xTNPm+YtmSx7eIp8/ewoqIBoe2bsi7yR2bUcyKjtMbvzyZ2L5/11rUYQcqZ3BhZrMzJi1DXpQ9PU6NH7dojYMWXhrMKwqW8eH2bSuw2AywmB38N1+/POHVly4o7XZ3wlBxDVjDvjx/fWVCUHtiuxuF/kC+zm538sViYci5LgWUnbFBFMcB64Rd0GR14yMTmJzKg71vF0FbixkSpk6DvOxm+RcfvF+wbM2aqTS+ELwWE7T8Y+um1r3bduG1xmezApXDg6yyjkGHFjQurz3t+NU4h64xNSAkTGdvrFXQBCLmYOn/9tzJFz47VDYb32dzGLBoWcbBoQr+9Pqpe17YeHLtxj8f9fd1dDoVtmx7qJDNZgy5cDDgOOzkiSvr6O1Hd93ucUFiqA28ASHwzbfNIKcYYYpcB842C9w4iYL2PzbChlwulH11CQLMtVCqsYM7fRO2ekY3cuLUTaCmbHhWuOfJXdTbAz/dM0talTS+sGioAEeKTmvMbGowyAOYNLw/K+byAtqHy9pYp89RXaqfhfowzrSZo/fGxkmHjWVAYUajJaGy6NTLt66Xz+Px2KoYBR9ulDWmxvSWC1N8LcBWOOBiCR+QBS/CwklWwNwWKClphj43H8JkbEiJ44KuphbUAasXpndcmeU16hX0ICnefxkCpDIDI1j2XV8WFPyzZGHePgG4DamYxwDgNQPm61dSeGmFCCv2F19WGrBJisX86mkLls6ftmDp3c8amlfdHsdqgr4yGrTW0UHdwoGlz3EBQ3uBQqECQqHDpRIj7NggBpetF+xuBAJlfFA88vxjPzc41FaRg/VXA+ZoysEcjYA5m2aBq50DlAAArxUfUf0zJQIQ+SKfGrZm/TCn/LcZ0Zq+pqo5p/V6jbQrCCAwmQKVH6PgGJ0EiTFMQEwe8HlcEMusB5tFDB+f6ASLkw4+7njVM8uSR7R0jfZXp2D9lRMxR+Mo8DnCAHP5AEN5QGU3gK8/FfOaAXw2CYIwOBhdDODuBqDxAKGH4KNjDcKKKwWf3eLVbd4MqIsJmDcTMM8/XdKdgNCvAYUFCI0HQBUA0EQGhC7WAF0MCCNUh9BFg84Ifsywc8m+XmvCq1t3v/9Y3AdZglYToAKAt3ZyYca+v0H2KD0gmAccvZ1w9fQFsE355NmkxKjysPAgF5vNHHbeh1quZWP2mjkIXXINYce3IazYa5i9PtzX8Y9dqLUsB5w6vAH+KwNCA2DIAAkIVyEB4QagBwFC5QPQ+Cqg8g0IlQ1A4YC/Bv4YzAeAuQFQl3+Lof/aR+jSmQhn7H6EFVU6XMxD1jBNVXN22VfHVQ9n0uGGdhF01tSA8VolqGMmwAN2HQBKB6e5GyzacjivjYPlK0LKo2NC1VQqxTzchXEo/MwiwP++B4Y6YhBmtIbKScZrgAmhS9RAlwDCkOgQumTENYEghSNNPmQN27X9w4JVk2pz3t33NcRG0GH6tHjododBe6cJ6uq6YfksAVh1avjvyz3wxbV4GKtXA5owTr9832trkpJjRhzE/yeGnBpx+Xy9vg8Fg3CuRqftgqMfnoCSgk8hVH8UFM4roL9xDs6W0U0RSw/tHWtuhLmhAPfpS6QHp84s+Hve9j5dc9fm7q6euX29luzNm05dXjLvwOV1qwsv4ysKmWNf9d8pr9cnsZgdKeB/peeL9Lh9kS6XN8XnQyUOh8f/PsDp8ERaLU7/gPK1ly8UnD1VtflOjMpxr2P4yoM/ndPzk0HnoQPXdj+96sjlv64/fqyz3ZRts7kiewy2u+8ZHHa3/9ooigrwWO583mOwpXz/+A4DNsnubmPmla9vLosbE13UVH81L43zTWLQ3MP5xQUn7y/74ousshQK0CgYfF7OAB+bLxx75r28Savj4di7TfCIyASZjD6oOrJPeCk2IvGP63L9SybXi3XKZY/dm581Maoar9QOhwcvoGRCyg6914vCf74wcxeLTbeoLjbcX1vdHbNi5b1Fn3x4PfvUxaemKsfv0uArCmdUa5S9vXZYmXsof8YD8Ss/OPyHDPw8eCtZ/dinrcVXtPJxmQrNe4eWJd0pS9XNzlRxEMdQV3M7ofDT8jwfimpe33YxP3NClP7o2SeClz364Z6Sb5uVgWIOoBgG1zWbEpOjt2rwvAsWphXueGPBD9b4flLDdq/ZcuzlpbnF3J25ec4dKwounaiGpLRooKhfyqeiNtfDmzaoni+4plxzQDVv6uLHCxcsSDfFjFFAf+QjqoDFK6+bgmkQJeXAzBCA9v1bc26V35x799zbL+a/+tKFgjvHLc3GBD6fCfs/XjbvzMmqZanpctXZU1VZtZpu6bYt53OS08KuMgJo1Q8+nKiSR4igsqLdP53a+eYjeyputMsb6m7frVHHCtXy8VkKjbaxJxE/rqxoz+7qNPu/v3CmJru8tDUs9R65X8Qb+xcttJgd9s52Uw5+vHXnnMLZc5NUNCoFujrNErfbCy/tnKPCb9KwNSwoOqrjnooDUEMLgfHtffCYsh6OrLsJPRlpQK89pRSdLQDtlPHp4+9N2B3556d/sDaF34p3ttovc26/rxRV+CAp2QyGanUqpCf70+16J0c5ZeqoIp3W6G8SYjHX0KLrxZvNyxGKwKKYUZIiBEFgwaI0zScfliTeOyFK3dRgyFFdrE+QhQnaHPbvhgrvv3Ml1+Xy4JPou5P3sDAhRCrEFtSH+SfWFaVteakZ4cX4fmycpCmASYtpb+3j4/P6p//0WcG4TIU+NFyI97NPUakUAAQBGp0CGPpdn47HMRDU/PwfLhslZCR8e7mDEYOpryf2udzgbKbAaLkX5B1GSAnkAgvzwmmrKJwj4Em0TZ3K3l6rQiIRdFKoFP9i1bjsyR91CJTVTREiSZ9wduk906YWtrUZFDQajSMJZnrYLApTKOLpomOCTGn3yD/PnBhl4AtYuj/lTdrCYNDso8cEw+x5SW+npMl10+8ffTAkVNCAzw0zxkdcSM2Ql8aOkrTEjwnRbd3xcJ5QxK7GRY0ZK1PNX5j2qdnkoDzwUOJ7oeHCutQMeWFIqOCaQMgCUSDb+Oji9MJZc5J2FF/RKh+en6x65fW5SxEEceE1PCk5tDJSEagZmxqmHpsSpgoNF5rGZ0WpFFGBlVExQT+YPQz6lOxo1yd88f7RfH2RKsfd1gI0px1MCBNYEZH6mMWLi2ThEv+rNy6XBfJwSbEiSvYJkxXwm38HefhQ6WZZqKBaOT3uZz3Fyf/5Jgj5+zCCkMIIQgojCCmMIKQwgpDCCEIKIwgpjCCkMIKQwghCCiMIKYwgpDCCkMIIQgojCCmMIKQwgpDCCEIKIwgpjCCkMIKQwghCCiMCAPwPTmnYI2NMkP0AAAAASUVORK5CYII=';
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

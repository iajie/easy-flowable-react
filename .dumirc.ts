import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
	outputPath: 'docs-dist',
	/**
	 * @desc 解决demo中引用easy-flowable报错问题
	 * @param memo
	 */
	chainWebpack(memo: any) {
		memo.resolve.alias.set('easy-flowable/react', '/src');
	},
    alias: {
        'dumi-theme-antd-style': path.join(__dirname, '/node_modules/dumi-theme-antd-style-nbb'),
    },
    html2sketch: {},
    styles: [
        `html, body { background: transparent;  }
        @media (prefers-color-scheme: dark) {html, body { background: #0E1116; }}`,
    ],
    locales: [
        { id: 'zh-CN', name: '简体中文' },
        { id: 'en-US', name: 'EN' },
    ],
	themeConfig: {
        lastUpdated: true,
		// 源码链接
		socialLinks: {
			github: 'https://github.com/iajie/easy-flowable.git'
		},
		// 显示代码行号
		showLineNum: true,
		// 主题
		prefersColor: { default: 'light', switch: false },
		// 项目名称
		logo: '/logo.png',
        name: 'Easy-Flowable',
        footer: 'Easy-Flowable <a target="_blank" href="https://beian.miit.gov.cn">黔ICP备2022008298号</a></span>',
        footerConfig: {
            copyright: 'Copyright © 2024',
            columns: [
                {
                    title: '前端相关资源',
                    items: [
                        {
                            title: 'Ant Design',
                            url: 'https://ant.design',
                            openExternal: true,
                        },
                        {
                            title: 'Ant Design Pro Components',
                            url: 'https://procomponents.ant.design',
                            openExternal: true,
                        },
                    ]
                },
                {
                    title: '设计器相关资源',
                    items: [
                        {
                            title: 'BpmnJs',
                            url: 'https://bpmn.io/toolkit/bpmn-js/',
                            openExternal: true,
                        },
                        {
                            title: 'react-simple-code-editor',
                            url: 'https://www.npmjs.com/package/react-simple-code-editor',
                            openExternal: true,
                        },
                    ]
                },
                {
                    title: '后端资源',
                    items: [
                        {
                            title: 'flowable',
                            url: 'https://www.flowable.com/',
                            openExternal: true,
                        },
                        {
                            title: 'solon',
                            url: 'https://solon.noear.org/',
                            openExternal: true,
                        },
                    ]
                }
            ]
        },
	},
});

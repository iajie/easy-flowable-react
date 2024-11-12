import { defineConfig } from 'dumi';

export default defineConfig({
	outputPath: 'docs-dist',
	/**
	 * @desc 解决demo中引用easy-flowable报错问题
	 * @param memo
	 */
	chainWebpack(memo: any) {
		memo.resolve.alias.set('easy-flowable/react', '/src');
	},
    locales: [
        { id: 'zh-CN', name: '简体中文' },
        { id: 'en-US', name: 'EN' },
    ],
	themeConfig: {
		// 源码链接
		socialLinks: {
			github: 'https://github.com/iajie/easy-flowable.git'
		},
		// 显示代码行号
		showLineNum: true,
		// 主题
		prefersColor: { default: 'light', switch: false },
		// 项目名称
		logo: '/logo2.png',
		footer: 'Copyright © 2024 Easy-Flowable <a target="_blank" href="https://beian.miit.gov.cn">黔ICP备2022008298号</a>'
	},
});

---
title: '组成'
nav:
  title: 项目说明
  order: 3
---

## 项目构成

<Tree>
  <ul>
  	<li>easy-flowable-react <small>前端组件(React+Doc文档)</small>
  	<li>easy-flowable-vue <small>前端组件(Vue2版本)</small>
  	<li>easy-flowable-vue3 <small>前端组件(Vue3版本)</small>
  	<li>easy-flowable-ui-admin <small>ui模块控制台页面(React+UmiJs)</small>
	<li>easy-flowable <small>后端模块</small>
	<ul>
		<li>easy-flowable-boot-starter <small>SpringBoot启动器</small>
		<li>easy-flowable-boot3-starter <small>SpringBoot3启动器</small>
		<li>easy-flowable-core <small>easy-flowable核心包，提供一些便携的流程api</small>
		<li>easy-flowable-solon-plugin <small>适配solon的插件，与springboot一样的api</small>
		<li>easy-flowable-ui-designer <small>easy-flowable控制台(SpringBoot)，引入依赖即可使用，提供一些模型接口/部署等</small>
		<ul>
			<li>src/main <small>源码文件夹</small>
				<ul>
					<li>java/com/superb/esayflowable/ui <small>源码</small>
					<li>resources/static/flowable <small>控制台页面(由前端项目easy-flowable-ui-admin打包后得到)</small>
			<li>pom.xml <small>依赖文件</small>
  </ul>
</Tree>
---
title: 前端组件
order: 1
---

## EasyFlowable
> `EasyFlowable`是基于 `Ant Design` + `bpmn.js` 而开发的流程设计器组件，提供了更高级别的组合支持，开箱即用。可以显著地提升流程设计整合进度，更加专注于业务。

## API
<Badge type="warning">所有以 Render 为后缀的方法都可以通过传入 false 来使其不渲染。</Badge>
|            属性名          |               描述               |    类型    |         默认值              |
|--------------------------------------------------------|---------------------------------|------------|-----------------------------|
| data | 画布字符串 | string | - |
| request | 异步方法，如果你的数据需要网络请求，<br>那么你可以使用该方法，如果使用该方法会覆盖data | `() => Promise<string>` | - |
| height | 设计器高度 | `number` | `60` |
| bpmnStyle | 设计器样式 | `CSSProperties` | - |
| toolbarStyle | 设计器顶部工具栏样式 | `CSSProperties` | - |
| align | 设计器打开时所在位置,默认在左上角 | `center` | default&nbsp; |
| toolbar | 顶部工具栏属性 | [ToolbarProps](#toolbarprops) | - |
| toolbarRender&nbsp; | 工具栏自定义渲染 | `(modeler) => dom` 丨 `false` | - |
| panel | 节点属性操作面板 | [PanelProps](#panelprops) | - |
| panelRender | 工具栏自定义渲染 | `(modeler) => dom` 丨 `false` | - |
| flowKey | 流程key, flowabl部署会用到，一般就是模型key | `string` | - |
| flowName | 流程名称：流程部署后显示的信息 | `string` | - |
| author | 流程作者 | `string` | - |

### ToolbarProps
<Badge type="warning">顶部工具栏</Badge>
|            参数          |               说明               |    类型    |         默认值              |
|-------------------------|---------------------------------|------------|-----------------------------|
| save | 保存方法，会作用与Ctrl+S | `(data: SaveProps) => Promise<void>`[SaveProps](#saveprops) | - |
| isBase64 | 是否保存base64信息 | `boolean` | `false` |
| style | 设计器顶部工具栏样式 | `CSSProperties` | - |
| title | 设计器标题(顶部文字) | `dom` | `Easy-Flowable流程设计器` |

### PanelProps 
<Badge type="warning">属性操作面板</Badge>
|            参数          |               说明               |    类型    |         默认值              |
|-------------------------|---------------------------------|------------|-----------------------------|
| attrPrefix | 节点前缀，可适配activty | `string` | `flowable:` |
| style | 属性操作面板样式 | `CSSProperties` | - |
| width | 抽屉宽度 | `number 丨 string` | - |
| users | 用户列表(用户自定义) | `option[]` 丨 `() => Promise<option[]>` | - |
| groups | 候选组(可以是角色、部门...) | `option[]` 丨 `() => Promise<option[]>` | - |

### SaveProps
<Badge type="warning">保存参数</Badge>
|            参数          |               说明               |    类型    |
|-------------------------|---------------------------------|------------|
| xml | 设计器数据 | `string` |
| base64 | 设计器缩略图base64编码，默认不会返回， | `string` |
| name | 流程模型名称，当编辑设计器基础面板信息后会返回 | `string` |
| description | 设计器描述，当编辑设计器基础面板信息后会返回 | `string` |
| author | 流程作者, 当编辑设计器基础面板信息后会返回 | `string` |

### option
<Badge type="warning">列表属性</Badge>
|            参数          |               说明               |    类型    |
|-------------------------|---------------------------------|------------|
| label | 列表显示值 | `string` |
| value | 实际值(userId/organId) | `string` |

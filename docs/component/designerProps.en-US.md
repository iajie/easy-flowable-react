---
title: 'Designer'
nav:
  title: Components
  order: 2
---

## EasyFlowable
> `EasyFlowable`It is based on `Ant Design` + `bpmn.js` The developed process designer 
> component provides higher-level combination support and is ready to use out of the box. 
> It can significantly improve the integration progress of process design and focus more on business.

## API
<Badge type="warning">All methods with the suffix 'Render' can be rendered without rendering by passing false.</Badge>
|            parameter          |               description               |    type    |         default              |
|--------------------------------------------------------|---------------------------------|------------|-----------------------------|
| data | Canvas string | string | - |
| request | Asynchronous method, if your data requires network requests, <br/>you can use this method, which will overwrite the data | `() => Promise<string>` | - |
| height | Designer height (screen visible height)  | `number` | `60` |
| bpmnStyle | Designer Style | `CSSProperties` | - |
| toolbarStyle | Top toolbar style of designer | `CSSProperties` | - |
| align | When the designer is opened, it is located in the top left corner by default | `center` | default&nbsp; |
| toolbar | Top toolbar properties | [ToolbarProps](#toolbarprops) | - |
| toolbarRender&nbsp; | Custom rendering of toolbar | `(modeler) => dom` 丨 `false` | - |
| panel | Node Attribute Operation Panel | [PanelProps](#panelprops) | - |
| panelRender | Custom rendering of toolbar | `(modeler) => dom` 丨 `false` | - |

### ToolbarProps
<Badge type="warning">Top Toolbar</Badge>
|            parameter          |               description               |    type    |         default              |
|-------------------------|---------------------------------|------------|-----------------------------|
| save | The preservation method will have an impact on Ctrl+S | `(data: SaveProps) => Promise<void>`[SaveProps](#saveprops) | - |
| isBase64 | Do you want to save the base64 information | `boolean` | `false` |
| style | Top toolbar style of designer | `CSSProperties` | - |
| title | Designer Title (Top Text) | `dom` | `Easy-Flowable Process Designer` |

### PanelProps
<Badge type="warning">Attribute operation panel</Badge>
|            parameter          |               description               |    type    |         default              |
|-------------------------|---------------------------------|------------|-----------------------------|
| attrPrefix | Node prefix, adaptable activty | `string` | `flowable:` |
| style | Attribute operation panel style | `CSSProperties` | - |
| width | Drawer width | `number 丨 string` | - |
| users | User List (User defined) | `option[]` 丨 `() => Promise<option[]>` | - |
| groups | Candidate groups (can be roles, departments, etc.) | `option[]` 丨 `() => Promise<option[]>` | - |

### SaveProps
<Badge type="warning">Save parameters</Badge>
|            parameter          |               description               |    type    |
|-------------------------|---------------------------------|------------|
| xml | Designer Data | `string` |
| base64 | Designer thumbnail base64 encoding, default not returned | `string` |

### option
<Badge type="warning">Lists Properties</Badge>
|            parameter          |    type    |
|-------------------------|------------|
| label | `string` |
| value | `string` |

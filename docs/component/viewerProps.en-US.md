---
title: 'Viewer'
order: 2
nav:
  title: Components
  order: 2
---

## EasyFlowableViewer Components
> `EasyFlowableViewer`It is based on `Ant Design` + `bpmn.js` And the developed flowchart preview component。

## API
|            parameter          | description                                          | type                                                                 | default |
|--------------------------------------------------------|---------------------------------------------|----------------------------------------------------------------------|---------|
| data | Canvas string                                       | string                                                               | -       |
| request | Asynchronous method, if your data requires network requests, <br/>you can use this method, which will overwrite the data | `() => Promise<string 丨 NodeType>`                                   | -       |
| height | Designer height (screen visible height)                               | `number`                                                             | `60`    |
| mode | Display mode, read for single display in designer style, active for flowchart mode            | `read`丨`active`                                                      | `read`  |
| active | Process diagram mode                                       | [ActiveProps](#ActiveProps)                                          | -       |
| excludeType | Exclude node types, if you add<br/>, clicking on a node will not pop up a dialog box                       | `string[]`                                                           | -       |
| onClick | Click on the flowchart node to trigger an event                                 | `(id: string, type?: string, node?: any) => Promise<PopoverContent>` | -       |
| tipRender | Click on the flowchart node to customize the pop-up box content                             | `(id: string, type?: string, node?: any) => ReactNode`               | -       |

### NodeType

:::warning{title=Tips}
To make ActiveNode and ExecuteNode effective, mode="active" needs to be set
:::

|     parameter      | description      | type        | default |
|--------------|---------|-----------|---------|
| data | xml | string    | -       |
| activeNode | Activate Node    | string[]  | -       |
| executeNode | Executable Node    | string[]  | -       |

### ActiveProps
:::warning{title=Tips}
To make ActiveNode and ExecuteNode effective, mode="active" needs to be set And it will be 
overwritten by the asynchronous results returned by the request
:::

|     parameter      | description           | type                                    | default       |
|--------------|-----------------------|---------------------------------------|-----------|
| activeColor | Activate node color   | `success丨process丨danger丨warning丨cyan丨purple` | `process` |
| activeNode | Activate Node         | string[] | -         |
| executeColor | Executable node color | `success丨process丨danger丨warning丨cyan丨purple` | `success` |
| executeNode | Executable Node                  | string[] | -         |

### PopoverContent

| parameter | description     | type         | required   | default                         |
|-----|--------|------------|---------|-----------------------------|
| title | Pop up box title  | `string`   | `false` | Node names in the flowchart                     |
| users | Node executor  | `string[]丨ReactNode` | `true`  | -                           |
| status | node status   | `string丨ReactNode` | `false` | Flowchart ExecutionNode and ActiveNode Status |
| startTime | Task start time | `string丨Date` | `false` | -                           |
| endTime | Task end time | `string丨Date` | `false` | -                           |
| duration | Task time consumption | `number` | `false` | -                           |

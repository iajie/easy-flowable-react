# easy-flowable-react

[![NPM version](https://img.shields.io/npm/v/easy-flowable-bpmn.svg?style=flat)](https://npmjs.com/package/easy-flowable-react)
[![NPM downloads](http://img.shields.io/npm/dm/easy-flowable-bpmn.svg?style=flat)](https://npmjs.org/package/easy-flowable-react)

快速搭建属于自己的流程引擎
> 官网：https://easy-flowable.online

## Usage

TODO

## Options

TODO

## Development

```bash
# install dependencies
$ npm install easy-flowable-react
```

## 流程设计器
<img src="https://gitee.com/iajie/easy-flowable-react/raw/master/public/designer.png" alt="流程设计器"></img>
```tsx
import { EasyFlowable } from 'easy-flowable-react';

export default () => {
    return <EasyFlowable
        toolbar={{
            save: async (data) => {
                console.log(data);
            },
            isBase64: true
        }}
    />;
};
```
## 流程图
<img src="https://gitee.com/iajie/easy-flowable-react/raw/master/public/viewer.png" alt="流程图"/>
```tsx
import { EasyFlowableViewer } from 'easy-flowable-react';

export default () => {
    return <EasyFlowableViewer data={xml}/>;
};
```

## LICENSE

MIT

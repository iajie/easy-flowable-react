# easy-flowable-react

[![NPM version](https://img.shields.io/npm/v/easy-flowable-bpmn.svg?style=flat)](https://npmjs.com/package/easy-flowable-react)
[![NPM downloads](http://img.shields.io/npm/dm/easy-flowable-bpmn.svg?style=flat)](https://npmjs.org/package/easy-flowable-react)

快速搭建属于自己的流程引擎

## Usage

TODO

## Options

TODO

## Development

```bash
# install dependencies
$ npm install easy-flowable-react
```

```tsx
import { EasyFlowable } from 'easy-flowable-react';
import React from 'react';

export default () => {

    /**
     * 常量字符串
     */
    const users = [
        {
            "label": "easy-flowable",
            "value": "01"
        },
        {
            "label": "甲",
            "value": "123"
        },
        {
            "label": "乙",
            "value": "124"
        },
        {
            "label": "丙",
            "value": "125"
        },
        {
            "label": "丁",
            "value": "126"
        }
    ];

    /**
     * 异步方法获取
     */
    const groups = async () =>{
        return [
            {
                "label": "easy-flowable业务部",
                "value": "220"
            },
            {
                "label": "easy-flowable商务部",
                "value": "221"
            },
            {
                "label": "easy-flowable研发部",
                "value": "222"
            }
        ];
    }

    return <EasyFlowable
        panel={{
            users,
            groups,
        }}
        toolbar={{
            save: async (data) => {
                console.log(data);
            },
            isBase64: true
        }}
    />;
};
```
## LICENSE

MIT

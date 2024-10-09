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

```js
import { EasyFlowable } from "easy-flowable-react";

export default () => {
    return <EasyFlowable height={90} toolbar={{ save: async (data) => {
        console.log(data)
    }}} />
}
```
## LICENSE

MIT

---
title: '快速开始'
toc: content
token:
    contentMaxWidth: 1280
nav:
    title: 前端组件
    order: 3
---

## React整合

:::code-group
```bash [npm]
npm install easy-flowable-react
```

```ts [设计器] {3}
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

```ts [流程图] {3}
import { EasyFlowableViewer } from 'easy-flowable-react';

export default () => {

    return <EasyFlowableViewer data='这里是设计器xml' />
};
```
:::

## Vue3整合(开发中)

:::code-group
```bash [npm]
npm install easy-flowable-vue3
```

```html [设计器] {3}
<template></template>
<script>

</script>
```

```html [流程图] {3}
<template>

</template>
<script>

</script>
```
:::

## Vue2整合(开发中)

:::code-group
```bash [npm]
npm install easy-flowable-vue
```

```html [设计器] {3}
<template>
    <easy-flowable height="81" toolbar-base64 v-model="xml" @save="save"/>
</template>
<script>
import { EasyFlowable } from 'easy-flowable-vue';
export default {
    components: {
        EasyFlowable
    },
    data() {
        return {
            xml: '',
        }
    },
    methods: {
        save(data) {
            console.log(data)
        }
    }
}
</script>
```

```html [流程图] {3}
<template>
    <easy-flowable-viewer height="81" :data="xml"/>
</template>
<script>
import { EasyFlowableViewer } from 'easy-flowable-vue';
export default {
    components: {
        EasyFlowableViewer
    },
    data() {
        return {
            xml: '',
        }
    }
}
```
:::

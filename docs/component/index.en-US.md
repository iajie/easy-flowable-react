---
title: 'Quick start'
token:
    contentMaxWidth: 1280
nav:
    title: Components
    order: 3
---

### React

:::code-group
```bash [npm]
npm install easy-flowable-react
```

```ts [Designer] {3}
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

```ts [Viewer] {3}
import { EasyFlowableViewer } from 'easy-flowable-react';

export default () => {

    return <EasyFlowableViewer data='This is xml' />
};
```
:::

### Vue3

:::code-group
```bash [npm]
npm install easy-flowable-vue3
```

```vue [Designer] {3}
<template></template>
<script>

</script>
```

```vue [Viewer] {3}
<template>

</template>
<script>

</script>
```
:::

### Vue2

:::code-group
```bash [npm]
npm install easy-flowable-vue
```

```vue [Designer] {3}
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

```vue [Viewer] {3}
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

---
sidebar: false
title: Designer Demo
order: 1
---

```tsx
import React from 'react';
import { useLocale } from 'dumi';
import { groups, users } from "./index";
import { EasyFlowable } from 'easy-flowable-react';

export default () => {

    const locale = useLocale();
    
    return <EasyFlowable height={70} locale={locale.id}
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

:::warning{title=tip}
In the designer, data/request can be passed to the designer, 
and the data needs to be XML data in the BPMN2.0 specification.
In both toolbar and panel custom rendering, designer instances are returned, 
which can be customized to implement many functions.
If you need to save the operation, you can use the save method in the toolbar, 
which will return XML, thumbnail, and model information!
:::

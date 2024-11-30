import React from 'react';
import { useLocale } from 'dumi';
import { groups, users } from "./index";
import { EasyFlowable } from 'easy-flowable-react';

export default () => {

    const locale = useLocale();

    return <EasyFlowable
        locale={ locale.id as 'zh-CN' | 'en-CN' }
        panel={{ users, groups, }}
        flowKey="sefw322"
        flowName="12323"
        toolbar={{
             save: async (data) => {
                 console.log(data);
             },
             isBase64: true
        }}
    />;
};

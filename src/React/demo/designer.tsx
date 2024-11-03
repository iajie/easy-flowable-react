import { EasyFlowable } from 'easy-flowable-react';
import React from 'react';
import { groups, users } from "./index";

export default () => {

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

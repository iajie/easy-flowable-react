import { EasyFlowable } from 'easy-flowable/react';
import React from 'react';

export default () => {
    return (
        <EasyFlowable
            toolbar={{
                save: async (xml, base64) => {
                    console.log(xml);
                    console.log('base', base64);
                },
                isBase64: true,
            }}
        />
    );
};

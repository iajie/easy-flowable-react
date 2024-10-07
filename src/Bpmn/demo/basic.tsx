import { EasyFlowable } from 'easy-flowable-react';
import React from 'react';

export default () => {
    return (
        <EasyFlowable
            toolbar={{
                save: async (data) => {
                    console.log(data);
                },
                isBase64: true,
            }}
        />
    );
};

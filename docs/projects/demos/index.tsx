import React from 'react';
// @ts-ignore
import { DumiSiteProvider, Features } from 'dumi-theme-antd-style';
import { Flexbox } from 'react-layout-kit';

import { authorItems } from './config';

export default () => <DumiSiteProvider>
    <Flexbox padding={24}>
        <Features items={authorItems} />
    </Flexbox>
</DumiSiteProvider>

import React from 'react';
import { xmlStr } from './defaultXml';
import { EasyFlowableViewer } from 'easy-flowable-react';

export default () => {

    return <EasyFlowableViewer request={ async () => xmlStr} />;
};

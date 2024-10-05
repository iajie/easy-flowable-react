import React from 'react';
import { EasyFlowable } from 'easy-flowable/react';

export default () => {
  return <EasyFlowable toolbar={{
    save: async (xml) => {
      console.log(xml);
    },
  }} />
}
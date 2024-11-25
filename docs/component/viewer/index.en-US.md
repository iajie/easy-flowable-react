---
sidebar: false
title: Viewer Demo
order: 3
---

```tsx
import React from 'react';
import { xmlStr } from './index';
import logo from '/public/logo.png';
import { EasyFlowableViewer } from 'easy-flowable-react';
import { Avatar, Card, Popover, Space, Tag } from "antd";

export default () => {

    return <EasyFlowableViewer
        excludeType={['SequenceFlow']}
        onClick={async (id, type, node) => {
            const date = new Date();
            const startTime = '2024-11-02 19:54:16';
            const duration = date.getTime() - Date.parse(startTime);
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                users: <Space>
                    <Tag>Easy-Flowable</Tag>
                    <Popover
                        title="executor"
                        content={<Card title={false}>
                            <Avatar src={logo}/>
                            <span>email：easyflowable@yeah.net</span><br/>
                            <span>phone：00000001</span><br/>
                            <span>Position: R&D Department</span><br/>
                            <span>Role: Architect</span>
                        </Card>}>
                        <Tag color="warning">9527</Tag>
                    </Popover>
                </Space>,
                startTime,
                endTime: date,
                duration,
            }
        }}
        mode="active"
        request={ async () => {
            return {
                data: xmlStr,
                activeNode: ['Activity_152du67'],
                executeNode: ['StartEvent_1y45yut', 'SequenceFlow_0h21x7r', 'Task_1hcentk',
                    'Flow_1sud6d3', 'Gateway_02pc6yy', 'Flow_0tzppyn']
            };
    }} />;
};
```

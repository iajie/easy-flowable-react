---
sidebar: false
title: 流程图Demo
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
        excludeType={['SequenceFlow']} // 条件不展示
        onClick={async (id, type, node) => {
            const date = new Date();
            const startTime = '2024-11-02 19:54:16';
            const duration = date.getTime() - Date.parse(startTime);
            // 休眠0.5s体现异步
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                users: <Space>
                    <Tag>Easy-Flowable</Tag>
                    <Popover
                        title="执行人"
                        content={<Card title={false}>
                            <Avatar src={logo}/>
                            <span>邮箱：easyflowable@yeah.net</span><br/>
                            <span>电话：00000001</span><br/>
                            <span>岗位：研发部</span><br/>
                            <span>角色：架构师</span>
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

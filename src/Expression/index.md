---
title: 表达式
order: 3
toc: content
---

## 条件表达式
<Badge type="info">条件表达式主要用于流程控制，允许根据变量的值来决定流程的走向，以下是一个使用案例：</Badge>
- variables(全局变量)可以简写为vars
- variable(局部变量)可以简写为var
1. 相等判断
```js
${vars:get(age) == 18}
${age == 18}
${var:eq(age, 18)}
```
2. 判断变量是否包含任意一个值
```js
${var:contains(list, 18, 24)}
${var:containsAny(list, 18, 24)}
```
3. 是否为空判断
```js
${var:empty(str)} // 判断字符串是否为空
- ${var:isNotEmpty(str)} // 判断字符串是否为不为空也可以=${!var:empty(str)}
```
4. 判断大小
```js
- ${age >= 18} // 等同于${var:gte(age, 18)}
- ${age > 18} // 等同于${var:gt(age, 18)}
- ${age < 18} // 等同于${var:lt(age, 18)}
- ${age <= 18} // 等同于${var:lte(age, 18)}
```
## 完成条件表达式
功能与`条件表达式`差不多，但是多了几个实例变量：
- 实例总数: nrOfInstances
- 当前还没有完成的实例: nrOfCompletedInstances
- 已经循环的次数: loopCounter
- 已经完成的实例个数: nrOfActiveInstances
```js
// 超过一半的人完成任务
${nrOfCompletedInstances/nrOfInstances > 0.5}
```
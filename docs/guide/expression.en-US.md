---
title: expression
order: 6
toc: content
---

## conditional expression
<Badge type="info">Conditional expressions are mainly used for process control, allowing the direction of the process to be determined based on the values of variables. The following is a use case：</Badge>
- variables(global variable)Abbreviation vars
- variable(local variable)Abbreviation var
1. Equal judgment
```js
${vars:get(age) == 18}
${age == 18}
${var:eq(age, 18)}
```
2. Determine whether a variable contains any value
```js
${var:contains(list, 18, 24)}
${var:containsAny(list, 18, 24)}
```
3. Whether it is empty judgment
```js
${var:empty(str)} 
- ${var:isNotEmpty(str)} 
```
4. Judging size
```js
- ${age >= 18} // =${var:gte(age, 18)}
- ${age > 18} // =${var:gt(age, 18)}
- ${age < 18} // =${var:lt(age, 18)}
- ${age <= 18} // =${var:lte(age, 18)}
```
## Complete conditional expression
Several additional instance variables have been added：
- nrOfInstances
- nrOfCompletedInstances
- loopCounter
- nrOfActiveInstances
```js
// More than half of the people have completed the task
${nrOfCompletedInstances/nrOfInstances > 0.5}
```

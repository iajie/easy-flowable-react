---
title: variables
order: 5
toc: content
---


## Variables
> The role of process variables is that they provide a flexible way to store and transfer data during process execution. 
> Process variables can be accessed and modified anywhere in the process, supporting dynamic adjustments and data 
> processing of the process.
### Global Process Variables
Effective throughout the entire process execution, suitable for storing information 
related to the entire process instance, such as the ID of the process instance, 
the ID of the initiator, etc. These variables can be accessed and modified anywhere in the process.
Global process variables are typically used to store information related to the entire 
process instance, such as the ID of the process instance, the ID of the initiator, and so on.
- Can be set by starting the process
### Local process variables
Local process variables are only valid for a specific task within the process. After the task is completed, 
the local process variable will become invalid.
Local process variables are typically used to store information related to specific tasks, 
such as the person in charge of the task, the deadline for the task, and so on.
- `RuntimeService.setVariable(processInstanceId, map);` 
- `TaskService.setVariablesLocal(taskId, map);` 
- `TaskService.setVariable(taskId, map);`
- `TaskService.complete(任务ID, map)`
### UEL setting process variables
In the task, the information set by nodes can be used to set process variables using UEL 
expressions, such as the executor ${assignee}, which is a local process variable that 
can be modified and used during the task.

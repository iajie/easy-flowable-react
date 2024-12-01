---
title: easy-flowable
order: 1
group:
    title: UI相关接口
    order: 3
---

## 1、获取控制台是否需要登录

### 1.1、开启配置
```yaml
easy-flowable:
  ui:
    # 设置该属性开启(默认为false)
    is-login: true
```
### 1.2、接口

:::code-group
```js [url]
GET `/easy-flowable/isLogin`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": true // 结果在这体现   
}
```
:::

## 2、控制台登录

:::code-group
```js [url]
POST `/easy-flowable/login`
```

```json [请求参数]
{
    "username": "用户名",
    "password": "密码"
}
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": true // 结果在这体现   
}
```
:::

### 2.1、如果需要自定义登录逻辑

> 1. 重写EasyUserService的login方法，可自定义控制台登录逻辑
> 2. 如果不重写也可通过配置yaml
```yaml
easy-flowable:
  ui:
    # 设置该属性开启(默认为false)
    is-login: true
    users: 
      - username:
        password:
        id:
        organ-id: 
```

## 3、获取用户列表

### 1.1、配置
> 1. 重写`EasyUserService`的`users`方法
> 2. 配置yaml
```yaml
easy-flowable:
  ui:
    # 设置该属性开启(默认为false)
    is-login: true
    users: 
      - username:
        password:
        id:
        organ-id: 
```

### 1.2、接口

:::code-group
```js [url]
GET `/easy-flowable/users`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "label": "username",
            "value": "userId"
        }
    ]   
}
```
:::

## 3、获取候选组列表

### 1.1、配置
> 1. 重写`EasyUserService`的`groups`方法
> 2. 配置yaml
```yaml
easy-flowable:
  ui:
    groups: 
      # 组名称-组code/id
      - label:
        value:
```

### 1.2、接口

:::code-group
```js [url]
GET `/easy-flowable/groups`
```

```json [返回参数] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": [
        {
            "label": "",
            "value": ""
        }
    ]   
}
```
:::

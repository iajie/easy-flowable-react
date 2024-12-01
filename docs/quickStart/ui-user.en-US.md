---
title: easy-flowable
order: 1
group:
    title: UI Console Path
    order: 3
---

## 1、Get Is Login

### 1.1、Enable configuration
```yaml
easy-flowable:
  ui:
    # Set this attribute to enabled (default is false)
    is-login: true
```
### 1.2、interface

:::code-group
```js [url]
GET `/easy-flowable/isLogin`
```

```json [reutrn] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": true   
}
```
:::

## 2、ui login

:::code-group
```js [url]
POST `/easy-flowable/login`
```

```json [param]
{
    "username": "",
    "password": ""
}
```

```json [return] {3}
{
    "success": true,
    "message": "成功", 
    "code": 200,
    "result": true   
}
```
:::

### 2.1、If custom login logic is required

> 1. Rewrite the login method of EasyUserService to customize console login logic
> 2. If not rewritten, you can also configure YAML
```yaml
easy-flowable:
  ui:
    # Set this attribute to enabled (default is false)
    is-login: true
    users: 
      - username:
        password:
        id:
        organ-id: 
```

## 3、Get Custom User List

### 1.1、config
> 1. Rewrite the `users` method of `EasyUserService`
> 2. Configure YAML
```yaml
easy-flowable:
  ui:
    is-login: true
    users: 
      - username:
        password:
        id:
        organ-id: 
```

### 1.2、interface

:::code-group
```js [url]
GET `/easy-flowable/users`
```

```json [return] {3}
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

## 3、Obtain the list of candidate groups

### 1.1、config
> 1. Rewrite the `groups` method of `EasyUserService`
> 2. Configure YAML
```yaml
easy-flowable:
  ui:
    groups: 
      - label:
        value:
```

### 1.2、interface

:::code-group
```js [url]
GET `/easy-flowable/groups`
```

```json [return] {3}
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

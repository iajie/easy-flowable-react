---
title: '快速开始'
toc: content
nav:
  title: 使用指南
  order: 0
---
在开始之前，我们假定您已经：
- 熟悉 Java 环境配置及其开发
- 熟悉SpringBoot开发
- 想自定义前端画布组件
# Easy-Flowable

`Easy-Flowable`，是一款基于 `flowable` 进行二次封装拓展出模型等操作接口的流程引擎工具。

## 快速上手
### 1、SpringBoot集成
```xml
<dependency>
    <groupId>com.easy-flowable</groupId>
    <artifactId>easy-flowable-boot-starter</artifactId>
    <version>${last.version}</version>
</dependency>
```

### 2、如果你想要Easy-Flowable的控制台
启动后访问`http://127.0.0.1:port/easy-flowable`
```xml
<!-- UI 可视化界面 -->
<dependency>
    <groupId>com.easy-flowable</groupId>
    <artifactId>easy-flowable-ui-designer</artifactId>
    <version>${last.version}</version>
</dependency>
```

### 3、Solon集成
> 暂未支持ui可视化

```xml
<dependency>
    <groupId>com.easy-flowable</groupId>
    <artifactId>easy-flowable-solon-plugin</artifactId>
    <version>${last.version}</version>
</dependency>
```

### 4、相关配置

```yaml
easy-flowable:
  # 是否开启easy-flowable
  enable: true
  # 是否启动时打印banner
  banner: true
  # 是否使用项目中的数据源
  project-datasource: true
  # 如果project-datasource为false时配置
  data-source:
    # 数据库驱动
    driver: 
    # 数据库连接
    url: 
    # 数据库用户名
    username:
    # 数据库密码
    password: 
    # 连接池能够容纳的最大活动连接数量
    max-active-connections: 10
    # 连接池能够容纳的最大空闲连接数量
    max-idle-connections: 8
    # 连接从连接池“取出”后，被强制返回前的最大时间间隔
    max-checkout-time: 20000
    # 在连接池获取连接的时间异常长时，打印日志并尝试重新获取连接（避免连接池配置错误，导致没有异常提示）默认20秒
    max-wait-time: 20000
  # easy-flowable流程引擎配置
  config:
    # 构建引擎时，检查并在需要时更新表结构。表结构不存在则会创建
    table-schema: true
    # 异步任务开关job
    async-executor-activate: false
    # 流程历史级别:将存档所有流程实例及活动实例，并保持变量值与提交的表单参数的同步，以保证所有通过表单进行的用户操作都可追踪、可审计
    history-level: audit
    # 邮件配置开关，默认关闭
    is-mail: false
    # 邮件配置 key-config结构
    mail-config: 
      # a邮箱配置
      a-email:
        # 邮件服务器的主机名（如smtp.qq.com）
        host:
        # SNTP端口 
        port:
        # 发送账户
        username:
        # 授权码
        password:
        # 是否开启ssl通信
        useSSL: false
        # 是否开启TLS通信
        use-tls: false
```

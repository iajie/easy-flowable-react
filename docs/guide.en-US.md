---
title: 'Quick start'
toc: content
nav:
  title: Usage Guide
  order: 0
---
Before we begin, we assume that you have:
-Familiar with Java environment configuration and development
-Familiar with SpringBoot development
-I want to customize the front-end canvas component
# Easy-Flowable

`Easy-Flowable`，It is a process engine tool that extends model and other operation interfaces through secondary encapsulation based on 'flowable'。

## quick start
### 1、SpringBoot integration
```xml
<dependency>
    <groupId>com.easy-flowable</groupId>
    <artifactId>easy-flowable-boot-starter</artifactId>
    <version>${last.version}</version>
</dependency>
```

### 2、If you want an Easy Flowable console
Access after startup`http://127.0.0.1:port/easy-flowable`
```xml
<!-- UI console -->
<dependency>
    <groupId>com.easy-flowable</groupId>
    <artifactId>easy-flowable-ui-designer</artifactId>
    <version>${last.version}</version>
</dependency>
```

### 3、Solon integration

```xml
<dependency>
    <groupId>com.easy-flowable</groupId>
    <artifactId>easy-flowable-solon-plugin</artifactId>
    <version>${last.version}</version>
</dependency>
```

### 4、Related configurations

```yaml
easy-flowable:
  # Is it enabled easy-flowable
  enable: true
  # Whether to print upon startup banner
  banner: true
  # Whether to use the data source in the project
  project-datasource: true
  # If project-datasource Is false effective
  data-source:
    driver: 
    url: 
    username:
    password: 
    max-active-connections: 10
    max-idle-connections: 8
    max-checkout-time: 20000
    max-wait-time: 20000
  # easy-flowable config
  config:
    table-schema: true
    # Asynchronous task switch job
    async-executor-activate: false
    history-level: audit
    # Email configuration switch, default off
    is-mail: false
    # key-config structure
    mail-config: 
      a-email:
        host:
        port:
        username:
        password:
        useSSL: false
        use-tls: false
```

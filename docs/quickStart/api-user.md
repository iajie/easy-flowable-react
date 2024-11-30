---
title: 用户接口(自定义)
order: 1
group:
    title: API
    order: 2
---

:::info{title=小提示}
自定义用户体系对应接口：EasyUserService
:::

```java
import com.superb.core.domain.dto.Option;
import com.superb.core.domain.entity.EasyFlowableUser;
import com.superb.core.service.EasyUserService;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义用户的实现
 */
@Component
public class EasyUserServiceImpl implements EasyUserService {

    @Override
    public EasyFlowableUser getCurrentUser(Object userId) {
        EasyFlowableUser user = new EasyFlowableUser();
        // 返回用户信息
        return user;
    }

    @Override
    public Object login(String username, String password) {
        // 使用控制台才会用到 自定义登录逻辑...
        return userId;
    }

    @Override
    public List<Option> users() {
        List<Option> list = new ArrayList<>();
        // 添加用户列表
        return list;
    }

    @Override
    public List<Option> groups() {
        List<Option> list = new ArrayList<>();
        // 添加组信息，可以是角色、部门...
        return list;
    }
}
```

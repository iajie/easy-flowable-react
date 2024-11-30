---
title: user interface(custom)
order: 1
group:
    title: API
    order: 2
---

:::info{title=tip}
Customize user system corresponding interface：EasyUserService
:::

```java
import com.superb.core.domain.dto.Option;
import com.superb.core.domain.entity.EasyFlowableUser;
import com.superb.core.service.EasyUserService;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of custom users
 */
@Component
public class EasyUserServiceImpl implements EasyUserService {

    @Override
    public EasyFlowableUser getCurrentUser(Object userId) {
        EasyFlowableUser user = new EasyFlowableUser();
        // Return user info.
        return user;
    }

    @Override
    public Object login(String username, String password) {
        // Custom login logic will only be used when using the ui console...
        return userId;
    }

    @Override
    public List<Option> users() {
        List<Option> list = new ArrayList<>();
        // Add User List
        return list;
    }

    @Override
    public List<Option> groups() {
        List<Option> list = new ArrayList<>();
        // Add group information, which can be roles, departments
        return list;
    }
}
```

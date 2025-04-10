#### v2rayN 设置网址跳过代理

> 默认情况下，选择【绕过大陆】的路由模式，就可以将大部分国内网站排除在外了；
>
> 尝试手动修改 `guiConfigs` 下的配置文件不生效，会被重置。

设置-路由设置-双击【绕过大陆】-双击第一条规则修改:

> 新增规则默认排在最下面，会导致网站先被代理规则匹配然后失效；

`示例跳过代理规则字段`

| label       | value    |
| ----------- | -------- |
| outboundTag | direct   |
| domain      | 自行配置 |
| enabled     | true     |

`实际用第一条规则修改 domain 即可`

```
domain:wiki2.ops.lbdj.net,
domain:fhd.local.lbdj.net,
domain:lbdj.net,
domain:example-example2.com
```


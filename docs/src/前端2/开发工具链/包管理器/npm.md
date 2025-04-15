### `.npmrc`

https://blog.csdn.net/kelly0721/article/details/121908256

`示例`

```shell
# 从淘宝镜像
registry=https://registry.npmmirror.com
# 特别指定 sentrycli_cdnurl 从其他地方下载
sentrycli_cdnurl=https://npmmirror.com/mirrors/sentry-cli
```



### 下载源配置

#### 临时指定下载源

```sh
npm install --registry=https://registry.npmmirror.com
```

```sh
npm install axios --registry=https://registry.npmmirror.com
```



#### 修改默认下载源

获取当前配置源

```sh
npm config get registry
```

设置为淘宝源

```sh
npm config set registry https://registry.npmmirror.com
```

设置为默认源

```sh
npm config set registry https://registry.npmjs.org/
```





#### 使用cnpm指定下载源

```sh
npm install -g cnpm --registry=https://registry.npmmirror.com
```

```sh
cnpm -v
```

```sh
cnpm install
```










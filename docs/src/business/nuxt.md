#### 接口返回值对不上问题

> 同一时间需要调用接口，拿到不同类型的数据，这时 useFetch 会将最终拿到的结果返回到每次上，这是有问题的：

https://article.juejin.cn/post/7248118049583824952

```javascript
export function demoApi(body = {}) {
    return requestApi({
        url: '/lbdj/website//helpCenter/getHelpList',
        body,
        key: body.type ? body.type.toString() : null // 添加
    })
}
```






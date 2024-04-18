#### 接口返回值对不上问题

> 同一时间需要调用接口，拿到不同类型的数据，这时 useFetch 会将最终拿到的结果返回到每次上，这是有问题的：

https://article.juejin.cn/post/7248118049583824952

```javascript
export function demoApi(body = {}) {
    return requestApi({
        url: '/xx/demo',
        body,
        key: body.type ? body.type.toString() : null // 添加
    })
}
```



#### 进入页面执行一次，判断是不是移动端访问

`plugins\global.ts`

```typescript
// @ts-ignore
import { Plugin, Context } from '@nuxt/types'

const redirectMobile: Plugin = (context: Context) => {
    // 进入页面执行一次，判断是不是移动端访问
    const u = navigator.userAgent
    const isMobile = !!u.match(/iPhone/) || !!u.match(/Android/) || !!u.match(/iPad/)
    if (isMobile) {
        window.location.href = 'http://target.com'
    }
}

export default redirectMobile

```



`nuxt.config.ts`

```typescript
export default defineNuxtConfig
	alias: {
        '@': path.resolve(__dirname, './'),
    },
    plugins: [
        { src: '@/plugins/client.ts', mode: 'client' },
    ],
})

```



#### 访问 window 对象报错

> 在Nuxt.js中，`window` 对象通常在客户端（浏览器）上下文中可用，但在服务端渲染（SSR）期间，由于Node.js环境并不包含`window`对象，因此在组件或页面的`created`、`mounted`钩子之前尝试访问`window.location`会导致错误（页面404）。
>
> 可以在 `process.client` 为 true 的清空下访问 `window` 对象，或在 `onMounted` 钩子中访问。

```html
<script lang="ts" setup>
console.log(window.location.href)

if (process.client) {
    console.log(window.location.href)
}
    
onMounted(() => {
    console.log(window.location.href)
})
</script>
```












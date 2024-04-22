eventBus；vue3废除

https://blog.csdn.net/weixin_56650035/article/details/123036388



#### vue-动态添加类

```html
<div :class="[ 
     'normal-item', 
     activeId === item.id && 'active-item',
     item.stock == 0 && 'lack-item'
]">demo</div>
```



#### 通过路由自定义页面标题

通过路由的 meta 属性自定义页面标题

```javascript
[
    ...,
    {
        path: '/',
        name: 'detail',
        component: () =>
            import('@/pages/detail.vue'),
        meta: {
            title: '详情展示'
        }
    }
]

router.afterEach(to => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})
```


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


### 通过 watchEffect 将最新状态保存到对象上

```javascript
const obj = ref({})
const time = ref(0)
const number = ref(100)
setInterval(() => {
  time.value++
}, 1000)
setInterval(() => {
  number.value++
}, 2500)

watchEffect(() => {
  Object.assign(obj.value, {
    count: time.value,
    num: number.value
  });
});
```



### 计算属性传参

```html
<span class="margin-left">{{pointStatus(item.statusCode)}}</span>
```
```javascript
computed: {
  pointStatus() {
    return (text) => {
      return this.statusMap.find(item => item.value === text).status || ''
    }
  }
}
```



### 不引入ref等变量

https://blog.csdn.net/qq_43806488/article/details/126616539

<script setup>
import CustomComponent from '../template/computed.vue'
</script>

### 小写转大写

<CustomComponent />

### 循环遍历数组索引

```javascript
 loopTraversalIndex() {
    const arr = ['a', 'b', 'c', 'd', 'e']
    const arrLength = arr.length
    let current = 0
    setInterval(() => {
        current = (current + 1) % arrLength
    }, 1200)
}
```



### js 浮点数计算错误例子

解决方法[参考](https://www.cnblogs.com/bushui/p/12150947.html)

```javascript
// 加法
0.1 + 0.2 = 0.30000000000000004
0.1 + 0.7 = 0.7999999999999999
0.2 + 0.4 = 0.6000000000000001
 
// 减法
0.3 - 0.2 = 0.09999999999999998
1.5 - 1.2 = 0.30000000000000004
 
// 乘法
0.8 * 3 = 2.4000000000000004
19.9 * 100 = 1989.9999999999998
 
// 除法
0.3 / 0.1 = 2.9999999999999996
0.69 / 10 = 0.06899999999999999
 
// 比较
0.1 + 0.2 === 0.3 // false
(0.3 - 0.2) === (0.2 - 0.1) // false
```


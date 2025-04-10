### miniprogram-to-uniapp

> 用于将原生微信小程序代码转化为 `uni-app`



#### `setData` 报错

```elm
TypeError: this.$forceUpdate is not a function
```

**排错**

场景：父组件中直接获取到子组件，并调用它的初始化方法（获取子组件的方法是同事自己实现的，不能保证它的准确性）

经排查，每次子组件中第一次调用 `this.setData` 都会有该报错，推断为第三方方法中 `this` 的指向问题

**解决**

修改为 vue 原生的 `$refs` 获取子组件即可



#### `setData` 无效

**排错**

场景：切换 tab 后，调用子组件的方法进行初始化。

初始化方法中 调用 `this.setData`  后，打印变量确实有改变，但是模板中的内容没变化，和变量对不上。

**解决**

切换 tab 后，在 `this.$nextTick(() => {})` 逻辑中调用子组件的初始化方法
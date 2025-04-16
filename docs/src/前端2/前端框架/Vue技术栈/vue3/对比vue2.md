## Vue2 VS Vue3

| 版本 | 特效            | 说明                                                  |
| ---- | --------------- | ----------------------------------------------------- |
| Vue2 | 响应式系统重构  | Vue2，基于 `Object.defineProperty`                    |
|      |                 | 无法检测对象属性的添加/删除                           |
|      |                 | 数组变异方法需要特殊处理                              |
| Vue3 | 响应式系统重构  | Vue 3，基于 `Proxy`                                   |
|      |                 | 支持全量响应式（包括新增/删除属性）                   |
|      |                 | 更好的性能表现（节省50%内存）                         |
| Vue3 | 组合式API       | 新增                                                  |
| Vue2 | 编译时优化      | 全量Diff                                              |
| Vue3 | 编译时优化      | 算法提升（静态节点提升、补丁标志、树结构拍平）        |
| Vue2 | 打包体积        |                                                       |
| Vue3 | 打包体积        | 减少约40%体积                                         |
| Vue3 | Suspense        | 新增，允许在异步组件中显示一个加载状态（备用组件）    |
| Vue3 | 多根节点组件    | 新增                                                  |
| Vue2 | TypeScript 支持 | 需要额外装饰器                                        |
| Vue3 | TypeScript 支持 | 完全用 TypeScript 重写；更好的类型推导；完整的TSX支持 |
| Vue2 | data选项        | data选项允许使用对象/函数                             |
| Vue3 | data选项        | data选项只能使用函数                                  |
| Vue2 | 全局变量        | Vue.prototype                                         |
| Vue3 | 全局变量        | app.config.globalProperties                           |
| Vue2 | 状态管理        | VueX                                                  |
| Vue3 | 状态管理        | 推荐 Pinia                                            |
| Vue3 | 破坏性变化      | `v-model` 语法变更                                    |
| Vue3 | 破坏性变化      | 事件API (`$on`, `$off` 移除)                          |
| Vue3 | 破坏性变化      | 过滤器(filter)移除，建议使用计算属性/方法代替         |
| Vue3 | 破坏性变化      | 组合式API 不支持 `$parent` 和 `$children`             |



### 响应式实现

::: code-group

```[Vue2]JavaScript
Object.defineProperty(obj, key, {
  get() { /* 依赖收集 */ },
  set(newVal) { /* 触发更新 */ }
})
```

```[Vue3]JavaScript
new Proxy(obj, {
  get(target, key) { /* 依赖收集 */ },
  set(target, key, newVal) { /* 触发更新 */ }
})
```

:::



### 组合式API

**代码组织方式**

::: code-group

```[Vue2 Options API]JavaScript
export default {
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } },
  mounted() { console.log('mounted') }
}
```

```[Vue3 Composition API]JavaScript
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++
    
    onMounted(() => console.log('mounted'))
    
    return { count, increment }
  }
}
```

:::



**优势对比**

| 特性           | Options API | Composition API |
| :------------- | :---------- | :-------------- |
| 逻辑复用       | Mixins      | 自定义hook函数  |
| 代码组织       | 按选项分类  | 按功能组织      |
| TypeScript支持 | 有限        | 更友好          |
| 逻辑提取       | 困难        | 容易            |



### 生命周期钩子函数

|     Vue2      |     Vue3      | 组合式 API 钩子   |             调用时机             |
| :-----------: | :-----------: | ----------------- | :------------------------------: |
| beforeCreate  |       /       | 无（由setup代替） |           实例初始化后           |
|    created    |       /       | 无（由setup代替） |            实例创建后            |
|  beforeMount  |       /       | onBeforeUnmount   |              挂载前              |
|    mounted    |       /       | onMounted         |              挂载后              |
| beforeUpdate  |       /       | onBeforeUpdate    |            数据更新前            |
|    updated    |       /       | onUpdated         |            数据更新后            |
|   activated   |       /       | onActivated       | 被 `keep-alive` 缓存的组件激活时 |
|  deactivated  |       /       | onDeactivated     | 被 `keep-alive` 缓存的组件停用时 |
| beforeDestroy | beforeUnmount | onBeforeMount     |            实例销毁前            |
|   destroyed   |   unmounted   | onUnmounted       |            实例销毁后            |

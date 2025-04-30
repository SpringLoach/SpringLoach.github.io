| VS Vuex | 说明                                         |
| ------- | -------------------------------------------- |
| ①       | *mutations* 不再存在。他们经常被认为是冗余的 |
| ②       | 不再有 *modules* 的嵌套结构                  |
| ③       | 对于类型推导有更好的支持                     |



| 要点 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| ①    | 剩余state、getters和actions，相当于组件的“数据”、“计算”和“方法” |
| ②    | 不要用结构的语法从 store 实例中提取 state，会破坏响应式      |
| ③    | 定义 state 时使用箭头函数，能够根据默认值自动推断属性类型    |
| ④    | 在定义getter时不要用 `this.xx` 的方式获取 `state` 就可以自动完成类型推导 |
| ⑤    | 对于 actions，只要给方法添加 `async`  就能实现异步操作       |



## 安装使用

```elm
npm install pinia
```

`main.js`

```javascript
import { createPinia } from 'pinia'

app.use(createPinia())
```

`vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // [!code warning]

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { // [!code warning]
    alias: { // [!code warning]
      '@': path.resolve(__dirname, './src') // 将 @ 映射为 src 目录的绝对路径 // [!code warning]
    } // [!code warning]
  } // [!code warning]
})
```



## 简单例子

:::code-group

```[定义方式一]javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```

```[定义方式二]javascript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

```[使用]javascript
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    // 不能解构使用，会破坏响应式
	const { count } = counter

	// 直接读取和写入状态
    counter.count++
    
    counter.$patch({ count: counter.count + 1 })
    
    // 或使用 action 代替
    counter.increment()
  },
}
```

:::



**更典型的例子**

```javascript
import { defineStore } from 'pinia'

export const todos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // type 会自动推断为 number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // 自动完成! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // 自动调用其他 getter ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // 任何数量的参数，返回一个 Promise 或者不返回
    addTodo(text) {
      // 你可以直接改变状态
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```



## State

### 访问state

#### 使用 `setup()`

```javascript
import { useCounterStore } from '@/stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    counterStore.counter = 2 // 直接访问
    
    return { counterStore }
  },
  computed: {
    tripleCounter() {
      return counterStore.counter * 3
    },
  },
}
```

#### 不使用 `setup()`

:::code-group

```[只读]javascript
import { mapState } from 'pinia' // [!code warning]
import { useCounterStore } from '@/stores/counterStore'

export default {
  computed: {
    // 允许访问组件内部的 this.counter
    // 与从 store.counter 读取相同
    ...mapState(useCounterStore, {
      myOwnName: 'counter',
      // 您还可以编写一个访问 store 的函数
      double: store => store.counter * 2,
      // 它可以正常读取“this”，但无法正常写入...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

```[可修改]javascript
import { mapWritableState } from 'pinia' // [!code warning]
import { useCounterStore } from '@/stores/counterStore'

export default {
  computed: {
    // 允许访问组件内的 this.counter 并允许设置它
    // this.counter++
    // 与从 store.counter 读取相同
    ...mapWritableState(useCounterStore, ['counter'])
    // 与上面相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'counter',
    }),
  },
}
```

:::



## Getters

### 访问其他 getter

```javascript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 类型是自动推断的，因为没有使用 `this` 获取 state
    doubleCount: (state) => state.counter * 2, // [!code warning]
    doubleCountPlusOne() {
      return this.doubleCount + 1 // [!code warning]
    },
  },
})
```

### 将参数传递给 getter

可以从 *getter* 返回一个函数以接受任何参数

:::code-group

```[定义]js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

```[使用]html
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

:::



### 访问其他 Store 的getter

```javascript
import { useOtherStore } from './other-store' // [!code warning]

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore() // [!code warning]
      return state.localData + otherStore.data
    },
  },
})
```



### 访问getter

```javascript
export default {
  setup() {
    const store = useStore()

    store.doubleCount // 作为store属性直接访问
  },
}
```



#### 使用`setup()`

```javascript
import { useCounterStore } from '@/stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2
    },
  },
}
```



#### 不使用 `setup()`

```javascript
import { mapState } from 'pinia' // [!code warning]
import { useCounterStore } from '@/stores/counterStore'

export default {
  computed: {
    // 允许访问组件内的 this.doubleCounter
    // 与从 store.doubleCounter 中读取相同
    ...mapState(useCounterStore, ['doubleCount'])
    // 与上面相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // 您还可以编写一个访问 store 的函数
      double: store => store.doubleCount,
    }),
  },
}
```



## Actions

### 访问其他 store 操作

```javascript
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```



### 使用方法

#### 在 `setup()` 中使用

```javascript
export default {
  setup() {
    const store = useStore()

    store.randomizeCounter()
  },
}
```



#### 使用 `setup()`

```javascript
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      counterStore.increment()
      console.log('New Count:', counterStore.count)
    },
  },
}
```

#### 不使用 `setup()`

```javascript
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // gives access to this.increment() inside the component
    // same as calling from store.increment()
    ...mapActions(useCounterStore, ['increment'])
    // same as above but registers it as this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```


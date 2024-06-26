## 基础

### 与常规Vue的差异

1. 除了支持Vue实例的生命周期，还支持[应用生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=应用生命周期)以及[页面生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=页面生命周期)。
2. 相比web平台，在小程序和App端部分功能[受限](https://uniapp.dcloud.io/vue-api)（devtools工具、nextTick、activated钩子、v-html指令等）。
3. 仍完整支持Vue模板语法（允许为表达式插值和指令）。

```html
 <view>{{ ok ? 'YES' : 'NO' }}</view>
 <view>{{ message.split('').reverse().join('') }}</view>
```



### data选项

> 必须是一个函数。返回的对象不要引用外部对象，否则关闭页面时数据不销毁，重新打开页面后显示之前的数据。

```javascript
// 错误写法，会导致组件实例间的数据相互影响
const obj = {
  title: 'Hello'
}
data() {
  return {
    obj
  }
}
```



### Class 与 Style 绑定

> 通常的对象、数组语法及计算属性都能支持，但非H5端不支持对象变量。

```less
<!-- 支持 -->
<view class="static" :class="{ active: isActive, 'text-danger': hasError }">222</view>

<!-- 不支持 -->
<view :class="[activeClass]"></view>

data () {
  return {
    activeClass {
      'active': true,
      'text-danger': false
    }
  }
}
```



### 条件渲染

> 与通常一样，使用 `v-if`、`v-else-if`、`v-else` ，且能够使用在 template 元素上来条件渲染多个元素。
>
> 注意，`v-show` 不支持 template 元素。



### 列表渲染

> 与通常一样，使用 `v-for` 遍历对象、数字或数组，且能够使用在 template 元素上来列表渲染多个元素。
>
> 当在自定义组件上使用 `v-for` 时，必须添加 `key`。

与H5平台的差异

| 索引 | 平台     | 说明                                                         |
| :--: | -------- | :----------------------------------------------------------- |
|  ①   | 非H5平台 | 循环整数时，首参 `item` 不是 从 1 开始，而是从 0 开始，可以使用第二个参数 `index` 来保持一致。 |
|  ②   | 非H5平台 | 循环对象时不支持第三个参数，即 `index`                       |
|  ③   | 小程序端 | 由于不支持删除对象属性，其值以 null 代替。故遍历对象时，需自行筛选值为 null 的项 |



### 事件处理器

```html
<!-- 可以接受 JavaScript 代码、方法名称、调用方法 -->
<button @click="formView = true">打开弹窗</button>

<!-- 需要传入原始Dom事件（有时是组件的默认参数）和自定义参数的写法 -->
<button @click="warn('one', $event)">Submit</button>
```

事件修饰符

| 修饰符     | 平台支持情况                                                 |
| :--------- | :----------------------------------------------------------- |
| .stop      | 各平台均支持。阻止事件冒泡，在非 H5 端还会阻止事件的默认行为 |
| .native    | 各平台均支持。监听原生事件                                   |
| .prevent   | 仅 H5 平台支持                                               |
| .capture   | 仅 H5 平台支持                                               |
| .self      | 仅 H5 平台支持                                               |
| .once      | 仅 H5 平台支持                                               |
| .passive   | 仅 H5 平台支持                                               |
| 按键修饰符 | 运行在手机端，没必要，故都不支持                             |

> 为兼顾各端，不能使用小程序端的 `bind` 和 `catch` 进行事件绑定；也不能在 JS 中使用`event.preventDefault()`和`event.stopPropagation()`方法；



#### 事件映射表

```javascript
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
    {
        click: 'tap',
        touchstart: 'touchstart',
        touchmove: 'touchmove',
        touchcancel: 'touchcancel',
        touchend: 'touchend',
        tap: 'tap',
        longtap: 'longtap', // 推荐使用longpress代替
        input: 'input',
        change: 'change',
        submit: 'submit',
        blur: 'blur',
        focus: 'focus',
        reset: 'reset',
        confirm: 'confirm',
        columnchange: 'columnchange',
        linechange: 'linechange',
        error: 'error',
        scrolltoupper: 'scrolltoupper',
        scrolltolower: 'scrolltolower',
        scroll: 'scroll'
    }
```



### 表单控件绑定

#### v-model

> v-model 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而将 Vue 实例的数据作为数据来源，需在 `data` 中初始化。

```html
<input v-model="message" />
```

#### 表单组件

> 开发过程中建议直接使用[表单组件](https://uniapp.dcloud.io/component/button)代替原生标签。

H5标签 | uni-app组件 
:-: | :-:
`<select>` | `<picker> `
`<radio>` | `<radio-group>`




### 计算属性和侦听器

#### 计算属性

> 计算属性适用于插值表达式太复杂，混在页面中的情况。默认只设置 `getter` ，**不带参数**，也可以自行给它设置 `setter`。

```javascript
computed: {
  /* getter */
  demo1(){
    return this.message.join('');
  },
  /* getter 和 setter */
  demo2: { 
    get(){
      return this.firstName + ' ' + this.lastName;
    },
    set(newValue){
      this.firstName = names[0];
    }  
  }
}
```



#### 计算属性缓存 vs 方法

> 它们能达到相同的效果。但计算属性基于它的响应式依赖进行**缓存**，只要依赖没有改变，就会返回之前的计算结果，涉及大量计算时较好。
>
> 但也要注意，计算属性对非响应式依赖无力，如下栗。

```javascript
computed: {
  now(){
    return Date.now()
  }
}
```



#### 侦听属性watch

> 监听**实例下的**某个值，当值发生变化时执行相应的逻辑。

```javascript
data() {
  a: 1,
  b: 2,
  animal: {
    dog: 'miao'
  }
},
watch: {
  /* ① 首参为变化后的值 */
  a: function(val, oldVal) { ... },
      
  /* ② 值可以为方法名的字符串形式 */
  $route: 'initTheme',
      
  /* ③ 在侦听开始之后就调用回调，推测created时也调用 */
  b: {
    handler: 'someMethod',
    immediate: true
  },
      
  /* ④ 可以传入回调数组，它们会被逐一调用 */
  b: [
    'initList',
    function(val, oldVal) { ... },
  ],
  
  /* ⑤ 在被侦听对象的属性改变时调用，无论其嵌套多深 */
  animal: {
    handler: function(val, oldVal) { ... },
    deep: true  
  },   
      
  /* ⑥ 侦听对象的属性时，以字符串形式输入 */
  'animal.dog': function(val, oldVal) { ... }
}
```



## 组件

> 组件被分为基础组件（内置）和自定义组件，合理利用组件能提高代码复用性等。
>
> 组件的根节点为 `<template>`，这个 `<template>` 下只能且**必须有一个**根 `<view>` 组件。

```html
<template>
  <view>
    ...
  </view>
</template>
```



### 内置组件映射表

| Web                         | uni-app        | 说明 |
| :-------------------------- | :------------- | :--- |
| `<div\>`                    | `<view\>`      | /    |
| `<span\>`                   | `<text\>`      | /    |
| `<a\>`                      | `<navigator\>` | /    |
| `<img/\>`                   | `<image/\>`    | /    |
| `<input type="textarea"/\>` | `<textarea/\>` | /    |



### 注册

| 定义组件名                  | 引用                                        |
| :-------------------------- | :------------------------------------------ |
| kebab-case (短横线分隔命名) | `<my-component-name>`                       |
| PascalCase (首字母大写命名) | `<my-component-name>`、 `<MyComponentName>` |

> 我看示例在注册组件时用的是驼峰式大小写呀。。



#### 自定义组件的存放

> 建议使用 `components/组件名称/组件名称.vue` 的目录结构

+ 工程（项目）
  - components
    + componentA
      - componentA.vue

#### 全局注册

> 全局注册方法的首参必须为静态字符串。

`main.js`

```javascript
import Vue from 'vue'
import pageHead from './components/page-head.vue'
Vue.component('page-head', pageHead)
```

`demo.vue`

```html
<template>
  <view>
    <page-head></page-head>
  </view>
</template>
```

#### 局部注册

> 一方面仍可以使用传统vue规范局部注册流程。
>
> 另一方面，在符合[自定义组件的存放](#自定义组件的存放)时，可以省略引用和注册的步骤，直接在页面使用。该技术叫 `easycom`， 自动开启，且打包时会**剔除没有使用的组件**，对组件库的使用尤为友好。



### props

> 与常规 vue 相似，可以设置类型检测，默认值，限制为必填项等。

```html
<!-- 如果父组件只传该属性，意味着赋值为true -->
<blog-post is-published></blog-post>
```



> 可以传入一个对象的所有属性，但微信小程序不支持。

```html
 <blog-post v-bind="post"></blog-post>

<!-- 上面的模板等价于： -->
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>

post: {
  id: 1,
  title: 1
}
```



### ref

> 与常规 vue 相似，可以作用在子组件或元素上，访问组件实例或DOM。

1. `ref` 自身是作为渲染结果创建的，渲染前不能获取到它。
2. 在 `v-for` 中使用的 `ref` ，其值为实例或DOM的数组。
3. 非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：view、text）。



### 自定义事件

#### .sync 修饰符

>  `.sync` 它会被扩展为一个自动更新父组件属性的 `v-on` 监听器。当子组件改变了 `prop` 的值时，这个变化也会同步到父组件中。

`父组件`

```less
<view>
  <syncA :title.sync="title"></syncA>
</view>

data() {
  return {
    title:"hello vue.js"
  }
}
```

`子组件`

```less
<view>
  <view @click="changeTitle">{{title}}</view>
</view>

props: {
  title: {
    default: "hello"
  },
},
methods:{
  changeTitle(){
    // 触发更新事件
    this.$emit('update:title',"uni-app")
  }
}
```



### 插槽

> 与常规的 vue 相似。


| 项           | 说明                                                         |
| :----------- | :----------------------------------------------------------- |
| 编译作用域   | 使用插槽时，内部不能使用子组件的数据，因为插槽在父级模板中，交由父级作用域编译。 |
| 默认内容     | 在没有提供内容的时候被渲染                                   |
| 具名插槽     | 使用时，可以用 `#` 作为 `v-slot:` 的缩写                     |
| 多个插槽     | 每个插槽都需要添加到 `<template>` 上                         |
| 作用域插槽   | 可以在使用插槽时，让内部拿到子组件的数据（以Prop的形式）的一种技术 |
| 解构插槽Prop | 获取子组件数据时，还可以结合对象解构获取具体属性、重命名、默认值等 |

**作用域插槽**

`子组件`

```html
<view>
  <slot :user="user">{{user.lastName}}</slot>
</view>
```

`父组件`

```html
<view>
  <current-user>
    <template v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </template>
  </current-user>
</view>

<!-- 相同的写法，因为不带参数的 v-slot 会被当做对应的默认插槽 -->
<view>
  <current-user>
    <template v-slot="slotProps">
      {{ slotProps.user.firstName }}
    </template>
  </current-user>
</view>
```

> `v-slot` 的属性值的命名没有规定，喜欢就好。



### 小程序不支持列表

- 作用域插槽（HBuilderX 3.1.19 以下仅支持解构插槽且不可使用作用域外数据以及使用复杂的表达式）
- 动态组件
- 异步组件
- `inline-template`
- `X-Templates`
- `keep-alive`（App端也未支持）
- `transition` （可使用 `animation` 或 CSS 动画替代）




## 重要

### 特性

| 特性       | 次级           | 说明                                                         |
| ---------- | -------------- | ------------------------------------------------------------ |
| 概念       |                | JSX 和 React 是不同的东西，但经常一起使用                    |
|            |                | 它是 JavaScript 的语法扩展，可以生成 React “元素”            |
| JSX规则    | 单一根组件     | 只能返回一个根组件                                           |
|            |                | 组件内能够包含很多子元素                                     |
|            |                | 若不想加额外标签包含，可以用 `<>...</> `元素来代替           |
|            | 标签必须闭合   | 自闭合标签需要提供末尾的 `/`                                 |
|            |                | 普通标签需要提供结束标签                                     |
|            | 属性格式       | 使用**小驼峰命名**来定义属性的名称                           |
|            |                | 与 `DOM` 属性中的命名对应                                    |
|            |                | 由于 `class` 是保留字，用 `className` 代替                   |
|            |                | 由于历史原因，属性 `aria-*` 和 `data-*` 带上了短横线         |
|            | 传递内容       | 使用单/双引号传递字符串                                      |
|            |                | 使用大括号传递表达式（如变量）                               |
|            | 大括号适用位置 | 用作 jxs 标签内的文本 `<h1>{name}</h1>`                      |
|            |                | 用作 `=` 后的属性值  `src={avatar}`                          |
|            | 大括号内容     | 可以在 `{}` 内放置任何有效的 JavaScript 表达式               |
| 自动化工具 |                | 可以使用[转换器](https://transform.tools/html-to-jsx)将 HTML 转换为 JSX |



### 传递字符串or表达式

```jsx
/* 值为字符串 */
const element = <div tabIndex="0"></div>;

/* 值为表达式 */
const element = <div tabIndex={demo}></div>;
```



### 传递表达式

可以在 `{}` 内放置任何有效的 JavaScript 表达式。

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

/* 除了变量以外，还可以是调用方法、对象属性、计算等 */
const element = <h1>Hello, {myF(1)}</h1>;
const element = <h1>Hello, {obj.name}</h1>;
const element = <h1>Hello, {2+2}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```



## 核心语法

### jsx-注释

```jsx
export default function App() {
  return (
    <>
      {/* 我是一段注释 */}
      <div>Hello World</div>
    </>
  )
}
```

:octopus: jsx 中不能使用 `<!-- -->`、`//` 这样的方式注释。



### jsx-嵌入数据限制

这里嵌入的数据，指的是放入 jsx 的 `{}` 的内容。

```jsx
export default function App() {
  const demo = { b: 'c' }
  return (
    <>
      <div>{ demo.b }</div>
    </>
  )
}
```

| 类型         | 现象                            |
| ------------ | ------------------------------- |
| String       | 正常显示                        |
| Number       | 正常显示                        |
| Array        | 正常显示                        |
| Object       | 报错（对象不能作为 jsx 的子类） |
| null         | 不显示(忽略)                    |
| undefined    | 不显示(忽略)                    |
| true / false | 不显示(忽略)                    |
| NaN          | 报错（不能作为 jsx 的子类）     |

:ghost: 对于不显示的几种类型，可以将其转化为字符串后进行显示

```jsx
{demo.toString()}

{demo + ''}

{String(demo)}
```



### jsx-绑定类/样式

```jsx
import { useState } from "react"

export default function App() {
  const [active, setActive] = useState(true)
  return (
    <>
      {/* 绑定class */}
        <div className="box title">元素</div>
        <div className={"box title " + (active ? "active": "")}>元素</div>

        {/* 绑定style */}
        <div style={{color: "red", fontSize: "50px"}}>元素</div>
    </>
  )
}
```

:whale: 为了与 jsx 中的某些关键字作区别，部分 html 的属性要起<span style="color: #ff0000">别名</span>；

:turtle: <span style="color: #ff0000">添加动态类</span>，只能通过 js 的方式进行添加；

:ghost: 添加内联样式时，通过<span style="color: #ff0000">对象</span>形式添加，这里看上去就是双括号；

:whale: 样式中的一些短横线属性名，需要转为<span style="color: #ff0000">小驼峰</span>；

:whale: 内联样式的属性值要加上引号，否则会被理解为变量。



## 次要

### 使用场景

> 在编译后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。
>
> 故可以在 `if` / `for` 的代码块中使用；也能赋值给变量；作为函数参数；或是作为函数的返回值。



### 防止注入攻击

> 可以安全地在 JSX 当中插入用户输入内容，而不必担心 XSS 攻击。
>
> React DOM 在渲染所有输入内容之前，默认会进行转义，所有的内容在渲染之前都被转换成了字符串。










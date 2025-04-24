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
/* 对象示例 */
const element = <h1>Hello, {{ a: 1, b: 2 }}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```



## 次要

### 作为表达式

> 在编译后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。
>
> 故可以在 `if` / `for` 的代码块中使用；也能赋值给变量；作为函数参数；或是作为函数的返回值。



### 防止注入攻击

> 可以安全地在 JSX 当中插入用户输入内容，而不必担心 XSS 攻击。
>
> React DOM 在渲染所有输入内容之前，默认会进行转义，所有的内容在渲染之前都被转换成了字符串。



### 本身是对象

```jsx
/* JSX 会被 Babel 转译为 ② 的形式 */
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

/* 与 ① 等价 */
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

/* 实际上创建了一个对象（也称为React元素），这是简化结构 */
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```



### 内联 `style` 属性

在 React 中，内联 `style` 属性使用驼峰命名法编写

```html
<!-- 普通HTML -->
<ul style="background-color: black">

<!-- React组件，这里向属性传递对象 -->
<ul style={{ backgroundColor: 'black' }}>
```



### 忽略布尔值、undefined、null

> false, null, undefined, and true 是合法的子元素，而且都不会被渲染。

```jsx
// 以下的 JSX 表达式渲染结果相同
<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```






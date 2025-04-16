### 特性

| 特性       | 次级           | 说明                                                         |
| ---------- | -------------- | ------------------------------------------------------------ |
| 概念       |                | JSX 和 React 是不同的东西，但经常一起使用                    |
| JSX规则    | 单一根组件     | 只能返回一个根组件                                           |
|            |                | 如果不想插入一个多余的标签，可以用 `<>...</> `元素来代替     |
|            | 标签必须闭合   | 自闭合标签需要提供末尾的 `/`                                 |
|            |                | 普通标签需要提供结束标签                                     |
|            | 属性格式       | 大部分属性以驼峰式命名法命名                                 |
|            |                | 与 `DOM` 属性中的命名对应                                    |
|            |                | 由于 `class` 是保留字，用 `className` 代替                   |
|            |                | 由于历史原因，`aria-*` 和 `data-*` 带上了短横线              |
|            | 传递变量       | 使用单/双引号传递字符串                                      |
|            |                | 使用大括号传递变量                                           |
|            | 大括号适用位置 | 用作 jxs 标签内的文本 `<h1>{name}</h1>`                      |
|            |                | 用作 `=` 后的属性值  `src={avatar}`                          |
| 自动化工具 |                | 可以使用[转换器](https://transform.tools/html-to-jsx)将 HTML 转换为 JSX |



### 传递字符串/变量

:::code-group

```[传递变量]jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

```[传递字符串]jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

:::



### 传递变量/调用函数/使用对象

:::code-group

```[传递变量]jsx
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <>
      <h1>{name}'s To Do List</h1>
      <img
        width={100}
      />
    </>
  );
}
```

```[调用函数]jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

```[使用对象-1]jsx
export default function TodoList() {
  return (
    <div style={
      {
        backgroundColor: 'black',
        color: 'pink'
      }
    }>
      some Text ...
    </div>
  );
}
```

```[使用对象-2]jsx
export default function TodoList() {
  return (
    <div style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      some Text ...
    </div>
  );
}
```

```[对象属性]jsx
const person = {
  name: 'Gregorio Y. Zara'
};

export default function TodoList() {
  return <h1>{person.name}'s Todos</h1>
}
```

:::



### 内联 `style` 属性

在 React 中，内联 `style` 属性使用驼峰命名法编写

:::code-group

```[HTML]html
<ul style="background-color: black">
```

```[React组件]jsx
<!-- 相当于传递一个对象 -->
<ul style={{ backgroundColor: 'black' }}>
```

:::






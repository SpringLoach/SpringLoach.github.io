## 保留不参与渲染的值

| 特性   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| 意义   | ref 是一种脱围机制，用于保留不用于渲染的值                   |
|        | 改变它的值不会<span style="color: green">触发重新渲染</span> |
|        | <span style="color: #ff0000">通常用于【记录定时器】 或 【操作dom】</span> |
| 参数   | 以初始值（没有类型限制）作为唯一参数                         |
| 返回值 | ref 是一个普通的 JavaScript 对象，可以通过 `obj.current` 读取/修改值 |

:::code-group

```[示例]jsx
import { useRef } from 'react'; // [!code warning]

export default function Counter() {
  let ref = useRef(0); // [!code warning]

  function handleClick() {
    ref.current = ref.current + 1; // [!code warning]
    alert('你点击了 ' + ref.current + ' 次！'); // 没有改变被React操作的DOM // [!code warning]
  }

  return (
    <button onClick={handleClick}>
      点击我！
    </button>
  );
}
```

```[返回结构]jsx
{ 
  current: 0 // 向 useRef 传入的值
}
```

:::



### 对比state

| 场景     | state                                 | ref                                                  |
| -------- | ------------------------------------- | ---------------------------------------------------- |
| 更改值   | 会重新渲染组件                        | <span style="color: #ff0000">不会重新渲染组件</span> |
| 记录场景 | 需要渲染的信息                        | 不需渲染的信息                                       |
| 可变性   | 不可变——需用 `setValue`，排队重新渲染 | 可变——渲染过程之外可以修改值                         |
| 渲染期间 | 可以读取，存在快照                    | 不应该读取/修改，唯一例外：                          |
|          |                                       | `if (!ref.current) ref.current = new Thing()`        |
| 调用     | `useState(initialValue)`              | `useRef(initialValue)`                               |
| 返回值   | `[value, setValue]`                   | `{ current: initialValue }`                          |



## 记录定时器

每秒数字加一，并让数字渲染到页面上，点击停止按钮，数字停止变动

```jsx
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null); // [!code warning]

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => { // [!code warning]
      setNow(Date.now()); // [!code warning]
    }, 10);  // [!code warning]
  }

  function handleStop() {
    clearInterval(intervalRef.current);  // [!code warning]
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        开始
      </button>
      <button onClick={handleStop}>
        停止
      </button>
    </>
  );
}
```



## 访问 DOM

### 概念

| 特性              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| 适用场景          | 通常会将 refs 用于<span style="color: green">非破坏性操作</span>，例如聚焦、滚动或测量 DOM 元素 |
|                   | React 中没有内置方法做这些事情，故需借助指向 DOM 节点的 ref 来实现 |
| 操作 dom 最佳实践 | 避免更改由 React 管理的 DOM 节点，如修改、添加/删除子元素    |
|                   | 可以修改 React 不去更新的部分 DOM                            |
| 获取更新后的 DOM  | 当封装在 `flushSync` 中的代码执行后，会立即同步更新 DOM      |
| 组件暴露 DOM 节点 | 默认情况下，组件不暴露其 DOM 节点，可以使用 `forwardRef` 进行暴露 |

**使用 refs 操作 DOM 的合适时机**

> 通常通过事件处理器 / effect 访问 refs

| React 更新阶段 | 步骤 | 解释                                   |
| -------------- | ---- | -------------------------------------- |
| ①              | 渲染 | React 调用组件来确定屏幕上应该显示什么 |
| ②              | 提交 | React 把变更应用于 DOM                 |

| 添加 refs 的时机  | 是否合适 | 说明                       |
| ----------------- | -------- | -------------------------- |
| 渲染期间访问 refs | 不合适   | 此时 DOM 节点尚未创建/更新 |
| 提交期间访问 refs | 合适     | 获取更新后的 DOM / `null`  |



**示例**

| 序号 | 步骤                                                         |
| ---- | ------------------------------------------------------------ |
| ①    | 引入 `useRef`                                                |
| ②    | 声明一个ref（初始值为null）                                  |
| ③    | 作为 `ref` 属性添加到需要获取 dom 的节点上                   |
| ④    | （通常）在事件处理程序中，通过 `myRef.current.xx` 调用浏览器API |

```jsx
import { useRef } from 'react'; // [!code warning]

export default function Form() {
  const inputRef = useRef(null); // [!code warning]

  function handleClick() {
    inputRef.current.focus(); // [!code warning]
  }

  return (
    <>
      <input ref={inputRef} /> // [!code warning]
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```



### 使用 ref 绑定列表

如果列表是动态生成的，如何给每项绑定 ref

| 解决方案                                                | 可行性 | 原因                                    |
| ------------------------------------------------------- | ------ | --------------------------------------- |
| 在 jsx 的循环体中动态生成 ref                           | 不可行 | Hook 只能在组件的顶层被调用             |
| 用 ref 引用父组件，使用如 `querySelectorAll` 查找子节点 | 脆弱   | 如果 DOM 结构发生变化，可能会失效或报错 |
| 将函数传递给 ref 属性                                   | 可行   |                                         |

**实现**

| ref 回调 | 说明                                               |
| -------- | -------------------------------------------------- |
| 概念     | 将函数传递给 `ref` 属性                            |
| 关键点   | React 将传入 DOM 节点作为参数，清除时将传入 `null` |
| 意义     | 基于此可以维护自己的 ref 数组或 map，              |
|          | 通过索引或其他 ID 访问单个 DOM 节点                |

```jsx
import { useRef } from 'react';

export default function CatFriends() {
  const itemsRef = useRef(null);

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map(); // [!code warning]
    }
    return itemsRef.current; // [!code warning]
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>
          Tom
        </button>
        <button onClick={() => scrollToId(5)}>
          Maru
        </button>
        <button onClick={() => scrollToId(9)}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul>
          {catList.map(cat => (
            <li  // [!code warning]
              key={cat.id}  // [!code warning]
              ref={(node) => {  // [!code warning] 
                const map = getMap();  // [!code warning]
                if (node) {  // [!code warning]
                  map.set(cat.id, node);  // [!code warning]
                } else {  // [!code warning]
                  map.delete(cat.id);  // [!code warning]
                }  // [!code warning]
              }} // [!code warning]
            >  // [!code warning]
              <img
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}
```



### 访问子组件的 DOM

默认情况下，React 不允许组件访问其他组件的 DOM 节点，认为如此会让代码混乱。

但可以使用 `forwardRef` 显性启用。

| 场景                               | 是否适合暴露DOM节点 | 原因                      |
| ---------------------------------- | ------------------- | ------------------------- |
| 低级组件（如按钮、输入框）         | 适合                |                           |
| 高级组件（如表单、列表或页面段落） | 不适合              | 避免对 DOM 结构的意外依赖 |

**实现**

| 步骤 | 子组件启用暴露dom节点                      |
| ---- | ------------------------------------------ |
| ①    | 子组件使用 `forwardRef` 声明               |
| ②    | 此时的参数：① `props` ② 父级传下来的 `ref` |
| ③    | 将接受到的 `ref` 传递给内部需要的标签      |

:::code-group

```[错误示例]jsx
import { useRef } from 'react';

function MyInput(props) {
  return <input {...props} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```

```[开启支持]jsx
import { forwardRef, useRef } from 'react'; // [!code warning]

const MyInput = forwardRef((props, ref) => { // [!code warning]
  return <input {...props} ref={ref} />; // [!code warning]
}); // [!code warning]

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```

:::



#### 限制访问行为

使用 `useImperativeHandle`，会将 ref 替换为它自身创建的对象

```jsx
import {
  forwardRef, 
  useRef, 
  useImperativeHandle  // [!code warning]
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);  // [!code warning]
  useImperativeHandle(ref, () => ({  // [!code warning]
    // 只暴露 focus，没有别的
    focusXX() {
      realInputRef.current.focus();
    },
  }));  // [!code warning]
  return <input {...props} ref={realInputRef} />;  // [!code warning]
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focusXX();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```



### 获取更新后的 DOM

当封装在 `flushSync` 中的代码执行后，会立即同步更新 DOM。

**示例**

预期效果：点击按钮后向列表末尾添加一个子项，并滚动到该子项处。

:::code-group

```[问题示例]jsx
import { useState, useRef } from 'react';

export default function Demo() {
  const listRef = useRef(null);
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: '123' };
    setTodos([ ...todos, newTodo]); // [!code warning]
    listRef.current.lastChild.scrollIntoView({ // [!code warning]
        behavior: 'smooth',
        block: 'nearest'
    });
  }
    
  return (
    <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
    </ul>
  );
}
```

```[解决方案]jsx
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom'; // [!code warning]

export default function Demo() {
  const listRef = useRef(null);
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: '123' };
    flushSync(() => { // [!code warning]
      setTodos([ ...todos, newTodo]);
    }); // [!code warning]
    listRef.current.lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
  }
    
  return (
    <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
    </ul>
  );
}
```

:::




























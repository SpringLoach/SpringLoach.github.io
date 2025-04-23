### 局部变量不适应于交互

| 特性                 | 说明       |                                                  |
| -------------------- | ---------- | ------------------------------------------------ |
| 局部变量             | 适用场景   | 单个事件处理函数，**无需重新渲染**               |
|                      | 不适用场景 | 需重新渲染。用于实现交互将失效，无法触发组件变化 |
|                      | 原因       | ① 局部变量无法在多次渲染中持久保存               |
|                      |            | ② 更改局部变量不会触发渲染                       |
| 要使用新数据更新组件 | ① 保留     | 渲染之间的数据                                   |
|                      | ② 触发     | React 使用新数据渲染组件（重新渲染）             |

```jsx
const demoList = [1, 2, 3]

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let showCount = demoList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>{ showCount }</h3>
    </>
  );
}
```



### 使用 useState 实现交互

| 特性     | 次级     | 第三              | 说明                                     |
| -------- | -------- | ----------------- | ---------------------------------------- |
| useState | 适用场景 |                   | 当组件需要根据交互更改显示内容           |
|          |          |                   | 在**组件重渲染时**保存信息               |
|          | 参数     |                   | 唯一参数是 state 变量的初始值            |
|          |          |                   | 参数在首次渲染时使用                     |
|          | 返回值   |                   | 返回带有两个元素的数组                   |
|          |          | 命名惯例          | `const [thing, setThing]`                |
|          |          | state 变量        | 会保存上次渲染的值                       |
|          |          | state setter 函数 | 更新 state 变量并触发 React 重新渲染组件 |
| Hook     | 定义     |                   | React 中，任何以 `"use"` 作为前缀的函数  |
|          | 特点     |                   | 只能在组件 或 自定义Hook 的最顶层调用    |
|          | 特点     |                   | 不能在条件/循环/其他嵌套函数内调用       |

```jsx
import { useState } from 'react'; // [!code warning]

const demoList = [1, 2, 3]

export default function Gallery() {
  const [index, setIndex] = useState(0); // [!code warning]

  function handleClick() {
    setIndex(index + 1); // [!code warning]
  }

  let showCount = demoList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>{ showCount }</h3>
    </>
  );
}
```





### 为组件所私有

| 特性   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| 独立性 | 组件实例间的 state 是独立的                                  |
|        | 与 props 不同，state 完全私有于声明它的组件，父组件无法更改它 |
|        | 可以向任何组件添加或删除 state，而不会影响其他组件           |
|        | 如果希望组件间共享 state，应该把它添加到最近的共享父组件中   |

```jsx
import { useState } from 'react'; // [!code warning]

const demoList = [1, 2, 3]

function Gallery() {
  const [index, setIndex] = useState(0); // [!code warning]

  function handleClick() {
    setIndex(index + 1); // [!code warning]
  }

  let showCount = demoList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>{ showCount }</h3>
    </>
  );
}

export default function GalleryList() {
  return (
    <>
      <Gallery />
      <Gallery />
    </>
  );
}
```



### 渲染和提交

React 就是一名服务员，他会帮客户们下单并为他们送来所点的菜品。

1. **触发** 一次渲染（把客人的点单分发到厨房）
2. **渲染** 组件（在厨房准备订单）
3. **提交** 到 DOM（将菜品放在桌子上）
4. 后续 - 状态更新时重新渲染，可以看作是又一次下单了任意菜品

| 特性         | 次级                                                         | 说明                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 触发渲染时机 | 组件的<span style="color: green">初次渲染</span>             |                                                              |
|              | 组件（或其祖先）的<span style="color: green">状态发生变化</span> |                                                              |
| 渲染方式     | ① 初次渲染                                                   | 调用根组件                                                   |
|              | ② 后续渲染                                                   | 调用内部状态更新触发了渲染的函数组件                         |
|              | 特点                                                         | 如果更新后的组件返回另外的组件，会递归渲染直至叶子组件       |
| 渲染行为     | ① 初次渲染                                                   | React 使用 `appendChild()` 将创建的所有 DOM 节点放到屏幕     |
|              | ② 后续渲染                                                   | 应用最少的必要操作，以使得 DOM 与最新的渲染输出相互匹配      |
|              | 特点                                                         | 仅在渲染之间<span style="color: green">存在差异时才会更改 DOM 节点</span> |
| 相关计算     | 在一次重渲染过程中                                           | React 将计算它们的哪些属性自上次渲染以来已更改               |
|              |                                                              | 在下一步（提交阶段）前，不会对这些信息执行任何操作           |
| 性能问题     | 渲染相关[性能问题方案](https://legacy.reactjs.org/docs/optimizing-performance.html) |                                                              |



#### 初次渲染

通过调用目标 DOM 节点的 `createRoot`，然后传入组件调用 `render` 函数完成，部分框架会隐藏该过程。

```jsx
import { createRoot } from 'react-dom/client';

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}


const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```



#### 最小更新

在这个例子中，传入的 `props` 改变，会更新 `h1` 标签的内容，但不会影响到 `input` 标签

```jsx
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```





### 视作快照

| 特性         | 次级          | 说明                                                         |
| ------------ | ------------- | ------------------------------------------------------------ |
| 快照         | 原理          | 每次渲染都存在一个state快照                                  |
|              |               | 每一次渲染都根据<span style="color: green">**当前**渲染的“state快照”</span>计算出“UI快照” |
|              | 固定性        | 一个 state 变量的值永远不会在一次渲染的内部发生变化          |
|              |               | React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部 |
|              |               | 即使是在组件渲染后才会触发的异步函数，使用的也仍是那次快照的state |
| 重新渲染步骤 | ① 执行函数    | React 会再次调用你的函数                                     |
|              | ② 计算快照    | 函数会返回新的 JSX 快照                                      |
|              | ③ 更新 DOM 树 | React 会更新界面以匹配返回的快照                             |

:::code-group

```[同步修改]jsx
import { useState } from 'react';

// 首次点击将输出 1
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```[等价]jsx
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

```[异步输出]jsx
import { useState } from 'react';

// 组件渲染后触发，依旧使用的是本次快照state
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

:::





### 更新队列

| 特性                | 次级     | 说明                                                         |
| ------------------- | -------- | ------------------------------------------------------------ |
| 批处理              | 过程     | 等到事件处理函数中的所有代码运行完毕后                       |
|                     |          | 再处理 state 更新（可以是来自多个组件的 state）              |
|                     | 作用     | 从而不会触发太多的重新渲染                                   |
| 多次更新state       | 概念     | 在下次渲染前多次更新同一个 state                             |
|                     | 方式     | 传入更新<span style="color: green">函数</span>（而非值）     |
|                     |          | 它们会被添加到队列中，并依次触发                             |
| `useState` 参数处理 | 更新函数 | 直接添加到队列中                                             |
|                     | 值       | 添加到队列，并<span style="color: #ed5a65">忽略队列之前的内容</span> |
| `useState` 处理流程 |          | 依次执行更新队列中的操作                                     |

:::code-group

```[更新函数队列]jsx
import { useState } from 'react';

// 2
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

```[替换后更新]jsx
import { useState } from 'react';

// 6
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>增加数字</button>
    </>
  )
}
```

```[更新后替换]jsx
import { useState } from 'react';

// 42
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>增加数字</button>
    </>
  )
}
```

:::



#### 命名惯例

通常可以通过相应 state 变量的第一个字母来命名更新函数的参数

```jsx
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```



### state-对象

| 特性          | 次级          | 说明                                                         |
| ------------- | ------------- | ------------------------------------------------------------ |
| 修改对象      | 避免修改属性  | 对于对象类型的状态，<span style="color: green">避免直接修改值</span>，这不会触发组件的重新渲染 |
|               | state setter  | 正确方式是通过更新函数来重新设置对象                         |
|               | 局部 mutation | 可以通过局部 mutation 触发渲染                               |
| 局部 mutation |               | 指修改一个刚创建（尚未使用）的对象                           |

:::code-group

```[错误的直接赋值]jsx
const [position, setPosition] = useState({ x: 0, y: 0 });

function test() {
  position.x = 2
  position.y = 4
} 
```

```[修改-状态更新]jsx
const [position, setPosition] = useState({ x: 0, y: 0 });

function test() {
  setPosition({
    x: 2,
    y: 4
  });
} 
```

```[局部mutation]jsx
const [position, setPosition] = useState({ x: 0, y: 0 });

function test() {
  const nextPosition = {};
  nextPosition.x = 2;
  nextPosition.y = 4;
  setPosition(nextPosition);
} 
```

:::



| 特性         | 说明                                                 |
| ------------ | ---------------------------------------------------- |
| 对象展开     | 复制对象时，可以使用对象展开语法，避免过多的属性复制 |
| 属性动态命名 | 可以减少重复方法的定义                               |

:::code-group

```[对象展开]jsx
const [position, setPosition] = useState({ x: 0, y: 0 });

function test() {
  setPosition({
    ...position,
    y: 4
  });
} 
```

```[属性动态命名]jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'xx',
    email: 'yy'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <input
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={person.email}
        onChange={handleChange}
      />
    </>
  );
}
```

:::



#### 更新嵌套属性

```jsx
const [person, setPerson] = useState({
  name: 'xx',
  artwork: {
    title: 'yy',
    city: 'zz',
    image: 'cc',
  }
});
```

:::code-group

```[通过局部mutation]jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

```[通过对象展开]jsx
setPerson({
  ...person,
  artwork: {
    ...person.artwork,
    city: 'New Delhi'
  }
});
```

:::



#### 使用 Immer

| 特性 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| 作用 | 它可以使用简洁的语法编写代码，（使用proxy机制）自动帮我们处理好复制的过程 |
|      | 不同于 mutation，它不会覆盖之前的 state                      |
| 特点 | 支持直接修改对象属性，从而减少重复的拷贝代码                 |
|      | 一般方法使用 `update` 而不是 `set` 作为前缀                  |

**示例**

```shell
npm install use-immer
```

```jsx
import { useImmer } from 'use-immer'; // [!code warning]

export default function Form() {
  const [person, updatePerson] = useImmer({ // [!code warning]
    name: 'xx',
    artwork: {
      title: 'yy',
      city: 'zz',
      image: 'cc',
    }
  });
  function demo() {
    updatePerson(draft => {
      person.artwork.image = "qq";
    });
  }
    return <div>{ person }</div>
}
```



### state-数组

| 特性                 | 次级               | 说明                                                         |
| -------------------- | ------------------ | ------------------------------------------------------------ |
| state-数组只读性     | 概念               | 同对象一样，需要将 React state 中的数组视为只读的            |
|                      | 避免               | 使用 `arr[0] = 'aa'` 这样的方式修改元素                      |
|                      | 避免               | 使用会改变原始数组的方法                                     |
| 更新数组（useState） | state setter       | 正确方式是通过更新函数来<span style="color: green">重新设置</span>数组 |
|                      | 添加元素           | 使用 `展开操作符` 模拟 `push` 和 `unshift`                   |
|                      | 删除数组           | 使用 `filter`                                                |
|                      | 转换数组           | 使用 `map`                                                   |
|                      | 替换数组中的元素   | 使用 `map`                                                   |
|                      | 向数组中插入元素   | 使用展开操作符结合 `slice`                                   |
|                      | 更新数组内部的对象 | 不能浅拷贝数组后操作（修改其中的对象属性仍然会影响原对象，造成bug） |
|                      | 更新数组内部的对象 | 使用 `map` 并创建新对象                                      |
| 更新数组（Immer）    | 允许               | 使用产生 `mutation` 的语法                                   |
|                      | 允许               | 使用会改变原始数组的方法                                     |

#### 使用 useState

:::code-group

```[添加元素-模拟push]jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [artists, setArtists] = useState([]);

  setArtists(
    [ 
      ...artists,
      { id: nextId++, name: name } // 在末尾添加一个新的元素
    ]
  );
  
    return <div>{ artists }</div>
}
```

```[添加元素-模拟unshift]jsx
setArtists([
  { id: nextId++, name: name }, // 在开头添加一个新的元素
  ...artists
]);
```

```[删除数组]jsx
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'aa' },
  { id: 1, name: 'bb'},
  { id: 2, name: 'cc'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists( // [!code warning]
                artists.filter(a => a.id !== artist.id) // [!code warning]
              ); // [!code warning]
            }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

```[向数组中插入元素 ]jsx
function handleClick() {
  const insertAt = 1; // 可能是任何索引
  const nextArtists = [
    // 插入点之前的元素：
    ...artists.slice(0, insertAt),
    // 新的元素：
    { id: nextId++, name: 'dd' },
    // 插入点之后的元素：
    ...artists.slice(insertAt)
  ];
  setArtists(nextArtists);
}
```

```[更新数组内部的对象]jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // 创建新对象或局部mutation解决
    return { ...artwork, seen: nextSeen };
  } else {
    // 没有变更
    return artwork;
  }
}));
```

:::



#### 使用 Immer

可以使用产生 `mutation` 的语法修改状态

```jsx
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```






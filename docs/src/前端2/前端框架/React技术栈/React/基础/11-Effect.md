## 使用 Effect 同步

| 特性     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 执行时机 | `useEffect` 会把包裹的代码<span style="color: green">放到屏幕更新渲染之后</span>执行 |
|          | 此时适合将 React 组件与某个外部系统（如网络、第三方库、浏览器api）同步 |



### 编写 Effect

| 一般步骤           | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| 声明 Effect        | 默认情况下，Effect 会在<span style="color: green">每次渲染后</span>执行 |
| 指定 Effect 依赖   | 控制 Effect 在依赖变化时才执行 / 仅挂载时执行                |
| 必要时添加清理函数 | 制定如何停止或撤销它的效果                                   |



#### 声明 Effect

场景：用按钮控制 `video` 的播放/暂停

下面的代码如果没有添加 `useEffect`，将会出错：在渲染期间修改了 DOM

```jsx
import { useState, useRef, useEffect } from 'react';  // [!code warning]

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {  // [!code warning]
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });  // [!code warning]

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```



**死循环代码**

在 `useEffect` 中修改state时要小心，没有终止条件将导致死循环

```jsx
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```



#### 指定 Effect 依赖

| 概念         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| 场景         | 有时候，不需要在每次渲染后都执行 `useEffect`，               |
|              | 如淡入动画只在首次播放，避免每次输入时重新连接服务器         |
| 原理         | 当所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect      |
|              | React 使用 `Object.is` 比较依赖项的值                        |
| 报错机制     | 当指定的依赖项不能与 Effect 代码所期望的相匹配时，lint 将会报错，帮助排错 |
|              | 常量作为依赖项没有意义；响应式值必须包含在依赖性（props、state、组件体内的变量） |
|              | 可变值（包括全局变量）不是响应式的，如 `location.pathname` 不应该作为依赖项 |
| ref 的特殊性 | 依赖数组可以忽略 `ref`，因为 React 保证每轮渲染调用 `useRef` 产生的引用相同 |
|              | 但如果 `ref` 是从父组件传递的，则必须在依赖项数组中指定：    |
|              | 无法确定父组件是否始终传递相同的 ref                         |

**控制用户输入时不触发 `useEffect`**

下面的第二个参数如果传入 `[]`，会报错：Effect 中使用了 `isPlaying` prop 以控制逻辑，但又没有直接告诉 Effect 需要依赖这个属性

```jsx
import { useState, useRef, useEffect } from 'react'; // [!code warning]

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]); // [!code warning]

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```



**调用时机**

```jsx
useEffect(() => {
  // 在每次渲染后执行
});

useEffect(() => {
  // 在组件挂载后执行
}, []);

useEffect(() => {
  // 在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行
}, [a, b]);
```





#### 添加清理函数

| 清理函数 | 说明                                        |
| -------- | ------------------------------------------- |
| 概念     | useEffect 的返回值将作为清理函数            |
| 执行时机 | 每次重新执行 Effect 之前 / 组件被卸载时调用 |

| 特性         | 说明                                              |
| ------------ | ------------------------------------------------- |
| 再次挂载行为 | 严格模式+开发环境，初始挂载组件后，立即再挂载一次 |
|              | 但是组件的 state 与 创建的 DOM 都会被保留         |
|              | 方便排错                                          |

**防止连续连接**

这里如果不添加清理函数，开发环境下将连续“连接”两次

:::code-group

```[App.js]jsx
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>欢迎来到聊天室！</h1>; // [!code warning]
}
```

```[chat.js]jsx
export function createConnection() {
  // 真实的实现会将其连接到服务器，此处代码只是示例
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    }
  };
}
```

```[开发输出]
"✅ 连接中……"
"❌ 连接断开。"
"✅ 连接中……"
```

```[生产输出]
"✅ 连接中……"
```

:::



### 处理 Effect 执行两次

在开发环境中，React 有意重复挂载组件，以查找错误。**正确的态度是“如何修复 Effect 以便它在重复挂载后能正常工作”，而不是“如何只运行一次 Effect”**。



#### 控制非React组件

:::code-group

```[不需清理]jsx
// 组件有一个 setZoomLevel() 方法，希望调整缩放级别与React中的state变量zoomLevel同步
// 这种情况无需清理：两次挂载时依赖项 zoomLevel 都是相同的
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);
```

```[需要清理]jsx
// 内置的 <dialog> 元素的 showModal 方法在连续调用两次时会抛出异常
// 就需要开关开
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close(); // [!code warning]
}, []);
```

:::



#### 订阅事件

```jsx
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll); // [!code warning]
}, []);
```



#### 触发动画

```jsx
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // 触发动画
  return () => {
    node.style.opacity = 0; // 重置为初始值 // [!code warning]
  };
}, []);
```



#### 获取数据

```jsx
// 忽略第二次的请求结果
useEffect(() => {
  let ignore = false; // [!code warning]

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) { // [!code warning]
      setTodos(json);
    } // [!code warning]
  }

  startFetching();

  return () => {
    ignore = true; // [!code warning]
  };
}, [userId]);
```



#### 初始化应用不需 Effect

:::code-group

```[App.js]jsx
// 某些逻辑应该只在应用程序启动时运行一次
if (typeof window !== 'undefined') { // 检查是否在浏览器中运行
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ……
}
```

:::



#### Effect 中不应包含交互响应

```jsx
useEffect(() => {
  // 🔴 错误：此处的 Effect 会在开发环境中执行两次，这在代码中是有问题的。
  // 另外页面回退时也会触发
  fetch('/api/buy', { method: 'POST' });
}, []);

function handleClick() {
  // ✅ 购买商品应当在事件中执行，因为这是由特定的操作引起的。
  fetch('/api/buy', { method: 'POST' });
}
```



### 模拟防抖

产生连续输入时，只有最后一次的闹钟会被响起

```jsx
import { useState, useEffect } from 'react';

function Playground() {
  const [text, setText] = useState('a');

  useEffect(() => {
    function onTimeout() {
      console.log('⏰进行工作 ' + text);
    }

    console.log('🔵 安排3s后 "' + text + '" 工作');
    const timeoutId = setTimeout(onTimeout, 3000); // [!code warning]

    return () => {
      console.log('🟡 取消 "' + text + '" 工作');
      clearTimeout(timeoutId); // [!code warning]
    };
  }, [text]);

  return (
    <>
      <label>
        日志内容：{' '}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </label>
      <h1>{text}</h1>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '卸载' : '挂载'} 组件
      </button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
}
```





## 不需要 Effect 的情况

Effect 是 React 范式中的一种脱围机制。可以 “逃出” React 并使组件和一些外部系统同步。



**适用场景**

- 和一些外部系统同步，比如非 React 组件、网络和浏览器 DOM
- <span style="color: green">组件显示时</span>就需要执行的代码

**不适用场景**

- 不涉及到外部系统（如根据 props 或 state 的变化来更新一个组件的 state）

- 转换渲染所需的数据

  - 如根据 `prop` 值计算新的 state：`Effect` 代码在渲染后执行，会造成多余的一次渲染
  - 充当“计算属性”

- <span style="color: green">发生交互时</span>需要执行的代码（应该放到事件处理函数）

  - 如用户点击购买按钮

  

### 根据 props 或 state 来更新 state

如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值

:::code-group

```[差的做法]jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 避免：多余的 state 和不必要的 Effect // [!code warning]
  const [fullName, setFullName] = useState(''); // [!code warning]
  useEffect(() => { // [!code warning]
    setFullName(firstName + ' ' + lastName); // [!code warning]
  }, [firstName, lastName]); // [!code warning]
  // ...
}
```

```[好的做法]jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ 非常好：在渲染期间进行计算 // [!code warning]
  const fullName = firstName + ' ' + lastName; // [!code warning]
  // ...
}
```

:::



### 缓存计算结果

如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值

如果计算逻辑复杂，不希望每次渲染，且依赖未变更时都重新执行计算，使用 `useMemo`  缓存计算结果

除非 `依赖值` 发生变化，否则在下一次渲染时不会重新执行传入的函数

传入 `useMemo` 的函数会在渲染期间执行，所以它仅适用于 纯函数 场景



:::code-group

```[非必要的Effect]jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 避免：多余的 state 和不必要的 Effect // [!code warning]
  const [visibleTodos, setVisibleTodos] = useState([]); // [!code warning]
  useEffect(() => { // [!code warning]
    setVisibleTodos(getFilteredTodos(todos, filter)); // [!code warning]
  }, [todos, filter]); // [!code warning]

  // ...
}
```

```[普通版本]jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 如果 getFilteredTodos() 的耗时不长，这样写就可以了。 // [!code warning]
  const visibleTodos = getFilteredTodos(todos, filter); // [!code warning]
  // ...
}
```

```[缓存结果]jsx
import { useMemo, useState } from 'react'; // [!code warning]

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => { // [!code warning]
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行 // [!code warning]
    return getFilteredTodos(todos, filter); // [!code warning]
  }, [todos, filter]); // 依赖值 // [!code warning]
  // ...
}
```

:::



### 当 props 变化时重置所有 state

:::code-group

```[差-重复渲染]jsx
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 避免：当 prop 变化时，在 Effect 中重置 state // [!code warning]
  useEffect(() => { // [!code warning]
    setComment(''); // [!code warning]
  }, [userId]); // [!code warning]
  // ...
}
```

```[优-使用key]jsx
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId} // [!code warning]
    />
  );
}

function Profile({ userId }) {
  // ✅ 当 key 变化时，该组件内的 comment 或其他 state 会自动被重置 // [!code warning]
  const [comment, setComment] = useState(''); // [!code warning]
  // ...
}
```

:::



### 当 prop 变化时调整部分 state

- 方案二，存储前序渲染的信息，虽然在渲染过程调用了 `setSelection`，当它执行到 `return` 语句退出后，React 将 **立即** 重新渲染 `List`，避免子组件也重新渲染一次。

- 方案三，调整了行为，从而避免【根据 props 或其他 state 来调整 state】的行为。

:::code-group

```[差-重复渲染]jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 避免：当 prop 变化时，在 Effect 中调整 state // [!code warning]
  useEffect(() => { // [!code warning]
    setSelection(null); // [!code warning]
  }, [items]); // [!code warning]
  // ...
}
```

```[中-避免重新渲染子组件]jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 好一些：在渲染期间调整 state
  const [prevItems, setPrevItems] = useState(items); // [!code warning]
  if (items !== prevItems) { // [!code warning]
    setPrevItems(items); // [!code warning]
    setSelection(null); // [!code warning]
  } // [!code warning]
  // ...
}
```

```[优-调整方案]jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // [!code warning]
  // ✅ 非常好：在渲染期间计算所需内容 // [!code warning]
  const selection = items.find(item => item.id === selectedId) ?? null; // [!code warning]
  // ...
}
```

:::



### 在事件处理函数中共享逻辑

:::code-group

```[错-每次刷新时执行]jsx
function ProductPage({ product, addToCart }) {
  // 🔴 避免：在 Effect 中处理属于事件特定的逻辑 // [!code warning]
  useEffect(() => { // [!code warning]
    if (product.isInCart) { // [!code warning]
      showNotification(`已添加 ${product.name} 进购物车！`); // [!code warning]
    } // [!code warning]
  }, [product]); // [!code warning]

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```

```[优-抽离公共逻辑]jsx
function ProductPage({ product, addToCart }) {
  // ✅ 非常好：事件特定的逻辑在事件处理函数中处理
  function buyProduct() {
    addToCart(product);
    showNotification(`已添加 ${product.name} 进购物车！`);
  }

  function handleBuyClick() {
    buyProduct(); // [!code warning]
  }

  function handleCheckoutClick() {
    buyProduct(); // [!code warning]
    navigateTo('/checkout');
  }
  // ...
}
```

:::



### 发送 POST 请求

| 使用方式     | 说明                 |
| ------------ | -------------------- |
| useEffect    | 看到组件时引起       |
| 事件处理函数 | 由某个特定的交互引起 |

页面加载之际会发送一个分析请求，在点击提交按钮时，发生另一个请求。

:::code-group

```[不合理]jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 非常好：这个逻辑应该在组件显示时执行 // [!code warning]
  useEffect(() => { // [!code warning]
    post('/analytics/event', { eventName: 'visit_form' }); // [!code warning]
  }, []); // [!code warning]

  // 🔴 避免：在 Effect 中处理属于事件特定的逻辑
  const [jsonToSubmit, setJsonToSubmit] = useState(null); // [!code warning]
  useEffect(() => { // [!code warning]
    if (jsonToSubmit !== null) { // [!code warning]
      post('/api/register', jsonToSubmit); // [!code warning]
    } // [!code warning]
  }, [jsonToSubmit]); // [!code warning]

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```

```[合理]jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 非常好：这个逻辑应该在组件显示时执行
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ 非常好：事件特定的逻辑在事件处理函数中处理 // [!code warning]
    post('/api/register', { firstName, lastName }); // [!code warning]
  }
  // ...
}
```

:::



### 链式计算 

:::code-group

```[差-重新渲染+难以拓展]jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 避免：链接多个 Effect 仅仅为了相互触发调整 state // [!code warning]
  useEffect(() => { // [!code warning]
    if (card !== null && card.gold) { // [!code warning]
      setGoldCardCount(c => c + 1); // [!code warning]
    } // [!code warning]
  }, [card]); // [!code warning]
 // [!code warning]
  useEffect(() => { // [!code warning]
    if (goldCardCount > 3) { // [!code warning]
      setRound(r => r + 1) // [!code warning]
      setGoldCardCount(0); // [!code warning]
    } // [!code warning]
  }, [goldCardCount]); // [!code warning]
 // [!code warning]
  useEffect(() => { // [!code warning]
    if (round > 5) { // [!code warning]
      setIsGameOver(true); // [!code warning]
    }// [!code warning]
  }, [round]); // [!code warning]
 // [!code warning]
  useEffect(() => { // [!code warning]
    alert('游戏结束！'); // [!code warning]
  }, [isGameOver]); // [!code warning]

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('游戏已经结束了。');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```

```[优-改良]jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ 尽可能在渲染期间进行计算 // [!code warning]
  const isGameOver = round > 5; // [!code warning] 

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('游戏已经结束了。');
    }

    // ✅ 在事件处理函数中计算剩下的所有 state // [!code warning]
    setCard(nextCard); // [!code warning]
    if (nextCard.gold) { // [!code warning]
      if (goldCardCount <= 3) { // [!code warning]
        setGoldCardCount(goldCardCount + 1); // [!code warning]
      } else { // [!code warning]
        setGoldCardCount(0); // [!code warning]
        setRound(round + 1); // [!code warning]
        if (round === 5) { // [!code warning]
          alert('游戏结束！'); // [!code warning]
        } // [!code warning]
      } // [!code warning]
    } // [!code warning]
  }

  // ...
```

:::



### 初始化应用

| 逻辑执行场景           | 方式                       |
| ---------------------- | -------------------------- |
| 每次应用加载时执行一次 | useEffect                  |
| 每次组件挂载时执行一次 | 顶层执行（保留在应用入口） |

:::code-group

```[差-不利复用]jsx
function App() {
  // 🔴 避免：把应用加载时只需执行一次的逻辑放在 Effect 中
  useEffect(() => { // [!code warning]
    loadDataFromLocalStorage(); // [!code warning]
    checkAuthToken(); // [!code warning]
  }, []); // [!code warning]
  // ...
}
```

```[优-顶层记录执行]jsx
let didInit = false; // [!code warning]

function App() {
  useEffect(() => {
    if (!didInit) { // [!code warning]
      didInit = true; // [!code warning]
      // ✅ 只在每次应用加载时执行一次
      loadDataFromLocalStorage();
      checkAuthToken();
    } // [!code warning]
  }, []);
  // ...
}
```

```[优-顶层直接执行]jsx
if (typeof window !== 'undefined') { // 检测我们是否在浏览器环境 // [!code warning]
   // ✅ 只在每次应用加载时执行一次
  checkAuthToken();
  loadDataFromLocalStorage();
} // [!code warning]

function App() {
  // ...
}
```

:::



### state 变化通知父组件

情景：希望状态改变时，同步消息给父组件。

:::code-group

```[差-执行过晚]jsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 避免：onChange 处理函数执行的时间太晚了 // [!code warning]
  useEffect(() => { // [!code warning]
    onChange(isOn); // [!code warning]
  }, [isOn, onChange]) // [!code warning]

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}
```

```[优-同时处理]jsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) { // [!code warning]
    // ✅ 非常好：在触发它们的事件中执行所有更新 // [!code warning]
    setIsOn(nextIsOn); // [!code warning]
    onChange(nextIsOn); // [!code warning]
  } // [!code warning]

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```

```[优-状态提升]jsx
// ✅ 也很好：该组件完全由它的父组件控制 // [!code warning]
function Toggle({ isOn, onChange }) { // [!code warning]
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
```

:::



### 将数据传递给父组件 

避免往上传递数据：数据流变得非常难以追踪

如果子组件和父组件都需要相同的数据，那么可以让父组件获取那些数据，再向下传递

:::code-group

```[差-向上传递]jsx
function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 避免：在 Effect 中传递数据给父组件 // [!code warning]
  useEffect(() => { // [!code warning]
    if (data) { // [!code warning]
      onFetched(data); // [!code warning]
    } // [!code warning]
  }, [onFetched, data]); // [!code warning]
  // ...
}
```

```[优-向下传递]jsx
function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ 非常好：向子组件传递数据 // [!code warning]
  return <Child data={data} />; // [!code warning]
}

function Child({ data }) {
  // ...
}
```

:::



### 订阅外部 store

订阅 React state 之外的一些数据（如来自第三方库或内置浏览器 API）。

由于 React 无法感知它们的变化，需要在组件中手动订阅。

通常使用 Effect 或使用针对该场景的 API `useSyncExternalStore` 实现。



:::code-group

```[useEffect]jsx
function useOnlineStatus() {
  // 不理想：在 Effect 中手动订阅 store // [!code warning]
  // 由于该API在服务端不存在（不能用于初始的 HTML），故state设置最初值true // [!code warning]
  const [isOnline, setIsOnline] = useState(true); // [!code warning]
  useEffect(() => { // [!code warning]
    function updateState() { // [!code warning]
      setIsOnline(navigator.onLine); // [!code warning]
    } // [!code warning]
 // [!code warning]
    updateState(); // [!code warning]
 // [!code warning]
    window.addEventListener('online', updateState); // [!code warning]
    window.addEventListener('offline', updateState); // [!code warning]
    return () => { // [!code warning]
      window.removeEventListener('online', updateState); // [!code warning]
      window.removeEventListener('offline', updateState); // [!code warning]
    }; // [!code warning]
  }, []); // [!code warning]
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

```[内置Hook]jsx
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  // ✅ 非常好：用内置的 Hook 订阅外部 store // [!code warning]
  return useSyncExternalStore( // [!code warning]
    subscribe, // 只要传递的是同一个函数，React 不会重新订阅 // [!code warning]
    () => navigator.onLine, // 如何在客户端获取值 // [!code warning]
    () => true // 如何在服务端获取值 // [!code warning]
  ); // [!code warning]
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

:::



### 获取数据

当用户快速输入时，会触发多个请求，无法保证哪个的 `setResults()` 最后调用，故须提供清除逻辑

还可以将相关逻辑抽离为自定义 Hook，减少应用中的 `useEffect`，这样维护应用将变得更加容易

实现数据获取还存在很多难点，故使用现代框架更有优势

| 需要考虑的一系列问题 | 说明                                         |
| -------------------- | -------------------------------------------- |
| 竞态条件             | 触发多个请求，无法保证对应的返回顺序         |
| 缓存响应结果         | 使页面后退能立即看到先前的屏幕内容           |
| 在服务端获取数据     | 使服务端初始渲染的 HTML 中就包含获取内容     |
| 避免网络瀑布         | 避免子组件等到父组件获取数据后才开始获取数据 |

:::code-group

```[无清除逻辑]jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => { // [!code warning]
    // 🔴 避免：没有清除逻辑的获取数据 // [!code warning]
    fetchResults(query, page).then(json => { // [!code warning]
      setResults(json); // [!code warning]
    }); // [!code warning]
  }, [query, page]); // [!code warning]

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

```[提供清除逻辑]jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false; // [!code warning]
    fetchResults(query, page).then(json => {
      if (!ignore) { // [!code warning]
        setResults(json);
      } // [!code warning]
    });
    return () => { // [!code warning]
      ignore = true; // [!code warning]
    }; // [!code warning]
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

```[自定义Hook]jsx
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`); // [!code warning]

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
```

:::



## 响应式 Effect 的生命周期

| React 组件生命周期 | 说明                               |
| ------------------ | ---------------------------------- |
| 挂载               | 当组件被添加到屏幕上时             |
| 更新               | 当组件接收到新的 props 或 state 时 |
| 卸载               | 当组件从屏幕上移除时               |

- **Effect 是一段响应式的代码块**，在读取的值发生变化时重新进行同步
- 事件处理程序只在每次交互时运行一次，是**非响应式的**



| Effect 函数 | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| 主体        | 主体部分指定了如何 **开始同步**                              |
| 返回值      | 返回的清理函数指定了如何 **停止同步**                        |
| 返回值      | 可以不显性返回清理函数，类似于返回了空函数                   |
| 第二参数    | 指定依赖项，当依赖项变化时进行一次同步                       |
|             | 如果指定，响应式值必须包含在依赖性（props、state、组件体内的变量） |
|             | 如果不想重新同步，可以将常量移动到组件外部，或 Effect 内部   |



### 按目的拆分 Effect

| 概念     | 说明                                                     |
| -------- | -------------------------------------------------------- |
| 前置条件 | 代码中的每个 Effect 应该代表一个独立的同步过程           |
| 拆分原因 | 【记录访问行为】 与 【连接】 是两个不同的过程            |
|          | 将代码拆分后，不影响另一个 `useEffect` 的逻辑            |
|          | 若不进行拆分，当未来迭代时，                             |
|          | 【连接】需要添加依赖项时，会导致不必要的【记录访问行为】 |

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
  }, [roomId]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    // ...
  }, [roomId]);
  // ...
}
```



**例子二**

用户选择国家时获取城市；用户选择城市时获取地区

:::code-group

```[整合]jsx
// 若将两种情况整合到一个 useEffect // [!code warning]
// 当用户选择不同的城市时，Effect 将重新运行并获取重复的城市列表 // [!code warning]
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 避免: 单个 Effect 同步两个独立逻辑处理 // [!code warning]
    if (city) { // [!code warning]
      fetch(`/api/areas?city=${city}`) // [!code warning]
        .then(response => response.json()) // [!code warning]
        .then(json => { // [!code warning]
          if (!ignore) { // [!code warning]
            setAreas(json); // [!code warning]
          } // [!code warning]
        }); // [!code warning]
    } // [!code warning]
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ 所有依赖已声明 // [!code warning]

  // ...
```

```[拆分]jsx
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ 所有依赖已声明

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  useEffect(() => { // [!code warning]
    if (city) { // [!code warning]
      let ignore = false; // [!code warning]
      fetch(`/api/areas?city=${city}`) // [!code warning]
        .then(response => response.json()) // [!code warning]
        .then(json => { // [!code warning]
          if (!ignore) { // [!code warning]
            setAreas(json); // [!code warning]
          } // [!code warning]
        }); // [!code warning]
      return () => { // [!code warning]
        ignore = true; // [!code warning]
      }; // [!code warning]
    } // [!code warning]
  }, [city]); // ✅ 所有依赖已声明 // [!code warning]

  // ...
```

:::



### 避免重新同步

:::code-group

```[移至组件外部]jsx
const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的 // [!code warning]
const roomId = 'general'; // roomId 不是响应式的 // [!code warning]

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖 // [!code warning]
  // ...
}
```

```[移至Effect内部]jsx
function ChatRoom() {
  useEffect(() => {
    const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的 // [!code warning]
    const roomId = 'general'; // roomId 不是响应式的 // [!code warning]
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖 // [!code warning]
  // ...
}
```

:::



## 从 Effect 中提取非响应式逻辑

| Effect Event | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| 背景         | 当需要使用到响应式变量的值，却又不想添加到依赖时，`useEffect` 达不到效果： |
|              | 不添加到依赖会报错，添加到依赖会成为响应逻辑                 |
| 意义         | Effect Event 能够从 Effect 中提取**非响应式逻辑**            |
|              | 使用 Effect Event 获取到的是最新的 props 和 state            |
| 局限性       | 只在 Effect 内部调用                                         |
|              | 永远不要把他们传给其他的组件或者 Hook                        |



**例子一**

下面的同步内容需要用到 `state` theme 的值，但不希望它的变化触发响应：

示例场景：更换聊天室时弹出(对应主题的)欢迎信息，而修改主题时，不会额外弹出信息

:::code-group

```[不合预期]jsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme); // [!code warning]
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // [!code warning]
  // ...
```

```[合预期]jsx
import { useEffect, useEffectEvent } from 'react'; // [!code warning]

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => { // [!code warning]
    showNotification('Connected!', theme); // [!code warning]
  }); // [!code warning]

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected(); // [!code warning]
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 声明所有依赖项 // [!code warning]
  // ...
```

:::



**例子二**

示例场景：在路径改变时进行一次记录，包含当前的【购物车中的商品数量】，但【购物车中的商品数量】变化时不进行记录

:::code-group

```[不合预期]jsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
  }, [url]); // 🔴 React Hook useEffect 缺少依赖项: ‘numberOfItems’ // [!code warning]
  // ...
}
```

```[合预期]jsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => { // [!code warning]
    logVisit(visitedUrl, numberOfItems); // [!code warning]
  }); // [!code warning]

  useEffect(() => {
    onVisit(url); // [!code warning]
  }, [url]); // ✅ 声明所有依赖项
  // ...
}
```

:::





## 移除 Effect 依赖

- 如果想根据以前的状态更新一些状态，传递一个更新函数

- 如果 Effect 的不同部分因不同原因需要重新运行，请将其拆分为多个 Effect

- 尽量避免对象和函数依赖。将它们移到组件外或 Effect 内

- 在 JavaScript 中，如果对象和函数是在不同时间创建的，则它们被认为是不同的



### 避免读取状态进行更新

**目的**

- 希望在接受到新消息时，Effect 中会更新本地 state

- 希望本地 state 改变时不会带来同步（重新连接）

**方式**

- 如果直接读取 state 进行更新，它不得不成为依赖，带来非预期行为

- 可以传递更新函数以避免该问题

- **state的更新函数是稳定的，不必成为依赖**

:::code-group

```[错-接受消息导致重连]jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]); // [!code warning]
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ 所有依赖已声明 // [!code warning]
  // ...
```

```[对-接受消息不触发重连]jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]); // [!code warning]
    });
    return () => connection.disconnect(); 
  }, [roomId]); // ✅ 所有依赖已声明 // [!code warning]
  // ...
```

:::



### 避免将对象和函数作为依赖

在使用组件内的对象/函数作为 Effect 依赖时

当输入内容改变 state `message` 时，也会导致重新同步

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = { // [!code warning]
    serverUrl: serverUrl, // [!code warning]
    roomId: roomId // [!code warning]
  }; // [!code warning]

  useEffect(() => {
    const connection = createConnection(options); // [!code warning]
    connection.connect();
    // ...
```



#### 将静态对象和函数移出组件 

```jsx
const options = { // [!code warning]
  serverUrl: 'https://localhost:1234', // [!code warning]
  roomId: '音乐' // [!code warning]
}; // [!code warning]

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options); // [!code warning]
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ 所有依赖已声明
  // ...
```



#### 将动态对象和函数移动到 Effect 中 

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = { // [!code warning]
      serverUrl: serverUrl, // [!code warning]
      roomId: roomId // [!code warning]
    }; // [!code warning]
    const connection = createConnection(options); // [!code warning]
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明 // [!code warning]
  // ...
```



#### 从对象中读取原始值

由于父组件会在渲染过程中创建对象，

- 方式一，在每次父组件重新渲染时导致触发Effect进行重新连接（不合理）

- 方式二，将实际需要的值从对象中提取出来，就能解决问题（避免依赖对象和函数类型）

`父组件`

```jsx
<ChatRoom
  roomId={roomId}
  options={{ // [!code warning]
    serverUrl: serverUrl, // [!code warning]
    roomId: roomId // [!code warning]
  }} // [!code warning]
/>
```

:::code-group

```[方式一]jsx
function ChatRoom({ options }) { // [!code warning]
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options); // [!code warning]
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ 所有依赖已声明 // [!code warning]
  // ...
```

```[方式二]jsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options; // [!code warning]
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId, // [!code warning]
      serverUrl: serverUrl // [!code warning]
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 所有依赖已声明 // [!code warning]
  // ...
```

:::



#### 从函数中计算原始值

避免重新同步方式选择：

| 方式                   | 适用场景     | 说明                       |
| ---------------------- | ------------ | -------------------------- |
| 从函数中计算值         | 纯函数       | 可以在渲染期间可以安全调用 |
| 提取到 Effect Event 中 | 事件处理程序 | 非响应式逻辑               |

`父组件`

```jsx
<ChatRoom
  roomId={roomId}
  getOptions={() => { // [!code warning]
    return { // [!code warning]
      serverUrl: serverUrl, // [!code warning]
      roomId: roomId // [!code warning]
    }; // [!code warning]
  }} // [!code warning]
/>
```

`子组件`

```jsx
function ChatRoom({ getOptions }) { // [!code warning]
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions(); // [!code warning]
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 所有依赖已声明
  // ...
```



## 使用自定义 Hook 复用逻辑

**封装的意义**

可以通过 Hook 封装特定的功能，例如获取数据，记录用户是否在线或者连接聊天室；

当提取逻辑到自定义 Hook 时，可以隐藏如何处理外部系统或者浏览器 API 这些乱七八糟的细节；

组件内部的代码表达的是目标而不是具体实现；

每当写 Effect 时，考虑一下把它包裹在自定义 Hook 是否更清晰。



**状态没有被共享**

自定义 Hook 共享的只是状态逻辑而不是状态本身。对 Hook 的每个调用完全独立于对同一个 Hook 的其他调用

当你需要在多个组件之间共享 state 本身时，需要<span style="color: green">将变量提升并传递下去</span>



**剔除非相应式代码**

自定义 Hook 的代码应该和组件代码一样保持纯粹

把自定义 Hook 收到的事件处理函数包裹到 Effect Event



### 复用逻辑提取为 Hook

场景：想要根据用户是否在线，在页面上渲染不同的内容，按一般思路需要新建一个 state 追踪是否在线，并订阅事件进行更新。

优化：组件唯一关心的是，当前用户是否在线，可以将实现细节抽离为 Hook，后续可以很容易地在不同组件间实现逻辑的复用。

**原代码**

```jsx
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```

**优化**

:::code-group

```[预期结果]jsx
function StatusBar() {
  const isOnline = useOnlineStatus(); // [!code warning]
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```

```[抽离实现细节]jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true); // [!code warning]
  useEffect(() => { // [!code warning]
    function handleOnline() { // [!code warning]
      setIsOnline(true); // [!code warning]
    } // [!code warning]
    function handleOffline() { // [!code warning]
      setIsOnline(false); // [!code warning]
    } // [!code warning]
    window.addEventListener('online', handleOnline); // [!code warning]
    window.addEventListener('offline', handleOffline); // [!code warning]
    return () => { // [!code warning]
      window.removeEventListener('online', handleOnline); // [!code warning]
      window.removeEventListener('offline', handleOffline); // [!code warning]
    }; // [!code warning]
  }, []); // [!code warning]
  return isOnline;
}
```

:::



### 命名以 `use` 开头

:::code-group

```[Hook]jsx
function SaveButton() {
  const isOnline = useOnlineStatus(); // [!code warning]
  // ...
}
```

```[普通方法]jsx
function SaveButton() {
  if (shouldSort) {
    // ✅ 在条件分支里调用getSorted()是没问题的，因为它不是Hook // [!code warning]
    displayedItems = getSorted(items); // [!code warning]
  }
}
```

:::



### 向 Hook 传递响应值

:::code-group

```[ChatRoom.js]jsx
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId, // [!code warning]
    serverUrl: serverUrl // [!code warning]
  });
```

```[useChatRoom.js]jsx
export function useChatRoom({ serverUrl, roomId }) { // [!code warning]
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    // ...
  }, [roomId, serverUrl]);
}
```

:::



### 向 Hook 传递函数

> 传递自定义的逻辑行为

由于传入了组件内部的函数，将导致每次组件重新渲染都导致重新同步；

为了避免这种情况，使用 `useEffectEvent` 剔除函数这个非响应式代码。

:::code-group

```[ChatRoom.js]jsx
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg); // [!code warning]
    }
  });
  // ...
```

```[useChatRoom.js]jsx
import { useEffect, useEffectEvent } from 'react'; // [!code warning]
// ...

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) { // [!code warning]
  const onMessage = useEffectEvent(onReceiveMessage); // [!code warning]

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg); // [!code warning]
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 声明所有依赖 // [!code warning]
}
```

:::
























































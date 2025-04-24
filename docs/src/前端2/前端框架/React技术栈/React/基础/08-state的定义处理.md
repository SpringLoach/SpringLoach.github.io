### 选择state状态

- 对于两个总是一起更新的 state 变量 / 可以添加自定义字段的表单，考虑合并为对象/数组。
- 仔细选择 state 变量，以避免创建“极难处理”的 state。
- 用一种减少出错更新的机会的方式来构建 state。
- 避免冗余和重复的 state，这样就不需要保持同步。
- 除非想防止更新，否则不要将 props **放入** state 中。
- 对于选择类型的 UI 模式，请在 state 中保存 ID 或索引而不是对象本身。
- 如果深度嵌套 state 更新很复杂，尝试将其展开扁平化。

| 特性                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| 在 state 中镜像 props | 当父组件稍后更新 `initialColor` 值时，`color` 变量将不会更新 |
|                       | 因为 state 仅在第一次渲染期间初始化                          |
| 意义                  | 可以用于忽略该 `props` 属性的后续更新                        |
|                       | 此时 `prop` 一般以 `initial` 或 `default` 作为前缀           |



**保存 props**

:::code-group

```[获取首次]jsx
function Message({ initialColor }) {
  // 用于保存initialColor的初始值，再次渲染与initialColor无关
  const [color, setColor] = useState(initialColor);
```

```[获取每次]jsx
function Message({ initialColor }) {
  // 每次initialColor更新，都获取到最新值
  const color = useState(initialColor);
```

:::



### 共享状态

| 定义     |          | 说明                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| 状态提升 | 定义     | 把组件间的state移到公共父级，再通过 props 将 state 传递给这两个组件 |
|          | 步骤     | ① 想要整合两个组件时，将它们的 state 移动到共同的父组件中    |
|          |          | ② 然后在父组件中通过 `props` 把信息传递下去                  |
|          |          | ③ 最后，向下传递事件处理程序，以便子组件可以改变父组件的 state |
|          | 分布特征 | 部分状态活跃在叶子组件附近，如输入框                         |
|          |          | 部分状态在应用程序顶部“活动”，如客户端路由库                 |

**例子**

```jsx
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0); // [!code warning]
  return (
    <>
      <Panel
        title="内容一"
        isActive={activeIndex === 0} // [!code warning]
        onShow={() => setActiveIndex(0)} // [!code warning]
      >
        11111
      </Panel>
      <Panel
        title="内容二"
        isActive={activeIndex === 1} // [!code warning]
        onShow={() => setActiveIndex(1)} // [!code warning]
      >
        22222
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          显示
        </button>
      )}
    </section>
  );
}
```



### state的保留和重置

| 特性                     | 次级                  | 说明                                                        |
| ------------------------ | --------------------- | ----------------------------------------------------------- |
| 状态与渲染树中的位置相关 | 状态是由 React 保存的 | React 通过组件在渲染树中的位置，                            |
|                          |                       | 将它保存的每个状态与正确的组件关联起来                      |
|                          | 保留条件              | 只有当在树中相同的位置渲染相同的组件时，                    |
|                          |                       | React 才会一直保留着组件的 state                            |
|                          | 消失情况              | 当停止渲染某个组件的那一刻，它的 state 就会完全消失，       |
|                          |                       | 因为 React 在移除一个组件时，也会销毁它的 state             |
| 无关 JSX 位置            |                       | 无论 JSX 中如何组织代码，都不会影响状态的保留情况           |
|                          |                       | React 不知道函数里是如何进行条件判断的                      |
|                          |                       | 对 React 来说重要的是组件在 UI 树中的位置                   |
| 替换组件会重置           |                       | 当在相同位置渲染不同的组件时，组件的整个子树都会被重置      |
|                          |                       | 如果想在重新渲染时保留 state，                              |
|                          |                       | 几次渲染中的树形结构就应该相互“匹配”                        |
| 在相同位置重置 state     | 方法                  | ① 将组件渲染在不同的位置                                    |
|                          |                       | ② 使用 `key` 赋予每个组件一个明确的身份                     |
|                          | 拓展                  | 切换身份时表单内容要重置，可以用身份信息给表单添加 `key` 值 |
| 为移除组件保留 state     | 方法                  | ① 使用css隐藏组件，适用于 DOM 节点很少的情况                |
|                          |                       | ② 使用状态提升，在父组件中保存信息，这是最常见的解决方法    |
|                          |                       | ③ 使用其他数据源，如 `LocalStorage`                         |
| 拓展                     | 避免嵌套组件定义      | 会导致 state 被重置：每次都会创建一个不同的被嵌套函数       |



#### 无关 JSX 位置

:::code-group

```[父组件]jsx
<!-- isXX 的改变，不会导致子组件Counter中的state重置 -->
<div>
  {isXX ? (
    <Counter isFancy={true} count={2} /> 
  ) : (
    <Counter isFancy={false} count={3} /> 
  )}
</div>
```

```[子组件]jsx
function Counter({ isFancy }) {
  const [score, setScore] = useState(0); // [!code warning]

  let className = 'counter';
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1> // [!code warning]
      <button onClick={() => setScore(score + 1)}> // [!code warning]
        加一 // [!code warning]
      </button> // [!code warning]
    </div>
  );
}
```

:::



#### 在相同位置重置 state

:::code-group

```[渲染在不同位置]jsx
<!-- 相当于组件的位置发生了替换，会重置 state -->
<div>
  {isXX && (
    <Counter isFancy={true} count={2} /> 
  )}
  {!isXX && (
    <Counter isFancy={false} count={3} /> 
  )}
</div>
```

```[使用key]jsx
<div>
  {isXX ? (
    <Counter isFancy={true} count={2} key={2} /> 
  ) : (
    <Counter isFancy={false} count={3} key={3} /> 
  )}
</div>
```

:::




































































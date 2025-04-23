

immer 优化 state 状态修改

reducer 整合组件的状态更新逻辑

use-immer 复合 immer 和 reducer

context 解决 props 多层传递不便，让数据直达





## 状态逻辑迁移至reducer

| 特性   | 次级                | 说明                                                         |
| ------ | ------------------- | ------------------------------------------------------------ |
| 定义   |                     | 将组件的所有<span style="color: #ed5a65">状态更新逻辑</span>整合到的一个外部函数 |
|        | 解决问题            | 过于分散的事件处理程序可能会令人不知所措                     |
| 步骤   |                     | 将设置状态的逻辑 <span style="color: green">修改</span> 成 dispatch 的一个 action |
|        |                     | <span style="color: green">编写</span> reducer 函数；        |
|        |                     | 在组件中 <span style="color: green">使用</span> reducer      |
| 对比   | 直接设置状态        | 通过设置状态来告诉 React “要做什么”                          |
|        | reducers 管理       | 通过事件处理程序 dispatch 一个 “action” 来指明<span style="color: #ed5a65">用户的行为</span> |
| action | `dispatch` 接收对象 | 传递给 `dispatch` 的对象叫做 “action”，结构是自定义的        |
|        |                     | 按照惯例，通常会添加字符串类型的 `type` 字段来描述<span style="color: #ed5a65">用户行为/发生什么</span> |
|        |                     | `type` 是特定于组件的                                        |
| 职责   | 事件处理程序        | 通过派发 `action` 来指定<span style="color: #ed5a65">用户行为/发生什么</span> |
|        | `reducer` 函数      | 响应 `actions` ，<span style="color: #ed5a65">更新状态</span> |
| 其他   |                     | reducers 必须是纯粹的，类似纯函数                            |
|        |                     | action 应该描述一个单一的用户交互                            |



### 编写reducer

#### 1. 将状态逻辑修改为action

:::code-group

```[原逻辑]jsx
/* 原本的处理逻辑：直接设置状态 */

function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}
```

```[改写]jsx
/* 
*   ① 移除所有的状态设置逻辑 
*   ② dispatch 对应行为的 action
*/
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

```[action对象]jsx
dispatch({
  // 针对特定的组件
  type: 'what_happened',
  // 其它字段放这里
});
```

:::



#### 2. 编写reducer函数

| 概念 | 次级   | 说明                                                         |
| ---- | ------ | ------------------------------------------------------------ |
| 定义 |        | 放置状态逻辑的地方                                           |
|      | 特点   | 由于接受 `state` 作为参数，可以在组件外声明                  |
| 结构 | 参数   | 当前 state 和 action 对象                                    |
|      | 返回值 | 更新后的 state                                               |
| 组织 |        | 也可以使用 `if/else` 语句实现，但在 `ruducers` 使用 switch 语句 是一种惯例 |
|      |        | 两种方式结果是相同的，但 `switch` 语句读起来一目了然         |
|      |        | 建议将每个 `case` 块包装到 `{` 和 `}` 花括号中，             |
|      |        | 这样在不同 `case` 中声明的变量就不会互相冲突                 |



```javascript
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
```



#### 3. 在组件中使用reducer

| 概念 | 次级   | 说明                                                         |
| ---- | ------ | ------------------------------------------------------------ |
| 定义 |        | `useReducer` 和 `useState` 很相似                            |
|      |        | 必须给它传递一个初始状态，它会返回一个有状态的值和一个设置该状态的函数 |
| 结构 | 参数   | ① 一个 reducer 函数 ② 一个初始的 state                       |
|      | 返回值 | ① 一个有状态的值     ② 一个 dispatch 函数（告诉 reducer 用户做了什么） |
| 组织 |        | 可以把 reducer 移到一个单独的文件，实现关注点分离            |

:::code-group

```[App.js]jsx
import { useState } from 'react'; // [!code --]
import { useReducer } from 'react'; // [!code ++]
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import tasksReducer from './tasksReducer.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks); // [!code --]
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks); // [!code ++]

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
```

```[tasksReducer.js]jsx
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
```

:::



### 使用 Immer 简化 reducers

| 特性     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 特点     | 就像是简化对象/数组操作一样， `Immer` 也可以简化 `reducer`   |
| 编写函数 | 对比普通 reducer，（由于底层使用了代理）可以直接修改 reducer 的第一个参数，而不需返回新的 state |

:::code-group

```[App.js]jsx
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
```

```[package.json]json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
```

:::



## 使用 Context 深层传递参数

| 特性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| 意义         | 解决 props 多层传递不便，让数据直达                          |
| 从最近获取值 | 组件会使用 UI 树中在它上层最近的那个 `<LevelContext.Provider>` 传递过来的值 |
| 穿透性       | context 能穿过中间层级的组件，避免代码层层传递               |
| 使用限制     | context实例之间不会造成干扰；一个组件可以使用多个context     |
| 适用场景     | 可以用它来传递整个子树需要的任何信息：当前的外观主题、当前账户信息、路由、状态管理 |
| 触发重新渲染 | 如果 context 在下次渲染传递了不同的值，React 会去更新下级组件，故可以与 state 结合使用 |
| 使用前提     | 在使用 context 之前，先考虑以下两种方案                      |
|              | ① 考虑传递 props，会让数据结构更加清晰，便于维护             |
|              | ② 抽离出子组件作为children传递，减少定义-使用数据的层级      |



| 使用步骤       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| ① 创建 context | 使用 `createContext` 创建 context，它接受一个默认值（可以是任意类型）作为参数 |
| ② 使用 context | 使用 `useContext` 表示该组件想要获取对应的 `context` 实例    |
| ③ 提供 context | 使用 `xxxContext.Provider` 标签包裹组件，添加 `value` 属性将值传递给后代组件 |



### 使用示例

下面的场景中，需要各个级别的标题呈现不同的大小。

可以把数据传个每个 `Heading`，但显然如果能传给 `Section` 会更好。

:::code-group

```[App.js]jsx
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
      </Section>
    </Section>
  );
}
```

```[Section.js]jsx
import { LevelContext } from './LevelContext.js';  // [!code warning]

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>  // [!code warning]
        {children}
      </LevelContext.Provider>  // [!code warning]
    </section>
  );
}
```

```[Heading.js]jsx
import { useContext } from 'react'; // [!code warning]
import { LevelContext } from './LevelContext.js'; // [!code warning]

export default function Heading({ children }) {
  const level = useContext(LevelContext); // [!code warning]
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error('未知的 level：' + level);
  }
}
```

```[LevelContext.js]jsx
import { createContext } from 'react'; // [!code warning]

export const LevelContext = createContext(1); // [!code warning]
```

:::



### 在相同的组件中使用并提供 context

由于级别与深度存在规律，可以进一步优化数据源的提供

:::code-group

```[App.js]jsx
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section> // [!code warning]
      <Heading>主标题</Heading>
      <Section> // [!code warning]
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
      </Section>
    </Section>
  );
}
```

```[Section.js]jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext); // [!code warning]
  return (
    <section className="section"> 
      <LevelContext.Provider value={level + 1}> // [!code warning]
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

```[Heading.js]jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error('未知的 level：' + level);
  }
}
```

```[LevelContext.js]jsx
import { createContext } from 'react';

export const LevelContext = createContext(0); // [!code warning]
```

:::



## 结合使用 reducer 和 context

| 概念     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 意义     | 状态和对应的修改方法都在父组件中定义，需要通过传递 `prop` 的方式给后代使用， |
|          | 当组件层级过多时，非常不便                                   |
| 注意事项 | state 仍然 “存在于” 被定义的组件中，由 `useReducer` 进行管理 |



### 操作步骤

#### ① 创建 context 

| 概念 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| 步骤 | 创建两个 context，① 状态，② 组件分发动作的函数               |
| 解释 | 对应 `useReducer` 的返回参数 `const [tasks, dispatch] = useReducer(xxReducer, initialXX);` |
| 解释 | 把 `null` 作为默认值传递给两个 context，实际值由 `TaskApp` 组件提供 |

:::code-group

```[App.js]jsx
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Day off in Kyoto</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```[TasksContext.js]jsx
import { createContext } from 'react'; // [!code warning]

export const TasksContext = createContext(null); // [!code warning]
export const TasksDispatchContext = createContext(null); // [!code warning]
```

```[AppTask.js]jsx
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
```

```[TaskList.js]jsx
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
```

:::





#### ② 将 state 和 dispatch 放入 context

:::code-group

```[App.js]jsx
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';  // [!code warning]

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);  // [!code warning]

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <TasksContext.Provider value={tasks}> // [!code warning]
      <TasksDispatchContext.Provider value={dispatch}> // [!code warning]
        <h1>Day off in Kyoto</h1>
        <AddTask
          onAddTask={handleAddTask}
        />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```[TasksContext.js]jsx
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

```[AppTask.js]jsx
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
```

```[TaskList.js]jsx
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
```

:::





#### ③ 在任何后代组件使用 context

| 次级步骤 | 说明                                                |
| -------- | --------------------------------------------------- |
| ①        | 移除 `props` 传递子组件的状态和修改方法（不再需要） |
| ②        | 子组件可以直接获取状态或修改方法的 `context` 示例   |

:::code-group

```[App.js]jsx
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask /> // [!code warning]
        <TaskList /> // [!code warning]
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```[TasksContext.js]jsx
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

```[AppTask.js]jsx
import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.js'; // [!code warning]

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext); // [!code warning]
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```

```[TaskList.js]jsx
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js'; // [!code warning]

export default function TaskList() {
  const tasks = useContext(TasksContext); // [!code warning]
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext); // [!code warning]
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
```

:::



### 代码迁移

可以将 `reducer` 和 `context` 的相关定义代码抽离，从而构造出便于使用的组件。



**封装思路**

① 管理 reducer 的状态（包含定义和修改方法）

② 提供 context 提供 reducer 

③ 使用 `children`，增强子组件

④ 将获取状态/方法的 `content` 方法进一步封装，方便外部获取

| 提供内容示例       | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| `TasksProvider`    | 内部结合好了 `reducer` 和 `context`，并提供 `context` 使用的组件 |
| `useTasks`         | 读取状态                                                     |
| `useTasksDispatch` | 读取状态修改方法                                             |

:::code-group

```[App.js]jsx
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```[TaskContext.js]jsx
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) { // [!code warning]
  const [tasks, dispatch] = useReducer( // [!code warning]
    tasksReducer, // [!code warning]
    initialTasks // [!code warning]
  ); // [!code warning]
  // [!code warning]
  return ( // [!code warning]
    <TasksContext.Provider value={tasks}> // [!code warning]
      <TasksDispatchContext.Provider value={dispatch}> // [!code warning]
        {children} // [!code warning]
      </TasksDispatchContext.Provider> // [!code warning]
    </TasksContext.Provider> // [!code warning]
  ); // [!code warning]
} // [!code warning]

export function useTasks() { // [!code warning]
  return useContext(TasksContext); // [!code warning]
} // [!code warning]

export function useTasksDispatch() { // [!code warning]
  return useContext(TasksDispatchContext); // [!code warning]
} // [!code warning]

function tasksReducer(tasks, action) {  // [!code warning]
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```[AddTask.js]jsx
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```

```[TaskList.js]jsx
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
```

:::










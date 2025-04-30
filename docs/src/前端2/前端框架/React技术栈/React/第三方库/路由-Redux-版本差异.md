## 路由方案比较

| v5 (`react-router-dom@5`) | v6 (`react-router-dom@6`)        |
| :------------------------ | :------------------------------- |
| `<Switch>`                | `<Routes>`                       |
| `<Route component={...}>` | `<Route element={...}>`          |
| `<Redirect to="...">`     | `<Navigate to="..." />`          |
| `useHistory()`            | `useNavigate()`                  |
| `exact`（精确匹配）       | 默认匹配更智能，`exact` 不再需要 |

### 路由初始化

#### React Router v5

```shell
yarn yarn add react-router react-router-dom react-router-config
```

:::code-group

```[src\router\index.js]jsx
import React from 'react';
import { Redirect } from "react-router-dom";

import HYDiscover from "@/pages/discover";
import HYMine from "@/pages/mine";
import HYFriend from "@/pages/friend";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: HYDiscover
  },
  {
    path: "/mine",
    component: HYMine
  },
  {
    path: "/friend",
    component: HYFriend
  },
];

export default routes;
```

```[src\App.js]jsx
import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config'; // [!code warning]

import routes from './router';

import { HashRouter } from 'react-router-dom'; // [!code warning]
import HYAppHeader from '@/components/app-header';
import HYAppFooter from '@/components/app-footer';

export default memo(function App() {
  return (
    <HashRouter>
      <HYAppHeader /> // [!code warning]
      {renderRoutes(routes)} // [!code warning]
      <HYAppFooter /> // [!code warning]
    </HashRouter>
  )
})
```

:::



#### React Router v7

配置中间的路由区域

安装依赖

```elm
yarn add react-router react-router-dom
```

:::code-group

```[src\router\index.js]jsx
import { Navigate } from "react-router-dom"; // [!code warning]
import HYDiscover from "@/pages/discover";
import HYMine from "@/pages/mine";
import HYFriend from "@/pages/friend";

const routes = [
  {
    path: "/",
    // v7 不再需要 `exact`，默认就是精确匹配
    element: <Navigate to="/discover" replace />, // 使用 `element` 替代 `render`
  },
  {
    path: "/discover",
    element: <HYDiscover />, // 使用 `element` 替代 `component`
  },
  {
    path: "/mine",
    element: <HYMine />,
  },
  {
    path: "/friend",
    element: <HYFriend />,
  },
];

export default routes;
```

```[src\App.js]jsx
import React, { memo } from 'react';

import { useRoutes } from "react-router-dom"; // [!code warning]
import routes from './router'; // [!code warning]

import HYAppHeader from '@/components/app-header';
import HYAppFooter from '@/components/app-footer';

export default memo(function App() {
  const element = useRoutes(routes); // [!code warning]
  return (
    <>
      <HYAppHeader />
      {element} // [!code warning]
      <HYAppFooter />
    </>
  )
})
```

```[src\index.js]jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; // [!code warning]
import App from './App';

import "@/assets/css/reset.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> // [!code warning]
    <App />
  </BrowserRouter> // [!code warning]
);
```

:::



### 嵌套路由配置

<span style="background: #efe0b9">src\router\index.js</span>

:::code-group

```[React Router v5]jsx
import React from 'react';
import { Redirect } from "react-router-dom";

import HYDiscover from "@/pages/discover";
import HYRecommend from "../pages/discover/c-pages/recommend";
import HYRanking from "../pages/discover/c-pages/ranking";
import HYSongs from "../pages/discover/c-pages/songs";
import HYDjradio from "../pages/discover/c-pages/djradio";
import HYArtist from "../pages/discover/c-pages/artist";
import HYAlbum from "../pages/discover/c-pages/album";

import HYMine from "@/pages/mine";
import HYFriend from "@/pages/friend";


const routes = [
  {
    path: "/",
    exact: true, // [!code warning]
    render: () => ( // [!code warning]
      <Redirect to="/discover"/> // [!code warning]
    ) // [!code warning]
  },
  {
    path: "/discover",
    component: HYDiscover, // [!code warning]
    routes: [ // [!code warning]
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: HYRecommend
      },
      {
        path: "/discover/ranking",
        component: HYRanking
      },
      {
        path: "/discover/songs",
        component: HYSongs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: HYDjradio
      },
      {
        path: "/discover/artist",
        component: HYArtist
      },
      {
        path: "/discover/album",
        component: HYAlbum
      }
    ]
  },
  {
    path: "/mine",
    component: HYMine
  },
  {
    path: "/friend",
    component: HYFriend
  },
];

export default routes;
```

```[React Router v7]jsx
import { Navigate } from "react-router-dom";
import HYDiscover from "@/pages/discover";
import HYRecommend from "@/pages/discover/c-pages/recommend";
import HYRanking from "@/pages/discover/c-pages/ranking";
import HYSongs from "@/pages/discover/c-pages/songs";
import HYDjradio from "@/pages/discover/c-pages/djradio";
import HYArtist from "@/pages/discover/c-pages/artist";
import HYAlbum from "@/pages/discover/c-pages/album";

import HYMine from "@/pages/mine";
import HYFriend from "@/pages/friend";

const routes = [
  {
    path: "/",
    // v7 不再需要 `exact`，默认就是精确匹配 // [!code warning]
    element: <Navigate to="/discover" replace />, // 使用 `element` 替代 `render` // [!code warning]
  },
  {
    path: "/discover",
    element: <HYDiscover />, // 使用 `element` 替代 `component` // [!code warning]
    children: [ // 子路由使用 children // [!code warning]
      {
        path: "/discover",
        element: <Navigate to="/discover/recommend" replace />,
      },
      {
        path: "/discover/recommend",
        element: <HYRecommend />
      },
      {
        path: "/discover/ranking",
        element: <HYRanking />
      },
      {
        path: "/discover/songs",
        element: <HYSongs />
      },
      {
        path: "/discover/djradio",
        element: <HYDjradio />
      },
      {
        path: "/discover/artist",
        element: <HYArtist />
      },
      {
        path: "/discover/album",
        element: <HYAlbum />
      }
    ]
  },
  {
    path: "/mine",
    element: <HYMine />,
  },
  {
    path: "/friend",
    element: <HYFriend />,
  },
];

export default routes;
```

:::



<span style="background: #efe0b9">src\pages\discover\index.js</span>

| 主要变化                         | 说明                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| **移除了 `react-router-config`** | 使用 `Outlet` 组件代替 `renderRoutes` 来渲染子路由           |
| **简化了 props**                 | 不再需要从 props 中解构 `route` 对象                         |
|                                  | 子路由的渲染由 `Outlet` 自动处理                             |
| **NavLink 增强**                 | 添加了 `className` 函数参数，可以更方便地处理活动状态样式    |
|                                  | `className={({ isActive }) => isActive ? "active-class" : ""}` |
| **路由配置变化**                 | 在父级路由配置中，子路由应该作为 `children` 属性配置         |

:::code-group

```[React Router v5]jsx
import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config'; // [!code warning]
import { NavLink } from 'react-router-dom'; // [!code warning]

import { dicoverMenu } from "@/common/local-data";
import {
  DiscoverWrapper,
  TopMenu
} from './style';

export default memo(function HYDiscover(props) { // [!code warning]
  const { route } = props; // [!code warning]

  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {
            dicoverMenu.map((item, index) => {
              return (
                <div className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      {renderRoutes(route.routes)} // [!code warning]
    </DiscoverWrapper>
  )
})
```

```[React Router v7]jsx
import React, { memo } from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // [!code warning]

import { dicoverMenu } from "@/common/local-data";
import {
  DiscoverWrapper,
  TopMenu
} from './style';

export default memo(function HYDiscover() { // [!code warning]
  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {
            dicoverMenu.map((item, index) => {
              return (
                <div className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      <Outlet /> // [!code warning]
    </DiscoverWrapper>
  )
})
```

:::





## Redux

### 旧方案

1. 需要自己安装 redux-thunk 来支持异步
2. 自己安装 immutable 处理不可变数据并实现性能优化

[示例](/前端2/前端框架/React技术栈/React/coder/网易云.md#初始化rudux)



#### 不可变数据处理方案

| 特性         | Immutable.js         | Immer                    |
| :----------- | :------------------- | :----------------------- |
| **数据结构** | 自定义（如 `Map`）   | 原生 JS 对象/数组        |
| **API 风格** | 链式调用（`.set()`） | 直接修改草稿（`draft`）  |
| **性能**     | 优化过的数据结构     | 依赖 Proxy，中等规模高效 |
| **包体积**   | 较大（~60KB）        | 较小（~3KB）             |
| **学习成本** | 较高（新 API）       | 低（类似原生写法）       |

**如何选择？**

- **用 `Immer`**：
  - 想要**保持原生 JS 语法**，减少学习成本。
  - 与 Redux Toolkit、React 状态管理结合（Redux Toolkit 内置了 Immer）。
- **用 `Immutable.js`**：
  - 需要**高性能的大规模数据操作**（如超大型状态树）。
  - 已经深度使用 Immutable.js 的旧项目。

**现代项目推荐 Immer**，因为它更轻量且符合直觉，而 Immutable.js 逐渐被替代。



### Redux Toolkit

1. 内置了最佳实践（如 Immer 处理不可变更新）
2. 简化了配置（如默认包含 Redux DevTools 和 thunk 中间件）



对比旧版本

1. 使用 `configureStore` 替代 `createStore`
2. 使用 `createSlice` 替代手写 reducer 和 action
3. 使用 `createAsyncThunk` 处理异步逻辑

[示例](/前端2/前端框架/React技术栈/React/项目组织/创建项目.md#初始化rudux)
















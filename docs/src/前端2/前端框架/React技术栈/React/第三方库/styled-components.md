### 前期准备

#### 安装依赖

```shell
yarn add styled-components
```



#### 示例结构

```yaml
- home             # 组件文件夹
  + index.js	   # 组件
  + style.js      # 定义样式组件
```



### 使用

#### 基本使用

:::code-group

```[使用样式组件]jsx
import React, { memo } from 'react'

// 引入样式组件 // [!code warning]
import { // [!code warning]
  HYCard, // [!code warning]
  HYButton, // [!code warning]
  HYPrimaryButton // [!code warning]
} from './style'; // [!code warning]

export default memo(function recommend() {
  return (
    <div>
      <HYCard> // [!code warning]
        <div className="title">示例标题</div>
        <div>示例内容示例内容示例内容</div>
      </HYCard> // [!code warning]
      <HYButton>测试1</HYButton>
      <HYPrimaryButton>测试2</HYPrimaryButton>
    </div>
  )
})
```

```[定义样式组件]jsx
// 引入 // [!code warning]
import styled from 'styled-components'; // [!code warning]

// 定义组件类型和样式
export const HYCard = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f2f2;
  .title {
    font-weight: 600;
  }
`

export const HYButton = styled.button`
  padding: 10px 20px;
  border-color: red;
  color: red;
`

// 使用组件继承，可以继承组件类型和样式
export const HYPrimaryButton = styled(HYButton)`
  color: #fff;
  background-color: green;
`
```

:::

通过定义标签类型，传入特点样式，返回（带有样式的）组件。



#### props穿透与attrs传递

:::code-group

```[使用样式组件]jsx
import React, { memo, useState } from 'react'

import {
  HYInput
} from './style';

export default memo(function Recommend() {
  const [color] = useState('purple')

  return <HYInput type="password" color={color} $bcolor="yellow" />
})
```

```[定义样式组件]jsx
import styled from 'styled-components';

export const HYInput = styled.input.attrs({
    placeholder: "请输入",
    $bcolor: "red"
})`
    background-color: lightblue;
    border-color: ${props => props.$bcolor};
    color: ${props => props.color};
`
```

:::

:ghost: 添加到样式组件上的属性，带有<span style="color: #ff0000">穿透</span>功能，能添加到原标签上去；

:ghost: 这些属性在定义样式时，都可以通过函数方式获取到。

🐳 通过使用 attrs，可以对原标签<span style="color: #ff0000">添加属性</span>，会与样式组件上的属性进行合并；

🐳 当 attrs 与 标签上同时给某个属性赋值时，以 attrs 上的为准；

🐳 通过 `$` 前缀添加的属性不会被添加到原标签上。



#### 部分属性值设置为变量

```jsx
import React, { memo } from 'react'

import {
  SongsCoverWrapper
} from './style';

export default memo(function Recommend(props) {
  // 父传子
  const { size = 30 } = props;

  return (
  	<SongsCoverWrapper size={size}>
      <img /> 
    </SongsCoverWrapper>
  )
})
```

```jsx
export const SongsCoverWrapper = styled.div`
  width: 140px;
  margin: 20px ${props => (props.right || 0)} 20px 0;
  .img {
    width: ${props => props.size + "px"};
    height: ${props => props.size + "px"};
  }
}
```



#### 更灵活的动态计算

```jsx
import styled from 'styled-components';

export const Control = styled.div`
  display: flex;
  align-items: center;

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${props => props.isPlaying ? "-165px": "-204px"};
  }

  .ant-slider-track {
    height: 9px;
    background: url(${require("@/assets/img/progress_bar.png")}) left -66px;
    background-position: ${props => {
      switch(props.sequence) {
        case 1:
          return "-66px -248px"
        case 2:
          return "-66px -344px"
        default:
          return "-3px -344px"
      }
    }};
  }
`
```





#### 引入图片资源

```jsx
import styled from "styled-components";

export const RankingWrapper = styled.div`
  .tops {
    margin: 30px 0;
    display: flex;
    background-image: url(${require("@/assets/img/recommend-top-bg.png")});
    height: 472px;
  }
`
```





#### 使用主题

:::code-group

```[使用样式组件]jsx
import React, { memo } from 'react'
import { ThemeProvider } from 'styled-components';

import {
  TitleWrapper
} from './style';

export default memo(function Recommend() {

  return (
    <ThemeProvider theme={{themeColor: "red", fontSize: "30px"}}>
      <TitleWrapper>标题</TitleWrapper>
    </ThemeProvider>
  )
})

```

```[定义样式组件]jsx
import styled from 'styled-components';

export const TitleWrapper = styled.h2`
  text-decoration: underline;
  color: ${props => props.theme.themeColor};
  font-size: ${props => props.theme.fontSize};
`
```

:::

:turtle: 使用特殊组件 <span style="color: #a50">ThemeProvider</span> 提供全局的主题属性；

:turtle: 内部的所有后代级别的样式组件，都可通过 <span style="color: #a50">props.theme</span> 获取到主题属性。
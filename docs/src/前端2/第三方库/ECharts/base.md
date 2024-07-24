### 常用组件

| 组件            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| **title**       | **标题组件**，包含主标题和副标题                             |
|                 | 在 v3+ 中可以存在任意多个标题组件；通过修改样式，可以做成提示文案的效果 |
| **legend**      | **图例组件**，展示不同系列的标记，颜色和名字                 |
|                 | 可以通过点击图片控制系列的显影                               |
| **grid**        | **直角坐标系内绘图网格(区域)**                               |
|                 | 可以控制网格绘图区域（默认不包含轴标签）距离”画布“的距离     |
| **xAxis**       | 直角坐标系 grid 中的 **x 轴**                                |
| **yAxis**       | 直角坐标系 grid 中的 **y 轴**                                |
| **tooltip**     | **提示框组件**                                               |
|                 | 可以设置在全局、坐标系、系列及每个数据项中                   |
| **axisPointer** | **坐标轴指示器**                                             |
|                 | 可以通过虚线等方式聚焦图表上的一列/一点                      |
| **series**      | **图表/系列**组件数组                                        |
|                 | 用于配置图表的数量、类型、性状                               |
| **color**       | **调色盘颜色列表**                                           |
|                 | 如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色 |
| **textStyle**   | **全局的字体样式**                                           |

#### xAxis

| 模块                                            | 说明                                                   | 相关属性              |
| ----------------------------------------------- | ------------------------------------------------------ | --------------------- |
| 坐标轴名称                                      | 设置名称、样式、位置等                                 | name、nameTextStyle   |
| 坐标轴刻度                                      | 设置刻度最小值、最大值、刻度间隔                       | min、max、minInterval |
| <span style="color: #999">坐标轴刻度</span>     | 刻度朝向、长度、样式                                   | axisTick              |
| <span style="color: #999">坐标轴刻度标签</span> | 标签朝向、与轴线距离、内容格式器、样式                 | axisLabel             |
| <span style="color: #999">坐标轴轴线</span>     |                                                        | axisLine              |
| <span style="color: #999">坐标轴分隔线</span>   | 垂直的多条分割线                                       | splitLine             |
| <span style="color: #999">坐标轴指示器</span>   | 鼠标悬浮时以虚线/方块/阴影的方式强调某列，可以设置标签 | axisPointer           |
| 坐标轴的起始值                                  |                                                        | startValue            |
| 类目数据                                        | 在类目轴（type: `'category'`）中有效                   | data                  |

#### grid

| 模块             | 说明                       | 相关属性                     |
| ---------------- | -------------------------- | ---------------------------- |
| 网格边界         | 展示网格边界               | show                         |
| 组件距离容器距离 | 默认值为 `10%` 和 `60`     | left、top、right、bottom     |
| 宽度、高度       | 默认自适应                 | width、height                |
| 设置范围         | 是否包含坐标轴的刻度标签   | containLabel                 |
| 背景色和边框     | 设置样式，包括颜色和宽度等 | backgroundColor、borderColor |

#### legend

| 模块               | 说明                 | 相关属性                 |
| ------------------ | -------------------- | ------------------------ |
| 组件距离容器距离   |                      | left、top、right、bottom |
| 图例每项之间的间隔 | 横向布局时为水平间隔 | itemGap                  |
| 图例标记的图形宽高 |                      | itemWidth、itemHeight    |

#### tooltip

| 模块           | 说明                                                         | 相关属性                                  |
| -------------- | ------------------------------------------------------------ | ----------------------------------------- |
| 样式表现       | 设置内边距、文本样式                                         | padding、textStyle                        |
| 样式表现       | 设置背景色、边界                                             | backgroundColor、borderColor、borderWidth |
| 触发类型(时机) | 柱状图，折线图设置为 `axis`，在坐标轴触发；<br />散点图，饼图设置为 `item`，在数据项触发 | trigger                                   |
| 触发条件       | 设置鼠标移动、点击等方式触发                                 | triggerOn                                 |
| 内容格式器     | 定制性更高，可以返回html字符串                               | formatter                                 |



### 常见功能

#### x轴添加对齐标签的刻度

```javascript
xAxis: {
    axisTick: {
    	show: true,
        alignWithLabel: true, // [!code ++]
        length: 6,
        lineStyle: {
            color: '#E5E6EC'
        }
    }
}
```



#### 双Y轴图表刻度对齐

https://blog.csdn.net/shanghai597/article/details/136172810

```javascript
yAxis: [
    {
        type: 'value',
        name: '水量',
        alignTicks: true,  // [!code ++]
        axisLabel: {
            formatter: '{value} ml'
        }
    },
    {
        type: 'value',
        name: '温度',
        alignTicks: true,  // [!code ++]
        axisLabel: {
            formatter: '{value} °C'
        }
    }
]
```





#### 图例图标修改为长方形

```javascript
legend: {
    icon: 'path://M0 12.5h18v3h-18z'
}
```

**含义**

这个路径（`path`）数据是用来绘制矢量图形的，通常用于SVG（可缩放矢量图形）中。它描述了一条直线的绘制路径。下面是对路径数据 `M0 12.5h18v3h-18z` 的解释：

1. `M0 12.5`：移动到坐标 (0, 12.5)。这是绘图开始的起点。
2. `h18`：从当前点水平向右移动18个单位。
3. `v3`：从当前点垂直向下移动3个单位。
4. `h-18`：从当前点水平向左移动18个单位。
5. `z`：关闭路径，即从当前点绘制一条直线回到起点 (0, 12.5)。

综合起来，这段路径数据描述的是从 (0, 12.5) 开始绘制一个宽18个单位、高3个单位的矩形。

| 序号 | 值                         | 说明            |
| ---- | -------------------------- | --------------- |
| ①    | `path://M0 12.5h18v3h-18z` |                 |
| ②    | `path://M0 0h18v3h-18z`    | 跟①表现一致     |
| ③    | `path://M0 0h6v1h-6z`      | 测试时，与②一致 |



#### 柱形图使用渐变色

> 设置后，对应图例的图标也会采用相同的颜色

```javascript
series: [
    {
        type: 'bar',
        // 线性渐变，从上往下，由红到蓝渐变
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'red' // 0% 处的颜色
            }, {
                offset: 1, color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        }
    }
]
```



#### 自定义tooltip

```javascript
tooltip: {
    formatter: (params) => {
        const title = `<div style="margin-bottom: 10px">${params[0].name}</div>`

        let otherContent = ''
        const result = params.forEach(p => {
            const type = `<span style="color: #ccc">${p.seriesName}</span>`
            const value = `<span style="color: red">${p.data}</span>`
        
            otherContent += `<div>${type}: ${value}</div>`
      })
      
        return title + otherContent
    }
}
```

如果对系列设置了[渐变色](https://echarts.apache.org/zh/option.html#color)，那从 params 中的 `color` 属性会获取到对应的颜色对象，否则会获取到字符串


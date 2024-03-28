## 起步

1. 申请[账号](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#申请帐号) ，需要提供邮箱、管理员用微信扫码。  

2. 在[小程序后台](https://mp.weixin.qq.com/)，（开发管理-开发设置）可以获取 AppID，其相当于小程序的身份证，调用某些接口需要用到它。  

3. 安装[开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，用于预览效果。编写代码可以用 VS Code。  

4. 对于测试功能，打开开发工具后，创建小程序，**选择一个空目录**，使用测试号，即可实现第一个小程序。 

5. 后期可以打开项目后，在 `详情` 修改 AppId。  

## 目录结构

小程序文件结构  
> 只几个文件只要相应的名字相同，就会自动产生追踪关系，不需导入。  

类型 | 传统web | 微信小程序
:-: | :-: | :-: 
结构 | HTML | WXML 
样式 | CSS | WXSS
逻辑 | Javascript | Javascript
配置 | 无 | JSON

![结构目录](./img/结构目录.png)

文件 | 说明
:-: | :-: 
project.config.json | 也可以在 `详情` 的 UI 界面进行设置 
sitemap.json | 用于配置小程序及其页面是否允许被微信索引  



### 全局配置

#### app.json  

> 用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。  
>
> 小程序页面也可以使用同名 `.json` 文件（仅能）对窗口表现进行配置，会覆盖全局的 `window` 中相同的配置项。
>
> 使用开发者工具进行配置时，会有相应字段的提示和补全功能。  

#### pages字段    
> 决定页面文件的路径。  

1. 每个数组元素都对应着一个页面的路径，最后项不需要后缀名。  

2. 使用开发工具，在该选项下新增元素并保存，会自动生成对应的页面文件。  

3. 首个数组元素对应的路径将展示为首页。  

#### window字段  
> 定义小程序所有页面的顶部背景颜色，文字颜色等。  

常用属性 | 说明 | 默认值 | 可选值
:- | :- | :- | :-
navigationBarBackgroundColor | 导航栏背景颜色 | "#fff" | *HexColor*
navigationBarTitleText | 导航栏标题 | "Weixin" | *str*
navigationBarTextStyle | 导航栏标题颜色 | "black" | "white"
backgroundTextStyle | 下拉加载，指示器颜色 | "dark" | "light"
enablePullDownRefresh | 开启当前页面下拉刷新 | false | true
backgroundColor | 下拉加载部分窗口颜色 | "#ffffff" | *HexColor*

#### tabBar字段  
> 指定 tab 栏的表现，以及 tab 切换时显示的对应页面。  
> 
> 将 icon 文件夹建在与全局配置同级处。  

常用属性 | 说明 | 默认值 | 可选值
:- | :- | :- | :-
list | 标签列表，需 2-5 个 | / | *arr*
color | 未激活文字颜色 | / | *HexColor*
selectedColor | 激活文字颜色 | / | *HexColor*
backgroundColor | 标签栏背景色 | / | *HexColor*
position | 标签栏位置 | "bottom" | "top" （此时不显示 icon）

list属性 | 说明 | 默认值 | 可选值
:- | :- | :- | :-
pagePath | 页面路径，必须在 pages 中先定义 | / | *str*
text | tab 上按钮文字 | / | *str*
iconPath | 图片路径。icon 大小限制为 40kb， | / | *str*
selectedIconPath | 激活图片路径。建议尺寸为 81px * 81px | / | *str*



### 页面配置  

> 仅对页面的窗口表现进行配置，不需要添加字段。  



## 开发技巧  

1. 可以在 VSCode，安装插件 `小程序开发助手`，具备配置字段提示、标签提示等功能。  

2. 在逻辑文件（js）中，输入 `page`，选择提示的第二项可以补全架构。  

3. 快速选择多行中间部分（如对象的所有键）：①选中首行选区 ②`Alt` /+ `Shift` + 选中尾行选区尾部

4. 快速多行输入相同内容： ①选择首行输入位 ②`Alt` /+ `Shift` + 选中尾行输入位 ③输入内容

快捷键 | 作用
`Alt` \+ `↑` | 选中行代码上移

小程序 | Vue | 说明  
:-: | :-: | :-
`<text>` | `<span>` | 行内元素，不换行
`<view>` | `<div>` | 块级元素，换行
`<block>` | `<template>` | 不参与渲染，可充当循环结构的容器或条件渲染种包含多元素的**容器**等

### 模版语法  
> 可以往花括号里添加变量、表达式。  

性质 | 小程序 | Vue 
:-: | :-: | :-
文本节点 | {{}} | {{}}
属性值 | {{}} | 使用 v-bind
条件渲染 | {{}} | 绑定变量

### 列表渲染  
> 不用于 Vue，除了数组以外，也可以遍历对象。  
> 
> 可以自定义在循环内部的项的变量名，方便实现嵌套循环。  

```
wx:for="{{arr | obj}}"
```

其它属性 | 遍历数组 | 遍历对象 | 默认值
:- | :- | :- | :-
wx:for-item | 项 | 值 | "item"
wx:for-index | 索引 | 键 | "index"
wx:key | 需唯一 | / | "\*this"

wx:key
> 如果明确知道该列表是静态，或者不必关注其顺序，可以不提供该值，忽略警告。  
> 
> 值以两种形式提供:
> 
> 1. 字符串，代表遍历项的**某个属性**，其值需唯一且不能动态改变。
> 
> 2. `*this`，代表项本身，需要项是唯一的字符串或者数字。
> 
> 3. **对象不能作键**，会被解析为字符串。找不到适用属性时可以用相应的 `index`。

```
// mine.wxml
// 此时 view 标签也进行了多次循环
<view wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="name">
  {{item.name}} - {{item.age}}
</view>

// mine.js
data: {
  list: [
    { name: 'aaa', age: 12 },
    { name: 'bbb', age: 15 }, 
    { name: 'ccc', age: 16 }
  ]
},
```

### 条件渲染  
> `wx:if` 是惰性的，切换条件时进行**局部渲染**或销毁。  

小程序 | Vue | 说明  
:-: | :-: | :-
wx:if | v-if | 动态绑定
wx:elif | v-else-if | 动态绑定
wx:else | v-else | 不需绑定
hidden | v-show | 动态绑定

### 认识事件  
> 尝试通过表单输入值，改变输出值，另外提供两个按钮，也可以改变该输出值。  

1. 对于单标签，不添加结束的 `/` 会报错。  
2. `data` 选项是对象形式而非函数。  
3. 对于绑定的事件，与 `data` 同级，而不需要加到 `methods` 中。  
4. 要对 `data` 内的数据赋值时，不能直接赋值，要使用 `this.setData`。
5. 获取时，需要通过 `this.data`。    
6. 在小程序中，模版中绑定的事件处理程序不能添加括号，更无法直接传参。  
7. 需要借助自定义属性来传参。  

```
<button bind:tap="handleTap" data-operation="{{1}}">+</button>
<button bind:tap="handleTap" data-operation="{{-1}}">-</button>
<input type="text" bind:input="handleInput" />
<view>{{num}}</view>

data: {
  num: 0
},
handleInput(e) {
  this.setData({
    num: e.detail.value
  })
},
handleTap(e) {
  const operation = e.currentTarget.dataset.operation;
  this.setData({
    num: +this.data.num + operation
  })
}
```

#### 事件类型  

事件分类 | 说明  
:- | :-
冒泡事件 | 组件上的事件被触发后，会向父节点传递
非冒泡事件 | 组件上的事件被触发后，不会向父节点传递

普通事件绑定  
> 在后续版本中，支持在 bind 后添加 `:`。  

形式 | 说明  
:- | :-  
bindtap="handleTap" | 事件名后不能跟括号
bindtap="{{ handlerName }}" | `this.data.handlerName` 必须是一个字符串，指定事件处理函数名

绑定方式 | 说明  
:- | :- 
bind | 会继续冒泡
capture-bind | 会继续捕获
catch | 阻止冒泡
capture-catch | 中断捕获阶段和取消冒泡阶段
mut-bind | 只有一个节点的这种绑定事件会触发，不影响 `bind` 和 `catch`

### WXSS  

#### 尺寸单位
> rpx 可以根据屏幕宽度进行自适应，且规定屏幕宽为固定的 750rpx。
> 
> 如屏幕宽度为375px，则1rpx = 0.5px。
> 
> 如屏幕宽度为750px，则1rpx = 1px。  

栗子
> 如设计稿规定屏幕宽度为 xpx，现在需要去适配宽度为 100px。
>
> 使用 `calc`，需要注意数值与单位不留空格。  

步骤 | 说明 
:-: | :-: 
① | xpx = 750rpx
② | 1px = 750rpx / x
③ | 100px = 750rpx / x * 100
④ | width: calc(750rpx * 100 / x)

#### 导入  
> 使用 `@import` 语句可以导入外联样式表，只支持相对路径，需要用 `;` 表示语句结束。   

```
// xx.wxss
@import "../../styles/common.wsxx";
```

#### 支持的选择器  
> 其中，自定义组件不能使用 `id选择器`、`属性选择器` 和 `标签名选择器`，需改用 `class选择器`。  

选择器 | 样例 | 样例描述
:- | :- | :-
\* | / | 不支持
.class | .intro | 选择所有拥有 class="intro" 的组件
`#id` | `#firstname` | 选择拥有 id="firstname" 的组件
element | view | 选择所有 view 组件
element, element | view, checkbox | 选择所有文档的 view 组件和所有的 checkbox 组件
::after | view::after | 在 view 组件后边插入内容
::before | view::before | 在 view 组件前边插入内容

#### 使用less

1. 使用 VSCode。  
2. 安装插件 `easy less`
3. 打开设置图标 —— 设置 —— 右上角的 `json` 图标  
4. 将下面代码粘贴到对象内部的最后。  
5. 此时新建 `less` 并保存后，会自动生成对应的 `wxss`。   

```json
"less.compile": {
  "outExt": ".wxss"
}
```



## 常用组件   

#### text 

> 文本标签，为行内元素，只能嵌套 `text`。  

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
user-select | 文本是否可选，该属性会使文本节点显示为 `inline-block` | false | 否 | *boo*
decode | 是否解码 | false | 否 | *boo*

#### image  
> 支持 JPG、PNG、SVG、WEBP、GIF 等格式，2.3.0 起支持云文件ID。  

```
<image src="{{item.good_src}}" mode="widthFix" />
```

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
src | 图片资源地址 | / | 否 | *str*
mode | 图片裁剪、缩放的模式 | "scaleToFill" | 否 | *str*
lazy-load | 懒加载，在即将进入上下三屏时才开始加载 | false | 否 | *boo*
binderror | 错误发生时触发 | / | 否 | *cb*
bindload | 载入完毕时触发 | / | 否 | *cb*

模式 | mode值 | 说明 
:- | :- | :- 
缩放 | scaleToFill | 使图片的宽高等于设置的宽高	
缩放 | aspectFit | 保持纵横比缩放图片，使图片的长边完全显示。可以完整显示图片，可能有多余部分。轮播图常用	
缩放 | aspectFill | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。通常另一个方向将会发生截取。	
缩放 | widthFix | 宽度不变，高度自动变化，保持原图宽高比不变。即设置的高无效。**轮播图和很多情况常用**	
缩放 | heightFix | 高度不变，宽度自动变化，保持原图宽高比不变	
裁剪 | top | 不缩放图片，只显示图片的顶部区域	
裁剪 | bottom | 不缩放图片，只显示图片的底部区域	
裁剪 | center | 不缩放图片，只显示图片的中间区域	
裁剪 | left | 不缩放图片，只显示图片的左边区域	
裁剪 | right | 不缩放图片，只显示图片的右边区域	
裁剪 | top left | 不缩放图片，只显示图片的左上边区域	
裁剪 | top right | 不缩放图片，只显示图片的右上边区域	
裁剪 | bottom left | 不缩放图片，只显示图片的左下边区域	
裁剪 | bottom right | 不缩放图片，只显示图片的右下边区域	

#### swiper
> 使用轮播图时，通常需要重新计算并设置容器 `swiper` 的高度。  
> 
> 可以将 `swiper` 的高度调小，这样指示器会处在图片下方。  

```
<swiper autoplay indicator-dots circular>
  <swiper-item wx:for="{{}}" wx:key="">
    <navigator>
      <image mode="widthFix" src="{{}}" />
    </navigator>
  </swiper-item>
</swiper>

image {
  width: 100%;
}
```

计算容器高度

顺序 | 说明
:- | :- 
① | swiper高 / swiper宽 = 原图高 / 原图宽  
② | swiper高 = swiper宽 * 原图高 / 原图宽  
③ | height: calc(100vw * 图高 / 图宽)  
④ | 如 height: calc(100vw * 352 / 1125)  

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
autoplay | 自动切换 | false | 否 | *boo*
interval | 自动切换时间间隔 | 5000 | 否 | *num*
circular | 采用衔接滑动 | false | 否 | *boo*
indicator-dots | 显示面板指示点 | false | 否 | *boo*	
indicator-color | 指示点颜色 | rgba(0, 0, 0, .3) | 否 | *color*
indicator-active-color | 当前选中的指示点颜色 | #000000 | 否 | *color*

#### navigator  
> 跳转到标签页时，需要额外设置属性。  

```
<navigator url="/page/index/index"> 回到首页 </navigator>
```

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
url | 当前小程序内的跳转链接。绝对、相对路径均可 | / | 否 | *str*
target | 跳到自己/其它的小程序 | "self" | 否 | "miniProgram"
open-type | 跳转方式 | navigate | 否 | *str*

open-type
> 这里的 tabBar 页面指全局配置中tabBar字段上存在的路径。  

值 | 说明 
:- | :- 
navigate | 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabBar 页面。
redirect | 关闭当前页面，跳转到应用内的某个页面。但是不能跳到 tabBar 页面。
switchTab | 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
reLaunch | 关闭所有页面，打开到应用内的某个页面
navigateBack | 关闭当前页面，返回上一页面或多级页面。
exit | 退出小程序，target="miniProgram"时生效

#### rich-text  

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
nodes | 节点列表/标签字符串 | [] | 否 | *arr/str*	
space | 显示连续空格 | / | 否 | *str*	

nodes  
> 并非所有节点和属性都受[信任](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)。  
> 
> 类型为节点列表时，支持标签的嵌套。  

```
// 标签字符串  
<rich-text nodes="<div style='color: red'>"></rich-text>  
  
// 节点列表
<rich-text nodes="{{nodes}}"></rich-text>   
  
nodes: [{
  // 标签名
  name: 'div',
  // 属性
  attrs: {
    class: 'div_class',
    style: 'line-height: 60px; color: red;'
  },
  // 子节点列表
  children: [{
    // 文本节点
    type: 'text',
    // 文本
    text: 'You never know what you're gonna get.'
  }]
}]
```

#### button  

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
size | 按钮的大小 | "default" | 否 | "mini"
type | 按钮的颜色 | "default" | 否 | "primary"、"warn"
plain | 按钮镂空，背景色透明 | false | 否 | *boo*	
disabled | 是否禁用 | false | 否 | *boo*	
loading | 名称前是否带 loading 图标 | false | 否 | *boo*	
form-type	| 点击触发 form 组件的 submit/reset 事件	| / | 否 | "submit"、"reset"	
open-type	| 微信开放能力 | / | 否 | *str*

open-type  

值 | 说明 | 备注
:- | :- | :- 
contact | 打开客服会话。如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息 | 小程序插件中不能使用
share | 转发当前小程序，发送到微信好友 | 不能分享到朋友圈
getPhoneNumber | 获取用户手机号 | 需企业小程序账号的权限。从 `bindgetphonenumber` 回调获取信息，会加密
getUserInfo | 获取用户信息 | 小程序插件中不能使用。从 `bindgetuserinfo` 回调获取信息
launchApp | 在小程序中打开APP | 需要先从APP中跳转到小程序
openSetting | 打开内置的授权页面 | 需要先获取权限，如 `getUserInfo`
feedback | 打开意见反馈页面 | /

打开客服会话  

1. 将 `appid` 由测试号改为自己的 `appid`。  
2. 登录[微信小程序后台](https://mp.weixin.qq.com/)，功能- 客服 - 根据微信号添加客服。  
3. 此时用户点击 `contact`，可打开客服会话并进行对话。  

#### icon 
> 有多个类型可选，可配置大小和颜色。  

```
<icon type="info" size="24" color="skyblue"></icon>
```

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
type | 类型 | / | √ | success, success_no_circle, info, warn, waiting, cancel, download, search, clear
size | 大小 | 23 | | *num/str*
color | 颜色 | / | | *str*

#### radio  
> 单选框。当某个单选框被选中时，`<radio-group>` 的 change 事件会携带该单选框的 `value`。  

```
<radio-group bind:change="handleChange">
  <radio value="male">男</radio>
  <radio value="female">女</radio>
</radio-group>
<view>选中的性别对应值为：{{info}}</view>
  
data: {
  info: ''
},
handleChange(e) {
  let info = e.detail.value;
  this.setData({
    info
  })
}
```

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
value | 选中时传给容器组件事件的值 | / |  | *str*
color | 选中状态的颜色 | #09BB07 | | *str*
checked | 是否选中 | false | | *boo*
disabled | 是否禁用 | false | | *boo*

#### radio-group  

属性 | 说明 | 默认值 | 必填 | 类型
:- | :- | :- | :- | :-
bindchange | 容器内选中项发生改变时触发 | / |  | cb

#### checkbox  
> 可配置属性与单选框完全一致。区别在于值变更时，容器获得的数据类型不一样。    

#### open_data  
> 需要更改头像样式时，得添加容器包裹标签，在容器上进行配置。  
> 
> 如果需要直接获取这些信息另外渲染，调用接口 `wx.getUserProfile`。  
> 
> 考虑到版本兼容性，参考兼容代码。  

```
// 显示用户头像
<open-data type="userAvatarUrl"></open-data>
// 显示用户昵称
<open-data type="userNickName"></open-data>
```

### 自定义组件  
> 自定义组件与页面类似，都是由4个文件组成。       
>  
> 自定义组件的标签名也只能是小写字母、中划线和下划线的组合。不能以"wx-"为前缀。

#### 自定义组件_新建使用  

1. 新增组件  
> 在 `Tabs` 处右键 - 新增Component - Tabs - `回车`    

- components  
  + Tabs 
- app.json  
- ...
  
2. 声明组件  
> 支持在 `app.json` 中声明 usingComponents 字段，视为全局自定义组件，在小程序内的页面或自定义组件中可以直接使用而无需再声明。

```
// 在需要使用该自定义组件的页面的 `json` 中声明
{  
  "usingComponents": {
    "Tabs": "../../components/Tabs/Tabs"
  }
}  
```

3. 使用组件  

```
// 使用该自定义组件的页面的 wxml  
<Tabs></Tabs>  
```

#### 自定义组件_json文件

```
{
  // 表示自身为组件   
  "component": true,
  // 表示引用其它的组件  
  "usingComponents": {}
}  
```

#### 自定义组件_js文件  

```
// 区别于页面的 Page
Component({
  // 用于接收父向子传递的数据
  properties: {},
  //组件的初始数据
  data: {},
  // 组件的方法列表
  methods: {}
}) 
```

----

### 简单实现标签页组件  

关键点 | 说明
:-: | :-  
① | 注意循环项要用括号包围  
② | 每个循环项可以提供 `id` 属性作为身份辨识  
③ | **动态添加类**，要用括号包围、三元表达式、引用项属性  
④ | 不同于 Vue，小程序的 data 为对象结构
⑤ | CSS长度单位尽量使用 `rpx`  
⑥ | `currentColor` 表示与当前元素的 color 值一致

```
/* Tabs.wxml */
<view class="title">
  <view 
    wx:for="{{tabs}}" 
    wx:key="id" 
    data-index="{{index}}" 
    class="title_items {{item.isActive?'active':''}}"
  >
  {{item.name}}
  </view>
</view>
<view class="content">首页内容</view>
  
/* Tabs.js */
data: {
  tabs: [
    {
      name: "首页", 
      id: 0, 
      isActive: true
    },
    {
      name: "原创", 
      id: 1, 
      isActive: false
    },
    {
      name: "分类", 
      id: 2, 
      isActive: false
    },
    {
      name: "关于", 
      id: 3, 
      isActive: false
    }
  ]
}
  
/* Tabs.wxss */
.title {
  display: flex;
  padding: 10rpx;
}
.title_items {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  color: skyblue;
  border-bottom: 5rpx solid currentColor;
}
```

#### 标题点击激活  

关键点 | 文档 | 说明
:-: | :- | :- 
① | wxml | 为了能够从事件回调的事参中获取点击项信息，**需要属性传递** `data-index="{{index}}"`
② | js | 不同于页面，自定义组件的方法需放在 `methods` 选项中  
③ | js | 小程序不推荐直接改变 data 中的数据，先拷贝  
④ | js | 遍历数组，通过排他思想赋值
④ | js | 重新赋值
⑤ | js | 重新赋值

```
<view wx:for="{{tabs}}" data-index="{{index}}" bind:tap="handleItemTap">
  {{item.name}}
</view>  
  
methods: {
  handleItemTap(e) {
    let {index} = e.currentTarget.dataset;
    let tabs = JSON.parse(JSON.stringify(this.data.tabs));
    tabs.forEach((item, i) => {index === i?item.isActive=true:item.isActive=false})
    this.setData({
      tabs
    })
  }
}
```

#### 父传子  
> 与 Vue 类似，只是不需要 `:`，以及默认值表示不同。  

```
/* 父的wxml */
<Tabs tabs="{{tabs}}"></Tabs>  
  
/* 子的js */
properties: {
  tabs: {
    type: Array,
    // 默认值  
    value: []
  }  
} 
```

#### 子传父  

关键点 | 文档 | 说明
:-: | :- | :- 
① | 子(js) | 通过 `this.data` 找不到的数据，会在 `properties` 找该变量
② | 子(js) | 由于数据是父提供，先前的方法改变不了父数据 
③ | 子(js) | 此时的 `setData` 会将变量拷贝到 `data` 中  
③ | 子(js) | 所以子**只需要**发送自定义事件，并传递索引即可  
④ | 父(wxml) | 接收事件，执行回调
⑤ | 父(js) | 处理逻辑与先前的方法一致。获取传参的属性改变  

```
/* 子的js */
handleItemTap(e) {
  let {index} = e.currentTarget.dataset;
  this.triggerEvent("itemChange", {index})
}
  
/* 父的wxml */
<Tabs bind:itemChange="handleItemChange"></Tabs>
  
/* 父的js */
handleItemChange(e) {
  console.log(e.detail.index);
}
```

#### 插槽  
> 注意这一步前，需要将 `tabs` 该数据转移到父组件的 `data` 中。    

```
/* 父的wxml */
<slot></slot>  
  
/* 父的wxml */
<Tabs bind:itemChange="handleItemChange">
  <block wx:if="{{tabs[0].isActive}}">首页内容</block>
  <block wx:elif="{{tabs[1].isActive}}">原创内容</block>
  <block wx:elif="{{tabs[2].isActive}}">分类内容</block>
  <block wx:else>关于内容</block>
</Tabs>
```



### 基础2

#### 组件常用配置  

> 后面的一部分为组件声明周期函数。  

配置项 | 类型 | 描述	
:- | :- | :-
properties | obj | 相当于自定义属性
data | obj | 组件的内部数据
observers | obj | 可监听 `properties` 和 `data` 的变化。页面无
methods | obj | 组件的方法。页面无
created | func | 在组件实例刚刚被创建时执行，此时不能调用 `setData`	
attached | func | 在组件实例进入页面节点树时执行	
ready | func | 在组件在视图层布局完成后执行	
moved | func | 在组件实例被移动到节点树另一个位置时执行	
detached | func | 在组件实例被从页面节点树移除时执行	
error | func | 每当组件方法抛出错误时执行	

#### 应用生命周期  
> 不同于 Page 和 Component，根部有自己独特的生命周期，可在 `app.js` 中添加回调。  

生命周期 | 触发时机	| 可添加处理
:- | :- | :-
onLaunch | 应用第一次启动时触发 | 可获取用户的信息，供页面渲染  
onShow | 从后台切换到小程序 | 对应用的数据或页面效果进行重置 
onHide | 从小程序切换到后台 | 暂停或清除定时器
onError | 应用报错时触发 | 可将错误信息异步发送给后台
onPageNotFound | 应用首次启动，且找不到入口页面时触发 | 通过 `wx.navigateTo` 跳转到其它页面  

#### 页面生命周期  

生命周期 | 触发时机	| 可添加处理
:- | :- | :-
onLoad | 监听页面加载 | 发送异步请求数据，用于初始化页面  
onShow | 监听页面显示 | /
onReady | 页面渲染完毕 | /
onHide | 监听页面隐藏，切页面/后台时触发 | /
onUnload | 页面卸载（关闭）时触发 | 通过 `wx.navigateTo` 跳转到其它页面  
onPullDownRefresh | 监听用户下拉 | 刷新页面
onReachBottom | 监听上拉触底 | 加载下一页数据
onShareAppMessage | 用户点击右上角转发 | /
onPageScroll | 监听页面滚动 | /
onResize | 窗口调整，即横/竖屏切换时触发 | /
onTabItemTap | 当前是 tab 页时，点击自身的 tab 时触发 | /

----

## 优购商城项目

### 前期准备

目录名 | 作用  
:-: | :-:  
接口文档 | [跳转](http://www.showdoc.com.cn/128719739414963) 

步骤 | 文件 | 说明  
:-: | :-: | :-
① | app.json | 将日志路径移除  
② | log文件夹 | 删除  
③ | app.wxss | 清空  
④ | app.js | 清空，输入 `wx-app`，回车，删除全局数据 `globalData`。    
⑤ | index.wxml | 清空  
⑥ | index.wxss | 清空 
⑦ | index.js | 清空，输入 `wx-page`，回车。  
⑧ | index.json | 添加 `"navigationBarTitleText": "优购商城"`，即页面标题  
⑨ | app.json | 添加需要的页面路径，如 `"pages/order/index"`

#### 搭建目录结构  

目录名 | 作用  
:-: | :-:  
styles | 存放公共样式  
components | 存放组件  
lib | 第三方库
utils | 自己的帮助库
request | 接口帮助库  
icons | 图标库  

#### 搭建项目的页面  

页面名称 | 名词  
:-: | :-:  
首页 | index 
分类页面 | category 
商品列表页面 | goods_list 
商品详情页面 | goods_detial 
购物车页面 | cart 
收藏页面 | collect 
订单页面 | order 
搜索页面 | search 
个人中心页面 | user 
意见反馈页面 | feedback 
登录页面 | login 
授权页面 | auth 
结算页面 | pay 

#### 引入阿里图标   

步骤 | 说明  
:-: | :-:  
① | 在[官网](https://www.iconfont.cn/)通过单词或拼音搜索 
② | 将喜欢的图标添加入库 
③ | 点击右上角的购物车图标，将图标添加到项目
④ | 在项目中，选择 `Font class`，查看在线链接
⑤ | 打开链接，将代码复制到 `styles` 文件夹的 `iconfont.wxss` 中 
⑥ | 在 `app.wxss` 添加 `@import "./styles.iconfont.wxss";`
⑦ | 使用时，在标签中添加对应**两个**类名

#### 搭建项目的标签栏  

步骤 | 其它 | 说明  
:-: | :-: | :-:   
① | | 在[官网](https://www.iconfont.cn/)下载适合的图标
② | | 格式为PNG，小程序不支持SVG 
③ | | 图标包括激活和未激活两种
④ | | 在 `app.json` 中，通过 `"tabBar"` 配置  
⑤ | 参考 | "color": "#999",
⑤ | 参考 | "selectedColor": "#ff2d4a",
⑤ | 参考 | "backgroundColor": "#fafafa"

#### 初始化样式  

```
/**app.wxss**/

/* 有需要时，再添加标签名 */
page, view, text, swiper, swiper-item, image, navigator {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* 全局变量或配置 */
page {
  /* 主题颜色 */
  --themeColor: #eb4450;
  /* 定义统一字体大小， 假设设计稿大小是 375px
  希望字体为 14px，即等于28rpx */
  font-size: 28rpx;
}  

image {
  width: 100%;
}
```

----


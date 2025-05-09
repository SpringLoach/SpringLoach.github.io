### vscode插件

| 插件                         | 说明                                          |
| ---------------------------- | --------------------------------------------- |
| Atom One Dark Theme          | 改变主题，如代码颜色                          |
| Bookmarks                    | 可以打标记，看源码可用                        |
| vscode-icons                 | 让文件管理处的各个文件带上图标                |
| htmltagwrap                  | 标签自动补全                                  |
| ES7 React/Redux/... snippets | 快速生成模板，如类组件                        |
|                              | 输入 `rmc` 即可快速生成对应模板               |
| vscode-styled-components     | react 中使用的 styled-components 库，智能提示 |
| project Manager              | 保存常用项目，快速打开                        |
| Remote-SSH                   | 连接远程服务器，修改远程文件                  |



### 浏览器插件

React Developor Tools

用于追踪组件状态



### 其他

很多三方库自带 `.d.ts` 文件，用于声明类型，不代表三方库就是用 ts 写的。



node 支持 ES6 模块化

- node v13.2.0之前，需要进行如下操作： 

   + 在package.json中添加属性： "type": "module"； 

   + 在执行命令中添加如下选项：node --experimental-modules src/index.js; 

- node v13.2.0之后，只需要进行如下操作： 

   + 在package.json中添加属性： "type": "module"； 

- 注意：导入文件时，需要跟上.js后缀名；

（node v13.2.0之前，运行环境时添加配置 `--experimental-modules`）



状态管理选择

组件内部可以维护的状态，组件内部维护

共享状态，redux 管理

从服务器请求的数据（包括请求操作），redux 管理



 hash的优势就是兼容性更好，在老版 IE中都可以运行； 

 但是缺陷是有一个#，显得不像一个真 实的路径；



### react vs vue

对比 vue，不需要将可复用的逻辑都写成子组件

jsx：处于耦合性强的考虑，没有将 html 和 js 分离，使用起来更灵活



在 vue 中，可以通过 v-if、v-else这样的指令控制条件渲染

在 react 在，需要通过普通的 js 方式进行判断。

react 无法通过 push 等方法改变状态来触发重新渲染，必须使用 setState，开发负担大呀



在 vue 中，子传父，通过自定义事件；

在 react 中，由父组件将修改状态的方法传递给子组件进行调用。



在 vue 中，通过 slot 实现插槽；

在 react 中，可以通过 props.children 获取父组件传递过来的内容，但只能通过索引获取项；

另一种方式是通过属性传 jsx



在 vue 中，处理表单控件，有 v-model 的语法糖，实现双向绑定；

在 react 中，需要自己手动实现



在 vue 中，想要修改组件的默认挂载行为，使用 Teleport 包裹

在 react 中，需要使用 Portal 方法



在 vue 中，提供了规范的编写 css 方式，在 `.vue` 中，`<css scoped>`，提供了统一的样式风格

在 react 中，没有相应的规范



在 vue-router 中，router-link 可以通过添加属性被设置为其它类型，react 的 link 不行。

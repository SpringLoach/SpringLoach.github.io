---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Spring Loach"
  text: "前端技术"
  tagline: Every day is unmissable
  image: 
    src: /avator.jpg
  actions:
    - theme: brand
      text: 🌟个人详细简历
      link: /expand/其他/工作经历
      # link: https://springloach.github.io/expand/其他/工作经历
    - theme: alt
      text: 后端技术
      link: https://huamujing.github.io/

features:
  # - title: 基础部分
  #   details: 包含原生语言JavaScript/TypeScript/CSS，底层相关知识如数据结构、网络、调试
  # - title: 常用代码
  #   details: 使用频率较高的样式布局、工具方法和常见业务场景的实现
  # - title: 前端框架
  #   details: 包括Vue2/3、React、微信小程序和uni-app及相关的UI库
  # - title: 编码相关
  #   details: 版本控制、代码风格和约束、兼容性问题和性能优化
  # - title: 开发工具链
  #   details: node.js生态下的脚手架、构建工具和项目配置
  # - title: 其他
  #   details: 电脑开发环境配置和改善使用体验的技巧，以及开发常用的辅助软件&&参考文档
  
  - title: 🌟Vue2
    details: 用于构建用户界面的 JavaScript 框架，提供了声明式的、组件化的编程模型
    link: '/前端/业务实现/vue'
    target: _blank
  - title: 🌟Vue3
    details: 通过组合式API管理代码、自定义hook抽离/复用代码、对 TS 更好的支持等
    link: '/前端2/前端框架/Vue技术栈/vue3/对比vue2'
    target: _blank
  - title: Vuex
    details: 集中式存储管理应用的所有组件的状态，用于Vue2
    link: '/前端2/前端框架/Vue技术栈/vuex/知识沉淀'
    target: _blank
  - title: Pinia
    details: 移除了模块系统，使用上更为简便，用于Vue3
    link: '/前端2/前端框架/Vue技术栈/第三方库/pinia/pinia'
    target: _blank
  - title: Vue Router
    details: 为 Vue.js 提供富有表现力、可配置的、方便的路由
    link: '/前端2/前端框架/Vue技术栈/vue-router/知识沉淀'
    target: _blank
  - title: Ant Design Vue
    details: 为 Web 应用提供了丰富的基础 UI 组件
    link: '/前端2/样式框架/ant-design/常用功能'
    target: _blank
  - title: Element-UI
    details: 基于 Vue 2.0 的桌面端组件库，色彩上的对比感更强
    link: '/前端2/样式框架/Element-UI/elementUI'
    target: _blank
  - title: Element-plus
    details: Element-UI 的 Vue 3.0 版本
    link: '/前端2/样式框架/Element-Plus'
    target: _blank
  - title: Vant
    details: 轻量的移动端Vue组件库，Vue2和Vue3都有对应的适配版本
    link: '/前端2/样式框架/Vant/Vant'
    target: _blank
  - title: 🌟React
    details: 用于构建 Web 和原生交互界面的库，通常与 jsx 一起使用
    link: '/前端2/前端框架/React技术栈/React/基础/01-组件'
    target: _blank
  - title: React Router
    details: React 应用的路由库，方便实现单页应用(SPA)
    link: '/前端2/前端框架/React技术栈/React/第三方库/路由-Redux-版本差异'
    target: _blank
  - title: Redux Toolkit
    details: 自动集成 Redux 中间件（如 redux-thunk、immer）；简化开发流程
    link: '/前端2/前端框架/React技术栈/React/项目组织/创建项目.html#全局状态管理'
    target: _blank
  - title: styled-components
    details: CSS-in-JS 库，允许用 JavaScript 编写组件级样式
    link: '/前端2/前端框架/React技术栈/React/第三方库/styled-components'
    target: _blank
  - title: Ant Design
    details: 企业级 React UI 组件库，适合中后台管理系统开发
  - title: 🌟微信小程序
    details: 运用原生小程序技术开发，并进行迭代版本的发布
    link: '/前端2/前端框架/微信小程序/微信小程序'
    target: _blank
  - title: 🌟uni-app
    details: 一套代码，多个平台使用
    link: '/前端2/前端框架/uni-app/功能实现'
    target: _blank
  - title: 🌟APP/小程序内嵌H5
    details: 开发APP和小程序中的通用页面和活动页，实现统一交互/样式表现
    link: '/business/h5'
    target: _blank
  - title: 🌟Nuxt3
    details: 基于Vue.js，用于创建全栈 web 应用程序，支持服务器端渲染。
    link: '/前端2/前端框架/Nuxt/Nuxt3'
    target: _blank
  - title: TypeScript
    details: JavaScript 的超集，为 JS 添加了静态类型系统，提高代码可维护性和开发效率
    link: '/前端/原生技术/TypeScript/快速入门'
    target: _blank
  - title: vite
    details: 新一代前端构建工具，基于原生ES模块，提供极快的冷启动和热更新，适合现代Web开发
    link: '/前端2/开发工具链/脚手架/vite/文档&拓展'
    target: _blank
  - title: webpack
    details: 成熟的模块打包工具，支持代码拆分、懒加载和复杂配置，适用于大型项目
    link: '/前端2/开发工具链/脚手架/webpack/示例&配置详解'
    target: _blank
  - title: vue-cli
    details: 基于Webpack的Vue.js官方脚手架，提供标准化项目模板和插件系统，简化Vue项目搭建
    link: '/前端2/开发工具链/脚手架/vue-cli/常用配置字段'
    target: _blank
  - title: 包管理器
    details: Node.js的版本管理 nvm 和包管理器如 npm、pnpm
    link: '/前端2/开发工具链/包管理器/pnpm'
    target: _blank
  - title: 构建工具
    details: 如 esbuild、gulp、rollup
    link: '/前端2/开发工具链/构建工具/rollup'
    target: _blank
  - title: 预处理器
    details: less、sass
    link: '/前端/原生技术/css/原笔记/知识整理/预处理器'
    target: _blank
  - title: 常见的代码版本控制工具
    details: git、svn
    link: '/前端3/版本控制/git/命令速查'
    target: _blank
  - title: markdown
    details: 开发者最喜欢的现代标记语法
    link: '/expand/相关软件/markdown/markdown'
    target: _blank
  - title: vitepress
    details: 基于 Markdown 编写的内容，提供专为技术文档设计的默认主题
    link: '/expand/相关软件/vitepress/vitepress'
    target: _blank
  - title: axios
    details: 基于 promise 的网络请求库，可以用于浏览器和 node.js
    link: '/前端2/第三方库/axios/axios'
    target: _blank
  - title: echart
    details: 基于JavaScript的开源可视化图表库
    link: '/前端2/第三方库/ECharts/base'
    target: _blank
  - title: html2canvas
    details: 用于将 HTML 元素渲染为画布(Canvas)的库
    link: '/前端2/第三方库/html2canvas/html2canvas'
    target: _blank
  - title: jsPDF
    details: 使用HTML5的Canvas和JavaScript的API来生成PDF文件
    link: '/前端/方法梳理/依赖三方/导出PDF'
    target: _blank
  - title: qrcode
    details: 基于JavaScript的二维码生成库
    link: '/前端/方法梳理/依赖三方/海报二维码'
    target: _blank
  - title: highlight.js
    details: 用于 代码语法高亮 的JavaScript 库
    link: '/前端2/第三方库/highlight.js/highlight.js'
    target: _blank
  - title: viewer.js
    details: 用于展示图片、视频等多媒体内容的轻量级JavaScript 库
    link: '/前端2/第三方库/viewer.js/viewer.js'
    target: _blank
  - title: mockjs
    details: 生成随机数据，拦截Ajax 请求的JavaScript 库
    link: '/前端2/第三方库/mockjs/mockjs'
    target: _blank
  - title: swiper
    details: 纯javascript打造的滑动特效插件
    link: '/前端2/第三方库/swiper/swiper'
    target: _blank
  - title: vconsole
    details: 轻量级的移动端Web控制台插件
    link: '/前端2/第三方库/vconsole'
    target: _blank
  - title: 🌟Node.js
    details: 基于Chrome V8引擎的JavaScript运行环境，使用JavaScript编写服务器端应用程序
    link: 'https://huamujing.github.io/%E7%A8%8B%E5%BA%8F%E8%AF%AD%E8%A8%80/node.js/%E5%AE%9E%E8%B7%B5/%E5%AE%9E%E8%B7%B5.html'
    target: _blank
  - title: Koa
    details: 基于Node.js的轻量级web框架
  - title: MySQL
    details: 关系型数据库管理系统
    link: 'https://huamujing.github.io/%E6%95%B0%E6%8D%AE%E5%BA%93/MySQL/SQL%E8%AF%AD%E5%8F%A5.html'
    target: _blank
  - title: Java
    details: 面向对象的编程语言
    link: 'https://huamujing.github.io/%E7%A8%8B%E5%BA%8F%E8%AF%AD%E8%A8%80/Java%E6%8A%80%E6%9C%AF%E6%A0%88/Java/%E7%8B%82%E7%A5%9E%E6%95%99%E7%A8%8B/JavaSE/JavaSE-%E5%85%A5%E9%97%A8.html'
    target: _blank
  - title: 数据结构和算法
    details: 《学习JavaScript数据结构与算法》笔记，项目中的实践经验
    link: '/前端/素养基石/数据结构与算法/数组相关'
    target: _blank
  - title: 网络协议
    details: 计算机网络中用于定义设备之间通信规则和标准的集合
    link: '/前端/素养基石/网络/网络协议'
    target: _blank
  - title: 移动端兼容性
    details: 记录在Ios和Android系统下进行Web开发的常见问题
    link: '/前端3/进阶处理/兼容性'
    target: _blank
  - title: 性能优化
    details: 常见性能优化方案
    link: '/前端3/进阶处理/性能优化'
    target: _blank
  - title: 代码风格配置
    details: 使用 eslint、prettier、stylelint 配置代码风格/检查语法
    link: '/前端3/代码约束/eslint/eslint'
    target: _blank
  - title: 开发通用代码约束库
    details: 为不同的项目制定统一的编码规范
    link: '/前端3/代码约束/编写eslint库'
    target: _blank
  - title: dom实践场景
    details: 记录实践中较为经典的需要通过操作dom实现目的的场景
    link: '/前端/业务实现/dom'
    target: _blank
  - title: 复杂动画交互实践场景
    details: 记录较为有趣的动画交互的实现思路
    link: '/前端/业务实现/界面'
    target: _blank
---

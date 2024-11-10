### 开发流程

#### 一、初始化项目

```elm
npm create vite@latest my-vue-app -- --template vue
```



#### 二、引入并注册插件

```elm
- plugin
  + md-to-vue // 粘贴
    - components
    - src
- vite.config.js
```

`vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdToVue from './plugin/md-to-vue/src/index'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdToVue(),
    vue({
      include: [/\.vue$/, /\.md$/], // 解析 .md 文件
    })
  ],
})
```



#### 三、补充相关依赖并安装

`package.json`

```json
{
  "name": "vite-plugin",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "highlight.js": "^11.10.0",
    "markdown-it": "^14.1.0",
    "vue": "^3.5.12",
    "vue-router": "^4.4.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.1.4",
    "sass": "^1.65.1",
    "vite": "^5.4.10"
  }
}
```



#### 四、配置路由

```elm
- src
  + router
    - index.js
  + pageWrapper.vue // 粘贴
```

`src\router\index.js`

```javascript
// router.js
import { createRouter, createWebHistory } from 'vue-router';
 
// 引入Vue组件
// 这里不知道怎么引用plugin下那个组件，就复制了一份出来
import pageWrapper from '../pageWrapper.vue'
import HelloWorld from '../components/HelloWorld.vue';
 
// 定义路由
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/documentation', component: pageWrapper, children: [
    {
        path: 'demo',
        component: () => import('../demo.md'),
        meta: {
            title: '示例 demo'
        },
    }
  ] },
];
 
// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
export default router;
```

`src\main.js`

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(router);
app.mount('#app')
```

`src\App.vue`

```html
<template>
  <div>
    <router-view />
  </div>
</template>
```



#### 五、写个示例的 `.md` 文件

`src\demo.md`

````markdown
# 示例组件 demo

报错信息不完整，但从给出的部分来看，这个错误通常与解析源代码文件时发现内容无效有关。这可能是因为文件损坏、格式不正确或者包含无法识别的字符。

## 基础用法

```vue demo
<template>
    <h4>示例：</h4>
    <div>
        <input placeholder="请输入" />
    </div>
</template>

<script setup>
</script>
```
````



#### 六、修改初始化样式
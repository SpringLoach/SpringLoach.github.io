## 创建库项目

以 `eslint` 的 配置集作为示例



### 编写第三方库

新建文件夹， 这里以 `demo-tool` 为例，进入文件夹中打开终端



#### 初始化项目

```elm
npm init -y
```

目录结构

```
demo-tool
├── lib
│   └── index.js
└── package.json
```



#### `package.json`

```json
{
  // ...
  "name": "demo-tool",
  "main": "lib/index.js",
    "peerDependencies": {
      "eslint": ">= 3"
   },
}
```

<span style="color: #3a84aa">`name` 的含义</span>

作为npm发布的包名称，实际上这里命名以 `eslint-config-` 开头更为合适



<span style="color: #3a84aa">`main` 的含义</span>

一般 `lib/index.js` 作为入口比较规范，不是强制的



<span style="color: #3a84aa">`peerDependencies` 的含义</span>

`peerDependencies`（对等依赖）是 npm 包管理系统中的一种特殊依赖关系，它表示：

- 你的包**需要**某个依赖项，但**不希望直接安装它**
- 而是要求**使用你的包的项目**必须安装这个依赖
- 这是一种"兼容性声明"，而不是真正的依赖安装指令



<span style="color: #3a84aa">`"eslint": ">= 3"` 的含义</span>

- 你的 ESLint 插件/规则库**需要 ESLint 才能工作**
- 但它**不自己安装 ESLint**
- 要求**使用你的包的项目**必须安装 ESLint，且版本必须是 3.x 或更高
- `>= 3` 表示兼容 ESLint 3.0 及以上所有版本



<span style="color: #3a84aa">dependencies vs peerDependencies</span>

|              | `dependencies`       | `peerDependencies`           |
| :----------- | :------------------- | ---------------------------- |
| **安装行为** | 会自动安装           | 不会自动安装(旧版npm)        |
| **用途**     | 你的包真正需要的依赖 | 你的包需要但由用户提供的依赖 |
| **示例**     | `lodash`             | `eslint`, `webpack`          |



#### `lib/index.js`

```javascript
module.exports = {
    rules: {
        "no-console": ["error", { allow: ["error"] }], // 禁止console.log，只允许console.error
        "no-debugger": "error", // 禁用 debugger
    },
};
```





### 发布到 npm

1. 登录 npm

   ```shell
   npm login
   ```

2. 发布

   ```shell
   npm publish
   ```





### 引入使用

```elm
npm install demo-tool -D
```

`eslint.config.js`

```javascript
import springloachTool from 'springloach-tool'

export default [
    springloachTool,
]
```





## npm发布相关

### 登陆报错

> 可能配置了自定义 registry（如淘宝镜像），但登录时未切换回官方 registry。

**切换 registry**

- 临时切换回官方 registry：

  ```shell
  npm login --registry=https://registry.npmjs.org
  ```

- 如果在国内，可以尝试使用淘宝镜像（但登录需切回官方）：

  ```shell
  npm config set registry https://registry.npmmirror.com  # 日常使用
  npm config set registry https://registry.npmjs.org     # 登录时切换回官方
  ```



### npm再次发布

<span style="color: #3a84aa">发布流程</span>

1. 更新版本号：`npm version patch|minor|major`
2. 发布到 npm：`npm publish`



<span style="color: #3a84aa">更新版本</span>

```bash
npm version patch   # 升级修订号（1.2.3 → 1.2.4）
npm version minor   # 升级次版本号（1.2.3 → 1.3.0）
npm version major   # 升级主版本号（1.2.3 → 2.0.0）
```

运行后：

1. 自动更新 `package.json` 的 `version` 字段。
2. 默认会创建一个 Git commit 并打上 tag（如 `v1.0.0`）。



<span style="color: #3a84aa">查看所有已发布版本</span>

发布成功后，淘宝镜像不一定能马上获取到最新版本，可以等几分钟

```shell
npm view your-package-name versions  # 查看所有已发布版本
```



## 库拓展

> 将 prettier 和 stylelint 的配置也加到同个库中

```elm
- lib
  + eslint
    - index.js
  + prettier
    - index.js
  + stylelint
    - index.js
  + index.js
- package.json
```



### prettier

<span style="color: #3a84aa">迁移原本的入口配置内容</span>

`lib/index.js` => `lib/eslint/index.js`



<span style="color: #3a84aa">编写 `prettier` 配置</span>

`lib/prettier/index.js`

```javascript
module.exports = {
    tabWidth: 4, // 使用4个空格缩进
    // ...
}
```



<span style="color: #3a84aa">修改入口文件</span>

`lib/index.js`

```javascript
module.exports = {
  configs: {
    eslintConfig: require("./eslint/index.js"),
    prettierConfig: require("./prettier/index.js")
  }
}
```



<span style="color: #3a84aa">修改 package.json</span>

`package.json`

```json
{
  "peerDependencies": {
    // ...,
    "prettier": ">= 1"
  }
}
```



<span style="color: #3a84aa">引入使用</span>

`eslint.config.js`

```javascript
import springloachTool from 'springloach-tool'

export default [
    springloachTool.configs.eslintConfig
]
```



`prettier.config.js`

```javascript
import springloachTool from 'springloach-tool'

export default springloachTool.configs.prettierConfig
```



### stylelint

<span style="color: #3a84aa">编写 `stylelint` 配置</span>

`lib/stylelint/index.js`

```javascript
const basicRules = {
    // 配置详情可以看这里 https://stylelint.io/user-guide/rules 或 https://stylelint.docschina.org/user-guide/rules/
    'block-no-empty': [
        true,
        {
            message: '禁止空的声明块'
        }
    ],
    'comment-no-empty': [
        true,
        {
            message: '禁止空的注释语句'
        }
    ],
    // 指定声明块内属性的顺序
    'order/properties-order': [
        [
            'width',
            'height',
        ],
        {
            message: '请按照顺序写css的属性'
        }
    ],
    // 以下是scss的规则，详见 https://github.com/stylelint-scss/stylelint-scss
    'scss/at-import-partial-extension': [
        'always',
        { message: '@import语句中，引入scss资源时需要带.scss后缀' }
    ],
    // ...
}
module.exports = {
    extends: [],
    customSyntax: require('postcss-scss'),
    plugins: ['stylelint-scss', 'stylelint-order'],
    rules: basicRules,
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
            customSyntax: 'postcss-html',
            rules: basicRules
        }
    ]
}

```



<span style="color: #3a84aa">修改 package.json</span>

`package.json`

```json
{
  "dependencies": {
      "postcss": "^8",
      "postcss-scss": "^4.0.6",
      "postcss-html": "^1.5.0",
      "stylelint-order": "^6.0.1",
      "stylelint-scss": "^4.3.0"
  },
  "peerDependencies": {
    // ...
    "stylelint": ">= 3"
  },
}
```



<span style="color: #3a84aa">修改入口文件</span>

`lib/index.js`

```javascript
module.exports = {
  configs: {
    eslintConfig: require("./eslint/index.js"),
    prettierConfig: require("./prettier/index.js"),
    stylelintConfig: require("./stylelint/index.js"),
  }
}
```



<span style="color: #3a84aa">引入使用</span>

`.stylelintrc.cjs`

```javascript
const springloachTool = require('springloach-tool')

module.exports = springloachTool.configs.stylelintConfig
```



### 方法拓展

> 把方法也糅合到整个库，感觉方案不太妥当，像把所有东西都引到使用的组件中去了

```
- lib
  + utils
    - index.js
  + index.js
```



<span style="color: #3a84aa">编写方法</span>

`lib/utils/index.js`

```javascript
function addOne(num) {
    return num + 1
}

function addTwo(num) {
    return num + 2
}

module.exports = {
    addOne,
    addTwo
}
```



<span style="color: #3a84aa">修改入口文件</span>

`lib/index.js`

```javascript
module.exports = {
  // ...
  utils: require("./utils/index.js")
}
```



<span style="color: #3a84aa">引入使用</span>

`App.vue`

```javascript
import springloachTool from 'springloach-tool'

console.log(springloachTool.utils.addOne(33))
console.log(springloachTool.utils.addTwo(44))
```



### 指令拓展

```
- lib
  + directive
    - index.js
  + index.js
```



<span style="color: #3a84aa">编写指令</span>

`lib/directive/index.js`

```javascript
const ccFunc = (el, binding) => {
    console.log(binding.value.color)
    console.log(binding.value.text)
}

function directive(app, prefix = '') {
    app.directive(prefix + 'cc', ccFunc)
}

module.exports = directive
```



<span style="color: #3a84aa">修改入口文件</span>

`lib/index.js`

```javascript
module.exports = {
  // ...
  directiveRegister: require("./directive/index.js")
}
```



<span style="color: #3a84aa">引入使用</span>

`main.js`

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import springloachTool from 'springloach-tool'

const app = createApp(App)

springloachTool.directiveRegister(app)

app.mount('#app')
```

`App.vue`

```javascript
<div v-cc="{ color: 'white', text: 'hello!' }"></div>
```



#### 判断vue2/vue3

<span style="color: #3a84aa">编写指令</span>

`lib/directive/index.js`

```javascript
import { isVue3 } from 'vue-demi'

const ccFunc = (el, binding) => {
    console.log(binding.value.color)
    console.log(binding.value.text)
    if (isVue3) {
        console.log('isVue3')
    } else {
        console.log('isVue2')
    }
}

function directive(app, prefix = '') {
    app.directive(prefix + 'cc', ccFunc)
}

module.exports = directive
```

<span style="color: #3a84aa">修改 package.json</span>

`package.json`

```json
{
  "dependencies": {
      // ...
      "vue-demi": "^0.14.6"
  }
}
```



## md-to-vue

#### 补缺漏

`mdToVue.js`

```javascript
const md = new markdownIt() // [!code ++]
```



#### 将 src 文件转化为es和lib文件

<span style="color: #3a84aa">Rollup 可以进行更复杂的打包</span>（如代码压缩、依赖外置等）

```elm
npm install rollup @rollup/plugin-babel @rollup/plugin-node-resolve -D
```



<span style="color: #3a84aa">编写打包配置</span>

`rollup.config.js`

```javascript
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  // ESM 配置
  {
    input: "src/index.js",
    external: ["highlight.js", "arkdown-it"],
    output: {
      dir: "es",
      format: "esm",
    },
    plugins: [babel({ babelHelpers: "bundled" }), nodeResolve()],
  },
  // CJS 配置
  {
    input: "src/index.js",
    external: ["highlight.js", "arkdown-it"], // 依赖外置（不会被打包进目标文件中，而是由项目提供）
    output: {
      dir: "lib",
      format: "cjs",
    },
    plugins: [babel({ babelHelpers: "bundled" }), nodeResolve()],
  },
];
```



<span style="color: #3a84aa">编写package.json</span>

`package.json`

```json
{
  "name": "springloach-md",
  "version": "0.0.10",
  "description": "提供文档能力",
  "main": "lib/index.js",
  "module": "es/index.js",
  "type": "module",
  "scripts": {
    "build": "rollup -c"
  },
  "files": [
    "es",
    "lib",
    "components"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "highlight.js": "^11.10.0",
    "markdown-it": "^14.1.0"
  },
  "devDependencies": {
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-node-resolve": "^16.0.1",
    "rollup": "^4.38.0"
  }
}
```

> 在执行构建 `nom run build` 时需添加 `"type": "module"`，否则构建报错；
>
> 上传 npm 时要删除 `"type": "module"`，否则在项目中引入时报错。



<span style="color: #3a84aa">`main` 的含义</span>

指定 CommonJS 模块的入口文件，供 Node.js 或传统打包工具使用

<span style="color: #3a84aa">`module` 的含义</span>

指定 ES Module 入口文件，供现代打包工具（如 Vite、Rollup）使用

<span style="color: #3a84aa">`files` 的含义</span>

只有列出的文件会被发布到 npm



<span style="color: #3a84aa">执行打包配置</span>

> 将在目录下生成所需要的 lib 和 es 文件夹

```shell
npm run build
```



#### 发布npm

发布前删除下面的代码

`package.json`

```json
"type": "module"
```



#### 引入使用

```elm
npm i vue-router
```



 **配置**

`vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdToVue from 'springloach-md'

export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/], // 配置 Vue 插件处理 .vue 和 .md 文件
        }),
        mdToVue()
    ]
})
```



**使用**

注意示例 `.md` 文件的正确性




### 介绍

> 安装 Webpack 时会自动安装 Browserslist；
>
> 用于指定项目需要支持适配的浏览器范围，有助于减少包的体积。
>
> babel 会根据这些设置决定兼容范围，比如 [@babel/preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html) 和 [Autoprefixer](https://github.com/postcss/autoprefixer)，分别用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。



### 配置方式

> 有两种[配置](https://github.com/browserslist/browserslist)方式，指定了项目的目标浏览器的范围。

**方式一**

<span style="background: #efe0b9">[root]/.browserslistrc</span>

```css
# Browsers that we support

> 1%,
last 2 versions,
not dead
```

**方式二**

<span style="background: #efe0b9">package.json</span>

```javascript
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```

`dead` 解释:

```less
dead：来自上两个版本查询的浏览器，但在全球使用统计中占不到0.5%，并且24个月没有官方支持或更新。现在是IE 10、IE_Mob 10、BlackBerry 10、BlackBerry 7和 OperaMobile 12.1
```



### 与 Polyfill 的区别

- ES6+ 的语法通过 Babel 就可以转换，为什么还需要 Polyfill?

  > 一些 ES6+ 的语法特性，例如箭头函数、模板字符串、常量声明等，只涉及到语法层面的改变，因此可以在不引入新的 JavaScript 对象或方法的情况下通过简单的语法转换为旧版本的 JavaScript。
  > 但是，有些 ES6+ 特性涉及到新的 JavaScript 对象、方法或内置功能，例如 Map、Set、Symbol、Promise、async/await 等，这些特性不能通过简单的语法转换来实现，因此需要使用 Polyfill。


### 安装依赖

```elm
npm install prettier -D
```



### vscode安装插件

vscode 安装插件 Prettier - Code formatter



### Prettier配置文件

> 有多种命名方式



#### `.prettierrc`

> 命名为 `.prettierrc` / `.prettierrc.json`，会被 VS Code 实时检测到变化

```javascript
{
    "tabWidth": 4,
    "semi": false,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 120,
    "arrowParens": "avoid",
    "bracketSpacing": true,
    "endOfLine": "auto",
    "useTabs": false,
    "quoteProps": "as-needed",
    "jsxSingleQuote": false,
    "jsxBracketSameLine": false,
    "requirePragma": false,
    "insertPragma": false,
    "proseWrap": "preserve",
    "htmlWhitespaceSensitivity": "css"
}
```



#### `prettier.config.js`

> 命名为 `prettier.config.js` / `prettier.config.cjs` 可以添加备注，但是修改需要重启编辑器才能生效

```javascript
module.exports = {
    tabWidth: 4, // 使用4个空格缩进
    semi: false, // 代码结尾是否加分号
    trailingComma: 'es5', // 数组和对象的最后一项之后，跟一个逗号
    singleQuote: true, // 是否使用单引号
    printWidth: 120, // 超过多少字符强制换行
    arrowParens: 'avoid', // 单个参数的箭头函数不加括号 x => x
    bracketSpacing: true, // 对象大括号内两边是否加空格 { a:0 }
    endOfLine: 'auto', // 文件换行格式 LF/CRLF
    useTabs: false, // （tab）不使用制表符而是空格作为缩进
    quoteProps: 'as-needed', // 对象的key仅在必要时用引号
    jsxSingleQuote: false, // jsx不使用单引号,而使用双引号
    jsxBracketSameLine: false, // jsx标签的反尖括号需要换行
    rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
    rangeEnd: Infinity, // 结尾
    requirePragma: false, // 不需要写文件开头的 @prettier
    insertPragma: false, // 不需要自动在文件开头插入 @prettier
    proseWrap: 'preserve', // (md)使用默认的折行标准
    htmlWhitespaceSensitivity: 'css', // 根据显示样式决定html要不要折行
}
```



#### `prettier.config.cjs`

> 如果 `package.json` 中配置了 `"type": "module"`，会导致配置[失效](https://blog.csdn.net/weixin_44255044/article/details/132080214/)，可以将后缀修改为 `cjs`，相当于告诉 node.js 该文件使用了 CommonJS 规范，就能正常生效

也可以不修改后缀，将文件修改为 ES Module 的形式

```javascript
export default { }
```



### vscode设置

`.vscode/settings.json`

```javascript
{
    // 将默认格式化工具设置为 Prettier 官方插件
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    // 保存文件时自动格式化代码（触发 Prettier 格式化）
    "editor.formatOnSave": true,
    // 要求项目根目录必须有 Prettier 配置文件，否则拒绝格式化
    "prettier.requireConfig": true,
    // js/ts/json/css/scss文件使用 Prettier 格式化
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
}
```





### 配置忽略文件

`.prettierignore`

```javascript
node_modules
dist
build
coverage
*.md
*.html
```


### vite+vue3

#### 依赖安装

```elm
npm install stylelint stylelint-config-standard postcss-html -D
```



#### 创建配置文件

```less
- 项目
  + .stylelintrc.cjs
```

`.stylelintrc.cjs`

```javascript
module.exports = {
    extends: [
        "stylelint-config-standard",
    ],
    customSyntax: 'postcss-html'
}
```



#### vscode 插件

1. vscode 插件安装 Stylelint



2. 检验效果（可选）

```elm
npx stylelint **/App.vue
```



3. 保存时自动修复

```less
- 项目
  + .vscode
    - settings.json
```

`settings.json`

```json
{
    // 指定在保存文件时自动触发的代码操作
    "editor.codeActionsOnSave": {
        "source.fixAll.stylelint": "explicit" // 使用 stylelint 自动修复所有可修复的样式问题
    },
    // 启用stylelint
    "stylelint.enable": true, 
    // 关闭编辑器(vscode)内置样式检查（避免与stylelint冲突）
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false,
    // 扩展stylelint的文件校验范文，这里放的都是文件后缀名
    "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"],
}
```





###  插件介绍

| 插件/预设配置                    | 作用范围       | 特点                                                         |
| -------------------------------- | -------------- | ------------------------------------------------------------ |
| postcss-html                     |                | 在 stylelint 中检查 vue/html 的 css 需要用到                 |
| postcss-scss                     |                | 在 stylelint 中检查 lang="scss" 用到，与 **stylelint-scss** 配合使用 |
| stylelint-config-recommended     | css            | 更基础的配置集合，仅包含潜在错误规则                         |
| stylelint-config-standard        | css            | <span style="color: #ff0000">基于上面配置扩展</span>，添加了代码风格规则（如缩进、命名） |
| stylelint-config-recommended-vue | Vue 单文件组件 | 基于 `recommended`，适配 Vue 语法（如 `::v-deep`）           |
| stylelint-config-standard-vue    | Vue 单文件组件 | 基于 `standard`，适配 Vue 语法 + 风格规则（更严格）          |
| stylelint-scss                   | scss 支持      | 用于检查 SCSS/Sass 语法的插件                                |
| stylelint-config-standard-scss   |                | 基于 **stylelint-config-standard** 扩展，内含 **stylelint-scss** |
| stylelint-order                  |                | 强制规范 CSS 属性的书写顺序                                  |

可以自行配置，或基于插件覆盖配置

如果没有错误提示，尝试重启 VS Code 或重新加载窗口（`Ctrl+Shift+P` → **Reload Window**）



### 部分插件配置示例

#### stylelint-order

`.stylelintrc.cjs`

```json

module.exports = {
    plugins: [
        "stylelint-order"
    ],
    rules: {
        "order/properties-order": [
            [
                "position",
                "top",
                "right",
                "bottom",
                "left",
                "display",
                "width",
                "height",
                "margin",
                "padding",
                "font-size",
                "color"
            ],
            {
                message: '请按照顺序写css的属性'
            }
        ]
    },
    customSyntax: 'postcss-html'
}
```



#### stylelint-config-standard-scss

> 基于 `stylelint-config-standard-vue` 拓展，并自带 `stylelint-scss` 的预设方案

```elm
npm install sass -D
```

```elm
npm install -D stylelint-config-standard-scss -D
```

`.stylelintrc.cjs`

```json
module.exports = {
    extends: [
        "stylelint-config-standard-scss"
    ],
    customSyntax: 'postcss-html'
}
```



#### stylelint-scss

> 在 vite + vue3 中引入 scss 后，使 `.vue` 中的规则生效

```elm
npm install postcss-html -D
```

```elm
npm install postcss-scss stylelint-scss -D
```

```javascript
const baseRules = {
    'scss/comment-no-empty': [true, { message: '禁止内容是空的注释' }],
    'block-no-empty': [true, { message: '禁止空的声明块' }],
    'unit-no-unknown': [true, { message: '禁止使用未知的单位', ignoreUnits: ['rpx'] }],
}

module.exports = {
    extends: [],
    plugins: [
        "stylelint-scss",
    ],
    rules: baseRules,
    customSyntax: require('postcss-scss'),
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
            customSyntax: 'postcss-html'
        }
    ]
}
```


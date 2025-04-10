### 版本兼容参考

> `eslint` 想要在 vue 中生效，需要额外的依赖 `eslint-plugin-vue` ，另外 `v9.0+` 在配置文件上区别很大

| ESLint 版本 | eslint-plugin-vue 版本 | 配置文件类型     | 配置系统     |
| :---------- | :--------------------- | :--------------- | :----------- |
| >= 8.23.0   | >= 9.0.0               | eslint.config.js | Flat Config  |
| < 8.23.0    | < 9.0.0                | .eslintrc.js     | 传统配置系统 |



### eslnit7示例

> 尝试过采用更高的 node 版本，修复 eslint 报错问题，但没有效果，还导致项目无法启动。

#### 安装依赖

```elm
npm install eslint@7 eslint-plugin-vue@8 -D
```



#### vscode安装插件

vscode 安装插件 ESLint



#### vscode配置

`.vscode/settings.json`

```json
{
    // eslint
    "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue", "html"],

    // 指定在保存文件时自动触发的代码操作
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
}
```



#### 配置文件

`.eslintrc.cjs`

```javascript
module.exports = {
    extends: [
        'plugin:vue/vue3-recommended', // 或 'plugin:vue/recommended' for Vue 2
    ],
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 2,
    },
}
```



### eslint9[示例](https://eslint.vuejs.org/user-guide/)

#### 安装依赖

```elm
npm install eslint eslint-plugin-vue -D
```



#### vscode安装插件

> 同eslint7



#### vscode配置

> 同eslint7



#### 配置文件

`eslint.config.js`

```javascript
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
    // add more generic rulesets here, such as:
    // js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
    {
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 2,
        },
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
    },
]
```



### 避免与 prettier 的冲突

> 这个插件的作用是**关闭与 Prettier 冲突的eslint规则**

```elm
npm install eslint-config-prettier -D
```



**eslint7示例**

`.eslintrc.cjs`

```javascript
module.exports = {
  extends: [
    "plugin:vue/recommended",
    "prettier", // 必须放在最后，覆盖冲突规则
  ]
};
```



**eslint9示例**

`eslint.config.js`

```javascript
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    // 你的其他 ESLint 配置（如 Vue、React、TypeScript 等）
    {
        rules: {
            // 你的规则...
        },
    },
    // 应用 eslint-config-prettier（必须放在最后！）
    eslintConfigPrettier,
]
```



### vue3+ts示例

```elm
npm install eslint eslint-plugin-vue eslint-config-prettier typescript-eslint globals -D
```

`eslint.config.js`

```javascript
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from "@eslint/js"
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default [
    // add more generic rulesets here, such as:
    js.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
    {
        rules: {
            // ...
        },
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
    },
    // 应用 eslint-config-prettier（必须放在最后！）
    eslintConfigPrettier,
]
```



### 规则补充

#### js规则示例

```javascript
module.exports = {
    rules: {
        // eslint部分，详见https://eslint.bootcss.com/docs/rules/
        // 语法限制，这些规则可以规避潜在的bug
        'no-unused-vars': 'error', // 禁止在代码中声明但未使用的变量
        'for-direction': 'error', // 当循环条件与更新语句的方向不一致时，会报错（例如：循环条件检查变量是否增加，但更新语句却在减少变量）
        'getter-return': 'error', // 强制要求 getter 方法必须包含 return 语句
        'no-async-promise-executor': 'error', // 禁止在 new Promise() 构造函数中使用异步函数（async）作为执行器（executor）
        'no-compare-neg-zero': 'error', // 禁止与 -0 进行比较
        'no-cond-assign': 'error', // 禁止条件判断中出现赋值操作符
        'no-console': ['error', { allow: ['error'] }], // 禁止console.log，只允许console.error
        'no-constant-condition': 'error', // 禁止在条件语句中使用永远为真或永远为假的常量表达式
        'no-control-regex': 'error', // 禁止在正则表达式中使用控制字符（安全性、避免不可见字符造成的困惑）
        'no-debugger': 'error', // 禁用 debugger
        'no-dupe-args': 'error', // 禁止在 function 定义中出现重复的参数
        'no-dupe-keys': 'error', // 禁止在对象字面量中出现重复的键
        'no-duplicate-case': 'error', // 禁止重复 case 标签
        'no-empty': 'error', // 禁止空块语句
        'no-empty-character-class': 'error', // 禁止在正则表达式中出现空字符集
        'no-ex-assign': 'error', // 禁止对 catch 子句中的异常参数重新赋值
        'no-extra-boolean-cast': 'error', // 禁止不必要的布尔类型转换（例如：在逻辑上下文(if/while/三元运算符等)中会自动将值转换为布尔值）
        'no-extra-semi': 'error', // 禁用不必要的分号
        'no-func-assign': 'error', // 禁止对 function 声明重新赋值
        'no-inner-declarations': 'error', // 禁止在嵌套的语句块中出现变量或 function 声明，function声明可以用const fn = () => {} 来声明
        'no-invalid-regexp': 'error', // 禁止在 RegExp 构造函数中出现无效的正则表达式
        'no-irregular-whitespace': 'error', // 禁止不规则的空白
        'no-misleading-character-class': 'error', // 禁止在正则表达式的字符类（[...]）中使用可能产生误导或意外匹配的字符组合
        'no-obj-calls': 'error', // 禁止将全局对象当作函数进行调用
        'no-prototype-builtins': 'error', // 禁止直接使用 Object.prototypes 的内置属性，应当Object.prototype.fn.call(obj, 参数1， 参数2)
        'no-regex-spaces': 'error', // 禁止正则表达式字面量中出现多个空格
        'no-sparse-arrays': 'error', // 禁止使用稀疏数组（即包含连续逗号的数组，如[1,,3]）
        'no-unexpected-multiline': 'error', // 禁止使用令人困惑的多行表达式（防止因 JavaScript 自动分号插入机制导致的代码意外合并/拆分执行的问题）
        'no-unreachable': 'error', // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
        'no-unsafe-finally': 'error', // 禁止在 finally 代码块中使用可能中断控制流（如 return、throw、break 或 continue）的语句
        'no-unsafe-negation': 'error', // 禁止对关系运算符的左操作数使用否定操作符
        'require-atomic-updates': 'error', // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
        'use-isnan': 'error', // 强制要求使用 Number.isNaN() 而不是全局的 isNaN() 来检查 NaN 值
        'valid-typeof': 'error', // 强制 typeof 表达式与有效的字符串进行比较——(例如strnig 、 String无效)
        'accessor-pairs': 'error', // 强制对象 getter和setter强制成对出现
        'array-callback-return': 'error', // 强制数组方法的回调函数中有 return 语句，包括from、every、filter、find、findIndex、map、reduce、reduceRight、some、sort方法
        curly: 'error', // if、else、for、while 或 do这些块，强制使用{}包裹
        'default-case': 'error', // switch语句中，强制包含default分支
        eqeqeq: 'off', // 强制使用 === 和 !==—  (error启用)
        "no-alert": "error", // 禁止使用alert、confirm、prompt
        "no-case-declarations": "error", // 禁止在 case 或 default 子句中出现词法声明（let、const、function 和 class）
        "no-empty-function": "error", // 禁止空函数
        "no-empty-pattern": "error", // 禁止使用空解构模式
        "no-eval": "error", // 禁止使用eval
        "no-fallthrough": "error", // switch中的case语句必须有break
        "no-global-assign": "error", // 禁止对原生对象或只读的全局对象进行赋值
        "no-new-wrappers": "error", // 禁止对String、Number 和 Boolean使用new关键字
        "no-octal": "error", // 禁止使用8进制
        "no-param-reassign": "error", // 禁止对函数的参数再赋值
        "no-redeclare": "error", // 禁止重新声明变量
        "no-script-url": "error", // 禁止在a标签中使用javascript: Script URL
        "no-self-assign": "error", // 禁止自身赋值——（例如 x = x 或 obj.prop = obj.prop）
        "no-self-compare": "error", // 禁止自身比较
        "no-unused-labels": "error", // 禁用未使用过的标签
        "no-useless-catch": "error", // 禁止在 try-catch 语句中定义仅重新抛出原始错误而不做任何处理的冗余 catch 块
        "no-useless-escape": "error", // 禁止在字符串和正则表达式中使用不必要的转义字符——（例如 const str1 = "\#" #不需要转义）
        "no-useless-return": "error", // 禁止在函数中使用多余的 return 语句
        "no-with": "error", // 禁用 with 语句
        "require-await": "error", // 禁止使用不带 await 表达式的 async 函数
        "no-delete-var": "error", // 禁止使用 delete 操作符删除变量
        "no-shadow-restricted-names": "error", // 禁止覆盖 JavaScript 的关键字、保留字和特殊全局变量（如 undefined、NaN、Infinity 等）
        "no-undef": "error", // 禁用出现未声明的变量，除非在globals中声明
        "constructor-super": "error", // 要求在构造函数中有 super() 的调用
        "no-class-assign": "error", // 禁止修改类声明的变量
        "no-const-assign": "error", // 禁止修改 const 声明的变量
        "no-dupe-class-members": "error", // 禁止类成员中出现重复的名称
        "no-duplicate-imports": "error", // 禁止重复模块导入
        "no-new-symbol": "error", // 禁止使用 new Symbol() 的构造函数形式创建 Symbol 值
        "no-this-before-super": "error", // 禁止使用 new Symbol() 的构造函数形式创建 Symbol 值，强制使用正确的 Symbol() 调用方式
        "no-var": "error", // 要求使用 let 或 const 而不是 var
        "object-shorthand": "error", // 要求对象字面量尽可能使用简写语法，比如{a, n(){}}
        "prefer-const": "error", // 要求未被重新赋值的变量都需要用const声明
        "require-yield": "error", // 要求 generator 函数内有 yield
        "symbol-description": "error", // 必须提供 symbol 描述
        // 以下是代码风格限制，一般而言风格已经由prettier接管，无需再在eslint做限制，此处仅收录eslint:recommended的规则
        "no-mixed-spaces-and-tabs": "error", // 禁止空格和 tab 的混合缩进
    }
}
```



#### vue3规则示例

部分规则可能随版本变化导致替换，具体可见 [eslint-plugin-vue 规则文档](https://eslint.vuejs.org/rules/#removed)

```javascript
module.exports = {
    rules: {
        // vue3的规则部分，详见https://eslint.vuejs.org/rules/
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index', 'main'],
            },
        ], // 组件名称必须是两个以上的单词组合，除了index.vue和main.vue是例外
        'vue/no-async-in-computed-properties': 'error', // 禁止在computed中存在任何异步代码，例如requestAnimationFrame、await，setTimeout、setInterval、fetch、Promise
        'vue/no-child-content': 'error', // 禁止在使用了v-html/v-text的元素上包裹任何子元素
        'vue/no-computed-properties-in-data': 'error', // 禁止在data(){}中访问computed的变量
        'vue/no-deprecated-html-element-is': 'error', // 禁止在原生html元素上使用is属性
        'vue/no-deprecated-props-default-this': 'error', // 禁止在props的default函数中，访问this
        'vue/no-deprecated-slot-attribute': 'error', // 禁止使用slot属性，应当使用v-slot或#
        'vue/no-export-in-script-setup': 'error', // 禁止在 <script setup> 中使用 export 语句
        'vue/no-expose-after-await': 'error', // 禁止在await之后使用defineExpose
        'vue/no-lifecycle-after-await': 'error', // 禁止在await之后使用声明周期hook
        'vue/no-watch-after-await': 'error', // 禁止在await之后使用watch
        'vue/no-mutating-props': 'error', // 禁止对props传入的变量再赋值
        'vue/no-parsing-error': 'error', // 禁止在template中使用不可解析的语法
        'vue/no-ref-as-operand': 'error', // 必须使用.value来访问Ref类型的变量
        'vue/no-reserved-component-names': 'error', // 禁止使用原生html的标签作为自定义组件名
        'vue/no-reserved-keys': 'error', // 禁止声明和vue关键字一致的变量
        'vue/no-reserved-props': 'error', // 禁止在props中声明和vue关键字一致的变量
        'vue/no-setup-props-reactivity-loss': 'error', // 禁止在解构 props 时导致响应性丢失的操作
        'vue/no-side-effects-in-computed-properties': 'error', // 强制要求计算属性必须是纯函数，不能产生副作用
        'vue/no-template-key': 'error', // tempalte只有在v-for的时候才可以有key属性
        'vue/no-textarea-mustache': 'error', // 禁止在textarea标签中包裹其他内容
        'vue/no-unused-components': 'error', // 禁止声明未使用的组件
        'vue/no-unused-vars': [
            'error',
            {
                ignorePattern: '^_',
            },
        ], // 禁止声明未使用的变量，除非是以_开头
        'vue/no-use-computed-property-like-method': 'error', // 禁止将计算属性当作方法一样使用（即在模板中带括号调用）
        'vue/no-use-v-if-with-v-for': 'error', // 禁止同时使用v-if和v-for
        'vue/no-useless-template-attributes': 'error', // 禁止在template上声明无用的属性
        'vue/no-v-for-template-key-on-child': 'error', // 在template上使用v-for时，禁止对子元素使用key
        'vue/no-v-text-v-html-on-component': 'error', // 禁止在自定义组件上使用v-text和v-html
        'vue/prefer-import-from-vue': 'error', // 强制要求从 'vue' 模块统一导入 Vue 相关的 API，而不是从其他路径（如 '@vue/composition-api' 或 'vue/dist/vue.runtime.esm-bundler.js'）导入
        'vue/require-component-is': 'error', // component标签必须有is属性，而且必须是变量
        'vue/require-prop-type-constructor': 'error', // props中的变量必须声明类型
        'vue/require-render-return': 'error', // render方法必须返回内容
        'vue/require-slots-as-functions': 'error', // 在vue3中必须使用this.$slots.xx()来访问slots数组
        'vue/require-toggle-inside-transition': 'error', // transition标签中必须存在v-if或v-show
        'vue/require-v-for-key': 'error', // 使用v-for指令的标签必须有key属性
        'vue/require-valid-default-prop': 'error', // props的默认值类型必须匹配声明的类型
        'vue/return-in-computed-property': 'error', // computed中必须有return值
        'vue/use-v-on-exact': 'error', // 强制要求在使用 v-on 监听键盘事件时，必须明确指定 .exact 修饰符来精确匹配按键组合
        'vue/attribute-hyphenation': 'error', // 标签上使用属性时，属性名必须是-连接的形式
        'vue/component-definition-name-casing': 'error', // 组件注册时，名字必须是首字母大写的驼峰命名，例如MyDialog
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never', // 单行标签的闭合括号不换行
                multiline: 'always', // 多行标签的闭合括号必须换行
            },
        ],
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always',
            },
        ], // 自闭标签的/>前必须有一个空格
        'vue/html-end-tags': 'error', // 成对的 html 元素必须有关闭标签
        'vue/html-quotes': ['error', 'double', { avoidEscape: true }], // 属性尽量使用双引号，除非属性的内容包含双引号，此时的话可以用单引号
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ], // html单个的标签必须自关闭， html成对的标签无需自关闭，自定义组件无包裹内容时必须自关闭
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 5,
                },
                multiline: {
                    max: 1,
                },
            },
        ], // 单行标签最多5个属性，多行标签每行最多1个属性
        'vue/no-template-shadow': 'error', // 禁止在v-for和scope中声明和父级作用域中同名的变量
        'vue/prop-name-casing': ['error', 'camelCase'], // props的变量命名必须是驼峰
        'vue/require-default-prop': 'error', // props的声明，必须是required或有default值
        'vue/require-explicit-emits': 'error', // 禁止使用未声明的emits事件
        'vue/require-prop-types': 'error', // props中的变量必须声明类型
        'vue/v-bind-style': 'error', // v-bind时使用:简写
        'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }], // v-on时监听的事件名必须用-相连
        'vue/v-slot-style': 'error', // 必须使用#代替v-slot，并且仅有默认插槽时无需声明#default
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION', // is、v-is
                    'LIST_RENDERING', // v-for
                    'CONDITIONALS', // v-if、v-else-if、v-show、v-cloak
                    'RENDER_MODIFIERS', // v-once、v-pre
                    'GLOBAL', // id、class这些
                    'UNIQUE', // ref、key
                    'SLOT', // slot、v-slot
                    'TWO_WAY_BINDING', // v-model
                    'OTHER_DIRECTIVES', // v-custom-directive
                    'OTHER_ATTR', // custom-prop、v-bind:prop、:prop
                    'EVENTS', // @event，v-on:event
                    'CONTENT', // v-html、v-text
                ],
                alphabetical: false,
            },
        ], // 必须按顺序写html属性
        'vue/block-order': [
            'error',
            {
                order: ['template', 'script', 'style'],
            },
        ], // 必须按照template、script、style的顺序写.vue文件
        'vue/no-v-html': 'error', // 禁用v-html指令
        'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }], // 组件使用时必须是-连接
        'vue/custom-event-name-casing': ['error', 'kebab-case'], // 声明事件时，使用-连接的形式
        'vue/define-emits-declaration': 'error', // 使用emit时必须声明类型
        'vue/define-macros-order': [
            'error',
            {
                order: ['defineProps', 'defineEmits'],
            },
        ], // 先写defineProps，再写defineEmits，并且这两个属性应该在最前头声明
        'vue/define-props-declaration': ['error', 'runtime'], // defineProps必须用runtime的形式写
        'vue/padding-line-between-blocks': 'error', // 在template、script、style之间，要有一行空行
        'vue/require-prop-comment': [
            'error',
            {
                type: 'any',
            },
        ], // props的变量必须有注释
        'vue/no-unused-properties': [
            'error',
            {
                groups: ['props', 'data', 'computed', 'methods', 'setup'],
                deepData: false, // 是否深度搜素data中为使用的变量，默认为false
                ignorePublicMembers: true, // 是否忽略公共成员 可以在方法或者变量上面加入这个注释标识 /** @public */
                unreferencedOptions: [], // 可以设置两个值 ['unknownMemberAsUnreferenced','returnAsUnreferenced']，默认为[]
            },
        ], // 对未使用的属性报错提示

        // 以下规则是针对vue的一些校验，一般正常写都不会触发这里的错误
        'vue/valid-attribute-name': 'error', // 强制要求 Vue 模板中的自定义属性名称必须符合 HTML 规范
        'vue/valid-define-emits': 'error', // 验证 Vue 3 的 defineEmits 函数的使用是否合法
        'vue/valid-define-props': 'error',
        'vue/valid-next-tick': 'error',
        'vue/valid-template-root': 'error',
        'vue/valid-v-bind': 'error',
        'vue/valid-v-cloak': 'error',
        'vue/valid-v-else-if': 'error',
        'vue/valid-v-else': 'error',
        'vue/valid-v-for': 'error',
        'vue/valid-v-html': 'error',
        'vue/valid-v-if': 'error',
        'vue/valid-v-is': 'error',
        'vue/valid-v-memo': 'error',
        'vue/valid-v-model': 'error',
        'vue/valid-v-on': 'error',
        'vue/valid-v-once': 'error',
        'vue/valid-v-pre': 'error',
        'vue/valid-v-show': 'error',
        'vue/valid-v-slot': 'error',
        'vue/valid-v-text': 'error',

        // 以下规则是针对vue3已废弃的api做限制
        'vue/no-deprecated-destroyed-lifecycle': 'error', // 禁止在vue3中使用 destroyed 和 beforeDestroy，已被vue3废弃
        'vue/no-deprecated-dollar-listeners-api': 'error', // 禁止使用$listeners，已被vue3废弃
        'vue/no-deprecated-dollar-scopedslots-api': 'error', // 禁止使用$scopedSlots，已被vue3废弃
        'vue/no-deprecated-events-api': 'error', // 禁止使用$on, $off 和 $once，已被vue3废弃
        'vue/no-deprecated-filter': 'error', // 禁止使用filter，已被vue3废弃
        'vue/no-deprecated-functional-template': 'error', // 禁止在template使用functional属性，已被vue3废弃
        'vue/no-deprecated-inline-template': 'error', // 禁止在组件上使用inline-template属性，已被vue3废弃
        'vue/no-deprecated-scope-attribute': 'error', // 禁止在template上使用scope属性，已被vue3废弃
        'vue/no-deprecated-vue-config-keycodes': 'error', // 禁止使用Vue.config.keyCodes，已被vue3废弃
        'vue/no-deprecated-v-bind-sync': 'error', // 禁止在v-bind上使用.sync修饰符，已被vue3废弃
        'vue/no-deprecated-v-is': 'error', // 禁止使用v-is指令，已被vue3废弃
        'vue/no-deprecated-v-on-native-modifier': 'error', // 禁止使用.native修饰符，已被vue3废弃
        'vue/no-deprecated-v-on-number-modifiers': 'error', // 禁止在v-on上使用.number修饰符，除非是0-9这几个按键，已被vue3废弃
        'vue/no-deprecated-router-link-tag-prop': 'error', // 禁止在router-link上使用tag属性，已被vue3废弃
    }
}
```



#### vue2规则示例

```javascript
module.exports = {
    rules: {
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index', 'main']
            }
        ], // 组件名称必须是两个以上的单词组合，除了index.vue和main.vue是例外
        'vue/no-arrow-functions-in-watch': 'error', // 禁止在watch上使用箭头函数
        'vue/no-async-in-computed-properties': 'error', // 禁止在computed中存在任何异步代码，例如requestAnimationFrame、await，setTimeout、setInterval、fetch、Promise
        'vue/no-child-content': 'error', // 禁止在使用了v-html/v-text的元素上包裹任何子元素
        'vue/no-computed-properties-in-data': 'error', // 禁止在data(){}中访问computed的变量
        'vue/no-custom-modifiers-on-v-model': 'error', // 禁止在v-model上使用自定义的修饰符
        'vue/no-dupe-keys': 'error', // 禁止重复声明props、computed、data、methods中的值
        'vue/no-dupe-v-else-if': 'error', // 禁止在同一组if-else中使用重复的条件判别式
        'vue/no-duplicate-attributes': 'error', // 禁止在html的元素中声明重复的属性
        'vue/no-multiple-template-root': 'error', // 根template元素，只能有一个子元素
        'vue/no-mutating-props': 'error', // 禁止对props传入的变量再赋值
        'vue/no-parsing-error': 'error', // 禁止在template中使用不可解析的语法
        'vue/no-reserved-component-names': 'error', // 禁止使用原生html的标签作为自定义组件名
        'vue/no-reserved-keys': 'error', // 禁止声明和vue关键字一致的变量
        'vue/no-reserved-props': 'error', // 禁止在props中声明和vue关键字一致的变量
        'vue/no-shared-component-data': 'error', // data选项必须是函数
        'vue/no-side-effects-in-computed-properties': 'error', // 禁止在computed中出现赋值行为
        'vue/no-template-key': 'error', // tempalte只有在v-for的时候才可以有key属性
        'vue/no-textarea-mustache': 'error', // 禁止在textarea标签中包裹其他内容
        'vue/no-unused-components': 'error', // 禁止声明未使用的组件
        'vue/no-unused-vars': [
            'error',
            {
                ignorePattern: '^_'
            }
        ], // 禁止声明未使用的变量，除非是以_开头
        'vue/no-use-computed-property-like-method': 'error', // 禁止把computed当函数使用
        'vue/no-use-v-if-with-v-for': 'error', // 禁止同时使用v-if和v-for
        'vue/no-useless-template-attributes': 'error', // 禁止在template上声明无用的属性
        'vue/no-v-model-argument': 'error', // 禁止在v-model上传入参数
        'vue/no-v-text-v-html-on-component': 'error', // 禁止在自定义组件上使用v-text和v-html
        'vue/require-component-is': 'error', // component标签必须有is属性，而且必须是变量
        'vue/require-prop-type-constructor': 'error', // props中的变量必须声明类型
        'vue/require-render-return': 'error', // render方法必须返回内容
        'vue/require-v-for-key': 'error', // 使用v-for指令的标签必须有key属性
        'vue/require-valid-default-prop': 'error', // props的默认值类型必须匹配声明的类型
        'vue/return-in-computed-property': 'error', // computed中必须有return值
        'vue/use-v-on-exact': 'error', // 存在另一个带修饰符的v-on时，必须使用exact修饰符来注明当前v-on的作用范围
        'vue/attribute-hyphenation': 'error', // 标签上使用属性时，属性名必须是-连接的形式
        'vue/component-definition-name-casing': 'error', // 组件注册时，名字必须是首字母大写的驼峰命名，例如MyDialog
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always'
            }
        ], // 标签的关闭/>必须另起一行
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always'
            }
        ], // 自闭标签的/>前必须有一个空格
        'vue/html-end-tags': 'error', // 成对的 html 元素必须有关闭标签
        'vue/html-quotes': ['error', 'double', { avoidEscape: true }], // 属性尽量使用双引号，除非属性的内容包含双引号，此时的话可以用单引号
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ], // html单个的标签必须自关闭， html成对的标签无需自关闭，自定义组件无包裹内容时必须自关闭
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 5
                },
                multiline: {
                    max: 1
                }
            }
        ], // 单行标签最多5个属性，多行标签每行最多1个属性
        'vue/no-template-shadow': 'error', // 禁止在v-for和scope中声明和父级作用域中同名的变量
        'vue/prop-name-casing': ['error', 'camelCase'], // props的变量命名必须是驼峰
        'vue/require-default-prop': 'error', // props的声明，必须是required或有default值
        'vue/require-prop-types': 'error', // props中的变量必须声明类型
        'vue/v-bind-style': 'error', // v-bind时使用:简写
        'vue/v-slot-style': 'error', // 必须使用#代替v-slot，并且仅有默认插槽时无需声明#default
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION', // is、v-is
                    'LIST_RENDERING', // v-for
                    'CONDITIONALS', // v-if、v-else-if、v-show、v-cloak
                    'RENDER_MODIFIERS', // v-once、v-pre
                    'GLOBAL', // id、class这些
                    'UNIQUE', // ref、key
                    'SLOT', // slot、v-slot
                    'TWO_WAY_BINDING', // v-model
                    'OTHER_DIRECTIVES', // v-custom-directive
                    'OTHER_ATTR', // custom-prop、v-bind:prop、:prop
                    'EVENTS', // @event，v-on:event
                    'CONTENT' // v-html、v-text
                ],
                alphabetical: false
            }
        ], // 必须按顺序写html属性
        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style']
            }
        ], // 必须按照template、script、style的顺序写.vue文件
        'vue/no-v-html': 'error', // 禁用v-html指令
        'vue/component-name-in-template-casing': [
            'error',
            'kebab-case',
            { registeredComponentsOnly: false }
        ], // 组件使用时必须是-连接
        'vue/custom-event-name-casing': ['error', 'kebab-case'], // 声明事件时，使用-连接的形式
        'vue/padding-line-between-blocks': 'error', // 在template、script、style之间，要有一行空行
        'vue/require-prop-comment': [
            'error',
            {
                type: 'any'
            }
        ], // props的变量必须有注释
        "vue/no-unused-properties": ["error", {
            "groups": ["props", "data", "computed", "methods", "setup"],
            "deepData": false, // 是否深度搜素data中为使用的变量，默认为false
            "ignorePublicMembers": true, // 是否忽略公共成员 可以在方法或者变量上面加入这个注释标识 /** @public */
            "unreferencedOptions": [] // 可以设置两个值 ['unknownMemberAsUnreferenced','returnAsUnreferenced']，默认为[]
        }], // 对未使用的属性报错提示

        // 以下规则是针对vue的一些校验，一般正常写都不会触发这里的错误
        'vue/valid-attribute-name': 'error',
        'vue/valid-define-emits': 'error',
        'vue/valid-define-props': 'error',
        'vue/valid-next-tick': 'error',
        'vue/valid-template-root': 'error',
        'vue/valid-v-bind': 'error',
        'vue/valid-v-cloak': 'error',
        'vue/valid-v-else-if': 'error',
        'vue/valid-v-else': 'error',
        'vue/valid-v-for': 'error',
        'vue/valid-v-html': 'error',
        'vue/valid-v-if': 'error',
        'vue/valid-v-is': 'error',
        'vue/valid-v-memo': 'error',
        'vue/valid-v-model': 'error',
        'vue/valid-v-on': 'error',
        'vue/valid-v-once': 'error',
        'vue/valid-v-pre': 'error',
        'vue/valid-v-show': 'error',
        'vue/valid-v-slot': 'error',
        'vue/valid-v-text': 'error',
        'vue/valid-model-definition': 'error',
        'vue/valid-v-bind-sync': 'error',
    }
}
```


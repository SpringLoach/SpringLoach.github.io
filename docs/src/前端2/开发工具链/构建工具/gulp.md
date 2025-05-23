## 介绍

假设自己编写了一个 `.less` 文件，想把它应用到模板中。需要进行转化为css、压缩、指定命名并放在特点目录等步骤。使用 <span style="color: #a50">gulp</span>，就可以将这些步骤/任务自动化，解放双手。



## 项目中引入gulp

<span style="color: #3a84aa">全局安装 gulp 命令行工具</span>

```elm
npm install --global gulp-cli
```

<span style="color: #3a84aa">创建项目目录并进入</span>

```elm
npx mkdirp my-project
```

```elm
cd my-project
```

<span style="color: #3a84aa">在项目目录下创建 package.json 文件</span>

```elm
npm init -y
```

<span style="color: #3a84aa">安装 gulp，作为开发时依赖项</span>

```elm
npm install --save-dev gulp
```

```elm
gulp --version
```



## 示例一

<span style="color: #3a84aa">情景</span>

这是一个组件文档项目使用的配置，样式和组件分离，样式分为组件样式和出口样式，出口样式负责导出所有的组件样式，这样可以在使用该三方库时实现使用样式按需/全部导入。

gulp 负责将这些样式文件转化格式、适配、压缩后转移到新目录中。

```elm
- src
  + components
    - ...
  + styles
    - components  // 组件样式
      - ...styl
    - index.styl  // 统一导出所有组件样式
```

<span style="color: #3a84aa">依赖安装</span>

```elm
npm install gulp-stylus gulp-autoprefixer gulp-cssmin rimraf -D -S
```

### 文件配置

<span style="background: #efe0b9"><root\>/build/gulpfile.js</span>

```javascript
'use strict'
// 单独打包css
const { src, dest, series, task } = require('gulp')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

// 打包默认的
function compile() {
  return src('../src/styles/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(cssmin())
    .pipe(dest('../lib/styles'))
}

// 打包组件样式
function compileComponents() {
  return src('../src/styles/components/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(cssmin())
    .pipe(dest('../lib/styles/components'))
}

// 复制字体包
function copyFont() {
  return src('../src/styles/fonts/**')
    .pipe(cssmin())
    .pipe(dest('../lib/styles/fonts'))
}

// 过去使用这个api定义项目
// task('default', series(compile, compileComponents))

// 现在推荐直接导出
exports.default = series(compile, compileComponents)
```

<span style="color: #f7534f;font-weight:600">gulp.task</span> 在任务系统中定义任务，可以对任务进行命名；

<span style="color: #f7534f;font-weight:600">gulp.src()</span> 创建一个流，用于从文件系统读取 [Vinyl](https://www.gulpjs.com.cn/docs/api/concepts#vinyl) 对象；

<span style="color: #f7534f;font-weight:600">gulp.dest()</span> 创建一个用于将 [Vinyl](https://www.gulpjs.com.cn/docs/api/concepts#vinyl) 对象写入到文件系统的流；

<span style="color: #f7534f;font-weight:600">gulp.series()</span> 将任务函数组合，这些操作将按顺序依次执行；

<span style="color: #f7534f;font-weight:600">.pipe()</span> 通常并放在 `src()` 和 `dest()` 之间，配合插件更改流；

:turtle: glob 是由普通字符和/或通配字符组成的字符串，作为src/dest参数匹配文件路径。

### 脚本配置

<span style="background: #efe0b9">package.json</span>

```json
"scripts": {
  "clean-lib": "rimraf lib",
  "build:style": "gulp --gulpfile ./build/gulpfile.js",
},
```

### 拓展-插件

插件 本质是 Node 转换流，可以更改经过流的每个文件的文件名、元数据或文件内容；

每个插件应当只完成必要的工作，故可以把它们组合使用；

插件应当总是用来<span style="color: #ff0000">转换文件</span>的，其他操作都应该使用（非插件的） Node 模块或库来实现。



## 示例二

**增加混淆和加密**
> 当作脚本加载可以解析

```javascript
const { series, src, dest } = require('gulp');
const gulpUglify  = require('gulp-uglify')
const javascriptObfuscator = require('gulp-javascript-obfuscator');

function handleJS() {
    return src('src/**/*.js')
        .pipe(gulpUglify())
        .pipe(javascriptObfuscator())
        .pipe(dest('dist'));
}

exports.default = series(handleJS);
```





## 附录

<span style="color: #3a84aa">参考</span>

- [bin-datav](https://github.com/wangbin3162/bin-datav)

- [gulp中文文档](https://www.gulpjs.com.cn/docs/api/concepts/#vinyl)




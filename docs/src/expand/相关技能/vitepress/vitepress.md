## 基础

### 配置code区块颜色

1.按[文档教程](https://vitepress.dev/zh/guide/getting-started)启动项目：



2.配置[markdown](https://vitepress.dev/zh/reference/site-config#markdown)中的[选项](https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts)theme，可以配置通用，或是光/暗两种主题：

```javascript
// config.mts
export default defineConfig({
  ...
  markdown: {
    theme: 'github-dark'
  }
})
```



3.我想要在光主题下，也能展示暗风格的代码，可以通过[扩展默认主题](https://vitepress.dev/zh/guide/extending-default-theme)修改 [主题CSS变量](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css) ，只需这样操作：

> 通过覆盖根级别的 CSS 变量来自定义默认主题的 CSS

```javascript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
/* .vitepress/theme/custom.css */
:root {
  --vp-code-block-bg: #161618;
}
```



### 其他功能汇总

| 功能                                                         | 相关链接                                                     | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 设置源目录                                                   | [链接一](https://vitepress.dev/zh/guide/routing#source-directory) | 存放`.md`文件的目录                                          |
| 启用搜索                                                     | [链接一](https://vitepress.dev/zh/reference/default-theme-search) |                                                              |
| 配置上/下一页[文案](https://vitepress.dev/zh/reference/default-theme-config#docfooter) | [链接一](https://vitepress.dev/zh/reference/default-theme-config#docfooter) |                                                              |
| 设置大纲层级显示、标题展示                                   | [链接一](https://vitepress.dev/zh/reference/default-theme-config#outline) | 通过 `level: 'deep'` 开启层级结构，默认展示多层              |
| 设置多侧边栏                                                 | [链接一](https://vitepress.dev/zh/reference/default-theme-sidebar#multiple-sidebars) | 可以结合[导航链接](https://vitepress.dev/zh/reference/default-theme-nav#navigation-links)使用 |
| 部署 GitHub Pages                                            | [链接一](https://vitepress.dev/zh/guide/deploy#github-pages) | 推送代码自动打包部署                                         |

部署 GitHub Pages 配置![](https://raw.githubusercontent.com/SpringLoach/img_store/main/img/[vitepress]部署github.png)





## 高级

### xx语言不能高亮

可以先将这部分语言[指定为其他可正常高亮语言](https://github.com/vuejs/vitepress/issues/3259)

```javascript
// .vitepress/config.ts

export default defineConfig({
  markdown: {
    languageAlias: {
      'svg': 'html'
    }
  }
})
```



### 右上角自定义svg适配光暗

将找到的 svg 代码中的 `fill` 属性删除


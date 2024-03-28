import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "power",
  description: "Accumulate Steadily",
  srcDir: 'src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/computed' },
      { text: 'Business', link: '/business/common' },
      {
        text: '前端',
        items: [
          { text: '方法梳理', link: '/前端/方法梳理/原生部分/日期处理' },
          { text: '素养基石', link: '/前端/素养基石/网络/axios' },
          { text: '原生技术', link: '/前端/原生技术/Json/json' },
        ]
      },
      { text: '编程相关', link: '/expand/初始配置/计算机环境配置' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'computed', link: '/guide/computed' },
            { text: 'Markdown Examples', link: '/guide/markdown-examples' },
            { text: 'vitepress', link: '/guide/vitepress' },
            { text: 'ES Next', link: '/guide/ES Next' },
            { text: 'nvm', link: '/guide/nvm' },
            { text: 'elementUI', link: '/guide/elementUI' },
            { text: 'viewer.js', link: '/guide/viewer.js' },
            { text: '样式', link: '/guide/样式' },
            { text: 'vant', link: '/guide/vant' },
            { text: '微信小程序', link: '/guide/微信小程序' },
            { text: '待整理', link: '/guide/待整理' },
            { text: 'test', link: '/guide/test' },
          ]
        }
      ],
      '/business/': [
        {
          text: 'Business',
          items: [
            { text: 'common', link: '/business/common' },
            { text: 'h5', link: '/business/h5' },
            { text: '小程序', link: '/business/小程序' },
            { text: 'erp', link: '/business/erp' },
            { text: 'web', link: '/business/web' },
            { text: '官网', link: '/business/官网' },
            { text: '构建', link: '/business/构建' },
          ]
        }
      ],
      '/expand/': [
        {
          text: '初始配置',
          items: [
            { text: '计算机环境配置', link: '/expand/初始配置/计算机环境配置' },
          ]
        },
        {
          text: '相关技能',
          items: [
            { 
              text: 'git',
              items: [
                { text: '速查', link: '/expand/相关技能/git/速查' },
                { text: 'git学习', link: '/expand/相关技能/git/git学习/git学习' },
                { text: 'git学习2', link: '/expand/相关技能/git/git学习/git学习2' },
                { text: 'git学习3', link: '/expand/相关技能/git/git学习/git学习3' },
              ]
            },
            { 
              text: 'markdown', 
              items: [
                { text: '风格规范', link: '/expand/相关技能/markdown/风格规范' },
                { text: 'markdown', link: '/expand/相关技能/markdown/markdown' },
              ]
            },
            { text: 'svn', link: '/expand/相关技能/svn/SVN' },
            { text: 'xmind', link: '/expand/相关技能/xmind/xmind' },
          ]
        }
      ],
      '/前端/': [
        {
          text: '方法梳理',
          collapsed: true,
          items: [
            { 
              text: '原生部分',
              collapsed: true,
              items: [
                { text: '表单相关', link: '/前端/方法梳理/原生部分/表单相关' },
                { text: '格式转换', link: '/前端/方法梳理/原生部分/格式转换' },
                { text: '环境相关', link: '/前端/方法梳理/原生部分/环境相关' },
                { text: '路由缓存', link: '/前端/方法梳理/原生部分/路由缓存' },
                { text: '全局相关', link: '/前端/方法梳理/原生部分/全局相关' },
                { text: '日期处理', link: '/前端/方法梳理/原生部分/日期处理' },
                { text: '数字格式化', link: '/前端/方法梳理/原生部分/数字格式化' },
                { text: '正则校验', link: '/前端/方法梳理/原生部分/正则校验' },
                { text: '正则语法', link: '/前端/方法梳理/原生部分/正则语法' },
                { text: '字符串相关', link: '/前端/方法梳理/原生部分/字符串相关' },
              ]
            },
            { 
              text: '依赖三方',
              collapsed: true,
              items: [
                { text: '导出PDF', link: '/前端/方法梳理/依赖三方/导出PDF' },
                { text: '国际化', link: '/前端/方法梳理/依赖三方/国际化' },
                { text: '海报二维码', link: '/前端/方法梳理/依赖三方/海报二维码' },
                { text: '缓存方案', link: '/前端/方法梳理/依赖三方/缓存方案' },
                { text: '导出表格', link: '/前端/方法梳理/依赖三方/导出excel/导出表格' },
              ]
            },
          ]
        },
        {
          text: '素养基石',
          collapsed: true,
          items: [
            { 
              text: '数据结构与算法',
              collapsed: true,
              items: [
                { text: 'section1', link: '/前端/素养基石/数据结构与算法/section1' },
                { text: 'section2', link: '/前端/素养基石/数据结构与算法/section2' },
                { text: 'section3', link: '/前端/素养基石/数据结构与算法/section3' },
                { text: 'section4', link: '/前端/素养基石/数据结构与算法/section4' },
                { text: 'section5', link: '/前端/素养基石/数据结构与算法/section5' },
                { text: 'section6', link: '/前端/素养基石/数据结构与算法/section6' },
                { text: 'section7', link: '/前端/素养基石/数据结构与算法/section7' },
                { text: 'section8', link: '/前端/素养基石/数据结构与算法/section8' },
                { text: 'section9', link: '/前端/素养基石/数据结构与算法/section9' },
                { text: 'section10', link: '/前端/素养基石/数据结构与算法/section10' },
                { text: 'section11', link: '/前端/素养基石/数据结构与算法/section11' },
                { text: 'section12', link: '/前端/素养基石/数据结构与算法/section12' },
                { text: '数组相关', link: '/前端/素养基石/数据结构与算法/数组相关' },
                { text: '项目栗子', link: '/前端/素养基石/数据结构与算法/项目栗子' },
              ]
            },
            { 
              text: '网络',
              collapsed: true,
              items: [
                { text: 'axios', link: '/前端/素养基石/网络/axios' },
                { text: '路径处理', link: '/前端/素养基石/网络/路径处理' },
                { text: '网络协议', link: '/前端/素养基石/网络/网络协议' },
              ]
            },
          ]
        },
        {
          text: '原生技术',
          collapsed: true,
          items: [
            { 
              text: 'css',
              collapsed: true,
              items: [
                { text: '图片', link: '/前端/原生技术/css/媒体相关/图片' },
                { text: '功能总结', link: '/前端/原生技术/css/样式相关/功能总结' },
                { text: '兼容性', link: '/前端/原生技术/css/样式相关/兼容性' },
                { text: '示例', link: '/前端/原生技术/css/样式相关/示例' },
                { text: '疑难杂症', link: '/前端/原生技术/css/样式相关/疑难杂症' },
                { text: '预处理器', link: '/前端/原生技术/css/原笔记/知识整理/预处理器' },
                { text: 'html', link: '/前端/原生技术/css/原笔记/知识整理/html' },
                { text: '布局', link: '/前端/原生技术/css/原笔记/布局' },
                { text: '导航栏', link: '/前端/原生技术/css/原笔记/导航栏' },
                { text: '动画', link: '/前端/原生技术/css/原笔记/动画' },
                { text: '动画库', link: '/前端/原生技术/css/原笔记/动画库' },
                { text: '对齐', link: '/前端/原生技术/css/原笔记/对齐' },
                { text: '功能集结', link: '/前端/原生技术/css/原笔记/功能集结' },
                { text: '媒体查询', link: '/前端/原生技术/css/原笔记/媒体查询' },
                { text: '响应式布局', link: '/前端/原生技术/css/原笔记/响应式布局' },
                { text: '样式速查表', link: '/前端/原生技术/css/原笔记/样式速查表' },
                { text: '组合器', link: '/前端/原生技术/css/原笔记/组合器' },
                { text: 'html-速查', link: '/前端/原生技术/css/原笔记/html-速查' },
              ]
            },
            { 
              text: 'Json',
              collapsed: true,
              items: [
                { text: 'Json', link: '/前端/原生技术/Json/json' },
              ]
            },
            { 
              text: 'TypeScript',
              collapsed: true,
              items: [
                { text: '实践-vue', link: '/前端/原生技术/TypeScript/应用/实践-vue' },
                { text: '快速入门', link: '/前端/原生技术/TypeScript/快速入门' },
                { text: '配置(旧)', link: '/前端/原生技术/TypeScript/配置(旧)' },
                { text: '入门(旧文档)', link: '/前端/原生技术/TypeScript/入门(旧文档)' },
              ]
            },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: 'deep',
      label: '页面导航'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  },

  markdown: {
    // theme: 'github-dark'
  }
})

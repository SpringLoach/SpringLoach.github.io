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
      { text: 'Business', link: '/business/test' },
      {
        text: '前端',
        items: [
          { text: '素养基石', link: '/前端/素养基石/数据结构与算法/section2' },
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
          ]
        }
      ],
      '/business/': [
        {
          text: 'Business',
          items: [
            { text: 'test', link: '/business/test' },
            { text: 'h5', link: '/business/h5' },
            { text: 'erp', link: '/business/erp' }
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
          text: '素养基石',
          items: [
            { 
              text: '数据结构与算法',
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
          ]
        },
        {
          text: '原生技术',
          items: [
            { 
              text: 'Json',
              items: [
                { text: 'Json', link: '/前端/原生技术/Json/json' },
              ]
            },
            { 
              text: 'TypeScript',
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

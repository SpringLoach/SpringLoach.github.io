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

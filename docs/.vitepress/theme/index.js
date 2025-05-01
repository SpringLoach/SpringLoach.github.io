import DefaultTheme from 'vitepress/theme'
import './custom.css'

// export default DefaultTheme

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
      if (typeof window !== 'undefined') {
        // 默认设置为深色模式
        // localStorage.setItem('vitepress-theme-appearance', 'dark')
      }
    }
  }
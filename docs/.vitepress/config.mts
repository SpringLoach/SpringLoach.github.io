import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "master",
  description: "Accumulate Steadily",
  srcDir: 'src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '业务', link: '/business/computed' },
      {
        text: '前端',
        items: [
          { text: '方法梳理', link: '/前端/方法梳理/原生部分/日期处理' },
          { text: '素养基石', link: '/前端/素养基石/网络/axios' },
          { text: '原生技术', link: '/前端/原生技术/css/样式相关/功能总结' },
        ]
      },
      { 
        text: '技术框架',
        items: [
          { text: '代码规范', link: '/前端2/代码规范/代码规范'},
          { text: '技术框架', link: '/前端2/技术框架/微信小程序/微信小程序' },
          { text: 'UI框架', link: '/前端2/UI框架/Element-UI/elementUI' },
          { text: '第三方库', link: '/前端2/第三方库/viewer.js/viewer.js' },
          { text: '文档参考', link: '/前端2/文档参考' },
        ]
      },
      { text: '其他', link: '/expand/初始配置/计算机环境配置' },
      { text: '开发账号', link: '/business/开发账号' }
    ],

    sidebar: {
      '/business/': [
        {
          text: 'Business',
          items: [
            { text: 'computed', link: '/business/computed' },
            { text: 'h5', link: '/business/h5' },
            { text: 'wap', link: '/business/wap' },
            { text: '小程序', link: '/business/小程序' },
            { text: 'erp', link: '/business/erp' },
            { text: 'web', link: '/business/web' },
            { text: 'jingjiangbang-pc', link: '/business/jingjiangbang-pc' },
            { text: 'nuxt', link: '/business/nuxt' },
            { text: '官网', link: '/business/官网' },
            { text: '通用', link: '/business/通用' },
            { text: '开发账号', link: '/business/开发账号' },
            { text: '构建', link: '/business/构建' },
          ]
        }
      ],
      '/前端/': [
        {
          text: '方法梳理',
          collapsed: true,
          items: [
            { 
              text: '汇总',
              link: '/前端/方法梳理/汇总'
            },
            { 
              text: '原生部分',
              collapsed: true,
              items: [
                { text: '格式转换', link: '/前端/方法梳理/原生部分/格式转换' },
                { text: '环境相关', link: '/前端/方法梳理/原生部分/环境相关' },
                { text: '路由缓存', link: '/前端/方法梳理/原生部分/路由缓存' },
                { text: '全局相关', link: '/前端/方法梳理/原生部分/全局相关' },
                { text: '日期处理', link: '/前端/方法梳理/原生部分/日期处理' },
                { text: '数字格式化', link: '/前端/方法梳理/原生部分/数字格式化' },
                { text: '正则校验', link: '/前端/方法梳理/原生部分/正则校验' },
                { text: '正则语法', link: '/前端/方法梳理/原生部分/正则语法' },
                { text: '字符串相关', link: '/前端/方法梳理/原生部分/字符串相关' },
                { text: '其它', link: '/前端/方法梳理/原生部分/其它' },
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
                { text: '数值计算', link: '/前端/方法梳理/依赖三方/数值计算' },
                { text: '其它', link: '/前端/方法梳理/依赖三方/其它' },
              ]
            },
            {
              text: '业务实现',
              collapsed: true,
              items: [
                { text: '兼容性', link: '/前端/业务实现/兼容性' },
                { text: 'vue', link: '/前端/业务实现/vue' },
                { text: '界面', link: '/前端/业务实现/界面' },
                { text: 'dom', link: '/前端/业务实现/dom' },
                { text: '接口对接', link: '/前端/业务实现/接口对接' },
                { text: '第三方对接', link: '/前端/业务实现/第三方对接' },
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
                { text: '初始化样式', link: '/前端/原生技术/css/样式相关/初始化样式' },
                { text: '布局问题', link: '/前端/原生技术/css/样式相关/布局问题' },
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
              text: 'JavaScript',
              collapsed: true,
              items: [
                { text: '常用方法速查', link: '/前端/原生技术/javascript/常用方法速查' },
                { text: '常见场景整理', link: '/前端/原生技术/javascript/常见场景整理' },
                { text: 'ES Next', link: '/前端/原生技术/javascript/功能相关/ES Next' },
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
      ],
      '/前端2/': [
        {
          text: '代码规范',
          collapsed: true,
          items: [
            {  text: '代码规范', link: '/前端2/代码规范/代码规范' },
            {  text: '兼容性', link: '/前端2/代码规范/兼容性' },
            {  text: '性能优化', link: '/前端2/代码规范/性能优化' },
            {  text: '安全性', link: '/前端2/代码规范/安全性' },
          ]
        },
        {
          text: '技术框架',
          collapsed: true,
          items: [
            { 
              text: 'React',
              collapsed: true,
              items: [
                { text: 'HOOK.md', link: '/前端2/技术框架/React技术栈/React/HOOK.md' },
              ]
            },
            { 
              text: 'Vue技术栈',
              collapsed: true,
              items: [
                {
                  text: 'vue2', link: '/前端2/技术框架/Vue技术栈/vue2/知识沉淀' },
                { text: 'vuex', link: '/前端2/技术框架/Vue技术栈/vuex/知识沉淀' },
                { text: 'vue-router', link: '/前端2/技术框架/Vue技术栈/vue-router/知识沉淀' },
                { text: '插件', link: '/前端2/技术框架/Vue技术栈/插件/插件' },
                { 
                  text: 'vue3',
                  collapsed: true,
                  items: [
                    { text: '经验谈', link: '/前端2/技术框架/Vue技术栈/vue3/经验谈' }
                  ]
                }
              ]
            },
            { 
              text: '微信小程序',
              collapsed: true,
              items: [
                { text: '微信小程序', link: '/前端2/技术框架/微信小程序/微信小程序' },
              ]
            },
            {
              text: 'uni-app',
              collapsed: true,
              items: [
                { text: '原生转uni-app', link: '/前端2/技术框架/uni-app/原生转uni-app' },
                { text: '经验谈', link: '/前端2/技术框架/uni-app/经验谈' }
              ]
            }
          ]
        },
        {
          text: 'UI框架',
          collapsed: true,
          items: [
            { 
              text: 'elementUI',
              items: [
                { text: 'elementUI', link: '/前端2/UI框架/Element-UI/elementUI' },
              ]
            },
            { 
              text: 'Element-Plus', link: '/前端2/UI框架/Element-Plus/index' },
            { 
              text: 'vant', link: '/前端2/UI框架/vant/vant' },
          ]
        },
        {
          text: '第三方库',
          collapsed: true,
          items: [
            {  text: 'highlight.js', link: '/前端2/第三方库/highlight.js/highlight.js' },
            {  text: 'viewer.js', link: '/前端2/第三方库/viewer.js/viewer.js' },
            {  text: 'mockjs', link: '/前端2/第三方库/mockjs/mockjs' },
            {  text: 'html2canvas', link: '/前端2/第三方库/html2canvas/html2canvas' },
            {  text: 'swiper', link: '/前端2/第三方库/swiper/swiper' },
            { 
              text: 'ECharts',
              collapsed: true,
              items: [
                {  text: 'base', link: '/前端2/第三方库/ECharts/base' },
                {  text: '基本使用', link: '/前端2/第三方库/ECharts/基本使用' },
                {  text: '南丁格尔图', link: '/前端2/第三方库/ECharts/南丁格尔图' },
                {  text: '直角坐标系', link: '/前端2/第三方库/ECharts/直角坐标系' },
                {  text: '实践', link: '/前端2/第三方库/ECharts/实践' },
              ]
            },
            {  text: 'vconsole', link: '/前端2/第三方库/vconsole' },
            {  text: '阿里云', link: '/前端2/第三方库/阿里云' },
          ]
        },
        { text: '文档参考', link: '/前端2/文档参考' },
      ],
      '/expand/': [
        {
          text: '初始配置',
          collapsed: true,
          items: [
            { text: '计算机环境配置', link: '/expand/初始配置/计算机环境配置' },
            { text: '编写规范', link: '/expand/初始配置/编写规范' },
          ]
        },
        {
          text: '编程相关',
          collapsed: true,
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
                { text: 'markdown', link: '/expand/相关技能/markdown/markdown' },
              ]
            },
            { text: 'svn', link: '/expand/相关技能/svn/SVN' },
            { text: 'xmind', link: '/expand/相关技能/xmind/xmind' },
            { text: 'v2rayN', link: '/expand/相关技能/v2rayN/v2rayN' },
            { text: 'vitepress', link: '/expand/相关技能/vitepress/vitepress' },
            { text: 'PicList', link: '/expand/相关技能/PicList/PicList' },
          ]
        },
        {
          text: '烤冷面',
          collapsed: true,
          items: [
            { text: '待整理', link: '/expand/烤冷面/待整理' },
            { text: '高频知识点', link: '/expand/烤冷面/高频知识点' },
            { text: '核心问题', link: '/expand/烤冷面/核心问题' },
            { text: '总结', link: '/expand/烤冷面/总结' },
          ]
        },
        { text: '风格规范', link: '/expand/风格规范' },
        { text: '拓展知识技巧', link: '/expand/拓展知识技巧' },
        { text: '有兴趣就研究', link: '/expand/有兴趣就研究' },
        { text: 'stone', link: '/expand/stone' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SpringLoach/SpringLoach.github.io' },
      { 
        icon: {
          svg: '<svg t="1717035375440" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1841" width="200" height="200"><path d="M125.3376 645.7856a52.2752 52.2752 0 0 1-5.8368-60.1088c23.296-41.6768 59.0336-90.5728 103.3728-141.4144a20.48 20.48 0 1 0-30.72-26.9312c-32.1536 36.9152-77.1072 92.6208-108.2368 148.48a94.0544 94.0544 0 0 0 10.5472 106.8032 1157.12 1157.12 0 0 0 84.5824 88.9344 20.48 20.48 0 0 0 28.0576-29.9008 1103.8208 1103.8208 0 0 1-81.7664-85.8624zM271.36 786.2272l-8.2944-6.3488a20.48 20.48 0 1 0-25.1904 32.256l8.7552 6.7584a20.48 20.48 0 0 0 24.7296-32.6656zM911.0016 719.5136a379.1872 379.1872 0 0 1-34.6112-119.0912v-0.6144-0.9728a342.1184 342.1184 0 0 1 26.368-171.9296 45.312 45.312 0 0 0-9.8304-49.9712 44.4928 44.4928 0 0 0-49.0496-9.5232C805.2736 384 769.8432 414.208 728.8832 465.92a20.48 20.48 0 1 0 32.1536 25.6c36.4544-46.08 66.9184-72.8064 98.7648-86.3744a3.2256 3.2256 0 0 1 4.0448 0.8704 4.2496 4.2496 0 0 1 1.024 5.12 406.2208 406.2208 0 0 0-26.9312 93.0304 215.552 215.552 0 0 0-100.352 48.4864 20.48 20.48 0 0 0 26.9824 30.72 173.312 173.312 0 0 1 68.9664-36.2496 440.32 440.32 0 0 0 0 35.84l-56.7808 5.12a20.48 20.48 0 0 0 1.792 40.96h1.8944l57.5488-5.12a407.4496 407.4496 0 0 0 12.288 51.9168c-54.272-15.36-85.0944-40.96-85.8112-41.6768a20.48 20.48 0 0 0-26.8288 30.976c1.9968 1.7408 48.3328 40.96 129.6896 56.7808 2.2528 5.12 4.4544 10.24 6.912 15.36l0.6656 1.2288c7.2704 13.0048 12.8 30.72-2.048 42.5472-13.2608 10.24-38.5024 12.1344-53.6064-1.9456-37.632-35.072-90.8288-118.9888-91.392-119.8592a20.48 20.48 0 0 0-17.152-9.5232 20.1216 20.1216 0 0 0-17.3056 9.3184c-0.7168 1.024-68.608 104.0896-171.3152 142.2848a20.48 20.48 0 0 0-4.8128 35.84 386.2528 386.2528 0 0 0 56.6784 33.792c-48.3328 13.9776-137.7792 20.1728-258.9696-55.1424a20.48 20.48 0 0 0-21.6576 34.7648c87.04 54.1696 160.4096 70.2464 216.7296 70.2464 79.7184 0 125.5424-32.2048 128.7168-34.5088a20.48 20.48 0 0 0-6.8608-36.4032 282.112 282.112 0 0 1-59.8016-25.6c65.0752-34.0992 113.0496-86.784 137.472-117.76 19.7632 29.2352 53.6576 76.8 81.92 103.0656a84.9408 84.9408 0 0 0 106.8032 4.1472c21.7088-17.3056 36.5056-50.8928 12.6976-94.2592z" p-id="1842"></path><path d="M234.0864 400.9472a20.48 20.48 0 0 0 28.9792-0.6144C311.296 349.952 357.376 310.1184 386.2016 293.888c47.872-26.9824 166.3488-27.8016 247.3472 11.5712a3.4304 3.4304 0 0 1 1.9968 2.816 3.2768 3.2768 0 0 1-1.4336 3.1232C570.7264 358.4 537.6 376.1664 537.088 376.32a20.48 20.48 0 0 0 0 36.4032c0.9728 0.512 95.7952 49.4592 148.48 133.8368a20.48 20.48 0 0 0 17.3568 9.6256 20.1728 20.1728 0 0 0 10.8544-3.1232 20.48 20.48 0 0 0 6.5024-28.2112C680.96 461.7728 622.2848 417.3824 586.5984 394.24c16.9984-10.8544 40.96-27.0848 71.9872-50.0736a44.4928 44.4928 0 0 0-7.1168-75.6736c-87.04-42.1888-220.16-47.0528-285.3376-10.24C333.4656 276.48 285.1328 318.0544 233.472 372.0192a20.48 20.48 0 0 0 0.6144 28.928zM331.9296 564.8896a62.4128 62.4128 0 1 0-62.3616 62.3616 62.464 62.464 0 0 0 62.3616-62.3616z m-83.8144 0a21.4528 21.4528 0 1 1 21.4528 21.4016 21.504 21.504 0 0 1-21.4528-21.4016zM358.0416 710.1952a302.08 302.08 0 0 1-14.0288 35.84 20.48 20.48 0 0 0 9.8816 27.0848 20.7872 20.7872 0 0 0 8.6528 1.8944 20.48 20.48 0 0 0 18.5856-11.776 346.2144 346.2144 0 0 0 15.9232-40.96 20.48 20.48 0 1 0-39.0144-12.4416zM410.4704 661.504c0.3584-2.8672 0.7168-5.7344 0.9728-8.6528a20.48 20.48 0 1 0-40.96-4.096c-0.256 2.5088-0.5632 5.12-0.8704 7.6288a20.48 20.48 0 0 0 17.7664 22.8864 22.3232 22.3232 0 0 0 2.6112 0 20.48 20.48 0 0 0 20.48-17.7664z" p-id="1843"></path><path d="M366.1824 418.2016a20.48 20.48 0 0 0-35.84 19.6608 412.9792 412.9792 0 0 1 41.472 153.6 20.48 20.48 0 0 0 20.48 19.1488h1.3312a20.48 20.48 0 0 0 18.944-21.8112 446.5664 446.5664 0 0 0-46.3872-170.5984zM201.5232 340.5824a19.2 19.2 0 0 0 5.632 0.8192 20.48 20.48 0 0 0 5.5808-40.192c-28.672-8.192-31.744-16.4352-31.7952-16.4864-0.3072-2.048 4.2496-9.3184 11.52-14.336 17.7664-12.288 50.8416-35.1232 57.856-73.4208 8.96-48.896-37.7344-73.3184-63.744-79.2064a20.48 20.48 0 0 0-9.4208 39.8848c1.536 0.3584 37.0688 9.3184 32.8704 32.1536-3.6352 19.9168-22.9888 34.7648-40.96 47.104-5.6832 3.8912-33.5872 24.832-28.672 54.6816 5.6832 33.1776 47.4112 45.1072 61.1328 48.9984zM436.8896 158.0032c5.4784 0 18.0736 1.792 22.3744 6.8608 0.6144 0.7168 2.4064 2.816 1.4336 9.216a106.3424 106.3424 0 0 1-8.3456 10.752 97.28 97.28 0 0 0-8.8064 11.4688A20.48 20.48 0 0 0 450.56 224.1024a19.8656 19.8656 0 0 0 10.6496 3.072 20.48 20.48 0 0 0 17.5104-9.6256c0.7168-1.0752 3.3792-4.2496 5.12-6.3488 7.4752-8.8576 15.36-18.0224 17.1008-28.5184a51.2 51.2 0 0 0-10.24-44.3392c-18.2784-21.4528-50.7904-21.4016-54.4256-21.2992a20.48 20.48 0 0 0 0.8704 40.96zM293.6832 232.0896a20.48 20.48 0 1 0 26.0096 31.6416c17.4592-14.336 49.8688-40.96 56.32-84.4288C384.6656 124.928 338.7392 97.28 313.2928 90.0096a20.48 20.48 0 0 0-11.2128 39.424c3.9424 1.1776 38.5024 12.2368 33.6384 43.6224-3.8912 25.8048-22.8864 43.3152-42.0352 59.0336z" p-id="1844"></path></svg>'
        },
        link: 'https://huamujing.github.io/' },
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
    // theme: 'dracula'
  }
})

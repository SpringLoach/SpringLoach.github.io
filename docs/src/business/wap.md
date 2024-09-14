### 特殊实现

#### 判断用户是否登录

`wap | app | 小程序`

```
src\views\activitys\9thAnniversary\components\registerReceive\index.vue
```



#### 判断业主/商家

```html
<script>
import { queryUserInfo } from '@/api/mine.js'
export default {
    data() {
        return {
            userInfo: {},
        }
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        async getUserInfo() {
            const res = await queryUserInfo({})
            if (res.code == 200) {
                this.userInfo = res.data
                // this.userInfo.role 0：业主 1：商家
            }
        },
    }
}
</script>
```





#### 跳转到注册页

`wap | app | 小程序`

```
src\views\activitys\9thAnniversary\components\registerReceive\index.vue
```



#### 跳转到登录页并重定向

`wap | app | 小程序`

```
src\views\activitys\9thAnniversary\components\ninthLoginToReceive\index.vue
```



#### 跳转到首页

`wap | app | 小程序`

```html
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isOrderApp']),
    },
    methods: {
        goHome() {
            if (this.isOrderApp) {
                const sendObj = {
                    reqType: 'TO_PAGE',
                    data: {
                        appPage: 11,
                        description: '首页'
                    }
                }
                window.sendAppData(sendObj)
                return
            }
            this.$goPush('/index', '/pages/index/index', true)
        }
    }
}
</script>
```





#### 跳转到活动中心

`wap | app | 小程序`

```
src\views\activitys\9thAnniversary\components\ninthLoginToReceive\index.vue
```



#### 跳转到下单页

`wap | app | 小程序`

```html
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isOrderApp']),
    },
    methods: {
        toOrder() {
            if (!this.isOrderApp) {
                this.$goPush('/index', '/pages/index/index', true)
            } else {
                const sendObj = {
                    reqType: 'TO_PAGE',
                    data: {
                        appPage: 11
                    }
                }
                window.sendAppData(sendObj)
            }
        }
    }
}
</script>
```





#### 跳转到下单/服务分类

`wap | app | 小程序`

```html
<script>
import { mapGetters } from 'vuex'
export default {
    components: {},
    props: {
        //
        userInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters(['isOrderApp']),
    methods: {
        onShow() {
            this.show = true
        },
        handleClickClose() {
            this.show = false
        },
        toOrder() {
            if (!this.isOrderApp) {
                // 平台商家则跳转至下单页面，平台端业主则跳转至服务分类页面
                if (this.userInfo.role == 0) {
                    this.$goPush('/index', '/packageC/pages/categoty/categoty')
                } else {
                    this.$goPush('/index', '/pages/index/index', true)
                }
            } else {
                if (this.userInfo.role == 0) {
                    const sendObj = {
                        reqType: 'TO_PAGE',
                        data: {
                            appPage: 29
                        }
                    }
                    window.sendAppData(sendObj)
                } else {
                    const sendObj = {
                        reqType: 'TO_PAGE',
                        data: {
                            appPage: 11
                        }
                    }
                    window.sendAppData(sendObj)
                }
            }
        }
    }
}
</script>
```





#### 设置曝光/点击埋点

`wap | app | 小程序`

```
src\views\vote\acpage\originality-2024\index.vue
```



#### 监听页面滚动位置

`wap | app | 小程序`

```html
<script>
export default {
    data() {
        return {
            showBtn: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestory() {
        window.removeEventListener('scroll', this.handleScroll)
    },

    methods: {
        handleScroll(e) {
            const value = window.scrollY || window.pageYOffset
            if (value >= 594) {
                this.showBtn = true
            } else {
                this.showBtn = false
            }
        }
    }
}
</script>
```



#### 回到顶部-取巧

`wap | app | 小程序`

```html
<template>
    <div ref="pageRef" class="ac-page">
        ...
    </div>
</template>

<script>
export default {
    methods: {
        scrollToTop() {
            const targetEl = this.$refs.pageRef
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }
}
</script>
```



#### 播放视频

`wap | app | 小程序`

> 见 openVideo

```
src\views\vote\acpage\originality-2024\index.vue
```



#### 播放视频-第三方流量

`wap | app | 小程序`

> 见 ShowVideo

```
src\views\vote\acpage\originality-2024\index.vue
```



#### swiper轮播

`wap | app | 小程序`

> 自动播放、左右箭头切换

```
src\views\vote\acpage\originality-2024\components\previousReview.vue
```



#### 分享

`wap | app | 小程序`

```
src\views\vote\acpage\originality-2024\index.vue
```





### 组件

#### 异形弹窗（居中）

`wap | app | 小程序`

```
activitys\9thAnniversary\components\ninthLoginToReceive\components\loginReceivePop.vue
```


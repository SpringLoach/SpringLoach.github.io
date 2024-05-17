### 权限校验

参考自 RuoYi-Vue3 的 utils/permission.js

```javascript
// 使用pinia保存当前用户权限信息
import useUserStore from '@/store/modules/user'

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermi(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = useUserStore().permissions
    const permissionDatas = value
    const all_permission = "*:*:*";

    const hasPermission = permissions.some(permission => {
      return all_permission === permission || permissionDatas.includes(permission)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`)
    return false
  }
}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useUserStore().roles
    const permissionRoles = value
    const super_admin = "admin";

    const hasRole = roles.some(role => {
      return super_admin === role || permissionRoles.includes(role)
    })

    if (!hasRole) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`)
    return false
  }
}
```



### h5在ios的分享

| 限制     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 跳转限制 | 正常的路由跳转方式，对于安卓来说，其 url 可以直接用于 wx.config 配置 |
| 跳转限制 | 但 ios 不可以，对于需要分享的页面，需要通过 location.href / location.replace 的方式来到 |
| API限制  | 对于分享给好友/分享到朋友圈，需要使用旧的 API                |
| API限制  | 因为在 ios 使用新的 API 时，会出现各种奇怪的配置报错         |
| 分享配置 | 每个需要分享的页面都需要先使用 wx.config 配置，然后在 wx.ready 中初始化相关配置 |
| 分享配置 | 配置路径的处理：1. 要取需要的部分；2.路径中文编码的问题，需要后端配合 |

```javascript
const currentLink = window.location.href.split("#")[0]; // 注意：当前网页的 URL，不包含#及其后面的部分
const { data, err } = await api.getWechatShareConfigs({
  url: encodeURIComponent(currentLink),
});
```



### 生产/开发兼容跳转

生产模式使用 location.href 主要为了解决 ios 的分享问题；但该方法在开发模式行不通

```javascript
if (process.env.NODE_ENV === "production") {
  const donationInfoUrl = `https://${window.location.host}/prm/fr/mobile/index/#/personalCenter`;
  location.href = donationInfoUrl;
} else {
  router.push({ name: 'personalCenter' })
}
```



### 返回列表页保留查询条件

从编辑页返回列表页保留查询条件

1. 跳转到编辑页时，将查询条件保存到路由参数中
2. 从编辑页点击返回时，将路由参数带上，跳转到列表页
3. 在列表页组件的 mounted 钩子中，检查路由是否存在相应参数，有就初始化查询条件



### 设置动态样式值

```html
<template>
    <div>
        <component :is="'style'">
            :root {
                --roll: {{ rollY }};
            }
        </component>
        
        <div class="other-content">...</div>
    </div>
</template>

<script lang="ts" setup>
const topList = ref([])
const rollY = computed(() => {
    if (!topList.value || (topList.value.length <= 6)) {
        return '0'
    }
    return  `-${(topList.value.length - 3)*92}px`
})
</script>

<style>
@keyframes rankRoll {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(var(--roll));
    }
}
</style>
```



### 通过 v-model 绑定镶嵌弹窗

:bug: 碰到的一个业务场景，`computed ` 通过 `this.$refs.shareRef && this.$refs.shareRef.show` 这样的方式监听子组件弹窗是否打开，会有监听不及时的问题，所以要修改写法。

`父组件`

```html
<template>
    <sharePop v-model="sharePopShow" />
    <div v-show="showWinner">...</div>
</template>

<script>
export default {
    data() {
        sharePopShow: false
    },
    computed: {
    	// 业务：弹窗展示时，获奖列表不展示
        showWinner() {
            const condition1 = !this.sharePopShow
            return condition1
        },
    },
}
</script>
```

`子组件`

```html
<template>
    <van-overlay :show="value">
        内容
    </van-overlay>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        show() {
            this.$emit('change', true)
        },
        hide() {
            this.$emit('change', false)
        }
    }
}
</script>
```



### 获取距截止时间差

```html
<script>
export default {
    data() {
        return {
            resTimeCell: ['00', '00', '00', '00'], // 天 时 分 秒
            countTimer: null,
        }
    },
    created() {
        this.getResTimeCell()
    },
    beforeDestroyed() {
        clearInterval(this.countTimer)
    },

    methods: {
        getResTimeCell() {
            let nowDate = new Date()
            const endDate = new Date('2024/6/30 23:59:59') // 结束时间
            if (nowDate < endDate) {
                this.resTimeCell = this.getDiffTimes(nowDate, endDate, true)
                this.countTimer = setInterval(() => {
                    nowDate = new Date()
                    if (nowDate < endDate) {
                        this.resTimeCell = this.getDiffTimes(nowDate, endDate, true)
                    } else {
                        this.resTimeCell = ['00', '00', '00', '00']
                        clearInterval(this.countTimer)
                    }
                }, 1000)
            }
        },
        getDiffTimes(startData, endDate, fixed_2 = false) {
            //相差的总秒数
            let totalSeconds = parseInt((endDate - startData) / 1000)
            // 取天数后取模（余数）
            let days = Math.floor(totalSeconds / (60 * 60 * 24))
            let modulo = totalSeconds % (60 * 60 * 24)
            // 取小时数后取模（余数）
            let hours = Math.floor(modulo / (60 * 60))
            modulo = modulo % (60 * 60)
            // 分钟
            let minutes = Math.floor(modulo / 60)
            // 秒（通过取模获取）
            let seconds = modulo % 60
            if (fixed_2) {
                days = days < 10 ? '0' + days : days
                hours = hours < 10 ? '0' + hours : hours
                minutes = minutes < 10 ? '0' + minutes : minutes
                seconds = seconds < 10 ? '0' + seconds : seconds
            }
            return [days, hours, minutes, seconds]
        },
    }
}
</script>
```



### 定制样式风格

> 适合于存在几种特定风格样式的情况，如果自定义样式过多就不合适了，还是得用 `v-bind="$attrs"`

```html
<template>
    <el-button
        v-bind="styleBind"
    >
        导出
    </el-button>
</template>

<script>
export default {
    props: {
        // 按钮样式风格
        btnType: {
            type: Number,
            default: 1
        }
    },
    computed: {
        styleBind() {
            if (this.btnType == 1) {
                return {
                    icon: 'el-icon-upload2',
                    type: 'text',
                    size: 'small'
                }
            }
            if (this.btnType == 2) {
                return {
                    type: 'success'
                }
            }
        }
    }
}
</script>
```



### 避免相似节点影响

> 这里说的影响，包括下拉列表的数据渲染，表单控件的限制条件等，可以给父盒子添加 `key` 属性限制。

```html
<div v-if="configForm.status == 1" key="status_1">...</div>
<div v-if="configForm.status == 2" key="status_2">...</div>
```

![image-20240426104646586](https://raw.githubusercontent.com/SpringLoach/img_store/main/img/[vue]相似结构问题 .png)








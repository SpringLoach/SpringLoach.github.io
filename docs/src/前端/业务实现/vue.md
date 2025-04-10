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



### 自定义组件的v-model

`父组件`

```html
<title-dialog
    v-model="isShow"
/>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        open() {
            this.isShow = true
        }
    }
}
</script>
```

`子组件`

```html
<template>
    <van-dialog v-model="show">
        ...
    </van-dialog>
</template>

<script>
export default {
    name: 'TitleDialog',
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        // 是否展示【变量名和model选项的prop属性一致，就相当于被父组件v-model绑定的值】
        show: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        cancel() {
            this.$emit('change', false)
        },
        confirm() {
            this.$emit('confirm')
            this.$emit('change', false)
        }
    }
}
</script>
```



### 嵌套 v-model 的修改

`爷组件`

```html
<title-dialog-wrap
    v-model="isShow"
    @confirmChange="xxx"
/>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        open() {
            this.isShow = true
        },
        xxx() {
            // ...
            this.isShow = false
        },
    }
}
</script>
```

`父组件`

```html
<template>
    <title-dialog
        v-model="show"
        @cancel="cancel"
        @confirm="confirmChange"
    />
</template>

<script>
export default {
    name: 'TitleDialog',
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        // 是否展示【变量名和model选项的prop属性一致，就相当于被父组件v-model绑定的值】
        show: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        cancel() {
            this.$emit('change', false)
        },
        confirm() {
            this.$emit('confirm')
        }
    }
}
</script>
```

`子组件`

```html
<template>
    <van-dialog v-model="show">
        ...
    </van-dialog>
</template>

<script>
export default {
    name: 'TitleDialog',
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        // 是否展示【变量名和model选项的prop属性一致，就相当于被父组件v-model绑定的值】
        show: {
            type: Boolean,
            default: false
        },
        // 不方便向上改变value值，适合多层级v-model的情况
        notChange: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        cancel() {
            this.$emit('cancel')
            if (!this.notChange) {
                this.$emit('change', false)
            }
        },
        confirm() {
            this.$emit('confirm')
            if (!this.notChange) {
                this.$emit('change', false)
            }
        }
    }
}
</script>
```



### 传递自定义组件/事件

`父组件`

```html
<reduceDialog
	text="减少配置"
	width="100px"
	:show-close="false"
	@click="dos"
/>

<script>
export default {
    methods: {
        dos() {
            console.log('--- 点击按钮回调 ---')
        }
    }
}
</script>
```

`子组件`

```html
<template>
    <div>
        <span
            v-on="$listeners"
            @click="reduce"
        >
            {{ text }}
        </span>
        <el-dialog
            :visible.sync="dialogVisible"
            v-bind="$attrs"
        >
            ...
        </el-dialog>
    </div>
</template>

<script>


export default {
    props: {
        text: {
            type: String
        },
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        reduce() {
            this.dialogVisible = true
        },
    }
}
</script>
```

`v-bind="$attrs"` 可以指定父组件传入的自定义属性重新绑定到哪个元素上；

`v-on="$listeners"` 可以指定哪个子组件去触发写在父组件上的事件。



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



### 子组件内部方法调用时机

```html
<template>
	<el-radio-group v-model="configForm.status">
        <el-radio :label="1">开启配置</el-radio>
        <el-radio :label="0">关闭配置</el-radio>
    </el-radio-group>
    <template v-if="[0, 1].includes(configForm.status)">
        <child-components ref="demoRef" />
    </template>
</template>

<script>
const orginForm = {
    status: undefined,
    other: '',
}
export default {
    data() {
        return {
            configForm: JSON.parse(JSON.stringify(orginForm)),
        }
    },
    methods: {
        // 假设result是接口请求到的详情数据
        init(result) {
            this.$set(this.configForm, 'status', result.status) // 深拷贝丢失undefined属性
            this.$nextTick(() => {
                this.$refs.demoRef.init()
            })
        }
    }
}
</script>
```



### vue2/3切换路由回到顶部

**vue3**

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
 
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior () {
    // vue2.0  x  y  控制
    // vue3.0  left  top 控制
    return { left: 0, top: 0 }
  }
})
```

**vue2**

```javascript
import VueRouter from 'vue-router'
Vue.use(VueRouter)
 
const router= new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
```



### 下拉框选项增强

选项加强

```javascript
computed: {
    // 根据 disableCateIdList 设置部分选项禁用
    enhanceRoleCidList() {
        return this.roleCidList.map(item => {
            const exsit = this.disableCateIdList.findIndex(_id => {
                return item.value == _id
            })
            return {
                ...item,
                disabled: exsit !== -1
            }
        })
    }
}
```

级联加强

```javascript
props: {
    disabledIdsList: {
        type: Array,
        default: () => {}
    }
},
computed: {
    enhanceOptions() {
        // disabledRegionIdsList [[0, 1], [0, 2]]
        // 如果不存在禁用配置，返回默认配置
        if (!this.disabledIdsList || !this.disabledIdsList.length) {
            return this.options
        }
        let newOptions = this.options.map(provinceObj => {
            // 这里不深拷贝，会影响原来的【this.options】
            const newProvinceObj = JSON.parse(JSON.stringify(provinceObj))
            this.disabledIdsList.forEach(ids => {
                if (newProvinceObj.id == ids[0]) {
                    newProvinceObj.regionListVoList = newProvinceObj.regionListVoList.map(cityObj => {
                        // 会存在一些项没设置disabled属性，但也够用
                        return {
                            ...cityObj,
                            disabled: cityObj.id == ids[1]
                        }
                    })
                }
            })
            return newProvinceObj
        })
        // 特别处理，如果市级不存在可选项，手动将省级设为不可选
        newOptions = newOptions.map(provinceObj => {
            const canOperateItem = provinceObj.regionListVoList.find(item => !item.disabled)
            return {
                ...provinceObj,
                disabled: !canOperateItem
            }
        })
        return newOptions
    }
}
```



### 订单详情缓存时机

> 从列表进入时，需要刷新组件；从选择地址返回时，需要保留状态

可以通过路由属性 `cache` 控制是否缓存页面，但对于商详这种需要动态缓存的页面，需要设计新的思路

感觉模块销毁前，需要清空缓存状态，这样更有保障一些？

`模块页面路由入口`

```html
<template>
	<keep-alive>
        <router-view v-if="$route.meta.cache" />
    </keep-alive>
    <keep-alive :include="keepAlivePages">
        <router-view v-if="$route.meta.cacheTo"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.cache && !$route.meta.cacheTo" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('router', {
            keepAlivePages: 'keepAlivePages'
        })
    },
}
</script>
```

`src\store\modules\router.js`

```javascript
const router = {
    namespaced: true,
    state: {
        keepAlivePages: []
    },
    getters: {
        keepAlivePages(state) {
            return state.keepAlivePages
        }
    },
    mutations: {
        // 清空缓存页面
        CLEAR_KEEP_ALIVE_PAGES(state) {
            state.keepAlivePages = []
        },
        // 新增缓存页面
        PUSH_KEEP_ALIVE_PAGE(state, pageName) {
            if (!state.keepAlivePages.includes(pageName)) {
                state.keepAlivePages.push(pageName)
            }
        },
        // 删除缓存页面
        REMOVE_KEEP_ALIVE_PAGE(state, pageName) {
            let index = state.keepAlivePages.findIndex((item) => {
                return item === pageName
            })
            if (index !== -1) {
                state.keepAlivePages.splice(index, 1)
            }
        }
    },
}

export default router
```

`商详页面组件`

```html
<script>
import { mapMutations } from 'vuex'
export default 
    beforeRouteLeave(to, from, next) {
        if (from.meta.cacheTo && from.meta.cacheTo.includes(to.name)) {
            this.addKeepAlive(from.name)
        } else {
            this.removeKeepAlive(from.name)
        }
    	// 这里如果直接调用，可能会缓存失效，可能和执行代码顺序有关
        this.$nextTick(() => {
            next()
        })
    },
    methods: {
        ...mapMutations('router', {
            addKeepAlive: 'PUSH_KEEP_ALIVE_PAGE',
            removeKeepAlive: 'REMOVE_KEEP_ALIVE_PAGE'
        })
    }
}
</script>
```

`路由定义`

```javascript
{
    path: 'detail',
    component: resolve => require(['@/xx/detail'], resolve),
    meta: {
        title: '商品详情',
        cacheTo: ['addressList', 'addressUpdate'] // 对于其他页面路由定义的name属性
    },
    name: 'mallDetail'
}
```



### 疏远组件通信

可以通过 `vuex`、`缓存`、`Vue.prototype`、`eventBus` 实现；

其中 `eventBus`、`vuex` 更容易实现实时的监听，其余的适合 `延迟动作`



### 公共校验-步骤抽离封装

`父组件`

```html
<!-- 校验 -->
<son-valid ref="sonRef" />
```

```javascript
submit() {
    const res = await this.$refs.sonRef.assignValid()
    if (res != 'pass') {
        return
    }
    // ...
}
```

`子组件`

```html
<script>
export default {
    data() {
        return {
            resolve: null,
            reject: null,
        }
    },
    methods: {
        async assignValid() {
            this.$refs.dialogRef.showDialog()
            const asyncFn = new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })
            
            const operateResult = await asyncFn.then(() => {
                this.$refs.dialogRef.hideDialog()
                return 'pass'
            }, err => {
                return 'cancel'
            })

            return operateResult
            
        },
        // 对应弹窗按钮点击事件
        confirm() {
            this.resolve()
        },
        cancel() {
            this.reject()
        },
    }
}
</script>
```

**动态校验的情况**

> 即不一定需要弹窗校验，在写法上的改动：父组件调用时传入参数，子组件修改对应方法即可

```javascript
async assignValid({ workerInfo, orderId }) {
    if (!workerInfo) {
        this.$message.warning('请输入')
        return Promise.reject('cancel')
    }
    const params = {
        workerInfo,
        orderId, // 订单id
    }
    let res = await demoApi(params)

    if (res.data.code == 200) {
        const result = res.data.data
        if (!result.serviceSameOrder) {
            return Promise.resolve('pass')
        }
    } else {
        this.$message({
            type: 'error',
            message: res.data.msg
        })
        return Promise.reject('cancel')
    }

    this.$refs.dialogRef.showDialog()
    const asyncFn = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
    })

    const operateResult = await asyncFn.then(() => {
        this.$refs.dialogRef.hideDialog()
        return 'pass'
    }, err => {
        return 'cancel'
    })

    return operateResult
}
```



### 字符串转化为标签

应用场景：将日志列表中可能存在的图片字符串转化为图片元素展示

```html
<div v-html="scope.row.content" @click="(e) => { handleClickContent(e, scope) }"></div>
```

```javascript
queryList() {
    const reulst = [
        {
            id: 1,
            content: '标题：abc，图片凭证：@@http://xxx.png@@,操作者：乔家劲'
        },
        {
            id: 2,
            content: '标题：abc，图片凭证：@@http://xxx.png,http://yyy.png@@,齐夏'
        },
    ]
    const tableData = result.map(_ => {
        const { content } = _

        function getParamsFromRule(str) {
            const res = str.match(/\@\@(.*)\@\@/)
            // 返回上一次匹配模式中的首个分组
            return RegExp.$1
        }
        // 获取 @@**@@ 中 ** 的内容 
        let srcListStr = getParamsFromRule(content)

        if (srcListStr) {
            // 获取图片地址数组
            const srcList = srcListStr.split(',')
            // 组装html格式的图片内容，scoped包围的类名样式在这里不起作用，所以手动加样式
            const srcHtmlSrc = srcList.reduce((pre, item, index) => {
                const newItem =
                    index == srcList.length - 1
                    ?
                    `<img src="${item}" style="width: 40px; height: 40px; vertical-align: middle; border-radius: 4px; object-fit: cover; cursor: pointer" />`
                    :
                    `<img src="${item}" style="width: 40px; height: 40px; vertical-align: middle; border-radius: 4px; object-fit: cover; cursor: pointer; margin-right: 6px" />`
                return pre += newItem
            }, '')
            // 替换内容
            const newContent = content.replace(`@@${srcListStr}@@`, srcHtmlSrc)
            return {
                ..._,
                content: newContent,
                srcList
            }
        } else {
            return _
        } 
    })
}
```

**添加预览图片处理**

```javascript
handleClickContent(e, scope) {
    const { row } = scope
    
    if (e.target.tagName.toLowerCase() === 'img') {
        const targetSrc = e.target.src
        const targetIndex = row.srcList.findIndex(_ => _ == targetSrc)
        // 预览图片的第三方API
        this.$previewImage({
            previewSrcList: row.srcList,
            initialIndex: targetIndex,
        })
    }
}
```



### 触发防抖

`utils/index.js`

```javascript
export function debounce(fn, time) {
    let timer = -1
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, time)
    }
}
```

`test.vue`

```html
<template>
    <div @click="test">连续点击不触发事件</div>
</template>

<script>
import { debounce } from '@/utils/index.js'
export default {
    data() {
        return {
            record: []
        }
    },
    methods: {
        test: debounce(async function(e) {
            this.searchText = e.target.value
            const data = await []
            this.record = data
        }, 300)
    }
}
</script>
```



### 列表/详情刷新-依赖注入

依赖注入是非响应式的，但是用来传方法还挺好使的

数据才层层传进去, 深层调用外层的函数, 用依赖注入

如订单详情页，存在很多嵌套得较深的子组件，在操作后需要刷新详情，就可以把刷新方法传进去

```javascript
// 父组件
provide() {
    return {
        getMap: this.getMap
    }
}

// 后代组件
inject: ['getMap']
```



### 模块化在vue的应用

`data.js`

```javascript
const totalList = [
    { name: '向天哮', phone: '1122334', book: '开箱有奖' },
]

export default totalList
```

`demo.vue`

```html
<script>
import totalList from './data'
export default {
    data() {
        return {
            list: totalList
        }
    }
}
</script>
```



### 兼容列表条件渲染

```html
<div v-if="demoList && demoList.length" class="full-item"></div>
<!-- 等价写法 -->
<div v-if="demoList?.length" class="full-item"></div>
```

```javascript
data() {
    return {
        demoList: []
    }
}
```



### computed的get/set应用

> 背景：更换组件后，发现原本绑定的是索引而非tab本身，且该索引应用到了非常多的位置，替换成本极高。

```html
<template>
    <el-tabs v-model="currentTitle">
        <el-tab-pane
            v-for="item in workTitleList"
            :key="item"
            :label="item"
            :name="item"
        />
    </el-tabs>
</template>

<script>
export default {
    data() {
        return {
            workTitleList: ['苹果', '香蕉'],
        }
    },
    props: {
        // 激活索引
        titleCurrentIndex: {
            type: Number,
            required: true
        },
    },
    computed: {
        currentTitle: {
            get() {
                return this.workTitleList[this.titleCurrentIndex]
            },
            set(item) {
                const index = this.workTitleList.findIndex(name => name == item)
                // 拿到index后，触发原本的点击逻辑
                this.onClickTitle(index, item)
            }
        }
    }
}
</script>
```



### computed结合当前时间

```html
<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            cTime: null
        }
    },
    computed: {
        deadLineDay() {
            const subTaskStartTime = '2025-01-28 00:00:00'
            const startDate = new Date(subTaskStartTime.replace(/-/g, '/'))
            return this.currentDate > startDate
        }
    },
    mounted() {
        this.getCurrentTime()
    },
    beforeDestroy() {
        clearInterval(this.cTime)
    },
    methods: {
        getCurrentTime() {
            this.cTime = setInterval(() => {
                this.currentDate = new Date()
            }, 1000)
        }
    }
}
</script>
```



### 通过 promise 添加中间态校验弹窗

> 场景：已经有完善的校验和提交流程，需要在中间插入一个弹窗校验（可能出现），只有弹窗校验通过才继续往下走，否则保持原样。

`父组件`

```html
<!-- 校验弹窗（子组件） -->
<valid-dialog ref="validRef" />
```

```javascript
async handleClickSave(flag) {
    const res = await this.$refs.validRef.extraValid(params)
    if (res != 'pass') {
        return
    }
    // ..一些业务逻辑
}
```

`子组件`

```html
<template>
    <diy-dialog
        ref="dialogRef"
        title="温馨提示"
        @confirm="confirm"
        @cancel="cancel"
        @close="close"
    >
        <div style="padding-bottom: 20px; text-align: center">请确保在{{ hours }}小时后{{ text }}</div>
    </diy-dialog>
</template>

<script>
import diyDialog from '@/components/diyDialog'
import { demoApi } from '@/api/xx'

export default {
    components: {
        diyDialog
    },
    data() {
        return {
            resolve: null,
            reject: null,
            hours: null,
            text: '刷牙' // '跑步'
        }
    },
    methods: {
        async extraValid({ name, text }) {
            if (!name) {
                this.$message.warning('请先输入姓名')
                return Promise.reject('cancel')
            }
            const params = {
                name
            }
            const res = await demoApi(params)

            if (res.data.code == 200) {
                const result = res.data.data
                this.hours = result.hours
                if (!result.needMiddleValid) {
                    return Promise.resolve('pass')
                }
            } else {
                this.$message({
                    type: 'error',
                    message: res.data.msg
                })
                return Promise.reject('cancel')
            }

            this.text = text

            this.$refs.dialogRef.showDialog()
            const asyncFn = new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })

            const operateResult = await asyncFn.then(
                () => {
                    this.$refs.dialogRef.hideDialog()
                    return 'pass'
                },
                err => {
                    return 'cancel'
                }
            )

            return operateResult
        },
        confirm() {
            this.resolve()
        },
        cancel() {
            this.reject()
        },
        close() {
            this.reject()
        }
    }
}
</script>
```








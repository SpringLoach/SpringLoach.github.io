### 遍历元素集合

> 部分低版本浏览器的 dom 集合不支持 forEach 方法

```javascript
let elements = document.querySelectorAll('.some-class');
for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
}
```



### 修改dom中子元素的所在位置

> 将公共组件中的上传按钮由置后改为置前
>
> 场景：成功上传后，会展示新添加的图片；添加N个图片后，上传按钮消失。

```html
<div class="uploadImg">
    <div class="img-list"></div>
	<div id="upload-control"</div>
</div>
```
```javascript
data() {
    return {
        reverse: true
        observer: null
    }
},
mounted() {
    if (this.reverse) {
        const fatherEl = document.getElementsByClassName('uploadImg')[0]

        // 创建一个MutationObserver实例
        this.observer = new MutationObserver((mutationsList, observer) => {
            // 处理变化
            for (let mutation of mutationsList) {
                // 元素的子节点发生变化
                if (mutation.type === 'childList') {
                    // 判断第一个节点是否为上传dom
                    const firstChild = fatherEl.children[0]
                    const uploadIsFirstChild = firstChild.getAttribute('id') == 'upload-control'
                    if (uploadIsFirstChild) {
                        return
                    }
                    // 上传按钮是否存在（是否需要处理）
                    const targerEl = fatherEl.querySelectorAll('#upload-control')[0]
                    if (!targerEl) {
                        return
                    }
                    // 先从原始位置删除该子节点
                    fatherEl.removeChild(targerEl);

                    // 再根据目标索引重新插入该子节点
                    fatherEl.insertBefore(targerEl, fatherEl.children[0]);
                }
            }
        })
        // 配置观察器
        const config = { childList: true };
        
        // 开始观察目标元素
        this.observer.observe(fatherEl, config);
    }
},
beforeDestory() {
    if (this.observer) {
        // 停止观察
        this.observer.disconnect()
    }
}
```

观察选项可以配置观察元素属性、子元素、元素内容等



### div监听onfocus和onblur

https://blog.csdn.net/weixin_43877799/article/details/121287494



### 监听搜索项数量设置搜索组

> 让搜索按钮组，始终出现在最后一行的最后一位，而不会每次都额外加一行。

**思路**

```
4  偏移0
5  偏移3
6  偏移2
7  偏移1
8  偏移0
9  偏移3
10 偏移2
```

如果长度大于4

- 当前数%4
- 余数为0，返回0
- 余数不为0，返回4-余数

**代码实现**

```html
<el-form class="list" id="table-search-list" label-width="80px">
    <el-form-item>...</el-form-item>
    <el-form-item>...</el-form-item>
    <el-form-item>...</el-form-item>
    <template v-if="showMore">
        <el-form-item>...</el-form-item>
    </template>
    <el-form-item label-width="0">
        <div class="search-row">
            <!-- 查询、充值按钮 -->
            <!-- 展开收起 isScreen=!isScreen -->
        </div>
    </el-form-item>
</el-form>
```

```html
<script>
// 布局控制，查询按钮组总在搜索的最后一行最后一位
export const searchControlMixin = {
    data() {
        return {
            // showMore: false, // 是否展示更多，这个键名需统一
            tableSearchObserver: null,
            tableSearchListEl: null, // 搜索项容器
        }
    },
    mounted() {
        this.judgeSearchItemOffer()
    },
    beforeDestory() {
        if (this.tableSearchObserver) {
            // 停止观察
            this.tableSearchObserver.disconnect()
        }
        this.tableSearchListEl = null
    },
    watch: {
        showMore: {
            // 需要在每次展开/收起前，先把子节点移除掉
            handler: 'deleteSearchTempChild',
        },
        activeTab: {
            // 切换tab前，移除子节点
            handler: 'deleteSearchTempChild',
        },
    },
    methods: {
        judgeSearchItemOffer() {
            this.tableSearchListEl = document.getElementById('table-search-list')
            this.setSearchItemOffer(this.tableSearchListEl)

            // 创建一个MutationObserver实例
            this.tableSearchObserver = new MutationObserver((mutationsList, observer) => {
                // 处理变化
                for (let mutation of mutationsList) {
                    // 元素的子节点发生变化
                    if (mutation.type === 'childList') {
                        this.setSearchItemOffer(this.tableSearchListEl)
                    }
                }
            })
            // 配置观察器
            const config = { childList: true }

            // 开始观察目标元素
            this.tableSearchObserver.observe(this.tableSearchListEl, config)
        },
        setSearchItemOffer(fatherEl) {
            // 判断子节点数量
            const childElLength = fatherEl.children.length

            // 避免切换tab时，原本添加的元素干扰 / 搜索项数量不够就不用处理了
            let invalidCount = 0
            for (let i = 0; i < childElLength; i++) {
                const childEl = fatherEl.children[i]
                if (childEl.className.indexOf('temp-form-item') != -1) {
                    invalidCount++
                }
            }
            if (childElLength - invalidCount < 4) {
                this.deleteSearchTempChild()
                return
            }

            // 求余数
            const reCount = childElLength % 4
            const offerCount = reCount == 0 ? 0 : 4 - reCount
            if (childElLength.length <= 3) {
                return
            }
            // 获取最后一个节点
            var lastNode = fatherEl.lastChild
            // 创建新的节点
            if (offerCount) {
                // 创建一个文档片段，此时还没有插入到DOM树中
                const frag = document.createDocumentFragment()
                // 执行插入
                for (let x = 0; x < offerCount; x++) {
                    const newItem = document.createElement('div')
                    newItem.className = 'temp-form-item'
                    newItem.style.width = '25%'
                    newItem.style.marginBottom = '20px'
                    //先插入文档片段中
                    frag.appendChild(newItem)
                }

                //都完成之后，再插入到DOM树中
                fatherEl.insertBefore(frag, lastNode)
            }
        },
        deleteSearchTempChild() {
            const elements = document.querySelectorAll('.temp-form-item')
            elements.forEach(function (el) {
                el.parentNode.removeChild(el)
            })
        }
    },
}
</script>
```

```less
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .el-form-item {
        width: 25%;
        margin-bottom: 20px;
        &:nth-child(4n + 1) {
            padding-right: 30px;
        }
        &:nth-child(4n + 2) {
            padding: 0 15px;
        }
        &:nth-child(4n + 3) {
            padding: 0 15px;
        }
        &:nth-child(4n + 4) {
            padding-left: 30px;
        }

        ::v-deep .el-form-item__label {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-style: normal;
            color: #333333;
            &::after {
                content: ':';
                display: inline-block;
            }
        }

    }
    .search-row {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        text-align: right;
    }
}
```



### 子绝父相的替代方案

>  可以用作为子绝父相的替代方案；在父元素添加了 `overflow: hidden` 时，也不会被限制展示。

```html
<template>
    <div
        v-for="(item, index) in list"
        ref="itemRef"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
    >
        <div>普通内容</div>
        <div class="extra-info-wrap" :style="{ top: topValue, left: leftValue }">...</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: -1,
            topValue: 0,
            leftValue: 0,
        }
    },
    methods: {
        handleMouseEnter(index) {
            this.currentIndex = index
            const targetEl = this.$refs.itemRef[index]
            if (targetEl) {
                const info = targetEl.getBoundingClientRect() // 可以获取到元素的宽高、距离视口（注意视口不等于页面）位置
                const diff = (194 - info.width) / 2
                
                this.topValue = `${info.top - 205}px`
                this.leftValue = `${info.left - diff}px`
            }
        },
        handleMouseLeave() {
            this.currentIndex = -1
        }
    },
    // 避免页面滚动时，反应不及时
    mounted() {
        window.addEventListener('scroll', this.handleMouseLeave);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleMouseLeave);
    },
}
</script>

<style scoped lang="scss">
.extra-info-wrap {
    position: fixed;
}
</style>
```



### 监听是否在元素外点击

DOM的 `contains` 方法用于检测当前DOM对象是否包含指定的节点，‌返回`true`或`false`。‌

```html
<script>
export default {
    mounted() {
        document.addEventListener('click', this.beginClickListener)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.beginClickListener)
    },
    methods: {
        beginClickListener({ target }) {
            const wrapEl = document.getElementById('demo')
            if (!wrapEl) {
                return
            }
            // 当点击目标元素以外的区域时
            if (!wrapEl.contains(target)) {
                // ...
            }
        }
    }
}
</script>
```



### 定位到某元素的位置

> `scroll-margin` 用于设置滚动到某元素时相对视口的预留位置

```html
<div
    style="scroll-margin: 60px"
     id="target-wrap"
>...</div>
```

```javascript
skipToXX() {
    const targetEl = document.getElementById('target-wrap')
    targetEl?.scrollIntoView({ behavior: "smooth" })
}
```



#### 让页面中的某元素滚动到视窗内的顶部位置

```html
<!-- scroll-margin 可以控制距离边界距离 -->
<div id="target" style="scroll-margin: 100px;"></div>
```

```javascript
const el = document.querySelector('#target');

el.scrollIntoView({
    behavior: 'smooth', // 使滚动平滑过渡
    block: 'start' // 定义垂直方向的对齐，默认值就是start
});
```



#### 让容器内的滚动元素与容器顶部对齐

```html
<div class="fix-wrap">
    <div class="inner-wrap"></div>
</div>
```

```javascript
// 获取容器和目标元素
const fixEl = document.querySelector('.fix-wrap');
const innerEl = document.querySelector('.inner-wrap');

// 滚动容器，使目标元素的顶部与容器顶部对齐
if (fixEl && innerEl) {
    innerEl.scrollTop = fixEl.offsetTop - innerEl.offsetTop;
}
```



### 曝光埋点思路

> 这里以 vue2 引入的 elment 表格为例

```html
<el-table ref="tableRef">...</el-table>

<script>
export default {
    data() {
        return {
            orderList: [] // 统计暴露在视野的条目序号(由1开始)
        }
    },
    beforeDestroy() {
        this.orderList = []
        const tableEl = this.$refs.tableRef?.$el
        const body = tableEl?.querySelector('.el-table__fixed-body-wrapper')
        body.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        // 获取数据后的 $nextTick 中调用
        afterGetList() {
            this.orderList = []
            const tableEl = this.$refs.tableRef?.$el
            if (!tableEl) {
                return
            }
            const body = tableEl.querySelector('.el-table__fixed-body-wrapper')
            // 立马获取一次暴露的条目
            this.handleScroll()
            body.addEventListener('scroll', this.handleScroll)
        },
        handleScroll() {
            const tableEl = this.$refs.tableRef?.$el
            const body = tableEl.querySelector('.el-table__fixed-body-wrapper')
            const trEls = body.getElementsByClassName('el-table__row')
            const scrollTop = body.scrollTop
            const scrollFooterHeight = body.scrollTop + body.offsetHeight
            let accumulatedHeight = 0
            for (let i = 0; i < trEls.length; i++) {
                const accumulatedFooterHeight = accumulatedHeight + trEls[i].offsetHeight
                // 头在容器上边缘的上面，且脚在容器上边缘的下面
                if (accumulatedHeight < scrollTop && accumulatedFooterHeight > scrollTop) {
                    console.log('====-----i-----====', `第${i + 1}个符合情况1`)
                    if (this.orderList.indexOf(i + 1) == -1) {
                        this.orderList.push(i + 1)
                    }
                }
                // 头在容器上边缘的下面，脚在容器下边缘的上面
                if (accumulatedHeight >= scrollTop && accumulatedFooterHeight <= scrollFooterHeight) {
                    console.log('====-----i-----====', `第${i + 1}个符合情况2`)
                    if (this.orderList.indexOf(i + 1) == -1) {
                        this.orderList.push(i + 1)
                    }
                }
                // 脚在容器下边缘的下面，且头在容器下边缘的上面
                if (accumulatedFooterHeight > scrollFooterHeight && accumulatedHeight < scrollFooterHeight) {
                    console.log('====-----i-----====', `第${i + 1}个符合情况3`)
                    if (this.orderList.indexOf(i + 1) == -1) {
                        this.orderList.push(i + 1)
                    }
                }
                accumulatedHeight += trEls[i].offsetHeight
            }
        }
    }
}
</script>
```

**优化思路**

> 当确定项的高度小于容器时，可以优化思路如下

```javascript
const ordersInfo = []
for(let i = 0; i < rect.length; i++) {
    const _ = rect[i]
    // 脚在容器上边缘的下面
    const condition1 = '..'
    // 头在容器下边缘的上面
    const condition2 = '..'
    if (condition1 && condition2) {
        ordersInfo.push(_)
    }
    // 当头在容器下边缘的下面，说明后面的项都不需要遍历了
    const condition3 = _.top >= screenHeight
    if (condition3) {
        break
    }
}
```


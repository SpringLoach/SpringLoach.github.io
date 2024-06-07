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


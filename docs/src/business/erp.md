### 重要接口

订单详情-详情

```http
getOrderDetail
```



### 规则

| 模块   | 说明                                                       |
| ------ | ---------------------------------------------------------- |
| 菜单栏 | 如果菜单组下只有一个菜单页面会展示，该菜单页面会取代菜单组 |



### 滚动条样式

`浅色`

```less
.wrap {
  &::-webkit-scrollbar {
        /* 滚动条宽度和高度 */
        width: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #e9e9e9;
    }

    &::-webkit-scrollbar-track-piece {
        border-radius: 10px;
        /*滚动条里面轨道*/
        background-color: #fff;
    }
}
```

`深色`

```less
.wrap {
  &::-webkit-scrollbar {
        /* 滚动条宽度和高度 */
        width: 6px;
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #cccccc;
    }

    &::-webkit-scrollbar-track-piece {
        border-radius: 10px;
        /*滚动条里面轨道*/
        background-color: #fff;
    }
}
```



### 列表联调步骤

【业务搜索字段】

- 定义到 searchParams

- 定义到 searchOptions

- (视情况) 搜索接口入参处理【不需要处理，则直接展开searchParams即可】

- (视情况) 自定义搜索项

【分页字段】

- 一般currentPage出现4次，pageSize出现3次

- 接口定义的字段不统一，要看

```javascript
const { currentPage, pageSize } = this.pagination
const params = {
    ...this.searchParams,
    pageNum: currentPage,
    pageSize
}
```

【列表字段】

- 定义到 tableOptions

- (视情况) 添加到模板中的表格项



**参考**

`src\views\operations\activityCenterConfig\index.vue`

- 获取标准枚举标签

- 表单字段格式化



### 内容超过两行展示 el-tooltip

```html
<template #someText="scope">
    <el-tooltip
        v-model="scope.row.showTooltip"
        placement="top"
        :open-delay="500"
        effect="dark"
        :disabled="!scope.row.showTooltip"
    >
        <div slot="content">{{ scope.row.someText }}</div>
        <div class="my-note" @mouseenter="showTips($event, scope.row)">
            {{ scope.row.someText }}
        </div>
    </el-tooltip>
</template>
```

```javascript
function showTips(obj, row) {
    /*obj为鼠标移入时的事件对象*/
    /*currentWidth 为文本在页面中所占的宽度，创建标签，加入到页面，获取currentWidth ,最后在移除*/
    const TemporaryTag = document.createElement('span')
    TemporaryTag.innerText = row.someText
    TemporaryTag.className = 'getTextWidth'
    document.querySelector('body').appendChild(TemporaryTag)
    const currentWidth = document.querySelector('.getTextWidth').offsetWidth
    document.querySelector('.getTextWidth').remove()

    /*cellWidth为表格容器的宽度*/
    const cellWidth = obj.target.offsetWidth

    /*当文本宽度小于||等于容器宽度两倍时，代表文本显示未超过两行*/
    currentWidth <= 2 * cellWidth ? (row.showTooltip = false) : (row.showTooltip = true)
}
```



### 表单初始化/重置复用原始数据

> 避免表单内容过多的情况下，需要在多出写重复的属性。

```html
<script>
const orginForm = {
    aa: '',
    bb: []
}
export default {
	data() {
        return {
            configForm: JSON.parse(JSON.stringify(orginForm))
        }
    },
    methods: {
        reset() {
            this.configForm = JSON.parse(JSON.stringify(orginForm))
        }
    }
}
</script>
```



### 通用导出按钮组件

> 这样就可以不用关注导出方法的处理过程，以及按钮禁用状态了。

```html
<diyUpload
    :apiFunc="exportAuditorList"
    :params="getParm()"
    perm="/rechargeRebateConfig/exportAuditorList"
/>

<script>
import { exportList } from '@/api/xx'
import diyUpload from '@/components/diyUpload'
export default {
    components: {
        diyUpload
    },
    data() {
        return {
            exportList
        }
    }
}
</script>
```

| 参数      | 说明                         | 默认值 | 类型     |
| --------- | ---------------------------- | ------ | -------- |
| apiFunc   | 导出api                      |        | Function |
| validFunc | 校验方法                     |        | Function |
| params    | 参数，供导出方法和校验方法用 | {}     | Object   |
| perm      | 权限字符串                   | ''     | String   |
| delayTime | 延迟禁用时间                 | 0      | Number   |




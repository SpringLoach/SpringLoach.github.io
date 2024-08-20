<script setup>
import CheckOutComponent from './template/checkOut.vue'
</script>

<CheckOutComponent />

### 重要接口

订单详情-详情

```http
getOrderDetail
```

若干接口区分平台/商家端

| 字段        | 平台端 | 商家端 |
| ----------- | ------ | ------ |
| sourceIsVip | 0      | 1      |





### 内部规则

| 模块   | 说明                                                       |
| ------ | ---------------------------------------------------------- |
| 菜单栏 | 如果菜单组下只有一个菜单页面会展示，该菜单页面会取代菜单组 |



### 业务

**客服领取工单**

路径一：工单列表勾选对应工单-更换客服

路径二：我的工单-全部待领取

**商家端配置下单商品**

商家端商家列表-目标商家-编辑-类目配置-合作类目-新增/编辑类目

注意pc下单流程中，商品未必能在图库中展示，可以在商品名称唤出下拉框





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



#### 参考

`src\views\operations\activityCenterConfig\index.vue`

- 获取标准枚举标签

- 表单字段格式化

`src\views\workermanange\capacityConfigManage\subsidyWorkerSetting\index.vue`

- 复选框操作
- 自定义表头
- 自定义输入控件

`src\views\workermanange\capacityConfigManage\subsidySkuSetting\index.vue`

- 自定义输入控件（三级品类、商品、规格）



#### lb-table 复选框禁用

`使用默认配置时，无法添加属性`

```javascript
const tableOptions = {
    selection: true
}
```

`需要添加自定义属性时，手动添加列`

```javascript
function selectable(row) {
    if (row.type == 1) {
        return false         //禁用
    } else {
        return true          //可选
    }
}
const tableOptions = {
    column: [
        { type: 'selection', selectable },
        { label: '示例', prop: 'xxx' },
    ]
}
```



#### lb-table 带入查询值

> 直接在 setup 中修改，会导致查询值被记录为初始态，重置时无法清空，要在 `lb-search` 完成初始化后进行操作。

```javascript
mounted() {
    this.$nextTick(() => {
        const r = this.$route
        if (r.query.id) {
            this.searchParams.id = r.query.id
        }
        this.queryList()
    })
}
```



### 风格

#### 表单初始化/重置复用原始数据

> 避免表单内容过多的情况下，需要在多出写重复的属性；注意初始值避免定义为 `undefined`，`JSON.parse(JSON.stringify)`  拷贝会丢失对应属性导致失去响应。

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



#### 滚动条样式

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





### 功能

#### 通用导出按钮组件

`src\components\diyUpload\index.vue`

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



#### 上传文件

> 看接口文档 Content-Type 为 multipart/form-data，但代码里没看到特别处理

`src\views\workermanange\capacityConfigManage\subsidySkuSetting\edit\addDialog.vue`

`接口使用`

```javascript
func() {
    const formDatas = new FormData()
	formDatas.append('file', file)

	const res = await exportApi(formDatas)
}
```

`接口定义`

```javascript
export function exportApi(data) {
    return request({
        url: '/xx/yy',
        method: 'post',
        data
    })
}
```



#### 导入excel

**A. 导入文件(上传excel)、成功失败数量、导出失败模板**

补贴SKU设置

`src\views\workermanange\capacityConfigManage\subsidySkuSetting\edit\addDialog.vue`



**B. 导入文件(解析excel获取到数据上传)、成功失败数量、导出失败模板**

站内信

`src\views\operations\internalMessageManagement\edit\index.vue`



#### 后端的流数据下载

`接口`

```javascript
// 根据 axios 封装
export function demoApi(data) {
    return request({
        url: '/demoApiLink',
        method: 'post',
        data,
        header: { headers: { 'Content-Type': 'application/json; application/octet-stream' } }, // 二进制数据
        responseType: 'blob'
    })
}
```

`业务`

```html
<el-button @click="downloadErrorList">下载失败数据</el-button>
```

```javascript
async downloadErrorList() {
    const res = await demoApi({})
    const blob = new Blob([res.data]);
    let url = window.URL.createObjectURL(blob);
    const filename = '示例导出文件名称.xlsx'
    if ("download" in document.createElement("a")) {
        try {
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove()
        } catch (e) {
            console.log(e)
        }
    } else {
        navigator.msSaveBlob(blob, filename);
    }
}
```



### 组件

#### 总览

日志弹窗-修改前后内容复杂【活动中心配置-日志】

```
src\views\operations\activityCenterConfig\edit\editDialog.vue
```

日志弹窗-不带分页、简单【师傅工单配置-详情-异常信息】

```
src\views\workermanange\workerOrderManange\workOrderDetail\components\abnormalDialog.vue
```

省市-关联选择器【师傅短信促单列表-创建规则/编辑】

> 可回显

```
src\views\operations\msgPromotion\ruleList\components\addRule.vue
```

省市-级联选择器【师傅管理-师傅工单管理-工单生成规则配置】

```
src\views\workermanange\workerOrderManange\workOrderConfig\components\workOrderCreatorConfig.vue
```

确认删除弹窗

信用分/费用退款管理条例-费用退款规则-删除

```
src\views\workermanange\creditmanange\FeeRefundRules\index.vue
```



搜索项-关联省市区（级级多选）【师傅管理-费用退款列表】

```
src\views\workermanange\feeRefund\index.vue
```



搜索项-取平台端和商家端的所有一级品类【师傅管理-费用退款列表】

```
src\views\workermanange\feeRefund\index.vue
```



列表项-查看电话（师傅电话）【师傅管理-费用退款列表】

```
src\views\workermanange\feeRefund\index.vue
```



#### 简易弹窗列表

```html
<template>
    <diy-dialog
        ref="dialogRef"
        title="更换客服"
        title-in-center
        width="800px"
        :show-footer="false"
    >
        <el-table class="diy-table" :data="tableData" border stripe max-height="500">
            <div slot="empty" class="empty-box">
                <img :src="require('@/assets/images/empty.png')" />
                <span class="empty-text">暂无数据</span>
            </div>
            <el-table-column align="center" prop="a" label="订单异常" width="200" />
            <el-table-column align="center" prop="b" label="问题描述" />
        </el-table>
    </diy-dialog>
</template>

<script>

import diyDialog from '@/components/diyDialog'

export default {
    components: {
        diyDialog
    },
    data() {
        return {
            tableData: [
                {
                    a: '订单转报价',
                    b: '商家端订单一口价转报价，同时存在一口价/转报价订单状态'
                },
            ]
        }
    },
    created() {
        this.tableData = [
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
        ]
        this.tableData = [
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
            ...this.tableData,
        ]
    },
    methods: {
        showDialog() {
            this.$refs.dialogRef.showDialog()
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/revision-2023.scss';
</style>
```



#### 确认删除弹窗

```html
<el-button @click="delectHandle(scope.row)">删除</el-button>
```

```javascript
delectHandle(row) {
    const { id } = row
    this.$msgbox.confirm('确定删除这条规则吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
    }).then(() => {
        demoApi({ id })
            .then(({ data }) => {
                if (data.code === 200) {
                    this.getPage() // 查询分页
                    this.$message.success('删除规则成功!')
                } else {
                    this.$message.error(data.msg)
                }
            })
            .catch(err => {
                this.$message.error(err.msg)
            })
    })
}
```



### 其它

#### 内容超过两行展示 el-tooltip

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



#### 限制最大输入问题

```html
<el-input
    v-model="amount"
    v-maxSet:50000
    maxlength="5"
    placeholder="请输入金额"
    @blur="amount = $event.target.value"
/>
```

只设置 `v-maxSet`，在测试中途输入中文、英文时，可能导致双向绑定失效从而展示出不合预期的值，所以在失焦时增加处理，后续可以看看 `maxlength` 是否可以去掉



#### 限制输入最大值&&小数

输入框，限制输入数字，最大值999，支持两位小数（不允许输入999.01）

```html
<el-input
    v-model="form.xxx"
    @input="form.xxx = decimal(form.xxx, { maxValue: 10000000 })"
    @blur="form.xxx = removeEndSymbol(form.xxx)"
/>

<script>
import { decimal, removeEndSymbol } from '@/utils/baseHandled'
export default {
    methods: {
        decimal,
        removeEndSymbol
    }
}
</script>
```



#### 支持输入正整数-最多10位

```html
<el-input
    v-model.trim="form.ruleNum"
    v-int
    maxlength="10"
    show-word-limit
    placeholder="请输入数字编号"
    clearable
/>
```

#### 支持输入3位以内正整数

```html
<el-input
    v-model="form.dat"
    v-int
    placeholder="请输入天数"
    maxlength="3"
    clearable
/>
```

#### 超出字数溢出隐藏&tooltip

```html
<el-tooltip :content="demoStr" :disabled="demoStr.length <= 10" placement="top">
    <el-ellipsis :max-length="10" :content="demoStr" />
</el-tooltip>
```


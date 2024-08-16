#### 表格-渲染组件就触发校验

一般多选下拉框会遇到类似问题， 对它的初始值赋值为 ` []` 即可



#### 表格-首行统计

在列表数据 unshift 一个数据项，然后有特殊标记（布尔值最好）即可



#### 下拉框多标签换行问题

多标签超长时，+1标签换行问题（给需要改样式的lb-select加类名lb-select-wrap）

```less
// select-tag长度限制
.lb-select-wrap ::v-deep .el-tag {
    max-width: 90px !important;
}
```



#### 日期时间选择器-可选择时间不能早于当前时间

```html
<el-date-picker
    type="datetimerange"
    :picker-options="pickerOption"
/>

<script>
export default {
    data: {
        return {
        	pickerOption:{
                disabledDate:(time)=> {
                    return Date.now() -3600 * 1000 * 24 > time.getTime();
                }
            }
        }
    }
}
</script>
```



#### 日期时间选择器-可选择时间必须大于等于活动结束时间，否则不可选

```html
<el-date-picker
    type="datetimerange"
    :picker-options="pickerOption"
/>

<script>
export default {
    data: {
        return {
        	acTime: [],
        	pickerOption:{
                disabledDate:(time)=> {
                    if (!this.configForm.gg) {
                        return false
                    }
                    // 解决生成时间不为零点问题
                    let _t =  new Date(new Date(`${this.acTime[1]} 00:00:00`)).getTime();
                    return time.getTime() < _t;
                }
            }
        }
    }
}
</script>
```



#### 年月选择控件-部分月份可选

> ① 文档的 disabledDate 选项不能直接加到标签下，这样不能生效；
>
> ② 不要把 pickerOptions 写成箭头函数，会获取不到 `this`；
>
> ③ 这个控件，如果把比较的日期打印出来，数量庞多，会导致页面极卡，不打印就没事；

```html
<template>
    <el-date-picker
        v-model="time"
        type="month"
        value-format="yyyy-MM"
        placeholder="请选择"
        :picker-options="pickerOptions"
        clearable
    />
</template>

<script>
export default {
    data() {
        time: '',
        validSubsidyList: [
            {
                subsidyYear: 2025,
                subsidyMonth: 3
            },
            {
                subsidyYear: 2025,
                subsidyMonth: 6
            }
        ]
    },
    computed: {
        pickerOptions() {
            return {
                disabledDate: (time) => {
                    const selectDateObj = {
                        year: time.getFullYear(),
                        month: time.getMonth() + 1,
                    }
                    const target = this.validSubsidyList.find(subsidy => {
                        const condition1 = subsidy.subsidyYear == selectDateObj.year
                        const condition2 = subsidy.subsidyMonth == selectDateObj.month
                        return condition1 && condition2
                    })
                    
                    return !target
                }
            }
        }
    }
}
</script>
```



#### 级联选择器-多次点击导致页面奔溃问题

https://mybj123.com/18067.html



#### 自定义el-progress(vue3)

![](https://raw.githubusercontent.com/SpringLoach/img_store/main/img/%5Belement%5Ddiy-el-progress.png)

```html
<el-progress
    class="percent-progress"
    type="circle"
    :percentage="75" // 进度
    :width="36"      // 整个环的宽度
    :show-text="false"
    :stroke-width="5" // 环的厚度
    :color="customColorMethod" // 填充色
/>

<script>
function customColorMethod(percentage: number) {
    return '#FFA239'
}
</script>

<style lang="less" scoped>
.percent-progress {
    path:first-child {
        stroke: rgba(21, 101, 161, 0.64); // 底色
    }
}
</style>
```



#### 表格-show-overflow-tooltip失效

如果表格内容使用了插槽方式，就可能导致省略号不显示

```html
<el-table-column label="示例" prop="demo" show-overflow-tooltip>
    <template slot-scope="scope">
  	    123
    </template>
</el-table-column>
```





#### 原生表格选择（包含部分禁用、全选）控制

```html
<el-checkbox
    :value="checkAll"
    class="t-checkbox"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
>
    全选
</el-checkbox>

<script>
export default {
    components: {},
    data() {
        return {
            list: []
        }
    },
    computed: {
        // 是否全选
        checkAll() {
            const canSelectCount = this.list.filter(item => item.canSelect).length
            const currentSelectCount = this.list.filter(item => item.isSelect).length
            if (currentSelectCount && (currentSelectCount === canSelectCount)) {
                return true
            }
            return false
        },
        // 是否半选
        isIndeterminate() {
            const canSelectCount = this.list.filter(item => item.canSelect).length
            const currentSelectCount = this.list.filter(item => item.isSelect).length
            if (currentSelectCount && (currentSelectCount < canSelectCount)) {
                return true
            }
            return false
        },
        // 选中数据
        checkedList() {
            return this.list.filter(item => item.isSelect)
        }
    },

    created() {
        // todoMaster 在请求接口操作列表数据
        this.list = this.list.map((item, index) => {
            return {
                isSelect: false,
                canSelect: [0, 2, 4, 6].includes(index), // todoMaster 需要修改为需求条件
                ...item
            }
        })
    },

    methods: {
        // 全选
        handleCheckAllChange() {
            const canSelectCount = this.list.filter(item => item.canSelect).length
            const currentSelectCount = this.list.filter(item => item.isSelect).length
            // 如果当前（符合条件的）数据项没有被全部选择，将（符合条件的）数据项全选上
            if (canSelectCount && (canSelectCount > currentSelectCount)) {
                this.list = this.list.map(item => {
                    return {
                        ...item,
                        isSelect: item.canSelect ? true : false
                    }
                })
            }
            // 如果当前（符合条件的）数据项被全部选择，将所有数据项设置为没有选择
            if (canSelectCount && (canSelectCount == currentSelectCount)) {
                this.list = this.list.map(item => {
                    return {
                        ...item,
                        isSelect: false
                    }
                })
            }
        },
    }
}
</script>
```

```
请求列表数据后，遍历添加 isSelect=false属性，根据是否符合条件添加canSelect属性，用于数据项禁用

【全选】
点击全选，如果当前（符合条件的）数据项没有被全部选择，将（符合条件的）数据项全选上
点击全选，如果当前（符合条件的）数据项被全部选择，将所有数据项设置为没有选择
半选态控制：computed 当前（符合条件的）数据项是否有被选择，但没被全部选择
【数据项】
选中时，切换选择态

【维护数据】
- 全选半选态 computed
  + 满足两个条件 ① 可选数量存在 ②可选数量 > 已选数量 返回 true
  - 否则返回false
- 全选绑定值(v-model 改成 value) computed
  + 满足两个条件 ① 可选数量存在 ②可选数量 === 已选数量 返回 true
  - 否则返回false
- 当前选中数据列表 computed

【父子组件交互】
改变列表时，[当前选中数据列表]赋值为空，请求新的列表数据时其实已经自动做了
父组件点击【批量审核好评】时，要获取到[当前选中数据列表]
```





#### 表格-自适应最大高度

```html
<el-table class="config-table" />

<style lang="less" scoped>
.config-table {
    height: auto !important;

    // el-table自带的最大高度是个固定高度，内容少时也会撑开
    ::v-deep .el-table__body-wrapper {
        overflow-y: auto;
        height: auto !important;
        max-height: 330px;
    }
}
</style>
```



#### 表格-内容格式化

```html
<el-table-column align="center" prop="config" label="设置" :formatter="formatRow" />
<el-table-column align="center" prop="state" label="状态" :formatter="formatRow" />

<script>
export default {
    methods: {
        formatRow(row, column, cellValue) {
            return cellValue || '-'
        }
    }
}
</script>
```



#### 嵌套对象数据的表单校验

`demo`

```html
<el-form ref="formRef" class="config-list" :model="form" :inline="true">
  <div v-for="(item, index) in form.hh" :key="index" class="config-item">
    <el-form-item
      :prop="'hh.' + index + '.ii'"
      :rules="configRule.serviceType"
    >
      <el-input v-model="item.ii" />
    </el-form-item>
  </div>
</el-form>

<script>
export default {
    data() {
        return {
            form: {
                aa: null,
                hh: [{
                    ii: '',
                }]
            },
            configRule: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
            }
        }
    }
}
</script>
```





#### 复选框-拓展选中能力

点击复选框无法选中值：

```html
<div @click="handleChangeValue">
	<el-checkbox v-model="select" :true-label="1" :false-label="0" />
	<span>选中值</span>
</div>

<script>
function handleChangeValue() {
	if (this.select == 0) {
        this.select = 1
        // to other..
    } else {
        this.select = 0
    }
}
</script>
```

修复：

```html
<div>
	<el-checkbox :value="select" :true-label="1" :false-label="0" @change="handleChangeValue" />
	<span @click="handleChangeValue">选中值</span>
</div>

<script>
function handleChangeValue() {
	if (this.select == 0) {
        this.select = 1
        // to other..
    } else {
        this.select = 0
    }
}
</script>
```



#### el-popconfirm失效问题

在列表中新增项，刷新后，发现有的项点不出确认框；

要将 `v-if` 放在 `el-popconfirm` 上

```html
<el-popconfirm
    v-if="row.status == 2"
    title="确认禁用？"
    @confirm="todo"
>
    <template slot="reference">
        <el-button slot="reference" type="text" size="small"> 禁用 </el-button>
    </template>
</el-popconfirm>
```



#### 内容超出宽展示el-tooltip

```html
<el-tooltip :disabled="setDisable" :content="text">
    <p class="single-row" @mouseover="toolTipVisibleChange($event)">{{ text }}</p>
</el-tooltip>

<script>
const setDisable = ref(true)
function toolTipVisibleChange(event) {
    const ev = event.target
    const evWeight = ev.scrollWidth

    const contentWeight = ev.clientWidth
    if (evWeight > contentWeight) {
        // 实际宽度 > 可视宽度  文字溢出
        setDisable.value = false
    } else {
        // 否则为不溢出
        setDisable.value = true
    }
}
</script>

<style lang="scss" scoped>
.single-row {
    width: 240px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
```



#### 列表搜索展开收起
> 让搜索按钮组，每次都出现在额外行的最后一位。
```html
<el-form class="list" label-width="80px">
    <el-form-item>...</el-form-item>
    <el-form-item>...</el-form-item>
    <el-form-item>...</el-form-item>
    <template v-if="isScreen">
        <el-form-item>...</el-form-item>
    </template>
    <el-form-item label-width="0" :class="{ 'fill-row': isScreen }">
        <div class="search-row">
            <!-- 查询、充值按钮 -->
            <!-- 展开收起 isScreen=!isScreen -->
        </div>
    </el-form-item>
</el-form>
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
    .fill-row {
        width: 100%;
        padding-right: 0 !important;
    }
    .search-row {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        text-align: right;
    }
}
```



#### 修复 el-badge 不圆

```css
// 官方默认的盒子类型
.el-badge__content.is-fixed {
    box-sizing: content-box;
}
```



#### el-table 暂无数据居中

```css
.el-table__empty-block {
    width: 100% !important;
}
```



#### 嵌套弹窗、后续弹窗遮罩层没遮住首个弹窗

```html
<el-table />
<el-table
  :append-to-body="true"
/>
```



#### 表单-规则切换

```html
<el-form ref="ruleForm" :model="form" :rules="rules" />

<script>
export default {
    data () {
        return {
            useRulesFirst: true,
            commonRules: {
                name: [{ required: true, message: '请选择名称', trigger: 'change' }],
                sort: [{ required: true, message: '请选择分类', trigger: 'change' }],
            },
            haoTaitaiRules: {
                name: [{ required: true, message: '请选择名称', trigger: 'change' }],
                goodsNo: [{ required: false, message: '请填写编号', trigger: 'blur' }]
            },
        }
    },
    computed: {
        rules() {
            if (!this.useRulesFirst) {
                return this.commonRules
            } else {
                return this.haoTaitaiRules
            }
        },
    },
    methods: {
        showDialog() {
            this.$nextTick(() => {
                if (this.$refs['ruleForm']) {
                    this.$refs['ruleForm'].resetFields()
                }
            })
        },
    },
}
</script>
```



#### 选项禁止重复选

> 这里选项为多选

```html
<div v-for="(item, index) in form.zzz">
    <el-select
        v-model="item.qqq"
        placeholder="请选择适用的一级品类"
        multiple
        collapse-tags
        clearable
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="checkDisabled(item, index)"
        />
    </el-select>
</div>
    
<script>
export default {
    data() {
        return {
            options: serviceCategory, //订单品类
            form: {
                zzz: [
                    {
                        qqq: null,
                        www: ''
                    }
                ]
            },
        }
    },
    methods: {
        checkDisabled(option, i) {
            const selectCateIdList = this.form.zzz.reduce((pre, item, index) => {
                if (i !== index) {
                    return [
                        ...pre,
                        ...(item.qqq || [])
                    ]
                // 当前控件不需禁用
                } else {
                    return pre
                }
            }, [])

            if (selectCateIdList.includes(option.value)) {
                return true
            }
            return false
        }
    }
}
</script>
```



#### el-table flex:1 仍超长

https://zhuanlan.zhihu.com/p/649052365

```diff
.table-wrap {
    flex: 1;
+   min-width: 0;
}
```



#### 禁用2023-今年外的年份

```html
<el-date-picker
    value-format="yyyy"
    format="yyyy"
    :picker-options="pickerOptions"
></el-date-picker>

<script>
export default {
    data() {
        pickerOptions: {
            disabledDate(time) {
                // 获取当前年份
                const currentYear = new Date().getFullYear()
                // 设置最小年份和最大年份
                const minYear = 2023 // 最小年份
                const maxYear = currentYear // 最大年份
                // 将时间转为年份
                const year = time.getFullYear()
                // 禁用超出范围的日期
                return year < minYear || year > maxYear
            },
        },
    }
}
</script>
```



#### 超出字数溢出隐藏&tooltip

```html
<el-tooltip effect="dark" :content="demoStr" placement="top" :disabled="v.length <= 11">
    <div>{{ treatTntercept(demoStr, 11) }}</div>
</el-tooltip>
```

```javascript
function treatTntercept(text, len) {
    if (!text || !text.length) {
        return text
    }
    if (text.length <= len) {
        return text
    } else {
        return `${text.substring(0, len)}...`
    }
}
```


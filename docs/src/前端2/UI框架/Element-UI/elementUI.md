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

> 后面试试里面的弹窗加 `model=false` 试试



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



#### el-date-picker 同时禁用日期和时间

```html
<el-date-picker
    v-model="demo"
    type="datetime"
    placeholder="选择日期时间"
    :picker-options="pickerOptions"
/>
```

```javascript
data() {
    return {
        demo: '',
        pickerOptions: {
            disabledDate: () => {
                const r = Math.random()
                if (r > 0.5) {
                    return true
                }
            },
            // el-time-picker 中的配置，可以在这里生效
            selectableRange: ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        }
    }
}
```



#### el-date-picker 禁用过去的时间

```html
<el-date-picker
    v-model="demo"
    type="datetime"
    placeholder="选择日期时间"
    :picker-options="pickerOptions"
/>
```

```javascript
pickerOptions: {
    disabledDate: time => {
        // return time.getTime() < Date.now(); // 当天不可选
        return time.getTime() < new Date().getTime() - 86400000 //  - 86400000是否包括当天
    },
    selectableRange: (() => {
        const data = new Date()
        const hour = data.getHours()
        const minute = data.getMinutes()
        const second = data.getSeconds()
        return [`${hour}:${minute}:${second} - 23:59:59`]
    })()
}
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



#### 选项联动文本

![image-20240816102407741](https://raw.githubusercontent.com/SpringLoach/img_store/main/img/image-20240816102407741.png)

```javascript
handleSelectItem(flag, item) {
    const combineText = `${item.label}（${item.remark}）；`
    // 选中处理
    if (flag) {
        // 已经有内容时，才需要加入换行符
        let newContent = ''
        if (this.form.yy) {
            newContent = this.form.yy + `\n${combineText}`
        } else {
            newContent = this.form.yy + `${combineText}`
        }
        if (newContent.length > 200) {
            this.$message.warning('文本长度即将超出限制，内容添加失败')
        } else {
            this.form.yy = newContent
        }
    }
    // 选择选项添加
    // 取消处理
    if (!flag) {
        if (this.form.yy.indexOf(combineText) != -1) {
            // 首行还需要将（如果存在）下一行的起始换行符去掉
            if (this.form.yy.indexOf(combineText) == 0) {
                const temp = this.form.yy.replace(new RegExp(`${combineText}\n`, 'g'), '')
                this.form.yy = temp.replace(new RegExp(combineText, 'g'), '')
            } else {
                const temp = this.form.yy.replace(new RegExp(`\n${combineText}`, 'g'), '')
                this.form.yy = temp.replace(new RegExp(combineText, 'g'), '')
            }
        }
    }
}
```



#### el-input 文本域换行

```javascript
const remark = '一些内容'
this.value = `\n${remark}`
```



#### el-popover 设置多个自定义类名

```html
<el-popover popper-class="a b"></el-popover>
```



#### el-popover 右侧悬浮间隙大易消失问题

> 添加一个透明内容

```html
<el-popover popper-class="right-popver" placement="right"></el-popover>

<style lang="scss">
.right-popver {
    &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -12px;
        z-index: 3;
        width: 12px;
        height: 100%;
        background-color: transparent;
        background-color: red;
        transform: translateY(-50%);
    }
}
</style>
```



#### el-popper 设置最大宽度

> 想要实现宽度自适应，且存在最大宽度的效果，但是设置为 `width: auto` 后发现不生效

```html
<el-popover
    placement="top-start"
    trigger="hover"
    popper-class="diy-popper"
>...</el-popover>
```

```css
.diy-popper.el-popper {
    max-width: 613px !important;
    width: fit-content !important;
}
```



#### el-table 适配不同宽度

在容器宽度较小时x列不至于换行/过窄，在宽度较大时x列能够自动适配为合适宽度

```html
<el-table>
    <el-table-column prop="id" label="编号" min-width="200" />
</el-table>
```



#### el-checkbox 实现三层嵌套

> 最上层为全选，第二层为商品名称，第三层为商品规格

**交互梳理**

1. 需要在第一层添加一级添加绑定(选中)值和半选态（记录其下的二级是否全部<span style="color: red">完全选</span>）、二级映射数组（用于记录其下二级的选中情况）
2. 需要在第二次添加半选态（记录其下的三级是否全选）、三级映射数组（用于记录其下三级的选中情况）

当三级选择改变时

- 改变二级选择的状态

  - 如果三级全选，那么二级半选设置为false，二级映射数组中需要加入该二级
  - 如果三级半选，那么二级半选设置为true，二级映射数组中需要加入该二级
  - 如果三级未选，那么二级半选设置为false，二级映射数组中需要移除该二级

- 重新计算一级选择态

  - 重新设置一级添加绑定值
    - 遍历其下的二级，如果其上的三级映射数组为全选，当前二级标识为pass，判断pass的二级标识是否等于二级总数量

  - 重新设置一级半选态
    - 一级添加绑定值为 false && 二级映射数组非空

当二级选择改变时

> 经测试，会先执行 `el-checkout` 上的 `@change` ，再执行 `el-checkbox-group` 上的 `@change`

- 处理二级映射数组、二级半选态、三级、三级映射数组
  - 首先，如果本身半选，那么三级全部选中，二级半选设置为false，二级映射数组中需要加入该二级
  - 否则，如果本身全选，那么三级进行清空，二级半选设置为false，二级映射数组中需要移除该二级
  - 否则，如果操作结果为选中，那么三级全部选中，二级半选设置为false
  - 如果都不满足，将三级全部清空，二级半选设置为false

- 重新计算一级选择态（跟上面同一个方法）

当一级选择改变时

- 一级半选设置为false
- 如果操作结果为选中
  - 二级映射数组全选，二级半选设置为false，三级映射数组全选
- 如果操作结果为未选
  - 二级映射数组清空，二级半选设置为false，三级映射数组清空



**数据结构**

> 实际上我这里遇到的数据结构要更复杂，分为了商品一/二/三级品类/服务类型四个层级的结构（还有全选二级品类功能夹在中间），但是通过重新赋值变量，在后续的处理中都不需要担忧双向绑定的问题；
>
> 唯一需要注意的是，在给列表遍历添加对象属性时，记得使用深拷贝以避免相互的影响；
>
> 这里以更通俗易懂的模型作为展示，但原理是一样的。

```javascript
{
    label: '家具类',
    checkAll: false, // 一级绑定值
    indeterminate: false, // 一级是否半选
    goodsIds: ['94507'], // 二级映射数组，即选中商品的id列表
    goodsList: [], // 商品列表，即下面的一层
}
```

```javascript
[
	...,
    {
      goodsId: '94507', // 商品id
      goodsName: '星之灯具', // 商品名称
      specList: [
        { specName: '1个灯', specId: '1911' },
        { specName: '2个灯', specId: '1912' },
      ], // 规格列表
      indeterminate: false, // 二级是否半选
      mapArr: [], // 三级映射数组，即选中规格的id列表
    }
]
```



**标签结构**

> 通过设置 `font-size` 的样式可以在 `el-checkbox-group` 中显示其他元素；这里省略了事件。

```html
<el-checkbox
    v-model="checkAll"
    :indeterminate="indeterminate"
>
    全选
</el-checkbox>
<el-checkbox-group v-model="goodsIds">
    <div
        v-for="(goodsObj, i) in goodsList"
        :key="goodsObj.goodsId"
        style="font-size: 14px"
    >
        <el-checkbox
            :label="goodsObj.goodsId"
            :indeterminate="goodsObj.indeterminate"
            >{{ goodsObj.goodsName }}
        </el-checkbox>
        <span>选择规格：</span>
        <el-checkbox-group
            v-model="goodsObj.mapArr"
        >
            <el-checkbox
                v-for="specObj in goodsObj.specList"
                :key="specObj.specId"
                :label="specObj.specId"
                >{{ specObj.specName }}</el-checkbox
            >
        </el-checkbox-group>
    </div>
</el-checkbox-group>
```



#### el-table 样式调整

> 标题内容居中、空数据样式、最大高度限制

```html
<el-table
    class="diy-table"
    :data="tableData"
    border
    stripe
    max-height="400"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
>
    <div slot="empty" class="empty-box">
        <img :src="require('@/assets/images/empty.png')" />
        <span class="empty-text">暂无数据</span>
    </div>
    <el-table-column property="noteName" label="姓名" />
    <el-table-column property="createTime" label="日期" />
    <el-table-column width="230" property="noteContent" label="备注" />
</el-table>
```

```less
.diy-table {
    ::v-deep .el-table__empty-block {
        width: 100% !important;
    }
    .empty-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 0 22px;
        img {
            width: 160px;
            height: 160px;
        }
        .empty-text {
            margin-top: 8px;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            color: #8e8e93;
        }
    }
}
```


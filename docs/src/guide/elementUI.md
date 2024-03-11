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



#### 级联选择器多次点击导致页面奔溃问题

https://mybj123.com/18067.html



#### 自定义el-progress(vue3)

![image-20240109103157732](./img/diy-el-progress.png)

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

```vue
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


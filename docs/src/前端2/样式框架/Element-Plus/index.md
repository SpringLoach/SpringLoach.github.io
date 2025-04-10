#### 结合 dayjs 实现时间范围最多选择7天

[vue3-element-plus中日期时间选择器（范围）限制选择天数（30天为例）](https://blog.csdn.net/wzyleix97/article/details/127259531)

```html
<el-date-picker
    v-model="formState.receiveTimeRange"
    style="width: 100%"
    type="datetimerange"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    valueFormat="YYYY-MM-DD"
    :disabledDate="disabledDate"
    @calendar-change="handleCalendarChange"
    @change="handleTimeChange"
/>
```

```javascript
import dayjs from 'dayjs'

const tempStartDate = ref(null)
const formState = ref({
    receiveTimeRange: [],
})

function disabledDate(date) {
    if (tempStartDate.value) {
        const startDate = dayjs(tempStartDate.value);
        const minDate = startDate.subtract(6, 'day');
        const maxDate = startDate.add(6, 'day');
        return date < minDate || date > maxDate;
    }
    return false
}

function handleTimeChange(e) {
    if (!e) {
        tempStartDate.value = null
    }
}

function handleCalendarChange(e) {
    if (e[0]) {
        tempStartDate.value = e[0]
    }
}
```




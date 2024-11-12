### 自定义输入文本域ui

> 随输入字数定制统计字数颜色

![](https://raw.githubusercontent.com/SpringLoach/img_store/main/img/[css]自定义输入文本域.png)

```html
<van-field
    class="content-input"
    v-model="form.content"
    rows="1"
    autosize
    type="textarea"
    label-width="0"
    placeholder="请输入"
    maxlength="200"
    show-word-limit
    :autosize="{ minHeight: 80 }"
/>

<script>
export default {
	methods: {
        setLimitColor(newVal) {
            const len = newVal.length
            const isExit = document.getElementsByClassName('content-input').length
            if (isExit) {
                const inputEl = document.getElementsByClassName('content-input')[0]
                const targetEl = inputEl.getElementsByClassName('van-field__word-num')[0]
                targetEl.style.color = len === 0 ? '#C2C2CC' : len === 200 ? '#ee0a24' : '#8E8E93'
            }
        }
    },
        watch: {
        	'form.content': 'setLimitColor'
    }
}
</script>

<style lang="scss" scoped>
.content-input ::v-deep {
    border-radius: 10px;
    background: #f2f2f7;
    textarea {
        font-family: PingFangSC, PingFang SC;
        font-size: 28px;
        line-height: 42px;
        font-weight: 400;
        color: #3a3a3c;
        &::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            color: #999999;
        }
        &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #999999;
        }
        &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #999999;
        }
        &:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #999999;
        }
    }
    .van-field__word-limit {
        font-family: PingFangSC, PingFang SC;
        font-size: 28px;
        line-height: 42px;
        font-weight: 400;
        color: #c2c2cc;
    }
}
</style>
```



### 背景图-弹窗

> 圆角对齐

`h5`

```html
<van-popup v-model="officialAccountPopupShow" :style="{ 'border-radius': '4px', background: 'transparent' }">
...
</van-popup>

<style>
.official-account-box {
    position: relative;
    width: 600px;
    height: 800px;
    background-image: url(https://xx.png);
    background-size: 100%, 100%;
}
</style>
```

`wechat`

```html
<van-popup
    show="{{ showOfficialAccountPopup }}"
    custom-style="border-radius: 20rpx;background: transparent;"
>
...
</van-popup>
```



### 组件样式出错

> vant 同时使用按需自动引用 / 手动引用组件样式，会导致样式的优先级改变

```
.van-popup {} // 白色背景
.van-toast {} // 黑色背景
```

`示例`

最后排查，是由于手动引入了组件，导致出现样式问题： 

`main.ts`

```javascript
import { ImagePreview } from 'vant';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 图片预览
app.use(ImagePreview);
```



### van-field 设置最小最大高度

> 根据设计稿 `1rem=75px`，而 vant 内部设置 `1rem=37.5px` 把对应的数值调整小一半就可以了

```html
<van-field
    type="textarea"
    :autosize="{ maxHeight: 200, minHeight: 120 }"
/>
```



### van-field 绑定失效

> 使用 `v-model` 绑定的字段，一开始都是正常双向绑定，后续在更新列表数据时，绑定失效；
>
> 排错：列表key值不唯一导致。



### van-popup 修改自带关闭按钮样式

> h5

```html
<van-popup
    v-model="popupShow"
    class="demo-popup"
    closeable
    close-icon="https://xx.png"
>
...
</van-popup>

<style lang="scss" scoped>
.demo-popup ::v-deep {
    border-radius: 18px 18px 0 0;
    .van-popup__close-icon {
        top: 38px;
        right: 24px;
        font-size: 0; // 重要
        img {
            width: 36px;
            height: 36px;
        }
    }
}
</style>
```






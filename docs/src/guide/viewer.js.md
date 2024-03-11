### 中文非官方文档

https://mirari.cc/posts/v-viewer



### 点击一张图，预览多张图

```html
<div v-viewer.static="{ inline: false }" class="img-con">
    <template v-for="(img, index) in item.linksArr">
        <img v-show="index == 0" :src="img | imgPrefix" alt="" />
    </template>
</div>
```



### 函数式调用

> 点击查看按钮，查看图片列表

```html
<button @click="toViewPic"></button>
<viewer ref="viewer" style="display: none" :images="picArr">
    <img v-for="(src, index) in picArr" :key="index" :src="src" />
</viewer>

<script>
export default {
    methods: {
        toViewPic() {
            this.$refs.viewer.$viewer.view(0)
        }
    }
}
</script>
```



### 组件

#### 图片列表-带预览

> 可以通过 `initial-index` 初始化第一张预览图片的位置

```html
<el-image
    v-for="(imgSrc, index) in picList"
    :key="imgSrc"
    class="preview-img"
    :src="imgSrc"
    :preview-src-list="picList"
    :initial-index="index"
/>
```

```less
.el-image + .el-image {
    margin-left: 0;
}
.preview-img {
    cursor: pointer;
    vertical-align: middle;
    width: 70px;
    height: 70px;
    margin-right: 10px;
    margin-bottom: 8px;
    border-radius: 6px;
    ::v-deep img {
        object-fit: cover;
    }
}
```

#### 信息展示弹窗

```
src\views\order-detail\components\lock-measure-info.vue
```


### swiper

[相关文档](https://www.swiper.com.cn/api/start/new.html)

Swiper 使用<span style="color: #ff0000">类名</span>来添加样式和功能，如默认容器使用 `.swiper-container`（Swiper 7 以上使用 `swiper`）



#### 例子

这里按规定，需要用到的类名有 `.swiper-container`、`.swiper-wrapper`、`.swiper-slide`；

左箭头使用 `.swiper-button-prev`，如果放置在swiper外面，要使用别的类名并自定义样式；

下面的 `xxSwiper` 是自定义的容器 id，可以任意修改。

```html
<template>
    <div class="theme-main">
        <!-- 左箭头 -->
        <img
            class="arrow swiper-button-prev-diy"
            src="https://osscdn.lbdj.com/J/G/G-A/devCustom/20240903/originalityPage-2/arrow-left.png"
        />
        <!-- 轮播区域 -->
        <div id="xxSwiper" class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="item in imgList" :key="item" class="swiper-slide">
                    <img :src="item" />
                </div>
            </div>
        </div>
        <!-- 右箭头 -->
        <img
            class="arrow swiper-button-next-diy"
            src="https://osscdn.lbdj.com/J/G/G-A/devCustom/20240903/originalityPage-2/arrow-right.png"
        />
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
    data() {
        return {
            imgList: [
                'https://lbdj.oss-cn-beijing.aliyuncs.com/upload/order/2023-09-26-01-53-24/AF52259299B0F83CFD2D6420E4C63E43/mmexport1695013303789(1).jpg',
                'https://lbdj.oss-cn-beijing.aliyuncs.com/resource/attch/20231101/490C19CA4F0A6BF136BF0BF5DE29EABA.jpg',
                'https://lbdj.oss-cn-beijing.aliyuncs.com/upload/order/2023-10-31-08-22-51/99C3A77D25B3961A3047954D3F385AD1/570KB.jpg'
            ]
        }
    },
    mounted() {
        new Swiper('#xxSwiper', {
            autoplay: {
                delay: 3000, // 自动播放间隔时间，单位为毫秒
                disableOnInteraction: false // 用户操作后是否停止自动播放，默认为true，设为false则不会停止
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next-diy',
                prevEl: '.swiper-button-prev-diy'
            },
            centeredSlides: true, // 居中显示正在展示的slide，默认是居左对齐。
            initialSlide: 0, // 初始化时slide的索引
            slidesPerView: 1 // 一次显示多少个 slide，这里因为 coverflowEffect子参数设定，设置为3的时候是不能够充满父盒子的，所以要比真正显示的盒子少才行。
        })
    }
}
</script>

<style lang="scss" scoped>
.theme-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 320px;
    margin: 0 24px;
    .arrow {
        width: 64px;
        height: 64px;
    }
    .swiper-slide {
        width: 574px;
        height: 320px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
```




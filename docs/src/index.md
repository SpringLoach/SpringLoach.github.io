---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "power"
  text: "Accumulate Steadily"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Guide
      link: /guide/待整理
    - theme: alt
      text: Business
      link: /business/test

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elitpafusa
---



`<T>`

索引不到的图片路径

索引不到的导航路径（常见未加#）

未加后缀的图片引入





新的页面布局如何，包含哪些模块

参考[其他文档](https://vitepress.dev/zh/guide/what-is-vitepress#use-cases)

三级

一级：顶部导航栏，可以设置分组

二级：侧边栏，可以设置分组、折叠分组

三级：文件内的标题导航栏



business、前端、后端、编程相关、其他



原生技术【√】

css、js、json、ts



素养基石【√】

算法、网络



方法梳理【√】

原生部分、依赖三方



开发工具 技术框架 工程化 其他（第三方库、调试、烤面筋、+文档参考）



res：业务实现

【技术框架】技术框架 第三方库 +文档参考

【开发工具】开发工具 工程化 其他（调试）【√】

【相关技能】编程相关、烤面筋(Q)

其他





```html
<template>
    <div class="uploadimage-copy">
        <div class="clipboard-title">粘贴图片</div>
        <div
            class="clipboard"
            contenteditable="true"
            title="鼠标点击后CTRL+V粘贴图片上传"
            placeholder="123"
            @click.stop="clipboardClick($event)"
            @paste="pasterHandler($event)"
            @input="clipboardInput($event)"
        ></div>
    </div>
</template>

<script>
export default {
    methods: {
        clipboardClick(event) {
            //
        },
        // 禁止输入任何文本
        clipboardInput(event) {
            //
            event.target.innerText = ''
        },
        pasterHandler(event) {
            const items = (event.clipboardData && event.clipboardData.items) || []
            let file = null
            if (items && items.length) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        file = items[i].getAsFile()
                        break
                    }
                }
            }
            if (file) {
                this.pasterImgHandler(file)
            }
            // 阻止默认行为即不让剪贴板内容在div中显示出来
            event.preventDefault()
        },
        // 处理
        pasterImgHandler(file) {
            const reader = new FileReader()
            reader.addEventListener('load', e => {
                //
                const result = e.target.result
                const newFile = this.dataURLtoFile(result, file.name)
                // 上传校验文件逻辑，略
                this.imgUpload(newFile)
            })
            if (file) {
                reader.readAsDataURL(file)
            }
        },
        dataURLtoFile(dataurl, filename) {
            let arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, { type: mime })
        }
    }
}
</script>

<style lang="scss">
.uploadimage-copy {
    position: relative;
    border: none;
    .clipboard-title {
        overflow: hidden;
        width: 100px;
        height: 28px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 28px;
        color: #b7bcc4;
    }
    .clipboard {
        position: relative;
        top: -29px;
        overflow: hidden;
        width: 100px;
        height: 28px;
        line-height: 28px;
        color: #999;
    }
}
</style>

```


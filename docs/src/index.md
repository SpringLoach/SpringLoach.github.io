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

图片大小写不对





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



**自动化脚本**

z_newBranch.sh

```sh
#!/bin/bash
target_branch=branch_name

#create new branch from master
if [ true ]
then
	git checkout .				     # 丢弃本地修改
	git switch master                # 切换到主干
	git pull                         # 从远程拉取最新代码到本地
	git checkout -b ${target_branch} # 克隆最新主干分支
    echo "success!!"
else
	echo "sorry, program operation requires specifying parameters"
fi
```

z_mergeToTest.sh

```sh
#!/bin/bash

target_branch=test_11.2
current_branch=$(git branch --show-current)
#Push local branch to test branch
if [ true ]
then
	git checkout .				           # 丢弃本地修改
	git switch ${target_branch}            # 切换到测试分支
	git pull                               # 从远程拉取最新代码到本地
	git merge ${current_branch} --no-edit  # 将本地原分支合并到测试分支-不加评价
    echo "操作成功，请查看是否存在冲突，并自行推送"
else
	echo "sorry, program operation requires specifying parameters"
fi
```





粘贴图片示例

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
                // 触发事件
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
        },
        imgUpload(file) {
            console.log('file--', file)
        }
    }
}
</script>

<style lang="scss">
.uploadimage-copy {
    position: relative;
    border: none;
    text-align: center;
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

上传校验图片逻辑

```javascript
imgUpload(file) {
    // 配置
    const typeArr = ['png', 'jpg', 'gif', 'jpeg']
    const fileSize = 10240
    const compress = true
    // 图片大小校验
    if (file.size / 1024 > fileSize) {
        alert('亲,图片不能超过!' + fileSize / 1024 + 'M')
        return false
    }
    // 图片格式校验
    const alltype = file.name.split('.')
    const type = alltype[alltype.length - 1].toLowerCase()
    if (typeArr && typeArr.indexOf(type) == -1) {
        alert('上传图片格式不支持!请选择' + typeArr)
        return false
    }

    // 参数指定不压缩或者图片大小少于100Kb不压缩
    if (compress == false || file.size / 1024 < 100) {
        // 上传流程 略
    } else {
        // 压缩处理 略
        // this.imgPreview(file)
    }
}
```



压缩处理

```javascript
methods: {
    // 预处理图片(压缩)
	imgPreview(file) {
        const imgName = file.name //原图片名字
        const self = this
        if (!file || !window.FileReader) {
            return
        }
        if (/^image/.test(file.type)) {
            const reader = new FileReader()
            reader.readAsDataURL(file) // 将图片转成base64格式
            reader.onloadend = function () {
                const result = this.result
                const img = new Image()
                img.src = result
                img.onload = function () {
                    const data = self.compressImg(img) // 压缩图片
                    const newFile = self.dataURLtoFile(data, file.name)
                    console.log('====-----newFile2 -----====', newFile)
                }
            }
        }
    },
    // 压缩图片
    compressImg(img) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        //瓦片canvas
        const tCanvas = document.createElement('canvas')
        const tctx = tCanvas.getContext('2d')
        let width = img.width
        let height = img.height
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio
        //
        if ((ratio = (width * height) / 4000000) > 1) {
            //
            ratio = Math.sqrt(ratio)
            width /= ratio
            height /= ratio
        } else {
            ratio = 1
        }
        canvas.width = width
        canvas.height = height
        // 铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //如果图片像素大于100万则使用瓦片绘制
        let count
        if ((count = (width * height) / 1000000) > 1) {
            //
            count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
            // 计算每块瓦片的宽和高
            const nw = ~~(width / count)
            const nh = ~~(height / count)
            tCanvas.width = nw
            tCanvas.height = nh
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height)
        }
        //进行最小压缩
        const ndata = canvas.toDataURL('image/jpeg', 0.6)
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
        return ndata
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
},
```


### html2Canvas生成图片并下载

```javascript
import html2canvas from 'html2canvas'

async function canvasImageToDownload(fileName, element) {
    // canvas元素
    const canvas = await html2canvas(element, {
        allowTaint: true, // 允许渲染跨域图片
        scale: 2,
        useCORS: true, // 允许跨域
        dpi: window.devicePixelRatio * 2, // 处理模糊问题
        removeContainer: true,
        onrendered(canvas) {
            // 关闭抗锯齿
            const context = canvas.getContext('2d')
            context.mozImageSmoothingEnabled = false
            context.webkitImageSmoothingEnabled = false
            context.msImageSmoothingEnabled = false
            context.imageSmoothingEnabled = false
            document.body.appendChild(canvas)
        },
    })
    // 将canvas转换为Base64编码的图像
    const dataURL = canvas.toDataURL('image/png', 1.0)
    // 将Base64编码转换为Blob对象
    const blob = dataURLToBlob(dataURL)
    // 创建下载链接并触发下载
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}
```



#### 相关资料

**控制图像的缩放行为**

过度缩放图像可能会导致图像模糊或像素化。您可以通过使用绘图环境的imageSmoothingEnabled属性来控制是否在缩放图像时使用平滑算法。默认值为true，即启用平滑缩放。同时也可以像这样禁用此功能：

```javascript
// Gecko内核
ctx.mozImageSmoothingEnabled = false;
// WebKit内核
ctx.webkitImageSmoothingEnabled = false;
// Trident内核
ctx.msImageSmoothingEnabled = false;
// 标准
ctx.imageSmoothingEnabled = false;
```

**进阶的清晰度优化方案**

http://www.360doc.com/content/23/0720/11/12185854_1089341734.shtml

**相关文档**

https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
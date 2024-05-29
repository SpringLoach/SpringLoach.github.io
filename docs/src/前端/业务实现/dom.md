### 修改dom中子元素的所在位置

> 将公共组件中的上传按钮由置后改为置前
>
> 场景：成功上传后，会展示新添加的图片；添加N个图片后，上传按钮消失。

```html
<div class="uploadImg">
    <div class="img-list"></div>
	<div id="upload-control"</div>
</div>
```
```javascript
data() {
    return {
        reverse: true
        observer: null
    }
},
mounted() {
    if (this.reverse) {
        const fatherEl = document.getElementsByClassName('uploadImg')[0]

        // 创建一个MutationObserver实例
        this.observer = new MutationObserver((mutationsList, observer) => {
            // 处理变化
            for (let mutation of mutationsList) {
                // 元素的子节点发生变化
                if (mutation.type === 'childList') {
                    // 判断第一个节点是否为上传dom
                    const firstChild = fatherEl.children[0]
                    const uploadIsFirstChild = firstChild.getAttribute('id') == 'upload-control'
                    if (uploadIsFirstChild) {
                        return
                    }
                    // 上传按钮是否存在（是否需要处理）
                    const targerEl = fatherEl.querySelectorAll('#upload-control')[0]
                    if (!targerEl) {
                        return
                    }
                    // 先从原始位置删除该子节点
                    fatherEl.removeChild(targerEl);

                    // 再根据目标索引重新插入该子节点
                    fatherEl.insertBefore(targerEl, fatherEl.children[0]);
                }
            }
        })
        // 配置观察器
        const config = { childList: true };
        
        // 开始观察目标元素
        this.observer.observe(fatherEl, config);
    }
},
beforeDestory() {
    if (this.observer) {
        // 停止观察
        this.observer.disconnect()
    }
}
```

观察选项可以配置观察元素属性、子元素、元素内容等



### div监听onfocus和onblur

https://blog.csdn.net/weixin_43877799/article/details/121287494


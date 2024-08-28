### 判断两个元素有没有接触或有重合的部分



```javascript
function isOverlap(element1, element2) {
    // 获取元素1的边界矩形
    const rect1 = element1.getBoundingClientRect();
    // 获取元素2的边界矩形
    const rect2 = element2.getBoundingClientRect();

    // 判断两个矩形是否有重合
    const overlap = !(rect1.right < rect2.left || 
                     rect1.left > rect2.right || 
                     rect1.bottom < rect2.top || 
                     rect1.top > rect2.bottom);

    return overlap;
}

// 示例：获取两个元素
const element1 = document.getElementById('element1');
const element2 = document.getElementById('element2');

// 判断是否重合
if (isOverlap(element1, element2)) {
    console.log('元素重合或接触');
} else {
    console.log('元素没有重合');
}
```

`getBoundingClientRect()` 方法返回一个 DOMRect 对象，包含元素的大小及其相对于视口的位置（left、top、right、bottom）。
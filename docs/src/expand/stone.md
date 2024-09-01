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





### todo

```html
<template>
    <div id="game-area">
        <div
            ref="blockRef"
            class="block1"
            :style="{ left: `${position.left}px`, top: `${position.top}px` }"
        ></div>
        <div ref="masterRef" class="master"></div>
        <div class="obstacle obstacle1"></div>
        <div class="obstacle obstacle2"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            position: {
                left: 0,
                top: 0
            },
            xTimer: null,
            yTimer: null,
            xWay: 1, // -1-左 1-右
            yWay: 1, // -1-上 1-下
            keyState: {},
            elInfo: {
                width: 0,
                height: 0
            },
            boxInfo: {},
            obstaclesRects: [],
            contactTimer: null
        }
    },
    computed: {},

    created() {
        this.initPress()
    },
    mounted() {
        const rect = this.$refs.blockRef.getBoundingClientRect()
        console.log('====-----rect-----====', rect)
        this.elInfo = rect

        /* 画布容器 */
        const boxRect = document.getElementById('game-area').getBoundingClientRect()
        this.boxInfo = boxRect
        console.log('====-----boxInfo-----====', this.boxInfo)

        this.contactTimer = setInterval(() => {
            // this.judgeContact()
            this.judgeTouch()
        }, 50)
    },

    methods: {
        initPress() {
            document.addEventListener('keydown', this.controlDir)
            document.addEventListener('keyup', this.controlDirStop)
        },
        controlDir(event) {
            if (this.keyState[event.key]) {
                return
            }
            // vue3
            // this.$set(this.keyState, event.key, 1)
            this.keyState[ event.key] = 1
            switch (event.key) {
                case 'ArrowLeft': // 左
                    this._controlDir('x', -1)
                    break
                case 'ArrowUp': // 上
                    this._controlDir('y', -1)
                    break
                case 'ArrowRight': // 右
                    this._controlDir('x', 1)
                    break
                case 'ArrowDown': // 下
                    this._controlDir('y', 1)
                    break
                default:
                    break
            }
        },
        /**
         * @param axis 'x' 'y'
         * @param way -1 1
         */
        _controlDir(axis, way) {
            const timerMap = {
                x: 'xTimer',
                y: 'yTimer'
            }
            const positionAttributeMap = {
                x: 'left',
                y: 'top'
            }
            const wayMap = {
                x: 'xWay',
                y: 'yWay'
            }
            const valueMap = {
                '-1': -1,
                1: 1
            }
            const timerStr = timerMap[axis]
            const wayStr = wayMap[axis]
            const positionAttrStr = positionAttributeMap[axis]

            clearInterval(this[timerStr])
            this[wayStr] = way
            this[timerStr] = setInterval(() => {
                // 越界限制
                if (positionAttrStr == 'left' && way == -1) {
                    if (this.position[positionAttrStr] <= 0) {
                        return
                    }
                }
                if (positionAttrStr == 'top' && way == -1) {
                    if (this.position[positionAttrStr] <= 0) {
                        return
                    }
                }
                if (positionAttrStr == 'left' && way == 1) {
                    if (this.elInfo.width + this.position[positionAttrStr] >= this.boxInfo.width) {
                        return
                    }
                }
                if (positionAttrStr == 'top' && way == 1) {
                    if (
                        this.elInfo.height + this.position[positionAttrStr] >=
                        this.boxInfo.height
                    ) {
                        return
                    }
                }

                this.position[positionAttrStr] = this.position[positionAttrStr] + valueMap[way]
            }, 10)
        },
        controlDirStop(event) {
            this.keyState[event.key] = 0
            switch (event.key) {
                case 'ArrowLeft': // 左
                    this._controlDirStop('x', -1)
                    break
                case 'ArrowUp': // 上
                    this._controlDirStop('y', -1)
                    break
                case 'ArrowRight': // 右
                    this._controlDirStop('x', 1)
                    break
                case 'ArrowDown': // 下
                    this._controlDirStop('y', 1)
                    break
                default:
                    break
            }
        },
        /**
         * @param axis 'x' 'y'
         * @param way -1 1
         */
        _controlDirStop(axis, way) {
            const timerMap = {
                x: 'xTimer',
                y: 'yTimer'
            }
            const wayMap = {
                x: 'xWay',
                y: 'yWay'
            }
            const timerStr = timerMap[axis]
            const wayStr = wayMap[axis]
            if (this[wayStr] === way) {
                clearInterval(this[timerStr])
            }
        },
        judgeContact() {
            const element1 = this.$refs.blockRef
            const element2 = this.$refs.masterRef

            // 判断是否重合
            if (this.isOverlap(element1, element2)) {
                console.log('元素重合或接触')
            } else {
                // console.log('元素没有重合')
            }
        },
        isOverlap(element1, element2) {
            // 获取元素1的边界矩形
            const rect1 = element1.getBoundingClientRect()
            // 获取元素2的边界矩形
            const rect2 = element2.getBoundingClientRect()

            // 判断两个矩形是否有重合
            const overlap = !(
                rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
            )

            return overlap
        },
        isOverlap2(element1, element2) {
            // 获取元素1的边界矩形
            const rect1 = element1.getBoundingClientRect()
            // 获取元素2的边界矩形
            const rect2 = element2.getBoundingClientRect()

            // 左右重合
            const condition1 = (rect1.left > rect2.left && rect1.left < rect2.right ) || rect1.left == rect2.left
            const condition2 = (rect1.right < rect2.right && rect1.right > rect2.left) || rect1.right == rect2.right
            // 上下重合
            const condition3 = (rect1.top > rect2.top && rect1.top < rect2.bottom) || rect1.top == rect2.top
            const condition4 = (rect1.bottom < rect2.bottom && rect1.bottom > rect2.top) || rect1.bottom == rect2.bottom

            const isTouch = (condition1 || condition2) && (condition3 || condition4)
            // 重置位置
            // 取上下、左右距离较小的一端还原
            if (isTouch) {
                let leftValue  = ''
                let topValue = ''
                let leftRelative = '' // 相对边距“嵌入”的距离
                let topRelative = ''
                // 目标可能在物体靠左/靠右一侧嵌入，判断离哪个方向更近，记录值和相对距离
                if (condition1 || condition2) {
                    console.log('左右重合')
                    const differ1 = rect2.right - rect1.left
                    const differ2 = rect1.right - rect2.left
                    if (differ1 > differ2) {
                        const targetValue = element2.offsetLeft - rect1.width - 1
                        leftRelative = this.position.left - targetValue
                        leftValue = targetValue
                    } else if (differ1 < differ2) {
                        const targetValue = element2.offsetLeft + rect2.width
                        leftRelative = this.position.left - targetValue
                        leftValue = targetValue
                    }
                }
                if (condition3 || condition4) {
                    console.log('上下重合')
                    const differ1 = rect2.bottom - rect1.top
                    const differ2 = rect1.bottom - rect2.top
                    if (differ1 > differ2) {
                        const targetValue = element2.offsetTop - rect1.height - 1
                        topRelative = this.position.top - targetValue
                        topValue = targetValue
                    } else if (differ1 < differ2) {
                        const targetValue = element2.offsetTop + rect2.height
                        topRelative = this.position.top - targetValue
                        topValue = targetValue
                    }
                }

                // x轴和y轴相对距离比较，还原改动较少的一侧的位置
                console.log('topValue', topValue)
                console.log('leftValue', leftValue)
                if (leftRelative === '') {
                    this.position.top = topValue
                    return
                }
                if (topValue === '') {
                    this.position.left = leftValue
                    return
                }
                if (Math.abs(leftRelative) > Math.abs(topRelative)) {
                    console.log('leftValue > topValue')
                    this.position.top = topValue
                } else {
                    console.log('leftValue < topValue')
                    
                    this.position.left = leftValue
                }
            }

            return isTouch
        },
        // 预先获取并缓存所有障碍物的矩形信息
        cacheObstaclesRects() {
            this.obstaclesRects = []
            const obstacles = document.querySelectorAll('.obstacle')
            obstacles.forEach((obstacle) => {
                this.obstaclesRects.push(obstacle.getBoundingClientRect())
            })
        },
        judgeTouch() {
            const element1 = this.$refs.blockRef
            const obstacles = document.querySelectorAll('.obstacle')
            for (let i = 0; i < obstacles.length; i++) {
                if (this.isOverlap2(element1, obstacles[i])) {
                    clearInterval(this.xTimer)
                    clearInterval(this.yTimer)
                    break
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
#game-area {
    width: 500px;
    height: 500px;
    border: 1px solid red;
    position: relative;
}
.block1 {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
}

// .master {
//     position: absolute;
//     top: 40px;
//     left: 100px;
//     width: 10px;
//     height: 20px;
//     border: 1px solid #ebebeb;
// }
.obstacle1 {
    position: absolute;
    top: 40px;
    left: 200px;
    width: 20px;
    height: 20px;
    background: green;
}
.obstacle2 {
    position: absolute;
    top: 90px;
    left: 120px;
    width: 60px;
    height: 80px;
    background: skyblue;
}
</style>

```


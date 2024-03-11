import DefaultTheme from 'vitepress/theme'
import './custom.css'


// todo 速改驼峰、大小写转换等
function initComputed() {
    setTimeout(() => {
        const btnEl = document.getElementById('computed-btn')
        const inputEl = document.getElementById('computed-textarea')
        const resultEl = document.getElementById('computed-result')
        if (btnEl) {
            btnEl.addEventListener('click', () => {
                
                console.log('====-----inputEl-----====', inputEl)
                console.log('====-----inputEl.value-----====', inputEl.value)
                // computed-result
                resultEl.innerHTML  = inputEl.value.toUpperCase()
            })
        }
    }, 500)
}


initComputed()

window.onload = function() {
    // 给顶部导航栏子项添加事件
    const aEls = document.getElementsByClassName("VPNavBarMenuLink");
    for (let aEl of aEls) {
        aEl.addEventListener("click", e => {
            if (location.pathname.indexOf('computed.html') != -1) {
                initComputed()
            }
        })
    }
}

export default DefaultTheme
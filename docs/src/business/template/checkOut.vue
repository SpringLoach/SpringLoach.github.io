<template>
    <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let value = ''

onMounted(() => {
    const record = sessionStorage.getItem('PASS')
    if (record) return

    const targetEl = document.getElementById('VPContent')
    targetEl.style.display = 'none'
    document.addEventListener('keydown', checkContent);
})
onUnmounted(() => {
    showContent()
    document.removeEventListener('keydown', checkContent);
})

function checkContent(event) {
    // 在这里编写处理键盘输入的代码
    value += event.keyCode
    if (value.indexOf('776583846982') != -1) {
        sessionStorage.setItem('PASS', true)
        showContent()
    }
}
function showContent() {
    const targetEl = document.getElementById('VPContent')
    targetEl.style.display = 'block'
}

</script>

<style scoped>
.form-item {
    margin: 10px 0;
    font-size: 14px;
    color: #a7a8aa;
}
.inline-input {
    border: 1px solid #dcdfe6;
}
.btn {
    margin-left: 10px;

}
</style>

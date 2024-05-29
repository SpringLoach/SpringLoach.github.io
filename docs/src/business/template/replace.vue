<template>
    <div>
        <textarea v-model="inputValue" class="operate-textarea" placeholder="需要进行替换的文本" />

        <div class="form-item">
            <span style="margin-right: 4px;">将</span>
            <input v-model="leftValue" class="inline-input" type="text">
            <span style="margin: 0 4px;">替换为</span>
            <input v-model="rightValue" class="inline-input" type="text">
        </div>

        <div>
            <button class="btn" @click="strToUpperCase">全局替换</button>
        </div>

        <div v-if="computedValue" class="result-wrap">
          {{ computedValue }}
          <span class="copy-btn" @click="copy(computedValue)">{{ copyText }}</span>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const inputValue = ref('')
const leftValue = ref('')
const rightValue = ref('')
const computedValue = ref('')
const copyText = ref('复制')

watch(computedValue, () => {
  copyText.value = '复制'
})

function strToUpperCase() {
  // computedValue.value = inputValue.value.replace(`/${leftValue.value}/g`, rightValue.value)

  // 转义正则表达式特殊字符的函数
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& 表示匹配到的子字符串
  }

  // 创建正则表达式
  let escapedUsername = escapeRegExp(leftValue.value);
  let regex = new RegExp(escapedUsername, 'g');

  // 使用 replace 方法进行替换
  computedValue.value = inputValue.value.replace(regex, rightValue.value);

}

function copy(text) {
  const url = text;
  // 新建一个文本框
  const oInput = document.createElement('input');
  // 赋值给文本框
  oInput.value = url;
  document.body.appendChild(oInput);
  // 选择对象;
  oInput.select();
  // 执行浏览器复制命令
  document.execCommand('Copy');
  // 复制完成删除掉输入框
  document.body.removeChild(oInput);
  // 复制成功提醒
  copyText.value = "√"
}
</script>

<style scoped>
.operate-textarea {
  width: 600px;
  height: 120px;
  border: 1px solid #dcdfe6;
}
.form-item {
    margin: 10px 0;
    font-size: 14px;
    color: #a7a8aa;
}
.inline-input {
    border: 1px solid #dcdfe6;
}
.result-wrap {
  position: relative;
  margin-top: 6px;
  border-radius: 4px;
  width: 600px;
  padding: 8px 30px 8px 12px;
  border: 1px solid #dcdfe6;
  word-break: break-all;
}
.copy-btn {
  cursor: pointer;
  position: absolute;
  right: 10px;
  color: #3451c3;
  font-size: 12px;
}
</style>

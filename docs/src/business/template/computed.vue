<template>
    <div>
        <textarea v-model="inputValue" class="operate-textarea" />

        <div>
            <button class="btn" @click="strToUpperCase">小写转大写</button>
        </div>

        <div>
            <button class="btn" @click="strToLowerCase">大写转小写</button>
        </div>

        <div>
          <button class="btn" @click="kebabToCamelOrReversal">驼峰-短横线互转</button>
        </div>

        <div>
          <button class="btn" @click="decodeURI">decodeURI解码</button>
        </div>

        <div>
          <button class="btn" @click="formatJSON">json格式化</button>
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
const computedValue = ref('')
const copyText = ref('复制')

watch(computedValue, () => {
  copyText.value = '复制'
})

function strToUpperCase() {
  computedValue.value = inputValue.value.toUpperCase()
}
function strToLowerCase() {
  computedValue.value = inputValue.value.toLowerCase()
}
function kebabToCamelOrReversal() {
  computedValue.value = kebabToCamelOrReversalFunc(inputValue.value)
}

// 驼峰-短横线互转
function kebabToCamelOrReversalFunc(str) {
	if (!str) return
	if (str.indexOf('-') != -1) {
		return str.replace(/-(\w)/g, (match, group1) => group1.toUpperCase());
	} else {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
}

// 解码
function decodeURI() {
  if (!inputValue.value) return
  computedValue.value = decodeURIComponent(inputValue.value)
}

// json格式化
function formatJSON() {
  const indentation = 4
  if (!inputValue.value) return
  const jsonObj = JSON.parse(inputValue.value)
  const jsonString = JSON.stringify(jsonObj, null, indentation) // 第三个参数指定缩进空格数
  console.log(jsonString)
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

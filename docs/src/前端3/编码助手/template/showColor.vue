<template>
    <div class="show-color-box">
        <div class="form-item">
            <span style="margin-right: 4px;">输入需要展示的色值：</span>
            <input v-model="colorValue" class="inline-input" type="text">
        </div>

        <div v-if="colorValue" class="color-box" :style="{ 'background': colorValue }"></div>
    </div>
</template> 

<script setup>
import { onMounted, ref, watch } from 'vue'

const colorValue = ref('')

</script>

<style scoped>
.show-color-box {
  position: relative;
}
.form-item {
    margin: 10px 0;
    font-size: 14px;
    color: #a7a8aa;
}
.inline-input {
    border: 1px solid #dcdfe6;
}
.color-box {
  position: absolute;
  left: 336px;
  top: -32px;
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
</style>

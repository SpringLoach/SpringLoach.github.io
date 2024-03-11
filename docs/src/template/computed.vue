<template>
    <div>
        <textarea id="computed-textarea" class="operate-textarea" />

        <div>
            <button id="computed-btn">测试</button>
        </div>

        <div>
          <button id="computed-btn2" @click="dos2">测试2</button>
        </div>

        <div id="computed-result"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('./lib-that-access-window-on-import').then((module) => {
    // use code
  })
})
function dos2() {

}
</script>


<style>
.operate-textarea {
  width: 600px;
  height: 300px;
  border: 1px solid #dcdfe6;
}
</style>

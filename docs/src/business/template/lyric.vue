<template>
  <div v-show="lyricShow">
    <div class="vague-layer"></div>
    <div class="lyric-wrap">{{ arr[currentIndex] }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const lyricShow = ref(false)
const useControll = ref(true)
const arr = [
'天真得只有你',
'令神仙鱼归天要怪谁',
'以为留在原地不够遨游',
'就让它沙滩里戏水',
'那次得你冒险半夜上山',
'争拗中队友不想撑下去',
'那时其实尝尽真正自由',
'但又感到没趣',
'不要紧 山野都有雾灯',
'顽童亦学乖不敢太勇敢',
'世上有多少个缤纷乐园 任你行',
'从何时你也学会不要离群',
'从何时发觉没有同伴不行',
'从何时惋惜蝴蝶困于那桃源',
'飞多远有谁会对它操心',
'曾迷途才怕追不上满街赶路人',
'无人理睬如何求生',
'顽童大了没那么笨',
'可以聚脚于康庄旅途然后同沐浴温泉',
'为何在雨伞外独行',
'这么多好去处',
'漫游到独家村去探谁',
'既然沿着寻梦之旅出发',
'就站出点吸引赞许',
'逛够几个睡房到达教堂',
'仿似一路飞奔七八十岁',
'既然沿着情路走到这里',
'尽量不要后退',
'亲爱的 闯遍所有路灯',
'还是令大家开心要紧',
'抱住两厅双套天空海阔 任你行',
'从何时你也学会不要离群',
'从何时发觉没有同伴不行',
'从何时惋惜蝴蝶困于那桃源',
'飞多远有谁会对它操心',
'曾迷途才怕追不上满街赶路人',
'无人理睬如何求生',
'顽童大了没那么笨',
'可以聚脚于康庄旅途然后同沐浴温泉',
'为何在雨伞外独行',
'亲爱的 等遍所有绿灯',
'还是让自己疯一下要紧',
'马路戏院商店天空海阔 任你行',
'从何时开始忌讳空山无人',
'从何时开始怕遥望星尘',
'原来神仙鱼横渡大海会断魂',
'听不到世人爱听的福音',
'曾迷途才怕追不上满街赶路人',
'无人理睬如何求生',
'顽童大了没那么笨',
'可以聚脚于康庄旅途然后同沐浴温泉',
'为何在赤地上独行',
'顽童大了别再追问',
'可以任我走怎么到头来又随着大队走',
'人群是那么像羊群'
]
const currentIndex = ref(0)



onMounted(() => {
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 17) {
      lyricShow.value = true
		}
    if (event.keyCode === 16) {
      useControll.value = !useControll.value
		}
    if (useControll.value) {
      if (event.keyCode === 90) {
        currentIndex.value = currentIndex.value == 0 ? 0 : (currentIndex.value - 1) % arr.length
      }
      if (event.keyCode === 88) {
        currentIndex.value = currentIndex.value == arr.length - 1 ? arr.length - 1 : (currentIndex.value + 1) % arr.length
      }
    }
	})
  document.addEventListener("keyup", function(event) {
		if (event.keyCode === 17) {
      lyricShow.value = false
		}
	})
})
</script>


<style scoped>
.vague-layer {
  position: fixed;
    right: 10px;
    bottom: 0;
    z-index: 10;
    width: 224px;
    height: 32px;
    background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}
.lyric-wrap {
  position: fixed;
  right: 10px;
  bottom: 10px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  /* opacity: .6; */
  background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}
</style>

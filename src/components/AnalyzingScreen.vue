<template><section class="analyzing page-enter" role="status" aria-live="polite"><span class="eyebrow">YOUR PERSONAL REPORT</span><div class="analysis-mark">↗</div><h2>正在整理你的答案</h2><p class="muted">连接工作状态、现实限制与下一步行动。</p><p class="small muted">本地生成，不上传你的回答</p></section></template>
<script setup>
import {onMounted,onUnmounted} from 'vue'
const emit=defineEmits(['done']);let timer
onMounted(()=>timer=setTimeout(()=>emit('done'),700));onUnmounted(()=>clearTimeout(timer))
</script>

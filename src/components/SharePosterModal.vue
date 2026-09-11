<template>
  <div class="modal-backdrop share-backdrop" @click.self="$emit('close')">
    <section ref="dialog" class="share-dialog" role="dialog" aria-modal="true" aria-labelledby="share-title" @keydown="onKey">
      <div class="share-toolbar"><h2 id="share-title">你的职业状态卡</h2><button class="secondary" aria-label="关闭分享卡" @click="$emit('close')">关闭</button></div>
      <label class="share-privacy"><input type="checkbox" v-model="showCompany" :disabled="generating">显示工作名称（默认隐藏）</label>
      <div ref="poster" class="share-poster">
        <div class="poster-brand"><span>去留 / CAREER SIGNAL</span><span>PERSONAL INSIGHT</span></div>
        <p class="poster-date">{{ results.evaluatedAt }} · {{ showCompany ? results.companyName : '我的工作状态' }}</p>
        <h2>{{ results.strategy.label }}</h2><p class="poster-subtitle">{{ results.focus ? '当前关注重点：'+results.focus.name : '当前工作状态相对稳定' }}</p>
        <div class="poster-metrics"><div v-for="dim in results.dimensions" :key="dim.id"><span>{{ dim.name }}</span><b>{{ dim.score }}<small> /100</small></b><div class="poster-bar"><i :style="{width:dim.score+'%',background:dim.tone==='risk'?'#f3a5a0':dim.tone==='watch'?'#e7c37a':'#72e1d5'}"></i></div><em>{{ dim.label }}</em></div></div>
        <p class="poster-legend">工作状态分数越高，代表状态越好</p>
        <div class="poster-action"><span>MY NEXT MOVE / 下一步</span><h3>{{ results.actions[0].title }}</h3><p>{{ results.actions[0].task }}</p></div>
        <div class="poster-footer"><span>看清状态 · 再做选择</span><span>自评参考 / 非离职概率</span></div>
      </div>
      <p v-if="error" role="alert" class="share-error">{{ error }}</p>
      <div v-if="imageUrl" class="generated-preview"><p>手机可长按下方图片保存</p><img :src="imageUrl" alt="生成的个人职业状态分享卡"></div>
      <div class="dialog-actions"><button v-if="!imageUrl" class="primary full" :disabled="generating" @click="generate">{{ generating?'正在生成高清图片…':'生成高清分享卡' }}</button><a v-else :href="imageUrl" download="去留-职业状态卡.png" class="primary full">下载分享卡</a></div>
      <p class="small muted">仅导出当前卡片，不会自动发布到任何平台。</p>
    </section>
  </div>
</template>
<script setup>
import {ref,watch,onMounted,onUnmounted,nextTick} from 'vue'
import html2canvas from 'html2canvas'
const props=defineProps({results:Object});const emit=defineEmits(['close'])
const dialog=ref(null),poster=ref(null),showCompany=ref(false),imageUrl=ref(''),generating=ref(false),error=ref('')
let previousFocus,overflow
watch(showCompany,()=>{imageUrl.value='';error.value=''})
onMounted(()=>{previousFocus=document.activeElement;overflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.value.querySelector('button').focus()})
onUnmounted(()=>{document.body.style.overflow=overflow;previousFocus?.focus()})
const onKey=e=>{if(e.key==='Escape'){emit('close');return}if(e.key!=='Tab')return;const nodes=[...dialog.value.querySelectorAll('button:not(:disabled),input:not(:disabled),a[href]')];if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus()}}
const generate=async()=>{if(generating.value)return;generating.value=true;error.value='';try{await nextTick();await document.fonts.ready;const canvas=await html2canvas(poster.value,{scale:2.5,backgroundColor:'#101823',logging:false});imageUrl.value=canvas.toDataURL('image/png')}catch{error.value='图片生成暂时失败，请重试，或使用完整报告的打印功能。'}finally{generating.value=false}}
</script>

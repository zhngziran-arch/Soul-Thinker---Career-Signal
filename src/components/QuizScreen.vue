<template>
  <section class="quiz-layout page-enter">
    <aside class="quiz-aside"><span class="eyebrow">YOUR CHECK-IN</span><h1>把感受，<br>一件件理清。</h1><p class="muted">{{ companyName }}</p><nav aria-label="评估维度" class="quiz-sections"><div v-for="(name,i) in sectionNames" :key="name" :class="{active:i===sectionIndex,passed:i<sectionIndex}"><span>{{ String(i+1).padStart(2,'0') }}</span>{{ name }}</div></nav><p class="small muted">按最近三个月的通常状态作答。<br>选项不完全贴合时，选择最接近的一项。</p></aside>
    <div class="quiz-main"><div class="quiz-top"><button class="text-button" @click="$emit('exit')">← 返回首页</button><span class="small muted">{{ currentIndex+1 }} / {{ questions.length }}</span></div><div class="progress-track" role="progressbar" :aria-valuenow="currentIndex+1" :aria-valuemax="questions.length" aria-valuemin="0" aria-label="答题进度"><div :style="{width:(currentIndex+1)/questions.length*100+'%'}"></div></div>
      <div class="paper question-card"><div class="section-kicker">{{ sectionNames[sectionIndex] }} <span class="question-number">QUESTION {{ String(currentIndex+1).padStart(2,'0') }}</span></div><h2 :id="'q'+currentQuestion.id" tabindex="-1" ref="questionHeading">{{ currentQuestion.title }}</h2><p class="muted scenario">{{ currentQuestion.scenario }}</p><div class="options" role="radiogroup" :aria-labelledby="'q'+currentQuestion.id"><button v-for="(option,index) in currentQuestion.options" :key="currentQuestion.id+option.id" :ref="el=>optionRefs[index]=el" role="radio" :aria-checked="selected===option.id" :tabindex="selected ? (selected===option.id?0:-1) : (index===0?0:-1)" @keydown="navigateOptions($event,index)" class="option" :class="{selected:selected===option.id}" @click="select(option.id)"><span class="option-letter">{{ selected===option.id?'✓':option.id }}</span><span>{{ option.text }}</span></button></div><div class="question-nav"><button class="secondary" :disabled="currentIndex===0" @click="move(-1)">上一题</button><button class="primary" :disabled="!selected" @click="next">{{ currentIndex===questions.length-1?'生成我的报告':'下一题' }} <span>→</span></button></div></div><p class="saved-note">选择后点击下一题 · 返回修改不会丢失答案</p>
    </div>
  </section>
</template>
<script setup>
import {computed,ref,nextTick} from 'vue'
import {questions} from '../data/quizData.js'
const props=defineProps({companyName:String,answers:Object,initialIndex:{type:Number,default:0}})
const emit=defineEmits(['answer','complete','exit','progress'])
const currentIndex=ref(Math.min(17,Math.max(0,props.initialIndex)))
const currentQuestion=computed(()=>questions[currentIndex.value])
const selected=computed(()=>props.answers[currentQuestion.value.id])
const sectionNames=['身心状态','团队支持','回报满意度','成长空间','离职准备']
const sectionIndex=computed(()=>['dim_a','dim_b','dim_c','dim_d','dim_e'].indexOf(currentQuestion.value.dimension))
const questionHeading=ref(null),optionRefs=ref([])
const select=id=>emit('answer',{questionId:currentQuestion.value.id,optionId:id})
const navigateOptions=(event,index)=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();const count=currentQuestion.value.options.length;const next=event.key==='Home'?0:event.key==='End'?count-1:(index+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)+count)%count;select(currentQuestion.value.options[next].id);optionRefs.value[next]?.focus()}
const move=async delta=>{currentIndex.value+=delta;emit('progress',currentIndex.value);await nextTick();questionHeading.value?.focus();window.scrollTo({top:0,behavior:'smooth'})}
const next=()=>{if(!selected.value)return;if(currentIndex.value===questions.length-1)emit('complete');else move(1)}
</script>

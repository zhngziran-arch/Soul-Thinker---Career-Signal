<template>
  <div class="app-shell">
    <header class="site-header"><button class="brand" @click="screen='start'" aria-label="去留，返回首页"><span class="brand-icon">↗</span>去留<small>CAREER SIGNAL</small></button><span class="header-note">职业状态分析 · 个人决策参考</span></header>
    <main>
      <StartScreen v-if="screen==='start'" :initial-company-name="companyName" :has-draft="hasDraft" :has-report="complete" @start="start" @resume="resume" />
      <QuizScreen v-else-if="screen==='quiz'" :company-name="companyName" :answers="answers" :initial-index="index" @answer="answer" @progress="progress" @exit="screen='start'" @complete="finishQuiz" />
      <AnalyzingScreen v-else-if="screen==='analyzing'" @done="showResult" />
      <ResultScreen v-else-if="screen==='result' && results" :results="results" :checked="checked" @toggle-action="toggleAction" @edit="editAnswers" @share="showShare=true" @notice="notify" />
    </main>
    <p v-if="storageFailed" class="storage-warning" role="status">当前浏览器无法保存数据，请在离开前导出报告；本次评估仍可正常使用。</p>
    <footer class="site-footer"><span>去留 · 个人职业状态报告</span><span>仅供自我梳理与参考 · 规则版本 2.0</span><button v-if="hasDraft" class="text-button" @click="requestClear=true">清除本机记录</button></footer>
    <SharePosterModal v-if="showShare && results" :results="results" @close="showShare=false" />
    <div v-if="requestClear" class="modal-backdrop" @click.self="requestClear=false"><section ref="clearDialog" class="paper confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clear-title" @keydown="trapDialog"><h2 id="clear-title">清除这份评估？</h2><p class="muted">将移除本浏览器保存的答案、报告和行动勾选。已下载的文件不受影响。</p><div class="dialog-actions"><button class="secondary" @click="requestClear=false">保留记录</button><button class="primary" @click="clear">清除记录</button></div></section></div>
    <div v-if="notice" class="toast" role="status">{{ notice }}</div>
  </div>
</template>
<script setup>
import {ref,watch,nextTick,onUnmounted} from 'vue'
import StartScreen from './components/StartScreen.vue'
import QuizScreen from './components/QuizScreen.vue'
import AnalyzingScreen from './components/AnalyzingScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import SharePosterModal from './components/SharePosterModal.vue'
import {calculateResults} from './utils/calculator.js'
import {loadDraft,saveDraft,clearDraft} from './utils/storage.js'
const draft=loadDraft()
const screen=ref('start'),companyName=ref(draft?.companyName||''),answers=ref(draft?.answers||{}),index=ref(draft?.index||0),complete=ref(draft?.complete||false),checked=ref(draft?.checked||[]),evaluatedAt=ref(draft?.evaluatedAt||null)
const hasDraft=ref(!!draft),results=ref(null),showShare=ref(false),storageFailed=ref(false),requestClear=ref(false),clearDialog=ref(null),notice=ref('')
let toastTimer,previousFocus
const notify=text=>{notice.value=text;clearTimeout(toastTimer);toastTimer=setTimeout(()=>notice.value='',3500)}
const persist=()=>{hasDraft.value=true;storageFailed.value=!saveDraft({companyName:companyName.value,answers:answers.value,index:index.value,complete:complete.value,checked:checked.value,evaluatedAt:evaluatedAt.value})}
const start=name=>{companyName.value=name;answers.value={};index.value=0;complete.value=false;checked.value=[];evaluatedAt.value=null;results.value=null;screen.value='quiz';persist()}
const resume=()=>{if(complete.value)showResult();else screen.value='quiz'}
const answer=({questionId,optionId})=>{answers.value[questionId]=optionId;complete.value=false;checked.value=[];evaluatedAt.value=null;persist()}
const progress=value=>{index.value=value;persist()}
const finishQuiz=()=>{screen.value='analyzing'}
const showResult=()=>{try{results.value=calculateResults(answers.value,companyName.value);if(evaluatedAt.value)results.value.evaluatedAt=evaluatedAt.value;else evaluatedAt.value=results.value.evaluatedAt;complete.value=true;screen.value='result';persist()}catch(error){notify(error.message);screen.value='quiz'}}
const editAnswers=id=>{index.value=id?Math.max(0,id-1):0;screen.value='quiz'}
const toggleAction=id=>{checked.value=checked.value.includes(id)?checked.value.filter(x=>x!==id):[...checked.value,id];persist()}
const clear=()=>{const cleared=clearDraft();if(!cleared){requestClear.value=false;notify('浏览器未能清除存储，请通过浏览器设置清除本站数据。');return}answers.value={};companyName.value='';index.value=0;complete.value=false;checked.value=[];results.value=null;evaluatedAt.value=null;hasDraft.value=false;requestClear.value=false;screen.value='start';notify('本机评估记录已清除')}
const trapDialog=e=>{if(e.key==='Escape'){requestClear.value=false;return}if(e.key!=='Tab')return;const nodes=clearDialog.value.querySelectorAll('button');if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes[nodes.length-1].focus()}else if(!e.shiftKey&&document.activeElement===nodes[nodes.length-1]){e.preventDefault();nodes[0].focus()}}
watch(requestClear,async open=>{if(open){previousFocus=document.activeElement;await nextTick();clearDialog.value?.querySelector('button')?.focus()}else previousFocus?.focus()})
watch(screen,()=>window.scrollTo({top:0,behavior:'smooth'}))
onUnmounted(()=>clearTimeout(toastTimer))
</script>

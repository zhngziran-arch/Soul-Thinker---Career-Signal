<template>
  <div class="start-layout page-enter">
    <section class="start-story">
      <span class="eyebrow">CAREER SIGNAL / 职业状态分析</span>
      <h1>你的职业状态，<br>值得一次<span class="serif-accent">透视。</span></h1>
      <p class="intro">从工作消耗到离职准备，解析让你犹豫的关键信号。把模糊的感受，转化为清晰的下一步。</p>
      <div class="story-rule"></div>
      <div class="start-features"><div><b>18</b><span>个情境信号</span></div><div><b>04 + 03</b><span>状态与准备维度</span></div><div><b>30 DAYS</b><span>按你的答案生成行动计划</span></div></div>
      <p class="small muted">约 3 分钟 · 本地计算 · 无需填写真实公司名</p>
    </section>
    <section class="paper start-form">
      <div class="section-kicker">START YOUR ANALYSIS / 开始状态分析</div>
      <h2>看清去留的关键变量</h2>
      <p class="muted">没有标准答案。按最近三个月的真实感受选择，就足够了。</p>
      <div class="mini-system"><div><svg viewBox="0 0 24 24"><path d="M2 12h5l3-7 4 14 3-7h5"/></svg>身心</div><div><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M3 5v6M21 5v6"/></svg>团队</div><div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 7 4 5 4-5M8 12h8M8 15h8M12 12v7"/></svg>回报</div><div><svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16M7 15l5-5 3 2 5-7M15 5h5v5"/></svg>成长</div></div>
      <label class="field-label" for="company">为这份工作起个名字 <span class="muted small">选填</span></label>
      <input id="company" v-model="name" maxlength="30" placeholder="例如：目前的工作" @keyup.enter="start">
      <div class="preset-row"><button v-for="preset in ['目前的工作','现在的团队','第一份工作']" :key="preset" class="chip" @click="name=preset">{{ preset }}</button></div>
      <button class="primary full" @click="start">开启我的状态分析 <span>↗</span></button>
      <button v-if="hasDraft" class="secondary full" @click="$emit('resume')">继续上次的{{ hasReport ? '报告' : '评估' }}</button>
      <p class="small muted form-note">答案保存在当前浏览器，可随时清除。分享卡默认隐藏工作名称。</p>
      <details class="method-note"><summary>这份评估能帮我做什么？</summary><p>它是一份帮助梳理工作现状的自评工具，按答案生成状态概览和行动建议。分数采用内部规则，不是离职概率，也不是医学诊断或专业法律意见。最终决定由你根据实际情况作出。</p></details>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props=defineProps({initialCompanyName:{type:String,default:''},hasDraft:Boolean,hasReport:Boolean})
const emit=defineEmits(['start','resume'])
const name=ref(props.initialCompanyName)
const start=()=>emit('start',name.value.trim()||'目前的工作')
</script>

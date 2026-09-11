<template>
  <figure class="radar-figure">
    <svg viewBox="0 0 340 300" role="img" aria-label="工作状态雷达图，越向外代表状态越好；具体分数见各维度说明">
      <polygon v-for="level in [.25,.5,.75,1]" :key="level" :points="polygon(level)" fill="none" stroke="#526b8145" :stroke-dasharray="level===1?'none':'3 4'" />
      <line v-for="(_,i) in data" :key="i" x1="170" y1="145" :x2="point(i,1).x" :y2="point(i,1).y" stroke="#526b8145" />
      <text x="175" y="123" class="radar-scale">25</text><text x="175" y="98" class="radar-scale">50</text><text x="175" y="73" class="radar-scale">75</text>
      <polygon :points="data.map((d,i)=>`${point(i,d.value/100).x},${point(i,d.value/100).y}`).join(' ')" fill="#77dacd20" stroke="#80ddd1" stroke-width="2" />
      <g v-for="(item,i) in data" :key="item.label"><circle :cx="point(i,item.value/100).x" :cy="point(i,item.value/100).y" r="4" fill="#90eddf" stroke="#183244" stroke-width="2"/><text :x="point(i,1.36).x" :y="point(i,1.26).y" text-anchor="middle" fill="#8da8ba" font-size="13">{{ item.label }}</text><text :x="point(i,1.36).x" :y="point(i,1.26).y+19" text-anchor="middle" fill="#80c3be" font-size="14" font-weight="600">{{ item.value }}</text></g>
    </svg>
    <figcaption>越向外，状态越好 · 0—100 分</figcaption>
  </figure>
</template>
<script setup>
const props=defineProps({data:{type:Array,required:true}})
const point=(i,ratio)=>({x:170+98*Math.cos(i*2*Math.PI/props.data.length-Math.PI/2)*Math.max(0,Math.min(1.4,ratio)),y:145+98*Math.sin(i*2*Math.PI/props.data.length-Math.PI/2)*Math.max(0,Math.min(1.4,ratio))})
const polygon=level=>props.data.map((_,i)=>`${point(i,level).x},${point(i,level).y}`).join(' ')
</script>

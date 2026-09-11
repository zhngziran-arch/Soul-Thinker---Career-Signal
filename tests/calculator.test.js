import test from 'node:test'
import assert from 'node:assert/strict'
import {calculateResults} from '../src/utils/calculator.js'
import {questions} from '../src/data/quizData.js'
import {loadDraft,saveDraft,clearDraft} from '../src/utils/storage.js'
const base=()=>Object.fromEntries(questions.map(q=>[q.id,'A']))

test('healthy answers yield maximum work scores and no invented weakness',()=>{
  const r=calculateResults(base())
  assert.ok(r.dimensions.every(d=>d.score===100))
  assert.equal(r.focus,null);assert.equal(r.strengths.length,4);assert.equal(r.strategy.id,'stay')
  assert.ok(r.actions.length>=2)
})
test('the former 55/27 boundary cannot fall into stay',()=>{
 const a={1:'B',2:'D',3:'B',4:'A',5:'C',6:'C',7:'A',8:'B',9:'C',10:'B',11:'A',12:'C',13:'C',14:'C',15:'B',16:'C',17:'C',18:'C'}
 const r=calculateResults(a);assert.equal(r.pushScore,55);assert.notEqual(r.strategy.id,'stay')
})
test('strong confidence does not offset insufficient cash',()=>{
 const a=base();a[16]='D';const r=calculateResults(a)
 assert.equal(r.readiness[0].score,0);assert.equal(r.readiness[0].tone,'risk')
 assert.ok(r.actions.some(a=>a.id==='cash'));assert.match(r.constraints[0],/不能替代/)
})
test('different concerns yield distinct evidence and tasks',()=>{
 const salary=calculateResults({...base(),9:'D',11:'C'})
 const growth=calculateResults({...base(),13:'C',15:'C'})
 assert.equal(salary.focus.id,'dim_c');assert.equal(growth.focus.id,'dim_d')
 assert.notEqual(salary.actions[0].task,growth.actions[0].task)
 for(const r of [salary,growth])for(const action of r.actions){assert.ok(action.evidence);assert.ok(action.review);assert.ok(action.questionId)}
})
test('severe individual signal survives an otherwise good average',()=>{
 const r=calculateResults({...base(),1:'C'})
 assert.equal(r.alerts.length,1);assert.equal(r.strategy.id,'support');assert.equal(r.actions[0].questionId,1)
})
test('low energy changes strategy without forcing an emergency label',()=>{
 const r=calculateResults({...base(),2:'D',4:'C',18:'C'})
 assert.equal(r.strategy.id,'recover');assert.equal(r.alerts.length,0)
})
test('missing or invalid answers cannot silently count as healthy',()=>{
 assert.throws(()=>calculateResults({}),/第 1 题/)
 assert.throws(()=>calculateResults({...base(),18:'Z'}),/第 18 题/)
})
test('2000 reproducible profiles satisfy result contracts',()=>{
 let seed=42
 for(let i=0;i<2000;i++){
  const a={};for(const q of questions){seed=(Math.imul(seed,1664525)+1013904223)>>>0;a[q.id]=q.options[Math.floor(seed/4294967296*q.options.length)].id}
  const r=calculateResults(a)
  assert.ok(r.dimensions.every(d=>Number.isFinite(d.score)&&d.score>=0&&d.score<=100))
  assert.ok(r.actions.length>=2&&r.actions.length<=3)
  assert.equal(new Set(r.actions.map(a=>a.id)).size,r.actions.length)
  if(r.pushScore>=55)assert.notEqual(r.strategy.id,'stay')
  if(r.dimensions.every(d=>d.score<70))assert.equal(r.strengths.length,0)
  for(const action of r.actions){const q=questions.find(q=>q.id===action.questionId);assert.equal(action.evidence,q.options.find(o=>o.id===a[q.id]).text)}
 }
})
test('draft validates data, handles corrupted storage, and clears only its own key',()=>{
 const map=new Map([['other','keep']]);globalThis.localStorage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)}
 assert.equal(saveDraft({companyName:'test',answers:base(),complete:true,index:99,checked:['cash']}),true)
 assert.equal(loadDraft().index,17);assert.equal(loadDraft().complete,true)
 assert.equal(clearDraft(),true);assert.equal(map.get('other'),'keep');assert.equal(loadDraft(),null)
 map.set('career-notes-v2','invalid JSON');assert.equal(loadDraft(),null)
 globalThis.localStorage={getItem:()=>{throw Error('blocked')},setItem:()=>{throw Error('blocked')},removeItem:()=>{throw Error('blocked')}}
 assert.equal(loadDraft(),null);assert.equal(saveDraft({}),false);assert.equal(clearDraft(),false)
 delete globalThis.localStorage
})

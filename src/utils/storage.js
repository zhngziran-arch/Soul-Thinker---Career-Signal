import { questions } from '../data/quizData.js'
import { MODEL_VERSION } from './calculator.js'
const KEY='career-notes-v2'
export function loadDraft(){
  try {
    const data=JSON.parse(localStorage.getItem(KEY))
    if(!data || data.version!==MODEL_VERSION || typeof data.companyName!=='string' || !data.answers || typeof data.answers!=='object') return null
    const answers={}
    for(const q of questions) if(q.options.some(o=>o.id===data.answers[q.id])) answers[q.id]=data.answers[q.id]
    return {...data,companyName:data.companyName.slice(0,30),answers,index:Number.isInteger(data.index)?Math.min(17,Math.max(0,data.index)):0,complete:!!data.complete&&Object.keys(answers).length===questions.length,checked:Array.isArray(data.checked)?data.checked.filter(x=>typeof x==='string'):[]}
  }catch{return null}
}
export function saveDraft(data){try{localStorage.setItem(KEY,JSON.stringify({...data,version:MODEL_VERSION}));return true}catch{return false}}
export function clearDraft(){try{localStorage.removeItem(KEY);return true}catch{return false}}

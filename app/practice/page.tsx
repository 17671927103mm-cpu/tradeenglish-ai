'use client';
import {useState} from 'react';
import {lessons} from '@/lib/courses';

export default function PracticePage(){
  const [day,setDay]=useState(0);
  const [answers,setAnswers]=useState<Record<string,number>>({});
  const lesson=lessons[day];
  const choose=(kind:string,index:number,choice:number)=>setAnswers(v=>({...v,[`${day}-${kind}-${index}`]:choice}));
  const score=(kind:'listening'|'review')=>{const qs=kind==='listening'?lesson.listeningQuestions:lesson.reviewQuestions;const done=qs.reduce((n,q,i)=>n+(answers[`${day}-${kind}-${i}`]!==undefined?1:0),0);const correct=qs.reduce((n,q,i)=>n+(answers[`${day}-${kind}-${i}`]===q.answer?1:0),0);return {done,correct,percent:done?Math.round(correct/qs.length*100):0};};
  const listening=score('listening'); const review=score('review');
  return <main style={{maxWidth:980,margin:'0 auto',padding:'32px 20px',fontFamily:'system-ui'}}>
    <p style={{color:'#64748b'}}>TradeEnglish AI · 零成本每日题库</p>
    <h1>第 {day+1} 天 · {lesson.title}</h1>
    <p>{lesson.goal}</p>
    <label>选择学习日： <select value={day} onChange={e=>{setDay(Number(e.target.value));setAnswers({});}}>{lessons.map((l,i)=><option key={i} value={i}>第 {i+1} 天 · {l.title.replace(`第 ${i+1} 天 · `,'')}</option>)}</select></label>
    <section style={{marginTop:24,padding:20,border:'1px solid #e2e8f0',borderRadius:16}}>
      <h2>听力题 · 10 道</h2><p>完成 {listening.done}/10，当前按 10 题满分计算：{listening.percent} 分。推荐通过分数：80 分。</p>
      {lesson.listeningQuestions.map((q,i)=>{const key=`${day}-listening-${i}`;const selected=answers[key];return <article key={key} style={{margin:'18px 0',padding:16,background:'#f8fafc',borderRadius:12}}><strong>{i+1}. {q.question}</strong><div>{q.options.map((o,j)=><button key={o} onClick={()=>choose('listening',i,j)} disabled={selected!==undefined} style={{display:'block',margin:'8px 0',padding:'8px 12px',borderRadius:8,border:'1px solid #cbd5e1',background:selected===j?(j===q.answer?'#dcfce7':'#fee2e2'):'#fff'}}>{String.fromCharCode(65+j)}. {o}</button>)}</div>{selected!==undefined&&<small>{selected===q.answer?'回答正确！':'正确答案：'+q.options[q.answer]} {q.explanation}</small>}</article>})}
    </section>
    <section style={{marginTop:24,padding:20,border:'1px solid #e2e8f0',borderRadius:16}}>
      <h2>复习题 · 15 道</h2><p>完成 {review.done}/15，当前正确率：{review.percent} 分。推荐通过分数：80 分。</p>
      {lesson.reviewQuestions.map((q,i)=>{const key=`${day}-review-${i}`;const selected=answers[key];return <article key={key} style={{margin:'18px 0',padding:16,background:'#f8fafc',borderRadius:12}}><strong>{i+1}. {q.question}</strong><div>{q.options.map((o,j)=><button key={o} onClick={()=>choose('review',i,j)} disabled={selected!==undefined} style={{display:'block',margin:'8px 0',padding:'8px 12px',borderRadius:8,border:'1px solid #cbd5e1',background:selected===j?(j===q.answer?'#dcfce7':'#fee2e2'):'#fff'}}>{String.fromCharCode(65+j)}. {o}</button>)}</div>{selected!==undefined&&<small>{selected===q.answer?'回答正确！':'正确答案：'+q.options[q.answer]} {q.explanation}</small>}</article>})}
    </section>
    <p style={{marginTop:24,color:'#64748b'}}>口语功能仍只提供浏览器语音播放和语音转文字，不显示虚构的专业发音分数。</p>
  </main>;
}

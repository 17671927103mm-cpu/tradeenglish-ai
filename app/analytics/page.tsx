'use client';
import {AnalyticsBento} from '@/components/ui/analytics-bento';
export default function AnalyticsPage(){
 const revenue={label:'今日学习进度',value:42,delta:'70%',caption:'Last 7 days',series:[{label:'Mon',value:18},{label:'Tue',value:28},{label:'Wed',value:24},{label:'Thu',value:36},{label:'Fri',value:42}]};
 const sessions={label:'练习表现',value:18,delta:'3 次求助',note:'按练习类型',desktop:[[8,12,10,15,18]],mobile:[[2,4,3,5,6]],labels:{desktop:'正确',mobile:'复习',prior:'之前',current:'当前'}};
 const categories={title:'任务分布',groups:[{id:'vocab',name:'词汇',color:'#7CFF5B'},{id:'listen',name:'听力',color:'#8B3DFF'},{id:'speak',name:'口语',color:'#FFB800'},{id:'review',name:'复习',color:'#FF5A1F'}],periods:[{label:'今日',total:42,delta:'70%',compare:'计划'},{label:'本周',total:240,delta:'12%',compare:'上周'},{label:'累计',total:680,delta:'24%',compare:'上月'}],items:[{name:'词汇',group:'vocab',values:[10,60,180]},{name:'听力',group:'listen',values:[10,55,150]},{name:'口语',group:'speak',values:[20,80,240]},{name:'复习',group:'review',values:[5,45,110]}]};
 const seasonality={title:'学习趋势',years:[{label:'当前',values:[18,28,24,36,42,35,48],stats:[{label:'平均每天',value:34,delta:'16%',note:'分钟'},{label:'已掌握',value:12,delta:'词汇',note:'自评'}],rows:[{label:'错题',value:'4'},{label:'收藏',value:'18'}]}]};
 return <main><div className="page-heading"><div><div className="eyebrow">TRADEENGLISH AI · LEARNING INSIGHTS</div><h1>学习数据总览</h1><p>用四张可交互卡片查看学习进度、练习表现、任务分布和趋势。</p></div></div><AnalyticsBento currency="" revenue={revenue} sessions={sessions} categories={categories} seasonality={seasonality}/></main>;
}

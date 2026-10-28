export const defaults = {level:'初中基础',accent:'en-US',industry:'综合外贸',focus:'听力与口语',speed:0.75,explanation:'英文 + 中文解释',minutes:60,autoplay:true};
export const tasks = [{name:'外贸单词',minutes:10,page:'词库',icon:'Aa',desc:'学会今天的 6 个实用单词'},{name:'情景对话',minutes:15,page:'计划',icon:'☏',desc:'跟读真实客户对话，积累高频表达'},{name:'AI口语陪练',minutes:20,page:'陪练',icon:'✧',desc:'和 AI 客户聊聊，勇敢开口'},{name:'英语听力',minutes:10,page:'听力',icon:'◉',desc:'慢速精听，听懂客户的需求'},{name:'复习与测试',minutes:5,page:'复习',icon:'↻',desc:'巩固薄弱知识，让进步更扎实'}];
export function localDate(date = new Date()) { return new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit'}).format(date); }
export function progressMinutes(done, day) { return tasks.reduce((sum,t,i)=>sum+(done[`${day}-${i}`]?t.minutes:0),0); }
export function normalize(text) { return text.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim(); }
export function nextReview(correct, attempts=0, now=Date.now()) { return now + (correct ? Math.min(14,2 ** attempts) : 1) * 86400000; }

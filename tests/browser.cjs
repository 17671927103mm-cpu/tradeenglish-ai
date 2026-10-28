// Run with PLAYWRIGHT_PATH set to an installed playwright module path.
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.getByText('学习记录已自动保存',{exact:true}).waitFor();
 await page.screenshot({path:path.resolve('desktop-preview.png'),fullPage:true});
 const nav=(name)=>page.locator('nav').getByRole('button',{name,exact:true});
 await nav('个人设置').click();await page.getByLabel('默认听力语速').selectOption('0.5');await page.reload();await nav('个人设置').click();assert.equal(await page.getByLabel('默认听力语速').inputValue(),'0.5');
 await nav('外贸英语词库').click();await page.getByRole('button',{name:'标记掌握',exact:true}).first().click();await page.getByRole('button',{name:'收藏',exact:true}).first().click();await page.getByRole('button',{name:'完成学习',exact:true}).click();await page.getByRole('button',{name:'已完成 · 再次练习',exact:true}).click();
 let store=await page.evaluate(()=>JSON.parse(localStorage.getItem('tradeenglish-v1')));assert.equal(store.mastered.length,1);assert.equal(Object.values(store.activity).reduce((a,b)=>a+b,0),10);
 await nav('英语听力训练').click();await page.getByRole('button',{name:'B. A refund / 退款',exact:true}).click();await page.getByPlaceholder('输入听到的英文…').fill('wrong answer');await page.getByRole('button',{name:'检查听写',exact:true}).click();store=await page.evaluate(()=>JSON.parse(localStorage.getItem('tradeenglish-v1')));assert.equal(store.mistakes.length,2);
 await nav('AI口语陪练 AI').click();await page.getByPlaceholder('用简单英语回复客户，或点击麦克风…').fill('We sell bags.');await page.getByRole('button',{name:'发送消息',exact:true}).click();await page.getByText('That sounds good. Can you send me your catalog?').waitFor({timeout:5000}).catch(()=>{});assert.equal(await page.locator('.message.user').count(),1);assert.equal(await page.locator('.message.assistant').count(),2);
 await nav('WhatsApp 模拟').click();await page.getByRole('button',{name:'翻译并生成回复',exact:true}).click();await page.locator('.analysis-result').waitFor();assert.match(await page.locator('.analysis-result').innerText(),/200件/);
 const api=await page.request.post('http://127.0.0.1:3000/api/coach',{data:{messages:[{role:'user',content:'Hello'}]}});assert.equal(api.status(),200);assert.equal((await api.json()).demo,true);
 const invalid=await page.request.post('http://127.0.0.1:3000/api/coach',{data:{messages:[{role:'system',content:'Hello'}]}});assert.equal(invalid.status(),400);
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'打开菜单',exact:true}).click();await nav('学习首页').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);await page.locator('.sidebar.open').waitFor({state:'detached'});await page.getByRole('button',{name:'关闭提示',exact:true}).click().catch(()=>{});await page.screenshot({path:path.resolve('mobile-preview.png'),fullPage:true,animations:'disabled'});
 for(const label of ['今日学习计划','外贸知识课程','外贸英语词库','AI口语陪练 AI','英语听力训练','WhatsApp 模拟','错题本与复习 2','学习进度报告','个人设置']){await page.getByRole('button',{name:'打开菜单',exact:true}).click();await nav(label).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`mobile overflow: ${label}`);}
 assert.deepEqual(errors,[]);console.log('PASS: persistence, vocabulary, idempotent progress, wrong-answer review, demo chat, business translation, API fallback/validation, all mobile pages; no client errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});

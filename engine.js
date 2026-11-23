/* 二年級數學遊戲屋 — 共用遊戲引擎
   每個遊戲頁面定義：
   GAME = { title, emoji, sub, color, modes:[{id,icon,name,desc}], make(modeId) -> question }
   question = { prompt (html), visual (html,可省略), opts:[{v,t}], ans, miss (答錯時顯示的正確說法) }
*/
(function(){
const G=window.GAME;
const C=G.color||'#5b7cfa';
const css=`
:root{--bg:${G.bg||'#fff7e8'};--ink:#2b2340;--soft:#6b6280;--line:${G.line||'#efe3cc'};--main:${C};--ok:#27ae60;--bad:#e74c3c}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;background:var(--bg);color:var(--ink);font-family:"Noto Sans TC",system-ui,sans-serif;display:flex;justify-content:center;padding:20px 14px 40px}
.wrap{width:100%;max-width:560px}
.backhome{display:inline-block;margin:0 0 6px;padding:6px 14px;border-radius:999px;background:#fff;border:2px solid rgba(0,0,0,.08);color:#2b2340;font-weight:700;font-size:14px;text-decoration:none}
h1{font-size:29px;font-weight:900;margin:6px 0 2px;text-align:center}
.sub{color:var(--soft);text-align:center;margin:0 0 18px;font-size:15px}
.card{background:#fff;border:3px solid var(--line);border-radius:22px;padding:20px;box-shadow:0 6px 0 var(--line)}
.label{font-weight:700;margin:4px 0 10px;font-size:16px}
.modes{display:grid;gap:10px}
.mode{display:flex;align-items:center;gap:12px;text-align:left;border:3px solid var(--line);background:#fffdf8;border-radius:18px;padding:12px 14px;cursor:pointer;font:inherit;color:inherit;transition:.15s}
.mode:hover{border-color:var(--main);transform:translateY(-1px)}
.mode .ic{font-size:30px;flex:none}.mode b{display:block;font-size:17px}.mode span{color:var(--soft);font-size:13px}
.hud{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-weight:700;font-size:15px}
.pill{background:#fff;border:2px solid var(--line);border-radius:999px;padding:5px 12px}
.bar{height:12px;background:var(--line);border-radius:99px;overflow:hidden;margin-bottom:14px}
.bar i{display:block;height:100%;width:0;background:var(--main);transition:width .3s linear}
.prompt{text-align:center;font-size:23px;font-weight:900;margin:4px 0 10px;line-height:1.5}
.prompt.big{font-size:44px;letter-spacing:1px}
.visual{display:flex;justify-content:center;margin:6px 0 10px}
.hint{text-align:center;color:var(--soft);min-height:24px;font-size:16px;margin-bottom:10px;font-weight:700}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.opts.three{grid-template-columns:1fr 1fr 1fr}
.opts.one{grid-template-columns:1fr}
.opt{border:none;border-radius:18px;padding:16px 6px;font:900 25px "Noto Sans TC";background:#f1f3ff;color:var(--ink);cursor:pointer;box-shadow:0 5px 0 #d9ddf5;transition:.1s;line-height:1.3}
.opt.sm{font-size:18px}
.opt:active{transform:translateY(3px);box-shadow:0 2px 0 #d9ddf5}
.opt.right{background:var(--ok);color:#fff;box-shadow:0 5px 0 #1e8449}
.opt.wrong{background:var(--bad);color:#fff;box-shadow:0 5px 0 #a93226;animation:shake .35s}
@keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.btn{display:block;width:100%;border:none;border-radius:16px;padding:14px;font:900 18px "Noto Sans TC";background:var(--main);color:#fff;cursor:pointer;box-shadow:0 5px 0 rgba(0,0,0,.2);margin-top:14px}
.btn.ghost{background:#fff;color:var(--ink);border:3px solid var(--line);box-shadow:0 5px 0 var(--line)}
.big{font-size:64px;text-align:center;margin:4px 0}
.score{text-align:center;font-size:22px;font-weight:900}
.stars{text-align:center;font-size:40px;letter-spacing:6px;margin:8px 0}
.miss{margin-top:14px;background:#fff6f4;border-radius:14px;padding:12px 14px;font-size:16px;line-height:1.6}
.miss div{padding:3px 0;border-bottom:1px dashed #f3d6cf}.miss div:last-child{border:none}
.best{text-align:center;color:var(--soft);font-size:14px;margin-top:10px}
.hidden{display:none!important}
.fx{position:fixed;pointer-events:none;font-size:28px;animation:fly 1s forwards;z-index:9}
@keyframes fly{to{transform:translateY(-120px) scale(1.4);opacity:0}}
.vert{font:900 40px/1.25 "Noto Sans TC",monospace;display:inline-grid;grid-template-columns:repeat(4,34px);text-align:center;border-collapse:collapse}
.vert .line{grid-column:1/5;border-top:4px solid var(--ink);margin:4px 0}
.vert .q{color:var(--main)}
`;
const st=document.createElement('style');st.textContent=css+(G.css||'');document.head.appendChild(st);
const f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&display=swap';document.head.appendChild(f);

document.body.innerHTML=`<div class="wrap">
<a class="backhome" href="./">← 遊戲目錄</a>
<h1>${G.emoji} ${G.title}</h1><p class="sub">${G.sub}</p>
<div id="home" class="card"><div class="label">選擇遊戲</div><div class="modes" id="modes"></div><div class="best" id="best"></div></div>
<div id="game" class="card hidden">
 <div class="hud"><span class="pill" id="hudL"></span><span class="pill" id="hudM"></span><span class="pill" id="hudR"></span></div>
 <div class="bar"><i id="bar"></i></div>
 <div class="prompt" id="prompt"></div><div class="visual" id="visual"></div>
 <div class="hint" id="hint"></div><div class="opts" id="opts"></div>
 <button class="btn ghost" id="quit">回首頁</button></div>
<div id="result" class="card hidden"><div class="big" id="rIcon"></div><div class="score" id="rScore"></div><div class="stars" id="rStars"></div>
 <div class="miss hidden" id="rMiss"></div><button class="btn" id="again">再玩一次</button><button class="btn ghost" id="home2">回首頁</button></div>
</div>`;
const $=id=>document.getElementById(id);
const KEY='g_'+location.pathname.split('/').pop().replace('.html','');
let mode,qi,score,streak,total,timeLeft,timer,cur,locked,misses,ac;

const modes=[...G.modes];
if(G.speed!==false)modes.push({id:'speed',icon:'⚡',name:'60 秒快閃',desc:'所有題型混在一起，一分鐘能答對幾題？'});
modes.forEach(m=>{const b=document.createElement('button');b.className='mode';b.innerHTML=`<span class="ic">${m.icon}</span><div><b>${m.name}</b><span>${m.desc}</span></div>`;b.onclick=()=>start(m.id);$('modes').appendChild(b);});

function sfx(type){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();const t0=ac.currentTime;
 const note=(f,t,d,w,v)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=w||'triangle';o.frequency.setValueAtTime(f,t0+t);g.gain.setValueAtTime(.0001,t0+t);g.gain.exponentialRampToValueAtTime(v||.2,t0+t+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+t+d);o.connect(g);g.connect(ac.destination);o.start(t0+t);o.stop(t0+t+d+.03);};
 if(type==='ok'){[523,659,784,1047].forEach((f,i)=>note(f,i*.07,.28));note(2093,.30,.35,'sine',.07);note(2637,.38,.35,'sine',.05);}
 else if(type==='combo'){[[523,0,.12],[523,.12,.12],[523,.24,.12],[659,.36,.18],[784,.56,.14],[659,.70,.12],[1047,.84,.5]].forEach(n=>note(n[0],n[1],n[2],'square',.09));[1568,2093,2637,3136].forEach((f,i)=>note(f,.9+i*.06,.3,'sine',.05));}
 else if(type==='bad'){const o=ac.createOscillator(),g=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(330,t0);o.frequency.linearRampToValueAtTime(260,t0+.25);o.frequency.setValueAtTime(260,t0+.3);o.frequency.linearRampToValueAtTime(170,t0+.7);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.13,t0+.03);g.gain.setValueAtTime(.13,t0+.22);g.gain.exponentialRampToValueAtTime(.02,t0+.28);g.gain.exponentialRampToValueAtTime(.13,t0+.33);g.gain.exponentialRampToValueAtTime(.0001,t0+.75);o.connect(g);g.connect(ac.destination);o.start(t0);o.stop(t0+.8);}
 else if(type==='win'){[[523,0],[659,.1],[784,.2],[1047,.3],[784,.45],[1047,.55]].forEach(n=>note(n[0],n[1],.22,'square',.08));[1047,1319,1568].forEach(f=>note(f,.7,.8,'triangle',.1));}
 else if(type==='end'){[392,523,659].forEach((f,i)=>note(f,i*.12,.35,'triangle',.15));}
}catch(e){}}

function best(){try{return +localStorage.getItem(KEY+'best')||0}catch(e){return 0}}
function setBest(v){try{localStorage.setItem(KEY+'best',v)}catch(e){}}
function show(id){['home','game','result'].forEach(x=>$(x).classList.toggle('hidden',x!==id));}
function showBest(){const b=best();$('best').textContent=b?`⚡ 60 秒快閃最高紀錄：${b} 題`:'';}
showBest();
$('quit').onclick=()=>{clearInterval(timer);show('home');showBest();};
$('home2').onclick=()=>{show('home');showBest();};
$('again').onclick=()=>start(mode);

function start(m){mode=m;qi=0;score=0;streak=0;misses=[];total=10;show('game');clearInterval(timer);
 if(m==='speed'){timeLeft=60;timer=setInterval(()=>{timeLeft--;hud();if(timeLeft<=0){clearInterval(timer);finish();}},1000);}
 next();}
function hud(){
 if(mode==='speed'){$('bar').style.width=(timeLeft/60*100)+'%';$('hudL').textContent='⏰ '+timeLeft+' 秒';}
 else{$('bar').style.width=(qi/total*100)+'%';$('hudL').textContent=`第 ${Math.min(qi+1,total)} / ${total} 題`;}
 $('hudM').textContent='🔥 連對 '+streak;$('hudR').textContent='⭐ '+score;}
let lastKey='';
function next(){
 locked=false;let tries=0;
 do{const ids=G.modes.map(m=>m.id);const md=mode==='speed'?ids[Math.floor(Math.random()*ids.length)]:mode;cur=G.make(md);tries++;}while(cur.prompt+(cur.visual||'')===lastKey&&tries<8);
 lastKey=cur.prompt+(cur.visual||'');
 hud();
 $('prompt').innerHTML=cur.prompt;$('prompt').className='prompt'+(cur.big?' big':'');
 $('visual').innerHTML=cur.visual||'';$('visual').classList.toggle('hidden',!cur.visual);
 $('hint').textContent='';
 const o=$('opts');o.innerHTML='';
 o.className='opts'+(cur.opts.length===3?' three':'')+(cur.cols===1?' one':'');
 cur.opts.forEach(x=>{const b=document.createElement('button');b.className='opt'+(String(x.t).length>6?' sm':'');b.innerHTML=x.t;b.dataset.v=x.v;b.onclick=()=>answer(b,x.v);o.appendChild(b);});
}
function answer(btn,v){
 if(locked)return;locked=true;
 const ok=String(v)===String(cur.ans);
 sfx(ok?((streak+1)%5===0?'combo':'ok'):'bad');
 if(ok){btn.classList.add('right');score++;streak++;
  $('hint').textContent=streak>=5&&streak%5===0?`太厲害了！連對 ${streak} 題 🔥`:['答對了！','好棒！','厲害！','正確！','你好會！'][Math.floor(Math.random()*5)];burst(btn);
  if(cur.after)$('visual').innerHTML=cur.after;}
 else{btn.classList.add('wrong');streak=0;misses.push(cur.miss);
  [...$('opts').children].forEach(b=>{if(b.dataset.v===String(cur.ans))b.classList.add('right');});
  $('hint').innerHTML='沒關係，'+cur.miss;if(cur.after)$('visual').innerHTML=cur.after;}
 qi++;hud();
 const wait=ok?(mode==='speed'?450:900):(mode==='speed'?1500:2400);
 setTimeout(()=>{if(mode==='speed'&&timeLeft<=0)return;if(mode!=='speed'&&qi>=total)finish();else next();},wait);
}
function burst(el){const r=el.getBoundingClientRect();for(let i=0;i<3;i++){const s=document.createElement('div');s.className='fx';s.textContent=['⭐','✨','🌟'][i];s.style.left=(r.left+r.width/2-14+(i-1)*30)+'px';s.style.top=r.top+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),1000);}}
function finish(){clearInterval(timer);show('result');let stars,text;
 if(mode==='speed'){const b=best();const nb=score>b;if(nb)setBest(score);text=`60 秒內答對 ${score} 題！`+(nb?'<br>🏆 新紀錄！':`<br><small>最高紀錄 ${Math.max(b,score)} 題</small>`);stars=score>=(G.speedStars||[6,10,15])[2]?3:score>=(G.speedStars||[6,10,15])[1]?2:score>=(G.speedStars||[6,10,15])[0]?1:0;}
 else{text=`10 題答對 ${score} 題`;stars=score===10?3:score>=8?2:score>=5?1:0;}
 sfx(stars>=2?'win':'end');
 $('rIcon').textContent=['💪','👍','🎉','🏆'][stars];$('rScore').innerHTML=text;$('rStars').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);
 const m=$('rMiss');if(misses.length){m.innerHTML='<b>📝 再記一次：</b>'+[...new Set(misses)].map(x=>`<div>${x}</div>`).join('');m.classList.remove('hidden');}else m.classList.add('hidden');}
})();

/* 共用小工具 */
const R=n=>Math.floor(Math.random()*n);
const RI=(a,b)=>a+R(b-a+1);
const pick=a=>a[R(a.length)];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
/* 產生 4 個數字選項：答案 + 指定的常見錯誤 + 鄰近數 */
function numOpts(ans,wrongs,unit,min){
 unit=unit||'';min=min==null?0:min;const s=new Set([ans]);
 (wrongs||[]).forEach(w=>{if(s.size<4&&w!==ans&&w>=min)s.add(w);});
 let d=1;while(s.size<4){const c=ans+(Math.random()<.5?-d:d);if(c>=min)s.add(c);d++;}
 return shuffle([...s]).map(v=>({v,t:v+unit}));}
function vertical(a,op,b,c){ // 直式：c 為 null 顯示 ?
 const cells=s=>{s=String(s);return Array(4-s.length).fill('').concat(s.split(''));};
 const row=(arr,cls)=>arr.map(x=>`<span class="${cls||''}">${x}</span>`).join('');
 const A=cells(a),B=cells(b);B[0]=op;
 const C=c==null?['','','','?'].map((x,i)=>i===3?'?':''):cells(c);
 const qcls=c==null?'q':'q';
 return `<div class="vert">${row(A)}${row(B)}<span class="line"></span>${C.map(x=>`<span class="${qcls}">${x}</span>`).join('')}</div>`;}

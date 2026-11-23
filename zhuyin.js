/* 二年級數學遊戲屋 — 自動加注音（直式注音在字的右邊）
   字表依教育部國語辭典，破音字依詞語判斷。右上角可開關。 */
(function(){
const T={"一": "ㄧ", "針": "ㄓㄣ", "個": "ㄍㄜˋ", "格": "ㄍㄜˊ", "的": "ㄉㄜ˙", "幾": "ㄐㄧˇ", "時": "ㄕˊ", "大": "ㄉㄚˋ", "數": "ㄕㄨˋ", "是": "ㄕˋ", "分": "ㄈㄣ", "比": "ㄅㄧˇ", "多": "ㄉㄨㄛ", "樣": "ㄧㄤˋ", "長": "ㄔㄤˊ", "題": "ㄊㄧˊ", "甲": "ㄐㄧㄚˇ", "乙": "ㄧˇ", "有": "ㄧㄡˇ", "對": "ㄉㄨㄟˋ", "元": "ㄩㄢˊ", "小": "ㄒㄧㄠˇ", "了": "ㄌㄜ˙", "答": "ㄉㄚˊ", "較": "ㄐㄧㄠˋ", "以": "ㄧˇ", "子": "ㄗ˙", "法": "ㄈㄚˇ", "公": "ㄍㄨㄥ", "乘": "ㄔㄥˊ", "鐘": "ㄓㄨㄥ", "杯": "ㄅㄟ", "上": "ㄕㄤˋ", "加": "ㄐㄧㄚ", "用": "ㄩㄥˋ", "短": "ㄉㄨㄢˇ", "減": "ㄐㄧㄢˇ", "量": "ㄌㄧㄤˊ", "十": "ㄕˊ", "二": "ㄦˋ", "單": "ㄉㄢ", "算": "ㄙㄨㄢˋ", "位": "ㄨㄟˋ", "面": "ㄇㄧㄢˋ", "水": "ㄕㄨㄟˇ", "到": "ㄉㄠˋ", "哪": "ㄋㄚˇ", "指": "ㄓˇ", "著": "ㄓㄜ˙", "再": "ㄗㄞˋ", "不": "ㄅㄨˋ", "錄": "ㄌㄨˋ", "來": "ㄌㄞˊ", "要": "ㄧㄠˋ", "字": "ㄗˋ", "秒": "ㄇㄧㄠˇ", "高": "ㄍㄠ", "於": "ㄩˊ", "少": "ㄕㄠˇ", "顆": "ㄎㄜ", "兩": "ㄌㄧㄤˇ", "看": "ㄎㄢˋ", "又": "ㄧㄡˋ", "連": "ㄌㄧㄢˊ", "等": "ㄉㄥˇ", "共": "ㄍㄨㄥˋ", "張": "ㄓㄤ", "叫": "ㄐㄧㄠˋ", "作": "ㄗㄨㄛˋ", "首": "ㄕㄡˇ", "頁": "ㄧㄝˋ", "正": "ㄓㄥˋ", "確": "ㄑㄩㄝˋ", "沒": "ㄇㄟˊ", "瓶": "ㄆㄧㄥˊ", "遊": "ㄧㄡˊ", "戲": "ㄒㄧˋ", "起": "ㄑㄧˇ", "可": "ㄎㄜˇ", "第": "ㄉㄧˋ", "紀": "ㄐㄧˋ", "還": "ㄏㄞˊ", "條": "ㄊㄧㄠˊ", "選": "ㄒㄩㄢˇ", "回": "ㄏㄨㄟˊ", "厲": "ㄌㄧˋ", "害": "ㄏㄞˋ", "好": "ㄏㄠˇ", "間": "ㄐㄧㄢ", "所": "ㄙㄨㄛˇ", "在": "ㄗㄞˋ", "變": "ㄅㄧㄢˋ", "本": "ㄅㄣˇ", "從": "ㄘㄨㄥˊ", "你": "ㄋㄧˇ", "案": "ㄢˋ", "出": "ㄔㄨ", "喔": "ㄛ", "度": "ㄉㄨˋ", "錯": "ㄘㄨㄛˋ", "快": "ㄎㄨㄞˋ", "紙": "ㄓˇ", "經": "ㄐㄧㄥ", "過": "ㄍㄨㄛˋ", "把": "ㄅㄚˇ", "百": "ㄅㄞˇ", "這": "ㄓㄜˋ", "閃": "ㄕㄢˇ", "內": "ㄋㄟˋ", "能": "ㄋㄥˊ", "次": "ㄘˋ", "最": "ㄗㄨㄟˋ", "關": "ㄍㄨㄢ", "掉": "ㄉㄧㄠˋ", "下": "ㄒㄧㄚˋ", "倒": "ㄉㄠˋ", "筆": "ㄅㄧˇ", "什": "ㄕㄣˊ", "麼": "ㄇㄜ˙", "三": "ㄙㄢ", "會": "ㄏㄨㄟˋ", "先": "ㄒㄧㄢ", "太": "ㄊㄞˋ", "棒": "ㄅㄤˋ", "係": "ㄒㄧˋ", "式": "ㄕˋ", "現": "ㄒㄧㄢˋ", "進": "ㄐㄧㄣˋ", "疊": "ㄉㄧㄝˊ", "車": "ㄔㄜ", "人": "ㄖㄣˊ", "擇": "ㄗㄜˊ", "習": "ㄒㄧˊ", "找": "ㄓㄠˇ", "玩": "ㄨㄢˊ", "記": "ㄐㄧˋ", "滿": "ㄇㄢˇ", "五": "ㄨˇ", "和": "ㄏㄜˊ", "驗": "ㄧㄢˋ", "嗎": "ㄇㄚ˙", "哥": "ㄍㄜ", "走": "ㄗㄡˇ", "認": "ㄖㄣˋ", "識": "ㄕˋ", "說": "ㄕㄨㄛ", "撥": "ㄅㄛ", "目": "ㄇㄨˋ", "挑": "ㄊㄧㄠˇ", "戰": "ㄓㄢˋ", "應": "ㄧㄥˋ", "剩": "ㄕㄥˋ", "隻": "ㄓ", "朵": "ㄉㄨㄛˇ", "容": "ㄖㄨㄥˊ", "也": "ㄧㄝˇ", "開": "ㄎㄞ", "始": "ㄕˇ", "直": "ㄓˊ", "接": "ㄐㄧㄝ", "圖": "ㄊㄨˊ", "刻": "ㄎㄜˋ", "六": "ㄌㄧㄡˋ", "練": "ㄌㄧㄢˋ", "慢": "ㄇㄢˋ", "空": "ㄎㄨㄥˋ", "表": "ㄅㄧㄠˇ", "結": "ㄐㄧㄝˊ", "果": "ㄍㄨㄛˇ", "新": "ㄒㄧㄣ", "四": "ㄙˋ", "八": "ㄅㄚ", "些": "ㄒㄧㄝ", "但": "ㄉㄢˋ", "點": "ㄉㄧㄢˇ", "積": "ㄐㄧ", "木": "ㄇㄨˋ", "付": "ㄈㄨˋ", "步": "ㄅㄨˋ", "驟": "ㄗㄡˋ", "混": "ㄏㄨㄣˋ", "書": "ㄕㄨ", "放": "ㄈㄤˋ", "媽": "ㄇㄚ", "買": "ㄇㄞˇ", "弟": "ㄉㄧˋ", "鉛": "ㄑㄧㄢ", "東": "ㄉㄨㄥ", "西": "ㄒㄧ", "迴": "ㄏㄨㄟˊ", "紋": "ㄨㄣˊ", "蠟": "ㄌㄚˋ", "越": "ㄩㄝˋ", "繩": "ㄕㄥˊ", "午": "ㄨˇ", "冒": "ㄇㄠˋ", "險": "ㄒㄧㄢˇ", "七": "ㄑㄧ", "九": "ㄐㄧㄡˇ", "偵": "ㄓㄣ", "探": "ㄊㄢˋ", "油": "ㄧㄡˊ", "就": "ㄐㄧㄡˋ", "手": "ㄕㄡˇ", "原": "ㄩㄢˊ", "後": "ㄏㄡˋ", "做": "ㄗㄨㄛˋ", "花": "ㄏㄨㄚ", "得": "ㄉㄜ˙", "換": "ㄏㄨㄢˋ", "只": "ㄓˇ", "請": "ㄑㄧㄥˇ", "錢": "ㄑㄧㄢˊ", "別": "ㄅㄧㄝˊ", "候": "ㄏㄡˋ", "讀": "ㄉㄨˊ", "橡": "ㄒㄧㄤˋ", "皮": "ㄆㄧˊ", "擦": "ㄘㄚ", "帶": "ㄉㄞˋ", "同": "ㄊㄨㄥˊ", "形": "ㄒㄧㄥˊ", "天": "ㄊㄧㄢ", "線": "ㄒㄧㄢˋ", "中": "ㄓㄨㄥ", "告": "ㄍㄠˋ", "訴": "ㄙㄨˋ", "填": "ㄊㄧㄢˊ", "藏": "ㄘㄤˊ", "複": "ㄈㄨˋ", "知": "ㄓ", "道": "ㄉㄠˋ", "被": "ㄅㄟˋ", "美": "ㄇㄟˇ", "裡": "ㄌㄧˇ", "吃": "ㄔ", "園": "ㄩㄢˊ", "裝": "ㄓㄨㄤ", "去": "ㄑㄩˋ", "才": "ㄘㄞˊ", "細": "ㄒㄧˋ", "全": "ㄑㄩㄢˊ", "學": "ㄒㄩㄝˊ", "音": "ㄧㄣ", "機": "ㄐㄧ", "板": "ㄅㄢˇ", "都": "ㄉㄡ", "值": "ㄓˊ", "合": "ㄏㄜˊ", "久": "ㄐㄧㄡˇ", "或": "ㄏㄨㄛˋ", "借": "ㄐㄧㄝˋ", "角": "ㄐㄧㄠˇ", "緞": "ㄉㄨㄢˋ", "剪": "ㄐㄧㄢˇ", "成": "ㄔㄥˊ", "包": "ㄅㄠ", "站": "ㄓㄢˋ", "摘": "ㄓㄞ", "報": "ㄅㄠˋ", "懂": "ㄉㄨㄥˇ", "型": "ㄒㄧㄥˊ", "發": "ㄈㄚ", "亮": "ㄌㄧㄤˋ", "根": "ㄍㄣ", "塗": "ㄊㄨˊ", "顏": "ㄧㄢˊ", "色": "ㄙㄜˋ", "地": "ㄉㄧˋ", "方": "ㄈㄤ", "朋": "ㄆㄥˊ", "友": "ㄧㄡˇ", "幫": "ㄅㄤ", "檢": "ㄐㄧㄢˇ", "查": "ㄔㄚˊ", "差": "ㄔㄚ", "明": "ㄇㄧㄥˊ", "他": "ㄊㄚ", "彈": "ㄉㄢˋ", "珠": "ㄓㄨ", "給": "ㄍㄟˇ", "她": "ㄊㄚ", "盤": "ㄆㄢˊ", "餅": "ㄅㄧㄥˇ", "乾": "ㄍㄢ", "鴿": "ㄍㄜ", "飛": "ㄈㄟ", "班": "ㄅㄢ", "已": "ㄧˇ", "誰": "ㄕㄟˊ", "粗": "ㄘㄨ", "矮": "ㄞˇ", "胖": "ㄆㄤˋ", "碗": "ㄨㄢˇ", "桶": "ㄊㄨㄥˇ", "部": "ㄅㄨˋ", "怎": "ㄗㄣˇ", "器": "ㄑㄧˋ", "年": "ㄋㄧㄢˊ", "級": "ㄐㄧˊ", "屋": "ㄨ", "獎": "ㄐㄧㄤˇ", "勵": "ㄌㄧˋ", "效": "ㄒㄧㄠˋ", "靜": "ㄐㄧㄥˋ", "平": "ㄆㄧㄥˊ", "電": "ㄉㄧㄢˋ", "腦": "ㄋㄠˇ", "順": "ㄕㄨㄣˋ", "序": "ㄒㄩˋ", "龍": "ㄌㄨㄥˊ", "寫": "ㄒㄧㄝˇ", "夠": "ㄍㄡˋ", "向": "ㄒㄧㄤˋ", "退": "ㄊㄨㄟˋ", "生": "ㄕㄥ", "活": "ㄏㄨㄛˊ", "故": "ㄍㄨˋ", "事": "ㄕˋ", "雞": "ㄐㄧ", "蛋": "ㄉㄢˋ", "貼": "ㄊㄧㄝ", "盒": "ㄏㄜˊ", "吸": "ㄒㄧ", "管": "ㄍㄨㄢˇ", "尺": "ㄔˇ", "心": "ㄒㄧㄣ", "紅": "ㄏㄨㄥˊ", "藍": "ㄌㄢˊ", "重": "ㄔㄨㄥˊ", "華": "ㄏㄨㄚˊ", "桌": "ㄓㄨㄛ", "定": "ㄉㄧㄥˋ", "齊": "ㄑㄧˊ", "完": "ㄨㄢˊ", "蓋": "ㄍㄞˋ", "住": "ㄓㄨˋ", "注": "ㄓㄨˋ", "意": "ㄧˋ", "前": "ㄑㄧㄢˊ", "麵": "ㄇㄧㄢˋ", "牛": "ㄋㄧㄡˊ", "奶": "ㄋㄞˇ", "橘": "ㄐㄩˊ", "館": "ㄍㄨㄢˇ", "漫": "ㄇㄢˋ", "畫": "ㄏㄨㄚˋ", "置": "ㄓˋ", "相": "ㄒㄧㄤ", "鄰": "ㄌㄧㄣˊ", "我": "ㄨㄛˇ", "之": "ㄓ", "束": "ㄕㄨˋ", "拖": "ㄊㄨㄛ", "拉": "ㄌㄚ"};
const OV={"數一數": ["ㄕㄨˇ", null, "ㄕㄨˇ"], "數數": ["ㄕㄨˇ", "ㄕㄨˋ"], "數到": ["ㄕㄨˇ", null], "數格": ["ㄕㄨˇ", null], "數積": ["ㄕㄨˇ", null], "一個一個數": [null, null, null, null, "ㄕㄨˇ"], "十個十個數": [null, null, null, null, "ㄕㄨˇ"], "五個五個數": [null, null, null, null, "ㄕㄨˇ"], "兩個兩個數": [null, null, null, null, "ㄕㄨˇ"], "格一格數": [null, null, null, "ㄕㄨˇ"], "去數": [null, "ㄕㄨˇ"], "要數": [null, "ㄕㄨˇ"], "子數": [null, "ㄕㄨˇ"], "容量": [null, "ㄌㄧㄤˋ"], "數量": ["ㄕㄨˋ", "ㄌㄧㄤˋ"], "的量": [null, "ㄌㄧㄤˋ"], "弟弟": [null, "ㄉㄧ˙"], "哥哥": [null, "ㄍㄜ˙"], "媽媽": [null, "ㄇㄚ˙"], "東西": [null, "ㄒㄧ˙"], "時候": [null, "ㄏㄡ˙"], "朋友": [null, "ㄧㄡ˙"], "認識": [null, "ㄕ˙"]};
const KEYS=Object.keys(OV).sort((a,b)=>b.length-a.length);
const css=`
.zy{display:inline-flex;align-items:center;white-space:nowrap;margin:0 .03em}
.zy .h{line-height:1}
.zy .p{display:inline-flex;align-items:flex-end;margin-left:.06em;font-size:.38em;font-weight:500;font-style:normal;line-height:1;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif}
.zy .p .c{display:flex;flex-direction:column;align-items:center}
.zy .p .c i{display:block;font-style:normal;height:1.02em;line-height:1.02em}
.zy .p .c .lt{height:.6em;line-height:.6em}
.zy .p .t{display:block;width:.55em;line-height:1;margin-bottom:.35em;margin-left:-.05em}
.zy .p .t.n{visibility:hidden}
body:not(.nozy) .prompt,body:not(.nozy) .hint,body:not(.nozy) .miss,body:not(.nozy) .learn p{line-height:1.9!important}
body.nozy .zy .p{display:none}
body{padding-top:58px!important}
#zyBtn{position:fixed;top:10px;right:10px;z-index:50;border:2px solid rgba(0,0,0,.1);background:#fff;border-radius:999px;padding:6px 12px;font:900 14px "Noto Sans TC",sans-serif;color:#2b2340;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.08)}
#zyBtn.on{background:#2b2340;color:#fff}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const CJK=/[\u4e00-\u9fff]/;
function pin(z){
  if(!z)return '';
  let light=false;if(z.endsWith('˙')){light=true;z=z.slice(0,-1);}
  let tone='';const m=z.match(/[ˊˇˋ]$/);if(m){tone=m[0];z=z.slice(0,-1);}
  return `<span class="p"><span class="c">${light?'<i class="lt">˙</i>':''}${[...z].map(c=>`<i>${c}</i>`).join('')}</span><span class="t${tone?'':' n'}">${tone||'ˊ'}</span></span>`;
}

function convert(text){
  const out=[];let i=0;const sound=new Array(text.length).fill(null);
  for(let k=0;k<text.length;k++){for(const w of KEYS){if(text.startsWith(w,k)){OV[w].forEach((z,j)=>{if(z&&sound[k+j]==null)sound[k+j]=z;});}}}
  let html='';
  for(let k=0;k<text.length;k++){const c=text[k];
    if(CJK.test(c)&&(sound[k]||T[c]))html+=`<span class="zy"><span class="h">${c}</span>${pin(sound[k]||T[c])}</span>`;
    else html+=c.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  return html;
}
function skip(el){
  for(let e=el;e;e=e.parentNode){
    if(e.nodeType!==1)continue;
    const t=e.tagName;
    if(t==='SCRIPT'||t==='STYLE'||t==='TITLE'||t==='svg'||t==='SVG'||e.namespaceURI==='http://www.w3.org/2000/svg')return true;
    if(e.id==='zyBtn'||(e.classList&&e.classList.contains('zy')))return true;
    if(e.classList&&['hud','backhome','sub','best','foot','unit','pill'].some(c=>e.classList.contains(c)))return true;
  }
  return false;
}
function walk(root){
  if(root.nodeType===3){fixText(root);return;}
  if(root.nodeType!==1||skip(root))return;
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const list=[];
  while(tw.nextNode())list.push(tw.currentNode);
  list.forEach(fixText);
}
function fixText(n){
  if(!n.parentNode||!CJK.test(n.data)||skip(n.parentNode))return;
  const span=document.createElement('span');span.innerHTML=convert(n.data);
  const frag=document.createDocumentFragment();while(span.firstChild)frag.appendChild(span.firstChild);
  n.parentNode.replaceChild(frag,n);
}
let on=true;try{on=localStorage.getItem('zhuyin')!=='off';}catch(e){}
const btn=document.createElement('button');btn.id='zyBtn';
function render(){document.body.classList.toggle('nozy',!on);btn.textContent=on?'注音：開':'注音：關';btn.classList.toggle('on',on);}
btn.onclick=()=>{on=!on;try{localStorage.setItem('zhuyin',on?'on':'off')}catch(e){}render();};
document.body.appendChild(btn);render();
walk(document.body);
new MutationObserver(ms=>{ms.forEach(m=>{
  if(m.type==='characterData'){fixText(m.target);return;}
  m.addedNodes.forEach(walk);
});}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();

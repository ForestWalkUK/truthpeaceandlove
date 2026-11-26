/* #thecut - the interactive cut-off line (v6.4). Loaded only on /thecut/, through "js:" in the page's front matter. */
{
const BANDS=[
 ["Outstanding","selfless, devout, admired by all"],
 ["Very good","generous, faithful, honest"],
 ["Good","decent, kind, keeps the law"],
 ["Average","mostly decent; some lies, a quick temper"],
 ["Below average","selfish, unfaithful, dishonest"],
 ["Bad","cruel, a thief, a bully"],
 ["Very wicked","murderer, abuser, tyrant"]];
const PEOPLE=[
 {band:0,side:"L",outcome:"Not justified (Luke 18:14)",name:"The Pharisee",note:"A strict religious leader in Jesus’ day, who fasted, prayed and gave a tenth of all he had.",ref:"Luke 18:11-12",
  v:"The Pharisee stood and prayed thus with himself, God, I thank thee, that I am not as other men <em>are</em>, extortioners, unjust, adulterers, or even as this publican. I fast twice in the week, I give tithes of all that I possess."},
 {band:1,side:"L",outcome:"Went away grieved (Mark 10:22)",where:"Very good band · trusting in his riches",name:"The rich young ruler",note:"A respected young man who had kept the commandments from his youth, but whose trust was in his riches, so he went away from Jesus grieved.",ref:"Mark 10:20-24",
  v:"And he answered and said unto him, Master, all these have I observed from my youth. Then Jesus beholding him loved him, and said unto him, One thing thou lackest: go thy way, sell whatsoever thou hast, and give to the poor, and thou shalt have treasure in heaven: and come, take up the cross, and follow me. And he was sad at that saying, and went away grieved: for he had great possessions. And Jesus looked round about, and saith unto his disciples, How hardly shall they that have riches enter into the kingdom of God! And the disciples were astonished at his words. But Jesus answereth again, and saith unto them, Children, how hard is it for them that trust in riches to enter into the kingdom of God!"},
 {band:2,side:"L",outcome:"In the gall of bitterness, and <em>in</em> the bond of iniquity (Acts 8:23)",name:"Simon the sorcerer",note:"A sorcerer in Samaria who professed to believe, was baptised, and kept close to Philip the evangelist. But he offered the apostles money for the power to give the Holy Ghost. The Bible does not tell us what became of him.",ref:"Acts 8:18-23",
  v:"And when Simon saw that through laying on of the apostles’ hands the Holy Ghost was given, he offered them money, Saying, Give me also this power, that on whomsoever I lay hands, he may receive the Holy Ghost. But Peter said unto him, Thy money perish with thee, because thou hast thought that the gift of God may be purchased with money. Thou hast neither part nor lot in this matter: for thy heart is not right in the sight of God. Repent therefore of this thy wickedness, and pray God, if perhaps the thought of thine heart may be forgiven thee. For I perceive that thou art in the gall of bitterness, and <em>in</em> the bond of iniquity."},
 {band:4,side:"R",outcome:"Justified (Luke 18:14)",name:"The publican",note:"A tax collector working for Rome; such men were often cheats, and were despised.",ref:"Luke 18:13-14",
  v:"And the publican, standing afar off, would not lift up so much as <em>his</em> eyes unto heaven, but smote upon his breast, saying, God be merciful to me a sinner. I tell you, this man went down to his house justified <em>rather</em> than the other: for every one that exalteth himself shall be abased; and he that humbleth himself shall be exalted."},
 {band:5,side:"R",outcome:"With Christ in paradise (Luke 23:43)",name:"The dying thief",note:"A criminal crucified beside Jesus, who turned to Him in his last hours.",ref:"Luke 23:42-43",
  v:"And he said unto Jesus, Lord, remember me when thou comest into thy kingdom. And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise."},
 {band:6,side:"R",outcome:"Saved (2 Timothy 4:8)",name:"Saul of Tarsus",note:"He hunted down Christians and voted for their deaths, before Christ met him; afterwards known as the apostle Paul.",ref:"Acts 26:10",
  v:"Which thing I also did in Jerusalem: and many of the saints did I shut up in prison, having received authority from the chief priests; and when they were put to death, I gave my voice against <em>them</em>."}];
const $=id=>document.getElementById(id);
const app=$('app'),sec=$('sec'),wrap=$('cwrap'),panel=$('panel');
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
let stage=1,cut=3,timers=[],tearPts=[];

const lab=(b,c)=>`<div class="lab ${c}"><b>${b[0]}</b><span>${b[1]}</span></div>`;
const tableHTML=BANDS.map(b=>`<div class="row">${lab(b,'whole')}${lab(b,'L')}${lab(b,'R')}</div>`).join('');
wrap.innerHTML=`<div class="table orig" id="orig">${tableHTML}</div>
<div class="over" id="over"><div class="hline" id="hline"><span class="chip up" id="cUp">&#8593; Heaven</span><span class="chip down" id="cDn">&#8595; Hell</span><button class="handle" id="handle" aria-label="Your line: drag it, or use the up and down arrow keys">&#8597;</button></div></div>`;
const orig=$('orig'),over=$('over'),hline=$('hline'),handle=$('handle');
$('cards').innerHTML=PEOPLE.map(p=>`<article class="card"><h3>${p.name}</h3><p class="where">${p.where||BANDS[p.band][0]+' band · '+(p.side==='R'?'repentant · trusting in Christ':'unrepentant · not trusting in Christ')}</p><p class="dest">${p.outcome}</p><p>${p.note}</p><blockquote>${p.v}<cite>${p.ref}, <span class="kjv">KJV</span></cite></blockquote></article>`).join('');

const rows=()=>[...orig.querySelectorAll('.row')];
const bounds=()=>{const t=orig.getBoundingClientRect().top;return [0,...rows().map(r=>r.getBoundingClientRect().bottom-t)]};
function placeLine(){
 hline.style.transform=`translateY(${bounds()[cut]}px)`;
 $('cUp').style.display=cut===0?'none':'';$('cDn').style.display=cut===7?'none':'';
}
function describe(c){
 if(c===0)return "Your line: no one goes to heaven.";
 if(c===7)return "Your line: everyone goes to heaven.";
 return `Your line: Heaven for ${BANDS[0][0]}${c>1?' to '+BANDS[c-1][0]:''}; hell for ${BANDS[c][0]}${c<6?' to '+BANDS[6][0]:''}.`;
}
function render(){
 if(stage===1)panel.innerHTML=`<p class="step">Step 1 of 2</p><p class="intro">Here are seven bands of people, from the best to the worst. Move the line to where you think God makes the cut: everyone above it goes to heaven, everyone below it goes to hell. Tap a band, or drag the round handle.</p><p class="readout" id="readout">${describe(cut)}</p><div class="btns"><button class="go" id="next">This is my line</button></div>`;
 if(stage===2)panel.innerHTML=`<p class="step">Step 2 of 2</p><p class="readout">${describe(cut)}</p><p>Now see where God draws His.</p><div class="btns"><button class="go" id="next">Now see God’s line</button><button class="go alt" id="back">Move my line</button></div>`;
 over.classList.toggle('locked',stage===2);
 const n=$('next'),b=$('back');
 if(n)n.onclick=()=>{if(stage===1){stage=2;render()}else reveal()};
 if(b)b.onclick=()=>{stage=1;render()};
 placeLine();
}
function setFromY(y){
 if(stage!==1)return;
 const b=bounds();let best=0;b.forEach((v,i)=>{if(Math.abs(v-y)<Math.abs(b[best]-y))best=i});
 if(best!==cut){cut=best;placeLine();const r=$('readout');if(r)r.textContent=describe(cut)}
}
const yOf=e=>e.clientY-orig.getBoundingClientRect().top;
over.addEventListener('click',e=>{if(e.target===over)setFromY(yOf(e))});
let drag=false;
handle.addEventListener('pointerdown',e=>{if(stage!==1)return;drag=true;handle.setPointerCapture(e.pointerId);e.preventDefault()});
handle.addEventListener('pointermove',e=>{if(drag)setFromY(yOf(e))});
handle.addEventListener('pointerup',()=>drag=false);
handle.addEventListener('pointercancel',()=>drag=false);
handle.addEventListener('keydown',e=>{
 if(stage===1&&(e.key==='ArrowUp'||e.key==='ArrowDown')){e.preventDefault();cut=Math.max(0,Math.min(7,cut+(e.key==='ArrowUp'?-1:1)));placeLine();const r=$('readout');if(r)r.textContent=describe(cut)}
});

/* ---- The reveal: remove the line, tear the table, part the halves, draw God's line ---- */
function makeTear(){
 const n=22;tearPts=[];
 for(let i=0;i<=n;i++){const r=Math.sin(i*12.9898)*43758.5453;tearPts.push({f:i/n,dx:(i===0||i===n)?0:((r-Math.floor(r))*2-1)*11})}
}
function tearGeom(){
 const W=orig.offsetWidth,H=orig.offsetHeight,c=W/2;
 return {W,H,pts:tearPts.map(p=>[c+p.dx,p.f*H])};
}
function clipHalves(){
 const {W,H,pts}=tearGeom(),s=pts.map(p=>`${p[0]}px ${p[1]}px`).join(',');
 const L=wrap.querySelector('.half.left'),R=wrap.querySelector('.half.right');
 if(L)L.style.clipPath=`polygon(-20px -20px,${s},-20px ${H+20}px)`;
 if(R)R.style.clipPath=`polygon(${W+20}px -20px,${s},${W+20}px ${H+20}px)`;
 const d='M'+pts.map(p=>p.join(' ')).join(' L');
 wrap.querySelectorAll('.tear,.edge').forEach(svg=>{svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.querySelector('path').setAttribute('d',d)});
 placeDivider();
}
function placeDivider(){
 const r=wrap.getBoundingClientRect(),s=sec.getBoundingClientRect(),x=r.left+r.width/2-s.left;
 $('vline').style.left=x+'px';$('roundel').style.left=x+'px';
}
const at=(ms,f)=>timers.push(setTimeout(f,still?0:ms));
function reveal(){
 stage=3;makeTear();
 over.classList.add('gone');
 sec.classList.add('reveal');
 const g=Math.max(8,Math.min(22,(sec.clientWidth-wrap.offsetWidth)/2-5));
 wrap.style.setProperty('--g',g+'px');sec.style.setProperty('--g',g+'px');
 sec.scrollIntoView({behavior:still?'auto':'smooth',block:'start'});
 // the tear runs from top to bottom
 at(700,()=>{
  wrap.insertAdjacentHTML('beforeend',`<svg class="tear" preserveAspectRatio="none" aria-hidden="true"><path/></svg>`);
  clipHalves();
  const p=wrap.querySelector('.tear path'),len=p.getTotalLength();
  p.style.strokeDasharray=len;p.style.strokeDashoffset=len;
  p.getBoundingClientRect();
  p.style.transition=still?'none':'stroke-dashoffset 1.4s cubic-bezier(.5,0,.6,1)';p.style.strokeDashoffset=0;
 });
 // the two halves come apart
 at(2250,()=>{
  for(const side of ['left','right']){const h=orig.cloneNode(true);h.removeAttribute('id');h.classList.remove('orig');h.classList.add('half',side);h.setAttribute('aria-hidden','true');h.insertAdjacentHTML('beforeend','<svg class="edge" preserveAspectRatio="none"><path/></svg>');wrap.appendChild(h)}
  wrap.querySelector('.tear').remove();wrap.classList.add('torn');clipHalves();
  wrap.querySelector('.half.left').getBoundingClientRect();
  wrap.querySelector('.half.left').style.transform=`translateX(${-g}px)`;
  wrap.querySelector('.half.right').style.transform=`translateX(${g}px)`;
 });
 at(3200,()=>wrap.querySelectorAll('.half').forEach(h=>h.classList.add('formed')));
 // God's line, top of the screen to the bottom
 at(3500,()=>{placeDivider();sec.classList.add('drawn')});
 at(5100,()=>$('srL').classList.add('on'));
 at(5600,()=>$('stL').classList.add('on'));
 at(6400,()=>$('srR').classList.add('on'));
 at(6900,()=>$('stR').classList.add('on'));
 at(7800,()=>$('ftL').classList.add('on'));
 at(8500,()=>$('ftR').classList.add('on'));
 at(9300,()=>{$('after').classList.add('on');app.classList.add('revealed')});
}
function reset(){
 timers.forEach(clearTimeout);timers=[];stage=1;cut=3;
 wrap.querySelectorAll('.half,.tear').forEach(el=>el.remove());
 wrap.classList.remove('torn');over.classList.remove('gone');
 sec.classList.remove('reveal','drawn');app.classList.remove('revealed');
 document.querySelectorAll('.stamp,.foot,.after').forEach(el=>el.classList.remove('on'));
 render();sec.scrollIntoView({behavior:'smooth',block:'start'});
}
$('again').onclick=reset;
$('readon').onclick=()=>$('truth').scrollIntoView({behavior:'smooth',block:'start'});
const ro=new ResizeObserver(()=>{stage===3?clipHalves():placeLine()});ro.observe(wrap);ro.observe(sec);
render();
}

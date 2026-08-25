// ── CDN Globals (ໂຫຼດຈາກ unpkg ໃນ index.html) ─────────────────────────────
const { useState, useEffect, useRef, useCallback } = React;

// Lucide icons from CDN
const { Activity, Heart, Moon, Flame, Droplets, Wind, Brain,
  TrendingUp, TrendingDown, ChevronRight, Send, Download,
  Camera, Target, Zap, X, MessageSquare, AlertCircle,
  CheckCircle2, Loader2, Globe, Dumbbell, Bike,
  PersonStanding, WifiOff, Layers, Percent } = lucideReact;
const VO2Icon = Wind;

// Recharts from CDN
const { AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis } = Recharts;

// ─── I18N ─────────────────────────────────────────────────────────────────────
const T = {
  lo: {
    appName: "ຄົນແພ້ກໍຕ້ອງດູແລຕົວເອງ", appSub: "ສຸຂະພາບທີ່ດີ ເລີ່ມຕົ້ນຈາກຕົວເຮົາ",
    synced:"ຊິ້ງແລ້ວ", syncing:"ກຳລັງຊິ້ງ…", offline:"ອອບໄລນ໌",
    tabDashboard:"ພາບລວມ", tabSport:"ກິລາ", tabMeals:"ອາຫານ", tabGoals:"ເປົ້າໝາຍ",
    todayWellness:"ສຸຂະພາບວັນນີ້", goodRecovery:"ຟື້ນຕົວດີ",
    wellnessSub:"HRV ເພີ່ມ 17% · ນອນຫຼັບ OK · ຍ່າງຕໍ່ 753 ກ້າວ",
    todayMetrics:"ຕົວຊີ້ວັດວັນນີ້",
    steps:"ກ້າວ", heartRate:"ອັດຕາຫົວໃຈ", sleep:"ນອນ",
    calories:"ແຄລໍລີ", water:"ນ້ຳ", spo2:"SpO₂", hrv:"HRV",
    vo2max:"VO₂ Max", bodyFat:"ໄຂມັນ", floors:"ຊັ້ນ",
    vo2maxSub:"ຄວາມສາມາດ aerobic", bodyFatSub:"ສ່ວນຮ້ອຍໄຂມັນ", floorsSub:"ຂັ້ນໄດ",
    recoveryImproving:"ການຟື້ນຕົວດີຂຶ້ນ",
    sleepStages:"ໄລຍະການນອນ — ຄືນທີ່ຜ່ານມາ",
    deep:"ນອນເລິກ", rem:"REM", light:"ນອນເບົາ",
    meowInsights:"ຄຳແນະນຳຈາກໂຄ໊ດແມວ 🐱",
    sportDetect:"ກວດຈັບກິລາ (Auto Sport Detect)", sportSub:"ລະບົບກວດຈັບການອອກກຳລັງກາຍ",
    duration:"ໄລຍະ", hrZone:"Zone HR", burned:"ເຜົາ",
    aiMealLogger:"AI ສ່ອງອາຫານ (Gemini Vision)",
    dropHere:"ລາກໄຟລ຺ ຫຼື ກົດເພື່ອເລືອກຮູບ", analyzing:"AI ກຳລັງວິເຄາະ…",
    noMeals:"ຍັງບໍ່ໄດ້ບັນທຶກອາຫານວັນນີ້", noMealsSub:"ຖ່າຍຮູບ ຫຼື ພິມຊື່ອາຫານ",
    mealDisclaimer:"ຄ່າໂພຊະນາການເປັນພຽງການຄາດຄະເນ. ປຶກສານັກໂພຊະນາການ.",
    todayLog:"ບັນທຶກວັນນີ້",
    smartGoals:"ເປົ້າໝາຍອັດສະລິຍະ", aiAdjusted:"AI ປັບໃໝ່ອາທິດນີ້",
    aiAdjustedText:"ທ່ານຍ່າງສະເລ່ຍ 8,500 ກ້າວ. Meow Coach ປ່ຽນເປົ້າເປັນ 10,000 ກ້າວ.",
    goal:"ເປົ້າ", today:"ວັນນີ້", toGo:"ຕ້ອງການ",
    exportPDF:"ສົ່ງອອກລາຍງານ 30 ວັນ (PDF)",
    healthDisclaimer:"ຂໍ້ມູນສຸຂະພາບໃຊ້ສຳລັບຕິດຕາມສ່ວນຕົວ. ບໍ່ທົດແທນຄຳແນະນຳທາງການແພດ.",
    meowCoach:"ໂຄ໊ດແມວ 🐱", online:"ອອນລາຍ",
    askMeow:"ຖາມໂຄ໊ດແມວ… (ລະວັງໂດນດ່າ 😹)",
    meowDisclaimer:"ໂຄ໊ດແມວໃຫ້ຄຳແນະນຳດ້ານສຸຂະຄາບ ບໍ່ແມ່ນຄຳແນະນຳທາງການແພດ.",
    qq1:"VO₂ Max ຂ້ອຍດີບໍ?", qq2:"ໄຂມັນຫຼາຍ ຄວນເຮັດຫຍັງ?", qq3:"ນອນໜ້ອຍ ເຮັດໄດ້ແນວໃດ?",
    openCoach:"ເປີດ Meow Coach", of:"ຈາກ", wellness:"ສຸຂະພາບ",
    insightTitle1:"ໄລຍະ REM ຫຼຸດ", insightBody1:"REM 1.1h — ຕ່ຳ 18%. ປິດໜ້າຈໍ 45 ນາທີກ່ອນນອນ.",
    insightTitle2:"HRV ດີຂຶ້ນ", insightBody2:"HRV 36→42 ms. ການຟື້ນຕົວດີ.",
    insightTitle3:"VO₂ Max ພ້ອມ", insightBody3:"VO₂ Max 48 ml/kg/min — ລະດັບ Excellent ສຳລັບອາຍຸ.",
    orType:"ຫຼື ພິມ:", mealTypePlaceholder:"ພິມຊື່ອາຫານ… ເຊັ່ນ: ເຂົ້າໜຽວ + ໄກ່ຢ່າງ",
    vo2Zone:"ລະດັບ VO₂",
    bodyFatZone:"ຂອບເຂດໄຂມັນ",
  },
  en: {
    appName:"Even Losers Care for Themselves", appSub:"Good health starts with you",
    synced:"Synced", syncing:"Syncing…", offline:"Offline",
    tabDashboard:"Dashboard", tabSport:"Sport", tabMeals:"Meals", tabGoals:"Goals",
    todayWellness:"TODAY'S WELLNESS", goodRecovery:"Good Recovery",
    wellnessSub:"HRV up 17% · Sleep OK · 753 steps to goal",
    todayMetrics:"Today's Metrics",
    steps:"Steps", heartRate:"Heart Rate", sleep:"Sleep",
    calories:"Calories", water:"Water", spo2:"SpO₂", hrv:"HRV",
    vo2max:"VO₂ Max", bodyFat:"Body Fat", floors:"Floors",
    vo2maxSub:"Aerobic capacity", bodyFatSub:"Body fat percentage", floorsSub:"Climbed today",
    recoveryImproving:"Recovery improving",
    sleepStages:"Sleep Stages — Last Night",
    deep:"Deep", rem:"REM", light:"Light",
    meowInsights:"Meow Coach Insights 🐱",
    sportDetect:"Auto Sport Detection", sportSub:"AI-detected workout sessions",
    duration:"Duration", hrZone:"HR Zone", burned:"Burned",
    aiMealLogger:"AI Meal Photo Logger (Gemini Vision)",
    dropHere:"Drop image here or click to browse", analyzing:"AI analyzing your meal…",
    noMeals:"No meals logged yet today", noMealsSub:"Upload a photo or type a meal",
    mealDisclaimer:"Nutritional estimates are approximate. Consult a dietitian.",
    todayLog:"Today's Log",
    smartGoals:"Smart Goals", aiAdjusted:"AI ADJUSTED THIS WEEK",
    aiAdjustedText:"You averaged 8,500 steps. Meow Coach bumped your goal to 10,000.",
    goal:"Goal", today:"today", toGo:"to go",
    exportPDF:"Export 30-Day Health Report (PDF)",
    healthDisclaimer:"Health data is for personal tracking only. Not medical advice.",
    meowCoach:"Meow Coach 🐱", online:"Online",
    askMeow:"Ask Meow Coach… (prepare to be roasted 😹)",
    meowDisclaimer:"Meow Coach provides wellness tips only. Not medical advice.",
    qq1:"Is my VO₂ Max good?", qq2:"Help with body fat?", qq3:"Help me sleep better",
    openCoach:"Open Meow Coach", of:"of", wellness:"WELLNESS",
    insightTitle1:"REM Sleep Dip", insightBody1:"REM avg 1.1h — below norm. Dim screens 45min before bed.",
    insightTitle2:"HRV Trending Up", insightBody2:"HRV 36→42 ms. Recovery improving.",
    insightTitle3:"VO₂ Max Strong", insightBody3:"VO₂ Max 48 ml/kg/min — Excellent for your age range.",
    orType:"Or type:", mealTypePlaceholder:"Type a meal… e.g. Sticky rice + grilled chicken",
    vo2Zone:"VO₂ Category",
    bodyFatZone:"Fat Range",
  }
};

// ─── MOCK DATA (includes new metrics) ─────────────────────────────────────────
const TODAY = {
  steps:9247, stepsGoal:10000,
  heartRate:68, hrv:42,
  sleep:5.2, sleepGoal:8, deepSleep:0.8, remSleep:1.1, lightSleep:3.3,
  calories:1840, caloriesGoal:2200,
  water:1.8, waterGoal:2.5,
  spo2:98, spo2Goal:95,          // SpO₂ — goal is minimum threshold
  floors:12, floorsGoal:20,       // NEW: floors climbed
  vo2max:48.2,                    // NEW: VO₂ Max ml/kg/min
  bodyFat:18.4,                   // NEW: body fat %
  weight:72.4,
};

// VO₂ Max category helper
function vo2Category(v, lang) {
  if (v >= 55) return lang==="lo" ? "ດີເລີດ 🏆" : "Elite 🏆";
  if (v >= 47) return lang==="lo" ? "ດີຫຼາຍ ✅" : "Excellent ✅";
  if (v >= 38) return lang==="lo" ? "ດີ 👍" : "Good 👍";
  if (v >= 30) return lang==="lo" ? "ກາງ ⚠️" : "Average ⚠️";
  return lang==="lo" ? "ຕ່ຳ ❌" : "Below Avg ❌";
}

// Body fat category
function bodyFatCategory(bf, lang) {
  if (bf < 10) return lang==="lo" ? "ຕ່ຳຫຼາຍ" : "Very Low";
  if (bf < 18) return lang==="lo" ? "ດີ 👍" : "Fit 👍";
  if (bf < 25) return lang==="lo" ? "ປານກາງ ✅" : "Normal ✅";
  if (bf < 30) return lang==="lo" ? "ສູງ ⚠️" : "High ⚠️";
  return lang==="lo" ? "ສູງຫຼາຍ ❌" : "Obese ❌";
}

const genWeek = (base, v) =>
  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({
    day:d, value:Math.round(base+(Math.random()-.5)*v),
  }));

const WEEK_DATA = {
  steps:genWeek(8500,3000),
  heartRate:genWeek(69,10),
  sleep:genWeek(70,15).map(d=>({...d,value:+(d.value/10+5).toFixed(1)})),
  calories:genWeek(1900,400),
  spo2:genWeek(97,3).map(d=>({...d,value:Math.max(90,Math.min(100,d.value))})),
  floors:genWeek(14,8).map(d=>({...d,value:Math.max(2,d.value)})),
  vo2max:Array.from({length:30},(_,i)=>({day:i+1,value:+(47+Math.sin(i/4)*2+Math.random()).toFixed(1)})),
  bodyFat:Array.from({length:30},(_,i)=>({day:i+1,value:+(18.8-i*0.015+Math.random()*0.3).toFixed(1)})),
};

const MONTH_DATA = Array.from({length:30},(_,i)=>({
  day:i+1,
  steps:Math.round(7000+Math.random()*4000),
  wellness:Math.round(55+Math.random()*40),
}));

const SPORTS = [
  {id:1,type:"Running",       icon:PersonStanding, color:"#10b981", duration:"38 min", hrZone:"Zone 3", burned:312, distance:"5.2 km"},
  {id:2,type:"Weightlifting", icon:Dumbbell,       color:"#6366f1", duration:"52 min", hrZone:"Zone 2", burned:280, distance:null},
  {id:3,type:"Cycling",       icon:Bike,           color:"#f59e0b", duration:"25 min", hrZone:"Zone 2", burned:195, distance:"8.1 km"},
];

const RADAR_DATA = [
  {subject:"Steps",    A:92}, {subject:"Sleep",  A:65},
  {subject:"HRV",      A:78}, {subject:"VO₂",    A:80},
  {subject:"Body Fat", A:73}, {subject:"SpO₂",   A:98},
];

// ─── RECOVERY SCORE ALGORITHM ─────────────────────────────────────────────────
function calcWellness({sleep,sleepGoal,deepSleep,hrv,calories,caloriesGoal,spo2,vo2max,bodyFat}) {
  const sleepScore = Math.min(100,(sleep/sleepGoal)*100)*0.28;
  const deepScore  = Math.min(100,(deepSleep/1.5)*100)*0.12;
  const hrvScore   = Math.min(100,(hrv/60)*100)*0.25;
  const calScore   = Math.min(100,(calories/caloriesGoal)*100)*0.15;
  const spo2Score  = Math.min(100,((spo2-88)/12)*100)*0.10;
  const vo2Score   = Math.min(100,(vo2max/60)*100)*0.05;
  const fatScore   = Math.max(0,100-(bodyFat-10)*2)*0.05;
  return Math.round(sleepScore+deepScore+hrvScore+calScore+spo2Score+vo2Score+fatScore);
}
const wellnessScore = calcWellness(TODAY);
const isBadSleep = s => s.sleep < 6 || s.deepSleep < 1.0;

// ─── API ──────────────────────────────────────────────────────────────────────
async function callAI(messages, system) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-6", max_tokens:1000, system,
      messages:messages.map(m=>({role:m.role,content:m.content})),
    }),
  });
  const d = await res.json();
  return d.content?.map(b=>b.text).join("")||"...";
}

async function analyzeMealImage(base64,text,lang) {
  const prompt = base64 ? `Analyze this food photo (base64 provided). Estimate macros.` : `Analyze: "${text}"`;
  const fmt = lang==="lo"
    ? "ຕອບເປັນພາສາລາວ. ຮູບແບບ: '[ຊື່] — ~[X] kcal | ທາດໂປຣ:[Xg] ຄາໂບ:[Xg] ໄຂມັນ:[Xg]'. ໝາຍເຫດສັ້ນ."
    : "Respond in English. Format: '[Meal] — ~[X] kcal | P:[Xg] C:[Xg] F:[Xg]'. Short health note.";
  return callAI([{role:"user",content:`${prompt}\n${fmt}`}],
    lang==="lo"?"ທ່ານເປັນນັກໂພຊະນາການ AI. ຄາດຄະເນກະທັດຮັດ.":"You are an AI nutritionist. Estimate accurately and concisely.");
}

function buildMeowPrompt(lang) {
  const bad = isBadSleep(TODAY);
  const base = lang==="lo"
    ? `ທ່ານຄື "ໂຄ໊ດແມວ" — AI ຄູຝຶກສຸຂະພາບສາດ ກວນ ຊາດ. ຕອບລາວ. ໃຊ້ 🐱😹🔥 ຫຼາຍ.`
    : `You are "Meow Coach" — a sassy sarcastic AI cat health coach. Speak with cattitude. Use 🐱😹🔥 emojis freely.`;
  const roast = bad
    ? lang==="lo"
      ? `\n🚨 ຜູ້ໃຊ້ນອນ ${TODAY.sleep}h, Deep ${TODAY.deepSleep}h — ດ່າ​ຊາດໆ! ບອກ​ວ່າ​ມັນ​ຄວາມ​ຜິດ​ລາວ​ເອງ.`
      : `\n🚨 User slept ${TODAY.sleep}h, Deep ${TODAY.deepSleep}h. ROAST THEM. Make it their fault. Be dramatically sassy.`
    : "";
  const ctx = `\nData: Steps ${TODAY.steps}/${TODAY.stepsGoal}, HR ${TODAY.heartRate}bpm, HRV ${TODAY.hrv}ms, Sleep ${TODAY.sleep}h, SpO₂ ${TODAY.spo2}%, VO₂ ${TODAY.vo2max}, Body Fat ${TODAY.bodyFat}%, Floors ${TODAY.floors}, Wellness ${wellnessScore}/100`;
  return base+roast+ctx+`\n${lang==="lo"?"ໝາຍເຫດທາງການແພດໃນຕອນທ້າຍ.":"End with a brief medical disclaimer."}`;
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
const pct = (val,goal)=>Math.min(100,Math.round((val/goal)*100));

function WellnessRing({score,label}) {
  const r=54, circ=2*Math.PI*r;
  const color=score>=75?"#10b981":score>=50?"#f59e0b":"#ef4444";
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1e2130" strokeWidth="10"/>
      <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={circ-(score/100)*circ} strokeLinecap="round"
        style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset 1.2s ease"}}/>
      <text x="70" y="65" textAnchor="middle" fill="white" fontSize="28" fontWeight="700">{score}</text>
      <text x="70" y="82" textAnchor="middle" fill="#6b7280" fontSize="10">{label}</text>
    </svg>
  );
}

function MiniRing({pct:p,color,size=28,stroke=3}) {
  const r=(size-stroke*2)/2, circ=2*Math.PI*r;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e2130" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ-(p/100)*circ} strokeLinecap="round"
        style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}/>
    </svg>
  );
}

function MetricCard({icon:Icon,label,value,unit,goal,color,trend,subLabel,badge}) {
  const p=goal?pct(value,goal):null;
  return (
    <div className="metric-card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{background:`${color}20`,borderRadius:9,padding:7,display:"flex"}}><Icon size={14} color={color}/></div>
          <span style={{color:"#6b7280",fontSize:10,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>{label}</span>
        </div>
        {trend!==undefined&&(
          <div style={{display:"flex",alignItems:"center",gap:3,color:trend>=0?"#10b981":"#ef4444",fontSize:10}}>
            {trend>=0?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{Math.abs(trend)}%
          </div>
        )}
      </div>
      <div style={{display:"flex",alignItems:"flex-end",gap:3,marginBottom:2}}>
        <span style={{color:"white",fontSize:26,fontWeight:700,lineHeight:1}}>{value}</span>
        <span style={{color:"#6b7280",fontSize:11,marginBottom:2}}>{unit}</span>
      </div>
      {subLabel&&<div style={{color:"#4b5563",fontSize:10,marginBottom:5}}>{subLabel}</div>}
      {badge&&<div style={{display:"inline-block",background:`${color}18`,color,fontSize:10,fontWeight:600,borderRadius:5,padding:"2px 7px",marginBottom:5}}>{badge}</div>}
      {p!==null&&(
        <div style={{marginTop:7}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
            <span style={{color:"#4b5563",fontSize:10}}>{goal}{unit}</span>
            <span style={{color,fontSize:10,fontWeight:600}}>{p}%</span>
          </div>
          <div style={{height:3,background:"#1e2130",borderRadius:2}}>
            <div style={{height:"100%",width:`${p}%`,background:color,borderRadius:2,transition:"width 1s ease"}}/>
          </div>
        </div>
      )}
    </div>
  );
}

const CT=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return <div style={{background:"#0f111a",border:"1px solid #1e2130",borderRadius:7,padding:"6px 10px"}}>
    <div style={{color:"#6b7280",fontSize:10,marginBottom:1}}>{label}</div>
    <div style={{color:"white",fontSize:13,fontWeight:600}}>{payload[0]?.value}</div>
  </div>;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function HealthApp() {
  const [lang,setLang]=useState("lo");
  const t=T[lang];
  const meowPrompt=buildMeowPrompt(lang);
  const badSleep=isBadSleep(TODAY);

  const SLEEP_STAGES=[
    {name:t.deep, value:TODAY.deepSleep, fill:"#6366f1"},
    {name:t.rem,  value:TODAY.remSleep,  fill:"#8b5cf6"},
    {name:t.light,value:TODAY.lightSleep,fill:"#a78bfa"},
  ];
  const INSIGHTS=[
    {id:1,icon:Moon,  color:"#8b5cf6",title:t.insightTitle1,body:t.insightBody1},
    {id:2,icon:Heart, color:"#ef4444",title:t.insightTitle2,body:t.insightBody2},
    {id:3,icon:Activity,color:"#10b981",title:t.insightTitle3,body:t.insightBody3},
  ];

  const [tab,setTab]=useState("dashboard");
  const [chatOpen,setChatOpen]=useState(false);
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [syncing,setSyncing]=useState(false);
  const [syncStatus,setSyncStatus]=useState("synced");
  const [mealInput,setMealInput]=useState("");
  const [mealLog,setMealLog]=useState([]);
  const [mealLoading,setMealLoading]=useState(false);
  const [imgPreview,setImgPreview]=useState(null);
  const [imgBase64,setImgBase64]=useState(null);
  const fileRef=useRef(null);
  const chatEnd=useRef(null);

  useEffect(()=>{
    const welcome=lang==="lo"
      ? `ເມ້ຍ~ 🐱 ຂ້ອຍຄື ໂຄ໊ດແມວ! ${badSleep?`ເຈົ້ານອນແຄ່ ${TODAY.sleep}h VO₂ Max ${TODAY.vo2max}?! ໄປ**ນອນ**ກ່ອນ! 😹🔥`:`ສຸຂະພາບ ${wellnessScore}/100 · VO₂ ${TODAY.vo2max} · ໄຂມັນ ${TODAY.bodyFat}% — ໂອເຄ! ຢາກໃຫ້ຊ່ວຍຫຍັງ? 😸`}`
      : `Meow~ 🐱 I'm Meow Coach! ${badSleep?`You only slept ${TODAY.sleep}h?! Your VO₂ Max is suffering too! GO TO BED! 😹🔥`:`Wellness ${wellnessScore}/100 · VO₂ ${TODAY.vo2max} · Body Fat ${TODAY.bodyFat}% — decent! How can this sassy cat help? 😸`}`;
    setMessages([{role:"assistant",content:welcome}]);
  },[lang]);

  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  const sendMessage=useCallback(async()=>{
    if(!input.trim()||loading)return;
    const um={role:"user",content:input};
    setMessages(p=>[...p,um]); setInput(""); setLoading(true);
    try{
      const r=await callAI([...messages,um],meowPrompt);
      setMessages(p=>[...p,{role:"assistant",content:r}]);
    }catch{
      setMessages(p=>[...p,{role:"assistant",content:lang==="lo"?"ມີຂໍ້ຜິດພາດ 😿":"Error 😿"}]);
    }
    setLoading(false);
  },[input,loading,messages,meowPrompt,lang]);

  const handleImg=e=>{
    const f=e.target.files?.[0]; if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{setImgPreview(ev.target.result);setImgBase64(ev.target.result.split(",")[1]);};
    r.readAsDataURL(f);
  };

  const logMeal=useCallback(async()=>{
    if(!mealInput.trim()&&!imgBase64)return;
    const meal=mealInput||(lang==="lo"?"ອາຫານໃນຮູບ":"Food from photo");
    setMealInput(""); setImgPreview(null); setImgBase64(null); setMealLoading(true);
    try{
      const a=await analyzeMealImage(imgBase64,meal,lang);
      setMealLog(p=>[{id:Date.now(),meal,analysis:a,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),hasImg:!!imgBase64},...p]);
    }catch{
      setMealLog(p=>[{id:Date.now(),meal,analysis:lang==="lo"?"ວິເຄາະບໍ່ໄດ້":"Could not analyze.",time:"--:--",hasImg:false},...p]);
    }
    setMealLoading(false);
  },[mealInput,imgBase64,lang]);

  return (
    <div className="app-root">
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080a12;}
        .app-root{min-height:100vh;background:#080a12;color:white;
          font-family:-apple-system,BlinkMacSystemFont,'Noto Sans Lao','Inter',sans-serif;
          max-width:1100px;margin:0 auto;padding:0 14px 80px;}
        .header{display:flex;justify-content:space-between;align-items:center;padding:16px 0 18px;border-bottom:1px solid #0f111a;}
        .logo{display:flex;align-items:center;gap:9px;}
        .logo-mark{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#10b981,#6366f1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .app-name{font-size:12px;font-weight:700;line-height:1.2;max-width:160px;}
        .app-sub{font-size:9px;color:#4b5563;margin-top:1px;}
        .hdr-right{display:flex;align-items:center;gap:6px;flex-shrink:0;}
        .lang-btn,.sync-badge{display:flex;align-items:center;gap:4px;background:#0f111a;border:1px solid #1e2130;padding:4px 9px;border-radius:20px;font-size:10px;cursor:pointer;transition:all .2s;font-family:inherit;}
        .lang-btn{color:#9ca3af;font-weight:600;} .lang-btn:hover{border-color:#6366f1;color:#818cf8;}
        .sync-badge{color:#6b7280;} .sync-badge:hover{border-color:#10b981;color:#10b981;}
        .avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;font-size:15px;cursor:pointer;flex-shrink:0;}
        .nav-tabs{display:flex;gap:3px;margin:16px 0 14px;background:#0f111a;padding:3px;border-radius:11px;border:1px solid #1e2130;}
        .nav-tab{flex:1;padding:7px 2px;text-align:center;border:none;background:transparent;color:#4b5563;border-radius:8px;cursor:pointer;font-size:11px;font-weight:500;transition:all .2s;font-family:inherit;}
        .nav-tab.active{background:#1a1d2e;color:white;}
        .sec-title{font-size:10px;color:#4b5563;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:9px;}
        .metric-card{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:13px;padding:13px;transition:border-color .2s;}
        .metric-card:hover{border-color:#2d3148;}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
        .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
        @media(max-width:580px){.g3,.g4{grid-template-columns:1fr 1fr;}.app-name{max-width:120px;font-size:10px;}}
        .wellness-card{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:13px;padding:15px;display:flex;align-items:center;gap:12px;margin-bottom:8px;}
        .insight-card{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:11px;padding:12px;display:flex;gap:10px;align-items:flex-start;cursor:pointer;transition:border-color .2s;margin-bottom:6px;}
        .insight-card:hover{border-color:#2d3148;}
        .chart-card{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:13px;padding:14px;margin-bottom:8px;}
        .sport-card{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:11px;padding:13px;margin-bottom:8px;display:flex;align-items:center;gap:11px;}
        .roast-badge{background:#3b0a0a;border:1px solid #ef4444;border-radius:9px;padding:9px 13px;font-size:12px;color:#fca5a5;margin-bottom:9px;display:flex;gap:8px;align-items:center;line-height:1.5;}
        .chat-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);z-index:40;animation:fadeIn .2s ease;}
        .chat-drawer{position:fixed;right:0;top:0;bottom:0;width:min(420px,100vw);background:#0d0f1a;border-left:1px solid #1a1d2e;display:flex;flex-direction:column;z-index:50;animation:slideIn .3s ease;}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .chat-hdr{padding:12px 15px;border-bottom:1px solid #1a1d2e;display:flex;justify-content:space-between;align-items:center;}
        .chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;scrollbar-color:#1e2130 transparent;}
        .msg-bubble{max-width:87%;padding:9px 12px;border-radius:12px;font-size:12px;line-height:1.55;white-space:pre-wrap;font-family:inherit;}
        .msg-bubble.user{background:#6366f1;color:white;margin-left:auto;border-bottom-right-radius:3px;}
        .msg-bubble.assistant{background:#1a1d2e;color:#e5e7eb;border-bottom-left-radius:3px;}
        .chat-input-row{padding:8px 12px;border-top:1px solid #1a1d2e;display:flex;gap:6px;}
        .ci{flex:1;background:#1a1d2e;border:1px solid #252838;border-radius:10px;padding:8px 11px;color:white;font-size:12px;outline:none;resize:none;font-family:inherit;}
        .ci:focus{border-color:#6366f1;} .ci::placeholder{color:#4b5563;}
        .send-btn{width:35px;height:35px;border-radius:9px;background:#6366f1;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0;align-self:flex-end;}
        .send-btn:hover{background:#818cf8;} .send-btn:disabled{background:#252838;cursor:not-allowed;}
        .fab{position:fixed;bottom:20px;right:20px;z-index:30;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;cursor:pointer;box-shadow:0 8px 22px rgba(239,68,68,.35);display:flex;align-items:center;justify-content:center;transition:transform .2s;font-size:21px;}
        .fab:hover{transform:scale(1.09);}
        .meal-log-item{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:10px;padding:12px;margin-bottom:7px;}
        .disclaimer{background:#1a1205;border:1px solid #78350f;border-radius:8px;padding:8px 12px;font-size:11px;color:#d97706;margin-top:8px;display:flex;gap:6px;align-items:flex-start;line-height:1.5;}
        .upload-zone{border:1.5px dashed #2d3148;border-radius:11px;padding:18px;text-align:center;cursor:pointer;transition:border-color .2s;background:#0d0f1a;}
        .upload-zone:hover{border-color:#6366f1;}
        .img-preview{width:100%;max-height:170px;object-fit:cover;border-radius:9px;margin-bottom:9px;}
        /* stat chip */
        .chip{display:inline-flex;align-items:center;gap:4px;background:#1a1d2e;border:1px solid #2d3148;border-radius:7px;padding:3px 8px;font-size:10px;color:#9ca3af;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
      `}</style>

      {/* HEADER */}
      <div className="header">
        <div className="logo">
          <div className="logo-mark"><Activity size={15} color="white"/></div>
          <div>
            <div className="app-name">{t.appName}</div>
            <div className="app-sub">{t.appSub}</div>
          </div>
        </div>
        <div className="hdr-right">
          <button className="lang-btn" onClick={()=>setLang(l=>l==="lo"?"en":"lo")}><Globe size={10}/>{lang==="lo"?"EN":"ລາວ"}</button>
          <button className="sync-badge" onClick={()=>{setSyncing(true);setSyncStatus("syncing");setTimeout(()=>{setSyncing(false);setSyncStatus("synced")},2200);}}>
            {syncing?<Loader2 size={10} style={{animation:"spin 1s linear infinite"}}/>:syncStatus==="synced"?<CheckCircle2 size={10} color="#10b981"/>:<WifiOff size={10} color="#ef4444"/>}
            {syncing?t.syncing:syncStatus==="synced"?t.synced:t.offline}
          </button>
          <div className="avatar">🐱</div>
        </div>
      </div>

      {/* NAV */}
      <div className="nav-tabs">
        {[["dashboard",t.tabDashboard],["sport",t.tabSport],["meals",t.tabMeals],["goals",t.tabGoals]].map(([id,label])=>(
          <button key={id} className={`nav-tab ${tab===id?"active":""}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ══════════════════ DASHBOARD ══════════════════ */}
      {tab==="dashboard"&&(
        <>
          {badSleep&&<div className="roast-badge"><span style={{fontSize:17}}>😹</span>
            <span>{lang==="lo"?`ໂຄ໊ດແມວ: ເຈົ້ານອນ ${TODAY.sleep}h · Deep ${TODAY.deepSleep}h. ລາວຖາມໄດ້ 👇`:`Meow: You slept ${TODAY.sleep}h & Deep ${TODAY.deepSleep}h. Open Meow Coach below 👇`}</span>
          </div>}

          {/* Wellness Ring + Radar */}
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:10,marginBottom:8}}>
            <div className="wellness-card" style={{margin:0}}>
              <WellnessRing score={wellnessScore} label={t.wellness}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:9,color:"#4b5563",letterSpacing:".06em",marginBottom:2,textTransform:"uppercase"}}>{t.todayWellness}</div>
                <div style={{fontSize:16,fontWeight:700,marginBottom:3,color:wellnessScore<60?"#ef4444":wellnessScore<75?"#f59e0b":"#10b981"}}>{t.goodRecovery}</div>
                <div style={{fontSize:11,color:"#6b7280",lineHeight:1.5,marginBottom:8}}>{t.wellnessSub}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[[t.sleep,"#8b5cf6",pct(TODAY.sleep,TODAY.sleepGoal)],[t.steps,"#10b981",pct(TODAY.steps,TODAY.stepsGoal)],[t.water,"#06b6d4",pct(TODAY.water,TODAY.waterGoal)]].map(([l,c,p])=>(
                    <div key={l} style={{display:"flex",alignItems:"center",gap:3}}>
                      <MiniRing pct={p} color={c}/><span style={{fontSize:9,color:"#6b7280"}}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="chart-card" style={{margin:0}}>
              <div style={{fontSize:11,fontWeight:600,color:"white",marginBottom:4}}>Wellness Radar</div>
              <ResponsiveContainer width="100%" height={140}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="#1e2130"/>
                  <PolarAngleAxis dataKey="subject" tick={{fill:"#4b5563",fontSize:9}}/>
                  <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Main metrics */}
          <div className="sec-title" style={{marginBottom:8}}>{t.todayMetrics}</div>
          <div className="g2" style={{marginBottom:8}}>
            <MetricCard icon={Activity} label={t.steps} value={TODAY.steps.toLocaleString()} unit="" goal={TODAY.stepsGoal} color="#10b981" trend={+5}/>
            <MetricCard icon={Heart} label={t.heartRate} value={TODAY.heartRate} unit=" bpm" color="#ef4444" trend={-2} subLabel={`HRV ${TODAY.hrv}ms`}/>
          </div>
          <div className="g3" style={{marginBottom:8}}>
            <MetricCard icon={Moon} label={t.sleep} value={TODAY.sleep} unit="h" goal={TODAY.sleepGoal} color="#8b5cf6"/>
            <MetricCard icon={Flame} label={t.calories} value={TODAY.calories.toLocaleString()} unit=" kcal" goal={TODAY.caloriesGoal} color="#f59e0b"/>
            <MetricCard icon={Droplets} label={t.water} value={TODAY.water} unit="L" goal={TODAY.waterGoal} color="#06b6d4"/>
          </div>

          {/* NEW METRICS ROW: SpO₂ · Floors · VO₂ Max · Body Fat */}
          <div className="g4" style={{marginBottom:14}}>
            <MetricCard icon={Wind} label={t.spo2} value={TODAY.spo2} unit="%" color="#34d399" trend={0}
              subLabel={lang==="lo"?"ໂລຫິດ O₂":"Blood O₂"} badge={TODAY.spo2>=95?(lang==="lo"?"ປົກກະຕິ ✅":"Normal ✅"):(lang==="lo"?"ຕ່ຳ ⚠️":"Low ⚠️")}/>
            <MetricCard icon={Layers} label={t.floors} value={TODAY.floors} unit="" goal={TODAY.floorsGoal} color="#06b6d4"
              subLabel={t.floorsSub}/>
            <MetricCard icon={VO2Icon} label={t.vo2max} value={TODAY.vo2max} unit=" ml/kg/min" color="#a78bfa"
              subLabel={t.vo2maxSub} badge={vo2Category(TODAY.vo2max,lang)}/>
            <MetricCard icon={Percent} label={t.bodyFat} value={TODAY.bodyFat} unit="%" color="#f59e0b"
              subLabel={t.bodyFatSub} badge={bodyFatCategory(TODAY.bodyFat,lang)}/>
          </div>

          {/* Sleep Stages */}
          <div className="sec-title">{t.sleepStages}</div>
          <div className="chart-card" style={{marginBottom:14}}>
            <div style={{display:"flex",gap:10,marginBottom:9,flexWrap:"wrap"}}>
              {SLEEP_STAGES.map(s=>(
                <div key={s.name} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:7,height:7,borderRadius:2,background:s.fill}}/><span style={{fontSize:10,color:"#6b7280"}}>{s.name} {s.value}h</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={SLEEP_STAGES} layout="vertical" barSize={10}>
                <XAxis type="number" hide/><YAxis type="category" dataKey="name" width={46} tick={{fill:"#4b5563",fontSize:9}} axisLine={false} tickLine={false}/>
                <Bar dataKey="value" radius={[0,5,5,0]} fill="#6366f1"/><Tooltip content={<CT/>}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SpO₂ trend */}
          <div className="chart-card" style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:"white",marginBottom:2}}>SpO₂ — 7 Days</div>
            <div style={{fontSize:10,color:"#4b5563",marginBottom:10}}>{lang==="lo"?"ລະດັບ O₂ ໃນເລືອດ (%)":"Blood oxygen level (%)"}</div>
            <ResponsiveContainer width="100%" height={90}>
              <AreaChart data={WEEK_DATA.spo2}>
                <defs><linearGradient id="gspo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient></defs>
                <XAxis dataKey="day" tick={{fill:"#4b5563",fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis hide domain={[88,100]}/>
                <Tooltip content={<CT/>}/>
                <Area type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} fill="url(#gspo2)" dot={false} activeDot={{r:3,fill:"#34d399"}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* VO₂ Max trend */}
          <div className="chart-card" style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:"white",marginBottom:2}}>VO₂ Max — 30 Days</div>
            <div style={{fontSize:10,color:"#4b5563",marginBottom:10}}>{lang==="lo"?"ຄວາມສາມາດ aerobic (ml/kg/min)":"Aerobic capacity trend"}</div>
            <ResponsiveContainer width="100%" height={90}>
              <AreaChart data={WEEK_DATA.vo2max}>
                <defs><linearGradient id="gvo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                </linearGradient></defs>
                <XAxis dataKey="day" tick={{fill:"#4b5563",fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis hide domain={[44,54]}/><Tooltip content={<CT/>}/>
                <Area type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} fill="url(#gvo2)" dot={false} activeDot={{r:3,fill:"#a78bfa"}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Body Fat trend */}
          <div className="chart-card" style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:"white",marginBottom:2}}>Body Fat % — 30 Days</div>
            <div style={{fontSize:10,color:"#4b5563",marginBottom:10}}>{lang==="lo"?"ແນວໂນ້ມໄຂມັນ":"Body fat trend"}</div>
            <ResponsiveContainer width="100%" height={90}>
              <AreaChart data={WEEK_DATA.bodyFat}>
                <defs><linearGradient id="gbf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient></defs>
                <XAxis dataKey="day" tick={{fill:"#4b5563",fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis hide domain={[16,21]}/><Tooltip content={<CT/>}/>
                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fill="url(#gbf)" dot={false} activeDot={{r:3,fill:"#f59e0b"}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="sec-title">{t.meowInsights}</div>
          {INSIGHTS.map(ins=>(
            <div key={ins.id} className="insight-card" onClick={()=>{setChatOpen(true);setInput(ins.title);}}>
              <div style={{background:`${ins.color}18`,borderRadius:9,padding:7,flexShrink:0}}><ins.icon size={14} color={ins.color}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{ins.title}</div>
                <div style={{fontSize:11,color:"#6b7280",lineHeight:1.5}}>{ins.body}</div>
              </div>
              <ChevronRight size={12} color="#4b5563" style={{flexShrink:0,marginTop:2}}/>
            </div>
          ))}
        </>
      )}

      {/* ══════════════════ SPORT ══════════════════ */}
      {tab==="sport"&&(
        <>
          <div className="sec-title">{t.sportDetect}</div>
          <div style={{fontSize:11,color:"#4b5563",marginBottom:11}}>{t.sportSub}</div>
          {SPORTS.map(s=>(
            <div key={s.id} className="sport-card">
              <div style={{background:`${s.color}18`,borderRadius:10,padding:9,flexShrink:0}}><s.icon size={19} color={s.color}/></div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{s.type}</div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  {[[t.duration,s.duration,"white"],[t.hrZone,s.hrZone,s.color],[t.burned,`${s.burned} kcal`,"#f59e0b"],[s.distance&&"Distance",s.distance,"white"]].filter(x=>x[0]).map(([l,v,c])=>(
                    <div key={l}><div style={{fontSize:9,color:"#4b5563"}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:c}}>{v}</div></div>
                  ))}
                </div>
              </div>
              <div style={{background:`${s.color}18`,borderRadius:6,padding:"3px 8px",fontSize:10,color:s.color,fontWeight:600,flexShrink:0}}>{s.hrZone}</div>
            </div>
          ))}
          <div className="chart-card">
            <div style={{fontSize:12,fontWeight:600,color:"white",marginBottom:2}}>Heart Rate — Today</div>
            <div style={{fontSize:10,color:"#4b5563",marginBottom:10}}>bpm across sessions</div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={WEEK_DATA.heartRate}>
                <defs><linearGradient id="ghr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient></defs>
                <XAxis dataKey="day" tick={{fill:"#4b5563",fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis hide/><Tooltip content={<CT/>}/>
                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fill="url(#ghr)" dot={false} activeDot={{r:3,fill:"#ef4444"}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ══════════════════ MEALS ══════════════════ */}
      {tab==="meals"&&(
        <>
          <div className="sec-title">{t.aiMealLogger}</div>
          <div style={{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:13,padding:13,marginBottom:11}}>
            <div className="upload-zone" onClick={()=>fileRef.current?.click()}>
              {imgPreview?<img src={imgPreview} alt="meal" className="img-preview"/>:
                <div><Camera size={26} color="#4b5563" style={{margin:"0 auto 7px"}}/><div style={{fontSize:11,color:"#4b5563"}}>{t.dropHere}</div></div>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleImg}/>
            <div style={{marginTop:9,marginBottom:7,fontSize:10,color:"#6b7280"}}>{t.orType}</div>
            <div style={{display:"flex",gap:6}}>
              <textarea className="ci" style={{height:50}} placeholder={t.mealTypePlaceholder}
                value={mealInput} onChange={e=>setMealInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();logMeal();}}}/>
              <button className="send-btn" onClick={logMeal} disabled={mealLoading||(!mealInput.trim()&&!imgBase64)}>
                {mealLoading?<Loader2 size={14} color="white" style={{animation:"spin 1s linear infinite"}}/>:<Send size={14} color="white"/>}
              </button>
            </div>
            {mealLoading&&<div style={{fontSize:11,color:"#6366f1",marginTop:6,display:"flex",alignItems:"center",gap:5}}><Loader2 size={11} style={{animation:"spin 1s linear infinite"}}/>{t.analyzing}</div>}
            <div className="disclaimer"><AlertCircle size={12} style={{flexShrink:0,marginTop:1}}/>{t.mealDisclaimer}</div>
          </div>
          {mealLog.length>0&&<><div className="sec-title">{t.todayLog}</div>{mealLog.map(e=>(
            <div key={e.id} className="meal-log-item">
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>{e.hasImg&&<Camera size={11} color="#6366f1"/>}{e.meal}</span>
                <span style={{fontSize:10,color:"#4b5563"}}>{e.time}</span>
              </div>
              <div style={{fontSize:11,color:"#9ca3af",lineHeight:1.55}}>{e.analysis}</div>
            </div>
          ))}</>}
          {mealLog.length===0&&<div style={{textAlign:"center",padding:"34px 20px",color:"#4b5563"}}>
            <Camera size={26} color="#1e2130" style={{margin:"0 auto 9px"}}/><div style={{fontSize:12}}>{t.noMeals}</div>
            <div style={{fontSize:10,marginTop:3}}>{t.noMealsSub}</div></div>}
        </>
      )}

      {/* ══════════════════ GOALS ══════════════════ */}
      {tab==="goals"&&(
        <>
          <div className="sec-title">{t.smartGoals}</div>
          <div style={{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:13,padding:13,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><Zap size={12} color="#f59e0b"/><span style={{fontSize:9,color:"#f59e0b",fontWeight:700,letterSpacing:".05em"}}>{t.aiAdjusted}</span></div>
            <div style={{fontSize:11,color:"#6b7280",lineHeight:1.6}}>{t.aiAdjustedText}</div>
          </div>
          {[
            {icon:Activity,label:t.steps,    current:9247, goal:10000,unit:lang==="lo"?" ກ້າວ":" steps",color:"#10b981"},
            {icon:Moon,    label:t.sleep,    current:5.2,  goal:8,    unit:"h",              color:"#8b5cf6"},
            {icon:Droplets,label:t.water,    current:1.8,  goal:2.5,  unit:"L",              color:"#06b6d4"},
            {icon:Flame,   label:t.calories, current:1840, goal:2200, unit:" kcal",          color:"#f59e0b"},
            {icon:Layers,  label:t.floors,   current:12,   goal:20,   unit:lang==="lo"?" ຊັ້ນ":" flrs",color:"#06b6d4"},
            {icon:Wind,    label:t.spo2,     current:98,   goal:95,   unit:"%",              color:"#34d399"},
          ].map(g=>(
            <div key={g.label} style={{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:12,padding:13,marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                <div style={{background:`${g.color}18`,borderRadius:8,padding:6}}><g.icon size={14} color={g.color}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600}}>{g.label}</div>
                  <div style={{fontSize:10,color:"#4b5563"}}>{t.goal}: {g.goal}{g.unit}</div>
                </div>
                <div style={{fontSize:16,fontWeight:700,color:g.color}}>{pct(g.current,g.goal)}%</div>
              </div>
              <div style={{height:3,background:"#1a1d2e",borderRadius:2}}>
                <div style={{height:"100%",width:`${pct(g.current,g.goal)}%`,background:g.color,borderRadius:2,transition:"width 1s ease"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                <span style={{fontSize:10,color:"#4b5563"}}>{g.current}{g.unit} {t.today}</span>
                <span style={{fontSize:10,color:g.color}}>{Math.round((g.goal-g.current)*10)/10}{g.unit} {t.toGo}</span>
              </div>
            </div>
          ))}
          {/* VO₂ + Body Fat info cards */}
          <div className="g2" style={{marginBottom:10}}>
            <div style={{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:12,padding:13}}>
              <div style={{fontSize:10,color:"#4b5563",marginBottom:4}}>{t.vo2max}</div>
              <div style={{fontSize:22,fontWeight:700,color:"#a78bfa"}}>{TODAY.vo2max}<span style={{fontSize:10,color:"#6b7280"}}> ml/kg/min</span></div>
              <div style={{marginTop:6,fontSize:11,fontWeight:600,color:"#a78bfa"}}>{vo2Category(TODAY.vo2max,lang)}</div>
              <div style={{fontSize:10,color:"#4b5563",marginTop:2}}>{lang==="lo"?"ເປົ້າ: 52+":"Target: 52+"}</div>
            </div>
            <div style={{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:12,padding:13}}>
              <div style={{fontSize:10,color:"#4b5563",marginBottom:4}}>{t.bodyFat}</div>
              <div style={{fontSize:22,fontWeight:700,color:"#f59e0b"}}>{TODAY.bodyFat}<span style={{fontSize:10,color:"#6b7280"}}>%</span></div>
              <div style={{marginTop:6,fontSize:11,fontWeight:600,color:"#f59e0b"}}>{bodyFatCategory(TODAY.bodyFat,lang)}</div>
              <div style={{fontSize:10,color:"#4b5563",marginTop:2}}>{lang==="lo"?"ລະດັບ fit: 10–18%":"Fit range: 10–18%"}</div>
            </div>
          </div>
          <div className="chart-card" style={{marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:600,color:"white",marginBottom:2}}>Wellness Score — 30 Days</div>
            <ResponsiveContainer width="100%" height={90}>
              <LineChart data={MONTH_DATA}>
                <XAxis dataKey="day" tick={{fill:"#4b5563",fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis hide domain={[40,100]}/><Tooltip content={<CT/>}/>
                <Line type="monotone" dataKey="wellness" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{r:3,fill:"#6366f1"}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button style={{width:"100%",padding:11,border:"1px dashed #1e2130",borderRadius:10,background:"transparent",color:"#4b5563",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"inherit"}}>
            <Download size={12}/>{t.exportPDF}
          </button>
          <div className="disclaimer" style={{marginTop:10}}><AlertCircle size={12} style={{flexShrink:0,marginTop:1}}/><span>{t.healthDisclaimer}</span></div>
        </>
      )}

      {/* FAB */}
      <button className="fab" onClick={()=>setChatOpen(true)} title={t.openCoach}>🐱</button>

      {/* CHAT DRAWER */}
      {chatOpen&&(
        <>
          <div className="chat-backdrop" onClick={()=>setChatOpen(false)}/>
          <div className="chat-drawer">
            <div className="chat-hdr">
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#f59e0b,#ef4444)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🐱</div>
                <div>
                  <div style={{fontSize:12,fontWeight:700}}>{t.meowCoach}</div>
                  <div style={{fontSize:9,color:"#10b981",display:"flex",alignItems:"center",gap:3}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:"#10b981"}}/>{t.online}
                    {badSleep&&<span style={{color:"#ef4444",marginLeft:3}}>⚠️ {lang==="lo"?"ນອນໜ້ອຍ":"Poor sleep"}</span>}
                  </div>
                </div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#4b5563"}}><X size={18}/></button>
            </div>
            <div className="chat-msgs">
              {messages.map((m,i)=><div key={i} className={`msg-bubble ${m.role}`}>{m.content}</div>)}
              {loading&&<div className="msg-bubble assistant" style={{display:"flex",gap:4,alignItems:"center"}}>
                {[0,.2,.4].map((d,i)=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:"#f59e0b",animation:`pulse 1s infinite ${d}s`}}/>)}
              </div>}
              <div ref={chatEnd}/>
            </div>
            <div style={{padding:"5px 11px 6px",borderTop:"1px solid #1a1d2e"}}>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {[t.qq1,t.qq2,t.qq3].map(q=>(
                  <button key={q} onClick={()=>setInput(q)} style={{padding:"3px 7px",borderRadius:16,border:"1px solid #1a1d2e",background:"transparent",color:"#6b7280",fontSize:9,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>
                ))}
              </div>
            </div>
            <div className="chat-input-row">
              <textarea className="ci" rows={1} placeholder={t.askMeow}
                value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}/>
              <button className="send-btn" onClick={sendMessage} disabled={loading||!input.trim()}>
                {loading?<Loader2 size={14} color="white" style={{animation:"spin 1s linear infinite"}}/>:<Send size={14} color="white"/>}
              </button>
            </div>
            <div style={{padding:"3px 13px 9px",fontSize:9,color:"#374151",textAlign:"center",fontFamily:"inherit"}}>{t.meowDisclaimer}</div>
          </div>
        </>
      )}
    </div>
  );
}


// ── Mount App ─────────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(HealthApp));

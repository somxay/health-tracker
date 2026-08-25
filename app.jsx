// ── CDN Globals ───────────────────────────────────────────────────────────────
const { useState, useEffect, useRef, useCallback } = React;
const { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
        ResponsiveContainer, LineChart, Line,
        RadarChart, Radar, PolarGrid, PolarAngleAxis } = Recharts;

// ── Inline SVG Icons (ບໍ່ຕ້ອງ lucide package) ────────────────────────────────
const Icon = ({ d, size=16, color="currentColor", style={}, strokeWidth=2 }) =>
  React.createElement('svg', {
    xmlns:"http://www.w3.org/2000/svg", width:size, height:size,
    viewBox:"0 0 24 24", fill:"none", stroke:color,
    strokeWidth, strokeLinecap:"round", strokeLinejoin:"round", style
  }, React.createElement('path', { d }));

const PATHS = {
  Activity:      "M22 12h-4l-3 9L9 3l-3 9H2",
  Heart:         "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  Moon:          "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  Flame:         "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z",
  Droplets:      "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  Wind:          "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2",
  Brain:         "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.6A3 3 0 0 1 4.5 9.5a3 3 0 0 1 .09-4.5A2.5 2.5 0 0 1 9.5 2M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.6A3 3 0 0 0 19.5 9.5a3 3 0 0 0-.09-4.5A2.5 2.5 0 0 0 14.5 2",
  TrendingUp:    "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  TrendingDown:  "M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6",
  ChevronRight:  "M9 18l6-6-6-6",
  Send:          "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  Download:      "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  Camera:        "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  Target:        "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  Zap:           "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  X:             "M18 6L6 18M6 6l12 12",
  MessageSquare: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  AlertCircle:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  CheckCircle2:  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9 12l2 2 4-4",
  Loader2:       "M21 12a9 9 0 1 1-6.219-8.56",
  Globe:         "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  Dumbbell:      "M6 5v14M18 5v14M6 8H2M6 16H2M22 8h-4M22 16h-4M8 8h8v8H8z",
  Bike:          "M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 18H3l2-6 3-2 4 2h3l3 4M14 10h2l2 4",
  PersonStanding:"M12 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8 21l4-4 4 4M12 7v6M9 12l-1 9M15 12l1 9",
  WifiOff:       "M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01",
  Layers:        "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  Percent:       "M19 5L5 19M6.5 6.5h.01M17.5 17.5h.01",
};

const mkIcon = (key) => ({ size=16, color="currentColor", style={} }) =>
  Icon({ d: PATHS[key], size, color, style });

const Activity=mkIcon('Activity'), Heart=mkIcon('Heart'), Moon=mkIcon('Moon');
const Flame=mkIcon('Flame'), Droplets=mkIcon('Droplets'), Wind=mkIcon('Wind');
const Brain=mkIcon('Brain'), TrendingUp=mkIcon('TrendingUp'), TrendingDown=mkIcon('TrendingDown');
const ChevronRight=mkIcon('ChevronRight'), Send=mkIcon('Send'), Download=mkIcon('Download');
const Camera=mkIcon('Camera'), Target=mkIcon('Target'), Zap=mkIcon('Zap');
const X=mkIcon('X'), MessageSquare=mkIcon('MessageSquare'), AlertCircle=mkIcon('AlertCircle');
const CheckCircle2=mkIcon('CheckCircle2'), Globe=mkIcon('Globe');
const Dumbbell=mkIcon('Dumbbell'), Bike=mkIcon('Bike'), PersonStanding=mkIcon('PersonStanding');
const WifiOff=mkIcon('WifiOff'), Layers=mkIcon('Layers'), Percent=mkIcon('Percent');
const VO2Icon=mkIcon('Wind');

const Loader2 = ({ size=16, color="currentColor", style={} }) =>
  Icon({ d: PATHS.Loader2, size, color,
    style:{ ...style, animation:"spin 1s linear infinite", transformOrigin:"center" } });

// ─── FITBIT MANUAL SYNC (localStorage) ────────────────────────────────────────
const DEFAULT_DATA = {
  steps:9247,stepsGoal:10000,heartRate:68,hrv:42,
  sleep:5.2,sleepGoal:8,deepSleep:0.8,remSleep:1.1,lightSleep:3.3,
  calories:1840,caloriesGoal:2200,water:1.8,waterGoal:2.5,
  spo2:98,spo2Goal:95,floors:12,floorsGoal:20,vo2max:48.2,bodyFat:18.4,
  syncTime:null, syncSource:"demo",
};
function loadFitbitData() {
  try {
    const saved = localStorage.getItem('fitbit_sync');
    return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : { ...DEFAULT_DATA };
  } catch(e) { return { ...DEFAULT_DATA }; }
}
function saveFitbitData(data) {
  try { localStorage.setItem('fitbit_sync', JSON.stringify(data)); } catch(e) {}
}
const TODAY = loadFitbitData();
const isBadSleep = s => s.sleep < 6 || s.deepSleep < 1.0;

// ─── I18N ─────────────────────────────────────────────────────────────────────
const T = {
  lo: {
    appName:"ຄົນແພ້ກໍຕ້ອງດູແລຕົວເອງ", appSub:"ສຸຂະພາບທີ່ດີ ເລີ່ມຕົ້ນຈາກຕົວເຮົາ",
    synced:"ຊິ້ງແລ້ວ", syncing:"ກຳລັງຊິ້ງ…", offline:"ອອບໄລນ໌",
    tabDashboard:"ພາບລວມ", tabSport:"ກິລາ", tabMeals:"ອາຫານ", tabGoals:"ເປົ້າໝາຍ",
    todayWellness:"ສຸຂະພາບວັນນີ້", goodRecovery:"ຟື້ນຕົວດີ",
    wellnessSub:"HRV ເພີ່ມ 17% · ນອນ OK · ຍ່າງຕໍ່ 753 ກ້າວ",
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
    aiMealLogger:"AI ສ່ອງອາຫານ",
    dropHere:"ລາກໄຟລ຺ ຫຼື ກົດເພື່ອເລືອກຮູບ", analyzing:"AI ກຳລັງວິເຄາະ…",
    noMeals:"ຍັງບໍ່ໄດ້ບັນທຶກອາຫານວັນນີ້", noMealsSub:"ຖ່າຍຮູບ ຫຼື ພິມຊື່ອາຫານ",
    mealDisclaimer:"ຄ່າໂພຊະນາການເປັນພຽງການຄາດຄະເນ. ປຶກສານັກໂພຊະນາການ.",
    todayLog:"ບັນທຶກວັນນີ້",
    smartGoals:"ເປົ້າໝາຍອັດສະລິຍະ", aiAdjusted:"AI ປັບໃໝ່ອາທິດນີ້",
    aiAdjustedText:"ທ່ານຍ່າງ 8,500 ກ້າວ/ອາທິດ. Meow Coach ເພີ່ມເປົ້າເປັນ 10,000.",
    goal:"ເປົ້າ", today:"ວັນນີ້", toGo:"ຕ້ອງການ",
    exportPDF:"ສົ່ງອອກລາຍງານ 30 ວັນ (PDF)",
    healthDisclaimer:"ຂໍ້ມູນນີ້ໃຊ້ຕິດຕາມສ່ວນຕົວ. ບໍ່ທົດແທນຄຳແນະນຳທາງການແພດ.",
    meowCoach:"ໂຄ໊ດແມວ 🐱", online:"ອອນລາຍ",
    askMeow:"ຖາມໂຄ໊ດແມວ… (ລະວັງໂດນດ່າ 😹)",
    meowDisclaimer:"ໂຄ໊ດແມວໃຫ້ຄຳແນະນຳດ້ານສຸຂະຄາບ ບໍ່ແມ່ນທາງການແພດ.",
    qq1:"VO₂ Max ຂ້ອຍດີບໍ?", qq2:"ໄຂມັນຫຼາຍ ຄວນເຮັດຫຍັງ?", qq3:"ນອນໜ້ອຍ ເຮັດໄດ້ແນວໃດ?",
    openCoach:"ເປີດ Meow Coach", wellness:"ສຸຂະພາບ",
    insightTitle1:"ໄລຍະ REM ຫຼຸດ", insightBody1:"REM 1.1h — ຕ່ຳ 18%. ປິດໜ້າຈໍ 45 ນາທີກ່ອນນອນ.",
    insightTitle2:"HRV ດີຂຶ້ນ", insightBody2:"HRV 36→42 ms. ການຟື້ນຕົວດີ.",
    insightTitle3:"VO₂ Max ດີ", insightBody3:"VO₂ 48 ml/kg/min — ລະດັບ Excellent.",
    orType:"ຫຼື ພິມ:", mealPlaceholder:"ພິມຊື່ອາຫານ…",
    syncTitle:"📲 Sync ຂໍ້ມູນຈາກ Fitbit App",
    syncSub:"ເປີດ Fitbit app → ເຫັນຕົວເລກ → ໃສ່ຂ້າງລຸ່ມ",
    syncBtn:"💾 ບັນທຶກ & ອັບເດດ Dashboard",
    syncDone:"✅ ບັນທຶກສຳເລັດ!",
    syncLast:"Sync ລ່າສຸດ:", syncNever:"ຍັງບໍ່ເຄີຍ sync",
    syncSource:"ແຫຼ່ງ: Fitbit App (Manual)",
    syncReset:"🔄 ຣີເຊັດເປັນ Demo",
    syncGuide:"📱 ວິທີດຶງຂໍ້ມູນຈາກ Fitbit",
    syncStep1:"ເປີດ Fitbit app ໃນໂທລະສັບ",
    syncStep2:"ກົດ Today tab (ໜ້າຫຼັກ)",
    syncStep3:"ເຫັນ Steps, HR, Sleep, Calories",
    syncStep4:"ໃສ່ຕົວເລກເຫຼົ່ານັ້ນຂ້າງລຸ່ມ",
    syncStep5:"ກົດ 'ບັນທຶກ' — Dashboard ອັບເດດທັນທີ",
    fSteps:"ກ້າວ", fHR:"ອັດຕາຫົວໃຈ", fSleep:"ນອນ (h)", fDeep:"ນອນເລິກ (h)",
    fRem:"REM (h)", fCalories:"ແຄລໍລີ", fWater:"ນ້ຳ (L)", fSpo2:"SpO₂ (%)",
    fFloors:"ຊັ້ນ", fHRV:"HRV (ms)", fVo2:"VO₂ Max", fFat:"ໄຂມັນ (%)",
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
    vo2maxSub:"Aerobic capacity", bodyFatSub:"Body fat %", floorsSub:"Climbed today",
    recoveryImproving:"Recovery improving",
    sleepStages:"Sleep Stages — Last Night",
    deep:"Deep", rem:"REM", light:"Light",
    meowInsights:"Meow Coach Insights 🐱",
    sportDetect:"Auto Sport Detection", sportSub:"AI-detected workout sessions",
    duration:"Duration", hrZone:"HR Zone", burned:"Burned",
    aiMealLogger:"AI Meal Photo Logger",
    dropHere:"Drop image here or click to browse", analyzing:"AI analyzing…",
    noMeals:"No meals logged yet today", noMealsSub:"Upload photo or type a meal",
    mealDisclaimer:"Nutritional estimates are approximate. Consult a dietitian.",
    todayLog:"Today's Log",
    smartGoals:"Smart Goals", aiAdjusted:"AI ADJUSTED THIS WEEK",
    aiAdjustedText:"You averaged 8,500 steps. Meow Coach bumped goal to 10,000.",
    goal:"Goal", today:"today", toGo:"to go",
    exportPDF:"Export 30-Day Health Report (PDF)",
    healthDisclaimer:"Health data for personal tracking only. Not medical advice.",
    meowCoach:"Meow Coach 🐱", online:"Online",
    askMeow:"Ask Meow Coach… (prepare to be roasted 😹)",
    meowDisclaimer:"Meow Coach provides wellness tips only. Not medical advice.",
    qq1:"Is my VO₂ Max good?", qq2:"Help with body fat?", qq3:"Help me sleep better",
    openCoach:"Open Meow Coach", wellness:"WELLNESS",
    insightTitle1:"REM Sleep Dip", insightBody1:"REM avg 1.1h — 18% below norm.",
    insightTitle2:"HRV Trending Up", insightBody2:"HRV 36→42 ms. Recovery improving.",
    insightTitle3:"VO₂ Max Strong", insightBody3:"VO₂ 48 ml/kg/min — Excellent.",
    orType:"Or type:", mealPlaceholder:"Type a meal…",
    syncTitle:"📲 Sync Data from Fitbit App",
    syncSub:"Open Fitbit app → note your numbers → enter below",
    syncBtn:"💾 Save & Update Dashboard",
    syncDone:"✅ Saved successfully!",
    syncLast:"Last synced:", syncNever:"Never synced",
    syncSource:"Source: Fitbit App (Manual)",
    syncReset:"🔄 Reset to Demo",
    syncGuide:"📱 How to sync from Fitbit",
    syncStep1:"Open Fitbit app on your phone",
    syncStep2:"Go to Today tab",
    syncStep3:"Note Steps, HR, Sleep, Calories",
    syncStep4:"Enter those numbers below",
    syncStep5:"Tap Save — Dashboard updates instantly",
    fSteps:"Steps", fHR:"Heart Rate (bpm)", fSleep:"Sleep (h)", fDeep:"Deep Sleep (h)",
    fRem:"REM Sleep (h)", fCalories:"Active Calories", fWater:"Water (L)", fSpo2:"SpO₂ (%)",
    fFloors:"Floors", fHRV:"HRV (ms)", fVo2:"VO₂ Max", fFat:"Body Fat (%)",
  }
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
function calcWellness(m) {
  return Math.round(
    Math.min(100,(m.sleep/m.sleepGoal)*100)*0.28+
    Math.min(100,(m.deepSleep/1.5)*100)*0.12+
    Math.min(100,(m.hrv/60)*100)*0.25+
    Math.min(100,(m.calories/m.caloriesGoal)*100)*0.15+
    Math.min(100,((m.spo2-88)/12)*100)*0.10+
    Math.min(100,(m.vo2max/60)*100)*0.05+
    Math.max(0,100-(m.bodyFat-10)*2)*0.05
  );
}
const SCORE = calcWellness(TODAY);

const vo2Cat=(v,l)=>v>=55?(l==="lo"?"ດີເລີດ🏆":"Elite🏆"):v>=47?(l==="lo"?"ດີຫຼາຍ✅":"Excellent✅"):v>=38?(l==="lo"?"ດີ👍":"Good👍"):(l==="lo"?"ກາງ⚠️":"Avg⚠️");
const bfCat=(b,l)=>b<18?(l==="lo"?"ດີ👍":"Fit👍"):b<25?(l==="lo"?"ປານກາງ✅":"Normal✅"):(l==="lo"?"ສູງ⚠️":"High⚠️");
const pct=(v,g)=>Math.min(100,Math.round(v/g*100));

const genW = (base,v) => ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=>({
  day, value:Math.round(base+(Math.random()-.5)*v)
}));
const WEEK = {
  steps:genW(8500,3000), heartRate:genW(69,10),
  spo2:genW(97,3).map(d=>({...d,value:Math.max(90,Math.min(100,d.value))})),
  vo2max:Array.from({length:30},(_,i)=>({day:i+1,value:+(47+Math.sin(i/4)*2+Math.random()).toFixed(1)})),
  bodyFat:Array.from({length:30},(_,i)=>({day:i+1,value:+(18.8-i*.015+Math.random()*.3).toFixed(1)})),
};
const MONTH = Array.from({length:30},(_,i)=>({day:i+1,wellness:Math.round(55+Math.random()*40)}));
const SPORTS=[
  {id:1,type:"Running",       icon:PersonStanding,color:"#10b981",duration:"38 min",hrZone:"Zone 3",burned:312,dist:"5.2 km"},
  {id:2,type:"Weightlifting", icon:Dumbbell,      color:"#6366f1",duration:"52 min",hrZone:"Zone 2",burned:280,dist:null},
  {id:3,type:"Cycling",       icon:Bike,          color:"#f59e0b",duration:"25 min",hrZone:"Zone 2",burned:195,dist:"8.1 km"},
];
const RADAR=[
  {s:"Steps",A:92},{s:"Sleep",A:65},{s:"HRV",A:78},
  {s:"VO₂",A:80},{s:"SpO₂",A:98},{s:"Fat",A:73},
];

// ─── API ──────────────────────────────────────────────────────────────────────
async function callAI(messages,system){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system,
      messages:messages.map(m=>({role:m.role,content:m.content}))}),
  });
  const d=await res.json();
  return d.content?.map(b=>b.text).join("")||"...";
}
function buildMeow(lang){
  const bad=isBadSleep(TODAY);
  const p=lang==="lo"?`ທ່ານຄື "ໂຄ໊ດແມວ" — AI ຄູຝຶກ ສາດ ກວນ ຊາດ. ຕອບລາວ. ໃຊ້ 🐱😹🔥`
    :`You are "Meow Coach" — sassy sarcastic AI cat coach. Use 🐱😹🔥`;
  const r=bad?(lang==="lo"?`\n🚨 ຜູ້ໃຊ້ນອນ ${TODAY.sleep}h Deep ${TODAY.deepSleep}h. ດ່າ ຊາດ ທຸກຄຳຕອບ!`
    :`\n🚨 ROAST RULE: slept ${TODAY.sleep}h deep ${TODAY.deepSleep}h. ROAST every reply!`):"";
  return p+r+`\nData: Steps ${TODAY.steps}/${TODAY.stepsGoal}, HRV ${TODAY.hrv}, Sleep ${TODAY.sleep}h, SpO₂ ${TODAY.spo2}%, Floors ${TODAY.floors}, VO₂ ${TODAY.vo2max}, BodyFat ${TODAY.bodyFat}%, Wellness ${SCORE}/100`
    +(lang==="lo"?"\nໝາຍເຫດທາງການແພດໃນຕອນທ້າຍ.":"\nEnd with brief medical disclaimer.");
}
async function analyzeMeal(text,lang){
  return callAI([{role:"user",content:lang==="lo"
    ?`ຄາດຄະເນໂພຊະນາການ: "${text}". ຮູບແບບ: [ຊື່] — ~X kcal | ທາດໂປຣ:Xg ຄາໂບ:Xg ໄຂມັນ:Xg. ໝາຍເຫດສັ້ນ.`
    :`Estimate nutrition for: "${text}". Format: [Meal] — ~X kcal | P:Xg C:Xg F:Xg. Short note.`}],
    lang==="lo"?"ທ່ານເປັນນັກໂພຊະນາການ. ກະທັດຮັດ. ຕອບລາວ.":"You are a nutritionist. Be brief and accurate.");
}

// ─── UI PARTS ─────────────────────────────────────────────────────────────────
function WellnessRing({score,label}){
  const r=54,circ=2*Math.PI*r;
  const color=score>=75?"#10b981":score>=50?"#f59e0b":"#ef4444";
  return React.createElement('svg',{width:140,height:140,viewBox:"0 0 140 140"},
    React.createElement('circle',{cx:70,cy:70,r,fill:"none",stroke:"#1e2130",strokeWidth:10}),
    React.createElement('circle',{cx:70,cy:70,r,fill:"none",stroke:color,strokeWidth:10,
      strokeDasharray:circ,strokeDashoffset:circ-(score/100)*circ,strokeLinecap:"round",
      style:{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset 1.2s ease"}}),
    React.createElement('text',{x:70,y:65,textAnchor:"middle",fill:"white",fontSize:28,fontWeight:700},score),
    React.createElement('text',{x:70,y:82,textAnchor:"middle",fill:"#6b7280",fontSize:10},label)
  );
}
function MiniRing({pct:p,color,size=28,stroke=3}){
  const r=(size-stroke*2)/2,circ=2*Math.PI*r;
  return React.createElement('svg',{width:size,height:size},
    React.createElement('circle',{cx:size/2,cy:size/2,r,fill:"none",stroke:"#1e2130",strokeWidth:stroke}),
    React.createElement('circle',{cx:size/2,cy:size/2,r,fill:"none",stroke:color,strokeWidth:stroke,
      strokeDasharray:circ,strokeDashoffset:circ-(p/100)*circ,strokeLinecap:"round",
      style:{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}})
  );
}
function MetricCard({icon:Ic,label,value,unit,goal,color,trend,subLabel,badge}){
  const p=goal?pct(value,goal):null;
  return React.createElement('div',{className:"mc"},
    React.createElement('div',{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}},
      React.createElement('div',{style:{display:"flex",alignItems:"center",gap:7}},
        React.createElement('div',{style:{background:`${color}20`,borderRadius:9,padding:7,display:"flex"}},
          React.createElement(Ic,{size:14,color})),
        React.createElement('span',{style:{color:"#6b7280",fontSize:10,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}},label)),
      trend!==undefined&&React.createElement('div',{style:{display:"flex",alignItems:"center",gap:3,color:trend>=0?"#10b981":"#ef4444",fontSize:10}},
        React.createElement(trend>=0?TrendingUp:TrendingDown,{size:10}),Math.abs(trend),"%")),
    React.createElement('div',{style:{display:"flex",alignItems:"flex-end",gap:3,marginBottom:2}},
      React.createElement('span',{style:{color:"white",fontSize:26,fontWeight:700,lineHeight:1}},value),
      React.createElement('span',{style:{color:"#6b7280",fontSize:11,marginBottom:2}},unit)),
    subLabel&&React.createElement('div',{style:{color:"#4b5563",fontSize:10,marginBottom:4}},subLabel),
    badge&&React.createElement('div',{style:{display:"inline-block",background:`${color}18`,color,fontSize:10,fontWeight:600,borderRadius:5,padding:"2px 7px",marginBottom:4}},badge),
    p!==null&&React.createElement('div',{style:{marginTop:7}},
      React.createElement('div',{style:{display:"flex",justifyContent:"space-between",marginBottom:3}},
        React.createElement('span',{style:{color:"#4b5563",fontSize:10}},`${goal}${unit}`),
        React.createElement('span',{style:{color,fontSize:10,fontWeight:600}},`${p}%`)),
      React.createElement('div',{style:{height:3,background:"#1e2130",borderRadius:2}},
        React.createElement('div',{style:{height:"100%",width:`${p}%`,background:color,borderRadius:2,transition:"width 1s ease"}})))
  );
}
const CT=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return React.createElement('div',{style:{background:"#0f111a",border:"1px solid #1e2130",borderRadius:7,padding:"6px 10px"}},
    React.createElement('div',{style:{color:"#6b7280",fontSize:10,marginBottom:1}},label),
    React.createElement('div',{style:{color:"white",fontSize:13,fontWeight:600}},payload[0]?.value));
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function HealthApp(){
  const [lang,setLang]=useState("lo");
  const t=T[lang];
  const meow=buildMeow(lang);
  const bad=isBadSleep(TODAY);

  const SLEEP_STAGES=[
    {name:t.deep,value:TODAY.deepSleep,fill:"#6366f1"},
    {name:t.rem,value:TODAY.remSleep,fill:"#8b5cf6"},
    {name:t.light,value:TODAY.lightSleep,fill:"#a78bfa"},
  ];
  const INSIGHTS=[
    {id:1,icon:Moon,color:"#8b5cf6",title:t.insightTitle1,body:t.insightBody1},
    {id:2,icon:Heart,color:"#ef4444",title:t.insightTitle2,body:t.insightBody2},
    {id:3,icon:Activity,color:"#10b981",title:t.insightTitle3,body:t.insightBody3},
  ];

  const [tab,setTab]=useState("dashboard");
  const [chatOpen,setChatOpen]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [syncing,setSyncing]=useState(false);
  const [mealInput,setMealInput]=useState("");
  const [mealLog,setMealLog]=useState([]);
  const [mealLoading,setMealLoading]=useState(false);
  const [imgPreview,setImgPreview]=useState(null);
  const fileRef=useRef(null);
  const chatEnd=useRef(null);



  useEffect(()=>{
    const w=lang==="lo"
      ?`ເມ້ຍ~ 🐱 ${bad?`ເຈົ້ານອນ ${TODAY.sleep}h VO₂ ${TODAY.vo2max}?! ໄປນອນ! 😹🔥`:`ສຸຂະພາບ ${SCORE}/100 ດີ! ຊ່ວຍຫຍັງ? 😸`}`
      :`Meow~ 🐱 ${bad?`Only slept ${TODAY.sleep}h?! GO TO BED! 😹🔥`:`Wellness ${SCORE}/100 — nice! How can I help? 😸`}`;
    setMsgs([{role:"assistant",content:w}]);
  },[lang]);

  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const send=useCallback(async()=>{
    if(!input.trim()||loading)return;
    const um={role:"user",content:input};
    setMsgs(p=>[...p,um]);setInput("");setLoading(true);
    try{const r=await callAI([...msgs,um],meow);setMsgs(p=>[...p,{role:"assistant",content:r}]);}
    catch{setMsgs(p=>[...p,{role:"assistant",content:lang==="lo"?"ຂໍ້ຜິດພາດ 😿":"Error 😿"}]);}
    setLoading(false);
  },[input,loading,msgs,meow,lang]);

  const handleImg=e=>{
    const f=e.target.files?.[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>setImgPreview(ev.target.result);
    r.readAsDataURL(f);
  };

  const logMeal=useCallback(async()=>{
    const meal=mealInput||(lang==="lo"?"ອາຫານໃນຮູບ":"Food from photo");
    if(!meal.trim()&&!imgPreview)return;
    setMealInput("");setImgPreview(null);setMealLoading(true);
    try{
      const a=await analyzeMeal(meal,lang);
      setMealLog(p=>[{id:Date.now(),meal,analysis:a,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})},...p]);
    }catch{setMealLog(p=>[{id:Date.now(),meal,analysis:lang==="lo"?"ວິເຄາະບໍ່ໄດ້":"Could not analyze.",time:"--:--"},...p]);}
    setMealLoading(false);
  },[mealInput,imgPreview,lang]);



  const css=`
    *{box-sizing:border-box;margin:0;padding:0;}
    .app{min-height:100vh;background:#080a12;color:white;
      font-family:'Noto Sans Lao',-apple-system,sans-serif;
      max-width:1100px;margin:0 auto;padding:0 14px 80px;}
    .hdr{display:flex;justify-content:space-between;align-items:center;padding:16px 0 18px;border-bottom:1px solid #0f111a;}
    .logo{display:flex;align-items:center;gap:9px;}
    .lmark{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#10b981,#6366f1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .aname{font-size:12px;font-weight:700;line-height:1.2;max-width:160px;}
    .asub{font-size:9px;color:#4b5563;margin-top:1px;}
    .hr{display:flex;align-items:center;gap:6px;flex-shrink:0;}
    .lbtn,.sbadge{display:flex;align-items:center;gap:4px;background:#0f111a;border:1px solid #1e2130;padding:4px 9px;border-radius:20px;font-size:10px;cursor:pointer;transition:all .2s;font-family:inherit;}
    .lbtn{color:#9ca3af;font-weight:600;}.lbtn:hover{border-color:#6366f1;color:#818cf8;}
    .sbadge{color:#6b7280;}.sbadge:hover{border-color:#10b981;color:#10b981;}
    .av{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;font-size:15px;cursor:pointer;}
    .nav{display:flex;gap:3px;margin:16px 0 14px;background:#0f111a;padding:3px;border-radius:11px;border:1px solid #1e2130;}
    .nt{flex:1;padding:7px 2px;text-align:center;border:none;background:transparent;color:#4b5563;border-radius:8px;cursor:pointer;font-size:11px;font-weight:500;transition:all .2s;font-family:inherit;}
    .nt.act{background:#1a1d2e;color:white;}
    .st{font-size:10px;color:#4b5563;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:9px;}
    .mc{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:13px;padding:13px;transition:border-color .2s;}
    .mc:hover{border-color:#2d3148;}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
    @media(max-width:580px){.g3,.g4{grid-template-columns:1fr 1fr;}.aname{max-width:110px;font-size:10px;}}
    .wcard{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:13px;padding:15px;display:flex;align-items:center;gap:12px;margin-bottom:8px;}
    .icard{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:11px;padding:12px;display:flex;gap:10px;align-items:flex-start;cursor:pointer;transition:border-color .2s;margin-bottom:6px;}
    .icard:hover{border-color:#2d3148;}
    .cc{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:13px;padding:14px;margin-bottom:8px;}
    .spc{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:11px;padding:13px;margin-bottom:8px;display:flex;align-items:center;gap:11px;}
    .roast{background:#3b0a0a;border:1px solid #ef4444;border-radius:9px;padding:9px 13px;font-size:12px;color:#fca5a5;margin-bottom:9px;display:flex;gap:8px;align-items:center;line-height:1.5;}
    .disc{background:#1a1205;border:1px solid #78350f;border-radius:8px;padding:8px 12px;font-size:11px;color:#d97706;margin-top:8px;display:flex;gap:6px;align-items:flex-start;line-height:1.5;}
    .uz{border:1.5px dashed #2d3148;border-radius:11px;padding:18px;text-align:center;cursor:pointer;transition:border-color .2s;background:#0d0f1a;}
    .uz:hover{border-color:#6366f1;}
    .mli{background:#0d0f1a;border:1px solid #1a1d2e;border-radius:10px;padding:12px;margin-bottom:7px;}
    .cbk{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);z-index:40;animation:fi .2s ease;}
    .cdw{position:fixed;right:0;top:0;bottom:0;width:min(420px,100vw);background:#0d0f1a;border-left:1px solid #1a1d2e;display:flex;flex-direction:column;z-index:50;animation:si .3s ease;}
    @keyframes si{from{transform:translateX(100%)}to{transform:translateX(0)}}
    @keyframes fi{from{opacity:0}to{opacity:1}}
    .chdr{padding:12px 15px;border-bottom:1px solid #1a1d2e;display:flex;justify-content:space-between;align-items:center;}
    .cms{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;scrollbar-color:#1e2130 transparent;}
    .mb{max-width:87%;padding:9px 12px;border-radius:12px;font-size:12px;line-height:1.55;white-space:pre-wrap;font-family:inherit;}
    .mb.user{background:#6366f1;color:white;margin-left:auto;border-bottom-right-radius:3px;}
    .mb.assistant{background:#1a1d2e;color:#e5e7eb;border-bottom-left-radius:3px;}
    .cir{padding:8px 12px;border-top:1px solid #1a1d2e;display:flex;gap:6px;}
    .ci{flex:1;background:#1a1d2e;border:1px solid #252838;border-radius:10px;padding:8px 11px;color:white;font-size:12px;outline:none;resize:none;font-family:inherit;}
    .ci:focus{border-color:#6366f1;}.ci::placeholder{color:#4b5563;}
    .sb{width:35px;height:35px;border-radius:9px;background:#6366f1;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0;align-self:flex-end;}
    .sb:hover{background:#818cf8;}.sb:disabled{background:#252838;cursor:not-allowed;}
    .fab{position:fixed;bottom:20px;right:20px;z-index:30;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;cursor:pointer;box-shadow:0 8px 22px rgba(239,68,68,.35);display:flex;align-items:center;justify-content:center;font-size:21px;transition:transform .2s;}
    .fab:hover{transform:scale(1.09);}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
    input[type=number]{-moz-appearance:textfield}
    input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  `;

  return React.createElement('div',{className:"app"},
    React.createElement('style',null,css),

    // HEADER
    React.createElement('div',{className:"hdr"},
      React.createElement('div',{className:"logo"},
        React.createElement('div',{className:"lmark"},React.createElement(Activity,{size:15,color:"white"})),
        React.createElement('div',null,
          React.createElement('div',{className:"aname"},t.appName),
          React.createElement('div',{className:"asub"},t.appSub))),
      React.createElement('div',{className:"hr"},
        React.createElement('button',{className:"lbtn",onClick:()=>setLang(l=>l==="lo"?"en":"lo")},React.createElement(Globe,{size:10}),lang==="lo"?"EN":"ລາວ"),
        React.createElement('button',{className:"sbadge"},React.createElement(CheckCircle2,{size:10,color:"#10b981"}),t.synced),
        React.createElement('div',{className:"av"},"🐱"))),

    // NAV
    React.createElement('div',{className:"nav"},
      [["dashboard",t.tabDashboard],["sport",t.tabSport],["meals",t.tabMeals],["goals",t.tabGoals],["fitbit","Fitbit 📲"]].map(([id,lb])=>
        React.createElement('button',{key:id,className:`nt ${tab===id?"act":""}`,onClick:()=>setTab(id)},lb))),

    // ── DASHBOARD ──
    tab==="dashboard"&&React.createElement('div',null,
      bad&&React.createElement('div',{className:"roast"},React.createElement('span',{style:{fontSize:17}},"😹"),React.createElement('span',null,lang==="lo"?`ໂຄ໊ດແມວ: ເຈົ້ານອນ ${TODAY.sleep}h · Deep ${TODAY.deepSleep}h. ເປີດ Meow Coach 👇`:`Meow: Slept ${TODAY.sleep}h & Deep ${TODAY.deepSleep}h. Open Meow Coach 👇`)),
      React.createElement('div',{style:{display:"grid",gridTemplateColumns:"auto 1fr",gap:10,marginBottom:8}},
        React.createElement('div',{className:"wcard",style:{margin:0}},
          React.createElement(WellnessRing,{score:SCORE,label:t.wellness}),
          React.createElement('div',{style:{flex:1,minWidth:0}},
            React.createElement('div',{style:{fontSize:9,color:"#4b5563",letterSpacing:".06em",marginBottom:2,textTransform:"uppercase"}},t.todayWellness),
            React.createElement('div',{style:{fontSize:16,fontWeight:700,marginBottom:3,color:SCORE<60?"#ef4444":SCORE<75?"#f59e0b":"#10b981"}},t.goodRecovery),
            React.createElement('div',{style:{fontSize:11,color:"#6b7280",lineHeight:1.5,marginBottom:8}},t.wellnessSub),
            React.createElement('div',{style:{display:"flex",gap:8,flexWrap:"wrap"}},
              [[t.sleep,"#8b5cf6",pct(TODAY.sleep,TODAY.sleepGoal)],[t.steps,"#10b981",pct(TODAY.steps,TODAY.stepsGoal)],[t.water,"#06b6d4",pct(TODAY.water,TODAY.waterGoal)]].map(([lb,c,p])=>
                React.createElement('div',{key:lb,style:{display:"flex",alignItems:"center",gap:3}},
                  React.createElement(MiniRing,{pct:p,color:c}),React.createElement('span',{style:{fontSize:9,color:"#6b7280"}},lb)))))),
        React.createElement('div',{className:"cc",style:{margin:0}},
          React.createElement('div',{style:{fontSize:11,fontWeight:600,color:"white",marginBottom:4}},"Wellness Radar"),
          React.createElement(ResponsiveContainer,{width:"100%",height:140},
            React.createElement(RadarChart,{data:RADAR},
              React.createElement(PolarGrid,{stroke:"#1e2130"}),
              React.createElement(PolarAngleAxis,{dataKey:"s",tick:{fill:"#4b5563",fontSize:9}}),
              React.createElement(Radar,{dataKey:"A",stroke:"#6366f1",fill:"#6366f1",fillOpacity:0.2}))))),

      React.createElement('div',{className:"st",style:{marginBottom:8}},t.todayMetrics),
      React.createElement('div',{className:"g2",style:{marginBottom:8}},
        React.createElement(MetricCard,{icon:Activity,label:t.steps,value:TODAY.steps.toLocaleString(),unit:"",goal:TODAY.stepsGoal,color:"#10b981",trend:+5}),
        React.createElement(MetricCard,{icon:Heart,label:t.heartRate,value:TODAY.heartRate,unit:" bpm",color:"#ef4444",trend:-2,subLabel:`HRV ${TODAY.hrv}ms`})),
      React.createElement('div',{className:"g3",style:{marginBottom:8}},
        React.createElement(MetricCard,{icon:Moon,label:t.sleep,value:TODAY.sleep,unit:"h",goal:TODAY.sleepGoal,color:"#8b5cf6"}),
        React.createElement(MetricCard,{icon:Flame,label:t.calories,value:TODAY.calories.toLocaleString(),unit:" kcal",goal:TODAY.caloriesGoal,color:"#f59e0b"}),
        React.createElement(MetricCard,{icon:Droplets,label:t.water,value:TODAY.water,unit:"L",goal:TODAY.waterGoal,color:"#06b6d4"})),
      React.createElement('div',{className:"g4",style:{marginBottom:14}},
        React.createElement(MetricCard,{icon:Wind,label:t.spo2,value:TODAY.spo2,unit:"%",color:"#34d399",trend:0,badge:TODAY.spo2>=95?(lang==="lo"?"ປົກກະຕິ✅":"Normal✅"):(lang==="lo"?"ຕ່ຳ⚠️":"Low⚠️")}),
        React.createElement(MetricCard,{icon:Layers,label:t.floors,value:TODAY.floors,unit:"",goal:TODAY.floorsGoal,color:"#06b6d4",subLabel:t.floorsSub}),
        React.createElement(MetricCard,{icon:VO2Icon,label:t.vo2max,value:TODAY.vo2max,unit:" ml/kg",color:"#a78bfa",subLabel:t.vo2maxSub,badge:vo2Cat(TODAY.vo2max,lang)}),
        React.createElement(MetricCard,{icon:Percent,label:t.bodyFat,value:TODAY.bodyFat,unit:"%",color:"#f59e0b",subLabel:t.bodyFatSub,badge:bfCat(TODAY.bodyFat,lang)})),

      React.createElement('div',{className:"st"},t.sleepStages),
      React.createElement('div',{className:"cc",style:{marginBottom:14}},
        React.createElement('div',{style:{display:"flex",gap:10,marginBottom:9,flexWrap:"wrap"}},
          SLEEP_STAGES.map(s=>React.createElement('div',{key:s.name,style:{display:"flex",alignItems:"center",gap:4}},
            React.createElement('div',{style:{width:7,height:7,borderRadius:2,background:s.fill}}),
            React.createElement('span',{style:{fontSize:10,color:"#6b7280"}},`${s.name} ${s.value}h`)))),
        React.createElement(ResponsiveContainer,{width:"100%",height:80},
          React.createElement(BarChart,{data:SLEEP_STAGES,layout:"vertical",barSize:11},
            React.createElement(XAxis,{type:"number",hide:true}),
            React.createElement(YAxis,{type:"category",dataKey:"name",width:48,tick:{fill:"#4b5563",fontSize:9},axisLine:false,tickLine:false}),
            React.createElement(Bar,{dataKey:"value",radius:[0,5,5,0],fill:"#6366f1"}),
            React.createElement(Tooltip,{content:React.createElement(CT)})))),

      React.createElement('div',{className:"cc",style:{marginBottom:14}},
        React.createElement('div',{style:{fontSize:11,fontWeight:600,color:"white",marginBottom:2}},"SpO₂ — 7 Days"),
        React.createElement(ResponsiveContainer,{width:"100%",height:90},
          React.createElement(AreaChart,{data:WEEK.spo2},
            React.createElement('defs',null,React.createElement('linearGradient',{id:"gspo2",x1:"0",y1:"0",x2:"0",y2:"1"},React.createElement('stop',{offset:"5%",stopColor:"#34d399",stopOpacity:0.3}),React.createElement('stop',{offset:"95%",stopColor:"#34d399",stopOpacity:0}))),
            React.createElement(XAxis,{dataKey:"day",tick:{fill:"#4b5563",fontSize:9},axisLine:false,tickLine:false}),
            React.createElement(YAxis,{hide:true,domain:[88,100]}),
            React.createElement(Tooltip,{content:React.createElement(CT)}),
            React.createElement(Area,{type:"monotone",dataKey:"value",stroke:"#34d399",strokeWidth:2,fill:"url(#gspo2)",dot:false})))),

      React.createElement('div',{className:"cc",style:{marginBottom:14}},
        React.createElement('div',{style:{fontSize:11,fontWeight:600,color:"white",marginBottom:2}},"VO₂ Max — 30 Days"),
        React.createElement(ResponsiveContainer,{width:"100%",height:90},
          React.createElement(AreaChart,{data:WEEK.vo2max},
            React.createElement('defs',null,React.createElement('linearGradient',{id:"gvo2",x1:"0",y1:"0",x2:"0",y2:"1"},React.createElement('stop',{offset:"5%",stopColor:"#a78bfa",stopOpacity:0.3}),React.createElement('stop',{offset:"95%",stopColor:"#a78bfa",stopOpacity:0}))),
            React.createElement(XAxis,{dataKey:"day",tick:{fill:"#4b5563",fontSize:9},axisLine:false,tickLine:false}),
            React.createElement(YAxis,{hide:true,domain:[44,54]}),
            React.createElement(Tooltip,{content:React.createElement(CT)}),
            React.createElement(Area,{type:"monotone",dataKey:"value",stroke:"#a78bfa",strokeWidth:2,fill:"url(#gvo2)",dot:false})))),

      React.createElement('div',{className:"cc",style:{marginBottom:14}},
        React.createElement('div',{style:{fontSize:11,fontWeight:600,color:"white",marginBottom:2}},"Body Fat % — 30 Days"),
        React.createElement(ResponsiveContainer,{width:"100%",height:90},
          React.createElement(AreaChart,{data:WEEK.bodyFat},
            React.createElement('defs',null,React.createElement('linearGradient',{id:"gbf",x1:"0",y1:"0",x2:"0",y2:"1"},React.createElement('stop',{offset:"5%",stopColor:"#f59e0b",stopOpacity:0.3}),React.createElement('stop',{offset:"95%",stopColor:"#f59e0b",stopOpacity:0}))),
            React.createElement(XAxis,{dataKey:"day",tick:{fill:"#4b5563",fontSize:9},axisLine:false,tickLine:false}),
            React.createElement(YAxis,{hide:true,domain:[16,21]}),
            React.createElement(Tooltip,{content:React.createElement(CT)}),
            React.createElement(Area,{type:"monotone",dataKey:"value",stroke:"#f59e0b",strokeWidth:2,fill:"url(#gbf)",dot:false})))),

      React.createElement('div',{className:"st"},t.meowInsights),
      INSIGHTS.map(ins=>React.createElement('div',{key:ins.id,className:"icard",onClick:()=>{setChatOpen(true);setInput(ins.title);}},
        React.createElement('div',{style:{background:`${ins.color}18`,borderRadius:9,padding:7,flexShrink:0}},React.createElement(ins.icon,{size:14,color:ins.color})),
        React.createElement('div',{style:{flex:1,minWidth:0}},
          React.createElement('div',{style:{fontSize:12,fontWeight:600,marginBottom:2}},ins.title),
          React.createElement('div',{style:{fontSize:11,color:"#6b7280",lineHeight:1.5}},ins.body)),
        React.createElement(ChevronRight,{size:12,color:"#4b5563",style:{flexShrink:0,marginTop:2}})))),

    // ── SPORT ──
    tab==="sport"&&React.createElement('div',null,
      React.createElement('div',{className:"st"},t.sportDetect),
      React.createElement('div',{style:{fontSize:11,color:"#4b5563",marginBottom:11}},t.sportSub),
      SPORTS.map(s=>React.createElement('div',{key:s.id,className:"spc"},
        React.createElement('div',{style:{background:`${s.color}18`,borderRadius:10,padding:9,flexShrink:0}},React.createElement(s.icon,{size:19,color:s.color})),
        React.createElement('div',{style:{flex:1}},
          React.createElement('div',{style:{fontSize:13,fontWeight:700,marginBottom:4}},s.type),
          React.createElement('div',{style:{display:"flex",gap:12,flexWrap:"wrap"}},
            [["Duration",s.duration,"white"],["HR Zone",s.hrZone,s.color],["Burned",`${s.burned} kcal`,"#f59e0b"],...(s.dist?[["Dist",s.dist,"white"]]:[])].map(([l,v,c])=>
              React.createElement('div',{key:l},
                React.createElement('div',{style:{fontSize:9,color:"#4b5563"}},l),
                React.createElement('div',{style:{fontSize:12,fontWeight:600,color:c}},v))))),
        React.createElement('div',{style:{background:`${s.color}18`,borderRadius:6,padding:"3px 8px",fontSize:10,color:s.color,fontWeight:600,flexShrink:0}},s.hrZone))),
      React.createElement('div',{className:"cc"},
        React.createElement('div',{style:{fontSize:12,fontWeight:600,color:"white",marginBottom:2}},"Heart Rate — Today"),
        React.createElement(ResponsiveContainer,{width:"100%",height:100},
          React.createElement(AreaChart,{data:WEEK.heartRate},
            React.createElement('defs',null,React.createElement('linearGradient',{id:"ghr",x1:"0",y1:"0",x2:"0",y2:"1"},React.createElement('stop',{offset:"5%",stopColor:"#ef4444",stopOpacity:0.3}),React.createElement('stop',{offset:"95%",stopColor:"#ef4444",stopOpacity:0}))),
            React.createElement(XAxis,{dataKey:"day",tick:{fill:"#4b5563",fontSize:9},axisLine:false,tickLine:false}),
            React.createElement(YAxis,{hide:true}),
            React.createElement(Tooltip,{content:React.createElement(CT)}),
            React.createElement(Area,{type:"monotone",dataKey:"value",stroke:"#ef4444",strokeWidth:2,fill:"url(#ghr)",dot:false}))))),

    // ── MEALS ──
    tab==="meals"&&React.createElement('div',null,
      React.createElement('div',{className:"st"},t.aiMealLogger),
      React.createElement('div',{style:{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:13,padding:13,marginBottom:11}},
        React.createElement('div',{className:"uz",onClick:()=>fileRef.current?.click()},
          imgPreview?React.createElement('img',{src:imgPreview,alt:"meal",style:{width:"100%",maxHeight:170,objectFit:"cover",borderRadius:9}}):
            React.createElement('div',null,React.createElement(Camera,{size:26,color:"#4b5563",style:{margin:"0 auto 7px"}}),React.createElement('div',{style:{fontSize:11,color:"#4b5563"}},t.dropHere))),
        React.createElement('input',{ref:fileRef,type:"file",accept:"image/*",style:{display:"none"},onChange:handleImg}),
        React.createElement('div',{style:{marginTop:9,marginBottom:7,fontSize:10,color:"#6b7280"}},t.orType),
        React.createElement('div',{style:{display:"flex",gap:6}},
          React.createElement('textarea',{className:"ci",style:{height:50},placeholder:t.mealPlaceholder,value:mealInput,onChange:e=>setMealInput(e.target.value),onKeyDown:e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();logMeal();}}}),
          React.createElement('button',{className:"sb",onClick:logMeal,disabled:mealLoading||(!mealInput.trim()&&!imgPreview)},mealLoading?React.createElement(Loader2,{size:14,color:"white"}):React.createElement(Send,{size:14,color:"white"}))),
        mealLoading&&React.createElement('div',{style:{fontSize:11,color:"#6366f1",marginTop:6,display:"flex",alignItems:"center",gap:5}},React.createElement(Loader2,{size:11,color:"#6366f1"}),t.analyzing),
        React.createElement('div',{className:"disc"},React.createElement(AlertCircle,{size:12,style:{flexShrink:0,marginTop:1}}),t.mealDisclaimer)),
      mealLog.length>0&&React.createElement('div',null,React.createElement('div',{className:"st"},t.todayLog),mealLog.map(e=>React.createElement('div',{key:e.id,className:"mli"},
        React.createElement('div',{style:{display:"flex",justifyContent:"space-between",marginBottom:4}},React.createElement('span',{style:{fontSize:12,fontWeight:600}},e.meal),React.createElement('span',{style:{fontSize:10,color:"#4b5563"}},e.time)),
        React.createElement('div',{style:{fontSize:11,color:"#9ca3af",lineHeight:1.55}},e.analysis)))),
      mealLog.length===0&&React.createElement('div',{style:{textAlign:"center",padding:"34px 20px",color:"#4b5563"}},React.createElement(Camera,{size:26,color:"#1e2130",style:{margin:"0 auto 9px"}}),React.createElement('div',{style:{fontSize:12}},t.noMeals),React.createElement('div',{style:{fontSize:10,marginTop:3}},t.noMealsSub))),

    // ── GOALS ──
    tab==="goals"&&React.createElement('div',null,
      React.createElement('div',{className:"st"},t.smartGoals),
      React.createElement('div',{style:{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:13,padding:13,marginBottom:10}},
        React.createElement('div',{style:{display:"flex",alignItems:"center",gap:6,marginBottom:4}},React.createElement(Zap,{size:12,color:"#f59e0b"}),React.createElement('span',{style:{fontSize:9,color:"#f59e0b",fontWeight:700,letterSpacing:".05em"}},t.aiAdjusted)),
        React.createElement('div',{style:{fontSize:11,color:"#6b7280",lineHeight:1.6}},t.aiAdjustedText)),
      [
        {icon:Activity,label:t.steps,   cur:TODAY.steps, goal:10000,unit:lang==="lo"?" ກ້າວ":" steps",color:"#10b981"},
        {icon:Moon,    label:t.sleep,   cur:TODAY.sleep,  goal:8,    unit:"h",                          color:"#8b5cf6"},
        {icon:Droplets,label:t.water,   cur:TODAY.water,  goal:2.5,  unit:"L",                          color:"#06b6d4"},
        {icon:Flame,   label:t.calories,cur:TODAY.calories, goal:2200, unit:" kcal",                      color:"#f59e0b"},
        {icon:Layers,  label:t.floors,  cur:TODAY.floors,  goal:20,   unit:lang==="lo"?" ຊັ້ນ":" flrs", color:"#06b6d4"},
      ].map(g=>React.createElement('div',{key:g.label,style:{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:12,padding:13,marginBottom:8}},
        React.createElement('div',{style:{display:"flex",alignItems:"center",gap:8,marginBottom:9}},
          React.createElement('div',{style:{background:`${g.color}18`,borderRadius:8,padding:6}},React.createElement(g.icon,{size:14,color:g.color})),
          React.createElement('div',{style:{flex:1}},
            React.createElement('div',{style:{fontSize:12,fontWeight:600}},g.label),
            React.createElement('div',{style:{fontSize:10,color:"#4b5563"}},`${t.goal}: ${g.goal}${g.unit}`)),
          React.createElement('div',{style:{fontSize:16,fontWeight:700,color:g.color}},`${pct(g.cur,g.goal)}%`)),
        React.createElement('div',{style:{height:3,background:"#1a1d2e",borderRadius:2}},React.createElement('div',{style:{height:"100%",width:`${pct(g.cur,g.goal)}%`,background:g.color,borderRadius:2,transition:"width 1s ease"}})),
        React.createElement('div',{style:{display:"flex",justifyContent:"space-between",marginTop:4}},
          React.createElement('span',{style:{fontSize:10,color:"#4b5563"}},`${g.cur}${g.unit} ${t.today}`),
          React.createElement('span',{style:{fontSize:10,color:g.color}},`${Math.round((g.goal-g.cur)*10)/10}${g.unit} ${t.toGo}`)))),
      React.createElement('div',{className:"g2",style:{marginBottom:10}},
        React.createElement('div',{style:{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:12,padding:13}},
          React.createElement('div',{style:{fontSize:10,color:"#4b5563",marginBottom:4}},t.vo2max),
          React.createElement('div',{style:{fontSize:22,fontWeight:700,color:"#a78bfa"}},TODAY.vo2max,React.createElement('span',{style:{fontSize:10,color:"#6b7280"}}," ml/kg/min")),
          React.createElement('div',{style:{marginTop:6,fontSize:11,fontWeight:600,color:"#a78bfa"}},vo2Cat(TODAY.vo2max,lang))),
        React.createElement('div',{style:{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:12,padding:13}},
          React.createElement('div',{style:{fontSize:10,color:"#4b5563",marginBottom:4}},t.bodyFat),
          React.createElement('div',{style:{fontSize:22,fontWeight:700,color:"#f59e0b"}},TODAY.bodyFat,React.createElement('span',{style:{fontSize:10,color:"#6b7280"}},"%")),
          React.createElement('div',{style:{marginTop:6,fontSize:11,fontWeight:600,color:"#f59e0b"}},bfCat(TODAY.bodyFat,lang)))),
      React.createElement('div',{className:"cc",style:{marginBottom:10}},
        React.createElement('div',{style:{fontSize:12,fontWeight:600,color:"white",marginBottom:8}},"Wellness Score — 30 Days"),
        React.createElement(ResponsiveContainer,{width:"100%",height:90},
          React.createElement(LineChart,{data:MONTH},
            React.createElement(XAxis,{dataKey:"day",tick:{fill:"#4b5563",fontSize:9},axisLine:false,tickLine:false}),
            React.createElement(YAxis,{hide:true,domain:[40,100]}),
            React.createElement(Tooltip,{content:React.createElement(CT)}),
            React.createElement(Line,{type:"monotone",dataKey:"wellness",stroke:"#6366f1",strokeWidth:2,dot:false})))),
      React.createElement('button',{style:{width:"100%",padding:11,border:"1px dashed #1e2130",borderRadius:10,background:"transparent",color:"#4b5563",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"inherit"}},React.createElement(Download,{size:12}),t.exportPDF),
      React.createElement('div',{className:"disc",style:{marginTop:10}},React.createElement(AlertCircle,{size:12,style:{flexShrink:0,marginTop:1}}),React.createElement('span',null,t.healthDisclaimer))),

    // ── FITBIT AIR BLE STATUS ──
    tab==="fitbit"&&React.createElement('div',null,
      React.createElement('div',{style:{background:"#0d0f1a",border:"1px solid #1a1d2e",borderRadius:16,padding:20,marginBottom:12}},
        React.createElement('div',{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16}},
          React.createElement('div',{style:{width:52,height:52,borderRadius:16,background:"linear-gradient(135deg,#00B0B9,#0073CF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}},"🫀"),
          React.createElement('div',null,
            React.createElement('div',{style:{fontSize:16,fontWeight:700,color:"white"}},t.fitbitTitle),
            React.createElement('div',{style:{fontSize:11,color:"#6b7280",marginTop:2}},"Google Fitbit Air"),
            React.createElement('div',{style:{fontSize:11,color:"#6b7280"}},lang==="lo"?"Bluetooth Low Energy (BLE)":"Bluetooth Low Energy"))),

        React.createElement('div',{style:{
          display:"flex",alignItems:"center",gap:10,padding:"14px 16px",
          borderRadius:12,marginBottom:16,
          background: btState==="connected"?"#052e16":btState==="searching"?"#1a1505":btState==="error"||btState==="nobrowser"||btState==="nohttps"?"#3b0a0a":"#0f111a",
          border: `1px solid ${btState==="connected"?"#16a34a":btState==="searching"?"#ca8a04":btState==="error"||btState==="nobrowser"||btState==="nohttps"?"#ef4444":"#1e2130"}`,
        }},
          React.createElement('div',{style:{
            width:12,height:12,borderRadius:"50%",flexShrink:0,
            background: btState==="connected"?"#22c55e":btState==="searching"?"#eab308":"#ef4444",
            animation: btState==="searching"?"pulse 1s infinite":"none",
          }}),
          React.createElement('div',{style:{flex:1}},
            React.createElement('div',{style:{fontSize:14,fontWeight:600,color:"white"}},
              btState==="connected"?t.btConnected:
              btState==="searching"?t.btSearching:
              btState==="error"?t.btError:
              btState==="nobrowser"?t.btNoBrowser:
              btState==="nohttps"?t.btHttps:
              t.btDisconnected),
            btDeviceName&&btState==="connected"&&React.createElement('div',{style:{fontSize:11,color:"#6b7280",marginTop:3}},`📱 ${btDeviceName}`),
            btBattery!==null&&btState==="connected"&&React.createElement('div',{style:{fontSize:11,color:"#6b7280",marginTop:3}},`🔋 ${btBattery}%`)),
          React.createElement('span',{style:{fontSize:24}},btState==="connected"?"✅":btState==="searching"?"⟳":"❌"))),

        React.createElement('button',{
          onClick: btState==="connected"?disconnectFitbit:connectFitbit,
          disabled: btState==="searching",
          style:{
            width:"100%",padding:"12px 0",borderRadius:12,border:"none",cursor:btState==="searching"?"not-allowed":"pointer",
            background: btState==="connected"?"#3b0a0a":btState==="searching"?"#1a1d2e":"linear-gradient(135deg,#00B0B9,#0073CF)",
            color: btState==="searching"?"#4b5563":"white",
            fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"inherit",
            transition:"all .2s",
          }},
          btState==="searching"?React.createElement('span',{style:{animation:"spin 1s linear infinite",display:"inline-block"}},"⟳"):null,
          btState==="connected"?t.btDisconnect:btState==="searching"?t.btSearching:t.btConnect)),

      React.createElement('div',{style:{background:"#0d0f1a",border:"1px solid #1e2130",borderRadius:14,padding:16}},
        React.createElement('div',{style:{fontSize:12,fontWeight:700,color:"white",marginBottom:12}},lang==="lo"?"💡 ກ່ຽວກັບ Fitbit Air BLE":"💡 About Fitbit Air BLE"),
        React.createElement('div',{style:{fontSize:11,color:"#9ca3af",lineHeight:1.8}},
          lang==="lo"
            ?"Fitbit Air ໃຊ້ Bluetooth Low Energy (BLE) ເພື່ອເຊື່ອມຕໍ່ໂທລະສັບ. ປຸ່ມ 'ເຊື່ອມຕໍ່' ໃຊ້ Web Bluetooth API ເພື່ອກວດຈັບໃກ້ຄຽງ Fitbit Air.

✅ ເຊື່ອມຕໍ່ໄດ້: ເຫັນ Fitbit Air ຢູ່ໃນລາຍຊື່ BLE devices
❌ ຂໍ້ມູນ HR: Fitbit ເຮັດໃຫ້ຂໍ້ມູນ Heart Rate ຊ່ອນ (protocol ສ່ວນຕົວ)

ວິທີ Sync ຂໍ້ມູນ: ໃຊ້ app 'Fitbit' ພື່ອ sync → Dashboard ຂະນະນັ້ນ"
            :"Fitbit Air uses Bluetooth Low Energy (BLE) to connect to your phone. The 'Connect' button uses Web Bluetooth API to scan nearby devices.

✅ Can connect: See Fitbit Air in BLE device list
❌ Heart Rate data: Fitbit encrypts HR data (proprietary protocol)

How to sync: Use Fitbit app to sync → then check dashboard")),

      React.createElement('div',{style:{background:"#0a0c15",border:"1px solid #1a1d2e",borderRadius:12,padding:14,marginTop:10}},
        React.createElement('div',{style:{fontSize:10,color:"#6b7280",fontWeight:600,marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}},lang==="lo"?"⚙️ ສະຖານະ BLE":"⚙️ BLE Status"),
        React.createElement('div',{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}},
          [
            [lang==="lo"?"ສະຖານະ":"State", btState==="connected"?"Connected ✅":btState==="searching"?"Scanning 🔍":"Disconnected ❌"],
            [lang==="lo"?"ອຸປະກອນ":"Device", btDeviceName||"None"],
            [lang==="lo"?"ແບດ":"Battery", btBattery!==null?btBattery+"%":"N/A"],
            [lang==="lo"?"Browser":"Browser", navigator.bluetooth?"Chrome/Edge ✅":"Unsupported ❌"],
          ].map(([l,v])=>
            React.createElement('div',{key:l,style:{background:"#131520",borderRadius:10,padding:10}},
              React.createElement('div',{style:{fontSize:9,color:"#4b5563",marginBottom:4}},l),
              React.createElement('div',{style:{fontSize:11,fontWeight:600,color:"white"}},v))))),
    ),

    // FAB
    React.createElement('button',{className:"fab",onClick:()=>setChatOpen(true),title:t.openCoach},"🐱"),

    // CHAT DRAWER
    chatOpen&&React.createElement('div',null,
      React.createElement('div',{className:"cbk",onClick:()=>setChatOpen(false)}),
      React.createElement('div',{className:"cdw"},
        React.createElement('div',{className:"chdr"},
          React.createElement('div',{style:{display:"flex",alignItems:"center",gap:8}},
            React.createElement('div',{style:{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#f59e0b,#ef4444)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}},"🐱"),
            React.createElement('div',null,
              React.createElement('div',{style:{fontSize:12,fontWeight:700}},t.meowCoach),
              React.createElement('div',{style:{fontSize:9,color:"#10b981",display:"flex",alignItems:"center",gap:3}},React.createElement('div',{style:{width:5,height:5,borderRadius:"50%",background:"#10b981"}}),t.online,bad&&React.createElement('span',{style:{color:"#ef4444",marginLeft:3}},"⚠️")))),
          React.createElement('button',{onClick:()=>setChatOpen(false),style:{background:"none",border:"none",cursor:"pointer",color:"#4b5563"}},React.createElement(X,{size:18}))),
        React.createElement('div',{className:"cms"},
          msgs.map((m,i)=>React.createElement('div',{key:i,className:`mb ${m.role}`},m.content)),
          loading&&React.createElement('div',{className:"mb assistant",style:{display:"flex",gap:4,alignItems:"center"}},[0,.2,.4].map((d,i)=>React.createElement('div',{key:i,style:{width:5,height:5,borderRadius:"50%",background:"#f59e0b",animation:`pulse 1s infinite ${d}s`}}))),
          React.createElement('div',{ref:chatEnd})),
        React.createElement('div',{style:{padding:"5px 11px 6px",borderTop:"1px solid #1a1d2e"}},React.createElement('div',{style:{display:"flex",gap:4,flexWrap:"wrap"}},[t.qq1,t.qq2,t.qq3].map(q=>React.createElement('button',{key:q,onClick:()=>setInput(q),style:{padding:"3px 7px",borderRadius:16,border:"1px solid #1a1d2e",background:"transparent",color:"#6b7280",fontSize:9,cursor:"pointer",fontFamily:"inherit"}},q)))),
        React.createElement('div',{className:"cir"},
          React.createElement('textarea',{className:"ci",rows:1,placeholder:t.askMeow,value:input,onChange:e=>setInput(e.target.value),onKeyDown:e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}),
          React.createElement('button',{className:"sb",onClick:send,disabled:loading||!input.trim()},loading?React.createElement(Loader2,{size:14,color:"white"}):React.createElement(Send,{size:14,color:"white"}))),
        React.createElement('div',{style:{padding:"3px 13px 9px",fontSize:9,color:"#374151",textAlign:"center"}},t.meowDisclaimer)))
  );
}

// Mount
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(HealthApp));

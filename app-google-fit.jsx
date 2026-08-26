// ──────────────────────────────────────────────────────────────────────────────
// HEALTH TRACKER + GOOGLE FIT API (OAuth 2.0)
// Replaces Fitbit Web API (deprecated Sept 2026)
// ──────────────────────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useCallback } = React;
const { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis } = Recharts;

// ── GOOGLE FIT OAuth 2.0 PKCE ──────────────────────────────────────────────────
const GOOGLE_CLIENT_ID = "665128396074-tiivjl5t56iau0ds068bas6p7o1i8goi.apps.googleusercontent.com"; // From Google Cloud Console
const GOOGLE_REDIRECT_URI = "https://somxay.github.io/health-tracker";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_FIT_API = "https://www.googleapis.com/fitness/v1/users/me";

const SCOPES = [
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
  "https://www.googleapis.com/auth/fitness.step_count.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.nutrition.read"
];

// PKCE
function generatePKCE() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array)).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' }[c]));
}

async function getGoogleAccessToken(code, codeVerifier) {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: GOOGLE_REDIRECT_URI,
    code: code,
    code_verifier: codeVerifier,
  });

  try {
    const res = await fetch(GOOGLE_TOKEN_URL, { method: 'POST', body: params });
    const data = await res.json();
    if (data.access_token) {
      return { accessToken: data.access_token, refreshToken: data.refresh_token, expiresIn: data.expires_in };
    }
  } catch (err) { console.error('Token error:', err); }
  return null;
}

async function getGoogleFitData(accessToken, dataType, days = 1) {
  const now = Date.now();
  const startTime = now - (days * 24 * 60 * 60 * 1000);

  const dataTypeMap = {
    steps: 'com.google.step_count.delta',
    heartRate: 'com.google.heart_rate.bpm',
    sleep: 'com.google.sleep.segment',
    calories: 'com.google.calories.expended',
    weight: 'com.google.weight'
  };

  try {
    const res = await fetch(`${GOOGLE_FIT_API}/dataset:aggregate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aggregateBy: [{ dataTypeName: dataTypeMap[dataType] }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: now
      })
    });

    if (!res.ok) throw new Error('Google Fit API error');
    const data = await res.json();
    return data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value || null;
  } catch (err) {
    console.error('Fit API error:', err);
    return null;
  }
}

// SVG Icons
const Icon = ({ d, size=16, color="currentColor" }) =>
  React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round" }, React.createElement('path', { d }));

const PATHS = {
  Activity:"M22 12h-4l-3 9L9 3l-3 9H2", Heart:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  Moon:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z", Flame:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z",
  Droplets:"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z", CheckCircle2:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9 12l2 2 4-4",
  Globe:"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
};

const mkIcon = (key) => ({ size=16, color="currentColor" }) => Icon({ d: PATHS[key], size, color });
const Activity=mkIcon('Activity'), Heart=mkIcon('Heart'), Moon=mkIcon('Moon'), Flame=mkIcon('Flame'), Droplets=mkIcon('Droplets');
const CheckCircle2=mkIcon('CheckCircle2'), Globe=mkIcon('Globe');

// ─── I18N ─────────────────────────────────────────────────────────────────────
const T = {
  lo: {
    appName:"ຄົນແພ້ກໍຕ້ອງດູແລຕົວເອງ",
    loginGoogle:"ເຂົ້າສູ່ລະບົບກັບ Google Fit",
    loginSub:"ສິນຄ້າຈາກ Fitbit ທີ່ຕໍ່ໆໄປໄປ Google Fit",
    logout:"ອອກຈາກລະບົບ",
    fetching:"ກຳລັງດຶງຂໍ້ມູນ…",
    welcome:"ສະບາຍດີ",
    steps:"ກ້າວ", heartRate:"ຫົວໃຈ", sleep:"ນອນ", calories:"ແຄລໍລີ",
    syncedToday:"ບໍ່ມີຂໍ້ມູນວັນນີ້",
  },
  en: {
    appName:"Even Losers Care for Themselves",
    loginGoogle:"Login with Google Fit",
    loginSub:"Fitbit data now flows through Google Fit",
    logout:"Logout",
    fetching:"Fetching data…",
    welcome:"Welcome",
    steps:"Steps", heartRate:"Heart Rate", sleep:"Sleep", calories:"Calories",
    syncedToday:"No data synced today",
  }
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function HealthApp(){
  const [lang, setLang] = useState("lo");
  const t = T[lang];
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setLoading(true);
      const verifier = localStorage.getItem('google_verifier');
      
      if (verifier) {
        getGoogleAccessToken(code, verifier).then(token => {
          if (token) {
            localStorage.setItem('google_token', token.accessToken);
            if (token.refreshToken) localStorage.setItem('google_refresh', token.refreshToken);
            window.history.replaceState({}, document.title, GOOGLE_REDIRECT_URI);
            
            // Fetch data
            Promise.all([
              getGoogleFitData(token.accessToken, 'steps'),
              getGoogleFitData(token.accessToken, 'heartRate'),
              getGoogleFitData(token.accessToken, 'sleep'),
              getGoogleFitData(token.accessToken, 'calories')
            ]).then(([steps, hr, sleep, cal]) => {
              setData({ steps: steps?.intVal || 0, heartRate: hr?.fpVal || 0, sleep, calories: cal?.fpVal || 0 });
              setUser({ name: 'Fitbit User' });
              setLoading(false);
            });
          }
        });
      }
    } else {
      // Check if already logged in
      const token = localStorage.getItem('google_token');
      if (token) setUser({ name: 'Fitbit User' });
    }
  }, []);

  const handleLogin = () => {
    const verifier = generatePKCE();
    localStorage.setItem('google_verifier', verifier);

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: SCOPES.join(' '),
      access_type: 'offline',
      prompt: 'consent',
      code_challenge: verifier,
      code_challenge_method: 'S256'
    });

    window.location.href = `${GOOGLE_AUTH_URL}?${params}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    localStorage.removeItem('google_refresh');
    localStorage.removeItem('google_verifier');
    setUser(null);
    setData(null);
  };

  const css = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html, #root { background: #080a12; color: white; font-family: -apple-system, BlinkMacSystemFont, sans-serif; min-height: 100vh; }
    .app { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .hdr { text-align: center; margin-bottom: 40px; }
    .logo { width: 60px; height: 60px; border-radius: 20px; background: linear-gradient(135deg, #4285F4, #EA4335); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
    .aname { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .asub { font-size: 14px; color: #6b7280; }
    .btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #4285F4, #34A853); color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; margin-bottom: 12px; }
    .btn.logout { background: #EA4335; }
    .card { background: #0d0f1a; border: 1px solid #1a1d2e; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .metric { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 12px; }
    .metric-box { background: #131520; border-radius: 10px; padding: 16px; text-align: center; }
    .metric-val { font-size: 20px; font-weight: 700; color: #4285F4; }
    .metric-label { font-size: 12px; color: #6b7280; margin-top: 4px; }
    .lang-btn { position: absolute; top: 20px; right: 20px; background: #0f111a; border: 1px solid #1e2130; padding: 6px 12px; border-radius: 20px; color: #6b7280; cursor: pointer; font-size: 12px; }
  `;

  return React.createElement('div', null,
    React.createElement('style', null, css),
    React.createElement('button', { className: 'lang-btn', onClick: () => setLang(l => l === 'lo' ? 'en' : 'lo') }, lang === 'lo' ? 'EN' : 'ລາວ'),
    React.createElement('div', { className: 'app' },
      React.createElement('div', { className: 'hdr' },
        React.createElement('div', { className: 'logo' }, '📱'),
        React.createElement('div', { className: 'aname' }, t.appName),
        React.createElement('div', { className: 'asub' }, t.loginSub)
      ),

      loading && React.createElement('div', { style: { textAlign: 'center', padding: '40px' } }, t.fetching),

      !user ? React.createElement('div', { className: 'card' },
        React.createElement('button', { className: 'btn', onClick: handleLogin }, t.loginGoogle)
      ) : React.createElement('div', null,
        React.createElement('div', { className: 'card' },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 700, marginBottom: 12 } }, t.welcome),
          data ? React.createElement('div', { className: 'metric' },
            React.createElement('div', { className: 'metric-box' }, React.createElement('div', { className: 'metric-val' }, data.steps), React.createElement('div', { className: 'metric-label' }, t.steps)),
            React.createElement('div', { className: 'metric-box' }, React.createElement('div', { className: 'metric-val' }, Math.round(data.heartRate)), React.createElement('div', { className: 'metric-label' }, t.heartRate)),
            React.createElement('div', { className: 'metric-box' }, React.createElement('div', { className: 'metric-val' }, data.calories ? Math.round(data.calories) : '--'), React.createElement('div', { className: 'metric-label' }, t.calories))
          ) : React.createElement('div', { style: { color: '#6b7280', textAlign: 'center', padding: '20px' } }, t.syncedToday)
        ),
        React.createElement('button', { className: 'btn logout', onClick: handleLogout }, t.logout)
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(HealthApp));

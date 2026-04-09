import { useState, useMemo } from "react";
import {
  Sparkles, Ticket, Search, User, ChevronRight, Clock as Clk, MapPin, Plus, Check,
  Plane, Smartphone, Hotel, UtensilsCrossed, Moon, Users, CloudRain, Heart, Calendar,
  Lightbulb, ArrowLeft, RotateCcw, CreditCard, Ship, QrCode, Navigation, Landmark,
  ShieldCheck, Globe, Bell, Route, Headphones, Star, Wallet, Train, Languages,
  HelpCircle, Compass, Minus, X, Shield, Info, ExternalLink, Filter, Zap, Bus, Car,
  Copy, AlertTriangle, CheckCircle, Sun, Anchor, Wifi, Eye, Coffee, Umbrella, Phone,
  ChevronDown, Package, MessageCircle, LifeBuoy
} from "lucide-react";

// ═══════════════════════════════════════════
// THEME TOKEN SYSTEM — Premium Bosphorus
// ═══════════════════════════════════════════
const T = {
  bg: "#F5F7FB", surface: "#FFFFFF", surfaceSoft: "#F8FAFD",
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8", line: "#E2E8F0",
  primary: "#1D4ED8", primarySoft: "#DBEAFE",
  gold: "#C59D5F", goldSoft: "#FBF5EB",
  ok: "#059669", okSoft: "#D1FAE5",
  warn: "#D97706", warnSoft: "#FEF3C7",
  danger: "#E11D48", dangerSoft: "#FFE4E6",
  dark: "#0B1220", dark2: "#111827",
  r: { sm: 12, md: 18, lg: 24, xl: 30 },
  sh: { card: "0 4px 14px rgba(15,23,42,0.06)", hero: "0 20px 50px rgba(15,23,42,0.16)" }
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";
const fi = "'Inter',system-ui,sans-serif";

// ═══════════════════════════════════════════
// DATA — 15 Attractions with GYG Affiliate Links
// ═══════════════════════════════════════════
const ATT = [
  { id:"hagia", title:"Hagia Sophia", cat:"Landmark", price:25, dur:"1.5h", rating:4.9, img:"/hagia.jpg", badge:"Most booked", skip:true, link:"https://gyg.me/9TxDoMwH" },
  { id:"basilica", title:"Basilica Cistern", cat:"Museum", price:20, dur:"1h", rating:4.8, img:"/basilica.jpg", badge:"Fast entry", skip:true, link:"https://gyg.me/HyHBAHab" },
  { id:"topkapi", title:"Topkapi Palace", cat:"Palace", price:30, dur:"2.5h", rating:4.9, img:"/topkapi.jpg", badge:"High value", skip:true, link:"https://gyg.me/zHWCA6tY" },
  { id:"cruise", title:"Bosphorus Cruise", cat:"Experience", price:18, dur:"2h", rating:4.7, img:"/cruise.jpg", badge:"Sunset pick", skip:false, link:"https://gyg.me/Ou6l1R0E" },
  { id:"hammam", title:"Turkish Bath", cat:"Wellness", price:45, dur:"1.5h", rating:4.8, img:"/hammam.jpg", badge:"Authentic", skip:false, link:"https://gyg.me/wdfMolAo" },
  { id:"galata", title:"Galata Tower", cat:"Viewpoint", price:15, dur:"45min", rating:4.6, img:"/galata.jpg", badge:"360° view", skip:true, link:"https://gyg.me/NCnQgklA" },
  { id:"dolma", title:"Dolmabahçe Palace", cat:"Palace", price:28, dur:"2h", rating:4.7, img:"/dolma.jpg", badge:"Crystal stairs", skip:true, link:"https://gyg.me/FhcexQTY" },
  { id:"dervish", title:"Whirling Dervish", cat:"Culture", price:22, dur:"1h", rating:4.9, img:"/dervish.jpg", badge:"Unique", skip:false, link:"https://gyg.me/MZyCEeij" },
  { id:"islands", title:"Princes' Islands", cat:"Day Trip", price:35, dur:"Full day", rating:4.7, img:"/islands.jpg", badge:"Day trip", skip:false, link:"https://gyg.me/50M4D75g" },
  { id:"cooking", title:"Turkish Cooking Class", cat:"Experience", price:50, dur:"4h", rating:4.9, img:"/cooking.jpg", badge:"Top rated", skip:false, link:"https://gyg.me/TyiQJFVC" },
  { id:"foodtour", title:"Istanbul Food Tour", cat:"Experience", price:40, dur:"3.5h", rating:4.8, img:"/foodtour.jpg", badge:"Bestseller", skip:false, link:"https://gyg.me/0KLewel5" },
  { id:"hoponoff", title:"Hop-on Hop-off Bus", cat:"Transport", price:28, dur:"Full day", rating:4.4, img:"/hoponoff.jpg", badge:"Flexible", skip:false, link:"https://gyg.me/0hgJBsgt" },
  { id:"nightcruise", title:"Dinner Cruise", cat:"Experience", price:55, dur:"3h", rating:4.6, img:"/nightcruise.jpg", badge:"Romantic", skip:false, link:"https://gyg.me/8f0VjFBO" },
  { id:"aquarium", title:"Istanbul Aquarium", cat:"Family", price:22, dur:"2h", rating:4.5, img:"/aquarium.jpg", badge:"Family pick", skip:true, link:"https://gyg.me/8drJtohU" },
  { id:"maiden", title:"Maiden's Tower", cat:"Landmark", price:20, dur:"1.5h", rating:4.7, img:"/maiden.jpg", badge:"Iconic", skip:false, link:"https://gyg.me/3vDd9xwf" },
];

const PLAN_DAYS = [
  { day:1, title:"Old City Essentials", items:[
    {t:"09:00",n:"Hagia Sophia",m:"1.5h · skip line",tp:"landmark",id:"hagia"},
    {t:"10:50",n:"Basilica Cistern",m:"45min · 4 min walk",tp:"museum",id:"basilica"},
    {t:"12:10",n:"Lunch break",m:"1h · local restaurant",tp:"food"},
    {t:"13:45",n:"Blue Mosque",m:"40min · free entry",tp:"landmark"},
    {t:"15:00",n:"Topkapi Palace",m:"2.5h · include Harem",tp:"museum",id:"topkapi"},
    {t:"18:15",n:"Grand Bazaar",m:"1.5h · closes 19:00",tp:"shopping"},
  ]},
  { day:2, title:"Bosphorus & Beyoğlu", items:[
    {t:"09:30",n:"Dolmabahçe Palace",m:"2h · timed entry",tp:"museum",id:"dolma"},
    {t:"12:15",n:"Bosphorus Cruise",m:"2h · pier boarding",tp:"landmark",id:"cruise"},
    {t:"15:00",n:"Ortaköy break",m:"45min · street food",tp:"food"},
    {t:"17:00",n:"Galata Tower",m:"45min · sunset views",tp:"landmark",id:"galata"},
    {t:"19:00",n:"İstiklal & dinner",m:"shopping + rooftop",tp:"shopping"},
  ]},
  { day:3, title:"Local Layers", items:[
    {t:"10:00",n:"Turkish Bath",m:"90min · authentic",tp:"wellness",id:"hammam"},
    {t:"12:30",n:"Spice Bazaar",m:"1h · souvenirs",tp:"shopping"},
    {t:"14:00",n:"Balat & Fener",m:"2.5h · colorful streets",tp:"neighborhood"},
    {t:"17:45",n:"Whirling Dervish",m:"1h · evening ceremony",tp:"culture",id:"dervish"},
    {t:"19:15",n:"Farewell dinner",m:"Ottoman cuisine",tp:"food"},
  ]},
];

const dotC = {landmark:"#2563EB",museum:"#7C3AED",food:"#D97706",shopping:"#059669",wellness:"#E11D48",neighborhood:"#0891B2",culture:"#C026D3"};
const TRANS = [
  {icon:CreditCard,title:"Digital Istanbulkart",desc:"Metro, tram, ferry, buses.",price:"₺150",badge:"Recommended",tone:T.primarySoft,ac:T.primary},
  {icon:QrCode,title:"Single Ride QR",desc:"One-off. No card needed.",price:"₺20",badge:"Quick",tone:"#FCE7F3",ac:"#BE185D"},
  {icon:Plane,title:"Airport Transfer",desc:"Havaist IST & SAW. 24/7.",price:"€12",badge:"Arrival",tone:T.okSoft,ac:T.ok},
  {icon:Ship,title:"Ferry Pack",desc:"Bosphorus + islands.",price:"₺80",badge:"Scenic",tone:T.warnSoft,ac:T.warn},
];

// ═══════════════════════════════════════════
// MICRO COMPONENTS
// ═══════════════════════════════════════════
const Pill = ({children,tone=T.primarySoft,color=T.primary}) => <span style={{background:tone,color,display:"inline-flex",alignItems:"center",gap:4,borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:600}}>{children}</span>;
const Lbl = ({children}) => <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.14em",color:T.inkMute,marginBottom:6}}>{children}</div>;
const Hd = ({children}) => <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",color:T.ink,fontFamily:fd,marginBottom:16}}>{children}</div>;
const Back = ({onClick}) => <div onClick={onClick} style={{width:40,height:40,borderRadius:16,background:"white",border:`1px solid ${T.line}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><ArrowLeft size={16} color={T.inkSoft}/></div>;

export default function IstanbulGo() {
  // ── STATE ──
  const [boarded, setBoarded] = useState(false);
  const [obStep, setObStep] = useState(0);
  const [obData, setObData] = useState({days:3,first:true,interests:[],area:"sultanahmet"});
  const [tab, setTab] = useState("home");
  const [favs, setFavs] = useState(new Set());
  const [infoPage, setInfoPage] = useState(null);
  const [transOpen, setTransOpen] = useState(false);
  const [planStep, setPlanStep] = useState(0);
  const [planDays, setPlanDays] = useState(3);
  const [planSel, setPlanSel] = useState(new Set(["hagia","basilica","topkapi","cruise"]));
  const [planTempo, setPlanTempo] = useState("balanced");
  const [activeDay, setActiveDay] = useState(1);
  const [copied, setCopied] = useState(null);
  const [bookFilter, setBookFilter] = useState("All");

  const toggleFav = id => {const s=new Set(favs);s.has(id)?s.delete(id):s.add(id);setFavs(s)};
  const toggleSel = id => {const s=new Set(planSel);s.has(id)?s.delete(id):s.add(id);setPlanSel(s)};
  const activePlan = PLAN_DAYS.find(d=>d.day===activeDay);
  const doCopy = (text,id) => {navigator.clipboard?.writeText(text).catch(()=>{});setCopied(id);setTimeout(()=>setCopied(null),1500)};
  const goTab = t => {setTab(t);setInfoPage(null);if(t==="plan"&&planStep===0)setPlanStep(0);};

  const cats = ["All",...[...new Set(ATT.map(a=>a.cat))]];
  const filteredATT = bookFilter==="All"?ATT:ATT.filter(a=>a.cat===bookFilter);

  // ═══════════════════════════════════════════
  // ONBOARDING
  // ═══════════════════════════════════════════
  if(!boarded) {
    const steps = [
      // Step 0: Welcome
      <div key={0} style={{textAlign:"center",padding:"60px 24px 40px"}}>
        <div style={{fontSize:48,marginBottom:16}}>🌊</div>
        <div style={{fontFamily:fd,fontSize:28,fontWeight:800,letterSpacing:"-0.03em",color:T.ink}}>Welcome to Istanbul</div>
        <div style={{fontSize:14,color:T.inkSoft,marginTop:8,lineHeight:1.6}}>Your personal city companion — from airport to checkout day.</div>
        <div onClick={()=>setObStep(1)} style={{marginTop:32,background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:fi}}>
          Let's get started
        </div>
      </div>,
      // Step 1: Days
      <div key={1} style={{padding:"40px 24px"}}>
        <Lbl>Step 1 of 3</Lbl>
        <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>How long are you staying?</div>
        <div style={{fontSize:13,color:T.inkSoft,marginBottom:24}}>We'll plan the perfect amount of activities per day.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:32}}>
          {[1,2,3,4,5,7].map(d=>(
            <div key={d} onClick={()=>setObData({...obData,days:d})} style={{
              width:56,height:56,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:18,fontWeight:700,cursor:"pointer",fontFamily:fi,
              background:obData.days===d?T.dark:"white",color:obData.days===d?T.gold:T.ink,
              boxShadow:obData.days===d?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`
            }}>{d}</div>
          ))}
        </div>
        <div onClick={()=>setObStep(2)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}}>Continue</div>
      </div>,
      // Step 2: Interests
      <div key={2} style={{padding:"40px 24px"}}>
        <Lbl>Step 2 of 3</Lbl>
        <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>What excites you?</div>
        <div style={{fontSize:13,color:T.inkSoft,marginBottom:24}}>Pick everything that sounds interesting.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
          {["History & Architecture","Food & Cuisine","Shopping & Bazaars","Nightlife","Nature & Bosphorus","Wellness & Hammam","Culture & Arts","Family Activities"].map(i=>{
            const on=obData.interests.includes(i);
            return <div key={i} onClick={()=>setObData({...obData,interests:on?obData.interests.filter(x=>x!==i):[...obData.interests,i]})} style={{
              padding:"10px 16px",borderRadius:24,fontSize:13,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6,
              background:on?T.dark:"white",color:on?"white":T.ink,
              boxShadow:on?"0 4px 14px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`
            }}>{i} {on&&<Check size={12}/>}</div>
          })}
        </div>
        <div onClick={()=>setObStep(3)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}}>Continue</div>
      </div>,
      // Step 3: Area
      <div key={3} style={{padding:"40px 24px"}}>
        <Lbl>Step 3 of 3</Lbl>
        <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>Where are you staying?</div>
        <div style={{fontSize:13,color:T.inkSoft,marginBottom:24}}>We'll optimize routes from your hotel area.</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:32}}>
          {[{id:"sultanahmet",n:"Sultanahmet / Old Town",d:"Walking distance to main sights"},{id:"taksim",n:"Taksim / Beyoğlu",d:"Nightlife, shopping, modern side"},{id:"kadikoy",n:"Kadıköy / Asian Side",d:"Local vibes, food scene"},{id:"other",n:"Other / Not sure yet",d:"We'll figure it out"}].map(a=>(
            <div key={a.id} onClick={()=>setObData({...obData,area:a.id})} style={{
              borderRadius:18,padding:"16px 18px",cursor:"pointer",
              background:obData.area===a.id?T.dark:"white",color:obData.area===a.id?"white":T.ink,
              boxShadow:obData.area===a.id?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`
            }}>
              <div style={{fontSize:15,fontWeight:600}}>{a.n}</div>
              <div style={{fontSize:12,opacity:0.6,marginTop:2}}>{a.d}</div>
            </div>
          ))}
        </div>
        <div onClick={()=>{setPlanDays(obData.days);setPlanStep(4);setBoarded(true)}} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Sparkles size={16}/> Build my trip
        </div>
        <div onClick={()=>{setBoarded(true);setPlanStep(0)}} style={{textAlign:"center",marginTop:12,fontSize:13,color:T.inkMute,cursor:"pointer"}}>Skip for now</div>
      </div>,
    ];
    return (
      <div style={{minHeight:"100vh",background:"radial-gradient(circle at top,#eaf2ff 0%,#f5f7fb 35%)",padding:16,fontFamily:fi}}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/>
        <div style={{maxWidth:440,margin:"0 auto",borderRadius:34,border:"1px solid rgba(255,255,255,0.7)",background:"white",boxShadow:T.sh.hero,overflow:"hidden"}}>
          {obStep>0&&<div style={{padding:"16px 24px 0",display:"flex",gap:6}}>
            {[1,2,3].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=obStep?T.primary:T.line}}/>)}
          </div>}
          {steps[obStep]}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // MAIN APP
  // ═══════════════════════════════════════════
  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(circle at top,#eaf2ff 0%,#f5f7fb 35%)",padding:16,fontFamily:fi}}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:440,margin:"0 auto",borderRadius:34,border:"1px solid rgba(255,255,255,0.7)",background:"white",boxShadow:T.sh.hero,overflow:"hidden",position:"relative"}}>

        {/* ═══ HEADER ═══ */}
        <div style={{position:"relative",overflow:"hidden",background:`linear-gradient(180deg,${T.dark} 0%,#16233B 58%,#1A2B45 100%)`,padding:"32px 20px 20px",color:"white"}}>
          <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"20px 20px"}}/>
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:24,fontWeight:800,letterSpacing:"-0.04em",fontFamily:fd}}>Istanbul</span>
                <span style={{background:"rgba(255,255,255,0.1)",padding:"4px 8px",borderRadius:99,fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#BFDBFE"}}>GO</span>
              </div>
              <div style={{marginTop:4,fontSize:11,textTransform:"uppercase",letterSpacing:"0.14em",color:"rgba(255,255,255,0.35)"}}>tourist super app</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              {favs.size>0&&<div onClick={()=>goTab("trip")} style={{position:"relative",width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <Heart size={17} color="#FCA5A5" fill="#FCA5A5"/><div style={{position:"absolute",top:-2,right:-2,width:16,height:16,borderRadius:8,background:T.danger,fontSize:9,fontWeight:800,color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{favs.size}</div>
              </div>}
              <div style={{width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={17} color="rgba(255,255,255,0.6)"/></div>
            </div>
          </div>
          <div style={{marginTop:18,display:"flex",alignItems:"center",gap:10,background:"white",padding:"12px 16px",borderRadius:16}}>
            <Search size={17} color={T.inkMute}/>
            <input placeholder="Find tickets, routes, eSIM, tips..." style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:14,color:T.ink,fontFamily:fi}}/>
            <div style={{display:"flex",alignItems:"center",gap:6,background:T.primary,padding:"8px 12px",borderRadius:12,fontSize:12,fontWeight:700,color:"white",cursor:"pointer"}}><Sparkles size={13}/> Ask</div>
          </div>
        </div>

        {/* ═══ CONTENT ═══ */}
        <div style={{maxHeight:"calc(100vh - 200px)",overflowY:"auto",background:`linear-gradient(180deg,#F8FBFF 0%,${T.bg} 24%)`,padding:"20px 20px 110px"}}>

          {/* ─── HOME ─── */}
          {tab==="home"&&!infoPage&&(<>
            {planStep===4&&(
              <div onClick={()=>goTab("plan")} style={{
                overflow:"hidden",borderRadius:24,marginBottom:24,cursor:"pointer",position:"relative",
                background:`linear-gradient(135deg,${T.dark} 0%,#16233B 100%)`,padding:"20px 20px",color:"white"
              }}>
                <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"18px 18px"}}/>
                <div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:52,height:52,borderRadius:18,background:"rgba(29,78,216,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Sparkles size={22} color={T.gold} strokeWidth={1.5}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.12em",color:T.gold,marginBottom:4}}>Ready for you</div>
                    <div style={{fontSize:16,fontWeight:700}}>Your {planDays}-day itinerary</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:3}}>{planSel.size} places · {planTempo} pace · Tap to view</div>
                  </div>
                  <ChevronRight size={20} color="rgba(255,255,255,0.3)"/>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div style={{marginBottom:28}}>
              <Lbl>Quick access</Lbl><Hd>Everything you need</Hd>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                {[
                  {Icon:Sparkles,l:"Smart Plan",tone:T.primarySoft,ic:T.primary,tap:()=>goTab("plan")},
                  {Icon:Ticket,l:"Tickets",tone:"#FCE7F3",ic:"#BE185D",tap:()=>goTab("book")},
                  {Icon:Train,l:"Transport",tone:T.okSoft,ic:T.ok,tap:()=>setTransOpen(true)},
                  {Icon:Navigation,l:"Explore",tone:T.warnSoft,ic:T.warn,tap:()=>goTab("explore")},
                  {Icon:Smartphone,l:"eSIM",tone:"#EDE9FE",ic:"#6D28D9",tap:()=>setInfoPage("esim")},
                  {Icon:Package,l:"My Trip",tone:T.goldSoft,ic:T.gold,tap:()=>goTab("trip")},
                ].map(q=>(
                  <div key={q.l} onClick={q.tap} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,borderRadius:22,background:"white",padding:"16px 8px",border:`1px solid ${T.line}`,cursor:"pointer"}}>
                    <div style={{width:48,height:48,borderRadius:16,background:q.tone,display:"flex",alignItems:"center",justifyContent:"center"}}><q.Icon size={21} color={q.ic} strokeWidth={1.75}/></div>
                    <span style={{fontSize:11,fontWeight:600,color:T.inkSoft}}>{q.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Welcome Card */}
            <div style={{overflow:"hidden",borderRadius:28,background:`linear-gradient(135deg,${T.primary},${T.dark})`,padding:20,color:"white",marginBottom:28,boxShadow:"0 12px 32px rgba(29,78,216,0.2)"}}>
              <div style={{display:"flex",gap:8,marginBottom:8}}><Pill tone="rgba(255,255,255,0.14)" color="#DBEAFE">Best value</Pill><Pill tone="rgba(16,185,129,0.16)" color="#A7F3D0">Save 60%</Pill></div>
              <div style={{fontSize:24,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>Istanbul Welcome Card</div>
              <p style={{marginTop:8,fontSize:13,lineHeight:1.6,color:"rgba(255,255,255,0.65)",maxWidth:280}}>Bundle attractions, skip lines, audio guides, and transport in one flow.</p>
              <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginTop:20}}>
                <div><div style={{fontSize:12,color:"rgba(255,255,255,0.45)"}}>From</div><div style={{fontSize:30,fontWeight:800}}>€65</div></div>
                <a href="https://istanbulwelcomecard.com" target="_blank" rel="noopener noreferrer" style={{background:"white",padding:"12px 16px",borderRadius:16,fontSize:13,fontWeight:700,color:T.ink,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>Compare <ExternalLink size={13}/></a>
              </div>
            </div>

            {/* Popular Tickets */}
            <div style={{marginBottom:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
                <div><Lbl>Popular now</Lbl><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>Top Tickets</div></div>
                <span onClick={()=>goTab("book")} style={{fontSize:12,fontWeight:600,color:T.primary,cursor:"pointer"}}>See all →</span>
              </div>
              <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginRight:-20}}>
                {ATT.slice(0,5).map(a=>(
                  <div key={a.id} style={{minWidth:228,overflow:"hidden",borderRadius:24,border:`1px solid ${T.line}`,background:"white",flexShrink:0}}>
                    <div style={{position:"relative",height:148,overflow:"hidden"}}>
                      <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.6),transparent 60%)"}}/>
                      <div style={{position:"absolute",left:12,top:12}}><Pill tone="rgba(255,255,255,0.92)" color={T.dark}>{a.badge}</Pill></div>
                      <div style={{position:"absolute",bottom:12,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                        <div><div style={{fontSize:15,fontWeight:700,color:"white"}}>{a.title}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:2}}>{a.cat}</div></div>
                        <div style={{background:"rgba(255,255,255,0.9)",padding:"4px 10px",borderRadius:99,fontSize:11,fontWeight:600}}>{a.rating} ★</div>
                      </div>
                      <div onClick={()=>toggleFav(a.id)} style={{position:"absolute",top:12,right:12,width:32,height:32,borderRadius:12,background:favs.has(a.id)?"rgba(225,29,72,0.9)":"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                        <Heart size={16} color="white" fill={favs.has(a.id)?"white":"none"}/>
                      </div>
                    </div>
                    <div style={{padding:16}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.inkMute,marginBottom:12}}>
                        <span style={{display:"flex",alignItems:"center",gap:4}}><Clk size={13}/> {a.dur}</span>
                        {a.skip&&<span style={{color:T.ok,fontWeight:500}}>Skip line</span>}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div><div style={{fontSize:12,color:T.inkMute}}>From</div><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em"}}>€{a.price}</div></div>
                        <a href={a.link} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,height:44,padding:"0 16px",borderRadius:16,background:T.primary,color:"white",fontSize:13,fontWeight:700,textDecoration:"none"}}>Book <ExternalLink size={13}/></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences Row */}
            <div style={{marginBottom:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
                <div><Lbl>Don't miss</Lbl><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>Experiences</div></div>
                <span onClick={()=>goTab("book")} style={{fontSize:12,fontWeight:600,color:T.primary,cursor:"pointer"}}>See all →</span>
              </div>
              <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginRight:-20}}>
                {ATT.filter(a=>["Experience","Day Trip","Culture"].includes(a.cat)).map(a=>(
                  <div key={a.id} style={{minWidth:228,overflow:"hidden",borderRadius:24,border:`1px solid ${T.line}`,background:"white",flexShrink:0}}>
                    <div style={{position:"relative",height:148,overflow:"hidden"}}>
                      <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.6),transparent 60%)"}}/>
                      <div style={{position:"absolute",left:12,top:12}}><Pill tone="rgba(255,255,255,0.92)" color={T.dark}>{a.badge}</Pill></div>
                      <div style={{position:"absolute",bottom:12,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                        <div><div style={{fontSize:15,fontWeight:700,color:"white"}}>{a.title}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:2}}>{a.cat}</div></div>
                        <div style={{background:"rgba(255,255,255,0.9)",padding:"4px 10px",borderRadius:99,fontSize:11,fontWeight:600}}>{a.rating} ★</div>
                      </div>
                      <div onClick={()=>toggleFav(a.id)} style={{position:"absolute",top:12,right:12,width:32,height:32,borderRadius:12,background:favs.has(a.id)?"rgba(225,29,72,0.9)":"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                        <Heart size={16} color="white" fill={favs.has(a.id)?"white":"none"}/>
                      </div>
                    </div>
                    <div style={{padding:16}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.inkMute,marginBottom:12}}>
                        <span style={{display:"flex",alignItems:"center",gap:4}}><Clk size={13}/> {a.dur}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div><div style={{fontSize:12,color:T.inkMute}}>From</div><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em"}}>€{a.price}</div></div>
                        <a href={a.link} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,height:44,padding:"0 16px",borderRadius:16,background:T.primary,color:"white",fontSize:13,fontWeight:700,textDecoration:"none"}}>Book <ExternalLink size={13}/></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-sell: eSIM */}
            <div style={{borderRadius:20,background:T.dark,padding:"16px 18px",marginBottom:28,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={()=>setInfoPage("esim")}>
              <div style={{width:44,height:44,borderRadius:14,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}><Wifi size={20} color="#A78BFA"/></div>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:"white"}}>Stay connected</div><div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:2}}>Get your eSIM before you land — from €4.99</div></div>
              <ChevronRight size={16} color="rgba(255,255,255,0.3)"/>
            </div>

            {/* Info Cards */}
            <Lbl>Your local friend</Lbl><Hd>Know before you go</Hd>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {k:"airport",Icon:Plane,t:"Airport Guide",d:"Transfers, routes, tips"},
                {k:"money",Icon:Wallet,t:"Money & Tips",d:"Currency, ATMs, haggling"},
                {k:"phrases",Icon:Languages,t:"Turkish Phrases",d:"Tap to copy essentials"},
                {k:"safety",Icon:ShieldCheck,t:"Safety Guide",d:"Scams & street smarts"},
                {k:"esim",Icon:Smartphone,t:"eSIM Setup",d:"Install before landing"},
                {k:"live",Icon:Globe,t:"Live Info",d:"Weather, closures, ferries"},
              ].map(c=>(
                <div key={c.k} onClick={()=>setInfoPage(c.k)} style={{borderRadius:22,border:`1px solid ${T.line}`,background:"white",padding:16,cursor:"pointer"}}>
                  <div style={{width:44,height:44,borderRadius:16,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><c.Icon size={20} color={T.ink} strokeWidth={1.7}/></div>
                  <div style={{fontSize:14,fontWeight:700}}>{c.t}</div>
                  <div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{c.d}</div>
                  <div style={{marginTop:8,fontSize:12,fontWeight:600,color:T.primary,display:"flex",alignItems:"center",gap:4}}>Open <ChevronRight size={12}/></div>
                </div>
              ))}
            </div>
          </>)}

          {/* ─── INFO SUB-PAGES ─── */}
          {tab==="home"&&infoPage==="airport"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Airport to Hotel</div></div></div>
            <div style={{fontSize:13,color:T.inkSoft,marginBottom:20}}>Choose the best way to reach your hotel</div>
            {[
              {Icon:Car,t:"Private Transfer",d:"Door-to-door, meet at arrivals",p:"€35-45",b:"Fastest",tone:T.primarySoft,ac:T.primary},
              {Icon:Bus,t:"Havaist Bus",d:"Every 30min, IST ↔ Taksim",p:"€12",b:"Best value",tone:T.okSoft,ac:T.ok},
              {Icon:Train,t:"Metro M11",d:"IST → Gayrettepe, connect tram",p:"~€1",b:"Cheapest",tone:T.warnSoft,ac:T.warn},
            ].map(o=>(
              <div key={o.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:52,height:52,borderRadius:16,background:o.tone,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><o.Icon size={22} color={o.ac}/></div>
                <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:15,fontWeight:700}}>{o.t}</span><span style={{fontSize:9,fontWeight:600,background:o.tone,color:o.ac,padding:"2px 7px",borderRadius:6}}>{o.b}</span></div><div style={{fontSize:12,color:T.inkMute}}>{o.d}</div></div>
                <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:18,fontWeight:800}}>{o.p}</div><div style={{fontSize:10,color:T.primary,fontWeight:600,marginTop:4,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>Book <ExternalLink size={10}/></div></div>
              </div>
            ))}
            <div style={{borderRadius:16,background:T.warnSoft,padding:14,marginTop:8}}>
              <div style={{fontSize:13,fontWeight:700,color:T.warn,marginBottom:6}}>💡 Pro Tips</div>
              {["Download İstanbulkart app before landing","Only exchange €20-30 at airport","Get eSIM at arrivals or pre-install","Night arrivals: private transfer safest"].map((tip,i)=>(
                <div key={i} style={{fontSize:12,color:T.inkSoft,padding:"4px 0",display:"flex",gap:6}}><span style={{color:T.warn}}>→</span>{tip}</div>
              ))}
            </div>
          </div>)}

          {tab==="home"&&infoPage==="phrases"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Turkish Phrases</div></div></div>
            <div style={{fontSize:13,color:T.inkSoft,marginBottom:20}}>Tap any phrase to copy</div>
            {[{title:"Essentials",phrases:[{en:"Hello",tr:"Merhaba",pr:"mer-HA-ba"},{en:"Thank you",tr:"Teşekkürler",pr:"teh-shek-KOOR-ler"},{en:"Yes / No",tr:"Evet / Hayır",pr:"eh-VET / ha-YIR"},{en:"Please",tr:"Lütfen",pr:"LOOT-fen"},{en:"How much?",tr:"Ne kadar?",pr:"neh ka-DAR"},{en:"The check",tr:"Hesap lütfen",pr:"heh-SAP loot-FEN"}]},
              {title:"Getting Around",phrases:[{en:"Where is...?",tr:"Nerede?",pr:"neh-REH-deh"},{en:"Right / Left",tr:"Sağ / Sol",pr:"sah / sol"},{en:"Go straight",tr:"Düz gidin",pr:"dooz gee-DIN"},{en:"Water",tr:"Su",pr:"soo"},{en:"Tea",tr:"Çay",pr:"chai"},{en:"Delicious!",tr:"Çok güzel!",pr:"chok goo-ZEL"}]}
            ].map(g=>(
              <div key={g.title} style={{marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>{g.title}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {g.phrases.map((p,i)=>{const id=g.title+i;const cp=copied===id;return(
                    <div key={i} onClick={()=>doCopy(p.tr,id)} style={{borderRadius:16,background:cp?T.okSoft:"white",border:`1px solid ${cp?T.ok+"40":T.line}`,padding:"12px 14px",cursor:"pointer",transition:"all 0.2s"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:T.inkMute}}>{p.en}</span>{cp?<Check size={12} color={T.ok}/>:<Copy size={12} color={T.inkMute}/>}</div>
                      <div style={{fontSize:16,fontWeight:700}}>{p.tr}</div>
                      <div style={{fontSize:10,color:T.inkMute,marginTop:2,fontStyle:"italic"}}>{p.pr}</div>
                    </div>
                  )})}
                </div>
              </div>
            ))}
            <div style={{borderRadius:14,background:T.dangerSoft,padding:12}}>
              <div style={{fontSize:12,fontWeight:700,color:T.danger,marginBottom:6}}>🚨 Emergency: 112</div>
              <div style={{display:"flex",gap:6}}>{[{en:"Help!",tr:"Yardım!"},{en:"Police",tr:"Polis"},{en:"Hospital",tr:"Hastane"}].map((p,i)=>(
                <div key={i} onClick={()=>doCopy(p.tr,"em"+i)} style={{background:"white",borderRadius:10,padding:"6px 12px",cursor:"pointer",border:`1px solid ${T.danger}30`}}>
                  <div style={{fontSize:10,color:T.danger}}>{p.en}</div><div style={{fontSize:13,fontWeight:700}}>{p.tr}</div>
                </div>
              ))}</div>
            </div>
          </div>)}

          {tab==="home"&&infoPage==="safety"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Safety & Scams</div></div></div>
            <Lbl>Watch out for</Lbl>
            {[{t:"Shoe-shine trick",d:"They drop brush near you, charge €20",a:"Ignore & walk away"},{t:"Friendly bar invite",d:"Stranger invites to bar, €500 bill",a:"Never follow strangers"},{t:"Taxi meter off",d:"Driver doesn't start meter",a:"Use BiTaksi app"}].map(s=>(
              <div key={s.t} style={{borderRadius:18,background:T.dangerSoft,padding:16,marginBottom:10,borderLeft:`4px solid ${T.danger}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><AlertTriangle size={14} color={T.danger}/><span style={{fontSize:14,fontWeight:700}}>{s.t}</span></div>
                <div style={{fontSize:12,color:T.inkSoft,marginBottom:8}}>{s.d}</div>
                <div style={{fontSize:12,fontWeight:600,color:T.ok,display:"flex",alignItems:"center",gap:4}}><CheckCircle size={12}/>{s.a}</div>
              </div>
            ))}
            <div style={{marginTop:16}}><Lbl>Stay safe</Lbl>
              <div style={{borderRadius:18,background:T.okSoft,padding:16}}>
                {["Use BiTaksi app for taxis","Keep valuables in hotel safe","ATMs inside bank branches only","Agree on price before any service","Tourist Police: +90 212 527 4503"].map((tip,i)=>(
                  <div key={i} style={{display:"flex",gap:8,padding:"6px 0",fontSize:13,alignItems:"flex-start"}}><CheckCircle size={14} color={T.ok} style={{marginTop:2,flexShrink:0}}/>{tip}</div>
                ))}
              </div>
            </div>
          </div>)}

          {tab==="home"&&infoPage==="live"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>setInfoPage(null)}/><div><Lbl>Live</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>City Info</div></div></div>
            <div style={{borderRadius:20,background:`linear-gradient(135deg,${T.dark},${T.primary})`,padding:20,color:"white",marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Istanbul today</div><div style={{fontSize:42,fontWeight:800,marginTop:4}}>22°C</div><div style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>Partly cloudy</div></div><Sun size={48} color="rgba(255,255,255,0.25)"/></div>
              <div style={{display:"flex",gap:10,marginTop:16}}>{[{l:"High",v:"25°"},{l:"Low",v:"16°"},{l:"Rain",v:"10%"},{l:"Wind",v:"12km/h"}].map(w=><div key={w.l} style={{flex:1,background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 6px",textAlign:"center"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{w.l}</div><div style={{fontSize:14,fontWeight:700,marginTop:2}}>{w.v}</div></div>)}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[{Icon:Anchor,t:"Ferries",s:"All running",ok:true},{Icon:Clk,t:"Next prayer",s:"Dhuhr 13:15",ok:true},{Icon:Wifi,t:"WiFi",s:"IST-FREE on",ok:true},{Icon:AlertTriangle,t:"Closures",s:"Topkapi Tue",ok:false}].map(w=>(
                <div key={w.t} style={{borderRadius:16,background:"white",border:`1px solid ${T.line}`,padding:14}}>
                  <w.Icon size={18} color={T.inkSoft} style={{marginBottom:8}}/><div style={{fontSize:13,fontWeight:700}}>{w.t}</div>
                  <div style={{fontSize:11,color:w.ok?T.ok:T.warn,fontWeight:600,marginTop:4,display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:3,background:w.ok?T.ok:T.warn}}/>{w.s}</div>
                </div>
              ))}
            </div>
          </div>)}

          {tab==="home"&&(infoPage==="money"||infoPage==="esim")&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{infoPage==="money"?"Money & Payments":"eSIM Setup"}</div></div></div>
            {infoPage==="money"?[
              {Icon:Wallet,t:"Currency",d:"Turkish Lira (₺). €1 ≈ ₺38-40. Check xe.com before your trip."},
              {Icon:CreditCard,t:"Cards vs Cash",d:"Visa/MC accepted in tourist areas. Bazaar & street food: cash only. Carry ₺200-300."},
              {Icon:Landmark,t:"ATMs",d:"Use bank ATMs inside branches (Ziraat, Garanti). Withdraw in TRY, not EUR."},
              {Icon:Coffee,t:"Tipping",d:"Restaurants: 10-15%. Taxi: round up. Hamam: 15-20%. Hotel: ₺20-50/day."},
              {Icon:Star,t:"Bazaar Haggling",d:"Start at 40% of asking. Walk away — they call back. Cash = better deals."},
            ].map(c=>(
              <div key={c.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",gap:14}}>
                <div style={{width:44,height:44,borderRadius:14,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><c.Icon size={20} color={T.ink} strokeWidth={1.5}/></div>
                <div><div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{c.t}</div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.55}}>{c.d}</div></div>
              </div>
            )):[
              {t:"Holafly",d:"Unlimited data, instant setup",p:"€5.90 / 7 days",b:"Most popular",tone:T.okSoft,ac:T.ok},
              {t:"Airalo",d:"Pay per GB, flexible plans",p:"€4.50 / 1GB",b:"Budget pick",tone:T.primarySoft,ac:T.primary},
              {t:"eSIM Turkey",d:"Local support, easy activation",p:"€4.99 / 5GB",b:"Local",tone:T.warnSoft,ac:T.warn},
            ].map(e=>(
              <div key={e.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:48,height:48,borderRadius:16,background:e.tone,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Smartphone size={20} color={e.ac}/></div>
                <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:15,fontWeight:700}}>{e.t}</span><Pill tone={e.tone} color={e.ac}>{e.b}</Pill></div><div style={{fontSize:12,color:T.inkMute}}>{e.d}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:800}}>{e.p}</div><div style={{fontSize:10,color:T.primary,fontWeight:600,marginTop:4,cursor:"pointer"}}>Get →</div></div>
              </div>
            ))}
          </div>)}

          {/* ─── PLAN ─── */}
          {tab==="plan"&&(<div>
            {planStep>=1&&planStep<=3&&<div style={{display:"flex",gap:6,marginBottom:24}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=planStep?T.primary:T.line}}/>)}</div>}

            {planStep===0&&(<div>
              <div style={{overflow:"hidden",borderRadius:28,background:`linear-gradient(135deg,${T.dark} 0%,#16233B 100%)`,padding:"40px 24px",color:"white",textAlign:"center",marginBottom:20,position:"relative"}}>
                <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"18px 18px"}}/>
                <div style={{position:"relative"}}>
                  <Sparkles size={40} color={T.gold} strokeWidth={1.2} style={{margin:"0 auto 16px"}}/>
                  <div style={{fontFamily:fd,fontSize:26,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8}}>Plan Your Perfect Trip</div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.6,maxWidth:280,margin:"0 auto"}}>Answer 3 quick questions and we'll build a personalized itinerary just for you.</div>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
                {[{e:"📅",t:"Choose your dates",d:"How many days will you stay?"},{e:"🏛️",t:"Pick your interests",d:"Museums, food, shopping, culture..."},{e:"⚡",t:"Set your pace",d:"Relaxed explorer or packed schedule?"}].map((s,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:14,borderRadius:18,background:"white",border:`1px solid ${T.line}`,padding:"14px 16px"}}>
                    <div style={{fontSize:24,width:40,textAlign:"center"}}>{s.e}</div>
                    <div><div style={{fontSize:14,fontWeight:600}}>{s.t}</div><div style={{fontSize:12,color:T.inkMute,marginTop:2}}>{s.d}</div></div>
                  </div>
                ))}
              </div>
              <div onClick={()=>setPlanStep(1)} style={{background:T.primary,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 8px 24px rgba(29,78,216,0.25)"}}>
                <Sparkles size={16}/> Start Planning
              </div>
              <div style={{textAlign:"center",marginTop:12,fontSize:12,color:T.inkMute}}>Takes about 30 seconds</div>
            </div>)}

            {planStep===1&&(<div>
              <div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/> Back</div>
              <div style={{textAlign:"center",marginBottom:8}}><div style={{fontSize:48,marginBottom:4}}>📅</div></div>
              <Lbl>Step 1 of 3</Lbl>
              <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>How many days in Istanbul?</div>
              <div style={{fontSize:13,color:T.inkSoft,marginBottom:28}}>We'll fit the right amount of activities into each day.</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:32}}>
                {[1,2,3,4,5,7].map(d=>(
                  <div key={d} onClick={()=>setPlanDays(d)} style={{
                    width:56,height:56,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:18,fontWeight:700,cursor:"pointer",
                    background:planDays===d?T.dark:"white",color:planDays===d?T.gold:T.ink,
                    boxShadow:planDays===d?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`
                  }}>{d}</div>
                ))}
              </div>
              <div onClick={()=>setPlanStep(2)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}}>Continue</div>
            </div>)}

            {planStep===2&&(<div>
              <div onClick={()=>setPlanStep(1)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/> Back</div>
              <Lbl>Step 2 of 3</Lbl>
              <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>What do you want to see?</div>
              <div style={{fontSize:13,color:T.inkSoft,marginBottom:24}}>Tap everything that excites you.</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
                {ATT.map(a=>{const on=planSel.has(a.id);return(
                  <div key={a.id} onClick={()=>toggleSel(a.id)} style={{
                    padding:"10px 16px",borderRadius:24,fontSize:13,fontWeight:500,cursor:"pointer",
                    display:"flex",alignItems:"center",gap:6,
                    background:on?T.dark:"white",color:on?"white":T.ink,
                    boxShadow:on?"0 4px 14px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`
                  }}>{a.title} {on&&<Check size={12}/>}</div>
                )})}
              </div>
              <div style={{textAlign:"center",fontSize:13,color:T.inkMute,marginBottom:16}}>{planSel.size} selected</div>
              <div onClick={()=>planSel.size>0&&setPlanStep(3)} style={{background:planSel.size>0?T.primary:T.line,color:planSel.size>0?"white":T.inkMute,padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:planSel.size>0?"pointer":"default",textAlign:"center"}}>Continue</div>
            </div>)}

            {planStep===3&&(<div>
              <div onClick={()=>setPlanStep(2)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/> Back</div>
              <Lbl>Step 3 of 3</Lbl>
              <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>What's your pace?</div>
              <div style={{fontSize:13,color:T.inkSoft,marginBottom:24}}>Relaxed and deep or fast and packed?</div>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
                {[{id:"relaxed",l:"Relaxed",d:"2-3 stops per day, lots of free time",e:"🧘"},{id:"balanced",l:"Balanced",d:"4-5 stops, the sweet spot",e:"⚖️"},{id:"packed",l:"Packed",d:"6+ stops, see everything",e:"🚀"}].map(p=>(
                  <div key={p.id} onClick={()=>setPlanTempo(p.id)} style={{
                    borderRadius:18,padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,
                    background:planTempo===p.id?T.dark:"white",color:planTempo===p.id?"white":T.ink,
                    boxShadow:planTempo===p.id?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`
                  }}>
                    <div style={{fontSize:24}}>{p.e}</div>
                    <div><div style={{fontSize:15,fontWeight:600}}>{p.l}</div><div style={{fontSize:12,opacity:0.6,marginTop:2}}>{p.d}</div></div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",fontSize:13,color:T.inkMute,marginBottom:16}}>{planSel.size} places · {planDays} days · {planTempo}</div>
              <div onClick={()=>setPlanStep(4)} style={{background:T.dark,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 8px 24px rgba(11,18,32,0.2)"}}>
                <Sparkles size={16}/> Generate My Itinerary
              </div>
            </div>)}

            {planStep===4&&(<>
              <div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/> Start over</div>
              <div style={{borderRadius:16,background:T.primarySoft,padding:"10px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}><Sparkles size={16} color={T.primary}/><span style={{fontSize:13,color:T.inkSoft}}>Optimized for {planTempo} pace · {planDays} days</span></div>
              <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:20}}>{PLAN_DAYS.slice(0,planDays).map(d=><div key={d.day} onClick={()=>setActiveDay(d.day)} style={{minWidth:112,borderRadius:20,padding:"12px 16px",cursor:"pointer",background:activeDay===d.day?T.dark:"white",color:activeDay===d.day?"white":T.ink,border:activeDay===d.day?"none":`1px solid ${T.line}`}}><div style={{fontSize:13,fontWeight:700}}>Day {d.day}</div><div style={{fontSize:11,opacity:0.7,marginTop:4}}>{d.title}</div></div>)}</div>
              {activePlan&&<div style={{borderRadius:28,border:`1px solid ${T.line}`,background:"white",padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div style={{fontSize:20,fontWeight:800,fontFamily:fd}}>{activePlan.title}</div><Pill tone={T.okSoft} color={T.ok}>Optimized</Pill></div>
                {activePlan.items.map((s,i)=><div key={i} style={{display:"flex",gap:12}}>
                  <div style={{width:52,paddingTop:12,textAlign:"right",fontSize:12,fontWeight:600,color:T.inkMute}}>{s.t}</div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:16}}><div style={{width:12,height:12,borderRadius:6,marginTop:16,background:dotC[s.tp]||T.inkMute}}/>{i<activePlan.items.length-1&&<div style={{width:1,flex:1,background:T.line,marginTop:8}}/>}</div>
                  <div style={{flex:1,marginBottom:12,borderRadius:20,border:`1px solid ${T.line}`,background:"#F8FAFC",padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:14,fontWeight:700}}>{s.n}</div>
                      {s.id&&ATT.find(a=>a.id===s.id)&&<a href={ATT.find(a=>a.id===s.id).link} target="_blank" rel="noopener noreferrer" style={{fontSize:11,fontWeight:600,color:T.primary,display:"flex",alignItems:"center",gap:3,textDecoration:"none"}}>Book<ExternalLink size={10}/></a>}
                    </div>
                    <div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{s.m}</div>
                  </div>
                </div>)}
                <div style={{borderRadius:16,background:T.goldSoft,padding:14,marginTop:8,display:"flex",alignItems:"center",gap:12}}>
                  <Zap size={18} color={T.gold}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>Save with Welcome Card</div><div style={{fontSize:11,color:T.inkMute,marginTop:2}}>This day includes 3 paid sites — card saves ~40%</div></div>
                  <a href="https://istanbulwelcomecard.com" target="_blank" rel="noopener noreferrer" style={{fontSize:12,fontWeight:700,color:T.primary,textDecoration:"none"}}>Compare</a>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:16}}>
                  <div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,borderRadius:18,border:`1px solid ${T.line}`,padding:"12px 16px",fontSize:13,fontWeight:700,color:T.inkSoft,cursor:"pointer"}}><RotateCcw size={14}/> Rebuild</div>
                  <div onClick={()=>goTab("book")} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,borderRadius:18,background:T.dark,padding:"12px 16px",fontSize:13,fontWeight:700,color:"white",cursor:"pointer"}}><Ticket size={14}/> Book tickets</div>
                </div>
              </div>}
            </>)}
          </div>)}

          {/* ─── BOOK ─── */}
          {tab==="book"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>goTab("home")}/><div><Lbl>Commerce</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Tickets & Passes</div></div></div>
            {/* Welcome Card */}
            <div style={{borderRadius:22,background:`linear-gradient(135deg,${T.primary},${T.dark})`,padding:18,color:"white",marginBottom:20}}>
              <Pill tone="rgba(255,255,255,0.14)" color="#DBEAFE">Best value</Pill>
              <div style={{fontSize:18,fontWeight:800,fontFamily:fd,marginTop:8}}>Istanbul Welcome Card</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:4,marginBottom:12}}>10+ sites · Skip lines · Audio · Transport</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:22,fontWeight:800}}>€65</span><a href="https://istanbulwelcomecard.com" target="_blank" rel="noopener noreferrer" style={{background:"white",padding:"9px 18px",borderRadius:12,fontSize:13,fontWeight:700,color:T.ink,textDecoration:"none"}}>Get card</a></div>
            </div>
            {/* Filter */}
            <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
              {cats.map(c=>(
                <div key={c} onClick={()=>setBookFilter(c)} style={{padding:"7px 14px",borderRadius:99,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",background:bookFilter===c?T.dark:"white",color:bookFilter===c?"white":T.inkSoft,border:bookFilter===c?"none":`1px solid ${T.line}`}}>{c}</div>
              ))}
            </div>
            <Lbl>{bookFilter==="All"?"All tickets":"Filtered"} · {filteredATT.length} results</Lbl>
            {filteredATT.map(a=>(
              <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,borderRadius:22,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:12}}>
                <img src={a.img} alt={a.title} style={{width:64,height:64,borderRadius:16,objectFit:"cover"}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:700}}>{a.title}</div>
                  <div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{a.cat} · {a.dur}{a.skip?" · Skip line":""}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:18,fontWeight:800}}>€{a.price}</div>
                  <div style={{display:"flex",gap:6,marginTop:6}}>
                    <div onClick={()=>toggleFav(a.id)} style={{width:32,height:32,borderRadius:10,background:favs.has(a.id)?T.dangerSoft:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={14} color={favs.has(a.id)?T.danger:T.inkMute} fill={favs.has(a.id)?T.danger:"none"}/></div>
                    <a href={a.link} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:4,padding:"0 12px",borderRadius:10,background:T.primary,color:"white",fontSize:12,fontWeight:700,textDecoration:"none"}}>Book <ExternalLink size={11}/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>)}

          {/* ─── EXPLORE ─── */}
          {tab==="explore"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>goTab("home")}/><div><Lbl>Navigation</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Explore & Move</div></div></div>
            <div style={{overflow:"hidden",borderRadius:28,background:`linear-gradient(135deg,${T.dark},#1E293B)`,padding:16,color:"white",marginBottom:20}}>
              <div style={{display:"flex",height:180,alignItems:"center",justifyContent:"center",borderRadius:22,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)"}}>
                <div style={{textAlign:"center"}}><Route size={34} color="rgba(255,255,255,0.5)"/><div style={{marginTop:12,fontSize:15,fontWeight:700}}>Live map</div><div style={{marginTop:4,fontSize:12,color:"rgba(255,255,255,0.4)"}}>Museums, food, ATMs, trams</div></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:16}}>
                <div style={{borderRadius:16,background:"white",padding:"12px 16px",textAlign:"center",fontSize:13,fontWeight:700,color:T.ink,cursor:"pointer"}}>Open map</div>
                <div onClick={()=>setTransOpen(true)} style={{borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.1)",padding:"12px 16px",textAlign:"center",fontSize:13,fontWeight:700,cursor:"pointer"}}>Transport</div>
              </div>
            </div>
            <Lbl>Nearby</Lbl>
            {[{Icon:Landmark,n:"Hagia Sophia",d:"5 min walk"},{Icon:UtensilsCrossed,n:"Matbah Restaurant",d:"2 min walk"},{Icon:CreditCard,n:"ATM nearby",d:"120m"},{Icon:Headphones,n:"Audio guide point",d:"At entrance"}].map(p=>(
              <div key={p.n} style={{display:"flex",alignItems:"center",gap:12,borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12}}>
                <div style={{width:44,height:44,borderRadius:16,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center"}}><p.Icon size={19} color={T.ink}/></div>
                <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{p.n}</div><div style={{fontSize:12,color:T.inkMute,marginTop:2}}>{p.d}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:4,background:T.dark,color:"white",padding:"8px 12px",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer"}}><Navigation size={13}/> Go</div>
              </div>
            ))}
          </div>)}

          {/* ─── TRIP WALLET ─── */}
          {tab==="trip"&&(<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Back onClick={()=>goTab("home")}/><div><Lbl>Your trip</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Trip Wallet</div></div></div>
            <Lbl>Saved places</Lbl>
            {favs.size===0?<div style={{textAlign:"center",padding:"40px 20px",background:"white",borderRadius:22,border:`1px solid ${T.line}`}}><Heart size={32} color={T.line}/><div style={{fontSize:14,fontWeight:600,marginTop:12}}>No saved places yet</div><div style={{fontSize:12,color:T.inkMute,marginTop:4}}>Tap ♥ on any attraction to save it here</div></div>
            :<div style={{marginBottom:20}}>{ATT.filter(a=>favs.has(a.id)).map(a=>(
              <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:10}}>
                <img src={a.img} alt={a.title} style={{width:52,height:52,borderRadius:14,objectFit:"cover"}}/>
                <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{a.title}</div><div style={{fontSize:12,color:T.inkMute,marginTop:2}}>{a.cat} · €{a.price}</div></div>
                <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:4,padding:"8px 14px",borderRadius:12,background:T.primary,color:"white",fontSize:12,fontWeight:700,textDecoration:"none"}}>Book<ExternalLink size={11}/></a>
                  <div onClick={()=>toggleFav(a.id)} style={{fontSize:11,color:T.danger,fontWeight:600,cursor:"pointer"}}>Remove</div>
                </div>
              </div>
            ))}</div>}
            <Lbl>Quick access</Lbl>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[{Icon:QrCode,t:"My Tickets",d:"QR codes & passes"},{Icon:Route,t:"Today's Route",d:"Navigate your plan"},{Icon:Plane,t:"Airport Transfer",d:"Book or check status"},{Icon:MessageCircle,t:"Need Help?",d:"24/7 support"}].map(c=>(
                <div key={c.t} style={{borderRadius:18,background:"white",border:`1px solid ${T.line}`,padding:16,cursor:"pointer"}}>
                  <c.Icon size={20} color={T.ink} strokeWidth={1.5} style={{marginBottom:10}}/>
                  <div style={{fontSize:14,fontWeight:700}}>{c.t}</div>
                  <div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>)}

        </div>

        {/* ═══ BOTTOM NAV ═══ */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,borderTop:`1px solid ${T.line}`,background:"rgba(255,255,255,0.95)",padding:"8px 12px 24px",backdropFilter:"blur(12px)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:2}}>
            {[
              {id:"home",Icon:Compass,l:"Home"},{id:"plan",Icon:Sparkles,l:"Plan"},{id:"book",Icon:Ticket,l:"Book"},
              {id:"explore",Icon:MapPin,l:"Explore"},{id:"trip",Icon:Package,l:"Trip"},
            ].map(n=>{const on=tab===n.id;return(
              <div key={n.id} onClick={()=>goTab(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:16,padding:"8px 4px 6px",cursor:"pointer",background:on?T.primarySoft:"transparent"}}>
                <n.Icon size={19} color={on?T.primary:T.inkSoft} strokeWidth={on?2:1.75}/>
                <span style={{marginTop:3,fontSize:10,fontWeight:600,color:on?T.primary:T.inkSoft}}>{n.l}</span>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* ═══ TRANSPORT SHEET ═══ */}
      {transOpen&&<div style={{position:"fixed",inset:0,zIndex:200}}>
        <div onClick={()=>setTransOpen(false)} style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.45)",backdropFilter:"blur(4px)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,maxWidth:440,margin:"0 auto",borderRadius:"30px 30px 0 0",background:"white",padding:"12px 20px 32px"}}>
          <div style={{width:48,height:6,borderRadius:3,background:T.line,margin:"0 auto 20px"}}/>
          <Lbl>Move smarter</Lbl>
          <div style={{fontSize:24,fontWeight:800,fontFamily:fd,marginBottom:4}}>Transport</div>
          <p style={{fontSize:13,color:T.inkMute,lineHeight:1.6,marginBottom:20}}>Buy once, scan instantly.</p>
          {TRANS.map(tr=>(
            <div key={tr.title} style={{borderRadius:22,border:`1px solid ${T.line}`,background:"#F8FAFC",padding:16,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:48,height:48,borderRadius:16,background:tr.tone,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><tr.icon size={20} color={tr.ac}/></div>
                <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:14,fontWeight:700}}>{tr.title}</span><Pill tone={tr.tone} color={tr.ac}>{tr.badge}</Pill></div><div style={{fontSize:12,color:T.inkMute}}>{tr.desc}</div></div>
                <div style={{borderRadius:16,background:T.dark,padding:"10px 16px",fontSize:13,fontWeight:700,color:"white",cursor:"pointer",whiteSpace:"nowrap"}}>{tr.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
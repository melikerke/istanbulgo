import { useState, useEffect } from "react";
import {
  Sparkles, Ticket, Search, User, ChevronRight, Clock as Clk, MapPin, Plus, Check,
  Plane, Smartphone, UtensilsCrossed, Heart, ArrowLeft, RotateCcw, CreditCard, Ship,
  QrCode, Navigation, Landmark, ShieldCheck, Globe, Route, Headphones, Star, Wallet,
  Train, Languages, Compass, Info, ExternalLink, Zap, Bus, Car, Copy, AlertTriangle,
  CheckCircle, Sun, Anchor, Wifi, Coffee, Package, MessageCircle, X, Eye, Umbrella,
  CloudRain, Baby, Utensils
} from "lucide-react";
import AttractionSheet from './AttractionSheet';
import MiniPreview from './MiniPreview';
import AccountSheet from './AccountSheet';
import PremiumSheet from './PremiumSheet';
import { useLanguage, LANGUAGES } from './LanguageContext';
import BookingOverlay from './BookingOverlay';
import EsimSheet from './EsimSheet';
import TransportSheet from './TransportSheet';

const T={bg:"#F5F7FB",surface:"#FFFFFF",ink:"#0F172A",inkSoft:"#475569",inkMute:"#94A3B8",line:"#E2E8F0",primary:"#1D4ED8",primarySoft:"#DBEAFE",gold:"#C59D5F",goldSoft:"#FBF5EB",ok:"#059669",okSoft:"#D1FAE5",warn:"#D97706",warnSoft:"#FEF3C7",danger:"#E11D48",dangerSoft:"#FFE4E6",dark:"#0B1220",sh:{hero:"0 20px 50px rgba(15,23,42,0.16)"}};
const fd="'Plus Jakarta Sans',system-ui,sans-serif";
const fi="'Inter',system-ui,sans-serif";

const ATT=[
  {id:"hagia",title:"Hagia Sophia",cat:"Landmark",price:25,dur:"1.5h",rating:4.9,img:"/hagia.jpg",badge:"Most booked",skip:true,link:"https://gyg.me/9TxDoMwH",area:"Sultanahmet",hook:"Must-see landmark",teaser:"A place where two empires collide — and you feel it instantly."},
  {id:"basilica",title:"Basilica Cistern",cat:"Museum",price:20,dur:"1h",rating:4.8,img:"/basilica.jpg",badge:"Fast entry",skip:true,link:"https://gyg.me/HyHBAHab",area:"Sultanahmet",hook:"Unreal atmosphere",teaser:"Dark, mysterious, and surprisingly beautiful."},
  {id:"topkapi",title:"Topkapi Palace",cat:"Palace",price:30,dur:"2.5h",rating:4.9,img:"/topkapi.jpg",badge:"High value",skip:true,link:"https://gyg.me/zHWCA6tY",area:"Sultanahmet",hook:"Historic must-visit",teaser:"Not just a palace — a whole world behind the gates."},
  {id:"cruise",title:"Bosphorus Cruise",cat:"Experience",price:18,dur:"2h",rating:4.7,img:"/cruise.jpg",badge:"Sunset pick",skip:false,link:"https://gyg.me/Ou6l1R0E",area:"Eminönü",hook:"See two continents",teaser:"Palaces, bridges, and skyline — all in one ride."},
  {id:"hammam",title:"Turkish Bath",cat:"Wellness",price:45,dur:"1.5h",rating:4.8,img:"/hammam.jpg",badge:"Authentic",skip:false,link:"https://gyg.me/wdfMolAo",area:"Various",hook:"Authentic ritual",teaser:"Steam, marble, and a reset you didn't know you needed."},
  {id:"galata",title:"Galata Tower",cat:"Viewpoint",price:15,dur:"45min",rating:4.6,img:"/galata.jpg",badge:"360° view",skip:true,link:"https://gyg.me/NCnQgklA",area:"Beyoğlu",hook:"Best city views",teaser:"360° Istanbul in one shot."},
  {id:"dolma",title:"Dolmabahçe Palace",cat:"Palace",price:28,dur:"2h",rating:4.7,img:"/dolma.jpg",badge:"Crystal stairs",skip:true,link:"https://gyg.me/FhcexQTY",area:"Beşiktaş",hook:"Luxury palace experience",teaser:"European luxury in the heart of the city."},
  {id:"dervish",title:"Whirling Dervish",cat:"Culture",price:22,dur:"1h",rating:4.9,img:"/dervish.jpg",badge:"Unique",skip:false,link:"https://gyg.me/MZyCEeij",area:"Various",hook:"Spiritual ceremony",teaser:"Quiet, hypnotic, and deeply moving — not what you expect."},
  {id:"islands",title:"Princes' Islands",cat:"Day Trip",price:35,dur:"Full day",rating:4.7,img:"/islands.jpg",badge:"Day trip",skip:false,link:"https://gyg.me/50M4D75g",area:"Sea of Marmara",hook:"Car-free escape",teaser:"No cars, no rush — just sea breeze and pine trees."},
  {id:"cooking",title:"Turkish Cooking Class",cat:"Experience",price:50,dur:"4h",rating:4.9,img:"/cooking.jpg",badge:"Top rated",skip:false,link:"https://gyg.me/TyiQJFVC",area:"Various",hook:"Cook like a local",teaser:"Shop, cook, eat — and take the recipes home."},
  {id:"foodtour",title:"Istanbul Food Tour",cat:"Experience",price:40,dur:"3.5h",rating:4.8,img:"/foodtour.jpg",badge:"Bestseller",skip:false,link:"https://gyg.me/0KLewel5",area:"Various",hook:"Taste the real city",teaser:"The real food scene — no guidebook needed."},
  {id:"hoponoff",title:"Hop-on Hop-off Bus",cat:"Transport",price:28,dur:"Full day",rating:4.4,img:"/hoponoff.jpg",badge:"Flexible",skip:false,link:"https://gyg.me/0hgJBsgt",area:"City-wide",hook:"Day 1 orientation",teaser:"Sit back, ride around, and get oriented."},
  {id:"nightcruise",title:"Dinner Cruise",cat:"Experience",price:55,dur:"3h",rating:4.6,img:"/nightcruise.jpg",badge:"Romantic",skip:false,link:"https://gyg.me/8f0VjFBO",area:"Eminönü",hook:"Romantic night out",teaser:"City lights, bridge glow, and dinner on the water."},
  {id:"aquarium",title:"Istanbul Aquarium",cat:"Family",price:22,dur:"2h",rating:4.5,img:"/aquarium.jpg",badge:"Family pick",skip:true,link:"https://gyg.me/8drJtohU",area:"Florya",hook:"Family favorite",teaser:"Sharks, tunnels, and a guaranteed good time for kids."},
  {id:"maiden",title:"Maiden's Tower",cat:"Landmark",price:20,dur:"1.5h",rating:4.7,img:"/maiden.jpg",badge:"Iconic",skip:false,link:"https://gyg.me/3vDd9xwf",area:"Üsküdar",hook:"Best sunset spot",teaser:"Small tower, big atmosphere."},
];

const GUIDES=[
  {id:"must-see",title:"Must-See Places",sub:"The headline sights worth planning around",emoji:"🏛️",ids:["hagia","basilica","topkapi","galata","dolma","maiden"],pick:"hagia"},
  {id:"hidden-gems",title:"Hidden Gems",sub:"Smaller finds with big character",emoji:"💎",ids:["dervish","cooking","foodtour","hammam","nightcruise","maiden"],pick:"dervish"},
  {id:"experiences",title:"Best Experiences",sub:"The moments you will remember long after the flight home",emoji:"✨",ids:["cruise","nightcruise","cooking","foodtour","dervish","islands","hammam"],pick:"cooking"},
  {id:"family",title:"Family Picks",sub:"Easy wins for kids and grown-ups",emoji:"👨‍👩‍👧‍👦",ids:["aquarium","islands","hoponoff","cruise","galata"],pick:"aquarium"},
  {id:"rainy",title:"Rainy Day Ideas",sub:"Smart indoor picks for grey-weather days",emoji:"🌧️",ids:["basilica","aquarium","hammam","cooking","dervish"],pick:"hammam"},
  {id:"food",title:"Food & Markets",sub:"Street eats, market wanders, and local staples",emoji:"🍽️",ids:["cooking","foodtour"],pick:"foodtour"},
  {id:"neighborhoods",title:"Neighborhood Guides",sub:"Choose the vibe, then choose the district",emoji:"🏘️",ids:[],pick:null},
];

const NEIGHBORHOODS=[
  {n:"Sultanahmet",d:"Istanbul's history core — Hagia Sophia, the Blue Mosque, Topkapı, and postcard views in every direction",img:"/hagia.jpg"},
  {n:"Beyoğlu & Taksim",d:"City energy, rooftop bars, İstiklal crowds, and Galata just downhill",img:"/galata.jpg"},
  {n:"Kadıköy",d:"Asian-side favorite for café hopping, food, nightlife, and local rhythm",img:"/foodtour.jpg"},
  {n:"Balat & Fener",d:"Colorful hills, old churches, vintage shops, and slow café mornings",img:"/basilica.jpg"},
  {n:"Ortaköy",d:"Bosphorus-front strolls, kumpir stands, and one of the city's best waterfront mosque views",img:"/cruise.jpg"},
  {n:"Karaköy",d:"Creative, connected, and easy for cafés, galleries, ferries, and evenings out",img:"/maiden.jpg"},
];

const PLAN_DAYS=[
  {day:1,title:"Old City Essentials",items:[
    {t:"09:00",n:"Hagia Sophia",m:"1h 15m · go at opening",tp:"landmark",id:"hagia"},
    {t:"10:35",n:"Basilica Cistern",m:"55m · 5 min walk",tp:"museum",id:"basilica"},
    {t:"11:50",n:"Lunch break",m:"1h · nearby terrace or kebab stop",tp:"food"},
    {t:"13:10",n:"Blue Mosque",m:"30–40 min · free entry, flex around prayer",tp:"landmark"},
    {t:"14:00",n:"Topkapi Palace",m:"3h · Harem if prebooked",tp:"museum",id:"topkapi"},
    {t:"17:30",n:"Grand Bazaar",m:"1h–1h15 · final shopping pass",tp:"shopping"},
  ]},
  {day:2,title:"Palaces, Panoramas & Bosphorus",items:[
    {t:"09:00",n:"Dolmabahçe Palace",m:"2–2.5h · timed entry",tp:"museum",id:"dolma"},
    {t:"11:45",n:"Ortaköy break",m:"1h · kumpir + waterfront",tp:"food"},
    {t:"14:00",n:"Galata Tower",m:"45 min · prebook slot",tp:"landmark",id:"galata"},
    {t:"17:30",n:"Bosphorus Cruise",m:"2h · aim for golden hour",tp:"landmark",id:"cruise"},
    {t:"20:00",n:"İstiklal & dinner",m:"2h+ · meyhane or rooftop",tp:"shopping"},
  ]},
  {day:3,title:"Markets, Rituals & Color",items:[
    {t:"10:00",n:"Turkish Bath",m:"90 min · book ahead",tp:"wellness",id:"hammam"},
    {t:"12:00",n:"Spice Bazaar",m:"45–60 min · quick shopping stop",tp:"shopping"},
    {t:"13:15",n:"Balat & Fener",m:"3h · streets, photos, café lunch",tp:"neighborhood"},
    {t:"17:30",n:"Whirling Dervish",m:"1h · arrive 20 min early",tp:"culture",id:"dervish"},
    {t:"19:30",n:"Farewell dinner",m:"Long dinner · Ottoman or seafood",tp:"food"},
  ]},
];
const dotC={landmark:"#2563EB",museum:"#7C3AED",food:"#D97706",shopping:"#059669",wellness:"#E11D48",neighborhood:"#0891B2",culture:"#C026D3"};
const TRANS=[{icon:CreditCard,title:"Digital Istanbulkart",desc:"Metro, tram, ferry, buses.",price:"₺150",badge:"Recommended",tone:T.primarySoft,ac:T.primary},{icon:QrCode,title:"Single Ride QR",desc:"One-off. No card needed.",price:"₺20",badge:"Quick",tone:"#FCE7F3",ac:"#BE185D"},{icon:Plane,title:"Airport Transfer",desc:"Havaist IST & SAW. 24/7.",price:"€12",badge:"Arrival",tone:T.okSoft,ac:T.ok},{icon:Ship,title:"Ferry Pack",desc:"Bosphorus + islands.",price:"₺80",badge:"Scenic",tone:T.warnSoft,ac:T.warn}];

const Pill=({children,tone=T.primarySoft,color=T.primary})=><span style={{background:tone,color,display:"inline-flex",alignItems:"center",gap:4,borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:600}}>{children}</span>;
const Lbl=({children})=><div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.14em",color:T.inkMute,marginBottom:6}}>{children}</div>;
const Hd=({children})=><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",color:T.ink,fontFamily:fd,marginBottom:16}}>{children}</div>;
const Bk=({onClick})=><div onClick={onClick} style={{width:40,height:40,borderRadius:16,background:"white",border:`1px solid ${T.line}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><ArrowLeft size={16} color={T.inkSoft}/></div>;

// ══ MINI PREVIEW BOTTOM SHEET ══
// MiniPreview artık ayrı dosyada: src/MiniPreview.jsx

// ══ GUIDE LISTING PAGE ══
function GuidePage({guide,onBack,onPreview,onDetail,onFav,favs}){
  if(!guide)return null;
  const items=guide.ids.map(id=>ATT.find(a=>a.id===id)).filter(Boolean);
  const featured=items.find(a=>a.id===guide.pick)||items[0];
  const rest=items.filter(a=>a.id!==featured?.id);
  return(<div>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={onBack}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{guide.title}</div></div></div>
    <div style={{fontSize:13,color:T.inkSoft,lineHeight:1.6,marginBottom:20}}>{guide.sub}</div>
    {/* Featured card */}
    {featured&&<div onClick={()=>onPreview(featured)} style={{borderRadius:24,overflow:"hidden",marginBottom:20,cursor:"pointer",position:"relative"}}>
      <div style={{position:"relative",height:200}}><img src={featured.img} alt={featured.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.65),transparent 50%)"}}/></div>
      <div style={{position:"absolute",top:12,left:12,display:"flex",gap:6}}><Pill tone="rgba(255,255,255,0.92)" color={T.dark}>{featured.badge}</Pill><Pill tone="rgba(197,157,95,0.9)" color="white">Editor's pick</Pill></div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:16}}>
        <div style={{fontSize:20,fontWeight:800,color:"white",fontFamily:fd}}>{featured.title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:4}}>{featured.teaser}</div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <div onClick={(e)=>{e.stopPropagation();onDetail(featured)}} style={{padding:"8px 14px",borderRadius:12,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",fontSize:12,fontWeight:600,color:"white",cursor:"pointer"}}>Full details</div>
          <div onClick={(e)=>{e.stopPropagation();handleBook(featured)}} style={{padding:"8px 14px",borderRadius:12,background:"white",fontSize:12,fontWeight:700,color:T.dark,display:"flex",alignItems:"center",gap:4,cursor:"pointer"}}>Book · €{featured.price}</div>
        </div>
      </div>
    </div>}
    {/* Rest as list */}
    {rest.map(a=><div key={a.id} onClick={()=>onPreview(a)} style={{display:"flex",gap:12,borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:10,cursor:"pointer",alignItems:"center"}}>
      <img src={a.img} alt={a.title} style={{width:72,height:72,borderRadius:16,objectFit:"cover",flexShrink:0}}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700}}>{a.title}</div>
        <div style={{fontSize:12,color:T.inkMute,marginTop:3}}>{a.teaser}</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
          <span style={{fontSize:12,fontWeight:800}}>€{a.price}</span>
          <span style={{fontSize:11,color:T.inkMute}}>{a.dur}</span>
          <span style={{fontSize:11,color:T.inkMute,display:"flex",alignItems:"center",gap:2}}><Star size={10} fill={T.warn} color={T.warn}/>{a.rating}</span>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0,alignItems:"flex-end"}}>
        <div onClick={(e)=>{e.stopPropagation();onFav(a.id)}} style={{width:28,height:28,borderRadius:8,background:favs.has(a.id)?T.dangerSoft:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={12} color={favs.has(a.id)?T.danger:T.inkMute} fill={favs.has(a.id)?T.danger:"none"}/></div>
        <ChevronRight size={14} color={T.inkMute}/>
      </div>
    </div>)}
  </div>);
}

export default function IstanbulGo(){
  const[boarded,setBoarded]=useState(false);const[obStep,setObStep]=useState(0);const[obData,setObData]=useState({days:3,interests:[],area:"sultanahmet"});
  const[tab,setTab]=useState("home");const[favs,setFavs]=useState(new Set());const[infoPage,setInfoPage]=useState(null);const[transOpen,setTransOpen]=useState(false);
  const[planStep,setPlanStep]=useState(0);const[planDays,setPlanDays]=useState(3);const[planSel,setPlanSel]=useState(new Set(["hagia","basilica","topkapi","cruise"]));const[planTempo,setPlanTempo]=useState("balanced");const[activeDay,setActiveDay]=useState(1);
  const[copied,setCopied]=useState(null);const[bookFilter,setBookFilter]=useState("All");
  const[detailAtt,setDetailAtt]=useState(null);
  const[previewAtt,setPreviewAtt]=useState(null);
  const[guideId,setGuideId]=useState(null);
  const[user,setUser]=useState(null);
  const[isPremium,setIsPremium]=useState(false);
  const[accountOpen,setAccountOpen]=useState(false);
  const[premiumOpen,setPremiumOpen]=useState(false);
  const[langOpen,setLangOpen]=useState(false);
  const[bookingData,setBookingData]=useState(null);
  const[esimOpen,setEsimOpen]=useState(false);
  const { t, lang, setLang } = useLanguage();

  const handleBook = (att) => setBookingData({ title: att.title, price: att.price, link: att.link });

  // Sayfa yüklenince kullanıcıyı ve favorileri hatırla
  useEffect(()=>{
    const savedUser=localStorage.getItem("user");
    const savedPremium=localStorage.getItem("premium");
    const savedFavs=localStorage.getItem("favs");
    if(savedUser) setUser(JSON.parse(savedUser));
    if(savedPremium) setIsPremium(true);
    if(savedFavs) setFavs(new Set(JSON.parse(savedFavs)));
  },[]);

  const toggleFav=id=>{
    const s=new Set(favs);
    s.has(id)?s.delete(id):s.add(id);
    setFavs(s);
    localStorage.setItem("favs",JSON.stringify([...s]));
  };
  const toggleSel=id=>{const s=new Set(planSel);s.has(id)?s.delete(id):s.add(id);setPlanSel(s)};
  const activePlan=PLAN_DAYS.find(d=>d.day===activeDay);
  const doCopy=(text,id)=>{navigator.clipboard?.writeText(text).catch(()=>{});setCopied(id);setTimeout(()=>setCopied(null),1500)};
  const goTab=t=>{setTab(t);setInfoPage(null);setGuideId(null)};
  const cats=["All",...[...new Set(ATT.map(a=>a.cat))]];
  const filteredATT=bookFilter==="All"?ATT:ATT.filter(a=>a.cat===bookFilter);
  const activeGuide=guideId?GUIDES.find(g=>g.id===guideId):null;

  // ═══ ONBOARDING ═══
  if(!boarded){
    const steps=[
      <div key={0} style={{textAlign:"center",padding:"60px 24px 40px"}}><div style={{fontSize:48,marginBottom:16}}>🌊</div><div style={{fontFamily:fd,fontSize:28,fontWeight:800,letterSpacing:"-0.03em",color:T.ink}}>Welcome to Istanbul</div><div style={{fontSize:14,color:T.inkSoft,marginTop:8,lineHeight:1.6}}>Your personal city companion — from airport to checkout day.</div><div onClick={()=>setObStep(1)} style={{marginTop:32,background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer"}}>Let's get started</div></div>,
      <div key={1} style={{padding:"40px 24px"}}><Lbl>Step 1 of 3</Lbl><div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:24}}>How long are you staying?</div><div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:32}}>{[1,2,3,4,5,7].map(d=><div key={d} onClick={()=>setObData({...obData,days:d})} style={{width:56,height:56,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,cursor:"pointer",background:obData.days===d?T.dark:"white",color:obData.days===d?T.gold:T.ink,boxShadow:obData.days===d?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}>{d}</div>)}</div><div onClick={()=>setObStep(2)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}}>Continue</div></div>,
      <div key={2} style={{padding:"40px 24px"}}><Lbl>Step 2 of 3</Lbl><div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:24}}>What excites you?</div><div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>{["History & Architecture","Food & Cuisine","Shopping & Bazaars","Nightlife","Nature & Bosphorus","Wellness & Hammam","Culture & Arts","Family Activities"].map(i=>{const on=obData.interests.includes(i);return<div key={i} onClick={()=>setObData({...obData,interests:on?obData.interests.filter(x=>x!==i):[...obData.interests,i]})} style={{padding:"10px 16px",borderRadius:24,fontSize:13,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6,background:on?T.dark:"white",color:on?"white":T.ink,boxShadow:on?"0 4px 14px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}>{i}{on&&<Check size={12}/>}</div>})}</div><div onClick={()=>setObStep(3)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}}>Continue</div></div>,
      <div key={3} style={{padding:"40px 24px"}}><Lbl>Step 3 of 3</Lbl><div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:24}}>Where are you staying?</div><div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:32}}>{[{id:"sultanahmet",n:"Sultanahmet / Old Town",d:"Walking distance to main sights"},{id:"taksim",n:"Taksim / Beyoğlu",d:"Nightlife, shopping, modern side"},{id:"kadikoy",n:"Kadıköy / Asian Side",d:"Local vibes, food scene"},{id:"other",n:"Other / Not sure yet",d:"We'll figure it out"}].map(a=><div key={a.id} onClick={()=>setObData({...obData,area:a.id})} style={{borderRadius:18,padding:"16px 18px",cursor:"pointer",background:obData.area===a.id?T.dark:"white",color:obData.area===a.id?"white":T.ink,boxShadow:obData.area===a.id?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}><div style={{fontSize:15,fontWeight:600}}>{a.n}</div><div style={{fontSize:12,opacity:0.6,marginTop:2}}>{a.d}</div></div>)}</div><div onClick={()=>{setPlanDays(obData.days);setPlanStep(4);setBoarded(true)}} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Sparkles size={16}/>Build my trip</div><div onClick={()=>{setBoarded(true);setPlanStep(0)}} style={{textAlign:"center",marginTop:12,fontSize:13,color:T.inkMute,cursor:"pointer"}}>Skip for now</div></div>,
    ];
    return(<div style={{minHeight:"100vh",background:"radial-gradient(circle at top,#eaf2ff 0%,#f5f7fb 35%)",padding:16,fontFamily:fi}}><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/><div style={{maxWidth:440,margin:"0 auto",borderRadius:34,border:"1px solid rgba(255,255,255,0.7)",background:"white",boxShadow:T.sh.hero,overflow:"hidden"}}>{obStep>0&&<div style={{padding:"16px 24px 0",display:"flex",gap:6}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=obStep?T.primary:T.line}}/>)}</div>}{steps[obStep]}</div></div>);
  }

  // ═══ MAIN ═══
  return(
    <div style={{minHeight:"100vh",background:"radial-gradient(circle at top,#eaf2ff 0%,#f5f7fb 35%)",padding:16,fontFamily:fi}}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:440,margin:"0 auto",borderRadius:34,border:"1px solid rgba(255,255,255,0.7)",background:"white",boxShadow:T.sh.hero,overflow:"hidden",position:"relative",display:"flex",flexDirection:"column",height:"calc(100vh - 32px)"}}>

        {/* HEADER */}
        <div style={{position:"relative",overflow:"hidden",background:`linear-gradient(180deg,${T.dark} 0%,#16233B 58%,#1A2B45 100%)`,padding:"32px 20px 20px",color:"white"}}>
          <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"20px 20px"}}/>
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:24,fontWeight:800,letterSpacing:"-0.04em",fontFamily:fd}}>Istanbul</span><span style={{background:"rgba(255,255,255,0.1)",padding:"4px 8px",borderRadius:99,fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#BFDBFE"}}>GO</span></div><div style={{marginTop:4,fontSize:11,textTransform:"uppercase",letterSpacing:"0.14em",color:"rgba(255,255,255,0.35)"}}>tourist super app</div></div><div style={{display:"flex",gap:8}}>{favs.size>0&&<div onClick={()=>goTab("trip")} style={{position:"relative",width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={17} color="#FCA5A5" fill="#FCA5A5"/><div style={{position:"absolute",top:-2,right:-2,width:16,height:16,borderRadius:8,background:T.danger,fontSize:9,fontWeight:800,color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{favs.size}</div></div>}<div onClick={()=>setLangOpen(true)} style={{width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16}}>{LANGUAGES.find(l=>l.code===lang)?.flag||"🌐"}</div><div onClick={()=>setAccountOpen(true)} style={{width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:user?"rgba(29,78,216,0.3)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><User size={17} color={user?"#93C5FD":"rgba(255,255,255,0.6)"}/></div></div></div>
          <div style={{marginTop:18,display:"flex",alignItems:"center",gap:10,background:"white",padding:"12px 16px",borderRadius:16}}><Search size={17} color={T.inkMute}/><input placeholder="Find tickets, routes, eSIM, tips..." style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:14,color:T.ink,fontFamily:fi}}/><div style={{display:"flex",alignItems:"center",gap:6,background:T.primary,padding:"8px 12px",borderRadius:12,fontSize:12,fontWeight:700,color:"white",cursor:"pointer"}}><Sparkles size={13}/>Ask</div></div>
        </div>

        {/* CONTENT */}
        <div style={{flex:1,overflowY:"auto",background:`linear-gradient(180deg,#F8FBFF 0%,${T.bg} 24%)`,padding:"20px 20px 110px"}}>

          {/* ── HOME ── */}
          {tab==="home"&&!infoPage&&<>
            {planStep===4&&<div onClick={()=>goTab("plan")} style={{overflow:"hidden",borderRadius:24,marginBottom:24,cursor:"pointer",position:"relative",background:`linear-gradient(135deg,${T.dark},#16233B)`,padding:20,color:"white"}}><div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"18px 18px"}}/><div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}><div style={{width:52,height:52,borderRadius:18,background:"rgba(29,78,216,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Sparkles size={22} color={T.gold} strokeWidth={1.5}/></div><div style={{flex:1}}><div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.12em",color:T.gold,marginBottom:4}}>Ready for you</div><div style={{fontSize:16,fontWeight:700}}>Your {planDays}-day itinerary</div></div><ChevronRight size={20} color="rgba(255,255,255,0.3)"/></div></div>}

            {/* Quick Actions */}
            <div style={{marginBottom:28}}><Lbl>Quick access</Lbl><Hd>Everything you need</Hd><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>{[{Icon:Sparkles,l:"Smart Plan",tone:T.primarySoft,ic:T.primary,tap:()=>goTab("plan")},{Icon:Ticket,l:"Tickets",tone:"#FCE7F3",ic:"#BE185D",tap:()=>goTab("book")},{Icon:Train,l:"Transport",tone:T.okSoft,ic:T.ok,tap:()=>setTransOpen(true)},{Icon:Navigation,l:"Explore",tone:T.warnSoft,ic:T.warn,tap:()=>goTab("explore")},{Icon:Smartphone,l:"eSIM",tone:"#EDE9FE",ic:"#6D28D9",tap:()=>setEsimOpen(true)},{Icon:Package,l:"My Trip",tone:T.goldSoft,ic:T.gold,tap:()=>goTab("trip")}].map(q=><div key={q.l} onClick={q.tap} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,borderRadius:22,background:"white",padding:"16px 8px",border:`1px solid ${T.line}`,cursor:"pointer"}}><div style={{width:48,height:48,borderRadius:16,background:q.tone,display:"flex",alignItems:"center",justifyContent:"center"}}><q.Icon size={21} color={q.ic} strokeWidth={1.75}/></div><span style={{fontSize:11,fontWeight:600,color:T.inkSoft}}>{q.l}</span></div>)}</div></div>

            {/* ── Daily Briefing — premium teaser, subtle ── */}
            {!isPremium && (
              <div onClick={()=>setPremiumOpen(true)} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:28,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:"#FBF5EB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>☀️</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink}}>Daily Briefing</div>
                  <div style={{fontSize:11,color:T.inkMute,marginTop:2}}>Personal daily plan, crowd alerts & tips</div>
                </div>
                <span style={{fontSize:10,color:"#C59D5F"}}>🔒</span>
              </div>
            )}

            {/* Must-See — horizontal scroll, image tıklanınca mini preview */}
            <div style={{marginBottom:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}><div><Lbl>Don't miss these</Lbl><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>Must-See Places</div></div><span onClick={()=>{goTab("explore");setGuideId("must-see")}} style={{fontSize:12,fontWeight:600,color:T.primary,cursor:"pointer"}}>Open guide →</span></div>
              <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginRight:-20}}>
                {["hagia","basilica","topkapi","galata","dolma","maiden"].map(id=>ATT.find(a=>a.id===id)).filter(Boolean).map(a=><div key={a.id} style={{minWidth:220,overflow:"hidden",borderRadius:22,border:`1px solid ${T.line}`,background:"white",flexShrink:0}}>
                  <div onClick={()=>setPreviewAtt(a)} style={{position:"relative",height:140,overflow:"hidden",cursor:"pointer"}}>
                    <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.55),transparent 50%)"}}/>
                    <div style={{position:"absolute",left:10,top:10}}><Pill tone="rgba(255,255,255,0.9)" color={T.dark}>{a.badge}</Pill></div>
                    <div style={{position:"absolute",bottom:10,left:10}}><div style={{fontSize:14,fontWeight:700,color:"white"}}>{a.title}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:1}}>{a.cat} · <Star size={9} fill="currentColor" style={{verticalAlign:"middle"}}/> {a.rating}</div></div>
                    <div onClick={e=>{e.stopPropagation();toggleFav(a.id)}} style={{position:"absolute",top:10,right:10,width:28,height:28,borderRadius:10,background:favs.has(a.id)?"rgba(225,29,72,0.9)":"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={12} color="white" fill={favs.has(a.id)?"white":"none"}/></div>
                  </div>
                  <div style={{padding:"10px 12px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:11,color:T.inkMute}}>From</div><div style={{fontSize:18,fontWeight:800}}>€{a.price}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span onClick={()=>setDetailAtt(a)} style={{fontSize:11,fontWeight:600,color:T.primary,cursor:"pointer",borderBottom:`1px solid ${T.primarySoft}`}}>details</span>
                      <div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{display:"flex",alignItems:"center",gap:4,height:36,padding:"0 14px",borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 8px rgba(29,78,216,0.2)"}}>Book</div>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>

            {/* Hidden Gems */}
            <div style={{marginBottom:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}><div><Lbl>Beyond the obvious</Lbl><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>Hidden Gems</div></div><span onClick={()=>{goTab("explore");setGuideId("hidden-gems")}} style={{fontSize:12,fontWeight:600,color:T.primary,cursor:"pointer"}}>Open guide →</span></div>
              <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginRight:-20}}>
                {["dervish","cooking","foodtour","hammam","nightcruise"].map(id=>ATT.find(a=>a.id===id)).filter(Boolean).map(a=><div key={a.id} style={{minWidth:220,overflow:"hidden",borderRadius:22,border:`1px solid ${T.line}`,background:"white",flexShrink:0}}>
                  <div onClick={()=>setPreviewAtt(a)} style={{position:"relative",height:140,overflow:"hidden",cursor:"pointer"}}>
                    <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.55),transparent 50%)"}}/>
                    <div style={{position:"absolute",left:10,top:10}}><Pill tone="rgba(255,255,255,0.9)" color={T.dark}>{a.badge}</Pill></div>
                    <div style={{position:"absolute",bottom:10,left:10}}><div style={{fontSize:14,fontWeight:700,color:"white"}}>{a.title}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:1}}>{a.cat}</div></div>
                    <div onClick={e=>{e.stopPropagation();toggleFav(a.id)}} style={{position:"absolute",top:10,right:10,width:28,height:28,borderRadius:10,background:favs.has(a.id)?"rgba(225,29,72,0.9)":"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={12} color="white" fill={favs.has(a.id)?"white":"none"}/></div>
                  </div>
                  <div style={{padding:"10px 12px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:11,color:T.inkMute}}>From</div><div style={{fontSize:18,fontWeight:800}}>€{a.price}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span onClick={()=>setDetailAtt(a)} style={{fontSize:11,fontWeight:600,color:T.primary,cursor:"pointer",borderBottom:`1px solid ${T.primarySoft}`}}>details</span>
                      <div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{display:"flex",alignItems:"center",gap:4,height:36,padding:"0 14px",borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 8px rgba(29,78,216,0.2)"}}>Book</div>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>

            {/* eSIM */}
            <div style={{borderRadius:20,background:T.dark,padding:"16px 18px",marginBottom:28,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={()=>setEsimOpen(true)}><div style={{width:44,height:44,borderRadius:14,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}><Wifi size={20} color="#A78BFA"/></div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:"white"}}>Stay connected</div><div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:2}}>Get your eSIM before you land — from €4.99</div></div><ChevronRight size={16} color="rgba(255,255,255,0.3)"/></div>

            {/* Info Cards */}
            <Lbl>Your local friend</Lbl><Hd>Know before you go</Hd>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{[{k:"airport",Icon:Plane,t:"Airport Guide",d:"Transfers, routes, tips"},{k:"money",Icon:Wallet,t:"Money & Tips",d:"Currency, ATMs, haggling"},{k:"phrases",Icon:Languages,t:"Turkish Phrases",d:"Tap to copy essentials"},{k:"safety",Icon:ShieldCheck,t:"Safety Guide",d:"Scams & street smarts"},{k:"esim",Icon:Smartphone,t:"eSIM Setup",d:"Install before landing"},{k:"live",Icon:Globe,t:"Live Info",d:"Weather, closures, ferries"}].map(c=><div key={c.k} onClick={()=>c.k==="esim"?setEsimOpen(true):setInfoPage(c.k)} style={{borderRadius:22,border:`1px solid ${T.line}`,background:"white",padding:16,cursor:"pointer"}}><div style={{width:44,height:44,borderRadius:16,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><c.Icon size={20} color={T.ink} strokeWidth={1.7}/></div><div style={{fontSize:14,fontWeight:700}}>{c.t}</div><div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{c.d}</div><div style={{marginTop:8,fontSize:12,fontWeight:600,color:T.primary,display:"flex",alignItems:"center",gap:4}}>Open<ChevronRight size={12}/></div></div>)}</div>
          </>}

          {/* ── INFO PAGES ── */}
          {tab==="home"&&infoPage==="airport"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Airport to Hotel</div></div></div>{[{Icon:Car,t:"Private Transfer",d:"Door-to-door",p:"€35-45",b:"Fastest",tone:T.primarySoft,ac:T.primary},{Icon:Bus,t:"Havaist Bus",d:"Every 30min, IST ↔ Taksim",p:"€12",b:"Best value",tone:T.okSoft,ac:T.ok},{Icon:Train,t:"Metro M11",d:"IST → Gayrettepe",p:"~€1",b:"Cheapest",tone:T.warnSoft,ac:T.warn}].map(o=><div key={o.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14}}><div style={{width:52,height:52,borderRadius:16,background:o.tone,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><o.Icon size={22} color={o.ac}/></div><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:15,fontWeight:700}}>{o.t}</span><span style={{fontSize:9,fontWeight:600,background:o.tone,color:o.ac,padding:"2px 7px",borderRadius:6}}>{o.b}</span></div><div style={{fontSize:12,color:T.inkMute}}>{o.d}</div></div><div style={{fontSize:18,fontWeight:800}}>{o.p}</div></div>)}</div>}
          {tab==="home"&&infoPage==="phrases"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Turkish Phrases</div></div></div>{[{title:"Essentials",phrases:[{en:"Hello",tr:"Merhaba",pr:"mer-HA-ba"},{en:"Thank you",tr:"Teşekkürler",pr:"teh-shek-KOOR-ler"},{en:"Yes / No",tr:"Evet / Hayır",pr:"eh-VET / ha-YIR"},{en:"Please",tr:"Lütfen",pr:"LOOT-fen"},{en:"How much?",tr:"Ne kadar?",pr:"neh ka-DAR"},{en:"The check",tr:"Hesap lütfen",pr:"heh-SAP loot-FEN"}]}].map(g=><div key={g.title} style={{marginBottom:20}}><div style={{fontSize:13,fontWeight:700,marginBottom:10}}>{g.title}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{g.phrases.map((p,i)=>{const id=g.title+i;const cp=copied===id;return<div key={i} onClick={()=>doCopy(p.tr,id)} style={{borderRadius:16,background:cp?T.okSoft:"white",border:`1px solid ${cp?T.ok+"40":T.line}`,padding:"12px 14px",cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:T.inkMute}}>{p.en}</span>{cp?<Check size={12} color={T.ok}/>:<Copy size={12} color={T.inkMute}/>}</div><div style={{fontSize:16,fontWeight:700}}>{p.tr}</div><div style={{fontSize:10,color:T.inkMute,marginTop:2,fontStyle:"italic"}}>{p.pr}</div></div>})}</div></div>)}</div>}
          {tab==="home"&&infoPage==="safety"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Safety & Scams</div></div></div>{[{t:"Shoe-shine trick",d:"Drop brush near you, charge €20",a:"Ignore & walk"},{t:"Friendly bar invite",d:"Stranger → bar → €500 bill",a:"Never follow strangers"},{t:"Taxi meter off",d:"Driver skips meter",a:"Use BiTaksi app"}].map(s=><div key={s.t} style={{borderRadius:18,background:T.dangerSoft,padding:16,marginBottom:10,borderLeft:`4px solid ${T.danger}`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><AlertTriangle size={14} color={T.danger}/><span style={{fontSize:14,fontWeight:700}}>{s.t}</span></div><div style={{fontSize:12,color:T.inkSoft,marginBottom:8}}>{s.d}</div><div style={{fontSize:12,fontWeight:600,color:T.ok,display:"flex",alignItems:"center",gap:4}}><CheckCircle size={12}/>{s.a}</div></div>)}</div>}
          {tab==="home"&&infoPage==="live"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>Live</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>City Info</div></div></div><div style={{borderRadius:20,background:`linear-gradient(135deg,${T.dark},${T.primary})`,padding:20,color:"white"}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:11,color:"rgba(255,255,255,0.5)",textTransform:"uppercase"}}>Istanbul today</div><div style={{fontSize:42,fontWeight:800,marginTop:4}}>22°C</div></div><Sun size={48} color="rgba(255,255,255,0.25)"/></div></div></div>}
          {tab==="home"&&infoPage==="money"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Money & Payments</div></div></div>{[{Icon:Wallet,t:"Currency",d:"Turkish Lira (₺). €1 ≈ ₺38-40."},{Icon:CreditCard,t:"Cards vs Cash",d:"Visa/MC tourist areas. Bazaar: cash only."},{Icon:Star,t:"Haggling",d:"Start at 40%. Walk away — they call back."}].map(c=><div key={c.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",gap:14}}><div style={{width:44,height:44,borderRadius:14,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><c.Icon size={20} color={T.ink}/></div><div><div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{c.t}</div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.55}}>{c.d}</div></div></div>)}</div>}

          {/* ── PLAN ── */}
          {tab==="plan"&&<div>
            {planStep===0&&<div><div style={{overflow:"hidden",borderRadius:28,background:`linear-gradient(135deg,${T.dark},#16233B)`,padding:"40px 24px",color:"white",textAlign:"center",marginBottom:20}}><Sparkles size={40} color={T.gold} strokeWidth={1.2} style={{margin:"0 auto 16px"}}/><div style={{fontFamily:fd,fontSize:26,fontWeight:800,marginBottom:8}}>Plan Your Perfect Trip</div><div style={{fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>Answer 3 quick questions for a personalized itinerary.</div></div><div onClick={()=>setPlanStep(1)} style={{background:T.primary,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Sparkles size={16}/>Start Planning</div></div>}
            {planStep===1&&<div><div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>Back</div><Lbl>Step 1 of 3</Lbl><div style={{fontFamily:fd,fontSize:24,fontWeight:800,marginBottom:24}}>How many days?</div><div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:32}}>{[1,2,3,4,5,7].map(d=><div key={d} onClick={()=>setPlanDays(d)} style={{width:56,height:56,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,cursor:"pointer",background:planDays===d?T.dark:"white",color:planDays===d?T.gold:T.ink,boxShadow:planDays===d?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}>{d}</div>)}</div><div onClick={()=>setPlanStep(2)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,textAlign:"center",cursor:"pointer"}}>Continue</div></div>}
            {planStep===2&&<div><div onClick={()=>setPlanStep(1)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>Back</div><Lbl>Step 2 of 3</Lbl><div style={{fontFamily:fd,fontSize:24,fontWeight:800,marginBottom:24}}>What to see?</div><div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>{ATT.map(a=>{const on=planSel.has(a.id);return<div key={a.id} onClick={()=>toggleSel(a.id)} style={{padding:"10px 16px",borderRadius:24,fontSize:13,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:6,background:on?T.dark:"white",color:on?"white":T.ink,boxShadow:on?"0 4px 14px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}>{a.title}{on&&<Check size={12}/>}</div>})}</div><div onClick={()=>planSel.size>0&&setPlanStep(3)} style={{background:planSel.size>0?T.primary:T.line,color:planSel.size>0?"white":T.inkMute,padding:"14px 0",borderRadius:16,fontWeight:700,textAlign:"center",cursor:planSel.size>0?"pointer":"default"}}>Continue</div></div>}
            {planStep===3&&<div><div onClick={()=>setPlanStep(2)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>Back</div><Lbl>Step 3 of 3</Lbl><div style={{fontFamily:fd,fontSize:24,fontWeight:800,marginBottom:24}}>Your pace?</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>{[{id:"relaxed",l:"Relaxed",d:"2-3 stops/day",e:"🧘"},{id:"balanced",l:"Balanced",d:"4-5 stops",e:"⚖️"},{id:"packed",l:"Packed",d:"6+ stops",e:"🚀"}].map(p=><div key={p.id} onClick={()=>setPlanTempo(p.id)} style={{borderRadius:18,padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,background:planTempo===p.id?T.dark:"white",color:planTempo===p.id?"white":T.ink,boxShadow:planTempo===p.id?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}><div style={{fontSize:24}}>{p.e}</div><div><div style={{fontSize:15,fontWeight:600}}>{p.l}</div><div style={{fontSize:12,opacity:0.6,marginTop:2}}>{p.d}</div></div></div>)}</div><div onClick={()=>setPlanStep(4)} style={{background:T.dark,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,textAlign:"center",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Sparkles size={16}/>Generate Itinerary</div></div>}
            {planStep===4&&<><div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>Start over</div><div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:20}}>{PLAN_DAYS.slice(0,planDays).map(d=><div key={d.day} onClick={()=>setActiveDay(d.day)} style={{minWidth:112,borderRadius:20,padding:"12px 16px",cursor:"pointer",background:activeDay===d.day?T.dark:"white",color:activeDay===d.day?"white":T.ink,border:activeDay===d.day?"none":`1px solid ${T.line}`}}><div style={{fontSize:13,fontWeight:700}}>Day {d.day}</div><div style={{fontSize:11,opacity:0.7,marginTop:4}}>{d.title}</div></div>)}</div>{activePlan&&<div style={{borderRadius:28,border:`1px solid ${T.line}`,background:"white",padding:16}}><div style={{fontSize:20,fontWeight:800,fontFamily:fd,marginBottom:16}}>{activePlan.title}</div>{activePlan.items.map((s,i)=><div key={i} style={{display:"flex",gap:12}}><div style={{width:52,paddingTop:12,textAlign:"right",fontSize:12,fontWeight:600,color:T.inkMute}}>{s.t}</div><div style={{display:"flex",flexDirection:"column",alignItems:"center",width:16}}><div style={{width:12,height:12,borderRadius:6,marginTop:16,background:dotC[s.tp]||T.inkMute}}/>{i<activePlan.items.length-1&&<div style={{width:1,flex:1,background:T.line,marginTop:8}}/>}</div><div onClick={()=>{if(s.id){const att=ATT.find(a=>a.id===s.id);if(att)setPreviewAtt(att)}}} style={{flex:1,marginBottom:12,borderRadius:20,border:`1px solid ${T.line}`,background:"#F8FAFC",padding:16,cursor:s.id?"pointer":"default"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:14,fontWeight:700}}>{s.n}</div>{s.id&&<span style={{fontSize:11,fontWeight:600,color:T.primary}}>details →</span>}</div><div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{s.m}</div></div></div>)}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:16}}><div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,borderRadius:18,border:`1px solid ${T.line}`,padding:"12px",fontSize:13,fontWeight:700,color:T.inkSoft,cursor:"pointer"}}><RotateCcw size={14}/>Rebuild</div><div onClick={()=>goTab("book")} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,borderRadius:18,background:T.dark,padding:"12px",fontSize:13,fontWeight:700,color:"white",cursor:"pointer"}}><Ticket size={14}/>Book tickets</div></div></div>}
            {/* ── AI Premium Plan Upsell ── */}
            {!isPremium&&<div onClick={()=>setPremiumOpen(true)} style={{borderRadius:22,background:"linear-gradient(135deg,#0B1220,#1D4ED8)",padding:18,marginTop:16,cursor:"pointer",color:"white",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,opacity:0.08,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"14px 14px"}}/>
              <div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:48,height:48,borderRadius:16,background:"rgba(197,157,95,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Sparkles size={22} color={T.gold}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700}}>Want a personalized plan?</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:3}}>AI builds a custom itinerary based on your interests, pace & hotel location</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:14,padding:"11px 0",borderRadius:14,background:"rgba(197,157,95,0.2)",fontSize:13,fontWeight:700,color:T.gold}}>🔒 Unlock AI Planner · €4.99</div>
            </div>}
            </>}
          </div>}

          {/* ── BOOK ── */}
          {tab==="book"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>goTab("home")}/><div><Lbl>Commerce</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Tickets & Passes</div></div></div><div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16}}>{cats.map(c=><div key={c} onClick={()=>setBookFilter(c)} style={{padding:"7px 14px",borderRadius:99,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",background:bookFilter===c?T.dark:"white",color:bookFilter===c?"white":T.inkSoft,border:bookFilter===c?"none":`1px solid ${T.line}`}}>{c}</div>)}</div><Lbl>{filteredATT.length} results</Lbl>{filteredATT.map(a=><div key={a.id} onClick={()=>setPreviewAtt(a)} style={{display:"flex",alignItems:"center",gap:12,borderRadius:22,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:12,cursor:"pointer"}}><img src={a.img} alt={a.title} style={{width:64,height:64,borderRadius:16,objectFit:"cover"}}/><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:700}}>{a.title}</div><div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{a.cat} · {a.dur}{a.skip?" · Skip line":""}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:18,fontWeight:800}}>€{a.price}</div><div style={{display:"flex",gap:6,marginTop:6}}><div onClick={e=>{e.stopPropagation();toggleFav(a.id)}} style={{width:32,height:32,borderRadius:10,background:favs.has(a.id)?T.dangerSoft:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={14} color={favs.has(a.id)?T.danger:T.inkMute} fill={favs.has(a.id)?T.danger:"none"}/></div><div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 12px",borderRadius:10,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>Book</div></div></div></div>)}</div>}

          {/* ── EXPLORE — Guide Hub ── */}
          {tab==="explore"&&!activeGuide&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>goTab("home")}/><div><Lbl>Discover</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Explore Istanbul</div></div></div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.6,marginBottom:20}}>Curated guides to help you make the most of your trip.</div>{GUIDES.map(g=><div key={g.id} onClick={()=>g.id==="neighborhoods"?setGuideId("neighborhoods"):setGuideId(g.id)} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}><div style={{fontSize:28,width:44,textAlign:"center"}}>{g.emoji}</div><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700}}>{g.title}</div><div style={{fontSize:12,color:T.inkMute,marginTop:2}}>{g.sub}</div></div><ChevronRight size={16} color={T.inkMute}/></div>)}
            {/* Premium Picks — subtle, göze batmayan */}
            {!isPremium&&<div onClick={()=>setPremiumOpen(true)} style={{borderRadius:16,background:"#F8FAFC",border:`1px solid ${T.line}`,padding:"12px 16px",marginTop:6,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}><span style={{fontSize:18}}>✨</span><div style={{flex:1,fontSize:12,color:T.inkSoft}}>More curated picks with <span style={{fontWeight:700,color:T.ink}}>Premium</span></div><span style={{fontSize:10,color:"#C59D5F"}}>🔒</span></div>}
          </div>}

          {/* Explore — Guide Page */}
          {tab==="explore"&&activeGuide&&activeGuide.id!=="neighborhoods"&&<GuidePage guide={activeGuide} onBack={()=>setGuideId(null)} onPreview={setPreviewAtt} onDetail={setDetailAtt} onFav={toggleFav} favs={favs}/>}

          {/* Explore — Neighborhoods */}
          {tab==="explore"&&guideId==="neighborhoods"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setGuideId(null)}/><div><Lbl>Guide</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Neighborhoods</div></div></div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.6,marginBottom:20}}>Explore Istanbul district by district.</div>{NEIGHBORHOODS.map(nb=><div key={nb.n} style={{borderRadius:22,background:"white",border:`1px solid ${T.line}`,overflow:"hidden",marginBottom:12}}><div style={{position:"relative",height:100}}><img src={nb.img} alt={nb.n} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.5),transparent 50%)"}}/><div style={{position:"absolute",bottom:10,left:14,fontSize:16,fontWeight:800,color:"white"}}>{nb.n}</div></div><div style={{padding:"12px 14px",fontSize:12,color:T.inkSoft}}>{nb.d}</div></div>)}</div>}

          {/* ── TRIP ── */}
          {tab==="trip"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>goTab("home")}/><div><Lbl>Your trip</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>Trip Wallet</div></div></div><Lbl>Saved places</Lbl>{favs.size===0?<div style={{textAlign:"center",padding:"40px 20px",background:"white",borderRadius:22,border:`1px solid ${T.line}`}}><Heart size={32} color={T.line}/><div style={{fontSize:14,fontWeight:600,marginTop:12}}>No saved places yet</div></div>:<div style={{marginBottom:20}}>{ATT.filter(a=>favs.has(a.id)).map(a=><div key={a.id} onClick={()=>setPreviewAtt(a)} style={{display:"flex",alignItems:"center",gap:12,borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:10,cursor:"pointer",position:"relative"}}><div onClick={(e)=>{e.stopPropagation();toggleFav(a.id)}} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:10,background:T.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 6px rgba(0,0,0,0.15)"}}><X size={10} color="white"/></div><img src={a.img} alt={a.title} style={{width:52,height:52,borderRadius:14,objectFit:"cover"}}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{a.title}</div><div style={{fontSize:12,color:T.inkMute,marginTop:2}}>€{a.price}</div></div><div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{padding:"8px 14px",borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>Book</div></div>)}</div>}</div>}
        </div>

        {/* BOTTOM NAV */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,borderTop:`1px solid ${T.line}`,background:"rgba(255,255,255,0.95)",padding:"8px 12px 24px",backdropFilter:"blur(12px)"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:2}}>{[{id:"home",Icon:Compass,l:t("nav.home")},{id:"plan",Icon:Sparkles,l:t("nav.plan")},{id:"book",Icon:Ticket,l:t("nav.book")},{id:"explore",Icon:MapPin,l:t("nav.explore")},{id:"trip",Icon:Package,l:t("nav.trip")}].map(n=>{const on=tab===n.id;return<div key={n.id} onClick={()=>goTab(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:16,padding:"8px 4px 6px",cursor:"pointer",background:on?T.primarySoft:"transparent"}}><n.Icon size={19} color={on?T.primary:T.inkSoft} strokeWidth={on?2:1.75}/><span style={{marginTop:3,fontSize:10,fontWeight:600,color:on?T.primary:T.inkSoft}}>{n.l}</span></div>})}</div></div>
      </div>

      {/* MINI PREVIEW */}
      {/* MINI PREVIEW — ortada açılan popup */}
      <MiniPreview
        attraction={previewAtt}
        onClose={() => setPreviewAtt(null)}
        onFullDetail={(a) => {
          setPreviewAtt(null);
          setTimeout(() => setDetailAtt(a), 250);
        }}
        onFav={toggleFav}
        isFav={previewAtt ? favs.has(previewAtt.id) : false}
        isPremium={isPremium}
        onUpgrade={() => setPremiumOpen(true)}
        onBook={handleBook}
      />

      {/* FULL DETAIL */}
      {detailAtt&&<AttractionSheet attraction={detailAtt} allAttractions={ATT} onClose={()=>setDetailAtt(null)} onFav={toggleFav} isFav={favs.has(detailAtt.id)} onOpenOther={a=>setDetailAtt(a)} isPremium={isPremium} onUpgrade={()=>setPremiumOpen(true)} onBook={handleBook}/>}

      {/* HESAP */}
      {accountOpen && (
        <AccountSheet
          onClose={() => setAccountOpen(false)}
          user={user}
          onLogin={(u) => {
            setUser(u);
            localStorage.setItem("user", JSON.stringify(u));
          }}
          onLogout={() => {
            setUser(null);
            setIsPremium(false);
            localStorage.removeItem("user");
            localStorage.removeItem("premium");
          }}
          onUpgrade={() => {
            setAccountOpen(false);
            setTimeout(() => setPremiumOpen(true), 250);
          }}
          isPremium={isPremium}
          onNavigate={(tab) => goTab(tab)}
        />
      )}

      {/* PREMIUM */}
      {premiumOpen && (
        <PremiumSheet
          onClose={() => setPremiumOpen(false)}
          onPurchase={() => {
            setIsPremium(true);
            localStorage.setItem("premium", "true");
            setPremiumOpen(false);
          }}
          isPremium={isPremium}
        />
      )}

      {/* BOOKING OVERLAY */}
      <BookingOverlay
        booking={bookingData}
        onClose={() => setBookingData(null)}
      />

      {/* DİL SEÇİCİ */}
      {langOpen&&<div style={{position:"fixed",inset:0,zIndex:200}}><div onClick={()=>setLangOpen(false)} style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.45)",backdropFilter:"blur(4px)"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,maxWidth:440,margin:"0 auto",borderRadius:"28px 28px 0 0",background:"white",padding:"12px 20px 32px"}}><div style={{width:48,height:6,borderRadius:3,background:T.line,margin:"0 auto 16px"}}/><div style={{fontSize:18,fontWeight:800,fontFamily:fd,marginBottom:16}}>🌐 Language</div>{LANGUAGES.map(l=><div key={l.code} onClick={()=>{setLang(l.code);setLangOpen(false)}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 4px",borderBottom:`1px solid ${T.line}`,cursor:"pointer"}}><span style={{fontSize:22}}>{l.flag}</span><div style={{flex:1,fontSize:14,fontWeight:lang===l.code?700:400,color:lang===l.code?T.primary:T.ink}}>{l.label}</div>{lang===l.code&&<Check size={16} color={T.primary}/>}</div>)}</div></div>}

      {/* TRANSPORT */}
      {transOpen && <TransportSheet onClose={() => setTransOpen(false)} />}

      {/* ESIM */}
      {esimOpen && <EsimSheet onClose={() => setEsimOpen(false)} />}
    </div>
  );
}
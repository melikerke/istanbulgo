import { useState, useEffect } from "react";
import {
  Sparkles, Ticket, Search, User, ChevronRight, Clock as Clk, MapPin, Plus, Check,
  Plane, Smartphone, UtensilsCrossed, Heart, ArrowLeft, RotateCcw, CreditCard, Ship,
  QrCode, Navigation, Landmark, ShieldCheck, Globe, Route, Headphones, Star, Wallet,
  Train, Languages, Compass, Info, ExternalLink, Zap, Bus, Car, Copy, AlertTriangle,
  CheckCircle, Sun, Anchor, Wifi, Coffee, Package, MessageCircle, X, Eye, Umbrella,
  CloudRain, Baby, Utensils, Menu
} from "lucide-react";
import AttractionSheet from './AttractionSheet';
import MiniPreview from './MiniPreview';
import AccountSheet from './AccountSheet';
import PremiumSheet from './PremiumSheet';
import { useLanguage, LANGUAGES } from './LanguageContext';
import BookingOverlay from './BookingOverlay';
import EsimSheet from './EsimSheet';
import TransportSheet from './TransportSheet';
import { generatePlan, INTERESTS, PACES } from './planEngine';
import ItineraryMap from './ItineraryMap';
import WeatherWidget from './WeatherWidget';
import InstallPrompt from './InstallPrompt';
import TimedTicketSheet from './TimedTicketSheet';

const T={bg:"#F5F7FB",surface:"#FFFFFF",ink:"#0F172A",inkSoft:"#475569",inkMute:"#94A3B8",line:"#E2E8F0",primary:"#1D4ED8",primarySoft:"#DBEAFE",gold:"#C59D5F",goldSoft:"#FBF5EB",ok:"#059669",okSoft:"#D1FAE5",warn:"#D97706",warnSoft:"#FEF3C7",danger:"#E11D48",dangerSoft:"#FFE4E6",dark:"#0B1220",sh:{hero:"0 20px 50px rgba(15,23,42,0.16)"}};
const fd="'Plus Jakarta Sans',system-ui,sans-serif";
const fi="'Inter',system-ui,sans-serif";

const ATT=[
  {id:"hagia",title:"Hagia Sophia",cat:"Landmark",price:25,dur:"1.5h",rating:4.9,img:"/hagia.jpg",badge:"Most booked",skip:true,link:"https://gyg.me/9TxDoMwH",area:"Sultanahmet",hook:"Must-see landmark",teaser:"A place where two empires collide — and you feel it instantly.",lat:41.0086,lng:28.9802},
  {id:"basilica",title:"Basilica Cistern",cat:"Museum",price:20,dur:"1h",rating:4.8,img:"/basilica.jpg",badge:"Fast entry",skip:true,link:"https://gyg.me/HyHBAHab",area:"Sultanahmet",hook:"Unreal atmosphere",teaser:"Dark, mysterious, and surprisingly beautiful.",lat:41.0084,lng:28.9779},
  {id:"topkapi",title:"Topkapi Palace",cat:"Palace",price:30,dur:"2.5h",rating:4.9,img:"/topkapi.jpg",badge:"High value",skip:true,link:"https://gyg.me/zHWCA6tY",area:"Sultanahmet",hook:"Historic must-visit",teaser:"Not just a palace — a whole world behind the gates.",lat:41.0115,lng:28.9833},
  {id:"cruise",title:"Bosphorus Cruise",cat:"Experience",price:18,dur:"2h",rating:4.7,img:"/cruise.jpg",badge:"Sunset pick",skip:false,link:"https://gyg.me/Ou6l1R0E",area:"Eminönü",hook:"See two continents",teaser:"Palaces, bridges, and skyline — all in one ride.",lat:41.017,lng:28.9744},
  {id:"hammam",title:"Turkish Bath",cat:"Wellness",price:45,dur:"1.5h",rating:4.8,img:"/hammam.jpg",badge:"Authentic",skip:false,link:"https://gyg.me/wdfMolAo",area:"Various",hook:"Authentic ritual",teaser:"Steam, marble, and a reset you didn't know you needed.",lat:41.0257,lng:28.9787},
  {id:"galata",title:"Galata Tower",cat:"Viewpoint",price:15,dur:"45min",rating:4.6,img:"/galata.jpg",badge:"360° view",skip:true,link:"https://gyg.me/NCnQgklA",area:"Beyoğlu",hook:"Best city views",teaser:"360° Istanbul in one shot.",lat:41.0256,lng:28.9742},
  {id:"dolma",title:"Dolmabahçe Palace",cat:"Palace",price:28,dur:"2h",rating:4.7,img:"/dolma.jpg",badge:"Crystal stairs",skip:true,link:"https://gyg.me/FhcexQTY",area:"Beşiktaş",hook:"Luxury palace experience",teaser:"European luxury in the heart of the city.",lat:41.0391,lng:29.0001},
  {id:"dervish",title:"Whirling Dervish",cat:"Culture",price:22,dur:"1h",rating:4.9,img:"/dervish.jpg",badge:"Unique",skip:false,link:"https://gyg.me/MZyCEeij",area:"Various",hook:"Spiritual ceremony",teaser:"Quiet, hypnotic, and deeply moving — not what you expect.",lat:41.0255,lng:28.9747},
  {id:"islands",title:"Princes' Islands",cat:"Day Trip",price:35,dur:"Full day",rating:4.7,img:"/islands.jpg",badge:"Day trip",skip:false,link:"https://gyg.me/50M4D75g",area:"Sea of Marmara",hook:"Car-free escape",teaser:"No cars, no rush — just sea breeze and pine trees.",lat:40.876,lng:29.1256},
  {id:"cooking",title:"Turkish Cooking Class",cat:"Experience",price:50,dur:"4h",rating:4.9,img:"/cooking.jpg",badge:"Top rated",skip:false,link:"https://gyg.me/TyiQJFVC",area:"Various",hook:"Cook like a local",teaser:"Shop, cook, eat — and take the recipes home.",lat:41.01,lng:28.975},
  {id:"foodtour",title:"Istanbul Food Tour",cat:"Experience",price:40,dur:"3.5h",rating:4.8,img:"/foodtour.jpg",badge:"Bestseller",skip:false,link:"https://gyg.me/0KLewel5",area:"Various",hook:"Taste the real city",teaser:"The real food scene — no guidebook needed.",lat:41.018,lng:28.98},
  {id:"hoponoff",title:"Hop-on Hop-off Bus",cat:"Transport",price:28,dur:"Full day",rating:4.4,img:"/hoponoff.jpg",badge:"Flexible",skip:false,link:"https://gyg.me/0hgJBsgt",area:"City-wide",hook:"Day 1 orientation",teaser:"Sit back, ride around, and get oriented.",lat:41.0082,lng:28.9784},
  {id:"nightcruise",title:"Dinner Cruise",cat:"Experience",price:55,dur:"3h",rating:4.6,img:"/nightcruise.jpg",badge:"Romantic",skip:false,link:"https://gyg.me/8f0VjFBO",area:"Eminönü",hook:"Romantic night out",teaser:"City lights, bridge glow, and dinner on the water.",lat:41.017,lng:28.9744},
  {id:"aquarium",title:"Istanbul Aquarium",cat:"Family",price:22,dur:"2h",rating:4.5,img:"/aquarium.jpg",badge:"Family pick",skip:true,link:"https://gyg.me/8drJtohU",area:"Florya",hook:"Family favorite",teaser:"Sharks, tunnels, and a guaranteed good time for kids.",lat:40.9825,lng:28.7847},
  {id:"maiden",title:"Maiden's Tower",cat:"Landmark",price:20,dur:"1.5h",rating:4.7,img:"/maiden.jpg",badge:"Iconic",skip:false,link:"https://gyg.me/3vDd9xwf",area:"Üsküdar",hook:"Best sunset spot",teaser:"Small tower, big atmosphere.",lat:41.0211,lng:29.0041},
  {id:"bluemosque",title:"Blue Mosque",cat:"Landmark",price:0,dur:"30–45min",rating:4.8,img:"/bluemosque.jpg",badge:"Free entry",skip:false,link:"",area:"Sultanahmet",hook:"Iconic & active mosque",teaser:"Calm, iconic, and still an active mosque — timing is everything.",lat:41.0054,lng:28.9768},
  {id:"grandbazaar",title:"Grand Bazaar",cat:"Shopping",price:0,dur:"1.5–2h",rating:4.6,img:"/grandbazaar.jpg",badge:"4,000+ shops",skip:false,link:"",area:"Beyazıt",hook:"Easy to get lost — that's the point",teaser:"Colors, chaos, and endless shops — it's about the experience.",lat:41.0106,lng:28.9681},
  {id:"spicebazaar",title:"Spice Bazaar",cat:"Shopping",price:0,dur:"45min–1h",rating:4.5,img:"/spicebazaar.jpg",badge:"Quick stop",skip:false,link:"",area:"Eminönü",hook:"Quick local vibes",teaser:"Smells, flavors, and quick souvenir shopping.",lat:41.0165,lng:28.9706},
  {id:"balat",title:"Balat & Fener",cat:"Neighborhood",price:0,dur:"2–3h",rating:4.7,img:"/balat.jpg",badge:"Colorful streets",skip:false,link:"",area:"Fatih",hook:"More than just photos",teaser:"Colorful streets with real stories — walk slowly here.",lat:41.0292,lng:28.9494},
  {id:"taksim",title:"Taksim & İstiklal",cat:"Neighborhood",price:0,dur:"2–3h",rating:4.5,img:"/taksim.jpg",badge:"City center",skip:false,link:"",area:"Beyoğlu",hook:"Always alive",teaser:"Street music, shops, food — the heart of modern Istanbul.",lat:41.037,lng:28.985},
  {id:"ortakoy",title:"Ortaköy",cat:"Neighborhood",price:0,dur:"1–2h",rating:4.6,img:"/ortakoy.jpg",badge:"Photo spot",skip:false,link:"",area:"Beşiktaş",hook:"Famous photo spot",teaser:"That famous mosque + bridge photo? It's here.",lat:41.0475,lng:29.0272},
  {id:"pierreloti",title:"Pierre Loti Hill",cat:"Viewpoint",price:0,dur:"1–1.5h",rating:4.6,img:"/pierreloti.jpg",badge:"Hidden gem",skip:false,link:"",area:"Eyüp",hook:"Peaceful city view",teaser:"Quiet, scenic, and beautifully underrated.",lat:41.0507,lng:28.9345},
  {id:"camlica",title:"Çamlıca Hill",cat:"Viewpoint",price:0,dur:"1–2h",rating:4.7,img:"/camlica.jpg",badge:"Panoramic",skip:false,link:"",area:"Üsküdar",hook:"Best panorama, fewest tourists",teaser:"The highest view in Istanbul — and almost no crowds.",lat:41.0308,lng:29.0689},
];

const GUIDES=[
  {id:"must-see",title:"Must-See Places",sub:"The headline sights worth planning around",emoji:"🏛️",ids:["hagia","basilica","topkapi","bluemosque","galata","dolma","maiden","grandbazaar"],pick:"hagia"},
  {id:"hidden-gems",title:"Hidden Gems",sub:"Smaller finds with big character",emoji:"💎",ids:["dervish","balat","pierreloti","camlica","cooking","foodtour","ortakoy"],pick:"balat"},
  {id:"experiences",title:"Best Experiences",sub:"The moments you will remember long after the flight home",emoji:"✨",ids:["cruise","nightcruise","cooking","foodtour","dervish","islands","hammam"],pick:"cooking"},
  {id:"family",title:"Family Picks",sub:"Easy wins for kids and grown-ups",emoji:"👨‍👩‍👧‍👦",ids:["aquarium","islands","hoponoff","cruise","galata"],pick:"aquarium"},
  {id:"rainy",title:"Rainy Day Ideas",sub:"Smart indoor picks for grey-weather days",emoji:"🌧️",ids:["basilica","aquarium","hammam","cooking","grandbazaar","spicebazaar"],pick:"hammam"},
  {id:"food",title:"Food & Markets",sub:"Street eats, market wanders, and local staples",emoji:"🍽️",ids:["cooking","foodtour","spicebazaar","grandbazaar","ortakoy"],pick:"foodtour"},
  {id:"neighborhoods",title:"Neighborhood Guides",sub:"Choose the vibe, then choose the district",emoji:"🏘️",ids:[],pick:null},
];

// Guide id → translation key map
const GUIDE_KEYS={
  "must-see":{title:"guide.mustSeeTitle",sub:"guide.mustSeeSub"},
  "hidden-gems":{title:"guide.hiddenTitle",sub:"guide.hiddenSub"},
  "experiences":{title:"guide.expTitle",sub:"guide.expSub"},
  "family":{title:"guide.familyTitle",sub:"guide.familySub"},
  "rainy":{title:"guide.rainyTitle",sub:"guide.rainySub"},
  "food":{title:"guide.foodTitle",sub:"guide.foodSub"},
  "neighborhoods":{title:"guide.nbTitle",sub:"guide.nbSub"},
};

const NEIGHBORHOODS=[
  {nKey:"nb.sultanahmet",dKey:"nb.sultanahmetD",img:"/hagia.jpg"},
  {nKey:"nb.beyoglu",dKey:"nb.beyogluD",img:"/galata.jpg"},
  {nKey:"nb.kadikoy",dKey:"nb.kadikoyD",img:"/foodtour.jpg"},
  {nKey:"nb.balat",dKey:"nb.balatD",img:"/basilica.jpg"},
  {nKey:"nb.ortakoy",dKey:"nb.ortakoyD",img:"/cruise.jpg"},
  {nKey:"nb.karakoy",dKey:"nb.karakoyD",img:"/maiden.jpg"},
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
  const { t } = useLanguage();
  if(!guide)return null;
  const items=guide.ids.map(id=>ATT.find(a=>a.id===id)).filter(Boolean);
  const featured=items.find(a=>a.id===guide.pick)||items[0];
  const rest=items.filter(a=>a.id!==featured?.id);
  return(<div>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={onBack}/><div><Lbl>{t("misc.popular")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t(GUIDE_KEYS[guide.id]?.title||"")||guide.title}</div></div></div>
    <div style={{fontSize:13,color:T.inkSoft,lineHeight:1.6,marginBottom:20}}>{t(GUIDE_KEYS[guide.id]?.sub||"")||guide.sub}</div>
    {/* Featured card */}
    {featured&&<div onClick={()=>onPreview(featured)} style={{borderRadius:24,overflow:"hidden",marginBottom:20,cursor:"pointer",position:"relative"}}>
      <div style={{position:"relative",height:200}}><img src={featured.img} alt={featured.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.65),transparent 50%)"}}/></div>
      <div style={{position:"absolute",top:12,left:12,display:"flex",gap:6}}><Pill tone="rgba(255,255,255,0.92)" color={T.dark}>{featured.badge}</Pill><Pill tone="rgba(197,157,95,0.9)" color="white">{t("badge.editorsPick")}</Pill></div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:16}}>
        <div style={{fontSize:20,fontWeight:800,color:"white",fontFamily:fd}}>{featured.title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:4}}>{t(`att.${featured.id}.teaser`) !== `att.${featured.id}.teaser` ? t(`att.${featured.id}.teaser`) : featured.teaser}</div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <div onClick={(e)=>{e.stopPropagation();onDetail(featured)}} style={{padding:"8px 14px",borderRadius:12,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",fontSize:12,fontWeight:600,color:"white",cursor:"pointer"}}>{t("card.details")}</div>
          <div onClick={(e)=>{e.stopPropagation();handleBook(featured)}} style={{padding:"8px 14px",borderRadius:12,background:"white",fontSize:12,fontWeight:700,color:T.dark,display:"flex",alignItems:"center",gap:4,cursor:"pointer"}}>{t("card.book")} · €{featured.price}</div>
        </div>
      </div>
    </div>}
    {/* Rest as list */}
    {rest.map(a=><div key={a.id} onClick={()=>onPreview(a)} style={{display:"flex",gap:12,borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:10,cursor:"pointer",alignItems:"center"}}>
      <img src={a.img} alt={a.title} style={{width:72,height:72,borderRadius:16,objectFit:"cover",flexShrink:0}}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700}}>{a.title}</div>
        <div style={{fontSize:12,color:T.inkMute,marginTop:3}}>{t(`att.${a.id}.teaser`) !== `att.${a.id}.teaser` ? t(`att.${a.id}.teaser`) : a.teaser}</div>
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
  const[boarded,setBoarded]=useState(false);const[obStep,setObStep]=useState(0);const[obDays,setObDays]=useState(3);const[obPace,setObPace]=useState(null);const[obInterests,setObInterests]=useState([]);
  const[tab,setTab]=useState("home");const[favs,setFavs]=useState(new Set());const[infoPage,setInfoPage]=useState(null);const[transOpen,setTransOpen]=useState(false);
  const[activeDay,setActiveDay]=useState(1);
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
  const[searchQuery,setSearchQuery]=useState("");
  const[searchFocused,setSearchFocused]=useState(false);
  const[myTickets,setMyTickets]=useState([]);
  const[timedTickets,setTimedTickets]=useState({});
  const[tripStartDate,setTripStartDate]=useState(null);
  const[tripTab,setTripTab]=useState("favorites");
  const[ticketSearch,setTicketSearch]=useState("");
  const[timedTicketSheet,setTimedTicketSheet]=useState(null);
  const[menuOpen,setMenuOpen]=useState(false);
  const[isPWA,setIsPWA]=useState(false);

  useEffect(()=>{
    const check=()=>window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
    setIsPWA(check());
  },[]);
  const[planDays,setPlanDays]=useState(null);
  const[planPace,setPlanPace]=useState(null);
  const[planInterests,setPlanInterests]=useState([]);
  const[planResult,setPlanResult]=useState(null);
  const[planStep,setPlanStep]=useState(0); // 0: intro, 1: days, 2: pace, 3: interests, 4: result
  const { t, lang, setLang } = useLanguage();

  const handleBook = (att) => setBookingData({ title: att.title, price: att.price, link: att.link });

  // Sayfa yüklenince kullanıcıyı ve favorileri hatırla
  useEffect(()=>{
    const savedUser=localStorage.getItem("user");
    const savedPremium=localStorage.getItem("premium");
    const savedFavs=localStorage.getItem("favs");
    const savedTickets=localStorage.getItem("myTickets");
    const savedTimed=localStorage.getItem("timedTickets");
    const savedStart=localStorage.getItem("tripStartDate");
    if(savedUser) setUser(JSON.parse(savedUser));
    if(savedPremium) setIsPremium(true);
    if(savedFavs) setFavs(new Set(JSON.parse(savedFavs)));
    if(savedTickets) setMyTickets(JSON.parse(savedTickets));
    if(savedTimed) setTimedTickets(JSON.parse(savedTimed));
    if(savedStart) setTripStartDate(savedStart);
  },[]);

  const setTimedTicket=(ticketId,date,time)=>{
    const updated={...timedTickets,[ticketId]:{date,time}};
    setTimedTickets(updated);
    localStorage.setItem("timedTickets",JSON.stringify(updated));
  };

  const removeTimedTicket=(ticketId)=>{
    const updated={...timedTickets};
    delete updated[ticketId];
    setTimedTickets(updated);
    localStorage.setItem("timedTickets",JSON.stringify(updated));
    // Plan varsa yeniden üret
    if(planResult&&planDays){
      const newPlan=generatePlan({days:planDays,pace:planPace||"balanced",interests:planInterests||[],timedTickets:updated,tripStartDate});
      setPlanResult(newPlan);
    }
  };

  const saveTripStartDate=(date)=>{
    setTripStartDate(date);
    localStorage.setItem("tripStartDate",date);
  };

  const toggleTicket=(id)=>{
    const updated=myTickets.includes(id)?myTickets.filter(t=>t!==id):[...myTickets,id];
    setMyTickets(updated);
    localStorage.setItem("myTickets",JSON.stringify(updated));
  };

  const sharePlan=()=>{
    if(!planResult) return;
    const text=`My Istanbul plan (${planDays} days):\n\n`+planResult.days.map(d=>{
      const items=d.items.filter(i=>i.id).map(i=>{const a=ATT.find(a=>a.id===i.id);return `${i.t} ${a?.title||i.n}`}).join("\n");
      return `Day ${d.day} · ${d.title}\n${items}`;
    }).join("\n\n")+"\n\nMade with IstanbulGo · istanbulgo.vercel.app";
    if(navigator.share){
      navigator.share({title:"My Istanbul Plan",text}).catch(()=>{});
    }else{
      navigator.clipboard?.writeText(text);
      alert("Plan copied to clipboard!");
    }
  };

  const toggleFav=id=>{
    const s=new Set(favs);
    s.has(id)?s.delete(id):s.add(id);
    setFavs(s);
    localStorage.setItem("favs",JSON.stringify([...s]));
  };
  const doCopy=(text,id)=>{navigator.clipboard?.writeText(text).catch(()=>{});setCopied(id);setTimeout(()=>setCopied(null),1500)};
  const goTab=t=>{setTab(t);setInfoPage(null);setGuideId(null)};
  const cats=["All",...[...new Set(ATT.map(a=>a.cat))]];
  const filteredATT=bookFilter==="All"?ATT:ATT.filter(a=>a.cat===bookFilter);
  const activeGuide=guideId?GUIDES.find(g=>g.id===guideId):null;

  // ═══ ONBOARDING ═══
  if(!boarded){
    const Skip = () => <div onClick={()=>{setBoarded(true);setPlanStep(0)}} style={{textAlign:"center",marginTop:12,fontSize:13,color:T.inkMute,cursor:"pointer"}}>Skip for now</div>;
    const steps=[
      <div key={0} style={{textAlign:"center",padding:"60px 24px 40px"}}>
        <div style={{fontSize:48,marginBottom:16}}>🌊</div>
        <div style={{fontFamily:fd,fontSize:28,fontWeight:800,letterSpacing:"-0.03em",color:T.ink}}>Welcome to Istanbul</div>
        <div style={{fontSize:14,color:T.inkSoft,marginTop:8,lineHeight:1.6}}>Your smart city companion — from landing to last dinner.</div>
        <div onClick={()=>setObStep(1)} style={{marginTop:32,background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer"}}>Let's build your trip</div>
        <Skip/>
      </div>,
      <div key={1} style={{padding:"40px 24px"}}>
        <Lbl>Step 1 of 3</Lbl>
        <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>How many days do you have?</div>
        <div style={{fontSize:13,color:T.inkMute,marginBottom:32}}>Slide to choose — 1 to 7 days.</div>
        {/* Big number */}
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:72,fontWeight:800,color:T.dark,fontFamily:fd,lineHeight:1,letterSpacing:"-0.04em"}}>{obDays}</div>
          <div style={{fontSize:13,fontWeight:600,color:T.inkMute,marginTop:4}}>{obDays===1?"day":"days"} in Istanbul</div>
        </div>
        {/* Slider */}
        <div style={{padding:"0 8px",marginBottom:32}}>
          <input
            type="range"
            min="1"
            max="7"
            value={obDays}
            onChange={(e)=>setObDays(parseInt(e.target.value))}
            style={{width:"100%",height:8,borderRadius:4,background:`linear-gradient(to right, ${T.primary} 0%, ${T.primary} ${((obDays-1)/6)*100}%, ${T.line} ${((obDays-1)/6)*100}%, ${T.line} 100%)`,appearance:"none",WebkitAppearance:"none",outline:"none",cursor:"pointer"}}
          />
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none; -webkit-appearance: none;
              width: 28px; height: 28px; border-radius: 14px;
              background: ${T.dark}; cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              border: 3px solid white;
            }
            input[type="range"]::-moz-range-thumb {
              width: 28px; height: 28px; border-radius: 14px;
              background: ${T.dark}; cursor: pointer;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
          `}</style>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10,fontSize:10,color:T.inkMute,fontWeight:600}}>
            {[1,2,3,4,5,6,7].map(d=><span key={d} style={{color:d===obDays?T.primary:T.inkMute}}>{d}</span>)}
          </div>
        </div>
        <div onClick={()=>setObStep(2)} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}}>Continue</div>
        <Skip/>
      </div>,
      <div key={2} style={{padding:"40px 24px"}}>
        <Lbl>Step 2 of 3</Lbl>
        <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>What's your pace?</div>
        <div style={{fontSize:13,color:T.inkMute,marginBottom:24}}>How much do you want to squeeze into a day?</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
          {PACES.map(p=><div key={p.id} onClick={()=>setObPace(p.id)} style={{borderRadius:18,padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,background:obPace===p.id?T.dark:"white",color:obPace===p.id?"white":T.ink,boxShadow:obPace===p.id?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}>
            <div style={{fontSize:26}}>{p.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700}}>{p.label}</div>
              <div style={{fontSize:12,opacity:0.6,marginTop:2}}>{p.desc}</div>
            </div>
            {obPace===p.id&&<Check size={18} color={T.gold}/>}
          </div>)}
        </div>
        <div onClick={()=>obPace&&setObStep(3)} style={{background:obPace?T.primary:T.line,color:obPace?"white":T.inkMute,padding:"14px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:obPace?"pointer":"default",textAlign:"center"}}>Continue</div>
        <Skip/>
      </div>,
      <div key={3} style={{padding:"40px 24px"}}>
        <Lbl>Step 3 of 3</Lbl>
        <div style={{fontFamily:fd,fontSize:24,fontWeight:800,color:T.ink,marginBottom:8}}>What excites you?</div>
        <div style={{fontSize:13,color:T.inkMute,marginBottom:24}}>Pick one or more — we'll mix them into your plan.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:32}}>
          {INTERESTS.map(i=>{const on=obInterests.includes(i.id);return<div key={i.id} onClick={()=>setObInterests(on?obInterests.filter(x=>x!==i.id):[...obInterests,i.id])} style={{borderRadius:18,padding:"16px 14px",cursor:"pointer",background:on?T.dark:"white",color:on?"white":T.ink,boxShadow:on?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`,position:"relative"}}>
            <div style={{fontSize:24,marginBottom:6}}>{i.icon}</div>
            <div style={{fontSize:12,fontWeight:700,lineHeight:1.3}}>{i.label}</div>
            {on&&<div style={{position:"absolute",top:10,right:10,width:18,height:18,borderRadius:9,background:T.gold,display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={11} color={T.dark}/></div>}
          </div>})}
        </div>
        <div onClick={()=>{
          // Plan'ı hemen oluştur
          const result = generatePlan({days:obDays,pace:obPace||"balanced",interests:obInterests,timedTickets,tripStartDate});
          setPlanDays(obDays);
          setPlanPace(obPace||"balanced");
          setPlanInterests(obInterests);
          setPlanResult(result);
          setPlanStep(4);
          setActiveDay(1);
          setBoarded(true);
          setTab("plan");
        }} style={{background:T.dark,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Sparkles size={16}/>Build my trip
        </div>
        <Skip/>
      </div>,
    ];
    return(<div style={{minHeight:"100vh",background:isPWA?T.dark:"radial-gradient(circle at top,#eaf2ff 0%,#f5f7fb 35%)",padding:isPWA?0:16,fontFamily:fi}}><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/><div style={{maxWidth:isPWA?"100%":440,margin:"0 auto",borderRadius:isPWA?0:34,border:isPWA?"none":"1px solid rgba(255,255,255,0.7)",background:"white",boxShadow:isPWA?"none":T.sh.hero,overflow:"hidden",display:"flex",flexDirection:"column",height:isPWA?"100vh":"calc(100vh - 32px)",paddingTop:isPWA?"env(safe-area-inset-top)":0,paddingBottom:isPWA?"env(safe-area-inset-bottom)":0}}>{obStep>0&&<div style={{padding:"16px 24px 0",display:"flex",gap:6,flexShrink:0}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=obStep?T.primary:T.line}}/>)}</div>}<div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",justifyContent:"center"}}>{steps[obStep]}</div></div></div>);
  }

  // ═══ MAIN ═══
  return(
    <div style={{minHeight:"100vh",background:isPWA?T.dark:"radial-gradient(circle at top,#eaf2ff 0%,#f5f7fb 35%)",padding:isPWA?0:16,fontFamily:fi}}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:isPWA?"100%":440,margin:"0 auto",borderRadius:isPWA?0:34,border:isPWA?"none":"1px solid rgba(255,255,255,0.7)",background:"white",boxShadow:isPWA?"none":T.sh.hero,overflow:"hidden",position:"relative",display:"flex",flexDirection:"column",height:isPWA?"100vh":"calc(100vh - 32px)",paddingTop:isPWA?"env(safe-area-inset-top)":0,paddingBottom:isPWA?"env(safe-area-inset-bottom)":0}}>

        {/* HEADER */}
        <div style={{position:"relative",overflow:"hidden",background:`linear-gradient(180deg,${T.dark} 0%,#16233B 58%,#1A2B45 100%)`,padding:"32px 20px 20px",color:"white"}}>
          <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"20px 20px",pointerEvents:"none"}}/>
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:24,fontWeight:800,letterSpacing:"-0.04em",fontFamily:fd}}>Istanbul</span><span style={{background:"rgba(255,255,255,0.1)",padding:"4px 8px",borderRadius:99,fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#BFDBFE"}}>GO</span></div><div style={{marginTop:4,fontSize:11,textTransform:"uppercase",letterSpacing:"0.14em",color:"rgba(255,255,255,0.35)"}}>{t("header.subtitle")}</div></div><div style={{display:"flex",gap:8}}>{favs.size>0&&<div onClick={()=>goTab("trip")} style={{position:"relative",width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={17} color="#FCA5A5" fill="#FCA5A5"/><div style={{position:"absolute",top:-2,right:-2,width:16,height:16,borderRadius:8,background:T.danger,fontSize:9,fontWeight:800,color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{favs.size}</div></div>}<div onClick={()=>setLangOpen(true)} style={{width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16}}>{LANGUAGES.find(l=>l.code===lang)?.flag||"🌐"}</div><div onClick={()=>setMenuOpen(true)} style={{width:40,height:40,borderRadius:16,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Menu size={18} color="rgba(255,255,255,0.85)"/></div></div></div>
          {/* Search bar - inline input */}
          <div style={{position:"relative",zIndex:5,marginTop:18}}>
            <div style={{display:"flex",alignItems:"center",gap:10,background:"white",padding:"14px 16px",borderRadius:16}}>
              <Search size={17} color={T.inkMute}/>
              <input
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                onFocus={()=>setSearchFocused(true)}
                placeholder={t("header.search")}
                style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:14,color:T.ink,fontFamily:fi}}
              />
              {(searchQuery||searchFocused)&&<div onClick={()=>{setSearchQuery("");setSearchFocused(false);document.activeElement?.blur()}} style={{width:22,height:22,borderRadius:11,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={12} color={T.inkSoft}/></div>}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{flex:1,overflowY:"auto",background:`linear-gradient(180deg,#F8FBFF 0%,${T.bg} 24%)`,padding:"20px 20px 140px",position:"relative"}}>

          {/* Search results overlay */}
          {searchFocused&&(()=>{
            const ql=searchQuery.toLowerCase().trim();
            const hasQ=ql.length>=1;
            const matchedAtt=hasQ?ATT.filter(a=>[a.title,a.cat,a.area,a.hook,a.teaser,a.badge].join(" ").toLowerCase().includes(ql)).slice(0,6):[];
            const matchedGuide=hasQ?GUIDES.filter(g=>[g.title,g.sub].join(" ").toLowerCase().includes(ql)).slice(0,3):[];
            const quickActions=[
              {id:"plan",label:t("home.smartPlan"),desc:t("menu.buildItinerary"),kw:["plan","itinerary","trip","day","route","plan","program","gün"]},
              {id:"transport",label:t("menu.publicTransport"),desc:t("home.transportSub"),kw:["transport","metro","tram","ferry","bus","istanbulkart","card","ulaşım"]},
              {id:"esim",label:t("menu.esimData"),desc:t("home.esimSub"),kw:["esim","data","internet","wifi","sim"]},
              {id:"book",label:t("menu.ticketsTours"),desc:t("menu.ticketsToursSub"),kw:["ticket","book","tour","bilet"]},
              {id:"trip",label:t("trip.title"),desc:t("trip.subtitle"),kw:["saved","favorites","wallet","my","trip"]},
            ];
            const matchedQA=hasQ?quickActions.filter(qa=>[qa.label,qa.desc,...qa.kw].join(" ").toLowerCase().includes(ql)).slice(0,3):[];
            const noResults=hasQ&&matchedAtt.length===0&&matchedGuide.length===0&&matchedQA.length===0;
            const popular=["Hagia Sophia","Food tour","Transport","Hidden gems","eSIM"];

            return(
              <>
                <div onMouseDown={()=>{setSearchFocused(false);setSearchQuery("")}} style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.6)",backdropFilter:"blur(2px)",zIndex:10}}/>
                <div style={{position:"absolute",top:12,left:20,right:20,background:"white",borderRadius:20,boxShadow:"0 12px 40px rgba(15,23,42,0.2)",border:`1px solid ${T.line}`,maxHeight:"calc(100% - 24px)",overflowY:"auto",color:T.ink,padding:"12px 0",zIndex:11}}>

                  {/* Empty state */}
                  {!hasQ&&<div style={{padding:"8px 16px 14px"}}>
                    <div style={{fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>✨ {t("misc.popularSearches")}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {popular.map(p=><div key={p} onMouseDown={(e)=>{e.preventDefault();e.stopPropagation();setSearchQuery(p)}} style={{padding:"8px 14px",borderRadius:99,background:"#F1F5F9",fontSize:12,fontWeight:600,color:T.inkSoft,cursor:"pointer"}}>{p}</div>)}
                    </div>
                    <div style={{fontSize:11,color:T.inkMute,marginTop:14,lineHeight:1.6}}>{t("misc.tryHints")}</div>
                  </div>}

                  {/* No results */}
                  {noResults&&<div style={{padding:"24px 14px",textAlign:"center"}}>
                    <Search size={28} color={T.line} style={{margin:"0 auto 10px"}}/>
                    <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{t("misc.noResultsFor")} "{searchQuery}"</div>
                    <div style={{fontSize:11,color:T.inkMute}}>{t("misc.tryDifferent")}</div>
                  </div>}

                  {/* Places */}
                  {matchedAtt.length>0&&<div>
                    <div style={{padding:"4px 16px 6px",fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em"}}>🏛️ {t("misc.places")} · {matchedAtt.length}</div>
                    {matchedAtt.map(a=><div key={a.id} onMouseDown={(e)=>{e.preventDefault();e.stopPropagation();setPreviewAtt(a);setSearchQuery("");setSearchFocused(false);document.activeElement?.blur()}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",cursor:"pointer",borderBottom:`1px solid ${T.line}`}}>
                      <img src={a.img} alt={a.title} style={{width:40,height:40,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700}}>{a.title}</div>
                        <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{a.cat} · {a.area} {a.price>0?`· €${a.price}`:`· ${t("card.free")}`}</div>
                      </div>
                      <ChevronRight size={14} color={T.inkMute}/>
                    </div>)}
                  </div>}

                  {/* Guides */}
                  {matchedGuide.length>0&&<div>
                    <div style={{padding:"8px 16px 6px",fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em"}}>📖 {t("home.guides")} · {matchedGuide.length}</div>
                    {matchedGuide.map(g=><div key={g.id} onMouseDown={(e)=>{e.preventDefault();e.stopPropagation();goTab("explore");setGuideId(g.id);setSearchQuery("");setSearchFocused(false);document.activeElement?.blur()}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",cursor:"pointer",borderBottom:`1px solid ${T.line}`}}>
                      <div style={{width:36,height:36,borderRadius:10,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{g.emoji}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700}}>{t(GUIDE_KEYS[g.id]?.title||"")||g.title}</div>
                        <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{t(GUIDE_KEYS[g.id]?.sub||"")||g.sub}</div>
                      </div>
                      <ChevronRight size={14} color={T.inkMute}/>
                    </div>)}
                  </div>}

                  {/* Quick actions */}
                  {matchedQA.length>0&&<div>
                    <div style={{padding:"8px 16px 6px",fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em"}}>🧭 {t("home.quickAccess")} · {matchedQA.length}</div>
                    {matchedQA.map(qa=><div key={qa.id} onMouseDown={(e)=>{e.preventDefault();e.stopPropagation();if(qa.id==="transport")setTransOpen(true);else if(qa.id==="esim")setEsimOpen(true);else goTab(qa.id);setSearchQuery("");setSearchFocused(false);document.activeElement?.blur()}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",cursor:"pointer"}}>
                      <div style={{width:36,height:36,borderRadius:10,background:T.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Compass size={16} color={T.primary}/></div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700}}>{qa.label}</div>
                        <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{qa.desc}</div>
                      </div>
                      <ChevronRight size={14} color={T.inkMute}/>
                    </div>)}
                  </div>}
                </div>
              </>
            );
          })()}

          {/* ── HOME ── */}
          {tab==="home"&&!infoPage&&<>
            {planResult&&<div onClick={()=>{goTab("plan");setPlanStep(4)}} style={{overflow:"hidden",borderRadius:24,marginBottom:24,cursor:"pointer",position:"relative",background:`linear-gradient(135deg,${T.dark},#16233B)`,padding:20,color:"white"}}><div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"18px 18px"}}/><div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}><div style={{width:52,height:52,borderRadius:18,background:"rgba(29,78,216,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Sparkles size={22} color={T.gold} strokeWidth={1.5}/></div><div style={{flex:1}}><div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.12em",color:T.gold,marginBottom:4}}>{t("plan.yourPlan")}</div><div style={{fontSize:16,fontWeight:700}}>{planDays} {planDays===1?t("plan.dayInIstanbul"):t("plan.daysInIstanbul")}</div></div><ChevronRight size={20} color="rgba(255,255,255,0.3)"/></div></div>}

            {/* Quick Actions */}
            {/* Quick access — visual hero + grid */}
            <div style={{marginBottom:28}}>
              <Lbl>{t("home.quickAccess")}</Lbl>
              <Hd>{t("home.everythingYouNeed")}</Hd>

              {/* HERO — Smart Plan */}
              <div onClick={()=>goTab("plan")} style={{position:"relative",borderRadius:28,overflow:"hidden",cursor:"pointer",marginBottom:14,height:220}}>
                <img src="/qa-hero-plan.jpg" alt="Smart Plan" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(11,18,32,0.75) 0%, rgba(11,18,32,0.2) 50%, transparent 100%)"}}/>
                {/* Badge */}
                <div style={{position:"absolute",top:14,left:14,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(10px)",padding:"5px 12px",borderRadius:99,fontSize:11,fontWeight:700,color:T.dark}}>{t("badge.new")}</div>
                {/* Content */}
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:18}}>
                  <div style={{fontSize:24,fontWeight:800,color:"white",fontFamily:fd,letterSpacing:"-0.03em"}}>{t("home.smartPlan")}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.85)",marginTop:4,lineHeight:1.4}}>{t("home.smartPlanSub")}</div>
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:12,padding:"8px 14px",borderRadius:99,background:"white",fontSize:12,fontWeight:700,color:T.dark}}>
                    <Sparkles size={12}/>{t("home.startPlanning")} →
                  </div>
                </div>
              </div>

              {/* GRID — 6 cards 3×2 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[
                  {title:t("home.tickets"),sub:t("home.ticketsSub"),img:"/qa-tickets.jpg",badge:t("badge.popular"),tap:()=>goTab("book")},
                  {title:t("home.transport"),sub:t("home.transportSub"),img:"/qa-transport.jpg",badge:t("badge.essential"),tap:()=>setTransOpen(true)},
                  {title:t("home.esim"),sub:t("home.esimSub"),img:"/qa-esim.jpg",badge:t("badge.travelHack"),tap:()=>setEsimOpen(true)},
                  {title:t("home.guides"),sub:t("home.guidesSub"),img:"/qa-guides.jpg",badge:t("badge.editorsPick"),tap:()=>goTab("explore")},
                  {title:t("home.airport"),sub:t("home.airportSub"),img:"/qa-airport.jpg",badge:t("badge.arrival"),tap:()=>setInfoPage("airport")},
                  {title:t("home.weather"),sub:t("home.weatherSub"),img:"/qa-weather.jpg",badge:t("badge.live"),tap:()=>setInfoPage("live")},
                ].map(c=>(
                  <div key={c.title} onClick={c.tap} style={{position:"relative",aspectRatio:"1",borderRadius:20,overflow:"hidden",cursor:"pointer"}}>
                    <img src={c.img} alt={c.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(11,18,32,0.82) 0%, rgba(11,18,32,0.15) 55%, transparent 100%)"}}/>
                    {/* Badge */}
                    <div style={{position:"absolute",top:8,left:8,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",padding:"3px 8px",borderRadius:99,fontSize:9,fontWeight:700,color:T.dark}}>{c.badge}</div>
                    {/* Content */}
                    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 12px"}}>
                      <div style={{fontSize:13,fontWeight:800,color:"white",fontFamily:fd,letterSpacing:"-0.02em",lineHeight:1.2}}>{c.title}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.78)",marginTop:2,lineHeight:1.3}}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Daily Briefing — premium teaser, subtle ── */}
            {!isPremium && (
              <div onClick={()=>setPremiumOpen(true)} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:28,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:"#FBF5EB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>☀️</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:T.ink}}>{t("home.dailyBriefing")}</div>
                  <div style={{fontSize:11,color:T.inkMute,marginTop:2}}>{t("home.dailyBriefingSub")}</div>
                </div>
                <span style={{fontSize:10,color:"#C59D5F"}}>🔒</span>
              </div>
            )}

            {/* Must-See — horizontal scroll, image tıklanınca mini preview */}
            <div style={{marginBottom:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}><div><Lbl>{t("home.mustSeeSub")}</Lbl><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>{t("home.mustSee")}</div></div><span onClick={()=>{goTab("explore");setGuideId("must-see")}} style={{fontSize:12,fontWeight:600,color:T.primary,cursor:"pointer"}}>{t("home.openGuide")} →</span></div>
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
                    <div><div style={{fontSize:11,color:T.inkMute}}>{t("card.from")}</div><div style={{fontSize:18,fontWeight:800}}>€{a.price}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span onClick={()=>setDetailAtt(a)} style={{fontSize:11,fontWeight:600,color:T.primary,cursor:"pointer",borderBottom:`1px solid ${T.primarySoft}`}}>{t("card.details")}</span>
                      <div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{display:"flex",alignItems:"center",gap:4,height:36,padding:"0 14px",borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 8px rgba(29,78,216,0.2)"}}>{t("card.book")}</div>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>

            {/* Hidden Gems */}
            <div style={{marginBottom:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}><div><Lbl>{t("home.hiddenGemsSub")}</Lbl><div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",fontFamily:fd}}>{t("home.hiddenGems")}</div></div><span onClick={()=>{goTab("explore");setGuideId("hidden-gems")}} style={{fontSize:12,fontWeight:600,color:T.primary,cursor:"pointer"}}>{t("home.openGuide")} →</span></div>
              <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginRight:-20}}>
                {["dervish","balat","pierreloti","camlica","cooking","ortakoy"].map(id=>ATT.find(a=>a.id===id)).filter(Boolean).map(a=><div key={a.id} style={{minWidth:220,overflow:"hidden",borderRadius:22,border:`1px solid ${T.line}`,background:"white",flexShrink:0}}>
                  <div onClick={()=>setPreviewAtt(a)} style={{position:"relative",height:140,overflow:"hidden",cursor:"pointer"}}>
                    <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.55),transparent 50%)"}}/>
                    <div style={{position:"absolute",left:10,top:10}}><Pill tone="rgba(255,255,255,0.9)" color={T.dark}>{a.badge}</Pill></div>
                    <div style={{position:"absolute",bottom:10,left:10}}><div style={{fontSize:14,fontWeight:700,color:"white"}}>{a.title}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:1}}>{a.cat}</div></div>
                    <div onClick={e=>{e.stopPropagation();toggleFav(a.id)}} style={{position:"absolute",top:10,right:10,width:28,height:28,borderRadius:10,background:favs.has(a.id)?"rgba(225,29,72,0.9)":"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={12} color="white" fill={favs.has(a.id)?"white":"none"}/></div>
                  </div>
                  <div style={{padding:"10px 12px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:11,color:T.inkMute}}>{t("card.from")}</div><div style={{fontSize:18,fontWeight:800}}>€{a.price}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span onClick={()=>setDetailAtt(a)} style={{fontSize:11,fontWeight:600,color:T.primary,cursor:"pointer",borderBottom:`1px solid ${T.primarySoft}`}}>{t("card.details")}</span>
                      <div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{display:"flex",alignItems:"center",gap:4,height:36,padding:"0 14px",borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 8px rgba(29,78,216,0.2)"}}>{t("card.book")}</div>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>

            {/* eSIM */}
            <div style={{borderRadius:20,background:T.dark,padding:"16px 18px",marginBottom:28,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={()=>setEsimOpen(true)}><div style={{width:44,height:44,borderRadius:14,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}><Wifi size={20} color="#A78BFA"/></div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:"white"}}>{t("menu.esimDataSub")}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:2}}>{t("home.esimSub")} — €4.99</div></div><ChevronRight size={16} color="rgba(255,255,255,0.3)"/></div>

            {/* Info Cards */}
            <Lbl>{t("home.localFriend")}</Lbl><Hd>{t("home.knowBefore")}</Hd>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{[{k:"airport",Icon:Plane,t:t("info.airport"),d:t("info.airportSub")},{k:"money",Icon:Wallet,t:t("info.money"),d:t("info.moneySub")},{k:"phrases",Icon:Languages,t:t("info.phrases"),d:t("info.phrasesSub")},{k:"safety",Icon:ShieldCheck,t:t("info.safety"),d:t("info.safetySub")},{k:"esim",Icon:Smartphone,t:t("home.esim"),d:t("home.esimSub")},{k:"live",Icon:Globe,t:t("info.live"),d:t("info.liveSub")}].map(c=><div key={c.k} onClick={()=>c.k==="esim"?setEsimOpen(true):setInfoPage(c.k)} style={{borderRadius:22,border:`1px solid ${T.line}`,background:"white",padding:16,cursor:"pointer"}}><div style={{width:44,height:44,borderRadius:16,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><c.Icon size={20} color={T.ink} strokeWidth={1.7}/></div><div style={{fontSize:14,fontWeight:700}}>{c.t}</div><div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{c.d}</div><div style={{marginTop:8,fontSize:12,fontWeight:600,color:T.primary,display:"flex",alignItems:"center",gap:4}}>{t("btn.open")}<ChevronRight size={12}/></div></div>)}</div>
          </>}

          {/* ── INFO PAGES ── */}
          {tab==="home"&&infoPage==="airport"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>{t("info.airportGuide")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("info.airportTitle")}</div></div></div>{[{Icon:Car,t:t("info.airport.private.name"),d:t("info.airport.private.desc"),p:t("info.airport.private.price"),b:t("info.airport.private.badge"),tone:T.primarySoft,ac:T.primary},{Icon:Bus,t:t("info.airport.bus.name"),d:t("info.airport.bus.desc"),p:t("info.airport.bus.price"),b:t("info.airport.bus.badge"),tone:T.okSoft,ac:T.ok},{Icon:Train,t:t("info.airport.metro.name"),d:t("info.airport.metro.desc"),p:t("info.airport.metro.price"),b:t("info.airport.metro.badge"),tone:T.warnSoft,ac:T.warn}].map(o=><div key={o.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14}}><div style={{width:52,height:52,borderRadius:16,background:o.tone,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><o.Icon size={22} color={o.ac}/></div><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:15,fontWeight:700}}>{o.t}</span><span style={{fontSize:9,fontWeight:600,background:o.tone,color:o.ac,padding:"2px 7px",borderRadius:6}}>{o.b}</span></div><div style={{fontSize:12,color:T.inkMute}}>{o.d}</div></div><div style={{fontSize:18,fontWeight:800}}>{o.p}</div></div>)}</div>}
          {tab==="home"&&infoPage==="phrases"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>{t("info.airportGuide")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("info.phrasesTitle")}</div></div></div>{[{title:t("info.phrases.essentials"),phrases:[{en:t("info.phrases.hello"),tr:"Merhaba",pr:"mer-HA-ba"},{en:t("info.phrases.thanks"),tr:"Teşekkürler",pr:"teh-shek-KOOR-ler"},{en:t("info.phrases.yesno"),tr:"Evet / Hayır",pr:"eh-VET / ha-YIR"},{en:t("info.phrases.please"),tr:"Lütfen",pr:"LOOT-fen"},{en:t("info.phrases.howmuch"),tr:"Ne kadar?",pr:"neh ka-DAR"},{en:t("info.phrases.check"),tr:"Hesap lütfen",pr:"heh-SAP loot-FEN"}]}].map(g=><div key={g.title} style={{marginBottom:20}}><div style={{fontSize:13,fontWeight:700,marginBottom:10}}>{g.title}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{g.phrases.map((p,i)=>{const id=g.title+i;const cp=copied===id;return<div key={i} onClick={()=>doCopy(p.tr,id)} style={{borderRadius:16,background:cp?T.okSoft:"white",border:`1px solid ${cp?T.ok+"40":T.line}`,padding:"12px 14px",cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:T.inkMute}}>{p.en}</span>{cp?<Check size={12} color={T.ok}/>:<Copy size={12} color={T.inkMute}/>}</div><div style={{fontSize:16,fontWeight:700}}>{p.tr}</div><div style={{fontSize:10,color:T.inkMute,marginTop:2,fontStyle:"italic"}}>{p.pr}</div></div>})}</div></div>)}</div>}
          {tab==="home"&&infoPage==="safety"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>{t("info.airportGuide")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("info.safetyTitle")}</div></div></div>{[{t:t("info.safety.shoe.t"),d:t("info.safety.shoe.d"),a:t("info.safety.shoe.a")},{t:t("info.safety.bar.t"),d:t("info.safety.bar.d"),a:t("info.safety.bar.a")},{t:t("info.safety.taxi.t"),d:t("info.safety.taxi.d"),a:t("info.safety.taxi.a")}].map(s=><div key={s.t} style={{borderRadius:18,background:T.dangerSoft,padding:16,marginBottom:10,borderLeft:`4px solid ${T.danger}`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><AlertTriangle size={14} color={T.danger}/><span style={{fontSize:14,fontWeight:700}}>{s.t}</span></div><div style={{fontSize:12,color:T.inkSoft,marginBottom:8}}>{s.d}</div><div style={{fontSize:12,fontWeight:600,color:T.ok,display:"flex",alignItems:"center",gap:4}}><CheckCircle size={12}/>{s.a}</div></div>)}</div>}
          {tab==="home"&&infoPage==="live"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>Live</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>City Info</div></div></div><WeatherWidget/></div>}
          {tab==="home"&&infoPage==="money"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setInfoPage(null)}/><div><Lbl>{t("info.airportGuide")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("info.moneyTitle")}</div></div></div>{[{Icon:Wallet,t:t("info.money.currency.t"),d:t("info.money.currency.d")},{Icon:CreditCard,t:t("info.money.cards.t"),d:t("info.money.cards.d")},{Icon:Star,t:t("info.money.haggle.t"),d:t("info.money.haggle.d")}].map(c=><div key={c.t} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:16,marginBottom:12,display:"flex",gap:14}}><div style={{width:44,height:44,borderRadius:14,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><c.Icon size={20} color={T.ink}/></div><div><div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{c.t}</div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.55}}>{c.d}</div></div></div>)}</div>}

          {/* ── PLAN ── */}
          {tab==="plan"&&<div>
            {/* STEP 0: Intro */}
            {planStep===0&&<div>
              <div style={{overflow:"hidden",borderRadius:28,background:`linear-gradient(135deg,${T.dark},#16233B)`,padding:"40px 24px",color:"white",textAlign:"center",marginBottom:20}}>
                <Sparkles size={40} color={T.gold} strokeWidth={1.2} style={{margin:"0 auto 16px"}}/>
                <div style={{fontFamily:fd,fontSize:26,fontWeight:800,marginBottom:8}}>{t("plan.title")}</div>
                <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>{t("plan.subtitle")}</div>
              </div>
              <div onClick={()=>{setPlanStep(1);setPlanDays(null);setPlanPace(null);setPlanInterests([]);setPlanResult(null)}} style={{background:T.primary,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <Sparkles size={16}/>{t("plan.startPlanning")}
              </div>
              {/* Free teaser */}
              <div style={{marginTop:24,padding:16,borderRadius:18,background:"#F8FAFC",border:`1px solid ${T.line}`}}>
                <div style={{fontSize:12,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{t("onboard.what")}</div>
                {[t("plan.benefit1"),t("plan.benefit2"),t("plan.benefit3"),t("plan.benefit4")].map((f,i)=><div key={i} style={{display:"flex",gap:8,fontSize:13,color:T.inkSoft,padding:"3px 0"}}><Check size={14} color={T.ok}/>{f}</div>)}
              </div>
            </div>}

            {/* STEP 1: Days */}
            {planStep===1&&<div>
              <div onClick={()=>setPlanStep(0)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>{t("btn.back")}</div>
              <Lbl>{t("plan.step")} 1 {t("plan.of")} 3</Lbl>
              <div style={{fontFamily:fd,fontSize:24,fontWeight:800,marginBottom:8}}>{t("plan.whenGoing")}</div>
              <div style={{fontSize:13,color:T.inkMute,marginBottom:20}}>{t("plan.whenGoingSub")}</div>

              {/* Date picker */}
              <div style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{t("plan.arrivalDate")}</div>
                <input
                  type="date"
                  value={tripStartDate||""}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e)=>saveTripStartDate(e.target.value)}
                  style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1px solid ${tripStartDate?T.primary:T.line}`,background:tripStartDate?T.primarySoft:"white",fontSize:15,fontWeight:700,color:T.ink,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}
                />
                {tripStartDate&&<div style={{marginTop:6,fontSize:11,color:T.primary,fontWeight:600}}>{new Date(tripStartDate).toLocaleDateString(lang==="ar"?"ar-SA":lang,{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>}
              </div>

              {/* Days */}
              <div style={{fontSize:11,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{t("plan.howManyDays")}</div>
              <div style={{textAlign:"center",marginBottom:16}}>
                <div style={{fontSize:64,fontWeight:800,color:T.dark,fontFamily:fd,lineHeight:1,letterSpacing:"-0.04em"}}>{planDays||3}</div>
                <div style={{fontSize:12,fontWeight:600,color:T.inkMute,marginTop:4}}>{(planDays||3)===1?t("plan.dayInIstanbul"):t("plan.daysInIstanbul")}</div>
              </div>
              {/* Slider */}
              <div style={{padding:"0 8px",marginBottom:24}}>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={planDays||3}
                  onChange={(e)=>setPlanDays(parseInt(e.target.value))}
                  style={{width:"100%",height:8,borderRadius:4,background:`linear-gradient(to right, ${T.primary} 0%, ${T.primary} ${(((planDays||3)-1)/6)*100}%, ${T.line} ${(((planDays||3)-1)/6)*100}%, ${T.line} 100%)`,appearance:"none",WebkitAppearance:"none",outline:"none",cursor:"pointer"}}
                />
                <div style={{display:"flex",justifyContent:"space-between",marginTop:10,fontSize:10,color:T.inkMute,fontWeight:600}}>
                  {[1,2,3,4,5,6,7].map(d=><span key={d} style={{color:d===(planDays||3)?T.primary:T.inkMute}}>{d}</span>)}
                </div>
              </div>
              <div onClick={()=>{if(!planDays)setPlanDays(3);setPlanStep(2)}} style={{background:T.primary,color:"white",padding:"14px 0",borderRadius:16,fontWeight:700,textAlign:"center",cursor:"pointer"}}>{t("btn.continue")}</div>
            </div>}

            {/* STEP 2: Pace */}
            {planStep===2&&<div>
              <div onClick={()=>setPlanStep(1)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>{t("btn.back")}</div>
              <Lbl>{t("plan.step")} 2 {t("plan.of")} 3</Lbl>
              <div style={{fontFamily:fd,fontSize:24,fontWeight:800,marginBottom:8}}>{t("plan.whatsPace")}</div>
              <div style={{fontSize:13,color:T.inkMute,marginBottom:24}}>{t("plan.paceSubtitle")}</div>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
                {PACES.map(p=>{const label=t(`plan.${p.id}`);const desc=t(`plan.${p.id}Desc`);return(<div key={p.id} onClick={()=>setPlanPace(p.id)} style={{borderRadius:18,padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,background:planPace===p.id?T.dark:"white",color:planPace===p.id?"white":T.ink,boxShadow:planPace===p.id?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`}}>
                  <div style={{fontSize:26}}>{p.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700}}>{label}</div>
                    <div style={{fontSize:12,opacity:0.6,marginTop:2}}>{desc}</div>
                  </div>
                  {planPace===p.id&&<Check size={18} color={T.gold}/>}
                </div>)})}
              </div>
              <div onClick={()=>planPace&&setPlanStep(3)} style={{background:planPace?T.primary:T.line,color:planPace?"white":T.inkMute,padding:"14px 0",borderRadius:16,fontWeight:700,textAlign:"center",cursor:planPace?"pointer":"default"}}>{t("btn.continue")}</div>
            </div>}

            {/* STEP 3: Interests (multi-select) */}
            {planStep===3&&<div>
              <div onClick={()=>setPlanStep(2)} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:T.inkMute,cursor:"pointer",marginBottom:16}}><ArrowLeft size={14}/>{t("btn.back")}</div>
              <Lbl>{t("plan.step")} 3 {t("plan.of")} 3</Lbl>
              <div style={{fontFamily:fd,fontSize:24,fontWeight:800,marginBottom:8}}>{t("plan.interests")}</div>
              <div style={{fontSize:13,color:T.inkMute,marginBottom:24}}>{t("plan.interestsSub")}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:32}}>
                {INTERESTS.map(i=>{const on=planInterests.includes(i.id);const intKey={history:"interestHistory",food:"interestFood",views:"interestViews",shopping:"interestShopping",water:"interestWater",family:"interestFamily"}[i.id]||"interestHistory";const label=t(`plan.${intKey}`);return<div key={i.id} onClick={()=>setPlanInterests(on?planInterests.filter(x=>x!==i.id):[...planInterests,i.id])} style={{borderRadius:18,padding:"16px 14px",cursor:"pointer",background:on?T.dark:"white",color:on?"white":T.ink,boxShadow:on?"0 6px 20px rgba(11,18,32,0.2)":`0 0 0 1px ${T.line}`,position:"relative"}}>
                  <div style={{fontSize:24,marginBottom:6}}>{i.icon}</div>
                  <div style={{fontSize:12,fontWeight:700,lineHeight:1.3}}>{label}</div>
                  {on&&<div style={{position:"absolute",top:10,right:10,width:18,height:18,borderRadius:9,background:T.gold,display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={11} color={T.dark}/></div>}
                </div>})}
              </div>
              <div onClick={()=>{const result=generatePlan({days:planDays,pace:planPace,interests:planInterests,timedTickets,tripStartDate});setPlanResult(result);setPlanStep(4);setActiveDay(1)}} style={{background:T.dark,color:"white",padding:"16px 0",borderRadius:16,fontWeight:700,textAlign:"center",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <Sparkles size={16}/>{t("plan.buildPlan")}
              </div>
            </div>}

            {/* STEP 4: Result */}
            {planStep===4&&planResult&&<>
              <ItineraryMap
                planResult={planResult}
                allAttractions={ATT}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                onOpenAttraction={(att)=>setDetailAtt(att)}
                onPreview={(att)=>setPreviewAtt(att)}
                onBook={handleBook}
                onRebuild={()=>setPlanStep(0)}
                onBack={()=>setPlanStep(0)}
                myTickets={myTickets}
                onToggleTicket={toggleTicket}
                onShare={sharePlan}
              />
              {/* Premium upsell */}
              {!isPremium&&<div onClick={()=>setPremiumOpen(true)} style={{borderRadius:22,background:"linear-gradient(135deg,#0B1220,#1D4ED8)",padding:18,marginTop:16,cursor:"pointer",color:"white",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,opacity:0.08,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"14px 14px"}}/>
                <div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:48,height:48,borderRadius:16,background:"rgba(197,157,95,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Sparkles size={22} color={T.gold}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700}}>{t("premium.upsellTitle")}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:3}}>{t("premium.upsellSub")}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:14,padding:"11px 0",borderRadius:14,background:"rgba(197,157,95,0.2)",fontSize:13,fontWeight:700,color:T.gold}}>🔒 {t("premium.unlock")} · €4.99</div>
              </div>}
            </>}
          </div>}

          {/* ── BOOK ── */}
          {tab==="book"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>goTab("home")}/><div><Lbl>{t("book.subtitle")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("book.title")}</div></div></div><div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16}}>{cats.map(c=><div key={c} onClick={()=>setBookFilter(c)} style={{padding:"7px 14px",borderRadius:99,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",background:bookFilter===c?T.dark:"white",color:bookFilter===c?"white":T.inkSoft,border:bookFilter===c?"none":`1px solid ${T.line}`}}>{c==="All"?t("book.all"):t("cat."+c.replace(" ",""))}</div>)}</div><Lbl>{filteredATT.length} {t("book.results")}</Lbl>{filteredATT.map(a=><div key={a.id} onClick={()=>setPreviewAtt(a)} style={{display:"flex",alignItems:"center",gap:12,borderRadius:22,background:"white",border:`1px solid ${myTickets.includes(a.id)?T.ok+"55":T.line}`,padding:12,marginBottom:12,cursor:"pointer",position:"relative"}}>
            <div style={{position:"relative",flexShrink:0}}>
              <img src={a.img} alt={a.title} style={{width:64,height:64,borderRadius:16,objectFit:"cover"}}/>
              {myTickets.includes(a.id)&&<div style={{position:"absolute",bottom:-3,right:-3,width:22,height:22,borderRadius:11,background:T.ok,border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={11} color="white"/></div>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700}}>{a.title}</div>
              <div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{a.cat} · {a.dur}{a.skip?` · ${t("card.skipLine")}`:""}</div>
              <div style={{fontSize:11,color:T.primary,marginTop:6,fontWeight:600,display:"flex",alignItems:"center",gap:3}}>{t("card.details")}<ChevronRight size={11}/></div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
              <div style={{fontSize:18,fontWeight:800}}>€{a.price}</div>
              <div style={{display:"flex",gap:5}}>
                <div onClick={e=>{e.stopPropagation();toggleFav(a.id)}} style={{width:30,height:30,borderRadius:9,background:favs.has(a.id)?T.dangerSoft:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={13} color={favs.has(a.id)?T.danger:T.inkMute} fill={favs.has(a.id)?T.danger:"none"}/></div>
                <div onClick={e=>{e.stopPropagation();toggleTicket(a.id)}} style={{width:30,height:30,borderRadius:9,background:myTickets.includes(a.id)?T.okSoft:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Ticket size={13} color={myTickets.includes(a.id)?T.ok:T.inkMute}/></div>
              </div>
              {myTickets.includes(a.id)?
                <div style={{display:"inline-flex",alignItems:"center",gap:3,padding:"5px 10px",borderRadius:9,background:T.okSoft,color:T.ok,fontSize:11,fontWeight:700}}><Check size={11}/>{t("btn.gotIt")}</div>
                :
                <div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 14px",borderRadius:10,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t("card.book")}</div>
              }
            </div>
          </div>)}</div>}

          {/* ── EXPLORE — Guide Hub ── */}
          {tab==="explore"&&!activeGuide&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>goTab("home")}/><div><Lbl>{t("menu.discover")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("explore.title")}</div></div></div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.6,marginBottom:20}}>{t("explore.subtitle")}</div>{GUIDES.map(g=><div key={g.id} onClick={()=>g.id==="neighborhoods"?setGuideId("neighborhoods"):setGuideId(g.id)} style={{borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}><div style={{fontSize:28,width:44,textAlign:"center"}}>{g.emoji}</div><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700}}>{t(GUIDE_KEYS[g.id]?.title||"")||g.title}</div><div style={{fontSize:12,color:T.inkMute,marginTop:2}}>{t(GUIDE_KEYS[g.id]?.sub||"")||g.sub}</div></div><ChevronRight size={16} color={T.inkMute}/></div>)}
            {/* Premium Picks — subtle */}
            {!isPremium&&<div onClick={()=>setPremiumOpen(true)} style={{borderRadius:16,background:"#F8FAFC",border:`1px solid ${T.line}`,padding:"12px 16px",marginTop:6,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}><span style={{fontSize:18}}>✨</span><div style={{flex:1,fontSize:12,color:T.inkSoft}}>{t("explore.morePremium")}</div><span style={{fontSize:10,color:"#C59D5F"}}>🔒</span></div>}
          </div>}

          {/* Explore — Guide Page */}
          {tab==="explore"&&activeGuide&&activeGuide.id!=="neighborhoods"&&<GuidePage guide={activeGuide} onBack={()=>setGuideId(null)} onPreview={setPreviewAtt} onDetail={setDetailAtt} onFav={toggleFav} favs={favs}/>}

          {/* Explore — Neighborhoods */}
          {tab==="explore"&&guideId==="neighborhoods"&&<div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Bk onClick={()=>setGuideId(null)}/><div><Lbl>{t("misc.popular")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("explore.neighborhoods")}</div></div></div><div style={{fontSize:13,color:T.inkSoft,lineHeight:1.6,marginBottom:20}}>{t("explore.neighborhoodsSub")}.</div>{NEIGHBORHOODS.map(nb=>{const name=t(nb.nKey);const desc=t(nb.dKey);return<div key={nb.nKey} style={{borderRadius:22,background:"white",border:`1px solid ${T.line}`,overflow:"hidden",marginBottom:12}}><div style={{position:"relative",height:100}}><img src={nb.img} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.5),transparent 50%)"}}/><div style={{position:"absolute",bottom:10,left:14,fontSize:16,fontWeight:800,color:"white"}}>{name}</div></div><div style={{padding:"12px 14px",fontSize:12,color:T.inkSoft}}>{desc}</div></div>})}</div>}

          {/* ── TRIP ── */}
          {tab==="trip"&&<div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <Bk onClick={()=>goTab("home")}/>
              <div><Lbl>{t("trip.subtitle")}</Lbl><div style={{fontSize:24,fontWeight:800,fontFamily:fd}}>{t("trip.title")}</div></div>
            </div>

            {/* Tab switcher */}
            <div style={{display:"flex",gap:6,background:"#F1F5F9",padding:4,borderRadius:14,marginBottom:20}}>
              <div onClick={()=>setTripTab("favorites")} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",background:tripTab==="favorites"?"white":"transparent",color:tripTab==="favorites"?T.ink:T.inkMute,boxShadow:tripTab==="favorites"?"0 2px 6px rgba(0,0,0,0.06)":"none"}}>
                <Heart size={14} color={tripTab==="favorites"?T.danger:T.inkMute} fill={tripTab==="favorites"?T.danger:"none"}/>
                {t("trip.favorites")} <span style={{fontSize:11,fontWeight:600,opacity:0.7}}>({favs.size})</span>
              </div>
              <div onClick={()=>setTripTab("tickets")} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",background:tripTab==="tickets"?"white":"transparent",color:tripTab==="tickets"?T.ink:T.inkMute,boxShadow:tripTab==="tickets"?"0 2px 6px rgba(0,0,0,0.06)":"none"}}>
                <Ticket size={14} color={tripTab==="tickets"?T.ok:T.inkMute}/>
                {t("trip.myTickets")} <span style={{fontSize:11,fontWeight:600,opacity:0.7}}>({myTickets.length})</span>
              </div>
            </div>

            {/* ── FAVORITES TAB ── */}
            {tripTab==="favorites"&&<>
              {favs.size===0?
                <div style={{textAlign:"center",padding:"40px 20px",background:"white",borderRadius:22,border:`1px solid ${T.line}`}}>
                  <Heart size={32} color={T.line}/>
                  <div style={{fontSize:14,fontWeight:600,marginTop:12}}>{t("trip.noSaved")}</div>
                  <div style={{fontSize:12,color:T.inkMute,marginTop:4}}>{t("trip.noSavedSub")}</div>
                </div>
                :
                <div style={{marginBottom:20}}>
                  {ATT.filter(a=>favs.has(a.id)).map(a=>
                    <div key={a.id} onClick={()=>setPreviewAtt(a)} style={{display:"flex",alignItems:"center",gap:12,borderRadius:20,background:"white",border:`1px solid ${T.line}`,padding:12,marginBottom:10,cursor:"pointer",position:"relative"}}>
                      <div onClick={(e)=>{e.stopPropagation();toggleFav(a.id)}} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:10,background:T.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 6px rgba(0,0,0,0.15)"}}><X size={10} color="white"/></div>
                      <img src={a.img} alt={a.title} style={{width:52,height:52,borderRadius:14,objectFit:"cover"}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:700}}>{a.title}</div>
                        <div style={{fontSize:12,color:T.inkMute,marginTop:2}}>{a.price>0?`€${a.price}`:t("card.free")}</div>
                      </div>
                      {myTickets.includes(a.id)&&<div style={{padding:"4px 8px",borderRadius:8,background:"#D1FAE5",color:T.ok,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",gap:3}}><Ticket size={9}/>{t("btn.gotIt")}</div>}
                      {!myTickets.includes(a.id)&&a.price>0&&a.link&&<div onClick={(e)=>{e.stopPropagation();handleBook(a)}} style={{padding:"8px 14px",borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#1E40AF)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t("card.book")}</div>}
                    </div>
                  )}
                </div>
              }
            </>}

            {/* ── MY TICKETS TAB ── */}
            {tripTab==="tickets"&&<>
              {/* Search to add tickets */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{t("trip.addTicket")}</div>
                <div style={{display:"flex",alignItems:"center",gap:10,background:"white",border:`1px solid ${T.line}`,padding:"12px 14px",borderRadius:14}}>
                  <Search size={16} color={T.inkMute}/>
                  <input
                    value={ticketSearch}
                    onChange={(e)=>setTicketSearch(e.target.value)}
                    placeholder={t("trip.searchTicket")}
                    style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:14,color:T.ink,fontFamily:fi}}
                  />
                  {ticketSearch&&<div onClick={()=>setTicketSearch("")} style={{width:20,height:20,borderRadius:10,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={11} color={T.inkSoft}/></div>}
                </div>

                {/* Search results */}
                {ticketSearch&&(()=>{
                  const ql=ticketSearch.toLowerCase().trim();
                  const results=ATT.filter(a=>a.price>0&&a.link&&!myTickets.includes(a.id)&&[a.title,a.cat,a.area].join(" ").toLowerCase().includes(ql)).slice(0,5);
                  if(results.length===0)return<div style={{marginTop:8,padding:"14px",fontSize:12,color:T.inkMute,textAlign:"center"}}>{t("misc.noMatches")}</div>;
                  return(
                    <div style={{marginTop:8,background:"white",border:`1px solid ${T.line}`,borderRadius:14,overflow:"hidden"}}>
                      {results.map((a,i)=>
                        <div key={a.id} onClick={()=>{toggleTicket(a.id);setTicketSearch("")}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:i<results.length-1?`1px solid ${T.line}`:"none"}}>
                          <img src={a.img} alt={a.title} style={{width:36,height:36,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:13,fontWeight:700}}>{a.title}</div>
                            <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{a.cat} · €{a.price}</div>
                          </div>
                          <div style={{width:26,height:26,borderRadius:13,background:T.okSoft,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Plus size={14} color={T.ok}/></div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Ticket list */}
              {myTickets.length===0?
                <div style={{textAlign:"center",padding:"40px 20px",background:"white",borderRadius:22,border:`1px solid ${T.line}`}}>
                  <Ticket size={32} color={T.line}/>
                  <div style={{fontSize:14,fontWeight:600,marginTop:12}}>{t("trip.noTickets")}</div>
                  <div style={{fontSize:12,color:T.inkMute,marginTop:4,lineHeight:1.5,padding:"0 20px"}}>{t("trip.noTicketsSub")}</div>
                </div>
                :
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{t("trip.yourTickets")} ({myTickets.length})</div>
                  {ATT.filter(a=>myTickets.includes(a.id)).map(a=>{
                    const timed=timedTickets[a.id];
                    return(
                    <div key={a.id} style={{borderRadius:20,background:"white",border:`1px solid ${T.ok}30`,padding:12,marginBottom:10,position:"relative"}}>
                      <div onClick={()=>setPreviewAtt(a)} style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
                        <div onClick={(e)=>{e.stopPropagation();toggleTicket(a.id)}} style={{position:"absolute",top:-6,right:-6,width:22,height:22,borderRadius:11,background:T.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 6px rgba(0,0,0,0.15)",zIndex:2}}><X size={11} color="white"/></div>
                        <div style={{position:"relative",flexShrink:0}}>
                          <img src={a.img} alt={a.title} style={{width:52,height:52,borderRadius:14,objectFit:"cover"}}/>
                          <div style={{position:"absolute",bottom:-3,right:-3,width:20,height:20,borderRadius:10,background:T.ok,border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={10} color="white"/></div>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:14,fontWeight:700}}>{a.title}</div>
                          <div style={{fontSize:11,color:T.inkMute,marginTop:2}}>{a.cat} · €{a.price}</div>
                          <div style={{display:"inline-flex",alignItems:"center",gap:3,marginTop:5,padding:"2px 8px",borderRadius:6,background:T.okSoft,fontSize:10,fontWeight:700,color:T.ok}}>
                            <Ticket size={9}/>{t("trip.ticketReady")}
                          </div>
                        </div>
                      </div>
                      {/* Add date & time row */}
                      <div onClick={()=>{
                        if(!isPremium){setPremiumOpen(true);return}
                        setTimedTicketSheet(a.id);
                      }} style={{marginTop:10,padding:"10px 12px",borderRadius:12,background:timed?"#EEF2FF":"#F8FAFC",border:`1px dashed ${timed?T.primary:T.line}`,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:28,height:28,borderRadius:8,background:timed?T.primarySoft:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Clk size={14} color={timed?T.primary:T.inkMute}/>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          {timed?
                            <>
                              <div style={{fontSize:12,fontWeight:700,color:T.primary}}>{new Date(timed.date).toLocaleDateString(lang==="ar"?"ar-SA":lang,{weekday:"short",month:"short",day:"numeric"})} · {timed.time}</div>
                              <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{t("trip.editSlot")}</div>
                            </>
                            :
                            <>
                              <div style={{fontSize:12,fontWeight:700,color:T.inkSoft}}>{t("trip.addDateTime")} {!isPremium&&"🔒"}</div>
                              <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{isPremium?t("trip.addDateTimeSub"):t("trip.addDateTimePremium")}</div>
                            </>
                          }
                        </div>
                        {timed&&<div onClick={(e)=>{e.stopPropagation();removeTimedTicket(a.id)}} style={{padding:"4px 8px",borderRadius:6,background:"white",fontSize:10,color:T.danger,fontWeight:700,cursor:"pointer"}}>{t("btn.clear")}</div>}
                      </div>
                    </div>
                    );
                  })}

                  {/* Premium upsell: timed tickets */}
                  {!isPremium&&myTickets.length>0&&
                    <div onClick={()=>setPremiumOpen(true)} style={{marginTop:14,borderRadius:18,background:"linear-gradient(135deg,#0B1220,#1D4ED8)",padding:16,cursor:"pointer",color:"white",position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",inset:0,opacity:0.08,backgroundImage:"radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",backgroundSize:"14px 14px"}}/>
                      <div style={{position:"relative",display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:42,height:42,borderRadius:14,background:"rgba(197,157,95,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:20}}>⏰</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700}}>{t("trip.premiumTeaser")}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:2}}>{t("trip.premiumTeaserSub")}</div>
                        </div>
                        <span style={{fontSize:11,color:T.gold}}>🔒</span>
                      </div>
                    </div>
                  }
                </div>
              }
            </>}
          </div>}
        </div>

        {/* BOTTOM NAV */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,borderTop:`1px solid ${T.line}`,background:"white",padding:"8px 12px 24px",zIndex:50}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:2}}>{[{id:"home",Icon:Compass,l:t("nav.home")},{id:"plan",Icon:Sparkles,l:t("nav.plan")},{id:"book",Icon:Ticket,l:t("nav.book")},{id:"explore",Icon:MapPin,l:t("nav.explore")},{id:"trip",Icon:Package,l:t("nav.trip")}].map(n=>{const on=tab===n.id;return<div key={n.id} onClick={()=>goTab(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:16,padding:"8px 4px 6px",cursor:"pointer",background:on?T.primarySoft:"transparent"}}><n.Icon size={19} color={on?T.primary:T.inkSoft} strokeWidth={on?2:1.75}/><span style={{marginTop:3,fontSize:10,fontWeight:600,color:on?T.primary:T.inkSoft}}>{n.l}</span></div>})}</div></div>

        {/* INSTALL PROMPT */}
        <InstallPrompt/>

        {/* TIMED TICKET SHEET */}
        {timedTicketSheet&&<TimedTicketSheet
          attraction={ATT.find(a=>a.id===timedTicketSheet)}
          existing={timedTickets[timedTicketSheet]}
          onClose={()=>setTimedTicketSheet(null)}
          onSave={(id,date,time)=>{
            const updatedTimed={...timedTickets,[id]:{date,time}};
            setTimedTickets(updatedTimed);
            localStorage.setItem("timedTickets",JSON.stringify(updatedTimed));
            setTimedTicketSheet(null);
            if(planResult&&planDays){
              const newPlan=generatePlan({days:planDays,pace:planPace||"balanced",interests:planInterests||[],timedTickets:updatedTimed,tripStartDate});
              setPlanResult(newPlan);
              // Plan sekmesine geç ki kullanıcı değişikliği görsün
              setTimeout(()=>goTab("plan"),300);
            }
          }}
        />}

        {/* HAMBURGER MENU — inside frame */}
        {menuOpen && (
          <div style={{position:"absolute",inset:0,zIndex:300,overflow:"hidden"}}>
            <div onClick={()=>setMenuOpen(false)} style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.55)",backdropFilter:"blur(6px)"}}/>
            <div style={{position:"absolute",top:0,right:0,bottom:0,width:"85%",maxWidth:340,background:"white",boxShadow:"-10px 0 40px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",overflowY:"auto"}}>

              {/* PROFILE HEADER */}
              <div onClick={()=>{setMenuOpen(false);setTimeout(()=>setAccountOpen(true),200)}} style={{background:`linear-gradient(135deg,${T.dark},#16233B)`,padding:"24px 20px 20px",color:"white",cursor:"pointer",flexShrink:0}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:50,height:50,borderRadius:"50%",background:user?"rgba(29,78,216,0.3)":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"2px solid rgba(255,255,255,0.15)"}}>
                    {user?<span style={{fontSize:18,fontWeight:800,color:"#BFDBFE"}}>{(user.name||user.email||"U")[0].toUpperCase()}</span>:<User size={22} color="rgba(255,255,255,0.6)"/>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:15,fontWeight:800,fontFamily:fd}}>{user?(user.name||t("menu.welcomeBack")):t("menu.signIn")}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?user.email:t("menu.signInSub")}</div>
                    {isPremium&&<div style={{marginTop:5,display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:99,background:"rgba(197,157,95,0.2)",fontSize:9,fontWeight:700,color:T.gold}}>✨ PREMIUM</div>}
                  </div>
                  <ChevronRight size={16} color="rgba(255,255,255,0.4)"/>
                </div>
              </div>

              {/* DISCOVER — Guides */}
              <div style={{padding:"16px 20px 6px",fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.12em"}}>{t("menu.discover")}</div>
              {GUIDES.map(g=>(
                <div key={g.id} onClick={()=>{setMenuOpen(false);setTimeout(()=>{goTab("explore");setGuideId(g.id)},200)}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 20px",cursor:"pointer"}}>
                  <div style={{width:32,height:32,borderRadius:10,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Compass size={16} color={T.inkSoft}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.ink}}>{t(GUIDE_KEYS[g.id]?.title||"")||g.title}</div>
                    <div style={{fontSize:10,color:T.inkMute,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t(GUIDE_KEYS[g.id]?.sub||"")||g.sub}</div>
                  </div>
                  <ChevronRight size={14} color={T.inkMute}/>
                </div>
              ))}

              <div style={{height:1,background:T.line,margin:"6px 20px"}}/>

              {/* ESSENTIALS */}
              <div style={{padding:"12px 20px 6px",fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.12em"}}>{t("menu.essentials")}</div>
              {[
                {Icon:Ticket,title:t("menu.ticketsTours"),sub:t("menu.ticketsToursSub"),action:()=>goTab("book"),color:"#BE185D",bg:"#FCE7F3"},
                {Icon:Train,title:t("menu.publicTransport"),sub:t("menu.publicTransportSub"),action:()=>setTransOpen(true),color:T.ok,bg:T.okSoft},
                {Icon:Smartphone,title:t("menu.esimData"),sub:t("menu.esimDataSub"),action:()=>setEsimOpen(true),color:"#6D28D9",bg:"#EDE9FE"},
                {Icon:Sparkles,title:t("home.smartPlan"),sub:t("menu.buildItinerary"),action:()=>goTab("plan"),color:T.primary,bg:T.primarySoft},
              ].map(item=>(
                <div key={item.title} onClick={()=>{setMenuOpen(false);setTimeout(item.action,200)}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 20px",cursor:"pointer"}}>
                  <div style={{width:32,height:32,borderRadius:10,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <item.Icon size={16} color={item.color} strokeWidth={1.9}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.ink}}>{item.title}</div>
                    <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{item.sub}</div>
                  </div>
                  <ChevronRight size={14} color={T.inkMute}/>
                </div>
              ))}

              <div style={{height:1,background:T.line,margin:"6px 20px"}}/>

              {/* KNOW BEFORE YOU GO */}
              <div style={{padding:"12px 20px 6px",fontSize:10,fontWeight:700,color:T.inkMute,textTransform:"uppercase",letterSpacing:"0.12em"}}>{t("menu.knowBefore")}</div>
              {[
                {Icon:Plane,title:t("info.airport"),sub:t("info.airportSub"),action:()=>setInfoPage("airport"),color:T.primary,bg:T.primarySoft},
                {Icon:Wallet,title:t("info.money"),sub:t("info.moneySub"),action:()=>setInfoPage("money"),color:T.ok,bg:T.okSoft},
                {Icon:Languages,title:t("info.phrases"),sub:t("info.phrasesSub"),action:()=>setInfoPage("phrases"),color:"#BE185D",bg:"#FCE7F3"},
                {Icon:ShieldCheck,title:t("info.safety"),sub:t("info.safetySub"),action:()=>setInfoPage("safety"),color:T.danger,bg:T.dangerSoft},
                {Icon:Globe,title:t("info.live"),sub:t("info.liveSub"),action:()=>setInfoPage("live"),color:T.warn,bg:T.warnSoft},
              ].map(item=>(
                <div key={item.title} onClick={()=>{setMenuOpen(false);setTimeout(()=>{goTab("home");item.action()},200)}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 20px",cursor:"pointer"}}>
                  <div style={{width:32,height:32,borderRadius:10,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <item.Icon size={16} color={item.color} strokeWidth={1.9}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.ink}}>{item.title}</div>
                    <div style={{fontSize:10,color:T.inkMute,marginTop:1}}>{item.sub}</div>
                  </div>
                  <ChevronRight size={14} color={T.inkMute}/>
                </div>
              ))}

              {/* PREMIUM upsell */}
              {!isPremium&&(
                <>
                  <div style={{height:1,background:T.line,margin:"6px 20px"}}/>
                  <div onClick={()=>{setMenuOpen(false);setTimeout(()=>setPremiumOpen(true),200)}} style={{margin:"10px 20px 24px",borderRadius:16,background:`linear-gradient(135deg,${T.dark},#1D4ED8)`,padding:14,cursor:"pointer",color:"white",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:38,height:38,borderRadius:12,background:"rgba(197,157,95,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Sparkles size={18} color={T.gold}/></div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:800}}>{t("menu.upgradePremium")}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.65)",marginTop:2}}>{t("menu.upgradeSub")}</div>
                    </div>
                    <div style={{fontSize:11,fontWeight:700,color:T.gold}}>€4.99</div>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
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
      {detailAtt&&<AttractionSheet attraction={detailAtt} allAttractions={ATT} onClose={()=>setDetailAtt(null)} onFav={toggleFav} isFav={favs.has(detailAtt.id)} onOpenOther={a=>setDetailAtt(a)} isPremium={isPremium} onUpgrade={()=>setPremiumOpen(true)} onBook={handleBook} myTickets={myTickets} onToggleTicket={toggleTicket}/>}

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
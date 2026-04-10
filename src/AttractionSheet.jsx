import { useState } from "react";
import {
  ArrowLeft, Heart, Ticket, Star, Info, ChevronRight, Landmark,
  TramFront, Shirt, Plus, ExternalLink, Waves, Music, Eye, Moon,
  Ship, Sun, Bus, MapPin, UtensilsCrossed, ChefHat, Fish
} from "lucide-react";

const T = {
  surface: "#FFFFFF", soft: "#F8FAFC", line: "#E2E8F0",
  text: "#0F172A", textSoft: "#475569", textMute: "#94A3B8",
  blue: "#1D4ED8", blueSoft: "#DBEAFE",
  ok: "#059669", okSoft: "#D1FAE5",
  warn: "#D97706", dark: "#0F172A", danger: "#E11D48",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";
const fs = "'Inter',system-ui,sans-serif";

function Pill({ children, tone = T.blueSoft, color = T.blue }) {
  return <span style={{ display:"inline-flex", alignItems:"center", gap:4, borderRadius:999, padding:"4px 10px", background:tone, color, fontSize:11, fontWeight:700 }}>{children}</span>;
}

const DETAILS = {
  hagia: {
    gallery:["/hagia.jpg","/hagia-2.jpg","/hagia-3.jpg","/hagia-4.jpg","/hagia-5.jpg"],
    reviews:"48K+ reviews",
    intro:"One of Istanbul's most iconic landmarks, Hagia Sophia brings together Byzantine grandeur and Ottoman history in one unforgettable space. This is the kind of place that instantly makes the trip feel real.",
    ticketTip:"Go early, especially on Fridays and weekends. Tourist access may pause around prayer times, so morning is usually the smoothest window.",
    facts:[{l:"Open",v:"09:00–19:00"},{l:"Best time",v:"Before 10:00"},{l:"Duration",v:"1–1.5h"},{l:"Ticket",v:"€25"}],
    sections:[
      {title:"Why visit?",icon:Landmark,content:"It is one of the few places where you feel the scale of Istanbul's history immediately. The dome, the mosaics, and the layered religious history make it worth prioritizing even on a short trip."},
      {title:"How to get there",icon:TramFront,content:"Take Tram T1 to Sultanahmet. From the stop, it is a very short walk. Taxi drop-off is possible nearby, but tram is often easier than dealing with traffic."},
      {title:"Know before you go",icon:Shirt,content:"Modest clothing is required. Tourist access may pause during prayer times. The Museum Pass is not valid here, so this is usually a separate ticket decision."},
    ],
    nearby:["basilica","topkapi"],
  },
  basilica: {
    gallery:["/basilica.jpg","/basilica-2.jpg","/basilica-3.jpg","/basilica-4.jpg"],
    reviews:"32K+ reviews",
    intro:"An underground wonder with 336 marble columns, atmospheric lighting, and the famous Medusa heads. The cool, dim atmosphere feels like stepping into another world entirely.",
    ticketTip:"Book skip-the-line tickets online — the queue can be 30–45 minutes during peak hours. Late afternoon is usually quieter.",
    facts:[{l:"Open",v:"09:00–18:30"},{l:"Best time",v:"After 15:00"},{l:"Duration",v:"45min–1h"},{l:"Ticket",v:"€20"}],
    sections:[
      {title:"Why visit?",icon:Landmark,content:"The atmospheric underground columns and water reflections create a truly unique experience. It photographs beautifully but feels even better in person."},
      {title:"How to get there",icon:TramFront,content:"Tram T1 to Sultanahmet, then a 3-minute walk. Right between Hagia Sophia and the Blue Mosque, so easy to combine."},
      {title:"Know before you go",icon:Info,content:"It is cool underground — a welcome break in summer. There is a small café inside. Photography is allowed but no flash."},
    ],
    nearby:["hagia","topkapi"],
  },
  topkapi: {
    gallery:["/topkapi.jpg","/topkapi-2.jpg","/topkapi-3.jpg","/topkapi-4.jpg"],
    reviews:"41K+ reviews",
    intro:"The main residence of Ottoman sultans for nearly 400 years. Stunning courtyards, the Imperial Treasury, sacred relics, and panoramic Bosphorus views from the terrace.",
    ticketTip:"The Harem section requires a separate ticket. Buy a combo ticket to save. Arrive at opening time — it gets crowded by 11:00.",
    facts:[{l:"Open",v:"09:00–18:00"},{l:"Best time",v:"At opening"},{l:"Duration",v:"2–3h"},{l:"Ticket",v:"€30"}],
    sections:[
      {title:"Why visit?",icon:Landmark,content:"The sheer scale of Ottoman wealth and craftsmanship is on full display. The Treasury alone is worth the visit. The Bosphorus views from the fourth courtyard are spectacular."},
      {title:"How to get there",icon:TramFront,content:"Tram T1 to Gülhane or Sultanahmet. Walk through Gülhane Park for a pleasant approach."},
      {title:"Know before you go",icon:Info,content:"Closed on Tuesdays. The Harem needs a separate ticket. Wear comfortable shoes — there is a lot of walking."},
    ],
    nearby:["hagia","basilica"],
  },
  cruise: {
    gallery:["/cruise.jpg","/cruise-2.jpg","/cruise-3.jpg","/cruise-4.jpg"],
    reviews:"28K+ reviews",
    intro:"See Istanbul from the water — palaces, fortresses, and the city skyline sliding past as you cruise between two continents. The sunset departures are absolutely magical.",
    ticketTip:"Book the late afternoon departure for sunset views. Sit on the right side going up the Bosphorus for the European shore palaces.",
    facts:[{l:"Departs",v:"Multiple daily"},{l:"Best time",v:"Sunset"},{l:"Duration",v:"1.5–2h"},{l:"Ticket",v:"€18"}],
    sections:[
      {title:"Why visit?",icon:Waves,content:"No better way to understand Istanbul's geography. You will see Dolmabahçe Palace, the Bosphorus bridges, Rumeli Fortress, and the Asian side — all from a completely different perspective."},
      {title:"How to get there",icon:TramFront,content:"Most cruises depart from Eminönü or Kabataş piers. Tram T1 to Eminönü drops you right at the waterfront."},
      {title:"Know before you go",icon:Info,content:"Bring a light jacket — it gets breezy on the water. There is usually a small café on board. Some cruises include a stop on the Asian side."},
    ],
    nearby:["galata","dolma"],
  },
  hammam: {
    gallery:["/hammam.jpg","/hammam-2.jpg","/hammam-3.jpg","/hammam-4.jpg"],
    reviews:"18K+ reviews",
    intro:"A centuries-old bathing tradition that combines steam, marble, and a proper scrub. It is part relaxation, part cultural experience, and completely unlike anything at home.",
    ticketTip:"Book the traditional package (scrub + foam massage). Premium hammams like Kılıç Ali Paşa or Ayasofya Hürrem Sultan offer the best experience.",
    facts:[{l:"Duration",v:"60–90min"},{l:"Best time",v:"Morning"},{l:"Type",v:"Traditional"},{l:"Ticket",v:"From €45"}],
    sections:[
      {title:"Why visit?",icon:Waves,content:"One of those experiences that defines an Istanbul trip. The hot marble, the steam, and the vigorous scrub leave you feeling completely renewed."},
      {title:"How to get there",icon:TramFront,content:"Historic hammams are scattered across the old city. Çemberlitaş Hamamı is closest to Sultanahmet. Kılıç Ali Paşa is in Tophane."},
      {title:"Know before you go",icon:Shirt,content:"You will be given a peştamal (wrap). Swimwear optional underneath. Separate sections for men and women in most traditional baths. Bring a plastic bag for wet items."},
    ],
    nearby:["hagia","basilica"],
  },
  galata: {
    gallery:["/galata.jpg","/galata-2.jpg","/galata-3.jpg","/galata-4.jpg"],
    reviews:"35K+ reviews",
    intro:"A medieval stone tower offering the best 360° panoramic view of Istanbul. On a clear day, you can see the Golden Horn, Bosphorus, old city, and all the way to the Princes' Islands.",
    ticketTip:"Buy online to skip the queue. Go for sunset — the light over the old city is unforgettable. It gets windy at the top.",
    facts:[{l:"Open",v:"08:30–23:00"},{l:"Best time",v:"Sunset"},{l:"Duration",v:"30–45min"},{l:"Ticket",v:"€15"}],
    sections:[
      {title:"Why visit?",icon:Eye,content:"The view alone is worth it, but the Genoese history adds depth. It is one of the most recognizable landmarks on the Istanbul skyline and a perfect pre-dinner stop."},
      {title:"How to get there",icon:TramFront,content:"Walk up from Karaköy (steep but scenic) or take the Tünel funicular. Short walk from İstiklal Avenue."},
      {title:"Know before you go",icon:Info,content:"There is an elevator inside. The observation deck is open-air and can get crowded. Photography is excellent from every angle."},
    ],
    nearby:["cruise","dolma"],
  },
  dolma: {
    gallery:["/dolma.jpg","/dolma-2.jpg","/dolma-3.jpg","/dolma-4.jpg"],
    reviews:"29K+ reviews",
    intro:"The last imperial palace of the Ottoman Empire, sitting right on the Bosphorus waterfront. The Crystal Staircase and the 4.5-ton chandelier are jaw-dropping.",
    ticketTip:"Book timed entry online — walk-up queues can be an hour long. The full ticket (Selamlık + Harem) is worth it.",
    facts:[{l:"Open",v:"09:00–18:00"},{l:"Best time",v:"Morning"},{l:"Duration",v:"1.5–2h"},{l:"Ticket",v:"€28"}],
    sections:[
      {title:"Why visit?",icon:Landmark,content:"If Topkapi shows Ottoman tradition, Dolmabahçe shows Ottoman ambition. European-style interiors, crystal chandeliers, and Bosphorus-front setting — like Versailles on the water."},
      {title:"How to get there",icon:TramFront,content:"Tram T1 to Kabataş, then a short walk along the waterfront. The palace is right on the coast road."},
      {title:"Know before you go",icon:Info,content:"Closed on Mondays. Photography is not allowed inside. Guided tour is mandatory and included. Shoe covers provided."},
    ],
    nearby:["cruise","galata"],
  },
  dervish: {
    gallery:["/dervish.jpg","/dervish-2.jpg","/dervish-3.jpg","/dervish-4.jpg"],
    reviews:"15K+ reviews",
    intro:"A mesmerizing Sufi ceremony where the spinning becomes a form of meditation. It is spiritual, beautiful, and completely unique to Turkey.",
    ticketTip:"Book in advance — performances sell out quickly. The Hodjapasha Center and Galata Mevlevihane are the best venues.",
    facts:[{l:"Shows",v:"Evening"},{l:"Best venue",v:"Hodjapasha"},{l:"Duration",v:"1h"},{l:"Ticket",v:"€22"}],
    sections:[
      {title:"Why visit?",icon:Music,content:"This is not a tourist show — it is a genuine spiritual practice that has been happening for 800 years. The music, the spinning, and the reverence create a deeply moving experience."},
      {title:"How to get there",icon:TramFront,content:"Hodjapasha is near Sirkeci station (Tram T1). Galata Mevlevihane is at the top of Tünel, near İstiklal Avenue."},
      {title:"Know before you go",icon:Info,content:"Silence during the ceremony is expected. No photography during the actual whirling. Dress respectfully. Arrive 15 minutes early."},
    ],
    nearby:["hagia","basilica"],
  },
  islands: {
    gallery:["/islands.jpg","/islands-2.jpg","/islands-3.jpg","/islands-4.jpg"],
    reviews:"22K+ reviews",
    intro:"A chain of car-free islands in the Sea of Marmara, just a ferry ride from the city. Pine forests, Victorian-era mansions, and the best seafood lunch you will have in Istanbul.",
    ticketTip:"Take the guided tour if it is your first time — it covers ferry, island transport, and lunch. Büyükada is the main island.",
    facts:[{l:"Ferry",v:"From Kabataş"},{l:"Best time",v:"Weekday"},{l:"Duration",v:"Full day"},{l:"Ticket",v:"€35"}],
    sections:[
      {title:"Why visit?",icon:Sun,content:"The perfect escape from city buzz. No cars, no traffic — just sea breeze, pine trees, and a completely different pace. The ferry ride itself is scenic."},
      {title:"How to get there",icon:Ship,content:"Fast ferry from Kabataş pier (Tram T1 to Kabataş). The ride takes about 40 minutes to Büyükada."},
      {title:"Know before you go",icon:Info,content:"Go on a weekday to avoid crowds. Electric vehicles replaced horse carriages. Bring sunscreen. Last ferry back around 20:00."},
    ],
    nearby:["cruise","maiden"],
  },
  cooking: {
    gallery:["/cooking.jpg","/cooking-2.jpg","/cooking-3.jpg","/cooking-4.jpg"],
    reviews:"8K+ reviews",
    intro:"Learn to make authentic Turkish dishes — from manti to baklava — with a local chef. You visit a market, cook together, and eat everything you make.",
    ticketTip:"Book the full-day class that includes a market visit — much richer than kitchen-only sessions.",
    facts:[{l:"Includes",v:"Market + meal"},{l:"Best time",v:"Morning"},{l:"Duration",v:"3–4h"},{l:"Ticket",v:"€50"}],
    sections:[
      {title:"Why visit?",icon:ChefHat,content:"Food is central to Turkish culture. Cooking together is the best way to understand it. You learn techniques you can recreate at home."},
      {title:"How to get there",icon:TramFront,content:"Most classes are in Sultanahmet or Kadıköy. The host sends detailed meeting point instructions after booking."},
      {title:"Know before you go",icon:Info,content:"Vegetarian options usually available — mention when booking. Come hungry — you will eat a full meal."},
    ],
    nearby:["foodtour","hammam"],
  },
  foodtour: {
    gallery:["/foodtour.jpg","/foodtour-2.jpg","/foodtour-3.jpg","/foodtour-4.jpg"],
    reviews:"12K+ reviews",
    intro:"Taste your way through Istanbul's neighborhoods with a local guide. From street simit to hidden meyhane gems — the food scene tourists usually miss.",
    ticketTip:"The Kadıköy food tour is excellent for the Asian side. Sultanahmet/Eminönü tours cover more classic spots.",
    facts:[{l:"Stops",v:"8–10 tastings"},{l:"Best time",v:"Lunch"},{l:"Duration",v:"3–4h"},{l:"Ticket",v:"€40"}],
    sections:[
      {title:"Why visit?",icon:UtensilsCrossed,content:"You discover places not in guidebooks. The local guide context — history, ingredients, neighborhood stories — makes each bite more meaningful."},
      {title:"How to get there",icon:TramFront,content:"Meeting points vary. Kadıköy tours meet at the ferry terminal. Old city tours start near Eminönü."},
      {title:"Know before you go",icon:Info,content:"Come hungry — portions add up. Wear comfortable walking shoes. Most tours run rain or shine."},
    ],
    nearby:["cooking","cruise"],
  },
  hoponoff: {
    gallery:["/hoponoff.jpg","/hoponoff-2.jpg","/hoponoff-3.jpg"],
    reviews:"9K+ reviews",
    intro:"The classic open-top bus tour covering Istanbul's main sights. Audio guide included in 10+ languages. Practical way to get oriented on your first day.",
    ticketTip:"Get the 48-hour ticket for better value. Use it strategically as transport between sights.",
    facts:[{l:"Routes",v:"2 loops"},{l:"Frequency",v:"Every 30min"},{l:"Duration",v:"Full day"},{l:"Ticket",v:"€28"}],
    sections:[
      {title:"Why visit?",icon:Bus,content:"Great for first-time visitors wanting an overview. Open top deck gives excellent photo opportunities and the audio guide provides context."},
      {title:"How to get there",icon:MapPin,content:"Main stops at Sultanahmet, Taksim, and Eminönü. Hop on at any stop."},
      {title:"Know before you go",icon:Info,content:"Bring sunscreen for the open top. Traffic can slow things down in the afternoon."},
    ],
    nearby:["hagia","galata"],
  },
  nightcruise: {
    gallery:["/nightcruise.jpg","/nightcruise-2.jpg","/nightcruise-3.jpg"],
    reviews:"7K+ reviews",
    intro:"A candlelit dinner on the Bosphorus with live music, Turkish cuisine, and the illuminated Istanbul skyline. The bridge lights reflecting on the water make it genuinely special.",
    ticketTip:"Book a window table for the best views. Premium packages include unlimited drinks and better seating.",
    facts:[{l:"Departs",v:"20:00"},{l:"Includes",v:"Dinner + show"},{l:"Duration",v:"3h"},{l:"Ticket",v:"€55"}],
    sections:[
      {title:"Why visit?",icon:Moon,content:"Istanbul at night from the water is mesmerizing. Mosques, bridges, palaces all light up differently, and the dinner cruise combines it with live entertainment."},
      {title:"How to get there",icon:Ship,content:"Most dinner cruises depart from Eminönü or Kabataş piers. Check your booking for exact pier and boarding time."},
      {title:"Know before you go",icon:Shirt,content:"Smart casual dress code. Arrive 30 minutes early. Vegetarian menus on request. Bring a layer — it gets cool on deck."},
    ],
    nearby:["cruise","galata"],
  },
  aquarium: {
    gallery:["/aquarium.jpg","/aquarium-2.jpg","/aquarium-3.jpg"],
    reviews:"14K+ reviews",
    intro:"One of Europe's largest aquariums with 16 themed zones taking you from the Black Sea to the Pacific. Walk-through tunnel and touch pools make it a hit with families.",
    ticketTip:"Weekday mornings are quietest. Combo tickets with adjacent mall attractions offer better value.",
    facts:[{l:"Open",v:"10:00–20:00"},{l:"Best for",v:"Families"},{l:"Duration",v:"1.5–2h"},{l:"Ticket",v:"€22"}],
    sections:[
      {title:"Why visit?",icon:Fish,content:"Perfect for families or a rainy day. Themed zones are well-designed, kids love the touch pools and shark tunnel."},
      {title:"How to get there",icon:TramFront,content:"Marmaray or Metrobus to Florya. The aquarium is inside the Aqua Florya complex."},
      {title:"Know before you go",icon:Info,content:"Plan 2 hours minimum. Food court and shopping mall in the same complex. Stroller-friendly."},
    ],
    nearby:["islands","hoponoff"],
  },
  maiden: {
    gallery:["/maiden.jpg","/maiden-2.jpg","/maiden-3.jpg","/maiden-4.jpg"],
    reviews:"20K+ reviews",
    intro:"The recently restored tower sitting on its own tiny island between the two continents. A symbol of Istanbul with a new museum, café, and some of the best views of the old city skyline.",
    ticketTip:"Book the ferry + tower ticket combo online. The café at the top is lovely but gets busy — arrive early or late.",
    facts:[{l:"Open",v:"09:00–18:00"},{l:"Best time",v:"Late afternoon"},{l:"Duration",v:"1–1.5h"},{l:"Ticket",v:"€20"}],
    sections:[
      {title:"Why visit?",icon:Landmark,content:"Newly restored and reopened. One of Istanbul's most photogenic spots. Sunset views back toward the old city are extraordinary."},
      {title:"How to get there",icon:Ship,content:"Dedicated boats from Üsküdar and Kabataş. Üsküdar departure is more frequent. Ferry crossings every 15 minutes."},
      {title:"Know before you go",icon:Info,content:"Small museum inside about its history and legends. The café serves Turkish tea with a view."},
    ],
    nearby:["cruise","islands"],
  },
};

// This needs to be passed from parent so nearby items can open their detail pages
export default function AttractionSheet({ attraction, allAttractions, onClose, onFav, isFav, onOpenOther }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!attraction) return null;

  const detail = DETAILS[attraction.id] || {};
  const gallery = detail.gallery || [attraction.img];
  const image = gallery[activeImage] || gallery[0];
  const nearbyAtts = (detail.nearby || []).map(id => (allAttractions || []).find(a => a.id === id)).filter(Boolean);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:300,
      background:"radial-gradient(circle at top, #eaf2ff 0%, #f5f7fb 35%)",
      fontFamily:fs, display:"flex", flexDirection:"column", alignItems:"center",
    }}>
      <div style={{
        width:"100%", maxWidth:440, height:"100%",
        overflow:"hidden", display:"flex", flexDirection:"column",
        borderRadius:0, background:T.surface,
        boxShadow:"0 40px 100px rgba(15,23,42,0.18)",
        position:"relative",
      }}>

        {/* ── HERO IMAGE ── */}
        <div style={{ position:"relative", height:280, overflow:"hidden", flexShrink:0 }}>
          <img src={image} alt={attraction.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,23,42,0.55), rgba(15,23,42,0.05))" }} />

          <div style={{ position:"absolute", top:14, left:14, right:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <button onClick={onClose} style={{
              width:40, height:40, borderRadius:16,
              border:"1px solid rgba(255,255,255,0.12)",
              background:"rgba(255,255,255,0.12)", backdropFilter:"blur(10px)",
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
            }}>
              <ArrowLeft size={16} color="white" />
            </button>
            <button onClick={() => onFav && onFav(attraction.id)} style={{
              width:40, height:40, borderRadius:16,
              border:"1px solid rgba(255,255,255,0.12)",
              background:isFav ? "rgba(225,29,72,0.9)" : "rgba(255,255,255,0.12)",
              backdropFilter:"blur(10px)",
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
            }}>
              <Heart size={16} color="white" fill={isFav ? "white" : "none"} />
            </button>
          </div>

          <div style={{ position:"absolute", left:16, bottom:16, right:16 }}>
            <Pill tone="rgba(255,255,255,0.18)" color="white">{attraction.badge}</Pill>
            <div style={{ marginTop:10, fontSize:28, fontWeight:800, letterSpacing:"-0.04em", color:"white", fontFamily:fd }}>
              {attraction.title}
            </div>
            <div style={{ marginTop:6, display:"flex", flexWrap:"wrap", gap:8, color:"rgba(255,255,255,0.82)", fontSize:12, fontWeight:600 }}>
              <span>{attraction.cat}</span>
              <span>·</span>
              <span>{attraction.area || "Istanbul"}</span>
              <span>·</span>
              <span style={{ display:"inline-flex", alignItems:"center", gap:4 }}>
                <Star size={12} fill="currentColor" /> {attraction.rating}
              </span>
              {detail.reviews && <><span>·</span><span>{detail.reviews}</span></>}
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 18px 24px", background:"linear-gradient(180deg,#F8FBFF 0%,#F5F7FB 35%)" }}>

          {/* Gallery thumbnails */}
          {gallery.length > 1 && (
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:14 }}>
              {gallery.map((img, idx) => (
                <button key={idx} onClick={() => setActiveImage(idx)} style={{
                  border: activeImage === idx ? `2px solid ${T.blue}` : `1px solid ${T.line}`,
                  borderRadius:16, overflow:"hidden", width:68, height:68,
                  flexShrink:0, padding:0, cursor:"pointer", background:T.surface,
                }}>
                  <img src={img} alt={`${idx + 1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </button>
              ))}
            </div>
          )}

          {/* Quick Facts */}
          {detail.facts && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              {detail.facts.map(f => (
                <div key={f.l} style={{ borderRadius:18, border:`1px solid ${T.line}`, background:"white", padding:14 }}>
                  <div style={{ fontSize:11, color:T.textMute }}>{f.l}</div>
                  <div style={{ marginTop:4, fontSize:14, fontWeight:800, color:T.text }}>{f.v}</div>
                </div>
              ))}
            </div>
          )}

          {/* Why visit */}
          {detail.intro && (
            <div style={{ borderRadius:22, background:"white", border:`1px solid ${T.line}`, padding:18, marginBottom:14 }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.text, marginBottom:8 }}>Why visit?</div>
              <div style={{ fontSize:13, lineHeight:1.7, color:T.textSoft }}>{detail.intro}</div>
            </div>
          )}

          {/* Ticket Tip */}
          {detail.ticketTip && (
            <div style={{ borderRadius:22, background:"linear-gradient(135deg,#EFF6FF 0%,#F8FAFC 100%)", border:`1px solid ${T.line}`, padding:18, marginBottom:14 }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:42, height:42, borderRadius:14, background:"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Info size={18} color={T.blue} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:T.text }}>Ticket tip</div>
                  <div style={{ marginTop:4, fontSize:13, lineHeight:1.6, color:T.textSoft }}>{detail.ticketTip}</div>
                </div>
              </div>
            </div>
          )}

          {/* Sections */}
          {detail.sections && detail.sections.map(s => (
            <div key={s.title} style={{ borderRadius:22, border:`1px solid ${T.line}`, background:"white", padding:18, marginBottom:12 }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:42, height:42, borderRadius:14, background:T.soft, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <s.icon size={18} color={T.text} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:T.text }}>{s.title}</div>
                  <div style={{ marginTop:6, fontSize:13, lineHeight:1.65, color:T.textSoft }}>{s.content}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Nearby — clickable */}
          {nearbyAtts.length > 0 && (
            <div style={{ marginTop:4, marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:T.textMute, marginBottom:8 }}>
                Better with combo
              </div>
              <div style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.03em", fontFamily:fd, color:T.text, marginBottom:12 }}>
                Pair it for a perfect day
              </div>
              {nearbyAtts.map(n => (
                <div key={n.id} onClick={() => {
                  setActiveImage(0);
                  if (onOpenOther) onOpenOther(n);
                }} style={{
                  borderRadius:18, border:`1px solid ${T.line}`, background:"white",
                  padding:12, marginBottom:10, display:"flex", alignItems:"center", gap:12, cursor:"pointer",
                }}>
                  <img src={n.img} alt={n.title} style={{ width:52, height:52, borderRadius:14, objectFit:"cover" }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{n.title}</div>
                    <div style={{ marginTop:2, fontSize:12, color:T.textSoft }}>{n.cat} · {n.dur} · €{n.price}</div>
                  </div>
                  <ChevronRight size={16} color={T.textMute} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── STICKY CTA — always visible ── */}
        <div style={{
          flexShrink:0, borderTop:`1px solid ${T.line}`,
          background:"rgba(255,255,255,0.96)", backdropFilter:"blur(10px)",
          padding:"12px 16px 20px",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
            <div>
              <div style={{ fontSize:11, color:T.textMute }}>From</div>
              <div style={{ marginTop:2, fontSize:24, fontWeight:800, letterSpacing:"-0.03em", color:T.text }}>€{attraction.price}</div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <a href={attraction.link} target="_blank" rel="noopener noreferrer" style={{
                border:"none", background:T.dark, color:"white",
                borderRadius:16, padding:"12px 20px", fontSize:13, fontWeight:700,
                cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6,
                textDecoration:"none",
              }}>
                <Ticket size={14} /> Book now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
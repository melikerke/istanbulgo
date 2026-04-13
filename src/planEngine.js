// ══════════════════════════════════════════════
// planEngine.js — Itinerary matching engine
// ══════════════════════════════════════════════
// Kullanıcı tercihi → akıllı plan üretimi
//
// Kullanıcı girdisi:
//   - days: 1–7
//   - pace: "relaxed" | "balanced" | "packed"
//   - interests: ["history", "food", "views", "shopping", "water", "family"]
//
// Çıktı: { days: [{ day, title, items: [...] }] }

// ── Attraction tag'leri ──
// Her attraction bir veya birden fazla kategoriye ait
export const ATTRACTION_TAGS = {
  hagia:       { tags: ["history", "must"], area: "sultanahmet", duration: 90, priority: 10, lat: 41.0086, lng: 28.9802 },
  basilica:    { tags: ["history"],         area: "sultanahmet", duration: 60, priority: 8,  lat: 41.0084, lng: 28.9779 },
  topkapi:     { tags: ["history", "must"], area: "sultanahmet", duration: 180, priority: 9, lat: 41.0115, lng: 28.9833 },
  bluemosque:  { tags: ["history", "must"], area: "sultanahmet", duration: 45, priority: 7,  lat: 41.0054, lng: 28.9768 },
  grandbazaar: { tags: ["shopping", "must"],area: "sultanahmet", duration: 90, priority: 7,  lat: 41.0106, lng: 28.9681 },
  spicebazaar: { tags: ["shopping", "food"],area: "eminonu",     duration: 60, priority: 6,  lat: 41.0165, lng: 28.9706 },
  dolma:       { tags: ["history"],         area: "besiktas",    duration: 150, priority: 7, lat: 41.0391, lng: 29.0001 },
  dervish:     { tags: ["history", "views"],area: "various",     duration: 60, priority: 6,  lat: 41.0255, lng: 28.9747 },
  galata:      { tags: ["views", "must"],   area: "beyoglu",     duration: 45, priority: 7,  lat: 41.0256, lng: 28.9742 },
  maiden:      { tags: ["views"],           area: "uskudar",     duration: 90, priority: 6,  lat: 41.0211, lng: 29.0041 },
  camlica:     { tags: ["views"],           area: "uskudar",     duration: 90, priority: 5,  lat: 41.0308, lng: 29.0689 },
  pierreloti:  { tags: ["views"],           area: "eyup",        duration: 75, priority: 4,  lat: 41.0507, lng: 28.9345 },
  cruise:      { tags: ["water", "must"],   area: "eminonu",     duration: 120, priority: 8, lat: 41.0170, lng: 28.9744 },
  nightcruise: { tags: ["water", "food"],   area: "eminonu",     duration: 180, priority: 5, lat: 41.0170, lng: 28.9744 },
  islands:     { tags: ["water"],           area: "marmara",     duration: 480, priority: 4, lat: 40.8760, lng: 29.1256 },
  hammam:      { tags: ["family"],          area: "various",     duration: 90, priority: 6,  lat: 41.0257, lng: 28.9787 },
  foodtour:    { tags: ["food"],            area: "various",     duration: 210, priority: 7, lat: 41.0180, lng: 28.9800 },
  cooking:     { tags: ["food"],            area: "various",     duration: 240, priority: 5, lat: 41.0100, lng: 28.9750 },
  aquarium:    { tags: ["family"],          area: "florya",      duration: 120, priority: 4, lat: 40.9825, lng: 28.7847 },
  hoponoff:    { tags: ["family"],          area: "citywide",    duration: 240, priority: 3, lat: 41.0082, lng: 28.9784 },
  balat:       { tags: ["shopping", "views"], area: "fatih",     duration: 180, priority: 6, lat: 41.0292, lng: 28.9494 },
  taksim:      { tags: ["shopping"],        area: "beyoglu",     duration: 150, priority: 5, lat: 41.0370, lng: 28.9850 },
  ortakoy:     { tags: ["views", "food"],   area: "besiktas",    duration: 90, priority: 5,  lat: 41.0475, lng: 29.0272 },
};

// ── Pace ayarları ──
const PACE_CONFIG = {
  relaxed:  { spotsPerDay: 3, bufferMin: 45, startHour: 10 },
  balanced: { spotsPerDay: 4, bufferMin: 30, startHour: 9 },
  packed:   { spotsPerDay: 6, bufferMin: 15, startHour: 8 },
};

// ── Area grupları (rota optimizasyonu için) ──
const AREA_GROUPS = {
  oldcity:  ["sultanahmet", "eminonu"],
  newcity:  ["besiktas", "beyoglu"],
  asian:    ["uskudar"],
  special:  ["various", "citywide", "marmara", "florya", "eyup", "fatih"],
};

// ── Gün başlıkları ──
const DAY_TITLES = {
  oldcity: "Old City Essentials",
  newcity: "Palaces, Panoramas & Bosphorus",
  food:    "Food, Markets & Local Flavors",
  views:   "Best Views & Hidden Gems",
  water:   "Bosphorus & Water Adventures",
  mix:     "Mixed Highlights",
  asian:   "Asian Side Discovery",
};

// ══════════════════════════════════════════════
// Ana fonksiyon: generatePlan
// ══════════════════════════════════════════════
export function generatePlan({ days, pace, interests }) {
  const config = PACE_CONFIG[pace] || PACE_CONFIG.balanced;
  const totalSpots = days * config.spotsPerDay;

  // 1. İlgi alanına göre attraction'ları filtrele ve skorla
  let candidates = Object.entries(ATTRACTION_TAGS).map(([id, data]) => {
    let score = data.priority;
    // İlgi alanı eşleşme bonusu
    const matchCount = data.tags.filter(tag => interests.includes(tag)).length;
    score += matchCount * 5;
    // "must" tag'i her zaman yüksek skor alır
    if (data.tags.includes("must")) score += 3;
    return { id, ...data, score };
  });

  // Interest seçilmediyse tüm attractionlar aday — must'lar ve yüksek priority olanlar zaten üste çıkar
  // Böylece 7 güne kadar plan üretilebilir

  // Skor sırasına diz
  candidates.sort((a, b) => b.score - a.score);

  // 2. En yüksek skorlu totalSpots kadarını al (aday sayısından fazla isteniyorsa hepsini al)
  const selected = candidates.slice(0, Math.min(totalSpots, candidates.length));

  // 3. Bölgeye göre grupla (rota optimizasyonu)
  const byGroup = { oldcity: [], newcity: [], asian: [], special: [] };
  selected.forEach(s => {
    const group = Object.entries(AREA_GROUPS).find(([_, areas]) => areas.includes(s.area))?.[0] || "special";
    byGroup[group].push(s);
  });

  // 4. Günlere dağıt
  const dayPlans = [];
  const allSpots = [
    ...byGroup.oldcity,
    ...byGroup.newcity,
    ...byGroup.asian,
    ...byGroup.special,
  ];

  for (let d = 0; d < days; d++) {
    const daySpots = allSpots.slice(d * config.spotsPerDay, (d + 1) * config.spotsPerDay);
    if (daySpots.length === 0) continue;

    // Gün başlığı seç
    let title = DAY_TITLES.mix;
    const firstArea = daySpots[0]?.area;
    if (["sultanahmet", "eminonu"].includes(firstArea)) title = DAY_TITLES.oldcity;
    else if (["besiktas", "beyoglu"].includes(firstArea)) title = DAY_TITLES.newcity;
    else if (firstArea === "uskudar") title = DAY_TITLES.asian;
    else if (daySpots.some(s => s.tags.includes("water"))) title = DAY_TITLES.water;
    else if (daySpots.some(s => s.tags.includes("food"))) title = DAY_TITLES.food;

    // Zaman çizelgesi oluştur
    let currentMin = config.startHour * 60; // başlangıç dakika cinsinden
    const items = daySpots.map((spot, idx) => {
      const t = `${String(Math.floor(currentMin / 60)).padStart(2, "0")}:${String(currentMin % 60).padStart(2, "0")}`;
      const durH = Math.floor(spot.duration / 60);
      const durM = spot.duration % 60;
      const durStr = durH > 0 ? (durM > 0 ? `${durH}h ${durM}m` : `${durH}h`) : `${durM}m`;

      const item = {
        id: spot.id,
        t,
        n: spot.id, // App.jsx içinde title alınacak
        m: `${durStr} · ${spot.tags[0]}`,
        tp: spot.tags[0],
      };
      currentMin += spot.duration + config.bufferMin;
      return item;
    });

    // Lunch break ekle (3+ spot varsa)
    if (items.length >= 3) {
      const lunchIdx = Math.floor(items.length / 2);
      const lunchTime = items[lunchIdx].t;
      items.splice(lunchIdx, 0, {
        id: null,
        t: lunchTime,
        n: "Lunch break",
        m: "1h · local restaurant",
        tp: "food",
      });
    }

    dayPlans.push({ day: d + 1, title, items });
  }

  return { days: dayPlans };
}

// ══════════════════════════════════════════════
// İlgi alanları tanımı (UI için)
// ══════════════════════════════════════════════
export const INTERESTS = [
  { id: "history", label: "History & Culture", icon: "🏛️" },
  { id: "food", label: "Food & Markets", icon: "🍽️" },
  { id: "views", label: "Views & Photography", icon: "🌅" },
  { id: "shopping", label: "Shopping & Streets", icon: "🛍️" },
  { id: "water", label: "Bosphorus & Cruises", icon: "⛴️" },
  { id: "family", label: "Family & Relax", icon: "👨‍👩‍👧" },
];

export const PACES = [
  { id: "relaxed", label: "Relaxed", desc: "3 spots/day · time to breathe", icon: "🌿" },
  { id: "balanced", label: "Balanced", desc: "4 spots/day · the sweet spot", icon: "⚖️" },
  { id: "packed", label: "Packed", desc: "6 spots/day · maximum city", icon: "🔥" },
];
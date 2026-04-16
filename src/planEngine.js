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
export function generatePlan({ days, pace, interests, timedTickets = {}, tripStartDate = null }) {
  const config = PACE_CONFIG[pace] || PACE_CONFIG.balanced;
  const totalSpots = days * config.spotsPerDay;

  // ── TIMED TICKETS HAZIRLIĞI ──
  // Her timed ticket'ı hangi güne düştüğünü hesapla
  const timedEntries = [];
  Object.entries(timedTickets).forEach(([id, info]) => {
    const data = ATTRACTION_TAGS[id];
    if (!data) return;

    let fixedDay = 0; // varsayılan Day 1

    if (tripStartDate) {
      // Seyahat tarihi varsa → bilet tarihine göre gün hesapla
      const startDate = new Date(tripStartDate);
      const ticketDate = new Date(info.date);
      const dayDiff = Math.floor((ticketDate - startDate) / (1000 * 60 * 60 * 24));
      if (dayDiff < 0 || dayDiff >= days) return; // plan dışındaki biletleri atla
      fixedDay = dayDiff;
    }
    // Tarih yoksa → Day 1'e koy (fixedDay = 0)

    timedEntries.push({
      id,
      ...data,
      fixedDay,
      fixedTime: info.time,
      isTimed: true,
    });
  });

  const timedIds = new Set(timedEntries.map((t) => t.id));

  // 1. İlgi alanına göre attraction'ları filtrele ve skorla (timed'ları hariç tut, duplikasyon olmasın)
  let candidates = Object.entries(ATTRACTION_TAGS)
    .filter(([id]) => !timedIds.has(id))
    .map(([id, data]) => {
      let score = data.priority;
      const matchCount = data.tags.filter((tag) => interests.includes(tag)).length;
      score += matchCount * 5;
      if (data.tags.includes("must")) score += 3;
      return { id, ...data, score };
    });

  // Skor sırasına diz
  candidates.sort((a, b) => b.score - a.score);

  // 2. Gerekli spot sayısı kadar al (timed ticketları zaten sayıyoruz)
  const remainingSpots = Math.max(0, totalSpots - timedEntries.length);
  const selected = candidates.slice(0, Math.min(remainingSpots, candidates.length));

  // 3. Bölgeye göre grupla (rota optimizasyonu)
  const byGroup = { oldcity: [], newcity: [], asian: [], special: [] };
  selected.forEach((s) => {
    const group = Object.entries(AREA_GROUPS).find(([_, areas]) => areas.includes(s.area))?.[0] || "special";
    byGroup[group].push(s);
  });

  const allSpots = [
    ...byGroup.oldcity,
    ...byGroup.newcity,
    ...byGroup.asian,
    ...byGroup.special,
  ];

  // 4. Günleri başta boş dizi olarak hazırla
  const daySpotArrays = Array.from({ length: days }, () => []);

  // 5. Önce TIMED biletleri doğru günlere yerleştir (sabit)
  timedEntries.forEach((te) => {
    daySpotArrays[te.fixedDay].push(te);
  });

  // 6. Sonra diğer spotları boş slotlara dağıt
  // Timed biletlerin olduğu gün çevresindeki spotları o gün içinde optimize et
  let spotIdx = 0;
  for (let d = 0; d < days; d++) {
    const currentDayCount = daySpotArrays[d].length;
    const remainingInDay = config.spotsPerDay - currentDayCount;

    // Timed ticket varsa, o bölgeye yakın spotları tercih et
    if (daySpotArrays[d].some((s) => s.isTimed)) {
      const timedAreas = daySpotArrays[d].filter((s) => s.isTimed).map((s) => s.area);
      // Aynı bölgeden olanları öncele
      const sameAreaSpots = allSpots.filter((s, i) => i >= spotIdx && timedAreas.includes(s.area));
      sameAreaSpots.slice(0, remainingInDay).forEach((spot) => {
        daySpotArrays[d].push(spot);
        const origIdx = allSpots.indexOf(spot);
        allSpots.splice(origIdx, 1);
      });
    }

    // Kalan slotları sırayla doldur
    while (daySpotArrays[d].length < config.spotsPerDay && spotIdx < allSpots.length) {
      if (!daySpotArrays[d].includes(allSpots[spotIdx])) {
        daySpotArrays[d].push(allSpots[spotIdx]);
        spotIdx++;
      } else {
        spotIdx++;
      }
    }
  }

  // 7. Her gün içinde timed ticket'ı doğru saate yerleştir, diğerlerini ona göre zamanla
  const dayPlans = [];
  const tripStart = tripStartDate ? new Date(tripStartDate) : null;

  for (let d = 0; d < days; d++) {
    const daySpots = daySpotArrays[d];
    if (daySpots.length === 0) continue;

    // Timed ticket'a göre sırala: timed olan sabit kalır, diğerleri önünde/arkasında
    daySpots.sort((a, b) => {
      if (a.isTimed && b.isTimed) return a.fixedTime.localeCompare(b.fixedTime);
      if (a.isTimed) return 0;
      if (b.isTimed) return 0;
      return 0;
    });

    // Gün başlığı seç
    let title = DAY_TITLES.mix;
    const firstArea = daySpots[0]?.area;
    if (["sultanahmet", "eminonu"].includes(firstArea)) title = DAY_TITLES.oldcity;
    else if (["besiktas", "beyoglu"].includes(firstArea)) title = DAY_TITLES.newcity;
    else if (firstArea === "uskudar") title = DAY_TITLES.asian;
    else if (daySpots.some((s) => s.tags.includes("water"))) title = DAY_TITLES.water;
    else if (daySpots.some((s) => s.tags.includes("food"))) title = DAY_TITLES.food;

    // ── ZAMAN ÇİZELGESİ ──
    // Önce timed ticket'ları sabit yerleştir, sonra diğerlerini sıkıştır
    const scheduledItems = [];
    const nonTimedSpots = daySpots.filter((s) => !s.isTimed);
    const timedSpots = daySpots.filter((s) => s.isTimed).sort((a, b) => a.fixedTime.localeCompare(b.fixedTime));

    // Gün başlangıcı
    let currentMin = config.startHour * 60;

    // Kolay durum: hiç timed yok → normal sıralama
    if (timedSpots.length === 0) {
      daySpots.forEach((spot) => {
        const t = minsToTime(currentMin);
        scheduledItems.push(buildItem(spot, t));
        currentMin += spot.duration + config.bufferMin;
      });
    } else {
      // Timed var → timed'ları merkez al, etrafına yerleştir
      // Strateji: Timed ticketları saatine göre sırala, aralara non-timed'ları sıkıştır
      const allOrdered = [];
      let nonTimedIdx = 0;

      for (let i = 0; i < timedSpots.length; i++) {
        const timed = timedSpots[i];
        const timedMin = timeToMins(timed.fixedTime);

        // Timed'dan önce sığacak kadar non-timed ekle
        while (nonTimedIdx < nonTimedSpots.length) {
          const candidate = nonTimedSpots[nonTimedIdx];
          const endTime = currentMin + candidate.duration + config.bufferMin;
          if (endTime <= timedMin) {
            allOrdered.push({ spot: candidate, startMin: currentMin });
            currentMin = endTime;
            nonTimedIdx++;
          } else {
            break;
          }
        }

        // Timed ticket'ı yerleştir
        allOrdered.push({ spot: timed, startMin: timedMin, fixedTime: timed.fixedTime });
        currentMin = timedMin + timed.duration + config.bufferMin;
      }

      // Kalan non-timed'ları sona ekle
      while (nonTimedIdx < nonTimedSpots.length) {
        const candidate = nonTimedSpots[nonTimedIdx];
        allOrdered.push({ spot: candidate, startMin: currentMin });
        currentMin += candidate.duration + config.bufferMin;
        nonTimedIdx++;
      }

      // Item formatına çevir
      allOrdered.forEach(({ spot, startMin, fixedTime }) => {
        const t = fixedTime || minsToTime(startMin);
        const item = buildItem(spot, t);
        if (fixedTime) item.fixed = true;
        scheduledItems.push(item);
      });
    }

    // Lunch break ekle (3+ spot varsa ve timed yoksa)
    if (scheduledItems.length >= 3 && timedSpots.length === 0) {
      const lunchIdx = Math.floor(scheduledItems.length / 2);
      const lunchTime = scheduledItems[lunchIdx].t;
      scheduledItems.splice(lunchIdx, 0, {
        id: null,
        t: lunchTime,
        n: "Lunch break",
        m: "1h · local restaurant",
        tp: "food",
      });
    }

    // Gerçek tarih hesapla
    let dateLabel = null;
    if (tripStart) {
      const dayDate = new Date(tripStart);
      dayDate.setDate(dayDate.getDate() + d);
      dateLabel = dayDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    }

    dayPlans.push({ day: d + 1, title, items: scheduledItems, dateLabel });
  }

  return { days: dayPlans };
}

// Yardımcı: dakikayı "HH:MM" formatına çevir
function minsToTime(mins) {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

// Yardımcı: "HH:MM"'yi dakikaya çevir
function timeToMins(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// Yardımcı: spot'tan item oluştur
function buildItem(spot, t) {
  const durH = Math.floor(spot.duration / 60);
  const durM = spot.duration % 60;
  const durStr = durH > 0 ? (durM > 0 ? `${durH}h ${durM}m` : `${durH}h`) : `${durM}m`;
  return {
    id: spot.id,
    t,
    n: spot.id,
    m: `${durStr} · ${spot.tags[0]}`,
    tp: spot.tags[0],
  };
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
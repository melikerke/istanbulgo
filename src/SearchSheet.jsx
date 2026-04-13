// ══════════════════════════════════════════════
// SearchSheet.jsx — Fullscreen search overlay
// ══════════════════════════════════════════════
// Attractions, Guides, Quick Access araması
// Props:
//   onClose
//   attractions → ATT array
//   guides → GUIDES array
//   onSelectAttraction(att)   → MiniPreview aç
//   onSelectGuide(guideId)    → explore + guide açar
//   onQuickAction(action)     → "transport", "esim", "plan", "book", "explore", "trip"

import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, Compass, ArrowRight, Clock, TrendingUp } from "lucide-react";

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", soft: "#F8FAFC",
  blue: "#1D4ED8", blueSoft: "#DBEAFE",
  gold: "#C59D5F",
  dark: "#0B1220",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

// ── Quick access items ──
const QUICK_ACTIONS = [
  { id: "plan",      label: "Plan my trip",    desc: "Build a smart itinerary",      keywords: ["plan", "itinerary", "trip", "day", "route"] },
  { id: "transport", label: "Public Transport",desc: "Metro, tram, ferry, cards",    keywords: ["transport", "metro", "tram", "ferry", "bus", "istanbulkart", "card"] },
  { id: "esim",      label: "eSIM & Data",     desc: "Stay connected in Turkey",     keywords: ["esim", "data", "internet", "wifi", "sim", "connection", "phone"] },
  { id: "book",      label: "Tickets & Tours", desc: "Browse all bookings",          keywords: ["ticket", "book", "tour", "skip", "line"] },
  { id: "explore",   label: "Explore guides",  desc: "Curated collections",          keywords: ["guide", "explore", "discover"] },
  { id: "trip",      label: "My saved places", desc: "Your trip wallet",             keywords: ["saved", "favorites", "wallet", "my"] },
];

// ── Popular suggestion chips ──
const POPULAR = ["Hagia Sophia", "Food tour", "Transport", "Hidden gems", "eSIM"];

export default function SearchSheet({
  onClose, attractions = [], guides = [],
  onSelectAttraction, onSelectGuide, onQuickAction,
}) {
  const [q, setQ] = useState("");
  const [vis, setVis] = useState(false);
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVis(true), 10);
    setTimeout(() => inputRef.current?.focus(), 300);
    // Son aramaları yükle
    try {
      const saved = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      setRecent(saved.slice(0, 5));
    } catch { /* ignore */ }
  }, []);

  const handleClose = () => {
    setVis(false);
    setTimeout(onClose, 250);
  };

  const saveRecent = (term) => {
    if (!term || term.length < 2) return;
    const updated = [term, ...recent.filter(r => r !== term)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // ── Search logic ──
  const ql = q.toLowerCase().trim();
  const hasQuery = ql.length >= 1;

  const matchedAttractions = hasQuery ? attractions.filter(a => {
    const hay = [a.title, a.cat, a.area, a.hook, a.teaser, a.badge].join(" ").toLowerCase();
    return hay.includes(ql);
  }).slice(0, 8) : [];

  const matchedGuides = hasQuery ? guides.filter(g => {
    const hay = [g.title, g.sub].join(" ").toLowerCase();
    return hay.includes(ql);
  }).slice(0, 4) : [];

  const matchedQuick = hasQuery ? QUICK_ACTIONS.filter(qa => {
    const hay = [qa.label, qa.desc, ...qa.keywords].join(" ").toLowerCase();
    return hay.includes(ql);
  }).slice(0, 4) : [];

  const totalResults = matchedAttractions.length + matchedGuides.length + matchedQuick.length;
  const noResults = hasQuery && totalResults === 0;

  // ── Handlers ──
  const clickAttraction = (a) => {
    saveRecent(a.title);
    handleClose();
    setTimeout(() => onSelectAttraction && onSelectAttraction(a), 250);
  };
  const clickGuide = (g) => {
    saveRecent(g.title);
    handleClose();
    setTimeout(() => onSelectGuide && onSelectGuide(g.id), 250);
  };
  const clickQuick = (qa) => {
    saveRecent(qa.label);
    handleClose();
    setTimeout(() => onQuickAction && onQuickAction(qa.id), 250);
  };
  const clickChip = (term) => {
    setQ(term);
    inputRef.current?.focus();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      fontFamily: "'Inter',system-ui,sans-serif",
      background: "white",
      transform: vis ? "translateY(0)" : "translateY(20px)",
      opacity: vis ? 1 : 0,
      transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1), opacity 0.25s",
      display: "flex", flexDirection: "column",
    }}>

      {/* HEADER */}
      <div style={{
        flexShrink: 0, padding: "16px 16px 10px",
        borderBottom: `1px solid ${C.line}`,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: C.soft, borderRadius: 14, padding: "12px 14px",
        }}>
          <Search size={18} color={C.inkMute} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search places, guides, info..."
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontSize: 15, color: C.ink, fontFamily: "inherit",
            }}
          />
          {q && (
            <div onClick={() => setQ("")} style={{
              width: 22, height: 22, borderRadius: 11, background: C.line,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <X size={12} color={C.inkSoft} />
            </div>
          )}
          <div onClick={handleClose} style={{
            fontSize: 14, fontWeight: 700, color: C.blue, cursor: "pointer", marginLeft: 4,
          }}>
            Cancel
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>

        {/* ── EMPTY STATE (no query) ── */}
        {!hasQuery && (
          <>
            {recent.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 10,
                  fontSize: 11, fontWeight: 700, color: C.inkMute,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  <Clock size={12} />Recent
                </div>
                {recent.map((r, i) => (
                  <div key={i} onClick={() => clickChip(r)} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 4px", borderBottom: i < recent.length - 1 ? `1px solid ${C.line}` : "none",
                    cursor: "pointer",
                  }}>
                    <Clock size={14} color={C.inkMute} />
                    <span style={{ flex: 1, fontSize: 14, color: C.inkSoft }}>{r}</span>
                    <ArrowRight size={14} color={C.inkMute} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6, marginBottom: 10,
                fontSize: 11, fontWeight: 700, color: C.inkMute,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>
                <TrendingUp size={12} />Popular searches
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {POPULAR.map(p => (
                  <div key={p} onClick={() => clickChip(p)} style={{
                    padding: "9px 14px", borderRadius: 99,
                    border: `1px solid ${C.line}`, background: "white",
                    fontSize: 13, fontWeight: 600, color: C.inkSoft, cursor: "pointer",
                  }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: 32, textAlign: "center", fontSize: 12, color: C.inkMute,
              lineHeight: 1.7,
            }}>
              Try: Hagia Sophia, food tour, transport,<br/>hidden gems, eSIM...
            </div>
          </>
        )}

        {/* ── NO RESULTS ── */}
        {noResults && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Search size={40} color={C.line} style={{ margin: "0 auto 16px" }} />
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>No results for "{q}"</div>
            <div style={{ fontSize: 13, color: C.inkMute, lineHeight: 1.6 }}>
              Try different keywords — places, categories, or activities.
            </div>
          </div>
        )}

        {/* ── ATTRACTIONS ── */}
        {matchedAttractions.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.inkMute, marginBottom: 10,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              🏛️ Places · {matchedAttractions.length}
            </div>
            {matchedAttractions.map(a => (
              <div key={a.id} onClick={() => clickAttraction(a)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0", borderBottom: `1px solid ${C.line}`,
                cursor: "pointer",
              }}>
                <img src={a.img} alt={a.title} style={{
                  width: 52, height: 52, borderRadius: 12, objectFit: "cover", flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: C.inkMute, marginTop: 2 }}>
                    {a.cat} · {a.area} {a.price > 0 ? `· €${a.price}` : "· Free"}
                  </div>
                </div>
                <ArrowRight size={14} color={C.inkMute} />
              </div>
            ))}
          </div>
        )}

        {/* ── GUIDES ── */}
        {matchedGuides.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.inkMute, marginBottom: 10,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              📖 Guides · {matchedGuides.length}
            </div>
            {matchedGuides.map(g => (
              <div key={g.id} onClick={() => clickGuide(g)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0", borderBottom: `1px solid ${C.line}`,
                cursor: "pointer",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: C.soft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>{g.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: C.inkMute, marginTop: 2 }}>{g.sub}</div>
                </div>
                <ArrowRight size={14} color={C.inkMute} />
              </div>
            ))}
          </div>
        )}

        {/* ── QUICK ACCESS ── */}
        {matchedQuick.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.inkMute, marginBottom: 10,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              🧭 Quick access · {matchedQuick.length}
            </div>
            {matchedQuick.map(qa => (
              <div key={qa.id} onClick={() => clickQuick(qa)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0", borderBottom: `1px solid ${C.line}`,
                cursor: "pointer",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: C.blueSoft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Compass size={18} color={C.blue} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{qa.label}</div>
                  <div style={{ fontSize: 11, color: C.inkMute, marginTop: 2 }}>{qa.desc}</div>
                </div>
                <ArrowRight size={14} color={C.inkMute} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

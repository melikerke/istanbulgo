// ══════════════════════════════════════════════
// TransportSheet.jsx — İstanbul toplu taşıma rehberi
// ══════════════════════════════════════════════
// 1. Karar kartı (hangi seçenek bana uygun?)
// 2. Öncelikli ulaşım araçları (Tram, Metro, Ferry, Marmaray)
// 3. Istanbulkart bilgisi (Buy / Top up / App)
// 4. Havalimanı transferi (öneri bazlı)
// 5. Tips + soft mistakes
// 6. Sticky CTA (Unlimited Travel Card)

import { useState, useEffect } from "react";
import {
  ArrowLeft, Train, Bus, Ship, CreditCard, MapPin, Clock,
  ChevronRight, Check, Zap, QrCode, Plane, Info, AlertTriangle,
  Smartphone, Download
} from "lucide-react";

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", soft: "#F8FAFC",
  blue: "#1D4ED8", blueSoft: "#DBEAFE",
  ok: "#059669", okSoft: "#D1FAE5",
  warn: "#D97706", warnSoft: "#FEF3C7",
  dark: "#0B1220",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

export default function TransportSheet({ onClose }) {
  const [vis, setVis] = useState(false);

  useEffect(() => { setTimeout(() => setVis(true), 10); }, []);

  const handleClose = () => { setVis(false); setTimeout(onClose, 250); };

  // ── Section wrapper ──
  const Sec = ({ children, bg = "white" }) => (
    <div style={{ borderRadius: 20, border: `1px solid ${C.line}`, background: bg, padding: 16, marginBottom: 12 }}>
      {children}
    </div>
  );

  const Title = ({ children }) => (
    <div style={{ fontSize: 14, fontWeight: 800, color: C.ink, marginBottom: 10 }}>{children}</div>
  );

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      fontFamily: "'Inter',system-ui,sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)",
      transition: "opacity 0.25s", opacity: vis ? 1 : 0,
    }}>
      <div style={{
        width: "100%", maxWidth: 440, height: "100%",
        display: "flex", flexDirection: "column", background: "white",
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
      }}>

        {/* ── HERO ── */}
        <div style={{
          position: "relative",
          background: `linear-gradient(135deg, ${C.dark} 0%, #16233B 50%, ${C.ok} 100%)`,
          padding: "32px 20px 28px", color: "white", flexShrink: 0,
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)", backgroundSize: "16px 16px" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <button onClick={handleClose} style={{ width: 40, height: 40, borderRadius: 16, border: "none", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <ArrowLeft size={16} color="white" />
              </button>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)" }}>
                Get around
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Train size={28} color="#6EE7B7" />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: fd, letterSpacing: "-0.03em" }}>Istanbul Transport</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>One card, every ride — metro, tram, ferry & more</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px 24px", background: "linear-gradient(180deg,#F8FBFF 0%,#F5F7FB 30%)" }}>

          {/* ════════════════════════════
             1. KARAR KARTI
          ════════════════════════════ */}
          <Sec bg="linear-gradient(135deg, #EFF6FF, #F8FAFC)">
            <Title>Which one should I get?</Title>
            {[
              {
                icon: CreditCard, label: "Normal Istanbulkart",
                who: "3-day trip · flexible use",
                desc: "Pay-as-you-go. Best for most tourists.",
                tone: C.okSoft, ac: C.ok, pick: true,
              },
              {
                icon: Zap, label: "Unlimited Travel Card",
                who: "5+ rides per day · heavy sightseeing",
                desc: "Unlimited rides for a set number of days.",
                tone: C.blueSoft, ac: C.blue, pick: false,
              },
              {
                icon: QrCode, label: "Single Ride QR",
                who: "Just 1 ride · quick visit",
                desc: "Scan and go. No card needed.",
                tone: C.warnSoft, ac: C.warn, pick: false,
              },
            ].map((opt) => (
              <div key={opt.label} style={{
                display: "flex", gap: 12, padding: "10px 0",
                borderTop: `1px solid ${C.line}`, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: opt.tone, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <opt.icon size={18} color={opt.ac} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{opt.label}</span>
                    {opt.pick && (
                      <span style={{ fontSize: 9, fontWeight: 700, background: C.okSoft, color: C.ok, padding: "2px 6px", borderRadius: 4 }}>
                        Best for most
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: C.inkMute, marginTop: 2 }}>{opt.who}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3 }}>{opt.desc}</div>
                </div>
              </div>
            ))}
          </Sec>

          {/* ════════════════════════════
             2. ULAŞIM ARAÇLARI (öncelikli)
          ════════════════════════════ */}
          <Title>The ones you'll actually use</Title>
          {[
            {
              icon: Train, name: "Tram T1", color: "#1D4ED8",
              desc: "The tourist tram. Kabataş → Sultanahmet → Grand Bazaar → Bağcılar. Covers most sightseeing spots.",
              tip: "Every 5 min · runs 06:00–00:00",
            },
            {
              icon: Train, name: "Metro", color: "#E11D48",
              desc: "Fast underground lines. M2 connects Taksim to the old city. M11 goes to Istanbul Airport.",
              tip: "Every 3–5 min · 11 lines",
            },
            {
              icon: Ship, name: "Ferry", color: "#0891B2",
              desc: "Cross between Europe and Asia by water. The most scenic commute in the world. Kabataş ↔ Kadıköy is the classic route.",
              tip: "Every 20 min · best views on the city",
            },
            {
              icon: Train, name: "Marmaray", color: "#059669",
              desc: "Crosses under the Bosphorus. Europe ↔ Asia in 4 minutes. Fast and reliable.",
              tip: "Every 10 min · connects to metro",
            },
          ].map((t) => (
            <div key={t.name} style={{
              borderRadius: 20, border: `1px solid ${C.line}`, background: "white",
              padding: 14, marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: t.color + "15", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <t.icon size={18} color={t.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3, lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: t.color, fontWeight: 600 }}>
                <Clock size={10} /> {t.tip}
              </div>
            </div>
          ))}

          {/* Also available (secondary) */}
          <div style={{
            borderRadius: 16, background: C.soft, padding: 14,
            marginBottom: 12, border: `1px solid ${C.line}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.inkMute, marginBottom: 6 }}>Also available</div>
            <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.6 }}>
              <strong>Metrobus</strong> — dedicated lane, never stuck in traffic, runs 24/7. Great for long distances.
            </div>
            <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.6, marginTop: 4 }}>
              <strong>City Buses (İETT)</strong> — cover the whole city. Useful for neighborhoods not on rail lines. Use Moovit app for routes.
            </div>
          </div>

          {/* ════════════════════════════
             3. ISTANBULKART — Buy / Top up / App
          ════════════════════════════ */}
          <Title>Getting your Istanbulkart</Title>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              {
                icon: MapPin, label: "Buy",
                lines: ["Yellow kiosks at stations", "Airport arrivals hall", "Corner shops (bakkal)"],
              },
              {
                icon: CreditCard, label: "Top up",
                lines: ["Same yellow machines", "Cash & card accepted", "₺50–100 is enough"],
              },
              {
                icon: Smartphone, label: "App",
                lines: ["Istanbulkart app", "Top up via NFC", "Check balance"],
              },
            ].map((block) => (
              <div key={block.label} style={{
                borderRadius: 16, border: `1px solid ${C.line}`, background: "white",
                padding: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: C.okSoft, display: "flex",
                  alignItems: "center", justifyContent: "center", marginBottom: 8,
                }}>
                  <block.icon size={15} color={C.ok} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{block.label}</div>
                {block.lines.map((line) => (
                  <div key={line} style={{ fontSize: 10, color: C.inkSoft, lineHeight: 1.5 }}>
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Quick fact bar */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {[
              { l: "Card price", v: "₺150" },
              { l: "Single ride", v: "~₺20" },
              { l: "Transfer", v: "Discounted" },
            ].map((f) => (
              <div key={f.l} style={{
                flex: 1, borderRadius: 14, background: C.dark, padding: "10px 8px",
                textAlign: "center", color: "white",
              }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{f.l}</div>
                <div style={{ fontSize: 14, fontWeight: 800, marginTop: 2 }}>{f.v}</div>
              </div>
            ))}
          </div>

          {/* ════════════════════════════
             4. AIRPORT → CITY (öneri bazlı)
          ════════════════════════════ */}
          <Title>Airport → City center</Title>
          {[
            {
              badge: "Best value", tone: C.okSoft, ac: C.ok,
              icon: Bus, name: "Havaist Bus",
              route: "IST → Taksim / Kadıköy / Sultanahmet",
              time: "~60 min", price: "€12",
              note: "Every 30 min, 24/7. Most popular tourist option.",
            },
            {
              badge: "Cheapest", tone: C.blueSoft, ac: C.blue,
              icon: Train, name: "Metro M11",
              route: "IST → Gayrettepe (connect to M2)",
              time: "~35 min", price: "~€1",
              note: "Fast but requires a metro transfer to reach hotels.",
            },
            {
              badge: "Most comfortable", tone: C.warnSoft, ac: C.warn,
              icon: MapPin, name: "Private Transfer",
              route: "Door-to-door, meet at arrivals",
              time: "~45 min", price: "€35–45",
              note: "Best for late arrivals or groups with luggage.",
            },
          ].map((opt) => (
            <div key={opt.name} style={{
              borderRadius: 20, border: `1px solid ${C.line}`, background: "white",
              padding: 16, marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: opt.tone, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <opt.icon size={18} color={opt.ac} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{opt.name}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      background: opt.tone, color: opt.ac,
                      padding: "2px 6px", borderRadius: 4,
                    }}>{opt.badge}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.inkMute, marginTop: 2 }}>{opt.route}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{opt.price}</div>
                  <div style={{ fontSize: 10, color: C.inkMute }}>{opt.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.5 }}>{opt.note}</div>
            </div>
          ))}

          {/* ════════════════════════════
             5. TIPS
          ════════════════════════════ */}
          <Sec bg={C.warnSoft}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.warn, marginBottom: 8 }}>💡 Transport tips</div>
            {[
              "Buy Istanbulkart at the airport before leaving",
              "Top up ₺100–150 for a 3-day trip",
              "Transfers within 2 hours get a discount",
              "Tram T1 covers most tourist spots",
              "Ferries are the most scenic transport",
              "Use Moovit or Google Maps for live routes",
              "Taxi: always use BiTaksi app — never hail on the street",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "3px 0", fontSize: 12, color: C.inkSoft }}>
                <span style={{ color: C.warn }}>→</span>{tip}
              </div>
            ))}
          </Sec>

          {/* ════════════════════════════
             6. AVOID THESE (soft tone)
          ════════════════════════════ */}
          <Sec bg="linear-gradient(135deg, #FFF1F2, #FFF)">
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Info size={14} color="#E11D48" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#E11D48" }}>Avoid these mistakes</span>
            </div>
            {[
              "Hailing random taxis — use BiTaksi app instead",
              "Not topping up enough — machines aren't everywhere",
              "Taking tram at rush hour (08:00–09:30) — very packed",
              "Missing last ferry — check schedules in advance",
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "3px 0", fontSize: 12, color: C.inkSoft }}>
                <span>⚠️</span>{m}
              </div>
            ))}
          </Sec>
        </div>

        {/* ── STICKY CTA ── */}
        <div style={{
          flexShrink: 0, borderTop: `1px solid ${C.line}`,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)",
          padding: "12px 16px 18px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: C.ok, fontWeight: 600 }}>♾️ Unlimited metro, tram, bus, ferry</div>
              <div style={{ fontSize: 10, color: C.inkMute, marginTop: 1 }}>Unlimited Travel Card</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>₺150</div>
            </div>
            <a
              href="https://istanbulwelcomecard.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, padding: "12px 20px", borderRadius: 14,
                background: `linear-gradient(135deg, ${C.ok}, #047857)`,
                color: "white", fontSize: 13, fontWeight: 700,
                textDecoration: "none", boxShadow: "0 4px 14px rgba(5,150,105,0.3)",
                cursor: "pointer",
              }}
            >
              <CreditCard size={14} /> Get Unlimited Pass →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

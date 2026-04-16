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
import { useLanguage } from "./LanguageContext";

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
  const { t } = useLanguage();
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
                {t("transport.getAround")}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Train size={28} color="#6EE7B7" />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: fd, letterSpacing: "-0.03em" }}>{t("transport.title")}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{t("transport.subtitle")}</div>
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
            <Title>{t("transport.whichOne")}</Title>
            {[
              {
                icon: CreditCard, label: t("tr.opt.normal"),
                who: t("tr.opt.normalWho"),
                desc: t("tr.opt.normalDesc"),
                tone: C.okSoft, ac: C.ok, pick: true,
              },
              {
                icon: Zap, label: t("tr.opt.unlimited"),
                who: t("tr.opt.unlimitedWho"),
                desc: t("tr.opt.unlimitedDesc"),
                tone: C.blueSoft, ac: C.blue, pick: false,
              },
              {
                icon: QrCode, label: t("tr.opt.qr"),
                who: t("tr.opt.qrWho"),
                desc: t("tr.opt.qrDesc"),
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
                        {t("tr.opt.bestFor")}
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
          <Title>{t("transport.actuallyUse")}</Title>
          {[
            {
              icon: Train, name: t("tr.mode.tram.name"), color: "#1D4ED8",
              desc: t("tr.mode.tram.desc"),
              tip: t("tr.mode.tram.tip"),
            },
            {
              icon: Train, name: t("tr.mode.metro.name"), color: "#E11D48",
              desc: t("tr.mode.metro.desc"),
              tip: t("tr.mode.metro.tip"),
            },
            {
              icon: Ship, name: t("tr.mode.ferry.name"), color: "#0891B2",
              desc: t("tr.mode.ferry.desc"),
              tip: t("tr.mode.ferry.tip"),
            },
            {
              icon: Train, name: t("tr.mode.marmaray.name"), color: "#059669",
              desc: t("tr.mode.marmaray.desc"),
              tip: t("tr.mode.marmaray.tip"),
            },
          ].map((m) => (
            <div key={m.name} style={{
              borderRadius: 20, border: `1px solid ${C.line}`, background: "white",
              padding: 14, marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: m.color + "15", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <m.icon size={18} color={m.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3, lineHeight: 1.5 }}>{m.desc}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: m.color, fontWeight: 600 }}>
                <Clock size={10} /> {m.tip}
              </div>
            </div>
          ))}

          {/* Also available (secondary) */}
          <div style={{
            borderRadius: 16, background: C.soft, padding: 14,
            marginBottom: 12, border: `1px solid ${C.line}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.inkMute, marginBottom: 6 }}>{t("tr.alsoAvail")}</div>
            <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.6 }}>
              <strong>{t("tr.metrobus")}</strong> — {t("tr.metrobusDesc")}
            </div>
            <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.6, marginTop: 4 }}>
              <strong>{t("tr.citybus")}</strong> — {t("tr.citybusDesc")}
            </div>
          </div>

          {/* ════════════════════════════
             3. ISTANBULKART — Buy / Top up / App
          ════════════════════════════ */}
          <Title>{t("transport.gettingCard")}</Title>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              {
                icon: MapPin, label: t("tr.kart.buy"),
                lines: [t("tr.kart.buy1"), t("tr.kart.buy2"), t("tr.kart.buy3")],
              },
              {
                icon: CreditCard, label: t("tr.kart.topup"),
                lines: [t("tr.kart.topup1"), t("tr.kart.topup2"), t("tr.kart.topup3")],
              },
              {
                icon: Smartphone, label: t("tr.kart.app"),
                lines: [t("tr.kart.app1"), t("tr.kart.app2"), t("tr.kart.app3")],
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
              { l: t("tr.fact.price"), v: "₺150" },
              { l: t("tr.fact.single"), v: "~₺20" },
              { l: t("tr.fact.transfer"), v: t("tr.fact.transferV") },
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
          <Title>{t("transport.airportToCity")}</Title>
          {[
            {
              badge: t("tr.air.bus.badge"), tone: C.okSoft, ac: C.ok,
              icon: Bus, name: t("tr.air.bus.name"),
              route: t("tr.air.bus.route"),
              time: t("tr.air.bus.time"), price: "€12",
              note: t("tr.air.bus.note"),
            },
            {
              badge: t("tr.air.metro.badge"), tone: C.blueSoft, ac: C.blue,
              icon: Train, name: t("tr.air.metro.name"),
              route: t("tr.air.metro.route"),
              time: t("tr.air.metro.time"), price: "~€1",
              note: t("tr.air.metro.note"),
            },
            {
              badge: t("tr.air.private.badge"), tone: C.warnSoft, ac: C.warn,
              icon: MapPin, name: t("tr.air.private.name"),
              route: t("tr.air.private.route"),
              time: t("tr.air.private.time"), price: "€35–45",
              note: t("tr.air.private.note"),
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
            <div style={{ fontSize: 13, fontWeight: 700, color: C.warn, marginBottom: 8 }}>💡 {t("transport.tips")}</div>
            {[
              t("tr.tip1"),
              t("tr.tip2"),
              t("tr.tip3"),
              t("tr.tip4"),
              t("tr.tip5"),
              t("tr.tip6"),
              t("tr.tip7"),
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
              <span style={{ fontSize: 13, fontWeight: 700, color: "#E11D48" }}>{t("tr.avoidTitle")}</span>
            </div>
            {[
              t("tr.avoid1"),
              t("tr.avoid2"),
              t("tr.avoid3"),
              t("tr.avoid4"),
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
              <div style={{ fontSize: 10, color: C.ok, fontWeight: 600 }}>{t("tr.cta.benefit")}</div>
              <div style={{ fontSize: 10, color: C.inkMute, marginTop: 1 }}>{t("tr.cta.label")}</div>
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
              <CreditCard size={14} /> {t("transport.getPass")} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
// ══════════════════════════════════════════════
// EsimSheet.jsx — eSIM bilgi + satış sayfası
// ══════════════════════════════════════════════

import { useState, useEffect } from "react";
import {
  ArrowLeft, Wifi, Smartphone, Check, X, Globe, Zap,
  Shield, Clock, ChevronRight, Signal, MapPin
} from "lucide-react";

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", soft: "#F8FAFC",
  blue: "#1D4ED8", blueSoft: "#DBEAFE",
  ok: "#059669", okSoft: "#D1FAE5",
  warn: "#D97706", warnSoft: "#FEF3C7",
  purple: "#6D28D9", purpleSoft: "#EDE9FE",
  dark: "#0B1220",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

// ── Uyumlu telefonlar ──
const COMPATIBLE = {
  apple: ["iPhone XR", "iPhone XS / XS Max", "iPhone 11 / 11 Pro / 11 Pro Max", "iPhone 12 / Mini / Pro / Pro Max", "iPhone 13 / Mini / Pro / Pro Max", "iPhone 14 / Plus / Pro / Pro Max", "iPhone 15 / Plus / Pro / Pro Max", "iPhone 16 / Plus / Pro / Pro Max", "iPad Pro (3rd gen+)", "iPad Air (3rd gen+)"],
  samsung: ["Galaxy S20 / S20+ / S20 Ultra", "Galaxy S21 / S21+ / S21 Ultra", "Galaxy S22 / S22+ / S22 Ultra", "Galaxy S23 / S23+ / S23 Ultra", "Galaxy S24 / S24+ / S24 Ultra", "Galaxy Z Flip 3/4/5/6", "Galaxy Z Fold 3/4/5/6", "Galaxy Note 20 / 20 Ultra"],
  google: ["Pixel 3 / 3 XL / 3a / 3a XL", "Pixel 4 / 4 XL / 4a", "Pixel 5 / 5a", "Pixel 6 / 6 Pro / 6a", "Pixel 7 / 7 Pro / 7a", "Pixel 8 / 8 Pro / 8a", "Pixel 9 / 9 Pro"],
  other: ["Huawei P40 / P40 Pro", "Xiaomi 12T Pro / 13 Pro / 14", "OnePlus 12", "Oppo Find X5 Pro / X6 Pro"],
};

// ── eSIM sağlayıcı ──
const PROVIDER = {
  name: "eSIM Turkey",
  data: "5 GB",
  days: "30 days",
  price: "€4.99",
  link: "https://www.esim-turkey.com",
  features: ["Local Turkish number", "5 GB data for 30 days", "Easy QR activation", "24/7 support", "Works on all eSIM phones"],
};

export default function EsimSheet({ onClose, onBook }) {
  const [vis, setVis] = useState(false);
  const [compatOpen, setCompatOpen] = useState(false);

  useEffect(() => { setTimeout(() => setVis(true), 10); }, []);

  const handleClose = () => { setVis(false); setTimeout(onClose, 250); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, fontFamily: "'Inter',system-ui,sans-serif", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", transition: "opacity 0.25s", opacity: vis ? 1 : 0 }}>
      <div style={{ width: "100%", maxWidth: 440, height: "100%", display: "flex", flexDirection: "column", background: "white", transform: vis ? "translateY(0)" : "translateY(40px)", transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)" }}>

        {/* ── HERO ── */}
        <div style={{ position: "relative", background: `linear-gradient(135deg, ${C.dark} 0%, #16233B 50%, ${C.purple} 100%)`, padding: "32px 20px 28px", color: "white", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)", backgroundSize: "16px 16px" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <button onClick={handleClose} style={{ width: 40, height: 40, borderRadius: 16, border: "none", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ArrowLeft size={16} color="white" /></button>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)" }}>Stay connected</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}><Wifi size={28} color="#A78BFA" /></div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: fd, letterSpacing: "-0.03em" }}>eSIM for Turkey</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Land connected — no SIM swap needed</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px 24px", background: "linear-gradient(180deg,#F8FBFF 0%,#F5F7FB 30%)" }}>

          {/* What is eSIM */}
          <div style={{ borderRadius: 20, border: `1px solid ${C.line}`, background: "white", padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>What is an eSIM?</div>
            <div style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.7 }}>
              An eSIM is a digital SIM built into your phone. No physical card, no swapping — just scan a QR code and you're connected. Install it before your flight, and you'll have data the moment you land in Istanbul.
            </div>
          </div>

          {/* Benefits */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { icon: Zap, label: "Instant setup", sub: "2 minutes" },
              { icon: Globe, label: "Works anywhere", sub: "In Turkey" },
              { icon: Shield, label: "Keep your number", sub: "Dual SIM" },
            ].map(b => (
              <div key={b.label} style={{ borderRadius: 16, border: `1px solid ${C.line}`, background: "white", padding: 12, textAlign: "center" }}>
                <b.icon size={20} color={C.purple} style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: 11, fontWeight: 700 }}>{b.label}</div>
                <div style={{ fontSize: 10, color: C.inkMute, marginTop: 2 }}>{b.sub}</div>
              </div>
            ))}
          </div>

          {/* Compatibility checker button */}
          <div onClick={() => setCompatOpen(true)} style={{ borderRadius: 20, background: C.purpleSoft, padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <Smartphone size={22} color={C.purple} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Is my phone compatible?</div>
              <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>Tap to check your device</div>
            </div>
            <ChevronRight size={16} color={C.purple} />
          </div>

          {/* How to install */}
          <div style={{ borderRadius: 20, border: `1px solid ${C.line}`, background: "white", padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10 }}>How to set up</div>
            {[
              { step: "1", text: "Buy your eSIM plan online" },
              { step: "2", text: "Scan the QR code from your email" },
              { step: "3", text: "Activate when you land in Turkey" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: 10, padding: "6px 0", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: 10, background: C.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.purple, flexShrink: 0 }}>{s.step}</div>
                <div style={{ fontSize: 13, color: C.inkSoft }}>{s.text}</div>
              </div>
            ))}
          </div>

          {/* eSIM Turkey */}
          <div style={{ borderRadius: 20, border: `2px solid ${C.ok}`, background: "white", padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: C.okSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Signal size={22} color={C.ok} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>{PROVIDER.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, background: C.okSoft, color: C.ok, padding: "2px 6px", borderRadius: 4 }}>Recommended</span>
                </div>
                <div style={{ fontSize: 12, color: C.inkMute, marginTop: 2 }}>{PROVIDER.data} · {PROVIDER.days}</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{PROVIDER.price}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {PROVIDER.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.inkSoft }}>
                  <Check size={12} color={C.ok} />{f}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={{ borderRadius: 20, background: C.warnSoft, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.warn, marginBottom: 8 }}>💡 Good to know</div>
            {["Install your eSIM before the flight — you need WiFi for setup", "Your regular SIM stays active for calls & texts", "Airport WiFi works but is slow — don't rely on it for setup", "Most plans auto-activate when you connect to a Turkish network"].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "3px 0", fontSize: 12, color: C.inkSoft }}>
                <span style={{ color: C.warn }}>→</span>{tip}
              </div>
            ))}
          </div>
        </div>

        {/* ── STICKY CTA ── */}
        <div style={{ flexShrink: 0, borderTop: `1px solid ${C.line}`, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", padding: "12px 16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: C.inkMute }}>From</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>€4.99</div>
            </div>
            <a href="https://www.esim-turkey.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 20px", borderRadius: 14, background: `linear-gradient(135deg, ${C.purple}, #4C1D95)`, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 14px rgba(109,40,217,0.3)", cursor: "pointer" }}>
              <Wifi size={14} /> Get eSIM →
            </a>
          </div>
        </div>
      </div>

      {/* ── COMPATIBILITY CHECKER POPUP ── */}
      {compatOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={() => setCompatOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: 360, maxHeight: "80vh", borderRadius: 28, background: "white", overflow: "hidden", boxShadow: "0 25px 60px rgba(15,23,42,0.25)" }}>
            <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: fd }}>📱 Compatibility</div>
              <button onClick={() => setCompatOpen(false)} style={{ width: 32, height: 32, borderRadius: 10, border: "none", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} color={C.inkSoft} /></button>
            </div>
            <div style={{ padding: "12px 20px 20px", overflowY: "auto", maxHeight: "65vh" }}>
              <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 14 }}>If your phone is on this list, you're good to go.</div>
              {Object.entries(COMPATIBLE).map(([brand, phones]) => (
                <div key={brand} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.inkMute, marginBottom: 6 }}>{brand === "other" ? "Other brands" : brand}</div>
                  {phones.map(phone => (
                    <div key={phone} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 13, color: C.inkSoft }}>
                      <Check size={12} color={C.ok} />{phone}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ borderRadius: 14, background: C.warnSoft, padding: 12, marginTop: 8 }}>
                <div style={{ fontSize: 12, color: C.warn, fontWeight: 600 }}>Not on the list?</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 4 }}>Your phone may still support eSIM. Check Settings → Cellular → Add eSIM on your device.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// PremiumSheet.jsx — Premium yükseltme sayfası
// ══════════════════════════════════════════════
// Premium özelliklerini gösterir, satın alma akışı.
// Şu an demo — ileride Stripe bağlanacak.
//
// Props:
//   onClose      → kapatma fonksiyonu
//   onPurchase   → "Buy Premium" tıklanınca çağrılır
//   isPremium    → zaten premium mi?

import { useState, useEffect } from "react";
import {
  X, Crown, Sparkles, Wifi, Camera, Zap, Gift, Map,
  Check, Star, ArrowLeft, Shield, Clock
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

// ── Renkler ──
const colors = {
  ink: "#0F172A",
  inkSoft: "#475569",
  inkMute: "#94A3B8",
  line: "#E2E8F0",
  primary: "#1D4ED8",
  primarySoft: "#DBEAFE",
  gold: "#C59D5F",
  goldSoft: "#FBF5EB",
  ok: "#059669",
  okSoft: "#D1FAE5",
  dark: "#0B1220",
};

const fontDisplay = "'Plus Jakarta Sans', system-ui, sans-serif";
const fontBody = "'Inter', system-ui, sans-serif";

export default function PremiumSheet({ onClose, onPurchase, isPremium }) {
  const { t } = useLanguage();
  // ── Animasyon ──
  const [visible, setVisible] = useState(false);

  // ── Premium özellik listesi (t ile çevrilebilir) ──
  const PREMIUM_FEATURES = [
    { icon: Sparkles, title: t("premiumF.aiTitle"), description: t("premiumF.aiDesc"), highlight: true },
    { icon: Wifi, title: t("premiumF.offlineTitle"), description: t("premiumF.offlineDesc"), highlight: false },
    { icon: Camera, title: t("premiumF.photoTitle"), description: t("premiumF.photoDesc"), highlight: false },
    { icon: Zap, title: t("premiumF.briefingTitle"), description: t("premiumF.briefingDesc"), highlight: false },
    { icon: Gift, title: t("premiumF.discountTitle"), description: t("premiumF.discountDesc"), highlight: false },
  ];

  // ── Zaten free olan özellikler ──
  const FREE_FEATURES = [
    t("premiumF.free1"),
    t("premiumF.free2"),
    t("premiumF.free3"),
    t("premiumF.free4"),
    t("premiumF.free5"),
    t("premiumF.free6"),
  ];

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  // ── Kapatma (animasyonlu) ──
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        fontFamily: fontBody,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(6px)",
        transition: "opacity 0.25s",
        opacity: visible ? 1 : 0,
        overflowY: "auto",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          maxHeight: "90vh",
          borderRadius: 32,
          background: "white",
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.3)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          position: "relative",
        }}
      >
        {/* ════════════════════════════
           HERO ALANI — gradient arka plan
        ════════════════════════════ */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #0B1220 0%, #16233B 50%, #1D4ED8 100%)",
            padding: "32px 24px 28px",
            color: "white",
            textAlign: "center",
          }}
        >
          {/* Dekoratif pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.06,
              backgroundImage: "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* Kapatma butonu */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: 10,
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={14} color="white" />
          </button>

          {/* İkon */}
          <div
            style={{
              position: "relative",
              width: 64,
              height: 64,
              borderRadius: 22,
              background: "rgba(197, 157, 95, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Crown size={32} color={colors.gold} strokeWidth={1.5} />
          </div>

          {/* Başlık */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              fontFamily: fontDisplay,
              letterSpacing: "-0.03em",
            }}
          >
            IstanbulGo Premium
          </div>
          <div
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            {t("premium.subtitle")}
          </div>

          {/* Fiyat */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 800, fontFamily: fontDisplay }}>€4.99</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", marginTop: 4 }}>
              {t("premium.priceNote")}
            </div>
          </div>
        </div>

        {/* ════════════════════════════
           PREMIUM ÖZELLİKLER
        ════════════════════════════ */}
        <div style={{ padding: "20px 20px 0" }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: colors.inkMute,
              marginBottom: 12,
            }}
          >
            {t("onboard.what")}
          </div>

          {PREMIUM_FEATURES.map((feature) => (
            <div
              key={feature.title}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1px solid ${colors.line}`,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: feature.highlight ? colors.goldSoft : "#F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <feature.icon
                  size={18}
                  color={feature.highlight ? colors.gold : colors.ink}
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.ink }}>
                  {feature.title}
                  {feature.highlight && (
                    <span
                      style={{
                        marginLeft: 6,
                        fontSize: 9,
                        fontWeight: 700,
                        background: colors.goldSoft,
                        color: colors.gold,
                        padding: "2px 6px",
                        borderRadius: 4,
                        verticalAlign: "middle",
                      }}
                    >
                      MOST LOVED
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: colors.inkSoft,
                    marginTop: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ════════════════════════════
           FREE ÖZELLİKLER
        ════════════════════════════ */}
        <div style={{ padding: "16px 20px 0" }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: colors.inkMute,
              marginBottom: 10,
            }}
          >
            {t("premium.alwaysFree")}
          </div>
          <div
            style={{
              borderRadius: 16,
              background: "#F8FAFC",
              padding: 14,
            }}
          >
            {FREE_FEATURES.map((feature) => (
              <div
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 0",
                  fontSize: 12,
                  color: colors.inkSoft,
                }}
              >
                <Check size={13} color={colors.ok} />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════
           CTA ALANI
        ════════════════════════════ */}
        <div style={{ padding: "20px 20px 24px" }}>
          {/* Zaten premium ise */}
          {isPremium ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 0",
                borderRadius: 16,
                background: colors.okSoft,
                color: colors.ok,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <Check size={16} />
              {t("premium.alreadyPremium")}
            </div>
          ) : (
            <>
              {/* Satın al butonu */}
              <div
                onClick={() => {
                  onPurchase();
                  // Demo: hemen premium yap
                  // Gerçekte: Stripe checkout açılır
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "16px 0",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #C59D5F, #D4AF37)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(197, 157, 95, 0.35)",
                }}
              >
                <Crown size={16} />
                {t("premium.unlock")} · €4.99
              </div>

              {/* Güvence mesajı */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 14,
                  fontSize: 11,
                  color: colors.inkMute,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Shield size={11} /> {t("premium.securePayment")}
                </span>
                <span>·</span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Clock size={11} /> {t("premium.instantAccess")}
                </span>
              </div>
            </>
          )}

          {/* Kapat */}
          <div
            onClick={handleClose}
            style={{
              textAlign: "center",
              marginTop: 12,
              fontSize: 12,
              color: colors.inkMute,
              cursor: "pointer",
            }}
          >
            {t("premium.maybeLater")}
          </div>
        </div>
      </div>
    </div>
  );
}
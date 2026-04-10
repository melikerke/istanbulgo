// ══════════════════════════════════════════════
// MiniPreview.jsx — Ortada açılan mini önizleme
// ══════════════════════════════════════════════
// Kart görsellerine tıklayınca açılır.
// Amacı: hızlı karar verdirmek — "alayım mı?"
// 3 katmanlı sistemde Katman B.
// Katman A = kart, Katman C = full detail (AttractionSheet)

import { useState, useEffect } from "react";
import {
  Heart, Ticket, Star, Info, Clock, MapPin, Zap, X, ChevronRight, ExternalLink
} from "lucide-react";

// ── Renkler ──
const colors = {
  ink: "#0F172A",
  inkSoft: "#475569",
  inkMute: "#94A3B8",
  line: "#E2E8F0",
  primary: "#1D4ED8",
  primarySoft: "#DBEAFE",
  ok: "#059669",
  okSoft: "#D1FAE5",
  gold: "#C59D5F",
  dark: "#0B1220",
  danger: "#E11D48",
};

// ── Fontlar ──
const fontDisplay = "'Plus Jakarta Sans', system-ui, sans-serif";
const fontBody = "'Inter', system-ui, sans-serif";

export default function MiniPreview({
  attraction,    // tıklanan attraction objesi
  onClose,       // kapatma fonksiyonu
  onFullDetail,  // "See details" tıklanınca → AttractionSheet açar
  onFav,         // favori toggle
  isFav,         // favori mi?
  isPremium,     // premium kullanıcı mı?
  onUpgrade,     // premium yükseltme fonksiyonu
  onBook,        // booking overlay fonksiyonu
}) {
  // ── Animasyon state'i ──
  const [visible, setVisible] = useState(false);

  // attraction değişince animasyonu tetikle
  useEffect(() => {
    if (attraction) {
      setTimeout(() => setVisible(true), 10);
    }
    return () => setVisible(false);
  }, [attraction?.id]);

  // Hiçbir şey seçili değilse gösterme
  if (!attraction) return null;

  // ── Kapatma (animasyonlu) ──
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  // ── Full detail'e geçiş ──
  const handleFullDetail = () => {
    setVisible(false);
    setTimeout(() => onFullDetail(attraction), 200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 250,
        fontFamily: fontBody,
        display: "flex",
        alignItems: "center",      // ← DİKEY ORTALA
        justifyContent: "center",  // ← YATAY ORTALA
        padding: 20,
      }}
    >
      {/* ── Arka plan overlay ── */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15, 23, 42, 0.5)",
          backdropFilter: "blur(4px)",
          transition: "opacity 0.2s ease",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* ── Modal kutusu ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 380,
          borderRadius: 28,
          background: "white",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(15, 23, 42, 0.25)",
          // Animasyon: aşağıdan kayarak gelir + fade
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease",
        }}
      >
        {/* ════════════════════════════
           GÖRSEL ALANI
        ════════════════════════════ */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <img
            src={attraction.img}
            alt={attraction.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(15,23,42,0.6), rgba(15,23,42,0.05))",
            }}
          />

          {/* Kapatma butonu — sağ üst */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: 10,
              border: "none",
              background: "rgba(0, 0, 0, 0.35)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={14} color="white" />
          </button>

          {/* Favori butonu — sağ üst, kapatmanın solunda */}
          <button
            onClick={() => onFav && onFav(attraction.id)}
            style={{
              position: "absolute",
              top: 12,
              right: 50,
              width: 32,
              height: 32,
              borderRadius: 10,
              border: "none",
              background: isFav ? "rgba(225, 29, 72, 0.85)" : "rgba(0, 0, 0, 0.35)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Heart size={14} color="white" fill={isFav ? "white" : "none"} />
          </button>

          {/* Hook cümlesi — görselin üstünde, sol üst */}
          {attraction.hook && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(197, 157, 95, 0.9)",
                color: "white",
                padding: "4px 10px",
                borderRadius: 8,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {attraction.hook}
            </div>
          )}

          {/* Başlık + rating — görselin altında */}
          <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "white",
                fontFamily: fontDisplay,
                letterSpacing: "-0.03em",
              }}
            >
              {attraction.title}
            </div>
            <div
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                <Star size={11} fill="currentColor" />
                {attraction.rating}
              </span>
              <span>·</span>
              <span>{attraction.area || "Istanbul"}</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════
           İÇERİK ALANI
        ════════════════════════════ */}
        <div style={{ padding: "14px 16px 0" }}>

          {/* ── Chip'ler: duration, skip line ── */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            {/* Süre chip'i */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 99,
                background: "#F1F5F9",
                fontSize: 11,
                fontWeight: 600,
                color: colors.inkSoft,
              }}
            >
              <Clock size={11} />
              {attraction.dur}
            </span>

            {/* Skip line chip'i (varsa) */}
            {attraction.skip && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  borderRadius: 99,
                  background: colors.okSoft,
                  fontSize: 11,
                  fontWeight: 600,
                  color: colors.ok,
                }}
              >
                <Zap size={11} />
                Skip line
              </span>
            )}

            {/* Badge chip'i */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 99,
                background: colors.primarySoft,
                fontSize: 11,
                fontWeight: 600,
                color: colors.primary,
              }}
            >
              {attraction.badge}
            </span>
          </div>

          {/* ── Teaser / açıklama ── */}
          <div
            style={{
              fontSize: 13,
              color: colors.inkSoft,
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            {attraction.teaser}
          </div>
        </div>

        {/* ════════════════════════════
           CTA ALANI — shadow ile ayrılmış
        ════════════════════════════ */}
        <div
          style={{
            padding: "12px 16px 18px",
            borderTop: `1px solid ${colors.line}`,
            background: "white",
            boxShadow: "0 -4px 16px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            {/* Secondary: See details */}
            <div
              onClick={handleFullDetail}
              style={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "12px 16px",
                borderRadius: 14,
                border: `1.5px solid ${colors.line}`,
                background: "white",
                fontSize: 13,
                fontWeight: 600,
                color: colors.ink,
                cursor: "pointer",
              }}
            >
              Details
            </div>

            {/* Primary: Book now + fiyat */}
            <div
              onClick={() => {
                handleClose();
                setTimeout(() => onBook && onBook(attraction), 250);
              }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "12px 16px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #1D4ED8, #1E40AF)",
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.3)",
                cursor: "pointer",
              }}
            >
              <Ticket size={14} />
              {attraction.skip ? "Skip the Line →" : "Book · €" + attraction.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
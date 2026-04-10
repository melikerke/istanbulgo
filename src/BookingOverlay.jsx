// ══════════════════════════════════════════════
// BookingOverlay.jsx — Booking geçiş ekranı
// ══════════════════════════════════════════════
// "Book" tıklanınca gösterilir.
// 1.5 saniye sonra yeni sekmede GYG açılır.
// Kullanıcı "Back to IstanbulGo" ile geri döner.
//
// Props:
//   booking   → { title, price, link } objesi (null = kapalı)
//   onClose   → kapatma fonksiyonu

import { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, Shield, Check } from "lucide-react";

const fontDisplay = "'Plus Jakarta Sans', system-ui, sans-serif";
const fontBody = "'Inter', system-ui, sans-serif";

export default function BookingOverlay({ booking, onClose }) {
  const [phase, setPhase] = useState("loading"); // "loading" | "redirected"
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!booking) {
      setPhase("loading");
      setVisible(false);
      return;
    }

    // Overlay'i göster
    setTimeout(() => setVisible(true), 10);

    // 1.5 saniye sonra yeni sekmede aç
    const timer = setTimeout(() => {
      window.open(booking.link, "_blank", "noopener,noreferrer");
      setPhase("redirected");
    }, 1500);

    return () => clearTimeout(timer);
  }, [booking?.link]);

  if (!booking) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        fontFamily: fontBody,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Arka plan */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(11, 18, 32, 0.85)",
          backdropFilter: "blur(8px)",
          transition: "opacity 0.3s",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* İçerik */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 340,
          textAlign: "center",
          color: "white",
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease",
        }}
      >
        {/* ── Loading fazı ── */}
        {phase === "loading" && (
          <>
            {/* Spinner */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "rgba(29, 78, 216, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                animation: "pulse 1.2s ease-in-out infinite",
              }}
            >
              <ExternalLink size={24} color="#93C5FD" />
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                fontFamily: fontDisplay,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Taking you to our partner...
            </div>

            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
              {booking.title} · €{booking.price}
            </div>

            {/* Trust signals */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 16,
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Shield size={11} /> Secure booking
              </span>
              <span>·</span>
              <span>Free cancellation</span>
            </div>

            {/* Pulse animation */}
            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.08); opacity: 0.7; }
              }
            `}</style>
          </>
        )}

        {/* ── Redirected fazı ── */}
        {phase === "redirected" && (
          <>
            {/* Başarı ikonu */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "rgba(5, 150, 105, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Check size={24} color="#6EE7B7" />
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                fontFamily: fontDisplay,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Booking page is open
            </div>

            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              Complete your booking in the new tab.
              <br />
              Come back here when you're done!
            </div>

            {/* Geri dön butonu */}
            <div
              onClick={handleClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 24,
                padding: "12px 24px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={14} />
              Back to IstanbulGo
            </div>

            {/* Tekrar açma linki */}
            <div
              onClick={() => window.open(booking.link, "_blank", "noopener,noreferrer")}
              style={{
                marginTop: 12,
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                cursor: "pointer",
              }}
            >
              Didn't open? Tap to try again
            </div>
          </>
        )}
      </div>
    </div>
  );
}

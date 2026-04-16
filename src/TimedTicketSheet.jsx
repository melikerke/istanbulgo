// ══════════════════════════════════════════════
// TimedTicketSheet.jsx — Tarih + saat seçimi sheet
// ══════════════════════════════════════════════
// Premium kullanıcılar biletlerine tarih/saat atayabilir
// Plan engine bu bilgileri kullanarak rotayı optimize eder

import { useState, useEffect } from "react";
import { X, Calendar, Clock, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", dark: "#0B1220", gold: "#C59D5F",
  primary: "#1D4ED8", primarySoft: "#DBEAFE",
  ok: "#059669", okSoft: "#D1FAE5",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

const TIME_SLOTS = [
  { label: "09:00", value: "09:00", period: "Morning" },
  { label: "10:00", value: "10:00", period: "Morning" },
  { label: "11:00", value: "11:00", period: "Morning" },
  { label: "12:00", value: "12:00", period: "Midday" },
  { label: "13:00", value: "13:00", period: "Midday" },
  { label: "14:00", value: "14:00", period: "Afternoon" },
  { label: "15:00", value: "15:00", period: "Afternoon" },
  { label: "16:00", value: "16:00", period: "Afternoon" },
  { label: "17:00", value: "17:00", period: "Afternoon" },
  { label: "18:00", value: "18:00", period: "Evening" },
  { label: "19:00", value: "19:00", period: "Evening" },
  { label: "20:00", value: "20:00", period: "Evening" },
];

export default function TimedTicketSheet({ attraction, existing, onClose, onSave }) {
  const { t, lang } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(existing?.date || "");
  const [selectedTime, setSelectedTime] = useState(existing?.time || "");

  useEffect(() => {
    if (existing) {
      setSelectedDate(existing.date);
      setSelectedTime(existing.time);
    }
  }, [existing]);

  const todayStr = new Date().toISOString().split("T")[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 60);
  const maxStr = maxDateObj.toISOString().split("T")[0];

  const canSave = selectedDate && selectedTime;

  const handleSave = () => {
    if (!canSave) return;
    onSave(attraction.id, selectedDate, selectedTime);
    onClose();
  };

  if (!attraction) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 250, display: "flex", alignItems: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }} />

      <div style={{ position: "relative", width: "100%", background: "white", borderRadius: "28px 28px 0 0", padding: "14px 20px 28px", maxHeight: "88%", overflowY: "auto" }}>

        <div style={{ width: 48, height: 5, borderRadius: 3, background: C.line, margin: "0 auto 16px" }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
          <img src={attraction.img} alt={attraction.title} style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t("timed.yourTicket")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, fontFamily: fd, marginTop: 2 }}>{attraction.title}</div>
            <div style={{ fontSize: 11, color: C.inkMute, marginTop: 2 }}>{attraction.cat} · €{attraction.price}</div>
          </div>
          <div onClick={onClose} style={{ width: 30, height: 30, borderRadius: 15, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <X size={14} color={C.inkSoft} />
          </div>
        </div>

        {/* Date section */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Calendar size={14} color={C.inkSoft} />
            <div style={{ fontSize: 12, fontWeight: 800, color: C.ink }}>{t("timed.visitDate")}</div>
          </div>
          <input
            type="date"
            value={selectedDate}
            min={todayStr}
            max={maxStr}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 14,
              border: `1px solid ${selectedDate ? C.primary : C.line}`,
              background: selectedDate ? C.primarySoft : "white",
              fontSize: 15, fontWeight: 700, color: C.ink, outline: "none",
              fontFamily: "inherit", boxSizing: "border-box",
            }}
          />
          {selectedDate && (
            <div style={{ marginTop: 6, fontSize: 11, color: C.primary, fontWeight: 600 }}>
              {new Date(selectedDate).toLocaleDateString(lang === "ar" ? "ar-SA" : lang, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          )}
        </div>

        {/* Time slots */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <Clock size={14} color={C.inkSoft} />
            <div style={{ fontSize: 12, fontWeight: 800, color: C.ink }}>{t("timed.timeSlot")}</div>
          </div>

          {[{key:"Morning",tk:"timed.morning"},{key:"Midday",tk:"timed.midday"},{key:"Afternoon",tk:"timed.afternoon"},{key:"Evening",tk:"timed.evening"}].map((p) => (
            <div key={p.key} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{t(p.tk)}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {TIME_SLOTS.filter((s) => s.period === p.key).map((slot) => (
                  <div
                    key={slot.value}
                    onClick={() => setSelectedTime(slot.value)}
                    style={{
                      padding: "10px 0", borderRadius: 10, textAlign: "center",
                      background: selectedTime === slot.value ? C.primary : "white",
                      color: selectedTime === slot.value ? "white" : C.ink,
                      border: `1px solid ${selectedTime === slot.value ? C.primary : C.line}`,
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    {slot.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div style={{ padding: "12px 14px", borderRadius: 14, background: "#EEF2FF", marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Check size={12} color="white" />
          </div>
          <div style={{ flex: 1, fontSize: 11, color: C.ink, lineHeight: 1.5 }}>
            {t("timed.willRebuild")}
          </div>
        </div>

        {/* Save button */}
        <div
          onClick={handleSave}
          style={{
            padding: "14px", borderRadius: 14,
            background: canSave ? C.dark : "#E2E8F0",
            color: canSave ? "white" : C.inkMute,
            fontSize: 14, fontWeight: 800, textAlign: "center", cursor: canSave ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          {canSave ? <><Check size={16} />{t("timed.saveRebuild")}</> : t("timed.selectBoth")}
        </div>

      </div>
    </div>
  );
}
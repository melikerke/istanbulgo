// ══════════════════════════════════════════════
// WeatherWidget.jsx — Canlı hava durumu (Open-Meteo)
// ══════════════════════════════════════════════
// Ücretsiz, API key gerekmiyor
// Şu anki sıcaklık + 5 günlük tahmin

import { useState, useEffect } from "react";
import { MapPin, Droplets, Wind, Thermometer } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", soft: "#F8FAFC",
  blue: "#1D4ED8", blueSoft: "#DBEAFE",
  gold: "#C59D5F",
  dark: "#0B1220",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

// WMO weather codes → emoji + description
const WMO = {
  0:  ["☀️", "Clear sky"],
  1:  ["🌤️", "Mostly clear"],
  2:  ["⛅", "Partly cloudy"],
  3:  ["☁️", "Overcast"],
  45: ["🌫️", "Foggy"],
  48: ["🌫️", "Icy fog"],
  51: ["🌦️", "Light drizzle"],
  53: ["🌦️", "Drizzle"],
  55: ["🌧️", "Heavy drizzle"],
  61: ["🌧️", "Light rain"],
  63: ["🌧️", "Rain"],
  65: ["🌧️", "Heavy rain"],
  71: ["🌨️", "Light snow"],
  73: ["🌨️", "Snow"],
  75: ["❄️", "Heavy snow"],
  80: ["🌦️", "Light showers"],
  81: ["🌧️", "Showers"],
  82: ["⛈️", "Heavy showers"],
  95: ["⛈️", "Thunderstorm"],
  96: ["⛈️", "Thunderstorm with hail"],
  99: ["⛈️", "Severe thunderstorm"],
};

const getWMO = (code) => WMO[code] || ["🌡️", "Unknown"];

const getWindDir = (deg) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

const getDayName = (dateStr, idx, t, lang) => {
  if (idx === 0) return t("weather.today");
  if (idx === 1) return t("weather.tomorrow");
  return new Date(dateStr).toLocaleDateString(lang === "ar" ? "ar-SA" : lang, { weekday: "short" });
};

export default function WeatherWidget() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FIstanbul&forecast_days=5";

    fetch(url)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div style={{
        borderRadius: 22, background: C.soft, border: `1px solid ${C.line}`,
        padding: 24, textAlign: "center", color: C.inkMute, fontSize: 13,
      }}>
        {t("weather.unavailable")}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        borderRadius: 22, background: C.soft, border: `1px solid ${C.line}`,
        padding: 40, textAlign: "center", color: C.inkMute, fontSize: 13,
      }}>
        {t("weather.loading")}
      </div>
    );
  }

  const cur = data.current;
  const daily = data.daily;
  const wmo = getWMO(cur.weather_code);

  return (
    <div style={{ fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* HERO CURRENT WEATHER */}
      <div style={{
        borderRadius: 24, overflow: "hidden",
        background: `linear-gradient(135deg, ${C.dark} 0%, #1E40AF 100%)`,
        padding: "20px 22px",
        color: "white", marginBottom: 14, position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle at 1px 1px,white 0.5px,transparent 0)",
          backgroundSize: "20px 20px", pointerEvents: "none",
        }} />

        {/* Header */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
            <MapPin size={12} />Istanbul
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: "#FCA5A5" }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#EF4444",
              animation: "wxPulse 2s ease-in-out infinite",
            }} />
            LIVE
          </div>
        </div>

        {/* Current temp */}
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 14 }}>
          <span style={{ fontSize: 56, lineHeight: 1 }}>{wmo[0]}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
              <span style={{ fontSize: 56, fontWeight: 300, lineHeight: 1, fontFamily: fd, letterSpacing: "-0.04em" }}>
                {Math.round(cur.temperature_2m)}
              </span>
              <span style={{ fontSize: 22, fontWeight: 400, marginTop: 6 }}>°C</span>
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{wmo[1]}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
              {t("weather.feelsLike")} {Math.round(cur.apparent_temperature)}°C
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
        marginBottom: 14,
      }}>
        <div style={{
          background: "white", border: `1px solid ${C.line}`,
          borderRadius: 16, padding: "12px 10px", textAlign: "center",
        }}>
          <Droplets size={16} color={C.blue} style={{ margin: "0 auto 4px" }} />
          <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>{cur.relative_humidity_2m}%</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{t("weather.humidity")}</div>
        </div>

        <div style={{
          background: "white", border: `1px solid ${C.line}`,
          borderRadius: 16, padding: "12px 10px", textAlign: "center",
        }}>
          <Wind size={16} color={C.inkSoft} style={{ margin: "0 auto 4px" }} />
          <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>{Math.round(cur.wind_speed_10m)}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>
            km/h {getWindDir(cur.wind_direction_10m)}
          </div>
        </div>

        <div style={{
          background: "white", border: `1px solid ${C.line}`,
          borderRadius: 16, padding: "12px 10px", textAlign: "center",
        }}>
          <Thermometer size={16} color="#D97706" style={{ margin: "0 auto 4px" }} />
          <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>
            {Math.round(daily.temperature_2m_max[0])}° / {Math.round(daily.temperature_2m_min[0])}°
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{t("weather.highLow")}</div>
        </div>
      </div>

      {/* 5-DAY FORECAST */}
      <div style={{
        background: "white", border: `1px solid ${C.line}`,
        borderRadius: 20, padding: "14px 8px",
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: C.inkMute,
          textTransform: "uppercase", letterSpacing: "0.08em",
          marginBottom: 12, paddingLeft: 12,
        }}>
          {t("weather.forecast")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
          {daily.time.slice(0, 5).map((dateStr, i) => {
            const dayWmo = getWMO(daily.weather_code[i]);
            return (
              <div key={dateStr} style={{ textAlign: "center", padding: "4px 0" }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: i === 0 ? C.blue : C.inkMute,
                  textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6,
                }}>
                  {getDayName(dateStr, i, t, lang)}
                </div>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{dayWmo[0]}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>
                  {Math.round(daily.temperature_2m_max[i])}°
                </div>
                <div style={{ fontSize: 11, color: C.inkMute, marginTop: 1 }}>
                  {Math.round(daily.temperature_2m_min[i])}°
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes wxPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
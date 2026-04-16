// ══════════════════════════════════════════════
// ItineraryMap.jsx — Interactive Mapbox GL map
// ══════════════════════════════════════════════
// Mapbox GL JS yalnızca "Show map" butonuna basılınca yüklenir
// Eski telefonlarda performans sorunu yaşanmasın diye

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft, Ticket, Navigation, ChevronRight, MapPin,
  RotateCcw, ExternalLink
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", soft: "#F8FAFC",
  blue: "#1D4ED8", blueSoft: "#DBEAFE",
  ok: "#059669",
  gold: "#C59D5F",
  dark: "#0B1220",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function walkingTime(km) {
  const mins = Math.round((km / 4) * 60);
  if (mins < 1) return "< 1 min";
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function ItineraryMap({
  planResult, allAttractions, activeDay, setActiveDay,
  onOpenAttraction, onPreview, onBook, onRebuild, onBack,
  myTickets = [], onToggleTicket, onShare,
}) {
  const { t } = useLanguage();
  const [navOpen, setNavOpen] = useState(null);
  const [mapEnabled, setMapEnabled] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const activePlan = planResult?.days.find(d => d.day === activeDay);
  const daySpots = activePlan ? activePlan.items
    .filter(item => item.id)
    .map(item => {
      const att = allAttractions.find(a => a.id === item.id);
      return att ? { ...att, time: item.t, duration: item.m, fixed: item.fixed } : null;
    })
    .filter(Boolean) : [];

  useEffect(() => {
    if (!mapEnabled || !mapContainerRef.current || daySpots.length === 0) return;

    let cancelled = false;

    // Mapbox GL'yi dinamik olarak yükle — kullanıcı "Show map"e basana kadar hiç yüklenmez
    Promise.all([
      import("mapbox-gl"),
      import("mapbox-gl/dist/mapbox-gl.css"),
    ]).then(([mapboxModule]) => {
      if (cancelled) return;
      const mapboxgl = mapboxModule.default;
      mapboxgl.accessToken = MAPBOX_TOKEN;

      // Eski haritayı temizle
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const lngs = daySpots.map(s => s.lng);
      const lats = daySpots.map(s => s.lat);
      const bounds = new mapboxgl.LngLatBounds(
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)]
      );

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        bounds,
        fitBoundsOptions: { padding: 50, maxZoom: 15 },
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        // Rota çizgisi
        if (daySpots.length > 1) {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: daySpots.map(s => [s.lng, s.lat]),
              },
            },
          });
          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#0B1220",
              "line-width": 3,
              "line-opacity": 0.75,
              "line-dasharray": [2, 1.5],
            },
          });
        }

        // Numaralı pinler
        daySpots.forEach((spot, i) => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 34px; height: 34px; border-radius: 17px;
            background: #0B1220; color: #C59D5F;
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; font-weight: 800;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          `;
          el.innerText = i + 1;
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            if (onPreview) onPreview(spot);
          });

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([spot.lng, spot.lat])
            .addTo(map);

          markersRef.current.push(marker);
        });
      });

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeDay, planResult, mapEnabled]);

  if (!activePlan) return null;

  return (
    <div style={{ fontFamily: "'Inter',system-ui,sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.inkMute, cursor: "pointer" }}>
          <ArrowLeft size={14} />Back
        </div>
        <div style={{ marginLeft: "auto", fontSize: 11, color: C.inkMute }}>
          {planResult.days.length} day{planResult.days.length > 1 ? "s" : ""} · {daySpots.length} spots
        </div>
      </div>

      <div style={{ fontFamily: fd, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Your Istanbul plan</div>
      <div style={{ fontSize: 13, color: C.inkMute, marginBottom: 14 }}>
        Tap any pin to see details · pinch to zoom
      </div>

      {/* INTERAKTİF MAP */}
      {mapEnabled ? (
        <div
          ref={mapContainerRef}
          style={{
            position: "relative",
            borderRadius: 20, overflow: "hidden",
            border: `1px solid ${C.line}`,
            marginBottom: 14, height: 260,
            background: "#EAF0F5",
          }}
        />
      ) : (
        <div
          onClick={() => setMapEnabled(true)}
          style={{
            position: "relative",
            borderRadius: 20, overflow: "hidden",
            border: `1px solid ${C.line}`,
            marginBottom: 14, height: 180,
            background: "linear-gradient(135deg, #EAF0F5, #DBEAFE)",
            cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 10,
          }}
        >
          {/* Decorative pin cluster preview */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            {daySpots.slice(0, Math.min(5, daySpots.length)).map((_, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: 14,
                background: C.dark, color: C.gold,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800,
                border: "2px solid white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                marginLeft: i > 0 ? -8 : 0,
              }}>
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: fd }}>
            {daySpots.length} {t("plan.stopsOnMap")}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "10px 18px", borderRadius: 99,
            background: C.dark, color: "white",
            fontSize: 12, fontWeight: 700,
          }}>
            <MapPin size={13} color={C.gold} />
            {t("plan.showMap")}
          </div>
          <div style={{ fontSize: 10, color: C.inkMute, marginTop: 2 }}>
            {t("plan.tapToLoad")}
          </div>
        </div>
      )}

      {/* Day tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
        {planResult.days.map(d => (
          <div key={d.day} onClick={() => setActiveDay(d.day)} style={{
            minWidth: 110, flexShrink: 0, borderRadius: 14, padding: "9px 14px", cursor: "pointer",
            background: activeDay === d.day ? C.dark : "white",
            color: activeDay === d.day ? "white" : C.ink,
            border: activeDay === d.day ? "none" : `1px solid ${C.line}`,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>
              {d.dateLabel ? d.dateLabel : `Day ${d.day}`}
            </div>
            <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
              {d.dateLabel ? `Day ${d.day} · ${d.title}` : d.title}
            </div>
          </div>
        ))}
      </div>

      {/* Kartlar */}
      <div style={{ marginBottom: 16 }}>
        {daySpots.map((spot, i) => {
          const next = daySpots[i + 1];
          const dist = next ? haversine(spot.lat, spot.lng, next.lat, next.lng) : 0;
          return (
            <div key={spot.id}>
              <div style={{
                display: "flex", alignItems: "stretch", gap: 10,
                borderRadius: 20, border: `1px solid ${C.line}`, background: "white",
                padding: 10, marginBottom: 6, position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -8, left: -8,
                  width: 26, height: 26, borderRadius: 13,
                  background: C.dark, color: C.gold,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  zIndex: 2,
                }}>{i + 1}</div>

                <div
                  onClick={() => onOpenAttraction && onOpenAttraction(spot)}
                  style={{
                    width: 80, height: 80, borderRadius: 14, overflow: "hidden",
                    flexShrink: 0, cursor: "pointer",
                  }}
                >
                  <img src={spot.img} alt={spot.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: spot.fixed ? C.blue : C.inkMute }}>{spot.time}</span>
                      {spot.fixed && <span style={{ fontSize: 9, fontWeight: 700, color: C.blue, background: "#DBEAFE", padding: "1px 6px", borderRadius: 5 }}>{t("plan.fixed")}</span>}
                      <span style={{ fontSize: 11, color: C.inkMute }}>·</span>
                      <span style={{ fontSize: 11, color: C.inkMute }}>{spot.duration}</span>
                    </div>
                    <div
                      onClick={() => onOpenAttraction && onOpenAttraction(spot)}
                      style={{ fontSize: 14, fontWeight: 700, marginTop: 2, cursor: "pointer" }}
                    >
                      {spot.title}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {spot.price > 0 && spot.link ? (
                      myTickets.includes(spot.id) ? (
                        <div
                          onClick={() => onToggleTicket && onToggleTicket(spot.id)}
                          style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                            gap: 4, padding: "7px 0", borderRadius: 10,
                            background: "#D1FAE5", color: C.ok,
                            fontSize: 11, fontWeight: 700, cursor: "pointer",
                            border: `1px solid ${C.ok}`,
                          }}
                        >
                          ✓ {t("card.gotTicket")}
                        </div>
                      ) : (
                        <>
                          <div
                            onClick={() => onBook && onBook(spot)}
                            style={{
                              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                              gap: 4, padding: "7px 0", borderRadius: 10,
                              background: `linear-gradient(135deg, ${C.blue}, #1E40AF)`,
                              color: "white", fontSize: 11, fontWeight: 700, cursor: "pointer",
                            }}
                          >
                            <Ticket size={11} />Book · €{spot.price}
                          </div>
                          <div
                            onClick={() => onToggleTicket && onToggleTicket(spot.id)}
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "center",
                              padding: "7px 10px", borderRadius: 10,
                              background: "white", color: C.inkSoft,
                              fontSize: 10, fontWeight: 700, cursor: "pointer",
                              border: `1px dashed ${C.line}`,
                            }}
                            title="I already have this ticket"
                          >
                            Got it
                          </div>
                        </>
                      )
                    ) : (
                      <div style={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "7px 0", borderRadius: 10,
                        background: "#D1FAE5", color: C.ok,
                        fontSize: 11, fontWeight: 700,
                      }}>
                        Free entry
                      </div>
                    )}
                    <div
                      onClick={() => setNavOpen(spot)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 4, padding: "7px 12px", borderRadius: 10,
                        background: "#F1F5F9", color: C.ink,
                        fontSize: 11, fontWeight: 700, cursor: "pointer",
                      }}
                    >
                      <Navigation size={11} />Nav
                    </div>
                  </div>
                </div>
              </div>

              {next && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "4px 0 4px 38px", fontSize: 10, color: C.inkMute,
                }}>
                  <div style={{ width: 1, height: 10, background: C.line, marginRight: 6 }} />
                  🚶 {walkingTime(dist)} · {dist.toFixed(1)} km
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTTOM ACTIONS */}
      {(() => {
        const ticketCount = daySpots.filter(s => s.price > 0 && s.link && myTickets.includes(s.id)).length;
        const totalTickets = daySpots.filter(s => s.price > 0 && s.link).length;
        return (
          <>
            {/* Ticket progress summary */}
            {totalTickets > 0 && (
              <div style={{
                background: "#F8FAFC", border: `1px solid ${C.line}`,
                borderRadius: 14, padding: "10px 14px", marginBottom: 10,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14,
                  background: ticketCount === totalTickets ? "#D1FAE5" : "#F1F5F9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Ticket size={14} color={ticketCount === totalTickets ? C.ok : C.inkMute} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>
                    {ticketCount} / {totalTickets} {t("plan.ticketsMarked")}
                  </div>
                  <div style={{ fontSize: 10, color: C.inkMute, marginTop: 1 }}>
                    Tap "Got it" on cards you already have
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div onClick={onRebuild} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                borderRadius: 14, border: `1px solid ${C.line}`, background: "white",
                padding: "12px", fontSize: 12, fontWeight: 700, color: C.inkSoft, cursor: "pointer",
              }}>
                <RotateCcw size={13} />{t("plan.rebuild")}
              </div>
              <div onClick={() => onShare && onShare()} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                borderRadius: 14, background: C.dark,
                padding: "12px", fontSize: 12, fontWeight: 700, color: "white", cursor: "pointer",
              }}>
                <ExternalLink size={13} />{t("plan.sharePlan")}
              </div>
            </div>
          </>
        );
      })()}

      {navOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 400,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: 16,
        }}>
          <div onClick={() => setNavOpen(null)} style={{
            position: "absolute", inset: 0, background: "rgba(15,23,42,0.5)",
            backdropFilter: "blur(6px)",
          }} />
          <div style={{
            position: "relative", width: "100%", maxWidth: 400,
            borderRadius: 24, background: "white", padding: "20px 20px 28px",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.2)",
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: C.line, margin: "0 auto 16px" }} />
            <div style={{ fontSize: 16, fontWeight: 800, fontFamily: fd, marginBottom: 4 }}>Open in Maps</div>
            <div style={{ fontSize: 12, color: C.inkMute, marginBottom: 16 }}>Navigate to {navOpen.title}</div>

            {[
              { label: "Google Maps", icon: "🗺️", url: `https://www.google.com/maps/dir/?api=1&destination=${navOpen.lat},${navOpen.lng}&destination_place_id=${encodeURIComponent(navOpen.title)}` },
              { label: "Apple Maps", icon: "🍎", url: `https://maps.apple.com/?daddr=${navOpen.lat},${navOpen.lng}&q=${encodeURIComponent(navOpen.title)}` },
              { label: "Waze", icon: "🚗", url: `https://www.waze.com/ul?ll=${navOpen.lat},${navOpen.lng}&navigate=yes` },
            ].map(opt => (
              <a
                key={opt.label}
                href={opt.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setNavOpen(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px", borderRadius: 14,
                  border: `1px solid ${C.line}`, background: "white",
                  marginBottom: 8, textDecoration: "none", color: C.ink,
                }}
              >
                <span style={{ fontSize: 20 }}>{opt.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>{opt.label}</span>
                <ExternalLink size={14} color={C.inkMute} />
              </a>
            ))}

            <div onClick={() => setNavOpen(null)} style={{
              textAlign: "center", padding: "12px 0", marginTop: 8,
              fontSize: 13, color: C.inkMute, cursor: "pointer",
            }}>
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
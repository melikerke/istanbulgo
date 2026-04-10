// ══════════════════════════════════════════════
// LanguageContext.jsx — Dil yönetimi
// ══════════════════════════════════════════════
// Tüm uygulamayı <LanguageProvider> ile sar.
// Componentlerde useLanguage() hook'u kullan.
//
// Kullanım:
//   const { t, lang, setLang, LANGUAGES } = useLanguage();
//   <div>{t("nav.home")}</div>
//   <select onChange={e => setLang(e.target.value)}>

import { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations";

// ── Desteklenen diller ──
export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

// ── Context ──
const LanguageContext = createContext();

// ── Provider ──
export function LanguageProvider({ children }) {
  // Dili localStorage'dan al, yoksa "en" kullan
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  // Dil değiştiğinde localStorage'a kaydet
  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  // ── Çeviri fonksiyonu ──
  // Eğer seçili dilde çeviri yoksa İngilizce'ye düşer
  const t = (key) => {
    // Önce seçili dilde ara
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Yoksa İngilizce'ye düş
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    // Hiçbir yerde yoksa key'i döndür (debug için)
    return key;
  };

  return (
    <LanguageContext.Provider value={{ t, lang, setLang, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hook ──
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

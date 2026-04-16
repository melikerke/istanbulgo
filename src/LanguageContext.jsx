// ══════════════════════════════════════════════
// LanguageContext.jsx — Dil yönetimi + RTL desteği
// ══════════════════════════════════════════════
// Tüm uygulamayı <LanguageProvider> ile sar.
// Componentlerde useLanguage() hook'u kullan.
//
// Kullanım:
//   const { t, lang, setLang, isRTL, LANGUAGES } = useLanguage();
//   <div>{t("nav.home")}</div>

import { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations";

// ── Desteklenen diller ──
// isRTL: true = sağdan sola yazılır (Arapça)
export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", isRTL: false },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", isRTL: false },
  { code: "de", label: "Deutsch", flag: "🇩🇪", isRTL: false },
  { code: "ru", label: "Русский", flag: "🇷🇺", isRTL: false },
  { code: "fr", label: "Français", flag: "🇫🇷", isRTL: false },
  { code: "es", label: "Español", flag: "🇪🇸", isRTL: false },
  { code: "ar", label: "العربية", flag: "🇸🇦", isRTL: true },
  { code: "zh", label: "中文", flag: "🇨🇳", isRTL: false },
  { code: "ko", label: "한국어", flag: "🇰🇷", isRTL: false },
];

// RTL olan dillerin set'i — hızlı lookup için
const RTL_LANGUAGES = new Set(LANGUAGES.filter(l => l.isRTL).map(l => l.code));

// ── Context ──
const LanguageContext = createContext();

// ── Provider ──
export function LanguageProvider({ children }) {
  // Dili localStorage'dan al, yoksa "en" kullan
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  // isRTL hesapla
  const isRTL = RTL_LANGUAGES.has(lang);

  // Dil değiştiğinde localStorage'a kaydet
  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Dil değiştiğinde <html dir="rtl"/"ltr"> ve <html lang="..."> otomatik güncellensin
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  // ── Çeviri fonksiyonu ──
  // Eğer seçili dilde çeviri yoksa İngilizce'ye düşer
  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ t, lang, setLang, isRTL, LANGUAGES }}>
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
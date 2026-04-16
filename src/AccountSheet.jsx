// ══════════════════════════════════════════════
// AccountSheet.jsx — Hesap sistemi
// ══════════════════════════════════════════════
// Kullanıcı girişi, kayıt, profil sayfası.
// Şu an localStorage ile çalışır (demo/MVP).
// İleride Supabase Auth bağlanacak.
//
// Props:
//   onClose      → kapatma fonksiyonu
//   user         → mevcut kullanıcı objesi (null = giriş yapılmamış)
//   onLogin      → giriş yapılınca çağrılır
//   onLogout     → çıkış yapılınca çağrılır
//   onUpgrade    → "Upgrade to Premium" tıklanınca çağrılır
//   isPremium    → premium kullanıcı mı?

import { useState, useEffect } from "react";
import {
  X, Mail, Lock, User, Crown, ChevronRight, LogOut,
  Star, Sparkles, Eye, Globe, Zap, Camera, Gift, Shield
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
  danger: "#E11D48",
};

const fontDisplay = "'Plus Jakarta Sans', system-ui, sans-serif";
const fontBody = "'Inter', system-ui, sans-serif";

export default function AccountSheet({ onClose, user, onLogin, onLogout, onUpgrade, isPremium, onNavigate }) {
  const { t } = useLanguage();
  // ── Animasyon ──
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("login"); // "login" | "signup" | "profile"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    // Kullanıcı varsa profil sayfasını göster
    if (user) setMode("profile");
  }, [user]);

  // Hata mesajını mod değişince temizle
  useEffect(() => { setError(""); }, [mode]);

  // ── Kapatma (animasyonlu) ──
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  // ── Giriş / Kayıt ──
  const handleSubmit = () => {
    setError("");

    // Email kontrolü
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Şifre kontrolü
    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (mode === "signup") {
      // ── KAYIT: hesap var mı kontrol et ──
      const existingAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
      const alreadyExists = existingAccounts.find(a => a.email === email);

      if (alreadyExists) {
        setError("An account with this email already exists. Please sign in.");
        return;
      }

      // İsim kontrolü
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      // Yeni hesap oluştur
      const newAccount = {
        email: email,
        password: password,
        name: name.trim(),
        createdAt: new Date().toISOString(),
      };

      existingAccounts.push(newAccount);
      localStorage.setItem("accounts", JSON.stringify(existingAccounts));

      // Giriş yap
      const userData = { email: newAccount.email, name: newAccount.name, createdAt: newAccount.createdAt };
      onLogin(userData);
      setMode("profile");

    } else {
      // ── GİRİŞ: hesap var mı + şifre doğru mu kontrol et ──
      const existingAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
      const account = existingAccounts.find(a => a.email === email);

      if (!account) {
        setError("No account found with this email. Please sign up first.");
        return;
      }

      if (account.password !== password) {
        setError("Incorrect password. Please try again.");
        return;
      }

      // Giriş başarılı
      const userData = { email: account.email, name: account.name, createdAt: account.createdAt };
      onLogin(userData);
      setMode("profile");
    }
  };

  // ── Google ile giriş (placeholder) ──
  const handleGoogle = () => {
    const userData = {
      email: "user@gmail.com",
      name: "Traveler",
      createdAt: new Date().toISOString(),
    };

    onLogin(userData);
    setMode("profile");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 350,
        fontFamily: fontBody,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* ── Arka plan ── */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15, 23, 42, 0.5)",
          backdropFilter: "blur(4px)",
          transition: "opacity 0.2s",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* ── Modal ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 380,
          borderRadius: 28,
          background: "white",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(15, 23, 42, 0.25)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease",
        }}
      >
        {/* ── Kapatma butonu ── */}
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
            background: "#F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <X size={14} color={colors.inkSoft} />
        </button>

        {/* ════════════════════════════
           PROFİL SAYFASI (giriş yapılmış)
        ════════════════════════════ */}
        {mode === "profile" && user && (
          <div style={{ padding: "32px 24px 24px" }}>
            {/* Avatar + isim */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 22,
                  background: isPremium
                    ? "linear-gradient(135deg, #C59D5F, #D4AF37)"
                    : "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                {isPremium ? (
                  <Crown size={28} color="white" />
                ) : (
                  <User size={28} color="white" />
                )}
              </div>

              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: fontDisplay }}>
                {user.name}
              </div>
              <div style={{ fontSize: 13, color: colors.inkMute, marginTop: 4 }}>
                {user.email}
              </div>

              {/* Premium badge */}
              {isPremium ? (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 8,
                    padding: "4px 12px",
                    borderRadius: 99,
                    background: colors.goldSoft,
                    color: colors.gold,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  <Crown size={12} />
                  {t("account.premiumMember")}
                </div>
              ) : (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 8,
                    padding: "4px 12px",
                    borderRadius: 99,
                    background: "#F1F5F9",
                    color: colors.inkMute,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {t("account.freePlan")}
                </div>
              )}
            </div>

            {/* Upgrade banner (sadece free kullanıcılara) */}
            {!isPremium && (
              <div
                onClick={() => {
                  handleClose();
                  setTimeout(() => onUpgrade(), 250);
                }}
                style={{
                  borderRadius: 20,
                  background: "linear-gradient(135deg, #0B1220, #16233B)",
                  padding: 18,
                  marginBottom: 20,
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "rgba(197, 157, 95, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Crown size={20} color={colors.gold} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t("menu.upgradePremium")}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                      AI planner, offline mode & more · €4.99 one-time
                    </div>
                  </div>
                  <ChevronRight size={16} color="rgba(255,255,255,0.3)" />
                </div>
              </div>
            )}

            {/* Menü öğeleri */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { icon: Star, label: "Saved places", sub: "Your favorites", action: () => { handleClose(); setTimeout(() => onNavigate && onNavigate("trip"), 250); } },
                { icon: Globe, label: "Language", sub: "English", action: null },
                { icon: Shield, label: "Privacy", sub: "Manage data", action: null },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={item.action || undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 4px",
                    borderBottom: `1px solid ${colors.line}`,
                    cursor: "pointer",
                  }}
                >
                  <item.icon size={18} color={colors.inkSoft} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                  </div>
                  <div style={{ fontSize: 12, color: colors.inkMute }}>{item.sub}</div>
                  <ChevronRight size={14} color={colors.inkMute} />
                </div>
              ))}
            </div>

            {/* Çıkış butonu */}
            <div
              onClick={() => {
                onLogout();
                setMode("login");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 20,
                padding: "12px 0",
                borderRadius: 14,
                border: `1px solid ${colors.line}`,
                fontSize: 13,
                fontWeight: 600,
                color: colors.danger,
                cursor: "pointer",
              }}
            >
              <LogOut size={14} />
              {t("account.signOut")}
            </div>
          </div>
        )}

        {/* ════════════════════════════
           GİRİŞ / KAYIT FORMU
        ════════════════════════════ */}
        {(mode === "login" || mode === "signup") && (
          <div style={{ padding: "40px 24px 24px" }}>
            {/* Başlık */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <User size={24} color="white" />
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: fontDisplay,
                  letterSpacing: "-0.03em",
                }}
              >
                {mode === "login" ? t("account.welcomeBack") : t("account.createAccount")}
              </div>
              <div style={{ fontSize: 13, color: colors.inkMute, marginTop: 6 }}>
                {mode === "login"
                  ? t("account.signInSub")
                  : t("account.signUpSub")}
              </div>
            </div>

            {/* Google ile giriş */}
            <div
              onClick={handleGoogle}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "13px 0",
                borderRadius: 14,
                border: `1.5px solid ${colors.line}`,
                fontSize: 13,
                fontWeight: 600,
                color: colors.ink,
                cursor: "pointer",
                marginBottom: 16,
              }}
            >
              <Globe size={16} />
              {t("account.google")}
            </div>

            {/* Ayırıcı */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div style={{ flex: 1, height: 1, background: colors.line }} />
              <span style={{ fontSize: 11, color: colors.inkMute }}>or</span>
              <div style={{ flex: 1, height: 1, background: colors.line }} />
            </div>

            {/* İsim alanı (sadece kayıt) */}
            {mode === "signup" && (
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: `1.5px solid ${colors.line}`,
                    background: "#F8FAFC",
                  }}
                >
                  <User size={16} color={colors.inkMute} />
                  <input
                    type="text"
                    placeholder={t("account.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: 14,
                      color: colors.ink,
                      fontFamily: fontBody,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email alanı */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 14,
                  border: `1.5px solid ${colors.line}`,
                  background: "#F8FAFC",
                }}
              >
                <Mail size={16} color={colors.inkMute} />
                <input
                  type="email"
                  placeholder={t("account.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 14,
                    color: colors.ink,
                    fontFamily: fontBody,
                  }}
                />
              </div>
            </div>

            {/* Şifre alanı */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 14,
                  border: `1.5px solid ${colors.line}`,
                  background: "#F8FAFC",
                }}
              >
                <Lock size={16} color={colors.inkMute} />
                <input
                  type="password"
                  placeholder={t("account.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 14,
                    color: colors.ink,
                    fontFamily: fontBody,
                  }}
                />
              </div>
            </div>

            {/* Hata mesajı */}
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  fontSize: 12,
                  color: "#DC2626",
                  marginBottom: 12,
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            {/* Giriş / Kayıt butonu */}
            <div
              onClick={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "14px 0",
                borderRadius: 14,
                background: "linear-gradient(135deg, #1D4ED8, #1E40AF)",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.3)",
              }}
            >
              {mode === "login" ? t("account.signIn") : t("account.create")}
            </div>

            {/* Mod değiştirme */}
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: colors.inkMute }}>
              {mode === "login" ? (
                <>
                  {t("account.noAccount")}{" "}
                  <span
                    onClick={() => setMode("signup")}
                    style={{ color: colors.primary, fontWeight: 600, cursor: "pointer" }}
                  >
                    {t("account.signUp")}
                  </span>
                </>
              ) : (
                <>
                  {t("account.hasAccount")}{" "}
                  <span
                    onClick={() => setMode("login")}
                    style={{ color: colors.primary, fontWeight: 600, cursor: "pointer" }}
                  >
                    {t("account.signIn")}
                  </span>
                </>
              )}
            </div>

            {/* Hesap oluşturmadan devam */}
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
              {t("account.continueWithout")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
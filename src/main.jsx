// ══════════════════════════════════════════════
// main.jsx — Uygulama giriş noktası
// ══════════════════════════════════════════════
import React from "react";
import ReactDOM from "react-dom/client";
import { LanguageProvider } from "./LanguageContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
// ══════════════════════════════════════════════
// InstallPrompt.jsx — "Add to Home Screen" banner
// ══════════════════════════════════════════════
// Tarayıcının beforeinstallprompt event'ini yakalar
// iOS Safari için manuel instructions gösterir

import { useState, useEffect } from "react";
import { X, Download, Share } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const C = {
  ink: "#0F172A", inkSoft: "#475569", inkMute: "#94A3B8",
  line: "#E2E8F0", dark: "#0B1220", gold: "#C59D5F",
};
const fd = "'Plus Jakarta Sans',system-ui,sans-serif";

export default function InstallPrompt() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Daha önce install ettiyse veya kapatmışsa gösterme
    const dismissed = localStorage.getItem("installPromptDismissed");
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (dismissed || isStandalone) return;

    // iOS detection
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // Android/Chrome native install
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShow(true), 8000); // 8 saniye sonra göster
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS için 8 saniye sonra otomatik göster
    if (ios) {
      setTimeout(() => setShow(true), 8000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setShow(false);
          localStorage.setItem("installPromptDismissed", "installed");
        }
        setDeferredPrompt(null);
      } catch (err) {
        setShowIOSGuide(true);
      }
    } else {
      setShowIOSGuide(true);
    }
  };

  const dismiss = () => {
    setShow(false);
    setShowIOSGuide(false);
    localStorage.setItem("installPromptDismissed", Date.now().toString());
  };

  if (!show) return null;

  // iOS detailed guide
  if (showIOSGuide) {
    return (
      <div style={{position:"absolute",inset:0,zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div onClick={dismiss} style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.7)",backdropFilter:"blur(8px)"}}/>
        <div style={{position:"relative",background:"white",borderRadius:24,padding:24,maxWidth:320,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
          <div onClick={dismiss} style={{position:"absolute",top:14,right:14,width:28,height:28,borderRadius:14,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <X size={14} color={C.inkSoft}/>
          </div>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${C.dark},#1D4ED8)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
              <Download size={28} color={C.gold}/>
            </div>
            <div style={{fontSize:18,fontWeight:800,fontFamily:fd}}>{t("install.title")}</div>
            <div style={{fontSize:12,color:C.inkMute,marginTop:4}}>{t("install.subtitle")}</div>
          </div>

          <div style={{background:"#F8FAFC",borderRadius:14,padding:16}}>
            {isIOS ? (
              <>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
                  <div style={{width:24,height:24,borderRadius:12,background:C.dark,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800}}>1</div>
                  <div style={{flex:1,fontSize:13,color:C.ink,lineHeight:1.5}}>
                    Tap the <Share size={14} style={{display:"inline",verticalAlign:"middle",margin:"0 2px"}}/> <strong>Share</strong> button at the bottom of Safari
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
                  <div style={{width:24,height:24,borderRadius:12,background:C.dark,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800}}>2</div>
                  <div style={{flex:1,fontSize:13,color:C.ink,lineHeight:1.5}}>Scroll down and tap <strong>"Add to Home Screen"</strong></div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:24,height:24,borderRadius:12,background:C.dark,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800}}>3</div>
                  <div style={{flex:1,fontSize:13,color:C.ink,lineHeight:1.5}}>Tap <strong>"Add"</strong> in the top right corner</div>
                </div>
              </>
            ) : (
              <>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
                  <div style={{width:24,height:24,borderRadius:12,background:C.dark,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800}}>1</div>
                  <div style={{flex:1,fontSize:13,color:C.ink,lineHeight:1.5}}>
                    Tap the <strong>⋮ menu</strong> in the top-right of Chrome
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
                  <div style={{width:24,height:24,borderRadius:12,background:C.dark,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800}}>2</div>
                  <div style={{flex:1,fontSize:13,color:C.ink,lineHeight:1.5}}>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:24,height:24,borderRadius:12,background:C.dark,color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:800}}>3</div>
                  <div style={{flex:1,fontSize:13,color:C.ink,lineHeight:1.5}}>Confirm by tapping <strong>"Install"</strong></div>
                </div>
              </>
            )}
          </div>

          <div onClick={dismiss} style={{marginTop:16,padding:"12px",borderRadius:14,background:C.dark,color:"white",fontSize:13,fontWeight:700,textAlign:"center",cursor:"pointer"}}>
            {t("btn.gotIt")}
          </div>
        </div>
      </div>
    );
  }

  // Compact bottom banner
  return (
    <div style={{position:"absolute",bottom:88,left:16,right:16,zIndex:200,background:"white",border:`1px solid ${C.line}`,borderRadius:18,boxShadow:"0 10px 30px rgba(0,0,0,0.15)",padding:14,display:"flex",alignItems:"center",gap:12}}>
      <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${C.dark},#1D4ED8)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Download size={20} color={C.gold}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:800,color:C.ink}}>{t("install.title")}</div>
        <div style={{fontSize:10,color:C.inkMute,marginTop:1}}>{t("install.subtitle")}</div>
      </div>
      <div onClick={handleInstall} style={{padding:"8px 14px",borderRadius:99,background:C.dark,color:"white",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>
        {t("btn.install")}
      </div>
      <div onClick={dismiss} style={{width:24,height:24,borderRadius:12,background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
        <X size={12} color={C.inkSoft}/>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-[90vw] 
                 backdrop-blur-xl glass-card border-glass-border 
                 p-4 rounded-lg shadow-lg z-50 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p className="text-sm text-foreground max-w-[65%]">
        Ta strona używa ciasteczek, aby poprawić jakość korzystania z serwisu.
        Akceptujesz politykę prywatności.
      </p>
      <button
        onClick={acceptCookies}
        className="btn-hero glow px-6 py-2 rounded-md text-white text-sm"
      >
        Akceptuję
      </button>
    </div>
  );
};

export default CookieConsent;

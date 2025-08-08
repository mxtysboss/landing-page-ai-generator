import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

interface AuthContextType {
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  checkingSession: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "lg_user_email";
const EXPIRY_KEY = "lg_session_expires_ms";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState<boolean>(true);
  const logoutTimerRef = useRef<number | null>(null);

  // clear timeout helper
  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  // schedule automatic logout based on expiry timestamp (ms)
  const scheduleAutoLogout = (expiryMs: number | null) => {
    clearLogoutTimer();
    if (!expiryMs) return;
    const now = Date.now();
    const ms = expiryMs - now;
    if (ms <= 0) {
      // immediate logout
      logout();
      return;
    }
    logoutTimerRef.current = window.setTimeout(() => {
      logout();
    }, ms);
  };

  // call backend to verify cookie-session
  const checkServerSession = async () => {
    setCheckingSession(true);
    try {
      const res = await fetch(
        "http://localhost/generator-landing/check_session.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data && data.loggedIn && data.email) {
        setUserEmail(data.email);
        localStorage.setItem(STORAGE_KEY, data.email);
        // if we have an expiry in storage, use it to schedule auto logout
        const expiryMsStr = localStorage.getItem(EXPIRY_KEY);
        const expiryMs = expiryMsStr ? Number(expiryMsStr) : null;
        scheduleAutoLogout(expiryMs);
      } else {
        // not logged in
        setUserEmail(null);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(EXPIRY_KEY);
        clearLogoutTimer();
      }
    } catch (err) {
      // network or other error — keep local value but mark checked
      // we'll fallback to localStorage value (UI only) while server is unreachable
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUserEmail(stored);
    } finally {
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    // read local storage first for fast UI, then validate with server
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUserEmail(stored);

    // schedule auto logout if expiry exists
    const expiryMsStr = localStorage.getItem(EXPIRY_KEY);
    const expiryMs = expiryMsStr ? Number(expiryMsStr) : null;
    scheduleAutoLogout(expiryMs);

    // verify server-side cookie/session
    checkServerSession();

    // optional: re-check session every 5 minutes to keep frontend in sync with backend
    const intervalId = window.setInterval(() => {
      checkServerSession();
    }, 5 * 60 * 1000);

    return () => {
      clearLogoutTimer();
      window.clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (email: string) => {
    // note: we expect that login.php already set cookie (HttpOnly) on server side
    setUserEmail(email);
    localStorage.setItem(STORAGE_KEY, email);
    // set expiry 1h from now (ms) so UI can auto-logout in sync with server
    const expiryMs = Date.now() + 60 * 60 * 1000;
    localStorage.setItem(EXPIRY_KEY, String(expiryMs));
    scheduleAutoLogout(expiryMs);
  };

  const logout = async () => {
    // try to inform backend to clear cookie (if logout.php exists). If not, at least clean local state.
    try {
      await fetch("http://localhost/generator-landing/logout.php", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // ignore
    } finally {
      setUserEmail(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
      clearLogoutTimer();
    }
  };

  const value = useMemo(
    () => ({ userEmail, login, logout, checkingSession }),
    [userEmail, checkingSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

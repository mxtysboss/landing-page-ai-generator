import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const { userEmail, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b-glass-border backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text">
            LandingGen
          </Link>

          <div className="flex items-center gap-2">
            {userEmail ? (
              <div className="flex items-center gap-3">
                <div
                  className="avatar-badge"
                  aria-label={`Użytkownik ${userEmail}`}
                  title={userEmail}
                >
                  {userEmail.trim().charAt(0).toUpperCase()}
                </div>

                {/* mały dyskretny przycisk wyloguj - nie zmienia ogólnego wyglądu */}
                <button
                  onClick={logout}
                  className="text-sm px-3 py-1 rounded-md border border-border/20 hover:bg-muted/10 transition"
                  aria-label="Wyloguj"
                >
                  Wyloguj
                </button>
              </div>
            ) : location.pathname === "/" ? (
              <>
                <Link to="/login" className="btn-minimal">
                  Zaloguj się
                </Link>
                <Link to="/register" className="btn-minimal-cta">
                  Zarejestruj się
                </Link>
              </>
            ) : (
              <Link to="/" className="btn-minimal">
                Strona główna
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

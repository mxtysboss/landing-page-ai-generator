import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-8">
            <div className="glass-card p-12 max-w-2xl mx-auto">
              <div className="space-y-6">
                <h1 className="text-8xl font-bold gradient-text">404</h1>
                <h2 className="text-3xl font-bold text-foreground">Strona nie została znaleziona</h2>
                <p className="text-xl text-muted-foreground">
                  Ups! Strona której szukasz nie istnieje lub została przeniesiona.
                </p>
                <Link 
                  to="/" 
                  className="btn-hero inline-block glow"
                >
                  Wróć do strony głównej
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

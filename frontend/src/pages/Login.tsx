import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Błąd walidacji",
        description: "Wszystkie pola są wymagane",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        title: "Błąd walidacji",
        description: "Podaj prawidłowy adres email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost/generator-landing/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ważne, aby ciasteczko HttpOnly dotarło
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // backend ustawił cookie; frontend ustawia stan email i expiry
        login(formData.email);
        toast({
          title: "Sukces!",
          description: data.message || "Zostałeś pomyślnie zalogowany",
          variant: "default",
        });
        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        toast({
          title: "Błąd logowania",
          description: data.message || "Nieprawidłowy email lub hasło",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Błąd sieci",
        description:
          "Nie udało się połączyć z serwerem. Sprawdź backend i CORS.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold gradient-text">
                    Zaloguj się
                  </h1>
                  <p className="text-muted-foreground">
                    Wprowadź swoje dane aby uzyskać dostęp do konta
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-foreground font-medium"
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="twoj@email.com"
                      className="input-glass"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-foreground font-medium"
                    >
                      Hasło *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="input-glass"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-hero w-full glow"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="loading-spinner w-5 h-5"></div>
                        Logowanie...
                      </div>
                    ) : (
                      "Zaloguj się"
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-muted-foreground">
                    Nie masz konta?{" "}
                    <Link
                      to="/register"
                      className="text-primary hover:text-primary-glow transition-colors"
                    >
                      Zarejestruj się
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

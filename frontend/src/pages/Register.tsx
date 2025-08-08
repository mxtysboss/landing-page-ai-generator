import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Nowy stan dla checkboxa polityki prywatności
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
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

    if (formData.password.length < 6) {
      toast({
        title: "Błąd walidacji",
        description: "Hasło musi mieć co najmniej 6 znaków",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Błąd walidacji",
        description: "Hasła nie są identyczne",
        variant: "destructive",
      });
      return;
    }

    // Sprawdzenie czy polityka prywatności została zaakceptowana
    if (!privacyAccepted) {
      toast({
        title: "Błąd walidacji",
        description: "Musisz zaakceptować politykę prywatności",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        "http://localhost/generator-landing/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            privacy_policy_accepted: privacyAccepted, // wysyłamy zgodę do backendu
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Rejestracja udana!",
          description:
            data.message ||
            "Twoje konto zostało utworzone. Możesz się teraz zalogować.",
          variant: "default",
        });
        setFormData({ email: "", password: "", confirmPassword: "" });
        setPrivacyAccepted(false); // reset checkboxa
        navigate("/login");
      } else {
        toast({
          title: "Błąd rejestracji",
          description: data.message || "Coś poszło nie tak, spróbuj ponownie.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Błąd sieci",
        description:
          "Nie udało się połączyć z serwerem. Spróbuj ponownie później.",
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
                    Utwórz konto
                  </h1>
                  <p className="text-muted-foreground">
                    Zarejestruj się aby rozpocząć generowanie landing pages
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
                    <p className="text-xs text-muted-foreground">
                      Minimum 6 znaków
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-foreground font-medium"
                    >
                      Powtórz hasło *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className="input-glass"
                      required
                    />
                  </div>

                  {/* Nowy checkbox polityki prywatności */}
                  <div className="flex items-center space-x-2">
                    <input
                      id="privacyPolicy"
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label
                      htmlFor="privacyPolicy"
                      className="text-sm text-foreground select-none"
                    >
                      Akceptuję{" "}
                      <a
                        href="/politykaprywatnosci.txt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-glow underline"
                      >
                        politykę prywatności
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-hero w-full glow"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="loading-spinner w-5 h-5"></div>
                        Tworzenie konta...
                      </div>
                    ) : (
                      "Utwórz konto"
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-muted-foreground">
                    Masz już konto?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:text-primary-glow transition-colors"
                    >
                      Zaloguj się
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

export default Register;

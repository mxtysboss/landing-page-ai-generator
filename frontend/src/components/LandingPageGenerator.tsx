import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPageGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { userEmail, checkingSession } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // jeśli wciąż sprawdza sesję, poczekaj krótko (unikamy fałszywego redirectu)
    if (checkingSession) {
      toast({
        title: "Sprawdzanie sesji",
        description: "Chwila — sprawdzamy status zalogowania...",
        variant: "default",
      });
      return;
    }

    // jeśli niezalogowany -> przekieruj do logowania i pokaż toast
    if (!userEmail) {
      toast({
        title: "Zaloguj się",
        description:
          "Aby wygenerować landing page, musisz się najpierw zalogować.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!formData.companyName.trim() || !formData.companyDescription.trim()) {
      toast({
        title: "Błąd walidacji",
        description: "Wszystkie pola są wymagane",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // w razie gdy backend generujący wymaga cookie
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Pobieranie pliku ZIP
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.companyName.replace(
        /\s+/g,
        "_"
      )}_landing_page.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Sukces!",
        description: "Landing page został wygenerowany i pobrany",
        variant: "default",
      });

      setFormData({ companyName: "", companyDescription: "" });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Błąd połączenia",
        description:
          "Nie udało się połączyć z backendem. Sprawdź czy serwer działa na porcie 4000.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold gradient-text">
            Wygeneruj Landing Page
          </h2>
          <p className="text-muted-foreground">
            Wprowadź dane swojej firmy, a my stworzymy dla Ciebie profesjonalny
            landing page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="companyName"
              className="text-foreground font-medium"
            >
              Nazwa firmy *
            </Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              placeholder="np. TechCorp Solutions"
              className="input-glass"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="companyDescription"
              className="text-foreground font-medium"
            >
              Opis firmy *
            </Label>
            <Textarea
              id="companyDescription"
              value={formData.companyDescription}
              onChange={(e) =>
                setFormData({ ...formData, companyDescription: e.target.value })
              }
              placeholder="Opisz czym zajmuje się Twoja firma, jakie usługi oferuje i dla kogo..."
              className="input-glass min-h-[120px]"
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
                Generowanie...
              </div>
            ) : (
              "Generuj Landing Page"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LandingPageGenerator;

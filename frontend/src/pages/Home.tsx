import Navigation from '@/components/Navigation';
import LandingPageGenerator from '@/components/LandingPageGenerator';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Twórz
                <span className="gradient-text"> Profesjonalne </span>
                Landing Pages
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Automatycznie generuj nowoczesne, responsywne strony docelowe dla swojej firmy w kilka sekund
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-accent">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Szybkie generowanie</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Responsywny design</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Gotowy do użycia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <LandingPageGenerator />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-12">
            <h2 className="text-4xl font-bold gradient-text">
              Dlaczego wybrać nasz generator?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Błyskawiczna szybkość</h3>
                <p className="text-muted-foreground">
                  Wygeneruj profesjonalny landing page w mniej niż 30 sekund
                </p>
              </div>

              <div className="glass-card p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Responsywny design</h3>
                <p className="text-muted-foreground">
                  Każdy landing page działa perfekcyjnie na wszystkich urządzeniach
                </p>
              </div>

              <div className="glass-card p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3 3-3M12 12l0 9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Gotowy plik ZIP</h3>
                <p className="text-muted-foreground">
                  Otrzymasz kompletny, gotowy do wdrożenia landing page
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
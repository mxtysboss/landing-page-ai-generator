const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const PORT = 4000;

app.post("/generate", async (req, res) => {
  const { companyName, companyDescription } = req.body;

  const prompt = `
Jesteś doświadczonym frontendowym programistą specjalizującym się w tworzeniu nowoczesnych, profesjonalnych i w pełni responsywnych stron statycznych. Twoim zadaniem jest stworzenie kompletnego zestawu plików dla strony internetowej opartej na wytycznych użytkownika.

Na podstawie poniższych danych wygeneruj:

1. Plik \`index.html\` — semantyczny, czysty, nowoczesny kod HTML5, zawierający:
   - responsywny layout z kilkoma rozbudowanymi sekcjami (np. hero, usługi, portfolio, kontakt),
   - wszystkie treści i elementy zgodne z podanym opisem firmy,
   - użycie odpowiednich tagów semantycznych (\`header\`, \`section\`, \`article\`, \`footer\` itd.),
   - w nagłówku strony podłącz wyłącznie najnowsze, oficjalne CDN-y bibliotek GSAP w wersji 3.13.0 (w tym core GSAP, ScrollTrigger i ScrollToPlugin),
   - nie używaj w ogóle biblioteki AOS ani innych bibliotek do animacji oprócz GSAP,
   - upewnij się, że ScrollSmooth od GSAP jest zaimplementowany i działa na każdej stronie.

2. Plik \`style.css\` — nowoczesny, modularny i dobrze zorganizowany kod CSS:
   - spójny styl dopasowany do charakteru firmy i opisu,
   - responsywność (media queries),
   - estetyczne efekty hover, przejścia, typografia, kolory,
   - layout kompatybilny z kodem HTML.

3. Plik \`app.js\` — plik JavaScript zawierający animacje scrolla i efekty wizualne wyłącznie oparte na najnowszej wersji GSAP 3.13.0 i jej pluginach (np. ScrollTrigger, ScrollToPlugin):
   - implementuj płynne animacje wchodzących sekcji,
   - paralaksy i efekty wizualne zwiększające atrakcyjność UX,
   - użyj ScrollSmooth (ScrollToPlugin) od GSAP, aby zapewnić płynne przewijanie na całej stronie,
   - minimalny i zoptymalizowany kod,
   - nie korzystaj z żadnych innych bibliotek animacyjnych.
   - pamiętaj aby używać w GSAP "gsap.fromTo" a nie "gsap.from" w animacjach!

---

Dane firmy:

Firma: ${companyName}

Opis i styl wizualny strony: ${companyDescription}

---

Format odpowiedzi (BEZ komentarzy i dodatkowych instrukcji):

---index.html---
(Tutaj pełny kod HTML5 pliku index.html)

---style.css---
(Tutaj pełny kod CSS pliku style.css)

---app.js---
(Tutaj pełny kod JavaScript pliku app.js)
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    // Wyciągamy poszczególne pliki z odpowiedzi AI
    const extract = (label) => {
      const regex = new RegExp(`---${label}---([\\s\\S]*?)(?=---|$)`, "i");
      const match = content.match(regex);
      return match ? match[1].trim() : null;
    };

    const filesToSave = ["index.html", "style.css", "app.js"];
    const dir = path.join(
      __dirname,
      "../output",
      companyName.replace(/\s+/g, "_")
    );
    fs.mkdirSync(dir, { recursive: true });

    for (const file of filesToSave) {
      const label = file;
      const data = extract(label);
      if (data) {
        fs.writeFileSync(path.join(dir, file), data);
      } else {
        console.warn(`Nie znaleziono zawartości dla pliku ${file}`);
      }
    }

    const zipPath = path.join(__dirname, "../output", `${companyName}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    output.on("close", () => {
      res.download(zipPath, (err) => {
        if (err) {
          console.error("Błąd podczas wysyłania pliku ZIP:", err);
          res.status(500).send("Błąd przy pobieraniu pliku.");
        }
      });
    });

    archive.pipe(output);
    archive.directory(dir, false);
    archive.finalize();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd AI lub serwera." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend działa na http://localhost:${PORT}`);
});

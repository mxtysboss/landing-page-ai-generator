# Landing Page AI Generator

> Projekt do generowania landing page'y za pomocą sztucznej inteligencji.

---

## Spis treści

- [Opis projektu](#opis-projektu)
- [Funkcjonalności](#funkcjonalności)
- [Technologie](#technologie)
- [Instalacja](#instalacja)
- [Użycie](#użycie)
- [Struktura projektu](#struktura-projektu)
- [Kontrybucja](#kontrybucja)
- [Licencja](#licencja)

---

## Opis projektu

Landing Page AI Generator to narzędzie umożliwiające szybkie tworzenie responsywnych stron typu landing page, generowanych automatycznie przy pomocy algorytmów sztucznej inteligencji.

Projekt składa się z trzech głównych części:

- Backend — serwer odpowiedzialny za przetwarzanie i generowanie treści
- Frontend — interfejs użytkownika
- Output — wygenerowane pliki landing page (ignorowane w repozytorium)

---

## Funkcjonalności

- Generowanie kodu HTML/CSS na podstawie wytycznych użytkownika
- Responsywny design dopasowujący się do różnych urządzeń
- Możliwość dalszej edycji wygenerowanych stron

---

## Technologie

- Node.js / Express (backend)
- React / Vue / Angular (frontend) — dopasuj do swojego stacku
- AI API (np. OpenAI GPT) do generowania treści

---

## Instalacja

1. Sklonuj repozytorium:

    ```bash
    git clone https://github.com/mxtysboss/landing-page-ai-generator.git
    cd landing-page-ai-generator
    ```

2. Zainstaluj zależności backendu i frontend’u:

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. Skonfiguruj plik `.env` w folderze backend (nie dołączany do repo):

    ```env
    API_KEY=twoj_klucz_api
    PORT=5000
    ```

---

## Użycie

1. Uruchom backend:

    ```bash
    cd backend
    npm start
    ```

2. Uruchom frontend:

    ```bash
    cd frontend
    npm start
    ```

3. Otwórz przeglądarkę i przejdź do `http://localhost:3000`

---

## Struktura projektu

landing-page-ai-generator/
├── backend/ # Serwer i logika backendowa
├── frontend/ # Aplikacja frontendowa
├── output/ # Wygenerowane landing page (ignorowane w git)
├── .gitignore # Plik ignorujący output i .env
└── README.md # Ten plik


---

## Kontrybucja

Jeśli chcesz przyczynić się do projektu, otwórz issue lub pull request.

---

## Licencja

MIT License © 2025

---

Dzięki za odwiedziny! 🚀

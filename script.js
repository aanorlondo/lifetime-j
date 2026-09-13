const DATE_NAISSANCE = new Date("2026-08-24T12:48:30");

function updateCounter() {
  const now = new Date();

  // Calcul des années et mois calendaires réels
  let years = now.getFullYear() - DATE_NAISSANCE.getFullYear();
  let months = now.getMonth() - DATE_NAISSANCE.getMonth();

  // Ajustement des années/mois si la date du mois courant n'est pas encore atteinte
  let dateDiff = now.getDate() - DATE_NAISSANCE.getDate();
  if (dateDiff < 0) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calcul du reste du temps pour jours, heures, minutes, secondes
  const anchorDate = new Date(DATE_NAISSANCE);
  anchorDate.setFullYear(anchorDate.getFullYear() + years);
  anchorDate.setMonth(anchorDate.getMonth() + months);

  let diffMs = now - anchorDate;

  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Mise à jour du DOM
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Mise à jour immédiate puis chaque seconde
updateCounter();
setInterval(updateCounter, 1000);

// --- 🎨 INTERACTIVITÉ, COULEURS & POLICES ---

const NUMBER_PALETTES = [
  "linear-gradient(135deg, #ff80bf 0%, #ffaa80 35%, #ffd11a 65%, #66cc99 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 50%, #ffb199 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fdcbf1 0%, #e6eee4 50%, #a1c4fd 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #feada6 100%)",
  "linear-gradient(135deg, #ff847c 0%, #e84a5f 50%, #feceab 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
];

const BG_THEMES = [
  { bg: "#fbf6ec", blob1: "#f3e5ab", blob2: "#e8d5b7" }, // Crème & Moutarde
  { bg: "#f4f9f4", blob1: "#c8e6c9", blob2: "#a5d6a7" }, // Vert menthe
  { bg: "#f7f0f5", blob1: "#e1bee7", blob2: "#ce93d8" }, // Lavande
  { bg: "#fff5f5", blob1: "#ffcdd2", blob2: "#ef9a9a" }, // Rose poudré
  { bg: "#f0f4f8", blob1: "#bbdefb", blob2: "#90caf9" }, // Bleu ciel
  { bg: "#fff8e7", blob1: "#ffe0b2", blob2: "#ffcc80" }, // Pêche
];

const CARD_BORDER_SHAPES = [
  "255px 15px 225px 15px/15px 225px 15px 255px",
  "50% 50% 40% 40% / 60% 60% 40% 40%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "50%",
  "40% 60% 70% 30% / 50% 30% 70% 50%",
  "70% 30% 50% 50% / 30% 60% 40% 70%",
];

// Liste des polices à alterner
const FONTS = [
  "'Fredoka', cursive, sans-serif",
  "'Gaegu', cursive, sans-serif",
  "'Sniglet', cursive, sans-serif",
  "'Patrick Hand', cursive, sans-serif",
  "'Comic Neue', cursive, sans-serif",
  "'Concert One', cursive, sans-serif",
];

const HEART_FILTERS = [
  "hue-rotate(0deg)",
  "hue-rotate(50deg) saturate(1.5)",
  "hue-rotate(90deg) saturate(1.8)",
  "hue-rotate(140deg) saturate(1.6)",
  "hue-rotate(200deg) saturate(1.7)",
  "hue-rotate(260deg) saturate(1.8)",
  "hue-rotate(300deg) saturate(1.5)",
];

const heartEl = document.getElementById("heart");
const numberEls = document.querySelectorAll(".number");
const cardEls = document.querySelectorAll(".card");

let currentThemeIndex = 0;

heartEl.addEventListener("click", () => {
  // 1. Animation du cœur
  heartEl.classList.remove("pop-anim");
  void heartEl.offsetWidth;
  heartEl.classList.add("pop-anim");

  // 2. Prochain index
  currentThemeIndex = (currentThemeIndex + 1) % BG_THEMES.length;

  const newNumPalette =
    NUMBER_PALETTES[currentThemeIndex % NUMBER_PALETTES.length];
  const newBgTheme = BG_THEMES[currentThemeIndex];
  const newRadius =
    CARD_BORDER_SHAPES[currentThemeIndex % CARD_BORDER_SHAPES.length];
  const newFont = FONTS[currentThemeIndex % FONTS.length];
  const newHeartFilter =
    HEART_FILTERS[currentThemeIndex % HEART_FILTERS.length];

  // 3. Application des variables CSS (Fond & Police)
  document.documentElement.style.setProperty("--bg-cream", newBgTheme.bg);
  document.documentElement.style.setProperty("--bg-blob-1", newBgTheme.blob1);
  document.documentElement.style.setProperty("--bg-blob-2", newBgTheme.blob2);
  document.documentElement.style.setProperty("--current-font", newFont);

  // 4. Couleur du cœur
  heartEl.style.filter = newHeartFilter;

  // 5. Couleur des chiffres
  numberEls.forEach((el) => {
    el.style.background = newNumPalette;
    el.style.webkitBackgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
  });

  // 6. Forme & Rebond des cartes
  cardEls.forEach((card, index) => {
    setTimeout(() => {
      card.style.borderRadius = newRadius;
      card.classList.remove("card-bounce");
      void card.offsetWidth;
      card.classList.add("card-bounce");
    }, index * 40);
  });
});

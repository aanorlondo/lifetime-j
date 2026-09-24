const DATE_NAISSANCE = new Date("2026-08-24T14:48:30");

// 🔗 Liens audio direct
const METAL_SOUND_URL =
  "https://www.myinstants.com/media/sounds/chopper-alert-sample-91019-3.mp3";
const JAZZ_SOUND_URL =
  "https://www.myinstants.com/media/sounds/avatar-song-lofi.mp3";

// --- ⏰ COMPTEUR DE TEMPS (CORRIGÉ & ROBUSTE) ---
function updateCounter() {
  const now = new Date();

  if (now < DATE_NAISSANCE) {
    document.getElementById("years").textContent = 0;
    document.getElementById("months").textContent = 0;
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
    return;
  }

  // 1. Calcul des années
  let cursor = new Date(DATE_NAISSANCE);
  let years = 0;
  while (true) {
    let nextYear = new Date(cursor);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    if (nextYear <= now) {
      years++;
      cursor = nextYear;
    } else {
      break;
    }
  }

  // 2. Calcul des mois
  let months = 0;
  while (true) {
    let nextMonth = new Date(cursor);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth <= now) {
      months++;
      cursor = nextMonth;
    } else {
      break;
    }
  }

  // 3. Calcul du reste en ms (jours, heures, minutes, secondes)
  let diffMs = now - cursor;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutes * (1000 * 60);

  const seconds = Math.floor(diffMs / 1000);

  // Mise à jour du DOM
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

// --- 🎵 GESTION DE LA BOÎTE À MUSIQUE ---
let audioCtx = null;
let musicBoxTimer = null;
let isMusicBoxPlaying = false;
let currentAudioTrack = null;

const LULLABY_NOTES = [
  523.25, 659.25, 783.99, 659.25, 523.25, 659.25, 783.99, 587.33, 698.46,
  783.99, 698.46, 587.33, 698.46, 783.99, 659.25, 783.99, 1046.5, 783.99,
  659.25, 783.99, 1046.5,
];
let noteIndex = 0;

function playMusicBoxNote() {
  if (!isMusicBoxPlaying || !audioCtx) return;

  const freq = LULLABY_NOTES[noteIndex];
  noteIndex = (noteIndex + 1) % LULLABY_NOTES.length;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.2);
}

function startMusicBox() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  isMusicBoxPlaying = true;
  if (!musicBoxTimer) {
    musicBoxTimer = setInterval(playMusicBoxNote, 500);
  }
}

function stopMusicBox() {
  isMusicBoxPlaying = false;
  if (musicBoxTimer) {
    clearInterval(musicBoxTimer);
    musicBoxTimer = null;
  }
}

function stopExternalAudio() {
  if (currentAudioTrack) {
    currentAudioTrack.pause();
    currentAudioTrack.currentTime = 0;
    currentAudioTrack = null;
  }
}

document.body.addEventListener(
  "click",
  () => {
    if (!isMusicBoxPlaying && clickCount % 10 !== 5 && clickCount % 10 !== 8) {
      startMusicBox();
    }
  },
  { once: false }
);

// --- 🎨 INTERACTIVITÉ, THEMES, PHRASES & EASTER EGGS ---

const PASTEL_TITLES = [
  "Depuis ton premier souffle...",
  "L'écho des secondes depuis toi...",
  "Depuis ta venue au monde...",
  "Des instants & des secondes...",
  "Le temps s'égrène depuis toi...",
  "Chaque seconde avec toi...",
];

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
  { bg: "#fbf6ec", blob1: "#f3e5ab", blob2: "#e8d5b7" },
  { bg: "#f4f9f4", blob1: "#c8e6c9", blob2: "#a5d6a7" },
  { bg: "#f7f0f5", blob1: "#e1bee7", blob2: "#ce93d8" },
  { bg: "#fff5f5", blob1: "#ffcdd2", blob2: "#ef9a9a" },
  { bg: "#f0f4f8", blob1: "#bbdefb", blob2: "#90caf9" },
  { bg: "#fff8e7", blob1: "#ffe0b2", blob2: "#ffcc80" },
];

const CARD_BORDER_SHAPES = [
  "255px 15px 225px 15px/15px 225px 15px 255px",
  "50% 50% 40% 40% / 60% 60% 40% 40%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "50%",
  "40% 60% 70% 30% / 50% 30% 70% 50%",
  "70% 30% 50% 50% / 30% 60% 40% 70%",
];

const FONTS_CONFIG = [
  {
    font: "'Fredoka', cursive, sans-serif",
    titleSize: "2.2rem",
    numSize: "2rem",
    labelSize: "0.8rem",
  },
  {
    font: "'Gaegu', cursive, sans-serif",
    titleSize: "2.6rem",
    numSize: "2.4rem",
    labelSize: "0.95rem",
  },
  {
    font: "'Sniglet', cursive, sans-serif",
    titleSize: "2.2rem",
    numSize: "2rem",
    labelSize: "0.8rem",
  },
  {
    font: "'Patrick Hand', cursive, sans-serif",
    titleSize: "2.6rem",
    numSize: "2.4rem",
    labelSize: "0.95rem",
  },
  {
    font: "'Comic Neue', cursive, sans-serif",
    titleSize: "2.3rem",
    numSize: "2.1rem",
    labelSize: "0.85rem",
  },
  {
    font: "'Concert One', cursive, sans-serif",
    titleSize: "2.2rem",
    numSize: "1.9rem",
    labelSize: "0.8rem",
  },
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
const titleEl = document.querySelector(".title");
const numberEls = document.querySelectorAll(".number");
const cardEls = document.querySelectorAll(".card");

let currentThemeIndex = 0;
let clickCount = 0;

heartEl.addEventListener("click", (e) => {
  e.stopPropagation();
  clickCount++;

  heartEl.classList.remove("pop-anim");
  void heartEl.offsetWidth;
  heartEl.classList.add("pop-anim");

  stopExternalAudio();

  const stepInCycle = clickCount % 10;

  // 🎷 1. EASTER EGG JAZZ (5ème clic)
  if (stepInCycle === 5) {
    stopMusicBox();

    try {
      currentAudioTrack = new Audio(JAZZ_SOUND_URL);
      currentAudioTrack.volume = 0.8;
      currentAudioTrack.play().catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }

    heartEl.textContent = "🎷";
    heartEl.style.filter = "none";

    titleEl.textContent = "Depuis tes premières notes...";
    titleEl.className = "title jazz-style";

    document.documentElement.style.setProperty("--bg-cream", "#0b0d19");
    document.documentElement.style.setProperty("--bg-blob-1", "#2d1b4e");
    document.documentElement.style.setProperty("--bg-blob-2", "#182a4a");
    document.documentElement.style.setProperty(
      "--current-font",
      "'Playfair Display', serif"
    );
    document.documentElement.style.setProperty("--title-size", "2.4rem");
    document.documentElement.style.setProperty("--num-size", "2.1rem");
    document.documentElement.style.setProperty("--label-size", "0.85rem");

    document.documentElement.style.setProperty(
      "--card-bg",
      "rgba(20, 24, 45, 0.85)"
    );
    document.documentElement.style.setProperty(
      "--card-border",
      "rgba(212, 175, 55, 0.4)"
    );
    document.documentElement.style.setProperty("--text-muted", "#e2c56a");
    document.documentElement.style.setProperty("--stroke-dark", "#3a2800");

    numberEls.forEach((el) => {
      el.style.background =
        "linear-gradient(135deg, #fff3c4 0%, #ffd700 45%, #d4af37 70%, #ffaa00 100%)";
      el.style.webkitBackgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
    });

    cardEls.forEach((card, index) => {
      setTimeout(() => {
        card.style.borderRadius = "16px";
        card.classList.remove("card-bounce");
        void card.offsetWidth;
        card.classList.add("card-bounce");
      }, index * 40);
    });

    return;
  }

  // 🤘 2. EASTER EGG METAL (8ème clic)
  if (stepInCycle === 8) {
    stopMusicBox();

    try {
      currentAudioTrack = new Audio(METAL_SOUND_URL);
      currentAudioTrack.volume = 0.8;
      currentAudioTrack.play().catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }

    heartEl.textContent = "🤘";
    heartEl.style.filter = "none";

    titleEl.textContent = "... ton premier growl !";
    titleEl.className = "title metallica-style";

    document.documentElement.style.setProperty("--bg-cream", "#0a0a0c");
    document.documentElement.style.setProperty("--bg-blob-1", "#880000");
    document.documentElement.style.setProperty("--bg-blob-2", "#330000");
    document.documentElement.style.setProperty(
      "--current-font",
      "'New Rocker', cursive, sans-serif"
    );
    document.documentElement.style.setProperty("--title-size", "2.5rem");
    document.documentElement.style.setProperty("--num-size", "2rem");
    document.documentElement.style.setProperty("--label-size", "0.85rem");

    document.documentElement.style.setProperty(
      "--card-bg",
      "rgba(18, 18, 22, 0.95)"
    );
    document.documentElement.style.setProperty(
      "--card-border",
      "rgba(230, 30, 30, 0.7)"
    );
    document.documentElement.style.setProperty("--text-muted", "#ff4d4d");
    document.documentElement.style.setProperty("--stroke-dark", "#000000");

    numberEls.forEach((el) => {
      el.style.background =
        "linear-gradient(180deg, #ffffff 0%, #cbd5e1 45%, #475569 50%, #0f172a 100%)";
      el.style.webkitBackgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
    });

    cardEls.forEach((card, index) => {
      setTimeout(() => {
        card.style.borderRadius = "6px 22px 6px 22px";
        card.classList.remove("card-bounce");
        void card.offsetWidth;
        card.classList.add("card-bounce");
      }, index * 40);
    });

    return;
  }

  // 🔄 3. RETOUR EN MODE PASTEL & BERCEUSE
  startMusicBox();

  heartEl.textContent = "❤️";
  titleEl.className = "title";

  currentThemeIndex = (currentThemeIndex + 1) % BG_THEMES.length;
  titleEl.textContent = PASTEL_TITLES[currentThemeIndex % PASTEL_TITLES.length];

  const newNumPalette =
    NUMBER_PALETTES[currentThemeIndex % NUMBER_PALETTES.length];
  const newBgTheme = BG_THEMES[currentThemeIndex];
  const newRadius =
    CARD_BORDER_SHAPES[currentThemeIndex % CARD_BORDER_SHAPES.length];
  const fontConfig = FONTS_CONFIG[currentThemeIndex % FONTS_CONFIG.length];
  const newHeartFilter =
    HEART_FILTERS[currentThemeIndex % HEART_FILTERS.length];

  document.documentElement.style.setProperty("--bg-cream", newBgTheme.bg);
  document.documentElement.style.setProperty("--bg-blob-1", newBgTheme.blob1);
  document.documentElement.style.setProperty("--bg-blob-2", newBgTheme.blob2);
  document.documentElement.style.setProperty("--current-font", fontConfig.font);
  document.documentElement.style.setProperty(
    "--title-size",
    fontConfig.titleSize
  );
  document.documentElement.style.setProperty("--num-size", fontConfig.numSize);
  document.documentElement.style.setProperty(
    "--label-size",
    fontConfig.labelSize
  );

  document.documentElement.style.setProperty(
    "--card-bg",
    "rgba(255, 250, 240, 0.85)"
  );
  document.documentElement.style.setProperty(
    "--card-border",
    "rgba(140, 110, 80, 0.25)"
  );
  document.documentElement.style.setProperty("--text-muted", "#7c6853");
  document.documentElement.style.setProperty("--stroke-dark", "#3a2e2b");

  heartEl.style.filter = newHeartFilter;

  numberEls.forEach((el) => {
    el.style.background = newNumPalette;
    el.style.webkitBackgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
  });

  cardEls.forEach((card, index) => {
    setTimeout(() => {
      card.style.borderRadius = newRadius;
      card.classList.remove("card-bounce");
      void card.offsetWidth;
      card.classList.add("card-bounce");
    }, index * 40);
  });
});

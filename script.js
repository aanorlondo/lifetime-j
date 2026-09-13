
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
  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// Mise à jour immédiate puis chaque seconde
updateCounter();
setInterval(updateCounter, 1000);

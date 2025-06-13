if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker enregistré.'))
      .catch(err => console.error('❌ Erreur service worker :', err));
  }

import { bindTapHandler } from './utils/tap-handler.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 200}ms`;
  });

  bindTapHandler('.game-card', (el) => {
    const label = el.querySelector('.game-label');
    if (label) {
      alert(`Selected: ${label.textContent}`);
    }
  });
});

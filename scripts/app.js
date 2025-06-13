if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker enregistré.'))
      .catch(err => console.error('❌ Erreur service worker :', err));
  }

import { bindTapHandler } from './utils/tap-handler.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 200}ms`;
    card.addEventListener('click', function (e) {
      // Prevent multiple expansions
      if (card.classList.contains('expanded')) return;
      // Clone the card for animation isolation
      const cardRect = card.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const clone = card.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.top = (cardRect.top + scrollY) + 'px';
      clone.style.left = (cardRect.left + scrollX) + 'px';
      clone.style.width = cardRect.width + 'px';
      clone.style.height = cardRect.height + 'px';
      clone.style.margin = 0;
      clone.style.zIndex = 1000;
      clone.classList.add('expanded');
      // Add placeholder game content
      const content = document.createElement('div');
      content.className = 'game-content';
      content.innerHTML = '<p>Game Placeholder Content</p>';
      clone.appendChild(content);
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = function(ev) {
        ev.stopPropagation();
        clone.classList.remove('expanded');
        setTimeout(() => clone.remove(), 600);
      };
      clone.appendChild(closeBtn);
      document.body.appendChild(clone);
      // Force reflow for transition
      void clone.offsetWidth;
      // Animate to full screen
      clone.style.top = 0;
      clone.style.left = 0;
      clone.style.width = '100vw';
      clone.style.height = '100vh';
      // Show content after expand
      setTimeout(() => {
        content.style.opacity = 1;
      }, 400);
    });
  });

  bindTapHandler('.game-card', (el) => {
    const label = el.querySelector('.game-label');
    if (label) {
      alert(`Selected: ${label.textContent}`);
    }
  });
});

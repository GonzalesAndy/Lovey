if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker enregistré.'))
      .catch(err => console.error('❌ Erreur service worker :', err));
  }

import { bindTapHandler } from './utils/tap-handler.js';
import { setupGameCardExpander } from './utils/gameCardExpander.js';

document.addEventListener("DOMContentLoaded", () => {
  setupGameCardExpander();
});

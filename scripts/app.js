if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker enregistré.'))
      .catch(err => console.error('❌ Erreur service worker :', err));
  }

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".game-card");

  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 200}ms`;
    const handleCardSelect = () => {
      const label = card.querySelector('.game-label');
      if (label) {
        alert(`Vous avez sélectionné : ${label.textContent}`);
      }
    };
    card.addEventListener('click', handleCardSelect);
    card.addEventListener('touchstart', handleCardSelect);
  });
});

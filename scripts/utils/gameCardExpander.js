export function setupGameCardExpander() {
  // Use template for overlay creation
  let overlay = document.getElementById('game-fullscreen');
  if (!overlay) {
    const template = document.getElementById('game-fullscreen-template');
    if (template) {
      overlay = template.content.firstElementChild.cloneNode(true);
      document.body.appendChild(overlay);
    } else {
      console.error('game-fullscreen-template not found');
      return;
    }
  }
  const closeBtn = overlay.querySelector('.close-btn');
  closeBtn.onclick = function(ev) {
    ev.stopPropagation();
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = 'none';
  };

  document.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', function (e) {
      // Optionally customize content based on card
      const label = card.querySelector('.game-label')?.textContent || '';
      overlay.querySelector('.game-content').innerHTML = `<h1 style='margin-top:3rem;'>${label}</h1><p>Game Placeholder Content</p>`;
      overlay.style.opacity = 1;
      overlay.style.pointerEvents = 'auto';
    });
  });
}

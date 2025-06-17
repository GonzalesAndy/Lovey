export function setupGameCardExpander() {
  // Use template for overlay creation
  let overlay = document.getElementById("game-fullscreen");
  if (!overlay) {
    const template = document.getElementById("game-fullscreen-template");
    if (template) {
      overlay = template.content.firstElementChild.cloneNode(true);
      document.body.appendChild(overlay);
    } else {
      console.error("game-fullscreen-template not found");
      return;
    }
  }
  const closeBtn = overlay.querySelector(".close-btn");
  closeBtn.onclick = function (ev) {
    ev.stopPropagation();
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";
    const content = overlay.querySelector(".game-content");
    if (content) content.classList.remove("visible"); // retire la classe visible à la fermeture
  };

  document.querySelectorAll(".game-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      const gameId = card.dataset.gameId;
      console.log("Game card clicked:", gameId);
      if (gameId) {
        fetch(`pages/games/${gameId}.html`)
          .then((response) => response.text())
          .then((html) => {
            const content = overlay.querySelector(".game-content");
            content.innerHTML = html;

            if (gameId === "tic-tac-toe") {
              import("../../scripts/games/tic-tac-toe.js").then((mod) => {
                if (mod.initTicTacToe) {
                  mod.initTicTacToe(content);
                }
              });
            } else {
              // Charger le JS du jeu pour les autres jeux
              const script = document.createElement("script");
              script.src = `scripts/games/${gameId}.js`;
              script.type = "module";
              content.appendChild(script);
            }

            overlay.style.opacity = 1;
            overlay.style.pointerEvents = "auto";
            content.classList.add("visible"); 
          });
      } else {
        const label = card.querySelector(".game-label")?.textContent || "";
        const content = overlay.querySelector(".game-content");
        content.innerHTML = `<h1 style='margin-top:3rem;'>${label}</h1><p>Game Placeholder Content</p>`;
        overlay.style.opacity = 1;
        overlay.style.pointerEvents = "auto";
        content.classList.add("visible"); // ajoute la classe visible ici aussi
      }
    });
  });
}

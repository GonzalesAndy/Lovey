export function setupGameCardExpander() {
  document.querySelectorAll(".game-card").forEach((card, index) => {
    if (card.dataset.listenerAttached === "true") return; // 🔒 Prevent rebinding

    card.dataset.listenerAttached = "true"; // ✅ Mark as handled
    card.style.animationDelay = `${index * 200}ms`;

    card.addEventListener("click", function (e) {
      if (document.querySelector(".expanded")) return; // 🔐 Only one at a time

      const cardRect = card.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      const clone = card.cloneNode(true);
      Object.assign(clone.style, {
        position: "fixed",
        top: `${cardRect.top + scrollY}px`,
        left: `${cardRect.left + scrollX}px`,
        width: `${cardRect.width}px`,
        height: `${cardRect.height}px`,
        margin: 0,
        zIndex: 1000,
        opacity: "1",
        background: "#222", // 🧱 Solid background
        borderRadius: "0",
        transition: "all 0.4s ease"
      });

      clone.classList.add("expanded");

      const content = document.createElement("div");
      content.className = "game-content";
      content.innerHTML = "<p>Game Placeholder Content</p>";
      content.style.opacity = "0";
      content.style.transition = "opacity 0.3s ease";
      clone.appendChild(content);

      const closeBtn = document.createElement("button");
      closeBtn.className = "close-btn";
      closeBtn.innerHTML = "&times;";
      closeBtn.onclick = function (ev) {
  ev.stopPropagation();

  const originalRect = card.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  // Animate back to original card position
  clone.style.transition = 'all 0.4s ease';
  clone.style.top = `${originalRect.top + scrollY}px`;
  clone.style.left = `${originalRect.left + scrollX}px`;
  clone.style.width = `${originalRect.width}px`;
  clone.style.height = `${originalRect.height}px`;
  clone.style.borderRadius = ''; // Optional: reset to original shape
  clone.style.boxShadow = 'none';

  // Fade out content
  content.style.opacity = '0';

  // After animation, remove the clone
  setTimeout(() => {
    clone.remove();
  }, 400);
};

      clone.appendChild(closeBtn);

      document.body.appendChild(clone);
      void clone.offsetWidth;

      Object.assign(clone.style, {
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        borderRadius: "0",
        boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)"
      });

      setTimeout(() => {
        content.style.opacity = "1";
      }, 400);
    });
  });
}

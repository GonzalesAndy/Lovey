export function bindTapHandler(selector, onTap) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : Array.isArray(selector)
      ? selector
      : [selector];

  elements.forEach((el) => {
    let pointerDown = false;
    let startX = 0;
    let startY = 0;

    el.addEventListener("pointerdown", (e) => {
      pointerDown = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    el.addEventListener("pointerup", (e) => {
      if (!pointerDown) return;
      pointerDown = false;

      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx < 10 && dy < 10) {
        onTap(el, e);
      }
    });

    el.addEventListener("pointercancel", () => {
      pointerDown = false;
    });
  });
}

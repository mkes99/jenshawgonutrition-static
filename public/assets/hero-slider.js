(function () {
  const root = document.querySelector("[data-hero-slider]");
  if (!root) return;

  const track = root.querySelector("[data-hero-slider-track]");
  const slides = Array.from(root.querySelectorAll("[data-hero-slide]"));
  const prevBtn = root.querySelector("[data-hero-prev]");
  const nextBtn = root.querySelector("[data-hero-next]");
  const dotsWrap = root.querySelector("[data-hero-dots]");

  if (!track || slides.length === 0) return;

  const AUTOPLAY_MS = 6500;
  let index = 0;
  let timer = null;
  let isHovering = false;

  // Build dots
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "rev-hero__dot";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => goTo(i, true));
    dotsWrap && dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    track.style.transform = `translateX(${index * -100}%)`;
    slides.forEach((s, i) => s.setAttribute("aria-hidden", i === index ? "false" : "true"));
    dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));
  }

  function goTo(i, user = false) {
    index = (i + slides.length) % slides.length;
    render();
    if (user) restart();
  }

  function next(user = false) { goTo(index + 1, user); }
  function prev(user = false) { goTo(index - 1, user); }

  function start() {
    if (timer) return;
    timer = window.setInterval(() => {
      if (!isHovering) next(false);
    }, AUTOPLAY_MS);
  }
  function stop() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }
  function restart() {
    stop();
    start();
  }

  // Hover pause
  root.addEventListener("mouseenter", () => { isHovering = true; });
  root.addEventListener("mouseleave", () => { isHovering = false; });

  // Buttons
  prevBtn && prevBtn.addEventListener("click", () => prev(true));
  nextBtn && nextBtn.addEventListener("click", () => next(true));

  // Keyboard
  root.setAttribute("tabindex", "0");
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev(true);
    if (e.key === "ArrowRight") next(true);
  });

  // Touch swipe
  let startX = 0;
  let endX = 0;
  root.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchmove", (e) => { endX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", () => {
    const dx = endX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? next(true) : prev(true));
    startX = endX = 0;
  });

  // Init
  render();
  start();
})();
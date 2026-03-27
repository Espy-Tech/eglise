// Mobile menu
function initializeMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarCenter = document.querySelector(".navbar-center");

  if (!menuToggle || !navbarCenter) return;

  menuToggle.addEventListener("click", () => {
    navbarCenter.classList.toggle("active");
  });

  // Close menu when clicking on links
  document.querySelectorAll(".navbar-center a").forEach((link) => {
    link.addEventListener("click", () => {
      navbarCenter.classList.remove("active");
    });
  });
}

// Hero slider
function initializeHeroSlider() {
  const track = document.getElementById("hero-track");
  const slides = track ? Array.from(track.querySelectorAll(".hero-slide")) : [];
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  const GAP = 24;
  let currentIndex = 0;

  function getVisibleSlides() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1200) return 2;
    return 3;
  }

  function getMaxIndex() {
    const visible = getVisibleSlides();
    return Math.max(0, slides.length - visible);
  }

  function updateSlider() {
    const slideWidth = slides[0].getBoundingClientRect().width + GAP;
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    const offset = currentIndex * slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? maxIndex : currentIndex + 1;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
    updateSlider();
  });

  // Автопрокрутка
  setInterval(() => {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }, 8000);

  window.addEventListener("resize", updateSlider);

  // начальная позиция
  updateSlider();
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileMenu();
  initializeHeroSlider();
});

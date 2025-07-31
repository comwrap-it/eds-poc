import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const slides = children.filter((child) => child.tagName !== 'BUTTON');
  let currentSlide = 0;
  let dotsWrapper;
  let autoSlideTimer;
  const autoPlayInterval = 5000;

  //ACCESSIBILITÀ
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Carosello');

  //AREA INVISIBILE PER ANNUNCIO SCREEN READER
  const srStatus = document.createElement('div');
  srStatus.setAttribute('id', 'carousel-status');
  srStatus.setAttribute('aria-live', 'polite');
  srStatus.setAttribute('aria-atomic', 'true');
  srStatus.className = 'visually-hidden';
  block.appendChild(srStatus);

  // Funzione per aggiornare la slide visibile e i pallini
  const updateSlides = (newIndex) => {
    slides.forEach((slide, index) => {
      const isActive = index === newIndex;
      slide.classList.toggle('slider-active', isActive);
      slide.style.display = isActive ? 'block' : 'none';

      // accessibilità per ciascuna slide
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Slide ${index + 1} di ${slides.length}`);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');

      const contentBox = slide.querySelectorAll('div')[1];
      if (contentBox) {
        contentBox.classList.add('slider-box');
      }
    });

    if (dotsWrapper) {
      const dots = dotsWrapper.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === newIndex);
      });
    }

    // Aggiorna annuncio screen reader accessbilità
    srStatus.textContent = `Slide ${newIndex + 1} di ${slides.length}`;

    currentSlide = newIndex;
  };

  const startAutoSlide = () => {
    autoSlideTimer = setInterval(() => {
      const newIndex = (currentSlide + 1) % slides.length;
      updateSlides(newIndex);
    }, autoPlayInterval);
  };

  const resetAutoSlideTimer = () => {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  // Inizializza le slide
  slides.forEach((slide, index) => {
    slide.classList.add('slider-class');
    slide.classList.toggle('slider-active', index === 0);
    slide.style.display = index === 0 ? 'block' : 'none';

    //accessibilità
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `Slide ${index + 1} di ${slides.length}`);
  });

  // Crea pulsante PREV
  const prevBtn = document.createElement('button');
  prevBtn.className = 'slider-prev';
  prevBtn.setAttribute('aria-label', 'Prev Button');
  prevBtn.innerHTML = '←';

  prevBtn.addEventListener('click', () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides(newIndex);
    resetAutoSlideTimer();
  });

  // Crea pulsante NEXT
  const nextBtn = document.createElement('button');
  nextBtn.className = 'slider-next';
  nextBtn.setAttribute('aria-label', 'Next Button');
  nextBtn.innerHTML = '→';

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentSlide + 1) % slides.length;
    updateSlides(newIndex);
    resetAutoSlideTimer();
  });

  if (slides.length > 1) {
    block.append(prevBtn, nextBtn);

    dotsWrapper = document.createElement('div');
    dotsWrapper.className = 'slider-dots';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Vai alla slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        updateSlides(index);
        resetAutoSlideTimer();
      });

      dotsWrapper.appendChild(dot);
    });

    block.appendChild(dotsWrapper);
    startAutoSlide();
  }
}

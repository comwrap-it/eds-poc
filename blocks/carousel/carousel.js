import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const slides = children.filter((child) => child.tagName !== 'BUTTON');
  let currentSlide = 0;

  // Inizializza le slide
  slides.forEach((slide, index) => {
    const className = `slider-class-${index + 1}`;
    slide.classList.add(className);
    if (index === 0) {
      slide.classList.add('slider-active');
      slide.style.display = 'block';
    } else {
      slide.classList.remove('slider-active');
      slide.style.display = 'none';
    }
  });

  // Funzione per aggiornare la slide visibile
  const updateSlides = (newIndex) => {
    slides.forEach((slide, index) => {
      if (index === newIndex) {
        slide.classList.add('slider-active');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('slider-active');
        slide.style.display = 'none';
      }
    });
    currentSlide = newIndex;
  };

  // Timer di autoplay
  const autoPlayInterval = 5000;
  let autoSlideTimer;

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

  // Crea pulsante PREV
  const prevBtn = document.createElement('button');
  prevBtn.className = 'slider-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '←'; //sostituire il font qui

  prevBtn.addEventListener('click', () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides(newIndex);
    resetAutoSlideTimer();
  });

  // Crea pulsante NEXT
  const nextBtn = document.createElement('button');
  nextBtn.className = 'slider-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '→';  //sostituire il font qui

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentSlide + 1) % slides.length;
    updateSlides(newIndex);
    resetAutoSlideTimer(); //azzera il timer se clicco sulla freccia
  });

  // Nascondi le frecce se c'è solo una slide
  if (slides.length > 1) {
    block.append(prevBtn, nextBtn);
    startAutoSlide();
  }
}

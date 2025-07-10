import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.children];

  // Crea la struttura del slider
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';

  const sliderTrack = document.createElement('div');
  sliderTrack.className = 'slider-track';

  const sliderControls = document.createElement('div');
  sliderControls.className = 'slider-controls';

  // Indicatori (definiti prima per evitare no-use-before-define)
  const indicators = document.createElement('div');
  indicators.className = 'slider-indicators';

  // Logica di navigazione
  let currentSlide = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    // Rimuovi classe active da slide corrente
    sliderTrack.children[currentSlide].classList.remove('active');
    indicators.children[currentSlide].classList.remove('active');

    // Aggiorna indice
    currentSlide = index;

    // Aggiungi classe active alla nuova slide
    sliderTrack.children[currentSlide].classList.add('active');
    indicators.children[currentSlide].classList.add('active');

    // Sposta il track
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  }

  // Processa ogni slide
  slides.forEach((slide, index) => {
    const slideElement = document.createElement('div');
    slideElement.className = 'slide';
    if (index === 0) slideElement.classList.add('active');

    moveInstrumentation(slide, slideElement);

    const cells = [...slide.children];

    // Contenuto testuale (prima colonna)
    if (cells[0]) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'slide-content';

      // Estrai titolo, sottotitolo e descrizione
      const paragraphs = cells[0].querySelectorAll('p');
      if (paragraphs.length > 0) {
        const title = document.createElement('h2');
        title.className = 'slide-title';
        title.textContent = paragraphs[0].textContent;
        contentDiv.appendChild(title);
      }

      if (paragraphs.length > 1) {
        const subtitle = document.createElement('h3');
        subtitle.className = 'slide-subtitle';
        subtitle.textContent = paragraphs[1].textContent;
        contentDiv.appendChild(subtitle);
      }

      if (paragraphs.length > 2) {
        const description = document.createElement('p');
        description.className = 'slide-description';
        description.textContent = paragraphs[2].textContent;
        contentDiv.appendChild(description);
      }

      // CTA Button
      const ctaLink = cells[0].querySelector('a');
      if (ctaLink) {
        const ctaButton = document.createElement('a');
        ctaButton.className = 'slide-cta';
        ctaButton.href = ctaLink.href;
        ctaButton.textContent = ctaLink.textContent || 'Scopri di più';
        contentDiv.appendChild(ctaButton);
      }

      slideElement.appendChild(contentDiv);
    }

    // Immagine di sfondo (seconda colonna)
    if (cells[1]) {
      const img = cells[1].querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        slideElement.style.backgroundImage = `url(${img.src})`;
      }
    }

    // Griglia di icone (terza colonna se presente)
    if (cells[2]) {
      const iconsGrid = document.createElement('div');
      iconsGrid.className = 'slide-icons-grid';

      const icons = cells[2].querySelectorAll('img');
      icons.forEach((icon) => {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'icon-item';
        const optimizedIcon = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '100' }]);
        moveInstrumentation(icon, optimizedIcon.querySelector('img'));
        iconWrapper.appendChild(optimizedIcon);
        iconsGrid.appendChild(iconWrapper);
      });

      slideElement.appendChild(iconsGrid);
    }

    sliderTrack.appendChild(slideElement);
  });

  // Controlli di navigazione
  const prevButton = document.createElement('button');
  prevButton.className = 'slider-nav slider-prev';
  prevButton.innerHTML = '‹';
  prevButton.setAttribute('aria-label', 'Slide precedente');

  const nextButton = document.createElement('button');
  nextButton.className = 'slider-nav slider-next';
  nextButton.innerHTML = '›';
  nextButton.setAttribute('aria-label', 'Slide successiva');

  sliderControls.appendChild(prevButton);
  sliderControls.appendChild(nextButton);

  // Popola gli indicatori
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.className = 'slider-indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.setAttribute('aria-label', `Vai alla slide ${index + 1}`);
    indicator.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(indicator);
  });

  sliderControls.appendChild(indicators);

  // Assembla il slider
  sliderContainer.appendChild(sliderTrack);
  sliderContainer.appendChild(sliderControls);

  // Sostituisci il contenuto del blocco
  block.textContent = '';
  block.appendChild(sliderContainer);

  // Event listeners
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Auto-play (opzionale)
  let autoplayInterval;

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // 5 secondi
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Avvia autoplay
  startAutoplay();

  // Pausa autoplay al hover
  block.addEventListener('mouseenter', stopAutoplay);
  block.addEventListener('mouseleave', startAutoplay);

  // Supporto touch per mobile
  let startX = 0;
  let endX = 0;

  sliderTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sliderTrack.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // Soglia minima per lo swipe
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });
}

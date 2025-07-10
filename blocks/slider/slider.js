import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.children];

  // Se non ci sono slide, nascondi il componente
  if (slides.length === 0) {
    block.style.display = 'none';
    return;
  }

  // Crea la struttura del slider
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';

  const sliderTrack = document.createElement('div');
  sliderTrack.className = 'slider-track';

  const sliderControls = document.createElement('div');
  sliderControls.className = 'slider-controls';

  // Indicatori
  const indicators = document.createElement('div');
  indicators.className = 'slider-indicators';

  // Aggiungi questa variabile per controllare lo stato mobile
  let isMobile = window.matchMedia('(max-width: 768px)').matches;

  // --- Inizio Logica Slider Infinito ---
  let currentSlide = 1; // Inizia dalla prima vera slide (non dal clone)
  const totalSlides = slides.length;
  let isTransitioning = false;

  // Processa e aggiunge le slide al track
  slides.forEach((slide, index) => {
    const slideElement = document.createElement('div');
    slideElement.className = 'slide';
    moveInstrumentation(slide, slideElement);

    const cells = [...slide.children];
    const slideData = {
      iconLink: cells[0]?.querySelector('a')?.href || '',
      iconText: cells[0]?.querySelector('a')?.textContent?.replace(/<\/?p>/g, '') || '',
      title: cells[1]?.textContent || '',
      description: cells[2]?.textContent || '',
      ctaLink: cells[3]?.querySelector('a')?.href || '',
      ctaText: cells[4]?.textContent || '',
      backgroundImage: cells[5]?.querySelector('img'),
      blockPosition: cells[6]?.textContent?.trim() || 'left',
      blockBackgroundColor: cells[7]?.querySelector('a')?.href?.replace('#', '') || cells[7]?.textContent?.replace('#', '') || 'rgba(0, 51, 102, 0.9)',
    };

    // Imposta immagine di sfondo
    if (slideData.backgroundImage) {
      const backgroundPicture = createOptimizedPicture(
        slideData.backgroundImage.src,
        slideData.backgroundImage.alt || 'Background image',
        false,
        [{ width: '1200' }, { width: '800' }, { width: '400' }]
      );
      
      slideElement.appendChild(backgroundPicture);
    }

    // Crea blocco contenuto
    const contentBlock = document.createElement('div');
    contentBlock.className = `slide-content-block ${slideData.blockPosition}`;
    
    // Applica colore di sfondo
    if (slideData.blockBackgroundColor.startsWith('#')) {
      contentBlock.style.backgroundColor = slideData.blockBackgroundColor;
    } else if (slideData.blockBackgroundColor.startsWith('rgba')) {
      contentBlock.style.backgroundColor = slideData.blockBackgroundColor;
    } else {
      contentBlock.style.backgroundColor = `#${slideData.blockBackgroundColor}`;
    }

    // Icona
    if (slideData.iconLink) {
      const iconElement = document.createElement('div');
      iconElement.className = 'slide-icon';

      // Usa createOptimizedPicture per l'icona
      const iconPicture = createOptimizedPicture(
        slideData.iconLink,
        slideData.iconText || 'icon',
        true, // Le icone sono decorative, quindi possono essere caricate lazy
        [{ width: '50' }], // Specifica una larghezza per l'ottimizzazione
      );
      iconElement.appendChild(iconPicture);

      if (slideData.iconText) {
        const iconTextElement = document.createElement('span');
        iconTextElement.className = 'slide-icon-text';
        iconTextElement.textContent = slideData.iconText;
        iconElement.appendChild(iconTextElement);
      }

      contentBlock.appendChild(iconElement);
    }

    // Contenuto testuale
    const textContent = document.createElement('div');
    textContent.className = 'slide-text-content';

    if (slideData.title) {
      const title = document.createElement('h2');
      title.className = 'slide-title';
      title.textContent = slideData.title;
      textContent.appendChild(title);
    }

    if (slideData.description) {
      const description = document.createElement('p');
      description.className = 'slide-description';
      description.textContent = slideData.description;
      textContent.appendChild(description);
    }

    // CTA Button
    if (slideData.ctaLink && slideData.ctaText) {
      const ctaButton = document.createElement('a');
      ctaButton.className = 'slide-cta';
      ctaButton.href = slideData.ctaLink;
      ctaButton.textContent = slideData.ctaText;
      textContent.appendChild(ctaButton);
    }

    contentBlock.appendChild(textContent);
    slideElement.appendChild(contentBlock);
    sliderTrack.appendChild(slideElement);
  });

  // Clona la prima e l'ultima slide per l'effetto infinito
  if (totalSlides > 1) {
    const firstClone = sliderTrack.children[0].cloneNode(true);
    firstClone.classList.add('clone');
    sliderTrack.appendChild(firstClone);

    const lastClone = sliderTrack.children[totalSlides - 1].cloneNode(true);
    lastClone.classList.add('clone');
    sliderTrack.insertBefore(lastClone, sliderTrack.children[0]);
  }

  function updateSliderPosition(withTransition = true) {
    sliderTrack.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
    const slideWidth = sliderTrack.clientWidth;
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  function updateIndicators() {
    [...indicators.children].forEach((indicator, index) => {
      // L'indicatore attivo corrisponde alla slide reale (currentSlide - 1)
      if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = index;
    updateSliderPosition();
    updateIndicators();
  }

  function shiftSlide() {
    isTransitioning = false;
    if (currentSlide === 0) {
      currentSlide = totalSlides;
      updateSliderPosition(false);
    } else if (currentSlide === totalSlides + 1) {
      currentSlide = 1;
      updateSliderPosition(false);
    }
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide++;
    updateSliderPosition();
    updateIndicators();
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide--;
    updateSliderPosition();
    updateIndicators();
  }

  sliderTrack.addEventListener('transitionend', shiftSlide);

  // Posizionamento iniziale
  updateSliderPosition(false);

  // La logica di controllo deve funzionare sempre, ma gli elementi visivi possono essere nascosti
  if (totalSlides > 1) {
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav slider-prev';
    // Usa SVG inline per l'icona della freccia
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    prevButton.setAttribute('aria-label', 'Slide precedente');

    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav slider-next';
    // Usa SVG inline per l'icona della freccia
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
    nextButton.setAttribute('aria-label', 'Slide successiva');

    sliderControls.appendChild(prevButton);
    sliderControls.appendChild(nextButton);

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Popola gli indicatori
    slides.forEach((_, slideIndex) => {
      const indicator = document.createElement('button');
      indicator.className = 'slider-indicator';
      // L'indice per goToSlide deve essere slideIndex + 1 a causa del clone iniziale
      indicator.addEventListener('click', () => goToSlide(slideIndex + 1));
      indicators.appendChild(indicator);
    });
    updateIndicators(); // Imposta l'indicatore iniziale

    sliderControls.appendChild(indicators);

    // Auto-play
    let autoplayInterval;

    function startAutoplay() {
      // L'autoplay non dovrebbe partire su mobile se non desiderato
      if (!isMobile) {
        autoplayInterval = setInterval(nextSlide, 5000);
      }
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    startAutoplay();
    block.addEventListener('mouseenter', stopAutoplay);
    block.addEventListener('mouseleave', startAutoplay);

    // Supporto touch con scorrimento fluido
    let isDragging = false;
    let startX = 0;
    let currentTranslate = -sliderTrack.clientWidth; // Inizia dalla prima vera slide
    let prevTranslate = currentTranslate;

    sliderTrack.addEventListener('touchstart', (e) => {
      if (isTransitioning) return;
      isDragging = true;
      startX = e.touches[0].clientX;
      sliderTrack.style.transition = 'none';
      stopAutoplay();
    });

    sliderTrack.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
      }
    });

    sliderTrack.addEventListener('touchend', () => {
      if (isTransitioning) return;
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -50) {
        nextSlide();
      } else if (movedBy > 50) {
        prevSlide();
      } else {
        updateSliderPosition(); // Torna alla posizione originale
      }
      startAutoplay();
    });

    // Rimuovi la logica di animazione separata e la vecchia goToSlide
  }

  // Gestione del resize più fluida
  window.addEventListener('resize', () => {
    isMobile = window.matchMedia('(max-width: 768px)').matches;
    updateSliderPosition(false); // Aggiorna la posizione al resize
    // Applica/rimuovi classi o stili invece di ricaricare
    if (isMobile) {
      block.classList.add('slider-mobile');
    } else {
      block.classList.remove('slider-mobile');
    }
  });
  // Applica lo stato iniziale
  if (isMobile) {
    block.classList.add('slider-mobile');
  }

  // Assembla il slider
  sliderContainer.appendChild(sliderTrack);
  sliderContainer.appendChild(sliderControls);

  // Sostituisci il contenuto del blocco
  block.textContent = '';
  block.appendChild(sliderContainer);
}
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

  // Logica di navigazione
  let currentSlide = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    sliderTrack.children[currentSlide].classList.remove('active');
    if (indicators.children[currentSlide]) {
      indicators.children[currentSlide].classList.remove('active');
    }

    currentSlide = index;

    sliderTrack.children[currentSlide].classList.add('active');
    if (indicators.children[currentSlide]) {
      indicators.children[currentSlide].classList.add('active');
    }

    // Applica sempre la trasformazione
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

    // Estrai dati dalla struttura HTML
    const slideData = {
      iconLink: cells[0]?.querySelector('a')?.href || '',
      iconText: cells[0]?.querySelector('a')?.textContent?.replace(/<\/?p>/g, '') || '',
      title: cells[1]?.textContent || '',
      description: cells[2]?.textContent || '',
      ctaLink: cells[3]?.querySelector('a')?.href || '',
      ctaText: cells[4]?.textContent || '',
      backgroundImage: cells[5]?.querySelector('img'),
      blockPosition: cells[6]?.textContent?.trim() || 'left',
      blockBackgroundColor: cells[7]?.querySelector('a')?.href?.replace('#', '') || cells[7]?.textContent?.replace('#', '') || 'rgba(0, 51, 102, 0.9)'
    };

    // Imposta immagine di sfondo
    if (slideData.backgroundImage) {
      // Rimuovi questa riga:
      // slideElement.style.backgroundImage = `url(${slideData.backgroundImage.src})`;
      
      // Sostituisci con:
      const backgroundPicture = createOptimizedPicture(
        slideData.backgroundImage.src,
        slideData.backgroundImage.alt || 'Background image',
        false,
        [{ width: '1200' }, { width: '800' }, { width: '400' }]
      );
      backgroundPicture.style.position = 'absolute';
      backgroundPicture.style.inset = '0';
      backgroundPicture.style.zIndex = '0';
      backgroundPicture.style.objectFit = 'cover';
      
      const img = backgroundPicture.querySelector('img');
      if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
      }
      
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
      
      // Crea immagine ottimizzata per l'icona
      const iconImg = document.createElement('img');
      iconImg.src = slideData.iconLink;
      iconImg.alt = slideData.iconText;
      const optimizedIcon = createOptimizedPicture(slideData.iconLink, slideData.iconText, false, [{ width: '64' }]);
      iconElement.appendChild(optimizedIcon);
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

  // La logica di controllo deve funzionare sempre, ma gli elementi visivi possono essere nascosti
  if (totalSlides > 1) {
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

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Popola gli indicatori
    slides.forEach((_, slideIndex) => {
      const indicator = document.createElement('button');
      indicator.className = 'slider-indicator';
      if (slideIndex === 0) indicator.classList.add('active');
      indicator.setAttribute('aria-label', `Vai alla slide ${slideIndex + 1}`);
      indicator.addEventListener('click', () => goToSlide(slideIndex));
      indicators.appendChild(indicator);
    });

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

    // Supporto touch
    let startX = 0;
    let endX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoplay(); // Ferma l'autoplay durante l'interazione touch
    });

    sliderTrack.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay(); // Riavvia l'autoplay dopo l'interazione
    });
  }

  // Gestione del resize più fluida
  window.addEventListener('resize', () => {
    isMobile = window.matchMedia('(max-width: 768px)').matches;
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
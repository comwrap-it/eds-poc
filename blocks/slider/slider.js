import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Crea il blocco di contenuto per una singola slide leggendo i dati strutturati.
 * @param {HTMLElement} slideElement - L'elemento della slide che contiene i dati.
 * @returns {HTMLElement} - Il blocco di contenuto HTML.
 */
function createContentBlock(slideElement) {
  const contentBlock = document.createElement('div');
  contentBlock.className = 'slide-content-block';

  // Legge i dati dai div generati da Franklin/EDS basati sul JSON
  const icon = slideElement.querySelector('.icon img');
  const iconText = slideElement.querySelector('.iconText')?.textContent.trim();
  const title = slideElement.querySelector('.title')?.textContent.trim();
  const description = slideElement.querySelector('.description')?.textContent.trim();
  const ctaLink = slideElement.querySelector('.ctaLink a');
  const ctaText = slideElement.querySelector('.ctaText')?.textContent.trim();
  
  // Applica le configurazioni dal JSON (lette come data-attributes sulla slide)
  const position = slideElement.dataset.blockPosition || 'left';
  const bgColor = slideElement.dataset.blockBackgroundColor;

  contentBlock.classList.add(position);
  if (bgColor) {
    contentBlock.style.backgroundColor = bgColor;
  }

  // --- Costruisce il contenuto interno ---

  // Blocco superiore: Icona + Testo Icona
  if (icon || iconText) {
    const headerBlock = document.createElement('div');
    headerBlock.className = 'slide-content-header';
    if (icon) {
      const optimizedIcon = createOptimizedPicture(icon.src, icon.alt || 'icon', false, [{ width: '40' }]);
      headerBlock.appendChild(optimizedIcon);
    }
    if (iconText) {
      const textElem = document.createElement('span');
      textElem.className = 'slide-icon-text';
      textElem.textContent = iconText;
      headerBlock.appendChild(textElem);
    }
    contentBlock.appendChild(headerBlock);
  }

  // Titolo
  if (title) {
    const titleElem = document.createElement('h2');
    titleElem.className = 'slide-title';
    titleElem.textContent = title;
    contentBlock.appendChild(titleElem);
  }

  // Descrizione
  if (description) {
    const descElem = document.createElement('p');
    descElem.className = 'slide-description';
    descElem.textContent = description;
    contentBlock.appendChild(descElem);
  }

  // Pulsante CTA
  if (ctaLink && ctaText) {
    const ctaButton = document.createElement('a');
    ctaButton.className = 'slide-cta';
    ctaButton.href = ctaLink.href;
    ctaButton.textContent = ctaText;
    if (ctaLink.title) ctaButton.title = ctaLink.title;
    contentBlock.appendChild(ctaButton);
  }

  return contentBlock;
}

export default function decorate(block) {
  const slides = [...block.children];
  const totalSlides = slides.length;

  if (totalSlides === 0) {
    block.style.display = 'none';
    return;
  }

  block.classList.add('slider');

  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';

  const sliderTrack = document.createElement('div');
  sliderTrack.className = 'slider-track';

  slides.forEach((slide, index) => {
    moveInstrumentation(slide, slide); // Sposta l'instrumentazione sull'elemento slide
    slide.classList.add('slide');
    if (index === 0) slide.classList.add('active');

    // Imposta l'immagine di sfondo
    const bgImage = slide.querySelector('.backgroundImage img');
    if (bgImage) {
      const optimizedBg = createOptimizedPicture(bgImage.src, bgImage.alt, true, [{ width: '2000' }]);
      slide.append(optimizedBg);
    }

    // Crea e aggiunge il blocco di contenuto
    const contentBlock = createContentBlock(slide);
    
    // Pulisce il contenuto originale della slide e aggiunge solo il blocco
    const elementsToKeep = [contentBlock, slide.querySelector('picture')].filter(Boolean);
    slide.textContent = '';
    elementsToKeep.forEach(el => slide.append(el));
    
    sliderTrack.appendChild(slide);
  });

  sliderContainer.appendChild(sliderTrack);
  block.textContent = '';
  block.appendChild(sliderContainer);
  
  // --- LOGICA DI NAVIGAZIONE E CONTROLLI ---
  
  if (totalSlides <= 1) {
    block.classList.add('single-slide');
    return; // Non aggiungere controlli se c'è una sola slide
  }

  let currentSlide = 0;

  const goToSlide = (index) => {
    sliderTrack.querySelector('.slide.active')?.classList.remove('active');
    sliderTrack.children[index].classList.add('active');
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % totalSlides);
  const prevSlide = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  
  // Frecce di navigazione
  const prevButton = document.createElement('button');
  prevButton.className = 'slider-nav slider-prev';
  prevButton.setAttribute('aria-label', 'Previous Slide');
  prevButton.innerHTML = '‹';
  prevButton.addEventListener('click', prevSlide);

  const nextButton = document.createElement('button');
  nextButton.className = 'slider-nav slider-next';
  nextButton.setAttribute('aria-label', 'Next Slide');
  nextButton.innerHTML = '›';
  nextButton.addEventListener('click', nextSlide);
  
  sliderContainer.append(prevButton, nextButton);

  // Autoplay
  let autoplayInterval = setInterval(nextSlide, 5000);
  block.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  block.addEventListener('mouseleave', () => { autoplayInterval = setInterval(nextSlide, 5000); });

  // Supporto Touch
  let touchStartX = 0;
  sliderTrack.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  sliderTrack.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  });
}
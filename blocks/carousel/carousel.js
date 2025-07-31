import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const slides = children.filter((child) => child.tagName !== 'BUTTON');
  let currentSlide = 0;
  let dotsWrapper;
  let autoSlideTimer;
  const autoPlayInterval = 5000;

  slides.forEach((slide) => {
    const slideChildren = [...slide.children];
    //CREAZIONE TITOLO, PARAGRAFO E COLORI
    const primaryTitleText = slideChildren[1]?.textContent.trim();
    const primaryTitleTag = slideChildren[2]?.textContent.trim().toLowerCase();
    const primaryColor = slideChildren[3]?.textContent.trim();

    const secondaryTitleText = slideChildren[4]?.textContent.trim();
    const secondaryTitleTag = slideChildren[5]?.textContent.trim().toLowerCase();
    const secondaryColor = slideChildren[6]?.textContent.trim();

    const paragraphNode = slideChildren[7];
    const paragraphColor = slideChildren[8]?.textContent.trim();
    const boxBgColor = slideChildren[9]?.textContent.trim();

    const newPrimary = document.createElement(primaryTitleTag);
    newPrimary.textContent = primaryTitleText;
    if (primaryColor) newPrimary.style.color = primaryColor;

    const newSecondary = document.createElement(secondaryTitleTag);
    newSecondary.textContent = secondaryTitleText;
    if (secondaryColor) newSecondary.style.color = secondaryColor;

    if (paragraphNode && paragraphNode.querySelectorAll('p').length) {
      const textParagraph = paragraphNode.querySelector('p');
      if (textParagraph && paragraphColor) {
        textParagraph.style.color = paragraphColor;
      }
    }

    const newTitleWrapper1 = document.createElement('div');
    newTitleWrapper1.appendChild(newPrimary);
    const newTitleWrapper2 = document.createElement('div');
    newTitleWrapper2.appendChild(newSecondary);

    slideChildren[1]?.remove();
    slideChildren[2]?.remove();
    slideChildren[3]?.remove();
    slideChildren[4]?.remove();
    slideChildren[5]?.remove();
    slideChildren[6]?.remove();
    slideChildren[8]?.remove();
    slideChildren[9]?.remove();

    const sliderBox = document.createElement('div');
    sliderBox.className = 'slider-box';
    if (boxBgColor) {
      sliderBox.style.backgroundColor = boxBgColor;
    }

    sliderBox.appendChild(newTitleWrapper1);
    sliderBox.appendChild(newTitleWrapper2);

    if (paragraphNode) {
      sliderBox.appendChild(paragraphNode);
    }

    slide.insertBefore(sliderBox, slide.children[1]);

  });


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

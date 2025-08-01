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
      const children = [...slide.children];

      const iconPath = children[1]?.textContent.trim();
      const mainTitle = children[2];
      const secondaryBlock = children[3];
      const ctaLinkBlock = children[4];
      const ctaLabelBlock = children[5];
      const textColor = children[6]?.querySelector('a')?.textContent.trim() || '';
      const backgroundColor = children[7]?.querySelector('a')?.textContent.trim() || '';

      // Applica textColor
      if (textColor) {
        [mainTitle, secondaryBlock].forEach((block) => {
          block?.querySelectorAll('*').forEach((el) => {
            el.style.color = textColor;
          });
        });
      }

      // Sostituisci testo del link CTA
      const ctaAnchor = ctaLinkBlock?.querySelector('a');
      if (ctaAnchor && ctaLabelBlock?.textContent.trim()) {
        ctaAnchor.textContent = ctaLabelBlock.textContent.trim();
      }

      // Rimuovi i blocchi inutili
      [children[5], children[6], children[7]].forEach((block) => {
        if (block?.remove) block.remove();
      });

      // Crea sliderBox
      const sliderBox = document.createElement('div');
      sliderBox.className = 'slider-box';

      if (backgroundColor) {
        sliderBox.style.backgroundColor = backgroundColor;
      }

      // Nascondi se manca tutto il contenuto significativo
      const hasMainTitle = mainTitle?.textContent.trim().length > 0;
      const hasSecondaryContent = secondaryBlock?.textContent.trim().length > 0;

      if (!hasMainTitle && !hasSecondaryContent) {
        sliderBox.style.display = 'none';
      }

      // Inserisci blocchi dentro lo sliderBox
      [children[1], children[2], children[3], children[4]].forEach((block) => {
        if (block) sliderBox.appendChild(block);
      });

      // Inserisci sliderBox dopo l'immagine
      slide.insertBefore(sliderBox, slide.children[1]);
    });


  // ACCESSIBILITÀ
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Carosello');

  const srStatus = document.createElement('div');
  srStatus.setAttribute('id', 'carousel-status');
  srStatus.setAttribute('aria-live', 'polite');
  srStatus.setAttribute('aria-atomic', 'true');
  srStatus.className = 'visually-hidden';
  block.appendChild(srStatus);

  const updateSlides = (newIndex) => {
    slides.forEach((slide, index) => {
      const isActive = index === newIndex;
      slide.classList.toggle('slider-active', isActive);
      slide.style.display = isActive ? 'block' : 'none';
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

  // INIZIALIZZA SLIDES
  slides.forEach((slide, index) => {
    slide.classList.add('slider-class');
    slide.classList.toggle('slider-active', index === 0);
    slide.style.display = index === 0 ? 'block' : 'none';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `Slide ${index + 1} di ${slides.length}`);
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'slider-prev';
  prevBtn.setAttribute('aria-label', 'Prev Button');
  prevBtn.innerHTML = '←';
  prevBtn.addEventListener('click', () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides(newIndex);
    resetAutoSlideTimer();
  });

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

  const wrapper = block.closest('.carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;

      const activeSlide = slides[currentSlide];
      const cta = activeSlide.querySelector('.button-container a.button');

      if (cta) {
        cta.click();
      }
    });
  }
}
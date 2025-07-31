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

    const primaryTitleText = slideChildren[1]?.textContent.trim() || '';
    const primaryTitleTag = slideChildren[2]?.textContent.trim().toLowerCase() || 'h2';
    const primaryColor = slideChildren[3]?.textContent.trim() || '';

    const secondaryTitleText = slideChildren[4]?.textContent.trim() || '';
    const secondaryTitleTag = slideChildren[5]?.textContent.trim().toLowerCase() || 'h3';
    const secondaryColor = slideChildren[6]?.textContent.trim() || '';

    const paragraphNode = slideChildren[7] || document.createElement('div');
    const paragraphColor = slideChildren[8]?.textContent.trim() || '';
    const boxBgColor = slideChildren[9]?.textContent.trim() || '';

    const hasPrimaryTitle = !!primaryTitleText;
    const hasSecondaryTitle = !!secondaryTitleText;
    const hasParagraph = paragraphNode && paragraphNode.querySelector('p');

    const sliderBox = document.createElement('div');
    sliderBox.className = 'slider-box';

    if (boxBgColor) {
      sliderBox.style.backgroundColor = boxBgColor;
    }

    if (hasPrimaryTitle) {
      const newPrimary = document.createElement(primaryTitleTag);
      newPrimary.textContent = primaryTitleText;
      if (primaryColor) newPrimary.style.color = primaryColor;

      const titleWrapper = document.createElement('div');
      titleWrapper.appendChild(newPrimary);
      sliderBox.appendChild(titleWrapper);
    }

    if (hasSecondaryTitle) {
      const newSecondary = document.createElement(secondaryTitleTag);
      newSecondary.textContent = secondaryTitleText;
      if (secondaryColor) newSecondary.style.color = secondaryColor;

      const titleWrapper = document.createElement('div');
      titleWrapper.appendChild(newSecondary);
      sliderBox.appendChild(titleWrapper);
    }

    if (hasParagraph) {
      const paragraph = paragraphNode.querySelector('p');
      if (paragraphColor) paragraph.style.color = paragraphColor;
      sliderBox.appendChild(paragraphNode);
    }

    if (!hasPrimaryTitle && !hasSecondaryTitle && !hasParagraph) {
      sliderBox.style.display = 'none';
    }

    slide.insertBefore(sliderBox, slide.children[1]);

    [1, 2, 3, 4, 5, 6, 8, 9].forEach((index) => {
      if (slideChildren[index]) slideChildren[index].remove();
    });
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

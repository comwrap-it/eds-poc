import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const children = [...block.children];
    const slides = children.filter((child) => child.tagName !== 'BUTTON');
    block.querySelectorAll('img').forEach((img) => {
        img.setAttribute('loading', 'lazy');
    });
    let currentSlide = 0;
    let dotsWrapper;
    let autoSlideTimer;
    const autoPlayInterval = 5000;

    slides.forEach((slide) => {
        const slideChildren = [...slide.children];
        const boxAlign = slideChildren[1]?.textContent.trim();
        const iconPath = slideChildren[2]?.textContent.trim();
        const iconPathTag = slideChildren[2];
        const mainTitle = slideChildren[3];
        const secondaryBlock = slideChildren[4];
        const ctaLinkBlock = slideChildren[5];
        const ctaLabelBlock = slideChildren[6];
        const textColor = slideChildren[7]?.textContent.trim() || '#000000';
        const backgroundColor = slideChildren[8]?.textContent.trim() || '#ffffff';


        const hasMainTitle = mainTitle?.textContent.trim().length > 0;
        const hasSecondaryContent = secondaryBlock?.textContent.trim().length > 0;

        const shouldHideSliderBox = (
            (!hasMainTitle && !hasSecondaryContent) ||
            boxAlign === 'slider-box-d-none'
        );

        if (shouldHideSliderBox) {
            [...slide.children].forEach((child, index) => {
                if (index > 0) child.remove();
            });
            return;
        }

        const applyClassesAndStyles = () => {
          const applyClassToAllElements = (container, selector, className) => {
            container?.querySelectorAll(selector).forEach((el) => {
              el.classList.add(className);
            });
          };

          applyClassToAllElements(mainTitle, '*', 'custom-title-small');
          applyClassToAllElements(secondaryBlock, 'h1, h2, h3, h4, h5, h6', 'custom-title-large');

          if (textColor) {
            [mainTitle, secondaryBlock, iconPathTag].forEach((block) => {
              block?.querySelectorAll('*').forEach((el) => {
                el.style.color = textColor;
              });
            });
          }
        };

        applyClassesAndStyles();

        if (textColor) {
            [mainTitle, secondaryBlock].forEach((block) => {
                block?.querySelectorAll('*').forEach((el) => {
                    el.style.color = textColor;
                });
            });
        }

        const ctaAnchor = ctaLinkBlock?.querySelector('a');
        ctaLinkBlock.classList.add("slider-box-cta-cont");
        if (ctaAnchor && ctaLabelBlock?.textContent.trim()) {
            ctaAnchor.textContent = ctaLabelBlock.textContent.trim();
        }

        [slideChildren[1], slideChildren[6], slideChildren[7], slideChildren[8]].forEach((slide) => {
            if (slide?.remove) slide.remove();
        });

        const sliderBox = document.createElement('div');
        sliderBox.className = 'slider-box';
        if (boxAlign) sliderBox.classList.add(boxAlign);
        if (backgroundColor) sliderBox.style.backgroundColor = backgroundColor;

        const sliderBoxInner = document.createElement('div');

        if (iconPath && slideChildren[2] && slideChildren[3]) {
          const iconTitleCont = document.createElement('div');
          iconTitleCont.className = 'iconTitle-cont';

          iconTitleCont.appendChild(slideChildren[2]);
          iconTitleCont.appendChild(slideChildren[3]);

          sliderBoxInner.appendChild(iconTitleCont);
        } else {
          if (slideChildren[3]) sliderBoxInner.appendChild(slideChildren[3]);
        }

        if (slideChildren[4]) sliderBoxInner.appendChild(slideChildren[4]);
        if (slideChildren[5]) sliderBoxInner.appendChild(slideChildren[5]);

        sliderBox.appendChild(sliderBoxInner);

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
            const cta = activeSlide.querySelector('.button-container a.button, .slider-box .slider-box-cta-cont a');

            if (cta) {
                cta.click();
            }
        });
    }
}
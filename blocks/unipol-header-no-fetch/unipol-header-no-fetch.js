import { getDamImageUrl } from '../../config/dev-config.js';
import { HEADER_CONFIG } from './unipol-header.config.js';
import { initPopup } from './unipol-header.popup.js';

function createLinkItem(imgSrc, imgAlt, linkHref, linkText, ariaLabel) {
  const container = document.createElement('div');
  container.classList.add('link-item');

  const img = document.createElement('img');
  img.src = getDamImageUrl(imgSrc);
  img.alt = imgAlt;
  img.loading = 'lazy';
  img.width = 24;
  img.height = 24;

  const link = document.createElement('a');
  link.href = linkHref;
  link.textContent = linkText;
  link.setAttribute('aria-label', ariaLabel);

  container.append(img, link);
  return container;
}

function createHamburger() {
  const btn = document.createElement('button');
  btn.classList.add('hamburger-btn');
  btn.setAttribute('aria-label', 'Apri menu di navigazione');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-menu');
  btn.innerHTML = '&#9776;';
  return btn;
}

function createPlaceholderList() {
  const ul = document.createElement('ul');
  ul.classList.add('bottom-page-list', 'loading-placeholder');
  
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const placeholder = document.createElement('div');
    placeholder.classList.add('nav-placeholder');
    placeholder.style.cssText = `
      height: 20px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
      width: ${60 + Math.random() * 40}px;
    `;
    li.appendChild(placeholder);
    ul.appendChild(li);
  }
  
  return ul;
}

function populateNavigationList(ul, data) {
  ul.innerHTML = '';
  ul.classList.remove('loading-placeholder');
  
  data.children.forEach((c, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = c.path.replace('/content/eds-poc', '');

    if (index === 0) {
      a.classList.add('first-headet-bottom-link');

      if (HEADER_CONFIG.firstListItemIcon?.src) {
        const img = document.createElement('img');
        img.src = getDamImageUrl(HEADER_CONFIG.firstListItemIcon.src);
        img.alt = HEADER_CONFIG.firstListItemIcon.alt || '';
        img.width = 24;
        img.height = 24;
        img.classList.add('desktop-only-icon');
        img.loading = 'lazy';
        a.appendChild(img);
      }

      const span = document.createElement('span');
      span.textContent = c.title;
      a.appendChild(span);
    } else {
      a.appendChild(document.createTextNode(c.title));
    }

    li.appendChild(a);
    ul.appendChild(li);
  });
}

function buildMobileMenu(headerTopRight, headerBottomList) {
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.classList.add('mobile-menu');
  mobileMenu.setAttribute('role', 'dialog');
  mobileMenu.setAttribute('aria-modal', 'true');
  mobileMenu.setAttribute('aria-labelledby', 'mobile-menu-title');
  mobileMenu.style.display = 'none';

  const hiddenTitle = document.createElement('h2');
  hiddenTitle.id = 'mobile-menu-title';
  hiddenTitle.textContent = 'Menu di navigazione';
  hiddenTitle.classList.add('sr-only');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('mobile-menu-header');

  if (HEADER_CONFIG.hambUserArea) {
    const specialLinkEl = document.createElement('a');
    specialLinkEl.href = HEADER_CONFIG.hambUserArea.href;
    specialLinkEl.setAttribute('aria-label', HEADER_CONFIG.hambUserArea.aria);
    specialLinkEl.classList.add('mobile-special-link');

    const img = document.createElement('img');
    img.src = getDamImageUrl(HEADER_CONFIG.hambUserArea.imgSrc);
    img.alt = HEADER_CONFIG.hambUserArea.imgAlt || '';
    img.width = 24;
    img.height = 24;
    img.loading = 'lazy';

    const textNode = document.createTextNode(HEADER_CONFIG.hambUserArea.text);
    specialLinkEl.append(img, textNode);
    headerContainer.appendChild(specialLinkEl);
  }

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('mobile-menu-close');
  closeBtn.setAttribute('aria-label', 'Chiudi menu di navigazione');

  const closeImg = document.createElement('img');
  closeImg.src = getDamImageUrl(HEADER_CONFIG.closeIcon.src);
  closeImg.alt = HEADER_CONFIG.closeIcon.alt;
  closeImg.width = 24;
  closeImg.height = 24;

  closeBtn.appendChild(closeImg);

  closeBtn.addEventListener('click', () => {
    const overlay = document.getElementById('mobile-menu-overlay');
    if (overlay) overlay.remove();
    mobileMenu.style.display = 'none';
    document.querySelector('.hamburger-btn')?.setAttribute('aria-expanded', 'false');
    document.querySelector('.hamburger-btn')?.focus();
  });

  headerContainer.appendChild(closeBtn);

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('mobile-menu-search');

  const searchConfig = HEADER_CONFIG.bottomRightButtons?.find(btn => btn.type === 'search');

  const searchLabel = document.createElement('label');
  searchLabel.setAttribute('for', 'mobile-search-input');
  searchLabel.textContent = 'Cerca nel sito:';
  searchLabel.classList.add('sr-only');

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('search-wrapper');

  if (searchConfig) {
    const searchIcon = document.createElement('img');
    searchIcon.src = getDamImageUrl(searchConfig.imgSrc);
    searchIcon.alt = searchConfig.imgAlt || '';
    searchIcon.width = 20;
    searchIcon.height = 20;
    searchIcon.loading = 'lazy';
    searchIcon.classList.add('search-icon');
    searchWrapper.appendChild(searchIcon);
  }

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.id = 'mobile-search-input';
  searchInput.name = 'search';
  searchInput.placeholder = 'Cerca';
  searchInput.autocomplete = 'off';
  searchInput.setAttribute('aria-label', 'Campo di ricerca del sito');
  searchInput.setAttribute('aria-describedby', 'search-description');
  searchInput.setAttribute('role', 'searchbox');
  
  const searchDescription = document.createElement('span');
  searchDescription.id = 'search-description';
  searchDescription.textContent = 'Inserisci i termini di ricerca e premi invio';
  searchDescription.classList.add('sr-only');
  
  searchWrapper.appendChild(searchInput);
  searchContainer.append(searchLabel, searchDescription, searchWrapper);

  const clonedTopRight = headerTopRight.cloneNode(true);
  const clonedBottomList = headerBottomList.cloneNode(true);

  const mobileIcons = HEADER_CONFIG.mobileMenuItemIcons || [];

  clonedBottomList.querySelectorAll('li').forEach((li, index) => {
    if (index < mobileIcons.length && mobileIcons[index]?.src) {
      const iconConf = mobileIcons[index];
      const img = document.createElement('img');
      img.src = getDamImageUrl(iconConf.src);
      img.alt = iconConf.alt || '';
      img.loading = 'lazy';
      img.width = 24;
      img.height = 24;
      const link = li.querySelector('a');
      if (link) {
        link.insertBefore(img, link.firstChild);
      } else {
        li.insertBefore(img, li.firstChild);
      }
    }

    const arrowSpan = document.createElement('span');
    arrowSpan.textContent = '>';
    arrowSpan.classList.add('mobile-menu-arrow');
    const link = li.querySelector('a') || li;
    link.appendChild(arrowSpan);
  });

  clonedBottomList.classList.add('mobile-menu-list');
  clonedTopRight.classList.remove('header-top-right');
  clonedTopRight.classList.add('mobile-menu-section');
  clonedBottomList.classList.remove('bottom-page-list');
  clonedBottomList.classList.add('mobile-menu-section');

  const possibleOverlay = clonedTopRight.querySelector('.popup-overlay');
  if (possibleOverlay) possibleOverlay.remove();

  const clonedTrigger = clonedTopRight.querySelector('.popup-trigger');
  if (clonedTrigger) {
    const overlayId = `popup-dialog-mobile-${Math.random().toString(36).slice(2,6)}`;
    const clonedOverlay = initPopup(HEADER_CONFIG.popup, clonedTrigger, overlayId);
    clonedTopRight.appendChild(clonedOverlay);
  }

  mobileMenu.append(hiddenTitle, headerContainer, searchContainer, clonedBottomList, clonedTopRight);
  return mobileMenu;
}

function setupMobileMenu(headerBottomCont, headerTopRight, headerBottomList) {
  const hamburger = createHamburger();
  const mobileMenu = buildMobileMenu(headerTopRight, headerBottomList);

  const wrapper = headerBottomCont.querySelector('.header-bottom-right-wrapper');
  wrapper.appendChild(hamburger);
  headerBottomCont.appendChild(mobileMenu);

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.style.display = 'flex';

    let overlay = document.createElement('div');
    overlay.id = 'mobile-menu-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = 999;
    document.body.appendChild(overlay);
    mobileMenu.style.zIndex = 1000;
    const firstFocusable = mobileMenu.querySelector('a, button');
    firstFocusable?.focus();
    overlay.addEventListener('click', closeMenu);
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.style.display = 'none';
    const overlay = document.getElementById('mobile-menu-overlay');
    if (overlay) overlay.remove();
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.style.display !== 'none') {
      closeMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      mobileMenu.style.display !== 'none' &&
      !mobileMenu.contains(e.target) &&
      e.target !== hamburger
    ) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
}

export default async function decorate(block) {
  // ✅ PULISCI IL BLOCK E IMPOSTA LA CLASSE
  block.innerHTML = '';
  block.className = 'unipol-header block';
  
  // ✅ CREA LA STRUTTURA DELL'HEADER NEL BLOCK
  
  // === HEADER TOP ===
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');

  const left = document.createElement('div');
  left.classList.add('header-top-left');

  const path = window.location.pathname;
  const isAziende = /^\/aziende(?:\/|$)/i.test(path);
  const activeIndex = isAziende ? 1 : 0;

  HEADER_CONFIG.topLeftLinks.forEach((l, index) => {
    const wrapper = document.createElement('div');
    const a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.text;
    a.setAttribute('aria-label', l.aria);

    if (index === activeIndex) {
      wrapper.classList.add('active-top-link');
    }

    wrapper.appendChild(a);
    left.appendChild(wrapper);
  });

  const right = document.createElement('div');
  right.classList.add('header-top-right');
  HEADER_CONFIG.topRightLinks.forEach(l =>
    right.appendChild(createLinkItem(l.img, l.alt, l.href, l.text, l.aria))
  );

  // LOGO + POPUP
  const selectContainer = document.createElement('div');
  selectContainer.classList.add('popup-trigger-container');

  const logoImg = document.createElement('img');
  logoImg.src = getDamImageUrl(HEADER_CONFIG.popup.logo);
  logoImg.alt = 'Logo-UnipolSai';
  logoImg.loading = 'lazy';
  logoImg.width = 58;

  const popupTrigger = document.createElement('button');
  popupTrigger.classList.add('popup-trigger');
  popupTrigger.setAttribute('aria-label', 'Apri menu selezione sito Gruppo Unipol');
  
  const parts = HEADER_CONFIG.popup.triggerText.split('⌵');
  const labelText = parts[0].trim();
  const textNode = document.createTextNode(labelText);
  const arrowSpan = document.createElement('span');
  arrowSpan.classList.add('popup-arrow');
  arrowSpan.textContent = '⌵';
  popupTrigger.append(textNode, arrowSpan);

  const popupOverlay = initPopup(HEADER_CONFIG.popup, popupTrigger);
  selectContainer.append(logoImg, popupTrigger, popupOverlay);
  right.appendChild(selectContainer);
  headerTop.append(left, right);

  // === HEADER BOTTOM ===
  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');

  const headerBottomCont = document.createElement('div');
  headerBottomCont.classList.add('header-bottom-cont');

  // Container 1: logo + lista PLACEHOLDER
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('header-bottom-left');

  if (HEADER_CONFIG.bottomImageLogo) {
    const imgLink = document.createElement('a');
    imgLink.href = HEADER_CONFIG.bottomImageLogo.href;
    imgLink.setAttribute('aria-label', HEADER_CONFIG.bottomImageLogo.aria);

    const imgEl = document.createElement('img');
    imgEl.src = getDamImageUrl(HEADER_CONFIG.bottomImageLogo.src);
    imgEl.alt = HEADER_CONFIG.bottomImageLogo.alt;
    imgEl.width = HEADER_CONFIG.bottomImageLogo.width || 24;
    imgEl.height = HEADER_CONFIG.bottomImageLogo.height || 24;
    imgEl.loading = 'lazy';

    imgLink.appendChild(imgEl);
    leftContainer.appendChild(imgLink);
  }

  // ✅ CREA PLACEHOLDER INVECE DI ATTENDERE I DATI
  const ul = createPlaceholderList();
  leftContainer.appendChild(ul);

  // Container 2: search + carrello + area riservata
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('header-bottom-right');

  const iconsContainer = document.createElement('div');
  iconsContainer.classList.add('header-bottom-icons');

  let customButton = null;
  HEADER_CONFIG.bottomRightButtons.forEach(btn => {
    if (btn.type === 'custom') {
      const link = document.createElement('a');
      link.href = btn.href;
      link.setAttribute('aria-label', btn.aria);
      link.classList.add('custom-bottom-btn');

      const img = document.createElement('img');
      img.src = getDamImageUrl(btn.imgSrc);
      img.alt = btn.imgAlt;
      img.loading = 'lazy';
      img.width = 32;
      img.height = 32;

      link.appendChild(img);
      if (btn.text) {
        const span = document.createElement('span');
        span.textContent = btn.text;
        link.appendChild(span);
      }
      customButton = link;
    } else {
      const link = document.createElement('a');
      link.href = btn.href || '#';
      link.setAttribute('aria-label', btn.aria);
      link.classList.add(`${btn.type}-btn`);

      const img = document.createElement('img');
      img.src = getDamImageUrl(btn.imgSrc);
      img.alt = btn.imgAlt || '';
      img.loading = 'lazy';
      img.width = 40;
      img.height = 40;

      link.appendChild(img);

      if (btn.type === 'search' || btn.type === 'cart') {
        iconsContainer.appendChild(link);
      }
    }
  });

  rightContainer.appendChild(iconsContainer);
  if (customButton) {
    rightContainer.appendChild(customButton);
  }

  const rightHamburgerWrapper = document.createElement('div');
  rightHamburgerWrapper.classList.add('header-bottom-right-wrapper');
  rightHamburgerWrapper.appendChild(rightContainer);

  headerBottomCont.append(leftContainer, rightHamburgerWrapper);
  headerBottom.appendChild(headerBottomCont);

  // ✅ AGGIUNGI TUTTO AL BLOCK INVECE CHE ALL'HEADER ESISTENTE
  block.append(headerTop, headerBottom);

  // ✅ SOSTITUISCI IL CONTENUTO DELL'HEADER ESISTENTE CON IL BLOCK
  const headerEl = document.querySelector('header.header-wrapper');
  if (headerEl) {
    // Preserva eventuali attributi dell'header esistente
    const existingClasses = headerEl.className;
    headerEl.innerHTML = '';
    headerEl.appendChild(block);
    // Mantieni le classi esistenti se necessario
    if (existingClasses && !existingClasses.includes('header-wrapper')) {
      headerEl.className = `${existingClasses} header-wrapper`;
    }
  }
  // Setup responsive behavior
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024 && !document.querySelector('.hamburger-btn')) {
      setupMobileMenu(headerBottomCont, right, ul);
    } else if (window.innerWidth > 1024) {
      const hamburger = document.querySelector('.hamburger-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      if (hamburger) hamburger.remove();
      if (mobileMenu) mobileMenu.remove();
    }
  });
}

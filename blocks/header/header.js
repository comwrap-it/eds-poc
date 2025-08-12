import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { getGraphQLEndpoint, getAuthHeader, DEV_CONFIG } from '../../config/dev-config.js';
import { HEADER_CONFIG } from './header.config.js';
import { initPopup } from './header.popup.js';

async function fetchHeaderData() {
  const endpoint = getGraphQLEndpoint('/bin/pub/retrieveStructure.json?rootPath=/content/unipol/us/en');
  const headers = { 'Content-Type': 'application/json' };
  if (DEV_CONFIG.isLocalDevelopment) headers['Authorization'] = getAuthHeader();

  const res = await fetch(endpoint, { headers });
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return await res.json();
}

function createLinkItem(imgSrc, imgAlt, linkHref, linkText, ariaLabel) {
  const container = document.createElement('div');
  container.classList.add('link-item');

  const img = document.createElement('img');
  img.src = imgSrc;
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

function buildMobileMenu(headerTopRight, headerBottomList) {
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.classList.add('mobile-menu');
  mobileMenu.setAttribute('role', 'dialog');
  mobileMenu.setAttribute('aria-modal', 'true');
  mobileMenu.setAttribute('aria-labelledby', 'mobile-menu-title');
  mobileMenu.style.display = 'none';

  // Titolo nascosto per aria-labelledby
  const hiddenTitle = document.createElement('h2');
  hiddenTitle.id = 'mobile-menu-title';
  hiddenTitle.textContent = 'Menu di navigazione';
  hiddenTitle.classList.add('sr-only');

  // Pulsante di chiusura
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('mobile-menu-close');
  closeBtn.setAttribute('aria-label', 'Chiudi menu di navigazione');
  closeBtn.innerHTML = '&times;';

  closeBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    document.querySelector('.hamburger-btn')?.setAttribute('aria-expanded', 'false');
    document.querySelector('.hamburger-btn')?.focus();
  });

  // Cloni i nodi
  const clonedTopRight = headerTopRight.cloneNode(true);
  const clonedBottomList = headerBottomList.cloneNode(true);
  clonedBottomList.classList.add('mobile-menu-list');

  // Rimuovi classi desktop che nascondono elementi e aggiungi classi mobile
  clonedTopRight.classList.remove('header-top-right');
  clonedTopRight.classList.add('mobile-menu-section');
  clonedBottomList.classList.remove('bottom-page-list');
  clonedBottomList.classList.add('mobile-menu-section');

  // RIMUOVI eventuali overlay clonati (se presenti)
  const possibleOverlay = clonedTopRight.querySelector('.popup-overlay');
  if (possibleOverlay) possibleOverlay.remove();

  //INIZIALIZZA un nuovo popup
  const clonedTrigger = clonedTopRight.querySelector('.popup-trigger');
  if (clonedTrigger) {
    const overlayId = `popup-dialog-mobile-${Math.random().toString(36).slice(2,6)}`;
    const clonedOverlay = initPopup(HEADER_CONFIG.popup, clonedTrigger, overlayId);
    clonedTopRight.appendChild(clonedOverlay);
  }

  // Appendi tutto
  mobileMenu.append(hiddenTitle, closeBtn, clonedBottomList, clonedTopRight);
  return mobileMenu;
}

function setupMobileMenu(headerBottomCont, headerTopRight, headerBottomList) {
  const hamburger = createHamburger();
  const mobileMenu = buildMobileMenu(headerTopRight, headerBottomList);

  headerBottomCont.append(hamburger, mobileMenu);

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.style.display = 'flex';
    const firstFocusable = mobileMenu.querySelector('a, button');
    firstFocusable?.focus();
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.style.display = 'none';
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

  // Chiudi con Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.style.display !== 'none') {
      closeMenu();
    }
  });

  // Chiudi cliccando fuori
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


async function buildHeader() {
  const headerEl = document.querySelector('header.header-wrapper');
  if (!headerEl) return;

  const data = await fetchHeaderData();
  if (!data?.children) return;

  // === HEADER TOP ===
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');

  const left = document.createElement('div');
  left.classList.add('header-top-left');
  HEADER_CONFIG.leftLinks.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.text;
    a.setAttribute('aria-label', l.aria);
    left.appendChild(a);
  });

  const right = document.createElement('div');
  right.classList.add('header-top-right');
  HEADER_CONFIG.rightLinks.forEach(l =>
    right.appendChild(createLinkItem(l.img, l.alt, l.href, l.text, l.aria))
  );

  // LOGO + POPUP
  const selectContainer = document.createElement('div');
  selectContainer.classList.add('popup-trigger-container');

  const logoImg = document.createElement('img');
  logoImg.src = HEADER_CONFIG.popup.logo;
  logoImg.alt = 'Logo-UnipolSai';
  logoImg.loading = 'lazy';
  logoImg.width = 58;

  const popupTrigger = document.createElement('button');
  popupTrigger.classList.add('popup-trigger');
  popupTrigger.textContent = HEADER_CONFIG.popup.triggerText;

  const popupOverlay = initPopup(HEADER_CONFIG.popup, popupTrigger);

  selectContainer.append(logoImg, popupTrigger, popupOverlay);
  right.appendChild(selectContainer);

  headerTop.append(left, right);

  // === HEADER BOTTOM ===
  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');

  // container interno principale
  const headerBottomCont = document.createElement('div');
  headerBottomCont.classList.add('header-bottom-cont');

  // Container 1: logo + lista
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('header-bottom-left');

    // IMMAGINE LOGO UNIPOL
    if (HEADER_CONFIG.bottomImage) {
      const imgLink = document.createElement('a');
      imgLink.href = HEADER_CONFIG.bottomImage.href;
      imgLink.setAttribute('aria-label', HEADER_CONFIG.bottomImage.aria);

      const imgEl = document.createElement('img');
      imgEl.src = HEADER_CONFIG.bottomImage.src;
      imgEl.alt = HEADER_CONFIG.bottomImage.alt;
      imgEl.width = HEADER_CONFIG.bottomImage.width || 24;
      imgEl.height = HEADER_CONFIG.bottomImage.height || 24;
      imgEl.loading = 'lazy';

      imgLink.appendChild(imgEl);
      leftContainer.appendChild(imgLink);
    }

    // LISTA
    const ul = document.createElement('ul');
    ul.classList.add('bottom-page-list');

    data.children.forEach(c => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = c.path;
      a.textContent = c.title;
      li.appendChild(a);
      ul.appendChild(li);
    });

    leftContainer.appendChild(ul);

    // Container 2: search + carrello + area riservata
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('header-bottom-right');

    // Contenitore solo per le icone
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('header-bottom-icons');

    let customButton = null;

    HEADER_CONFIG.bottomRightButtons.forEach(btn => {
      if (btn.type === 'custom') {
        // Pulsante con immagine + testo (link)
        const link = document.createElement('a');
        link.href = btn.href;
        link.setAttribute('aria-label', btn.aria);
        link.classList.add('custom-bottom-btn');

        const img = document.createElement('img');
        img.src = btn.imgSrc;
        img.alt = btn.imgAlt;
        img.loading = 'lazy';
        img.width = 24;
        img.height = 24;

        link.appendChild(img);
        if (btn.text) {
          const span = document.createElement('span');
          span.textContent = btn.text;
          link.appendChild(span);
        }
        customButton = link;
      }
      else {
        // Pulsante con immagine
        const link = document.createElement('a');
        link.href = btn.href || '#';
        link.setAttribute('aria-label', btn.aria);
        link.classList.add(`${btn.type}-btn`);

        const img = document.createElement('img');
        img.src = btn.imgSrc;
        img.alt = btn.imgAlt || '';
        img.loading = 'lazy';
        img.width = 24;
        img.height = 24;

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

    headerBottomCont.append(leftContainer, rightContainer);
    headerBottom.appendChild(headerBottomCont);


  const fragment = document.createDocumentFragment();
  fragment.append(headerTop, headerBottom);
  headerEl.replaceChildren(fragment);

  // Setup mobile menu solo sotto i 1024px
  if (window.innerWidth <= 1024) {
    setupMobileMenu(headerBottomCont, right, ul);
  }

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

buildHeader();


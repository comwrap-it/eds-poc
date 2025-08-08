import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { DEV_CONFIG, getAuthHeader, getGraphQLEndpoint } from '../../config/dev-config.js';

async function fetchHeaderElm() {
  try {
    const retrieveStructureEndpoint = getGraphQLEndpoint('/bin/pub/retrieveStructure.json?rootPath=/content/unipol/us/en');

    const headers = {
      'Content-Type': 'application/json'
    };

    if (DEV_CONFIG.isLocalDevelopment) {
      headers['Authorization'] = getAuthHeader();
    }

    const response = await fetch(retrieveStructureEndpoint, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format: not a valid JSON object');
    }

    console.log('Fetched data:', data);

    return data;

  } catch (error) {
    console.error('Err:', error);
    return [];
  }
}

async function buildMenu() {

  const data = await fetchHeaderElm();

  if (!data.children || !Array.isArray(data.children)) {
    console.warn('Nessun elemento children trovato');
    return;
  }
  const header = document.querySelector('header.header-wrapper');

  if (!header) {
    console.error('Header non trovato nella pagina');
    return;
  }

  // Pulizia e struttura
  header.innerHTML = '';

  // HEADER TOP
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');

  // Container sinistra
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('header-top-left');

  const leftLink1 = document.createElement('a');
  leftLink1.href = '#'; //DA CAMBIARE
  leftLink1.textContent = 'PRIVATI';
  leftLink1.setAttribute('aria-label', 'Privati');

  const leftLink2 = document.createElement('a');
  leftLink2.href = '#'; //DA CAMBIARE
  leftLink2.textContent = 'AZIENDE';
  leftLink2.setAttribute('aria-label', 'Aziende');


  leftContainer.appendChild(leftLink1);
  leftContainer.appendChild(leftLink2);

  // CONTAINER HEADET TOP DX
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('header-top-right');

  // Primo link item
  const linkItem1 = document.createElement('div');
  linkItem1.classList.add('link-item');

  const linkImg1 = document.createElement('img');
  linkImg1.src = '/content/dam/unipoleds/b_trova_agenzia.svg'; //DA CAMBAIRE
  linkImg1.alt = 'Icona Link 1';
  linkImg1.loading = 'lazy';
  linkImg1.width = 24;
  linkImg1.height = 24;

  const rightLink1 = document.createElement('a');
  rightLink1.href = '#'; //DA CAMBIARE
  rightLink1.textContent = 'Trova Agenzia';
  rightLink1.setAttribute('aria-label', 'Trova Agenzia');


  linkItem1.appendChild(linkImg1);
  linkItem1.appendChild(rightLink1);

  // Secondo link item
  const linkItem2 = document.createElement('div');
  linkItem2.classList.add('link-item');

  const linkImg2 = document.createElement('img');
  linkImg2.src = '/content/dam/unipoleds/b_servizio_clienti.svg'; //DA CAMBAIRE
  linkImg2.alt = 'Icona Link 2';
  linkImg2.loading = 'lazy';
  linkImg2.width = 24;
  linkImg2.height = 24;

  const rightLink2 = document.createElement('a');
  rightLink2.href = '#'; //DA CAMBIARE
  rightLink2.textContent = 'Assistenza e sinistri';
  rightLink2.setAttribute('aria-label', 'Assistenza e sinistri');


  linkItem2.appendChild(linkImg2);
  linkItem2.appendChild(rightLink2);

  const selectContainer = document.createElement('div');
  selectContainer.classList.add('popup-trigger-container');

  // POP UP TRIGGER
  const popupTrigger = document.createElement('button');
  popupTrigger.classList.add('popup-trigger');
  popupTrigger.textContent = 'Unipol Sito Cliente ˅'; // DA CAMBIARE L'ICONA DELLA FRECCIA
  popupTrigger.setAttribute('aria-haspopup', 'dialog');
  popupTrigger.setAttribute('aria-controls', 'popup-dialog');

  // === POPUP ===
  const popupOverlay = document.createElement('div');
  popupOverlay.classList.add('popup-overlay');
  popupOverlay.id = 'popup-dialog';
  popupOverlay.setAttribute('role', 'dialog');
  popupOverlay.setAttribute('aria-modal', 'true');
  popupOverlay.setAttribute('aria-labelledby', 'popup-title');
  popupOverlay.style.display = 'none';

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Unipol Sito Cliente';
  cancelBtn.classList.add('popup-cancel');
  cancelBtn.setAttribute('tabindex', '-1');


  const confirmBtn = document.createElement('a');
  confirmBtn.href = '#'; //DA CAMBIARE
  confirmBtn.textContent = 'Gruppo Unipol';
  confirmBtn.setAttribute('aria-label', 'Gruppo Unipol');
  confirmBtn.setAttribute('target', '_blanck');
  confirmBtn.setAttribute('tabindex', '-1');

  popupContent.appendChild(cancelBtn);
  popupContent.appendChild(confirmBtn);
  popupOverlay.appendChild(popupContent);

  selectContainer.appendChild(popupOverlay);

  // Immagine Logo
  const logoImg = document.createElement('img');
  logoImg.src = '/content/dam/unipoleds/LogoGruppoUnipolSai.png';
  logoImg.alt = 'Logo-UnipolSai'; //DA CAMBAIRE
  logoImg.loading = 'lazy';
  logoImg.width = 58;

  selectContainer.appendChild(logoImg);
  selectContainer.appendChild(popupTrigger);

  // Assembla la parte destra
  rightContainer.appendChild(linkItem1);
  rightContainer.appendChild(linkItem2);
  rightContainer.appendChild(selectContainer);

  // Aggiunge i due container al headerTop
  headerTop.appendChild(leftContainer);
  headerTop.appendChild(rightContainer);

  //LISTENER E ACCESSIBILITA POP UP
  popupTrigger.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
    cancelBtn.setAttribute('tabindex', '0');
    confirmBtn.setAttribute('tabindex', '0');
    cancelBtn.focus();
  });
  cancelBtn.addEventListener('click', () => {

    popupOverlay.style.display = 'none';
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popupOverlay.style.display === 'flex') {
      popupOverlay.style.display = 'none';
      popupTrigger.focus();
      cancelBtn.setAttribute('tabindex', '-1');
      confirmBtn.setAttribute('tabindex', '-1');
    }
  });
  document.addEventListener('click', (event) => {
    const isClickInsidePopup = popupOverlay.contains(event.target);
    const isClickOnTrigger = popupTrigger.contains(event.target);

    if (!isClickInsidePopup && !isClickOnTrigger && popupOverlay.style.display === 'flex') {
      popupOverlay.style.display = 'none';
      cancelBtn.setAttribute('tabindex', '-1');
      confirmBtn.setAttribute('tabindex', '-1');
    }
  });
  document.addEventListener('focusin', (event) => {
    const isPopupOpen = popupOverlay.style.display === 'flex';
    if (isPopupOpen && !popupOverlay.contains(event.target)) {
      popupOverlay.style.display = 'none';
      popupTrigger.focus();
      cancelBtn.setAttribute('tabindex', '-1');
      confirmBtn.setAttribute('tabindex', '-1');
    }
  });

  // HEADER BOTTOM
  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');

  const ul = document.createElement('ul');

  data.children.forEach(child => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = child.path;
    a.textContent = child.title;
    li.appendChild(a);
    ul.appendChild(li);
  });

  headerBottom.appendChild(ul);

  // Aggiunge le due sezioni all'header
  header.appendChild(headerTop);
  header.appendChild(headerBottom);
}

buildMenu();






/*
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}


 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed

function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}


 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
*/


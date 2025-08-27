
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Estrai i contenuti dai figli del blocco
  const general = children[0];
  const labels = children[1];
  const icons = children[2];
  const unipolLogo = general.querySelectorAll('picture')[0];

  // Estrai le label
  const label_privati = labels.querySelectorAll('p')[0]?.innerHTML || 'PRIVATI';
  const label_aziende = labels.querySelectorAll('p')[1]?.innerHTML || 'AZIENDE';
  const label_findAgency = labels.querySelectorAll('p')[2]?.innerHTML || 'Trova Agenzia';
  const label_assistance = labels.querySelectorAll('p')[3]?.innerHTML || 'Assistenza e sinistri';
  const label_private = labels.querySelectorAll('p')[4]?.innerHTML || 'Area riservata';
  const label_sitoCliente = labels.querySelectorAll('p')[5]?.innerHTML || 'Unipol Sito Cliente';
  const label_groupUnipol = labels.querySelectorAll('p')[6]?.innerHTML || 'Gruppo Unipol';

  // Estrai le icone (pictures)
  const icon_privateArea = icons.querySelectorAll('picture')[0];
  const icon_chart = icons.querySelectorAll('picture')[1];
  const icon_Search = icons.querySelectorAll('picture')[2];
  const icon_findAgency = icons.querySelectorAll('picture')[3];
  const icon_assistance = icons.querySelectorAll('picture')[4];
  const icon_siteClient = icons.querySelectorAll('picture')[5];
  const icon_close = icons.querySelectorAll('picture')[6];

  // Pulisci il blocco
  block.innerHTML = '';

  // Crea header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  // === HEADER TOP ===
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');

  // Header top left
  const headerTopLeft = document.createElement('div');
  headerTopLeft.classList.add('header-top-left');
  
  // Privati - div con link interno
  const privatiDiv = document.createElement('div');
  privatiDiv.classList.add('tab-item', 'active');
  const privatiLink = document.createElement('a');
  privatiLink.href = '#';
  privatiLink.textContent = label_privati;
  privatiDiv.appendChild(privatiLink);
  
  // Aziende - div con link interno
  const aziendeDiv = document.createElement('div');
  aziendeDiv.classList.add('tab-item');
  const aziendeLink = document.createElement('a');
  aziendeLink.href = '#';
  aziendeLink.textContent = label_aziende;
  aziendeDiv.appendChild(aziendeLink);
  
  headerTopLeft.appendChild(privatiDiv);
  headerTopLeft.appendChild(aziendeDiv);

  // Header top right
  const headerTopRight = document.createElement('div');
  headerTopRight.classList.add('header-top-right');
  
  // Trova Agenzia
  const findAgencyLink = document.createElement('a');
  findAgencyLink.href = '#';
  findAgencyLink.classList.add('top-link');
  if (icon_findAgency) {
    const img = icon_findAgency.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    findAgencyLink.appendChild(optimizedPic);
  }
  findAgencyLink.appendChild(document.createTextNode(label_findAgency));
  
  // Assistenza
  const assistanceLink = document.createElement('a');
  assistanceLink.href = '#';
  assistanceLink.classList.add('top-link');
  if (icon_assistance) {
    const img = icon_assistance.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    assistanceLink.appendChild(optimizedPic);
  }
  assistanceLink.appendChild(document.createTextNode(label_assistance));
  
  // Unipol Sito Cliente (aggiunto)
  const sitoClienteLink = document.createElement('a');
  sitoClienteLink.href = '#';
  sitoClienteLink.classList.add('top-link');
  sitoClienteLink.classList.add('client-site');
  if (icon_siteClient) {
    const img = icon_siteClient.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    sitoClienteLink.appendChild(optimizedPic);
  }
  sitoClienteLink.appendChild(document.createTextNode(label_sitoCliente));
  
  headerTopRight.appendChild(findAgencyLink);
  headerTopRight.appendChild(assistanceLink);
  headerTopRight.appendChild(sitoClienteLink); // Aggiunto
  headerTopRight.appendChild(sitoClienteLink);

  headerTop.appendChild(headerTopLeft);
  headerTop.appendChild(headerTopRight);

  // === HEADER BOTTOM ===
  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');

  // Logo
  const logoContainer = document.createElement('div');
  logoContainer.classList.add('logo-container');
  if (unipolLogo) {
    const img = unipolLogo.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoContainer.appendChild(optimizedPic);
  }

  // Navigation menu (placeholder per ora)
  const navMenu = document.createElement('nav');
  navMenu.classList.add('main-navigation');

  // Right actions
  const rightActions = document.createElement('div');
  rightActions.classList.add('right-actions');
  
  // Search button
  const searchBtn = document.createElement('button');
  searchBtn.classList.add('action-button', 'search-button');
  searchBtn.setAttribute('aria-label', 'Cerca');
  if (icon_Search) {
    const img = icon_Search.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    searchBtn.appendChild(optimizedPic);
  }
  
  // Cart button
  const cartBtn = document.createElement('button');
  cartBtn.classList.add('action-button', 'cart-button');
  cartBtn.setAttribute('aria-label', 'Carrello');
  if (icon_chart) {
    const img = icon_chart.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    cartBtn.appendChild(optimizedPic);
  }
  
  // User button
  // User area - cambiato da button a div cliccabile
  const userArea = document.createElement('div');
  userArea.classList.add('action-button', 'user-button');
  userArea.setAttribute('tabindex', '0');
  userArea.setAttribute('aria-label', 'Area Riservata');
  
  // Container per icona e testo
  const userContent = document.createElement('div');
  userContent.classList.add('user-button-content');
  
  if (icon_privateArea) {
    const img = icon_privateArea.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    userContent.appendChild(optimizedPic);
  }
  
  // Label a destra dell'icona
  const userLabel = document.createElement('span');
  userLabel.classList.add('user-label');
  userLabel.textContent = label_private;
  userContent.appendChild(userLabel);
  
  userArea.appendChild(userContent);
  
  // Mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.classList.add('mobile-menu-button');
  mobileMenuBtn.setAttribute('aria-label', 'Menu');
  mobileMenuBtn.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  `;
  
  rightActions.appendChild(searchBtn);
  rightActions.appendChild(cartBtn);
  rightActions.appendChild(userArea);  // Cambiato da userBtn a userArea
  rightActions.appendChild(mobileMenuBtn);

  headerBottom.appendChild(logoContainer);
  headerBottom.appendChild(navMenu);
  headerBottom.appendChild(rightActions);

  // === MOBILE TOAST ===
  const mobileToast = document.createElement('div');
  mobileToast.classList.add('mobile-toast');
  mobileToast.setAttribute('aria-hidden', 'true');
  
  // Toast header
  const toastHeader = document.createElement('div');
  toastHeader.classList.add('toast-header');
  
  const toastTitle = document.createElement('div');
  toastTitle.classList.add('toast-title');
  if (icon_privateArea) {
    const img = icon_privateArea.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    toastTitle.appendChild(optimizedPic);
  }
  toastTitle.appendChild(document.createTextNode(label_private));
  
  // Cambiato da button a div con X di chiusura
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('toast-close');
  closeBtn.setAttribute('aria-label', 'Chiudi');
  closeBtn.setAttribute('role', 'button');
  closeBtn.setAttribute('tabindex', '0');
  
  // Aggiungi X di chiusura
  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '×';
  closeIcon.classList.add('close-icon');
  closeBtn.appendChild(closeIcon);
  
  toastHeader.appendChild(toastTitle);
  toastHeader.appendChild(closeBtn);
  
  // Search bar
  const searchBar = document.createElement('div');
  searchBar.classList.add('toast-search');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Cerca';
  searchInput.classList.add('search-input');
  const searchIcon = document.createElement('button');
  searchIcon.classList.add('search-icon');
  if (icon_Search) {
    const img = icon_Search.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    searchIcon.appendChild(optimizedPic);
  }
  searchBar.appendChild(searchInput);
  searchBar.appendChild(searchIcon);
  
  // Toast navigation
  const toastNav = document.createElement('nav');
  toastNav.classList.add('toast-navigation');
  toastNav.innerHTML = `
    <div class="nav-section">
      <div class="nav-item">
        <span class="nav-text">Cos'è Unica Unipol</span>
        <span class="nav-arrow">›</span>
      </div>
      <div class="nav-item">
        <span class="nav-text">Veicoli e Mobilità</span>
        <span class="nav-arrow">›</span>
      </div>
      <div class="nav-item">
        <span class="nav-text">Casa e Famiglia</span>
        <span class="nav-arrow">›</span>
      </div>
      <div class="nav-item">
        <span class="nav-text">Persona</span>
        <span class="nav-arrow">›</span>
      </div>
      <div class="nav-item">
        <span class="nav-text">Risparmio e Previdenza</span>
        <span class="nav-arrow">›</span>
      </div>
    </div>
    <div class="nav-footer">
      <a href="#" class="footer-link">Accedi da App</a>
      <a href="#" class="footer-link">Trova Agenzia</a>
    </div>
  `;
  
  mobileToast.appendChild(toastHeader);
  mobileToast.appendChild(searchBar);
  mobileToast.appendChild(toastNav);

  // Assembla l'header
  headerContainer.appendChild(headerTop);
  headerContainer.appendChild(headerBottom);
  headerContainer.appendChild(mobileToast);
  
  // Aggiungi al blocco
  block.appendChild(headerContainer);

  // === EVENT LISTENERS ===
  
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileToast.classList.toggle('open');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open');
    mobileToast.setAttribute('aria-hidden', mobileToast.classList.contains('open') ? 'false' : 'true');
  });
  
  // Close toast
  closeBtn.addEventListener('click', () => {
    mobileToast.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    mobileToast.setAttribute('aria-hidden', 'true');
  });
  
  // Close toast on outside click
  document.addEventListener('click', (e) => {
    if (!mobileToast.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileToast.classList.contains('open')) {
      mobileToast.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
      mobileToast.setAttribute('aria-hidden', 'true');
    }
  });

  // Accessibilità
  block.setAttribute('role', 'banner');
  block.setAttribute('aria-label', 'Header principale');

  // Strumentazione generale
  moveInstrumentation(block);
}

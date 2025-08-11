import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
// blocks/header/header.js
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

async function buildHeader() {
  const headerEl = document.querySelector('header.header-wrapper');
  if (!headerEl) return;

  const data = await fetchHeaderData();
  if (!data?.children) return;

  const fragment = document.createDocumentFragment();

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

  const ul = document.createElement('ul');

  data.children.forEach(c => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = c.path;
    a.textContent = c.title;
    li.appendChild(a);
    ul.appendChild(li);
  });

  headerBottom.appendChild(ul);

  fragment.append(headerTop, headerBottom);
  headerEl.replaceChildren(fragment);
}

buildHeader();


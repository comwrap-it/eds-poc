import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { DEV_CONFIG, getAuthHeader, getGraphQLEndpoint } from '../../config/dev-config.js';

function buildCard(item) {
  const { title, _path, image } = item;

  const card = document.createElement('article');
  card.className = 'plus-card';

  const link = document.createElement('a');
  link.href = _path;
  link.setAttribute('aria-label', title);
  link.className = 'plus-card-link';

  const imagePath = image?._path || image?._publishUrl || image?._authorUrl;

  const picture = createOptimizedPicture(
    imagePath,
    title,
    false,
    [{ width: 400 }, { width: 768 }, { width: 1200 }],
    DEV_CONFIG
  );
  picture.className = 'plus-card-picture';

  const caption = document.createElement('h3');
  caption.className = 'plus-card-title';
  caption.textContent = title;

  const cta = document.createElement('span');
  cta.className = 'plus-card-cta';
  cta.textContent = 'Leggi di più';

  link.append(picture, caption, cta);
  card.append(link);
  return card;
}

export default async function decorate(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children.length === 2) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
      const value = row.children[1].textContent.trim();
      config[key] = value;
    }
  });

  const sectionBg = config.background || '#e6f4ff';
  const logoUrl = config.logourl || 'https://www.unipol.it/wcm/myconnect/574a7c8c-07f0-495a-a4b0-bfa94825a5ff/Logo+Plus.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE-574a7c8c-07f0-495a-a4b0-bfa94825a5ff-p6T7rWh';
  const logoAlt = config.logoalt || 'Logo Plus';
  const tagline = config.tagline || 'più informati, più sereni';
  const moreButtonText = config.morebuttontext || 'Leggi di più';

  try {
    // Usa la configurazione centralizzata
    const graphqlEndpoint = getGraphQLEndpoint('/graphql/execute.json/unipol/articleCardList');
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    // Aggiungi autenticazione solo in sviluppo locale
    if (DEV_CONFIG.isLocalDevelopment) {
      headers['Authorization'] = getAuthHeader();
    }

    const response = await fetch(graphqlEndpoint, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.data?.articleCardList?.items || [];

    block.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'plus-wrapper';
    wrapper.style.backgroundColor = sectionBg;

    const head = document.createElement('div');
    head.className = 'plus-head';

    const title = document.createElement('div');
    title.className = 'title';

    const logoLink = document.createElement('a');
    logoLink.setAttribute('data-disabled', 'false');
    logoLink.setAttribute('aria-label', 'Unipol Plus');
    logoLink.href = '/plus';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'plus-image-container';

    const logo = document.createElement('img');
    logo.className = 'plus-logo';
    logo.src = logoUrl;
    logo.alt = logoAlt;
    logo.title = logoAlt;
    logo.loading = 'lazy';

    const textDiv = document.createElement('div');
    textDiv.className = 'text';

    const taglineDiv = document.createElement('div');
    taglineDiv.className = 'plus-tagline';
    taglineDiv.textContent = tagline;

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'plus-cards';

    const footer = document.createElement('div');
    footer.className = 'plus-footer';

    const moreButton = document.createElement('a');
    moreButton.className = 'plus-more button primary-cta';
    moreButton.href = '#';
    moreButton.textContent = moreButtonText;

    // Costruisci la struttura
    imageContainer.appendChild(logo);
    logoLink.appendChild(imageContainer);
    textDiv.appendChild(taglineDiv);
    title.appendChild(logoLink);
    title.appendChild(textDiv);
    head.appendChild(title);
    footer.appendChild(moreButton);
    wrapper.appendChild(head);
    wrapper.appendChild(cardsContainer);
    wrapper.appendChild(footer);
    block.appendChild(wrapper);

    // Aggiungi le card degli articoli
    articles.slice(0, 3).forEach((item) => {
      const card = buildCard(item);
      cardsContainer.appendChild(card);
    });

    moveInstrumentation(block, block);
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Lista articoli Plus');

  } catch (error) {
    console.error('Errore nel caricamento degli articoli:', error);
    
    // Fallback con dati di esempio per sviluppo locale
    block.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'plus-wrapper';
    wrapper.style.backgroundColor = sectionBg;

    const head = document.createElement('div');
    head.className = 'plus-head';

    const title = document.createElement('div');
    title.className = 'title';

    const logoLink = document.createElement('a');
    logoLink.setAttribute('data-disabled', 'false');
    logoLink.setAttribute('aria-label', 'Unipol Plus');
    logoLink.href = '/plus';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'plus-image-container';

    const logo = document.createElement('img');
    logo.className = 'plus-logo';
    logo.src = logoUrl;
    logo.alt = logoAlt;
    logo.title = logoAlt;
    logo.loading = 'lazy';

    const textDiv = document.createElement('div');
    textDiv.className = 'text';

    const taglineDiv = document.createElement('div');
    taglineDiv.className = 'plus-tagline';
    taglineDiv.textContent = tagline;

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'plus-cards';

    const footer = document.createElement('div');
    footer.className = 'plus-footer';

    const moreButton = document.createElement('a');
    moreButton.className = 'plus-more button primary-cta';
    moreButton.href = '#';
    moreButton.textContent = moreButtonText;

    // Costruisci la struttura
    imageContainer.appendChild(logo);
    logoLink.appendChild(imageContainer);
    textDiv.appendChild(taglineDiv);
    title.appendChild(logoLink);
    title.appendChild(textDiv);
    head.appendChild(title);
    footer.appendChild(moreButton);
    wrapper.appendChild(head);
    wrapper.appendChild(cardsContainer);
    wrapper.appendChild(footer);
    block.appendChild(wrapper);

    // Dati di esempio per fallback
    const sampleArticles = [
      {
        _path: '/content/articles/article1',
        title: 'Primo Articolo di Esempio',
        image: {
          _publishUrl: 'https://via.placeholder.com/400x300/0066cc/ffffff?text=Article+1',
          _authorUrl: 'https://via.placeholder.com/400x300/0066cc/ffffff?text=Article+1'
        }
      },
      {
        _path: '/content/articles/article2',
        title: 'Secondo Articolo di Esempio',
        image: {
          _publishUrl: 'https://via.placeholder.com/400x300/cc6600/ffffff?text=Article+2',
          _authorUrl: 'https://via.placeholder.com/400x300/cc6600/ffffff?text=Article+2'
        }
      },
      {
        _path: '/content/articles/article3',
        title: 'Terzo Articolo di Esempio',
        image: {
          _publishUrl: 'https://via.placeholder.com/400x300/009900/ffffff?text=Article+3',
          _authorUrl: 'https://via.placeholder.com/400x300/009900/ffffff?text=Article+3'
        }
      }
    ];

    // Aggiungi le card di fallback
    sampleArticles.forEach((item) => {
      const card = buildCard(item);
      cardsContainer.appendChild(card);
    });

    moveInstrumentation(block, block);
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Lista articoli Plus');

    console.log('ℹ️ Usando dati di esempio (sviluppo locale)');
  }

  return block;
}

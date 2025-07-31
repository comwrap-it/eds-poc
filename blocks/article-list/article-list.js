/* eslint-disable no-underscore-dangle */
import { moveInstrumentation } from '../../scripts/scripts.js';
import {
  readBlockConfig,
  createOptimizedPicture, /* helper EDS per immagini responsive */
} from '../../scripts/aem.js';
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

  /* immagine ottimizzata EDS (lazy + srcset) */
  const picture = createOptimizedPicture(
    imagePath,
    title,
    false,
    [{ width: 400 }, { width: 768 }, { width: 1200 }],
    DEV_CONFIG,
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

/**
 * Fetches GraphQL data from AEM using centralized configuration
 * Uses the same approach as accordion-list component
 */
async function fetchArticlesFromAEM() {
  try {
    const graphqlEndpoint = getGraphQLEndpoint('/graphql/execute.json/unipol/articleCardList');

    if (!graphqlEndpoint) {
      return null;
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (DEV_CONFIG.isLocalDevelopment) {
      const authHeader = getAuthHeader();
      if (authHeader) {
        headers.Authorization = authHeader;
      }
    }

    const response = await fetch(graphqlEndpoint, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (!data || !data.data) {
      return null;
    }

    return data.data?.articleCardList?.items || [];
  } catch (error) {
    return null;
  }
}

export default async function decorate(block) {
  /* Config letta da righe del blocco */
  const cfg = readBlockConfig(block);
  const sectionBg = cfg.background || '#e6f4ff';
  const logoUrl = cfg.logoUrl || 'https://www.unipol.it/wcm/myconnect/574a7c8c-07f0-495a-a4b0-bfa94825a5ff/Logo+Plus.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE-574a7c8c-07f0-495a-a4b0-bfa94825a5ff-p6T7rWh';
  const logoAlt = cfg.logoAlt || 'Logo Plus';
  const tagline = cfg.tagline || 'più informati, più sereni';
  const moreButtonText = cfg.moreButtonText || 'Leggi di più';

  /* inizializza UI vuota per prevenire CLS */
  block.innerHTML = `
    <div class="plus-wrapper" style="background:${sectionBg}" data-aue-prop="background" data-aue-type="text">
      <div class="plus-head">
        <div class="title">
          <a data-disabled="false" aria-label="Unipol Plus" href="/plus">
            <div class="plus-image-container">
              <img class="plus-logo" src="${logoUrl}" alt="${logoAlt}" title="${logoAlt}" loading="lazy" data-aue-prop="logoUrl" data-aue-type="text">
            </div>
          </a>
          <div class="text">
            <div class="plus-tagline" data-aue-prop="tagline" data-aue-type="text">${tagline}</div>
          </div>
        </div>
      </div>
      <div class="plus-cards"></div>
      <div class="plus-footer"><a class="plus-more button primary-cta" href="#" data-aue-prop="moreButtonText" data-aue-type="text">${moreButtonText}</a></div>
    </div>`;

  const cardsContainer = block.querySelector('.plus-cards');

  /* Prova a ottenere dati reali da AEM usando la configurazione centralizzata */
  let articles = null;
  try {
    articles = await fetchArticlesFromAEM();
  } catch (error) {
    articles = null;
  }

  if (articles && articles.length > 0) {
    /* Usa dati reali da AEM */
    articles.slice(0, 3).forEach((item) => {
      if (item) {
        try {
          const card = buildCard(item);
          if (card) {
            cardsContainer.appendChild(card);
          }
        } catch (error) {
          // Ignora errori nella creazione delle singole card
        }
      }
    });

    console.log('✅ Dati caricati da AEM');
  } else {
    /* Fallback con dati di esempio per sviluppo locale */
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
        },
      },
      {
        _path: '/content/articles/article3',
        title: 'Terzo Articolo di Esempio',
        image: {
          _publishUrl: 'https://via.placeholder.com/400x300/009900/ffffff?text=Article+3',
          _authorUrl: 'https://via.placeholder.com/400x300/009900/ffffff?text=Article+3'
        },
      },
    ];

    sampleArticles.forEach((item) => {
      try {
        const card = buildCard(item);
        if (card) {
          cardsContainer.appendChild(card);
        }
      } catch (error) {
        // Ignora errori nella creazione delle card di fallback
      }
    });

    console.log('ℹ️ Usando dati di esempio (sviluppo locale)');
  }

  /* instrumentation per Universal Editor e analytics */
  moveInstrumentation(block, block);
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Lista articoli Plus');
}

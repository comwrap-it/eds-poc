/* eslint-disable no-underscore-dangle */
import { moveInstrumentation } from '../../scripts/scripts.js';
import {
  readBlockConfig,
  createOptimizedPicture,        /* helper EDS per immagini responsive */
} from '../../scripts/aem.js';

function buildCard(item) {
  const { title, _path, image } = item;

  const card = document.createElement('article');
  card.className = 'plus-card';

  const link = document.createElement('a');
  link.href = _path;
  link.setAttribute('aria-label', title);
  link.className = 'plus-card-link';

  /* immagine ottimizzata EDS (lazy + srcset) */
  const picture = createOptimizedPicture(
    image?._publishUrl || image?._authorUrl,
    title,
    false,
    [{ width: 400 }, { width: 768 }, { width: 1200 }],
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
 * Fetches GraphQL data from AEM using XWalk server-side integration
 * This bypasses CORS issues by having AEM serve the data directly
 */
async function fetchArticlesFromAEM(endpoint, query) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4=' // admin:admin in base64
      },
      body: JSON.stringify({
        query: query,
        operationName: 'allArticles'
      })
    });
     
    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data?.articleCardList?.items || [];
  } catch (error) {
    console.warn('GraphQL fetch failed (CORS or network error):', error.message);
    return null;
  }
}

export default async function decorate(block) {
  /* Config letta da righe del blocco (supporta XWalk) */
  const cfg = readBlockConfig(block);
  const sectionBg = cfg.background || '#e6f4ff';
  const graphqlEndpoint = cfg.graphqlEndpoint || '/content/cq:graphql/unipol/endpoint.json';
  const graphqlQuery = cfg.graphqlQuery || `query allArticles {
    articleCardList {
      items {
        _path
        title
        image {
          ... on ImageRef {
            _path
            _publishUrl
            _authorUrl
            width
            height
          }
        }
      }
    }
  }`;

  /* inizializza UI vuota per prevenire CLS */
  block.innerHTML = `
    <div class="plus-wrapper" style="background:${sectionBg}">
      <header class="plus-head">
        <img class="plus-logo" src="https://www.unipol.it/wcm/myconnect/574a7c8c-07f0-495a-a4b0-bfa94825a5ff/Logo+Plus.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE-574a7c8c-07f0-495a-a4b0-bfa94825a5ff-p6T7rWh" alt="Plus+">
        <p class="plus-tagline">più informati, più sereni</p>
      </header>
      <div class="plus-cards"></div>
      <div class="plus-footer"><a class="plus-more" href="#">Leggi di più</a></div>
    </div>`;

  const cardsContainer = block.querySelector('.plus-cards');

  /* Prova prima a ottenere dati reali tramite XWalk */
  let articles = null;
  
  // Try to fetch from AEM GraphQL endpoint (works with XWalk or direct AEM access)
  // For localhost development, we'll try the configured endpoint
  const fullEndpoint = graphqlEndpoint.startsWith('http') 
    ? graphqlEndpoint 
    : `http://localhost:4502${graphqlEndpoint}`;
  
  articles = await fetchArticlesFromAEM(fullEndpoint, graphqlQuery);
  console.log('🔍 Tentativo di connessione a:', fullEndpoint);

  if (articles && articles.length > 0) {
    /* Usa dati reali da AEM */
    articles.slice(0, 3).forEach((item) => {
      const card = buildCard(item);
      cardsContainer.appendChild(card);
    });
    
    console.log('✅ Dati caricati da AEM tramite XWalk');
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
    
    sampleArticles.forEach((item) => {
      const card = buildCard(item);
      cardsContainer.appendChild(card);
    });
    
    console.log('ℹ️ Usando dati di esempio (sviluppo locale)');
  }

  /* instrumentation per Universal Editor e analytics */
  moveInstrumentation(block, block);
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Lista articoli Plus');
}

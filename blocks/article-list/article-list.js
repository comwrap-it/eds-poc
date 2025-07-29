/* eslint-disable no-underscore-dangle */
import { moveInstrumentation } from '../../scripts/scripts.js';
import {
  readBlockConfig,
  createOptimizedPicture,        /* helper EDS per immagini responsive[7] */
} from '../../scripts/lib-franklin.js';

const GRAPHQL_ENDPOINT = '/content/cq:graphql/unipol/endpoint.json';
const GRAPHQL_QUERY = `
  query allArticles {
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

export default async function decorate(block) {
  /* Config opzionale letta da righe del blocco */
  const cfg = readBlockConfig(block);
  const sectionBg = cfg.background || '#e6f4ff';

  /* inizializza UI vuota per prevenire CLS */
  block.innerHTML = `
    <div class="plus-wrapper" style="background:${sectionBg}">
      <header class="plus-head">
        <img class="plus-logo" src="/blocks/plus-cardlist/plus-logo.svg" alt="Plus+">
        <p class="plus-tagline">più informati, più sereni</p>
      </header>
      <div class="plus-cards"></div>
      <div class="plus-footer"><a class="plus-more" href="#">Leggi di più</a></div>
    </div>`;

  const cardsContainer = block.querySelector('.plus-cards');

  /* fetch GraphQL */
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GRAPHQL_QUERY }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const items = payload?.data?.articleCardList?.items || [];

    if (items.length === 0) {
      cardsContainer.textContent = 'Nessun articolo disponibile.';
      return;
    }

    /* monta le card */
    items.slice(0, 3).forEach((it) => cardsContainer.append(buildCard(it)));

    /* instrumentation per Universal Editor e analytics */
    moveInstrumentation(block, block);
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Lista articoli Plus');
  } catch (e) {
    // fallback UI
    cardsContainer.innerHTML = '<p class="plus-error">Errore nel caricamento dei contenuti.</p>';
    /* eslint-disable-next-line no-console */
    console.error('Plus Card List error:', e);
  }
}

import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { DEV_CONFIG, getAuthHeader, getGraphQLEndpoint } from '../../config/dev-config.js';

function buildCard(item) {
  // Validazione sicura dei dati
  if (!item || typeof item !== 'object') {
    console.warn('Invalid item data received for card building');
    return null;
  }

  const { title, _path, image } = item;
  
  // Validazione dei campi obbligatori
  if (!title || !_path) {
    console.warn('Missing required fields (title or _path) for card building');
    return null;
  }

  const card = document.createElement('article');
  card.className = 'plus-card';

  const link = document.createElement('a');
  link.href = _path;
  link.setAttribute('aria-label', title);
  link.className = 'plus-card-link';

  // Gestione sicura dell'immagine con fallback
  let imagePath = null;
  if (image && typeof image === 'object') {
    imagePath = image._path || image._publishUrl || image._authorUrl;
  }

  // Crea immagine solo se esiste un percorso valido
  let picture = null;
  if (imagePath) {
    try {
      picture = createOptimizedPicture(
        imagePath,
        title,
        false,
        [{ width: 400 }, { width: 768 }, { width: 1200 }],
        DEV_CONFIG
      );
      picture.className = 'plus-card-picture';
    } catch (error) {
      console.warn('Failed to create optimized picture:', error);
      // Continua senza immagine invece di fallire completamente
    }
  }

  const caption = document.createElement('h3');
  caption.className = 'plus-card-title';
  caption.textContent = title;

  const cta = document.createElement('span');
  cta.className = 'plus-card-cta';
  cta.textContent = 'Leggi di più';

  // Aggiungi solo gli elementi che esistono
  if (picture) {
    link.appendChild(picture);
  }
  link.appendChild(caption);
  link.appendChild(cta);
  card.appendChild(link);
  
  return card;
}

function createUIStructure(config, children) {
  const { sectionBg, logoUrl, logoAlt, tagline, moreButtonText } = config;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'plus-wrapper';
  wrapper.style.backgroundColor = sectionBg;
  wrapper.setAttribute('data-aue-label', 'Background');
  wrapper.setAttribute('data-aue-type', 'text');
  // Trasferisci strumentazione dal primo child (background) se esiste
  if (children[0]) {
    moveInstrumentation(children[0], wrapper);
  }

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
  logo.setAttribute('data-aue-label', 'Logo');
  logo.setAttribute('data-aue-type', 'media');
  // Trasferisci strumentazione dal secondo child (logoUrl) se esiste
  if (children[1]) {
    moveInstrumentation(children[1], logo);
  }

  const textDiv = document.createElement('div');
  textDiv.className = 'text';

  const taglineDiv = document.createElement('div');
  taglineDiv.className = 'plus-tagline';
  taglineDiv.textContent = tagline;
  taglineDiv.setAttribute('data-aue-label', 'Tagline');
  taglineDiv.setAttribute('data-aue-type', 'text');
  // Trasferisci strumentazione dal quarto child (tagline) se esiste
  if (children[3]) {
    moveInstrumentation(children[3], taglineDiv);
  }

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'plus-cards';

  const footer = document.createElement('div');
  footer.className = 'plus-footer';

  const moreButton = document.createElement('a');
  moreButton.className = 'plus-more button primary-cta';
  moreButton.href = '#';
  moreButton.textContent = moreButtonText;
  moreButton.setAttribute('data-aue-label', 'More Button Text');
  moreButton.setAttribute('data-aue-type', 'text');
  // Trasferisci strumentazione dal quinto child (moreButtonText) se esiste
  if (children[4]) {
    moveInstrumentation(children[4], moreButton);
  }

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

  return { wrapper, cardsContainer };
}

async function fetchArticles() {
  try {
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

    // Gestione più rigorosa degli errori HTTP
    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Validazione della struttura della risposta
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format: not a valid JSON object');
    }

    // Validazione più approfondita della struttura GraphQL
    if (!data.data) {
      console.warn('GraphQL response missing data field');
      return [];
    }

    if (!data.data.articleCardList) {
      console.warn('GraphQL response missing articleCardList field');
      return [];
    }

    const articles = data.data.articleCardList.items;
    
    // Validazione degli articoli
    if (!Array.isArray(articles)) {
      console.warn('ArticleCardList items is not an array');
      return [];
    }

    return articles;

  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Ritorna array vuoto invece di lanciare l'errore
  }
}

export default async function decorate(block) {
  // Estrai i contenuti dai figli per l'editabilità
  const children = [...block.children];
  
  // Estrazione configurazione
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children.length === 2) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
      const value = row.children[1].textContent.trim();
      config[key] = value;
    }
  });

  // Configurazione con valori di default
  const componentConfig = {
    sectionBg: config.background || '#e6f4ff',
    logoUrl: config.logourl || 'https://www.unipol.it/wcm/myconnect/574a7c8c-07f0-495a-a4b0-bfa94825a5ff/Logo+Plus.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE-574a7c8c-07f0-495a-a4b0-bfa94825a5ff-p6T7rWh',
    logoAlt: config.logoalt || 'Logo Plus',
    tagline: config.tagline || 'più informati, più sereni',
    moreButtonText: config.morebuttontext || 'Leggi di più'
  };

  // Pulisci il contenuto del blocco
  block.innerHTML = '';

  // Crea la struttura UI una sola volta
  const { wrapper, cardsContainer } = createUIStructure(componentConfig, children);
  block.appendChild(wrapper);

  // Fetch degli articoli
  const articles = await fetchArticles();

  // Se non ci sono articoli, mostra solo la struttura base senza carte
  if (articles.length === 0) {
    console.info('No articles available, displaying component without cards');
    
    // Aggiungi un messaggio informativo opzionale (può essere rimosso se non desiderato)
    const noContentMessage = document.createElement('div');
    noContentMessage.className = 'plus-no-content';
    noContentMessage.textContent = 'Contenuti in arrivo...';
    noContentMessage.style.display = 'none'; // Nascosto di default, rimuovi se vuoi mostrarlo
    cardsContainer.appendChild(noContentMessage);
  } else {
    // Aggiungi le card degli articoli (massimo 3)
    articles.slice(0, 3).forEach((item) => {
      const card = buildCard(item);
      if (card) { // Aggiungi solo le card valide
        cardsContainer.appendChild(card);
      }
    });

    console.info(`Successfully loaded ${Math.min(articles.length, 3)} article cards`);
  }

  // Aggiungi attributi di accessibilità
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Lista articoli Plus');
  
  // Strumentazione generale per l'editabilità
  moveInstrumentation(block);

  return block;
}

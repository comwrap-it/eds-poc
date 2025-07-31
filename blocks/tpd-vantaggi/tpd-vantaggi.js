/* eslint-disable no-underscore-dangle */
import { moveInstrumentation } from '../../scripts/scripts.js';
import {
  readBlockConfig,
  createOptimizedPicture,
} from '../../scripts/aem.js';

/**
 * Crea una singola tile di vantaggio
 */
function buildVantaggioTile(item) {
  const { title, description, icon, linkUrl, linkText } = item;

  const tile = document.createElement('div');
  tile.className = 'tpd-vantaggi-tile';

  // Icona del vantaggio
  if (icon?._publishUrl || icon?._authorUrl) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tpd-vantaggi-icon';
    
    const picture = createOptimizedPicture(
      icon._publishUrl || icon._authorUrl,
      title,
      false,
      [{ width: 80 }, { width: 120 }],
    );
    iconContainer.append(picture);
    tile.append(iconContainer);
  }

  // Contenuto testuale
  const content = document.createElement('div');
  content.className = 'tpd-vantaggi-content';

  const titleElement = document.createElement('h3');
  titleElement.className = 'tpd-vantaggi-title';
  titleElement.textContent = title;
  content.append(titleElement);

  if (description) {
    const descElement = document.createElement('p');
    descElement.className = 'tpd-vantaggi-description';
    descElement.textContent = description;
    content.append(descElement);
  }

  // Link se presente
  if (linkUrl && linkText) {
    const link = document.createElement('a');
    link.href = linkUrl;
    link.className = 'tpd-vantaggi-link';
    link.textContent = linkText;
    link.setAttribute('aria-label', `${linkText} - ${title}`);
    content.append(link);
  }

  tile.append(content);
  return tile;
}

/**
 * Recupera i vantaggi da GraphQL
 */
async function fetchVantaggiFromAEM(endpoint, query) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4=' // admin:admin in base64
      },
      body: JSON.stringify({
        query: query,
        operationName: 'allVantaggi'
      })
    });
     
    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data?.vantaggiList?.items || [];
  } catch (error) {
    console.warn('GraphQL fetch failed (CORS or network error):', error.message);
    return null;
  }
}

/**
 * Dati di fallback per i vantaggi
 */
function getFallbackVantaggi() {
  return [
    {
      title: 'Flessibilità',
      description: 'Puoi scegliere tra diverse opzioni tariffarie e forme di garanzia personalizzabili.',
      linkUrl: '#',
      linkText: 'Scopri di più'
    },
    {
      title: 'Unibox',
      description: 'La gamma di dispositivi satellitari e telematici per avere protezione negli spostamenti e sconti sulla polizza.',
      linkUrl: '#',
      linkText: 'Scopri di più'
    },
    {
      title: 'App Unipol',
      description: 'Acquista gestisci la polizza, apri i sinistri, chiama il carro attrezzi (con garanzia Assistenza Stradale).',
      linkUrl: '#',
      linkText: 'Scopri di più'
    },
    {
      title: 'Assistenza Stradale',
      description: 'Con questa garanzia ti aiutiamo H24 in caso di incidente, guasto, foratura, esaurimento carburante o batteria scarica.',
      linkUrl: '#',
      linkText: 'Scopri di più'
    },
    {
      title: 'Riparazione diretta',
      description: 'Riparazioni rapide e affidabili con franchigia minima o nulla presso centri convenzionati.',
      linkUrl: '#',
      linkText: 'Scopri di più'
    },
    {
      title: 'Paga in 12 mesi',
      description: 'Togli ogni pensiero, paga la tua polizza un po\' alla volta, in 12 mesi.',
      linkUrl: '#',
      linkText: 'Scopri di più'
    }
  ];
}

export default async function decorate(block) {
  // Leggi configurazione dal blocco
  const cfg = readBlockConfig(block);
  const sectionTitle = cfg.title || 'Vantaggi';
  const sectionBg = cfg.background || '#f8f9fa';
  const graphqlEndpoint = cfg.graphqlEndpoint || '/content/cq:graphql/unipol/endpoint.json';
  const graphqlQuery = cfg.graphqlQuery || `query allVantaggi {
    vantaggiList {
      items {
        _path
        title
        description
        icon {
          _publishUrl
          _authorUrl
        }
        linkUrl
        linkText
      }
    }
  }`;
  const maxItems = parseInt(cfg.maxItems, 10) || 6;

  // Svuota il blocco
  block.textContent = '';
  block.style.backgroundColor = sectionBg;

  // Container principale
  const container = document.createElement('div');
  container.className = 'tpd-vantaggi-container';

  // Titolo della sezione
  const titleElement = document.createElement('h2');
  titleElement.className = 'tpd-vantaggi-section-title';
  titleElement.textContent = sectionTitle;
  container.append(titleElement);

  // Griglia dei vantaggi
  const grid = document.createElement('div');
  grid.className = 'tpd-vantaggi-grid';

  // Prova a recuperare dati da GraphQL
  let vantaggiData = await fetchVantaggiFromAEM(graphqlEndpoint, graphqlQuery);
  
  // Se GraphQL fallisce, usa i dati di fallback
  if (!vantaggiData || vantaggiData.length === 0) {
    console.info('Using fallback data for TPD Vantaggi');
    vantaggiData = getFallbackVantaggi();
  }

  // Limita il numero di elementi
  const limitedData = vantaggiData.slice(0, maxItems);

  // Crea le tile
  limitedData.forEach((item) => {
    const tile = buildVantaggioTile(item);
    grid.append(tile);
  });

  container.append(grid);
  block.append(container);

  // Sposta la strumentazione
  moveInstrumentation(block, container);
}
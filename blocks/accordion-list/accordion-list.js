import { moveInstrumentation } from '../../scripts/scripts.js';
import { DEV_CONFIG, getAuthHeader, getGraphQLEndpoint } from '../../config/dev-config.js';

export default async function decorate(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children.length === 2) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
      const value = row.children[1].textContent.trim();
      config[key] = value;
    }
  });

  const backgroundColor = config.backgroundcolor || '#ffffff';
  const openBackgroundColor = config.openbackgroundcolor || '#f0f8ff';
  const closedBackgroundColor = config.closedbackgroundcolor || '#f9f9f9';

  try {
    // Usa la configurazione centralizzata
    const graphqlEndpoint = getGraphQLEndpoint('/graphql/execute.json/unipol/allAccordionItems');
    
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
    const faqItems = data.data?.accordionItemList?.items || [];

    block.innerHTML = '';

    block.style.backgroundColor = backgroundColor;

    const accordionContainer = document.createElement('div');
    accordionContainer.classList.add('accordion-container');

    faqItems.forEach((item, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');
      accordionItem.style.backgroundColor = closedBackgroundColor;

      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = item.txTitle;
      summary.classList.add('accordion-summary');
      
      const content = document.createElement('div');
      content.classList.add('accordion-content');
      content.innerHTML = item.txDescription.html;

      details.addEventListener('toggle', () => {
        if (details.open) {
          accordionItem.style.backgroundColor = openBackgroundColor;
        } else {
          accordionItem.style.backgroundColor = closedBackgroundColor;
        }
      });

      details.appendChild(summary);
      details.appendChild(content);
      accordionItem.appendChild(details);
      accordionContainer.appendChild(accordionItem);
    });

    block.appendChild(accordionContainer);

    moveInstrumentation(block, block);
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Lista FAQ');

  } catch (error) {
    console.error('Errore nel caricamento delle FAQ:', error);
    block.innerHTML = '';
  }

  return block;
}
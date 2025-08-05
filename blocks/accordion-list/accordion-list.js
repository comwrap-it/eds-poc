import { moveInstrumentation } from '../../scripts/scripts.js';
import { DEV_CONFIG, getAuthHeader, getGraphQLEndpoint } from '../../config/dev-config.js';

export default async function decorate(block) {
  const children = [...block.children];

  const rootPath = children[0]?.querySelector('a')?.innerHTML;
  const title = children[1];
  const backgroundColor = children[2]?.querySelector('a')?.innerHTML || '#fafafa';
  const showFirstDescriptionLine = children[3]?.textContent?.trim().toLowerCase() === 'true';
  const openBackgroundColor = '#eef4f6';
  const closedBackgroundColor = '#ffffff';
  
  // Verifica che rootPath sia configurato
  if (!rootPath) {
    console.warn('rootPath non configurato per accordion-list');
    block.innerHTML = '';
    return block;
  }

  try {
    // Usa la configurazione centralizzata
    const graphqlEndpoint = getGraphQLEndpoint('/graphql/execute.json/unipol/accordionItemsPerPath') + ';rootPath=' + rootPath;
    
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

    // Aggiungi il titolo se presente
    if (title && title.textContent.trim()) {
      const titleElement = document.createElement('h2');
      titleElement.classList.add('accordion-title');
      titleElement.textContent = title.textContent.trim();
      titleElement.style.textAlign = 'left';
      titleElement.style.marginBottom = '20px';
      
      // AGGIUNGI QUESTI ATTRIBUTI:
      titleElement.setAttribute('data-aue-label', 'Titolo Accordion');
      titleElement.setAttribute('data-aue-type', 'text');
      titleElement.setAttribute('data-aue-prop', 'title');
      
      block.appendChild(titleElement);
    }

    const accordionContainer = document.createElement('div');
    accordionContainer.classList.add('accordion-container');

    // Funzione helper per processare il testo
    function processTextContent(htmlContent) {
      // Crea un elemento temporaneo per parsare l'HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Estrai solo il testo senza tag HTML
      const fullText = tempDiv.textContent || tempDiv.innerText || '';
      
      // Trova la prima riga (fino al primo \n o al primo punto)
      const firstLine = fullText.split(/[\n\r]/)[0].trim();
      
      let previewText, remainingText;
      
      // Se la prima riga è troppo lunga, trimmala
      if (firstLine.length > 100) {
        previewText = firstLine.substring(0, 100) + '...';
        remainingText = firstLine.substring(100) + fullText.substring(firstLine.length);
      } else {
        previewText = firstLine;
        remainingText = fullText.substring(firstLine.length);
      }
      
      return { previewText, remainingText, fullText };
    }

    // Aggiungi attributi Universal Editor al blocco principale
    block.setAttribute('data-aue-label', 'Lista Accordion');
    block.setAttribute('data-aue-type', 'container');
    block.setAttribute('data-aue-model', 'accordion-list');
    block.setAttribute('data-aue-behavior', 'component');
    faqItems.forEach((item, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');
      accordionItem.style.backgroundColor = closedBackgroundColor;

      const details = document.createElement('details');
      const summary = document.createElement('summary');
      
      // Processa il contenuto del testo
      const textContent = processTextContent(item.txDescription.html);
      
      // Crea il contenuto del summary
      const summaryContent = document.createElement('div');
      summaryContent.classList.add('accordion-summary-content');
      
      const titleElement = document.createElement('div');
      titleElement.classList.add('accordion-title');
      titleElement.textContent = item.txTitle;
      
      summaryContent.appendChild(titleElement);
      
      // Aggiungi preview solo se showFirstDescriptionLine è true
      let previewElement;
      if (showFirstDescriptionLine) {
        previewElement = document.createElement('div');
        previewElement.classList.add('accordion-preview');
        previewElement.textContent = textContent.previewText;
        summaryContent.appendChild(previewElement);
      }
      
      summary.appendChild(summaryContent);
      summary.classList.add('accordion-summary');
      
      const content = document.createElement('div');
      content.classList.add('accordion-content');
      
      // Se showFirstDescriptionLine è false, prepara il contenuto completo nel body
      if (!showFirstDescriptionLine) {
        content.innerHTML = item.txDescription.html;
        content.style.display = 'none';
      } else {
        content.style.display = 'none';
      }
      
      details.addEventListener('toggle', () => {
        if (details.open) {
          accordionItem.style.backgroundColor = openBackgroundColor;
          
          if (showFirstDescriptionLine) {
            // Comportamento originale: mostra tutto nel preview
            previewElement.textContent = textContent.fullText;
            content.style.display = 'none';
          } else {
            // Nuovo comportamento: mostra tutto nel content body
            content.style.display = 'block';
          }
        } else {
          accordionItem.style.backgroundColor = closedBackgroundColor;
          
          if (showFirstDescriptionLine) {
            // Torna alla preview trimmata
            previewElement.textContent = textContent.previewText;
          } else {
            // Nascondi il content
            content.style.display = 'none';
          }
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
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children.length === 2) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
      const value = row.children[1].textContent.trim();
      config[key] = value;
    }
  });

  const rootPath = config.rootpath || '/content/dam/faq';
  const backgroundColor = config.backgroundcolor || '#ffffff';
  const openBackgroundColor = config.openbackgroundcolor || '#f0f8ff';
  const closedBackgroundColor = config.closedbackgroundcolor || '#f9f9f9';

  try {
    const graphqlEndpoint = '/content/graphql/faq/endpoint.json';
    const query = `
      query getFAQList($rootPath: String!) {
        faqItemList(
          filter: {
            _path: {
              _expressions: [
                {
                  value: $rootPath
                  _operator: STARTS_WITH
                }
              ]
            }
          }
        ) {
          items {
            _path
            title
            description {
              html
              plaintext
            }
          }
        }
      }
    `;

    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          rootPath
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const faqItems = data.data?.faqItemList?.items || [];

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
      summary.textContent = item.title;
      summary.classList.add('accordion-summary');
      
      const content = document.createElement('div');
      content.classList.add('accordion-content');
      content.innerHTML = item.description.html;

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
    block.innerHTML = '<p>Errore nel caricamento delle FAQ. Riprova più tardi.</p>';
  }

  return block;
}
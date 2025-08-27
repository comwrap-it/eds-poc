import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load header as fragment
  const headerMeta = getMetadata('header');
  const headerPath = headerMeta ? new URL(headerMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(headerPath);

  // decorate header DOM
  block.textContent = '';
  const header = document.createElement('div');

  // Estrai i link dalle colonne del componente columns prima di processare il fragment
  const columnsBlock = fragment.querySelector('.columns.block');
  let columnLinks = { col1: [], col2: [] };
  
  if (columnsBlock) {
    const columnDivs = columnsBlock.querySelectorAll(':scope > div > div');
    
    // Prima colonna
    if (columnDivs[0]) {
      const col1Lists = columnDivs[0].querySelectorAll('a');
      col1Lists.forEach(ul => {
        columnLinks.col1.push(ul.cloneNode(true));
      });
    }

    // Rimuovi completamente il componente columns dal fragment
    const columnsWrapper = columnsBlock.closest('.columns-wrapper');
    if (columnsWrapper) {
      columnsWrapper.remove();
    } else {
      columnsBlock.remove();
    }
  }

  while (fragment.firstElementChild) {
    const element = fragment.firstElementChild;

    if (element.classList && element.classList.contains('unipol-header-no-fetch-container')) {
      if (columnLinks.col1.length > 0) {
        // Cerca l'elemento nav esistente
        const existingNav = element.querySelector('nav.main-navigation');
        
        // Crea la nuova struttura di navigazione
        const nav = document.createElement('nav');
        nav.className = 'main-navigation';
        
        const ul = document.createElement('ul');
        ul.className = 'nav-list';
        
        columnLinks.col1.forEach(link => {
          const li = document.createElement('li');
          // Rimuovi la classe 'button' dal link se presente
          link.classList.remove('button');
          li.appendChild(link);
          ul.appendChild(li);
        });
        
        nav.appendChild(ul);
        
        // Sostituisce l'elemento nav esistente se presente, altrimenti lo aggiunge
        if (existingNav) {
          existingNav.replaceWith(nav);
        } else {
          element.appendChild(nav);
        }
      }
    }
    header.append(element);
  }

  block.append(header);
}
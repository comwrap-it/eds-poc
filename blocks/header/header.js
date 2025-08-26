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
  let columnLinks = { col1: [] };
  
  if (columnsBlock) {
    const columnDivs = columnsBlock.querySelectorAll(':scope > div > div');
    
    // Prima colonna
    if (columnDivs[0]) {
      const col1Lists = columnDivs[0].querySelectorAll('a');
      col1Lists.forEach(link => {
        // Rimuovi l'attributo class="button" se presente
        const cleanLink = link.cloneNode(true);
        cleanLink.removeAttribute('class');
        columnLinks.col1.push(cleanLink);
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
        // Crea la struttura <ul class="bottom-page-list"> invece del div
        const bottomPageList = document.createElement('ul');
        bottomPageList.className = 'bottom-page-list';
        
        columnLinks.col1.forEach(link => {
          const listItem = document.createElement('li');
          listItem.appendChild(link);
          bottomPageList.appendChild(listItem);
        });
        
        element.appendChild(bottomPageList);
      }
    }
    header.append(element);
  }

  block.append(header);
}
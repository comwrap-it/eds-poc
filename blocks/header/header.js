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

    if (element.classList && element.classList.contains('unipol-header-container')) {
      if (columnLinks.col1.length > 0) {
        const col1Content = document.createElement('div');
        col1Content.className = 'h-links';
        columnLinks.col1.forEach(link => {
          col1Content.appendChild(link);
        });
        element.appendChild(col1Content);
      }
    }
    header.append(element);
  }

  block.append(header);
}
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  
  // Estrai i link dalle colonne del componente columns prima di processare il fragment
  const columnsBlock = fragment.querySelector('.columns.block');
  let columnLinks = { col1: [], col2: [] };
  
  if (columnsBlock) {
    const columnDivs = columnsBlock.querySelectorAll(':scope > div > div');
    
    // Prima colonna
    if (columnDivs[0]) {
      const col1Lists = columnDivs[0].querySelectorAll('ul');
      col1Lists.forEach(ul => {
        columnLinks.col1.push(ul.cloneNode(true));
      });
    }
    
    // Seconda colonna
    if (columnDivs[1]) {
      const col2Lists = columnDivs[1].querySelectorAll('ul');
      col2Lists.forEach(ul => {
        columnLinks.col2.push(ul.cloneNode(true));
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
  
  // Processa il fragment normalmente
  while (fragment.firstElementChild) {
    const element = fragment.firstElementChild;
    
    // Se è il unipol-footer, aggiungi i link alle colonne
    if (element.classList && element.classList.contains('unipol-footer-container')) {
      const unipolFooter = element.querySelector('.unipol-footer');
      if (unipolFooter) {
        const col1 = unipolFooter.querySelector('.u-columns section.u-col:first-child');
        const col2 = unipolFooter.querySelector('.u-columns section.u-col:nth-child(2)');
        
        // Aggiungi i link alla prima colonna
        if (col1 && columnLinks.col1.length > 0) {
          const col1Content = document.createElement('div');
          col1Content.className = 'u-links';
          columnLinks.col1.forEach(list => {
            col1Content.appendChild(list);
          });
          col1.appendChild(col1Content);
        }
        
        // Aggiungi i link alla seconda colonna
        if (col2 && columnLinks.col2.length > 0) {
          const col2Content = document.createElement('div');
          col2Content.className = 'u-links';
          columnLinks.col2.forEach(list => {
            col2Content.appendChild(list);
          });
          // Inserisci prima delle informazioni societarie
          const companyInfo = col2.querySelector('.u-datisocietari');
          if (companyInfo) {
            col2.insertBefore(col2Content, companyInfo);
          } else {
            col2.appendChild(col2Content);
          }
        }
      }
    }
    
    footer.append(element);
  }

  block.append(footer);
}
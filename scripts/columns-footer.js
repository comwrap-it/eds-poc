/**
 * Gestisce il comportamento accordion per i link innestati del footer su mobile
 */
export function initFooterAccordion() {
  // Applica solo su mobile
  if (window.innerWidth >= 768) return;
  
  const footerLinks = document.querySelectorAll('.unipol-footer .u-links > ul > li');
  
  footerLinks.forEach(li => {
    const nestedUl = li.querySelector('ul');
    if (nestedUl) {
      const mainLink = li.querySelector('a');
      if (mainLink) {
        mainLink.addEventListener('click', (e) => {
          e.preventDefault();
          li.classList.toggle('expanded');
        });
      }
    }
  });
}

// Reinizializza quando la finestra viene ridimensionata
window.addEventListener('resize', () => {
  // Rimuovi tutti i listener esistenti e reinizializza
  const expandedItems = document.querySelectorAll('.unipol-footer .u-links > ul > li.expanded');
  expandedItems.forEach(item => item.classList.remove('expanded'));
  
  setTimeout(initFooterAccordion, 100);
});
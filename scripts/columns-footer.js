
export function initFooterAccordion() {

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
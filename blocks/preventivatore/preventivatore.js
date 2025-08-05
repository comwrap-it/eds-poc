import { loadCSS, loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Carica React e ReactDOM da CDN
  await loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
  await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
  
  // Carica il tuo componente React buildato
  await loadScript('/dist/preventivatore-react.bundle.js');
  
  // Carica CSS se necessario
  await loadCSS('/blocks/preventivatore/preventivatore-react.css');
  
  // Crea un container per React
  const reactContainer = document.createElement('div');
  reactContainer.id = 'preventivatore-react-root';
  block.appendChild(reactContainer);
  
  // Estrai i dati dal blocco EDS se necessario
  const blockData = {
    // Estrai dati dal DOM del blocco se necessario
  };
  
  // Renderizza il componente React
  if (window.preventivatoreReactComponent && window.React && window.ReactDOM) {
    const { createElement } = window.React;
    const { render } = window.ReactDOM;
    
    render(
      createElement(window.preventivatoreReactComponent, { data: blockData }),
      reactContainer
    );
  }
}

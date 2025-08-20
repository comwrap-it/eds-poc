import { loadCSS, loadScript } from '../../scripts/aem.js';

function createSkeleton() {
  const skeleton = document.createElement('div');
  skeleton.className = 'preventivatore-skeleton';
  skeleton.innerHTML = `
    <div class="skeleton-container">
      <div class="skeleton-left">
        <div class="skeleton-form">
          <div class="skeleton-field">
            <div class="skeleton-label"></div>
            <div class="skeleton-input"></div>
            <div class="skeleton-checkbox-row">
              <div class="skeleton-checkbox"></div>
              <div class="skeleton-checkbox-label"></div>
            </div>
          </div>
          
          <div class="skeleton-field">
            <div class="skeleton-label"></div>
            <div class="skeleton-input"></div>
          </div>
          
          <div class="skeleton-field">
            <div class="skeleton-label"></div>
            <div class="skeleton-input"></div>
          </div>
          
          <div class="skeleton-actions">
            <div class="skeleton-button skeleton-button-primary"></div>
          </div>
          
          <div class="skeleton-links">
            <div class="skeleton-link"></div>
            <div class="skeleton-link"></div>
          </div>
        </div>
      </div>
      
      <div class="skeleton-right">
        <div class="skeleton-promo">
          <div class="skeleton-promo-icons">
            <div class="skeleton-icon"></div>
            <div class="skeleton-icon"></div>
            <div class="skeleton-icon"></div>
          </div>
          <div class="skeleton-promo-title"></div>
          <div class="skeleton-promo-subtitle"></div>
          <div class="skeleton-promo-discount"></div>
          <div class="skeleton-promo-features">
            <div class="skeleton-feature"></div>
            <div class="skeleton-feature"></div>
            <div class="skeleton-feature"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile version -->
    <div class="skeleton-mobile">
      <div class="skeleton-mobile-header">
        <div class="skeleton-mobile-title"></div>
      </div>
      <div class="skeleton-mobile-form">
        <div class="skeleton-field">
          <div class="skeleton-label"></div>
          <div class="skeleton-input"></div>
        </div>
        <div class="skeleton-field">
          <div class="skeleton-label"></div>
          <div class="skeleton-input"></div>
        </div>
        <div class="skeleton-field">
          <div class="skeleton-label"></div>
          <div class="skeleton-input"></div>
        </div>
        <div class="skeleton-button skeleton-button-primary"></div>
        <div class="skeleton-links">
          <div class="skeleton-link"></div>
          <div class="skeleton-link"></div>
        </div>
      </div>
    </div>
  `;
  return skeleton;
}

export default async function decorate(block) {
  // Crea e mostra lo skeleton immediatamente
  const skeleton = createSkeleton();
  block.appendChild(skeleton);
  
  // Crea un container per React
  const reactContainer = document.createElement('div');
  reactContainer.id = 'preventivatore-react-root';
  reactContainer.style.display = 'none'; // Nascosto inizialmente
  block.appendChild(reactContainer);
  
  // Listener per nascondere lo skeleton quando React è pronto
  const hideSkeletonHandler = (event) => {
    console.log('Evento preventivatoreComponentReady ricevuto:', event);
    
    // Nascondi lo skeleton
    skeleton.style.display = 'none';
    
    // Mostra il componente React
    reactContainer.style.display = 'block';
    
    // Rimuovi l'event listener
    window.removeEventListener('preventivatoreComponentReady', hideSkeletonHandler);
    
    console.log('Skeleton nascosto e componente React mostrato');
  };
  
  // Registra l'event listener
  window.addEventListener('preventivatoreComponentReady', hideSkeletonHandler);
  console.log('Event listener registrato per preventivatoreComponentReady');
  
  // Timeout di sicurezza per nascondere lo skeleton dopo 10 secondi
  const fallbackTimeout = setTimeout(() => {
    console.log('Timeout di sicurezza: nascondo lo skeleton dopo 10 secondi');
    hideSkeletonHandler({ type: 'fallback' });
  }, 10000);
  
  try {
    // Carica React e ReactDOM da CDN
    await loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
    await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
    
    // Carica il tuo componente React buildato
    await loadScript('/dist/preventivatore-react.bundle.js');
    
    // Carica CSS se necessario
    await loadCSS('/blocks/preventivatore/preventivatore-react.css');
    
    console.log('Script e CSS caricati');
    
    // Estrai i dati dal blocco EDS se necessario
    const blockData = {
      // Estrai dati dal DOM del blocco se necessario
    };
    
    // Renderizza il componente React
    if (window.preventivatoreReactComponent && window.React && window.ReactDOM) {
      const { createElement } = window.React;
      const { render } = window.ReactDOM;
      
      console.log('Rendering componente React...');
      
      render(
        createElement(window.preventivatoreReactComponent, { 
          data: blockData,
          onReady: () => {
            // Callback alternativo nel caso l'evento non funzioni
            console.log('Callback onReady chiamato');
            hideSkeletonHandler({ type: 'callback' });
          }
        }),
        reactContainer
      );
    } else {
      console.error('Componente React non trovato:', {
        preventivatoreReactComponent: !!window.preventivatoreReactComponent,
        React: !!window.React,
        ReactDOM: !!window.ReactDOM
      });
      
      // Nascondi lo skeleton anche in caso di errore
      clearTimeout(fallbackTimeout);
      hideSkeletonHandler({ type: 'error' });
    }
  } catch (error) {
    console.error('Errore nel caricamento del componente React:', error);
    
    // Nascondi lo skeleton anche in caso di errore
    clearTimeout(fallbackTimeout);
    hideSkeletonHandler({ type: 'error' });
  }
}

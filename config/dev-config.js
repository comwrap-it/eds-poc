export const DEV_CONFIG = {
  domain: 'http://localhost:4502',
  cloudPublishDomain: 'https://publish-p42403-e1312991.adobeaemcloud.com',
  cloudAuthorDomain: 'https://author-p42403-e1312991.adobeaemcloud.com',
  username: 'admin',
  password: 'admin',
  isLocalDevelopment: window.location.port === '3000'
};

export function getAuthHeader() {
  return 'Basic ' + btoa(`${DEV_CONFIG.username}:${DEV_CONFIG.password}`);
}

export function isAuthorInstance() {
  // Controlla l'URL corrente
  const currentUrl = window.location.href;
  return currentUrl.includes('author-');
}

export function getGraphQLEndpoint(path) {
  if (DEV_CONFIG.isLocalDevelopment) {
    return `${DEV_CONFIG.domain}${path}`;
  }
  
  const baseUrl = isAuthorInstance() 
    ? DEV_CONFIG.cloudAuthorDomain 
    : DEV_CONFIG.cloudPublishDomain;
    
  return `${baseUrl}${path}`;
}

// Nuova funzione per gestire le immagini DAM
export function getImageUrl(imagePath) {
  // Se l'immagine inizia con /content/dam, usa sempre il cloudPublishDomain
  if (imagePath && imagePath.startsWith('/content/dam')) {
    return `${DEV_CONFIG.cloudPublishDomain}${imagePath}`;
  }
  
  // Per altre immagini, usa il comportamento normale
  return imagePath;
}

// Funzione helper per processare path di immagini singole
export function getDamImageUrl(imagePath) {
  if (!imagePath) return imagePath;
  
  // Se è già un URL completo che non contiene /content/dam, restituiscilo così com'è
  if (imagePath.startsWith('http') && !imagePath.includes('/content/dam')) {
    return imagePath;
  }
  
  // Se è già un URL completo con il nostro cloudPublishDomain, evita duplicazioni
  if (imagePath.startsWith(DEV_CONFIG.cloudPublishDomain)) {
    return imagePath;
  }
  
  // Se contiene /content/dam, processa l'URL
  if (imagePath.includes('/content/dam')) {
    const relativePath = imagePath.includes('http') 
      ? new URL(imagePath).pathname 
      : imagePath;
    
    if (relativePath.startsWith('/content/dam')) {
      return `${DEV_CONFIG.cloudPublishDomain}${relativePath}`;
    }
  }
  
  return imagePath;
}
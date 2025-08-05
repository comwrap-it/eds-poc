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
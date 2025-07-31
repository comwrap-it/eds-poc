export const DEV_CONFIG = {
  domain: 'http://localhost:4502',
  username: 'admin',
  password: 'admin',
  isLocalDevelopment: window.location.port === '3000'
};

export function getAuthHeader() {
  return 'Basic ' + btoa(`${DEV_CONFIG.username}:${DEV_CONFIG.password}`);
}

export function getGraphQLEndpoint(path) {
  return DEV_CONFIG.isLocalDevelopment 
    ? `${DEV_CONFIG.domain}${path}`
    : path;
}
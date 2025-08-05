const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up React for EDS...');

// Installa le dipendenze
console.log('📦 Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Crea la cartella dist se non esiste
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Esegui la build iniziale
console.log('🔨 Building React components...');
execSync('npm run build:react', { stdio: 'inherit' });

console.log('✅ Setup completed! You can now:');
console.log('   - Run "npm run dev:react" for development with watch mode');
console.log('   - Run "npm run build" for production build');
console.log('   - Create React components as *-react.tsx in your block folders');
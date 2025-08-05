const path = require('path');
const fs = require('fs');

// Funzione per trovare automaticamente i componenti React
function findReactComponents() {
  const entries = {};
  const blocksDir = path.resolve(__dirname, 'blocks');
  
  if (fs.existsSync(blocksDir)) {
    const blockDirs = fs.readdirSync(blocksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    blockDirs.forEach(blockName => {
      const reactEntryPath = path.join(blocksDir, blockName, `${blockName}-react.tsx`);
      const reactEntryPathJs = path.join(blocksDir, blockName, `${blockName}-react.ts`);
      
      if (fs.existsSync(reactEntryPath)) {
        entries[blockName] = reactEntryPath;
      } else if (fs.existsSync(reactEntryPathJs)) {
        entries[blockName] = reactEntryPathJs;
      }
    });
  }
  
  return entries;
}

module.exports = {
  entry: findReactComponents(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-react.bundle.js',
    library: {
      name: '[name]ReactComponent',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
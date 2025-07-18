import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Estrai i contenuti dai figli
  const imgWrapper = children[0];
  const textWrapper = children[1];
  const layoutWrapper = children[2];

  // Estrai layout
  const layout = layoutWrapper?.textContent.trim() || 'image-left';

  // Pulisci il blocco
  block.innerHTML = '';

  // Prepara div immagine
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('image-content');
  const picture = imgWrapper.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    imgDiv.appendChild(optimizedPic);
  }
  imgDiv.setAttribute('data-aue-label', 'Immagine');
  imgDiv.setAttribute('data-aue-type', 'media');
  moveInstrumentation(imgWrapper, imgDiv);

  // Prepara div testo
  const textDiv = document.createElement('div');
  textDiv.classList.add('text-content');
  textDiv.innerHTML = textWrapper.innerHTML;
  textDiv.setAttribute('data-aue-label', 'Testo');
  textDiv.setAttribute('data-aue-type', 'richtext');
  moveInstrumentation(textWrapper, textDiv);

  // Dopo la creazione di textDiv
  const textBackgroundColor = children[3]?.textContent.trim() || '';
  if (textBackgroundColor) {
    textDiv.style.backgroundColor = textBackgroundColor;
  }
  // Aggiungi al blocco in base al layout
  if (layout === 'image-left') {
    block.appendChild(imgDiv);
    block.appendChild(textDiv);
  } else {
    block.appendChild(textDiv);
    block.appendChild(imgDiv);
  }

  // Accessibilità
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Blocco Testo e Immagine');

  // Strumentazione generale
  moveInstrumentation(block);
}
import { createOptimizedPicture, moveInstrumentation } from '../../scripts/aem.js';

export default function decorate(block) {
  const model = block.querySelector('script[type="application/json"]')?.textContent;
  let data;
  if (model) {
    data = JSON.parse(model);
  }

  block.innerHTML = '';

  const layout = data?.layout || 'image-left';
  const textDiv = document.createElement('div');
  textDiv.classList.add('text-content');
  textDiv.innerHTML = data?.text || '';
  textDiv.setAttribute('data-aue-label', 'Testo');
  textDiv.setAttribute('data-aue-type', 'richtext');

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('image-content');
  const picture = createOptimizedPicture(data?.image, data?.imageAlt || 'Immagine', false);
  imgDiv.appendChild(picture);
  imgDiv.setAttribute('data-aue-label', 'Immagine');
  imgDiv.setAttribute('data-aue-type', 'media');

  if (layout === 'image-left') {
    block.appendChild(imgDiv);
    block.appendChild(textDiv);
  } else {
    block.appendChild(textDiv);
    block.appendChild(imgDiv);
  }

  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Blocco Testo e Immagine');
  moveInstrumentation(block);
}
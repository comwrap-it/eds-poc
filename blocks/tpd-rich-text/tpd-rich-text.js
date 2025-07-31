import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const paragraph = children[0];
  const FontSize = children[1]?.textContent.trim() || '';

  if (['Font-size-xl', 'Font-size-l', 'Font-size-m', 'Font-size-s', 'Font-size-xs', 'Font-size-xxs'].includes(FontSize)) {
    paragraph.classList.add(`${FontSize}`);
  }

  const textColor = children[2]?.textContent.trim() || '';
  if (textColor) {
    paragraph.style.color = textColor;
  }

  children[1]?.remove();
  children[2]?.remove();

  paragraph.setAttribute('data-aue-label', 'Paragrafo');
  paragraph.setAttribute('data-aue-type', 'text');

  moveInstrumentation(paragraph);
  moveInstrumentation(block);

}
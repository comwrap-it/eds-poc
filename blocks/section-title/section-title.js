import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const heading = children[0];
  const alignment = children[1]?.textContent.trim().toLowerCase() || '';

  if (['left', 'center', 'right'].includes(alignment)) {
    heading.classList.add(`title-${alignment}`);
  }
  children[1]?.remove();

  heading.setAttribute('data-aue-label', 'Titolo');
  heading.setAttribute('data-aue-type', 'text');

  moveInstrumentation(heading);
  moveInstrumentation(block);
}
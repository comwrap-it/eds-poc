import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const titleText = children[0]?.textContent.trim() || '';
  const titleType = children[1]?.textContent.trim() || 'h2';
  const alignment = children[2]?.textContent.trim() || '';

  const heading = document.createElement(titleType);
  heading.textContent = titleText;

  if (alignment === 'left') {
    heading.classList.add('title-left');
  } else if (alignment === 'right') {
    heading.classList.add('title-right');
  } else if (alignment === 'center') {
    heading.classList.add('title-center');
  }

  heading.setAttribute('data-aue-label', 'Titolo');
  heading.setAttribute('data-aue-type', 'text');
  moveInstrumentation(children[0], heading);

  block.innerHTML = '';
  block.appendChild(heading);

  moveInstrumentation(block);
}
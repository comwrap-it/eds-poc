export default function decorate(block) {
  const children = [...block.children];

  const heading = children[0];
  const alignment = children[1]?.textContent.trim().toLowerCase() || '';

  if (['left', 'center', 'right'].includes(alignment)) {
    heading.classList.add(`title-${alignment}`);
  }

  const textColor = children[2]?.textContent.trim() || '';
  if (textColor) {
    heading.style.color = textColor;
  }

  children[1]?.remove();
  children[2]?.remove();

}
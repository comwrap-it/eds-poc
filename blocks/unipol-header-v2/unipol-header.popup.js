export function initPopup(config, triggerBtn, overlayId = null) {
  const id = overlayId || `popup-dialog-${Math.random().toString(36).slice(2,9)}`;

  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');
  overlay.id = id;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', config.ariaLabel || 'Menu Gruppo Unipol');
  overlay.style.display = 'none';

  const content = document.createElement('div');
  content.classList.add('popup-content');

  if (config.title) {
    const titleEl = document.createElement('h2');
    titleEl.id = `${id}-title`;
    titleEl.textContent = config.title;
    titleEl.classList.add('sr-only');
    overlay.setAttribute('aria-labelledby', titleEl.id);
    content.appendChild(titleEl);
  }

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = config.cancelText || 'Annulla';
  cancelBtn.classList.add('popup-cancel');
  cancelBtn.setAttribute('tabindex', '-1');

  const confirmBtn = document.createElement('a');
  confirmBtn.href = config.confirmHref || '#';
  confirmBtn.textContent = config.confirmText || 'Gruppo Unipol';
  confirmBtn.setAttribute('aria-label', config.confirmText || 'Gruppo Unipol');
  confirmBtn.target = '_blank';
  confirmBtn.setAttribute('tabindex', '-1');

  content.append(cancelBtn, confirmBtn);
  overlay.appendChild(content);

  triggerBtn.setAttribute('aria-haspopup', 'dialog');
  triggerBtn.setAttribute('aria-controls', id);
  triggerBtn.setAttribute('aria-expanded', 'false');

  function openPopup() {
    overlay.style.display = 'flex';
    cancelBtn.setAttribute('tabindex', '0');
    confirmBtn.setAttribute('tabindex', '0');
    cancelBtn.focus();
  }

  function closePopup() {
    overlay.style.display = 'none';
    triggerBtn.setAttribute('aria-expanded', 'false');
    cancelBtn.setAttribute('tabindex', '-1');
    confirmBtn.setAttribute('tabindex', '-1');
  }

  triggerBtn.addEventListener('click', () => {
    const isExpanded = triggerBtn.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closePopup();
      triggerBtn.setAttribute('aria-expanded', 'false');
    } else {
      openPopup();
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
  });

  cancelBtn.addEventListener('click', closePopup);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') closePopup();
  });

  document.addEventListener('click', e => {
    if (!overlay.contains(e.target) && !triggerBtn.contains(e.target) && overlay.style.display === 'flex') {
      closePopup();
    }
  });

  document.addEventListener('focusin', e => {
    if (overlay.style.display !== 'flex') return;

    setTimeout(() => {
      const active = document.activeElement;

      if (!overlay.contains(active) && active !== triggerBtn) {
        closePopup();
      }
    }, 0);
  });

  return overlay;
}

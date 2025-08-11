// blocks/header/header.popup.js
export function initPopup(config, triggerBtn) {
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');
  overlay.id = 'popup-dialog';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'popup-title');
  overlay.style.display = 'none';

  const content = document.createElement('div');
  content.classList.add('popup-content');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = config.cancelText;
  cancelBtn.classList.add('popup-cancel');
  cancelBtn.setAttribute('tabindex', '-1');

  const confirmBtn = document.createElement('a');
  confirmBtn.href = config.confirmHref;
  confirmBtn.textContent = config.confirmText;
  confirmBtn.setAttribute('aria-label', config.confirmText);
  confirmBtn.target = '_blank';
  confirmBtn.setAttribute('tabindex', '-1');

  content.append(cancelBtn, confirmBtn);
  overlay.appendChild(content);

  // Eventi popup
  function openPopup() {
    overlay.style.display = 'flex';
    cancelBtn.setAttribute('tabindex', '0');
    confirmBtn.setAttribute('tabindex', '0');
    cancelBtn.focus();
  }

  function closePopup() {
    overlay.style.display = 'none';
    cancelBtn.setAttribute('tabindex', '-1');
    confirmBtn.setAttribute('tabindex', '-1');
    triggerBtn.focus();
  }

  triggerBtn.addEventListener('click', openPopup);
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
    if (overlay.style.display === 'flex' && !overlay.contains(e.target)) {
      closePopup();
    }
  });

  return overlay;
}

import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { getDamImageUrl } from '../../config/dev-config.js';

export default function decorate(block) {
  const children = [...block.children];

  //General Configuration
  const footerDesc = children[0]?.querySelectorAll('div > div')[0].innerHTML || '';
  const companyInfo = children[1]?.querySelectorAll('div > div')[0].innerHTML || '';
  
  // Social configuration
  const socialLabel = children[2]?.querySelectorAll('p')[0]?.textContent || '';
  const facebookUrl = children[2]?.querySelectorAll('a')[0]?.href || '';
  const instagramUrl = children[2]?.querySelectorAll('a')[1]?.href || '';
  const linkedinUrl = children[2]?.querySelectorAll('a')[2]?.href || '';
  const youtubeUrl = children[2]?.querySelectorAll('a')[3]?.href || '';

  // Privacy Configuration
  const privacyUrl = children[3]?.querySelectorAll('a')[0]?.href || '#';
  const privacyLabel = children[3]?.querySelectorAll('p')[1]?.textContent || '';
  const cookieUrl = children[3]?.querySelectorAll('a')[1]?.href || '#';
  const cookieLabel = children[3]?.querySelectorAll('p')[3]?.textContent || '';
  const ivassUrl = children[3]?.querySelectorAll('a')[2]?.href || '#';
  const ivassLabel = children[3]?.querySelectorAll('p')[5]?.textContent || '';
  const paymentUrl = children[3]?.querySelectorAll('a')[3]?.href || '#';
  const paymentLabel = children[3]?.querySelectorAll('p')[7]?.textContent || '';
  
  // App Configuration
  const appTitle = children[4]?.querySelectorAll('p')[0]?.innerHTML || 'Scarica o aggiorna l\'App<br>Unipol';
  const appStoreUrl = children[4]?.querySelectorAll('a')[0]?.href || '#';
  const googlePlayUrl = children[4]?.querySelectorAll('a')[1]?.href || '#';
  const qrCodeImage = children[4]?.querySelectorAll('picture')[0];
  const phoneImage = children[4]?.querySelectorAll('picture')[1];

  // Crea la struttura del footer
  block.innerHTML = '';
  block.className = 'unipol-footer block';
  block.setAttribute('data-mfe-name', 'tpdFooter');
  block.setAttribute('data-aue-label', 'Unipol Footer');
  block.setAttribute('data-aue-type', 'container');
  block.setAttribute('data-aue-model', 'unipol-footer');

  // Social strip
  const socialStrip = document.createElement('div');
  socialStrip.className = 'u-top';
  socialStrip.setAttribute('role', 'region');
  socialStrip.setAttribute('aria-label', 'Seguici');
  
  const socialWrap = document.createElement('div');
  socialWrap.className = 'u-wrap';
  
  const socialLabelEl = document.createElement('span');
  socialLabelEl.className = 'label';
  socialLabelEl.textContent = socialLabel;
  socialLabelEl.setAttribute('data-aue-label', 'Etichetta Social');
  socialLabelEl.setAttribute('data-aue-type', 'text');
  socialLabelEl.setAttribute('data-aue-prop', 'socialConfiguration_socialLabel');
  
  const socialNav = document.createElement('nav');
  socialNav.className = 'u-social';
  socialNav.setAttribute('aria-label', 'Social');
  
  // Social links
  const socialLinks = [
    { url: facebookUrl, label: 'Facebook', text: 'f', prop: 'socialConfiguration_facebookUrl' },
    { url: instagramUrl, label: 'Instagram', text: 'ig', prop: 'socialConfiguration_instagramUrl' },
    { url: linkedinUrl, label: 'LinkedIn', text: 'in', prop: 'socialConfiguration_linkedinUrl' },
    { url: youtubeUrl, label: 'YouTube', text: '▶', prop: 'socialConfiguration_youtubeUrl' }
  ];
  
  socialLinks.forEach(social => {
    if (!social.url) 
      return;
    const link = document.createElement('a');
    link.setAttribute('aria-label', social.label);
    link.href = social.url;
    link.title = social.label;
    link.textContent = social.text;
    link.setAttribute('data-aue-label', `URL ${social.label}`);
    link.setAttribute('data-aue-type', 'text');
    link.setAttribute('data-aue-prop', social.prop);
    socialNav.appendChild(link);
  });
  
  socialWrap.appendChild(socialLabelEl);
  socialWrap.appendChild(socialNav);
  socialStrip.appendChild(socialWrap);

  // Utility links
  const utilitySection = document.createElement('div');
  utilitySection.className = 'u-utility';
  utilitySection.setAttribute('role', 'navigation');
  utilitySection.setAttribute('aria-label', 'Utility');
  
  const utilityWrap = document.createElement('div');
  utilityWrap.className = 'u-wrap';
  
  const utilityGrid = document.createElement('div');
  utilityGrid.className = 'grid';
  
  const utilityLinks = [
    { url: privacyUrl, text: privacyLabel, prop: 'infoConfiguration_privacyLabel' },
    { url: cookieUrl, text: cookieLabel, prop: 'infoConfiguration_cookieLabel' },
    { url: ivassUrl, text: ivassLabel, prop: 'infoConfiguration_ivassLabel' },
    { url: paymentUrl, text: paymentLabel, prop: 'infoConfiguration_paymentLabel' }
  ];
  
  utilityLinks.forEach(util => {
    const link = document.createElement('a');
    link.href = util.url;
    link.textContent = util.text;
    link.setAttribute('data-aue-label', util.text);
    link.setAttribute('data-aue-type', 'text');
    link.setAttribute('data-aue-prop', util.prop);
    utilityGrid.appendChild(link);
  });
  
  utilityWrap.appendChild(utilityGrid);
  utilitySection.appendChild(utilityWrap);

  // Main content
  const mainSection = document.createElement('div');
  mainSection.className = 'u-main';
  
  const mainWrap = document.createElement('div');
  mainWrap.className = 'u-wrap';
  
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'u-columns';
  columnsContainer.setAttribute('data-aue-filter', 'columns');
  columnsContainer.setAttribute('data-aue-type', 'container');
  columnsContainer.setAttribute('data-aue-label', 'Colonne Footer');
  
  // Nuovo contenitore per colonne + dati societari
  const leftContainer = document.createElement('div');
  leftContainer.className = 'u-left-container';
  
  // Contenitore per le due colonne affiancate
  const columnsWrapper = document.createElement('div');
  columnsWrapper.className = 'u-columns-wrapper';
  
  // Column 1 - Ora è una sezione che contiene componenti di testo
  const col1 = document.createElement('section');
  col1.className = 'u-col';

  // Column 2 - Ora è una sezione che contiene componenti di testo
  const col2 = document.createElement('section');
  col2.className = 'u-col';
  
  // Aggiungi le colonne al wrapper
  columnsWrapper.appendChild(col1);
  columnsWrapper.appendChild(col2);
  
  // Dati societari - ora vanno sotto le colonne
  const companyInfoDiv = document.createElement('div');
  companyInfoDiv.className = 'u-datisocietari';
  companyInfoDiv.innerHTML = companyInfo;
  companyInfoDiv.setAttribute('data-aue-label', 'Informazioni Societarie');
  companyInfoDiv.setAttribute('data-aue-type', 'richtext');
  companyInfoDiv.setAttribute('data-aue-prop', 'generalInfo_companyInfo');

  // Assembla il contenitore sinistro
  leftContainer.appendChild(columnsWrapper);
  leftContainer.appendChild(companyInfoDiv);

  // App section - Struttura a due colonne come nel design originale
  const appSection = document.createElement('div');
  appSection.className = 'u-app-section';
  
  // Prima colonna: Titolo, stores e QR code
  const appCol = document.createElement('div');
  appCol.className = 'u-col u-app';
  appCol.setAttribute('aria-label', 'App Unipol');
  
  const appTitleEl = document.createElement('span');
  appTitleEl.innerHTML = appTitle;
  appTitleEl.setAttribute('data-aue-label', 'Titolo App');
  appTitleEl.setAttribute('data-aue-type', 'text');
  appTitleEl.setAttribute('data-aue-prop', 'appConfiguration_appTitle');

  const storesDiv = document.createElement('div');
  storesDiv.className = 'u-stores';
  
  const appStoreLink = document.createElement('a');
  appStoreLink.className = 'u-store';
  appStoreLink.href = appStoreUrl;
  appStoreLink.setAttribute('aria-label', 'App Store iOS');
  appStoreLink.textContent = 'App Store';
  appStoreLink.setAttribute('data-aue-label', 'URL App Store');
  appStoreLink.setAttribute('data-aue-type', 'text');
  appStoreLink.setAttribute('data-aue-prop', 'appConfiguration_appStoreUrl');
  
  const googlePlayLink = document.createElement('a');
  googlePlayLink.className = 'u-store';
  googlePlayLink.href = googlePlayUrl;
  googlePlayLink.setAttribute('aria-label', 'Google Play');
  googlePlayLink.textContent = 'Google Play';
  googlePlayLink.setAttribute('data-aue-label', 'URL Google Play');
  googlePlayLink.setAttribute('data-aue-type', 'text');
  googlePlayLink.setAttribute('data-aue-prop', 'appConfiguration_googlePlayUrl');
  
  storesDiv.appendChild(appStoreLink);
  storesDiv.appendChild(googlePlayLink);
  const qrDiv = document.createElement('div');
  qrDiv.className = 'u-qr';
  if (qrCodeImage) {
    const qrCodeImagePic = qrCodeImage.querySelector('img');
    const qrCodeImageOptimizedPic = createOptimizedPicture(qrCodeImagePic.src, qrCodeImagePic.alt, false);
    moveInstrumentation(qrCodeImagePic, qrCodeImageOptimizedPic.querySelector('img'));
    qrDiv.appendChild(qrCodeImageOptimizedPic);
  }
  
  appCol.appendChild(appTitleEl);
  appCol.appendChild(storesDiv);
  appCol.appendChild(qrDiv);
  
  const imageCol = document.createElement('div');
  imageCol.className = 'u-col u-image';
  // Seconda colonna: Immagine del telefono
  if(phoneImage) {
  const phoneImg = phoneImage.querySelector('img');
  const phoneImgOptimizedPic = createOptimizedPicture(phoneImg.src, phoneImg.alt, false);
  moveInstrumentation(phoneImg, phoneImgOptimizedPic.querySelector('img'));
  phoneImgOptimizedPic.className = 'u-phone';
  imageCol.appendChild(phoneImgOptimizedPic);
  }
  
  // Assembla le due colonne dell'app
  appSection.appendChild(appCol);
  appSection.appendChild(imageCol);

  columnsContainer.appendChild(leftContainer);
  columnsContainer.appendChild(appSection);
  
  mainWrap.appendChild(columnsContainer);
  mainSection.appendChild(mainWrap);

  // Bottom description
  const bottomSection = document.createElement('div');
  bottomSection.className = 'u-bottom';
  
  const bottomWrap = document.createElement('div');
  bottomWrap.className = 'u-wrap';
  
  const descriptionP = document.createElement('div');
  descriptionP.className = 'u-desc';
  descriptionP.innerHTML = footerDesc;
  descriptionP.setAttribute('data-aue-label', 'Descrizione Azienda');
  descriptionP.setAttribute('data-aue-type', 'richtext');
  descriptionP.setAttribute('data-aue-prop', 'generalConfiguration_description');

  bottomWrap.appendChild(descriptionP);
  bottomSection.appendChild(bottomWrap);

  // Assembla tutto
  block.appendChild(socialStrip);
  block.appendChild(utilitySection);
  block.appendChild(mainSection);
  block.appendChild(bottomSection);

}
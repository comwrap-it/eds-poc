import { moveInstrumentation } from '../../scripts/scripts.js';
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
  const qrCodeImage = children[4]?.querySelectorAll('a')[2]?.href || '';
  const phoneImage = children[4]?.querySelectorAll('a')[3]?.href || '';

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

  // Column 1 - Ora è una sezione che contiene componenti di testo
  const col1 = document.createElement('section');
  col1.className = 'u-col';
  col1.setAttribute('data-aue-label', 'Colonna 1');
  col1.setAttribute('data-aue-type', 'container');
  col1.setAttribute('data-aue-model', 'footer-column-1');
  col1.setAttribute('data-aue-filter', 'footer-column-1');
  
  const col1Title = document.createElement('h3');
  col1Title.innerHTML = ' ';
  
  // Aggiungi i contenuti della sezione 1 se presenti
  //if (column1Section) {
    // Invece di clonare l'intero nodo, trasferisci i suoi figli
    //while (column1Section.firstChild) {
      //col1.appendChild(column1Section.firstChild);
    //}
  //}
  
  col1.prepend(col1Title);

  // Column 2 - Ora è una sezione che contiene componenti di testo
  const col2 = document.createElement('section');
  col2.className = 'u-col';
  col2.setAttribute('data-aue-label', 'Colonna 2');
  col2.setAttribute('data-aue-type', 'container');
  col2.setAttribute('data-aue-model', 'footer-column-2');
  
  const col2Title = document.createElement('h3');
  col2Title.innerHTML = ' ';
  
  // Aggiungi i contenuti della sezione 2 se presenti
  //if (column2Section) {
    // Invece di clonare l'intero nodo, trasferisci i suoi figli
    //while (column2Section.firstChild) {
      //col2.appendChild(column2Section.firstChild);
    //}
  //}
  
  col2.prepend(col2Title);
  
  const companyInfoDiv = document.createElement('div');
  companyInfoDiv.className = 'u-datisocietari';
  companyInfoDiv.innerHTML = companyInfo;
  companyInfoDiv.setAttribute('data-aue-label', 'Informazioni Societarie');
  companyInfoDiv.setAttribute('data-aue-type', 'richtext');
  companyInfoDiv.setAttribute('data-aue-prop', 'generalInfo_companyInfo');

  col2.appendChild(companyInfoDiv);

  // App section - Struttura a due colonne come nel design originale
  const appSection = document.createElement('div');
  appSection.className = 'u-app-section';
  
  // Prima colonna: Titolo, stores e QR code
  const appCol = document.createElement('div');
  appCol.className = 'u-col u-app';
  appCol.setAttribute('aria-label', 'App Unipol');
  
  const appTitleEl = document.createElement('h3');
  appTitleEl.innerHTML = appTitle;
  appTitleEl.setAttribute('data-aue-label', 'Titolo App');
  appTitleEl.setAttribute('data-aue-type', 'richtext');
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
  
  const qrImg = document.createElement('img');
  qrImg.alt = 'QR App Unipol';
  qrImg.src = qrCodeImage ? getDamImageUrl(qrCodeImage) : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%23fff'/%3E%3Crect x='0' y='0' width='96' height='96' fill='none' stroke='%23c9d3dc'/%3E%3Ctext x='50%' y='52%' font-family='Arial' font-size='10' text-anchor='middle' fill='%2390a3b5'%3EQR%3C/text%3E%3C/svg%3E";
  qrImg.setAttribute('data-aue-label', 'Immagine QR Code');
  qrImg.setAttribute('data-aue-type', 'reference');
  qrImg.setAttribute('data-aue-prop', 'appConfiguration_qrCodeImage');

  qrDiv.appendChild(qrImg);
  
  appCol.appendChild(appTitleEl);
  appCol.appendChild(storesDiv);
  appCol.appendChild(qrDiv);
  
  // Seconda colonna: Immagine del telefono
  const imageCol = document.createElement('div');
  imageCol.className = 'u-col u-image';
  
  const phoneImg = document.createElement('img');
  phoneImg.className = 'u-phone';
  phoneImg.alt = 'Anteprima app';
  phoneImg.src = phoneImage ? getDamImageUrl(phoneImage) : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='400'%3E%3Crect width='260' height='400' rx='22' ry='22' fill='%23f4f7fa' stroke='%23d8dee6'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='14' text-anchor='middle' fill='%2390a3b5'%3EPhone image%3C/text%3E%3C/svg%3E";
  phoneImg.setAttribute('data-aue-label', 'Immagine Telefono');
  phoneImg.setAttribute('data-aue-type', 'reference');
  phoneImg.setAttribute('data-aue-prop', 'appConfiguration_phoneImage');

  imageCol.appendChild(phoneImg);
  
  // Assembla le due colonne dell'app
  appSection.appendChild(appCol);
  appSection.appendChild(imageCol);

  columnsContainer.appendChild(col1);
  columnsContainer.appendChild(col2);
  columnsContainer.appendChild(appSection);
  
  mainWrap.appendChild(columnsContainer);
  mainSection.appendChild(mainWrap);

  // Bottom description
  const bottomSection = document.createElement('div');
  bottomSection.className = 'u-bottom';
  
  const bottomWrap = document.createElement('div');
  bottomWrap.className = 'u-wrap';
  
  const descriptionP = document.createElement('p');
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
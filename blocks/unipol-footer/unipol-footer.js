import { moveInstrumentation } from '../../scripts/scripts.js';
import { getDamImageUrl } from '../../config/dev-config.js';

export default function decorate(block) {
  const children = [...block.children];
  
  // Estrai i dati dai children del block seguendo l'ordine del JSON
  const description = children[0]?.textContent?.trim() || 'Unipol è un gruppo assicurativo, leader in Italia nei rami danni, in particolare nell\'RCAuto. Fortemente attivo anche nei rami Vita, occupa una posizione di assoluta preminenza nella graduatoria nazionale dei gruppi assicurativi per raccolta diretta, e serve oltre 16 milioni di clienti. La Compagnia opera attraverso la più grande rete agenziale d\'Italia, forte di circa 2.000 agenzie assicurative e oltre 5.200 subagenzie distribuite sul territorio nazionale.';
  
  // Social Configuration
  const socialLabel = children[1]?.textContent?.trim() || 'Seguici su';
  const facebookUrl = children[2]?.querySelector('a')?.href || 'https://www.facebook.com/UnipolAssicurazioni/?locale=it_IT';
  const instagramUrl = children[3]?.querySelector('a')?.href || 'https://www.instagram.com/unipolcorporate/?hl=en';
  const linkedinUrl = children[4]?.querySelector('a')?.href || 'https://it.linkedin.com/company/gruppo-unipol';
  const youtubeUrl = children[5]?.querySelector('a')?.href || 'https://www.youtube.com/@UnipolAssicurazioni';
  
  // Info Configuration
  const privacyUrl = children[6]?.querySelector('a')?.href || '#';
  const privacyLabel = children[7]?.textContent?.trim() || 'Privacy';
  const cookieUrl = children[8]?.querySelector('a')?.href || '#';
  const cookieLabel = children[9]?.textContent?.trim() || 'INFORMATIVA E GESTIONE COOKIE';
  const ivassUrl = children[10]?.querySelector('a')?.href || '#';
  const ivassLabel = children[11]?.textContent?.trim() || 'ACCESSO AREA RISERVATA IVASS 41/2018';
  const paymentUrl = children[12]?.querySelector('a')?.href || '#';
  const paymentLabel = children[13]?.textContent?.trim() || 'PAGAMENTO POLIZZE';
  const companyInfo = children[14]?.innerHTML || '<p><strong>Unipol Assicurazioni S.p.A.</strong><br>Sede Legale: Via Stalingrado, 45 40128 Bologna<br>Telefono: +39 051 5076111 - Fax: +39 051 5076666 - Mail PEC: unipol@pec.unipol.it</p><p>Capitale sociale i.v. € 3.365.292.408,03 - Registro delle Imprese di Bologna C.F. 00284160371 - P.IVA 03740811207 - R.E.A. 160304</p><p>Società iscritta all\'Albo Imprese di Assicurazione e Riassicurazione Sez. I n. 1.00183. Capogruppo del Gruppo Assicurativo Unipol iscritto all\'Albo delle società capogruppo al n. 046.</p>';
  
  // App Configuration
  const appTitle = children[15]?.innerHTML || 'Scarica o aggiorna l\'App<br>Unipol';
  const appStoreUrl = children[16]?.querySelector('a')?.href || '#';
  const googlePlayUrl = children[17]?.querySelector('a')?.href || '#';
  const qrCodeImage = children[18]?.querySelector('img')?.src || children[18]?.querySelector('a')?.href || '';
  const phoneImage = children[19]?.querySelector('img')?.src || children[19]?.querySelector('a')?.href || '';

  // Crea la struttura del footer seguendo l'esempio HTML fornito
  block.innerHTML = '';
  block.className = 'unipol-footer block';
  block.setAttribute('data-aue-label', 'Unipol Footer');
  block.setAttribute('data-aue-type', 'container');
  block.setAttribute('data-aue-model', 'unipol-footer');

  // Sezione 1: Descrizione generale
  const section1 = document.createElement('div');
  const section1Content = document.createElement('div');
  section1Content.textContent = description;
  section1Content.setAttribute('data-aue-label', 'Descrizione Azienda');
  section1Content.setAttribute('data-aue-type', 'richtext');
  section1Content.setAttribute('data-aue-prop', 'generalConfiguration_description');
  section1.appendChild(section1Content);

  // Sezione 2: Social Media
  const section2 = document.createElement('div');
  const section2Content = document.createElement('div');
  
  const socialLabelP = document.createElement('p');
  socialLabelP.textContent = socialLabel + ':';
  socialLabelP.setAttribute('data-aue-label', 'Label Social');
  socialLabelP.setAttribute('data-aue-type', 'text');
  socialLabelP.setAttribute('data-aue-prop', 'socialConfiguration_socialLabel');
  section2Content.appendChild(socialLabelP);
  
  // Social links
  const socialLinks = [
    { url: facebookUrl, prop: 'socialConfiguration_facebookUrl', label: 'Facebook' },
    { url: instagramUrl, prop: 'socialConfiguration_instagramUrl', label: 'Instagram' },
    { url: linkedinUrl, prop: 'socialConfiguration_linkedinUrl', label: 'LinkedIn' },
    { url: youtubeUrl, prop: 'socialConfiguration_youtubeUrl', label: 'YouTube' }
  ];
  
  socialLinks.forEach(social => {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = social.url;
    link.textContent = social.url;
    link.setAttribute('data-aue-label', `URL ${social.label}`);
    link.setAttribute('data-aue-type', 'text');
    link.setAttribute('data-aue-prop', social.prop);
    p.appendChild(link);
    section2Content.appendChild(p);
  });
  
  section2.appendChild(section2Content);

  // Sezione 3: Informazioni legali e utility
  const section3 = document.createElement('div');
  const section3Content = document.createElement('div');
  
  // Utility links
  const utilityLinks = [
    { url: privacyUrl, label: privacyLabel, urlProp: 'infoConfiguration_privacyUrl', labelProp: 'infoConfiguration_privacyLabel' },
    { url: cookieUrl, label: cookieLabel, urlProp: 'infoConfiguration_cookieUrl', labelProp: 'infoConfiguration_cookieLabel' },
    { url: ivassUrl, label: ivassLabel, urlProp: 'infoConfiguration_ivassUrl', labelProp: 'infoConfiguration_ivassLabel' },
    { url: paymentUrl, label: paymentLabel, urlProp: 'infoConfiguration_paymentUrl', labelProp: 'infoConfiguration_paymentLabel' }
  ];
  
  utilityLinks.forEach(util => {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = util.url;
    link.textContent = util.label + '.';
    link.setAttribute('data-aue-label', util.label);
    link.setAttribute('data-aue-type', 'text');
    link.setAttribute('data-aue-prop', util.urlProp);
    p.appendChild(link);
    section3Content.appendChild(p);
  });
  
  // Company info
  const companyInfoDiv = document.createElement('div');
  companyInfoDiv.innerHTML = companyInfo;
  companyInfoDiv.setAttribute('data-aue-label', 'Informazioni Societarie');
  companyInfoDiv.setAttribute('data-aue-type', 'richtext');
  companyInfoDiv.setAttribute('data-aue-prop', 'infoConfiguration_companyInfo');
  section3Content.appendChild(companyInfoDiv);
  
  section3.appendChild(section3Content);

  // Sezione 4: App
  const section4 = document.createElement('div');
  const section4Content = document.createElement('div');
  
  const appTitleP = document.createElement('p');
  appTitleP.innerHTML = appTitle + '.';
  appTitleP.setAttribute('data-aue-label', 'Titolo App');
  appTitleP.setAttribute('data-aue-type', 'richtext');
  appTitleP.setAttribute('data-aue-prop', 'appConfiguration_appTitle');
  section4Content.appendChild(appTitleP);
  
  // App Store links
  const appStoreP = document.createElement('p');
  const appStoreLink = document.createElement('a');
  appStoreLink.href = appStoreUrl;
  appStoreLink.textContent = 'App Store';
  appStoreLink.setAttribute('data-aue-label', 'URL App Store');
  appStoreLink.setAttribute('data-aue-type', 'text');
  appStoreLink.setAttribute('data-aue-prop', 'appConfiguration_appStoreUrl');
  appStoreP.appendChild(appStoreLink);
  section4Content.appendChild(appStoreP);
  
  const googlePlayP = document.createElement('p');
  const googlePlayLink = document.createElement('a');
  googlePlayLink.href = googlePlayUrl;
  googlePlayLink.textContent = 'Google Play';
  googlePlayLink.setAttribute('data-aue-label', 'URL Google Play');
  googlePlayLink.setAttribute('data-aue-type', 'text');
  googlePlayLink.setAttribute('data-aue-prop', 'appConfiguration_googlePlayUrl');
  googlePlayP.appendChild(googlePlayLink);
  section4Content.appendChild(googlePlayP);
  
  // QR Code
  const qrP = document.createElement('p');
  if (qrCodeImage) {
    const qrImg = document.createElement('img');
    qrImg.src = getDamImageUrl(qrCodeImage);
    qrImg.alt = 'QR Code App Unipol';
    qrImg.setAttribute('data-aue-label', 'Immagine QR Code');
    qrImg.setAttribute('data-aue-type', 'reference');
    qrImg.setAttribute('data-aue-prop', 'appConfiguration_qrCodeImage');
    qrP.appendChild(qrImg);
  } else {
    qrP.textContent = 'Immagine QR Code';
    qrP.setAttribute('data-aue-label', 'Immagine QR Code');
    qrP.setAttribute('data-aue-type', 'reference');
    qrP.setAttribute('data-aue-prop', 'appConfiguration_qrCodeImage');
  }
  section4Content.appendChild(qrP);
  
  // Phone Image
  const phoneP = document.createElement('p');
  if (phoneImage) {
    const phoneImg = document.createElement('img');
    phoneImg.src = getDamImageUrl(phoneImage);
    phoneImg.alt = 'Anteprima App';
    phoneImg.setAttribute('data-aue-label', 'Immagine Telefono');
    phoneImg.setAttribute('data-aue-type', 'reference');
    phoneImg.setAttribute('data-aue-prop', 'appConfiguration_phoneImage');
    phoneP.appendChild(phoneImg);
  } else {
    phoneP.textContent = 'Immagine Telefono';
    phoneP.setAttribute('data-aue-label', 'Immagine Telefono');
    phoneP.setAttribute('data-aue-type', 'reference');
    phoneP.setAttribute('data-aue-prop', 'appConfiguration_phoneImage');
  }
  section4Content.appendChild(phoneP);
  
  section4.appendChild(section4Content);

  // Assembla tutte le sezioni
  block.appendChild(section1);
  block.appendChild(section2);
  block.appendChild(section3);
  block.appendChild(section4);

  // Move instrumentation for AEM compatibility
  moveInstrumentation(block);
}
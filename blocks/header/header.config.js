export const HEADER_CONFIG = {
  leftLinks: [
    { href: '#', text: 'PRIVATI', aria: 'Privati' },
    { href: '#', text: 'AZIENDE', aria: 'Aziende' }
  ],
  rightLinks: [
    {
      img: '/content/dam/unipoleds/b_trova_agenzia.svg',
      alt: 'Icona Trova Agenzia',
      href: '#',
      text: 'Trova Agenzia',
      aria: 'Trova Agenzia'
    },
    {
      img: '/content/dam/unipoleds/b_servizio_clienti.svg',
      alt: 'Icona Assistenza',
      href: '#',
      text: 'Assistenza e sinistri',
      aria: 'Assistenza e sinistri'
    }
  ],
  popup: {
    logo: '/content/dam/unipoleds/LogoGruppoUnipolSai.png',
    triggerText: 'Unipol Sito Cliente ⌵',
    cancelText: 'Unipol Sito Cliente',
    confirmText: 'Gruppo Unipol',
    confirmHref: '#'
  },
  bottomImage: {
    src: '/content/dam/unipoleds/logo_unipol.svg',
    alt: 'Home',
    href: '#',
    width: 200,
    height: 55,
    aria: 'Vai alla pagina Home'
  },
  firstListItemIcon: {
    src: '/content/dam/unipoleds/bicolor_unica.svg',
    alt: 'Icona primo link'
  },
  bottomRightButtons: [
    {
      type: 'search',
      aria: 'Apri ricerca',
      imgSrc: '/content/dam/unipoleds/b_search.svg',
      imgAlt: 'Icona ricerca',
      href: '#'
    },
    {
      type: 'cart',
      aria: 'Apri carrello',
      imgSrc: '/content/dam/unipoleds/b_carrello.svg',
      imgAlt: 'Icona carrello',
      href: '#'
    },
    {
      type: 'custom',
      aria: 'Area riservata',
      imgSrc: '/content/dam/unipoleds/b_users.svg',
      imgAlt: 'Icona area riservata',
      href: '#',
      text: 'Area riservata'
    }
  ],
  hambUserArea: {
    href: '#',
    text: 'Area riservata',
    aria: 'Area riservata',
    imgSrc: '/content/dam/unipoleds/b_users.svg',
    imgAlt: 'Alt' //DA CAMBIARE
  },
  mobileMenuItemIcons: [
    { src: '/content/dam/unipoleds/w_unica.svg', alt: 'Icona item 1' },
    { src: '/content/dam/unipoleds/a_veicoli_mobilita.svg', alt: 'Icona item 2' },
    { src: '/content/dam/unipoleds/a_casa_famiglia.svg', alt: 'Icona item 3' },
    { src: '/content/dam/unipoleds/a_persona.svg', alt: 'Icona item 4' },
    { src: '/content/dam/unipoleds/a_risparmio.svg', alt: 'Icona item 5' },
    { src: '', alt: 'Icona item 6' },
  ]
};

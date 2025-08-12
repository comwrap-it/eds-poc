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
      imgAlt: 'Alt a.ris',
      href: '#',
      text: 'Area riservata'
    }
  ]
};

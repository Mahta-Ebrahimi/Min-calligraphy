/**
 * Central place to edit studio details, copy and links.
 * Text shown to visitors has an English (`en`) and Danish (`da`) version.
 * Interface labels (buttons, headings) live in src/i18n/en.ts and src/i18n/da.ts.
 */
export const siteConfig = {
  name: 'Mahta Art Studio',
  /**
   * Logo images, made from the original artwork by scripts/process-logo.mjs.
   * `image` keeps the original ink colours (light mode); `imageOnDark` is the same artwork in light ivory.
   */
  logo: {
    image: '/images/mahta-logo.webp',
    imageOnDark: '/images/mahta-logo-light.webp',
    width: 1000,
    height: 533,
  },
  /** Homepage title and default meta description (also used for social sharing). */
  seo: {
    title: {
      en: 'Mahta Art Studio | Original Art, Calligraphy & Creative Works',
      da: 'Mahta Art Studio | Original kunst, kalligrafi og kreative værker',
    },
    description: {
      en: 'Explore original artwork, calligraphy, paintings, and creative projects by Mahta Art Studio. Discover unique artistic creations and custom commissions.',
      da: 'Udforsk original kunst, kalligrafi, malerier og kreative projekter fra Mahta Art Studio. Oplev unikke kunstneriske værker og bestillinger efter dine ønsker.',
    },
  },
  /** Short introduction used in the homepage hero. */
  description: {
    en: 'Original Persian calligraphy in classical and contemporary styles — hand-written with reed pen and ink on handmade paper.',
    da: 'Original persisk kalligrafi i klassiske og moderne stilarter — skrevet i hånden med rørpen og blæk på håndlavet papir.',
  },
  tagline: { en: 'Where ink becomes breath', da: 'Hvor blæk bliver til åndedræt' },
  url: 'https://example.com',
  email: 'mahta.art.studio@gmail.com',
  /** Google Tag Manager container ID, e.g. 'GTM-ABC1234'. Leave empty to turn Tag Manager off. */
  tagManagerId: '',
  location: { en: 'Copenhagen, Denmark', da: 'København, Danmark' },
  responseTime: { en: 'within 3 working days', da: 'inden for 3 hverdage' },
  social: {
    instagram: 'https://www.instagram.com/mahta_art_studio/',
    instagramHandle: '@mahta_art_studio',
  },
  artist: {
    name: 'Mahta',
    portrait: '', // e.g. '/images/artist/portrait.jpg'
    studio: '', // e.g. '/images/studio/desk.jpg'
    intro: {
      en: 'I write Persian calligraphy the way it has been taught for centuries — with a cut reed, hand-mixed ink and a great deal of patience.',
      da: 'Jeg skriver persisk kalligrafi, sådan som den er blevet undervist i gennem århundreder — med en tilskåret rørpen, håndblandet blæk og en stor portion tålmodighed.',
    },
    bio: {
      en: [
        'My path into calligraphy began with the poetry my family read aloud — Hafez at the dinner table, Rumi in the margins of school notebooks. The letters were always as beautiful to me as the words.',
        'I trained in the classical master–student tradition, copying the exercises of the masters line by line until the proportions of each letter lived in my hand. The classical scripts remain my home, though I also work in freer contemporary compositions.',
        'Today I create original pieces and private commissions from my studio, bringing a centuries-old art into contemporary homes — names, verses and words that matter to the people who live with them.',
      ],
      da: [
        'Min vej ind i kalligrafien begyndte med den poesi, min familie læste højt — Hafez ved middagsbordet, Rumi i margenen af skolehæfterne. Bogstaverne var altid lige så smukke for mig som ordene.',
        'Jeg er uddannet i den klassiske mester–elev-tradition, hvor jeg kopierede mestrenes øvelser linje for linje, indtil hvert bogstavs proportioner sad i hånden. De klassiske skrifter er stadig mit hjem, men jeg arbejder også i friere, moderne kompositioner.',
        'I dag skaber jeg originale værker og private bestillingsværker fra mit atelier og bringer en århundreder gammel kunst ind i nutidens hjem — navne, vers og ord, der betyder noget for dem, der lever med dem.',
      ],
    },
  },
  milestones: [
    {
      year: { en: '2012', da: '2012' },
      text: {
        en: 'Began formal calligraphy training in the master–student tradition.',
        da: 'Begyndte en formel uddannelse i kalligrafi i mester–elev-traditionen.',
      },
    },
    {
      year: { en: '2016', da: '2016' },
      text: { en: 'Expanded practice to further classical scripts.', da: 'Udvidede praksis til flere klassiske skrifter.' },
    },
    {
      year: { en: '2019', da: '2019' },
      text: { en: 'First solo exhibition of calligraphic works.', da: 'Første soloudstilling med kalligrafiske værker.' },
    },
    {
      year: { en: '2022', da: '2022' },
      text: {
        en: 'Opened the studio to private and corporate commissions.',
        da: 'Åbnede atelieret for private bestillinger og erhvervsbestillinger.',
      },
    },
    {
      year: { en: 'Today', da: 'I dag' },
      text: {
        en: 'Creating original works and bespoke pieces for collectors worldwide.',
        da: 'Skaber originale værker og unikke bestillinger til samlere over hele verden.',
      },
    },
  ],
  materials: [
    {
      name: { en: 'Reed pen', da: 'Rørpen' },
      text: {
        en: 'Reed pens, cut and shaped by hand for each script and scale.',
        da: 'Rørpenne, tilskåret og formet i hånden til hver skrift og størrelse.',
      },
    },
    {
      name: { en: 'Soot ink', da: 'Sodblæk' },
      text: {
        en: 'Traditional soot-based ink, prepared and aged in the studio.',
        da: 'Traditionelt sodbaseret blæk, tilberedt og modnet i atelieret.',
      },
    },
    {
      name: { en: 'Burnished paper', da: 'Poleret papir' },
      text: {
        en: 'Handmade paper burnished with starch for a silken surface.',
        da: 'Håndlavet papir poleret med stivelse til en silkeblød overflade.',
      },
    },
    {
      name: { en: 'Gold leaf', da: 'Bladguld' },
      text: {
        en: 'Applied for illumination and borders on selected works.',
        da: 'Bruges til illumination og bordurer på udvalgte værker.',
      },
    },
  ],
  process: [
    {
      title: { en: 'Conversation', da: 'Samtale' },
      text: {
        en: 'We discuss the words, the space and the feeling you want the piece to hold.',
        da: 'Vi taler om ordene, rummet og den følelse, værket skal rumme.',
      },
    },
    {
      title: { en: 'Sketch & composition', da: 'Skitse og komposition' },
      text: {
        en: 'I prepare compositional studies and share them for your feedback.',
        da: 'Jeg udarbejder kompositionsstudier og deler dem, så du kan give feedback.',
      },
    },
    {
      title: { en: 'The final piece', da: 'Det færdige værk' },
      text: {
        en: 'Written by hand on prepared paper, then finished, signed and dated.',
        da: 'Skrevet i hånden på forberedt papir, derefter færdiggjort, signeret og dateret.',
      },
    },
    {
      title: { en: 'Delivery', da: 'Levering' },
      text: {
        en: 'Carefully packed and shipped insured, framed or unframed.',
        da: 'Omhyggeligt pakket og sendt forsikret, med eller uden ramme.',
      },
    },
  ],
}

/** Main navigation. Labels come from the `nav` section of the translation files. */
export const navItems = [
  { to: '/', key: 'home' },
  { to: '/gallery', key: 'gallery' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
] as const

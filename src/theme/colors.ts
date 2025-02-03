// Generated Colors
// https://www.tints.dev/
//

export const SouvDefault = {
  theme: {
    default: '#1A202C',

    50: '#EFF1F6',
    100: '#DFE3EC',
    200: '#C2CADB',
    300: '#A2AFC8',
    400: '#8596B7',
    500: '#657AA4',
    600: '#506287',
    700: '#3F4D6A',
    800: '#2C364A',
    900: '#1A202C',
    950: '#0D1016',
  },

  gray: {
    default: '#757D8A',

    50: '#F4F5F6',
    100: '#ECEDEF',
    200: '#D6D8DC',
    300: '#BABEC4',
    400: '#9CA1AB',
    500: '#757D8A',
    600: '#69717C',
    700: '#5B626C',
    800: '#4B5058',
    900: '#363A3F',
    950: '#25282C',

    dark: '#2F3237',
    light: '#D8DBDE',
    medium: '#757D8A',
  },

  info: {
    50: '#E8F2FC',
    100: '#BFD9F8',
    200: '#95C1F3',
    300: '#6CA9EF',
    400: '#4290EA',
    500: '#1873DC',
    600: '#1460B8',
    700: '#0F488A',
    800: '#0A305C',
    900: '#05182E',
    950: '#05182E',
  },

  success: {
    50: '#E5FFF2',
    100: '#B8FFDC',
    200: '#8AFFC5',
    300: '#5CFFAF',
    400: '#2EFF98',
    500: '#00DA6F',
    600: '#00CC68',
    700: '#00994E',
    800: '#006634',
    900: '#00331A',
    950: '#00331A',
  },
  warning: {
    50: '#FFF8E5',
    100: '#FFEBB8',
    200: '#FFDD8A',
    300: '#FFD05C',
    400: '#FFC32E',
    500: '#F5AF00',
    600: '#CC9200',
    700: '#996D00',
    800: '#664900',
    900: '#332400',
    950: '#332400',
  },

  error: {
    50: '#FCE9E9',
    100: '#F7C0C0',
    200: '#F19898',
    300: '#EC706F',
    400: '#E64747',
    500: '#E01F1E',
    600: '#B41918',
    700: '#871312',
    800: '#5A0C0C',
    900: '#2D0606',
    950: '#2D0606',
  },

  tag: {
    assignment: '#B02B2B',
    document: '#154479',
    newsReport: '#D34F23',
    note: '#36FC79',
    tp: '#AE1370',
    tpHeader: '#1a202c',
  },
}

export const SouvAccount = {
  ...SouvDefault,
  // theme: {
  //   50: '#EEEAFB',
  //   100: '#D0C3F3',
  //   200: '#B29DEB',
  //   300: '#9477E4',
  //   400: '#7551DC',
  //   500: '#572AD5',
  //   600: '#4622AA',
  //   700: '#341980',
  //   800: '#231155',
  //   900: '#11082B',
  //   950: '#11082B',
  // },
}

export const SouvLive = {
  ...SouvDefault,
  theme: {
    default: '#6941d9',

    50: '#F5F2FC',
    100: '#EBE5FA',
    200: '#D7CCF5',
    300: '#BFAEEF',
    400: '#9E84E6',
    500: '#6941D9',
    600: '#5B2FD5',
    700: '#5127C4',
    800: '#4421A6',
    900: '#2A1466',
    950: '#1C0E44',

    dark: '#231155',
    light: '#D0C3F3',
  },
}

export const SouvMam = {
  ...SouvDefault,
  theme: {
    default: '#39A36A',

    50: '#F0FAF4',
    100: '#E1F4EA',
    200: '#B7E6CD',
    300: '#8ED7B0',
    400: '#51C286',
    500: '#39A36A',
    600: '#349360',
    700: '#2D8054',
    800: '#256A45',
    900: '#1C4F34',
    950: '#123523',
  },
}

export const SouvSocial = {
  ...SouvDefault,
  theme: {
    default: '#F7931E',

    50: '#FEF8F0',
    100: '#FEEEDD',
    200: '#FDDEBA',
    300: '#FBC88E',
    400: '#F9B261',
    500: '#F7931E',
    600: '#E77F08',
    700: '#CA6F07',
    800: '#A75C06',
    900: '#7B4404',
    950: '#542E03',
  },
}

export const SouvJobs = {
  ...SouvDefault,
  theme: {
    default: '#38B2AC',

    50: '#EFFAFA',
    100: '#DCF4F3',
    200: '#B9E9E7',
    300: '#8BDAD6',
    400: '#5CCCC6',
    500: '#38B2AC',
    600: '#33A39D',
    700: '#2C8C87',
    800: '#257470',
    900: '#1A514F',
    950: '#143E3C',
  },
}

export const getThemeColor = (app: 'jobs'|'account'|'live'|'reporter'|'mam'|'social'|'souv', key: keyof (typeof SouvDefault)['theme']) => {
  switch (app) {
    case 'jobs':
      return SouvJobs.theme[key]
    case 'account':
      return SouvAccount.theme[key]
    case 'live':
    case 'reporter':
      return SouvLive.theme[key]
    case 'mam':
      return SouvMam.theme[key]
    case 'social':
      return SouvSocial.theme[key]
    case 'souv':
    default:
      return SouvDefault.theme[key]
  }
}

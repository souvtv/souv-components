import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { SouvDefault } from './colors'

const baseConfig = defineConfig({
  conditions: {
    off: '&:is([data-state=off])',
    on: '&:is([data-state=on])',
    interactive: '&:is([data-state=interactive])',
  },

  globalCss: {
    html: {
      backgroundColor: 'bg',

      colorPalette: 'theme',

      fontSmooth: 'antialiased',
      scrollBehavior: 'smooth',
    },
  },

  theme: {
    breakpoints: {
      base: '0em',
      desktop: '96em',
      laptop: '62em',
      mobile: '30em',
      tablet: '48em',
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _dark: '#070707', _light: '#f8fafc' } },

          //   emphasized: { value: { _dark: '{colors.theme.800}', _light: '{colors.theme.200}' } },
          //   muted: { value: { _dark: 'gray.900', _light: 'gray.100' } },
          //   subtle: { value: { _dark: 'gray.950', _light: 'gray.50' } },
          //   // cardLive: { value: { _dark: '{colors.gray.950}', _light: '{colors.gray.50}' } },
        },

        error: {
          contrast: {
            value: { _dark: 'white', _light: 'white' },
          },
          emphasized: {
            value: { _dark: '{colors.red.700}', _light: '{colors.red.300}' },
          },
          fg: {
            value: { _dark: '{colors.red.300}', _light: '{colors.red.700}' },
          },
          focusRing: {
            value: { _dark: '{colors.red.600}', _light: '{colors.red.600}' },
          },
          muted: {
            value: { _dark: '{colors.red.800}', _light: '{colors.red.200}' },
          },
          solid: {
            value: { _dark: '{colors.red.600}', _light: '{colors.red.600}' },
          },
          subtle: {
            value: { _dark: '{colors.red.900}', _light: '{colors.red.100}' },
          },
        },

        info: {
          contrast: {
            value: { _dark: 'white', _light: 'white' },
          },
          emphasized: {
            value: { _dark: '{colors.blue.700}', _light: '{colors.blue.300}' },
          },
          fg: {
            value: { _dark: '{colors.blue.300}', _light: '{colors.blue.700}' },
          },
          focusRing: {
            value: { _dark: '{colors.blue.600}', _light: '{colors.blue.600}' },
          },
          muted: {
            value: { _dark: '{colors.blue.800}', _light: '{colors.blue.200}' },
          },
          solid: {
            value: { _dark: '{colors.blue.600}', _light: '{colors.blue.600}' },
          },
          subtle: {
            value: { _dark: '{colors.blue.900}', _light: '{colors.blue.100}' },
          },
        },

        success: {
          contrast: {
            value: { _dark: 'white', _light: 'white' },
          },
          emphasized: {
            value: { _dark: '{colors.green.700}', _light: '{colors.green.300}' },
          },
          fg: {
            value: { _dark: '{colors.green.300}', _light: '{colors.green.700}' },
          },
          focusRing: {
            value: { _dark: '{colors.green.600}', _light: '{colors.green.600}' },
          },
          muted: {
            value: { _dark: '{colors.green.800}', _light: '{colors.green.200}' },
          },
          solid: {
            value: { _dark: '{colors.green.600}', _light: '{colors.green.600}' },
          },
          subtle: {
            value: { _dark: '{colors.green.900}', _light: '{colors.green.100}' },
          },
        },

        theme: {
          contrast: {
            value: { _dark: 'white', _light: 'white' },
          },
          emphasized: {
            value: { _dark: '{colors.theme.700}', _light: '{colors.theme.300}' },
          },
          fg: {
            value: { _dark: '{colors.theme.300}', _light: '{colors.theme.700}' },
          },
          focusRing: {
            value: { _dark: '{colors.theme.600}', _light: '{colors.theme.600}' },
          },
          muted: {
            value: { _dark: '{colors.theme.800}', _light: '{colors.theme.200}' },
          },
          solid: {
            value: { _dark: '{colors.theme.600}', _light: '{colors.theme.600}' },
          },
          subtle: {
            value: { _dark: '{colors.theme.900}', _light: '{colors.theme.100}' },
          },
        },

        warning: {
          contrast: {
            value: { _dark: 'black', _light: 'white' },
          },
          emphasized: {
            value: { _dark: '{colors.orange.700}', _light: '{colors.orange.300}' },
          },
          fg: {
            value: { _dark: '{colors.orange.300}', _light: '{colors.orange.700}' },
          },
          focusRing: {
            value: { _dark: '{colors.orange.500}', _light: '{colors.orange.600}' },
          },
          muted: {
            value: { _dark: '{colors.orange.800}', _light: '{colors.orange.200}' },
          },
          solid: {
            value: { _dark: '{colors.orange.500}', _light: '{colors.orange.600}' },
          },
          subtle: {
            value: { _dark: '{colors.orange.900}', _light: '{colors.orange.100}' },
          },
        },
      },
    },
    textStyles: {
      body: {
        value: {
          fontSize: '1rem',
        },
      },
      bodyBold: {
        value: {
          fontSize: '1rem',
          fontWeight: 'bold',
        },
      },
      body2xs: {
        value: {
          fontSize: '0.75rem',
        },
      },
      bodyxs: {
        value: {
          fontSize: '0.875rem',
        },
      },
      subtitle: {
        value: {
          fontSize: '1rem',
          fontWeight: 'semibold',
        },
      },
    },
    tokens: {
      fonts: {
        body: {
          value: "'Roboto', sans-serif",
        },
      },
      colors: {
        blue: {
          // Info
          100: { value: SouvDefault.info[100] },
          200: { value: SouvDefault.info[200] },
          300: { value: SouvDefault.info[300] },
          400: { value: SouvDefault.info[400] },
          50: { value: SouvDefault.info[50] },
          500: { value: SouvDefault.info[500] },
          600: { value: SouvDefault.info[600] },
          700: { value: SouvDefault.info[700] },
          800: { value: SouvDefault.info[800] },
          900: { value: SouvDefault.info[900] },
          950: { value: SouvDefault.info[950] },
          //
        },

        gray: {
          100: { value: SouvDefault.gray[100] },
          200: { value: SouvDefault.gray[200] },
          300: { value: SouvDefault.gray[300] },
          400: { value: SouvDefault.gray[400] },
          50: { value: SouvDefault.gray[50] },
          500: { value: SouvDefault.gray[500] },
          600: { value: SouvDefault.gray[600] },
          700: { value: SouvDefault.gray[700] },
          800: { value: SouvDefault.gray[800] },
          900: { value: SouvDefault.gray[900] },
          950: { value: SouvDefault.gray[950] },

          // dark: '#2F3237',
          // default: '#1c1e21',
          // light: '#D8DBDE',
          // medium: '#757D8A',
        },

        green: {
          // Success
          100: { value: SouvDefault.success[100] },
          200: { value: SouvDefault.success[200] },
          300: { value: SouvDefault.success[300] },
          400: { value: SouvDefault.success[400] },
          50: { value: SouvDefault.success[50] },
          500: { value: SouvDefault.success[500] },
          600: { value: SouvDefault.success[600] },
          700: { value: SouvDefault.success[700] },
          800: { value: SouvDefault.success[800] },
          900: { value: SouvDefault.success[900] },
          950: { value: SouvDefault.success[950] },
          //
        },

        orange: {
          // Warning
          100: { value: SouvDefault.warning[100] },
          200: { value: SouvDefault.warning[200] },
          300: { value: SouvDefault.warning[300] },
          400: { value: SouvDefault.warning[400] },
          50: { value: SouvDefault.warning[50] },
          500: { value: SouvDefault.warning[500] },
          600: { value: SouvDefault.warning[600] },
          700: { value: SouvDefault.warning[700] },
          800: { value: SouvDefault.warning[800] },
          900: { value: SouvDefault.warning[900] },
          950: { value: SouvDefault.warning[950] },
          //
        },
        red: {
          // Error
          100: { value: SouvDefault.error[100] },
          200: { value: SouvDefault.error[200] },
          300: { value: SouvDefault.error[300] },
          400: { value: SouvDefault.error[400] },
          50: { value: SouvDefault.error[50] },
          500: { value: SouvDefault.error[500] },
          600: { value: SouvDefault.error[600] },
          700: { value: SouvDefault.error[700] },
          800: { value: SouvDefault.error[800] },
          900: { value: SouvDefault.error[900] },
          950: { value: SouvDefault.error[950] },
          //
        },

        theme: {
          // Theme
          100: { value: SouvDefault.theme[100] },
          200: { value: SouvDefault.theme[200] },
          300: { value: SouvDefault.theme[300] },
          400: { value: SouvDefault.theme[400] },
          50: { value: SouvDefault.theme[50] },
          500: { value: SouvDefault.theme[500] },
          600: { value: SouvDefault.theme[600] },
          700: { value: SouvDefault.theme[700] },
          800: { value: SouvDefault.theme[800] },
          900: { value: SouvDefault.theme[900] },
          950: { value: SouvDefault.theme[950] },
          //
        },
      },
      spacing: {
        0.5: { value: '0.125rem' },
        1: { value: '0.25rem' },
        1.5: { value: '0.375rem' },
        2: { value: '0.5rem' },
        2.5: { value: '0.625rem' },
        3: { value: '0.75rem' },
        3.5: { value: '0.875rem' },
        4: { value: '1rem' },
        4.5: { value: '1.125rem' },
        5: { value: '1.25rem' },
        6: { value: '1.5rem' },
        7: { value: '1.75rem' },
        8: { value: '2rem' },
        9: { value: '2.25rem' },
        10: { value: '2.5rem' },
        11: { value: '2.75rem' },
        12: { value: '3rem' },
        14: { value: '3.5rem' },
        16: { value: '4rem' },
        20: { value: '5rem' },
        24: { value: '6rem' },
        28: { value: '7rem' },
        32: { value: '8rem' },
        36: { value: '9rem' },
        40: { value: '10rem' },
        44: { value: '11rem' },
        48: { value: '12rem' },
        52: { value: '13rem' },
        56: { value: '14rem' },
        60: { value: '15rem' },
        64: { value: '16rem' },
        72: { value: '18rem' },
        80: { value: '20rem' },
        96: { value: '24rem' },
      },
    },
  },
})

export const BaseThemeConfig = baseConfig
export const BaseTheme = createSystem(defaultConfig, baseConfig)
export default BaseTheme

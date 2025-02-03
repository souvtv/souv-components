import { defineRecipe } from '@chakra-ui/react'

export const HeadingRecipe = defineRecipe({
  base: {},
  defaultVariants: {
    // variant: 'subtitle',
  },

  variants: {
    size: {
      body: {
        fontSize: '1rem',
        fontWeight: 'normal',
      },
      body2xs: {
        fontSize: '0.75rem',
        fontWeight: 'normal',
      },
      bodyxs: {
        fontSize: '0.875rem',
        fontWeight: 'normal',
      },
      h1: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: '2rem',
      },
      h5: {
        fontSize: '1.5rem',
      },
      h6: {
        fontSize: '1.25rem',
      },
      subtitle: {
        fontSize: '1rem',
        fontWeight: 'semibold',
      },
      //
    },
  },
})

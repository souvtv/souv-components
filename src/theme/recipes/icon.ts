import { defineRecipe } from '@chakra-ui/react'

export const IconRecipe = defineRecipe({
  base: {},
  defaultVariants: {
    // variant: 'medium',
  },

  variants: {
    size: {
      '3xl': { boxSize: '9' },
      '4xl': { boxSize: '10' },
    },
  },
})

import { defineSlotRecipe } from '@chakra-ui/react'
import { tabsAnatomy } from '@chakra-ui/react/anatomy'

export const TabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  variants: {
    variant: {
      solid: {
        trigger: {
          _selected: {
            bg: 'colorPalette.emphasized',
            color: 'colorPalette.fg',
          },
          borderRadius: 'var(--tabs-trigger-radius)',
          color: 'fg',
        },
      },
    },
  },
})

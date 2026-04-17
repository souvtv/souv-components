// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { Button } from '@chakra-ui/react'

import { Menu, MenuItemType } from '../menu'

interface Props {
  width?: string
  selectedLabel?: string
  items?: MenuItemType[]
  loading?: boolean
  disabled?: boolean
}

export const SelectorWK = ({ width = '5rem', items = [], selectedLabel, disabled, loading }: Props) => (
  <Menu items={items}>
    <Button w={width} variant={'solid'} disabled={disabled} loading={loading}>
      {selectedLabel}
    </Button>
  </Menu>
)

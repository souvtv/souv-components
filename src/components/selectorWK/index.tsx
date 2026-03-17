import { Button } from '@chakra-ui/react'

import { Menu, MenuItemType } from '../menu'

interface Props {
  width?: string
  selectedLabel?: string
  items?: MenuItemType[]
  loading?: boolean
}

export const SelectorWK = ({ width = '5rem', items = [], selectedLabel, loading }: Props) => (
  <Menu items={items}>
    <Button w={width} variant={'solid'} disabled={loading} loading={loading || !selectedLabel}>
      {selectedLabel}
    </Button>
  </Menu>
)

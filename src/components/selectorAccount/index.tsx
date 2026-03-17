import { Button } from '@chakra-ui/react'
import { LuUserRound } from 'react-icons/lu'

import { Menu, MenuItemType } from '../menu'

interface Props {
  selectedLabel?: string
  items?: MenuItemType[]
  loading?: boolean
}

export const SelectorAccount = ({ selectedLabel, items, loading }: Props) => (
  <Menu items={items}>
    <Button
      maxW={'15rem'}
      variant={'ghost'}
      disabled={loading}
      loading={!selectedLabel || loading}
      justifyContent={'start'}
      whiteSpace={'nowrap'}
      overflow={'hidden'}
      textOverflow={'elipsis'}
    >
      <LuUserRound />
      {selectedLabel}
    </Button>
  </Menu>
)

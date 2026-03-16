import { useCallback, useEffect } from 'react'
import { Tabs, HStack } from '@chakra-ui/react'

import type { FlexProps, TabsTriggerProps, TabsRootProps, StackProps } from '@chakra-ui/react'

import { Row } from '../row'

import { useLayoutAppContext } from '.'

const Root = (p: FlexProps) => (
  <Row w={'full'} justify={'space-between'} align={'center'} overflow={'hidden'} gap={'1'} flexWrap={'wrap'}>
    {p.children}
  </Row>
)

const Container = (p: StackProps) => (
  <HStack minW={0} overflow={'auto'} {...p}>
    {p.children}
  </HStack>
)

const List = ({ children, ...p }: TabsRootProps) => {
  const { getMatchedPath } = useLayoutAppContext()

  return (
    <Tabs.Root variant={'solid'} colorPalette={'gray'} {...p} value={getMatchedPath()}>
      <Tabs.List>{children}</Tabs.List>
    </Tabs.Root>
  )
}

const Item = ({
  pathMatch: _pathMatch,
  matchEnd,
  ...p
}: TabsTriggerProps & { pathMatch?: string; matchEnd?: boolean }) => {
  const { onNavigate, onCreatePath } = useLayoutAppContext()

  const path = p.value
  const pathMatch = _pathMatch || p.value

  const handleSelectRoute = useCallback(() => {
    onNavigate?.(path)
  }, [path, onNavigate])

  const onAuxClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.button !== 1) return // 1 = middle
      e.preventDefault()
      e.stopPropagation()
      window.open(path, '_blank', 'noopener,noreferrer')
    },
    [path],
  )

  useEffect(() => {
    onCreatePath?.(pathMatch, matchEnd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchEnd, pathMatch])

  return (
    <Tabs.Trigger onAuxClick={onAuxClick} onClick={handleSelectRoute} {...p} value={pathMatch}>
      {p.children}
    </Tabs.Trigger>
  )
}

export const HeaderRoutes = {
  Container,
  Item,
  List,
  Root,
}

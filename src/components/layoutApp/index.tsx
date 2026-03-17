import { Box, Grid, GridItem, Center, Separator as ChakraSeparator } from '@chakra-ui/react'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

import type { GridProps, GridItemProps, SeparatorProps } from '@chakra-ui/react'

import { Column } from '../column'
import { matchPath } from '../../helpers/routes'

import { HeaderMain } from './HeaderMain'
import { HeaderRoutes } from './HeaderRoutes'
import { AppItem, AppMenu } from './AppMenu'

const defMaxW = '1440px'

interface Props {
  noContentPadding?: boolean
  maxW?: string
  avatarName?: string
  avatarUrl?: string
  children?: React.ReactNode
  baseUrl?: string
  onLoadApps?: (defaultApps: AppItem[]) => AppItem[]
  onNavigate?: (path: string) => void
}

const LayoutAppContext = createContext<
  | (Props & {
      baseUrl: string
      paths: string[]
      getMatchedPath: () => string | undefined
      onCreatePath?: (path: string, matchEnd?: boolean) => void
    })
  | null
>(null)

export const useLayoutAppContext = () => {
  const ctx = useContext(LayoutAppContext)
  if (!ctx) {
    throw new Error('Use inside LayoutApp.Root')
  }
  return ctx
}

export const LayoutAppRoot = ({
  maxW,
  noContentPadding,
  avatarUrl,
  avatarName,
  baseUrl,
  onNavigate,
  onLoadApps,
  ...p
}: GridProps & Props) => {
  const [paths, setPaths] = useState<string[]>([])
  const [pathsNoMachEnd, setPathsNoMachEnd] = useState<string[]>([])

  const getBaseUrl = useCallback(() => {
    const def = 'https://api.souv.tv'

    if (baseUrl) {
      return baseUrl
    } else if (typeof BASE_URL !== 'undefined') {
      return BASE_URL || def
    } else if (typeof process !== 'undefined' && process.env.BASE_URL) {
      return process.env.BASE_URL || def
    }

    return def
  }, [baseUrl])

  const onCreatePath = useCallback((path: string, matchEnd: boolean = true) => {
    setPaths(prev => {
      const _path = path?.trim()
      if (_path) {
        const set = new Set(prev)
        set.add(_path)

        // if matchEnd is false, it means the path is a prefix and should not be used for exact matching
        if (!matchEnd) {
          setPathsNoMachEnd(prev => {
            const set = new Set(prev)
            set.add(_path)
            return Array.from(set)
          })
        }
        //

        return Array.from(set)
      }

      return prev
    })
  }, [])

  const getMatchedPath = useCallback(() => {
    for (const path of paths) {
      const noMachEnd = pathsNoMachEnd.includes(path)
      const match = matchPath({ end: !noMachEnd, path }, window.location.pathname)

      if (match) {
        return path
      }
    }
  }, [paths, pathsNoMachEnd])

  const value = useMemo(
    () => ({
      avatarName,
      avatarUrl,
      baseUrl: getBaseUrl(),
      getMatchedPath,
      maxW,
      noContentPadding,
      onCreatePath,
      onLoadApps,
      onNavigate,
      paths,
    }),
    [
      maxW,
      paths,
      avatarUrl,
      avatarName,
      noContentPadding,
      getBaseUrl,
      getMatchedPath,
      onCreatePath,
      onNavigate,
      onLoadApps,
    ],
  )
  return (
    <LayoutAppContext.Provider value={value}>
      <Grid
        display={'grid'}
        overflow={'hidden'}
        w={'100vw'}
        h={'100vh'}
        maxWidth={'100vw'}
        maxHeight={'100vh'}
        gap={noContentPadding ? '0px' : '0.5rem'}
        gridTemplateRows={`minmax(4.6rem, max-content) minmax(0, 1fr)`}
        gridTemplateColumns={`100vw`}
        gridTemplateAreas={`
  'header'
  'content'
  `}
        {...p}
      />
    </LayoutAppContext.Provider>
  )
}

const LayoutAppHeader = (p: GridItemProps) => {
  const { maxW } = useLayoutAppContext()

  return (
    <GridItem h={'full'} w={'full'} gridArea={'header'} {...p}>
      <Center w={'full'} h={'fit-content'} backgroundColor={'bg.emphasized'} px={'3'} py={'2'} overflow={'hidden'}>
        <Column w={'full'} h={'full'} maxW={maxW} gap={'2'}>
          {p.children}
        </Column>
      </Center>
    </GridItem>
  )
}

const LayoutAppContent = (p: GridItemProps) => {
  const ctx = useLayoutAppContext()
  return (
    <GridItem
      h={'full'}
      w={'full'}
      display={'flex'}
      flex={1}
      justifyContent={'center'}
      overflow={'visible'}
      gridArea={'content'}
      {...p}
    >
      <Box
        h={'full'}
        w={'full'}
        maxW={ctx.maxW || defMaxW}
        overflow={'visible'}
        pb={ctx.noContentPadding ? 0 : '1'}
        px={ctx.noContentPadding ? 0 : '2'}
      >
        {p.children}
      </Box>
    </GridItem>
  )
}

const Separator = (p: SeparatorProps) => (
  <ChakraSeparator h={'2rem'} borderColor={'border.emphasized'} orientation={'vertical'} {...p} />
)

export const LayoutApp = {
  AppMenu,
  Content: LayoutAppContent,
  Header: LayoutAppHeader,
  HeaderCard: HeaderMain.Root,
  HeaderLogo: HeaderMain.Logo,
  HeaderRoutes: HeaderRoutes.Root,
  HeaderTitle: HeaderMain.Title,
  Root: LayoutAppRoot,
  RoutesContainer: HeaderRoutes.Container,
  RoutesItem: HeaderRoutes.Item,
  RoutesList: HeaderRoutes.List,
  Separator,
}

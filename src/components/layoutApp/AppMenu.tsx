import { Avatar, Box, type BoxProps, Group, Icon, IconButton } from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import { IoApps } from 'react-icons/io5'

import { MenuRoot, MenuContent, MenuItem, MenuTrigger } from '../ui/Menu'
import { SouvLogo } from '../svg/SouvLogo'
import { VolkLogo } from '../svg/VolkLogo'

import { useLayoutAppContext } from '.'

const volkProdURL = 'https://app.volkpresenter.tv'

export interface AppItem {
  label: string
  value: typeof window.APP
  url: string
  logo?: React.ReactNode
  urlNewTab?: boolean
}

export const AppMenu = (p: BoxProps) => {
  const { avatarUrl, avatarName, baseUrl, onLoadApps } = useLayoutAppContext()

  const onClick = useCallback(
    (item: AppItem) => () => {
      if (item.urlNewTab) {
        window.open(item.url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.assign(item.url)
      }
    },
    [],
  )

  const onAuxClick = useCallback(
    (item: AppItem) => (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (e.button !== 1) return // 1 = middle
      e.preventDefault()
      e.stopPropagation()
      window.open(item.url, '_blank', 'noopener,noreferrer')
    },
    [],
  )

  const apps = useMemo((): AppItem[] => {
    const defaultApps: AppItem[] = [
      {
        label: 'Account',
        logo: (
          <Avatar.Root>
            <Avatar.Fallback name={avatarName} />
            <Avatar.Image src={avatarUrl} />
          </Avatar.Root>
        ),
        url: baseUrl.replace('api', 'account'),
        value: 'account',
      },
      {
        label: 'Live',
        logo: (
          <Icon size={'3xl'}>
            <SouvLogo app={'live'} />
          </Icon>
        ),
        url: baseUrl.replace('api', 'live'),
        value: 'live',
      },
      {
        label: 'Social',
        logo: (
          <Icon size={'3xl'}>
            <SouvLogo app={'social'} />
          </Icon>
        ),
        url: baseUrl.replace('api', 'social'),
        value: 'social',
      },
      {
        label: 'Gallery',
        logo: (
          <Icon size={'3xl'}>
            <SouvLogo app={'mam'} />
          </Icon>
        ),
        url: baseUrl.replace('api', 'mam'),
        value: 'mam',
      },
      {
        label: 'Volk',
        logo: (
          <Icon size={'3xl'}>
            <VolkLogo />
          </Icon>
        ),
        url: PRODUCTION ? volkProdURL : baseUrl.replace('api', 'volk'),
        value: 'volk',
      },
    ]

    const loadedApps = onLoadApps?.(defaultApps) || defaultApps

    return loadedApps.filter(a => !!a)
  }, [baseUrl, avatarUrl, avatarName, onLoadApps])

  return (
    <Box colorPalette={'gray'} {...p}>
      <MenuRoot variant={'subtle'} lazyMount={false} unmountOnExit={false}>
        <MenuTrigger asChild>
          <IconButton variant={'ghost'} size={'lg'} p={0} outline={'none'}>
            <IoApps />
          </IconButton>
        </MenuTrigger>

        <MenuContent>
          <Group maxW={'16rem'} grow gap={'1rem'} wrap={'wrap'}>
            {apps.map(item => (
              <MenuItem
                key={item.value}
                value={item.value}
                w={'fit-content'}
                gap={'0.5rem'}
                p={'0.5rem'}
                flexDirection={'row'}
                justifyContent={'center'}
                cursor={'pointer'}
                onAuxClick={onAuxClick(item)}
                onClick={onClick(item)}
              >
                {item.logo}
                {item.label}
              </MenuItem>
            ))}
          </Group>
        </MenuContent>
      </MenuRoot>
    </Box>
  )
}

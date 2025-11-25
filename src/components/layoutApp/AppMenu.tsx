import { Avatar, Box, Group, Icon, IconButton } from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import { IoApps } from 'react-icons/io5'

import { MenuRoot, MenuContent, MenuItem, MenuTrigger } from '../ui/Menu'
import { ViIcon } from '../svg/ViIcon'
import { SouvLogo } from '../svg/SouvLogo'

const getBaseUrl = () => {
  const def = 'https://api.souv.tv'

  if (typeof BASE_URL !== 'undefined') {
    return BASE_URL || def
  } else if (typeof process !== 'undefined' && process.env.BASE_URL) {
    return process.env.BASE_URL || def
  }

  return def
}

const baseUrl = getBaseUrl()

export interface AppItem {
  value: string
  label: string
  link: string
  icon?: React.ReactNode
  avatar?: React.ReactNode
  visible?: boolean
}

interface Props {
  avatar?: string
  avatarName?: string
  showVisaonApp?: boolean
  openNewTab?: boolean
  localizations?: {
    account?: string
    live?: string
    social?: string
    mam?: string
    visao?: string
  }

  extraApps?: AppItem[]
}

export const AppMenu = ({ avatar, avatarName, localizations, showVisaonApp, extraApps = [], openNewTab }: Props) => {
  const onClick = useCallback(
    (link: string) => () => {
      if (openNewTab) {
        window.open(link, '_blank')
      } else {
        window.location.assign(link)
      }
    },
    [openNewTab],
  )

  const defaultApps = useMemo((): AppItem[] => {
    const apps: (AppItem | undefined)[] = [
      {
        avatar: (
          <Avatar.Root>
            <Avatar.Fallback name={avatarName} />
            <Avatar.Image src={avatar} />
          </Avatar.Root>
        ),
        label: localizations?.account || 'Account',
        link: baseUrl.replace('api', 'account'),
        value: 'account',
      },
      {
        icon: <SouvLogo app={'live'} />,
        label: localizations?.live || 'Live',
        link: baseUrl.replace('api', 'live'),
        value: 'live',
      },
      {
        icon: <SouvLogo app={'social'} />,
        label: localizations?.social || 'Social',
        link: baseUrl.replace('api', 'social'),
        value: 'social',
      },
      {
        icon: <SouvLogo app={'mam'} />,
        label: localizations?.mam || 'Gallery',
        link: baseUrl.replace('api', 'mam'),
        value: 'mam',
      },
      showVisaonApp
        ? {
            icon: <ViIcon />,
            label: localizations?.visao || 'Visão',
            link: baseUrl.replace('api', 'visao'),
            value: 'visao',
          }
        : undefined,
    ]

    return apps.filter(Boolean) as AppItem[]
  }, [
    avatar,
    avatarName,
    showVisaonApp,
    localizations?.account,
    localizations?.live,
    localizations?.social,
    localizations?.mam,
    localizations?.visao,
  ])

  const apps = useMemo(
    () => [...defaultApps, ...extraApps].filter(app => app?.visible !== false),
    [defaultApps, extraApps],
  )

  return (
    <Box colorPalette={'gray'}>
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
                onClick={onClick(item.link)}
              >
                {item.avatar}
                {item.icon && <Icon size={'3xl'}>{item.icon}</Icon>}
                {item.label}
              </MenuItem>
            ))}
          </Group>
        </MenuContent>
      </MenuRoot>
    </Box>
  )
}

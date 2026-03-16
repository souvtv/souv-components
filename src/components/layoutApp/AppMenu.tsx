import { Avatar, Box, Group, Icon, IconButton } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { IoApps } from 'react-icons/io5'

import { MenuRoot, MenuContent, MenuItem, MenuTrigger } from '../ui/Menu'
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
  label: string
  value: typeof window.APP
  url: string
  logo?: React.ReactNode
  urlNewTab?: boolean
}

interface Props {
  avatar?: string
  avatarName?: string
  onLoadApps?: (defaultApps: AppItem[]) => AppItem[]
}

export const AppMenu = ({ avatar, avatarName, onLoadApps }: Props) => {
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
            <Avatar.Image src={avatar} />
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
    ]

    const loadedApps = onLoadApps?.(defaultApps) || defaultApps

    return loadedApps.filter(a => !!a)
  }, [avatar, avatarName, onLoadApps])

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

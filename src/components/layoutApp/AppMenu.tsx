import { Avatar,Box, Group, Icon, IconButton } from '@chakra-ui/react'
import React, { useCallback, useMemo} from 'react'
import { IoApps } from 'react-icons/io5'

import { MenuRoot, MenuContent, MenuItem, MenuTrigger } from '../ui/Menu'
import { SouvLogo } from '../svg/SouvLogo'


const baseUrl = BASE_URL || `https://api.souv.tv`

interface Props {
  avatar?: string
  avatarName?: string
  localizations?: {
    account?: string
    live?: string
    social?: string
    mam?: string
  }
}

export const AppMenu = ({ avatar, avatarName, localizations }: Props) => {
  
  const onClick = useCallback(
    (link: string) => () => {
      window.location.assign(link)
    },
    [],
  )

  const apps = useMemo(
    () => [
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
      { icon: <SouvLogo app={'mam'} />, label: localizations?.mam || "Gallery", link: baseUrl.replace('api', 'mam'), value: 'mam' },
    ],
    [avatar, avatarName, localizations?.social, localizations?.live, localizations?.account, localizations?.mam],
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
            {apps?.map(item => (
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

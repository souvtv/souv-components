import { Box, Group, Icon, IconButton } from '@chakra-ui/react'
import React, {useCallback, useMemo} from 'react'
import { IoApps, IoChevronDown } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa6'

import { MenuRoot, MenuContent, MenuItem, MenuTrigger } from '../ui/Menu'
import { SouvLogo } from '../svg/SouvLogo'
// import { TrText } from '@client/i18n'

import { Avatar } from '../ui/Avatar'

const BASE_URL = `https://api.souv.tv`

interface Props {
  avatar?: string
  avatarFallback?: React.ReactNode
}

export const AppMenu = ({ avatar, avatarFallback }: Props) => {
  const onClick = useCallback(
    (link: string) => () => {
      window.location.assign(link)
    },
    [],
  )

  const apps = useMemo(
    () => [
      {
        avatar: <Avatar loading={'eager'} src={avatar} fallback={avatarFallback || <FaUser />} />,
        label: 'Conta', //TrText('account'),
        link: BASE_URL.replace('api', 'account'),
        value: 'account',
      },
      {
        icon: <SouvLogo app={'live'} />,
        label: 'Live',
        link: BASE_URL.replace('api', 'live'),
        value: 'live',
      },
      {
        icon: <SouvLogo app={'social'} />,
        label: 'Social',
        link: BASE_URL.replace('api', 'social-web'),
        value: 'social',
      },
      { icon: <SouvLogo app={'mam'} />, label: 'Galeria', link: BASE_URL.replace('api', 'mam'), value: 'mam' },
    ],
    [avatar, avatarFallback],
  )

  return (
    <Box colorPalette={'gray'}>
      <MenuRoot variant={'subtle'}>
        <MenuTrigger asChild>
          <IconButton variant={'ghost'} p={'0.5rem'}>
            <IoApps />
            <IoChevronDown />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <Group maxW={'20rem'} grow gap={'1rem'} wrap={'wrap'}>
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

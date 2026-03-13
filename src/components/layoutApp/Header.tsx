import React, { useCallback } from 'react'
import { Show, Center, Card, Heading, HStack, Icon, Separator, Tabs, Link } from '@chakra-ui/react'

import { LayoutRouteType } from 'src/types/route'

import { Column } from '../column'
import { Row } from '../row'
import { SouvLogo } from '../svg/SouvLogo'

import { AppItem, AppMenu } from './AppMenu'

export interface HeaderProps {
  appName: string
  appIcon?: React.ReactNode
  maxW?: string
  avatar?: string
  showAppSelector?: boolean
  openNewTab?: boolean
  extraApps?: AppItem[]
  avatarName?: string
  headerContent?: React.ReactNode
  actionContent?: React.ReactNode
  primaryRoutes?: LayoutRouteType[]
  primaryExtra?: React.ReactNode
  secondaryRoutes?: LayoutRouteType[]
  secondaryExtra?: React.ReactNode
  localizations?: {
    account?: string
    live?: string
    social?: string
    mam?: string
    visao?: string
  }
  onCheckMatch?: (path: string, end?: boolean) => void
  onNavigate?: (path: string) => void
}

export const Header = ({
  maxW,
  appName,
  appIcon,
  headerContent,
  actionContent,
  primaryRoutes,
  secondaryRoutes,
  avatar,
  avatarName,
  showAppSelector = true,
  localizations,
  onNavigate,
  onCheckMatch,
  extraApps,
  openNewTab, primaryExtra, secondaryExtra


}: HeaderProps) => {
  const handleSelectRoute = useCallback(
    (path: string) => () => {
      onNavigate?.(path)
    },
    [onNavigate],
  )

  return (
    <Center w={'full'} h={'fit-content'} backgroundColor={'bg.emphasized'} px={'3'} py={'2'}>
      <Column w={'full'} h={'full'} maxW={maxW} gap={'2'}>
        <Card.Root w={'full'} h={'3.6rem'} variant={'subtle'} borderRadius={'xl'}>
          <Card.Body padding={'2'}>
            <Row w={'full'} h={'full'} justify={'start'} align={'center'} gap={'2'}>
              {appIcon ? (
                appIcon
              ) : (
                <Icon size={'4xl'}>
                  <SouvLogo fill={'theme.fg'} />
                </Icon>
              )}
              <Heading size={'subtitle'}>{appName}</Heading>

              {showAppSelector && <AppMenu extraApps={extraApps} openNewTab={openNewTab} avatar={avatar} avatarName={avatarName} localizations={localizations} />}

              <Separator h={'full'} orientation={'vertical'} />

              {headerContent}
            </Row>
          </Card.Body>
        </Card.Root>

        <Show when={!!primaryRoutes?.length || !!secondaryRoutes?.length}>
          <Row w={'full'} justify={'space-between'} align={'center'}>
            <Show when={!!primaryRoutes || !!actionContent || !!primaryExtra}>
              <HStack w={'full'}>
                {actionContent}

                <Show when={!!actionContent}>
                  <Separator h={'full'} borderColor={'border.emphasized'} orientation={'vertical'} />
                </Show>

                <Tabs.Root
                  variant={'solid'}
                  colorPalette={'gray'}
                  value={
                    primaryRoutes?.find(route => onCheckMatch?.(route.pathMatch || route.path, route.pathEnd))?.label || ''
                  }
                >
                  <Tabs.List>
                    {primaryRoutes?.map((route, idx) => (
                      <Tabs.Trigger key={idx} value={route.label} as={Link} onClick={handleSelectRoute(route.path)}>
                        {route.icon}
                        {route.label}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>
                </Tabs.Root>

                <Show when={!!primaryExtra}>
                  {primaryExtra}
                </Show>

              </HStack>
            </Show>

            <Show when={!!secondaryRoutes?.length || !!secondaryExtra}>
              <HStack justify={'end'}>

                <Separator h={'2rem'} borderColor={'border.emphasized'} orientation={'vertical'} />


                <Show when={!!secondaryRoutes?.length}>

                  <Tabs.Root
                    variant={'solid'}
                    colorPalette={'gray'}
                    value={
                      secondaryRoutes?.find(route => onCheckMatch?.(route.pathMatch || route.path, route.pathEnd))?.label ||
                      ''
                    }
                  >
                    <Tabs.List>
                      {secondaryRoutes?.map((route, idx) => (
                        <Tabs.Trigger key={idx} value={route.label} onClick={handleSelectRoute(route.path)}>
                          {route.icon}
                          {route.label}
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                  </Tabs.Root>

                </Show>

                <Show when={!!secondaryExtra}>
                  {secondaryExtra}
                </Show>
              </HStack>
            </Show>

          </Row>
        </Show>
      </Column>
    </Center>
  )
}

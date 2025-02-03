import React, {JSX, ReactNode, useCallback} from 'react'
import { Card, Heading, HStack, Icon, Separator, Tabs } from '@chakra-ui/react'


import { Column } from '../column'
import { Row } from '../row'
import { SouvLogo } from '../svg/SouvLogo'

import { AppMenu } from './AppMenu'

type RouteType = { label: string; icon?: JSX.Element; path: string; pathMatch?: string; pathEnd?: boolean }

export interface HeaderProps {
  appName: string
  appIcon?: ReactNode
  maxW?: string
  avatar?: string
  avatarFallback?: ReactNode
  headerContent?: ReactNode
  actionContent?: ReactNode
  primaryRoutes?: RouteType[]
  secondaryRoutes?: RouteType[]
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
  avatarFallback,
  onNavigate,
  onCheckMatch,
}: HeaderProps) => {
  const handleSelectRoute = useCallback(
    (path: string) => () => {
      onNavigate?.(path)
    },
    [onNavigate],
  )

  return (
    <Column w={'100%'} h={'fit-content'} backgroundColor={'bg.emphasized'} align={'center'} justify={'start'}>
      <Column w={'100%'} h={'100%'} maxW={maxW} gap={'1.25rem'} pl={'2rem'} pr={'2rem'} pt={'1rem'}>
        <Card.Root w={'100%'} h={'3.8rem'} variant={'subtle'} borderRadius={'15px'}>
          <Card.Body padding={'0.5rem'}>
            <Row w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'0.5rem'}>
              {appIcon ? (
                appIcon
              ) : (
                <Icon size={'4xl'}>
                  <SouvLogo />
                </Icon>
              )}
              <Heading size={'subtitle'}>{appName}</Heading>

              <AppMenu avatar={avatar} avatarFallback={avatarFallback} />

              <Separator h={'100%'} orientation={'vertical'} />

              {headerContent}
            </Row>
          </Card.Body>
        </Card.Root>

        <Row w={'100%'} justify={'space-between'} align={'center'} pb={'0.5rem'}>
          {(primaryRoutes || actionContent) && (
            <HStack w={'100%'}>
              {actionContent}

              {actionContent && <Separator h={'2rem'} borderColor={'border.emphasized'} orientation={'vertical'} />}

              <Tabs.Root
                variant={'solid'}
                colorPalette={'gray'}
                value={
                  primaryRoutes?.find(route => onCheckMatch?.(route.pathMatch || route.path, route.pathEnd))?.label || ''
                }
              >
                <Tabs.List>
                  {primaryRoutes?.map((route, idx) => (
                    <Tabs.Trigger key={idx} value={route.label} onClick={handleSelectRoute(route.path)}>
                      {route.icon}
                      {route.label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>
            </HStack>
          )}

          {secondaryRoutes && secondaryRoutes.length > 0 && (
            <HStack justify={'end'}>
              <Separator h={'2rem'} borderColor={'border.emphasized'} orientation={'vertical'} />

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
            </HStack>
          )}
        </Row>
      </Column>
    </Column>
  )
}

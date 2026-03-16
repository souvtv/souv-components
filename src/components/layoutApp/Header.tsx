import { useCallback } from 'react'
import { Show, Center, Card, Heading, HStack, Icon, Separator, Tabs } from '@chakra-ui/react'

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
  avatarName?: string
  headerContent?: React.ReactNode
  actionContent?: React.ReactNode
  primaryRoutes?: LayoutRouteType[]
  primaryExtra?: React.ReactNode
  secondaryRoutes?: LayoutRouteType[]
  secondaryExtra?: React.ReactNode
  onLoadApps?: (defaultApps: AppItem[]) => AppItem[]
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
  primaryExtra,
  secondaryExtra,
  onNavigate,
  onCheckMatch,
  onLoadApps,
}: HeaderProps) => {
  const handleSelectRoute = useCallback(
    (path: string) => () => {
      onNavigate?.(path)
    },
    [onNavigate],
  )

  const onAuxClick = useCallback(
    (path: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.button !== 1) return // 1 = middle
      e.preventDefault()
      e.stopPropagation()
      window.open(path, '_blank', 'noopener,noreferrer')
    },
    [],
  )

  return (
    <Center w={'full'} h={'fit-content'} backgroundColor={'bg.emphasized'} px={'3'} py={'2'} overflow={'hidden'}>
      <Column w={'full'} h={'full'} maxW={maxW} gap={'2'}>
        <Card.Root w={'full'} h={'3.6rem'} variant={'subtle'} borderRadius={'xl'}>
          <Card.Body padding={'2'}>
            <Row
              w={'full'}
              h={'full'}
              justify={'start'}
              align={'center'}
              gap={{ base: '1', tablet: '2' }}
              overflow={'hidden'}
            >
              {appIcon ? (
                appIcon
              ) : (
                <Icon size={'4xl'}>
                  <SouvLogo fill={'theme.fg'} />
                </Icon>
              )}

              <Heading size={'subtitle'}>{appName}</Heading>

              <Show when={showAppSelector}>
                <AppMenu avatar={avatar} avatarName={avatarName} onLoadApps={onLoadApps} />
              </Show>

              <Separator h={'full'} orientation={'vertical'} />

              {headerContent}
            </Row>
          </Card.Body>
        </Card.Root>

        <Show when={!!primaryRoutes?.length || !!secondaryRoutes?.length}>
          <Row w={'full'} justify={'space-between'} align={'center'} overflow={'hidden'} gap={'1'} flexWrap={'wrap'}>
            <Show when={!!primaryRoutes || !!actionContent || !!primaryExtra}>
              <HStack minW={0} overflow={'auto'}>
                {actionContent}

                <Show when={!!actionContent}>
                  <Separator h={'full'} borderColor={'border.emphasized'} orientation={'vertical'} />
                </Show>

                <Tabs.Root
                  variant={'solid'}
                  colorPalette={'gray'}
                  value={
                    primaryRoutes?.find(route => onCheckMatch?.(route.pathMatch || route.path, route.pathEnd))?.label ||
                    ''
                  }
                >
                  <Tabs.List>
                    {primaryRoutes?.map((route, idx) => (
                      <Tabs.Trigger
                        key={idx}
                        value={route.label}
                        onAuxClick={onAuxClick(route.path)}
                        onClick={handleSelectRoute(route.path)}
                      >
                        {route.icon}
                        {route.label}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>
                </Tabs.Root>

                <Show when={!!primaryExtra}>{primaryExtra}</Show>
              </HStack>
            </Show>

            <Show when={!!secondaryRoutes?.length || !!secondaryExtra}>
              <HStack minW={0} flex={'1 1 50%'} justify={'end'} align={'center'} overflow={'auto'}>
                <Separator h={'2rem'} borderColor={'border.emphasized'} orientation={'vertical'} />

                <Show when={!!secondaryRoutes?.length}>
                  <Tabs.Root
                    variant={'solid'}
                    colorPalette={'gray'}
                    value={
                      secondaryRoutes?.find(route => onCheckMatch?.(route.pathMatch || route.path, route.pathEnd))
                        ?.label || ''
                    }
                  >
                    <Tabs.List>
                      {secondaryRoutes?.map((route, idx) => (
                        <Tabs.Trigger
                          key={idx}
                          value={route.label}
                          onAuxClick={onAuxClick(route.path)}
                          onClick={handleSelectRoute(route.path)}
                        >
                          {route.icon}
                          {route.label}
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                  </Tabs.Root>
                </Show>

                <Show when={!!secondaryExtra}>{secondaryExtra}</Show>
              </HStack>
            </Show>
          </Row>
        </Show>
      </Column>
    </Center>
  )
}

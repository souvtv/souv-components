import React, {JSX, useCallback} from 'react'
import { Separator, VStack, Button } from '@chakra-ui/react'


type RouteType = { label: string; icon?: JSX.Element; path: string; pathEnd?: boolean }

export interface SidebarProps {
  primaryRoutes?: RouteType[]
  secondaryRoutes?: RouteType[]
  onCheckMatch?: (path: string, end?: boolean) => boolean
  onNavigate?: (path: string) => void
}

export const SideBar = ({ primaryRoutes, secondaryRoutes, onNavigate, onCheckMatch }: SidebarProps) => {
  const handleNavigate = useCallback(
    (path: string) => () => {
      onNavigate?.(path)
    },
    [onNavigate],
  )

  return (
    <VStack colorPalette={'gray'} overflowY={'auto'} h={'100%'} align={'stretch'}>
      {primaryRoutes?.map((r, i) => (
        <Button key={i} variant={onCheckMatch?.(r.path, r.pathEnd) ? 'subtle' : 'ghost'} onClick={handleNavigate(r.path)}>
          {r.icon}
          {r.label}
        </Button>
      ))}

      {secondaryRoutes && (
        <>
          <Separator />

          {secondaryRoutes?.map((r, i) => (
            <Button
              key={i}
              variant={onCheckMatch?.(r.path, r.pathEnd) ? 'subtle' : 'ghost'}
              onClick={handleNavigate(r.path)}
            >
              {r.icon}
              {r.label}
            </Button>
          ))}
        </>
      )}
    </VStack>
  )
}

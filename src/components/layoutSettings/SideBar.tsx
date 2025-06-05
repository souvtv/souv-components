import React, { useCallback} from 'react'
import { Separator, VStack, Button } from '@chakra-ui/react'
import { LayoutRouteType } from 'src/types/route'

export interface SidebarProps {
  primaryRoutes?: LayoutRouteType[]
  secondaryRoutes?: LayoutRouteType[]
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
    <VStack colorPalette={'gray'} overflowY={'scroll'} h={'100%'} align={'stretch'}>
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

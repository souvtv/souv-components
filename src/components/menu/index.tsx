import { Menu as M, type MenuRootProps, Portal, Show, Group } from '@chakra-ui/react'
import { RefObject, useCallback } from 'react'

export type MenuItemType = {
  label?: React.ReactNode | 'separator'
  value: string | 'separator'
  color?: 'error' | 'success' | 'info' | 'warning'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  handle?: () => void
  handleAux?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

interface Props extends MenuRootProps {
  maxW?: string
  asChild?: boolean
  disabled?: boolean
  isCheckBox?: boolean
  items?: MenuItemType[]
  horizontalItems?: MenuItemType[]
  value?: string
  portalRef?: RefObject<HTMLElement>
  isContextMenu?: boolean
  onCheckedChange?: (value: string) => void
}

export const Menu = ({
  isContextMenu,
  value,
  maxW,
  asChild = true,
  items,
  horizontalItems,
  isCheckBox,
  disabled,
  portalRef,
  children,
  onCheckedChange,
  ...p
}: Props) => {
  const onChecked = useCallback(
    (value: string) => () => {
      onCheckedChange?.(value)
    },
    [onCheckedChange],
  )

  const onContextMenuCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        e?.preventDefault?.()
        e?.stopPropagation?.()
      }
    },
    [disabled],
  )

  return (
    <M.Root lazyMount={false} unmountOnExit={false} {...p}>
      {isContextMenu ? (
        <M.ContextTrigger onContextMenuCapture={onContextMenuCapture} width={'full'}>
          {children}
        </M.ContextTrigger>
      ) : (
        <M.Trigger disabled={disabled} asChild={asChild}>
          {children}
        </M.Trigger>
      )}
      <Portal container={portalRef}>
        <M.Positioner>
          <M.Content maxW={maxW}>
            <Show when={!!horizontalItems?.length}>
              <Group grow gap={'0'}>
                {horizontalItems?.map(item => (
                  <M.Item
                    key={item.value}
                    value={item.value}
                    width={'14'}
                    gap={'1'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                  >
                    {item.leftIcon}
                    {item.rightIcon}
                    {item.label}
                  </M.Item>
                ))}
              </Group>
            </Show>

            {items?.map((item, i) => {
              if (item.label === 'separator' && item.value === 'separator') {
                return <M.Separator key={i} />
              }

              if (isCheckBox) {
                return (
                  <M.CheckboxItem
                    key={item.value}
                    value={item.value}
                    checked={item.value === value}
                    onCheckedChange={onChecked(item.value)}
                    color={item.color ? `fg.${item.color}` : undefined}
                    _hover={item.color ? { bg: `bg.${item.color}`, color: `fg.${item.color}` } : undefined}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                    overflow={'hidden'}
                  >
                    <M.ItemIndicator />

                    {item.leftIcon}
                    {item.label}
                    {item.rightIcon}
                  </M.CheckboxItem>
                )
              }

              return (
                <M.Item
                  key={item.value}
                  value={item.value}
                  onAuxClick={item.handleAux}
                  onClick={item.handle}
                  color={item.color ? `fg.${item.color}` : undefined}
                  _hover={item.color ? { bg: `bg.${item.color}`, color: `fg.${item.color}` } : undefined}
                  textOverflow={'ellipsis'}
                  whiteSpace={'nowrap'}
                  overflow={'hidden'}
                >
                  {item.leftIcon}
                  {item.label}
                  {item.rightIcon}
                </M.Item>
              )
            })}
          </M.Content>
        </M.Positioner>
      </Portal>
    </M.Root>
  )
}

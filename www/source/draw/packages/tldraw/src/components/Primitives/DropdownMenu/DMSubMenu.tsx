import * as React from 'react'
import { Root, TriggerItem, Content, Arrow } from '@radix-ui/react-dropdown-menu'
import { RowButton } from '~components/Primitives/RowButton'
import { MenuContent } from '~components/Primitives/MenuContent'

export interface DMSubMenuProps {
  label: string
  disabled?: boolean
  children: React.ReactNode
}

export function DMSubMenu({ children, disabled = false, label }: DMSubMenuProps): JSX.Element {
  return (
    <Root dir="ltr">
      <TriggerItem dir="ltr" asChild>
        <RowButton disabled={disabled} hasArrow>
          {label}
        </RowButton>
      </TriggerItem>
      <Content dir="ltr" asChild sideOffset={2} alignOffset={-2}>
        <MenuContent>
          {children}
          <Arrow offset={13} />
        </MenuContent>
      </Content>
    </Root>
  )
}

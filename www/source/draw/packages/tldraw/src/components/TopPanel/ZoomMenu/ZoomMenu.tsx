import * as React from 'react'
import { useTldrawApp } from '~hooks'
import type { TDSnapshot } from '~types'
import { styled } from '~styles'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DMItem, DMContent } from '~components/Primitives/DropdownMenu'
import { ToolButton } from '~components/Primitives/ToolButton'
import { preventEvent } from '~components/preventEvent'

const zoomSelector = (s: TDSnapshot) => s.document.pageStates[s.appState.currentPageId].camera.zoom

export const ZoomMenu = React.memo(function ZoomMenu() {
  const app = useTldrawApp()

  const zoom = app.useStore(zoomSelector)

  return (
    <DropdownMenu.Root dir="ltr">
      <DropdownMenu.Trigger dir="ltr" asChild>
        <FixedWidthToolButton onDoubleClick={app.resetZoom} variant="text">
          {Math.round(zoom * 100)}%
        </FixedWidthToolButton>
      </DropdownMenu.Trigger>
      <DMContent align="end">
        <DMItem onSelect={preventEvent} onClick={app.zoomIn} kbd="#+">
          缩小
        </DMItem>
        <DMItem onSelect={preventEvent} onClick={app.zoomOut} kbd="#−">
          放大
        </DMItem>
        <DMItem onSelect={preventEvent} onClick={app.resetZoom} kbd="⇧0">
          To 100%
        </DMItem>
        <DMItem onSelect={preventEvent} onClick={app.zoomToFit} kbd="⇧1">
          适合
        </DMItem>
        <DMItem onSelect={preventEvent} onClick={app.zoomToSelection} kbd="⇧2">
          到选择
        </DMItem>
      </DMContent>
    </DropdownMenu.Root>
  )
})

const FixedWidthToolButton = styled(ToolButton, {
  minWidth: 56,
})

import * as React from 'react'
import {
  ArrowTopRightIcon,
  CursorArrowIcon,
  Pencil1Icon,
  Pencil2Icon,
  TextIcon,
} from '@radix-ui/react-icons'
import { TDSnapshot, TDShapeType } from '~types'
import { useTldrawApp } from '~hooks'
import { ToolButtonWithTooltip } from '~components/Primitives/ToolButton'
import { Panel } from '~components/Primitives/Panel'
import { ShapesMenu } from './ShapesMenu'
import { EraserIcon } from '~components/Primitives/icons'

const activeToolSelector = (s: TDSnapshot) => s.appState.activeTool
const toolLockedSelector = (s: TDSnapshot) => s.appState.isToolLocked

export const PrimaryTools = React.memo(function PrimaryTools(): JSX.Element {
  const app = useTldrawApp()

  const activeTool = app.useStore(activeToolSelector)

  const isToolLocked = app.useStore(toolLockedSelector)

  const selectSelectTool = React.useCallback(() => {
    app.selectTool('select')
  }, [app])

  const selectEraseTool = React.useCallback(() => {
    app.selectTool('erase')
  }, [app])

  const selectDrawTool = React.useCallback(() => {
    app.selectTool(TDShapeType.Draw)
  }, [app])

  const selectArrowTool = React.useCallback(() => {
    app.selectTool(TDShapeType.Arrow)
  }, [app])

  const selectTextTool = React.useCallback(() => {
    app.selectTool(TDShapeType.Text)
  }, [app])

  const selectStickyTool = React.useCallback(() => {
    app.selectTool(TDShapeType.Sticky)
  }, [app])

  return (
    <Panel side="center">
      <ToolButtonWithTooltip
        kbd={'1'}
        label={'select'}
        onClick={selectSelectTool}
        isActive={activeTool === 'select'}
      >
        <CursorArrowIcon />
      </ToolButtonWithTooltip>
      <ToolButtonWithTooltip
        kbd={'2'}
        label={TDShapeType.Draw}
        onClick={selectDrawTool}
        isActive={activeTool === TDShapeType.Draw}
      >
        <Pencil1Icon />
      </ToolButtonWithTooltip>
      <ToolButtonWithTooltip
        kbd={'3'}
        label={'eraser'}
        onClick={selectEraseTool}
        isActive={activeTool === 'erase'}
      >
        <EraserIcon />
      </ToolButtonWithTooltip>
      <ShapesMenu activeTool={activeTool} isToolLocked={isToolLocked} />
      <ToolButtonWithTooltip
        kbd={'8'}
        label={TDShapeType.Arrow}
        onClick={selectArrowTool}
        isLocked={isToolLocked}
        isActive={activeTool === TDShapeType.Arrow}
      >
        <ArrowTopRightIcon />
      </ToolButtonWithTooltip>
      <ToolButtonWithTooltip
        kbd={'9'}
        label={TDShapeType.Text}
        onClick={selectTextTool}
        isLocked={isToolLocked}
        isActive={activeTool === TDShapeType.Text}
      >
        <TextIcon />
      </ToolButtonWithTooltip>
      <ToolButtonWithTooltip
        kbd={'0'}
        label={TDShapeType.Sticky}
        onClick={selectStickyTool}
        isActive={activeTool === TDShapeType.Sticky}
      >
        <Pencil2Icon />
      </ToolButtonWithTooltip>
    </Panel>
  )
})

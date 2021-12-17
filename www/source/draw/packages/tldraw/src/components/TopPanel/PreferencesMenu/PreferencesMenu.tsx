import * as React from 'react'
import { DMCheckboxItem, DMDivider, DMSubMenu } from '~components/Primitives/DropdownMenu'
import { useTldrawApp } from '~hooks'
import type { TDSnapshot } from '~types'

const settingsSelector = (s: TDSnapshot) => s.settings

export function PreferencesMenu() {
  const app = useTldrawApp()

  const settings = app.useStore(settingsSelector)

  const toggleDebugMode = React.useCallback(() => {
    app.setSetting('isDebugMode', (v) => !v)
  }, [app])

  const toggleDarkMode = React.useCallback(() => {
    app.setSetting('isDarkMode', (v) => !v)
  }, [app])

  const toggleFocusMode = React.useCallback(() => {
    app.setSetting('isFocusMode', (v) => !v)
  }, [app])

  const toggleRotateHandle = React.useCallback(() => {
    app.setSetting('showRotateHandles', (v) => !v)
  }, [app])

  const toggleGrid = React.useCallback(() => {
    app.setSetting('showGrid', (v) => !v)
  }, [app])

  const toggleBoundShapesHandle = React.useCallback(() => {
    app.setSetting('showBindingHandles', (v) => !v)
  }, [app])

  const toggleisSnapping = React.useCallback(() => {
    app.setSetting('isSnapping', (v) => !v)
  }, [app])

  const toggleCloneControls = React.useCallback(() => {
    app.setSetting('showCloneHandles', (v) => !v)
  }, [app])

  return (
    <DMSubMenu label="系统设置">
      <DMCheckboxItem checked={settings.isDarkMode} onCheckedChange={toggleDarkMode} kbd="#⇧D">
        暗黑风格
      </DMCheckboxItem>
      <DMCheckboxItem checked={settings.isFocusMode} onCheckedChange={toggleFocusMode} kbd="#.">
        专注模式
      </DMCheckboxItem>
      <DMCheckboxItem checked={settings.isDebugMode} onCheckedChange={toggleDebugMode}>
        调试模式
      </DMCheckboxItem>
      <DMDivider />
      <DMCheckboxItem checked={settings.showRotateHandles} onCheckedChange={toggleRotateHandle}>
        显示旋转
      </DMCheckboxItem>
      <DMCheckboxItem
        checked={settings.showBindingHandles}
        onCheckedChange={toggleBoundShapesHandle}
      >
        显示绑定
      </DMCheckboxItem>
      <DMCheckboxItem checked={settings.showCloneHandles} onCheckedChange={toggleCloneControls}>
        显示克隆
      </DMCheckboxItem>
      <DMCheckboxItem
        checked={settings.showGrid}
        onCheckedChange={toggleGrid}
        kbd="#⇧G"
      >
        显示网格
      </DMCheckboxItem>
      <DMCheckboxItem checked={settings.isSnapping} onCheckedChange={toggleisSnapping}>
        显示快照
      </DMCheckboxItem>
    </DMSubMenu>
  )
}

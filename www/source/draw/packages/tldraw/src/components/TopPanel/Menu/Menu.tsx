import * as React from 'react'
import { ExitIcon, GitHubLogoIcon, HamburgerMenuIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTldrawApp } from '~hooks'
import { PreferencesMenu } from '../PreferencesMenu'
import {
  DMItem,
  DMContent,
  DMDivider,
  DMSubMenu,
  DMTriggerIcon,
} from '~components/Primitives/DropdownMenu'
import { SmallIcon } from '~components/Primitives/SmallIcon'
import { useFileSystemHandlers } from '~hooks'
import { HeartIcon } from '~components/Primitives/icons/HeartIcon'
import { preventEvent } from '~components/preventEvent'
import { DiscordIcon } from '~components/Primitives/icons'
import type { TDSnapshot } from '~types'

interface MenuProps {
  showSponsorLink: boolean
  readOnly: boolean
}

const numberOfSelectedIdsSelector = (s: TDSnapshot) => {
  return s.document.pageStates[s.appState.currentPageId].selectedIds.length
}

export const Menu = React.memo(function Menu({ showSponsorLink, readOnly }: MenuProps) {
  const app = useTldrawApp()
  const numberOfSelectedIds = app.useStore(numberOfSelectedIdsSelector)

  const { onNewProject, onOpenProject, onSaveProject, onSaveProjectAs } = useFileSystemHandlers()

  const handleSignIn = React.useCallback(() => {
    app.callbacks.onSignIn?.(app)
  }, [app])

  const handleSignOut = React.useCallback(() => {
    app.callbacks.onSignOut?.(app)
  }, [app])

  const handleCut = React.useCallback(() => {
    app.cut()
  }, [app])

  const handleCopy = React.useCallback(() => {
    app.copy()
  }, [app])

  const handlePaste = React.useCallback(() => {
    app.paste()
  }, [app])

  const handleCopySvg = React.useCallback(() => {
    app.copySvg()
  }, [app])

  const handleCopyJson = React.useCallback(() => {
    app.copyJson()
  }, [app])

  const handleSelectAll = React.useCallback(() => {
    app.selectAll()
  }, [app])

  const handleselectNone = React.useCallback(() => {
    app.selectNone()
  }, [app])

  const showFileMenu =
    app.callbacks.onNewProject ||
    app.callbacks.onOpenProject ||
    app.callbacks.onSaveProject ||
    app.callbacks.onSaveProjectAs

  const showSignInOutMenu = app.callbacks.onSignIn || app.callbacks.onSignOut || showSponsorLink

  const hasSelection = numberOfSelectedIds > 0

  return (
    <DropdownMenu.Root dir="ltr">
      <DMTriggerIcon isSponsor={showSponsorLink}>
        <HamburgerMenuIcon />
      </DMTriggerIcon>
      <DMContent variant="menu">
        <DMItem onClick={onSaveProject} kbd="#S">
          保存
        </DMItem>
        
        {!readOnly && (
          <>
            <DMSubMenu label="编辑">
              <DMItem onSelect={preventEvent} onClick={app.undo} kbd="#Z">
                取消
              </DMItem>
              <DMItem onSelect={preventEvent} onClick={app.redo} kbd="#⇧Z">
                重做
              </DMItem>
              <DMDivider dir="ltr" />
              <DMItem onSelect={preventEvent} disabled={!hasSelection} onClick={handleCut} kbd="#X">
                剪切
              </DMItem>
              <DMItem
                onSelect={preventEvent}
                disabled={!hasSelection}
                onClick={handleCopy}
                kbd="#C"
              >
                复制
              </DMItem>
              <DMItem onSelect={preventEvent} onClick={handlePaste} kbd="#V">
                黏贴
              </DMItem>
              <DMDivider dir="ltr" />
              <DMItem
                onSelect={preventEvent}
                disabled={!hasSelection}
                onClick={handleCopySvg}
                kbd="#⇧C"
              >
                复制为SVG
              </DMItem>
              <DMItem onSelect={preventEvent} disabled={!hasSelection} onClick={handleCopyJson}>
                复制为JSON
              </DMItem>
              <DMDivider dir="ltr" />
              <DMItem onSelect={preventEvent} onClick={handleSelectAll} kbd="#A">
                全选
              </DMItem>
              <DMItem onSelect={preventEvent} onClick={handleselectNone}>
               全不选
              </DMItem>
            </DMSubMenu>
          </>
        )}
        <DMDivider dir="ltr" />
        <PreferencesMenu />
        <DMDivider dir="ltr" />
       
       
      </DMContent>
    </DropdownMenu.Root>
  )
})

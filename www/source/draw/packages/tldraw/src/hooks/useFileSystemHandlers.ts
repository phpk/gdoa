import * as React from 'react'
import { useTldrawApp } from '~hooks'

export function useFileSystemHandlers() {
  const app = useTldrawApp()

  const onNewProject = React.useCallback(
    async (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => {
      if (e && app.callbacks.onOpenProject) e.preventDefault()
      app.callbacks.onNewProject?.(app)
    },
    [app]
  )

  const onSaveProject = React.useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => {
      if (e && app.callbacks.onOpenProject) e.preventDefault()
      app.callbacks.onSaveProject?.(app)
    },
    [app]
  )

  const onSaveProjectAs = React.useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => {
      if (e && app.callbacks.onOpenProject) e.preventDefault()
      app.callbacks.onSaveProjectAs?.(app)
    },
    [app]
  )

  const onOpenProject = React.useCallback(
    async (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => {
      if (e && app.callbacks.onOpenProject) e.preventDefault()
      app.callbacks.onOpenProject?.(app)
    },
    [app]
  )

  return {
    onNewProject,
    onSaveProject,
    onSaveProjectAs,
    onOpenProject,
  }
}

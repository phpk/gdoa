import * as React from 'react'
import type { TldrawApp } from '~state'

export function useFileSystem() {
  const promptSaveBeforeChange = React.useCallback(async (app: TldrawApp) => {
    if (app.isDirty) {
      if (app.fileSystemHandle) {
        if (window.confirm('您要保存当前项目吗?')) {
          await app.saveProject()
        }
      } else {
        if (window.confirm('您要保存当前项目吗?')) {
          await app.saveProject()
        }
      }
    }
  }, [])

  const onNewProject = React.useCallback(
    async (app: TldrawApp) => {
      if (window.confirm('确定要创建新白板?')) {
        await promptSaveBeforeChange(app)
        app.newProject()
      }
    },
    [promptSaveBeforeChange]
  )

  const onSaveProject = React.useCallback((app: TldrawApp) => {
    app.saveProject()
  }, [])

  const onSaveProjectAs = React.useCallback((app: TldrawApp) => {
    app.saveProjectAs()
  }, [])

  const onOpenProject = React.useCallback(
    async (app: TldrawApp) => {
      await promptSaveBeforeChange(app)
      app.openProject()
    },
    [promptSaveBeforeChange]
  )

  return {
    onNewProject,
    onSaveProject,
    onSaveProjectAs,
    onOpenProject,
  }
}

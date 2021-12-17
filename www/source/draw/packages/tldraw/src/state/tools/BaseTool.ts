import {
  TLKeyboardEventHandler,
  TLPinchEventHandler,
  TLPointerEventHandler,
  Utils,
} from '@tldraw/core'
import type { TldrawApp } from '../internal'
import { TDEventHandler, TDToolType } from '~types'

export enum Status {
  Idle = 'idle',
  Creating = 'creating',
  Pinching = 'pinching',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class BaseTool<T extends string = any> extends TDEventHandler {
  type: TDToolType = 'select' as const

  previous?: TDToolType

  status: Status | T = Status.Idle

  constructor(public app: TldrawApp) {
    super()
  }

  protected readonly setStatus = (status: Status | T) => {
    this.status = status as Status | T
    this.app.setStatus(this.status as string)
  }

  onEnter = () => {
    this.setStatus(Status.Idle)
  }

  onExit = () => {
    this.setStatus(Status.Idle)
  }

  onCancel = () => {
    if (this.status === Status.Idle) {
      this.app.selectTool('select')
    } else {
      this.setStatus(Status.Idle)
    }

    this.app.cancelSession()
  }

  getNextChildIndex = () => {
    const {
      shapes,
      appState: { currentPageId },
    } = this.app

    return shapes.length === 0
      ? 1
      : shapes
          .filter((shape) => shape.parentId === currentPageId)
          .sort((a, b) => b.childIndex - a.childIndex)[0].childIndex + 1
  }

  /* --------------------- Camera --------------------- */

  onPinchStart: TLPinchEventHandler = () => {
    this.app.cancelSession()
    this.setStatus(Status.Pinching)
  }

  onPinchEnd: TLPinchEventHandler = () => {
    if (Utils.isMobileSafari()) {
      this.app.undoSelect()
    }
    this.setStatus(Status.Idle)
  }

  onPinch: TLPinchEventHandler = (info, e) => {
    if (this.status !== 'pinching') return
    this.app.pinchZoom(info.point, info.delta, info.delta[2])
    this.onPointerMove?.(info, e as unknown as React.PointerEvent)
  }

  /* ---------------------- Keys ---------------------- */

  onKeyDown: TLKeyboardEventHandler = (key) => {
    if (key === 'Escape') {
      this.onCancel()
      return
    }

    if (key === 'Meta' || key === 'Control' || key === 'Alt') {
      this.app.updateSession()
      return
    }
  }

  onKeyUp: TLKeyboardEventHandler = (key) => {
    if (key === 'Meta' || key === 'Control' || key === 'Alt') {
      this.app.updateSession()
      return
    }
  }

  /* --------------------- Pointer -------------------- */

  onPointerMove: TLPointerEventHandler = () => {
    if (this.status === Status.Creating) {
      this.app.updateSession()
    }
  }

  onPointerUp: TLPointerEventHandler = () => {
    if (this.status === Status.Creating) {
      this.app.completeSession()

      const { isToolLocked } = this.app.appState

      if (!isToolLocked) {
        this.app.selectTool('select')
      }
    }

    this.setStatus(Status.Idle)
  }
}

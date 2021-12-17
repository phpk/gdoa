import { Utils, TLPointerEventHandler } from '@tldraw/core'
import { Draw } from '~state/shapes'
import { SessionType, TDShapeType } from '~types'
import { BaseTool, Status } from '../BaseTool'

export class DrawTool extends BaseTool {
  type = TDShapeType.Draw as const

  /* ----------------- Event Handlers ----------------- */

  onPointerDown: TLPointerEventHandler = (info) => {
    if (this.status !== Status.Idle) return

    const {
      currentPoint,
      appState: { currentPageId, currentStyle },
    } = this.app

    const childIndex = this.getNextChildIndex()

    const id = Utils.uniqueId()

    const newShape = Draw.create({
      id,
      parentId: currentPageId,
      childIndex,
      point: [...currentPoint, info.pressure || 0.5],
      style: { ...currentStyle },
    })

    this.app.patchCreate([newShape])

    this.app.startSession(SessionType.Draw, id)

    this.setStatus(Status.Creating)
  }

  onPointerMove: TLPointerEventHandler = () => {
    if (this.status === Status.Creating) {
      this.app.updateSession()
    }
  }

  onPointerUp: TLPointerEventHandler = () => {
    if (this.status === Status.Creating) {
      this.app.completeSession()
    }

    this.setStatus(Status.Idle)
  }
}

import {
  TLBoundsCorner,
  TLBoundsEdge,
  TLBoundsEventHandler,
  TLBoundsHandleEventHandler,
  TLCanvasEventHandler,
  TLPointerEventHandler,
  TLKeyboardEventHandler,
  TLShapeCloneHandler,
  Utils,
} from '@tldraw/core'
import { SessionType, TDShapeType } from '~types'
import { BaseTool } from '../BaseTool'
import Vec from '@tldraw/vec'
import { TLDR } from '~state/TLDR'
import { CLONING_DISTANCE, DEAD_ZONE } from '~constants'

enum Status {
  Idle = 'idle',
  Creating = 'creating',
  Pinching = 'pinching',
  PointingCanvas = 'pointingCanvas',
  PointingHandle = 'pointingHandle',
  PointingBounds = 'pointingBounds',
  PointingClone = 'pointingClone',
  TranslatingClone = 'translatingClone',
  PointingBoundsHandle = 'pointingBoundsHandle',
  TranslatingHandle = 'translatingHandle',
  Translating = 'translating',
  Transforming = 'transforming',
  Rotating = 'rotating',
  Brushing = 'brushing',
  GridCloning = 'gridCloning',
  ClonePainting = 'clonePainting',
  SpacePanning = 'spacePanning',
  MiddleWheelPanning = 'middleWheelPanning',
}

export class SelectTool extends BaseTool<Status> {
  type = 'select' as const

  pointedId?: string

  selectedGroupId?: string

  pointedHandleId?: 'start' | 'end' | 'bend'

  pointedBoundsHandle?: TLBoundsCorner | TLBoundsEdge | 'rotate' | 'center' | 'left' | 'right'

  pointedLinkHandleId?: 'left' | 'center' | 'right'

  /* --------------------- Methods -------------------- */

  private deselect(id: string) {
    this.app.select(...this.app.selectedIds.filter((oid) => oid !== id))
  }

  private select(id: string) {
    this.app.select(id)
  }

  private pushSelect(id: string) {
    const shape = this.app.getShape(id)
    this.app.select(...this.app.selectedIds.filter((oid) => oid !== shape.parentId), id)
  }

  private selectNone() {
    this.app.selectNone()
  }

  onEnter = () => {
    this.setStatus(Status.Idle)
  }

  onExit = () => {
    this.setStatus(Status.Idle)
  }

  clonePaint = (point: number[]) => {
    if (this.app.selectedIds.length === 0) return

    const shapes = this.app.selectedIds.map((id) => this.app.getShape(id))

    const bounds = Utils.expandBounds(Utils.getCommonBounds(shapes.map(TLDR.getBounds)), 16)

    const center = Utils.getBoundsCenter(bounds)

    const size = [bounds.width, bounds.height]

    const gridPoint = [
      center[0] + size[0] * Math.floor((point[0] + size[0] / 2 - center[0]) / size[0]),
      center[1] + size[1] * Math.floor((point[1] + size[1] / 2 - center[1]) / size[1]),
    ]

    const centeredBounds = Utils.centerBounds(bounds, gridPoint)

    const hit = this.app.shapes.some((shape) =>
      TLDR.getShapeUtil(shape).hitTestBounds(shape, centeredBounds)
    )

    if (!hit) {
      this.app.duplicate(this.app.selectedIds, gridPoint)
    }
  }

  getShapeClone = (
    id: string,
    side:
      | 'top'
      | 'right'
      | 'bottom'
      | 'left'
      | 'topLeft'
      | 'topRight'
      | 'bottomRight'
      | 'bottomLeft'
  ) => {
    const shape = this.app.getShape(id)

    const utils = TLDR.getShapeUtil(shape)

    if (utils.canClone) {
      const bounds = utils.getBounds(shape)

      const center = utils.getCenter(shape)

      let point = {
        top: [bounds.minX, bounds.minY - (bounds.height + CLONING_DISTANCE)],
        right: [bounds.maxX + CLONING_DISTANCE, bounds.minY],
        bottom: [bounds.minX, bounds.maxY + CLONING_DISTANCE],
        left: [bounds.minX - (bounds.width + CLONING_DISTANCE), bounds.minY],
        topLeft: [
          bounds.minX - (bounds.width + CLONING_DISTANCE),
          bounds.minY - (bounds.height + CLONING_DISTANCE),
        ],
        topRight: [
          bounds.maxX + CLONING_DISTANCE,
          bounds.minY - (bounds.height + CLONING_DISTANCE),
        ],
        bottomLeft: [
          bounds.minX - (bounds.width + CLONING_DISTANCE),
          bounds.maxY + CLONING_DISTANCE,
        ],
        bottomRight: [bounds.maxX + CLONING_DISTANCE, bounds.maxY + CLONING_DISTANCE],
      }[side]

      if (shape.rotation !== 0) {
        const newCenter = Vec.add(point, [bounds.width / 2, bounds.height / 2])

        const rotatedCenter = Vec.rotWith(newCenter, center, shape.rotation || 0)

        point = Vec.sub(rotatedCenter, [bounds.width / 2, bounds.height / 2])
      }

      const id = Utils.uniqueId()

      const clone = {
        ...shape,
        id,
        point,
      }

      if (clone.type === TDShapeType.Sticky) {
        clone.text = ''
      }

      return clone
    }

    return
  }

  /* ----------------- Event Handlers ----------------- */

  onCancel = () => {
    this.selectNone()
    this.app.cancelSession()
    this.setStatus(Status.Idle)
  }

  onKeyDown: TLKeyboardEventHandler = (key) => {
    if (key === 'Escape') {
      this.onCancel()
      return
    }

    if (key === ' ' && this.status === Status.Idle) {
      this.setStatus(Status.SpacePanning)
    }

    if (key === 'Tab') {
      if (this.status === Status.Idle && this.app.selectedIds.length === 1) {
        const [selectedId] = this.app.selectedIds
        const clonedShape = this.getShapeClone(selectedId, 'right')

        if (clonedShape) {
          this.app.createShapes(clonedShape)
          this.setStatus(Status.Idle)
          if (clonedShape.type === TDShapeType.Sticky) {
            this.app.select(clonedShape.id)
            this.app.setEditingId(clonedShape.id)
          }
        }
      }

      return
    }

    if (key === 'Meta' || key === 'Control' || key === 'Alt') {
      this.app.updateSession()
      return
    }
  }

  onKeyUp: TLKeyboardEventHandler = (key, info) => {
    if (this.status === Status.ClonePainting && !(info.altKey && info.shiftKey)) {
      this.setStatus(Status.Idle)
      return
    }

    if (this.status === Status.SpacePanning && key === ' ') {
      this.setStatus(Status.Idle)
      return
    }

    /* noop */
    if (key === 'Meta' || key === 'Control' || key === 'Alt') {
      this.app.updateSession()
      return
    }
  }

  // Keyup is handled on BaseTool

  // Pointer Events (generic)

  onPointerMove: TLPointerEventHandler = (info, e) => {
    const { originPoint, currentPoint } = this.app

    if (
      (this.status === Status.SpacePanning && e.buttons === 1) ||
      (this.status === Status.MiddleWheelPanning && e.buttons === 4)
    ) {
      this.app.onPan?.({ ...info, delta: Vec.neg(info.delta) }, e as unknown as WheelEvent)
      return
    }

    if (this.status === Status.PointingBoundsHandle) {
      if (!this.pointedBoundsHandle) throw Error('No pointed bounds handle')
      if (Vec.dist(originPoint, currentPoint) > DEAD_ZONE) {
        if (this.pointedBoundsHandle === 'rotate') {
          // Stat a rotate session
          this.setStatus(Status.Rotating)
          this.app.startSession(SessionType.Rotate)
        } else if (
          this.pointedBoundsHandle === 'center' ||
          this.pointedBoundsHandle === 'left' ||
          this.pointedBoundsHandle === 'right'
        ) {
          this.setStatus(Status.Translating)
          this.app.startSession(SessionType.Translate, false, this.pointedBoundsHandle)
        } else {
          // Stat a transform session
          this.setStatus(Status.Transforming)

          const idsToTransform = this.app.selectedIds.flatMap((id) =>
            TLDR.getDocumentBranch(this.app.state, id, this.app.currentPageId)
          )

          if (idsToTransform.length === 1) {
            // if only one shape is selected, transform single
            this.app.startSession(
              SessionType.TransformSingle,
              idsToTransform[0],
              this.pointedBoundsHandle
            )
          } else {
            // otherwise, transform
            this.app.startSession(SessionType.Transform, this.pointedBoundsHandle)
          }
        }

        // Also update the session with the current point
        this.app.updateSession()
      }
      return
    }

    if (this.status === Status.PointingCanvas) {
      if (Vec.dist(originPoint, currentPoint) > DEAD_ZONE) {
        this.app.startSession(SessionType.Brush)
        this.setStatus(Status.Brushing)
      }
      return
    }

    if (this.status === Status.PointingClone) {
      if (Vec.dist(originPoint, currentPoint) > DEAD_ZONE) {
        this.setStatus(Status.TranslatingClone)
        this.app.startSession(SessionType.Translate)
        this.app.updateSession()
      }
      return
    }

    if (this.status === Status.PointingBounds) {
      if (Vec.dist(originPoint, currentPoint) > DEAD_ZONE) {
        this.setStatus(Status.Translating)
        this.app.startSession(SessionType.Translate)
        this.app.updateSession()
      }
      return
    }

    if (this.status === Status.PointingHandle) {
      if (!this.pointedHandleId) throw Error('No pointed handle')
      if (Vec.dist(originPoint, currentPoint) > DEAD_ZONE) {
        this.setStatus(Status.TranslatingHandle)
        const selectedShape = this.app.getShape(this.app.selectedIds[0])
        if (!selectedShape) return
        if (this.pointedHandleId === 'bend') {
          this.app.startSession(SessionType.Handle, selectedShape.id, this.pointedHandleId)
          this.app.updateSession()
        } else {
          this.app.startSession(SessionType.Arrow, selectedShape.id, this.pointedHandleId, false)
          this.app.updateSession()
        }
      }
      return
    }

    if (this.app.session) {
      return this.app.updateSession()
    }

    if (this.status === Status.ClonePainting) {
      this.clonePaint(currentPoint)
    }

    return
  }

  onPointerDown: TLPointerEventHandler = (info, e) => {
    if (e.buttons === 4) {
      this.setStatus(Status.MiddleWheelPanning)
    }

    if (info.target === 'canvas' && this.status === Status.Idle) {
      const { currentPoint } = this.app

      if (info.spaceKey && e.buttons === 1) return

      if (this.status === Status.Idle && info.altKey && info.shiftKey) {
        this.setStatus(Status.ClonePainting)
        this.clonePaint(currentPoint)
        return
      }

      // Unless the user is holding shift or meta, clear the current selection
      if (!info.shiftKey) {
        this.app.onShapeBlur()

        if (info.altKey && this.app.selectedIds.length > 0) {
          this.app.duplicate(this.app.selectedIds, currentPoint)
          return
        }

        this.selectNone()
      }

      this.setStatus(Status.PointingCanvas)
    }
  }

  onPointerUp: TLPointerEventHandler = (info, e) => {
    if (this.status === Status.MiddleWheelPanning) {
      this.setStatus(Status.Idle)
      return
    }

    if (this.status === Status.TranslatingClone || this.status === Status.PointingClone) {
      if (this.pointedId) {
        this.app.completeSession()
        this.app.setEditingId(this.pointedId)
      }
      this.setStatus(Status.Idle)
      this.pointedId = undefined
      return
    }

    if (this.status === Status.PointingBounds) {
      if (info.target === 'bounds') {
        // If we just clicked the selecting bounds's background,
        // clear the selection
        this.selectNone()
      } else if (this.app.isSelected(info.target)) {
        // If we're holding shift...
        if (info.shiftKey) {
          // unless we just shift-selected the shape, remove it from
          // the selected shapes
          if (this.pointedId !== info.target) {
            this.deselect(info.target)
          }
        } else {
          // If we have other selected shapes, select this one instead
          if (this.pointedId !== info.target && this.app.selectedIds.length > 1) {
            this.select(info.target)
          }
        }
      } else if (this.pointedId === info.target) {
        if (this.app.getShape(info.target).isLocked) return
        // If the target is not selected and was just pointed
        // on pointer down...
        if (info.shiftKey) {
          this.pushSelect(info.target)
        } else {
          this.select(info.target)
        }
      }
    }

    // Complete the current session, if any; and reset the status
    this.app.completeSession()
    this.setStatus(Status.Idle)
    this.pointedBoundsHandle = undefined
    this.pointedHandleId = undefined
    this.pointedId = undefined
  }

  // Canvas

  onDoubleClickCanvas: TLCanvasEventHandler = () => {
    // Needs debugging
    // const { currentPoint } = this.app
    // this.app.selectTool(TDShapeType.Text)
    // this.setStatus(Status.Idle)
    // this.app.createTextShapeAtPoint(currentPoint)
  }

  // Shape

  onPointShape: TLPointerEventHandler = (info, e) => {
    if (info.spaceKey && e.buttons === 1) return

    if (this.app.getShape(info.target).isLocked) return

    const { editingId, hoveredId } = this.app.pageState

    if (editingId && info.target !== editingId) {
      this.app.onShapeBlur()
    }

    // While holding command and shift, select or deselect
    // the shape, ignoring any group that may contain it. Yikes!
    if (
      (this.status === Status.Idle || this.status === Status.PointingBounds) &&
      info.metaKey &&
      info.shiftKey &&
      hoveredId
    ) {
      this.pointedId = hoveredId

      if (this.app.isSelected(hoveredId)) {
        this.deselect(hoveredId)
      } else {
        this.pushSelect(hoveredId)
        this.setStatus(Status.PointingBounds)
      }

      return
    }

    if (this.status === Status.PointingBounds) {
      // The pointed id should be the shape's group, if it belongs
      // to a group, or else the shape itself, if it is on the page.
      const { parentId } = this.app.getShape(info.target)
      this.pointedId = parentId === this.app.currentPageId ? info.target : parentId
      return
    }

    if (this.status === Status.Idle) {
      this.setStatus(Status.PointingBounds)

      if (info.metaKey) {
        if (!info.shiftKey) {
          this.selectNone()
        }

        this.app.startSession(SessionType.Brush)

        this.setStatus(Status.Brushing)
        return
      }

      // If we've clicked on a shape that is inside of a group,
      // then select the group rather than the shape.
      let shapeIdToSelect: string
      const { parentId } = this.app.getShape(info.target)

      // If the pointed shape is a child of the page, select the
      // target shape and clear the selected group id.
      if (parentId === this.app.currentPageId) {
        shapeIdToSelect = info.target
        this.selectedGroupId = undefined
      } else {
        // If the parent is some other group...
        if (parentId === this.selectedGroupId) {
          // If that group is the selected group, then select
          // the target shape.
          shapeIdToSelect = info.target
        } else {
          // Otherwise, select the group and clear the selected
          // group id.
          shapeIdToSelect = parentId

          this.selectedGroupId = undefined
        }
      }

      if (!this.app.isSelected(shapeIdToSelect)) {
        // Set the pointed ID to the shape that was clicked.
        this.pointedId = shapeIdToSelect

        // If the shape is not selected: then if the user is pressing shift,
        // add the shape to the current selection; otherwise, set the shape as
        // the only selected shape.
        if (info.shiftKey) {
          this.pushSelect(shapeIdToSelect)
        } else {
          this.select(shapeIdToSelect)
        }
      }
    }
  }

  onDoubleClickShape: TLPointerEventHandler = (info) => {
    const shape = this.app.getShape(info.target)

    if (shape.isLocked) {
      this.app.select(info.target)
      return
    }

    // If we can edit the shape (and if we can select the shape) then
    // start editing
    if (
      TLDR.getShapeUtil(shape.type).canEdit &&
      (shape.parentId === this.app.currentPageId || shape.parentId === this.selectedGroupId)
    ) {
      this.app.setEditingId(info.target)
    }

    // If the shape is the child of a group, then drill into the group?
    if (shape.parentId !== this.app.currentPageId) {
      this.selectedGroupId = shape.parentId
    }

    this.app.select(info.target)
  }

  onRightPointShape: TLPointerEventHandler = (info) => {
    if (!this.app.isSelected(info.target)) {
      this.app.select(info.target)
    }
  }

  onHoverShape: TLPointerEventHandler = (info) => {
    this.app.setHoveredId(info.target)
  }

  onUnhoverShape: TLPointerEventHandler = (info) => {
    const { currentPageId: oldCurrentPageId } = this.app

    // Wait a frame; and if we haven't changed the hovered id,
    // clear the current hovered id
    requestAnimationFrame(() => {
      if (
        oldCurrentPageId === this.app.currentPageId &&
        this.app.pageState.hoveredId === info.target
      ) {
        this.app.setHoveredId(undefined)
      }
    })
  }

  /* --------------------- Bounds --------------------- */

  onPointBounds: TLBoundsEventHandler = (info) => {
    if (info.metaKey) {
      if (!info.shiftKey) {
        this.selectNone()
      }

      this.app.startSession(SessionType.Brush)

      this.setStatus(Status.Brushing)
      return
    }

    this.setStatus(Status.PointingBounds)
  }

  onRightPointBounds: TLPointerEventHandler = (info, e) => {
    e.stopPropagation()
  }

  onReleaseBounds: TLBoundsEventHandler = () => {
    if (this.status === Status.Translating || this.status === Status.Brushing) {
      this.app.completeSession()
    }

    this.setStatus(Status.Idle)
  }

  /* ----------------- Bounds Handles ----------------- */

  onPointBoundsHandle: TLBoundsHandleEventHandler = (info) => {
    this.pointedBoundsHandle = info.target
    this.setStatus(Status.PointingBoundsHandle)
  }

  onDoubleClickBoundsHandle: TLBoundsHandleEventHandler = (info) => {
    if (info.target === 'center' || info.target === 'left' || info.target === 'right') {
      this.app.select(
        ...TLDR.getLinkedShapeIds(
          this.app.state,
          this.app.currentPageId,
          info.target,
          info.shiftKey
        )
      )
    }

    if (this.app.selectedIds.length === 1) {
      this.app.resetBounds(this.app.selectedIds)
    }
  }

  onReleaseBoundsHandle: TLBoundsHandleEventHandler = () => {
    this.setStatus(Status.Idle)
  }

  /* --------------------- Handles -------------------- */

  onPointHandle: TLPointerEventHandler = (info) => {
    this.pointedHandleId = info.target as 'start' | 'end'
    this.setStatus(Status.PointingHandle)
  }

  onDoubleClickHandle: TLPointerEventHandler = (info) => {
    this.app.toggleDecoration(info.target)
  }

  onReleaseHandle: TLPointerEventHandler = () => {
    this.setStatus(Status.Idle)
  }

  /* ---------------------- Misc ---------------------- */

  onShapeClone: TLShapeCloneHandler = (info) => {
    const selectedShapeId = this.app.selectedIds[0]

    const clonedShape = this.getShapeClone(selectedShapeId, info.target)

    if (
      info.target === 'left' ||
      info.target === 'right' ||
      info.target === 'top' ||
      info.target === 'bottom'
    ) {
      if (clonedShape) {
        this.app.createShapes(clonedShape)

        // Now start pointing the bounds, so that a user can start
        // dragging to reposition if they wish.
        this.pointedId = clonedShape.id
        this.setStatus(Status.PointingClone)
      }
    } else {
      this.setStatus(Status.GridCloning)
      this.app.startSession(SessionType.Grid, selectedShapeId)
    }
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TLBoundsCorner, Utils } from '@tldraw/core'
import { StretchType, TDShapeType } from '~types'
import type { TldrawCommand } from '~types'
import { TLDR } from '~state/TLDR'
import type { TldrawApp } from '../../internal'

export function stretchShapes(app: TldrawApp, ids: string[], type: StretchType): TldrawCommand {
  const { currentPageId, selectedIds } = app

  const initialShapes = ids.map((id) => app.getShape(id))

  const boundsForShapes = initialShapes.map((shape) => TLDR.getBounds(shape))

  const commonBounds = Utils.getCommonBounds(boundsForShapes)

  const idsToMutate = ids
    .flatMap((id) => {
      const shape = app.getShape(id)
      return shape.children ? shape.children : shape.id
    })
    .filter((id) => !app.getShape(id).isLocked)

  const { before, after } = TLDR.mutateShapes(
    app.state,
    idsToMutate,
    (shape) => {
      const bounds = TLDR.getBounds(shape)

      switch (type) {
        case StretchType.Horizontal: {
          const newBounds = {
            ...bounds,
            minX: commonBounds.minX,
            maxX: commonBounds.maxX,
            width: commonBounds.width,
          }

          return TLDR.getShapeUtil(shape).transformSingle(shape, newBounds, {
            type: TLBoundsCorner.TopLeft,
            scaleX: newBounds.width / bounds.width,
            scaleY: 1,
            initialShape: shape,
            transformOrigin: [0.5, 0.5],
          })
        }
        case StretchType.Vertical: {
          const newBounds = {
            ...bounds,
            minY: commonBounds.minY,
            maxY: commonBounds.maxY,
            height: commonBounds.height,
          }

          return TLDR.getShapeUtil(shape).transformSingle(shape, newBounds, {
            type: TLBoundsCorner.TopLeft,
            scaleX: 1,
            scaleY: newBounds.height / bounds.height,
            initialShape: shape,
            transformOrigin: [0.5, 0.5],
          })
        }
      }
    },
    currentPageId
  )

  initialShapes.forEach((shape) => {
    if (shape.type === TDShapeType.Group) {
      delete before[shape.id]
      delete after[shape.id]
    }
  })

  return {
    id: 'stretch',
    before: {
      document: {
        pages: {
          [currentPageId]: { shapes: before },
        },
        pageStates: {
          [currentPageId]: {
            selectedIds,
          },
        },
      },
    },
    after: {
      document: {
        pages: {
          [currentPageId]: { shapes: after },
        },
        pageStates: {
          [currentPageId]: {
            selectedIds: ids,
          },
        },
      },
    },
  }
}

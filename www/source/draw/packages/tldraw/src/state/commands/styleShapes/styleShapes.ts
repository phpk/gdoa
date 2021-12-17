import { Patch, ShapeStyles, TldrawCommand, TDShape, TDShapeType, TextShape } from '~types'
import { TLDR } from '~state/TLDR'
import { Vec } from '@tldraw/vec'
import type { TldrawApp } from '../../internal'

export function styleShapes(
  app: TldrawApp,
  ids: string[],
  changes: Partial<ShapeStyles>
): TldrawCommand {
  const { currentPageId, selectedIds } = app

  const shapeIdsToMutate = ids
    .flatMap((id) => TLDR.getDocumentBranch(app.state, id, currentPageId))
    .filter((id) => !app.getShape(id).isLocked)

  const beforeShapes: Record<string, Patch<TDShape>> = {}
  const afterShapes: Record<string, Patch<TDShape>> = {}

  shapeIdsToMutate
    .map((id) => app.getShape(id))
    .filter((shape) => !shape.isLocked)
    .forEach((shape) => {
      beforeShapes[shape.id] = {
        style: {
          ...Object.fromEntries(
            Object.keys(changes).map((key) => [key, shape.style[key as keyof typeof shape.style]])
          ),
        },
      }

      afterShapes[shape.id] = {
        style: changes,
      }

      if (shape.type === TDShapeType.Text) {
        beforeShapes[shape.id].point = shape.point
        afterShapes[shape.id].point = Vec.toFixed(
          Vec.add(
            shape.point,
            Vec.sub(
              app.getShapeUtil(shape).getCenter(shape),
              app.getShapeUtil(shape).getCenter({
                ...shape,
                style: { ...shape.style, ...changes },
              } as TextShape)
            )
          )
        )
      }
    })

  return {
    id: 'style',
    before: {
      document: {
        pages: {
          [currentPageId]: {
            shapes: beforeShapes,
          },
        },
        pageStates: {
          [currentPageId]: {
            selectedIds: selectedIds,
          },
        },
      },
      appState: {
        currentStyle: { ...app.appState.currentStyle },
      },
    },
    after: {
      document: {
        pages: {
          [currentPageId]: {
            shapes: afterShapes,
          },
        },
        pageStates: {
          [currentPageId]: {
            selectedIds: ids,
          },
        },
      },
      appState: {
        currentStyle: changes,
      },
    },
  }
}

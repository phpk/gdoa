import { TLDR } from '~state/TLDR'
import type { ArrowShape, TDSnapshot, GroupShape, PagePartial } from '~types'

export function removeShapesFromPage(data: TDSnapshot, ids: string[], pageId: string) {
  const before: PagePartial = {
    shapes: {},
    bindings: {},
  }

  const after: PagePartial = {
    shapes: {},
    bindings: {},
  }

  const parentsToUpdate: GroupShape[] = []

  const deletedIds = new Set()

  // These are the shapes we're definitely going to delete

  ids
    .filter((id) => !TLDR.getShape(data, id, pageId).isLocked)
    .forEach((id) => {
      deletedIds.add(id)
      const shape = TLDR.getShape(data, id, pageId)
      before.shapes[id] = shape
      after.shapes[id] = undefined

      // Also delete the shape's children

      if (shape.children !== undefined) {
        shape.children.forEach((childId) => {
          deletedIds.add(childId)
          const child = TLDR.getShape(data, childId, pageId)
          before.shapes[childId] = child
          after.shapes[childId] = undefined
        })
      }

      if (shape.parentId !== pageId) {
        parentsToUpdate.push(TLDR.getShape(data, shape.parentId, pageId))
      }
    })

  parentsToUpdate.forEach((parent) => {
    if (ids.includes(parent.id)) return
    deletedIds.add(parent.id)
    before.shapes[parent.id] = { children: parent.children }
    after.shapes[parent.id] = { children: parent.children.filter((id) => !ids.includes(id)) }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (after.shapes[parent.id]?.children!.length === 0) {
      after.shapes[parent.id] = undefined
      before.shapes[parent.id] = TLDR.getShape(data, parent.id, pageId)
    }
  })

  // Recursively check for empty parents?

  const page = TLDR.getPage(data, pageId)

  // We also need to delete bindings that reference the deleted shapes
  Object.values(page.bindings)
    .filter((binding) => deletedIds.has(binding.fromId) || deletedIds.has(binding.toId))
    .forEach((binding) => {
      for (const id of [binding.toId, binding.fromId]) {
        // If the binding references a deleted shape...
        if (after.shapes[id] === undefined) {
          // Delete this binding
          before.bindings[binding.id] = binding
          after.bindings[binding.id] = undefined

          // Let's also look each the bound shape...
          const shape = page.shapes[id]

          // If the bound shape has a handle that references the deleted binding...
          if (shape && shape.handles) {
            Object.values(shape.handles)
              .filter((handle) => handle.bindingId === binding.id)
              .forEach((handle) => {
                // Save the binding reference in the before patch
                before.shapes[id] = {
                  ...before.shapes[id],
                  handles: {
                    ...before.shapes[id]?.handles,
                    [handle.id]: {
                      ...before.shapes[id]?.handles?.[handle.id as keyof ArrowShape['handles']],
                      bindingId: binding.id,
                    },
                  },
                }

                // Unless we're currently deleting the shape, remove the
                // binding reference from the after patch
                if (!deletedIds.has(id)) {
                  after.shapes[id] = {
                    ...after.shapes[id],
                    handles: {
                      ...after.shapes[id]?.handles,
                      [handle.id]: {
                        ...after.shapes[id]?.handles?.[handle.id as keyof ArrowShape['handles']],
                        bindingId: undefined,
                      },
                    },
                  }
                }
              })
          }
        }
      }
    })

  return { before, after }
}

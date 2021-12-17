/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Vec } from '@tldraw/vec'
import {
  TLBoundsEventHandler,
  TLBoundsHandleEventHandler,
  TLKeyboardEventHandler,
  TLShapeCloneHandler,
  TLCanvasEventHandler,
  TLPageState,
  TLPinchEventHandler,
  TLPointerEventHandler,
  TLWheelEventHandler,
  Utils,
  TLBounds,
} from '@tldraw/core'
import {
  FlipType,
  TDDocument,
  MoveType,
  AlignType,
  StretchType,
  DistributeType,
  ShapeStyles,
  TDShape,
  TDShapeType,
  TDSnapshot,
  TDStatus,
  TDPage,
  TDBinding,
  GroupShape,
  TldrawCommand,
  TDUser,
  SessionType,
  TDToolType,
} from '~types'
import {
  migrate,
  FileSystemHandle,
  loadFileHandle,
  openFromFileSystem,
  saveToFileSystem,
} from './data'
import { TLDR } from './TLDR'
import { shapeUtils } from '~state/shapes'
import { defaultStyle } from '~state/shapes/shared/shape-styles'
import * as Commands from './commands'
import { SessionArgsOfType, getSession, TldrawSession } from './sessions'
import type { BaseTool } from './tools/BaseTool'
import { USER_COLORS, FIT_TO_SCREEN_PADDING, GRID_SIZE } from '~constants'
import { SelectTool } from './tools/SelectTool'
import { EraseTool } from './tools/EraseTool'
import { TextTool } from './tools/TextTool'
import { DrawTool } from './tools/DrawTool'
import { EllipseTool } from './tools/EllipseTool'
import { RectangleTool } from './tools/RectangleTool'
import { TriangleTool } from './tools/TriangleTool'
import { LineTool } from './tools/LineTool'
import { ArrowTool } from './tools/ArrowTool'
import { StickyTool } from './tools/StickyTool'
import { StateManager } from './StateManager'

const uuid = Utils.uniqueId()

export interface TDCallbacks {
  /**
   * (optional) A callback to run when the component mounts.
   */
  onMount?: (state: TldrawApp) => void
  /**
   * (optional) A callback to run when the component's state changes.
   */
  onChange?: (state: TldrawApp, reason?: string) => void
  /**
   * (optional) A callback to run when the user creates a new project through the menu or through a keyboard shortcut.
   */
  onNewProject?: (state: TldrawApp, e?: KeyboardEvent) => void
  /**
   * (optional) A callback to run when the user saves a project through the menu or through a keyboard shortcut.
   */
  onSaveProject?: (state: TldrawApp, e?: KeyboardEvent) => void
  /**
   * (optional) A callback to run when the user saves a project as a new project through the menu or through a keyboard shortcut.
   */
  onSaveProjectAs?: (state: TldrawApp, e?: KeyboardEvent) => void
  /**
   * (optional) A callback to run when the user opens new project through the menu or through a keyboard shortcut.
   */
  onOpenProject?: (state: TldrawApp, e?: KeyboardEvent) => void
  /**
   * (optional) A callback to run when the user signs in via the menu.
   */
  onSignIn?: (state: TldrawApp) => void
  /**
   * (optional) A callback to run when the user signs out via the menu.
   */
  onSignOut?: (state: TldrawApp) => void
  /**
   * (optional) A callback to run when the state is patched.
   */
  onPatch?: (state: TldrawApp, reason?: string) => void
  /**
   * (optional) A callback to run when the state is changed with a command.
   */
  onCommand?: (state: TldrawApp, reason?: string) => void
  /**
   * (optional) A callback to run when the state is persisted.
   */
  onPersist?: (state: TldrawApp) => void
  /**
   * (optional) A callback to run when the user undos.
   */
  onUndo?: (state: TldrawApp) => void
  /**
   * (optional) A callback to run when the user redos.
   */
  onRedo?: (state: TldrawApp) => void
  /**
   * (optional) A callback to run when the user changes the current page's shapes.
   */
  onChangePage?: (
    app: TldrawApp,
    shapes: Record<string, TDShape | undefined>,
    bindings: Record<string, TDBinding | undefined>
  ) => void
  /**
   * (optional) A callback to run when the user creates a new project.
   */
  onChangePresence?: (state: TldrawApp, user: TDUser) => void
}

export class TldrawApp extends StateManager<TDSnapshot> {
  callbacks: TDCallbacks = {}

  tools = {
    select: new SelectTool(this),
    erase: new EraseTool(this),
    [TDShapeType.Text]: new TextTool(this),
    [TDShapeType.Draw]: new DrawTool(this),
    [TDShapeType.Ellipse]: new EllipseTool(this),
    [TDShapeType.Rectangle]: new RectangleTool(this),
    [TDShapeType.Triangle]: new TriangleTool(this),
    [TDShapeType.Line]: new LineTool(this),
    [TDShapeType.Arrow]: new ArrowTool(this),
    [TDShapeType.Sticky]: new StickyTool(this),
  }

  currentTool: BaseTool = this.tools.select

  session?: TldrawSession

  readOnly = false

  isDirty = false

  isCreating = false

  originPoint = [0, 0]

  currentPoint = [0, 0]

  previousPoint = [0, 0]

  shiftKey = false

  altKey = false

  metaKey = false

  ctrlKey = false

  spaceKey = false

  editingStartTime = -1

  fileSystemHandle: FileSystemHandle | null = null

  viewport = Utils.getBoundsFromPoints([
    [0, 0],
    [100, 100],
  ])

  rendererBounds = Utils.getBoundsFromPoints([
    [0, 0],
    [100, 100],
  ])

  selectHistory = {
    stack: [[]] as string[][],
    pointer: 0,
  }

  clipboard?: {
    shapes: TDShape[]
    bindings: TDBinding[]
  }

  rotationInfo = {
    selectedIds: [] as string[],
    center: [0, 0],
  }

  pasteInfo = {
    center: [0, 0],
    offset: [0, 0],
  }

  constructor(id?: string, callbacks = {} as TDCallbacks) {
    super(TldrawApp.defaultState, id, TldrawApp.version, (prev, next, prevVersion) => {
      return {
        ...next,
        document: migrate(
          { ...next.document, ...prev.document, version: prevVersion },
          TldrawApp.version
        ),
      }
    })

    this.callbacks = callbacks
  }

  /* -------------------- Internal -------------------- */

  protected onReady = () => {
    this.loadDocument(this.document)

    loadFileHandle().then((fileHandle) => {
      this.fileSystemHandle = fileHandle
    })

    try {
      this.patchState({
        appState: {
          status: TDStatus.Idle,
        },
        document: migrate(this.document, TldrawApp.version),
      })
    } catch (e) {
      console.error('The data appears to be corrupted. Resetting!', e)
      localStorage.setItem(this.document.id + '_corrupted', JSON.stringify(this.document))

      this.patchState({
        ...TldrawApp.defaultState,
        appState: {
          ...TldrawApp.defaultState.appState,
          status: TDStatus.Idle,
        },
      })
    }

    this.callbacks.onMount?.(this)
  }

  /**
   * Cleanup the state after each state change.
   * @param state The new state
   * @param prev The previous state
   * @protected
   * @returns The final state
   */
  protected cleanup = (state: TDSnapshot, prev: TDSnapshot): TDSnapshot => {
    const next = { ...state }

    // Remove deleted shapes and bindings (in Commands, these will be set to undefined)
    if (next.document !== prev.document) {
      Object.entries(next.document.pages).forEach(([pageId, page]) => {
        if (page === undefined) {
          // If page is undefined, delete the page and pagestate
          delete next.document.pages[pageId]
          delete next.document.pageStates[pageId]
          return
        }

        const prevPage = prev.document.pages[pageId]

        const changedShapes: Record<string, TDShape | undefined> = {}

        if (!prevPage || page.shapes !== prevPage.shapes || page.bindings !== prevPage.bindings) {
          page.shapes = { ...page.shapes }
          page.bindings = { ...page.bindings }

          const groupsToUpdate = new Set<GroupShape>()

          // If shape is undefined, delete the shape
          Object.entries(page.shapes).forEach(([id, shape]) => {
            let parentId: string

            if (!shape) {
              parentId = prevPage?.shapes[id]?.parentId
              delete page.shapes[id]
            } else {
              parentId = shape.parentId
            }

            if (page.id === next.appState.currentPageId) {
              if (prevPage?.shapes[id] !== shape) {
                changedShapes[id] = shape
              }
            }

            // If the shape is the child of a group, then update the group
            // (unless the group is being deleted too)
            if (parentId && parentId !== pageId) {
              const group = page.shapes[parentId]
              if (group !== undefined) {
                groupsToUpdate.add(page.shapes[parentId] as GroupShape)
              }
            }
          })

          // If binding is undefined, delete the binding
          Object.keys(page.bindings).forEach((id) => {
            if (!page.bindings[id]) {
              delete page.bindings[id]
            }
          })

          next.document.pages[pageId] = page

          // Find which shapes have changed
          // const changedShapes = Object.entries(page.shapes).filter(
          //   ([id, shape]) => prevPage?.shapes[shape.id] !== shape
          // )

          // Get bindings related to the changed shapes
          const bindingsToUpdate = TLDR.getRelatedBindings(next, Object.keys(changedShapes), pageId)

          // Update all of the bindings we've just collected
          bindingsToUpdate.forEach((binding) => {
            if (!page.bindings[binding.id]) {
              return
            }

            const toShape = page.shapes[binding.toId]
            const fromShape = page.shapes[binding.fromId]

            const toUtils = TLDR.getShapeUtil(toShape)

            const fromUtils = TLDR.getShapeUtil(fromShape)

            // We only need to update the binding's "from" shape
            const fromDelta = fromUtils.onBindingChange?.(
              fromShape,
              binding,
              toShape,
              toUtils.getBounds(toShape),
              toUtils.getExpandedBounds(toShape),
              toUtils.getCenter(toShape)
            )

            if (fromDelta) {
              const nextShape = {
                ...fromShape,
                ...fromDelta,
              } as TDShape

              page.shapes[fromShape.id] = nextShape
            }
          })

          groupsToUpdate.forEach((group) => {
            if (!group) throw Error('no group!')
            const children = group.children.filter((id) => page.shapes[id] !== undefined)

            const commonBounds = Utils.getCommonBounds(
              children
                .map((id) => page.shapes[id])
                .filter(Boolean)
                .map((shape) => TLDR.getRotatedBounds(shape))
            )

            page.shapes[group.id] = {
              ...group,
              point: [commonBounds.minX, commonBounds.minY],
              size: [commonBounds.width, commonBounds.height],
              children,
            }
          })
        }

        // Clean up page state, preventing hovers on deleted shapes

        const nextPageState: TLPageState = {
          ...next.document.pageStates[pageId],
        }

        if (!nextPageState.brush) {
          delete nextPageState.brush
        }

        if (nextPageState.hoveredId && !page.shapes[nextPageState.hoveredId]) {
          delete nextPageState.hoveredId
        }

        if (nextPageState.bindingId && !page.bindings[nextPageState.bindingId]) {
          TLDR.warn(`Could not find the binding of ${pageId}`)
          delete nextPageState.bindingId
        }

        if (nextPageState.editingId && !page.shapes[nextPageState.editingId]) {
          TLDR.warn('Could not find the editing shape!')
          delete nextPageState.editingId
        }

        next.document.pageStates[pageId] = nextPageState
      })
    }

    const currentPageId = next.appState.currentPageId

    const currentPageState = next.document.pageStates[currentPageId]

    if (next.room && next.room !== prev.room) {
      const room = { ...next.room, users: { ...next.room.users } }

      // Remove any exited users
      if (prev.room) {
        Object.values(prev.room.users)
          .filter(Boolean)
          .forEach((user) => {
            if (room.users[user.id] === undefined) {
              delete room.users[user.id]
            }
          })
      }

      next.room = room
    }

    if (next.room) {
      next.room.users[next.room.userId] = {
        ...next.room.users[next.room.userId],
        point: this.currentPoint,
        selectedIds: currentPageState.selectedIds,
      }
    }

    // Temporary block on editing pages while in readonly mode.
    // This is a broad solution but not a very good one: the UX
    // for interacting with a readOnly document will be more nuanced.
    if (this.readOnly) {
      next.document.pages = prev.document.pages
    }

    return next
  }

  onPatch = (state: TDSnapshot, id?: string) => {
    this.callbacks.onPatch?.(this, id)
  }

  onCommand = (state: TDSnapshot, id?: string) => {
    this.clearSelectHistory()
    this.isDirty = true
    this.callbacks.onCommand?.(this, id)
  }

  onReplace = () => {
    this.clearSelectHistory()
    this.isDirty = false
  }

  onUndo = () => {
    this.rotationInfo.selectedIds = [...this.selectedIds]
    this.callbacks.onUndo?.(this)
  }

  onRedo = () => {
    this.rotationInfo.selectedIds = [...this.selectedIds]
    this.callbacks.onRedo?.(this)
  }

  onPersist = () => {
    // If we are part of a room, send our changes to the server
    if (this.callbacks.onChangePage) {
      this.broadcastPageChanges()
    }
    this.callbacks.onPersist?.(this)
  }

  private prevSelectedIds = this.selectedIds

  /**
   * Clear the selection history after each new command, undo or redo.
   * @param state
   * @param id
   */
  protected onStateDidChange = (_state: TDSnapshot, id?: string): void => {
    this.callbacks.onChange?.(this, id)

    if (this.room && this.selectedIds !== this.prevSelectedIds) {
      this.callbacks.onChangePresence?.(this, {
        ...this.room.users[this.room.userId],
        selectedIds: this.selectedIds,
      })
      this.prevSelectedIds = this.selectedIds
    }
  }

  /* ----------- Managing Multiplayer State ----------- */

  private justSent = false
  private prevShapes = this.page.shapes
  private prevBindings = this.page.bindings

  private broadcastPageChanges = () => {
    const visited = new Set<string>()

    const changedShapes: Record<string, TDShape | undefined> = {}
    const changedBindings: Record<string, TDBinding | undefined> = {}

    this.shapes.forEach((shape) => {
      visited.add(shape.id)
      if (this.prevShapes[shape.id] !== shape) {
        changedShapes[shape.id] = shape
      }
    })

    Object.keys(this.prevShapes)
      .filter((id) => !visited.has(id))
      .forEach((id) => {
        // After visiting all the current shapes, if we haven't visited a
        // previously present shape, then it was deleted
        changedShapes[id] = undefined
      })

    this.bindings.forEach((binding) => {
      visited.add(binding.id)
      if (this.prevBindings[binding.id] !== binding) {
        changedBindings[binding.id] = binding
      }
    })

    Object.keys(this.prevBindings)
      .filter((id) => !visited.has(id))
      .forEach((id) => {
        // After visiting all the current bindings, if we haven't visited a
        // previously present shape, then it was deleted
        changedBindings[id] = undefined
      })

    // Only trigger update if shapes or bindings have changed
    if (Object.keys(changedBindings).length > 0 || Object.keys(changedShapes).length > 0) {
      this.justSent = true
      this.callbacks.onChangePage?.(this, changedShapes, changedBindings)
      this.prevShapes = this.page.shapes
      this.prevBindings = this.page.bindings
    }
  }

  getReservedContent = (ids: string[], pageId = this.currentPageId) => {
    const { bindings } = this.document.pages[pageId]

    // We want to know which shapes we need to
    const reservedShapes: Record<string, TDShape> = {}
    const reservedBindings: Record<string, TDBinding> = {}

    // Quick lookup maps for bindings
    const bindingsArr = Object.values(bindings)
    const boundTos = new Map(bindingsArr.map((binding) => [binding.toId, binding]))
    const boundFroms = new Map(bindingsArr.map((binding) => [binding.fromId, binding]))
    const bindingMaps = [boundTos, boundFroms]

    // Unique set of shape ids that are going to be reserved
    const reservedShapeIds: string[] = []

    if (this.session) ids.forEach((id) => reservedShapeIds.push(id))

    const strongReservedShapeIds = new Set(reservedShapeIds)

    // Which shape ids have we already visited?
    const visited = new Set<string>()

    // Time to visit every reserved shape and every related shape and binding.
    while (reservedShapeIds.length > 0) {
      const id = reservedShapeIds.pop()
      if (!id) break
      if (visited.has(id)) continue

      // Add to set so that we don't process this id a second time
      visited.add(id)

      // Get the shape and reserve it
      const shape = this.getShape(id)
      reservedShapes[id] = shape

      if (shape.parentId !== pageId) reservedShapeIds.push(shape.parentId)

      // If the shape has children, add the shape's children to the list of ids to process
      if (shape.children) reservedShapeIds.push(...shape.children)

      // If there are binding for this shape, reserve the bindings and
      // add its related shapes to the list of ids to process
      bindingMaps
        .map((map) => map.get(shape.id)!)
        .filter(Boolean)
        .forEach((binding) => {
          reservedBindings[binding.id] = binding
          reservedShapeIds.push(binding.toId, binding.fromId)
        })
    }

    return { reservedShapes, reservedBindings, strongReservedShapeIds }
  }

  /**
   * Manually patch in page content.
   */
  public replacePageContent = (
    shapes: Record<string, TDShape>,
    bindings: Record<string, TDBinding>,
    pageId = this.currentPageId
  ): this => {
    if (this.justSent) {
      // The incoming update was caused by an update that the client sent, noop.
      this.justSent = false
      return this
    }

    this.useStore.setState((current) => {
      const { hoveredId, editingId, bindingId, selectedIds } = current.document.pageStates[pageId]

      const coreReservedIds = [...selectedIds]

      if (editingId) coreReservedIds.push(editingId)

      const { reservedShapes, reservedBindings, strongReservedShapeIds } = this.getReservedContent(
        coreReservedIds,
        this.currentPageId
      )

      // Merge in certain changes to reserved shapes
      Object.values(reservedShapes)
        // Don't merge updates to shapes with text (Text or Sticky)
        .filter((reservedShape) => !('text' in reservedShape))
        .forEach((reservedShape) => {
          const incomingShape = shapes[reservedShape.id]
          if (!incomingShape) return

          // If the shape isn't "strongly reserved", then use the incoming shape;
          // note that this is only if the incoming shape exists! If the shape was
          // deleted in the incoming shapes, then we'll keep out reserved shape.
          // This logic would need more work for arrows, because the incoming shape
          // include a binding change that we'll need to resolve with our reserved bindings.
          if (
            !(
              reservedShape.type === TDShapeType.Arrow ||
              strongReservedShapeIds.has(reservedShape.id)
            )
          ) {
            reservedShapes[reservedShape.id] = incomingShape
            return
          }

          // Only allow certain merges.

          // Allow decorations (of an arrow) to be changed
          if ('decorations' in incomingShape && 'decorations' in reservedShape) {
            reservedShape.decorations = incomingShape.decorations
          }

          // Allow the shape's style to be changed
          reservedShape.style = incomingShape.style
        })

      // Use the incoming shapes / bindings as comparisons for what
      // will have changed. This is important because we want to restore
      // related shapes that may not have changed on our side, but which
      // were deleted on the server.
      this.prevShapes = shapes
      this.prevBindings = bindings

      const nextShapes = {
        ...shapes,
        ...reservedShapes,
      }

      const nextBindings = {
        ...bindings,
        ...reservedBindings,
      }

      const next: TDSnapshot = {
        ...current,
        document: {
          ...current.document,
          pages: {
            [pageId]: {
              ...current.document.pages[pageId],
              shapes: nextShapes,
              bindings: nextBindings,
            },
          },
          pageStates: {
            ...current.document.pageStates,
            [pageId]: {
              ...current.document.pageStates[pageId],
              selectedIds: selectedIds.filter((id) => nextShapes[id] !== undefined),
              hoveredId: hoveredId
                ? nextShapes[hoveredId] === undefined
                  ? undefined
                  : hoveredId
                : undefined,
              editingId: editingId,
              bindingId: bindingId
                ? nextBindings[bindingId] === undefined
                  ? undefined
                  : bindingId
                : undefined,
            },
          },
        },
      }

      // Get bindings related to the changed shapes
      const bindingsToUpdate = TLDR.getRelatedBindings(next, Object.keys(nextShapes), pageId)

      const page = next.document.pages[pageId]

      // Update all of the bindings we've just collected
      bindingsToUpdate.forEach((binding) => {
        if (!page.bindings[binding.id]) {
          return
        }

        const toShape = page.shapes[binding.toId]
        const fromShape = page.shapes[binding.fromId]

        const toUtils = TLDR.getShapeUtil(toShape)

        const fromUtils = TLDR.getShapeUtil(fromShape)

        // We only need to update the binding's "from" shape
        const fromDelta = fromUtils.onBindingChange?.(
          fromShape,
          binding,
          toShape,
          toUtils.getBounds(toShape),
          toUtils.getExpandedBounds(toShape),
          toUtils.getCenter(toShape)
        )

        if (fromDelta) {
          const nextShape = {
            ...fromShape,
            ...fromDelta,
          } as TDShape

          page.shapes[fromShape.id] = nextShape
        }
      })

      Object.values(nextShapes).forEach((shape) => {
        if (shape.type !== TDShapeType.Group) return

        const children = shape.children.filter((id) => page.shapes[id] !== undefined)

        const commonBounds = Utils.getCommonBounds(
          children
            .map((id) => page.shapes[id])
            .filter(Boolean)
            .map((shape) => TLDR.getRotatedBounds(shape))
        )

        page.shapes[shape.id] = {
          ...shape,
          point: [commonBounds.minX, commonBounds.minY],
          size: [commonBounds.width, commonBounds.height],
          children,
        }
      })

      this.state.document = next.document
      // this.prevShapes = nextShapes
      // this.prevBindings = nextBindings

      return next
    }, true)

    return this
  }

  /**
   * Set the current status.
   * @param status The new status to set.
   * @private
   * @returns
   */
  setStatus(status: string) {
    return this.patchState(
      {
        appState: { status },
      },
      `set_status:${status}`
    )
  }

  /**
   * Update the bounding box when the renderer's bounds change.
   * @param bounds
   */
  updateBounds = (bounds: TLBounds) => {
    this.rendererBounds = bounds
    const { point, zoom } = this.pageState.camera
    this.updateViewport(point, zoom)

    if (!this.readOnly && this.session) {
      this.session.update()
    }
  }

  updateViewport = (point: number[], zoom: number) => {
    const { width, height } = this.rendererBounds
    const [minX, minY] = Vec.sub(Vec.div([0, 0], zoom), point)
    const [maxX, maxY] = Vec.sub(Vec.div([width, height], zoom), point)

    this.viewport = {
      minX,
      minY,
      maxX,
      maxY,
      height: maxX - minX,
      width: maxY - minY,
    }
  }

  /**
   * Set or clear the editing id
   * @param id [string]
   */
  setEditingId = (id?: string) => {
    if (this.readOnly) return

    this.editingStartTime = Date.now()
    this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: {
              editingId: id,
            },
          },
        },
      },
      `set_editing_id`
    )
  }

  /**
   * Set or clear the hovered id
   * @param id [string]
   */
  setHoveredId = (id?: string) => {
    this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: {
              hoveredId: id,
            },
          },
        },
      },
      `set_hovered_id`
    )
  }

  /* -------------------------------------------------- */
  /*                    Settings & UI                   */
  /* -------------------------------------------------- */

  /**
   * Set a setting.
   */
  setSetting = <T extends keyof TDSnapshot['settings'], V extends TDSnapshot['settings'][T]>(
    name: T,
    value: V | ((value: V) => V)
  ): this => {
    if (this.session) return this

    this.patchState(
      {
        settings: {
          [name]: typeof value === 'function' ? value(this.settings[name] as V) : value,
        },
      },
      `settings:${name}`
    )
    this.persist()
    return this
  }

  /**
   * Toggle pen mode.
   */
  toggleFocusMode = (): this => {
    if (this.session) return this
    this.patchState(
      {
        settings: {
          isFocusMode: !this.settings.isFocusMode,
        },
      },
      `settings:toggled_focus_mode`
    )
    this.persist()
    return this
  }

  /**
   * Toggle pen mode.
   */
  togglePenMode = (): this => {
    if (this.session) return this
    this.patchState(
      {
        settings: {
          isPenMode: !this.settings.isPenMode,
        },
      },
      `settings:toggled_pen_mode`
    )
    this.persist()
    return this
  }

  /**
   * Toggle dark mode.
   */
  toggleDarkMode = (): this => {
    if (this.session) return this
    this.patchState(
      { settings: { isDarkMode: !this.settings.isDarkMode } },
      `settings:toggled_dark_mode`
    )
    this.persist()
    return this
  }

  /**
   * Toggle zoom snap.
   */
  toggleZoomSnap = () => {
    if (this.session) return this
    this.patchState(
      { settings: { isZoomSnap: !this.settings.isZoomSnap } },
      `settings:toggled_zoom_snap`
    )
    this.persist()
    return this
  }

  /**
   * Toggle debug mode.
   */
  toggleDebugMode = () => {
    if (this.session) return this
    this.patchState(
      { settings: { isDebugMode: !this.settings.isDebugMode } },
      `settings:toggled_debug`
    )
    this.persist()
    return this
  }

  /**
   * Toggles the state if menu is opened
   */
  setMenuOpen = (isOpen: boolean): this => {
    this.patchState({ appState: { isMenuOpen: isOpen } }, 'ui:toggled_menu_opened')
    this.persist()
    return this
  }

  isMenuOpen = (): boolean => this.appState.isMenuOpen

  /**
   * Toggle grids.
   */
  toggleGrid = (): this => {
    if (this.session) return this
    this.patchState({ settings: { showGrid: !this.settings.showGrid } }, 'settings:toggled_grid')
    this.persist()
    return this
  }

  /**
   * Select a tool.
   * @param tool The tool to select, or "select".
   */
  selectTool = (type: TDToolType): this => {
    if (this.readOnly || this.session) return this

    const tool = this.tools[type]

    if (tool === this.currentTool) {
      this.patchState({
        appState: {
          isToolLocked: false,
        },
      })
      return this
    }

    this.currentTool.onExit()
    tool.previous = this.currentTool.type
    this.currentTool = tool
    this.currentTool.onEnter()

    return this.patchState(
      {
        appState: {
          activeTool: type,
          isToolLocked: false,
        },
      },
      `selected_tool:${type}`
    )
  }

  /**
   * Toggle the tool lock option.
   */
  toggleToolLock = (): this => {
    if (this.session) return this
    return this.patchState(
      {
        appState: {
          isToolLocked: !this.appState.isToolLocked,
        },
      },
      `toggled_tool_lock`
    )
  }

  /* -------------------------------------------------- */
  /*                      Document                      */
  /* -------------------------------------------------- */

  /**
   * Reset the document to a blank state.
   */
  resetDocument = (): this => {
    if (this.session) return this
    this.session = undefined
    this.pasteInfo.offset = [0, 0]
    this.currentTool = this.tools.select

    this.resetHistory()
      .clearSelectHistory()
      .loadDocument(migrate(TldrawApp.defaultDocument, TldrawApp.version))
      .persist()
    return this
  }

  /**
   *
   * @param document
   */
  updateUsers = (users: TDUser[], isOwnUpdate = false) => {
    this.patchState(
      {
        room: {
          users: Object.fromEntries(users.map((user) => [user.id, user])),
        },
      },
      isOwnUpdate ? 'room:self:update' : 'room:user:update'
    )
  }

  removeUser = (userId: string) => {
    this.patchState({
      room: {
        users: {
          [userId]: undefined,
        },
      },
    })
  }

  /**
   * Merge a new document patch into the current document.
   * @param document
   */
  mergeDocument = (document: TDDocument): this => {
    // If it's a new document, do a full change.
    if (this.document.id !== document.id) {
      this.replaceState({
        ...this.state,
        appState: {
          ...this.appState,
          currentPageId: Object.keys(document.pages)[0],
        },
        document: migrate(document, TldrawApp.version),
      })
      return this
    }

    // Have we deleted any pages? If so, drop everything and change
    // to the first page. This is an edge case.
    const currentPageStates = { ...this.document.pageStates }

    // Update the app state's current page id if needed
    const nextAppState = {
      ...this.appState,
      currentPageId: document.pages[this.currentPageId]
        ? this.currentPageId
        : Object.keys(document.pages)[0],
      pages: Object.values(document.pages).map((page, i) => ({
        id: page.id,
        name: page.name,
        childIndex: page.childIndex || i,
      })),
    }

    // Reset the history (for now)
    this.resetHistory()

    Object.keys(this.document.pages).forEach((pageId) => {
      if (!document.pages[pageId]) {
        if (pageId === this.appState.currentPageId) {
          this.cancelSession()
          this.selectNone()
        }

        currentPageStates[pageId] = undefined as unknown as TLPageState
      }
    })

    // Don't allow the selected ids to be deleted during a session—if
    // they've been removed, put them back in the client's document.
    if (this.session) {
      this.selectedIds
        .filter((id) => !document.pages[this.currentPageId].shapes[id])
        .forEach((id) => (document.pages[this.currentPageId].shapes[id] = this.page.shapes[id]))
    }

    // For other pages, remove any selected ids that were deleted.
    Object.entries(currentPageStates).forEach(([pageId, pageState]) => {
      pageState.selectedIds = pageState.selectedIds.filter(
        (id) => !!document.pages[pageId].shapes[id]
      )
    })

    // If the user is currently creating a shape (ie drawing), then put that
    // shape back onto the page for the client.
    const { editingId } = this.pageState

    if (editingId) {
      document.pages[this.currentPageId].shapes[editingId] = this.page.shapes[editingId]
      currentPageStates[this.currentPageId].selectedIds = [editingId]
    }

    return this.replaceState(
      {
        ...this.state,
        appState: nextAppState,
        document: {
          ...migrate(document, TldrawApp.version),
          pageStates: currentPageStates,
        },
      },
      'merge'
    )
  }

  /**
   * Update the current document.
   * @param document
   */
  updateDocument = (document: TDDocument, reason = 'updated_document'): this => {
    const prevState = this.state

    const nextState = { ...prevState, document: { ...prevState.document } }

    if (!document.pages[this.currentPageId]) {
      nextState.appState = {
        ...prevState.appState,
        currentPageId: Object.keys(document.pages)[0],
      }
    }

    let i = 1

    for (const nextPage of Object.values(document.pages)) {
      if (nextPage !== prevState.document.pages[nextPage.id]) {
        nextState.document.pages[nextPage.id] = nextPage

        if (!nextPage.name) {
          nextState.document.pages[nextPage.id].name = `Page ${i + 1}`
          i++
        }
      }
    }

    for (const nextPageState of Object.values(document.pageStates)) {
      if (nextPageState !== prevState.document.pageStates[nextPageState.id]) {
        nextState.document.pageStates[nextPageState.id] = nextPageState

        const nextPage = document.pages[nextPageState.id]
        const keysToCheck = ['bindingId', 'editingId', 'hoveredId', 'pointedId'] as const

        for (const key of keysToCheck) {
          if (!nextPage.shapes[key]) {
            nextPageState[key] = undefined
          }
        }

        nextPageState.selectedIds = nextPageState.selectedIds.filter(
          (id) => !!document.pages[nextPage.id].shapes[id]
        )
      }
    }

    nextState.document = migrate(nextState.document, nextState.document.version || 0)

    return this.replaceState(nextState, `${reason}:${document.id}`)
  }

  /**
   * Load a fresh room into the state.
   * @param roomId
   */
  loadRoom = (roomId: string): this => {
    this.patchState({
      room: {
        id: roomId,
        userId: uuid,
        users: {
          [uuid]: {
            id: uuid,
            color: USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)],
            point: [100, 100],
            selectedIds: [],
            activeShapes: [],
          },
        },
      },
    })
    return this
  }

  /**
   * Load a new document.
   * @param document The document to load
   */
  loadDocument = (document: TDDocument): this => {
    this.selectNone()
    this.resetHistory()
    this.clearSelectHistory()
    this.session = undefined

    this.replaceState(
      {
        ...TldrawApp.defaultState,
        document: migrate(document, TldrawApp.version),
        appState: {
          ...TldrawApp.defaultState.appState,
          currentPageId: Object.keys(document.pages)[0],
        },
      },
      'loaded_document'
    )
    return this
  }

  // Should we move this to the app layer? onSave, onSaveAs, etc?

  /**
   * Create a new project.
   */
  newProject = () => {
    if (!this.isLocal) return
    this.fileSystemHandle = null
    this.resetDocument()
  }

  /**
   * Save the current project.
   */
  saveProject = async () => {
    if (this.readOnly) return
    try {
      const fileHandle = await saveToFileSystem(this.document, this.fileSystemHandle)
      this.fileSystemHandle = fileHandle
      this.persist()
      this.isDirty = false
    } catch (e: any) {
      // Likely cancelled
      console.error(e.message)
    }
    return this
  }

  /**
   * Save the current project as a new file.
   */
  saveProjectAs = async () => {
    try {
      const fileHandle = await saveToFileSystem(this.document, null)
      this.fileSystemHandle = fileHandle
      this.persist()
      this.isDirty = false
    } catch (e: any) {
      // Likely cancelled
      console.error(e.message)
    }
    return this
  }

  /**
   * Load a project from the filesystem.
   * @todo
   */
  openProject = async () => {
    if (!this.isLocal) return

    try {
      const result = await openFromFileSystem()
      if (!result) {
        throw Error()
      }

      const { fileHandle, document } = result
      this.loadDocument(document)
      this.fileSystemHandle = fileHandle
      this.zoomToFit()
      this.persist()
    } catch (e) {
      console.error(e)
    } finally {
      this.persist()
    }
  }

  /**
   * Sign out of the current account.
   * Should move to the www layer.
   * @todo
   */
  signOut = () => {
    // todo
  }
  /* -------------------- Getters --------------------- */

  /**
   * Get the current app state.
   */
  getAppState = (): TDSnapshot['appState'] => {
    return this.appState
  }

  /**
   * Get a page.
   * @param pageId (optional) The page's id.
   */
  getPage = (pageId = this.currentPageId): TDPage => {
    return TLDR.getPage(this.state, pageId || this.currentPageId)
  }

  /**
   * Get the shapes (as an array) from a given page.
   * @param pageId (optional) The page's id.
   */
  getShapes = (pageId = this.currentPageId): TDShape[] => {
    return TLDR.getShapes(this.state, pageId || this.currentPageId)
  }

  /**
   * Get the bindings from a given page.
   * @param pageId (optional) The page's id.
   */
  getBindings = (pageId = this.currentPageId): TDBinding[] => {
    return TLDR.getBindings(this.state, pageId || this.currentPageId)
  }

  /**
   * Get a shape from a given page.
   * @param id The shape's id.
   * @param pageId (optional) The page's id.
   */
  getShape = <T extends TDShape = TDShape>(id: string, pageId = this.currentPageId): T => {
    return TLDR.getShape<T>(this.state, id, pageId)
  }

  /**
   * Get the bounds of a shape on a given page.
   * @param id The shape's id.
   * @param pageId (optional) The page's id.
   */
  getShapeBounds = (id: string, pageId = this.currentPageId): TLBounds => {
    return TLDR.getBounds(this.getShape(id, pageId))
  }

  /**
   * Get a binding from a given page.
   * @param id The binding's id.
   * @param pageId (optional) The page's id.
   */
  getBinding = (id: string, pageId = this.currentPageId): TDBinding => {
    return TLDR.getBinding(this.state, id, pageId)
  }

  /**
   * Get the page state for a given page.
   * @param pageId (optional) The page's id.
   */
  getPageState = (pageId = this.currentPageId): TLPageState => {
    return TLDR.getPageState(this.state, pageId || this.currentPageId)
  }

  /**
   * Turn a screen point into a point on the page.
   * @param point The screen point
   * @param pageId (optional) The page to use
   */
  getPagePoint = (point: number[], pageId = this.currentPageId): number[] => {
    const { camera } = this.getPageState(pageId)
    return Vec.sub(Vec.div(point, camera.zoom), camera.point)
  }

  /**
   * Get the current undo/redo stack.
   */
  get history() {
    return this.stack.slice(0, this.pointer + 1)
  }

  /**
   * Replace the current history stack.
   */
  set history(commands: TldrawCommand[]) {
    this.replaceHistory(commands)
  }

  /**
   * The current document.
   */
  get document(): TDDocument {
    return this.state.document
  }

  /**
   * The current app state.
   */
  get settings(): TDSnapshot['settings'] {
    return this.state.settings
  }

  /**
   * The current app state.
   */
  get appState(): TDSnapshot['appState'] {
    return this.state.appState
  }

  /**
   * The current page id.
   */
  get currentPageId(): string {
    return this.state.appState.currentPageId
  }

  /**
   * The current page.
   */
  get page(): TDPage {
    return this.state.document.pages[this.currentPageId]
  }

  /**
   * The current page's shapes (as an array).
   */
  get shapes(): TDShape[] {
    return Object.values(this.page.shapes)
  }

  /**
   * The current page's bindings.
   */
  get bindings(): TDBinding[] {
    return Object.values(this.page.bindings)
  }

  /**
   * The current page's state.
   */
  get pageState(): TLPageState {
    return this.state.document.pageStates[this.currentPageId]
  }

  /**
   * The page's current selected ids.
   */
  get selectedIds(): string[] {
    return this.pageState.selectedIds
  }

  /* -------------------------------------------------- */
  /*                        Pages                       */
  /* -------------------------------------------------- */

  /**
   * Create a new page.
   * @param pageId (optional) The new page's id.
   */
  createPage = (id?: string): this => {
    if (this.readOnly) return this
    const { width, height } = this.rendererBounds
    return this.setState(Commands.createPage(this, [-width / 2, -height / 2], id))
  }

  /**
   * Change the current page.
   * @param pageId The new current page's id.
   */
  changePage = (pageId: string): this => {
    return this.setState(Commands.changePage(this, pageId))
  }

  /**
   * Rename a page.
   * @param pageId The id of the page to rename.
   * @param name The page's new name
   */
  renamePage = (pageId: string, name: string): this => {
    if (this.readOnly) return this
    return this.setState(Commands.renamePage(this, pageId, name))
  }

  /**
   * Duplicate a page.
   * @param pageId The id of the page to duplicate.
   */
  duplicatePage = (pageId: string): this => {
    if (this.readOnly) return this
    return this.setState(Commands.duplicatePage(this, pageId))
  }

  /**
   * Delete a page.
   * @param pageId The id of the page to delete.
   */
  deletePage = (pageId?: string): this => {
    if (this.readOnly) return this
    if (Object.values(this.document.pages).length <= 1) return this
    return this.setState(Commands.deletePage(this, pageId ? pageId : this.currentPageId))
  }

  /* -------------------------------------------------- */
  /*                      Clipboard                     */
  /* -------------------------------------------------- */

  /**
   * Copy one or more shapes to the clipboard.
   * @param ids The ids of the shapes to copy.
   */
  copy = (ids = this.selectedIds): this => {
    const copyingShapeIds = ids.flatMap((id) =>
      TLDR.getDocumentBranch(this.state, id, this.currentPageId)
    )

    const copyingShapes = copyingShapeIds.map((id) =>
      Utils.deepClone(this.getShape(id, this.currentPageId))
    )

    if (copyingShapes.length === 0) return this

    const copyingBindings: TDBinding[] = Object.values(this.page.bindings).filter(
      (binding) =>
        copyingShapeIds.includes(binding.fromId) && copyingShapeIds.includes(binding.toId)
    )

    this.clipboard = {
      shapes: copyingShapes,
      bindings: copyingBindings,
    }

    try {
      const text = JSON.stringify({
        type: 'tldr/clipboard',
        shapes: copyingShapes,
        bindings: copyingBindings,
      })

      navigator.clipboard.writeText(text).then(
        () => {
          // success
        },
        () => {
          // failure
        }
      )
    } catch (e) {
      // Browser does not support copying to clipboard
    }

    this.pasteInfo.offset = [0, 0]
    this.pasteInfo.center = [0, 0]

    return this
  }

  /**
   * Cut (copy and delete) one or more shapes to the clipboard.
   * @param ids The ids of the shapes to cut.
   */
  cut = (ids = this.selectedIds): this => {
    this.copy(ids)
    this.delete(ids)
    return this
  }

  /**
   * Paste shapes (or text) from clipboard to a certain point.
   * @param point
   */
  paste = (point?: number[]) => {
    if (this.readOnly) return
    const pasteInCurrentPage = (shapes: TDShape[], bindings: TDBinding[]) => {
      const idsMap: Record<string, string> = {}

      shapes.forEach((shape) => (idsMap[shape.id] = Utils.uniqueId()))

      bindings.forEach((binding) => (idsMap[binding.id] = Utils.uniqueId()))

      let startIndex = TLDR.getTopChildIndex(this.state, this.currentPageId)

      const shapesToPaste = shapes
        .sort((a, b) => a.childIndex - b.childIndex)
        .map((shape) => {
          const parentShapeId = idsMap[shape.parentId]

          const copy = {
            ...shape,
            id: idsMap[shape.id],
            parentId: parentShapeId || this.currentPageId,
          }

          if (shape.children) {
            copy.children = shape.children.map((id) => idsMap[id])
          }

          if (!parentShapeId) {
            copy.childIndex = startIndex
            startIndex++
          }

          if (copy.handles) {
            Object.values(copy.handles).forEach((handle) => {
              if (handle.bindingId) {
                handle.bindingId = idsMap[handle.bindingId]
              }
            })
          }

          return copy
        })

      const bindingsToPaste = bindings.map((binding) => ({
        ...binding,
        id: idsMap[binding.id],
        toId: idsMap[binding.toId],
        fromId: idsMap[binding.fromId],
      }))

      const commonBounds = Utils.getCommonBounds(shapesToPaste.map(TLDR.getBounds))

      let center = Vec.toFixed(this.getPagePoint(point || this.centerPoint))

      if (
        Vec.dist(center, this.pasteInfo.center) < 2 ||
        Vec.dist(center, Vec.toFixed(Utils.getBoundsCenter(commonBounds))) < 2
      ) {
        center = Vec.add(center, this.pasteInfo.offset)
        this.pasteInfo.offset = Vec.add(this.pasteInfo.offset, [GRID_SIZE, GRID_SIZE])
      } else {
        this.pasteInfo.center = center
        this.pasteInfo.offset = [0, 0]
      }

      const centeredBounds = Utils.centerBounds(commonBounds, center)

      const delta = Vec.sub(
        Utils.getBoundsCenter(centeredBounds),
        Utils.getBoundsCenter(commonBounds)
      )

      this.create(
        shapesToPaste.map((shape) =>
          TLDR.getShapeUtil(shape.type).create({
            ...shape,
            point: Vec.toFixed(Vec.add(shape.point, delta)),
            parentId: shape.parentId || this.currentPageId,
          })
        ),
        bindingsToPaste
      )
    }
    try {
      if (!('clipboard' in navigator && navigator.clipboard.readText)) {
        throw Error('This browser does not support the clipboard API.')
      }

      navigator.clipboard.readText().then((result) => {
        try {
          const data: { type: string; shapes: TDShape[]; bindings: TDBinding[] } =
            JSON.parse(result)

          if (data.type !== 'tldr/clipboard') {
            throw Error('The pasted string was not from the Tldraw clipboard.')
          }

          pasteInCurrentPage(data.shapes, data.bindings)
        } catch (e) {
          TLDR.warn(e)

          const shapeId = Utils.uniqueId()

          this.createShapes({
            id: shapeId,
            type: TDShapeType.Text,
            parentId: this.appState.currentPageId,
            text: TLDR.normalizeText(result),
            point: this.getPagePoint(this.centerPoint, this.currentPageId),
            style: { ...this.appState.currentStyle },
          })

          this.select(shapeId)
        }
      })
    } catch (e) {
      // Navigator does not support clipboard. Note that this fallback will
      // not support pasting from one document to another.
      if (this.clipboard) {
        pasteInCurrentPage(this.clipboard.shapes, this.clipboard.bindings)
      }
    }

    return this
  }

  /**
   * Copy one or more shapes as SVG.
   * @param ids The ids of the shapes to copy.
   * @param pageId The page from which to copy the shapes.
   * @returns A string containing the JSON.
   */
  copySvg = (ids = this.selectedIds, pageId = this.currentPageId) => {
    if (ids.length === 0) ids = Object.keys(this.page.shapes)
    if (ids.length === 0) return

    const shapes = ids.map((id) => this.getShape(id, pageId))
    const commonBounds = Utils.getCommonBounds(shapes.map(TLDR.getRotatedBounds))
    const padding = 16

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')

    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Source+Code+Pro&family=Source+Sans+Pro&family=Source+Serif+Pro&display=swap');`
    defs.appendChild(style)
    svg.appendChild(defs)

    function getSvgElementForShape(shape: TDShape) {
      const util = TLDR.getShapeUtil(shape)
      const element = util.getSvgElement(shape)
      const bounds = util.getBounds(shape)

      if (!element) return

      element.setAttribute(
        'transform',
        `translate(${padding + shape.point[0] - commonBounds.minX}, ${
          padding + shape.point[1] - commonBounds.minY
        }) rotate(${((shape.rotation || 0) * 180) / Math.PI}, ${bounds.width / 2}, ${
          bounds.height / 2
        })`
      )

      return element
    }

    shapes.forEach((shape) => {
      if (shape.children?.length) {
        // Create a group <g> element for shape
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

        // Get the shape's children as elements
        shape.children
          .map((childId) => this.getShape(childId, pageId))
          .map(getSvgElementForShape)
          .filter(Boolean)
          .forEach((element) => g.appendChild(element!))

        // Add the group element to the SVG
        svg.appendChild(g)

        return
      }

      const element = getSvgElementForShape(shape)

      if (element) {
        svg.appendChild(element)
      }
    })

    // Resize the element to the bounding box
    svg.setAttribute(
      'viewBox',
      [0, 0, commonBounds.width + padding * 2, commonBounds.height + padding * 2].join(' ')
    )

    svg.setAttribute('width', String(commonBounds.width))
    svg.setAttribute('height', String(commonBounds.height))

    const s = new XMLSerializer()

    const svgString = s
      .serializeToString(svg)
      .replaceAll('&#10;      ', '')
      .replaceAll(/((\s|")[0-9]*\.[0-9]{2})([0-9]*)(\b|"|\))/g, '$1')

    TLDR.copyStringToClipboard(svgString)

    return svgString
  }

  /**
   * Copy one or more shapes as JSON.
   * @param ids The ids of the shapes to copy.
   * @param pageId The page from which to copy the shapes.
   * @returns A string containing the JSON.
   */
  copyJson = (ids = this.selectedIds, pageId = this.currentPageId) => {
    if (ids.length === 0) ids = Object.keys(this.page.shapes)
    if (ids.length === 0) return

    const shapes = ids.map((id) => this.getShape(id, pageId))
    const json = JSON.stringify(shapes, null, 2)
    TLDR.copyStringToClipboard(json)
    return json
  }

  /* -------------------------------------------------- */
  /*                       Camera                       */
  /* -------------------------------------------------- */

  /**
   * Set the camera to a specific point and zoom.
   * @param point The camera point (top left of the viewport).
   * @param zoom The zoom level.
   * @param reason Why did the camera change?
   */
  setCamera = (point: number[], zoom: number, reason: string): this => {
    this.updateViewport(point, zoom)
    this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: { camera: { point, zoom } },
          },
        },
      },
      reason
    )

    return this
  }

  /**
   * Reset the camera to the default position
   */
  resetCamera = (): this => {
    return this.setCamera(this.centerPoint, 1, `reset_camera`)
  }

  /**
   * Pan the camera
   * @param delta
   */
  pan = (delta: number[]): this => {
    const { camera } = this.pageState
    return this.setCamera(Vec.toFixed(Vec.sub(camera.point, delta)), camera.zoom, `panned`)
  }

  /**
   * Pinch to a new zoom level, possibly together with a pan.
   * @param point The current point under the cursor.
   * @param delta The movement delta.
   * @param zoomDelta The zoom detal
   */
  pinchZoom = (point: number[], delta: number[], zoom: number): this => {
    const { camera } = this.pageState
    const nextPoint = Vec.sub(camera.point, Vec.div(delta, camera.zoom))
    const nextZoom = zoom
    const p0 = Vec.sub(Vec.div(point, camera.zoom), nextPoint)
    const p1 = Vec.sub(Vec.div(point, nextZoom), nextPoint)
    return this.setCamera(
      Vec.toFixed(Vec.add(nextPoint, Vec.sub(p1, p0))),
      nextZoom,
      `pinch_zoomed`
    )
  }

  /**
   * Zoom to a new zoom level, keeping the point under the cursor in the same position
   * @param next The new zoom level.
   * @param center The point to zoom towards (defaults to screen center).
   */
  zoomTo = (next: number, center = this.centerPoint): this => {
    const { zoom, point } = this.pageState.camera
    const p0 = Vec.sub(Vec.div(center, zoom), point)
    const p1 = Vec.sub(Vec.div(center, next), point)
    return this.setCamera(Vec.toFixed(Vec.add(point, Vec.sub(p1, p0))), next, `zoomed_camera`)
  }

  /**
   * Zoom out by 25%
   */
  zoomIn = (): this => {
    const i = Math.round((this.pageState.camera.zoom * 100) / 25)
    const nextZoom = TLDR.getCameraZoom((i + 1) * 0.25)
    return this.zoomTo(nextZoom)
  }

  /**
   * Zoom in by 25%.
   */
  zoomOut = (): this => {
    const i = Math.round((this.pageState.camera.zoom * 100) / 25)
    const nextZoom = TLDR.getCameraZoom((i - 1) * 0.25)
    return this.zoomTo(nextZoom)
  }

  /**
   * Zoom to fit the page's shapes.
   */
  zoomToFit = (): this => {
    const shapes = this.shapes

    if (shapes.length === 0) return this

    const { rendererBounds } = this

    const commonBounds = Utils.getCommonBounds(shapes.map(TLDR.getBounds))

    let zoom = TLDR.getCameraZoom(
      Math.min(
        (rendererBounds.width - FIT_TO_SCREEN_PADDING) / commonBounds.width,
        (rendererBounds.height - FIT_TO_SCREEN_PADDING) / commonBounds.height
      )
    )

    zoom =
      this.pageState.camera.zoom === zoom || this.pageState.camera.zoom < 1
        ? Math.min(1, zoom)
        : zoom

    const mx = (rendererBounds.width - commonBounds.width * zoom) / 2 / zoom
    const my = (rendererBounds.height - commonBounds.height * zoom) / 2 / zoom

    return this.setCamera(
      Vec.toFixed(Vec.sub([mx, my], [commonBounds.minX, commonBounds.minY])),
      zoom,
      `zoomed_to_fit`
    )
  }

  /**
   * Zoom to the selected shapes.
   */
  zoomToSelection = (): this => {
    if (this.selectedIds.length === 0) return this

    const { rendererBounds } = this
    const selectedBounds = TLDR.getSelectedBounds(this.state)

    let zoom = TLDR.getCameraZoom(
      Math.min(
        (rendererBounds.width - FIT_TO_SCREEN_PADDING) / selectedBounds.width,
        (rendererBounds.height - FIT_TO_SCREEN_PADDING) / selectedBounds.height
      )
    )

    zoom =
      this.pageState.camera.zoom === zoom || this.pageState.camera.zoom < 1
        ? Math.min(1, zoom)
        : zoom

    const mx = (rendererBounds.width - selectedBounds.width * zoom) / 2 / zoom
    const my = (rendererBounds.height - selectedBounds.height * zoom) / 2 / zoom

    return this.setCamera(
      Vec.toFixed(Vec.sub([mx, my], [selectedBounds.minX, selectedBounds.minY])),
      zoom,
      `zoomed_to_selection`
    )
  }

  /**
   * Zoom back to content when the canvas is empty.
   */
  zoomToContent = (): this => {
    const shapes = this.shapes
    const pageState = this.pageState

    if (shapes.length === 0) return this

    const { rendererBounds } = this
    const { zoom } = pageState.camera
    const commonBounds = Utils.getCommonBounds(shapes.map(TLDR.getBounds))

    const mx = (rendererBounds.width - commonBounds.width * zoom) / 2 / zoom
    const my = (rendererBounds.height - commonBounds.height * zoom) / 2 / zoom

    return this.setCamera(
      Vec.toFixed(Vec.sub([mx, my], [commonBounds.minX, commonBounds.minY])),
      this.pageState.camera.zoom,
      `zoomed_to_content`
    )
  }

  /**
   * Zoom the camera to 100%.
   */
  resetZoom = (): this => {
    return this.zoomTo(1)
  }

  /**
   * Zoom the camera by a certain delta.
   * @param delta The zoom delta.
   * @param center The point to zoom toward.
   */
  zoomBy = Utils.throttle((delta: number, center?: number[]): this => {
    const { zoom } = this.pageState.camera
    const nextZoom = TLDR.getCameraZoom(zoom - delta * zoom)
    return this.zoomTo(nextZoom, center)
  }, 16)

  /* -------------------------------------------------- */
  /*                      Selection                     */
  /* -------------------------------------------------- */

  /**
   * Clear the selection history (undo/redo stack for selection).
   */
  private clearSelectHistory = (): this => {
    this.selectHistory.pointer = 0
    this.selectHistory.stack = [this.selectedIds]
    return this
  }

  /**
   * Adds a selection to the selection history (undo/redo stack for selection).
   */
  private addToSelectHistory = (ids: string[]): this => {
    if (this.selectHistory.pointer < this.selectHistory.stack.length) {
      this.selectHistory.stack = this.selectHistory.stack.slice(0, this.selectHistory.pointer + 1)
    }
    this.selectHistory.pointer++
    this.selectHistory.stack.push(ids)
    return this
  }

  /**
   * Set the current selection.
   * @param ids The ids to select
   * @param push Whether to add the ids to the current selection instead.
   */
  private setSelectedIds = (ids: string[], push = false): this => {
    const nextIds = push ? [...this.pageState.selectedIds, ...ids] : [...ids]

    return this.patchState(
      {
        appState: {
          activeTool: 'select',
        },
        document: {
          pageStates: {
            [this.currentPageId]: {
              selectedIds: nextIds,
            },
          },
        },
      },
      `selected`
    )
  }

  /**
   * Undo the most recent selection.
   */
  undoSelect = (): this => {
    if (this.selectHistory.pointer > 0) {
      this.selectHistory.pointer--
      this.setSelectedIds(this.selectHistory.stack[this.selectHistory.pointer])
    }
    return this
  }

  /**
   * Redo the previous selection.
   */
  redoSelect = (): this => {
    if (this.selectHistory.pointer < this.selectHistory.stack.length - 1) {
      this.selectHistory.pointer++
      this.setSelectedIds(this.selectHistory.stack[this.selectHistory.pointer])
    }
    return this
  }

  /**
   * Select one or more shapes.
   * @param ids The shape ids to select.
   */
  select = (...ids: string[]): this => {
    ids.forEach((id) => {
      if (!this.page.shapes[id]) {
        throw Error(`That shape does not exist on page ${this.currentPageId}`)
      }
    })
    this.setSelectedIds(ids)
    this.addToSelectHistory(ids)
    return this
  }

  /**
   * Select all shapes on the page.
   */
  selectAll = (pageId = this.currentPageId): this => {
    if (this.session) return this

    // Select only shapes that are the direct child of the page
    this.setSelectedIds(
      Object.values(this.document.pages[pageId].shapes)
        .filter((shape) => shape.parentId === pageId)
        .map((shape) => shape.id)
    )

    this.addToSelectHistory(this.selectedIds)

    this.selectTool('select')

    return this
  }

  /**
   * Deselect any selected shapes.
   */
  selectNone = (): this => {
    this.setSelectedIds([])
    this.addToSelectHistory(this.selectedIds)
    return this
  }

  /* -------------------------------------------------- */
  /*                      Sessions                 p      */
  /* -------------------------------------------------- */

  /**
   * Start a new session.
   * @param session The new session
   * @param args arguments of the session's start method.
   */
  startSession = <T extends SessionType>(type: T, ...args: SessionArgsOfType<T>): this => {
    if (this.readOnly && type !== SessionType.Brush) return this
    if (this.session) {
      TLDR.warn(`Already in a session! (${this.session.constructor.name})`)
      this.cancelSession()
    }

    const Session = getSession(type)

    // @ts-ignore
    this.session = new Session(this, ...args)

    const result = this.session.start()

    if (result) {
      this.patchState(result, `session:start_${this.session.constructor.name}`)
    }

    return this
    // return this.setStatus(this.session.status)
  }

  /**
   * updateSession.
   * @param args The arguments of the current session's update method.
   */
  updateSession = (): this => {
    const { session } = this
    if (!session) return this

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const patch = session.update()
    if (!patch) return this
    return this.patchState(patch, `session:${session?.constructor.name}`)
  }

  /**
   * Cancel the current session.
   * @param args The arguments of the current session's cancel method.
   */
  cancelSession = (): this => {
    const { session } = this
    if (!session) return this
    this.session = undefined

    const result = session.cancel()

    if (result) {
      this.patchState(result, `session:cancel:${session.constructor.name}`)
    }

    return this
  }

  /**
   * Complete the current session.
   * @param args The arguments of the current session's complete method.
   */
  completeSession = (): this => {
    const { session } = this

    if (!session) return this
    this.session = undefined
    const result = session.complete()

    if (result === undefined) {
      this.isCreating = false

      return this.patchState(
        {
          appState: {
            status: TDStatus.Idle,
          },
          document: {
            pageStates: {
              [this.currentPageId]: {
                editingId: undefined,
                bindingId: undefined,
                hoveredId: undefined,
              },
            },
          },
        },
        `session:complete:${session.constructor.name}`
      )
    } else if ('after' in result) {
      // Session ended with a command

      if (this.isCreating) {
        // We're currently creating a shape. Override the command's
        // before state so that when we undo the command, we remove
        // the shape we just created.
        result.before = {
          appState: {
            ...result.before.appState,
            status: TDStatus.Idle,
          },
          document: {
            pages: {
              [this.currentPageId]: {
                shapes: Object.fromEntries(this.selectedIds.map((id) => [id, undefined])),
              },
            },
            pageStates: {
              [this.currentPageId]: {
                selectedIds: [],
                editingId: null,
                bindingId: null,
                hoveredId: null,
              },
            },
          },
        }

        if (this.appState.isToolLocked) {
          const pageState = result.after?.document?.pageStates?.[this.currentPageId] || {}
          pageState.selectedIds = []
        }

        this.isCreating = false
      }

      result.after.appState = {
        ...result.after.appState,
        status: TDStatus.Idle,
      }

      result.after.document = {
        ...result.after.document,
        pageStates: {
          ...result.after.document?.pageStates,
          [this.currentPageId]: {
            ...(result.after.document?.pageStates || {})[this.currentPageId],
            editingId: null,
          },
        },
      }

      this.setState(result, `session:complete:${session.constructor.name}`)
    } else {
      this.patchState(
        {
          ...result,
          appState: {
            ...result.appState,
            status: TDStatus.Idle,
          },
          document: {
            ...result.document,
            pageStates: {
              [this.currentPageId]: {
                ...result.document?.pageStates?.[this.currentPageId],
                editingId: null,
              },
            },
          },
        },
        `session:complete:${session.constructor.name}`
      )
    }

    return this
  }

  /* -------------------------------------------------- */
  /*                   Shape Functions                  */
  /* -------------------------------------------------- */

  /**
   * Manually create shapes on the page.
   * @param shapes An array of shape partials, containing the initial props for the shapes.
   * @command
   */
  createShapes = (...shapes: ({ id: string; type: TDShapeType } & Partial<TDShape>)[]): this => {
    if (shapes.length === 0) return this

    return this.create(
      shapes.map((shape) => {
        return TLDR.getShapeUtil(shape.type).create({
          parentId: this.currentPageId,
          ...shape,
        })
      })
    )
  }

  /**
   * Manually update a set of shapes.
   * @param shapes An array of shape partials, containing the changes to be made to each shape.
   * @command
   */
  updateShapes = (...shapes: ({ id: string } & Partial<TDShape>)[]): this => {
    const pageShapes = this.document.pages[this.currentPageId].shapes
    const shapesToUpdate = shapes.filter((shape) => pageShapes[shape.id])
    if (shapesToUpdate.length === 0) return this
    return this.setState(
      Commands.updateShapes(this, shapesToUpdate, this.currentPageId),
      'updated_shapes'
    )
  }

  createTextShapeAtPoint(point: number[], id?: string): this {
    const {
      shapes,
      appState: { currentPageId, currentStyle },
    } = this

    const childIndex =
      shapes.length === 0
        ? 1
        : shapes
            .filter((shape) => shape.parentId === currentPageId)
            .sort((a, b) => b.childIndex - a.childIndex)[0].childIndex + 1

    const Text = shapeUtils[TDShapeType.Text]

    const newShape = Text.create({
      id: id || Utils.uniqueId(),
      parentId: currentPageId,
      childIndex,
      point,
      style: { ...currentStyle },
    })

    const bounds = Text.getBounds(newShape)
    newShape.point = Vec.sub(newShape.point, [bounds.width / 2, bounds.height / 2])
    this.createShapes(newShape)
    this.setEditingId(newShape.id)

    return this
  }

  /**
   * Create one or more shapes.
   * @param shapes An array of shapes.
   * @command
   */
  create = (shapes: TDShape[] = [], bindings: TDBinding[] = []): this => {
    if (shapes.length === 0) return this
    return this.setState(Commands.createShapes(this, shapes, bindings))
  }

  /**
   * Patch in a new set of shapes
   * @param shapes
   * @param bindings
   */
  patchCreate = (shapes: TDShape[] = [], bindings: TDBinding[] = []): this => {
    if (shapes.length === 0) return this
    return this.patchState(Commands.createShapes(this, shapes, bindings).after)
  }

  /**
   * Delete one or more shapes.
   * @param ids The ids of the shapes to delete.
   * @command
   */
  delete = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.deleteShapes(this, ids))
  }

  /**
   * Delete all shapes on the page.
   */
  deleteAll = (): this => {
    this.selectAll()
    this.delete()
    return this
  }

  /**
   * Change the style for one or more shapes.
   * @param style A style partial to apply to the shapes.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  style = (style: Partial<ShapeStyles>, ids = this.selectedIds): this => {
    return this.setState(Commands.styleShapes(this, ids, style))
  }

  /**
   * Align one or more shapes.
   * @param direction Whether to align horizontally or vertically.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  align = (type: AlignType, ids = this.selectedIds): this => {
    if (ids.length < 2) return this
    return this.setState(Commands.alignShapes(this, ids, type))
  }

  /**
   * Distribute one or more shapes.
   * @param direction Whether to distribute horizontally or vertically..
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  distribute = (direction: DistributeType, ids = this.selectedIds): this => {
    if (ids.length < 3) return this
    return this.setState(Commands.distributeShapes(this, ids, direction))
  }

  /**
   * Stretch one or more shapes to their common bounds.
   * @param direction Whether to stretch horizontally or vertically.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  stretch = (direction: StretchType, ids = this.selectedIds): this => {
    if (ids.length < 2) return this
    return this.setState(Commands.stretchShapes(this, ids, direction))
  }

  /**
   * Flip one or more shapes horizontally.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  flipHorizontal = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.flipShapes(this, ids, FlipType.Horizontal))
  }

  /**
   * Flip one or more shapes vertically.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  flipVertical = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.flipShapes(this, ids, FlipType.Vertical))
  }

  /**
   * Move one or more shapes to a new page. Will also break or move bindings.
   * @param toPageId The id of the page to move the shapes to.
   * @param fromPageId The id of the page to move the shapes from (defaults to current page).
   * @param ids The ids of the shapes to move (defaults to selection).
   */
  moveToPage = (
    toPageId: string,
    fromPageId = this.currentPageId,
    ids = this.selectedIds
  ): this => {
    if (ids.length === 0) return this
    const { rendererBounds } = this
    this.setState(Commands.moveShapesToPage(this, ids, rendererBounds, fromPageId, toPageId))
    return this
  }

  /**
   * Move one or more shapes to the back of the page.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  moveToBack = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.reorderShapes(this, ids, MoveType.ToBack))
  }

  /**
   * Move one or more shapes backward on of the page.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  moveBackward = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.reorderShapes(this, ids, MoveType.Backward))
  }

  /**
   * Move one or more shapes forward on the page.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  moveForward = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.reorderShapes(this, ids, MoveType.Forward))
  }

  /**
   * Move one or more shapes to the front of the page.
   * @param ids The ids of the shapes to change (defaults to selection).
   */
  moveToFront = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.reorderShapes(this, ids, MoveType.ToFront))
  }

  /**
   * Nudge one or more shapes in a direction.
   * @param delta The direction to nudge the shapes.
   * @param isMajor Whether this is a major (i.e. shift) nudge.
   * @param ids The ids to change (defaults to selection).
   */
  nudge = (delta: number[], isMajor = false, ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    const size = isMajor
      ? this.settings.showGrid
        ? this.currentGrid * 4
        : 10
      : this.settings.showGrid
      ? this.currentGrid
      : 1

    return this.setState(Commands.translateShapes(this, ids, Vec.mul(delta, size)))
  }

  /**
   * Duplicate one or more shapes.
   * @param ids The ids to duplicate (defaults to selection).
   */
  duplicate = (ids = this.selectedIds, point?: number[]): this => {
    if (this.readOnly) return this
    if (ids.length === 0) return this
    return this.setState(Commands.duplicateShapes(this, ids, point))
  }

  /**
   * Reset the bounds for one or more shapes. Usually when the
   * bounding box of a shape is double-clicked. Different shapes may
   * handle this differently.
   * @param ids The ids to change (defaults to selection).
   */
  resetBounds = (ids = this.selectedIds): this => {
    const command = Commands.resetBounds(this, ids, this.currentPageId)
    return this.setState(Commands.resetBounds(this, ids, this.currentPageId), command.id)
  }

  /**
   * Toggle the hidden property of one or more shapes.
   * @param ids The ids to change (defaults to selection).
   */
  toggleHidden = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.toggleShapeProp(this, ids, 'isHidden'))
  }

  /**
   * Toggle the locked property of one or more shapes.
   * @param ids The ids to change (defaults to selection).
   */
  toggleLocked = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.toggleShapeProp(this, ids, 'isLocked'))
  }

  /**
   * Toggle the fixed-aspect-ratio property of one or more shapes.
   * @param ids The ids to change (defaults to selection).
   */
  toggleAspectRatioLocked = (ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    return this.setState(Commands.toggleShapeProp(this, ids, 'isAspectRatioLocked'))
  }

  /**
   * Toggle the decoration at a handle of one or more shapes.
   * @param handleId The handle to toggle.
   * @param ids The ids of the shapes to toggle the decoration on.
   */
  toggleDecoration = (handleId: string, ids = this.selectedIds): this => {
    if (ids.length === 0 || !(handleId === 'start' || handleId === 'end')) return this
    return this.setState(Commands.toggleShapesDecoration(this, ids, handleId))
  }

  /**
   * Set the props of one or more shapes
   * @param props The props to set on the shapes.
   * @param ids The ids of the shapes to set props on.
   */
  setShapeProps = <T extends TDShape>(props: Partial<T>, ids = this.selectedIds) => {
    return this.setState(Commands.setShapesProps(this, ids, props))
  }

  /**
   * Rotate one or more shapes by a delta.
   * @param delta The delta in radians.
   * @param ids The ids to rotate (defaults to selection).
   */
  rotate = (delta = Math.PI * -0.5, ids = this.selectedIds): this => {
    if (ids.length === 0) return this
    const change = Commands.rotateShapes(this, ids, delta)
    if (!change) return this
    return this.setState(change)
  }

  /**
   * Group the selected shapes.
   * @param ids The ids to group (defaults to selection).
   * @param groupId The new group's id.
   */
  group = (
    ids = this.selectedIds,
    groupId = Utils.uniqueId(),
    pageId = this.currentPageId
  ): this => {
    if (this.readOnly) return this

    if (ids.length === 1 && this.getShape(ids[0], pageId).type === TDShapeType.Group) {
      return this.ungroup(ids, pageId)
    }

    if (ids.length < 2) return this

    const command = Commands.groupShapes(this, ids, groupId, pageId)
    if (!command) return this
    return this.setState(command)
  }

  /**
   * Ungroup the selected groups.
   * @todo
   */
  ungroup = (ids = this.selectedIds, pageId = this.currentPageId): this => {
    if (this.readOnly) return this

    const groups = ids
      .map((id) => this.getShape(id, pageId))
      .filter((shape) => shape.type === TDShapeType.Group)

    if (groups.length === 0) return this

    const command = Commands.ungroupShapes(this, ids, groups as GroupShape[], pageId)
    if (!command) return this
    return this.setState(command)
  }

  /**
   * Cancel the current session.
   */
  cancel = (): this => {
    this.currentTool.onCancel?.()
    return this
  }

  /* -------------------------------------------------- */
  /*                   Event Handlers                   */
  /* -------------------------------------------------- */

  /* ----------------- Keyboard Events ---------------- */

  onKeyDown: TLKeyboardEventHandler = (key, info, e) => {
    switch (e.key) {
      case '/': {
        if (this.status === 'idle') {
          const { shiftKey, metaKey, altKey, ctrlKey, spaceKey } = this

          this.onPointerDown(
            {
              target: 'canvas',
              pointerId: 0,
              origin: info.point,
              point: info.point,
              delta: [0, 0],
              pressure: 0.5,
              shiftKey,
              ctrlKey,
              metaKey,
              altKey,
              spaceKey,
            },
            {
              shiftKey,
              altKey,
              ctrlKey,
              pointerId: 0,
              clientX: info.point[0],
              clientY: info.point[1],
            } as unknown as React.PointerEvent<HTMLDivElement>
          )
        }
        break
      }
      case 'Escape': {
        this.cancel()
        break
      }
      case 'Meta': {
        this.metaKey = true
        break
      }
      case 'Alt': {
        this.altKey = true
        break
      }
      case 'Control': {
        this.ctrlKey = true
        break
      }
      case ' ': {
        this.spaceKey = true
        break
      }
    }

    this.currentTool.onKeyDown?.(key, info, e)

    return this
  }

  onKeyUp: TLKeyboardEventHandler = (key, info, e) => {
    if (!info) return

    switch (e.key) {
      case '/': {
        const { currentPoint, shiftKey, metaKey, altKey, ctrlKey, spaceKey } = this

        this.onPointerUp(
          {
            target: 'canvas',
            pointerId: 0,
            origin: currentPoint,
            point: currentPoint,
            delta: [0, 0],
            pressure: 0.5,
            shiftKey,
            ctrlKey,
            metaKey,
            altKey,
            spaceKey,
          },
          {
            shiftKey,
            altKey,
            ctrlKey,
            pointerId: 0,
            clientX: currentPoint[0],
            clientY: currentPoint[1],
          } as unknown as React.PointerEvent<HTMLDivElement>
        )
        break
      }
      case 'Meta': {
        this.metaKey = false
        break
      }
      case 'Alt': {
        this.altKey = false
        break
      }
      case 'Control': {
        this.ctrlKey = false
        break
      }
      case ' ': {
        this.spaceKey = false
        break
      }
    }

    this.currentTool.onKeyUp?.(key, info, e)
  }

  /* ------------- Renderer Event Handlers ------------ */

  onPinchStart: TLPinchEventHandler = (info, e) => this.currentTool.onPinchStart?.(info, e)

  onPinchEnd: TLPinchEventHandler = (info, e) => this.currentTool.onPinchEnd?.(info, e)

  onPinch: TLPinchEventHandler = (info, e) => this.currentTool.onPinch?.(info, e)

  onPan: TLWheelEventHandler = (info, e) => {
    if (this.appState.status === 'pinching') return
    // TODO: Pan and pinchzoom are firing at the same time. Considering turning one of them off!

    const delta = Vec.div(info.delta, this.pageState.camera.zoom)
    const prev = this.pageState.camera.point
    const next = Vec.sub(prev, delta)

    if (Vec.isEqual(next, prev)) return

    this.pan(delta)

    // onPan is called by onPointerMove when spaceKey & middle wheel button is pressed,
    // so we shouldn't call this again.
    if (!info.spaceKey && !(e.buttons === 4)) {
      this.onPointerMove(info, e as unknown as React.PointerEvent)
    }
  }

  onZoom: TLWheelEventHandler = (info, e) => {
    if (this.state.appState.status !== TDStatus.Idle) return

    const delta =
      e.deltaMode === WheelEvent.DOM_DELTA_PIXEL
        ? info.delta[2] / 500
        : e.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? info.delta[2] / 100
        : info.delta[2] / 2

    this.zoomBy(delta, this.centerPoint)
    this.onPointerMove(info, e as unknown as React.PointerEvent)
  }

  /* ----------------- Pointer Events ----------------- */

  updateInputs: TLPointerEventHandler = (info) => {
    this.currentPoint = [...this.getPagePoint(info.point), info.pressure]
    this.shiftKey = info.shiftKey
    this.altKey = info.altKey
    this.ctrlKey = info.ctrlKey
    this.metaKey = info.metaKey
  }

  onPointerMove: TLPointerEventHandler = (info, e) => {
    this.previousPoint = this.currentPoint
    this.updateInputs(info, e)

    // Several events (e.g. pan) can trigger the same "pointer move" behavior
    this.currentTool.onPointerMove?.(info, e)

    // Move this to an emitted event
    if (this.state.room) {
      const { users, userId } = this.state.room

      this.callbacks.onChangePresence?.(this, {
        ...users[userId],
        point: this.getPagePoint(info.point),
      })
    }
  }

  onPointerDown: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onPointerDown?.(info, e)
  }

  onPointerUp: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onPointerUp?.(info, e)
  }

  // Canvas (background)
  onPointCanvas: TLCanvasEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onPointCanvas?.(info, e)
  }

  onDoubleClickCanvas: TLCanvasEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onDoubleClickCanvas?.(info, e)
  }

  onRightPointCanvas: TLCanvasEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onRightPointCanvas?.(info, e)
  }

  onDragCanvas: TLCanvasEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onDragCanvas?.(info, e)
  }

  onReleaseCanvas: TLCanvasEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onReleaseCanvas?.(info, e)
  }

  // Shape
  onPointShape: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onPointShape?.(info, e)
  }

  onReleaseShape: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onReleaseShape?.(info, e)
  }

  onDoubleClickShape: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onDoubleClickShape?.(info, e)
  }

  onRightPointShape: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onRightPointShape?.(info, e)
  }

  onDragShape: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onDragShape?.(info, e)
  }

  onHoverShape: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onHoverShape?.(info, e)
  }

  onUnhoverShape: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onUnhoverShape?.(info, e)
  }

  // Bounds (bounding box background)
  onPointBounds: TLBoundsEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onPointBounds?.(info, e)
  }

  onDoubleClickBounds: TLBoundsEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onDoubleClickBounds?.(info, e)
  }

  onRightPointBounds: TLBoundsEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onRightPointBounds?.(info, e)
  }

  onDragBounds: TLBoundsEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onDragBounds?.(info, e)
  }

  onHoverBounds: TLBoundsEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onHoverBounds?.(info, e)
  }

  onUnhoverBounds: TLBoundsEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onUnhoverBounds?.(info, e)
  }

  onReleaseBounds: TLBoundsEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onReleaseBounds?.(info, e)
  }

  // Bounds handles (corners, edges)
  onPointBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onPointBoundsHandle?.(info, e)
  }

  onDoubleClickBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onDoubleClickBoundsHandle?.(info, e)
  }

  onRightPointBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onRightPointBoundsHandle?.(info, e)
  }

  onDragBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onDragBoundsHandle?.(info, e)
  }

  onHoverBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onHoverBoundsHandle?.(info, e)
  }

  onUnhoverBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onUnhoverBoundsHandle?.(info, e)
  }

  onReleaseBoundsHandle: TLBoundsHandleEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onReleaseBoundsHandle?.(info, e)
  }

  // Handles (ie the handles of a selected arrow)
  onPointHandle: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onPointHandle?.(info, e)
  }

  onDoubleClickHandle: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onDoubleClickHandle?.(info, e)
  }

  onRightPointHandle: TLPointerEventHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onRightPointHandle?.(info, e)
  }

  onDragHandle: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onDragHandle?.(info, e)
  }

  onHoverHandle: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onHoverHandle?.(info, e)
  }

  onUnhoverHandle: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onUnhoverHandle?.(info, e)
  }

  onReleaseHandle: TLPointerEventHandler = (info, e) => {
    this.updateInputs(info, e)
    this.currentTool.onReleaseHandle?.(info, e)
  }

  onShapeChange = (shape: { id: string } & Partial<TDShape>) => {
    this.updateShapes(shape)
  }

  onShapeBlur = () => {
    // This prevents an auto-blur event from Safari
    if (Date.now() - this.editingStartTime < 50) return

    const { editingId } = this.pageState
    const { isToolLocked } = this.getAppState()

    if (editingId) {
      // If we're editing text, then delete the text if it's empty
      const shape = this.getShape(editingId)
      this.setEditingId()
      if (shape.type === TDShapeType.Text) {
        if (shape.text.trim().length <= 0) {
          this.patchState(Commands.deleteShapes(this, [editingId]).after, 'delete_empty_text')
        } else if (!isToolLocked) {
          this.select(editingId)
        }
      }
    }

    this.currentTool.onShapeBlur?.()
  }

  onShapeClone: TLShapeCloneHandler = (info, e) => {
    this.originPoint = this.getPagePoint(info.point)
    this.updateInputs(info, e)
    this.currentTool.onShapeClone?.(info, e)
  }

  onRenderCountChange = (ids: string[]) => {
    const appState = this.getAppState()
    if (appState.isEmptyCanvas && ids.length > 0) {
      this.patchState(
        {
          appState: {
            isEmptyCanvas: false,
          },
        },
        'empty_canvas:false'
      )
    } else if (!appState.isEmptyCanvas && ids.length <= 0) {
      this.patchState(
        {
          appState: {
            isEmptyCanvas: true,
          },
        },
        'empty_canvas:true'
      )
    }
  }

  onError = () => {
    // TODO
  }

  isSelected(id: string) {
    return this.selectedIds.includes(id)
  }

  get room() {
    return this.state.room
  }

  get isLocal() {
    return this.state.room === undefined || this.state.room.id === 'local'
  }

  get status() {
    return this.appState.status
  }

  get currentUser() {
    if (!this.state.room) return
    return this.state.room.users[this.state.room.userId]
  }

  // The center of the component (in screen space)
  get centerPoint() {
    const { width, height } = this.rendererBounds
    return Vec.toFixed([width / 2, height / 2])
  }

  get currentGrid() {
    const { zoom } = this.pageState.camera
    if (zoom < 0.15) {
      return GRID_SIZE * 16
    } else if (zoom < 1) {
      return GRID_SIZE * 4
    } else {
      return GRID_SIZE * 1
    }
  }

  getShapeUtil = TLDR.getShapeUtil

  static version = 14

  static defaultDocument: TDDocument = {
    id: 'doc',
    name: 'New Document',
    version: 14,
    pages: {
      page: {
        id: 'page',
        name: 'Page 1',
        childIndex: 1,
        shapes: {},
        bindings: {},
      },
    },
    pageStates: {
      page: {
        id: 'page',
        selectedIds: [],
        camera: {
          point: [0, 0],
          zoom: 1,
        },
      },
    },
  }

  static defaultState: TDSnapshot = {
    settings: {
      isPenMode: false,
      isDarkMode: false,
      isZoomSnap: false,
      isFocusMode: false,
      isSnapping: false,
      isDebugMode: process.env.NODE_ENV === 'development',
      isReadonlyMode: false,
      nudgeDistanceLarge: 16,
      nudgeDistanceSmall: 1,
      showRotateHandles: true,
      showBindingHandles: true,
      showCloneHandles: false,
      showGrid: false,
    },
    appState: {
      status: TDStatus.Idle,
      activeTool: 'select',
      hoveredId: undefined,
      currentPageId: 'page',
      currentStyle: defaultStyle,
      isToolLocked: false,
      isMenuOpen: false,
      isEmptyCanvas: false,
      snapLines: [],
    },
    document: TldrawApp.defaultDocument,
  }
}

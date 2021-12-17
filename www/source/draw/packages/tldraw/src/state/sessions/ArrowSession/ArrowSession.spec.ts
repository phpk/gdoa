import { mockDocument, TldrawTestApp } from '~test'
import { ArrowShape, SessionType, TDShapeType, TDStatus } from '~types'

describe('Arrow session', () => {
  const restoreDoc = new TldrawTestApp()
    .loadDocument(mockDocument)
    .selectAll()
    .delete()
    .createShapes(
      { type: TDShapeType.Rectangle, id: 'target1', point: [0, 0], size: [100, 100] },
      { type: TDShapeType.Arrow, id: 'arrow1', point: [200, 200] }
    ).document

  it('begins, updateSession', () => {
    const app = new TldrawTestApp()
      .loadDocument(restoreDoc)
      .select('arrow1')
      .movePointer([200, 200])
      .startSession(SessionType.Arrow, 'arrow1', 'start')
      .movePointer([50, 50])
      .completeSession()

    const binding = app.bindings[0]

    expect(binding).toBeTruthy()
    expect(binding.fromId).toBe('arrow1')
    expect(binding.toId).toBe('target1')
    expect(binding.handleId).toBe('start')
    expect(app.appState.status).toBe(TDStatus.Idle)
    expect(app.getShape('arrow1').handles?.start.bindingId).toBe(binding.id)

    app.undo()

    expect(app.bindings[0]).toBe(undefined)
    expect(app.getShape('arrow1').handles?.start.bindingId).toBe(undefined)

    app.redo()

    expect(app.bindings[0]).toBeTruthy()
    expect(app.getShape('arrow1').handles?.start.bindingId).toBe(binding.id)
  })

  it('cancels session', () => {
    const app = new TldrawTestApp()
      .loadDocument(restoreDoc)
      .select('arrow1')
      .movePointer([200, 200])
      .startSession(SessionType.Arrow, 'arrow1', 'start')
      .movePointer([50, 50])
      .cancelSession()

    expect(app.bindings[0]).toBe(undefined)
    expect(app.getShape('arrow1').handles?.start.bindingId).toBe(undefined)
  })

  describe('arrow binding', () => {
    it('points to the center', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer([50, 50])
      expect(app.bindings[0].point).toStrictEqual([0.5, 0.5])
    })

    it('Snaps to the center', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer([55, 55])
      expect(app.bindings[0].point).toStrictEqual([0.5, 0.5])
    })

    it('Binds at the bottom left', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer([116, -16])
      expect(app.bindings[0].point).toStrictEqual([1, 0])
    })

    it('Cancels the bind when off of the expanded bounds', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer([133, 133])

      expect(app.bindings[0]).toBe(undefined)
    })

    it('binds on the inside of a shape while alt is held', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer([91, 9])

      expect(app.bindings[0].point).toMatchSnapshot()

      app.movePointer({ x: 91, y: 9, altKey: true })
    })

    it('snaps to the inside center when the point is close to the center', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer({ x: 91, y: 9, altKey: true })

      expect(app.bindings[0].point).toMatchSnapshot()
    })

    it('ignores binding when meta is held', () => {
      const app = new TldrawTestApp()
        .loadDocument(restoreDoc)
        .select('arrow1')
        .movePointer([200, 200])
        .startSession(SessionType.Arrow, 'arrow1', 'start')
        .movePointer({ x: 55, y: 45, ctrlKey: true })

      expect(app.bindings.length).toBe(0)
    })
  })

  describe('when dragging a bound shape', () => {
    it('updates the arrow', () => {
      const app = new TldrawTestApp()

      app
        .loadDocument(restoreDoc)
        // Select the arrow and begin a session on the handle's start handle
        .movePointer([200, 200])
        .select('arrow1')
        .startSession(SessionType.Arrow, 'arrow1', 'start')
      // Move to [50,50]
      app.movePointer([50, 50])
      // Both handles will keep the same screen positions, but their points will have changed.
      expect(app.getShape<ArrowShape>('arrow1').point).toStrictEqual([116, 116])
      expect(app.getShape<ArrowShape>('arrow1').handles.start.point).toStrictEqual([0, 0])
      expect(app.getShape<ArrowShape>('arrow1').handles.end.point).toStrictEqual([85, 85])
    })

    it.todo('updates the arrow when bound on both sides')

    it.todo('snaps the bend to zero when dragging the bend handle toward the center')
  })
})

describe('When creating with an arrow session', () => {
  it('Deletes the shape on undo', () => {
    const app = new TldrawTestApp()
      .createShapes({ type: TDShapeType.Arrow, id: 'arrow1', point: [200, 200] })
      .select('arrow1')
      .movePointer([200, 200])
      .startSession(SessionType.Arrow, 'arrow1', 'start', true)
      .movePointer([55, 45])
      .completeSession()
      .undo()

    expect(app.getShape('arrow1')).toBe(undefined)
  })

  it("Doesn't corrupt a shape after undoing", () => {
    const app = new TldrawTestApp()
      .createShapes(
        { type: TDShapeType.Rectangle, id: 'rect1', point: [200, 200], size: [200, 200] },
        { type: TDShapeType.Rectangle, id: 'rect2', point: [400, 200], size: [200, 200] }
      )
      .selectTool(TDShapeType.Arrow)
      .pointShape('rect1', { x: 250, y: 250 })
      .movePointer([450, 250])
      .stopPointing()

    expect(app.bindings.length).toBe(2)

    app.undo()

    expect(app.bindings.length).toBe(0)

    app.select('rect1').pointShape('rect1', [250, 250]).movePointer([275, 275]).completeSession()

    expect(app.bindings.length).toBe(0)
  })

  it('Creates a start binding if possible', () => {
    const app = new TldrawTestApp()
      .createShapes(
        { type: TDShapeType.Rectangle, id: 'rect1', point: [200, 200], size: [200, 200] },
        { type: TDShapeType.Rectangle, id: 'rect2', point: [400, 200], size: [200, 200] }
      )
      .selectTool(TDShapeType.Arrow)
      .pointShape('rect1', { x: 250, y: 250 })
      .movePointer([450, 250])
      .completeSession()

    const arrow = app.shapes.find((shape) => shape.type === TDShapeType.Arrow) as ArrowShape

    expect(arrow).toBeTruthy()
    expect(app.bindings.length).toBe(2)
    expect(arrow.handles.start.bindingId).not.toBe(undefined)
    expect(arrow.handles.end.bindingId).not.toBe(undefined)
  })

  it('Removes a binding when dragged away', () => {
    const app = new TldrawTestApp()
      .createShapes(
        { type: TDShapeType.Rectangle, id: 'rect1', point: [200, 200], size: [200, 200] },
        { type: TDShapeType.Rectangle, id: 'rect2', point: [400, 200], size: [200, 200] },
        { type: TDShapeType.Arrow, id: 'arrow1', point: [250, 250] }
      )
      .select('arrow1')
      .movePointer([250, 250])
      .startSession(SessionType.Arrow, 'arrow1', 'end', true)
      .movePointer([450, 250])
      .completeSession()
      .select('arrow1')
      .startSession(SessionType.Arrow, 'arrow1', 'start', false)
      .movePointer([0, 0])
      .completeSession()

    const arrow = app.shapes.find((shape) => shape.type === TDShapeType.Arrow) as ArrowShape

    expect(arrow).toBeTruthy()

    expect(app.bindings.length).toBe(1)

    expect(arrow.handles.start.point).toStrictEqual([0, 0])
    expect(arrow.handles.start.bindingId).toBe(undefined)
    expect(arrow.handles.end.bindingId).not.toBe(undefined)
  })
})

describe('When drawing an arrow', () => {
  it('does not create an arrow less than 4 points long', () => {
    const app = new TldrawTestApp()
      .selectTool(TDShapeType.Arrow)
      .pointCanvas([100, 100])
      .movePointer([100, 103])
      .stopPointing()

    expect(app.shapes.length).toBe(0)
  })

  it('creates an arrow 4 points long or more', () => {
    const app = new TldrawTestApp()
      .selectTool(TDShapeType.Arrow)
      .pointCanvas([100, 100])
      .movePointer([100, 104])
      .stopPointing()

    expect(app.shapes.length).toBe(1)
  })

  it('creates a short arrow if at least one handle is bound to a shape', () => {
    const app = new TldrawTestApp()
      .createShapes({
        type: TDShapeType.Rectangle,
        id: 'rect1',
        point: [100, 100],
        size: [200, 200],
      })
      .selectTool(TDShapeType.Arrow)
      .pointCanvas([84, 100])
      .movePointer([85, 100]) // One pixel right, into binding area
      .stopPointing()

    expect(app.shapes.length).toBe(2)
  })

  it('does not create a short arrow if no handles are bound', () => {
    const app = new TldrawTestApp()
      .createShapes({
        type: TDShapeType.Rectangle,
        id: 'rect1',
        point: [100, 100],
        size: [200, 200],
      })
      .selectTool(TDShapeType.Arrow)
      .pointCanvas([84, 100])
      .movePointer([83, 100]) // One pixel left, not in binding area
      .stopPointing()

    expect(app.shapes.length).toBe(1)
  })

  it('creates a short arrow if start handle is bound', () => {
    const app = new TldrawTestApp()
      .createShapes({
        type: TDShapeType.Rectangle,
        id: 'rect1',
        point: [100, 100],
        size: [200, 200],
      })
      .selectTool(TDShapeType.Arrow)
      .pointCanvas([101, 100]) // Inside of shape
      .movePointer([100, 100])
      .stopPointing()

    expect(app.shapes.length).toBe(2)
  })
})

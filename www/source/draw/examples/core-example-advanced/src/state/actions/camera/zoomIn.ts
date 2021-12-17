import type { Action } from 'state/constants'
import { Utils } from '@tldraw/core'
import Vec from '@tldraw/vec'
import { mutables } from 'state/mutables'

export const zoomIn: Action = (data) => {
  const { camera } = data.pageState
  const i = Math.round((data.pageState.camera.zoom * 100) / 25)
  const zoom = Math.min(5, (i + 1) * 0.25)
  const center = [mutables.rendererBounds.width / 2, mutables.rendererBounds.height / 2]
  const p0 = Vec.sub(Vec.div(center, camera.zoom), center)
  const p1 = Vec.sub(Vec.div(center, zoom), center)
  const point = Vec.toFixed(Vec.add(camera.point, Vec.sub(p1, p0)))

  data.pageState.camera.zoom = zoom
  data.pageState.camera.point = point
}

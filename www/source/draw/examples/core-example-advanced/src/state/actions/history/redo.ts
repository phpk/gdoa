import type { Action } from 'state/constants'
import { mutables } from '../../mutables'

export const redo: Action = (data) => {
  const snapshot = mutables.history.redo()
  Object.assign(data, snapshot)
}

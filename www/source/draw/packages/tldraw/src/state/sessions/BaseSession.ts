import type { SessionType, TldrawCommand, TldrawPatch } from '~types'
import type { TldrawApp } from '../internal'

export abstract class BaseSession {
  abstract type: SessionType

  constructor(public app: TldrawApp) {}

  abstract start: () => TldrawPatch | undefined

  abstract update: () => TldrawPatch | undefined

  abstract complete: () => TldrawPatch | TldrawCommand | undefined

  abstract cancel: () => TldrawPatch | undefined
}

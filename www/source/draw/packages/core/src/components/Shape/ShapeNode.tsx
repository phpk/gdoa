import { observer } from 'mobx-react-lite'
import * as React from 'react'
import type { IShapeTreeNode, TLShape } from '~types'
import { Shape } from './Shape'
import type { TLShapeUtilsMap } from '~TLShapeUtil'

interface ShapeNodeProps<T extends TLShape> extends IShapeTreeNode<T> {
  utils: TLShapeUtilsMap<TLShape>
}

export const ShapeNode = observer(function ShapeNode<T extends TLShape>({
  shape,
  utils,
  meta,
  children,
  ...rest
}: ShapeNodeProps<T>) {
  return (
    <>
      <Shape shape={shape} utils={utils[shape.type as T['type']]} meta={meta} {...rest} />
      {children &&
        children.map((childNode) => (
          <ShapeNode key={childNode.shape.id} utils={utils} {...childNode} />
        ))}
    </>
  )
})

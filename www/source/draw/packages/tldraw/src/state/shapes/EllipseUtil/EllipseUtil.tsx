import * as React from 'react'
import { Utils, SVGContainer, TLBounds } from '@tldraw/core'
import { Vec } from '@tldraw/vec'
import { defaultStyle, getShapeStyle } from '~state/shapes/shared'
import { EllipseShape, DashStyle, TDShapeType, TDShape, TransformInfo, TDMeta } from '~types'
import { BINDING_DISTANCE, GHOSTED_OPACITY } from '~constants'
import { TDShapeUtil } from '../TDShapeUtil'
import {
  intersectEllipseBounds,
  intersectLineSegmentEllipse,
  intersectRayEllipse,
} from '@tldraw/intersect'
import { getEllipseIndicatorPathTDSnapshot, getEllipsePath } from './ellipseHelpers'

type T = EllipseShape
type E = SVGSVGElement
type M = TDMeta

export class EllipseUtil extends TDShapeUtil<T, E> {
  type = TDShapeType.Ellipse as const

  canBind = true

  getShape = (props: Partial<T>): T => {
    return Utils.deepMerge<T>(
      {
        id: 'id',
        type: TDShapeType.Ellipse,
        name: 'Ellipse',
        parentId: 'page',
        childIndex: 1,
        point: [0, 0],
        radius: [1, 1],
        rotation: 0,
        style: defaultStyle,
      },
      props
    )
  }

  Component = TDShapeUtil.Component<T, E, TDMeta>(
    ({ shape, isGhost, isSelected, isBinding, meta, events }, ref) => {
      const {
        radius: [radiusX, radiusY],
        style,
      } = shape

      const styles = getShapeStyle(style, meta.isDarkMode)

      const strokeWidth = styles.strokeWidth

      const sw = 1 + strokeWidth * 1.618

      const rx = Math.max(0, radiusX - sw / 2)
      const ry = Math.max(0, radiusY - sw / 2)

      if (style.dash === DashStyle.Draw) {
        const path = getEllipsePath(shape, this.getCenter(shape))

        return (
          <SVGContainer ref={ref} id={shape.id + '_svg'} {...events}>
            {isBinding && (
              <ellipse
                className="tl-binding-indicator"
                cx={radiusX}
                cy={radiusY}
                rx={rx}
                ry={ry}
                strokeWidth={this.bindingDistance}
              />
            )}
            <ellipse
              className={style.isFilled || isSelected ? 'tl-fill-hitarea' : 'tl-stroke-hitarea'}
              cx={radiusX}
              cy={radiusY}
              rx={radiusX}
              ry={radiusY}
            />
            <path
              d={getEllipseIndicatorPathTDSnapshot(shape, this.getCenter(shape))}
              stroke="none"
              fill={style.isFilled ? styles.fill : 'none'}
              pointerEvents="none"
            />
            <path
              d={path}
              fill={styles.stroke}
              stroke={styles.stroke}
              strokeWidth={styles.strokeWidth}
              pointerEvents="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={isGhost ? GHOSTED_OPACITY : 1}
            />
          </SVGContainer>
        )
      }

      const perimeter = Utils.perimeterOfEllipse(rx, ry) // Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)))

      const { strokeDasharray, strokeDashoffset } = Utils.getPerfectDashProps(
        perimeter < 64 ? perimeter * 2 : perimeter,
        strokeWidth * 1.618,
        shape.style.dash,
        4
      )

      return (
        <SVGContainer ref={ref} id={shape.id + '_svg'} {...events}>
          {isBinding && (
            <ellipse
              className="tl-binding-indicator"
              cx={radiusX}
              cy={radiusY}
              rx={radiusX}
              ry={radiusY}
              strokeWidth={this.bindingDistance}
            />
          )}
          <ellipse
            className={style.isFilled || isSelected ? 'tl-fill-hitarea' : 'tl-stroke-hitarea'}
            cx={radiusX}
            cy={radiusY}
            rx={radiusX}
            ry={radiusY}
          />
          <ellipse
            cx={radiusX}
            cy={radiusY}
            rx={rx}
            ry={ry}
            fill={styles.fill}
            stroke={styles.stroke}
            strokeWidth={sw}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            pointerEvents="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SVGContainer>
      )
    }
  )

  Indicator = TDShapeUtil.Indicator<T, M>(({ shape }) => {
    const {
      radius: [radiusX, radiusY],
      style,
    } = shape

    const styles = getShapeStyle(style)
    const strokeWidth = styles.strokeWidth
    const sw = 1 + strokeWidth * 1.618
    const rx = Math.max(0, radiusX - sw / 2)
    const ry = Math.max(0, radiusY - sw / 2)

    return style.dash === DashStyle.Draw ? (
      <path d={getEllipseIndicatorPathTDSnapshot(shape, this.getCenter(shape))} />
    ) : (
      <ellipse cx={radiusX} cy={radiusY} rx={rx} ry={ry} />
    )
  })

  hitTestPoint = (shape: T, point: number[]): boolean => {
    return (
      Utils.pointInBounds(point, this.getRotatedBounds(shape)) &&
      Utils.pointInEllipse(
        point,
        this.getCenter(shape),
        shape.radius[0],
        shape.radius[1],
        shape.rotation || 0
      )
    )
  }

  hitTestLineSegment = (shape: T, A: number[], B: number[]): boolean => {
    return intersectLineSegmentEllipse(
      A,
      B,
      this.getCenter(shape),
      shape.radius[0],
      shape.radius[1],
      shape.rotation || 0
    ).didIntersect
  }

  getBounds = (shape: T) => {
    return Utils.getFromCache(this.boundsCache, shape, () => {
      return Utils.getRotatedEllipseBounds(
        shape.point[0],
        shape.point[1],
        shape.radius[0],
        shape.radius[1],
        0
      )
    })
  }

  getRotatedBounds = (shape: T): TLBounds => {
    return Utils.getRotatedEllipseBounds(
      shape.point[0],
      shape.point[1],
      shape.radius[0],
      shape.radius[1],
      shape.rotation
    )
  }

  hitTestBounds = (shape: T, bounds: TLBounds): boolean => {
    const shapeBounds = this.getBounds(shape)

    return (
      Utils.boundsContained(shapeBounds, bounds) ||
      intersectEllipseBounds(
        this.getCenter(shape),
        shape.radius[0],
        shape.radius[1],
        shape.rotation || 0,
        bounds
      ).length > 0
    )
  }

  shouldRender = (prev: T, next: T): boolean => {
    return next.radius !== prev.radius || next.style !== prev.style
  }

  getCenter = (shape: T): number[] => {
    return Vec.add(shape.point, shape.radius)
  }

  getBindingPoint = <K extends TDShape>(
    shape: T,
    fromShape: K,
    point: number[],
    origin: number[],
    direction: number[],
    bindAnywhere: boolean
  ) => {
    {
      const expandedBounds = this.getExpandedBounds(shape)

      const center = this.getCenter(shape)

      let bindingPoint: number[]
      let distance: number

      if (
        !Utils.pointInEllipse(
          point,
          center,
          shape.radius[0] + this.bindingDistance,
          shape.radius[1] + this.bindingDistance
        )
      )
        return

      if (bindAnywhere) {
        if (Vec.dist(point, this.getCenter(shape)) < 12) {
          bindingPoint = [0.5, 0.5]
        } else {
          bindingPoint = Vec.divV(Vec.sub(point, [expandedBounds.minX, expandedBounds.minY]), [
            expandedBounds.width,
            expandedBounds.height,
          ])
        }

        distance = 0
      } else {
        let intersection = intersectRayEllipse(
          origin,
          direction,
          center,
          shape.radius[0],
          shape.radius[1],
          shape.rotation || 0
        ).points.sort((a, b) => Vec.dist(a, origin) - Vec.dist(b, origin))[0]

        if (!intersection) {
          intersection = intersectLineSegmentEllipse(
            point,
            center,
            center,
            shape.radius[0],
            shape.radius[1],
            shape.rotation || 0
          ).points.sort((a, b) => Vec.dist(a, point) - Vec.dist(b, point))[0]
        }

        if (!intersection) {
          return undefined
        }

        // The anchor is a point between the handle and the intersection
        const anchor = Vec.med(point, intersection)

        if (Vec.distanceToLineSegment(point, anchor, this.getCenter(shape)) < 12) {
          // If we're close to the center, snap to the center
          bindingPoint = [0.5, 0.5]
        } else {
          // Or else calculate a normalized point
          bindingPoint = Vec.divV(Vec.sub(anchor, [expandedBounds.minX, expandedBounds.minY]), [
            expandedBounds.width,
            expandedBounds.height,
          ])
        }

        if (
          Utils.pointInEllipse(point, center, shape.radius[0], shape.radius[1], shape.rotation || 0)
        ) {
          // Pad the arrow out by 16 points
          distance = this.bindingDistance / 2
        } else {
          // Find the distance between the point and the ellipse
          const innerIntersection = intersectLineSegmentEllipse(
            point,
            center,
            center,
            shape.radius[0],
            shape.radius[1],
            shape.rotation || 0
          ).points[0]

          if (!innerIntersection) {
            return undefined
          }

          distance = Math.max(this.bindingDistance / 2, Vec.dist(point, innerIntersection))
        }
      }

      return {
        point: bindingPoint,
        distance,
      }
    }
  }

  transform = (
    shape: T,
    bounds: TLBounds,
    { scaleX, scaleY, initialShape }: TransformInfo<T>
  ): Partial<T> => {
    const { rotation = 0 } = initialShape

    return {
      point: [bounds.minX, bounds.minY],
      radius: [bounds.width / 2, bounds.height / 2],
      rotation:
        (scaleX < 0 && scaleY >= 0) || (scaleY < 0 && scaleX >= 0)
          ? -(rotation || 0)
          : rotation || 0,
    }
  }

  transformSingle = (shape: T, bounds: TLBounds): Partial<T> => {
    return {
      point: Vec.toFixed([bounds.minX, bounds.minY]),
      radius: Vec.div([bounds.width, bounds.height], 2),
    }
  }
}

/**
 * Created by OXOYO on 2019/7/11.
 *
 * 绘制图形控制
 */

import config from '../../config'

export default function (cfg, group) {
  const { id, width, height, shapeControl } = cfg
  // 处理边框
  group.addShape('path', {
    id: id + '_shape_control_edge',
    name: 'shapeControlEdge',
    attrs: {
      boxName: 'shapeControl',
      name: 'shapeControlEdge',
      x: 0 - width / 2,
      y: 0 - height / 2,
      width,
      height,
      path: [
        [ 'M', -width / 2, -height / 2 ],
        [ 'L', width / 2, -height / 2 ],
        [ 'L', width / 2, height / 2 ],
        [ 'L', -width / 2, height / 2 ],
        [ 'Z' ]
      ],
      // 默认样式
      ...config.shapeControl.style.default.edge
    }
  })
  // 处理控制点
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      const [x, y, cursor] = shapeControl.controllers[i]
      // 计算Marker中心点坐标
      const originX = -width / 2
      const originY = -height / 2
      const anchorX = x * width + originX
      const anchorY = y * height + originY
      // 添加Marker形状
      group.addShape('marker', {
        id: id + '_shape_control_point_' + i,
        name: 'shapeControlPoint',
        index: i,
        attrs: {
          boxName: 'shapeControl',
          name: 'shapeControlPoint',
          x: anchorX,
          y: anchorY,
          // 原始位置数据
          position: {
            x,
            y
          },
          cursor: cursor || 'pointer',
          // 默认样式
          ...config.shapeControl.style.default.point
        }
      })
    }
  }
  // 处理旋转
  if (shapeControl && shapeControl.hasOwnProperty('rotate') && shapeControl.rotate) {
    const rotateW = 20
    const rotateH = 20
    group.addShape('image', {
      id: id + '_shape_control_rotate',
      name: 'shapeControlRotate',
      attrs: {
        boxName: 'shapeControl',
        name: 'shapeControlRotate',
        x: -rotateW / 2,
        y: -height / 2 - 40,
        width: rotateW,
        height: rotateH,
        cursor: 'crosshair',
        img: require('@/assets/images/rotate.png'),
        // 默认样式
        ...config.shapeControl.style.default.rotate
      }
    })
  }
}

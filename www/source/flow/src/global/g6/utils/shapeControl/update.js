/**
 * Created by OXOYO on 2019/7/16.
 *
 * 更新图形控制
 */

export default function (cfg, group) {
  const { id, width, height, shapeControl } = cfg
  // 处理边框
  const shapeControlEdge = group.findById(id + '_shape_control_edge')
  if (shapeControlEdge) {
    shapeControlEdge.attr({
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
      ]
    })
  }
  // 处理控制点
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      const [x, y] = shapeControl.controllers[i]
      // 计算Marker中心点坐标
      const originX = -width / 2
      const originY = -height / 2
      const anchorX = x * width + originX
      const anchorY = y * height + originY
      const shapeControlPoint = group.findById(id + '_shape_control_point_' + i)
      if (shapeControlPoint) {
        shapeControlPoint.attr({
          x: anchorX,
          y: anchorY
        })
      }
    }
  }
  // 处理旋转
  if (shapeControl && shapeControl.hasOwnProperty('rotate') && shapeControl.rotate) {
    const shapeControlRotate = group.findById(id + '_shape_control_rotate')
    if (shapeControlRotate) {
      shapeControlRotate.attr({
        y: -height / 2 - 40
      })
    }
  }
}

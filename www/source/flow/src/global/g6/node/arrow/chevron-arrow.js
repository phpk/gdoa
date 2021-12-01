/**
 * Created by OXOYO on 2019/12/27.
 *
 * 人形箭头
 */

import * as G6Util from '@antv/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'chevron-arrow',
  extendName: 'single-node',
  options: {
    ...base,
    shapeType: 'path',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      // 计算箭头
      const { L1 } = utils.node.calculateArrow({
        deg: 85,
        L1: width / 3,
        L7: width / 4
      })
      // 右箭头
      const A0 = {
        1: { x: width / 2 - L1, y: -height / 2 },
        // 顶点
        2: { x: width / 2, y: 0 },
        3: { x: width / 2 - L1, y: height / 2 }
      }
      // 左箭头
      const A1 = {
        1: { x: -width / 2, y: height / 2 },
        // 顶点
        2: { x: -width / 2 + L1, y: 0 },
        3: { x: -width / 2, y: -height / 2 }
      }

      const path = [
        [ 'M', A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A1[1].x, A1[1].y ],
        [ 'L', A1[2].x, A1[2].y ],
        [ 'L', A1[3].x, A1[3].y ],
        [ 'Z' ]
      ]
      const color = cfg.color
      const style = G6Util.mix({}, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x,
        y,
        width,
        height,
        path,
        stroke: color
      }, cfg.style)
      return style
    }
  }
}

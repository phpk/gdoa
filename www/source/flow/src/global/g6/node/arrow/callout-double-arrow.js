/**
 * Created by OXOYO on 2019/12/26.
 *
 * 标注双箭头
 */

import * as G6Util from '@antv/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'callout-double-arrow',
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
      const { L1, L2, L7 } = utils.node.calculateArrow({
        deg: 85,
        L1: height * 0.21,
        L7: width * 0.16
      })
      // 上箭头顶点
      const P0 = {
        x: 0,
        y: -height / 2
      }

      // 上箭头右顶点
      const P1 = {
        x: L2,
        y: -height / 2 + L1
      }
      // 上箭头右拐点
      const P2 = {
        x: L7,
        y: P1.y
      }
      // 上箭头左拐点
      const P16 = {
        x: -L7,
        y: P1.y
      }
      // 上箭头左顶点
      const P17 = {
        x: -L2,
        y: P1.y
      }
      // 右上中
      const P3 = {
        x: L7,
        y: P2.y + L7
      }
      // 右上顶点
      const P4 = {
        x: width / 2,
        y: P2.y + L7
      }

      // 下箭头顶点
      const P9 = {
        x: 0,
        y: height / 2
      }
      // 下箭头右顶点
      const P8 = {
        x: L2,
        y: P9.y - L1
      }
      // 下箭头右拐点
      const P7 = {
        x: L7,
        y: P9.y - L1
      }
      // 下箭头左顶点
      const P10 = {
        x: -L2,
        y: P9.y - L1
      }
      // 下箭头左拐点
      const P11 = {
        x: -L7,
        y: P9.y - L1
      }
      // 右下顶点
      const P5 = {
        x: width / 2,
        y: P8.y - L7
      }
      // 右下中
      const P6 = {
        x: L7,
        y: P8.y - L7
      }
      // 左下中
      const P12 = {
        x: -L7,
        y: P8.y - L7
      }
      // 左下顶点
      const P13 = {
        x: -width / 2,
        y: P8.y - L7
      }
      // 左上顶点
      const P14 = {
        x: -width / 2,
        y: P2.y + L7
      }
      // 左上拐点
      const P15 = {
        x: -L7,
        y: P2.y + L7
      }

      const path = [
        [ 'M', P0.x, P0.y ],
        [ 'L', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
        [ 'L', P3.x, P3.y ],
        [ 'L', P4.x, P4.y ],
        [ 'L', P5.x, P5.y ],
        [ 'L', P6.x, P6.y ],
        [ 'L', P7.x, P7.y ],
        [ 'L', P8.x, P8.y ],
        [ 'L', P9.x, P9.y ],
        [ 'L', P10.x, P10.y ],
        [ 'L', P11.x, P11.y ],
        [ 'L', P12.x, P12.y ],
        [ 'L', P13.x, P13.y ],
        [ 'L', P14.x, P14.y ],
        [ 'L', P15.x, P15.y ],
        [ 'L', P16.x, P16.y ],
        [ 'L', P17.x, P17.y ],
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

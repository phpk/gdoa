/**
 * Created by OXOYO on 2019/7/8.
 *
 * 设置锚点状态
 */

import config from '../../config'

export default function (name, value, item) {
  if (name === 'hover') {
    const group = item.getContainer()
    const children = group.get('children')
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i]
      // console.log('child name', child, child.name, child.attr('name'))
      if (child.attr('name')) {
        switch (child.attr('name')) {
          case 'anchorPoint':
            if (value) {
              child.show()
              child.attr(config.anchor.style.hover)
            } else {
              child.attr(config.anchor.style.unhover)
              child.hide()
            }
            break
          case 'shapeControlPoint':
          case 'shapeControlRotate':
            child.hide()
            break
        }
      }
    }
  }
}

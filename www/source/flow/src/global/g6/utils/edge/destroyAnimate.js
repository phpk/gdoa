/**
 * Created by OXOYO on 2019/7/24.
 *
 * 销毁边动画
 */

export default function (cfg, group) {
  const tmpArr = group.findAll(item => {
    return item._cfg && item._cfg.name === 'edgeAnimatePoint'
  })
  tmpArr.forEach(item => {
    item.remove && item.remove()
  })
}

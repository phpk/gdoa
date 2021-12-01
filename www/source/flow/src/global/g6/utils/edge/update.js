/**
 * Created by OXOYO on 2019/7/19.
 *
 * 更新边
 */

export default function (node, graph) {
  const edges = graph.getEdges()
  if (!edges || !edges.length) {
    return
  }
  const { id } = node.getModel()
  // 锚点数据
  const anchorPoints = node.getAnchorPoints()
  // 遍历边
  edges.forEach(edge => {
    const edgeModel = edge.getModel()
    let anchorIndex
    let anchorPoint
    let model
    if (id === edgeModel.attrs.start) {
      anchorIndex = edgeModel.sourceAnchor
      anchorPoint = anchorPoints[anchorIndex]
      model = {
        source: anchorPoint
      }
    } else if (id === edgeModel.attrs.end) {
      anchorIndex = edgeModel.targetAnchor
      anchorPoint = anchorPoints[anchorIndex]
      model = {
        target: anchorPoint
      }
    }
    if (anchorPoint && model) {
      graph.updateItem(edge, model)
    }
  })
}

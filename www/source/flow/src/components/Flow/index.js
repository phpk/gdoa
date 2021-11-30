import Editor from '../Base/Editor'
import {
  FLOW_CONTAINER,
  FLOW_CLASS_NAME,
  EVENT_BEFORE_ADD_PAGE,
  EVENT_AFTER_ADD_PAGE,
} from '../../common/constants'
import Page from '../Page'

export default {
  mixins: [Page],

  name: 'Flow',

  props: {
    data: { default: () => ({ nodes: [], edges: [] }) },
    graph: Object,
    align: Object,
    grid: Object,
    shortcut: Object,
    noEndEdge: { default: true, type: Boolean },
  },

  methods: {
    getPageId() {
      return `${FLOW_CONTAINER}_${this.root.editor.id}`
    },

    initPage() {
      const editor = this.root.editor

      editor.emit(EVENT_BEFORE_ADD_PAGE, { className: FLOW_CLASS_NAME })

      this.page = new Editor.Flow(this.config)

      editor.add(this.page)

      editor.emit(EVENT_AFTER_ADD_PAGE, { page: this.page })
    },
  },
}

/**
 * Created by OXOYO on 2019/5/29.
 *
 * 全局组件
 */

import {
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  InputNumber,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Message,
  Modal,
  Input,
  Form,
  FormItem,
  Slider,
  Select,
  Option,
  Button,
  Table
} from 'iview'

import { Sketch } from 'vue-color'

import XIcon from './Icon/Index'
import XTooltip from './Tooltip/Index'
import XDivider from './Divider/Index'
import XColorPicker from './ColorPicker/Index'
import XNoData from './NoData/Index'

const obj = {
  // ui组件
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  InputNumber,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Message,
  Modal,
  Input,
  Form,
  FormItem,
  Slider,
  Select,
  Option,
  Button,
  Table,
  // 颜色选择器
  SketchPicker: Sketch,
  // 自定义组件
  XIcon,
  XTooltip,
  XDivider,
  XColorPicker,
  XNoData
}

const components = {}
components.install = function (Vue, options) {
  for (const name in obj) {
    if (name && obj[name]) {
      Vue.component(name, obj[name])
      if (['Message', 'Modal'].includes(name)) {
        Vue.prototype[`$${name}`] = obj[name]
      }
    }
  }
}

export default components

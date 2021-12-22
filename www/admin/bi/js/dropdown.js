/* 此处存放下拉列表数据 */
// 文本查询
var TextSearchList = [
  {
    name: '不限',
    value: 'no_limit'
  },
  {
    name: '等于',
    value: 'eq'
  },
  {
    name: '不等于',
    value: 'ne'
  },
  {
    name: '包含',
    value: 'in'
  },
  {
    name: '不包含',
    value: 'nin'
  },
  {
    name: '为空',
    value: 'is_null'
  },
  {
    name: '不为空',
    value: 'no_null'
  },
]
// 数值查询
var DataSearchList = [
  {
    name: '不限',
    value: 'no_limit'
  },
  {
    name: '等于',
    value: 'eq'
  },
  {
    name: '不等于',
    value: 'ne'
  },
  {
    name: '大于等于',
    value: 'gte'
  },
  {
    name: '小于等于',
    value: 'lte'
  },
  {
    name: '区间',
    value: 'gap'
  },
  {
    name: '为空',
    value: 'is_null'
  },
  {
    name: '不为空',
    value: 'no_null'
  },
]
// 下拉查询
var DropSearchList = [
  {
    name: '不限',
    value: 'no_limit'
  },
  {
    name: '等于',
    value: 'eq'
  },
  {
    name: '不等于',
    value: 'ne'
  },
  {
    name: '等于任意一个',
    value: 'ins'
  },
  {
    name: '不等于任意一个',
    value: 'no_ins'
  },
  {
    name: '包含',
    value: 'in'
  },
  {
    name: '不包含',
    value: 'nin'
  },
  {
    name: '为空',
    value: 'is_null'
  },
  {
    name: '不为空',
    value: 'no_null'
  }
]
// 下拉查询搜索框下拉值
var DropSearchFilterList = [
  // {
  //   name: '值1',
  //   value: '值1'
  // },
  // {
  //   name: '值2',
  //   value: '值2'
  // },
  // {
  //   name: '值3',
  //   value: '值3'
  // },
  // {
  //   name: '值4',
  //   value: '值4'
  // },
  // {
  //   name: '值5',
  //   value: '值5'
  // },
  // {
  //   name: '值6',
  //   value: '值6'
  // }
]

//时间格式
var DataTimeTypeList = [{
    name: '秒',
    value: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    name: '分',
    value: 'yyyy-MM-dd HH:mm'
  },
  {
    name: '时',
    value: 'yyyy-MM-dd HH'
  },
  {
    name: '日',
    value: 'yyyy-MM-dd'
  },
  {
    name: '月',
    value: 'yyyy-MM'
  },
  // {
  //   name: '季',
  //   value: ''
  // },
  {
    name: '年',
    value: 'yyyy'
  },
]

//变量格式
var VariableList = [
  {
    name: '合计值',
    value: 'sum'
  },
  {
    name: '平均值',
    value: 'avg'
  },
  {
    name: '最大值',
    value: 'max'
  },
  {
    name: '最小值',
    value: 'min'
  },
  {
    name: '中位数',
    value: 'middle'
  }
]

// 指定条件flaglist
var flagAllList = [
  {
    name: '=',
    value: '='
  },
  {
    name: '>=',
    value: '>='
  },
  {
    name: '<=',
    value: '<='
  },
  {
    name: '>',
    value: '>'
  },
  {
    name: '<',
    value: '<'
  },
  {
    name: '!=',
    value: '!='
  },
]

// 图表-表格取值  数值类型
var tableNumerical =[
  {
    name: '请选择',
    value: ''
  },
  {
    name: '求和',
    value: 'sum'
  },
  {
    name: '计数',
    value: 'count'
  },
  {
    name: '平均值',
    value: 'avg'
  },
  {
    name: '去重计数',
    value: 'duplicate_count'
  },
  {
    name: '最大值',
    value: 'max'
  },
  {
    name: '最小值',
    value: 'min'
  }
]

// 图表-表格取值  文本类型
var tableText =[
  {
    name: '请选择',
    value: ''
  },
  {
    name: '计数',
    value: 'count'
  },
  {
    name: '去重计数',
    value: 'duplicate_count'
  },
  
]

var tableDate =[
  {
    name: '请选择',
    value: ''
  },
  {
    name: '暂无',
    value: ''
  },
  
]

//字体
var fontFamilyList = [
  {
    id:'Source Han Sans CN',
    name:'思源黑体'
  },
  {
  id:'Microsoft YaHei',
  name:'微软雅黑'
},
{
  id:'SimSun',
  name:'宋体'
},
{
  id:'SimHei',
  name:'黑体'
},
{
  id:'KaiTi',
  name:'楷体'
},
{
  id:'FangSong',
  name:'仿宋'
}

]
var lineList = [
  {
    id:'none',
    name:'无边框'
  },
  {
  id:'dotted',
  name:'点线'
},
{
  id:'dashed',
  name:'虚线'
},
{
  id:'solid',
  name:'实线'
},
// {
//   id:'double',
//   name:'双实线'
// },
// {
//   id:'groove',
//   name:'槽线'
// },
// {
//   id:'ridge',
//   name:'脊线'
// },
// {
//   id:'inset',
//   name:'内嵌效果'
// },
// {
//   id:'outset',
//   name:'突起效果'
// },
]

var guideLines = [
  {
    width: '0',
    height: '0',
    name: '无',
    value: '0 * 0'
  },
  {
    width: '1920',
    height: '1080',
    name: '1920 * 1080',
    value: '1920 * 1080'
  },
  {
    width: '1680',
    height: '1050',
    name: '1680 * 1050',
    value: '1680 * 1050'
  },
  {
    width: '1600',
    height: '1024',
    name: '1600 * 1024',
    value: '1600 * 1024'
    
  },
  {
    width: '1600',
    height: '900',
    name: '1600 * 900',
    value: '1600 * 900'
  },
  {
    width: '1440',
    height: '900',
    name: '1440 * 900',
    value: '1440 * 900'
  },
  {
    width: '1360',
    height: '768',
    name: '1360 * 768',
    value: '1360 * 768'
  },
  {
    width: '1280',
    height: '1024',
    name: '1280 * 1024',
    value: '1280 * 1024'
  },
  {
    width: '1024',
    height: '600',
    name: '1024 * 600',
    value: '1024 * 600'
  }
]
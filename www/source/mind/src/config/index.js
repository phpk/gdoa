// 字体列表
export const fontFamilyList = [
    {
        name: '宋体',
        value: '宋体, SimSun, Songti SC'
    }, {
        name: '微软雅黑',
        value: '微软雅黑, Microsoft YaHei'
    }, {
        name: '楷体',
        value: '楷体, 楷体_GB2312, SimKai, STKaiti'
    }, {
        name: '黑体',
        value: '黑体, SimHei, Heiti SC'
    }, {
        name: '隶书',
        value: '隶书, SimLi'
    }, {
        name: 'Andale Mono',
        value: 'andale mono'
    }, {
        name: 'Arial',
        value: 'arial, helvetica, sans-serif'
    }, {
        name: 'arialBlack',
        value: 'arial black, avant garde'
    }, {
        name: 'Comic Sans Ms',
        value: 'comic sans ms'
    }, {
        name: 'Impact',
        value: 'impact, chicago'
    }, {
        name: 'Times New Roman',
        value: 'times new roman'
    }, {
        name: 'Sans-Serif',
        value: 'sans-serif'
    },
    {
        name: 'serif',
        value: 'serif'
    }
]

// 字号
export const fontSizeList = [10, 12, 16, 18, 24, 32, 48]

// 行高
export const lineHeightList = [1, 1.5, 2, 2.5, 3]

// 颜色
export const colorList = [
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E'
]

// 边框宽度
export const borderWidthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 边框样式
export const borderDasharrayList = [
    {
        name: '实线',
        value: 'none'
    },
    {
        name: '虚线1',
        value: '5,5'
    },
    {
        name: '虚线2',
        value: '10,10'
    },
    {
        name: '虚线3',
        value: '20,10,5,5,5,10'
    },
    {
        name: '虚线4',
        value: '5, 5, 1, 5'
    },
    {
        name: '虚线5',
        value: '15, 10, 5, 10, 15'
    },
    {
        name: '虚线6',
        value: '1, 5'
    }
]

// 圆角
export const borderRadiusList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 线宽
export const lineWidthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 图片重复方式
export const backgroundRepeatList = [
    {
        name: '不重复',
        value: 'no-repeat'
    },
    {
        name: '重复',
        value: 'repeat'
    },
    {
        name: '水平方向重复',
        value: 'repeat-x'
    },
    {
        name: '垂直方向重复',
        value: 'repeat-y'
    }
]

// 背景图片定位
export const backgroundPositionList = [
    {
        name: '默认',
        value: '0% 0%'
    },
    {
        name: '左上',
        value: 'left top'
    },
    {
        name: '左中',
        value: 'left center'
    },
    {
        name: '左下',
        value: 'left bottom'
    },
    {
        name: '右上',
        value: 'right top'
    },
    {
        name: '右中',
        value: 'right center'
    },
    {
        name: '右下',
        value: 'right bottom'
    },
    {
        name: '中上',
        value: 'center top'
    },
    {
        name: '居中',
        value: 'center center'
    },
    {
        name: '中下',
        value: 'center bottom'
    }
]

// 数据存储
export const store = {
    sidebarZIndex: 1//侧边栏zIndex
}

// 快捷键列表
export const shortcutKeyList = [
    {
        type: '节点操作',
        list: [
            {
                icon: 'icontianjiazijiedian',
                name: '插入下级节点',
                value: 'Tab'
            },
            {
                icon: 'iconjiedian',
                name: '插入同级节点',
                value: 'Enter'
            },
            {
                icon: 'iconzhankai',
                name: '展开/收起节点',
                value: '/'
            },
            {
                icon: 'iconshanchu',
                name: '删除节点',
                value: 'Delete | Backspace'
            },
            {
                icon: 'iconbianji',
                name: '编辑节点',
                value: 'F2'
            },
            {
                icon: 'iconhuanhang',
                name: '文本换行',
                value: 'Shift + Enter'
            },
            {
                icon: 'iconhoutui-shi',
                name: '回退',
                value: 'Ctrl + Z'
            },
            {
                icon: 'iconqianjin1',
                name: '前进',
                value: 'Ctrl + Y'
            },
            {
                icon: 'iconquanxuan',
                name: '全选',
                value: 'Ctrl + A'
            }
        ]
    },
    {
        type: '画布操作',
        list: [
            {
                icon: 'iconfangda',
                name: '放大',
                value: 'Ctrl + +'
            },
            {
                icon: 'iconsuoxiao',
                name: '缩小',
                value: 'Ctrl + -'
            },
            {
                icon: 'icondingwei',
                name: '恢复默认',
                value: 'Ctrl + Enter'
            }
        ]
    }
]
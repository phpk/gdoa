
var changecolor = true;
(function ($) {
    $.fn.pickerColor = function (option) {


        var opt = {
            ck: function () { }
        }, _this = this
        opt = $.extend(opt, option);
        _this.on('click', function (e) {


            var canvasObj = '<canvas id="canvasPickerColor" style="position: fixed;left: 50000px;top: 500px;"></canvas>';
            $('body').append(canvasObj);
            var cvs = document.getElementById("canvasPickerColor"), ctx = cvs.getContext('2d')
            cvs.height = 1; cvs.width = 1
            var img = new Image();
            html2canvas(document.querySelector("body")).then(canvas => {
                // if(changecolor){
                // 	changecolor = false
                // }
                img.src = canvas.toDataURL();
                setTimeout(() => {
                    var osX = e.offsetX, osY = e.offsetY
                    ctx.drawImage(img, osX, osY, 1, 1, 0, 0, 1, 1);
                    var imgData = ctx.getImageData(0, 0, 1, 1);
                    if (opt.ck) opt.ck(imgData.data[0] + ',' + imgData.data[1] + ',' + imgData.data[2]);
                })

            });


        })

    }
})(jQuery)
let canvasWrap = document.getElementById('canvas-wrap')
//监听数据变化
// Object.keys(Controls).forEach(key => {
//     definedAttribute(Controls, key, Controls[key])
// })

function renderDropHtml(item, targetX, fatherX, targetY, fatherY, type, reuseData, chartData, reuseType) {
    // 需在这边添加增加的样式
    if (item.ControlType === 'line') { //line单独添加样式
        Controls.ControlList.push({
            title: item.title,
            ControlType: item.ControlType,
            Name: item.ControlType + leg,
            TabEvent: item.TabEvent,
            PropertyList: {
                id: leg,
                Left: reuseType && reuseType === 'all' ? reuseData.PropertyList.Left : targetX - fatherX,
                Top: reuseType && reuseType === 'all' ? reuseData.PropertyList.Top : targetY - fatherY,
                Opacity: item.Opacity,
                Style: item.Style,
                Color: item.Color,
                Width: item.Width,
                Height: item.Height,
                ComName: item.ComName + leg,
                BorderWidth: item.BorderWidth,
                BorderColor: item.BorderColor,
                BackColor: item.BackColor,
                FontFamily: item.FontFamily,
                FontWeight: item.FontWeight,
                FontSize: item.FontSize,
                TextDecoration: item.TextDecoration,
                BorderRadius: item.BorderRadius,
                Rotate: item.Rotate,
                BoxShadow: item.BoxShadow,
                Img: item.Img,
                Text: item.Text,
                ZIndex: zindex,

            },
            pointList: ['l', 'r'],
        })
    } else {
        Controls.ControlList.push({
            title: item.title,
            ControlType: item.ControlType,
            Name: item.ControlType + leg,
            Disabled: item.Disabled,
            TabEvent: item.TabEvent,
            Date: item.Date,
            PropertyList: {
                id: leg,
                Left: reuseType && reuseType === 'all' ? reuseData.PropertyList.Left : targetX - fatherX,
                Top: reuseType && reuseType === 'all' ? reuseData.PropertyList.Top : targetY - fatherY,
                Opacity: item.Opacity,
                Style: item.Style,
                Color: item.Color,
                Width: item.Width,
                Height: item.Height,
                Value: item.Value,
                Num1: item.Num1,
                Num2: item.Num2,
                ComName: item.ComName + leg,
                CheckedValue: item.CheckedValue,
                BorderWidth: item.BorderWidth,
                BorderColor: item.BorderColor,
                BackColor: item.BackColor,
                FontFamily: item.FontFamily,
                FontWeight: item.FontWeight,
                FontSize: item.FontSize,
                TextDecoration: item.TextDecoration,
                BorderRadius: item.BorderRadius,
                Placeholder: item.Placeholder,
                TextAlign: item.TextAlign,
                JustifyContent: item.JustifyContent,
                AlignItems: item.AlignItems,
                Rotate: item.Rotate,
                BoxShadow: item.BoxShadow,
                jumpType: item.jumpType,
                linkAddress: item.linkAddress,
                panel: item.panel,
                Img: item.Img,
                Text: item.Text,
                ZIndex: zindex,
                BackImg: item.BackImg,
                BackSetting: item.BackSetting,
                datasetValue: item.datasetValue,
                QueryFind: item.QueryFind,
                type: item.type,
                twoobject: item.twoobject
            },
            pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
        })
    }
    // 此处添加数据
    if (item.ControlType === 'datatextblock') { // 数值显示数据
        let data = {
            CheckData: {
                cusVariableType: reuseData ? reuseData.CheckData.cusVariableType : "",
                customerId: reuseData ? reuseData.CheckData.customerId : "",
                customerName: reuseData ? reuseData.CheckData.customerName : "",
                desc: reuseData ? reuseData.CheckData.desc : "",
                equipmentCode: reuseData ? reuseData.CheckData.equipmentCode : "",
                equipmentId: reuseData ? reuseData.CheckData.equipmentId : "",
                equipmentName: reuseData ? reuseData.CheckData.equipmentName : "",
                from: reuseData ? reuseData.CheckData.from : null,
                id: reuseData ? reuseData.CheckData.id : "",
                name: reuseData ? reuseData.CheckData.name : "",
                type: reuseData ? reuseData.CheckData.type : "",
                unit: reuseData ? reuseData.CheckData.unit : "",
                varType: reuseData ? reuseData.CheckData.varType : null,
            },
            SearchData: {
                origin: reuseData ? reuseData.SearchData.origin : '6',
                device: reuseData ? reuseData.SearchData.device : '',
                variteName: reuseData ? reuseData.SearchData.variteName : '',
                describe: reuseData ? reuseData.SearchData.describe : '',
            },
            dblCheck: reuseData ? reuseData.dblCheck : false,
            conCheck: reuseData ? reuseData.conCheck : false,
            IntNumber: reuseData ? reuseData.IntNumber : null,//整数位数
            DecimalDigits: reuseData ? reuseData.DecimalDigits : null,//小数位数
            TableTitleList: [
                { ID: 'id', title: '序号' },
                { ID: 'variable', title: '变量' },
                { ID: 'flag', title: '条件' },
                { ID: 'num', title: '值' },
                { ID: 'backColor', title: '预设颜色' },
            ],
            DataList: reuseData ? reuseData.DataList : [
                { variable: '选择', flag: '', num: '', backColor: '#fff' },
                //   { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000'}
            ]
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    } else if (item.ControlType === 'dropsearch') { //下拉查询
        let data = {
            ChoiceList: reuseData ? reuseData.ChoiceList : [],  // 存储下拉多选选中的值
            dropList: reuseData ? reuseData.dropList : [],
            EchartList: reuseData ? reuseData.EchartList : [],//需要筛选的图表
            HistoryList: reuseData ? reuseData.HistoryList : [], // 图表历史数据
            TextList: reuseData ? reuseData.TextList : ['1', '1'],//需要筛选的字段
            FilterConditions: reuseData ? reuseData.FilterConditions : '不为空',//过滤条件
            FilterConditionNum: reuseData ? reuseData.FilterConditionNum : '',//过滤条件数值
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    }
    else if (item.ControlType === 'dynamictext') {// 动态文本数据
        let data = {
            // TableTitleList:['序号','变量','条件','值','预设文本','预设颜色'],
            SearchData: {
                origin: reuseData ? reuseData.SearchData.origin : '6',
                device: reuseData ? reuseData.SearchData.device : '',
                variteName: reuseData ? reuseData.SearchData.variteName : '',
                describe: reuseData ? reuseData.SearchData.describe : '',
            },
            TableTitleList: [
                { ID: 'id', title: '序号' },
                { ID: 'variable', title: '变量' },
                { ID: 'flag', title: '条件' },
                { ID: 'num', title: '值' },
                { ID: 'presetText', title: '预设文本' },
                { ID: 'backColor', title: '预设颜色' },

            ],
            DefaultText: reuseData ? reuseData.DefaultText : '默认文本',
            DefaultColor: reuseData ? reuseData.DefaultColor : '#000',
            DataList: reuseData ? reuseData.DataList : [
                {
                    variable: '选择',
                    flag: '',
                    num: '',
                    presetText: '',
                    backColor: '#fff',

                },
                // {
                //     variable:'Tag_1',
                //     flag: '=',
                //     num:'0',
                //     presetText:'我是预设文本',
                //     backColor:'#000000',

                // }
            ]
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    } else if (item.ControlType === 'ellipselamp') {// 圆形状态灯
        let data = {
            // TableTitleList:['序号','变量','条件','值','预设文本','预设颜色'],
            DefaultColor: reuseData ? reuseData.DefaultColor : '#000',
            DefaultFlashing: reuseData ? reuseData.DefaultFlashing : true,//默认闪烁
            SearchData: {
                origin: reuseData ? reuseData.SearchData.origin : '6',
                device: reuseData ? reuseData.SearchData.device : '',
                variteName: reuseData ? reuseData.SearchData.variteName : '',
                describe: reuseData ? reuseData.SearchData.describe : '',
            },
            TableTitleList: [
                { ID: 'id', title: '序号' },
                { ID: 'variable', title: '变量' },
                { ID: 'flag', title: '条件' },
                { ID: 'num', title: '值' },
                { ID: 'backColor', title: '预设颜色' },
                { ID: 'flashing', title: '' },
            ],
            DataList: reuseData ? reuseData.DataList : [
                { variable: '选择', flag: '=', num: '0', backColor: '#fff', flashing: false },
                // { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000',flashing:false}
            ]
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)

    } else if (item.ControlType === 'commonlamp') {//矩形状态灯
        let data = {
            // TableTitleList:['序号','变量','条件','值','预设文本','预设颜色'],
            DefaultColor: reuseData ? reuseData.DefaultColor : '#000',
            DefaultFlashing: reuseData ? reuseData.DefaultFlashing : false,
            SearchData: {
                origin: reuseData ? reuseData.SearchData.origin : '6',
                device: reuseData ? reuseData.SearchData.device : '',
                variteName: reuseData ? reuseData.SearchData.variteName : '',
                describe: reuseData ? reuseData.SearchData.describe : '',
            },
            TableTitleList: [
                { ID: 'id', title: '序号' },
                { ID: 'variable', title: '变量' },
                { ID: 'flag', title: '条件' },
                { ID: 'num', title: '值' },
                { ID: 'backColor', title: '预设颜色' },
                { ID: 'flashing', title: '' },
            ],
            DataList: reuseData ? reuseData.DataList : [
                { variable: '选择', flag: '=', num: '0', backColor: '#fff', flashing: false },
                // { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000',flashing:false}
            ]
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    } else if (item.ControlType === 'rwtextbox') {//读写框
        let data = {
            CheckData: {
                cusVariableType: reuseData ? reuseData.CheckData.cusVariableType : "",
                customerId: reuseData ? reuseData.CheckData.customerId : "",
                customerName: reuseData ? reuseData.CheckData.customerName : "",
                desc: reuseData ? reuseData.CheckData.desc : "",
                equipmentCode: reuseData ? reuseData.CheckData.equipmentCode : "",
                equipmentId: reuseData ? reuseData.CheckData.equipmentId : "",
                equipmentName: reuseData ? reuseData.CheckData.equipmentName : "",
                from: reuseData ? reuseData.CheckData.from : null,
                id: reuseData ? reuseData.CheckData.id : "",
                name: reuseData ? reuseData.CheckData.name : "",
                type: reuseData ? reuseData.CheckData.type : "",
                unit: reuseData ? reuseData.CheckData.unit : "",
                varType: reuseData ? reuseData.CheckData.varType : null,
            },
            TriggerCondition: reuseData ? reuseData.CheckData.TriggerCondition : '1',//触发条件
            // 表格查询数据
            SearchData: {
                origin: reuseData ? reuseData.SearchData.origin : '6',
                device: reuseData ? reuseData.SearchData.device : '',
                variteName: reuseData ? reuseData.SearchData.variteName : '',
                describe: reuseData ? reuseData.SearchData.describe : '',
            },
            dblCheck: reuseData ? reuseData.dblCheck : false,  // 历史曲线勾选
            conCheck: reuseData ? reuseData.conCheck : false, // 颜色变化勾选
            TableTitleList: [
                { ID: 'id', title: '序号' },
                { ID: 'variable', title: '变量' },
                { ID: 'flag', title: '条件' },
                { ID: 'num', title: '值' },
                { ID: 'backColor', title: '预设颜色' },
            ],
            DataList: reuseData ? reuseData.DataList : [
                { variable: '选择', flag: '', num: '', backColor: '#fff' },
                // { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000'}
            ]
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    } else if (item.ControlType === 'textsearch') {//文本查询
        let data = {
            EchartList: reuseData ? reuseData.EchartList : [],//需要筛选的图表
            HistoryList: reuseData ? reuseData.HistoryList : [], // 图表历史数据
            TextList: reuseData ? reuseData.TextList : ['1', '1'],//需要筛选的字段
            FilterConditions: reuseData ? reuseData.FilterConditions : '不为空',//过滤条件
            FilterConditionNum: reuseData ? reuseData.FilterConditionNum : '',//过滤条件数值
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    }
    else if (item.ControlType === 'datasearch') {//数值查询
        let data = {
            EchartList: reuseData ? reuseData.EchartList : [],//需要筛选的图表
            HistoryList: reuseData ? reuseData.HistoryList : [], // 图表历史数据
            TextList: reuseData ? reuseData.TextList : ['1', '1'],//需要筛选的字段
            FilterConditions: reuseData ? reuseData.FilterConditions : '不为空',//过滤条件
            FilterConditionNum: reuseData ? reuseData.FilterConditionNum : '',//过滤条件数值
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    }
    else if (item.ControlType === 'dropsearch') {//下拉查询
        let data = {
            ChoiceList: reuseData ? reuseData.ChoiceList : [],  // 存储下拉多选选中的值
            dropList: reuseData ? reuseData.dropList : [],
            EchartList: reuseData ? reuseData.EchartList : [],//需要筛选的图表
            HistoryList: reuseData ? reuseData.HistoryList : [], // 图表历史数据
            TextList: reuseData ? reuseData.TextList : ['1', '1'],//需要筛选的字段
            FilterConditions: reuseData ? reuseData.FilterConditions : '不为空',//过滤条件
            FilterConditionNum: reuseData ? reuseData.FilterConditionNum : '',//过滤条件数值
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    }
    else if (item.ControlType === 'associatedatetimepicker') {//日期时间
        // if (!type) {
        let data = {
            DateTimeType: reuseData ? reuseData.DateTimeType : 'yyyy-MM-dd HH:mm',//时间格式
            StartTime: reuseData ? reuseData.StartTime : formatDateTime(new Date()),
            EndTime: reuseData ? reuseData.EndTime : formatDateTime(new Date()),
            AsDatetimepickerType: reuseData ? reuseData.AsDatetimepickerType : '业务数据',
            EchartList: reuseData ? reuseData.EchartList : [],//需要筛选的图表
            HistoryList: reuseData ? reuseData.HistoryList : [], // 图表历史数据
            TextList: reuseData ? reuseData.TextList : ['1', '1'],//需要筛选的字段
            FilterConditions: reuseData ? reuseData.FilterConditions : '不为空',//过滤条件
            FilterConditionNum: reuseData ? reuseData.FilterConditionNum : '',//过滤条件数值
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
        /* } else {
            let data = {
                DateTimeType: reuseData.DateTimeType,//时间格式
                StartTime: reuseData.StartTime,
                EndTime: reuseData.EndTime,
                AsDatetimepickerType: reuseData.AsDatetimepickerType,
                EchartList: reuseData.EchartList,//需要筛选的图表
                HistoryList: reuseData.HistoryList, // 图表历史数据
                TextList: reuseData.TextList,//需要筛选的字段
                FilterConditions: reuseData.FilterConditions,//过滤条件
                FilterConditionNum: reuseData.FilterConditionNum,//过滤条件数值
            }
            Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
        } */

    }
    else if (item.ControlType === 'cornerbutton') {//控制按钮
        let data = {
            type: reuseData ? reuseData.type : 'radio',
            IsOpen: reuseData ? reuseData.IsOpen : true,//确认时是否弹出确认框
            IsOpenText: reuseData ? reuseData.IsOpenText : '是否确认下发数据？',
            ShowPermission: reuseData ? reuseData.ShowPermission : true,//是否有操作权限
            OperationPermission: reuseData ? reuseData.OperationPermission : 'public',//操作权限
            AccessPermission: reuseData ? reuseData.AccessPermission : 'public',//访问权限
            PermissionMan: reuseData ? reuseData.PermissionMan : [],//可访问人员
            PermissionDesc: reuseData ? reuseData.PermissionDesc : '',//策略描述
            operatData: reuseData ? reuseData.operatData : {   // 操作权限数据
                oDeparts: [],   //部门
                oJobs: [],  // 职位
                oPeoples: [],    // 人员
                opetaPermissions: [], // 权限
                currentNode: {}, // 选中的人员树
                oStaffList: [],
                cloneODeparts: [],  // 克隆保存部门内容
                cloneOJobs: [], // 克隆保存职位内容
                cloneOPeoples: [],  // 克隆保存人员内容
            },
            radioType: reuseData ? reuseData.radioType : '0',
            // 表格查询数据
            SearchData: {
                origin: reuseData ? reuseData.SearchData.origin : '6',
                device: reuseData ? reuseData.SearchData.device : '',
                variteName: reuseData ? reuseData.SearchData.variteName : '',
                describe: reuseData ? reuseData.SearchData.describe : '',
            },
            ButtonTypeList: reuseData ? reuseData.ButtonTypeList : [
                {
                    id: '0',
                    title: '下发固定值',
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'issuedValue', title: '下发值' },
                    ],
                    DataList: [
                        { variable: '选择', issuedValue: '0' },
                        //    { variable:'Tag_1',issuedValue:'0'}
                    ],
                    addBtnTitle: '新增变量'
                },
                {
                    id: '1',
                    title: '关联控件',
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'rwtextbox', title: '控件' }
                    ],
                    DataList: [
                        { rwtextbox: '' },
                        //    { rwtextbox:'数值输入1'}
                    ],
                    addBtnTitle: '新增组件关联'
                },
                {
                    id: '2',
                    title: '弹窗设定参数',

                }
            ],
            ButtonTypeThreeList: reuseData ? reuseData.ButtonTypeThreeList : [
                {
                    ButtonTypeThreeTitle: 'SOP信息',
                    addBtnTitle: '新增变量',
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'title', title: '标题' },

                    ],
                    DataList: [
                        { title: 'SOP标题', variable: '选择' },
                        // { title:'SOP代码',variable:'tag_2'}
                    ],

                },
                // {
                //     ButtonTypeThreeTitle:'SOP信息2',
                //     addBtnTitle:'新增变量',
                //     TableTitleList:[
                //        {ID:'id', title:'序号' },
                //        {ID:'title',title:'标题'},
                //        {ID:'variable',title:'变量'},
                //     ],
                //     DataList: [
                //         {title:'SOP标题',variable:'tag_3'},
                //         { title:'SOP代码',variable:'tag_4'}
                //     ],

                // }
            ]

        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    } else if (item.ControlType === 'image') {//动态图片
        let data = {
            DefaultImg: reuseData ? reuseData.DefaultImg : './imgs/defuleUpload.png',//默认图片
            SearchData: reuseData ? reuseData.SearchData : {
                origin: '6',
                device: '',
                variteName: '',
                describe: '',
            },
            TableTitleList: [
                { ID: 'img', title: '图片' },
                { ID: 'variable', title: '变量' },
                { ID: 'flag', title: '条件' },
                { ID: 'presetText', title: '值' },
            ],
            DataList: reuseData ? reuseData.DataList : [
                { img: './imgs/defuleUpload.png', variable: '', flag: '=', presetText: '' },
                // {img:'../imgs/img1.jpg',variable:'Tag_1',flag: '=',presetText:'预设文本'},
            ]
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
    } else if (item.ControlType === 'searchbutton') {
        let data = {
            EchartList: reuseData ? reuseData.EchartList : [],//需要筛选的图表
            HistoryList: reuseData ? reuseData.HistoryList : [],//历史数据
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)

    }
    item.Left = targetX - fatherX
    item.Top = targetY - fatherY
    localdata = {
        ControlList: [],
        Data: {
            PieChartItemList: [],
            DashBoardChartItemList: [],
            BarChartItemList: [],
            LineChartItemList: []
        }
    }
    rightCommon(item.title, item.ControlType + leg, Controls.ControlList.length - 1)
    // Controls.ControlList.length - 1 从源对象拖放到画布上的生成的元素永远是Controls.ControlList数组的最后一位
    let itemData = {
        ...item,
        ComName: item.ComName + leg     // 组件名称唯一
    }
    changeCommon(itemData, Controls.ControlList.length - 1)
    localdata.ControlList.push(JSON.parse(JSON.stringify(Controls.ControlList[Controls.ControlList.length - 1])))
    childElement(Controls.ControlList.length - 1, type ? type : '')
    //增加饼图数据
    if (item.ControlType == 'piechart') {
        let pieData = {}
        let data = {}
        if (!type) {
            pieData = PieChartData(item.ControlType + leg)
            data = {
                // 表格选中行数据
                CheckData: {
                    cusVariableType: "",
                    customerId: "",
                    customerName: "",
                    desc: "",
                    equipmentCode: "",
                    equipmentId: "",
                    equipmentName: "",
                    from: null,
                    id: "",
                    name: "",
                    type: "",
                    unit: "",
                    varType: null,
                },
                SearchData: {
                    origin: '6',
                    device: '',
                    variteName: '',
                    describe: '',
                },
            }
        } else {
            chartData.name = item.ControlType + leg
            pieData = chartData
            data.CheckData = reuseData.CheckData ? reuseData.CheckData : {
                cusVariableType: "",
                customerId: "",
                customerName: "",
                desc: "",
                equipmentCode: "",
                equipmentId: "",
                equipmentName: "",
                from: null,
                id: "",
                name: "",
                type: "",
                unit: "",
                varType: null,
            }
            data.SearchData = reuseData.SearchData ? reuseData.SearchData : {
                origin: '6',
                device: '',
                variteName: '',
                describe: '',
            }
        }

        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
        Controls.Data.PieChartItemList.push(pieData)
        localdata.Data.PieChartItemList.push(pieData)
        PieChartDataFun()  //饼图
    } else if (item.ControlType == 'dashboardchart') {
        let DashData = {}
        let data = {}
        if (!type) {
            DashData = DashBoardChartData(item.ControlType + leg)
            data = {
                // 表格选中行数据
                CheckData: {
                    cusVariableType: "",
                    customerId: "",
                    customerName: "",
                    desc: "",
                    equipmentCode: "",
                    equipmentId: "",
                    equipmentName: "",
                    from: null,
                    id: "",
                    name: "",
                    type: "",
                    unit: "",
                    varType: null,
                },
                SearchData: {
                    origin: '6',
                    device: '',
                    variteName: '',
                    describe: '',
                },
            }
        } else {
            chartData.name = item.ControlType + leg
            DashData = chartData
            data.CheckData = reuseData.CheckData ? reuseData.CheckData : {
                cusVariableType: "",
                customerId: "",
                customerName: "",
                desc: "",
                equipmentCode: "",
                equipmentId: "",
                equipmentName: "",
                from: null,
                id: "",
                name: "",
                type: "",
                unit: "",
                varType: null,
            }
            data.SearchData = reuseData.SearchData ? reuseData.SearchData : {
                origin: '6',
                device: '',
                variteName: '',
                describe: '',
            }
        }

        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
        Controls.Data.DashBoardChartItemList.push(DashData)
        localdata.Data.DashBoardChartItemList.push(DashData)
        DashChartDataFun()  //仪表盘
    } else if (item.ControlType == 'barchart') {
        let DashData = {}
        let data = {}
        if (!type) {
            DashData = BarrChartData(item.ControlType + leg)
            data = {
                // 表格选中行数据
                CheckData: {
                    cusVariableType: "",
                    customerId: "",
                    customerName: "",
                    desc: "",
                    equipmentCode: "",
                    equipmentId: "",
                    equipmentName: "",
                    from: null,
                    id: "",
                    name: "",
                    type: "",
                    unit: "",
                    varType: null,
                },
                SearchData: {
                    origin: '6',
                    device: '',
                    variteName: '',
                    describe: '',
                },
            }
        } else {
            chartData.name = item.ControlType + leg
            DashData = chartData
            data.CheckData = reuseData.CheckData ? reuseData.CheckData : {
                cusVariableType: "",
                customerId: "",
                customerName: "",
                desc: "",
                equipmentCode: "",
                equipmentId: "",
                equipmentName: "",
                from: null,
                id: "",
                name: "",
                type: "",
                unit: "",
                varType: null,
            }
            data.SearchData = reuseData.SearchData ? reuseData.SearchData : {
                origin: '6',
                device: '',
                variteName: '',
                describe: '',
            }
        }
        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
        Controls.Data.BarChartItemList.push(DashData)
        localdata.Data.BarChartItemList.push(DashData)
        BarChartDataFun()  //柱形图
    } else if (item.ControlType == 'linechart') {
        let DashData = {}
        let data = {}
        if (!type) {
            DashData = LineChartData(item.ControlType + leg)
            data = {
                // 表格选中行数据
                CheckData: {
                    cusVariableType: "",
                    customerId: "",
                    customerName: "",
                    desc: "",
                    equipmentCode: "",
                    equipmentId: "",
                    equipmentName: "",
                    from: null,
                    id: "",
                    name: "",
                    type: "",
                    unit: "",
                    varType: null,
                },
                SearchData: {
                    origin: '6',
                    device: '',
                    variteName: '',
                    describe: '',
                },
            }
        } else {
            chartData.name = item.ControlType + leg
            DashData = chartData
            data.CheckData = reuseData.CheckData ? reuseData.CheckData : {
                cusVariableType: "",
                customerId: "",
                customerName: "",
                desc: "",
                equipmentCode: "",
                equipmentId: "",
                equipmentName: "",
                from: null,
                id: "",
                name: "",
                type: "",
                unit: "",
                varType: null,
            }
            data.SearchData = reuseData.SearchData ? reuseData.SearchData : {
                origin: '6',
                device: '',
                variteName: '',
                describe: '',
            }
        }

        Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
        Controls.Data.LineChartItemList.push(DashData)
        localdata.Data.LineChartItemList.push(DashData)
        LineChartDataFun()  //折线图
    }


    $('#chart-list').css('display', 'none')
    // back(selectdata, Controls)
    //初始化图表右侧数据
    //  setTimeout(() => {
    echartsDataInit(item.ControlType, item.ControlType + leg)
    //  }, 400)
}

// function definedAttribute(vm, key, val) {
//     Object.defineProperty(vm, key, {
//         // enumerable: true,
//         // configurable: false,
//         get() {
//             return val
//         },
//         set(newVal) {
//             console.log("我监听到了数据的变化")

//         }
//     })
// }
// 监听tabs页面
layui.use('element', function () {
    var element = layui.element;
    //一些事件触发


    element.on('tab(docDemoTabBrief)', function (ele) {
        let tab = document.getElementById('tab-wrap')
        let tabi = tab.dataset.index ? tab.dataset.index : ''
        if (tabi === '') {
            // 仪表板设置权限
            if (ele.index === 0) {
                return
            }
            if (ele.index === 1) {
                //   let lis = [...$('#rankSelect li')]
                let lis = [...document.querySelectorAll('#rankSelect li')]
                let jobNames = []
                jobArr.forEach(item => {
                    jobNames.push(item.bizName)
                })
                lis.forEach((item, index) => {
                    if (jobNames.includes(item.firstElementChild.innerText)) {
                        $(item.lastElementChild).addClass("active");
                    } else {
                        $(item.lastElementChild).removeClass("active");
                    }
                })
                return
            }
            if (ele.index === 2) {
                //    let lis = [...$('#peopleSelect li')]
                let lis = [...document.querySelectorAll('#peopleSelect li')]
                let peopleNames = []
                peopleArr.forEach(item => {
                    peopleNames.push(item.bizName)
                })
                lis.forEach((item, index) => {
                    if (peopleNames.includes(item.lastElementChild.innerText)) {
                        $(item.firstElementChild).addClass("active");
                    } else {
                        $(item.firstElementChild).removeClass("active");
                    }
                })
                // })
                return
            }
        } else {
            // 控制按钮权限
            let { operatData } = Controls.ControlList[tabi]
            if (ele.index === 0) {
                return
            }
            if (ele.index === 1) {
                //   let lis = [...$('#rankSelect li')]
                let lis = [...document.querySelectorAll('#rankSelect li')]
                let jobNames = []
                operatData.oJobs.forEach(item => {
                    jobNames.push(item.bizName)
                })
                lis.forEach((item, index) => {
                    if (jobNames.includes(item.firstElementChild.innerText)) {
                        $(item.lastElementChild).addClass("active");
                    } else {
                        $(item.lastElementChild).removeClass("active");
                    }
                })
                return
            }
            if (ele.index === 2) {
                //    let lis = [...$('#peopleSelect li')]
                let lis = [...document.querySelectorAll('#peopleSelect li')]
                let peopleNames = []
                operatData.oPeoples.forEach(item => {
                    peopleNames.push(item.bizName)
                })
                lis.forEach((item, index) => {
                    if (peopleNames.includes(item.lastElementChild.innerText)) {
                        $(item.firstElementChild).addClass("active");
                    } else {
                        $(item.firstElementChild).removeClass("active");
                    }
                })
                // })
                return
            }
        }
    })
});
//自定义权限中的职位勾选事件
$(document).on("click", "#rankSelect li", function (e) {
    let tab = document.getElementById('tab-wrap')
    let tabi = tab.dataset.index ? tab.dataset.index : ''
    if (tabi === '') {
        // 仪表板设置
        if ($(this).find('i').hasClass("active")) {
            $(this).find('i').removeClass("active");
            let id = []
            id.push($(this).find('span').data().id)
            jobArr.forEach((item, index) => {
                if (id.includes(item.bizId)) {
                    jobArr.splice(index, 1)
                }
            })
            // jobArr.splice($.inArray($(this).siblings().text(),jobArr),1);
        } else {
            $(this).find('i').addClass("active");
            jobArr.push({
                bizId: $(this).find('span').data().id,
                bizName: $(this).find('span').text(),
                bizType: 'position'
            })
        }
        //模板引擎
        layui.use('laytpl', function () {
            let laytpl = layui.laytpl;
            //第三步：渲染模版
            let jobArrdata = [];
            jobArr.forEach(item => {
                jobArrdata.push(item.bizName)
            })
            let getTpl = jobArrTpl.innerHTML;
            view = document.getElementById('viewTpl2');
            if (jobArrdata.length >= 0) {
                laytpl(getTpl).render(jobArrdata, function (html) {
                    view.innerHTML = html;
                });
            }
        });
    } else {
        // 控制按钮权限
        let { operatData } = Controls.ControlList[tabi]
        if ($(this).find('i').hasClass("active")) {
            $(this).find('i').removeClass("active");
            let id = []
            id.push($(this).find('span').data().id)
            operatData.oJobs.forEach((item, index) => {
                if (id.includes(item.bizId)) {
                    operatData.oJobs.splice(index, 1)
                }
            })
            // jobArr.splice($.inArray($(this).siblings().text(),jobArr),1);
        } else {
            $(this).find('i').addClass("active");
            operatData.oJobs.push({
                bizId: $(this).find('span').data().id,
                bizName: $(this).find('span').text(),
                bizType: 'position'
            })
        }
        //模板引擎
        layui.use('laytpl', function () {
            let laytpl = layui.laytpl;
            //第三步：渲染模版
            let jobArrdata = [];
            operatData.oJobs.forEach(item => {
                jobArrdata.push(item.bizName)
            })
            let getTpl = jobArrTpl.innerHTML;
            view = document.getElementById('viewTpl2');
            if (jobArrdata.length >= 0) {
                laytpl(getTpl).render(jobArrdata, function (html) {
                    view.innerHTML = html;
                });
            }
        });
    }
})
window.addEventListener("resize", debounce(renderFuncMore, 300), false)
//页面初始化
window.addEventListener("load", handler, false);
async function handler() {
    //阻止粘贴
    // document.onpaste = function(e){
    //     if(e.type == 'paste'){
    //         return false; 
    //     }
    //     };
    renderFuncMore()
    /*
    await request.get(`/bi/${appId}/panel-configs/${panelId}`).then(res => {
        if (res.data.data) {
            let panel = res.data.data.panel;
            localdata = {
                ControlList: [],
                Data: {
                    BarChartItemList: [],
                    DashBoardChartItemList: [],
                    LineChartItemList: [],
                    PieChartItemList: []
                }
            }
            if (res.data.data.configDetails) {
                Controls = JSON.parse(res.data.data.configDetails)
            } else {
                Controls = {
                    ControlList: [],
                    Data: {
                        BarChartItemList: [],
                        DashBoardChartItemList: [],
                        LineChartItemList: [],
                        PieChartItemList: []
                    }
                }
            }
            commonList = {
                Name: panel.name ? panel.name : 'MainCanvas',
                Position: panel.groupName ? panel.groupName : '',
                BackSetting: Controls.BackSetting ? Controls.BackSetting : 'color',
                BackColor: Controls.BackColor ? Controls.BackColor : '#f6f6f6',
                BackImg: Controls.BackImg ? Controls.BackImg : '../imgs/defuleUpload.png',
                Permision: Controls.Permision ? Controls.Permision : 'public',
                Description: Controls.Description ? Controls.Description : '',
                PermissionList: res.data.data.permissions ? res.data.data.permissions : [],
                TreeNode: Controls.TreeNode ? Controls.TreeNode : {},
                WrapWidth: Controls.WrapWidth ? Controls.WrapWidth : '100%',
                IsShowCustoms: Controls.IsShowCustoms ? Controls.IsShowCustoms : false,
                GuideWidth: Controls.GuideWidth ? Controls.GuideWidth : '0',
                GuideHeight: Controls.GuideHeight ? Controls.GuideHeight : '0',
                CustomWidth: Controls.CustomWidth ? Controls.CustomWidth : '0',
                CustomHeight: Controls.CustomHeight ? Controls.CustomHeight : '0',
            }
            Controls.User = res.data.data.user ? res.data.data.user : {}
            // posTree = $.fn.zTree.getZTreeObj("treeAttr")
            // currentPosNode = posTree.getNodeByParam("name",panel.groupName, null);
            // currentPosNode = Controls.TreeNode
            permissionList = res.data.data.permissions ? res.data.data.permissions : []
            permissionList.forEach(item => {
                if (item.bizType === 'department') {
                    checkDeptArr.push({
                        bizId: item.bizId,
                        bizName: item.bizName,
                        bizType: item.bizType
                    })
                } else if (item.bizType === 'position') {
                    jobArr.push({
                        bizId: item.bizId,
                        bizName: item.bizName,
                        bizType: item.bizType
                    })
                } else if (item.bizType === 'user') {
                    peopleArr.push({
                        bizId: item.bizId,
                        bizName: item.bizName,
                        bizType: item.bizType
                    })
                }
            })
            cloneDepart = JSON.parse(JSON.stringify(checkDeptArr))
            cloneJob = JSON.parse(JSON.stringify(jobArr))
            clonePeople = JSON.parse(JSON.stringify(peopleArr))
            back(selectdata, Controls)
            if (Controls.ControlList.length !== 0) {

                isresdata = false
                imgDisabled()
            } else {
                isresdata = true
                imgDisabled()
            }
        }
    })
    */
    let local = localStorage.getItem('saveControls')
    let tempLocal = localStorage.getItem('Controls')
    let CommonCanvas = JSON.parse(localStorage.getItem('CommonCanvas'))
    if (tempLocal) { // 此处判断是否从预览界面回到编辑页面
        Controls = JSON.parse(tempLocal)
        // localdata = JSON.parse(tempLocal)
        commonList.WrapWidth = CommonCanvas.WrapWidth
        if (CommonCanvas.BackSetting === 'color') {
            commonList.BackSetting = CommonCanvas.BackSetting
            commonList.BackColor = CommonCanvas.BackColor
        } else {
            if (canvasWrap) {
                canvasWrap.style.backgroundImage = `url(${CommonCanvas.BackImg})`
                canvasWrap.style.backgroundRepeat = `norepear`
                canvasWrap.style.backgroundSize = `100% 100%`
            }
            commonList.BackSetting = CommonCanvas.BackSetting
            commonList.BackColor = CommonCanvas.BackColor
            commonList.BackImg = CommonCanvas.BackImg
        }
        localStorage.removeItem('Controls')
        localStorage.removeItem('CommonCanvas')
    } else if (local) {
        Controls = JSON.parse(local)
        localdata = JSON.parse(local)
    }
    // if (local) {
    //   Controls = JSON.parse(local)
    //   localdata = JSON.parse(local)
    // }
    if (Controls.ControlList.length !== 0) {
        let ids = []
        let zindexarr = []

        Controls.ControlList.forEach((item, index) => {
            ids.push(item.PropertyList.id)
            zindexarr.push(item.PropertyList.ZIndex)
        })
        leg = Math.max(...ids)
        zindex = Math.max(...zindexarr) + 1
    } else {
        leg = 0
        zindex = 0
    }
    // $('#canvas-wrap').css({
    //     width: commonList.WrapWidth
    // })
    // $('#canvas-wrap').css({
    //     'transform-origin': '0% 0%',
    //     'transform': `scale(${commonList.WrapWidth * 0.01})`
    // })

    if (commonList.IsShowCustoms === false && commonList.GuideWidth === '0' && commonList.GuideHeight === '0') {
        $('#across-line').css('display', 'none')
        $('#vertical-line').css('display', 'none')
    } else {
        $('#across-line').css('display', 'block')
        $('#vertical-line').css('display', 'block')
        $('#across-line').css({ /* 横线 */
            top: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px',
            width: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px'
        })
        $('#vertical-line').css({ /* 竖线 */
            left: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px',
            height: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px'
        })
    }



    $('.viewpass')[0].innerText = commonList.WrapWidth
    // 注释Zoom
    if (parseInt(commonList.WrapWidth) >= 100) {
        $('#canvas-wrap').css({
            // 'width': zoomValue + '%',
            // 'hiehgt': zoomValue + '%'
            'transform-origin': '0% 0%',
            'transform': `scale(${parseInt(commonList.WrapWidth) * 0.01})`
        })
    } else {
        $('#canvas-wrap').css({
            // 'width': zoomValue + '%',
            // 'hiehgt': zoomValue + '%'
            'transform-origin': 'unset',
            'transform': `scale(${parseInt(commonList.WrapWidth) * 0.01})`
        })
    }


    let lis = [...document.querySelectorAll('.select-pass li')]
    lis.forEach(item => {
        if (item.innerText === commonList.WrapWidth) {
            $(item).addClass('selected')
        } else {
            $(item).removeClass('selected')
        }
    })

    // 组件部分拖拽源对象

    var btnGroups = document.getElementById('btnGroups')
    let list = ['jumplink', 'piechart', 'dashboardchart', 'barchart', 'linechart']
    let clicks = ['solidrectangle', 'titleCom']
    var str = ``
    btns.forEach((item, index) => {
        if (!list.includes(item.ControlType)) {
            if (!clicks.includes(item.ControlType)) {
                str += `<div onmouseover="showTips(event,'${item.title}')" id="btnGroups${index}" class="btn" draggable="true" title="${item.title}" data-id="${index}">
                            <i class="icon iconfont ${item.icon}" data-id="${index}" ></i>
                        </div>`
            } else {
                str += `<div onmouseenter="showTips(event,'${item.title}')" id="btnGroups${index}" class="btn" draggable="true" title="${item.title}" data-id="${index}"
                        ${clicks.includes(item.ControlType) ? `onclick="showMore(event, ${index})" ` : ''}>
                                <i class="icon iconfont ${item.icon}" data-id="${index}" ></i>
                            </div>
                            ${renderMore(item.ControlType, index,)
                    }
                            `
            }

        } else {
            // <i class="icon iconfont ${item.icon}" style="color: #80BCFB"  data-id="${index}" ></i>
            str += `<div class="btn" onmouseover="showTips(event,'${item.title}')" id="btnGroups${index}" draggable="true" title="${item.title}" data-id="${index}">
                                                              <img src="${item.icon}" draggable="false" data-id="${index}" ></img>
                                                            </div>`
            // str += `<div class="btn" draggable="true" title="${item.title}" data-id="${index}">
            //   <svg class="svgIcon module-svgIcon" aria-hidden="true" data-id="${index}">
            //     <title>${item.title}</title>
            //     <use xlink:href="#${item.icon}"></use>
            //   </svg>
            // </div>`
        }
    })
    btnGroups.innerHTML = str
    initCommon('init')
    // 预览返回初始化图表
    setTimeout(() => {
        PieChartDataFun()  //饼图
        DashChartDataFun()  //仪表盘
        LineChartDataFun()
        BarChartDataFun()  //柱形图
    }, 300)

    // dragStart事件
    btnGroups.addEventListener("dragstart", function (e) {
        menu.style.display = 'none'
        if (e.target.className.includes("btn")) {
            e.dataTransfer.setData("data", JSON.stringify(e.target.dataset.id));
            if (e.target.dataset.subid) {
                e.dataTransfer.setData("subData", JSON.stringify(e.target.dataset.subid));
            }
            e.dataTransfer.effectAllowed = 'copyMove'
        }
    }, false)
    //组件mousedown事件
    btnGroups.addEventListener('mousedown', function (e) {
        console.log(e)
        /* 
            4： 矩形组件
            5：标题组件
        */
        if ($(e.path[0]).attr('data-id') === '4' || $(e.path[0]).attr('data-id') === '5' || !$(e.path[0]).attr('data-id')) {
            return
        }
        buttonid = $(e.path[0]).attr('data-id').toString()

    })
    // drag事件
    btnGroups.addEventListener("drag", function (e) {
        e.preventDefault()
    }, false)
    // 中间画布部分拖拽目标对象
    var canvasWrap = document.getElementById('canvas-wrap')
    // 初始化画布，此方法用于差看画布使用

    childElement(null, '', 'all')
    //组件mousedown事件
    canvasWrap.addEventListener('mouseup', function (event) {
        if (buttonid) {
            buttonid = parseInt(buttonid)
            // leg初始化之后没拖动一个元素下来就+1,此值会一直++, 防止元素名称重复
            leg++
            if (Controls.ControlList.length !== 0) {
                let zindexarr = []
                Controls.ControlList.forEach((item, index) => {
                    zindexarr.push(item.PropertyList.ZIndex)
                })
                zindex = Math.max(...zindexarr) + 1
            } else {
                zindex = 0
            }
            // zindex++;
            // 父级元素id = canvasWrap的网页可见区域上、左的距离
            let fatherY = canvasWrap.offsetTop
            let fatherX = canvasWrap.offsetLeft

            // 拖动元素距离网页可见区域上、左的距离
            let targetX = event.clientX
            let targetY = event.clientY
            let index;
            // 获取dragstart事件传递的参数 注意：index为组件属性栏的下标
            index = JSON.parse(JSON.stringify(buttonid))
            // if(zindex!==0){
            //    index =JSON.parse(JSON.stringify(zindex))
            // }else{
            //    index = 0
            // }

            let item = btns[index]
            // 需在这边添加增加的样式

            if (item.ControlType === 'line') { //line单独添加样式
                Controls.ControlList.push({
                    title: item.title,
                    ControlType: item.ControlType,
                    Name: item.ControlType + leg,
                    TabEvent: item.TabEvent,
                    PropertyList: {
                        id: leg,
                        Left: /* reuseType && reuseType === 'all' ? reuseData.PropertyList.Left : */ targetX - fatherX,
                        Top: /* reuseType && reuseType === 'all' ? reuseData.PropertyList.Top : */targetY - fatherY,
                        Opacity: item.Opacity,
                        Style: item.Style,
                        Color: item.Color,
                        Width: item.Width,
                        Height: item.Height,
                        ComName: item.ComName + leg,
                        BorderWidth: item.BorderWidth,
                        BorderColor: item.BorderColor,
                        BackColor: item.BackColor,
                        FontFamily: item.FontFamily,
                        FontWeight: item.FontWeight,
                        FontSize: item.FontSize,
                        TextDecoration: item.TextDecoration,
                        BorderRadius: item.BorderRadius,
                        Rotate: item.Rotate,
                        BoxShadow: item.BoxShadow,
                        Img: item.Img,
                        Text: item.Text,
                        ZIndex: zindex,

                    },
                    pointList: ['l', 'r'],
                })
            } else {
                Controls.ControlList.push({
                    title: item.title,
                    ControlType: item.ControlType,
                    Name: item.ControlType + leg,
                    Disabled: item.Disabled,
                    TabEvent: item.TabEvent,
                    Date: item.Date,
                    PropertyList: {
                        id: leg,
                        Left: /* reuseType && reuseType === 'all' ? reuseData.PropertyList.Left : */ targetX - fatherX,
                        Top: /* reuseType && reuseType === 'all' ? reuseData.PropertyList.Top :  */targetY - fatherY,
                        Opacity: item.Opacity,
                        Style: item.Style,
                        Color: item.Color,
                        Width: item.Width,
                        Height: item.Height,
                        Value: item.Value,
                        Num1: item.Num1,
                        Num2: item.Num2,
                        ComName: item.ComName + leg,
                        CheckedValue: item.CheckedValue,
                        BorderWidth: item.BorderWidth,
                        BorderColor: item.BorderColor,
                        BackColor: item.BackColor,
                        FontFamily: item.FontFamily,
                        FontWeight: item.FontWeight,
                        FontSize: item.FontSize,
                        TextDecoration: item.TextDecoration,
                        BorderRadius: item.BorderRadius,
                        Placeholder: item.Placeholder,
                        TextAlign: item.TextAlign,
                        JustifyContent: item.JustifyContent,
                        AlignItems: item.AlignItems,
                        Rotate: item.Rotate,
                        BoxShadow: item.BoxShadow,
                        jumpType: item.jumpType,
                        linkAddress: item.linkAddress,
                        panel: item.panel,
                        Img: item.Img,
                        Text: item.Text,
                        ZIndex: zindex,
                        BackImg: item.BackImg,
                        BackSetting: item.BackSetting,
                        datasetValue: item.datasetValue,
                        QueryFind: item.QueryFind,
                        type: item.type,
                        twoobject: item.twoobject
                    },
                    pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
                })
            }
            // 此处添加数据
            if (item.ControlType === 'datatextblock') { // 数值显示数据
                let data = {
                    CheckData: {
                        cusVariableType: "",
                        customerId: "",
                        customerName: "",
                        desc: "",
                        equipmentCode: "",
                        equipmentId: "",
                        equipmentName: "",
                        from: null,
                        id: "",
                        name: "",
                        type: "",
                        unit: "",
                        varType: null,
                    },
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    dblCheck: false,
                    conCheck: false,
                    IntNumber: null,//整数位数
                    DecimalDigits: null,//小数位数
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'flag', title: '条件' },
                        { ID: 'num', title: '值' },
                        { ID: 'backColor', title: '预设颜色' },
                    ],
                    DataList: [
                        { variable: '选择', flag: '', num: '', backColor: '#fff' },
                        //   { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000'}
                    ]
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            } else if (item.ControlType === 'dropsearch') { //下拉查询
                let data = {
                    ChoiceList: [],  // 存储下拉多选选中的值
                    dropList: [],
                    EchartList: [],//需要筛选的图表
                    HistoryList: [], // 图表历史数据
                    TextList: ['1', '1'],//需要筛选的字段
                    FilterConditions: '不为空',//过滤条件
                    FilterConditionNum: '',//过滤条件数值
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            }
            else if (item.ControlType === 'dynamictext') {// 动态文本数据
                let data = {
                    // TableTitleList:['序号','变量','条件','值','预设文本','预设颜色'],
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'flag', title: '条件' },
                        { ID: 'num', title: '值' },
                        { ID: 'presetText', title: '预设文本' },
                        { ID: 'backColor', title: '预设颜色' },

                    ],
                    DefaultText: '默认文本',
                    DefaultColor: '#000',
                    DataList: [
                        {
                            variable: '选择',
                            flag: '=',
                            num: '0',
                            presetText: '我是预设文本',
                            backColor: '#fff',

                        },
                        // {
                        //     variable:'Tag_1',
                        //     flag: '=',
                        //     num:'0',
                        //     presetText:'我是预设文本',
                        //     backColor:'#000000',

                        // }
                    ]
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            } else if (item.ControlType === 'ellipselamp') {// 圆形状态灯
                let data = {
                    // TableTitleList:['序号','变量','条件','值','预设文本','预设颜色'],
                    DefaultColor: '#000',
                    DefaultFlashing: true,//默认闪烁
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'flag', title: '条件' },
                        { ID: 'num', title: '值' },
                        { ID: 'backColor', title: '预设颜色' },
                        { ID: 'flashing', title: '' },
                    ],
                    DataList: [
                        { variable: '', flag: '=', num: '0', backColor: '#fff', flashing: false },
                        // { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000',flashing:false}
                    ]
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)

            } else if (item.ControlType === 'commonlamp') {//矩形状态灯
                let data = {
                    // TableTitleList:['序号','变量','条件','值','预设文本','预设颜色'],
                    DefaultColor: '#000',
                    DefaultFlashing: false,
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'flag', title: '条件' },
                        { ID: 'num', title: '值' },
                        { ID: 'backColor', title: '预设颜色' },
                        { ID: 'flashing', title: '' },
                    ],
                    DataList: [
                        // {variable:'Tag_1',flag: '=',num:'0',backColor:'#fff',flashing:false},
                        // { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000',flashing:false}
                    ]
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            } else if (item.ControlType === 'rwtextbox') {//读写框
                let data = {
                    CheckData: {
                        cusVariableType: "",
                        customerId: "",
                        customerName: "",
                        desc: "",
                        equipmentCode: "",
                        equipmentId: "",
                        equipmentName: "",
                        from: null,
                        id: "",
                        name: "",
                        type: "",
                        unit: "",
                        varType: null,
                    },
                    TriggerCondition: '1',//触发条件
                    // 表格查询数据
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    dblCheck: false,  // 历史曲线勾选
                    conCheck: false, // 颜色变化勾选
                    TableTitleList: [
                        { ID: 'id', title: '序号' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'flag', title: '条件' },
                        { ID: 'num', title: '值' },
                        { ID: 'backColor', title: '预设颜色' },
                    ],
                    DataList: [
                        { variable: '选择', flag: '', num: '', backColor: '#fff' },
                        // { variable:'Tag_1',flag: '=',num:'0',backColor:'#000000'}
                    ]
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            } else if (item.ControlType === 'textsearch') {//文本查询
                let data = {
                    EchartList: [],//需要筛选的图表
                    HistoryList: [], // 图表历史数据
                    TextList: ['1', '1'],//需要筛选的字段
                    FilterConditions: '不为空',//过滤条件
                    FilterConditionNum: '',//过滤条件数值
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            }
            else if (item.ControlType === 'datasearch') {//数值查询
                let data = {
                    EchartList: [],//需要筛选的图表
                    HistoryList: [], // 图表历史数据
                    TextList: ['1', '1'],//需要筛选的字段
                    FilterConditions: '不为空',//过滤条件
                    FilterConditionNum: '',//过滤条件数值
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            }
            else if (item.ControlType === 'dropsearch') {//下拉查询
                let data = {
                    ChoiceList: [],  // 存储下拉多选选中的值
                    dropList: [],
                    EchartList: [],//需要筛选的图表
                    HistoryList: [], // 图表历史数据
                    TextList: ['1', '1'],//需要筛选的字段
                    FilterConditions: '不为空',//过滤条件
                    FilterConditionNum: '',//过滤条件数值
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            }
            else if (item.ControlType === 'associatedatetimepicker') {//日期时间
                let data = {
                    DateTimeType: 'yyyy-MM-dd HH:mm',//时间格式
                    StartTime: formatDateTime(new Date()),
                    EndTime: formatDateTime(new Date()),
                    AsDatetimepickerType: '业务数据',
                    EchartList: [],//需要筛选的图表
                    HistoryList: [], // 图表历史数据
                    TextList: ['1', '1'],//需要筛选的字段
                    FilterConditions: '不为空',//过滤条件
                    FilterConditionNum: '',//过滤条件数值
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            }
            else if (item.ControlType === 'cornerbutton') {//控制按钮
                let data = {
                    type: 'radio',
                    IsOpen: true,//确认时是否弹出确认框
                    IsOpenText: '是否确认下发数据？',
                    ShowPermission: true,//是否有操作权限
                    OperationPermission: 'public',//操作权限
                    AccessPermission: 'public',//访问权限
                    PermissionMan: [],//可访问人员
                    PermissionDesc: '',//策略描述
                    operatData: {   // 操作权限数据
                        oDeparts: [],   //部门
                        oJobs: [],  // 职位
                        oPeoples: [],    // 人员
                        opetaPermissions: [], // 权限
                        currentNode: {}, // 选中的人员树
                        oStaffList: [],
                        cloneODeparts: [],  // 克隆保存部门内容
                        cloneOJobs: [], // 克隆保存职位内容
                        cloneOPeoples: [],  // 克隆保存人员内容
                    },
                    radioType: '0',
                    // 表格查询数据
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    ButtonTypeList: [
                        {
                            id: '0',
                            title: '下发固定值',
                            TableTitleList: [
                                { ID: 'id', title: '序号' },
                                { ID: 'variable', title: '变量' },
                                { ID: 'issuedValue', title: '下发值' },
                            ],
                            DataList: [
                                //     {variable:'Tag_1',issuedValue:'0'},
                                //    { variable:'Tag_1',issuedValue:'0'}
                            ],
                            addBtnTitle: '新增变量'
                        },
                        {
                            id: '1',
                            title: '关联控件',
                            TableTitleList: [
                                { ID: 'id', title: '序号' },
                                { ID: 'rwtextbox', title: '控件' }
                            ],
                            DataList: [
                                //     {rwtextbox:'读写框'},
                                //    { rwtextbox:'数值输入1'}
                            ],
                            addBtnTitle: '新增组件关联'
                        },
                        {
                            id: '2',
                            title: '弹窗设定参数',

                        }
                    ],
                    ButtonTypeThreeList: [
                        // {
                        //     ButtonTypeThreeTitle:'SOP信息',
                        //     addBtnTitle:'新增变量',
                        //     TableTitleList:[
                        //        {ID:'id', title:'序号' },
                        //        {ID:'title',title:'标题'},
                        //        {ID:'variable',title:'变量'},
                        //     ],
                        //     DataList: [
                        //         {title:'SOP标题',variable:'tag_1'},
                        //         { title:'SOP代码',variable:'tag_2'}
                        //     ],

                        // },
                        // {
                        //     ButtonTypeThreeTitle:'SOP信息2',
                        //     addBtnTitle:'新增变量',
                        //     TableTitleList:[
                        //        {ID:'id', title:'序号' },
                        //        {ID:'title',title:'标题'},
                        //        {ID:'variable',title:'变量'},
                        //     ],
                        //     DataList: [
                        //         {title:'SOP标题',variable:'tag_3'},
                        //         { title:'SOP代码',variable:'tag_4'}
                        //     ],

                        // }
                    ]

                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            } else if (item.ControlType === 'image') {//动态图片
                let data = {
                    DefaultImg: './imgs/defuleUpload.png',//默认图片
                    SearchData: {
                        origin: '6',
                        device: '',
                        variteName: '',
                        describe: '',
                    },
                    TableTitleList: [
                        { ID: 'img', title: '图片' },
                        { ID: 'variable', title: '变量' },
                        { ID: 'flag', title: '条件' },
                        { ID: 'presetText', title: '预设文本' },
                    ],
                    DataList: [
                        // {img:'../imgs/img1.jpg',variable:'Tag_1',flag: '=',presetText:'预设文本'},
                        // {img:'../imgs/img1.jpg',variable:'Tag_1',flag: '=',presetText:'预设文本'},
                    ]
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)
            } else if (item.ControlType === 'searchbutton') {
                let data = {
                    EchartList: [],//需要筛选的图表
                    HistoryList: [],//历史数据
                }
                Object.assign(Controls.ControlList[Controls.ControlList.length - 1], data)

            }


            item.Left = targetX - fatherX
            item.Top = targetY - fatherY
            localdata = {
                ControlList: [],
                Data: {
                    PieChartItemList: [],
                    DashBoardChartItemList: [],
                    BarChartItemList: [],
                    LineChartItemList: []
                }
            }
            rightCommon(item.title, item.ControlType + leg, Controls.ControlList.length - 1)
            // Controls.ControlList.length - 1 从源对象拖放到画布上的生成的元素永远是Controls.ControlList数组的最后一位
            let itemData = {
                ...item,
                ComName: item.ComName + leg     // 组件名称唯一
            }
            changeCommon(item, Controls.ControlList.length - 1)
            localdata.ControlList.push(JSON.parse(JSON.stringify(Controls.ControlList[Controls.ControlList.length - 1])))
            childElement(Controls.ControlList.length - 1)
            buttonid = ''
            //增加饼图数据
            if (item.ControlType == 'piechart') {
                let pieData = PieChartData(item.ControlType + leg)
                Controls.Data.PieChartItemList.push(pieData)
                localdata.Data.PieChartItemList.push(pieData)
                PieChartDataFun()  //饼图
            } else if (item.ControlType == 'dashboardchart') {
                let DashData = DashBoardChartData(item.ControlType + leg)
                Controls.Data.DashBoardChartItemList.push(DashData)
                localdata.Data.DashBoardChartItemList.push(DashData)
                DashChartDataFun()  //仪表盘
            } else if (item.ControlType == 'barchart') {
                let DashData = BarrChartData(item.ControlType + leg)
                Controls.Data.BarChartItemList.push(DashData)
                localdata.Data.BarChartItemList.push(DashData)
                BarChartDataFun()  //柱形图
            } else if (item.ControlType == 'linechart') {
                let DashData = LineChartData(item.ControlType + leg)
                Controls.Data.LineChartItemList.push(DashData)
                localdata.Data.LineChartItemList.push(DashData)
                LineChartDataFun()  //折线图
            }


            if (selectdata.length <= 1) {
                setClass(Controls.ControlList[index].PropertyList.ZIndex)
            } else {
                let tmp = []
                selectdata.forEach((item) => {
                    tmp.push(item.zindex)
                })
                setClass(tmp)
            }
            // buttonid = ''
            //初始化图表右侧数据
            // setTimeout(() => {
            echartsDataInit(item.ControlType, item.ControlType + leg)
            // }, 200)
        }
    })
    // dragovers事件
    canvasWrap.addEventListener('dragover', function (event) {

        // event.preventDefault()
        if (event.target.classList.contains('allowed')) {
            event.dataTransfer.dropEffect = 'move'
        } else {
            event.dataTransfer.dropEffect = 'copy'
        }
        event.preventDefault()
    }, false)

    // drop事件
    canvasWrap.addEventListener('drop', async function (event) {
        $("#saveBtnTips").show()
        // $(".details").show()
        if (window.location.host.indexOf('127.0.0') === -1) {
            // 测试 && 开发：sycdev.com
            // 正式： shengyc.com
            document.domain = 'sycdev.com' || '';
        }

        buttonid = ''
        // leg初始化之后没拖动一个元素下来就+1,此值会一直++, 防止元素名称重复
        leg++
        if (Controls.ControlList.length !== 0) {
            let zindexarr = []
            Controls.ControlList.forEach((item, index) => {
                zindexarr.push(item.PropertyList.ZIndex)
            })
            zindex = Math.max(...zindexarr) + 1
        } else {
            zindex = 0
        }
        // 父级元素id = canvasWrap的网页可见区域上、左的距离
        let fatherY = canvasWrap.offsetTop - $("#canvas-wrap").scrollTop()
        let fatherX = canvasWrap.offsetLeft - $("#canvas-wrap").scrollLeft()

        // 拖动元素距离网页可见区域上、左的距离
        let targetX = event.clientX
        let targetY = event.clientY
        // 获取dragstart事件传递的参数 注意：index为组件属性栏的下标
        var index = ''
        var item = {}
        let postData = {}
        if (event.dataTransfer.getData('data')) {
            $(".details").show()
            index = JSON.parse(event.dataTransfer.getData('data'))
            item = JSON.parse(JSON.stringify(btns[index]))
            if (event.dataTransfer.getData('subData')) {
                let currentIndex = JSON.parse(event.dataTransfer.getData('subData')).split('-')[0]
                let subIndex = JSON.parse(event.dataTransfer.getData('subData')).split('-')[1]
                $('#moreTool4').css('display', 'none')
                $('#moreTool5').css('display', 'none')
                if (currentIndex === '4') { // 矩形更多样式
                    item.Style = 'dashed'
                    item.BackSetting = 'img'
                    item.Width = '500'
                    item.Height = '430'
                    if (subIndex === '1') {
                        item.BackImg = './imgs/tools/框一@2x.png'
                    }
                    if (subIndex === '2') {
                        item.BackImg = './imgs/tools/框二@2x.png'
                    }
                    if (subIndex === '3') {
                        item.BackImg = './imgs/tools/框三@2x.png'
                    }
                    if (subIndex === '4') {
                        item.BackImg = './imgs/tools/框四@2x.png'
                    }
                    if (subIndex === '5') {
                        item.BackImg = './imgs/tools/框五@2x.png'
                    }
                    if (subIndex === '6') {
                        item.BackImg = './imgs/tools/框六@2x.png'
                    }
                } else if (currentIndex === '5') {  // 标题更多样式
                    item.Style = 'dashed'
                    item.BackSetting = 'img'
                    item.Width = '1630'
                    item.Height = '85'
                    if (subIndex === '1') {
                        item.BackImg = './imgs/tools/标题一@2x.png'
                    }
                    if (subIndex === '2') {
                        item.BackImg = './imgs/tools/标题二@2x.png'
                    }
                    if (subIndex === '3') {
                        item.BackImg = './imgs/tools/标题三@2x.png'
                    }
                    if (subIndex === '4') {
                        item.BackImg = './imgs/tools/标题四@2x.png'
                    }
                }
            }

            // 清除dragstart事件传递的参数
            event.dataTransfer.clearData()
            renderDropHtml(item, targetX, fatherX, targetY, fatherY)
        } else {
            // 此处为拖拽复用组件
            let componentName = JSON.parse(event.dataTransfer.getData('index')) // 拖拽组件的名称
            let postData = {
                appId,
                // panelId: currentReuseNode.id, // 需动态修改
            }
            if (currentReuseNode.nodeType === 'assembly') {
                let newNode = getpanelId(currentReuseNode)
                postData.panelId = newNode.id
            } else if (currentReuseNode.nodeType === 'panel') {
                postData.panelId = currentReuseNode.id
            }
            /*
            await request.get(`/bi/${appId}/panel-tree/cite-assembly`, { params: postData }).then(res => {
                if (res.data.code !== 0) {
                    appTips.errorMsg(res.data.msg)
                    return
                }
                let data = {}
                let obj = {}
                let resData = {}
                if (res.data.data.published === null) {
                    resData = res.data.data.wait_published
                } else {
                    resData = res.data.data.published
                }
                if (res.data.data.published && res.data.data.wait_published) {
                    // 如果两者都存在,取wait_published
                    resData = res.data.data.wait_published
                }
                if (resData === null) {
                    appTips.warningMsg('该看板下无可用组件,请重新选择');
                    // initCommon()
                    return
                }
                // JSON.parse(resData).ControlList.forEach(d => {
                //     data = d
                // })
                // if (JSON.parse(resData).Name == componentName) {
                if (currentReuseNode.nodeType === 'assembly') {
                    let times = 0
                    JSON.parse(resData).ControlList.forEach((d, i) => {
                        if (d.PropertyList.ComName === componentName) {
                            times++
                            if (i !== 0) {
                                leg++
                                zindex++
                            }
                            d.PropertyList.ZIndex = leg
                            data = d
                            // }
                            obj = {
                                ControlType: data.ControlType,
                                Name: data.Name,
                                TabEvent: 'style',
                                // index: d.index,
                                title: data.title,
                            }

                            if (data.PropertyList) {
                                data.PropertyList.ComName = data.PropertyList.ComName.replace(/\d+/g, '')
                                item = Object.assign(data.PropertyList, obj)
                            } else {
                                appTips.warningMsg('该看板下无该组件,请重新选择');
                                // initCommon()
                                return
                            }
                            let chartData = {}
                            if (d.Name.indexOf('linechart') !== -1) {
                                JSON.parse(resData).Data.LineChartItemList.forEach(lf => {
                                    if (lf.name === d.Name) {
                                        chartData = lf
                                    }
                                })
                            } else if (d.Name.indexOf('barchart') !== -1) {
                                JSON.parse(resData).Data.BarChartItemList.forEach(lf => {
                                    if (lf.name === d.Name) {
                                        chartData = lf
                                    }
                                })
                            } else if (d.Name.indexOf('dashboardchart') !== -1) {
                                JSON.parse(resData).Data.DashBoardChartItemList.forEach(lf => {
                                    if (lf.name === d.Name) {
                                        chartData = lf
                                    }
                                })
                            } else if (d.Name.indexOf('piechart') !== -1) {
                                JSON.parse(resData).Data.PieChartItemList.forEach(lf => {
                                    if (lf.name === d.Name) {
                                        chartData = lf
                                    }
                                })
                            }

                            // 清除dragstart事件传递的参数
                            event.dataTransfer.clearData()
                            renderDropHtml(item, targetX, fatherX, targetY, fatherY, 'reuse', data, chartData)
                        }
                    })
                    if (times === 0) {  // 判断有没有组件存在，没有添加提示
                        appTips.warningMsg('该看板下无组件,请重新选择');
                        return
                    }
                } else if (currentReuseNode.nodeType === 'panel') {
                    JSON.parse(resData).ControlList.forEach((d, i) => {
                        if (i !== 0) {
                            leg++
                            zindex++
                        }
                        d.PropertyList.ZIndex = leg
                        data = d
                        // }
                        obj = {
                            ControlType: data.ControlType,
                            Name: data.Name,
                            TabEvent: 'style',
                            // index: d.index,
                            title: data.title,
                        }

                        if (data.PropertyList) {
                            data.PropertyList.ComName = data.PropertyList.ComName.replace(/\d+/g, '')
                            item = Object.assign(data.PropertyList, obj)
                        } else {
                            appTips.warningMsg('该看板下无可用组件,请重新选择');
                            // initCommon()
                            return
                        }
                        let chartData = {}
                        if (d.Name.indexOf('linechart') !== -1) {
                            JSON.parse(resData).Data.LineChartItemList.forEach(lf => {
                                if (lf.name === d.Name) {
                                    chartData = lf
                                }
                            })
                        } else if (d.Name.indexOf('barchart') !== -1) {
                            JSON.parse(resData).Data.BarChartItemList.forEach(lf => {
                                if (lf.name === d.Name) {
                                    chartData = lf
                                }
                            })
                        } else if (d.Name.indexOf('dashboardchart') !== -1) {
                            JSON.parse(resData).Data.DashBoardChartItemList.forEach(lf => {
                                if (lf.name === d.Name) {
                                    chartData = lf
                                }
                            })
                        } else if (d.Name.indexOf('piechart') !== -1) {
                            JSON.parse(resData).Data.PieChartItemList.forEach(lf => {
                                if (lf.name === d.Name) {
                                    chartData = lf
                                }
                            })
                        }

                        // 清除dragstart事件传递的参数
                        event.dataTransfer.clearData()
                        renderDropHtml(item, targetX, fatherX, targetY, fatherY, 'reuse', data, chartData, 'all')
                    })
                }
            })
            */
        }

    }, false)
    let cloneData = JSON.stringify(Controls)
    cloneControls = JSON.parse(cloneData)
    // localStorage.setItem('cloneControls',JSON.stringify(Controls))
    // cloneControls = Controls
    $('.details').hide()

}
// 渲染右侧树组件
// initReuseTree()

function getpanelId(node) {

    let current = node.getParentNode()
    let newNode = null
    if (current.nodeType === 'panel') {
        newNode = current
    } else {
        getpanelId(current)
    }
    return newNode
}



    // setTimeout(() => {
    //     wm = new watcher({
    //     data:{
    //         Controls:window.Controls,
    //         a:'1'
    //     },
    //     deep: true,
    //     watch:{
    //         Controls(newVal,oldVal){
    //             console.log(selectdata)
    //             console.log(newVal, oldVal); // 111 0
    //         },
    //         a(newVal,oldVal){
    //             console.log(selectdata)
    //             console.log(newVal, oldVal); // 111 0
    //         },
    //     }
    // })
    // // wm.Controls = Controls.ControlList
    // // console.log(wm.Controls)
    // console.log(Controls) 
    // }, 3000);

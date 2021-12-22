/*
 * @Description: 这是图表 表格选择（组件）
 * @Date: 2021-03-10 14:52:54
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-02 14:25:57
 */
//折线图改变
function LineEchartsFun2(BarChartData) {
    let data = []
    data.push(BarChartData)
    parent.LinechartEcharts(data, BarChartData.name)
}
//柱形图改变
function BarEchartsFun2(BarChartData) {
    let data = []
    data.push(BarChartData)
    parent.BarchartEcharts(data, BarChartData.name)
}
//仪表盘
function DashEchartsFun2(BarChartData) {
    let data = []
    data.push(BarChartData)
    parent.DashchartEcharts(data, BarChartData.name)
}
//饼图
function PieEchartsFun2(BarChartData) {
    let data = []
    data.push(BarChartData)
    parent.PiechartEcharts(data, BarChartData.name)
}
let chartVal = []
//变量配置
function varEchartsFun(data, type, refresh) {
    /* 
        refresh: 是否调用图表业务数据 数据表接口，选中时无需调用，松开后调用一次即可
    */
    BarChartData = data
    let defaultVar
    //默认数据
    var defaultXData = ["设计缺陷", "操作失误", "部件品质"]
    var defaultVarArr = [{
            "CurrentAxis": {
                "AxisType": "Y",
                "Value": 0
            },
            "Smooth": false,
            "DataType": "Line",
            "Show": true,
            "Unit": null,
            "Color": {
                "HtmlColor": "#ffa3a3ff"
            },
            "VariableName": "选择",
            "FieldName": '配置字段',
            "DimensionName": "设计缺陷",
            "moreAxis": 'y轴1',
            "moreAxisArr": ['y轴1']
        },
        {
            "CurrentAxis": {
                "AxisType": "Y",
                "Value": 0
            },
            "Smooth": false,
            "DataType": "Line",
            "Show": true,
            "Unit": null,
            "Color": {
                "HtmlColor": "#ffe08cff"
            },
            "VariableName": "选择",
            "FieldName": '配置字段',
            "DimensionName": "操作失误",
            "moreAxis": 'y轴1',
            "moreAxisArr": ['y轴1']
        },
        {
            "CurrentAxis": {
                "AxisType": "Y",
                "Value": 0
            },
            "Smooth": false,
            "DataType": "Line",
            "Show": true,
            "Unit": null,
            "Color": {
                "HtmlColor": "#55baf9ff"
            },
            "VariableName": "选择",
            "FieldName": '配置字段',
            "DimensionName": "部件品质",
            "moreAxis": 'y轴1',
            "moreAxisArr": ['y轴1']
        }
    ]
    var defaultYData = [{
        "name": "设计缺陷",
        "YData": [
            "599",
            "520",
            "181"
        ]
    }, {
        "name": "操作失误",
        "YData": [
            "597",
            "357",
            "111"
        ]
    }, {
        "name": "部件品质",
        "YData": [
            "292",
            "514",
            "489"
        ]
    }]
    var DashdefaultVar = [{ //仪表盘默认数据
        "NO": 1,
        "wdName": '完成率',
        "selsectVar": '选择',
        "VariableName": "选择",
        "describe": '完成率',
        "DashDecimal": 0,
        "unit": '%',
        "color": ''
    }]
    initTableData()
    let defaultVarData = cloneDate()

    //初始图表json数据
    function initTableData() {
        $('#chart-table').empty()
        if (type === 'dash' || type === 'pie') {
            if ($('#data-relate')[0] !== undefined) {
                let relate = data.defaultDataConfig.datatype ? data.defaultDataConfig.datatype : $('#data-relate').children().val()
                $('#data-relate').find("option[value=" + relate + "]").attr("selected", true);
                form.render()
            }
            if (type === 'pie' && data.defaultDataConfig.datatype == '业务数据') {
                $("#pieAddTable").hide()
            }

        }
        if (BarChartData.defaultDataConfig.datatype === '业务数据') {
            if (refresh && (BarChartData.name.indexOf('linechart') !== -1 || BarChartData.name.indexOf('barchart') !== -1 )) {
                getBussinessDrop()
            }
        }
        if (type != 'dash') {
            defaultVar = []
            for (let i = 0; i < BarChartData.option.Variables.length; i++) {
                let value
                if (type == 'bar') {
                    value = {
                        "NO": i + 1,
                        "lableName": BarChartData.option.Variables[i].DimensionName,
                        "selsectVar": BarChartData.option.Variables[i].VariableName,
                        "VariableName": BarChartData.option.Variables[i].VariableName ? BarChartData.option.Variables[i].VariableName : '选择',
                        "FieldName": BarChartData.option.Variables[i].FieldName ? BarChartData.option.Variables[i].FieldName : '配置字段',
                        "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                        "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                        "color": BarChartData.option.Variables[i].Color.HtmlColor,
                        "chartName": BarChartData.name
                    }
                    if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                        $('#data-sheet').css('display', 'block')
                        $('#axial').css('display', 'none')
                        $('#ax-table').css('display', 'block')
                        let lis = ``
                        request.get(`/bi/${parent.appId}/business`).then(res => {
                            if (res.data.data) {
                                res.data.data.forEach((item, itemIndex) => {
                                    if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
                                        lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" selected >${item.nameCn}</option>`
                                        BarChartData.defaultDataConfig.tablename = res.data.data[itemIndex].nameCn ? res.data.data[itemIndex].nameCn : res.data.data[0].nameCn
                                    } else {
                                        lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" >${item.nameCn}</option>`
                                    }
                                })

                                $('#chart-table').html(lis)
                                form.render('select', 'form-data')
                            }

                        })
                        value = {
                            "NO": i + 1,
                            "lableName": BarChartData.option.Variables[i].DimensionName,
                            "selsectVar": BarChartData.option.Variables[i].VariableName,
                            "FieldName": BarChartData.option.Variables[i].FieldName ? BarChartData.option.Variables[i].FieldName : '配置字段',
                            "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                            "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                            "moreAxis": BarChartData.option.Variables[i].moreAxis == undefined ? 'y轴1' : BarChartData.option.Variables[i].moreAxis == undefined,
                            "moreAxisArr": BarChartData.option.Variables[i].moreAxisArr,
                            "rangevalue": BarChartData.option.Variables[i].rangevalue ? BarChartData.option.Variables[i].rangevalue : '',
                            "valueAxisArr": BarChartData.option.Variables[i].valueAxisArr.length === 0 ? [{
                                name: '请选择字段',
                                value: ''
                            }] : BarChartData.option.Variables[i].valueAxisArr,
                            "color": BarChartData.option.Variables[i].Color.HtmlColor,
                            "chartName": BarChartData.name
                        }
                    } else {
                        $('#data-sheet').css('display', 'none')
                        $('#axial').css('display', 'block')
                        $('#ax-table').css('display', 'none')
                        value = { //折线图默认数据
                            "NO": i + 1,
                            "lableName": BarChartData.option.Variables[i].DimensionName,
                            "selsectVar": BarChartData.option.Variables[i].VariableName,
                            "VariableName": BarChartData.option.Variables[i].VariableName ? BarChartData.option.Variables[i].VariableName : '选择',
                            "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                            "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                            "moreAxis": BarChartData.option.Variables[i].moreAxis == undefined ? 'y轴1' : BarChartData.option.Variables[i].moreAxis == undefined,
                            "moreAxisArr": BarChartData.option.Variables[i].moreAxisArr,
                            "color": BarChartData.option.Variables[i].Color.HtmlColor,
                            "chartName": BarChartData.name
                        }
                    }
                } else if (type === 'pie') { //饼图
                    if (BarChartData.defaultDataConfig.datatype === '实时数据') { // 饼图实时
                        $('#realTime').css('display', 'none')
                        $('#data-sheet').css('display', 'none')
                        value = {
                            "NO": i + 1,
                            "lableName": BarChartData.option.Variables[i].DimensionName,
                            "selsectVar": BarChartData.option.Variables[i].VariableName,
                            "VariableName": BarChartData.option.Variables[i].VariableName ? BarChartData.option.Variables[i].VariableName : '选择',
                            "FieldName": BarChartData.option.Variables[i].FieldName ? BarChartData.option.Variables[i].FieldName : '配置字段',
                            "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                            "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                            "color": BarChartData.option.Variables[i].Color.HtmlColor,
                            "chartName": BarChartData.name
                        }
                    } else if (BarChartData.defaultDataConfig.datatype === '历史数据' || BarChartData.defaultDataConfig.datatype === '业务数据') {
                        value = {
                            "NO": i + 1,
                            "lableName": BarChartData.option.Variables[i].DimensionName,
                            "selsectVar": BarChartData.option.Variables[i].VariableName,
                            "VariableName": BarChartData.option.Variables[i].VariableName ? BarChartData.option.Variables[i].VariableName : '选择',
                            "FieldName": BarChartData.option.Variables[i].FieldName ? BarChartData.option.Variables[i].FieldName : '配置字段',
                            "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                            "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                            "color": BarChartData.option.Variables[i].Color.HtmlColor,
                            "chartName": BarChartData.name,
                            // "rangevalue": BarChartData.option.Variables[i].rangevalue ? BarChartData.option.Variables[i].rangevalue : '',
                            // "valueAxisArr": BarChartData.option.Variables[i].valueAxisArr.length === 0 ? [{name: '请选择字段', value: ''}]: BarChartData.option.Variables[i].valueAxisArr,
                        }
                        if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                            $('#realTime').css('display', 'none')
                            $('#data-sheet').css('display', 'block')
                            let lis = ``
                            request.get(`/bi/${parent.appId}/business`).then(res => {
                                if (res.data.data) {
                                    BarChartData.defaultDataConfig.dataChart = res.data.data
                                    res.data.data.forEach((item, itemIndex) => {
                                        if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
                                            lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" selected >${item.nameCn}</option>`
                                            BarChartData.defaultDataConfig.tablename = res.data.data[itemIndex].nameCn
                                            BarChartData.defaultDataConfig.tablevalue = item.nameEn
                                        } else {
                                            lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" >${item.nameCn}</option>`
                                        }
                                    })
                                    $('#chart-table').html(lis)
                                    // $('#chart-table').val(res.data.data[0].nameCn)
                                    form.render('select', 'form-data')

                                }

                            })
                            value = {
                                "NO": i + 1,
                                "lableName": BarChartData.option.Variables[i].DimensionName,
                                "selsectVar": BarChartData.option.Variables[i].VariableName,
                                "FieldName": BarChartData.option.Variables[i].FieldName ? BarChartData.option.Variables[i].FieldName : '配置字段',
                                "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                                "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                                "color": BarChartData.option.Variables[i].Color.HtmlColor,
                                "chartName": BarChartData.name,
                                "rangevalue": BarChartData.option.Variables[i].rangevalue ? BarChartData.option.Variables[i].rangevalue : '',
                                "valueAxisArr": BarChartData.option.Variables[i].valueAxisArr.length === 0 ? [{
                                    name: '请选择字段',
                                    value: ''
                                }] : BarChartData.option.Variables[i].valueAxisArr,
                            }
                        } else {
                            $('#realTime').css('display', 'block')
                            $('#data-sheet').css('display', 'none')
                        }
                        let opts = ``
                        VariableList.forEach(item => {
                            opts += `<option value="${item.value}" ${BarChartData.defaultDataConfig.datavariable === item.value ? 'selected' : ''} >${item.name}</option>`
                        })
                        $('#pie-data-time').html(opts)
                        form.render()
                    }
                    // $('#varTitle').html(`纵轴(${BarChartData.option.Variables.length}/10)`)

                } else if (type == 'line') { //折线图
                    if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                        $('#data-sheet').css('display', 'block')
                        $('#axial').css('display', 'none')
                        $('#ax-table').css('display', 'block')
                        let relate = data.defaultDataConfig.datatype ? data.defaultDataConfig.datatype : $('#data-relate').children().val()
                        $('#data-relate').find("option[value=" + relate + "]").attr("selected", true);
                        $('#data-relate').find("option[value=" + relate + "]").siblings().attr("selected", false);
                        form.render()

                        let lis = ``
                        request.get(`/bi/${parent.appId}/business`).then(res => {
                            if (res.data.data) {
                                res.data.data.forEach((item, itemIndex) => {
                                    if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
                                        lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" selected >${item.nameCn}</option>`
                                        BarChartData.defaultDataConfig.tablename = res.data.data[itemIndex].nameCn
                                    } else {
                                        lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" >${item.nameCn}</option>`
                                    }
                                })
                                $('#chart-table').html(lis)
                                form.render('select', 'form-data')

                            }

                        })
                        value = {
                            "NO": i + 1,
                            "lableName": BarChartData.option.Variables[i].DimensionName,
                            "selsectVar": BarChartData.option.Variables[i].VariableName,
                            "FieldName": BarChartData.option.Variables[i].FieldName ? BarChartData.option.Variables[i].FieldName : '配置字段',
                            "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                            "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                            "moreAxis": BarChartData.option.Variables[i].moreAxis == undefined ? 'y轴1' : BarChartData.option.Variables[i].moreAxis == undefined,
                            "moreAxisArr": BarChartData.option.Variables[i].moreAxisArr,
                            "rangevalue": BarChartData.option.Variables[i].rangevalue ? BarChartData.option.Variables[i].rangevalue : '',
                            "valueAxisArr": BarChartData.option.Variables[i].valueAxisArr.length === 0 ? [{
                                name: '请选择字段',
                                value: ''
                            }] : BarChartData.option.Variables[i].valueAxisArr,
                            "color": BarChartData.option.Variables[i].Color.HtmlColor,
                            "chartName": BarChartData.name
                        }
                    } else {
                        $('#data-sheet').css('display', 'none')
                        $('#axial').css('display', 'block')
                        $('#ax-table').css('display', 'none')
                        // let relate = data.defaultDataConfig.datatype ? data.defaultDataConfig.datatype : $('#data-relate').children().val()
                        // $('#data-relate').find("option[value="+relate+"]").attr("selected",true);
                        // $('#data-relate').find("option[value="+relate+"]").siblings().attr("selected",true);
                        // form.render()
                        value = { //折线图默认数据
                            "NO": i + 1,
                            "lableName": BarChartData.option.Variables[i].DimensionName,
                            "selsectVar": BarChartData.option.Variables[i].VariableName,
                            "VariableName": BarChartData.option.Variables[i].VariableName ? BarChartData.option.Variables[i].VariableName : '选择',
                            "describe": BarChartData.option.Variables[i].describe == undefined ? '湿度' : BarChartData.option.Variables[i].describe,
                            "decimal": BarChartData.option.Variables[i].d == undefined ? 0 : BarChartData.option.Variables[i].d,
                            "moreAxis": BarChartData.option.Variables[i].moreAxis == undefined ? 'y轴1' : BarChartData.option.Variables[i].moreAxis == undefined,
                            "moreAxisArr": BarChartData.option.Variables[i].moreAxisArr,
                            "color": BarChartData.option.Variables[i].Color.HtmlColor,
                            "chartName": BarChartData.name
                        }
                    }
                }
                defaultVar.push(value)
            }
            if (type === 'pie') {
                if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                    $('#varTitle').html(`维度`)

                } else {
                    $('#varTitle').html(`维度(${BarChartData.option.Variables.length}/10)`)

                }


            } else {
                $('#varTitle').html(`纵轴/度量(${BarChartData.option.Variables.length}/10)`)

            }

        } else { // 仪表盘
            DashdefaultVar = []
            if ($('#data-relate')[0]) {
                let value = {}
                if ($('#data-relate').val() === '实时数据') {
                    $('#data-sheet').css('display', 'none')
                    value = { //仪表盘默认数据 实时
                        "NO": 1,
                        "wdName": BarChartData.option.Variable.DimensionName == undefined ? '湿度' : BarChartData.option.Variable.DimensionName,
                        "selsectVar": BarChartData.option.Variable.VariableName ? BarChartData.option.Variable.VariableName : '选择',
                        "VariableName": BarChartData.option.Variable.VariableName ? BarChartData.option.Variable.VariableName : '选择',
                        "describe": BarChartData.option.Variable.describe == undefined ? '湿度' : BarChartData.option.Variable.describe,
                        "DashDecimal": BarChartData.option.Variable.ValueDigit == undefined ? 0 : BarChartData.option.Variable.ValueDigit,
                        "unit": BarChartData.option.Variable.Unit == undefined ? '%' : BarChartData.option.Variable.Unit,
                        "color": BarChartData.option.Variable.Color.HtmlColor,
                        "chartName": BarChartData.name
                    }
                } else if ($('#data-relate').val() === '历史数据' || $('#data-relate').val() === '业务数据') {
                    if ($('#data-relate').val() === '业务数据') {
                        $('#data-sheet').css('display', 'block')
                        let lis = ``
                        request.get(`/bi/${parent.appId}/business`).then(res => {
                            if (res.data.data) {
                                BarChartData.defaultDataConfig.dataChart = res.data.data
                                res.data.data.forEach((item, itemIndex) => {
                                    if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
                                        lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" selected >${item.nameCn}</option>`
                                        BarChartData.defaultDataConfig.tablename = res.data.data[itemIndex].nameCn
                                        BarChartData.defaultDataConfig.tablevalue = item.nameEn
                                    } else {
                                        lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" >${item.nameCn}</option>`
                                    }
                                })
                                $('#chart-table').html(lis)
                                form.render('select', 'form-data')
                            }

                        })
                        value = { //仪表盘默认数据  业务
                            "NO": 1,
                            "wdName": BarChartData.option.Variable.DimensionName == undefined ? '湿度' : BarChartData.option.Variable.DimensionName,
                            "selsectVar": BarChartData.option.Variable.VariableName ? BarChartData.option.Variable.VariableName : '选择',
                            "FieldName": BarChartData.option.Variable.FieldName ? BarChartData.option.Variable.FieldName : '选择',
                            "describe": BarChartData.option.Variable.describe == undefined ? '湿度' : BarChartData.option.Variable.describe,
                            "DashDecimal": BarChartData.option.Variable.ValueDigit == undefined ? 0 : BarChartData.option.Variable.ValueDigit,
                            "unit": BarChartData.option.Variable.Unit == undefined ? '%' : BarChartData.option.Variable.Unit,
                            "color": BarChartData.option.Variable.Color.HtmlColor,
                            "chartName": BarChartData.name,
                            "rangevalue": BarChartData.option.Variable.rangevalue ? BarChartData.option.Variable.rangevalue : '',
                            "valueAxisArr": BarChartData.option.Variable.valueAxisArr.length === 0 ? [{
                                name: '请选择字段',
                                value: ''
                            }] : BarChartData.option.Variable.valueAxisArr,
                        }
                    } else {
                        $('#data-sheet').css('display', 'none')
                        value = { //仪表盘默认数据 历史
                            "NO": 1,
                            "wdName": BarChartData.option.Variable.DimensionName == undefined ? '湿度' : BarChartData.option.Variable.DimensionName,
                            "selsectVar": BarChartData.option.Variable.VariableName ? BarChartData.option.Variable.VariableName : '选择',
                            "VariableName": BarChartData.option.Variable.VariableName ? BarChartData.option.Variable.VariableName : '选择',
                            "describe": BarChartData.option.Variable.describe == undefined ? '湿度' : BarChartData.option.Variable.describe,
                            "DashDecimal": BarChartData.option.Variable.ValueDigit == undefined ? 0 : BarChartData.option.Variable.ValueDigit,
                            "unit": BarChartData.option.Variable.Unit == undefined ? '%' : BarChartData.option.Variable.Unit,
                            "color": BarChartData.option.Variable.Color.HtmlColor,
                            "chartName": BarChartData.name,
                            "rangevalue": BarChartData.option.Variable.rangevalue ? BarChartData.option.Variable.rangevalue : '',
                            "valueAxisArr": BarChartData.option.Variable.valueAxisArr.length === 0 ? [{
                                name: '请选择字段',
                                value: ''
                            }] : BarChartData.option.Variable.valueAxisArr,
                        }
                    }

                }
                DashdefaultVar.push(value)
            }
        }
    }
    var colsData //layui 表头数据
    var chartData = [
        [ //表头
            // {field: 'NO', title: '序号', size:12,color:'red'},
            {
                field: 'FieldName',
                title: '选择字段',
                event: 'tableField',
                style: 'cursor: pointer;'
            }, //templet: '#titleTpl'
            // {field: 'rangevalue', title: '取值', width: numText,templet:'#valueAxis'},
            // {
            //     field: 'moreAxis',
            //     title: '取值',
            //     templet: '#valueAxis'
            // },
            {
                field: 'describe',
                title: '描述',
                edit: 'text'
            },
        ]
    ]
    if (echartsType == 'line' || echartsType == 'pie' || echartsType == 'bar' || echartsType == 'lineBar') {
        let numText
        if (echartsType == 'line') {
            numText = 60
        } else {
            numText = 70
        }
        colsData = [
            [ //表头
                {
                    field: 'NO',
                    title: '序号',
                    width: numText,
                    size: 12,
                    color: 'red'
                },
                {
                    field: 'VariableName',
                    title: '变量',
                    width: numText,
                    event: 'tableCell',
                    style: 'cursor: pointer;'
                }, //templet: '#titleTpl'
                {
                    field: 'lableName',
                    title: '名称',
                    edit: 'text',
                    width: numText,
                    templet: '#lableName'
                },
                {
                    field: 'describe',
                    title: '描述',
                    width: numText,
                    edit: 'text'
                },
                {
                    field: 'decimal',
                    title: '小数',
                    width: numText,
                    edit: 'text'
                },
                {
                    field: 'color',
                    title: '颜色',
                    templet: '#titleColor'
                }
            ]
        ]
        if (echartsType == 'line') {
            if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            width: numText,
                            size: 12,
                            color: 'red'
                        },
                        {
                            field: 'FieldName',
                            title: '字段',
                            width: numText,
                            event: 'tableField',
                            style: 'cursor: pointer;'
                        }, //templet: '#titleTpl'
                        {
                            field: 'lableName',
                            title: '名称',
                            edit: 'text',
                            width: numText,
                            templet: '#lableName'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            width: numText,
                            edit: 'text'
                        },
                        {
                            field: 'rangevalue',
                            title: '取值',
                            width: numText,
                            event: 'rangevalue',
                            templet: '#valueAxis'
                        },
                        // {field: 'decimal', title: '小数',width: numText,edit:'text'},
                        {
                            field: 'color',
                            title: '颜色',
                            templet: '#titleColor',
                            width: 90,
                        },
                    ]
                ]
            }
            // let seleteAxis = {field: 'moreAxis', title: '取值', Width: 55,templet:'#selectAxis'}
            let seleteAxis = {
                field: 'moreAxis',
                title: '对比轴',
                width: numText,
                templet: '#selectAxis'
            }
            colsData[0].splice(4, 0, seleteAxis)
        }
        if (echartsType == 'bar') {
            if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                numText = 60
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            width: numText,
                            size: 12,
                            color: 'red'
                        },
                        {
                            field: 'FieldName',
                            title: '字段',
                            width: numText,
                            event: 'tableField',
                            style: 'cursor: pointer;'
                        }, //templet: '#titleTpl'
                        {
                            field: 'lableName',
                            title: '名称',
                            edit: 'text',
                            width: numText,
                            templet: '#lableName'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            width: numText,
                            edit: 'text'
                        },
                        // {field: 'decimal', title: '小数',width: numText,edit:'text'},
                        {
                            field: 'rangevalue',
                            title: '取值',
                            width: numText,
                            templet: '#valueAxis'
                        },
                        {
                            field: 'color',
                            title: '颜色',
                            templet: '#titleColor',
                            width: 90,
                           
                        },
                    ]
                ]
                let seleteAxis = {
                    field: 'moreAxis',
                    title: '对比轴',
                    width: numText,
                    templet: '#selectAxis'
                }
                colsData[0].splice(4, 0, seleteAxis)
            }
        }
        if (echartsType == 'pie') {
            if (BarChartData.defaultDataConfig.datatype === '历史数据') {
                $('#ax-table').css('display', 'none')
                $('#ax-variable').css('display', 'block')
                // numText = 60
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            width: numText,
                            size: 12,
                            color: 'red'
                        },
                        {
                            field: 'VariableName',
                            title: '变量',
                            width: numText,
                            event: 'tableCell',
                            style: 'cursor: pointer;'
                        }, //templet: '#titleTpl'
                        {
                            field: 'lableName',
                            title: '名称',
                            edit: 'text',
                            width: numText,
                            templet: '#lableName'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            width: numText,
                            edit: 'text'
                        },
                        {
                            field: 'decimal',
                            title: '小数',
                            width: numText,
                            edit: 'text'
                        },
                        // {field: 'rangevalue', title: '取值', width: 70, event: 'rangevalue', templet:'#valueAxis'},
                        {
                            field: 'color',
                            title: '颜色',
                            templet: '#titleColor'
                        }
                    ]
                ]
            } else if (BarChartData.defaultDataConfig.datatype === '业务数据') {
                $('#ax-table').css('display', 'block')
                $('#ax-variable').css('display', 'none')
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            size: 12,
                            color: 'red'
                        },
                        {
                            field: 'FieldName',
                            title: '字段',
                            event: 'tableField',
                            style: 'cursor: pointer;'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            edit: 'text'
                        },
                        // {field: 'lableName', title: '名称',edit:'text',templet: '#lableName'},
                        // {field: 'decimal', title: '小数',width: numText,edit:'text'},
                        {
                            field: 'rangevalue',
                            title: '取值',
                            width: 70,
                            event: 'rangevalue',
                            templet: '#valueAxis'
                        },
                        {
                            field: 'color',
                            title: '颜色',
                            templet: '#titleColor'
                        }
                    ]
                ]
            }
        }

    } else if (echartsType == 'dashboard') {
        defaultVar = DashdefaultVar

        if ($('#data-relate')[0]) {
            if ($('#data-relate').val() === '实时数据') {
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            Width: 55
                        },
                        {
                            field: 'VariableName',
                            title: '变量',
                            Width: 55,
                            event: 'tableCell',
                            style: 'cursor: pointer;'
                        }, //templet: '#titleTpl'
                        {
                            field: 'wdName',
                            title: '名称',
                            Width: 55,
                            edit: 'text',
                            templet: '#lableName'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            Width: 55,
                            edit: 'text'
                        },
                        {
                            field: 'DashDecimal',
                            title: '小数',
                            Width: 55,
                            edit: 'text'
                        },
                        {
                            field: 'unit',
                            title: '单位',
                            Width: 55,
                            edit: 'text'
                        },
                    ]
                ]
            } else if ($('#data-relate').val() === '历史数据') {
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            Width: 40
                        },
                        {
                            field: 'VariableName',
                            title: '变量',
                            Width: 55,
                            event: 'tableCell',
                            style: 'cursor: pointer;'
                        }, //templet: '#titleTpl'
                        {
                            field: 'wdName',
                            title: '名称',
                            Width: 55,
                            edit: 'text',
                            templet: '#lableName'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            Width: 55,
                            edit: 'text'
                        },
                        {
                            field: 'DashDecimal',
                            title: '小数',
                            Width: 40,
                            edit: 'text'
                        },
                        {
                            field: 'rangevalue',
                            title: '取值',
                            width: 60,
                            templet: '#valueAxis'
                        },
                        {
                            field: 'unit',
                            title: '单位',
                            Width: 55,
                            edit: 'text'
                        },

                    ]
                ]
            } else if ($('#data-relate').val() === '业务数据') { //业务数据
                colsData = [
                    [ //表头
                        {
                            field: 'NO',
                            title: '序号',
                            Width: 40
                        },
                        {
                            field: 'FieldName',
                            title: '字段',
                            width: 55,
                            event: 'tableField',
                            style: 'cursor: pointer;'
                        },
                        {
                            field: 'wdName',
                            title: '名称',
                            Width: 55,
                            edit: 'text',
                            templet: '#lableName'
                        },
                        {
                            field: 'describe',
                            title: '描述',
                            Width: 55,
                            edit: 'text'
                        },
                        {
                            field: 'DashDecimal',
                            title: '小数',
                            Width: 40,
                            edit: 'text'
                        },
                        {
                            field: 'rangevalue',
                            title: '取值',
                            width: 60,
                            templet: '#valueAxis'
                        },
                        {
                            field: 'unit',
                            title: '单位',
                            Width: 55,
                            edit: 'text'
                        },
                    ]
                ]
            }
        }
    }

    //克隆图表数据
    function cloneDate() { //删除表格数据为空时，默认展示初始数据
        if (echartsType != 'dashboard') {
            for (let i = 0; i < defaultYData.length; i++) {
                if (echartsType == 'bar') {
                    defaultYData[i].DataType = 'Bar'
                    defaultVarArr[i].DataType = 'Bar'
                } else if (echartsType == 'line') {
                    defaultYData[i].DataType = 'Line'
                    defaultVarArr[i].DataType = 'Line'
                }
            }
            let YDataCollection = defaultYData
            let Variables = defaultVarArr
            let XData = defaultXData
            let value = {
                "YDataCollection": YDataCollection,
                "Variables": Variables,
                "XData": XData
            }
            let pieDataArr = JSON.parse(JSON.stringify(defaultVar))
            value.data = pieDataArr
            return value
        }
    }
    //初始化颜色
    var defaultColor = BarChartData.option.color

    //渲染表格
    tableFun()

    function tableFun() {
        table = layui.table //表格
        table.render({
            elem: '#demo',
            /* height: 152, */
            data: defaultVar, //数据接口

            cols: colsData,
            done: function (res, curr, count) {
                defaultVar = res.data
                colorpickerFun(res.data, defaultVar)
            }
        });
    }
    // 渲染第二个表格
    if (BarChartData.name.indexOf('linechart') !== -1 || BarChartData.name.indexOf('barchart') !== -1 || BarChartData.name.indexOf('piechart') !== -1) {
        // 折线图 、柱状图、饼图 渲染第二个表格
        chartTableFun()
    }

    function chartTableFun() {
        let valueList = [{
            NO: BarChartData.fieldData ? BarChartData.fieldData.NO : 0,
            type: BarChartData.fieldData ? BarChartData.fieldData.type : 'axis',
            VariableName: BarChartData.fieldData ? BarChartData.fieldData.VariableName : '选择',
            FieldName: BarChartData.fieldData ? BarChartData.fieldData.FieldName : '配置字段',
            describe: BarChartData.fieldData ? BarChartData.fieldData.describe : '湿度',
            lableName: BarChartData.fieldData ? BarChartData.fieldData.lableName : '湿度',
            selsectVar: BarChartData.fieldData ? BarChartData.fieldData.selsectVar : '选择',
            rangevalue: BarChartData.fieldData.rangevalue ? BarChartData.fieldData.rangevalue : '',
            valueAxisArr: BarChartData.fieldData.valueAxisArr.length === 0 ? [{
                name: '请选择字段',
                value: ''
            }] : BarChartData.fieldData.valueAxisArr
        }]
        if (BarChartData.name.indexOf('piechart') !== -1 && BarChartData.defaultDataConfig.datatype === '业务数据') {
            $('#realTime').css('display', 'block')
            $('#ax-table').css('display', 'block')
            $('#ax-variable').css('display', 'none')
            chartData = [
                [ //表头
                    // {field: 'NO', title: '序号', size:12,color:'red'},
                    {
                        field: 'FieldName',
                        title: '选择字段',
                        event: 'tableField',
                        style: 'cursor: pointer;'
                    }, //templet: '#titleTpl'
                    // {field: 'rangevalue', title: '取值', width: numText,templet:'#valueAxis'},
                    // {field: 'moreAxis', title: '取值', templet:'#valueAxis'},
                    {
                        field: 'lableName',
                        title: '名称',
                        edit: 'text',
                        templet: '#lableName'
                    },
                    {
                        field: 'describe',
                        title: '描述',
                        edit: 'text'
                    },
                ]
            ]
        }
        table = layui.table //表格
        table.render({
            elem: '#table-demo',
            height: 90,
            data: valueList, //数据接口
            cols: chartData,
            done: function (res, curr, count) {
                chartData = res.data
                // colorpickerFun(res.data,defaultVar)
            }
        });
    }
    //修改默认数据 defaultVar数组
    function changeData(data, echartsType, val) {
        for (let i = 0; i < defaultVar.length; i++) {
            if (defaultVar[i].NO == data.NO) {
                defaultVar[i] = data
                if (echartsType == 'line') {
                    val = Number(val) + 1
                    defaultVar[i].moreAxis = `Y轴${val}`
                    BarChartData.option.Variables[i].moreAxis = `Y轴${val}`
                }
            }
        }
    }
    //修改表格 图例名称 变量配置 维度名称
    function VariablesFun(data, value, field, text) {
        let VariablesArr = BarChartData.option.Variables
        let VariableArr = BarChartData.option.Variable
        let YDataCollectionArr = BarChartData.option.YDataCollection
        let XDataArr = BarChartData.option.XData
        if (field == 'lableName') {
            VariablesArr[(data.NO - 1)].DimensionName = value
            YDataCollectionArr[(data.NO - 1)].name = value
            if (echartsType == 'pie') {
                XDataArr[(data.NO - 1)] = value
            }
        } else if (field == 'selsectVar') {
            if (echartsType == 'dashboard') {
                BarChartData.option.VariableName.Color = value
                if (type == 'line') {
                    LineEchartsFun2(BarChartData)
                } else if (type == 'bar') {
                    BarEchartsFun2(BarChartData)
                } else if (type == 'dash') {
                    DashEchartsFun2(BarChartData)
                } else if (type == 'pie') {
                    PieEchartsFun2(BarChartData)
                }
            } else {
                VariablesArr[(data.NO - 1)].VariableName = value
            }
        } else if (field == 'wdName') {
            VariableArr.DimensionName = value
        }
        if (type == 'line') {
            LineEchartsFun2(BarChartData)
        } else if (type == 'bar') {
            BarEchartsFun2(BarChartData)
        } else if (type == 'dash') {
            DashEchartsFun2(BarChartData)
        } else if (type == 'pie') {
            PieEchartsFun2(BarChartData)
        }
    }
    //新增 重新渲染折线图 表格类型选择
    YAxisesFun()

    function YAxisesFun() {
        if (type == 'line') {
            var YAxisesArr = BarChartData.option.YAxises
            var yArr = []
            for (let i = 0; i < YAxisesArr.length; i++) {
                if (i == 0) {
                    YAxisesArr[i].yIndex = 1
                }
                let value = `Y轴${YAxisesArr[i].yIndex}`
                yArr.push(value)
            }
            for (let j = 0; j < defaultVar.length; j++) {
                defaultVar[j].moreAxisArr = yArr
            }
        }
        tableFun()
    }
    //删除 重新渲染折线图 表格类型选择
    function DeleteYAxisesFun(index, yIndex) {
        var YAxisesArr = BarChartData.option.YAxises
        var yArr = []
        for (let i = 0; i < YAxisesArr.length; i++) {
            let value = `Y轴${YAxisesArr[i].yIndex}`
            yArr.push(value)
        }
        let VarArr = BarChartData.option.Variables
        for (let j = 0; j < defaultVar.length; j++) {
            var index = yArr.indexOf(defaultVar[j].moreAxis)
            if (index == -1) {
                defaultVar[j].moreAxis = 'Y轴1'
                VarArr[defaultVar[j].NO - 1].CurrentAxis.Value = '0'
            } else {
                let numV = VarArr[defaultVar[j].NO - 1].CurrentAxis.Value
                if (numV >= yIndex) {
                    VarArr[defaultVar[j].NO - 1].CurrentAxis.Value = Number(numV) - 1
                }
            }
            if (type == 'line') {
                LineEchartsFun2(BarChartData)
            } else if (type == 'bar') {
                BarEchartsFun2(BarChartData)
            } else if (type == 'dash') {
                DashEchartsFun2(BarChartData)
            } else if (type == 'pie') {
                PieEchartsFun2(BarChartData)
            }
        }
    }
    //渲染表格颜色选择器
    function colorpickerFun(data, defaultData) {
        for (let i = 0; i < data.length; i++) {
            var colorIndex = (defaultData[i].NO - 1) % 6
            var color
            if (data[i].color == '') {
                color = defaultColor[colorIndex]
            } else {
                color = data[i].color
            }
            if (echartsType == 'dashboard') {
                if (data[i].color == '') {
                    color = '#000000'
                } else {
                    color = data[i].color
                }
            }
            // colorpicker.render({
            //     elem: `#color${data[i].NO}`,
            //     color: `${color}` //hex
            //         ,
            //     alpha: true //开启透明度
            //         ,
            //     format: 'rgb',
            //     predefine: true,
            //     done: function (color) {
            //         var aa = hexify(color)
            //         data[i].color = color
            //         if (echartsType != 'dashboard') {
            //             let VariablesArr = BarChartData.option.Variables
            //             VariablesArr[(data[i].NO - 1)].Color.HtmlColor = color
            //         } else {
            //             BarChartData.option.Variable.Color.HtmlColor = color
            //         }
            //         if (type == 'line') {
            //             LineEchartsFun2(BarChartData)
            //         } else if (type == 'bar') {
            //             BarEchartsFun2(BarChartData)
            //         } else if (type == 'dash') {
            //             DashEchartsFun2(BarChartData)
            //         } else if (type == 'pie') {
            //             PieEchartsFun2(BarChartData)
            //         }
            //         changeData(data)
            //     }
            // });
            Colorpicker.create({
                type:'iframe',
                el: `color${data[i].NO}`,
                color: `${color}`,
                change: function (elem, hex, rgba) {
                    elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
                    // item.backColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    // Controls.ControlList[index].DefaultColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    data[i].color = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
                    if (echartsType != 'dashboard') {
                        let VariablesArr = BarChartData.option.Variables
                        VariablesArr[(data[i].NO - 1)].Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    } else {
                        BarChartData.option.Variable.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    }
                    if (type == 'line') {
                        LineEchartsFun2(BarChartData)
                    } else if (type == 'bar') {
                        BarEchartsFun2(BarChartData)
                    } else if (type == 'dash') {
                        DashEchartsFun2(BarChartData)
                    } else if (type == 'pie') {
                        PieEchartsFun2(BarChartData)
                    }
                    changeData(data)

                }
            })
        }
    }
    /*表格列表操作*/
    table.on('tool(demo)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        if (layEvent == 'var') {
            layui.$(this).on('input porpertychange', function (e) {
                let val = layui.$(this).val()
                let name = layui.$(this).attr('name');
                data[name] = val
                VariablesFun(data, val, 'selsectVar', 'selsectVar')
                obj.update(data); //更新行对象数据
                changeData(data)
            })
        } else if (layEvent == 'delete') {
            tableDelete(data)
        } else if (layEvent == 'type') {
            let that = layui.$(this)
            let val = layui.$(this).val()
           
            if (BarChartData.name.indexOf("dashboardchart") !== -1) {
                BarChartData.option.Variable.rangevalue = obj.data.valueAxisArr[val].value
                
            } else {
                BarChartData.option.Variables[obj.data.NO - 1].rangevalue = obj.data.valueAxisArr[val].value
               
            }
        } else if (layEvent == 'tableCell') {
            let index = null
            parent.Controls.ControlList.forEach((c, ci) => {
                if (c.Name === BarChartData.name) {
                    index = ci
                }
            })
            parent.openPop(index, obj.data.NO)
        } else if (layEvent == 'tableField') {
            if (!BarChartData.defaultDataConfig.tablename) {
                appTips.errorMsg('请先选择数据表');
                return
            }
            let index = null
            parent.Controls.ControlList.forEach((c, ci) => {
                if (c.Name === BarChartData.name) {
                    index = ci
                }
            })
            // let chackData = BarChartData.option.Variables[obj.data.NO - 1]
            parent.openField(index, obj.data.NO, '', obj.data)
        }
        colorpickerFun(defaultVar, defaultVar)
    })
    /* 图表表格操作*/
    table.on('tool(table-demo)', function (obj) {
        if (!BarChartData.defaultDataConfig.tablename) {
            appTips.errorMsg('请先选择数据表');
            return
        }
        var data = obj.data,
            layEvent = obj.event;
        if (layEvent == 'tableField') {
            let index = null
            parent.Controls.ControlList.forEach((c, ci) => {
                if (c.Name === BarChartData.name) {
                    index = ci
                }
            })
            parent.openField(index, obj.data.NO, 'axis', obj.data)
        } else if (layEvent == 'type') {
            let that = layui.$(this)
            let val = layui.$(this).val()
            BarChartData.fieldData.rangevalue = BarChartData.fieldData.valueAxisArr[val].value
        }
    })

    // 图表单元格编辑
    table.on('edit(table-demo)', function (obj) {
        var value = obj.value //得到修改后的值
        data = obj.data //得到所在行所有键值
        field = obj.field; //得到字段
        if (BarChartData.name.indexOf('piechart') !== -1 && field == 'lableName') {
            BarChartData.fieldData.lableName = value
        }
        /* if(field == 'lableName'){
            BarChartData.fieldData.lableName = value
        }else  */
        if (field == 'describe') {
            BarChartData.fieldData.describe = value
        }
        changeData(data)
    });
    //表格选择类型
    function tableType(data, that) {
        let VarArr = BarChartData.option.Variables
        if (echartsType == 'line') {
            VarArr[data.NO - 1].CurrentAxis.Value = that[0].value
        }
        if (type == 'line') {
            LineEchartsFun2(BarChartData)
        } else if (type == 'bar') {
            BarEchartsFun2(BarChartData)
        } else if (type == 'dash') {
            DashEchartsFun2(BarChartData)
        } else if (type == 'pie') {
            PieEchartsFun2(BarChartData)
        }
    }
    //表格删除数据
    function tableDelete(data) {
        for (let i = 0; i < defaultVar.length; i++) {
            if (defaultVar[i].NO == data.NO) {
                defaultVar.splice(i, 1)
                i--
            } else {
                defaultVar[i].NO = i + 1
            }
        }
        BarChartData.option.Variables.splice(data.NO - 1, 1)
        var YData = BarChartData.option.Variables
        var YDataArr = YDataFun(YData)
        BarChartData.option.YDataCollection = YDataArr
        if (echartsType == 'bar') {
            if (BarChartData.option.IsBarType) {
                BarChartData.option.XData.splice(data.NO - 1, 1)
            } else {
                BarChartData.option.AxisChartYAxis.yAxisData.splice(data.NO - 1, 1)
            }
        } else {
            BarChartData.option.XData.splice(data.NO - 1, 1)
        }
        // if(defaultVar.length == 0){
        //     defaultVar =  JSON.parse(JSON.stringify(defaultVarData.data))
        //     BarChartData.option.XData = JSON.parse(JSON.stringify(defaultVarData.XData))
        //     if(BarChartData.option.YDataCollection){
        //         BarChartData.option.YDataCollection = JSON.parse(JSON.stringify(defaultVarData.YDataCollection))
        //     }
        //     BarChartData.option.Variables = JSON.parse(JSON.stringify(defaultVarData.Variables))
        // }
        if (type == 'line') {
            LineEchartsFun2(BarChartData)
        } else if (type == 'bar') {
            BarEchartsFun2(BarChartData)
        } else if (type == 'dash') {
            DashEchartsFun2(BarChartData)
        } else if (type == 'pie') {
            PieEchartsFun2(BarChartData)
        }
        tableFun()
    }
    //保留小数位
    function decimalFun(obj, data, value, field, text) {
        var num = parseInt(value)
        if (String(num) == 'NaN') {
            num = ''
        }
        data[text] = num
        obj.update(data);
        // table.reload('demo')
        if (field == 'decimal') {

            let YDataCollection = BarChartData.option.YDataCollection[data.NO - 1].YData
            BarChartData.option.Variables[data.NO - 1].d = num
            for (let i = 0; i < YDataCollection.length; i++) {
                YDataCollection[i] = Number(YDataCollection[i]).toFixed(num)
            }
        } else {
            BarChartData.option.Variable.ValueDigit = num
        }
        if (type == 'line') {
            LineEchartsFun2(BarChartData)
        } else if (type == 'bar') {
            BarEchartsFun2(BarChartData)
        } else if (type == 'dash') {
            DashEchartsFun2(BarChartData)
        } else if (type == 'pie') {
            PieEchartsFun2(BarChartData)
        }
    }
    //描述
    function describeFun(obj, data, value, field, text) {
        if (echartsType != 'dashboard') {
            data[text] = value
            obj.update(data);
            table.reload('demo')
            BarChartData.option.Variables[data.NO - 1].describe = value
        } else {
            BarChartData.option.Variable.describe = value
        }
    }
    // 监听单元格编辑
    table.on('edit(demo)', function (obj) {
        var value = obj.value //得到修改后的值
        data = obj.data //得到所在行所有键值
        field = obj.field; //得到字段
        if (field == 'decimal') {
            decimalFun(obj, data, value, field, 'decimal')
        } else if (field == 'DashDecimal') {
            decimalFun(obj, data, value, field, 'DashDecimal')
        }
        if (field == 'lableName') {
            VariablesFun(data, value, field, 'lableName')
        } else if (field == 'wdName') {
            VariablesFun(data, value, field, 'wdName')
        } else if (field == 'unit') {
            BarChartData.option.Variable.Unit = value
            if (type == 'line') {
                LineEchartsFun2(BarChartData)
            } else if (type == 'bar') {
                BarEchartsFun2(BarChartData)
            } else if (type == 'dash') {
                DashEchartsFun2(BarChartData)
            } else if (type == 'pie') {
                PieEchartsFun2(BarChartData)
            }
        } else if (field == 'describe') {
            describeFun(obj, data, value, field, 'describe')
        }
        changeData(data)
    });
    //监听排序事件 
    table.on('sort(demo)', function (obj) {
        colorpickerFun(defaultVar, defaultVar)
    });
    //三位数的随机数
    function randomFun() {
        var num = '';
        for (var i = 0; i < 3; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return Number(num)
    }
    //折线图、折线柱状图数据
    function line(index, colorIndex, data) {
        return {
            "CurrentAxis": {
                "AxisType": "Y",
                "Value": 0
            },
            "Smooth": false,
            "DataType": "Line",
            "Show": true,
            "Unit": null,
            "Color": {
                "HtmlColor": defaultColor[colorIndex]
            },
            "VariableName":  data.VariableName ? data.VariableName: "选择",
            "FieldName":  data.FieldName ? data.FieldName: "配置字段",
            "DimensionName": `图例${index}`,
            "moreAxis": 'y轴1',
            "moreAxisArr": ['y轴1'],
            "rangevalue": '',
            "valueAxisArr": data.valueAxisArr ? data.valueAxisArr : [],
            "CheckData": data.CheckData ? data.CheckData : {}
        }
    }
    //饼图数据
    function pie(index, colorIndex, data) {
        return {
            "Show": true,
            "Unit": null,
            "Color": {
                "HtmlColor": defaultColor[colorIndex]
            },
            "VariableName": data.VariableName ? data.VariableName : "选择",
            "DimensionName": `图例${index}`,
            "rangevalue": '',
            "valueAxisArr": data.valueAxisArr ? data.valueAxisArr : [],
            "CheckData": data.CheckData ? data.CheckData : {}
        }
    }
    //柱形图数据
    function bar(index, colorIndex, data) {
        return {
            "BarWidth": null,
            "BarMaxWidth": 25.0,
            "DataType": "Bar",
            "Show": true,
            "Unit": null,
            "Color": {
                "HtmlColor": defaultColor[colorIndex]
            },
            "VariableName": data.VariableName ? data.VariableName : '选择',
            "FieldName": data.FieldName ? data.FieldName: "配置字段",
            "DimensionName": `图例${index}`,
            "moreAxis": 'y轴1',
            "moreAxisArr": ['y轴1'],
            "rangevalue": '',
            "valueAxisArr": data.valueAxisArr ? data.valueAxisArr : [],
            "CheckData": data.CheckData ? data.CheckData : {}
        }
    }
    //新增或删除数据 更改YDataCollection格式
    function YDataFun(YData) {
        var YDataArr = []
        for (let i = 0; i < YData.length; i++) {
            var num = []
            var dShow = false
            if (YData[i].d != undefined) {
                dShow = true
            }
            for (let j = 0; j < YData.length; j++) {
                var dNum = randomFun()
                if (dShow) {
                    dNum = Number(dNum).toFixed(YData[i].d)
                }
                num.push(dNum)
            }
            let value = {
                "name": YData[i].DimensionName,
                "YData": num
            }
            YDataArr.push(value)
        }
        if (echartsType == 'pie') {

            $('#varTitle').html(`维度(${defaultVar.length}/10)`)

        } else {
            $('#varTitle').html(`纵轴/度量(${defaultVar.length}/10)`)

        }
        return YDataArr
    }
    //新增变量点
    $('.newAdd').unbind()
    $('.newAdd').on('click', function () {
        let dataObj =  JSON.parse(JSON.stringify($('.newAdd')[0].dataset)) 
        if (defaultVar.length == 10) {
            return
        }
        var index = null
        if (defaultVar.length === 0) {
            index = 1
        } else {
            index = Number(defaultVar[defaultVar.length - 1].NO) + 1
        }
        var colorIndex = index % 10
        var varArr = {
            "NO": index,
            "lableName": `图例${index}`,
            "selsectVar": '选择',
            "VariableName": "选择",
            "FieldName": '配置字段',
            "describe": '湿度',
            "decimal": 0,
            "color": defaultColor[colorIndex],
            "rangevalue": ''
        }

        if (JSON.stringify(dataObj) !== "{}" ) {
            if (!dataObj.fieldtype) { // 非业务数据表格
                varArr.VariableName = dataObj.name
                varArr.selsectVar = dataObj.name
                varArr.CheckData = dataObj
            } else {    // 业务数据多选newField
                varArr.FieldName = dataObj.name
            }
            
        }

        //表格增加数据
        if (echartsType == 'line' || echartsType == 'bar' || echartsType == 'pie') {
            varArr.moreAxis = 'y轴1'
            varArr.moreAxisArr = ['y轴1']
            if (!dataObj.fieldtype) { // 非业务数据表格
                varArr.valueAxisArr = [{
                    name: '请选择',
                    value: ''
                }]
            } else {
                if (dataObj.flag === 'number') {
                    varArr.valueAxisArr = parent.tableNumerical
                } else if (dataObj.flag === 'text') {
                    varArr.valueAxisArr = parent.tableText
                } else {
                    varArr.valueAxisArr = parent.tableText
                }
            }
        }
        defaultVar.push(varArr)
        if (echartsType == 'line' || echartsType == 'lineBar') {
            VariablesArr = line(index, colorIndex, varArr)
        } else if (echartsType == 'pie') {
            VariablesArr = pie(index, colorIndex, varArr)
        } else if (echartsType == 'bar') {
            VariablesArr = bar(index, colorIndex, varArr)
        }
        BarChartData.option.Variables.push(VariablesArr) //新增图例名
        var YData = BarChartData.option.Variables
        var YDataArr = YDataFun(YData)

        BarChartData.option.YDataCollection = YDataArr //新增数值
        if (echartsType == 'line' || echartsType == 'lineBar') {
            BarChartData.option.XData.push(`${moment().format('YYYY-MM-DD')}`)
        } else if (echartsType == 'pie') {
            BarChartData.option.XData.push(`图例${index}`) //新增图例名
        } else if (echartsType == 'bar') {
            if (BarChartData.option.IsBarType) {
                BarChartData.option.XData.push(`${moment().format('YYYY-MM-DD')}`)
            } else {
                BarChartData.option.AxisChartYAxis.yAxisData.push(`${moment().format('YYYY-MM-DD')}`)
            }
        }
        if (type == 'line') {
            LineEchartsFun2(BarChartData)
        } else if (type == 'bar') {
            BarEchartsFun2(BarChartData)
        } else if (type == 'dash') {
            DashEchartsFun2(BarChartData)
        } else if (type == 'pie') {
            PieEchartsFun2(BarChartData)
        }
        tableFun()
    })
    //rgba转为16进制
    function hexify(color) {
        var values = color
            .replace(/rgba?\(/, '')
            .replace(/\)/, '')
            .replace(/[\s+]/g, '')
            .split(',');
        var a = parseFloat(values[3] || 1),
            r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
            g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
            b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
        return "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2) +
            ("0" + a.toString(16)).slice(-2)
    }
}

function getBussinessDrop () {
    let lis = ``
    request.get(`/bi/${parent.appId}/business`).then(res => {
        if (res.data.data) {
            res.data.data.forEach((item, itemIndex) => {
                if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
                    lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" selected >${item.nameCn}</option>`
                    BarChartData.defaultDataConfig.tablename = res.data.data[itemIndex].nameCn
                } else {
                    lis += `<option value="${item.nameCn}" data-value="${item.nameEn}" >${item.nameCn}</option>`
                }
            })
            $('#chart-table').html(lis)
            form.render('select', 'form-data')

        }

    })
}
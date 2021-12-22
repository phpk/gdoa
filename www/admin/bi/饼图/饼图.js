/*
 * @Description: 这是***页面（组件）
 * @Date: 2021-03-04 18:52:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-06 17:34:16
 */
var layer = layui.layer;
var form = layui.form;
// var colorpicker = layui.colorpicker;
form.render();

$('.BarChart_var').css('display', 'none')

function PieEchartsFun(BarChartData,type) {
    let data = []
    data.push(BarChartData)
    parent.PiechartEcharts(data, BarChartData.name)
    if(type){
        window.parent.back(window.parent.selectdata,window.parent.Controls)
    }
}

//调用渲染
function PieinitEchart(data, PieName, type) {
    $(".colordiv").remove()
    if (type == 'style' || type == undefined) {
        $('.BarChart_var').css('display', 'none')
        $('.BarChart_echarts').css('display', 'block')
        $('.BarChart').css('width', '450px')
        parent.$('.pieBox').css('height', '626px')
    } else {
        $('.BarChart_echarts').css('display', 'none')
        $('.BarChart_var').css('display', 'block')
        $('.BarChart').css('width', '478px')
        parent.$('.pieBox').css('height', '780px')
    }

    let TitleColor
    let LegendColor
    let BackgroundColor
    let BarChartData
    BarChartData = data
    TitleColor = BarChartData.option.Title.Color.HtmlColor
    LegendColor = BarChartData.option.Legend.Color.HtmlColor
    BackgroundColor = BarChartData.option.BackgroundColor.HtmlColor
    let PieUnit = BarChartData.option.PieConfiguration.Unit
    $("#unitIpt").val(PieUnit)
    let Title = BarChartData.option.Title.Title
    $("#title").val(Title)
    let pieLength1 = BarChartData.option.PieLabelLine.Length
    $("#length1").val(pieLength1)
    let pieLength2 = BarChartData.option.PieLabelLine.Length2
    $("#length2").val(pieLength2)
    $("#outRadius").val(BarChartData.option.PieConfiguration.OutRadius)
    $("#InRadius").val(BarChartData.option.PieConfiguration.InRadius)
    if (BarChartData.option.Title.Position == 'left') {
        $("input[name=sex][value='1']").prop("checked", "true");
    } else if (BarChartData.option.Title.Position == 'Center') {
        $("input[name=sex][value='2']").prop("checked", "true");
    } else if (BarChartData.option.Title.Position == 'right') {
        $("input[name=sex][value='3']").prop("checked", "true");
    }
    $('#titleShow').prop("checked", BarChartData.option.Title.Show)

    $('#titleSize').val(BarChartData.option.Title.FontSize)
    $('#lengthSize').val(BarChartData.option.Label.FontSize)
    $('#lengthShow').prop("checked", BarChartData.option.PieLabelLine.Show)
    if (BarChartData.option.Legend.Position == 'RightCenter') {
        $("input[name=sex][value='4']").prop("checked", "true");
    } else if (BarChartData.option.Legend.Position == 'BottomCenter') {
        $("input[name=sex][value='5']").prop("checked", "true");
    } else if (BarChartData.option.Legend.Position == 'TopCenter') {
        $("input[name=sex][value='6']").prop("checked", "true");
    } else if (BarChartData.option.Legend.Position == 'LeftCenter') {
        $("input[name=sex][value='7']").prop("checked", "true");
    }
    $('#legendShow').prop("checked", BarChartData.option.Legend.Show)
    $('#labelDimension').prop("checked", BarChartData.option.Label.DimensionShow)
    $('#labelValue').prop("checked", BarChartData.option.Label.ValueShow)
    $('#labelPercentage').prop("checked", BarChartData.option.Label.PercentageShow)
    $('#LabelShowOutter').prop("checked", BarChartData.option.Label.ShowOutter)

    $("#LegendSize").val(BarChartData.option.Legend.FontSize)
    $("#LegendFontFamily").val(BarChartData.option.Legend.FontFamily)
    if (BarChartData.option.Title.FontWeight == 400) {
        $('#titleWeight i').css('color', '#999')
    } else {
        $('#titleWeight i').css('color', '#000')
    }
    form.render();
    //初始改变复选样式
    // setTimeout(() => {
        try {
            if (BarChartData.option.Title.Show) {
                $('#titleShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#titleShow')[0].nextSibling.style.background = '#fff'
            }
            if (BarChartData.option.PieLabelLine.Show) {
                $('#lengthShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#lengthShow')[0].nextSibling.style.background = '#fff'
            }
            if (BarChartData.option.Legend.Show) {
                $('#legendShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#legendShow')[0].nextSibling.style.background = '#fff'
            }
            if (BarChartData.option.Label.DimensionShow) {
                $('#labelDimension')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#labelDimension')[0].nextSibling.style.background = '#fff'
            }
            if (BarChartData.option.Label.ValueShow) {
                $('#labelValue')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#labelValue')[0].nextSibling.style.background = '#fff'
            }
            if (BarChartData.option.Label.PercentageShow) {
                $('#labelPercentage')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#labelPercentage')[0].nextSibling.style.background = '#fff'
            }
            if (BarChartData.option.Label.ShowOutter) {
                $('#LabelShowOutter')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            } else {
                $('#LabelShowOutter')[0].nextSibling.style.background = '#fff'
            }
        } catch (err) {
            //在此处理错误
            console.log('这是一段贼神奇的代码008！！！')
        }
    //  }, 100)

    


    //标题颜色
    // colorpicker.render({
    //     elem: '#test2',
    //     color: TitleColor //hex
    //         ,
    //     alpha: true //开启透明度
    //         ,
    //     format: 'rgb',
    //     predefine: true,
    //     done: function (color) {
    //         var aa = hexify(color)
    //         BarChartData.option.Title.Color.HtmlColor = color
    //         PieEchartsFun(BarChartData)
    //     }
    // });
    // if(!type){
        // $("#test2").on("click",function(){
            Colorpicker.create({
                    type: 'iframe',
                    el: `test2`,
                    color: TitleColor,
                    change: function (elem, hex, rgba) {
                        elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                        BarChartData.option.Title.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                        PieEchartsFun(BarChartData)
                        
                    }
            })
         
        // })
        

    //图例颜色
    // colorpicker.render({
    //     elem: '#test3',
    //     color: LegendColor //hex
    //         ,
    //     alpha: true //开启透明度
    //         ,
    //     format: 'rgb',
    //     predefine: true,
    //     done: function (color) {
    //         var aa = hexify(color)
    //         BarChartData.option.Legend.Color.HtmlColor = color
    //         PieEchartsFun(BarChartData)
    //     }
    // });
    // $("#test3").click(function () {
        Colorpicker.create({
            type: 'iframe',
            el: `test3`,
            color: LegendColor,
            change: function (elem, hex, rgba) {
                elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                BarChartData.option.Legend.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                PieEchartsFun(BarChartData)
                // elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
                // item.backColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                // Controls.ControlList[index].DefaultColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'

            }
        })
    // });
    //背景颜色
    // colorpicker.render({
    //     elem: '#test5'
    //     ,color: BackgroundColor //hex
    //     ,alpha: true //开启透明度
    //     ,format: 'rgb'
    //     ,predefine: true 
    //     ,done: function(color){
    //         var aa =  hexify(color)
    //         BarChartData.option.BackgroundColor.HtmlColor = color
    //         PieEchartsFun(BarChartData)
    //     }
    // });
    // setTimeout(()=>{
       
    Colorpicker.create({
        type: 'iframe',
        el: `test5`,
        color: BackgroundColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.BackgroundColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            PieEchartsFun(BarChartData)

        }
    })
// }
    // },700)

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
    // 数据关联
    form.on(`select(data)`, function (data) {
        // let realTime = document.getElementById("realTime")
        if (BarChartData.defaultDataConfig.datatype === data.value) {
            return
        }
        BarChartData.defaultDataConfig.datatype = data.value
        let index = null
        parent.Controls.ControlList.forEach((c, ci) => {
            if (c.Name === BarChartData.name) {
                index = ci
            }
        })
        parent.Controls.ControlList.forEach((item, itemi) => {
            if (item.ControlType === 'searchbutton') {
                parent.Controls.ControlList[itemi].EchartList.forEach((cd, cdi) => {
                    if (cd.name === BarChartData.name) {
                        parent.Controls.ControlList[itemi].EchartList.splice(cdi, 1)
                    }
                })
                parent.Controls.ControlList[itemi].HistoryList.forEach((cd, cdi) => {
                    if (cd.name === BarChartData.name) {
                        parent.Controls.ControlList[itemi].HistoryList.splice(cdi, 1)
                    }
                })
            }
        })

        if (data.value === '历史数据') {
            realTime.style.display = 'block'
            parent.choice(parent.Controls.ControlList[index].TabEvent, index)
            $("#pieAddTable").show()
        } else if (data.value === '业务数据') {
            let newData = BarChartData.option.Variables.slice(0, 1)
            // let lis = ``
            // request.get(`/bi/${parent.appId}/business`).then(res => {
            //     res.data.data = res.data.data ? res.data.data : []
            //     BarChartData.defaultDataConfig.dataChart = res.data.data
            //     res.data.data.forEach(item => {
            //         if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
            //             lis+=`<option value="${item.nameEn}" selected >${item.nameCn}</option>` 
            //             BarChartData.defaultDataConfig.tablevalue = item.nameEn
            //         } else {
            //             lis+=`<option value="${item.nameEn}">${item.nameCn}</option>`
            //         }
            //     })
            //     $('#chart-table').html(lis)
            //     form.render()
            //     parent.choice(parent.Controls.ControlList[index].TabEvent, index)
            // })
            BarChartData.option.Variables = newData
            parent.choice(parent.Controls.ControlList[index].TabEvent, index)
            $("#pieAddTable").hide()
            // table.reload("demo",{data:[]})
        } else { //实时数据
            $("#pieAddTable").show()
            parent.choice(parent.Controls.ControlList[index].TabEvent, index)
        }

    })
    // 数据表
    form.on(`select(chart-data)`, function (data) {
        BarChartData.defaultDataConfig.tablename = data.value
        BarChartData.option.Variables.forEach(bv => {
            bv.FieldName = ''
            bv.FieldValue = ''
            bv.CheckData = {}
            bv.rangevalue = ''
        })
        BarChartData.fieldData.FieldName = '配置字段'
        BarChartData.fieldData.FieldValue = ''
        let index = null
        let types = ['associatedatetimepicker', 'datasearch', 'textsearch', 'dropsearch']
        parent.Controls.ControlList.forEach((c, ci) => {
            if (c.Name === BarChartData.name) {
                index = ci
            }
            if (types.includes(c.ControlType)) {
                c.EchartList.forEach((f, fi) => {
                    if (f.name === BarChartData.name) {
                        parent.Controls.ControlList[ci].EchartList.splice(fi, 1)
                        if (c.ControlType === 'dropsearch') {
                            parent.Controls.ControlList[ci].dropList = []

                        }
                    }
                })
            }
        })
        let nodes = [...data.elem.children]
        nodes.forEach(item => {
            if (item.innerHTML === data.value) {
                BarChartData.defaultDataConfig.tablevalue = item.dataset.value
            }
        })
        parent.choice(parent.Controls.ControlList[index].TabEvent, index)
        // let i = index
        // let defaultVar = [{
        //     "NO": 1,
        //     "lableName": '',
        //     "selsectVar":'',
        //     "FieldName": '配置字段',
        //     "describe":'湿度',
        //     "decimal": '',
        //     "color": '',
        //     "chartName": '',
        //     "rangevalue":  '',
        //     "valueAxisArr": BarChartData.option.Variables[0].valueAxisArr.length === 0 ? [{
        //         name: '请选择字段',
        //         value: ''
        //     }] : BarChartData.option.Variables[0].valueAxisArr, 
        // }]

        // table.reload('demo', {data:defaultVar});
    })
    // 变量
    form.on(`select(data-variable)`, function (data) {
        BarChartData.defaultDataConfig.datavariable = data.value
    })
    //外半径
    form.on('select(outRadius)', function (size) {
        BarChartData.option.PieConfiguration.OutRadius = size.value
        PieEchartsFun(BarChartData,'save')
    });
    //内半径
    form.on('select(InRadius)', function (size) {
        BarChartData.option.PieConfiguration.InRadius = size.value
        PieEchartsFun(BarChartData,'save')
    });
    //单位
    $('#unitIpt').unbind("input")
    $("#unitIpt").on("input", function () {
        let value = $("#unitIpt").val()
        BarChartData.option.PieConfiguration.Unit = value
        PieEchartsFun(BarChartData,'save')
    })

    //标题
    $('#title').unbind("input")
    $("#title").on("input", function () {
        let value = $("#title").val()
        BarChartData.option.Title.Title = value
        PieEchartsFun(BarChartData,'save')
    })
    //标题是否显示
    form.on('checkbox(titleShow)', function (show) {
        var value = show.elem.checked
        show.elem.style.background = 'red !important'
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
        BarChartData.option.Title.Show = value
        PieEchartsFun(BarChartData,'save')
    });
    //左标题
    form.on('radio(leftTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'left'
        PieEchartsFun(BarChartData,'save')
    });
    //居中标题
    form.on('radio(conterTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'Center'
        PieEchartsFun(BarChartData,'save')
    });
    //右标题
    form.on('radio(rightTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'right'
        PieEchartsFun(BarChartData,'save')
    });
    //表题字号
    $('#titleSize').unbind("input")
    $("#titleSize").on("input", function () {
        let value = $("#titleSize").val()
        BarChartData.option.Title.FontSize = value
        PieEchartsFun(BarChartData,'save')
    })
    //引导线长度1
    $('#length1').unbind("input")
    $("#length1").on("input", function () {
        let value = Number($("#length1").val())
        BarChartData.option.PieLabelLine.Length = value
        PieEchartsFun(BarChartData,'save')
    })
    //引导线长度2
    $('#length2').unbind("input")
    $("#length2").on("input", function () {
        let value = Number($("#length2").val())
        BarChartData.option.PieLabelLine.Length2 = value
        PieEchartsFun(BarChartData,'save')
    })
    //引导线是否显示
    form.on('checkbox(lengthShow)', function (show) {
        var value = show.elem.checked
        BarChartData.option.PieLabelLine.Show = value
        PieEchartsFun(BarChartData,'save')
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //右图例
    form.on('radio(leftLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'LeftCenter'
        PieEchartsFun(BarChartData,'save')
    });
    //右图例
    form.on('radio(rightLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'RightCenter'
        PieEchartsFun(BarChartData,'save')
    });
    //底图例
    form.on('radio(bottomLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'BottomCenter'
        PieEchartsFun(BarChartData,'save')
    });
    //顶图例
    form.on('radio(topLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'TopCenter'
        PieEchartsFun(BarChartData,'save')
    });
    //图例是否显示
    form.on('checkbox(legendShow)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Show = value
        PieEchartsFun(BarChartData,'save')
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
    });

    //标签维度
    form.on('checkbox(labelDimension)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Label.DimensionShow = value
        PieEchartsFun(BarChartData,'save')
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //标签数值
    form.on('checkbox(labelValue)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Label.ValueShow = value
        PieEchartsFun(BarChartData,'save')
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //标签百分比
    form.on('checkbox(labelPercentage)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Label.PercentageShow = value
        PieEchartsFun(BarChartData,'save')
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //标签显示在外
    form.on('checkbox(LabelShowOutter)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Label.ShowOutter = value
        PieEchartsFun(BarChartData,'save')
        if (value) {
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        } else {
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //标签字号
    $('#lengthSize').unbind("input")
    $("#lengthSize").on("input", function () {
        let value = $("#lengthSize").val()
        BarChartData.option.Label.FontSize = value
        PieEchartsFun(BarChartData,'save')
    })

    $('#style1').unbind()
    $('#style1').on('click', function () {
        var color1 = ['#ffa3a3', '#ffe08c', '#55baf9', '#91E2', '#81F4DC', '#C4FFEE']
        // changeColor(color1)
        var VariablesArr = BarChartData.option.Variables
        for (let i = 0; i < VariablesArr.length; i++) {
            VariablesArr[i].Color.HtmlColor = color1[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color1
        PieEchartsFun(BarChartData,'save')
    })
    $('#style2').unbind()
    $('#style2').on('click', function () {
        var color2 = ['#434D72', '#376CF0', '#4BC6E0', '#BCCDD4', '#89E217', '#1B986C']
        // changeColor(color2)
        var VariablesArr = BarChartData.option.Variables
        for (let i = 0; i < VariablesArr.length; i++) {
            VariablesArr[i].Color.HtmlColor = color2[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color2
        PieEchartsFun(BarChartData,'save')
    })
    $('#style3').unbind()
    $('#style3').on('click', function () {
        var color3 = ['#C3C5C9', '#385CE3', '#6096FE', '#626894', '#F06981', '#FBA6B9']
        // changeColor(color3)
        var VariablesArr = BarChartData.option.Variables
        for (let i = 0; i < VariablesArr.length; i++) {
            VariablesArr[i].Color.HtmlColor = color3[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color3
        PieEchartsFun(BarChartData,'save')
    })
    $('#style4').unbind()
    $('#style4').on('click', function () {
        var color4 = ['#567BF5', '#5EB0FB', '#FFC23E', '#53596F', '#89D331', '#FFA351']
        // changeColor(color4)
        var VariablesArr = BarChartData.option.Variables
        for (let i = 0; i < VariablesArr.length; i++) {
            VariablesArr[i].Color.HtmlColor = color4[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color4
        PieEchartsFun(BarChartData,'save')
    })
    //图例字号
    $('#LegendSize').unbind("input")
    $("#LegendSize").on("input", function () {
        let value = $("#LegendSize").val()
        BarChartData.option.Legend.FontSize = value
        PieEchartsFun(BarChartData,'save')
    })
    //图例字体
    form.on(`select(LegendFontFamily)`, function (size) {
        BarChartData.option.Legend.FontFamily = size.value
        PieEchartsFun(BarChartData,'save')
    });
    //标签字体
    form.on(`select(LabelFontFamily)`, function (size) {
        BarChartData.option.Label.FontFamily = size.value
        PieEchartsFun(BarChartData,'save')
    });
    //标签字体
    form.on(`select(TitleFontFamily)`, function (size) {
        BarChartData.option.Title.FontFamily = size.value
        PieEchartsFun(BarChartData,'save')
    });
    //加粗
    $('#titleWeight').on('click', function () {
        if (BarChartData.option.Title.FontWeight == 400) {
            $('#titleWeight i').css('color', '#000')
            BarChartData.option.Title.FontWeight = 800
        } else {
            $('#titleWeight i').css('color', '#999')
            BarChartData.option.Title.FontWeight = 400
        }
        PieEchartsFun(BarChartData,'save')
    })
    //收缩
    // $('.iconBox').on('click', function () {
    //     var Parent = $(this).parents('.echarts_jt').find('.formBox')
    //     var name = $(this).attr('name')
    //     var num = $(this).attr('num')
    //     if (name == 'false') {
    //         Parent.css('overflow', 'hidden')
    //         Parent.animate({
    //             height: '0px',
    //             padding: '0px'
    //         });
    //         Parent.hide()
    //         $(this).attr('name', 'true')
    //         $(this).find('i').removeClass('layui-icon-up')
    //         $(this).find('i').addClass('layui-icon-down')
    //     } else {
    //         Parent.css('overflow', 'inherit')
    //         Parent.animate({
    //             height: `${num}px`,
    //             padding: '20px 0 20px 20px'
    //         });
    //         Parent.show()
    //         $(this).attr('name', 'false')
    //         $(this).find('i').removeClass('layui-icon-down')
    //         $(this).find('i').addClass('layui-icon-up')
    //     }
    // })

}
function iconBoxFun(e,id) {
    var Parent = $('#'+id).parents('.echarts_jt').find('.formBox')
    var name = $('#'+id).attr('name')
    var num = $('#'+id).attr('num')
    if (name == 'false') {
        // Parent.css('overflow', 'hidden')
        // Parent.animate({
        //     height: '0px',
        //     padding: '0px'
        // });
        Parent.hide()
        $('#'+id).attr('name', 'true')
        $('#'+id).find('i').removeClass('layui-icon-up')
        $('#'+id).find('i').addClass('layui-icon-down')
    } else {
        // Parent.css('overflow', 'inherit')
        // Parent.animate({
        //     height: `${num}px`,
        //     padding: '20px 0 20px 20px'
        // });
        Parent.show()
        $('#'+id).attr('name', 'false')
        $('#'+id).find('i').removeClass('layui-icon-down')
        $('#'+id).find('i').addClass('layui-icon-up')
    }
    
}
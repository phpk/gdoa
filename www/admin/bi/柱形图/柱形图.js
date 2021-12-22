/*
 * @Description: 这是***页面（组件）
 * @Date: 2021-03-04 18:52:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-06 17:34:45
 */
var layer = layui.layer;
var form = layui.form;
form.render();

$('.BarChart_var').css('display','none')

var colorpicker = layui.colorpicker;
//改变
function BarEchartsFun(BarChartData,type){
    let data = []
    data.push(BarChartData)
    parent.BarchartEcharts(data,BarChartData.name)
    if(type){
        window.parent.back(window.parent.selectdata,window.parent.Controls)
    }
}
//柱形图初始化
function BarinitEchart(data,name,type){
    $(".colordiv").remove()
    if(type == 'style' || type == undefined){
        $('.BarChart_var').css('display','none')
        $('.BarChart_echarts').css('display','block')
        $('.BarChart').css('width','450px')
        parent.$('.pieBox').css('height','626px')
    } else {
        $('.BarChart_echarts').css('display','none')
        $('.BarChart_var').css('display','block')
        $('.BarChart').css('width','478px')
        parent.$('.pieBox').css('height','780px')
    }

    BarChartData = data
    let xColor = BarChartData.option.XAxis.Color.HtmlColor
    let yColor = BarChartData.option.AxisChartYAxis.Color.HtmlColor
    let TitleColor = BarChartData.option.Title.Color.HtmlColor
    let LegendColor = BarChartData.option.Legend.Color.HtmlColor
    let LabelColor = BarChartData.option.Label.Color.HtmlColor
    let BackgroundColor = BarChartData.option.BackgroundColor.HtmlColor
    let TopMargin = BarChartData.option.DrawContent.TopMargin
    $("#topMar").val(TopMargin)
    let BottomMargin = BarChartData.option.DrawContent.BottomMargin
    $("#bottomMar").val(BottomMargin)
    let LeftMargin = BarChartData.option.DrawContent.LeftMargin
    $("#letfMar").val(LeftMargin)
    let RightMargin = BarChartData.option.DrawContent.LeftMargin
    $("#rightMar").val(RightMargin)
    let Title = BarChartData.option.Title.Title
    $("#title").val(Title)
    
    // if(BarChartData.option.IsBarType && BarChartData.option.IsTime){
    //     $("input[name=type][value='1']").prop("checked","true");
    // }
    // if(BarChartData.option.IsBarType && BarChartData.option.IsTime == false){
    //     $("input[name=type][value='2']").prop("checked","true");
    // }
    // if(BarChartData.option.IsBarType == false && BarChartData.option.IsTime){
    //     $("input[name=type][value='3']").prop("checked","true");
    // }
    // if(BarChartData.option.IsBarType == false && BarChartData.option.IsTime == false){
    //     $("input[name=type][value='4']").prop("checked","true");
    // }

    if(BarChartData.option.chartValue === 1){
        $("input[name=type][value='1']").prop("checked","true");
    }
    if(BarChartData.option.chartValue === 2){
        $("input[name=type][value='2']").prop("checked","true");
    }
    if(BarChartData.option.chartValue === 3){
        $("input[name=type][value='3']").prop("checked","true");
    }
    if(BarChartData.option.chartValue === 4){
        $("input[name=type][value='4']").prop("checked","true");
    }


    $('#xSize').val(BarChartData.option.XAxis.FontSize)
    $('#yName').val(BarChartData.option.AxisChartYAxis.Name)
    $('#yUnite').val(BarChartData.option.AxisChartYAxis.Unit)
    $('#yMax').val(BarChartData.option.AxisChartYAxis.Max)
    $('#yMin').val(BarChartData.option.AxisChartYAxis.Min)
    $('#yshow').prop("checked",BarChartData.option.AxisChartYAxis.Adaptive)
    $('#ySize').val(BarChartData.option.AxisChartYAxis.FontSize)
    $('#yshowLine').prop("checked",BarChartData.option.AxisChartYAxis.ShowSeparator)
    if(BarChartData.option.Title.Position == 'left'){
        $("input[name=sex][value='1']").prop("checked","true");
    }else if(BarChartData.option.Title.Position == 'Center'){
        $("input[name=sex][value='2']").prop("checked","true");
    }else if(BarChartData.option.Title.Position == 'right'){
        $("input[name=sex][value='3']").prop("checked","true");
    }
    $('#titleShow').prop("checked",BarChartData.option.Title.Show)
    $('#titleSize').val(BarChartData.option.Title.FontSize)
    if(BarChartData.option.Legend.Position == 'RightCenter'){
        $("input[name=sex][value='4']").prop("checked","true");
    }else if(BarChartData.option.Legend.Position == 'RightBottom'){
        $("input[name=sex][value='5']").prop("checked","true");
    }else if(BarChartData.option.Legend.Position == 'RightTop'){
        $("input[name=sex][value='6']").prop("checked","true");
    }else if(BarChartData.option.Legend.Position == 'LeftCenter'){
        $("input[name=sex][value='7']").prop("checked","true");
    }
    $('#legendShow').prop("checked",BarChartData.option.Legend.Show)
    $('#LabelShow').prop("checked",BarChartData.option.Label.Show)
    $('#LabelSize').val(BarChartData.option.Label.FontSize)
    $('#LegendSize').val(BarChartData.option.Legend.FontSize)
    $('#LabelFontFamily').val(BarChartData.option.Label.FontFamily)
    $('#LegendFontFamily').val(BarChartData.option.Legend.FontFamily)
    $('#XAxiosFontFamily').val(BarChartData.option.XAxis.FontFamily)
    $('#YAxiosFontFamily').val(BarChartData.option.AxisChartYAxis.FontFamily)
    $('#TitleFontFamily').val(BarChartData.option.Title.FontFamily)
    if(BarChartData.option.Title.FontWeight == 400){
        $('#titleWeight i').css('color','#999')
    }else{
        $('#titleWeight i').css('color','#000')
    }
    
    form.render();
        //初始改变复选样式
        // setTimeout(()=>{
            try {
                if(BarChartData.option.AxisChartYAxis.Adaptive){
                    $('#yshow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#yshow')[0].nextSibling.style.background = '#fff'
                }
                if(BarChartData.option.AxisChartYAxis.ShowSeparator){
                    $('#yshowLine')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#yshowLine')[0].nextSibling.style.background = '#fff'
                }
                if(BarChartData.option.Title.Show){
                    $('#titleShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#titleShow')[0].nextSibling.style.background = '#fff'
                }
                if(BarChartData.option.Legend.Show){
                    $('#legendShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#legendShow')[0].nextSibling.style.background = '#fff'
                }
                if(BarChartData.option.Label.Show){
                    $('#LabelShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#LabelShow')[0].nextSibling.style.background = '#fff'
                }
                if(BarChartData.option.AxisChartYAxis.ShowTitle){
                    $('#YtitleShow1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#YtitleShow1')[0].nextSibling.style.background = '#fff'
                }
                if(BarChartData.option.AxisChartYAxis.ShowUnit){
                    $('#YunitShow1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    $('#YunitShow1')[0].nextSibling.style.background = '#fff'
                }
            }  catch(err) {
                //在此处理错误
                console.log('这是一段贼神奇的代码007！！！')
            }
        // },100)
    

    //x轴颜色项
    // colorpicker.render({
    //     elem: '#test0'
    //     ,color: xColor //hex
    //     ,alpha: true //开启透明度
    //     ,format: 'rgb'
    //     ,predefine: true 
    //     ,done: function(color){
    //         var aa =  hexify(color)
    
    //         BarChartData.option.XAxis.Color.HtmlColor = color
    //         BarEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test0`,
        color: xColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.XAxis.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarEchartsFun(BarChartData)
        }
    })
    //y轴颜色项
    // colorpicker.render({
    //     elem: '#test1'
    //     ,color: yColor //hex
    //     ,alpha: true //开启透明度
    //     ,format: 'rgb'
    //     ,predefine: true 
    //     ,done: function(color){
    //         var aa =  hexify(color)
    //         BarChartData.option.AxisChartYAxis.Color.HtmlColor = color
    //         BarEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test1`,
        color: yColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.AxisChartYAxis.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarEchartsFun(BarChartData)
        }
    })
    //标题颜色
    // colorpicker.render({
    //     elem: '#test2'
    //     ,color: TitleColor //hex
    //     ,alpha: true //开启透明度
    //     ,format: 'rgb'
    //     ,predefine: true 
    //     ,done: function(color){
    //          var aa =  hexify(color)
    //         BarChartData.option.Title.Color.HtmlColor = color
    //         BarEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test2`,
        color: TitleColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.Title.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarEchartsFun(BarChartData)
        }
    })
    //图例颜色
    // colorpicker.render({
    //     elem: '#test3'
    //     ,color: LegendColor //hex
    //     ,alpha: true //开启透明度
    //     ,format: 'rgb'
    //     ,predefine: true 
    //     ,done: function(color){
    //         var aa =  hexify(color)
    //         BarChartData.option.Legend.Color.HtmlColor = color
    //         BarEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test3`,
        color: LegendColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.Legend.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarEchartsFun(BarChartData)
        }
    })
    //标签颜色
    // colorpicker.render({
    //     elem: '#test4'
    //     ,color: LabelColor //hex
    //     ,alpha: true //开启透明度
    //     ,format: 'rgb'
    //     ,predefine: true 
    //     ,done: function(color){
    //         var aa =  hexify(color)
    //         BarChartData.option.Label.Color.HtmlColor = color
    //         BarEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test4`,
        color: LabelColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.Label.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarEchartsFun(BarChartData)
        }
    })
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
    //         BarEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test5`,
        color: BackgroundColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.BackgroundColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarEchartsFun(BarChartData)
            
        }
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
    //x字号
    $('#xSize').unbind("input")
    $("#xSize").on("input",function(){
        let value = $("#xSize").val()
        BarChartData.option.XAxis.FontSize = value
        BarEchartsFun(BarChartData,"save")
    })
    $("#xSize").keydown(function (e) {
        if (e.keyCode == 13) {
            return false;   //禁止回车from刷新
        }
    })
    
    //y轴名称
    $('#yName').unbind("input")
    $("#yName").on("input",function(){
        let value = $("#yName").val()
        BarChartData.option.AxisChartYAxis.Name = value
        BarEchartsFun(BarChartData,"save")
    })
    //y轴单位
    $('#yUnite').unbind("input")
    $("#yUnite").on("input",function(){
        let value = $("#yUnite").val()
        BarChartData.option.AxisChartYAxis.Unit = value
        BarEchartsFun(BarChartData,"save")
    })
    //y轴最大值
    $('#yMax').unbind("input")
    $("#yMax").on("input",function(){
        let value = $("#yMax").val()
        BarChartData.option.AxisChartYAxis.Max = value
        BarEchartsFun(BarChartData,"save")
    })
    //y轴最小值
    $('#yMin').unbind("input")
    $("#yMin").on("input",function(){
        let value = $("#yMin").val()
        BarChartData.option.AxisChartYAxis.Min = value
        BarEchartsFun(BarChartData,"save")
    })
     // 数据关联
    //  form.on(`select(data)`, function(data) {
    //     let sheet = document.getElementById('data-sheet')
    //     let axial = document.getElementById('axial')
    //     let table = document.getElementById('ax-table')
    //     // let table1 = document.getElementById('chart-table1')
    //     // let table2 = document.getElementById('chart-table2')
    //     BarChartData.defaultDataConfig.datatype = data.value
    //     let index = null
    //     parent.Controls.ControlList.forEach((c, ci)=> {
    //         if (c.Name === BarChartData.name) {
    //             index = ci
    //         }
    //     })
    //     if (data.value === '业务数据') {
    //         sheet.style.display = 'block'
    //         axial.style.display = 'none'
    //         parent.choice(parent.Controls.ControlList[index].TabEvent, index, true)
    //         // table.innerHTML = ``
    //         // table1.style.display = 'none'
    //         // table2.style.display = 'block'
    //     } else {
    //         sheet.style.display = 'none'
    //         axial.style.display = 'block'
    //         parent.choice(parent.Controls.ControlList[index].TabEvent, index)
    //     }
    // })
    
    // 数据关联
    form.on(`select(data)`, function(data) {
        let sheet = document.getElementById('data-sheet')
        let axial = document.getElementById('axial')
        let table = document.getElementById('ax-table')
        if (BarChartData.defaultDataConfig.datatype === data.value) {
            return
        }
        // let table1 = document.getElementById('chart-table1')
        // let table2 = document.getElementById('chart-table2')
        BarChartData.defaultDataConfig.datatype = data.value
        let index = null
        parent.Controls.ControlList.forEach((c, ci)=> {
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

        if (data.value === '业务数据') {
            sheet.style.display = 'block'
            axial.style.display = 'none'
            let lis = ``
            request.get(`/bi/${parent.appId}/business`).then(res => {
                BarChartData.defaultDataConfig.dataChart = res.data.data
                res.data.data.forEach(item => {
                    if (item.nameCn === BarChartData.defaultDataConfig.tablename) {
                        lis+=`<option value="${item.nameEn}" selected >${item.nameCn}</option>` 
                        BarChartData.defaultDataConfig.tablevalue = item.nameEn
                    } else {
                        lis+=`<option value="${item.nameEn}">${item.nameCn}</option>`
                    }
                })
                $('#chart-table').html(lis)
                form.render()
                parent.choice(parent.Controls.ControlList[index].TabEvent, index, true)
            })
        } else {
            sheet.style.display = 'none'
            axial.style.display = 'block'
            parent.choice(parent.Controls.ControlList[index].TabEvent, index)
        }
    })

     // 数据表
     form.on(`select(chart-data)`, function(data) {
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
        parent.Controls.ControlList.forEach((c, ci)=> {
            if (c.Name === BarChartData.name) {
                index = ci
            }
            if (types.includes(c.ControlType)) {
                c.EchartList.forEach((f,fi) => {
                    if (f.name === BarChartData.name) {
                        parent.Controls.ControlList[ci].EchartList.splice(fi, 1)  
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
        parent.choice(parent.Controls.ControlList[index].TabEvent, index, true)
    })
    // 横轴。维度
    form.on(`select(data-dimen)`, function(data) {
        BarChartData.defaultDataConfig.xaxistype = data.value
        let content = document.getElementById('data-content')
        let html = renderDimen(data.value)
        content.innerHTML = html
        form.render()
    })
    // 时间
    form.on(`select(data-time)`, function(data) {
        BarChartData.defaultDataConfig.timedate = data.value
    })
    // 变量
    form.on(`select(data-variable)`, function(data) {
        BarChartData.defaultDataConfig.datavariable = data.value
    })
    //y轴自适应
    form.on('checkbox(yshow)', function (show) {
        var value = show.elem.checked
        BarChartData.option.AxisChartYAxis.Adaptive = value
        BarEchartsFun(BarChartData,"save")
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //y字号
    $('#ySize').unbind("input")
    $("#ySize").on("input",function(){
        let value = $("#ySize").val()
        BarChartData.option.AxisChartYAxis.FontSize = value
        BarEchartsFun(BarChartData,"save")
    })
    //y轴分割线
    form.on('checkbox(yshowLine)', function (show) {
        var value = show.elem.checked
        BarChartData.option.AxisChartYAxis.ShowSeparator = value
        BarEchartsFun(BarChartData,"save")
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //上边距
    $('#topMar').unbind("input")
    $("#topMar").on("input",function(){
        let value = $("#topMar").val()
        BarChartData.option.DrawContent.TopMargin = value
        BarEchartsFun(BarChartData,"save")
    })
    //下边距
    $('#bottomMar').unbind("input")
    $("#bottomMar").on("input",function(){
        let value = $("#bottomMar").val()
        BarChartData.option.DrawContent.BottomMargin = value
        BarEchartsFun(BarChartData,"save")

    })
    //左边距
    $('#letfMar').unbind("input")
    $("#letfMar").on("input",function(){
        let value = $("#letfMar").val()
        BarChartData.option.DrawContent.LeftMargin = value
        BarEchartsFun(BarChartData,"save")
    })
    //右边距
    $('#rightMar').unbind("input")
    $("#rightMar").on("input",function(){
        let value = $("#rightMar").val()
        BarChartData.option.DrawContent.RightMargin = value
        BarEchartsFun(BarChartData,"save")
    })
    //标题
    $('#title').unbind("input")
    $("#title").on("input",function(){
        let value = $("#title").val()
        BarChartData.option.Title.Title = value
        BarEchartsFun(BarChartData,"save")
    })
    //标题是否显示
    form.on('checkbox(titleShow)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Show = value
        BarEchartsFun(BarChartData,"save")
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //左标题
    form.on('radio(leftTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'left'
        BarEchartsFun(BarChartData,"save")
    });
    //居中标题
    form.on('radio(conterTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'Center'
        BarEchartsFun(BarChartData,"save")
    });
    //右标题
    form.on('radio(rightTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'right'
        BarEchartsFun(BarChartData,"save")
    });
    //y字号
    $('#titleSize').unbind("input")
    $("#titleSize").on("input",function(){
        let value = $("#titleSize").val()
        BarChartData.option.Title.FontSize = value
        BarEchartsFun(BarChartData,"save")
    })
    //右图例
    form.on('radio(rightLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'RightCenter'
        BarEchartsFun(BarChartData,"save")
    });
     //左图例
     form.on('radio(leftLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'LeftCenter'
        BarEchartsFun(BarChartData,"save")
    });
    //底图例
    form.on('radio(bottomLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'BottomCenter'
        BarEchartsFun(BarChartData,"save")
    });
    //顶图例
    form.on('radio(topLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'TopCenter'
        BarEchartsFun(BarChartData,"save")
    });
    //图例是否显示
    form.on('checkbox(legendShow)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Show = value
        BarEchartsFun(BarChartData,"save")
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //标签是否显示
    form.on('checkbox(LabelShow)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Label.Show = value
        BarEchartsFun(BarChartData,"save")
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
    });
    //标签字号
    $('#LabelSize').unbind("input")
    $("#LabelSize").on("input",function(){
        let value = $("#LabelSize").val()
        BarChartData.option.Label.FontSize = value
        BarEchartsFun(BarChartData,"save")
    })
    $("#LabelSize").keydown(function (e) {
        if (e.keyCode == 13) {
            return false;   //禁止回车from刷新
        }
    })
    //风格1
    $('#style1').unbind()
    $('#style1').on('click',function(){
        var color1 = ['#ffa3a3','#ffe08c','#55baf9','#91E2FF','#81F4DC','#C4FFEE']
        // changeColor(color1)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color1[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color1
        BarEchartsFun(BarChartData,"save")
    })
    //风格2
    $('#style2').unbind()
    $('#style2').on('click',function(){
        var color2 = ['#434D72','#376CF0','#4BC6E0','#BCCDD4','#89E217','#1B986C']
        // changeColor(color2)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color2[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color2
        BarEchartsFun(BarChartData,"save")
    })
    //风格3
    $('#style3').unbind()
    $('#style3').on('click',function(){
        var color3 = ['#C3C5C9','#385CE3','#6096FE','#626894','#F06981','#FBA6B9']
        // changeColor(color3)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color3[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color3
        BarEchartsFun(BarChartData,"save")
    })
    //风格4
    $('#style4').unbind()
    $('#style4').on('click',function(){
        var color4 = ['#567BF5','#5EB0FB','#FFC23E','#53596F','#89D331','#FFA351']
        // changeColor(color4)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color4[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color4
        BarEchartsFun(BarChartData,"save")
    })
    //添加辅助线
    $('#addAuxiliary').unbind()
    $('#addAuxiliary').on('click',function(){
        var aDom = $('.auxiliary_box')
        var data = addAuxiliaryLines(aDom)
        BarEchartsFun(data)
       AuxiliaryLinesFun()
    })
    //删除辅助线
    $('.auxiliary_box').unbind()
    $('.auxiliary_box').on('click','.AdeleteDom',function(){  
       deleteAuxiliaryLines($(this))
       AuxiliaryLinesFun()
    })

    //柱形图
    form.on('radio(barType)', function (show) {
        $("#letfMar").val('55')
        if(BarChartData.option.AxisChartYAxis.yAxisData != null){
            let data = JSON.parse(JSON.stringify(BarChartData.option.AxisChartYAxis.yAxisData))
            BarChartData.option.XData = data
            BarChartData.option.IsBarType = false
            BarChartData.option.AxisChartYAxis.yAxisData = null
            BarChartData.option.DrawContent.LeftMargin = '55'
        }
        BarChartData.option.IsTime = true
        BarChartData.option.chartValue = 1
        BarEchartsFun(BarChartData,"save")

    });
    //堆积柱形图
    form.on('radio(barType1)', function (show) {
        $("#letfMar").val('55')
        if(BarChartData.option.AxisChartYAxis.yAxisData != null){
            let data = JSON.parse(JSON.stringify(BarChartData.option.AxisChartYAxis.yAxisData))
            BarChartData.option.XData = data
            BarChartData.option.IsBarType = true
            BarChartData.option.AxisChartYAxis.yAxisData = null
            BarChartData.option.DrawContent.LeftMargin = '55'
        }
        BarChartData.option.IsTime = false
        BarChartData.option.chartValue = 2
        BarEchartsFun(BarChartData,"save")
    });
    //条形图
    form.on('radio(barType3)', function (show) {
        $("#letfMar").val('95')
        if(BarChartData.option.XData != null){
            let data = JSON.parse(JSON.stringify(BarChartData.option.XData))
            BarChartData.option.AxisChartYAxis.yAxisData = data
            BarChartData.option.IsBarType = false
            BarChartData.option.XData = null
            BarChartData.option.DrawContent.LeftMargin = '95'
        }
        BarChartData.option.IsTime = true
        BarChartData.option.chartValue = 3
        BarEchartsFun(BarChartData,"save")
    });
    //堆积条形图
    form.on('radio(barType4)', function (show) {
        $("#letfMar").val('95')
        if(BarChartData.option.XData != null){
            let data = JSON.parse(JSON.stringify(BarChartData.option.XData))
            BarChartData.option.AxisChartYAxis.yAxisData = data
            BarChartData.option.IsBarType = true
            BarChartData.option.XData = null
            BarChartData.option.DrawContent.LeftMargin = '95'
        }
       
        BarChartData.option.IsTime = false
        BarChartData.option.chartValue = 4
        BarEchartsFun(BarChartData,"save")
    });

    //数值标签字体
    form.on(`select(LabelFontFamily)`, function(size){
        BarChartData.option.Label.FontFamily = size.value
        BarEchartsFun(BarChartData,"save")
    });
    //图例字体
    form.on(`select(LegendFontFamily)`, function(size){
        BarChartData.option.Legend.FontFamily = size.value
        BarEchartsFun(BarChartData,"save")
    });
    //y轴字体
    form.on(`select(YAxiosFontFamily)`, function(size){
        BarChartData.option.AxisChartYAxis.FontFamily = size.value
        BarEchartsFun(BarChartData,"save")
    });
    //x轴字体
    form.on(`select(XAxiosFontFamily)`, function(size){
        BarChartData.option.XAxis.FontFamily = size.value
        BarEchartsFun(BarChartData,"save")
    });
    //标题字体
    form.on(`select(TitleFontFamily)`, function(size){
        BarChartData.option.Title.FontFamily = size.value
        BarEchartsFun(BarChartData,"save")
    });
    //图例字号
    $('#LegendSize').unbind("input")
    $("#LegendSize").on("input",function(){
        let value = $("#LegendSize").val()
        BarChartData.option.Legend.FontSize = value
        BarEchartsFun(BarChartData,"save")
    })
    //标题加粗
    $('#titleWeight').on('click',function(){
        if(BarChartData.option.Title.FontWeight == 400){
            $('#titleWeight i').css('color','#000')
            BarChartData.option.Title.FontWeight = 800
        }else{
            $('#titleWeight i').css('color','#999')
            BarChartData.option.Title.FontWeight = 400
        }
        BarEchartsFun(BarChartData,"save")
    })
     //y轴标题
     form.on(`checkbox(YtitleShow1)`, function (show) {
        var value = show.elem.checked
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
        BarChartData.option.AxisChartYAxis.ShowTitle = value
        BarEchartsFun(BarChartData,"save")
    });
     //y轴单位
     form.on(`checkbox(YunitShow1)`, function (show) {
        var value = show.elem.checked
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
        BarChartData.option.AxisChartYAxis.ShowUnit = value
        BarEchartsFun(BarChartData,"save")
    });

    //收缩
    // $('.iconBox').on('click',function(){
    //     var Parent = $(this).parents('.echarts_jt').find('.formBox')
    //     var name = $(this).attr('name')
    //     var num = $(this).attr('num')
    //     if(name == 'false'){
    //         Parent.css('overflow','hidden')
    //         Parent.animate({height:'0px',padding:'0',overflow:'hidden'});
    //         $(this).attr('name','true')
    //         $(this).find('i').removeClass('layui-icon-up')
    //         $(this).find('i').addClass('layui-icon-down')
    //     }else{
    //         Parent.css('overflow','inherit')
    //         Parent.animate({height:`${num}px`,padding:'20px 0 20px 20px',overflow:'inherit'});
    //         $(this).attr('name','false')
    //         $(this).find('i').removeClass('layui-icon-down')
    //         $(this).find('i').addClass('layui-icon-up')
    //     }
    // })

}

//右侧图标配置栏展开收起
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



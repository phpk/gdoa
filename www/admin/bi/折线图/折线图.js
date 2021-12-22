/*
 * @Description: 这是***页面（组件）
 * @Date: 2021-03-04 18:52:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-06 17:35:11
 */
var layer = layui.layer;
var form = layui.form;
form.render();
var colorpicker = layui.colorpicker;

//折线图改变
function LineEchartsFun(BarChartData,type){
    let data = []
    data.push(BarChartData)
    parent.LinechartEcharts(data,BarChartData.name)
    if(type){
        window.parent.back(window.parent.selectdata,window.parent.Controls)
    }
}

// 修改check默认值
function checkFunInit(){
    form.render();
    // setTimeout(()=>{
        try {
            if(BarChartData.option.YAxises[0].Adaptive){
                $('#yshow1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#yshow1')[0].nextSibling.style.background = '#fff'
            }
            if(BarChartData.option.YAxises[0].ShowSeparator){
                $('#yshowLine1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#yshowLine1')[0].nextSibling.style.background = '#fff'
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
            if(BarChartData.option.YAxises[0].ShowTitle){
                $('#YtitleShow1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#YtitleShow1')[0].nextSibling.style.background = '#fff'
            }
            if(BarChartData.option.YAxises[0].ShowUnit){
                $('#YunitShow1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#YunitShow1')[0].nextSibling.style.background = '#fff'
            }
        } catch(err) {
            //在此处理错误
            console.log('这是一段贼神奇的代码006！！！')
        }
    // },50)
}

//折线图初始化
function LineinitEchart(data,name,type){
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
    //初始化折线图配置
    let xColor = BarChartData.option.XAxis.Color.HtmlColor  
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
    $("#xSize").val(BarChartData.option.XAxis.FontSize)
   
    $('#yName1').val(BarChartData.option.YAxises[0].Name)
    $('#yUnite1').val(BarChartData.option.YAxises[0].Unit)
    $('#yMax1').val(BarChartData.option.YAxises[0].Max)
    $('#yMin1').val(BarChartData.option.YAxises[0].Min)
    $('#yshow1').prop("checked",BarChartData.option.YAxises[0].Adaptive)
    $('#ySize1').val(BarChartData.option.YAxises[0].FontSize)
    $('#yshowLine1').prop("checked",BarChartData.option.YAxises[0].ShowSeparator)
    $('#YAxiosFontFamily1').prop("checked",BarChartData.option.YAxises[0].FontFamily)
    if(BarChartData.option.Title.FontWeight == 400){
        $('#titleWeight i').css('color','#999')
    }else{
        $('#titleWeight i').css('color','#000')
    }
    $('#TitleFontFamily').val(BarChartData.option.Title.FontFamily)
    $('#TextFontFamily').val(BarChartData.option.Label.FontFamily)
    $('#LegendFontFamily').val(BarChartData.option.Legend.FontFamily)
    $('#XAxiosFontFamily').val(BarChartData.option.XAxis.FontFamily)
    

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
    $('#legendSize').val(BarChartData.option.Legend.FontSize)
    form.render();
    checkFunInit()
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
    //        LineEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test0`,
        color: xColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.XAxis.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
           LineEchartsFun(BarChartData)
            
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
    //         var aa =  hexify(color)
    //         BarChartData.option.Title.Color.HtmlColor = color
    //        LineEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test2`,
        color: TitleColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.Title.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
           LineEchartsFun(BarChartData)
            
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
    //        LineEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        type:'iframe',
        el: `test3`,
        color: LegendColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.Legend.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
           LineEchartsFun(BarChartData)
            
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
    //        LineEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        el: `test4`,
        color: LegendColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.Label.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
           LineEchartsFun(BarChartData)
            
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
    //        LineEchartsFun(BarChartData,"save")
    //     }
    // });
    Colorpicker.create({
        el: `test5`,
        color: BackgroundColor,
        change: function (elem, hex, rgba) {
            elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
            BarChartData.option.BackgroundColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
           LineEchartsFun(BarChartData)
            
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
       LineEchartsFun(BarChartData,"save")
    })
    $("#xSize").keydown(function (e) {
        if (e.keyCode == 13) {
            return false;   //禁止回车from刷新
        }
    })

    //图例字号
    $('#legendSize').unbind("input")
    $("#legendSize").on("input",function(){
        let value = $("#legendSize").val()
        BarChartData.option.Legend.FontSize = value
       LineEchartsFun(BarChartData,"save")
    })
    //加粗
    $('#titleWeight').on('click',function(){
        if(BarChartData.option.Title.FontWeight == 400){
            $('#titleWeight i').css('color','#000')
            BarChartData.option.Title.FontWeight = 800
        }else{
            $('#titleWeight i').css('color','#999')
            BarChartData.option.Title.FontWeight = 400
        }
       LineEchartsFun(BarChartData,"save")
    })

    // 数据关联
    form.on(`select(data)`, function(data) {
        if (BarChartData.defaultDataConfig.datatype === data.value) {
            return
        }
        let sheet = document.getElementById('data-sheet')
        let axial = document.getElementById('axial')
        let table = document.getElementById('ax-table')
        let realTime = document.getElementById('realTime')
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

        if (data.value === '实时数据') {
            axial.style.display = 'none'
            realTime.style.display = 'block'
            form.render()
            parent.choice(parent.Controls.ControlList[index].TabEvent, index)
        } else if (data.value === '业务数据') {
            realTime.style.display = 'none' 
            sheet.style.display = 'block'
            axial.style.display = 'none'
            let lis = ``
            request.get(`/bi/${parent.appId}/business`).then(res => {
                res.data.data = res.data.data ? res.data.data : []
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
            realTime.style.display = 'none' 
            sheet.style.display = 'none'
            axial.style.display = 'block'
            form.render('select', 'form-dimen')
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
            // if (c.ControlType === 'associatedatetimepicker') {
            //     c.EchartList.forEach((f,fi) => {
            //         if (f.name === BarChartData.name) {
            //             parent.Controls.ControlList[ci].EchartList.splice(fi, 1)  
            //         }
            //     })
            // } else if (c.ControlType === 'datasearch') {
            //     c.EchartList.forEach((f,fi) => {
            //         if (f.name === BarChartData.name) {
            //             parent.Controls.ControlList[ci].EchartList.splice(fi, 1)  
            //         }
            //     })
    
            // } else if (c.ControlType === 'textsearch') {
            //     c.EchartList.forEach((f,fi) => {
            //         if (f.name === BarChartData.name) {
            //             parent.Controls.ControlList[ci].EchartList.splice(fi, 1)  
            //         }
            //     })
    
            // } else if (c.ControlType === 'dropsearch') {
            //     c.EchartList.forEach((f,fi) => {
            //         if (f.name === BarChartData.name) {
            //             parent.Controls.ControlList[ci].EchartList.splice(fi, 1)  
            //         }
            //     })
    
            // }

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
    //标题字体
    form.on(`select(TitleFontFamily)`, function(size){
        BarChartData.option.Title.FontFamily = size.value
       LineEchartsFun(BarChartData,"save")
    });
    //标签字体
    form.on(`select(TextFontFamily)`, function(size){
        BarChartData.option.Label.FontFamily = size.value
       LineEchartsFun(BarChartData,"save")
    });
    //图例字体
    form.on(`select(LegendFontFamily)`, function(size){
        BarChartData.option.Legend.FontFamily = size.value
       LineEchartsFun(BarChartData,"save")
    });
    //x轴字体
    form.on(`select(XAxiosFontFamily)`, function(size){
        BarChartData.option.XAxis.FontFamily = size.value
       LineEchartsFun(BarChartData,"save")
    });

    //上边距
    $('#topMar').unbind("input")
    $("#topMar").on("input",function(){
        let value = $("#topMar").val()
        BarChartData.option.DrawContent.TopMargin = value
       LineEchartsFun(BarChartData,"save")
    })
    //下边距
    $('#bottomMar').unbind("input")
    $("#bottomMar").on("input",function(){
        let value = $("#bottomMar").val()
        BarChartData.option.DrawContent.BottomMargin = value
       LineEchartsFun(BarChartData,"save")
    })
    //左边距
    $('#letfMar').unbind("input")
    $("#letfMar").on("input",function(){
        let value = $("#letfMar").val()
        BarChartData.option.DrawContent.LeftMargin = value
       LineEchartsFun(BarChartData,"save")
    })
    //右边距
    $('#rightMar').unbind("input")
    $("#rightMar").on("input",function(){
        let value = $("#rightMar").val()
        BarChartData.option.DrawContent.RightMargin = value
       LineEchartsFun(BarChartData,"save")
    })
    //标题
    $('#title').unbind("input")
    $("#title").on("input",function(){
        let value = $("#title").val()
        BarChartData.option.Title.Title = value
       LineEchartsFun(BarChartData,"save")
    })
    //标题是否显示
    form.on('checkbox(titleShow)', function (show) {
        var value = show.elem.checked
         if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
        BarChartData.option.Title.Show = value
       LineEchartsFun(BarChartData,"save")
    });
    //左标题
    form.on('radio(leftTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'left'
       LineEchartsFun(BarChartData,"save")
    });
    //居中标题
    form.on('radio(conterTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'Center'
       LineEchartsFun(BarChartData,"save")
    });
    //右标题
    form.on('radio(rightTitle)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Title.Position = 'right'
       LineEchartsFun(BarChartData,"save")
    });
  
    //y字号
    $('#titleSize').unbind("input")
    $("#titleSize").on("input",function(){
        let value = $("#titleSize").val()
        BarChartData.option.Title.FontSize = value
       LineEchartsFun(BarChartData,"save")
    })

    //右图例
    form.on('radio(rightLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'RightCenter'
       LineEchartsFun(BarChartData,"save")
    });
     //左图例
     form.on('radio(leftLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'LeftCenter'
       LineEchartsFun(BarChartData,"save")
    });
    //底图例
    form.on('radio(bottomLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'BottomCenter'
       LineEchartsFun(BarChartData,"save")
    });
    //顶图例
    form.on('radio(topLegend)', function (show) {
        var value = show.elem.checked
        BarChartData.option.Legend.Position = 'TopCenter'
       LineEchartsFun(BarChartData,"save")
    });
    //图例是否显示
    form.on('checkbox(legendShow)', function (show) {
        var value = show.elem.checked
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
        BarChartData.option.Legend.Show = value
       LineEchartsFun(BarChartData,"save")
    });
    //标签是否显示
    form.on('checkbox(LabelShow)', function (show) {
        var value = show.elem.checked
        if(value){
            show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
        }else{
            show.elem.nextSibling.style.background = '#fff'
        }
        BarChartData.option.Label.Show = value
       LineEchartsFun(BarChartData,"save")
    });
    //标签字号
    $('#LabelSize').unbind("input")
    $("#LabelSize").on("input",function(){
        let value = $("#LabelSize").val()
        BarChartData.option.Label.FontSize = value
       LineEchartsFun(BarChartData,"save")
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
       LineEchartsFun(BarChartData,"save")
    })
    //风格2
    $('#style2').unbind()
    $('#style2').on('click',function(){ //风格2
        var color2 = ['#434D72','#376CF0','#4BC6E0','#BCCDD4','#89E217','#1B986C']
        // changeColor(color2)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color2[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color2
       LineEchartsFun(BarChartData,"save")
    })
    //风格3
    $('#style3').unbind()
    $('#style3').on('click',function(){ //风格3
        var color3 = ['#C3C5C9','#385CE3','#6096FE','#626894','#F06981','#FBA6B9']
        // changeColor(color3)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color3[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color3
       LineEchartsFun(BarChartData,"save")
    })
    //风格4
    $('#style4').unbind()
    $('#style4').on('click',function(){ //风格4
        var color4 = ['#567BF5','#5EB0FB','#FFC23E','#53596F','#89D331','#FFA351']
        // changeColor(color4)
        var VariablesArr = BarChartData.option.Variables
        for(let i=0;i<VariablesArr.length;i++){
            VariablesArr[i].Color.HtmlColor = color4[i]
        }
        BarChartData.option.Variables = VariablesArr
        BarChartData.option.color = color4
       LineEchartsFun(BarChartData,"save")
    })

     //初始折线Y轴
     yAxisInitFun()
     yFun()
    function yFun(){   //绑定事件
        var indexArr = []
        let YAxises = BarChartData.option.YAxises
        for(let i=0;i<$('.yBox').length;i++){  //y轴name名称
            var name = $($('.yBox')[i]).attr('name')
            indexArr.push(name)
        }
        $('#yDom').unbind('input')
        for(let j=0;j<=indexArr.length-1;j++){
            //y轴名称
            $('#yDom').on('input',`#yName${indexArr[j]}`,function(){  
                let value = $(this).val()
                YAxises[j].Name = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData)
            })
            //y轴单位
            $('#yDom').on('input',`#yUnite${indexArr[j]}`,function(){  
                let value = $(this).val()
                YAxises[j].Unit = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData)
            })
            //y轴最大值
            $('#yDom').on('input',`#yMax${indexArr[j]}`,function(){  
                let value = $(this).val()
                YAxises[j].Max = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData)
            })
            //y轴最小值
            $('#yDom').on('input',`#yMin${indexArr[j]}`,function(){  
                let value = $(this).val()
                YAxises[j].Min = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData)
            })
        
            //y轴颜色项
            // colorpicker.render({
            //     elem: `#Ycolor${indexArr[j]}`
            //     ,color: `${BarChartData.option.YAxises[j].Color.HtmlColor}` //hex
            //     ,alpha: true //开启透明度
            //     ,format: 'rgb'
            //     ,predefine: true 
            //     ,done: function(color){
            //         var aa =  hexify(color)
            //         YAxises[j].Color.HtmlColor = color
            //         YAxises[j].FontColor.HtmlColor = color
            //         YAxises[j].AxisColor.HtmlColor = color
            //         BarChartData.option.YAxises = YAxises
            //        LineEchartsFun(BarChartData,"save")
            //     }
            // });
            Colorpicker.create({
                el: `Ycolor${indexArr[j]}`,
                color:`${BarChartData.option.YAxises[j].Color.HtmlColor}`,
                change: function (elem, hex, rgba) {
                    elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    // BarChartData.option.BackgroundColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    YAxises[j].Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    YAxises[j].FontColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    YAxises[j].AxisColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                    BarChartData.option.YAxises = YAxises
                   LineEchartsFun(BarChartData)
                    
                }
            })

            //y字号
            $('#yDom').on('input',`#ySize${indexArr[j]}`,function(){  
                let value = $(this).val()
                YAxises[j].FontSize = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData,"save")
            })

            //y轴自适应
            form.on(`checkbox(yshow${indexArr[j]})`, function (show) {
                var value = show.elem.checked
                YAxises[j].Adaptive = value
                if(value){
                    show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    show.elem.nextSibling.style.background = '#fff'
                }
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData,"save")
            });
            //y轴分割线
            form.on(`checkbox(yshowLine${indexArr[j]})`, function (show) {
                var value = show.elem.checked
                if(value){
                    show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    show.elem.nextSibling.style.background = '#fff'
                }
                YAxises[j].ShowSeparator = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData,"save")
            });
             //y轴标题
             form.on(`checkbox(YtitleShow${indexArr[j]})`, function (show) {
                var value = show.elem.checked
                if(value){
                    show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    show.elem.nextSibling.style.background = '#fff'
                }
                YAxises[j].ShowTitle = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData,"save")
            });
             //y轴单位
             form.on(`checkbox(YunitShow${indexArr[j]})`, function (show) {
                var value = show.elem.checked
                if(value){
                    show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                }else{
                    show.elem.nextSibling.style.background = '#fff'
                }
                YAxises[j].ShowUnit = value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData,"save")
            });
            //y轴字体
            form.on(`select(YAxiosFontFamily${indexArr[j]})`, function(size){
                YAxises[j].FontFamily = size.value
                BarChartData.option.YAxises = YAxises
               LineEchartsFun(BarChartData,"save")
            });
        }
    }

    //初始折线Y轴
    function yAxisInitFun(){
        let YAxisesArr = BarChartData.option.YAxises
        var yDom = $('#yDom')
        $('.deleteYBox').remove()
        var dom = ''
        for(let i=0;i<YAxisesArr.length;i++){
            if(i != 0){
                let = yBox = YAxisesArr[i].yIndex
                dom = dom +  `<div style="margin-top:16px;" class="yBox${yBox} deleteYBox left2">y轴${yBox}</div>
                <div class="yBox yBox${yBox} deleteYBox" style="position:relative" name="${yBox}">
        
                    <div class="left3">
                        <input id="YtitleShow${yBox}" lay-filter="YtitleShow${yBox}" type="checkbox" checked>
                        <div class="showLin axisText">显示轴标题</div>
                    </div>
                    <div class="showLin left3 inputBox">
                        <input id="yName${yBox}" type="text" value="${YAxisesArr[i].Name}" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                    </div>
                    <div class="left3">
                        <input id="YunitShow${yBox}" lay-filter="YunitShow${yBox}" type="checkbox" checked>
                        <div class="showLin axisText">显示轴单位</div>
                    </div>
                    <div>
                    <div class="showLin left3 inputBox">
                        <input id="yUnite${yBox}" type="text" value="${YAxisesArr[i].Unit}" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="left3 axios_mar">
                    <div class="showLin">最大值</div>
                    <div class="showLin" style="width:90px">
                        <input id="yMax${yBox}" type="text" value="${YAxisesArr[i].Max}" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                    </div>
                    <div class="showLin unit">最小值</div>
                    <div class="showLin" style="width:90px">
                        <input id="yMin${yBox}" type="text" value="${YAxisesArr[i].Min}" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                    </div>
                    <input class="ySelectShow${yBox}" lay-filter="yshow${yBox}" type="checkbox" checked>
                    <div class="showLin">自适应</div>
                </div>
                <div class="left3 axios_mar">轴样式</div>
                <div class="left4" style="margin-top:10px">字体</div>
                <div class="echartsTile1 left4">
                    <select id="YAxiosFontFamily${yBox}" lay-filter="YAxiosFontFamily${yBox}" name="city" lay-verify="required">
                        <option value="思源黑体" ${YAxisesArr[i].FontFamily == '思源黑体'?'selected':''}>思源黑体</option>
                        <option value="微软雅黑" ${YAxisesArr[i].FontFamily == '微软雅黑'?'selected':''}>微软雅黑</option>
                        <option value="宋体" ${YAxisesArr[i].FontFamily == '宋体'?'selected':''}>宋体</option>
                        <option value="黑体" ${YAxisesArr[i].FontFamily == '黑体'?'selected':''}>黑体</option>
                        <option value="楷体" ${YAxisesArr[i].FontFamily == '楷体'?'selected':''}>楷体</option>
                        <option value="仿宋" ${YAxisesArr[i].FontFamily == '仿宋'?'selected':''}>仿宋</option>
                    </select>
                </div>
                <div class="axios_mar">
                    <div class="xSize showLin left3">字号:</div>
                    <div class="xselect xselect showLin">
                        <input id="ySize${yBox}" type="text" value="${YAxisesArr[i].FontSize}" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                    </div>
                    <div class="xColor showLin">颜色:</div>
                    <div id="Ycolor${yBox}" class="colorBlock showLin"></div>
                    <input class="yshowLine${yBox}" lay-filter="yshowLine${yBox}" type="checkbox" checked>
                    <div class="showLin">分割线</div>
                </div>
                <div class="deleteDom" style="position:absolute;top:0px;right:20px;width:20px;height:20px;cursor:pointer">
                    <i class="layui-icon layui-icon-close-fill" style="color:rgba(153, 153, 153, 1);font-size:20px"></i>
                </div>
                </div>`
            }
        }
        yDom.append(dom)
        form.render();
        //重新赋值其他input样式
        checkFunInit()
        //重新赋值y轴input样式
        inputCheckFun()
        yFun()
    }
    //重新赋值y轴input样式
    function inputCheckFun(){
        // form.render();
        let YAxisesArr = BarChartData.option.YAxises
        if(YAxisesArr.length !=0 && YAxisesArr.length !=1){
            for(let i=0;i<YAxisesArr.length;i++){
                if(i != 0){
                    let yBox = YAxisesArr[i].yIndex
                    //  setTimeout(()=>{
                        if(YAxisesArr[i].ShowUnit){  //单位
                            $(`#YunitShow${yBox}`)[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                        }else{
                            $(`#YunitShow${yBox}`)[0].nextSibling.style.background = '#fff'
                        }
                        if(YAxisesArr[i].ShowTitle){  //轴名
                            $(`#YtitleShow${yBox}`)[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                        }else{
                            $(`#YtitleShow${yBox}`)[0].nextSibling.style.background = '#fff'
                        }
                        if(YAxisesArr[i].ShowSeparator){  //分割线
                            $(`.yshowLine${yBox}`)[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                        }else{
                            $(`.yshowLine${yBox}`)[0].nextSibling.style.background = '#fff'
                        }
                        if(YAxisesArr[i].Adaptive){   //自适应
                            $(`.ySelectShow${yBox}`)[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
                        }else{
                            $(`.ySelectShow${yBox}`)[0].nextSibling.style.background = '#fff'
                        }   
                    // },50)
                }
            }
        }
    }
    //添加y轴dom
    $('#add').unbind()
    $('#add').on('click',function(){
        var yDom = $('#yDom')
        var ylength = $('.yBox').length - 1
        var yindex = $('.yBox')[ylength]
        var yBox = Number($(yindex).attr('name')) + 1
        var dom = `<div style="margin-top:16px;" class="yBox${yBox} deleteYBox axios_mar1">y轴${yBox}</div>
        <div class="yBox yBox${yBox} deleteYBox" style="position:relative" name="${yBox}">
            <div class="axios_mar1">
                <input id="YtitleShow${yBox}" lay-filter="YtitleShow${yBox}" type="checkbox" checked>
                <div class="showLin axisText">显示轴标题</div>
            </div>
            <div class="showLin axios_mar1 inputBox">
                <input id="yName${yBox}" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
            </div>
            <div class="axios_mar1">
                <input id="YunitShow${yBox}" lay-filter="YunitShow${yBox}" type="checkbox" checked>
                <div class="showLin axisText">显示轴单位</div>
            </div>
            <div>
            <div class="showLin axios_mar1 inputBox">
                <input id="yUnite${yBox}" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="axios_mar1 axios_mar">
            <div class="showLin">最大值</div>
            <div class="showLin" style="width:90px">
                <input id="yMax${yBox}" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
            </div>
            <div class="showLin unit">最小值</div>
            <div class="showLin" style="width:90px">
                <input id="yMin${yBox}" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
            </div>
            <input class="ySelectShow${yBox}" lay-filter="yshow${yBox}" type="checkbox" checked>
            <div class="showLin">自适应</div>
        </div>
        <div class="axios_mar1 axios_mar">轴样式</div>
        <div class="axios_mar1">
        <div class="axios_mar1" style="margin-top:10px">字体</div>
        <div class="echartsTile1 axios_mar1">
            <select id="YAxiosFontFamily${yBox}" lay-filter="YAxiosFontFamily${yBox}" name="city" lay-verify="required">
                <option value="思源黑体">思源黑体</option>
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
                <option value="黑体">黑体</option>
                <option value="楷体">楷体</option>
                <option value="仿宋">仿宋</option>
            </select>
        </div>
        <div class="axios_mar">
            <div class="xSize showLin axios_mar1">字号:</div>
            <div class="xselect xselect showLin">
                <input id="ySize${yBox}" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
            </div>
            <div class="xColor showLin">颜色:</div>
            <div id="Ycolor${yBox}" class="colorBlock showLin"></div>
            <input class="yshowLine${yBox}" lay-filter="yshowLine${yBox}" type="checkbox" checked>
            <div class="showLin">分割线</div>
        </div>
        </div>
        <div class="deleteDom" style="position:absolute;top:0px;right:20px;width:20px;height:20px;cursor:pointer">
            <i class="layui-icon layui-icon-close-fill" style="color:rgba(153, 153, 153, 1);font-size:20px"></i>
        </div>
        </div>`
        yDom.append(dom);
        form.render();
        checkFunInit()
        let YAxises = BarChartData.option.YAxises
        let YAxisesArr ={
            "ShowSeparator": true,
            "Name": null,
            "Unit": null,
            "Min": null,
            "Max": null,
            "Adaptive": true,
            "Color": {
            "HtmlColor": "#333333ff"
            },
            "FontColor": {
            "HtmlColor": "#333333ff"
            },
            "AxisColor": {
            "HtmlColor": "#333333ff"
            },
            "FontWeight": null,
            "SplitLine": false,
            "FontFamily": "思源黑体",
            "SplitLineFontWeight": null,
            "SplitLineWidth": 1.0,
            "SplitLineColor": {
            "HtmlColor": "#999999ff"
            },
            "SplitLineShow": false,
            "FontSize": 14,
            "ShowTitle":true,
            "ShowUnit":true,
            "yIndex":yBox
        }
        YAxises.push(YAxisesArr)   //添加空y轴
        BarChartData.option.YAxises = YAxises
        var MarRight = Number(BarChartData.option.DrawContent.RightMargin) + 50  //右边距+50
        BarChartData.option.DrawContent.RightMargin = MarRight
       LineEchartsFun(BarChartData,"save")
        yFun()
        // YAxisesFun()  //调用varEcharts.js
        changeAYdata()
        inputCheckFun()
    })

    //删除y轴
    $('#yDom').unbind('click')
    $('#yDom').on('click','.deleteDom',function(){  
        var index = $(this).parents('.yBox').attr('name')
        var yIndex
        for(let i=0;i<$('.yBox').length;i++){
            if($($('.yBox')[i]).attr('name') == index){
                yIndex = i
                BarChartData.option.YAxises.splice(i,1)   //删除数据
                var MarRight = Number(BarChartData.option.DrawContent.RightMargin) - 50  //右边距-50
                BarChartData.option.DrawContent.RightMargin = MarRight
               LineEchartsFun(BarChartData,"save")
            }
        }
        $(`.yBox${index}`).remove()   //删除dom
        yFun()
        // YAxisesFun()
        // DeleteYAxisesFun(index,yIndex)
        changeAYdata()
        inputCheckFun()
    })
    //更新y轴辅助线
    function changeAYdata(){
        var YxisesArr = BarChartData.option.YAxises
        var Adom = ''
        for(let i=0;i<YxisesArr.length;i++){
            Adom = Adom + `<option value="${i}" ${i==0?'selected':''}>Y轴${YxisesArr[i].yIndex}</option>`
        }
        $('.aSelect').empty()
        $('.aSelect').append(Adom)
        form.render();
        checkFunInit()
        inputCheckFun()
    }
    //添加辅助线
    $('#addAuxiliary').unbind()
    $('#addAuxiliary').on('click',function(){
        var aDom = $('.auxiliary_box')
        var data = addAuxiliaryLines(aDom)
        LineEchartsFun(data)
        AuxiliaryLinesFun('line')
        checkFunInit()
        inputCheckFun()
    })
    //删除辅助线
    $('#auxiliary_box').unbind()
    $('.auxiliary_box').on('click','.AdeleteDom',function(){  
        deleteAuxiliaryLines($(this),'Line')
        AuxiliaryLinesFun('line')
        checkFunInit()
        inputCheckFun()
    })
     //收缩
    //  $('.iconBox').on('click',function(){
    //     var Parent = $(this).parents('.echarts_jt').find('.formBox')
    //     var name = $(this).attr('name')
    //     var num = $(this).attr('num')
    //     if(name == 'false'){
    //         Parent.css('overflow','hidden')
    //         Parent.animate({height:'0px',padding:'0'});
    //         $(this).attr('name','true')
    //         $(this).find('i').removeClass('layui-icon-up')
    //         $(this).find('i').addClass('layui-icon-down')
    //     }else{
    //         Parent.css('overflow','inherit')
    //         Parent.animate({height:`${num}px`,padding:'20px 0 20px 20px'});
    //         $(this).attr('name','false')
    //         $(this).find('i').removeClass('layui-icon-down')
    //         $(this).find('i').addClass('layui-icon-up')
    //     }
    // })

    //折线图收缩
    // $('.iconBox1').on('click',function(){
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
    //         Parent.css('height','')
    //         Parent.css('overflow','inherit')
    //         Parent.animate({minHeight:`${num}`,padding:'20px 0 20px 20px',overflow:'inherit'});
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
        Parent.show()
        // Parent.css('overflow', 'auto')
        // Parent.animate({
        //     height: `${num}px`,
        //     padding: '20px 0 0 20px'
        // });
        
        $('#'+id).attr('name', 'false')
        $('#'+id).find('i').removeClass('layui-icon-down')
        $('#'+id).find('i').addClass('layui-icon-up')
    }
    
}
// function iconBoxFun1(e,id) {
//     var Parent = $('#'+id).parents('.echarts_jt').find('.formBox')
//     var name = $('#'+id).attr('name')
//     var num = $('#'+id).attr('num')
//     if (name == 'false') {
//         // Parent.css('overflow', 'hidden')
//         // Parent.animate({
//         //     height: '0px',
//         //     padding: '0px'
//         // });
//         Parent.css('overflow','hidden')
//         Parent.animate({height:'0px',padding:'0',overflow:'hidden'});
//         // Parent.hide()
//         $('#'+id).attr('name', 'true')
//         $('#'+id).find('i').removeClass('layui-icon-up')
//         $('#'+id).find('i').addClass('layui-icon-down')
//     } else {
//         // Parent.css('overflow', 'inherit')
//         // Parent.animate({
//         //     height: `${num}px`,
//         //     padding: '20px 0 20px 20px'
//         // });
//         Parent.css('height','')
//         Parent.css('overflow','inherit')
//         Parent.animate({minHeight:`${num}`,padding:'20px 0 20px 20px',overflow:'inherit'});
//         // Parent.show()
//         $('#'+id).attr('name', 'false')
//         $('#'+id).find('i').removeClass('layui-icon-down')
//         $('#'+id).find('i').addClass('layui-icon-up')
//     }
    
// }




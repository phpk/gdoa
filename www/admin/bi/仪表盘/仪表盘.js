/*
 * @Description: 这是***页面（组件）
 * @Date: 2021-03-04 18:52:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-06 18:00:57
 */
var layer = layui.layer;
var form = layui.form;
form.render();
var colorpicker = layui.colorpicker;

$('.BarChart_var').css('display','none')

function DashEchartsFun(BarChartData,type){
    let data = []
    data.push(BarChartData)
    parent.DashchartEcharts(data,BarChartData.name)
    if(type){
        window.parent.back(window.parent.selectdata,window.parent.Controls)
    }
}

function DashinitEchart(data,DashName,type){
    $(".colordiv").remove()
    
        if(type == 'style' || type == undefined){
            $('.BarChart_var').css('display','none')
            $('.BarChart_echarts').css('display','block')
            $('.BarChart').css('width','430px')
            parent.$('.pieBox').css('height','626px')
        } else {
            $('.BarChart_echarts').css('display','none')
            $('.BarChart_var').css('display','block')
            $('.BarChart').css('width','478px')
            parent.$('.pieBox').css('height','780px')
        }

        let moveShow = false
        let moveIndex
        BarChartData = data
        let TitleColor = BarChartData.option.Title.Color.HtmlColor
        let BackgroundColor = BarChartData.option.BackgroundColor.HtmlColor
        let RangeMin = BarChartData.option.Variable.Range.Min
        $("#min").val(RangeMin)
        let RangeMax = BarChartData.option.Variable.Range.Max
        $("#max").val(RangeMax)
        let RangeNormal = BarChartData.option.Variable.Range.NormalScale
        $("#normal").val(RangeNormal)
        let RangeWarn = BarChartData.option.Variable.Range.WarnScale
        $("#warn").val(RangeWarn)
        let RangeSplit = BarChartData.option.Variable.Range.SplitSegments
        $("#split").val(RangeSplit)
        let RangeScale = BarChartData.option.Variable.Range.Scale
        $("#scale").val(RangeScale)
        let Title = BarChartData.option.Title.Title
        $("#title").val(Title)
        let maxV = BarChartData.option.originalMax
        $("#maxV").val(maxV)
        if(BarChartData.option.IsOriginal){
            $("input[name=sex][value='1']").prop("checked","true");
            setTimeout(()=>{
                axisOriginalFun()
            },100)
        }else{
            $("input[name=sex][value='2']").prop("checked","true");
            setTimeout(()=>{
                axisPercentageFun()
            },100)
        }
        var Linlenght = BarChartData.option.Variable.Range.axisLineArr.length
        $('#sectionDom').val(Linlenght)
        if(BarChartData.option.Title.Position == 'left'){
            $("input[name=sex][value='3']").prop("checked","true");
        }else if(BarChartData.option.Title.Position == 'Center'){
            $("input[name=sex][value='4']").prop("checked","true");
        }else if(BarChartData.option.Title.Position == 'right'){
            $("input[name=sex][value='5']").prop("checked","true");
        }
        $('#titleShow').prop("checked",BarChartData.option.Title.Show)
        $('#titleSize').val(BarChartData.option.Title.FontSize)
        $('#rangeSize1').val(BarChartData.option.Variable.Tooltip.AxisLabelFontSize)
        $('#rangeSize2').val(BarChartData.option.Variable.Tooltip.SeriesDetailFontSize)
        $('#rangeShow2').prop("checked",BarChartData.option.Variable.Tooltip.SeriesDetailShow)
        $('#rangeShow1').prop("checked",BarChartData.option.Variable.Tooltip.AxisLabelShow)
        
        form.render();
         //初始改变复选样式
    // setTimeout(()=>{
        try {
            if(BarChartData.option.Title.Show){
                $('#titleShow')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#titleShow')[0].nextSibling.style.background = '#fff'
            }
            if(BarChartData.option.Variable.Tooltip.SeriesDetailShow){
                $('#rangeShow2')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#rangeShow2')[0].nextSibling.style.background = '#fff'
            }
            if(BarChartData.option.Variable.Tooltip.AxisLabelShow){
                $('#rangeShow1')[0].nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                $('#rangeShow1')[0].nextSibling.style.background = '#fff'
            }
        }catch(err) {
            //在此处理错误
            console.log('这是一段贼神奇的代码009！！！')
          }
    // },100)
        
       
        //标题颜色
        // colorpicker.render({
        //     elem: '#test2'
        //     ,color: TitleColor //hex
        //     ,alpha: true //开启透明度
        //     ,format: 'rgb'
        //     ,predefine: true 
        //     ,done: function(color){
        //     var aa =  hexify(color)
        //         BarChartData.option.Title.Color.HtmlColor = color
        //         DashEchartsFun(BarChartData,"save")
        //     }
        // });
        Colorpicker.create({
            type:'iframe',
            el: `test2`,
            color: TitleColor,
            change: function (elem, hex, rgba) {
                elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                BarChartData.option.Title.Color.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                DashEchartsFun(BarChartData)
                
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
        //         DashEchartsFun(BarChartData,"save")")
        //     }
        // });
        Colorpicker.create({
            type:'iframe',
            el: `test5`,
            color: BackgroundColor,
            change: function (elem, hex, rgba) {
                elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                BarChartData.option.BackgroundColor.HtmlColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                DashEchartsFun(BarChartData)
                
            }
        })

        Colorpicker.create({
            type:'iframe',
            el: `detail`,
            color: BarChartData.option.Variable.Tooltip.SeriesDetailColor ? BarChartData.option.Variable.Tooltip.SeriesDetailColor : '#000',
            change: function (elem, hex, rgba) {
                elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                BarChartData.option.Variable.Tooltip.SeriesDetailColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                DashEchartsFun(BarChartData)
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
        //最小值
        $('#min').unbind("input")
        $("#min").on("input",function(){
            let value = $("#min").val()
            BarChartData.option.Variable.Range.Min = value
            DashEchartsFun(BarChartData,"save")
            $('.axisMin').text(value)
            initAxis('min')
        })
        //最大值
        $('#max').unbind("input")
        $("#max").on("input",function(){
            let value = $("#max").val()
            BarChartData.option.Variable.Range.Max = value
            DashEchartsFun(BarChartData,"save")
            $('.axisMax').text(value)
            initAxis('max')
        })
        //分割段数
        $('#split').unbind("input")
        $("#split").on("input",function(){
            let value = $("#split").val()
            BarChartData.option.Variable.Range.SplitSegments = value
            DashEchartsFun(BarChartData,"save")
        })
        //刻度数
        $('#scale').unbind("input")
        $("#scale").on("input",function(){
            let value = $("#scale").val()
            BarChartData.option.Variable.Range.Scale = value
            DashEchartsFun(BarChartData,"save")
        })
        //标题
        $('#title').unbind("input")
        $("#title").on("input",function(){
            let value = $("#title").val()
            BarChartData.option.Title.Title = value
            DashEchartsFun(BarChartData,"save")
        })
        // 数据关联
        form.on(`select(data)`, function(data) {
            if (BarChartData.defaultDataConfig.datatype === data.value) {
                return
            }
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
                BarChartData.option.Variable.rangevalue = ''
                BarChartData.option.Variable.FieldName = ''
                BarChartData.option.Variable.FieldValue = ''
                BarChartData.option.Variable.valueAxisArr = []
                $('#data-sheet').css('display', 'block')
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
                    parent.choice(parent.Controls.ControlList[index].TabEvent, index)
                    
                // })
            } else {
                 // 实时 && 历史
                $('#data-sheet').css('display', 'none')
                BarChartData.option.Variable.rangevalue = ''
                BarChartData.option.Variable.VariableName = ''
                BarChartData.option.Variable.valueAxisArr = []
                BarChartData.option.Variable.CheckData = {}
                parent.choice(parent.Controls.ControlList[index].TabEvent, index)
            }
            
        })

        // 数据表
        form.on(`select(chart-data)`, function(data) {
            
            BarChartData.defaultDataConfig.tablename = data.value
            BarChartData.option.Variable.FieldName = ''
            BarChartData.option.Variable.FieldValue = ''
            BarChartData.option.Variable.rangevalue = ''
            BarChartData.option.Variable.CheckData = {}
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
            parent.choice(parent.Controls.ControlList[index].TabEvent, index)
        })

        //标题是否显示
        form.on('checkbox(titleShow)', function (show) {
            var value = show.elem.checked
            BarChartData.option.Title.Show = value
            DashEchartsFun(BarChartData,"save")
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
            DashEchartsFun(BarChartData,"save")
        });
        //居中标题
        form.on('radio(conterTitle)', function (show) {
            var value = show.elem.checked
            BarChartData.option.Title.Position = 'Center'
            DashEchartsFun(BarChartData,"save")
        });
        //右标题
        form.on('radio(rightTitle)', function (show) {
            var value = show.elem.checked
            BarChartData.option.Title.Position = 'right'
            DashEchartsFun(BarChartData,"save")
        });
        //表题字号
        $('#titleSize').unbind("input")
        $("#titleSize").on("input",function(){
            let value = $("#titleSize").val()
            BarChartData.option.Title.FontSize = value
            DashEchartsFun(BarChartData,"save")
        })
        //标签是否显示
        form.on('checkbox(rangeShow1)', function (show) {
            var value = show.elem.checked
            BarChartData.option.Variable.Tooltip.AxisLabelShow = value
            DashEchartsFun(BarChartData,"save")
            if(value){
                show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                show.elem.nextSibling.style.background = '#fff'
            }
        });
        //标签字号
        $('#rangeSize1').unbind("input")
        $("#rangeSize1").on("input",function(){
            let value = $("#rangeSize1").val()
            BarChartData.option.Variable.Tooltip.AxisLabelFontSize = value
            DashEchartsFun(BarChartData,"save")
        })
        $("#rangeSize1").keydown(function (e) {
            if (e.keyCode == 13) {
                return false;   //禁止回车from刷新
            }
        })
        $("#rangeSize2").keydown(function (e) {
            if (e.keyCode == 13) {
                return false;   //禁止回车from刷新
            }
        })
        //标签是否显示
        form.on('checkbox(rangeShow2)', function (show) {
            var value = show.elem.checked
            BarChartData.option.Variable.Tooltip.SeriesDetailShow = value
            DashEchartsFun(BarChartData,"save")
            if(value){
                show.elem.nextSibling.style.background = 'rgba(64, 158, 255, 1)'
            }else{
                show.elem.nextSibling.style.background = '#fff'
            }
        });
        //标签字号
        $('#rangeSize2').unbind("input")
        $("#rangeSize2").on("input",function(){
            let value = $("#rangeSize2").val()
            BarChartData.option.Variable.Tooltip.SeriesDetailFontSize = value
            DashEchartsFun(BarChartData,"save")
        })
        var color1 = ['#12a8fc','#8290e0','#e60012','#456812','#df8445','#46B467','#EDE536','#29F0B2','#76E015','#F7ED08']
        var color2 = ['#fcb977','#434d72','#87e0cd','#0D1CF7','#03C64D','#488E08','#ba78ff','#2E9893','#64C448','#DE291A']
        var color3 = ['#61cad7','#2377d8','#82a0c0','#F0CBA2','#05E5F0','#A5F576','#E59BF2','#EAEA9B','#898989','#95F2A0']
        var color4 = ['#ffc950','#f49037','#037de5','#1FF034','#DE0DAD','#989B0A','#7367ba','#0A9898','#83980A','#DE2C0D']
        //风格1
        $('#style1').unbind()
        $('#style1').on('click',function(){
            BarChartData.option.SelectedColorScheme = color1
            BarChartData.option.color = color1
            DashEchartsFun(BarChartData,"save")
            AxisClickFun()
        })
        //风格2
        $('#style2').unbind()
        $('#style2').on('click',function(){
            BarChartData.option.SelectedColorScheme = color2
            BarChartData.option.color = color2
            DashEchartsFun(BarChartData,"save")
            AxisClickFun()
        })
        //风格3
        $('#style3').unbind()
        $('#style3').on('click',function(){
            BarChartData.option.SelectedColorScheme = color3
            BarChartData.option.color = color3
            DashEchartsFun(BarChartData,"save")
            AxisClickFun()
        })
        //风格4
        $('#style4').unbind()
        $('#style4').on('click',function(){
            BarChartData.option.SelectedColorScheme = color4
            BarChartData.option.color = color4
            DashEchartsFun(BarChartData,"save")
            AxisClickFun()
        })
        //区间改变
        form.on('select(sectionDom)', function(size){
            let axisLineArr = []
            for(let i=0;i<Number(size.value);i++){
                let val = (BarChartData.option.Variable.Range.Max - BarChartData.option.Variable.Range.Min) / Number(size.value)
                let value = {
                    "Max":(i+1) * val + Number(BarChartData.option.Variable.Range.Min),
                    "Color":color1[i%10]
                }
                axisLineArr.push(value)
            }
            BarChartData.option.Variable.Range.axisLineArr = axisLineArr
            DashEchartsFun(BarChartData,"save")
            initAxis()
        });
        //初始化区间样式
        initAxis()
        function initAxis(text){
            let axisLineLength = BarChartData.option.Variable.Range.axisLineArr.length
            let Dom = $('.axisDom')
            let dom = ''
            let dom1 = ''
            let val = (BarChartData.option.Variable.Range.Max - BarChartData.option.Variable.Range.Min) / Number(axisLineLength)
            let axisLineArr = []
            for(let i=0;i<axisLineLength;i++){
                let num
                let maxVlaue
                if(text == 'max' || text == 'min'){
                    num = parseFloat(((i+1)*val + Number(BarChartData.option.Variable.Range.Min)).toFixed(2))
                    maxVlaue = (i+1) * val + Number(BarChartData.option.Variable.Range.Min)
                }else{
                    num = BarChartData.option.Variable.Range.axisLineArr[i].Max
                    maxVlaue = num
                }
                dom = dom + `<div class="axisBox">
                    <div class="showLin">区间${i+1}</div>
                    <div class="showLin" style="margin-left:15px">颜色</div>
                    <div id="axisColor${i+1}" class="colorBlock colorBlock1 showLin" onclick="colorclick()"></div>
                    <div style="margin-left:15px" class="showLin">最大值</div>
                    <div class="showLin" style="position:relative">
                        <input id="axisMax${i+1}" ${i==axisLineLength-1?'readonly="readonly"':''} type="text" value="${num.toFixed(0)}"
                        name="title" required autocomplete="off" class="layui-input">
                        <span class="maxText${i+1}" style="position:absolute;top:10px;right:-160px;"></span>
                    </div>
                </div>`
                let value = {
                    "Max":maxVlaue,
                    "Color":color1[i%10]
                }
                if(i!=axisLineLength-1 ){
                    dom1 = dom1 + `<div class="slideBox slideBox${i+1}" 
                    style="left:${350 * (i+1)/Number(axisLineLength) - 13}px;background:${BarChartData.option.SelectedColorScheme[i]}"></div>`
                }
                axisLineArr.push(value)
            }

            BarChartData.option.Variable.Range.axisLineArr = axisLineArr
            DashEchartsFun(BarChartData)
            $('.axisBox').remove()
            Dom.append(dom)
            $('.slideBox').remove()
            $('.slideBar').append(dom1)
            AxisClickFun()
        }
        //数字型
        function numberFun(value){
            value = parseFloat(value)
            if(String(value) == 'NaN'){
                value = ''
            }
            return value
        }
        //区间条件不成立
        function judgeErr(i,dom,type){
            let text
            if(type == 1){
                text = '不可大于下个区间最大值'
            }else if(type==2){
                text = '不可小于上个区间最大值'
            }else if(type == 3){
                text = '区间最大值大于最大值'
            }else if(type == 4){
                text = '区间最大值小于最小值'
            }
            $(`.maxText${i+1}`).text(text)
            dom.css('cssText','border-color:#e4393c !important')
        }
        //区间条件成立
        function judgeRe(i,dom,value,axisLineLength){
            dom.val(value)
            $(`.maxText${i+1}`).text('')
            dom.css('cssText','border-color:none !important')
            axisLineLength[i].Max = value
            BarChartData.option.Variable.Range.axisLineArr = axisLineLength
            DashEchartsFun(BarChartData,"save")
            let num  = value / Number(BarChartData.option.Variable.Range.Max)
            let numV = 350 * num
            $(`.slideBox${i+1}`).css('left',`${numV-13}px`)
        }
        //区间事件绑定
        function AxisClickFun(){
            let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
            $('.slideBar').unbind('input')
            $('.slideBar').unbind()
            $('.axisDom').unbind('input')
            $('.axisDom').unbind()
            
            for(let i=0;i<axisLineLength.length;i++){
            $(`.slideBox${i+1}`).css('background',BarChartData.option.SelectedColorScheme[i])
                //y轴颜色项
            // colorpicker.render({
            //         elem: `#axisColor${i+1}`
            //         ,color: `${BarChartData.option.SelectedColorScheme[i]}` //hex
            //         ,alpha: true //开启透明度
            //         ,format: 'rgb'
            //         ,predefine: true 
            //         ,done: function(color){
            //             var aa =  hexify(color)
            //             let colorArr = BarChartData.option.SelectedColorScheme
            //             colorArr[i] = color
            //             BarChartData.option.SelectedColorScheme = colorArr
            //             DashEchartsFun(BarChartData,"save")
            //             $(`.slideBox${i+1}`).css('background',color)
            //         }
            //     });

                Colorpicker.create({
                    type:'iframe',
                    el: `axisColor${i+1}`,
                    color: `${BarChartData.option.SelectedColorScheme[i]}`,
                    change: function (elem, hex, rgba) {
                        let colorArr = BarChartData.option.SelectedColorScheme
                        elem.style.backgroundColor =`rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                        colorArr[i] = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
                        BarChartData.option.SelectedColorScheme = colorArr
                        DashEchartsFun(BarChartData)
                        
                    }
                })
                //滑块按下事件
                $('.slideBar').on('mousedown',`.slideBox${i+1}`,function(e){ 
                    moveShow = true
                    moveIndex = i
                })
                //线内滑块松开事件
                $('.slideBar').on('mouseup',`.slideBox${i+1}`,function(e){ 
                    let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
                    moveShow = false
                    BarChartData.option.Variable.Range.axisLineArr = axisLineLength
                    DashEchartsFun(BarChartData,"save")
                })

                $('body').on('mousemove',function(e){
                    let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
                    if(moveShow){
                        let domLeft = $('.slideBar')[0].offsetLeft
                        if(e.clientX - domLeft <= 350 && e.clientX - domLeft >= 0){
                            if(moveIndex !=0){
                                let minLeft = $(`.slideBox${moveIndex}`)[0].offsetLeft + 13
                                if(e.clientX - domLeft <= minLeft){
                                    return
                                }
                            }
                            if(moveIndex < axisLineLength.length-2){
                                let minLeft1 = $(`.slideBox${moveIndex+2}`)[0].offsetLeft + 13
                                if(e.clientX - domLeft >= minLeft1){
                                    return
                                }
                            }

                            $(`.slideBox${moveIndex+1}`).css('cssText',`left:${e.clientX - 13 - domLeft}px;background:${BarChartData.option.SelectedColorScheme[moveIndex]}`)
                            let num  = (e.clientX - domLeft) / 350
                            let value = Number(BarChartData.option.Variable.Range.Max) * num
                            $(`#axisMax${moveIndex + 1}`).val(value.toFixed(0))
                            axisLineLength[moveIndex].Max = value
                        }
                    }
                })
                //在线内滑块移动事件
                // $('.slideBar').on('mousemove',function(e){ 
                    // let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
                    // if(moveShow){
                    //     let domLeft = $('.slideBar')[0].offsetLeft
                    //     if(e.clientX - domLeft <= 550 && e.clientX - domLeft >= 0){
                    //         if(moveIndex !=0){
                    //             let minLeft = $(`.slideBox${moveIndex}`)[0].offsetLeft + 13
                    //             if(e.clientX - domLeft <= minLeft){
                    //                 return
                    //             }
                    //         }
                    //         $(`.slideBox${moveIndex+1}`).css('cssText',`left:${e.clientX - 13 - domLeft}px;background:${BarChartData.option.SelectedColorScheme[moveIndex]}`)
                    //         let num  = (e.clientX - domLeft) / 550
                    //         let value = Number(BarChartData.option.Variable.Range.Max) * num
                    //         $(`#axisMax${moveIndex + 1}`).val(value.toFixed(0))
                    //         axisLineLength[moveIndex].Max = value
                    //     }
                    // }
                // })
                //移出线内滑动块
                // $('.slideBar').on('mouseout',function(e){ 
                //     let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
                    // if(moveShow){
                        // moveShow = false
                        // BarChartData.option.Variable.Range.axisLineArr = axisLineLength
                        // DashEchartsFun(BarChartData,"save")
                    // }
                // })
                $('body').on('mouseup',function(e){ 
                    let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
                    moveShow = false
                    BarChartData.option.Variable.Range.axisLineArr = axisLineLength
                    DashEchartsFun(BarChartData)
                    
                })
                //区间回车事件
                $('.axisDom').on('keyup',`#axisMax${i+1}`,function(e){ 
                    if(e.keyCode == 13){
                        $(this).blur()
                    }
                })
                //区间离焦事件
                $('.axisDom').on('blur',`#axisMax${i+1}`,function(){  
                    let axisLineLength = BarChartData.option.Variable.Range.axisLineArr
                    let value = numberFun($(this).val())
                    if(i==0){
                        let Min = BarChartData.option.Variable.Range.Min
                        if(value < Min){
                            judgeErr(i,$(this),4)
                        }else{
                            if(value >= axisLineLength[i+1].Max){
                                judgeErr(i,$(this),1)
                            }else{
                                judgeRe(i,$(this),value,axisLineLength)
                            }
                        }
                    }else if((i+1) == $('.axisBox').length){
                        let Max = BarChartData.option.Variable.Range.Max
                        if(value > Max){
                            judgeErr(i,$(this),3)
                        }else{
                            if(value <= axisLineLength[i-1].Max){
                                judgeErr(i,$(this),2)
                            }else{
                                judgeRe(i,$(this),value,axisLineLength)
                            }
                        }
                    }else{
                        if(value >= axisLineLength[i+1].Max){
                            judgeErr(i,$(this),1)
                        }else{
                            if(value <= axisLineLength[i-1].Max){
                                judgeErr(i,$(this),2)
                            }else{
                                judgeRe(i,$(this),value,axisLineLength)
                            }
                        }
                    }
                   
                })
            }
        }
        //区间原值
        function axisOriginalFun(){
            $('.axisType').css('cssText','display:block')
            $('#min').removeAttr("readonly")
            $('#min').removeClass('layui-disabled')
            $('#max').removeAttr("readonly")
            $('#max').removeClass('layui-disabled')
            $('#min').val(BarChartData.option.Variable.Range.Min)
            $('#max').val(BarChartData.option.Variable.Range.Max)
            $('.original').addClass('originalMax')
            BarChartData.option.IsOriginal  = true
            initAxis()
        }
        //区间百分比
        function axisPercentageFun(){
            $('.axisType').css('cssText','display:none')
            $('#min').attr("readonly","readonly")
            $('#min').addClass('layui-disabled')
            $('#max').attr("readonly","readonly")
            $('#max').addClass('layui-disabled')
            $('.original').removeClass('originalMax')
            $('#min').val('0%')
            $('#max').val('100%')
            BarChartData.option.Variable.Range.Min = 0
            BarChartData.option.Variable.Range.Max = 100
            BarChartData.option.IsOriginal  = false
            initAxis()
        }
        //区间原值
        form.on('radio(axisOriginal)', function (show) {
            axisOriginalFun()
            BarChartData.option.Variable.Unit= ''
            DashEchartsFun(BarChartData,"save")
        });
        //区间百分比
        form.on('radio(axisPercentage)', function (show) {
            axisPercentageFun()
            BarChartData.option.Variable.Unit= '%'
            DashEchartsFun(BarChartData,"save")
        });
        //百分比上限值
        $('#maxV').unbind("input")
        $("#maxV").on("input",function(){
            let value = numberFun($("#maxV").val())
            BarChartData.option.originalMax = value
            DashEchartsFun(BarChartData,"save")
        })
}


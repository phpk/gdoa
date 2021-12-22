/*
 * @Description: 这是图表 辅助线（组件）
 * @Date: 2021-03-19 17:24:05
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-31 17:01:39
 */

 function AuxiliaryLineInit(data){
    if ($('#data-relate')[0] !== undefined) {
        if (data.defaultDataConfig.datatype=== '实时数据') {
            $('#axial').css('display', 'none')
            $('#realTime').css('display', 'block')
            BarChartData.DataCount = data.DataCount ? data.DataCount : 7
            renderDataDimen()
            // 数据关联初始化
            let relate = data.defaultDataConfig.datatype ? data.defaultDataConfig.datatype : $('#data-relate').children().val()
            $('#data-relate').find("option[value="+relate+"]").attr("selected",true);
            data.defaultDataConfig.timedate = data.defaultDataConfig.timedate ? data.defaultDataConfig.timedate : $('#data-time').children().val()
            $('#data-time').find(`option[value='${data.defaultDataConfig.timedate}']`).attr("selected",true);
            form.render('select', 'form-dateFormat')
        } else if (data.defaultDataConfig.datatype=== '历史数据' || data.defaultDataConfig.datatype=== '业务数据'){
            if (data.defaultDataConfig.datatype=== '业务数据') {
                $('#axial').css('display', 'none')
            } else {
                $('#axial').css('display', 'block')
            }
            $('#realTime').css('display', 'none')
            let content = document.getElementById('data-content')
            let relate = data.defaultDataConfig.datatype ? data.defaultDataConfig.datatype : $('#data-relate').children().val()
            $('#data-relate').find("option[value="+relate+"]").attr("selected",true);
            let dimen = data.defaultDataConfig.xaxistype ? data.defaultDataConfig.xaxistype : $('#data-dimen').children().val()
            $('#data-dimen').find("option[value="+dimen+"]").attr("selected",true);
            $('#data-dimen').find("option[value="+dimen+"]").siblings().removeAttr('selected')
            $('#data-dimen').find("option[value="+dimen+"]").prop("selected",true)
            form.render('select', 'form-dimen')
            BarChartData.DateLately = data.DateLately ? data.DateLately : '1'
            if (content) {
                let html = renderDimen(dimen)
                content.innerHTML = html
                if (dimen === '时间') {
                    data.defaultDataConfig.timedate = data.defaultDataConfig.timedate ? data.defaultDataConfig.timedate : $('#data-time').children().val()
                    $('#data-time').find(`option[value='${data.defaultDataConfig.timedate}']`).attr("selected",true);
                    $('#data-input').val(BarChartData.DateLately)
                } else if (dimen === '变量') {
                    data.defaultDataConfig.datavariable = data.defaultDataConfig.datavariable ? data.defaultDataConfig.datavariable : $('#data-variable').children().val()
                    $('#data-variable').find("option[value="+ data.defaultDataConfig.datavariable +"]").attr("selected",true);
                }
            }
        }
        form.render('select', 'form-dimen')
        // form.render()
    }
    BarChartData = data
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

        //辅助线绑定事件
         AuxiliaryLinesFun = function(text){
            var indexArr = []
            let YAxises = BarChartData.option.AuxiliaryLines
            for(let i=0;i<$('.aBox').length;i++){  //辅助线name名称
                var name = $($('.aBox')[i]).attr('name')
                indexArr.push(name)
            }
            $('.auxiliary_box').unbind('input')
            for(let j=0;j<=indexArr.length-1;j++){
                //辅助线值
                $('.auxiliary_box').on('input',`#aNum${indexArr[j]}`,function(){  
                    let value = $(this).val()
                    YAxises[j].Value = value
                    BarChartData.option.AuxiliaryLines = YAxises
                    if(text != 'line'){
                        BarEchartsFun(BarChartData)
                    }else{
                        LineEchartsFun(BarChartData)
                    }
    
                })
                //y轴颜色项
                colorpicker.render({
                    elem: `#aColor${indexArr[j]}`
                    ,color: `${YAxises[j].Color.HtmlColor}` //hex
                    ,alpha: true //开启透明度
                    ,format: 'rgb'
                    ,predefine: true 
                    ,done: function(color){
                        var aa =  hexify(color)
                        YAxises[j].Color.HtmlColor = color
                        BarChartData.option.AuxiliaryLines = YAxises
                        if(text != 'line'){
                            BarEchartsFun(BarChartData)
                        }else{
                            LineEchartsFun(BarChartData)
                        }
                    }
                });
                //辅助线类型
                form.on(`select(aType${indexArr[j]})`, function(size){
                    if(size.value == '计算值'){
                        $(size.othis[0]).parents('.aBox').find('.type1').css('display','none')
                        $(size.othis[0]).parents('.aBox').find('.type2').css('display','inline-block')
                        YAxises[j].Type = "FromVariable"
                        YAxises[j].ValueMethod = "最大值"
                        YAxises[j].TargetVariableName = "变量1"
                    }
                    if(size.value == '固定值'){
                        $(size.othis[0]).parents('.aBox').find('.type1').css('display','inline-block')
                        $(size.othis[0]).parents('.aBox').find('.type2').css('display','none')
                        YAxises[j].Type = "Const"
                    }
                    BarChartData.option.AuxiliaryLines = YAxises
                    if(text != 'line'){
                        BarEchartsFun(BarChartData)
                    }else{
                        LineEchartsFun(BarChartData)
                    }
                });
                //计算值 变量
                form.on(`select(aVar${indexArr[j]})`, function(size){
                    YAxises[j].TargetVariableName = size.value
                    BarChartData.option.AuxiliaryLines = YAxises
                    if(text != 'line'){
                        BarEchartsFun(BarChartData)
                    }else{
                        LineEchartsFun(BarChartData)
                    }
                });
                //计算值 类型
                form.on(`select(aNumType${indexArr[j]})`, function(size){
                    YAxises[j].ValueMethod = size.value
                    BarChartData.option.AuxiliaryLines = YAxises
                    if(text != 'line'){
                        BarEchartsFun(BarChartData)
                    }else{
                        LineEchartsFun(BarChartData)
                    }
                });
                //对应y轴
                form.on(`select(yType${indexArr[j]})`, function(size){
                if(echartsType == 'lineBar'){
                    if(size.value == '柱形Y轴'){
                        YAxises[j].Axis.Value = '0'
                    }else if(size.value == '折线Y轴'){
                        YAxises[j].Axis.Value = '1'
                    }
                }
                if(echartsType == 'line'){
                    YAxises[j].Axis.Value = size.value
                }
                    BarChartData.option.AuxiliaryLines = YAxises
                   
                    if(text != 'line'){
                        BarEchartsFun(BarChartData)
                    }else{
                        LineEchartsFun(BarChartData)
                    }
                });
            }
        }

    initAuxiliaryLines()
    AuxiliaryLinesFun(echartsType)
    function initAuxiliaryLines(){
        $('.aBox').remove()
        var Dom = $('.auxiliary_box')
        for(let i=0;i<BarChartData.option.AuxiliaryLines.length;i++){
            var dom = `<div class="aBox aBox${i+1}" name="${i+1}" style="margin-top:15px;position: relative;">
                <div style="margin-bottom:16px">辅助线${i+1}</div>
                <div class="aNum showLin" style="margin-left:20px;margin-right:10px">数值</div>
                <div style="width:100px;margin-right:5px" class="showLin">
                    <select name="city" lay-filter="aType${i+1}" lay-verify="required">
                    <option value="固定值" ${BarChartData.option.AuxiliaryLines[i].Type=='Const'?'selected':''}>固定值</option>
                    <option value="计算值" ${BarChartData.option.AuxiliaryLines[i].Type!='Const'?'selected':''}>计算值</option>
                    </select>
                </div>
                <div class="type1 showLin ${BarChartData.option.AuxiliaryLines[i].Type!='Const'?'LineType2':'LineType1'}" style="width:204px;margin-right:8px">
                    <input id="aNum${i+1}" value="${BarChartData.option.AuxiliaryLines[i].Value}" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                </div>
                <div style="width:100px" class="type2 showLin ${BarChartData.option.AuxiliaryLines[i].Type=='Const'?'LineType2':'LineType1'}">
                    <select name="city" lay-filter="aVar${i+1}" lay-verify="required">
                    <option value="变量1" selected>变量1</option>
                    <option value="变量2">变量2</option>
                    </select>
                </div>
                <div style="width:100px;margin-right:8px" class="type2 showLin ${BarChartData.option.AuxiliaryLines[i].Type=='Const'?'LineType2':'LineType1'}">
                    <select name="city" lay-filter="aNumType${i+1}" lay-verify="required">
                    <option value="平均值">平均值</option>
                    <option value="最大值" selected>最大值</option>
                    <option value="最小值">最小值</option>
                    </select>
                </div>
                <div id="aColor${i+1}" class="colorBlock showLin"></div>
                <div class="aNum" style="margin-top:16px;margin-left:20px;line-height:14px;">对应Y轴:</div>
                <div style="width:390px;margin-left:20px;margin-top:10px" class="showLin">
                    <select name="city" class="aSelect${i+1}" lay-filter="yType${i+1}" lay-verify="required">
        
                    </select>
                </div>
                <div class="AdeleteDom" style="position:absolute;top:0px;right:20px;width:20px;height:20px;cursor:pointer">
                   <i class="layui-icon layui-icon-close-fill" style="color:rgba(153, 153, 153, 1);font-size:20px"></i>  
                </div>
            </div>`
            Dom.append(dom);
            let Adom = ''
            if(echartsType == 'bar'){
                Adom = `<option value="Y轴1" selected>Y轴1</option>`
            }
            if(echartsType == 'line'){
                var YxisesArr = BarChartData.option.YAxises
                for(let j=0;j<YxisesArr.length;j++){
                    indexNum = BarChartData.option.AuxiliaryLines[i].Axis.Value
                    Adom = Adom + `<option value="${j}" ${j==indexNum?'selected':''}>Y轴${j+1}</option>`
                }
            }

            $(`.aSelect${i+1}`).empty()
            $(`.aSelect${i+1}`).append(Adom)
            form.render();
        }   
    }

   //添加辅助线
   addAuxiliaryLines = function(Dom,text){
        var aNum
        if($('.aBox').length){
            var ylength = $('.aBox').length - 1
            var yindex = $('.aBox')[ylength]
            aNum = Number($(yindex).attr('name')) + 1
        }else{
            aNum = 1
        }
        var dom = `<div class="aBox aBox${aNum}" name="${aNum}" style="margin-top:15px;position: relative;">
                 <div style="margin-bottom:16px">辅助线${aNum}</div>
                <div class="aNum showLin" style="margin-left:20px;margin-right:10px">数值</div>
                <div style="width:100px;margin-right:5px" class="showLin">
                    <select name="city" lay-filter="aType${aNum}" lay-verify="required">
                    <option value="固定值" selected>固定值</option>
                    <option value="计算值">计算值</option>
                    </select>
                </div>
                <div class="type1 showLin" style="width:204px;margin-right:8px">
                    <input id="aNum${aNum}" value="50" type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">
                </div>
                <div style="width:100px;" class="type2 showLin">
                    <select name="city" lay-filter="aVar${aNum}" lay-verify="required">
                    <option value="变量1" selected>变量1</option>
                    <option value="变量2">变量2</option>
                    </select>
                </div>
                <div style="width:100px;margin-right:8px" class="type2 showLin">
                    <select name="city" lay-filter="aNumType${aNum}" lay-verify="required">
                    <option value="平均值">平均值</option>
                    <option value="最大值" selected>最大值</option>
                    <option value="最小值">最小值</option>
                    </select>
                </div>
                <div id="aColor${aNum}" class="colorBlock showLin"></div>
                <div class="aNum" style="margin-top:16px;margin-left:20px;line-height:14px;">对应Y轴</div>
                <div style="width:390px;margin-left:20px;margin-top:10px" class="showLin">
                    <select name="city" class="aSelect${aNum}" lay-filter="yType${aNum}" lay-verify="required">
        
                    </select>
                </div>
                <div class="AdeleteDom" style="position:absolute;top:0px;right:20px;width:20px;height:20px;cursor:pointer">
                    <i class="layui-icon layui-icon-close-fill" style="color:rgba(153, 153, 153, 1);font-size:20px"></i>  
                </div>
            </div>`
            Dom.append(dom);
        
            //辅助线下拉框值
            let Adom = ''
            if(echartsType == 'lineBar'){
            Adom = `<option value="柱形Y轴" selected>柱形Y轴</option>
                    <option value="折线Y轴">折线Y轴</option>`
            }
            if(echartsType == 'bar'){
                Adom = `<option value="Y轴1" selected>Y轴1</option>`
            }
            if(echartsType == 'line'){
                var YxisesArr = BarChartData.option.YAxises
                for(let i=0;i<YxisesArr.length;i++){
                    Adom = Adom + `<option value="${i}" ${i==0?'selected':''}>Y轴${i+1}</option>`
                }
            }
            $(`.aSelect${aNum}`).empty()
            $(`.aSelect${aNum}`).append(Adom)
            form.render();

            $(`.aBox${aNum} .type2`).css('display','none')
            let AuxiliaryLines = BarChartData.option.AuxiliaryLines
            let Auxiliary = {
                "Value": 50.0,
                "Axis": {
                "AxisType": "Y",
                "Value": 0
                },
                "ValueMethod": "Max",
                "Type": "Const",
                "TargetVariableName": "配置变量",
                "Color": {
                "HtmlColor": "#ffa3a3ff"
                }
            }
            AuxiliaryLines.push(Auxiliary)
            BarChartData.option.AuxiliaryLines = AuxiliaryLines
            return BarChartData
    }

    //删除辅助线
    deleteAuxiliaryLines = function(Dom,text){
        var index = Dom.parents('.aBox').attr('name')
        for(let i=0;i<$('.aBox').length;i++){
            if($($('.aBox')[i]).attr('name') == index){
                BarChartData.option.AuxiliaryLines.splice(i,1)   //删除数据
                let AuxiliaryLines = BarChartData.option.AuxiliaryLines
                BarChartData.option.AuxiliaryLines = AuxiliaryLines
                if(text != 'Line'){
                    BarEchartsFun(BarChartData)
                }else{
                    LineEchartsFun(BarChartData)
                }
            }
        }
        $(`.aBox${index}`).remove()   //删除dom
    }
    
 }
    
 
 function renderDimen (value) {
    let html = ``
    if (value === '时间') {
        let opts = ``
        DataTimeTypeList.filter(f => f.value !== '').forEach(item=>{
            // ${BarChartData.defaultDataConfig.xaxistype == item.value?'selected':''}
            opts+=`<option value="${item.value}" >${item.name+':'+item.value}</option>`
        })
        // html +=`<div class="showLin" style="margin-right:24px">时间设值</div>
        // <div class="showLin" style="margin-right:10px">最近</div>
        // <div class="showLin" style="width:90px;height: 32px;">
        //     <input type="text" name="title" required  lay-verify="required" autocomplete="off" id="data-input" value="${BarChartData.DateLately}"  onblur="getTime(event)" class="layui-input">
        // </div>
        // <div class="showLin" style="width:200px;height:32px">
        //     <select lay-filter="data-time" id="data-time" name="city" placeholder="请选择" lay-verify="required">
        //         ${opts}
        //     </select>
        // </div>`
    } else if (value === '变量') {
        let opts = ``
        VariableList.forEach(item=>{
            opts+=`<option value="${item.value}">${item.name}</option>`
        })
        html +=`<select lay-filter="data-variable" id="data-variable" placeholder="请选择" name="city" lay-verify="required">
            ${opts}
        </select>`
    }
    return html
}


function renderDataDimen () {
    $('#realtime-count-input').val(BarChartData.DataCount)
    let opts = ``
    DataTimeTypeList.filter(f => f.value !== '').forEach(item=>{
        // ${BarChartData.defaultDataConfig.xaxistype == item.value?'selected':''}
        opts+=`<option value="${item.value}" >${item.name+':'+item.value}</option>`
    })
    $('#data-time').html(opts)
    form.render()
}

function getrealTime (e) {
    BarChartData.DataCount = e.target.value
}

function getTime (e) {
    BarChartData.DateLately = e.target.value
}

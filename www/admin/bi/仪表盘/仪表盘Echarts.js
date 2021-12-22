/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-06-02 15:08:28
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-02 15:12:01
 */
//定义全局变量
var Chart1 = null;
var Chart2;
var Charttemple;
var subChardata = new Array();
var secondgraphobj;
var ChartDataSource;
var ChartCalResult;
var ChartDataItem;
var Language;
var vvv;
var option = option = {
	animation: false
};

var allchartlist2 = []

//替换不相同属性
function DashAddOrModify(target, source) {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const ele = source[key];
			var modify = false;
			if (target.hasOwnProperty(key)) {
				if (typeof (ele) != "object") {
					target[key] = ele;
					modify = true;
				}
			} else {
				target[key] = {};
			}
			if (Array.isArray(ele)) {
				target[key] = ele;
			} else if (typeof (ele) == "object") {
				DashAddOrModify(target[key], source[key]);
			} else if (!modify) {
				target[key] = ele;
			}
		}
	}
}

var DashBoardChartShow = true
var DashData
// 修改仪表盘
function DashchartEcharts(PieChartData, PieChartNameData, type) {
	PieChartData = JSON.parse(JSON.stringify(PieChartData))
	for (let i = 0; i < PieChartData.length; i++) {
		let indexName = PieChartNameData.indexOf(PieChartData[i].name)
		if (indexName == -1) {
			continue;
		}

		var data

		DashData = PieChartData[i].option
		data = DashData
		DashBoardChartShow = false

		var Title = data.Title.Title
		var TitleFontColor = data.Title.Color.HtmlColor
		var TitleFontSize = data.Title.FontSize
		var TitlePosition = data.Title.Position
		var TitleShow = data.Title.Show
		var backgroundColor2 = data.BackgroundColor.HtmlColor
		var ToolTipm
		var formatterShow = false
		if (data.Label.ValueShow == true) {
			ToolTipm = '{b}'
			formatterShow = true
		}
		if (data.Label.DimensionShow == true) {
			ToolTipm = '{c}'
			formatterShow = true
		}
		if (data.Label.ValueShow == true && data.Label.DimensionShow == true) {
			ToolTipm = '{c}'
			formatterShow = true
		}
		var AxisLabelFontSize = data.Variable.Tooltip.AxisLabelFontSize
		var SeriesDetailFontSize = data.Variable.Tooltip.SeriesDetailFontSize
		var DimensionName = data.Variable.DimensionName
		var Max = data.Variable.Range.Max
		var Min = data.Variable.Range.Min
		var SplitNumber = data.Variable.Range.SplitSegments
		var AreaColorOne = data.Variable.Range.NormalScale
		var AreaColorTwo = data.Variable.Range.WarnScale
		var SeriesDetailShow = data.Variable.Tooltip.SeriesDetailShow
		var SeriesDetailColor = data.Variable.Tooltip.SeriesDetailColor ? data.Variable.Tooltip.SeriesDetailColor : '#000'
		var AxisLabelShow = data.Variable.Tooltip.AxisLabelShow
		var ValueDigit = data.Variable.ValueDigit
		var Dashvalue
		if (data.IsOriginal) {
			Dashvalue = Number(data.Datas)
		} else {
			Dashvalue = Number(data.Datas) / data.originalMax * 100
		}
		var Dashvalue2
		if (Dashvalue == 0) {
			Dashvalue2 = 0
		} else {
			Dashvalue2 = (Dashvalue - Min) > (Max - Min) ? (Max - Min) : (Dashvalue - Min)
		}
		if (Dashvalue < Min) {
			Dashvalue2 = Min
		}
		if (ValueDigit != undefined) {
			Dashvalue = Dashvalue.toFixed(ValueDigit)
		} else {
			Dashvalue = Dashvalue.toFixed(0)
		}
		//区间格式
		let axisLineArr = data.Variable.Range.axisLineArr
		var axisArr = []
		for (let i = 0; i < axisLineArr.length; i++) {
			let arr = []
			arr[0] = (axisLineArr[i].Max - data.Variable.Range.Min) / (data.Variable.Range.Max - data.Variable.Range.Min)
			arr[1] = data.SelectedColorScheme[i % 10]
			axisArr.push(arr)
		}
		axisLineArr = axisArr

		var Unit = data.Variable.Unit
		var AxisSplitNumber = data.Variable.Range.Scale
		var dom
		var titleColor = data.Variable.Color.HtmlColor
		if (document.getElementById(`${PieChartData[i].name}`)) {
			dom = document.querySelector(`#${PieChartData[i].name}`).clientWidth
			Chart1 = echarts.init(document.getElementById(`${PieChartData[i].name}`));
		}
		try {

			Chart1.clear()
			Chart1.resize()
			var optionF = {
				title: {
					text: Title,
					left: TitlePosition.toLowerCase(),
					show: TitleShow,
					textStyle: {
						fontFamily: '宋体',
						color: TitleFontColor,
						fontSize: TitleFontSize,
					},
					padding: [12, 10]
				},
				backgroundColor: backgroundColor2,
				animation: true,
				tooltip: {
					formatter: ToolTipm,
					show: formatterShow
				},
				toolbox: {
					showTitle: false,
					iconStyle: {
						color: 'rgba(128, 128, 128,0)',
						borderWidth: 0,

					},
					emphasis: {
						iconStyle: {
							color: '#409eff'
						}
					},
					feature: {
						myFull: {
							show: type ? true : false,
							icon: 'path://M640.57142832 415.57142832c12.85714248 0 19.28571416-6.42857168 25.71428584-12.85714248L891.28571416 190.57142832v109.28571416c0 6.42857168 0 19.28571416 6.42857168 19.28571504 6.42857168 6.42857168 12.85714248 6.42857168 19.28571416 6.4285708h12.85714248c19.28571416 0 32.14285752-6.42857168 32.14285752-25.71428584V87.71428584c0-12.85714248-6.42857168-19.28571416-6.42857168-19.28571416-6.42857168 0-12.85714248-6.42857168-19.28571416-6.42857168h-205.71428584c-19.28571416 0-32.14285752 12.85714248-32.14285664 32.14285752v12.85714248c0 19.28571416 12.85714248 32.14285752 32.14285664 25.71428584h109.28571416L614.85714248 357.71428584c-6.42857168 6.42857168-12.85714248 12.85714248-12.85714248 25.71428584s6.42857168 19.28571416 12.85714248 25.71428584c6.42857168 6.42857168 19.28571416 6.42857168 25.71428585 6.42857081zM383.42857168 608.42857168c-12.85714248 0-19.28571416 6.42857168-25.71428584 12.85714248L139.14285752 833.42857168v-109.28571416c0-6.42857168 0-12.85714248-6.42857168-19.28571504-12.85714248-6.42857168-19.28571416-12.85714248-25.71428584-12.85714248H94.14285752c-19.28571416 6.42857168-32.14285752 12.85714248-32.14285752 32.14285752V936.28571416c0 12.85714248 6.42857168 19.28571416 6.42857168 19.28571416 6.42857168 0 12.85714248 6.42857168 19.28571416 6.42857168h205.71428584c19.28571416 0 32.14285752-12.85714248 32.14285665-32.14285752v-12.85714248c0-19.28571416-12.85714248-25.71428584-32.14285665-25.71428584H184.14285752l218.57142832-218.57142832c12.85714248-12.85714248 19.28571416-19.28571416 19.28571416-32.14285752s-6.42857168-19.28571416-12.85714248-25.71428584c-6.42857168-6.42857168-19.28571416-6.42857168-25.71428584-6.4285708zM190.57142832 139.14285752h109.28571416c19.28571416 0 32.14285752-12.85714248 32.14285752-32.14285752V94.14285752C325.57142832 74.85714248 312.71428584 62 299.85714248 62H87.71428584C81.28571416 62 74.85714248 62 68.42857168 68.42857168c0 6.42857168-6.42857168 12.85714248-6.42857168 25.71428584v212.14285664c0 12.85714248 12.85714248 19.28571416 32.14285752 25.71428584h12.85714248c6.42857168 0 12.85714248 0 19.28571416-6.42857168 6.42857168-6.42857168 6.42857168-12.85714248 6.42857168-19.28571416V197l218.57142832 218.57142832H383.42857168c6.42857168 0 19.28571416-6.42857168 25.71428584-12.85714248 12.85714248-12.85714248 12.85714248-38.57142832 0-51.42857168L190.57142832 139.14285752zM929.85714248 692h-12.85714248c-6.42857168 0-12.85714248 0-19.28571416 6.42857168-6.42857168 6.42857168-6.42857168 12.85714248-6.42857168 19.28571416v109.28571416L666.28571416 614.85714248c-12.85714248-12.85714248-38.57142832-12.85714248-51.42857168 0-6.42857168 6.42857168-12.85714248 19.28571416-12.85714248 25.71428585 0 12.85714248 6.42857168 19.28571416 12.85714248 25.71428583l218.5714292 218.57142832h-109.28571416c-19.28571416 0-32.14285752 12.85714248-32.14285752 32.14285752v12.85714248c0 19.28571416 12.85714248 32.14285752 32.14285752 32.14285752h205.71428496c6.42857168 0 12.85714248 0 19.28571504-6.42857168 6.42857168-6.42857168 6.42857168-12.85714248 6.42857081-19.28571416v-212.14285664c6.42857168-19.28571416-6.42857168-25.71428584-25.71428585-32.14285752z',

							onclick: function (e /* , data, uu,aa */ ) {
								var opts = e.getOption()
								opts.toolbox[0].feature.myFull.show = false
								//window.top表示最顶层iframe  如果在当页面全屏打开 删去window.top即可
								let id = e.scheduler.ecInstance._dom.id
								FullScreen($(`#${id}`)[0]);

							}
						}
					}
				},
				series: [{
						name: '业务指标',
						type: 'gauge',
						radius: '90%',
						center: ['50%', '60%'],
						min: Min,
						max: Max,
						pointer: { // 仪表盘指针。
							show: true,
							length: "90%",
							width: 5,
						},
						title: { //改变颜色
							textStyle: {
								color: titleColor
							}
						},
						axisLabel: {
							show: AxisLabelShow,
							color: '#B1B1B2',
							distance: dom * 0.067,
							fontSize: AxisLabelFontSize
						}, //刻度标签。
						axisTick: {
							show: false,
						},
						splitLine: { // 分隔线
							length: 0, // 属性length控制线长
							lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
								color: 'auto'
							},
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: axisLineArr,
								width: 10,
								shadowColor: '#000', //默认透明
								shadowBlur: 0,
							}
						}, //仪表盘轴线
						itemStyle: { // 仪表盘指针样式。
							color: "auto",
						},
						"z": 7,
						detail: {
							show: SeriesDetailShow,
							formatter: '{value} ' + Unit,
							lineHeight: 22,
							textStyle: {
								"fontSize": SeriesDetailFontSize,
							},
							formatter: function (value) {
                return DimensionName + "\n" + value;
            	},
							color: SeriesDetailColor
						},
						data: [{
							value: Dashvalue,/* 
							name: DimensionName, */
						}],

					},
					{
						name: '刻度',
						type: 'gauge',
						radius: '85%',
						center: ["50%", "60%"], //整体的位置设置
						axisLine: { // 坐标轴线
							lineStyle: { // 属性lineStyle控制线条样式
								color: axisLineArr,
								width: 35,
								opacity: 0, //刻度背景宽度
							}
						},
						splitLine: {
							length: 12, //刻度节点线长度
							lineStyle: {
								width: 2,
								color: 'auto'
							} //刻度节点线
						},
						splitNumber: Number(SplitNumber),
						axisTick: {
							show: true,
							lineStyle: {
								color: '#C9C9C9',
								width: 2
							},
							length: 6,
							splitNumber: Number(AxisSplitNumber),
						},
						z: 6,
						detail: {
							show: false
						},
						data: [{
							show: false,
						}],
						axisLabel: {
							show: false
						},
						pointer: {
							show: false
						},
						tooltip: {
							show: false
						},
					},
					{
						"name": '圆形',
						"type": 'pie',
						"hoverAnimation": false,
						"legendHoverLink": false,
						center: ['50%', '60%'],
						"z": 9,
						"radius": ['2.5%', '4%'],
						"labelLine": {
							"normal": {
								"show": false
							}
						},
						"data": [{
							"value": 100,
							itemStyle: {
								normal: {
									color: "#aaa"
								},
								emphasis: {
									color: "#aaa"
								}
							}
						}],
						detail: {
							show: false,
						},
						tooltip: {
							show: false
						},
					},
					{
						"name": '空白圆形',
						"type": 'pie',
						"hoverAnimation": false,
						"legendHoverLink": false,
						center: ['50%', '60%'],
						"radius": ['0%', '3%'],
						"z": 8,
						"data": [{
							"value": 100,
							itemStyle: {
								normal: {
									color: data.BackgroundColor.HtmlColor
								},
								emphasis: {
									color: data.BackgroundColor.HtmlColor
								}
							}
						}],
						"label": {
							"normal": {
								"show": false,
							},
							"emphasis": {
								"show": false
							}
						},
						"labelLine": {
							"normal": {
								"show": false
							}
						},
						tooltip: {
							show: false
						},
						detail: {
							show: false,
						},
					},
					{ //阴影
						type: 'gauge',
						startAngle: 225,
						endAngle: 225 - (Dashvalue2 / (Max - Min)) * 270,
						radius: '90%',
						center: ['50%', '60%'],
						axisLine: {
							show: true,
							lineStyle: {
								width: dom * 0.1,
								color: [
									[1, 'rgba(170,196,247,0.35)']
								]
							}
						},
						"z": 5,
						detail: {
							show: false,
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false
						},
						pointer: {
							show: false
						},
						detail: {
							show: false,
						},
						tooltip: {
							show: false
						},
						data: [{
							show: false,
						}],
					}
				]
			}
			Chart1.setOption(optionF);
			allchartlist.push([Chart1, PieChartData[i].name])
		} catch (e) {

		}
	}

}
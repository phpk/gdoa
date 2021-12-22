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
var option = {
	animation: false
};

var allchartlist = []


var LineChartShow = true
var LineData

// 修改折线图
function LinechartEcharts(PieChartData, PieChartNameData, type) {
	/* 
    type: 仪表盘列表页面全屏显示tooltip
   */
	PieChartData = JSON.parse(JSON.stringify(PieChartData))

	for (let i = 0; i < PieChartData.length; i++) {

		let indexName = PieChartNameData.indexOf(PieChartData[i].name)
		if (indexName == -1) {
			continue;
		}

		var data
		LineData = PieChartData[i].option
		data = LineData
		LineChartShow = false

		var ShowTootip = data.ShowTootip
		var TooptipTrigger = data.AxisPointer.Trigger
		var TooptipType = data.AxisPointer.Type
		var TooptipColor = data.AxisPointer.Color.HtmlColor
		var dataColor = data.Label.Color.HtmlColor
		var ItemHeight = data.Legend.ItemHeight
		var ItemWidth = data.Legend.ItemWidth
		var FontWeight = data.Legend.FontWeight
		var FontFamily = data.Legend.FontFamily
		var LengendShow = data.Legend.Show
		var LengenColor = data.Legend.Color.HtmlColor
		var lengenPosition = data.Legend.Position
		var lengenFontSize = data.Legend.FontSize
		var LengenB
		var lengenT
		var lengenL
		var LengenR
		var LPtb
		var LPlr
		var LegendData = []
		var TooColorArr = []
		var lengendScroll
		for (var j = 0; j < data.Variables.length; j++) {
			LegendData.push(data.Variables[j].DimensionName)
			TooColorArr.push(data.Variables[j].Color.HtmlColor)
			// .slice(0,7)
		}
		if (lengenPosition == 'LeftCenter') {
			LengenB = null
			lengenT = "center"
			lengenL = 'left'
			LengenR = null
			LPtb = 10
			LPlr = 10
			lengendScroll = 'vertical'
			let right = data.DrawContent.RightMargin + 10
			data.DrawContent.RightMargin = data.DrawContent.LeftMargin - 10
			data.DrawContent.LeftMargin = right
		}
		if (lengenPosition == 'RightCenter') {
			LengenB = null
			lengenT = "center"
			lengenL = null
			LengenR = "right"
			LPtb = 10
			LPlr = 30
			lengendScroll = 'vertical'
		}
		if (lengenPosition == 'TopCenter') {
			LengenB = null
			lengenT = "top"
			lengenL = null
			LengenR = "center"
			LPtb = 30
			LPlr = 10
			lengendScroll = 'horizontal'
			data.DrawContent.RightMargin = data.DrawContent.LeftMargin
		}
		if (lengenPosition == 'BottomCenter') {
			LengenB = "bottom"
			lengenT = null
			lengenL = null
			LengenR = "center"
			LPtb = 10
			LPlr = 10
			lengendScroll = 'horizontal'
			data.DrawContent.RightMargin = data.DrawContent.LeftMargin
		}

		var Title = data.Title.Title
		var TitlePosition = data.Title.Position
		var TitleIsChecked = data.Title.Show
		var TitleFontColor = data.Title.Color.HtmlColor
		var TitleFontSize = data.Title.FontSize
		var TitleFontWeight = data.Title.FontWeight
		var TitleFontFamily = data.Title.FontFamily
		var gridLeft = data.DrawContent.LeftMargin
		var gridRight = data.DrawContent.RightMargin
		var gridBottom = data.DrawContent.BottomMargin
		var gridTop = data.DrawContent.TopMargin

		var labelShow = data.Label.Show
		var labelFontSize = data.Label.FontSize
		var TextFontFamily = data.Label.FontFamily

		var toolboxShow = data.Toolbox == null ? false : data.Toolbox.FeatureShow

		var backgroundColor = data.BackgroundColor.HtmlColor
		//x轴
		var XfontSize = data.XAxis.FontSize
		var Xcolor = data.XAxis.Color.HtmlColor
		var XfontFamily = data.XAxis.FontFamily
		var XfontWeight = data.XAxis.FontWeight
		var XSplitLine = data.XAxis.SplitLine
		var XSplitLineFontWeight = data.XAxis.XSplitLineFontWeight
		var XSplitLineWidth = data.XAxis.SplitLineWidth
		var XSplitLineColor = data.XAxis.SplitLineColor.HtmlColor
		var XSplitLineShow = data.XAxis.SplitLineColor.SplitLineShow

		var YAxisesArr = []
		//y轴
		for (var v6 = 0; v6 < data.YAxises.length; v6++) {

			let YAxisMax1 = data.YAxises[v6].Max
			let YAxisMin1 = data.YAxises[v6].Min
			let offsetNum
			if (v6 != 0) {
				offsetNum = (v6 - 1) * 50
			} else {
				offsetNum = 0
			}
			if (data.YAxises[v6].Adaptive == true) {
				YAxisMax1 = null
				YAxisMin1 = null
			}
			var unit = data.YAxises[v6].Unit == null ? '' : data.YAxises[v6].Unit
			var YAxisesName = data.YAxises[v6].Name
			if (!data.YAxises[v6].ShowUnit) {
				unit = ''
			}
			if (!data.YAxises[v6].ShowTitle) {
				YAxisesName = ''
			}

			var value2 = {
				name: YAxisesName,
				offset: offsetNum,
				axisLabel: {
					formatter: "{value} " + unit,
					color: data.YAxises[v6].Color.HtmlColor,
					fontFamily: data.YAxises[v6].FontFamily,
					fontWeight: 400,
					fontSize: data.YAxises[v6].FontSize,
					textStyle: {
						fontWeight: null
					},
				},
				label: {
					textStyle: {
						color: data.YAxises[v6].Color.HtmlColor
					}
				},
				min: YAxisMin1,
				max: YAxisMax1,
				nameTextStyle: {
					fontSize: data.YAxises[v6].FontSize,
					color: data.YAxises[v6].Color.HtmlColor,
					show: false
				},
				axisLine: {
					lineStyle: {
						color: data.YAxises[v6].Color.HtmlColor
					}
				},
				splitLine: {
					show: data.YAxises[v6].ShowSeparator
				}
			}
			YAxisesArr.push(value2)
		}

		//辅助线
		var AuxiliaryLinesData = data.AuxiliaryLines

		var markLineData = []

		if (AuxiliaryLinesData.length) {
			for (var v1 = 0; v1 < AuxiliaryLinesData.length; v1++) {
				var value1 = {
					yAxis: AuxiliaryLinesData[v1].Value,
					Axis: {
						AxisType: AuxiliaryLinesData[v1].Axis.AxisType,
						Value: AuxiliaryLinesData[v1].Axis.Value
					},
					lineStyle: {
						type: AuxiliaryLinesData[v1].Type,
						color: AuxiliaryLinesData[v1].Color.HtmlColor
					}
				}
				markLineData.push(value1)
			}
		}

		//数据
		var seriesDatas = data.YDataCollection
		var Xdata = []
		var seData = []

		if (seriesDatas != undefined) {

			Xdata = data.XData
			var arr = []
			for (var v2 = 0; v2 < seriesDatas.length; v2++) {
				let value = {
					data: Object.values(seriesDatas[v2].YData),
					name: seriesDatas[v2].name
				}
				seData.push(value)
			}
		}



		VariablesData = data.Variables
		//样式
		var seriesArr = []
		var indexArr = []

		for (let v = 0; v < VariablesData.length; v++) {
			var markLineData2 = []

			if (VariablesData[v].CurrentAxis != null) {
				var index1 = indexArr.indexOf(VariablesData[v].CurrentAxis.Value)
			}

			if (index1 == -1) {
				for (var v5 = 0; v5 < markLineData.length; v5++) {
					if (VariablesData[v].CurrentAxis.Value == markLineData[v5].Axis.Value) {
						indexArr.push(VariablesData[v].CurrentAxis.Value)
						markLineData2.push(markLineData[v5])
					}
				}


			}
			var CurrentAxisValue = VariablesData[v].CurrentAxis == null ? null : VariablesData[v].CurrentAxis.Value > (YAxisesArr.length - 1) ? null : VariablesData[v].CurrentAxis.Value

			YAxisesArr

			let name11 = []
			for (let a = 0; a < seData.length; a++) {
				name11.push(seData[a].name)
			}
			let index = name11.indexOf(VariablesData[v].DimensionName)
			if (index != -1) {
				var data11 = seData[v].data
			}
			var value = {
				"name": VariablesData[v].DimensionName,
				"data": data11,
				"type": VariablesData[v].DataType.toLowerCase(),

				"label": {
					"fontSize": labelFontSize,
					"show": labelShow,
					"color": dataColor,
					"fontFamily": TextFontFamily
				},
				"lineStyle": {
					"color": VariablesData[v].Color.HtmlColor, // .slice(0,7),
					"width": 3,
					"shadowBlur": 25,
					"shadowOffsetY": 10,
					"shadowColor": "rgba(0, 0, 0, 0.2)"
				},

				"yAxisIndex": CurrentAxisValue,
				markLine: {
					symbol: 'none',
					data: markLineData2
				}
			}
			if (VariablesData[v].DimensionName != null) {
				seriesArr.push(value)
			}
		}

		if (document.getElementById(`${PieChartData[i].name}`)) {
			Chart1 = echarts.init(document.getElementById(`${PieChartData[i].name}`));
		}
		try {
			Chart1.clear()
			Chart1.resize()
			Chart1.on('legendselectchanged', function (obj) {
				var a = Chart1.getOption();
				var seriesData = a.series
				var yIndex
				var markLine
				var show
				var s1
				var s2
				var s
				for (let i = 0; i < seriesData.length; i++) {
					if (seriesData[i].name == obj.name) {
						yIndex = seriesData[i].yAxisIndex
						s = seriesData[i]
						if (!obj.selected[obj.name]) {
							if (seriesData[i].markLine != '' && seriesData[i]?.markLine?.data?.length) {
								show = true
								markLine = seriesData[i].markLine
								s = seriesData[i]
							} else {
								show = false
							}
						} else if (s.markLine) {
							if (s.markLine == '' || s.markLine.data.length == 0) {
								let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
								if (x.length) {
									let m = x[0].markLine;
									s.markLine = m;
									x[0].markLine = '';
									Chart1.setOption(a, true);
								}
							}

						}
					}
				}
				for (let i = 0; i < seriesData.length; i++) {
					if (seriesData[i].name != obj.name) {
						if (!obj.selected.hasOwnProperty(seriesData[i].name) ||
							obj.selected[seriesData[i].name]) {

							if (show) {
								var isShow = seriesData[i].yAxisIndex == yIndex
								if (isShow) {
									seriesData[i].markLine = markLine
									s.markLine = []
									Chart1.setOption(a, true);
									return
								}
							}
						}
					}
				}
			})
			var aa = {
				animation: false,
				"color": TooColorArr,
				"tooltip": {
					"show": ShowTootip,
					"trigger": TooptipTrigger,
					"axisPointer": {
						"type": TooptipType,
						"lineStyle": {
							"color": TooptipColor
						}
					}
				},
				// "toolbox": {
				//     "show":toolboxShow,
				//     "right":15,
				//     "top":15,
				//     "feature": {

				//         // "dataZoom": {
				//         //     "yAxisIndex": 'none'
				//         // },
				//         // "restore": {},
				//     }
				// },
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

								// //window.top表示最顶层iframe  如果在当页面全屏打开 删去window.top即可
								let id = e.scheduler.ecInstance._dom.id
								FullScreen($(`#${id}`)[0]);

							}
						}
					}
				},
				"yAxis": YAxisesArr,
				"xAxis": {
					"data": Xdata,
					"axisLabel": {
						"fontWeight": XfontWeight,
						"fontFamily": XfontFamily,
						"textStyle": {
							"fontWeight": XfontWeight,
						},
						"fontSize": XfontSize,
						// "fontStyle": 'italic',
						"color": Xcolor,
						/* "interval": 0,   */
   					/* "rotate": 45,  */
						formatter: function (params) {
							let isDate = isValidDate(new Date(params))
							if (!isDate) {
								let newParamsName = "";// 最终拼接成的字符串
								var paramsNameNumber = params.length;// 实际标签的个数
								var provideNumber = 7;// 每行能显示的字的个数
								var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
								/**
								 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
								 */
								 // 条件等同于rowNumber>1
								if (paramsNameNumber > provideNumber) {
											/** 循环每一行,p表示行 */
											for (var p = 0; p < rowNumber; p++) {
													var tempStr = "";// 表示每一次截取的字符串
													var start = p * provideNumber;// 开始截取的位置
													var end = start + provideNumber;// 结束截取的位置
													// 此处特殊处理最后一行的索引值
													if (p == rowNumber - 1) {
															// 最后一次不换行
															tempStr = params.substring(start, paramsNameNumber);
													} else {
															// 每一次拼接字符串并换行
															tempStr = params.substring(start, end) + "\n";
													}
													newParamsName += tempStr;// 最终拼成的字符串
											}

									} else {
											// 将旧标签的值赋给新标签
											newParamsName = params;
									}
								return newParamsName
							}
							return params
						}
					},
					"axisLine": {
						"lineStyle": {
							"color": Xcolor
						}
					},
					"splitLine": {
						"lineStyle": {
							"color": {
								"HtmlColor": XSplitLineColor
							}
						},
						"show": XSplitLineShow
					}
				},
				"series": seriesArr,
				"legend": {
					"type": 'scroll',
					"orient": lengendScroll,
					"data": LegendData,
					"icon": "circle",
					"itemHeight": ItemHeight,
					"itemWidth": ItemWidth,
					"textStyle": {
						"fontWeight": FontWeight,
						"fontFamily": FontFamily,
						"color": LengenColor,
						"fontSize": lengenFontSize,
					},
					"show": LengendShow,
					"left": lengenL,
					"right": LengenR,
					"top": lengenT,
					"bottom": LengenB,
					"padding": [LPtb, LPlr]
				},
				"backgroundColor": backgroundColor,
				"title": {
					"textStyle": {
						"color": TitleFontColor,
						"fontSize": TitleFontSize,
						"fontWeight": TitleFontWeight,
						"fontFamily": TitleFontFamily
					},
					"padding": [12, 10],
					"x": TitlePosition.toLowerCase(),
					"show": TitleIsChecked,
					"text": Title
				},
				"grid": {
					"left": gridLeft,
					"right": gridRight,
					"bottom": gridBottom,
					"top": gridTop
				}
			}
			Chart1.setOption(aa, true);
		} catch (e) {

		}
	}
}

function isValidDate(date) {	// 判断是否为无效日期
  return date instanceof Date && !isNaN(date.getTime())
}

function FullScreen(el) {
	var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
	if (!isFullscreen) { //进入全屏,多重短路表达式
		(el.requestFullscreen && el.requestFullscreen()) ||
		(el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
		(el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());

	} else { //退出全屏,三目运算符
		document.exitFullscreen ? document.exitFullscreen() :
			document.mozCancelFullScreen ? document.mozCancelFullScreen() :
			document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
	}


}


//替换不相同属性
//替换不相同属性
function addOrModify(target, source) {
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
				addOrModify(target[key], source[key]);
			} else if (!modify) {
				target[key] = ele;
			}
		}
	}
}
var HuangLi = {};
var calData = new Array();
var currentDate = new Date();
var rows;
var showingToday = true;	//显示的是今天
var taskHover_inblock = false;
var taskHover_inhover = false;
var madeRiliDate = new Date();
var record = {
	elem_id : "",
	nav_date : new Date()
};
var	timeSelf = 0; //本地时间
var timeBeijing; //北京时间
function clock(time){
	timeSelf = (new Date()).getTime();jprestWork
	timeBeijing = time*1000;
}
Number.prototype.toPercent = function(n){
	n = n || 0;
	return ( Math.floor( this * Math.pow( 10, n + 2 ) ) / Math.pow( 10, n ) ).toFixed( n ) + '%';
}
var calander = {
	//initialization the calender
	init:function()
	{
		makeCal.pareData(new Date());
		makeCal.showCal(new Date());
		//init初始化的功能只需要初始化一次
		makeCal.initAction();
		makeCal.makeHuangli(currentDate);
		//CallData(currentDate);

	},
	//make the calender of `date`
	pareData:function(date)
	{
		date = makeCal.setTimeZero(date);
		madeRiliDate = new Date(date);
		//the first of this month
		var monthFirstD = makeCal.getMonthFirst(date);
		//the first in the table
	 	var tableFirstD = makeCal.getWeekFirst(monthFirstD);
		//the first of next month
		var nextMonthFirstD = makeCal.addTime(monthFirstD, 1, "month");
		//last day of this month
		var monthLastD = makeCal.addTime(nextMonthFirstD, -1, "day");
		//get the rows
		rows = Math.ceil((nextMonthFirstD.valueOf()-tableFirstD.valueOf())/(60*60*24*1000*7));
		//loop to calculate the data
		var indexDay = new Date(tableFirstD);
		var nowDay = makeCal.setTimeZero(new Date());
		
		makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
	},
	
	fillCalData:function(indexDay, monthFirstD, monthLastD, nowDay){
		calData = [];
		for ( var i = 0; i < rows; i++){
			var week = [];
			for ( var j = 0; j < 7; j++){
				var aDay = makeCal.createDay();
				//set mode
				if ( indexDay.getTime() < monthFirstD.getTime()){
					aDay.before = true;
					//aDay=null;
				}
				else if ( indexDay.getTime() > monthLastD.getTime()){
					aDay.after = true;
					//aDay=null;
				}
				
				//set year month date
				aDay.year = indexDay.getFullYear();
				aDay.month = indexDay.getMonth();
				aDay.date = indexDay.getDate();
				if ( indexDay.getTime() == nowDay.getTime()){
					aDay.today = true;
				}
				if ( j == 0 || j == 6){
					aDay.weekend = true;
				}
				aDay.rows = rows;
				aDay.inrow = i+1;
				aDay.value = indexDay;
				aDay.china = templates.lunar_Info(aDay.value);
				//临时调整节气
				//var date_detail = aDay.value.getFullYear()+"-"+(aDay.value.getMonth()+1)+"-"+aDay.value.getDate();
				week.push(aDay);
				indexDay = makeCal.addTime(indexDay, 1, "day");
			}
			calData.push(week);
		}
	},
	
	showCal:function(selectDate){
		var is5Row = (rows<=5?true:false);
		if ( typeof(selectDate) == "undefined" ){
			selectDate = date = makeCal.setTimeZero(new Date());
		}
		selectDate = makeCal.setTimeZero(selectDate);
		var cldCache = null;//月份为转换后的月
		$('#month_num').text(selectDate.getMonth()+1);
		$('#year_num').text(selectDate.getFullYear());
		var table = "<table> \
						<thead class='tablehead'> \
							<tr> \
								<td class='thead' style='color:#bc5016;'>日</td> \
								<td class='thead'>一</td> \
								<td class='thead'>二</td> \
								<td class='thead'>三</td> \
								<td class='thead'>四</td> \
								<td class='thead'>五</td> \
								<td class='thead' style='color:#bc5016;'>六</td> \
							</tr> \
						</thead> \
					</table> \
					<table id='cont' style='height:100%;'> \
						<tbody>";
		var index=40;
		var ind=0;
		for ( var i = 0; i < rows; i++)
		{
			var	aWeek = "<tr style='height:"+(1/rows).toPercent()+";'>";
			for ( var j = 0; j < 7; j++)
			{
				if(calData[i][j]!=null){
					var tdclass = "";				
					if ( calData[i][j].today == true ){
						tdclass = 'today';
					}
					var numtype = "number";
					
					var isClickBlock = "";
					if (calData[i][j].today == false && calData[i][j].value.getTime() == selectDate.getTime()){
						isClickBlock = " block_click";
					}
					var aDay = "";
					if(is5Row)
						aDay = "<td i="+i+" j="+j+" style='height:"+(1/rows).toPercent()+";' class='block block5 "+tdclass+isClickBlock+"'>";
					else
						aDay = "<td i="+i+" j="+j+" style='height:"+(1/rows).toPercent()+";' class='block "+tdclass+isClickBlock+"'>";
					
					aDay += "<a class='block_content'" +
					"data='"+(calData[i][j].value.format('MMdd'))+ "' href=\"javascript:;\">";
					var dateDay = calData[i][j].date;
					
					var restOrWork = '';
					
					var year= calData[i][j].value.getFullYear();
					var md= calData[i][j].value.format('MMdd');
					
					if((worktime.years.join('').indexOf(year)!=-1)&&(worktime['y'+year].workRestStr.indexOf('d'+md)!=-1)){
						restOrWork = worktime['y'+year]['d'+md].w;
					}else{
						restOrWork='';
					}
					if(restOrWork!=''){
						if(restOrWork=="班"){
							aDay += "<div class='jprestWork jprestWorkw'>"+restOrWork+"</div>";
						}else{
							aDay += "<div class='jprestWork'>"+restOrWork+"</div>";
						}
					}else{
						//aDay += "<div class='jprestWork'>&nbsp;</div>";
					}
					aDay += "<div style='display:inline-block;position:absolute;" +
					         "top:50%;width:100%;margin-top:-22px;left:0;'>";
					if(calData[i][j].weekend&&!(calData[i][j].after||calData[i][j].before)){
						aDay += "<div class='"+numtype+"' style='color:#ff4e00;'>"+dateDay+"</div>";
					}else{
						if(calData[i][j].after||calData[i][j].before){
							aDay += "<div class='"+numtype+"' style='color:#c3c3c3;'>"+dateDay+"</div>";
						}else{
							aDay += "<div class='"+numtype+"'>"+dateDay+"</div>";
						}
					}
					//var dataStr= "";
					cldCache = cacheMgr.getCld(year,calData[i][j].value.getMonth());
					var dayStr="";
					var color = "style='color:#BC5016;'";
					var title = "";
					if(cldCache[dateDay-1].lunarFestival!=undefined&&cldCache[dateDay-1].lunarFestival!=''){
						dayStr=cldCache[dateDay-1].lunarFestival;
					}else if(cldCache[dateDay-1].solarFestival!=undefined&&cldCache[dateDay-1].solarFestival!=''){
						dayStr=cldCache[dateDay-1].solarFestival;
					}else if(cldCache[dateDay-1].solarTerms!=undefined&&cldCache[dateDay-1].solarTerms!=''){
						dayStr=cldCache[dateDay-1].solarTerms;
					}else{
						dayStr=calData[i][j].china.l_day;
						color="";
						title="";
					}				
					
					if(color!="") {
						var dayTitle = "";
						if(cldCache[dateDay-1].lunarFestival!=undefined&&cldCache[dateDay-1].lunarFestival!=''){
							dayTitle=cldCache[dateDay-1].lunarFestival;
							title += dayTitle;
						}
						if(cldCache[dateDay-1].solarFestival!=undefined&&cldCache[dateDay-1].solarFestival!=''){
							dayTitle=cldCache[dateDay-1].solarFestival;
							if(title.trim()!="") {
								title+="| ";
							}
							title += dayTitle;
						}
						if(cldCache[dateDay-1].solarTerms!=undefined&&cldCache[dateDay-1].solarTerms!=''){
							dayTitle=cldCache[dateDay-1].solarTerms;
							if(title.trim()!="") {
								title+="| ";
							}
							title += dayTitle;
						}
					}
					
					aDay += "<div class='lnumber' title='"+title+"' "+color+">"+dayStr+"</div>";
					aDay += "</div><div class='tdhover'></div></a></td>";
					aWeek += aDay;
				}else{
					aWeek+="<td></td>";
				}
			}
			aWeek += "</tr>";
			table += aWeek;
		}
		table += "</tbody></table>";
		$('#mainCal').empty();
		$('#mainCal').append(table);
		
		makeCal.makeAction();
		
		//加载当月的数据
//		loadMonthEvent(selectDate);
		changeStyle();
	},
	
	
	//init初始化的功能只需要初始化一次
	initAction:function()
	{
		$('#next_button_a').bind('click', function(e){
			var month = currentDate.getMonth();
			var year = currentDate.getFullYear();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month++;
			if ( month > 11 )
			{
				month = 0;
				year++;
			}
			var currentMonth = real_show_month;
			currentDate = makeCal.addTime(currentDate, 1, "month");
			if ( currentDate.getMonth() != (currentMonth+1)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth(currentMonth+1);
			}
			$('#year_num').text(year);
			$('#month_num').text(month+1);
			makeCal.nextMonth(currentDate);
		});
		$('#prev_button_a').bind('click', function(e){
			var month = currentDate.getMonth();
			var year = currentDate.getFullYear();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month--;
			if ( month < 0 )
			{
				month = 11;
				year--;
			}
			var currentMonth = real_show_month;
			currentDate = makeCal.addTime(currentDate, -1, "month");
			if ( currentDate.getMonth() != (currentMonth+11)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth((currentMonth+11)%12);
			}
			$('#year_num').text(year);
			$('#month_num').text(month+1);
			makeCal.prevMonth(currentDate);
		});
		$('#today_button').unbind();
		$('#today_button').bind('click', function(e){
			 makeCal.showToday();
			$("#today_button").css("display","none");
			//currentDate=new Date();
			//call to refresh center block data
			//date format : 20120101  , 8 digital
			//var todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate(),0,0,0);
			//refreshCenterDataOfDate(todayDate);
			$("#btns #today").removeClass("botton_today1");
		});
		//$('#top_bar_time').text(makeCal.getServerTime());
		$('#year_num').text(currentDate.getFullYear());
		$('#month_num').text(currentDate.getMonth()+1);
		
		/*setInterval(function(){
			var time = makeCal.getServerTime();
			$('#top_bar_time').text(makeCal.getServerTime());
			if ( time == '00:00:00' && showingToday )
			{
				var d = new Date();
				makeCal.pareData(d);
				makeCal.showCal(d);
				$('#year_num').text(d.getFullYear());
				$('#month_num').text(d.getMonth()+1);
			}
		}, 1000);*/
		
		var indiv = false;
		var inhuangli = false;
		
		$('#huangliDiv').bind('mouseover', function(e){
			inhuangli = true;
			setTimeout(function(){
				if ( indiv || inhuangli )
				$('#huangliDiv').css({'display': 'block'});
				}, 500);
		});
		$('#huangliDiv').bind('mouseout', function(e){
			inhuangli = false;
			if ( indiv == false )
			{
			setTimeout(function(){
				if ( inhuangli == false && indiv == false )
				$('#huangliDiv').css({'display': 'none'});
				}, 500);
			}
		});

		  /*$(".today").unbind();

    $(".calendar .block").unbind();
	$(".calendar .block").on("click",function(){
		if(!$(this).hasClass('today')){
		 	$("#today_button").css("display","block");
		}else{
			$("#today_button").css("display","none");
		}
	
	});*/
	},
	//make初始化的功能每次重绘table后就要初始化一次
	makeAction:function(){
//	    $(".tdhover").on("click",function(){
//       	 $(this).closest(".block").click();
//       	 
//        });
		$('.tdhover').unbind();
		$('.tdhover').bind('click', function(e){
			var that= $(this).closest(".block");
			$(".block").removeClass("block_click");
			that.addClass("block_click");
			var real_show_month = madeRiliDate.getMonth();
			ele = $(e.target);
			while(1)
			{
				if ( ele.hasClass('block'))
				{
					break;
				}
				else
				{
					ele = ele.parent();
				}
			}
			
			click_date = calData[ele.attr('i')][ele.attr('j')].value;
			//click on a prevDate
			if ( click_date.getMonth() == (real_show_month + 11)%12)
			{
				makeCal.prevMonth(click_date);
				$("#today_button").css("display","block");
				return;
			}
			else if ( click_date.getMonth() == (real_show_month+1)%12 )
			{
				makeCal.nextMonth(click_date);
				$("#today_button").css("display","block");
				return;
			}
			if ( ele.hasClass('today') == false )
			{
				
			}
			var nowTime = new Date();
			calData[ele.attr('i')][ele.attr('j')].value.setHours(nowTime.getHours(),nowTime.getMinutes(),nowTime.getSeconds());
			makeCal.makeHuangli(calData[ele.attr('i')][ele.attr('j')].value);
			
			//call to refresh center block data
			//date format : 20120101  , 8 digital
			//refreshCenterDataOfDate(calData[ele.attr('i')][ele.attr('j')].value);
			
			//
			if(!that.hasClass('today')){
			 	$("#today_button").css("display","block");
			}else{
				$("#today_button").css("display","none");
			}
			
			if(click_date.getMonth()!=new Date().getMonth()){
				$("#btns #today").addClass("botton_today1");
			}
		});
	},
	//生成黄历div
	makeHuangli:function(date)
	{
		currentDate=date;
		date = makeCal.setTimeZero(date);
		var datestr = date.getDate();
		lunar = templates.lunar_Info_detail(date, showYJ);
		$('#right_big_date').text(datestr);
		var gregorianDayStr = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
		var weekDayStr="";
		switch (date.getDay())
		{
			case 1:
				weekDayStr = '星期一';
				break;
			case 2:
				weekDayStr = '星期二';
				break;
			case 3:
				weekDayStr = '星期三';
				break;
			case 4:
				weekDayStr = '星期四';
				break;
			case 5:
				weekDayStr = '星期五';
				break;
			case 6:
				weekDayStr = '星期六';
				break;
			case 0:
				weekDayStr = '星期日';
				break;			
		}
		$('#gregorianDayStr').text(gregorianDayStr);
		$('#weekDayStr').text(weekDayStr);
		$('#popDateStr').text(getFullDateStr(date));
		$('#popChineseStr').text((lunar.lunar).substring(2));
		var nowDate = makeCal.setTimeZero(new Date());
		var nowMiliSecond = nowDate.getTime();
		var targetMiliSecond = date.getTime();
		var passedTime = Math.ceil((targetMiliSecond - nowMiliSecond)/86400000);
		var dayafterorbeforeStr = "";
		if ( nowDate.getDate() == date.getDate() )
		{
			dayafterorbeforeStr = '今天';
		}
		if ( passedTime < 0 )
		{
			dayafterorbeforeStr = (0-passedTime)+"天前";
		}
		else if ( passedTime > 0 )
		{
			dayafterorbeforeStr = passedTime+"天后";
		}
		$('#dayafterorbefore').text(dayafterorbeforeStr);
		$('#chinaDay').text((lunar.lunar).substring(2));
		$('#china_Dt').text((lunar.lunar).substring(2));
		
		//1.23日春节前显示为兔年
		if(date.getFullYear()==2012 && (date.getMonth()==0 && date.getDate()<23)){
			lunar.y_Info=lunar.y_Info.replace("龙","兔");
		}
		//2013 1 1~3013 2 9显示为龙年
		if(date.getFullYear()==2013 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<10))){
			lunar.y_Info=lunar.y_Info.replace("蛇","龙");
		}
		info = lunar.y_Info;
		var yInfo = info.split(" ");
		$('#chinaDay2').text(yInfo[0]);
		$('#chinaDay3').text(yInfo[1]);
		var aDate=yInfo[0].replace(/[&\|\\\*^%$#@【】年\-]/g,"");
		//console.log(aDate);
  	  $('#china_Dt').prepend(aDate+"年&nbsp;");
		/*
		 *由于黄历“宜”，“忌”数据加载有延迟，将其封装作为获取宜忌数据的回调方法 		 
		 */
		function showYJ(lunar){
			Y = lunar.huangliY;
			$('#ylist').empty();
			if(Y.length>0){
				Ys = Y.split('.');
				for ( var key in Ys )
				{
					$('#ylist').append(Ys[key]+' ');
				}
			}else{
				$('#ylist').append('无');
			}
			J = lunar.huangliJ;
			$('#jlist').empty();
			if(J.length>0){
				Js = J.split('.');
				$('#jlist').empty();
				for ( var key in Js )
				{
					$('#jlist').append(Js[key]+' ');
				}
			}else{
				$('#jlist').append('无');
			}
		}
		//add by wuzhq
		calendarHandler.setSelectedDate(date);
		//设置"年、月"下拉框的值
		setYMVforSelect(date);
	},
	makeHuangliForCalFull:function(date){
		date = makeCal.setTimeZero(date);
		var lunar = templates.lunar_Info_detail(date,undefined);
		var gregorianDayStr = date.getFullYear()+"年"+(date.getMonth()+1)+"月 ";
		switch (date.getDay())
		{
			case 1:
				gregorianDayStr += '星期一';
				break;
			case 2:
				gregorianDayStr += '星期二';
				break;
			case 3:
				gregorianDayStr += '星期三';
				break;
			case 4:
				gregorianDayStr += '星期四';
				break;
			case 5:
				gregorianDayStr += '星期五';
				break;
			case 6:
				gregorianDayStr += '星期六';
				break;
			case 0:
				gregorianDayStr += '星期日';
				break;			
		}
		lunar.solar=gregorianDayStr;
		//1.23日春节前显示为兔年
		if(date.getFullYear()==2012 && (date.getMonth()==0 && date.getDate()<23)){
		lunar.y_Info=lunar.y_Info.replace("龙","兔");
		}
		//2013 1 1~3013 2 9显示为龙年
		if(date.getFullYear()==2013 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<10))){
		lunar.y_Info=lunar.y_Info.replace("蛇","龙");
		}
		return lunar;
	},
	//get the first date in the week where `date` in
	getWeekFirst:function(date){
		var day = date.getDay();
		//if ( day == 0 )
		//{
		//	day = 7;
		//}
		return makeCal.addTime(date, 0-day, "day");
	},
	//get the first date in the month where `date` in
	getMonthFirst:function(date){
		ndate = new Date(date);
		ndate.setDate(1);
		return ndate;
	},
	//add `inc` time which `mode` said on `date`
	addTime:function(date, inc, mode){
		ndate = new Date(date);
		switch(mode)
		{
			case "day":
				ndate.setDate(date.getDate()+inc); 
				break;
			case "week": 
				ndate.setDate(date.getDate()+7*inc); 
				break;
			case "month": 
				ndate.setMonth(date.getMonth()+inc); 
				break;
			case "year": 
				ndate.setYear(date.getFullYear()+inc); 
				break;
			case "hour": 
				ndate.setHours(date.getHours()+inc); 
				break;
			case "minute": 
				ndate.setMinutes(date.getMinutes()+inc); 
				break;
			default:
				return ndate;
		}
		return ndate;
	},
	//set the time of date zero
	setTimeZero:function(date){
		ndate = new Date(date);
		ndate.setHours(0);
		ndate.setMinutes(0);
		ndate.setSeconds(0);
		ndate.setMilliseconds(0);	
		return ndate;
	},
	//the day object
	createDay:function(){
		obj = new Object();
		obj.year = 0;
		obj.month = 0;
		obj.date = 0;
		obj.day = 0;
		obj.before = false;
		obj.after = false;
		obj.weekend = false;
		obj.china = null;
		obj.rows = 0;
		obj.inrow = 0;
		obj.today = false;
		obj.value = null;
		obj.hasWork = false;
		return obj;
	},
	//下一个月
	nextMonth:function(clickDate){
		makeCal.pareData(clickDate);
		makeCal.showCal(clickDate);
		showingToday = false;
		makeCal.makeHuangli(clickDate);
	},
	//上一个月
	prevMonth:function(clickDate){
		makeCal.pareData(clickDate);
		makeCal.showCal(clickDate);
		showingToday = false;
		makeCal.makeHuangli(clickDate);
	},
	//显示今天
	showToday:function(){
		currentDate = new Date();
		makeCal.pareData(currentDate);
		makeCal.showCal(new Date());
		$('#year_num').text(currentDate.getFullYear());
		$('#month_num').text(currentDate.getMonth()+1);
		showingToday = true;
		makeCal.makeHuangli(currentDate);
	},
	//显示指定时间的日历
	showSomeMonth:function(currentDate){
		//currentDate = currentDate;
		makeCal.pareData(currentDate);
		makeCal.showCal(currentDate);
		$('#year_num').text(currentDate.getFullYear());
		$('#month_num').text(currentDate.getMonth()+1);
		showingToday = true;
		makeCal.makeHuangli(currentDate);
	}
};
function StringBuffer(){
	this._strings = new Array();
};
StringBuffer.prototype.append = function(str){
	this._strings.push(str);
	return this;
};
StringBuffer.prototype.toString = function(){
	var str = arguments.length == 0 ? '' : arguments[0];
	return this._strings.join(str);
};
var templates = {
	month_day : function(date){
		var d = date || new Date();
		return d.getDate();
	},
	lunar_Info : function(date){
		var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
		var day = date.getDate();
		var cld_day = cld[day - 1];
		var lunar_detail = {
			l_day : "",
			l_month : "",
			l_day_full:""
		};
		lunar_detail.l_day = cDay(cld_day.lDay);
		lunar_detail.l_month = cld_day.lMonth;
		lunar_detail.color = "";
		return lunar_detail;
	},
	lunar_Info_detail : function(date, callback){
		var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
		//var year = date.getFullYear();
		var day = date.getDate();
		var cld_day = cld[day - 1];
		//var festival=[];
		var info = {
			lunar:"",
			y_Info:"",
			huangliY:"无",
			huangliJ:"无"
		};
		info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '')+templates.getChinaNum(cld_day.lMonth)+"月"+ cDay(cld_day.lDay);
		info.y_Info = cld_day.cYear + '年【' +this.lunar_year(date) +"】 "+ cld_day.cMonth + '月' + cld_day.cDay + '日';
		try{			
			var cM= cld_day.cMnumber;
			var cD= cld_day.cDnumber;
			
			var month = (cM-2)%12;
			var jianxing = (cD-month)%12;
			var jiazi = cD%60;
			
			if(jianxing.toString().length==1)
			{
				jianxing="0"+jianxing;
			}
			if(jiazi.toString().length==1)
			{
				jiazi="0"+jiazi;
			}
			var YJArray = _lunarJson[jianxing+""+jiazi];
			
			info.huangliY = YJArray.Y;
			info.huangliJ = YJArray.J;
			
			if(callback){
				callback(info);
			}
			
		} catch (e) {
			
		}
		return info;
	},
	lunar_year : function(date){

		var l_year = Animals[(date.getFullYear() - 4) % 12] + '年';
		return l_year;
	},
	getChinaNum :function(Num) {
		var monthEn='';
		switch(Num){
			case 1 : monthEn = "一";break;
			case 2 : monthEn = "二";break;
			case 3 : monthEn = "三";break;
			case 4 : monthEn = "四";break;
			case 5 : monthEn = "五";break;
			case 6 : monthEn = "六";break;
			case 7 : monthEn = "七";break;
			case 8 : monthEn = "八";break;
			case 9 : monthEn = "九";break;
			case 10 : monthEn = "十";break;
			case 11 : monthEn = "十一";break;
			case 12 : monthEn = "腊";break;
		}
		return monthEn;
	},
	init_sel_festival : function(){
		//var festival_m = festival_main;
		if(festival_main)
		{
			var str = new StringBuffer();
			str.append('<div id="festival_sel_body">');
			for(var i in festival_main){
					str.append('<div date="'+i).append('">').append(festival_main[i]+'</div>');
			}
			str.append('</div>');	
		}
		//$("#festival_sel_div").html(str.toString());
		$("#festival_sel_body>div").each(function(){
			$(this).click(function(){
				var y = $(this).attr("date").split("_");
				
				record.nav_date.setFullYear(y[0]);
				record.nav_date.setMonth(Number(y[1])-1);
				generic_cal(record.nav_date,record.elem_id);
				$("#festival_sel_div").hide();
			});
			$(this).hover(function(){
				$(this).addClass("year_bg");
			},
			function(){
				$(this).removeClass("year_bg");
			});
		});
	},
	init_sel_year : function(){
		var str = new StringBuffer();
		str.append('<div id="sel_body">');
		for(var i=1900;i<2050;i++)
		{
			str.append('<div>').append(i).append('</div>');
		}
		str.append('</div>');
		// 设置日期选择的初始位置
		//var scroll_top = record.nav_date.getFullYear()-1900;
		$("#open_sel_div").html(str.toString());
		$("#sel_body>div").each(function(){
			$(this).click(function(){
				var y = $(this).html();
				record.nav_date.setFullYear(y);
				generic_cal(record.nav_date,record.elem_id);
				$("#open_sel_div").hide();
			});
			$(this).hover(function(){
				$(this).addClass("year_bg");
			},
			function(){
				$(this).removeClass("year_bg");
			});
		});
	},
	mousedown_hide_ele : function(id){
		$(document).bind("mousedown."+id, function(r) {
			var p = r.target;
			var q = document.getElementById(id);
			while (true) 
			{
				if (p == q) 
				{
					return true;
				} 
				else 
				{
					if (p == document) 
					{
						$(document).unbind("mousedown."+id);
						$("#"+id).hide();
							return false;
					} 
					else 
					{
						p = $(p).parent()[0];
					}
				}
			}
		});
	}
};
var cacheMgr = {
	cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
	getCld : function(year, month) {
		var key = getMonthKey(year, month);
		var cld = this.cldCache[key];
		if (typeof cld == 'undefined')
		{
			cld = new calendar(year, month);
			this.cldCache[key] = cld;
		}
		return cld;
	}
};
function getRelativePath(sRelative) {// shawl.qiu code, return string 
    var sUrl = document.URL;
    sUrl = sUrl.replace(/^.*?\:\/\/[^\/]+/, "").replace(/[^\/]+$/, "");
    if (!sRelative) { return sUrl; }
    if (!/\/$/.test(sUrl)) { sUrl += "/"; }
    if (/^\.\.\//.test(sRelative)) {
        var Re = new RegExp("^\\.\\.\\/"), iCount = 0;
        while (Re.exec(sRelative) != null) {
            sRelative = sRelative.replace(Re, "");
            iCount++;
        }
        for (var i = 0; i < iCount; i++) { sUrl = sUrl.replace(/[^\/]+\/$/, ""); }
        if (sUrl == "") return "/";
        return sUrl + sRelative;
    }
    sRelative = sRelative.replace(/^\.\//, "");
    return sUrl + sRelative;
} // end function fRelativePath(sRelative)
function getMonthKey(year, month) 
{ // 传入的month为0-11的数值
	return year.toString() + (month + 1).toString().leftpad(2); // 返回yyyyMM格式的字符串
}
String.prototype.leftpad = function(len, str)
{
	if (!str) 
	{
		str = '0';
	}
	var s = '';
	for (var i = 0; i < len - this.length; i++) 
	{
		s += str;
	}
	return s + this;
};
window.makeCal = calander;
function getMonthDateStr(date)
{
	month = date.getMonth()+1;
	day = date.getDate();
	if ( month < 10 )
	{
		month = "0"+month;
	}
	if ( day < 10 )
	{
		day = "0" + day;
	}
	return month+""+day;
}
function getFullDateStr(date)
{
	month = date.getMonth()+1;
	day = date.getDate();
	year = date.getFullYear();
	return year+"-"+month+"-"+day;
}

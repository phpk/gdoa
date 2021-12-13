var eventDataList = null;   
var _baseURL = "/admin/tools/rili/";
var _uId="";
$(function(){
	//设置用户名
//	setUserName();
	//初始化日历
	//calander.init();
	//绑定事件
	$("#indexWindow").css("visibility","visible");
	//设置indexWindow高度
	//$("#indexWindow").parent().height($("#indexWindow").parent().height());
	$("#indexWindow").next().css("position","absolute");
	
	//为"年"的下拉框提供值
	for(var year=1900;year<2051;year++){
		$("#yearjpDDM").append("<li><a>"+year+"</a></li>");
	}
	$("#yearjpDDM li a").click(function(){
		var year = parseFloat($(this).text());
		$("#yearValue").text(year);
		var dateTime = currentDate;
		calander.showSomeMonth(new Date(dateTime.setFullYear(year)));
	});
	
	//"年"的下拉框事件
	$('#dropdownYear').bindState(1,"jp-dropdown",true);
	$('#dropdownYear').click(function(){
		var yearValue = parseInt($("#yearValue").text());
		var liHeihgt = $(this).children('ul').children().eq(0).height();
		var scrollTop = (yearValue-1900)*liHeihgt;
		$(this).children('ul').scrollTop(scrollTop);
	});
	
	//"月"的下拉框事件
	$('#dropdownMonth').bindState(1,"jp-dropdown",true);
	
	$('#dropdownMonth li a').click(function(){
		var month = parseFloat($(this).text());
		$("#monthValue").text(month);
		var dateTime = currentDate;
		calander.showSomeMonth(new Date(dateTime.setMonth(month-1)));
	});
	
	//点击'body'时，关闭"dropdown"
	$('body').bind('click.dropdown',function(){
		$(".jp-dropdown-menu").parent().removeClass('jp-dropdown-on');
	});
	
	//点击'body'时，关闭"事件数"显示框
	$('body').bind('click.popover',function(){
		$(".jp-popover").remove();
	});
	//绑定"宜""忌"的hover事件
	$("#yjlist").hover(function(){
		
		$(".jp-popover").remove();
		var offset = $(this).offset();
		offset.top=offset.top- $(document).scrollTop();
		offset.left=offset.left- $(document).scrollLeft();
		var height = $(this).height();
		var width = $(this).width();
		
		var $eventsWarp = $("<div class='jp-popover yjpopover none'></div>");
		$eventsWarp.append('<div>\
					<div><span class="yTitle">宜 </span><div class="yjlistC">'+$('#ylist').text()+'</div></div>\
					<div class="ptrt"><span class="jTitle c000">忌 </span><div class="yjlistC c000">'+$('#jlist').text()+'</div></div>\
				</div><div class="blankarrow-left" id="arrow"><div class="arrow_dk"></div><div class="arrow_lt"></div></div>');
		$("body").append($eventsWarp);
		var aHeight=$('#arrow').height();
		var warpHeight = $eventsWarp.height();
		var warpWidth = $eventsWarp.width();
		$('#arrow').css({"top":((warpHeight-aHeight)/2)+"px"});
		$eventsWarp.css({"left":(offset.left-warpWidth-24)+"px","top":(offset.top-(warpHeight-height)/2)+"px"}).show();
		
		$eventsWarp.hover(function(){
			$eventsWarp.show();
		},function(){
			$eventsWarp.hide();
		});
	},function(){
		$(".jp-popover").hide();
	});
	//点击"查看所有假期"事件
	var jrHtml="";
	var holidayArr = [];
	var nowDate = new Date();
	nowDate.setHours(0,0,0,0);
	for(jr in festival_main){
		var solarDate = jr;
		if(jr.length>10){
	 		var dateStr = jr.replace("*","");
	 		var dateLundar = new Date(dateStr);
	 		solarDate = getSolarDate(nowDate.getFullYear(),dateLundar.getMonth()+1,dateLundar.getDate(),false);
		}else{
			solarDate = new Date(solarDate);
		}
 		if(nowDate.getMonth()>solarDate.getMonth()){
 			solarDate.setFullYear(nowDate.getFullYear()+1);
 		}else if(nowDate.getMonth()==solarDate.getMonth()){
 			if(nowDate.getDate()>solarDate.getDate())
 				solarDate.setFullYear(nowDate.getFullYear()+1);
 		}
 		solarDate=solarDate.format("yyyy/MM/dd");
 		holidayArr.push(solarDate+"1");
		jrHtml+="<li tdate='"+solarDate+"'><a>"+festival_main[jr]+"</a></li>";
	}
	$("#allVacation ul").append(jrHtml);

	$("#allVacation").bindState(1,"jp-dropdown",true);
	$("#allVacation li").click(function(){
	 	$("#allVacation #vacationValue").text($(this).text());
	 	$("#fname").text($(this).text());
	 	var dateStr = $(this)[0].getAttribute("tdate");
 		var sJr = new Date(dateStr);
 		var vaCount=chazhitian(sJr,nowDate);
 		if(vaCount<0)
 			{
 			if((nowDate.getFullYear()+1)%4==0)
 				vaCount+=366;
 			else vaCount+=365;
 			}

		$("#vaCount").text(vaCount);
		console.log(chazhitian(sJr,nowDate));
 		calander.showSomeMonth(sJr);
	});
//	$("#prev_button_a,#next_button_a,#today_button,#mainCal .cont td,.jp-dropdown-menu li").click(function(){
//
//	});
  /*  $(".today").unbind();
   	$(".today").on("click",function(){
	
			$("#today_button").css("display","none");
					
	});
    $("#mainCal .block").unbind();
	$("#mainCal .block").on("click",function(){
		if(!$(this).hasClass('today')){
		 	$("#today_button").css("display","block");
		}else{
			$("#today_button").css("display","none");
		}
	
	});*/
	// $("#today_button").unbind();
	// $("#today_button").on("click",function(){
		
	// 		$("#today_button").css("display","none");

		
	// });

	var nowDateStr = nowDate.format("yyyy/MM/dd");
	holidayArr.push(nowDateStr);
	holidayArr.sort();
	var closetTime = holidayArr[0];
	for(date in holidayArr){
		if(holidayArr[date]==nowDateStr){
			if(date != holidayArr.length-1){
				closetTime=holidayArr[parseInt(date)+1];
				break;
			}	
		}
	}
	closetTime = closetTime.substr(0,10);
	var festName = $("#allVacation li[tdate='"+closetTime+"']").text();
	$("#allVacation #vacationValue").text(festName);
	$("#fname").text(festName);
	$("#vaCount").text(chazhitian(new Date(closetTime),nowDate));
	//console.log(chazhitian(new Date(closetTime),nowDate));
	var vacount=$("#vaCount").text();
	if(vacount<0)
		{
		if((nowDate.getFullYear()+1)%4==0)
		$("#vaCount").text(vacount+366);
		else $("#vaCount").text(vacount+365);
		}
	
//	//点击"+"事件
//	$('#addEvents').bindState(1,"jp-dropdown",true);
//	//点击"记事"事件
//	$('#addEvents #liaddNote').click(function(){
//		//addNoteDialog();
//		setNoteFullHTML();
//	});
//	
	//点击"新建"事件
//	$("#addEvents #liaddSchedule").click(function(){setScheduleHTML();});
//	$("#addEvents #liaddBrithday").click(function(){setBirthdayHTML();});
//	$("#addEvents #liaddMemory").click(function(){setMemoryHTML();});
//	$("#addEvents #liaddCount").click(function(){setCountHTML();});
	
	//点击"登录"事件
//	$("#login").click(function(){
//		$.dialog({
//			id:'loginDialog',
//			content: '<iframe class="loginIframe" id="loginiframe" name="loginiframe" ></iframe>',
//			fixed: true,
//			drag: false,
//			lock: true,
//			title: false,
//			init:function(){
//				$("#loginDialog #loginiframe")[0].src = _baseURL+"/oauth/route?type=baidu";
//			}
//		});
//		window.open("http://www.zhwnl.cn");
//	});

//	//点击'日程'事件
//	$("#schedulelist").click(function(){
//		var startEnd = getMonthSandEd(currentDate);
//		setListHTML("日程",'1000',startEnd.start,startEnd.end);
//	});
//	//点击'节日'事件
//	$("#festivallist").click(function(){
//		var startEnd = getMonthSandEd(currentDate);
//		setListHTML("节日",'345',startEnd.start,startEnd.end);
//	});
//	//点击'记事'事件
//	$("#notelist").click(function(){
//		var startEnd = getMonthSandEd(currentDate);
//		setListHTML("记事",'-74533',startEnd.start,startEnd.end);
//	});
//	
	//鼠标移到左下方的logo事件
	$("#zhwnllogo").hover(function(){
		$(".jp-popover").remove();
		var _this=$(this);
		var $popvsWarp = $("<div class='jp-popover logoEWMImgPopver'></div>");
		$popvsWarp.append("<div class='logoEWMImgWarp'><img class='logoEWMImg' src='img/logoEWMImg.png'/></div>\
							<div class='blankarrow-down' style='top:94px;*top:92px;'>\
						   	<div class='arrow_dk'></div>\
						   	<div class='arrow_lt'></div></div>");
		$("body").append($popvsWarp);
		var offset = $(this).offset();
		if($.browser.msie&&parseInt($.browser.version)<=7){
			$popvsWarp.css({"top":offset.top-$popvsWarp.height()-10,"left":offset.left+14,"display":"block"});
		}else{
			$popvsWarp.css({"top":offset.top-$popvsWarp.height()-8,"left":offset.left+14,"display":"block"});
		}
		
		$popvsWarp.hover(function(){
			$popvsWarp.show();
		},function(){
			$popvsWarp.hide();
		});
	},function(){
		$(".jp-popover").hide();
	});
});

function loadMonthEvent(datetime,isNotShowDayAgenda,isNotBindHover){
	//当月的数据全局变量
	var year = datetime.getFullYear();
	var month = datetime.getMonth()+1;
	$.post(_baseURL+"/webapi", {rtp:"QueryCalendar4Event",r:"JSON",year:year,month:month,v:new Date().getTime()},
    function(data){
		if(data.status == "1000") {
			eventDataList = data.data;
			//显示每月每天的事件数
			if(!isNotShowDayAgenda)
				showDayAgenda();
			if(!isNotBindHover)
				bindAgendaHover();
		}
   	}, "JSON");
}

function setYMVforSelect(currentTime){
	var bos="";
	var xingqi="";
	switch (currentTime.getDay())
		{
			case 1:
				xingqi= '星期一';
				break;
			case 2:
				xingqi= '星期二';
				break;
			case 3:
				xingqi= '星期三';
				break;
			case 4:
				xingqi= '星期四';
				break;
			case 5:
				xingqi= '星期五';
				break;
			case 6:
				xingqi= '星期六';
				break;
			case 0:
				xingqi= '星期日';
				break;			
		}
	var mymonth=currentTime.getMonth()+1;
	if(mymonth==1||mymonth==3||mymonth==5||mymonth==7||mymonth==8||mymonth==10||mymonth==12)
		bos="大";
	else bos="小";
	$("#yearValue").text(currentTime.getFullYear());
	$("#monthValue").text(currentTime.getMonth()+1);
	$(".worlDay").text(currentTime.getFullYear()+"年"+(currentTime.getMonth()+1)+"月"+"("+bos+")"+xingqi);
	$(".NumberDay").text(currentTime.getDate())
}

function closeartDig(id){
	art.dialog.list[id].close();
}

//添加'记事'事件
function addNoteDialog(){
	
	var editorHtml = "<div class='fll'>添加记事: &nbsp;</div><div class='jp-dropdown noteTypeWarp' id='noteTypedd'>\
						<div class='noteType' id='noteTypeValue'>默认分类</div><div class='selectdown'></div>\
						<ul class='jp-dropdown-menu noteType-extend'>";
		var data = ZHWNL.Content.operation.getNoteType();
		if(data!=null) {
			$.each(data,function (index, item){
				for(var key in item) {
					editorHtml+= "<li value='"+key+"'>\
										<a>"+item[key]+"</a>\
									</li>";
				}
			});
		}
		editorHtml += "</ul></div>";
	var id = "addNoteDialog"+new Date().getTime();
	$.dialog({
		id:id,
		content: "<form action=''><div class='noteContentWarp'><textarea id='note_title_add' name='title' class='noteContent noteWidth460' placeholder='在这里，记录您的点点滴滴'></textarea></div>"+
				"<div class='notefoot clearfix'><div class='fll'><div>时间:<span id='datetime'>"+currentDate.format("yyyy年MM月dd日")+"</span></div>"+
					"<div><input type='button' id='fullEditor' value='完整编辑'/></div>"+
				"</div><div class='flr'>"+
				"<input name='rtp' type='hidden' value='AddNoteAction' />"+
				"<input name='r' type='hidden' value='json' />"+
				"<input type='hidden' name='image' id='note_image_add' value=''/>"+
				"<input name='weather' type='hidden' value='' />"+
				"<input name='templ' type='hidden' value='' />"+
				"<input name='temph' type='hidden' value='' />"+
				"<input name='city' type='hidden' value='' />"+
				"<input id='isNormal' name='isNormal' type='hidden' value='1' />"+
				"<input id='contentid' name='contentid' type='hidden' value=''/>"+
				"<input name='catid' id='catid' type='hidden' value='-74533' />"+
				
				"<input id='date' name='date' type='hidden' value='"+currentDate.format("yyyy-MM-dd")+" 10:00:00' />"+
				"<input type='button' class='mr10 mt05' value='保存' onclick=\"ZHWNL.Content.operation.formSubmitAdd1(this.form,'#"+id+" ',false);return false;\"/>"+
				"<input type='button' class='mt05' id='cancel' value='取消' onclick='art.dialog.list[\""+id+"\"].close();' /></div></div></form>",
		title: editorHtml,
		fixed: true,
		drag: false,
		lock: true,
		init:function(){
			$("#"+id+" #noteTypedd").bindState(1,"jp-dropdown",true);
			$("#"+id+" #noteTypedd li").click(function(){
				$("#"+id+" #noteTypeValue").text($(this).text());
				$("#"+id+" #catid").val(this.getAttribute("value"));
			});
			/*$("#"+id+" #fullEditor").click(function() {//完整编辑的绑定事件
				var title = $("#"+id+" #note_title_add").val();
				var catid_value = $("#"+id+" #catid").val();
				var catname = $("#"+id+" #noteTypeValue").text().replace(/(^\s*)|(\s*$)/g,'');
				closeartDig(id);
				setNoteFullHTML();
				$("#noteFullWindow #noteTypeValue").text(catname);
				$("#noteFullWindow #catid_change").val(catid_value);
				$("#noteFullWindow #note_title_add").val(title);
			});*/
			setSltime(id,"datetime");
		}
	});
}
//登陆回调函数
function loginCallBack(username,uid){
	art.dialog.list["loginDialog"].close();
	$("#indexWindow #login").removeClass("loginbtn").addClass("userbtn");
	$("#indexWindow #login").unbind();
	$("#indexWindow #login").val(username);
	_uId=uid;
	$("#indexWindow #loginout").show(function(){
		$(this).unbind();
		$(this).click(function(){
			loginOut();
		});
	});
	//加载当月的数据
//	loadMonthEvent(currentDate);
}
//显示每月每天的事件数
function showDayAgenda(){
	if(eventDataList!=null){
		$("#mainCal .agenda").remove();
		for(var d in eventDataList){
			var md = d.substr(4,4);
			$("#mainCal a.block_content[data="+md+"]").append('<div title="事件数" class="agenda">'+eventDataList[d].count+'</div>');
		}
	}
}

function bindAgendaHover(){
	//绑定"事件数"的事件
	$("#mainCal .agenda").parent().parent().unbind();
	makeCal.makeAction();
	$("#mainCal .agenda").parent().parent().on("mouseover",function(e){
		$(".jp-popover").remove();
		var offset = $(this).offset();
		offset.top=offset.top- $(document).scrollTop();
		offset.left=offset.left- $(document).scrollLeft();
		var height = $(this).height();
		var width = $(this).width();
		var $eventsWarp = $("<div class='jp-popover' style='top:"+(offset.top+height-5)+"px;left:"+(offset.left-77+width)+"px;'></div>");
		
		var htmlStr = '<div class="blankarrow"><div class="arrow_dk"></div><div class="arrow_lt"></div></div>\
			<div class="jp-popoverContent">\
			<ul>';
		var $td = $(this);
		var hoverdateObject = calData[$td.attr("i")][$td.attr("j")];
		var datetime = hoverdateObject.value;
		try{
			if(eventDataList!=null){
				for(var i=0;i<eventDataList[datetime.format("yyyyMMdd")].list.length;i++){
					var eventObject = eventDataList[datetime.format("yyyyMMdd")].list[i];
					if($.trim(eventObject.summary)==''){
						htmlStr += "<li ctype='"+eventObject.content_type+"' contentid='"+eventObject.content_id+
						"' time='"+eventObject.happen_time+"' title='[图片]'><span class='"+eventObject.content_type+"_icon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><em>[图片]</em></li>";
					}else{
						htmlStr += "<li ctype='"+eventObject.content_type+"' contentid='"+eventObject.content_id+
						"' time='"+eventObject.happen_time+"' title='"+eventObject.summary+"'><span class='"+eventObject.content_type+"_icon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"+eventObject.summary+"</li>";
					}
				}
			}else{
				return;
			}
		}catch(e){
			return;
		}
		
		htmlStr += "</ul>";
		if(eventDataList[datetime.format("yyyyMMdd")].count>3){
			htmlStr += '<div class="moreevent" >更多事件</div>';
		}
		htmlStr += "</div>";
		$eventsWarp.append(htmlStr);
		
		$("body").append($eventsWarp);
		$eventsWarp.hover(
			function(){
				$(this).show();
			},function(){
				$(this).hide(); 
			}
		);
		//
		$eventsWarp.find("li").click(function(){
			var ctype = $(this).attr("ctype");
			var contentid = $(this).attr("contentid");
			var time = $(this).attr("time");
			setDetail(ctype, contentid,datetime.format("yyyy/MM/dd"));
		});
		 $eventsWarp.find(".moreevent").click(function(){
			var catids = "1000,1003,1004,1005,note";
			var early_time =new Date( datetime.setHours(0, 0, 0, 0));
			var last_time = new Date( datetime.setHours(23, 59, 59, 59));
			setODELHTML(catids,early_time,last_time);
		}); 
	});
	$("#mainCal .agenda").parent().parent().on("mouseout",function(){ 
		$(".jp-popover").hide(); 
	});
}

function setUserName(){
	$.post(_baseURL+"/webapi", {rtp:"GetNickAction",v:new Date().getTime()},
 	function(data){
		if(data.status == "1000") {
			if(data.data!=null){
				$("#indexWindow #login").removeClass("loginbtn").addClass("userbtn");
				$("#indexWindow #login").unbind();//这个一定要注意放在login绑定事件后
				$("#indexWindow #login").val(data.data.nick);
				_uId=data.data.uid;
				$("#indexWindow #loginout").show(function(){
					$(this).unbind();
					$(this).click(function(){
						loginOut();
					});
				});
			}
		}
   	}, "JSON");
}
//获取当前日期所在月的第一天和最后一天
function getMonthSandEd(datetime){
	var start = new Date(datetime);
	start.setDate(1);
	start.setHours(0, 0, 0, 0);
	var end = new Date(datetime);
	end.setMonth(end.getMonth()+1, 0);
	end.setHours(23, 59, 59, 59);
	
	return { start:start,end:end };
}

function chazhitian(dateb,datea){
	return parseInt((dateb.getTime()-datea.getTime())/(1000*60*60*24));
}

function loginOut() {
	var url = _baseURL+'/client?rtp=ZLogout&t='+new Date().getTime();
	$.ajax({
		url : url,
		type : 'GET',
		dataType : 'xml',
		timeout : 10000,
		success : function(xml) {
			// do something with xml
			$(xml).find("head").each(function(i){
				var status = $(this).children("status").text(); //取对象
				var desc = $(this).children("desc").text();
				if(status != "1000"){
					alert("操作失败:"+desc);
				}else{
					location.href=location.href;
					if(window.event)
			               window.event.returnValue = false;
				}
			});
		}
	});
};

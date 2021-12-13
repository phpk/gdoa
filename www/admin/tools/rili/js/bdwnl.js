function flightHandler(){
}
//Array.prototype.indexOf = function(item) { 
//	for (var i = 0; i < this.length; i++) { 
//		if (!!this[i]&&this[i].indexOf(item+"|")!=-1) 
//			return i; 
//	}
//	return -1; 
//} 
var firstcity="长沙";
var regcity=/[^\u4E00-\u9FA5]/g ;
$(document).ready(function(){
	 $("#weather").css("background","url(/admin/tools/rili/img/onloading.gif) no-repeat center");
	changeStyle();
	$(window).resize(function(){
	  changeStyle();  
	});
	loadJsonp("长沙");
$("#city .city").unbind();
$("#city .change").click(function(e){
	var cityname=$("#city .city").text();
    $("#city .city").hide();
    $(this).hide();
	var left=$(".Infobottom").offset().left;
	var top=$(".air").offset().top+30;
    $(".demo").css({"top":top-30,"left":left});
	$(".demo").show();
	$(".blackone").show();
	$("#citySelect").attr("value",cityname);
	$("#citySelect")[0].click();
	
	var $city = $("#cityBox a:visible");
	$city.unbind();
	$city.click(function(){
		var valueone=$("#citySelect").val();
		 emptyAll();
         loadJsonp(valueone);
         var $selCity =  $("#city .city");
         $selCity.text(valueone);
         $selCity.show();
    	 $("#city .change").show();
    	 $(".blackone").hide();
    	 $(".demo").hide();  
	});
	//$(".cityslide li").unbind();
 	//$(".cityslide").on("click","li",function(){
 		
	//});
	e.stopPropagation();
});
$(".blackone").click(function(){
	var valueone=$("#citySelect").val();
	var cityname1="";
	// console.log(valueone.replace(regcity,""));
if(findcity(valueone.replace(regcity,"")+"|")!=-1&&valueone.replace(regcity,"")!=""){	
		 cityname1=valueone.replace(regcity,""); 
		 emptyAll();
         loadJsonp(cityname1);
	}else{  
		cityname1=firstcity;
	}
	 $("#city .city").text(cityname1);
	 $("#city .city").show();
	 $("#city .change").show();
	 $(this).hide();
	 $(".demo").hide();  

});

});
function findcity(item){
      for (var i = 0; i < Vcity.allCity.length-1; ++i) {
                     if(Vcity.allCity[i].indexOf(item)==0)
                         return i;        
      };

 return -1;
}
function emptyAll(){
	$("#city .city").empty();
    $(".airquality").text("获取中");
//	var li=$(".mid li")
//	for(var i=0;i<li.length;++i)
//	 if(!li.eq(i).children("img")&&!li.eq(i).children("img"))
//	     li.eq(i).empty(); 
	$(".mid li:not(:has(img)):not(:has(span))").empty();
	$(".mid li img").attr("src","");
	$(".mid li span").empty();
	$("#warning").empty();
    $("#weather").css("background","url(/admin/tools/rili/img/onloading.gif) no-repeat center");
}
function selfliCallback(){
	var valueone=$("#citySelect").val();
	// console.log(valueone);
	// console.log(Vcity.allCity.indexOf(valueone.replace(regcity,"")+"|"));
	if(valueone!="对不起"){	
		emptyAll();
	loadJsonp(valueone.replace(regcity,""));
	 $("#city .city").text(valueone.replace(regcity,""));
	 $("#city .city").show();
	 $("#city .change").show();
	 $(".demo").hide();  
	 $(".blackone").hide();
	}
	else {
		 $(".demo").hide();  
		 $(".blackone").hide();
		 $("#city .city").show();	
		 $("#city .change").show();
	};
}
//初始化改变部分样式
function changeStyle(){
	var left=$(".Infobottom").offset().left;
	var top=$(".air").offset().top+30;
    $(".demo").css({"top":top-30,"left":left});
    $(".citySelector").css({"top":top,"left":left});
	var contentH = $("#indexWindow").height()-$(".head").height()-40;
	var main_height= contentH - 81;
	//$("#mainCal").height(main_height);
	$("#cont").height(main_height-32);
	$(".d_right,.black").unbind();
	$(".d_right").click(function(){
	   $("#BigE").toggle();
	   $(".black").toggle();
	});
	$(".black").click(function(){
		$("#BigE").hide();
		 $(".black").hide();
	});
	setLeftHeight();
}

function setLeftHeight(){
	$(".everydayinfo").height($("#mainCal").prev()[0].clientHeight + $("#mainCal")[0].clientHeight);
}

function loadJsonp(w_city){
    $.ajax({
        type: "get",
        async: false,
        url: "http://wthrcdn.etouch.cn/weather_mini?city="+w_city+"&callback=flightHandler",
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(data){
        	if(data.status == 1000){
	        	 d=data.data;
	        	 var tips="";
	        	 var d_index=d.ganmao.indexOf("，");
	        	 var j_index=d.ganmao.indexOf("。");
	        	 if(j_index>19) {tips=d.ganmao.slice(0,d_index)+"。";}
	        	 else{
	        	 	if(d.ganmao.length<=19){tips=d.ganmao;}
                    else{tips=d.ganmao.slice(0,j_index)+"。";}
	        	  }

	        	 $("#city .city").text(d.city);
	             firstcity=d.city; 
	        	 var _aqi=d.aqi;
	        	 var level="";
	        	 if(_aqi<=50&&_aqi>0) level="优秀";
	        	 if(_aqi<=100&&_aqi>50) level="良好";
	        	 if(_aqi<=150&&_aqi>100) level="一般";
	        	 if(_aqi<=200&&_aqi>150)  level="很差";
	        	 if(_aqi>200)  level="很差";
	        	$("#city .airquality").text(_aqi+level);
	        	 if(!_aqi) {
	        		 level="暂缺";
	        	 $("#city .airquality").text(level);
	        	 }
	        	$("#weather").css("background","none");
	        	var src="";
	        	var src1="";
	        	var src2="";
	        	var reg=/[\u4E00-\u9FA5]/g;
	        	var lower=[];
	        	var higher=[];
	        	if(d.forecast[0].type=="多云")
	        		src2="/admin/tools/rili/img/cloudl.png";
	        	if(d.forecast[0].type=="小雨")
	        		src2="/admin/tools/rili/img/small_rainl.png";
	        	if(d.forecast[0].type=="小到中雨")
	        		src2="/admin/tools/rili/img/stom_rainl.png";
	        	if(d.forecast[0].type=="阴")
	        		src2="/admin/tools/rili/img/overcastl.png";
	        	if(d.forecast[0].type=="晴")
	        		src2="/admin/tools/rili/img/finel.png";
	        	if(d.forecast[0].type=="阵雨")
	        		src2="/admin/tools/rili/img/quick_rainl.png";
	        	if(d.forecast[0].type=="雷阵雨")
	        		src2="/admin/tools/rili/img/lquick_rainl.png";
	        	if(d.forecast[0].type=="大雨"||d.forecast[0].type=="中到大雨")
	        		src2="/admin/tools/rili/img/big_rainl.png";
	        	if(d.forecast[0].type=="暴雨"||d.forecast[0].type=="大暴雨"||d.forecast[0].type=="特大暴雨"||d.forecast[0].type=="大到暴雨"||d.forecast[0].type=="暴雨到大暴雨"||d.forecast[0].type=="大暴雨到特大暴雨")
	        		src2="/admin/tools/rili/img/mbig_rainl.png";
	        	if(d.forecast[0].type=="中雨")
	        		src2="/admin/tools/rili/img/mid_rainl.png";
	        	if(d.forecast[0].type=="雷阵雨伴有冰雹")
	        		src2="/admin/tools/rili/img/quick_rain_icel.png";
	        	if(d.forecast[0].type=="雨夹雪")
	        		src2="/admin/tools/rili/img/rain_snowl.png";
	        	if(d.forecast[0].type=="阵雪")
	        		src2="/admin/tools/rili/img/quick_snowl.png";
	        	if(d.forecast[0].type=="雾")
	        		src2="/admin/tools/rili/img/fogl.png";
	        	if(d.forecast[0].type=="沙尘暴"||d.forecast[0].type=="浮尘"||d.forecast[0].type=="扬沙"||d.forecast[0].type=="强沙尘暴"||d.forecast[0].type=="雾霾")
	        		src2="/admin/tools/rili/img/sandl.png";
	        	if(d.forecast[0].type=="冻雨")
	        		src2="/admin/tools/rili/img/ice_rainl.png";
	        	if(d.forecast[0].type=="无天气类型")
	        		src2="/admin/tools/rili/img/unknownl.png";
	        	$("#mainCal .today a").css("background","url("+src2+") no-repeat 0 0");
	        	for(var i=0;i<3;++i){
	        		var day=$("#day"+i);
	        		lower[i]=d.forecast[i].low.replace(reg,'' );
	        		higher[i]=d.forecast[i].high.replace(reg,'' );
		        	if(d.forecast[i].type=="多云") 
		        		{
		        		src="/admin/tools/rili/img/cloud.png";
		        		
		        	    src1="/admin/tools/rili/img/cloud2.png";
		        		}
		        	if(d.forecast[i].type=="晴")
		        		{src="/admin/tools/rili/img/fine.png";
		        	    src1="/admin/tools/rili/img/fine2.png";}
		        	if(d.forecast[i].type=="阴")
		        		{src="/admin/tools/rili/img/overcast.png";
		        	src1="/admin/tools/rili/img/overcast2.png";}
		        	if(d.forecast[i].type=="小雨")
		        		{src="/admin/tools/rili/img/small_rain.png";
		        	    src1="/admin/tools/rili/img/small_rain2.png";}
		        	if(d.forecast[i].type=="小到中雨")
		        	{src="/admin/tools/rili/img/stom_rain.png";
		    	    src1="/admin/tools/rili/img/stom_rain2.png";}
		        	if(d.forecast[i].type=="大雨"||d.forecast[i].type=="中到大雨")
		        		{src="/admin/tools/rili/img/big_rain.png";
		        		src1="/admin/tools/rili/img/big_rain2.png";}
		        	if(d.forecast[i].type=="暴雨"||d.forecast[i].type=="大暴雨"||d.forecast[i].type=="特大暴雨"||d.forecast[i].type=="大到暴雨"||d.forecast[i].type=="暴雨到大暴雨"||d.forecast[i].type=="大暴雨到特大暴雨")
		        	{src="/admin/tools/rili/img/mbig_rain.png";
		    		src1="/admin/tools/rili/img/mbig_rain2.png";}
		        	if(d.forecast[i].type=="雨夹雪")
		        		{src="/admin/tools/rili/img/rain_snow.png";
		        	    src1="/admin/tools/rili/img/rain_snow2.png";}
		        	if(d.forecast[i].type=="阵雪")
		    		{src="/admin/tools/rili/img/quick_snow.png";
		    	    src1="/admin/tools/rili/img/quick_snow2.png";}
		        	if(d.forecast[i].type=="雾")
		    		{src="/admin/tools/rili/img/fog.png";
		    	    src1="/admin/tools/rili/img/fog2.png";}
		        	if(d.forecast[i].type=="沙尘暴"||d.forecast[i].type=="浮尘"||d.forecast[i].type=="扬沙"||d.forecast[i].type=="强沙尘暴"||d.forecast[i].type=="雾霾")
		    		{src="/admin/tools/rili/img/sand.png";
		    	    src1="/admin/tools/rili/img/sand2.png";}
		        	if(d.forecast[i].type=="冻雨")
		        	{src="/admin/tools/rili/img/ice_rain.png";
		    	    src1="/admin/tools/rili/img/ice_rain2.png";}
		        	if(d.forecast[i].type=="中雨")
		        	{src="/admin/tools/rili/img/mid_rain.png";
		        	    src1="/admin/tools/rili/img/mid_rain2.png";}
		        	if(d.forecast[i].type=="雷阵雨伴有冰雹")
		        	    {src="/admin/tools/rili/img/quick_rain_ice.png";
		        	    src="/admin/tools/rili/img/quick_rain_ice2.png";}
		        	if(d.forecast[i].type=="阵雨")
		        		{src="/admin/tools/rili/img/quick_rain.png";
		        	    src1="/admin/tools/rili/img/quick_rain2.png";}
		        	if(d.forecast[i].type=="雷阵雨")
		        	{ src="/admin/tools/rili/img/lquick_rain.png";
		        	   src1="/admin/tools/rili/img/lquick_rain2.png";}
		        	if(d.forecast[i].type=="无天气类型")
		        	{ src="/admin/tools/rili/img/unknown.png";
		        	   src1="/admin/tools/rili/img/unknown2.png";}
		        	//   console.log(src,src1);
		        	//   console.log(day);
		        	day.find("li:eq(0)").text(d.forecast[i].date);
		        	day.find("li:eq(1)").find("img").attr("src",src1);
		        	day.find("#today_icon").attr("src",src);
		        	day.find("li:eq(3)").text(d.forecast[i].type);
		        	day.find("#today_tem").text(d.wendu).append("<span class='juhao'>&#186;</span>");
		        	day.find("li:eq(4)").text(lower[i]+"~"+higher[i]);
		        	day.find("li:eq(5)").find("span:eq(0)").text(d.forecast[i].fengxiang); 
		        	day.find("li:eq(5)").find("span:eq(1)").text(d.forecast[i].fengli);
	        	}
	        	$("#warning").text(tips);
        	}else{
        		 emptyAll();
                 $("#weather").css("background","url(/admin/tools/rili/img/wrong.png) no-repeat center");
        	}
        },
        error: function(){
            emptyAll();
            $("#weather").css("background","url(/admin/tools/rili/img/wrong.png) no-repeat center");
        }
    });
};


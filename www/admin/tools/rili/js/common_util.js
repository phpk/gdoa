var _globalToatl=0;
var _timeout=10000;
/***
 * 显示 全局加载提示进度条
 * */
function showGlobalLoading(){ 
	$("#tips").children("span").removeClass().addClass("info");
	$("#tips").show();_globalToatl++;
}
/***
 * 显示 全局加载提示进度条
 * */
function showGlobalLoading(tips){
	$("#tips").children("span").removeClass().addClass("info");
	$("#tips").children("span").text(tips);_globalToatl++; $("#tips").show();
}
/***
 * 隐藏 全局加载提示进度条
 * */
function hideGlobalLoading(){ 
	_globalToatl--;
	if(_globalToatl<=0) 
		$("#tips").hide();
}

/*$(document).ready(function() {
	$("#global-loading").hide();
});*/

function getBrowserType(){
	var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject&&ua.indexOf("qqbrowser")<0){
        Sys.ie = ua.match(/msie ([\d.]+)/)[1] ;
    }
    else if ($.browser.mozilla){
        Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
    }
    else if ($.browser.safari&&ua.indexOf("chrome")<0){
        Sys.safari = ua.match(/version\/([\d.]+)/)[1];
    }
    else if ($.browser.safari){
    	Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
    }
    else if ($.browser.opera){
        Sys.opera = ua.match(/opera.([\d.]+)/)[1];
    }
    
    else if(ua.indexOf("qqbrowser")>-1){
    	Sys.qq = ua.match(/qqbrowser\/([\d.]+)/)[1] ;
    }
	else{
		return 'xoxoxoxoxoxox' ;
	}
    //return
    if(Sys.ie) 			return 'x93948102948458' ;
    if(Sys.firefox) 	return 'y89293747339484' ;
    if(Sys.chrome) 	return 'z91415264350793' ;
    if(Sys.opera) 		return 'a47848329212838' ;
    if(Sys.safari) 		return 'h14445608291882' ;
    if(Sys.qq) 			return 'e14123125655766' ;
    //if(Sys.cn360) 	return 'u68373628309500' ;
}
//设置全局变量
_isIE= false;
_isIE6 = false;
if(window.VBArray && !window.XMLHttpRequest)
	_isIE6 = true;
if(!!(document.all && navigator.userAgent.indexOf('Opera') === -1))
	_isIE=true;

//为IE6下按钮添加hover事件，和hover时的class
function setHoverforIE6(warpID){ 
	var btns=$(warpID +' input[type="button"]');
	btns.unbind('mouseenter mouseleave');
	btns.hover(function(){
		$(this).addClass($(this).attr('class')+"-hover");
	},function(){
		$(this).removeClass($(this).attr('class').split(' ')[1]);
	});
}

//回车键处理事件
function inputCheck(event,callback){
	if(event.keyCode==13){
		callback();
	}
}

function detectCType(){
	var url = location.href ;
	if(url.indexOf("alert.jsp", 0) != -1){
		return "alert" ;
	} else if(url.indexOf("notepad.jsp", 0) != -1){
		return "note" ;
	} else {
		return null ;
	}
}

/***获取url 参数***/
function request(paras)
{ 
    var url = location.href; 
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {};
    for (i=0; j=paraString[i]; i++){ 
    paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){ 
    return ""; 
    }else{ 
    return returnValue; 
    } 
}

/*****显示错误对话框****/
function error(obj,msg,className){
	if(!className)
		className='';
	var dialog = "<span class='alert alert-error "+ className +"'>"+
	"<a class='close' href='#'>&times;</a>"+msg+"</span>";
	obj.html(dialog);
	obj.show();
}
/*****自动消失的错误对话框****/

function autoError(obj,msg){
	var dialog = "<span class='alert alert-error'>"+msg+"</span>";
	obj.html(dialog);
	obj.show();
	setTimeout(function(){obj.fadeOut("slow");},1000);
}

/*****显示消息对话框****/
function info(obj,msg){
	var dialog = "<span class='info'>"+msg+"</span>";
	obj.show();
	obj.html(dialog);
}

/*****自动消失的消息对话框****/
function autoInfo(obj,msg){
	var dialog = "<span class='info'>"+msg+"</span>";
	obj.html(dialog);
	obj.show();
	setTimeout(function(){obj.fadeOut("slow");},1000);
}
/*****隐藏消息对话框****/
function hideInfo(obj){
	obj.html('');
}
/*********系统提示框************/
function sysInfo(message){
	autoInfo($("#tips"),message);
}

function sysError(message){
	autoError($("#tips"),message);
}


/*****限制文本长度****/
jQuery.fn.limit=function(){  
    var self = $("p[limit]");  
    self.each(function(){  
        var objString = jQuery.trim($(this).text());  
        var objLength = objString.length;  
        var num = $(this).attr("limit");  
        if(objLength > num){  
        	$(this).attr("title",objString);  
            objString = $(this).text(objString.substring(0,num) + "...");  
        }  
    });
};



/***********将表单中的数据封装成对象****************/
function convertArray(o) { //主要是推荐这个函数。它将jquery系列化后的值转为name:value的形式。 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return v;
}

/********************表单提交方法 跳对话框*****************************/
function submitFormJson(form,href){
	$post_data_add = form.serializeArray();
	var data = convertArray($post_data_add);
	$.post("../webapi", data, function (d) {
		if(d.status == "1000"){
			alert("操作成功！");
			location.href=href;
		}else{
			alert("操作失败！");
		}
	},"json");
}

/********************表单提交方法 在具体位置显示错误原因 *****************************/
function submitCPwdForm(form,href,message){
	$post_data_add = form.serializeArray();
	var data = convertArray($post_data_add);
	$.post("../webapi", data, function (d) {
		if(d.status == "1000"){
			autoInfo(message,"操作成功！");
			location.href=href;
		}else{
			autoError(message,d.desc);
		}
	},"json");
}


function refreshCenterDataOfDate(date){
	$("#home_list").html("");
	ZHWNL.List.Common.homeListInit(date,7);
}
	//反序列化函数
function convertArray(o) { //主要是推荐这个函数。它将jquery系列化后的值转为name:value的形式。 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return v;
}
//隐藏左侧栏
function hideRight(){
	$("#right").hide() ;
	$("#center").attr("class","span10");
}
//显示左侧栏
function showRight(){
	$("#right").show() ;
	$("#center").attr("class","span7");
};

/**
 * Window查看方式的 图片加载中自适应
 * e.g autoSize(imgD,W,H,M)
 * <img src="" onload ="autoSize(this,88,88,0)" />
 * <img src="" onload ="autoSize(this,88,88,0)" />
 * @method
 * @param <String|Object> ImgD
 * @param <int> W 最大宽度
 * @param <int> H 最大高度
 * @param <int> M 
 *  M==undefined 上下自动居中,左右不自动居中 需要在外层设置text-align:center;
 *  M==-1 不自动居中
 *  M== 0 上下左右自动居中,四边边距为0
 *   M>0  上下左右自动居中,四边边距为M, 注意2m+w=外框宽度|2m+h=外框高度    
 * @returns <Image> ImgD 图片对象
 */
function autoSize(imgD, W, H, M) {
	 //var styleStr = imgD.style;
	 //imgD.style='';
     if (typeof (imgD) != "object" && typeof (imgD) == "string") {
         imgD = document.getElementById(imgD);
     }
     var tImg = new Image();
     tImg.src = imgD.src;
     var w = imgD.width;
     var h = imgD.height;
     var wn = 0, hn = 0;
     if (w > 0 && h > 0 && W > 0 && H > 0) {
         if (w / h >= W / H) {
             if (w > W) {
                 wn = W;
                 hn = (h * W) / w;
             }
             else {
                 wn = w;
                 hn = h;
             }
         }
         else {
             if (h > H) {
                 wn = (w * H) / h;
                 hn = H;
             }
             else {
                 wn = w;
                 hn = h;
             }
         }
         if (typeof M == "undefined") {
             imgD.style.marginTop = (H - hn) / 2 + 'px';
         } else if (M > -1) {
             imgD.style.marginTop = M + (H - hn) / 2 + 'px';
             imgD.style.marginLeft = M + (W - wn) / 2 + 'px';
         }
         imgD.style.width = wn + "px";
         imgD.style.height = hn + "px";
     }
     //imgD.style=styleStr;
     return imgD;
}

function returnAutoSize(imgD, W, H, M) {
	 //var styleStr = imgD.style;
	 //imgD.style='';
	 var sHeight = imgD.style.height;
	 imgD.style.height='';
	 var sWidth = imgD.style.width;
	 imgD.style.width='';
	 
     if (typeof (imgD) != "object" && typeof (imgD) == "string") {
         imgD = document.getElementById(imgD);
     }
     var w = imgD.width;
     var h = imgD.height;
     var wn = 0, hn = 0;
     var marginTop=0,marginLeft=0;
     if (w > 0 && h > 0 && W > 0 && H > 0) {
         if (w / h >= W / H) {
             if (w > W) {
                 wn = W;
                 hn = (h * W) / w;
             }
             else {
                 wn = w;
                 hn = h;
             }
         }
         else {
             if (h > H) {
                 wn = (w * H) / h;
                 hn = H;
             }
             else {
                 wn = w;
                 hn = h;
             }
         }
         if (typeof M == "undefined") {
        	 marginTop = (H - hn) / 2 + 'px';
             imgD.style.marginTop = marginTop;
         } else if (M > -1) {
        	 marginTop =  M + (H - hn) / 2 + 'px';
        	 marginLeft = M + (W - wn) / 2 + 'px';
             imgD.style.marginTop = marginTop;
             imgD.style.marginLeft = marginLeft;
         }
         //imgD.style.width = wn + "px";
         //imgD.style.height = hn + "px";
     }else{
    	 return {"width":w,"height":h,'margintop':(W-w)/2+"px",'marginleft':(H-h)/2+"px"};
     }
     //imgD.style=styleStr;
     imgD.style.height=sHeight;
     imgD.style.width=sWidth;
     return {"width":wn,"height":hn,'margintop':marginTop,'marginleft':marginLeft};
}

Date.prototype.format = function (format) {
    /* 
    * eg:format="yyyy-MM-dd hh:mm:ss"; 
    */
	function getWeekDay(weekNum){
    	var weekDay="周";
    	switch (weekNum) {
    		case 1:
    			weekDay += "一";
    			break;
    		case 2:
    			weekDay += "二";
    			break;
    		case 3:
    			weekDay += "三";
    			break;
    		case 4:
    			weekDay += "四";
    			break;
    		case 5:
    			weekDay += "五";
    			break;
    		case 6:
    			weekDay += "六";
    			break;
    		default:
    			weekDay += "日";
    			break;
    	}
    	return weekDay;
    }
	
    var o = {
        "M+": (this.getMonth() + 1), // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "w+": getWeekDay(this.getDay()),
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds() // millisecond  
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};  
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
};
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
};

function isEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

Date.prototype.getChinaWeekName=function(){
	switch (this.getDay())
	{
		case 1:
			return '星期一';
			break;
		case 2:
			return '星期二';
			break;
		case 3:
			return '星期三';
			break;
		case 4:
			return '星期四';
			break;
		case 5:
			return '星期五';
			break;
		case 6:
			return '星期六';
			break;
		case 0:
			return '星期日';
			break;			
	}
};
function htmlEscape(s) {
	return s.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/'/g, '&#039;')
	.replace(/"/g, '&quot;')
	.replace(/\n/g, ' ')
	.replace(/\r\n/g, ' ');
}

function decodeHTML(source){  
    var str = String(source).replace(/&amp;/g,'&')  
                         .replace(/&gt;/g,'>')
                         .replace(/&quot;/g,'\"')  
                         .replace(/&ldquo;/g,'“') 
    					 .replace(/&#([\d]+);/g,"'");
    return str;
    /*return str.replace(/&#([\d]+);/g,function(_0,_1){  
        return String.formCharCode(parseInt(_1,10));  
    });  */
}

/*//jqury ajax hanajaxComplete(callback)
(function($){  
    //备份jquery的ajax方法  
    var _ajax=$.ajax;  
      
    //重写jquery的ajax方法  
    $.ajax=function(opt){  
        //备份opt中error和success方法  
        var fn = {  
            error:function(XMLHttpRequest, textStatus, errorThrown){},  
            success:function(data, textStatus){}  
        };
        if(opt.error){  
            fn.error=opt.error;  
        }  
        if(opt.success){  
            fn.success=opt.success;  
        }  
          
        //扩展增强处理  
        var _opt = $.extend(opt,{  
            error:function(XMLHttpRequest, textStatus, errorThrown){  
                //错误方法增强处理  
            	//错误处理
            	if(invalidUserHandle(data.status))
            		return;
                fn.error(XMLHttpRequest, textStatus, errorThrown);  
            },  
            success:function(data, textStatus){  
                //成功回调方法增强处理  
            	if(invalidUserHandle(data.status))
            		return;
                fn.success(data, textStatus);  
            }
        });
        _ajax(_opt);  
    };
})(jQuery);*/

//handler for invaliduser
function  invalidUserHandle(statusValue){
	if(statusValue==1002 || statusValue==1004){
		/* TODO: URL暂时无法用变量表示 */
    	location.href="http://www.bingdou.net/e/member/login/";
    	return true;
	}else{
		return false;
	}
}


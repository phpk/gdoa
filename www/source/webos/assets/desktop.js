;!function(){
	var from = layui.form()
	,$=layui.jquery
	,layer = layui.layer
	,laytpl = layui.laytpl
	,laydate = layui.laydate;
	$("#loading").hide().remove();//等待加载
	console.error("商用请联系QQ:1531982850");
	/*初始化桌面图标*/
	var desktopappTmp=['<div class="desktop-app" data-id="{{d.apps[app].appid}} " data-title="{{d.apps[app].name}}" data-url="{{d.apps[app].url}}" data-icon="{{d.apps[app].icon}}" data-iconbg="{{d.apps[app].iconbg}}"  data-isicon="{{d.apps[app].isicon}}" data-height="{{d.apps[app].height}}" data-width="{{d.apps[app].width}}" data-fid="{{app}}">',
		'<i class="layui-icon" style="background-color:{{d.apps[app].iconbg}}">{{d.apps[app].icon}}</i>',
		'<span class="desktop-title layui-elip">{{d.apps[app].name}}</span>',
		'</div>'].join(""),//通用app模板
		desktopTmp = ['{{# layui.each(d.menu, function(index, menuitem){ if(index>=3)return false;}}',
		'<div class="swiper-slide">',
			'<div class="desktopContainer"  data-menuid="{{menuitem.menuid}}" data-name="{{menuitem.name}}" >',
			'{{# layui.each(menuitem.app, function(index, app){}}',
			desktopappTmp,				
			'{{# });}}',
			'</div>'  ,
		'</div>',
	 '{{# }); }} ' ].join(""),//桌面图标
	 desktopOpeningTmp=['{{# layui.each(d.menu[3].app, function(index, app){}}',
	 desktopappTmp,
	 '{{# });}}'].join("");//开始菜单图标
	laytpl(desktopTmp).render(desktpData, function(html){
	  $(".swiper-wrapper").html(html);	 
	});
	laytpl(desktopOpeningTmp).render(desktpData, function(html){
	  $(".opening-menu-app-list").html(html);	 
	});
  /*桌面容器窗体高度*/
  $(".desktop-container").css("height",$(window).height()-30);
  $(window).resize(function(event) {
	  $(".desktop-container").css("height",$(window).height()-40);
	  $(".desktopContainer").css("height",$(".desktop-container").height());//窗体变化的时候先给桌面app计算高度
	  arrange();//重新布局图标位置	
   });
   //便签
   layer.open({
	  type: 1,
	  title:'便签',
	  area: '250px',
	  skin: 'layui-layer-notepaper', //样式类名
	  //closeBtn: 0, //不显示关闭按钮
	  offset: 'rt',
	  anim: 6,
	  shade: false, //开启遮罩关闭
	  content: '<textarea class="layui-textarea notepaper">更新日志什么的，真心不想写了。BY SMALL</textarea>',
	  success: function(layero, index){
		$(layero).find(".notepaper").on("change",function(){
			console.log($(this).val());
		});//便签内容改变
	  }
   });
  /*桌面分页*/
   var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		simulateTouch : false,
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 30,
		keyboardControl: true,
		mousewheelControl:true,
		onSlideChangeEnd: function(swiper){
			arrange(swiper.realIndex);//重新布局图标位置	
		}
	});
	/*桌面图标拖动*/
	$( ".desktopContainer" ).sortable({revert: true});
	$( ".desktopContainer" ).sortable({
		connectToSortable: ".desktopContainer",
		//helper: "clone",
		//revert: "invalid",
  		stop: function( event, ui ) {
	  		//console.log(ui);
			arrange();	
	    }
	}).disableSelection();
	/*工作区点击隐藏右键*/
	$(".desktopContainer").on("click",function(){
		$(".desktop-menu").hide();	
	})
	/*图标位置计算*/	
	arrange();	
	function arrange(index){
		index = $(".swiper-slide-active").index();
		index = index==''||index==undefined?0:index;  
		var desktopContainer=$(".desktopContainer:eq("+index+")");  
		
		var working = $(".desktopContainer");  
		//位置坐标  
		var position={x:0,y:0,bottom:65,width:96,height:96,parent:{height:0,width:0},padding:{top:10,left:10,right:0,bottom:10}};  
		  
		position.parent.height=working.height()-40;  
		position.parent.width=working.width(); 
		desktopContainer.find(".desktop-app").each(function(index,elem) {  
			  
				$(elem).css("top",position.y+"px");  
				$(elem).css("left",position.x+"px");  
				  
				position.height=$(elem).height();  
				position.width=$(elem).width();  
				  
				position.y=position.y+position.height+position.padding.bottom+position.padding.bottom;  
				  
				if(position.y>=position.parent.height-position.bottom){  
					position.y=0;  
					position.x=position.x+position.width+position.padding.left;  
				}  
			});  
	}var hide = function(){//关闭所有tips
		layer.closeAll('tips');
	}, stope = function(e){//阻止冒泡
		e = e || window.event;
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	},appopen = function(data,appthat){ /*窗体打开内容*/
		//循环判断桌面app是否已打开，打开就高亮
		var isopen = true;
		$(document).find(".taskbar-app").each(function(index, element){
			if($(element).attr("title")==data.title){
				appthat.removeClass("disabled");//最后移除	
				$(element).click();isopen=false;
				return;	
			}	
		});		
		if(!isopen)return;//跳打开app方法
		var count = $(".taskbar-app").length+1,//获取已开的app个数
		maxcount=parseInt((layui.jquery(".desktop-taskbar").width()-160)/110);//获取任务栏最多可打开的个数
		if(count>maxcount){
			layer.alert("请先关闭一些窗口！", 
				{title:"官人休息下？",icon: 2,zIndex: layer.zIndex+1});
			return;	
		}
		
		
		var width = data.width?data.width:$(".desktop-container").width()*0.8//获取桌面宽度 赋值给弹		
		,height = data.height?data.height:$(".desktop-container").height()*0.9;//获取桌面高度 赋值给弹窗

		
		var taskbarid ='';//任务栏appid通用
		layer.open({
			  type: 2,//弹窗类型 iframe
			  title: [data.title,'background-color:#485664;color:#fff'],//标题
			  shadeClose: true,//是否关闭背景
			  shade: false,
			  maxmin: true, //开启最大化最小化按钮
			  area: [width+'px', height+'px'],
			  content: data.url,//弹窗引用url
			  zIndex: layer.zIndex,//索引
			  skin:'desktop-win-app',
			  success: function(layero, index){//窗口加载完毕处理一些列问题	
			  	  appthat.removeClass("disabled");//最后移除		  
				  layer.setTop(layero);//让新弹窗始终在第一位
				  taskbarid = "taskbar-"+$(layero).attr("id");//拼接任务栏appid
				  var taskbarHtml ="";
				  if(data.isicon){
				  	taskbarHtml = ['<div class="layui-inline layui-elip taskbar-app taskbar-app-on" title="'+data.title+'" id="'+taskbarid+'"><i class="layui-icon" style=" background-color:'+data.iconbg+'">'+data.icon+'</i><span class="desktop-title layui-elip">'+data.title+'</span></div>'].join("");//任务栏app dom
				  }else{
					  taskbarHtml = ['<div class="layui-inline layui-elip taskbar-app taskbar-app-on" title="'+data.title+'" id="'+taskbarid+'"><span class="desktop-title layui-elip">'+data.title+'</span></div>'].join("");//任务栏app 无icon dom
				  }
				  if($("#"+taskbarid).is(":visible"))return;
				  $(".desktop-taskbar-app-list").append(taskbarHtml);//给任务栏追加图标
				  //绑定任务栏app点击事件 并移除其他高亮
					$("#"+taskbarid).on("click",function(){
						var that = $(this);
						if(that.hasClass("taskbar-app-on")){
							$(layero).find(".layui-layer-setwin .layui-layer-min").click();
						}else{
							//给当前高亮，移除同类高亮
							that.addClass("taskbar-app-on").siblings().removeClass("taskbar-app-on");
							//给本身显示
							$(layero).show();
							//重置layui的索引
							layer.zIndex = parseInt(layer.zIndex+1);
							//给当前弹窗加zindex
							layer.style(index,{zIndex: layer.zIndex});
						}
					}).siblings().removeClass("taskbar-app-on");
					/*$("#"+taskbarid+".taskbar-app-on").on("click",function(){
						$(layero).find(".layui-layer-setwin .layui-layer-min").click();	
					});*///是高亮的窗口再次点击就隐藏
			  },
			  min:function(layero, index){//最小化窗口
				$(layero).hide();
				$("#"+taskbarid).removeClass("taskbar-app-on");//给当前窗口任务栏移除高亮
				var zindexall = [];//定义z-index集合
				$(document).find(".layui-layer-iframe:visible").each(function(index, element) {
                   	zindexall.push($(element).css("z-index"));					
                });//遍历获取显示窗口的z-index
				if(zindexall.length<1)return false;//判断还有没有显示的窗口
				var bigzindex = zindexall.sort().pop();//记录最大的z-index
				$(document).find(".layui-layer-iframe:visible").each(function(index, element) {
						if($(element).css("z-index")==bigzindex){
							$("#taskbar-"+$(element).attr("id")).addClass("taskbar-app-on");
							return false;
						}		
                });//遍历对比最大显示窗口z-index对应任务栏高亮			
					
				return false;
			  },
			  full:function(layero, index){//最大化窗口				
			  	//layer.msg("我最大了");
			  },
			  restore :function(layero, index){//还原窗口
			  	//layer.msg("我还原了");layer.setTop(layero);
			  },
			  moveEnd: function(){//拖拽完毕
			  	 $("#"+taskbarid).addClass("taskbar-app-on").siblings().removeClass("taskbar-app-on");
			  },
			  cancel: function(index){//销毁窗口
				  var alldesktopapp = layui.data('desktop-app')['desktop-app-'+index];//获取子窗口结合
				  layui.each(alldesktopapp,function(index,itme){
						layer.close(itme);  
				  });//遍历关闭子窗口
				  layui.data('desktop-app', {
					  key: 'desktop-app-'+index
					  ,remove: true
					});//移除缓存子窗口信息
				  $("#"+taskbarid).remove();//移除任务栏
			  },end:function(){
				  appthat.removeClass("disabled");//最后移除	
			  }
		});	
	},desktopContextmenu= function(othis,dom){//配置一个通用菜单
		layer.tips(dom, this, {
			tips: 1
			,time: 0
			,shift: 5
			,fix: true
			,skin: 'layui-box layui-layim-contextmenu'
			,success: function(layero){
				var stopmp = function(e){ stope(e); };
				layero.off('mousedown', stopmp).on('mousedown', stopmp);
			}
		});
		$(document).off('mousedown', hide).on('mousedown', hide);
		$(window).off('resize', hide).on('resize', hide);	
	
	},hidedesktopmenu=function(){//隐藏桌面右键菜单
		$(".desktop-menu").hide();	
	},pattern=function(fmt) {//格式化时间函数 
		var date = new Date();        
		var o = {         
			"M+" : date.getMonth()+1, //月份         
			"d+" : date.getDate(), //日         
			"h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
			"H+" : date.getHours(), //小时         
			"m+" : date.getMinutes(), //分         
			"s+" : date.getSeconds(), //秒         
			"q+" : Math.floor((date.getMonth()+3)/3), //季度         
			"S" : date.getMilliseconds() //毫秒         
		};//获取年月日时分秒         
		var week = {         
			"0" : "\u65e5",         
			"1" : "\u4e00",         
			"2" : "\u4e8c",         
			"3" : "\u4e09",         
			"4" : "\u56db",         
			"5" : "\u4e94",         
			"6" : "\u516d"        
		};//星期         
		if(/(y+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
		}         
		if(/(E+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);         
		}         
		for(var k in o){         
			if(new RegExp("("+ k +")").test(fmt)){         
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
			}         
		}         
		return fmt;//返回内容         
	},getweek=function(day){
		var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		return week[day];
	},refreshtime=function(){//刷新任务栏时间
		$(".taskbar-time").attr("title",pattern('yyyy年MM月dd日 EEE'));//给时间容器加title准确时间提醒
		$("#laydate-hs").text(pattern('HH:mm'));//获取时分	
		$("#laydate-ymd").text(pattern('yyyy/MM/dd'));	//获取年月日
	},hide_opening_menu = function(){//隐藏开始菜单
		$("#opening-menu").removeClass("opening-menu-on");	
	}


	//定时刷新任务栏时间
	setInterval(refreshtime,1000);	
	//屏蔽右键菜单  
    $(document).contextmenu(function() {return false;}); 
      
    //点击工作区的时候 显示右键菜单  
    $(".desktopContainer").on("contextmenu",function(event) { 		
        var x=event.clientX
		,y=event.clientY
		,desktopmenu=$(".desktop-menu");//菜单 
          
        //判断坐标  
        var width=document.body.clientWidth,height=document.body.clientHeight;  
          
        x=(x+desktopmenu.width())>=width?width-desktopmenu.width()-15:x;  
        y=(y+desktopmenu.height())>=height-40?height-desktopmenu.height()-15:y; 
        //定位并显示  
        desktopmenu.css({"top":y,"left":x}).show(); 
    });  
   

	/*z桌面app 打开*/
	$(".desktop-app").on("click",function(){
		if($(this).hasClass("disabled"))return false;
		$(this).addClass("disabled");
		//调用弹窗方法
		appopen($(this).data(),$(this));
	}); 
	/*桌面菜单 点击事件*/
	$("#showdesktop,.taskbar-showdesktop").on("click",function(){
		$(".desktop-menu").hide();//隐藏菜单
		$(document).find(".layui-layer .layui-layer-min").click();//最小化所有窗口
		$(document).find(".taskbar-app").removeClass("taskbar-app-on");//移除任务栏app高亮
	});//显示桌面	
	$("#closeall").on("click",function(){
		var count = $(".taskbar-app").length;
		$(".desktop-menu").hide();//隐藏菜单
		if(count<1)return;		
		layer.alert("确定关闭所有窗口？",{icon:0,btn:['确定','取消'],zIndex:parseInt(layer.zIndex+1),yes: function(index, layero){
			$(document).find(".taskbar-app").remove();//关闭任务栏打开的app
			layer.closeAll('iframe');//关闭所有窗口
			layer.close(index);//关闭当前提示
		},end:function(){
		}});		
	});//关闭所有
	$("#lockscreen").on("click",function(){		
		$(".desktop-menu").hide();//隐藏菜单
		layer.open({
		  type: 1
		  ,title: false //不显示标题栏
		  ,closeBtn: false
		  ,area: '300px;'
		  ,shade: .8
		  ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
		  ,resize: false
		  ,btn: ['解锁']
		  ,btnAlign: 'c'
		  ,moveType: 1 //拖拽模式，0或者1
		  ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">好了，封印解除</div>'
		  ,success: function(layero){
			var btn = layero.find('.layui-layer-btn');
			//btn.find('.layui-layer-btn0').attr({
			//  href: 'http://www.layui.com/'
			//  ,target: '_blank'
			//});
		  }
		});
		//4
	});//锁屏
	$("#systemsettings").on("click",function(){
		$(".desktop-menu").hide();//隐藏菜单
		appopen({"title":"系统设置","url":"technicalsupport.asp","icon":"icon-xitongshezhi"});
	});//系统设置
	$("#themesettings").on("click",function(){
		$(".desktop-menu").hide();//隐藏菜单
		appopen({"title":"主题设置","url":"technicalsupport.asp","icon":"icon-theme"});
		//layer.alert("对不起，我还不能满足你",{icon:5,title:"系统重要提示"});
	});//主题设置
	$("#technicalsupport").on("click",function(){		
		$(".desktop-menu").hide();//隐藏菜单
		
		//调用弹窗方法
		appopen({"title":"技术支持","url":"technicalsupport.asp","icon":"icon-zhichi"});//必须参数
	});//技术支持	
	$("#cancellation").on("click",function(){
		$(".desktop-menu").hide();//隐藏菜单
		layer.msg("我要关闭了？你怕不怕");
	});//注销
	$(".taskbar-win").on("click",function(){		
		$("#opening-menu").toggleClass("opening-menu-on").off('mousedown', stope).on('mousedown', stope);
		$(document).off('mousedown', hide_opening_menu).on('mousedown', hide_opening_menu);
		$(window).off('resize', hide_opening_menu).on('resize', hide_opening_menu);
		$(this).off('mousedown', stope).on('mousedown', stope);	
	});//开始菜单
	
	$(".opening-menu-user-list a").on("click",function(){
		var that = $(this),cmd = that.attr("cmd");
		switch(cmd){
			case "Setting":
			//layer.alert("系统设置");
			appopen({"title":"系统设置","url":"technicalsupport.asp","icon":"icon-xitongshezhi"});
			break;
			case "Theme":
			//layer.alert("主题设置");
			appopen({"title":"主题设置","url":"technicalsupport.asp","icon":"icon-theme"});
			break;
			case "ziliao":
			layer.alert("个人资料");
			break;
			case "loginout":
			layer.alert("注销登录");
			break;
			default:	
		}
	});//开始菜单右侧
	
	/*$.getJSON("./desktopinc/calendar.asp?ac=list-7",function(res){
		if(res.data.length>0){
			var calendar_list="";
			layui.each(res.data,function(index,item){
				calendar_list+='<blockquote class="layui-elem-quote layui-elip" data-id="'+item.id+'" data-uid="'+item.uid+'" data-start="'+item.start+'" data-content="'+item.content+'"><span>'+item.start+'</span>'+item.title+'</blockquote>';
			});
			var calendar_html = ['<div class="calendar-layout">',
				'<div class="calendar-header">近七日有待办事项</div>',
				'<div class="calendar-list">',
					calendar_list,
				'</div>',
			'</div>'].join("");
			layer.open({
				type:1,
				title:false,
				closeBtn:0,
				shade:false,
				move: '.calendar-header',
				shadeClose:false,
				offset: 'rb',
				content:calendar_html,
				success:function(layero,index){
					$(layero).find(".layui-elem-quote").on("mousemove",function(){
						layer.tips($(this).data("content"),this);	
					});	
				}	
			});	
		}	
	});	*/
  //…
}();

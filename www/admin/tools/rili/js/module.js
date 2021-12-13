

function setNoteFullHTML(isEidtor,assignTime) {	
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var iwContentH = $indexW.find(".content").height();
	//
	var currentDate1 = new Date(currentDate);
	if(assignTime!=undefined){
		currentDate1 = assignTime;
	}
	var notefullHtml="<div id='noteFullWindow' style='height:"+iwHeight+"px;top:-"+iwHeight+"px;' class='notefullW'>\
						<form action=''>\
							<div class='head clearfix'>\
								<input type='button'id='btnReturn' class='returnBtn fll' />\
								<input type='button' class='noteTitle fll' value='添加记事' />";
		notefullHtml+="<div id='noteTypedd' class='jp-dropdown noteTypeWarp'>\
						<div class='noteTypeWarp-ht'></div>\
						<div id='noteTypeValue' class='noteType'>默认分类</div>\
						<div class='selectdown'></div>\
							<ul class='jp-dropdown-menu noteType-extend'>";
					var data = ZHWNL.Content.operation.getNoteType();
					if(data!=null) {
						$.each(data,function (index, item){
							for(var key in item) {
								notefullHtml+= "<li catidStr='"+key+"' class='clearfix'>\
													<span class='noteName'>"+item[key]+"</span>\
													<span class='none flr'><span class='edit' title='编辑'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='delete' title='删除'>&nbsp;&nbsp;&nbsp;&nbsp;</span></span>\
												</li>";
							}
						});
					}
					var weekDay =getweekDay(currentDate1.getDay());
					 notefullHtml+= "<li id='newNoteType' class='clearfix'>\
											<span id='newType' class='noteName'>+ 新建分类</span>\
											<span class='none flr'><span class='nsure'>&nbsp;&nbsp;&nbsp;</span><span class='ncancel'>&nbsp;&nbsp;&nbsp;</span></span>\
										</li>\
									</ul>\
								</div>\
								<input type='hidden' name='catid_change' id='catid_change' value='-74533' />\
								<input type='hidden' name='catid' id='catid' value='-74533' />\
								<span style='display:none;' id='caname_start'>默认分类</span> \
							</div>\
							<div class='content clearfix' style='height:"+iwContentH+"px;'>\
								<div class='contentHead clearfix'>\
									<div class='fll'>时间：<span id='datetime'>"+currentDate1.format("yyyy年MM月dd日")+" 周"+weekDay+"</span></div>\
									<div id='uploadify' class='flr'></div>\
									<div id='fileQueue' class='none'></div>\
								</div>\
								<div class='noteContentWarp'><textarea style='height:"+(iwContentH-20-28-38-4)+"px;'\
								class='noteContent' placeholder='在这里，记录您的点点滴滴' id='note_title_add' name='title'></textarea></div>\
								<div class='btnButtom'>\
								<input type='hidden' name='image' id='note_image_add' value=''/>\
								<input name='rtp' type='hidden' value='AddNoteAction' />\
								<input name='weather' type='hidden' value='' />\
								<input name='templ' type='hidden' value='' />\
								<input name='temph' type='hidden' value='' />\
								<input name='city' type='hidden' value='' />\
								<input name='r' type='hidden' value='json' />\
								<input id='isNormal' name='isNormal' type='hidden' value='1' />\
								<input id='contentid' name='contentid' type='hidden' value=''/>\
								<input id='date' name='date' type='hidden' value='"+currentDate1.format("yyyy-MM-dd")+" "+new Date().format("hh:mm:00")+"' />\
								<input type='button' class='save'  />\
								<input type='button' class='cancel' id='cancal' />\
						  		</div>\
							</div>\
						</form>\
					</div>";
	$("#indexWindow").parent().append(notefullHtml);
	toOtherWindow("noteFullWindow");
	setSltime("noteFullWindow", "datetime");
	$('#noteFullWindow .save').click(function () {
		var $this = $(this);
		ZHWNL.Content.operation.formSubmitAdd1($this[0].form,'#noteFullWindow ',true);
	});
	uploadImage($("#uploadify"),_uId);
	//绑定"返回"按钮事件
	$("#noteFullWindow").find("#btnReturn").click(function(){
		//
		returnIndexWindow("noteFullWindow");
		if(isEidtor!=undefined&&isEidtor) {
			ZHWNL.Content.operation.changeNoteCateType("#noteFullWindow ");
		}
	});
	//绑定记事类型下拉框事件
	$("#noteFullWindow #noteTypedd").bindState(1,"jp-dropdown",true);
	
	//绑定记事的"新建分类"事件
	$("#noteFullWindow #newNoteType").click(function(e){
		//去除其他的修改类型的输入框
		returnOriginalStyle();
		//
		$input=$("<input type='text' maxlength='30' id='noteTypeName' class='newTypeInput' placeholder='输入类名...' />");
		var $spannewType = $("#newNoteType #newType");
		$spannewType.hide();
		$spannewType.after($input);
		$("#newNoteType span.none").show();
		$("#newNoteType span.none .ncancel").unbind();
		$("#newNoteType span.none .ncancel").click(function(e){
			$input.remove();
			$spannewType.show();
			$("#newNoteType span.none").hide();
			e.stopPropagation();
		});
		$("#newNoteType span.none .nsure").unbind();
		$("#newNoteType span.none .nsure").click(function(e){
			var _this=$(this);
			if(_this.hasClass("disabled"))
				return ;
			else
				_this.addClass("disabled");
			$input.remove();
			$spannewType.show();
			$("#newNoteType span.none").hide();
			//添加分类的方法
			ZHWNL.Content.operation.addCategory($("#noteFullWindow .jp-dropdown-menu"),$input.val(),
					function(){ _this.removeClass("disabled"); });
			e.stopPropagation();
		});

		$input.click(function(e){
			e.stopPropagation();
		});
		e.stopPropagation();
	});
	//绑定记事各类型事件
	bindNoteTypeList(isEidtor);
}
var isCanSave=true;
function uploadImage($uploadify,uid){
	
	$uploadify.uploadify({
        fileExt: '*.png;*.jpg;*.gif;',
        auto: true,
        multi: false,
        queueID: 'fileQueue',
        swf: '../js/uploadify/uploadify.swf',
        uploader: 'http://upload.zhwnl.cn/upload?key=16832XOvadu9ss93A&uid='+uid,
        buttonText : '<span>插入图片</span>',
        height: 20,
        width: 60,
        sizeLimit: 1024*1024*0.8,
        onSelect: function (event, queueID, fileObj) {
        	$uploadify=$("#uploadify.uploadify");
        	//验证图片
        	if(event.size>1024*1024*0.8){
        		alert("不能上传大于800K的图片");
        		$uploadify.uploadify('cancel');
        		return;
        	}
        	var type = event.name;
         	var typeArr = type.split('.');
         	 type = typeArr[typeArr.length-1].toLowerCase();
        	if(!(type=='png'||type=='gif'||type=='jpg')){
        		alert("文件类型不对(现在支持的图片文件类型有：png ,jpg ,gif)");
        		$uploadify.uploadify('cancel');
        		return;
        	}
        	//
        	isCanSave=false;
        	$("#noteimgOpera").remove();
        	var $cancel=$("<div class='flr noteimgOpera' id='noteimgOpera'><span class='uploadImgLoad'>&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
        			"&nbsp;&nbsp;&nbsp;&nbsp;<span id='cancelImg'>取消上传</span></div>");
        	$uploadify.after($cancel);
        	
        	$cancel.children('#cancelImg').click(function(){	
        		$uploadify.uploadify('cancel');
        		$cancel.remove();
        		isCanSave=true;
        	});
        	$uploadify.clearQueue();
        },
        onUploadSuccess: function (file, data, response) {
            if (response) {
            	 var jsonData = JSON.parse(data);
            	$uploadify=$("#uploadify.uploadify");
            	var $viewImage = $(".uploadImgLoad");

                var jsonData = JSON.parse(data);
                if (jsonData.status == "1000") {
                    var url = jsonData.url;
                    $('#note_image_add').val(url);
                	   
            	    $viewImage.click(function(){
	        	    	$.dialog({
	                   		id:"viewImageLoad",
	                   		content:"<img src='../img/artDialogloading.gif' alt='加载图片' />",
	                   		fixed: true,
	   						drag: false,
	   						lock: true,
	   						title: false
	                   	});
            	    	
            		   var img=new Image();            
                       if($.browser.msie){
                       		img.onreadystatechange =function(){    
                               if(img.readyState=="complete"||img.readyState=="loaded"){
                            	   setViewImage(img);
                               }
                       		};
                       }else{
                           img.onload = function (){
   	                         if(img.complete){
   	                        	 setViewImage(img);
   	                         }
                           };
                       }
                       img.src=url;
                       function setViewImage(img){
                           var whjson = returnAutoSize(img,522,385,-1);
                		   $.dialog({
	                       		id:"viewOriginalImage",
	                       		content:"<img src='"+ img.src +"' width='"+whjson.width+"px' height='"+whjson.height+"px' alt='图片' />",
	                       		fixed: true,
	       						drag: false,
	       						lock: true,
	       						title: false,
	       						init:function(){
	       							art.dialog.list["viewImageLoad"].close();
	       						}
	                       	});
                       }
                    });

					$("#cancelImg").text("删除图片");
					$("#cancelImg").unbind();
					$("#cancelImg").click(function(){
						if(confirm("确认要删除图片？")){
							$uploadify.clearQueue();
							$("#note_image_add").val("");
							$("#noteimgOpera").remove();
						}
					});
					$viewImage.removeClass("uploadImgLoad").text("查看图片");
                }
                isCanSave=true;
            }
        }
    });
}

function unbindNoteTypeList(){
	$("#noteFullWindow #noteTypedd li:not(#newNoteType)").unbind();
	$("#noteFullWindow #noteTypedd li:not(#newNoteType) .edit").unbind();
	$("#noteFullWindow #noteTypedd li:not(#newNoteType) .delete").unbind();
	$("#noteFullWindow #cancal").unbind();
}

function returnOriginalStyle(){
	$("#noteFullWindow li input").remove();
	$("#noteFullWindow li .none").prev().show();
	$("#noteFullWindow li .sure").remove();
	$("#noteFullWindow li .cancel").remove();
	$("#noteFullWindow li .edit").show();
	$("#noteFullWindow li .delete").show();
}
//绑定记事各类型事件
function bindNoteTypeList(isEidtor){
	//去除记事类型"默认类型"操作
	$("#noteFullWindow #noteTypedd li:first").children(".none").remove();
	//绑定记事各类型事件
	$("#noteFullWindow #noteTypedd li:not(#newNoteType)").hover(function(){
		$(this).find("span.none").show();
	},function(){
		$(this).find("span.none").hide();
	});
	//绑定记事各类型事件
	$("#noteFullWindow #noteTypedd li:not(#newNoteType)").click(function(){
		$("#noteFullWindow #noteTypeValue").text("");
		$("#noteFullWindow #noteTypeValue").text($(this).children().eq(0).text());
		$("#noteFullWindow #catid_change").val(this.getAttribute("catidStr"));
		if(isEidtor!=undefined&&isEidtor){
			var cid = this.getAttribute("catidStr");
			ZHWNL.Content.operation.changeNoteCateType("#noteFullWindow ",cid);
		}
	});
	
	//绑定记事各类型的"编辑"按钮事件
	$("#noteFullWindow #noteTypedd li:not(#newNoteType) .edit").click(function(e){
		//去除其他的修改类型的输入框
		returnOriginalStyle();
		
		var _this = $(this);
		var oInput = $("#noteFullWindow #noteTypedd li:not(#newNoteType) #noteTypeName");
		oInput.prev().show();
		oInput.remove();
		//
		var $name = $(this).parent().prev();
		var $input = $("<input type='text' maxlength='30' id='noteTypeName' class='newTypeInput' placeholder='输入类名...' value='"+$name.text()+"' />");
		$name.hide();
		$name.after($input);
		
		$(this).hide();
		$(this).next().hide();
		$(this).after("<span class='sure' title='确定'>&nbsp;&nbsp;&nbsp;</span><span class='cancel' title='取消'>&nbsp;&nbsp;&nbsp;</span>");
		
		//绑定"确定"事件
		$(this).next().click(function(e){
			ZHWNL.Content.operation.editCategory($input.val(),$input.parent()[0].getAttribute("catidStr"),
			function(){
				$name.text($input.val());
				
				_this.next().remove();
				_this.next().remove();
				_this.show();
				_this.next().show();
				
				$input.remove();
				$name.show();
			});
			e.stopPropagation();
		});
		//绑定"取消"事件
		$(this).next().next().click(function(e){
			//去除其他的修改类型的输入框
			returnOriginalStyle();
			e.stopPropagation();
		});
		
		$input.click(function(e){
			e.stopPropagation();
		});
		e.stopPropagation();
	});
	
	//绑定记事各类型的"删除"按钮事件
	$("#noteFullWindow #noteTypedd li:not(#newNoteType) .delete").click(function(e){
		var catidValue = $(this).parents("li")[0].getAttribute("catidStr");
		var _this=this;
		ZHWNL.Content.operation.deleteCategory(catidValue,event,function(){ $(_this).parents("li").remove(); });
		e.stopPropagation();
	});
	//绑定"取消"按钮事件
	$("#noteFullWindow").find("#cancal").click(function(){
		$("#noteFullWindow").find("#btnReturn").click();
	});
}

var windowArr = ["indexWindow"];
function toOtherWindow(targetWindow,callback){
	if(_uId==''){
		$("#indexWindow #login").click();
		return;
	}
	windowArr.push(targetWindow);
	var legnth = windowArr.length;
	if(legnth>=3){
		$("#"+targetWindow).css({"left":"100%"});
	}
	//绑定"placeholder"事件
	if($.browser.msie){	
		$('input,textarea').placeholder();
	}
	$("#"+windowArr[legnth-2]).animate({left:"-100%"},"slow",function(){ $(this).hide(); });
	$("#"+windowArr[legnth-1]).animate({left:"0%"},"slow",function(){ 
		$(this).css("top","0");
		if(!!callback)
			callback(); 
	});
}
function returnIndexWindow(formWinow,isUpdateData){
	windowArr.pop(formWinow);
	var legnth = windowArr.length;
	if(!!isUpdateData){
		if(windowArr[legnth-1]=="datailNoteWindow"){
			var $window = $("#datailNoteWindow");
			
			setDetail($window.attr("ctype"),$window.attr("contentid"),0,
					function(){ $window.parent().children(":last").replaceAll($window); });
			$("#datailNoteWindow").css({"top":0,"left":"-100%"});
		}
	}
	$("#"+windowArr[legnth-1]).show();
	$("#"+formWinow).css("top","-"+$("#"+formWinow).height()+"px");
	
	$("#"+formWinow).animate({left:"100%"}, "slow",function(){
		$("#"+formWinow).remove(); });
	$("#"+windowArr[legnth-1]).animate({left:"0%"}, "slow");
}

function setBirthdayHTML(assignTime) {
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var iwContentH = $indexW.find(".content").height();
	
	var currentDate1 = new Date(currentDate);
	if(assignTime!=undefined){
		currentDate1 = assignTime;
	}
	
	var birthdayHTML =  "<div id='birthdayWindow' style='height:"+iwHeight+"px;top:-"+iwHeight+"px;' class='birthdayW'>\
							<div class='head clearfix'>\
								<input type='button' class='returnBtn fll' id='btnReturn'/>\
								<input type='button' class='noteTitle fll' value='添加生日' />\
							</div>\
							<div class='content' style='height:"+iwContentH+"px;'>\
							<form name='frm' id='frm' >\
								<table class='bwTable'>\
									<tr>\
										<td width='10%'>寿星</td>\
										<td>\
											<input type='hidden' id='friendsMap' maxlength='30' name='contact' value=''>\
											<input type='text' id='title' maxlength='30' name='title' class='bw-input' placeholder='姓名' value=''>\
										</td>\
									</tr>\
									<tr>\
										<td width='10%'>生日</td>\
										<td>\
											<div class='ptrt'>\
												<input type='text' value='"+currentDate1.format('yyyy年MM月dd日')+" 10:00:00' id='selectTime' class='bw-input' \
												readonly startvalue='"+currentDate1.format('yyyy-MM-dd')+" 10:00:00' datetype='solarDate' solardate='"+currentDate1.format("yyyy-MM-dd")+" 10:00:00'>\
												<input type='hidden' value='"+currentDate1.format("yyyy-MM-dd")+" 10:00:00' name='date' id='dateTime'>\
												<input type='hidden' value='1' name='isNormal' id='isNormal'>\
												<input type='hidden' value='' name='contentid' id='contentid'>\
												<span class='timerIcon' id='timerIcon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
											</div>\
										</td>\
									</tr>\
									<tr>\
										<td width='10%'></td>\
										<td>\
											<span id='isIgnoreYearImg' class='iyicon inlineblock'>忽略年份</span>\
											<input type='checkbox' class='vhide' value='1' name='isIgnoreYear' id='isIgnoreCase' />\
										</td>\
									</tr>\
									<tr>\
										<td width='10%'>提醒</td>\
										<td>\
											<div class='jp-dropdown remindTypeWarp' id='remindTypedd'>\
												<div class='remindType' id='remindType'>当天提醒</div>\
												<div class='fll selectdown'></div>\
												<ul class='jp-dropdown-menu remind-extend birRemind-extend'>\
													<li tinter='-1'><a>不提醒</a></li>\
													<li tinter='0'><a>当天提醒</a></li>\
													<li tinter='86400'><a>提前1天</a></li>\
													<li tinter='172800'><a>提前2天</a></li>\
													<li tinter='259200'><a>提前3天</a></li>\
													<li tinter='604800'><a>提前7天</a></li>\
													<li tinter='1296000'><a>提前半个月</a></li>\
													<li tinter='2592000'><a>提前一个月</a></li>\
												</ul>\
											</div>\
											<input type='hidden' value='0' id='advance' name='advance' />\
											<input type='hidden' name='cycle' id='cycle' value='1' />\
										</td>\
									</tr>\
									<tr>\
										<td width='10%'>备注</td>\
										<td>\
											<input type='text' class='bw-input' name='note' id='note' maxlength='30' placeholder='请输入备注内容...'>\
										</td>\
									</tr>\
								</table>\
								<input name='rtp' type='hidden' value='AddAlertAction' id='rtp'>\
								<input name='r' type='hidden' value='json'>\
								<input name='isRing' id='isRing' type='hidden' value='1'>\
								<input name='catid' id='catid' type='hidden' value='1003'/>\
								<div class='btnButtom'>\
									<input type='button' class='save' />\
									<input type='button' class='cancel' id='cancal' />\
								</div>\
								</form>\
							</div>\
						</div>";
	$("#indexWindow").parent().append(birthdayHTML);
	var $table = $("#birthdayWindow table");
	$table.css("margin-bottom", (iwContentH - $table.height() - $("#birthdayWindow .btnButtom").height()) +"px");
	
	toOtherWindow("birthdayWindow");
	
	//绑定"生日"事件
	slTime("",'1003');//时间
	$('#timerIcon').click(function(){ $('#selectTime').focus(); });//时间按钮

	//是否忽略年份
	$('#isIgnoreYearImg').click(function(){
		singlechImgClick(this,'iyicon-on');
	});
	ignoreYear("");//是否忽略年份
	
	//绑定"提醒"下拉框事件
	$("#birthdayWindow #remindTypedd").bindState(1,"jp-dropdown",true);
	//绑定"提醒"类型事件
	$("#birthdayWindow #remindTypedd li").click(function(){
		$("#birthdayWindow #remindType").text($(this).text());
		$("#birthdayWindow #advance").val($(this).attr("tinter"));
	});
	
	//双击事件和单机事件
	dbBindAlert("#birthdayWindow ");
	
	//绑定"返回"事件
	$("#birthdayWindow").find("#btnReturn").click(function(){
		returnIndexWindow("birthdayWindow");
	});
	
	//绑定"取消"按钮事件
	$("#birthdayWindow").find("#cancal").click(function(){
		$("#birthdayWindow").find("#btnReturn").click();
	});
}

function setMemoryHTML(assignTime){
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var iwContentH = $indexW.find(".content").height();
	
	var currentDate1 = new Date(currentDate);
	if(assignTime!=undefined){
		currentDate1 = assignTime;
	}
	
	var memoryHtml = "<div id='memoryWindow' style='height:"+iwHeight+"px;top:-"+iwHeight+"px;' class='birthdayW'>\
						<div class='head clearfix'>\
							<input type='button' class='returnBtn fll' id='btnReturn'/>\
							<input type='button' class='noteTitle fll' value='添加纪念日' />\
						</div>\
						<div class='content' style='height:"+iwContentH+"px;'>\
							<form name='frm' id='frm'>\
							<table id='hl_alertTable' class='bwTable'>\
								<tr>\
									<td width='10%'>标题</td>\
										<td><input type='text' class='bw-input' name='title' id='title' maxlength='100' placeholder='请输入内容...'>\
										<input type='hidden' id='friendsMap1' maxlength='30' name='contact' value=''>\
									</td>\
								</tr>\
								<tr>\
									<td width='10%'>时间</td>\
									<td>\
										<div class='ptrt'>\
											<input type='text' value='"+currentDate1.format("yyyy年MM月dd日")+" 10:00:00' id='selectTime' class='bw-input' readonly startvalue='"+currentDate1.format('yyyy-MM-dd')+" 10:00:00' datetype='solarDate' solardate='"+currentDate1.format('yyyy-MM-dd')+" 10:00:00'>\
											<input type='hidden' value='"+currentDate1.format("yyyy-MM-dd")+" 10:00:00' name='date' id='dateTime'>\
											<input type='hidden' value='1' name='isNormal' id='isNormal'>\
											<input type='hidden' value='' name='contentid' id='contentid'>\
											<span class='timerIcon' id='timerIcon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
										</div>\
									 </td>\
								</tr>\
								<tr>\
									<td width='10%'>提醒</td>\
									<td>\
										<div class='selectW-W'>\
											<div class='jp-dropdown remindTypeWarp' id='remindTypedd'>\
												<div class='remindType' id='remindType'>当天提醒</div>\
												<div class='fll selectdown'></div>\
												<ul class='jp-dropdown-menu remind-extend'>\
													<li tinter='-1'><a>不提醒</a></li>\
													<li tinter='0'><a>当天提醒</a></li>\
													<li tinter='86400'><a>提前1天</a></li>\
													<li tinter='172800'><a>提前2天</a></li>\
													<li tinter='259200'><a>提前3天</a></li>\
													<li tinter='604800'><a>提前7天</a></li>\
													<li tinter='1296000'><a>提前半个月</a></li>\
													<li tinter='2592000'><a>提前一个月</a></li>\
												</ul>\
											</div>\
										</div>\
										<input type='hidden' value='0' id='advance' name='advance' />\
									</td>\
								</tr>\
								<tr>\
									<td width='10%'>重复</td>\
									<td>\
										<div class='selectW-W fll'>\
											<div class='jp-dropdown repeatTypeWarp' id='repeatTypedd'>\
												<div class='repeatType' id='repeatType'>按年重复</div>\
												<div class='fll selectdown'></div>\
												<ul class='jp-dropdown-menu repeat-extend'>\
													<li rpCycle='0'><a>不重复</a></li>\
													<li rpCycle='1'><a>按年重复</a></li>\
													<li rpCycle='2'><a>按月重复</a></li>\
													<li rpCycle='3'><a>按天重复</a></li>\
												</ul>\
											</div>\
										</div>\
										<input type='hidden' name='cycle' id='cycle' value='1' />\
									</td>\
								</tr>\
							    <tr id='repreat_week' style='display: none; '>\
									<td width='10%'>每周</td>\
									<td class='checkboxRepeat'>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' id='repreat_week_all' class='cycleWeekAll'>\
											<label>全选</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>一</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>二</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>三</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>四</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>五</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>六</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>日</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<input type='hidden' name='cycleWeek' value=''>\
									</td>\
								</tr>\
								<tr>\
									<td width='10%'>地址</td>\
									<td>\
										<input type='text' id='keyword' name='address' class='bw-input' maxlength='100' value='' placeholder='请输入地址...'>\
										<input type='hidden' value='' id='mapX' name='mapX'>\
										<input type='hidden' value='' id='mapY' name='mapY'>\
									</td>\
								</tr>\
							</table>\
							<input name='rtp' type='hidden' value='AddAlertAction' id='rtp'>\
							<input name='r' type='hidden' value='json'>\
							<input name='isRing' id='isRing' type='hidden' value='1'>\
							<input name='catid' id='catid' type='hidden' value='1004'/>\
							<div class='clearfix btnButtom btnButtom-extend'>\
								<input type='button' id='sure' class='save'/>\
							    <input type='button' id='cancel' class='cancel' />\
							</div>\
						</form>\
					</div>\
				</div>";
	$("#indexWindow").parent().append(memoryHtml);
	
	toOtherWindow("memoryWindow");
	
	slTime("",'1004');//时间
	$('#timerIcon').click(function(){ $('#selectTime').focus(); });//时间按钮

	//绑定"提醒"事件
	$("#memoryWindow #remindTypedd").bindState(1,"jp-dropdown",true);
	$("#memoryWindow #remindTypedd li").click(function(){
		$("#memoryWindow #remindTypedd #remindType").text($(this).text());
		$("#memoryWindow #advance").val($(this).attr("tinter"));
	});
	//绑定"重复"事件
	$("#memoryWindow #repeatTypedd").bindState(1,"jp-dropdown",true);
	$("#memoryWindow #repeatTypedd li").click(function(){
		$("#memoryWindow #repeatTypedd #repeatType").text($(this).text());
		changeRepreat($(this).attr("rpCycle"),'#memoryWindow');//每周显示或隐藏
		$("#memoryWindow #cycle").val($(this).attr("rpCycle"));
	});
	//是否是全选
	$('#isAllDayTaskImg').click(function(){
		singlechImgClick(this,'adcbImg1');//每周 选中和没选中的样式
	});
	
	//按天重复   选择具体一周哪些天
	checkImgCheck("");
	
	//双击事件和单机事件
	dbBindAlert("#memoryWindow ");
	
	//绑定"返回"事件
	$("#memoryWindow").find("#btnReturn").click(function(){
		returnIndexWindow("memoryWindow");
	});
	//绑定"取消"事件
	$("#memoryWindow").find("#cancel").click(function(){
		$("#memoryWindow").find("#btnReturn").click();
	});
}

function setCountHTML(assignTime){
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var iwContentH = $indexW.find(".content").height();
	
	var currentDate1 = new Date(currentDate);
	if(assignTime!=undefined){
		currentDate1 = assignTime;
	}
	
	var countHtml = "<div id='countWindow' style='height:"+iwHeight+"px;top:-"+iwHeight+"px;' class='birthdayW'>\
						<div class='head clearfix'>\
							<input type='button'id='btnReturn' class='returnBtn fll' />\
							<input type='button' class='noteTitle fll' value='添加倒数日' />\
						</div>\
						<div class='content clearfix' style='height:"+iwContentH+"px;'>\
						<form name='frm' class='widow_nei' id='frm'>\
						    <table id='hl_alertTable' class='bwTable'>\
								<tr>\
									<td width='10%'>标题</td>\
									<td>\
										<input type='text' class='bw-input' name='title' id='title' maxlength='100' placeholder='请输入内容...'>\
										<input type='hidden' id='friendsMap1' maxlength='30' name='contact' value=''>\
									</td>\
								</tr>\
								<tr>\
									<td width='10%'>时间</td>\
									<td>\
										<div class='ptrt'>\
											<input type='text' value='"+currentDate1.format('yyyy年MM月dd日 hh:mm:00')+"' id='selectTime' class='bw-input' readonly startvalue='"+currentDate1.format('yyyy-MM-dd hh:mm:00')+"' datetype='solarDate' solardate='"+currentDate1.format('yyyy-MM-dd hh:mm:00')+"'>\
											<input type='hidden' value='"+currentDate1.format('yyyy-MM-dd hh:mm:00')+"' name='date' id='dateTime'>\
											<input type='hidden' value='1' name='isNormal' id='isNormal'>\
											<input type='hidden' value='' name='contentid' id='contentid'>\
											<span class='timerIcon' id='timerIcon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
										</div>\
									 </td>\
						        </tr>\
						        <tr>\
									<td width='10%'>提醒</td>\
									<td>\
										<div class='selectW-W'>\
											<div class='jp-dropdown remindTypeWarp' id='remindTypedd'>\
												<div class='remindType' id='remindType'>正点提醒</div>\
												<div class='fll selectdown'></div>\
												<ul class='jp-dropdown-menu remind-extend'>\
													<li tinter='-1'><a>不提醒</a></li>\
													<li tinter='0'><a>正点提醒</a></li>\
													<li tinter='300'><a>提前5分钟</a></li>\
													<li tinter='600'><a>提前10分钟</a></li>\
													<li tinter='1800'><a>提前30分钟</a></li>\
													<li tinter='3600'><a>提前1小时</a></li>\
													<li tinter='86400'><a>提前1天</a></li>\
													<li tinter='259200'><a>提前3天</a></li>\
												</ul>\
											</div>\
										</div>\
										<input type='hidden' value='0' id='advance' name='advance' />\
									</td>\
								</tr>\
								<tr>\
									<td width='10%'>重复</td>\
									<td>\
										<div class='selectW-W fll'>\
											<div class='jp-dropdown repeatTypeWarp' id='repeatTypedd'>\
												<div class='repeatType' id='repeatType'>不重复</div>\
												<div class='fll selectdown'></div>\
												<ul class='jp-dropdown-menu repeat-extend'>\
													<li rpCycle='0'><a>不重复</a></li>\
													<li rpCycle='1'><a>按年重复</a></li>\
													<li rpCycle='2'><a>按月重复</a></li>\
													<li rpCycle='3'><a>按天重复</a></li>\
												</ul>\
											</div>\
										</div>\
										<input type='hidden' name='cycle' id='cycle' value='0' />\
									</td>\
								</tr>\
								<tr id='repreat_week' style='display: none; '>\
									<td width='10%'>每周</td>\
									<td class='checkboxRepeat'>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' id='repreat_week_all' class='cycleWeekAll'>\
											<label>全选</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>一</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>二</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>三</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>四</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>五</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>六</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<span class='checkItem inlineblock'>\
											<input type='checkbox' class='cycleWeek'>\
											<label>日</label>\
											<span class='checkboxImg'>&nbsp;</span>\
										</span>\
										<input type='hidden' name='cycleWeek' value=''>\
									</td>\
								</tr>\
							</table>\
							<input name='rtp' type='hidden' value='AddAlertAction' id='rtp'>\
							<input name='r' type='hidden' value='json'>\
							<input name='isRing' id='isRing' type='hidden' value='1'>\
							<input name='catid' id='catid' type='hidden' value='1005'>\
							<div class='clearfix btnButtom btnButtom-extend'>\
								<input type='button' id='sure' class='save'>\
								<input type='button' id='cancel' class='cancel' >\
							</div>\
						</form>\
						</div>\
				</div>";
	$("#indexWindow").parent().append(countHtml);
	
	toOtherWindow("countWindow");
	
	slTime("",'1005');//时间
	$('#timerIcon').click(function(){ $('#selectTime').focus(); });//时间按钮
	
	//绑定"提醒"事件
	$("#countWindow #remindTypedd").bindState(1,"jp-dropdown",true);
	$("#countWindow #remindTypedd li").click(function(){
		$("#countWindow #remindTypedd #remindType").text($(this).text());
		$("#countWindow #advance").val($(this).attr("tinter"));
	});
	//绑定"重复"事件
	$("#countWindow #repeatTypedd").bindState(1,"jp-dropdown",true);
	$("#countWindow #repeatTypedd li").click(function(){
		$("#countWindow #repeatTypedd #repeatType").text($(this).text());
		changeRepreat($(this).attr("rpCycle"),'#countWindow');//每周显示或隐藏
		$("#countWindow #cycle").val($(this).attr("rpCycle"));
	});
	//是否是全选
	$('#isAllDayTaskImg').click(function(){
		singlechImgClick(this,'adcbImg1');//每周 选中和没选中的样式
	});
	//按天重复   选择具体一周哪些天
	checkImgCheck("");
	
	//双击事件和单机事件
	dbBindAlert("#countWindow ");
	
	//绑定"返回"事件
	$("#countWindow").find("#btnReturn").click(function(){
		returnIndexWindow("countWindow");
	});
	//绑定"返回"事件
	$("#countWindow").find("#cancel").click(function(){
		$("#countWindow").find("#btnReturn").click();
	});
}
function setScheduleHTML(assignTime) {
	var $indexW = $("#"+windowArr[windowArr.length-1]);
	var iwHeight = $indexW.height();
	var iwContentH = $indexW.find(".content").height();
	
	var currentDate1 = new Date(currentDate);
	if(assignTime!=undefined){
		currentDate1 = assignTime;
	}
	var beginTime = currentDate1.format('yyyy年MM月dd日 hh:mm:00');
	var beginTime1 = currentDate1.format('yyyy-MM-dd hh:mm:00');
	
	currentDate1.setHours(currentDate1.getHours()+1);
	
	var endTime =currentDate1.format('yyyy年MM月dd日 hh:mm:00');
	var endTime1 =currentDate1.format('yyyy-MM-dd hh:mm:00');

	var scheduleHtml = "<div id='scheduleWindow' style='height:"+iwHeight+"px;top:-"+iwHeight+"px;' class='birthdayW'>\
							<div class='head'>\
								<input type='button' id='btnReturn' class='returnBtn fll' />\
								<input type='button' class='addTitlt fll' value='添加日程' />\
							</div>\
							<div class='content' style='height:"+iwContentH+"px;'>\
								<form name='frm' class='widow_nei' id='frm'>\
								    <table id='hl_alertTable' class='bwTable' style='line-height:40px;'>\
										<tr>\
											<td width='10%'>内容</td>\
											<td>\
												<input type='text' class='bw-input' name='title' id='title' placeholder='请输入内容...(最多一百字)' maxlength='100'>\
												<input type='hidden' id='friendsMap1' maxlength='30' name='contact' value=''>\
											</td>\
										</tr>\
								        <tr>\
											<td width='10%'>开始</td>\
											<td>\
												<div class='ptrt'>\
													<input type='text' value='"+beginTime+"' id='selectTime' class='bw-input' readonly startvalue='"+beginTime1+"' datetype='solarDate' solardate='"+beginTime1+"'>\
													<input type='hidden' value='"+beginTime1+"' name='date' id='dateTime'>\
													<input type='hidden' value='1' name='isNormal' id='isNormal'>\
													<span class='timerIcon' id='timerIcon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
												</div>\
											 </td>\
									    </tr>\
										<tr>\
											<td width='10%'>结束</td>\
											<td>\
												<div class='ptrt'>\
													<input type='text' value='"+endTime+"' id='selectTime1' class='bw-input' readonly startvalue='"+endTime1+"' datetype='solarDate' solardate='"+endTime1+"'>\
													<input type='hidden' value='"+endTime1+"' name='endDate' id='dateTime1'>\
													<span class='timerIcon' id='timerIcon1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
												</div>\
											 </td>\
										</tr>\
								        <tr class='lineH32'>\
											<td width='10%'>全天</td>\
											<td class='ptrt'>\
												<input type='checkbox' class='vhide' value='1' name='isAllDayTask' id='isAllDayTask'>\
												<span id='isAllDayTaskImg' class='iyicon inlineblock alldayIcon'>&nbsp;</span>\
											</td>\
								        </tr>\
								        <tr>\
											<td width='10%'>提醒</td>\
											<td>\
												<div class='selectW-W fll'>\
													<div class='jp-dropdown remindTypeWarp' id='remindTypedd'>\
														<div class='remindType' id='remindType'>正点提醒</div>\
														<div class='fll selectdown'></div>\
														<ul class='jp-dropdown-menu remind-extend select-extend'>\
															<li tinter='-1'><a>不提醒</a></li>\
															<li tinter='0'><a>正点提醒</a></li>\
															<li tinter='300'><a>提前5分钟</a></li>\
															<li tinter='600'><a>提前10分钟</a></li>\
															<li tinter='1800'><a>提前30分钟</a></li>\
															<li tinter='3600'><a>提前1小时</a></li>\
															<li tinter='86400'><a>提前1天</a></li>\
															<li tinter='259200'><a>提前3天</a></li>\
														</ul>\
													</div>\
													<input type='hidden' value='0' id='advance' name='advance' />\
												</div>\
												<div class='fll'>\
													<div class='fll' style='height:42px;line-height:42px;margin:0 23px;'>重复</div>\
													<div class='selectW-W fll'>\
														<div class='jp-dropdown repeatTypeWarp' id='repeatTypedd'>\
															<div class='repeatType' id='repeatType'>不重复</div>\
															<div class='fll selectdown'></div>\
															<ul class='jp-dropdown-menu repeat-extend'>\
																<li rpCycle='0'><a>不重复</a></li>\
																<li rpCycle='1'><a>按年重复</a></li>\
																<li rpCycle='2'><a>按月重复</a></li>\
																<li rpCycle='3'><a>按天重复</a></li>\
															</ul>\
														</div>\
													</div>\
													<input type='hidden' name='cycle' id='cycle' value='0' />\
	 											</div>\
									        </td>\
							      	    </tr>\
										<tr id='repreat_week' class='lineH32 none'>\
											<td width='10%'>每周</td>\
											<td class='checkboxRepeat'>\
												<span class='checkItem inlineblock ml03'>\
													<input type='checkbox' id='repreat_week_all' class='cycleWeekAll'>\
													<label>全选</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>一</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>二</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>三</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>四</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>五</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>六</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<span class='checkItem inlineblock'>\
													<input type='checkbox' class='cycleWeek'>\
													<label>日</label>\
													<span class='checkboxImg'>&nbsp;</span>\
												</span>\
												<input type='hidden' name='cycleWeek' value='' />\
											</td>\
								        </tr>\
										<tr>\
											<td width='10%'>地址</td>\
											<td>\
												<input type='text' id='keyword' name='address' class='bw-input' maxlength='100' placeholder='请输入地址...（选填）'>\
												<input type='hidden' value='' id='mapX' name='mapX'>\
												<input type='hidden' value='' id='mapY' name='mapY'>\
											</td>\
									    </tr>\
								    </table>\
									<input name='rtp' type='hidden' value='AddAlertAction' id='rtp' />\
									<input name='catid' id='catid' type='hidden' value='1000' />\
									<input name='r' type='hidden' value='json' />\
									<input name='isRing' id='isRing' type='hidden' value='1' />\
									<input type='hidden' value='' name='contentid' id='contentid' />\
								<div class='clearfix btnButtom btnButtom-extend'>\
									<input type='button' id='sure' class='save'>\
								    <input type='button' id='cancel' class='cancel' />\
								</div>\
								</form>\
							</div>\
						</div>";
	$("#indexWindow").parent().append(scheduleHtml);
	toOtherWindow("scheduleWindow");
	slTime("","1000");//时间
	slTimeEnd("");//结束时间
	$('#timerIcon').click(function(){ $("#selectTime").focus(); });//时间按钮
	$('#timerIcon1').click(function(){ $("#selectTime1").focus(); });//结束时间按钮
	
	//是否是全天
	$("#isAllDayTaskImg").click(function(){
		singlechImgClick(this,"iyicon-on");//每周 选中和没选中的样式
	});
	//绑定"提醒"事件
	$("#scheduleWindow #remindTypedd").bindState(1,"jp-dropdown",true);
	$("#scheduleWindow #remindTypedd li").click(function(){
		$("#scheduleWindow #remindTypedd #remindType").text($(this).text());
		$("#scheduleWindow #advance").val($(this).attr("tinter"));
	});
	//绑定"重复"事件
	$("#scheduleWindow #repeatTypedd").bindState(1,"jp-dropdown",true);
	$("#scheduleWindow #repeatTypedd li").click(function(){
		$("#scheduleWindow #repeatTypedd #repeatType").text($(this).text());
		changeRepreat($(this).attr("rpCycle"),'#scheduleWindow');//每周显示或隐藏
		$("#scheduleWindow #cycle").val($(this).attr("rpCycle"));
	});
	
	//按天重复   选择具体一周哪些天
	checkImgCheck("");
	
	//双击事件和单机事件
	dbBindAlert("#scheduleWindow");
	
	//绑定"返回"事件
	$("#scheduleWindow").find("#btnReturn").click(function(){
		returnIndexWindow("scheduleWindow");
	});
	//绑定"取消"事件
	$("#scheduleWindow").find("#cancel").click(function(){
		$("#scheduleWindow").find("#btnReturn").click();
	});
}

//index 右下方 类别 点击绑定事件
function setListHTML(typeName,value,early_time,last_time){
	showGlobalLoading("数据加载中...");
	
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var $content =  $indexW.find(".content");
	var iwContentH =$content.height()+parseInt($content.css("padding-top"))+
	parseInt($content.css("padding-bottom"));
	var listHTML = "<div id='listWindow' class='listW' style='height:"+iwHeight+"px;top:-"+(iwHeight)+"px;'>\
						<div class='head clearfix'>\
							<input type='button' class='returnBtn fll' id='btnReturn' />\
							<div class='fll jp-dropdown evventType' id='eventType'>\
								<div>\
									<div class='fll' id='eventTypeValue' value="+value+">"+typeName+"</div>\
									<div class='fll selectdown'></div>\
								</div>\
								<ul class='jp-dropdown-menu' id='selectType'>\
									<li id='liaddSchedule' value='1000'><a>日程</a></li>\
									<li id='liaddFestival' value='345'><a>节日</a></li>\
									<li id='liaddNote' value='-74533'><a>记事</a></li>\
								</ul>\
							</div>\
							<div class='plus jp-dropdown fll' id='addEvents'>\
								<ul class='jp-dropdown-menu'>\
									<li style='*margin-top:-18px;'>\
										<div class='blankarrow blankarrow-plusEx'><div class='arrow_dk'></div><div class='arrow_lt'></div></div>\
									</li>\
									<li id='liaddBrithday'><a>生日</a></li>\
									<li id='liaddMemory'><a>纪念日</a></li>\
									<li id='liaddCount'><a>倒数日</a></li>\
								</ul>\
							</div>\
						</div>\
						<div class='content' id='listContent' style='height:"+iwContentH+"px;'>\
							<div style='height:"+(iwContentH-20)+"px;' class='contentInner'>\
								<div class='prev'>\
									<span id='pre_load'>点击加载 <span class='loadMonth' datet='"+getBeforeXMonth(currentDate,1).format("yyyy/MM/01")+"'>"+getBeforeXMonth(currentDate,1).format('yyyy年M月')+"</span>的<span id='typeDataBefore'>"+typeName+"</span></span>\
								</div>\
								<div id='listItemContent'></div>\
								<div class='next'>\
									<span id='next_load'>点击加载 <span class='loadMonth' datet='"+getAfterXMonth(currentDate,1).format("yyyy/MM/01")+"'>"+getAfterXMonth(currentDate,1).format('yyyy年M月')+"</span>的<span id='typeDataAfter'>"+typeName+"</span></span>\
								</div>\
							</div>\
						</div>\
					</div>";
	$("#indexWindow").parent().append(listHTML);
	toOtherWindow("listWindow");

	//设置"+"的事件
	bindaddEvents();
	//事件的类型改变事件
	$("#listWindow #eventType").bindState(1,"jp-dropdown",true);
	$("#listWindow").find("#eventType li").click(function(){
		$("#listWindow #eventTypeValue").text($(this).text());
		$("#listWindow #eventTypeValue").attr("value",$(this).attr("value"));
		//中部 '类型选择' 改变时 ——>设置"+" 的事件
		selectTypeBindaddEvents();
		//去除现在展示的列表
		$("#listWindow #listContent .dataContent").empty();
	});
	//
	var catids = "";
	if("1000"==value){
		catids = "1000";
	} else if("345"==value) {
		catids = "1003,1004,1005";
	} else {
		catids = "note";
	}
	//进入"列表页"数据进行加载的方法。
	var $listContainer = $("#listWindow .contentInner");
	function plusEvent(){
		var currDate = new Date(new Date(currentDate).setDate(1));
		var currentDate1 = new Date(currDate.setHours(0,0,0));
		var currentDate2 = new Date(currDate.setHours(23,59,59));
		var $datalist = $("#listWindow #listItemContent");
		
		$listContainer.unbind();
		loadList(catids,early_time,last_time,$datalist,function(){ 
			$listContainer.scrollTop(30);
			BandSrcollEvent();
			//target的scrollTop
			/*var $parentsTable = $($("#happenDay[value='"+currentDate.format('dd')+"']").parents("table")[0]);
			if($parentsTable.length!=0){
				$("#listWindow .contentInner").scrollTop(
					$("#listWindow .contentInner")[0].scrollTop + $parentsTable.offset().top - 99);
			}*/
		});
	}
	plusEvent();
	//设置滑动条的初始值
	
	$listContainer.scrollTop(30);
	//点击"事件"下拉框中"日程","节日","记事"的值
	$("#listWindow").find("#liaddFestival").on("click",function() {
		catids = "1003,1004,1005";
		setDefaultList("节日");
	});
	$("#listWindow").find("#liaddSchedule").on("click",function() {
		catids = "1000";
		setDefaultList("日程");
	});
	$("#listWindow").find("#liaddNote").on("click",function() {
		catids = "note";
		setDefaultList("记事");
	});
	//
	function setDefaultList(typeName){
		showGlobalLoading("数据加载中...");
		$("#listWindow #listItemContent").empty();

		var beforeDT = getBeforeXMonth(currentDate,1);
		$("#listWindow #pre_load .loadMonth").text(beforeDT.format('yyyy年M月')).attr("datet",beforeDT.format("yyyy/MM/01"));
		$("#listWindow #pre_load #typeDataBefore").text(typeName);
		var afterDT = getAfterXMonth(currentDate,1);
		$("#listWindow #next_load .loadMonth").text(afterDT.format('yyyy年M月')).attr("datet",afterDT.format("yyyy/MM/01"));
		$("#listWindow #next_load #typeDataAfter").text(typeName);
		plusEvent();
	}
	//绑定"返回"事件
	$("#listWindow #btnReturn").click(function(){
		returnIndexWindow("listWindow");
	});
	
	//向上、下加载月的数据"pre_load","next_load"
	$("#listWindow").find('#pre_load,#next_load').parent().unbind();
	$("#listWindow").find('#pre_load,#next_load').parent().click(function(){
		showGlobalLoading("数据加载中...");
		
		var $showTime= $(this).find(".loadMonth");
		var time = $showTime.attr("datet");
		var $datalist = $("#listWindow #listItemContent");	
		if($(this).children("#pre_load").length==1){
			moreLoadList(catids,new Date(time),$datalist,true);
			var time= getBeforeXMonth(new Date(time),1);
			$showTime.text(time.format("yyyy年M月")).attr("datet",time.format("yyyy/MM/01"));
		}else{
			moreLoadList(catids,new Date(time),$datalist,false);
			var time= getAfterXMonth(new Date(time),1);
			$showTime.text(time.format("yyyy年M月")).attr("datet",time.format("yyyy/MM/01"));
		}
	});
}

//"更多"
function moreLoadList(catids,month,$datalist,isBefore){
	var currDate1 = new Date(month.setDate(1));
	var early = new Date(currDate1.setHours(0,0,0));
	var latest = new Date(currDate1.setHours(23,59,59));
	
//console.log("early_timeline -> latest_timeline (1-moreLoadList)", early.format("yyyy年MM月dd日") +" --> "+getLastDayofMonth(latest).format("yyyy年MM月dd日"));
	$.post(_baseURL+"/webapi",{	
		rtp:"QueryList4MonthSlice",
    	category_ids:catids,
    	early_timeline: early.getTime(),
    	latest_timeline: getLastDayofMonth(latest).getTime(),
        r: "JSON",
        order:"ASC",
        num:1,
        v:(new Date()).getTime()
    }, function(doc) {
	    	if(null!=doc) {
//	    		console.log("early_timeline -> latest_timeline (2-moreLoadList)", early.format("yyyy年MM月dd日") +" --> "+getLastDayofMonth(latest).format("yyyy年MM月dd日"));
	    		
	    		ZHWNL.Content.operation.bulidlist(doc, true, true,$datalist,isBefore);
	    		var currDate= new Date(currentDate);
	    		if(isBefore){
	    			var $prevAll = $datalist.children("[value='"+currDate.format('yyyy/MM/01')+"']").prevAll();
	    			var listArray = [];
	    			$prevAll.each(function(){
	    				listArray.push($(this).attr("value"));
	    			});
	    			listArray.sort();
	    			for(var i=listArray.length-1;i>=0;i--){
	    				$datalist.prepend($datalist.children("[value='"+listArray[i]+"']"));
	    			}
	    		}else{
	    			var $nextAll = $datalist.children("[value='"+currDate.format('yyyy/MM/01')+"']").nextAll();
	    			var listArray = [];
	    			$nextAll.each(function(){
	    				listArray.push($(this).attr("value"));
	    			});
	    			listArray.sort();
	    			for(var i in listArray){
	    				$datalist.append($datalist.children("[value='"+listArray[i]+"']"));
	    			}
	    		}	    		
	    		//隐藏tips
	    		hideGlobalLoading();
        	}else{
        		autoInfo($("#tips"),"没有数据");
        	}
    	}
	);
}
function BandSrcollEvent(){
	var $listContainer = $("#listWindow .contentInner");
	$listContainer.unbind();
	var scrollValue = 30; 
	//初始化
	$listContainer.scrollTop(scrollValue);
	//列表框滑动事件
	var after=false;
	var before=false;
	$listContainer.scroll(function(){
		if(before&&after){
			$(this).unbind();
			return;
		}
		if(this.scrollTop<scrollValue){
			var thrMonth = getBeforeXMonth(currentDate,4);
			var thrMonthmm = new Date(thrMonth.getFullYear(),thrMonth.getMonth(),1,0,0,0).getTime();
			if(before||(thrMonthmm>=
				new Date($("#listWindow").find("#pre_load .loadMonth").attr("datet")).getTime())){
				before=true;
				return;
			}else{
				$("#listWindow").find('#pre_load').parent().click();
				$listContainer.scrollTop(scrollValue);
			}
		}else if(this.scrollTop + scrollValue>this.scrollHeight - $(this).height()){
			var thrMonth = getAfterXMonth(currentDate,4);
			var thrMonthmm = new Date(thrMonth.getFullYear(),thrMonth.getMonth(),1,0,0,0).getTime();
			if(after||(thrMonthmm<=
				new Date($("#listWindow").find("#next_load .loadMonth").attr("datet")).getTime())){
				after=true;
				return;
			}else{
				$("#listWindow").find('#next_load').parent().click();
				$listContainer.scrollTop((this.scrollHeight - $(this).height())-scrollValue);
			}
		}
	});
}
function loadList(catids,start,end,$datalist,callback) {
	if(catids=="345") {
		catids = "1003,1004,1005";
	} else if(catids=="-74533") {
		catids = "note";
	}
	setTimeout(function(){
		//console.log("early_timeline -> latest_timeline (1)",start.format("yyyy-MM-dd")+" --> "+end.format("yyyy-MM-dd"));
		$.post(_baseURL+"/webapi",
        {	rtp:"QueryList4MonthSlice",
        	category_ids:catids,
        	early_timeline: start.getTime(),
        	latest_timeline: end.getTime(),
            r: "JSON",
            order:"ASC",
            num:1,
            v:new Date().getTime()
        },
        function(doc) {
        	if(null!=doc) {
        		ZHWNL.Content.operation.bulidlist(doc, true, true,$datalist);
        		//隐藏tips
        		if(!!callback)
        			callback();
	    		hideGlobalLoading();
	    		//console.log("early_timeline -> latest_timeline (2)",start.format("yyyy-MM-dd")+" --> "+end.format("yyyy-MM-dd"));
        	}else{
        		autoInfo($("#tips"),"没有数据");
            }
        });
	},20);
}
//设置某个一元素置顶
function setScrolltoTop($target,$scroll){
	if($target.length>0){
		$scroll.scrollTop($scroll[0].scrollTop+$target.offset().top-$scroll.offset().top);
	}
}

//设置列表页面，"+"在不同事件类型下的绑定
function selectTypeBindaddEvents() {
	//
	var $addEvents = $("#listWindow").find("#addEvents");
	var ctype = $("#listWindow #eventTypeValue").attr("value");
	$addEvents.unbind();
	if(ctype=="1000") {
		$addEvents.click(function(){
			setScheduleHTML();
		});
	} else if(ctype=="345") {
		$addEvents.bindState(1,"jp-dropdown",true);
	} else {
		$addEvents.click(function(){
			setNoteFullHTML();
		});
	}
}
//添加的绑定事件
function bindaddEvents() {
	var $addEvents = $("#listWindow").find("#addEvents");
	var ctype = $("#listWindow #eventTypeValue").attr("value");
	$addEvents.unbind();
	if(ctype=="1000") {
		$addEvents.click(function(){
			setScheduleHTML();
		});
	} else if(ctype=="345") {
		$addEvents.bindState(1,"jp-dropdown",true);
	} else {
		$addEvents.click(function(){
			setNoteFullHTML();
		});
	}
	//点击"生日","纪念日","记事"事件
	$("#listWindow").find("#liaddBrithday").click(function(){ setBirthdayHTML(); });
	$("#listWindow").find("#liaddMemory").click(function(){ setMemoryHTML(); });
	$("#listWindow").find("#liaddCount").click(function(){ setCountHTML(); });
}

// 编辑点击事件
function modifySchedule(ctype, id) {
	var data = ZHWNL.Content.operation.getSingleContent(ctype, id);
	if(data!=null && data!=undefined) {
		var catid = data.con.catid;
		var divName = "";
		if(ctype!="NOTE") {
			if(catid=="1000") {
				setScheduleHTML();
				divName = "#scheduleWindow";
			} else if(catid=="1003") {
				setBirthdayHTML();
				divName = "#birthdayWindow";
			} else if(catid=="1004") {
				setMemoryHTML();
				divName = "#memoryWindow";
			} else if(catid=="1005") {
				setCountHTML();
				divName = "#countWindow";
			}
			setupAlertValue(data,divName);
		} else {
			setNoteFullHTML(true);
			setNoteValue(data,"#noteFullWindow");
		}
	}
}
//编辑提醒    设置数据
function setupAlertValue(retData,warpID) {
	var title = $(warpID).find("#btnReturn").next().val();
	$(warpID).find("#btnReturn").next().val(title.replace("添加","修改"));
	
	var ret = eval("(" + retData.con.content + ")");
	var catname = retData.con.catname;
	var content_data;
		if (ret.data != "") {
		    content_data = eval("(" + ret.data + ")");
		}
		
		//设置地址
		if(content_data!=null && typeof content_data.place!= "undefined") {
			$(warpID+" #keyword").attr("value",content_data.place.address);
			$(warpID+" #mapX").val(content_data.place.x);
			$(warpID+" #mapY").val(content_data.place.y);
		}
		
		//判断生日是否忽略年份，checkbox的值
		if(retData.con.catid=="1003"){
			if(ret.syear==0) {
				$(warpID+" #isIgnoreCase").attr("checked",true);
				$(warpID+" #isIgnoreCase").siblings('span').addClass('iyicon-on');
			} else {
				$(warpID+" #isIgnoreCase").attr("checked",false);
				$(warpID+" #isIgnoreCase").siblings('span').removeClass('iyicon-on');
			}
		}
		
		var modi_date = new Date(parseFloat(retData.con.happen_time));
		/****如果是农历的话，变化时间的值以及各类型 中时间的格式****/
		if(ret.sminute<10) {
			ret.sminute = "0"+ret.sminute;
		}
		if(ret.shour<10) {
			ret.shour = "0"+ret.shour;
		}
		if(ret.isNormal==0) {
			var month = modi_date.getMonth()+1;
			var day = modi_date.getDate();
			if(month<10) {
				month = "0"+month;
			} 
			if(day<10){
				day = "0"+day;
			}
			var month_day = calwnl.date.getLundarMD(month+"-"+day,"-");
			$(warpID+' #selectTime').attr("datetype","lunarDate");
			$(warpID+" #selectTime").attr("lunardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
			if(retData.con.catid=="1003") {
				if(ret.syear==0) {
					$(warpID+" #selectTime").val(month_day+" "+ret.shour+":"+ret.sminute+":00");
					$(warpID+" #selectTime").attr("lunardate",new Date().getFullYear()+"-"+modi_date.format("MM-dd")+" "+ret.shour+":"+ret.sminute+":00");
				} else {
					$(warpID+" #selectTime").attr("value",modi_date.getFullYear()+"年"+month_day+" "+modi_date.format("hh:mm:ss"));
				}
			} else {
				$(warpID+" #selectTime").val(modi_date.getFullYear()+"年"+month_day+modi_date.format(" hh:mm:ss"));
			}
		} else {
			$(warpID+' #selectTime').attr("datetype","solarDate");
			if(retData.con.catid=="1003") {
				if(ret.syear==0) {
					$(warpID+" #selectTime").val(modi_date.format("MM月dd日")+" "+ret.shour+":"+ret.sminute+":00");
					$(warpID+" #selectTime").attr("solardate",new Date().getFullYear()+"-"+modi_date.format("MM-dd")+" "+ret.shour+":"+ret.sminute+":00");
				} else {
					$(warpID+" #selectTime").val(modi_date.format("yyyy年MM月dd日 hh:mm:ss"));
					$(warpID+" #selectTime").attr("solardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
				}
			} else {
				$(warpID+" #selectTime").val(modi_date.format("yyyy年MM月dd日 hh:mm:ss"));
				$(warpID+" #selectTime").attr("solardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
			} 
		}
		/****结束****/
		
		$(warpID+" #alert_typeIcon").addClass('selectImg'+retData.con.catid);
		//当为日程的时候 设置开始时间和结束时间
		if(retData.con.catid=="1000") {
			if(content_data!=null){
				if(content_data.isAllDayTask) {
					if(ret.isNormal==0) {
						var month_day = calwnl.date.getLundarMD(month+"-"+day,"-");
						$(warpID+" #selectTime1").val(modi_date.getFullYear()+"年"+month_day);
						$(warpID+" #selectTime").val(modi_date.getFullYear()+"年"+month_day);
						$(warpID+" #selectTime1").attr("datetype",'lunarDate');
						$(warpID+" #selectTime1").attr("lunardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
					} else {
						$(warpID+" #selectTime1").attr("datetype",'solarDate');
						$(warpID+" #selectTime").val(modi_date.format("yyyy年MM月dd日"));
						$(warpID+" #selectTime1").val(modi_date.format("yyyy年MM月dd日"));
						$(warpID+" #selectTime1").attr("solardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
						$(warpID+" #selectTime").attr("solardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
						$(warpID+" #selectTime").attr("datetype",'solarDate');
					}
					var cbad = $(warpID+" #isAllDayTask");
					cbad.attr("checked",true);
					cbad.siblings('span').addClass('iyicon-on');
				} else {
					if(typeof content_data.nDate!= "undefined") {
						var ndate = new Date(content_data.nDate.year,content_data.nDate.month-1,content_data.nDate.date,content_data.nDate.hour,content_data.nDate.minute,0);
						if(ret.isNormal==0) {
							var month_n = content_data.nDate.month;
							var day_n = content_data.nDate.date;
							if(month_n<10) {
								month_n = "0"+month_n;
							}
							if(day_n<10) {
								day_n = "0"+day_n;
							}
							var month_day = calwnl.date.getLundarMD(month_n+"-"+day_n,'-');
							$(warpID+" #selectTime1").val(content_data.nDate.year+"年"+month_day+ndate.format(" hh:mm:ss"));
							$(warpID+" #selectTime1").attr("datetype",'lunarDate');
							$(warpID+" #selectTime1").attr("lunardate",ndate.format("yyyy-MM-dd hh:mm:ss"));
						}else {
							$(warpID+" #selectTime1").attr("datetype",'solarDate');
							$(warpID+" #selectTime1").val(ndate.format("yyyy年MM月dd日 hh:mm:ss"));
							$(warpID+" #selectTime1").attr("solardate",ndate.format("yyyy-MM-dd hh:mm:ss"));
							$(warpID+" #selectTime").attr("solardate",modi_date.format("yyyy-MM-dd hh:mm:ss"));
							$(warpID+" #selectTime").attr("datetype",'solarDate');
						}
					}
					var cbad = $(warpID+" #isAllDayTask");
					cbad.attr("checked",false);
					cbad.siblings('span').removeClass('iyicon-on');
				}
			}
		}
		
		$(warpID+" #remindType").text($(warpID+" .remind-extend li[tinter='"+ret.advance+"']").text());
		$(warpID+" #advance").val(ret.advance);//  设置select"提醒 "的值
		
		$(warpID+" #repeatType").text($(warpID+" .repeat-extend li[rpCycle="+ret.cycle+"]").text());
		changeRepreat(ret.cycle,warpID);//每周显示或隐藏
		$(warpID+" #cycle").val(ret.cycle);//  设置select"重复 "的值
		if(ret.cycle==3) {
			doConverNum(warpID,ret.cycleWeek);
		}
		
		$(warpID+" #isRing").val(ret.isRing);
		
		//设置一些特有值 接口返回数据中的data中的数据
		if(content_data!=null ) {
			if(retData.con.catid=="1003") {
				if(typeof content_data.peoples!= "undefined"){
					$(warpID+" #friendsMap").val(content_data.peoples.name);
				}
			} else {
				if (content_data.peoples !== undefined && content_data.peoples.length > 0) {
					var peoList = "";
					var p = "";
					var peoples = content_data.peoples;
					for (var i = 0; i < peoples.length; i++) {
						p +=JSON.stringify(peoples[i])+",";
					}
					if(peoples.length>0) {
						p = p.substring(0,p.lastIndexOf(","));
					}
					$(warpID+" #friendsMap1").val('['+p+']');
				}
			}
		}
		var dateTime = modi_date.format("yyyy-MM-dd hh:mm:ss");
		//设置修改提醒的时间和标题，以及隐藏域的部分值
		$(warpID+" input[name=rtp]").val("ModifyAlertAction");
		$(warpID+" input[name=ctype]").val(retData.con.type);
		$(warpID+" input[name=catid]").val(retData.con.catid);
		if(ret.syear==0) {
			$(warpID+" #dateTime").attr("value",modi_date.format("yyyy-MM-dd")+" "+ret.shour+":"+ret.sminute+":00");//设置时间
		} else {
			$(warpID+" #dateTime").attr("value",dateTime);//设置时间
		}
		$(warpID+" #contentid").val(retData.con.id);
		$(warpID+" [name='title']").val(ret.title);//加入要修改的title
		$(warpID+" [name='note']").val(ret.note);//加入要修改的备注
}
//编辑记事  设置数据
function setNoteValue(retData,warpID) {
	showGlobalLoading("数据加载中");
	var title = $(warpID + " #btnReturn").next().val();
	//
	if(title!=undefined){
		$(warpID + " #btnReturn").next().val(title.replace("添加","修改"));
	}
	//
	var ret = eval("(" + retData.con.content + ")");
    var catname = retData.con.catname;
    if(catname!=null &&""!=catname){
   	 catname = catname.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    var content_data;
    if (ret.data != "") {
        content_data = eval("(" + ret.data + ")");
    }
   $(warpID + " #contentid").val(retData.con.id);
   $(warpID + " #catid").val(retData.con.catid);
   $(warpID +" #noteTypeValue").text(catname);
   $(warpID + " #addCatName").val(catname);
   $(warpID + " #catid_change").val(retData.con.catid);
   $(warpID + " #caname_start").text(catname);
   if(content_data.image!=''){
	   var $uploadify=$("#uploadify.uploadify");
	   $("#noteimgOpera").remove();
   	   var $cancel=$("<div class='flr noteimgOpera' id='noteimgOpera'><span>查看图片</span>" +
   			"&nbsp;&nbsp;&nbsp;&nbsp;<span id='cancelImg'>删除图片</span></div>");
   	   $uploadify.after($cancel);
   	   var $viewImage=$cancel.children(":first");
	   //
   	   $("#cancelImg").unbind();
	   $("#cancelImg").click(function(){
		   if(confirm("确定删除图片？")){
				$uploadify.clearQueue();
				$("#note_image_add").val("");
				$("#noteimgOpera").remove();
		   }
	   });
	   
	   var img=new Image();
       if($.browser.msie){
	   		img.onreadystatechange =function(){    
	               if(img.readyState=="complete"||img.readyState=="loaded"){
	               	setViewImage(img);
	               }
	   		};
	   	}else{
           img.onload = function (){
                if(img.complete){
               	 setViewImage(img);
                }
           };
	   	}
       img.src=content_data.image;
       
      function setViewImage(img){
   	   var whjson = returnAutoSize(img,522,385,-1);
          $viewImage.click(function(){
              	$.dialog({
              		id:"viewOriginalImage",
              		content:"<img src='"+ content_data.image +"' width='"+whjson.width+"px' height='"+whjson.height+"px' alt='图片' />",
              		fixed: true,
						drag: false,
						lock: true,
						title: false
              	});
          });
      }
   }
   //************** ZHWNL.Calendar.Common.changeNoteCateType(warpID);
   // 设置天气
   if(content_data.city!=""&&content_data.weather!="" && content_data.templ!="" && content_data.temph!="" ) {
		$(warpID+" #weather_show").text(content_data.city+" "+content_data.weather+" "+content_data.templ+"~"+content_data.temph);	
       $(warpID+" #weather_show").parent().parent().children(".ndate").removeClass("mt18");
	}else{
		$(warpID+" #weather_show").text("").parent().parent().children(".ndate").addClass("mt18");
	}
   var title = ret.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
   
   $(warpID + " #note_title_add")[0].value = ret.title;

   var isNormal = ret.isNormal;
   var date = new Date(parseFloat(retData.con.happen_time));
   var dateShow = "";
   var weekDay =getweekDay(date.getDay());
   dateShow = date.format("yyyy年MM月dd日")+" 周"+weekDay;
   if (isNormal == "0") {
       dateShow = "农历：" + dateShow;
   }
   $(warpID + " input[name=isNormal]").val(isNormal);
   $(warpID + " #date").val(date.format("yyyy-MM-dd hh:mm:ss"));
   $(warpID + " #datetime").html(dateShow);
   $(warpID + " input[name=rtp]").val("ModifyNoteAction");
   if(content_data!=null&& content_data!=undefined) {
		$(warpID + " #note_image_add").val(content_data.image);
		$(warpID + " input[name=city]").val(content_data.city);
		$(warpID + " input[name=weather]").val(content_data.weather);
		$(warpID + " input[name=templ]").val(content_data.templ);
		$(warpID + " input[name=temph]").val(content_data.temph);
   }
   //隐藏信息
   hideGlobalLoading();
} 

//更多事件
function setODELHTML(catids,early_time,last_time){
	showGlobalLoading("数据加载中");
	
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var $content =  $indexW.find(".content");
	var iwContentH =$content.height();
	var listHtml = "<div id='eventListWindow' style='height:"+iwHeight+"px;top:-"+iwHeight+"px;' class='oneDListW'>\
						<div class='head'>\
							<input type='button' class='returnBtn fll' id='return' />\
							<input type='button' class='addTitlt fll' value='"+early_time.format("yyyy年MM月dd日")+"'>\
							<div id='addEvents' class='plus jp-dropdown'>\
								<ul class='jp-dropdown-menu'>\
									<li style='*margin-top:-18px;'>\
										<div class='blankarrow blankarrow-plusEx'><div class='arrow_dk'></div><div class='arrow_lt'></div></div>\
									</li>\
									<li id='liaddSchedule'><a>日程</a></li>\
									<li id='liaddNote'><a>记事</a></li>\
									<li id='liaddBrithday'><a>生日</a></li>\
									<li id='liaddMemory'><a>纪念日</a></li>\
									<li id='liaddCount'><a>倒数日</a></li>\
								</ul>\
							</div>\
						</div>\
						<div class='content' style='height:"+iwContentH+"px;'><div style='height:"+(iwContentH-20)+"px;margin-bottom:20px;' class='odeList'>";
	$.post(_baseURL+"/webapi",{
        	   rtp:"QueryList4TimeSlice",
           	   category_ids:catids,
           	   early_timeline: Math.round(early_time.getTime()),
           	   latest_timeline: Math.round(last_time.getTime()),
               r: "JSON",
               order:"ASC",
               v:new Date().getTime()
           },
            function(doc) {
            	if(null!=doc) {
            		listHtml +=  ZHWNL.Content.operation.buildMoreEvent(doc, true, true);
            		listHtml +="</div></div></div>";
            		$("#indexWindow").parent().append(listHtml);
            		toOtherWindow("eventListWindow");
            		
            		//点击"返回"事件
            		$("#eventListWindow #return").click(function(){
            			returnIndexWindow("eventListWindow");
            		});
            		
            		//点击新建"事件"类型
            		$("#eventListWindow").find("#addEvents").bindState(1,"jp-dropdown",true);
            		var assignTime = new Date(early_time);
        			var nowTime = new Date();
        			assignTime.setHours(nowTime.getHours(),nowTime.getMinutes(),0);
            		
            		//点击"新建"事件
            		$("#eventListWindow").find("#liaddSchedule").click(function(){setScheduleHTML(assignTime);});
            		$("#eventListWindow").find("#liaddBrithday").click(function(){setBirthdayHTML(assignTime);});
            		$("#eventListWindow").find("#liaddMemory").click(function(){setMemoryHTML(assignTime);});
            		$("#eventListWindow").find("#liaddCount").click(function(){setCountHTML(assignTime);});
            		//点击'记事'事件
            		$("#eventListWindow").find("#liaddNote").click(function(){setNoteFullHTML(undefined,assignTime);});
            		
            		listEventBind("#eventListWindow");
            		//隐藏信息
            		hideGlobalLoading();
            	}
            }
	);
}
//绑定"列表页面"各事件的事件绑定
function listEventBind($parentsid){

	var $deletes = $($parentsid+" .content .homelist .delete_in");
	$deletes.unbind();
	//点击  删除 事件
	$deletes.click(function(event){
		var contentid = $(this).attr("contentid");
		ZHWNL.Content.operation.doDeleteEvent(contentid,$parentsid);
		event.stopPropagation();
	});
	
	var $edits = $($parentsid+" .content .homelist .edit_in");
	$edits.unbind();
	//点击  编辑  事件
	$edits.click(function(event){
		var contentid = $(this).attr("contentid");
		var ctype = $(this).attr("ctype");
		modifySchedule(ctype, contentid);
		event.stopPropagation();//阻止冒泡
	});
	
	var $reminds = $($parentsid+" .content .homelist .openRemind");
	$reminds.unbind();
	//打开 提醒 
	$reminds.click(function(event){
		var contentid = $(this).attr("contentid");
		var catid = $(this).attr("catid");
		var advance = $(this).attr("advance");
		ZHWNL.Content.operation.remindSwitch(contentid,catid,'open',this,advance);
		event.stopPropagation();//阻止冒泡
	});
	
	var $closeReminds = $($parentsid+" .content .homelist .closeRemind");
	$closeReminds.unbind();
	//关闭 提醒 
	$closeReminds.click(function(event){
		var contentid = $(this).attr("contentid");
		var catid = $(this).attr("catid");
		var advance = $(this).attr("advance");
		ZHWNL.Content.operation.remindSwitch(contentid,catid,'close',this,advance);
		event.stopPropagation();//阻止冒泡
	});
	var $homelists = $($parentsid+" .content .homelist");
	$homelists.unbind();
	//hover事件
	$homelists.hover(function(){
		$(this).css("background-color",'#dfdfdf');
	},function(){
		$(this).css("background-color",'');
	});
	//点击 进入详情页面
	$homelists.children("table").click(function(){
		var _this = $(this);
		if(_this.hasClass("disabled"))
			return;
		else
			_this.addClass("disabled");
		var contentid = $(this).attr("contentid");
		var ctype = $(this).attr("ctype");
		var listDate = "";
		if($parentsid=="#eventListWindow") {
			listDate = $($parentsid+" .head .addTitlt").attr("value");
			listDate = listDate.substr(0,4)+"/"+listDate.substr(5,2)+"/"+listDate.substr(8,2);
		} else {
			var listTime = $(this).parents(".bb").attr("value");
			listTime = listTime.substr(0,8);
			listDate = $(this).find("#happenDay").attr("value");
			listDate = listTime+listDate;
		}
		setDetail(ctype,contentid,listDate,null,function(){ _this.removeClass("disabled"); });
	});
	//双击 进入详情页面
	$homelists.dblclick(function(){
		return;
	});
}

//设置 详情页面
function setDetail(ctype,id,time,callback,callBackSecond,listTime){
	var $indexW= $("#"+windowArr[windowArr.length-1]);
	var iwHeight= $indexW.height();
	var $content =  $indexW.find(".content");
	var iwContentH =$content.height();
	var data = ZHWNL.Content.operation.getSingleContent(ctype, id);
	
	var imgUrl='';
	var valueStr = " ctype='"+ctype+"' contentid='"+id+"' ";
	var mdateTime='';
	var catid;
	var styleStr="height:"+iwHeight+"px;top:-"+iwHeight+"px;";
	
	var noteCallBack=null;
	if(data!=null && data!=undefined) {
		var ret = eval("(" + data.con.content + ")");
	    
	    var content_data;
	    if (ret.data != "") {
	        content_data = eval("(" + ret.data + ")");
	    }
	    var datailHtml ="";
		if(ctype=="NOTE") {
			var catname = data.con.catname;
		    if(catname!=null &&""!=catname){
		    	catname = catname.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		    } else {
		    	catname = "";
		    }
		    imgUrl=content_data.image;
			var isNormal = ret.isNormal;
			var date = new Date(parseFloat(data.con.happen_time));
			var dateShow = "";
			var weekNum = date.getDay();
			 var weekDay =getweekDay(weekNum);
			dateShow = date.format("yyyy年MM月dd日")+" 周"+weekDay;
			if(isNormal == "0"){
		        dateShow = "农历：" + dateShow;
			}
			datailHtml = "<div id='datailNoteWindow' "+valueStr+" style='"+styleStr+"' class='oneDListW notedetailW'>\
					<div class='head clearfix'>\
						<input type='button' class='returnBtn fll' id='return'>\
						<input type='button' class='addTitlt fll' value='记事详情'>\
					</div>\
					<div class='content noteDetail' style='height:"+iwContentH+"px;'>\
					<div class='contentHead'>\
						<span class='fll mlr10'>"+dateShow +"</span>\
						<span class='fll' title='记事类型："+catname+"'>"+(catname.length<14?catname:catname.substr(0,14))+"</span>\
						<span class='flr'>";
			if(imgUrl!=""){
			   datailHtml+="<span id='viewImage' style='margin-right:10px;'>查看原图</span>";
			}
			if(ret.title==""&&imgUrl!=""){
				noteCallBack = function(){
					var img=new Image();
			        if($.browser.msie){
				   		img.onreadystatechange =function(){    
				   			if(img.readyState=="complete"||img.readyState=="loaded"){
				   				setViewImage(img);
				   			}
				   		};
				   	}else{
				   		img.onload = function (){
			                if(img.complete){
			               	 	setViewImage(img);
			                }
				   		};
				   	}
			        img.src=imgUrl;
					function setViewImage(img){
						var newImg = autoSize(img,484,iwContentH-75,1);
						$("#datailNoteWindow").find(".contentData").css({"padding":0});
						$("#datailNoteWindow").find(".noteDetailShow").append(newImg);
					}
				};
			}
			var restitle=ret.title;
		    datailHtml+="<span class='edit_in' onclick=\"modifySchedule('" + ctype + "', '" + data.con.id + "');\" title='编辑'>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
						<span class='delete_in' onclick=\"ZHWNL.Content.operation.doDeleteEvent('" + data.con.id + "','#datailNoteWindow');\"  title='删除'>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
					</span>\
				</div>\
				<div class='contentData'><div style='height:"+(iwContentH-68)+"px;' class='noteDetailShow'>"+
				restitle+
				"</div></div>\
			</div>\
			</div>";
			
		} else {
			catid = data.con.catid;
			/*num = ret.cycle;
			isNormal = ret.isNormal;
			cweek = ret.cycleWeek;*/
			var catIcon="festivalIcon";
			var catname;
			var time_string= "时间";
			if(catid=="1000") {
				catname = "日程安排";
				catIcon = "reminderIcon";
			} else if(catid=="1003") {
				catname = "生日";
				time_string = "生日";
			} else if(catid=="1004") {
				catname = "纪念日";
			} else if(catid=="1005") {
				catname = "倒数日";
			}
			var ht = new Date(parseFloat(data.con.happen_time));
			var Anniversary_html = "";//周年
			var Anniversary ;
			if(catid=="1003"|| catid=="1004") {
				if(ret.syear!=0) {
					if(time==0) {
						Anniversary =currentDate.getFullYear()-ht.getFullYear();
					} else {
						var listYear = time.substr(0,4);
						Anniversary =listYear-ht.getFullYear();
					}
					if(catid=="1003") {
						Anniversary_html = "<strong style='font-size:14px;color:orange;padding-left: 15px;'>&nbsp;["+Anniversary+"周岁]</strong>";
					} else {
						Anniversary_html = "<strong style='font-size:14px;color:orange;padding-left: 15px;'>&nbsp;["+Anniversary+"周年]</strong>";
					}
				}
			}
			var newDate = null;
			if(time!=0) {
				newDate = new Date(time);
			} else {
				newDate = new Date(parseFloat(data.con.happen_time));
				 if(ret.syear==0) {
					 newDate.setFullYear(new Date().getFullYear());
				 }
			    /*if(ret.isNormal==0) {
			    	var solar_date = getSolarDate(newDate.getFullYear(),newDate.getMonth() + 1,newDate.getDate(),false);
			    	newDate = new Date(solar_date.getFullYear(),solar_date.getMonth(),solar_date.getDate());
			    } */
			}
			newDate.setHours(ht.getHours(),ht.getMinutes(),ht.getSeconds());
			var daojishi = "";
			daojishi = "<strong class='flr'><span end='"+newDate.getTime()+"' id='timeleft_alert' class='timeleft_label'></span></strong>";		
			//alert(newDate.format("yyyy/MM/dd hh:mm:ss"));
			datailHtml = "<div id='datailNoteWindow' "+valueStr+" style='"+styleStr+"' class='oneDListW'>\
							<div class='head clearfix'>\
								<input type='button' class='returnBtn fll' id='return'>\
								<input type='button' class='addTitlt fll' value='"+catname+"详情'>\
							</div>\
							<div class='content eventDetail' style='height:"+iwContentH+"px;'>";
			   		datailHtml+='<div class="clearfix contentHead">\
				   					 <div class="fll '+catIcon+'"></div>\
				   					 <span class="fll" id="mdateTime"></span>\
				   					 <span class="flr">\
				   					 	<span class="edit_in" onclick="modifySchedule(\'' + ctype + '\', \''+ data.con.id+ '\');" title="编辑">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
				   					 	<span class="delete_in" onclick="ZHWNL.Content.operation.doDeleteEvent(\''+data.con.id + '\',\'#datailNoteWindow\');" title="删除">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
			   						 </span>\
		   					 	</div>\
		   						<table class="detailtable">\
			   						<tr>\
			   							<td width="10%" rowspan="2"></td>\
				   						<td width="87%" class="title">'+htmlEscape(ret.title)+Anniversary_html+daojishi+'</td></tr>';
		datailHtml+='<tr><td class="line_td ptm8">';
				if(ret.cycle=="0") {
					datailHtml+='<span>不重复</span>';
				} else {
					datailHtml+= ZHWNL.Content.operation.cycleString(data.con.happen_time,ret.cycle,ret.cycleWeek,ret.isNormal);
				}
				if(ret.isRing!=0) {
					var advance = ret.advance;
					var a ="";
					if(advance==0){
						if(catid=="1000" || catid=="1005") {
							a = "正点提醒";
						} else {
							a = "当天提醒";
						}
					}else if(advance==300){
						a = "提前5分钟";	
					}else if(advance==600){
						a = "提前10分钟";	
					}else if(advance==1800){
						a = "提前30分钟";	
					}else if(advance==3600){
						a = "提前1小时";	
					}else if(advance==86400){
						a = "提前1天";	
					}else if(advance==259200){
						a = "提前3天";	
					}else if(advance==172800) {
						a = "提前2天";	
					}else if(advance==604800) {
						a = "提前7天";	
					}else if(advance==1296000) {
						a = "提前半个月";	
					}else if(advance==2592000) {
						a = "提前1个月";	
					}			
					datailHtml+='&nbsp;&nbsp;&nbsp;&nbsp;<span>'+a+'</span></td></tr>';
				} else {
					datailHtml+='&nbsp;&nbsp;&nbsp;&nbsp;<span>不提醒</span></td></tr>';
				}
				datailHtml+='<tr><td>&nbsp;</td><td class="line_td">分类: <span>'+catname+'</span></td></tr>';
				
				var solar_date = ht;
				if(ret.syear==0) {
					if(ret.sminute<10) {
						ret.sminute = "0"+ret.sminute;
					}
					if(ret.shour<10) {
						ret.shour = "0"+ret.shour;
					}
					if(ret.isNormal==0) {
						var month = solar_date.getMonth()+1;
						var day = solar_date.getDate();
						if(month<10) {
							month = "0"+month;
						} 
						if(day<10){
							day = "0"+day;
						}
						var month_day = calwnl.date.getLundarMD(month+"-"+day,"-");
						datailHtml+='<tr><td>&nbsp;</td><td class="line_td ptm8">'+time_string+': <span>农历 '+month_day+" "+ret.shour+":"+ret.sminute+"&nbsp;&nbsp;</span></td></tr>";
						mdateTime= '农历'+month_day+" "+ret.shour+":"+ret.sminute;
					} else {
						datailHtml+='<tr><td>&nbsp;</td><td class="line_td ptm8">'+time_string+': <span>'+solar_date.format("MM月dd日")+" "+ret.shour+":"+ret.sminute+"&nbsp;&nbsp;</span></td></tr>";
						mdateTime= solar_date.format("MM月dd日")+" "+ret.shour+":"+ret.sminute;
					}
				} else {
					if(ret.isNormal==0) {
						solar_date = getSolarDate(ht.getFullYear(),ht.getMonth()+ 1,ht.getDate(),false);
						solar_date.setHours(ht.getHours());
						solar_date.setMinutes(ht.getMinutes());
					}
					datailHtml+='<tr><td>&nbsp;</td><td class="line_td ptm8">'+time_string+': <span>'+solar_date.format("yyyy年MM月dd日 hh:mm")+"&nbsp;&nbsp;";
					var lunar = jp_templates.lunar_Info_detail(solar_date);
					datailHtml+=" 农历"+(lunar.lunar).substring(2)+'</span></td></tr>';
					
					mdateTime = solar_date.format("yyyy年MM月dd日 hh:mm");
				}
				
				if(catid=="1003") {
					datailHtml+='<tr><td>&nbsp;</td><td class="line_td lineH20">备注：<span>';
						if(ret.note!="")
							datailHtml += ret.note;
						else 
							datailHtml+="无";
						datailHtml+='</span></td></tr>';
				} 
				if(content_data!=undefined && content_data!=""){
					if(catid=="1000" ||catid=="1004"){
						var p = content_data.peoples;
	 					if(p!=undefined&&p.length>0) {
	 						datailHtml+='<tr><td>&nbsp;</td><td class="line_td">相关联系人：<span>';
	 						var len = p.length;
	 					
	 						if(len>6) {
	 							len = 6;
	 						}
	 						for(var i=0; i<len;i++) {
	 							datailHtml += p[i].name+"&nbsp;";
	 							
	 						}
	 						if(p.length>6) {
	 							datailHtml += "...";
							}
	 						datailHtml+='</span></td></tr>';
	 					}
	 					datailHtml+='<tr><td>&nbsp;</td><td class="line_td lineH20">地点：<span>';
	    				if(content_data!=null && typeof content_data.place!= "undefined" && content_data.place.address!="") {
	    					datailHtml += content_data.place.address;
	    				} else {
	    					datailHtml +="无";
	    				}
	    				datailHtml+='</span></td></tr>';	
					}
				}
				
				datailHtml+='</table></div>';
	        }
		}else {
			datailHtml="操作失败";
		}
	$("#indexWindow").parent().append(datailHtml);
	$("#datailNoteWindow #mdateTime").text(mdateTime).css("margin-left","8px");
	//event类型为"记事"时
	if(!!noteCallBack)
		noteCallBack();
	
	if(!!callback){
		callback();
	}else{
		toOtherWindow("datailNoteWindow",callBackSecond);
	}
	if(time!=0){
		updateEndTime("#datailNoteWindow ");
	} /*else {
		updateEndTime("#datailNoteWindow ",num,catid,isNormal,cweek);
	}*/
	//点击"返回"事件
	$("#datailNoteWindow").find("#return").click(function(){
		returnIndexWindow("datailNoteWindow");
	});
	$("#datailNoteWindow #viewImage").click(function(){
		showGlobalLoading("数据加载中");
		var img = new Image();
        if($.browser.msie){
    		img.onreadystatechange = function(){
                if(img.readyState=="complete"||img.readyState=="loaded"){
                	setViewImage(img);
                }
    		};
    	}else{
            img.onload = function (){
                 if(img.complete){
                	 setViewImage(img);
                 }
            };
    	}
        img.src = imgUrl;
        
        function setViewImage(img){
		   	var whjson = returnAutoSize(img,522,385,-1);
			$.dialog({
				id:"viewOriginalImage",
				content:"<img src='"+ imgUrl +"' width='"+whjson.width+"px' height='"+whjson.height+"px' alt='图片' />",
				fixed: true,
				drag: false,
				lock: true,
				title: false
			});
			hideGlobalLoading();
       }
	});
}

function getBeforeXMonth(currDate,x){
	var tarMonth = currDate.getMonth() - x+1;
	var tarYear = currDate.getFullYear();
	
	if(tarMonth<0){
		tarYear--;
		tarMonth = tarMonth+12;
	}
	var objDate = new Date(tarYear,tarMonth,0,0,0,0);
	var tarDate = objDate.getDate();
	if(tarDate > currDate.getDate()){
		tarDate = currDate.getDate();
	};
	objDate.setDate(tarDate);
	return new Date(objDate);
}

function getAfterXMonth(currDate,x){
	var tarMonth = currDate.getMonth() + x+1;
	var tarYear = currDate.getFullYear();
	
	if(tarMonth>11){
		tarYear++;
		tarMonth = tarMonth-12;
	}
	var objDate = new Date(tarYear,tarMonth,0,23,59,59);
	var tarDate = objDate.getDate();
	if(tarDate > currDate.getDate()){
		tarDate = currDate.getDate();
	};
	objDate.setDate(tarDate);
	return new Date(objDate);
	
}

function getLastDayofMonth(currDate){
	return new Date(getAfterXMonth(currDate,1).setDate(0));
}



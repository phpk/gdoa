(function () {
	var util = {
		css: function (elem, obj) {
			for (var i in obj) {
				elem.style[i] = obj[i];
			}
		},
		hasClass: function (elem, classN) {
			var className = elem.getAttribute("class");
			return className.indexOf(classN) != -1;
		}
	};

	function Colorpicker(opt) {
		if (this === window) throw `Colorpicker: Can't call a function directly`;
		this.init(opt);
	};

	Colorpicker.prototype = {
		init(opt) {
			this.opt1 = JSON.parse(JSON.stringify(opt));
			if(opt.color.indexOf('#')<=-1){
				var a=opt.color.match(/(\d(\.\d+)?)+/g)
				let r = {
					r:parseInt(a[0]),
					g:parseInt(a[1]),
					b:parseInt(a[2]),
					a:parseInt(a[3])
				}
				opt.colors = r
				opt.color  = '#'+this.rgbToHex(r)
			}
		
			let { el, initColor = "rgb(255,0,0)", allMode = ['hex', 'rgb'], color = '' } = opt;
			var elem = document.getElementById(el);
			if (!(elem && elem.nodeType && elem.nodeType === 1)) {
				return
				// throw `Colorpicker: not found  ID:${el}  HTMLElement,not ${{}.toString.call(el)}`;
			}

			this.Opt = {
				...opt,
				el,
				initColor,
				allMode,
				color
			}
			this.firstcolor = true
			this.historycolor = JSON.parse(localStorage.getItem('colorarr')) 
            this.password = '100%'
			this.bindElem = elem; // 绑定的元素
			this.elem_wrap = null; // 最外层容器
			this.fixedBg = null; // 拾色器后面固定定位的透明div 用于点击隐藏拾色器
			this.elem_colorPancel = null; // 色彩面板
			this.elem_picker = null; // 拾色器色块按钮
			this.elem_barPicker1 = null; // 颜色条
			this.elem_hexInput = null; // 显示hex的表单
			this.elem_showColor = null; // 显示当前颜色
			this.elem_showModeBtn = null; // 切换输入框模式按钮
			this.elem_inputWrap = null; // 输入框外层容器

			this.pancelLeft = 0;
			this.pancelTop = 0;

			this.downX = 0;
			this.downY = 0;
			this.moveX = 0;
			this.moveY = 0;

			this.pointLeft = 0;
			this.pointTop = 0;

			this.current_mode = 'hex'; // input框当前的模式

			this.rgba = { r: 0, g: 0, b: 0, a: 1 };
			this.hsb = { h: 0, s: 100, b: 100 };


			var _this = this, rgb = initColor.slice(4, -1).split(",");

			this.rgba.r = parseInt(rgb[0]);
			this.rgba.g = parseInt(rgb[1]);
			this.rgba.b = parseInt(rgb[2]);

			var body = document.getElementsByTagName("body")[0],
				div = document.createElement("div");
            this.util = util
			div.innerHTML = this.render();
			div.className = 'colordiv mycolordiv'
			div.id = elem.id+'_color'
			body.appendChild(div);

			this.elem_wrap = div;
			this.fixedBg = div.children[0];
		
			this.elem_passcolor = div.getElementsByClassName("passcolor")[0];
			this.elem_colorPancel = div.getElementsByClassName("color-pancel")[0];
			this.elem_nocolor = div.getElementsByClassName("nocolor")[0];
			this.color_word = div.getElementsByClassName("color-word")[0];
			this.pancel_width = this.elem_colorPancel.offsetWidth;
			this.pancel_height = this.elem_colorPancel.offsetHeight;
			this.elem_picker = div.getElementsByClassName("pickerBtn")[0];
			this.elem_xq = div.getElementsByClassName("xq")[0];
			this.elem_colordiv = div.getElementsByClassName("colordiv")[0];
			this.elem_colorpie = div.getElementsByClassName("colorpie")[0];
			this.elem_colorPalette = div.getElementsByClassName("color-palette")[0];
			this.elem_colorPalette1 = div.getElementsByClassName("color-palette1")[0];
			this.elem_showColor = div.getElementsByClassName("colorpicker-showColor")[0];
			this.elem_move = div.getElementsByClassName("colortop")[0];
			this.elem_barPicker1 = div.getElementsByClassName("colorBar-color-picker")[0];
			this.elem_passbutton = div.getElementsByClassName("colorBar-passbutton")[0]
			/*   this.elem_barPicker2 = div.getElementsByClassName("colorBar-opacity-picker")[0]; */
			this.elem_hexInput = div.getElementsByClassName("colorpicker-hexInput")[0];
			this.elem_showModeBtn = div.getElementsByClassName("colorpicker-showModeBtn")[0];
			this.elem_inputWrap = div.getElementsByClassName("colorpicker-inputWrap")[0];
			this.elem_cover = div.getElementsByClassName("asdasd")[0];
			/*  this.elem_opacityPancel = this.elem_barPicker2.parentNode.parentNode.children[1]; */

			// var rect = this.bindElem.getBoundingClientRect();
			var elem = this.bindElem;
			var top = elem.offsetTop;
			var left = elem.offsetLeft;
			console.log(elem)
			console.log( elem.offsetTop)
			console.log( elem.offsetLeft)
			setTimeout(()=>{
				console.log( elem.offsetTop)
				console.log( elem.offsetLeft)
			},1000)
			
			while (elem.offsetParent) {
				top += elem.offsetParent.offsetTop;
				left += elem.offsetParent.offsetLeft;
				elem = elem.offsetParent;
			}
			console.log($(window))
			if(left+230>$(window).width()){
				left =  left -200+this.bindElem.offsetWidth
			  }
			  if(top+406+this.bindElem.offsetHeight>$(window).height()){
				top =  top -406-this.bindElem.offsetHeight
			  }
			top = top + this.bindElem.offsetHeight   
			console.log('top',JSON.parse(top))
			console.log('left',JSON.parse(left))
			this.pancelLeft = left + this.elem_colorPalette.clientWidth;
			this.pancelTop = top  + this.elem_colorPalette.clientHeight;
			
			if(opt.type =='iframe'){
				util.css(div, {
					"position": "absolute",
					"z-index": 10000,
					"display": 'none',
					"left":left + "px",
					"top":top + "px"
					
				});
			}else{
				util.css(div, {
					"position": "absolute",
					"z-index": 10000,
					"display": 'none',
					"right": $('body').width()-left + "px",
					"bottom": $('body').height()-top + "px"
					
				});

			}
			

			this.bindMove(this.elem_colorPancel, this.setPosition, true);
			this.bindMove(this.elem_barPicker1.parentNode, this.setBar, false);
			this.bindMove(this.elem_passbutton, this.setcolorBar, false);
			
			/*  this.bindMove(this.elem_barPicker2.parentNode,this.setBar,false); */

			this.bindElem.addEventListener("click", function () {
				window.event.stopPropagation()
				for(let i1=0;i1<$('.mycolordiv').length;i1++){
				      $('.mycolordiv')[i1].style.display='none'
				}
				let _that = this
			   console.log(_this.bindElem)
			   console.log($(_that)[0])
				let top = $(_that)[0].offsetTop;
			    let left = $(_that)[0].offsetLeft;
				let arr = []
				let arr1 = [ _that]
				if(_this.opt1.type !=='iframe'){
				while ($(_that)[0].offsetParent) {
					arr.push($(_that)[0].offsetParent)
					console.log($(_that)[0].offsetParent)
					top += $(_that)[0].offsetParent.offsetTop;
					left += $(_that)[0].offsetParent.offsetLeft;
					_that = $(_that)[0].offsetParent;
					}
					
				}
	
				if(left+230>$('body').width()){
					
					left =  left -200+$(this)[0].offsetWidth
				  }
				  if(top+406+$(this)[0].offsetHeight>$('body').height()){
					top =  top -406-$(this)[0].offsetHeight
				  }
				 
				top = top + $(this)[0].offsetHeight  
				console.log('top',JSON.parse(top))
				console.log('left',JSON.parse(left))
				console.log($('body').height()-top)
			    
				if(_this.opt1.type =='iframe'){
					_this.util.css(_this.elem_wrap, {
						"position": "absolute",
						"z-index": 10000,
						"display": 'none',
						"left":left + "px",
						"top":top + "px"
						
					});
				}else{
					
					_this.util.css(_this.elem_wrap, {
						"position": "absolute",
						"z-index": 10000,
						"display": 'none',
						"right": $('body').width()-left + "px",
						"bottom": $('body').height()-top + "px"
						
					});
	
				}
				_this.historycolor = JSON.parse(localStorage.getItem('colorarr')) 
				_this.elem_colorPalette1.innerHTML = _this.historycolorItem()
				_this.show();
			}, false);

			this.fixedBg.addEventListener("click", function (e) {
				_this.hide();
			}, false)

			// this.elem_showModeBtn.addEventListener("click", function () {
			// 	_this.switch_current_mode();
			// }, false)

			this.elem_wrap.addEventListener("input", function (e) {
			
				var target = e.target, value = target.value;
				if($(target)[0].className=='r'||$(target)[0].className=='g'||$(target)[0].className=='b'){
					$(target)[0].value = $(target)[0].value.replace(/\D/g,'').substring(0,3)
					if($(target)[0].value>=255){
						$(target)[0].value = 255
					}
					if($(target)[0].value<=0){
						$(target)[0].value = 0
			 		}
						let inputs = _this.elem_wrap.getElementsByTagName("input")
					let rgba = {
						r: parseInt(inputs[1].value),
						g: parseInt(inputs[2].value),
						b: parseInt(inputs[3].value)
					}
					inputs[0].value = 	("#" + _this.rgbToHex(rgba));
					_this.current_mode = 'hex'
					let value1 = inputs[1].value+','+inputs[2].value+','+inputs[3].value
					
				_this.current_mode = 'hex'
				let value2 = _this.treecolor(value1)
					_this.setColorByInput(value2);
				}else if($(target)[0].className=='hex'){
					_this.current_mode = 'hex'
					$(target)[0].value = $(target)[0].value.substring(0,7);
					_this.setColorByInput(value);
					let inputs = _this.elem_wrap.getElementsByTagName("input")
					inputs[1].value = 	_this.rgba.r;
					inputs[2].value = 	_this.rgba.g;
					inputs[3].value = 	_this.rgba.b;
				}
				
				
			}, false);
			
			this.elem_move.addEventListener("mousedown", function (e) {
				   if(e.target.className.toLocaleLowerCase() == "colortop"){
				window.event.stopPropagation()
				var x = 0;
				var y = 0;
				var l = 0;
				var t = 0;
				var isDown = false;
				x = window.event.clientX;
				y = window.event.clientY;
				//获取左部和顶部的偏移量
				l = _this.elem_wrap.offsetLeft;
				t = _this.elem_wrap.offsetTop;
				//开关打开
				isDown = true;
				var pdmove = false
				
				//设置样式  
				body.cursor = 'move';
				
				body.addEventListener("mousemove", function (e) {
					
					pdmove = true
					if (isDown == false) {
						return;
					}
					//获取x和y
					var nx =window.event.clientX;
					var ny = window.event.clientY;
					//计算移动后的左偏移量和顶部的偏移量
					
					var nl = nx - (x - l);
					var nt = ny - (y - t);
					if(nl+225 >= $(this).width()){
						nl = $(this).width() - 225 
					}
					if(nt + 428 >= $(this).height()){
						nt = $(this).height() - 428
					}
					if(nl < 0){
						nl = 1
					}
					if(nt <0){
						nt = 1
					}
					_this.elem_wrap.style.left = nl + 'px';
					_this.elem_wrap.style.top = nt + 'px';
					let top = _this.elem_wrap.offsetTop;
					let left = _this.elem_wrap.offsetLeft;
					_this.pancelLeft = left + _this.elem_colorPalette.clientWidth;
					_this.pancelTop = top + _this.elem_colorPalette.offsetHeight;
					_this.bindMove(_this.elem_colorPancel, _this.setPosition, true);
				
					
				})
				body.addEventListener("mouseup", function (e) {
		
			//开关关闭
			isDown = false;
			body.cursor = 'default';
				})
				}
			})
			_this.elem_wrap.getElementsByTagName("input")[0].addEventListener("mousedown", function (e) {
				_this.firstcolor = false
			})
			this.elem_nocolor.addEventListener("click", function (e) {
			_this.elem_wrap.style.display = 'none'
			_this.historycolor.unshift(`rgb(`+_this.rgba.r+','+_this.rgba.g+','+_this.rgba.b+')')
			_this.historycolor.pop()
			_this.elem_colorPalette1.innerHTML = _this.historycolorItem()
			localStorage.setItem("colorarr",JSON.stringify(_this.historycolor))
			if(opt.type =='iframe'){
				window.parent.back(window.parent.selectdata,window.parent.Controls)
			}else{
				window.back(window.selectdata,window.Controls)
			}
			
			})
			this.elem_cover.addEventListener("click", function (e) {
				_this.historycolor.unshift(`rgb(`+_this.rgba.r+','+_this.rgba.g+','+_this.rgba.b+')')
		       _this.historycolor.pop()
			   _this.elem_colorPalette1.innerHTML = _this.historycolorItem()
			   localStorage.setItem("colorarr",JSON.stringify(_this.historycolor))	
			   if(opt.type =='iframe'){
				window.parent.back(window.parent.selectdata,window.parent.Controls)
			}else{
				window.back(window.selectdata,window.Controls)
			}
			},false)
	this.elem_colordiv.addEventListener("click", function (e) {
		$($(_this.elem_wrap).find('.colordiv')).css({
			"background":("#333333")
		})
		$($(_this.elem_wrap).find('.colorpie')).css({
			"background":("#434343" )
		})
		$($(_this.elem_wrap).find('.color-palette')).css({
			"display":'block'
		})
		
		$($(_this.elem_wrap).find('.colorpicker-pancel')).css({
			
			"display":'none'
		})
	},false)
		this.elem_xq.addEventListener("click", function (e) {
			var time = 0
			setInterval(()=>{
            time++
			},1)
			$('body').css({
						    'cursor':'url(../colorimg/xq2.png )0 20,auto'
			})
			var canvasObj = '<canvas id="canvasPickerColor" style="position: fixed;left: 50000px;top: 500px;"></canvas>';
			$('body').append(canvasObj);
			var cvs = document.getElementById("canvasPickerColor"),ctx =cvs.getContext('2d')
			cvs.height=1;cvs.width=1
			var img = new Image();
			html2canvas(document.querySelector("body")).then(canvas => {
				if(changecolor){
					changecolor = false
				}
			
				img.src=canvas.toDataURL();
				img.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000000;'
				$('body').append(img)
				$(canvasObj).remove()
				setTimeout(()=>{
					var osX=e.offsetX,osY=e.offsetY
					ctx.drawImage(img,osX,osY,1,1,0,0,1,1);
					var imgData=ctx.getImageData(0,0,1,1);
					if(opt.ck) opt.ck(imgData.data);
				})
			$(img).pickerColor({
			    ck:function (data) {
			    let a = ('rgba('+data+',1)')
			     let a1 = a.replace(/rgba?\(/, '').replace(/\)/, '').replace(/[\s+]/g, '').split(',')
				let a3 = parseFloat(a1[3] || 1),
     r = Math.floor(a3 * parseInt(a1[0]) + (1 - a3) * 255),
     g = Math.floor(a3 * parseInt(a1[1]) + (1 - a3) * 255),
    b = Math.floor(a3 * parseInt(a1[2]) + (1 - a3) * 255)
   let  a4  = '#' +('0' + r.toString(16)).slice(-2) +('0' + g.toString(16)).slice(-2) +('0' + b.toString(16)).slice(-2)
   let inputs = _this.elem_wrap.getElementsByTagName("input")
   inputs[0].value = 	(a4);
   inputs[1].value = r;
   inputs[2].value = g;
   inputs[3].value = b;
   _this.current_mode = 'hex'
   $('body').css({
   			    'cursor':'default'
   })
   $($(_this.elem_wrap).find('.nowclass')).css({
   	"background":a4
   })
   _this.setColorByInput(a4)
   $(img).remove()
			    }
			})
			});
		},false)
	this.elem_colorpie.addEventListener("click", function (e) {
	$($(_this.elem_wrap).find('.colorpie')).css({
			"background":("#333333")
		})
		$($(_this.elem_wrap).find('.colordiv')).css({
			"background":("#434343" )
		})
		$($(_this.elem_wrap).find('.colorpicker-pancel')).css({
			"display":'block'
		})
		$($(_this.elem_wrap).find('.color-palette')).css({
			"display":'none'
		})
	},false)
	this.elem_colorPalette1.addEventListener("click", function (e) {
		if (e.target.tagName.toLocaleLowerCase() == "p") {
			let colorStr = e.target.style.background;
			let rgb = colorStr.slice(4, -1).split(",");
			let rgba = {
				r: parseInt(rgb[0]),
				g: parseInt(rgb[1]),
				b: parseInt(rgb[2])
			}
			let inputs = _this.elem_wrap.getElementsByTagName("input")
			inputs[0].value = 	("#" + _this.rgbToHex(rgba));
			inputs[1].value = rgba.r;
			inputs[2].value = rgba.g;
			inputs[3].value = rgba.b;
			_this.current_mode = 'hex'
			_this.setColorByInput("#" + _this.rgbToHex(rgba))
			$($(_this.elem_wrap).find('.nowclass')).css({
			"background":`rgba(`+_this.rgba.r+','+_this.rgba.g+','+_this.rgba.b+','+_this.rgba.a+')'
			})
	
		}
	}, false);
			this.elem_colorPalette.addEventListener("click", function (e) {
				if (e.target.tagName.toLocaleLowerCase() == "p") {
					let colorStr = e.target.style.background;
					let rgb = colorStr.slice(4, -1).split(",");
					let rgba = {
						r: parseInt(rgb[0]),
						g: parseInt(rgb[1]),
						b: parseInt(rgb[2])
					}
					let inputs = _this.elem_wrap.getElementsByTagName("input")
					inputs[0].value = 	("#" + _this.rgbToHex(rgba));
					inputs[1].value = rgba.r;
					inputs[2].value = rgba.g;
					inputs[3].value = rgba.b;
					_this.current_mode = 'hex'
					_this.setColorByInput("#" + _this.rgbToHex(rgba))
					$($(_this.elem_wrap).find('.nowclass')).css({
					"background":`rgba(`+_this.rgba.r+','+_this.rgba.g+','+_this.rgba.b+','+_this.rgba.a+')'
					})

				}
			}, false);

			(color != '' && this.setColorByInput(color));
		},
			// <div class="xq" onclick="xq()">吸取颜色</div>
		
		render: function () {
			var tpl =
				`
				
				<div class="asdasd" style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px;display:none"></div>
				<div style="position: inherit;z-index: 100; box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;    -webkit-touch-callout: none; /* iOS Safari */

-webkit-user-select: none; /* Chrome/Safari/Opera */

-khtml-user-select: none; /* Konqueror */

-moz-user-select: none; /* Firefox */

-ms-user-select: none; /* Internet Explorer/Edge */

user-select: none; ">
			     <div class="colortop" style="width: 225px;height: 24px;background-color: #171717;position: relative">
			      <div style='position:absolute;color:#EEEEEE;left:10px;font-size: 12px;top:3px'>
				  填充
				  </div>
				  <div class='nocolor' style='position:absolute;color:#EEEEEE;right:8px;font-size: 12px;top:7px;height:10px;width:10px;cursor: pointer'>
				  <img  src="./colorimg/nocolor.png" alt="" style="width:100%;height:100%">
				  </div>
			     </div>
				 
				    <div  style="width: 225px;height: 24px;background-color: #171717;position: relative">
					<div style="width:60px;height:22px;line-height:22px;color:#EEEEEE;font-size: 12px;cursor: pointer;text-align:center;background:#434343;border:1px solid #404040">单色</div>
					</div>
					
					<div style="background:#434343;">
				
					<div class="flexbox-fix" style="display: flex;height:70px">
						<div class="flexbox-fix colorpicker-inputWrap" style="width:100%;height:100%;display: flex;position:relative">
						<div class='nowclass' style="width:20px;height:20px;background:black;border-radius:4px;position:absolute;left:10px;top:10px;z-index:2">
						
						</div>
						<img src='./colorimg/color.png'  style="width:20px;height:20px;border-radius:5px;position:absolute;left:10px;top:10px;z-index:1">
						
						<span style='position:absolute;left:50px;top:10px;color:#eeeeee;font-size:12px'>HEX：</span>
						<input  class='hex' style='border:none;position:absolute;color:#eeeeee;font-size:12px;width:80px;height:20px;background:#171717;left:90px;top:10px;box-sizing: content-box;padding:0' value='#000000'/>		
						 <img src = './colorimg/xq.png' style="width:22px;height:22px;position:absolute;top:43px;left:10px;cursor:pointer;display:none"  class='xq'>
						 <span style='position:absolute;left:50px;top:43px;color:#eeeeee;font-size:12px'>R：</span>
						 <input class='r'  style='border:none;position:absolute;color:#eeeeee;font-size:12px;width:30px;height:20px;background:#171717;left:68px;top:43px;box-sizing: content-box;padding:0' value='0'/>		
						 <span style='position:absolute;left:110px;top:43px;color:#eeeeee;font-size:12px'>G：</span>
						  <input class='g' style='border:none;position:absolute;color:#eeeeee;font-size:12px;width:30px;height:20px;background:#171717;left:128px;top:43px;box-sizing: content-box;padding:0' value='0'/>	
							<span style='position:absolute;left:170px;top:43px;color:#eeeeee;font-size:12px'>B：</span>
						 <input class='b' style='border:none;position:absolute;color:#eeeeee;font-size:12px;width:30px;height:20px;background:#171717;left:188px;top:43px;box-sizing: content-box;padding:0' value='0'/>		
						</div>
					
					</div>
					<div style="width:215px;height:25px;position:relative">
					<span style='position:absolute;left:11px;top:5px;color:#eeeeee;font-size:12px'>颜色选择器</span>
					<div  style="width:62px;height:23px;position:absolute;right:0px;top:3px;background:#282828;overflow:hidden;border:1px solid #333333">
						<div  class='colorpie' style="height:100%;width:50%;float:left;position:relative;background:#434343;cursor:pointer">
						<img src='./colorimg/pie.png'  style="width:15px;height:15px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto">
						</div>
						<div  class='colordiv' style="height:100%;width:50%;float:left;background:#333333;position:relative;cursor:pointer">
						<img src='./colorimg/div.png'  style="width:15px;height:15px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto">
						</div>
					</div>
					</div>
					<div style='width:215px;height:130px;padding:10px 0px; padding-left:10px;display:block' class='color-palette'>
						${this.getPaletteColorsItem()}
					</div>
					
					<div class="colorpicker-pancel"  style=" position:relative;box-sizing: initial;display:none; width: 205px; font-family: Menlo;padding:10px;">
					
						<div style="width: 90%; padding-bottom: 80%; position: relative; border-radius: 4px; overflow: hidden;">
							<div class="color-pancel" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(${this.rgba.r},${this.rgba.g},${this.rgba.b})">
								<style>
									.saturation-white {background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));background: linear-gradient(to right, #fff, rgba(255,255,255,0));}
									.saturation-black {background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));background: linear-gradient(to top, #000, rgba(0,0,0,0));}
								</style>
								<div class="saturation-white" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">
									<div class="saturation-black" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">
									</div>
									<div class="pickerBtn" style="position: absolute; top: 0%; left: 100%; cursor: default;">
										<div style="width: 12px; height: 12px; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset; transform: translate(-6px, -6px);">
										</div>
									</div>
								</div>
							</div>
						</div>
			<div class="flexbox-fix" style="display: flex;align-items: center;height: 160px;width:10px;position:absolute; right:10px;top:13px">
					<div style="width:100%;height:100%;"><div style="height: 100%; position: relative;">
						<div style="position: absolute; top: 0px;right: 0px; bottom: 0px; left: 0px;">
							<div class="hue-horizontal" style="padding: 0px 2px; position: relative; height: 100%;">
								<style>
									.hue-horizontal {background: linear-gradient(to bottom, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);}
									.hue-vertical {background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,#0ff 50%, #00f 67%, #f0f 83%, #f00 100%);background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,#0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);}
								</style>
								<div  class="colorBar-color-picker" style="position: absolute; left: 5px !important;top:0%">
									<div style="width: 12px; height: 12px; border-radius: 6px; transform: translate(-6px, -1px); background-color: rgb(248, 248, 248); box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
					</div>
					<div style='width:205px;padding:10px;padding-top:0px;position:relative'>
					<div class='color-word' style='position:absolute; right:10px;top:0px;color:#fff;font-weight:bold;font-size:12px;text-decoration:underline'>${this.password}</div>
					<div class='colorBar-passbutton' style='width:160px;height:14px;background:url("./colorimg/color.png");border-radius:4px;position:relative'>
					<div   style="z-index:10;position: absolute; left: 160px;top:0px;width: 16px; height: 16px; border-radius: 6px; transform: translate(-6px, -1px); background-color: rgb(248, 248, 248); box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;"></div>
					<div class='passcolor' style='background: linear-gradient(to right,rgba(0, 0, 0, 0),rgb(0, 0, 0));position:absolute;width:160px;height:14px;border-radius:4px;'></div>
					</div>
				
				</div>
						<div style="width:215px;height:25px;position:relative"><span style='position:absolute;left:11px;top:5px;color:#eeeeee;font-size:12px'>历史记录</span></div>
						<div style='width:215px;height:42px;padding:10px 0px; padding-left:10px;padding-top:0px' class='color-palette1'>
							${this.historycolorItem()}
						</div>
			</div>`;
			return tpl;
		},
		getInputTpl: function () {
	
		},
		historycolorItem:function(){
			let str = ''
		this.historycolor.forEach(item => str += `<p style='width:20px;height:20px;background:${item};margin:3px 0px;margin-right:6px;border-radius: 4px;float:left'></p>`)
		return str;
		},
		getPaletteColorsItem: function () {
			let str = '';
			let palette = ["rgb(0, 0, 0)", "rgb(51, 51, 51)", "rgb(84, 84, 84)", "rgb(127, 127, 127)", "rgb(170, 170, 170)", "rgb(215, 215, 215)","rgb(242, 243, 242)",
				"rgb(255,255,255)", "rgb(236, 128, 141)", "rgb(248, 204, 145)", "rgb(255, 250, 128)", "rgb(201, 246, 130)", "rgb(125, 250, 251)",
				"rgb(129, 211, 249)", "rgb(128, 127, 253)", "rgb(194, 128, 255)", "rgb(255, 0, 255)", "rgb(219,57, 47)", "rgb(242, 154, 50)",
				"rgb(254, 247, 48)", "rgb(149, 243, 9)", "rgb(118, 249, 251)", "rgb(63, 167, 241)", "rgb(36, 74, 252)", "rgb(137, 81, 254)",
				"rgb(164, 41, 32)", "rgb(184, 115, 36)", "rgb(191, 192, 33)", "rgb(112, 182, 6)", "rgb(90, 192, 192)", "rgb(45,125, 180)",
				"rgb(103, 58, 191)", "rgb(110, 25, 17)", "rgb(123, 77, 19)", "rgb(128, 128, 17)", "rgb(104, 130, 63)","rgb(58, 129, 129)","rgb(28, 84, 120)","rgb(9, 33, 128)","rgb(67, 37, 128)"]
			palette.forEach(item => str += `<p style='width:20px;height:20px;background:${item};margin:3px 0px;margin-right:6px;border-radius: 4px;float:left'></p>`)
			return str;
		},
		
		setPosition(x, y) {
	       
			var LEFT = parseInt(x - this.pancelLeft -10),
				TOP = parseInt(y - this.pancelTop - 153);
			this.pointLeft = Math.max(0, Math.min(LEFT, this.pancel_width));
			this.pointTop = Math.max(0, Math.min(TOP, this.pancel_height));
			
			util.css(this.elem_picker, {
				left: this.pointLeft + "px",
				top: this.pointTop + "px"
			})
			this.hsb.s = parseInt(100 * this.pointLeft / this.pancel_width);
			this.hsb.b = parseInt(100 * (this.pancel_height - this.pointTop) / this.pancel_height);
               
				let color = ("#" + this.rgbToHex(this.rgba))
				this.current_mode = 'rgb'
                this.setColorByInput(color)
                $($(this.elem_wrap).find('.nowclass')).css({
                	"background":`rgba(`+this.rgba.r+','+this.rgba.g+','+this.rgba.b+','+this.rgba.a+')'
                })
				let inputs = this.elem_wrap.getElementsByTagName("input")
				inputs[0].value = 	("#" + this.rgbToHex(this.rgba));
				inputs[1].value = this.rgba.r;
				inputs[2].value = this.rgba.g;
				inputs[3].value = this.rgba.b;
			this.setShowColor();
			// this.setValue(this.rgba);

		},
		treecolor:function(rgb){
			  var reg=/(\d{1,3}),(\d{1,3}),(\d{1,3})/;
			    var arr=reg.exec(rgb);
			
			    function hex(x) {
			        return ("0" + parseInt(x).toString(16)).slice(-2);
			    }
				
			    var _hex="#" + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
			    return _hex.toUpperCase();
		},
	
		setcolorBar:function(elem,x,y){
			var elem_bar = elem.getElementsByTagName("div")[0],
			elem_word = elem.getElementsByTagName("div")[1],
		   rect = elem.getBoundingClientRect(),
		   elem_width = elem.offsetWidth,
		   X = Math.max(0, Math.min(x - rect.x,elem_width));
	   if (elem_bar === this.elem_barPicker1) {
		   util.css(elem_bar, {
			   left: X + "px"
		   });
		   this.hsb.h = parseInt(360 * X / elem_width);
	   } else {
		   util.css(elem_bar, {
			   left: X + "px"
		   });
	   }
	   this.rgba.a = parseFloat((X/elem_width).toFixed(2))
	   this.password = parseInt((X/elem_width)*100)+'%'
	   this.color_word.innerHTML = this.password
	   this.setPancelColor(this.hsb.h);
		   this.setShowColor();
				
		   var hex = '#' + this.rgbToHex(this.HSBToRGB(this.hsb));
		   let inputs = this.elem_wrap.getElementsByTagName("input")
		   if(this.firstcolor){
			   inputs[0].value = 	("#" + this.rgbToHex(this.rgba));
		   }
		   inputs[1].value = this.rgba.r;
		   inputs[2].value = this.rgba.g;
		   inputs[3].value = this.rgba.b;
	   $($(this.elem_wrap).find('.nowclass')).css({
		   "background":`rgba(`+this.rgba.r+','+this.rgba.g+','+this.rgba.b+','+this.rgba.a+')'
	   })
		   
	   
	   $($(this.elem_wrap).find('.passcolor')).css({
		   "background":`linear-gradient(to right,rgba(`+this.rgba.r+','+this.rgba.g+','+this.rgba.b+',0),rgba('+this.rgba.r+','+this.rgba.g+','+this.rgba.b+'))'
	   })
		   this.Opt.change(this.bindElem, hex,this.rgba);
		},
		setBar: function (elem, x,y) {
		
			var elem_bar = elem.getElementsByTagName("div")[0],
				rect = elem.getBoundingClientRect(),
				elem_heigth = elem.offsetHeight,
				Y = Math.max(0, Math.min(y - rect.y,elem_heigth));
		
			if (elem_bar === this.elem_barPicker1) {
				util.css(elem_bar, {
					top: Y + "px"
				});
				this.hsb.h = parseInt(360 * Y / elem_heigth);
			} else {
				util.css(elem_bar, {
					top: Y + "px"
				});
				// this.rgba.a = Y / elem_heigth;
			}
		       
			this.setPancelColor(this.hsb.h);
			this.setShowColor();
			this.setValue(this.rgba);
		},
		setPancelColor: function (h) {
			var rgb = this.HSBToRGB({ h: h, s: 100, b: 100 });

			util.css(this.elem_colorPancel, {
				background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')'
			});
		},
		setShowColor: function () {
			var rgb = this.HSBToRGB(this.hsb);

			this.rgba.r = rgb.r;
			this.rgba.g = rgb.g;
			this.rgba.b = rgb.b;
		},
		setValue: function (rgb) {
		},
		setColorByInput: function (value) {
			
			var _this = this;
			switch (this.current_mode) {
				case "hex":
					value = value.slice(1);
					if (value.length == 3) {
						value = '#' + value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
						this.hsb = this.hexToHsb(value);
					} else if (value.length == 6) {
						this.hsb = this.hexToHsb(value);
					}
					break;
				case 'rgb':
			}
			this.changeViewByHsb();
		},
		changeViewByHsb: function () {
			if(this.opt1.color.indexOf('#')<=-1){
				var a=this.opt1.color.match(/\d+(\.\d+)?/g)
				let r = {
					r:parseInt(a[0]),
					g:parseInt(a[1]),
					b:parseInt(a[2]),
					a:isNaN(parseFloat(a[3])) ? 1 : parseFloat(a[3])
				}
				this.password = parseInt(r.a*100) +'%';
				this.color_word.innerHTML = this.password
				var elem = this.elem_passbutton.getElementsByTagName("div")[0]
				util.css(elem, {
					left: (160*r.a) + "px"
				});
				this.rgba.a = parseFloat(r.a)
			
			}
			this.pointLeft = parseInt(this.hsb.s * this.pancel_width / 100);
			this.pointTop = parseInt((100 - this.hsb.b) * this.pancel_height / 100);
			util.css(this.elem_picker, {
				left: this.pointLeft + "px",
				top: this.pointTop + "px"
			});
         
			this.setPancelColor(this.hsb.h);
			this.setShowColor();
			util.css(this.elem_barPicker1, {
				
				top: this.hsb.h / 360 * (this.elem_barPicker1.parentNode.offsetHeight) + "px"
			});
                 
			var hex = '#' + this.rgbToHex(this.HSBToRGB(this.hsb));
			let inputs = this.elem_wrap.getElementsByTagName("input")
			if(this.firstcolor){
				inputs[0].value = 	("#" + this.rgbToHex(this.rgba));
			}
			inputs[1].value = this.rgba.r;
			inputs[2].value = this.rgba.g;
			inputs[3].value = this.rgba.b;
		$($(this.elem_wrap).find('.nowclass')).css({
			"background":`rgba(`+this.rgba.r+','+this.rgba.g+','+this.rgba.b+','+this.rgba.a+')'
		})
	
		
		$($(this.elem_wrap).find('.passcolor')).css({
			"background":`linear-gradient(to right,rgba(`+this.rgba.r+','+this.rgba.g+','+this.rgba.b+',0),rgba('+this.rgba.r+','+this.rgba.g+','+this.rgba.b+'))'
		})
			this.Opt.change(this.bindElem, hex,this.rgba);
		},
		switch_current_mode: function () {
			this.current_mode = this.current_mode == 'hex' ? 'rgb' : 'hex';
			this.getInputTpl()
			// this.elem_inputWrap.innerHTML = this.getInputTpl();
		},
		bindMove: function (elem, fn, bool) {
	     
			var _this = this;

			elem.addEventListener("mousedown", function (e) {
				_this.downX = e.pageX;
				_this.downY = e.pageY;
				bool ? fn.call(_this, _this.downX, _this.downY) : fn.call(_this, elem, _this.downX, _this.downY);
				

				document.addEventListener("mousemove", mousemove, false);
				function mousemove(e) {
					_this.moveX = e.pageX;
					_this.moveY = e.pageY;
					
					bool ? fn.call(_this, _this.moveX, _this.moveY) : fn.call(_this, elem, _this.moveX, _this.moveY);
					e.preventDefault();
				}
				document.addEventListener("mouseup", mouseup, false);
				function mouseup(e) {

					document.removeEventListener("mousemove", mousemove, false)
					document.removeEventListener("mouseup", mouseup, false)
				}
			}, false);
		},
		show: function () {
			util.css(this.elem_wrap, {
				"display": "block"
			})
		},
		hide: function () {
			util.css(this.elem_wrap, {
				"display": "none"
			})
			
		},
		HSBToRGB: function (hsb) {
			var rgb = {};
			var h = Math.round(hsb.h);
			var s = Math.round(hsb.s * 255 / 100);
			var v = Math.round(hsb.b * 255 / 100);

			if (s == 0) {
				rgb.r = rgb.g = rgb.b = v;
			} else {
				var t1 = v;
				var t2 = (255 - s) * v / 255;
				var t3 = (t1 - t2) * (h % 60) / 60;

				if (h == 360) h = 0;

				if (h < 60) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3 }
				else if (h < 120) { rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3 }
				else if (h < 180) { rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3 }
				else if (h < 240) { rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3 }
				else if (h < 300) { rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3 }
				else if (h < 360) { rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3 }
				else { rgb.r = 0; rgb.g = 0; rgb.b = 0 }
			}

			return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
		},
		rgbToHex: function (rgb) {
			var hex = [
				rgb.r.toString(16),
				rgb.g.toString(16),
				rgb.b.toString(16)
			];
			hex.map(function (str, i) {
				if (str.length == 1) {
					hex[i] = '0' + str;
				}
			});

			return hex.join('');
		},
		hexToRgb: function (hex) {
			var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
			return { r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF) };
		},
		hexToHsb: function (hex) {
			return this.rgbToHsb(this.hexToRgb(hex));
		},
		rgbToHsb: function (rgb) {
			var hsb = { h: 0, s: 0, b: 0 };
			var min = Math.min(rgb.r, rgb.g, rgb.b);
			var max = Math.max(rgb.r, rgb.g, rgb.b);
			var delta = max - min;
			hsb.b = max;
			hsb.s = max != 0 ? 255 * delta / max : 0;
			if (hsb.s != 0) {
				if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
				else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
				else hsb.h = 4 + (rgb.r - rgb.g) / delta;
			} else hsb.h = -1;
			hsb.h *= 60;
			if (hsb.h < 0) hsb.h += 360;
			hsb.s *= 100 / 255;
			hsb.b *= 100 / 255;
			return hsb;
		}
	}

	Colorpicker.create = function (opt) {
		
		return new Colorpicker(opt)
	}

	window.Colorpicker = Colorpicker;
        document.body.onclick = function(e,event){
			
           let show = true
           let show1 = false
           let show2 = false
		   let div3
           for(let i1=0;i1<$('.mycolordiv').length;i1++){
               if($('.mycolordiv')[i1].style.display == 'block'){
                   show2 = true;
				   div3 = $('.mycolordiv')[i1]
                   break
               }
           }
		   
		   if($('iframe').length>0){
			if(document.getElementById('pie')!==null){
					for(let i1=0;i1<$(document.getElementById('pie').contentWindow.document.body).find('.mycolordiv').length;i1++){
						if($(document.getElementById('pie').contentWindow.document.body).find('.mycolordiv')[i1].style.display == 'block'){
							show2 = true;
							div3 = $(document.getElementById('pie').contentWindow.document.body).find('.mycolordiv')[i1]
							break
						}
				}
				}
				if(document.getElementById('line')!==null){
					for(let i1=0;i1<$(document.getElementById('line').contentWindow.document.body).find('.mycolordiv').length;i1++){
						if($(document.getElementById('line').contentWindow.document.body).find('.mycolordiv')[i1].style.display == 'block'){
							show2 = true;
							div3 = $(document.getElementById('line').contentWindow.document.body).find('.mycolordiv')[i1]
							break
						}
				}
				}
				if(document.getElementById('dash')!==null){
					for(let i1=0;i1<$(document.getElementById('dash').contentWindow.document.body).find('.mycolordiv').length;i1++){
						if($(document.getElementById('dash').contentWindow.document.body).find('.mycolordiv')[i1].style.display == 'block'){
							show2 = true;
							div3 = $(document.getElementById('dash').contentWindow.document.body).find('.mycolordiv')[i1]
							break
						}
				}
				}
				if(document.getElementById('barId')!==null){
					for(let i1=0;i1<$(document.getElementById('barId').contentWindow.document.body).find('.mycolordiv').length;i1++){
						if($(document.getElementById('barId').contentWindow.document.body).find('.mycolordiv')[i1].style.display == 'block'){
							show2 = true;
							div3 = $(document.getElementById('barId').contentWindow.document.body).find('.mycolordiv')[i1]
							break
						}
				}
			  }
			// for(let i2=0;i2<$('iframe').length;i2++){
			// 	console.log($($($('iframe')[i2]).find('prevObject')[0]))
			
			// }
	
			}  
			if(!e.path){
				return
			}
			for(let i=0;i<e.path.length;i++){
				if($(e.path[i]).attr('class') == 'colordiv mycolordiv'||$(e.path[i]).attr('id') =='nohide'){
					show = false;
					break;
				}
			}
           for(let i=0;i<e.path.length;i++){
               if($(e.path[i]).attr('class') == 'nocolor'){
                   show = true;
                   show1 = true
                   break;
               }
           }
		  
           if(show2){
               if(show){
               if(!show1){
                   let colorarr =  JSON.parse(localStorage.getItem('colorarr')) 
                   colorarr.unshift($(div3).find('.nowclass').css('backgroundColor'))
                   colorarr.pop()
                   localStorage.setItem("colorarr",JSON.stringify(colorarr))
               }
               $(div3).hide()
           }
           }

}
})()
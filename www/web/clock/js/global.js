window.onload = function () {


	/* 参数设置(默认) */
	windowOnTop = true;
	finishAutoRest = false;
	clockTime = 25;
	clockSRestTime = 5;
	clockLRestTime = 15;
	lRestInterval = 4;
	soundRemind = true;
	tick = false;
	soundTick = "../番茄时钟/audio/tick.mp3";
	soundMission = "../番茄时钟/audio/work.mp3";
	soundMissionDef = soundMission;
	soundRest = "../番茄时钟/audio/rest.mp3";
	soundRestDef = soundRest;
	position = null;
	miniBlack = false;
	desktopRemind = true;
	manualOperation = false;
	/* 参数设置结束 */


	/* 导航栏点击事件 */
	var oNav = document.getElementById("nav");
 	var oNavAs = oNav.getElementsByTagName("a");
 	var oPanle = document.getElementById("panle");
 	var oPanles = new Array();
 	for (var i = 0; i < oPanle.childNodes.length; i++) {
 		if (oPanle.childNodes[i].nodeType == 1 & i != 1) {
 			oPanles.push(oPanle.childNodes[i]);
 		}
 	}
 	for (var i = 0; i < oNavAs.length; i++) {
 		oNavAs[i].index = i;
 		oNavAs[i].onclick = function () {
 			for (var i = 0; i < oNavAs.length; i++) {
 				oNavAs[i].className = "";
 				this.className = "on";
 				oPanles[i].className = "hidden";
 				oPanles[this.index].className = "";
 			}
 		}	
 	}
 	/* 导航栏点击事件结束 */

 	
 	/* 设置界面设置菜单点击事件 */
 	var oSet = document.getElementById("set");
 	var oMenuBtns = oSet.getElementsByClassName("button");
 	var oMenuSet = document.getElementById("menu-set");
 	var oMenuSetPanles = new Array();
 	for (var i = 0; i < oMenuSet.childNodes.length; i++) {
 		if (oMenuSet.childNodes[i].nodeType == 1) {
 			oMenuSetPanles.push(oMenuSet.childNodes[i]);
 		}
 	}
 	for (var i = 0; i < oMenuBtns.length; i++) {
 		oMenuBtns[i].index = i;
 		oMenuBtns[i].onclick = function () {
 			for (var i = 0; i < oMenuBtns.length; i++) {
 				oMenuBtns[i].className = "button";
 				this.className = "button on";
 				oMenuSetPanles[i].className = "hidden";
 				oMenuSetPanles[this.index].className = "";
 			}
 		}
 	}
 	/* 设置界面设置菜单点击事件 */


 	/* 设置界面radio对象 */
 	function Radio(index, obj) {
 		this.index = index;
 		this.obj = obj;
 		this.obj.offsetLeft;
 		this.obj.style.left;
 	}
 	Radio.prototype = {
		constructor : Radio,
		Console : function () {
		},
		Initialize : function () {
			switch(this.index) {
				case 0 :
					if (windowOnTop) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
				case 1 :
					if (finishAutoRest) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
				case 2 : 
					if (soundRemind) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
				case 3 : 
					if (tick) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
				case 4 : 
					if (miniBlack) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
				case 5 : 
					if (desktopRemind) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
				case 6 : 
					if (manualOperation) {
						radioItem[this.index].obj.style.left = 0 + "px";
					} else {
						radioItem[this.index].obj.style.left = -50 + "px";
					}
					break;
			}
		},
		Set : function () {
			switch(this.index) {
				case 0 :
					if (this.obj.offsetLeft >= 0) {
						windowOnTop = false;
					} else {
						windowOnTop = true;
					}
					break;
				case 1 :
					if (this.obj.offsetLeft >= 0) {
						finishAutoRest = false;
					} else {
						if (!manualOperation) {
							finishAutoRest = true;
						} else {
							alert("不可与[手动模式]同时打开！");
							startMove(oRadiosUls[this.index], {left : -50});
						}
					}
					break;
				case 2 :
					if (this.obj.offsetLeft >= 0) {
						soundRemind = false;
					} else {
						soundRemind = true;
					}
					break;
				case 3 :
					if (this.obj.offsetLeft >= 0) {
						tick = false;
					} else {
						tick = true;
					}
					break;
				case 4 :
					if (this.obj.offsetLeft >= 0) {
						miniBlack = false;
					} else {
						miniBlack = true;
					}
					break;
				case 5 :
					if (this.obj.offsetLeft >= 0) {
						desktopRemind = false;
					} else {
						desktopRemind = true;
					}
					break;
				case 6 :
					if (this.obj.offsetLeft >= 0) {
						manualOperation = false;
					} else {
						if (!finishAutoRest) {
							manualOperation = true;
						} else {
							alert("不可与[点击完成时自动休息]同时打开！");
							startMove(oRadiosUls[this.index], {left : -50});
						}
					}
					break;
			}
		}
	}
	/* 设置界面radio对象 */


	/* 设置界面radio点击事件 */
 	var oRadios = oPanle.getElementsByClassName("radio");
 	var oRadiosUls = oPanle.getElementsByClassName("radio-ul");
	var radioItem = new Array();
	for (var i = 0; i < oRadiosUls.length; i++) {
		radioItem.push(new Radio(i, oRadiosUls[i]));
		radioItem[i].Initialize();
	}
 	for (var i = 0; i < oRadios.length; i++) {
 		(function (index) {
 			oRadios[index].index = index;
 			oRadios[index].onclick = function () {
 				radioItem[index].Console();
 				if (oRadiosUls[this.index].offsetLeft >= 0) {
 					startMove(oRadiosUls[this.index], {left : -50});
 				} else {
 					startMove(oRadiosUls[this.index], {left : 0});
 				}
 				radioItem[index].Set();
 			}
 		})(i)
 	}
 	/* 设置界面radio点击事件 */


 	/* 设置界面input */
 	var oSound = document.getElementById("sound");
 	var oUlSet = oSound.getElementsByTagName("ul")[1];
 	var oFileName = new Array();
 	var oFile = new Array();
 	var oDefault = new Array();
 	for (var i = 0; i < 2; i++) {
 		oFileName.push(oUlSet.getElementsByClassName("filename")[i]);
 		oFile.push(oUlSet.getElementsByClassName("file")[i]);
 		oDefault.push(oUlSet.getElementsByClassName("button-default")[i]);
 	}
 	
 	for (var i = 0; i < oFile.length; i++) {
 		(function (index) {
 			oFile[index].onchange = function () {
 				oFileName[index].innerHTML = oFile[index].value;
 				if (index == 0) {
 					soundMission = oFile[index].value;
 				} else {
 					soundRest = oFile[index].value;
 				}
 			}
 			oDefault[index].onclick = function () {
 				if (index == 0) {
 					oFileName[index].innerHTML = soundMissionDef.slice(8);
 					oFile[index].value = "";
 					soundMission = soundMissionDef;
 				} else {
 					oFileName[index].innerHTML = soundRestDef.slice(8);
 					oFile[index].value = "";
 					soundRest = soundRestDef;
 				}
 			}
 		})(i)
 	}

 	var oBase = document.getElementById("base");
 	var oBaseUl = oBase.getElementsByTagName("ul")[1];
 	var oBaseLiInput = new Array();
 	for (var i = 0; i < oBaseUl.childNodes.length; i++) {
 		if (i >= 5 && oBaseUl.childNodes[i].nodeType == 1) {
 			oBaseLiInput.push(oBaseUl.childNodes[i].getElementsByTagName("input")[0]);
 		} else {
 			continue;
 		}
 	}
 	for (var i = 0; i < oBaseLiInput.length; i++) {
 		(function (index) {
 			oBaseLiInput[index].onchange = function () {
 				switch(index) {
 					case 0 :
 						clockTime = oBaseLiInput[index].value;
 						break;
 					case 1 :
 						clockSRestTime = oBaseLiInput[index].value;
 						break;
 					case 2 :
 						clockLRestTime = oBaseLiInput[index].value;
 						break;
 					case 3 :
 						lRestInterval = oBaseLiInput[index].value;
 				}
 			}
 		})(i)
 	}
 	/* 设置界面input */


 	/* 新增任务界面点击事件 */
 	var oAddMission = document.getElementById("addMission");
 	var oAddMissionNavClose = document.getElementById("addMission-nav-close");
 	var oCount = document.getElementsByTagName("strong")[0];
 	var oCountValue;
 	var oAddMissionFootButtonConfirm = document.getElementById("addMission-foot-button-confirm");
 	var oMissionName = document.getElementById("missionName");
 	var oMissionNameValue;
 	var subOrAdd = function () {
 		document.getElementById("addMission-main-button-sub").onclick = function () {
   			if (parseInt(oCount.innerHTML) > 1) {
   				oCount.innerHTML = parseInt(oCount.innerHTML) - 1;
   			}
   		}
 		document.getElementById("addMission-main-button-add").onclick = function () {
   			oCount.innerHTML = parseInt(oCount.innerHTML) + 1;
   		}
 	}
 	subOrAdd();
 	oAddMission.onclick = function (e) {
		var e = e || window.event;
    	var elem = e.target || e.srcElement;
    	if (elem.id == "addMission-nav-close" || elem.id == "addMission-foot-button-cancel") {
   			oAddMission.className = "noClick";
   			oCount.innerHTML = 1;
   			oMissionName.value = "";
   			return;
   		}
   		if (elem.id == "addMission-main-button-sub" || elem.id == "addMission-main-button-add" || elem.id == "addMission-foot-button-confirm") {
   			return;
   		}
   		while(elem) {
   			if (elem.id == "addMission") {
   				if (oAddMission.className != "") {
   					oAddMission.className = "";
   				}
   				return;
   			} else {
   				elem = elem.parentNode;
   				oAddMission.className = "noClick";
   			}
   		}
 	}
 	/* 新增任务界面点击事件 */


 	/* 任务界面添加任务按钮的点击事件 */
 	var oMain = oPanles[0];
 	var oBtn = oMain.getElementsByTagName("div")[0];
 	oBtn.onclick = function () {
 		if (oAddMission.className != "") {
 			oAddMission.className = "";
 		}
 		var liTotalTime = document.getElementById("li-totalTime");
 		var liMissionTime = document.getElementById("li-missionTime");
 		var liRestTime = document.getElementById("li-restTime");
 		var t = parseInt(clockTime) + parseInt(clockSRestTime);
 		liTotalTime.innerHTML = t + "分钟";
 		liMissionTime.innerHTML = clockTime + "分钟";
 		liRestTime.innerHTML = clockSRestTime + "分钟";
 	}
 	/* 任务界面添加任务按钮的点击事件 */


 	/* js睡眠 */
 	function Sleep(time){
 	  for(var t = Date.now();Date.now() - t <= time;);
 	}
 	/* js睡眠 */


 	/* 播放提示音 */
 	au = document.createElement("audio");
 	au.preload="auto";
 	function PlaySound(src) {
 		au.src = src;
 		au.play();
 	}
 	/* 播放提示音 */


 	/* mission对象 */
 	function Mission(index, missionName, workTime, restTime, count) {
		this.index = index;
		this.missionName = missionName;
		this.workTime = workTime;
		this.restTime = restTime;
		this.workTime0 = workTime;
		this.restTime0 = restTime;
		this.count = count;
		this.beginTime = new Date('2016/11/11 00:00:00');
		this.endTime = new Date('2016/11/11 00:00:00');
		this.endTime.setSeconds(workTime);
		this.workLeftTime = parseInt((this.endTime.getTime() - this.beginTime.getTime()) / 1000);
		this.endTime.setSeconds(restTime);
		this.restLeftTime = parseInt((this.endTime.getTime() - this.beginTime.getTime()) / 1000);
		this.finishCount = 0;
		this.isWorking = true;  //任务工作或休息标志
		this.oSpan1;
		this.oSpan2;
		this.oSpan3;
		this.oSpan4;
		this.oSpan5;
		working = false;  //计时状态标志
		SetTime = function (obj) {
	 		if (obj.isWorking) {  //任务工作中
	 			if (manualOperation && obj.restLeftTime < 0) {
	 				obj.oSpan2.style.display = "none";
	 				obj.oSpan3.style.display = "none";
	 				obj.oSpan4.style.display = "none";
	 				obj.oSpan6.style.display = "none";
	 				obj.oSpan7.style.display = "inline-block";
	 				obj.oSpan7.onclick = function () {
	 					working = true;
	 					obj.restLeftTime = obj.restTime;
	 					obj.oSpan2.style.display = "inline-block";
	 					obj.oSpan3.style.display = "inline-block";
	 					obj.oSpan4.style.display = "none";
	 					obj.oSpan6.style.display = "none";
	 					obj.oSpan7.style.display = "none";
	 					SetTime(obj);
	 				}
	 				return;
	 			}
				obj.workLeftTime--;  //工作剩余时间减一
				if (obj.workLeftTime < 0) {  //工作剩余时间小于0，即工作结束
		 			if (soundRemind) {
		 				PlaySound(soundMission);
		 			}
			 		clearTimeout(timekeeper);
		 			obj.finishCount++;
		 			obj.oSpan1.innerHTML = obj.finishCount + "/" + obj.count;
		 			obj.restLeftTime = obj.restTime;
		 			obj.isWorking = false;  //任务工作结束，进入任务休息
		 			if (manualOperation) {
		 				working = false;
		 			}
		 			obj.oSpan2.style.display = "none";
		 			obj.oSpan3.style.display = "none";
		 			obj.oSpan4.style.display = "inline-block";
	 			}
	 		} else {  //任务休息，this.isWorking == false;
	 			if (manualOperation && !working) {  //如果设置了手动模式
					clearTimeout(timekeeper);
					obj.oSpan2.style.display = "none";
					obj.oSpan3.style.display = "none";
					obj.oSpan4.style.display = "none";
					obj.oSpan6.style.display = "inline-block";
					obj.oSpan6.onclick = function () {
						working = true;
						obj.oSpan2.style.display = "inline-block";
						obj.oSpan3.style.display = "inline-block";
						obj.oSpan6.style.display = "none";
						SetTime(obj);
					}
					return;
				}
				obj.restLeftTime--;  //休息剩余时间减一
		 		if (obj.restLeftTime < 0) {  //休息时间小于0，即休息结束
		 			if (soundRemind) {
		 				PlaySound(soundRest);
		 			}
			 		if (obj.finishCount == obj.count) {  //完成了指定任务次数
			 			clearTimeout(timekeeper);
			 			obj.oSpan2.style.display = "none";
			 			obj.oSpan3.style.display = "none";
			 			obj.oSpan4.style.display = "none";
			 			obj.oSpan5.style.display = "inline-block";
			 			oH1.innerHTML = "番茄计时器";
			 			working = false;  //计时器停止工作
			 			return;
			 		} else {  //尚未完成指定的任务次数，转入下一次工作计时
				 		clearTimeout(timekeeper);
				 		obj.workLeftTime = obj.workTime;  //重置工作时间
				 		obj.isWorking = true;  //任务工作中
				 		obj.oSpan2.style.display = "inline-block";
			 			obj.oSpan3.style.display = "inline-block";
			 			obj.oSpan4.style.display = "none";
			 			if (manualOperation) {
			 				working = false;
			 			}
			 			this.oSpan2.getElementsByTagName("i")[0].innerHTML = "&#xe602;";  //完成按钮
			 			this.oSpan2.nextSibling.getElementsByTagName("i")[0].innerHTML = "&#xe62e;";  //停止按钮
			 			this.oSpan2.nextSibling.className = "span3";
			 		}
		 		}
	 		}
	 		obj.ShowTime();
		 	console.count();
	 		timekeeper = setTimeout(function () {
		 		SetTime(obj);
		 	}, 1000);
	 	}
	}

	Mission.prototype = {
		constructor : Mission,
		GetMissionName : function () {
			return this.missionName;
		},
		GetIndex : function () {
			return this.index;
		},
		SetWorkTime : function () {
			this.endTime.setSeconds(this.workTime);
			this.workLeftTime = parseInt((this.endTime.getTime() - this.beginTime.getTime()) / 1000);
		},
		SetRestTime : function () {
			this.endTime.setSeconds(this.restTime);
			this.restLeftTime = parseInt((this.endTime.getTime() - this.beginTime.getTime()) / 1000);
		},
		GetCount : function () {
			return this.count;
		},
		GetWorkTime : function () {
			return this.workTime;
		},
		GetRestTime : function () {
			return this.restTime;
		},
		CreateMissionList : function () {
			var oUl = document.createElement("ul");
			var oLi = document.createElement("li");
			var oSpan1 = document.createElement("span");
			oSpan2 = document.createElement("span");
			oSpan3 = document.createElement("span");
			var oSpan4 = document.createElement("span");
			var oSpan5 = document.createElement("span");
			var oSpan6 = document.createElement("span");
			var oSpan7 = document.createElement("span");
			this.oSpan1 = oSpan1;
			this.oSpan2 = oSpan2;
			this.oSpan3 = oSpan3;
			this.oSpan4 = oSpan4;
			this.oSpan5 = oSpan5;
			this.oSpan6 = oSpan6;
			this.oSpan7 = oSpan7;
			var oStrong = document.createElement("strong");
			var oSpan2A = document.createElement("a");
			var oSpan3A = document.createElement("a");
			var oSpan6A = document.createElement("a");
			var oSpan7A = document.createElement("a");
			var oSpan2I = document.createElement("i");
			var oSpan3I = document.createElement("i");
			var oSpan4I = document.createElement("i");
			var oSpan5I = document.createElement("i");
			var oSpan6I = document.createElement("i");
			var oSpan7I = document.createElement("i");
			var oDiv = document.createElement("div");
			oSpan1.innerHTML = this.finishCount + "/" + this.count;
			if (oMissionName.value) {
				oStrong.innerHTML = oMissionName.value;
			} else {
				oStrong.innerHTML = oMissionName.placeholder;
			}
			oSpan2I.className = "iconfont";
			oSpan3I.className = "iconfont";
			oSpan4I.className = "iconfont";
			oSpan5I.className = "iconfont";
			oSpan6I.className = "iconfont";
			oSpan7I.className = "iconfont";
			oSpan2I.innerHTML = "&#xe609;";  //开始按钮
			oSpan3I.innerHTML = "&#xe636;";  //删除按钮
			oSpan4I.innerHTML = "&#xe64b; 休息一下!";  //时钟按钮
			oSpan5I.innerHTML = "&#xe602; 任务完成!";  //完成按钮
			oSpan6I.innerHTML = "&#xe64b; 休息一下!";  //时钟按钮
			oSpan7I.innerHTML = "&#xe64b; 任务继续!";  //时钟按钮
			oSpan1.className = "span1";
			oSpan2.className = "span2";
			oSpan4.className = "span4";
			oSpan5.className = "span5";
			oSpan6.className = "span6";
			oSpan7.className = "span7";
			oSpan2A.appendChild(oSpan2I);
			oSpan3A.appendChild(oSpan3I);
			oSpan6A.appendChild(oSpan6I);
			oSpan7A.appendChild(oSpan7I);
			oSpan2.appendChild(oSpan2A);
			oSpan3.appendChild(oSpan3A);
			oSpan4.appendChild(oSpan4I);
			oSpan5.appendChild(oSpan5I);
			oSpan6.appendChild(oSpan6A);
			oSpan7.appendChild(oSpan7A);
			oDiv.appendChild(oSpan1);
			oDiv.appendChild(oSpan2);
			oDiv.appendChild(oSpan3);
			oDiv.appendChild(oSpan4);
			oDiv.appendChild(oSpan5);
			oDiv.appendChild(oSpan6);
			oDiv.appendChild(oSpan7);
			oLi.appendChild(oStrong);
			oLi.appendChild(oDiv);
			oUl.appendChild(oLi);
			oDivMissionList.appendChild(oUl);
			oCount.innerHTML = 1;
   			oMissionName.value = "";
			oAddMission.className = "noClick";
		},
		ShowTime : function () {
			missionWorkTimeM = parseInt(this.workLeftTime / 60);
			missionWorkTimeS = parseInt(this.workLeftTime % 60);
			missionRestTimeM = parseInt(this.restLeftTime / 60);
			missionRestTimeS = parseInt(this.restLeftTime % 60);
		 	oH1 = document.getElementsByTagName("h1")[0];
		 	if (this.isWorking) {
		 		if (missionWorkTimeM < 10 && missionWorkTimeM.toString().length < 2) {
		 			missionWorkTimeM = "0" + missionWorkTimeM;
		 		}
		 		if (missionWorkTimeS < 10 && missionWorkTimeS.toString().length < 2) {
		 			missionWorkTimeS = "0" + missionWorkTimeS;
		 		}
		 		oH1.innerHTML = missionWorkTimeM + "  :  " + missionWorkTimeS;
		 	} else {
		 		if (missionRestTimeM < 10 && missionRestTimeM.toString().length < 2) {
		 			missionRestTimeM = "0" + missionRestTimeM;
		 		}
		 		if (missionRestTimeS < 10 && missionRestTimeS.toString().length < 2) {
		 			missionRestTimeS = "0" + missionRestTimeS;
		 		}
		 		oH1.innerHTML = missionRestTimeM + "  :  " + missionRestTimeS;
		 	}
		 	if (tick) {
		 		PlaySound(soundTick);
		 	}
		},
		EventStart : function () {
			var that = this;
			this.oSpan2.onclick = function () {
				var oParent = this.parentNode.parentNode.parentNode;
				var innerText = "\&#x" + escape(this.getElementsByTagName("i")[0].innerHTML).slice(2).toLowerCase() + ";";
				if (!working) {  //如果不是在工作状态，即按钮显示为开始按钮
					if (innerText == "&#xe609;") {  //开始按钮
						this.getElementsByTagName("i")[0].innerHTML = "&#xe602;";  //完成按钮
						SetTime(that);
					}
					this.nextSibling.getElementsByTagName("i")[0].innerHTML = "&#xe62e;";  //停止按钮
					this.nextSibling.className = "span3";
					working = true;  //设置为工作状态
				} else {  //如果正在工作状态，即按钮显示为完成按钮，点击了完成按钮
					console.log("tick is onclick!!!");
					clearTimeout(timekeeper);
					if (that.finishCount < that.count) {  //如果未完成指定任务次数
						console.log("finishCount : " + that.finishCount);
						console.log("count : " + that.count);
						this.getElementsByTagName("i")[0].innerHTML = "&#xe609;";  //开始按钮
						this.nextSibling.getElementsByTagName("i")[0].innerHTML = "&#xe636;";  //删除按钮
						this.nextSibling.className = "";
						that.workLeftTime = that.workTime;
						that.restLeftTime = that.restTime;
						if (finishAutoRest) {  //如果设置了点击完成自动休息功能
							that.workLeftTime = -1;
							SetTime(that);
						} else {  //否则
							that.finishCount ++;
							that.oSpan1.innerHTML = that.finishCount + "/" + that.count;
							if (that.finishCount == that.count) {
								if (soundRemind) {
									PlaySound(soundRest);
								}
								that.oSpan2.style.display = "none";
								that.oSpan3.style.display = "none";
								that.oSpan4.style.display = "none";
								that.oSpan5.style.display = "inline-block";
								oH1.innerHTML = "番茄计时器";
							} else {
								that.ShowTime();
							}
						}
					} else {  //完成指定次数任务
						console.log("完成指定次数任务！！");
						that.finishCount ++;
						that.oSpan1.innerHTML = that.finishCount + "/" + that.count;
						if (finishAutoRest) {
						console.log("打开自动休息！！");
							that.workLeftTime = -1;
							SetTime(that);
						} else {
							console.log("没有打开自动休息！！");
							that.oSpan2.style.display = "none";
							that.oSpan3.style.display = "none";
							that.oSpan4.style.display = "none";
							that.oSpan5.style.display = "inline-block";
							oH1.innerHTML = "番茄计时器";
						}
					}
					working = false;
				}
			}
		},
		EventStop : function () {
			var that = this;
		 	oSpan3.onclick = function () {
				var oParent = this.parentNode.parentNode.parentNode;
				var innerText = "\&#x" + escape(this.getElementsByTagName("i")[0].innerHTML).slice(2).toLowerCase() + ";";
				if (innerText == "&#xe62e;") {  //停止按钮
					this.className = "";
					this.previousSibling.getElementsByTagName("i")[0].innerHTML = "&#xe609;";
					this.getElementsByTagName("i")[0].innerHTML = "&#xe636;";  //垃圾桶
					clearTimeout(timekeeper);
					that.workLeftTime = that.workTime;
					that.restLeftTime = that.restTime;
					working = false;
				} else {  //删除按钮
					oDivMissionList.removeChild(oParent);
					if (oDivMissionList.childNodes.length == 0) {
						oH1.innerHTML = "番茄计时器";
					}
					clearTimeout(timekeeper);
					that.workLeftTime = that.workTime;
					that.restLeftTime = that.restTime;
				}
			}
		},
	}
	/* mission对象 */


	/* 新增任务界面确定按钮点击事件 */
 	var missionIndex = 0;
 	var missionItem = new Array();
 	oAddMissionFootButtonConfirm.onclick = function () {
 		if (oMissionName.value == "") {
		 	oMissionNameValue = oMissionName.placeholder;
		} else {
			oMissionNameValue = oMissionName.value;
		}
		oCountValue = parseInt(oCount.innerHTML);
 		missionItem.push(new Mission(missionIndex, oMissionNameValue, clockTime, clockSRestTime, oCountValue));
 		if (!document.getElementById("missionList")) {
	 		oDivMissionList = document.createElement("div");
			oDivMissionList.id = "missionList";
			oMain.appendChild(oDivMissionList);
 		}
 		missionItem[missionIndex].CreateMissionList();
 		missionItem[missionIndex].ShowTime();
 		missionItem[missionIndex].EventStart();
 		missionItem[missionIndex].EventStop();


		missionIndex ++;
 	}
 	/* 新增任务界面确定按钮点击事件 */
}

/**
 * 获得指定类名的元素
 * @param  {DOM} parent 指定类名元素的父节点
 * @param  {String} child  指定的类名
 * @return {Array}        指定类名的元素组成的数组
 */
 function getByClassName(parent, child) {
 	var allTag = parent.getElementsByTagName('*');
 	var tarClass = new Array();
 	for (var i = 0; i < allTag.length; i++) {
 		if (allTag[i].className == child) {
 			tarClass.push(allTag[i]);
 		}
 	}
 	return tarClass;
 }

 /* 运动框架 */

/**
 * 获取元素样式
 * @param  {[type]} obj  元素对象
 * @param  {[type]} attr 样式
 * @return {[type]}      [description]
 */
 function getStyle(obj, attr) {
 	if (obj.currentStyle) {
 		return obj.currentStyle[attr];
 	} else {
 		return getComputedStyle(obj, null)[attr];
 	}
 }

/**
 * 运动框架
 * @param  {[type]} obj  运动对象
 * @param  {[type]} json 运动值对
 * @param  {[type]} fun  运动完成后执行的函数
 * @return {[type]}      [description]
 */
 function startMove(obj, json, fun) {
 	var finishFlag = true;
 	clearInterval(obj.timer);
 	obj.timer = setInterval(function() {
 		flag = true;
 		var speed = 0,
 		currStyle = null;
 		for (var attr in json) {
 			if (attr == 'opacity') {
 				var isOpacity = true;
 				currStyle = Math.round(parseFloat(getStyle(obj, attr)) * 100);
 			} else {
 				currStyle = parseInt(getStyle(obj, attr));
 			}
 			speed = (json[attr] - currStyle) / 8;
 			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
 			if (currStyle != json[attr]) {
 				finishFlag = false;
 			}
 			if (isOpacity) {
 				obj.style.filter = 'alpha(opacity:' + (currStyle + speed) + ')';
 				obj.style[attr] = (currStyle + speed) / 100;
 			} else {
 				obj.style[attr] = currStyle + speed + 'px';
 			}
 			if (finishFlag) {
 				clearInterval(obj.timer);
 				if (fun) {
 					fun();
 				}
 			}
 		}
 	}, 30);
 }

 /* 运动框架结束 */
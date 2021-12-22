(function () {
  //   <li class="li" onmouseover="showTips(event,'粘贴')" id="paste" title="粘贴" onclick='paste()'>
  //   <div>
  //     <i class="iconfont iconjiechuqunzu li-svgIcon" ></i>
  //   </div>
  // </li>
  // <li class="li" onmouseover="showTips(event,'剪切')" id="cut" title="剪切" onclick='cut()'>
  //   <div>
  //     <i class="iconfont iconjiechuqunzu li-svgIcon" ></i>
  //   </div>
  // </li>
    let zoom = localStorage.getItem('percentage') ? JSON.parse(localStorage.getItem('percentage')) : '100%'
    let html = ` 
      <div id='coverol' style="position:fixed;width:100%;height:100%;z-index:998;display:none;" onclick="hidecover()"></div>
      <ul class="ul" style="float:left;width:auto;clear:none;width:62%;overflow-x: auto;overflow-y: hidden;">
      <li class="line"></li>
      <li class="first" style="line-height:1">
        <span class="name">编辑看板</span>
        <div onclick='olclick()' style="background:#F5F8FB;border:1px solid #E4E8ED;display:inline-block;width: 75px;height: 25px;line-height:25px;cursor:pointer;position:relative">
         <span class='viewpass'>${zoom}</span>
         <ol class='select-pass'>
         <li name ='200%' class="${zoom === '200%' ? 'selected' : '' }" onclick='olloclick(this,event)'>200%</li>
         <li name ='175%' class="${zoom === '175%' ? 'selected' : '' }" onclick='olloclick(this,event)'>175%</li>
         <li name ='150%' class="${zoom === '150%' ? 'selected' : '' }" onclick='olloclick(this,event)'>150%</li>
         <li name ='125%' class="${zoom === '125%' ? 'selected' : '' }" onclick='olloclick(this,event)'>125%</li>
         <li name ='100%' class="${zoom === '100%' ? 'selected' : '' }" onclick='olloclick(this,event)'>100%</li>
         <li name = '75%' class="${zoom === '75%' ? 'selected' : '' }" onclick='olloclick(this,event)'>75%</li>
         <li name = '50%' class="${zoom === '50%' ? 'selected' : '' }" onclick='olloclick(this,event)'>50%</li>
         <li name = '25%' class="${zoom === '25%' ? 'selected' : '' }" onclick='olloclick(this,event)'>25%</li>
         <li name = '10%' class="${zoom === '10%' ? 'selected' : '' }" onclick='olloclick(this,event)'>10%</li>
         </ol>      
        </div>
      </li>
  
      <li class="line"></li>
      <li class="li" onmouseover="showTips(event,'复制')" id="copy" title="复制" onclick='copy()'>
        <div>
          <i class="iconfont iconfuzhi li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'粘贴')" id="paste" title="粘贴" onclick='paste()'>
        <div>
          <i class="iconfont iconniantie li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'剪切')" id="cut" title="剪切" onclick='cut()'>
        <div>
          <i class="iconfont iconjianqie li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'撤销')" id="goback" title="撤销" onclick='goback()'>
        <div>
          <i class="iconfont iconshangyibu li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'恢复')" id="backgo" title="恢复" onclick='backgo()'>
        <div>
          <i class="iconfont iconxiayibu li-svgIcon" ></i>
        </div>
      </li> 
      `
      html += `<li class="line"></li>
      <li class="li" onmouseover="showTips(event,'顶层')" id="buttonztop" title="顶层" onclick='buttonztop()'>
        <div>
          <i class="iconfont iconzhiyudingceng li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'底层')" id="buttonzbottom" title="底层" onclick='buttonzbottom()'>
        <div>
          <i class="iconfont iconzhiyudiceng li-svgIcon" ></i>
        </div>
      </li>  
      <li class="li" onmouseover="showTips(event,'上移一层')" id="onetop" title="上移一层" onclick='onetop()'>
      <div>
        <i class="iconfont iconshangyiceng li-svgIcon" ></i>
      </div>
    </li>
    <li class="li" onmouseover="showTips(event,'下移一层')" id="onebottom" title="下移一层" onclick='onebottom()'>
      <div>
        <i class="iconfont iconxiayiceng li-svgIcon" ></i>
      </div>
    </li> 
      <li class="li" onmouseover="showTips(event,'左对齐')" id="buttonleft" title="左对齐" onclick='buttonleft()'>
        <div>
          <i class="iconfont iconzuoduiqi li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'右对齐')" id="buttonright" title="右对齐" onclick='buttonright()'>
        <div>
          <i class="iconfont iconyouduiqi li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'顶部对齐')" id="buttontop" title="顶部对齐" onclick='buttontop()'>
        <div>
          <i class="iconfont icondingduiqi li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'底部对齐')" id="buttonbottom" title="底部对齐" onclick='buttonbottom()'>
        <div>
          <i class="iconfont icondiduiqi li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'水平居中')" id="buttonlevel" title="水平居中" onclick='buttonlevel()'>
        <div>
          <i class="iconfont iconshuipingduiqi li-svgIcon" ></i>
        </div>
      </li> 
      <li class="li" onmouseover="showTips(event,'垂直居中')" id="buttonvertical" title="垂直居中" onclick='buttonvertical()'>
        <div>
          <i class="iconfont iconjuzhongduiqi li-svgIcon" ></i>
        </div>
      </li>
      <li class="li" onmouseover="showTips(event,'垂直分布')" id="verticaldistribution" title="垂直分布" onclick='verticaldistribution()'>
        <div>
        <i class="iconfont iconshuipingfenbu li-svgIcon" ></i>
        </div>
      </li> 
      <li class="li" onmouseover="showTips(event,'水平分布')" id="leveldistribution" title="水平分布" onclick='leveldistribution()' >
        <div>
          
          <i class="iconfont iconchuizhifenbu li-svgIcon" ></i>
        </div>
      </li> 
      
    
      <li class="line line1"></li> 
      </ul>
      <ul id="funcBtns" style="float:right;padding-left:0px;width:auto;clear:none;max-width:35%;overflow-x: auto;overflow-y: hidden;"> 
        <li style="display:none" onmouseover="showTips(event,'')"  id="topRestore" class="li btns-li" onclick='restore()'>
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>恢复</span></button>
        </li>  
        <li class="li btns-li" onclick='openReuse()'>
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>复用</span></button>
        </li> 
        <li  class="li btns-li" style="width:78px" onclick="setPanelFunc()">
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>看板设置</span></button>
        </li> 
        <li  class="li btns-li" onclick="preview()">
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>预览</span></button>
        </li>
        <li  class="li btns-li" id="btn-saveAs" style="width: 63px" >
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>另存为</span></button>
        </li >
        <li  class="li btns-li" id="btn-save">
        <div id="saveBtnTips" style="position: absolute;width: 39px;height: 15px;top:-7px;right: -18px;z-index: 23;display:none;" ><img src="./imgs/newData.png" style="width:100%"/></div>
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存</span></button>
        </li>  
        <li class="li btns-li" id="btn-savePublish" style="width: 90px">
          <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存并发布</span></button>
        </li>  
        <li class="li something"><img src="./images/gengduo@2x.png" alt="">
          <div class="floattap">
          </div>
        </li>                     
      </ul>`
    let floathtml = `  <ul>
   
    <li class="li " onclick="save()"><img src="./images/保存@2x.png" alt="">
      <div class="word">保存</div>
    </li>
  <li class="li myimg" onclick="preview()" ><img src="./images/yulan.png" alt="">
    <div class="word">预览</div>
  </li> 
  <li class="li myimg"><img src="./images/shezhi.png" alt="">
  <div class="word">设置</div>
  </li> 
  <li class="li myimg" onclick='openReuse()' ><img src="./images/zhongfu.png" alt="">
  <div class="word">复用</div>
  </li>            
  <li class="line line1"></li> 
  <li class="li" onclick='verticaldistribution()'><img src="./images/chuizhifenbu@2x.png" alt="">
  <div class="word">垂直分布</div>
  </li> 
  <li class="li" onclick='leveldistribution()' ><img src="./images/shuipingfenbu@2x.png" alt="">
  <div class="word">水平分布</div>
  </li> 
  <li class="li" onclick='buttonvertical()'><img src="./images/zhongjianduiqi@2x.png" alt="">
  <div class="word">垂直居中</div>
  </li>
  <li class="li" onclick='buttonlevel()'><img src="./images/shuipingjuzhong@2x.png" alt="">
  <div class="word">水平居中</div>
  </li> 
  <li class="li" onclick='buttonbottom()'><img src="./images/dibuduiqi@2x.png" alt="">
  <div class="word">底部对齐</div>
  </li>
  <li class="li" onclick='buttontop()'><img src="./images/dingbuduiqi.png" alt="">
  <div class="word">顶部对齐</div>
  </li>
  <li class="li" onclick='buttonright()'><img src="./images/youduiqi@2x.png" alt="">
  <div class="word">右对齐</div>
  </li>
  <li class="li" onclick='buttonleft()'><img src="./images/zuoduiqi@2x.png" alt="">
  <div class="word">左对齐</div>
  </li>
  <li class="li" onclick='buttonzbottom()'><img src="./images/zhidi@2x.png" alt="">
  <div class="word">底层</div>
  </li>
  <li class="li" onclick='buttonztop()'><img src="./images/zhiding@2x.png" alt="">
  <div class="word">顶层</div>
  </li>
  <li class="line"></li>  
  <li class="li" onclick='backgo()'><img src="./images/huifu@2x.png" alt="">
  <div class="word">恢复</div>
  </li> 
  <li class="li" onclick='goback()'><img src="./images/chexiao@2x.png" alt="">
  <div class="word">撤销</div>
  </li>
  <li class="li" onclick='cut()'><img src="./images/jianqie@2x.png" alt="">
  <div class="word">剪切</div>
  </li>
  <li class="li" onclick='paste()'><img src="./images/zhantie@2x.png" alt="">
  <div class="word">粘贴</div>
  </li>
  <li class="li" onclick='copy()'><img src="./images/fuzhi@2x.png" alt="">
  <div class="word">复制</div>
  </li>
  </ul>`
    $('.page-tools').append(html)
    $('.floattap').append(floathtml)
    // renderFuncMore()
    
    var selectContainer = document.getElementById('canvas-wrap');
    var mouseOn = false;
    var tmp = []
  
    selectContainer.onmousedown = function (e) {
      for(let i1=0;i1<$('.mycolordiv').length;i1++){
        $('.mycolordiv')[i1].style.display='none'
  }
      if (e.buttons !== 1 || e.which !== 1) return;
      
      mouseStopId = setTimeout(function () {
        mouseOn = true;
  
        // 调整坐标原点为容器左上角
        startX = e.clientX - selectContainer.offsetLeft + selectContainer.scrollLeft;
        startY = e.clientY - selectContainer.offsetTop + selectContainer.scrollTop;
        var selDiv = document.createElement('div');
        selDiv.style.cssText = 'position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #eee;background-color:royalblue;z-index:1000;opacity:0.1;display:none;';
        selDiv.id = 'selectDiv';
        // 添加框选元素到容器内
        document.getElementById('canvas-wrap').appendChild(selDiv);
        selDiv.style.left = startX + 'px';
        selDiv.style.top = startY + 'px';
      }, 20);
      document.onmousemove = function (e) {
      
       
        // tmp = []
        if (!mouseOn) return;
        //   clearEventBubble(e);
        var selectContainer = document.getElementById('canvas-wrap');
        var _x = e.clientX - selectContainer.offsetLeft + selectContainer.scrollLeft;
        var _y = e.clientY - selectContainer.offsetTop + selectContainer.scrollTop;
        var _H = selectContainer.offsetWidth
        // 鼠标移动超出容器内部，进行相应的处理
        // 向右拖拽
        if (e.clientX > selectContainer.offsetLeft + selectContainer.offsetWidth) {
          let maxLeft = selectContainer.scrollWidth - selectContainer.offsetWidth
          let step = selectContainer.scrollLeft + 20
          if (step >= maxLeft) {
            selectContainer.scrollLeft = maxLeft
          } else {
            selectContainer.scrollLeft = step
           
          }
        }
        // 向左拖拽
        if (e.clientX < selectContainer.offsetLeft) {
          let minLeft = 0
          let step = selectContainer.scrollLeft - 20
          if (step <= minLeft) {
            selectContainer.scrollLeft = minLeft
          } else {
            selectContainer.scrollLeft = step
          }
        }
        var selDiv = document.getElementById('selectDiv');
        selDiv.style.display = 'block';
        selDiv.style.left = Math.min(_x, startX) + 'px';
        selDiv.style.top = Math.min(_y, startY) + 'px';
        if ((Math.min(_x, startX) + Math.abs(_x - startX)) <= selectContainer.scrollWidth) {
          selDiv.style.width = Math.abs(_x - startX) + 'px';
        }
        selDiv.style.height = Math.abs(_y - startY) + 'px';
        if (selDiv) {
          var fileDivs = $('.commonModule');
          var l = selDiv.offsetLeft;
          var t = selDiv.offsetTop;
          var w = selDiv.offsetWidth;
          var h = selDiv.offsetHeight;
          for (var i = 0; i < fileDivs.length; i++) {
            var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
            var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
            if (l <= fileDivs[i].offsetLeft && t <= fileDivs[i].offsetTop && sl <= l + w && st <= t + h) {
              if (tmp.indexOf(parseInt($(fileDivs[i]).attr('data-id'))) <= -1) {
                tmp.push(parseInt($(fileDivs[i]).attr('data-id')));
              }
  
            }
          }
        }
       
      };
      
  
      document.onmouseup = function (e) {
        document.onmousemove = null
        let save = []
        var selDiv = document.getElementById('selectDiv');
        if (selDiv) {
          var fileDivs = $('.commonModule');
          var l = selDiv.offsetLeft;
          var t = selDiv.offsetTop;
          var w = selDiv.offsetWidth;
          var h = selDiv.offsetHeight;
          for (var i = 0; i < fileDivs.length; i++) {
            var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
            var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
            if (l <= fileDivs[i].offsetLeft && t <= fileDivs[i].offsetTop && sl <= l + w && st <= t + h) {
              save.push(parseInt($(fileDivs[i]).attr('data-id')));
            }
          }
          save.sort((a, b) => {
            return tmp.indexOf(a) - tmp.indexOf(b)
          })
  
          if (save.length !== 0) {
            if (type !== 'ctrl') {
             setTimeout(() => {
              setClass(save)
             });
           
              
              if (save.length > 1) {
                // initCommon()
              } else {
                // initCommon()
                Controls.ControlList.forEach((item, itmei) => {
                  if (item.PropertyList.ZIndex == save[0]) {
                    let index = save[0]
                    let childItem = item
                    //echartType 判断单击是否重新渲染右侧图表
                    let echartType = ''
                    if (index) {
                      if ($('.r-input').val() == childItem.Name) {
                        echartType = 'init'
                      } else {
                        echartType = ''
                      }
                    }
                    rightCommon(childItem.title, childItem.Name, /* index */itmei)
                    
                    changeCommon({
                      ...childItem.PropertyList,
                      ControlType: childItem.ControlType
                    }, /* index */itmei, echartType)
  
                  }
                })
                // 
              }
            }
  
  
          }
          if (!mouseOn) return;
          //  clearEventBubble(e);
          mouseOn = false;
          $(selDiv).remove()
          tmp = []
        }
        // setTimeout(() => {
        //   $(".details").hide()
          
        // }, 300);
        
  
      };
      document.onmouseleave = function (e) {
        document.onmousemove = null
        let save = []
        var selDiv = document.getElementById('selectDiv');
        if (selDiv) {
          var fileDivs = $('.commonModule');
          var l = selDiv.offsetLeft;
          var t = selDiv.offsetTop;
          var w = selDiv.offsetWidth;
          var h = selDiv.offsetHeight;
          for (var i = 0; i < fileDivs.length; i++) {
            var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
            var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
            if (l <= fileDivs[i].offsetLeft && t <= fileDivs[i].offsetTop && sl <= l + w && st <= t + h) {
              save.push(parseInt($(fileDivs[i]).attr('data-id')));
            }
          }
          save.sort((a, b) => {
            return tmp.indexOf(a) - tmp.indexOf(b)
          })
  
          if (save.length !== 0) {
            if (type !== 'ctrl') {
              setClass(save)
              if (save.length > 1) {
                // initCommon()
                // $(".details").show()
                // $("#chart-list").hide()
              } else {
                // $(".details").hide()
                Controls.ControlList.forEach((item) => {
                  if (item.PropertyList.ZIndex == save[0]) {
                    let index = save[0]
                    let childItem = item
                    //echartType 判断单击是否重新渲染右侧图表
                    let echartType = ''
                    if (index) {
                      if ($('.r-input').val() == childItem.Name) {
                        echartType = 'init'
                      } else {
                        echartType = ''
                      }
                    }
                    rightCommon(childItem.title, childItem.Name, index)
  
                    changeCommon({
                      ...childItem.PropertyList,
                      ControlType: childItem.ControlType
                    }, index, echartType)
  
                  }
                })
                // 
                
              }
            }
  
  
          }
          if (!mouseOn) return;
          clearEventBubble(e);
          mouseOn = false;
          $(selDiv).remove()
          tmp = []
        }
  
      };
     
     
      if(e.path.length == 8){
        setTimeout(()=>{
          // selectdata = []
          // localdata.ControlList = []
          setClass()
          // initCommon()
          $(".details").hide()
          $("#chart-list").hide()
          
        })
       
       }
    }
  
    function clearEventBubble(e) {
      if (e.stopPropagation) e.stopPropagation();
      else e.cancelBubble = true;
  
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
    }
    //   置顶
    buttonztop = function () {
  
      let zIndex = 0;
      let index = []
      let indexarr = []
      let zindexarr1 = []
      let zindexarr2 = []
      localdata.ControlList.forEach((item, nowindex) => {
        zindexarr1.push(item.PropertyList.ZIndex)
  
      })
  
  
      Controls.ControlList.forEach((item) => {
        if (item.PropertyList.ZIndex > zIndex) {
          zIndex = item.PropertyList.ZIndex
        }
        zindexarr2.push(item.PropertyList.ZIndex)
      })
      zindexarr2 = zindexarr2.filter(item => {
        let id = zindexarr1.map(v => v)
        return !id.includes(item)
      })
      if (zindexarr2.length > 0) {
        if (Math.min(...zindexarr1) < Math.max(...zindexarr2)) {
          localdata.ControlList.forEach((item, nowindex) => {
            $(`.commonModule[data-id=${localdata.ControlList[nowindex].PropertyList.ZIndex}]`).remove()
          })
          localdata.ControlList.forEach((item, nowindex) => {
            let now = 0
            Controls.ControlList.forEach((item1, index1) => {
              if (item1.PropertyList.ZIndex == item.PropertyList.ZIndex) {
                now = index1
              }
            })
            let childItem = Controls.ControlList[parseInt(now)]
            childItem.PropertyList.ZIndex = zIndex + 1 + nowindex
            changeCommon({
              ...childItem.PropertyList,
              ControlType: childItem.ControlType
            }, parseInt(now))
            localdata.ControlList[nowindex].PropertyList.ZIndex = zIndex + 1 + nowindex
  
            indexarr.push(localdata.ControlList[nowindex].PropertyList.ZIndex)
  
          })
          childElement()
  
          setClass(indexarr)
        }
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
  
    }
    //   置底
    buttonzbottom = function () {
      let zIndex = 0;
      let index = []
      let indexarr = []
      let zindexarr1 = []
      let zindexarr2 = []
      localdata.ControlList.forEach((item, nowindex) => {
        zindexarr1.push(item.PropertyList.ZIndex)
  
      })
  
  
      Controls.ControlList.forEach((item) => {
        if (item.PropertyList.ZIndex < zIndex) {
          zIndex = item.PropertyList.ZIndex
        }
        zindexarr2.push(item.PropertyList.ZIndex)
      })
      zindexarr2 = zindexarr2.filter(item => {
        let id = zindexarr1.map(v => v)
        return !id.includes(item)
      })
      if (zindexarr2.length > 0) {
        if (Math.max(...zindexarr1) > Math.min(...zindexarr2)) {
  
          localdata.ControlList.forEach((item, nowindex) => {
            $(`.commonModule[data-id=${localdata.ControlList[nowindex].PropertyList.ZIndex}]`).remove()
          })
          localdata.ControlList.forEach((item, nowindex) => {
            let now = 0
            Controls.ControlList.forEach((item1, index1) => {
              if (item1.PropertyList.ZIndex == item.PropertyList.ZIndex) {
                now = index1
              }
            })
            let childItem = Controls.ControlList[parseInt(now)]
            childItem.PropertyList.ZIndex = zIndex - 1 - nowindex
            changeCommon({
              ...childItem.PropertyList,
              ControlType: childItem.ControlType
            }, parseInt(now))
            localdata.ControlList[nowindex].PropertyList.ZIndex = zIndex - 1 - nowindex
  
            indexarr.push(localdata.ControlList[nowindex].PropertyList.ZIndex)
  
          })
          childElement()
  
          setClass(indexarr)
        }
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  左对齐
    buttonleft = function () {
      let left = 9999999999999999999
      if (localdata.ControlList.length > 1) {
        left = localdata.ControlList[0].PropertyList.Left
        localdata.ControlList.forEach((item, index1) => {
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name) {
              localdata.ControlList[index1].PropertyList.Left = left;
              item1.PropertyList.Left = left;
              item.PropertyList.Left = left;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement()
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  上对齐
    buttontop = function () {
      let top = 9999999999999999999
      if (localdata.ControlList.length > 1) {
        top = localdata.ControlList[0].PropertyList.Top
        localdata.ControlList.forEach((item, index1) => {
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name) {
              localdata.ControlList[index1].PropertyList.Top = top;
              item1.PropertyList.Top = top;
              item.PropertyList.Top = top;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
  
  
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement()
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  右对齐
    buttonright = function () {
      let right = 9999999999999999999
      let width = 9999999999999999999
      if (localdata.ControlList.length > 1) {
        right = localdata.ControlList[0].PropertyList.Left
        width = localdata.ControlList[0].PropertyList.Width
        localdata.ControlList.forEach((item, index1) => {
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name && index1 !== 0) {
              let left = right + (width - item1.PropertyList.Width)
              item1.PropertyList.Left = left;
              item.PropertyList.Left = left;
              localdata.ControlList[index1].PropertyList.Left = left;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
  
  
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
  
        childElement()
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  下对齐
    buttonbottom = function () {
      let bottom = 9999999999999999999
      let height = 9999999999999999999
      if (localdata.ControlList.length > 1) {
        bottom = localdata.ControlList[0].PropertyList.Top
        height = localdata.ControlList[0].PropertyList.Height
        localdata.ControlList.forEach((item, index1) => {
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name && index1 !== 0) {
              let top = bottom + (height - item1.PropertyList.Height)
              item1.PropertyList.Top = top;
              item.PropertyList.Top = top;
              localdata.ControlList[index1].PropertyList.Top = top;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
  
  
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement()
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  水平对齐
    buttonlevel = function () {
      let bottom = 9999999999999999999
      let height = 9999999999999999999
      if (localdata.ControlList.length > 1) {
        bottom = localdata.ControlList[0].PropertyList.Top
        height = localdata.ControlList[0].PropertyList.Height
        let end = bottom + (height / 2)
        localdata.ControlList.forEach((item, index1) => {
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name && index1 !== 0) {
              let top = end - item1.PropertyList.Height / 2
              item1.PropertyList.Top = top;
              item.PropertyList.Top = top
              localdata.ControlList[index1].PropertyList.Top = top;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
  
  
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement()
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  垂直居中
    buttonvertical = function () {
      let right = 9999999999999999999
      let width = 9999999999999999999
      if (localdata.ControlList.length > 1) {
        right = localdata.ControlList[0].PropertyList.Left
        width = localdata.ControlList[0].PropertyList.Width
        let end = right + (width / 2)
        localdata.ControlList.forEach((item, index1) => {
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name && index1 !== 0) {
              let left = end - item1.PropertyList.Width / 2
              item1.PropertyList.Left = left;
              item.PropertyList.Left = left
              localdata.ControlList[index1].PropertyList.Left = left;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
  
  
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement()
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    //  水平分布
    leveldistribution = function () {
      let right = 0;
      let left = 99999999999;
      let width = 0;
      let core = 0;
      let start = 0;
      let end = 0;
      if (localdata.ControlList.length >= 3) {
        localdata.ControlList.forEach((item, index) => {
          item.PropertyList.max = item.PropertyList.Left + parseInt(item.PropertyList.Width)
        })
        localdata.ControlList.sort((a, b) => {
          return a.PropertyList.max - b.PropertyList.max;
        })
        localdata.ControlList.forEach((item, index) => {
          if (left >= item.PropertyList.Left) {
            left = item.PropertyList.Left
            start = index
          }
          width = width + parseInt(item.PropertyList.Width);
          if (right <= (item.PropertyList.Left + parseInt(item.PropertyList.Width))) {
            right = item.PropertyList.Left + parseInt(item.PropertyList.Width)
            end = index
          }
        })
        // left：最左侧的组件距离父元素的长度（不包括组件height）
        // right：最右侧的组件距离父元素的长度（包括组件height）
        core = right - left;
        let division = parseInt((core - width) / (localdata.ControlList.length - 1)) // 计算的水平分布组件上下间距
        let nowwidth = left
        localdata.ControlList.forEach((item, index1) => {
          // if(index1>=1){
          nowwidth += parseInt(item.PropertyList.Width)
          // }
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name && index1 !== start && index1 !== end) {
              let now = (index1) * division;
              let left1 = now + nowwidth - parseInt(item1.PropertyList.Width)
              if (left1 <= left) {
                left1 = left
              }
              item1.PropertyList.Left = left1;
              item.PropertyList.Left = left1
              localdata.ControlList[index1].PropertyList.Left = left1;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
  
  
            }
          })
          if (division <= 0) {
            nowwidth = left
          }
          // nowwidth = left
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement()
        setClass(tmp)
  
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    // 垂直分布
    verticaldistribution = function () {
      let bottom = 0;
      let top = 99999999999;
      let height = 0;
      let core = 0;
      let start = 0;
      let end = 0;
      if (localdata.ControlList.length >= 3) {
        localdata.ControlList.forEach((item, index) => {
          item.PropertyList.max = item.PropertyList.Top + parseInt(item.PropertyList.Height)
        })
        localdata.ControlList.sort((a, b) => {
          return a.PropertyList.max - b.PropertyList.max;
        })
        localdata.ControlList.forEach((item, index) => {
          if (top >= item.PropertyList.Top) {
            top = item.PropertyList.Top
            start = index
          }
          height = height + parseInt(item.PropertyList.Height);
          if (bottom <= (item.PropertyList.Top + parseInt(item.PropertyList.Height))) {
            bottom = item.PropertyList.Top + parseInt(item.PropertyList.Height)
            end = index
          }
        })
        // top：最上面的组件距离父元素的高度（不包括组件height）
        // bottom：最下面的组件距离父元素的高度（包括组件height）
        core = bottom - top;
        let division = parseInt((core - height) / (localdata.ControlList.length - 1))  // 计算的垂直分布组件上下间距
        let nowwidth = top
        localdata.ControlList.forEach((item, index1) => {
          nowwidth += parseInt(item.PropertyList.Height)
          Controls.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name && index1 !== start && index1 !== end) {
              let now = (index1) * division;
              let top1 = now + nowwidth - parseInt(item.PropertyList.Height)
              if (top1 <= top) {
                top1 = top
              }
              item1.PropertyList.Top = top1;
              item.PropertyList.Top = top1
              localdata.ControlList[index1].PropertyList.Top = top1;
              changeCommon({
                ...item1.PropertyList,
                ControlType: item1.ControlType
              }, index)
              childElement()
  
            }
          })
          if (division <= 0) {
            nowwidth = top
          }
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        setClass(tmp)
  
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    sort = function (a, b, c) {
      let arr = []
      a.forEach((item) => {
        if (c = 'top') {
          if (item.zindex > b) {
            arr.push(item)
          }
        } else if (c == 'bottom') {
          if (item.zindex < b) {
            arr.push(item)
          }
        }
      })
      if (c == 'top') {
        arr.sort((a, b) => {
          return a.zindex - b.zindex;
        })
        return arr[0]
      } else if (c == 'bottom') {
        arr.sort((a, b) => {
          return b.zindex - a.zindex;
        })
        return arr[0]
      }
    }
    // 递归算法
    recursion = function (a, b) {
      for (let j = 0; j < b.length; j++) {
        for (let i = 0; i < a.length; i++) {
          if (a[i] == b[j]) {
            if (a[i + 1] !== undefined) {
              let num = a[i]
              a[i] = a[i + 1]
              a[i + 1] = num
              b.splice(0, 1)
            } else {
              b.splice(0, 1)
            }
  
            recursion(a, b)
            break;
          }
        }
      }
    }
    recursion1 = function (a, b) {
      for (let j = 0; j < b.length; j++) {
        for (let i = 0; i < a.length; i++) {
          if (a[i] == b[j]) {
            if (a[i - 1] !== undefined) {
              let num = a[i]
              a[i] = a[i - 1]
              a[i - 1] = num
              b.splice(0, 1)
            } else {
              b.splice(0, 1)
            }
  
            recursion1(a, b)
            break;
          }
        }
      }
    }
    // 向上一级
    onetop = function () {
      let daitiarr = JSON.parse(JSON.stringify(localdata.ControlList))
      daitiarr.sort((a, b) => {
        return b.PropertyList.ZIndex - a.PropertyList.ZIndex;
      })
      let arr = []
      let arr1 = []
      let arr2 = []
      let arr3 = []
      Controls.ControlList.forEach((item1, index) => {
        arr.push(item1.PropertyList.ZIndex)
        arr2.push(item1.PropertyList.ZIndex)
        let obj = {
          index: index,
          zindex: item1.PropertyList.ZIndex
        }
        arr3.push(obj)
      })
      if (arr.length !== daitiarr.length) {
        arr.sort((a, b) => {
          return a - b;
        })
        arr2.sort((a, b) => {
          return a - b;
        })
        daitiarr.forEach((item, index) => {
          arr1.push(item.PropertyList.ZIndex)
        })
  
        recursion(arr, arr1)
        let Arr2 = []
        for (let k = 0; k < arr.length; k++) {
          for (let f = 0; f < arr3.length; f++) {
            if (arr3[f].zindex == arr[k]) {
              Arr2.push(arr3[f])
              continue;
            }
          }
        }
        for (let h = 0; h < arr2.length; h++) {
          Arr2[h].zindex = arr2[h]
        }
        Arr2.forEach((item) => {
          if (Controls.ControlList[item.index].PropertyList.ZIndex !== item.zindex) {
            Controls.ControlList[item.index].PropertyList.ZIndex = item.zindex;
  
          }
        })
        Controls.ControlList.forEach((item) => {
          localdata.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name) {
              item1.PropertyList.ZIndex = item.PropertyList.ZIndex;
              localdata.ControlList[index].PropertyList.ZIndex = item.PropertyList.ZIndex;
            }
          })
        })
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement(undefined, undefined, 'all')
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
  
    }
    // 向下一级
    onebottom = function () {
      let daitiarr = JSON.parse(JSON.stringify(localdata.ControlList))
      daitiarr.sort((a, b) => {
        return a.PropertyList.ZIndex - b.PropertyList.ZIndex;
      })
      let arr = []
      let arr1 = []
      let arr2 = []
      let arr3 = []
      Controls.ControlList.forEach((item1, index) => {
        arr.push(item1.PropertyList.ZIndex)
        arr2.push(item1.PropertyList.ZIndex)
        let obj = {
          index: index,
          zindex: item1.PropertyList.ZIndex
        }
        arr3.push(obj)
      })
  
      if (arr.length !== daitiarr.length) {
        arr.sort((a, b) => {
          return a - b;
        })
        arr2.sort((a, b) => {
          return a - b;
        })
        daitiarr.forEach((item, index) => {
          arr1.push(item.PropertyList.ZIndex)
        })
  
        recursion1(arr, arr1)
  
        let Arr2 = []
        for (let k = 0; k < arr.length; k++) {
          for (let f = 0; f < arr3.length; f++) {
            if (arr3[f].zindex == arr[k]) {
              Arr2.push(arr3[f])
              continue;
            }
          }
        }
        for (let h = 0; h < arr2.length; h++) {
          Arr2[h].zindex = arr2[h]
        }
        Arr2.forEach((item) => {
          if (Controls.ControlList[item.index].PropertyList.ZIndex !== item.zindex) {
            Controls.ControlList[item.index].PropertyList.ZIndex = item.zindex;
  
          }
        })
        Controls.ControlList.forEach((item) => {
          localdata.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name) {
              item1.PropertyList.ZIndex = item.PropertyList.ZIndex;
              localdata.ControlList[index].PropertyList.ZIndex = item.PropertyList.ZIndex;
            }
          })
        })
  
        let tmp = []
        localdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        childElement(undefined, undefined, 'all')
        setClass(tmp)
      }
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
    }
    // 删除
    deletediv = function () {
      // 图表组件删除数据需要与图表关联的组件信息一起删除  1. 将删除的组件纪录下来 放入 removeData
      let removeData = []
      localdata.ControlList.forEach((item, index) => {
        // 需要额外获取 图表的数据类型
        if (item.ControlType === 'linechart') {
          Controls.Data.LineChartItemList.forEach(cd => {
            if (cd.name === item.Name) {
              item.dataType = cd.defaultDataConfig.datatype
            }
          })
        } else if (item.ControlType === 'barchart') {
          Controls.Data.BarChartItemList.forEach(cd => {
            if (cd.name === item.Name) {
              item.dataType = cd.defaultDataConfig.datatype
            }
          })
        } else if (item.ControlType === 'dashboardchart') {
          Controls.Data.DashBoardChartItemList.forEach(cd => {
            if (cd.name === item.Name) {
              item.dataType = cd.defaultDataConfig.datatype
            }
          })
        } else if (item.ControlType === 'piechart') {
          Controls.Data.PieChartItemList.forEach(cd => {
            if (cd.name === item.Name) {
              item.dataType = cd.defaultDataConfig.datatype
            }
          })
        }
        removeData.push(item)
        
        $(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).remove()
        // $(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).empty()
  
      })
  
      localdata.ControlList.forEach((item, index1) => {
        Controls.ControlList.forEach((item1, index) => {
          if (item.Name == item1.Name) {
            deleteData(item.ControlType, item.Name)
            Controls.ControlList.splice(index, 1)
  
  
          }
        })
      })
      localdata.ControlList = []
      localdata = {
        ControlList: [],
        Data: {
          PieChartItemList: [],
          DashBoardChartItemList: [],
          BarChartItemList: [],
          LineChartItemList: []
        }
      }
      /* 2.在画布剩下的组件中判断是否有与removeData中的组件相关联的组件，如果有，则清除相应信息
          与图表有关联的组件暂时只有4种：
          日期时间（associatedatetimepicker）， 数值查询（datasearch），文本查询（textsearch），下拉查询（dropsearch）
          后续若还有其他组件需要进行添加 
      */
       Controls.ControlList.forEach((cf, cfi) => {
        if (cf.ControlType === 'associatedatetimepicker') { // 日期时间组件
          removeData.forEach(rf => {
              if (rf.dataType === '历史数据') {
                cf.HistoryList.forEach((cff, cffi) => {
                  if (cff.name === rf.Name) {
                    Controls.ControlList[cfi].EchartList.splice(cffi, 1)
                  }
                })
              } else if (rf.dataType === '业务数据') {
                cf.EchartList.forEach((cff, cffi) => {
                  if (cff.name === rf.Name) {
                    Controls.ControlList[cfi].EchartList.splice(cffi, 1)
                  }
                })
              }
          })
        } else if (cf.ControlType === 'datasearch') { // 数值查询组件
          removeData.forEach(rf => {
            if (rf.dataType === '业务数据') {
              cf.EchartList.forEach((cff, cffi) => {
                if (cff.name === rf.Name) {
                  Controls.ControlList[cfi].EchartList.splice(cffi, 1)
                }
              })
            }
          })
        } else if (cf.ControlType === 'textsearch') { // 文本查询组件
          removeData.forEach(rf => {
            if (rf.dataType === '业务数据') {
              cf.EchartList.forEach((cff, cffi) => {
                if (cff.name === rf.Name) {
                  Controls.ControlList[cfi].EchartList.splice(cffi, 1)
                }
              })
            }
          })
        } else if (cf.ControlType === 'dropsearch') { // 下拉查询组件
          removeData.forEach(rf => {
            if (rf.dataType === '业务数据') {
              cf.EchartList.forEach((cff, cffi) => {
                if (cff.name === rf.Name) {
                  Controls.ControlList[cfi].EchartList.splice(cffi, 1)
                }
              })
            }
          })
        }
      })
      // initCommon()
      $('.details').hide()
      $("#chart-list").hide()
      back(localdata.ControlList, Controls)
      console.log("删除的数据",Controls)
    }
    //删除图表数据
    function deleteData(type, name) {
      let pieData = Controls.Data.PieChartItemList
      let DashBoarData = Controls.Data.DashBoardChartItemList
      let LineData = Controls.Data.LineChartItemList
      let BarData = Controls.Data.BarChartItemList
      if (type == 'piechart') {
        for (let i = 0; i < pieData.length; i++) {
          if (name == pieData[i].name) {
            Controls.Data.PieChartItemList.splice(i, 1)
          }
        }
      } else if (type == 'dashboardchart') {
        for (let i = 0; i < DashBoarData.length; i++) {
          if (name == DashBoarData[i].name) {
            Controls.Data.DashBoardChartItemList.splice(i, 1)
          }
        }
      } else if (type == 'barchart') {
        for (let i = 0; i < BarData.length; i++) {
          if (name == BarData[i].name) {
            Controls.Data.BarChartItemList.splice(i, 1)
          }
        }
      } else if (type == 'linechart') {
        for (let i = 0; i < LineData.length; i++) {
          if (name == LineData[i].name) {
            Controls.Data.LineChartItemList.splice(i, 1)
          }
        }
      }
  
    }
  
    // 复制
    copy = function () {
      if (localdata.length == 0) {
        return
      }
      copydata = JSON.parse(JSON.stringify(localdata))
      cutdata = {
        ControlList: []
      }
  
  
    }
    // 去重
    newobject = function(obj){
      let hash = {}
    return  obj.reduce(function(item, next) {
        hash[next.name] ? '' : hash[next.name] = true && item.push(next);
        return item
    }, [])
    }
    // 粘贴
    paste = function () {
      if (copydata.ControlList.length == 0 && cutdata.ControlList.length == 0) {
        return
      }
      
      if (copydata.ControlList.length !== 0) {
        $('.r-item').hide()
        let zindex = 0
        let index1 = 0
        let id = 0
        localdata.ControlList = []
        localdata.ControlList = []
        let Controls1 = JSON.parse(JSON.stringify(Controls))
        Controls1.ControlList.forEach((item1, index) => {
          if (zindex <= item1.PropertyList.ZIndex) {
            zindex = item1.PropertyList.ZIndex
          }
          if (index1 <= item1.index) {
            index1 = item1.index
          }
          if (id <= item1.PropertyList.id) {
            id = item1.PropertyList.id
          }
        })
        let parr = []
        let parr1 = []
        let darr = []
        let barr = []
        let larr = []
        copydata.ControlList.forEach((item, index2) => {
          Controls1.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name) {
              let item2 = JSON.parse(JSON.stringify(item1))
              if (item.ControlType == 'piechart') {
                copydata.Data.PieChartItemList.forEach((item4) => {
                  if (item.Name = item4.name) {
                    let item5 = JSON.parse(JSON.stringify(item4))
                    item5.name = item2.ControlType + (id + 1 + index2)
                    if (parr1.indexOf(item5.name) <= -1) {
                      parr.push(item5)
                      parr1.push(item5.name)
                    }
                  }
                })
              } else if (item.ControlType == 'dashboardchart') {
                copydata.Data.DashBoardChartItemList.forEach((item4) => {
                  if (item.Name = item4.name) {
                    let item5 = JSON.parse(JSON.stringify(item4))
                    item5.name = item2.ControlType + (id + 1 + index2)
                    if (parr1.indexOf(item5.name) <= -1) {
                      darr.push(item5)
                      parr1.push(item5.name)
                    }
  
  
                  }
                })
              } else if (item.ControlType == 'barchart') {
                copydata.Data.BarChartItemList.forEach((item4) => {
                  if (item.Name = item4.name) {
                    let item5 = JSON.parse(JSON.stringify(item4))
                    item5.name = item2.ControlType + (id + 1 + index2)
                    if (parr1.indexOf(item5.name) <= -1) {
                      barr.push(item5)
                      parr1.push(item5.name)
                    }
                  }
                })
              } else if (item.ControlType == 'linechart') {
                copydata.Data.LineChartItemList.forEach((item4) => {
                  if (item.Name = item4.name) {
                    let item5 = JSON.parse(JSON.stringify(item4))
                    item5.name = item2.ControlType + (id + 1 + index2)
                    if (parr1.indexOf(item5.name) <= -1) {
                      larr.push(item5)
                      parr1.push(item5.name)
                    }
  
  
                  }
                })
              }
            }
          })
        })
        let arr = []
        copydata.ControlList.forEach((item, index2) => {
          Controls1.ControlList.forEach((item1, index) => {
            if (item.Name == item1.Name) {
              let item2 = JSON.parse(JSON.stringify(item))
              item2.PropertyList.Top = item2.PropertyList.Top + 20;
              item2.PropertyList.Left = item2.PropertyList.Left + 20;
              item2.PropertyList.ZIndex = zindex + index2 + 1
              item2.PropertyList.ComName = '组件'+(zindex + index2 + 1)
              item2.index = index1 + index2 + 1
              item2.Name = item2.ControlType + (id + 1 + index2)
              item2.PropertyList.id = id + 1 + index2
              arr.push(item2)
            }
          })
        })
       
        Controls1.ControlList = Controls1.ControlList.concat(arr)
        localdata.ControlList = localdata.ControlList.concat(arr)
        copydata.ControlList = JSON.parse(JSON.stringify(arr))
        Controls = JSON.parse(JSON.stringify(Controls1))
        changeCommon({
          ...Controls.ControlList[Controls.ControlList.length - 1].PropertyList,
          ControlType: Controls.ControlList[Controls.ControlList.length - 1].ControlType
        }, Controls.ControlList.length - 1,'all','all')
        parr = [...new Set(parr)]
        darr = [...new Set(darr)]
        barr = [...new Set(barr)]
        larr = [...new Set(larr)]
        Controls1.Data.PieChartItemList = Controls1.Data.PieChartItemList.concat(parr)
        localdata.Data.PieChartItemList = localdata.Data.PieChartItemList.concat(parr)
        Controls1.Data.DashBoardChartItemList = Controls1.Data.DashBoardChartItemList.concat(darr)
        localdata.Data.DashBoardChartItemList = localdata.Data.DashBoardChartItemList.concat(darr)
        Controls1.Data.BarChartItemList = Controls1.Data.BarChartItemList.concat(barr)
        localdata.Data.BarChartItemList = localdata.Data.BarChartItemList.concat(barr)
        Controls1.Data.LineChartItemList = Controls1.Data.LineChartItemList.concat(larr)
        localdata.Data.LineChartItemList = localdata.Data.LineChartItemList.concat(larr)
        let tmp = []
        copydata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        Controls = JSON.parse(JSON.stringify(Controls1))
        childElement()
        let PieChartNameData = []
        let DNameData = []
        let BNameData = []
        let LNameData = []
        localdata.ControlList.forEach((item1) => {
          localdata.Data.PieChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (PieChartNameData.indexOf(item.name) < 0) {
                PieChartNameData.push(item.name)
              }
  
            }
  
          })
        })
        localdata.ControlList.forEach((item1) => {
          localdata.Data.DashBoardChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (DNameData.indexOf(item.name) < 0) {
                DNameData.push(item.name)
              }
  
            }
  
          })
        })
        localdata.ControlList.forEach((item1) => {
          localdata.Data.BarChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (BNameData.indexOf(item.name) < 0) {
                BNameData.push(item.name)
              }
  
            }
  
          })
        })
        localdata.ControlList.forEach((item1) => {
          localdata.Data.LineChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (LNameData.indexOf(item.name) < 0) {
                LNameData.push(item.name)
              }
  
            }
  
          })
        })
        PiechartEcharts(localdata.Data.PieChartItemList, PieChartNameData)
        DashChartDataFun(localdata.Data.DashBoardChartItemList, DNameData)
        BarChartDataFun(localdata.Data.BarChartItemList, BNameData)
        LineChartDataFun(localdata.Data.LineChartItemList, LNameData)
        
  Controls.Data.DashBoardChartItemList = newobject(Controls.Data.DashBoardChartItemList)
  Controls.Data.BarChartItemList = newobject(Controls.Data.BarChartItemList)
  Controls.Data.LineChartItemList = newobject(Controls.Data.LineChartItemList)
  Controls.Data.PieChartItemList = newobject(Controls.Data.PieChartItemList)
        setClass(tmp)
        // back(localdata.ControlList, Controls)
      } else if (cutdata.length !== 0) {
       
         let arr = []
         Controls.ControlList.forEach((item1, index) => {
          arr.push(item1.Name)
         })
        cutdata.ControlList.forEach((item, index2) => {
          if(!arr.includes(item.Name)){
            Controls.ControlList.push(item)
          }
          
        })
        // Controls.ControlList = [...Controls.ControlList,...cutdata.ControlList]
        cutdata.ControlList.forEach((item, index2) => {
            Controls.ControlList.forEach((item1, index) => {
              if (item.Name == item1.Name) {
                item1.PropertyList.Top = item1.PropertyList.Top + 20;
                item1.PropertyList.Left = item1.PropertyList.Left + 20;
                item.PropertyList.Top = item1.PropertyList.Top + 20;
                item.PropertyList.Left = item1.PropertyList.Left + 20;
                changeCommon({
                  ...item1.PropertyList,
                  ControlType: item1.ControlType
                }, index)
    
              }
            })
          })
       let  localdataclone = JSON.parse(JSON.stringify(cutdata))
        
        let tmp = []
        cutdata.ControlList.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        
        childElement(undefined, undefined, 'all')
        let PieChartNameData = []
        let DNameData = []
        let BNameData = []
        let LNameData = []
        
        localdataclone.ControlList.forEach((item1) => {
          localdataclone.Data.PieChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (PieChartNameData.indexOf(item.name) < 0) {
                PieChartNameData.push(item.name)
              }
  
            }
  
          })
        })
        localdataclone.ControlList.forEach((item1) => {
          localdataclone.Data.DashBoardChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (DNameData.indexOf(item.name) < 0) {
                DNameData.push(item.name)
              }
  
            }
  
          })
        })
        localdataclone.ControlList.forEach((item1) => {
          localdataclone.Data.BarChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (BNameData.indexOf(item.name) < 0) {
                BNameData.push(item.name)
              }
  
            }
  
          })
        })
        localdataclone.ControlList.forEach((item1) => {
          localdataclone.Data.LineChartItemList.forEach((item) => {
            if (item1.Name == item.name) {
              if (LNameData.indexOf(item.name) < 0) {
                LNameData.push(item.name)
              }
  
            }
  
          })
        })
      
        PiechartEcharts(localdataclone.Data.PieChartItemList, PieChartNameData)
        DashChartDataFun(localdataclone.Data.DashBoardChartItemList, DNameData)
        BarChartDataFun(localdataclone.Data.BarChartItemList, BNameData)
        LineChartDataFun(localdataclone.Data.LineChartItemList, LNameData)
        Controls.Data.DashBoardChartItemList = newobject(Controls.Data.DashBoardChartItemList)
        Controls.Data.BarChartItemList = newobject(Controls.Data.BarChartItemList)
        Controls.Data.LineChartItemList = newobject(Controls.Data.LineChartItemList)
        Controls.Data.PieChartItemList = newobject(Controls.Data.PieChartItemList)
        setClass(tmp)
         
        back(localdata.ControlList, Controls)
        setTimeout(() => {
          cutdata = JSON.parse(JSON.stringify(localdata))
        })
          copydata = JSON.parse(JSON.stringify(cutdata))
      cutdata.ControlList = []
      chartsChangFun('style')
      }
    
    }
    // 储存撤销的数据
    back = function (data, data2) {
      isresdata = true
      revoke.push(JSON.parse(JSON.stringify(data2)))
      if (revoke.length > 11) {
        revoke.shift()
      }
      firstback = true
      $('.bodycolorcover').hide() // 隐藏遮罩层
      imgDisabled()
    }
    // 恢复图标
    backgo = function () {
      if (recovery.length >= 1) {
        if (!recovery[recovery.length - 1]) {
         
          Controls = {
            ControlList: [],
            Data: {
              "PieChartItemList":[],
              "DashBoardChartItemList":[],
              "LineChartItemList":[],
              "BarChartItemList":[]
            }
          }
          localdata = {
            ControlList: [],
            Data: {
              "PieChartItemList":[],
              "DashBoardChartItemList":[],
              "LineChartItemList":[],
              "BarChartItemList":[]
            }
          }
  
        } else {
          Controls = JSON.parse(JSON.stringify(recovery[recovery.length - 1]))
          localdata = JSON.parse(JSON.stringify(recovery[recovery.length - 1]))
        }
        if(Array.isArray(Controls)){
          Controls = {
            ControlList: [],
            Data: {
              "PieChartItemList":[],
              "DashBoardChartItemList":[],
              "LineChartItemList":[],
              "BarChartItemList":[]
            }
          }
          localdata = {
            ControlList: [],
            Data: {
              "PieChartItemList":[],
              "DashBoardChartItemList":[],
              "LineChartItemList":[],
              "BarChartItemList":[]
            }
          }
        }
        firstback = true
        // revoke = (JSON.parse(JSON.stringify(backtmp)))
     
        if (revoke.length > 11) {
          revoke.shift()
        }
        if (revoke[revoke.length - 1] == []) {
          revoke = [
            []
          ]
        }
        childElement('index', undefined, '','back')
        if($('.details')[0].style.display == 'block'){
          if(Controls.ControlList.length>0){
             changeCommon({...Controls.ControlList[Controls.ControlList.length-1].PropertyList,ControlType: Controls.ControlList[Controls.ControlList.length-1].ControlType},Controls.ControlList.length-1,'','all')
          }
        }
        
        setTimeout(() => {
          PieChartDataFun()
          DashChartDataFun()
          BarChartDataFun()
          LineChartDataFun()
        }, 300)
        recovery.pop()
        console.log("返回的数据",revoke)
        console.log("撤销的数据",recovery)
      }
      imgDisabled()
      chartsChangFun('style','back')
      // handleMouseUp(undefined,Controls.ControlList[Controls.ControlList.length-1].PropertyList.ZIndex)
    }
    // 撤销图标
    goback = function () {  
    
      if (revoke.length <= 1) {
        Controls = JSON.parse(JSON.stringify(revoke[revoke.length - 1]))
        localdata = JSON.parse(JSON.stringify(revoke[revoke.length - 1]))
        childElement('index', undefined, 'all','back')
        setTimeout(() => {
          PieChartDataFun()
          DashChartDataFun()
          BarChartDataFun()
          LineChartDataFun()
        }, 300)
        imgDisabled()
        return
      }
    
      var end = '不加'
      recovery.push(JSON.parse(JSON.stringify(revoke[revoke.length - 1])))
      if (firstback) {
        backtmp = JSON.parse(JSON.stringify(revoke))
        revoke.pop()
        if (revoke.length == 0) {
          recovery.pop()
          return
        }
        end = JSON.parse(JSON.stringify(revoke[revoke.length - 1]))
      }
      if (!revoke[revoke.length - 1]) {
        enddata = []
      } else {
        Controls = JSON.parse(JSON.stringify(revoke[revoke.length - 1]))
        localdata = JSON.parse(JSON.stringify(revoke[revoke.length - 1]))
  
      }
      if (Controls.length == 0) {
        Controls = {
          ControlList: [],
          Data: {
            BarChartItemList: [],
            DashBoardChartItemList: [],
            LineChartItemList: [],
            PieChartItemList: []
          }
        }
        localdata = {
          ControlList: [],
          Data: {
            BarChartItemList: [],
            DashBoardChartItemList: [],
            LineChartItemList: [],
            PieChartItemList: []
          }
        }
      }
      if($('.details')[0].style.display == 'block'){
      if(Controls.ControlList.length>0){
          changeCommon({...Controls.ControlList[Controls.ControlList.length-1].PropertyList,ControlType: Controls.ControlList[Controls.ControlList.length-1].ControlType},Controls.ControlList.length-1,'','all')
        }
    }
    childElement('index', undefined, 'all','back')
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
      revoke.pop()
      if (end !== '不加') {
        revoke.push(end)
      }
      imgDisabled()
      chartsChangFun('style','back')
      // handleMouseUp(undefined,Controls.ControlList[Controls.ControlList.length-1].PropertyList.ZIndex)
      console.log("返回的数据",revoke)
      console.log("撤销的数据",recovery)
    }
    // 剪切
    cut = function () {
      if (localdata.length == 0) {
        return
      }
      cutdata = JSON.parse(JSON.stringify(localdata))
      copydata = {
        ControlList: []
      }
      deletediv()
    }
    document.onkeydown = function (e) {
     keyCode = e.keyCode;
      if (e.keyCode == 46) {
        deletediv()
      }
      //backSpace
      if (e.keyCode == 8) {
        if ($("input").is(":focus") || $("textarea").is(":focus") ) {
          if (e.target.parentElement.nextElementSibling && e.target.parentElement.nextElementSibling.classList[0].includes('select-dropdown')) { // 画布下拉框展开也可删除
            deletediv()
          }
          if (e.target.parentElement.parentElement && e.target.parentElement.parentElement .classList[0].includes('r-date-group')) { // 日期时间组件输入框点击选中
            deletediv()
          }
        } else {
          deletediv()
        }
      }
      if(e.keyCode>= 48 && e.keyCode <= 111){
        if ($("input").is(":focus")) {
              $("#saveBtnTips").show()
        }
      }
  
      if (window.event.ctrlKey) {
        if (e.keyCode == 67) {
          copy()
        } else if (e.keyCode == 86) {
          if ($("input").is(":focus")) {} else {
            paste()
          }
         
        } else if (e.keyCode == 88) {
          cut()
        } else if (e.keyCode == 90) {
          goback()
        } else if (e.keyCode == 89) {
          backgo()
        }
      }
     
    }
    document.onkeyup = function(e){
     if(e.keyCode == 17){
       type = ''
     }
    }
    olclick = function () {
      $('#coverol').toggle()
      $('.select-pass').toggle()
      // if (viewpass.length > 1) {
      //   Controls.ControlList.forEach((item) => {
  
      //     item.PropertyList.Width = (item.PropertyList.Width * (parseInt(Controls.WrapWidth) / 100)) / (parseFloat(viewpass[viewpass.length - 1]))
      //     item.PropertyList.Height = (item.PropertyList.Height * (parseInt(Controls.WrapWidth) / 100)) / (parseFloat(viewpass[viewpass.length - 1]))
       
      //   })
      //   viewpass.shift()
      // }
      localStorage.setItem("percentage", JSON.stringify($('.viewpass').text()))
    }
    olloclick = function (a, event) {
      $('#coverol').hide()
      let width = event.target.innerText
      // $('#canvas-wrap').css({
      //   'width': width,
      //   'height': width
      // })
      // 注释Zoom
      // $('#canvas-wrap').css({
      //   'transform-origin': '0% 0%',
      //   'transform': `scale(${(parseInt($(a).attr('name')) * 0.01)})`
      // })
      if (parseInt($(a).attr('name')) >= 100) {
        $('#canvas-wrap').css({
            // 'width': zoomValue + '%',
            // 'hiehgt': zoomValue + '%'
            'transform-origin': '0% 0%',
            'transform': `scale(${(parseInt($(a).attr('name')) * 0.01)})`
        })
    } else {
        $('#canvas-wrap').css({
            // 'width': zoomValue + '%',
            // 'hiehgt': zoomValue + '%'
            'transform-origin': 'unset',
            'transform': `scale(${(parseInt($(a).attr('name')) * 0.01)})`
        })
    }

      commonList.WrapWidth = width
      $(a).siblings('li').removeClass('selected')
      $(a).attr('class', 'selected')
      $('.viewpass')[0].innerText = $(a).attr('name')
      viewpass.push((parseInt($(a).attr('name')) / 100))
      localStorage.setItem("percentage", JSON.stringify($('.viewpass').text()))
      let ispreView = JSON.parse(localStorage.getItem('isPreview')) 
      if (viewpass.length > 2) {
        viewpass.shift()
      }
      if (ispreView) {
        // Controls.ControlList.forEach((item) => {
        //   item.PropertyList.Width = item.PropertyList.Width / (parseInt(zoom) / 100)
        //   item.PropertyList.Height = item.PropertyList.Height / (parseInt(zoom) / 100)
        // })

        // if (parseInt(width) != 100 && parseInt(width) > 100) {
        //   Controls.ControlList.forEach((item) => {
        //     item.PropertyList.Width = (item.PropertyList.Width) * (parseInt($(a).attr('name')) / 100)
        //     item.PropertyList.Height = (item.PropertyList.Height) * (parseInt($(a).attr('name')) / 100)
        //   })
        // } else if (parseInt(width) != 100 && parseInt(width) < 100) {
        //   Controls.ControlList.forEach((item) => {
        //     item.PropertyList.Width = (item.PropertyList.Width) * (parseInt($(a).attr('name')) / 100)
        //     item.PropertyList.Height = (item.PropertyList.Height) * (parseInt($(a).attr('name')) / 100)
        //   })
        // }
  
        localStorage.removeItem('isPreview')
      } else {

      // Controls.ControlList.forEach((item) => {
      //   item.PropertyList.Width = (item.PropertyList.Width / (parseInt(Controls.WrapWidth) / 100)) * (parseInt($(a).attr('name')) / 100)
      //   item.PropertyList.Height = (item.PropertyList.Height / (parseInt(Controls.WrapWidth) / 100)) * (parseInt($(a).attr('name')) / 100)
      // })
      
    }
     
      childElement('index', undefined, 'all')
      setTimeout(() => {
        PieChartDataFun()
        DashChartDataFun()
        BarChartDataFun()
        LineChartDataFun()
      }, 300)
      back(localdata.ControlList, Controls)
      event.stopImmediatePropagation()
    }
    
    hidecover = function () {
      $('#coverol').hide()
      $('.select-pass').hide()
  
    }
    $(".details").bind("input click",function(event){
      copydata = []
  }); 
  createcolor = function(id,type){

  }
  })()
  
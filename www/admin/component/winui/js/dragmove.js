layui.define([], function (exports) {
    let $ = layui.$;
    let menuPostionData = localStorage.getItem('_deskTopMenuPostion');
    const moveOne = function (dargEl) {
        
        $(dargEl).on('mousedown', event => {
            event = event || window.event;  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let drag = event.target;
            //console.log(drag)
            if (drag.tagName == 'I') {
                drag = drag.parentNode.parentNode;
            }
            if ($(drag).hasClass('winui-icon') || drag.tagName == 'P') {
                drag = drag.parentNode;
            }
            //console.log(drag)
            let diffX = event.clientX - drag.offsetLeft;
            let diffY = event.clientY - drag.offsetTop;
            
            if (typeof drag.setCapture !== 'undefined') {
                drag.setCapture();
            }
            document.onmousemove = function (event) {
                var event = event || window.event;
                var moveX = event.clientX - diffX;
                var moveY = event.clientY - diffY;
                if (moveX < 0) {
                    moveX = 0
                } else if (moveX > window.innerWidth - drag.offsetWidth) {
                    moveX = window.innerWidth - drag.offsetWidth
                }
                if (moveY < 0) {
                    moveY = 0
                } else if (moveY > window.innerHeight - drag.offsetHeight) {
                    moveY = window.innerHeight - drag.offsetHeight
                }
                drag.style.left = moveX + 'px';
                drag.style.top = moveY + 'px';

                if (menuPostionData) {
                    let posData = JSON.parse(menuPostionData)
                    posData[drag.id] = {
                        top: drag.style.top,
                        left: drag.style.left
                    }
                    localStorage.setItem('_deskTopMenuPostion', JSON.stringify(posData))
                }
                
            }
            document.onmouseup = function (event) {
                this.onmousemove = null;
                this.onmouseup = null;
                let drag = event.target;
                //修复低版本ie bug  
                if (typeof drag.releaseCapture != 'undefined') {
                    drag.releaseCapture();
                }
            }
        })
    }
    const moveMore = (selected) => {
        let xArr = [], yArr = [];
        document.onmousedown = event => {
            event = event || window.event;
            selected.forEach(el => {
                xArr.push(event.clientX - el.node.offsetLeft)
                yArr.push(event.clientY - el.node.offsetTop)
            })
        }
        let posData = JSON.parse(menuPostionData)
        document.onmousemove = event => {
            event = event || window.event;
            selected.forEach((el,index) => {
                let moveX = event.clientX - xArr[index];
                let moveY = event.clientY - yArr[index];
                if (moveX < 0) {
                    moveX = 0
                } else if (moveX > window.innerWidth - el.node.offsetWidth) {
                    moveX = window.innerWidth - el.node.offsetWidth
                }
                if (moveY < 0) {
                    moveY = 0
                } else if (moveY > window.innerHeight - el.node.offsetHeight) {
                    moveY = window.innerHeight - el.node.offsetHeight
                }
                el.node.style.left = moveX + 'px';
                el.node.style.top = moveY + 'px';
                posData[el.node.id] = {
                    top: el.node.style.top,
                    left: el.node.style.left
                }
            })
            //localStorage.setItem('_deskTopMenuPostion', JSON.stringify(posData))
        }
        document.onmouseup = function (event) {
            this.onmousemove = null;
            this.onmouseup = null;
            //console.log(posData)
            localStorage.setItem('_deskTopMenuPostion', JSON.stringify(posData))
        }
    }
    exports('dragmove', {moveOne,moveMore})
})

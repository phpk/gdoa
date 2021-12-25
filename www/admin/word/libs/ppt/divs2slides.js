/**
 * divs2slides.js
 * Ver : 1.3.2
 * update: 14/05/2018
 * Author: meshesha , https://github.com/meshesha
 * LICENSE: MIT
 * url:https://github.com/meshesha/divs2slides
 * 
 * New: 
 *  - fixed fullscreen (fullscreen on div only insted all page)
 */
(function( $ ){
    
    var orginalMainDivWidth,
        orginalMainDivHeight,
        orginalSlidesWarpperScale,
        orginalSlideTop,
        orginalSlideLeft,
        orginalSlidesToolbarWidth,
        orginalSlidesToolbarTop;
    var pptxjslideObj = {
        init: function(){
            var data = pptxjslideObj.data;
            var divId = data.divId;
            var isInit = data.isInit;
            $("#"+divId+" .slide").hide();        
            if(data.slctdBgClr != false){
                var preBgClr = $(document.body).css("background-color");
                data.prevBgColor = preBgClr;
                $(document.body).css("background-color",data.slctdBgClr)
            }
            if (data.nav && !isInit){
                data.isInit = true;
                // Create navigators 
                $("#"+divId).prepend(
                    $("<div></div>").attr({
                        "class":"slides-toolbar",
                        "style":"width: 90%; padding: 10px; text-align: center;font-size:18px; color: "+data.navTxtColor+";" ////New for Ver: 1.2.1
                    })                
                );
                $("#"+divId+" .slides-toolbar").prepend(
                    $("<img></img>").attr({
                        "id":"slides-next",
                        "class":"slides-nav",
                        "alt":"Next Slide",
                        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADZ0lEQVRIiZ2Va2xTdRjGH5xEg0aXeInRqE00pKwfHAkydYMdlXFpiG5LYFFi0iBZFFeLrm50ZrbrYLeyneEFcHMMhxoksGUSTEw01UQz1ukO29quO11vXNZNwBI1gRDN4wfa0q3n1MKT/D697/s8//OenP8BspD2jSGNtmpISEVjcOZmM6sqjcGZm/f2sC2/+tfQpnYvdxwK0NwXpLkvyB2HAixr83C5eUTSGV2GmzZfVjVc+qxlNFb/dYRHh2Psdl7knpNzbDkxy5YTs9xzco7dzov88pdLtHwV5tM1v4W0VUNCVuZ5plO9r3b62O28wF2DURr7zmRk12CUvT9dYLnDw/99Gp3JJW7bL7Pj2zlW9kS4tTucFZU9EX743RwrOibVQ7RVQ0K5w8uG/hm+8knolmjon+Fa+zh12135aQEFtaMh6/HzLN8bSIMkmwajirWFWI6cpc7kcs5fjdFlWNPoYdneAF/qmE6DJP+++i+bBqOK9VQ2fRSkYBvnvJeeZxoeWNcqc2P7tCKp+t79Jys+Dqr2bmyfZkmzjzqTS0wGLH9vNKZ3+KnGQs1evsbaI+dU+/UOP596Z0RKBqy0nOb6VlkVNX3x8yXVmZWW0wQArDCPCIX14yxp8nFt85QimTQ9e5VvHgzP6y+2e24E5O+UNAV1YyyoG2PhBxMsbvDw+UYv1+yeTJJJf135h63fzLC4wcMi6wSfef+6V0HdGJMrKqyfoBKrrG6usrpVzeXoFRr2+RVnn6sfiyUDiqxuabXNTTWU1Pvj76r9q21uFlknBpIBgt0rvtDopRqpisausbIrqNqbQLB7blwZgm1SU9LsoxoJHXf9wTJRVu1L8OJuX0ywSfP/F+taZHFDm0wlSNI+MKNYU2J985Qt7S4SbFKu3uGXMn2h2aB3+KU084T0bXJ+qRiIlXUGeCu8LAaktNUsVKk4qdmyLyS9diDMm2HL/pCzVMxsvijObQByKj+dqjb2RS6bDp9lJoyfhyPbDvheB5ATn034JJUDYDGAOwHcDSAXwIMAHgWwdHPtZ+btnT/01/SMequ7XHJ118hUzUHJ/Van81iFpfddAE8AeATAAwDuBbAEwB0Abo8HXj9xSshd8ZD7ATwM4HEATwJYBkAXRxs3fgzAQwDuA3BPivniuOei/wDo+pj+wU2R5QAAAABJRU5ErkJggg==",
                        "style":"float: right;cursor: pointer;opacity: 0.7;"
                    }).on("click", pptxjslideObj.nextSlide)
                );
                if(data.showTotalSlideNum){
                    $("#"+divId+" .slides-toolbar").prepend(
                        $("<span></span>").attr({
                            "id":"slides-total-slides-num"
                        }).html(data.totalSlides)
                    );
                }
                if(data.showSlideNum && data.showTotalSlideNum){
                    $("#"+divId+" .slides-toolbar").prepend(
                        $("<span></span>").attr({
                            "id":"slides-slides-num-separator"
                        }).html(" / ")
                    );
        
                }
                if(data.showSlideNum){
                    $("#"+divId+" .slides-toolbar").prepend(
                        $("<span></span>").attr({
                            "id":"slides-slide-num"
                        }).html(data.slideCount)
                    );
                }
                if(data.showFullscreenBtn){
                    $("#"+divId+" .slides-toolbar").prepend(
                        $("<img></img>").attr({
                            "id":"slides-full-screen",
                            "class":"slides-nav-play",
                            "alt":"fullscreen Slide",
                            "src": "data:image/png;base64,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",
                            "style":"float: left;cursor: pointer;opacity: 0.7; padding: 0 10px 0 10px"
                        }).bind("click", function(){ 
                            pptxjslideObj.fullscreen();
                        })
                    )
                }
                if(data.showPlayPauseBtn){
                    $("#"+divId+" .slides-toolbar").prepend(
                        $("<img></img>").attr({
                            "id":"slides-play-pause",
                            "class":"slides-nav-play",
                            "alt":"Play/Pause Slide",
                            "src": "data:image/png;base64,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",
                            "style":"float: left;cursor: pointer;opacity: 0.7;  padding: 0 10px 0 10px"
                        }).html("<span style='font-size:80%;'>&#x23ef;</span>").bind("click", function(){ 
                            if(data.isSlideMode){
                                pptxjslideObj.startAutoSlide();
                            }
                        })
                    );
                }
                $("#"+divId+" .slides-toolbar").prepend(
                    $("<img></img>").attr({
                        "id":"slides-prev",
                        "class":"slides-nav",
                        "alt":"Prev. Slide",
                        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADXklEQVRIiZ2Ve2hTZxjGH+tE0bEFdGNM1IBj1PYPKzjr1roeN6tdEW0LWpwMgpMytVncGttF6ZKm2lu0qXdtrdV6wY3ZUsXBYCMbOGrTrce2SZqeNrc5m9bLIjpQxPHsD5PYpMkx+sAPDnzv+zwf3+0ACUipsiiSizuFCL7oVCbSK6tUtVW1SNst5tfZuf2Ui9pWN7Wtbm4/5eK6fQ6mlfzhSfmyy6BUWRQvZJxc3Cm8V/qnR3fey3O/32WT5Q73XhljzeVR1lwe5d4rY2yy3OH3XQGWf+fj+7qewILirryEZ11gsrPlt9vc3eGnuvUvWXZ3+Nlkuc1PG5xM0Vxrea55Yf0AD/w0xqJmHzc1eROiqNnH+h/HuPmoxFSN1RzbfKs1baWxjxVtI9xw2PNSVLSNsMDkYHJxpzAxQGO16C7cYMF+13Op6vCTZMwx/cWbTC/r8UzYVMHQx3UH3VxTPyxLVYef/z76jyRjjufvd3FFpZ2paqtq/OzN2dVOrt43HJfCQ27+bLvP8YpXu6pWYoqmqz0csPCrbjHXNMR4lF34m6P3HjNacj2LdvQEwgFLdNeZUyvF5OzVuxOMQ4rXk1MrcYnuOiMCsox2rqweDLPlpJfDo4/impOMqB9PdpWTGeV9XKztfnqa0nf2Mn1nL5fu6mWmvp9ZFXbWXhrhg4dPZANW7BkIs7zSwawKOzO+7WfIL+0bUQkA+KC8N5BR3s9oVEeGKPkfxg1Yprdxmd42oS9EeIky9f3tHxpsjEfLr7diBsj1ZOptYjhAMNpVH1U6KEdRo5v+QORJkqsXjI5nT4ZgEBUf73EGsqudlCPfLPGi9Z9wgFytYBhQRtzmnOpBwyd1EhPB2D5CknHHV9VIsR+8XNOQKHebEyHXNCQKBjH2D0gwiIq1ZpeY3+Diy5BndgVy66S0mOYh5ZlFxcajHstnx7x8ETYe8Yh55qh1j9KkIEkAJm8+5vxcfdrr05y5QTnUrb57RccHSwBMDvaGfMJKAvAKgKkApgN4HcAbAGYDmF+oa/l6W4Plh9KToq2ksXuwpNEqlTb3OLY2/NK2vuyEFsC7AOYAeBOAAsCrAKYBmBIMxaTgx5RxIa8BmAngLQBzAcwHkAwgNcgCAO8AmAfgbQCzguYzosyT/gcSaJj+/BZ/OQAAAABJRU5ErkJggg==",
                        "style":"float: left;cursor: pointer; opacity: 0.7;",
                    }).bind("click", pptxjslideObj.prevSlide)
                );

                $(".slides-nav, .slides-nav-play").on("mouseover",function(){
                    $(this).css({
                        "opacity":1
                    });
                });
                $(".slides-nav, .slides-nav-play").on("mouseout",function(){
                    $(this).css({
                        "opacity": 0.7
                    });
                });
                if(data.slideCount == 1){
                    $("#"+divId+" #slides-prev").hide();
                }else if(data.slideCount == data.totalSlides){
                    $("#"+divId+" #slides-next").hide();
                }else{
                    $("#"+divId+" #slides-next").show();
                }
            }else{
                $("#"+divId+" .slides-toolbar").show();
                data.isEnbleNextBtn = true;
                data.isEnblePrevBtn = true;
            }
            if(document.getElementById("all_slides_warpper") === null){
                $("#"  + divId + " .slide").wrapAll("<div id='all_slides_warpper'></div>");
            }
            // Go to first slide
            pptxjslideObj.gotoSlide(1);
        },
        nextSlide: function(){
            var data = pptxjslideObj.data;
            var isLoop = data.isLoop;
            var isAutoMode = data.isAutoSlideMode;
            if (data.slideCount < data.totalSlides){
                    pptxjslideObj.gotoSlide(data.slideCount+1);
                    if(!isAutoMode) $("#slides-next").show();
            }else{
                if(isLoop){
                    pptxjslideObj.gotoSlide(1);
                }else{
                    if(!isAutoMode) $("#slides-next").hide();
                }
            }
            if(!isAutoMode){
                if(data.slideCount > 1){
                    $("#slides-prev").show();
                }else{
                    $("#slides-prev").hide();
                }
                if(data.slideCount == data.totalSlides && !isLoop){
                    $("#slides-next").hide();
                }
            }
            //return this;
        },
        prevSlide: function(){
            var data = pptxjslideObj.data;
            var isAutoMode = data.isAutoSlideMode;
            if (data.slideCount > 1){
                pptxjslideObj.gotoSlide(data.slideCount-1);
            }
            if(!isAutoMode){
                if(data.slideCount == 1){
                    $("#slides-prev").hide();
                }else{
                    $("#slides-prev").show();
                }
                $("#slides-next").show();
            }
            return this;
        },
        gotoSlide: function(idx){
            var index = idx - 1;
            var data = pptxjslideObj.data;
            var slides = data.slides;
            var prevSlidNum = data.prevSlide;
            var transType = data.transition; /*"slid","fade","default" */
            if(transType=="random"){
                var tType = ["","default","fade","slid"];
                var randomNum = Math.floor(Math.random() * 3) + 1; //random number between 1 to 3
                transType = tType[randomNum];
            }
            var transTime = 1000*(data.transitionTime);
            if (slides[index]){
                var nextSlide = $(slides[index]);
                if ($(slides[prevSlidNum]).is(":visible")){ //remove "index >= 1 &&" bugFix to ver. 1.2.1
                    if(transType=="default"){
                        $(slides[prevSlidNum]).hide(transTime);
                    }else if(transType=="fade"){
                        $(slides[prevSlidNum]).fadeOut(transTime);
                    }else if(transType=="slid"){
                        $(slides[prevSlidNum]).slideUp(transTime);
                    }
                }
                if(transType=="default"){
                    nextSlide.show(transTime); 
                }else if(transType=="fade"){
                    nextSlide.fadeIn(transTime);
                }else if(transType=="slid"){
                    nextSlide.slideDown(transTime);
                }
                data.prevSlide = index;
                pptxjslideObj.data.slideCount = idx;
                $("#slides-slide-num").html(idx);
            }
            return this;
        },
        keyDown: function(event){
            event.preventDefault();
            var key = event.keyCode;
            //console.log(key);
            var data = pptxjslideObj.data;
            switch(key){
                case(37): // Left arrow
                case(8): // Backspace
                    if(data.isSlideMode && data.isEnblePrevBtn){
                        pptxjslideObj.prevSlide();
                    }
                    break;
                case(39): // Right arrow
                case(32): // Space 
                case(13): // Enter 
                    if(data.isSlideMode  && data.isEnbleNextBtn){
                        pptxjslideObj.nextSlide();
                    }
                    break; 
                case(46): //Delete
                    //if in auto mode , stop auto mode TODO
                    if(data.isSlideMode){
                        var div_id = data.divId;
                        $("#"+div_id+" .slide").hide();
                        pptxjslideObj.gotoSlide(1);               //bugFix to ver. 1.2.1
                    }
                    break;
                case(27): //Esc
                    if(data.isSlideMode){
                        pptxjslideObj.closeSileMode();
                        data.isSlideMode = false;
                    }
                    break;
                case(116): //F5
                    if(!data.isSlideMode){
                        pptxjslideObj.startSlideMode();
                        data.isSlideMode = true;
                        if(data.isAutoSlideMode || data.isLoopMode){
                            clearInterval(data.loopIntrval);
                            data.isAutoSlideMode = false;
                            data.isLoopMode = false;
                        }
                        
                    }
                    break;
                case(113): // F2
                    if(data.isSlideMode){
                        pptxjslideObj.fullscreen();
                    }
                    break;
                case(119): // F8
                    if(data.isSlideMode){
                        pptxjslideObj.startAutoSlide();
                        //TODO : ADD indication that it is in auto slide mode
                    }
                break;
            }
            return true;
        },
        startSlideMode: function(){
            pptxjslideObj.init();
        },
        closeSileMode: function(){
            var data = pptxjslideObj.data;
            data.isSlideMode = false;
            var div_id= data.divId;
            $("#"+div_id+" .slides-toolbar").hide();
            $("#"+div_id+" .slide").show();
            $(document.body).css("background-color",pptxjslideObj.data.prevBgColor);
            if(data.isLoopMode){
                clearInterval(data.loopIntrval);
                data.isLoopMode = false;
            }
            pptxjslideObj.exitFullscreenMod();
        },
        startAutoSlide: function(){
            var data = pptxjslideObj.data;
            var isAutoSlideOption = data.timeBetweenSlides
            var isAutoSlideMode = data.isAutoSlideMode;
            if(!isAutoSlideMode && isAutoSlideOption !== false){
                data.isAutoSlideMode = true;
                //var isLoopOption = data.isLoop;
                var isStrtLoop =  data.isLoopMode;
                //hide and disable next and prev btn
                if(data.nav){
                    var div_Id = data.divId;
                    $("#"+div_Id+" .slides-toolbar .slides-nav").hide();
                    $("#"+div_Id + " #slides-play-pause").attr("src" , "data:image/png;base64,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");

                }
                data.isEnbleNextBtn = false;
                data.isEnblePrevBtn = false;
                ///////////////////////////////
                
                var t = isAutoSlideOption + data.transitionTime;
                
                var slideNums = data.totalSlides;
                var isRandomSlide = data.randomAutoSlide;
                
                if(!isStrtLoop){
                    var timeBtweenSlides = t*1000; //milisecons
                    data.isLoopMode = true;
                    data.loopIntrval = setInterval(function(){
                        if(isRandomSlide){
                            var randomSlideNum = Math.floor(Math.random() * slideNums) + 1;
                            pptxjslideObj.gotoSlide(randomSlideNum);
                        }else{
                            pptxjslideObj.nextSlide();
                        }
                    }, timeBtweenSlides);
                }else{
                    clearInterval(data.loopIntrval);
                    data.isLoopMode = false;                
                }
            }else{
                clearInterval(data.loopIntrval);
                data.isAutoSlideMode = false;
                data.isLoopMode = false;
                //show and enable next and prev btn
                if(data.nav){
                    var div_Id = data.divId;
                    $("#"+div_Id + " .slides-toolbar .slides-nav").show();
                    $("#"+div_Id + " #slides-play-pause").attr("src","data:image/png;base64,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");
                }
                data.isEnbleNextBtn = true;
                data.isEnblePrevBtn = true;    
            }
        },
        fullscreen: function(){
            if (!document.fullscreenElement &&    
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
                var data = pptxjslideObj.data;
                var div_Id = data.divId;
                if (document.documentElement.requestFullscreen) {
                    document.getElementById(div_Id).requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.getElementById(div_Id).msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.getElementById(div_Id).mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.getElementById(div_Id).webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
                var winWidth = $(window).width();
                var winHeight = $(window).height();
                //Need to save:
                orginalMainDivWidth = $("#"+div_Id).width();
                orginalMainDivHeight = $("#"+div_Id).height();
                var m = $("#"+div_Id +" #all_slides_warpper").css('transform');
                orginalSlidesWarpperScale = m.substring(m.indexOf('(') + 1, m.indexOf(')')).split(",")
                orginalSlideTop = $("#"+div_Id +" #all_slides_warpper .slide").offset().top;
                orginalSlideLeft = $("#"+div_Id +" #all_slides_warpper .slide").offset().left;
                orginalSlidesToolbarWidth = $("#"+div_Id+" .slides-toolbar").width();
                orginalSlidesToolbarTop = $("#"+div_Id+" .slides-toolbar").offset().top;

                $("#"+div_Id).attr({
                    style: "width: " + (winWidth - 10) + "px; height: " + (winHeight - 10) + "px;"
                });

                $("#"+div_Id +" #all_slides_warpper").css({
                    "transform":"scale(1)"
                });

                var slideWidth = $("#"+div_Id +" #all_slides_warpper .slide").width();
                var sildeHeight = $("#"+div_Id +" #all_slides_warpper .slide").height();
                $("#"+div_Id +" #all_slides_warpper .slide").css({
                    "top": ((winHeight - sildeHeight)/2) + "px",
                    "left": ((winWidth - slideWidth)/2) + "px"
                });

                if(data.nav){
                    $("#"+div_Id+" .slides-toolbar").css({
                        "width": "99%",
                        "top": "20px"
                    });
                }
                //change fullscreen icon to other icon (red color)
                $("#"+div_Id + " #slides-full-screen").attr("src","data:image/png;base64,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")
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }

                pptxjslideObj.exitFullscreenMod();
            }
            
        },
        exitFullscreenMod: function(){
            var data = pptxjslideObj.data;
            var div_Id = data.divId;
            //saved:
            /*
            orginalMainDivWidth
            orginalMainDivHeight
            orginalSlidesWarpperScale
            orginalSlideTop
            orginalSlideLeft
            orginalSlidesToolbarWidth
            orginalSlidesToolbarTop
            */
            $("#"+div_Id).attr({
                style: "width: " + orginalMainDivWidth + "px; height: " + orginalMainDivHeight + "px;"
            });
            console.log(orginalSlidesWarpperScale[0])
            $("#"+div_Id +" #all_slides_warpper").css({
                "transform":"scale(" + orginalSlidesWarpperScale[0] + ")"
            });

            $("#"+div_Id +" #all_slides_warpper .slide").css({
                "top": "0px", /**orginalSlideTop +  */
                "left": "0px" /**orginalSlideLeft +  */
            });

            if(data.nav){
                $("#"+div_Id+" .slides-toolbar").css({
                    "width": orginalSlidesToolbarWidth + "px",
                    "top": orginalSlidesToolbarTop + "px"
                });
            }

             //change fullscreen icon to orginal icon - TODO
             $("#"+div_Id + " #slides-full-screen").attr("src","data:image/png;base64,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");
        }

    };
    $.fn.divs2slides = function( options ) {
        var target = $(this);
        var divId = target.attr("id");
        var slides = $("#" + divId + " .slide");//target.children();
        //console.log(slides)
        var totalSlides = slides.length;
        var prevBgColor;
        var settings = $.extend(true, {
            // These are the defaults.
            first: 1,
            nav: true, /** true,false : show or not nav buttons*/
            showPlayPauseBtn: true, /** true,false */
            showFullscreenBtn: true, /** true,false */
            navTxtColor: "black", /** color */
            keyBoardShortCut: true, /** true,false */
            showSlideNum: true, /** true,false */
            showTotalSlideNum: true, /** true,false */
            autoSlide:1, /** false or seconds (the pause time between slides) , F8 to active(condition: keyBoardShortCut: true) */
            randomAutoSlide: false, /** true,false ,(condition: autoSlide:true */ 
            loop: false,  /** true,false */
            background: false, /** false or color*/
            transition: "default", /** transition type: "slid","fade","default","random" , to show transition efects :transitionTime > 0.5 */
            transitionTime: 1 /** transition time in seconds */
        }, options );
        var slideCount = settings.first
        pptxjslideObj.data = {
            nav: settings.nav,
            navTxtColor: settings.navTxtColor,
            showPlayPauseBtn: settings.showPlayPauseBtn,
            showFullscreenBtn: settings.showFullscreenBtn,
            showSlideNum: settings.showSlideNum,
            showTotalSlideNum: settings.showTotalSlideNum,
            target: target,
            divId: divId,
            slides:slides,
            isSlideMode: true,
            totalSlides:totalSlides,
            slideCount: slideCount,
            prevSlide: 0,
            transition: settings.transition,
            transitionTime: settings.transitionTime,
            slctdBgClr: settings.background,
            prevBgColor: prevBgColor,
            timeBetweenSlides: settings.autoSlide,
            isLoop: settings.loop,
            isLoopMode: false,
            isAutoSlideMode: false,
            randomAutoSlide: settings.randomAutoSlide,
            isEnbleNextBtn: true,
            isEnblePrevBtn: true,
            isInit: false
        }

        // Keyboard shortcuts
        if (settings.keyBoardShortCut){
            $(document).bind("keydown",pptxjslideObj.keyDown);
        }
        if (document.addEventListener){
            document.addEventListener('webkitfullscreenchange', exitHandler, false);
            document.addEventListener('mozfullscreenchange', exitHandler, false);
            document.addEventListener('fullscreenchange', exitHandler, false);
            document.addEventListener('MSFullscreenChange', exitHandler, false);
        }
        
        function exitHandler(){
            if (document.webkitIsFullScreen ===false || document.mozFullScreen === false || document.msFullscreenElement === null){
                pptxjslideObj.exitFullscreenMod();
            }
        }
        pptxjslideObj.init();
    }
})(jQuery);

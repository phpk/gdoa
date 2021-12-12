window.Win10 = {
    _version: 'v1.0',
    _bgs: {
        main: '',
        mobile: '',
    },
    _wallpaperBlur: false, //壁纸模糊（影响性能）
    _countTask: 0,
    _newMsgCount: 0,
    _animated_classes: [],
    _animated_liveness: 0,
    _switchMenuTooHurry: false,
    _lang: 'unknown',
    _iframeOnClick: {
        resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function () {
            this.element = arguments[0];
            this.cb = arguments[1];
            this.hasTracked = false;
        },
        track: function (element, cb) {
            this.iframes.push(new this.Iframe(element, cb));
            if (!this.interval) {
                let _this = this;
                this.interval = setInterval(function () { _this.checkClick(); }, this.resolution);
            }
        },
        checkClick: function () {
            if (document.activeElement) {
                let activeElement = document.activeElement;
                for (let i in this.iframes) {
                    let eid = undefined;
                    if ((eid = this.iframes[i].element.id) && !document.getElementById(eid)) {
                        delete this.iframes[i];
                        continue;
                    }
                    if (activeElement === this.iframes[i].element) { // user is in this Iframe
                        if (this.iframes[i].hasTracked === false) {
                            this.iframes[i].cb.apply(window, []);
                            this.iframes[i].hasTracked = true;
                        }
                    } else {
                        this.iframes[i].hasTracked = false;
                    }
                }
            }
        }
    },
    _iframe_click_lock_children: {},
    _renderBar: function () {
        //调整任务栏项目的宽度
        if (this._countTask <= 0) { return; } //防止除以0
        let btns = $("#win10_btn_group_middle>.btn");
        btns.css('width', ('calc(' + (1 / this._countTask * 100) + '% - 1px )'))
    },
    _handleReady: [],
    _hideShortcut: function () {
        let that = $("#win10 #win10-shortcuts .shortcut");
        that.removeClass('animated flipInX');
        that.addClass('animated flipOutX');
    },
    _showShortcut: function () {
        let that = $("#win10 #win10-shortcuts .shortcut");
        that.removeClass('animated flipOutX');
        that.addClass('animated flipInX');
    },
    _checkBgUrls: function () {
        let loaders = $('#win10>.img-loader');
        let flag = false;
        if (Win10.isSmallScreen()) {
            if (Win10._bgs.mobile) {
                loaders.each(function () {
                    let loader = $(this);
                    if (loader.attr('src') === Win10._bgs.mobile && loader.hasClass('loaded')) {
                        Win10._setBackgroundImg(Win10._bgs.mobile);
                        flag = true;
                    }
                });
                if (!flag) {
                    //没找到加载完毕的图片
                    let img = $('<img class="img-loader" src="' + Win10._bgs.mobile + '" />');
                    $('#win10').append(img);
                    Win10._onImgComplete(img[0], function () {
                        img.addClass('loaded');
                        Win10._setBackgroundImg(Win10._bgs.mobile);
                    })
                }
            }
        } else {
            if (Win10._bgs.main) {
                loaders.each(function () {
                    let loader = $(this);
                    if (loader.attr('src') === Win10._bgs.main && loader.hasClass('loaded')) {
                        Win10._setBackgroundImg(Win10._bgs.main);
                        flag = true;
                    }
                });
                if (!flag) {
                    //没找到加载完毕的图片
                    let img = $('<img class="img-loader" src="' + Win10._bgs.main + '" />');
                    $('#win10').append(img);
                    Win10._onImgComplete(img[0], function () {
                        img.addClass('loaded');
                        Win10._setBackgroundImg(Win10._bgs.main);
                    })
                }
            }
        }

        //开始渲染壁纸模糊
        if (Win10._wallpaperBlur) {
            $('.background').addClass('blur');
        }
    },
    //动态加载JS文件
    loadScript: function (url, callback) {
        let el = document.createElement("script");
        el.type = "text/javascript";

        if (typeof (callback) != "undefined") {
            if (el.readyState) {
                el.onreadystatechange = function () {
                    if (el.readyState == "loaded" || el.readyState == "complete") {
                        el.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                el.onload = function () {
                    callback();
                };
            }
        }

        el.src = url;
        document.head.appendChild(el);
    },
    _startAnimate: function () {
        setInterval(function () {
            let classes_lenth = Win10._animated_classes.length;
            let animated_liveness = Win10._animated_liveness;
            if (animated_liveness === 0 || classes_lenth === 0 || !$("#win10-menu").hasClass('opened')) { return; }
            $('#win10-menu>.blocks>.menu_group>.block').each(function () {
                if (!$(this).hasClass('onAnimate') && Math.random() <= animated_liveness) {
                    let that = $(this);
                    let class_animate = Win10._animated_classes[Math.floor((Math.random() * classes_lenth))];
                    that.addClass('onAnimate');
                    setTimeout(function () {
                        that.addClass(class_animate);
                        setTimeout(function () {
                            that.removeClass('onAnimate');
                            that.removeClass(class_animate);
                        }, 3000);
                    }, Math.random() * 2 * 1000)
                }
            })
        }, 1000);
    },
    _onImgComplete: function (img, callback) {
        if (!img) { return; }
        let timer = setInterval(function () {
            if (img.complete) {
                callback(img);
                clearInterval(timer);
            }
        }, 50)
    },
    _setBackgroundImg: function (img) {
        $('#win10 .background').css('background-image', 'url(' + img + ')')
    },
    _settop: function (layero) {
        if (!isNaN(layero)) {
            layero = this.getLayeroByIndex(layero);
        }
        //置顶窗口
        let max_zindex = 0;
        $(".win10-open-iframe").each(function () {
            z = parseInt($(this).css('z-index'));
            $(this).css('z-index', z - 1);
            if (z > max_zindex) { max_zindex = z; }
        });
        layero.css('z-index', max_zindex + 1);
    },
    _checkTop: function () {
        let max_index = 0, max_z = 0, btn = null;
        $("#win10_btn_group_middle .btn.show").each(function () {
            let index = $(this).attr('index');
            let layero = Win10.getLayeroByIndex(index);
            let z = layero.css('z-index');
            if (z > max_z) {
                max_index = index;
                max_z = z;
                btn = $(this);
            }
        });
        this._settop(max_index);
        $("#win10_btn_group_middle .btn").removeClass('active');
        if (btn) {
            btn.addClass('active');
        }
    },
    //渲染右键
    _renderContextMenu: function (x, y, menu, trigger) {
        this._removeContextMenu();
        if (menu === true) { return; }
        let dom = $("<div class='win10-context-menu'><ul></ul></div>");
        $('#win10').append(dom);
        let ul = dom.find('ul');
        for (let i = 0; i < menu.length; i++) {
            let item = menu[i];
            if (item === '|') {
                ul.append($('<hr/>'));
                continue;
            }
            if (typeof (item) === 'string') {
                ul.append($('<li>' + item + '</li>'));
                continue;
            }
            if (typeof (item) === 'object') {
                let sub = $('<li>' + item[0] + '</li>');
                ul.append(sub);
                sub.click(trigger, item[1]);
                continue;
            }
        }
        //修正坐标
        if (x + 150 > document.body.clientWidth) { x -= 150 }
        if (y + dom.height() > document.body.clientHeight) { y -= dom.height() }
        dom.css({
            top: y,
            left: x,
        });
    },
    _removeContextMenu: function () {
        $('.win10-context-menu').remove();
    },
    _closeWin: function (index) {
        $("#win10_" + index).remove();
        layer.close(index);
        Win10._checkTop();
        Win10._countTask--;//回退countTask数
        Win10._renderBar();
    },
    _fixWindowsHeightAndWidth: function () {
        //此处代码修正全屏切换引起的子窗体尺寸超出屏幕
        let opens = $('.win10-open-iframe');
        let clientHeight = document.body.clientHeight;
        opens.each(function () {
            let layero_opened = $(this);
            let height = layero_opened.css('height');
            height = parseInt(height.replace('px', ''));
            if (height + 30 >= clientHeight) {
                layero_opened.css('height', clientHeight - 30);
                layero_opened.find('.layui-layer-content').css('height', clientHeight - 62);
                layero_opened.find('.layui-layer-content iframe').css('height', clientHeight - 62);
            }
        })
    },

    /**
     * 原 win10_bind_open_windows 子窗口事件自动绑定插件
     * @author:vG
     * @修订:Yuri2
     * @version:2.0.1
     * 说明: 所有#win10下的元素加入类win10-open-window即可自动绑定openUrl函数，无须用onclick手动绑定
     */
    _bind_open_windows: function () {
        // 注册事件委派 打开url窗口
        $('#win10').on('click', '.win10-open-window', function () {
            //>> 获取当前点击的对象
            $this = $(this);
            //>> 判断url地址是否为空 如果为空 不予处理
            if ($this.data('url') !== "") {
                //>> 获取弹窗标题
                let title = $this.data('title') || '',
                    areaAndOffset, icon;

                //>> 判断是否有标题图片
                let bg = $this.data('icon-bg') ? $this.data('icon-bg') : '';
                if ($this.data('icon-image')) {
                    //>> 加入到标题中
                    icon = '<img class="icon ' + bg + '" src="' + $this.data('icon-image') + '"/>';
                }
                if ($this.data('icon-font')) {
                    //>> 加入到标题中
                    icon = '<i class="fa fa-fw fa-' + $this.data('icon-font') + ' icon ' + bg + '"></i>';
                }
                if (!title && $this.children('.icon').length === 1 && $this.children('.title').length === 1) {
                    title = $this.children('.title').html();
                    if (!icon) {
                        icon = $this.children('.icon').prop("outerHTML");
                    }
                }
                //>> 判断是否需要 设置 区域宽度高度
                if ($this.data('area-offset')) {
                    areaAndOffset = $this.data('area-offset');
                    //>> 判断是否有分隔符
                    if (areaAndOffset.indexOf(',') !== -1) {
                        areaAndOffset = eval(areaAndOffset);
                    }
                }
                //>> 调用win10打开url方法
                Win10.openUrl($this.data('url'), icon, title, areaAndOffset);
            }
        })
    },
    _init: function () {

        //获取语言
        this._lang = (navigator.language || navigator.browserLanguage).toLowerCase();

        $("#win10_btn_win").click(function () {
            Win10.commandCenterClose();
            Win10.menuToggle();
        });
        $("#win10_btn_command").click(function () {
            Win10.renderCommand();
            Win10.menuClose();
            Win10.commandCenterToggle();
        });
        $("#win10 .desktop").click(function () {
            Win10.menuClose();
            Win10.commandCenterClose();
        });
        $('#win10').on('click', ".notice .btn_close_msg", function () {
            let msg = $(this).parents('.notice');
            $(msg).addClass('animated slideOutRight');
            setTimeout(function () {
                msg.remove()
            }, 500)
        });
        //消息界面切换
        $('#win10_command_center').on('click', ".command-header div", function () {
            if (!$(this).hasClass('active')) {
                if ($(this).hasClass('tab-today')) {
                    $(this).parent().siblings('.msgs').hide().siblings('.today').show();
                    $(this).addClass('active').siblings('div').removeClass('active');
                } else {
                    $(this).parent().siblings('.today').hide().siblings('.msgs').show();
                    $(this).addClass('active').siblings('div').removeClass('active');
                }
            }
        });
        $('#win10_btn_command_center_clean_all').click(function () {
            let msgs = $('#win10_command_center .msg');
            msgs.addClass('animated slideOutRight');
            setTimeout(function () {
                msgs.remove()
            }, 1500);
            setTimeout(function () {
                Win10.commandCenterClose();
            }, 1000);
        });
        $("#win10_btn_show_desktop").click(function () {
            $("#win10 .desktop").click();
            Win10.hideWins();
        });
        $("#win10-menu-switcher").click(function () {
            if (Win10._switchMenuTooHurry) { return; }
            Win10._switchMenuTooHurry = true;
            let class_name = 'win10-menu-hidden';
            let list = $("#win10-menu>.list");
            let blocks = $("#win10-menu>.blocks");
            let toggleSlide = function (obj) {
                if (obj.hasClass(class_name)) {
                    obj.addClass('animated slideInLeft');
                    obj.removeClass('animated slideOutLeft');
                    obj.removeClass(class_name);
                } else {
                    setTimeout(function () {
                        obj.addClass(class_name);
                    }, 450);
                    obj.addClass('animated slideOutLeft');
                    obj.removeClass('animated slideInLeft');
                }
            };
            toggleSlide(list);
            toggleSlide(blocks);
            setTimeout(function () {
                Win10._switchMenuTooHurry = false;
            }, 520)
        });
        $("#win10_btn_group_middle").click(function () {
            $("#win10 .desktop").click();
        });
        $(document).on('click', '.win10-btn-refresh', function () {
            let index = $(this).attr('index');
            let iframe = Win10.getLayeroByIndex(index).find('iframe');
            iframe.attr('src', iframe.attr('src'));
        });
        $(document).on('mousedown', '.win10-open-iframe', function () {
            let layero = $(this);
            Win10._settop(layero);
            Win10._checkTop();
        });
        $('#win10_btn_group_middle').on('click', '.btn_close', function () {
            let index = $(this).parent().attr('index');
            Win10._closeWin(index);
        });
        $('#win10-menu .list').on('click', '.item', function () {
            let e = $(this);
            if (e.hasClass('has-sub-down')) {
                $('#win10-menu .list .item.has-sub-up').toggleClass('has-sub-down').toggleClass('has-sub-up');
                $("#win10-menu .list .sub-item").slideUp();
            }
            if (e.next().hasClass('sub-item')) {
                e.toggleClass('has-sub-down').toggleClass('has-sub-up');
            }
            while (e.next().hasClass('sub-item')) {
                e.next().slideToggle();
                e = e.next();
            }
        });
        setInterval(function () {
            //重新写mac时间
            let myDate = Win10.getLunarObj();
            $("#win10_btn_time").html(myDate.weekDay + myDate.hour + ':' + myDate.minute);
        }, 1000);
        //离开前警告
        document.body.onbeforeunload = function (event) {
            let rel = Win10.lang('系统可能不会保存您所做的更改', 'The system may not save the changes you have made.');
            if (!window.event) {
                event.returnValue = rel;
            } else {
                window.event.returnValue = rel;
            }
        };
        Win10.buildList();//预处理左侧菜单
        Win10._startAnimate();//动画处理
        Win10.renderShortcuts();//渲染图标
        $("#win10-shortcuts").removeClass('shortcuts-hidden');//显示图标
        Win10._showShortcut();//显示图标
        Win10.renderDocks();//渲染DOCK
        //窗口改大小，重新渲染
        $(window).resize(function () {
            Win10.renderShortcuts();
            Win10._checkBgUrls();
            if (!Win10.isSmallScreen()) Win10._fixWindowsHeightAndWidth(); //2017年11月14日修改，加入了if条件
            Win10.renderDocks();
        });
        
        //点击清空右键菜单
        $(document).click(function (event) {
            if (!event.button)
                Win10._removeContextMenu();
        });
        //禁用右键的右键
        $(document).on('contextmenu', '.win10-context-menu', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        //设置默认右键菜单
        Win10.setContextMenu('#win10', true);
        Win10.setContextMenu('#win10>.desktop', [
            ['<i class="fa fa-fw fa-star"></i> 收藏本页', function () {
                let url = window.location;
                let title = document.title;
                let ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("360se") > -1) {
                    layer.alert(Win10.lang('您的浏览器不支持,请按 Ctrl+D 手动收藏!', 'Your browser does not support, please press Ctrl+D to manual collection!'));
                }
                else if (ua.indexOf("msie 8") > -1) {
                    window.external.AddToFavoritesBar(url, title); //IE8
                }
                else if (document.all) {
                    try {
                        window.external.addFavorite(url, title);
                    } catch (e) {
                        layer.alert(Win10.lang('您的浏览器不支持,请按 Ctrl+D 手动收藏!', 'Your browser does not support, please press Ctrl+D to manual collection!'));
                    }
                }
                else if (window.sidebar) {
                    window.sidebar.addPanel(title, url, "");
                }
                else {
                    layer.alert(Win10.lang('您的浏览器不支持,请按 Ctrl+D 手动收藏!', 'Your browser does not support, please press Ctrl+D to manual collection!'));
                }
            }],
            ['<i class="fa fa-fw fa-window-maximize"></i> ' + Win10.lang('进入全屏', 'Enable Full Screen'), function () { Win10.enableFullScreen() }],
            ['<i class="fa fa-fw fa-window-restore"></i> ' + Win10.lang('退出全屏', 'Disable Full Screen'), function () { Win10.disableFullScreen() }],
            '|',
            ['<i class="fa fa-fw fa-info-circle"></i> ' + Win10.lang('关于', 'About Us'), function () { Win10.aboutUs() }],
        ]);
        Win10.setContextMenu('#win10_btn_group_middle', [
            ['<i class="fa fa-fw fa-window-maximize"></i> ' + Win10.lang('全部显示', 'Show All Windows'), function () { Win10.showWins() }],
            ['<i class="fa fa-fw fa-window-minimize"></i> ' + Win10.lang('全部隐藏', 'Hide All Windows'), function () { Win10.hideWins() }],
            ['<i class="fa fa-fw fa-window-close"></i> ' + Win10.lang('全部关闭', 'Close All Windows'), function () { Win10.closeAll() }],
        ]);

        //处理消息图标闪烁
        setInterval(function () {
            let btn = $("#win10-msg-nof.on-new-msg");
            if (btn.length > 0) {
                btn.toggleClass('fa-commenting-o');
            }
        }, 600);

        //绑定快捷键
        $("body").keyup(function (e) {
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case 37://left
                        $("#win10_btn_win").click();
                        break;
                    case 38://up
                        Win10.showWins();
                        break;
                    case 39://right
                        $("#win10_btn_command").click();
                        break;
                    case 40://down
                        Win10.hideWins();
                        break;
                }
            }
        });
        /**
         * WIN10-UI v1.1.2.2 桌面舞台支持补丁
         * WIN10-UI v1.1.2.2之后的版本不需要此补丁
         * @usage 直接引用即可（需要jquery）
         * @author Yuri2
         */
        if ($("#win10-desktop-scene").length < 1) {
            $("#win10-shortcuts").css({
                position: 'absolute',
                left: 0,
                top: 30,
                'z-index': 100,
            });
            $("#win10 .desktop").append("<div id='win10-desktop-scene' style='width: 100%;height: 100%;position: absolute;left: 0;top: 0; z-index: 0;background-color: transparent;'></div>")
        }

        //属性绑定
        Win10._bind_open_windows();
    },
    setBgUrl: function (bgs) {
        this._bgs = bgs;
        this._checkBgUrls();
    },
    setBg: function (bgs) {
        this._bgs = bgs;
        this._checkBgUrls();
    },
    menuClose: function () {
        $("#win10-menu").removeClass('opened');
        $("#win10-menu").addClass('hidden');
        this._showShortcut();
        $(".win10-open-iframe").removeClass('hide');
    },
    getLunarObj: function () {
        //农历年信息
        let lunarInfo = new Array(
            0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
            0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);
        let Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
        let Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
        let Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");

        //==== 传回农历 y年的总天数
        function lYearDays(y) {
            let i, sum = 348
            for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0
            return (sum + leapDays(y))
        }
        //==== 传回农历 y年闰月的天数
        function leapDays(y) {
            if (leapMonth(y))
                return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
            else
                return (0)
        }
        //==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
        function leapMonth(y) {
            return (lunarInfo[y - 1900] & 0xf);
        }
        //==== 传回农历 y年m月的总天数
        function monthDays(y, m) {
            return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        }
        //==== 算出农历, 传入日期物件, 传回农历日期物件
        //      该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
        function lunar(objDate) {
            let i, leap = 0, temp = 0
            let baseDate = new Date(1900, 0, 31)
            let offset = (objDate - baseDate) / 86400000

            this.dayCyl = offset + 40
            this.monCyl = 14

            for (i = 1900; i < 2050 && offset > 0; i++) {
                temp = lYearDays(i)
                offset -= temp
                this.monCyl += 12
            }
            if (offset < 0) {
                offset += temp;
                i--;
                this.monCyl -= 12
            }

            this.year = i
            this.yearCyl = i - 1864

            leap = leapMonth(i) //闰哪个月
            this.isLeap = false

            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leap > 0 && i == (leap + 1) && this.isLeap === false) { --i; this.isLeap = true; temp = leapDays(this.year); }
                else { temp = monthDays(this.year, i); }

                //解除闰月
                if (this.isLeap === true && i == (leap + 1)) this.isLeap = false

                offset -= temp
                if (this.isLeap === false) this.monCyl++
            }

            if (offset == 0 && leap > 0 && i == leap + 1)
                if (this.isLeap) { this.isLeap = false; }
                else { this.isLeap = true; --i; --this.monCyl; }

            if (offset < 0) { offset += temp; --i; --this.monCyl; }

            this.month = i
            this.day = offset + 1
        }
        //获取农历（月）中文格式
        function get_lunarmonth(month) {
            let fm = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "腊月"];
            return fm[month - 1];
        }
        //获取农历（日）中文格式
        function get_lunarday(day) {
            let fd = ["十", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            if (day <= 10) {
                return "初" + fd[day];
            }
            else if (day < 20) {
                return "十" + fd[day - 10];
            }
            else if (day == 20) {
                return "二十";
            }
            else if (day < 30) {
                return "廿" + fd[day - 20];
            }
            else {
                return "三" + fd[day - 30];
            }
        }

        //获取干支
        function get_ganzhi(year) {
            let num = year - 1900 + 36;
            return (Gan[num % 10] + Zhi[num % 12]);
        }
        //获取生肖
        function get_animal(year) {
            return Animals[(year - 4) % 12];
        }
        //获取周
        function get_weekday(date) {
            let values = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            return values[date.getDay()];
        }

        //获取星期
        function get_week(date) {
            let values = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return values[date.getDay()];
        }

        //获取分钟
        function get_min(date) {
            let mins = date.getMinutes();
            if (mins < 10) {
                mins = '0' + mins
            }
            return mins;
        }

        //获取小时
        function get_hour(date) {
            let hour = date.getHours();
            if (hour < 6) { hours = '凌晨' + hour; }
            else if (hour < 9) { hours = '早上' + hour; }
            else if (hour < 12) { hours = '上午' + hour; }
            else if (hour < 14) { hours = '中午' + (hour - 12); }
            else if (hour < 17) { hours = '下午' + (hour - 12); }
            else if (hour < 19) { hours = '傍晚' + (hour - 12); }
            else if (hour < 22) { hours = '晚上' + (hour - 12); }
            else { hours = '深夜' + (hour - 12) }
            return hours;
        }

        let viewdate = {};
        let date = new Date();
        //秒
        viewdate.second = date.getSeconds();
        //分钟
        viewdate.minute = get_min(date);
        //小时
        viewdate.hour = get_hour(date);
        //日期
        viewdate.day = date.getDate();
        //星期
        viewdate.week = get_week(date);
        //星期
        viewdate.weekDay = get_weekday(date);
        //月
        viewdate.month = date.getMonth() + 1;
        //完整的年份(4位,1970-????)
        viewdate.fullYear = date.getFullYear();
        //年份(2位)
        viewdate.year = date.getYear();
        //农历信息
        let lunar_obj = new lunar(date);
        //农历中文月
        viewdate.lunarmonth = get_lunarmonth(lunar_obj.month);
        //农历中文日
        let lunar_day = Math.floor(lunar_obj.day);
        viewdate.lunarday = get_lunarday(lunar_day);
        //农历年月日
        viewdate.lunar = lunar_obj.year + "-" + lunar_obj.month + "-" + lunar_day;
        //干支
        viewdate.ganzhi = get_ganzhi(lunar_obj.year);
        //生肖
        viewdate.animal = get_animal(lunar_obj.year);

        return viewdate;
    },
    //消息中心渲染
	renderCommand: function (todayHtml = null) {
		let active = $("#win10_command_center .command-body.today").hasClass('active');
		if (!active) {
			if (!todayHtml) {
				let lunarDate = Win10.getLunarObj();
				todayHtml = '<div class="command-body-calendar">\n' +
					'	<div class="command-body-calendar-date normal-date">' + lunarDate.month + '月' + lunarDate.day + '日 \n' + lunarDate.week + '</div>\n' +
					'	<div class="command-body-calendar-date lunar-date">' + lunarDate.ganzhi + '年' + lunarDate.lunarmonth + lunarDate.lunarday + '</div>\n' +
					'</div>\n' +
					'<div class="notice">' +
					'	<div class="notice-header">' +
					'		<span class="notice-header-icon"><img src="./img/icon/weather.png" class="notice-header-icon-img" /></span>\n' +
					'		<span class="notice-header-title">天气</span>\n' +
					'	</div>\n' +
					'	<div class="notice-body">\n' +
					'	<iframe scrolling="no" src="https://tianqiapi.com/api.php?style=tw&skin=durian" frameborder="0" width="100%" height="500" allowtransparency="true"></iframe>\n' +
					'	</div>\n' +
					'</div>\n';
			}
			$("#win10_command_center .command-body.today").html(todayHtml).addClass('active');
        }
    },
    menuOpen: function () {
        $("#win10-menu").addClass('opened');
        $("#win10-menu").removeClass('hidden');
        //this._hideShortcut(); //不关闭
        $(".win10-open-iframe").addClass('hide');
    },
    menuToggle: function () {
        if (!$("#win10-menu").hasClass('opened')) {
            this.menuOpen();
        } else {
            this.menuClose();
        }
    },
    commandCenterClose: function () {
        $("#win10_command_center").addClass('hidden_right');
        this._showShortcut();
        $(".win10-open-iframe").removeClass('hide');
    },
    commandCenterOpen: function () {
        $("#win10_command_center").removeClass('hidden_right');
        //this._hideShortcut();
        $(".win10-open-iframe").addClass('hide');
        $("#win10-msg-nof").removeClass('on-new-msg fa-commenting-o');
    },
    renderShortcuts: function () {
        if (!this.isSmallScreen()) {
            //大屏执行pc的布局也就是竖排靠右对齐，小屏幕执行移动端也就是横向排列
            let h = parseInt(($("#win10 #win10-shortcuts")[0].offsetHeight - 90) / 100);
            let w = 0;
            //计算一列最大几个图标，公式是（桌面图标界面的大小 - 顶部状态栏和底部dock栏的尺寸）/单个图标高度所占的尺寸
            let x = 0,
                y = 0;
            $("#win10 #win10-shortcuts .shortcut").each(function () {
                $(this).css({
                    right: x * 82 + 10,
                    left: 'auto',
                    top: y * 100 + 10,
                });
                y++;
                if (y >= h) {
                    y = 0;
                    x++;
                }
            });
        } else {
            //小屏幕执行横屏
            let w = parseInt(($("#win10 #win10-shortcuts")[0].offsetWidth - 10) / 82);
            let x = 0,
                y = 0;
            $("#win10 #win10-shortcuts .shortcut").each(function () {
                $(this).css({
                    left: x * 82 + 10,
                    right: 0,
                    top: y * 100 + 10,
                });
                x++;
                if (x >= w) {
                    x = 0;
                    y++;
                }
            });
        }
    },
    //渲染DOCK
    renderDocks: function () {
        let cell_width = 50;
        let width = document.body.clientWidth;
        let docks = $(".dock .dock-container a");
        let max_num = parseInt((width - 40) / (cell_width + 25)) - 1;
        for (let i = 0; i <= docks.length; i++) {
            if (i >= max_num) {
                docks.eq(i).hide();
            } else {
                docks.eq(i).show();
            }
        }
        if (width > 768) {
            $('#dock').Fisheye({
                maxWidth: 70,
                items: 'a',
                itemsText: 'span',
                container: '.dock-container',
                itemWidth: 50,
                proximity: 80,
                alignment: 'left',
                valign: 'bottom',
                halign: 'center'
            })
        } else {
            $('.dock-container').css({ 'width': width });
            for (let i = 0; i < max_num; i++) {

                docks.on('mouseover', function (e) {
                    e.preventDefault();
                });
                docks.on('mouseout', function (e) {
                    e.preventDefault();
                });
                docks.on('click', function (e) {
                    e.preventDefault();
                });
                docks.unbind("mouseover").unbind('mouseout').unbind('click').css({ "width": cell_width });
                if (i == 0) {
                    docks.eq(i).css("margin-left", 0);
                }
            }
        }
    },
    commandCenterToggle: function () {
        if ($("#win10_command_center").hasClass('hidden_right')) {
            this.commandCenterOpen();
        } else {
            this.commandCenterClose();
        }
    },
    newMsg: function (title, content, handle_click, app_name = '提示消息', app_icon = '<img src="./img/icon/weather.png" class="notice-header-icon-img" />', is_del = true) {
        let msg = '<div class="notice">' +
            '<div class="notice-header">' +
            '<span class="notice-header-icon">' + app_icon + '</span>' +
            '<span class="notice-header-title">' + app_name + '</span>';
        if (is_del) {
            msg += '<span class="btn_close_msg fa fa-times-circle"></span>';
        }
        msg += '</div>' +
            '<div class="notice-body">' +
            '<div class="msg">' +
            '<div class="title">' + title + '</div>' +
            '<div class="content">' + content + '</div>' +
            '</div></div></div>';
        let e = $(msg);
        $("#win10_command_center .msgs").prepend(e);
        e.find('.content:first,.title:first').click(function () {
            if (handle_click) {
                handle_click(e);
            }
        });
        // layer.tips(Win10.lang('新消息:', 'New message:') + title, '#win10_btn_command', {
        //     tips: [1, 'rgba(0, 0, 0, 0.7)'],
        //     time: 3000
        // });
        if ($("#win10_command_center").hasClass('hidden_right')) {
            $("#win10-msg-nof").addClass('on-new-msg');
        }
    },
    getLayeroByIndex: function (index) {
        return $('#' + 'layui-layer' + index)
    },
    isSmallScreen: function (size) {
        if (!size) {
            size = 768
        }
        let width = document.body.clientWidth;
        return width < size;
    },
    enableFullScreen: function () {
        let docElm = document.documentElement;
        //W3C
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (docElm.msRequestFullscreen) {
            document.body.msRequestFullscreen();
        }
    },
    disableFullScreen: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    },
    buildList: function () {
        $("#win10-menu .list .sub-item").slideUp();
        $("#win10-menu .list .item").each(function () {
            if ($(this).next().hasClass('sub-item')) {
                $(this).addClass('has-sub-down');
                $(this).removeClass('has-sub-up');
            }
        })
    },
    openUrl: function (url, icon, title, areaAndOffset) {
        if (this._countTask > 12) {
            layer.msg("您打开的太多了，歇会儿吧~");
            return false;
        } else {
            this._countTask++;
        }
        if (!url) { url = '404' }
        url = url.replace(/(^\s*)|(\s*$)/g, "");
        let preg = /^(https?:\/\/|\.\.?\/|\/\/?)/;
        if (!preg.test(url)) {
            url = 'http://' + url;
        }
        if (!url) {
            url = '#';
        }
        if (!title) {
            title = url;
        }
        let area, offset;
        if (this.isSmallScreen() || areaAndOffset === 'max') {
            area = ['100%', (document.body.clientHeight - 24) + 'px'];
            offset = ['24px', '0'];
        } else if (typeof areaAndOffset === 'object') {
            area = areaAndOffset[0];
            offset = areaAndOffset[1];
        } else {
            area = ['80%', '80%'];
            let topset, leftset;
            topset = parseInt($(window).height());
            topset = (topset - (topset * 0.8)) / 2 - 31;
            leftset = parseInt($(window).width());
            leftset = (leftset - (leftset * 0.8)) / 2 - 120;
            offset = [Math.round((this._countTask % 10 * 20) + topset) + 'px', Math.round((this._countTask % 10 * 20 + 100) + leftset) + 'px'];
        }
        let index = layer.open({
            type: 2,
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            title: icon + title,
            content: url,
            area: area,
            offset: offset,
            isOutAnim: false,
            skin: 'win10-open-iframe',
            cancel: function (index, layero) {
                $("#win10_" + index).remove();
                Win10._checkTop();
                Win10._countTask--;//回退countTask数
                Win10._renderBar();
            },
            min: function (layero) {
                layero.hide();
                $("#win10_" + index).removeClass('show');
                Win10._checkTop();
                return false;
            },
            full: function (layero) {
                layero.find('.layui-layer-min').css('display', 'inline-block');
                layero_opened.css('top', 24);
            },
        });
        $('#win10_btn_group_middle .btn.active').removeClass('active');
        let btn = $('<div id="win10_' + index + '" index="' + index + '" class="btn show active"><div class="btn_title">' + icon + '</div></div>');
        let layero_opened = Win10.getLayeroByIndex(index);
        layero_opened.css('z-index', Win10._countTask + 813);
        Win10._settop(layero_opened);
        //重新定义菜单布局
        layero_opened.find('.layui-layer-setwin').prepend('<a class="win10-btn-refresh" index="' + index + '" href="#"></a>');
        //菜单排列倒序
        layero_opened.find(".layui-layer-setwin>a").each(function () {
            $(this).prependTo(layero_opened.find(".layui-layer-setwin"));
        })
        layero_opened.find('.layui-layer-setwin .layui-layer-max').click(function () {
            setTimeout(function () {
                let height = layero_opened.css('height');
                height = parseInt(height.replace('px', ''));
                if (height >= document.body.clientHeight) {
                    layero_opened.css('height', height - 25);
                    layero_opened.find('.layui-layer-content').css('height', height - 55);
                    layero_opened.find('.layui-layer-content iframe').css('height', height - 55);
                }
            }, 300);

        });
        $("#win10_btn_group_middle").append(btn);
        Win10._renderBar();
        btn.click(function () {
            let index = $(this).attr('index');
            let layero = Win10.getLayeroByIndex(index);
            let settop = function () {
                //置顶窗口
                let max_zindex = 0;
                $(".win10-open-iframe").each(function () {
                    z = parseInt($(this).css('z-index'));
                    $(this).css('z-index', z - 1);
                    if (z > max_zindex) { max_zindex = z; }
                });
                layero.css('z-index', max_zindex + 1);
            };
            if ($(this).hasClass('show')) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).removeClass('show');
                    Win10._checkTop();
                    layero.hide();
                } else {
                    $('#win10_btn_group_middle .btn.active').removeClass('active');
                    $(this).addClass('active');
                    Win10._settop(layero);
                }
            } else {
                $(this).addClass('show');
                $('#win10_btn_group_middle .btn.active').removeClass('active');
                $(this).addClass('active');
                Win10._settop(layero);
                layero.show();
            }
        });


        Win10._iframeOnClick.track(layero_opened.find('iframe:first')[0], function () {
            if (Object.getOwnPropertyNames(Win10._iframe_click_lock_children).length === 0) {
                Win10._settop(layero_opened);
                Win10._checkTop();
            } else {
                console.log('click locked');
            }
        });

        this.menuClose();
        this.commandCenterClose();
        return index;
    },
    closeAll: function () {
        $(".win10-open-iframe").remove();
        $("#win10_btn_group_middle").html("");
        Win10._countTask = 0;
        Win10._renderBar();
    },
    setAnimated: function (animated_classes, animated_liveness) {
        this._animated_classes = animated_classes;
        this._animated_liveness = animated_liveness;
    },
    exit: function () {
        layer.confirm(Win10.lang('确认要关闭本页吗?', 'Are you sure you want to close this page?'), { icon: 3, title: Win10.lang('提示', 'Prompt') }, function (index) {
            document.body.onbeforeunload = function () { };
            window.location.href = "about:blank";
            window.close();
            layer.close(index);
            layer.alert('哎呀,好像失败了呢。',
                {
                    skin: 'layui-layer-lan',
                    closeBtn: 0
                }
            );
        });

    },
    lang: function (cn, en) {
        return this._lang === 'zh-cn' || this._lang === 'zh-tw' ? cn : en;
    },
    aboutUs: function () {
        //关于我们
        layer.open({
            type: 1,
            closeBtn: 1, //不显示关闭按钮
            anim: 2,
            skin: 'win10-open-iframe',
            title: 'GoDoCms ' + this._version,
            shadeClose: true, //开启遮罩关闭
            area: ['320px', '200px'], //宽高
            content: '<div style="padding: 10px;font-size: 12px">' +
                '<p>打造最实用的低代码平台！</p>' +
                '<p>刚东科技©版权所有</p>' +
                '<p>https://godo.im</p>' +
                '</div>'
        });
    },
    setContextMenu: function (jq_dom, menu) {
        if (typeof (jq_dom) === 'string') {
            jq_dom = $(jq_dom);
        }
        jq_dom.unbind('contextmenu');
        jq_dom.on('contextmenu', function (e) {
            if (menu) {
                Win10._renderContextMenu(e.clientX, e.clientY, menu, this);
                if (e.cancelable) {
                    // 判断默认行为是否已经被禁用
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }
                e.stopPropagation();
            }
        });
    },
    hideWins: function () {
        $('#win10_btn_group_middle>.btn.show').each(function () {
            let index = $(this).attr('index');
            let layero = Win10.getLayeroByIndex(index);
            $(this).removeClass('show');
            $(this).removeClass('active');
            layero.hide();
        })
    },
    showWins: function () {
        $('#win10_btn_group_middle>.btn').each(function () {
            let index = $(this).attr('index');
            let layero = Win10.getLayeroByIndex(index);
            $(this).addClass('show');
            layero.show();
        });
        Win10._checkTop();
    },
    getDesktopScene: function () {
        return $("#win10-desktop-scene");
    },
    onReady: function (handle) {
        Win10._handleReady.push(handle);
    }
};


$(function () {
    Win10._init();
    for (let i in Win10._handleReady) {
        let handle = Win10._handleReady[i];
        handle();
    }
});
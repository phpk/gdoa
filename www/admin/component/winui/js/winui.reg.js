layui.define(['layer', 'winui','winuiInit'], function (exports) {
    let layer = layui.layer,
        $ = layui.$,
        winuiInit = layui.winuiInit,
        //desklogin = layui.desklogin,
        loginKey = '_godocmsLoginKey';
    
    let showBox = () => {
        layer.closeAll();
        $('.winui-taskbar').css('zIndex', '0');
        if (!winui.loginNum) winui.loginNum = 0;
        winui.loginNum++;
        if (winui.loginNum > 1) return;
        $.get(winui.path + 'html/system/reg.html', {}, function (content) {   
            //console.log(ik)
            let bgimg = winui.settings.lockBgSrc || '/admin/component/winui/images/bg/img2.webp';
            layer.open({
                id: 'winui-logincreen',
                type: 1,
                title: false,
                skin: 'lockscreen',
                closeBtn: 0,
                shade: 0,
                anim: -1,
                isOutAnim: false,
                zIndex: layer.zIndex,
                content: content,
                success: function (layero, layerindex) {
                    $('.lock-body').css('background-image', 'url(' + bgimg + ')');
                    //window.localStorage.setItem("lockscreen", true);
                    //setData(true, 'lockLoginScreen');
                    /*
                    var index = winui.sysTime('#date_time', '<p id="time">!HH:!mm</p><p id="date">!M月!d日,星期!w</p>');
                    var showUnlockDiv = function () {
                        winui.stopSysTime(index);
                        $('#date_time').toggleClass('layui-hide');
                        $('#login_div').toggleClass('layui-hide');
                        //解绑旧的鼠标键盘事件
                        $(document).off('mouseup', docMouseup);
                        $(document).off(' keydown', docKeydown);
                        //绑定新的键盘事件
                        $(document).on('keydown', function (e) {
                            var ev = document.all ? window.event : e;
                            if (ev.keyCode == 27) {
                                //按下ESC
                                showTimeDiv();
                            }
                        });
                        let au = document.createElement("audio");
                        au.preload = "auto";
                        au.src = './component/winui/audio/unlock.mp3';
                        au.play();
                    }, showTimeDiv = function () {
                        index = winui.sysTime('#date_time', '<p id="time">!HH:!mm</p><p id="date">!M月!d日,星期!w</p>')
                        $('#date_time').toggleClass('layui-hide');
                        $('#login_div').toggleClass('layui-hide');
                        //解绑旧的鼠标键盘事件
                        $(document).off('keydown');
                        //绑定新事件
                        $(document).on('mouseup', docMouseup);
                        $(document).on('keydown', docKeydown);
                    }, docMouseup = function (e) {
                        if (!e) e = window.event;
                        if (e.button == 0) {
                            //左键
                            showUnlockDiv();
                        }
                    }, docKeydown = function (e) {
                        var ev = document.all ? window.event : e;
                        if (ev.keyCode == 13) {
                            //按下回车
                            showUnlockDiv();
                        }
                    }
                    $(document).on('mouseup', docMouseup);
                    $(document).on('keydown', docKeydown);
                    */
                    let changeImg = () => {
                        $('#codeImage').attr('src', '/server/login/captcha?t=' + Math.random());
                    };
                    changeImg();
                    $('#codeImage').click(() => {
                        changeImg();
                    });
                    // let cacheData = winui.getData(loginKey);
                    // if (cacheData && cacheData.username) {
                    //     $('#username').val(cacheData.username);
                    //     if (cacheData.password) {
                    //         $('#password').val(cacheData.password);
                    //     }
                    // }
                    let setDown = (e) => {
                        if (e.keyCode == 13) {
                            $("#regbtn").trigger("click");
                            return false
                        }
                    }
                    //$('#password').on('keydown', setDown);
                    $('#captcha').on('keydown', setDown);

                    $('#loginarea').click( e => {
                        layer.closeAll();
                        winui.loginNum = 0;
                        layui.desklogin.showBox();
                    })
                    let utype = 2;
                    $("#gt").click( e => {
                        utype = 2
                    })
                    $("#qt").click( e => {
                        utype = 3
                    })
                    //解锁点击
                    //form.on('submit(unlock)', function (data) {
                    $('#regbtn').click( e => {
                        let data = {
                            username: $('#username').val(),
                            password: $('#password').val(),
                            captcha: $('#captcha').val(),
                            utype : utype
                        }
                        //console.log(data);
                        //return false;
                        if (data.username == '') {
                            layer.msg('用户名不能为空');
                            return false;
                        }
                        if (data.password == '') {
                            layer.msg('密码不能为空');
                            return false;
                        }
                        if(data.password.length < 6) {
                            layer.msg('密码长度不能小于6位');
                            return false;
                        }
                        if ($('#repassword').val() != data.password) {
                            layer.msg('两次密码输入不一致');
                            return false;
                        }
                        if (data.captcha == '') {
                            layer.msg('验证码不能为空');
                            return false;
                        }
                        if (!data.utype) {
                            layer.msg('请选择用户类型');
                            return false;
                        }
                        /// 登录
                        let postData = {
                            password: data.password,
                            username: data.username,
                            captcha: data.captcha,
                            utype : data.utype
                        };
                        //console.log(postData)
                        __post('login/reg', postData, res => {
                            //console.log(res)
                            if (res.code != 0) {
                                layer.msg(res.message, { icon: 2 });
                                return false;
                            }
                            layer.msg("注册成功", { icon: 1 });
                            setTimeout(() => {
                                layer.closeAll();
                                winui.loginNum = 0;
                                layui.desklogin.showBox();
                            }, 3000);
                            
                            //console.log(res)
                            // let au = document.createElement("audio");
                            // au.preload = "auto";
                            // //au.autoplay = "autoplay";
                            // au.src = './component/winui/audio/login.mp3';
                            // //au.muted = true;
                            // au.play();

                            // setToken(res.data);
                            // winui.setData(loginKey, {
                            //     username: postData.username,
                            //     password: postData.password,
                            //     //lockLoginScreen : false
                            // });
                            //console.log(winui)
                            //winui.desktop.data = res.routeData.desktops;
                            //winui.desktop.init()
                            //winui.start.init()
                            
                            winuiInit();
                        }, err => {
                            if (err.code == 201) {
                                changeImg();
                            }
                        })
                        return false;
                    });
                }
            });
        });
    }
    exports('deskreg', { showBox});
})
layui.define(['layer', 'winui', 'laytpl', 'desklogin','desklock'], function (exports) {
    let $ = layui.$,
        layer = layui.layer,
        desklogin = layui.desklogin,
        desklock = layui.desklock,
        //winui = layui.winui,
        laytpl = layui.laytpl;
    let loginOut = () => {
        winui.window.confirm('确认注销吗?', { icon: 3, title: '提示' }, function (index) {
            //winui.window.msg('执行注销操作，返回登录界面');
            layer.close(index);
            let token = getToken()
            if (!token) {
                layer.msg('token缺失！');
                return;
            }
            $.ajax({
                method: 'get',
                headers: getHeader(),
                url: apiUrl + 'admin/loginOut',
                success: (res) => {
                    let au = document.createElement("audio");
                    au.preload = "auto";
                    au.src = './component/winui/audio/out.mp3';
                    au.play();
                    winui.loginNum = 0;
                    desklogin.showBox();
                    loginOutToken();
                    //localStorage.setItem('lockscreen', true);
                    //winui.lockScreen();
                    
                }
            })
        });
    }
    //注销登录
    $('.logout').on('click', function () {
        winui.hideStartMenu();
        loginOut();
    });

    if (window.localStorage.getItem("lockscreen") == "true") {
        desklock.showBox();
    }

    let toolsAction = {
        changeBg: () => {
            let id = parseInt(Math.random() * 21 + 1, 10);
            let bgSrc = '/admin/component/winui/images/bg/img' + id + '.webp';
            winui.resetBg(bgSrc);
        },
        fullScreen: () => {
            winui.fullScreen(document.documentElement);
        },
        devTools: () => {
            winui.window.open({
                id: 'godocmstools',
                type: 2,
                title: '开发工具集',
                shade: 0,
                moveOut: true,
                area: ['80%', '80%'],
                anim: 1,
                content: '/admin/tools/index.html',
                offset: 'auto'  //居中
                , min: true  //显示最小化按钮
                , max: true  //显示最大化按钮
                , refresh: true    //显示刷新按钮
            });
        },
        toolsTodo: () => {
            winui.window.open({
                id: 'godocmstodos',
                type: 2,
                title: '便签',
                shade: 0,
                moveOut: true,
                area: ['80%', '80%'],
                anim: 1,
                content: '/admin/tools/todo/index.html',
                offset: 'auto'  //居中
                , min: true  //显示最小化按钮
                , max: true  //显示最大化按钮
                , refresh: true    //显示刷新按钮
            });
        },
        toolsClock: () => {
            winui.window.open({
                id: 'godocmsclocks',
                type: 2,
                title: '番茄时钟',
                shade: 0,
                moveOut: true,
                area: ['580px', '400px'],
                anim: 1,
                content: '/admin/tools/clock/index.html',
                offset: 'auto'  //居中
                , min: true  //显示最小化按钮
                , max: true  //显示最大化按钮
                , refresh: true    //显示刷新按钮
            });
        },
        toolsBaiban: () => {
            winui.window.open({
                id: 'godocmsbaiban',
                type: 2,
                title: '办公白板',
                shade: 0,
                moveOut: true,
                area: ['90%', '90%'],
                anim: 1,
                content: '/admin/tools/baiban/index.html',
                offset: 'auto'  //居中
                , min: true  //显示最小化按钮
                , max: true  //显示最大化按钮
                , refresh: true    //显示刷新按钮
            });
        },
        toolsCaculater: () => {
            winui.window.open({
                id: 'godocmscalculater',
                type: 2,
                title: '计算器',
                shade: 0,
                moveOut: true,
                area: ['380px', '600px'],
                anim: 1,
                content: '/admin/tools/calculater/index.html',
                offset: 'auto'  //居中
                , min: true  //显示最小化按钮
                , max: true  //显示最大化按钮
                , refresh: true    //显示刷新按钮
            });
        },
        toolsCalendar: () => {
            winui.window.open({
                id: 'godocmstoolsCalendar',
                type: 2,
                title: '日历',
                shade: 0,
                moveOut: true,
                area: ['750px', '520px'],
                anim: 1,
                content: '/admin/tools/rili/index.html',
                offset: 'auto'  //居中
                , min: true  //显示最小化按钮
                , max: true  //显示最大化按钮
                , refresh: true    //显示刷新按钮
            });
        },
        changeTheme: () => {
            location.href = 'index.html';
        },
        lockScreen: () => {
            desklock.showBox()
        }

    }
    let toolsObj = [
        {
            tips: '日历',
            icon: 'fa-calendar',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.toolsCalendar
        },
        {
            tips: '计算器',
            icon: 'fa-calculator',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.toolsCaculater
        },
        {
            tips: '开发工具',
            icon: 'fa-gavel',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.devTools
        },
        {
            tips: '切换风格',
            icon: 'fa-paper-plane-o',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.changeTheme
        },
        {
            tips: '便签',
            icon: 'fa-clock-o',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.toolsTodo
        },
        {
            tips: '番茄时钟',
            icon: 'fa-bell',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.toolsClock
        },
        {
            tips: '切换壁纸',
            icon: 'fa-television',
            startcss: 'winui-tile-normal',
            clickActioin: toolsAction.changeBg
        },
        {
            tips: '办公白板',
            icon: 'fa-file-archive-o',
            startcss: 'winui-tile-long',
            clickActioin: toolsAction.toolsBaiban

        }
    ];
    laytpl($('#startCenterTpl').html()).render(toolsObj, function (html) {
        $('#winui-tilebox-body').html(html)
        let clickAct = (obj) => {
            let id = $(obj).attr('data-id') * 1;
            //console.log(id)
            if (toolsObj[id])
                toolsObj[id]["clickActioin"]()
        }
        $('#winui-tilebox-body').on('click', e => {
            if ($(e.target).hasClass('winui-tile')) {
                clickAct(e.target)
            }
            else if ($(e.target).parent().hasClass('winui-tile')) {
                clickAct($(e.target).parent())
            }
        })
    });
    //扩展桌面助手工具
    let menutextList = [
        {
            tips: '全屏',
            icon: 'fa-clone',
            clickActioin: toolsAction.fullScreen
        },
        {
            tips: '锁屏',
            icon: 'fa-lock',
            clickActioin: toolsAction.lockScreen
        },
        {
            tips: '注销登录',
            icon: 'fa-power-off',
            clickActioin: function (e) {
                loginOut();
            }
        }
    ];

    winui.helper.addTool(toolsObj.concat(menutextList));
    $('#rightmenu-screen').on('click', (e) => {
        toolsAction.fullScreen()
    });
    $('#rightmenu-loginout').on('click', (e) => {
        loginOut()
    });
    $('#rightmenu-lock').on('click', e => {
        desklock.showBox()
    })
    let showHelperKey = '_windowsHelperTips'
    let windowShowHelper = localStorage.getItem(showHelperKey);
    if (!windowShowHelper) {
        $('.layer-ext-winhelper').hide()
    }
    $('#rightmenu-showhelper').on('click', () => {
        let windowShowHelper = localStorage.getItem(showHelperKey);
        if (!windowShowHelper) {
            $('.layer-ext-winhelper').show()
            localStorage.setItem(showHelperKey, 1)
            $('#rightmenu-showhelper').text('隐藏桌面助手')
        } else {
            $('.layer-ext-winhelper').hide()
            localStorage.removeItem(showHelperKey)
            $('#rightmenu-showhelper').text('显示桌面助手')
        }
    })
    exports('deskmenu', {});
})
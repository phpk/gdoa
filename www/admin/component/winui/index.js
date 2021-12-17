layui.config({
    base: '/admin/component/winui/' //指定 winui 路径
    , version: '1.0.0'
}).extend({  //指定js别名
    window: 'js/winui.window',
    desktop: 'js/winui.desktop',
    start: 'js/winui.start',
    helper: 'js/winui.helper'
}).define(['window', 'desktop', 'start', 'helper', 'layer', 'laytpl'], function (exports) {
    var $ = layui.jquery,
        laytpl = layui.laytpl,
        layer = layui.layer;

    $(function () {
        // console.log(localStorage.getItem('lockscreen'))
        // if(localStorage.getItem('lockscreen')) {
        //     winui.lockScreen();
        // }

        /*
        winui.window.msg('Welcome To GodoCms', {
            time: 4500,
            offset: '40px',
            btn: ['点击进入全屏'],
            btnAlign: 'c',
            yes: function (index) {
                winui.fullScreen(document.documentElement);
                layer.close(index);
            }
        });*/

        //winui.window.open({
        //    id: '公告',
        //    type: 1,
        //    title: '演示公告',
        //    content: '<p style="padding:20px;"></p>',
        //    area: ['400px', '400px']
        //});
        // 判断是否显示锁屏（这个要放在最后执行）
        let powerOnBox = document.querySelector(".powerOnBox");
        powerOnBtn.addEventListener("mousedown", _ => {
            let au = document.createElement("audio");
            au.preload = "auto";
            //au.autoplay = "autoplay";
            au.src = './component/winui/audio/startup.mp3';
            //au.muted = true;
            au.play();
            setTimeout(() => {
                powerOnBox.remove();
            }, 2000);

            winui.config({
                settings: layui.data('winui').settings || {
                    color: 32,
                    taskbarMode: 'bottom',
                    startSize: 'sm',
                    bgSrc: '/admin/component/winui/images/bg/img1.webp',
                    lockBgSrc: '/admin/component/winui/images/bg/img2.webp'
                },  //如果本地配置为空则给默认值
                desktop: {
                    options: {},    //可以为{}  默认 请求 json/desktopmenu.json
                    done: function (desktopApp) {
                        //desktopApp.ondblclick(function (id, elem) {
                        desktopApp.onclick(function (id, elem) {
                            OpenWindow(elem);
                        });
                        desktopApp.contextmenu({
                            item: ["打开", "删除"],
                            item1: function (id, elem) {
                                OpenWindow(elem);
                            },
                            item2: function (id, elem, events) {
                                //winui.window.msg('删除回调');
                                $(elem).remove();
                                //从新排列桌面app
                                events.reLocaApp();
                            },
                            item3: function (id, elem, events) {
                                winui.window.msg('自定义回调');
                            }
                        });
                    }
                },
                menu: {
                    options: {
                        url: '/admin/component/winui/json/allmenu.json',
                        method: 'get',
                        data: { nihaoa: '' }
                    },
                    done: function (menuItem) {
                        //监听开始菜单点击
                        menuItem.onclick(function (elem) {
                            OpenWindow(elem);
                        });
                        menuItem.contextmenu({
                            item: [{
                                icon: 'fa-cog'
                                , text: '设置'
                            }, {
                                icon: 'fa-close'
                                , text: '关闭'
                            }, {
                                icon: 'fa-qq'
                                , text: '右键菜单'
                            }],
                            item1: function (id, elem) {
                                //设置回调
                                console.log(id);
                                console.log(elem);
                            },
                            item2: function (id, elem) {
                                //关闭回调
                            },
                            item3: function (id, elem) {
                                winui.window.msg('自定义回调');
                            }
                        });
                    }
                }
            }).init({
                audioPlay: true, //是否播放音乐（开机音乐只会播放一次，第二次播放需要关闭当前页面从新打开，刷新无用）
                renderBg: true //是否渲染背景图 （由于js是写在页面底部，所以不太推荐使用这个来渲染，背景图应写在css或者页面头部的时候就开始加载）
            }, function () {
                //初始化完毕回调
                //this.render()
            });

            $('.startmenu').on('click', e => {
                //console.log($(e.target).parent())
                let id = $(e.target).parent().attr('data-id');
                //console.log(id)
                $('.winui-menu li').each((i, d) => {
                    //console.log(d)
                    $(d).hide();
                })
                $('.startareali_' + id).each((i, d) => {
                    $(d).show();
                })
            })

        })

    });

    //开始菜单磁贴点击
    $('.winui-tile').on('click', function () {
        OpenWindow(this);
    });

    //开始菜单左侧主题按钮点击
    $('.winui-start-item.winui-start-individuation').on('click', function () {
        winui.window.openTheme();
    });

    //打开窗口的方法（可自己根据需求来写）
    function OpenWindow(menuItem) {
        var $this = $(menuItem);
        //console.log($this)
        var url = $this.attr('win-url');
        var title = $this.attr('win-title');
        var id = $this.attr('win-id');
        var type = parseInt($this.attr('win-opentype'));
        var maxOpen = parseInt($this.attr('win-maxopen')) || -1;
        if (url == 'theme') {
            winui.window.openTheme();
            return;
        }
        //console.log(url, title, id)
        if (!url || !title || !id) {
            //winui.window.msg('菜单配置错误（菜单链接、标题、id缺一不可）');
            return;
        }

        var content;
        if (type === 1) {
            /*
            console.log(url)
            layer.open({
                type: 2,
                title: title,
                shade: 0.1,
                offset: 'rt',
                area: ['80%', '80%'],
                anim: 1,
                maxmin: true,
                content: url
            });*/

            $.ajax({
                type: 'get',
                url: url,
                async: false,
                success: function (data) {
                    content = data;
                },
                error: function (e) {
                    var page = '';
                    switch (e.status) {
                        case 404:
                            page = '404.html';
                            break;
                        case 500:
                            page = '500.html';
                            break;
                        default:
                            content = "打开窗口失败";
                    }
                    $.ajax({
                        type: 'get',
                        url: '/admin/views/error/' + page,
                        async: false,
                        success: function (data) {
                            content = data;
                        },
                        error: function () {
                            layer.close(load);
                        }
                    });
                }
            });

        } else {
            content = url;
        }
        //核心方法（参数请看文档，config是全局配置 open是本次窗口配置 open优先级大于config）
        winui.window.config({
            anim: 0,
            miniAnim: 0,
            maxOpen: -1
        }).open({
            id: id,
            type: type,
            title: title,
            content: content
            //,area: ['70vw','80vh']
            //,offset: ['10vh', '15vw']
            , maxOpen: maxOpen
            //, max: false
            //, min: false
            , refresh: true
        });
    }
    let loginOut = () => {
        winui.window.confirm('确认注销吗?', { icon: 3, title: '提示' }, function (index) {
            //winui.window.msg('执行注销操作，返回登录界面');
            layer.close(index);

            _get(layui, 'admin/loginOut', res => {
                let au = document.createElement("audio");
                au.preload = "auto";
                au.src = './component/winui/audio/out.mp3';
                au.play();
                loginOutToken();
                localStorage.setItem('lockscreen', true);
                winui.lockScreen();
            })
        });
    }
    //注销登录
    $('.logout').on('click', function () {
        winui.hideStartMenu();
        loginOut();
    });

    if (window.localStorage.getItem("lockscreen") == "true") {
        winui.lockScreen();
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
                area: ['550px', '320px'],
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
        }

    }
    let toolsObj = [
        {
            tips: '日历',
            icon: 'fa-calendar',
            startcss: 'winui-tile-normal',
            click: toolsAction.toolsCalendar
        },
        {
            tips: '计算器',
            icon: 'fa-calculator',
            startcss: 'winui-tile-normal',
            click: toolsAction.toolsCaculater
        },
        {
            tips: '开发工具',
            icon: 'fa-gavel',
            startcss: 'winui-tile-normal',
            click: toolsAction.devTools
        },
        {
            tips: '切换风格',
            icon: 'fa-paper-plane-o',
            startcss: 'winui-tile-normal',
            click: toolsAction.changeTheme
        },
        {
            tips: '便签',
            icon: 'fa-clock-o',
            startcss: 'winui-tile-normal',
            click: toolsAction.toolsTodo
        },
        {
            tips: '番茄时钟',
            icon: 'fa-bell',
            startcss: 'winui-tile-normal',
            click: toolsAction.toolsClock
        },
        {
            tips: '切换壁纸',
            icon: 'fa-television',
            startcss: 'winui-tile-normal',
            click: toolsAction.changeBg
        },
        {
            tips: '办公白板',
            icon: 'fa-file-archive-o',
            startcss: 'winui-tile-long',
            click: toolsAction.toolsBaiban

        }
    ];
    laytpl($('#startCenterTpl').html()).render(toolsObj, function (html) {
        $('#winui-tilebox-body').html(html)
        $('#winui-tilebox-body').on('click', '.winui-tile', e => {
            let id = $(e.target).attr('data-id')
            //console.log(id)
            toolsObj[id].click()
        })
    });
    
    toolsObj.push({
        tips: '全屏',
        icon: 'fa-clone',
        startcss: 'winui-tile-normal',
        click: toolsAction.fullScreen
    });
    toolsObj.push({
        tips: '注销登录',
        icon: 'fa-power-off',
        click: function (e) {
            loginOut();
        }
    });
    //扩展桌面助手工具
    winui.helper.addTool(toolsObj);
    layui.admin = {};
    layui.admin.addTab = (id, title, content) => {
        //console.log(id)
        winui.window.open({
            id: id.toString(),
            type: 2,
            title: title,
            content: content,
            shade: 0,
            offset: 'auto',
            area: ['90%', '90%'],
            anim: 1,
            moveOut: true,
            maxmin: true,
            refresh: true
            //zIndex: layer.zIndex + 10

        });
    }
    exports('index', {});
});
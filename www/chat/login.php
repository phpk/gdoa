<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>登录</title>
    <link rel="stylesheet" href="<?php echo base_url()?>static/login/css/reset.css" />
    <link rel="stylesheet" href="<?php echo base_url()?>static/login/css/common.css" />
    <link rel="stylesheet" href="<?php echo base_url()?>static/login/css/font-awesome.min.css" />
    <style>
        .login_wrap{
            background-image: url(../../static/chat/images/bg.jpg);
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
            background-position: center center;
            background-size: cover;
            display: flex;
            justify-content: center;
        }
    </style>
</head>
<body>
<div class="wrap login_wrap">
    <div class="content">
        <div class="logo" style="height: 250px;"></div>
        <div class="login_box">

            <div class="login_form">
                <div class="login_title" style="color: #3c8dbc">
                    登录
                </div>
                <form id="login">
                    <div class="form_text_ipt">
                        <input name="post[username]" id="username" type="text" placeholder="用户名">
                    </div>
                    <div class="form_text_ipt">
                        <input name="post[password]" id="password" type="password" placeholder="密码">
                    </div>
                    <div class="form_check_ipt">
<!--                        <div class="left check_left">-->
<!--                            <label><input name="" type="checkbox"> 下次自动登录</label>-->
<!--                        </div>-->
<!--                        <div class="right check_right">-->
<!--                            <a href="#">忘记密码</a>-->
<!--                        </div>-->
                    </div>
                    <div class="form_btn">
                        <button type="button" onclick="doLogin()" style="outline: none;background-color: #3c8dbc">登录</button>
                    </div>
<!--                    <div class="form_reg_btn">-->
<!--                        <span>还没有帐号？</span><a href="register.html">马上注册</a>-->
<!--                    </div>-->
                    <input type="hidden" name="<?php echo $csrf['name'];?>" value="<?php echo $csrf['hash'];?>">
                </form>
                <div class="other_login" style="height: 50px;"></div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="<?php echo base_url()?>static/login/js/jquery.min.js" ></script>
<script type="text/javascript" src="<?php echo base_url()?>static/login/js/common.js" ></script>
<script src="<?php echo base_url()?>static/plugins/layer/layer.js" type="text/javascript"></script>
<script>
    var siteUrl = '<?php echo site_url("home")?>';
    function doLogin() {
        loadT = layer.msg('正在提交数据...', { time: 0, icon: 16, shade: [0.3, '#000'] });
        $.post(siteUrl + "/chat/doLogin", $("#login").serialize(), function (res) {
            if(res.code == 0) {
                layer.msg(res.msg, {icon: 1});
                window.location.href=siteUrl+"/chat/index";
            }else{
                layer.msg(res.msg, {icon: 2});
            }
        }, "json");
    }
</script>
</body>
</html>

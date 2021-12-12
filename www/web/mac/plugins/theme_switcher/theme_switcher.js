
$(function () {

    //此处预定义了背景数据，其实可以用ajax获取
    var themes = [
        {
            "pic": "./plugins/theme_switcher/bg/bg1.jpg",
            "thumb": "./bg/bg1_small.jpg",
            "title": " Mojave Night"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg2.jpg",
            "thumb": "./bg/bg2_small.jpg",
            "title": "莫哈韦沙漠风景白天"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg3.jpg",
            "thumb": "./bg/bg3_small.jpg",
            "title": "扬帆起航"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg4.jpg",
            "thumb": "./bg/bg4_small.jpg",
            "title": "Abstract壁纸"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg5.jpg",
            "thumb": "./bg/bg5_small.jpg",
            "title": "暗色沙漠壁纸"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg6.jpg",
            "thumb": "./bg/bg6_small.jpg",
            "title": "莫哈韦沙漠"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg7.jpg",
            "thumb": "./bg/bg7_small.jpg",
            "title": "沙漠风景"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg8.jpg",
            "thumb": "./bg/bg8_small.jpg",
            "title": "沙漠风光"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg9.jpg",
            "thumb": "./bg/bg9_small.jpg",
            "title": "白天沙漠风景"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg10.jpg",
            "thumb": "./bg/bg10_small.jpg",
            "title": "Sierra风景壁纸"
        },
        {
            "pic": "./plugins/theme_switcher/bg/bg11.jpg",
            "thumb": "./bg/bg11_small.jpg",
            "title": "秋天风景"
        }
    ];

    var theme_area=$("#theme_area");
    theme_area.on('click','.theme_setting',function () {
        var pic=$(this).data('pic');
		if(!Win10_parent.isSmallScreen()){
			Win10_parent.setBgUrl({main:pic});
		}else{
			Win10_parent.setBgUrl({mobile:pic});
		}
        //此处你也许想用ajax把修改信息保存到服务器。。。

    });




    themes.forEach(function (t) {
        var theme=$("<a href=\"javascript:;\" data-pic=\""+t.pic+"\" class=\"theme_setting \">\n" +
            "            <div class=\"theme_icon\"><img src=\""+t.thumb+"\"></div>\n" +
            "            <div class=\"theme_text\">"+t.title+"</div>\n" +
            "        </a>");
        theme_area.append(theme)
    });


});

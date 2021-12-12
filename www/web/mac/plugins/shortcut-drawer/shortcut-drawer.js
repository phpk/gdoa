//该插件提供桌面图标二级分类的支持
Win10.onReady(function () {
    //注册打开事件
    (function () {
        // 注册事件委派 打开url窗口
        $('body').on('click', '.shortcut-drawer.win10-open-window', function () {
            //>> 获取当前点击的对象
            $this = $(this);
            //>> 判断url地址是否为空 如果为空 不予处理
            if ($this.data('url') !== "") {
                //>> 获取弹窗标题
                var title = $this.data('title') || '',
                    areaAndOffset, icon;
                //>> 判断是否有标题图片
                var bg = $this.data('icon-bg') ? $this.data('icon-bg') : '';
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
                        areaAndOffset = eval(areaAndOsffset);
                    }
                }
                //>> 调用win10打开url方法
                Win10.openUrl($this.data('url'), icon, title, areaAndOffset);
            }
        })
    })(),


        $('body').on('click', '.win10-drawer', function () {
            var content = $(this).find('.win10-drawer-box').html();
            var title = $(this).children('.title').html();
            var index = layer.open({
                type: 1,
                shadeClose: true,
                skin: 'drawer',
                area: [Win10.isSmallScreen() ? "80%" : "60%", "50%"],
                closeBtn: 0,
                title: title,
                content: content,
            });
            var layero = Win10.getLayeroByIndex(index);
            layero.find('.shortcut-drawer').click(function () {
                layer.close(index);
            })
        })
});
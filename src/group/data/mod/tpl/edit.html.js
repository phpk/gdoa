module.exports = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>添加{{name}}</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" />
    <link rel="stylesheet" href="/static/ui/css/ui.css" />
</head>
<body>
<form class="layui-form" action="" lay-filter="editform">
    <div class="mainBox">
        <div class="main-container">
            <div class="main-container">
            <div class="layui-form-item">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-block">
                    <input type="text" name="name" lay-verify="required|len" autocomplete="off" min="3" placeholder="请输入名称" class="layui-input">
                </div>
            </div>
			<div class="layui-form-item layui-form-text">
				<label class="layui-form-label">备注</label>
				<div class="layui-input-block">
				<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
				</div>
			</div>

            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="button-container">
			<input type="hidden" name="id" />
            <button type="submit" class="pear-btn pear-btn-primary pear-btn-sm" lay-submit="" lay-filter="{{tags}}-save">
                <i class="layui-icon layui-icon-ok"></i>
                提交
            </button>
        </div>
    </div>
</form>
<script src="../config.js"></script>
<script src="/static/layui/layui.js"></script>
<script src="/static/ui/ui.js"></script>
<script>
    layui.use(['form','layer','tree'], function () {
        let form = layui.form
            , layer = layui.layer
			, $ = layui.$
            , req = _req();
        form.verify({
            len : (val, item) => {
                let min = item.getAttribute("min")
                if(val.length < min) {
                    return '长度不能小于' + min;
                }
            }
        })
        if(req.id) {
            //渲染
            _get(layui, '{{tags}}/editBefore?id=' + req.id, res => {
                form.val('editform', res)
            });
        }

        //监听提交
        form.on('submit({{tags}}-save)', function (data) {
			data = data.field;
            let postUrl;
            if(req.id) {
                postUrl = '{{tags}}/edit';
            }else{
                postUrl = '{{tags}}/add';
            }
			_post(layui, postUrl, data, res => {
				//console.log(res)
				parent.layui.table.reload("{{tags}}-table");
				parent.layer.close(parent.layer.getFrameIndex(window.name));//关闭当前页

			})

            return false;
        });

    });
</script>

</body>
</html>`
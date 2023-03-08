module.exports = `<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title>{{name}}分类管理</title>
	<link rel="stylesheet" href="../../component/ui/css/ui.css" />
</head>

<body class="pear-container">
	<div class="layui-btn-container" style="display: inline-block;">
        <button class="layui-btn layui-btn-sm layui-btn-danger" id="add_cate_{{key}}">
            <i class="layui-icon layui-icon-add-1"></i>
            新增
        </button>
    </div>
	<div class="layui-card">
		<div class="layui-card-body">
			<table id="cate_{{key}}-table" lay-filter="cate_{{key}}-table"></table>
		</div>
	</div>

	<script type="text/html" id="cate_{{key}}-enable">
            <input type="checkbox" name="status" value="{{d.id}}" lay-skin="switch" lay-text="启用|不启用" lay-filter="status"  {{ d.status == 1 ? 'checked' : '' }}/>
        </script>

	<script type="text/html" id="cate_{{key}}-bar">
			<button class="pear-btn pear-btn-primary pear-btn-sm" lay-event="edit"><i class="layui-icon layui-icon-edit"></i></button>
		    <button class="pear-btn pear-btn-danger pear-btn-sm" lay-event="remove"><i class="layui-icon layui-icon-delete"></i></button>
		</script>
	<script type="text/html" id="cate_{{key}}-time">
			{{layui.util.toDateString(d.add_time*1000, 'yyyy-MM-dd HH:mm:ss')}}
		</script>
	<script src="../../config/config.js"></script>
	<script src="../../component/layui/layui.js"></script>
	<script src="../../component/ui/ui.js"></script>
	<script>
		layui.use(['table', 'form', 'jquery', 'common', 'treeTable'], function () {
			let table = layui.table;
			let form = layui.form;
			let $ = layui.jquery;
			let common = layui.common;
			let treeTable = layui.treeTable;

			let MODULE_PATH = "./";
			treeTable.render({
				elem: '#cate_{{key}}-table',
				toolbar: '#cate_{{key}}-toolbar',
				tree: {
					iconIndex: 1,  // 折叠图标显示在第几列
					idName: 'id',  // 自定义id字段的名称
					pidName: 'pid',  // 自定义标识是否还有子节点的字段名称
					haveChildName: 'haveChild',  // 自定义标识是否还有子节点的字段名称
					isPidData: true  // 是否是pid形式数据
				},
				cols: [
					{
						field: 'id',
						title: 'ID'
					}, {
						field: 'name',
						minWidth: 200,
						title: '名称'
					}, {
						field: 'order_num',
						title: '排序'
					}, {
						field: 'status',
						title: '是否启用',
						templet: '#cate_{{key}}-enable'
					}, {
						title: '操作',
						templet: '#cate_{{key}}-bar',
						width: 150,
						align: 'center'
					}
				],
				reqData: function (data, callback) {
					let pid = data ? data.id : 0;
					_get(layui, '{{key}}/cateList?pid=' + pid, function (res) {
						//console.log(res)
						callback(res.data);  // 参数是数组类型
					});
				}
			});
			treeTable.on('tool(cate_{{key}}-table)', function (obj) {
				if (obj.event === 'remove') {
					window.remove(obj);
				} else if (obj.event === 'edit') {
					window.edit(obj);
				}
			})

			treeTable.on('toolbar(cate_{{key}}-table)', function (obj) {
				if (obj.event === 'add') {
					window.add();
				} else if (obj.event === 'refresh') {
					window.refresh();
				}
			});
			form.on('switch(status)', function (data) {
				let v = 0;
				if (data.elem.checked) v = 1;
				let postData = {
					id: data.value,
					status: v
				};
				_post(layui, '{{key}}/cateEnable', postData, res => {
					//console.log(res)
				}, err => {
					$(data.elem).prop('checked', false);
					form.render('checkbox');
				})
			});
			$('#add_cate_{{key}}').click(function () {
				layer.open({
					type: 2,
					title: '新增',
					shade: 0.1,
					offset: 'rt',
					area: ['80%', '100%'],
					anim: 1,
					maxmin: true,
					content: MODULE_PATH + 'cateEdit.html'
				});
			})

			window.edit = function (obj) {
				layer.open({
					type: 2,
					title: '修改',
					shade: 0.1,
					offset: 'rt',
					area: ['80%', '100%'],
					anim: 1,
					maxmin: true,
					content: MODULE_PATH + 'cateEdit.html?id=' + obj.data.id
				});
			}
			window.remove = function (obj) {
				layer.confirm('确定要删除', { icon: 3, title: '提示' }, function (index) {
					layer.close(index);
					_post(layui, '{{key}}/cateDel', { id: obj.data.id }, res => {
						layer.msg('删除成功', { icon: 1, time: 1000 }, () => {
							obj.del();
						});
					}, err => {
						//layer.msg('删除失败',{icon:2,time:1000});
					})
				});
			}

		})
	</script>
</body>

</html>`
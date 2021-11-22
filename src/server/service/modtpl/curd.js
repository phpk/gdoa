let controllerTpl = `const Base = require('./base.js');
/**
 * @class
 * @apiDefine {{tags}} {{name}}管理
 */
module.exports = class extends Base {
    /**
     * @api {get} {{tags}}/list {{name}}列表
     * @apiGroup set
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('{{tags}}').where(wsql).page(page, limit).select();
        let count = await this.model('{{tags}}').where(wsql).count();
        return this.success({ list, count })
    }
    /**
     * @api {get} {{tags}}/add 添加{{name}}
     * @apiGroup {{tags}}
     *
     * @apiHeader {string} rttoken 必填
     *
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async addAction() {
        let post = this.post();
        let id = await this.model('{{tags}}').add(post);
        return this.success(id);
    }
    /**
     * @api {get} {{tags}}/editBefore {{name}}编辑前
     * @apiGroup {{tags}}
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id {{name}}id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('{{tags}}').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
    /**
     * @api {get} {{tags}}/eidt 编辑{{name}}
     * @apiGroup {{tags}}
     *
     * @apiHeader {string} rttoken 必填
     *
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async editAction() {
        let post = this.post();
        let has = await this.model('{{tags}}').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('{{tags}}').update(post);
        return this.success()
    }
    /**
     * @api {get} {{tags}}/delete 删除{{name}}
     * @apiGroup {{tags}}
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id {{name}}id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async deleteAction() {
        let id = this.post('id');
        if (!await this.hasData('{{tags}}', { id }))
            return this.fail('数据不存在')
        await this.model('{{tags}}').where({ id }).delete()

        return this.success()
    }
}`;
let logicTpl = `module.exports = class extends think.Logic {
    listAction() {
        this.allowMethods = 'get';
        this.rules = {
            page: {
                default: 1,
                int: { min: 1 },
                aliasName: '页码'
            },
            limit: {
                default: 20,
                int: true,
                aliasName: '页数'
            },
            param: {
                aliasName: '查询字段'
            }
        }
    }
    deleteAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
    addAction() {
        this.allowMethods = 'post';
        this.rules = {}
    }
    editBeforeAction() {
        this.allowMethods = 'get';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
    editAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
}`;
let listTpl = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>{{name}}管理</title>
		<link rel="stylesheet" href="../../component/ui/css/ui.css" />
	</head>
	<body class="pear-container">
		<div class="layui-card">
			<div class="layui-card-body">
				<form class="layui-form" action="">
					<div class="layui-form-item">
						<div class="layui-form-item layui-inline">
							<label class="layui-form-label">名称</label>
							<div class="layui-input-inline">
								<input type="text" name="title" placeholder="" class="layui-input">
							</div>
						</div>
						<div class="layui-form-item layui-inline">
							<button class="pear-btn pear-btn-md pear-btn-primary" lay-submit lay-filter="user-query">
								<i class="layui-icon layui-icon-search"></i>
								查询
							</button>
							<button type="reset" class="pear-btn pear-btn-md" lay-filter="user-reset" lay-submit>
								<i class="layui-icon layui-icon-refresh"></i>
								重置
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="layui-card">
			<div class="layui-card-body">
				<table id="{{tags}}-table" lay-filter="{{tags}}-table"></table>
			</div>
		</div>

		<script type="text/html" id="{{tags}}-toolbar">
			<button class="pear-btn pear-btn-primary pear-btn-md" lay-event="add">
		        <i class="layui-icon layui-icon-add-1"></i>
		        新增
		    </button>

		</script>

		<script type="text/html" id="{{tags}}-bar">
			<button class="pear-btn pear-btn-primary pear-btn-sm" lay-event="edit"><i class="layui-icon layui-icon-edit"></i></button>
		    <button class="pear-btn pear-btn-danger pear-btn-sm" lay-event="remove"><i class="layui-icon layui-icon-delete"></i></button>
		</script>

		<script type="text/html" id="user-enable">
			<input type="checkbox" name="status" value="{{d.id}}" lay-skin="switch" lay-text="启用|禁用" lay-filter="{{tags}}-enable" {{ d.status== 0 ? 'checked' : '' }} />
		</script>
		<script type="text/html" id="{{tags}}-time">
			{{layui.util.toDateString(d.add_time*1000, 'yyyy-MM-dd HH:mm:ss')}}
		</script>
		<script src="../../config/config.js"></script>
		<script src="../../component/layui/layui.js"></script>
		<script src="../../component/ui/ui.js"></script>
		<script>
			layui.use(['table', 'form', 'jquery','common'], function() {
				let table = layui.table;
				let form = layui.form;
				let $ = layui.jquery;
				let common = layui.common;

				let MODULE_PATH = "./";

				let cols = [
					[
						{
							title: 'ID',
							field: 'id',
							align: 'center'
						},
						{
							title: '名称',
							field: 'name',
							align: 'center'
						},
						{
							title: '启用',
							field: 'status',
							align: 'center',
							templet: '#{{tags}}-enable'
						}
						{
							title: '登录时间',
							field: 'add_time',
							align: 'center',
							templet: '#{{tags}}-time'
						},
						{
							title: '操作',
							toolbar: '#{{tags}}-bar',
							align: 'center',
							width: 130
						}
					]
				]

				table.render({
					elem: '#user-table',
					url: apiUrl + 'admin/list',
					headers : getHeader(),
					parseData: function(res) {
						//console.log(res)
						return {
							"code": res.code, //解析接口状态
							"msg": res.message, //解析提示文本
							"count": res.data.count, //解析数据长度
							"data": res.data.list //解析数据列表
						};
					},
					page: true,
					cols: cols,
					skin: 'line',

					toolbar: '#user-toolbar',
					defaultToolbar: [{
						title: '刷新',
						layEvent: 'refresh',
						icon: 'layui-icon-refresh',
					}, 'filter', 'print', 'exports']
				});

				table.on('tool(user-table)', function(obj) {
					if (obj.event === 'remove') {
						window.remove(obj);
					} else if (obj.event === 'edit') {
						window.edit(obj);
					}
				});

				table.on('toolbar(user-table)', function(obj) {
					if (obj.event === 'add') {
						window.add();
					} else if (obj.event === 'refresh') {
						window.refresh();
					} else if (obj.event === 'batchRemove') {
						window.batchRemove(obj);
					}
				});
				// 监听搜索操作

				form.on('submit(user-query)', function(data) {
					table.reload('user-table', {
						where: {
							param : $('form').serialize()
						},
						page: {
					        curr: 1
					    }
					})
					return false;
				});
				form.on('submit(user-reset)', function(data){
					table.reload('user-table', {
						where: {
							param : ''
						},
						page: {
					        curr: 1
					    }
					});
					return false;
				})
				form.on('switch(user-enable)', function(data) {
					//layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
					let v = 1;
					if (data.elem.checked) v = 0;
					let postData = {
						id : data.value,
						status : v
					};
					_post(layui, 'admin/enable', postData, res => {
						//console.log(res)
					},err => {
						$(data.elem).prop('checked', false);
						form.render('checkbox');
					})
				});

				window.add = function() {
					layer.open({
						type: 2,
						title: '新增',
						shade: 0.1,
						offset: 'rt',
						area: ['80%', '100%'],
						anim: 1,
						maxmin: true,
						content: MODULE_PATH + 'add.html'
					});
				}

				window.edit = function(obj) {
					layer.open({
						type: 2,
						title: '修改',
						shade: 0.1,
						offset: 'rt',
						area: ['80%', '100%'],
						anim: 1,
						maxmin: true,
						content: MODULE_PATH + 'edit.html?id=' + obj.data.admin_id
					});
				}
				window.remove = function(obj){
		            layer.confirm('确定要删除该用户', {icon: 3, title:'提示'}, function(index){
		                layer.close(index);
		                _post(layui, 'admin/del',{admin_id : obj.data.admin_id}, res => {
							layer.msg('删除成功',{icon:1,time:1000},() => {
								obj.del();
							});
						}, err => {
							//layer.msg('删除失败',{icon:2,time:1000});
						})
		            });
		        }


				window.refresh = function(param) {
					table.reload('user-table');
				}
			})
		</script>
	</body>
</html>
`;
let editTpl = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>编辑{{name}}</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="../../component/ui/css/ui.css" />

</head>
<body>
<form class="layui-form" action="" lay-filter="editform">
    <div class="mainBox">
        <div class="main-container">
            <div class="main-container">
            <div class="layui-form-item">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-block">
                    <input type="text" name="username" lay-verify="required|len" autocomplete="off" min="3" placeholder="请输入名称" class="layui-input">
                </div>
            </div>
            
			  <div class="layui-form-item layui-form-text">
				<label class="layui-form-label">备注</label>
				<div class="layui-input-block">
				<textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
				</div>
			</div>

            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="button-container">
            <input type="hidden" name="admin_id">
            <button type="submit" class="pear-btn pear-btn-primary pear-btn-sm" lay-submit="" lay-filter="user-save">
                <i class="layui-icon layui-icon-ok"></i>
                提交
            </button>
        </div>
    </div>
</form>
<script src="../../config/config.js"></script>
<script src="../../component/layui/layui.js"></script>
<script src="../../component/ui/ui.js"></script>
<script>
    layui.use(['form','layer'], function () {
        let form = layui.form
            , layer = layui.layer
			, $ = layui.$
            , req = _req();
        form.verify({
            len : (val, item) => {
                let min = item.getAttribute("min")
                if(val.length > 0 && val.length < min) {
                    return '长度不能小于' + min;
                }
            }
        })
           //渲染
		_get(layui, 'admin/editBefore?id=' + req.id, res => {
            //console.log(res)
            form.val("editform",res);
			tree.render({
			     elem: '#treearea'//绑定元素
					,showCheckbox : true
					,data: res.authList
					,id: 'trees' //定义索引
			});
            tree.setChecked('trees', res.rules);
		},err => {
            console.log(err)
        });


        //监听提交
        form.on('submit(user-save)', function (data) {
			data = data.field;
			let arr = tree.getChecked('trees');
			data.rules = getTree(arr);
            if(data.rules.length < 1){
                layer.msg("所属角色不能为空");
                return false;
            }
            if(data.password.length > 0 && data.password.length < 6) {
                layer.msg("密码长度不能小于6位");
                return false;
            }
			_post(layui, 'admin/edit', data, res => {
				//console.log(res)
				parent.layui.table.reload("user-table");
				parent.layer.close(parent.layer.getFrameIndex(window.name));//关闭当前页

			})

            return false;
        });



    });
</script>

</body>
</html>`;
let addTpl = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>添加{{name}}</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="../../component/ui/css/ui.css" />
</head>
<body>
<form class="layui-form" action="" lay-filter="editform">
    <div class="mainBox">
        <div class="main-container">
            <div class="main-container">
            <div class="layui-form-item">
                <label class="layui-form-label">登录名</label>
                <div class="layui-input-block">
                    <input type="text" name="username" lay-verify="required|len" autocomplete="off" min="3" placeholder="请输入管理员登录名" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-block">
                    <input type="password" name="password" lay-verify="required|len" autocomplete="off" placeholder="请输入登录密码" min="6" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">真实姓名</label>
                <div class="layui-input-block">
                    <input type="text" name="name" autocomplete="off" placeholder="请输入真实姓名" class="layui-input" lay-verify="required|len" min="2">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">手机号</label>
                <div class="layui-input-block">
                    <input type="text" name="mobile" lay-verify="required|phone" autocomplete="off" placeholder="请输入手机号" class="layui-input">
                </div>
            </div>
			<div class="layui-form-item">
				<label class="layui-form-label">状态</label>
				<div class="layui-input-block">
				<input type="radio" name="status" value="0" title="开启" checked>
				<input type="radio" name="status" value="1" title="关闭">
				</div>
			</div>
            <div class="layui-form-item">
                <label class="layui-form-label">所属角色</label>
                <div class="layui-input-block">
                   <div id="treearea"></div>
                </div>
            </div>

			  <div class="layui-form-item layui-form-text">
				<label class="layui-form-label">备注</label>
				<div class="layui-input-block">
				<textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
				</div>
			</div>

            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="button-container">
            <button type="submit" class="pear-btn pear-btn-primary pear-btn-sm" lay-submit="" lay-filter="user-save">
                <i class="layui-icon layui-icon-ok"></i>
                提交
            </button>
        </div>
    </div>
</form>
<script src="../../config/config.js"></script>
<script src="../../component/layui/layui.js"></script>
<script src="../../component/ui/ui.js"></script>
<script>
    layui.use(['form','layer','tree'], function () {
        let form = layui.form
            , layer = layui.layer
			, $ = layui.$
			, tree = layui.tree;
        form.verify({
            len : (val, item) => {
                let min = item.getAttribute("min")
                if(val.length < min) {
                    return '长度不能小于' + min;
                }
            }
        })
           //渲染
		_get(layui, 'admin/addBefore', res => {
			   tree.render({
			     elem: '#treearea'//绑定元素
					,showCheckbox : true
					,data: res.authList
					,id: 'trees' //定义索引
				});
		});


        //监听提交
        form.on('submit(user-save)', function (data) {
			data = data.field;
			let arr = tree.getChecked('trees');
			data.rules = getTree(arr);
            if(data.rules.length < 1){
                layer.msg("所属角色不能为空");
                return false;
            }
			_post(layui, 'admin/add', data, res => {
				//console.log(res)
				parent.layui.table.reload("user-table");
				parent.layer.close(parent.layer.getFrameIndex(window.name));//关闭当前页

			})

            return false;
        });



    });
</script>

</body>
</html>`;
module.exports = {
    controllerTpl,
    logicTpl
}
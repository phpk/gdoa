## 接口管理 2021/12/04

- &check;  接口分基本配置/入口参数/逻辑设计/返回测试/表单设计/表格设计六个模块，每个模块单独书写，易于维护
- &check; 基本配置可设计接口名称/接口类别等，直接写入控制层，要加入权限处理
- &check; 入口参数主要选择入参，和表单设计挂钩2021/12/05
- &check; 入口参数支持直接从数据库导入，并自动识别数据格式，识别的有字段类型/是否为空/以及默认值2021/12/06
- &check; 入口参数新增分页参数添加 2021/12/10
- &check; 逻辑设计采用采用blockly方式完美实现，支持代码拖拽，并加入了很多实用的代码块 2021/12/08
- &check; 代码设计器自动生成代码并保存数据库和本地，代码设计器支持的类型有：2021/12/10

  1. - 支持类/数组/对象的拖拽
  2. - 支持thinkjs里面内置的对象/数据库处理/文件处理等
  3. - 支持数组里面一系列代码块比如map/foreach/filter/some等
  4. - 支持command+s保存
  5. - 支持鼠标悬停后展示代码块
- &cross; 数据层设计器：当内置数据不够用时需要写用到，主要做数据库的复杂处理，第二期实现，支持和代码设计器挂钩
- &cross; 服务层设计器：当内置服务不够用时用到，比如复杂的文件逻辑，http请求逻辑等，第二期实现
- &cross; 返回测试主要和表格设计挂钩，展示为主，输入测试数据查看返回值，设置是否删除测试数据，也可以单独作为前端测试工具
  &cross; 表单和表格和接口管理界面分开，可根据接口设计，如果接口没涉及到权限，这里也要做处理
- &cross; 可自动生成接口文档
- &cross; 可自动生成测试用例，分模块跑测试用例，放第二期

## 计划任务

- &cross; 可调用内置接口
- &cross; 支持post/get外部接口

## 文档管理 2021/12/03

- &check; 支持多个文集管理，直接在线书写md文件，自动生成漂亮的网页
- &check; 支持文章目录summary.md回写，直接把以前写好的md文档复制过来回写即可
- &check; 支持多个文集分开管理
- &check; 支持排序，直接改标题/logo，直接生成文档
- &check; 文件入库和本地存2份，方便备份
- &check; 用户编辑时尽量减少选择，顶部隐藏以及一些细节处理，添加后会关闭页面，避免多次提交同样数据
- &check; 文档编辑时新增ctrl+s快捷键保存数据
- &cross; 支持word和pdf导入，第二期

## 流程图 2021/12/02

- &check; 基础的增/删/改/查
- &check; 图形编辑器 可导入导出xml，支持导出jpg/png/gif/pdf/svg/xml
- &check; 图表编辑器 支持导出png
- &check; 权限编辑器 内置权限流demo  支持导出png
- &check; 工作流编辑器 内置工作流demo  支持导出png

## ppt演示文稿  2021/11/30

- &check; 基础的增/删/改/查
- &check; 在线演示文稿（幻灯片）应用，还原了大部分 Office PowerPoint 常用功能，支持 文字、图片、形状、线条、图表、表格、视频、公式 几种最常用的元素类型，每一种元素都拥有高度可编辑能力，同时支持丰富的快捷键和右键菜单，尽可能还原本地桌面应用的使用体验。
- &check; 内置了一些常用模版，支持导出ppt文件
- &cross; 支持ppt导入，第二期

## excel表格管理  2021/11/29

- &check; 基础的增/删/改/查
- &check; 格式设置：样式，条件格式，文本对齐及旋转，文本截断、溢出、自动换行，多种数据类型，单元格内多样式
- &check; 单元格：拖拽，下拉填充，多选区，查找和替换，定位，合并单元格，数据验证
- &check; 行和列操作：隐藏、插入、删除行或列，冻结，文本分列
- &check; 操作体验：撤销、重做，复制、粘贴、剪切，快捷键，格式刷，选区拖拽
- &check; 公式和函数：内置公式，远程公式，自定义公式
- &check; 表格操作：筛选，排序
- &check; 增强功能：数据透视表，图表，评论，共享编辑，插入图片，矩阵计算，截图，复制到其他格式
- &check; 导入：在线导入xlsx
- &cross; 导出xlsx第二期处理

## 思维导图管理  2021/11/28

- &check; 增/删/改/查，进入后自动添加/自动保存文件
- &check; 支持逻辑结构图、思维导图、组织结构图、目录组织图四种结构
- &check; 内置多种主题，允许高度自定义样式
- &check; 支持快捷键
- &check; 节点内容支持图片、图标、超链接、备注、标签
- &check; 支持前进后退
- &check; 支持拖动、缩放
- &check; 支持右键多选
- &check; 支持节点拖拽
- &check; 支持json格式的导入导出，png/svg导出
- &cross; 直接节点直接转化为ppt，第二期

## 管理小工具 2021/11/27

- &check; 二维码/时间戳/翻译/格式化/url编码/base64编码
- &check; 新增json工具和正则工具
- &check; 放在页面右上角，方便使用

## 数据库设计器

- &check; 支持数据备份还原，查看数据表实时状态 2021/11/17
- &check; 支持自动生成数据库设计文档，md格式以及实时预览，下载成pdf文件 2021/11/18
- &check; 新增文档可下载word文件 2021/11/27
- &check; 支持数据表名/注释/autoid的更改，支持优化表/修复表/删除表/清空表 2021/11/19
- &check; 可查看/编辑/新增/复制任意表数据  2021/11/20
- &check; 新增系统表数据保护  2021/11/20
- &check; 可更改字段名/注释/默认值/排序，可删除字段 2021/11/20
- &check; 新增连接/管理外部数据库 2021/11/25
- &check; 新增数据库表保护 2021/11/25
- &check; 新增可支持sqlite和mysql管理 2021/11/26
- &check; 新增ssh远程连接管理，支持pem和密码连接 2021/11/26

## &check; 登录验证 2021/11/12

- &check; jwt校验
- &check; 只允许一个帐号在一个端下登录
- &check; 登录后规定时间保活

## 角色管理  2021/11/14

- &check; 允许多角色管理，角色取交集
- &check; 角色可继承权限，每个角色应该有独立的权限职责划分

## 菜单管理 2021/11/13

- &check; 分前端模版和后端路由，权限由后端路由控制，增删改，图标可自定义

## 管理员管理 2021/11/15

- &check; 可添加/删除/搜索/编辑管理员，管理员和菜单权限挂钩

## 系统日志 2021/11/15

- &check; 记录每个人的操作记录  2021/11/15
- &cross; &rArr; 定期清理，清理前做物理归档
- &check; 记录每个人的查看记录，并记录离开时间  2021/11/14

## 系统配置

- &check; 可自定义配置，支持字段配置，自定义表单定义配置信息
- &cross; &rArr; 可自动分表，规划分表规则
- &cross; &rArr; 数据库自动定时备份，和计划任务一起做，配置和计划任务分开
- &cross; &rArr; 配置写库，写到config

## 系统功能

- &check; 支持csrf，可控制开关  2021/11/14
- &check; 支持apidoc生成开发文档  2021/11/14
- &check; 支持ratelimit实现访问速率限制，保护程序免受暴力攻击，可控制开关以及速度  2021/11/14
- &check; 支持helmet，避免XSS跨站脚本攻击，可控制开关  2021/11/14

## 表单生成器

- &check; 支持组件拖拽，支持表单回写 2021/11/15
- &check; 支持生成html以及代码预览 2021/11/16
- &check; 支持数据来源，支持自定义接收参数和发送附加参数 2021/11/16
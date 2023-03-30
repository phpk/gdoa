window.rootPath = (function (src) {
	src = document.scripts[document.scripts.length - 1].src;
	return src.substring(0, src.lastIndexOf("/") + 1);
})();

layui.config({
	base: rootPath + "module/",
	version: "0.0.1"
}).extend({
	admin: "admin", 	// 框架布局组件
	menu: "menu",		// 数据菜单组件
	frame: "frame", 	// 内容页面组件
	tab: "tab",			// 多选项卡组件
	hash: "hash",		// 数据加密组件
	//select: "select",	// 下拉多选组件
	echarts: "echarts",          // 数据图表组件
	echartsTheme: "echartsTheme",// 数据图表主题
	drawer: "drawer",	// 抽屉弹层组件
	notice: "notice",	// 消息提示组件
	step: "step",		// 分布表单组件
	tag: "tag",			// 多标签页组件
	popup: "popup",      // 弹层封装
	treeTable: 'treeTable/treeTable',
	area: "area",			// 省市级联  
	count: "count",			// 数字滚动组件
	topBar: "topBar",		// 置顶组件
	button: "button",		// 加载按钮
	card: "card",			// 数据卡片组件
	loading: "loading",		// 加载组件
	cropper: "cropper",		// 裁剪组件
	convert: "convert",		// 数据转换
	yaml: "yaml",			// yaml 解析组件
	context: "context",		// 上下文组件
	http: "http",			// ajax请求组件
	theme: "theme",			// 主题转换
	message: "message",     // 通知组件
	toast: "toast",          // 消息通知
	//iconPicker: "iconPicker",//图标选择器
	iconSelectedPlus: "iconSelectedPlus/index",//图标选择器
	cron: "cron",
	selectM: 'selectM',
	FileSaver: 'FileSaver',
	wordexport: 'wordexport'

}).use(['layer', 'theme'], function () {
	layui.theme.changeTheme(window, false);
});
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin`;
CREATE TABLE `rt_admin` (
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `salt` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码钥匙',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '手机号',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态1正常0禁用',
  `login_time` int(10) DEFAULT '0' COMMENT '登录时间',
  `login_num` int(10) DEFAULT '0' COMMENT '登录次数',
  `update_time` int(10) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`) USING HASH,
  UNIQUE KEY `mobile` (`mobile`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_auth
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_auth`;
CREATE TABLE `rt_admin_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理权限表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_loginlog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_loginlog`;
CREATE TABLE `rt_admin_loginlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `admin_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `data` text CHARACTER SET utf8 COMMENT '返回记录',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理登录日志表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_map
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_map`;
CREATE TABLE `rt_admin_map` (
  `map_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) unsigned NOT NULL,
  `auth_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0角色1集团2公司3门店4部门5区域',
  PRIMARY KEY (`map_id`),
  UNIQUE KEY `admin_id` (`admin_id`, `auth_id`, `type`) USING HASH
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员权限映射表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_oplog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_oplog`;
CREATE TABLE `rt_admin_oplog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `admin_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `data` text CHARACTER SET utf8 COMMENT '返回记录',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 362 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理操作日志';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_viewlog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_viewlog`;
CREATE TABLE `rt_admin_viewlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `admin_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `leavetime` int(10) unsigned DEFAULT '0' COMMENT '离开时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 427 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员查看日志';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api`;
CREATE TABLE `rt_api` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口名称',
  `mod_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '模块id',
  `menu_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '菜单id',
  `mod_key` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所属模块',
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口唯一标志',
  `method` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口方法',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '说明',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加人',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口主表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_form
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_form`;
CREATE TABLE `rt_api_form` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口表单表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_logic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_logic`;
CREATE TABLE `rt_api_logic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `code` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '代码',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口逻辑表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_params
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_params`;
CREATE TABLE `rt_api_params` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `aid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '接口id',
  `key` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数名字',
  `type` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '参数类型',
  `len_min` int(10) unsigned DEFAULT '0' COMMENT '字符最小值',
  `len_max` int(10) unsigned DEFAULT '0' COMMENT '字符最大值',
  `num_min` int(10) unsigned DEFAULT '0' COMMENT '数字最小值',
  `num_max` int(10) unsigned DEFAULT '0' COMMENT '数值最大值',
  `def` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '默认值',
  `required` tinyint(2) unsigned DEFAULT '0' COMMENT '是否必填',
  `format` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '参数格式',
  `isdb` tinyint(2) unsigned DEFAULT '0' COMMENT '是否为数据库字段',
  `tablename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '数据库表名',
  `tablefield` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '数据库字段名',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 37 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口参数表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_table`;
CREATE TABLE `rt_api_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口表格表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_test
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_test`;
CREATE TABLE `rt_api_test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用例名称',
  `aid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '接口id',
  `input_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '输入方法',
  `params` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数输入',
  `headers` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '头部输入',
  `ret` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '期待输出',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口测试表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_area
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_area`;
CREATE TABLE `rt_area` (
  `area_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '区域名称',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `city_id` int(10) DEFAULT NULL COMMENT '上级城市id',
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '区域表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_article`;
CREATE TABLE `rt_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `category_id` int(10) DEFAULT '0' COMMENT '分类id',
  `title` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `desc_content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `author` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '作者:id:name',
  `show_switch` tinyint(1) NOT NULL DEFAULT '1' COMMENT '展示:1=展示,0=隐藏',
  `show_time` int(10) unsigned DEFAULT '0',
  `up_time` int(10) unsigned DEFAULT '0',
  `add_time` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_cate`;
CREATE TABLE `rt_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) DEFAULT '0' COMMENT '上级id',
  `sid` int(10) DEFAULT '0' COMMENT '系统类型id',
  `fid` int(10) DEFAULT NULL COMMENT '系统分类标志',
  `lid` int(10) DEFAULT '0' COMMENT '层级',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `desc` text COLLATE utf8mb4_unicode_ci COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统分类表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_category`;
CREATE TABLE `rt_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '分类名称',
  `status` tinyint(2) DEFAULT '0' COMMENT '是否使用，预留',
  `ctype` tinyint(3) DEFAULT '1' COMMENT '分类类型 1新闻2账户类型3账户日志来源',
  `desc` text CHARACTER SET utf8 COMMENT '其他附加配置',
  `flag` int(10) NOT NULL DEFAULT '0' COMMENT '分类标志，同一分类不能重复',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章分类';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_code
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_code`;
CREATE TABLE `rt_code` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标志',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文件路径',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'controller' COMMENT '类型',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '程序设计器';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_crons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_crons`;
CREATE TABLE `rt_crons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务名称',
  `interval` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '执行间隔 毫秒为单位',
  `immediate` tinyint(1) DEFAULT '1' COMMENT '是否立即执行',
  `handle` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '执行路径',
  `enable` tinyint(1) DEFAULT '1' COMMENT '是否开启',
  `type` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'one执行一次all一直执行',
  `addtime` int(10) DEFAULT '0' COMMENT '添加时间',
  `uptime` bigint(20) DEFAULT '0' COMMENT '更新时间',
  `nexttime` bigint(20) DEFAULT '0' COMMENT '下次执行时间',
  `runtime` bigint(20) DEFAULT '0' COMMENT '每次执行的时间',
  `runtype` tinyint(1) DEFAULT '0' COMMENT '执行类型0为间隔执行1为系统执行crontab',
  `cron` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Runtype为1时不能为空 如0 */1 * * *',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `handle` (`handle`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统计划任务表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_database
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_database`;
CREATE TABLE `rt_database` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `database` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `host` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `port` int(10) unsigned NOT NULL DEFAULT '3306',
  `user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateStrings` tinyint(2) unsigned DEFAULT NULL,
  `encoding` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isdef` tinyint(2) unsigned DEFAULT '0',
  `prefix` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ssh` tinyint(2) unsigned DEFAULT NULL,
  `shost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sport` int(10) unsigned DEFAULT '22',
  `suser` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stype` tinyint(2) unsigned DEFAULT '1',
  `spass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '数据库连接表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_datasafe
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_datasafe`;
CREATE TABLE `rt_datasafe` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `data_id` int(10) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `data_id` (`data_id`, `name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '数据库保护表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_doc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_doc`;
CREATE TABLE `rt_doc` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文集标题',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文集副标题',
  `key` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文集标志',
  `version` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文集版本',
  `logo` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'logo图片',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '介绍',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文档表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_doc_cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_doc_cate`;
CREATE TABLE `rt_doc_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `did` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '文集id',
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '类型0分类1文章',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `pid` int(10) NOT NULL DEFAULT '0' COMMENT '上级id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文件名称',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `order_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 49 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文档分类表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_error
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_error`;
CREATE TABLE `rt_error` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msg` text COLLATE utf8mb4_unicode_ci,
  `addtime` int(10) unsigned DEFAULT '0',
  `admin_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统错误日志表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_excel
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_excel`;
CREATE TABLE `rt_excel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'excel表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_flow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_flow`;
CREATE TABLE `rt_flow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `type` tinyint(2) unsigned DEFAULT '1' COMMENT '类型',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '流程图';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_form
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_form`;
CREATE TABLE `rt_form` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` text COLLATE utf8mb4_unicode_ci,
  `get_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `link_id` int(10) unsigned DEFAULT '0' COMMENT '回写id',
  `link_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '回写表名',
  `link_field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '回写字段',
  `params_get` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `params_post` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统表单';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_menu`;
CREATE TABLE `rt_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `route` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '权限标志',
  `href` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '前端地址',
  `type` tinyint(2) DEFAULT '0' COMMENT '0目录1菜单2按钮3权限',
  `order_num` int(10) DEFAULT '0' COMMENT '排序',
  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `open_type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `pid` int(10) DEFAULT '0',
  `lid` tinyint(3) DEFAULT '1',
  `ifshow` tinyint(3) unsigned DEFAULT '0' COMMENT '是否显示0显示1不显示',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `url` (`route`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 215 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统菜单';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_mind
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_mind`;
CREATE TABLE `rt_mind` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '思维导图';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_mod
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_mod`;
CREATE TABLE `rt_mod` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '模块名称',
  `key` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '系统标志',
  `server_path` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'server' COMMENT '模块路径',
  `tables_main` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主表',
  `tables_more` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '附加表',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '模块类型1控制层2数据层3服务层5curd',
  `params` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '全局参数',
  `extra` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '扩展字段',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模块说明',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE = InnoDB AUTO_INCREMENT = 48 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统模块表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_params
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_params`;
CREATE TABLE `rt_params` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数名称',
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数值',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数内容',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '参数类型1文件2数字3字符串',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '全局常量表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_ppt
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_ppt`;
CREATE TABLE `rt_ppt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '编辑时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '演示文稿';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_set
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_set`;
CREATE TABLE `rt_set` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '键值',
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `val` text COLLATE utf8mb4_unicode_ci COMMENT '值',
  `enable` tinyint(2) DEFAULT '1' COMMENT '状态',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '表单id',
  `form_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `params` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `key` (`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统配置表';

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin
# ------------------------------------------------------------

INSERT INTO
  `rt_admin` (
    `username`,
    `password`,
    `admin_id`,
    `salt`,
    `add_time`,
    `name`,
    `mobile`,
    `status`,
    `login_time`,
    `login_num`,
    `update_time`
  )
VALUES
  (
    'admin',
    'a7cc6dd723a05a8623f2a3a08d2240ae',
    1,
    'JbQpb5p3SN7tdJpB',
    0,
    NULL,
    NULL,
    0,
    1639093982,
    181,
    0
  );
INSERT INTO
  `rt_admin` (
    `username`,
    `password`,
    `admin_id`,
    `salt`,
    `add_time`,
    `name`,
    `mobile`,
    `status`,
    `login_time`,
    `login_num`,
    `update_time`
  )
VALUES
  (
    'test',
    'c7b30ad98095b7b560585ffd6371aa47',
    2,
    'x6pdhRYF4f6bHpFc',
    1636948516,
    '1test',
    '13873150575',
    0,
    0,
    0,
    0
  );
INSERT INTO
  `rt_admin` (
    `username`,
    `password`,
    `admin_id`,
    `salt`,
    `add_time`,
    `name`,
    `mobile`,
    `status`,
    `login_time`,
    `login_num`,
    `update_time`
  )
VALUES
  (
    'test12',
    'c108dd09fba019c8b9681248c876bb4e',
    5,
    'Ahn7EScJBw3R2TZR',
    1636948870,
    '222',
    '13885863355',
    0,
    0,
    0,
    1636958930
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_auth
# ------------------------------------------------------------

INSERT INTO
  `rt_admin_auth` (`id`, `name`, `rules`, `status`, `remark`)
VALUES
  (1, '总管理员', '-1', 0, NULL);
INSERT INTO
  `rt_admin_auth` (`id`, `name`, `rules`, `status`, `remark`)
VALUES
  (2, 'aaa', '1,4,5,7,37,53', 0, 'aaa');
INSERT INTO
  `rt_admin_auth` (`id`, `name`, `rules`, `status`, `remark`)
VALUES
  (
    15,
    'test2',
    '1,4,5,7,37,53,2,9,20,21,22,23,57,10,26,27,56,58,59,60,61,11,24,25,62,63,64,65,12,66,67,68,13,28,29,30,31,32,14,33,34,35,36,3,15',
    1,
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_loginlog
# ------------------------------------------------------------

INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    1,
    1,
    'admin登录',
    '{\"password\":\"admin\",\"username\":\"admin\",\"captcha\":\"angt\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636683208
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    2,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"wueq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636683396
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    3,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"8mau\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636684074
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    4,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"za72\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636687935
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    5,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"cxdq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636688572
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    6,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"l3nr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636689117
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    7,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"ra5w\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636689550
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    8,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"2xem\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636689633
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    9,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"2esr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636690261
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    10,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"tqxc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636691944
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    11,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"g3kj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636707053
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    12,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"quyg\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636708393
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    13,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"spkv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636708927
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    14,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"q7hv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636708992
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    15,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"kvm9\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636709026
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    16,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"4tdv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636709593
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    17,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"rnxn\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636710000
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    18,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"zwgk\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636711037
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    19,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"vz4m\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.62.0 Chrome/91.0.4472.164 Electron/13.5.1 Safari/537.36',
    '/server/login/do',
    'POST',
    1636719500
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    20,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"csq3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.62.0 Chrome/91.0.4472.164 Electron/13.5.1 Safari/537.36',
    '/server/login/do',
    'POST',
    1636719624
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    21,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"5u96\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.62.0 Chrome/91.0.4472.164 Electron/13.5.1 Safari/537.36',
    '/server/login/do',
    'POST',
    1636719837
  );
INSERT INTO
  `rt_admin_loginlog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    22,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"ssr7\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.62.0 Chrome/91.0.4472.164 Electron/13.5.1 Safari/537.36',
    '/server/login/do',
    'POST',
    1636754198
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_map
# ------------------------------------------------------------

INSERT INTO
  `rt_admin_map` (`map_id`, `admin_id`, `auth_id`, `type`)
VALUES
  (1, 1, 1, 0);
INSERT INTO
  `rt_admin_map` (`map_id`, `admin_id`, `auth_id`, `type`)
VALUES
  (4, 2, 2, 0);
INSERT INTO
  `rt_admin_map` (`map_id`, `admin_id`, `auth_id`, `type`)
VALUES
  (10, 5, 1, 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_oplog
# ------------------------------------------------------------

INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    1,
    1,
    'admin登录',
    '{\"password\":\"admin\",\"username\":\"admin\",\"captcha\":\"angt\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636683208
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    2,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"wueq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636683396
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    3,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"8mau\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636684074
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    4,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"za72\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636687935
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    5,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"cxdq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636688572
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    6,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"l3nr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636689117
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    7,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"ra5w\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636689550
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    8,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"2xem\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636689633
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    9,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"2esr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636690261
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    10,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"tqxc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636691944
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    11,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"g3kj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636707053
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    12,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"quyg\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636708393
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    13,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"spkv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636708927
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    14,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"q7hv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636708992
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    15,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"kvm9\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636709026
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    16,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"4tdv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636709593
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    17,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"rnxn\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636710000
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    18,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"zwgk\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636711037
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    19,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"tjvj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.62.1 Chrome/91.0.4472.164 Electron/13.5.2 Safari/537.36',
    '/server/login/do',
    'POST',
    1636760259
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    20,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"zjem\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636769860
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    21,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"2aac\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636770059
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    22,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"rg8q\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636770165
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    23,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"38ay\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636777200
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    24,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"ccbj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636777527
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    25,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"thxe\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1636777620
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    26,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"fqqp\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636778519
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    27,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"xwwb\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636778607
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    28,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"s6gy\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636778736
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    29,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"x9k4\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636778869
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    30,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"3mdo\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636781312
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    31,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"yrhv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636784601
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    32,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"5kfs\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636788224
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    33,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"9etk\"}',
    '::ffff:127.0.0.1',
    'PostmanRuntime/7.28.4',
    '/server/login/do',
    'POST',
    1636790308
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    34,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"rrxy\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636791000
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    35,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"j42m\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636792621
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    36,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"tgcw\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636792990
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    37,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"zhlr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636793350
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    38,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"mn3f\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636796303
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    39,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"vhld\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636796968
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    40,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"qfkw\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636797088
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    41,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"ucma\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636847701
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    42,
    1,
    '设置菜单显示',
    '{\"id\":\"3\",\"ifshow\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/ifshow',
    'POST',
    1636850164
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    43,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"5zpj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636850932
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    44,
    1,
    '设置菜单显示',
    '{\"id\":\"3\",\"ifshow\":\"1\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/ifshow',
    'POST',
    1636850942
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    45,
    1,
    'admin登录',
    '{\"username\":\"admin\",\"captcha\":\"jf9m\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636851796
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    46,
    1,
    '用户登录',
    '{\"username\":\"admin\",\"captcha\":\"crhq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636853681
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    47,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"zmsc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636855313
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    48,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"h3ae\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636855489
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    49,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"f7mx\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636856772
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    50,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"zvba\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636864423
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    51,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"vyyh\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636864729
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    52,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"uuqr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636864815
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    53,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"pzpt\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636864927
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    54,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"uaro\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636864997
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    55,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ebxu\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636865023
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    56,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"drxv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636867592
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    57,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"b5du\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636867712
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    58,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ku9t\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636873872
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    59,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"t545\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636877578
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    60,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"xhy8\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636885287
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    61,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"rbg2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636930153
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    62,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"3kkj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636930845
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    63,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"aekt\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636933195
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    64,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"lz3s\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636933445
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    65,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"rwt3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636934002
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    66,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"cffy\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636937582
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    67,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"czda\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636941888
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    68,
    1,
    '编辑菜单',
    '{\"title\":\"管理员管理\",\"pname\":\"系统管理\",\"route\":\"admin/index\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-key\",\"type\":\"1\",\"order_num\":\"11\",\"id\":\"11\",\"pid\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636941924
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    69,
    1,
    '编辑菜单',
    '{\"title\":\"管理员管理\",\"pname\":\"系统管理\",\"route\":\"admin/list\",\"href\":\"view/admin/list\",\"icon\":\"layui-icon layui-icon-key\",\"type\":\"1\",\"order_num\":\"11\",\"id\":\"11\",\"pid\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636941981
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    70,
    1,
    '编辑菜单',
    '{\"title\":\"管理员管理\",\"pname\":\"系统管理\",\"route\":\"admin/list\",\"href\":\"view/admin/list.html\",\"icon\":\"layui-icon layui-icon-key\",\"type\":\"1\",\"order_num\":\"11\",\"id\":\"11\",\"pid\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636942018
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    71,
    1,
    '添加菜单',
    '{\"title\":\"管理员添加前\",\"pname\":\"11\",\"route\":\"admin/addBefore\",\"href\":\"\",\"icon\":\"\",\"type\":\"3\",\"order_num\":\"0\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636944104
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    72,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"xu9a\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636945520
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    73,
    1,
    '添加菜单',
    '{\"title\":\"添加管理员\",\"pname\":\"11\",\"route\":\"admin/add\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-windows\",\"type\":\"2\",\"order_num\":\"0\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636947931
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    74,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ch7a\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636949587
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    75,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"lhtp\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636949669
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    76,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"3e8n\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636949737
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    77,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"mywv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636949843
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    78,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"qxgd\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636949890
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    79,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"a4gc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636950046
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    80,
    1,
    '添加菜单',
    '{\"title\":\"编辑管理员前\",\"pname\":\"11\",\"route\":\"admin/editBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-export\",\"type\":\"3\",\"order_num\":\"0\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636950088
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    81,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"nhhu\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636957714
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    82,
    1,
    '编辑菜单',
    '{\"title\":\"编辑管理员\",\"pname\":\"管理员管理\",\"route\":\"admin/edit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-time\",\"type\":\"2\",\"order_num\":\"20\",\"id\":\"24\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636958889
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    83,
    1,
    '编辑菜单',
    '{\"title\":\"删除管理员\",\"pname\":\"管理员管理\",\"route\":\"admin/del\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-more-vertical\",\"type\":\"2\",\"order_num\":\"21\",\"id\":\"25\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636959517
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    84,
    1,
    '编辑菜单',
    '{\"title\":\"管理员编辑前\",\"pname\":\"管理员管理\",\"route\":\"admin/editBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-export\",\"type\":\"3\",\"order_num\":\"0\",\"id\":\"64\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636959542
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    85,
    1,
    '编辑菜单',
    '{\"title\":\"日志管理\",\"pname\":\"系统管理\",\"route\":\"logs\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-spread-left\",\"type\":\"0\",\"order_num\":\"12\",\"id\":\"12\",\"pid\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636959580
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    86,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"6ave\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636961221
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    87,
    1,
    '设置角色可用',
    '{\"id\":\"2\",\"status\":\"1\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/enable',
    'POST',
    1636962371
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    88,
    1,
    '设置角色可用',
    '{\"id\":\"2\",\"status\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/enable',
    'POST',
    1636962383
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    89,
    1,
    '添加菜单',
    '{\"title\":\"管理员启用禁用\",\"pname\":\"11\",\"route\":\"admin/enable\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-slider\",\"type\":\"2\",\"order_num\":\"0\",\"pid\":\"11\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636962429
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    90,
    1,
    '设置管理员可用',
    '{\"id\":\"5\",\"status\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/enable',
    'POST',
    1636962435
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    91,
    1,
    '设置管理员可用',
    '{\"id\":\"5\",\"status\":\"1\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/enable',
    'POST',
    1636962436
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    92,
    1,
    '设置管理员可用',
    '{\"id\":\"5\",\"status\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/enable',
    'POST',
    1636962446
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    93,
    1,
    '添加菜单',
    '{\"title\":\"操作日志\",\"pname\":\"12\",\"route\":\"logs/opList\",\"href\":\"view/logs/op.html\",\"icon\":\"layui-icon layui-icon-date\",\"type\":\"1\",\"order_num\":\"0\",\"pid\":\"12\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636964785
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    94,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"2wtg\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636965938
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    95,
    1,
    '编辑菜单',
    '{\"title\":\"操作日志\",\"pname\":\"日志管理\",\"route\":\"logs/op\",\"href\":\"view/logs/op.html\",\"icon\":\"layui-icon layui-icon-date\",\"type\":\"1\",\"order_num\":\"0\",\"id\":\"66\",\"pid\":\"12\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1636965966
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    96,
    1,
    '添加菜单',
    '{\"title\":\"行为日志\",\"pname\":\"12\",\"route\":\"logs/view\",\"href\":\"view/logs/view.html\",\"icon\":\"layui-icon layui-icon-cols\",\"type\":\"1\",\"order_num\":\"0\",\"pid\":\"12\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636966010
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    97,
    1,
    '添加菜单',
    '{\"title\":\"错误日志\",\"pname\":\"12\",\"route\":\"logs/err\",\"href\":\"view/logs/err.html\",\"icon\":\"layui-icon layui-icon-survey\",\"type\":\"1\",\"order_num\":\"0\",\"pid\":\"12\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1636966045
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    98,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"kq77\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1636968651
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    99,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"qw4n\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637020753
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    100,
    1,
    '编辑菜单',
    '{\"title\":\"系统设置\",\"pname\":\"系统管理\",\"route\":\"set/cate\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-find-fill\",\"type\":\"1\",\"order_num\":\"13\",\"id\":\"13\",\"pid\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637023335
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    101,
    1,
    '编辑菜单',
    '{\"title\":\"系统设置\",\"pname\":\"系统管理\",\"route\":\"set/cate\",\"href\":\"view/set/cate.html\",\"icon\":\"layui-icon layui-icon-find-fill\",\"type\":\"1\",\"order_num\":\"13\",\"id\":\"13\",\"pid\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637023402
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    102,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"5agy\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637027945
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    103,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"qyvh\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637028098
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    104,
    1,
    '添加菜单',
    '{\"title\":\"test\",\"pname\":\"3\",\"route\":\"tet\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637028919
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    105,
    1,
    '删除菜单',
    '{\"id\":69}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637028927
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    106,
    1,
    '添加菜单',
    '{\"title\":\"test\",\"pname\":\"3\",\"route\":\"ttt\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637029256
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    107,
    1,
    '删除菜单',
    '{\"id\":70}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637029261
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    108,
    1,
    '添加菜单',
    '{\"title\":\"test\",\"pname\":\"3\",\"route\":\"ttt\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637029596
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    109,
    1,
    '删除菜单',
    '{\"id\":71}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637030256
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    110,
    1,
    '添加菜单',
    '{\"title\":\"test\",\"pname\":\"0\",\"route\":\"ttt\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-heart-fill\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637030982
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    111,
    1,
    '删除菜单',
    '{\"id\":72}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637031150
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    112,
    1,
    '添加菜单',
    '{\"title\":\"test\",\"pname\":\"0\",\"route\":\"ttt\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637031472
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    113,
    1,
    '添加菜单',
    '{\"title\":\"tttt\",\"pname\":\"0\",\"route\":\"ttt\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"0\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637031483
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    114,
    1,
    '删除菜单',
    '{\"id\":73}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637031488
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    115,
    1,
    '添加菜单',
    '{\"title\":\"ttt\",\"pname\":\"74\",\"route\":\"ttttt\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"74\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637031501
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    116,
    1,
    '删除菜单',
    '{\"id\":74}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637031506
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    117,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"tnks\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637031563
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    118,
    1,
    '添加菜单',
    '{\"title\":\"tttt\",\"pname\":\"75\",\"route\":\"tttttt\",\"href\":\"\",\"icon\":\"\",\"type\":\"0\",\"order_num\":\"0\",\"pid\":\"75\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637032000
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    119,
    1,
    '删除菜单',
    '{\"id\":76}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637033138
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    120,
    1,
    '删除菜单',
    '{\"id\":75}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637033142
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    121,
    1,
    '添加菜单',
    '{\"title\":\"test\",\"pname\":\"0\",\"route\":\"test\",\"href\":\"\",\"icon\":\"\",\"type\":0,\"order_num\":0,\"pid\":0}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637034082
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    122,
    1,
    '删除菜单',
    '{\"id\":77}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637034087
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    123,
    1,
    '设置菜单显示',
    '{\"id\":3,\"ifshow\":0}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/ifshow',
    'POST',
    1637034286
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    124,
    1,
    '设置菜单显示',
    '{\"id\":3,\"ifshow\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/ifshow',
    'POST',
    1637034293
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    125,
    1,
    '编辑菜单',
    '{\"title\":\"前端菜单\",\"pname\":\"公共模块\",\"route\":\"menu/list\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-mike\",\"type\":3,\"order_num\":0,\"id\":15,\"pid\":3}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637034309
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    126,
    1,
    '编辑菜单',
    '{\"title\":\"前端菜单\",\"pname\":\"公共模块\",\"route\":\"menu/list\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":3,\"order_num\":0,\"id\":15,\"pid\":3}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637034432
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    127,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"mxpk\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637035880
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    128,
    1,
    '添加角色',
    '{\"name\":\"test\",\"status\":0,\"id\":\"15\",\"remark\":\"\",\"rules\":\"1,4,5,7,37,53,2,9,20,21,22,23,57,10,26,27,56,58,59,60,61,11,24,25,62,63,64,65,12,66,67,68,13,28,29,30,31,32,14,33,34,35,36,3,15\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/add',
    'POST',
    1637036280
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    129,
    1,
    '编辑角色',
    '{\"name\":\"test2\",\"status\":0,\"id\":15,\"remark\":\"\",\"rules\":\"1,4,5,7,37,53,2,9,20,21,22,23,57,10,26,27,56,58,59,60,61,11,24,25,62,63,64,65,12,66,67,68,13,28,29,30,31,32,14,33,34,35,36,3,15\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/edit',
    'POST',
    1637037071
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    130,
    1,
    '设置角色可用',
    '{\"id\":15,\"status\":0}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/enable',
    'POST',
    1637037175
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    131,
    1,
    '设置角色可用',
    '{\"id\":15,\"status\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/enable',
    'POST',
    1637037179
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    132,
    1,
    '添加管理员',
    '{\"username\":\"t4e\",\"name\":\"11111\",\"mobile\":\"13888888888\",\"status\":0,\"layuiTreeCheck_2\":\"2\",\"remark\":\"\",\"rules\":\"2\",\"salt\":\"KJBmzRxjAy5HMSPh\",\"add_time\":1637038189}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/add',
    'POST',
    1637038189
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    133,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"foen\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637039428
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    134,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"x4vd\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637039566
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    135,
    1,
    '编辑管理员',
    '{\"username\":\"t4e\",\"name\":\"11111\",\"mobile\":\"13888888888\",\"status\":0,\"layuiTreeCheck_2\":\"2\",\"remark\":\"\",\"admin_id\":6,\"rules\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/edit',
    'POST',
    1637039790
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    136,
    1,
    '编辑管理员',
    '{\"username\":\"t4e2\",\"name\":\"11111\",\"mobile\":\"13888888888\",\"status\":0,\"layuiTreeCheck_2\":\"2\",\"remark\":\"\",\"admin_id\":6,\"rules\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/edit',
    'POST',
    1637039796
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    137,
    1,
    '删除管理员',
    '{\"admin_id\":6}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/del',
    'POST',
    1637039978
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    138,
    1,
    '设置管理员可用',
    '{\"id\":5,\"status\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/enable',
    'POST',
    1637040173
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    139,
    1,
    '设置管理员可用',
    '{\"id\":5,\"status\":0}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/enable',
    'POST',
    1637040174
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    140,
    1,
    '添加管理员',
    '{\"username\":\"ttttt\",\"name\":\"11\",\"mobile\":\"13985858888\",\"status\":0,\"layuiTreeCheck_2\":\"2\",\"remark\":\"\",\"rules\":\"2\",\"salt\":\"ZEJEKTwNiefHP4QQ\",\"add_time\":1637040196}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/add',
    'POST',
    1637040196
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    141,
    1,
    '编辑管理员',
    '{\"username\":\"ttttt2\",\"name\":\"11\",\"mobile\":\"13985858888\",\"status\":0,\"layuiTreeCheck_2\":\"2\",\"remark\":\"\",\"admin_id\":7,\"rules\":\"2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/edit',
    'POST',
    1637040203
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    142,
    1,
    '删除管理员',
    '{\"admin_id\":7}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/del',
    'POST',
    1637040206
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    143,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"8cs2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637052507
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    144,
    1,
    '添加菜单',
    '{\"title\":\"添加系统配置类目\",\"pname\":\"13\",\"route\":\"set/cateAdd\",\"href\":\"view/set/cate_add.html\",\"icon\":\"layui-icon layui-icon-windows\",\"type\":2,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637055590
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    145,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"r4bz\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637056412
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    146,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"y9hd\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1637056463
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    147,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ftjc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637107308
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    148,
    1,
    '添加菜单',
    '{\"title\":\"编辑系统类目前\",\"pname\":\"13\",\"route\":\"set/cateEditBefore\",\"href\":\"view/set/cate_edit.html\",\"icon\":\"layui-icon layui-icon-windows\",\"type\":2,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637108007
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    149,
    1,
    '添加菜单',
    '{\"title\":\"编辑系统类目\",\"pname\":\"13\",\"route\":\"set/cateEdit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-template\",\"type\":3,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637108058
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    150,
    1,
    '添加菜单',
    '{\"title\":\"删除配置类目\",\"pname\":\"13\",\"route\":\"set/cateDelete\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-component\",\"type\":3,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637109232
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    151,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"qwnd\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637111011
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    152,
    1,
    '编辑菜单',
    '{\"title\":\"添加配置\",\"pname\":\"系统设置\",\"route\":\"set/add\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-at\",\"type\":2,\"order_num\":24,\"id\":28,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637111056
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    153,
    1,
    '编辑菜单',
    '{\"title\":\"配置列表\",\"pname\":\"系统设置\",\"route\":\"set/list\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":2,\"order_num\":26,\"id\":30,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637112427
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    154,
    1,
    '编辑菜单',
    '{\"title\":\"删除配置\",\"pname\":\"系统设置\",\"route\":\"set/delete\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-mute\",\"type\":2,\"order_num\":25,\"id\":29,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637112783
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    155,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"cjpt\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637116135
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    156,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"tvuz\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637123746
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    157,
    1,
    '编辑菜单',
    '{\"title\":\"系统设计\",\"pname\":\"系统管理\",\"route\":\"design\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-code\",\"type\":0,\"order_num\":31,\"id\":35,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637123851
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    158,
    1,
    '添加菜单',
    '{\"title\":\"表单设计器\",\"pname\":\"35\",\"route\":\"design/form\",\"href\":\"view/design/form.html\",\"icon\":\"layui-icon layui-icon-template-1\",\"type\":1,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637123948
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    159,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"vxkp\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637139982
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    160,
    1,
    '编辑菜单',
    '{\"title\":\"表单设计器\",\"pname\":\"系统设计\",\"route\":\"form/list\",\"href\":\"view/form/list.html\",\"icon\":\"layui-icon layui-icon-template-1\",\"type\":1,\"order_num\":0,\"id\":82,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637141826
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    161,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"kq7u\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1637198112
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    162,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"lrzj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637201238
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    163,
    1,
    '添加菜单',
    '{\"title\":\"添加表单\",\"pname\":\"82\",\"route\":\"form/add\",\"href\":\"view/form/add.html\",\"icon\":\"layui-icon layui-icon-auz\",\"type\":2,\"order_num\":0,\"pid\":82}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637201424
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    164,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"dglj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637205247
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    165,
    1,
    '删除菜单',
    '{\"id\":81}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637205366
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    166,
    1,
    '删除菜单',
    '{\"id\":80}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637205371
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    167,
    1,
    '删除菜单',
    '{\"id\":79}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637205381
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    168,
    1,
    '删除菜单',
    '{\"id\":78}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637205386
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    169,
    1,
    '编辑菜单',
    '{\"title\":\"系统设置\",\"pname\":\"系统管理\",\"route\":\"set/cate\",\"href\":\"view/set/list.html\",\"icon\":\"layui-icon layui-icon-find-fill\",\"type\":1,\"order_num\":13,\"id\":13,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637205401
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    170,
    1,
    '删除菜单',
    '{\"id\":30}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1637205491
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    171,
    1,
    '编辑菜单',
    '{\"title\":\"编辑配置\",\"pname\":\"系统设置\",\"route\":\"set/edit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-export\",\"type\":2,\"order_num\":27,\"id\":31,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637208797
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    172,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"bcsu\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637208866
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    173,
    1,
    '编辑菜单',
    '{\"title\":\"编辑配置前\",\"pname\":\"系统设置\",\"route\":\"set/editBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-rate-half\",\"type\":3,\"order_num\":28,\"id\":32,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637208906
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    174,
    1,
    '编辑菜单',
    '{\"title\":\"系统设置\",\"pname\":\"系统管理\",\"route\":\"set/list\",\"href\":\"view/set/list.html\",\"icon\":\"layui-icon layui-icon-find-fill\",\"type\":1,\"order_num\":13,\"id\":13,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637208944
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    175,
    1,
    '添加菜单',
    '{\"title\":\"设置配置可用\",\"pname\":\"13\",\"route\":\"set/enable\",\"href\":\"\",\"icon\":\"\",\"type\":3,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637209991
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    176,
    1,
    '设置配置可用',
    '{\"id\":12,\"status\":0}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/set/enable',
    'POST',
    1637210042
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    177,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"kmbb\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637212679
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    178,
    1,
    '添加菜单',
    '{\"title\":\"添加表单前\",\"pname\":\"82\",\"route\":\"form/addBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-headset\",\"type\":3,\"order_num\":0,\"pid\":82}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637212896
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    179,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"7u8v\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637222000
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    180,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"38dg\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637225814
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    181,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"kbla\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637229759
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    182,
    1,
    '添加菜单',
    '{\"title\":\"设置配置前\",\"pname\":\"13\",\"route\":\"set/setBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-at\",\"type\":3,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637232296
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    183,
    1,
    '添加菜单',
    '{\"title\":\"设置配置\",\"pname\":\"13\",\"route\":\"set/setConf\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-404\",\"type\":3,\"order_num\":0,\"pid\":13}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637232332
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    184,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"q27r\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637278992
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    185,
    1,
    '编辑菜单',
    '{\"title\":\"表单设计器\",\"pname\":\"2\",\"route\":\"form/list\",\"href\":\"view/form/list.html\",\"icon\":\"layui-icon layui-icon-template-1\",\"type\":1,\"order_num\":0,\"id\":82,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637279183
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    186,
    1,
    '编辑菜单',
    '{\"title\":\"数据库设计\",\"pname\":\"系统管理\",\"route\":\"db/list\",\"href\":\"db/list.html\",\"icon\":\"layui-icon layui-icon-layouts\",\"type\":1,\"order_num\":31,\"id\":35,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637279223
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    187,
    1,
    '编辑菜单',
    '{\"title\":\"系统字典\",\"pname\":\"系统管理\",\"route\":\"cate/index\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-clear\",\"type\":1,\"order_num\":32,\"id\":36,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637279260
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    188,
    1,
    '编辑菜单',
    '{\"title\":\"表单设计器\",\"pname\":\"系统管理\",\"route\":\"form/list\",\"href\":\"view/form/list.html\",\"icon\":\"layui-icon layui-icon-template-1\",\"type\":1,\"order_num\":31,\"id\":82,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637279285
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    189,
    1,
    '编辑菜单',
    '{\"title\":\"系统字典\",\"pname\":\"系统管理\",\"route\":\"cate/index\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-clear\",\"type\":1,\"order_num\":50,\"id\":36,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637279295
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    190,
    1,
    '编辑菜单',
    '{\"title\":\"数据库设计\",\"pname\":\"系统管理\",\"route\":\"db/list\",\"href\":\"view/db/list.html\",\"icon\":\"layui-icon layui-icon-layouts\",\"type\":1,\"order_num\":31,\"id\":35,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637281307
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    191,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"yvjx\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637282800
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    192,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"3f5x\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637286423
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    193,
    1,
    '编辑菜单',
    '{\"title\":\"数据表设计\",\"pname\":\"系统管理\",\"route\":\"db/list\",\"href\":\"view/db/list.html\",\"icon\":\"layui-icon layui-icon-layouts\",\"type\":1,\"order_num\":31,\"id\":35,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637287584
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    194,
    1,
    '添加菜单',
    '{\"title\":\"更新表缓存\",\"pname\":\"35\",\"route\":\"db/update\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-refresh\",\"type\":1,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637287821
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    195,
    1,
    '编辑菜单',
    '{\"title\":\"更新表缓存\",\"pname\":\"数据表设计\",\"route\":\"db/update\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-refresh\",\"type\":2,\"order_num\":0,\"id\":88,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637287847
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    196,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"quvk\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637293146
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    197,
    1,
    '添加菜单',
    '{\"title\":\"备份数据\",\"pname\":\"35\",\"route\":\"db/backup\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-templeate-1\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637293324
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    198,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"uc9l\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637296765
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    199,
    1,
    '添加菜单',
    '{\"title\":\"还原数据列表\",\"pname\":\"35\",\"route\":\"db/backupFile\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-list\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637296812
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    200,
    1,
    '添加菜单',
    '{\"title\":\"数据还原\",\"pname\":\"35\",\"route\":\"db/reback\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-water\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637297488
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    201,
    1,
    '编辑菜单',
    '{\"title\":\"数据还原2\",\"pname\":\"数据表设计\",\"route\":\"db/reback\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-water\",\"type\":2,\"order_num\":0,\"id\":91,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637297619
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    202,
    1,
    '添加菜单',
    '{\"title\":\"删除备份\",\"pname\":\"35\",\"route\":\"db/delback\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-down\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637298574
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    203,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"dfnm\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637305837
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    204,
    1,
    '添加菜单',
    '{\"title\":\"数据库文档\",\"pname\":\"35\",\"route\":\"db/doc\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-service\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637308898
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    205,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ocgr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637309763
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    206,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"bdzc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637313775
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    207,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"huo9\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '/server/login/do',
    'POST',
    1637314347
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    208,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"f7yu\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637316500
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    209,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ajyd\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/login/do',
    'POST',
    1637322964
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    210,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"gtew\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/login/do',
    'POST',
    1637330154
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    211,
    1,
    '添加菜单',
    '{\"title\":\"编辑列表内容\",\"pname\":\"35\",\"route\":\"db/editTable\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-link\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637332155
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    212,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"dr2z\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/login/do',
    'POST',
    1637333854
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    213,
    1,
    '添加菜单',
    '{\"title\":\"优化表\",\"pname\":\"35\",\"route\":\"db/optimize\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-rss\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637337102
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    214,
    1,
    '添加菜单',
    '{\"title\":\"修复表\",\"pname\":\"35\",\"route\":\"db/repair\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-rate-solid\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637337155
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    215,
    1,
    '编辑菜单',
    '{\"title\":\"数据还原\",\"pname\":\"数据表设计\",\"route\":\"db/reback\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-water\",\"type\":2,\"order_num\":0,\"id\":91,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/edit',
    'POST',
    1637337188
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    216,
    1,
    '添加菜单',
    '{\"title\":\"删除表\",\"pname\":\"35\",\"route\":\"db/delTable\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-subtraction\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637337232
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    217,
    1,
    '添加菜单',
    '{\"title\":\"清空表\",\"pname\":\"35\",\"route\":\"db/clear\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-unlink\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637337279
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    218,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"5spa\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/login/do',
    'POST',
    1637338095
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    219,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"dsbn\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637370840
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    220,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"4a7h\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637371660
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    221,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"j4yv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637371669
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    222,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"8t32\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637371693
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    223,
    1,
    '添加菜单',
    '{\"title\":\"字段列表\",\"pname\":\"35\",\"route\":\"db/fieldList\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-star-fill\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637379386
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    224,
    1,
    '添加菜单',
    '{\"title\":\"展示表数据\",\"pname\":\"35\",\"route\":\"db/listData\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637380293
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    225,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"t4cp\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637388954
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    226,
    1,
    '添加菜单',
    '{\"title\":\"编辑数据\",\"pname\":\"35\",\"route\":\"db/editData\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-mike\",\"type\":3,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637389295
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    227,
    1,
    '添加菜单',
    '{\"title\":\"删除数据\",\"pname\":\"35\",\"route\":\"db/delData\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-del\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637393228
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    228,
    1,
    '添加菜单',
    '{\"title\":\"数据库字段列表\",\"pname\":\"35\",\"route\":\"db/fields\",\"href\":\"view/db/edit.html\",\"icon\":\"layui-icon layui-icon-auz\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637400438
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    229,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"nw6u\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637400506
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    230,
    1,
    '添加菜单',
    '{\"title\":\"删除字段\",\"pname\":\"35\",\"route\":\"db/delField\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-subtraction\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637405311
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    231,
    1,
    '添加菜单',
    '{\"title\":\"字段排序\",\"pname\":\"35\",\"route\":\"db/sortField\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-slider\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637406651
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    232,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"nxjl\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/login/do',
    'POST',
    1637409694
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    233,
    1,
    '添加菜单',
    '{\"title\":\"更改字段名\",\"pname\":\"35\",\"route\":\"db/changeFieldName\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-find-fill\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637414672
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    234,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"km6r\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637458328
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    235,
    1,
    '添加菜单',
    '{\"title\":\"设置字段为空或自增长\",\"pname\":\"35\",\"route\":\"db/setStatus\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-camera\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637461264
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    236,
    1,
    '添加菜单',
    '{\"title\":\"添加字段\",\"pname\":\"35\",\"route\":\"db/addField\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-website\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637489235
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    237,
    1,
    '添加菜单',
    '{\"title\":\"表索引列表\",\"pname\":\"35\",\"route\":\"db/keysList\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-wifi\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637490750
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    238,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"gtw7\"}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/login/do',
    'POST',
    1637494850
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    239,
    1,
    '编辑菜单',
    '{\"title\":\"数据库设计器\",\"pname\":\"系统管理\",\"route\":\"db/list\",\"href\":\"view/db/list.html\",\"icon\":\"layui-icon layui-icon-table\",\"type\":1,\"order_num\":31,\"id\":35,\"pid\":2}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/edit',
    'POST',
    1637494942
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    240,
    1,
    '编辑菜单',
    '{\"title\":\"表单设计器\",\"pname\":\"系统管理\",\"route\":\"form/list\",\"href\":\"view/form/list.html\",\"icon\":\"layui-icon layui-icon-form\",\"type\":1,\"order_num\":31,\"id\":82,\"pid\":2}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/edit',
    'POST',
    1637494996
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    241,
    1,
    '编辑菜单',
    '{\"title\":\"数据库设计器\",\"pname\":\"系统管理\",\"route\":\"db/list\",\"href\":\"view/db/list.html\",\"icon\":\"layui-icon layui-icon-template-1\",\"type\":1,\"order_num\":31,\"id\":35,\"pid\":2}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/edit',
    'POST',
    1637495008
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    242,
    1,
    '添加菜单',
    '{\"title\":\"删除索引\",\"pname\":\"35\",\"route\":\"db/delKey\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-download-circle\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637496539
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    243,
    1,
    '添加菜单',
    '{\"title\":\"设置索引\",\"pname\":\"35\",\"route\":\"db/setKey\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-layer\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637498516
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    244,
    1,
    '添加菜单',
    '{\"title\":\"创建表\",\"pname\":\"35\",\"route\":\"db/createTable\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637501722
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    245,
    1,
    '添加菜单',
    '{\"title\":\"复制表\",\"pname\":\"35\",\"route\":\"db/opcopy\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-clear\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637502932
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    246,
    1,
    '添加菜单',
    '{\"title\":\"执行Sql\",\"pname\":\"35\",\"route\":\"db/runSql\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-light\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637505223
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    247,
    1,
    '添加菜单',
    '{\"title\":\"获取创建Sql\",\"pname\":\"35\",\"route\":\"db/getSql\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-service\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/add',
    'POST',
    1637505417
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    248,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"gxpk\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637541837
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    249,
    1,
    '添加菜单',
    '{\"title\":\"模块管理\",\"pname\":\"2\",\"route\":\"mod/list\",\"href\":\"view/mod/list.html\",\"icon\":\"layui-icon layui-icon-slider\",\"type\":1,\"order_num\":0,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637544783
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    250,
    1,
    '添加菜单',
    '{\"title\":\"添加模块\",\"pname\":\"116\",\"route\":\"mod/add\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-read\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637544851
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    251,
    1,
    '添加菜单',
    '{\"title\":\"模块编辑前\",\"pname\":\"116\",\"route\":\"mod/editBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-set-sm\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637544885
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    252,
    1,
    '添加菜单',
    '{\"title\":\"编辑模块\",\"pname\":\"116\",\"route\":\"mod/edit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-share\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637544934
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    253,
    1,
    '添加菜单',
    '{\"title\":\"删除模块\",\"pname\":\"116\",\"route\":\"mod/delete\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-chat\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637544965
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    254,
    1,
    '添加菜单',
    '{\"title\":\"模块添加前\",\"pname\":\"116\",\"route\":\"mod/addBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-slider\",\"type\":3,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637548933
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    255,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ghnf\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637625446
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    256,
    1,
    '添加菜单',
    '{\"title\":\"批量删除表\",\"pname\":\"35\",\"route\":\"db/batchRemove\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-del\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637639126
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    257,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"gkwr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637639672
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    258,
    1,
    '添加菜单',
    '{\"title\":\"列表编辑字段\",\"pname\":\"9\",\"route\":\"menu/editData\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-key\",\"type\":2,\"order_num\":0,\"pid\":9}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637641890
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    259,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"mtsq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637642218
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    260,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"7qzj\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637642823
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    261,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"2s9q\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637711574
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    262,
    1,
    '添加菜单',
    '{\"title\":\"全局常量管理\",\"pname\":\"116\",\"route\":\"mod/params\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-dollar\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637713209
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    263,
    1,
    '添加菜单',
    '{\"title\":\"常量编辑前\",\"pname\":\"116\",\"route\":\"mod/paramsBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-at\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637713818
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    264,
    1,
    '添加菜单',
    '{\"title\":\"添加全局常量\",\"pname\":\"116\",\"route\":\"mod/paramsAdd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-addition\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637714435
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    265,
    1,
    '添加菜单',
    '{\"title\":\"编辑全局常量\",\"pname\":\"116\",\"route\":\"mod/paramsEdit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-print\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637714458
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    266,
    1,
    '添加菜单',
    '{\"title\":\"删除全局常量\",\"pname\":\"116\",\"route\":\"mod/paramDelete\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-subtraction\",\"type\":2,\"order_num\":0,\"pid\":116}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637714864
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    267,
    1,
    '添加菜单',
    '{\"title\":\"接口设计器\",\"pname\":\"2\",\"route\":\"api/list\",\"href\":\"view/api/list.html\",\"icon\":\"layui-icon layui-icon-ios\",\"type\":1,\"order_num\":0,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637727762
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    268,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"fwbc\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637727777
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    269,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"xgcs\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637727893
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    270,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"td2c\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637797636
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    271,
    1,
    '添加菜单',
    '{\"title\":\"添加数据\",\"pname\":\"35\",\"route\":\"db/addData\",\"href\":\"views/db/data-add.html\",\"icon\":\"layui-icon layui-icon-mike\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637812720
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    272,
    1,
    '添加菜单',
    '{\"title\":\"数据库列表\",\"pname\":\"35\",\"route\":\"db/confList\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-wifi\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637814442
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    273,
    1,
    '添加菜单',
    '{\"title\":\"添加数据库\",\"pname\":\"35\",\"route\":\"db/confAdd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-email\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637814475
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    274,
    1,
    '添加菜单',
    '{\"title\":\"编辑数据库\",\"pname\":\"35\",\"route\":\"db/confEdit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-rss\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637814503
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    275,
    1,
    '添加菜单',
    '{\"title\":\"测试数据库连接\",\"pname\":\"35\",\"route\":\"db/confTest\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-logout\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637814535
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    276,
    1,
    '添加菜单',
    '{\"title\":\"删除数据库\",\"pname\":\"35\",\"route\":\"db/confDel\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-subtraction\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637814566
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    277,
    1,
    '编辑菜单',
    '{\"title\":\"设置字段\",\"pname\":\"数据库设计器\",\"route\":\"db/setStatus\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-camera\",\"type\":2,\"order_num\":0,\"id\":107,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637814586
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    278,
    1,
    '添加菜单',
    '{\"title\":\"更换数据库\",\"pname\":\"35\",\"route\":\"db/confChange\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637815759
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    279,
    1,
    '添加菜单',
    '{\"title\":\"编辑数据库前\",\"pname\":\"35\",\"route\":\"db/confEditBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-snowflake\",\"type\":3,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637817580
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    280,
    1,
    '添加菜单',
    '{\"title\":\"保护列表\",\"pname\":\"35\",\"route\":\"db/safeList\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-camera\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637829436
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    281,
    1,
    '添加菜单',
    '{\"title\":\"添加保护\",\"pname\":\"35\",\"route\":\"db/safeAdd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-addition\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637829479
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    282,
    1,
    '添加菜单',
    '{\"title\":\"删除保护\",\"pname\":\"35\",\"route\":\"db/safeDel\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-subtraction\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637829535
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    283,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"8uyz\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637830100
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    284,
    1,
    '添加菜单',
    '{\"title\":\"添加数据库\",\"pname\":\"35\",\"route\":\"db/creatDatabase\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-align-left\",\"type\":2,\"order_num\":0,\"pid\":35}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637832116
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    285,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"swnd\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637885594
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    286,
    1,
    '添加菜单',
    '{\"title\":\"上传文件\",\"pname\":\"3\",\"route\":\"upload/file\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-upload-drag\",\"type\":3,\"order_num\":0,\"pid\":3}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637886979
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    287,
    1,
    '设置菜单显示',
    '{\"id\":142,\"ifshow\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/ifshow',
    'POST',
    1637886986
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    288,
    1,
    '编辑菜单',
    '{\"title\":\"上传文件\",\"pname\":\"公共模块\",\"route\":\"upload/index\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-upload-drag\",\"type\":3,\"order_num\":0,\"id\":142,\"pid\":3}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637887503
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    289,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"bsf2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637971387
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    290,
    1,
    '添加菜单',
    '{\"title\":\"注销登录\",\"pname\":\"3\",\"route\":\"admin/loginOut\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-delete\",\"type\":2,\"order_num\":0,\"pid\":3}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1637983849
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    291,
    1,
    '设置菜单显示',
    '{\"id\":143,\"ifshow\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/ifshow',
    'POST',
    1637983853
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    292,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"nj4a\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637983880
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    293,
    1,
    '编辑菜单',
    '{\"title\":\"角色管理\",\"pname\":\"1\",\"route\":\"auth/list\",\"href\":\"view/auth/index.html\",\"icon\":\"layui-icon layui-icon-service\",\"type\":1,\"order_num\":10,\"id\":10,\"pid\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637984459
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    294,
    1,
    '编辑菜单',
    '{\"title\":\"管理员管理\",\"pname\":\"1\",\"route\":\"admin/list\",\"href\":\"view/admin/list.html\",\"icon\":\"layui-icon layui-icon-key\",\"type\":1,\"order_num\":11,\"id\":11,\"pid\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1637984474
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    295,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"fvxm\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1637984519
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    296,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"dht3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638004552
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    297,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"bft8\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638060102
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    298,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"5nd4\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638096421
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    299,
    1,
    '编辑菜单',
    '{\"title\":\"计划任务\",\"pname\":\"系统管理\",\"route\":\"crons/list\",\"href\":\"view/crons/list.html\",\"icon\":\"layui-icon layui-icon-android\",\"type\":1,\"order_num\":9,\"id\":144,\"pid\":2}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1638096488
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    300,
    1,
    '删除菜单',
    '{\"id\":34}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638096518
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    301,
    1,
    '删除菜单',
    '{\"id\":33}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638096522
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    302,
    1,
    '删除菜单',
    '{\"id\":14}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638096526
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    303,
    1,
    '删除菜单',
    '{\"id\":36}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638096597
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    304,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"o5tn\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638096629
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    305,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"zsj3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638156128
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    306,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"rnrx\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638156466
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    307,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"p8t3\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638229591
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    308,
    1,
    '编辑菜单',
    '{\"title\":\"演示文稿\",\"pname\":\"内容管理\",\"route\":\"ppt/list\",\"href\":\"view/ppt/list.html\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":1,\"order_num\":0,\"id\":149,\"pid\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1638229977
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    309,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"h2mf\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638230989
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    310,
    1,
    '删除菜单',
    '{\"id\":37}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638235991
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    311,
    1,
    '删除菜单',
    '{\"id\":5}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638235999
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    312,
    1,
    '删除菜单',
    '{\"id\":4}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638236003
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    313,
    1,
    '删除菜单',
    '{\"id\":7}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638236008
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    314,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"dy35\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638236053
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    315,
    1,
    '编辑菜单',
    '{\"title\":\"首页工作台\",\"pname\":\"内容管理\",\"route\":\"index/welcome\",\"href\":\"view/index/welcome.html\",\"icon\":\"layui-icon layui-icon-rate-solid\",\"type\":1,\"order_num\":1,\"id\":53,\"pid\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/edit',
    'POST',
    1638236271
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    316,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"vmxr\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638239040
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    317,
    1,
    '添加菜单',
    '{\"title\":\"导入EXCEL\",\"pname\":\"159\",\"route\":\"excel/upload\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-fonts-code\",\"type\":2,\"order_num\":0,\"pid\":159}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638246067
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    318,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"n7f2\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638246457
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    319,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"cffe\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638331653
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    320,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"gtop\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638331793
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    321,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"5459\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638337427
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    322,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"lons\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638401441
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    323,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"rayd\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638418412
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    324,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"msuv\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638441140
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    325,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"wzuq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638490113
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    326,
    1,
    '添加菜单',
    '{\"title\":\"文档添加前\",\"pname\":\"170\",\"route\":\"doc/addBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-at\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638500902
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    327,
    1,
    '添加菜单',
    '{\"title\":\"上传文件\",\"pname\":\"170\",\"route\":\"doc/upload\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-addition\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638502463
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    328,
    1,
    '添加菜单',
    '{\"title\":\"新增文档\",\"pname\":\"170\",\"route\":\"doc/addmd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-praise\",\"type\":2,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638508040
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    329,
    1,
    '添加菜单',
    '{\"title\":\"文档列表\",\"pname\":\"170\",\"route\":\"doc/listmd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-link\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638516639
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    330,
    1,
    '添加菜单',
    '{\"title\":\"编辑文档前\",\"pname\":\"170\",\"route\":\"doc/editmdBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-read\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638518052
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    331,
    1,
    '添加菜单',
    '{\"title\":\"编辑文档\",\"pname\":\"170\",\"route\":\"doc/editmd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638521121
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    332,
    1,
    '添加菜单',
    '{\"title\":\"删除文档\",\"pname\":\"170\",\"route\":\"doc/delmd\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-logout\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638521832
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    333,
    1,
    '添加菜单',
    '{\"title\":\"编辑文档列表\",\"pname\":\"170\",\"route\":\"doc/editData\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-email\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638522299
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    334,
    1,
    '添加菜单',
    '{\"title\":\"回写数据\",\"pname\":\"170\",\"route\":\"doc/back\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-windows\",\"type\":3,\"order_num\":0,\"pid\":170}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638525733
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    335,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"r7dq\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638576610
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    336,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"szfw\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638577554
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    337,
    1,
    '添加菜单',
    '{\"title\":\"接口添加前\",\"pname\":\"184\",\"route\":\"api/addBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-key\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638587555
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    338,
    1,
    '添加菜单',
    '{\"title\":\"文章管理\",\"pname\":\"1\",\"route\":\"art\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-slider\",\"type\":1,\"order_num\":0,\"pid\":1}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638591849
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    339,
    1,
    '删除菜单',
    '{\"id\":191}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638592590
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    340,
    1,
    '删除菜单',
    '{\"id\":192}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638592594
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    341,
    1,
    '删除菜单',
    '{\"id\":193}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/del',
    'POST',
    1638592598
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    342,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"juzu\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638661797
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    343,
    1,
    '添加菜单',
    '{\"title\":\"接口参数列表\",\"pname\":\"184\",\"route\":\"apiparams/list\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-key\",\"type\":2,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638663449
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    344,
    1,
    '添加菜单',
    '{\"title\":\"从数据库添加参数\",\"pname\":\"184\",\"route\":\"apiparams/addFromDb\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-logout\",\"type\":2,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638679061
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    345,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ugm9\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638755567
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    346,
    1,
    '添加菜单',
    '{\"title\":\"编辑参数列表名字\",\"pname\":\"184\",\"route\":\"apiparams/editData\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-transfer\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638758164
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    347,
    1,
    '添加菜单',
    '{\"title\":\"删除接口参数\",\"pname\":\"184\",\"route\":\"apiparams/del\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-subtraction\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638763168
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    348,
    1,
    '添加菜单',
    '{\"title\":\"接口参数编辑前\",\"pname\":\"184\",\"route\":\"apiparams/editBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-rate\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638766373
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    349,
    1,
    '添加菜单',
    '{\"title\":\"添加接口参数\",\"pname\":\"184\",\"route\":\"apiparams/add\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-service\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638766432
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    350,
    1,
    '添加菜单',
    '{\"title\":\"编辑接口参数\",\"pname\":\"184\",\"route\":\"apiparams/edit\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-camera\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/add',
    'POST',
    1638766461
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    351,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"phzs\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638840210
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    352,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"zju4\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/login/do',
    'POST',
    1638874466
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    353,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"ojnm\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/login/do',
    'POST',
    1639027727
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    354,
    1,
    '添加菜单',
    '{\"title\":\"更新接口代码\",\"pname\":\"184\",\"route\":\"api/addLogic\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-android\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/add',
    'POST',
    1639028711
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    355,
    1,
    '添加菜单',
    '{\"title\":\"获取接口代码\",\"pname\":\"184\",\"route\":\"api/getLogic\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-share\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/add',
    'POST',
    1639029862
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    356,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"mmar\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/login/do',
    'POST',
    1639037023
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    357,
    1,
    '添加菜单',
    '{\"title\":\"设计程序\",\"pname\":\"206\",\"route\":\"code/editCode\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-spread-left\",\"type\":3,\"order_num\":0,\"pid\":206}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/add',
    'POST',
    1639043611
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    358,
    1,
    'admin用户登录',
    '{\"username\":\"admin\",\"captcha\":\"335p\"}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/login/do',
    'POST',
    1639093982
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    359,
    1,
    '添加菜单',
    '{\"title\":\"分页新增\",\"pname\":\"184\",\"route\":\"apiparams/addPage\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-wifi\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/add',
    'POST',
    1639107856
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    360,
    1,
    '添加菜单',
    '{\"title\":\"接口测试列表\",\"pname\":\"184\",\"route\":\"apitest/list\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-read\",\"type\":2,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/add',
    'POST',
    1639126570
  );
INSERT INTO
  `rt_admin_oplog` (
    `id`,
    `admin_id`,
    `log`,
    `data`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`
  )
VALUES
  (
    361,
    1,
    '添加菜单',
    '{\"title\":\"接口测试添加前\",\"pname\":\"184\",\"route\":\"apitest/addBefore\",\"href\":\"\",\"icon\":\"layui-icon layui-icon-email\",\"type\":3,\"order_num\":0,\"pid\":184}',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/add',
    'POST',
    1639127617
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_viewlog
# ------------------------------------------------------------

INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    2,
    1,
    '添加或删除菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636851045,
    0
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    3,
    2,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636851077,
    1636851990
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    4,
    1,
    '添加或删除菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636851990,
    1636852081
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    5,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636852081,
    1636852084
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    6,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636852084,
    1636852148
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    7,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636852148,
    1636852151
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    8,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636852151,
    1636852168
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    9,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636852168,
    1636941898
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    10,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1636941898,
    1636941901
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    11,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636941901,
    1636941908
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    12,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636941908,
    1636941924
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    13,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636941924,
    1636941965
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    14,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636941965,
    1636941981
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    15,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636941981,
    1636942013
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    16,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636942013,
    1636942018
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    17,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636942018,
    1636942180
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    18,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636942180,
    1636942471
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    19,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1636942471,
    1636942473
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    20,
    1,
    '添加角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/addTree',
    'GET',
    1636942473,
    1636942478
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    21,
    1,
    '编辑角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/beforEdit',
    'GET',
    1636942478,
    1636942499
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    22,
    1,
    '添加角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/addTree',
    'GET',
    1636942499,
    1636942510
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    23,
    1,
    '编辑角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/beforEdit',
    'GET',
    1636942510,
    1636942771
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    24,
    1,
    '添加角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/addTree',
    'GET',
    1636942771,
    1636943618
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    25,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636943618,
    1636943621
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    26,
    1,
    '添加角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/addTree',
    'GET',
    1636943621,
    1636944071
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    27,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636944071,
    1636944077
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    28,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636944077,
    1636944104
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    29,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636944104,
    1636944444
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    30,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636944444,
    1636947887
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    31,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636947887,
    1636947903
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    32,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636947903,
    1636947931
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    33,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636947931,
    1636948396
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    34,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636948396,
    1636950055
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    35,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636950055,
    1636950060
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    36,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636950060,
    1636950088
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    37,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636950088,
    1636950206
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    38,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636950206,
    1636958873
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    39,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636958873,
    1636958880
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    40,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636958880,
    1636958889
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    41,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636958889,
    1636958901
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    42,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636958901,
    1636959492
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    43,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636959492,
    1636959517
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    44,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636959517,
    1636959534
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    45,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636959534,
    1636959542
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    46,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636959542,
    1636959557
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    47,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636959557,
    1636959580
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    48,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636959580,
    1636959657
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    49,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636959657,
    1636962361
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    50,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1636962361,
    1636962387
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    51,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636962387,
    1636962398
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    52,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636962398,
    1636962429
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    53,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636962429,
    1636962445
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    54,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636962445,
    1636964747
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    55,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636964747,
    1636964786
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    56,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636964786,
    1636965961
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    57,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636965960,
    1636965966
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    58,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636965966,
    1636965970
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    59,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636965970,
    1636966011
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    60,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636966011,
    1636966014
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    61,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1636966014,
    1636966045
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    62,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636966045,
    1636966102
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    63,
    1,
    '管理员操作日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/op',
    'GET',
    1636966102,
    1636966221
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    64,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1636966221,
    1636966320
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    65,
    1,
    '管理员操作日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/op',
    'GET',
    1636966320,
    1636968670
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    66,
    1,
    '管理员行为日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/view',
    'GET',
    1636968670,
    1636969080
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    67,
    1,
    '系统错误日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/err',
    'GET',
    1636969080,
    1636969086
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    68,
    1,
    '管理员行为日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/view',
    'GET',
    1636969086,
    1636969131
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    69,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1636969131,
    1637020762
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    70,
    1,
    '管理员操作日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/op',
    'GET',
    1637020762,
    1637020765
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    71,
    1,
    '管理员行为日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/view',
    'GET',
    1637020765,
    1637020768
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    72,
    1,
    '系统错误日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/err',
    'GET',
    1637020768,
    1637023322
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    73,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637023322,
    1637023329
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    74,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637023329,
    1637023335
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    75,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637023335,
    1637023388
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    76,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637023388,
    1637023402
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    77,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637023402,
    1637028911
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    78,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637028911,
    1637028919
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    79,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637028919,
    1637029248
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    80,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637029248,
    1637029256
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    81,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637029256,
    1637029590
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    82,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637029590,
    1637029596
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    83,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637029596,
    1637030964
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    84,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637030964,
    1637030982
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    85,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637030982,
    1637031466
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    86,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637031466,
    1637031472
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    87,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637031472,
    1637031479
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    88,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637031479,
    1637031483
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    89,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637031483,
    1637031495
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    90,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637031495,
    1637031501
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    91,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637031501,
    1637031530
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    92,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637031530,
    1637031573
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    93,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637031573,
    1637031992
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    94,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637031992,
    1637032000
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    95,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637032000,
    1637033820
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    96,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637033820,
    1637034083
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    97,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637034083,
    1637034302
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    98,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637034302,
    1637034309
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    99,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637034309,
    1637034320
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    100,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637034320,
    1637034432
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    101,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637034432,
    1637034521
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    102,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637034521,
    1637034531
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    103,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637034531,
    1637034627
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    104,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637034627,
    1637036272
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    105,
    1,
    '添加角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/addTree',
    'GET',
    1637036272,
    1637036281
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    106,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637036281,
    1637036288
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    107,
    1,
    '编辑角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/beforEdit',
    'GET',
    1637036288,
    1637036876
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    108,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637036876,
    1637036909
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    109,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637036909,
    1637037068
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    110,
    1,
    '编辑角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/beforEdit',
    'GET',
    1637037068,
    1637037071
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    111,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637037071,
    1637037683
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    112,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637037683,
    1637038175
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    113,
    1,
    '添加管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/addBefore',
    'GET',
    1637038175,
    1637038189
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    114,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637038189,
    1637038295
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    115,
    1,
    '编辑管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/editBefore',
    'GET',
    1637038295,
    1637038492
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    116,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637038492,
    1637038918
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    117,
    1,
    '编辑管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/editBefore',
    'GET',
    1637038918,
    1637039222
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    118,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637039222,
    1637039440
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    119,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637039440,
    1637039577
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    120,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637039577,
    1637039581
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    121,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637039581,
    1637039585
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    122,
    1,
    '编辑管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/editBefore',
    'GET',
    1637039585,
    1637039790
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    123,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637039790,
    1637039793
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    124,
    1,
    '编辑管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/editBefore',
    'GET',
    1637039793,
    1637039796
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    125,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637039796,
    1637040178
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    126,
    1,
    '添加管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/addBefore',
    'GET',
    1637040177,
    1637040196
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    127,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637040196,
    1637040201
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    128,
    1,
    '编辑管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/editBefore',
    'GET',
    1637040201,
    1637040203
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    129,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637040203,
    1637040231
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    130,
    1,
    '管理员操作日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/op',
    'GET',
    1637040231,
    1637052521
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    131,
    1,
    '管理员行为日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/view',
    'GET',
    1637052521,
    1637052525
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    132,
    1,
    '系统错误日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/err',
    'GET',
    1637052525,
    1637055527
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    133,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637055527,
    1637055543
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    134,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637055543,
    1637055590
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    135,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637055590,
    1637055649
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    136,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637055649,
    1637055959
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    137,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637055959,
    1637055965
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    138,
    1,
    '添加管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/addBefore',
    'GET',
    1637055965,
    1637107906
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    139,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637107906,
    1637107920
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    140,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637107920,
    1637107949
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    141,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637107949,
    1637108007
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    142,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637108007,
    1637108024
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    143,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637108023,
    1637108058
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    144,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637108058,
    1637109212
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    145,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637109212,
    1637109232
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    146,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637109232,
    1637111043
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    147,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637111043,
    1637111056
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    148,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637111056,
    1637112409
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    149,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637112409,
    1637112427
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    150,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637112427,
    1637112773
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    151,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637112773,
    1637112783
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    152,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637112783,
    1637123825
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    153,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637123825,
    1637123851
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    154,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637123851,
    1637123865
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    155,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637123865,
    1637123948
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    156,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637123948,
    1637141805
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    157,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637141805,
    1637141826
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    158,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637141826,
    1637201389
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    159,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637201388,
    1637201424
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    160,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637201424,
    1637205392
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    161,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637205392,
    1637205401
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    162,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637205401,
    1637205485
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    163,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637205485,
    1637208734
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    164,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637208734,
    1637208784
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    165,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637208784,
    1637208797
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    166,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637208797,
    1637208816
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    167,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637208816,
    1637208881
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    168,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637208881,
    1637208885
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    169,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637208885,
    1637208906
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    170,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637208906,
    1637208936
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    171,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637208936,
    1637208944
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    172,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637208944,
    1637209956
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    173,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637209956,
    1637209992
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    174,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637209992,
    1637212862
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    175,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637212862,
    1637212896
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    176,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637212896,
    1637232272
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    177,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637232272,
    1637232277
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    178,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637232277,
    1637232296
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    179,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637232296,
    1637232300
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    180,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637232300,
    1637232332
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    181,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637232332,
    1637279173
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    182,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637279173,
    1637279183
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    183,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637279183,
    1637279193
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    184,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637279193,
    1637279223
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    185,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637279223,
    1637279251
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    186,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637279251,
    1637279260
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    187,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637279260,
    1637279279
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    188,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637279279,
    1637279285
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    189,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637279285,
    1637279291
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    190,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637279291,
    1637279295
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    191,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637279295,
    1637281301
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    192,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637281301,
    1637281307
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    193,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637281307,
    1637287504
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    194,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637287504,
    1637287574
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    195,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637287574,
    1637287584
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    196,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637287584,
    1637287791
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    197,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637287791,
    1637287821
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    198,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637287821,
    1637287840
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    199,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637287840,
    1637287847
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    200,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637287847,
    1637293302
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    201,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637293302,
    1637293324
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    202,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637293324,
    1637296780
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    203,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637296780,
    1637296812
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    204,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637296812,
    1637297467
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    205,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637297467,
    1637297488
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    206,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637297488,
    1637297552
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    207,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637297552,
    1637297619
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    208,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637297619,
    1637298311
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    209,
    1,
    '管理员操作日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/op',
    'GET',
    1637298311,
    1637298323
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    210,
    1,
    '管理员行为日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/view',
    'GET',
    1637298323,
    1637298477
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    211,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637298477,
    1637298481
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    212,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637298481,
    1637298574
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    213,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637298574,
    1637308877
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    214,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637308877,
    1637308898
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    215,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637308898,
    1637332122
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    216,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637332122,
    1637332155
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    217,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637332155,
    1637337055
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    218,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637337055,
    1637337102
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    219,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637337102,
    1637337120
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    220,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637337120,
    1637337155
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    221,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637337155,
    1637337185
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    222,
    1,
    '编辑菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637337185,
    1637337188
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    223,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637337188,
    1637337200
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    224,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637337200,
    1637337232
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    225,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637337232,
    1637337246
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    226,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637337246,
    1637337279
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    227,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637337279,
    1637371702
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    228,
    1,
    '管理员操作日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/op',
    'GET',
    1637371702,
    1637371705
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    229,
    1,
    '管理员行为日志',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/logs/view',
    'GET',
    1637371705,
    1637379349
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    230,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637379349,
    1637379352
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    231,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637379352,
    1637379386
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    232,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637379386,
    1637380273
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    233,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637380273,
    1637380293
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    234,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637380293,
    1637389271
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    235,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637389271,
    1637389295
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    236,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637389295,
    1637393207
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    237,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637393207,
    1637393228
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    238,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637393228,
    1637400399
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    239,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637400399,
    1637400438
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    240,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637400438,
    1637405291
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    241,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637405291,
    1637405311
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    242,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637405311,
    1637406630
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    243,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637406629,
    1637406651
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    244,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637406651,
    1637414645
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    245,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637414645,
    1637414672
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    246,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637414672,
    1637428156
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    247,
    1,
    '添加管理员',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/admin/addBefore',
    'GET',
    1637428156,
    1637461213
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    248,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637461213,
    1637461225
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    249,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637461225,
    1637461264
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    250,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637461264,
    1637478530
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    251,
    1,
    '添加管理员',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/addBefore',
    'GET',
    1637478530,
    1637489189
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    252,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637489189,
    1637489193
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    253,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637489193,
    1637489235
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    254,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637489235,
    1637490727
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    255,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637490727,
    1637490750
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    256,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637490750,
    1637494867
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    257,
    1,
    '编辑菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637494867,
    1637494942
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    258,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637494942,
    1637494978
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    259,
    1,
    '编辑菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637494978,
    1637494996
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    260,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637494996,
    1637495003
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    261,
    1,
    '编辑菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637495003,
    1637495008
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    262,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637495008,
    1637496508
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    263,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637496508,
    1637496539
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    264,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637496539,
    1637498489
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    265,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637498489,
    1637498516
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    266,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637498516,
    1637501699
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    267,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637501699,
    1637501722
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    268,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637501722,
    1637502905
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    269,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637502905,
    1637502932
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    270,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637502932,
    1637504479
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    271,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637504479,
    1637505224
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    272,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637505224,
    1637505395
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    273,
    1,
    '添加菜单',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/one',
    'GET',
    1637505395,
    1637505417
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    274,
    1,
    '菜单列表',
    '::1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    '/server/menu/oplist',
    'GET',
    1637505417,
    1637544745
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    275,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637544745,
    1637544784
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    276,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637544784,
    1637544822
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    277,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637544822,
    1637544851
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    278,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637544851,
    1637544854
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    279,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637544854,
    1637544885
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    280,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637544885,
    1637544888
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    281,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637544888,
    1637544934
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    282,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637544934,
    1637544937
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    283,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637544937,
    1637544965
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    284,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637544965,
    1637548908
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    285,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637548908,
    1637548933
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    286,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637548933,
    1637625502
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    287,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637625502,
    1637625505
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    288,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637625505,
    1637639035
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    289,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637639035,
    1637639045
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    290,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637639045,
    1637639126
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    291,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637639126,
    1637641868
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    292,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637641868,
    1637641890
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    293,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637641890,
    1637642790
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    294,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637642790,
    1637642833
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    295,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637642833,
    1637642845
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    296,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637642845,
    1637642850
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    297,
    1,
    '添加角色',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/addTree',
    'GET',
    1637642850,
    1637642872
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    298,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637642872,
    1637642950
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    299,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637642950,
    1637642969
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    300,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637642969,
    1637713173
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    301,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637713173,
    1637713176
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    302,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637713176,
    1637713210
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    303,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637713210,
    1637713792
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    304,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637713792,
    1637713818
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    305,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637713818,
    1637714343
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    306,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637714343,
    1637714435
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    307,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637714435,
    1637714438
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    308,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637714438,
    1637714458
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    309,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637714458,
    1637714844
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    310,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637714844,
    1637714864
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    311,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637714864,
    1637727723
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    312,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637727723,
    1637727762
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    313,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637727762,
    1637727808
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    314,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637727808,
    1637812662
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    315,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637812662,
    1637812683
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    316,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637812683,
    1637812720
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    317,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637812720,
    1637814425
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    318,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637814425,
    1637814442
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    319,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637814442,
    1637814457
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    320,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637814457,
    1637814476
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    321,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637814476,
    1637814489
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    322,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637814489,
    1637814504
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    323,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637814504,
    1637814518
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    324,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637814518,
    1637814535
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    325,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637814535,
    1637814550
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    326,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637814550,
    1637814566
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    327,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637814566,
    1637814577
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    328,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637814577,
    1637814586
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    329,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637814586,
    1637815742
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    330,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637815741,
    1637815760
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    331,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637815760,
    1637817556
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    332,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637817556,
    1637817581
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    333,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637817581,
    1637829412
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    334,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637829412,
    1637829436
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    335,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637829436,
    1637829459
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    336,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637829459,
    1637829479
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    337,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637829479,
    1637829516
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    338,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637829516,
    1637829535
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    339,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637829535,
    1637829749
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    340,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637829749,
    1637832093
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    341,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637832093,
    1637832097
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    342,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637832097,
    1637832116
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    343,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637832116,
    1637885618
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    344,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637885618,
    1637886930
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    345,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637886930,
    1637886949
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    346,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637886949,
    1637886979
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    347,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637886979,
    1637887497
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    348,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637887497,
    1637887503
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    349,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637887503,
    1637983816
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    350,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637983816,
    1637983849
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    351,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637983849,
    1637983920
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    352,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1637983920,
    1637983922
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    353,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1637983922,
    1637983956
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    354,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637983956,
    1637984450
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    355,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637984450,
    1637984459
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    356,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637984459,
    1637984470
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    357,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1637984470,
    1637984475
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    358,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1637984475,
    1638060204
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    359,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1638060204,
    1638060346
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    360,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638060346,
    1638096474
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    361,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638096474,
    1638096488
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    362,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638096488,
    1638096513
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    363,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638096513,
    1638096577
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    364,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638096577,
    1638229964
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    365,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638229964,
    1638229978
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    366,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638229978,
    1638235977
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    367,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1638235977,
    1638236109
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    368,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1638236109,
    1638236130
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    369,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638236130,
    1638236170
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    370,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638236170,
    1638236272
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    371,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638236272,
    1638236297
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    372,
    1,
    '角色列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/auth/list',
    'GET',
    1638236297,
    1638236300
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    373,
    1,
    '管理员列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/admin/list',
    'GET',
    1638236300,
    1638236333
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    374,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638236333,
    1638246033
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    375,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638246033,
    1638246067
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    376,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638246067,
    1638500877
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    377,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638500877,
    1638500902
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    378,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638500902,
    1638502443
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    379,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638502443,
    1638502463
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    380,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638502463,
    1638508001
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    381,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638508001,
    1638508040
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    382,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638508040,
    1638516601
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    383,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638516600,
    1638516640
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    384,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638516640,
    1638518022
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    385,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638518022,
    1638518052
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    386,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638518052,
    1638521100
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    387,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638521100,
    1638521121
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    388,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638521121,
    1638521814
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    389,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638521814,
    1638521832
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    390,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638521832,
    1638522280
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    391,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638522280,
    1638522299
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    392,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638522299,
    1638525711
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    393,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638525711,
    1638525733
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    394,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638525733,
    1638587531
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    395,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638587531,
    1638587555
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    396,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638587555,
    1638591832
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    397,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638591832,
    1638591849
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    398,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638591849,
    1638663420
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    399,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638663420,
    1638663449
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    400,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638663449,
    1638679036
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    401,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638679036,
    1638679061
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    402,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638679061,
    1638758128
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    403,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638758128,
    1638758164
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    404,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638758164,
    1638763051
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    405,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638763051,
    1638763169
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    406,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638763169,
    1638766243
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    407,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638766243,
    1638766373
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    408,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638766373,
    1638766402
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    409,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638766402,
    1638766432
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    410,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638766432,
    1638766435
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    411,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638766435,
    1638766461
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    412,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638766461,
    1638766688
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    413,
    1,
    '编辑菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/one',
    'GET',
    1638766688,
    1638779639
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    414,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
    '/server/menu/oplist',
    'GET',
    1638779639,
    1639028681
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    415,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/one',
    'GET',
    1639028681,
    1639028711
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    416,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/oplist',
    'GET',
    1639028711,
    1639029843
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    417,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/one',
    'GET',
    1639029843,
    1639029862
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    418,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/oplist',
    'GET',
    1639029862,
    1639043592
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    419,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/one',
    'GET',
    1639043592,
    1639043611
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    420,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/oplist',
    'GET',
    1639043611,
    1639107821
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    421,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/one',
    'GET',
    1639107821,
    1639107856
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    422,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/oplist',
    'GET',
    1639107856,
    1639126322
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    423,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/one',
    'GET',
    1639126322,
    1639126571
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    424,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/oplist',
    'GET',
    1639126571,
    1639127595
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    425,
    1,
    '添加菜单',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/one',
    'GET',
    1639127595,
    1639127617
  );
INSERT INTO
  `rt_admin_viewlog` (
    `id`,
    `admin_id`,
    `log`,
    `ip`,
    `agent`,
    `url`,
    `method`,
    `addtime`,
    `leavetime`
  )
VALUES
  (
    426,
    1,
    '菜单列表',
    '::ffff:127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
    '/server/menu/oplist',
    'GET',
    1639127617,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api
# ------------------------------------------------------------

INSERT INTO
  `rt_api` (
    `id`,
    `name`,
    `mod_id`,
    `menu_id`,
    `mod_key`,
    `key`,
    `method`,
    `remark`,
    `add_time`,
    `update_time`,
    `user_id`
  )
VALUES
  (
    12,
    '文章列表',
    46,
    0,
    'art',
    'list',
    'get',
    '',
    1638779692,
    1638779692,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_form
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_logic
# ------------------------------------------------------------

INSERT INTO
  `rt_api_logic` (`id`, `code`, `add_time`, `update_time`)
VALUES
  (
    12,
    '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"gd_var\" id=\"w%.+3f~X=g2PemM=+|gQ\" x=\"63\" y=\"38\"><field name=\"var_type\">let</field><field name=\"var\">data</field><value name=\"val\"><block type=\"gd_post\" id=\"xd{M-#D7BQ4-RT.d6fVk\"><field name=\"var\"></field></block></value><next><block type=\"controls_if\" id=\",378wuFR,v^x$f1jwg,a\"><value name=\"IF0\"><block type=\"gd_isempty\" id=\"}P4epe6$T}kcothj@(Bl\"><field name=\"var_type\">isEmpty</field><field name=\"var\">data</field></block></value><statement name=\"DO0\"><block type=\"gd_console\" id=\"_P#9!|CI=gD)q@yVaj{h\"><field name=\"var\">data</field><next><block type=\"gd_fail\" id=\",j6GIZnJ}e3O2d4w:(~+\"><field name=\"var\">\"数据为空\"</field></block></next></block></statement><next><block type=\"controls_switch\" id=\")H|i~uC6|Lqww`Z{$8m;\"><value name=\"SWITCH\"><block type=\"gd_post\" id=\"PW]4SMcpg3aYyD4y4cOu\"><field name=\"var\"></field></block></value><value name=\"CASE0\"><block type=\"gd_get\" id=\"hj]Rv;?xh@(d,^A}Tu~(\"><field name=\"var\"></field></block></value><statement name=\"DO0\"><block type=\"gd_var\" id=\"-1Jl|!BI$^IyjDFHa0c[\"><field name=\"var_type\">let</field><field name=\"var\">data</field><value name=\"val\"><block type=\"gd_inline\" id=\"$Ay4vp_LAXL!x`(^-x[N\"><field name=\"var\">\'ddd\'</field></block></value></block></statement></block></next></block></next></block></xml>',
    1639029122,
    1639034082
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_params
# ------------------------------------------------------------

INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    16,
    12,
    'id',
    '文章id',
    'number',
    0,
    0,
    0,
    0,
    '',
    0,
    NULL,
    1,
    'rt_article',
    'id'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    17,
    12,
    'category_id',
    '分类id',
    'number',
    0,
    0,
    0,
    0,
    '11',
    1,
    NULL,
    1,
    'rt_article',
    'category_id'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    24,
    12,
    'title',
    '标题',
    'string',
    0,
    0,
    0,
    0,
    '1231',
    1,
    NULL,
    1,
    'rt_article',
    'title'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    25,
    12,
    'desc_content',
    '',
    'string',
    0,
    0,
    0,
    0,
    '',
    1,
    NULL,
    1,
    'rt_article',
    'desc_content'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    26,
    12,
    'image',
    '图片',
    'string',
    0,
    0,
    1,
    10,
    '',
    1,
    'image',
    1,
    'rt_article',
    'image'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    27,
    12,
    'content',
    '内容',
    'string',
    0,
    0,
    0,
    0,
    '',
    1,
    'date',
    1,
    'rt_article',
    'content'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    30,
    12,
    'author',
    '作者:id:name',
    'string',
    0,
    0,
    0,
    0,
    '',
    1,
    NULL,
    1,
    'rt_article',
    'author'
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    34,
    12,
    'limit',
    '每页数据量',
    'number',
    0,
    0,
    0,
    0,
    '20',
    0,
    NULL,
    0,
    '',
    ''
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    35,
    12,
    'param',
    '分页参数',
    'string',
    0,
    0,
    0,
    0,
    '',
    0,
    NULL,
    0,
    '',
    ''
  );
INSERT INTO
  `rt_api_params` (
    `id`,
    `aid`,
    `key`,
    `name`,
    `type`,
    `len_min`,
    `len_max`,
    `num_min`,
    `num_max`,
    `def`,
    `required`,
    `format`,
    `isdb`,
    `tablename`,
    `tablefield`
  )
VALUES
  (
    36,
    12,
    'page',
    '分页页数',
    'number',
    0,
    0,
    0,
    0,
    '1',
    0,
    NULL,
    0,
    '',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_table
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_test
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_area
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_article
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_cate
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_category
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_code
# ------------------------------------------------------------

INSERT INTO
  `rt_code` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `name`,
    `path`,
    `title`,
    `content`,
    `type`,
    `remark`
  )
VALUES
  (
    1,
    0,
    1639048245,
    0,
    'api_test',
    'server',
    '接口测试',
    '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"gd_class\" id=\"Z*{ruYW)N@e4i4Td.Tgo\" x=\"113\" y=\"-388\"><field name=\"className\">apitest</field><field name=\"extendsName\"></field><field name=\"var_type\">Base</field><statement name=\"chain\"><block type=\"gd_classmethod\" id=\".b]f{^Rv=ks$hbgAe.|m\"><field name=\"methodName\">async listAction</field><field name=\"params\"></field><comment pinned=\"false\" h=\"80\" w=\"160\">列表函数</comment><statement name=\"chains\"><block type=\"gd_lets\" id=\"^:y(#gy_bY?(v.|i?mMH\"><field name=\"var_type\">let</field><field name=\"letsname\">this.get()</field><statement name=\"chain\"><block type=\"gd_plain\" id=\"A!@SJ;{]:=A:/+(LOd%9\"><field name=\"var\">page</field><next><block type=\"gd_plain\" id=\"9`i9FBwkXk)=~T![rK,2\"><field name=\"var\">limit</field><next><block type=\"gd_plain\" id=\"HkhuQnCL;8wXMKD=Lv~t\"><field name=\"var\">param</field></block></next></block></next></block></statement><next><block type=\"gd_var\" id=\"RX)ZT3wm~ma_B_/pV9wk\"><field name=\"var_type\">let</field><field name=\"var\">wsql</field><value name=\"val\"><block type=\"gd_inline\" id=\"8Q-g#XEjxa`r`L.7+k~x\"><field name=\"var\">{}</field></block></value><next><block type=\"controls_if\" id=\"oH8i?De{Nd|Q8?Qtv-b)\"><value name=\"IF0\"><block type=\"gd_inline\" id=\"PNa@s@jwAN*0,+}Wk7k0\"><field name=\"var\">param</field></block></value><statement name=\"DO0\"><block type=\"gd_val\" id=\"y@Rr8rtTf{6jo2p?gUag\"><field name=\"var1\">wsql</field><field name=\"var2\">this.parseSearch(param,wsql)</field></block></statement><next><block type=\"gd_var\" id=\"QaDzZ^.}rM4cIYfHJo}2\"><field name=\"var_type\">let</field><field name=\"var\">list</field><value name=\"val\"><block type=\"gd_await\" id=\"k^H)L(.mRv`F%vK`a1n|\"><value name=\"val\"><block type=\"gd_model\" id=\"B*G`3dClllHY+g00}:O7\"><field name=\"var\">api_test</field><value name=\"val\"><block type=\"gd_where\" id=\"$*uv=r5bLLhd:pa)Q~_Z\"><field name=\"var_type\">where</field><field name=\"var\">wsql</field><value name=\"val\"><block type=\"gd_where\" id=\"77;Ab%q(Mn}yo^;z!)~y\"><field name=\"var_type\">page</field><field name=\"var\">page,limit</field><value name=\"val\"><block type=\"gd_where\" id=\"(i4R)[g#[bv!EEO+pnT1\"><field name=\"var_type\">order</field><field name=\"var\">\'id desc\'</field><value name=\"val\"><block type=\"gd_select\" id=\"m}rcIpQr2]WEzR4.S@By\"></block></value></block></value></block></value></block></value></block></value></block></value><next><block type=\"gd_var\" id=\"*7XR??r+EQ-wcKWnV/8Q\"><field name=\"var_type\">let</field><field name=\"var\">count</field><value name=\"val\"><block type=\"gd_await\" id=\"[!DNNOK#~A^57Jm:wvtL\"><value name=\"val\"><block type=\"gd_model\" id=\"zM?Wqs0u^V/OBiYJF=AX\"><field name=\"var\">api_test</field><value name=\"val\"><block type=\"gd_where\" id=\"}cgV`t:=hddW=*CG^nUu\"><field name=\"var_type\">where</field><field name=\"var\">wsql</field><value name=\"val\"><block type=\"gd_query\" id=\"lC7TQ018PK!)-c=ttq2-\"><field name=\"var_type\">count</field><field name=\"var\"></field></block></value></block></value></block></value></block></value><next><block type=\"gd_success\" id=\"YraA5u$fx01x)z;L!9T?\"><field name=\"var\">{list,count}</field></block></next></block></next></block></next></block></next></block></next></block></statement><next><block type=\"gd_classmethod\" id=\"7eV)y;$zIp(qk{}}^Yl]\"><field name=\"methodName\">async addBeforeAction</field><field name=\"params\"></field><next><block type=\"gd_classmethod\" id=\"N^[qFF!#]C/jOCm(6(LH\"><field name=\"methodName\">async addAction</field><field name=\"params\"></field><comment pinned=\"false\" h=\"80\" w=\"160\">添加函数</comment><statement name=\"chains\"><block type=\"gd_var\" id=\"+(^62!FiD:k0C+%aXz(*\"><field name=\"var_type\">let</field><field name=\"var\">post</field><value name=\"val\"><block type=\"gd_post\" id=\"MY=nIcUl/[H^(lnza/h!\"><field name=\"var\"></field></block></value><next><block type=\"gd_var\" id=\"~X:6@+)Vq`k#?VZrYo8C\"><field name=\"var_type\">let</field><field name=\"var\">has</field><value name=\"val\"><block type=\"gd_await\" id=\"-@]pD-Dz*#8s[!V-)Y),\"><value name=\"val\"><block type=\"gd_model\" id=\"uFi@/t8Z`uSQ%3;.6CB`\"><field name=\"var\">api_test</field><value name=\"val\"><block type=\"gd_where\" id=\"%P3K%x|k9rd/yh1kwx/o\"><field name=\"var_type\">where</field><field name=\"var\">{id : post.id}</field><value name=\"val\"><block type=\"gd_find\" id=\"*@n;{u*_XsF9pvNL%LLJ\"></block></value></block></value></block></value></block></value><next><block type=\"controls_if\" id=\"23d-}D@s@Q-9fG;5D~B`\"><value name=\"IF0\"><block type=\"gd_isempty\" id=\"-`Lw9:lR{R;nn50DHzVd\"><field name=\"var_type\">isEmpty</field><field name=\"var\">has</field></block></value><statement name=\"DO0\"><block type=\"gd_fail\" id=\"P1kOk9Fos!0@Eq(T,)@t\"><field name=\"var\">数据为空</field></block></statement><next><block type=\"gd_awaits\" id=\"9w(7*N#ZRjvJ6;FJWiv@\"><value name=\"val\"><block type=\"gd_model\" id=\"fY6|gTCUYksYDlS(^1_*\"><field name=\"var\">api_test</field><value name=\"val\"><block type=\"gd_add\" id=\"?`,T5d851@mDeG*dRw*f\"><field name=\"var_type\">add</field><field name=\"var\">post</field></block></value></block></value><next><block type=\"gd_success\" id=\"BR{k6kgNfS7+64lwAY|Y\"><field name=\"var\"></field></block></next></block></next></block></next></block></next></block></statement><next><block type=\"gd_classmethod\" id=\"q0u|i)a^vuBJbx0K:5J}\"><field name=\"methodName\">async editAction</field><field name=\"params\"></field><next><block type=\"gd_classmethod\" id=\"Lj]FAABGDtA#(Pa66yb]\"><field name=\"methodName\">async editBeforeAction</field><field name=\"params\"></field></block></next></block></next></block></next></block></next></block></statement></block></xml>',
    'controller',
    '接口测试程序'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_crons
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_database
# ------------------------------------------------------------

INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    1,
    'gdcms',
    '127.0.0.1',
    8889,
    'root',
    'root',
    0,
    'utf8',
    1,
    'rt_',
    0,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    3,
    'godo',
    '127.0.0.1',
    8889,
    'root',
    'root',
    0,
    'utf8',
    0,
    'rt_',
    0,
    '',
    0,
    '',
    1,
    '',
    ''
  );
INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    5,
    'worklog',
    '127.0.0.1',
    3306,
    'root',
    'workLog20210927!#',
    0,
    'utf8',
    0,
    'rt_',
    1,
    '113.140.72.10',
    31,
    'root',
    1,
    'fanns@202120',
    ''
  );
INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    8,
    'test',
    '127.0.0.1',
    8889,
    'root',
    'root',
    0,
    'utf8',
    0,
    'rt_',
    0,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    9,
    'test2',
    '127.0.0.1',
    8889,
    'root',
    'root',
    0,
    'utf8',
    0,
    'rt_',
    0,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    10,
    'xd_crm',
    '127.0.0.1',
    3306,
    'root',
    'root',
    0,
    'utf8',
    0,
    'rt_',
    0,
    '127.0.0.1',
    22,
    'root',
    1,
    '',
    ''
  );
INSERT INTO
  `rt_database` (
    `id`,
    `database`,
    `host`,
    `port`,
    `user`,
    `password`,
    `dateStrings`,
    `encoding`,
    `isdef`,
    `prefix`,
    `ssh`,
    `shost`,
    `sport`,
    `suser`,
    `stype`,
    `spass`,
    `spath`
  )
VALUES
  (
    11,
    'xdcms',
    '127.0.0.1',
    3306,
    'root',
    'root',
    0,
    'utf8',
    0,
    'rt_',
    0,
    '127.0.0.1',
    22,
    'root',
    1,
    '',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_datasafe
# ------------------------------------------------------------

INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (31, 1, 'admin');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (32, 1, 'admin_auth');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (41, 1, 'admin_loginlog');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (33, 1, 'admin_map');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (34, 1, 'admin_oplog');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (35, 1, 'admin_viewlog');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (42, 1, 'api');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (40, 1, 'crons');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (36, 1, 'error');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (39, 1, 'form');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (37, 1, 'menu');
INSERT INTO
  `rt_datasafe` (`id`, `data_id`, `name`)
VALUES
  (38, 1, 'set');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_doc
# ------------------------------------------------------------

INSERT INTO
  `rt_doc` (
    `id`,
    `title`,
    `name`,
    `key`,
    `version`,
    `logo`,
    `remark`,
    `user_id`,
    `add_time`,
    `update_time`
  )
VALUES
  (
    1,
    'godocms操作手册',
    '后台操作手册',
    'oplogs',
    '1.0.1',
    'img/logo.png',
    '用户后台操作手册',
    1,
    1638496474,
    1639108716
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_doc_cate
# ------------------------------------------------------------

INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    29,
    1,
    0,
    1638529126,
    1638529126,
    1,
    0,
    '',
    '开发前必读',
    '',
    10
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (30, 1, 0, 1638529126, 1638529126, 1, 0, '', '前台接口', '', 2);
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (31, 1, 0, 1638529126, 1638529126, 1, 0, '', '后端配置', '', 0);
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    32,
    1,
    1,
    1638529126,
    1638529126,
    1,
    29,
    'README',
    '安装说明',
    '## 开发环境\n\n> nodejs v12.16.2 mysql 5.6\n\n\n项目解压到server根目录\n\n```bash\ncd server\nnpm i\n```\n\n## 初始化项目\n\n用工具导入`www/data/pro.sql`，然后更改`src/common/config/adapter.js`\n\n```bash\nmysql: {\n    handle: mysql,\n    database: \'pro\',//改成自己的数据库\n    prefix: \'rt_\',\n    encoding: \'utf8\',\n    host: \'127.0.0.1\',\n    port: \'3306\',\n    user: \'root\',//改自己的用户名\n    password: \'root\',//改密码\n    dateStrings: true\n  }\n```\n\n\n## 本地预览\n\n通过运行 `npm start` 启动一个本地服务器。默认访问地址 http://localhost:8100 。\n\n```bash\nnpm start\n```\n\n## 正式环境\n\n```bash\npm2 start pm2.json\n```\n',
    8
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    33,
    1,
    1,
    1638529126,
    1639108716,
    1,
    29,
    'CHANGELOG',
    '变更日志',
    '## 接口管理 2021/12/04\n\n- &check;  接口分基本配置/入口参数/逻辑设计/返回测试/表单设计/表格设计六个模块，每个模块单独书写，易于维护\n- &check; 基本配置可设计接口名称/接口类别等，直接写入控制层，要加入权限处理\n- &check; 入口参数主要选择入参，和表单设计挂钩2021/12/05\n- &check; 入口参数支持直接从数据库导入，并自动识别数据格式，识别的有字段类型/是否为空/以及默认值2021/12/06\n- &check; 入口参数新增分页参数添加 2021/12/10\n- &check; 逻辑设计采用采用blockly方式完美实现，支持代码拖拽，并加入了很多实用的代码块 2021/12/08\n- &check; 代码设计器自动生成代码并保存数据库和本地，代码设计器支持的类型有：2021/12/10\n\n  1. - 支持类/数组/对象的拖拽\n  2. - 支持thinkjs里面内置的对象/数据库处理/文件处理等\n  3. - 支持数组里面一系列代码块比如map/foreach/filter/some等\n  4. - 支持command+s保存\n  5. - 支持鼠标悬停后展示代码块\n- &cross; 数据层设计器：当内置数据不够用时需要写用到，主要做数据库的复杂处理，第二期实现，支持和代码设计器挂钩\n- &cross; 服务层设计器：当内置服务不够用时用到，比如复杂的文件逻辑，http请求逻辑等，第二期实现\n- &cross; 返回测试主要和表格设计挂钩，展示为主，输入测试数据查看返回值，设置是否删除测试数据，也可以单独作为前端测试工具\n  &cross; 表单和表格和接口管理界面分开，可根据接口设计，如果接口没涉及到权限，这里也要做处理\n- &cross; 可自动生成接口文档\n- &cross; 可自动生成测试用例，分模块跑测试用例，放第二期\n\n## 计划任务\n\n- &cross; 可调用内置接口\n- &cross; 支持post/get外部接口\n\n## 文档管理 2021/12/03\n\n- &check; 支持多个文集管理，直接在线书写md文件，自动生成漂亮的网页\n- &check; 支持文章目录summary.md回写，直接把以前写好的md文档复制过来回写即可\n- &check; 支持多个文集分开管理\n- &check; 支持排序，直接改标题/logo，直接生成文档\n- &check; 文件入库和本地存2份，方便备份\n- &check; 用户编辑时尽量减少选择，顶部隐藏以及一些细节处理，添加后会关闭页面，避免多次提交同样数据\n- &check; 文档编辑时新增ctrl+s快捷键保存数据\n- &cross; 支持word和pdf导入，第二期\n\n## 流程图 2021/12/02\n\n- &check; 基础的增/删/改/查\n- &check; 图形编辑器 可导入导出xml，支持导出jpg/png/gif/pdf/svg/xml\n- &check; 图表编辑器 支持导出png\n- &check; 权限编辑器 内置权限流demo  支持导出png\n- &check; 工作流编辑器 内置工作流demo  支持导出png\n\n## ppt演示文稿  2021/11/30\n\n- &check; 基础的增/删/改/查\n- &check; 在线演示文稿（幻灯片）应用，还原了大部分 Office PowerPoint 常用功能，支持 文字、图片、形状、线条、图表、表格、视频、公式 几种最常用的元素类型，每一种元素都拥有高度可编辑能力，同时支持丰富的快捷键和右键菜单，尽可能还原本地桌面应用的使用体验。\n- &check; 内置了一些常用模版，支持导出ppt文件\n- &cross; 支持ppt导入，第二期\n\n## excel表格管理  2021/11/29\n\n- &check; 基础的增/删/改/查\n- &check; 格式设置：样式，条件格式，文本对齐及旋转，文本截断、溢出、自动换行，多种数据类型，单元格内多样式\n- &check; 单元格：拖拽，下拉填充，多选区，查找和替换，定位，合并单元格，数据验证\n- &check; 行和列操作：隐藏、插入、删除行或列，冻结，文本分列\n- &check; 操作体验：撤销、重做，复制、粘贴、剪切，快捷键，格式刷，选区拖拽\n- &check; 公式和函数：内置公式，远程公式，自定义公式\n- &check; 表格操作：筛选，排序\n- &check; 增强功能：数据透视表，图表，评论，共享编辑，插入图片，矩阵计算，截图，复制到其他格式\n- &check; 导入：在线导入xlsx\n- &cross; 导出xlsx第二期处理\n\n## 思维导图管理  2021/11/28\n\n- &check; 增/删/改/查，进入后自动添加/自动保存文件\n- &check; 支持逻辑结构图、思维导图、组织结构图、目录组织图四种结构\n- &check; 内置多种主题，允许高度自定义样式\n- &check; 支持快捷键\n- &check; 节点内容支持图片、图标、超链接、备注、标签\n- &check; 支持前进后退\n- &check; 支持拖动、缩放\n- &check; 支持右键多选\n- &check; 支持节点拖拽\n- &check; 支持json格式的导入导出，png/svg导出\n- &cross; 直接节点直接转化为ppt，第二期\n\n## 管理小工具 2021/11/27\n\n- &check; 二维码/时间戳/翻译/格式化/url编码/base64编码\n- &check; 新增json工具和正则工具\n- &check; 放在页面右上角，方便使用\n\n## 数据库设计器\n\n- &check; 支持数据备份还原，查看数据表实时状态 2021/11/17\n- &check; 支持自动生成数据库设计文档，md格式以及实时预览，下载成pdf文件 2021/11/18\n- &check; 新增文档可下载word文件 2021/11/27\n- &check; 支持数据表名/注释/autoid的更改，支持优化表/修复表/删除表/清空表 2021/11/19\n- &check; 可查看/编辑/新增/复制任意表数据  2021/11/20\n- &check; 新增系统表数据保护  2021/11/20\n- &check; 可更改字段名/注释/默认值/排序，可删除字段 2021/11/20\n- &check; 新增连接/管理外部数据库 2021/11/25\n- &check; 新增数据库表保护 2021/11/25\n- &check; 新增可支持sqlite和mysql管理 2021/11/26\n- &check; 新增ssh远程连接管理，支持pem和密码连接 2021/11/26\n\n## &check; 登录验证 2021/11/12\n\n- &check; jwt校验\n- &check; 只允许一个帐号在一个端下登录\n- &check; 登录后规定时间保活\n\n## 角色管理  2021/11/14\n\n- &check; 允许多角色管理，角色取交集\n- &check; 角色可继承权限，每个角色应该有独立的权限职责划分\n\n## 菜单管理 2021/11/13\n\n- &check; 分前端模版和后端路由，权限由后端路由控制，增删改，图标可自定义\n\n## 管理员管理 2021/11/15\n\n- &check; 可添加/删除/搜索/编辑管理员，管理员和菜单权限挂钩\n\n## 系统日志 2021/11/15\n\n- &check; 记录每个人的操作记录  2021/11/15\n- &cross; &rArr; 定期清理，清理前做物理归档\n- &check; 记录每个人的查看记录，并记录离开时间  2021/11/14\n\n## 系统配置\n\n- &check; 可自定义配置，支持字段配置，自定义表单定义配置信息\n- &cross; &rArr; 可自动分表，规划分表规则\n- &cross; &rArr; 数据库自动定时备份，和计划任务一起做，配置和计划任务分开\n- &cross; &rArr; 配置写库，写到config\n\n## 系统功能\n\n- &check; 支持csrf，可控制开关  2021/11/14\n- &check; 支持apidoc生成开发文档  2021/11/14\n- &check; 支持ratelimit实现访问速率限制，保护程序免受暴力攻击，可控制开关以及速度  2021/11/14\n- &check; 支持helmet，避免XSS跨站脚本攻击，可控制开关  2021/11/14\n\n## 表单生成器\n\n- &check; 支持组件拖拽，支持表单回写 2021/11/15\n- &check; 支持生成html以及代码预览 2021/11/16\n- &check; 支持数据来源，支持自定义接收参数和发送附加参数 2021/11/16\n',
    9
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    34,
    1,
    1,
    1638529126,
    1638585664,
    1,
    29,
    'start',
    '需求文档',
    '# BASS低代码平台\n\n## 总后台管理\n\n### 需求\n\n#### 管理员\n\n##### &check; 登录验证 2021/11/12\n\n- &check; jwt校验\n- &check; 只允许一个帐号在一个端下登录\n- &check; 登录后规定时间保活\n\n##### 角色管理  2021/11/14\n\n- &check; 允许多角色管理，角色取交集\n- &check; 角色可继承权限，每个角色应该有独立的权限职责划分\n\n##### 菜单管理 2021/11/13\n\n- &check; 分前端模版和后端路由，权限由后端路由控制，增删改，图标可自定义\n\n##### 管理员管理 2021/11/15\n\n- &check; 可添加/删除/搜索/编辑管理员，管理员和菜单权限挂钩\n\n#### 系统日志 2021/11/15\n\n- &check; 记录每个人的操作记录  2021/11/15\n- &cross; &rArr; 定期清理，清理前做物理归档\n- &check; 记录每个人的查看记录，并记录离开时间  2021/11/14\n\n#### 系统配置\n\n- &check; 可自定义配置，支持字段配置，自定义表单定义配置信息\n- &cross; &rArr; 可自动分表，规划分表规则\n- &cross; &rArr; 数据库自动定时备份，和计划任务一起做，配置和计划任务分开\n- &cross; &rArr; 配置写库，写到config\n\n#### 系统功能\n\n- &check; 支持csrf，可控制开关  2021/11/14\n- &check; 支持apidoc生成开发文档  2021/11/14\n- &check; 支持ratelimit实现访问速率限制，保护程序免受暴力攻击，可控制开关以及速度  2021/11/14\n- &check; 支持helmet，避免XSS跨站脚本攻击，可控制开关  2021/11/14\n\n#### 表单生成器\n\n- &check; 支持组件拖拽，支持表单回写 2021/11/15\n- &check; 支持生成html以及代码预览 2021/11/16\n- &check; 支持数据来源，支持自定义接收参数和发送附加参数 2021/11/16\n\n#### 数据库设计器\n\n- &check; 支持数据备份还原，查看数据表实时状态 2021/11/17\n- &check; 支持自动生成数据库设计文档，md格式以及实时预览，下载成pdf文件 2021/11/18\n- &check; 支持数据表名/注释/autoid的更改，支持优化表/修复表/删除表/清空表 2021/11/19\n- &check; 可查看/编辑/新增/复制任意表数据  2021/11/20\n- &check; 新增系统表数据保护  2021/11/20\n- &check; 可更改字段名/注释/默认值/排序，可删除字段 2021/11/20\n- &check; 新增连接/管理外部数据库 2021/11/25\n- &check; 新增数据库表保护 2021/11/25\n\n#### 模块管理\n\n- &cross; &rArr; 负责模块初始化，以及用到哪些表\n- &cross; &rArr; 可导入导出json\n\n#### 列表设计器\n\n- &cross; &rArr; 依托接口管理\n\n#### 表单设计器\n\n- &cross; &rArr; 依托接口管理\n\n#### 接口设计器\n\n- &cross; &rArr; 依托模块管理\n- &cross; &rArr; 权限管理\n- &cross; &rArr; 可调用模型设计器\n- &cross; &rArr; 管理输入和输出，方法，参数\n- &cross; &rArr; 初始参数管理\n- &cross; &rArr; 过程参数管理\n- &cross; &rArr; 逻辑管理\n- &cross; &rArr; 可自动生成文档（第二阶段）\n- &cross; &rArr; 可生成测试用例（第二阶段）\n\n#### 模型设计器\n\n- &cross; &rArr; 管理数据库操作，依托模块管理，负责接口调用\n\n#### 服务设计器\n\n- &cross; &rArr; 管理外部接口，负责接口调用\n\n#### 插件管理\n\n- &cross; &rArr; 可作为独立的npm插件包使用\n- &cross; &rArr; 检索目录，检测配置，拷贝文件\n\n##### 地区管理\n\n- &cross; &rArr; 支持无限分类，做为数据分权的依据\n\n##### 岗位管理\n\n- &cross; &rArr; 部门/集团/公司/门店/仓库都可以设立岗位，岗位具有职责性\n\n##### 部门管理\n\n- &cross; &rArr; 部门可归属总后台/集团/公司/仓库/门店，也可设置分部门\n\n##### 集团管理\n\n- &cross; &rArr; 集团是全系统的总线，每个集团可拥有整个系统的功能，除集团管理外\n\n##### 公司管理\n\n- &cross; &rArr; 公司隶属于集团，可设置分公司\n\n##### 门店管理\n\n- &cross; &rArr; 门店隶属于公司或集团，可管理仓库\n\n##### 仓库管理\n\n- &cross; &rArr; 仓库隶属于门店/公司/集团，管理商品存贮\n\n#### 计划任务\n\n- &cross; &rArr; 前期由总管理员管理，后期可下放到集团管理员\n\n### 表设计\n\n- 参考[表设计](sql.md)\n\n### 程序设计\n\n## 项目管理\n\n### 需求\n\n- 项目管理\n- 可维护项目\n- 可共享\n- 可出售\n- 可归档\n- 可导入导出\n- 可本地化部署\n\n### 表结构设计\n\n#### rt_projects(主表)\n\n#### rt_projects_sales(销售表)\n\n## 思维导图\n\n### 需求\n\n- 可管理数据库\n- 可设置接口\n- 可管理页面\n\n## 用户后台管理\n\n### 需求\n\n## 数据库管理\n\n### 需求\n\n- 可连接外部数据库\n- 可数据字段管理\n- 可新建表和库\n- 可视化\n\n## 接口管理\n\n### 需求\n\n- 可快速创建接口\n- 可根据程序创建接口\n- 可post/get测试\n- 可根据数据库创建接口\n- 微信\n- 钉钉\n\n## 页面管理\n\n### 需求\n\n- 大屏页面管理\n- h5页面管理\n- web页面管理\n- 后台页面管理\n- 可表单自定义\n- 数据表可自定义\n- 微信钉钉接口\n\n## 程序管理\n\n### 需求\n\n- 可视化程序编程\n- 可进行类和函数的拖拽\n- 可拖拽函数模块\n- 可根据目录接口创建代码\n- 支持代码模版\n\n## 设计原则\n\n### 开发原则\n\n- 易上手，易维护，容易改\n- 模块化，可独立使用，可做插件使用，每个模块都有自己独立的生命\n- 功能唯一性，所有功能尽量唯一\n- 入口唯一性，所有的入口要做到唯一，就是只能一个地方进来，避免业务逻辑的维护\n\n### 请求方法规则\n\n- 所有的数据增/删/改都用post\n- 所有的查询都用get\n\n### 小部件固化\n\n### 功能分离\n\n### 松耦合\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    35,
    1,
    1,
    1638529126,
    1638585803,
    1,
    29,
    'sql',
    '表设计',
    '### 表清单\n\n\n| 序号 | 数据表            | 名称             |\n| ------ | ------------------- | ------------------ |\n| 1    | rt_admin          | 管理员表         |\n| 2    | rt_admin_auth     | 管理权限表       |\n| 3    | rt_admin_loginlog | 管理登录日志表   |\n| 4    | rt_admin_map      | 管理员权限映射表 |\n| 5    | rt_admin_oplog    | 管理操作日志     |\n| 6    | rt_admin_viewlog  | 管理员查看日志   |\n| 7    | rt_api            | 接口管理表       |\n| 8    | rt_api_input      | 接口输入表       |\n| 9    | rt_api_logic      | 接口逻辑表       |\n| 10   | rt_api_out        | 接口输出表       |\n| 11   | rt_api_params     | 接口参数表       |\n| 12   | rt_area           | 区域表           |\n| 13   | rt_article        | 文章             |\n| 14   | rt_cate           | 系统分类表       |\n| 15   | rt_category       | 文章分类         |\n| 16   | rt_crons          | 系统计划任务表   |\n| 17   | rt_database       | 数据库连接表     |\n| 18   | rt_datasafe       | 数据库保护表     |\n| 19   | rt_error          | 系统错误日志表   |\n| 20   | rt_form           | 系统表单         |\n| 21   | rt_menu           | 系统菜单         |\n| 22   | rt_mod            | 系统模块表       |\n| 23   | rt_params         | 全局常量表       |\n| 24   | rt_set            | 系统配置表       |\n\n---\n\n#### rt_admin-管理员表\n\n\n| 排序 | 字段名      | 名称           | 类型         | 是否为空 | 索引 | 默认值 |\n| ------ | ------------- | ---------------- | -------------- | ---------- | ------ | -------- |\n| 2    | username    | 用户名         | varchar(50)  | NO       | UNI  | null   |\n| 3    | password    | 密码           | varchar(32)  | NO       |      | null   |\n| 1    | admin_id    | 唯一标志       | int(10)      | NO       | PRI  | 0      |\n| 4    | salt        | 密码钥匙       | varchar(32)  | NO       |      | null   |\n| 6    | add_time    | 添加时间       | int(10)      | NO       |      | 0      |\n| 7    | name        | 真实姓名       | varchar(100) | YES      |      | null   |\n| 8    | mobile      | 手机号         | int(10)      | YES      | UNI  | null   |\n| 9    | status      | 状态1正常0禁用 | tinyint(2)   | NO       |      | 1      |\n| 10   | login_time  | 登录时间       | int(10)      | YES      |      | 0      |\n| 11   | login_num   | 登录次数       | int(10)      | YES      |      | 0      |\n| 12   | update_time | 更新时间       | int(10)      | YES      |      | 0      |\n| 5    | role_id     | 角色id         | int(10)      | NO       |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_admin`;\n CREATE TABLE `rt_admin` (\n  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'用户名\',\n  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'密码\',\n  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  `salt` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'密码钥匙\',\n  `add_time` int(10) NOT NULL DEFAULT \'0\' COMMENT \'添加时间\',\n  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'真实姓名\',\n  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT \'0\' COMMENT \'手机号\',\n  `status` tinyint(2) NOT NULL DEFAULT \'1\' COMMENT \'状态1正常0禁用\',\n  `login_time` int(10) DEFAULT \'0\' COMMENT \'登录时间\',\n  `login_num` int(10) DEFAULT \'0\' COMMENT \'登录次数\',\n  `update_time` int(10) DEFAULT \'0\' COMMENT \'更新时间\',\n  PRIMARY KEY (`admin_id`),\n  UNIQUE KEY `username` (`username`) USING HASH,\n  UNIQUE KEY `mobile` (`mobile`) USING HASH\n) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'管理员表\'\n```\n\n---\n\n#### rt_admin_auth-管理权限表\n\n\n| 排序 | 字段名 | 名称                 | 类型                | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | ---------------------- | --------------------- | ---------- | ------ | -------- |\n| 1    | id     |                      | int(10) unsigned    | NO       | PRI  | null   |\n| 2    | name   |                      | varchar(255)        | YES      |      | null   |\n| 3    | rules  |                      | text                | YES      |      | null   |\n| 4    | status | 是否可用0可用1不可用 | tinyint(2) unsigned | YES      |      | 0      |\n| 5    | remark | 描述                 | varchar(255)        | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_admin_auth`;\n CREATE TABLE `rt_admin_auth` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,\n  `rules` text CHARACTER SET utf8,\n  `status` tinyint(2) unsigned DEFAULT \'0\' COMMENT \'是否可用0可用1不可用\',\n  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'描述\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'管理权限表\'\n```\n\n---\n\n#### rt_admin_loginlog-管理登录日志表\n\n\n| 排序 | 字段名   | 名称       | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ---------- | ------------ | ------------------ | ---------- | ------ | -------- |\n| 1    | id       | ID         | int(10) unsigned | NO       | PRI  | null   |\n| 2    | admin_id | 管理员账号 | int(10) unsigned | NO       |      | null   |\n| 3    | log      | 日志名称   | varchar(255)     | NO       |      | null   |\n| 4    | data     | 返回记录   | text             | YES      |      | null   |\n| 5    | ip       | IP地址     | varchar(64)      | YES      |      | null   |\n| 6    | agent    | 客户端信息 | varchar(255)     | YES      |      | null   |\n| 7    | url      | 地址       | varchar(255)     | YES      |      | null   |\n| 8    | method   | 方法       | varchar(100)     | YES      |      | null   |\n| 9    | addtime  | 添加时间   | int(10) unsigned | YES      |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_admin_loginlog`;\n CREATE TABLE `rt_admin_loginlog` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'ID\',\n  `admin_id` int(10) unsigned NOT NULL COMMENT \'管理员账号\',\n  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT \'日志名称\',\n  `data` text CHARACTER SET utf8 COMMENT \'返回记录\',\n  `ip` varchar(64) CHARACTER SET utf8 DEFAULT \'\' COMMENT \'IP地址\',\n  `agent` varchar(255) CHARACTER SET utf8 DEFAULT \'\' COMMENT \'客户端信息\',\n  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT \'地址\',\n  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT \'方法\',\n  `addtime` int(10) unsigned DEFAULT \'0\' COMMENT \'添加时间\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'管理登录日志表\'\n```\n\n---\n\n#### rt_admin_map-管理员权限映射表\n\n\n| 排序 | 字段名   | 名称                           | 类型                | 是否为空 | 索引 | 默认值 |\n| ------ | ---------- | -------------------------------- | --------------------- | ---------- | ------ | -------- |\n| 1    | map_id   |                                | int(10) unsigned    | NO       | PRI  | null   |\n| 2    | admin_id |                                | int(10) unsigned    | NO       | MUL  | null   |\n| 3    | auth_id  |                                | int(10) unsigned    | NO       |      | null   |\n| 4    | type     | 0角色1集团2公司3门店4部门5区域 | tinyint(3) unsigned | NO       |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_admin_map`;\n CREATE TABLE `rt_admin_map` (\n  `map_id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `admin_id` int(10) unsigned NOT NULL,\n  `auth_id` int(10) unsigned NOT NULL,\n  `type` tinyint(3) unsigned NOT NULL DEFAULT \'0\' COMMENT \'0角色1集团2公司3门店4部门5区域\',\n  PRIMARY KEY (`map_id`),\n  UNIQUE KEY `admin_id` (`admin_id`,`auth_id`,`type`) USING HASH\n) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'管理员权限映射表\'\n```\n\n---\n\n#### rt_admin_oplog-管理操作日志\n\n\n| 排序 | 字段名   | 名称       | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ---------- | ------------ | ------------------ | ---------- | ------ | -------- |\n| 1    | id       | ID         | int(10) unsigned | NO       | PRI  | null   |\n| 2    | admin_id | 管理员账号 | int(10) unsigned | NO       |      | null   |\n| 3    | log      | 日志名称   | varchar(255)     | NO       |      | null   |\n| 4    | data     | 返回记录   | text             | YES      |      | null   |\n| 5    | ip       | IP地址     | varchar(64)      | YES      |      | null   |\n| 6    | agent    | 客户端信息 | varchar(255)     | YES      |      | null   |\n| 7    | url      | 地址       | varchar(255)     | YES      |      | null   |\n| 8    | method   | 方法       | varchar(100)     | YES      |      | null   |\n| 9    | addtime  | 添加时间   | int(10) unsigned | YES      |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_admin_oplog`;\n CREATE TABLE `rt_admin_oplog` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'ID\',\n  `admin_id` int(10) unsigned NOT NULL COMMENT \'管理员账号\',\n  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT \'日志名称\',\n  `data` text CHARACTER SET utf8 COMMENT \'返回记录\',\n  `ip` varchar(64) CHARACTER SET utf8 DEFAULT \'\' COMMENT \'IP地址\',\n  `agent` varchar(255) CHARACTER SET utf8 DEFAULT \'\' COMMENT \'客户端信息\',\n  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT \'地址\',\n  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT \'方法\',\n  `addtime` int(10) unsigned DEFAULT \'0\' COMMENT \'添加时间\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'管理操作日志\'\n```\n\n---\n\n#### rt_admin_viewlog-管理员查看日志\n\n\n| 排序 | 字段名    | 名称       | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ----------- | ------------ | ------------------ | ---------- | ------ | -------- |\n| 1    | id        | ID         | int(10) unsigned | NO       | PRI  | null   |\n| 2    | admin_id  | 管理员账号 | int(10) unsigned | NO       |      | null   |\n| 3    | log       | 日志名称   | varchar(255)     | NO       |      | null   |\n| 4    | ip        | IP地址     | varchar(64)      | YES      |      | null   |\n| 5    | agent     | 客户端信息 | varchar(255)     | YES      |      | null   |\n| 6    | url       | 地址       | varchar(255)     | YES      |      | null   |\n| 7    | method    | 方法       | varchar(100)     | YES      |      | null   |\n| 8    | addtime   | 添加时间   | int(10) unsigned | YES      |      | 0      |\n| 9    | leavetime | 离开时间   | int(10) unsigned | YES      |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_admin_viewlog`;\n CREATE TABLE `rt_admin_viewlog` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'ID\',\n  `admin_id` int(10) unsigned NOT NULL COMMENT \'管理员账号\',\n  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT \'日志名称\',\n  `ip` varchar(64) CHARACTER SET utf8 DEFAULT \'\' COMMENT \'IP地址\',\n  `agent` varchar(255) CHARACTER SET utf8 DEFAULT \'\' COMMENT \'客户端信息\',\n  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT \'地址\',\n  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT \'方法\',\n  `addtime` int(10) unsigned DEFAULT \'0\' COMMENT \'添加时间\',\n  `leavetime` int(10) unsigned DEFAULT \'0\' COMMENT \'离开时间\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=350 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'管理员查看日志\'\n```\n\n---\n\n#### rt_api-接口管理表\n\n\n| 排序 | 字段名 | 名称         | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | -------------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     | 唯一标志     | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name   | 接口名称     | varchar(100)     | NO       |      | null   |\n| 3    | mod_id | 模块id       | int(10) unsigned | NO       |      | 0      |\n| 4    | mod    | 所属模块     | varchar(60)      | NO       |      | null   |\n| 5    | key    | 接口唯一标志 | varchar(100)     | NO       |      | null   |\n| 6    | method | 接口方法     | varchar(20)      | NO       |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_api`;\n CREATE TABLE `rt_api` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'接口名称\',\n  `mod_id` int(10) unsigned NOT NULL DEFAULT \'0\' COMMENT \'模块id\',\n  `mod` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'所属模块\',\n  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'接口唯一标志\',\n  `method` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'接口方法\',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'接口管理表\'\n```\n\n---\n\n#### rt_api_input-接口输入表\n\n\n| 排序 | 字段名 | 名称     | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | ---------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     | 唯一标志 | int(10) unsigned | NO       | PRI  | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_api_input`;\n CREATE TABLE `rt_api_input` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'接口输入表\'\n```\n\n---\n\n#### rt_api_logic-接口逻辑表\n\n\n| 排序 | 字段名 | 名称     | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | ---------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     | 唯一标志 | int(10) unsigned | NO       | PRI  | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_api_logic`;\n CREATE TABLE `rt_api_logic` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'接口逻辑表\'\n```\n\n---\n\n#### rt_api_out-接口输出表\n\n\n| 排序 | 字段名 | 名称     | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | ---------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     | 唯一标志 | int(10) unsigned | NO       | PRI  | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_api_out`;\n CREATE TABLE `rt_api_out` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'接口输出表\'\n```\n\n---\n\n#### rt_api_params-接口参数表\n\n\n| 排序 | 字段名 | 名称     | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | ---------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     | 唯一标志 | int(10) unsigned | NO       | PRI  | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_api_params`;\n CREATE TABLE `rt_api_params` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'接口参数表\'\n```\n\n---\n\n#### rt_area-区域表\n\n\n| 排序 | 字段名   | 名称       | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ---------- | ------------ | ------------------ | ---------- | ------ | -------- |\n| 1    | area_id  |            | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name     | 区域名称   | varchar(255)     | YES      |      | null   |\n| 3    | group_id | 集团id     | int(10) unsigned | YES      |      | 0      |\n| 4    | address  | 地址       | varchar(255)     | YES      |      | null   |\n| 5    | city_id  | 上级城市id | int(10)          | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_area`;\n CREATE TABLE `rt_area` (\n  `area_id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'区域名称\',\n  `group_id` int(10) unsigned DEFAULT \'0\' COMMENT \'集团id\',\n  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'地址\',\n  `city_id` int(10) DEFAULT NULL COMMENT \'上级城市id\',\n  PRIMARY KEY (`area_id`) USING BTREE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'区域表\'\n```\n\n---\n\n#### rt_article-文章\n\n\n| 排序 | 字段名       | 名称               | 类型             | 是否为空 | 索引 | 默认值            |\n| ------ | -------------- | -------------------- | ------------------ | ---------- | ------ | ------------------- |\n| 1    | id           | ID                 | int(11) unsigned | NO       | PRI  | null              |\n| 2    | category_id  | 分类:id:title      | int(11)          | NO       |      | null              |\n| 3    | title        | 文章名             | varchar(128)     | NO       |      | null              |\n| 4    | desc_content |                    | varchar(255)     | NO       |      | null              |\n| 5    | image        |                    | varchar(255)     | YES      |      | null              |\n| 6    | content      | 内容               | text             | NO       |      | null              |\n| 7    | author       | 作者:id:name       | varchar(32)      | NO       |      | null              |\n| 8    | show_switch  | 展示:1=展示,0=隐藏 | tinyint(1)       | NO       |      | 1                 |\n| 9    | show_time    |                    | datetime         | YES      |      | null              |\n| 10   | up_time      |                    | datetime         | YES      |      | CURRENT_TIMESTAMP |\n| 11   | add_time     |                    | datetime         | YES      |      | CURRENT_TIMESTAMP |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_article`;\n CREATE TABLE `rt_article` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'文章id\',\n  `category_id` int(10) DEFAULT \'0\' COMMENT \'分类id\',\n  `title` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'标题\',\n  `desc_content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,\n  `content` text CHARACTER SET utf8 NOT NULL COMMENT \'内容\',\n  `author` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT \'作者:id:name\',\n  `show_switch` tinyint(1) NOT NULL DEFAULT \'1\' COMMENT \'展示:1=展示,0=隐藏\',\n  `show_time` int(10) unsigned DEFAULT \'0\',\n  `up_time` int(10) unsigned DEFAULT \'0\',\n  `add_time` int(10) unsigned DEFAULT \'0\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'文章\'\n```\n\n---\n\n#### rt_cate-系统分类表\n\n\n| 排序 | 字段名 | 名称         | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | -------------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     |              | int(10) unsigned | NO       | PRI  | null   |\n| 2    | pid    | 上级id       | int(10)          | YES      |      | 0      |\n| 3    | sid    | 系统类型id   | int(10)          | YES      |      | 0      |\n| 4    | fid    | 系统分类标志 | int(10)          | YES      |      | null   |\n| 5    | lid    | 层级         | int(10)          | YES      |      | 0      |\n| 6    | name   | 名称         | varchar(255)     | YES      |      | null   |\n| 7    | desc   | 描述         | text             | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_cate`;\n CREATE TABLE `rt_cate` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `pid` int(10) DEFAULT \'0\' COMMENT \'上级id\',\n  `sid` int(10) DEFAULT \'0\' COMMENT \'系统类型id\',\n  `fid` int(10) DEFAULT NULL COMMENT \'系统分类标志\',\n  `lid` int(10) DEFAULT \'0\' COMMENT \'层级\',\n  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'名称\',\n  `desc` text COLLATE utf8mb4_unicode_ci COMMENT \'描述\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统分类表\'\n```\n\n---\n\n#### rt_category-文章分类\n\n\n| 排序 | 字段名 | 名称                                 | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | -------- | -------------------------------------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id     | ID                                   | int(11) unsigned | NO       | PRI  | null   |\n| 2    | name   | 分类名称                             | varchar(255)     | NO       |      | null   |\n| 3    | status | 是否使用，预留                       | tinyint(2)       | YES      |      | 0      |\n| 4    | ctype  | 分类类型 1新闻2账户类型3账户日志来源 | tinyint(3)       | YES      |      | 1      |\n| 5    | desc   | 其他附加配置                         | text             | YES      |      | null   |\n| 6    | flag   | 分类标志，同一分类不能重复           | int(10)          | NO       |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_category`;\n CREATE TABLE `rt_category` (\n  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT \'ID\',\n  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT \'分类名称\',\n  `status` tinyint(2) DEFAULT \'0\' COMMENT \'是否使用，预留\',\n  `ctype` tinyint(3) DEFAULT \'1\' COMMENT \'分类类型 1新闻2账户类型3账户日志来源\',\n  `desc` text CHARACTER SET utf8 COMMENT \'其他附加配置\',\n  `flag` int(10) NOT NULL DEFAULT \'0\' COMMENT \'分类标志，同一分类不能重复\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'文章分类\'\n```\n\n---\n\n#### rt_crons-系统计划任务表\n\n\n| 排序 | 字段名    | 名称                                  | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ----------- | --------------------------------------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id        |                                       | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name      | 任务名称                              | varchar(64)      | NO       |      | null   |\n| 3    | interval  | 执行间隔 毫秒为单位                   | varchar(128)     | YES      |      | null   |\n| 4    | immediate | 是否立即执行                          | tinyint(1)       | YES      |      | 1      |\n| 5    | handle    | 执行路径                              | varchar(128)     | YES      | UNI  | null   |\n| 6    | enable    | 是否开启                              | tinyint(1)       | YES      |      | 1      |\n| 7    | type      | one执行一次all一直执行                | varchar(128)     | YES      |      | null   |\n| 8    | addtime   | 添加时间                              | int(10)          | YES      |      | 0      |\n| 9    | uptime    | 更新时间                              | bigint(20)       | YES      |      | 0      |\n| 10   | nexttime  | 下次执行时间                          | bigint(20)       | YES      |      | 0      |\n| 11   | runtime   | 每次执行的时间                        | bigint(20)       | YES      |      | 0      |\n| 12   | runtype   | 执行类型0为间隔执行1为系统执行crontab | tinyint(1)       | YES      |      | 0      |\n| 13   | cron      | Runtype为1时不能为空 如0 */1 * * *    | varchar(255)     | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_crons`;\n CREATE TABLE `rt_crons` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'任务名称\',\n  `interval` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'执行间隔 毫秒为单位\',\n  `immediate` tinyint(1) DEFAULT \'1\' COMMENT \'是否立即执行\',\n  `handle` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'执行路径\',\n  `enable` tinyint(1) DEFAULT \'1\' COMMENT \'是否开启\',\n  `type` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'one执行一次all一直执行\',\n  `addtime` int(10) DEFAULT \'0\' COMMENT \'添加时间\',\n  `uptime` bigint(20) DEFAULT \'0\' COMMENT \'更新时间\',\n  `nexttime` bigint(20) DEFAULT \'0\' COMMENT \'下次执行时间\',\n  `runtime` bigint(20) DEFAULT \'0\' COMMENT \'每次执行的时间\',\n  `runtype` tinyint(1) DEFAULT \'0\' COMMENT \'执行类型0为间隔执行1为系统执行crontab\',\n  `cron` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'Runtype为1时不能为空 如0 */1 * * *\',\n  PRIMARY KEY (`id`) USING BTREE,\n  UNIQUE KEY `handle` (`handle`) USING BTREE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统计划任务表\'\n```\n\n---\n\n#### rt_database-数据库连接表\n\n\n| 排序 | 字段名      | 名称 | 类型                | 是否为空 | 索引 | 默认值 |\n| ------ | ------------- | ------ | --------------------- | ---------- | ------ | -------- |\n| 1    | id          |      | int(10) unsigned    | NO       | PRI  | null   |\n| 2    | database    |      | varchar(255)        | NO       |      | null   |\n| 3    | host        |      | varchar(255)        | YES      |      | null   |\n| 4    | port        |      | int(10) unsigned    | NO       |      | 3306   |\n| 5    | user        |      | varchar(255)        | NO       |      | null   |\n| 6    | password    |      | varchar(255)        | NO       |      | null   |\n| 7    | dateStrings |      | tinyint(2) unsigned | YES      |      | null   |\n| 8    | encoding    |      | varchar(255)        | YES      |      | null   |\n| 9    | isdef       |      | tinyint(2) unsigned | YES      |      | 0      |\n| 10   | prefix      |      | varchar(100)        | YES      |      | null   |\n| 11   | ssh         |      | tinyint(2) unsigned | YES      |      | null   |\n| 12   | shost       |      | varchar(255)        | YES      |      | null   |\n| 13   | sport       |      | int(10) unsigned    | YES      |      | 22     |\n| 14   | suser       |      | varchar(255)        | YES      |      | null   |\n| 15   | stype       |      | tinyint(2) unsigned | YES      |      | 1      |\n| 16   | spass       |      | varchar(255)        | YES      |      | null   |\n| 17   | spath       |      | varchar(255)        | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_database`;\n CREATE TABLE `rt_database` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `database` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n  `host` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `port` int(10) unsigned NOT NULL DEFAULT \'3306\',\n  `user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n  `dateStrings` tinyint(2) unsigned DEFAULT NULL,\n  `encoding` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `isdef` tinyint(2) unsigned DEFAULT \'0\',\n  `prefix` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `ssh` tinyint(2) unsigned DEFAULT NULL,\n  `shost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `sport` int(10) unsigned DEFAULT \'22\',\n  `suser` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `stype` tinyint(2) unsigned DEFAULT \'1\',\n  `spass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `spath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'数据库连接表\'\n```\n\n---\n\n#### rt_datasafe-数据库保护表\n\n\n| 排序 | 字段名  | 名称 | 类型         | 是否为空 | 索引 | 默认值 |\n| ------ | --------- | ------ | -------------- | ---------- | ------ | -------- |\n| 1    | id      |      | int(10)      | NO       | PRI  | null   |\n| 2    | data_id |      | int(10)      | YES      | MUL  | null   |\n| 3    | name    |      | varchar(255) | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_datasafe`;\n CREATE TABLE `rt_datasafe` (\n  `id` int(10) NOT NULL AUTO_INCREMENT,\n  `data_id` int(10) DEFAULT NULL,\n  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  PRIMARY KEY (`id`),\n  UNIQUE KEY `data_id` (`data_id`,`name`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'数据库保护表\'\n```\n\n---\n\n#### rt_error-系统错误日志表\n\n\n| 排序 | 字段名   | 名称 | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ---------- | ------ | ------------------ | ---------- | ------ | -------- |\n| 1    | id       |      | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name     |      | varchar(255)     | YES      |      | null   |\n| 3    | url      |      | varchar(255)     | YES      |      | null   |\n| 4    | msg      |      | text             | YES      |      | null   |\n| 5    | addtime  |      | int(10) unsigned | YES      |      | 0      |\n| 6    | admin_id |      | int(10) unsigned | YES      |      | 0      |\n| 5    | add_time |      | int(10) unsigned | YES      |      | 0      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_error`;\n CREATE TABLE `rt_error` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `msg` text COLLATE utf8mb4_unicode_ci,\n  `addtime` int(10) unsigned DEFAULT \'0\',\n  `admin_id` int(10) unsigned DEFAULT \'0\',\n  PRIMARY KEY (`id`) USING BTREE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统错误日志表\'\n```\n\n---\n\n#### rt_form-系统表单\n\n\n| 排序 | 字段名      | 名称     | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ------------- | ---------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id          |          | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name        |          | varchar(255)     | YES      |      | null   |\n| 3    | key         |          | varchar(255)     | YES      |      | null   |\n| 4    | data        |          | text             | YES      |      | null   |\n| 5    | get_url     |          | varchar(255)     | YES      |      | null   |\n| 6    | post_url    |          | varchar(255)     | YES      |      | null   |\n| 7    | form_path   |          | varchar(255)     | YES      |      | null   |\n| 8    | add_time    | 添加时间 | int(10) unsigned | YES      |      | 0      |\n| 9    | link_id     | 回写id   | int(10) unsigned | YES      |      | 0      |\n| 10   | link_name   | 回写表名 | varchar(255)     | YES      |      | 0      |\n| 11   | link_field  | 回写字段 | varchar(255)     | YES      |      | null   |\n| 12   | params_get  |          | varchar(255)     | YES      |      | null   |\n| 13   | params_post |          | varchar(255)     | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_form`;\n CREATE TABLE `rt_form` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `data` text COLLATE utf8mb4_unicode_ci,\n  `get_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `post_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `form_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `add_time` int(10) unsigned DEFAULT \'0\' COMMENT \'添加时间\',\n  `link_id` int(10) unsigned DEFAULT \'0\' COMMENT \'回写id\',\n  `link_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT \'0\' COMMENT \'回写表名\',\n  `link_field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'回写字段\',\n  `params_get` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `params_post` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统表单\'\n```\n\n---\n\n#### rt_menu-系统菜单\n\n\n| 排序 | 字段名    | 名称                 | 类型                | 是否为空 | 索引 | 默认值 |\n| ------ | ----------- | ---------------------- | --------------------- | ---------- | ------ | -------- |\n| 1    | id        |                      | int(10) unsigned    | NO       | PRI  | null   |\n| 2    | title     |                      | varchar(255)        | YES      |      | null   |\n| 3    | route     | 权限标志             | varchar(255)        | YES      | MUL  | null   |\n| 4    | href      | 前端地址             | varchar(255)        | YES      |      | null   |\n| 5    | type      | 0目录1菜单2按钮3权限 | tinyint(2)          | YES      |      | 0      |\n| 6    | order_num | 排序                 | int(10)             | YES      |      | 0      |\n| 6    | icon      |                      | varchar(255)        | YES      |      | null   |\n| 8    | open_type |                      | varchar(255)        | YES      |      | null   |\n| 8    | pid       |                      | int(10)             | YES      |      | 0      |\n| 9    | lid       |                      | tinyint(3)          | YES      |      | 1      |\n| 11   | ifshow    | 是否显示0显示1不显示 | tinyint(3) unsigned | YES      |      | 0      |\n| 2    | name      |                      | varchar(255)        | YES      |      | null   |\n| 3    | url       | 权限标志             | varchar(255)        | YES      |      | null   |\n| 4    | ismenu    | 0目录1菜单2按钮      | tinyint(2)          | YES      |      | 0      |\n| 5    | order     |                      | int(5)              | YES      |      | 0      |\n| 7    | target    |                      | varchar(255)        | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_menu`;\n CREATE TABLE `rt_menu` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,\n  `route` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT \'权限标志\',\n  `href` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'前端地址\',\n  `type` tinyint(2) DEFAULT \'0\' COMMENT \'0目录1菜单2按钮3权限\',\n  `order_num` int(10) DEFAULT \'0\' COMMENT \'排序\',\n  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL,\n  `open_type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,\n  `pid` int(10) DEFAULT \'0\',\n  `lid` tinyint(3) DEFAULT \'1\',\n  `ifshow` tinyint(3) unsigned DEFAULT \'0\' COMMENT \'是否显示0显示1不显示\',\n  PRIMARY KEY (`id`) USING BTREE,\n  KEY `url` (`route`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统菜单\'\n```\n\n---\n\n#### rt_mod-系统模块表\n\n\n| 排序 | 字段名      | 名称                          | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ------------- | ------------------------------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id          | 唯一标志                      | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name        | 模块名称                      | varchar(100)     | YES      |      | null   |\n| 3    | key         | 系统标志                      | varchar(60)      | NO       | UNI  | null   |\n| 4    | server_path | 模块路径                      | varchar(100)     | YES      |      | server |\n| 5    | tables_main | 主表                          | varchar(100)     | NO       |      | null   |\n| 6    | tables_more | 附加表                        | varchar(255)     | YES      |      | null   |\n| 7    | type        | 模块类型1控制层2数据层3服务层 | tinyint(2)       | NO       |      | 1      |\n| 8    | params      | 全局参数                      | varchar(255)     | NO       |      | null   |\n| 9    | remark      | 模块说明                      | varchar(255)     | NO       |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_mod`;\n CREATE TABLE `rt_mod` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'模块名称\',\n  `key` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'系统标志\',\n  `server_path` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT \'server\' COMMENT \'模块路径\',\n  `tables_main` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'主表\',\n  `tables_more` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'附加表\',\n  `type` tinyint(2) NOT NULL DEFAULT \'1\' COMMENT \'模块类型1控制层2数据层3服务层\',\n  `params` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'全局参数\',\n  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'模块说明\',\n  PRIMARY KEY (`id`),\n  UNIQUE KEY `key` (`key`)\n) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统模块表\'\n```\n\n---\n\n#### rt_params-全局常量表\n\n\n| 排序 | 字段名  | 名称                      | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | --------- | --------------------------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id      | 唯一标志                  | int(10) unsigned | NO       | PRI  | null   |\n| 2    | name    | 参数名称                  | varchar(100)     | NO       |      | null   |\n| 3    | key     | 参数值                    | varchar(255)     | NO       |      | null   |\n| 4    | content | 参数内容                  | varchar(255)     | NO       |      | null   |\n| 5    | type    | 参数类型1文件2数字3字符串 | tinyint(2)       | NO       |      | 1      |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_params`;\n CREATE TABLE `rt_params` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT \'唯一标志\',\n  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'参数名称\',\n  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'参数值\',\n  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'参数内容\',\n  `type` tinyint(2) NOT NULL DEFAULT \'1\' COMMENT \'参数类型1文件2数字3字符串\',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'全局常量表\'\n```\n\n---\n\n#### rt_set-系统配置表\n\n\n| 排序 | 字段名    | 名称   | 类型             | 是否为空 | 索引 | 默认值 |\n| ------ | ----------- | -------- | ------------------ | ---------- | ------ | -------- |\n| 1    | id        |        | int(10) unsigned | NO       | PRI  | null   |\n| 2    | key       | 键值   | varchar(128)     | NO       | UNI  | null   |\n| 3    | name      | 名称   | varchar(128)     | YES      |      | null   |\n| 4    | val       | 值     | text             | YES      |      | null   |\n| 5    | enable    | 状态   | tinyint(2)       | YES      |      | 1      |\n| 6    | remark    |        | varchar(255)     | YES      |      | null   |\n| 7    | form_id   | 表单id | int(10) unsigned | NO       |      | 0      |\n| 8    | form_path |        | varchar(255)     | YES      |      | null   |\n| 9    | params    |        | varchar(255)     | YES      |      | null   |\n\n创建代码\n\n```js\nDROP TABLE IF EXISTS `rt_set`;\n CREATE TABLE `rt_set` (\n  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\n  `key` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT \'键值\',\n  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'名称\',\n  `val` text COLLATE utf8mb4_unicode_ci COMMENT \'值\',\n  `enable` tinyint(2) DEFAULT \'1\' COMMENT \'状态\',\n  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `form_id` int(10) unsigned NOT NULL DEFAULT \'0\' COMMENT \'表单id\',\n  `form_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  `params` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n  PRIMARY KEY (`id`) USING BTREE,\n  UNIQUE KEY `key` (`key`) USING BTREE\n) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT=\'系统配置表\'\n```\n\n---\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    36,
    1,
    1,
    1638529126,
    1638529126,
    1,
    29,
    'seedoc',
    '参考文档',
    '# 编写必读\n\n### 项目源码\n[https://gitee.com/ruitao_admin/godocms](https://gitee.com/ruitao_admin/godocms)\n\n### 框架参考文档 \n[https://thinkjs.org/zh-cn/doc/3.0/index.html](https://thinkjs.org/zh-cn/doc/3.0/index.html)\n\n[https://github.com/thinkjs/cn.thinkjs.org](https://github.com/thinkjs/cn.thinkjs.org)\n\n### 前台模版文档\n[https://gitee.com/pear-admin/Pear-Admin-Layui](https://gitee.com/pear-admin/Pear-Admin-Layui)\n\n### 编写文档参考\n[https://docsify.js.org/#/zh-cn/](https://docsify.js.org/#/zh-cn/)\n[https://apidocjs.com/](https://apidocjs.com/)\n\n### 表单设计参考\n[https://gitee.com/ayq947/ayq-layui-form-designer?_from=gitee_search](https://gitee.com/ayq947/ayq-layui-form-designer?_from=gitee_search)\n\n### 思维导图参考\n[https://github.com/wanglin2/mind-map](https://github.com/wanglin2/mind-map)\n\n### excel参考\n[https://github.com/mengshukeji/Luckysheet](https://github.com/mengshukeji/Luckysheet)\n\n### ppt参考\n[https://github.com/pipipi-pikachu/PPTist](https://github.com/pipipi-pikachu/PPTist)\n\n### 流程图参考\n[https://github.com/jgraph/mxgraph](https://github.com/jgraph/mxgraph)\n\n### markdown编辑器\n[https://github.com/Vanessa219/vditor](https://github.com/Vanessa219/vditor)\n[https://github.com/nhn/tui.editor](https://github.com/nhn/tui.editor)\n\n### 富文本编辑器\n[https://github.com/ianstormtaylor/slate](https://github.com/ianstormtaylor/slate)\n[https://textbus.tanboui.com/doc/start](https://textbus.tanboui.com/doc/start)\n[https://github.com/froala/wysiwyg-editor](https://github.com/froala/wysiwyg-editor)\n[https://github.com/quilljs/quill](https://github.com/quilljs/quill)\n[https://github.com/notadd/neditor](https://github.com/notadd/neditor)\n[https://github.com/mdnice/markdown-resume](https://github.com/mdnice/markdown-resume 简历)\n\n### 图片编辑\n[https://github.com/nhn/tui.image-editor](https://github.com/nhn/tui.image-editor)\n\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    37,
    1,
    1,
    1638529126,
    1638529126,
    1,
    29,
    'codesee',
    '代码规范',
    '# 参考\n\nhttps://github.com/GDJiaMi/frontend-standards\n\nhttps://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow\n\n# 1、工作流规范（基于Git）\n\n## 1.1、开发\n\n### 1.1.1、[版本规范](https://semver.org/lang/zh-CN/)\n\n版本格式：主版本号.次版本号.修订号，版本号递增规则如下：\n\n1. 主版本号：当你做了不兼容的 API 修改，\n2. 次版本号：当你做了向下兼容的功能性新增，\n3. 修订号：当你做了向下兼容的问题修正。\n\n先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。\n\n### 1.1.2、Git分支模型\n\n#### master分支\n\nmaster分支表示一个稳定的发布版本. 对应百宝袋的大版本.\n\n- 场景: 所有应用会跟随版本迭代, 在dev分支测试稳定后, 会合并到master分支, 并使用tag标记应用版本\n- tag规范: `v{version}`, 例如v0.1.0\n- 人员: 由项目负责人进行审核合并, 普通开发者没有权限\n\n#### dev分支\n\n开发者主要工作的分支, 最新的特性或bug修复都会提交到这个分支. 开发者如果在该分支进行了提交，在push到远程之前应该先pull一下， 并尽量使用rebase模式，保证分支的简洁\n\n- 命名规范: dev\n- tag规范: 在dev分支中也可能会经历发布过程, 例如bug修复版本. 这里同样使用tag来标记这些发布. 例如v0.1.1\n- 提交规范：如果实在开发分支上进行开发，在推送到远程之前，应该使用`git rebase`形式更新本地分支。\n\n#### feature分支\n\n涉及多人协作或者大功能的开发, 应该从dev分支checkout出独立的feature分支, 避免干扰dev分支\n\n- 场景:\n  - 涉及多人协作: 团队多个成员在同一个项目下负责开发不同的功能, 这时候每个成员在自己的feature分支独立开发\n  - 大功能开发: 大功能开发跨越周期比较长, 需要多次迭代才会稳定. 这时候应该在独立的分支上开发. 方便跟踪历史记录, 也免于干扰dev分支的迭代和发布\n- 命名规范\n  - feature/name: name是功能名称\n  - feature/version: 这也是团队常见的模式, 当无法使用一个功能名称来描述时, 可以使用版本号作为’功能’\n- 合并时机\n  1. 当feature分支迭代稳定, 并通过测试后, 合并到dev分支. 合并到dev后, **feature分支的生命周期就结束了**. 后续bug修复和功能优化直接在dev开发\n  2. 当多个feature分支需要合并对外发布临时版本时. 合并到preview分支 . ⚠️这种情况不应该合并到dev分支, 因为feature分支可能还不稳定或未完成. 比如为了联调某些功能.\n- 合并方式\n  - 不要使用fast-forward. 这样可以在分支图上查看到分支历史\n\n#### preview分支\n\n临时的预览分支, preview分支用于临时合并feature分支, 这其中可能会修复某些bug或者冲突. 可以选择性地将这些提交cherrypick回feature分支. 当预览结束后就可以销毁preview分支\n\n#### release分支\n\n遵循gitflow规范\n\n- 场景: 需要为某个正式版本修复bug(hotFix)时, 从master的对应tag中checkout release分支\n- 命名规范: release/{version} \n- 如何修复\n    + 如果对应bug可以在dev分支直接被修复, 可以先提交到dev分支(或者已经修复了), 然后再cherrypick到release分支\n    + 如果bug在新版本无法复现. 比如新版本升级了依赖. 那么在release分支直接修复即可\n\n### 1.1.3、提交信息规范\n\n#### 格式\n\n我们采用angular的提交规范, 在这个规范的基础上支持(可选)`emoji`进行修饰\n\n```\n<type>(<scope>): <subject>\n\n<body>\n\n<footer>\n```\n\n##### header\n\n> 如果提交时feature或者fix(已发布的版本), 这些提交信息应该出现在CHANGELOG\n\n- type: 说明commit的类别. 可以配合emoji使用, 让阅读者更快地区分提交的类型,允许以下类型:\n  - feature或feat: 引入新功能\n  - fix: 修复了bug\n  - docs: 文档\n  - style: 优化项目结构或者代码格式\n  - refactor: 代码重构. 代码重构不涉及新功能和bug修复. 不应该影响原有功能, 包括对外暴露的接口\n  - test: 增加测试\n  - chore: 构建过程, 辅助工具升级. 如升级依赖, 升级构建工具\n  - perf: 性能优化\n  - revert: revert之前的commit\n    - git revert 命令用于撤销之前的一个提交, 并在为这个撤销操作生成一个提交\n  - build或release: 构建或发布版本\n  - ci: 持续集成\n  - types: 类型定义文件更改\n  - workflow: 工作流改进\n  - wip: 开发中\n  - safe: 修复安全问题\n- scope: 可选. 说明提交影响的范围. 例如样式, 后端接口, 逻辑层等等\n- Subject: 提交目的的简短描述, 动词开头, 不超过80个字符. 不要为了提交而提交\n\n##### body\n\n可选. 对本次提交的详细描述. 如果变动很简单, 可以省略\n\n##### footer\n\n可选. 只用于说明不兼容变动(break change)和关闭 Issue(如果使用使用gitlab或github管理bug的话)\n\n#### 模板参考\n\nhttps://github.com/angular/angular/commits/master\n\n```\n# 新增一条 Commit 记录\ngit commit -m \'chore(package.json): 新增 AngularJS 规范，Commit 时会自动调用钩子（GitHook）来判断 Message 是否有效\'\n\n# 搜索跟 package.json 文件相关的历史记录\ngit log HEAD --grep chore(package.json)\n```\n\n### 1.1.4、BUG处理规则\n\n对于测试，目前会经历两个阶段\n\n- 冒烟测试：在对测试正式发版之前会要求对代码进行自测，及冒烟测试。\n- 正式测试阶段：正式测试阶段测试人员会在RDMS进行bug提交和管理，对BUG的处理规则如下：\n      - [解决待关闭]: 修改了程序代码, 问题解决;\n      - [不做处理]: 没有修改程序代码, 是由于其他原因(需求变更等), 而解决的问题;\n      - [退回]: 无规律或只出现一次的BUG, 研发没找到原因, 加上必要排查日志后, 可退回给测试; 复现后重新打开\n      - [正在处理]: 已大致定位原因, 需要较多时间处理的BUG, 可置为\"正在处理\"\n\n> BUG的数量可能会和个人的KPI挂钩。所以要谨慎自测\n\n### 1.1.5、处理定制化需求\n\n- 痛点\n  - 对于定制化需求, 并不会引入到正规的代码流中, 一般情况下会checkout出一个分支, 来专门做这里定制化需求, 然后单独发版. 使用分支模式的缺点有:\n    - 更新问题\n      - 每次正规代码更新都要合并到该分支. 当分支较多时分支图就会比较混乱\n      - 正规代码合并是必然会带来风险的, 比如项目结构变动, 依赖库变动. 都可能导致定制化的代码失效\n- 解决办法\n  - 减少代码耦合\n    - 尽量将定制化需求模块化, 最小化和正规代码之间的接触面. 这是解决该问题最根本的方式.\n      - 检验方式是结构变化时, 没有或很少适配代码\n  - 考虑通过代码层面区分\n    - 例如通过权限系统来配置. 通过后端接口动态配置\n  - 优先使用fork模式\n    - 有些场景确实无法通过代码层面解决, 比如ios应用定制启动图, icon, 应用名称, 外观等等. 这种方式优先使用fork模式, fork模式和分支模式没本质区别, 但是至少可以避免干扰正规开发流程\n\n## 1.2、发布工作流\n\n- 流程\n  1. 进行代码变更\n  2. 提交这些变更, 进行CI让这些变更通过测试\n     - 如果没通过就打tag, 一旦出现测试失败, tag就得重新打\n  3. 提升package.json的版本号, 更新CHANGELOG.md\n  4. 打上tag, 提交\n  5. 可选. 合并到release分支\n- 工具\n  - 使用[jm-deploy release](https://github.com/carney520/jm-deploy)自动化发布并生成CHANGELOG.md\n\n## 1.3、持续集成\n\n所有项目基于coding的持续集成来完成。\n\n## 1.4、扩展\n\n- [如何写好 Git commit log?](https://www.zhihu.com/question/21209619)\n- [提交信息emoji规范](https://gitmoji.carloscuesta.me/)\n- [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)\n- [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)\n- [git钩子定制团队代码提交流程规范](https://www.jianshu.com/p/527e34f53b51)\n- [保持fork之后的项目和上游同步](https://github.com/staticblog/wiki/wiki/保持fork之后的项目和上游同步)\n\n# 2、编码规范\n\n## 2.1、代码格式化\n\n- [Prettier](https://prettier.io/) -  关于代码格式化的所有东西都交给它吧！\n\n基本上，所有代码格式相关的工作都可以交给Prettier来做，在这个基础上再使用Eslint覆盖语义相关的检查\n\n## 2.2、Code Review\n\n#### Architecture/Design\n\n- 单一职责原则.\n  - 这是经常被违背的原则。一个类只能干一个事情, 一个方法最好也只干一件事情。 比较常见的违背是一个类既干UI的事情，又干逻辑的事情, 这个在低质量的代码里很常见。\n\n- 行为是否统一\n\n  - 比如缓存是否统一，错误处理是否统一， 错误提示是否统一， 弹出框是否统一 等等。\n  - 同一逻辑/同一行为 有没有走同一Code Path？低质量程序的另一个特征是，同一行为/同一逻辑，因为出现在不同的地方或者被不同的方式触发，没有走同一Code Path 或者各处有一份copy的实现， 导致非常难以维护。\n\n- 代码污染\n\n  - 代码有没有对其他模块强耦合 ？\n\n- 重复代码\n\n  - 主要看有没有把公用组件，可复用的代码，函数抽取出来。\n\n- Open/Closed 原则\n\n  - 就是好不好扩展。 Open for extension, closed for modification.\n\n- 面向接口编程 和 不是 面向实现编程\n\n  - 主要就是看有没有进行合适的抽象， 把一些行为抽象为接口。\n\n- 健壮性\n\n  - 对Corner case有没有考虑完整，逻辑是否健壮？有没有潜在的bug？\n  - 有没有内存泄漏？有没有循环依赖?（针对特定语言，比如Objective-C) ？有没有野指针？\n  - 有没有考虑线程安全性， 数据访问的一致性\n\n- 错误处理\n\n  - 有没有很好的Error Handling？比如网络出错，IO出错。\n\n- 改动是不是对代码的提升\n\n  - 新的改动是打补丁，让代码质量继续恶化，还是对代码质量做了修复？\n\n- 效率/性能\n\n  - 客户端程序 对频繁消息 和较大数据等耗时操作是否处理得当。\n  - 关键算法的时间复杂度多少？有没有可能有潜在的性能瓶颈。\n\n其中有一部分问题，比如一些设计原则， 可预见的效率问题， 开发模式一致性的问题 应该尽早在Design Review阶段解决。如果Design阶段没有解决，那至少在Code Review阶段也要把它找出来。\n\n#### Style\n\n- 可读性\n\n  - 衡量可读性的可以有很好实践的标准，就是Reviewer能否非常容易的理解这个代码。 如果不是，那意味着代码的可读性要进行改进。\n\n- 命名\n\n  - 命名对可读性非常重要，我倾向于函数名/方法名长一点都没关系，必须是能自我阐述的。\n  - 英语用词尽量准确一点（哪怕有时候需要借助Google Translate，是值得的）\n\n- 函数长度/类长度\n\n  - 函数太长的不好阅读。 类太长了，比如超过了1000行，那你要看一下是否违反的“单一职责” 原则。\n\n- 注释\n\n  - 恰到好处的注释。 但更多我看到比较差质量的工程的一个特点是缺少注释。\n\n- 参数个数\n\n  - 不要太多， 一般不要超过3个。\n\n#### Review Your Own Code First\n\n- 跟著名的橡皮鸭调试法（Rubber Duck Debugging）一样，每次提交前整体把自己的代码过一遍非常有帮助，尤其是看看有没有犯低级错误。\n\n#### 如何进行Code Review\n\n- 多问问题。多问 “这块儿是怎么工作的？” “如果有XXX case，你这个怎么处理？”\n- 每次提交的代码不要太多，最好不要超过1000行，否则review起来效率会非常低。\n- 当面讨论代替Comments。 大部分情况下小组内的同事是坐在一起的，face to face的 code review是非常有效的。\n- 区分重点，不要舍本逐末。 优先抓住 设计，可读性，健壮性等重点问题。\n\n#### Code Review的意识\n\n- 作为一个Developer , 不仅要Deliver working code, 还要Deliver maintainable code.\n- 必要时进行重构，随着项目的迭代，在计划新增功能的同时，开发要主动计划重构的工作项。\n- 开放的心态，虚心接受大家的Review Comments。\n\n# 3、文档规范\n\n## 3.1、文档中心\n\n采用Coding提供的WIKI作为文档中心，采用Markdown格式。\n\n可视化编辑器\n\n- **Visual Code**: 大部分代码编辑都支持Markdown编辑和预览\n- [**Mou**](https://link.jianshu.com/?t=http://mouapp.com/): Mac下的老牌编辑器\n- [**typora**](https://typora.io/): 跨平台的Markdown编辑器，推荐\n\n## 3.2、代码即文档\n\n通过‘代码即文档’的方式至少可以**保持文档和代码同步更新**；另外**很多工具会分析代码的数据类型**，自动帮我们生成参数和返回值定义，这也可以减少很多文档编写工作以及出错率。\n\n相关的工具有:\n\n- API文档 \n  - Typescript \n    - [tsdoc](https://github.com/microsoft/tsdoc) Typescript官方的注释文档标准\n    - [typedoc](https://github.com/TypeStrong/typedoc) 基于tsdoc标准的文档生成器\n  - Javascript \n    - [jsdoc](https://github.com/jsdoc/jsdoc) Javascript文档注释标准和生成器\n- 后端接口文档 \n  - [Swagger](https://swagger.io) Restful接口文档规范\n  - GraphQL: 这个有很多工具，例如[graphiql](https://github.com/graphql/graphiql), 集成了Playground和文档，很先进\n  - [Easy Mock](https://easy-mock.com/login) 一个可视化，并且能快速生成模拟数据的服务\n- 组件文档 \n  - [StoryBook](https://storybook.js.org) 通用的组件开发、测试、文档工具\n  - React \n    - [Docz](http://docz.site)\n    - [Styleguidist](https://github.com/styleguidist/react-styleguidist)\n  - Vue \n    - [vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist)\n\n## 3.3、注释即文档\n\n**必要和适量的注释对阅读源代码的人来说就是一个路牌, 可以少走很多弯路**.\n\n关于注释的一些准则，[<阿里巴巴Java开发手册>](https://github.com/alibaba/p3c/blob/master/p3c-gitbook/编程规约/注释规约.md)总结得非常好, 推荐基于这个来建立注释规范。另外通过ESlint是可以对注释进行一定程度的规范。\n\n# 4、UI规范\n\n待定\n\n# 5、测试规范\n\n![图片](/api/project/281160/files/2347052/imagePreview)\n\n## 单元测试\n\n单元测试有很多**好处**, 比如:\n\n- **提高信心，适应变化和迭代**. 如果现有代码有较为完善的单元测试，在代码重构时，可以检验模块是否依然可以工作, 一旦变更导致错误，单元测试也可以帮助我们快速定位并修复错误\n- **单元测试是集成测试的基础**\n- **测试即文档**。如果文档不能解决你的问题，在你打算看源码之前，可以查看单元测试。通过这些测试用例，开发人员可以直观地理解程序单元的基础API\n- **提升代码质量。易于测试的代码，一般都是好代码**\n\n**测什么?**\n\n业务代码或业务组件是比较难以实施单元测试的，一方面它们比较多变、另一方面很多团队很少有精力维护这部分单元测试。所以**通常只要求对一些基础/底层的组件、框架或者服务进行测试, 视情况考虑是否要测试业务代码**\n\n**测试的准则**:\n\n- 推荐Petroware的[Unit Testing Guidelines](https://petroware.no/unittesting.html), 总结了27条单元测试准则，非常受用.\n- 另外<阿里巴巴的Java开发手册>中总结的[单元测试准则](https://github.com/alibaba/p3c/blob/master/p3c-gitbook/单元测试.md), 也不错，虽然书名是Java，准则是通用的.\n\n**单元测试指标**:\n\n一般使用[`测试覆盖率`](https://zh.wikipedia.org/wiki/代碼覆蓋率)来量化，尽管对于覆盖率能不能衡量单元测试的有效性存在较多争议。\n\n大部分情况下还是推荐尽可能提高覆盖率, 比如要求`语句覆盖率达到70%；核心模块的语句覆盖率和分支覆盖率都要达到100%`. 视团队情况而定\n\n扩展:\n\n- [测试覆盖（率）到底有什么用？](https://www.infoq.cn/article/test-coverage-rate-role)\n- [阿里巴巴Java开发文档-单元测试](https://www.kancloud.cn/kanglin/java_developers_guide/539190)\n\n**相关工具**\n\n- Headless Browsers: 无头浏览器是网页自动化的重要运行环境。 常用于功能测试、单元测试、网络爬虫 \n\n  - [puppeteer](https://github.com/GoogleChrome/puppeteer)\n  - [Headless Chromium](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md)\n\n- 测试框架 \n\n  - Jest\n\n    Facebook的单元测试框架. 零配置, 支持组件快照测试、模块Mock、Spy. 一般场景, 单元测试学它一个就行了 \n\n    - 组件测试 \n      - [testing-library](https://github.com/testing-library) \n      - [Enzyme](https://github.com/airbnb/enzyme)\n\n  - [Intern](https://theintern.github.io/)\n\n- 单元测试 \n\n  - [AVA](https://github.com/avajs/ava)\n  - [Jasmine](http://jasmine.github.io/)\n  - [Mocha](http://mochajs.org/)\n  - [Tape](https://github.com/substack/tape)\n\n- 断言库 \n\n  - [Chai](http://chaijs.com/)\n  - [expect.js](https://github.com/Automattic/expect.js)\n  - [should.js](http://shouldjs.github.io/)\n\n- Mock/Stubs/Spies \n\n  - [sinon.js](http://sinonjs.org/)\n\n- 代码覆盖率 \n\n  - [istanbul](https://github.com/gotwarlost/istanbul)\n\n- 基准测试 \n\n  - [benchmark.js](http://benchmarkjs.com/)\n  - [jsperf.com](https://jsperf.com/)\n\n# 6、异常处理、监控\n\n## 6.1、异常处理\n\n参考《阿里巴巴开发手册》中的[异常处理]([https://github.com/alibaba/p3c/blob/master/p3c-gitbook/%E5%BC%82%E5%B8%B8%E6%97%A5%E5%BF%97/%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86.md](https://github.com/alibaba/p3c/blob/master/p3c-gitbook/异常日志/异常处理.md))\n\n## 6.2、日志\n\n- 避免重复打印日志\n- 谨慎地记录日志, 划分日志级别。比如生产环境禁止输出debug日志；有选择地输出info日志；\n- 使用前缀对日志进行分类, 例如: `[User] xxxx`\n\n## 6.2、异常监控\n\n异常监控通常会通过三种方式来收集异常数据:\n\n1. 全局捕获。\n2. 主动上报。在try/catch中主动上报.\n3. 用户反馈。比如弹窗让用户填写反馈信息.\n\n第三方工具推荐\n\n- [Bugly](https://bugly.qq.com/v2/) 免费\n- [Sentry](https://sentry.io/welcome/) 免费基本够用\n\n# 7、前后端协作规范\n\n## 7.1、协作流程\n\n前后端协作流程如下:\n\n![图片](/api/project/281160/files/2347269/imagePreview)\n\n1、需求分析。参与者一般有前后端、测试、以及产品. 由产品主持，对需求进行宣贯，接受开发和测试的反馈，确保大家对需求有一致的认知\n\n2、前后端开发讨论。讨论应用的一些开发设计，沟通技术点、难点、以及分工问题.\n\n3、设计接口文档。可以由前后端一起设计；或者由后端设计、前端确认是否符合要求\n\n4、并行开发。前后端并行开发，在这个阶段，前端可以先实现静态页面; 或者根据接口文档对接口进行Mock, 来模拟对接后端接口\n\n5、在联调之前，要求后端做好接口测试\n\n6、真实环境联调。前端将接口请求代理到后端服务，进行真实环境联调。\n\n## 7.2、接口规范\n\n采用RESTFUL设计规范。\n\n**需要注意的点**:\n\n- 明确区分是正常还是异常, 严格遵循接口的异常原语. 上述接口形式都有明确的异常原语，比如JSONRPC，当出现异常时应该返回`错误对象`响应，而不是在正常的响应体中返回错误代码. 另外要规范化的错误码, HTTP响应码就是一个不错的学习对象\n- 明确数据类型。很多后端写的接口都是string和number不分的，如果妥协的话、前端就需要针对这个属性做特殊处理，这也可能是潜在的bug\n- 明确空值的意义。比如在做更新操作是，空值是表示重置，还是忽略更新？\n- 响应避免冗余的嵌套。\n- 接口版本化，保持向下兼容。就像我们上文的‘语义化版本规范’说的，对于后端来说，API就是公共的接口. 公共暴露的接口应该有一个版本号，来说明当前描述的接口做了什么变动，是否向下兼容。 现在前端代码可能会在客户端被缓存，例如小程序。如果后端做了break change，就会影响这部分用户。\n\n## 7.3、接口文档规范\n\n后端通过接口文档向前端暴露接口相关的信息。通常需要包含这些信息：\n\n- 版本号\n- 文档描述\n- 服务的入口. 例如基本路径\n- 测试服务器. 可选\n- 简单使用示例\n- 安全和认证\n- 请求限制\n- 错误说明\n- 版本\n- 字段类型\n- 具体接口定义 \n  - 方法名称或者URL\n  - 方法描述\n  - 请求参数及其描述，必须说明类型(数据类型、是否可选等)\n  - 响应参数及其描述, 必须说明类型(数据类型、是否可选等)\n  - 可能的异常情况、错误代码、以及描述\n  - 请求示例，可选\n\n> 也可采用Coding提供的API文档模板来改写\n\n**人工维护导致的问题**:\n\n上文‘代码即文档’就提到了人工维护接口文档可能导致代码和文档不同步问题。\n\n如果可以从代码或者规范文档(例如OpenAPI这类API描述规范)中生成接口文档，可以解决实现和文档不一致问题, 同时也可以减少文档编写和维护的投入.\n\n**项目采用Coding提供的API文档来自动生成API文档。**\n\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    38,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'login',
    '用户登录',
    '<a name=\"top\"></a>\n# <a name=\'login\'></a> login\n\n## <a name=\'获取验证码\'></a> 获取验证码\n\n<p>返回base64位图片</p>\n\n```\nGET login/captcha\n```\n\n## <a name=\'用户登录\'></a> 用户登录\n\n```\nPOST login/do\n```\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| username | `string` | <p>用户 必填</p> |\n| password | `string` | <p>密码 必填</p> |\n| captcha | `string` | <p>验证码 必填</p> |\n\n### 返回信息\n\n#### 状态码 - `Success 200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| code | `number` | <p>结果码</p> |\n| data | `string` | <p>数据</p> |\n| message | `string` | <p>提示</p> |\n\n### 返回事例\n\n####  - `Success-Response:`\n\n```json\n{\n\"code\": 0,\n\"message\": \"ok\",\n\"data\":token\n}\n```\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    39,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'menu',
    '后台菜单',
    '<a name=\"top\"></a>\n# <a name=\'menu\'></a> menu\n\n## <a name=\'编辑菜单\'></a> 编辑菜单\n\n```\nPOST menu/edit\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `Number` | <p>菜单id</p> |\n| pid | `Number` | <p>菜单上级id</p> |\n| title | `String` | <p>菜单名称</p> |\n| href | `String` | <p>前端模版</p> |\n| route | `String` | <p>后端路由</p> |\n| icon | `String` | <p>菜单icon</p> |\n| type | `Number` | <p>类型 0 1 2 3</p> |\n| order_num | `Number` | <p>排序</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'菜单是否显示\'></a> 菜单是否显示\n\n```\nPOST menu/ifshow\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `Number` | <p>菜单id</p> |\n| ifshow | `Number` | <p>显示状态0或1</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name |  | <p>description</p> |\n\n## <a name=\'获取单个菜单数据\'></a> 获取单个菜单数据\n\n```\nGET menu/one\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `Number` | <p>菜单id 可为0 为0时添加数据前拉取</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'获取管理菜单列表\'></a> 获取管理菜单列表\n\n```\nGET menu/oplist\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 返回信息\n\n#### 状态码 - `Success 200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| code | `number` | <p>结果码</p> |\n| data | `string` | <p>数据</p> |\n| message | `string` | <p>提示</p> |\n\n## <a name=\'获取管理界面菜单\'></a> 获取管理界面菜单\n\n```\nGET menu/list\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 返回信息\n\n#### 状态码 - `Success 200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| code | `number` | <p>结果码</p> |\n| data | `string` | <p>数据</p> |\n| message | `string` | <p>提示</p> |\n\n### 返回事例\n\n####  - `Success-Response:`\n\n```json\n{\n\"code\": 200,\n\"message\": \"ok\",\n\"data\":{[\n]}\n}\n```\n\n## <a name=\'删除菜单\'></a> 删除菜单\n\n```\nPOST menu/del\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `Number` | <p>菜单id</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name |  | <p>description</p> |\n\n## <a name=\'添加菜单\'></a> 添加菜单\n\n```\nPOST menu/edit\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| pid | `Number` | <p>菜单上级id</p> |\n| title | `String` | <p>菜单名称</p> |\n| href | `String` | <p>前端模版</p> |\n| route | `String` | <p>后端路由</p> |\n| icon | `String` | <p>菜单icon</p> |\n| type | `Number` | <p>类型 0 1 2 3</p> |\n| order_num | `Number` | <p>排序</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    40,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'auth',
    '权限管理',
    '<a name=\"top\"></a>\n# <a name=\'auth\'></a> auth\n\n## <a name=\'编辑角色\'></a> 编辑角色\n\n```\nPOST auth/eidt\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `string` | <p>角色名</p> |\n| status | `number` | <p>是否可用0可用1不可用</p> |\n| rules | `string` | <p>菜单id集合，逗号隔开</p> |\n| remark | `string` | <p>备注</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'角色编辑前\'></a> 角色编辑前\n\n```\nPOST auth/beforEdit\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'角色列表\'></a> 角色列表\n\n```\nGET auth/list\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n| limit | `number` | <p>每页显示数据</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'角色添加前\'></a> 角色添加前\n\n```\nPOST auth/addTree\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| null |  |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'删除角色\'></a> 删除角色\n\n```\nPOST auth/del\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'设置角色是否可用\'></a> 设置角色是否可用\n\n```\nPOST auth/enable\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| status | `number` | <p>状态</p> |\n| id | `number` |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'添加角色\'></a> 添加角色\n\n```\nPOST auth/add\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `string` | <p>角色名</p> |\n| status | `number` | <p>是否可用0可用1不可用</p> |\n| rules | `string` | <p>菜单id集合，逗号隔开</p> |\n| remark | `string` | <p>备注</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    41,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'Admin',
    '管理员管理',
    '<a name=\"top\"></a>\n# <a name=\'admin\'></a> admin\n\n## <a name=\'编辑管理员\'></a> 编辑管理员\n\n```\nPOST admin/edit\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| admin_id | `Number` | <p>管理员id</p> |\n| username | `string` | <p>用户名</p> |\n| password | `string` | <p>密码</p> |\n| name | `string` | <p>真实姓名</p> |\n| mobile | `Number` | <p>手机号</p> |\n| status | `Number` | <p>状态</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'编辑管理员前\'></a> 编辑管理员前\n\n```\nGET admin/editBefore\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` | <p>管理员id</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'管理员列表\'></a> 管理员列表\n\n```\nGET admin/list\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'删除管理员\'></a> 删除管理员\n\n```\nPOST admin/del\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'设置管理员是否可用\'></a> 设置管理员是否可用\n\n```\nPOST admin/enable\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| status | `number` | <p>状态</p> |\n| id | `number` |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'添加管理员\'></a> 添加管理员\n\n```\nPOST admin/add\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| username | `string` | <p>用户名</p> |\n| password | `string` | <p>密码</p> |\n| name | `string` | <p>真实姓名</p> |\n| mobile | `Number` | <p>手机号</p> |\n| status | `Number` | <p>状态</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'添加管理员前\'></a> 添加管理员前\n\n```\nGET admin/addBefore\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| null |  |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    42,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'logs',
    '日志管理',
    '<a name=\"top\"></a>\n# <a name=\'logs\'></a> logs\n\n## <a name=\'操作日志列表\'></a> 操作日志列表\n\n```\nGET logs/op\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n| limit | `number` | <p>每页显示数据</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'错误日志列表\'></a> 错误日志列表\n\n```\nGET logs/err\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n| limit | `number` | <p>每页显示数据</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'行为日志列表\'></a> 行为日志列表\n\n```\nGET logs/view\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n| limit | `number` | <p>每页显示数据</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    43,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'set',
    '系统配置管理',
    '<a name=\"top\"></a>\n# <a name=\'set\'></a> set\n\n## <a name=\'设置是否可用\'></a> 设置是否可用\n\n```\nPOST set/enable\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| status | `number` | <p>状态</p> |\n| id | `number` |  |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'添加系统配置类目\'></a> 添加系统配置类目\n\n```\nGET set/cateAdd\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| key | `string` | <p>类目键值</p> |\n| name | `string` | <p>类目名</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'系统配置类目列表\'></a> 系统配置类目列表\n\n```\nGET set/cate\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n| limit | `number` | <p>每页显示数据</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    44,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'form',
    '表单设计器',
    '<a name=\"top\"></a>\n# <a name=\'form\'></a> form\n\n## <a name=\'表单列表\'></a> 表单列表\n\n```\nGET form/list\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| page | `number` | <p>页码</p> |\n| limit | `number` | <p>每页显示数据</p> |\n| param | `string` | <p>每页显示数据</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'删除表单\'></a> 删除表单\n\n```\nPOST form/delete\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` | <p>id</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'添加表单\'></a> 添加表单\n\n```\nPOST form/add\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` | <p>id</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n## <a name=\'添加事例\'></a> 添加事例\n\n```\nPOST form/add\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n### 请求参数 - `Parameter`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| id | `number` | <p>id</p> |\n\n### 返回信息\n\n#### 状态码 - `200`\n\n| Name     | Type       | Description                           |\n|----------|------------|---------------------------------------|\n| name | `type` | <p>description</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    45,
    1,
    1,
    1638529126,
    1638529126,
    1,
    30,
    'db',
    '数据库设计器',
    '<a name=\"top\"></a>\n# <a name=\'db\'></a> db\n\n## <a name=\'备份数据\'></a> 备份数据\n\n```\nGET db/backup\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'查看文档\'></a> 查看文档\n\n```\nGET db/doc\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'更新缓存\'></a> 更新缓存\n\n```\nGET db/update\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'还原数据\'></a> 还原数据\n\n```\nGET db/reback\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'列出备份数据文件\'></a> 列出备份数据文件\n\n```\nGET db/backupFile\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'删除还原数据\'></a> 删除还原数据\n\n```\nGET db/delback\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'数据列表\'></a> 数据列表\n\n```\nGET db/list\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    46,
    1,
    1,
    1638529126,
    1638529126,
    1,
    31,
    'db',
    '数据库配置',
    '<a name=\"top\"></a>\n# <a name=\'db\'></a> db\n\n## <a name=\'备份数据\'></a> 备份数据\n\n```\nGET db/backup\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'查看文档\'></a> 查看文档\n\n```\nGET db/doc\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'更新缓存\'></a> 更新缓存\n\n```\nGET db/update\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'还原数据\'></a> 还原数据\n\n```\nGET db/reback\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'列出备份数据文件\'></a> 列出备份数据文件\n\n```\nGET db/backupFile\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'删除还原数据\'></a> 删除还原数据\n\n```\nGET db/delback\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n## <a name=\'数据列表\'></a> 数据列表\n\n```\nGET db/list\n```\n\n### Headers - `Header`\n\n| Name    | Type      | Description                          |\n|---------|-----------|--------------------------------------|\n| rttoken | `string` | <p>必填</p> |\n\n',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    47,
    1,
    1,
    1638529126,
    1638529126,
    1,
    31,
    'cron',
    '计划任务配置',
    '',
    0
  );
INSERT INTO
  `rt_doc_cate` (
    `id`,
    `did`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `pid`,
    `name`,
    `title`,
    `content`,
    `order_num`
  )
VALUES
  (
    48,
    1,
    1,
    1638581395,
    1638667571,
    1,
    29,
    'todo',
    'TODO',
    '## 数据库设计器\n\n&cross; 添加字段设置为null时，null做字符串塞入默认值了\n&cross; 数据库设计器sql查询的结果不好看，需要优化\n',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_error
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_excel
# ------------------------------------------------------------

INSERT INTO
  `rt_excel` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `name`,
    `title`,
    `content`
  )
VALUES
  (
    1,
    1638248912,
    1638248912,
    0,
    NULL,
    '刘瑞涛总',
    '[{\"name\":\"刘瑞涛总\",\"config\":{\"columnlen\":{\"2\":196,\"3\":223,\"4\":195,\"5\":186,\"6\":252,\"8\":165,\"12\":233,\"13\":252,\"14\":178},\"customWidth\":{\"2\":1,\"3\":1,\"4\":1,\"5\":1,\"6\":1,\"8\":1,\"12\":1,\"13\":1,\"14\":1},\"rowlen\":{\"0\":27,\"1\":27,\"2\":27,\"3\":27,\"4\":27,\"5\":27,\"6\":27,\"7\":27,\"8\":27,\"9\":27,\"10\":27,\"11\":27},\"customHeight\":{\"0\":1,\"1\":1,\"2\":1,\"3\":1,\"4\":1,\"5\":1,\"6\":1,\"7\":1,\"8\":1,\"9\":1,\"10\":1,\"11\":1}},\"index\":\"1\",\"status\":\"1\",\"order\":\"0\",\"luckysheet_select_save\":[{\"row\":[5,5],\"column\":[5,5],\"sheetIndex\":1}],\"zoomRatio\":1,\"showGridLines\":\"1\",\"defaultColWidth\":70,\"defaultRowHeight\":16,\"celldata\":[{\"r\":0,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"高管\",\"qp\":1}},{\"r\":0,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"序号\",\"qp\":1}},{\"r\":0,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"问题\",\"qp\":1}},{\"r\":0,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"已有回复\",\"qp\":1}},{\"r\":0,\"c\":4,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"新答复\",\"qp\":1}},{\"r\":0,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"应提供的凭证\",\"qp\":1}},{\"r\":0,\"c\":6,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"账号\",\"qp\":1}},{\"r\":0,\"c\":7,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"持卡人姓名\",\"qp\":1}},{\"r\":0,\"c\":8,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"交易日期\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":0,\"c\":9,\"v\":{\"ct\":{\"fa\":\"#,##0.00\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"收入\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":0,\"c\":10,\"v\":{\"ct\":{\"fa\":\"#,##0.00\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支出\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":0,\"c\":11,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"币种\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":0,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"商户名\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1},{\"v\":\"/\",\"ff\":\"Times New Roman\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1},{\"v\":\"对方账户\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":0,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"对方户名\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":0,\"c\":14,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"摘要\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10,\"bl\":1}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"bl\":1,\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":1,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1,\"v\":\"5-刘瑞涛\",\"qp\":1}},{\"r\":1,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":1,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":1,\"c\":4,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"vt\":0,\"tb\":1}},{\"r\":1,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"1\"}},{\"r\":2,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"打款方是谁？打款缘由是什么？\",\"qp\":1}},{\"r\":2,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":4,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6214467873152916836\",\"qp\":1}},{\"r\":2,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"44040\"}},{\"r\":2,\"c\":9,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"50000\"}},{\"r\":2,\"c\":10,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":11,\"v\":{\"ct\":{\"fa\":\"@\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"21550690\",\"qp\":1}},{\"r\":2,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝（中国）网络技术有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝支付\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":2,\"c\":16,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":3,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见上\",\"qp\":1}},{\"r\":3,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":3,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":3,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6214467873152916836\",\"qp\":1}},{\"r\":3,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"44040\"}},{\"r\":3,\"c\":9,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"50000\"}},{\"r\":3,\"c\":10,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":11,\"v\":{\"ct\":{\"fa\":\"@\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"21550690\",\"qp\":1}},{\"r\":3,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝（中国）网络技术有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝支付\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":3,\"c\":16,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":4,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见上\",\"qp\":1}},{\"r\":4,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":4,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":4,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6214467873152916836\",\"qp\":1}},{\"r\":4,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"44061\"}},{\"r\":4,\"c\":9,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"50000\"}},{\"r\":4,\"c\":10,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":11,\"v\":{\"ct\":{\"fa\":\"@\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"21550690\",\"qp\":1}},{\"r\":4,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝（中国）网络技术有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝支付\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":4,\"c\":16,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":5,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见上\",\"qp\":1}},{\"r\":5,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":5,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":5,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6214467873152916836\",\"qp\":1}},{\"r\":5,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"44065\"}},{\"r\":5,\"c\":9,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"50000\"}},{\"r\":5,\"c\":10,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":11,\"v\":{\"ct\":{\"fa\":\"@\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"21550690\",\"qp\":1}},{\"r\":5,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝（中国）网络技术有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝支付\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":5,\"c\":16,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":6,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见上\",\"qp\":1}},{\"r\":6,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":6,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":6,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6214467873152916836\",\"qp\":1}},{\"r\":6,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"44065\"}},{\"r\":6,\"c\":9,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"50000\"}},{\"r\":6,\"c\":10,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":11,\"v\":{\"ct\":{\"fa\":\"@\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"21550690\",\"qp\":1}},{\"r\":6,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝（中国）网络技术有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"支付宝支付\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":6,\"c\":16,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":7,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见上\",\"qp\":1}},{\"r\":7,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":7,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":7,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6214467873152916836\",\"qp\":1}},{\"r\":7,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"44314\"}},{\"r\":7,\"c\":9,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"49950.05\"}},{\"r\":7,\"c\":10,\"v\":{\"ct\":{\"fa\":\"0.00_);[Red]\\\\(0.00\\\\)\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":11,\"v\":{\"ct\":{\"fa\":\"@\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"243300133\",\"qp\":1}},{\"r\":7,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"财付通支付科技有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"财付通付款\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":7,\"c\":16,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"宋体\",\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"2\"}},{\"r\":8,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见下\",\"qp\":1}},{\"r\":8,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1,\"v\":\"个人公司归还借款\",\"qp\":1}},{\"r\":8,\"c\":4,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":8,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6217002920000357062\",\"qp\":1}},{\"r\":8,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"43585\"}},{\"r\":8,\"c\":9,\"v\":{\"ct\":{\"fa\":\"#,##0.00\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"10000\"}},{\"r\":8,\"c\":10,\"v\":{\"ct\":{\"fa\":\"#,##0.00\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":11,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"43050177363600000048\",\"qp\":1}},{\"r\":8,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"湖南瑞涛网络科技有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"备用金\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":8,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":9,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"见下\",\"qp\":1}},{\"r\":9,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1,\"v\":\"个人公司归还借款\",\"qp\":1}},{\"r\":9,\"c\":4,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":9,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6217002920000357062\",\"qp\":1}},{\"r\":9,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"43585\"}},{\"r\":9,\"c\":9,\"v\":{\"ct\":{\"fa\":\"#,##0.00\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"9000\"}},{\"r\":9,\"c\":10,\"v\":{\"ct\":{\"fa\":\"#,##0.00\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":11,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"43050177363600000048\",\"qp\":1}},{\"r\":9,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"湖南瑞涛网络科技有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"备用金\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":9,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":10,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2,\"v\":\"何时发出借款？\",\"qp\":1}},{\"r\":10,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1,\"v\":\"个人公司归还借款\",\"qp\":1}},{\"r\":10,\"c\":4,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2,\"v\":\"借款凭证/流水\",\"qp\":1}},{\"r\":10,\"c\":6,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"6217002920000357062\",\"qp\":1}},{\"r\":10,\"c\":7,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"刘瑞涛\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":8,\"v\":{\"ct\":{\"fa\":\"m/d/yy\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"43585\"}},{\"r\":10,\"c\":9,\"v\":{\"ct\":{\"fa\":\"#,##0.00\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"3000\"}},{\"r\":10,\"c\":10,\"v\":{\"ct\":{\"fa\":\"#,##0.00\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":11,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":12,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"s\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1,\"v\":\"43050177363600000048\",\"qp\":1}},{\"r\":10,\"c\":13,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"湖南瑞涛网络科技有限公司\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":14,\"v\":{\"ct\":{\"fa\":\"@\",\"t\":\"inlineStr\",\"s\":[{\"v\":\"备用金\",\"ff\":\"楷体_GB2312\",\"fc\":\"#000000\",\"fs\":10}]},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":10,\"c\":15,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"Times New Roman\",\"ht\":0,\"vt\":0,\"tb\":1}},{\"r\":11,\"c\":0,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":1}},{\"r\":11,\"c\":1,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}},{\"r\":11,\"c\":2,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":11,\"c\":3,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#000000\",\"ff\":\"楷体_GB2312\",\"ht\":1,\"vt\":0,\"tb\":2}},{\"r\":11,\"c\":5,\"v\":{\"ct\":{\"fa\":\"General\"},\"fs\":10,\"fc\":\"#C00000\",\"ff\":\"楷体_GB2312\",\"ht\":0,\"vt\":0,\"tb\":2}}],\"calcChain\":[]}]'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_flow
# ------------------------------------------------------------

INSERT INTO
  `rt_flow` (
    `id`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    1,
    1,
    1638420142,
    1638420441,
    1,
    'Drawing1.xml',
    '<mxGraphModel dx=\"428\" dy=\"478\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"827\" pageHeight=\"1169\"><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/><mxCell id=\"2\" value=\"\" style=\"whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"80\" y=\"180\" width=\"80\" height=\"80\" as=\"geometry\"/></mxCell><mxCell id=\"3\" value=\"\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;\" edge=\"1\" parent=\"1\" source=\"4\" target=\"5\"><mxGeometry relative=\"1\" as=\"geometry\"/></mxCell><mxCell id=\"4\" value=\"\" style=\"shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"250\" y=\"120\" width=\"120\" height=\"60\" as=\"geometry\"/></mxCell><mxCell id=\"5\" value=\"\" style=\"shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"250\" y=\"260\" width=\"120\" height=\"60\" as=\"geometry\"/></mxCell><mxCell id=\"6\" value=\"\" style=\"whiteSpace=wrap;html=1;aspect=fixed;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"90\" y=\"80\" width=\"80\" height=\"80\" as=\"geometry\"/></mxCell></root></mxGraphModel>'
  );
INSERT INTO
  `rt_flow` (
    `id`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    2,
    2,
    1638420470,
    1638420470,
    1,
    'My Diagram',
    '<mxGraphModel><root><Diagram label=\"My Diagram\" href=\"http://www.jgraph.com/\" id=\"0\"><mxCell/></Diagram><Layer label=\"Default Layer\" id=\"1\"><mxCell parent=\"0\"/></Layer><Container label=\"Container\" href=\"\" id=\"2\"><mxCell style=\"swimlane\" vertex=\"1\" connectable=\"0\" parent=\"1\"><mxGeometry x=\"140\" y=\"100\" width=\"200\" height=\"200\" as=\"geometry\"/></mxCell></Container><Roundrect label=\"Rounded\" href=\"\" id=\"3\"><mxCell style=\"rounded\" vertex=\"1\" parent=\"2\"><mxGeometry x=\"50\" y=\"50\" width=\"80\" height=\"40\" as=\"geometry\"/></mxCell></Roundrect></root></mxGraphModel>'
  );
INSERT INTO
  `rt_flow` (
    `id`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    3,
    3,
    1638421050,
    1638421050,
    1,
    'MyWorkflow',
    '<mxGraphModel><root><Workflow label=\"MyWorkflow\" id=\"0\"><mxCell/></Workflow><Layer label=\"Default Layer\" id=\"1\"><mxCell parent=\"0\"/></Layer><Swimlane label=\"Role\" customAttribute=\"text value\" id=\"2\"><mxCell style=\"swimlane;fillColor=#83027F\" vertex=\"1\" connectable=\"0\" parent=\"1\"><mxGeometry x=\"20\" y=\"20\" width=\"220\" height=\"480\" as=\"geometry\"/></mxCell></Swimlane><Task label=\"Task\" id=\"3\"><mxCell vertex=\"1\" parent=\"2\"><mxGeometry x=\"70\" y=\"80\" width=\"80\" height=\"30\" as=\"geometry\"/></mxCell></Task></root></mxGraphModel>'
  );
INSERT INTO
  `rt_flow` (
    `id`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    4,
    4,
    1638421070,
    1638421070,
    1,
    'MyWorkflow',
    '<mxGraphModel><root><Workflow label=\"MyWorkflow\" description=\"\" href=\"\" id=\"0\"><mxCell/></Workflow><Layer label=\"Default Layer\" id=\"1\"><mxCell parent=\"0\"/></Layer><Swimlane label=\"Swimlane\" description=\"\" href=\"\" id=\"2\"><mxCell style=\"swimlane;fillColor=#83027F\" vertex=\"1\" connectable=\"0\" parent=\"1\"><mxGeometry x=\"160\" y=\"130\" width=\"300\" height=\"160\" as=\"geometry\"/></mxCell></Swimlane><Symbol label=\"Symbol\" description=\"\" href=\"\" id=\"3\"><mxCell style=\"symbol;image=images/symbols/event_intermediate.png\" vertex=\"1\" parent=\"2\"><mxGeometry x=\"80\" y=\"90\" width=\"32\" height=\"32\" as=\"geometry\"/></mxCell></Symbol><Symbol label=\"Symbol\" description=\"\" href=\"\" id=\"4\"><mxCell style=\"symbol;image=images/symbols/event_end.png\" vertex=\"1\" parent=\"2\"><mxGeometry x=\"200\" y=\"110\" width=\"32\" height=\"32\" as=\"geometry\"/></mxCell></Symbol></root></mxGraphModel>'
  );
INSERT INTO
  `rt_flow` (
    `id`,
    `type`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    5,
    1,
    1638421331,
    1638421331,
    1,
    'Drawing1',
    '<mxGraphModel dx=\"428\" dy=\"478\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"827\" pageHeight=\"1169\"><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/><mxCell id=\"2\" value=\"\" style=\"rounded=0;whiteSpace=wrap;html=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"140\" y=\"120\" width=\"120\" height=\"60\" as=\"geometry\"/></mxCell><mxCell id=\"3\" value=\"\" style=\"shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"170\" y=\"230\" width=\"120\" height=\"60\" as=\"geometry\"/></mxCell></root></mxGraphModel>'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_form
# ------------------------------------------------------------

INSERT INTO
  `rt_form` (
    `id`,
    `name`,
    `key`,
    `data`,
    `get_url`,
    `post_url`,
    `form_path`,
    `add_time`,
    `link_id`,
    `link_name`,
    `link_field`,
    `params_get`,
    `params_post`
  )
VALUES
  (
    9,
    'mysql',
    'mysql',
    '[{\"id\":\"host\",\"index\":0,\"label\":\"数据库地址\",\"tag\":\"input\",\"tagIcon\":\"input\",\"placeholder\":\"请输入数据库地址\",\"defaultValue\":null,\"labelWidth\":125,\"width\":\"100%\",\"clearable\":true,\"maxlength\":null,\"showWordLimit\":false,\"readonly\":false,\"disabled\":false,\"required\":true,\"expression\":\"\",\"document\":\"\"},{\"id\":\"port\",\"index\":1,\"label\":\"端口号\",\"tag\":\"input\",\"tagIcon\":\"input\",\"placeholder\":\"请输入端口号\",\"defaultValue\":\"3306\",\"labelWidth\":125,\"width\":\"100%\",\"clearable\":true,\"maxlength\":null,\"showWordLimit\":false,\"readonly\":false,\"disabled\":false,\"required\":true,\"expression\":\"number\",\"document\":\"\"},{\"id\":\"input_2\",\"index\":2,\"label\":\"单行文本\",\"tag\":\"input\",\"tagIcon\":\"input\",\"placeholder\":\"请输入\",\"defaultValue\":null,\"labelWidth\":110,\"width\":\"100%\",\"clearable\":true,\"maxlength\":null,\"showWordLimit\":false,\"readonly\":false,\"disabled\":false,\"required\":true,\"expression\":\"\",\"document\":\"\"},{\"id\":\"textarea_1\",\"index\":3,\"label\":\"多行文本\",\"tag\":\"textarea\",\"tagIcon\":\"textarea\",\"placeholder\":\"请输入\",\"defaultValue\":null,\"width\":\"100%\",\"readonly\":false,\"disabled\":false,\"required\":true,\"document\":\"\"}]',
    'set/setBefore',
    'set/setConf',
    'set/config/mysql',
    0,
    9,
    'set',
    'id',
    'conftype|mysql',
    'conftype|mysql'
  );
INSERT INTO
  `rt_form` (
    `id`,
    `name`,
    `key`,
    `data`,
    `get_url`,
    `post_url`,
    `form_path`,
    `add_time`,
    `link_id`,
    `link_name`,
    `link_field`,
    `params_get`,
    `params_post`
  )
VALUES
  (10, 'test', '测试', '[]', '', '', '', 0, 0, '0', NULL, '', '');
INSERT INTO
  `rt_form` (
    `id`,
    `name`,
    `key`,
    `data`,
    `get_url`,
    `post_url`,
    `form_path`,
    `add_time`,
    `link_id`,
    `link_name`,
    `link_field`,
    `params_get`,
    `params_post`
  )
VALUES
  (
    11,
    'redis',
    'redis',
    '[]',
    'set/setBefore',
    'set/setConf',
    'set/config/redis',
    0,
    10,
    'set',
    'id',
    'conftype|redis',
    'conftype|redis'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_menu
# ------------------------------------------------------------

INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    1,
    '内容管理',
    'content',
    NULL,
    0,
    2,
    'layui-icon layui-icon-theme',
    '_self',
    0,
    0,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    2,
    '系统管理',
    'system',
    '',
    0,
    1,
    'layui-icon layui-icon-windows',
    '_self',
    0,
    0,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    3,
    '公共模块',
    'common',
    '',
    0,
    3,
    'layui-icon layui-icon-at',
    '_self',
    0,
    0,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    9,
    '菜单管理',
    'menu/oplist',
    'view/menu/index.html',
    1,
    1,
    'layui-icon layui-icon-gift',
    '_self',
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    10,
    '角色管理',
    'auth/list',
    'view/auth/index.html',
    1,
    10,
    'layui-icon layui-icon-service',
    '_self',
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    11,
    '管理员管理',
    'admin/list',
    'view/admin/list.html',
    1,
    11,
    'layui-icon layui-icon-key',
    '_self',
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    12,
    '日志管理',
    'logs',
    '',
    0,
    12,
    'layui-icon layui-icon-spread-left',
    '_self',
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    13,
    '系统设置',
    'set/list',
    'view/set/list.html',
    1,
    13,
    'layui-icon layui-icon-find-fill',
    '_self',
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    15,
    '前端菜单',
    'menu/list',
    '',
    3,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    3,
    1,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    20,
    '新增菜单',
    'menu/add',
    '',
    2,
    20,
    'layui-icon layui-icon-cols',
    '_self',
    9,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    21,
    '编辑菜单',
    'menu/edit',
    '',
    2,
    20,
    'layui-icon layui-icon-add-1',
    '_self',
    9,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    22,
    '删除菜单',
    'menu/del',
    '',
    2,
    21,
    'layui-icon layui-icon-delete',
    '_self',
    9,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    23,
    '查看菜单',
    'menu/one',
    '',
    3,
    20,
    'layui-icon layui-icon-slider',
    '_self',
    9,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    24,
    '编辑管理员',
    'admin/edit',
    '',
    2,
    20,
    'layui-icon layui-icon-time',
    '_self',
    11,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    25,
    '删除管理员',
    'admin/del',
    '',
    2,
    21,
    'layui-icon layui-icon-more-vertical',
    '_self',
    11,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    26,
    '编辑角色',
    'auth/edit',
    '',
    2,
    22,
    'layui-icon layui-icon-key',
    '_self',
    10,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    27,
    '删除角色',
    'auth/del',
    '',
    2,
    23,
    'layui-icon layui-icon-mute',
    '_self',
    10,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    28,
    '添加配置',
    'set/add',
    '',
    2,
    24,
    'layui-icon layui-icon-at',
    '_self',
    13,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    29,
    '删除配置',
    'set/delete',
    '',
    2,
    25,
    'layui-icon layui-icon-mute',
    '_self',
    13,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    31,
    '编辑配置',
    'set/edit',
    '',
    2,
    27,
    'layui-icon layui-icon-export',
    '_self',
    13,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    32,
    '编辑配置前',
    'set/editBefore',
    '',
    3,
    28,
    'layui-icon layui-icon-rate-half',
    '_self',
    13,
    2,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    35,
    '数据库设计器',
    'db/list',
    'view/db/list.html',
    1,
    3,
    'layui-icon layui-icon-template-1',
    '_self',
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    53,
    '首页工作台',
    'index/welcome',
    'view/index/welcome.html',
    1,
    1,
    'layui-icon layui-icon-rate-solid',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    56,
    '查看角色',
    'auth/one',
    '',
    2,
    0,
    'layui-icon layui-icon-camera',
    NULL,
    10,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    57,
    '菜单显示',
    'menu/ifshow',
    '',
    2,
    0,
    'layui-icon layui-icon-mike',
    NULL,
    9,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    58,
    '添加查看菜单',
    'auth/addTree',
    '',
    3,
    1,
    'layui-icon layui-icon-heart-fill',
    NULL,
    10,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    59,
    '添加角色',
    'auth/add',
    '',
    2,
    1,
    'layui-icon layui-icon-logout',
    NULL,
    10,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    60,
    '角色编辑前',
    'auth/beforEdit',
    '',
    3,
    0,
    'layui-icon layui-icon-email',
    NULL,
    10,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    61,
    '设置角色可用',
    'auth/enable',
    '',
    2,
    0,
    'layui-icon layui-icon-at',
    NULL,
    10,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    62,
    '管理员添加前',
    'admin/addBefore',
    '',
    3,
    0,
    '',
    NULL,
    11,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    63,
    '添加管理员',
    'admin/add',
    '',
    2,
    0,
    'layui-icon layui-icon-windows',
    NULL,
    11,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    64,
    '管理员编辑前',
    'admin/editBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-export',
    NULL,
    11,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    65,
    '管理员启用禁用',
    'admin/enable',
    '',
    2,
    0,
    'layui-icon layui-icon-slider',
    NULL,
    11,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    66,
    '操作日志',
    'logs/op',
    'view/logs/op.html',
    1,
    0,
    'layui-icon layui-icon-date',
    NULL,
    12,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    67,
    '行为日志',
    'logs/view',
    'view/logs/view.html',
    1,
    0,
    'layui-icon layui-icon-cols',
    NULL,
    12,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    68,
    '错误日志',
    'logs/err',
    'view/logs/err.html',
    1,
    0,
    'layui-icon layui-icon-survey',
    NULL,
    12,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    82,
    '表单设计器',
    'form/list',
    'view/form/list.html',
    1,
    9,
    'layui-icon layui-icon-form',
    NULL,
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    83,
    '添加表单',
    'form/add',
    'view/form/add.html',
    2,
    0,
    'layui-icon layui-icon-auz',
    NULL,
    82,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (84, '设置配置可用', 'set/enable', '', 3, 0, '', NULL, 13, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    85,
    '添加表单前',
    'form/addBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-headset',
    NULL,
    82,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    86,
    '设置配置前',
    'set/setBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-at',
    NULL,
    13,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    87,
    '设置配置',
    'set/setConf',
    '',
    3,
    0,
    'layui-icon layui-icon-404',
    NULL,
    13,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    88,
    '更新表缓存',
    'db/update',
    '',
    2,
    0,
    'layui-icon layui-icon-refresh',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    89,
    '备份数据',
    'db/backup',
    '',
    2,
    0,
    'layui-icon layui-icon-templeate-1',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    90,
    '还原数据列表',
    'db/backupFile',
    '',
    2,
    0,
    'layui-icon layui-icon-list',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    91,
    '数据还原',
    'db/reback',
    '',
    2,
    0,
    'layui-icon layui-icon-water',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    92,
    '删除备份',
    'db/delback',
    '',
    2,
    0,
    'layui-icon layui-icon-down',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    93,
    '数据库文档',
    'db/doc',
    '',
    2,
    0,
    'layui-icon layui-icon-service',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    94,
    '编辑列表内容',
    'db/editTable',
    '',
    2,
    0,
    'layui-icon layui-icon-link',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    95,
    '优化表',
    'db/optimize',
    '',
    2,
    0,
    'layui-icon layui-icon-rss',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    96,
    '修复表',
    'db/repair',
    '',
    2,
    0,
    'layui-icon layui-icon-rate-solid',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    97,
    '删除表',
    'db/delTable',
    '',
    2,
    0,
    'layui-icon layui-icon-subtraction',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    98,
    '清空表',
    'db/clear',
    '',
    2,
    0,
    'layui-icon layui-icon-unlink',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    99,
    '字段列表',
    'db/fieldList',
    '',
    2,
    0,
    'layui-icon layui-icon-star-fill',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    100,
    '展示表数据',
    'db/listData',
    '',
    2,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    101,
    '编辑数据',
    'db/editData',
    '',
    3,
    0,
    'layui-icon layui-icon-mike',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    102,
    '删除数据',
    'db/delData',
    '',
    2,
    0,
    'layui-icon layui-icon-fonts-del',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    103,
    '数据库字段列表',
    'db/fields',
    'view/db/edit.html',
    2,
    0,
    'layui-icon layui-icon-auz',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    104,
    '删除字段',
    'db/delField',
    '',
    2,
    0,
    'layui-icon layui-icon-subtraction',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    105,
    '字段排序',
    'db/sortField',
    '',
    2,
    0,
    'layui-icon layui-icon-slider',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    106,
    '更改字段名',
    'db/changeFieldName',
    '',
    2,
    0,
    'layui-icon layui-icon-find-fill',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    107,
    '设置字段',
    'db/setStatus',
    '',
    2,
    0,
    'layui-icon layui-icon-camera',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    108,
    '添加字段',
    'db/addField',
    '',
    2,
    0,
    'layui-icon layui-icon-website',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    109,
    '表索引列表',
    'db/keysList',
    '',
    2,
    0,
    'layui-icon layui-icon-wifi',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    110,
    '删除索引',
    'db/delKey',
    '',
    2,
    0,
    'layui-icon layui-icon-download-circle',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    111,
    '设置索引',
    'db/setKey',
    '',
    2,
    0,
    'layui-icon layui-icon-layer',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    112,
    '创建表',
    'db/createTable',
    '',
    2,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    113,
    '复制表',
    'db/opcopy',
    '',
    2,
    0,
    'layui-icon layui-icon-fonts-clear',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    114,
    '执行Sql',
    'db/runSql',
    '',
    2,
    0,
    'layui-icon layui-icon-light',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    115,
    '获取创建Sql',
    'db/getSql',
    '',
    2,
    0,
    'layui-icon layui-icon-service',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    116,
    '模块管理',
    'mod/list',
    'view/mod/list.html',
    1,
    2,
    'layui-icon layui-icon-slider',
    NULL,
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    117,
    '添加模块',
    'mod/add',
    '',
    2,
    0,
    'layui-icon layui-icon-read',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    118,
    '模块编辑前',
    'mod/editBefore',
    '',
    2,
    0,
    'layui-icon layui-icon-set-sm',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    119,
    '编辑模块',
    'mod/edit',
    '',
    2,
    0,
    'layui-icon layui-icon-share',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    120,
    '删除模块',
    'mod/delete',
    '',
    2,
    0,
    'layui-icon layui-icon-chat',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    121,
    '模块添加前',
    'mod/addBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-slider',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    122,
    '批量删除表',
    'db/batchRemove',
    '',
    2,
    0,
    'layui-icon layui-icon-fonts-del',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    123,
    '列表编辑字段',
    'menu/editData',
    '',
    2,
    0,
    'layui-icon layui-icon-key',
    NULL,
    9,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    124,
    '全局常量管理',
    'mod/params',
    '',
    2,
    0,
    'layui-icon layui-icon-dollar',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    125,
    '常量编辑前',
    'mod/paramsBefore',
    '',
    2,
    0,
    'layui-icon layui-icon-at',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    126,
    '添加全局常量',
    'mod/paramsAdd',
    '',
    2,
    0,
    'layui-icon layui-icon-addition',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    127,
    '编辑全局常量',
    'mod/paramsEdit',
    '',
    2,
    0,
    'layui-icon layui-icon-print',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    128,
    '删除全局常量',
    'mod/paramDelete',
    '',
    2,
    0,
    'layui-icon layui-icon-subtraction',
    NULL,
    116,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    130,
    '添加数据',
    'db/addData',
    'views/db/data-add.html',
    2,
    0,
    'layui-icon layui-icon-mike',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    131,
    '数据库列表',
    'db/confList',
    '',
    2,
    0,
    'layui-icon layui-icon-wifi',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    132,
    '添加数据库',
    'db/confAdd',
    '',
    2,
    0,
    'layui-icon layui-icon-email',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    133,
    '编辑数据库',
    'db/confEdit',
    '',
    2,
    0,
    'layui-icon layui-icon-rss',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    134,
    '测试数据库连接',
    'db/confTest',
    '',
    2,
    0,
    'layui-icon layui-icon-logout',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    135,
    '删除数据库',
    'db/confDel',
    '',
    2,
    0,
    'layui-icon layui-icon-subtraction',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    136,
    '更换数据库',
    'db/confChange',
    '',
    2,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    137,
    '编辑数据库前',
    'db/confEditBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-snowflake',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    138,
    '保护列表',
    'db/safeList',
    '',
    2,
    0,
    'layui-icon layui-icon-camera',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    139,
    '添加保护',
    'db/safeAdd',
    '',
    2,
    0,
    'layui-icon layui-icon-addition',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    140,
    '删除保护',
    'db/safeDel',
    '',
    2,
    0,
    'layui-icon layui-icon-subtraction',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    141,
    '添加数据库',
    'db/creatDatabase',
    '',
    2,
    0,
    'layui-icon layui-icon-align-left',
    NULL,
    35,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    142,
    '上传文件',
    'upload/index',
    '',
    3,
    0,
    'layui-icon layui-icon-upload-drag',
    NULL,
    3,
    1,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    143,
    '注销登录',
    'admin/loginOut',
    '',
    2,
    0,
    'layui-icon layui-icon-delete',
    NULL,
    3,
    1,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    144,
    '计划任务',
    'crons/list',
    'view/crons/list.html',
    1,
    9,
    'layui-icon layui-icon-android',
    NULL,
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    145,
    '计划任务添加',
    'crons/add',
    'view/crons/edit.html',
    3,
    0,
    '',
    NULL,
    144,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    146,
    '计划任务编辑',
    'crons/edit',
    'view/crons/edit.html',
    3,
    0,
    '',
    NULL,
    144,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (147, '计划任务删除', 'crons/del', '', 3, 0, '', NULL, 144, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    148,
    '计划任务编辑前',
    'crons/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    144,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    149,
    '演示文稿',
    'ppt/list',
    'view/ppt/list.html',
    1,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    150,
    '演示文稿添加',
    'ppt/add',
    'view/ppt/edit.html',
    3,
    0,
    '',
    NULL,
    149,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    151,
    '演示文稿编辑',
    'ppt/edit',
    'view/ppt/edit.html',
    3,
    0,
    '',
    NULL,
    149,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (152, '演示文稿删除', 'ppt/del', '', 3, 0, '', NULL, 149, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    153,
    '演示文稿编辑前',
    'ppt/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    149,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    154,
    '思维导图',
    'mind/list',
    'view/mind/list.html',
    1,
    0,
    'layui-icon layui-icon-auz',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    155,
    '思维导图添加',
    'mind/add',
    'view/mind/edit.html',
    3,
    0,
    '',
    NULL,
    154,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    156,
    '思维导图编辑',
    'mind/edit',
    'view/mind/edit.html',
    3,
    0,
    '',
    NULL,
    154,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (157, '思维导图删除', 'mind/del', '', 3, 0, '', NULL, 154, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    158,
    '思维导图编辑前',
    'mind/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    154,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    159,
    'excel管理',
    'excel/list',
    'view/excel/list.html',
    1,
    0,
    'layui-icon layui-icon-tabs',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    160,
    'excel管理添加',
    'excel/add',
    'view/excel/edit.html',
    3,
    0,
    '',
    NULL,
    159,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    161,
    'excel管理编辑',
    'excel/edit',
    'view/excel/edit.html',
    3,
    0,
    '',
    NULL,
    159,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    162,
    'excel管理删除',
    'excel/del',
    '',
    3,
    0,
    '',
    NULL,
    159,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    163,
    'excel管理编辑前',
    'excel/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    159,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    164,
    '导入EXCEL',
    'excel/upload',
    '',
    2,
    0,
    'layui-icon layui-icon-fonts-code',
    NULL,
    159,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    165,
    '流程图',
    'flow/list',
    'view/flow/list.html',
    1,
    0,
    'layui-icon layui-icon-spread-left',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    166,
    '流程图添加',
    'flow/add',
    'view/flow/edit.html',
    3,
    0,
    '',
    NULL,
    165,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    167,
    '流程图编辑',
    'flow/edit',
    'view/flow/edit.html',
    3,
    0,
    '',
    NULL,
    165,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (168, '流程图删除', 'flow/del', '', 3, 0, '', NULL, 165, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    169,
    '流程图编辑前',
    'flow/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    165,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    170,
    '文档管理',
    'doc/list',
    'view/doc/list.html',
    1,
    0,
    'layui-icon layui-icon-email',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    171,
    '文档管理添加',
    'doc/add',
    'view/doc/edit.html',
    3,
    0,
    '',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    172,
    '文档管理编辑',
    'doc/edit',
    'view/doc/edit.html',
    3,
    0,
    '',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (173, '文档管理删除', 'doc/del', '', 3, 0, '', NULL, 170, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    174,
    '文档管理编辑前',
    'doc/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    175,
    '文档添加前',
    'doc/addBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-at',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    176,
    '上传文件',
    'doc/upload',
    '',
    3,
    0,
    'layui-icon layui-icon-addition',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    177,
    '新增文档',
    'doc/addmd',
    '',
    2,
    0,
    'layui-icon layui-icon-praise',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    178,
    '文档列表',
    'doc/listmd',
    '',
    3,
    0,
    'layui-icon layui-icon-link',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    179,
    '编辑文档前',
    'doc/editmdBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-read',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    180,
    '编辑文档',
    'doc/editmd',
    '',
    3,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    181,
    '删除文档',
    'doc/delmd',
    '',
    3,
    0,
    'layui-icon layui-icon-logout',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    182,
    '编辑文档列表',
    'doc/editData',
    '',
    3,
    0,
    'layui-icon layui-icon-email',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    183,
    '回写数据',
    'doc/back',
    '',
    3,
    0,
    'layui-icon layui-icon-windows',
    NULL,
    170,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    184,
    '接口设计',
    'api/list',
    'view/api/list.html',
    1,
    0,
    'layui-icon layui-icon-website',
    NULL,
    2,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    185,
    '接口设计添加',
    'api/add',
    'view/api/edit.html',
    3,
    0,
    '',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    186,
    '接口设计编辑',
    'api/edit',
    'view/api/edit.html',
    3,
    0,
    '',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (187, '接口设计删除', 'api/del', '', 3, 0, '', NULL, 184, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    188,
    '接口设计编辑前',
    'api/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    189,
    '接口添加前',
    'api/addBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-key',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    190,
    '文章管理',
    'art',
    '',
    1,
    0,
    'layui-icon layui-icon-slider',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    194,
    '文章列表',
    'art/list',
    '',
    3,
    0,
    'layui-icon layui-icon-username',
    NULL,
    190,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    195,
    '添加文章',
    'art/add',
    '',
    3,
    0,
    'layui-icon layui-icon-username',
    NULL,
    190,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    196,
    '编辑文章',
    'art/edit',
    '',
    3,
    0,
    'layui-icon layui-icon-username',
    NULL,
    190,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    197,
    '接口参数列表',
    'apiparams/list',
    '',
    2,
    0,
    'layui-icon layui-icon-key',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    198,
    '从数据库添加参数',
    'apiparams/addFromDb',
    '',
    2,
    0,
    'layui-icon layui-icon-logout',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    199,
    '编辑参数列表名字',
    'apiparams/editData',
    '',
    3,
    0,
    'layui-icon layui-icon-transfer',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    200,
    '删除接口参数',
    'apiparams/del',
    '',
    3,
    0,
    'layui-icon layui-icon-subtraction',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    201,
    '接口参数编辑前',
    'apiparams/editBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-rate',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    202,
    '添加接口参数',
    'apiparams/add',
    '',
    3,
    0,
    'layui-icon layui-icon-service',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    203,
    '编辑接口参数',
    'apiparams/edit',
    '',
    3,
    0,
    'layui-icon layui-icon-camera',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    204,
    '更新接口代码',
    'api/addLogic',
    '',
    3,
    0,
    'layui-icon layui-icon-android',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    205,
    '获取接口代码',
    'api/getLogic',
    '',
    3,
    0,
    'layui-icon layui-icon-share',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    206,
    '程序设计器',
    'code/list',
    'view/code/list.html',
    1,
    0,
    'layui-icon layui-icon-template',
    NULL,
    1,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    207,
    '程序设计器添加',
    'code/add',
    'view/code/edit.html',
    3,
    0,
    '',
    NULL,
    206,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    208,
    '程序设计器编辑',
    'code/edit',
    'view/code/edit.html',
    3,
    0,
    '',
    NULL,
    206,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (209, '程序设计器删除', 'code/del', '', 3, 0, '', NULL, 206, 1, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    210,
    '程序设计器编辑前',
    'code/editBefore',
    '',
    3,
    0,
    '',
    NULL,
    206,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    211,
    '设计程序',
    'code/editCode',
    '',
    3,
    0,
    'layui-icon layui-icon-spread-left',
    NULL,
    206,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    212,
    '参数分页新增',
    'apiparams/addPage',
    '',
    3,
    0,
    'layui-icon layui-icon-wifi',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    213,
    '接口测试列表',
    'apitest/list',
    '',
    2,
    0,
    'layui-icon layui-icon-read',
    NULL,
    184,
    1,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `title`,
    `route`,
    `href`,
    `type`,
    `order_num`,
    `icon`,
    `open_type`,
    `pid`,
    `lid`,
    `ifshow`
  )
VALUES
  (
    214,
    '接口测试添加前',
    'apitest/addBefore',
    '',
    3,
    0,
    'layui-icon layui-icon-email',
    NULL,
    184,
    1,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_mind
# ------------------------------------------------------------

INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    1,
    0,
    0,
    0,
    '根节点',
    '{\"root\":{\"data\":{\"text\":\"根节点\",\"expand\":true,\"isActive\":true},\"children\":[{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"222\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    2,
    0,
    0,
    0,
    '根节点5',
    '{\"root\":{\"data\":{\"text\":\"根节点5\",\"expand\":true,\"isActive\":false},\"children\":[{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    3,
    0,
    0,
    0,
    '根节点',
    '{\"root\":{\"data\":{\"text\":\"根节点\",\"expand\":true,\"isActive\":true},\"children\":[{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    5,
    0,
    1638234727,
    0,
    '222',
    '{\"root\":{\"data\":{\"text\":\"222\",\"expand\":true,\"isActive\":true},\"children\":[{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    6,
    1638234768,
    1638234787,
    1,
    '根节点',
    '{\"root\":{\"data\":{\"text\":\"根节点\",\"expand\":true,\"isActive\":true},\"children\":[{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    7,
    1638235857,
    1638235900,
    1,
    '5555555',
    '{\"root\":{\"data\":{\"text\":\"5555555\",\"expand\":true,\"isActive\":false},\"children\":[{\"data\":{\"text\":\"555\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"666\",\"expand\":true,\"isActive\":false},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    8,
    1638244959,
    1638245283,
    1,
    '222',
    '{\"root\":{\"data\":{\"text\":\"222\",\"expand\":true,\"isActive\":true},\"children\":[{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]},{\"data\":{\"text\":\"分支主题\",\"expand\":true,\"isActive\":false},\"children\":[]}]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\",\"view\":{\"transform\":{\"scaleX\":1,\"scaleY\":1,\"shear\":0,\"rotate\":0,\"translateX\":0,\"translateY\":0,\"originX\":0,\"originY\":0,\"a\":1,\"b\":0,\"c\":0,\"d\":1,\"e\":0,\"f\":0},\"state\":{\"scale\":1,\"x\":0,\"y\":0,\"sx\":0,\"sy\":0}}}'
  );
INSERT INTO
  `rt_mind` (
    `id`,
    `add_time`,
    `update_time`,
    `user_id`,
    `title`,
    `content`
  )
VALUES
  (
    9,
    1638421414,
    1638421981,
    1,
    '根节点',
    '{\"root\":{\"data\":{\"text\":\"根节点\",\"expand\":true,\"isActive\":false},\"children\":[]},\"theme\":{\"template\":\"classic\",\"config\":{}},\"layout\":\"mindMap\"}'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_mod
# ------------------------------------------------------------

INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    38,
    '计划任务',
    'crons',
    'server',
    'rt_crons',
    '',
    5,
    '',
    '{\"topAuthId\":\"2\",\"topAuthIcon\":\"layui-icon-vercode\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    39,
    '演示文稿',
    'ppt',
    'server',
    'rt_ppt',
    '',
    5,
    '',
    '{\"topAuthId\":\"1\",\"topAuthIcon\":\"layui-icon-snowflake\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    40,
    '思维导图',
    'mind',
    'server',
    'rt_mind',
    '',
    5,
    '',
    '{\"topAuthId\":\"1\",\"topAuthIcon\":\"layui-icon layui-icon-auz\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    41,
    'excel管理',
    'excel',
    'server',
    'rt_excel',
    '',
    5,
    '',
    '{\"topAuthId\":\"1\",\"topAuthIcon\":\"layui-icon layui-icon-tabs\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    42,
    '流程图',
    'flow',
    'server',
    'rt_flow',
    '',
    5,
    '',
    '{\"topAuthId\":\"1\",\"topAuthIcon\":\"layui-icon layui-icon-spread-left\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    43,
    '文档管理',
    'doc',
    'server',
    'rt_doc',
    '',
    5,
    '',
    '{\"topAuthId\":\"1\",\"topAuthIcon\":\"layui-icon layui-icon-email\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    45,
    '接口设计',
    'api',
    'server',
    'rt_api',
    'rt_mod',
    5,
    '',
    '{\"topAuthId\":\"2\",\"topAuthIcon\":\"layui-icon layui-icon-website\"}',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    46,
    '文章',
    'art',
    'server',
    'rt_article',
    'rt_cate,rt_category',
    1,
    '',
    '',
    ''
  );
INSERT INTO
  `rt_mod` (
    `id`,
    `name`,
    `key`,
    `server_path`,
    `tables_main`,
    `tables_more`,
    `type`,
    `params`,
    `extra`,
    `remark`
  )
VALUES
  (
    47,
    '程序设计器',
    'code',
    'server',
    'rt_code',
    '',
    5,
    '',
    '{\"topAuthId\":\"1\",\"topAuthIcon\":\"layui-icon layui-icon-template\"}',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_params
# ------------------------------------------------------------

INSERT INTO
  `rt_params` (`id`, `name`, `key`, `content`, `type`)
VALUES
  (1, '路径', 'path', 'path', 1);
INSERT INTO
  `rt_params` (`id`, `name`, `key`, `content`, `type`)
VALUES
  (2, '文件操作', 'fs', 'fs', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_ppt
# ------------------------------------------------------------

INSERT INTO
  `rt_ppt` (
    `id`,
    `title`,
    `content`,
    `add_time`,
    `update_time`,
    `user_id`
  )
VALUES
  (
    1,
    'test',
    '[{\"id\":\"test123456\",\"elements\":[{\"type\":\"shape\",\"id\":\"4cbRxp\",\"left\":0,\"top\":200,\"width\":546,\"height\":362.5,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"opacity\":0.7,\"rotate\":0},{\"type\":\"shape\",\"id\":\"ookHrf\",\"left\":0,\"top\":0,\"width\":300,\"height\":320,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"flipV\":true,\"rotate\":0},{\"type\":\"text\",\"id\":\"idn7Mx\",\"left\":355,\"top\":65.25,\"width\":585,\"height\":125.60000610351562,\"lineHeight\":1.2,\"content\":\"<p><strong><span style=\'font-size:  88px\'>PPT</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"text\",\"id\":\"7stmVP\",\"left\":355,\"top\":253.25,\"width\":585,\"height\":56,\"content\":\"<p><span style=\'font-size:  24px\'>在线演示文稿</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"line\",\"id\":\"FnpZs4\",\"left\":361,\"top\":238,\"start\":[0,0],\"end\":[549,0],\"points\":[\"\",\"\"],\"color\":\"#5b9bd5\",\"style\":\"solid\",\"width\":2}],\"background\":{\"type\":\"solid\",\"color\":\"#ffffff\"}}]',
    0,
    0,
    0
  );
INSERT INTO
  `rt_ppt` (
    `id`,
    `title`,
    `content`,
    `add_time`,
    `update_time`,
    `user_id`
  )
VALUES
  (
    2,
    '演示文稿55561',
    '[{\"id\":\"test123456\",\"elements\":[{\"type\":\"shape\",\"id\":\"4cbRxp\",\"left\":0,\"top\":200,\"width\":546,\"height\":362.5,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"opacity\":0.7,\"rotate\":0},{\"type\":\"shape\",\"id\":\"ookHrf\",\"left\":0,\"top\":0,\"width\":300,\"height\":320,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"flipV\":true,\"rotate\":0},{\"type\":\"text\",\"id\":\"idn7Mx\",\"left\":355,\"top\":65.25,\"width\":585,\"height\":125.60000610351562,\"lineHeight\":1.2,\"content\":\"<p style=\\\"\\\"><strong><span style=\\\"font-size: 88px\\\">PPT888</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"text\",\"id\":\"7stmVP\",\"left\":355,\"top\":253.25,\"width\":585,\"height\":56,\"content\":\"<p><span style=\'font-size:  24px\'>在线演示文稿</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"line\",\"id\":\"FnpZs4\",\"left\":361,\"top\":238,\"start\":[0,0],\"end\":[549,0],\"points\":[\"\",\"\"],\"color\":\"#5b9bd5\",\"style\":\"solid\",\"width\":2}],\"background\":{\"type\":\"solid\",\"color\":\"#ffffff\"}},{\"id\":\"eK1bwZPo\",\"elements\":[{\"type\":\"shape\",\"id\":\"cS7Jw3\",\"left\":0,\"top\":200,\"width\":546,\"height\":362.5,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"opacity\":0.7,\"rotate\":0},{\"type\":\"shape\",\"id\":\"lYdAQH\",\"left\":0,\"top\":0,\"width\":300,\"height\":320,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"flipV\":true,\"rotate\":0},{\"type\":\"text\",\"id\":\"VybPF7\",\"left\":355,\"top\":95.11111111111111,\"width\":585,\"height\":116,\"lineHeight\":1.2,\"content\":\"<p style=\'\'><strong><span style=\'font-size: 80px\'>输入标题</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"wordSpace\":6},{\"type\":\"text\",\"id\":\"ReiqQH\",\"left\":355,\"top\":253.25,\"width\":585,\"height\":56,\"content\":\"<p><span style=\'font-size:  24px\'>请在此处输入副标题</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"line\",\"id\":\"bGz8zU\",\"left\":361,\"top\":238,\"start\":[0,0],\"end\":[549,0],\"points\":[\"\",\"\"],\"color\":\"#5b9bd5\",\"style\":\"solid\",\"width\":2}],\"background\":{\"type\":\"solid\",\"color\":\"#fff\"}},{\"id\":\"5xGOtYOf\",\"elements\":[{\"type\":\"shape\",\"id\":\"3xK55K\",\"left\":183.5185185185185,\"top\":175.5092592592593,\"width\":605.1851851851851,\"height\":185.18518518518516,\"viewBox\":200,\"path\":\"M 0 0 L 200 0 L 200 200 L 0 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"rotate\":0},{\"type\":\"shape\",\"id\":\"cGM7Xu\",\"left\":211.29629629629628,\"top\":201.80555555555557,\"width\":605.1851851851851,\"height\":185.18518518518516,\"viewBox\":200,\"path\":\"M 0 0 L 200 0 L 200 200 L 0 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"rotate\":0,\"opacity\":0.7},{\"type\":\"text\",\"id\":\"QZYVcG\",\"left\":304.9074074074074,\"top\":198.10185185185182,\"width\":417.9629629629629,\"height\":140,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 80px\'>感谢观看</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"wordSpace\":5}],\"background\":{\"type\":\"solid\",\"color\":\"#fff\"}}]',
    1638156886,
    1638165071,
    1
  );
INSERT INTO
  `rt_ppt` (
    `id`,
    `title`,
    `content`,
    `add_time`,
    `update_time`,
    `user_id`
  )
VALUES
  (
    3,
    '演示文稿',
    '[{\"id\":\"ppt1638164498162\",\"elements\":[{\"type\":\"shape\",\"id\":\"4cbRxp\",\"left\":0,\"top\":200,\"width\":546,\"height\":362.5,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"opacity\":0.7,\"rotate\":0},{\"type\":\"shape\",\"id\":\"ookHrf\",\"left\":0,\"top\":0,\"width\":300,\"height\":320,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"flipV\":true,\"rotate\":0},{\"type\":\"text\",\"id\":\"idn7Mx\",\"left\":355,\"top\":65.25,\"width\":585,\"height\":125.60000610351562,\"lineHeight\":1.2,\"content\":\"<p><strong><span style=\'font-size:  88px\'>PPT</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"text\",\"id\":\"7stmVP\",\"left\":355,\"top\":253.25,\"width\":585,\"height\":56,\"content\":\"<p><span style=\'font-size:  24px\'>在线演示文稿</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"line\",\"id\":\"FnpZs4\",\"left\":361,\"top\":238,\"start\":[0,0],\"end\":[549,0],\"points\":[\"\",\"\"],\"color\":\"#5b9bd5\",\"style\":\"solid\",\"width\":2}],\"background\":{\"type\":\"solid\",\"color\":\"#ffffff\"}},{\"id\":\"7YXpcWVz\",\"elements\":[{\"type\":\"shape\",\"id\":\"hVDdjx\",\"left\":183.5185185185185,\"top\":175.5092592592593,\"width\":605.1851851851851,\"height\":185.18518518518516,\"viewBox\":200,\"path\":\"M 0 0 L 200 0 L 200 200 L 0 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"rotate\":0},{\"type\":\"shape\",\"id\":\"8f5TT9\",\"left\":211.29629629629628,\"top\":201.80555555555557,\"width\":605.1851851851851,\"height\":185.18518518518516,\"viewBox\":200,\"path\":\"M 0 0 L 200 0 L 200 200 L 0 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"rotate\":0,\"opacity\":0.7},{\"type\":\"text\",\"id\":\"f8LjH9\",\"left\":304.9074074074074,\"top\":198.10185185185182,\"width\":417.9629629629629,\"height\":140,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 80px\'>感谢观看</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"wordSpace\":5}],\"background\":{\"type\":\"solid\",\"color\":\"#fff\"}},{\"id\":\"rzT06u7Z\",\"elements\":[{\"type\":\"shape\",\"id\":\"UhiLsI\",\"left\":0,\"top\":0,\"width\":352.59259259259255,\"height\":562.5,\"viewBox\":200,\"path\":\"M 0 0 L 200 0 L 200 200 L 0 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"rotate\":0},{\"type\":\"shape\",\"id\":\"KvWdrM\",\"left\":171.4814814814814,\"top\":100.13888888888887,\"width\":362.22222222222223,\"height\":362.22222222222223,\"viewBox\":200,\"path\":\"M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z\",\"fill\":\"rgba(255,255,255,0)\",\"fixedRatio\":false,\"rotate\":0,\"outline\":{\"width\":10,\"color\":\"#fff\",\"style\":\"solid\"}},{\"type\":\"shape\",\"id\":\"e0oWwX\",\"left\":216.66666666666663,\"top\":145.32407407407408,\"width\":271.85185185185185,\"height\":271.85185185185185,\"viewBox\":200,\"path\":\"M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z\",\"fill\":\"#fff\",\"fixedRatio\":false,\"rotate\":0,\"text\":{\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 80px\'>01</span></p>\",\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"align\":\"middle\"}},{\"type\":\"text\",\"id\":\"irBKaU\",\"left\":561.4814814814814,\"top\":100.1388888888889,\"width\":359.25925925925924,\"height\":80,\"content\":\"<p style=\'\'><strong><span style=\'font-size: 40px\'>在此处输入标题</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"text\",\"id\":\"ziVDOP\",\"left\":572.5925925925925,\"top\":202.3611111111111,\"width\":257.77777777777777,\"height\":260,\"content\":\"<ol><li><p style=\'\'>在此处输入内容</p></li><li><p style=\'\'>在此处输入内容</p></li><li><p style=\'\'>在此处输入内容</p></li><li><p style=\'\'>在此处输入内容</p></li><li><p style=\'\'>在此处输入内容</p></li><li><p style=\'\'>在此处输入内容</p></li></ol>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"lineHeight\":2,\"fill\":\"rgba(230, 230, 230, 0.5)\"}],\"background\":{\"type\":\"solid\",\"color\":\"#fff\"}},{\"id\":\"k9Dtbb1P\",\"elements\":[{\"type\":\"text\",\"id\":\"QqtWeI\",\"left\":69.35185185185179,\"top\":51.71759259259262,\"width\":420,\"height\":58.399993896484375,\"lineHeight\":1.2,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 32px\'>1.请输入标题</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"#5b9bd5\"},{\"type\":\"text\",\"id\":\"uOVyAa\",\"left\":69.35185185185179,\"top\":131.78240740740745,\"width\":420,\"height\":129,\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"rgba(230, 230, 230, 0.5)\"},{\"type\":\"text\",\"id\":\"TOa7q9\",\"left\":510.6481481481481,\"top\":51.71759259259262,\"width\":420,\"height\":58.399993896484375,\"lineHeight\":1.2,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 32px\'>2.请输入标题</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"#5b9bd5\"},{\"type\":\"text\",\"id\":\"Mx8TCT\",\"left\":510.6481481481481,\"top\":131.78240740740745,\"width\":420,\"height\":129,\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"rgba(230, 230, 230, 0.5)\"},{\"type\":\"text\",\"id\":\"KgeI14\",\"left\":69.35185185185185,\"top\":301.71759259259255,\"width\":420,\"height\":58.399993896484375,\"lineHeight\":1.2,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 32px\'>3.请输入标题</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"#5b9bd5\"},{\"type\":\"text\",\"id\":\"vO_dQ3\",\"left\":69.35185185185185,\"top\":381.7824074074074,\"width\":420,\"height\":129,\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"rgba(230, 230, 230, 0.5)\"},{\"type\":\"text\",\"id\":\"TFPlHT\",\"left\":510.64814814814815,\"top\":301.71759259259255,\"width\":420,\"height\":58.399993896484375,\"lineHeight\":1.2,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 32px\'>4.请输入标题</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"#5b9bd5\"},{\"type\":\"text\",\"id\":\"2z8ubO\",\"left\":510.64814814814815,\"top\":381.7824074074074,\"width\":420,\"height\":129,\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 22px\'>在此处输入内容</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"rgba(230, 230, 230, 0.5)\"}],\"background\":{\"type\":\"solid\",\"color\":\"#fff\"}}]',
    1638164516,
    1638164516,
    1
  );
INSERT INTO
  `rt_ppt` (
    `id`,
    `title`,
    `content`,
    `add_time`,
    `update_time`,
    `user_id`
  )
VALUES
  (
    4,
    '演示文稿',
    '[{\"id\":\"ppt1638164842115\",\"elements\":[{\"type\":\"shape\",\"id\":\"4cbRxp\",\"left\":0,\"top\":200,\"width\":546,\"height\":362.5,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"opacity\":0.7,\"rotate\":0},{\"type\":\"shape\",\"id\":\"ookHrf\",\"left\":0,\"top\":0,\"width\":300,\"height\":320,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"flipV\":true,\"rotate\":0},{\"type\":\"text\",\"id\":\"idn7Mx\",\"left\":355,\"top\":65.25,\"width\":585,\"height\":125.60000610351562,\"lineHeight\":1.2,\"content\":\"<p><strong><span style=\'font-size:  88px\'>PPT</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"text\",\"id\":\"7stmVP\",\"left\":355,\"top\":253.25,\"width\":585,\"height\":56,\"content\":\"<p><span style=\'font-size:  24px\'>在线演示文稿</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"line\",\"id\":\"FnpZs4\",\"left\":361,\"top\":238,\"start\":[0,0],\"end\":[549,0],\"points\":[\"\",\"\"],\"color\":\"#5b9bd5\",\"style\":\"solid\",\"width\":2}],\"background\":{\"type\":\"solid\",\"color\":\"#ffffff\"}}]',
    1638164847,
    1638164847,
    1
  );
INSERT INTO
  `rt_ppt` (
    `id`,
    `title`,
    `content`,
    `add_time`,
    `update_time`,
    `user_id`
  )
VALUES
  (
    5,
    '演示文稿1666',
    '[{\"id\":\"ppt1638164996737\",\"elements\":[{\"type\":\"shape\",\"id\":\"4cbRxp\",\"left\":0,\"top\":200,\"width\":546,\"height\":362.5,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"opacity\":0.7,\"rotate\":0},{\"type\":\"shape\",\"id\":\"ookHrf\",\"left\":0,\"top\":0,\"width\":300,\"height\":320,\"viewBox\":200,\"path\":\"M 0 0 L 0 200 L 200 200 Z\",\"fill\":\"#5b9bd5\",\"fixedRatio\":false,\"flipV\":true,\"rotate\":0},{\"type\":\"text\",\"id\":\"idn7Mx\",\"left\":355,\"top\":65.25,\"width\":585,\"height\":125.60000610351562,\"lineHeight\":1.2,\"content\":\"<p><strong><span style=\'font-size:  88px\'>PPT</span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"text\",\"id\":\"7stmVP\",\"left\":355,\"top\":253.25,\"width\":585,\"height\":56,\"content\":\"<p><span style=\'font-size:  24px\'>在线演示文稿</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\"},{\"type\":\"line\",\"id\":\"FnpZs4\",\"left\":361,\"top\":238,\"start\":[0,0],\"end\":[549,0],\"points\":[\"\",\"\"],\"color\":\"#5b9bd5\",\"style\":\"solid\",\"width\":2}],\"background\":{\"type\":\"solid\",\"color\":\"#ffffff\"}},{\"id\":\"4cN5uZHp\",\"elements\":[{\"type\":\"text\",\"id\":\"hTLl7P\",\"left\":69.35185185185185,\"top\":49.21759259259262,\"width\":420,\"height\":63.19999694824219,\"lineHeight\":1.2,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 36px\'>1.请输入标题</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"#5b9bd5\"},{\"type\":\"text\",\"id\":\"v30RcB\",\"left\":69.35185185185185,\"top\":129.28240740740745,\"width\":420,\"height\":384,\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"rgba(230, 230, 230, 0.5)\"},{\"type\":\"text\",\"id\":\"b5Jv4B\",\"left\":510.64814814814815,\"top\":49.21759259259262,\"width\":420,\"height\":63.19999694824219,\"lineHeight\":1.2,\"content\":\"<p style=\'text-align: center;\'><strong><span style=\'color: #ffffff;\'><span style=\'font-size: 36px\'>2.请输入标题</span></span></strong></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"#5b9bd5\"},{\"type\":\"text\",\"id\":\"xbe4To\",\"left\":510.64814814814815,\"top\":129.28240740740745,\"width\":420,\"height\":384,\"content\":\"<p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p><p style=\'text-align: center;\'><span style=\'font-size: 24px\'>在此处输入内容</span></p>\",\"rotate\":0,\"defaultFontName\":\"Microsoft Yahei\",\"defaultColor\":\"#333\",\"fill\":\"rgba(230, 230, 230, 0.5)\"}],\"background\":{\"type\":\"solid\",\"color\":\"#fff\"}}]',
    1638165006,
    1638165060,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_set
# ------------------------------------------------------------

INSERT INTO
  `rt_set` (
    `id`,
    `key`,
    `name`,
    `val`,
    `enable`,
    `remark`,
    `form_id`,
    `form_path`,
    `params`
  )
VALUES
  (
    9,
    'mysql',
    'mysql',
    '{\"host\":\"11111\",\"port\":\"3306\",\"input_2\":\"111\",\"textarea_1\":\"  5555\",\"conftype\":\"mysql\"}',
    1,
    NULL,
    9,
    '/admin/view/set/config/mysql.html',
    NULL
  );
INSERT INTO
  `rt_set` (
    `id`,
    `key`,
    `name`,
    `val`,
    `enable`,
    `remark`,
    `form_id`,
    `form_path`,
    `params`
  )
VALUES
  (
    10,
    'redis',
    'redis',
    NULL,
    1,
    NULL,
    11,
    '/admin/view/set/config/redis.html',
    NULL
  );
INSERT INTO
  `rt_set` (
    `id`,
    `key`,
    `name`,
    `val`,
    `enable`,
    `remark`,
    `form_id`,
    `form_path`,
    `params`
  )
VALUES
  (11, 'test', 'test', NULL, 1, NULL, 0, NULL, NULL);
INSERT INTO
  `rt_set` (
    `id`,
    `key`,
    `name`,
    `val`,
    `enable`,
    `remark`,
    `form_id`,
    `form_path`,
    `params`
  )
VALUES
  (
    12,
    'dd',
    'dd',
    NULL,
    0,
    '5555',
    0,
    '/admin/view/set/config/test.html',
    NULL
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*
 Navicat Premium Data Transfer

 Source Server         : mysql57
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : localhost:8889
 Source Schema         : gdcms

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 22/04/2022 18:25:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rt_admin
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表';

-- ----------------------------
-- Table structure for rt_admin_auth
-- ----------------------------
DROP TABLE IF EXISTS `rt_admin_auth`;
CREATE TABLE `rt_admin_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理权限表';

-- ----------------------------
-- Table structure for rt_admin_loginlog
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理登录日志表';

-- ----------------------------
-- Table structure for rt_admin_map
-- ----------------------------
DROP TABLE IF EXISTS `rt_admin_map`;
CREATE TABLE `rt_admin_map` (
  `map_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) unsigned NOT NULL,
  `auth_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0角色1集团2公司3门店4部门5区域',
  PRIMARY KEY (`map_id`),
  UNIQUE KEY `admin_id` (`admin_id`,`auth_id`,`type`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员权限映射表';

-- ----------------------------
-- Table structure for rt_admin_oplog
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=607 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理操作日志';

-- ----------------------------
-- Table structure for rt_admin_viewlog
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=557 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员查看日志';

-- ----------------------------
-- Table structure for rt_adminlog
-- ----------------------------
DROP TABLE IF EXISTS `rt_adminlog`;
CREATE TABLE `rt_adminlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `admin_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `data` text CHARACTER SET utf8 COMMENT '返回记录',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '日志类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理操作日志';

-- ----------------------------
-- Table structure for rt_api
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口主表';

-- ----------------------------
-- Table structure for rt_api_form
-- ----------------------------
DROP TABLE IF EXISTS `rt_api_form`;
CREATE TABLE `rt_api_form` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口表单表';

-- ----------------------------
-- Table structure for rt_api_logic
-- ----------------------------
DROP TABLE IF EXISTS `rt_api_logic`;
CREATE TABLE `rt_api_logic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `code` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '代码',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口逻辑表';

-- ----------------------------
-- Table structure for rt_api_params
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口参数表';

-- ----------------------------
-- Table structure for rt_api_table
-- ----------------------------
DROP TABLE IF EXISTS `rt_api_table`;
CREATE TABLE `rt_api_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口表格表';

-- ----------------------------
-- Table structure for rt_api_test
-- ----------------------------
DROP TABLE IF EXISTS `rt_api_test`;
CREATE TABLE `rt_api_test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用例名称',
  `aid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '接口id',
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '数据内容',
  `method` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'GET' COMMENT '类型',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口测试表';

-- ----------------------------
-- Table structure for rt_area
-- ----------------------------
DROP TABLE IF EXISTS `rt_area`;
CREATE TABLE `rt_area` (
  `id` int(10) NOT NULL COMMENT '区号',
  `name` varchar(40) CHARACTER SET utf8 DEFAULT NULL COMMENT '地区名称',
  `pid` int(11) DEFAULT NULL COMMENT '上级id',
  `status` tinyint(2) unsigned DEFAULT '1' COMMENT '状态1为可用0为不可用',
  `order_num` int(10) unsigned DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='地区表';

-- ----------------------------
-- Table structure for rt_article
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章';

-- ----------------------------
-- Table structure for rt_baiban
-- ----------------------------
DROP TABLE IF EXISTS `rt_baiban`;
CREATE TABLE `rt_baiban` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='白板表';

-- ----------------------------
-- Table structure for rt_cate
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统分类表';

-- ----------------------------
-- Table structure for rt_category
-- ----------------------------
DROP TABLE IF EXISTS `rt_category`;
CREATE TABLE `rt_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '分类名称',
  `status` tinyint(2) DEFAULT '0' COMMENT '是否使用，预留',
  `ctype` tinyint(3) DEFAULT '1' COMMENT '分类类型 1新闻2账户类型3账户日志来源',
  `desc` text CHARACTER SET utf8 COMMENT '其他附加配置',
  `flag` int(10) NOT NULL DEFAULT '0' COMMENT '分类标志，同一分类不能重复',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章分类';

-- ----------------------------
-- Table structure for rt_chat_friend_log
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_friend_log`;
CREATE TABLE `rt_chat_friend_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(10) NOT NULL COMMENT '发送者',
  `to_id` int(10) NOT NULL COMMENT '接收者',
  `content` text CHARACTER SET utf8mb4 NOT NULL COMMENT '聊天内容',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1未读 2已读 3撤回',
  `add_time` int(10) NOT NULL COMMENT '添加时间',
  `update_time` int(10) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='好友聊天日志';

-- ----------------------------
-- Table structure for rt_chat_friends
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_friends`;
CREATE TABLE `rt_chat_friends` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `friend_id` int(10) unsigned NOT NULL COMMENT '好友ID',
  `group_id` int(10) unsigned NOT NULL COMMENT '分组id',
  `remark` varchar(25) CHARACTER SET utf8mb4 NOT NULL COMMENT '好友备注',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1正常 2特别关注 3拉黑',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聊天好友表';

-- ----------------------------
-- Table structure for rt_chat_group_detail
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_group_detail`;
CREATE TABLE `rt_chat_group_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `groupname` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '群名称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '群头像',
  `desc` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '群介绍',
  `belong` varchar(10) CHARACTER SET utf8mb4 NOT NULL COMMENT '群主ID',
  `manger` text CHARACTER SET utf8mb4 NOT NULL COMMENT '管理员ID集合',
  `approval` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否需要验证 1需要 2不需要',
  `number` int(4) NOT NULL DEFAULT '200' COMMENT '群人数',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1正常 2禁言',
  `add_time` int(10) NOT NULL COMMENT '添加时间',
  `update_time` int(10) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群组表';

-- ----------------------------
-- Table structure for rt_chat_group_log
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_group_log`;
CREATE TABLE `rt_chat_group_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(10) unsigned NOT NULL,
  `to_id` int(10) unsigned NOT NULL,
  `content` text CHARACTER SET utf8mb4 NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1未读 2已读 3删除',
  `add_time` int(10) NOT NULL COMMENT '添加时间',
  `update_time` int(10) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='群聊天日志';

-- ----------------------------
-- Table structure for rt_chat_group_member
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_group_member`;
CREATE TABLE `rt_chat_group_member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `group_id` int(10) NOT NULL,
  `remark` varchar(25) NOT NULL,
  `type` tinyint(1) unsigned NOT NULL DEFAULT '3' COMMENT '身份 1群主 2管理员 3群员',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1正常 2禁言',
  `sort` int(11) NOT NULL,
  `disable_time` int(10) NOT NULL COMMENT '禁言时间',
  `add_time` int(10) NOT NULL COMMENT '添加时间',
  `update_time` int(10) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='群组成员';

-- ----------------------------
-- Table structure for rt_chat_notify
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_notify`;
CREATE TABLE `rt_chat_notify` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(10) NOT NULL COMMENT '''消息发送者 0表示为系统消息''',
  `to_id` int(10) NOT NULL COMMENT '''消息接收者 0表示全体会员'',',
  `type` tinyint(1) unsigned NOT NULL COMMENT '1为请求添加用户 2为系统消息（添加好友）3为请求加群 4为系统消息（添加群） 5 全体会员消息',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1未读 2已读',
  `remark` varchar(255) NOT NULL COMMENT '''附加消息'',',
  `create_time` datetime NOT NULL COMMENT '''发送消息时间'',',
  `operation` tinyint(255) NOT NULL COMMENT '操作状态',
  `group_id` int(11) NOT NULL COMMENT '好友添加：好友分组id，群添加：群id',
  `handle_id` int(11) unsigned NOT NULL COMMENT '操作者id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息通知';

-- ----------------------------
-- Table structure for rt_chat_users
-- ----------------------------
DROP TABLE IF EXISTS `rt_chat_users`;
CREATE TABLE `rt_chat_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(155) CHARACTER SET utf8 DEFAULT NULL,
  `groupid` int(5) DEFAULT NULL COMMENT '所属的分组id',
  `status` varchar(55) CHARACTER SET utf8 DEFAULT NULL,
  `sign` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聊天用户';

-- ----------------------------
-- Table structure for rt_code
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='程序设计器';

-- ----------------------------
-- Table structure for rt_company
-- ----------------------------
DROP TABLE IF EXISTS `rt_company`;
CREATE TABLE `rt_company` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '上级公司id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公司表';

-- ----------------------------
-- Table structure for rt_crons
-- ----------------------------
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
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `intertype` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '间隔类型',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `handle` (`handle`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统计划任务表';

-- ----------------------------
-- Table structure for rt_database
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据库连接表';

-- ----------------------------
-- Table structure for rt_datasafe
-- ----------------------------
DROP TABLE IF EXISTS `rt_datasafe`;
CREATE TABLE `rt_datasafe` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `data_id` int(10) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `data_id` (`data_id`,`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据库保护表';

-- ----------------------------
-- Table structure for rt_department
-- ----------------------------
DROP TABLE IF EXISTS `rt_department`;
CREATE TABLE `rt_department` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '上级部门id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门表';

-- ----------------------------
-- Table structure for rt_doc
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文档表';

-- ----------------------------
-- Table structure for rt_doc_cate
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文档分类表';

-- ----------------------------
-- Table structure for rt_error
-- ----------------------------
DROP TABLE IF EXISTS `rt_error`;
CREATE TABLE `rt_error` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msg` text COLLATE utf8mb4_unicode_ci,
  `addtime` int(10) unsigned DEFAULT '0',
  `admin_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统错误日志表';

-- ----------------------------
-- Table structure for rt_excel
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='excel表';

-- ----------------------------
-- Table structure for rt_flow
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='流程图';

-- ----------------------------
-- Table structure for rt_form
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统表单';

-- ----------------------------
-- Table structure for rt_gant
-- ----------------------------
DROP TABLE IF EXISTS `rt_gant`;
CREATE TABLE `rt_gant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='甘特图';

-- ----------------------------
-- Table structure for rt_kanban
-- ----------------------------
DROP TABLE IF EXISTS `rt_kanban`;
CREATE TABLE `rt_kanban` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `maxid` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '最大id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='看板主表';

-- ----------------------------
-- Table structure for rt_kanban_item
-- ----------------------------
DROP TABLE IF EXISTS `rt_kanban_item`;
CREATE TABLE `rt_kanban_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `pid` int(10) NOT NULL DEFAULT '0' COMMENT '上级id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='看板卡片内容';

-- ----------------------------
-- Table structure for rt_kanban_list
-- ----------------------------
DROP TABLE IF EXISTS `rt_kanban_list`;
CREATE TABLE `rt_kanban_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `pid` int(10) NOT NULL DEFAULT '0' COMMENT '上级id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='看板卡片列表';

-- ----------------------------
-- Table structure for rt_menu
-- ----------------------------
DROP TABLE IF EXISTS `rt_menu`;
CREATE TABLE `rt_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `route` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '权限标志',
  `href` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '前端地址',
  `type` tinyint(2) DEFAULT '0' COMMENT '0目录1菜单2按钮3权限',
  `order_num` int(10) DEFAULT '0' COMMENT '排序',
  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `open_type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `pid` int(10) DEFAULT '0',
  `lid` tinyint(3) DEFAULT '1',
  `ifshow` tinyint(3) unsigned DEFAULT '0' COMMENT '是否显示0显示1不显示',
  `desktop` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '桌面推荐',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `url` (`route`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统菜单';

-- ----------------------------
-- Table structure for rt_mind
-- ----------------------------
DROP TABLE IF EXISTS `rt_mind`;
CREATE TABLE `rt_mind` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='思维导图';

-- ----------------------------
-- Table structure for rt_mod
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统模块表';

-- ----------------------------
-- Table structure for rt_params
-- ----------------------------
DROP TABLE IF EXISTS `rt_params`;
CREATE TABLE `rt_params` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数名称',
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数值',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参数内容',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '参数类型1文件2数字3字符串',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='全局常量表';

-- ----------------------------
-- Table structure for rt_picedit
-- ----------------------------
DROP TABLE IF EXISTS `rt_picedit`;
CREATE TABLE `rt_picedit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图片编辑器';

-- ----------------------------
-- Table structure for rt_planday
-- ----------------------------
DROP TABLE IF EXISTS `rt_planday`;
CREATE TABLE `rt_planday` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `start` int(10) NOT NULL COMMENT '开始时间',
  `end` int(10) NOT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='日程计划';

-- ----------------------------
-- Table structure for rt_plugins
-- ----------------------------
DROP TABLE IF EXISTS `rt_plugins`;
CREATE TABLE `rt_plugins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `admin_id` int(10) NOT NULL DEFAULT '0' COMMENT '管理员id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `version` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1.0.0' COMMENT '版本号',
  `key` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '关键标志',
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cms' COMMENT '类型',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '包详情',
  `perms` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '安装源',
  `is_dev` tinyint(2) unsigned DEFAULT '0' COMMENT '是否是开发环境',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应用市场';

-- ----------------------------
-- Table structure for rt_position
-- ----------------------------
DROP TABLE IF EXISTS `rt_position`;
CREATE TABLE `rt_position` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='岗位表';

-- ----------------------------
-- Table structure for rt_ppt
-- ----------------------------
DROP TABLE IF EXISTS `rt_ppt`;
CREATE TABLE `rt_ppt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '编辑时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='演示文稿';

-- ----------------------------
-- Table structure for rt_set
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- ----------------------------
-- Table structure for rt_svg
-- ----------------------------
DROP TABLE IF EXISTS `rt_svg`;
CREATE TABLE `rt_svg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='svg编辑器';

-- ----------------------------
-- Table structure for rt_tenant
-- ----------------------------
DROP TABLE IF EXISTS `rt_tenant`;
CREATE TABLE `rt_tenant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `tenant_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `login_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '登录名',
  `user_num_limit` int(11) DEFAULT NULL COMMENT '用户数量限制',
  `type` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '租户类型，0免费租户，1付费租户',
  `enabled` bit(1) DEFAULT b'1' COMMENT '启用 0-禁用  1-启用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `expire_time` datetime DEFAULT NULL COMMENT '到期时间',
  `remark` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='租户';

-- ----------------------------
-- Table structure for rt_txt
-- ----------------------------
DROP TABLE IF EXISTS `rt_txt`;
CREATE TABLE `rt_txt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文本编辑器';

-- ----------------------------
-- Table structure for rt_user
-- ----------------------------
DROP TABLE IF EXISTS `rt_user`;
CREATE TABLE `rt_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户姓名--例如张三',
  `login_name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '登录用户名',
  `password` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '登陆密码',
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'salt校验',
  `position` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '职位',
  `department` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属部门',
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '电子邮箱',
  `phone` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '手机号码',
  `ismanager` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否为管理者 0==管理者 1==员工',
  `isystem` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否系统自带数据 ',
  `status` tinyint(4) DEFAULT '0' COMMENT '状态，0：正常，1：删除，2封禁',
  `description` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户描述信息',
  `remark` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `tenant_id` bigint(20) DEFAULT NULL COMMENT '租户id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name` (`login_name`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ----------------------------
-- Table structure for rt_user_auth
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_auth`;
CREATE TABLE `rt_user_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理权限表';

-- ----------------------------
-- Table structure for rt_user_config
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_config`;
CREATE TABLE `rt_user_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `company_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司名称',
  `company_contacts` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司联系人',
  `company_address` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司地址',
  `company_tel` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司电话',
  `company_fax` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司传真',
  `company_post_code` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司邮编',
  `depot_flag` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '仓库启用标记，0未启用，1启用',
  `customer_flag` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '客户启用标记，0未启用，1启用',
  `minus_stock_flag` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '负库存启用标记，0未启用，1启用',
  `tenant_id` bigint(20) DEFAULT NULL COMMENT '租户id',
  `delete_flag` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '删除标记，0未删除，1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='租户系统参数';

-- ----------------------------
-- Table structure for rt_user_loginlog
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_loginlog`;
CREATE TABLE `rt_user_loginlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `data` text CHARACTER SET utf8 COMMENT '返回记录',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户登录日志表';

-- ----------------------------
-- Table structure for rt_user_map
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_map`;
CREATE TABLE `rt_user_map` (
  `map_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) unsigned NOT NULL,
  `auth_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0角色1集团2公司3门店4部门5区域',
  PRIMARY KEY (`map_id`),
  UNIQUE KEY `admin_id` (`admin_id`,`auth_id`,`type`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员权限映射表';

-- ----------------------------
-- Table structure for rt_user_menu
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_menu`;
CREATE TABLE `rt_user_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `route` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '权限标志',
  `href` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '前端地址',
  `type` tinyint(2) DEFAULT '0' COMMENT '0目录1菜单2按钮3权限',
  `order_num` int(10) DEFAULT '0' COMMENT '排序',
  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `open_type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `pid` int(10) DEFAULT '0',
  `lid` tinyint(3) DEFAULT '1',
  `ifshow` tinyint(3) unsigned DEFAULT '0' COMMENT '是否显示0显示1不显示',
  `desktop` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '桌面推荐',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `url` (`route`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户菜单';

-- ----------------------------
-- Table structure for rt_user_oplog
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_oplog`;
CREATE TABLE `rt_user_oplog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `data` text CHARACTER SET utf8 COMMENT '返回记录',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户操作日志';

-- ----------------------------
-- Table structure for rt_user_viewlog
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_viewlog`;
CREATE TABLE `rt_user_viewlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `leavetime` int(10) unsigned DEFAULT '0' COMMENT '离开时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户查看日志';

-- ----------------------------
-- Table structure for rt_word
-- ----------------------------
DROP TABLE IF EXISTS `rt_word`;
CREATE TABLE `rt_word` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文档编辑器';

SET FOREIGN_KEY_CHECKS = 1;

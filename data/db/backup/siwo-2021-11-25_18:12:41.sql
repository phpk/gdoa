/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_achievement
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_achievement`;
CREATE TABLE `rt_achievement` (
  `achievement_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned DEFAULT '0' COMMENT '订单id',
  `product_id` int(10) unsigned DEFAULT '0' COMMENT '商品id',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `store_id` int(10) unsigned DEFAULT '0' COMMENT '店铺id',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '员工id',
  `money` decimal(10, 2) unsigned DEFAULT '0.00' COMMENT '实际业绩',
  `all_money` decimal(10, 2) unsigned DEFAULT '0.00' COMMENT '订单总额',
  `add_time` int(10) unsigned DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '发放时间',
  PRIMARY KEY (`achievement_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '业绩表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin`;
CREATE TABLE `rt_admin` (
  `admin_id` int(10) NOT NULL DEFAULT '0' COMMENT '唯一标志',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码钥匙',
  `role_id` int(10) NOT NULL DEFAULT '0' COMMENT '角色id',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `mobile` int(10) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态1正常0禁用',
  `login_time` int(10) DEFAULT '0' COMMENT '登录时间',
  `login_num` int(10) DEFAULT '0' COMMENT '登录次数',
  `update_time` int(10) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`) USING HASH,
  UNIQUE KEY `mobile` (`mobile`) USING HASH
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_auth
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_auth`;
CREATE TABLE `rt_admin_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理权限表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_admin_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_admin_log`;
CREATE TABLE `rt_admin_log` (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理操作日志';

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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL COMMENT '分类:id:title',
  `title` varchar(128) CHARACTER SET utf8 NOT NULL COMMENT '文章名',
  `desc_content` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `author` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '作者:id:name',
  `show_switch` tinyint(1) NOT NULL DEFAULT '1' COMMENT '展示:1=展示,0=隐藏',
  `show_time` datetime DEFAULT NULL,
  `up_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `add_time` datetime DEFAULT CURRENT_TIMESTAMP,
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
# SCHEMA DUMP FOR TABLE: rt_city
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_city`;
CREATE TABLE `rt_city` (
  `city_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市名称',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `company_id` int(10) DEFAULT NULL COMMENT '上级公司id',
  PRIMARY KEY (`city_id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '城市表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_company`;
CREATE TABLE `rt_company` (
  `company_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司名称',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `parent_id` int(10) DEFAULT NULL COMMENT '上级公司id',
  PRIMARY KEY (`company_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '公司表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_config`;
CREATE TABLE `rt_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `val` text COLLATE utf8mb4_unicode_ci,
  `isrun` tinyint(2) DEFAULT '1',
  `param` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `key` (`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统配置表';

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
# SCHEMA DUMP FOR TABLE: rt_error
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_error`;
CREATE TABLE `rt_error` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msg` text COLLATE utf8mb4_unicode_ci,
  `add_time` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统错误日志表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_group`;
CREATE TABLE `rt_group` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '集团名称',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '集团地址',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '主管理员id',
  `admin_id` int(10) DEFAULT NULL COMMENT '审核或添加管理员id',
  `store_num` int(10) unsigned DEFAULT '0' COMMENT '可控门店数',
  `end_time` int(10) unsigned DEFAULT '0' COMMENT '结束时间',
  `start_time` int(10) unsigned DEFAULT '0' COMMENT '开始时间',
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '0正常1过期2禁用3删除',
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `name` (`name`) USING HASH
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '集团表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_group_map
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_group_map`;
CREATE TABLE `rt_group_map` (
  `cate_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `parent_id` int(10) DEFAULT NULL COMMENT '上级id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `type` tinyint(2) unsigned DEFAULT '0' COMMENT '类型0公司1城市2区域3门店',
  `manager_id` int(10) DEFAULT NULL COMMENT '操作员id',
  `add_time` int(10) unsigned DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`cate_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '集团下属关系表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_group_note
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_group_note`;
CREATE TABLE `rt_group_note` (
  `note_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT '内容',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '添加人',
  PRIMARY KEY (`note_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '集团公告表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_manager_change
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_manager_change`;
CREATE TABLE `rt_manager_change` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `manager_id` int(10) unsigned DEFAULT NULL COMMENT '员工id',
  `type` int(255) unsigned DEFAULT '1' COMMENT '类型1申请转店2授权转店3禁止',
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标记',
  `add_time` int(10) unsigned DEFAULT NULL COMMENT '时间',
  `mgr_id` int(10) DEFAULT NULL COMMENT '审核人',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '审核时间',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '员工转店记录';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_manager_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_manager_log`;
CREATE TABLE `rt_manager_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `manager_id` int(10) unsigned NOT NULL COMMENT '管理员账号',
  `log` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '日志名称',
  `data` text CHARACTER SET utf8 COMMENT '返回记录',
  `ip` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT 'IP地址',
  `agent` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '客户端信息',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
  `method` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '方法',
  `addtime` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理操作日志';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_manager_map
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_manager_map`;
CREATE TABLE `rt_manager_map` (
  `manager_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `company_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司归集id',
  `city_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市归集id',
  `store_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '门店归集id',
  `position_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '岗位归集id',
  `role_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色归集id',
  `strore_id` int(10) unsigned DEFAULT '0' COMMENT '主门店id',
  `role_id` int(10) unsigned DEFAULT '0' COMMENT '主角色id',
  PRIMARY KEY (`manager_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '员工归属表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_manger
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_manger`;
CREATE TABLE `rt_manger` (
  `manger_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码钥匙',
  `role_id` int(10) NOT NULL DEFAULT '0' COMMENT '角色id',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `mobile` int(10) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态1正常0禁用',
  `login_time` int(10) DEFAULT '0' COMMENT '登录时间',
  `login_num` int(10) DEFAULT '0' COMMENT '登录次数',
  `update_time` int(10) DEFAULT '0' COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `rules` text COLLATE utf8mb4_unicode_ci COMMENT '权限，可单独设立',
  `usercode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '员工编号',
  PRIMARY KEY (`manger_id`) USING BTREE,
  UNIQUE KEY `username` (`username`, `group_id`) USING BTREE,
  UNIQUE KEY `mobile` (`mobile`, `group_id`) USING BTREE,
  UNIQUE KEY `usercode` (`usercode`, `group_id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '员工表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_manger_auth
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_manger_auth`;
CREATE TABLE `rt_manger_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '员工权限表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_menu`;
CREATE TABLE `rt_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '权限标志',
  `ismenu` tinyint(2) DEFAULT '0' COMMENT '0目录1菜单2按钮',
  `order` int(5) DEFAULT '0',
  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `target` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `pid` int(10) DEFAULT '0',
  `lid` tinyint(3) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统菜单';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_msg
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_msg`;
CREATE TABLE `rt_msg` (
  `msg_id` int(10) NOT NULL,
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '消息',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '跳转地址',
  `type` tinyint(3) DEFAULT NULL COMMENT '类型',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) DEFAULT NULL COMMENT '阅读时间',
  PRIMARY KEY (`msg_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '待办消息表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_order`;
CREATE TABLE `rt_order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_num` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '订单编号',
  `product_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品id',
  `group_id` int(10) NOT NULL COMMENT '集团id',
  `need_pay` decimal(10, 2) NOT NULL COMMENT '应付',
  `true_pay` decimal(10, 2) NOT NULL COMMENT '实付',
  `has_use` decimal(10, 2) DEFAULT NULL COMMENT '已消费金额',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0未支付2已支付1审核中3作废4退款5关闭',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `manager_id` int(10) NOT NULL COMMENT '员工id',
  `mgr_id` int(10) DEFAULT NULL COMMENT '审核员id',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0正常订单1业务订单2作废单3退款单',
  `store_id` int(10) unsigned DEFAULT '0' COMMENT '店铺id',
  `pay_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '支付方式',
  `order_from` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '订单来源',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `pay_time` int(10) DEFAULT NULL COMMENT '支付时间',
  `check_time` int(10) DEFAULT NULL COMMENT '审核时间',
  `achievement` decimal(10, 2) DEFAULT NULL COMMENT '总支付业绩',
  `service_num` int(10) unsigned DEFAULT '0' COMMENT '服务次数',
  `service_use` int(10) unsigned DEFAULT '0' COMMENT '已用次数',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标记',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_num` (`order_num`) USING HASH
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '订单表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_order_back
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_order_back`;
CREATE TABLE `rt_order_back` (
  `back_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) DEFAULT NULL COMMENT '订单id',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '原因',
  `mgr_id` int(10) DEFAULT NULL COMMENT '作废人',
  `manager_id` int(10) DEFAULT NULL COMMENT '归属人',
  PRIMARY KEY (`back_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '作废单';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_order_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_order_log`;
CREATE TABLE `rt_order_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) DEFAULT NULL COMMENT '订单id',
  `mgr_id` int(10) DEFAULT NULL COMMENT '操作人',
  `add_time` int(10) DEFAULT NULL COMMENT '操作时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标记',
  PRIMARY KEY (`log_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '订单日志表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_order_refund
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_order_refund`;
CREATE TABLE `rt_order_refund` (
  `refund_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned DEFAULT '0' COMMENT '订单编号',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '用户id',
  `store_id` int(10) unsigned DEFAULT '0' COMMENT '店铺id',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `mgr_id` int(10) unsigned DEFAULT '0' COMMENT '操作人id',
  `manager_id` int(10) DEFAULT NULL COMMENT '归属人id',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '退款原因',
  `has_pay` decimal(10, 2) DEFAULT NULL COMMENT '实际支付金额',
  `has_use` decimal(10, 2) DEFAULT NULL COMMENT '已消耗金额',
  `need_pay` decimal(10, 2) DEFAULT NULL COMMENT '应退款金额',
  `true_pay` decimal(10, 2) DEFAULT NULL COMMENT '实际退款金额',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `check_time` int(10) DEFAULT NULL COMMENT '审核时间',
  `check_uid` int(10) DEFAULT NULL COMMENT '审核人',
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '状态0提交审核1审核通过2驳回',
  PRIMARY KEY (`refund_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '退款单';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_order_service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_order_service`;
CREATE TABLE `rt_order_service` (
  `service_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) DEFAULT NULL,
  `service_num` int(10) DEFAULT NULL COMMENT '消耗的次数',
  `product_id` int(10) DEFAULT NULL COMMENT '商品id',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `store_id` int(10) DEFAULT NULL COMMENT '商品id',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) DEFAULT NULL COMMENT '更新时间',
  `manager_id` int(10) DEFAULT NULL COMMENT '员工id',
  `user_id` int(10) DEFAULT NULL COMMENT '用户id',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标记',
  PRIMARY KEY (`service_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '消耗单';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_product`;
CREATE TABLE `rt_product` (
  `product_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '类型0商品1消耗品2组合商品',
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编码',
  `format` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '规格',
  `format_id` int(10) unsigned DEFAULT '0' COMMENT '规格id',
  `unit` decimal(10, 2) DEFAULT NULL COMMENT '单位',
  `unit_id` int(10) unsigned DEFAULT '0' COMMENT '单位id',
  `stock` int(10) unsigned DEFAULT '0' COMMENT '库存',
  `price` decimal(10, 2) DEFAULT NULL COMMENT '价格',
  `price_one` decimal(10, 2) unsigned DEFAULT '0.00' COMMENT '单个售价',
  `price_low` decimal(10, 2) DEFAULT NULL COMMENT '最低售价',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '状态0正常1下架',
  `manager_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加人id',
  `service_num` int(10) unsigned DEFAULT '0' COMMENT '服务次数',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标签',
  PRIMARY KEY (`product_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '商品表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_product_compose
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_product_compose`;
CREATE TABLE `rt_product_compose` (
  `compose_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) DEFAULT NULL COMMENT '商品主id',
  `pro_id` int(10) DEFAULT NULL COMMENT '组合商品id',
  `service_num` int(10) DEFAULT NULL COMMENT '服务次数',
  `price` decimal(10, 2) unsigned DEFAULT '0.00' COMMENT '价格',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`compose_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '组合商品';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_product_param
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_product_param`;
CREATE TABLE `rt_product_param` (
  `param_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '类别0规格1单位',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `manager_id` int(10) DEFAULT NULL COMMENT '添加人',
  PRIMARY KEY (`param_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '商品规格单位字典';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_product_price
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_product_price`;
CREATE TABLE `rt_product_price` (
  `price_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10, 2) unsigned DEFAULT '0.00' COMMENT '价格',
  `strore_id` int(10) unsigned DEFAULT '0' COMMENT '门店id',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `product_id` int(10) DEFAULT NULL COMMENT '商品id',
  `can_edit` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可改价0可改1不可改',
  `service_num` int(10) unsigned DEFAULT '0' COMMENT '服务次数',
  PRIMARY KEY (`price_id`),
  UNIQUE KEY `product_id` (`strore_id`, `group_id`, `product_id`) USING HASH
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '商品区间价';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_sms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_sms`;
CREATE TABLE `rt_sms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone` bigint(12) unsigned DEFAULT NULL,
  `sendtime` int(10) unsigned DEFAULT '0',
  `endtime` int(10) unsigned DEFAULT '0',
  `num` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统短信表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_store`;
CREATE TABLE `rt_store` (
  `store_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '门店名称',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '门店地址',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `city_id` int(10) unsigned DEFAULT '0' COMMENT '城市id',
  `company_id` int(10) unsigned DEFAULT '0' COMMENT '公司id',
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '区域id',
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '0正常1关闭',
  `type` tinyint(2) unsigned DEFAULT '0' COMMENT '0直营1渠道',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '添加人id',
  PRIMARY KEY (`store_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '门店表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_sys_cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_sys_cate`;
CREATE TABLE `rt_sys_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `desc` text COLLATE utf8mb4_unicode_ci COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key` (`key`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统总分类表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_user`;
CREATE TABLE `rt_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码,默认111111',
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码钥匙',
  `level_id` int(6) DEFAULT NULL COMMENT '用户等级',
  `balance` decimal(10, 2) DEFAULT NULL COMMENT '用户积分',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `mobile` int(10) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态1正常0禁用',
  `login_time` int(10) DEFAULT '0' COMMENT '登录时间',
  `login_num` int(10) DEFAULT '0' COMMENT '登录次数',
  `update_time` int(10) DEFAULT '0' COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `blone_id` int(10) unsigned DEFAULT '0' COMMENT '归属id',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '添加人id',
  `all_use` decimal(10, 2) unsigned DEFAULT '0.00' COMMENT '用户总支付',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标签',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '客户表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_user_level
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_user_level`;
CREATE TABLE `rt_user_level` (
  `level_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `balance` decimal(10, 2) DEFAULT NULL COMMENT '需要达到的积分',
  PRIMARY KEY (`level_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户等级表';

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_achievement
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_auth
# ------------------------------------------------------------

INSERT INTO
  `rt_admin_auth` (`id`, `name`, `rules`)
VALUES
  (1, '总管理员', '-1');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_admin_log
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
# DATA DUMP FOR TABLE: rt_city
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_company
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_config
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_crons
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_error
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_group
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_group_map
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_group_note
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_manager_change
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_manager_log
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_manager_map
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_manger
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_manger_auth
# ------------------------------------------------------------

INSERT INTO
  `rt_manger_auth` (`id`, `name`, `rules`, `group_id`)
VALUES
  (1, '总管理员', '-1', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_menu
# ------------------------------------------------------------

INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    1,
    '内容管理',
    'content',
    0,
    1,
    'fa-address-book',
    '_self',
    0,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (2, '系统管理', 'system', 0, 2, 'fa-lemon-o', '_self', 0, 0);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    3,
    '财务管理',
    'account',
    0,
    3,
    'fa-slideshare',
    '_self',
    0,
    0
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    4,
    '用户管理',
    'user/index',
    1,
    4,
    'fa-stumbleupon-circle',
    '_self',
    1,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    5,
    '用户账户',
    'user/account',
    1,
    5,
    'fa-viacoin',
    '_self',
    1,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    7,
    '文章管理',
    'art/index',
    1,
    7,
    'fa-file-text',
    '_self',
    1,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    9,
    '菜单管理',
    'auth/menus',
    1,
    9,
    'fa-dot-circle-o',
    '_self',
    2,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (10, '角色管理', 'auth/rols', 1, 10, 'fa-adn', '_self', 2, 1);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    11,
    '管理员管理',
    'auth/index',
    1,
    11,
    'fa-android',
    '_self',
    2,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    12,
    '操作日志',
    'auth/logs',
    1,
    12,
    'fa-hourglass-end',
    '_self',
    2,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    13,
    '系统设置',
    'set/index',
    1,
    13,
    'fa-angle-double-down',
    '_self',
    2,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    14,
    '计划任务',
    'set/crons',
    1,
    14,
    'fa-arrow-up',
    '_self',
    2,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    21,
    '编辑菜单',
    'auth/menuEdit',
    2,
    20,
    'fa-address-card-o',
    '_self',
    9,
    2
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    22,
    '删除菜单',
    'auth/menuDel',
    2,
    21,
    'fa-address-card-o',
    '_self',
    9,
    2
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (24, '编辑管理员', 'auth/adminEdit', 2, 20, '', '_self', 11, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (25, '删除管理员', 'auth/adminDel', 2, 21, '', '_self', 11, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (26, '编辑角色', 'auth/rolsEdit', 2, 22, '', '_self', 10, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (27, '删除角色', 'auth/rolsDel', 1, 23, '', '_self', 10, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (28, '编辑配置', 'set/confEdit', 2, 24, '', '_self', 13, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (29, '删除配置', 'set/confDel', 2, 25, '', '_self', 13, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (30, '设置配置', 'set/confSet', 2, 26, '', '_self', 13, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (31, '编辑配置项', 'set/setEdit', 2, 27, '', '_self', 13, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (32, '删除配置项', 'set/setDel', 2, 28, '', '_self', 13, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (33, '编辑计划任务', 'set/cronsEdit', 2, 29, '', '_self', 14, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (34, '删除计划任务', 'set/cronDel', 2, 30, '', '_self', 14, 2);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (35, '错误日志', 'auth/errs', 1, 31, 'fa-ban', '_self', 2, 1);
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    36,
    '系统分类',
    'cate/index',
    1,
    32,
    'fa-align-justify',
    '_self',
    2,
    1
  );
INSERT INTO
  `rt_menu` (
    `id`,
    `name`,
    `url`,
    `ismenu`,
    `order`,
    `icon`,
    `target`,
    `pid`,
    `lid`
  )
VALUES
  (
    37,
    '用户地址',
    'user/address',
    1,
    33,
    'fa-at',
    '_self',
    1,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_msg
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_order
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_order_back
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_order_log
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_order_refund
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_order_service
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_product
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_product_compose
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_product_param
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_product_price
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_sms
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_store
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_sys_cate
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_user
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_user_level
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

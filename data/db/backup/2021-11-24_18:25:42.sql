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
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员表';

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员权限映射表';

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
) ENGINE = InnoDB AUTO_INCREMENT = 270 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理操作日志';

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
) ENGINE = InnoDB AUTO_INCREMENT = 315 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '管理员查看日志';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api`;
CREATE TABLE `rt_api` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口名称',
  `mod_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '模块id',
  `mod` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所属模块',
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口唯一标志',
  `method` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口方法',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口管理表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_input
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_input`;
CREATE TABLE `rt_api_input` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口输入表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_logic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_logic`;
CREATE TABLE `rt_api_logic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口逻辑表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_out
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_out`;
CREATE TABLE `rt_api_out` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口输出表';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rt_api_params
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rt_api_params`;
CREATE TABLE `rt_api_params` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口参数表';

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
  `addtime` int(10) unsigned DEFAULT '0',
  `admin_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统错误日志表';

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
) ENGINE = InnoDB AUTO_INCREMENT = 130 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统菜单';

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
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '模块类型1控制层2数据层3服务层',
  `params` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '全局参数',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模块说明',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE = InnoDB AUTO_INCREMENT = 36 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统模块表';

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '全局常量表';

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统配置表';

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
    'dc191f60525465922a829b5185b10244',
    1,
    'pD4wdbK6QawtRer2',
    0,
    NULL,
    NULL,
    0,
    1637727893,
    148,
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
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_input
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_logic
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_out
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_api_params
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
# DATA DUMP FOR TABLE: rt_crons
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rt_error
# ------------------------------------------------------------


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
    4,
    '用户管理',
    'user/index',
    '',
    1,
    4,
    'layui-icon layui-icon-username',
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
    5,
    '用户账户',
    'user/account',
    '',
    1,
    5,
    'layui-icon layui-icon-heart-fill',
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
    7,
    '文章管理',
    'art/index',
    '',
    1,
    7,
    'layui-icon layui-icon-light',
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
    11,
    '管理员管理',
    'admin/list',
    'view/admin/list.html',
    1,
    11,
    'layui-icon layui-icon-key',
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
    14,
    '计划任务',
    'set/crons',
    '',
    1,
    14,
    'layui-icon layui-icon-component',
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
    33,
    '编辑计划任务',
    'set/cronsEdit',
    NULL,
    2,
    29,
    '',
    '_self',
    14,
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
    34,
    '删除计划任务',
    'set/cronDel',
    NULL,
    2,
    30,
    '',
    '_self',
    14,
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
    36,
    '系统字典',
    'cate/index',
    '',
    1,
    50,
    'layui-icon layui-icon-fonts-clear',
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
    37,
    '用户地址',
    'user/address',
    '',
    1,
    33,
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
    53,
    '首页工作台',
    'index/welcome',
    'index/welcome',
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
    '设置字段为空或自增长',
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
    129,
    '接口设计器',
    'api/list',
    'view/api/list.html',
    1,
    6,
    'layui-icon layui-icon-ios',
    NULL,
    2,
    1,
    0
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
    `remark`
  )
VALUES
  (33, 'test', 'test', 'server', 'rt_admin', '', 1, '', '');

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

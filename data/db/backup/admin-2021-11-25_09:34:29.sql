/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_area
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_area`;
CREATE TABLE `sys_area` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `area_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地区id',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级id',
  `name` varchar(255) NOT NULL COMMENT '地区名称',
  `sun` text COMMENT '所有的下级',
  `path` varchar(255) DEFAULT NULL COMMENT '路径',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型0禁用1可用',
  `order_num` int(11) DEFAULT '0' COMMENT '排序',
  `user_id` int(11) NOT NULL COMMENT '创建用户id',
  PRIMARY KEY (`area_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_company`;
CREATE TABLE `sys_company` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `company_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公司id',
  `name` varchar(255) NOT NULL COMMENT '公司名称',
  `parentId` int(11) DEFAULT '0' COMMENT '上级id',
  `area_id` int(11) NOT NULL COMMENT '地区id',
  `user_id` int(11) NOT NULL COMMENT '创建用户id',
  `address` varchar(255) NOT NULL COMMENT '公司地址',
  `perms` text COMMENT '权限',
  `remark` varchar(255) DEFAULT NULL COMMENT '标记',
  `order_num` int(11) DEFAULT '0',
  PRIMARY KEY (`company_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2c363c25cf99bcaab3a7f389ba` (`key`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_config_cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_config_cate`;
CREATE TABLE `sys_config_cate` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `cate_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `value` varchar(255) NOT NULL COMMENT '键值',
  `remark` varchar(255) DEFAULT NULL COMMENT '标记',
  PRIMARY KEY (`cate_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_department`;
CREATE TABLE `sys_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `order_num` int(11) DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_group`;
CREATE TABLE `sys_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '集团id',
  `name` varchar(255) NOT NULL COMMENT '集团名称',
  `parentId` int(11) DEFAULT '0' COMMENT '上级id',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `user_id` int(11) NOT NULL COMMENT '创建用户id',
  `area_id` int(11) NOT NULL COMMENT '地区id',
  `perms` text COMMENT '权限',
  `remark` varchar(255) DEFAULT NULL COMMENT '标记',
  `order_num` int(11) DEFAULT '0' COMMENT '排序',
  `add_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '添加时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`group_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_login_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `ua` varchar(500) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_logs`;
CREATE TABLE `sys_logs` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `logs_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `ip` varchar(255) DEFAULT NULL COMMENT '请求ip',
  `time` datetime DEFAULT NULL COMMENT '请求时间',
  `ua` varchar(500) DEFAULT NULL COMMENT '浏览器',
  `act` varchar(255) DEFAULT NULL COMMENT '请求地址',
  PRIMARY KEY (`logs_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `router` varchar(255) DEFAULT NULL,
  `perms` varchar(255) DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `icon` varchar(255) DEFAULT NULL,
  `order_num` int(11) DEFAULT '0',
  `view_path` varchar(255) DEFAULT NULL,
  `keepalive` tinyint(4) DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `open_type` varchar(255) DEFAULT NULL,
  `is_show` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 69 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_projects`;
CREATE TABLE `sys_projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目id',
  `name` varchar(255) NOT NULL COMMENT '项目名称',
  `parentId` int(11) DEFAULT '0' COMMENT '上级id',
  `user_id` int(11) NOT NULL COMMENT '创建用户id',
  `remark` varchar(255) DEFAULT NULL COMMENT '标记',
  `order_num` int(11) DEFAULT '0' COMMENT '排序',
  `add_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '添加时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '项目类型',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '项目状态',
  PRIMARY KEY (`project_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_req_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_req_log`;
CREATE TABLE `sys_req_log` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `params` text,
  `action` varchar(100) DEFAULT NULL,
  `method` varchar(15) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `consume_time` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 164 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(50) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_223de54d6badbe43a5490450c3` (`name`),
  UNIQUE KEY `IDX_f2d07943355da93c3a8a1c411a` (`label`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_role_department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_role_department`;
CREATE TABLE `sys_role_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_role_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_store`;
CREATE TABLE `sys_store` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `store_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '门店id',
  `company_id` int(11) NOT NULL COMMENT '公司id',
  `name` varchar(255) NOT NULL COMMENT '门店名称',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `parentId` int(11) DEFAULT '0' COMMENT '上级id',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `area_id` int(11) NOT NULL COMMENT '地区id',
  `perms` text COMMENT '权限',
  `remark` varchar(255) DEFAULT NULL COMMENT '标记',
  `order_num` int(11) DEFAULT '0' COMMENT '排序',
  `user_id` int(11) NOT NULL COMMENT '创建用户id',
  PRIMARY KEY (`store_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `service` varchar(255) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `limit` int(11) DEFAULT '0',
  `cron` varchar(255) DEFAULT NULL,
  `every` int(11) DEFAULT NULL,
  `data` text,
  `job_opts` text,
  `remark` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ef8e5ab5ef2fe0ddb1428439ef` (`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_task_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_task_log`;
CREATE TABLE `sys_task_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `detail` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `consume_time` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `head_img` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `psalt` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sys_user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_area
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_company
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_config
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_config_cate
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_department
# ------------------------------------------------------------

INSERT INTO
  `sys_department` (
    `id`,
    `name`,
    `order_num`,
    `created_at`,
    `updated_at`,
    `parent_id`
  )
VALUES
  (
    1,
    '技术部',
    0,
    '2021-11-07 09:26:15.227098',
    '2021-11-07 11:27:10.000000',
    NULL
  );
INSERT INTO
  `sys_department` (
    `id`,
    `name`,
    `order_num`,
    `created_at`,
    `updated_at`,
    `parent_id`
  )
VALUES
  (
    2,
    '管理部门',
    0,
    '2021-11-07 09:26:15.227098',
    '2021-11-07 09:26:15.269515',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_group
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_login_log
# ------------------------------------------------------------

INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    '127.0.0.1',
    '2020-10-20 05:52:09',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    1,
    '127.0.0.1',
    '2020-10-22 07:43:12',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    1,
    '127.0.0.1',
    '2020-10-22 07:45:31',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    1,
    '127.0.0.1',
    '2020-10-23 02:39:51',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    1,
    '127.0.0.1',
    '2020-10-26 08:51:06',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    3,
    '127.0.0.1',
    '2020-10-26 09:24:23',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    1,
    '127.0.0.1',
    '2020-10-26 09:24:59',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    1,
    '127.0.0.1',
    '2020-10-26 09:29:59',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    '2021-11-07 09:26:15.946930',
    '2021-11-07 09:26:15.990646'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    1,
    '127.0.0.1',
    NULL,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '2021-11-07 11:10:07.166928',
    '2021-11-07 11:10:07.166928'
  );
INSERT INTO
  `sys_login_log` (
    `id`,
    `user_id`,
    `ip`,
    `time`,
    `ua`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    1,
    '127.0.0.1',
    NULL,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    '2021-11-08 08:51:50.747602',
    '2021-11-08 08:51:50.747602'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_logs
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_menu
# ------------------------------------------------------------

INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    1,
    NULL,
    '系统',
    '/sys',
    NULL,
    0,
    'system',
    255,
    NULL,
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    3,
    1,
    '权限管理',
    '/sys/permssion',
    NULL,
    0,
    'permission',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    4,
    3,
    '用户列表',
    '/sys/permssion/user',
    NULL,
    1,
    'peoples',
    0,
    'views/system/permission/user',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    5,
    4,
    '新增',
    NULL,
    'sys:user:add',
    2,
    NULL,
    0,
    NULL,
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    6,
    4,
    '删除',
    NULL,
    'sys:user:delete',
    2,
    NULL,
    0,
    NULL,
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    7,
    3,
    '菜单列表',
    '/sys/permssion/menu',
    NULL,
    1,
    'menu',
    0,
    'views/system/permission/menu',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    8,
    7,
    '新增',
    NULL,
    'sys:menu:add',
    2,
    NULL,
    0,
    NULL,
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    9,
    7,
    '删除',
    NULL,
    'sys:menu:delete',
    2,
    NULL,
    0,
    NULL,
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    10,
    7,
    '查询',
    NULL,
    'sys:menu:list,sys:menu:info',
    2,
    NULL,
    0,
    NULL,
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    17,
    16,
    '测试',
    '',
    'sys:menu:list,sys:menu:update,sys:menu:info,sys:menu:add',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    19,
    7,
    '修改',
    '',
    'sys:menu:update',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    23,
    3,
    '角色列表',
    '/sys/permission/role',
    '',
    1,
    'role',
    0,
    'views/system/permission/role',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    25,
    23,
    '删除',
    '',
    'sys:role:delete',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    28,
    23,
    '新增',
    '',
    'sys:role:add',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    29,
    23,
    '修改',
    '',
    'sys:role:update',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    32,
    23,
    '查询',
    '',
    'sys:role:list,sys:role:page,sys:role:info',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    33,
    4,
    '部门查询',
    '',
    'sys:dept:list,sys:dept:info',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    34,
    4,
    '查询',
    '',
    'sys:user:page,sys:user:info',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    35,
    4,
    '更新',
    '',
    'sys:user:update',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    36,
    4,
    '部门转移',
    '',
    'sys:dept:transfer',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    37,
    1,
    '系统监控',
    '/sys/monitor',
    '',
    0,
    'monitor',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    38,
    37,
    '请求追踪',
    '/sys/monitor/log',
    '',
    1,
    'log',
    0,
    'views/system/monitor/req-log',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    39,
    4,
    '部门新增',
    '',
    'sys:dept:add',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    40,
    4,
    '部门删除',
    '',
    'sys:dept:delete',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    41,
    4,
    '部门更新',
    '',
    'sys:dept:update',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    44,
    NULL,
    '文档',
    '/document',
    '',
    0,
    'documentation',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 11:25:03.354775',
    NULL,
    0
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    45,
    NULL,
    '通用权限',
    '/common',
    '',
    0,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 11:25:57.151906',
    NULL,
    0
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    46,
    45,
    '图片空间',
    '',
    'space:image:type:list,space:image:type:add,space:image:type:delete,space:image:page,space:image:delete,space:image:upload',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    51,
    37,
    '在线用户',
    '/sys/monitor/online',
    NULL,
    1,
    'people',
    0,
    'views/system/monitor/online',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    52,
    51,
    '查询',
    '',
    'sys:online:list',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    53,
    51,
    '下线',
    '',
    'sys:online:kick',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    54,
    38,
    '查询',
    '',
    'sys:req-log:page,sys:req-log:search',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    55,
    37,
    '登录日志',
    '/sys/monitor/login-log',
    NULL,
    1,
    'guide',
    0,
    'views/system/monitor/login-log',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    56,
    55,
    '查询',
    '',
    'sys:login-log:page',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    57,
    1,
    '任务调度',
    '/sys/schedule',
    NULL,
    0,
    'task',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    58,
    57,
    '定时任务',
    '/sys/schedule/task',
    NULL,
    1,
    'schedule',
    0,
    'views/system/schedule/task',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    59,
    58,
    '查询',
    '',
    'sys:task:page,sys:task:info',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    60,
    58,
    '新增',
    '',
    'sys:task:add',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    61,
    58,
    '更新',
    '',
    'sys:task:update',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    62,
    58,
    '执行一次',
    '',
    'sys:task:once',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    63,
    58,
    '运行',
    '',
    'sys:task:start',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    64,
    58,
    '暂停',
    '',
    'sys:task:stop',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    65,
    58,
    '删除',
    '',
    'sys:task:delete',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    66,
    57,
    '任务日志',
    '/sys/schedule/log',
    NULL,
    1,
    'schedule-log',
    0,
    'views/system/schedule/log',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    67,
    66,
    '查询',
    '',
    'sys:task-log:page',
    2,
    '',
    0,
    '',
    1,
    '2021-11-07 09:26:15.441371',
    '2021-11-07 09:26:15.487190',
    NULL,
    1
  );
INSERT INTO
  `sys_menu` (
    `id`,
    `parent_id`,
    `name`,
    `router`,
    `perms`,
    `type`,
    `icon`,
    `order_num`,
    `view_path`,
    `keepalive`,
    `created_at`,
    `updated_at`,
    `open_type`,
    `is_show`
  )
VALUES
  (
    68,
    NULL,
    '项目',
    '/pro',
    NULL,
    0,
    'file-type-docx',
    255,
    NULL,
    1,
    '2021-11-08 08:54:22.476274',
    '2021-11-08 08:54:22.476274',
    NULL,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_projects
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_req_log
# ------------------------------------------------------------

INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 11:46:11.464236',
    '2021-10-24 11:46:11.464236',
    137,
    '::1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    41
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 11:53:44.501513',
    '2021-10-24 11:53:44.501513',
    138,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    13
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:01:36.562995',
    '2021-10-24 12:01:36.562995',
    139,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    25
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:02:59.468254',
    '2021-10-24 12:02:59.468254',
    140,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    3
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:03:08.232059',
    '2021-10-24 12:03:08.232059',
    141,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:03:16.915813',
    '2021-10-24 12:03:16.915813',
    142,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:06:47.897820',
    '2021-10-24 12:06:47.897820',
    143,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    10
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:07:03.032823',
    '2021-10-24 12:07:03.032823',
    144,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    2
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:07:06.881648',
    '2021-10-24 12:07:06.881648',
    145,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:07:34.804429',
    '2021-10-24 12:07:34.804429',
    146,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    45
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:07:45.140499',
    '2021-10-24 12:07:45.140499',
    147,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:11:11.275495',
    '2021-10-24 12:11:11.275495',
    148,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    2
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:11:18.866904',
    '2021-10-24 12:11:18.866904',
    149,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    65
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:11:32.675065',
    '2021-10-24 12:11:32.675065',
    150,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    9
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:11:36.674006',
    '2021-10-24 12:11:36.674006',
    151,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:12:12.271638',
    '2021-10-24 12:12:12.271638',
    152,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'GET',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:12:16.133609',
    '2021-10-24 12:12:16.133609',
    153,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'GET',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:12:17.147957',
    '2021-10-24 12:12:17.147957',
    154,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'GET',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:13:50.964449',
    '2021-10-24 12:13:50.964449',
    155,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'GET',
    404,
    1
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:14:55.920263',
    '2021-10-24 12:14:55.920263',
    156,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'GET',
    404,
    1
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:15:13.927658',
    '2021-10-24 12:15:13.927658',
    157,
    '127.0.0.1',
    NULL,
    '{\"username\":\"rootadmin\",\"password\":\"123456\"}',
    '/admin/login',
    'POST',
    422,
    5
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:15:46.937634',
    '2021-10-24 12:15:46.937634',
    158,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    9
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:16:03.891444',
    '2021-10-24 12:16:03.891444',
    159,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:16:23.708917',
    '2021-10-24 12:16:23.708917',
    160,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/captcha/img',
    'GET',
    200,
    4
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:16:40.096899',
    '2021-10-24 12:16:40.096899',
    161,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:17:55.694370',
    '2021-10-24 12:17:55.694370',
    162,
    '127.0.0.1',
    NULL,
    '{}',
    '/admin/login',
    'OPTIONS',
    404,
    0
  );
INSERT INTO
  `sys_req_log` (
    `createTime`,
    `updateTime`,
    `id`,
    `ip`,
    `user_id`,
    `params`,
    `action`,
    `method`,
    `status`,
    `consume_time`
  )
VALUES
  (
    '2021-10-24 12:19:40.065167',
    '2021-10-24 12:19:40.065167',
    163,
    '127.0.0.1',
    NULL,
    '{\"username\":\"rootadmin\",\"password\":\"123456\"}',
    '/admin/login',
    'POST',
    422,
    9
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_role
# ------------------------------------------------------------

INSERT INTO
  `sys_role` (
    `id`,
    `name`,
    `label`,
    `remark`,
    `created_at`,
    `updated_at`,
    `user_id`
  )
VALUES
  (
    1,
    'root',
    '超级管理员',
    NULL,
    '2021-11-07 09:26:14.984653',
    '2021-11-07 09:26:15.034678',
    ''
  );
INSERT INTO
  `sys_role` (
    `id`,
    `name`,
    `label`,
    `remark`,
    `created_at`,
    `updated_at`,
    `user_id`
  )
VALUES
  (
    2,
    '测试角色',
    'testrole',
    '',
    '2021-11-07 09:26:14.984653',
    '2021-11-07 09:26:15.034678',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_role_department
# ------------------------------------------------------------

INSERT INTO
  `sys_role_department` (
    `id`,
    `role_id`,
    `department_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    2,
    1,
    '2021-11-07 09:26:15.857079',
    '2021-11-07 09:26:15.900350'
  );
INSERT INTO
  `sys_role_department` (
    `id`,
    `role_id`,
    `department_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    2,
    '2021-11-07 09:26:15.857079',
    '2021-11-07 09:26:15.900350'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_role_menu
# ------------------------------------------------------------

INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    2,
    44,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    26,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    2,
    27,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    2,
    4,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    2,
    33,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    2,
    34,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    2,
    36,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    2,
    39,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    2,
    41,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    2,
    37,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    2,
    38,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    2,
    43,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    2,
    1,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    2,
    3,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    2,
    8,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    2,
    10,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    2,
    7,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    2,
    45,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );
INSERT INTO
  `sys_role_menu` (
    `id`,
    `role_id`,
    `menu_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    2,
    46,
    '2021-11-07 09:26:15.133107',
    '2021-11-07 09:26:15.179090'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_store
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_task
# ------------------------------------------------------------

INSERT INTO
  `sys_task` (
    `id`,
    `name`,
    `service`,
    `type`,
    `status`,
    `start_time`,
    `end_time`,
    `limit`,
    `cron`,
    `every`,
    `data`,
    `job_opts`,
    `remark`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    '定时清空请求追踪日志',
    'admin.sys.reqLog.clear',
    0,
    1,
    NULL,
    NULL,
    0,
    '0 0 3 ? * 1',
    1000,
    '',
    '{\"count\":1,\"key\":\"__default__:1:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":1}',
    '',
    '2021-11-07 09:26:15.633114',
    '2021-11-08 08:50:44.000000'
  );
INSERT INTO
  `sys_task` (
    `id`,
    `name`,
    `service`,
    `type`,
    `status`,
    `start_time`,
    `end_time`,
    `limit`,
    `cron`,
    `every`,
    `data`,
    `job_opts`,
    `remark`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    '定时清空登录日志',
    'admin.sys.loginLog.clear',
    0,
    1,
    NULL,
    NULL,
    0,
    '0 0 3 ? * 1',
    0,
    '',
    '{\"count\":1,\"key\":\"__default__:2:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":2}',
    '',
    '2021-11-07 09:26:15.633114',
    '2021-11-08 08:50:44.000000'
  );
INSERT INTO
  `sys_task` (
    `id`,
    `name`,
    `service`,
    `type`,
    `status`,
    `start_time`,
    `end_time`,
    `limit`,
    `cron`,
    `every`,
    `data`,
    `job_opts`,
    `remark`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    '定时清空任务日志',
    'admin.sys.taskLog.clear',
    0,
    1,
    NULL,
    NULL,
    0,
    '0 0 3 ? * 1',
    0,
    '',
    '{\"count\":1,\"key\":\"__default__:3:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}',
    '',
    '2021-11-07 09:26:15.633114',
    '2021-11-08 08:50:44.000000'
  );
INSERT INTO
  `sys_task` (
    `id`,
    `name`,
    `service`,
    `type`,
    `status`,
    `start_time`,
    `end_time`,
    `limit`,
    `cron`,
    `every`,
    `data`,
    `job_opts`,
    `remark`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    '获取逆天邪神最新章节',
    'reptile.book.getZonghengBookLastchapter',
    1,
    0,
    NULL,
    NULL,
    3,
    '',
    20000,
    '{\"id\":\"408586\",\"emails\":\"qa894178522@qq.com\"}',
    '',
    '',
    '2021-11-07 09:26:15.633114',
    '2021-11-07 09:26:15.679190'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_task_log
# ------------------------------------------------------------

INSERT INTO
  `sys_task_log` (
    `id`,
    `task_id`,
    `status`,
    `detail`,
    `created_at`,
    `updated_at`,
    `consume_time`
  )
VALUES
  (
    1,
    4,
    1,
    NULL,
    '2021-11-07 09:26:15.725272',
    '2021-11-07 09:26:15.765384',
    0
  );
INSERT INTO
  `sys_task_log` (
    `id`,
    `task_id`,
    `status`,
    `detail`,
    `created_at`,
    `updated_at`,
    `consume_time`
  )
VALUES
  (
    2,
    1,
    0,
    'Error: Nest could not find admin element (this provider does not exist in the current context)',
    '2021-11-08 08:15:00.173449',
    '2021-11-08 08:15:00.173449',
    0
  );
INSERT INTO
  `sys_task_log` (
    `id`,
    `task_id`,
    `status`,
    `detail`,
    `created_at`,
    `updated_at`,
    `consume_time`
  )
VALUES
  (
    3,
    2,
    0,
    'Error: Nest could not find admin element (this provider does not exist in the current context)',
    '2021-11-08 08:15:00.207366',
    '2021-11-08 08:15:00.207366',
    0
  );
INSERT INTO
  `sys_task_log` (
    `id`,
    `task_id`,
    `status`,
    `detail`,
    `created_at`,
    `updated_at`,
    `consume_time`
  )
VALUES
  (
    4,
    3,
    0,
    'Error: Nest could not find admin element (this provider does not exist in the current context)',
    '2021-11-08 08:15:00.223586',
    '2021-11-08 08:15:00.223586',
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_user
# ------------------------------------------------------------

INSERT INTO
  `sys_user` (
    `id`,
    `department_id`,
    `name`,
    `username`,
    `password`,
    `nick_name`,
    `head_img`,
    `email`,
    `phone`,
    `remark`,
    `status`,
    `created_at`,
    `updated_at`,
    `psalt`
  )
VALUES
  (
    1,
    1,
    'ruitao',
    'admin',
    '96a53c80849ed669dc5b5d29cdf968ea',
    '',
    '/logo.png',
    'qa894178522@qq.com',
    '15622472425',
    NULL,
    1,
    '2021-11-07 09:26:14.849628',
    '2021-11-08 08:51:50.000000',
    'LZZ4Fss9GNr485yqj0ImeT8PQI2EBnQx'
  );
INSERT INTO
  `sys_user` (
    `id`,
    `department_id`,
    `name`,
    `username`,
    `password`,
    `nick_name`,
    `head_img`,
    `email`,
    `phone`,
    `remark`,
    `status`,
    `created_at`,
    `updated_at`,
    `psalt`
  )
VALUES
  (
    2,
    2,
    'godo',
    'test001',
    'U2FsdGVkX1+iVR+kHHErkPNInZiV27Mpk4pFL8uhtTQ=',
    '',
    '',
    'godo@godo.im',
    '',
    '',
    0,
    '2021-11-07 09:26:14.849628',
    '2021-11-07 11:26:25.000000',
    ''
  );
INSERT INTO
  `sys_user` (
    `id`,
    `department_id`,
    `name`,
    `username`,
    `password`,
    `nick_name`,
    `head_img`,
    `email`,
    `phone`,
    `remark`,
    `status`,
    `created_at`,
    `updated_at`,
    `psalt`
  )
VALUES
  (
    3,
    2,
    'godoadmin',
    'godoadmin',
    'U2FsdGVkX18tvghStliPvPopFZQiILUrZhNk3mUs2jA=',
    '',
    NULL,
    '',
    '',
    '',
    1,
    '2021-11-07 09:26:14.849628',
    '2021-11-07 11:26:54.000000',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sys_user_role
# ------------------------------------------------------------

INSERT INTO
  `sys_user_role` (
    `id`,
    `user_id`,
    `role_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    '2021-11-07 09:26:15.351457',
    '2021-11-07 09:26:15.394510'
  );
INSERT INTO
  `sys_user_role` (
    `id`,
    `user_id`,
    `role_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    2,
    2,
    '2021-11-07 11:26:25.641339',
    '2021-11-07 11:26:25.641339'
  );
INSERT INTO
  `sys_user_role` (
    `id`,
    `user_id`,
    `role_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    3,
    2,
    '2021-11-07 11:26:54.208837',
    '2021-11-07 11:26:54.208837'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

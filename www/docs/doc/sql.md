### 表清单

| 序号  | 数据表 | 名称  |
| --- | --- | --- |
| 1 | rt_achievement | 业绩表 |
| 2 | rt_admin | 管理员表 |
| 3 | rt_admin_auth | 管理权限表 |
| 4 | rt_admin_log | 管理操作日志 |
| 5 | rt_admin_map | 管理员权限映射表 |
| 6 | rt_admin_oplog | 管理操作日志 |
| 7 | rt_admin_viewlog | 管理员查看日志 |
| 8 | rt_area | 区域表 |
| 9 | rt_article | 文章 |
| 10 | rt_cate | 系统分类表 |
| 11 | rt_category | 文章分类 |
| 12 | rt_city | 城市表 |
| 13 | rt_company | 公司表 |
| 14 | rt_config | 系统配置表 |
| 15 | rt_crons | 系统计划任务表 |
| 16 | rt_error | 系统错误日志表 |
| 17 | rt_form | 系统表单 |
| 18 | rt_group | 集团表 |
| 19 | rt_group_map | 集团下属关系表 |
| 20 | rt_group_note | 集团公告表 |
| 21 | rt_manager_change | 员工转店记录 |
| 22 | rt_manager_log | 管理操作日志 |
| 23 | rt_manager_map | 员工归属表 |
| 24 | rt_manger | 员工表 |
| 25 | rt_manger_auth | 员工权限表 |
| 26 | rt_menu | 系统菜单 |
| 27 | rt_msg | 待办消息表 |
| 28 | rt_order | 订单表 |
| 29 | rt_order_back | 作废单 |
| 30 | rt_order_log | 订单日志表 |
| 31 | rt_order_refund | 退款单 |
| 32 | rt_order_service | 消耗单 |
| 33 | rt_product | 商品表 |
| 34 | rt_product_compose | 组合商品 |
| 35 | rt_product_param | 商品规格单位字典 |
| 36 | rt_product_price | 商品区间价 |
| 37 | rt_set | 系统配置表 |
| 38 | rt_set_cate | 系统配置分类表 |
| 39 | rt_sms | 系统短信表 |
| 40 | rt_store | 门店表 |
| 41 | rt_sys_cate | 系统总分类表 |
| 42 | rt_user | 客户表 |
| 43 | rt_user_level | 用户等级表 |

---

#### rt_achievement-业绩表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | achievement_id |  | int(10) unsigned | NO | PRI | null |
| 2 | order_id | 订单id | int(10) unsigned | YES |  | 0 |
| 3 | product_id | 商品id | int(10) unsigned | YES |  | 0 |
| 4 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 5 | store_id | 店铺id | int(10) unsigned | YES |  | 0 |
| 6 | manager_id | 员工id | int(10) unsigned | YES |  | 0 |
| 7 | money | 实际业绩 | decimal(10,2) unsigned | YES |  | 0.00 |
| 8 | all_money | 订单总额 | decimal(10,2) unsigned | YES |  | 0.00 |
| 9 | add_time | 添加时间 | int(10) unsigned | YES |  | null |
| 10 | update_time | 发放时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_achievement`;
 CREATE TABLE `rt_achievement` (
  `achievement_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned DEFAULT '0' COMMENT '订单id',
  `product_id` int(10) unsigned DEFAULT '0' COMMENT '商品id',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `store_id` int(10) unsigned DEFAULT '0' COMMENT '店铺id',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '员工id',
  `money` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '实际业绩',
  `all_money` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '订单总额',
  `add_time` int(10) unsigned DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '发放时间',
  PRIMARY KEY (`achievement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='业绩表'
```

---

#### rt_admin-管理员表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | admin_id | 唯一标志 | int(10) | NO | PRI | 0 |
| 2 | username | 用户名 | varchar(50) | NO | UNI | null |
| 3 | password | 密码 | varchar(32) | NO |  | null |
| 4 | salt | 密码钥匙 | varchar(32) | NO |  | null |
| 6 | add_time | 添加时间 | int(10) | NO |  | 0 |
| 7 | name | 真实姓名 | varchar(100) | YES |  | null |
| 8 | mobile | 手机号 | int(10) | YES | UNI | null |
| 9 | status | 状态1正常0禁用 | tinyint(2) | NO |  | 1 |
| 10 | login_time | 登录时间 | int(10) | YES |  | 0 |
| 11 | login_num | 登录次数 | int(10) | YES |  | 0 |
| 12 | update_time | 更新时间 | int(10) | YES |  | 0 |
| 5 | role_id | 角色id | int(10) | NO |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_admin`;
 CREATE TABLE `rt_admin` (
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表'
```

---

#### rt_admin_auth-管理权限表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | name |  | varchar(255) | YES |  | null |
| 3 | rules |  | text | YES |  | null |
| 4 | status | 是否可用0可用1不可用 | tinyint(2) unsigned | YES |  | 0 |
| 5 | remark | 描述 | varchar(255) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_admin_auth`;
 CREATE TABLE `rt_admin_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理权限表'
```

---

#### rt_admin_log-管理操作日志

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id | ID | int(10) unsigned | NO | PRI | null |
| 2 | admin_id | 管理员账号 | int(10) unsigned | NO |  | null |
| 3 | log | 日志名称 | varchar(255) | NO |  | null |
| 4 | data | 返回记录 | text | YES |  | null |
| 5 | ip | IP地址 | varchar(64) | YES |  | null |
| 6 | agent | 客户端信息 | varchar(255) | YES |  | null |
| 7 | url | 地址 | varchar(255) | YES |  | null |
| 8 | method | 方法 | varchar(100) | YES |  | null |
| 9 | addtime | 添加时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理操作日志'
```

---

#### rt_admin_map-管理员权限映射表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | map_id |  | int(10) unsigned | NO | PRI | null |
| 2 | admin_id |  | int(10) unsigned | NO | MUL | null |
| 3 | auth_id |  | int(10) unsigned | NO |  | null |
| 4 | type | 0角色1集团2公司3门店4部门5区域 | tinyint(3) unsigned | NO |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_admin_map`;
 CREATE TABLE `rt_admin_map` (
  `map_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) unsigned NOT NULL,
  `auth_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0角色1集团2公司3门店4部门5区域',
  PRIMARY KEY (`map_id`),
  UNIQUE KEY `admin_id` (`admin_id`,`auth_id`,`type`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员权限映射表'
```

---

#### rt_admin_oplog-管理操作日志

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id | ID | int(10) unsigned | NO | PRI | null |
| 2 | admin_id | 管理员账号 | int(10) unsigned | NO |  | null |
| 3 | log | 日志名称 | varchar(255) | NO |  | null |
| 4 | data | 返回记录 | text | YES |  | null |
| 5 | ip | IP地址 | varchar(64) | YES |  | null |
| 6 | agent | 客户端信息 | varchar(255) | YES |  | null |
| 7 | url | 地址 | varchar(255) | YES |  | null |
| 8 | method | 方法 | varchar(100) | YES |  | null |
| 9 | addtime | 添加时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理操作日志'
```

---

#### rt_admin_viewlog-管理员查看日志

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id | ID | int(10) unsigned | NO | PRI | null |
| 2 | admin_id | 管理员账号 | int(10) unsigned | NO |  | null |
| 3 | log | 日志名称 | varchar(255) | NO |  | null |
| 4 | ip | IP地址 | varchar(64) | YES |  | null |
| 5 | agent | 客户端信息 | varchar(255) | YES |  | null |
| 6 | url | 地址 | varchar(255) | YES |  | null |
| 7 | method | 方法 | varchar(100) | YES |  | null |
| 8 | addtime | 添加时间 | int(10) unsigned | YES |  | 0 |
| 9 | leavetime | 离开时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员查看日志'
```

---

#### rt_area-区域表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | area_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 区域名称 | varchar(255) | YES |  | null |
| 3 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 4 | address | 地址 | varchar(255) | YES |  | null |
| 5 | city_id | 上级城市id | int(10) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_area`;
 CREATE TABLE `rt_area` (
  `area_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '区域名称',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `city_id` int(10) DEFAULT NULL COMMENT '上级城市id',
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='区域表'
```

---

#### rt_article-文章

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id | ID | int(11) unsigned | NO | PRI | null |
| 2 | category_id | 分类:id:title | int(11) | NO |  | null |
| 3 | title | 文章名 | varchar(128) | NO |  | null |
| 4 | desc_content |  | varchar(255) | NO |  | null |
| 5 | image |  | varchar(255) | YES |  | null |
| 6 | content | 内容 | text | NO |  | null |
| 7 | author | 作者:id:name | varchar(32) | NO |  | null |
| 8 | show_switch | 展示:1=展示,0=隐藏 | tinyint(1) | NO |  | 1 |
| 9 | show_time |  | datetime | YES |  | null |
| 10 | up_time |  | datetime | YES |  | CURRENT_TIMESTAMP |
| 11 | add_time |  | datetime | YES |  | CURRENT_TIMESTAMP |


创建代码

```js
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
  `show_time` int(10) unsigned DEFAULT '0',
  `up_time` int(10) unsigned DEFAULT '0',
  `add_time` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章'
```

---

#### rt_cate-系统分类表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | pid | 上级id | int(10) | YES |  | 0 |
| 3 | sid | 系统类型id | int(10) | YES |  | 0 |
| 4 | fid | 系统分类标志 | int(10) | YES |  | null |
| 5 | lid | 层级 | int(10) | YES |  | 0 |
| 6 | name | 名称 | varchar(255) | YES |  | null |
| 7 | desc | 描述 | text | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统分类表'
```

---

#### rt_category-文章分类

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id | ID | int(11) unsigned | NO | PRI | null |
| 2 | name | 分类名称 | varchar(255) | NO |  | null |
| 3 | status | 是否使用，预留 | tinyint(2) | YES |  | 0 |
| 4 | ctype | 分类类型 1新闻2账户类型3账户日志来源 | tinyint(3) | YES |  | 1 |
| 5 | desc | 其他附加配置 | text | YES |  | null |
| 6 | flag | 分类标志，同一分类不能重复 | int(10) | NO |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_category`;
 CREATE TABLE `rt_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '分类名称',
  `status` tinyint(2) DEFAULT '0' COMMENT '是否使用，预留',
  `ctype` tinyint(3) DEFAULT '1' COMMENT '分类类型 1新闻2账户类型3账户日志来源',
  `desc` text CHARACTER SET utf8 COMMENT '其他附加配置',
  `flag` int(10) NOT NULL DEFAULT '0' COMMENT '分类标志，同一分类不能重复',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章分类'
```

---

#### rt_city-城市表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | city_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 城市名称 | varchar(255) | YES |  | null |
| 3 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 4 | address | 地址 | varchar(255) | YES |  | null |
| 5 | company_id | 上级公司id | int(10) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_city`;
 CREATE TABLE `rt_city` (
  `city_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市名称',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `company_id` int(10) DEFAULT NULL COMMENT '上级公司id',
  PRIMARY KEY (`city_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='城市表'
```

---

#### rt_company-公司表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | company_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 公司名称 | varchar(255) | YES |  | null |
| 3 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 4 | address | 地址 | varchar(255) | YES |  | null |
| 5 | parent_id | 上级公司id | int(10) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_company`;
 CREATE TABLE `rt_company` (
  `company_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司名称',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `parent_id` int(10) DEFAULT NULL COMMENT '上级公司id',
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公司表'
```

---

#### rt_config-系统配置表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | key |  | varchar(128) | YES | UNI | null |
| 3 | name |  | varchar(128) | YES |  | null |
| 4 | val |  | text | YES |  | null |
| 5 | isrun |  | tinyint(2) | YES |  | 1 |
| 6 | param |  | text | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表'
```

---

#### rt_crons-系统计划任务表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 任务名称 | varchar(64) | NO |  | null |
| 3 | interval | 执行间隔 毫秒为单位 | varchar(128) | YES |  | null |
| 4 | immediate | 是否立即执行 | tinyint(1) | YES |  | 1 |
| 5 | handle | 执行路径 | varchar(128) | YES | UNI | null |
| 6 | enable | 是否开启 | tinyint(1) | YES |  | 1 |
| 7 | type | one执行一次all一直执行 | varchar(128) | YES |  | null |
| 8 | addtime | 添加时间 | int(10) | YES |  | 0 |
| 9 | uptime | 更新时间 | bigint(20) | YES |  | 0 |
| 10 | nexttime | 下次执行时间 | bigint(20) | YES |  | 0 |
| 11 | runtime | 每次执行的时间 | bigint(20) | YES |  | 0 |
| 12 | runtype | 执行类型0为间隔执行1为系统执行crontab | tinyint(1) | YES |  | 0 |
| 13 | cron | Runtype为1时不能为空 如0 */1 * * * | varchar(255) | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统计划任务表'
```

---

#### rt_error-系统错误日志表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | name |  | varchar(255) | YES |  | null |
| 3 | url |  | varchar(255) | YES |  | null |
| 4 | msg |  | text | YES |  | null |
| 5 | addtime |  | int(10) unsigned | YES |  | 0 |
| 6 | admin_id |  | int(10) unsigned | YES |  | 0 |
| 5 | add_time |  | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_error`;
 CREATE TABLE `rt_error` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msg` text COLLATE utf8mb4_unicode_ci,
  `addtime` int(10) unsigned DEFAULT '0',
  `admin_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统错误日志表'
```

---

#### rt_form-系统表单

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | name |  | varchar(255) | YES |  | null |
| 3 | key |  | varchar(255) | YES |  | null |
| 4 | data |  | text | YES |  | null |
| 5 | get_url |  | varchar(255) | YES |  | null |
| 6 | post_url |  | varchar(255) | YES |  | null |
| 7 | form_path |  | varchar(255) | YES |  | null |
| 8 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 9 | link_id | 回写id | int(10) unsigned | YES |  | 0 |
| 10 | link_name | 回写表名 | varchar(255) | YES |  | 0 |
| 11 | link_field | 回写字段 | varchar(255) | YES |  | null |
| 12 | params_get |  | varchar(255) | YES |  | null |
| 13 | params_post |  | varchar(255) | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统表单'
```

---

#### rt_group-集团表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | group_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 集团名称 | varchar(255) | YES | UNI | null |
| 3 | address | 集团地址 | varchar(255) | YES |  | null |
| 4 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 5 | manager_id | 主管理员id | int(10) unsigned | YES |  | 0 |
| 6 | admin_id | 审核或添加管理员id | int(10) | YES |  | null |
| 7 | store_num | 可控门店数 | int(10) unsigned | YES |  | 0 |
| 8 | end_time | 结束时间 | int(10) unsigned | YES |  | 0 |
| 9 | start_time | 开始时间 | int(10) unsigned | YES |  | 0 |
| 10 | status | 0正常1过期2禁用3删除 | tinyint(2) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='集团表'
```

---

#### rt_group_map-集团下属关系表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | cate_id |  | int(10) unsigned | NO | PRI | null |
| 2 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 3 | parent_id | 上级id | int(10) | YES |  | null |
| 4 | name | 名称 | varchar(255) | YES |  | null |
| 5 | type | 类型0公司1城市2区域3门店 | tinyint(2) unsigned | YES |  | 0 |
| 6 | manager_id | 操作员id | int(10) | YES |  | null |
| 7 | add_time | 添加时间 | int(10) unsigned | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='集团下属关系表'
```

---

#### rt_group_note-集团公告表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | note_id |  | int(10) unsigned | NO | PRI | null |
| 2 | title | 标题 | varchar(255) | YES |  | null |
| 3 | content | 内容 | text | YES |  | null |
| 4 | group_id | 集团id | int(10) | YES |  | null |
| 5 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 6 | manager_id | 添加人 | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_group_note`;
 CREATE TABLE `rt_group_note` (
  `note_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT '内容',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `manager_id` int(10) unsigned DEFAULT '0' COMMENT '添加人',
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='集团公告表'
```

---

#### rt_manager_change-员工转店记录

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | manager_id | 员工id | int(10) unsigned | YES |  | null |
| 3 | type | 类型1申请转店2授权转店3禁止 | int(255) unsigned | YES |  | 1 |
| 4 | msg | 标记 | varchar(255) | YES |  | null |
| 5 | add_time | 时间 | int(10) unsigned | YES |  | null |
| 6 | mgr_id | 审核人 | int(10) | YES |  | null |
| 7 | update_time | 审核时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工转店记录'
```

---

#### rt_manager_log-管理操作日志

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id | ID | int(10) unsigned | NO | PRI | null |
| 2 | manager_id | 管理员账号 | int(10) unsigned | NO |  | null |
| 3 | log | 日志名称 | varchar(255) | NO |  | null |
| 4 | data | 返回记录 | text | YES |  | null |
| 5 | ip | IP地址 | varchar(64) | YES |  | null |
| 6 | agent | 客户端信息 | varchar(255) | YES |  | null |
| 7 | url | 地址 | varchar(255) | YES |  | null |
| 8 | method | 方法 | varchar(100) | YES |  | null |
| 9 | addtime | 添加时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理操作日志'
```

---

#### rt_manager_map-员工归属表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | manager_id |  | int(10) unsigned | NO | PRI | null |
| 2 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 3 | company_ids | 公司归集id | varchar(255) | YES |  | null |
| 4 | city_ids | 城市归集id | varchar(255) | YES |  | null |
| 5 | store_ids | 门店归集id | varchar(255) | YES |  | null |
| 6 | position_ids | 岗位归集id | varchar(255) | YES |  | null |
| 7 | role_ids | 角色归集id | varchar(255) | YES |  | null |
| 8 | strore_id | 主门店id | int(10) unsigned | YES |  | 0 |
| 9 | role_id | 主角色id | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工归属表'
```

---

#### rt_manger-员工表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | manger_id | 唯一标志 | int(10) unsigned | NO | PRI | null |
| 2 | username | 用户名 | varchar(50) | NO | MUL | null |
| 3 | password | 密码 | varchar(32) | NO |  | null |
| 4 | salt | 密码钥匙 | varchar(32) | NO |  | null |
| 5 | role_id | 角色id | int(10) | NO |  | 0 |
| 6 | add_time | 添加时间 | int(10) | NO |  | 0 |
| 7 | name | 真实姓名 | varchar(100) | YES |  | null |
| 8 | mobile | 手机号 | int(10) | YES | MUL | null |
| 9 | status | 状态1正常0禁用 | tinyint(2) | NO |  | 1 |
| 10 | login_time | 登录时间 | int(10) | YES |  | 0 |
| 11 | login_num | 登录次数 | int(10) | YES |  | 0 |
| 12 | update_time | 更新时间 | int(10) | YES |  | 0 |
| 13 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 14 | rules | 权限，可单独设立 | text | YES |  | null |
| 15 | usercode | 员工编号 | varchar(255) | NO | MUL | null |


创建代码

```js
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
  UNIQUE KEY `username` (`username`,`group_id`) USING BTREE,
  UNIQUE KEY `mobile` (`mobile`,`group_id`) USING BTREE,
  UNIQUE KEY `usercode` (`usercode`,`group_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工表'
```

---

#### rt_manger_auth-员工权限表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | name |  | varchar(255) | YES |  | null |
| 3 | rules |  | text | YES |  | null |
| 4 | group_id | 集团id | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_manger_auth`;
 CREATE TABLE `rt_manger_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工权限表'
```

---

#### rt_menu-系统菜单

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | title |  | varchar(255) | YES |  | null |
| 3 | route | 权限标志 | varchar(255) | YES | MUL | null |
| 4 | href | 前端地址 | varchar(255) | YES |  | null |
| 5 | type | 0目录1菜单2按钮3权限 | tinyint(2) | YES |  | 0 |
| 6 | order_num | 排序 | int(10) | YES |  | 0 |
| 6 | icon |  | varchar(255) | YES |  | null |
| 8 | open_type |  | varchar(255) | YES |  | null |
| 8 | pid |  | int(10) | YES |  | 0 |
| 9 | lid |  | tinyint(3) | YES |  | 1 |
| 11 | ifshow | 是否显示0显示1不显示 | tinyint(3) unsigned | YES |  | 0 |
| 2 | name |  | varchar(255) | YES |  | null |
| 3 | url | 权限标志 | varchar(255) | YES |  | null |
| 4 | ismenu | 0目录1菜单2按钮 | tinyint(2) | YES |  | 0 |
| 5 | order |  | int(5) | YES |  | 0 |
| 7 | target |  | varchar(255) | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统菜单'
```

---

#### rt_msg-待办消息表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | msg_id |  | int(10) | NO | PRI | null |
| 2 | msg | 消息 | varchar(255) | YES |  | null |
| 3 | url | 跳转地址 | varchar(255) | YES |  | null |
| 4 | type | 类型 | tinyint(3) | YES |  | null |
| 5 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 6 | update_time | 阅读时间 | int(10) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_msg`;
 CREATE TABLE `rt_msg` (
  `msg_id` int(10) NOT NULL,
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '消息',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '跳转地址',
  `type` tinyint(3) DEFAULT NULL COMMENT '类型',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) DEFAULT NULL COMMENT '阅读时间',
  PRIMARY KEY (`msg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='待办消息表'
```

---

#### rt_order-订单表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | order_id |  | int(10) unsigned | NO | PRI | null |
| 2 | order_num | 订单编号 | varchar(100) | YES | UNI | null |
| 3 | product_id | 商品id | int(10) unsigned | NO |  | 0 |
| 4 | group_id | 集团id | int(10) | NO |  | null |
| 5 | need_pay | 应付 | decimal(10,2) | NO |  | null |
| 6 | true_pay | 实付 | decimal(10,2) | NO |  | null |
| 7 | has_use | 已消费金额 | decimal(10,2) | YES |  | null |
| 8 | status | 0未支付2已支付1审核中3作废4退款5关闭 | tinyint(3) unsigned | NO |  | 0 |
| 9 | user_id | 用户id | int(10) unsigned | NO |  | 0 |
| 10 | manager_id | 员工id | int(10) | NO |  | null |
| 11 | mgr_id | 审核员id | int(10) | YES |  | null |
| 12 | type | 0正常订单1业务订单2作废单3退款单 | tinyint(3) unsigned | NO |  | 0 |
| 13 | store_id | 店铺id | int(10) unsigned | YES |  | 0 |
| 14 | pay_type | 支付方式 | varchar(255) | NO |  | null |
| 15 | order_from | 订单来源 | varchar(255) | YES |  | null |
| 16 | add_time | 添加时间 | int(10) | YES |  | null |
| 17 | pay_time | 支付时间 | int(10) | YES |  | null |
| 18 | check_time | 审核时间 | int(10) | YES |  | null |
| 19 | achievement | 总支付业绩 | decimal(10,2) | YES |  | null |
| 20 | service_num | 服务次数 | int(10) unsigned | YES |  | 0 |
| 21 | service_use | 已用次数 | int(10) unsigned | YES |  | 0 |
| 22 | remark | 标记 | varchar(255) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_order`;
 CREATE TABLE `rt_order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_num` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '订单编号',
  `product_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品id',
  `group_id` int(10) NOT NULL COMMENT '集团id',
  `need_pay` decimal(10,2) NOT NULL COMMENT '应付',
  `true_pay` decimal(10,2) NOT NULL COMMENT '实付',
  `has_use` decimal(10,2) DEFAULT NULL COMMENT '已消费金额',
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
  `achievement` decimal(10,2) DEFAULT NULL COMMENT '总支付业绩',
  `service_num` int(10) unsigned DEFAULT '0' COMMENT '服务次数',
  `service_use` int(10) unsigned DEFAULT '0' COMMENT '已用次数',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标记',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_num` (`order_num`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表'
```

---

#### rt_order_back-作废单

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | back_id |  | int(10) unsigned | NO | PRI | null |
| 2 | order_id | 订单id | int(10) | YES |  | null |
| 3 | add_time | 添加时间 | int(10) | YES |  | null |
| 4 | reason | 原因 | varchar(255) | YES |  | null |
| 5 | mgr_id | 作废人 | int(10) | YES |  | null |
| 6 | manager_id | 归属人 | int(10) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_order_back`;
 CREATE TABLE `rt_order_back` (
  `back_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) DEFAULT NULL COMMENT '订单id',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '原因',
  `mgr_id` int(10) DEFAULT NULL COMMENT '作废人',
  `manager_id` int(10) DEFAULT NULL COMMENT '归属人',
  PRIMARY KEY (`back_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作废单'
```

---

#### rt_order_log-订单日志表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | log_id |  | int(10) unsigned | NO | PRI | null |
| 2 | order_id | 订单id | int(10) | YES |  | null |
| 3 | mgr_id | 操作人 | int(10) | YES |  | null |
| 4 | add_time | 操作时间 | int(10) | YES |  | null |
| 5 | remark | 标记 | varchar(255) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_order_log`;
 CREATE TABLE `rt_order_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) DEFAULT NULL COMMENT '订单id',
  `mgr_id` int(10) DEFAULT NULL COMMENT '操作人',
  `add_time` int(10) DEFAULT NULL COMMENT '操作时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标记',
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单日志表'
```

---

#### rt_order_refund-退款单

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | refund_id |  | int(10) unsigned | NO | PRI | null |
| 2 | order_id | 订单编号 | int(10) unsigned | YES |  | 0 |
| 3 | user_id | 用户id | int(10) unsigned | YES |  | 0 |
| 4 | store_id | 店铺id | int(10) unsigned | YES |  | 0 |
| 5 | group_id | 集团id | int(10) | YES |  | null |
| 6 | mgr_id | 操作人id | int(10) unsigned | YES |  | 0 |
| 7 | manager_id | 归属人id | int(10) | YES |  | null |
| 8 | reason | 退款原因 | varchar(255) | YES |  | null |
| 9 | has_pay | 实际支付金额 | decimal(10,2) | YES |  | null |
| 10 | has_use | 已消耗金额 | decimal(10,2) | YES |  | null |
| 11 | need_pay | 应退款金额 | decimal(10,2) | YES |  | null |
| 12 | true_pay | 实际退款金额 | decimal(10,2) | YES |  | null |
| 13 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 14 | check_time | 审核时间 | int(10) | YES |  | null |
| 15 | check_uid | 审核人 | int(10) | YES |  | null |
| 16 | type | 状态0提交审核1审核通过2驳回 | tinyint(3) unsigned | YES |  | 0 |


创建代码

```js
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
  `has_pay` decimal(10,2) DEFAULT NULL COMMENT '实际支付金额',
  `has_use` decimal(10,2) DEFAULT NULL COMMENT '已消耗金额',
  `need_pay` decimal(10,2) DEFAULT NULL COMMENT '应退款金额',
  `true_pay` decimal(10,2) DEFAULT NULL COMMENT '实际退款金额',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `check_time` int(10) DEFAULT NULL COMMENT '审核时间',
  `check_uid` int(10) DEFAULT NULL COMMENT '审核人',
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '状态0提交审核1审核通过2驳回',
  PRIMARY KEY (`refund_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='退款单'
```

---

#### rt_order_service-消耗单

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | service_id |  | int(10) unsigned | NO | PRI | null |
| 2 | order_id |  | int(10) | YES |  | null |
| 3 | service_num | 消耗的次数 | int(10) | YES |  | null |
| 4 | product_id | 商品id | int(10) | YES |  | null |
| 5 | group_id | 集团id | int(10) | YES |  | null |
| 6 | store_id | 商品id | int(10) | YES |  | null |
| 7 | add_time | 添加时间 | int(10) | YES |  | null |
| 8 | update_time | 更新时间 | int(10) | YES |  | null |
| 9 | manager_id | 员工id | int(10) | YES |  | null |
| 10 | user_id | 用户id | int(10) | YES |  | null |
| 11 | remark | 标记 | varchar(255) | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消耗单'
```

---

#### rt_product-商品表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | product_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 名称 | varchar(255) | NO |  | null |
| 3 | type | 类型0商品1消耗品2组合商品 | tinyint(2) unsigned | NO |  | 0 |
| 4 | code | 编码 | varchar(255) | YES |  | null |
| 5 | format | 规格 | varchar(255) | YES |  | null |
| 6 | format_id | 规格id | int(10) unsigned | YES |  | 0 |
| 7 | unit | 单位 | decimal(10,2) | YES |  | null |
| 8 | unit_id | 单位id | int(10) unsigned | YES |  | 0 |
| 9 | stock | 库存 | int(10) unsigned | YES |  | 0 |
| 10 | price | 价格 | decimal(10,2) | YES |  | null |
| 11 | price_one | 单个售价 | decimal(10,2) unsigned | YES |  | 0.00 |
| 12 | price_low | 最低售价 | decimal(10,2) | YES |  | null |
| 13 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 14 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 15 | update_time | 更新时间 | int(10) unsigned | YES |  | 0 |
| 16 | status | 状态0正常1下架 | tinyint(2) unsigned | NO |  | 0 |
| 17 | manager_id | 添加人id | int(10) unsigned | NO |  | 0 |
| 18 | service_num | 服务次数 | int(10) unsigned | YES |  | 0 |
| 19 | remark | 标签 | varchar(255) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_product`;
 CREATE TABLE `rt_product` (
  `product_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '类型0商品1消耗品2组合商品',
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编码',
  `format` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '规格',
  `format_id` int(10) unsigned DEFAULT '0' COMMENT '规格id',
  `unit` decimal(10,2) DEFAULT NULL COMMENT '单位',
  `unit_id` int(10) unsigned DEFAULT '0' COMMENT '单位id',
  `stock` int(10) unsigned DEFAULT '0' COMMENT '库存',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `price_one` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '单个售价',
  `price_low` decimal(10,2) DEFAULT NULL COMMENT '最低售价',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '集团id',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '状态0正常1下架',
  `manager_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加人id',
  `service_num` int(10) unsigned DEFAULT '0' COMMENT '服务次数',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标签',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表'
```

---

#### rt_product_compose-组合商品

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | compose_id |  | int(10) unsigned | NO | PRI | null |
| 2 | product_id | 商品主id | int(10) | YES |  | null |
| 3 | pro_id | 组合商品id | int(10) | YES |  | null |
| 4 | service_num | 服务次数 | int(10) | YES |  | null |
| 5 | price | 价格 | decimal(10,2) unsigned | YES |  | 0.00 |
| 6 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_product_compose`;
 CREATE TABLE `rt_product_compose` (
  `compose_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) DEFAULT NULL COMMENT '商品主id',
  `pro_id` int(10) DEFAULT NULL COMMENT '组合商品id',
  `service_num` int(10) DEFAULT NULL COMMENT '服务次数',
  `price` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '价格',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`compose_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='组合商品'
```

---

#### rt_product_param-商品规格单位字典

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | param_id |  | int(10) unsigned | NO | PRI | null |
| 2 | type | 类别0规格1单位 | tinyint(3) unsigned | YES |  | 0 |
| 3 | name | 名称 | varchar(255) | YES |  | null |
| 4 | group_id | 集团id | int(10) | YES |  | null |
| 5 | add_time | 添加时间 | int(10) unsigned | YES |  | 0 |
| 6 | manager_id | 添加人 | int(10) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_product_param`;
 CREATE TABLE `rt_product_param` (
  `param_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '类别0规格1单位',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `add_time` int(10) unsigned DEFAULT '0' COMMENT '添加时间',
  `manager_id` int(10) DEFAULT NULL COMMENT '添加人',
  PRIMARY KEY (`param_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品规格单位字典'
```

---

#### rt_product_price-商品区间价

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | price_id |  | int(10) unsigned | NO | PRI | null |
| 2 | price | 价格 | decimal(10,2) unsigned | YES |  | 0.00 |
| 3 | strore_id | 门店id | int(10) unsigned | YES | MUL | 0 |
| 4 | group_id | 集团id | int(10) | YES |  | null |
| 5 | product_id | 商品id | int(10) | YES |  | null |
| 6 | can_edit | 是否可改价0可改1不可改 | tinyint(2) unsigned | YES |  | 0 |
| 7 | service_num | 服务次数 | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_product_price`;
 CREATE TABLE `rt_product_price` (
  `price_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '价格',
  `strore_id` int(10) unsigned DEFAULT '0' COMMENT '门店id',
  `group_id` int(10) DEFAULT NULL COMMENT '集团id',
  `product_id` int(10) DEFAULT NULL COMMENT '商品id',
  `can_edit` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可改价0可改1不可改',
  `service_num` int(10) unsigned DEFAULT '0' COMMENT '服务次数',
  PRIMARY KEY (`price_id`),
  UNIQUE KEY `product_id` (`strore_id`,`group_id`,`product_id`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品区间价'
```

---

#### rt_set-系统配置表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | key | 键值 | varchar(128) | NO | UNI | null |
| 3 | name | 名称 | varchar(128) | YES |  | null |
| 4 | val | 值 | text | YES |  | null |
| 5 | enable | 状态 | tinyint(2) | YES |  | 1 |
| 6 | remark |  | varchar(255) | YES |  | null |
| 7 | form_id | 表单id | int(10) unsigned | NO |  | 0 |
| 8 | form_path |  | varchar(255) | YES |  | null |
| 9 | params |  | varchar(255) | YES |  | null |


创建代码

```js
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表'
```

---

#### rt_set_cate-系统配置分类表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | key | 唯一标志 | varchar(100) | YES | MUL | 0 |
| 3 | name | 名称 | varchar(255) | YES |  | null |
| 4 | remark | 描述 | varchar(255) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_set_cate`;
 CREATE TABLE `rt_set_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置分类表'
```

---

#### rt_sms-系统短信表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | phone |  | bigint(12) unsigned | YES |  | null |
| 3 | sendtime |  | int(10) unsigned | YES |  | 0 |
| 4 | endtime |  | int(10) unsigned | YES |  | 0 |
| 5 | num |  | int(10) unsigned | YES |  | 0 |


创建代码

```js
DROP TABLE IF EXISTS `rt_sms`;
 CREATE TABLE `rt_sms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone` bigint(12) unsigned DEFAULT NULL,
  `sendtime` int(10) unsigned DEFAULT '0',
  `endtime` int(10) unsigned DEFAULT '0',
  `num` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统短信表'
```

---

#### rt_store-门店表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | store_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 门店名称 | varchar(255) | YES |  | null |
| 3 | address | 门店地址 | varchar(255) | YES |  | null |
| 4 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 5 | city_id | 城市id | int(10) unsigned | YES |  | 0 |
| 6 | company_id | 公司id | int(10) unsigned | YES |  | 0 |
| 7 | area_id | 区域id | int(10) unsigned | YES |  | 0 |
| 8 | status | 0正常1关闭 | tinyint(2) unsigned | YES |  | 0 |
| 9 | type | 0直营1渠道 | tinyint(2) unsigned | YES |  | 0 |
| 10 | add_time | 添加时间 | int(10) | YES |  | null |
| 11 | manager_id | 添加人id | int(10) unsigned | YES |  | 0 |


创建代码

```js
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='门店表'
```

---

#### rt_sys_cate-系统总分类表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | id |  | int(10) unsigned | NO | PRI | null |
| 2 | key | 唯一标志 | varchar(100) | YES | MUL | 0 |
| 3 | name | 名称 | varchar(255) | YES |  | null |
| 4 | desc | 描述 | text | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_sys_cate`;
 CREATE TABLE `rt_sys_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '唯一标志',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `desc` text COLLATE utf8mb4_unicode_ci COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统总分类表'
```

---

#### rt_user-客户表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | user_id | 唯一标志 | int(10) unsigned | NO | PRI | null |
| 2 | username | 用户名 | varchar(50) | NO |  | null |
| 3 | password | 密码,默认111111 | varchar(32) | NO |  | null |
| 4 | salt | 密码钥匙 | varchar(32) | NO |  | null |
| 5 | level_id | 用户等级 | int(6) | YES |  | null |
| 6 | balance | 用户积分 | decimal(10,2) | YES |  | null |
| 7 | add_time | 添加时间 | int(10) | NO |  | 0 |
| 8 | name | 真实姓名 | varchar(100) | YES |  | null |
| 9 | mobile | 手机号 | int(10) | YES |  | null |
| 10 | status | 状态1正常0禁用 | tinyint(2) | NO |  | 1 |
| 11 | login_time | 登录时间 | int(10) | YES |  | 0 |
| 12 | login_num | 登录次数 | int(10) | YES |  | 0 |
| 13 | update_time | 更新时间 | int(10) | YES |  | 0 |
| 14 | group_id | 集团id | int(10) unsigned | YES |  | 0 |
| 15 | blone_id | 归属id | int(10) unsigned | YES |  | 0 |
| 16 | manager_id | 添加人id | int(10) unsigned | YES |  | 0 |
| 17 | all_use | 用户总支付 | decimal(10,2) unsigned | YES |  | 0.00 |
| 18 | remark | 标签 | varchar(255) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_user`;
 CREATE TABLE `rt_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码,默认111111',
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码钥匙',
  `level_id` int(6) DEFAULT NULL COMMENT '用户等级',
  `balance` decimal(10,2) DEFAULT NULL COMMENT '用户积分',
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
  `all_use` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '用户总支付',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标签',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户表'
```

---

#### rt_user_level-用户等级表

| 排序  | 字段名 | 名称  | 类型  | 是否为空 | 索引  | 默认值 |
| --- | --- | --- | --- | ---- | --- | --- |
| 1 | level_id |  | int(10) unsigned | NO | PRI | null |
| 2 | name | 名称 | varchar(255) | YES |  | null |
| 3 | balance | 需要达到的积分 | decimal(10,2) | YES |  | null |


创建代码

```js
DROP TABLE IF EXISTS `rt_user_level`;
 CREATE TABLE `rt_user_level` (
  `level_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `balance` decimal(10,2) DEFAULT NULL COMMENT '需要达到的积分',
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户等级表'
```

---

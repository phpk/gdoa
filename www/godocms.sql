/*
 Navicat Premium Data Transfer

 Source Server         : mysql57
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : localhost:8889
 Source Schema         : godocms

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 27/07/2023 15:46:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rt_approve
-- ----------------------------
DROP TABLE IF EXISTS `rt_approve`;
CREATE TABLE `rt_approve` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `table` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表名',
  `field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '字段名',
  `user_id` int(10) DEFAULT NULL COMMENT '申请人id',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `group_id` int(10) unsigned DEFAULT '0',
  `info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '内容列表',
  `list` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '列表地址',
  `back` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '回调地址',
  `ref_id` int(10) unsigned DEFAULT '0' COMMENT '关联id/一表多状态使用',
  `type` tinyint(4) unsigned DEFAULT '1' COMMENT '类型1表单2预算3合同4客户5周报6库存',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批流引擎';

-- ----------------------------
-- Records of rt_approve
-- ----------------------------
BEGIN;
INSERT INTO `rt_approve` VALUES (1, '出差审批', 'form_data', 'status', 1, '2023-03-27 09:50:52', '2023-04-06 17:02:09', '出差审批', 1, 'form/approveDataInfo', 'form/approveDataList', '', 7, 1);
INSERT INTO `rt_approve` VALUES (2, '预算审批', 'purchase', 'status', 1, '2023-03-27 09:54:21', '2023-04-04 17:02:59', '', 1, 'purchase/approveDataInfo', 'purchase/approveDataList', '', 0, 2);
INSERT INTO `rt_approve` VALUES (3, '合同审批', 'contract', 'status', 1, '2023-03-27 09:57:35', '2023-04-04 17:02:49', 'tesdt', 1, 'contract/approveDataInfo', 'contract/approveDataList', '', 0, 3);
INSERT INTO `rt_approve` VALUES (4, '请假审批', 'form_data', 'status', 1, '2023-04-04 13:37:48', '2023-04-06 17:02:12', '', 1, 'form/approveDataInfo', 'form/approveDataList', '', 14, 1);
INSERT INTO `rt_approve` VALUES (5, '加班审批', 'form_data', 'status', 1, '2023-04-06 17:02:48', '2023-04-06 17:02:48', '', 1, 'form/approveDataInfo', 'form/approveDataList', '', 15, 1);
INSERT INTO `rt_approve` VALUES (6, '采购审批', 'purchase_list', 'status', 1, '2023-06-30 09:31:48', '2023-06-30 14:54:33', '', 1, 'purchase/buyDataInfo', 'purchase/buyeDataList', '', 0, 6);
COMMIT;

-- ----------------------------
-- Table structure for rt_approve_auth
-- ----------------------------
DROP TABLE IF EXISTS `rt_approve_auth`;
CREATE TABLE `rt_approve_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `approve_id` int(10) unsigned DEFAULT '0',
  `status_id` int(10) DEFAULT NULL,
  `op_id` int(10) unsigned DEFAULT '0' COMMENT '操作人id',
  `user_id` int(10) DEFAULT NULL COMMENT '添加人id',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uid` (`approve_id`,`status_id`,`op_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批流权限';

-- ----------------------------
-- Records of rt_approve_auth
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_approve_list
-- ----------------------------
DROP TABLE IF EXISTS `rt_approve_list`;
CREATE TABLE `rt_approve_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `op_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `type` tinyint(4) unsigned DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '添加用户',
  `group_id` int(10) unsigned DEFAULT '0',
  `val` int(10) unsigned DEFAULT '0' COMMENT '当前值',
  `approve_id` int(10) unsigned DEFAULT '0',
  `status_id` int(10) unsigned DEFAULT '0',
  `ref_id` int(10) DEFAULT NULL COMMENT '表单id',
  `data_id` int(10) unsigned DEFAULT '0' COMMENT '数据id',
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '状态0未操作1通过2打回',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户提交remark',
  `table` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表名',
  `field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '字段名',
  `status_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approve_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '通过remark',
  `back_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '打回remark',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批列表';

-- ----------------------------
-- Records of rt_approve_list
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_approve_msg
-- ----------------------------
DROP TABLE IF EXISTS `rt_approve_msg`;
CREATE TABLE `rt_approve_msg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_user_id` int(10) unsigned DEFAULT '0',
  `type` tinyint(4) unsigned DEFAULT '1',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `group_id` int(10) unsigned DEFAULT '0',
  `isread` tinyint(2) unsigned DEFAULT '0' COMMENT '0未读1已读',
  `list_id` int(10) unsigned DEFAULT '0',
  `ref_id` int(10) unsigned DEFAULT '0',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `msg_type` tinyint(3) unsigned DEFAULT '0' COMMENT '消息类型0消息1代办2通知',
  PRIMARY KEY (`id`),
  KEY `to_user_id` (`to_user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审计流消息';

-- ----------------------------
-- Records of rt_approve_msg
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_approve_status
-- ----------------------------
DROP TABLE IF EXISTS `rt_approve_status`;
CREATE TABLE `rt_approve_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `approve_id` int(10) unsigned DEFAULT '0',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '状态名',
  `val` int(10) unsigned DEFAULT '0' COMMENT '状态值',
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '状态颜色',
  `user_id` int(10) DEFAULT NULL COMMENT '添加人id',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `group_id` int(10) unsigned DEFAULT '0',
  `back_val` int(10) DEFAULT NULL,
  `to_val` int(10) DEFAULT NULL,
  `to_msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '审核通过消息',
  `back_msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '打回消息',
  `my_msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '发我的消息',
  `user_list` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ding_notice` tinyint(2) unsigned DEFAULT '0' COMMENT '钉钉通知0不通知1通知',
  `pass_type` tinyint(3) unsigned DEFAULT '0' COMMENT '0严格模式1一票通过2少数服从多数',
  `back_type` tinyint(3) unsigned DEFAULT '0' COMMENT '0严格模式1一票通过2少数服从多数',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `val` (`approve_id`,`val`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批流状态';

-- ----------------------------
-- Records of rt_approve_status
-- ----------------------------
BEGIN;
INSERT INTO `rt_approve_status` VALUES (1, 2, '部门审核', 2, 'layui-btn layui-btn-primary', 1, '2023-03-27 13:14:49', '2023-07-27 09:51:05', '', 1, 1, 3, '您的预算申请通过了{{username}}的审核', '您的预算申请被{{username}}打回啦', '您有新的预算需要审核', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (5, 2, '经理审核', 3, 'layui-btn layui-btn-warm', 1, '2023-03-27 13:42:18', '2023-07-27 09:51:08', '', 1, 2, 4, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 1, 0, 0);
INSERT INTO `rt_approve_status` VALUES (6, 3, '经理审核', 2, 'layui-btn layui-btn-primary', 1, '2023-03-27 13:56:45', '2023-07-27 09:51:10', '', 1, 1, 3, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (9, 3, 'test', 3, 'layui-btn layui-btn-warm', 0, '2023-04-04 11:49:32', '2023-07-27 09:51:13', '', 1, 2, 4, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (12, 2, '委员会审批', 4, 'layui-btn layui-btn-primary', 1, '2023-04-04 14:42:01', '2023-07-27 09:51:17', '', 1, 3, 5, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (13, 4, '部门经理审核', 2, 'layui-btn layui-btn-primary', 1, '2023-04-04 14:54:30', '2023-07-27 09:51:21', '', 1, 1, 3, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (14, 4, '总经理审核', 3, 'layui-btn layui-btn-primary', 1, '2023-04-04 14:54:49', '2023-07-27 09:51:23', '', 1, 2, 4, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 1, 1);
INSERT INTO `rt_approve_status` VALUES (15, 4, '最后审批', 4, 'layui-btn layui-btn-primary', 1, '2023-04-06 16:47:55', '2023-07-27 09:51:25', '', 1, 3, 5, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (16, 5, '组长审批', 2, 'layui-btn layui-btn-primary', 1, '2023-04-07 08:10:15', '2023-07-27 09:51:27', '', 1, 1, 3, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (17, 5, '部门经理审批', 3, 'layui-btn layui-btn-primary', 1, '2023-04-07 08:10:39', '2023-07-27 09:51:29', '', 1, 2, 4, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (18, 5, '总经理审批', 4, 'layui-btn layui-btn-primary', 1, '2023-04-07 08:37:35', '2023-07-27 09:51:33', '', 1, 3, 5, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
INSERT INTO `rt_approve_status` VALUES (19, 6, '经理审批', 2, 'layui-btn', 1, '2023-06-30 09:34:23', '2023-07-27 09:51:35', '', 1, 1, 3, '您的申请被{{username}}审核通过了', '您的申请被{{username}}打回了', '您有新的消息需要审核了', '', 0, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for rt_area
-- ----------------------------
DROP TABLE IF EXISTS `rt_area`;
CREATE TABLE `rt_area` (
  `id` int(10) NOT NULL COMMENT '区号',
  `name` varchar(40) DEFAULT NULL COMMENT '地区名称',
  `pid` int(11) DEFAULT NULL COMMENT '上级id',
  `status` tinyint(2) unsigned DEFAULT '1' COMMENT '状态1为可用0为不可用',
  `order_num` int(10) unsigned DEFAULT '0' COMMENT '排序',
  `have_child` tinyint(2) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='地区表';

-- ----------------------------
-- Records of rt_area
-- ----------------------------
BEGIN;
INSERT INTO `rt_area` VALUES (110000, '北京市', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (110100, '东城区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (110200, '西城区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (110500, '朝阳区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (110600, '丰台区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (110700, '石景山区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (110800, '海淀区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (110900, '门头沟区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111100, '房山区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111200, '通州区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111300, '顺义区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111400, '昌平区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111500, '大兴区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111600, '怀柔区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (111700, '平谷区', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (112800, '密云县', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (112900, '延庆县', 110000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120000, '天津市', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (120100, '和平区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120200, '河东区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120300, '河西区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120400, '南开区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120500, '河北区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120600, '红桥区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (120900, '滨海新区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (121000, '东丽区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (121100, '西青区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (121200, '津南区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (121300, '北辰区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (121400, '武清区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (121500, '宝坻区', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (122100, '宁河县', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (122300, '静海县', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (122500, '蓟县', 120000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130000, '河北省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130100, '石家庄市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130101, '市辖区', 130100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130102, '长安区', 130101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130103, '桥东区', 130101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130104, '桥西区', 130101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130105, '新华区', 130101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130107, '井陉矿区', 130101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130108, '裕华区', 130101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130121, '井陉县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130123, '正定县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130124, '栾城县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130125, '行唐县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130126, '灵寿县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130127, '高邑县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130128, '深泽县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130129, '赞皇县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130130, '无极县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130131, '平山县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130132, '元氏县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130133, '赵县', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130181, '辛集市', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130182, '藁城市', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130183, '晋州市', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130184, '新乐市', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130185, '鹿泉市', 130100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130200, '唐山市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130201, '市辖区', 130200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130202, '路南区', 130201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130203, '路北区', 130201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130204, '古冶区', 130201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130205, '开平区', 130201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130207, '丰南区', 130201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130208, '丰润区', 130201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130223, '滦县', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130224, '滦南县', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130225, '乐亭县', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130227, '迁西县', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130229, '玉田县', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130230, '唐海县', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130281, '遵化市', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130283, '迁安市', 130200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130300, '秦皇岛市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130301, '海港区', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130303, '山海关区', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130304, '北戴河区', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130321, '青龙满族自治县', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130322, '昌黎县', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130323, '抚宁县', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130324, '卢龙县', 130300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130400, '邯郸市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130401, '市辖区', 130400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130402, '邯山区', 130401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130403, '丛台区', 130401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130404, '复兴区', 130401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130406, '峰峰矿区', 130401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130421, '邯郸县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130423, '临漳县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130424, '成安县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130425, '大名县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130426, '涉县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130427, '磁县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130428, '肥乡县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130429, '永年县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130430, '邱县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130431, '鸡泽县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130432, '广平县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130433, '馆陶县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130434, '魏县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130435, '曲周县', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130481, '武安市', 130400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130500, '邢台市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130501, '市辖区', 130500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130502, '桥东区', 130501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130503, '桥西区', 130501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130521, '邢台县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130522, '临城县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130523, '内丘县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130524, '柏乡县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130525, '隆尧县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130526, '任县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130527, '南和县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130528, '宁晋县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130529, '巨鹿县', 130529, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130530, '新河县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130531, '广宗县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130532, '平乡县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130533, '威县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130534, '清河县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130535, '临西县', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130581, '南宫市', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130582, '沙河市', 130500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130600, '保定市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130601, '新市区', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130603, '北市区', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130604, '南市区', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130621, '满城县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130622, '清苑县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130623, '涞水县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130624, '阜平县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130625, '徐水县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130626, '定兴县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130627, '唐县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130628, '高阳县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130629, '容城县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130630, '涞源县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130631, '望都县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130632, '安新县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130633, '易县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130634, '曲阳县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130635, '蠡县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130636, '顺平县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130637, '博野县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130638, '雄县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130681, '涿州市', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130682, '定州市', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130683, '安国市', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130684, '高碑店市', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130685, '白沟新城县', 130600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130700, '张家口市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130701, '市辖区', 130700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130702, '桥东区', 130701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130703, '桥西区', 130701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130705, '宣化区', 130701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130706, '下花园区', 130701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130721, '宣化县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130722, '张北县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130723, '康保县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130724, '沽源县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130725, '尚义县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130726, '蔚县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130727, '阳原县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130728, '怀安县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130729, '万全县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130730, '怀来县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130731, '涿鹿县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130732, '赤城县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130733, '崇礼县', 130700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130800, '承德市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130801, '市辖区', 130800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130802, '双桥区', 130801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130803, '双滦区', 130801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130804, '鹰手营子矿区', 130801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130821, '承德县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130822, '兴隆县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130823, '平泉县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130824, '滦平县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130825, '隆化县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130826, '丰宁满族自治县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130827, '宽城满族自治县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130828, '围场满族蒙古族自治县', 130800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130900, '沧州市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130901, '市辖区', 130900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (130902, '新华区', 130901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130903, '运河区', 130901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130921, '沧县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130922, '青县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130923, '东光县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130924, '海兴县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130925, '盐山县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130926, '肃宁县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130927, '南皮县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130928, '吴桥县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130929, '献县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130930, '孟村回族自治县', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130981, '泊头市', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130982, '任丘市', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130983, '黄骅市', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (130984, '河间市', 130900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131000, '廊坊市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (131001, '市辖区', 131000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (131002, '安次区', 131001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131003, '广阳区', 131001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131022, '固安县', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131023, '永清县', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131024, '香河县', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131025, '大城县', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131026, '文安县', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131028, '大厂回族自治县', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131081, '霸州市', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131082, '三河市', 131000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131100, '衡水市', 130000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (131101, '市辖区', 131100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (131102, '桃城区', 131101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131121, '枣强县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131122, '武邑县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131123, '武强县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131124, '饶阳县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131125, '安平县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131126, '故城县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131127, '景县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131128, '阜城县', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131181, '冀州市', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (131182, '深州市', 131100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140000, '山西省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140100, '太原市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140101, '市辖区', 140100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140105, '小店区', 140101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140106, '迎泽区', 140101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140107, '杏花岭区', 140101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140108, '尖草坪区', 140101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140109, '万柏林区', 140101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140110, '晋源区', 140101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140121, '清徐县', 140100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140122, '阳曲县', 140100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140123, '娄烦县', 140100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140181, '古交市', 140100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140200, '大同市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140201, '市辖区', 140200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140202, '城区', 140201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140203, '矿区', 140201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140211, '南郊区', 140201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140212, '新荣区', 140201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140221, '阳高县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140222, '天镇县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140223, '广灵县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140224, '灵丘县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140225, '浑源县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140226, '左云县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140227, '大同县', 140200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140300, '阳泉市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140301, '市辖区', 140300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140302, '城区', 140301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140303, '矿区', 140301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140311, '郊区', 140301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140321, '平定县', 140300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140322, '盂县', 140300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140400, '长治市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140401, '市辖区', 140400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140402, '城区', 140401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140411, '郊区', 140401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140421, '长治县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140423, '襄垣县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140424, '屯留县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140425, '平顺县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140426, '黎城县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140427, '壶关县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140428, '长子县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140429, '武乡县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140430, '沁县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140431, '沁源县', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140481, '潞城市', 140400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140500, '晋城市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140501, '市辖区', 140500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140502, '城区', 140501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140521, '沁水县', 140500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140522, '阳城县', 140500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140524, '陵川县', 140500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140525, '泽州县', 140500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140581, '高平市', 140500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140600, '朔州市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140601, '市辖区', 140600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140602, '朔城区', 140601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140603, '平鲁区', 140601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140621, '山阴县', 140600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140622, '应县', 140600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140623, '右玉县', 140600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140624, '怀仁县', 140600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140700, '晋中市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140701, '市辖区', 140700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140702, '榆次区', 140701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140721, '榆社县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140722, '左权县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140723, '和顺县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140724, '昔阳县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140725, '寿阳县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140726, '太谷县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140727, '祁县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140728, '平遥县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140729, '灵石县', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140781, '介休市', 140700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140800, '运城市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140801, '市辖区', 140800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140802, '盐湖区', 140801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140821, '临猗县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140822, '万荣县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140823, '闻喜县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140824, '稷山县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140825, '新绛县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140826, '绛县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140827, '垣曲县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140828, '夏县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140829, '平陆县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140830, '芮城县', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140881, '永济市', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140882, '河津市', 140800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140900, '忻州市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (140901, '忻府区', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140921, '定襄县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140922, '五台县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140923, '代县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140924, '繁峙县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140925, '宁武县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140926, '静乐县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140927, '神池县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140928, '五寨县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140929, '岢岚县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140930, '河曲县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140931, '保德县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140932, '偏关县', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (140981, '原平市', 140900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141000, '临汾市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (141001, '市辖区', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141002, '尧都区', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141021, '曲沃县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141022, '翼城县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141023, '襄汾县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141024, '洪洞县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141025, '古县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141026, '安泽县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141027, '浮山县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141028, '吉县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141029, '乡宁县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141030, '大宁县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141031, '隰县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141032, '永和县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141033, '蒲县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141034, '汾西县', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141081, '侯马市', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141082, '霍州市', 141000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141100, '吕梁市', 140000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (141101, '市辖区', 141100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (141102, '离石区', 141101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141121, '文水县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141122, '交城县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141123, '兴县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141124, '临县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141125, '柳林县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141126, '石楼县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141127, '岚县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141128, '方山县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141129, '中阳县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141130, '交口县', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141181, '孝义市', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (141182, '汾阳市', 141100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150000, '内蒙古自治区', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150100, '呼和浩特市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150101, '市辖区', 150100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150102, '新城区', 150101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150103, '回民区', 150101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150104, '玉泉区', 150101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150105, '赛罕区', 150101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150121, '土默特左旗', 150100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150122, '托克托县', 150100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150123, '和林格尔县', 150100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150124, '清水河县', 150100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150125, '武川县', 150100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150200, '包头市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150201, '市辖区', 150200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150202, '东河区', 150201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150203, '昆都仑区', 150201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150204, '青山区', 150201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150205, '石拐区', 150201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150206, '白云矿区', 150201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150207, '九原区', 150201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150221, '土默特右旗', 150200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150222, '固阳县', 150200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150223, '达尔罕茂明安联合旗', 150200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150300, '乌海市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150301, '市辖区', 150300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150302, '海勃湾区', 150301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150303, '海南区', 150301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150304, '乌达区', 150301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150400, '赤峰市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150401, '市辖区', 150400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150402, '红山区', 150401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150403, '元宝山区', 150401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150404, '松山区', 150401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150421, '阿鲁科尔沁旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150422, '巴林左旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150423, '巴林右旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150424, '林西县', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150425, '克什克腾旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150426, '翁牛特旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150428, '喀喇沁旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150429, '宁城县', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150430, '敖汉旗', 150400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150500, '通辽市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150501, '市辖区', 150500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150502, '科尔沁区', 150501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150521, '科尔沁左翼中旗', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150522, '科尔沁左翼后旗', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150523, '开鲁县', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150524, '库伦旗', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150525, '奈曼旗', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150526, '扎鲁特旗', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150581, '霍林郭勒市', 150500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150600, '鄂尔多斯市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150602, '东胜区', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150621, '达拉特旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150622, '准格尔旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150623, '鄂托克前旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150624, '鄂托克旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150625, '杭锦旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150626, '乌审旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150627, '伊金霍洛旗', 150600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150700, '呼伦贝尔市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150701, '市辖区', 150700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150702, '海拉尔区', 150701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150721, '阿荣旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150722, '莫力达瓦达斡尔族自治旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150723, '鄂伦春自治旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150724, '鄂温克族自治旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150725, '陈巴尔虎旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150726, '新巴尔虎左旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150727, '新巴尔虎右旗', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150781, '满洲里市', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150782, '牙克石市', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150783, '扎兰屯市', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150784, '额尔古纳市', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150785, '根河市', 150700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150800, '巴彦淖尔市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150801, '市辖区', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150802, '临河区', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150821, '五原县', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150822, '磴口县', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150823, '乌拉特前旗', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150824, '乌拉特中旗', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150825, '乌拉特后旗', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150826, '杭锦后旗', 150800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150900, '乌兰察布市', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150901, '市辖区', 150900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (150902, '集宁区', 150901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150921, '卓资县', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150922, '化德县', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150923, '商都县', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150924, '兴和县', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150925, '凉城县', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150926, '察哈尔右翼前旗', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150927, '察哈尔右翼中旗', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150928, '察哈尔右翼后旗', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150929, '四子王旗', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (150981, '丰镇市', 150900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152200, '兴安盟', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (152201, '乌兰浩特市', 152200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152202, '阿尔山市', 152200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152221, '科尔沁右翼前旗', 152200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152222, '科尔沁右翼中旗', 152200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152223, '扎赉特旗', 152200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152224, '突泉县', 152200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152500, '锡林郭勒盟', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (152501, '二连浩特市', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152502, '锡林浩特市', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152522, '阿巴嘎旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152523, '苏尼特左旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152524, '苏尼特右旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152525, '东乌珠穆沁旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152526, '西乌珠穆沁旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152527, '太仆寺旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152528, '镶黄旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152529, '正镶白旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152530, '正蓝旗', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152531, '多伦县', 152500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152900, '阿拉善盟', 150000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (152921, '阿拉善左旗', 152900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152922, '阿拉善右旗', 152900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (152923, '额济纳旗', 152900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210000, '辽宁省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210100, '沈阳市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210101, '市辖区', 210100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210102, '和平区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210103, '沈河区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210104, '大东区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210105, '皇姑区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210106, '铁西区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210111, '苏家屯区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210112, '东陵区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210113, '新城子区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210114, '于洪区', 210101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210122, '辽中县', 210100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210123, '康平县', 210100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210124, '法库县', 210100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210181, '新民市', 210100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210182, '沈北新区', 210100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210200, '大连市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210201, '市辖区', 210200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210202, '中山区', 210201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210203, '西岗区', 210201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210204, '沙河口区', 210201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210211, '甘井子区', 210201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210212, '旅顺口区', 210201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210213, '金州区', 210201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210224, '长海县', 210200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210281, '瓦房店市', 210200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210282, '普兰店市', 210200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210283, '庄河市', 210200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210300, '鞍山市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210301, '市辖区', 210300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210302, '铁东区', 210301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210303, '铁西区', 210301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210304, '立山区', 210301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210311, '千山区', 210301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210321, '台安县', 210300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210323, '岫岩满族自治县', 210300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210381, '海城市', 210300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210400, '抚顺市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210401, '市辖区', 210400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210402, '新抚区', 210401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210403, '东洲区', 210401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210404, '望花区', 210401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210411, '顺城区', 210401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210421, '抚顺县', 210400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210422, '新宾满族自治县', 210400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210423, '清原满族自治县', 210400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210500, '本溪市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210501, '市辖区', 210500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210502, '平山区', 210501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210503, '溪湖??', 210501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210504, '明山区', 210501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210505, '南芬区', 210501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210521, '本溪满族自治县', 210500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210522, '桓仁满族自治县', 210500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210600, '丹东市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210601, '市辖区', 210600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210602, '元宝区', 210601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210603, '振兴区', 210601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210604, '振安区', 210601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210624, '宽甸满族自治县', 210600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210681, '东港市', 210600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210682, '凤城市', 210600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210700, '锦州市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210701, '市辖区', 210700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210702, '古塔区', 210701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210703, '凌河区', 210701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210711, '太和区', 210701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210726, '黑山县', 210700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210727, '义县', 210700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210781, '凌海市', 210700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210782, '北宁市', 210700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210800, '营口市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210801, '市辖区', 210800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210802, '站前区', 210801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210803, '西市区', 210801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210804, '鲅鱼圈区', 210801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210811, '老边区', 210801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210881, '盖州市', 210800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210882, '大石桥市', 210800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210900, '阜新市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210901, '市辖区', 210900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (210902, '海州区', 210901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210903, '新邱区', 210901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210904, '太平区', 210901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210905, '清河门区', 210901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210911, '细河区', 210901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210921, '阜新蒙古族自治县', 210900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (210922, '彰武县', 210900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211000, '辽阳市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211001, '市辖区', 211000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211002, '白塔区', 211001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211003, '文圣区', 211001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211004, '宏伟区', 211001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211005, '弓长岭区', 211001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211011, '太子河区', 211001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211021, '辽阳县', 211000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211081, '灯塔市', 211000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211100, '盘锦市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211101, '市辖区', 211100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211102, '双台子区', 211101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211103, '兴隆台区', 211101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211121, '大洼县', 211100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211122, '盘山县', 211100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211200, '铁岭市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211201, '市辖区', 211200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211202, '银州区', 211201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211204, '清河区', 211201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211221, '铁岭县', 211200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211223, '西丰县', 211200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211224, '昌图县', 211200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211281, '调兵山市', 211200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211282, '开原市', 211200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211300, '朝阳市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211301, '市辖区', 211300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211302, '双塔区', 211301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211303, '龙城区', 211301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211321, '朝阳县', 211300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211322, '建平县', 211300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211324, '喀喇沁左翼蒙古族自治县', 211300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211381, '北票市', 211300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211382, '凌源市', 211300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211400, '葫芦岛市', 210000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211401, '市辖区', 211400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (211402, '连山区', 211401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211403, '龙港区', 211401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211404, '南票区', 211401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211421, '绥中县', 211400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211422, '建昌县', 211400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (211481, '兴城市', 211400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220000, '吉林省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220100, '长春市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220101, '市辖区', 220100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220102, '南关区', 220101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220103, '宽城区', 220101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220104, '朝阳区', 220101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220105, '二道区', 220101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220106, '绿园区', 220101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220112, '双阳区', 220101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220122, '农安县', 220100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220181, '九台市', 220100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220182, '榆树市', 220100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220183, '德惠市', 220100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220200, '吉林市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220201, '市辖区', 220200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220202, '昌邑区', 220201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220203, '龙潭区', 220201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220204, '船营区', 220201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220211, '丰满区', 220201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220221, '永吉县', 220200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220281, '蛟河市', 220200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220282, '桦甸市', 220200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220283, '舒兰市', 220200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220284, '磐石市', 220200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220300, '四平市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220301, '市辖区', 220300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220302, '铁西区', 220301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220303, '铁东区', 220301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220322, '梨树县', 220300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220323, '伊通满族自治县', 220300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220381, '公主岭市', 220300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220382, '双辽市', 220300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220400, '辽源市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220401, '市辖区', 220400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220402, '龙山区', 220401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220403, '西安区', 220401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220421, '东丰县', 220400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220422, '东辽县', 220400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220500, '通化市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220501, '市辖区', 220500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220502, '东昌区', 220501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220503, '二道江区', 220501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220521, '通化县', 220500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220523, '辉南县', 220500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220524, '柳河县', 220500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220581, '梅河口市', 220500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220582, '集安市', 220500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220600, '白山市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220601, '市辖区', 220600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220602, '八道江区', 220601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220621, '抚松县', 220600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220622, '靖宇县', 220600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220623, '长白朝鲜族自治县', 220600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220625, '江源区', 220600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220681, '临江市', 220600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220700, '松原市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220701, '市辖区', 220700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220702, '宁江区', 220701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220721, '前郭尔罗斯蒙古族自治县', 220700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220722, '长岭县', 220700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220723, '乾安县', 220700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220724, '扶余市', 220700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220800, '白城市', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (220801, '市辖区', 220800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220802, '洮北区', 220800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220821, '镇赉县', 220800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220822, '通榆县', 220800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220881, '洮南市', 220800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (220882, '大安市', 220800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222400, '延边朝鲜族自治州', 220000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (222401, '延吉市', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222402, '图们市', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222403, '敦化市', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222404, '珲春市', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222405, '龙井市', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222406, '和龙市', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222424, '汪清县', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (222426, '安图县', 222400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230000, '黑龙江省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230100, '哈尔滨市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230101, '市辖区', 230100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230102, '道里区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230103, '南岗区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230104, '道外区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230106, '香坊区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230107, '动力区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230108, '平房区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230109, '松北区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230111, '呼兰区', 230101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230123, '依兰县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230124, '方正县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230125, '宾县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230126, '巴彦县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230127, '木兰县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230128, '通河县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230129, '延寿县', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230181, '阿城市', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230182, '双城市', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230183, '尚志市', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230184, '五常市', 230100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230200, '齐齐哈尔市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230201, '市辖区', 230200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230202, '龙沙区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230203, '建华区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230204, '铁锋区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230205, '昂昂溪区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230206, '富拉尔基区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230207, '碾子山区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230208, '梅里斯达斡尔族区', 230201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230221, '龙江县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230223, '依安县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230224, '泰来县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230225, '甘南县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230227, '富裕县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230229, '克山县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230230, '克东县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230231, '拜泉县', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230281, '讷河市', 230200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230300, '鸡西市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230301, '市辖区', 230300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230302, '鸡冠区', 230301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230303, '恒山区', 230301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230304, '滴道区', 230301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230305, '梨树区', 230301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230306, '城子河区', 230301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230307, '麻山区', 230301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230321, '鸡东县', 230300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230381, '虎林市', 230300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230382, '密山市', 230300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230400, '鹤岗市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230401, '市辖区', 230400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230402, '向阳区', 230401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230403, '工农区', 230401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230404, '南山区', 230401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230405, '兴安区', 230401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230406, '东山区', 230401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230407, '兴山区', 230401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230421, '萝北县', 230400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230422, '绥滨县', 230400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230500, '双鸭山市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230501, '市辖区', 230500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230502, '尖山区', 230501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230503, '岭东区', 230501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230505, '四方台区', 230501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230506, '宝山区', 230501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230521, '集贤县', 230500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230522, '友谊县', 230500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230523, '宝清县', 230500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230524, '饶河县', 230500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230600, '大庆市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230601, '市辖区', 230600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230602, '萨尔图区', 230601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230603, '龙凤区', 230601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230604, '让胡路区', 230601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230605, '红岗区', 230601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230606, '大同区', 230601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230621, '肇州县', 230600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230622, '肇源县', 230600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230623, '林甸县', 230600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230624, '杜尔伯特蒙古族自治县', 230600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230700, '伊春市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230701, '市辖区', 230700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230702, '伊春区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230703, '南岔区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230704, '友好区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230705, '西林区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230706, '翠峦区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230707, '新青区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230708, '美溪区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230709, '金山屯区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230710, '五营区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230711, '乌马河区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230712, '汤旺河区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230713, '带岭区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230714, '乌伊岭区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230715, '红星区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230716, '上甘岭区', 230701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230722, '嘉荫县', 230700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230781, '铁力市', 230700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230800, '佳木斯市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230801, '市辖区', 230800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230803, '向阳区', 230801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230804, '前进区', 230801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230805, '东风区', 230801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230811, '郊区', 230801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230822, '桦南县', 230800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230826, '桦川县', 230800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230828, '汤原县', 230800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230833, '抚远县', 230800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230881, '同江市', 230800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230882, '富锦市', 230800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230900, '七台河市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230901, '市辖区', 230900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (230902, '新兴区', 230901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230903, '桃山区', 230901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230904, '茄子河区', 230901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (230921, '勃利县', 230900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231000, '牡丹江市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (231001, '市辖区', 231000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (231002, '东安区', 231001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231003, '阳明区', 231001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231004, '爱民区', 231001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231005, '西安区', 231001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231024, '东宁县', 231000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231025, '林口县', 231000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231081, '绥芬河市', 231000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231083, '海林市', 231000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231084, '宁安市', 231000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231085, '穆棱市', 231000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231100, '黑河市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (231101, '市辖区', 231100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (231102, '爱辉区', 231101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231121, '嫩江县', 231100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231123, '逊克县', 231100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231124, '孙吴县', 231100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231181, '北安市', 231100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231182, '五大连池市', 231100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231200, '绥化市', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (231201, '北林区', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231221, '望奎县', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231222, '兰西县', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231223, '青冈县', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231224, '庆安县', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231225, '明水县', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231226, '绥棱县', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231281, '安达市', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231282, '肇东市', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (231283, '海伦市', 231200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232700, '大兴安岭地区', 230000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (232701, '加格达奇区', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232702, '松岭区', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232703, '新林区', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232704, '呼中区', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232721, '呼玛县', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232722, '塔河县', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (232723, '漠河县', 232700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310000, '上海市', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (310100, '黄浦区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310300, '卢湾区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310400, '徐汇区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310500, '长宁区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310600, '静安区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310700, '普陀区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310800, '闸北区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (310900, '虹口区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311000, '杨浦区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311200, '闵行区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311300, '宝山区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311400, '嘉定区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311500, '浦东新区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311600, '金山区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311700, '松江区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311800, '青浦区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (311900, '南汇区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (312000, '奉贤区', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (313000, '崇明县', 310000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320000, '江苏省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320100, '南京市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320101, '市辖区', 320100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320102, '玄武区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320103, '白下区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320104, '秦淮区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320105, '建邺区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320106, '鼓楼区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320107, '下关区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320111, '浦口区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320113, '栖霞区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320114, '雨花台区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320115, '江宁区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320116, '六合区', 320101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320124, '溧水区', 320100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320125, '高淳区', 320100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320200, '无锡市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320201, '市辖区', 320200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320202, '崇安区', 320201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320203, '南长区', 320201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320204, '北塘区', 320201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320205, '锡山区', 320201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320206, '惠山区', 320201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320211, '滨湖区', 320201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320281, '江阴市', 320200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320282, '宜兴市', 320200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320300, '徐州市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320301, '泉山区', 320300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320302, '鼓楼区', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320303, '云龙区', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320304, '九里区', 320301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320305, '贾汪区', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320321, '丰县', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320322, '沛县', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320323, '铜山县', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320324, '睢宁县', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320381, '新沂市', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320382, '邳州市', 320300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320400, '常州市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320401, '市辖区', 320400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320402, '天宁区', 320401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320404, '钟楼区', 320401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320405, '戚墅堰区', 320401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320411, '新北区', 320401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320412, '武进区', 320401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320481, '溧阳市', 320400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320482, '金坛市', 320400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320500, '苏州市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320501, '市辖区', 320500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320502, '沧浪区', 320501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320503, '平江区', 320501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320504, '金阊区', 320501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320505, '虎丘区', 320501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320506, '吴中区', 320501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320507, '相城区', 320501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320581, '常熟市', 320500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320582, '张家港市', 320500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320583, '昆山市', 320500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320584, '吴江市', 320500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320585, '太仓市', 320500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320600, '南通市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320601, '市辖区', 320600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320602, '崇川区', 320601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320611, '港闸区', 320601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320621, '海安县', 320600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320623, '如东县', 320600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320681, '启东市', 320600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320682, '如皋市', 320600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320683, '通州市', 320600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320684, '海门市', 320600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320700, '连云港市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320701, '市辖区', 320700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320703, '连云区', 320701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320705, '新浦区', 320701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320706, '海州区', 320701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320721, '赣榆县', 320700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320722, '东海县', 320700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320723, '灌云县', 320700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320724, '灌南县', 320700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320800, '淮安市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320801, '市辖区', 320800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320802, '清河区', 320801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320803, '楚州区', 320801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320804, '淮阴区', 320801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320811, '清浦区', 320801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320826, '涟水县', 320800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320829, '洪泽县', 320800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320830, '盱眙县', 320800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320831, '金湖县', 320800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320900, '盐城市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320901, '市辖区', 320900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (320902, '亭湖区', 320901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320903, '盐都区', 320901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320921, '响水县', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320922, '滨海县', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320923, '阜宁县', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320924, '射阳县', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320925, '建湖县', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320981, '东台市', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (320982, '大丰市', 320900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321000, '扬州市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321001, '市辖区', 321000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321002, '广陵区', 321001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321003, '邗江区', 321001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321011, '维扬区', 321001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321023, '宝应县', 321000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321081, '仪征市', 321000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321084, '高邮市', 321000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321088, '江都市', 321000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321100, '镇江市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321101, '市辖区', 321100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321102, '京口区', 321101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321111, '润州区', 321101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321112, '丹徒区', 321101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321181, '丹阳市', 321100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321182, '扬中市', 321100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321183, '句容市', 321100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321200, '泰州市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321201, '市辖区', 321200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321202, '海陵区', 321201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321203, '高港区', 321201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321281, '兴化市', 321200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321282, '靖江市', 321200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321283, '泰兴市', 321200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321284, '姜堰市', 321200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321300, '宿迁市', 320000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321301, '市辖区', 321300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (321302, '宿城区', 321301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321311, '宿豫区', 321301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321322, '沭阳县', 321300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321323, '泗阳县', 321300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (321324, '泗洪县', 321300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330000, '浙江省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330100, '杭州市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330101, '市辖区', 330100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330102, '上城区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330103, '下城区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330104, '江干区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330105, '拱墅区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330106, '西湖区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330108, '滨江区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330109, '萧山区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330110, '余杭区', 330101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330122, '桐庐县', 330100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330127, '淳安县', 330100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330182, '建德市', 330100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330183, '富阳市', 330100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330185, '临安市', 330100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330200, '宁波市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330201, '市辖区', 330200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330203, '海曙区', 330201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330204, '江东区', 330201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330205, '江北区', 330201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330206, '北仑区', 330201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330211, '镇海区', 330201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330212, '鄞州区', 330201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330225, '象山县', 330200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330226, '宁海县', 330200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330281, '余姚市', 330200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330282, '慈溪市', 330200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330283, '奉化市', 330200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330300, '温州市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330301, '市辖区', 330300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330302, '鹿城区', 330301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330303, '龙湾区', 330301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330304, '瓯海区', 330301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330322, '洞头县', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330324, '永嘉县', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330326, '平阳县', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330327, '苍南县', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330328, '文成县', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330329, '泰顺县', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330381, '瑞安市', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330382, '乐清市', 330300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330400, '嘉兴市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330401, '市辖区', 330400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330402, '南湖区', 330401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330411, '秀洲区', 330401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330421, '嘉善县', 330400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330424, '海盐县', 330400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330481, '海宁市', 330400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330482, '平湖市', 330400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330483, '桐乡市', 330400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330500, '湖州市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330501, '市辖区', 330500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330502, '吴兴区', 330501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330503, '南浔区', 330501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330521, '德清县', 330500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330522, '长兴县', 330500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330523, '安吉县', 330500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330600, '绍兴市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330601, '市辖区', 330600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330602, '越城区', 330601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330621, '绍兴县', 330600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330624, '新昌县', 330600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330681, '诸暨市', 330600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330682, '上虞市', 330600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330683, '嵊州市', 330600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330700, '金华市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330701, '市辖区', 330700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330702, '婺城区', 330701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330703, '金东区', 330701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330723, '武义县', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330726, '浦江县', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330727, '磐安县', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330781, '兰溪市', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330782, '义乌市', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330783, '东阳市', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330784, '永康市', 330700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330800, '衢州市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330801, '市辖区', 330800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330802, '柯城区', 330801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330803, '衢江区', 330801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330822, '常山县', 330800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330824, '开化县', 330800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330825, '龙游县', 330800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330881, '江山市', 330800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330900, '舟山市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330901, '市辖区', 330900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (330902, '定海区', 330901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330903, '普陀区', 330901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330921, '岱山县', 330900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (330922, '嵊泗县', 330900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331000, '台州市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (331001, '市辖区', 331000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (331002, '椒江区', 331001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331003, '黄岩区', 331001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331004, '路桥区', 331001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331021, '玉环县', 331000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331022, '三门县', 331000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331023, '天台县', 331000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331024, '仙居县', 331000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331081, '温岭市', 331000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331082, '临海市', 331000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331100, '丽水市', 330000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (331101, '市辖区', 331100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (331102, '莲都区', 331101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331121, '青田县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331122, '缙云县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331123, '遂昌县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331124, '松阳县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331125, '云和县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331126, '庆元县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331127, '景宁畲族自治县', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (331181, '龙泉市', 331100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340000, '安徽省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340100, '合肥市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340101, '市辖区', 340100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340102, '瑶海区', 340101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340103, '庐阳区', 340101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340104, '蜀山区', 340101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340111, '包河区', 340101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340121, '长丰县', 340100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340122, '肥东县', 340100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340123, '肥西县', 340100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340124, '庐江县', 340100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340181, '巢湖市', 340100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340200, '芜湖市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340201, '市辖区', 340200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340202, '镜湖区', 340201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340203, '马塘区', 340201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340207, '鸠江区', 340201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340221, '芜湖县', 340200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340222, '繁昌县', 340200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340223, '南陵县', 340200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340225, '无为县', 340200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340300, '蚌埠市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340301, '市辖区', 340300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340302, '龙子湖区', 340301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340303, '蚌山区', 340301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340304, '禹会区', 340301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340311, '淮上区', 340301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340321, '怀远县', 340300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340322, '五河县', 340300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340323, '固镇县', 340300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340400, '淮南市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340401, '市辖区', 340400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340402, '大通区', 340401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340403, '田家庵区', 340401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340404, '谢家集区', 340401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340405, '八公山区', 340401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340406, '潘集区', 340401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340421, '凤台县', 340400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340500, '马鞍山市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340501, '市辖区', 340500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340502, '金家庄区', 340501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340503, '花山区', 340501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340504, '雨山区', 340501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340521, '当涂县', 340500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340522, '含山县', 340500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340523, '和县', 340500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340600, '淮北市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340601, '市辖区', 340600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340602, '杜集区', 340601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340603, '相山区', 340601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340604, '烈山区', 340601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340621, '濉溪县', 340600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340700, '铜陵市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340701, '市辖区', 340700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340702, '铜官山区', 340701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340703, '狮子山区', 340701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340711, '郊区', 340701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340721, '铜陵县', 340700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340800, '安庆市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340801, '市辖区', 340800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (340802, '迎江区', 340801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340803, '大观区', 340801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340811, '宜秀区', 340801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340822, '怀宁县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340823, '枞阳县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340824, '潜山县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340825, '太湖县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340826, '宿松县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340827, '望江县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340828, '岳西县', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (340881, '桐城市', 340800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341000, '黄山市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341001, '黄山区', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341002, '屯溪区', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341004, '徽州区', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341021, '歙县', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341022, '休宁县', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341023, '黟县', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341024, '祁门县', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341091, '汤口镇', 341000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341100, '滁州市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341101, '市辖区', 341100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341102, '琅琊区', 341101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341103, '南谯区', 341101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341122, '来安县', 341100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341124, '全椒县', 341100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341125, '定远县', 341100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341126, '凤阳县', 341100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341181, '天长市', 341100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341182, '明光市', 341100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341200, '阜阳市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341201, '颍泉区', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341202, '颍州区', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341203, '颍东区', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341221, '临泉县', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341222, '太和县', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341225, '阜南县', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341226, '颍上县', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341282, '界首市', 341200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341300, '宿州市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341301, '市辖区', 341300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341302, '埇桥区', 341301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341321, '砀山县', 341300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341322, '萧县', 341300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341323, '灵璧县', 341300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341324, '泗县', 341300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341402, '居巢区', NULL, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341500, '六安市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341501, '市辖区', 341500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341502, '金安区', 341501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341503, '裕安区', 341501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341521, '寿县', 341500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341522, '霍邱县', 341500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341523, '舒城县', 341500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341524, '金寨县', 341500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341525, '霍山县', 341500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341600, '亳州市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341601, '谯城区', 341600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341621, '涡阳县', 341600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341622, '蒙城县', 341600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341623, '利辛县', 341600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341700, '池州市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341701, '市辖区', 341700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341702, '贵池区', 341701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341721, '东至县', 341700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341722, '石台县', 341700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341723, '青阳县', 341700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341800, '宣城市', 340000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341801, '市辖区', 341800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (341802, '宣州区', 341801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341821, '郎溪县', 341800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341822, '广德县', 341800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341823, '泾县', 341800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341824, '绩溪县', 341800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341825, '旌德县', 341800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (341881, '宁国市', 341800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350000, '福建省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350100, '福州市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350101, '市辖区', 350100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350102, '鼓楼区', 350101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350103, '台江区', 350101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350104, '仓山区', 350101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350105, '马尾区', 350101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350111, '晋安区', 350101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350121, '闽侯县', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350122, '连江县', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350123, '罗源县', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350124, '闽清县', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350125, '永泰县', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350128, '平潭县', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350181, '福清市', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350182, '长乐市', 350100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350200, '厦门市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350201, '市辖区', 350200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350203, '思明区', 350201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350205, '海沧区', 350201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350206, '湖里区', 350201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350211, '集美区', 350201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350212, '同安区', 350201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350213, '翔安区', 350201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350300, '莆田市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350301, '市辖区', 350300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350302, '城厢区', 350301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350303, '涵江区', 350301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350304, '荔城区', 350301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350305, '秀屿区', 350301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350322, '仙游县', 350300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350400, '三明市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350401, '市辖区', 350400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350402, '梅列区', 350401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350403, '三元区', 350401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350421, '明溪县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350423, '清流县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350424, '宁化县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350425, '大田县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350426, '尤溪县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350427, '沙县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350428, '将乐县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350429, '泰宁县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350430, '建宁县', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350481, '永安市', 350400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350500, '泉州市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350501, '市辖区', 350500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350502, '鲤城区', 350501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350503, '丰泽区', 350501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350504, '洛江区', 350501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350505, '泉港区', 350501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350521, '惠安县', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350524, '安溪县', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350525, '永春县', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350526, '德化县', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350527, '金门县', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350581, '石狮市', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350582, '晋江市', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350583, '南安市', 350500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350600, '漳州市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350601, '市辖区', 350600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350602, '芗城区', 350601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350603, '龙文区', 350601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350622, '云霄县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350623, '漳浦县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350624, '诏安县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350625, '长泰县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350626, '东山县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350627, '南靖县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350628, '平和县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350629, '华安县', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350681, '龙海市', 350600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350700, '南平市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350701, '市辖区', 350700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350702, '延平区', 350701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350721, '顺昌县', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350722, '浦城县', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350723, '光泽县', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350724, '松溪县', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350725, '政和县', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350781, '邵武市', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350782, '武夷山市', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350783, '建瓯市', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350784, '建阳市', 350700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350800, '龙岩市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350801, '市辖区', 350800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350802, '新罗区', 350801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350821, '长汀县', 350800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350822, '永定县', 350800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350823, '上杭县', 350800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350824, '武平县', 350800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350825, '连城县', 350800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350881, '漳平市', 350800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350900, '宁德市', 350000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350901, '市辖区', 350900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (350902, '蕉城区', 350901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350921, '霞浦县', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350922, '古田县', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350923, '屏南县', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350924, '寿宁县', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350925, '周宁县', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350926, '柘荣县', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350981, '福安市', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (350982, '福鼎市', 350900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360000, '江西省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360100, '南昌市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360101, '市辖区', 360100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360102, '东湖区', 360101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360103, '西湖区', 360101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360104, '青云谱区', 360101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360105, '湾里区', 360101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360111, '青山湖区', 360101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360121, '南昌县', 360100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360122, '新建县', 360100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360123, '安义县', 360100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360124, '进贤县', 360100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360200, '景德镇市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360201, '市辖区', 360200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360202, '昌江区', 360201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360203, '珠山区', 360201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360222, '浮梁县', 360200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360281, '乐平市', 360200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360300, '萍乡市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360301, '市辖区', 360300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360302, '安源区', 360301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360313, '湘东区', 360301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360321, '莲花县', 360300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360322, '上栗县', 360300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360323, '芦溪县', 360300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360400, '九江市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360401, '市辖区', 360400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360402, '庐山区', 360401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360403, '浔阳区', 360401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360421, '九江县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360423, '武宁县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360424, '修水县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360425, '永修县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360426, '德安县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360427, '星子县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360428, '都昌县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360429, '湖口县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360430, '彭泽县', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360481, '瑞昌市', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360482, '共青城市', 360400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360500, '新余市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360501, '市辖区', 360500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360502, '渝水区', 360501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360521, '分宜县', 360500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360600, '鹰潭市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360601, '市辖区', 360600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360602, '月湖区', 360601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360622, '余江县', 360600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360681, '贵溪市', 360600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360700, '赣州市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360701, '市辖区', 360700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360702, '章贡区', 360701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360721, '赣县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360722, '信丰县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360723, '大余县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360724, '上犹县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360725, '崇义县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360726, '安远县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360727, '龙南县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360728, '定南县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360729, '全南县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360730, '宁都县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360731, '于都县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360732, '兴国县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360733, '会昌县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360734, '寻乌县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360735, '石城县', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360781, '瑞金市', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360782, '南康市', 360700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360800, '吉安市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360801, '市辖区', 360800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360802, '吉州区', 360801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360803, '青原区', 360801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360821, '吉安县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360822, '吉水县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360823, '峡江县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360824, '新干县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360825, '永丰县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360826, '泰和县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360827, '遂川县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360828, '万安县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360829, '安福县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360830, '永新县', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360881, '井冈山市', 360800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360900, '宜春市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360901, '市辖区', 360900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (360902, '袁州区', 360901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360921, '奉新县', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360922, '万载县', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360923, '上高县', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360924, '宜丰县', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360925, '靖安县', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360926, '铜鼓县', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360981, '丰城市', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360982, '樟树市', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (360983, '高安市', 360900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361000, '抚州市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (361001, '市辖区', 361000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (361002, '临川区', 361001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361021, '南城县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361022, '黎川县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361023, '南丰县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361024, '崇仁县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361025, '乐安县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361026, '宜黄县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361027, '金溪县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361028, '资溪县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361029, '东乡县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361030, '广昌县', 361000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361100, '上饶市', 360000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (361101, '市辖区', 361100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (361102, '信州区', 361101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361121, '上饶县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361122, '广丰县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361123, '玉山县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361124, '铅山县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361125, '横峰县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361126, '弋阳县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361127, '余干县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361128, '鄱阳县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361129, '万年县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361130, '婺源县', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (361181, '德兴市', 361100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370000, '山东省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370100, '济南市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370101, '市辖区', 370100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370102, '历下区', 370101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370103, '市中区', 370101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370104, '槐荫区', 370101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370105, '天桥区', 370101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370112, '历城区', 370101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370113, '长清区', 370101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370124, '平阴县', 370100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370125, '济阳县', 370100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370126, '商河县', 370100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370181, '章丘市', 370100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370200, '青岛市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370201, '市辖区', 370200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370202, '市南区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370203, '市北区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370205, '四方区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370211, '黄岛区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370212, '崂山区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370213, '李沧区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370214, '城阳区', 370201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370281, '胶州市', 370200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370282, '即墨市', 370200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370283, '平度市', 370200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370284, '胶南市', 370200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370285, '莱西市', 370200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370300, '淄博市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370301, '市辖区', 370300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370302, '淄川区', 370301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370303, '张店区', 370301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370304, '博山区', 370301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370305, '临淄区', 370301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370306, '周村区', 370301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370321, '桓台县', 370300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370322, '高青县', 370300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370323, '沂源县', 370300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370400, '枣庄市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370401, '市辖区', 370400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370402, '市中区', 370401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370403, '薛城区', 370401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370404, '峄城区', 370401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370405, '台儿庄区', 370401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370406, '山亭区', 370401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370481, '滕州市', 370400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370500, '东营市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370501, '市辖区', 370500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370502, '东营区', 370501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370503, '河口区', 370501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370521, '垦利县', 370500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370522, '利津县', 370500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370523, '广饶县', 370500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370600, '烟台市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370601, '市辖区', 370600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370602, '芝罘区', 370601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370611, '福山区', 370601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370612, '牟平区', 370601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370613, '莱山区', 370601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370634, '长岛县', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370681, '龙口市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370682, '莱阳市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370683, '莱州市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370684, '蓬莱市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370685, '招远市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370686, '栖霞市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370687, '海阳市', 370600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370700, '潍坊市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370701, '市辖区', 370700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370702, '潍城区', 370701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370703, '寒亭区', 370701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370704, '坊子区', 370701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370705, '奎文区', 370701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370724, '临朐县', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370725, '昌乐县', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370781, '青州市', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370782, '诸城市', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370783, '寿光市', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370784, '安丘市', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370785, '高密市', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370786, '昌邑市', 370700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370800, '济宁市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370801, '市辖区', 370800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370802, '市中区', 370801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370811, '任城区', 370801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370826, '微山县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370827, '鱼台县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370828, '金乡县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370829, '嘉祥县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370830, '汶上县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370831, '泗水县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370832, '梁山县', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370881, '曲阜市', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370882, '兖州市', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370883, '邹城市', 370800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370900, '泰安市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (370901, '岱岳区', 370900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370902, '泰山区', 370900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370921, '宁阳县', 370900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370923, '东平县', 370900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370982, '新泰市', 370900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (370983, '肥城市', 370900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371000, '威海市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371001, '市辖区', 371000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371002, '环翠区', 371001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371081, '文登市', 371000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371082, '荣成市', 371000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371083, '乳山市', 371000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371100, '日照市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371101, '市辖区', 371100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371102, '东港区', 371101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371103, '岚山区', 371101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371121, '五莲县', 371100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371122, '莒县', 371100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371200, '莱芜市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371201, '市辖区', 371200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371202, '莱城区', 371201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371203, '钢城区', 371201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371300, '临沂市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371301, '市辖区', 371300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371302, '兰山区', 371301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371311, '罗庄区', 371301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371312, '河东区', 371301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371321, '沂南县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371322, '郯城县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371323, '沂水县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371324, '苍山县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371325, '费县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371326, '平邑县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371327, '莒南县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371328, '蒙阴县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371329, '临沭县', 371300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371400, '德州市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371401, '市辖区', 371400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371402, '德城区', 371401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371421, '陵县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371422, '宁津县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371423, '庆云县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371424, '临邑县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371425, '齐河县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371426, '平原县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371427, '夏津县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371428, '武城县', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371481, '乐陵市', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371482, '禹城市', 371400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371500, '聊城市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371501, '市辖区', 371500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371502, '东昌府区', 371501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371521, '阳谷县', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371522, '莘县', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371523, '茌平县', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371524, '东阿县', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371525, '冠县', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371526, '高唐县', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371581, '临清市', 371500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371600, '滨州市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371601, '市辖区', 371600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371602, '滨城区', 371601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371621, '惠民县', 371600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371622, '阳信县', 371600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371623, '无棣县', 371600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371624, '沾化县', 371600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371625, '博兴县', 371600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371626, '邹平县', 371600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371700, '菏泽市', 370000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371701, '市辖区', 371700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (371702, '牡丹区', 371701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371721, '曹县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371722, '单县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371723, '成武县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371724, '巨野县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371725, '郓城县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371726, '鄄城县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371727, '定陶县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (371728, '东明县', 371700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410000, '河南省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410100, '郑州市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410101, '金水区', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410102, '中原区', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410103, '二七区', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410104, '管城回族区', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410106, '上街区', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410108, '惠济区', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410122, '中牟县', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410181, '巩义市', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410182, '荥阳市', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410183, '新密市', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410184, '新郑市', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410185, '登封市', 410100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410200, '开封市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410201, '市辖区', 410200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410202, '龙亭区', 410201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410203, '顺河回族区', 410201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410204, '鼓楼区', 410201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410205, '禹王台区', 410201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410211, '金明区', 410201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410221, '杞县', 410200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410222, '通许县', 410200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410223, '尉氏县', 410200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410224, '开封县', 410200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410225, '兰考县', 410200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410300, '洛阳市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410301, '市辖区', 410300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410302, '老城区', 410301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410303, '西工区', 410301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410304, '廛河回族区', 410301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410305, '涧西区', 410301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410306, '吉利区', 410301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410307, '洛龙区', 410301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410322, '孟津县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410323, '新安县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410324, '栾川县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410325, '嵩县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410326, '汝阳县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410327, '宜阳县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410328, '洛宁县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410329, '伊川县', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410381, '偃师市', 410300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410400, '平顶山市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410401, '市辖区', 410400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410402, '新华区', 410401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410403, '卫东区', 410401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410404, '石龙区', 410401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410411, '湛河区', 410401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410421, '宝丰县', 410400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410422, '叶县', 410400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410423, '鲁山县', 410400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410425, '郏县', 410400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410481, '舞钢市', 410400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410482, '汝州市', 410400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410500, '安阳市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410501, '市辖区', 410500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410502, '文峰区', 410501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410503, '北关区', 410501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410505, '殷都区', 410501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410506, '龙安区', 410501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410522, '安阳县', 410500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410523, '汤阴县', 410500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410526, '滑县', 410500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410527, '内黄县', 410500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410581, '林州市', 410500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410600, '鹤壁市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410601, '市辖区', 410600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410602, '鹤山区', 410601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410603, '山城区', 410601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410611, '淇滨区', 410601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410621, '浚县', 410600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410622, '淇县', 410600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410700, '新乡市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410701, '市辖区', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410702, '红旗区', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410703, '卫滨区', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410704, '凤泉区', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410711, '牧野区', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410721, '新乡县', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410724, '获嘉县', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410725, '原阳县', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410726, '延津县', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410727, '封丘县', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410728, '长垣县', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410781, '卫辉市', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410782, '辉县市', 410700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410800, '焦作市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410801, '市辖区', 410800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410802, '解放区', 410801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410803, '中站区', 410801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410804, '马村区', 410801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410811, '山阳区', 410801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410821, '修武县', 410800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410822, '博爱县', 410800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410823, '武陟县', 410800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410825, '温县', 410800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410882, '沁阳市', 410800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410883, '孟州市', 410800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410900, '濮阳市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410901, '市辖区', 410900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (410902, '华龙区', 410901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410922, '清丰县', 410900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410923, '南乐县', 410900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410926, '范县', 410900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410927, '台前县', 410900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (410928, '濮阳县', 410900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411000, '许昌市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411001, '市辖区', 411000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411002, '魏都区', 411001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411023, '许昌县', 411000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411024, '鄢陵县', 411000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411025, '襄城县', 411000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411081, '禹州市', 411000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411082, '长葛市', 411000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411100, '漯河市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411101, '召陵区', 411100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411102, '源汇区', 411100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411103, '郾城区', 411100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411121, '舞阳县', 411100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411122, '临颍县', 411100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411200, '三门峡市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411201, '市辖区', 411200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411202, '湖滨区', 411201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411221, '渑池县', 411200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411222, '陕县', 411200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411224, '卢氏县', 411200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411281, '义马市', 411200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411282, '灵宝市', 411200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411300, '南阳市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411301, '市辖区', 411300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411302, '宛城区', 411301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411303, '卧龙区', 411301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411321, '南召县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411322, '方城县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411323, '西峡县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411324, '镇平县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411325, '内乡县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411326, '淅川县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411327, '社旗县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411328, '唐河县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411329, '新野县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411330, '桐柏县', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411381, '邓州市', 411300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411400, '商丘市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411401, '市辖区', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411402, '梁园区', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411403, '睢阳区', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411421, '民权县', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411422, '睢县', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411423, '宁陵县', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411424, '柘城县', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411425, '虞城县', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411426, '夏邑县', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411481, '永城市', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411482, '新区', 411400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411500, '信阳市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411501, '市辖区', 411500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411502, '浉河区', 411501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411503, '平桥区', 411501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411521, '罗山县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411522, '光山县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411523, '新县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411524, '商城县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411525, '固始县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411526, '潢川县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411527, '淮滨县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411528, '息县', 411500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411600, '周口市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411601, '市辖区', 411600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411602, '川汇区', 411601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411621, '扶沟县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411622, '西华县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411623, '商水县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411624, '沈丘县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411625, '郸城县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411626, '淮阳县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411627, '太康县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411628, '鹿邑县', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411681, '项城市', 411600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411700, '驻马店市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411701, '市辖区', 411700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411702, '驿城区', 411701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411721, '西平县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411722, '上蔡县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411723, '平舆县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411724, '正阳县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411725, '确山县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411726, '泌阳县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411727, '汝南县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411728, '遂平县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411729, '新蔡县', 411700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (411800, '济源市', 410000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (411801, '市辖区', 411800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420000, '湖北省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420100, '武汉市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420101, '市辖区', 420100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420102, '江岸区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420103, '江汉区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420104, '硚口区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420105, '汉阳区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420106, '武昌区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420107, '青山区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420111, '洪山区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420112, '东西湖区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420113, '汉南区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420114, '蔡甸区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420115, '江夏区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420116, '黄陂区', 420101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420117, '新洲区', 420100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420200, '黄石市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420201, '市辖区', 420200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420202, '黄石港区', 420201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420203, '西塞山区', 420201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420204, '下陆区', 420201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420205, '铁山区', 420201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420222, '阳新县', 420200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420281, '大冶市', 420200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420300, '十堰市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420301, '市辖区', 420300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420302, '茅箭区', 420301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420303, '张湾区', 420301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420321, '郧县', 420300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420322, '郧西县', 420300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420323, '竹山县', 420300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420324, '竹溪县', 420300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420325, '房县', 420300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420381, '丹江口市', 420300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420500, '宜昌市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420501, '市辖区', 420500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420502, '西陵区', 420501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420503, '伍家岗区', 420501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420504, '点军区', 420501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420505, '猇亭区', 420501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420506, '夷陵区', 420501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420525, '远安县', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420526, '兴山县', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420527, '秭归县', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420528, '长阳土家族自治县', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420529, '五峰土家族自治县', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420581, '宜都市', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420582, '当阳市', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420583, '枝江市', 420500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420600, '襄阳市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420601, '市辖区', 420600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420602, '襄城区', 420601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420606, '樊城区', 420601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420607, '襄州区', 420601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420624, '南漳县', 420600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420625, '谷城县', 420600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420626, '保康县', 420600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420682, '老河口市', 420600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420683, '枣阳市', 420600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420684, '宜城市', 420600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420700, '鄂州市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420701, '市辖区', 420700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420702, '梁子湖区', 420701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420703, '华容区', 420701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420704, '鄂城区', 420701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420800, '荆门市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420801, '市辖区', 420800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420802, '东宝区', 420801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420804, '掇刀区', 420801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420821, '京山县', 420800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420822, '沙洋县', 420800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420881, '钟祥市', 420800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420900, '孝感市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420901, '市辖区', 420900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (420902, '孝南区', 420901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420921, '孝昌县', 420900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420922, '大悟县', 420900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420923, '云梦县', 420900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420981, '应城市', 420900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420982, '安陆市', 420900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (420984, '汉川市', 420900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421000, '荆州市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421001, '市辖区', 421000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421002, '沙市区', 421001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421003, '荆州区', 421001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421022, '公安县', 421000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421023, '监利县', 421000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421024, '江陵县', 421000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421081, '石首市', 421000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421083, '洪湖市', 421000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421087, '松滋市', 421000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421100, '黄冈市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421101, '市辖区', 421100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421102, '黄州区', 421101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421121, '团风县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421122, '红安县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421123, '罗田县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421124, '英山县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421125, '浠水县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421126, '蕲春县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421127, '黄梅县', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421181, '麻城市', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421182, '武穴市', 421100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421200, '咸宁市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421201, '市辖区', 421200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421202, '咸安区', 421201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421221, '嘉鱼县', 421200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421222, '通城县', 421200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421223, '崇阳县', 421200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421224, '通山县', 421200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421281, '赤壁市', 421200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421300, '随州市', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421301, '市辖区', 421300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (421302, '曾都区', 421301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (421381, '广水市', 421300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422800, '恩施土家族苗族自治州', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (422801, '恩施市', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422802, '利川市', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422822, '建始县', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422823, '巴东县', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422825, '宣恩县', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422826, '咸丰县', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422827, '来凤县', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (422828, '鹤峰县', 422800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (429000, '省直辖行政单位', 420000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (429004, '仙桃市', 429000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (429005, '潜江市', 429000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (429006, '天门市', 429000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (429021, '神农架林区', 429000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430000, '湖南省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430100, '长沙市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430101, '市辖区', 430100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430102, '芙蓉区', 430101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430103, '天心区', 430101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430104, '岳麓区', 430101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430105, '开福区', 430101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430111, '雨花区', 430101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430121, '长沙县', 430100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430122, '望城县', 430100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430124, '宁乡县', 430100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430181, '浏阳市', 430100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430200, '株洲市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430201, '市辖区', 430200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430202, '荷塘区', 430201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430203, '芦淞区', 430201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430204, '石峰区', 430201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430211, '天元区', 430201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430221, '株洲县', 430200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430223, '攸县', 430200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430224, '茶陵县', 430200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430225, '炎陵县', 430200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430281, '醴陵市', 430200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430300, '湘潭市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430301, '市辖区', 430300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430302, '雨湖区', 430301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430304, '岳塘区', 430301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430321, '湘潭县', 430300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430381, '湘乡市', 430300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430382, '韶山市', 430300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430400, '衡阳市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430401, '市辖区', 430400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430405, '珠晖区', 430401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430406, '雁峰区', 430401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430407, '石鼓区', 430401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430408, '蒸湘区', 430401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430412, '南岳区', 430401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430421, '衡阳县', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430422, '衡南县', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430423, '衡山县', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430424, '衡东县', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430426, '祁东县', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430481, '耒阳市', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430482, '常宁市', 430400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430500, '邵阳市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430501, '市辖区', 430500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430502, '双清区', 430501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430503, '大祥区', 430501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430511, '北塔区', 430501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430521, '邵东县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430522, '新邵县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430523, '邵阳县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430524, '隆回县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430525, '洞口县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430527, '绥宁县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430528, '新宁县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430529, '城步苗族自治县', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430581, '武冈市', 430500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430600, '岳阳市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430601, '市辖区', 430600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430602, '岳阳楼区', 430601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430603, '云溪区', 430601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430611, '君山区', 430601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430621, '岳阳县', 430600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430623, '华容县', 430600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430624, '湘阴县', 430600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430626, '平江县', 430600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430681, '汨罗市', 430600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430682, '临湘市', 430600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430700, '常德市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430701, '市辖区', 430700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430702, '武陵区', 430701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430703, '鼎城区', 430701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430721, '安乡县', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430722, '汉寿县', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430723, '澧县', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430724, '临澧县', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430725, '桃源县', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430726, '石门县', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430781, '津市市', 430700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430800, '张家界市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430801, '市辖区', 430800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430802, '永定区', 430801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430811, '武陵源区', 430801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430821, '慈利县', 430800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430822, '桑植县', 430800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430900, '益阳市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430901, '市辖区', 430900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (430902, '资阳区', 430901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430903, '赫山区', 430901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430921, '南县', 430900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430922, '桃江县', 430900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430923, '安化县', 430900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (430981, '沅江市', 430900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431000, '郴州市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431001, '市辖区', 431000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431002, '北湖区', 431001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431003, '苏仙区', 431001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431021, '桂阳县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431022, '宜章县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431023, '永兴县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431024, '嘉禾县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431025, '临武县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431026, '汝城县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431027, '桂东县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431028, '安仁县', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431081, '资兴市', 431000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431100, '永州市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431101, '市辖区', 431100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431102, '零陵区', 431101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431103, '冷水滩区', 431101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431121, '祁阳县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431122, '东安县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431123, '双牌县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431124, '道县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431125, '江永县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431126, '宁远县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431127, '蓝山县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431128, '新田县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431129, '江华瑶族自治县', 431100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431200, '怀化市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431201, '市辖区', 431200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431202, '鹤城区', 431201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431221, '中方县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431222, '沅陵县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431223, '辰溪县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431224, '溆浦县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431225, '会同县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431226, '麻阳苗族自治县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431227, '新晃侗族自治县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431228, '芷江侗族自治县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431229, '靖州苗族侗族自治县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431230, '通道侗族自治县', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431281, '洪江市', 431200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431300, '娄底市', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431301, '市辖区', 431300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (431302, '娄星区', 431301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431321, '双峰县', 431300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431322, '新化县', 431300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431381, '冷水江市', 431300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (431382, '涟源市', 431300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433100, '湘西土家族苗族自治州', 430000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (433101, '吉首市', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433122, '泸溪县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433123, '凤凰县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433124, '花垣县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433125, '保靖县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433126, '古丈县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433127, '永顺县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (433130, '龙山县', 433100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440000, '广东省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440100, '广州市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440101, '市辖区', 440100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440103, '荔湾区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440104, '越秀区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440105, '海珠区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440106, '天河区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440111, '白云区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440112, '黄埔区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440113, '番禺区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440114, '花都区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440115, '南沙区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440116, '萝岗区', 440101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440183, '增城市', 440100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440184, '从化市', 440100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440200, '韶关市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440201, '市辖区', 440200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440203, '武江区', 440201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440204, '浈江区', 440201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440205, '曲江区', 440201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440222, '始兴县', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440224, '仁化县', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440229, '翁源县', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440232, '乳源瑶族自治县', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440233, '新丰县', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440281, '乐昌市', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440282, '南雄市', 440200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440300, '深圳市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440301, '市辖区', 440300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440303, '罗湖区', 440301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440304, '福田区', 440301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440305, '南山区', 440301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440306, '宝安区', 440301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440307, '龙岗区', 440301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440308, '盐田区', 440301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440400, '珠海市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440401, '市辖区', 440400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440402, '香洲区', 440401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440403, '斗门区', 440401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440404, '金湾区', 440401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440500, '汕头市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440501, '市辖区', 440500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440507, '龙湖区', 440501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440511, '金平区', 440501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440512, '濠江区', 440501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440513, '潮阳区', 440501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440514, '潮南区', 440501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440515, '澄海区', 440501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440523, '南澳县', 440500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440600, '佛山市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440601, '市辖区', 440600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440604, '禅城区', 440600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440605, '南海区', 440600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440606, '顺德区', 440600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440607, '三水区', 440600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440608, '高明区', 440600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440700, '江门市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440701, '市辖区', 440700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440703, '蓬江区', 440701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440704, '江海区', 440701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440705, '新会区', 440701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440781, '台山市', 440700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440783, '开平市', 440700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440784, '鹤山市', 440700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440785, '恩平市', 440700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440800, '湛江市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440801, '市辖区', 440800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440802, '赤坎区', 440801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440803, '霞山区', 440801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440804, '坡头区', 440801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440811, '麻章区', 440801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440823, '遂溪县', 440800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440825, '徐闻县', 440800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440881, '廉江市', 440800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440882, '雷州市', 440800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440883, '吴川市', 440800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440900, '茂名市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440901, '市辖区', 440900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (440902, '茂南区', 440901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440903, '茂港区', 440901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440923, '电白县', 440900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440981, '高州市', 440900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440982, '化州市', 440900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (440983, '信宜市', 440900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441200, '肇庆市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441201, '市辖区', 441200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441202, '端州区', 441201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441203, '鼎湖区', 441201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441223, '广宁县', 441200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441224, '怀集县', 441200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441225, '封开县', 441200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441226, '德庆县', 441200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441283, '高要市', 441200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441284, '四会市', 441200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441300, '惠州市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441301, '市辖区', 441300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441302, '惠城区', 441301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441303, '惠阳区', 441301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441322, '博罗县', 441300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441323, '惠东县', 441300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441324, '龙门县', 441300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441400, '梅州市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441401, '市辖区', 441400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441402, '梅江区', 441401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441421, '梅县', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441422, '大埔县', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441423, '丰顺县', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441424, '五华县', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441426, '平远县', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441427, '蕉岭县', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441481, '兴宁市', 441400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441500, '汕尾市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441501, '市辖区', 441500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441502, '城区', 441501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441521, '海丰县', 441500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441523, '陆河县', 441500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441581, '陆丰市', 441500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441600, '河源市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441601, '市辖区', 441600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441602, '源城区', 441601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441621, '紫金县', 441600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441622, '龙川县', 441600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441623, '连平县', 441600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441624, '和平县', 441600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441625, '东源县', 441600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441700, '阳江市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441701, '市辖区', 441700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441702, '江城区', 441701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441721, '阳西县', 441700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441723, '阳东县', 441700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441781, '阳春市', 441700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441800, '清远市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441801, '市辖区', 441800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (441802, '清城区', 441801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441821, '佛冈县', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441823, '阳山县', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441825, '连山壮族瑶族自治县', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441826, '连南瑶族自治县', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441827, '清新县', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441881, '英德市', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441882, '连州市', 441800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (441900, '东莞市', 440000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (442000, '中山市', 440000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445100, '潮州市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (445101, '市辖区', 445100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (445102, '湘桥区', 445101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445121, '潮安区', 445100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445122, '饶平县', 445100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445200, '揭阳市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (445201, '市辖区', 445200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (445202, '榕城区', 445201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445221, '揭东县', 445200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445222, '揭西县', 445200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445224, '惠来县', 445200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445281, '普宁市', 445200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445300, '云浮市', 440000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (445301, '市辖区', 445300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (445302, '云城区', 445301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445321, '新兴县', 445300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445322, '郁南县', 445300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445323, '云安县', 445300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (445381, '罗定市', 445300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450000, '广西壮族自治区', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450100, '南宁市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450101, '市辖区', 450100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450102, '兴宁区', 450101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450103, '青秀区', 450101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450105, '江南区', 450101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450107, '西乡塘区', 450101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450108, '良庆区', 450101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450109, '邕宁区', 450101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450122, '武鸣县', 450100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450123, '隆安县', 450100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450124, '马山县', 450100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450125, '上林县', 450100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450126, '宾阳县', 450100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450127, '横县', 450100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450200, '柳州市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450201, '市辖区', 450200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450202, '城中区', 450201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450203, '鱼峰区', 450201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450204, '柳南区', 450201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450205, '柳北区', 450201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450221, '柳江县', 450200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450222, '柳城县', 450200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450223, '鹿寨县', 450200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450224, '融安县', 450200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450225, '融水苗族自治县', 450200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450226, '三江侗族自治县', 450200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450300, '桂林市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450301, '市辖区', 450300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450302, '秀峰区', 450301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450303, '叠彩区', 450301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450304, '象山区', 450301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450305, '七星区', 450301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450311, '雁山区', 450301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450321, '阳朔县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450322, '临桂区', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450323, '灵川县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450324, '全州县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450325, '兴安县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450326, '永福县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450327, '灌阳县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450328, '龙胜各族自治县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450329, '资源县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450330, '平乐县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450331, '荔浦县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450332, '恭城瑶族自治县', 450300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450400, '梧州市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450401, '市辖区', 450400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450403, '万秀区', 450401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450404, '蝶山区', 450401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450405, '长洲区', 450401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450421, '苍梧县', 450400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450422, '藤县', 450400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450423, '蒙山县', 450400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450481, '岑溪市', 450400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450500, '北海市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450501, '市辖区', 450500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450502, '海城区', 450501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450503, '银海区', 450501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450512, '铁山港区', 450501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450521, '合浦县', 450500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450600, '防城港市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450601, '市辖区', 450600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450602, '港口区', 450601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450603, '防城区', 450601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450621, '上思县', 450600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450681, '东兴市', 450600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450700, '钦州市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450701, '市辖区', 450700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450702, '钦南区', 450700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450703, '钦北区', 450700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450721, '灵山县', 450700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450722, '浦北县', 450700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450800, '贵港市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450801, '市辖区', 450800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450802, '港北区', 450801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450803, '港南区', 450801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450804, '覃塘区', 450801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450821, '平南县', 450800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450881, '桂平市', 450800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450900, '玉林市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450901, '市辖区', 450900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (450902, '玉州区', 450901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450921, '容县', 450900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450922, '陆川县', 450900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450923, '博白县', 450900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450924, '兴业县', 450900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (450981, '北流市', 450900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451000, '百色市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451001, '市辖区', 451000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451002, '右江区', 451001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451021, '田阳县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451022, '田东县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451023, '平果县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451024, '德保县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451025, '靖西县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451026, '那坡县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451027, '凌云县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451028, '乐业县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451029, '田林县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451030, '西林县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451031, '隆林各族自治县', 451000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451100, '贺州市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451101, '市辖区', 451100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451102, '八步区', 451101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451121, '昭平县', 451100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451122, '钟山县', 451100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451123, '富川瑶族自治县', 451100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451200, '河池市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451201, '市辖区', 451200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451202, '金城江区', 451201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451221, '南丹县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451222, '天峨县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451223, '凤山县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451224, '东兰县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451225, '罗城仫佬族自治县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451226, '环江毛南族自治县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451227, '巴马瑶族自治县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451228, '都安瑶族自治县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451229, '大化瑶族自治县', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451281, '宜州市', 451200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451300, '来宾市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451301, '市辖区', 451300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451302, '兴宾区', 451301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451321, '忻城县', 451300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451322, '象州县', 451300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451323, '武宣县', 451300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451324, '金秀瑶族自治县', 451300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451381, '合山市', 451300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451400, '崇左市', 450000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451401, '市辖区', 451400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (451402, '江洲区', 451401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451421, '扶绥县', 451400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451422, '宁明县', 451400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451423, '龙州县', 451400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451424, '大新县', 451400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451425, '天等县', 451400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (451481, '凭祥市', 451400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (460000, '海南省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (460100, '海口市', 460000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (460101, '市辖区', 460100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (460105, '秀英区', 460101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (460106, '龙华区', 460101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (460107, '琼山区', 460101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (460108, '美兰区', 460101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (460200, '三亚市', 460000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (460201, '市辖区', 460200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469000, '省直辖县级行政单位', 460000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (469001, '五指山市', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469002, '琼海市', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469003, '儋州市', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469005, '文昌市', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469006, '万宁市', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469007, '东方市', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469025, '定安县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469026, '屯昌县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469027, '澄迈县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469028, '临高县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469030, '白沙黎族自治县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469031, '昌江黎族自治县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469033, '乐东黎族自治县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469034, '陵水黎族自治县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469035, '保亭黎族苗族自治县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469036, '琼中黎族苗族自治县', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469037, '西沙群岛', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469038, '南沙群岛', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (469039, '中沙群岛的岛礁及其海域', 469000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500000, '重庆市', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500100, '万州区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500101, '万州区', 500100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500200, '涪陵区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500201, '涪陵区', 500200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500300, '渝中区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500301, '渝中区', 500300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500400, '大渡口区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500401, '大渡口区', 500400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500500, '江北区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500501, '江北区', 500500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500600, '沙坪坝区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500601, '沙坪坝区', 500600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500700, '九龙坡区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500701, '九龙坡区', 500700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500800, '南岸区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500801, '南岸区', 500800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (500900, '北碚区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (500901, '北碚区', 500900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (501000, '万盛区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (501001, '万盛区', 501000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (501100, '双桥区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (501101, '双桥区', 501100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (501200, '渝北区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (501201, '渝北区', 501200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (501300, '巴南区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (501301, '巴南区', 501300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (501400, '黔江区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (501401, '黔江区', 501400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (501500, '长寿区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (501501, '长寿区', 501500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502200, '綦江区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502201, '綦江区', 502200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502300, '潼南县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502301, '潼南县', 502300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502400, '铜梁县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502401, '铜梁县', 502400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502500, '大足区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502501, '大足区', 502500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502600, '荣昌县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502601, '荣昌县', 502600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502700, '璧山县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502701, '璧山县', 502700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502800, '梁平县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502801, '梁平县', 502800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (502900, '城口县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (502901, '城口县', 502900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503000, '丰都县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503001, '丰都县', 503000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503100, '垫江县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503101, '垫江县', 503100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503200, '武隆县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503201, '武隆县', 503200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503300, '忠县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503301, '忠县', 503300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503400, '开县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503401, '开县', 503400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503500, '云阳县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503501, '云阳县', 503500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503600, '奉节县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503601, '奉节县', 503600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503700, '巫山县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503701, '巫山县', 503700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (503800, '巫溪县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (503801, '巫溪县', 503800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (504000, '石柱县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (504001, '石柱县', 504000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (504100, '秀山县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (504101, '秀山县', 504100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (504200, '酉阳县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (504201, '酉阳县', 504200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (504300, '彭水县', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (504301, '彭水县', 504300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (508100, '江津区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (508101, '江津区', 508100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (508200, '合川区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (508201, '合川区', 508200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (508300, '永川区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (508301, '永川区', 508300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (508400, '南川区', 500000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (508401, '南川区', 508400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510000, '四川省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510100, '成都市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510101, '市辖区', 510100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510104, '锦江区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510105, '青羊区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510106, '金牛区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510107, '武侯区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510108, '成华区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510112, '龙泉驿区', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510113, '青白江区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510114, '新都区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510115, '温江区', 510101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510121, '金堂县', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510122, '双流县', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510124, '郫县', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510129, '大邑县', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510131, '蒲江县', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510132, '新津县', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510181, '都江堰市', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510182, '彭州市', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510183, '邛崃市', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510184, '崇州市', 510100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510300, '自贡市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510301, '市辖区', 510300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510302, '自流井区', 510301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510303, '贡井区', 510301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510304, '大安区', 510301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510311, '沿滩区', 510301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510321, '荣县', 510300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510322, '富顺县', 510300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510400, '攀枝花市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510401, '市辖区', 510400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510402, '东区', 510401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510403, '西区', 510401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510411, '仁和区', 510401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510421, '米易县', 510400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510422, '盐边县', 510400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510500, '泸州市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510501, '市辖区', 510500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510502, '江阳区', 510501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510503, '纳溪区', 510501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510504, '龙马潭区', 510501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510521, '泸县', 510500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510522, '合江县', 510500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510524, '叙永县', 510500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510525, '古蔺县', 510500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510600, '德阳市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510601, '市辖区', 510600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510603, '旌阳区', 510601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510623, '中江县', 510600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510626, '罗江县', 510600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510681, '广汉市', 510600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510682, '什邡市', 510600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510683, '绵竹市', 510600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510700, '绵阳市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510701, '市辖区', 510700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510703, '涪城区', 510701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510704, '游仙区', 510701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510722, '三台县', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510723, '盐亭县', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510724, '安县', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510725, '梓潼县', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510726, '北川羌族自治县', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510727, '平武县', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510781, '江油市', 510700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510800, '广元市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510801, '市辖区', 510800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510802, '市中区', 510801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510811, '元坝区', 510801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510812, '朝天区', 510801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510821, '旺苍县', 510800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510822, '青川县', 510800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510823, '剑阁县', 510800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510824, '苍溪县', 510800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510900, '遂宁市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510901, '市辖区', 510900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (510903, '船山区', 510901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510904, '安居区', 510901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510921, '蓬溪县', 510900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510922, '射洪县', 510900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (510923, '大英县', 510900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511000, '内江市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511001, '市辖区', 511000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511002, '市中区', 511001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511011, '东兴区', 511001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511024, '威远县', 511000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511025, '资中县', 511000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511028, '隆昌县', 511000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511100, '乐山市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511101, '市辖区', 511100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511102, '市中区', 511101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511111, '沙湾区', 511101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511112, '五通桥区', 511101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511113, '金口河区', 511101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511123, '犍为县', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511124, '井研县', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511126, '夹江县', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511129, '沐川县', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511132, '峨边彝族自治县', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511133, '马边彝族自治县', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511181, '峨眉山市', 511100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511300, '南充市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511301, '市辖区', 511300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511302, '顺庆区', 511301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511303, '高坪区', 511301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511304, '嘉陵区', 511301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511321, '南部县', 511300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511322, '营山县', 511300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511323, '蓬安县', 511300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511324, '仪陇县', 511300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511325, '西充县', 511300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511381, '阆中市', 511300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511400, '眉山市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511401, '市辖区', 511400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511402, '东坡区', 511401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511421, '仁寿县', 511400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511422, '彭山县', 511400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511423, '洪雅县', 511400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511424, '丹棱县', 511400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511425, '青神县', 511400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511500, '宜宾市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511501, '市辖区', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511502, '翠屏区', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511521, '宜宾县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511522, '南溪县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511523, '江安县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511524, '长宁县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511525, '高县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511526, '珙县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511527, '筠连县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511528, '兴文县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511529, '屏山县', 511500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511600, '广安市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511601, '市辖区', 511600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511602, '广安区', 511601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511621, '岳池县', 511600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511622, '武胜县', 511600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511623, '邻水县', 511600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511681, '华蓥市', 511600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511682, '广安区', 511600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511700, '达州市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511701, '市辖区', 511700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511702, '通川区', 511701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511721, '达川区', 511700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511722, '宣汉县', 511700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511723, '开江县', 511700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511724, '大竹县', 511700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511725, '渠县', 511700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511781, '万源市', 511700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511800, '雅安市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511801, '雨城区', 511800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511802, '雨城区', 511801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511821, '名山区', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511822, '荥经县', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511823, '汉源县', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511824, '石棉县', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511825, '天全县', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511826, '芦山县', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511827, '宝兴县', 511800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511900, '巴中市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511901, '市辖区', 511900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (511902, '巴州区', 511901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511921, '通江县', 511900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511922, '南江县', 511900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (511923, '平昌县', 511900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (512000, '资阳市', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (512001, '市辖区', 512000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (512002, '雁江区', 512001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (512021, '安岳县', 512000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (512022, '乐至县', 512000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (512081, '简阳市', 512000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513200, '阿坝藏族羌族自治州', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (513221, '汶川县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513222, '理县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513223, '茂县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513224, '松潘县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513225, '九寨沟县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513226, '金川县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513227, '小金县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513228, '黑水县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513229, '马尔康县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513230, '壤塘县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513231, '阿坝县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513232, '若尔盖县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513233, '红原县', 513200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513300, '甘孜藏族自治州', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (513321, '康定县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513322, '泸定县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513323, '丹巴县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513324, '九龙县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513325, '雅江县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513326, '道孚县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513327, '炉霍县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513328, '甘孜县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513329, '新龙县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513330, '德格县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513331, '白玉县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513332, '石渠县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513333, '色达县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513334, '理塘县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513335, '巴塘县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513336, '乡城县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513337, '稻城县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513338, '得荣县', 513300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513400, '凉山彝族自治州', 510000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (513401, '西昌市', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513422, '木里藏族自治县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513423, '盐源县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513424, '德昌县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513425, '会理县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513426, '会东县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513427, '宁南县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513428, '普格县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513429, '布拖县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513430, '金阳县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513431, '昭觉县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513432, '喜德县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513433, '冕宁县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513434, '越西县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513435, '甘洛县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513436, '美姑县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (513437, '雷波县', 513400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520000, '贵州省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520100, '贵阳市', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520101, '市辖区', 520100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520102, '南明区', 520101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520103, '云岩区', 520101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520111, '花溪区', 520101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520112, '乌当区', 520100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520113, '白云区', 520101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520114, '小河区', 520101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520121, '开阳县', 520100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520122, '息烽县', 520100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520123, '修文县', 520100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520181, '清镇市', 520100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520200, '六盘水市', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520201, '钟山区', 520200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520203, '六枝特区', 520200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520221, '水城县', 520200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520222, '盘县', 520200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520300, '遵义市', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520301, '市辖区', 520300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520302, '红花岗区', 520301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520303, '汇川区', 520301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520321, '遵义县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520322, '桐梓县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520323, '绥阳县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520324, '正安县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520325, '道真仡佬族苗族自治县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520326, '务川仡佬族苗族自治县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520327, '凤冈县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520328, '湄潭县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520329, '余庆县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520330, '习水县', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520381, '赤水市', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520382, '仁怀市', 520300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520400, '安顺市', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520401, '市辖区', 520400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (520402, '西秀区', 520401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520421, '平坝县', 520400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520422, '普定县', 520400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520423, '镇宁布依族苗族自治县', 520400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520424, '关岭布依族苗族自治县', 520400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (520425, '紫云苗族布依族自治县', 520400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522200, '铜仁市', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (522201, '碧江区', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522222, '江口县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522223, '玉屏侗族自治县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522224, '石阡县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522225, '思南县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522226, '印江土家族苗族自治县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522227, '德江县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522228, '沿河土家族自治县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522229, '松桃苗族自治县', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522230, '万山区', 522200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522300, '黔西南布依族苗族自治州', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (522301, '兴义市', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522322, '兴仁县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522323, '普安县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522324, '晴隆县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522325, '贞丰县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522326, '望谟县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522327, '册亨县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522328, '安龙县', 522300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522400, '毕节市', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (522401, '七星关区', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522422, '大方县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522423, '黔西县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522424, '金沙县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522425, '织金县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522426, '纳雍县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522427, '威宁彝族回族苗族自治县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522428, '赫章县', 522400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522600, '黔东南苗族侗族自治州', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (522601, '凯里市', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522622, '黄平县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522623, '施秉县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522624, '三穗县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522625, '镇远县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522626, '岑巩县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522627, '天柱县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522628, '锦屏县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522629, '剑河县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522630, '台江县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522631, '黎平县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522632, '榕江县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522633, '从江县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522634, '雷山县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522635, '麻江县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522636, '丹寨县', 522600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522700, '黔南布依族苗族自治州', 520000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (522701, '都匀市', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522702, '福泉市', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522722, '荔波县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522723, '贵定县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522725, '瓮安县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522726, '独山县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522727, '平塘县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522728, '罗甸县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522729, '长顺县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522730, '龙里县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522731, '惠水县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (522732, '三都水族自治县', 522700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530000, '云南省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530100, '昆明市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530101, '市辖区', 530100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530102, '五华区', 530101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530103, '盘龙区', 530101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530111, '官渡区', 530101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530112, '西山区', 530101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530113, '东川区', 530101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530121, '呈贡县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530122, '晋宁县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530124, '富民县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530125, '宜良县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530126, '石林彝族自治县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530127, '嵩明县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530128, '禄劝彝族苗族自治县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530129, '寻甸回族彝族自治县', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530181, '安宁市', 530100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530300, '曲靖市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530301, '市辖区', 530300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530302, '麒麟区', 530301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530321, '马龙县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530322, '陆良县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530323, '师宗县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530324, '罗平县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530325, '富源县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530326, '会泽县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530328, '沾益县', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530381, '宣威市', 530300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530400, '玉溪市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530401, '市辖区', 530400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530402, '红塔区', 530401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530421, '江川县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530422, '澄江县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530423, '通海县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530424, '华宁县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530425, '易门县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530426, '峨山彝族自治县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530427, '新平彝族傣族自治县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530428, '元江哈尼族彝族傣族自治县', 530400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530500, '保山市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530501, '市辖区', 530500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530502, '隆阳区', 530500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530521, '施甸县', 530500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530522, '腾冲县', 530500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530523, '龙陵县', 530500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530524, '昌宁县', 530500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530600, '昭通市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530601, '市辖区', 530600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530602, '昭阳区', 530601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530621, '鲁甸县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530622, '巧家县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530623, '盐津县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530624, '大关县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530625, '永善县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530626, '绥江县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530627, '镇雄县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530628, '彝良县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530629, '威信县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530630, '水富县', 530600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530700, '丽江市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530701, '市辖区', 530700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530702, '古城区', 530701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530721, '玉龙纳西族自治县', 530700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530722, '永胜县', 530700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530723, '华坪县', 530700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530724, '宁蒗彝族自治县', 530700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530800, '普洱市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530801, '市辖区', 530800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530802, '翠云区', 530801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530821, '宁洱哈尼族彝族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530822, '墨江哈尼族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530823, '景东彝族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530824, '景谷傣族彝族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530825, '镇沅彝族哈尼族拉祜族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530826, '江城哈尼族彝族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530827, '孟连傣族拉祜族佤族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530828, '澜沧拉祜族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530829, '西盟佤族自治县', 530800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530900, '临沧市', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530901, '市辖区', 530900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (530902, '临翔区', 530901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530921, '凤庆县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530922, '云县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530923, '永德县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530924, '镇康县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530925, '双江拉祜族佤族布朗族傣族自治县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530926, '耿马傣族佤族自治县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (530927, '沧源佤族自治县', 530900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532300, '楚雄彝族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (532301, '楚雄市', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532322, '双柏县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532323, '牟定县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532324, '南华县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532325, '姚安县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532326, '大姚县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532327, '永仁县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532328, '元谋县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532329, '武定县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532331, '禄丰县', 532300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532500, '红河哈尼族彝族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (532501, '个旧市', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532502, '开远市', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532522, '蒙自市', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532523, '屏边苗族自治县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532524, '建水县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532525, '石屏县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532526, '弥勒市', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532527, '泸西县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532528, '元阳县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532529, '红河县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532530, '金平苗族瑶族傣族自治县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532531, '绿春县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532532, '河口瑶族自治县', 532500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532600, '文山壮族苗族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (532621, '文山市', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532622, '砚山县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532623, '西畴县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532624, '麻栗坡县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532625, '马关县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532626, '丘北县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532627, '广南县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532628, '富宁县', 532600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532800, '西双版纳傣族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (532801, '景洪市', 532800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532822, '勐海县', 532800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532823, '勐腊县', 532800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532900, '大理白族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (532901, '大理市', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532922, '漾濞彝族自治县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532923, '祥云县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532924, '宾川县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532925, '弥渡县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532926, '南涧彝族自治县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532927, '巍山彝族回族自治县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532928, '永平县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532929, '云龙县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532930, '洱源县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532931, '剑川县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (532932, '鹤庆县', 532900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533100, '德宏傣族景颇族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (533102, '瑞丽市', 533100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533103, '潞西市', 533100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533122, '梁河县', 533100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533123, '盈江县', 533100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533124, '陇川县', 533100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533300, '怒江傈僳族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (533321, '泸水县', 533300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533323, '福贡县', 533300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533324, '贡山独龙族怒族自治县', 533300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533325, '兰坪白族普米族自治县', 533300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533400, '迪庆藏族自治州', 530000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (533421, '香格里拉县', 533400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533422, '德钦县', 533400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (533423, '维西傈僳族自治县', 533400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540000, '西藏自治区', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (540100, '拉萨市', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (540101, '市辖区', 540100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (540102, '城关区', 540101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540121, '林周县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540122, '当雄县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540123, '尼木县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540124, '曲水县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540125, '堆龙德庆县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540126, '达孜县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (540127, '墨竹工卡县', 540100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542100, '昌都地区', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (542121, '昌都县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542122, '江达县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542123, '贡觉县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542124, '类乌齐县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542125, '丁青县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542126, '察雅县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542127, '八宿县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542128, '左贡县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542129, '芒康县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542132, '洛隆县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542133, '边坝县', 542100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542200, '山南地区', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (542221, '乃东县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542222, '扎囊县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542223, '贡嘎县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542224, '桑日县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542225, '琼结县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542226, '曲松县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542227, '措美县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542228, '洛扎县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542229, '加查县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542231, '隆子县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542232, '错那县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542233, '浪卡子县', 542200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542300, '日喀则地区', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (542301, '日喀则市', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542322, '南木林县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542323, '江孜县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542324, '定日县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542325, '萨迦县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542326, '拉孜县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542327, '昂仁县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542328, '谢通门县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542329, '白朗县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542330, '仁布县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542331, '康马县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542332, '定结县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542333, '仲巴县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542334, '亚东县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542335, '吉隆县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542336, '聂拉木县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542337, '萨嘎县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542338, '岗巴县', 542300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542400, '那曲地区', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (542421, '那曲县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542422, '嘉黎县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542423, '比如县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542424, '聂荣县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542425, '安多县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542426, '申扎县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542427, '索县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542428, '班戈县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542429, '巴青县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542430, '尼玛县', 542400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542500, '阿里地区', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (542521, '普兰县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542522, '札达县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542523, '噶尔县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542524, '日土县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542525, '革吉县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542526, '改则县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542527, '措勤县', 542500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542600, '林芝地区', 540000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (542621, '林芝县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542622, '工布江达县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542623, '米林县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542624, '墨脱县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542625, '波密县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542626, '察隅县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (542627, '朗县', 542600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610000, '陕西省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610100, '西安市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610101, '长安区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610102, '新城区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610103, '碑林区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610104, '莲湖区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610111, '灞桥区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610112, '未央区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610113, '雁塔区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610114, '阎良区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610115, '临潼区', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610122, '蓝田县', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610124, '周至县', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610125, '户县', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610126, '高陵县', 610100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610200, '铜川市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610201, '市辖区', 610200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610202, '王益区', 610201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610203, '印台区', 610201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610204, '耀州区', 610201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610222, '宜君县', 610200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610300, '宝鸡市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610301, '市辖区', 610300, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610302, '渭滨区', 610301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610303, '金台区', 610301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610304, '陈仓区', 610301, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610322, '凤翔县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610323, '岐山县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610324, '扶风县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610326, '眉县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610327, '陇县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610328, '千阳县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610329, '麟游县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610330, '凤县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610331, '太白县', 610300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610400, '咸阳市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610401, '市辖区', 610400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610402, '秦都区', 610401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610404, '渭城区', 610401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610422, '三原县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610423, '泾阳县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610424, '乾县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610425, '礼泉县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610426, '永寿县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610427, '彬县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610428, '长武县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610429, '旬邑县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610430, '淳化县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610431, '武功县', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610481, '兴平市', 610400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610500, '渭南市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610501, '市辖区', 610500, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610502, '临渭区', 610501, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610521, '华县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610522, '潼关县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610523, '大荔县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610524, '合阳县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610525, '澄城县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610526, '蒲城县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610527, '白水县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610528, '富平县', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610581, '韩城市', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610582, '华阴市', 610500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610600, '延安市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610601, '市辖区', 610600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610602, '宝塔区', 610601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610621, '延长县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610622, '延川县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610623, '子长县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610624, '安塞县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610625, '志丹县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610626, '吴起县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610627, '甘泉县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610628, '富县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610629, '洛川县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610630, '宜川县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610631, '黄龙县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610632, '黄陵县', 610600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610700, '汉中市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610701, '市辖区', 610700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610702, '汉台区', 610701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610721, '南郑县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610722, '城固县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610723, '洋县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610724, '西乡县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610725, '勉县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610726, '宁强县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610727, '略阳县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610728, '镇巴县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610729, '留坝县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610730, '佛坪县', 610700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610800, '榆林市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610801, '市辖区', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610802, '榆阳区', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610821, '神木县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610822, '府谷县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610823, '横山县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610824, '靖边县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610825, '定边县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610826, '绥德县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610827, '米脂县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610828, '佳县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610829, '吴堡县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610830, '清涧县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610831, '子洲县', 610800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610900, '安康市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610901, '市辖区', 610900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (610902, '汉滨区', 610901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610921, '汉阴县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610922, '石泉县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610923, '宁陕县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610924, '紫阳县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610925, '岚皋县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610926, '平利县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610927, '镇坪县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610928, '旬阳县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (610929, '白河县', 610900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611000, '商洛市', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (611001, '市辖区', 611000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (611002, '商州区', 611001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611021, '洛南县', 611000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611022, '丹凤县', 611000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611023, '商南县', 611000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611024, '山阳县', 611000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611025, '镇安县', 611000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611026, '柞水县', 611000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (611100, '杨凌示范区', 610000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (611103, '杨凌区', 611100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620000, '甘肃省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620100, '兰州市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620101, '市辖区', 620100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620102, '城关区', 620101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620103, '七里河区', 620101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620104, '西固区', 620101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620105, '安宁区', 620101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620111, '红古区', 620101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620121, '永登县', 620100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620122, '皋兰县', 620100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620123, '榆中县', 620100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620200, '嘉峪关市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620201, '市辖区', 620200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620300, '金昌市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620301, '金川区', 620300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620321, '永昌县', 620300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620400, '白银市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620401, '市辖区', 620400, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620402, '白银区', 620401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620403, '平川区', 620401, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620421, '靖远县', 620400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620422, '会宁县', 620400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620423, '景泰县', 620400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620500, '天水市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620501, '麦积区', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620502, '秦州区', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620521, '清水县', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620522, '秦安县', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620523, '甘谷县', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620524, '武山县', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620525, '张家川回族自治县', 620500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620600, '武威市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620601, '市辖区', 620600, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620602, '凉州区', 620601, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620621, '民勤县', 620600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620622, '古浪县', 620600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620623, '天祝藏族自治县', 620600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620700, '张掖市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620701, '市辖区', 620700, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620702, '甘州区', 620701, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620721, '肃南裕固族自治县', 620700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620722, '民乐县', 620700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620723, '临泽县', 620700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620724, '高台县', 620700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620725, '山丹县', 620700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620800, '平凉市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620801, '市辖区', 620800, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620802, '崆峒区', 620801, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620821, '泾川县', 620800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620822, '灵台县', 620800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620823, '崇信县', 620800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620824, '华亭县', 620800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620825, '庄浪县', 620800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620826, '静宁县', 620800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620900, '酒泉市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620901, '市辖区', 620900, 1, 0, 1);
INSERT INTO `rt_area` VALUES (620902, '肃州区', 620901, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620921, '金塔县', 620900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620922, '瓜洲县', 620900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620923, '肃北蒙古族自治县', 620900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620924, '阿克塞哈萨克族自治县', 620900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620981, '玉门市', 620900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (620982, '敦煌市', 620900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621000, '庆阳市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (621001, '市辖区', 621000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (621002, '西峰区', 621001, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621021, '庆城县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621022, '环县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621023, '华池县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621024, '合水县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621025, '正宁县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621026, '宁县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621027, '镇原县', 621000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621100, '定西市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (621101, '市辖区', 621100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (621102, '安定区', 621101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621121, '通渭县', 621100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621122, '陇西县', 621100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621123, '渭源县', 621100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621124, '临洮县', 621100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621125, '漳县', 621100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621126, '岷县', 621100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621200, '陇南市', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (621201, '武都区', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621221, '成县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621222, '文县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621223, '宕昌县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621224, '康县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621225, '西和县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621226, '礼县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621227, '徽县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (621228, '两当县', 621200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622900, '临夏回族自治州', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (622901, '临夏市', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622921, '临夏县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622922, '康乐县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622923, '永靖县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622924, '广河县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622925, '和政县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622926, '东乡族自治县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (622927, '积石山保安族东乡族撒拉族自治县', 622900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623000, '甘南藏族自治州', 620000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (623001, '合作市', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623021, '临潭县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623022, '卓尼县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623023, '舟曲县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623024, '迭部县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623025, '玛曲县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623026, '碌曲县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (623027, '夏河县', 623000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630000, '青海省', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (630100, '西宁市', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (630101, '市辖区', 630100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (630102, '城东区', 630101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630103, '城中区', 630101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630104, '城西区', 630101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630105, '城北区', 630101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630121, '大通回族土族自治县', 630100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630122, '湟中县', 630100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (630123, '湟源县', 630100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632100, '海东市', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632121, '平安县', 632100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632122, '民和回族土族自治县', 632100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632123, '乐都区', 632100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632126, '互助土族自治县', 632100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632127, '化隆回族自治县', 632100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632128, '循化撒拉族自治县', 632100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632200, '海北藏族自治州', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632221, '门源回族自治县', 632200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632222, '祁连县', 632200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632223, '海晏县', 632200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632224, '刚察县', 632200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632300, '黄南藏族自治州', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632321, '同仁县', 632300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632322, '尖扎县', 632300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632323, '泽库县', 632300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632324, '河南蒙古族自治县', 632300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632500, '海南藏族自治州', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632521, '共和县', 632500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632522, '同德县', 632500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632523, '贵德县', 632500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632524, '兴海县', 632500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632525, '贵南县', 632500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632600, '果洛藏族自治州', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632621, '玛沁县', 632600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632622, '班玛县', 632600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632623, '甘德县', 632600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632624, '达日县', 632600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632625, '久治县', 632600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632626, '玛多县', 632600, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632700, '玉树藏族自治州', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632721, '玉树县', 632700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632722, '杂多县', 632700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632723, '称多县', 632700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632724, '治多县', 632700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632725, '囊谦县', 632700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632726, '曲麻莱县', 632700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632800, '海西蒙古族藏族自治州', 630000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (632801, '格尔木市', 632800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632802, '德令哈市', 632800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632821, '乌兰县', 632800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632822, '都兰县', 632800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (632823, '天峻县', 632800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640000, '宁夏回族自治区', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (640100, '银川市', 640000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (640104, '兴庆区', 640100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640105, '西夏区', 640100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640106, '金凤区', 640100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640121, '永宁县', 640100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640122, '贺兰县', 640100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640181, '灵武市', 640100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640200, '石嘴山市', 640000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (640202, '大武口区', 640200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640205, '惠农县', 640200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640221, '平罗县', 640200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640300, '吴忠市', 640000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (640301, '红寺堡区', 640300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640302, '利通区', 640300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640323, '盐池县', 640300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640324, '同心县', 640300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640381, '青铜峡市', 640300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640400, '固原市', 640000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (640401, '市辖区', 640400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640402, '原州区', 640400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640422, '西吉县', 640400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640423, '隆德县', 640400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640424, '泾源县', 640400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640425, '彭阳县', 640400, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640500, '中卫市', 640000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (640501, '市辖区', 640500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640502, '沙坡头区', 640500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640521, '中宁县', 640500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (640522, '海原县', 640500, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650000, '新疆维吾尔自治区', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (650100, '乌鲁木齐市', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (650101, '市辖区', 650100, 1, 0, 1);
INSERT INTO `rt_area` VALUES (650102, '天山区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650103, '沙依巴克区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650104, '新市区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650105, '水磨沟区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650106, '头屯河区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650107, '达坂城区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650108, '东山区', 650101, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650121, '乌鲁木齐县', 650100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650200, '克拉玛依市', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (650201, '市辖区', 650200, 1, 0, 1);
INSERT INTO `rt_area` VALUES (650202, '独山子区', 650201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650203, '克拉玛依区', 650201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650204, '白碱滩区', 650201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (650205, '乌尔禾区', 650201, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652100, '吐鲁番地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (652101, '吐鲁番市', 652100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652122, '鄯善县', 652100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652123, '托克逊县', 652100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652200, '哈密地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (652201, '哈密市', 652200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652222, '巴里坤哈萨克自治县', 652200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652223, '伊吾县', 652200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652300, '昌吉回族自治州', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (652301, '昌吉市', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652302, '阜康市', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652303, '米泉市', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652323, '呼图壁县', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652324, '玛纳斯县', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652325, '奇台县', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652327, '吉木萨尔县', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652328, '木垒哈萨克自治县', 652300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652700, '博尔塔拉蒙古自治州', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (652701, '博乐市', 652700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652722, '精河县', 652700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652723, '温泉县', 652700, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652800, '巴音郭楞蒙古自治州', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (652801, '库尔勒市', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652822, '轮台县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652823, '尉犁县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652824, '若羌县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652825, '且末县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652826, '焉耆回族自治县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652827, '和静县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652828, '和硕县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652829, '博湖县', 652800, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652900, '阿克苏地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (652901, '阿克苏市', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652922, '温宿县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652923, '库车县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652924, '沙雅县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652925, '新和县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652926, '拜城县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652927, '乌什县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652928, '阿瓦提县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (652929, '柯坪县', 652900, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653000, '克孜勒苏柯尔克孜自治州', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (653001, '阿图什市', 653000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653022, '阿克陶县', 653000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653023, '阿合奇县', 653000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653024, '乌恰县', 653000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653100, '喀什地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (653101, '喀什市', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653121, '疏附县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653122, '疏勒县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653123, '英吉沙县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653124, '泽普县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653125, '莎车县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653126, '叶城县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653127, '麦盖提县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653128, '岳普湖县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653129, '伽师县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653130, '巴楚县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653131, '塔什库尔干塔吉克自治县', 653100, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653200, '和田地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (653201, '和田市', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653221, '和田县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653222, '墨玉县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653223, '皮山县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653224, '洛浦县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653225, '策勒县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653226, '于田县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (653227, '民丰县', 653200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654000, '伊犁哈萨克自治州', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (654002, '伊宁市', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654003, '奎屯市', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654021, '伊宁县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654022, '察布查尔锡伯自治县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654023, '霍城县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654024, '巩留县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654025, '新源县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654026, '昭苏县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654027, '特克斯县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654028, '尼勒克县', 654000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654200, '塔城地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (654201, '塔城市', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654202, '乌苏市', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654221, '额敏县', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654223, '沙湾县', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654224, '托里县', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654225, '裕民县', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654226, '和布克赛尔蒙古自治县', 654200, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654300, '阿勒泰地区', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (654301, '阿勒泰市', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654321, '布尔津县', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654322, '富蕴县', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654323, '福海县', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654324, '哈巴河县', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654325, '青河县', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (654326, '吉木乃县', 654300, 1, 0, 0);
INSERT INTO `rt_area` VALUES (659000, '省直辖行政单位', 650000, 1, 0, 1);
INSERT INTO `rt_area` VALUES (659001, '石河子市', 659000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (659002, '阿拉尔市', 659000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (659003, '图木舒克市', 659000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (659004, '五家渠市', 659000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990000, '新疆建设兵团', 0, 1, 0, 1);
INSERT INTO `rt_area` VALUES (990100, '第一师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990200, '第二师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990300, '第三师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990400, '第四师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990500, '第五师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990600, '第六师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990700, '第七师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990800, '第八师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (990900, '第九师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (991000, '第十师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (991100, '建工师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (991200, '第十二师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (991300, '第十三师', 990000, 1, 0, 0);
INSERT INTO `rt_area` VALUES (991400, '第十四师', 990000, 1, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for rt_article
-- ----------------------------
DROP TABLE IF EXISTS `rt_article`;
CREATE TABLE `rt_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `cid` int(10) DEFAULT '0' COMMENT '分类id',
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `author` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '作者:id:name',
  `show_switch` tinyint(1) DEFAULT '1' COMMENT '展示:1=展示,0=隐藏',
  `show_time` timestamp NULL,
  `user_id` int(10) unsigned DEFAULT '0',
  `group_id` int(10) unsigned DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `readnum` int(10) unsigned DEFAULT '999',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章';

-- ----------------------------
-- Records of rt_article
-- ----------------------------
BEGIN;
INSERT INTO `rt_article` VALUES (1, 1, '“五步走”选型协同管理OA办公零碎，准不会错', '在全球信息化时代，OA 系统作为企业内部管理信息化改革的首要软件平台，其重要性已经被广大用户所认可，目前没有协同管理 OA 系统的厂商已经为数不错了，更多的厂商是感觉现有的 OA 系统跟不上公司发展的形势，想要升级改造了，但是同样面临着难题，是沿用之前的 OA 系统升级改造呢？', '/upload/jpg/1683342392837.png', '在全球信息化时代，OA 系统作为企业内部管理信息化改革的首要软件平台，其重要性已经被广大用户所认可，目前没有协同管理 OA 系统的厂商已经为数不错了，更多的厂商是感觉现有的 OA 系统跟不上公司发展的形势，想要升级改造了，但是同样面临着难题，是沿用之前的 OA 系统升级改造呢？还是另觅贤臣选择一家更符合企业发展、产品性能更加契合、拓展性更强的 OA 系统厂商呢？其实小编想说，如果用的还满意用原来的 OA 系统厂商也可以，如果用的不合意，那索性不如换新的 OA 系统，其实很多时候大升级和够新 OA 系统花费资金差不多，但是效果往往却比老系统升级好的多。\n\n那么今天小编将分析管理者该如何选型 OA 系统以协助企业提高办公效率、管理决策、管理水平和竞争能力。\n\n笔者认为，对于企事业来说，选型 OA 办公系统应分成五步走。\n\n**第一步** ，企业应做好项目规划和管理，严格控制项目目标、项目实施、项目成本、验收标准、后续服务等内容。选型 OA 系统对于企业来说并不是小事，相关人员需提前做好相应的计划。计划、组织、控制，是管理的三项职能，而作为计划，是管理工作之先。一项工作，首先要具有计划，才会有后续的组织和控制，没有计划的工作，不叫管理工作。当然，计划也不是一蹴而就的。它是一个由宏观到微观、由粗到细逐渐分解逐渐细化的过程，需要管理者对于 OA 系统有深入的了解与充分的思考。\n\n**第二步** ，企业应该选择专业化的 OA 办公系统厂商，尽量避免其他软件开发商或系统集成商。因为 OA 办公系统不是这些公司的主业，他们通常采用项目定制的方式来实施，会导致实施周期长、成本高，稳定性和适用性差，后期的服务和二次开发都非常不便，后续费用也很高。而专业的 OA 办公系统厂商则会避免这些问题，协助企业在原有管理模式的基础上决定采用信息化的手段对企业资源进行统一管理和整合，使所有员工能够协同工作，提高整体运营效率。例如 OA 行业内三驾马车——泛微、致远以及华天动力均能协助企业实现这一目标。\n\n**第三步** ，企业选型的 OA 办公系统应该是非常成熟、稳定性、实用性、开放性、易用性都较强的，能够满足大规模用户同时在线使用，并且访问速度快。在许多公司中，数据孤岛、信息孤岛、应用孤岛，已经成为多年信息化建设后的后遗症，而解决这些孤岛的关键因素在于 OA 系统的开放性，所以管理者选型 OA 系统应将开放性列入重要标准之中。此外，系统的实施应该简单，对于标准化的功能，可以快速实施，并简单培训后就可以使用，以降低实施周期和成本。在这里，笔者建议各位管理者能够参考华天动力 OA，华天动力 OA 系统在 OA 行业内可谓是一股清流，其易用性、开放性、稳定性等方面是许多 OA 厂商的表率。\n\n**第四步** ，系统应该具有门户的特点，满足企业的多层级使用，同时具有严密的权限设置和安全防护措施，让不同级别的用户可以安全使用。系统应该具有很强的流程管理功能，满足企业流程规范和流程优化的需求。提到流程，就不能不提到 OA 行业内的致远 OA 与华天动力 OA，两家厂商都提出了工作流概念。华天动力 OA 作为行业内的工作流管理专家，以工作流为核心，形成开放自定义平台、智能报表三大核心技术。致远 OA 则是提出二元工作流，但是其实只是标准流程和自由流程的别称。\n\n**第五步** ，系统需要具有平台化的特点，采用多层架构，具有很强的开放性和灵活性。因为大型企业通常掌握一定的软件开发技术，因此 OA 办公系统最好是能够提供一个开放性的平台，让 IT 人员利用这个平台搭建个性化的应用系统，并实现和其他系统的数据整合。类似于华天动力的自定开发平台就具有这个特点。华天动力 OA 办公系统采用 Java+ 多数据库 +B/S+C/S 可选的技术组合，具有速度快、系统简洁、操作简便、安全性高、容易实施和维护、成本低等一系列突出优势。\n\n总结如上，小编希望通过上述的“五步走”，能够帮助各位正有选型烦恼的管理者排忧解难，解决 OA 选型的难题。相信按照如上步骤选型协同管理 OA 系统，开启企业内部管理高速路，一定错不了。\n', '', 1, '2023-05-05 09:00:52', 1, NULL, '2023-05-05 09:02:25', '2023-05-06 11:06:36', 999);
INSERT INTO `rt_article` VALUES (2, 1, '灵活办公引领未来办公新模式，不是趋向，而是必然', '111', '/upload/jpg/1683342672308.png', '提及企业的灵活办公方式，它在国内市场的真正使用是在 2019 年，随着以普华永道等知名企业开始采用灵活办公方式后，它对员工的工作效率影响以及能保持多久的可持续性，一直被当作一个未来的趋势进行讨论。直至 2020 年疫情来临，企业开始大范围采用居家办公的方式来积极应对。在长达一年的时间里，碎片化办公成为了工作常态，部分企业即使在疫情好转之后仍然沿用这一工作模式，也令许多人看好灵活办公未来的发展趋势。\n\n传统的工作模式设有固定的办公地点，往往是由企业的固定需求决定的。这种需求大致可以分为 **作业需求** 、**管理需求**与 **沟通需求** 。由疫情快速普及的灵活办公既能够满足上述需求，又能为企业多元工作需求提供便利办公场景。\n\n如果以坐标轴来看灵活办公，那么决定性因素有两项，即为横轴的**时间变量**与纵轴的 **空间变量** 。从时间上来说，灵活办公取代了以往 996 的工作模式，令办公更加的碎片化。这样的转变其实是有迹可循的，尤其是表现在一线城市更为明显，不论是创业型的小微企业还是形成一定规模的大、中型企业都在逐步调整各自的工作时间，而形成这种转变的原因背后则是由经济发展方向的转变导致生产方式的转变。\n\n**从空间上说**\n\n固定空间打卡并不是最优选项，许多操作都可以通过远程来完成，灵活办公带来了社会生产综合成本的降低和效率的有效提升，同时也在一定程度上有助于碳达峰目标的实现，不论是跨区域还是跨城市都能够实现区域方位上的联合。这也令许多企业正在将目光转向灵活办公。\n\n**站在市场需求方面分析**\n\n办公场景的不唯一性促使空间业态多元化、场景功能多样化、办公方式灵活化，因此空间方面会有更多的标准写字楼产品以及非标准的社会场景满足办公的需求，比如星巴克的商务空间、日本零散在地铁的办公仓都应运而生。相信未来会有更多楼宇对灵活办公进行配置，为用户提供生态化的服务体系。\n', '222', 1, '2023-05-06 08:20:22', 1, NULL, '2023-05-06 08:20:49', '2023-05-06 11:11:14', 999);
COMMIT;

-- ----------------------------
-- Table structure for rt_baiban
-- ----------------------------
DROP TABLE IF EXISTS `rt_baiban`;
CREATE TABLE `rt_baiban` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='白板表';

-- ----------------------------
-- Records of rt_baiban
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of rt_cate
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_category
-- ----------------------------
DROP TABLE IF EXISTS `rt_category`;
CREATE TABLE `rt_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '分类名称',
  `status` tinyint(2) DEFAULT '0' COMMENT '是否使用，预留',
  `remark` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '其他附加配置',
  `user_id` int(10) unsigned DEFAULT '0',
  `group_id` int(10) unsigned DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章分类';

-- ----------------------------
-- Records of rt_category
-- ----------------------------
BEGIN;
COMMIT;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统计划任务表';

-- ----------------------------
-- Records of rt_crons
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_ding_dept
-- ----------------------------
DROP TABLE IF EXISTS `rt_ding_dept`;
CREATE TABLE `rt_ding_dept` (
  `dept_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) NOT NULL COMMENT '部门名称',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级部门ID',
  `order_num` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `is_sun` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否同步',
  `is_user` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否同步用户',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `cursor` int(10) unsigned DEFAULT '0' COMMENT '更新用户游尺',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`dept_id`) USING BTREE,
  KEY `IDX_4ac4f215f505de46c913b398cd` (`createTime`),
  KEY `IDX_c9facd83d65cb59f758f3d3066` (`updateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rt_ding_dept
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_ding_role
-- ----------------------------
DROP TABLE IF EXISTS `rt_ding_role`;
CREATE TABLE `rt_ding_role` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pid` int(10) unsigned DEFAULT '0',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of rt_ding_role
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_ding_user
-- ----------------------------
DROP TABLE IF EXISTS `rt_ding_user`;
CREATE TABLE `rt_ding_user` (
  `unionid` varchar(255) NOT NULL COMMENT '用户的企业唯一标识',
  `userid` varchar(255) DEFAULT NULL COMMENT '用户的userId',
  `name` varchar(255) DEFAULT NULL COMMENT '用户姓名',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机号',
  `telephone` varchar(255) DEFAULT NULL COMMENT '座机',
  `job_number` varchar(255) DEFAULT NULL COMMENT '员工工号',
  `title` varchar(255) DEFAULT NULL COMMENT '职位',
  `work_place` varchar(255) DEFAULT NULL COMMENT '办公地点',
  `email` varchar(255) DEFAULT NULL,
  `dept_id_list` varchar(255) DEFAULT NULL COMMENT '部门列表',
  `hired_date` varchar(255) DEFAULT NULL COMMENT '入职时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`unionid`) USING BTREE,
  UNIQUE KEY `IDX_ad4121c0f6e93665021c50016f` (`unionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rt_ding_user
-- ----------------------------
BEGIN;
COMMIT;

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
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文档表';

-- ----------------------------
-- Records of rt_doc
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_doc_cate
-- ----------------------------
DROP TABLE IF EXISTS `rt_doc_cate`;
CREATE TABLE `rt_doc_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `did` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '文集id',
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '类型0分类1文章',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `pid` int(10) NOT NULL DEFAULT '0' COMMENT '上级id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文件名称',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `order_num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned NOT NULL DEFAULT '0',
  `have_child` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文档分类表';

-- ----------------------------
-- Records of rt_doc_cate
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of rt_error
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_excel
-- ----------------------------
DROP TABLE IF EXISTS `rt_excel`;
CREATE TABLE `rt_excel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='excel表';

-- ----------------------------
-- Records of rt_excel
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_flow
-- ----------------------------
DROP TABLE IF EXISTS `rt_flow`;
CREATE TABLE `rt_flow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `type` tinyint(2) unsigned DEFAULT '1' COMMENT '类型',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='流程图';

-- ----------------------------
-- Records of rt_flow
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_form
-- ----------------------------
DROP TABLE IF EXISTS `rt_form`;
CREATE TABLE `rt_form` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `form_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_type` tinyint(4) unsigned DEFAULT '1',
  `formdesign` json DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '添加人id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='表单引擎';

-- ----------------------------
-- Records of rt_form
-- ----------------------------
BEGIN;
INSERT INTO `rt_form` VALUES (7, '出差申请', 'chuchai', 1, '[{\"max\": 0, \"min\": 0, \"tag\": \"input\", \"name\": \"input_0\", \"type\": \"text\", \"index\": 0, \"label\": \"出差事由\", \"table\": true, \"width\": 100, \"search\": true, \"verify\": \"\", \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": true, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": \"110\", \"placeholder\": \"请输入\"}, {\"tag\": \"textarea\", \"name\": \"textarea_1\", \"index\": 1, \"label\": \"备注\", \"table\": true, \"width\": 100, \"search\": false, \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": 110, \"placeholder\": \"请输入\"}, {\"max\": 0, \"min\": 0, \"tag\": \"input\", \"name\": \"input_3\", \"type\": \"text\", \"index\": 3, \"label\": \"出差总天数\", \"table\": true, \"width\": 100, \"search\": true, \"verify\": \"number\", \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": true, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": \"110\", \"placeholder\": \"请输入\"}]', '2023-03-24 15:36:24', '2023-04-04 16:53:50', '', 1, 1);
INSERT INTO `rt_form` VALUES (14, '请假申请', 'forms', 1, '[{\"tag\": \"select\", \"name\": \"type\", \"index\": 3, \"label\": \"请假类型\", \"table\": true, \"width\": 100, \"search\": true, \"options\": [{\"title\": \"年假\", \"value\": \"年假\", \"checked\": false}, {\"title\": \"事假\", \"value\": \"事假\", \"checked\": true}, {\"title\": \"病假\", \"value\": \"病假\", \"checked\": false}], \"disabled\": false, \"required\": false, \"labelhide\": false, \"labelwidth\": 110, \"lay_search\": false}, {\"max\": 0, \"min\": 0, \"tag\": \"input\", \"name\": \"shiyou\", \"type\": \"text\", \"index\": 0, \"label\": \"请假事由\", \"table\": true, \"width\": 100, \"search\": false, \"verify\": \"\", \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": \"110\", \"placeholder\": \"请输入事情缘由\"}, {\"tag\": \"date\", \"name\": \"start_time\", \"index\": 4, \"label\": \"开始时间\", \"table\": false, \"width\": 100, \"search\": false, \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"data_range\": false, \"labelwidth\": 110, \"placeholder\": \"开始时间\", \"data_datetype\": \"datetime\", \"data_maxvalue\": \"9999-12-31\", \"data_minvalue\": \"1900-01-01\", \"data_dateformat\": \"yyyy-MM-dd HH:mm:ss\"}, {\"tag\": \"date\", \"name\": \"end_time\", \"index\": 5, \"label\": \"结束时间\", \"table\": false, \"width\": 100, \"search\": false, \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"data_range\": false, \"labelwidth\": 110, \"placeholder\": \"yyyy-MM-dd\", \"data_datetype\": \"datetime\", \"data_maxvalue\": \"9999-12-31\", \"data_minvalue\": \"1900-01-01\", \"data_dateformat\": \"yyyy-MM-dd HH:mm:ss\"}, {\"max\": 0, \"min\": 0, \"tag\": \"input\", \"name\": \"zongji\", \"type\": \"text\", \"index\": 6, \"label\": \"总计时长\", \"table\": true, \"width\": 100, \"search\": false, \"verify\": \"number\", \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": \"110\", \"placeholder\": \"请输入时长（天）\"}, {\"tag\": \"textarea\", \"name\": \"desc\", \"index\": 8, \"label\": \"备注\", \"table\": false, \"width\": 100, \"search\": false, \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": 110, \"placeholder\": \"请输入\"}]', '2023-03-24 19:23:55', '2023-04-04 15:26:54', NULL, 1, 1);
INSERT INTO `rt_form` VALUES (15, '加班申请', 'test1', 1, '[{\"max\": 0, \"min\": 0, \"tag\": \"input\", \"name\": \"input_0\", \"type\": \"text\", \"index\": 0, \"label\": \"加班原因\", \"table\": true, \"width\": 100, \"search\": false, \"verify\": \"\", \"default\": \"\", \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"maxlength\": \"\", \"labelwidth\": \"110\", \"placeholder\": \"请输入\"}, {\"tag\": \"date\", \"name\": \"date_4\", \"index\": 4, \"label\": \"开始时间\", \"table\": true, \"width\": 100, \"search\": false, \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"data_range\": false, \"labelwidth\": 110, \"placeholder\": \"yyyy-MM-dd\", \"data_datetype\": \"datetime\", \"data_maxvalue\": \"9999-12-31\", \"data_minvalue\": \"1900-01-01\", \"data_dateformat\": \"yyyy-MM-dd HH:mm:ss\"}, {\"tag\": \"date\", \"name\": \"date_5\", \"index\": 5, \"label\": \"结束时间\", \"table\": true, \"width\": 100, \"search\": false, \"disabled\": false, \"readonly\": false, \"required\": false, \"labelhide\": false, \"data_range\": false, \"labelwidth\": 110, \"placeholder\": \"yyyy-MM-dd\", \"data_datetype\": \"datetime\", \"data_maxvalue\": \"9999-12-31\", \"data_minvalue\": \"1900-01-01\", \"data_dateformat\": \"yyyy-MM-dd HH:mm:ss\"}]', '2023-03-27 07:27:40', '2023-04-04 16:56:36', NULL, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for rt_form_data
-- ----------------------------
DROP TABLE IF EXISTS `rt_form_data`;
CREATE TABLE `rt_form_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fid` int(10) unsigned DEFAULT NULL,
  `data` json DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) DEFAULT NULL COMMENT '添加人id',
  `status` tinyint(4) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='表单数据';

-- ----------------------------
-- Records of rt_form_data
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_gant
-- ----------------------------
DROP TABLE IF EXISTS `rt_gant`;
CREATE TABLE `rt_gant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='甘特图';

-- ----------------------------
-- Records of rt_gant
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_group_role
-- ----------------------------
DROP TABLE IF EXISTS `rt_group_role`;
CREATE TABLE `rt_group_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `time_limit` int(10) unsigned DEFAULT '30',
  `user_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `limit_user` int(10) unsigned DEFAULT '1' COMMENT '使用人数',
  `price` decimal(10,0) unsigned DEFAULT '0' COMMENT '价格',
  `isfree` tinyint(3) unsigned DEFAULT '0' COMMENT '是否为免费用户组1为是0不是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='租户权限组';

-- ----------------------------
-- Records of rt_group_role
-- ----------------------------
BEGIN;
INSERT INTO `rt_group_role` VALUES (1, '免费租户', '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,439,440,441,442,443,444,401,402,403,404,405,406,413,414,451,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,445,446,447,448,449,450,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,309,310,311,461,462,463,464,465,466,467,468,469,470,471,472,488,489,490,491,492,493,507,508,509,510,511,512,513,514,515,516,517,518,494,495,496,497,498,499,500,501,502,503,504,505,475,3,275,276,277,278,279,280,281,282,283,284,519,285,286,287,288,289,301,302,303,304,476,477', 1, NULL, 365, 1, '2023-03-28 09:08:43', '2023-03-29 16:55:29', 10, 0, 1);
INSERT INTO `rt_group_role` VALUES (2, '收费租户', '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,439,440,441,442,443,444,401,402,403,404,405,406,413,414,451,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,445,446,447,448,449,450,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,311,461,462,463,464,465,466,467,468,469,470,471,472,475,3,275,276,277,278,279,280,281,282,283,284,519,285,286,287,288,289,301,302,303,304,476,477', 1, NULL, 365, 1, '2023-03-28 09:12:50', '2023-04-03 14:46:41', 50, 999, 0);
COMMIT;

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
-- Records of rt_kanban
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of rt_kanban_item
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of rt_kanban_list
-- ----------------------------
BEGIN;
COMMIT;

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
  `desktop` tinyint(2) unsigned DEFAULT '0' COMMENT '桌面推荐',
  `is_sys` tinyint(3) unsigned DEFAULT '1' COMMENT '是否是系统菜单0是系统1是租户2是会员',
  `is_common` tinyint(3) unsigned DEFAULT '0' COMMENT '0不是1是',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `url` (`route`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=612 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统菜单';

-- ----------------------------
-- Records of rt_menu
-- ----------------------------
BEGIN;
INSERT INTO `rt_menu` VALUES (1, '内容管理', 'sys', 'content', '', 0, 2, 'layui-icon layui-icon-theme', '_self', 0, 0, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (2, '总台管理', 'sys', 'system', '', 0, 1, 'layui-icon layui-icon-set', '_self', 475, 0, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (3, '权限管理', 'auth', 'auth', '', 0, 2, 'layui-icon layui-icon-vercode', '_self', 475, 0, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (6, '公共模块', 'sys', 'common', '', 0, 3, 'layui-icon layui-icon-at', '_self', 0, 0, 1, 0, 1, 1);
INSERT INTO `rt_menu` VALUES (9, '菜单管理', 'menu', 'menu/oplist', 'menu/index.html', 1, 1, 'layui-icon layui-icon-gift', '_self', 2, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (13, '系统设置', 'set', 'set/list', 'set/list.html', 1, 2, 'layui-icon layui-icon-find-fill', '_self', 2, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (15, '前端菜单', 'menu', 'menu/list', '', 3, 0, 'layui-icon layui-icon-transfer', NULL, 6, 1, 1, 0, 0, 1);
INSERT INTO `rt_menu` VALUES (20, '新增菜单', 'menu', 'menu/add', '', 2, 20, 'layui-icon layui-icon-cols', '_self', 9, 2, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (21, '编辑菜单', 'menu', 'menu/edit', '', 2, 20, 'layui-icon layui-icon-add-1', '_self', 9, 2, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (22, '删除菜单', 'menu', 'menu/del', '', 2, 21, 'layui-icon layui-icon-delete', '_self', 9, 2, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (23, '查看菜单', 'menu', 'menu/one', '', 3, 20, 'layui-icon layui-icon-slider', '_self', 9, 2, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (28, '添加配置', 'auth', 'set/add', '', 2, 24, 'layui-icon layui-icon-at', '_self', 13, 2, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (29, '删除配置', 'set', 'set/delete', '', 2, 25, 'layui-icon layui-icon-mute', '_self', 13, 2, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (31, '编辑配置', 'set', 'set/edit', '', 2, 27, 'layui-icon layui-icon-export', '_self', 13, 2, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (32, '编辑配置前', 'set', 'set/editBefore', '', 3, 28, 'layui-icon layui-icon-rate-half', '_self', 13, 2, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (53, '首页工作台', 'common', 'index/welcome', 'index/welcome.html', 1, 1, 'layui-icon layui-icon-rate-solid', NULL, 6, 1, 0, 0, 0, 1);
INSERT INTO `rt_menu` VALUES (57, '菜单显示', 'menu', 'menu/ifshow', '', 2, 0, 'layui-icon layui-icon-mike', NULL, 9, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (84, '设置配置可用', 'set', 'set/enable', '', 3, 0, '', NULL, 13, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (86, '设置配置前', NULL, 'set/setBefore', '', 3, 0, 'layui-icon layui-icon-at', NULL, 13, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (87, '设置配置', NULL, 'set/setConf', '', 3, 0, 'layui-icon layui-icon-404', NULL, 13, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (123, '列表编辑字段', NULL, 'menu/editData', '', 2, 0, 'layui-icon layui-icon-key', NULL, 9, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (142, '上传文件', NULL, 'upload/index', '', 3, 0, 'layui-icon layui-icon-upload-drag', NULL, 6, 1, 1, 0, 0, 1);
INSERT INTO `rt_menu` VALUES (143, '注销登录', NULL, 'admin/loginOut', '', 2, 0, 'layui-icon layui-icon-delete', NULL, 6, 1, 1, 0, 0, 1);
INSERT INTO `rt_menu` VALUES (144, '计划任务', 'crons', 'crons/list', 'crons/list.html', 1, 9, 'layui-icon layui-icon-android', NULL, 2, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (145, '计划任务添加', 'crons', 'crons/add', 'crons/edit.html', 3, 0, '', NULL, 144, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (146, '计划任务编辑', 'crons', 'crons/edit', 'crons/edit.html', 3, 0, '', NULL, 144, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (147, '计划任务删除', 'crons', 'crons/del', '', 3, 0, '', NULL, 144, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (148, '计划任务编辑前', 'crons', 'crons/editBefore', '', 3, 0, '', NULL, 144, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (149, '演示文稿', NULL, 'ppt/list', 'ppt/list.html', 1, 20, 'layui-icon layui-icon-transfer', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (150, '演示文稿添加', NULL, 'ppt/add', 'ppt/edit.html', 3, 0, '', NULL, 149, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (151, '演示文稿编辑', NULL, 'ppt/edit', 'ppt/edit.html', 3, 0, '', NULL, 149, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (152, '演示文稿删除', NULL, 'ppt/del', '', 3, 0, '', NULL, 149, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (153, '演示文稿编辑前', NULL, 'ppt/editBefore', '', 3, 0, '', NULL, 149, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (154, '思维导图', NULL, 'mind/list', 'mind/list.html', 1, 0, 'layui-icon layui-icon-auz', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (155, '思维导图添加', NULL, 'mind/add', 'mind/edit.html', 3, 0, '', NULL, 154, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (156, '思维导图编辑', NULL, 'mind/edit', 'mind/edit.html', 3, 0, '', NULL, 154, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (157, '思维导图删除', NULL, 'mind/del', '', 3, 0, '', NULL, 154, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (158, '思维导图编辑前', NULL, 'mind/editBefore', '', 3, 0, '', NULL, 154, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (159, '表格管理', NULL, 'excel/list', 'excel/list.html', 1, 0, 'layui-icon layui-icon-tabs', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (160, 'excel管理添加', NULL, 'excel/add', 'excel/edit.html', 3, 0, '', NULL, 159, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (161, 'excel管理编辑', NULL, 'excel/edit', 'excel/edit.html', 3, 0, '', NULL, 159, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (162, 'excel管理删除', NULL, 'excel/del', '', 3, 0, '', NULL, 159, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (163, 'excel管理编辑前', NULL, 'excel/editBefore', '', 3, 0, '', NULL, 159, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (164, '导入EXCEL并存库', NULL, 'excel/upload', '', 3, 0, 'layui-icon layui-icon-fonts-code', NULL, 159, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (165, '流程图', NULL, 'flow/list', 'flow/list.html', 1, 0, 'layui-icon layui-icon-spread-left', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (166, '流程图添加', NULL, 'flow/add', 'flow/edit.html', 3, 0, '', NULL, 165, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (167, '流程图编辑', NULL, 'flow/edit', 'flow/edit.html', 3, 0, '', NULL, 165, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (168, '流程图删除', NULL, 'flow/del', '', 3, 0, '', NULL, 165, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (169, '流程图编辑前', NULL, 'flow/editBefore', '', 3, 0, '', NULL, 165, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (170, '文集管理', NULL, 'doc/list', 'doc/list.html', 1, 0, 'layui-icon layui-icon-email', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (171, '文档管理添加', NULL, 'doc/add', 'doc/edit.html', 3, 0, '', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (172, '文档管理编辑', NULL, 'doc/edit', 'doc/edit.html', 3, 0, '', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (173, '文档管理删除', NULL, 'doc/del', '', 3, 0, '', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (174, '文档管理编辑前', NULL, 'doc/editBefore', '', 3, 0, '', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (175, '文档添加前', NULL, 'doc/addBefore', '', 3, 0, 'layui-icon layui-icon-at', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (176, '上传文件', NULL, 'doc/upload', '', 3, 0, 'layui-icon layui-icon-addition', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (177, '新增文档', NULL, 'doc/addmd', '', 2, 0, 'layui-icon layui-icon-praise', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (178, '文档列表', NULL, 'doc/listmd', '', 3, 0, 'layui-icon layui-icon-link', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (179, '编辑文档前', NULL, 'doc/editmdBefore', '', 3, 0, 'layui-icon layui-icon-read', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (180, '编辑文档', NULL, 'doc/editmd', '', 3, 0, 'layui-icon layui-icon-transfer', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (181, '删除文档', NULL, 'doc/delmd', '', 3, 0, 'layui-icon layui-icon-logout', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (182, '编辑文档列表', NULL, 'doc/editData', '', 3, 0, 'layui-icon layui-icon-email', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (183, '回写数据', NULL, 'doc/back', '', 3, 0, 'layui-icon layui-icon-windows', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (190, '文章管理', NULL, 'art', 'art/list.html', 1, 0, 'layui-icon layui-icon-slider', NULL, 2, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (194, '文章列表', NULL, 'art/list', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (195, '添加文章', NULL, 'art/add', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (196, '编辑文章', NULL, 'art/edit', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (215, '文章分类列表', NULL, 'art/artcate', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (216, '甘特图', NULL, 'gant/list', 'gant/list.html', 1, 0, 'layui-icon layui-icon-survey', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (217, '甘特图添加', NULL, 'gant/add', 'gant/edit.html', 3, 0, '', NULL, 216, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (218, '甘特图编辑', NULL, 'gant/edit', 'gant/edit.html', 3, 0, '', NULL, 216, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (219, '甘特图删除', NULL, 'gant/del', '', 3, 0, '', NULL, 216, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (220, '甘特图编辑前', NULL, 'gant/editBefore', '', 3, 0, '', NULL, 216, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (221, '日程计划', NULL, 'planday/list', 'planday/index.html', 1, 0, 'layui-icon layui-icon-date', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (222, '日程计划添加', NULL, 'planday/add', '', 3, 0, '', NULL, 221, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (223, '日程计划编辑', NULL, 'planday/edit', '', 3, 0, '', NULL, 221, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (224, '日程计划删除', NULL, 'planday/del', '', 3, 0, '', NULL, 221, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (225, '日程计划编辑前', NULL, 'planday/editBefore', '', 3, 0, '', NULL, 221, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (226, '图片编辑器', NULL, 'picedit/list', 'picedit/list.html', 1, 0, 'layui-icon layui-icon-camera', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (227, '图片编辑器添加', NULL, 'picedit/add', 'picedit/edit.html', 3, 0, '', NULL, 226, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (228, '图片编辑器编辑', NULL, 'picedit/edit', 'picedit/edit.html', 3, 0, '', NULL, 226, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (229, '图片编辑器删除', NULL, 'picedit/del', '', 3, 0, '', NULL, 226, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (230, '图片编辑器编辑前', NULL, 'picedit/editBefore', '', 3, 0, '', NULL, 226, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (231, '编辑图片名字', NULL, 'picedit/editName', '', 3, 0, 'layui-icon layui-icon-rss', NULL, 226, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (237, 'svg编辑器', NULL, 'svgedit/list', 'svgedit/list.html', 1, 0, 'layui-icon layui-icon-diamond', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (238, 'svg编辑器添加', NULL, 'svgedit/add', 'svgedit/edit.html', 3, 0, '', NULL, 237, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (239, 'svg编辑器编辑', NULL, 'svgedit/edit', 'svgedit/edit.html', 3, 0, '', NULL, 237, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (240, 'svg编辑器删除', NULL, 'svgedit/del', '', 3, 0, '', NULL, 237, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (241, 'svg编辑器编辑前', NULL, 'svgedit/editBefore', '', 3, 0, '', NULL, 237, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (242, '判断登录', NULL, 'index/isLogin', '', 3, 0, 'layui-icon layui-icon-at', NULL, 6, 1, 1, 0, 0, 1);
INSERT INTO `rt_menu` VALUES (244, '聊天', NULL, 'chat/open', '', 3, 0, 'layui-icon layui-icon-username', NULL, 1, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (245, '关闭聊天socket', NULL, 'chat/close', '', 3, 0, 'layui-icon layui-icon-username', NULL, 244, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (246, '导入', NULL, 'excel/import', '', 3, 0, 'layui-icon layui-icon-username', NULL, 159, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (247, '文档编辑器', NULL, 'word/list', 'word/list.html', 1, 0, 'layui-icon layui-icon-read', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (248, '文档编辑器添加', NULL, 'word/add', 'word/edit.html', 3, 0, '', NULL, 247, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (249, '文档编辑器编辑', NULL, 'word/edit', 'word/edit.html', 3, 0, '', NULL, 247, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (250, '文档编辑器删除', NULL, 'word/del', '', 3, 0, '', NULL, 247, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (251, '文档编辑器编辑前', NULL, 'word/editBefore', '', 3, 0, '', NULL, 247, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (252, '打开文档', NULL, 'word/openFile', '', 3, 0, 'layui-icon layui-icon-android', NULL, 247, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (253, '上传文件', NULL, 'word/upload', '', 3, 0, 'layui-icon layui-icon-print', NULL, 247, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (254, '文本编辑器', NULL, 'txt/list', 'txt/list.html', 1, 0, 'layui-icon layui-icon-fonts-code', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (255, '文本编辑器添加', NULL, 'txt/add', 'txt/edit.html', 3, 0, '', NULL, 254, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (256, '文本编辑器编辑', NULL, 'txt/edit', 'txt/edit.html', 3, 0, '', NULL, 254, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (257, '文本编辑器删除', NULL, 'txt/del', '', 3, 0, '', NULL, 254, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (258, '文本编辑器编辑前', NULL, 'txt/editBefore', '', 3, 0, '', NULL, 254, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (259, '任务看板', NULL, 'kanban/list', 'kanban/list.html', 1, 0, 'layui-icon layui-icon-file-b', NULL, 1, 1, 1, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (260, '任务看板添加', NULL, 'kanban/add', 'kanban/edit.html', 3, 0, '', NULL, 259, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (261, '任务看板编辑', NULL, 'kanban/edit', 'kanban/edit.html', 3, 0, '', NULL, 259, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (262, '任务看板删除', NULL, 'kanban/del', '', 3, 0, '', NULL, 259, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (263, '任务看板编辑前', NULL, 'kanban/editBefore', '', 3, 0, '', NULL, 259, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (264, '开启关闭计划任务', NULL, 'crons/enable', '', 3, 0, 'layui-icon layui-icon-mute', NULL, 144, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (265, '导出', NULL, 'menu/sql', '', 3, 0, 'layui-icon layui-icon-email', NULL, 9, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (268, '地区管理', NULL, 'area/list', 'area/list.html', 1, 0, 'layui-icon layui-icon-website', NULL, 2, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (269, '地区管理添加', NULL, 'area/add', 'area/edit.html', 3, 0, '', NULL, 268, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (270, '地区管理编辑', NULL, 'area/edit', 'area/edit.html', 3, 0, '', NULL, 268, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (271, '地区管理删除', NULL, 'area/del', '', 3, 0, '', NULL, 268, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (272, '地区管理编辑前', NULL, 'area/editBefore', '', 3, 0, '', NULL, 268, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (273, '地区管理添加前', NULL, 'area/addBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 268, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (274, '设置地区可用', NULL, 'area/enable', '', 3, 0, 'layui-icon layui-icon-username', NULL, 268, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (275, '部门管理', NULL, 'user_dept/list', 'user_dept/list.html', 1, 0, 'layui-icon layui-icon-cols', NULL, 3, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (276, '部门管理添加', NULL, 'user_dept/add', 'user_dept/edit.html', 3, 0, 'layui-icon layui-icon-heart-fill', NULL, 275, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (277, '部门管理编辑', NULL, 'user_dept/edit', 'user_dept/edit.html', 3, 0, '', NULL, 275, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (278, '部门管理删除', NULL, 'user_dept/del', '', 3, 0, '', NULL, 275, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (279, '部门管理编辑前', NULL, 'user_dept/editBefore', '', 3, 0, '', NULL, 275, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (280, '公司管理', NULL, 'user_company/list', 'user_company/list.html', 1, 0, 'layui-icon layui-icon-cellphone', NULL, 3, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (281, '公司管理添加', NULL, 'user_company/add', 'user_company/edit.html', 3, 0, '', NULL, 280, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (282, '公司管理编辑', NULL, 'user_company/edit', 'user_company/edit.html', 3, 0, '', NULL, 280, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (283, '公司管理删除', NULL, 'user_company/del', '', 3, 0, '', NULL, 280, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (284, '公司管理编辑前', NULL, 'user_company/editBefore', '', 3, 0, '', NULL, 280, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (285, '岗位管理', NULL, 'user_pos/list', 'user_pos/list.html', 1, 0, 'layui-icon layui-icon-note', NULL, 3, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (286, '岗位管理添加', NULL, 'user_pos/add', 'user_pos/edit.html', 3, 0, '', NULL, 285, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (287, '岗位管理编辑', NULL, 'user_pos/edit', 'user_pos/edit.html', 3, 0, '', NULL, 285, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (288, '岗位管理删除', NULL, 'user_pos/del', '', 3, 0, '', NULL, 285, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (289, '岗位管理编辑前', NULL, 'user_pos/editBefore', '', 3, 0, '', NULL, 285, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (295, '白板管理', NULL, 'baiban/list', 'baiban/list.html', 1, 0, 'layui-icon layui-icon-picture-fine', NULL, 1, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (296, '白板管理添加', NULL, 'baiban/add', 'baiban/edit.html', 3, 0, '', NULL, 295, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (297, '白板管理编辑', NULL, 'baiban/edit', 'baiban/edit.html', 3, 0, '', NULL, 295, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (298, '白板管理删除', NULL, 'baiban/del', '', 3, 0, '', NULL, 295, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (299, '白板管理编辑前', NULL, 'baiban/editBefore', '', 3, 0, '', NULL, 295, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (300, '预览下载文档', NULL, 'doc/down', '', 2, 0, 'layui-icon layui-icon-username', NULL, 170, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (301, '钉钉管理', NULL, 'ding/listDept', 'ding/index.html', 0, 1, 'layui-icon layui-icon-form', NULL, 475, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (302, '部门管理', NULL, 'ding/listDept', 'ding/dept.html', 1, 0, 'layui-icon layui-icon-username', NULL, 301, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (303, '用户管理', NULL, 'ding/userList', 'ding/user.html', 1, 0, 'layui-icon layui-icon-face-smile', NULL, 301, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (304, '角色管理', NULL, 'ding/listRole', 'ding/role.html', 1, 0, 'layui-icon layui-icon-username', NULL, 301, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (305, '办公管理', NULL, 'oa', 'oa', 0, 0, 'layui-icon layui-icon-windows', NULL, 0, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (306, '项目管理', NULL, 'oa', 'server/oa', 0, 2, 'layui-icon layui-icon-share', NULL, 305, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (307, '库存管理', NULL, 'store', 'server/store', 0, 3, 'layui-icon layui-icon-rate-half', NULL, 305, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (308, '采购预算', NULL, 'budget', 'budget/list.html', 0, 4, 'layui-icon layui-icon-export', NULL, 305, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (311, '供应商管理', NULL, 'supplier', 'supplier', 0, 5, 'layui-icon layui-icon-dollar', NULL, 305, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (312, '模型管理', NULL, 'mod/list', 'mod/list.html', 1, 0, 'layui-icon layui-icon-key', NULL, 2, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (313, '添加模型', NULL, 'mod/add', 'mod/add.html', 2, 0, 'layui-icon layui-icon-transfer', NULL, 312, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (314, '添加模型前', NULL, 'mod/addBefore', 'mod/add.html', 3, 0, 'layui-icon layui-icon-username', NULL, 312, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (315, '编辑模型', NULL, 'mod/edit', 'mod/edit.html', 2, 0, 'layui-icon layui-icon-rss', NULL, 312, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (316, '编辑模型前', NULL, 'mod/editBefore', 'mod/edit.html', 3, 0, 'layui-icon layui-icon-username', NULL, 312, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (317, '删除模型', NULL, 'mod/delete', 'mod/list.html', 2, 0, 'layui-icon layui-icon-logout', NULL, 312, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (360, '项目列表', NULL, 'projects/list', 'projects/list.html', 1, 0, 'layui-icon layui-icon-wifi', NULL, 306, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (361, '项目列表添加', NULL, 'projects/add', 'projects/edit.html', 3, 0, '', NULL, 360, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (362, '项目列表编辑', NULL, 'projects/edit', 'projects/edit.html', 3, 0, '', NULL, 360, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (363, '项目列表删除', NULL, 'projects/del', '', 3, 0, '', NULL, 360, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (364, '项目列表编辑前', NULL, 'projects/editBefore', '', 3, 0, '', NULL, 360, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (365, '采购列表', NULL, 'purchase/list', 'purchase/list.html', 1, 0, 'layui-icon layui-icon-light', NULL, 308, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (366, '采购列表添加', NULL, 'purchase/add', 'purchase/edit.html', 3, 0, '', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (367, '采购列表编辑', NULL, 'purchase/edit', 'purchase/edit.html', 3, 0, '', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (368, '采购列表删除', NULL, 'purchase/del', '', 3, 0, '', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (369, '采购列表编辑前', NULL, 'purchase/editBefore', '', 3, 0, '', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (370, '项目文件', NULL, 'profile/list', 'profile/list.html', 1, 0, 'layui-icon layui-icon-username', NULL, 306, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (371, '项目文件添加', NULL, 'profile/add', 'profile/edit.html', 3, 0, '', NULL, 370, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (372, '项目文件编辑', NULL, 'profile/edit', 'profile/edit.html', 3, 0, '', NULL, 370, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (373, '项目文件删除', NULL, 'profile/del', '', 3, 0, '', NULL, 370, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (374, '项目文件编辑前', NULL, 'profile/editBefore', '', 3, 0, '', NULL, 370, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (375, '项目分类', NULL, 'procat/list', 'procat/list.html', 1, 0, 'layui-icon layui-icon-email', NULL, 306, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (376, '项目分类添加', NULL, 'procat/add', 'procat/edit.html', 3, 0, '', NULL, 375, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (377, '项目分类编辑', NULL, 'procat/edit', 'procat/edit.html', 3, 0, '', NULL, 375, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (378, '项目分类删除', NULL, 'procat/del', '', 3, 0, '', NULL, 375, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (379, '项目分类编辑前', NULL, 'procat/editBefore', '', 3, 0, '', NULL, 375, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (380, '项目分类添加前', NULL, 'procat/addBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 375, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (381, '项目文件添加前', NULL, 'profile/addBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 370, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (382, '项目添加前', NULL, 'projects/addBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 360, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (383, '库存字典', NULL, 'stock_dict/list', 'stock_dict/list.html', 1, 2, 'layui-icon layui-icon-website', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (384, '库存字典添加', NULL, 'stock_dict/add', 'stock_dict/edit.html', 3, 0, '', NULL, 383, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (385, '库存字典编辑', NULL, 'stock_dict/edit', 'stock_dict/edit.html', 3, 0, '', NULL, 383, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (386, '库存字典删除', NULL, 'stock_dict/del', '', 3, 0, '', NULL, 383, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (387, '库存字典编辑前', NULL, 'stock_dict/editBefore', '', 3, 0, '', NULL, 383, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (388, '启用禁用', NULL, 'stock_dict/enable', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 383, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (389, '物料管理', NULL, 'stock_goods/list', 'stock_goods/list.html', 1, 4, 'layui-icon layui-icon-gift', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (390, '物料管理添加', NULL, 'stock_goods/add', 'stock_goods/edit.html', 3, 0, '', NULL, 389, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (391, '物料管理编辑', NULL, 'stock_goods/edit', 'stock_goods/edit.html', 3, 0, '', NULL, 389, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (392, '物料管理删除', NULL, 'stock_goods/del', '', 3, 0, '', NULL, 389, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (393, '物料管理编辑前', NULL, 'stock_goods/editBefore', '', 3, 0, '', NULL, 389, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (394, '物料管理添加前', NULL, 'stock_goods/addBefore', '', 3, 0, '', NULL, 389, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (395, '仓库管理', NULL, 'stock_storehouse/list', 'stock_storehouse/list.html', 1, 3, 'layui-icon layui-icon-print', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (396, '仓库管理添加', NULL, 'stock_storehouse/add', 'stock_storehouse/edit.html', 3, 0, '', NULL, 395, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (397, '仓库管理编辑', NULL, 'stock_storehouse/edit', 'stock_storehouse/edit.html', 3, 0, '', NULL, 395, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (398, '仓库管理删除', NULL, 'stock_storehouse/del', '', 3, 0, '', NULL, 395, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (399, '仓库管理编辑前', NULL, 'stock_storehouse/editBefore', '', 3, 0, '', NULL, 395, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (400, '仓库管理添加前', NULL, 'stock_storehouse/addBefore', '', 3, 0, '', NULL, 395, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (401, '库存入库单', NULL, 'stock_in/list', 'stock_in/list.html', 1, 5, 'layui-icon layui-icon-diamond', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (402, '入库单添加', NULL, 'stock_in/add', 'stock_in/edit.html', 3, 0, '', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (403, '入库单编辑', NULL, 'stock_in/edit', 'stock_in/edit.html', 3, 0, '', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (404, '入库单删除', NULL, 'stock_in/del', '', 3, 0, '', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (405, '入库单编辑前', NULL, 'stock_in/editBefore', '', 3, 0, '', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (406, '入库单添加前', NULL, 'stock_in/addBefore', '', 3, 0, '', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (407, '库存申请单', NULL, 'stock_apply/list', 'stock_apply/list.html', 1, 8, 'layui-icon layui-icon-login-qq', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (408, '库存申请单添加', NULL, 'stock_apply/add', 'stock_apply/edit.html', 3, 0, '', NULL, 407, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (409, '库存申请单编辑', NULL, 'stock_apply/edit', 'stock_apply/edit.html', 3, 0, '', NULL, 407, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (410, '库存申请单删除', NULL, 'stock_apply/del', '', 3, 0, '', NULL, 407, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (411, '库存申请单编辑前', NULL, 'stock_apply/editBefore', '', 3, 0, '', NULL, 407, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (412, '库存申请单添加前', NULL, 'stock_apply/addBefore', '', 3, 0, '', NULL, 407, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (413, '导入入库单', NULL, 'stock_in/import', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (414, '导入入库单前', NULL, 'stock_in/importBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (415, '库存归还单', NULL, 'stock_back/list', 'stock_back/list.html', 1, 9, 'layui-icon layui-icon-email', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (416, '库存归还单添加', NULL, 'stock_back/add', 'stock_back/edit.html', 3, 0, '', NULL, 415, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (417, '库存归还单编辑', NULL, 'stock_back/edit', 'stock_back/edit.html', 3, 0, '', NULL, 415, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (418, '库存归还单删除', NULL, 'stock_back/del', '', 3, 0, '', NULL, 415, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (419, '库存归还单编辑前', NULL, 'stock_back/editBefore', '', 3, 0, '', NULL, 415, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (420, '库存归还单添加前', NULL, 'stock_back/addBefore', '', 3, 0, '', NULL, 415, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (421, '库存出库单', NULL, 'stock_out/list', 'stock_out/list.html', 1, 10, 'layui-icon layui-icon-username', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (422, '库存出库单添加', NULL, 'stock_out/add', 'stock_out/edit.html', 3, 0, '', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (423, '库存出库单编辑', NULL, 'stock_out/edit', 'stock_out/edit.html', 3, 0, '', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (424, '库存出库单删除', NULL, 'stock_out/del', '', 3, 0, '', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (425, '库存出库单编辑前', NULL, 'stock_out/editBefore', '', 3, 0, '', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (426, '库存出库单添加前', NULL, 'stock_out/addBefore', '', 3, 0, '', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (427, '库存调拨单', NULL, 'stock_transfer/list', 'stock_transfer/list.html', 1, 6, 'layui-icon layui-icon-username', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (428, '库存调拨单添加', NULL, 'stock_transfer/add', 'stock_transfer/edit.html', 3, 0, '', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (429, '库存调拨单编辑', NULL, 'stock_transfer/edit', 'stock_transfer/edit.html', 3, 0, '', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (430, '库存调拨单删除', NULL, 'stock_transfer/del', '', 3, 0, '', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (431, '库存调拨单编辑前', NULL, 'stock_transfer/editBefore', '', 3, 0, '', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (432, '库存调拨单添加前', NULL, 'stock_transfer/addBefore', '', 3, 0, '', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (433, '库存盘点单', NULL, 'stock_pan/list', 'stock_pan/list.html', 1, 7, 'layui-icon layui-icon-android', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (434, '库存盘点单添加', NULL, 'stock_pan/add', 'stock_pan/edit.html', 3, 0, '', NULL, 433, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (435, '库存盘点单编辑', NULL, 'stock_pan/edit', 'stock_pan/edit.html', 3, 0, '', NULL, 433, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (436, '库存盘点单删除', NULL, 'stock_pan/del', '', 3, 0, '', NULL, 433, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (437, '库存盘点单编辑前', NULL, 'stock_pan/editBefore', '', 3, 0, '', NULL, 433, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (438, '库存盘点单添加前', NULL, 'stock_pan/addBefore', '', 3, 0, '', NULL, 433, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (439, '仓库货架管理', NULL, 'stock_bar/list', 'stock_bar/list.html', 3, 0, 'layui-icon layui-icon-username', NULL, 395, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (440, '仓库货架管理添加', NULL, 'stock_bar/add', 'stock_bar/edit.html', 3, 0, '', NULL, 439, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (441, '仓库货架管理编辑', NULL, 'stock_bar/edit', 'stock_bar/edit.html', 3, 0, '', NULL, 439, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (442, '仓库货架管理删除', NULL, 'stock_bar/del', '', 3, 0, '', NULL, 439, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (443, '仓库货架管理编辑前', NULL, 'stock_bar/editBefore', '', 3, 0, '', NULL, 439, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (444, '仓库货架管理添加前', NULL, 'stock_bar/addBefore', '', 3, 0, '', NULL, 439, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (445, '库存分类', NULL, 'stock_cate/list', 'stock_cate/list.html', 1, 1, 'layui-icon layui-icon-username', NULL, 307, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (446, '库存分类管理添加', NULL, 'stock_cate/add', 'stock_cate/edit.html', 3, 0, '', NULL, 445, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (447, '库存分类管理编辑', NULL, 'stock_cate/edit', 'stock_cate/edit.html', 3, 0, '', NULL, 445, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (448, '库存分类管理删除', NULL, 'stock_cate/del', '', 3, 0, '', NULL, 445, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (449, '库存分类管理编辑前', NULL, 'stock_cate/editBefore', '', 3, 0, '', NULL, 445, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (450, '库存分类管理添加前', NULL, 'stock_cate/addBefore', '', 3, 0, '', NULL, 445, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (451, '下载模版', NULL, 'stock_in/downXlsxTpl', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 401, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (452, '编辑调拨数', NULL, 'stock_transfer/editTransNum', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (453, '添加缓冲数据', NULL, 'stock_transfer/addTmpTrans', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (454, '查看缓冲数据', NULL, 'stock_transfer/listTmpTrans', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (455, '审核调拨单', NULL, 'stock_transfer/checkTrans', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (456, '接收调拨单', NULL, 'stock_transfer/inTrans', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (457, '检索调拨库', NULL, 'stock_transfer/listTrans', 'stock_transfer/start.html', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (458, '查询调拨单号', NULL, 'stock_transfer/searchTransNo', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 427, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (459, '编辑盘点数', NULL, 'stock_pan/editPanNum', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 433, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (460, '判断用户', NULL, 'stock_apply/check', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 407, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (461, '供应商列表', NULL, 'supplier/list', 'supplier/list.html', 1, 0, 'layui-icon layui-icon-username', NULL, 311, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (462, '供应商管理添加', NULL, 'supplier/add', 'supplier/edit.html', 3, 0, '', NULL, 461, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (463, '供应商管理编辑', NULL, 'supplier/edit', 'supplier/edit.html', 3, 0, '', NULL, 461, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (464, '供应商管理删除', NULL, 'supplier/del', '', 3, 0, '', NULL, 461, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (465, '供应商管理编辑前', NULL, 'supplier/editBefore', '', 3, 0, '', NULL, 461, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (466, '供应商管理添加前', NULL, 'supplier/addBefore', '', 3, 0, '', NULL, 461, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (467, '商品管理', NULL, 'supplier_goods/list', 'supplier_goods/list.html', 1, 0, 'layui-icon layui-icon-email', NULL, 311, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (468, '供应商商品管理添加', NULL, 'supplier_goods/add', 'supplier_goods/edit.html', 3, 0, '', NULL, 467, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (469, '供应商商品管理编辑', NULL, 'supplier_goods/edit', 'supplier_goods/edit.html', 3, 0, '', NULL, 467, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (470, '供应商商品管理删除', NULL, 'supplier_goods/del', '', 3, 0, '', NULL, 467, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (471, '供应商商品管理编辑前', NULL, 'supplier_goods/editBefore', '', 3, 0, '', NULL, 467, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (472, '供应商商品管理添加前', NULL, 'supplier_goods/addBefore', '', 3, 0, '', NULL, 467, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (473, '采购添加前', NULL, 'purchase/addBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (475, '系统管理', NULL, 'user_auth', 'view', 0, 0, 'layui-icon layui-icon-rmb', NULL, 0, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (476, '钉钉配置', NULL, 'ding/setting', 'ding/setting.html', 1, 0, 'layui-icon layui-icon-wifi', NULL, 301, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (477, '数据同步', NULL, 'ding/synchro', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 301, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (478, '采购详情列表', NULL, 'purchase/detail', 'purchase/detail.html', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (479, '编辑单项前', NULL, 'purchase/editOneBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (480, '编辑单项', NULL, 'purchase/editOne', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (481, '添加单项', NULL, 'purchase/addOne', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (482, '删除单项', NULL, 'purchase/delOne', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (483, '导入数据', NULL, 'purchase/import', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (484, '编辑单条数据', NULL, 'purchase/editData', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (485, '统计子项目价格', NULL, 'purchase/countOne', 'purchase/detail.html', 2, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (486, '批量删除', NULL, 'purchase/delAll', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (487, '导入商品库', NULL, 'purchase/importGoods', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (488, '审批设置', NULL, 'approve/list', 'approve/list.html', 1, 0, 'layui-icon layui-icon-windows', NULL, 575, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (489, '审批流管理添加', NULL, 'approve/add', 'approve/edit.html', 3, 0, '', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (490, '审批流管理编辑', NULL, 'approve/edit', 'approve/edit.html', 3, 0, '', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (491, '审批流管理删除', NULL, 'approve/del', '', 3, 0, '', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (492, '审批流管理编辑前', NULL, 'approve/editBefore', '', 3, 0, '', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (493, '审批流管理添加前', NULL, 'approve/addBefore', '', 3, 0, '', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (494, '表单管理', NULL, 'form/list', 'form/list.html', 1, 0, 'layui-icon layui-icon-cols', NULL, 570, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (495, '表单引擎添加', NULL, 'form/add', 'form/edit.html', 3, 0, '', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (496, '表单引擎编辑', NULL, 'form/edit', 'form/edit.html', 3, 0, '', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (497, '表单引擎删除', NULL, 'form/del', '', 3, 0, '', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (498, '表单引擎编辑前', NULL, 'form/editBefore', '', 3, 0, '', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (499, '表单引擎添加前', NULL, 'form/addBefore', '', 3, 0, '', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (500, '查看数据', NULL, 'form/listData', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (501, '删除数据', NULL, 'form/delData', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (502, '添加数据', NULL, 'form/addData', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (503, '编辑数据', NULL, 'form/editData', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (504, '添加数据前', NULL, 'form/addDataBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (505, '编辑数据前', NULL, 'form/editDataBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 494, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (506, '批量新增', NULL, 'menu/addMany', 'menu/add-many.html', 2, 0, 'layui-icon layui-icon-username', NULL, 9, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (507, '状态添加', NULL, 'approve/statusAdd', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (508, '状态编辑', NULL, 'approve/statusEdit', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (509, '状态列表', NULL, 'approve/statusList', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (510, '状态删除', NULL, 'approve/statusDel', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (517, '查看日志', NULL, 'approve/msgList', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (518, '状态编辑前', NULL, 'approve/statusEditBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (519, '公司管理添加前', NULL, 'user_company/addBefore', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 280, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (545, '部门管理添加前', NULL, 'user_dept/addBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 275, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (552, '用户管理', NULL, 'user/list', 'user/list.html', 1, 0, 'layui-icon layui-icon-username', NULL, 3, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (553, '用户管理添加', NULL, 'user/add', 'user', 3, 0, 'layui-icon layui-icon-username', NULL, 552, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (554, '用户管理编辑', NULL, 'user/edit', 'user', 3, 0, 'layui-icon layui-icon-username', NULL, 552, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (555, '用户管理删除', NULL, 'user/del', 'user', 3, 0, 'layui-icon layui-icon-username', NULL, 552, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (556, '用户管理编辑前', NULL, 'user/editBefore', 'user', 3, 0, 'layui-icon layui-icon-username', NULL, 552, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (557, '用户管理添加前', NULL, 'user/addBefore', 'user', 3, 0, 'layui-icon layui-icon-username', NULL, 552, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (558, '门店管理', NULL, 'store/list', 'store/list.html', 1, 0, 'layui-icon layui-icon-username', NULL, 3, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (559, '门店管理添加', NULL, 'store/add', 'store/edit.html', 3, 0, '', NULL, 558, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (560, '门店管理编辑', NULL, 'store/edit', 'store/edit.html', 3, 0, '', NULL, 558, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (561, '门店管理删除', NULL, 'store/del', '', 3, 0, '', NULL, 558, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (562, '门店管理编辑前', NULL, 'store/editBefore', '', 3, 0, '', NULL, 558, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (563, '门店管理添加前', NULL, 'store/addBefore', '', 3, 0, '', NULL, 558, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (564, '角色管理', NULL, 'user_role/list', 'user_role/list.html', 1, 0, 'layui-icon layui-icon-username', NULL, 3, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (565, '角色管理添加', NULL, 'user_role/add', 'user_role/edit.html', 3, 0, '', NULL, 564, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (566, '角色管理编辑', NULL, 'user_role/edit', 'user_role/edit.html', 3, 0, '', NULL, 564, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (567, '角色管理删除', NULL, 'user_role/del', '', 3, 0, '', NULL, 564, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (568, '角色管理编辑前', NULL, 'user_role/editBefore', '', 3, 0, '', NULL, 564, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (569, '角色管理添加前', NULL, 'user_role/addBefore', '', 3, 0, '', NULL, 564, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (570, '工作流管理', NULL, 'works', 'view', 0, 0, 'layui-icon layui-icon-fire', NULL, 475, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (571, '钉数据回写', NULL, 'ding/dataecho', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 301, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (572, '状态添加前', NULL, 'approve/statusAddBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 488, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (573, '审批数据', NULL, 'approve/content', 'approve/content.html', 1, 0, 'layui-icon layui-icon-username', NULL, 575, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (574, '审批消息', NULL, 'approve/msgList', 'approve/msg.html', 1, 0, 'layui-icon layui-icon-username', NULL, 575, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (575, '审批管理', NULL, 'approve', '', 0, 0, 'layui-icon layui-icon-rate-solid', NULL, 475, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (576, '通过审批', NULL, 'approve/passApprove', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 573, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (577, '打回审批初始状态', NULL, 'approve/backOpenArrpove', 'view', 3, 0, 'layui-icon layui-icon-username', NULL, 573, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (578, '打回审批上一步', NULL, 'approve/backPrevArrpove', '', 3, 0, 'layui-icon layui-icon-username', NULL, 573, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (579, '提交审核', NULL, 'purchase/tickApprove', '', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (580, '编辑名称', NULL, 'flow/editName', '', 3, 0, 'layui-icon layui-icon-username', NULL, 165, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (581, '表单数据', NULL, 'form/listData', 'form/view.html', 0, 0, 'layui-icon layui-icon-auz', NULL, 570, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (582, '我的工作台', NULL, 'oa', 'oa', 0, 1, 'layui-icon layui-icon-windows', NULL, 305, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (583, '分享给我', NULL, 'share/tome', 'share/tome.html', 1, 0, 'layui-icon layui-icon-share', NULL, 582, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (584, '我的分享', NULL, 'share/my', 'share/my.html', 1, 0, 'layui-icon layui-icon-carousel', NULL, 582, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (585, '分享内容前', NULL, 'share/touserBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 584, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (586, '分享内容', NULL, 'share/touser', '', 3, 0, 'layui-icon layui-icon-username', NULL, 584, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (587, '查看编辑历史', NULL, 'share/history', 'share/history.html', 3, 0, 'layui-icon layui-icon-username', NULL, 583, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (588, '回滚数据', NULL, 'share/reback', '', 3, 0, 'layui-icon layui-icon-username', NULL, 583, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (589, '库存申请', NULL, 'stock_apply/userlist', 'stock_apply/userlist.html', 1, 0, 'layui-icon layui-icon-util', NULL, 582, 1, 0, 1, 1, 0);
INSERT INTO `rt_menu` VALUES (590, '用户添加库存申请', NULL, 'stock_apply/userAdd', '', 3, 0, 'layui-icon layui-icon-username', NULL, 589, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (591, '编辑库存申请前', NULL, 'stock_apply/userEditBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 589, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (592, '编辑库存申请', NULL, 'stock_apply/userEdit', '', 3, 0, 'layui-icon layui-icon-username', NULL, 589, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (593, '文章添加前', NULL, 'art/addBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (594, '上传图片', NULL, 'art/upload', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (595, '文章编辑前', NULL, 'art/editBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 190, 1, 0, 0, 0, 0);
INSERT INTO `rt_menu` VALUES (596, '修改密码', NULL, 'user/changepwd', '', 3, 0, 'layui-icon layui-icon-username', NULL, 6, 1, 0, 0, 1, 1);
INSERT INTO `rt_menu` VALUES (597, '视图管理', NULL, 'view/list', 'view/list.html', 0, 0, 'layui-icon layui-icon-cols', NULL, 475, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (598, '视图列表', NULL, 'view/list', 'view/list.html', 1, 0, 'layui-icon layui-icon-transfer', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (599, '视图添加', NULL, 'view/add', '', 3, 0, 'layui-icon layui-icon-username', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (600, '视图编辑', NULL, 'view/edit', '', 3, 0, 'layui-icon layui-icon-username', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (602, '视图删除', NULL, 'view/del', '', 3, 0, 'layui-icon layui-icon-username', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (603, '视图添加前', NULL, 'view/addBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (604, '视图编辑前', NULL, 'view/editBefore', '', 3, 0, 'layui-icon layui-icon-username', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (605, '视图内容编辑', NULL, 'view/content', '', 3, 0, 'layui-icon layui-icon-username', NULL, 597, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (606, '库存添加出库列表', NULL, 'stock_out/listOut', '', 3, 0, 'layui-icon layui-icon-username', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (607, '编辑出库数量', NULL, 'stock_out/editOutNum', '', 3, 0, 'layui-icon layui-icon-username', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (608, '添加缓存数据', NULL, 'stock_out/addTmpOut', '', 3, 0, 'layui-icon layui-icon-username', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (609, '查看缓存数据', NULL, 'stock_out/listTmpOut', '', 3, 0, 'layui-icon layui-icon-username', NULL, 421, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (610, '提交单项审核', NULL, 'purchase/tock', '', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
INSERT INTO `rt_menu` VALUES (611, '查看采购申请', NULL, 'purchase/viewBuyDataInfo', '', 3, 0, 'layui-icon layui-icon-username', NULL, 365, 1, 0, 0, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for rt_mind
-- ----------------------------
DROP TABLE IF EXISTS `rt_mind`;
CREATE TABLE `rt_mind` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='思维导图';

-- ----------------------------
-- Records of rt_mind
-- ----------------------------
BEGIN;
COMMIT;

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
  `tables_more` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类表',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1分类2不分类',
  `params` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '全局参数',
  `extra` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '扩展字段',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模块说明',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统模块表';

-- ----------------------------
-- Records of rt_mod
-- ----------------------------
BEGIN;
COMMIT;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='全局常量表';

-- ----------------------------
-- Records of rt_params
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_picedit
-- ----------------------------
DROP TABLE IF EXISTS `rt_picedit`;
CREATE TABLE `rt_picedit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图片编辑器';

-- ----------------------------
-- Records of rt_picedit
-- ----------------------------
BEGIN;
COMMIT;

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
  `group_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='日程计划';

-- ----------------------------
-- Records of rt_planday
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of rt_plugins
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_ppt
-- ----------------------------
DROP TABLE IF EXISTS `rt_ppt`;
CREATE TABLE `rt_ppt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='演示文稿';

-- ----------------------------
-- Records of rt_ppt
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_project
-- ----------------------------
DROP TABLE IF EXISTS `rt_project`;
CREATE TABLE `rt_project` (
  `project_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pro_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目编号',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目名称',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '项目地址',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '项目添加人',
  `leader_id` int(10) unsigned DEFAULT NULL COMMENT '项目负责人',
  `type` int(10) unsigned DEFAULT '1',
  `leader_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '负责人',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '项目说明',
  `status` tinyint(3) unsigned DEFAULT '0' COMMENT '状态：0申请1进行中9完结2搁置',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `start_time` timestamp NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`project_id`) USING BTREE,
  UNIQUE KEY `pro_no` (`pro_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目';

-- ----------------------------
-- Records of rt_project
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_project_file
-- ----------------------------
DROP TABLE IF EXISTS `rt_project_file`;
CREATE TABLE `rt_project_file` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `type` int(10) unsigned DEFAULT '0' COMMENT '类别',
  `file_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编号',
  `version` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '上传人',
  `desc` text COLLATE utf8mb4_unicode_ci COMMENT '应用场景',
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '缩略图',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `ref_pro` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '关联项目',
  `add_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `up_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目文件';

-- ----------------------------
-- Records of rt_project_file
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_project_type
-- ----------------------------
DROP TABLE IF EXISTS `rt_project_type`;
CREATE TABLE `rt_project_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sys_id` tinyint(4) unsigned DEFAULT '1' COMMENT '1项目分类2采购分类3检索分类',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目类型';

-- ----------------------------
-- Records of rt_project_type
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_purchase
-- ----------------------------
DROP TABLE IF EXISTS `rt_purchase`;
CREATE TABLE `rt_purchase` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `purchase_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '采购单编号',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '采购单名称',
  `leader_id` int(10) unsigned DEFAULT NULL COMMENT '负责人',
  `type` int(10) unsigned DEFAULT '1' COMMENT '采购类型',
  `user_id` int(10) unsigned DEFAULT NULL,
  `leader_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) unsigned DEFAULT '0' COMMENT '状态0初始未提交1待审核',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `start_time` timestamp NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预算';

-- ----------------------------
-- Records of rt_purchase
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_purchase_list
-- ----------------------------
DROP TABLE IF EXISTS `rt_purchase_list`;
CREATE TABLE `rt_purchase_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称或商品名称',
  `num` int(10) unsigned DEFAULT '1' COMMENT '数量',
  `price` decimal(20,2) unsigned DEFAULT '0.00' COMMENT '价格',
  `supplier_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '厂商',
  `pur_id` int(10) unsigned DEFAULT '0' COMMENT '主表id',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '上级id',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `goods_id` int(10) unsigned DEFAULT '0' COMMENT '商品id',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '说明',
  `all_price` decimal(20,2) unsigned DEFAULT '0.00' COMMENT '总价',
  `no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编号',
  `type` tinyint(4) unsigned DEFAULT '1' COMMENT '类型1为商品2为其他',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '申请人id',
  `ext_field` text COLLATE utf8mb4_unicode_ci,
  `ext_data` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(3) unsigned DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='采购内容';

-- ----------------------------
-- Records of rt_purchase_list
-- ----------------------------
BEGIN;
COMMIT;

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
  `admin_id` int(10) unsigned DEFAULT '0' COMMENT '管理员id',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `key` (`key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- ----------------------------
-- Records of rt_set
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_share
-- ----------------------------
DROP TABLE IF EXISTS `rt_share`;
CREATE TABLE `rt_share` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT '0',
  `to_user_id` int(10) unsigned DEFAULT '0',
  `data_id` int(10) unsigned DEFAULT '0',
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `can_edit` tinyint(2) unsigned DEFAULT '0' COMMENT '0不能编辑1可编辑',
  `can_out` tinyint(2) unsigned DEFAULT '0' COMMENT '0不分享1分享到外部',
  `ref_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `type` (`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='内容分享表';

-- ----------------------------
-- Records of rt_share
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_share_log
-- ----------------------------
DROP TABLE IF EXISTS `rt_share_log`;
CREATE TABLE `rt_share_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `share_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '10',
  `to_user_id` int(10) unsigned DEFAULT '0',
  `op_user_id` int(10) unsigned DEFAULT '0',
  `data_id` int(10) unsigned DEFAULT '0',
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `old_content` text COLLATE utf8mb4_unicode_ci,
  `old_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `type` (`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分享编辑日志';

-- ----------------------------
-- Records of rt_share_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_apply
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_apply`;
CREATE TABLE `rt_stock_apply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL COMMENT '申请人id',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `in_id` int(10) DEFAULT NULL COMMENT '入库单号',
  `sign` text COLLATE utf8mb4_unicode_ci COMMENT '电子签名',
  `check_id` int(10) DEFAULT NULL COMMENT '审批人',
  `check_time` timestamp NULL DEFAULT NULL COMMENT '审批时间',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '1申请中2申请通过3全部归还5部分归还',
  `num` int(10) DEFAULT NULL COMMENT '申请数量',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `back_time` timestamp NULL DEFAULT NULL COMMENT '归还时间',
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '申请人用户名',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `back_num` int(10) unsigned DEFAULT '0' COMMENT '归还数量',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存申请单';

-- ----------------------------
-- Records of rt_stock_apply
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_back
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_back`;
CREATE TABLE `rt_stock_back` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `apply_id` int(10) DEFAULT NULL COMMENT '申请单号',
  `user_id` int(10) DEFAULT NULL COMMENT '用户id',
  `num` int(10) DEFAULT NULL COMMENT '归还数量',
  `status` tinyint(4) unsigned DEFAULT '1' COMMENT '状态1提交中2已审核',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `check_id` int(10) DEFAULT NULL COMMENT '审批人',
  `check_time` timestamp NULL DEFAULT NULL COMMENT '审批时间',
  `check_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT '0',
  `sign` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存归还单';

-- ----------------------------
-- Records of rt_stock_back
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_bar
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_bar`;
CREATE TABLE `rt_stock_bar` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '货架名称',
  `area_id` int(10) unsigned DEFAULT NULL COMMENT '地区id',
  `bar_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '货架编号',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存货架';

-- ----------------------------
-- Records of rt_stock_bar
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_cate
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_cate`;
CREATE TABLE `rt_stock_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类名称',
  `ext` text COLLATE utf8mb4_unicode_ci COMMENT '扩展类型1输入框2多选3单选4下拉5文本',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `leaders` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理员',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存分类';

-- ----------------------------
-- Records of rt_stock_cate
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_dict
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_dict`;
CREATE TABLE `rt_stock_dict` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enable` tinyint(4) unsigned DEFAULT '1',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存字典';

-- ----------------------------
-- Records of rt_stock_dict
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_goods
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_goods`;
CREATE TABLE `rt_stock_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '物料名称',
  `stock_num` int(10) unsigned DEFAULT '0' COMMENT '物料数量',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '说明',
  `status` tinyint(3) unsigned DEFAULT '0' COMMENT '状态：0正常1关闭',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类',
  `unit_id` int(10) unsigned DEFAULT '0' COMMENT '单位/废弃',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存物料';

-- ----------------------------
-- Records of rt_stock_goods
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_in
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_in`;
CREATE TABLE `rt_stock_in` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名称',
  `in_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编码',
  `unit_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '单位',
  `stock_num` int(10) unsigned DEFAULT '0' COMMENT '数量',
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `in_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入库时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类id',
  `is_lock` tinyint(3) unsigned DEFAULT '0' COMMENT '0公开1锁定 申请盘点需锁定',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '货架id',
  `ext` text COLLATE utf8mb4_unicode_ci,
  `group_id` int(10) unsigned DEFAULT '0',
  `trans_num` int(10) unsigned DEFAULT '0' COMMENT '调拨数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='入库单';

-- ----------------------------
-- Records of rt_stock_in
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_num
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_num`;
CREATE TABLE `rt_stock_num` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '索引',
  `area_id` int(10) DEFAULT NULL COMMENT '地区id',
  `goods_id` int(10) DEFAULT NULL COMMENT '物料id',
  `stock_num` int(10) DEFAULT NULL COMMENT '数量',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '租户id',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '货架id',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存数量';

-- ----------------------------
-- Records of rt_stock_num
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_out
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_out`;
CREATE TABLE `rt_stock_out` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `in_id` int(10) DEFAULT NULL COMMENT '入库单号',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `num` int(10) DEFAULT NULL COMMENT '数量',
  `user_id` int(10) DEFAULT NULL COMMENT '使用人id',
  `check_id` int(10) DEFAULT NULL COMMENT '审批人',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `apply_id` int(10) DEFAULT NULL COMMENT '申请单号',
  `type` tinyint(4) unsigned DEFAULT '1' COMMENT '1员工申请2调拨单3企业自用9损耗',
  `transfer_id` int(10) DEFAULT NULL COMMENT '调拨单id',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类id',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '货架id',
  `group_id` int(10) unsigned DEFAULT '0',
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '出库单号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存出库单';

-- ----------------------------
-- Records of rt_stock_out
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_out_tmp
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_out_tmp`;
CREATE TABLE `rt_stock_out_tmp` (
  `tmp_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL COMMENT '发起人id',
  `trans_num` int(10) DEFAULT NULL COMMENT '调拨数量',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名称',
  `in_id` int(10) unsigned DEFAULT '0' COMMENT '从入库id',
  `in_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编码',
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类id',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '货架id',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`tmp_id`) USING BTREE,
  UNIQUE KEY `in_id` (`user_id`,`in_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存出库缓存单';

-- ----------------------------
-- Records of rt_stock_out_tmp
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_pan
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_pan`;
CREATE TABLE `rt_stock_pan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名称',
  `in_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编码',
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '添加人id',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `pan_num` int(10) unsigned DEFAULT '0' COMMENT '盘点数',
  `stock_num` int(10) unsigned DEFAULT '0' COMMENT '库存数',
  `status` tinyint(4) unsigned DEFAULT '1' COMMENT '1盘点中2盘点完成',
  `pan_no` bigint(20) unsigned DEFAULT '0' COMMENT '盘点单号',
  `op_user_id` int(10) DEFAULT NULL COMMENT '操作人',
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类id',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '货架id',
  `group_id` int(10) unsigned DEFAULT '0',
  `in_id` int(10) unsigned DEFAULT '0',
  `end_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `pan_no` (`pan_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存盘点单';

-- ----------------------------
-- Records of rt_stock_pan
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_storehouse
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_storehouse`;
CREATE TABLE `rt_stock_storehouse` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '仓库名称',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `leaders` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理员',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存仓库';

-- ----------------------------
-- Records of rt_stock_storehouse
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_trans_tmp
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_trans_tmp`;
CREATE TABLE `rt_stock_trans_tmp` (
  `tmp_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL COMMENT '发起人id',
  `trans_num` int(10) DEFAULT NULL COMMENT '调拨数量',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名称',
  `in_id` int(10) unsigned DEFAULT '0' COMMENT '从入库id',
  `in_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '编码',
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类id',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '货架id',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`tmp_id`) USING BTREE,
  UNIQUE KEY `in_id` (`user_id`,`in_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存调拨缓存单';

-- ----------------------------
-- Records of rt_stock_trans_tmp
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_stock_transfer
-- ----------------------------
DROP TABLE IF EXISTS `rt_stock_transfer`;
CREATE TABLE `rt_stock_transfer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL COMMENT '发起人id',
  `trans_num` int(10) DEFAULT NULL COMMENT '调拨数量',
  `status` tinyint(4) unsigned DEFAULT '1' COMMENT '状态1提交中2已审核出库3收货入库',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `ck_user_id` int(10) DEFAULT NULL COMMENT '审核人id',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名称',
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `in_id` int(10) unsigned DEFAULT '0' COMMENT '从入库id',
  `cate_id` int(10) unsigned DEFAULT '0' COMMENT '分类id',
  `to_in_id` int(10) unsigned DEFAULT '0' COMMENT '去入库id',
  `ck_time` timestamp NULL DEFAULT NULL COMMENT '出库时间',
  `in_time` timestamp NULL DEFAULT NULL COMMENT '入库时间',
  `way_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '运单号',
  `from_area_id` int(10) unsigned DEFAULT '0' COMMENT '从地区id',
  `to_area_id` int(10) unsigned DEFAULT '0' COMMENT '去地区id',
  `bar_id` int(10) unsigned DEFAULT '0' COMMENT '从货架id',
  `to_bar_id` int(10) unsigned DEFAULT '0' COMMENT '去货架id',
  `to_user_id` int(10) unsigned DEFAULT '0' COMMENT '收取人id',
  `from_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '出库备注',
  `to_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '入库备注',
  `group_id` int(10) unsigned DEFAULT '0',
  `trans_no` bigint(20) unsigned DEFAULT '0' COMMENT '制单号',
  `ck_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '审核备注',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `trans_no` (`trans_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存调拨单';

-- ----------------------------
-- Records of rt_stock_transfer
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_supplier
-- ----------------------------
DROP TABLE IF EXISTS `rt_supplier`;
CREATE TABLE `rt_supplier` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标注',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='供应商管理';

-- ----------------------------
-- Records of rt_supplier
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_supplier_goods
-- ----------------------------
DROP TABLE IF EXISTS `rt_supplier_goods`;
CREATE TABLE `rt_supplier_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `price_show` decimal(10,2) DEFAULT NULL COMMENT '展示价格',
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '型号',
  `supplier_id` int(10) unsigned DEFAULT '0',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标注',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `group_id` int(10) unsigned DEFAULT '0',
  `supplier_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`group_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='供应商商品';

-- ----------------------------
-- Records of rt_supplier_goods
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_svg
-- ----------------------------
DROP TABLE IF EXISTS `rt_svg`;
CREATE TABLE `rt_svg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='svg编辑器';

-- ----------------------------
-- Records of rt_svg
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_txt
-- ----------------------------
DROP TABLE IF EXISTS `rt_txt`;
CREATE TABLE `rt_txt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文本编辑器';

-- ----------------------------
-- Records of rt_txt
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_user
-- ----------------------------
DROP TABLE IF EXISTS `rt_user`;
CREATE TABLE `rt_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户姓名--例如张三',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户真实姓名',
  `password` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '登陆密码',
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'salt校验',
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '电子邮箱',
  `phone` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '手机号码',
  `isadmin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否为管理者 1==管理者 0==员工',
  `isleader` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否为部门管理员1是0不是',
  `status` tinyint(4) DEFAULT '0' COMMENT '状态，0：正常，1：删除，2封禁',
  `desc` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户描述信息',
  `remark` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '租户id',
  `rules` text COLLATE utf8mb4_unicode_ci COMMENT '权限',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `users` text COLLATE utf8mb4_unicode_ci COMMENT '用户sql权限',
  `avatar` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '头像地址',
  `telephone` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '座机',
  `job_number` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '员工工号',
  `work_place` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '办公地点',
  `login_num` int(10) unsigned DEFAULT '1',
  `role_id` int(10) unsigned DEFAULT '1',
  `ding_user_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hired_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE,
  UNIQUE KEY `ding_user_id` (`ding_user_id`,`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1439 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='租户用户表';

-- ----------------------------
-- Records of rt_user
-- ----------------------------
BEGIN;
INSERT INTO `rt_user` VALUES (1, 'admin', '测试企业', '4dac088638ed59b191c6ec7acf576493', 'EdEdShsEWb2G3hEF', NULL, NULL, 1, 1, 0, NULL, NULL, 1, '-1', '2023-03-29 16:32:48', '2023-07-27 15:25:47', '{\"user\":-1,\"user_company\":-1,\"user_dept\":-1,\"stock_storehouse\":-1,\"user_store\":-1,\"user_pos\":-1,\"user_role\":-1,\"user_area\":-1}', NULL, NULL, NULL, NULL, 84, 1, '1', NULL);
INSERT INTO `rt_user` VALUES (2, 'lrt888', '测试权限公司', 'be8f465ea7ecd3b37e6621f56e450f02', 'cyExiRCAkDdNk26w', NULL, NULL, 1, 1, 0, NULL, NULL, 2, '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,439,440,441,442,443,444,401,402,403,404,405,406,413,414,451,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,445,446,447,448,449,450,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,309,310,311,461,462,463,464,465,466,467,468,469,470,471,472,488,489,490,491,492,493,507,508,509,510,511,512,513,514,515,516,517,518,494,495,496,497,498,499,500,501,502,503,504,505,475,3,275,276,277,278,279,280,281,282,283,284,519,285,286,287,288,289,301,302,303,304,476,477', '2023-03-30 10:10:00', '2023-04-04 10:08:31', '{\"user\":-1,\"user_company\":-1,\"user_dept\":-1,\"stock_storehouse\":-1,\"user_store\":-1,\"user_pos\":-1,\"user_role\":-1,\"user_area\":-1}', NULL, NULL, NULL, NULL, 2, 1, '2', NULL);
INSERT INTO `rt_user` VALUES (3, 'lrt', '测试权限公司2', '5afc9ed561179278083252860357d16c', 'ErMGNBZAmcYKBiQC', NULL, NULL, 1, 1, 0, NULL, NULL, 3, '-1', '2023-03-30 10:26:48', '2023-04-04 10:08:35', '{\"user\":-1,\"user_company\":-1,\"user_dept\":-1,\"stock_storehouse\":-1,\"user_store\":-1,\"user_pos\":-1,\"user_role\":-1,\"user_area\":-1}', NULL, NULL, NULL, NULL, 17, 1, '3', NULL);
INSERT INTO `rt_user` VALUES (6, 'test2', 'test2', '1e2994b762ea32cd34707f7899069423', 'ywwCAZPmWC3AxzSZ', NULL, NULL, 0, 0, 0, NULL, '', 3, '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,445,446,447,448,449,450,383,384,385,386,387,388,395,396,397,398,399,400,439,440,441,442,443,444,389,390,391,392,393,394,401,402,403,404,405,406,413,414,451,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,309,310,311,461,462,463,464,465,466,467,468,469,470,471,472,488,512,513,514,515,516,517,518,489,490,491,492,493,507,508,509,510,511,494,495,496,497,498,499,500,501,502,503,504,505,475,301,302,303,304,476,477,3,275,276,277,278,279,280,519,281,282,283,284,285,286,287,288,289,545', '2023-03-31 17:11:09', '2023-04-04 10:08:37', '{\"user\":0,\"user_company\":\"18,21\",\"user_dept\":\"16,17\",\"stock_storehouse\":\"5\",\"user_store\":\"16,17\",\"user_pos\":\"17,18\",\"user_role\":\"18,19\",\"user_area\":\"620000,610000\",\"project\":\"7,9\"}', NULL, NULL, '', NULL, 1, 1, '4', NULL);
INSERT INTO `rt_user` VALUES (7, 'test3', 'test3', '', 'Xz8AhSM7aB4DkyD5', NULL, '13873150575', 0, 0, 0, NULL, '4', 3, '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,445,446,447,448,449,450,383,384,385,386,387,388,395,396,397,398,399,400,439,440,441,442,443,444,389,390,391,392,393,394,401,402,403,404,405,406,413,414,451,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,309,310,311,461,462,463,464,465,466,467,468,469,470,471,472,488,512,513,514,515,516,517,518,489,490,491,492,493,507,508,509,510,511,494,495,496,497,498,499,500,501,502,503,504,505,475,301,302,303,304,476,477,3,275,276,277,278,279,280,519,281,282,283,284,285,286,287,288,289,545', '2023-03-31 17:38:50', '2023-04-04 10:08:39', '{\"user\":0,\"user_company\":\"18,21\",\"user_dept\":\"16,17\",\"stock_storehouse\":\"5\",\"user_store\":\"16,17\",\"user_pos\":\"17,18\",\"user_role\":\"18\",\"user_area\":\"630000\",\"project\":\"7\"}', NULL, NULL, '2', NULL, 1, 1, '5', NULL);
COMMIT;

-- ----------------------------
-- Table structure for rt_user_auth
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_auth`;
CREATE TABLE `rt_user_auth` (
  `map_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `auth_id` int(10) unsigned NOT NULL COMMENT '对应compony dept role store stock',
  `flag` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '角色表',
  `group_id` int(10) unsigned DEFAULT '0',
  `is_leader` tinyint(3) unsigned DEFAULT '0' COMMENT '是否是管理员0不是1是',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`map_id`) USING BTREE,
  UNIQUE KEY `admin_id` (`user_id`,`auth_id`,`flag`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户权限映射表';

-- ----------------------------
-- Records of rt_user_auth
-- ----------------------------
BEGIN;
INSERT INTO `rt_user_auth` VALUES (23, 6, 18, 'user_company', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (24, 6, 21, 'user_company', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (25, 6, 18, 'user_role', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (26, 6, 19, 'user_role', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (27, 6, 16, 'user_store', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (28, 6, 17, 'user_store', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (29, 6, 16, 'user_dept', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (30, 6, 17, 'user_dept', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (31, 6, 17, 'user_pos', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (32, 6, 18, 'user_pos', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (33, 6, 5, 'stock_storehouse', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (34, 6, 7, 'project', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (35, 6, 9, 'project', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (36, 6, 620000, 'user_area', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (37, 6, 610000, 'user_area', 3, 0, '2023-03-31 17:11:09', '2023-03-31 17:11:09');
INSERT INTO `rt_user_auth` VALUES (66, 7, 18, 'user_company', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (67, 7, 21, 'user_company', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (68, 7, 18, 'user_role', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (69, 7, 16, 'user_store', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (70, 7, 17, 'user_store', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (71, 7, 16, 'user_dept', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (72, 7, 17, 'user_dept', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (73, 7, 17, 'user_pos', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (74, 7, 18, 'user_pos', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (75, 7, 5, 'stock_storehouse', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (76, 7, 7, 'project', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
INSERT INTO `rt_user_auth` VALUES (77, 7, 630000, 'user_area', 3, 0, '2023-03-31 18:04:49', '2023-03-31 18:04:49');
COMMIT;

-- ----------------------------
-- Table structure for rt_user_company
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_company`;
CREATE TABLE `rt_user_company` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `rules` text CHARACTER SET utf8,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '上级公司id',
  `group_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `tel` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '联系人',
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司邮箱',
  `post_code` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司邮编',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `have_child` tinyint(3) unsigned DEFAULT '0' COMMENT '是否拥有子公司0没有1有',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='租户公司表';

-- ----------------------------
-- Records of rt_user_company
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_user_dept
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_dept`;
CREATE TABLE `rt_user_dept` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rules` text CHARACTER SET utf8,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '部门名称',
  `pid` int(11) DEFAULT NULL COMMENT '上级部门ID',
  `order_num` int(11) DEFAULT '0' COMMENT '排序',
  `company_id` int(11) DEFAULT '0' COMMENT '公司id',
  `from_type` tinyint(4) DEFAULT '0' COMMENT '来源1钉钉2企业微信',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `duty` text COLLATE utf8mb4_unicode_ci COMMENT '职责',
  `has_user` int(10) unsigned DEFAULT '0',
  `have_child` tinyint(3) unsigned DEFAULT '0' COMMENT '是否拥有子部门0没有1有',
  `old_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `old_id` (`old_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='租户部门表';

-- ----------------------------
-- Records of rt_user_dept
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_user_group
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_group`;
CREATE TABLE `rt_user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司名称',
  `contact` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司联系人',
  `address` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司地址',
  `tel` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司电话',
  `is_stock` tinyint(3) DEFAULT '0' COMMENT '仓库启用标记，0未启用，1启用',
  `is_delete` tinyint(3) unsigned DEFAULT '0' COMMENT '删除标记，0未删除，1删除',
  `is_check` tinyint(3) unsigned DEFAULT '0' COMMENT '是否审核通过0未通过1通过',
  `is_project` tinyint(3) unsigned DEFAULT '0' COMMENT '是否启用项目管理',
  `is_form` tinyint(3) unsigned DEFAULT '0' COMMENT '是否启用表单引擎',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(10) DEFAULT NULL,
  `isfree` tinyint(3) unsigned DEFAULT '1' COMMENT '是否为免费用户组1为是0不是',
  `role_id` int(10) unsigned DEFAULT '0' COMMENT '用户组',
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `limit_user` int(10) unsigned DEFAULT '0',
  `use_user` int(10) unsigned DEFAULT '1',
  `price` decimal(10,2) unsigned DEFAULT '0.00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT COMMENT='租户系统参数';

-- ----------------------------
-- Records of rt_user_group
-- ----------------------------
BEGIN;
INSERT INTO `rt_user_group` VALUES (1, '测试企业', '涛哥', NULL, '13873150575', 0, 0, 0, 0, 0, '2023-03-29 16:32:48', '2023-03-29 16:32:48', 1, 1, 1, '2023-03-29 16:32:48', '2024-03-28 16:32:48', 10, 1, 0.00);
COMMIT;

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
-- Records of rt_user_loginlog
-- ----------------------------
BEGIN;
COMMIT;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户菜单';

-- ----------------------------
-- Records of rt_user_menu
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of rt_user_oplog
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_user_pos
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_pos`;
CREATE TABLE `rt_user_pos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '用户id',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `advertise` text COLLATE utf8mb4_unicode_ci COMMENT '招聘',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='岗位表';

-- ----------------------------
-- Records of rt_user_pos
-- ----------------------------
BEGIN;
INSERT INTO `rt_user_pos` VALUES (17, '部门经理', 1, '', 3, 3, '2023-03-31 09:12:40', '2023-03-31 09:12:40', '');
INSERT INTO `rt_user_pos` VALUES (18, '开发人员', 1, '', 3, 3, '2023-03-31 09:12:48', '2023-03-31 09:12:48', '');
COMMIT;

-- ----------------------------
-- Table structure for rt_user_role
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_role`;
CREATE TABLE `rt_user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '用户id',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `old_id` bigint(20) unsigned DEFAULT '0',
  `pid` int(10) unsigned DEFAULT '0',
  `have_child` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `old_id` (`old_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色表';

-- ----------------------------
-- Records of rt_user_role
-- ----------------------------
BEGIN;
INSERT INTO `rt_user_role` VALUES (1, '区域', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000380, 0, 1);
INSERT INTO `rt_user_role` VALUES (2, '岗位', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000376, 0, 1);
INSERT INTO `rt_user_role` VALUES (3, '职务', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000368, 0, 1);
INSERT INTO `rt_user_role` VALUES (4, '默认', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000363, 0, 1);
INSERT INTO `rt_user_role` VALUES (5, '主管', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000367, 4, 0);
INSERT INTO `rt_user_role` VALUES (6, '负责人', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000366, 4, 0);
INSERT INTO `rt_user_role` VALUES (7, '子管理员', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000365, 4, 0);
INSERT INTO `rt_user_role` VALUES (8, '主管理员', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000364, 4, 0);
INSERT INTO `rt_user_role` VALUES (9, '副部长', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 376591863, 3, 0);
INSERT INTO `rt_user_role` VALUES (10, '副总经理', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 330571017, 3, 0);
INSERT INTO `rt_user_role` VALUES (11, '总师办主任', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 330538289, 3, 0);
INSERT INTO `rt_user_role` VALUES (12, '总师', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 330300290, 3, 0);
INSERT INTO `rt_user_role` VALUES (13, '部长', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000373, 3, 0);
INSERT INTO `rt_user_role` VALUES (14, '管理办主任', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000372, 3, 0);
INSERT INTO `rt_user_role` VALUES (15, '总经理', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000369, 3, 0);
INSERT INTO `rt_user_role` VALUES (16, '财务助理', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 558351659, 2, 0);
INSERT INTO `rt_user_role` VALUES (17, '硬件设计', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 376667119, 2, 0);
INSERT INTO `rt_user_role` VALUES (18, '采购专员', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 376591864, 2, 0);
INSERT INTO `rt_user_role` VALUES (19, '结构设计', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 374832627, 2, 0);
INSERT INTO `rt_user_role` VALUES (20, '系统设计', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 374803576, 2, 0);
INSERT INTO `rt_user_role` VALUES (21, '软件设计', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 374730763, 2, 0);
INSERT INTO `rt_user_role` VALUES (22, '行政助理', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 374669861, 2, 0);
INSERT INTO `rt_user_role` VALUES (23, '高级管理者', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000379, 2, 0);
INSERT INTO `rt_user_role` VALUES (24, '管理层', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000378, 2, 0);
INSERT INTO `rt_user_role` VALUES (25, '项目经理', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000377, 2, 0);
INSERT INTO `rt_user_role` VALUES (26, '西区', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000384, 1, 0);
INSERT INTO `rt_user_role` VALUES (27, '东区', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000383, 1, 0);
INSERT INTO `rt_user_role` VALUES (28, '北区', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000382, 1, 0);
INSERT INTO `rt_user_role` VALUES (29, '南区', '-1', 0, NULL, 1, 1, '2023-04-04 11:04:10', '2023-04-04 11:04:10', 61000381, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for rt_user_store
-- ----------------------------
DROP TABLE IF EXISTS `rt_user_store`;
CREATE TABLE `rt_user_store` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `rules` text CHARACTER SET utf8,
  `status` tinyint(2) unsigned DEFAULT '0' COMMENT '是否可用0可用1不可用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `group_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area_id` int(10) unsigned DEFAULT '0' COMMENT '地区id',
  `tel` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '联系人',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `company_id` int(10) unsigned DEFAULT '0' COMMENT '所属公司',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='门店表';

-- ----------------------------
-- Records of rt_user_store
-- ----------------------------
BEGIN;
INSERT INTO `rt_user_store` VALUES (2, 'aaa', '1,4,5,7,37,53', 0, 'aaa', NULL, NULL, NULL, 0, NULL, NULL, '2023-03-27 16:40:17', '2023-03-27 16:40:17', 0);
INSERT INTO `rt_user_store` VALUES (15, 'test2', '1,4,5,7,37,53,2,9,20,21,22,23,57,10,26,27,56,58,59,60,61,11,24,25,62,63,64,65,12,66,67,68,13,28,29,30,31,32,14,33,34,35,36,3,15', 1, '', NULL, NULL, NULL, 0, NULL, NULL, '2023-03-27 16:40:17', '2023-03-27 16:40:17', 0);
INSERT INTO `rt_user_store` VALUES (16, 'test2', '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,445,446,447,448,449,450,383,384,385,386,387,388,395,396,397,398,399,400,439,440,441,442,443,444,389,390,391,392,393,394,401,402,403,404,405,406,413,414,451,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,309,310,311,461,462,463,464,465,466,467,468,469,470,471,472,488,512,513,514,515,516,517,518,489,490,491,492,493,507,508,509,510,511,494,495,496,497,498,499,500,501,502,503,504,505', 0, NULL, 3, 3, '', 130100, '222', '111', '2023-03-30 17:30:37', '2023-03-30 17:33:44', 21);
INSERT INTO `rt_user_store` VALUES (17, 'test12', '', 0, NULL, 3, 3, '', 110000, '', '', '2023-03-31 09:22:06', '2023-03-31 10:15:09', 18);
INSERT INTO `rt_user_store` VALUES (18, 'test', '', 0, NULL, 3, 3, '', 120100, '', '', '2023-03-31 11:03:12', '2023-03-31 16:28:47', 18);
INSERT INTO `rt_user_store` VALUES (19, 'test', '305,306,360,361,362,363,364,382,370,371,372,373,374,381,375,376,377,378,379,380,307,445,446,447,448,449,450,383,384,385,386,387,388,395,396,397,398,399,400,439,440,441,442,443,444,389,390,391,392,393,394,401,402,403,404,405,406,413,414,451,427,428,429,430,431,432,452,453,454,455,456,457,458,433,434,435,436,437,438,459,407,408,409,410,411,412,460,415,416,417,418,419,420,421,422,423,424,425,426,308,365,366,367,368,369,473,478,479,480,481,482,483,484,485,486,487,309,310,311,461,462,463,464,465,466,467,468,469,470,471,472,488,512,513,514,515,516,517,518,489,490,491,492,493,507,508,509,510,511,494,495,496,497,498,499,500,501,502,503,504,505', 0, NULL, 3, 3, '', 130101, '', '111', '2023-03-31 16:24:38', '2023-03-31 16:45:09', 18);
COMMIT;

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
-- Records of rt_user_viewlog
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rt_view
-- ----------------------------
DROP TABLE IF EXISTS `rt_view`;
CREATE TABLE `rt_view` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pid` int(10) unsigned DEFAULT '0' COMMENT '菜单id',
  `data` text COLLATE utf8mb4_unicode_ci,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `group_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '操作用户',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `type` tinyint(3) unsigned DEFAULT '0',
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of rt_view
-- ----------------------------
BEGIN;
INSERT INTO `rt_view` VALUES (1, 'test', 53, '[{\"index\":0,\"tag\":\"tab\",\"name\":\"tab_0\",\"options\":[{\"title\":\"选项1\",\"value\":\"tab1\",\"checked\":true},{\"title\":\"选项2\",\"value\":\"tab2\",\"checked\":false}],\"children\":[{\"children\":[]},{\"children\":[]}]},{\"index\":1,\"tag\":\"grid\",\"name\":\"grid_1\",\"column\":2,\"children\":[{\"children\":[]},{\"children\":[]}]}]', '', 1, 1, '2023-05-11 11:15:23', '2023-05-11 13:31:02', 1, 'layui-icon layui-icon-username');
INSERT INTO `rt_view` VALUES (2, 'test', 53, NULL, '', 1, 1, '2023-05-11 11:15:47', '2023-05-11 11:15:47', 1, 'layui-icon layui-icon-username');
INSERT INTO `rt_view` VALUES (3, 'test2', 53, '[{\"index\":0,\"tag\":\"tab\",\"name\":\"tab_0\",\"options\":[{\"title\":\"选项1\",\"value\":\"tab1\",\"checked\":true},{\"title\":\"选项2\",\"value\":\"tab2\",\"checked\":false}],\"children\":[{\"children\":[]},{\"children\":[]}]},{\"index\":4,\"tag\":\"grid\",\"name\":\"grid_4\",\"column\":\"4\",\"children\":[{\"children\":[{\"index\":9,\"tag\":\"icon\",\"name\":\"icon_9\",\"text\":\"图标2\",\"iconsize\":\"50\",\"fontsize\":12,\"icon\":\"layui-icon layui-icon-heart-fill\",\"href\":\"\"}]},{\"children\":[{\"index\":10,\"tag\":\"icon\",\"name\":\"icon_10\",\"text\":\"图标\",\"iconsize\":25,\"fontsize\":12,\"icon\":\"layui-icon layui-icon-mute\",\"href\":\"\"}]},{\"children\":[]}]},{\"index\":1,\"tag\":\"textarea\",\"name\":\"textarea_1\",\"label\":\"多行文本\",\"placeholder\":\"请输入\",\"default\":\"\",\"maxlength\":\"\",\"labelwidth\":110,\"width\":100,\"required\":false,\"search\":false,\"table\":false,\"readonly\":false,\"disabled\":false,\"labelhide\":false},{\"index\":2,\"tag\":\"space\",\"name\":\"space_2\",\"height\":10},{\"index\":5,\"tag\":\"tips\",\"name\":\"tips_5\",\"msg\":\"消息提示2222\",\"offset\":\"2\"},{\"index\":3,\"tag\":\"input\",\"label\":\"单行文本\",\"name\":\"input_3\",\"type\":\"text\",\"placeholder\":\"请输入\",\"default\":\"\",\"labelwidth\":\"110\",\"width\":100,\"maxlength\":\"\",\"min\":0,\"max\":0,\"required\":false,\"search\":false,\"table\":true,\"readonly\":false,\"disabled\":false,\"labelhide\":false,\"verify\":\"\"}]', 'dddc', 1, 1, '2023-05-11 11:16:13', '2023-05-12 09:12:40', 0, 'layui-icon layui-icon-mute');
COMMIT;

-- ----------------------------
-- Table structure for rt_view_user
-- ----------------------------
DROP TABLE IF EXISTS `rt_view_user`;
CREATE TABLE `rt_view_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `view_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `pid` int(10) unsigned DEFAULT '0',
  `group_id` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of rt_view_user
-- ----------------------------
BEGIN;
INSERT INTO `rt_view_user` VALUES (20, 3, 1, 53, 1);
INSERT INTO `rt_view_user` VALUES (21, 3, 1354, 53, 1);
INSERT INTO `rt_view_user` VALUES (22, 3, 1355, 53, 1);
COMMIT;

-- ----------------------------
-- Table structure for rt_word
-- ----------------------------
DROP TABLE IF EXISTS `rt_word`;
CREATE TABLE `rt_word` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 NOT NULL COMMENT '内容',
  `group_id` int(10) unsigned DEFAULT '0',
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `up_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `cid` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文档编辑器';

-- ----------------------------
-- Records of rt_word
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

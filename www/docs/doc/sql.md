## 表清单

| **#** | **数据表** | **名称** | **备注说明** |
| --- | --- | --- | --- |
| 1 | rt_achievement | 业绩表 ||
| 2 | rt_admin | 管理员表 ||
| 3 | rt_admin_auth | 管理权限表 ||
| 4 | rt_admin_log | 管理操作日志 ||
| 5 | rt_area | 区域表 ||
| 6 | rt_article | 文章 ||
| 7 | rt_cate | 系统分类表 ||
| 8 | rt_category | 文章分类 ||
| 9 | rt_city | 城市表 ||
| 10 | rt_company | 公司表 ||
| 11 | rt_config | 系统配置表 ||
| 12 | rt_crons | 系统计划任务表 ||
| 13 | rt_error | 系统错误日志表 ||
| 14 | rt_group | 集团表 ||
| 15 | rt_group_map | 集团下属关系表 ||
| 16 | rt_group_note | 集团公告表 ||
| 17 | rt_manager_change | 员工转店记录 ||
| 18 | rt_manager_log | 管理操作日志 ||
| 19 | rt_manager_map | 员工归属表 ||
| 20 | rt_manger | 员工表 ||
| 21 | rt_manger_auth | 员工权限表 ||
| 22 | rt_menu | 系统菜单 ||
| 23 | rt_msg | 待办消息表 ||
| 24 | rt_order | 订单表 ||
| 25 | rt_order_back | 作废单 ||
| 26 | rt_order_log | 订单日志表 ||
| 27 | rt_order_refund | 退款单 ||
| 28 | rt_order_service | 消耗单 ||
| 29 | rt_product | 商品表 ||
| 30 | rt_product_compose | 组合商品 ||
| 31 | rt_product_param | 商品规格单位字典 ||
| 32 | rt_product_price | 商品区间价 ||
| 33 | rt_sms | 系统短信表 ||
| 34 | rt_store | 门店表 ||
| 35 | rt_sys_cate | 系统总分类表 ||
| 36 | rt_user | 客户表 ||
| 37 | rt_user_level | 客户等级表 ||

## 表字段明细

### rt_achievement [业绩表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | achievement_id || INT UNSIGNED(11) | √ | √ |||
| 2 | order_id | 订单id | INT UNSIGNED(11) |||
| 3 | product_id | 商品id | INT UNSIGNED(11) |||
| 4 | group_id | 集团id | INT UNSIGNED(11) |||
| 5 | store_id | 店铺id | INT UNSIGNED(11) |||
| 6 | manager_id | 员工id | INT UNSIGNED(11) |||
| 7 | money | 实际业绩 | DECIMAL UNSIGNED(10,2) |||
| 8 | all_money | 订单总额 | DECIMAL UNSIGNED(10,2) |||
| 9 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 10 | update_time | 发放时间 | INT UNSIGNED(11) |||

### rt_admin [管理员表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | admin_id | 唯一标志 | INT(11) | √ | √ |  ||
| 2 | username | 用户名 | VARCHAR(50) || √ |||
| 3 | password | 密码 | VARCHAR(32) || √ |||
| 4 | salt | 密码钥匙 | VARCHAR(32) || √ |||
| 5 | role_id | 角色id | INT(11) || √ |||
| 6 | add_time | 添加时间 | INT(11) || √ |||
| 7 | name | 真实姓名 | VARCHAR(100) |||||
| 8 | mobile | 手机号 | INT(11) |||||
| 9 | status | 状态1正常0禁用 | TINYINT(4) || √ | 1 ||
| 10 | login_time | 登录时间 | INT(11) |||
| 11 | login_num | 登录次数 | INT(11) |||
| 12 | update_time | 更新时间 | INT(11) |||

### rt_admin_auth [管理权限表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | name || VARCHAR(255) |||||
| 3 | rules || TEXT(65535) |||||

### rt_admin_log [管理操作日志]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id | ID | INT UNSIGNED(11) | √ | √ |||
| 2 | admin_id | 管理员账号 | INT UNSIGNED(11) || √ |||
| 3 | log | 日志名称 | VARCHAR(255) || √ |||
| 4 | data | 返回记录 | TEXT(65535) |||||
| 5 | ip | IP地址 | VARCHAR(64) |||||
| 6 | agent | 客户端信息 | VARCHAR(255) |||||
| 7 | url | 地址 | VARCHAR(255) |||||
| 8 | method | 方法 | VARCHAR(100) |||||
| 9 | addtime | 添加时间 | INT UNSIGNED(11) |||

### rt_area [区域表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | area_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 区域名称 | VARCHAR(255) |||||
| 3 | group_id | 集团id | INT UNSIGNED(11) |||
| 4 | address | 地址 | VARCHAR(255) |||||
| 5 | city_id | 上级城市id | INT(11) |||||

### rt_article [文章]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id | ID | INT UNSIGNED(11) | √ | √ |||
| 2 | category_id | 分类:id:title | INT(11) || √ |||
| 3 | title | 文章名 | VARCHAR(128) || √ |||
| 4 | desc_content || VARCHAR(255) || √ |||
| 5 | image || VARCHAR(255) |||||
| 6 | content | 内容 | TEXT(65535) || √ |||
| 7 | author | 作者:id:name | VARCHAR(32) || √ |||
| 8 | show_switch | 展示:1=展示 | BIT(1) || √ | 1 | 0=隐藏 |
| 9 | show_time || DATETIME(19) |||||
| 10 | up_time || DATETIME(19) ||| &#39;CURRENT_TIMESTAMP&#39; ||
| 11 | add_time || DATETIME(19) ||| &#39;CURRENT_TIMESTAMP&#39; ||

### rt_cate [系统分类表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | pid | 上级id | INT(11) |||
| 3 | sid | 系统类型id | INT(11) |||
| 4 | fid | 系统分类标志 | INT(11) |||||
| 5 | lid | 层级 | INT(11) |||
| 6 | name | 名称 | VARCHAR(255) |||||
| 7 | desc | 描述 | TEXT(65535) |||||

### rt_category [文章分类]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id | ID | INT UNSIGNED(11) | √ | √ |||
| 2 | name | 分类名称 | VARCHAR(255) || √ |||
| 3 | status | 是否使用 | TINYINT(4) |||  | 预留 |
| 4 | ctype | 分类类型 | TINYINT(4) ||| 1 | 1新闻2账户类型3账户日志来源 |
| 5 | desc | 其他附加配置 | TEXT(65535) |||||
| 6 | flag | 分类标志 | INT(11) || √ |  | 同一分类不能重复 |

### rt_city [城市表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | city_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 城市名称 | VARCHAR(255) |||||
| 3 | group_id | 集团id | INT UNSIGNED(11) |||
| 4 | address | 地址 | VARCHAR(255) |||||
| 5 | company_id | 上级公司id | INT(11) |||||

### rt_company [公司表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | company_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 公司名称 | VARCHAR(255) |||||
| 3 | group_id | 集团id | INT UNSIGNED(11) |||
| 4 | address | 地址 | VARCHAR(255) |||||
| 5 | parent_id | 上级公司id | INT(11) |||||

### rt_config [系统配置表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | key || VARCHAR(128) |||||
| 3 | name || VARCHAR(128) |||||
| 4 | val || TEXT(65535) |||||
| 5 | isrun || TINYINT(4) ||| 1 ||
| 6 | param || TEXT(65535) |||||

### rt_crons [系统计划任务表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 任务名称 | VARCHAR(64) || √ |||
| 3 | interval | 执行间隔 | VARCHAR(128) |||| 毫秒为单位 |
| 4 | immediate | 是否立即执行 | BIT(1) ||| 1 ||
| 5 | handle | 执行路径 | VARCHAR(128) |||||
| 6 | enable | 是否开启 | BIT(1) ||| 1 ||
| 7 | type | one执行一次all一直执行 | VARCHAR(128) |||||
| 8 | addtime | 添加时间 | INT(11) |||
| 9 | uptime | 更新时间 | BIGINT(20) |||
| 10 | nexttime | 下次执行时间 | BIGINT(20) |||
| 11 | runtime | 每次执行的时间 | BIGINT(20) |||
| 12 | runtype | 执行类型0为间隔执行1为系统执行crontab | BIT(1) |||
| 13 | cron | Runtype为1时不能为空 | VARCHAR(255) |||| 如0 \*/1 \* \* \* |

### rt_error [系统错误日志表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | name || VARCHAR(255) |||||
| 3 | url || VARCHAR(255) |||||
| 4 | msg || TEXT(65535) |||||
| 5 | add_time || INT UNSIGNED(11) |||

### rt_group [集团表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | group_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 集团名称 | VARCHAR(255) |||||
| 3 | address | 集团地址 | VARCHAR(255) |||||
| 4 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 5 | manager_id | 主管理员id | INT UNSIGNED(11) |||
| 6 | admin_id | 审核或添加管理员id | INT(11) |||||
| 7 | store_num | 可控门店数 | INT UNSIGNED(11) |||
| 8 | end_time | 结束时间 | INT UNSIGNED(11) |||
| 9 | start_time | 开始时间 | INT UNSIGNED(11) |||
| 10 | status | 0正常1过期2禁用3删除 | TINYINT UNSIGNED(4) |||

### rt_group_map [集团下属关系表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | cate_id || INT UNSIGNED(11) | √ | √ |||
| 2 | group_id | 集团id | INT UNSIGNED(11) |||
| 3 | parent_id | 上级id | INT(11) |||||
| 4 | name | 名称 | VARCHAR(255) |||||
| 5 | type | 类型0公司1城市2区域3门店 | TINYINT UNSIGNED(4) |||
| 6 | manager_id | 操作员id | INT(11) |||||
| 7 | add_time | 添加时间 | INT UNSIGNED(11) |||||

### rt_group_note [集团公告表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | note_id || INT UNSIGNED(11) | √ | √ |||
| 2 | title | 标题 | VARCHAR(255) |||||
| 3 | content | 内容 | TEXT(65535) |||||
| 4 | group_id | 集团id | INT(11) |||||
| 5 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 6 | manager_id | 添加人 | INT UNSIGNED(11) |||

### rt_manager_change [员工转店记录]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | manager_id | 员工id | INT UNSIGNED(11) |||||
| 3 | type | 类型1申请转店2授权转店3禁止 | INT UNSIGNED(11) ||| 1 ||
| 4 | msg | 标记 | VARCHAR(255) |||||
| 5 | add_time | 时间 | INT UNSIGNED(11) |||||
| 6 | mgr_id | 审核人 | INT(11) |||||
| 7 | update_time | 审核时间 | INT UNSIGNED(11) |||

### rt_manager_log [管理操作日志]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id | ID | INT UNSIGNED(11) | √ | √ |||
| 2 | manager_id | 管理员账号 | INT UNSIGNED(11) || √ |||
| 3 | log | 日志名称 | VARCHAR(255) || √ |||
| 4 | data | 返回记录 | TEXT(65535) |||||
| 5 | ip | IP地址 | VARCHAR(64) |||||
| 6 | agent | 客户端信息 | VARCHAR(255) |||||
| 7 | url | 地址 | VARCHAR(255) |||||
| 8 | method | 方法 | VARCHAR(100) |||||
| 9 | addtime | 添加时间 | INT UNSIGNED(11) |||

### rt_manager_map [员工归属表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | manager_id || INT UNSIGNED(11) | √ | √ |||
| 2 | group_id | 集团id | INT UNSIGNED(11) |||
| 3 | company_ids | 公司归集id | VARCHAR(255) |||||
| 4 | city_ids | 城市归集id | VARCHAR(255) |||||
| 5 | store_ids | 门店归集id | VARCHAR(255) |||||
| 6 | position_ids | 岗位归集id | VARCHAR(255) |||||
| 7 | role_ids | 角色归集id | VARCHAR(255) |||||
| 8 | strore_id | 主门店id | INT UNSIGNED(11) |||
| 9 | role_id | 主角色id | INT UNSIGNED(11) |||

### rt_manger [员工表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | manger_id | 唯一标志 | INT UNSIGNED(11) | √ | √ |||
| 2 | username | 用户名 | VARCHAR(50) || √ |||
| 3 | password | 密码 | VARCHAR(32) || √ |||
| 4 | salt | 密码钥匙 | VARCHAR(32) || √ |||
| 5 | role_id | 角色id | INT(11) || √ |||
| 6 | add_time | 添加时间 | INT(11) || √ |||
| 7 | name | 真实姓名 | VARCHAR(100) |||||
| 8 | mobile | 手机号 | INT(11) |||||
| 9 | status | 状态1正常0禁用 | TINYINT(4) || √ | 1 ||
| 10 | login_time | 登录时间 | INT(11) |||
| 11 | login_num | 登录次数 | INT(11) |||
| 12 | update_time | 更新时间 | INT(11) |||
| 13 | group_id | 集团id | INT UNSIGNED(11) |||
| 14 | rules | 权限 | TEXT(65535) |||| 可单独设立 |
| 15 | usercode | 员工编号 | VARCHAR(255) || √ |||

### rt_manger_auth [员工权限表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | name || VARCHAR(255) |||||
| 3 | rules || TEXT(65535) |||||
| 4 | group_id | 集团id | INT UNSIGNED(11) |||

### rt_menu [系统菜单]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | name || VARCHAR(255) |||||
| 3 | url | 权限标志 | VARCHAR(255) |||||
| 4 | ismenu | 0目录1菜单2按钮 | TINYINT(4) |||
| 5 | order || INT(11) |||
| 6 | icon || VARCHAR(255) |||||
| 7 | target || VARCHAR(255) |||||
| 8 | pid || INT(11) |||
| 9 | lid || TINYINT(4) ||| 1 ||

### rt_msg [待办消息表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | msg_id || INT(11) | √ | √ |||
| 2 | msg | 消息 | VARCHAR(255) |||||
| 3 | url | 跳转地址 | VARCHAR(255) |||||
| 4 | type | 类型 | TINYINT(4) |||||
| 5 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 6 | update_time | 阅读时间 | INT(11) |||||

### rt_order [订单表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | order_id || INT UNSIGNED(11) | √ | √ |||
| 2 | order_num | 订单编号 | VARCHAR(100) |||||
| 3 | product_id | 商品id | INT UNSIGNED(11) || √ |||
| 4 | group_id | 集团id | INT(11) || √ |||
| 5 | need_pay | 应付 | DECIMAL(10,2) || √ |||
| 6 | true_pay | 实付 | DECIMAL(10,2) || √ |||
| 7 | has_use | 已消费金额 | DECIMAL(10,2) |||||
| 8 | status | 0未支付2已支付1审核中3作废4退款5关闭 | TINYINT UNSIGNED(4) || √ |||
| 9 | user_id | 用户id | INT UNSIGNED(11) || √ |||
| 10 | manager_id | 员工id | INT(11) || √ |||
| 11 | mgr_id | 审核员id | INT(11) |||||
| 12 | type | 0正常订单1业务订单2作废单3退款单 | TINYINT UNSIGNED(4) || √ |||
| 13 | store_id | 店铺id | INT UNSIGNED(11) |||
| 14 | pay_type | 支付方式 | VARCHAR(255) || √ |||
| 15 | order_from | 订单来源 | VARCHAR(255) |||||
| 16 | add_time | 添加时间 | INT(11) |||||
| 17 | pay_time | 支付时间 | INT(11) |||||
| 18 | check_time | 审核时间 | INT(11) |||||
| 19 | achievement | 总支付业绩 | DECIMAL(10,2) |||||
| 20 | service_num | 服务次数 | INT UNSIGNED(11) |||
| 21 | service_use | 已用次数 | INT UNSIGNED(11) |||
| 22 | remark | 标记 | VARCHAR(255) |||||

### rt_order_back [作废单]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | back_id || INT UNSIGNED(11) | √ | √ |||
| 2 | order_id | 订单id | INT(11) |||||
| 3 | add_time | 添加时间 | INT(11) |||||
| 4 | reason | 原因 | VARCHAR(255) |||||
| 5 | mgr_id | 作废人 | INT(11) |||||
| 6 | manager_id | 归属人 | INT(11) |||||

### rt_order_log [订单日志表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id || INT UNSIGNED(11) | √ | √ |||
| 2 | order_id | 订单id | INT(11) |||||
| 3 | mgr_id | 操作人 | INT(11) |||||
| 4 | add_time | 操作时间 | INT(11) |||||
| 5 | remark | 标记 | VARCHAR(255) |||||

### rt_order_refund [退款单]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | refund_id || INT UNSIGNED(11) | √ | √ |||
| 2 | order_id | 订单编号 | INT UNSIGNED(11) |||
| 3 | user_id | 用户id | INT UNSIGNED(11) |||
| 4 | store_id | 店铺id | INT UNSIGNED(11) |||
| 5 | group_id | 集团id | INT(11) |||||
| 6 | mgr_id | 操作人id | INT UNSIGNED(11) |||
| 7 | manager_id | 归属人id | INT(11) |||||
| 8 | reason | 退款原因 | VARCHAR(255) |||||
| 9 | has_pay | 实际支付金额 | DECIMAL(10,2) |||||
| 10 | has_use | 已消耗金额 | DECIMAL(10,2) |||||
| 11 | need_pay | 应退款金额 | DECIMAL(10,2) |||||
| 12 | true_pay | 实际退款金额 | DECIMAL(10,2) |||||
| 13 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 14 | check_time | 审核时间 | INT(11) |||||
| 15 | check_uid | 审核人 | INT(11) |||||
| 16 | type | 状态0提交审核1审核通过2驳回 | TINYINT UNSIGNED(4) |||

### rt_order_service [消耗单]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | service_id || INT UNSIGNED(11) | √ | √ |||
| 2 | order_id || INT(11) |||||
| 3 | service_num | 消耗的次数 | INT(11) |||||
| 4 | product_id | 商品id | INT(11) |||||
| 5 | group_id | 集团id | INT(11) |||||
| 6 | store_id | 商品id | INT(11) |||||
| 7 | add_time | 添加时间 | INT(11) |||||
| 8 | update_time | 更新时间 | INT(11) |||||
| 9 | manager_id | 员工id | INT(11) |||||
| 10 | user_id | 用户id | INT(11) |||||
| 11 | remark | 标记 | VARCHAR(255) |||||

### rt_product [商品表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | product_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 名称 | VARCHAR(255) || √ |||
| 3 | type | 类型0商品1消耗品2组合商品 | TINYINT UNSIGNED(4) || √ |||
| 4 | code | 编码 | VARCHAR(255) |||||
| 5 | format | 规格 | VARCHAR(255) |||||
| 6 | format_id | 规格id | INT UNSIGNED(11) |||
| 7 | unit | 单位 | DECIMAL(10,2) |||||
| 8 | unit_id | 单位id | INT UNSIGNED(11) |||
| 9 | stock | 库存 | INT UNSIGNED(11) |||
| 10 | price | 价格 | DECIMAL(10,2) |||||
| 11 | price_one | 单个售价 | DECIMAL UNSIGNED(10,2) ||| &#39;0.00&#39; ||
| 12 | price_low | 最低售价 | DECIMAL(10,2) |||||
| 13 | group_id | 集团id | INT UNSIGNED(11) |||
| 14 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 15 | update_time | 更新时间 | INT UNSIGNED(11) |||
| 16 | status | 状态0正常1下架 | TINYINT UNSIGNED(4) || √ |||
| 17 | manager_id | 添加人id | INT UNSIGNED(11) || √ |||
| 18 | service_num | 服务次数 | INT UNSIGNED(11) |||
| 19 | remark | 标签 | VARCHAR(255) |||||

### rt_product_compose [组合商品]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | compose_id || INT UNSIGNED(11) | √ | √ |||
| 2 | product_id | 商品主id | INT(11) |||||
| 3 | pro_id | 组合商品id | INT(11) |||||
| 4 | service_num | 服务次数 | INT(11) |||||
| 5 | price | 价格 | DECIMAL UNSIGNED(10,2) ||| &#39;0.00&#39; ||
| 6 | add_time | 添加时间 | INT UNSIGNED(11) |||

### rt_product_param [商品规格单位字典]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | param_id || INT UNSIGNED(11) | √ | √ |||
| 2 | type | 类别0规格1单位 | TINYINT UNSIGNED(4) |||
| 3 | name | 名称 | VARCHAR(255) |||||
| 4 | group_id | 集团id | INT(11) |||||
| 5 | add_time | 添加时间 | INT UNSIGNED(11) |||
| 6 | manager_id | 添加人 | INT(11) |||||

### rt_product_price [商品区间价]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | price_id || INT UNSIGNED(11) | √ | √ |||
| 2 | price | 价格 | DECIMAL UNSIGNED(10,2) ||| &#39;0.00&#39; ||
| 3 | strore_id | 门店id | INT UNSIGNED(11) |||
| 4 | group_id | 集团id | INT(11) |||||
| 5 | product_id | 商品id | INT(11) |||||
| 6 | can_edit | 是否可改价0可改1不可改 | TINYINT UNSIGNED(4) |||
| 7 | service_num | 服务次数 | INT UNSIGNED(11) |||

### rt_sms [系统短信表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | phone || BIGINT UNSIGNED(21) |||||
| 3 | sendtime || INT UNSIGNED(11) |||
| 4 | endtime || INT UNSIGNED(11) |||
| 5 | num || INT UNSIGNED(11) |||

### rt_store [门店表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | store_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 门店名称 | VARCHAR(255) |||||
| 3 | address | 门店地址 | VARCHAR(255) |||||
| 4 | group_id | 集团id | INT UNSIGNED(11) |||
| 5 | city_id | 城市id | INT UNSIGNED(11) |||
| 6 | company_id | 公司id | INT UNSIGNED(11) |||
| 7 | area_id | 区域id | INT UNSIGNED(11) |||
| 8 | status | 0正常1关闭 | TINYINT UNSIGNED(4) |||
| 9 | type | 0直营1渠道 | TINYINT UNSIGNED(4) |||
| 10 | add_time | 添加时间 | INT(11) |||||
| 11 | manager_id | 添加人id | INT UNSIGNED(11) |||

### rt_sys_cate [系统总分类表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | id || INT UNSIGNED(11) | √ | √ |||
| 2 | key | 唯一标志 | VARCHAR(100) |||
| 3 | name | 名称 | VARCHAR(255) |||||
| 4 | desc | 描述 | TEXT(65535) |||||

### rt_user [客户表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | user_id | 唯一标志 | INT UNSIGNED(11) | √ | √ |||
| 2 | username | 用户名 | VARCHAR(50) || √ |||
| 3 | password | 密码 | VARCHAR(32) || √ || 默认111111 |
| 4 | salt | 密码钥匙 | VARCHAR(32) || √ |||
| 5 | level_id | 用户等级 | INT(11) |||||
| 6 | balance | 用户积分 | DECIMAL(10,2) |||||
| 7 | add_time | 添加时间 | INT(11) || √ |||
| 8 | name | 真实姓名 | VARCHAR(100) |||||
| 9 | mobile | 手机号 | INT(11) |||||
| 10 | status | 状态1正常0禁用 | TINYINT(4) || √ | 1 ||
| 11 | login_time | 登录时间 | INT(11) |||
| 12 | login_num | 登录次数 | INT(11) |||
| 13 | update_time | 更新时间 | INT(11) |||
| 14 | group_id | 集团id | INT UNSIGNED(11) |||
| 15 | blone_id | 归属id | INT UNSIGNED(11) |||
| 16 | manager_id | 添加人id | INT UNSIGNED(11) |||
| 17 | all_use | 用户总支付 | DECIMAL UNSIGNED(10,2) ||| &#39;0.00&#39; ||
| 18 | remark | 标签 | VARCHAR(255) |||||

### rt_user_level [客户等级表]

| **#** | **字段** | **名称** | **数据类型** | **主键** | **非空** | **默认值** | **备注说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | level_id || INT UNSIGNED(11) | √ | √ |||
| 2 | name | 名称 | VARCHAR(255) |||||
| 3 | balance | 需要达到的积分 | DECIMAL(10,2) |||||


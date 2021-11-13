<a name="top"></a>
# <a name='menu'></a> menu

## <a name='获取单个菜单数据'></a> 获取单个菜单数据

```
GET menu/one
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| rttoken | `string` | <p>必填</p> |

### 请求参数 - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>菜单id</p> |

### Parameters examples
`type` - Request-Example:

```type
{
    id : 1
}
```

### 返回信息

#### 状态码 - `200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `type` | <p>description</p> |

### 返回事例

####  - `Success-Response:`

```type
[
        {
            "id": 0,
            "name": "顶层目录",
            "children": [
            {
                "id": 1,
                "title": "内容管理",
                "route": "content",
                "href": null,
                "type": 0,
                "order_num": 1,
                "icon": "layui-icon layui-icon-theme",
                "open_type": "_self",
                "pid": 0,
                "lid": 0,
                "ifshow": 0,
                "name": "内容管理",
                "open": false,
                "children": [
                {
                    "id": 4,
                    "title": "用户管理",
                    "route": "user/index",
                    "href": null,
                    "type": 1,
                    "order_num": 4,
                    "icon": "fa-stumbleupon-circle",
                    "open_type": "_self",
                    "pid": 1,
                    "lid": 1,
                    "ifshow": 0,
                    "name": "用户管理",
                    "checked": true,
                    "open": false
                }
                .......
        }
        ]
```

## <a name='获取管理菜单列表'></a> 获取管理菜单列表

```
GET menu/oplist
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| rttoken | `string` | <p>必填</p> |

### 返回信息

#### 状态码 - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| code | `number` | <p>结果码</p> |
| data | `string` | <p>数据</p> |
| message | `string` | <p>提示</p> |

## <a name='获取管理界面菜单'></a> 获取管理界面菜单

```
GET menu/list
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| rttoken | `string` | <p>必填</p> |

### 返回信息

#### 状态码 - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| code | `number` | <p>结果码</p> |
| data | `string` | <p>数据</p> |
| message | `string` | <p>提示</p> |

### 返回事例

####  - `Success-Response:`

```json
{
"code": 200,
"message": "ok",
"data":{[
]}
}
```


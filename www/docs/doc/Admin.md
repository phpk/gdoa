<a name="top"></a>
# <a name='Admin'></a> Admin

## <a name='测试'></a> 测试

<p>Create &amp; email a new Strider invite.</p>

```
POST /admin/invite/new
```

### 请求参数 - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| invite_code | `String` | <p>The invite code/token to use in the invitation</p> |
| email | `String` | <p>The email address of the new user being invited</p> |

### 实例
CURL Example:

```curl
curl -X POST -d invite_code=xoxox -d email=me[at]email.com http://localhost/invite/new
```


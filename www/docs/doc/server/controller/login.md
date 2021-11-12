# 用户登录
## 登录
> 方法：POST

### 参数

| **参数名** | **类型** | **说明** | **是否必填** |
| --- | --- | --- | --- |
|username| string|用户|√|
|password| string|密码| √|
|captcha | string|验证码 |√|
            
### 正确返回
```json
{
}
```

## 获取验证码
> 方法：GET

### 参数
> null

### 正确返回
```bash
base64位图片
```
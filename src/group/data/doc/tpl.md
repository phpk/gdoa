<a name="top"></a>
<% if (prepend) { -%>
<%- prepend %>
<% } -%>
<% data.forEach(group => { -%>
# <a name='<%= toLink(group.name) %>'></a> <%= group.name %>
<% group.subs.forEach(sub => { -%>

## <a name='<%= toLink(sub.title) %>'></a> <%= sub.title %>

<%- sub.description ? `${sub.description}\n\n` : '' -%>
```
<%- sub.type.toUpperCase() %> <%= sub.url %>
```
<% if (sub.header && sub.header.fields) { -%>
<% Object.entries(sub.header.fields).forEach(([headersGroup, headersGroupContent]) => { -%>

### Headers - `<%= headersGroup %>`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% headersGroupContent.forEach(header => { -%>
| <%- header.field %> | <%- header.type ? `\`${header.type}\`` : '' %> | <%- header.optional ? '**optional**' : '' %><%- header.description %> |
<% }) // foreach parameter -%>
<% }) // foreach header fields -%>
<% } // if parameters -%>
<% if (sub.header && sub.header.examples && sub.header.examples.length) { -%>

### Header examples
<% sub.header.examples.forEach(example => { -%>
<%= example.title %>

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>
<% if (sub.parameter && sub.parameter.fields) { -%>
<% Object.entries(sub.parameter.fields).forEach(([parametersGroup, parametersGroupContent]) => { -%>

### 请求参数 - `<%= parametersGroup -%>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% parametersGroupContent.forEach(param => { -%>
| <%- param.field -%> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional** ' : '' -%><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%= param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size %>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach parameters -%>
<% }) // foreach param parameter -%>
<% } // if parameters -%>
<% if (sub.examples && sub.examples.length) { -%>

### 实例
<% sub.examples.forEach(example => { -%>
<%= example.title %>

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>
<% if (sub.parameter && sub.parameter.examples && sub.parameter.examples.length) { -%>

### Parameters examples
<% sub.parameter.examples.forEach(exampleParam => { -%>
`<%= exampleParam.type %>` - <%= exampleParam.title %>

```<%= exampleParam.type %>
<%- exampleParam.content %>
```
<% }) // foreach exampleParam -%>
<% } // if exampleParam -%>
<% if (sub.success && sub.success.fields) { -%>

### 返回信息
<% Object.entries(sub.success.fields).forEach(([responsesGroup, responsesGroupContent]) => { -%>

#### 状态码 - `<%= responsesGroup %>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% responsesGroupContent.forEach(param => { -%>
| <%- param.field %> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach reponses -%>
<% }) // foreach field -%>
<% } // if success.fields -%>
<% if (sub.success && sub.success.examples && sub.success.examples.length) { -%>

### 返回事例
<% sub.success.examples.forEach(example => { -%>

####  - `<%= example.title %>`

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach success example -%>
<% } // if success.examples -%>
<% if (sub.error && sub.error.fields) { -%>

### 错误返回
<% Object.entries(sub.error.fields).forEach(([errorsGroup, errorsGroupContent]) => { -%>

#### Error response - `<%= errorsGroup %>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% errorsGroupContent.forEach(param => { -%>
| <%- param.field %> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach errors -%>
<% }) // foreach field -%>
<% } // if error.fields -%>
<% if (sub.error && sub.error.examples && sub.error.examples.length) { -%>

### 错误返回事例
<% sub.error.examples.forEach(example => { -%>

#### Error response example - `<%= example.title %>`

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach error example -%>
<% } // if error.examples -%>
<% }) // foreach sub -%>
<% }) // foreach group -%>

<% if (footer) { -%>
<%- footer %>
<% } -%>

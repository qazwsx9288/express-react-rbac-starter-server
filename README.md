# Server

## 特性

- 🔥 基于 express.js 的后端服务
- 🪪 使用 JWT 处理授权
- 💪 使用 mysql
- 📦 使用 sequelize，无 SQL 即可完成绝大多数业务开发
- 💯 自动扫描`controller`的路由，自动添加权限到数据库
- 🛃 最极简的 RBAC 实现，源码简洁易读
- 🫧 非常容易二次开发

## Todo List

- [x] 基本的框架搭建
- [x] 权限自动扫描
- [ ] 完善 mysql 结构
- [ ] 基本登陆
- [ ] RBAC 实现

## 路由命名和扫描规则

所有路由都应放置在`controller`目录下

├─controller
│ ├─user.js
│ ├─role.js
│ └─index.js

> 后续新增的路由，请在`controller/index.js`中注册，并以**文件名**作为该模块路由的根路径。

```js
// controller/index.js
const express = require('express');
const userController = require('./user');

const router = express.Router();

router.use('/user', userController);

module.exports = router;
```

> 在路由中以`@PermissionDes`开头为路由填写描述信息。该注释**必填**，否则无法自动扫描权限。

```js
// controller/user.js

// @PermissionDes 路由说明
router.post('/', async (req, res, next) => {
  // ...
});
```

**为什么需要在`controller/index.js`中手动声明路由：** 直接读取文件来 require 的方式，对于服务端来说还是不太安全的，所有的 require 最好都应该是字面量的形式。

## 返回结构

```json
{
  "code": 0,
  "data": "数据",
  "msg": "消息"
}
```

| code | Description |
| :--- | :---------- |
| 0    | 成功        |
| 5    | token 无效  |
| 7    | 请求失败    |

## 配置文件

将`config/index.example.js`重命名为`index.js`

配置项包含：

- 启动端口
- 数据库
- jwt
- 白名单路由（无需 token 即可访问的路由）

## 其他设置

- 使用`module-alias`配置了别名，`@` 相当于 `/src`

## 安装和运行

```bash
pnpm install

npm run start
```

## 部署到生产环境

生产环境建议使用 `pm2`

```bash
npm install pm2 -g
```

cd 项目根目录

```bash
pm2 start ./src/app.js --name myApp
pm2 stop myApp
pm2 restart myApp
pm2 logs myApp
```

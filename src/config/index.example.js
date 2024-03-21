module.exports = {
  port: 3000,
  mysql: {
    host: '0.0.0.0',
    database: 'express_base_rbac',
    username: 'root',
    password: '123456',
  },
  // 白名单路由
  permissionWhitelist: [{ path: '/user/login', method: 'POST' }],
  jwtSecret: 'yourJwtSecret',
  jwtExpire: '30d',
};

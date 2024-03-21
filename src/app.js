require('module-alias/register');

const express = require('express');
const config = require('@/config');
const routes = require('@/controller');
const { AutoPermission } = require('@/utils');
const { errorHandler, auth, jsonPase, res404 } = require('./middlewares');

// 启动express服务
function expressStart() {
  const app = express();

  // 中间件
  app.use(res404);
  app.use(jsonPase);
  app.use(auth);

  // 注册路由
  app.use(routes);

  // 错误处理中间件
  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`Start at: http://127.0.0.1:${config.port}`);
  });
}

async function main() {
  await AutoPermission();

  expressStart();
}

try {
  main();
} catch (error) {
  console.log(error);
}

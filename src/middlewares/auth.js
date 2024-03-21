const { verifyToken, ResData } = require('@/utils');
const { isWhiteRoute } = require('@/utils');

function authMiddleware(req, res, next) {
  const token = req.headers['x-token'];
  const fullPath = `${req.method} ${req.path}`;

  const isWhite = isWhiteRoute(fullPath);
  // 是白名单路由 无token
  if (isWhite && !token) {
    next();
    return;
  }

  // 有token 无论是否是白名单，都要校验token
  if (token) {
    try {
      const decoded = verifyToken(token);
      // 验证成功
      req.user = decoded;
      next();
    } catch (error) {
      // verifyToken 验证失败会抛出异常
      res.json(ResData.error({ msg: '登陆已过期，请重新登陆', code: 5 }));
    }
  } else {
    // 无token
    res.json(ResData.error({ msg: '未登录，请先登录', code: 5 }));
  }
}

module.exports = authMiddleware;

const config = require('@/config');

module.exports = {
  // 检查是否白名单中的路由 fullName格式: POST /user/login
  isWhiteRoute(fullName) {
    if (!config.permissionWhitelist || config.permissionWhitelist.length <= 0) {
      return false;
    }

    const hasRoute = config.permissionWhitelist.find((route) => {
      const whiteRoute = `${route.method} ${route.path}`;
      if (whiteRoute === fullName) {
        return true;
      }
    });

    if (hasRoute) {
      return true;
    }

    return false;
  },
};

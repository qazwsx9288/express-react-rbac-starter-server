// 全局的路由存储
class RouteStore {
  constructor() {
    this.routes = [];
  }

  // 添加路由
  addRoute(route) {
    this.routes.push(route);
  }

  // 获取全部路由
  getRoutes() {
    return this.routes;
  }

  // 检索路由
  findRoute(method, path) {
    // routes中的path已经去掉末尾的 /，检索只需要去掉入参path多余的末尾/
    let currentPath = path;
    if (currentPath.length > 1 && currentPath.endsWith('/')) {
      // 如果路由以/结尾，去掉
      currentPath = currentPath.substring(0, currentPath.length - 1);
    }

    return this.routes.find((route) => route.method === method && route.path === currentPath);
  }

  // 清理所有路由
  clear() {
    this.routes = [];
  }
}

const routeStore = new RouteStore();

module.exports = routeStore;

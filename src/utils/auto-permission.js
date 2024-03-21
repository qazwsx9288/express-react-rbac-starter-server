const fs = require('fs');
const path = require('path');
const { Permission, RolePermission } = require('@/models');
const { isWhiteRoute } = require('./helper');
const routeStore = require('./route-manager');

// 递归遍历目录
function readDirSync(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readDirSync(filePath, fileList); // 递归目录
    } else if (file.endsWith('.js')) {
      fileList.push(filePath); // 添加.js文件到列表
    }
  });

  return fileList;
}

// 解析文件中的权限和路由
function parsePermissionsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const permissionRegex = /\/\/\s*@PermissionDes\s+(.+?)\s*\n\s*router\.(\w+)\('([^']+)'/g;

  let match;
  const routes = [];

  match = permissionRegex.exec(content);
  while (match) {
    const permissionDes = match[1]; // 权限说明
    const method = match[2].toUpperCase(); // HTTP方法
    const routePath = match[3]; // 路由

    routes.push({ method, path: routePath, permissionDes });
    match = permissionRegex.exec(content);
  }

  return routes;
}

// 注册权限到数据库
async function doPermission(fullName, controllerName, description) {
  const existingPermission = await Permission.findOne({ where: { name: fullName } });

  // 当前处理的权限，是白名单
  if (isWhiteRoute(fullName)) {
    if (existingPermission) {
      // 删除关联表中的权限
      await RolePermission.destroy({
        where: { permissionId: existingPermission.id },
      });

      // 删除权限表中的权限
      await existingPermission.destroy();
      console.log(`从权限表中删除白名单API: ${fullName}`);
    }

    return;
  }

  if (!existingPermission) {
    await Permission.create({
      name: fullName,
      groupName: controllerName,
      description,
    });
  } else {
    // 数据已有该api，仅更新说明
    existingPermission.description = description;
    await existingPermission.save();
  }
}
// 处理所有的路由注册
async function registerPermissions(routes, controllerName) {
  const promiseArr = [];

  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    let fullPath = `/${controllerName}${route.path}`;

    if (fullPath.length > 1 && fullPath.endsWith('/')) {
      // 如果路由以/结尾，去掉
      fullPath = fullPath.substring(0, fullPath.length - 1);
    }
    const fullName = `${route.method} ${fullPath}`; // 权限名称 例如：POST /user/login

    // 处理存入路由到内存(用于404判定)

    routeStore.addRoute({
      ...route,
      path: fullPath,
    });

    // 处理注册到数据库
    promiseArr.push(doPermission(fullName, controllerName, route.permissionDes));
  }

  await Promise.all(promiseArr);
}

module.exports = async function scanAndRegisterPermissions() {
  const controllerDir = path.join(__dirname, '../controller');
  const fileList = readDirSync(controllerDir); // 读取目录下的所有.js文件

  const promiseArr = [];

  fileList.forEach(async (filePath) => {
    // console.log(`Parsing file: ${filePath}`);
    const controllerName = path.basename(filePath, '.js'); // 从文件路径中提取controller名称
    const routes = parsePermissionsFromFile(filePath); // 解析每个文件中定义的权限
    // console.log('Parsed routes:', routes);

    // 注册权限到数据库
    promiseArr.push(registerPermissions(routes, controllerName));
  });

  await Promise.all(promiseArr);

  console.log('权限注册完成');
};

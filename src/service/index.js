const userService = require('./user');
const roleService = require('./role');
const permissionService = require('./permission');

module.exports = {
  ...userService,
  ...roleService,
  ...permissionService,
};

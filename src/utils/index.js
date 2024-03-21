const AutoPermission = require('./auto-permission');
const pagination = require('./paginnation');
const ResData = require('./res-data');
const jwt = require('./jwt');
const helper = require('./helper');
const routeStore = require('./route-manager');

module.exports = {
  AutoPermission,
  ResData,
  routeStore,
  ...pagination,
  ...jwt,
  ...helper,
};

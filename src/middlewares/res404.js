const { routeStore } = require('@/utils');

module.exports = (req, res, next) => {
  const route = routeStore.findRoute(req.method, req.path);

  if (route) {
    next();
  } else {
    res.status(404).send('ERROR 404');
  }
};

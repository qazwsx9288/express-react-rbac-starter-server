const errorHandler = require('./error-handler');
const auth = require('./auth');
const jsonPase = require('./json-parse');
const res404 = require('./res404');

module.exports = {
  errorHandler,
  auth,
  jsonPase,
  res404,
};

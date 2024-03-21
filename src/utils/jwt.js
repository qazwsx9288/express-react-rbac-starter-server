const jwt = require('jsonwebtoken');
const config = require('@/config');

// 生成JWT
function generateToken(data) {
  return jwt.sign(data, config.jwtSecret, { expiresIn: config.jwtExpire }); // '1h'可以根据需要调整
}

// 验证JWT
function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = { generateToken, verifyToken };

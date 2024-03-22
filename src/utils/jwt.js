const jwt = require('jsonwebtoken');
const config = require('@/config');

// 生成JWT
function generateToken(user) {
  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpire }); // '1h'可以根据需要调整
  console.log(token);
  return token;
}

// 验证JWT
function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = { generateToken, verifyToken };

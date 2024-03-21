const express = require('express');

module.exports = express.json({
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf); // 尝试解析JSON
    } catch (e) {
      e.name = 'JSONParseError';
      // 这里只能抛出异常，不能响应
      throw e;
    }
  },
});

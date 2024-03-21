const { ResData } = require('@/utils');

const sequelizeErrorMap = {
  SequelizeUniqueConstraintError: '已存在相同的记录',
  SequelizeForeignKeyConstraintError: '存在关联数据，无法执行此操作',
  // 在json-parse自定义的
  JSONParseError: '参数解析错误',
};

function getErrorMessage(error) {
  // 这里我们尝试根据错误类型来定制消息
  // 例如，针对Sequelize的唯一约束错误，我们可以提取更具体的信息
  if (error.name === 'SequelizeUniqueConstraintError') {
    const field = error.errors[0].path;
    return `${field} 不能重复`;
  }

  // 返回通用或映射的错误消息
  return sequelizeErrorMap[error.name] || '服务器错误';
}

module.exports = (err, req, res, next) => {
  console.error(`该请求发生错误：${req.method} ${req.path}`);
  console.error(`body: ${JSON.stringify(req.body)}`);
  console.error(`query: ${JSON.stringify(req.query)}`);
  // 使用getErrorMessage函数来获取更友好的错误消息
  const message = getErrorMessage(err);
  console.error(`错误返回msg: ${message}`); // 在实际生产环境中，你可能希望将这些错误记录到日志文件
  console.error(`错误内容：${err}`);

  res.json(ResData.error({ msg: message }));
};

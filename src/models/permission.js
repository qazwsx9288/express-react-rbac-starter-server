const { DataTypes } = require('sequelize');
const sequelize = require('@/database');

const Permission = sequelize.define(
  // 模型名称。sequelize 会自动将其改为复数形式，作为数据库的表名（如果没有显式指定的话）
  'permission',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    groupName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    // 启用下划线到驼峰的自动转换
    underscored: true,
    // tableName: 'permissions', // 显式指定数据库中的表名
  }
);

module.exports = Permission;

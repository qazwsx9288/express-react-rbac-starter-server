const { DataTypes } = require('sequelize');
const sequelize = require('@/database');

// 定义数据模型
const RolePermission = sequelize.define(
  'rolePermission',
  {
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // 启用下划线到驼峰的自动转换
    underscored: true,
  }
);

module.exports = RolePermission;

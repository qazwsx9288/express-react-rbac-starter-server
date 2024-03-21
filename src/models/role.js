const { DataTypes } = require('sequelize');
const sequelize = require('@/database');
const Permission = require('./permission');

// 定义数据模型
const Role = sequelize.define(
  'role',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    // 启用下划线到驼峰的自动转换
    underscored: true,
  }
);

// 建立Role/Permission的多对多关系。这里的foreignKey无需数据库层面设置外键。
Role.belongsToMany(Permission, { through: 'role_permissions', foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: 'role_permissions', foreignKey: 'permission_id' });

module.exports = Role;

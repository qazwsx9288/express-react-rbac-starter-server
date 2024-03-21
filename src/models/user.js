const { DataTypes } = require('sequelize');
const sequelize = require('@/database');
const Role = require('./role');

// 定义数据模型
const User = sequelize.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 启用下划线到驼峰的自动转换
    underscored: true,
  }
);

// 建立Role/User的多对多关系
User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'user_id' });
Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'role_id' });

module.exports = User;

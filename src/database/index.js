const { Sequelize } = require('sequelize');
const configMysql = require('@/config').mysql;

const sequelize = new Sequelize(configMysql.database, configMysql.username, configMysql.password, {
  host: configMysql.host,
  dialect: 'mysql',
});

module.exports = sequelize;

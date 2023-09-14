const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlize', 'root', null, {
	host: '127.0.0.1',
	dialect: 'mysql',
});

module.exports = { sequelize }
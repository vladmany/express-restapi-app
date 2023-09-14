const { sequelize } = require('../DB');
const { DataTypes } = require('sequelize');

const Book = sequelize.define('Book', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	author: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	year: {
		type: DataTypes.SMALLINT,
		allowNull: false,
	}
}, {
	tableName: "books",
	timestamps: false,
});

module.exports = { Book };
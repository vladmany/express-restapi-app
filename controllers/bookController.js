const { Book } = require('../models/book');
const errorsHandler = require("../services/errorsHandler");

module.exports = {
	async index(req, res) {
		try {
			const books = await Book.findAll({});

			return res.json(books);
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async show(req, res) {
		try {
			const book = await Book.findByPk(req.params.id);

			return res.json(book);
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async store(req, res) {
		try {
			const data = req.body;

			await Book.create({
				title: data.title,
				author: data.author,
				year: data.year,
			});

			res.json({status: 'ok'});
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async update(req, res) {
		try {
			const id = req.params.id;
			const data = req.body;

			let item = await Book.findByPk(id);
			if (!item)
				res.json({status: 'error', message: 'Book not found'});

			for (let key in data) {
				if (item.dataValues.hasOwnProperty(key)) {
					item[key] = data[key];
				}
			}

			await item.save();

			res.json({status: 'ok', book: item})
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async del(req, res) {
		try {
			const book = await Book.findByPk(req.params.id);
			await book.destroy();

			res.json({status: 'ok'});
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	}
 }


const bookM = require('../models/book');
const errorsHandler = require("../services/errorsHandler");

module.exports = {
	async index(req, res) {
		try {
			const books = await bookM.all();

			return res.json(books);
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async show(req, res) {
		try {
			const book = await bookM.getOneById(req.params.id);

			return res.json(book);
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async store(req, res) {
		try {
			const data = req.body;

			await bookM.save({
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

			let updatedItem = await bookM.update(id, data);

			res.json({status: 'ok', book: updatedItem})
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	},
	async del(req, res) {
		try {
			const id = req.params.id;
			await bookM.del(id);

			res.json({status: 'ok'});
		} catch (e) {
			errorsHandler.handle(e, res);
		}
	}
 }


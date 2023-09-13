const fs = require('fs');
const { v4: uuidv4 } = require('uuid')

const DB_PATH = __dirname + '/../books.json';

module.exports = {
	all() {
		return new Promise((resolve, reject) => {
			fs.readFile(DB_PATH, 'utf-8', (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(data));
				}
			});
		});
	},
	async getOneById(id) {
		let books = await this.all();

		return books.find(book => book.id === id)
	},
	async save(data) {
		let books = await this.all();

		books.push({
			id: uuidv4(),
			title: data.title,
			author: data.author,
			year: data.year
		});

		return new Promise((resolve, reject) => {
			fs.writeFile(DB_PATH, JSON.stringify(books), (err) => {
				if (err)
					reject(err);
				else
					resolve();
			})
		});
	},
	async update(id, newItem) {
		let books = await this.all();

		let index = books.findIndex(book => book.id === id);
		if (index === -1) throw new Error('Book not found');

		for (let key in newItem) {
			if (!books[index].hasOwnProperty(key)) continue;

			books[index][key] = newItem[key];
		}

		return new Promise((resolve, reject) => {
			fs.writeFile(DB_PATH, JSON.stringify(books), (err) => {
				if (err)
					reject(err);
				else
					resolve(books[index]);
			});
		});
	},
	async del(id) {
		let books = await this.all();

		let index = books.findIndex(book => book.id === id);
		if (index === -1) throw new Error('Book not found');

		books.splice(index, 1);

		return new Promise((resolve, reject) => {
			fs.writeFile(DB_PATH, JSON.stringify(books), (err) => {
				if (err)
					reject(err);
				else
					resolve();
			})
		})
	}
}
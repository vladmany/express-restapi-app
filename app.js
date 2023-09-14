const express = require('express');
const app = express();
const routes = require('./routes/index')
const { Book } = require('./models/book')

app.use(express.json())

app.use('/api', routes);

app.listen(3000, async () => {
	console.log('Server is running');
	try {
		await Book.sync({
			alter: true,
			force: false,
		});
	} catch (e) {
		console.log(e);
	}
});
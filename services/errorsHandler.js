module.exports = {
	handle(error, res) {
		console.log(error);
		res.json({status: 'error'});
	}
}

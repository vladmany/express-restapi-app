var express = require('express');
const bookController = require("../controllers/bookController");
var router = express.Router();

router.get('/books', bookController.index);
router.get('/books/:id', bookController.show);
router.post('/books', bookController.store);
router.patch('/books/:id', bookController.update);
router.delete('/books/:id', bookController.del)

module.exports = router;
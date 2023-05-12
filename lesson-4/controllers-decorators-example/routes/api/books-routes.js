const express = require('express')

const router = express.Router()

const booksContoller = require('../../controllers/books-controller');
const validateBody = require('../../utils/validateBody');
const { bookAddSchema } = require('../../schemas');

router.get('/', booksContoller.getAllBooks);

router.get('/:id', booksContoller.getBookById)

router.post('/', validateBody(bookAddSchema), booksContoller.addBook)

router.put('/:id', validateBody(bookAddSchema), booksContoller.updateBookById)

router.delete('/:id', booksContoller.deleteBookById)

module.exports = router;
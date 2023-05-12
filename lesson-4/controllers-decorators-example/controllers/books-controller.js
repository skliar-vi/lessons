const bookService = require('../models/books')
const { HttpError } = require('../helpers')
const { ctrlWrapper } = require('../utils')

const getAllBooks = async (req, res, next) => {
    const books = await bookService.getAllBooks();
    res.json(books)
}

const getBookById = async (req, res, next) => {
    const { id } = req.params
    const book = await bookService.getBookById(id);
    if (!book) {
        throw HttpError(404, 'Not found');
    }

    res.json(book);
}

const addBook = async (req, res, next) => {
    const { title, author } = req.body;

    const book = await bookService.addBook({ title, author });

    res.status(201).json(book)
}

const updateBookById = async (req, res, next) => {
    const { title, author } = req.body;

    const book = await bookService.addBook({ title, author });

    res.status(201).json(book)
}

const deleteBookById = async (req, res, next) => {
    const { id } = req.params;

    const book = await bookService.deleteBookById(id);

    if (!book) {
        throw HttpError(404)
    }

    res.json({
        message: "Delete success"
    })
}

module.exports = {
    getAllBooks: ctrlWrapper(getAllBooks),
    getBookById: ctrlWrapper(getBookById),
    addBook: ctrlWrapper(addBook),
    updateBookById: ctrlWrapper(updateBookById),
    deleteBookById: ctrlWrapper(deleteBookById),
}
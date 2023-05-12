const express = require('express')
const Joi = require('joi')
const router = express.Router()
const { HttpError } = require('../../helpers')
const bookService = require('../../models/books/index');

const bookAddSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books)
    }
    catch (error) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await bookService.getBookById(id);
        if (!book) {
            throw HttpError(404, 'Not found');
        }

        res.json(book);
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { error } = bookAddSchema.validate(req.body)

        if (error) {
            throw HttpError(400);
        }

        const { title, author } = req.body;

        const book = await bookService.addBook({ title, author });

        res.status(201).json(book)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const { error } = bookAddSchema.validate(req.body)

        if (error) {
            throw HttpError(400, error.message)
        }

        const { title, author } = req.body;
        const book = await bookService.updateBookById(id, { title, author });

        if (!book) {
            throw HttpError(404)
        }

        res.json(book);
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await bookService.deleteBookById(id);

        // res.status(204).send()
        res.json({
            message: "Delete success"
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router;
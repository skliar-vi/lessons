const { Book } = require("../models/book");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const getAllBooks = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Book.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "-_id name email");
    res.json(result);
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    // const result = await Book.findOne({_id: id});
    const result = await Book.findOne({ _id: id, owner }).populate("owner", "-_id name email");
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
}

const addBook = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Book.create({ ...req.body, owner });
    res.status(201).json(result);
}

const updateBookById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;

    // const result = await Book.updateOne({ _id: id, owner }, req.body, { new: true });
    // if (result.modifiedCount == 0) {
    //     throw HttpError(404, `Book with ${id} not found`);
    // }

    // const book = await Book.findById(id);
    const book = await Book.findOne({ _id: id, owner });

    if (!book) {
        throw HttpError(404, `Book with ${id} not found`);
    }

    const result = await Book.findByIdAndUpdate(id, req.body, { new: true })

    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }

    res.json(result);
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user

    const result = await Book.updateOne({ _id: id, owner }, req.body, { new: true });
    console.log(result);
    if (result.modifiedCount == 0) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    const book = await Book.findById(id);

    res.json(book);
}

const deleteBookById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await Book.deleteOne({ _id: id, owner });
    if (result.deletedCount == 0) {
        throw HttpError(404, `Book with ${id} not found`);
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
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteBookById: ctrlWrapper(deleteBookById),
}
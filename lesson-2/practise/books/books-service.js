import { readFile, writeFile } from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const booksPath = path.join(fileURLToPath(import.meta.url), '..', 'books.json')

const saveResults = async (books) => {
    return await writeFile(booksPath, JSON.stringify(books, null, '\t'));
}

export const getAll = async () => {
    return JSON.parse(await readFile(booksPath));
}

export const getById = async (id) => {
    const books = await getAll();

    return books.find((book) => book.id == id) || null;
}

export const create = async ({ title, author }) => {
    const books = await getAll();

    const newBook = {
        id: nanoid(),
        title,
        author
    }

    books.push(newBook);

    await saveResults(books);

    return newBook;
}

export const updateById = async (id, { title, author }) => {  //PUT books.ua/api/books/:id 
    const books = await getAll();

    const index = books.findIndex((book) => book.id == id)

    if (index == -1) {
        return null
    }

    books[index] = {
        id,
        title,
        author,
    }

    await saveResults(books);

    return books[index];
}

export const deleteById = async (id) => {
    const books = await getAll();

    const deletableBookIndex = books.findIndex((book) => book.id == id)

    if (deletableBookIndex == -1) {
        return null
    }

    const deletedBook = books.splice(deletableBookIndex, 1);

    await saveResults(books);

    return deletedBook
}

import { getAll, getById, create, updateById, deleteById } from './books/books-service.js'
import { program } from 'commander';

const invoke = async ({ action, id, title, author }) => {
    switch (action) {
        case 'getAll':
            const books = await getAll()
            console.log(books);
            break;
        case 'getById':
            const book = await getById(id);
            console.log(book)
            break;
        case 'create':
            const newBook = await create({ title, author });
            console.log(newBook)
            break;
        case 'updateById':
            const updatedBook = await updateById(id, { title, author });
            console.log(updatedBook);
            break;
        case 'deleteById':
            const deletedBook = await deleteById(id);
            console.log(deletedBook);
            break;
    }
}

// invoke({ action: 'getAll' })
// invoke({ action: 'getById', id: 'ck89qe3HriUDHe09TBop8' })
// invoke({ action: 'create', title: 'New book', author: 'student' })
// invoke({ action: 'updateById', id: 'Op8ApLTY0-Vn2cR0vDIwG', title: 'Old book', author: 'mentor' })
// invoke({ action: 'deleteById', id: 'DigwbJAGOwT5z8_WZSVPu' })

// console.log(process.argv)
// const yargs = require('yargs');

// const options = yargs(process.argv.slice(2)).argv;
// console.log(options.action);

program.option('-a, --action <type>', 'Choose action of books api')
    .option('-i, --id <type>')
    .option('-t, --title <type>')
    .option('-at, --author <type>')

program.parse();

const { action, id, author, title } = program.opts();
invoke({ action, id, author, title })

// console.log(options)
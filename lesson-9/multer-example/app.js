const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express();
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

app.use(cors())
app.use(express.json());
app.use(express.static("public"))

const books = [
    {
        "id": "stQpFhIx15RNv271-W2WC",
        "title": "1984",
        "author": "Oryel",
        "genre": "love",
        "cover": "books/bd293499ee09b8fa4182f2ae24d83133.jpg"
    }
];
const tempDir = path.join(__dirname, 'temp');

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage: multerConfig,
})

app.get('/api/books', (req, res, next) => {
    res.json(books)
})

// upload.fields([{ name: "cover", maxCount: 2 }, { name: "avatar", maxCount: 1 }])
// upload.array("cover", 2)

app.post('/api/books', upload.single('cover'), async (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    const { path: tempPath, originalname } = req.file;
    const { title, author, genre } = req.body
    const uploadPath = path.join('./public/books', originalname)
    await fs.rename(tempPath, uploadPath);
    const cover = path.join('books', originalname);

    const newBook = {
        id: nanoid(),
        title,
        author,
        genre,
        cover
    }
    books.push(newBook)
    res.json(newBook)
})

app.listen(3000)
const express = require('express')
const moment = require('moment/moment');
const books = require('./books');
const { appendFile } = require('fs/promises')
const app = express()
const cors = require('cors');

app.use(cors());

app.use(async (req, res, next) => {
    const { method, url } = req;
    const date = moment().format("YYYY-MM-DD HH:mm:ss")

    await appendFile('./public/server.log', `${method} ${url} ${date}\n`)
    next()
})

app.get('/books', (req, res) => {
    res.json(books)
})

app.use((req, res, next) => {
    res.status(404).json({
        mesage: 'Path not found'
    })
})


app.listen(3000)
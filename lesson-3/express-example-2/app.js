import express from 'express'

const express = require('express')

const books = require('./books')
const app = express();

app.get('/books', (req, res) => {
    res.json(null);
})

app.listen(3000)
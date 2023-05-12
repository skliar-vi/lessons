const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fs = require('fs/promises')
const contactsRouter = require('./routes/api/contacts')
const booksRouter = require('./routes/api/books-routes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/books', booksRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((error, req, res, next) => {
  const { status = '500', message = 'Internal error' } = error

  res.status(status).json({
    message
  })
})
module.exports = app

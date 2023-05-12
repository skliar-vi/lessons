const express = require('express')
const app = express()
const cors = require('cors')
const { router } = require('./routes/api/books')

app.use('/api/books', router)

app.use((req, res) => {
    res.status(404).json({
        message: 'Not found'
    })
})

app.listen(3000)
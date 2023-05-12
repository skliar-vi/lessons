const express = require('express')

const app = express() // веб сервер

app.get('/', (req, res) => {
    res.send('<h3>My first page</h3>');
});

app.listen(3000, () => {
    console.log("server is running")
})
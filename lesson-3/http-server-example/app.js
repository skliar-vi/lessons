const http = require('http')

const server = http.createServer((request, response) => {
    const { url } = request;

    if (url === '/') {
        response.write('<h1>First page</h1>');
    } else if (url === '/home') {
        response.write('<b>Home</b>');
    }

    response.end();
})

server.listen(3000, () => {
    console.log('Server is running')
})
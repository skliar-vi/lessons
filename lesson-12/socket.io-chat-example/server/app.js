const { Server } = require('socket.io');
const { createServer } = require('http')

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origins: '*'
    }
})

io.on("connection", socket => {
    console.log('New frontend connected')

    socket.on('chat-message', (message) => {
        socket.broadcast.emit('chat-message', message)
    })

    socket.on('disconnect', (reason) => {
        socket.broadcast.emit('user-disconected', '')
    })
})


httpServer.listen(5001)
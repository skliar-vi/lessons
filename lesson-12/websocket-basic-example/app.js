const ws = new require('ws')

const wsServer = new ws.Server({ port: 5001 })

const socketList = []

wsServer.on('connection', (socket) => {
    console.log('New connection')
    socketList.push(socket)

    socketList.forEach(item => {
        if (item != socket) {
            item.send("We have new member")
        }
    })
})
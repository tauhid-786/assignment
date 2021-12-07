const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const { userjs, addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('join',({name}, callback) => {
        const {error, user} = addUser({id: socket.id, username: name})

        if(error) {
            return callback(error)
        }

        // socket.join(user.username)
        callback()
    })
    socket.on('message', (msg) => {
        const user = getUser(msg.to)
        socket.broadcast.to(user.id).emit('message', msg)
    })

})

server.listen(3000, (error)=>{
    if(error)
    console.log(error)
    else console.log('Server running on port 3000')
})
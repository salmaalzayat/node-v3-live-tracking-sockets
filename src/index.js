const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000 // dah bas elly lel deployment 3lshan law heroku (elly ben3mel 3aleh deployment) 


io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('sendLiveLocation', ({ latitude, longitude, data }) => {
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, id: ${data}`)
        // update vehicle last station
        socket.broadcast.emit('location', {
            driverLatitude: latitude,
            driverLongitude: longitude,
            driverData: data
        })
    })

    socket.on(('disconnect'), () => {
        console.log('Disconnected')
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
}) 
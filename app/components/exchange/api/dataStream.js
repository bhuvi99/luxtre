var io = require('socket.io-client')
var socket_url = 'wss://streamer.cryptocompare.com'
var socket = io(socket_url)

socket.on('connect', () => {
 console.log('Socket connected')
})

socket.on('disconnect', (e) => {
 console.log('Socket disconnected:', e)
})

socket.on('error', err => {
 console.log('socket error', err)
})

socket.on('m', (e) => {

})

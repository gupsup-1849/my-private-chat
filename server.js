const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    socket.on('join-room', (room) => socket.join(room));
    socket.on('private-message', (data) => {
        io.to(data.room).emit('chat-message', data);
    });
});

// Is line ko Line 15 par likhein
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('Server is LIVE on port: ' + PORT);
});
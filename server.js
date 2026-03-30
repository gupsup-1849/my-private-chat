const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('User connected');

  // Naam ke saath chat message bhejna
  socket.on('chat message', (data) => {
    io.emit('chat message', data); 
  });

  // Voice stream broadcast karna
  socket.on('voice-stream', (data) => {
    socket.broadcast.emit('voice-stream', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let players = [];

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  if (players.length >= 2) {
    socket.emit('roomFull');
    socket.disconnect();
    return;
  }

  const color = players.length === 0 ? 'white' : 'black';
  players.push({ id: socket.id, color });
  socket.emit('playerColor', color);

  socket.on('disconnect', () => {
    players = players.filter(player => player.id !== socket.id);
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});

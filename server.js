const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const PORT = 3000;

const users = [];

app.use('/static', express.static('src/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('new username', (name) => {
    socket.username = name;
    users.push(name);
    io.emit('users updated', users);
  });

  socket.on('clientMsg', (msg) => {
    socket.broadcast.emit('serverMsg', `${socket.username}: ${msg}`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

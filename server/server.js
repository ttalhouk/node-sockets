const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000; // required for heroku deployment

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
// User connections
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New User has joined',
      createdAt: new Date().getTime()
    });

// User messages
  socket.on('createMessage', (newMsg) => {
    console.log('Create Message', newMsg);
    io.emit('newMessage', {
      from: newMsg.from,
      text: newMsg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });
});

server.listen(port, () =>{
  console.log('Server running on port '+port);
});

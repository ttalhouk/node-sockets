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
  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });
});

server.listen(port, () =>{
  console.log('Server running on port '+port);
});

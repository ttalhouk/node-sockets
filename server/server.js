const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000; // required for heroku deployment

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join', (params, callback) => {
    if (isRealString(params.name) && isRealString(params.room)){

      socket.join(params.room)

      socket.emit('newMessage', generateMessage({
        from: 'Admin',
        text: 'Welcome to the chat app',
      }));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage({
        from:'Admin',
        text:`${params.name} has joined`
      }));

      return callback();
    } else {
      return callback('Name or Room is not valid');
    }
  });
// User connections


// User messages
  socket.on('createMessage', (newMsg, callback) => {
    console.log('Create Message', newMsg);
    io.emit('newMessage', generateMessage(newMsg));
    callback('From the server!');
  });

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });

// User position
  socket.on('createLocationMsg', (position) => {
    io.emit('newLocationMessage',generateLocationMessage({
      from:'User',
      lat: position.lat,
      lng: position.lng
    }))
  })

});


server.listen(port, () =>{
  console.log('Server running on port ' + port);
});

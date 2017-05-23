const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000; // required for heroku deployment

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join', (params, callback) => {
    if (isRealString(params.name) && isRealString(params.room)){

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
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
    let user = users.getUser(socket.id)
    console.log('Create Message', newMsg);
    if (user && isRealString(newMsg.text)) {
      io.to(user.room).emit('newMessage', generateMessage(newMsg));
    }
    callback('From the server!');
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage({
        from: 'Admin',
        text: `${user.name} has left the room`
      }));
    }
  });

// User position
  socket.on('createLocationMsg', (position) => {
    let user = users.getUser(socket.id)
    if (user) {      
      io.to(user.room).emit('newLocationMessage',generateLocationMessage({
        from: user.name,
        lat: position.lat,
        lng: position.lng
      }))
    }
  })

});


server.listen(port, () =>{
  console.log('Server running on port ' + port);
});

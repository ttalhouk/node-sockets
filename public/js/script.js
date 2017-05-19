var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log(('disconnected from server'));
});




$(document).ready(function(){
  const $form = $('#msg-form');
  const $button = $form.find('button');
  const $log = $('#msg-history')
  const $msgField = $form.find('input');

  $form.on('submit', function(e){
    e.preventDefault();
    var messageVal = $msgField.val();
    // console.log({messageVal, $msgField});
    socket.emit('createMessage', {from:'user', text: messageVal}, function (msg){
      console.log(msg + ' Got it!');
      $msgField.val('');
    })
  })
  socket.on('newMessage', function(msg) {
    $log.append(`<li>${msg.from}: ${msg.text} <small>${msg.createdAt}</small> </li>`)
  })

})

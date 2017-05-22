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
  const $locationBtn = $('#send-location');

  $form.on('submit', function(e){
    e.preventDefault();
    var messageVal = $msgField.val();
    // console.log({messageVal, $msgField});
    socket.emit('createMessage', {from:'user', text: messageVal}, function (msg){
      console.log(msg + ' Got it!');
      $msgField.val('');
    })
  });

  socket.on('newMessage', function(msg) {
    $log.append(`<li>${msg.from}: ${msg.text} <small>${msg.createdAt}</small> </li>`)
  });

  $locationBtn.on('click', function(e){
    if (!navigator.geolocation) {
      return alert('Your geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
      socket.emit('createLocationMsg', {lat: position.coords.latitude, lng: position.coords.longitude});
    }, function(error){
      alert('Unable to fetch location.');
    });
  });
  socket.on('newLocationMessage', function(msg) {
    var li = $(`<li></li>`);
    var a = $(`<a target="_blank"></a>`);
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    a.text('Find Me!')
    $log.append(li.append(a));
  });


})

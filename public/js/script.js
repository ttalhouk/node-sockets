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
    var formatedTime = moment(msg.createdAt).format('h:mm a');
    $log.append(`<li>${msg.from} (${formatedTime}): ${msg.text}</li>`)
  });

  $locationBtn.on('click', function(e){
    if (!navigator.geolocation) {
      return alert('Your geolocation is not supported by your browser')
    }
    $locationBtn.text('Sending Location...');
    $locationBtn.attr('disabled', 'disabled');

    function locationBtnOn(){
      $locationBtn.text('Send Location');
      $locationBtn.removeAttr('disabled');
    }

    navigator.geolocation.getCurrentPosition(function(position){
      locationBtnOn();
      // console.log(position);
      socket.emit('createLocationMsg', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
      }, function(error){
        alert('Unable to fetch location.');
        locationBtnOn();
      });
  });
  socket.on('newLocationMessage', function(msg) {
    var formatedTime = moment(msg.createdAt).format('h:mm a');
    var li = $(`<li></li>`);
    var a = $(`<a target="_blank"></a>`);
    li.text(`${msg.from} (${formatedTime}): `);
    a.attr('href', msg.url);
    a.text('Find Me!');
    li.append(a);
    $log.append(li);

  });


})

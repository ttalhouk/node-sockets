var socket = io();

function scrollToBottom(){
  // selectors
  var $messages = $('#msg-history')
  var $newMessage = $messages.children('li:last-child')

  // heights
  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');
  var newMessageHeight = $newMessage.innerHeight();
  var prevMessageHeight = $newMessage.prev().innerHeight();
  //console.log({clientHeight, scrollTop, scrollHeight, newMessageHeight, prevMessageHeight});
  if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
    //console.log('should scroll');
    $messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function() {

  let parameters = $.deparam(window.location.search);
  socket.emit('join', parameters, function(error) {
    if (error){
      alert(error);
      window.location.href = '/';
    } else {
      console.log('no errors');
    }
  })
});
socket.on('disconnect', function() {
  console.log(('disconnected from server'));
});

socket.on('updateUserList', function(users) {
  var $ol = $('<ol></ol>');
  var $userList = $('#users');
  users.forEach(function(user){
    $ol.append($(`<li></li>`).text(user));
  })
  $userList.html($ol);
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
    let parameters = $.deparam(window.location.search);
    socket.emit('createMessage', {from: parameters.name, text: messageVal}, function (msg){
      $msgField.val('');
    })
  });

  socket.on('newMessage', function(msg) {
    var formatedTime = moment(msg.createdAt).format('h:mm a');
    var $template = $('#message-template').html();
    var html = Mustache.render($template, {
      user: msg.from,
      text: msg.text,
      timestamp: formatedTime
    })
    $log.append(html);
    scrollToBottom();
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
    var $location = $('#location-template').html();
    var html = Mustache.render($location, {
      user: msg.from,
      url: msg.url,
      timestamp: formatedTime
    })
    $log.append(html);
    scrollToBottom();
  });


})

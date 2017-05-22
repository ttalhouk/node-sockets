const moment = require('moment');


var generateMessage = function({from, text}){
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

var generateLocationMessage = function({from, lat, lng}) {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  }
}



module.exports = {generateMessage, generateLocationMessage}

var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate a message object when given from and text', () => {
    var msg = {
      from: 'test',
      text: 'test text'
    }
    expect(generateMessage(msg).from).toBe(msg.from);
    expect(generateMessage(msg).text).toBe(msg.text);
    expect(generateMessage(msg).createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate google maps url from lat/lng data', () => {
    var msg = {
      from: 'test',
      lat: '3',
      lng: '6'
    };
    expect(generateLocationMessage(msg).from).toBe(msg.from);
    expect(generateLocationMessage(msg).url).toBe(`https://www.google.com/maps?q=${msg.lat},${msg.lng}`);
    expect(generateMessage(msg).createdAt).toBeA('number');
  })
})

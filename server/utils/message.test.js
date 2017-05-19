var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate a message object when given from and text', () => {
    var msg = {
      from: 'test',
      text: 'test text'
    }
    expect(generateMessage(msg).from).toBe(msg.from);
    expect(generateMessage(msg).text).toBe(msg.text);
    expect(generateMessage(msg).createdAt).toBeA('number');
  })
})

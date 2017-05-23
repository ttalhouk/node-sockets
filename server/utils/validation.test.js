var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should return true with valid data', () => {
    let params = {
      name: 'valid name',
      room: 'valid room'
    }
    expect(isRealString(params.name)).toBe(true);
  })
  it('should return false with invalid data', () => {
    let params = {
      name: '   ',
      room: '',
      nums: 456
    }
    expect(isRealString(params.name)).toBe(false);
    expect(isRealString(params.room)).toBe(false);
    expect(isRealString(params.nums)).toBe(false);
  })
})

var expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
  var collection;
  beforeEach(() => {
    collection = new Users();
    collection.users = [
      {
        id: '1',
        name: 'user 1',
        room: 'room 1'
      },{
        id: '2',
        name: 'user 2',
        room: 'room 2'
      },{
        id: '3',
        name: 'user 3',
        room: 'room 1'
      }
    ];
  });

  it('should be a collection of users', () => {
    let collection = new Users();
    expect(typeof collection).toBe('object');
    expect(collection.users).toEqual([]);
  });
  describe('addUser', () => {
    it('should add a user to the collection and return a user object', () => {
      let [id, name, room] = [5, 'user', 'room'];
      let collection = new Users();
      let result = collection.addUser(id, name, room);
      expect(result).toEqual({id, name, room});
      expect(collection.users).toEqual([result]);
      expect(collection.users.length).toBe(1);
    });
  });
  describe('getUserList', () => {
    it('should return an array of objects that match the room', () => {
      let room = 'room 1';
      let result = collection.getUserList(room);
      expect(result.length).toBe(2);
      expect(result).toInclude(collection.users[0].name);
      expect(result).toNotInclude(collection.users[1].name);
      expect(result).toInclude(collection.users[2].name);
    });
  });
  describe('removeUser', () => {
    it('should remove the user from collection and return it', () => {
      let id = '3';
      let result = collection.removeUser(id);
      expect(collection.users.length).toBe(2);
      expect(result).toEqual({
        id: '3',
        name: 'user 3',
        room: 'room 1'
      });
    });
    it('should not remove a user from collection and return undefined', () => {
      let id = '44';
      let result = collection.removeUser(id);
      expect(collection.users.length).toBe(3);
      expect(result).toNotExist();
    });
  });
  describe('getUser', () => {
    it('should return user with matching id and not remove it', () => {
      let id = '3';
      let result = collection.getUser(id);
      expect(collection.users.length).toBe(3);
      expect(result).toEqual({
        id: '3',
        name: 'user 3',
        room: 'room 1'
      });
    });
    it('should return undefined if no matching id', () => {
      let id = '44';
      let result = collection.getUser(id);
      expect(collection.users.length).toBe(3);
      expect(result).toNotExist();
    });
  });


})

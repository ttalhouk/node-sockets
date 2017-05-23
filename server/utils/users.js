class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    let location = this.users.map((user) => user.id).indexOf(id);
    if (location >= 0) {
      let user = this.users.splice(location, 1);
      return user[0];
    } else {
      return undefined;
    }
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    let chatRoom = this.users.filter((user) => {
      return user.room === room;
    });
    return chatRoom.map((user) => user.name);
  }

}

module.exports = {Users};

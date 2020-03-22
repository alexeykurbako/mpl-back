const UserRepository = require('./userRepository');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  addUser(user) {
    return this.repository.add(user);
  }
}

module.exports = UserService;


const jwt = require('jsonwebtoken');
const config = require('config');

const UserService = require('../user/userService');
const cipher = require('./cipherHelper');
const emailService = require('../../../utils/emailService');

class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  register(user) {
    const {email} = user;

    return this.userService.findByEmail(email)
        .then(existingUser => {
          if (existingUser) {
            throw new Error('User already exists');
          }

          const {salt, passwordHash} = cipher.saltHashPassword(user.password);
          const newUser = {
            email: user.email,
            fullName: user.fullName,
            role: 'user',
            age: 18,
            salt,
            passwordHash,
          };

          return this.userService.addUser(newUser);
        })
        .then(response => {
          if (response.result.ok === 1) {
            return this.userService.findByEmail(email);
          }
        });
  }
}

module.exports = AuthService;

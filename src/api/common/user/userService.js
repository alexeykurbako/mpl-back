

const jwt = require('jsonwebtoken');
const config = require('config');

const UserRepository = require('./userRepository');
const cipher = require('../auth/cipherHelper');
// const CustomErrorService = require('../../../utils/customErrorService');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  findById(id) {
    return this.repository.findById(id)
      .then(user => this.mapUserToDto(user));
  }

  addUser(user) {
    return this.repository.add(user);
  }

  list(filter) {
    return Promise.all([
      this.repository.listFiltered(filter),
      this.repository.getCountFiltered(filter),
    ])
      .then(([data, count]) => {
        return {
          items: data.map(item => this.mapUserToDto(item)),
          totalCount: count,
        };
      });
  }

  mapUserToDto(user) {
    return user ? {
      id: user._id,
      email: user.email,
      role: user.role,
      age: user.age,
      login: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address || {},
      settings: settingService.mapSettingsToDto(this.getSettings(user.settings)),
    } : {};
  }

  getSettings(settings) {
    return settings && settings.length ? settings[0] : settings;
  }

  mapDtoToUser(dto) {
    return dto ? {
      email: dto.email,
      age: dto.age,
      role: dto.role,
      fullName: dto.login,
      firstName: dto.firstName,
      lastName: dto.lastName,
      address: dto.address,
    } : {};
  }

  _isDuplicateEmail(users, userId) {
    if (users && users.length === 0) {
      return false;
    }

    if (users.length > 1) {
      return true;
    }

    return users.some(user => user._id.toString() !== userId.toString());
  }
}

module.exports = UserService;

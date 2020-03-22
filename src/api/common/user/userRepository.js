

const { ObjectID } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  findByEmail(email) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ email }));
  }
}

module.exports = UserRepository;

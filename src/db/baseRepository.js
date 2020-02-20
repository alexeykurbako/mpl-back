

const { ObjectID } = require('mongodb');
const getMongoDBClient = require('../db/mongodbClient');

class BaseRepository {
  constructor(collectionName) {
    this.dbClient = getMongoDBClient();
    this.collection = collectionName;
  }

  findById(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ _id: ObjectID(id) }));
  }

  add(item) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .insertOne(item));
  }
}

module.exports = BaseRepository;

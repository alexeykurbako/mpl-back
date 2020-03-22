const BaseRepository = require('../../../db/baseRepository');

class CommentRepository extends BaseRepository {
    constructor() {
        super('comments');
    }

    list() {
        return this.dbClient
            .then(db => db
                .collection(this.collection)
                .aggregate([{
                    $lookup:
                        {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "user"
                        }
                }])
                .toArray());
    }
}

module.exports = CommentRepository;

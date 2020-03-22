const CommentRepository = require('./commentRepository');
const { ObjectID } = require('mongodb');

class CommentService {
    constructor() {
        this.repository = new CommentRepository();
    }

    addComment(comment, userId) {
        comment.userId = ObjectID(userId);
        return this.repository.add(comment);
    }

    list() {
        return this.repository.list();
    }
}

module.exports = CommentService;

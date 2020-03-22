const express = require('express');

const router = express.Router();
const CommentService = require('./commentService');
const commentService = new CommentService();


router.get('/', (req, res) => {
    commentService
        .list(req.query)
        .then((comments) => {
            console.log(comments)
            res.send(comments)
        })
        .catch(err => res.status(400).send({ error: err.message }));
});

router.post('/', (req, res) => {
    commentService
        .addComment(req.body, req.userId)
        .then(() => res.send({message: 'ok'}))
        .catch(err => res.status(400).send({ error: err.message }));
});

module.exports = router;

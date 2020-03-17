
const express = require('express');

const router = express.Router();
const UserService = require('./userService');

const userService = new UserService();

router.get('/', (req, res) => {
  userService
    .list(req.query)
    .then(users => res.send(users));
});

router.post('/', (req, res) => {
  userService
    .addUser(req.body)
    .then(user => res.send(user));
});

router.get('/current', (req, res) => {
  userService
    .findById(req.user.id)
    .then(user => res.send(user));
});

module.exports = router;


const express = require('express');

const router = express.Router();
const { adminGuard } = require('../auth/aclService');
const UserService = require('./userService');

const userService = new UserService();

router.get('/', adminGuard, (req, res) => {
  userService
    .list(req.query)
    .then(users => res.send(users));
});

router.post('/', adminGuard, (req, res) => {
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


const express = require('express');
const passport = require('passport');

const cipher = require('../auth/cipherHelper');
const AuthService = require('./authService');

const router = express.Router();
const authService = new AuthService();
const auth = passport.authenticate('jwt', { session: false });

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).send({
        error: err ? err.message : 'Login or password is wrong',
      });
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }

      const response = { token: cipher.generateResponseTokens(user) };
      res.send(response);
    });
  })(req, res);
});

router.post('/sign-up', (req, res) => {
  authService
    .register(req.body)
    .then(user => {
      const response = { token: cipher.generateResponseTokens(user) };

      res.send(response);
    })
    .catch(err => res.status(400).send({ error: err.message }));
});

module.exports = router;

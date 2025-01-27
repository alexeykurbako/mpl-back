const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('config');
const logger = require('./utils/logger');

require('./passport');

const authController = require('./api/common/auth/authController');
const commentController = require('./api/common/comment/commentController');

const app = express();
const { port, root } = config.get('api');

function logErrors(err, req, res, next) {
  logger.error(err);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something went wrong.' });
  } else {
    next(err);
  }
}

app.use(cors());
app.use(bodyParser.json());

const auth = passport.authenticate('jwt', { session: false });

app.use(`${root}/auth`, authController);
app.use(`${root}/comments`, auth, commentController);

app.use(logErrors);
app.use(clientErrorHandler);

app.listen(process.env.PORT || 3001);

logger.info(`Server start listening port: ${port}`);

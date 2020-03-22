

const crypto = require('crypto');
const config = require('config');
const jwt = require('jsonwebtoken');

function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

function getStringValue(data) {
  if (typeof data === 'number' || data instanceof Number) {
    return data.toString();
  }
  if (!Buffer.isBuffer(data) && typeof data !== 'string') {
    throw new TypeError('Data for password or salt must be a string or a buffer');
  }
  return data;
}

function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', getStringValue(salt));
  hash.update(getStringValue(password));
  const passwordHash = hash.digest('hex');

  return {
    salt,
    passwordHash,
  };
}

function saltHashPassword(password) {
  const salt = genRandomString(16);
  return sha512(getStringValue(password), salt);
}

function generateResponseTokens(user) {
  const normalizedUser = { id: user._id, email: user.email };
  const accessToken = jwt.sign(
    normalizedUser,
    config.get('auth.jwt.accessTokenSecret'),
    { expiresIn: config.get('auth.jwt.accessTokenLife') },
  );
  const refreshToken = jwt.sign(
    normalizedUser,
    config.get('auth.jwt.refreshTokenSecret'),
    { expiresIn: config.get('auth.jwt.refreshTokenLife') },
  );

  return {
    expires_in: config.get('auth.jwt.accessTokenLife'),
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}

module.exports = {
  saltHashPassword,
  sha512,
  generateResponseTokens,
};

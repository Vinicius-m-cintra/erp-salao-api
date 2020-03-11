/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.originalUrl === '/ping' || req.originalUrl === '/login') {
    next();
  } else {
    try {
      jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  }
};

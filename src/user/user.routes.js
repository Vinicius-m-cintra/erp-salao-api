const userRoutes = require('express').Router();

const userController = require('./user.controller');

userRoutes.post('/register', async (req, res, next) => {
  const response = await userController
    .register(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

userRoutes.post('/login', async (req, res, next) => {
  const response = await userController
    .login(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = userRoutes;

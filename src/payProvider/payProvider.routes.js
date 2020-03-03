const payProviderRoutes = require('express').Router();

const payProviderController = require('./payProvider.controller');

payProviderRoutes.post('/payProvider', async (req, res, next) => {
  const response = await payProviderController
    .savePayment(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = payProviderRoutes;

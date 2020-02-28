const paymentRoutes = require('express').Router();

const paymentController = require('./payment.controller');

paymentRoutes.post('/payment', async (req, res, next) => {
  const response = await paymentController
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

module.exports = paymentRoutes;

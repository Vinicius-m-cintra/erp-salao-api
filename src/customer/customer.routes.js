const customerRoutes = require('express').Router();

const customerController = require('./customer.controller');

customerRoutes.post('/customer', async (req, res, next) => {
  let response = await customerController
    .saveCustomer(req.body)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.get('/customers', async (req, res, next) => {
  let response = await customerController
    .findAll(req.query)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.get('/customer/:id', async (req, res, next) => {
  let response = await customerController
    .findOne(req.params.id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.patch('/customer/:id', async (req, res, next) => {
  let response = await customerController
    .editCustomer(req)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.delete('/customer/:id', async (req, res, next) => {
  let response = await customerController
    .deleteCustomer(req.params.id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = customerRoutes;

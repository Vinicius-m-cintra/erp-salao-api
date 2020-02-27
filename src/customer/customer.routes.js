const customerRoutes = require('express').Router();

const customerController = require('./customer.controller');

customerRoutes.post('/customer', async (req, res, next) => {
  const response = await customerController
    .saveCustomer(req.body)
    .then(customer => {
      return customer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.get('/customer', async (req, res, next) => {
  const response = await customerController
    .findAll(req.query)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.get('/customer/:id', async (req, res, next) => {
  const response = await customerController
    .findOne(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.patch('/customer/:id', async (req, res, next) => {
  const response = await customerController
    .editCustomer(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

customerRoutes.delete('/customer/:id', async (req, res, next) => {
  const response = await customerController
    .deleteCustomer(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = customerRoutes;

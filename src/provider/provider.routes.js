const providerRoutes = require('express').Router();

const providerController = require('./provider.controller');

providerRoutes.post('/provider', async (req, res, next) => {
  let response = await providerController
    .saveProvider(req.body)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

providerRoutes.get('/providers', async (req, res, next) => {
  let response = await providerController
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

providerRoutes.get('/provider/:id', async (req, res, next) => {
  let response = await providerController
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

providerRoutes.patch('/provider/:id', async (req, res, next) => {
  let response = await providerController
    .editProvider(req)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

providerRoutes.delete('/provider/:id', async (req, res, next) => {
  let response = await providerController
    .deleteProvider(req.params.id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});
module.exports = providerRoutes;

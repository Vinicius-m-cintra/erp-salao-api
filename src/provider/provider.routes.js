const providerRoutes = require('express').Router();

const providerController = require('./provider.controller');

providerRoutes.post('/provider', async (req, res, next) => {
  const response = await providerController
    .saveProvider(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

providerRoutes.get('/provider', async (req, res, next) => {
  const response = await providerController
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

providerRoutes.get('/provider/:id', async (req, res, next) => {
  const response = await providerController
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

providerRoutes.patch('/provider/:id', async (req, res, next) => {
  const response = await providerController
    .editProvider(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

providerRoutes.delete('/provider/:id', async (req, res, next) => {
  const response = await providerController
    .deleteProvider(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});
module.exports = providerRoutes;

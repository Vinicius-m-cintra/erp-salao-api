const serviceRoutes = require('express').Router();

const serviceController = require('./service.controller');

serviceRoutes.post('/service', async (req, res, next) => {
  const response = await serviceController
    .saveService(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

serviceRoutes.get('/service', async (req, res, next) => {
  const response = await serviceController
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

serviceRoutes.get('/service/:id', async (req, res, next) => {
  const response = await serviceController
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

serviceRoutes.patch('/service/:id', async (req, res, next) => {
  const response = await serviceController
    .editService(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

serviceRoutes.delete('/service/:id', async (req, res, next) => {
  const response = await serviceController
    .deleteService(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});
module.exports = serviceRoutes;

const productRoutes = require('express').Router();

const productController = require('./product.controller');

productRoutes.post('/product', async (req, res, next) => {
  const response = await productController
    .saveProduct(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

productRoutes.get('/product', async (req, res, next) => {
  const response = await productController
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

productRoutes.get('/product/:id', async (req, res, next) => {
  const response = await productController
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

productRoutes.patch('/product/:id', async (req, res, next) => {
  const response = await productController
    .editProduct(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

productRoutes.delete('/product/:id', async (req, res, next) => {
  const response = await productController
    .deleteProduct(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });

  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = productRoutes;

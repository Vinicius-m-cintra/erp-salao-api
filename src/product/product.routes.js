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

productRoutes.get('/products', async (req, res, next) => {
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

module.exports = productRoutes;

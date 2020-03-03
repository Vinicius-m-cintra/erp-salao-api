const buysRoutes = require('express').Router();

const buysController = require('./buys.controller');

buysRoutes.post('/buys', async (req, res, next) => {
  const response = await buysController
    .saveBuy(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

buysRoutes.get('/buys', async (req, res, next) => {
  const response = await buysController
    .listBuys(req.query.provider)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = buysRoutes;

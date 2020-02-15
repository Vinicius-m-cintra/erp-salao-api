const providerRoutes = require("express").Router();

const providerController = require("./provider.controller");

providerRoutes.post("/fornecedor", async (req, res, next) => {
  let response = await providerController
    .saveProvider(req)
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

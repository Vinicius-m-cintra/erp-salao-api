/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const createResponse = require('../common/createResponse');
const buysActions = require('./buys.actions');

const buysController = {
  saveBuy(data) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        provider: Joi.string().required(),
        products: Joi.array().items(
          Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            cust_price: Joi.number()
              .required()
              .min(0),
            description: Joi.string(),
            sku: Joi.string(),
            quantity: Joi.number()
              .integer()
              .min(1),
          })
        ),
        total_value: Joi.number().required(),
        paid_value: Joi.number().required(),
      });

      const { error } = schema.validate(data);
      if (error) return reject(createResponse(500, error));

      buysActions
        .saveBuy(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  listBuys(provider) {
    return new Promise((resolve, reject) => {
      const id = Joi.string().required();

      const { error } = id.validate(provider);
      if (error) return reject(createResponse(500, error));

      buysActions
        .listBuys(provider)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = buysController;

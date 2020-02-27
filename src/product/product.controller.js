/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const productActions = require('./product.actions');
const createResponse = require('../common/createResponse');

const productController = {
  saveProduct(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        cust_price: Joi.number(),
        stock: Joi.number()
          .integer()
          .min(0)
          .max(1000),
        description: Joi.string(),
        sku: Joi.string(),
        provider: Joi.string(),
      });

      const { error } = await schema.validate(data);

      if (error) return reject(createResponse(400, error));

      productActions
        .saveProduct(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  findAll(params) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        limit: Joi.number()
          .integer()
          .min(1)
          .max(100),
        offset: Joi.number()
          .integer()
          .min(0),
      });
      const { error } = await schema.validate(params);

      if (error) return reject(createResponse(400, error));
      productActions
        .findAll(params)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = productController;

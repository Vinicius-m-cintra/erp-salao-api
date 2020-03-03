/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const createResponse = require('../common/createResponse');
const payProviderActions = require('./payProvider.actions');

const buysController = {
  savePayment(data) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        provider: Joi.string().required(),
        total: Joi.number().required(),
        comment: Joi.string(),
      });

      const { error } = schema.validate(data);
      if (error) return reject(createResponse(500, error));

      payProviderActions
        .savePayment(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = buysController;

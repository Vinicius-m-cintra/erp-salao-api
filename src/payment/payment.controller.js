/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const paymentActions = require('./payment.actions');
const createResponse = require('../common/createResponse');

const paymentController = {
  savePayment(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        description: Joi.string(),
        value: Joi.number()
          .required()
          .min(1),
        customer: Joi.string().required(),
      });

      const { error } = await schema.validate(data);

      if (error) return reject(createResponse(400, error));

      paymentActions
        .savePayment(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = paymentController;

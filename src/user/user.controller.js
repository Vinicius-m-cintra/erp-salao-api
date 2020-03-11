/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const userActions = require('./user.actions');

const createResponse = require('../common/createResponse');

const userController = {
  register(user) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: Joi.string()
          .required()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      });

      const { error } = await schema.validate(user);

      if (error) return reject(createResponse(400, error));

      userActions
        .register(user)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  login(user) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: Joi.string()
          .required()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      });

      const { error } = await schema.validate(user);

      if (error) return reject(createResponse(400, error));

      userActions
        .login(user)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = userController;

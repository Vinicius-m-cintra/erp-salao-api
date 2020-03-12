/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const customerActions = require('./customer.actions');
const createResponse = require('../common/createResponse');

const customerController = {
  saveCustomer(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        birth: Joi.string().required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'br'] },
          })
          .required(),
        cellphone: Joi.string().required(),
        postcode: Joi.string().required(),
        street: Joi.string().required(),
        neighbourhood: Joi.string().required(),
        number: Joi.number()
          .integer()
          .min(0),
        complement: Joi.string(),
        url_img: Joi.string(),
        debt: Joi.number(),
      });

      const { error } = await schema.validate(data);

      if (error) return reject(createResponse(400, error));

      customerActions
        .saveCustomer(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  findAll(params) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string(),
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
      customerActions
        .findAll(params)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  findOne(id) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = await schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      customerActions
        .findOne(id)
        .then(customer => {
          if (!customer) {
            return reject(createResponse(404, 'Cliente não encontrado'));
          }
          resolve(createResponse(200, customer));
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  editCustomer(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        birth: Joi.string(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        }),
        cellphone: Joi.string(),
        postcode: Joi.string(),
        street: Joi.string(),
        neighbourhood: Joi.string(),
        number: Joi.number(),
        complement: Joi.string(),
        url_img: Joi.string(),
        debt: Joi.number(),
      });

      const { error } = await schema.validate({
        ...req.params,
        ...req.body,
      });
      if (error) return reject(createResponse(400, error));

      customerActions
        .editCustomer(req)
        .then(customer => {
          if (customer) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${customer.name} alterado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Cliente não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  deleteCustomer(id) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      customerActions
        .deleteCustomer(id)
        .then(customer => {
          if (customer) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${customer.name} deletado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Cliente não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = customerController;

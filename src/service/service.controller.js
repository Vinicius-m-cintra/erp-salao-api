/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const serviceActions = require('./service.actions');

const createResponse = require('../common/createResponse');

const serviceController = {
  saveService(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        suggested_value: Joi.number(),
      });

      const { error } = await schema.validate(data);

      if (error) return reject(createResponse(400, error));

      serviceActions
        .saveService(data)
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
      serviceActions
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

      serviceActions
        .findOne(id)
        .then(service => {
          if (!service) {
            return reject(createResponse(404, 'Serviço não encontrado'));
          }
          return resolve(createResponse(200, service));
        })
        .catch(err => {
          return reject(createResponse(500, err));
        });
    });
  },
  editService(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string(),
        suggested_value: Joi.number(),
      });

      const { error } = await schema.validate({
        ...req.params,
        ...req.body,
      });
      if (error) return reject(createResponse(400, error));

      serviceActions
        .editService(req)
        .then(service => {
          if (service) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${service.name} alterado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Serviço não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  deleteService(id) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      serviceActions
        .deleteService(id)
        .then(service => {
          if (service) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${service.name} deletado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Serviço não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = serviceController;

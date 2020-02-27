/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const providerActions = require('./provider.actions');

function createResponse(statusCode, result) {
  return {
    statusCode,
    result,
  };
}

const providerController = {
  saveProvider(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        cellphone: Joi.string().required(),
        balance: Joi.number(),
      });

      const { error } = await schema.validate(data);

      if (error) return reject(createResponse(400, error));

      providerActions
        .saveProvider(data)
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
      providerActions
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

      providerActions
        .findOne(id)
        .then(provider => {
          if (!provider) {
            return reject(createResponse(404, 'Fornecedor não encontrado'));
          }
          return resolve(createResponse(200, provider));
        })
        .catch(err => {
          return reject(createResponse(500, err));
        });
    });
  },
  editProvider(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        }),
        cellphone: Joi.string(),
        balance: Joi.number(),
      });

      const { error } = await schema.validate({
        ...req.params,
        ...req.body,
      });
      if (error) return reject(createResponse(400, error));

      providerActions
        .editProvider(req)
        .then(provider => {
          if (provider) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${provider.name} alterado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Fornecedor não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  deleteProvider(id) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      providerActions
        .deleteProvider(id)
        .then(provider => {
          if (provider) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${provider.name} deletado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Fornecedor não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
};

module.exports = providerController;

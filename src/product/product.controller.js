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
      productActions
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

      productActions
        .findOne(id)
        .then(product => {
          if (!product) {
            return reject(createResponse(404, 'Produto não encontrado'));
          }
          resolve(createResponse(200, product));
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  editProduct(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        cust_price: Joi.number(),
        stock: Joi.number()
          .integer()
          .min(0)
          .max(1000),
        description: Joi.string(),
        sku: Joi.string(),
        provider: Joi.string(),
      });

      const { error } = await schema.validate({
        ...req.params,
        ...req.body,
      });
      if (error) return reject(createResponse(400, error));

      productActions
        .editProduct(req)
        .then(product => {
          if (product) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${product.name} alterado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Produto não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      productActions
        .deleteProduct(id)
        .then(product => {
          if (product) {
            resolve(
              createResponse(
                200,
                `Cadastro de ${product.name} deletado com sucesso!`
              )
            );
          } else {
            resolve(createResponse(404, `Produto não encontrado!`));
          }
        })
        .catch(err => reject(createResponse(500, err)));
    });
  },
  findProductService(search) {
    return new Promise((resolve, reject) => {
      const schema = Joi.string().required();

      const { error } = schema.validate(search);
      if (error) return reject(createResponse(400, error));

      productActions
        .findProductService(search)
        .then(products_services => {
          resolve(createResponse(200, products_services));
        })
        .catch(err => {
          reject(createResponse(500, err));
        });
    });
  },
};

module.exports = productController;

const Product = require('./product.model');

const formatResponse = require('../common/formatResponse');

const productActions = {
  saveProduct(data) {
    return new Promise((resolve, reject) => {
      Product.create(data)
        .then(() => {
          return resolve('Produto cadastrado com sucesso');
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findAll(params) {
    return new Promise((resolve, reject) => {
      const limit = parseInt(params.limit, {}) || 10;
      const offset = params.offset || 0;

      Product.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset)
        .populate('provider')
        .then(products => {
          return resolve(formatResponse(products, { limit, offset }));
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findOne(id) {
    return new Promise((resolve, reject) => {
      Product.findById(id)
        .populate('provider')
        .then(product => {
          return resolve(product);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  editProduct(req) {
    return new Promise((resolve, reject) => {
      Product.findByIdAndUpdate(req.params.id, req.body)
        .populate('provider')
        .then(product => {
          return resolve(product);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      Product.findByIdAndDelete(id)
        .then(product => {
          return resolve(product);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = productActions;

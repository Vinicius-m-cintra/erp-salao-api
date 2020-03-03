const Provider = require('./provider.model');

const formatResponse = require('../common/formatResponse');

const providerActions = {
  saveProvider(data) {
    return new Promise((resolve, reject) => {
      Provider.create(data)
        .then(() => {
          return resolve('Fornecedor cadastrado com sucesso');
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

      Provider.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset)
        .then(providers => {
          return resolve(formatResponse(providers, { limit, offset }));
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findOne(id) {
    return new Promise((resolve, reject) => {
      Provider.findById(id)
        .then(provider => {
          return resolve(provider);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  editProvider(req) {
    return new Promise((resolve, reject) => {
      Provider.findByIdAndUpdate(req.params.id, req.body)
        .then(provider => {
          return resolve(provider);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  deleteProvider(id) {
    return new Promise((resolve, reject) => {
      Provider.findByIdAndDelete(id)
        .then(provider => {
          return resolve(provider);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = providerActions;

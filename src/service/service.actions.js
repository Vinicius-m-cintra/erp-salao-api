const Service = require('./service.model');

const formatResponse = require('../common/formatResponse');

const serviceActions = {
  saveService(data) {
    return new Promise((resolve, reject) => {
      Service.create(data)
        .then(() => {
          return resolve('Serviço cadastrado com sucesso');
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

      Service.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset)
        .then(services => {
          return resolve(formatResponse(services, { limit, offset }));
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findOne(id) {
    return new Promise((resolve, reject) => {
      Service.findById(id)
        .then(service => {
          return resolve(service);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  editService(req) {
    return new Promise((resolve, reject) => {
      Service.findByIdAndUpdate(req.params.id, req.body)
        .then(service => {
          return resolve(service);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  deleteService(id) {
    return new Promise((resolve, reject) => {
      Service.findByIdAndDelete(id)
        .then(service => {
          return resolve(service);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = serviceActions;

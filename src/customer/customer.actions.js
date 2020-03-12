const Customer = require('./customer.model');

const formatResponse = require('../common/formatResponse');

const customerActions = {
  saveCustomer(data) {
    return new Promise((resolve, reject) => {
      Customer.create(data)
        .then(() => {
          return resolve('Cliente cadastrado com sucesso');
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
      Customer.find({
        name: new RegExp(params.name, 'i'),
      })
        .limit(limit)
        .skip(limit * offset)
        .sort({ name: 1 })
        .then(customers => {
          return resolve(formatResponse(customers, { limit, offset }));
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findOne(id) {
    return new Promise((resolve, reject) => {
      Customer.findById(id)
        .then(customer => {
          return resolve(customer);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  editCustomer(req) {
    return new Promise((resolve, reject) => {
      Customer.findByIdAndUpdate(req.params.id, req.body)
        .then(customer => {
          return resolve(customer);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  deleteCustomer(id) {
    return new Promise((resolve, reject) => {
      Customer.findByIdAndDelete(id)
        .then(customer => {
          return resolve(customer);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = customerActions;

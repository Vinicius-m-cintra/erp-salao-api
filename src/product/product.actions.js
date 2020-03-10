const Product = require('./product.model');
const Service = require('../service/service.model');

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
  findProductService(search) {
    return new Promise((resolve, reject) => {
      const response = {};
      Product.find(
        {
          name: new RegExp(search, 'i'),
        },
        {
          name: 'name',
          description: 'description',
          cust_price: 'cust_price',
        }
      )
        .limit(10)
        .then(res => {
          response.products = res;
          Service.find(
            {
              name: new RegExp(search, 'i'),
            },
            {
              name: 'name',
              description: 'description',
              suggested_value: 'suggested_value',
            }
          )
            .limit(10)
            .then(result => {
              response.services = result;
              return resolve(response);
            })
            .catch(err => {
              return reject(err);
            });
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = productActions;

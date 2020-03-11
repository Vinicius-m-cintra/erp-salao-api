/* eslint-disable consistent-return */
const moment = require('moment');
const Buy = require('./buys.model');
const Provider = require('../provider/provider.model');
const Product = require('../product/product.model');
const PayProvider = require('../payProvider/payProvider.model');

const buysActions = {
  saveBuy(data) {
    return new Promise((resolve, reject) => {
      const { products } = data;
      const debt = data.total_value - data.paid_value;
      Provider.findById(data.provider)
        .then(provider => {
          const { balance } = provider;
          // eslint-disable-next-line array-callback-return
          products.map(product => {
            const product1 = Product.findById(product.id);
            const { stock } = product1;
            Product.findByIdAndUpdate(product.id, {
              stock: stock + product.quantity,
            });
          });
          Provider.findByIdAndUpdate(data.provider, {
            balance: balance - debt,
          })
            .then(() => {
              try {
                Buy.create(data).then(() => {
                  return resolve('Compra efetuada com sucesso');
                });
              } catch (error) {
                return reject(error);
              }
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
  listBuys(provider) {
    return new Promise((resolve, reject) => {
      const term = moment().subtract(3, 'months');
      const today = moment().startOf('day');
      const response = {};
      Buy.find(
        {
          provider,
          createdAt: {
            $gte: term.toDate(),
            $lte: moment(today)
              .endOf('day')
              .toDate(),
          },
        },
        {
          total_value: 'total_value',
          paid_value: 'paid_value',
          createdAt: 'createdAt',
          products: 'products',
        },
        {
          sort: {
            createdAt: -1,
          },
        }
      )
        .then(buy => {
          response.buy = buy;
          PayProvider.find(
            {
              provider,
              createdAt: {
                $gte: term.toDate(),
                $lte: moment(today)
                  .endOf('day')
                  .toDate(),
              },
            },
            { total: 'total', comment: 'comment', createdAt: 'createdAt' },
            {
              sort: {
                createdAt: -1,
              },
            }
          )
            .then(payProvider => {
              response.payments = payProvider;
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

module.exports = buysActions;

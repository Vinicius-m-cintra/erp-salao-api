const moment = require('moment');
const Buy = require('./buys.model');
const Provider = require('../provider/provider.model');
const Product = require('../product/product.model');
const payProvider = require('../payProvider/payProvider.model');

const buysActions = {
  async saveBuy(data) {
    const { products } = data;
    const debt = data.total_value - data.paid_value;
    const provider = await Provider.findById(data.provider)
      .then(async () => {
        const { balance } = provider;
        products.map(async product => {
          const product1 = await Product.findById(product.id);
          const { stock } = product1;
          await Product.findByIdAndUpdate(product.id, {
            stock: stock + product.quantity,
          });
        });
        await Provider.findByIdAndUpdate(data.provider, {
          balance: balance - debt,
        })
          .then(async () => {
            try {
              await Buy.create(data);
            } catch (error) {
              return error;
            }
          })
          .catch(err => {
            return err;
          });
      })
      .catch(err => {
        return err;
      });
    return 'Compra efetuada com sucesso';
  },
  async listBuys(provider) {
    const term = moment().subtract(3, 'months');
    const today = moment().startOf('day');
    const buys = await Buy.find({
      provider,
      createdAt: {
        $gte: term.toDate(),
        $lte: moment(today)
          .endOf('day')
          .toDate(),
      },
    });
    const payments = await payProvider.find({
      provider,
      createdAt: {
        $gte: term.toDate(),
        $lte: moment(today)
          .endOf('day')
          .toDate(),
      },
    });
    return { buys, payments };
  },
};

module.exports = buysActions;

const Product = require('./product.model');

const formatResponse = require('../common/formatResponse');

const productActions = {
  async saveProduct(data) {
    try {
      await Product.create(data);
      return 'Produto cadastrado com sucesso';
    } catch (error) {
      return error;
    }
  },
  async findAll(params) {
    const limit = parseInt(params.limit, {}) || 10;
    const offset = params.offset || 0;

    try {
      const products = await Product.find()
        .limit(limit)
        .skip(limit * offset);
      return formatResponse(products, { limit, offset });
    } catch (error) {
      return error;
    }
  },
};

module.exports = productActions;
